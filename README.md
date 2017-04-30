### Project Neighborhood Map

This application locate **Local Restaurants** and create a list of those places and display marker in the map.
The center of the map can be changed using **Enter Address** box like show bellow. You can enter a full address
or a zip code or a city name

![](https://github.com/icisner/icisner.github.io/blob/master/img/Address_pic.PNG)

[**Google Maps APIs**](https://developers.google.com/maps/faq#whatis) give several options retrieving data from Google Maps, and allow customization. 
The map and markers are created using **Google Map API** additional when you click in one of the markers or from one item of the restaurant list the marker would change from red to gree and would bounce. This event would trigger an **AJAX** request to **Yelp API** to retrive additional information like phone, rating, address and a small picture. **Yelp uses OAuth 1.0a** for authentication here are some details about this protocol  [API requests as per the OAuth](https://www.yelp.com/developers/documentation/v2/authentication).

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker1.PNG)

If no information is found in the **Yelp** then this label would be display

![](https://github.com/icisner/icisner.github.io/blob/master/img/Info_marker2.PNG)

This box can be used to filter the list and will filter markers too

![](https://github.com/icisner/icisner.github.io/blob/master/img/Filter.PNG)

Application would hide **nav side list** when screen wide is less than 600px like a phone
screen 

![](https://github.com/icisner/icisner.github.io/blob/master/img/map_LT600px.PNG)

