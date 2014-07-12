// var pollToSendDetail=setInterval(function(){sendPersonDetails()},1000);
var pollForPersonDetails=setInterval(function(){getPersonDetailsPeriodically()},1000);

function sendPersonDetails(beaconId, emergency) {
    $.ajax({
       type     : "POST",
       url      : "http://10.159.239.84:8888/firefight/insert.php",
       contentType : 'application/x-www-form-urlencoded',
       dataType : 'text',
       cache : false,
       data     : ({ PersonID:'2', BeaconID:beaconId, StartTime:23456, EndTime:23457, FireFighter:'no', Emergency:emergency  }) ,
       success  : function(msg){
           console.log(msg);
       },
       error : function(msg){ 
        console.log('Failed');
     }
    });
}

var personDetailsHandler = (function () {
    var instance;
    var personDetails = [];
    function createInstance() {
            var object = new Object("I am the instance");
            return object;
    }
    return {
            getDetail: function () {
                   return personDetails;
            },
            setDetail: function( personDetail ){
                   personDetails.push( personDetail );
            },
            clearDetail: function(){
                    while (personDetails.length > 0) {
                          personDetails.pop();
                    }
            }
    };
})();

function getPersonDetailsPeriodically() {
    $.ajax({
           type     : "GET",
           url      : "http://10.159.239.84:8888/firefight/display.php",
           dataType : 'json',
           cache : false,
           success  : function(msg){
               // console.log("success");
               // console.log(msg);
               var jsonObj = msg;
               var count = jsonObj.length;
               // console.log(count);
               personDetailsHandler.clearDetail();
               for(i=0; i < count; i++){
                    personDetailsHandler.setDetail( jsonObj[i] );
                }
           },
           error : function(msg){
               console.log("error");
               console.log(msg);
               if(msg.status === 200){
                    var arrayStr = msg.responseText;
                    var jsonObj = $.parseJSON(arrayStr);
                    var count = jsonObj.count;
                    console.log(count);
                    for(i=0; i < count; i++){
                        personDetailsHandler.setDetail( jsonObj[i] );
                    }
                }
            }
    });
}

function getFireFighterOrEmergencyDetails() {
    var personDetailList = personDetailsHandler.getDetail();
    var returnList = [];
    if (personDetailList === undefined ) {
        console.log("personDetailList is undefined");
        return;
    }
    var arrayLength = personDetailList.length;
    for (var i = 0; i < arrayLength; i++) {
        if(personDetailList[i].FireFighter == 'yes' || personDetailList[i].Emergency == ''){
            returnList.push( personDetailList[i] );
            // console.log("----------------------------");
                    // console.log(personDetailList[i].PersonID);
                    // console.log(personDetailList[i].CoOrdinate);
                    // console.log(personDetailList[i].StartTime);
                    // console.log(personDetailList[i].EndTime);
                    // console.log(personDetailList[i].FireFighter);
                    // console.log(personDetailList[i].Emergency);
            // console.log("----------------------------");
        }
    }
    return personDetailList;
}

function getAllDetails() {
    var personDetailList = personDetailsHandler.getDetail();
    if (personDetailList === undefined ) {
        console.log("personDetailList is undefined");
        return;
    }
    var arrayLength = personDetailList.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log("----------------------------");
        // console.log(personDetailList[i].PersonID);
        // console.log(personDetailList[i].CoOrdinate);
        // console.log(personDetailList[i].StartTime);
        // console.log(personDetailList[i].EndTime);
        // console.log(personDetailList[i].FireFighter);
        // console.log(personDetailList[i].Emergency);
        // console.log("----------------------------");
    }
    return personDetailList;
}

