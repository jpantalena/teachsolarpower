(function() {
  'use strict'

  angular.module('app')
    .component('bottom', {
      templateUrl: '/app/public/js/footer/footer.template.html',
      controller: controller
    })

  function controller() {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
    }
  }

}());
