module.exports = {
  name: 'ng-testing',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
