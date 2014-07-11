// var pollToSendDetail=setInterval(function(){sendPersonDetails()},1000);
// var pollForPersonDetails=setInterval(function(){getPersonDetailsPeriodically()},1000);

function sendPersonDetails() {
    $.ajax({
       type     : "POST",
       url      : "http://10.159.230.28/firefight/insert.php",
       contentType : 'application/x-www-form-urlencoded',
       dataType : 'text',
       cache : false,
       data     : ({ PersonID:121, BeaconID:111, StartTime:12345, EndTime:12344, FireFighter:1, Emergency:1  }) ,
       success  : function(msg){
           console.log(msg);
       },
       error : function(msg){ console.log('Failed');}
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
                if (!instance) {
                    instance = createInstance();
                    return instance.personDetails;
                }else{
                    return instance.personDetails;
                }
            }

    };
})();

function getPersonDetailsPeriodically() {
    $.ajax({
           type     : "GET",
           url      : "http://10.159.230.28/firefight/display.php",
           dataType : 'jsonp',
           cache : false,
           success  : function(msg){
               console.log("success");
           },
           error : function(request, status, error){
               console.log(request.responseText);
         }
    });
}

function getPersonDetails() {
    var personDetailList = personDetailsDs.getDetail();
    var arrayLength = personDetailList.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log("----------------------------");
        console.log(personDetailList[i].PersonID);
        console.log(personDetailList[i].CoOrdinate);
        console.log(personDetailList[i].StartTime);
        console.log(personDetailList[i].EndTime);
        console.log(personDetailList[i].FireFighter);
        console.log(personDetailList[i].Emergency);
        console.log("----------------------------");
    }
}
