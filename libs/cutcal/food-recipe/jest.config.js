module.exports = {
  name: 'cutcal-food-recipe',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/food-recipe',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
