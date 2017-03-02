(function() {
  'use strict'

  angular.module('app')
    .service('postService', service)

  // service.$inject = ['$http']
  function service() {
    this.dni = dni;

    function dni() {
      return 3;
    }
  }


}());
