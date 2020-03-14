module.exports = {
  name: 'cc-timepicker',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cc-timepicker',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
