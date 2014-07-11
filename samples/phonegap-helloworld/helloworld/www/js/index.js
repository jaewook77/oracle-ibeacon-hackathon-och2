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

var registeredBeacons = [
    {"major": -1, "minor": -1, "found": true, "distance": Infinity, "map": "img/mapnomarker.png"},
    {"major": 27806, "minor": 6285, "found": false, "distance": 0, "map": "img/map_pos2.png", "coordinate": {"x": 120, "y": 50}}, 
    {"major": 7403, "minor": 18272, "found": false, "distance": 0, "map": "img/map_edit.png", "coordinate": {"x": 0, "y": 50}},
    {"major": 35318, "minor": 40305, "found": false, "distance": 0, "map": "img/map_pos3.png", "coordinate": {"x": 60, "y": 100}}];

var abs_coordinate = {"x": 120, "y": 100};
var myLocation = {"x": 25, "y": 50};

var showOnlyEmergency = false;

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

function calculteMyLocation() {
    var points = [];

    for (var i = 1; i < registeredBeacons.length; i++) {
        var point = new Point(registeredBeacons[i].coordinate.x, registeredBeacons[i].coordinate.y, registeredBeacons[i].distance*20);
        points.push(point);
    };
    var debug = registeredBeacons[1].major.toString() + ":" + registeredBeacons[1].distance.toString() + ", " +
        registeredBeacons[2].major.toString() + ":" + registeredBeacons[2].distance.toString() + ", " +
        registeredBeacons[3].major.toString() + ":" + registeredBeacons[3].distance.toString();

    $('.console').text(debug);
    console.log(debug);

    var myLoc = calculate_Intersection(points[0], points[1], points[2]);
    if (myLoc === 0) {
        console.log('Cannot calculate my location !!!');
    } else {
        console.log('My location is ' + myLoc);
        myLocation = {"x": myLoc[0], "y": myLoc[1]};
    }
}

function refresh_rescue_map(page_selector, map_img) {
    calculteMyLocation();
            $('.console').text("refresh - 1");

    if (map_img !== undefined) {
            $('.console').text("refresh - 2");
        page_selector.find('.coveredImage').first().attr("src",map_img);
    }
            $('.console').text("refresh - 3");

    var all = getAllDetails();
    var fireFighter = [];
    var emergency = [];
    var people = [];

    for (var i = 0; i < all.length; i++) {
        coOrdinate = all[i].CoOrdinate.split(",");
        coOrdinationX = parseInt(coOrdinate[0]);
        coOrdinationY = parseInt(coOrdinate[1]);
        // coOrdinationX = (parseInt(coOrdinate[0])*80 + Math.random()*20)*abs_coordinate.x/100;
        // coOrdinationY = (parseInt(coOrdinate[1])*80 + Math.random()*20)*abs_coordinate.y/100;
        console.log(coOrdinationX, " ", coOrdinationY);
        if (all[i].FireFighter == 'yes') {
            fireFighter.push({"x": coOrdinationX, "y": coOrdinationY});
        } else if (all[i].Emergency == 'yes') {
            emergency.push({"x": coOrdinationX, "y": coOrdinationY});
        } else {
            people.push({"x": coOrdinationX, "y": coOrdinationY});
        }
    };

    fireFighter.push({"x": 30, "y": 60});
    emergency.push({"x": 30, "y": 80});
    people.push({"x": 45, "y": 90});

    var canvas1 = page_selector.find('.coveringCanvas')[0];
    var ctx1 = canvas1.getContext('2d');

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    drawDiamonds(ctx1, fireFighter, abs_coordinate, {"width": canvas1.width, "height": canvas1.height}, "#FFBF00");
    drawDiamonds(ctx1, emergency, abs_coordinate, {"width": canvas1.width, "height": canvas1.height}, "#FF0000");
    drawDiamonds(ctx1, people, abs_coordinate, {"width": canvas1.width, "height": canvas1.height}, "#0000FF");
    // drawDiamonds(ctx1, [myLocation], abs_coordinate, {"width": canvas1.width, "height": canvas1.height}, "#00BFFF");

    function drawDiamonds(ctx, xydata, abs_coordinate, adjusted_map_coordinate, fillStyle) {
        // Overlayed Map ...
        // Layer1: Map Image
        // Layer2: My location
        // Layer3: ...
        // 
        ctx.fillStyle = fillStyle;
        for (var i = 0; i < xydata.length; i++) {
            var screen_x = (xydata[i]["x"] / abs_coordinate.x) * adjusted_map_coordinate.width;
            var screen_y = (xydata[i]["y"] / abs_coordinate.x) * adjusted_map_coordinate.height;
            // ctx.fillRect(screen_x, screen_y, 10, 10);
            (function star(ctx, x, y, r, p, m) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(x, y);
                ctx.moveTo(0, 0 - r);
                for (var i = 0; i < p; i++) {
                    ctx.rotate(Math.PI / p);
                    ctx.lineTo(0, 0 - (r * m));
                    ctx.rotate(Math.PI / p);
                    ctx.lineTo(0, 0 - r);
                }
                ctx.fill();
                ctx.restore();
            })(ctx, screen_x, screen_y, 7, 5, 0.5);
        };
    };
}

