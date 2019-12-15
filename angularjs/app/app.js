//
// module definition
//
var myNinjaApp = angular.module(
    'myNinjaApp',   // module name
    [               // dependencies
        'ngRoute',  // routing
        'ngAnimate' // animation of elements and views
    ]               
);

//
// configuration
//
myNinjaApp.config([                                     // pass dependencies as an array to protect from minification process
    '$routeProvider',                                   // route dependency
    '$locationProvider',                                // prettify Urls
    function($routeProvider, $locationProvider){           
        $locationProvider.html5Mode(true);              // 
        
        $routeProvider          
            // home route
            .when('/home',                              // route
            {       
                templateUrl: 'views/home.html',         // view
                controller: 'NinjaController'           // controller (see bellow)
            })

            // directory route
            .when('/directory', 
            {
                templateUrl: 'views/directory.html',    // route
                controller: 'NinjaController'           // controller (see bellow)
            })
            
            // contact route
            .when('/contact', 
            {
                templateUrl: 'views/contact.html',      // route
                controller: 'contactController'
            })

            // contact route
            .when('/contact-success', 
            {
                templateUrl: 'views/contact-success.html',      // route
                controller: 'contactController'
            })

            .when('/404',
            {
                templateUrl: 'views/404.html'      // route
            })

            // not existing routes redirects to...
            .otherwise({
                redirectTo: '/home'                     // redirects to route
                // templateUrl: 'basics.html'           // hard coded view
            });
    }
]);

//
// running
//
myNinjaApp.run(function(){
    console.log('running app...');
});

// 
// controllers
// 

// myNinjaApp.controller('NinjaController', function($scope){
//     $scope.message = 'hello world!';
//     $scope.people = ['John Doe', 'Jane Doe', 'Michael Doe', 'Harry Doe'];
// });

// same as above protecting '$scope' and any other dependencies variables when minifying 
myNinjaApp.controller(
    'NinjaController',      // controller name
    [                       // dependencies
        '$scope',           // scope
        '$http',            // http service to handles communication with app/data and http server
        function($scope, $http){
            $scope.message = 'hello world!';
            $scope.people = ['John Doe', 'Jane Doe', 'Michael Doe', 'Harry Doe'];

            // vehicles data
            // will be passed as a JSon object
            // $scope.vehicles = [
            //     {
            //         type: 'Car',
            //         wheels: 4,
            //         price: 350000,
            //         available: true,
            //         color: 'blue',
            //         thumb: './content/img/car-ico.png'
            //     },
            //     {
            //         type: 'Motorcycle',
            //         wheels: 2,
            //         price: 250000,
            //         available: false,
            //         color: 'red',
            //         thumb: './content/img/motorcycle-ico.png'
            //     },
            //     {
            //         type: 'boat',
            //         wheels: 0,
            //         price: 1500000,
            //         available: false,
            //         color: 'yellow',
            //         thumb: './content/img/boat-ico.png'
            //     },
            //     {
            //         type: 'bicycle',
            //         wheels: 2,
            //         price: 420,
            //         available: true,
            //         color: 'purple',
            //         thumb: './content/img/bicycle-ico.png'
            //     }
            // ];
            // console.log($scope.vehicles);

            // converting to JSon format via Angular method
            // console.log(angular.toJson($scope.vehicles));
            // then using https://jsonlint.com/ to format the code

            // retrieving data 
            $http.get('data/vehicles.json').then(function success(result){
                $scope.vehicles = result.data;
                console.log($scope.vehicles);
            }, function error(err) {
                console.log('Error retrieving data', err);
            });
            
            // remove vehicle
            $scope.removeVehicle = function(vehicle) {
                var removedVehicle = $scope.vehicles.indexOf(vehicle);
                console.log('removedVehicle = ' +  removedVehicle);

                // modifying the array data
                $scope.vehicles.splice(removedVehicle, 1);
            };

            // remove all vehicles
            $scope.removeAll = function($event) {
                console.log($event);
                $event.preventDefault();
                $scope.vehicles = [];
            };

            // add vehicle
            $scope.addVehicle = function(newVehicle){
                // value can be also passed through the $scope
                // ex. $scope.newVehicle
                console.log('newVehicle = ', newVehicle);

                $scope.vehicles.push({
                    type: newVehicle.type,
                    wheels: newVehicle.wheels,
                    price: parseInt(newVehicle.price),  // parsing string number
                    available: true,
                    color: newVehicle.color
                });

                // clearing values, thus clearing input variables (view)
                newVehicle.type = '';
                newVehicle.wheels = '';
                newVehicle.price = '';
                newVehicle.color = '';
            };

        }
    ]
);

myNinjaApp.controller(
    'contactController',        // controller name
    [                           // dependencies
        '$scope',               // scope
        '$location',            // location service
        
        // changing Url location after submitting form
        function($scope, $location) {
            $scope.sendMessage = function() {
                $location.path('contact-success');
            };
        }
    ]
);

// custom directive
myNinjaApp.directive(
    'randomVehicle',                // directive name (-> 'random-vehicle' tag name)
    [function() {
        return {
            restrict: 'E',          // Restrict to be use as an Element (A -> Attribute)
            scope: {                // directive (isolated) scope, available attributes 
                vehicles: '=',
                title: '=',
                amount: '='
            },
            // template used by the custom directive, uses 'random' property defined by controller (see below)
            // template: '<img src="{{vehicles[random].thumb}}" style="margin-top: -1rem; right: 1rem; top: 50%; height: 2rem; position: absolute;">',
            // same as above but using a view
            templateUrl: 'views/random.html',
            transclude: true,       // allows to show nested content within the directive tag, needs ng-transclude direcvive
            replace: true,          // uses outermost template tag instead of directive tag (ex. random-vehicle)
            controller: function($scope){
                console.log($scope.amount);
                $scope.random = Math.floor(Math.random() * 4);
            }
        };
    }]
);