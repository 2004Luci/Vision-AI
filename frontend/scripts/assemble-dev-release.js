const path = require('path');
const { execSync } = require('child_process');

const androidDir = path.join(__dirname, '..', 'android');
const isWin = process.platform === 'win32';
const gradlew = isWin ? 'gradlew.bat' : './gradlew';

console.log('Building dev release APK (assembleDevRelease)...\n');
execSync(`${gradlew} assembleDevRelease`, {
  cwd: androidDir,
  stdio: 'inherit',
});
console.log('\nAPK output: android/app/build/outputs/apk/dev/release/app-dev-release.apk');
