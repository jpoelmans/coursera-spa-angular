(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuItemsList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItems',
    bindToController: true
  }

  return ddo;
}

function FoundItemsDirectiveController() {

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var vm = this;

  vm.searchTerm = '';
  vm.found = null;

  vm.getMatchedMenuItems = function() {

    if (vm.searchTerm.length == 0) {
      vm.found = [];
    } else {
      MenuSearchService.getMatchedMenuItems(vm.searchTerm).then(function(foundItems) {
        vm.found = foundItems;
      });
    }

  }

  vm.removeMenuItem = function (itemIndex) {
    vm.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', '$filter'];
function MenuSearchService($http, $filter) {
  var vm = this;

  vm.getMatchedMenuItems = function(searchTerm) {
    return vm.getMenuItems().then(function(result) {

      var menuItems = result.data.menu_items;

      var foundItems = [];
      angular.forEach(menuItems, function(menuItem) {
        if( menuItem.description.indexOf(searchTerm) >= 0 ) foundItems.push(menuItem);
      });

      return foundItems;
    });
  }

  vm.getMenuItems = function() {
    return $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    });
  }
}



})();
