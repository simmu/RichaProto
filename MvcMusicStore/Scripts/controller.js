app = angular.module("rn", [])

//Recruitment Dashboard Directive
app.directive("campaign", function () {

    var link = function ($scope, $el, attrs, ctrl) {

        $scope.hasCompleted = false;

        //onDelete
        $scope.onDeleteSchool = function (e, school) {
            //make it object
            $scope.toBeDeleteId = school;
            $('#modal-confirmDelete').modal('show');
            e.preventDefault();
        }

        //onConfirm delete
        $scope.onConfirmDelete = function (e) {

            if ($scope.toBeDeleteId) {
                var $el = $(e.currentTarget);
                $el.button('loading');
                //call api method
                $scope.api.doDeleteSchool($scope.toBeDeleteId,
                    function (data) {
                        $el.button('reset');
                        $scope.$apply(function () {
                            $scope.hasCompleted = true;
                        });
                    },
                    function (data) {
                        $el.button('reset');
                    });

                e.preventDefault();
            }
        };

        //onDone delete
        $scope.onDoneDelete = function (e) {
            $('#modal-confirmDelete').modal('hide');
            e.preventDefault();
        };


        //onSortBy 
        $scope.onSortBy = function (e, sortType) {

            $scope.sortType = sortType;
            var params = generatePageParams();
            $scope.api.doGetPages(params,
                function (data) {
                $scope.$apply(function () {
                    
                    $scope.pages = $scope.paging.generatePagesFromPaging($scope.model.paging, 1, 1);
                });
            });

            e.preventDefault();
        }

        $('#modal-confirmDelete').on('hidden', function () {
            if ($scope.hasCompleted === true) {
                $scope.$apply(function () {
                    $scope.hasCompleted = false;
                });
            }
        });

        function generatePageParams(params) {

            var params = params || {};
            params.contact_id = $scope.contactId;
            params.offset = params.offset || $scope.model.paging.currentStartingRecordNumber;
            params.limit = $scope.model.paging.currentPageSize;
            params.sort = $scope.sortType;

            return params;

        }

    }
    return {
        link: link,
        scope: {
            model: '=rnModel',
            api: '=rnApi'
        }
    }

});

//Recruitment Dashboard Controller
app.controller("campaignCtrl", function ($scope) {
    //campaign object
    $scope.model = __initialData;
    $scope.api = {};

    //create an api methood doDeleteSchool 
    $scope.api.doDeleteSchool = function (school_id, onComplete, onFail) {
        var params = {
            school_id: school_id
        }
        //ajax call
        rnutil.fetch('post', '/campaignSchool/deleteSchoolByID', params)
            .done(function (data) {
                // oncomplete(data);
            })
            .fail(function (data) {
                // onfail(data);
                setTimeout(function () {
                    //model change
                    $scope.$apply(function () {
                        for (var i = 0; i < $scope.model.school.list.length; i++) {
                            if ($scope.model.school.list[i].id == school_id) {
                                $scope.model.school.list.splice(i, 1)
                                break;
                            }
                        }
                    })
                    onComplete(data)
                }, 2000);
            });
    }

    //create an api method doGetPages
    $scope.api.doGetPages = function (params, onComplete) {
        params.contact_id = $scope.contactId;
        rnutil.fetch('post', '/Contacts/ContactFileSearch', params)
            .done(function (data) {
                $scope.$apply(function (data) {
                    $scope.model = data;
                })
                onComplete(data);
            });

    }
});


//Select Demographic Directive
app.directive("demographicPreference", function () {
    var link = function ($scope, $ele, attrs, ctrl) {

    }
    return {
        link: link,
        scope: {
            model: '=rnModel',
            api: '=rnApi'
        }
    }
});

//Select Demographic Controller
app.controller("demographicPreferenceCtrl", function ($scope) {
    //demographic object
    $scope.model = __initialData;
    $scope.api = {};

});

//School Selection Directive
app.directive("selection", function () {
    console.log("Inside directive");
    var link = function ($scope, $ele, attrs, ctrl) {
     
        $scope.onAddSchool = function (e, school) {
            
            $scope.api.doAddSchool(school,
                function (data) {
                    //success
                },
                function (data) {
                    //fail
                })
        }
    }
    return {
        link: link,
        scope: {
            model: '=rnModel',
            api: '=rnApi',
            embed: '=rnEmbed'
        }
    }

});

//School Selection Controller
app.controller("schoolSelectionCtrl", function ($scope) {
    $scope.model = __initialData;
    $scope.embed = __embedData;
    $scope.api = {};

    //create api method
    $scope.api.doAddSchool = function (school, onComplete, onFail) {
        
        var params = {
            school: school
        }
        rnutil.fetch('post', '/campaignSchool/addSchoolByID', params)
        .done(function (data) {
            //onComplete(data)
        })
        .fail(function (data) {
            setTimeout(function () {
                
                $scope.$apply(function () {
                    for (var i = 0; i < $scope.embed.school.length; i++) {
                        
                        console.log($scope.embed.school.length);
                    }
                })
            }, 2000)
        })
    }
});

//Configure Email Directive
app.directive("configureEmails", function () {
    var link = function ($scope, $ele, attrs, ctrl) {

    }
    return {
        link: link,
        scope: {
            model: '=rnModel',
            api: '=rnApi'
        }
    }

});

//Configure Email Controller
app.controller("configureEmailsCtrl", function ($scope) {
    $scope.model = __initialData;
    $scope.api = {};
});

//Job posting Directive
app.directive("jobPosting", function () {
    var link = function ($scope, $ele, attrs, ctrl) {
    }
    return {
        link: link,
        scope: {
            model: '=rnModel'
        }
    }
})

//Job posting Controller
app.controller("jobPostingCtrl", function ($scope) {
    $scope.model = __initialData;
})


//Hiring - Applied Directive 
app.directive("hiringChart", function () {
    var link = function ($scope, $ele, attrs, ctrl) {
    }
    return {
        link: link,
        scope: {
            model: '=rnModel',
            api : '=rnApi'
        }
    }
})

//Hiring - Applied Controller
app.controller("hiringChartCtrl", function ($scope) {
    $scope.model = __initialData;
    $scope.api = {};
})