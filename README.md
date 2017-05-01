## Project Neighborhood Map

### About this application

This application would try to locate **Local Restaurants** quering using googple map API and create a list of those places and display marker in the map based in the address found.

### How to run this application

To start this application locally file name **index.html** can be open with web browser

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker3.PNG)

### How to use it

Application will start by default using this coordinates (San Antonio TX)

```
center: {   lat: 29.5,
            lng: -98.5 }
```

The default map center can be changed using **Enter Address** box like show bellow and a full address
or a zip code or a city name an be emter

![](https://github.com/icisner/icisner.github.io/blob/master/img/Address_pic.PNG)

[**Google Maps APIs**](https://developers.google.com/maps/faq#whatis) give several options retrieving data from Google Maps, and allow customization. The map and markers are created using **Google Maps JavaScript API V3** additional when you click in one of the markers or from one item of the restaurant list the marker would change from red to gree and would bounce. This event would trigger an **AJAX** request to **Yelp API** to retrive additional information like phone, rating, address and a small picture. **Yelp uses OAuth 1.0a** for authentication here are some details about this protocol  [API requests as per the OAuth](https://www.yelp.com/developers/documentation/v2/authentication).

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker1.PNG)

If no information is found in the **Yelp** then this label would be displayed

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker2.PNG)

This box can be used to filter the list and will filter markers too

![](https://github.com/icisner/icisner.github.io/blob/master/img/Filter.PNG)

Application would hide **nav side list** when screen wide is less than 600px like a phone
screen 

![](https://github.com/icisner/icisner.github.io/blob/master/img/map_LT600px.PNG)

## Files

- `README.md`: information abou this application
- `ko/knockout-3.4.0.js`: Knockout library file
- `ko/komapping-2.4.1.js`: Knockout library file
- `js/jquery-1.12.4.min.js`: JQuery library file
- `js/jquery-ui.min.js`: JQuery library file
- `js/oauth-signature.js`: Oauth library file
- `js/main.js`: JavaScript main file application 
- `js/map.js`: JavaScript mapping function related file
- `css/style.css`: CSS main format file
