Ext.define('VBI.Workspace.model.ExpressionExperiment', {
	extend: 'Ext.data.Model',
	idProperty: 'pid',
	fields: ['accession',
		{name:'channels', type:'int'},
		'condition',
		{name:'eid', type:'int'},
		{name:'expmean', type:'float'},
		'expname',
		{name:'expstddev', type:'float'},
		{name:'genes', type:'int'},
		'mutant', 'organism',
		{name:'pid', type:'int'},
		'platform',	
		'samples',
		{name:'sig_log_ratio', type:'int'},
		{name:'sig_z_score', type:'int'},
		'strain', 'timepoint'
	]
});