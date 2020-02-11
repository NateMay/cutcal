module.exports = {
  name: 'common-ui-animate-playground',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common-ui/animate/playground',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
