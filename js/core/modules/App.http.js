App.modules.http = function($app) {

	var isFetchSupported = typeof fetch !== "undefined" && fetch.toString().indexOf("[native code]") !== -1;

	var baseOptions = {
		headers : {
			"Content-Type": "application/json"
		}
	}

	// TODO: XMLHTTPRequest fallback. It should be different strategy.
	var makeRequest = isFetchSupported ? fetch : XMLHttpRequest;

	$app.http = {
		/**
		 * 
		 * @param {object} options - it can contain headers/tokens etc.
		 */
			updateBaseOptions : function(options) {
				baseOptions = Object.assign(baseOptions, options);
			},

			get : function(url) {
				/* I could return a new promise with reject in case of error
				* but I decided not to do it because I'd like to show old try/catch way
				*/
				try {
					App.static.utils.validateParamType("url", url, "string");

					return makeRequest(url)
						.then(res => {
							return res.json();
						})
					
				} catch (myErr) {
					// some error report logic. It should be done automatically
					App.static.utils.logError();
					console.warn(myErr);
					
					/* we could use try/catch at the top level of executing request
					* but I decided to return a rejected promise to avoid code nesting. 
					* Made it simplier
					*/
					return Promise.reject(myErr);
				};
		}
	}
}
