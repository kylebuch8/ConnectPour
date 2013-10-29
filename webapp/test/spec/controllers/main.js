'use strict';

describe('Controller: MainCtrl', function () {

    beforeEach(function() {
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    // load the controller's module
    beforeEach(module('ConnectPourApp'));

    var MainCtrl, scope, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/feed.json').
            respond([{username: 'Kyle Buchanan', beer: {name: 'Punkin Ale'}}, {username: 'Bret Jutras', beer: {name: 'Sierra Nevada Pale Ale'}}]);

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should create "entries" model with 2 entries fetched from xhr', function() {
        expect(scope.entries).toEqual([]);
        $httpBackend.flush();

        expect(scope.entries).toEqualData([{username: 'Kyle Buchanan', beer: {name: 'Punkin Ale'}}, {username: 'Bret Jutras', beer: {name: 'Sierra Nevada Pale Ale'}}]);
        expect(scope.entries.length).toEqual(2);
    });
});
