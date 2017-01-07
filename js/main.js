
function ObjRes(name, addr, Y, X){
	this.name=ko.observable(name);
	this.addr=ko.observable(addr);
	this.Y=ko.observable(Y);
	this.X=ko.observable(X);
  this.isSelected=ko.observable(true);
}

function AppViewModel() {

	var self=this;
	
	this.ZipCode = ko.observable("");
	this.flagZip=ko.observable(false);
  this.sQuery=ko.observable("");
  this.sFilterList = ko.observable("");
  this.ResArray=ko.observableArray([]);
  this.vFilterArray=ko.observableArray([]);

	this.disZipCode=function(){
		console.log(ZipCode);
	}; 

   this.AddRes = function(name, addr, Y, X){
   		this.ResArray.push(new ObjRes(name, addr, Y, X));
   };

        self.fCleared = function(){
        self.vFilterArray(self.ResArray());  
        fClearMarkers();      
      };

      //self.oMarkerInfo = function(data, item){
       self.oMarkerInfo = function(data, item){ 
        openWindowMarker(this);
      /*  for (var i=0; i < self.ResArray().length;i++){
          if(self.ResArray()[i].name()== item.name())
          {
            
            openWindowMarker(self.ResArray()[i]);
          }
        }*/
      
      };
  
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

var vm = new AppViewModel();
ko.options.useOnlyNativeEvents = true;
ko.applyBindings(vm);
