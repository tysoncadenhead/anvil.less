/*
	anvil.less - LESS plugin for anvil.js
	version: 0.0.1
	author: [object Object]
	copyright: 2012
	license: Dual licensed 
			 MIT (http://www.opensource.org/licenses/mit-license)
			 GPL (http://www.opensource.org/licenses/gpl-license)
*/
var less = require( "less" );

module.exports = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.less",
		config: {
			"options": {}
		},

		configure: function( config, command, done ) {
			anvil.addCompiler( ".less", this );
			done();
		},

		compile: function( content, done ) {
			try {
				var compile = less.render(
					content,
					anvil.config[ this.name ].options || {},
					function( err, css ) {
						if( err ) {
							done( "", err );
						} else {
							done( css );
						}
					}
				);
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".less", ".css" );
		}
	} );
};