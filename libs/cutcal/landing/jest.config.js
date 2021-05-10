module.exports = {
  name: 'cutcal-landing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/landing',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
