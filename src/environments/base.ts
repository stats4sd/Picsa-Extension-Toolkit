// As angular can't pick up process.env variables ng-node-environment is used to repopulate
// this file on production config (see https://github.com/angular/angular-cli/issues/4318)

const env: IEnv = {
  firebaseApiKey: "AIzaSyCjVzdn5WTQKSDqGw9F0nNbhtdCDcPYP3I",
  firebaseAuthDomain: "extension-toolkit-staging.firebaseapp.com",
  firebaseDatabaseUrl: "https://extension-toolkit-staging.firebaseio.com",
  firebaseProjectId: "extension-toolkit-staging",
  firebaseStorageBucket: "extension-toolkit-staging.appspot.com",
  firebaseMessagingSenderId: "621985864882",
  firebaseAppId: "1:621985864882:web:a19ebe2425f632b6"
};
export default env;
interface IEnv {
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseDatabaseUrl: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
}
