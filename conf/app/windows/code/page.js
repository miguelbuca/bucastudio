function onDocumentLoad( event ) {

	var pathname = window.location.pathname;

	
	// handle code snippets formatting

	var elements = document.getElementsByTagName( 'code' );

	for ( var i = 0; i < elements.length; i ++ ) {

		var element = elements[ i ];


		text = element.textContent.trim();
		text = text.replace( /^\t\t/gm, '' );

		element.textContent = text;

	}


	// Syntax highlighting


	var styleBase = document.createElement( 'link' );
	styleBase.href = 'code/prettify.css';
	styleBase.rel = 'stylesheet';

	var styleCustom = document.createElement( 'link' );
	styleCustom.href = 'code/threejs.css';
	styleCustom.rel = 'stylesheet';

	document.head.appendChild( styleBase );
	document.head.appendChild( styleCustom );

	var prettify = document.createElement( 'script' );
	prettify.src = 'code/prettify.js';

	prettify.onload = function () {

		var elements = document.getElementsByTagName( 'code' );

		for ( var i = 0; i < elements.length; i ++ ) {

			var e = elements[ i ];
			e.className += ' prettyprint';

		}

		prettyPrint();

	};

	document.head.appendChild( prettify );

};

document.addEventListener( 'DOMContentLoaded', onDocumentLoad, false ); 
