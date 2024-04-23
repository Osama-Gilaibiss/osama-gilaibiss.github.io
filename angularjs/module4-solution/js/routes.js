(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/main-categories.template.html',
                controller: 'MainCategoriesController as mainCategories',
                resolve: {
                    categories: ['MenuDataService',
                        function (MenuDataService) {
                            return MenuDataService.getAllCategories();
                        }]

                }
            })
            .state('items', {
                url: '/categories/{categoryShortName}',
                templateUrl: 'templates/main-items.template.html',
                controller: 'MainItemsController as mainItems',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                        }]

                }
            })
    }

})();