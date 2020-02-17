module.exports = {
  name: 'playgrounds',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/playgrounds',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
