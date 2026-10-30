// Makes every build use the same signing key (catmock.keystore) so a new APK installs over the old one and keeps your data.
const fs = require('fs'), path = require('path');
const f = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
let g = fs.readFileSync(f, 'utf8');
if (g.includes('catmock.keystore')) { console.log('already patched'); process.exit(0); }
const block = `android {
    signingConfigs {
        debug {
            storeFile file("\${rootProject.projectDir}/../catmock.keystore")
            storePassword "catmock123"
            keyAlias "catmock"
            keyPassword "catmock123"
        }
    }
`;
const i = g.search(/android\s*\{/);
if (i < 0) throw new Error('android block not found in build.gradle');
g = g.replace(/android\s*\{\n?/, block);
fs.writeFileSync(f, g);
console.log('patched build.gradle');
