module.exports = {
  name: 'common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/common',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
}
