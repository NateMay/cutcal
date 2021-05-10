import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import * as path from 'path'

export default (
  schema: any
): Rule | never => // if (!schema.name.startsWith('auth-')) {
  //   throw Error(`Auth modules must be prefixed with 'auth-'`);
  // }

  chain([
    externalSchematic('@schematics/angular', 'module', {
      project: schema.project,
      name: schema.name,
      routing: true,
      module: 'app.module.ts'
    }),
    externalSchematic('@schematics/angular', 'service', {
      project: schema.project,
      name: schema.name,
      path: path.join(
        'apps',
        schema.project,
        'src',
        'app',
        schema.name,
        'services'
      )
    }),
    externalSchematic('@schematics/angular', 'guard', {
      project: schema.project,
      name: schema.name,
      path: path.join(
        'apps',
        schema.project,
        'src',
        'app',
        schema.name,
        'services'
      )
    })
  ])
