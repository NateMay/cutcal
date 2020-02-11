module.exports = {
  name: 'common-ui-am-pm-playground',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common-ui/am-pm/playground',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
