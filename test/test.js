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

			var thing = emc(function(){
				var a = 0;
				this.expose({
					getA:function(){return a;}
				});
				this.extend('better',function(){
					var b = 1;
					this.expose({
						getB:function(){return b;}
					})
				});
			});

			var simpleThing = thing();
			var betterThing = thing.better();

			this.assert(simpleThing.getA() == 0);
			this.assert(!simpleThing.getB);
			this.assert(betterThing.getA() == 0);
			this.assert(betterThing.getB() == 1);
		})

	});

	
});