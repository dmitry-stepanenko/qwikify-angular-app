import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {angular} from './src/angular-int/angular-vite-plugin'
import { createCompilerPlugin } from './src/angular-int/compiler-plugin'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), angular({tsconfig: './tsconfig.json'})],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    // optimizeDeps: {
    //   include: ['@whoho/mylib', '@angular/core', '@angular/platform-browser', 'rxjs/operators', 'rxjs'],
    //   esbuildOptions: {
    //     plugins: [
    //       createCompilerPlugin({tsconfig: './tsconfig.json', sourcemap: false})
    //     ],
    //     define: {
    //       ngDevMode: 'false',
    //       ngJitMode: 'false',
    //       ngI18nClosureMode: 'false',
    //     },
    //   },
    // },
    resolve: {
      conditions: ['style'],
    },
  };
});
