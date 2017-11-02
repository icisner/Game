# Feed Reader Testing project

## About This Project
The idea of this project is given a web-based application which reads RSS feeds perform several tests using [Jasmine js](https://jasmine.github.io/2.1/introduction) Unit test. There is one basic test initially defined and six more has being asked to do to complete which includes controlling jQuery [AJAX](http://api.jquery.com/jquery.ajax/) request, controlling DOM elements, HTML, CSS, mouse click. Mode details of requirements [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

## Getting Started
* Loading can be done cloning this repository or creating a pull request. You can get more information about pull requests [here](https://help.github.com/articles/creating-a-pull-request/).
* Another option would be to download the zip file.
* To start application open index.html file
* It is recommended to clean Cache files to avoid issues when running application. You can use key combination Crtl+Shift+Del for Chrome more information [click here](https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en)
* It is not required but is better to test using localserver instead just opening application from a local folder. I have been using Apache here more information [click here](https://www.apachefriends.org/index.html)

## Requirement
Chrome browser has been used for all the test it is recommended to use it for further testing and review.

## Implementation details
Here are more details about the test required and some information how did approach these tests 


1. Test that loops through each feed in the `allFeeds` object and ensures it has a URL and name are defined and not empty
   
   Using `forEach` to loop all the feeds and testing using match `.not.toBe()`


2. New test suite named `"The menu"` that ensures the menu element is hidden by default

   Using jQuery and DOM attributes to get `$('body').attr('class')` the class and then test if that is hidden or not

3. Test that ensures the menu changes visibility when the menu icon is clicked
   
   Using jQuery and `click` property `$('.icon-list').click()` to check if menu changes status

4. New test suite named `"Initial Entries” ‘that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
   
   Using `done()` function to get back to Jasmine after AJAX request and forEach to loop trough elements

5. Test suite named `"New Feed Selection"` that ensures when a new feed is loaded by the `loadFeed` function that the content changes.
   
   Using JQuery and 'click' property to get '$('.feed-list a:first-child')[0]' to load a new feed to test with a second feed as request

