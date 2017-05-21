
/* ---------------------------------------------------
     Setting up global variables to handle 
     main list objects
--------------------------------------------------------*/

function ObjRes(name, addr, Y, X){
	this.name=ko.observable(name);
	this.addr=ko.observable(addr);
	this.Y=ko.observable(Y);
	this.X=ko.observable(X);
  this.isSelected=ko.observable(true);
}

/* ---------------------------------------------------
     Setting View Model 
--------------------------------------------------------*/
function AppViewModel() {

	var self=this;
	this.ZipCode = ko.observable("");
  this.sQuery=ko.observable("");
  this.sFilterList = ko.observable("");
  this.ResArray=ko.observableArray([]);
  this.vFilterArray=ko.observableArray([]);

/* ---------------------------------------------------
     getting lat long for items in the list 
--------------------------------------------------------*/
	this.disZipCode=function(){
		//console.log(this.ZipCode());
    geocodeAddress(this.ZipCode());
	}; 
/* ---------------------------------------------------
    function to create obj list for locations found
--------------------------------------------------------*/
   this.AddRes = function(name, addr, Y, X){
   		this.ResArray.push(new ObjRes(name, addr, Y, X));
   };

/* ---------------------------------------------------
     Function to clear array
--------------------------------------------------------*/

   self.fCleared = function(){
     self.vFilterArray(self.ResArray());  
        fClearMarkers();      
    };

/* ---------------------------------------------------
     Function to open info windows
--------------------------------------------------------*/
       self.oMarkerInfo = function(data, item){ 
        openWindowMarker(this);     
      };
  
/* ---------------------------------------------------
     Function to delte elements from array
--------------------------------------------------------*/
  self.fCleanArray = function(){
    self.ResArray([]);
    self.vFilterArray([]);
  }
/* ---------------------------------------------------
     Function to filter array list
--------------------------------------------------------*/
   self.sSearch= function() {
    var txt=this.sQuery();
      self.vFilterArray([]);
        for (i=0, len=self.ResArray().length;i<len;i++)
            {
                if(self.ResArray()[i].name().toLowerCase().indexOf(txt.toLowerCase())>=0)
                    {
                       self.vFilterArray.push(self.ResArray()[i]);
                    } 
            }

           filterMarkers(self.vFilterArray); 
      };
}
/* ---------------------------------------------------
   creatung new Application Model
--------------------------------------------------------*/

var vm = new AppViewModel();
ko.options.useOnlyNativeEvents = true;
ko.applyBindings(vm);
/*initMap();*/

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

