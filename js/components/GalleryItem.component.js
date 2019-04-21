
// native Web components must use ES6 otherwise there is no reason to use them
(function(){

	const galleryItemTmpl = document.createElement("template");
	
	galleryItemTmpl.innerHTML = `
	<style>
			:host {
				animation: zoomIn .6s ease-in;

				/* tons of browser prefixes which should be automatically added by post-css or some loader */
				-webkit-animation: zoomIn .6s ease-in;
			}

			figure, .preview, .preview img {
				height: 100%;
				width: 100%;
			}

			figure {
				
				padding : 0;
				margin: 0;
			}

			.preview {
				background-color: violet;
				position: relative;
			}
			
			.preview img {
				width: 100%;
				object-fit: cover;
			}
			
			.preview-title {
				position: absolute;
				bottom: 0;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				font-size: 22px;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				background-color: rgba(0, 0, 0, .6);
			}
			
			.preview-title-text {
				color: var(--palette-primary-color);
			}

			@-webkit-keyframes zoomIn {
				0% {transform: scale(0);}
				100% {transform: scale(1);}
			}
		</style>

		<figure aria-role="figure" aria-description="A preview of the film" class="preview">
			<img aria-hidden="true" src="" alt="title"/>
			<figcaption aria-role="contentinfo " class="preview-title">
				<span class="preview-title-text" 
				aria-role="contentinfo" 
				aria-description="A film title"
				></span>
			</figcaption>
		</figure>
	`;

	class GalleryItem extends HTMLElement {
		constructor() {
			super();

			this._data;

			var shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(galleryItemTmpl.content.cloneNode(true));

			this.imgEl = this.shadowRoot.querySelector("img");
			this.titleEl = this.shadowRoot.querySelector(".preview-title-text");
		}


		get data() {
			return this._data;
		}

		set data(val) {
			this._data = val;
			this._renderItem();
		}
		
		connectedCallback() {
				this._renderItem();
		}

		disconnectedCallback() {
			// TODO: If I would be able to implement VideoPlayer on click here I should remove the click event listener
				console.log("disconnected!");
		}

		_renderItem() {
			this.imgEl.src = this._data.posterSrc;
			this.titleEl.innerHTML = this._data.title;
		}

	}

	customElements.define("gallery-item-component", GalleryItem)
}())
