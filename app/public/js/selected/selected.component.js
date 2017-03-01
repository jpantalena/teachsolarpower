(function() {
  'use strict'

  angular.module('app')
    .component('selected', {
      templateUrl: '/app/public/js/selected/selected.template.html',
      controller: controller
    })

  function controller() {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
    }
  }

}());
