# CAT Mock Desk for Android (APK) + Cloud sync

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

## Cloud sync (Supabase, free)

App kholo, **More > Cloud sync**. Wahan setup steps likhe hain (SQL ke liye **Copy SQL** button bhi hai):

1. supabase.com par free account aur **New project**.
2. **SQL Editor > New query**, SQL paste karo, **Run**.
3. **Authentication > Sign In / Providers > Email** mein **Confirm email** band (off) karo.
4. **Project Settings > API Keys** se **Project URL** aur **anon / publishable key** copy karke app mein paste karo.
5. Email aur password chuno aur **Create account** dabao. Phone aur Windows dono mein wahi URL, key, email aur password daal ke **Sign in** dabao.

- Papers, attempts, rename, delete, tags aur AI notes sync hote hain.
- App khulte hi aur har badlav ke kuch second baad apne aap sync hota hai. **Sync now** se haath se bhi kar sakte ho.
- AI key aur settings har device par alag daalni padti hain.
- Supabase free project ek hafta bilkul use na ho to pause ho sakta hai. Dashboard mein ek click se wapas chalu hota hai, data bacha rehta hai.

## Dhyan rakhne ki baatein

- PDF import ke liye internet chahiye (PDF reader library online se aati hai). Scan wali PDF ka OCR sirf Windows app mein hai.
- Back button: window band karta hai, phir home le jata hai, home par do baar dabane par band hota hai.
- Backup export Android par nahi, uski jagah Cloud sync use karo.

**Direct update (build 2026-11-14.42 se):** App me Menu (⋮) > **App update** kholo. Ek baar apni GitHub repository ka link paste karo (jaise https://github.com/naam/repo). Aage se bas repository me `www/index.html` replace karo aur app me **Check for update** > **Install and restart** dabao. Naya APK banane ki zarurat nahi. Naya APK kabhi install karo to dono me se naya version use hota hai. "Use built-in version" se APK wala version wapas aa jaata hai. Repository public honi chahiye.

**Agar update ke baad app blank ho jaye:** App band karke dobara kholo. Build .44 se app khud pichhla (APK wala) version wapas le aati hai. Data nahi jaata.

## PDF / file downloads + notification (build .51)
Files (PDF, JSON, text) are now saved to **Downloads / CAT Mock Desk** and a "Download complete" notification appears in the phone's notification panel (tap it to open the file). On Android 13+ the app asks for notification permission on first start.
This needs native code, so **a new APK build is required** (the in-app update cannot ship it). Upload to the repo: `native/DownloaderPlugin.java`, `scripts/add-downloader.js`, the updated `.github/workflows/android.yml` and `www/index.html`.
