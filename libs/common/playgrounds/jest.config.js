module.exports = {
  name: 'playgrounds',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/playgrounds',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
