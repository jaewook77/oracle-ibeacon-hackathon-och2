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

function getUiContentHeight() {
    var screen = $.mobile.getScreenHeight();

    var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header").outerHeight();

    var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();

    /* content div has padding of 1em = 16px (32px top+bottom). This step
       can be skipped by subtracting 32px from content var directly. */
    var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();

    var content = screen - header - footer - contentCurrent;
    return content;
}

function getUiContentWidth() {
    return $('[data-role="page"]').first().width();
}

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

function formatDistance(meters) {
    if (meters > 1) {
        return meters.toFixed(3) + ' m';
    } else {
        return (meters * 100).toFixed(3) + ' cm';
    }
}

// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
// $( document ).one( "pagecreate", "#main", function() {
// });
// $( document ).on( "pagecontainershow", "#main", function() {
// });

/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$(document).on("pagecreate", "#map-page", function() {    
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
        
    if (navigator.geolocation) {        
        function success(pos) {             // Location found, show map with these coordinates
                        
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));        
        }        

        function fail(error) {            
                drawMap(defaultLatLng);  // Failed to find location, show default map
                        
            }         // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
                    
        navigator.geolocation.getCurrentPosition(success, fail, {
            maximumAge: 500000,
            enableHighAccuracy: true,
            timeout: 6000
        });    
    } else {        
        drawMap(defaultLatLng);  // No geolocation support, show default map
            
    }    

    function drawMap(latlng) {        
        var myOptions = {            
            zoom: 10,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP        
        };        
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);         // Add an overlay to the map of current lat/lng
                
        var marker = new google.maps.Marker({            
            position: latlng,
                        map: map,
                        title: "Greetings!"        
        });    
    }
});

// $( document ).on( "pagecreate", "#pagetwo", function() {
// });

function refresh_rescue_map() {

    var abs_coordinate = {"x": 800, "y": 600};
    var firemen = [
        {"x": 50, "y": 500},
        {"x": 150, "y": 450},
        {"x": 250, "y": 400},
        {"x": 350, "y": 350},
        {"x": 450, "y": 450},
        {"x": 650, "y": 350},
        {"x": 750, "y": 250},
        {"x": 550, "y": 150}
        ];

    var canvas1 = $('#rescue-map-canvas-layer1')[0];
    var canvas2 = $('#rescue-map-canvas-layer2')[0];
    var ctx1 = $('#rescue-map-canvas-layer1')[0].getContext('2d');
    var ctx2 = $('#rescue-map-canvas-layer2')[0].getContext('2d');

    // ...then set the internal size to match
    canvas1.width = getUiContentWidth();
    canvas1.height = getUiContentHeight();
    canvas2.width = getUiContentWidth();
    canvas2.height = getUiContentHeight();

    var rescue_map_img = new Image();
    rescue_map_img.src = "img/RWS_BLDG_FitnessCenter_1stFloor_Update.png";
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    rescue_map_img.onload = function() {
        ctx1.drawImage(rescue_map_img, 0, 0, canvas1.width, rescue_map_img.height * (canvas1.width / rescue_map_img.width));
    };

function drawDiamonds(ctx, xydata, abs_coordinate) {
    // Overlayed Map ...
    // Layer1: Map Image
    // Layer2: My location
    // Layer3: ...
    // 
    ctx.fillStyle = "#FFBF00";
    for (var i = 0; i < xydata.length; i++) {
        var screen_x = (xydata[i]["x"] / abs_coordinate.x) * ctx.canvas.width;
        var screen_y = (xydata[i]["y"] / abs_coordinate.x) * ctx.canvas.width;
        // ctx.fillRect(screen_x, screen_y, 10, 10);
        (function star(ctx, x, y, r, p, m)
            {
                ctx.save();
                ctx.beginPath();
                ctx.translate(x, y);
                ctx.moveTo(0,0-r);
                for (var i = 0; i < p; i++)
                {
                    ctx.rotate(Math.PI / p);
                    ctx.lineTo(0, 0 - (r*m));
                    ctx.rotate(Math.PI / p);
                    ctx.lineTo(0, 0 - r);
                }
                ctx.fill();
                ctx.restore();
            })(ctx, screen_x, screen_y, 7, 5, 0.5);
    };
};

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawDiamonds(ctx2, firemen, abs_coordinate);

    // ctx2.fillStyle = "#FF0000";
    // ctx2.save();
    // ctx2.translate(200, 200);
    // ctx2.rotate(Math.PI / 4);
    // ctx2.fillRect(-5, -5, 10, 10);
    // ctx2.restore();

}

$(document).on("pagecreate", "#page-rescueme", function() {
    // Pinch-zoom is not working with canvas overlay !!!
    // 
    // (function() {
    //     var $section = $('#rescueme-map-section');
    //     var $panzoom = $section.find('.panzoom').panzoom({
    //         startTransform: 'scale(2)',
    //         increment: 0.3,
    //         minScale: 1
    //     }).panzoom("zoom", 1.5, {
    //         silent: true
    //     });

    //     $panzoom.parent().dblclick(function(event) {
    //         $panzoom.panzoom('reset');
    //     });

    //     $panzoom.parent().on('mousewheel.focal', function(e) {
    //         e.preventDefault();
    //         var delta = e.delta || e.originalEvent.wheelDelta;
    //         var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    //         $panzoom.panzoom('zoom', zoomOut, {
    //             increment: 0.1,
    //             animate: false,
    //             focal: e
    //         });
    //     });
    // })();

    refresh_rescue_map();
});

$(document).on("pagecreate", "#pagefour", function() {

    var beaconManager = new BeaconManager();
    var beaconsList = document.getElementById('beacons');
    beaconManager.startPulling(1000);
    beaconManager.on('updated', function(beacon) {
        var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

        if (item) {
            item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatDistance(beacon.distance);
        }
    });
    beaconManager.on('added', function(beacon) {
        var item = document.createElement('li');
        item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatDistance(beacon.distance);
        if (beacon.major == 35318 && beacon.minor == 40305) {
            item.innerText += ' (OCH2)';
        }
        item.id = 'beacon_' + beacon.major + '_' + beacon.minor;

        beaconsList.appendChild(item);
    });
    beaconManager.on('removed', function(beacon) {
        var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

        if (item) {
            beaconsList.removeChild(item);
        }
    });
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
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        var content = getUiContentHeight();
        $(".ui-content").height(content);

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
