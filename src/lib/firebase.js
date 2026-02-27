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
// 同时在本地没有 __firebase_config 的情况下优雅降级（只关闭 Guestbook，不让页面崩掉）

let app = null;
let auth = null;
let db = null;
let appId = 'curious-lynn-id';

try {
  const hasConfig = typeof __firebase_config !== 'undefined' && __firebase_config;
  if (hasConfig) {
    const firebaseConfig = JSON.parse(__firebase_config);
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

