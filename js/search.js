/* it could be also a web component or custom element but 
* it was important to show how can we work in case of old standards
*
*/

App(["dom", "event"], function($app) {

	var logError = App.static.utils.logError;
	
	var searchBtnSelector = ".search-button";
	var searchBtnInputSelector = ".search-input";

	var searchBtnEl;
	var searchInputEl;

	/* es6
	*  const { getChar, logError } = App.static.utils
	*/

	try {
		var searchBtnEl = $app.dom.getElemsListByCssSelector(searchBtnSelector)[0];
		var searchInputEl = $app.dom.getElemsListByCssSelector(searchBtnInputSelector)[0];
	} catch (err) {
		console.warn(err);
		logError();
	}
	
	/* we have to exit of this function cause it requires 
	*  the Search Button Node and Search Input node
	*/
	if ( !searchBtnEl || !searchInputEl ) {
		// we can separate this check but I decided to use only 1
		console.error(`Can't find element. 
			Please check searchBtn and searchInput el selectors.
			Result: 
			- searchBtnEl = ${searchBtnEl}
			- searchBtnInput = ${searchInputEl}
		`);
		return;
	 }

	 
	$app.dom.addListener(searchBtnEl, "click", function searchClickHandler() {
		$app.event.emit("search", { value : searchInputEl.value })
	});


	// Enter press handling
	$app.dom.addListener(window.document, "keypress", function searchKeypressHandler(e) {
		// we could move it to utils if we wanted to re-use this logic
		var key = e.which || e.keyCode || e.key || e.code;
		if (key === 13 || key === "Enter") {
			$app.event.emit("search", { value : searchInputEl.value })
		}
	});

});
