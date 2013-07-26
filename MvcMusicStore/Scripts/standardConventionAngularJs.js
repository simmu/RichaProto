app = angular.module("rn", []);

app.directive("campaign", function () {
    //this is not anonymous
    var link = function ($scope, $el, attrs, ctrl) {

        //events will have "on" prefix
        $scope.onAddScool = function (e, schoolId) {
            // UI logic
        }

        $scope.onConfirmAddScool = function (e, schoolId) {
            // UI logic
            // calling endpoint (api call) here
            $scope.api.doAddSchool($scopetobeadded,
                function (data) {
                    // on success
                    $scope.apply(function () {
                        //your logic
                    });
                },
                function (data) {
                    // on fail
                });
        }
        
    }
    return {
        link: link,
        scope: {
            model: "=rnModel", // is a two way data binding,
            api: "@rnApi" // is one way data binding
        }
    }
});

    //Recruitment Dashboard Controller
    app.controller("campaignCtrl", function ($scope) {
        // storing the __initialdata in model
        $scope.model = payload;

        $scope.api = {};

        // I create my api method here
        $scope.api.doAddSchool = function (id, onComplete, onfail) {
            var params = {
                id: id
            }
            //azax call
            rnutil.fetch("post", "url", params)
                .done(function(data) {
                    $scope.apply(function() {
                        //any manipulation on model
                    })
                    onComplete(data)
                })
                .fail(function(data) {
                    onfail(data)
                })
        }

    });


    //School Slection controller
    app.controller("schoolSelectionCtrl", function ($scope) {


    });
