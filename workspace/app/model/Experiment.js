Ext.define('VBI.Workspace.model.Experiment', {
	extend: 'Ext.data.Model',
	idProperty: 'exp_id',
	fields: ['source', 'title', 'exp_id', 'pubmed', 'sample', 'organism']
});
