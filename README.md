# Picsa-Extension-Toolkit


Building:

Uncomment service worker from index.html (?)
Update version number in home.html and confix.xml



Troubleshooting:

clean node-modules folder and run 
$npm install 

firebase promise issue:
$npm install promise-polyfill --save-exact


#custom updates (not in repo)
-changing default canvas drawing color:
npm modules/ng2-canvas-whiteboard/dist/canvas-whiteboard-component
line 35
this._strokeColor = "rgb(91, 45, 0)";

-changing default canvas line width:
npm modules/ng2-canvas-whiteboard/dist/canvas-whiteboard-component
line 321
this.context.lineWidth = 5;