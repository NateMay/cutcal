module.exports = {
  name: 'cutcal-support',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/support',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
