import { Component, EventEmitter, Input, Output } from "@angular/core";
import {Standalone2Component, StandaloneComponent}  from "@whoho/mylib";
import { qwikify$ } from "~/qwik-angular/qwikify";
// TODO: will be undefined if error?


@Component({
    selector: 'my-qwik-ng',
    standalone: true,
    imports: [StandaloneComponent, Standalone2Component],
    template: `
        HERE GOES 1:
        <app-standalone1 [contentOption]="contentOption" (hello)="processHelloOutput($event)">
            Projected from qwik angular component:
            <ng-content></ng-content>
        </app-standalone1>
        HERE GOES 2:
        <app-standalone2></app-standalone2>
    `
})
export class  MyQwikNgComponent {
    @Input() contentOption: 'one' | 'two' = 'two';

    @Output() hello2 = new EventEmitter<string>();

    processHelloOutput(greeting: string) {
        this.hello2.emit(greeting)
    }
}

export const Internal = qwikify$<{contentOption: 'one' | 'two', hello2?: () => any}>(MyQwikNgComponent);

export const StandaloneQwikified = qwikify$<{contentOption: 'one' | 'two', hello?: () => any}>(StandaloneComponent);