module.exports = {
  name: 'cutcal-legal',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/legal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
