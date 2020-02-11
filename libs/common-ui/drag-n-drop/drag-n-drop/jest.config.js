module.exports = {
  name: 'common-ui-drag-n-drop-drag-n-drop',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common-ui/drag-n-drop/drag-n-drop',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
