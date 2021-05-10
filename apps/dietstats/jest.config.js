module.exports = {
  name: 'dietstats',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dietstats',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
}
