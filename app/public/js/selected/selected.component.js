(function() {
  'use strict'

  angular.module('app')
    .component('selected', {
      templateUrl: '/app/public/js/selected/selected.template.html',
      controller: controller
    })
  controller.$inject = ['postService']
  function controller(postService) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
      console.log("Selected component active")
      console.log(postService.dni())
    }

  }

}());
