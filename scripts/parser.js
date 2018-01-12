/*****************
	Script node.js pour convertir les donnees .graphml en .json
******************/

// Charge le module GraphML.js
var graphml = require('graphml-js');

// Charge le module de manipulation de fichiers
var fs = require('fs');

// Sources
let sources = {
	"data_directory": './donnees/',
	"series": ['BB', 'GoT', 'HoC'],
	"subdirectory": ['_dyn_ns', '_dyn_ts10', '_dyn_ts40'],
	"full_paths": [],
	"filenames": [],
	"destination": './donnees/parsed_data/'
};

sources.series.forEach(function(series_name) {
	sources.subdirectory.forEach(function(subdir) {
		let current_dir = sources.data_directory + series_name + '/' + series_name + subdir + '/';
		let current_dir_content = fs.readdirSync(current_dir);
		sources.filenames = sources.filenames.concat(current_dir_content.map((x) => ({
			"subdir": subdir,
			"serie": series_name,
			"file": x
		})));
		sources.full_paths = sources.full_paths.concat(current_dir_content.map((x) => current_dir + x));
	});
});
console.log(sources.full_paths.length + ' fichiers à convertir...');

// let data_directory = './donnees/';
// let series = ['BB', 'GoT', 'HoC'];
// let subdirectory = ['_dyn_ns', '_dyn_ts10', '_dyn_ts'];

for (let i = 0; i < sources.full_paths.length; i++) {
	let graphmlText = fs.readFileSync(sources.full_paths[i]);
	let parser = new graphml.GraphMLParser();
	console.log(i + ' ème fichier : ' + sources.full_paths[i] + ' ...');
	parser.parse(graphmlText, function(err, graph) {
		// Destination
		// let dest_file = sources.destination + sources.filenames[i].file.replace('.graphml', sources.filenames[i].subdir + '.json');
		let dest_file = sources.destination + sources.filenames[i].serie + '/' + sources.filenames[i].subdir + '/' + sources.filenames[i].file.replace('.graphml', '.json');
		console.log('conversion en ' + dest_file + ' ...');
		fs.writeFileSync(dest_file, JSON.stringify(graph), (err) => {
			if (err) throw err;
			console.log(dest_file + ' créé correctement !');
		});
	});
	console.log('fini !');
}

console.log('fini !');

// for (let i = 0; i < 3; i++) {
// 	let current_file = data_directory + series[i] + '/' + series[i] + '_cum.graphml';
// 	let graphmlText = fs.readFileSync(current_file);
// 	let parser = new graphml.GraphMLParser();

// 	parser.parse(graphmlText, function(err, graph) {
// 		// console.log(graph);
// 		// Fichier JSON créé
// 		let dest_file = dest + series[i] + '_cum.json';
// 		fs.writeFile(dest_file, JSON.stringify(graph), (err) => {
// 			if (err) throw err;
// 			console.log(dest_file + ' créé correctement !');
// 		});
// 	});
// }
