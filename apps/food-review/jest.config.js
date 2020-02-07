module.exports = {
  name: 'food-review',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/food-review',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
