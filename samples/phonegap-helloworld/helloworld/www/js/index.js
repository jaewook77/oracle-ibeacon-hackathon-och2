/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var myInterval;

function startRangingBeaconsInRegionCallback() {
    console.log('Start ranging beacons...');

    // Every now and then get the list of beacons in range
    myInterval = setInterval(function() {
        EstimoteBeacons.getBeacons(function(beacons) {
            console.log('Getting beacons...');
            for (var i = 0, l = beacons.length; i < l; i++) {
                var beacon = beacons[i];
                // beacon contains major, minor, rssi, macAddress, measuredPower, etc.
                console.log('beacon:', beacon);
            }
        });
    }, 3000);
}

// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", "#main", function() {
});
$( document ).on( "pagecontainershow", "#main", function() {
});

/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pagecreate", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});

$( document ).on( "pagecreate", "#pagetwo", function() {
});

$( document ).on( "pagecreate", "#pagethree", function() {
});

$( document ).on( "pagecreate", "#pagefour", function() {
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //uncomment for testing in Chrome browser
        this.onDeviceReady();
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        document.removeEventListener('deviceready', app.onDeviceReady);

        if (typeof window.EstimoteBeacons == 'undefined') return;
        if (!EstimoteBeacons) return;

        document.addEventListener('pause', app.onPause);
        document.addEventListener('resume', app.onResume);

        EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
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

// $(document).ready(function() {
//     document.addEventListener("deviceready", onDeviceReady, false);
//     //uncomment for testing in Chrome browser
//    app.onDeviceReady();
// });
