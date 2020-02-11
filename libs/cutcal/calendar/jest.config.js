module.exports = {
  name: 'cutcal-calendar',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/calendar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
