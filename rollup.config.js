import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

/**
 * @type {import('rollup').RollupOptions}
 */
export default (args) => {
  process.env.NODE_ENV = 'development';

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
    ],
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      commonjs(),
      typescript(),
      resolve(),
      babel({ exclude: '**/node_modules', babelHelpers: 'runtime' }),
    ],
  };

  return config;
};
