"use strict";

// Charge le module GraphML.js
var graphml = require('graphml-js');

// Charge le module de manipulation de fichiers
var fs = require('fs');

// Charge lodash
var _ = require('lodash');

// Mesure de performance
/**
 * Retourne le résultat de f(...args) et affiche son temps d'exécution dans la console
 * 
 * @param {function} f La fonction à exécuter
 * @param {*} ...args Paramètres de la fonction f
 */
var timed = (f) => (...args) => {
	var start = (new Date()).getTime();
	var result = f(...args);
	var end = (new Date()).getTime();
	console.log("Execution time : " + ((end - start) / 1000) + " s");
	return result;
}

// Combinateur
var fixMemo = (fn, cache = {}) => {
	return function (n) {
		if (!cache[n]) {
			cache[n] = fn(fixMemo(fn, cache))(n);
		}
		return cache[n];
	}
}

var supprimerDoublons = (arr) => {
	let r = [];
	for (let i = 0; i < arr.length; i++) {
		if (!r.includes(arr[i])) {
			r.push(arr[i]);
		}
	}
	return r;
}

function supprimerDoublonsGraphes(arr) {
	if (arr.length === 0) {
		return arr;
	}
	let r = [ arr[0] ];
	for (let i = 1; i < arr.length; i++) {
		let found = false;
		let j = 0;
		while (j < r.length) {
			if (_.isEqual(r[j], arr[i])) {
				found = true;
				break;
			}
			j++;
		}
		if (!found) {
			r.push(arr[i]);
		}
	}
	return r;
}

function GraphSerie(_series_name, _series_dir_path, _subdir_struct = ['ns', 'ts10', 'ts40']) {
	console.log("- Chargement données sur la série " + _series_name + "...");
	let data = {};
	_subdir_struct.forEach(function(subdir) {
		console.log("- Lecture contenu du sous-répertoire " + subdir + "...");
		let filenames = fs.readdirSync(_series_dir_path + subdir);
		let subdir_data = [];
		for (let i = 0; i < filenames.length; i++) {
			console.log("- Chargement " + _series_dir_path + subdir + '/' + filenames[i] + "...");
			let graphmlText = fs.readFileSync(_series_dir_path + subdir + '/' + filenames[i]);
			let parser = new graphml.GraphMLParser();
			parser.parse(graphmlText, function(err, graph) {
				subdir_data = subdir_data.concat([
					{
						"filename": filenames[i],
						"graph": graph
					}
				]);
			});
		}
		data[subdir] = subdir_data;
	});
	console.log("- Chargement données terminé");

	console.log("- Début formatage...");
	this.nom = _series_name;
	console.log("nom : " + this.nom);

	// Fonctions utilitaires
	let getSaison = (str) => (parseInt(str.substring(1,3)));
	let getEpisode = (str) => (parseInt(str.substring(4)));
	
	this.total_saisons = supprimerDoublonsGraphes(data.ns.map( (x) => getSaison(x.filename.split('_')[1]) )).length;
	console.log("total_saisons : " + this.total_saisons);
	this.total_episodes = supprimerDoublonsGraphes(data.ns.map( (x) => (x.filename.split('_')[1]) )).length;
	console.log("total_épisodes : " + this.total_episodes);

	let _saison = [];
	for(let i = 0; i < this.total_saisons; i++) {
		let _nb_episodes = supprimerDoublonsGraphes(data.ns.filter( (x) => (getSaison(x.filename.split('_')[1]) === (i + 1)) )
													.map( (x) => getEpisode(x.filename.split('_')[1]) )).length;
		let _episode = [];
		for (let j = 0; j < _nb_episodes; j++) {
			let _dyn_ns = data.ns.filter( (x) => ( (getSaison(x.filename.split('_')[1]) === (i + 1)) && (getEpisode(x.filename.split('_')[1]) === (j + 1)) ) ).map( (x) => (x.graph) );
			let _dyn_ts10 = data.ts10.filter( (x) => ( (getSaison(x.filename.split('_')[1]) === (i + 1)) && (getEpisode(x.filename.split('_')[1]) === (j + 1)) ) ).map( (x) => (x.graph) );
			let _dyn_ts40 = data.ts40.filter( (x) => ( (getSaison(x.filename.split('_')[1]) === (i + 1)) && (getEpisode(x.filename.split('_')[1]) === (j + 1)) ) ).map( (x) => (x.graph) );
			// Suppression doublons de graphes
			_dyn_ns = supprimerDoublonsGraphes(_dyn_ns);
			_dyn_ts10 = supprimerDoublonsGraphes(_dyn_ts10);
			_dyn_ts40 = supprimerDoublonsGraphes(_dyn_ts40);
			
			_episode.push(
				{
					"dyn_ns": _dyn_ns,
					"dyn_ts10": _dyn_ts10,
					"dyn_ts40": _dyn_ts40
				}
			);
		}
		_saison.push(
			{
				"num_saison": i + 1,
				"nb_episodes": _nb_episodes,
				"episode": _episode
			}
		);
	}
	this.saison = _saison;
	console.log(this);
}


/*

data = {
	ns: [
		{
			filename: 'BB_S01E01_001.graphml',
			graph: {
				nodes: [ ... ],
				edges: [ ... ]
			}
		}
		,
		...
	]
	,
	ts10: [ ... ],
	ts40: [ ... ]
}

BB = {
	nom: 'BB',
	total_saisons: 3,
	total_episodes: 33,
	saison: [
		{
			num_saison: 1,
			nb_episodes: 7,
			episode: [
				{
					dyn_ns: [
						// Graph
						{
							nodes: [ ... ],
							edges: [ ... ]
						}
						,
						...
					],
					dyn_ts10: [
						// Graph
						{
							nodes: [ ... ],
							edges: [ ... ]
						}
						,
						...
					],
					dyn_ts40: [
						// Graph
						{
							nodes: [ ... ],
							edges: [ ... ]
						}
						,
						...
					]
				}
				,
				...
			]
		}
		,
		...
	]
}

*/
let BB1 = new GraphSerie('BB', './donnees/data/BB/');
let BB2 = new GraphSerie('BB', './donnees/data/BB/');
console.log(BB1 == BB2);
console.log(BB1 === BB2);
console.log(_.isEqual(BB1, BB2));