module.exports = {
  name: 'diet',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/diet',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
