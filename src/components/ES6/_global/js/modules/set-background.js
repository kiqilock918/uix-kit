
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';
import UixParallax from '@uixkit/core/_global/js/fn/parallax';

export const SET_BG = ( ( module, $, window, document ) => {
	if ( window.SET_BG === null ) return false;
	
	
	
	
	module.SET_BG               = module.SET_BG || {};
    module.SET_BG.version       = '0.0.3';
	module.SET_BG.documentReady = function( $ ) {


        var $window      = $( window ),
		    windowWidth  = window.innerWidth,
		    windowHeight = window.innerHeight;

        
		//  Initialize
		setBGInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;
				windowHeight = window.innerHeight;

				// Do stuff here
				setBGInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Initialize background using "data-bg" attribute.
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function setBGInit( w, h ) {
			
			$( '[data-bg]' ).each( function() {
				var $this    = $( this ),
					config   = $this.data( 'bg' );


				if ( typeof config === typeof undefined ) {
					config = {
						"src"      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
						"position" : "top left",
						"size"     : "cover",
						"repeat"   : "no-repeat",
						"fill"     : false,
						"parallax" : 0
					};
				}

				if ( config ) {

					var dataImg       = config.src,
						dataPos       = config.position,
						dataSize      = config.size,
						dataRepeat    = config.repeat,
						dataParallax  = config.parallax;

					if ( typeof dataPos === typeof undefined ) dataPos = 'top left';
					if ( typeof dataSize === typeof undefined ) dataSize = 'cover';
					if ( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';


					//Using parallax
					if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {
						dataPos = dataPos.replace( 'top', '50%' );
					}

					
					
					if ( typeof dataImg != typeof undefined && dataImg != '' ) {

						if ( config.fill ) {
							//Show Image Under Text
							if ( Modernizr.cssanimations ) {
								$this.css( {
									'background'               : 'url('+dataImg+') '+dataRepeat+'',
									'background-size'          : dataSize,
									'-webkit-background-clip'  : 'text',
									'-webkit-text-fill-color'  : 'transparent',
								} );	

							}


						} else {

							$this.css( {
								'background-image'    : 'url('+dataImg+')',
								'background-position' : dataPos,
								'background-size'     : dataSize,
								'background-repeat'   : dataRepeat
							} );	
						}


						//Using parallax
						if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {

							$this.UixParallax( { 'speed': dataParallax, 'bg': { enable: true, xPos: '50%' } } );
						}


					}	


				}




			});
	
			
		}


	};

	module.components.documentReady.push( module.SET_BG.documentReady );

	return class SET_BG {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

