App(["dom", "event", "http"], function($app) {
	var galleryEl;
	var noticeEl;
	var loaderEl;
	
	var initialMsg = "Please, enter some film name and we'll try to find something!";
	var noResultMsg = "Sorry, we can't found anything. Try to change your criteria!" 

	customElements.whenDefined("gallery-component").then(() => {
		galleryEl = $app.dom.getElemsListByCssSelector("gallery-component")[0];
	})

	customElements.whenDefined("loader-component").then(() => {
		loaderEl = $app.dom.getElemsListByCssSelector("loader-component")[0];
	})

	try {
		noticeEl = $app.dom.getElemsListByCssSelector(".notice")[0];
		/* In very old browsers it won't work. 
		*  Should use innerHTML and sanitize the value firts
		*/
		noticeEl.textContent = initialMsg; 
	} catch (err) {
		console.warn(err);
		App.static.utils.logError();
	}
	


	// we could use promise to avoid Callback hell as well
	$subject = $app.event.subscribe("search", function searchHandler(state) {
		var url = $app.getOmdbUrlByType("film" , {
			s : state.value
		});

		loaderEl.show();

		$app.http.get(url)
			.then(res => {
				// hanlde failed response or expired token etc.
				if (res.Response === "False") {
					noticeEl.classList.remove("none");
					noticeEl.textContent = noResultMsg;
					galleryEl.clearItems();
				} else {
						noticeEl.classList.add("none");

						// we don't need to have this prop at next steps so it can be removed
						delete res.Response;

						$app.event.emit("omdb", res)
					};
				})
				.catch(e => {
					
					/* show some toast/popup with the critical error message
					* we have to separate some special | critical error eg: invalid input
					* or server errors - 500+ etc.
					*/
					alert(`Accident! ${e}`);
				})
				.finally(function() {
					loaderEl.hide();
				})
		})

	$subject = $app.event.subscribe("omdb", function omdbHandler(state) {
		galleryEl.itemsData = state.Search;
	})
	
});
