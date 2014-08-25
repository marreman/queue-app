var exec = require('cordova/exec');


function EstimoteBackground() {


        cordova.exec(
                     function callback(data) {
                        contentsDiv.innerHTML = 'finish initBeacon';
                     },     // A callback function that deals with the JSON object from the CDVPluginResult instance
                     function errorHandler(err) {
                        alert('Error');
                     },        // An error handler
                     'EstimoteBackground',  // What class to target messages to (method calls = message in ObjC)
                     'cordovaInitEstimote', // Which method to call
                     [ ] // These go in the CDVInvokedUrlCommand instance's.arguments property
                     );
        


}



var estimoteBackground = new EstimoteBackground();
module.exports = estimoteBackground;

