(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var vm = this;

  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "crackers", quantity: 25 },
    { name: "marshmallows", quantity: 100 }
  ];
  var itemsBought = [];

  vm.getItemsToBuy = function() {
    return itemsToBuy;
  };

  vm.getItemsBought = function() {
    return itemsBought;
  };

  vm.buy = function(index) {
    itemsBought.push(itemsToBuy[index]);
    itemsToBuy.splice(index, 1);
  };
}


ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var vm = this;

  vm.items = ShoppingListCheckOffService.getItemsToBuy();

  vm.buy = ShoppingListCheckOffService.buy;
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var vm = this;

  vm.items = ShoppingListCheckOffService.getItemsBought();
}

})();
