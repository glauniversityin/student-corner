app.filter('TitleCase', function () {
    return function (input) {
        if (input.indexOf(' ') !== -1) {
            var inputPieces,
                i;

            input = input.toLowerCase();
            inputPieces = input.split(' ');

            for (i = 0; i < inputPieces.length; i++) {
                inputPieces[i] = capitalizeString(inputPieces[i]);
            }

            return inputPieces.toString().replace(/,/g, ' ');
        }
        else {
            input = input.toLowerCase();
            return capitalizeString(input);
        }

        function capitalizeString(inputString) {
            return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
        }
    };
});
app.service("videoService", function ()
{
    this.link = "";
    this.play = false;
    this.extension = "";

});
app.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});
app.directive("filesInput", function () {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function (e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
});
app.controller("homeIndexCntrl", function ($scope, myService, $sce, videoService, $rootScope, NoteVideoService, myFactory, $timeout, $http)
{
    $scope.parseInt = parseInt;
    $scope.list = [];
    $scope.hlist = [];
    $scope.gData = [];
    $scope.gSub = [];
    $scope.aDetails = {};
    $scope.moduleList = {};
    $scope.moduleLink = {};
    $scope.marks = {};
    $scope.Alist = {};
    $scope.users = { isValid: true };
    $scope.overAllAP = 0;
    $scope.cpiProgress = [];
    $scope.spiProgress = [];
    $scope.resetModalsetting = function () {
        $('.app-main .app-sidebar').css('z-index', '11');
        $('.fixed-header .app-header').css({ 'z-index': '' });
    }
    $scope.setModalSetting = function () {
        $('.fixed-header .app-header').css('z-index', '8')
        $('.app-main .app-sidebar').css('z-index', '9');
    }
    $scope.openDetail = function () {
        var options = {
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    verticle: true,
                    columnWidth: '90%'
                }

            },
            dataLabels: {
                enabled: true
            },
            colors: [
                function ({ value, seriesIndex, w }) {
                    if (value > 75) {
                        return '#009d4c'
                    } else if (value > 60 && value < 75) {
                        return '#d92550'
                    } else {
                        return '#e3a40c'
                    }
                }
            ],
            series: [{
                name: "Attendance ",
                data: $scope.gData,
                
            }],
            xaxis: {
                categories: $scope.gSub,
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return value + " %";
                    }
                },
                z: {
                    formatter: undefined,
                    title: 'Size: '
                },
            }
        }
        var chart = new ApexCharts(
            document.querySelector("#attandancePer"),
            options
        );
        chart.render();
        $scope.setModalSetting();
        $("#AttandanceSolution").show();
    }
    $scope.per = function (arr) {

        var option4 = {
            chart: {
                height: 220,
                type: "radialBar",
            },
            series: [$scope.overAllAP],
            colors: ["#20E647"],
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#16aaff"
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
                            fontSize: "20px",
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
            labels: ["Attendance"]
        };



        var options = {
            chart: {
                height: 350,
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    verticle: true
                }
            },
            dataLabels: {
                enabled: true
            },
            series: [{
                name: "Attendance ",
                data: $scope.gData
            }],
            xaxis: {
                categories: $scope.gSub,
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return value + " %";
                    }
                },
                z: {
                    formatter: undefined,
                    title: 'Size: '
                },
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#perChart"),
            option4
        );
        chart.render();

        //var option2 = {
        //    chart: {
        //        height: 350,
        //        type: 'radialBar',
        //    },
        //    plotOptions: {
        //        radialBar: {
        //            startAngle: -135,
        //            endAngle: 135,
        //            dataLabels: {
        //                name: {
        //                    fontSize: '16px',
        //                    color: undefined,
        //                    offsetY: 120
        //                },
        //                value: {
        //                    offsetY: 76,
        //                    fontSize: '22px',
        //                    color: undefined,
        //                    formatter: function (val) {
        //                        return val + "%";
        //                    }
        //                }
        //            }
        //        }
        //    },
        //    fill: {
        //        type: 'gradient',
        //        gradient: {
        //            shade: 'dark',
        //            shadeIntensity: 0.15,
        //            inverseColors: false,
        //            opacityFrom: 1,
        //            opacityTo: 1,
        //            stops: [0, 50, 65, 91]
        //        },
        //    },
        //    stroke: {
        //        dashArray: 4
        //    },
        //    series: [arr[0].OverAllP],
        //    labels: ["Attendance"],
        //};
        //var chart2 = new ApexCharts(document.querySelector("#overAllG"), option2);
        //chart2.render();

    },
    $scope.GetRank = function (type1) {
        if (true) {
            $scope.RankList = [];
            var Path = "/Home/GetRankInUniversity";
            var noP = {
                Text: type1,
            };
            var feeSp = myService.UserLogin(noP, Path);
            feeSp.then(function (d) {
                $scope.RankList = d.data;
            });
        }
    },
        $scope.loadB = function () {        
        $("#load").show() ;
        var Path = "/Home/HomeIndex";
        var noP = "";
        var feeSp = myService.UserLogin(noP, Path);
        feeSp.then(function success(d) {
            $scope.list = d.data.listD;
            $scope.hlist = d.data.hl;
            //$scope.cpiProgress = d.data.prgList;
            
            if ($scope.list.length>0) {
                $scope.overAllAP = $scope.list[0].OverAllP;
            }
            angular.forEach($scope.list, function (user) {
                $scope.gData.push(user.AttPer);
                $scope.gSub.push(user.SuCode);
            })
            $scope.per($scope.list);
            if ($scope.cpiProgress.length > 0) {
                //$scope.GetRank("Branch");
            } else {
                $("#progress").hide();
            }
        }, function error(d) {
            console.log("Error in HomeIndexj -> loadB Function");
        })        
        $("#load").hide();
        
        },
        $scope.LoadHeader = function () {
          
            var Path = "/Home/LoadNoTificationMessage";
            var noP = "";
            var feeSp = myService.UserLogin(noP, Path);
            feeSp.then(function success(d) {
                $scope.mList = d.data.lm;
                $scope.eList = d.data.le;
                $scope.pList = d.data.lp;
                $scope.pctList = d.data.pct
                $scope.listForum = d.data.listForum;
                
                $scope.getNotiCount($scope.mList, "M");
            }, function error(d) {
                console.log("Error in _Layout -> loadHeader Function");
            });
        }
        //$scope.LoadHeader = function () {
        //    var Path = "/Home/LoadNoTificationMessage";
        //    var noP = "";
        //    var feeSp = myService.UserLogin(noP, Path);
        //    feeSp.then(function success(d) {
        //        $scope.mList = d.data.lm;
        //        $scope.eList = d.data.le;
        //        $scope.pList = d.data.lp;
        //        $scope.getNotiCount($scope.mList, "M");
        //    }, function error(d) {
        //        console.log("Error in _Layout -> loadHeader Function");
        //    });
        //}
 
    $scope.LoadHeader();
    $scope.loadB(),
    $scope.prep = 0;
    $scope.lprep = [];
    $scope.toggleReadMoreLess = function (id) {
        console.log("cac");
        if ($('#' + id).is(":checked")) {
            $('label[for=' + id + ']').text('Read Less');            
            
        } else {
            $('label[for=' + id + ']').text('Read More');
            $('input#' + id + ':checked + p.postDiscription').css('-webkit-line-clamp', '3');
            
        }        
        //$('#' + id + ' p.postDiscription').css()
    }
    //Begin changes for new Dashboard
    {
        $scope.openSubjectDetails = function (rowIndex, x, pIndex, stuType) {              
            
            var queryURL=""
            $timeout(function () {
                queryURL = "/Home/SubjectDetails?bi=" + btoa(x.BatchCode) + "&sc=" + btoa(x.SuCode) + "&pi=" + btoa(pIndex) + "&ai=" + btoa(rowIndex) + "&st=" + btoa(x.SuType) + "&ti=" + btoa(x.tabId) + "&type=" + btoa(stuType);
                $("#query_" + rowIndex).attr('href', queryURL)
            })   
        }
        
    }
     //End changes for new Dashboard
  
    $scope.getNotiCount = function (notiList, category) {
        if (notiList == undefined || notiList == null) {
            $scope.notiListCount = 0
        } else {
            $scope.notiListCount = notiList.length;
        }
        if (category == "M") {
            $scope.NotiCategory = "Messages";
        }
        if (category == "E") {
            $scope.NotiCategory = "Events";
        }
        if (category == "ED") {
            $scope.NotiCategory = "Extra Details";
        }
        if (category == "pct") {
            $scope.NotiCategory = "Placement Details";
        }
        if (category == "asgnt") {
            $scope.NotiCategory = "Active Assignments";
        }
    }

    $scope.LoadPrep = function ()
    {
        if ($scope.prep == 0)
        {
            $("#loadPrep").show();
            var Path = "/Home/GetPrepAttDetails";
            var noP = "";
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d)
            {
                $scope.lprep = d.data;
                $scope.prep = 1;
            }, function error(d)
            {
                console.log("Error in HomeIndexj -> GetPrepDetails Function", d.data.status);
            })
            $("#loadPrep").hide();
        }
       
       
    }
    $scope.prepAtt = {};
    $scope.LoadPrepAttendance = function (batch,index)
    {
        
            var Path = "/Home/PrepAttendance";
            var noP = {
                Text:batch,
            };
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d)
            {
                $scope.prepAtt[index] = d.data;
                
            }, function error(d)
            {
                console.log("Error in HomeIndexj -> LoadPrepAttendance Function");
            })
       
    }
    $scope.showCourseContent = function (txt, vall, pIndx) {
        $("#courseContent_" + pIndx).show();
        var Path = "/Home/CourseContentF";
        var noP = {
            Text: txt,
            Value: vall,
        };
        var feeSp3 = myService.UserLogin(noP, Path);
        feeSp3.then(function success(d) {
            $scope.moduleList[pIndx] = d.data.ccList;
            $scope.moduleLink[pIndx] = d.data.llist;
        }, function error(d) {
            console.log("Error in HomeIndexj -> showCourseContent Function");
        })
        $("#courseContent_" + pIndx).hide();
    },
    $scope.showMarks = function (row, pIndx) {
        $("#ll_" + pIndx).show();
        $scope.marks[pIndx] = "";
        var Path = "/Home/TermWiseMarks";
        var noP = "";
        var feeSp4 = myService.UserLogin(noP, Path);
        feeSp4.then(function success(d) {
            $scope.marks[pIndx] = d.data;
        }, function error(d) {
            console.log("Error in HomeIndexj -> showMarks Function");
        })
        $("#ll_" + pIndx).hide();
    },
    $scope.showAssignment = function (type, code, pIndx) {
       
        var Path = "/Home/AssigmentES";
        var noP = {
            Text: type,
            Value: code
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d) {
            $scope.Alist[pIndx] = d.data;
           
        }, function error(d) {
            console.log("Error in HomeIndexj -> showAssignment Function");
        })
    },
    $scope.notes = {};
    $scope.notesNor = {};
    $scope.notesVi = {};
    $scope.studyModule = [];
    $scope.ContentList = [];
    $scope.ModuleTopics = [];
    $scope.NoteSyllabus = [];
    $scope.showNotes = function (type,pIndx)
    {
        
        var Path = "/Home/Notes";
        var noP = {
            Text: type,
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d)
        {
            $scope.notesNor[pIndx] = d.data;

        }, function error(d)
        {
            console.log("Error in HomeIndexj -> showNotes Function");
        })
    },
    $scope.showVideos = function (type, code, pIndx)
    {
        var Path = "/Home/NoteVideos";
        var noP = {
            Text: type,
            Value: code
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d)
        {
            $scope.notesVi[pIndx] = d.data;
           
        }, function error(d)
        {
            console.log("Error in HomeIndexj -> showNotes Function");
        })
    },
    $scope.default = false;
    $scope.trustSrc = function (src)
     {
         return $sce.trustAsResourceUrl(src);
     }
    $scope.LoadVideo = function (inde, ur,ext)
     {
        // $("#myModalVideo").modal("show");
         $scope.default = true;
         $scope.url1 = ur;
         videoService.link = ur;
         $scope.$emit("MyFunction");
         videoService.extension = ext;
         $scope.$emit("MyFunction");
         videoService.play = true;
         $scope.$emit("MyFunction");
         //$scope.default = true;
         
     }
    $scope.postAssignment = function (row, type, code, scode, pIndex) {
        if (document.getElementById("postedFile" + code + row).value == "") {
            sweetAlert("Alert", "Please Attach Assignment Copy(.pdf)");
            document.getElementById("postedFile" + code + row).focus();
        }
        else {

            swal({
                title: "Are You Sure To Upload Your Solution?",
                text: "Once Uploaded, You Can Not Roll Back This Assignment!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    $("#loading_" + row).show();
                    var fileName = document.getElementById("postedFile" + code + row).value;
                    var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                    var aid=angular.copy($scope.Alist[pIndex][row].EID);                    
                    {
                        var fileUpload = $("#postedFile" + code + row).get(0);
                        var files = fileUpload.files;
                        var test = new FormData();
                        for (var i = 0; i < files.length; i++)
                        {
                            test.append(files[i].name, files[i]);
                        }
                        $.ajax({
                            url: "/ImageUpload.ashx?type=Assignment-" + aid + "-" + type,
                            type: 'POST',
                            data: test,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (file)
                            {
                                if (file.name == "Success")
                                {
                                    var Path = "/Home/SubmitAssignment";
                                    var noP = {
                                        Batch: $scope.Alist[pIndex][row].TransactionId + "#" + fileExtension + "#" + type
                                    };
                                    var feeSp1 = myService.UserLogin(noP, Path);
                                    feeSp1.then(function success(d)
                                    {
                                        swal(d.data);
                                        $scope.showAssignment(type, scode, pIndex);
                                        $("#loading_" + row).hide();
                                    }, function error(d)
                                    {
                                        console.log("Error in HomeIndexj -> postAssignment Function");
                                        $("#loading_" + row).hide();
                                    });
                                }
                                else
                                {
                                    swal("Alert","Some Error Occured During File Uploading.Please Try After Some Time");
                                    $("#loading_" + row).hide();
                                }
                            },
                            error: function (file)
                            {
                                swal("Alert","Some Error Occured During File Uploading.Please Try After Some Time");
                                $("#loading_" + row).hide();
                            }
                        });
                    }                    
                }
            });
        }
    }
    $scope.openUrl = function (ur) {
        openMyPayPopUp(ur, 640, 480)
    }
    $scope.showAttendance = function (batchid, pIndx) {
        //$("#load_" + pIndx).show();
        $scope.SetBactchID = batchid;
        $("#load_" + pIndx).css("display", "inline-block");
        var Path = "/Home/DateWiseAttendance";
        var noP = {
            Batch: batchid
        };
        var feeSp1 = myService.UserLogin(noP, Path);
        feeSp1.then(function success(d) {
            $scope.aDetails[pIndx] = d.data;
            $("#load_" + pIndx).hide();
        }, function error(d) {
            console.log("Error in HomeIndexj -> showAttendance Function");
        });

    },
    $scope.timetable = [];
    var today = new Date();
    var strt = (today.getMonth() + 1) + "/" + today.getDate() + "/" + (today.getFullYear());
    //var strt = "04/02/2019";
    $scope.td = strt;
    $scope.loadR = function () {
       
        $("#load").show();
        $scope.timetable = [];
        var Path = "/MyAccount/GetTimeTable";
        var noP = {
            text: $scope.td
        };
        var feeSp = myService.UserLogin(noP, Path);
        feeSp.then(function (d) {
            $scope.timetable = d.data;
            
            $("#load").hide();
        });
    },
    $scope.loadR();
    $scope.ff = 0;
    $scope.SPIprogress = function () {
        if ($scope.ff == 0) {
            var Path = "/Home/GetProgressRank";
            var noP = {
                Text: "SPI",
            };
            var feeSp = myService.UserLogin(noP, Path);
            feeSp.then(function (d) {
                $scope.spiProgress = d.data;
                $scope.ff = 1;
            });
        }
    }
    $scope.RankList = [];
    $scope.openP = function (url)
    {
        console.log(url);
        PopUpOpen(url, 0, 0);
    }
    function FileUploadToServer(aid, type, code, row)
    {
        //alert(document.getElementById("postedFile" + code + row).value);
        var fileUpload = $("#postedFile" + code + row).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        for (var i = 0; i < files.length; i++)
        {
            test.append(files[i].name, files[i]);
        }
        $.ajax({
            url: "/ImageUpload.ashx?type=Assignment-" + aid + "-" + type,
            type: 'POST',
            data: test,
            cache: false,
            contentType: false,
            processData: false,
            success: function (file)
            {
                alert(file.name);
                return file.name;
                $('#postedFile').val("");
            }
        });
    }


    //Begin of syllabus update
    {

        $scope.showTabModal = function (index) {
            $('#loadTabCenter_' + index).show();
        }
        $scope.hideTabModal = function (index) {
            $('#loadTabCenter_' + index).hide();
        }
        $scope.resetModalsetting = function () {
            $('.app-main .app-sidebar').css('z-index', '11');
            $('.fixed-header .app-header').css({ 'z-index': '' });
        }
        $scope.setModalSetting = function () {
            $('.fixed-header .app-header').css('z-index', '8')
            $('.app-main .app-sidebar').css('z-index', '9');
        }
        $scope.PreviousDetailsRec = function (subCode, pIndex) {
            $scope.AllRecordList = [];
            var Path = "/Home/GetAllPreviousYearDetails";
            var feeSp = myService.UserLogin({ "subCode": subCode }, Path);
            feeSp.then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.AllRecordList[pIndex] = response.data.Getlist;
                }

            });
        }
        //$scope.PreviousDetailsRec('BCSE 1004');
        $scope.Assignedreport = [];
        $scope.getAssignedDraft = function (pIndx, cat, subCode, menuCategory) {

            $(".load_" + pIndx).css("display", "inline-block");
            if ($scope.Assignedreport[pIndx] != undefined && $scope.Assignedreport[pIndx] != null) {
                $scope.Assignedreport[pIndx] = [];
            }
            var Path = "/Home/getAssignedreport";
            var feeSp = myService.UserLogin({ "SubjectCode": subCode, "SubjectType": cat, "category": menuCategory }, Path);
            feeSp.then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.Assignedreport[pIndx] = response.data.Getlist;
                    setTimeout(function () {
                        $('.postDiscription').find('table').addClass('table table-bordered table-hover mt-2 attendanceTable');
                        $(".load_" + pIndx).hide();
                    }, 100);
                }
            });
        }


        $scope.submitLectureRating = function (RatingCount, lectID, batchID, pIndx) {
            console.log(RatingCount, lectID, batchID, pIndx);
            $(".load_" + pIndx).css("display", "inline-block");
            $scope.Assignedreport[pIndx] = [];
            var Path = "/Home/submitLectureRating";
            var feeSp = myService.UserLogin({ "RatingCount": RatingCount, "lectID": lectID, "batchID": batchID }, Path);
            feeSp.then(function (response) {
                console.log(response);
                if (response.data.Status == "Success") {
                    console.log("testting=", response.data.alist.Data);
                    //$scope.aDetails[pIndx] = angular.copy(response.data.alist.Data);
                    //$scope.$apply();
                    $scope.aDetails[pIndx] = [];
                    $scope.aDetails[pIndx].push.apply($scope.aDetails[pIndx], response.data.alist.Data);
                    setTimeout(function () {
                        $('.postDiscription').find('table').addClass('table table-bordered table-hover mt-2 attendanceTable');
                        $(".load_" + pIndx).hide();
                    }, 100);
                }
            });
        }

        $scope.saveFeebackComment = function (comment, lectID, batchID, pIndx) {
            console.log(comment);
            if (comment == null || comment == undefined || comment == "") {
                alert("Feedback Comment cant be blank");
                return false;
            }
            if (confirm("Are You Sure Want To Submit ?") == true) {
                var Path = "/Home/submitLectureComment";
                var feeSp = myService.UserLogin({ "Comment": comment, "lectID": lectID, "batchID": batchID }, Path);
                feeSp.then(function (response) {
                    console.log(response.data.alist.Data);

                    if (response.data.Status == "Success") {
                        //$scope.aDetails[pIndx] = angular.copy(response.data.alist.Data);
                        //$scope.aDetails[pIndx] = [...response.data.alist.Data];
                        $scope.aDetails[pIndx] = [];
                        $scope.aDetails[pIndx].push.apply($scope.aDetails[pIndx], response.data.alist.Data);
                        setTimeout(function () {
                            $('.postDiscription').find('table').addClass('table table-bordered table-hover mt-2 attendanceTable');
                            $(".load_" + pIndx).hide();
                        }, 100);
                    }
                });
            }

        }


        $scope.openPDFInSameWindow = function (pdfUrl) {
            openPopUp('Content/office_docs/PreviousYearPaper/' + pdfUrl, 1024, 768);
            return false;
        }
        $scope.showHamburgerMenu = false;
        $scope.showInnerhamburgerManu = function (index) {
            var isVisible = $('#nav-left-portion_' + index).is(':visible');
            $scope.isVisible = isVisible;
            if (isVisible) {
                $('#nav-left-portion_' + index).addClass('hideClass');
                $('#nav-left-portion_' + index).removeClass('showClass');

            } else {
                $('#nav-left-portion_' + index).removeClass('hideClass');
                $('#nav-left-portion_' + index).addClass('showClass');

            }
            $scope.showHamburgerMenu = !$scope.showHamburgerMenu;
        }
        function openPopUp(name, w, h) {

            var width = 640;
            var height = 480;
            var left = 0;
            var top = 0;
            if (w == 0) {
                width = screen.width;
                height = screen.height;
                left = 0;
                top = 0;
            }
            else {
                width = w;
                height = h;
                left = (screen.width - width) / 2;
                top = (screen.height - height) / 2;
            }

            var params = 'width=' + width + ', height=' + height;

            params += ', top=' + top + ', left=' + left;

            params += ', directories=no, fullscreen=no';



            params += ', addressbar = no';

            params += ', location=no';

            params += ', menubar=no';

            params += ', resizable=no';

            params += ', scrollbars=yes';

            params += ', titlebar = no';

            params += ', status=no';

            params += ', toolbar=no';


            var openWindow = window.open(name, 'Document', params);

            openWindow.focus();
            return false;
        }


        $scope.openEditor = function (type, index, subCode, subType, assgnDetails, pIndex, category) {

            var plagiarismAllowed = parseInt(assgnDetails.AllowPlagiarism);
            $scope.plagiarismAllowed = plagiarismAllowed;

            $scope.showProceedButton = true;
            $scope.showSaveButton = false;

            $('#proceedButtonId_' + category + '_' + pIndex + '_' + index).show();
            $('#uploadButtonId_' + category + '_' + pIndex + '_' + index).hide();

            $scope.assignemntDe = {
                subCode: subCode,
                subType: subType,
                details: assgnDetails
            }
            if (type == 'Text') {
                $scope.EditorIndex = pIndex;
                $scope.setModalSetting();
                $('#modal1').show();
                $('#assignmentReplyFile_' + index).hide();
                $('#divider_' + index).hide();
                
            } else {
                
                document.getElementById('assignmentReplyFile_' + assgnDetails.Category + '_' + pIndex + '_' + index).style.display = 'block';
                document.getElementById('divider_' + index).style.display = 'block';
            }
        }

        $('#getAttendance').click();



        $scope.removeUpload = function () {
            alert("RemovereadURL");
            $('.file-upload-input').replaceWith($('.file-upload-input').clone());
            $('.file-upload-content').hide();
            $('.image-upload-wrap').show();
        }
        $('.image-upload-wrap').bind('dragover', function () {
            $('.image-upload-wrap').addClass('image-dropping');
        });
        $('.image-upload-wrap').bind('dragleave', function () {
            $('.image-upload-wrap').removeClass('image-dropping');
        });
        $scope.ToggleDragAndDrop = function (index) {
            $('#assignmentReplyFile_' + index).hide();
            $('#divider_' + index).hide();
        }


        $scope.showProceedButton = true;
        $scope.showSaveButton = false;
        $scope.showProgressBar = false;
        $scope.textEditorContent = '';
        $scope.textSimilarityPercentage = 100;

        $scope.proceedDescription = function (EditorIndex) {

            $scope.loading = true;
            $scope.Discription = tinyMCE.activeEditor.getContent();
            if ($scope.Discription == '' || $scope.Discription == undefined || $scope.Discription == null) {
                return false;
            }
            $scope.textEditorContent = tinyMCE.activeEditor.getContent();
            $scope.showProgressBar = true;
            document.getElementById('calculating').innerText = 'Processing';
            // Get the progress bar element by its ID
            var progressBar = document.getElementById('progress-bar');
            var progressBarDiscription = document.getElementById('progressBarDiscription');
            progressBar.style.width = 100 + '%';
            progressBar.classList.remove('bg-success');
            progressBar.classList.remove('bg-danger');
            progressBarDiscription.classList.remove('ng-hide');
            progressBarDiscription.classList.remove('d-none');
            $('.progressBarContainer').removeClass('ng-hide');
            progressBar.classList.add('progress-bar-animated');

            var Path = "/Home/checkPlagiarism";
            var noP = {
                Message: $scope.Discription,
                assignmentID: $scope.assignemntDe.details.ReferenceNo,
                SubCode: $scope.assignemntDe.subCode
            };
            var feeSp1 = myService.UserLogin(noP, Path);
            feeSp1.then(function (d) {
                $scope.loading = false;
                $scope.textSimilarityPercentage = parseInt(d.data.msg);
                
                if ($scope.textSimilarityPercentage == 0) {
                    progressBarDiscription.classList.add('ng-hide');
                    progressBarDiscription.classList.add('d-none');
                }
                if (d.data.Status == "Success") {
                    
                    alert("Minimal Plagiarism Detected. Click Save");
                    $scope.showProceedButton = false;
                    
                    $scope.showSaveButton = true;
                    progressBar.style.width = $scope.textSimilarityPercentage + '%';
                    progressBar.classList.add('bg-success');
                    progressBar.classList.remove('progress-bar-animated');
                    document.getElementById('calculating').innerText = $scope.textSimilarityPercentage + "% Plagiarism Found";
                }
                else if (d.data.Status == "Plagiarism") {
                    
                    
                    // Update the width style
                    alert("Plagiarism found. Please proceed with your own text");
                    progressBar.style.width = $scope.textSimilarityPercentage + '%';
                    progressBar.classList.add('bg-danger');
                    progressBar.classList.remove('progress-bar-animated');
                    document.getElementById('calculating').innerText = $scope.textSimilarityPercentage + "% Plagiarism Found";
                }
            }, function error(d) {
                console.log("Error in HomeIndexj -> postAssignment Function");
            });

        }


        $scope.saveDiscription = function (EditorIndex) {
            $scope.Discription = tinyMCE.activeEditor.getContent();
            if ($scope.Discription == '' || $scope.Discription == undefined || $scope.Discription == null) {
                alert("Please Enter Something.");
            }


            if ($scope.Discription !== $scope.textEditorContent) {
                
                document.getElementById("saveButtonId").removeAttribute("data-dismiss");
                if (tinyMCE.activeEditor.getContent() !== '') {
                    alert("Changes found! Please check Plagiarism Again");
                }
                $scope.showProceedButton = true;
                $scope.showSaveButton = false;
            }


            else {
                if (confirm("Are You Sure To Submit Assignment?") == true) {
                    document.getElementById("saveButtonId").setAttribute("data-dismiss", "modal");

                    if (isNaN($scope.textSimilarityPercentage)) {
                        $scope.textSimilarityPercentage = 0;
                    }

                    $scope.showProgressBar = false;
                    var Path = "/Home/submitAssignmentNew";
                    var noP = {
                        Message: $scope.Discription,
                        assignmentID: $scope.assignemntDe.details.ReferenceNo,
                        Status: $scope.assignemntDe.details.Status,
                        ResponseType: $scope.assignemntDe.details.ResponseType,
                        BatchID: $scope.assignemntDe.details.BatchID,
                        SubjectCode: $scope.assignemntDe.subCode,
                        SubjectName: $scope.assignemntDe.details.SubjectName,
                        UploadedOn: $scope.assignemntDe.details.PostedOn,
                        UploadedByID: $scope.assignemntDe.details.PostedBy,
                        UploadedByName: "",
                        StartOn: $scope.assignemntDe.details.StartDtae,
                        ExpiredOn: $scope.assignemntDe.details.EndDate,
                        Caption: $scope.assignemntDe.details.Title,
                        Module: $scope.assignemntDe.details.Module,
                        MaxMarks: $scope.assignemntDe.details.MaxMarks == null ? 0 : $scope.assignemntDe.details.MaxMarks,
                        MinMarks: $scope.assignemntDe.details.MinMarks == null ? 0 : $scope.assignemntDe.details.MinMarks,
                        Student_ID: $scope.Student_ID,
                        SubmitType: $scope.assignemntDe.subType,
                        NewStatus: $scope.assignemntDe.details.NewStatus,
                        Category: $scope.assignemntDe.details.Category,
                        FileType: '',
                        PlagiarismDetected: $scope.textSimilarityPercentage
                    };
                    var feeSp1 = myService.UserLogin(noP, Path);
                    feeSp1.then(function (d) {
                        if (d.data.Status == "Success") {
                            
                            $scope.showProceedButton = true;
                            $scope.showSaveButton = false;
                            tinyMCE.activeEditor.setContent('');
                            $scope.Assignedreport[EditorIndex] = [];
                            $scope.Assignedreport[EditorIndex].push.apply($scope.Assignedreport[EditorIndex], d.data.Getlist);
                            swal({
                                title: "Success",
                                text: d.data.msg,
                                icon: "success",
                                buttons: true,
                                dangerMode: true,
                            });
                        } else {
                            swal(d.data.msg);
                        }
                    }, function error(d) {
                        console.log("Error in HomeIndexj -> postAssignment Function");
                    });
                }


                $scope.resetModalsetting();
            }
        }

        $scope.ClearDiscription = function (EditorIndex) {
            //$scope.resetModalsetting();
            //$('#modal1').hide();
            $('.progressBarContainer').addClass('ng-hide');
            $scope.showProceedButton = true;
            $scope.showSaveButton = false;

            $scope.Discription = tinyMCE.activeEditor.getContent();

            if ($scope.Discription != '' || $scope.Discription != undefined || $scope.Discription != null) {
                tinyMCE.activeEditor.setContent('');
                return false;
            }
        }
        $scope.closeModal = function (EditorIndex) {
            $scope.resetModalsetting();
            $('#modal1').hide();
            $scope.ClearDiscription(EditorIndex)
        }
        $scope.CloseModalGeneric = function (modalName) {
            $scope.resetModalsetting();
            $('#' + modalName).hide();            
        }
       

        $scope.viewReply = function (message, isEvaluated) {
            $scope.setModalSetting();
            //alert(isEvaluated);
            $('#viewReply').show();
            if (isEvaluated == '') {
                document.getElementById('viewReplyMessage').innerHTML = "<div class='alert alert-danger'>Assignment is not submitted yet</div>";
            }
            if (isEvaluated == 'No') {
                document.getElementById('viewReplyMessage').innerHTML = "<div class='alert alert-danger'>Assignment is not Evaluated yet</div>";
            }
            if (isEvaluated == 'Yes') {
                document.getElementById('viewReplyMessage').innerHTML = "<div class=''>" + message + "</div>";
            }
        }
        $scope.closeViewReply = function () {
            $scope.resetModalsetting();
            $('#viewReply').hide();
        }

        $scope.readURL = function (input) {
            alert(input.trs[0]);
            
            if (input.trs && input.trs[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.image-upload-wrap').hide();
                    $('.file-upload-image').attr('src', e.target.result + '#toolbar=0&navpanes=0');
                    //$('.file-upload-image').attr('src', e.target.result);
                    $('.file-upload-content').show();
                    $('.image-title').html(input.trs[0].name);
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                removeUpload();
            }
        }

        $scope.hideProgressBar = false;
        $scope.assignmentSimilarityPercentage = 0;

        $scope.removeUpload1 = function (currentAssgn, pIndex, index, category) {

            $('#progress-container_' + category + '_' + pIndex + '_' + index + ' .progressLineDiv').addClass('hidePlag');
            $('#progress-container_' + category + '_' + pIndex + '_' + index).addClass('hidePlag');
            $('#progressLine_' + category + '_' + pIndex + '_' + index).addClass('hidePlag');
            $('#spinner_' + category + '_' + pIndex + '_' + index).addClass('hidePlag');
            $('#plagiarismTextId_' + category + '_' + pIndex + '_' + index).addClass('hidePlag');

            $('#proceedButtonId_' + category + '_' + pIndex + '_' + index).show();
            $('#uploadButtonId_' + category + '_' + pIndex + '_' + index).hide();
            // Reset the file input
            let fileInput = $('#' + currentAssgn);
            fileInput.val('');  // Clear the file input value

            //$('.file-upload-content').hide();
            $('#file-upload-content_' + currentAssgn).hide();
            $('#image-upload-wrap_' + currentAssgn).show();
            //$('.image-upload-wrap').show();
        }

        $scope.proceedAssignment = function (row, type, code, scode, pIndex, ReferenceNo, category) {
            
            $scope.assignmentSimilarityPercentage = 100;
            $scope.plagiarism = 'Processing';
            $('#progress-container_' + category + '_' + pIndex + '_' + row + ' .progressLineDiv').removeClass('hidePlag');

            $('#progress-container_' + category + '_' + pIndex + '_' + row).removeClass('hidePlag');
            $('#progressLine_' + category + '_' + pIndex + '_' + row).removeClass('hidePlag');
            $('#spinner_' + category + '_' + pIndex + '_' + row).removeClass('hidePlag');
            $('#plagiarismTextId_' + category + '_' + pIndex + '_' + row).removeClass('hidePlag');



            var progressBar = document.getElementById('progressLine_' + category + '_' + pIndex + "_" + row);

            var plagiarismText = document.getElementById('plagiarismTextId_' + category + '_' + pIndex + "_" + row);

            plagiarismText.classList.add('text-left');
            plagiarismText.textContent = 'Processing';

            progressBar.style.width = $scope.assignmentSimilarityPercentage + '%';
            progressBar.classList.remove('bg-success');
            progressBar.classList.remove('bg-danger');
            progressBar.classList.add('progress-bar-animated');

            var fileInputElement = document.getElementById("uploadAssign_" + category + '_' + pIndex + "_" + row);
            var fileName = fileInputElement.value;
            var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
            

            if (fileExtension != 'pdf') {
                alert("Only .PDF Files Are Accepted !");
                removeUpload();
                return false;
            }

            var fileUpload = $(fileInputElement).get(0);
            var files = fileUpload.files;

            if (files.length === 0) {
                alert("No files uploaded. Please upload a file.");
                return false;
            }

            
            var test = new FormData();
            for (var i = 0; i < files.length; i++) {
                test.append(files[i].name, files[i]);
            }
            test.append('AssignmentID', $scope.assignemntDe.details.ReferenceNo);
            test.append('SubCode', $scope.assignemntDe.subCode);

            $.ajax({
                url: "/Home/CheckPlagiarismAssignment",
                type: 'POST',
                data: test,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {                  
                    $('#spinner_' + category + '_' + pIndex + '_' + row).addClass('hidePlag');
                    $scope.assignmentSimilarityPercentage = parseInt(response.msg);
                    if ($scope.assignmentSimilarityPercentage == 0) {
                        plagiarismText.classList.remove('text-left');
                        $('#progress-container_' + category + '_' + pIndex + '_' + row + ' .progressLineDiv').addClass('hidePlag');
                    }
                    if (response.Status === 'images') {
                        $('#proceedButtonId_' + category + '_' + pIndex + '_' + row).hide();
                        $('#uploadButtonId_' + category + '_' + pIndex + '_' + row).show();
                        plagiarismText.textContent = $scope.assignmentSimilarityPercentage + "% Plagiarism Found";
                    } else if (response.Status === 'Plagiarism') {
                        alert("Plagiarism Found: Please upload another file");
                        progressBar.style.width = $scope.assignmentSimilarityPercentage + '%';
                        progressBar.classList.add('bg-danger');
                        progressBar.classList.remove('progress-bar-animated');
                        plagiarismText.textContent = $scope.assignmentSimilarityPercentage + "% Plagiarism Found";
                        $('#proceedButtonId_' + category + '_' + pIndex + '_' + row).hide();
                        $('#uploadButtonId_' + category + '_' + pIndex + '_' + row).hide();

                    } else if (response.Status === 'Success') {
                        alert("Minimal plagiarism detected. Please upload.");
                        $('#proceedButtonId_' + category + '_' + pIndex + '_' + row).hide();
                        $('#uploadButtonId_' + category + '_' + pIndex + '_' + row).show();
                        progressBar.style.width = $scope.assignmentSimilarityPercentage + '%';
                        progressBar.classList.add('bg-success');
                        progressBar.classList.remove('progress-bar-animated');
                        plagiarismText.textContent = $scope.assignmentSimilarityPercentage + "% Plagiarism Found";

                    }
                    $scope.$apply();
                },
                error: function () {
                    alert("Error occurred while checking plagiarism. Please try again.");
                }
            });
        };


        // changes by Jay ends here

        $scope.uploadAssignment = function (row, type, code, scode, pIndex, ReferenceNo, details, category) {
            swal({
                title: "Are You Sure To Upload Your Solution?",
                text: "Once Uploaded, You Can Not Roll Back This Assignment!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                
                if (willDelete) {
                    //$("#loading_" + row).show();
                    
                    var fileName = document.getElementById("uploadAssign_" + category + '_' + + pIndex + "_" + row).value;
                    var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                    

                    if (isNaN($scope.assignmentSimilarityPercentage)) {
                        $scope.assignmentSimilarityPercentage = 0;
                    }
                    

                    if (fileExtension != 'pdf') {
                        alert("Only .PDF Files Are Accepted !");
                        removeUpload();
                        return false;
                    }
                    //var aid = angular.copy($scope.Alist[pIndex][row].EID);
                    {
                        var fileUpload = $("#uploadAssign_" + category + '_' + pIndex + "_" + row).get(0);
                        var files = fileUpload.files;
                        var test = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            test.append(files[i].name, files[i]);
                        }
                        $.ajax({
                            url: "/ImageUpload.ashx?type=NewADL-" + ReferenceNo + "-" + type,
                            type: 'POST',
                            data: test,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (file) {
                                if (file.name == "Success") {
                                    var Path = "/Home/submitAssignmentNew";
                                    var noP = {
                                        Message: $scope.Discription,
                                        assignmentID: details.ReferenceNo,
                                        Status: details.Status,
                                        ResponseType: details.ResponseType,
                                        BatchID: details.BatchID,
                                        SubjectCode: $scope.assignemntDe.subCode,
                                        SubjectName: $scope.assignemntDe.details.SubjectName,
                                        UploadedOn: details.PostedOn,
                                        UploadedByID: details.PostedBy,
                                        UploadedByName: details.PostedBy,
                                        StartOn: details.StartDtae,
                                        ExpiredOn: details.EndDate,
                                        Caption: details.Title,
                                        Module: details.Module,
                                        MaxMarks: details.MaxMarks,
                                        MinMarks: details.MinMarks,
                                        Student_ID: $scope.Student_ID,
                                        SubmitType: $scope.assignemntDe.subType,
                                        NewStatus: details.NewStatus,
                                        Category: details.Category,
                                        FileType: fileExtension,
                                        PlagiarismDetected: $scope.assignmentSimilarityPercentage
                                    };
                                    var feeSp1 = myService.UserLogin(noP, Path);
                                    feeSp1.then(function success(d) {
                                        
                                        if (d.data.Status == 'Success') {
                                            swal({
                                                title: "Success",
                                                text: d.data.msg,
                                                icon: "success",
                                                buttons: true,
                                                dangerMode: true,
                                            });
                                            $('#assignmentReplyFile_Assignment_' + pIndex + '_' + row).hide();
                                            $('#assignmentReplyFile_Experiment_' + pIndex + '_' + row).hide();
                                            $('#assignmentReplyFile_Discussion_' + pIndex + '_' + row).hide();

                                            $scope.Assignedreport[pIndex] = d.data.Getlist;
                                            
                                        }
                                        //swal(d.data);
                                        //$scope.showAssignment(type, scode, pIndex);
                                        $("#loading_" + row).hide();
                                    }, function error(d) {
                                        console.log("Error in HomeIndexj -> postAssignment Function");
                                        $("#loading_" + row).hide();
                                    });

                                }
                                else {
                                    swal("Alert", "Some Error Occured During File Uploading.Please Try After Some Time");
                                    $("#loading_" + row).hide();
                                }
                            },
                            error: function (file) {
                                swal("Alert", "Some Error Occured During File Uploading.Please Try After Some Time");
                                $("#loading_" + row).hide();
                            }
                        });
                    }
                }
            });

        }

        $scope.showSolution = function (EID, type) {
            var baseUrl = "https://glauniversity.in/Students/Assignments/Solution/";
            $scope.setModalSetting();
            $('#solutionIframe').attr('src', baseUrl+EID + '.' + type);

        }
        $scope.showAttachment = function (EID, type) {
            openPopUp("https://glauniversity.in:8107/Content/discussion/" + EID, 1024, 768);
            //$('#solutionIframe').attr('src', "https://glauniversity.in:8107/Content/discussion/" + EID);

        }
        $scope.CloseModalSolution = function () {
            $scope.resetModalsetting();
            $('#modalSolution').hide();
        }

        //Begin notes slide
        function plusSlides(b, count, sliderLength, pIndx) {
            console.log(b, count, sliderLength, pIndx);
            if (count == 1 && b == -1) {
                document.getElementById("sliderRow_" + pIndx).style.left = 0 + 'px';
            }
            if (count != 1 && b == -1 && document.getElementById("sliderRow_" + pIndx).style.left != "") {
                //var scrollWidth = document.getElementById("sliderRow").clientWidth / sliderLength;
                var scrollWidth = document.getElementsByClassName('slide')[0].clientWidth;
                document.getElementById("sliderRow_" + pIndx).style.left = parseInt(document.getElementById("sliderRow_" + pIndx).style.left) + scrollWidth + 'px';
            } else {
                if (count != sliderLength) {
                    var scrollWidth = document.getElementById("sliderRow_" + pIndx).clientWidth / sliderLength;
                    document.getElementById("sliderRow_" + pIndx).style.left = scrollWidth + 'px';
                }                
                if (count+1 == sliderLength) {
                    document.getElementById("sliderRow_" + pIndx).style.left = document.getElementById("sliderRow_" + pIndx).style.left -100+ 'px';
                }
            }
            if (b == 1 && (count != sliderLength)) {
                var scrollWidth = document.getElementsByClassName('slide')[0].clientWidth;
                scrollWidth = scrollWidth * count
                document.getElementById("sliderRow_" + pIndx).style.left = '-' + scrollWidth + 'px'
            }
        }


        //begin calculate the video percentage
        function convertToPercent(watchTime) {
            var aa = watchTime.toString().split(":");
            return parseInt(aa[0] * 3600) + parseInt(aa[1]) * 60 + parseInt(aa[2]);
        }
        //end calculate the video percentage

        function roundToTwo(num) {
            return +(Math.round(num + "e+2") + "e-2");
        }
        $scope.PullProgressReportOffline = function (subjectCode, topicCode, module, leaf) {
            NoteVideoService.recordVideoTime("/Home/FetchProgressReportoffline", { "subjectCode": subjectCode, "topicCode": topicCode, "module": module, "LDPId": leaf }).then(function (d) {
                if (d.data) {

                    var video = document.querySelector('.container video');
                    //var t = parseInt((((parseInt(d.data.watchedTime) * 100) / parseInt(d.data.TotalVideo)) + ((parseInt(d.data.pdfAttempted) * 100) / parseInt(d.data.TotalPdf)) + ((parseInt(d.data.pptx) * 100) / parseInt(d.data.TotalPpt))) / 3)
                    var t = ((parseInt(d.data.video) ? parseInt(d.data.video) : 0) + (parseInt(d.data.pdf) ? parseInt(d.data.pdf) : 0) + (parseInt(d.data.pptx) ? (parseInt(d.data.pptx) * 100) / parseInt(d.data.TotalPpt) : 0)) / 3;

                    $rootScope.$broadcast('eventBroadcastedName', {
                        "VideoPercentage": parseInt(d.data.video) ? parseInt(d.data.video) : 0,
                        "pdfPercentage": parseInt(d.data.pdf) ? parseInt(d.data.pdf) : 0,
                        "pptPercentage": parseInt(d.data.pptx) ? (parseInt(d.data.pptx) * 100) / parseInt(d.data.TotalPpt) : 0,

                        "watchedTime": parseInt(d.data.watchedTime),
                        "pdfAttempted": parseInt(d.data.pdfAttempted),
                        "pptProgress": parseInt(d.data.pptx),

                        "TotalVideo": parseInt(d.data.TotalVideo),
                        "TotalPDF": parseInt(d.data.TotalPdf),
                        "TotalPpt": parseInt(d.data.TotalPpt),

                        "OverallPercentage": roundToTwo(t, 2)
                    });

                } else {
                    $rootScope.$broadcast('eventBroadcastedName', {
                        "VideoPercentage": 0,
                        "watchedTime": 0,
                        "pdfProgress": 0,
                        "pdfPercentage": 0,
                        "pptProgress": 0
                    });
                }
            });
        }


        //start video
        $scope.startNotesVideo = function (category, subjectCode, topicCode, refNo, ldpid) {
            $scope.subjectCode = subjectCode, $scope.topicCode = topicCode;
            $rootScope.$broadcast('startNotesVideo', { "subjectCode": subjectCode, "topicCode": topicCode, "category": category, "refNo": refNo, "LDPId": ldpid });
        }
        //end video
        $scope.startNotesPDF = function (category, subjectCode, topicCode, refNo, ldpid) {
            $scope.subjectCode = subjectCode, $scope.topicCode = topicCode;
            $rootScope.$broadcast('startNotesPDF', { "subjectCode": subjectCode, "topicCode": topicCode, "category": category, "refNo": refNo, "LDPId": ldpid });
        }
        $scope.startNotesPPT = function (category, subjectCode, topicCode, refNo, ldpid) {
            $scope.subjectCode = subjectCode, $scope.topicCode = topicCode;
            $rootScope.$broadcast('startNotesPPT', { "subjectCode": subjectCode, "topicCode": topicCode, "category": category, "refNo": refNo, "LDPId": ldpid });
        }
        //PDF view start 
        $scope.toggleFullscreen = function (buttonNumber, subjectCode, topicCode) {
            myFactory.setData({ "subjectCode": subjectCode, "topicCode": topicCode });
            $rootScope.$emit("toggleFullScreen", { "buttonNumber": buttonNumber });
        }

        $scope.StudyMaterial = function (type, pIndx) {
            $('#load_' + pIndx).show();
            $('#loader_' + pIndx).show();
            var Path = "/Home/StudyMaterial";
            var noP = {
                Text: type,
            };
            var feeSp5 = myService.UserLogin(noP, Path);
            feeSp5.then(function success(d) {
                $scope.studyModule[pIndx] = [];
                $scope.studyModule[pIndx].push.apply($scope.studyModule[pIndx], d.data);
                
                if ($scope.studyModule.length > 0 && $scope.studyModule[pIndx].length > 0) {
                    $scope.ShowModuleMaterial($scope.studyModule[pIndx][0].Module, type, $scope.studyModule[pIndx][0].Parent_Id, pIndx);
                }

                $('#load_' + pIndx).hide();
                $('#loader_' + pIndx).hide();
                $scope.showInnerhamburgerManu(pIndx);
            }, function error(d) {
                console.log("Error in HomeIndexj -> StudyMaterial Function");
            });
        }
        $scope.LoadQuizDetails = function (subCode) {
            var Path = "/Home/getQuizDetails";
            var noP = { 'SubjectCode': subCode };
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d) {
                $scope.QuizRecordDetails = d.data;
            }, function error(d) {
                console.log("Error in HomeIndexj -> LoadPrepAttendance Function");
            })
        }

        $scope.showQuizesAll = true;
        $scope.showExam = false;

        $scope.AttemptedQuizParentDetails = {};
        $scope.AttemptedQuizDetails = {};

        $scope.SelectedQno = 0;
        $scope.QuestionAttempt = {};

        $scope.isLoadingQuestion = false;
        $scope.LoadQuizDetailsSubjective = function (x, index) {
            $scope.showQuizesAll = true;
            $scope.showExam = false;
            $scope.isLoadingQuestion = false;
            $scope.SelectedQno = 0;

            $scope.AttemptedQuizParentDetails = {};
            $scope.AttemptedQuizDetails = {};
            $scope.QuestionAttempt = {};

            $("#SubjectiveQuizload_" + index).show();
            $scope.list[index].SubjectiveQuizes = [];
            var Path = "/Home/getQuizDetailsSubjective";
            var noP = { 'batchId': x.BatchCode };
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d) {
                if (d.data.Status == "Success") {
                    $scope.list[index].SubjectiveQuizes = d.data.SubjectiveQuizes;
                    $("#SubjectiveQuizload_" + index).hide();
                }
                else {
                    alert(d.data.Message);
                    $("#SubjectiveQuizload_" + index).hide();
                    return;
                }
            }, function error(d) {
                console.log("Error in HomeIndexj -> LoadQuizDetailsSubjective Function");
                $("#SubjectiveQuizload_" + index).hide();
            })

        }

        $scope.parseIntf = function (x) {
            return parseInt(x);
        }

        $scope.ClickOperationExam = function (x, quiz) {
            if (quiz.CanAttempt) {
                $scope.AttemptedQuizParentDetails = x;
                $scope.AttemptedQuizDetails = quiz;
                $scope.QuestionAttempt = {};
                $scope.SelectedQno = (quiz.LastQuesId != '' ? parseInt(quiz.LastQuesId) + 1 : 1);
                $scope.LoadQuestionSubjectiveQuiz($scope.SelectedQno,'Y');
            }
        }

        $scope.LoadQuestionSubjectiveQuiz = function (x, y) {

            $scope.isLoadingQuestion = true;
            $scope.SelectedQno = parseInt(x);
            $scope.QuestionAttempt = {};

            var Path = "/Home/GetQuestionForQuiz";
            var noP = { 'QuizNo': $scope.AttemptedQuizDetails.QuizNo, 'QuestionNo': x,'IsLoginAttempt':y};
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d) {
                if (d.data.Status == "Success") {
                    if (y == "Y") {
                        $scope.showQuizesAll = false;
                        $scope.showExam = true;
                    }
                    $scope.AttemptedQuizDetails.AttemptStatus = d.data.AttemptStatus;
                    $scope.QuestionAttempt = d.data.Question;
                    $scope.isLoadingQuestion = false;
                    setTimeout(function () {
                        var batch = $scope.AttemptedQuizParentDetails.BatchCode;
                        var quiz = $scope.AttemptedQuizDetails.QuizNo;
                        var qno = $scope.SelectedQno;
                        if ($scope.QuestionAttempt.SelectedAnswer!='' && parseInt($scope.QuestionAttempt.SelectedAnswer) > 0) {
                            document.getElementsByName(batch + '_' + quiz + '_' + qno + '_optionsAnswer')[parseInt($scope.QuestionAttempt.SelectedAnswer)-1].checked = true 
                        }
                    },10) 
        

                    
                }
                else {
                    alert(d.data.Message);
                    $scope.isLoadingQuestion = false;
                    return;
                }
            }, function error(d) {
                console.log("Error in HomeIndexj -> LoadQuizDetailsSubjective Function");
                $scope.isLoadingQuestion = false;
            })
        }

        $scope.SaveAndGetNextQuestion = function () {
            if ($scope.QuestionAttempt.SelectedAnswer == undefined || $scope.QuestionAttempt.SelectedAnswer == null || $scope.QuestionAttempt.SelectedAnswer == '' || $scope.QuestionAttempt.SelectedAnswer == '0') {
                alert("Please Select Answer First...");
                return;
            }

            $scope.isLoadingQuestion = true;

            var Path = "/Home/SaveAndGetNextQuestion";
            var noP = { 'Ques': $scope.QuestionAttempt };
            var feeSp31 = myService.UserLogin(noP, Path);
            feeSp31.then(function success(d) {
                if (d.data.Status == "Success") {
                    if (d.data.Finished == 'Yes') {
                        alert(d.data.Message);
                        $scope.QuestionAttempt = {};
                        var BatchCode = $scope.AttemptedQuizParentDetails.BatchCode;
                        var index = $scope.list.findIndex(function (item) { return item.BatchCode == BatchCode; });

                        $scope.isLoadingQuestion = false;

                        $scope.LoadQuizDetailsSubjective($scope.AttemptedQuizParentDetails, index);
                        return;
                    }
                    else {
                        $scope.SelectedQno = parseInt($scope.SelectedQno) + 1;

                        $scope.LoadQuestionSubjectiveQuiz($scope.SelectedQno,'N');
                    }
                }
                else {
                    alert(d.data.Message);
                    $scope.isLoadingQuestion = false;
                    return;
                }
            }, function error(d) {
                console.log("Error in HomeIndexj -> LoadQuizDetailsSubjective Function");
                $scope.isLoadingQuestion = false;
            })
        }

        
    }
    
    $scope.backgroundColorChange = function () {
        console.log($scope.gSub, "d", $scope.gData);
        var color = $scope.gData.map((x) => {
            if (x > 80) {
                console.log(x);
                return "#008000";
            }
            if (x > 70 && x < 79) {
                console.log(x);
                return "#ff0000"
            }
            else {
                console.log(x);
                return "#ffff00"
            }

        });
        console.log(color);
        return color;
    }
    $scope.DetectDevice = function () {
        //const userAgent = navigator.userAgent.toLowerCase();
        //const isTabletOrMobile = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
        //return isTabletOrMobile;

        const isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },

            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera());
            }
        };
        if (isMobile.any()) return true;
    }
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.SyllabusDetails = function (SuType, SuCode, pIndex) {
        
        var Path = "/Home/SyllabusDetails";
        var noP = {
            Value: SuType,
            Text: SuCode
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d) {   
            //$scope.NoteSyllabus[pIndex] = "";
            $scope.NoteSyllabus[pIndex] = d.data.url;            
        }, function error() {
            console.log("Error in function -> SyllabusDetails");
        })
    }
    $scope.getTopic = function (moduleID, subCode, pIndx) {
        console.log("Texting=", moduleID, subCode, pIndx);
        $scope.type = subCode;
        var count = 1;
        var sliderLength = 0;
        var completeSliderWidth = 0;
        document.getElementById("loader_" + pIndx).style.display = "block";

        var Path = "/Home/GetTopicSubtopic1";
        var noP = {
            Value: moduleID,
            Text: subCode
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d) {
            console.log(d);
            document.getElementById("loader_" + pIndx).style.display = "none";
            $scope.ModuleTopics[pIndx] = d.data.list;
            sliderLength = parseInt($scope.ModuleTopics[pIndx].length);
            completeSliderWidth = parseInt(sliderLength) * 25;

            //$('.noteSliderWrapper').css('width', $('.clasForWidthCalculateForSlide').width() - 310);
            var slideWidth = (document.getElementsByClassName('main-slide-wrap')[0].clientWidth);
            setTimeout(function () {
                //var slideWidth = (document.getElementsByClassName('slide')[0].clientWidth + 12) * 4;
              
                console.log(slideWidth);
                document.getElementById('sliderWrapper_' + pIndx).style.maxWidth = parseInt(slideWidth) * parseInt(sliderLength) + "px";
                //$('.noteSliderWrapper').css('width', parseInt(slideWidth)-33 + "px");
            }, 100);    

            $("#prev" + pIndx).click(function () {
                if (count != 1 && count != 0) {
                    plusSlides(-1, count, parseInt(sliderLength), pIndx); count--;
                }
            });
            $("#next" + pIndx).click(function () {                
                console.log(count, sliderLength)
                //if ((count - 1) + 4 != sliderLength) {
                var isMobile = $scope.DetectDevice();                
                //var isMobile = true;
                if (isMobile) {
                    if (count == parseInt(sliderLength)) {
                        plusSlides(1, count, parseInt(sliderLength), pIndx);
                    }
                    if (count < parseInt(sliderLength)) {
                        plusSlides(1, count, parseInt(sliderLength), pIndx); count++;
                    }                    
                } else {
                    if ((count + 2) <= parseInt(sliderLength)) {
                        plusSlides(1, count, parseInt(sliderLength), pIndx); count++;
                    }
                }

            });

        }, function error(d) {
            console.log("Error in HomeIndexj -> ShowModuleMaterial Function");
        })

    }

    $scope.ViewTopicContent = function (subCode, Value, pIndx, index) {
        console.log(subCode, Value, $scope.ContentList, $scope.ContentList[pIndx]);
        //$scope.getTopic(moduleID, type);
        var Path = "/Home/ViewTopicContent";
        var noP = {
            Value: Value,
            Text: subCode
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d) {
            $scope.ContentList[pIndx] = [];
            $scope.ContentList[pIndx][index] = [];
            $scope.ContentList[pIndx][index].push.apply($scope.ContentList[pIndx][index], d.data.list);
            console.log("innerIndex=", $scope.ContentList[pIndx][index]);
            console.log($scope.ContentList);
        }, function error(d) {
            console.log("Error in HomeIndexj -> ShowModuleMaterial Function");
        })
    }

    $scope.ShowModuleMaterial = function (Module, type, moduleID, pIndx) {
        $scope.selectedModule = Module;
        $scope.getTopic(moduleID, type, pIndx);
    }
    $scope.StudyMaterial = function (type, pIndx) {
        $('#load_' + pIndx).show();
        $('#loader_' + pIndx).show();
        var Path = "/Home/StudyMaterial";
        var noP = {
            Text: type,
        };
        var feeSp5 = myService.UserLogin(noP, Path);
        feeSp5.then(function success(d) {
            console.log(d);
            $scope.studyModule[pIndx] = [];
            $scope.studyModule[pIndx].push.apply($scope.studyModule[pIndx], d.data);
            console.log("Module=", $scope.studyModule[pIndx], $scope.studyModule);

            if ($scope.studyModule.length > 0 && $scope.studyModule[pIndx].length > 0) {
                $scope.ShowModuleMaterial($scope.studyModule[pIndx][0].Module, type, $scope.studyModule[pIndx][0].Parent_Id, pIndx);
            }

            $('#load_' + pIndx).hide();
            $('#loader_' + pIndx).hide();
            $scope.showInnerhamburgerManu(pIndx);
        }, function error(d) {
            console.log("Error in HomeIndexj -> StudyMaterial Function");
        });
    }
    //End of syllabus update
});

