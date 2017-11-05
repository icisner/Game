/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */


        /* checking if allFeeds are definned and not empty*/
        
        it('Test to check if allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        /* checking if allFeeds urls are definned and not empty
           using forArch to loop and check all the items in allFeeds */
        
        it('Test to check if allFeeds url is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null); 

            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        /* checking if allFeeds names are definned and not empty
           using forArch to loop and check all the items in allFeeds */
              
        it('Test to check if allFeeds name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    describe('The menu', function() {


        /* checking if menu element is hidden by default using DOM class element propperty
           hidden and check if it is true */
        
        it('Test to check if menu is hiddenn initially', function() {
            expect($('.slide-menu').position().left < 0 ).toBe(true);
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        /* checking if menu element shows up after clicing icon using click event under  
           icon-list DOM element and ccomparing with position since we are using offscree techinque */

        it('Test to check if menu is displayed if menu icon is clicked ', function() {

           /* removing delay for offscreen to be able to test */
              $('.slide-menu').css('transition','transform 0s');
           
           /* clicking the menu-list to check if shows up */   
              $('.icon-list').click();

           /* checking if offscreen menu is inside of the screen */   
              expect($('.slide-menu').position().left < 0 ).not.toBe(true);

           /* clicking second time to see if menu got hidden again */   
              $('.icon-list').click();

           /* checking if offscreen menu is out side of screen */   
              expect($('.slide-menu').position().left < 0 ).toBe(true);
              
           /* putting back transiiton time of 200 ms */
              $('.slide-menu').css('transition','transform 0.2s');
          });

    });



    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */


    describe('Initial Entries', function() {
        var id = 0;

        /* checking if loadFeed function loads atr least one element using beforeEach to loop trought the elements
           and using done function to wait for AJAX request and then check the length for DOM element feed entry  
           not to be true */

        beforeEach(function(done) {
            loadFeed(id, done);
        });

        it('Test to check if loadFeed load at least one entry ', function() {

            expect($('.feed .entry').length).not.toBe(0);
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    describe('New feed Selection', function() {

        /* Definning two variables to hold two objects for loadFeed function results
           to be able to compare two runs for this fucnction */

        var feed1;
        var feed2;

        /* checking if loadFeed's results are different when selecting different menu 
           to do that I am using two nested loadFead calls so store the results in feed1 and feed 2
           Also before second call I am using a click event for first feed-list element to get a new feed
           and store in feed DOM element into feed2 variable and finally calling done function to wait 
           for AJAX request to finish */

        beforeEach(function(done) {
            loadFeed(0, function() {

              feed1 = $('.feed').html();
              $('.feed-list a:first-child')[0].click();
              loadFeed(1, function() {
                feed2 = $('.feed').html();
                done();
              });
            });
        });

        /* comparing both feed1 and feed2 loaded for two different calls to loadFeed function are differents
           to pass the test */

        it('Test to check if new feed is loaded  ', function() {
            expect(feed1).not.toBe(feed2);
         });
    });
}());
