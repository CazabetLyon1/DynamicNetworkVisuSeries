var G = new jsnx.Graph();
G.addNodesFrom([
	[1, {color: 'red'}],
	[2, {color: 'green'}],
	[3, {color: 'white'}],
	[5, {color: 'white'}],
	[7, {color: 'white'}]
]);

G.addEdgesFrom([[1,2], [1,3], [2,3], [1,4], [2,4], [3,4], [4,5], [4,7], [3,6], [4,6], [5,6], [5,7, [6,7]]]);

// `jsnx.draw` accept a graph and configuration object
jsnx.draw(G, {
	element: '#demo-canvas',
	height: '500',
	withLabels: true,
	nodeStyle: {
		fill: function(d) {
			return d.data.color;
		}
	}
});
