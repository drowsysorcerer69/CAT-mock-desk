# CAT Mock Desk for Android (APK) + Google Drive sync

Is zip mein Android app ka poora project hai. APK banane ke 2 raaste hain. Pehla aasaan hai, laptop par kuch install nahi karna.

## Raasta 1: GitHub se APK banwao (free, kuch install nahi)

1. github.com par free account banao, phir **New repository** (Private rakho), naam kuch bhi, jaise `cat-mock-desk-android`.
2. Is zip ko extract karo. Repository ke page par **uploading an existing file** dabao aur extract hue folder ke **andar ki saari files aur folders** drag karo (`.github`, `scripts`, `www`, `package.json`, `capacitor.config.json`, `catmock.keystore`, `.gitignore`). **Commit changes** dabao.
   - Agar `.github` folder upload na ho: **Add file > Create new file**, naam mein `.github/workflows/android.yml` likho aur us file ka text paste karo.
3. Upar **Actions** tab kholo. **Build Android APK** chuno, **Run workflow** dabao. 5 se 8 minute lagte hain.
4. Hara tick aane par us run ko kholo. Neeche **Artifacts** mein **CAT-Mock-Desk-APK** download karo aur zip khol ke `app-debug.apk` nikalo.
5. APK ko phone par bhejo (WhatsApp/Drive/USB), kholo, "Install unknown apps" allow karo, install karo.

**App update karna:** naya `cat-mock-desk-update.html` mile to usko `www/index.html` naam se repository mein replace karo (GitHub par `www/index.html` kholo, edit/upload karo). Phir Actions mein dobara **Run workflow**. Naya APK purane ke upar install hota hai, kyunki har baar same signing key (`catmock.keystore`) use hoti hai. Data bhi bacha rehta hai.

## Raasta 2: laptop par Android Studio se

1. Node.js (LTS) aur Android Studio install karo, Android Studio mein ek baar SDK download ho jaye.
2. Is folder mein terminal kholo:
   ```
   npm install
   npm run android:add
   npx cap sync android
   cd android
   gradlew assembleDebug
   ```
3. APK yahan milega: `android/app/build/outputs/apk/debug/app-debug.apk`

## Google Drive sync

App kholo, **More > Google Drive sync**. Wahan 10 minute ka one-time setup (Client ID aur secret banana) likha hai. Yahi Windows app mein bhi karna hai, aur dono mein same Google account se sign in karna hai.

- Papers, attempts, rename, delete, tags aur AI notes sync hote hain.
- Data aapke Drive ke hidden app-folder mein ek file mein rehta hai.
- AI key aur settings har device par alag daalni padti hain.
- App khulte hi aur har badlav ke kuch second baad apne aap sync hota hai. **Sync now** se haath se bhi kar sakte ho.

## Dhyan rakhne ki baatein

- PDF import ke liye internet chahiye (PDF reader library online se aati hai). Scan wali PDF ka OCR sirf Windows app mein hai.
- Back button: window band karta hai, phir home le jata hai, home par do baar dabane par band hota hai.
- Backup export Android par nahi, uski jagah Drive sync use karo.
