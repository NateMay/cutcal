import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from '@angular-devkit/schematics'
import { getProjectConfig } from '@nrwl/workspace'
// import { getWorkspace } from '@schematics/angular/utility/config';
// import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
// import { join, normalize } from 'path';
import { CommonComponenetSchematicOptions } from './schema'

const generateLibrary = (schema: CommonComponenetSchematicOptions): Rule =>
  externalSchematic('@nrwl/workspace', 'lib', {
    name: schema.name,
  })

// export function setupOptions(tree: Tree, schema: any): any {
//   const workspace: WorkspaceSchema = getWorkspace(tree);

//   // set default project if not selected
//   if (!schema.project) schema.project = Object.keys(workspace.projects)[0]

//   // get project
//   const project = workspace.projects[schema.project]

//   // set the path to the project
//   schema.path = join(normalize(project.root), 'src')
//   return schema
// }

function generateFiles(schema: CommonComponenetSchematicOptions): Rule {
  console.log(schema)
  return (tree: Tree, context: SchematicContext): any => {
    // context.logger.info('adding NOTES.md to lib');

    const templateSource = apply(url('./files'), [
      move(getProjectConfig(tree, schema.name).root),
    ])

    return chain([mergeWith(templateSource)])(tree, context)
  }
}

export default (schema: CommonComponenetSchematicOptions): Rule => (
  tree: Tree,
  context: SchematicContext
): any => {
  // tree.create('hello.ts', `console.log('hello world')`)
  const x = chain([generateLibrary(schema), generateFiles(schema)])(
    tree,
    context
  )
  return x
}
// return chain([
//   externalSchematic('@nrwl/workspace', 'lib', {
//     name: schema.name,
//   }),
// ]);
