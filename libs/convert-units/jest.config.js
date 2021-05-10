module.exports = {
  name: 'convert-units',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/convert-units',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
