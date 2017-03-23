(function() {
  'use strict'

  angular.module('app')
    .component('tsp', {
      templateUrl: '/app/public/js/app/app.template.html',
      controller: controller
    })

  controller.$inject = ['$http', 'postService']
  function controller($http, postService) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {
      vm.length = 1;
    }

    vm.search = function(){
      var q = vm.query;
      console.log('Query:' + q.search)
      var location = q.search;
      var comma = location.indexOf(',');
      var city = location.slice(0, comma);
      var state = location.slice(comma + 2, location.length);
      postService.coordinates(city, state);
    }
  }

}());
