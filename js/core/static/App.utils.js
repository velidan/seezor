// IIFE because we want to make idCounter a private member
App.static.utils = (function(){

	var idCounter = 0;

	return {
		logError : function() { // we could pass some additional params to identify error etc.
			// TODO: Send log report to a cloud service/server etc.

			console.warn("Error happened. Send the report to the server");
		},

		/**
		 * checks the passed param type
		 * @param {string} paramName - a name of the param
		 * @param {any} paramVal - a value of the param
		 * @param {any} expectedType - a type which param should be
		 * @param {string} errMsg - custom error msg which will throw in case of fail
		 */
		validateParamType : function(paramName, paramVal, expectedType, errMsg) {
			// I could use template literals eg `The param ${paramName}...` but I didn't do it to support old browsers
			var msg = errMsg || "The param: [ " + paramName 
			+ " ] has the type: [ " + typeof paramVal + " ] but it should be a: [ " + expectedType + " ]";

			if (typeof paramVal !== expectedType) {
				throw new Error(msg);
			}
		},

		/**
		 * to recognize char on kerypress
		 * @param {KeypressEvent} keyPressEvt 
		 * @return {void | string}
		 */
		getChar : function(keyPressEvt) {
			if (keyPressEvt.which == null) { // IE
				if (keyPressEvt.keyCode < 32) return null; // special symbol
				return String.fromCharCode(keyPressEvt.keyCode)
			}

			if (keyPressEvt.which != 0 && event.charCode != 0) { // all except IE
				if (keyPressEvt.which < 32) return null; // special symbol
				return String.fromCharCode(keyPressEvt.which); // others
			}

			return null; // special symbol
		},

		/**
		 * returns a simple unique id
		 * @return {number}
		 */
		getUnigueId : function() {
			/* Here we can use some hash generator or some id generator algorytm
			* or Date at least, which is a bit risky
			* but in our case it isn't important
			*/
			return idCounter++;
		},

		/**
		 * returns an array of the keys of the obj 
		 * @param {object} obj  - iterable object
		 * @returns {Array} - object keys array
		 */
		getObjKeys : function(obj) {
			var keys = [];
			
			for (var k in obj) { 
				keys.push(k)
			};

			return keys;
		}
	}
}())