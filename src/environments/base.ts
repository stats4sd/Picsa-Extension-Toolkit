// As angular can't pick up process.env variables ng-node-environment is used to populate
// this file

const env: IEnv = {
  FIREBASE_API_KEY: "",
  FIREBASE_AUTH_DOMAIN: "",
  FIREBASE_DATABASE_URL: "",
  FIREBASE_PROJECT_ID: "",
  FIREBASE_STORAGE_BUCKET: "",
  FIREBASE_MESSAGING_SENDER_ID: "",
  FIREBASE_APP_ID: ""
};
export default env;
interface IEnv {
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_DATABASE_URL: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
}
