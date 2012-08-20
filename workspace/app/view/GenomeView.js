Ext.define('VBI.Workspace.view.GenomeView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomeview',
	store: 'Genomes',
	requires: ['VBI.Workspace.view.GenomeToolbar', 'VBI.Workspace.view.columns.Genome'],
	id: 'workspace_genomeview',
	border: 0,
	columns: Ext.create('VBI.Workspace.view.columns.Genome'),
	dockedItems: [{
		xtype: 'genometoolbar',
		height: 70,
		dock: 'top'
	}, {
		xtype: 'patricpagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel')
});
