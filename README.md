# emc
Instead of creating a singleton module using the well-known module-pattern
```js
var thing = (function(){
	var bar = function(){};
	return {
		foo:function(){bar();}
	}
})();
```
sometimes we want to re-use the 'constructor' above
```js
var thingConstructor = function(){
	var bar = function(){};
	return {
		foo:function(){bar();}
	}
}
```
in order to make the thing, `var thing = thingConstructor()`, later.

But sometimes we want not just things, but also special things. This is where the extendable module constructor comes in handy:
```js
var mammal = emc(function(feet){
	
	var digestFood = function(){}; //a protected method

	this.expose({
		getNumberOfFeet:function(){return feet;},
		rest:function(){digestFood();}
	});

	this.extend('cat', function(){

		//override the protected method
		digestFood = function(){console.log("purr");};

		this.expose({
			getNumberOfPaws:function(){return feet;}
		});
	});
});
```
