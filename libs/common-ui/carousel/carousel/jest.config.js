module.exports = {
  name: 'common-ui-carousel-carousel',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/common-ui/carousel/carousel',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
