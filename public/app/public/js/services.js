(function() {
  'use strict'

  angular.module('app')
    .service('postService', service)

  service.$inject = ['$http']
  function service($http) {
    var self = this;
    self.showDni = showDni;
    self.dni = 0;
    self.ghi = 0;
    self.lat_tilt = 0;

    self.lat = 0;
    self.lng = 0;

    self.avg = 0;
    self.status = "Error Try Again";

    self.show = 0;

    self.cost = 200;



    function showDni() {
      return this.dni;
    }

    this.coordinates = function(city, state) {
      self.city = city;
      self.state =state;
     $http({
       method: 'GET',
       url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state
     }).then(function(response) {
       self.lat = response.data.results[0].geometry.location.lat;
       self.lng = response.data.results[0].geometry.location.lng;
       self.solarData(self.lat, self.lng)
     }, function(response) {
     });
   }

   this.solarData = function(lat, lng) {
     $http({
       method: 'GET',
       url: "https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat+"&lon="+lng
     }).then(function(response) {
       self.dni = response.data.outputs.avg_dni.annual;
       self.ghi = response.data.outputs.avg_ghi.annual;
       self.lat_tilt = response.data.outputs.avg_lat_tilt.annual;
       self.solar_status(self.dni, self.ghi, self.lat_tilt)
     }, function(response) {
     })
   }

    this.solar_status = function(one, two, three) {
      self.avg = (one+two+three) / 3;

      if (self.avg < 3.9) {
        self.status = "Poor"
      } else if (self.avg > 4.5){
        self.status = "Favorable";
      } else {
        self.status = "Average";
      }
      self.show = 1;
      self.utility_rates(self.lat, self.lng)
    }

    this.utility_rates = function(lat, long) {
      $http({
        method: 'GET',
        url: "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&lat="+lat+"&lon="+long,
      }).then(function(response) {
        var cost = response.data.outputs.residential;
        self.cost = cost;
        var cost_str = cost.toString();
        var cost_result = "$ " + cost_str + " / kWh";
        self.costStr = cost_result;
        self.showPower = 0;
        self.getSolarProd(self.lat, self.lng, self.cost)
      }, function(response) {
      })
    }

    //GET MONTHLY SOLAR POWER PRODUCTION VALUES
    this.getSolarProd = function(lat, long, cost) {
      var arr = $(".ac_prod");
      $http({
        method: 'GET',
        url: "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat+"&lon="+long+"&system_capacity=5&module_type=1&losses=8&array_type=1&tilt=40&azimuth=180",
      }).then(function(response) {
        self.monthlyData = response.data.outputs.ac_monthly;

      }, function(response) {
      })
    }

  }


}());
