/* ---------------------------------------------------
     Setting up global variables to handle map
--------------------------------------------------------*/
      var map;                        // global Map canvas variable
      var geocoder;                   // global geocoder variable
      var markers = [];               // global vector to handle markers
      var infowindowsTxt = [];        // global variable to hold marker information and not to have to query multiple times
      var infowindowBox;              // global variable to show information for markers and it is being reused
      var contentString;              // global variable to handle contect to be use in infowindow marker
      var btimer;                     // global variable to handle timer for bouncing marker to ensure that bounce at list 2 seconds
      var nSecs = 1500;               // to bounce marker for 1.5 seconds
/* ---------------------------------------------------
     function to handle google map API errors
--------------------------------------------------------*/

function googleError() {

    alert("Error loading Google API ....");

   }

/*---------------------------------------------------------
      Function to initalize map function
      setting initial coordinates lat long
      zoom level and other mapping options
----------------------------------------------------------*/
function initMap() {
    var searchArea;
    var options = {
          center: {
            lat: 29.5,                  //center of map at the begining
            lng: -98.50
          },
          zoom: 14,                     // initial zoom for map at start
          mapTypeControl: true,         // allow user to pan in map
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,  // adding mapping tool bar
              position: google.maps.ControlPosition.TOP_CENTER
           },
            zoomControl: true,                                      // allowing user to change zoom level
            zoomControlOptions: {
               position: google.maps.ControlPosition.RIGHT_BOTTOM  // adding zoom tool
             },
            scaleControl: true,
            streetViewControl: true,                              // adding street view control and option
            streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
             },

          visible: true,
          disableDefaultUI : false,
          scrollwheel : true,
          draggable: true,
          maxZoom: 20,
          minZoom: 8,
          mapTypeId: 'terrain'
      };
    searchArea = {lat: options.center.lat, lng: options.center.lng };
    map = new google.maps.Map(document.getElementById('map'), options);
    geocoder = new google.maps.Geocoder();
    fsearchPoint(searchArea);
  }

/* ---------------------------------------------------
     Function to search new location in the map
      in radius 2km and looking from Reastaurants
--------------------------------------------------------*/
function fsearchPoint(sSearchArea) {
     var service = new google.maps.places.PlacesService(map);

       service.textSearch(
         {
           location: sSearchArea,
           radius: 2000,
           type: ['restaurant']
         }, callback);
    }
