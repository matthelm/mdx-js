fs = require 'fs'
Snockets = require 'snockets'

task 'build', 'builds framework and app', (options) ->
  buildDir 'mdx-js'
  buildDir 'first_test', "test/src", "test/lib"

buildDir = (name, input="src", output="lib") ->
	filename = "#{input}/#{name}"

	doBuild = ->
		console.log 'building', filename

		snockets = new Snockets
		js = snockets.getConcatenation "#{filename}.coffee", async: false
		fs.writeFileSync "#{output}/#{name}.js", js

	doBuild()
