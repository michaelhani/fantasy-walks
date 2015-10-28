var centreLat=0.0;
var centreLon=0.0;
var initialZoom=3;
var imageWraps=false; //SET THIS TO false TO PREVENT THE IMAGE WRAPPING AROUND
var map; //the GMap3 itself
var poly; //map path object
var places=[];
var path;
var gmicMapType;
function GMICMapType() {
    this.Cache = Array();
    this.opacity = 1.0;
}
GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
GMICMapType.prototype.maxZoom = 19;
GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var c = Math.pow(2, zoom);
    var c = Math.pow(2, zoom);
    var tilex=coord.x,tiley=coord.y;
    if (imageWraps) {
        if (tilex<0) tilex=c+tilex%c;
        if (tilex>=c) tilex=tilex%c;
        if (tiley<0) tiley=c+tiley%c;
        if (tiley>=c) tiley=tiley%c;
    } else {
        if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
        {
            var blank = ownerDocument.createElement('DIV');
            blank.style.width = this.tileSize.width + 'px';
            blank.style.height = this.tileSize.height + 'px';
            return blank;
        }
    }
var img = ownerDocument.createElement('IMG');
    var d = tilex;
    var e = tiley;
    var f = "t";
    for (var g = 0; g < zoom; g++) {
        c /= 2;
        if (e < c) {
            if (d < c) { f += "q" }
            else { f += "r"; d -= c }
        }
        else {
            if (d < c) { f += "t"; e -= c }
            else { f += "s"; d -= c; e -= c }
        }
    }
    img.id = "t_" + f;
    img.style.width = this.tileSize.width + 'px';
    img.style.height = this.tileSize.height + 'px';
    img.src = "middleEarthMap-tiles/"+f+".jpg";
    this.Cache.push(img);
    return img;
}
GMICMapType.prototype.realeaseTile = function(tile) {
    var idx = this.Cache.indexOf(tile);
    if(idx!=-1) this.Cache.splice(idx, 1);
    tile=null;
}
GMICMapType.prototype.name = "Image Cutter";
GMICMapType.prototype.alt = "Image Cutter Tiles";
GMICMapType.prototype.setOpacity = function(newOpacity) {
    this.opacity = newOpacity;
    for (var i = 0; i < this.Cache.length; i++) {
        this.Cache[i].style.opacity = newOpacity; //mozilla
        this.Cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
    }
}
function getWindowHeight() {
    if (window.self&&self.innerHeight) {
        return self.innerHeight;
    }
    if (document.documentElement&&document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    return 0;
}
function resizeMapDiv() {
    //Resize the height of the div containing the map.
    //Do not call any map methods here as the resize is called before the map is created.
    var d=document.getElementById("map");
    var offsetTop=0;
    for (var elem=d; elem!=null; elem=elem.offsetParent) {
        offsetTop+=elem.offsetTop;
    }
    var height=getWindowHeight()-offsetTop-16;
    if (height>=0) {
        d.style.height=height+"px";
    }
}

function load() {
    resizeMapDiv();
    var latlng = new google.maps.LatLng(centreLat, centreLon);
    var myOptions = {
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 5,
        center: latlng,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: true,
        mapTypeControlOptions: { mapTypeIds: ["ImageCutter"] },
    mapTypeId: "ImageCutter"
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    gmicMapType = new GMICMapType();
    map.mapTypes.set("ImageCutter",gmicMapType);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
///////////////////BEGIN SHIRE INFO///////////////
// this  can be used as a template to define any other location markers
 var Shire = new google.maps.Marker({ //define marker for the shire
     position: new google.maps.LatLng(40.17887331434696, -48.251953125),
     map:null,
     animation: google.maps.Animation.DROP,
     title: "The Shire"
 });
 places.push(Shire);
 var shireinfo = new google.maps.InfoWindow({ //defines content for the shire infowindow
     content:"The Shire"
 })
 Shire.addListener("click", function(){ //opens info window when you click on the shire's marker
    shireinfo.open(map,Shire);
 })
/////////////////////END SHIRE INFO///////////////
/////////////////////WEATHERTOP INFO///////////////
 var Weathertop = new google.maps.Marker({ //define marker for the Weathertop
     position: new google.maps.LatLng(43.8028187190472, -16.4794921875),
     map:null,
     animation: google.maps.Animation.DROP,
     title: "Weathertop"
 });
 var Weathertopinfo = new google.maps.InfoWindow({ //defines content for the Weathertop infowindow
     content:"Weathertop"
 })
 Weathertop.addListener("click", function(){ //opens info window when you click on the Weathertop's marker
    Weathertopinfo.open(map,Weathertop);
 })
 places.push(Weathertop);
// //////////////////////////////////////////////////

var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
};
poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 0,
    icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
    }],
});
poly.setMap(map);
path = poly.getPath();
// path.push(Shire.position);
// path.push(Weathertop.position);
   // animateCircle(poly);


  // Add a listener for the click event
  // map.addListener('click', addLatLng);
}
///////////////////END MAP LOADING FUNCTION////////////////////

function dropPins(){
    // for (var i = 0; i < places.length; i++) {
        places[0].setMap(map);
        path.push(places[0].position);
    // };
}
function dropPin2(){
    // for (var i = 0; i < places.length; i++) {
        places[1].setMap(map);
        path.push(places[1].position);
    // };
}
function hidePins(){
    for (var i = 0; i < places.length; i++) {
        places[i].setMap(null)
    };
}

function animateCircle(poly) { //initiates the function that animates the map path
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = poly.get('icons');
      icons[0].offset = (count / 1) + '%';
      poly.set('icons', icons);
  }, 20);
}


// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + event.latLng,
    map: map
  });
  var infowindow = new google.maps.InfoWindow;
  infowindow.setContent(event.latLng.toString());
  infowindow.open(map, marker);
}


//]]>