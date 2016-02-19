## Website Performance Optimization portfolio project

####Part 1: Optimize PageSpeed Insights score for index.html

These are some things that I tried to improve speed in **index.html**:

1. Minify and inline CSS files **print.css**, **style.css** using some web base tools like listed bellow:

    * [CSS Minifier](https://cssminifier.com/)
    * [Clean CSS](http://www.cleancss.com/css-minify/)
    * [CSS Compressor](http://csscompressor.com/)
    
      Saving about 338 ms 
      ![test](https://github.com/icisner/P04_V04/blob/master/img/CSS_1.JPG)
    
2. Minify JS and inline files **perfmatters.js** using web tools like these:

   * [JS Compress](http://jscompress.com/)
   * [JS Minifier](https://javascript-minifier.com/)
    
      Saving about 172 ms 
      ![test2](https://github.com/icisner/P04_V04/blob/master/img/JS_1.JPG)
   
3. Copy analytics.js file from (google analytics)[http://www.google-analytics.com/analytics.js] and Minify as well inlining
   * Moving file and inlining analytics.js saved about 70ms
      ![test3](https://github.com/icisner/P04_V04/blob/master/img/analytics_js.JPG)

4. Coping picture to have locally and optimizing pictures size using one tool that I had avilable called Corel PaintShop Pro to have under 30Kb make a big difference
   
   * Here is one example using Corel PaintShop picture optimization tool
   
	![pic](https://github.com/icisner/P04_V04/blob/master/img/CorelPaintShop.jpg)

#####Page speed test achieved after all changes

   * Here are the results for web page performance
   
	![pic1](https://github.com/icisner/P04_V04/blob/master/img/speedtest.png)


####Part 2: Optimizing Frames per Second in pizza.html

These are some things done to optimze views/js/main.js

   * Optimized pizza.jpg file to reduce from 49Kb to 24Kb using same as before Corel PaintShop
   * Reducing math operations and creating vectors to speed up loop  line 548
   * Reducing number of pizza for scrolling in line 551 from 200 to 32

	![pic2](https://github.com/icisner/P04_V04/blob/master/img/loop1_part2.png)

	Page loaded at GitHub [http://icisner.github.io/views/pizza.html](http://icisner.github.io/views/pizza.html)
	
   * Using transform to avoid trigering Layout good reference in  [http://csstriggers.com/](http://csstriggers.com/)
	
	![pic4](https://github.com/icisner/P04_V04/blob/master/img/pizza_transform.PNG)

#####Page speed test achieved after all changes
   ![pic5](https://github.com/icisner/P04_V04/blob/master/img/prj2_60fps.PNG)
   
####Part 3 Optimizing speed for size change in pizza.html

  * Inline style.css, print.css 
  * Moving in and Inline  analytics.js, perfmatters.js, perfmatters.js
  * Copied pizzeria.jpg to pizzeria_v1.jpg reducing to 5Kb
  * Changing loop 
  
    ![pic6](https://github.com/icisner/P04_V04/blob/master/img/loop2_part1.png)

#####Page speed test achieved after all changes
   ![pic7](https://github.com/icisner/P04_V04/blob/master/img/prj3_resize.PNG)
