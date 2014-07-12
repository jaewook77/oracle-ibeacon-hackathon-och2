# Hello World PhoneGap Application

> A Hello World application built with PhoneGap

## Tutorial
http://docs.phonegap.com/en/edge/guide_cli_index.md.html#The%20Command-Line%20Interface
https://github.com/jaewook77/jqm-cordova-template-project

## Usage
$ sudo npm install -g cordova
$ cordova create helloworld com.example.hello HelloWorld (This Hello World phonegap sample has been created by this command, you don't need to run it again)

$ cd hello
$ cordova platform add ios
$ cordova platform add android
$ cordova platforms ls (just to confirm which platforms are installed/available.)

$ cordova build

$ cordova emulate ios
$ npm install -g ios-sim (if ios simulator is not already installed)

## Install Plugins

cordova plugin add org.apache.cordova.console
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.dialogs
cordova plugin add org.apache.cordova.splashscreen
cordova plugin add org.apache.cordova.statusbar
cordova plugin add https://github.com/kdzwinel/phonegap-estimotebeacons.git
cordova plugin add https://github.com/mdc-ux-team/estimote-beacons-phonegap-plugin-for-android.git


# recommended minimal plugins
cordova plugin add org.apache.cordova.console
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.dialogs
cordova plugin add org.apache.cordova.splashscreen
cordova plugin add org.apache.cordova.statusbar

# Estimote Beacons Plugin for Android:
$ cordova plugin add https://github.com/mdc-ux-team/estimote-beacons-phonegap-plugin-for-android.git

## Run application
# In a browser
cordova serve
# Then, navigate to http://localhost:8000/ios/www/ (replace `ios` with any platform you installed)

# In an emulator (replace `ios` with an installed platform)
cordova emulate ios

# On the device (replace `ios` with an installed platform)
cordova build ios
cordova run ios


## Other Plugins
Basic device information (Device API):
$ cordova plugin add org.apache.cordova.device

Network Connection and Battery Events:
$ cordova plugin add org.apache.cordova.network-information
$ cordova plugin add org.apache.cordova.battery-status

Accelerometer, Compass, and Geolocation:
$ cordova plugin add org.apache.cordova.device-motion
$ cordova plugin add org.apache.cordova.device-orientation
$ cordova plugin add org.apache.cordova.geolocation

Camera, Media playback and Capture:
$ cordova plugin add org.apache.cordova.camera
$ cordova plugin add org.apache.cordova.media-capture
$ cordova plugin add org.apache.cordova.media

Access files on device or network (File API):
$ cordova plugin add org.apache.cordova.file
$ cordova plugin add org.apache.cordova.file-transfer

Notification via dialog box or vibration:
$ cordova plugin add org.apache.cordova.dialogs
$ cordova plugin add org.apache.cordova.vibration

Contacts:
$ cordova plugin add org.apache.cordova.contacts

Globalization:
$ cordova plugin add org.apache.cordova.globalization

Splashscreen:
$ cordova plugin add org.apache.cordova.splashscreen

Open new browser windows (InAppBrowser):
$ cordova plugin add org.apache.cordova.inappbrowser

Debug console:
$ cordova plugin add org.apache.cordova.console

## Manage plugins
$ cordova plugin ls    # or 'plugin list'
$ cordova plugin rm org.apache.cordova.console

