function App() {
	var args = Array.prototype.slice.call(arguments),
			callback = args.pop(),
			// modules have to be passed as an array
			modules = args[0],
			i;

			// auto make a constructor call
			if (!(this instanceof App)) {
				return new App(modules, callback);
			};

			// add modules to this. If we don't have modules or wildcard should add all modules
			if (!modules || modules === "*") {
				modules = [];
				for (i in App.modules) {
					if ( App.modules.hasOwnProperty(i) ) {
						modules.push(i);
					}
				}
			}

			// init the chosen modules
			var modulesLn = modules.length;
			for (i = 0; i < modulesLn; i++) {
				App.modules[ modules[ i ] ](this);
			}



			// we could create some kind of init method in case of comlex but now it's redundant
			var config = {
				omdbapiKey: "338f9a63",
				filmsUrlHost: "http://www.omdbapi.com/",
				postersUrlHost: "http://img.omdbapi.com/",
			}
			
			/**
			 * generate the request url to omdb
			 * { string } type - 'film' or 'poster'. Depends on it the propr host will be chosen
			 * { object } requestOptions - a possible url parameters to request (omdb)
			 */
			this.getOmdbUrlByType = function(type, requestOptions) {

				var reqOpts = requestOptions || {};

				var host = type === "film" ? config.filmsUrlHost : config.postersUrlHost;
				var res = host + "?apikey=" + config.omdbapiKey;

				for (k in reqOpts) {
					res += "&" + k + "=" + reqOpts[ k ];
				}

				return res;
			}

			// if false - should use some Promise polyfill or the callback strategy
			this.promiseSupport = typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1;


			this.setOmdbapiKey = function(key) {
				if (typeof key !== "string") {

					// just to demonstrate error handling concept
					throw {
						name : "ErrorType",
						message : "omdbapiKey should be string. Given - " + typeof key,
						extra : "Function - App. Method - setOmdbapiKey.",
						remedy : this.modules.utils.logError // some error handler
					};
				}

				this.config.omdbapiKey = key;
			}

			callback(this);
			

		
}

App.prototype = {
	name : "Seezor",
	version : "0.0.1",
	getName : function() {
		return this.name;
	}
}

App.modules = {};
App.static = {};

/* in big projects we must implement the possibility 
	to add our own modules, services etc. We can use Namespace strategy etc.
*/