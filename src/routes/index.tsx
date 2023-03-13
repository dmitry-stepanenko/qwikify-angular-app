/* eslint-disable */

import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { Standalone2Qwikified, StandaloneQwikified } from "~/angular/components";

export default component$(() => {

    const contentOptionSig = useSignal<'one' | 'two'>('one');

    useOnDocument("hello", $((data) => {
        console.log('HELLO EMITTED', {data});
    }));

    return (
        <div>
            <h1>
                Welcome to Qwik <span class="lightning">⚡️</span>
            </h1>

            <div style="background-color: lightsteelblue">
            <StandaloneQwikified client:hover contentOption={contentOptionSig.value} hello={$(() => console.log('hello handler'))}>
                <div id="meow">I am projected</div>
            </StandaloneQwikified>
            {/* <br />
            <Standalone2Qwikified client:only/>
            <br />
            <StandaloneQwikified client:only/> */}
                {/* <app-standalone1></app-standalone1>
                <br />
                <app-standalone2></app-standalone2>
                <br />
                <button onClick$={$(() => _render(document.querySelector("app-standalone1")!, StandaloneComponent))}>
                    render standalone1
                </button>
                <button onClick$={$(() => _render(document.querySelector("app-standalone2")!, Standalone2Component))}>
                    render standalone2
                </button> */}
            </div>

            <button onClick$={$(() => {
                contentOptionSig.value = contentOptionSig.value === 'two' ? 'one' : 'two';
            })}>Wake up by update of the bound data: "{contentOptionSig.value}"</button>

            <Link class="mindblow" href="/flower/">
                Blow my mind 🤯
            </Link>
            <Link class="todolist" href="/todolist/">
                TODO demo 📝
            </Link>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
