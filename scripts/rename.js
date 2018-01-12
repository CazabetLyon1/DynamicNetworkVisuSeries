// Charge le module de manipulation de fichiers
var fs = require('fs');

let arborescence = {
	"root": './donnees/parsed_data/',
	"series": ['BB/', 'GoT/', 'HoC/'],
	"subdirectory": ['_dyn_ns/', '_dyn_ts10/', '_dyn_ts40/'],
	"targets": []
};

arborescence.series.forEach(function(series_name) {
	// console.log('Début ' + series_name + '...');
	let serie = {
		"serie": series_name,
		"subdir": []
	};
	arborescence.subdirectory.forEach(function(sub_dir) {
		// console.log('	' + series_name + sub_dir + '...');
		let current_dir = arborescence.root + series_name + sub_dir;
		let current_dir_content = fs.readdirSync(current_dir);
		// console.log('	Trouvé ' + current_dir_content.length + ' fichiers :');
		// current_dir_content.forEach( (x) => (console.log('		' + x)) );
		serie.subdir = serie.subdir.concat([{
			"name": sub_dir,
			"content": current_dir_content
		}]);
	});
	arborescence.targets = arborescence.targets.concat([serie]);
	// console.log('Fin ' + series_name);
});
/*
arborescence.targets = [
	{
		"serie": 'BB/',
		"subdir": [
			{
				"name": '_dyn_ns/',
				"content": ['...', '.....'] 
			}
		]
	}
]
*/
console.log('Début renommage...');
arborescence.targets.forEach(function(series_name) {
	series_name.subdir.forEach(function(sub_dir) {
		for (let i = 0; i < sub_dir.content.length; i++) {
			let previousname = arborescence.root + series_name.serie + sub_dir.name + sub_dir.content[i];
			let newname = arborescence.root + series_name.serie + sub_dir.name + i + '.json';
			console.log(previousname + '\n' + '---> ' + newname + '\n\n');
			fs.renameSync(previousname, newname);
		}
	});
});