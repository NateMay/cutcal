module.exports = {
  name: 'common-ui-dynamic-width-dynamic-width',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/common-ui/dynamic-width/dynamic-width',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
