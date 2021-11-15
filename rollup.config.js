import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

const isProduction = (env) => env === 'production';

/**
 * @type {import('rollup').RollupOptions}
 */
export default (args) => {
  process.env.NODE_ENV = args.environment;
  console.log(process.env.NODE_ENV);
  let config = {
    input: ['./src/Lazy.ts'],
    output: [
      {
        dir: './',
        format: 'esm',
        entryFileNames: pkg.module,
      },
      {
        dir: './',
        format: 'commonjs',
        entryFileNames: pkg.main,
      },
      {
        dir: './',
        format: 'commonjs',
        entryFileNames: pkg.main,
      },
      {
        dir: './',
        format: 'umd',
        name: pkg.name,
        entryFileNames: pkg.unpkg,
      },
    ],
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      commonjs(),
      typescript(),
      resolve(),
      babel({ exclude: '**/node_modules', babelHelpers: 'runtime' }),
      ...(isProduction(process.env.NODE_ENV)
        ? [
            terser({
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            }),
          ]
        : []),
    ],
  };

  const types = {
    // path to your declaration files root
    input: './dist/dts/Lazy.d.ts',
    output: [{ file: 'dist/dts/index.d.ts', format: 'es' }],
    plugins: [dts()],
  };

  return [config, types];
};
