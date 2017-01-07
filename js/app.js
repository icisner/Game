$ (document).ready(function(){

	$("#sListAll ul li a").mouseenter(function(){
		$(this).switchClass("sList1","sList2",700);
	});

	$("#sListAll ul li a").mouseleave(function(){
		$(this).switchClass("sList2","sList1",700);
	});
 


	$( "#date" ).datepicker();
  		$(function() {
    		$( "#dialog" ).dialog();
  			});	

   	$(function() {
      $	( "#draggable" ).draggable();
    	});


    });
