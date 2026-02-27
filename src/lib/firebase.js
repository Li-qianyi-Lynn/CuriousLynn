import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp
} from 'firebase/firestore';

// 这里把 frame.jsx 里的 Firebase 初始化封装成一个小工具，
// 优先使用部署环境注入的 __firebase_config，
// 本地开发则使用 Vite 的环境变量（VITE_FIREBASE_...），
// 如果两边都没有配置，就优雅降级（只关闭 Guestbook，不让页面崩掉）

let app = null;
let auth = null;
let db = null;
let appId = 'curious-lynn-id';

try {
  let firebaseConfig = null;

  // 1）优先：外部（例如云部署）注入的 __firebase_config，全量 JSON 字符串
  const hasGlobalConfig = typeof __firebase_config !== 'undefined' && __firebase_config;
  if (hasGlobalConfig) {
    firebaseConfig = JSON.parse(__firebase_config);
  } else {
    // 2）退而求其次：本地通过 .env.* 注入的 Vite 环境变量
    const {
      VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_AUTH_DOMAIN,
      VITE_FIREBASE_PROJECT_ID,
      VITE_FIREBASE_STORAGE_BUCKET,
      VITE_FIREBASE_MESSAGING_SENDER_ID,
      VITE_FIREBASE_APP_ID,
      VITE_FIREBASE_MEASUREMENT_ID
    } = import.meta.env;

    const hasEnvConfig =
      VITE_FIREBASE_API_KEY &&
      VITE_FIREBASE_AUTH_DOMAIN &&
      VITE_FIREBASE_PROJECT_ID &&
      VITE_FIREBASE_APP_ID;

    if (hasEnvConfig) {
      firebaseConfig = {
        apiKey: VITE_FIREBASE_API_KEY,
        authDomain: VITE_FIREBASE_AUTH_DOMAIN,
        projectId: VITE_FIREBASE_PROJECT_ID,
        storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: VITE_FIREBASE_APP_ID,
        // 可选
        measurementId: VITE_FIREBASE_MEASUREMENT_ID
      };
    }
  }

  if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.warn('Firebase config not found, guestbook will be disabled.');
  }

  if (typeof __app_id !== 'undefined' && __app_id) {
    appId = __app_id;
  }
} catch (e) {
  console.warn('Firebase initialization failed, guestbook will be disabled.', e);
}

export const firebaseEnv = {
  app,
  auth,
  db,
  appId,
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken
};

