// import 'zone.js/dist/zone.js';
import { createComponent, NgZone, reflectComponentType, type ɵComponentType as ComponentType } from "@angular/core";
import { createApplication } from "@angular/platform-browser";

// export const render = (element: HTMLElement) => {
//     return (
//         Component: ComponentType<unknown>,
//         props?: Record<string, unknown>
//         // _childHTML?: unknown
//     ) => {
//         _render(element, Component, props);
//     };
// };

export const _render = async (element: Element, Component: ComponentType<unknown>, props?: unknown) => {
    const appRef = await createApplication();
    const zone = appRef.injector.get(NgZone);
    zone.run(() => {
        const componentRef = createComponent(Component!, {
            environmentInjector: appRef.injector,
            hostElement: element,
        });

        const mirror = reflectComponentType(Component!);
        console.log({mirror, props});
        if (props && mirror) {
            for (const [key, value] of Object.entries(props)) {
                if (mirror.inputs.some(({ templateName, propName }) => templateName === key || propName === key)) {
                    componentRef.setInput(key, value);
                }
            }
        }

        appRef.attachView(componentRef.hostView);
    });
};
