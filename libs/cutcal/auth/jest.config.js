module.exports = {
  name: 'cutcal-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/auth',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
