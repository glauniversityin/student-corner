app.controller("resultCntr", function ($scope, myService) {
    $scope.basic;
    $scope.semester = [];
    $scope.res = [];
    $scope.graphA = [];
    $scope.users = { isValid: true };
    $scope.rolln = "";
    $scope.loadB = function () {
        var Path = "/MyAccount/GetResultBasic";
        var noP = "";
        var feeSp = myService.UserLogin(noP, Path);
        feeSp.then(function success(d) {
            $scope.basic = d.data.rB;
            $scope.semester = d.data.sem;
            $scope.rolln = d.data.roll;
            //if ($scope.basic.ResultType=="Year") {

            //}
            $scope.graphA = d.data.graphPer;
            if ($scope.basic.Message == "No")
            {
                $scope.LoadGraph($scope.basic.ResultType, $scope.graphA, $scope.basic.ResultMode);
            }
            $("#myLoad").hide();
        }, function error(d) {
            console.log("Error in MyResult -> loadB Function");
        });
    },
    $scope.loadB(),
    $scope.showResult = function (vv, row) {
        $scope.res = [];
        var Path = "/MyAccount/GetResultSemWise";
        var noP = { text: vv };
        var semesterVar = vv.split('#')[0];
        var feeSp = myService.UserLogin(noP, Path);
        feeSp.then(function success(d) {
            $scope.res = d.data;
            if ($scope.res.length > 0) {
                if ($scope.basic.ResultMode === "CPI") {
                    $scope.calStc = function () {
                        var total = 0;
                        angular.forEach($scope.res, function (user) {
                            total = total + user.Credit;
                        })
                        return total;
                    },
                    $scope.calSgp = function () {
                        var total = 0;
                        angular.forEach($scope.res, function (user) {
                            total = total + (user.Credit * user.GP);
                        })
                        return total;
                    }
                }
                if ($scope.basic.ResultMode == "Percent") {
                    if (semesterVar == "I") {
                        $scope.fiMax = $scope.res[0].MaxA[0];
                        $scope.fiObt = $scope.res[0].ObtA[0];
                        $scope.seMax = "***";
                        $scope.seObt = "***";
                        $scope.thMax = "***";
                        $scope.thObt = "***";
                        $scope.foMax = "***";
                        $scope.foObt = "***";
                        $scope.toMax = $scope.res[0].MaxA[0];
                        $scope.toObt = $scope.res[0].ObtA[0];
                    }
                    if (semesterVar == "II") {
                        $scope.fiMax = $scope.res[0].MaxA[0];
                        $scope.fiObt = $scope.res[0].ObtA[0];
                        $scope.seMax = $scope.res[0].MaxA[1];
                        $scope.seObt = $scope.res[0].ObtA[1];
                        $scope.thMax = "***";
                        $scope.thObt = "***";
                        $scope.foMax = "***";
                        $scope.foObt = "***";
                        $scope.toMax = $scope.res[0].MaxA[0] + $scope.res[0].MaxA[1];
                        $scope.toObt = $scope.res[0].ObtA[0] + $scope.res[0].ObtA[1];
                    }
                    if (semesterVar == "III" ) {
                        $scope.fiMax = $scope.res[0].MaxA[0];
                        $scope.fiObt = $scope.res[0].ObtA[0];
                        $scope.seMax = $scope.res[0].MaxA[1];
                        $scope.seObt = $scope.res[0].ObtA[1];
                        $scope.thMax = $scope.res[0].MaxA[2];
                        $scope.thObt = $scope.res[0].ObtA[2];
                        $scope.foMax = "***";
                        $scope.foObt = "***";
                        $scope.toMax = $scope.res[0].MaxA[0] + $scope.res[0].MaxA[1] + $scope.res[0].MaxA[2];
                        $scope.toObt = $scope.res[0].ObtA[0] + $scope.res[0].ObtA[1] + $scope.res[0].ObtA[2];
                    }
                    if (semesterVar == "IV") {
                        $scope.fiMax = $scope.res[0].MaxA[0];
                        $scope.fiObt = $scope.res[0].ObtA[0];
                        $scope.seMax = $scope.res[0].MaxA[1];
                        $scope.seObt = $scope.res[0].ObtA[1];
                        $scope.thMax = $scope.res[0].MaxA[2];
                        $scope.thObt = $scope.res[0].ObtA[2];
                        $scope.foMax = $scope.res[0].MaxA[3];
                        $scope.foObt = $scope.res[0].ObtA[3];
                        $scope.toMax = $scope.res[0].MaxA[0] + $scope.res[0].MaxA[1] + $scope.res[0].MaxA[2] + $scope.res[0].MaxA[3];
                        $scope.toObt = $scope.res[0].ObtA[0] + $scope.res[0].ObtA[1] + $scope.res[0].ObtA[2] + $scope.res[0].ObtA[3];
                    }
                }
            }
            $("#spin_" + row).hide();
        }, function error(d) {
            console.log("Error in MyResult showResult Function");
        });
    },

    $scope.LoadGraph = function (type, arr,resultMode) {
       
        if (type == "Year") {
            var options = {
                chart: {
                    height: 350,
                    type: 'line',
                    shadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 1
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                series: [{
                    name: "Percentage",
                    data: arr[0].percentage //[28, 29, 33, 36, 32, 32, 33]
                }],
                fill: {
                    type: 'solid',
                    opacity: [0.95, 1],
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 6
                },
                xaxis: {
                    categories: arr[0].semester,//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    title: {
                        text: 'Year'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Percentage (%)'
                    },
                    min: 5,
                    max: 100
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            }
            var chart = new ApexCharts(
                document.querySelector("#myChart"),
                options
            );
            chart.render();

            var option2 = {
                chart: {
                    height: 280,
                    type: "radialBar",
                },

                series: [arr[0].OverAllP],
                colors: ["#20E647"],
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "70%",
                            background: "#293450"
                        },
                        track: {
                            dropShadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                blur: 4,
                                opacity: 0.15
                            }
                        },
                        dataLabels: {
                            name: {
                                offsetY: -10,
                                color: "#fff",
                                fontSize: "13px"
                            },
                            value: {
                                color: "#fff",
                                fontSize: "30px",
                                show: true
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        type: "vertical",
                        gradientToColors: ["#87D4F9"],
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: "round"
                },
                labels: ["Percentage"]
            };
            var chart2 = new ApexCharts(document.querySelector("#divPer"), option2);
            chart2.render();
        }
        if (type == "Semester") {
            var buttomText = "SPI", leftText = "SPI / CPI",name2="CPI";
            if (resultMode == "Agri") {
                buttomText = "GPA";
                leftText = "GPA / CGPA";
                name2 = "CGPA";
            }
            var options3 = {                   
                chart: {
                    height: 240,
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '45%',
                        //endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                series: [{
                    name: buttomText,
                    data: arr[0].SPI
                }, {
                    name: name2,
                    data: arr[0].CPI
                }],
                xaxis: {
                    categories: arr[0].Sem,
                },
                yaxis: {
                    title: {
                        text: leftText
                    }
                },
                fill: {
                    opacity: 1

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }
            }
            var chart3 = new ApexCharts(
              document.querySelector("#myChart3"),
              options3
            );
            chart3.render();

            var option4 = {
                chart: {
                    height: 290,
                    type: "radialBar",
                },

                series: [arr[0].OverAllP],
                colors: ["#20E647"],
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "70%",
                            background: "#293450"
                        },
                        track: {
                            dropShadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                blur: 4,
                                opacity: 0.15
                            }
                        },
                        dataLabels: {
                            name: {
                                offsetY: -10,
                                color: "#fff",
                                fontSize: "13px"
                            },
                            value: {
                                color: "#fff",
                                fontSize: "30px",
                                show: true
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        type: "vertical",
                        gradientToColors: ["#87D4F9"],
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: "round"
                },
                labels: ["Percentage"]
            };
            var chart4 = new ApexCharts(document.querySelector("#divPer2"), option4);
            chart4.render();
        }
    };
    $scope.printMe = function () {
        openMyPayPopUp("http://glauniversity.in/FinalResults.aspx?Roll_No=" + $scope.rolln, 0, 0);
    };
});