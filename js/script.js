
/************* MUSTACHE pêtla *****************/
var listItems = '';
var templateItem = document.getElementById('template-product-item').innerHTML;

for(var i = 0; i < carouselData.length; i++){
		listItems += Mustache.render(templateItem, carouselData[i]);
    
	};

results.insertAdjacentHTML('beforeend', listItems);

/************ CAROUSEL **********/
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true

});

/***************** MAPA **********************/

window.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: carouselData[0].coords
  });
  

  function createfunc(i) {
    return function() { flkty.select(i); };
};


 var marker =[];
  for(var i = 0; i < carouselData.length; i++) {
    marker[i] = new google.maps.Marker({
      position: carouselData[i].coords,
      map: map     
    });
    marker[i].addListener('click', createfunc(i));
  }


  flkty.on('change', function(index) {
          smoothPanAndZoom(map, 8, carouselData[index].coords);
  });

};

/************** FUNKCJA SMOOTH ****************/
  var smoothPanAndZoom = function(map, zoom, coords){
    
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom -1);
    jumpZoom = Math.max(jumpZoom, 3);
 
    smoothZoom(map, jumpZoom, function(){

      smoothPan(map, coords, function(){
        smoothZoom(map, zoom); 
      });
    });
  };
  
  var smoothZoom = function(map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);
    
    if(!steps) {
      if(callback) {
        callback();
      }
      return;
    }

    var stepChange = - (startingZoom - zoom) / steps;

    var i = 0;
    var timer = window.setInterval(function(){
      if(++i >= steps) {
        window.clearInterval(timer);
        if(callback) {
          callback();
        }
      }
      map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
  };

  var smoothPan = function(map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

    var i = 0;
    var timer = window.setInterval(function(){
      if(++i >= steps) {
        window.clearInterval(timer);
        if(callback) callback();
      }
      map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
    }, 1000/30);
  }; 