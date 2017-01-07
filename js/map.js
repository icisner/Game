
/* var vm = new AppViewModel();
ko.applyBindings(vm); */

      var map;
      var markers = [];
      var infowindows=[];
      var infowindow;
      var contentString;
      
 function initMap() {
    var searchArea;
    var options ={
          center: {
            lat: 29.5,
            lng: -98.5
          },
          zoom: 14,
          visible: true,
          disableDefaultUI : false,
          scrollwheel : false,
          draggable: true,
          maxZoom: 20,
          minZoom: 8,
          mapTypeId: 'terrain' //hybrid
        }

        searchArea = {lat: options.center.lat, lng: options.center.lng };
        map = new google.maps.Map(document.getElementById('map'), options);
       // infowindow = new google.maps.InfoWindow();
       // infowindows.push(infowindow);
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: searchArea,
          radius: 2000,
          type: ['restaurant']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          
          for (var i = 0; i < results.length; i++) {
            
              vm.AddRes(results[i].name,results[i].formatted_address,results[i].geometry.location.lat(),results[i].geometry.location.lng());
              infowindow = new google.maps.InfoWindow();
              infowindows.push(infowindow);
              createMarker(results[i]);
            }
          }
          vm.vFilterArray(vm.ResArray());
        }

      function createMarker(place) {
        var indx;
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        marker.sYelp=0;
        marker.name=place.name;
        markers.push(marker);
        indx=markers.indexOf(marker);
        markers[indx].ind=indx;
        place.ind=indx;
        google.maps.event.addListener(marker, 'click', function() {
          if (markers[indx].sYelp === 1){             

                 infowindows[indx].content=markers[indx].sYelpContent;
                 infowindows[indx].setContent(infowindows[indx].content);
                 infowindows[indx].open(map,markers[indx]);
            }
          else {
               requestAjax(place);
               } 
          });
        } 

  function openWindowMarker(opts){

          for (var i=0; i < markers.length; i++){
              if (markers[i].name==opts.name()){
                var data={name: opts.name(), formatted_address: opts.addr(), ind: i};
                 if (markers[i].sYelp === 1){
                       infowindows[i].content=markers[i].sYelpContent;
                       infowindows[i].setContent(infowindows[i].content);
                       infowindows[i].open(map,markers[i]);
                    }
                 else {
                        requestAjax(data); 
                    }  
                }  
            }       
      }

   function filterMarkers(opts){
      
        for (var i=0; i < markers.length;i++){
         markers[i].setVisible(false);
        }

        for (var j=0; j < opts().length;j++){
          for (var i=0; i < markers.length; i++){
              if (markers[i].name==opts()[j].name()){
                  markers[i].setVisible(true);
                  console.log(markers[i].name + " " + opts()[j].name() +" true");
                }  
            } 
        }
       }

   function fClearMarkers(){
      
        for (var i=0; i < markers.length;i++){
         markers[i].setVisible(true);
        }

       }

    function uPdateLabel(data){
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

   function requestAjax(opts) {
    var yelp_url = 'https://api.yelp.com/v2/search'

    var yelp_parameters = { 
      oauth_consumer_key: '3Su2BJO40i82FF4stADLKA',    //CONSUMER_KEY,
      oauth_token: 'vjyuJ04Duf_EdcP9hUocRpU44-hk_zyw',        //TOKEN_KEY
      oauth_nonce: Math.floor(Math.random() * 1e12).toString(), 
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      term: opts.name,
      location: opts.formatted_address, 
      limit: 1
    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, yelp_parameters,'DfGsVrz5heaDRked3LLxDqBxuEA','8w3rdVUYDrSWt2kBQUrC-jXpIE8');            //CONSUMER_SECRET_KEY,TOKEN_SECRET_KEY );
    yelp_parameters.oauth_signature = encodedSignature;

   $.ajax({
    url: yelp_url,
    data: yelp_parameters,
    cache: true,
    dataType: 'jsonp',
    success:function(data) {  
        markers[opts.ind].setMap(map);
        markers[opts.ind].sYelp=1;

      if (data.businesses.length > 0 ){

        markers[opts.ind].sYelpContent=uPdateLabel(data);
       }
       else{
          markers[opts.ind].sYelpContent="No Results Found in YELP";
       } 
        infowindows[opts.ind].content=markers[opts.ind].sYelpContent;
        infowindows[opts.ind].setContent(infowindows[opts.ind].content);
        infowindows[opts.ind].open(map,markers[opts.ind]);

      },
      fail: function(data) {
        markers[opts.ind].setMap(map);
        infowindows[opts.ind].content="No Results found in Yelp";
        infowindows[opts.ind].setContent(infowindows[opts.ind].content);
        infowindows[opts.ind].open(map,markers[opts.ind]);        
        console.log('No results found!');
        }
      });
  }
