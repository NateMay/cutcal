module.exports = {
  name: 'cutcal-footer',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/footer',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
