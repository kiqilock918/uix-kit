
/* 
 *************************************
 * <!-- Navigation -->
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


export const NAVIGATION = ( ( module, $, window, document ) => {
	if ( window.NAVIGATION === null ) return false;
	
	
	
	
	module.NAVIGATION               = module.NAVIGATION || {};
    module.NAVIGATION.version       = '0.0.5';
	module.NAVIGATION.documentReady = function( $ ) {


		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight,
			ulForDesktop = '.uix-menu__container:not(.is-mobile) ul.uix-menu';


		//-------- Menu selected (if it exists "data-current" property in <ul>)
		var curMenuIndex = $( ulForDesktop ).data( 'current' );
		if ( typeof curMenuIndex !== typeof undefined ) {
			$( ulForDesktop + ' > li:eq('+curMenuIndex+')' ).addClass( 'is-active' );
		}



		//-------- Menu Hover
		var mTop = 15;
		$( ulForDesktop + ' > li.multi-column > ul li ul' ).addClass( 'multi' );
		$( ulForDesktop + ' > li:not(.multi-column) ul, .uix-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, '+ulForDesktop+' li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );

		$( ulForDesktop + ' li' ).on( 'mouseenter', function(){


			TweenMax.set( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), {
				css: {
					opacity    : 0,
					display    : 'block',
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.to( this.target, 0.3, {
						css: {
							opacity    : 1,
							marginTop  : 0
						},
						ease   : Power2.easeOut
					});		



				}
			});				



		}).on( 'mouseleave' , function(){


			TweenMax.to( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), 0.3, {
				css: {
					opacity    : 0,
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.set( this.target, {
						css: {
							display    : 'none',
						}
					});		



				}
			});				

		});



		//-------- Add Sub-menu Arrow
		$( ulForDesktop + ' li' ).each( function() {
			if ( $( this ).find( 'ul' ).length > 0 ) {
				$( this ).prepend( '<span class="uix-menu__arrow"></span>' );
			}

		} );	



		//-------- Sticky primary navigation
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.uix-menu__container:not(.is-mobile)' );
		$window.on( 'scroll.NAVIGATION touchmove.NAVIGATION', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});
		


	};

	module.components.documentReady.push( module.NAVIGATION.documentReady );

	return class NAVIGATION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

