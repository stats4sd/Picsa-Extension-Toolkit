# Picsa-Extension-Toolkit

## Building:

Update version number in changelog/version, package.json and config.xml

_Make sure datasets and metadata.json in assets/datasets (not available on git)_

_Update data from firebase database to budget-tool/data.ts and storage.data.ts_

### Live

`npm run deploy:prod`

### Staging

`npm run deploy:staging`
(also automatically deploys to staging on git commit)

### android

Test production version on android
`npm run run:android`
(need to check whether also want to set NODE_ENV="production", e.g.
set NODE_ENV="production"&& ionic cordova run android --prod )

## General

### Adding Resources

Hard coded resources in the assets/resources folder (include cover image png with same file name .png)
Hard coded meta data in providers/storage.data.ts, make sure to include viewableBy if not everybody
Also upload to firebase storage for web link and populate /Resources firestore entry

### Database Backups

Create subfolder for date
`firestore-backup-restore --accountCredentials backups/firebase-service-key.json --backupPath backups/{date}`
Additional flags: --plainJSONBackup (-L) (no type info)

### Merge database files

Create gulp file to hanle merge, e.g.

```
var gulp = require("gulp");
var jsonConcat = require("gulp-json-concat");
var jsonTransform = require("gulp-json-transform");

gulp.task("merge", function() {
  return gulp
    .src("2018-10-22-plain/forms/farmerVisit/submissions/**/*.json")
    .pipe(
      jsonConcat("merged.json", function(data) {
        return new Buffer(JSON.stringify(data));
    ***REMOVED***)
    )
    .pipe(
      jsonTransform(function(data, file) {
        var arr = [];
        for (let key in data) {
          data[key]._key = key;
          arr.push(data[key]);
      ***REMOVED***
        return arr;
    ***REMOVED***)
    )
    .pipe(gulp.dest("./"));
});
```

_./backups/mergeFormsGulp.js_

Run the file
`gulp merge --gulpfile backups/mergeFormsGulp.js`

## Troubleshooting:

make sure all cli=s up to date
$npm install -g cordova ionic@latest

clean node-modules folder and run (with elevated command prompt)
$npm install

firebase promise issue:
$npm install promise-polyfill --save-exact

(issue - cordova plugin file, if cannot install may need to:)
remove platforms and cordova-plugin-file then re-add?
$ionic cordova plugin remove --save cordova-plugin-file cordova-plugin-file-transfer
$npm uninstall --save cordova-plugin-file cordova-plugin-file-transfer
$npm install --save cordova-plugin-file cordova-plugin-file-transfer @ionic-native/file
$ionic cordova plugin add --save cordova-plugin-file cordova-plugin-file-transfer

### video player

At time of writing cordova 8 had deprecated --nofetch flag and videoplayer plugin not
available properly via npm resulting in unable to fetch. manually copied to plugins folder from git repo instead.

### ionic import sources

Current typescript/vscode has issue trying to import from ionic-angular
search for ionic-angular and replace with ionic-angular
(https://github.com/Microsoft/TypeScript/issues/25204)

### build fails for android - Multiple dex files

possibly due to conflicts within file opener and fileopener2

$ionic cordova platform remove android
$ionic cordova platform add android
try again

if still, make sure cordova plugin android-support-gradle-release installed
$cordova plugin add cordova-android-support-gradle-release

or try with a higher android api version installed

### C3 and leaflet types

Currently bugged and removed https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21794
should recheck in future

### SurveyJS integration

Using survey-angular which has issue with typings. Need to install @types/knockout seperately and change
tsconfig.json to specify "typeRoots": ["./node_modules/@types/"]"

#ios build notes

- will require different resources section as different external storage stuctures
  (https://stackoverflow.com/questions/33076885/save-file-to-public-directory-using-cordova-filetransfer)
- ionic native inappbrowser will work for pdfs so this can be used instead
  https://bendyworks.com/blog/The-Not-At-All-Definitive-Guide-To-Opening-PDF-Files-In-Ionic-2
