# Estimote iBeacons Cordova/PhoneGap Plugin for Android

**_NOTE: THIS IS A WORK IN PROGRESS. IT'S NOT EVEN A BETA VERSION YET. EVERYTHING MAY CHANGE_.**

## Overview

This is a [Cordova](http://cordova.apache.org)/[PhoneGap](http://phonegap.com) 3.x plugin for Android which allows interaction with [Estimote iBeacons](http://estimote.com). This plugin is just a wrapper around [Estimote Android SDK](https://github.com/Estimote/Android-SDK).

This plugin allows for:
- beacon ranging: Scan beacons and optionally filter them by their values.
- beacon monitoring: Monitor regions for those devices that have entered/exited a region.
- beacon characteristics reading (proximity UUID, major & minor values, etc.).

## Requirements

- [Apache Cordova](http://cordova.apache.org/#download)/[Adobe PhoneGap](http://phonegap.com/install) 3.x.
- [Android SDK](http://developer.android.com/sdk).
- Device with Android 4.3+ and Bluetooth 4.0+ (a.k.a. [Bluetooth Low Energy](http://en.wikipedia.org/wiki/Bluetooth_low_energy) or BLE).

## Installation

In order to add this plugin into your project:

Using Cordova:

```sh
$ cordova plugin add https://github.com/mdc-ux-team/estimote-beacons-phonegap-plugin-for-android.git
```

Using PhoneGap:

```sh
$ phonegap local plugin add https://github.com/mdc-ux-team/estimote-beacons-phonegap-plugin-for-android.git
```

## Usage

In your `www/js/index.js` file:

```javascript
var myInterval;

function startRangingBeaconsInRegionCallback() {
  console.log('Start ranging beacons...');
  
  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      console.log('Getting beacons...');
      for(var i = 0, l = beacons.length; i < l; i++) {
        var beacon = beacons[i];
        // beacon contains major, minor, rssi, macAddress, measuredPower, etc.
        console.log('beacon:', beacon);
      }
      ...
    });
  }, 3000);
}

var app = {
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady);
  },
    
  initialize: function() {
    this.bindEvents();
  },
  
  onDeviceReady: function() {
    document.removeEventListener('deviceready', app.onDeviceReady);
    
    if(!EstimoteBeacons) return;
    
    document.addEventListener('pause', app.onPause);
    document.addEventListener('resume', app.onResume);
    
    EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
  },
  
  onPause: function() {
    EstimoteBeacons.stopRangingBeaconsInRegion(function() {
      console.log('Stop ranging beacons...');
    });
    clearInterval(myInterval);
  },
  
  onResume: function() {
    EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
  }
};
```

## Available Methods

### startRangingBeaconsInRegion

`EstimoteBeacons.startRangingBeaconsInRegion(successCallback)` Starts ranging for beacons.

### stopRangingBeaconsInRegion

`EstimoteBeacons.stopRangingBeaconsInRegion(successCallback)` Stops ranging for beacons.

### startMonitoringBeaconsInRegion

`EstimoteBeacons.startMonitoringBeaconsInRegion(successCallback)` Starts monitoring region.

### stopMonitoringBeaconsInRegion

`EstimoteBeacons.stopMonitoringBeaconsInRegion(successCallback)` Stops monitoring region.

### getBeacons

`EstimoteBeacons.getBeacons(successCallback)` Returns latest list of beacons found by `startRangingBeaconsInRegion`. You have to call this method periodically to be up to date with latest results.

### isBleSupported

`EstimoteBeacons.isBleSupported(successCallback, errorCallback)` Determines whether BLE is supported or not.

### isBluetoothEnabled

`EstimoteBeacons.isBluetoothEnabled(successCallback, errorCallback)` Determines whether Bluetooth is enabled or not.

## Known Issues

- Sometimes this plugin stops working because of an error: "Bluetooth share has stopped". This is an [Android bug](https://code.google.com/p/android/issues/detail?id=67272). For more information about this bug read [Estimote Android SDK FAQ section](https://github.com/Estimote/Android-SDK#faq). When this error appears, it may be necessary to factory reset your device. **NOTE: BACKUP YOUR DATA AND APPS BEFORE FACTORY RESET YOUR DEVICE**.

## FAQ

1. For which Android devices could I develop a hybrid app using this plugin?

  These could be some of them:
  - [Samsung Galaxy S3](http://www.samsung.com/global/galaxys3)
  - [Samsung Galaxy S4](http://www.samsung.com/global/microsite/galaxys4)
  - [Samsung Galaxy S4 Mini](http://www.samsung.com/global/microsite/galaxys4)
  - [Samsung Galaxy S5](http://www.samsung.com/global/microsite/galaxys5)
  - [Samsung Galaxy Note 2](http://www.samsung.com/galaxynote2)
  - [Samsung Galaxy Note 3](http://www.samsung.com/us/guide-to-galaxy-smart-devices/galaxy-note-3.html)
  - [Google Nexus 4](http://www.google.com/intl/all/nexus/4)
  - [Google Nexus 5](http://www.google.com/nexus/5)
  - [Google Nexus 7](http://www.google.com/nexus/7)

1. Is there an app to check if my Android device supports BLE?

  [BLE Checker](https://play.google.com/store/apps/details?id=com.magicalboy.btd). We have tested this app in a couple of Android devices and it seems to work fine.

1. Is there an Estimote iBeacons Cordova/PhoneGap plugin for iOS?

  Yes. Take a look at the [kdzwinel/phonegap-estimotebeacons](https://github.com/kdzwinel/phonegap-estimotebeacons) project being developed by [Konrad Dzwinel](https://github.com/kdzwinel).
  
1. How can I edit the value of the Major/Minor property of a beacon?
  1. Install [Estimote app](https://play.google.com/store/apps/details?id=com.estimote.apps.main).
  2. Click _Beacons_.
  3. Click any of the beacons within the radar.
  4. Click _Major_/_Minor_.
  5. Enter the new value for _Major_/_Minor_ and click _Save Major/Minor_.

## Changelog

### 0.0.3
- Improved documentation.
- Added isBluetoothEnabled and isBleSupported methods.

### 0.0.2
- Added JavaDoc and JSDoc comments.
- Improved Java and JavaScript code.
- Updated plugin id and Java namespace.

### 0.0.1
- First implementation.

## References

- [Adobe PhoneGap Documentation](http://docs.phonegap.com).
- [Apache Cordova Documentation](http://cordova.apache.org/docs/en/3.4.0).

## License

[MIT](https://github.com/mdc-ux-team/estimote-beacons-phonegap-plugin-for-android/blob/master/LICENSE-MIT)
