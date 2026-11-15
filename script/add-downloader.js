// Adds the Downloads + notification plugin to the generated Android project.
// Run after "npx cap add android". Safe to run twice.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const pkgDir = path.join(root, 'android', 'app', 'src', 'main', 'java', 'com', 'catmockdesk', 'app');
if (!fs.existsSync(path.join(root, 'android'))) throw new Error('android project not found, run "npx cap add android" first');
fs.mkdirSync(pkgDir, { recursive: true });
fs.copyFileSync(path.join(root, 'native', 'DownloaderPlugin.java'), path.join(pkgDir, 'DownloaderPlugin.java'));
fs.writeFileSync(path.join(pkgDir, 'MainActivity.java'),
`package com.catmockdesk.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(DownloaderPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
`);
const mf = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
let m = fs.readFileSync(mf, 'utf8');
if (!m.includes('POST_NOTIFICATIONS')) {
  m = m.replace(/<application/, '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />\n    <application');
  fs.writeFileSync(mf, m);
}
console.log('downloader plugin added');
