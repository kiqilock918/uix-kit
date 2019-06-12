
/* 
 *************************************
 * <!-- Form Progress -->
 *************************************
 */
/*
    Note:
	
	If you want to initialize the indicator to a location when the page is first run,
	you need to call the following function:
	
	$( 'body' ).waitForImages().done(function() {
		$( document ).UixFormProgressToNext({ 
			'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			'formTarget'       : $( '.uix-form-progress__target' ),
			'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
			'index'            : 0
		});
	});


*/


import {
    templateUrl,
	homeUrl,
	ajaxUrl,
    browser,
    UixModuleInstance,
	UixGUID,
	UixMath,
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';
import UixFormProgressToNext from '@uixkit/core/form-progress/js/fn/form-progress-to-next';

import '../scss/_style.scss';


export const FORM_PROGRESS = ( ( module, $, window, document ) => {
	
    module.FORM_PROGRESS               = module.FORM_PROGRESS || {};
	module.FORM_PROGRESS.version       = '0.0.2';
    module.FORM_PROGRESS.pageLoaded    = function() {

		var $progressBar   = $( '.uix-form-progress progress' ),
			$formTarget    = $( '.uix-form-progress__target' ),
			$indicator     = $( '.uix-form-progress .uix-form-progress__indicator' ),
			formAreaH      = $formTarget.height(),
			allStep        = $indicator.length,
			stepPerValue   = 100/( allStep - 1 ),
			value          = 0,
			transitionEnd  = 'webkitTransitionEnd transitionend';
		

		//Get form transition speed
		var dur = $formTarget.data( 'anime-speed' );
		if ( typeof dur === typeof undefined ) { 
			dur = '0.5s';
		}

		var durString  = dur.toLowerCase(),
			isMS       = durString.indexOf( 'ms' ) >= 0,
			numberNum  = durString.replace( 'ms', '' ).replace( 's', '' ),
			animeSpeed = isMS ? numberNum : numberNum * 1000;
	
		
		//Gets the party started.
		formReset();
		
		//Display the target
		setTimeout( function() {
			$formTarget.addClass( 'is-active' );
		}, parseFloat( dur ) * 1000 );
		

		// Show next form on continue click
		$( document ).on( 'click', '.uix-form-progress__target .go-step:not(.disable)', function( e ) {
			e.preventDefault();
			var $sections = $( this ).parents( '.uix-form-progress__target__step' );
			$( document ).UixFormProgressToNext({ 
				'selector'   : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget' : $formTarget,
				'indicator'  : '.uix-form-progress .uix-form-progress__indicator',
				'index'      : $sections.index() + 1
			});
			

			//Scroll Top
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y        : 0,
					autoKill : false
				},
				ease: Power2.easeOut
			});	
			
			
		});
		
		

		// Reset form on reset button click
		$( document ).on( 'click', '.uix-form-progress__target .go-reset', function( e ) {
			e.preventDefault();
			formReset();
		});
		

		/*
		 * Resets the form back to the default state.
		 *
		 * @return {Void}
		 */
		function formReset() {
			
			$( document ).UixFormProgressToNext({ 
				'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
				'formTarget'       : $( '.uix-form-progress__target' ),
				'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
				'index'            : 0
			});
		
			
		}
			    
		
    };

    module.components.pageLoaded.push( module.FORM_PROGRESS.pageLoaded );
	

	return class FORM_PROGRESS {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


