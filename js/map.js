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
     
function googleError(e) {

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
            lat: 29.5,    
            lng: -98.50  
          },
          zoom: 13,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
           },
            zoomControl: true,
            zoomControlOptions: {
               position: google.maps.ControlPosition.RIGHT_BOTTOM
             },
            scaleControl: true,
            streetViewControl: true,
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

  function bounceTimerStart(nSecs,indx) {
       btimer = setTimeout('endTimer(' + indx + ')',nSecs);
      }

  function endTimer(indx) {
        clearTimeout(btimer);
        markers[indx].setAnimation(null);
      }

/* ---------------------------------------------------
     Function to create markers base in lat and long
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
        google.maps.event.addListener(marker, 'click', function() {
        bounceTimerStart(nSecs,indx);

           if (markers[indx].getAnimation() === null) {
                markers[indx].setAnimation(google.maps.Animation.BOUNCE);
                
              }

          if (markers[indx].sYelp === 1) {             
             
              infowindowBox.close();
              infowindowBox.setContent(markers[indx].sYelpContent);
              infowindowBox.open(map,markers[indx]);
            } else {
              requestAjax(place);
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
                bounceTimerStart(nSecs,i);
                
                if (markers[i].getAnimation() === null) {

                      markers[i].setAnimation(google.maps.Animation.BOUNCE);    
                    } 
                if (markers[i].sYelp === 1) {
                     infowindowBox.close();
                     infowindowBox.setContent(markers[i].sYelpContent);
                     infowindowBox.open(map,markers[i]);
                   } else {
                    requestAjax(data);     
                   } 
              }  
          }       
      }

/* ---------------------------------------------------
     Function to filter list
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
     Function to hide markers from map
--------------------------------------------------------*/
   function fClearMarkers() {
       var i;
        for (i = 0; i < markers.length; i++) {
            markers[i].setVisible(true);
          }

      }

  /* ---------------------------------------------------
     Function to format marker label
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
     Function to send AJAX request
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

      var encodedSignature = oauthSignature.generate('GET', yelp_url, yelp_parameters,'DfGsVrz5heaDRked3LLxDqBxuEA' , '8w3rdVUYDrSWt2kBQUrC-jXpIE8');            //CONSUMER_SECRET_KEY,TOKEN_SECRET_KEY );
      yelp_parameters.oauth_signature = encodedSignature;

      $.ajax(
         {
           url: yelp_url,
           data: yelp_parameters,
           cache: true,
           dataType: 'jsonp',

/* ---------------------------------------------------
     Function to handle AJAX response
--------------------------------------------------------*/
           success:function(data) {  
               markers[opts.ind].sYelp = 1;
        
               if (data.businesses.length > 0 ) {
                   markers[opts.ind].sYelpContent=uPdateLabel(data);
                 } else {
                  markers[opts.ind].sYelpContent="No Results Found in YELP";
                } 

               infowindowBox.close();
               infowindowBox.setContent(markers[opts.ind].sYelpContent);
               infowindowBox.open(map,markers[opts.ind]);
             },

/* ---------------------------------------------------
     Function to handle AJAX error
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
