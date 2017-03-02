(function() {
  'use strict'

  angular.module('app')
    .component('tsp', {
      templateUrl: '/app/public/js/app/app.template.html',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit



    function onInit() {
      vm.length = 1;
      vm.dni = 0;
      vm.ghi = 0;
      vm.latTilt = 0;
    }

    vm.search = function(){
      var q = vm.query;
      console.log('Query:' + q.search)
      var location = q.search;
      var comma = location.indexOf(',');
      var city = location.slice(0, comma);
      var state = location.slice(comma + 2, location.length);
      coordinates(city, state);
    }

     var coordinates = function(city, state) {
      $http({
        method: 'GET',
        url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBecXcSD1TtOEr_uAXkjPsiqG8dRTsMsA0&address="+city+"+"+state
      }).then(function(response) {
        console.log("SUCCESS");
        console.log(response);
        var lat_cor = response.data.results[0].geometry.location.lat;
        var lng_cor = response.data.results[0].geometry.location.lng;
        solarData(lat_cor, lng_cor)
      }, function(response) {
        console.log("ERROR");
        console.log(response);
      });
    }

    var solarData = function(lat, lng) {
      $http({
        method: 'GET',
        url: "https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat+"&lon="+lng
      }).then(function(response) {
        console.log("SUCCESS");
        console.log(response);
        vm.dni = 1;
      }, function(response) {
        console.log("ERROR");
        console.log(response);
      })
    }
    // function getSolarData() {
    //   var lat_string = $(".lat").html();
    //   var lat_result = lat_string.substring(10, lat_string.length);
    //   var long_string = $(".long").html();
    //   var long_result = long_string.substring(11, long_string.length);
    //   $.get("https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat_result+"&lon="+long_result, function(data) {
    //     var outputs = data.outputs;
    //
    //     // get dni data
    //     var dni = outputs.avg_dni.annual;
    //     // append dni data
    //     $(".solar_data_2").append("<li class='dni collection-item'>Average annual dni: "+dni+"</li>");
    //
    //     // get ghi data
    //     var ghi = outputs.avg_ghi.annual;
    //     // append ghi data
    //     $(".solar_data_2").append("<li class='ghi collection-item'>Average annual ghi: "+ghi+"</li>");
    //
    //     // get lat tilt data
    //     var lat_tilt = outputs.avg_lat_tilt.annual;
    //     // append lat tilt data
    //     $(".solar_data_2").append("<li class='lat_tilt collection-item'>Average annual lat-tilt: "+lat_tilt+"</li>");
    //
    //     solar_status(dni, ghi, lat_tilt);
    //
    //   });
    // }
    //
    //
    // function solar_status(one, two, three) {
    //   var avg = (one+two+three) / 3;
    //   var output = $(".potential_status");
    //   if (avg < 3.9) {
    //     output.text("Poor");
    //     output.attr("style", "color: red");
    //   } else if (avg > 4.5){
    //     output.text("Favorable");
    //     output.attr("style", "color: green");
    //   } else {
    //     output.text("Average");
    //
    //   }
    // }
    //
    // function utility_rates(lat, long) {
    //   $.get("https://developer.nrel.gov/api/utility_rates/v3.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&lat="+lat+"&lon="+long, function(data) {
    //     var cost = data.outputs.residential;
    //     var cost_str = cost.toString();
    //     var cost_result = "$ " + cost_str + " / kWh";
    //     $(".utility_cost").text(cost_result);
    //     // call solar prod func
    //     getSolarProd(lat, long, cost);
    //
    //   });
    // }
    //
    // function getSolarProd(lat, long, cost) {
    //   var arr = $(".ac_prod");
    //   $.get("https://developer.nrel.gov/api/pvwatts/v5.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&format=json&lat="+lat+"&lon="+long+"&system_capacity=5&module_type=1&losses=8&array_type=1&tilt=40&azimuth=180", function(data) {
    //     for (var i = 0; i < arr.length; i++) {
    //       var ac_data = Math.round(data.outputs.ac_monthly[i]);
    //       var current_item = arr[i];
    //       arr[i].innerHTML = ac_data;
    //       var value = cost * ac_data;
    //       value = value.toFixed(2);
    //       var next = $(current_item).next();
    //       $(next).text(value);
    //     }
    //     electric_bill(cost);
    //   });
    //   $(".solar-prod-data").attr("style", "display: block");
    // }
    //
    // function electric_bill(rate) {
    //   display_data(rate);
    //   $("#bill").on("input", function() {
    //     display_data(rate);
    //
    //   });
    // }
    //
    // function display_data(rate) {
    //   var money = $("#test5").val();
    //   var money_str = money.toString();
    //   var money_result = "$ " + money_str;
    //   $(".bill_value").text(money_result);
    //   var power = (money/rate).toFixed(1);
    //   var power_str = power.toString();
    //   var power_result = power_str + " kWh";
    //   $(".power_results").text(power_result);
    //   var rows = $(".ac_row");
    //   for (var k = 0; k < rows.length; k++) {
    //     var cur = rows[k];
    //     var arr = cur.children;
    //     var watts = arr[1];
    //     var watt_solar = $(watts).text();
    //     if ( Number(watt_solar) > Number(power)) {
    //       $(cur).attr("style", "background-color: lightgreen");
    //     } else {
    //       $(cur).attr("style", "background-color: white");
    //     }
    //   }
    // }
    //
    // function energy_incentives(lat, long) {
    //   $.get("https://developer.nrel.gov/api/energy_incentives/v2/dsire.json?api_key=ZJH76qOhbyarfoAWyLVAtsKgRcGm5bdna1qd7gjz&lat="+lat+"&lon="+long+"&category=solar_technologies&technology=solar_photovoltaics", function(data) {
    //     var master_result_obj = {};
    //     for (var i = 0; i < data.result.length; i++) {
    //       var item = data.result[i];
    //       var cat = item.category_name;
    //       var name = item.program_name;
    //       var sum = item.summary;
    //       if (!master_result_obj.hasOwnProperty(cat)) {
    //         master_result_obj[cat] = [{[name]: sum}];
    //       } else {
    //         master_result_obj[cat].push({[name]: sum});
    //       }
    //     }
    //
    //     var fin_incents = master_result_obj["Financial Incentive"];
    //     $(".solar_data_3").html("");
    //     for (var j = 0; j < fin_incents.length; j++) {
    //       cur_obj = fin_incents[j];
    //       var keys_arr = Object.keys(cur_obj);
    //       var cur_key = keys_arr[0];
    //       var cur_val = cur_obj[cur_key];
    //       var fin_data = $("<li><div class='collapsible-header'>"+cur_key+"</div><div class='collapsible-body'><div class='container'>"+cur_val+"</div></div></li>");
    //       $(".solar_data_3").append(fin_data);
    //     }
    //   });
    // }




  }

}());
