var less = require( "less" );

module.exports = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.less",
		config: {
			"options": {}
		},

		configure: function( config, command, done ) {

			anvil.config[ "anvil.combiner" ].patterns.push({
				extensions: [ ".less" ],
				alternateExtensions: [ ".css" ],
				find: "/([@]).?import[(]?.?[\"'].*[\"'].?[)]?/g",
				replace: "/([ \t]*)([@]).?import[(]?.?[\"']replace[\"'].?[)]?/g"
			});

			anvil.addCompiler( ".less", this );
			done();
		},

		compile: function( content, done ) {
			try {
				anvil.log.debug(content);
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