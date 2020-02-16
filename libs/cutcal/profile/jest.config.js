module.exports = {
  name: 'cutcal-profile',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/profile',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
