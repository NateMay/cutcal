module.exports = {
  name: 'common-ui-landing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common-ui/landing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
