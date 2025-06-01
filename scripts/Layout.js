//setHeartbeat();
//function setHeartbeat() {
//    setTimeout("heartbeat()", 1 * 60 * 1000); // every 1 min
//}
//function heartbeat() {
//    alert("Session Alive");
//    $.get(
//        "/KeepSessionAlive.ashx",
//        null,
//        function (data) {
//            setHeartbeat();
//        },
//        "json"
//    );
//}

app.controller("headerCtrl2", function ($scope, myService) {
    $scope.mList = [];
    $scope.eList = [];
    $scope.pList = [];
    $scope.LoadHeader = function () {
        var Path = "/Home/LoadNoTificationMessage";
        var noP = "";
        var feeSp = myService.UserLogin(noP, Path);
        feeSp.then(function success(d) {
            $scope.mList = d.data.lm;
            $scope.eList = d.data.le;
            $scope.pList = d.data.lp;
        }, function error(d) {
            console.log("Error in _Layout -> loadHeader Function");
        });
    }
})