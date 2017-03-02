(function() {
  'use strict'

  angular.module('app')
    .component('tsp', {
      templateUrl: '/app/public/js/app/app.template.html',
      controller: controller
    })

  function controller() {
    const vm = this

    vm.$onInit = onInit



    function onInit() {
      vm.length = 1;
    }

    vm.lengthInput = function() {
      console.log(vm.search);
    }


  }

}());
