# Picsa-Extension-Toolkit


Building:

Uncomment service worker from index.html (?)
Update version number in home.html and confix.xml



Troubleshooting:

clean node-modules folder and run 
$npm install 

firebase promise issue:
$npm install promise-polyfill --save-exact

changing default canvas drawing color:
view npm modules/ng2-canvas-whiteboard/dist/canvas-whiteboard-component
change value on line 35
this._strokeColor = "rgb(91, 45, 0)";