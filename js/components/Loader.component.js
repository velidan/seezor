(function(){

	const loaderTmpl = document.createElement("template");
	
	loaderTmpl.innerHTML = `
		<style>
			:host {
				display: none;
				opacity: .8;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				
				align-items: center;
				justify-content: center;
				background-color: var(--palette-secondary-color-0);
			}

			:host(.visible) {
				display: flex;
			}
		
			.loader {
				display: inline-block;
				position: relative;
				width: 64px;
				height: 64px;
			}
			.loader div {
				position: absolute;
				border: 4px solid var(--palette-primary-color);
				opacity: 1;
				border-radius: 50%;
				animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
			}
			.loader div:nth-child(2) {
				animation-delay: -0.5s;
			}
			@keyframes ripple {
				0% {
					top: 28px;
					left: 28px;
					width: 0;
					height: 0;
					opacity: 1;
				}
				100% {
					top: -1px;
					left: -1px;
					width: 58px;
					height: 58px;
					opacity: 0;
				}
			}
		</style>

		<div aria-hidden="true" class="loader">
			<div></div>
			<div></div>
		</div>
	`;


	class Loader extends HTMLElement {
		constructor() {
			super();

			this.showTime;
			this.minShowTime = 500;

			var shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(loaderTmpl.content.cloneNode(true));
			
		}
		
		show() {
			this.showTime = Date.now();
			this.shadowRoot.host.classList.add("visible");


		}

		hide() {
			var shift = Date.now() - this.showTime;

			// I'd like to avoid "loader blinking" in case of fast response. Bad UX
			if ( shift < this.minShowTime ) {
				setTimeout(() => {
					this._hide();
				}, this.minShowTime - shift)
			} else {
				this._hide();
			}
			
		}

		_hide() {
			this.shadowRoot.host.removeAttribute("class");
		}
	}
	customElements.define("loader-component", Loader);
}())