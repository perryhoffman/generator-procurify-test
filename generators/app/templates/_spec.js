'use strict';

describe('<%= angularmodule %> Unit Test', function () {
    var $scope,
        <% if(routing){ %>$state,<% } %>
        $controller,
        $httpBackend,
        $rootScope,
        $location,
        $templateCache,
        $injector,
        <% if(modal){ %>$modal<% } %>,
        notification,
        createController;

    beforeEach(module('<%= angularmodule %>'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _$templateCache_, _$location_, _$injector_, <% if(modal){ %>_$uibModal_<% } %>, _notification_<% if(routing){ %>, _$state_<% } %>) {

        // The injector unwraps the underscores (_) from around the parameter names when matching
        <% if(routing){ %>$state         = _$state_;<% } %>
        $controller    = _$controller_;
        $templateCache = _$templateCache_;
        $httpBackend   = _$httpBackend_;
        $rootScope     = _$rootScope_;
        $location      = _$location_;
        $injector      = _$injector_;
        <% if(modal){ %>$modal         = _$uibModal_;<% } %>
        notification   = _notification_;

        // Example mock http backend url
        // $httpBackend.when('GET', /.*?api\/v2\/user\/1\/?.*/g).respond({data: {}, success: true});

        $scope = $rootScope.$new();

        createController = function (ctrl, injects) {
            var default_injects = {
                '$scope': $scope,
                <% if(modal){ %>'$uibModal': $modal,<% } %>
                'notification': notification
            };
            return $controller(ctrl, angular.extend(default_injects, injects));
        };
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    <% if(routing){ %>
    describe('Routes', function() {

    });
    <% } %>

    describe('Controllers', function () {
        beforeEach(function() {
            createController('<%= controller %>');
        });

        describe('<%= controller %>', function () {
            describe('app.doSomething', function() {
                it('should do something', function() {

                    expect(true).toBe(true);
                });
            });

        });

    });

    <% if(services){ %>
    describe('Services', function () {

    });
    <% } %>
});
