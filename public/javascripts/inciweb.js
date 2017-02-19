/**
 * Created by you on 2/6/17.
 */
var app = angular.module('Inciweb', ['ngResource', 'ngRoute']);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-incident', {
            templateUrl: 'partials/incident-form.html',
            controller: 'AddIncidentCtrl'
        })
        .when('/incident/:id', {
            templateUrl: 'partials/incident-form.html',
            controller: 'EditIncidentCtrl'
        })
        .when('/incident/delete/:id', {
            templateUrl: 'partials/incident-delete.html',
            controller: 'DeleteIncidentCtrl'
        })
        .when('/search/*', {
            templateUrl: 'partials/home.html',
            controller: 'SearchIncidentsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


/*
 Getting the data for the various views by handling events
 */
// GET HOME
app.controller('HomeCtrl', ['$scope', '$resource',
    function ($scope, $resource) {
        var Incidents = $resource('/api/incidents');
        Incidents.query(function (incidents) {
            $scope.incidents = incidents;
        });
    }]);

// CREATE
app.controller('AddIncidentCtrl', ['$scope', '$resource', '$location',
    function ($scope, $resource, $location) {
        $scope.save = function () {
            var Incidents = $resource('/api/incidents');
            Incidents.save($scope.incident, function () {
                $location.path('/');
            });
        };
    }]);

// UPDATE
app.controller('EditIncidentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Incidents = $resource('/api/incidents/:id', {id: '@_id'}, {
            update: {method: 'PUT'}
        });

        Incidents.get({id: $routeParams.id}, function (incident) {
            $scope.incident = incident;
        });

        $scope.save = function () {
            Incidents.update($scope.incident, function () {
                $location.path('/');
            });
        };
    }]);

// SEARCH
app.controller('SearchIncidentsCtrl', ['$scope', '$location', '$resource',
    function ($scope, $location, $resource) {
        $scope.submit = function () {
            if ($scope.text) {
                var Incidents = $resource('/api/incidents/search/:q', {q: text.value},
                    {
                        'query': {
                            method: 'GET', isArray: true
                        }
                    });

                Incidents.query(function (incidents) {
                    $scope.incidents = incidents;
                });
            }
        };

        $scope.refresh = function () {
            var Incidents = $resource('/api/incidents');
            Incidents.query(function (incidents) {
                $scope.incidents = incidents;
            });
        };
    }]);

// DELETE
app.controller('DeleteIncidentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Incidents = $resource('/api/incidents/:id');

        Incidents.get({id: $routeParams.id}, function (incident) {
            $scope.incident = incident;
        });
        $scope.delete = function () {
            Incidents.delete({id: $routeParams.id}, function (incident) {
                $location.path('/');
            });
        }
    }]);



app.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 50) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
        });
    };
});

