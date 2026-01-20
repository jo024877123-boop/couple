import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('🔧 [Firebase Config]:', {
    apiKey: firebaseConfig.apiKey ? '✓' : '✗',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓' : '✗',
    appId: firebaseConfig.appId ? '✓' : '✗'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set Persistence to SESSION (Login required on every new tab/window)
setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error("Persistence setting failed:", error);
});


export const db = getFirestore(app);
export { auth };
export const storage = getStorage(app);

// Test Firestore connection
(async () => {
    try {
        const { doc, getDoc } = await import('firebase/firestore');
        const testDoc = await getDoc(doc(db, 'users', 'test'));
        console.log('✅ [Firebase] Firestore connection test:', testDoc.exists() ? 'Document exists' : 'No document (but connection OK)');
    } catch (error) {
        console.error('❌ [Firebase] Firestore connection FAILED:', error.code, error.message);
        alert('⚠️ Firestore 연결 실패!\n' + error.code + '\n' + error.message + '\n\n프로젝트 설정을 확인하세요.');
    }
})();

