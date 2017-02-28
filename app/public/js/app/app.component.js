(function() {
  'use strict'

  angular.module('app')
    .component('main', {
      templateUrl: '/app/public/js/app/app.template.html',
      controller: controller
    })

  // controller.$inject = ['$http']

  function controller($http) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
      vm.addingPost = false
    }
  }

}());
