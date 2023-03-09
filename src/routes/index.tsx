import { $, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { StandaloneComponent, Standalone2Component } from "@whoho/mylib";
import { _render } from "~/angular-int/client";

export default component$(() => {
    return (
        <div>
            <h1>
                Welcome to Qwik <span class="lightning">⚡️</span>
            </h1>

            <div style="background-color: lightsteelblue">
                <app-standalone1></app-standalone1>
                <br />
                <app-standalone2></app-standalone2>
                <br />
                <button onClick$={$(() => _render(document.querySelector("app-standalone1")!, StandaloneComponent))}>
                    render standalone1
                </button>
                <button onClick$={$(() => _render(document.querySelector("app-standalone2")!, Standalone2Component))}>
                    render standalone2
                </button>
            </div>

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
