import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FB_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDER_ID,
	appId: import.meta.env.VITE_FB_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Inicializa analiticas
getAnalytics(app);
