module.exports = {
  name: 'cutcal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/cutcal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