/* ---------------------------------------------------
     Function to get lat long for address in the array

--------------------------------------------------------*/
function geocodeAddress(address) {
      var address1 = address+',USA';

      geocoder.geocode(
       {'address': address1},
         function(results, status)
          {
           if (status === 'OK') {

            map.setCenter(results[0].geometry.location);
            fClearMarkersMapAll();
            vm.fCleanArray();
            fsearchPoint(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
       });
    }
/* ---------------------------------------------------
     Function to delete markers from map
--------------------------------------------------------*/
 function fClearMarkersMapAll() {
    var cMap,i;
      cMap = null;

      for (i = 0; i < markers.length; i++) {
          markers[i].setMap(cMap);
       }
        markers = [];
   }

/* ---------------------------------------------------
     Function to be used after google.maps.places.PlacesService(map) request
     from  function fsearchPoint
--------------------------------------------------------*/
  function callback(results, status) {
       var i;
       if (status === google.maps.places.PlacesServiceStatus.OK) {
           for (i = 0; i < results.length; i++) {
              vm.AddRes(results[i].name , results[i].formatted_address , results[i].geometry.location.lat() , results[i].geometry.location.lng());
              infowindowBox = new google.maps.InfoWindow();
              createMarker(results[i]);
            }
         }
       vm.vFilterArray(vm.ResArray());
     }

/* ---------------------------------------------------
     Function to start a timer when marker is selected
     and bouncing start
--------------------------------------------------------*/

  function bounceTimerStart(nSecs,indx) {
       btimer = setTimeout('endTimer(' + indx + ')',nSecs);
      }

/* ---------------------------------------------------
     Function to stop timer and stop bouncing after 1.5 sec
--------------------------------------------------------*/

  function endTimer(indx) {
        var i;
        clearTimeout(btimer);
        for (i = 0; i < markers.length; i++)
          if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
           }
      }

/* ---------------------------------------------------
     Function to stop all markers that are bouncing
     after selecting a new one
--------------------------------------------------------*/
function stopBouncingMarkers(indx){
        var i;
          for (i = 0; i < markers.length; i++)
          if (markers[i].getAnimation() !== null && i !== indx){
                markers[i].setAnimation(null);
           }
        }



/* ---------------------------------------------------
     Function to create markers base in lat and long
     and function to handle marker bounce, centering
     and windows info when marker is selected from the
     map not from the list of side navegation
--------------------------------------------------------*/
  function createMarker(place) {
       var indx;
       var marker = new google.maps.Marker(
          {
            map: map,
            position: place.geometry.location,
            icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });

        // using sYelp variable to control if ajax request is requiered to get more infro from YELP API

        marker.sYelp=0;
        marker.name=place.name;
        markers.push(marker);
        indx=markers.indexOf(marker);
        markers[indx].ind = indx;
        place.ind = indx;
        markers[indx].setAnimation(null);

        google.maps.event.addListener(marker, 'click', function() {   // function to handle the markers when click on marker in the map
        bounceTimerStart(nSecs,indx);                                 // start timer to control bouncing marker time
        map.setCenter(markers[indx].getPosition());                   // centering map when click marker

           if (markers[indx].getAnimation() === null) {
                stopBouncingMarkers(indx);                                  // stopping bouncing other markers
                markers[indx].setAnimation(google.maps.Animation.BOUNCE);   // star bouncing selected marker

              }

          if (markers[indx].sYelp === 1) {

              infowindowBox.close();                                     // closing previous info windows
              infowindowBox.setContent(markers[indx].sYelpContent);      //  setting infromation to be presented in info window
              infowindowBox.open(map,markers[indx]);                     // opeing new info window for marker selected
            } else {
              requestAjax(place);                                        // ask Yelp for information for marker selectes
            }
        });
    }
/* ---------------------------------------------------
     Function to add information in marker
--------------------------------------------------------*/
  function openWindowMarker(opts) {
     var i,data;

       for (i = 0; i < markers.length; i++) {
            if (markers[i].name == opts.name()) {

                data = {name: opts.name(), formatted_address: opts.addr(), ind: i};
                bounceTimerStart(nSecs,i);                                      // start timer to control bouncing marker time
                map.setCenter(markers[i].getPosition());                     // centering map when click marker
                if (markers[i].getAnimation() === null) {
                      stopBouncingMarkers(i);                                   // stopping bouncing other markers
                      markers[i].setAnimation(google.maps.Animation.BOUNCE);    // star bouncing selected marker
                    }
                if (markers[i].sYelp === 1) {
                     infowindowBox.close();                                      // closing previous info windows
                     infowindowBox.setContent(markers[i].sYelpContent);          //  setting infromation to be presented in info window
                     infowindowBox.open(map,markers[i]);
                   } else {
                    requestAjax(data);                                          // ask Yelp for information for marker selectes
                   }
              }
          }
      }

/* ---------------------------------------------------
     Function to filter whole array based in the filter
     text entered
--------------------------------------------------------*/
   function filterMarkers(opts) {
       var i,j,k;

        for (i = 0; i < markers.length; i++) {
           markers[i].setVisible(false);
          }
        for (j = 0; j < opts().length; j++) {
            for (k = 0; k < markers.length; k++) {
                if (markers[k].name == opts()[j].name()) {
                    markers[k].setVisible(true);
                  }
              }
          }
     }
/* ---------------------------------------------------
     Function to show all the markers when filter text
     is empty or x icon is click in text input from DOM
--------------------------------------------------------*/
   function fClearMarkers() {
       var i;
        for (i = 0; i < markers.length; i++) {
            markers[i].setVisible(true);
          }

      }

  /* ---------------------------------------------------
     Function to format marker label using html format
     to create a better view
--------------------------------------------------------*/
  function uPdateLabel(data) {
        contentString ='<div id="content">'+
              '<div id="siteNotice"></div>'+
              '<h1 id="firstHeading" class="firstHeading">'+data.businesses[0].name+'</h1>'+
              '<div id="bodyContent">'+
               '<img src=' + data.businesses[0].image_url + '>' +
               '<p> phone' + data.businesses[0].display_phone + '</p>'+
               '<p>' + data.businesses[0].location.address[0] + '</p>'+
               '<p>' + data.businesses[0].location.city + ',' + data.businesses[0].location.state_code + '</p>' +
               '<p> rating ' + data.businesses[0].rating + '</p>'+
               '<p><img src='+data.businesses[0].rating_img_url + '></p>'+
               '<p><a href="' + data.businesses[0].url + '"</a></p>'+
               '</div>'+
               '</div>';

        return contentString;
      }
/* ---------------------------------------------------
     Function to send AJAX request to Yealp requesting
     information from marker selected
--------------------------------------------------------*/
  function requestAjax(opts) {
      var yelp_url = 'https://api.yelp.com/v2/search';
      var yelp_parameters =
        {
          oauth_consumer_key: '3Su2BJO40i82FF4stADLKA',    //CONSUMER_KEY,
          oauth_token: 'vjyuJ04Duf_EdcP9hUocRpU44-hk_zyw',        //TOKEN_KEY
          oauth_nonce: Math.floor(Math.random() * 1e12).toString(),
          oauth_timestamp: Math.floor(Date.now() / 1000),
          oauth_signature_method: 'HMAC-SHA1',
          oauth_version: '1.0',
          callback: 'cb',
          term: opts.name,
          location: opts.formatted_address,
          limit: 1
       };

      var encodedSignature = oauthSignature.generate('GET', yelp_url, yelp_parameters,'DfGsVrz5heaDRked3LLxDqBxuEA' , '8w3rdVUYDrSWt2kBQUrC-jXpIE8');//CONSUMER_SECRET_KEY,TOKEN_SECRET_KEY );
      yelp_parameters.oauth_signature = encodedSignature;

      $.ajax(
         {
           url: yelp_url,
           data: yelp_parameters,
           cache: true,
           dataType: 'jsonp',

/* ---------------------------------------------------
     Function to handle AJAX response if response was
     successful
--------------------------------------------------------*/
           success:function(data) {
               markers[opts.ind].sYelp = 1;

               if (data.businesses.length > 0 ) {
                   markers[opts.ind].sYelpContent=uPdateLabel(data);
                 } else {
                  markers[opts.ind].sYelpContent="No Results Found in YELP";
                }

               infowindowBox.close();                                      // making sure closing previous info windows
               infowindowBox.setContent(markers[opts.ind].sYelpContent);   // setting content before presenting in info window
               infowindowBox.open(map,markers[opts.ind]);                  // showing info window after AJAX request
             },

/* ---------------------------------------------------
     Function to handle most common AJAX errors
--------------------------------------------------------*/

           error: function(jqXHR, exception) {

              if (jqXHR.status === 0) {
                   alert('Not connect.\n Verify Network.');
                 } else if (jqXHR.status == 404) {
                   alert('Requested page not found. [404]');
                 } else if (jqXHR.status == 500) {
                   alert('Internal Server Error [500].');
                 } else if (exception === 'parsererror') {
                   alert('Requested JSON parse failed.');
                 } else if (exception === 'timeout') {
                   alert('Time out error.');
                 } else if (exception === 'abort') {
                  alert('Ajax request aborted.');
                } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
               }
            },

      });
  }
