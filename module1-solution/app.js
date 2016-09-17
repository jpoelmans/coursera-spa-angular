(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.message = "";

  $scope.messages = {
    empty: "Please enter data first",
    enjoy: "Enjoy!",
    to_much: "Too much!"
  }

  $scope.checkToMuchLunch = function () {
    switch (menuToMuch($scope.menu, true)) {
      case 0:
        $scope.message = $scope.messages.empty;
        break;
      case 1:
        $scope.message = $scope.messages.to_much;
        break;
      case -1:
        $scope.message = $scope.messages.enjoy;
        break;
    }
  };

  /**
  * @var string menu csv string
  * @var boolean discardEmptyDishes if true it discards empty dishes from the menu csv string
  * @return 0 for an empty menu
  * @return -1 for a menu with 3 or less dishes
  * @return 1 for a menu with more than 3 dishes
  **/
  var menuToMuch = function (menu, discardEmptyDishes) {
    var dishes = menu.split(',');

    if(discardEmptyDishes) {
      dishes = dishes.filter(function(dish) {return dish.length != 0})
    }

    if(dishes.length  == 0 || (dishes.length  == 1 && dishes[0].length == 0)) {
      return 0;
    }else if (dishes.length <= 3) {
      return -1;
    }else if(dishes.length > 3) {
      return 1
    }
  }
}

})();
