module.exports = {
  name: 'common-ui-docs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/common-ui-docs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
