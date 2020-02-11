module.exports = {
  name: 'common-ui-date-time-binder-date-time-binder',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common-ui/date-time-binder/date-time-binder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
