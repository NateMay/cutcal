module.exports = {
  name: 'cutcal-sidebar',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/sidebar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
