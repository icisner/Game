/* ---------------------------------------------------
     Setting up global variables to handle 
     main list objects (markers)
--------------------------------------------------------*/
function ObjRes(name, addr, Y, X) {
    this.name = ko.observable(name); // name for place or marker
    this.addr = ko.observable(addr); // address for place location
    this.Y = ko.observable(Y); // variable to hols Latitude to be able to plot marker
    this.X = ko.observable(X); // variable to hols Longitude to be able to p lot marker
    this.isSelected = ko.observable(true); // varible to hold if marker is selecte or not
}

/* ---------------------------------------------------
     Setting View Model 

--------------------------------------------------------*/
function AppViewModel() {
    var self = this;
    this.ZipCode = ko.observable(""); // variable to hold new Address to search and look for Restaurants 
    this.sQuery = ko.observable(""); // varible use to Filter list and vector with places (markers)
    this.ResArray = ko.observableArray([]); // vector to hold locations got back from google map API 
    this.vFilterArray = ko.observableArray([]); // vector to hols current Filter list
    this.sideNavStatus = ko.observable(false); // variable to be used to handle css binding to open and close sidenav

    /* ---------------------------------------------------
         getting lat long for items in the list 
    --------------------------------------------------------*/
    this.disZipCode = function() {

        geocodeAddress(this.ZipCode()); // finding locations (markers) for new address
    };
    /* ---------------------------------------------------
        function to create obj list for locations found
    --------------------------------------------------------*/
    this.AddRes = function(name, addr, Y, X) {
        this.ResArray.push(new ObjRes(name, addr, Y, X));
    };

    /* ---------------------------------------------------------------
         Function to clear array when X icon in Search Box is click
    -----------------------------------------------------------------*/

    self.fCleared = function() {
        self.vFilterArray(self.ResArray());
        fClearMarkers();
    };

    /* ---------------------------------------------------------
         Function to open info windows when marker is selected
    -------------------------------------------------------------*/
    self.oMarkerInfo = function(data, item) {

        openWindowMarker(this);
    };

    /* ---------------------------------------------------
         Function to delte elements from array 
         empty vector with places
    --------------------------------------------------------*/
    self.fCleanArray = function() {
        self.ResArray([]);
        self.vFilterArray([]);
    };

    /* ---------------------------------------------------
         Function to filter array list using active text
    --------------------------------------------------------*/

    self.sSearch = function() {
        var txt = self.sQuery();
        var i = 0;
        var len = self.ResArray().length;

        self.vFilterArray([]);

        for (i = 0; i < len; i++) {
            if (self.ResArray()[i].name().toLowerCase().indexOf(txt.toLowerCase()) >= 0) {
                self.vFilterArray.push(self.ResArray()[i]);
            }
        }

        filterMarkers(self.vFilterArray);
    };
    /*-----------------------------------------------------------
          function to handle ko css data-bind to close sidenav
    -----------------------------------------------------------*/

    self.fcloseNav = function() {
        this.sideNavStatus(false);
    };
    /*-----------------------------------------------------------
          function to handle ko css data-bind to open sidenav
    -----------------------------------------------------------*/

    self.fopenNav = function() {
        this.sideNavStatus(true);

    };
}

/* ---------------------------------------------------
   creatung new Application Model
--------------------------------------------------------*/

var vm = new AppViewModel();
vm.sQuery.subscribe(vm.sSearch); // subcribing function to have any changes in Fiter text
ko.options.useOnlyNativeEvents = true;
ko.applyBindings(vm);