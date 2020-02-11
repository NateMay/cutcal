module.exports = {
  name: 'common-ui-timepicker-timepicker',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common-ui/timepicker/timepicker',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
