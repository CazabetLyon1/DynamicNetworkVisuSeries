NOTE : à causes de limitations de GitHub, certaines librairies utilisées ainsi que les données transformées ne sont pas disonibles sur GiHub. Vous pouvez me contacter (Remy Cazabet), pour obtenir les données manquantes


# Composition du groupe

- **JASSIGNEUX Marie**	(*N° étudiant* : 11408106)
- **GRANJON Julien**	(*N° étudiant* : 11509496)
- **ANDRIAMARO Randy**	(*N° étudiant* : 11512256)


# Objectifs

L'objectif du projet était de proposer une visualisation dynamique de l'évolution du réseau.



# Installation

Le site web en lui-même ne requiert aucune installation particulière. Il faut juste veiller à bien être connecté à Internet pour que le navigateur puisse charger correctement les dépendances externes du projet.

Pour utiliser les scripts de conversion des données, il faut utiliser [Node.js](https://nodejs.org/en/) qui permet d'exécuter du code Javascript en dehors du contexte du navigateur. En effet les scripts de conversion des données utilisent le module de manipulation du système de fichiers fourni par le runtime Node.js.

Il suffit ensuite de lancer l'exécution du script dans la console Node.js avec les commandes 
```
node scripts/parser.js
node scripts/rename.js
```



# Bibliothèques utilisées

- [**JSNetworkX**](http://jsnetworkx.org/)

Utilisée pour la visualisation et les calculs effectués dans le navigateur sur les graphes

- [**D3.js**](https://d3js.org/) (*v3.5.17*)

Utilisée en complément de la librairie JSNetworkX qui en dépend pour la visualisation

- [**Bootstrap**](https://getbootstrap.com/)

Utilisée principalement pour le design graphique du site web

- [**jQuery**](https://jquery.com/)

Utilisée pour la gestion des événements

- [**bootstrap-slider**](https://github.com/seiyria/bootstrap-slider)

Utilisée pour le curseur et la barre de défilement du graphe

- [**Font Awesome**](http://fontawesome.io/)

Ensemble d'icônes utilisés en complément de Bootstrap

- [**Screenfull.js**](https://github.com/sindresorhus/screenfull.js/)

Module utilisé pour implémenter l'affichage en plein écran du graphe

- [**GraphML-js**](https://github.com/anderspitman/graphml-js)

Parser utilisé pour convertir les données initialement recueillies au format `.graphml` en fichiers `JSON`

- [**Node.js**](https://nodejs.org/en/)

Environnement d'exécution utilisé pour le formatage des données
