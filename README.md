## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

	These are some things done to optimze index.html
	1.- Inline style.css, print.css 
	2.- Moving in and Inline  analytics.js, perfmatters.js, perfmatters.js
	3.- Copied pizzeria.jpg to pizzeria_v1.jpg reducing to 19Kb
	4.- Optimized images to ~ 5Kb

	Page loaded at GitHub http://icisner.github.io/
	Page speed test 94% for Mobile and 95% in Desktop


####Part 2: Optimizing Frames per Second in pizza.html

	These are some things done to optimze views/js/main.js
	1.- Optimized pizza.jpg to reduce from 49Kb to 24Kb
	2.- Reducing math operations and creating vectors to speed up loop  line 548
	3.- Reducing number of pizza for scrolling in line 551 from 200 to 32
	4.- Optimized images to ~ 5Kb

	Page loaded at GitHub http://icisner.github.io/views/pizza.html

####Part 3 Optimizing speed for size change in pizza.html

	These are some things done to optimze views/js/main.js
	1.- Removing some variables from loop in line 513 to speed up process
	2.- Removing some variables from loop in line 457 to speed up process

	Page loaded at GitHub http://icisner.github.io/views/pizza.html

