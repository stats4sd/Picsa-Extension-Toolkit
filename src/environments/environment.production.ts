const e: IEnv = process.env as any;
console.log("env", e);
***REMOVED***
  production: false,
***REMOVED***
    apiKey: e.FIREBASE_API_KEY,
    authDomain: e.FIREBASE_AUTH_DOMAIN,
    databaseURL: e.FIREBASE_DATABASE_URL,
    projectId: e.FIREBASE_PROJECT_ID,
    storageBucket: e.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: e.FIREBASE_MESSAGING_SENDER_ID,
    appId: e.FIREBASE_APP_ID
***REMOVED***
***REMOVED***

// The following variables are programatically added to the production build
// using travis CI
interface IEnv {
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_DATABASE_URL: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
}
