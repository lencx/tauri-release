import { defineBuildConfig } from 'unbuild'
import fg from 'fast-glob'

export default defineBuildConfig({
  entries: [
    ...fg.sync('src/*.ts', { ignore: ['src/types.ts', 'src/utils.ts'] })
      .map(i => i.slice(0, -3)),
  ],
  clean: true,
  declaration: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})