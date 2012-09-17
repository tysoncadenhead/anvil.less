var should = require( "should" );
var api = require( "anvil.js" );
var Harness = api.PluginHarness;

var harness = new Harness( "anvil.less", "./" ),
		tests = [];

harness.addFile( "./src/test.less",
"@base: #f938ab;" +
".box-shadow(@style, @c) when (iscolor(@c)) {" +
"  box-shadow:         @style @c;" +
"  -webkit-box-shadow: @style @c;" +
"  -moz-box-shadow:    @style @c;" +
"}" +
".box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {" +
"  .box-shadow(@style, rgba(0, 0, 0, @alpha));" +
"}" +
".box {" +
"  color: saturate(@base, 5%);" +
"  border-color: lighten(@base, 30%);" +
"  div { .box-shadow(0 0 5px, 30%) }" +
"}");

harness.expectFile( "./lib/test.css",
".box {\n  color: #fe33ac;\n  border-color: #fdcdea;\n}\n.box div {\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n");

describe( "when compiling LESS", function() {

	before( function( done ) {
		harness.build(
			function( x, y ) {
				y.should.equal( x );
			},
			function( results ) {
				tests = results;
				done();
			}
		);
	} );

	it( "should produce expected output", function() {
		_.each( tests, function( test ) {
			test.call();
		} );
	} );

} );