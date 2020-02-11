module.exports = {
  name: 'cutcal-business',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/business',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
