module.exports = {
  name: 'cutcal-food-recipe',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/food-recipe',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
