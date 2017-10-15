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
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        }); 

        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
    



    describe('allFeeds Check loop name and url',function(){
    var id=0;
 
               
       function testSpec1(p){
         it('Name and url are defined in feed item ' + p, function() {
            expect(allFeeds[p].name.length).not.toBe(0);
            expect(allFeeds[p].url.length).not.toBe(0);
        });
       }
     
       for (var i=0; i < allFeeds.length; i++){
         testSpec1(i);        
       }

      });



    describe('Check Menu hide',function(){
    var id=0;
    var spyEvent;

        beforeEach(function() {
        setUpHTMLFixture();
       });

      it ("should invoke the btnShowMessage click event.", function() {
          spyEvent = spyOnEvent('#btnShowMessage', 'click');
          $('#btnShowMessage').trigger( "click" );
       
          expect('click').toHaveBeenTriggeredOn('#btnShowMessage');
          expect(spyEvent).toHaveBeenTriggered();
        });
      
      it ("should invoke the btnHideMessage click event.", function() {
         spyEvent = spyOnEvent('#btnHideMessage', 'click');
         $('#btnHideMessage').trigger( "click" );
       
         expect('click').toHaveBeenTriggeredOn('#btnHideMessage');
         expect(spyEvent).toHaveBeenTriggered();
        });
      });



    describe('Check for name and url',function(){
    var id=0;
 

        beforeEach( function(done){
            loadFeed(id,done);

        }); 
               
       function testSpec(p){
         it('Name and url are defined in feed item ' + p, function() {
            expect(allEntries[p].title.length).not.toBe(0);
            expect(allEntries[p].link.length).not.toBe(0);
        });
       }
     
       for (var i=0; i < 10;i++){
         testSpec(i);        
       }

      });


        
      
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
        expect(allEntries[p].title.length).not.toBe(0);
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
});
