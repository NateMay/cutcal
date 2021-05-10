module.exports = {
  name: 'cutcal-nutrient',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/cutcal/nutrient',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
