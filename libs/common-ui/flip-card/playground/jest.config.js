module.exports = {
  name: 'common-ui-flip-card-playground',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common-ui/flip-card/playground',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
