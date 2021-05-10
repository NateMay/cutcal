module.exports = {
  name: 'cutcal-fallback',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/fallback',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
