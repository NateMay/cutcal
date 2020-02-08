module.exports = {
  name: 'drag-n-drop',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/drag-n-drop',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
