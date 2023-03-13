import * as h  from "@whoho/mylib";
import { qwikify$ } from "~/angular-int/qwikify";
console.log('OK', !!h);
// TODO: will be undefined if error?
export const StandaloneQwikified = qwikify$<{contentOption: 'one' | 'two', hello?: () => any}>(h.StandaloneComponent);
export const Standalone2Qwikified = qwikify$(h.Standalone2Component);