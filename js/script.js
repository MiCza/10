'use strict';

var mainCarousel = document.querySelector('.main-carousel');
var slidesScript = document.getElementById('slideScript').innerHTML;
var conButtons = document.querySelector('.container-buttons');
var progressBar = document.querySelector('.progress-bar');
var previousWrappedButton = document.querySelector('.restart');
var dataSlidesLength = dataSlides.length;
var allSlides = '';

for (var i = 0; i < dataSlidesLength; i++) {
    allSlides += Mustache.render(slidesScript, dataSlides[i]);
}
mainCarousel.insertAdjacentHTML('afterbegin', allSlides);

var flkty = new Flickity(mainCarousel, {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
});

new Flickity(conButtons, {
    asNavFor: ".main-carousel",
    pageDots: false,
    contain: true,
    prevNextButtons: false
});

previousWrappedButton.addEventListener('click', function () {
    flkty.select(0);
});

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

(function(){ 
	// Zapiszemy sobei w zmiennej odwo�anie do elementu z id="infos", w kt�rym b�dziemy wy�wietla� komunikaty po klikni�ciu markera. 
	
	var infos = document.getElementById('infos');
	
	// Definiujemy funkcj� initMap tak samo jak wcze�niej. 
	
  	window.initMap = function() {
		// Zdefiniujemy par� dodatkowych wsp�rz�dnych dla dodatkowych marker�w. 
		var warsaw = {lat: 52.229, lng: 21.011};
		var berlin = {lat: 52.518, lng: 13.404};
		var prague = {lat: 50.075, lng: 14.435};
		var paris = {lat: 48.856, lng: 2.351};
		var amsterdam = {lat: 52.369, lng: 4.895};
		
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: warsaw
		});
		
		var markerOne = new google.maps.Marker({
			position: warsaw,
			map: map
		});
		
		// Po dodaniu markera mo�emy u�y� jego metody addListener:
		
		markerOne.addListener('click', function(){
			// Wewn�trz funcji wpisujemy kod, kt�ry ma si� wykona� po klikni�ciu markera. W tym przyk�adzie wy�wietlimy tekst na stronie. 
			infos.innerHTML = 'You clicked Warsaw';
		});		
		
		// Dodajemy jeszcze dwa markery, aby sprawdzi� czy na pewno klikni�cie ka�dego z nich wy�wietli inny tekst. 
		
		var markerTwo = new google.maps.Marker({
			position: berlin,
			map: map
		});

		markerTwo.addListener('click', function(){
			infos.innerHTML = 'You clicked Berlin';
		});		
		
		var markerThree = new google.maps.Marker({
			position: prague,
			map: map
		});
		
		markerThree.addListener('click', function(){
			infos.innerHTML = 'You clicked Prague';
		});	
		
		var markerFour = new google.maps.Marker({
			position: paris,
			map: map
		});
		
		markerFour.addListener('click', function(){
			infos.innerHTML = 'You clicked Paris';
		});	

		var markerFive = new google.maps.Marker({
			position: amsterdam,
			map: map
		});
		
		markerFive.addListener('click', function(){
			infos.innerHTML = 'You clicked Amsterdam';
		});	
	}; 
	
})();  