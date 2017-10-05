require.config({
	baseUrl:"../src/"
});

require(["testSet", "emc"],function(testSet, emc){
	testSet = testSet(function(e){console.error(e);}, function(s){console.info(s);});
	
	testSet("allTests", function(test){

		test("testSimple",function(){

			var thing = emc(function(){
				var a = 0;
				this.expose({
					getA:function(){return a;}
				});
			});

			var t = thing();
			this.assert(t.getA() == 0);
		});

		test("testExtend", function(){

			var thing = emc(function(a){
				this.expose({
					getA:function(){return a;}
				});
				this.extend('better',function(b){
					this.expose({
						getB:function(){return b;}
					})
				});
			});

			var simpleThing = thing(0);
			var betterThing = thing.better(0, 1);

			this.assert(simpleThing.getA() == 0);
			this.assert(!simpleThing.getB);
			this.assert(betterThing.getA() == 0);
			this.assert(betterThing.getB() == 1);
		});

		test("testInstanceOf", function(){

			var thing = emc(function(){
				this.expose({});
				this.extend('better',function(){
					this.expose({})
				});
			});

			this.assert(thing() instanceof thing);
			this.assert(thing.better() instanceof thing.better);
		});

		test("testOverrideProtected",function(){

			var thing = emc(function(){
				var getName = function(s){return "name " + s;};
				this.expose({
					getName:function(s){return getName(s);}
				});
				this.extend('better', function(){
					getName = this.override(getName, function(s){
						return this(s) + " better";
					});
				});
			});

			var simpleThing = thing();
			var betterThing = thing.better();

			this.assert(simpleThing.getName("a") == "name a");
			this.assert(betterThing.getName("a") == "name a better")
		});

		test("testOveridePublic", function(){

			var thing = emc(function(){
				this.expose({
					getName:function(s){return "name " + s;}
				});
				this.extend('better', function(){
					this.expose({
						getName:function(s){return "name " + s + " better";}
					})
				});
			});

			var simpleThing = thing();
			var betterThing = thing.better();

			this.assert(simpleThing.getName("a") == "name a");
			this.assert(betterThing.getName("a") == "name a better")
		});

		test("testPrependArguments", function(){

			var thing = emc(function(a){
				a = a + 1;
				this.expose({
					getA:function(){return a;}
				});
				this.extend('better', function(b){
					this.expose({
						getB:function(){return b;}
					})
				}, 42);
			});

			var betterThing = thing.better(2);

			this.assert(betterThing.getA() == 43);
			this.assert(betterThing.getB() == 2);

		})

	});

	
});