$(document).on("pagecreate", "#page-rescueme", function() {
    refresh_rescue_map($("#page-rescueme"));
});


var registeredBeacon = [{"major": 27806, "minor": 6285}, {"major": 7403, "minor": 18272}, {"major": 35318, "minor": 40305}];
var getRegisteredBeacon = function(beacon) {
    for (var i = 0; i < registeredBeacon.length; i++) {
        if (registeredBeacon[i].major == beacon.major && registeredBeacon[i].minor == beacon.minor) {
            return i;
        }
    };
    return None;
}

var RegisteredBeaconManager = {
    getRegisteredBeacon: function(beacon) {
        for (var i = 1; i < registeredBeacons.length; i++) {
            if (registeredBeacons[i].major === beacon.major && registeredBeacons[i].minor === beacon.minor) {
                return registeredBeacons[i];
            }
        }
        return null;
    },
    getClosestBeacon: function() {
        var closestBeacon = registeredBeacons[0];
        for (var i = 1; i < registeredBeacons.length; i++) {
            if (registeredBeacons[i].found && registeredBeacons[i].distance < closestBeacon.distance) {
                closestBeacon = registeredBeacons[i];
            }
        }
        return closestBeacon;
    },
    added: function(beacon) {
        var registeredBeacon = this.getRegisteredBeacon(beacon);
        if (registeredBeacon !== null) {
            registeredBeacon.found = true;
            registeredBeacon.distance = beacon.distance;
            refresh_rescue_map($("#pagetwo"), this.getClosestBeacon().map);
        }
    },
    updated: function(beacon) {
        var registeredBeacon = this.getRegisteredBeacon(beacon);
        if (registeredBeacon !== null) {
            registeredBeacon.distance = beacon.distance;
            refresh_rescue_map($("#pagetwo"), this.getClosestBeacon().map);
        }
    },
    removed: function(beacon) {
        var registeredBeacon = this.getRegisteredBeacon(beacon);
        if (registeredBeacon !== null) {
            registeredBeacon.found = false;
            registeredBeacon.distance = 0;
            refresh_rescue_map($("#pagetwo"), this.getClosestBeacon().map);
        }
    }

};

$(document).one("pagecreate", "#pagetwo", function() {
    refresh_rescue_map($("#pagetwo"));
        if (typeof window.EstimoteBeacons == 'undefined') return;
        if (!EstimoteBeacons) return;

    var beaconManager = new BeaconManager();
    beaconManager.startPulling(1000);
    beaconManager.on('updated', function(beacon) {
        RegisteredBeaconManager.updated(beacon);
    });
    beaconManager.on('added', function(beacon) {
        RegisteredBeaconManager.added(beacon);
    });
    beaconManager.on('removed', function(beacon) {
        RegisteredBeaconManager.removed(beacon);
    });
});

var initPanZoom = function() {
    (function() {
        var $panzoom = $('.panzoom').panzoom({
            startTransform: 'scale(2)',
            increment: 0.3,
            minScale: 1
        }).panzoom("zoom", 1.5, {
            silent: true
        });

        $panzoom.parent().dblclick(function(event) {
            $panzoom.panzoom('reset');
        });

        $panzoom.parent().on('mousewheel.focal', function(e) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
                increment: 0.1,
                animate: false,
                focal: e
            });
        });
    })();
}

$(document).on("pagecreate", "#pagetwo", function() {
});


$(document).on("pagecreate", "#pagefour", function() {
        if (typeof window.EstimoteBeacons == 'undefined') return;
        if (!EstimoteBeacons) return;

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
        console.log('Initialize ....');
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
        console.log('onDeviceReady ....');
        this.receivedEvent('deviceready');

        document.removeEventListener('deviceready', app.onDeviceReady);

        if (typeof window.EstimoteBeacons == 'undefined') return;
        if (!EstimoteBeacons) return;

        document.addEventListener('pause', app.onPause);
        document.addEventListener('resume', app.onResume);

        console.log('Calling EstimoteBeacons.startRangingBeaconsInRegion ....');
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
        initPanZoom();

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
