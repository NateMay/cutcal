module.exports = {
  name: 'cc-ng-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cc-ng-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
