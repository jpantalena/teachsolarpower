(function() {
  'use strict'

  angular.module('app')
    .component('map', {
      templateUrl: '/app/public/js/map/map.template.html',
      controller: controller
    })

  function controller() {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
    }
  }

}());
