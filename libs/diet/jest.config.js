module.exports = {
  name: 'diet',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/diet',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
