
// native Web components must use ES6 otherwise there is no reason to use them
(function(){

	const defaultPosterSrc = "img/default_poster.jpg";

	const galleryItemName = "gallery-item-component";

	class Gallery extends HTMLElement {
		constructor() {
			super();

	
			this._itemsData; 

			this.attachShadow({mode: "open"});
		}

		set itemsData(data) {
			this._itemsData = data;
			this._renderItems();
	}

		get itemsData() {
				return this._itemsData;
		}

		clearItems() {
			this.shadowRoot.innerHTML = "";
		}


		_renderItems() {
			this.clearItems();


			if ( Boolean(customElements.get(galleryItemName)) ) {
				this._iterateData();
			} else {
				customElements.whenDefined(galleryItemName).then(() => {
					this._iterateData();
				})
			}

			
		}

		_iterateData() {
			
			this._itemsData.forEach(item => {
				const itemComponent = document.createElement(galleryItemName);

				itemComponent.data = {
					title : item.Title,
					posterSrc : item.Poster === "N/A" ? defaultPosterSrc : item.Poster
				};

				this.shadowRoot.appendChild(itemComponent);
			})
		}

	}

	customElements.define("gallery-component", Gallery);
}())