//Modal Angular Controller Defination
{
    app.service('NoteVideoService', function ($http) {
        this.recordVideoTime = function (Path, data) {
            var response = $http({
                method: 'post',
                url: Path,
                data: JSON.stringify(data),
                dataType: "json"
            })
            return response;
        }

    });
    app.factory('myFactory', function ($rootScope) {
        var data = {};
        return {
            setData: function (newData) { data = newData; },
            getData: function () { return data; }
        }
    });
    app.controller("playNotesVideo", function ($scope, NoteVideoService, $sce, videoService, $rootScope, myFactory) {
        var attachmentID;
        var video = document.querySelector('.container video#notesVideoPlayer');

        $scope.VideoURL = '';
        $scope.$on('AttchmentID', function (event, data) {

            attachmentID = data.attachmentId;
            console.log("g", data);
            if (isNull(data.attachmentData) || isNull(data.attachmentData.pauseTime)) {
                //console.log("in 0")
                video.currentTime = 0;
            }
            else {
                setTimeout(function () {
                    video.currentTime = parseInt(data.attachmentData.pauseTime);
                    var storedPauseTime = data.attachmentData.pauseTime;
                    document.getElementById('storedPauseTime').value = storedPauseTime;
                    //console.log(data.attachmentData.pauseTime, "ii", video.currentTime);
                }, 110);

            }
            $scope.VideoURL = data.VideoURL;

        })

        function isNull(s) {
            return s == null || s == undefined || s == "";
        }
        function convertTime(inputSeconds) {
            var sec_num = parseInt(inputSeconds); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            return hours + ':' + minutes + ':' + seconds;
        }

        $scope.closeNotesVideo = function () {
            var SData = myFactory.getData();
            console.log("SData=", SData);
            var WatchedTime = video.currentTime;
            WatchedTime = document.getElementById('storedPauseTime').value;
            var total_video_time = video.duration;
            video.pause();
            video.currentTime = 0;
            NoteVideoService.recordVideoTime("/Home/PushProgressReport", {
                "vWatchedTime": WatchedTime, "category": "video", "subjectCode": SData.subjectCode, topicCode: SData.topicCode,
                "totalPage": video.duration, "attachmentID": attachmentID, "LDPId": SData.LDPId
            }).then(function (d) {
                if (d.data) {

                } else {
                    alert("Sorry !! Error during record processing");
                }
            })
        }
    });

    app.controller('playNotesPPT', function ($scope, $rootScope, NoteVideoService, myFactory) {

        $scope.PPtURL = '';
        $rootScope.$on('playPPT', function (event, data) {
            $scope.pptFileName = data.fileName;
            $scope.attachmentID = data.attachmentID;
            $scope.PPtURL = data.UrlPPT;
            document.getElementById('pptFrame').src = data.UrlPPT;
        })
        $scope.startNotesPPT1 = function () {

        }

        $scope.closePPTVIewer = function () {
            var SData = myFactory.getData();
            NoteVideoService.recordVideoTime("/Home/PushProgressReport", {
                "vWatchedTime": 1, "category": "PPT", "subjectCode": SData.subjectCode, topicCode: SData.topicCode,
                "totalPage": 1, "attachmentID": $scope.attachmentID, "LDPId": SData.LDPId
            }).then(function (d) {
                if (d.data) {

                } else {
                    alert("Sorry !! Error during record processing");
                }
            })

        }
    });

    app.controller('NotesPdf', function ($scope, $rootScope, NoteVideoService, myFactory) {
        let pdfDoc = null;
        let pageNum = 1;
        let pageRendering = false;
        let pageNumPending = null;
        $scope.totalPage = null;
        let scale = 1.0;
        const canvas = document.createElement("canvas");
        canvas.id = "pdf-canvas";
        const ctx = canvas.getContext("2d");
        //document.getElementById("pdf-container").style.display = "none";
        $scope.UrlPdf = '';
        $scope.$on('playPDF', function (event, data) {
            console.log("Calling PDF Player = ", data);
            $scope.fileName = data.fileName;
            $scope.attachmentID = data.attachmentID;
            $scope.pdfCurrentPage = 1;
            $scope.UrlPdf = data.UrlPdf;
            if (data.attachmentData != undefined || data.attachmentData != null) {
                if (data.attachmentData.pdfProgress != 0) {
                    $scope.pdfCurrentPage = parseInt(data.attachmentData.pdfProgress);
                }
            }
            $scope.toggleFullscreen(1);
        })

        function checkDevtools() {
            if (devtools.isOpen) {

                return true;
            }
        }

        //function to check the developer tools is open or not
        function RequestFullScreen(container) {

            if (document.fullscreenElement == null) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.mozRequestFullScreen) { // Firefox
                    container.mozRequestFullScreen();
                } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Opera
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) { // IE/Edge
                    container.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { // Firefox
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // IE/Edge
                    document.msExitFullscreen();
                }
            }
        }


        function loadPdf(url) {
            console.log(url);
            //url = "https://glauniversity.in/Students/office_docs/GRADUATION/SEM_VI/eOGHwauy2BdmbhEklpJK6q3VLqO6T0FCAd0X0C9KRjmajbyL2vl4sPGUGKU.pdf";
            url = encodeURI(url); console.log(url)
            if ($scope.pdfCurrentPage != null || $scope.pdfCurrentPage != undefined || $scope.pdfCurrentPage != "" || $scope.pdfCurrentPage != 0 || $scope.pdfCurrentPage != '0') {
                pageNum = $scope.pdfCurrentPage;
            } else {
                pageNum = 1; // Reset the pageNum variable to 1
            }
            pdfjsLib.getDocument(url).promise.then((doc) => {
                $scope.totalPage = doc.numPages;
                pdfDoc = doc;
                renderPage(pageNum);
            });
        }

        function loadPdf2(url) {
            if ($scope.pdfCurrentPage != null || $scope.pdfCurrentPage != undefined || $scope.pdfCurrentPage != "" || $scope.pdfCurrentPage != 0 || $scope.pdfCurrentPage != '0') {
                pageNum = $scope.pdfCurrentPage;
            } else {
                pageNum = 1; // Reset the pageNum variable to 1
            }
            pdfjsLib.getDocument(url).promise.then((doc) => {
                $scope.totalPage = doc.numPages;
                pdfDoc = doc;
                renderPage(pageNum);
            });
        }
      
        function renderPage(num) {
            pageRendering = true;
            pdfDoc.getPage(num).then((page) => {
                const viewport = page.getViewport({ scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport,
                };

                page.render(renderContext).promise.then(() => {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });
        }

        $scope.toggleFullscreen = function (buttonNumber) {
            //if (checkDevtools()) {
            //    alert("Close the Developer Tools Then Try Access");
            //    return;
            //}

            document.addEventListener('fullscreenchange', function (event) {
                var pdfContainer = document.getElementById('pdf-container1');
                if (!document.fullscreenElement && pdfContainer.style.display !== 'none') {
                    //pdfContainer.style.display = 'none';
                }
            });
            document.addEventListener('contextmenu', event => event.preventDefault());

            document.addEventListener("keydown", function (event) {
                if (event.ctrlKey || event.key == "F1" || event.key == "F2" || event.key == "F3" || event.key == "F4" || event.key == "F5" || event.key == "F6" || event.key == "F7" || event.key == "F8" || event.key == "F9" || event.key == "F10" || event.key == "F11" || event.key == "F12" || event.key == "Meta" || event.keyCode == 91) {
                    event.preventDefault();
                }
            });
            var container = document.getElementById("pdf-container1");

            if (buttonNumber === 'exit') {
                var SData = myFactory.getData();
                if (pageNum != undefined || pageNum != null || pageNum != '') {
                    NoteVideoService.recordVideoTime("/Home/PushProgressReport", {
                        "vWatchedTime": pageNum,
                        "category": "PDF",
                        "subjectCode": SData.subjectCode,
                        "topicCode": SData.topicCode,
                        "totalPage": $scope.totalPage,
                        "attachmentID": $scope.attachmentID,
                        "totalAttachmentLength": SData.totalAttachmentLength,
                        "LDPId": SData.LDPId
                    }).then(function (d) {
                        if (d.data) {
                            if (container.style.display === 'none') {
                                container.style.display = 'block';
                            } else {
                                container.style.display = "none";
                            }
                            RequestFullScreen(container);
                            return;
                        } else {
                            alert("Sorry !! Error during record processing"); return
                        }
                    })
                }
            } else {
                if (container.style.display === 'none') {
                    container.style.display = 'inline-block';
                } else {
                    container.style.display = "none";
                }
                RequestFullScreen(container);
                if (buttonNumber === 1) {
                    //const url = "/Notes/pdf/" + $scope.fileName; // Replace with the URL of the first PDF
                    //const url = "/Notes/pdf/1688438813819.pdf";
                    //loadPdf(url);
                    console.log($scope.UrlPdf)
                    loadPdf($scope.UrlPdf);
                    const container = document.getElementById("pdf-container1");
                    container.appendChild(canvas);
                } else if (buttonNumber === 2) {
                    // const url = "/Notes/pdf/" + $scope.fileName; // Replace with the URL of the second PDF
                    // loadPdf2(url);
                    loadPdf2($scope.UrlPdf);
                    const container = document.getElementById("pdf-container1");
                    container.appendChild(canvas);
                }
            }
        }

        //$rootScope.$on("toggleFullScreen", function (event, data) {
        //    $scope.toggleFullscreen(data.buttonNumber);
        //});

        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }


        $scope.onPrevPage = function () {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }

        $scope.onNextPage = function () {

            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }
        $scope.zoomIn = function () {
            var canvasHeight = canvas.height;
            var ScreenHeight = window.screen.availHeight - 3;
            if (canvasHeight >= ScreenHeight) {
                return;
            }
            scale += 0.1;
            renderPage(pageNum);
        }

        $scope.zoomOut = function () {
            if (scale <= 0.2) {
                return;
            }
            scale -= 0.1;
            renderPage(pageNum);
        }
        window.addEventListener('keydown', handleKeyDown);
        function handleKeyDown(event) {
            switch (event.key) {
                case "ArrowLeft":
                    $scope.onPrevPage();
                    break;
                case "ArrowRight":
                    $scope.onNextPage();
                    break;
                case "+":
                case "ArrowUp":
                    $scope.zoomIn();
                    break;
                case "-":
                case "ArrowDown":
                    $scope.zoomOut();
                    break;
            }
        }

        $scope.closeNotesPDF = function (pageNumber) {
            var SData = myFactory.getData();

            NoteVideoService.recordVideoTime("/Home/PushProgressReport", { "vWatchedTime": pageNumber, "category": "PDF", "subjectCode": SData.subjectCode, topicCode: SData.topicCode }).then(function (d) {
                if (d.data) {

                } else {
                    alert("Sorry !! Error during record processing");
                }
            })
        }

    });

    app.controller("NotesReport", ['$scope', function ($scope) {

        $scope.$on('eventBroadcastedName', function (event, data) {

            $scope.CourseReport = data;

            const xValues = ["PDF", "PPT", "Video"];
            const yValues = [data.pdfAttempted, data.pptProgress, data.watchedTime];
            const barColors = ["#fbbc05", "#34a853", "#4285f4"];
            //var ctx1 = document.getElementById("myChart").getContext("2d");
            new Chart("myChart", {
                type: "polarArea",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }],
                    hoverOffset: 4,

                },
                options: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: "Notes Report"
                    }
                }
            });




            //$scope.myChart = function () {
            //    var options = {
            //        chart: {
            //            height: 350,
            //            type: 'bar',
            //            toolbar: {
            //                show: false
            //            }
            //        },
            //        plotOptions: {
            //            bar: {
            //                horizontal: false,
            //                verticle: true
            //            }
            //        },
            //        dataLabels: {
            //            enabled: true
            //        },
            //        series: [{
            //            name: "Attendance ",
            //            data: $scope.CourseReport
            //        }],
            //        xaxis: {
            //            categories: yValues,
            //        },
            //        tooltip: {
            //            y: {
            //                formatter: function (value) {
            //                    return value + " %";
            //                }
            //            },
            //            z: {
            //                formatter: undefined,
            //                title: 'Size: '
            //            },
            //        }
            //    }

            //    var chart = new ApexCharts(
            //        document.querySelector("#myChart"),
            //        options
            //    );
            //    chart.render();
            //}
            //$scope.myChart();
        });

        $scope.refreshReport = function () {

            $scope.$on('eventBroadcastedName', function (event, data) {
                $scope.CourseReport = data;

            });
        }



    }]);

    app.controller("NotesVideosPopUpCont", function ($scope, NoteVideoService, myFactory, $rootScope) {
        $scope.$on('startNotesVideo', function (event, data) {
            NoteVideoService.recordVideoTime("/Home/GetModuleMaterial", { "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "refNo": data.refNo, "LDPId": data.LDPId }).then(function (d) {
                console.log("startNotesVideo=", d.data);
                if (d.data) {
                    myFactory.setData({ "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "totalAttachmentLength": d.data.list.length, "LDPId": data.LDPId });
                    $scope.videos = d.data.list;
                } else {
                    alert("Sorry !! Error during record processing");
                }
            })
        })
        //$scope.playVideo = function (fileName, url) {
        //    $rootScope.$broadcast("AttchmentID", { "VideoURL": fileName, url });
        //}

        $scope.playVideo = function (fileName, attachmentId) {
            NoteVideoService.recordVideoTime('/Home/GetContent', { "attachmentId": attachmentId }).then(function (d) {
                console.log(d);
                if (d.data) {
                    $rootScope.$broadcast("AttchmentID", { "attachmentId": attachmentId, "attachmentData": d.data[0], "VideoURL": fileName })
                } else {
                    alert("Sorry !! Error during record processing");
                }
            })

        }


    })

    app.controller("NotesPDFPopUpCont", function ($scope, NoteVideoService, myFactory, $rootScope) {
        var SData = {};
        $scope.$on('startNotesPDF', function (event, data) {
            console.log(data);
            NoteVideoService.recordVideoTime("/Home/GetModuleMaterial", { "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "refNo": data.refNo, "LDPId": data.LDPId }).then(function (d) {
                console.log("calling PDF List", d);
                $scope.pdfs = [];
                if (d.data.list.length > 0) {
                    //var tempData = d.data.filter((item) => (item.type == '.pdf'));
                    SData = myFactory.setData({ "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "totalAttachmentLength": d.data.list.length, "LDPId": data.LDPId });
                    $scope.pdfs = d.data.list;
                } 
                //else {
                //    alert("Sorry !! Error during record processing");
                //}
            })
        })
        //$scope.playPDF = function (fileName, url) {
        //    $rootScope.$broadcast('playPDF', { "fileName": fileName,"data": SData, "UrlPdf": url });                     
        //}
        $scope.playPDF = function (fileName, attachmentID) {
            NoteVideoService.recordVideoTime('/Home/GetContent', { "attachmentId": attachmentID }).then(function (d) {
                if (d.data) {
                    $rootScope.$broadcast('playPDF', { "fileName": fileName, "attachmentID": attachmentID, "data": SData, "attachmentData": d.data[0], "UrlPdf": fileName });
                } else {
                    alert("Sorry !! Error during record processing");
                }
            })

        }
    })
    app.controller("NotesPPTPopUpCont", function ($scope, NoteVideoService, myFactory, $rootScope) {
        var SData = {};
        $scope.$on('startNotesPPT', function (event, data) {
            NoteVideoService.recordVideoTime("/Home/GetModuleMaterial", { "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "refNo": data.refNo, "LDPId": data.LDPId }).then(function (d) {
                if (d.data) {
                    //var tempData = d.data.filter((item) => (item.type == '.pptx'));
                    SData = myFactory.setData({ "category": data.category, "subjectCode": data.subjectCode, "topicCode": data.topicCode, "totalAttachmentLength": d.data.list.length, "LDPId": data.LDPId });
                    $scope.pptx = d.data.list
                } else {
                    alert("Sorry !! Error during record processing");
                }
            })
        })
        //$scope.playPPT = function (fileName, attachmentID, url) {
        //    $rootScope.$broadcast('playPPT', { "fileName": fileName, "data": SData, "UrlPPT": url });
        //}
        $scope.playPPT = function (fileName, attachmentID) {
            $rootScope.$broadcast('playPPT', { "fileName": fileName, "attachmentID": attachmentID, "data": SData, "UrlPPT": fileName });
        }

    })

    app.filter('unique', function () {
        return function (items, filterOn) {
            if (filterOn === false) {
                return items;
            }
            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }
                });
                items = newItems;
            }
            return items;
        };
    });
}

