Ext.define('VBI.Workspace.model.ExpressionExperiment', {
	extend: 'Ext.data.Model',
	idProperty: 'expid',
	fields: [ 	
		'source', 'accession', 'author', 'description',
		{name:'eid', type:'int'},
		'expid',
		'growthcond', 'institution', 'modification', 'organism', 'pi',
		{name:'platforms', type:'int'},
		{name:'pmid', type:'int'},
		{name:'samples', type:'int'},
		'strain', 'substrain', 'title', 'timeseries', 'treatment'
	]
});
