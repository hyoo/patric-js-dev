Ext.define('VBI.Workspace.model.ExpressionSample', {
	extend: 'Ext.data.Model',
	idProperty: 'pid',
	fields: [
		'accession', {name:'channels', type:'int'}, 'condition', {name:'eid', type:'int'}, {name:'expmean', type:'float'},
		'expname', {name:'expstddev', type:'float'}, {name:'genes', type:'int'}, 'mutant', 'organism', 
		'pid', 'platform', 'release_date', 'samples', {name:'sig_log_ratio', type:'int'}, {name:'sig_z_score', type:'int'},
		'strain', 'timepoint',
		'organism', 'source'
	]
});