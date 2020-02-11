module.exports = {
  name: 'common-ui-image-upload-image-upload',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common-ui/image-upload/image-upload',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
