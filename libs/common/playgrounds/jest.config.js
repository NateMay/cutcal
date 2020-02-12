module.exports = {
  name: 'playgrounds',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/playgrounds',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
