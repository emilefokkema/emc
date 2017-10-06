;(function(){
	var something = {};
	//HERE
	if(typeof define === "function"){
		define([],function(){return something.emc;})
	}else{
		window.emc = something.emc;
	}
})()