module.exports = {
  name: 'cutcal-calendar',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/calendar',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
