'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
var $scope,
    $rootScope,
    controller;

beforeEach(function(){
  module('app');

  inject(function($injector){
    $rootScope = $injector.get('rootScope');
    $scope = $rootScope.$new();
    controller = $injector.get('$controller')("MainController", {$scope : $scope});
  });
});


describe("Main Tests", function(){
  it("should be obvious", function(){
    expect(1 + 1).toEqual(2);
  });
});



/*
describe('my app', function() {
  it('should automatically redirect to /main when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/main");
  });


  describe('main', function() {

    beforeEach(function() {
      browser.get('index.html#/main');
    });


    it('should render main when user navigates to /main', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
