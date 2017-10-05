# Picsa-Extension-Toolkit


Building:

Uncomment service worker from index.html (?)
Update version number in home.html and confix.xml



Troubleshooting:

clean node-modules folder and run 
$npm install 

firebase promise issue:
$npm install promise-polyfill --save-exact

(known issue - cordova plugin file)
if cannot install npm cordova plugin file, may first need to run
$ionic cordova plugin rm cordova-plugin-file
delete existing node modules folder
$npm install
$ionic cordova plugin add cordova-plugin-file



#custom updates (not in repo)
-changing default canvas drawing color:
npm modules/ng2-canvas-whiteboard/dist/canvas-whiteboard-component
line 35
this._strokeColor = "rgb(91, 45, 0)";

-changing default canvas line width:
npm modules/ng2-canvas-whiteboard/dist/canvas-whiteboard-component
line 321
this.context.lineWidth = 5;

#ios build notes
- will require different resources section as different external storage stuctures
(https://stackoverflow.com/questions/33076885/save-file-to-public-directory-using-cordova-filetransfer)
- ionic native inappbrowser will work for pdfs so this can be used instead
https://bendyworks.com/blog/The-Not-At-All-Definitive-Guide-To-Opening-PDF-Files-In-Ionic-2