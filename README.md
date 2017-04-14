### Project Neighborhood Map

This application locate **Local Restaurants** and create a list of those places and display marker in the map.
The center of the map can be changed using **Enter Address** box like show bellow 

![](https://github.com/icisner/icisner.github.io/blob/master/img/Address_pic.PNG)

[**Google Maps APIs**](https://developers.google.com/maps/faq#whatis) give several options retrieving data from Google Maps, and allow customization. 
The map and markers are created using **Google Map API** additional when click on the list or marker
it will start a **AJAX** request to **Yelp API** to retrive some information like phone, address, small
picture and rating. **Yelp uses OAuth 1.0a** for authenticating [API requests as per the OAuth](https://www.yelp.com/developers/documentation/v2/authentication) 
specification (Accessing Protected Resources).

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker.PNG)

This box can be used to filter the list and will filter markers too

![](https://github.com/icisner/icisner.github.io/blob/master/img/Filter.PNG)

Application would hide **nav side list** when screen wide is less than 600px like a phone
screen 

![](https://github.com/icisner/icisner.github.io/blob/master/img/map_LT600px.PNG)

