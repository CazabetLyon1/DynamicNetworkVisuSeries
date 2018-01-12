var graphml = require('graphml-js');
var fs = require('fs');
var data_path = 'donnees/BB/BB_dyn_ns/BB_S03E13_636.graphml';
var json_path = 'tests/test.json';

var graphmlText = fs.readFileSync(data_path);
var parser = new graphml.GraphMLParser();

parser.parse(graphmlText, function(err, graph) {
	console.log(graph);
	fs.writeFile(json_path, JSON.stringify(graph), (err) => {
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});
});