(function() {
  'use strict'

  angular.module('app')
    .component('selected', {
      templateUrl: '/app/public/js/selected/selected.template.html',
      controller: controller
    })
  controller.$inject = ['$scope', 'postService']
  function controller($scope, postService) {
    const vm = this

    vm.$onInit = onInit

    $scope.$watch(function() {
      return postService.dni
    }, function() {
      vm.dni = postService.dni;
      vm.ghi = postService.ghi;
      vm.lat_tilt = postService.lat_tilt;
      vm.city = postService.city;
      vm.state = postService.state;
      vm.status = postService.status;
      vm.show = postService.show;
    })

    $scope.$watch(function() {
      return postService.monthlyData
    }, function() {
      vm.cost = postService.cost;
      vm.costStr = postService.costStr;
      vm.showPower = postService.showPower;
      vm.monthlyData = postService.monthlyData;
    })

    function onInit() {
      vm.show = 0;
      vm.showPower = 0;
    }

    vm.convert = function() {
      vm.electric = vm.bill.value / vm.cost
      var power = vm.electric;
      vm.electric = power.toFixed(1);
      vm.showPower = 1;
    }
  }

}());
