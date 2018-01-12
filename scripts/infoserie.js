// var graphml = require('graphml-js');
var fs = require ('fs');

// Sources
let sources = {
	"data_directory": './donnees/data/',
	"series": ['BB', 'GoT', 'HoC'],
	"subdirectory": ['ns', 'ts10', 'ts40'],
	"destination": './donnees/parsed_data/'
};

function supprimerDoublons (arr) {
	let r = [];
	for (let i = 0; i < arr.length; i++) {
		if (!r.includes(arr[i])) {
			r.push(arr[i]);
		}
	}
	return r;
}

sources.series.forEach(function(series_name) {
	sources.subdirectory.forEach(function(subdir) {
		let current_dir = sources.data_directory + series_name + '/' + subdir + '/';
		let current_dir_content = fs.readdirSync(current_dir).map((x) => (x.split('_')[1]));
		let nb_episodes = [];
		let str = 'S00E00';
		for (let i = 0; i < current_dir_content.length; i++) {
			if (parseInt(current_dir_content[i].substring(1,3)) !== parseInt(str.substring(1,3))) {
				str = current_dir_content[i];
				nb_episodes = nb_episodes.concat([
					{
						"saison": parseInt(str.substring(1,3)),
						"episodes": supprimerDoublons(current_dir_content.filter((x) => (x.substring(1,3) === str.substring(1,3)))).length,
						"premier_fichier": i + ".json"
					}
				]);
			}
		}
		let result = {
			"serie": series_name,
			"nb_saisons": nb_episodes.length,
			"nb_episodes": nb_episodes
		}
		console.log(result);
		let dest_file = sources.destination + series_name + '/_dyn_' + subdir + '/info.json';
		fs.writeFileSync(dest_file, JSON.stringify(result), (err) => {
			if (err) throw err;
			console.log(dest_file + ' créé correctement !');
		});

		
		// sources.filenames = sources.filenames.concat(current_dir_content.map((x) => ({
		// 	"subdir": subdir,
		// 	"serie": series_name,
		// 	"file": x
		// })));
		// sources.full_paths = sources.full_paths.concat(current_dir_content.map((x) => current_dir + x));
	});
});