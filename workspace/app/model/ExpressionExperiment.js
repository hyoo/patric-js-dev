Ext.define('VBI.Workspace.model.ExpressionExperiment', {
	extend: 'Ext.data.Model',
	idProperty: 'expid',
	fields: [ 	
		'accession', 'author', 'condition', 'description', {name:'eid', type:'int'},
		'expid', 'genes', 'institution', 'mutant', 'organism',
		'pi', {name:'platforms', type:'int'}, {name:'pmid', type:'int'}, 'release_date', {name:'samples', type:'int'},
		'strain', 'timeseries', 'title',
		'source', 'origFileName', 'desc', 'cdate', 'mdate'
	]
});
