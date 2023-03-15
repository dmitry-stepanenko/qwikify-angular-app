import { Component } from "@angular/core";
import * as h  from "@whoho/mylib";
import { qwikify$ } from "~/angular-int/qwikify";
// TODO: will be undefined if error?


@Component({
    selector: 'my-qwik-ng',
    standalone: true,
    imports: [h.StandaloneComponent, h.Standalone2Component],
    template: `
        HERE GOES 1:
        <app-standalone1></app-standalone1>
        HERE GOES 2:
        <app-standalone2></app-standalone2>
    `
})
// @ts-ignore
export class  MyQwikNgComponent {
    
}

// @ts-ignore
export const Internal = qwikify$(MyQwikNgComponent);
// export const Internal = qwikify$(h.Standalone2Component);

export const StandaloneQwikified = qwikify$<{contentOption: 'one' | 'two', hello?: () => any}>(h.StandaloneComponent);
// export const Standalone2Qwikified = qwikify$(h.Standalone2Component);