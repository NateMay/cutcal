module.exports = {
  name: 'food-review',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/food-review',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
}
