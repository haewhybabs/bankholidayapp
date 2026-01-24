# Bank Holiday App [![CI Status](https://github.com/haewhybabs/bankholidayapp/actions/workflows/ci.yml/badge.svg)](https://github.com/haewhybabs/bankholidayapp/actions/workflows/ci.yml)

# Bank Holiday App (React Native)

A React Native application that fetches UK bank holidays from the official UK Government API, displays the next 5 upcoming holidays within the next 6 months, and allows the user to edit and save changes locally. The app also supports adding holidays to the device calendar, offline caching, testing, and CI automation.

---

## 📌 Features Covered

### ✅ Requirements
- **Fetch & display next 5 UK bank holidays within 6 months**
  - Fetches from: `https://www.gov.uk/bank-holidays.json`
  - Merges England & Wales, Scotland, Northern Ireland
  - Deduplicates by date + title
  - Filters within a 6-month window
  - Displays only the next 5 holidays  
  **(src/utils/holidayUtils.ts, src/store/holidaySlice.ts)**

- **Edit holiday**
  - Tap any holiday to edit title & date
  - Validation:
    - title not empty
    - date within 6 months
  - Saves updates in Redux (session persistence)
  **(src/screens/edit/[id].tsx, src/store/holidaySlice.ts)**

- **Add to Calendar**
  - Requests calendar permissions
  - Handles permission denial gracefully
  **(src/components/holiday/HolidayListItem.tsx, src/hooks/useCalendar.ts, src/components/permission/PermissionCard.tsx)**

- **Offline Support**
  - Uses `redux-persist` with `AsyncStorage` to cache holidays
  - Displays cached data when offline
  **(src/store/index.ts)**

---

## 🧠 Data Architecture & Flow

- Holiday data is fetched and managed in Redux using an async thunk  
  **(src/store/holidaySlice.ts)**

- Raw API data is merged, deduplicated, filtered, and formatted before entering Redux  
  **(src/utils/holidayUtils.ts)**

- Initial fetch occurs on app launch from the splash screen  
  **(app/index.tsx)**

- UI screens consume data via a custom hook exposing loading, error, and offline state  
  **(src/hooks/useHolidays.ts)**

- Offline support is handled through `redux-persist`, restoring previously fetched holidays from `AsyncStorage` on launch  
  **(src/store/index.ts)**

---

## 🖥️ Design Flow

### Home Screen Flow
- Splash screen dispatches `fetchHolidays()` and waits for status before navigating  
  **(app/index.tsx)**
- Home screen consumes data via `useHolidays()`  
  **(src/hooks/useHolidays.ts)**
- Empty state appears if no holidays are available  
  **(src/components/feedback/EmptyState.tsx)**
- Featured holiday card + list items render when data exists  
  **(src/components/holiday/FeaturedHolidayCard.tsx, src/components/holiday/HolidayListItem.tsx)**

### Loading & UX States
- Skeleton loader during initial fetch  
  **(src/components/loading/SkeletonLoader.tsx)**
- Offline banner when cached data is in use  
  **(src/components/offline/OfflineBanner.tsx)**
- Permission card when calendar permission is denied  
  **(src/components/permission/PermissionCard.tsx)**

### List Interactions
Each holiday item supports:
- Tap to edit
- Add to calendar
- Swipe to delete
- Confirmation modal before deletion

**(src/components/holiday/HolidayListItem.tsx, src/components/modal/ConfirmationModal.tsx)**

---

## ✍️ Edit Screen Flow

- Reads holiday ID from route params and selects it from Redux  
  **(src/screens/edit/[id].tsx)**
- Inputs are pre-filled with existing title and date
- Validation rules enforced before save
- Save action opens a confirmation modal before dispatching Redux update  
  **(src/store/holidaySlice.ts)**

---

## 🧪 Quality Assurance & CI

### Testing
- Jest unit tests covering utilities, Redux slice logic, and UI screens
- Approximate test coverage: **~80%**

### Continuous Integration (GitHub Actions)
- Automated CI pipeline using **GitHub Actions**
- Triggered on every push to `main` and all pull requests
- Workflow file: `.github/workflows/ci.yml`

**Environment**
- `ubuntu-latest`
- Node.js **20**
- Deterministic installs via `npm ci`

---

## 📄 Documentation & Resources

- 📘 Technical Documentation  
  https://docs.google.com/document/d/1sMFZp_qI6WwERAN64tKYLNX1dN96QwBD4rxDB0Tv7_I/edit?tab=t.0

- 🎨 Design & Screenshots  
  https://www.canva.com/design/DAG_WdTziGA/3Ut3wtrLt5-25-kGP1EQWg/view?utm_content=DAG_WdTziGA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8d3ee03cda

- 📦 Android APK (Download)  
  https://drive.google.com/file/d/11sahzhvbOS520jav-MqO0iTVDLev4EVP/view?usp=sharing

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/haewhybabs/bankholidayapp.git
cd bankholidayapp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run using Expo Go
```bash
npx expo start
```

- Install **Expo Go** from the App Store or Play Store
- Scan the QR code to open the app

### 4. Run on device or emulator (optional)
```bash
expo run:android
expo run:ios
```


