App.modules.dom = function($app) {

	/*
	 * by having this abstraction (eg. fasade) we can easily hide our core logic
	 * we can use native or thirdparty select methods etc. 
	 */
	var conf = {
		getElemsListByCssSelector : function(sel) {
			if (typeof sel !== "string") {
				throw `Please, pass the correct css selector like 
				a string. Got - ${typeof sel}: ${sel}`;
			}
			// it could be any selection method.
			return document.querySelectorAll(sel);
		},

		addListener : undefined,
		removeListener : undefined
	}

	// IE event handlers compatibility

	// normal browsers
	if (typeof window.addEventListener === "function") {

		conf.addListener = function (el, type, fn) {
			// we don't want to capture event before bubling so that's why it false
			el.addEventListener(type, fn, false);
		};
		
		conf.removeListener = function (el, type, fn) {
			el.removeEventListener(type, fn, false);
		};

	} else if (typeof document.attachEvent === "function") { // IE <= 10
		
		conf.addListener = function (el, type, fn) {
			el.attachEvent("on" + type, fn);
		};

		conf.removeListener = function (el, type, fn) {
			el.detachEvent("on" + type, fn);
		};

	} 

	$app.dom = conf;

}