module.exports = {
  name: 'common-ui-carousel-playground',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common-ui/carousel/playground',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
