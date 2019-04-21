
/**
 * This module is some hybrid of event & data store.
 * Our app is small so there is no reason to separate them. 
 * 
 * IIFE to have private static member (eventRegistry)
 * and to protect global object (we don't want to add global props to Window)
 */
(function(){

		/* here should be store events and theirs data which 
		 * should be shared between listeners
		 *
		 * we can easily predefine preffered events & states 
		 * but let it be a bit more "js-like" - dynamic and flexible
		 */
		var eventRegistry = {}
	

	App.modules.event = function($app) {
	
		$app.event = {
			/**
			 * subscribes to the event. If it hasn't registered in the registry this function automatically
			 * does it
			 * 
			 * to simplify logic I didn't split this to 2 methods. Create & Subscribe
			 * 
			 * @param {string} evtName - event name
			 * @param {function} fn - event consumer|listener
			 */
			subscribe : function(evtName, fn) {
				// TODO: check params type
	
				// it's critical Developer's error so we might stop the app
				if (typeof fn !== "function") {
					throw "Event handler should be a function but got -" + typeof fn;
				}
	
				// Pythonic pattern. Obvious is better than unobvious
				if ( !Boolean(eventRegistry[ evtName ]) ) {
					eventRegistry[ evtName ] = {
						state : {},
						listeners : [ fn ]
					}
				} else {
					eventRegistry[ evtName ].listeners.push(fn);
				}
	
				return {
					unsubscribe : function() {
						var evtListeners = eventRegistry[ evtName ].listeners;
						const listenerIndex = evtListeners.indexOf(fn);
						evtListeners.splice(listenerIndex, 1);
					},
	
					// some other methods of the Subject. Like Rx.js merge etc.
				};
			},
	
			/**
			 * removes event and it's data from registry
			 * @param {string} evtName - event name
			 */
			destroy : function(evtName) {
				if (typeof evtName === "string") {
					// TODO: check params type
					delete eventRegistry[ evtName ];
				} else {
					console.warn("evtName should be a string");
				}
				
			},
	
			/**
			 * sends an event with the data. It will be sent to all subscribers|listeners
			 * 
			 * @param {string} evtName - event name
			 * @param {object} dataObj - event state data HashMap<any>
			 * @param {boolean} isSavePrevData - for future pagination
			 */
			emit : function(evtName, dataObj, isSavePrevData) {
				var event = eventRegistry[ evtName ];

				if ( !event ) {
					
					// it's critical Developer's error so we might stop the app
	
					// es6, but it's just to save time. We can create a function to collect keys as well. 
					throw `You're trying to emit an event which wasn't subscribe by any consumer. " +
					"Please, create some subscription for it.
					Passed evtName - ${evtName}
					Existed events - ${Object.keys(eventRegistry)}` 
				}


				// Object.assign haven't supported by old browsers but it saves time and I can write a polygill etc.
				event.state = isSavePrevData ? Object.assign(event.state, dataObj) : dataObj;
	
				event.listeners.forEach((fn) => {
					// we have already checked the function type before
					fn(event.state);
				});
			}

		}
	}

}());