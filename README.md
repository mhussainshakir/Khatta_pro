# H-H Book Photo State & Book Center — Cloud App

## App kaise deploy karein (Vercel — free)

1. **vercel.com** pe jao, GitHub/Google se sign up karo (free)
2. Dashboard mein **"Add New" → "Project"** click karo
3. **"Deploy without Git"** ya drag-drop option dhoondo — is folder ke **teeno files + icons folder** (`index.html`, `manifest.json`, `sw.js`, `icons/`) ko seedha drag-drop kar do
4. Deploy hote hi ek link milega jese: `hh-book-center.vercel.app` — yehi tumhara app ka link hai

## Phone pe install kaise karein (PWA)

- Us link ko Chrome (Android) ya Safari (iPhone) mein kholo
- Chrome: 3-dot menu → **"Add to Home screen"**
- Safari: Share button → **"Add to Home Screen"**
- App ka icon home screen pe aa jayega, bilkul normal app ki tarah khulega

## Pehli baar app kholte waqt

- Pehli dafa **naya PIN set karne** ko kahega (4 digit) — jo bhi PIN yaad rakh sako wo set kar dena
- Uske baad har baar app khulte waqt yehi PIN mangega

## Zaroori settings jo already ho chuki hain

- ✅ Cloudinary (photos) — connected
- ✅ Google Drive (files/documents) — connected
- ✅ Firebase (database) — connected

## Agar kabhi PIN bhool jao

Browser settings mein jaake is site ka data/cache clear karna hoga — ya mujhe bata dena, main reset ka tareeqa de dunga.

## Baad mein add ho sakne wale features

- Dashboard (aaj kitni files aayin, total customers)
- Auto-delete old files (30 din baad)
- Multiple staff PINs
