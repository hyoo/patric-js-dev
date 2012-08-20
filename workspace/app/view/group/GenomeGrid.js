Ext.define('VBI.Workspace.view.group.GenomeGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomegrid',
	store: 'Genomes',
	id: 'workspace_genomegrid',
	requires: ['VBI.Workspace.view.columns.Genome'],
	border: 0,
	columns: Ext.create('VBI.Workspace.view.columns.Genome'),
	dockedItems: [{
		xtype: 'patricpagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel')
});
