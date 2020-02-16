module.exports = {
  name: 'common-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/common-ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
