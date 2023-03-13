import 'zone.js/bundles/zone-node.umd.js';
import { type QRL, type Signal, SSRRaw, Slot } from "@builder.io/qwik";
// import { getHostProps, mainExactProps, getReactProps } from "./slot";
// import { renderToString } from "react-dom/server";
import { isServer } from "@builder.io/qwik/build";
import {
    reflectComponentType,
    type ɵComponentType as ComponentType,
    ApplicationRef,
    type ComponentMirror,
    InjectionToken,
    type Provider,
} from "@angular/core";
import { BEFORE_APP_SERIALIZED, renderApplication } from "@angular/platform-server";

const QWIK_ANGULAR_STATIC_PROPS = new InjectionToken<{
  props: Record<string, unknown>;
  mirror: ComponentMirror<unknown>;
}>('@builder.io/qwik-angular: Static Props w/ Mirror Provider', {
  factory() {
    return { props: {}, mirror: {} as ComponentMirror<unknown> };
  },
});

// Run beforeAppInitialized hook to set Input on the ComponentRef
// before the platform renders to string
const STATIC_PROPS_HOOK_PROVIDER: Provider = {
  provide: BEFORE_APP_SERIALIZED,
  useFactory: (
    appRef: ApplicationRef,
    {
      props,
      mirror,
    }: {
      props: Record<string, unknown>;
      mirror: ComponentMirror<unknown>;
    }
  ) => {
    return () => {
      const compRef = appRef.components[0];
      if (compRef && props && mirror) {
        for (const [key, value] of Object.entries(props)) {
          if (
            // we double-check inputs on ComponentMirror
            // because Astro might add additional props
            // that aren't actually Input defined on the Component
            mirror.inputs.some(
              ({ templateName, propName }) =>
                templateName === key || propName === key
            )
          ) {
            compRef.setInput(key, value);
          }
        }
        compRef.changeDetectorRef.detectChanges();
      }
    };
  },
  deps: [ApplicationRef, QWIK_ANGULAR_STATIC_PROPS],
  multi: true,
};

export async function renderFromServer(
    Host: any,
    angularCmp$: QRL<ComponentType<unknown>>,
    hostRef: Signal<Element | undefined>,
    slotRef: Signal<Element | undefined>,
    props: Record<string, unknown>
) {
    if (isServer) {
      const component = await angularCmp$.resolve();
        const mirror = reflectComponentType(component);
        const appId = mirror?.selector || component.name.toString().toLowerCase();
        const document = `<${appId}></${appId}>`;

        const html = await renderApplication(component, {
            appId,
            document,
            providers: [
              {
                provide: QWIK_ANGULAR_STATIC_PROPS,
                useValue: { props, mirror },
              },
              STATIC_PROPS_HOOK_PROVIDER,
            ],
        });

    return (
        <>
            <Host ref={hostRef}>
                <SSRRaw data={html}></SSRRaw>
            </Host>
            <q-slot ref={slotRef}>
                <Slot />
            </q-slot>
        </>
    );
  }
}
