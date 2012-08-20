Ext.define('VBI.Workspace.view.ExperimentView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.experimentview',
	store: 'Genomes',
	requires: ['VBI.Workspace.view.ExperimentToolbar', 'VBI.Workspace.view.columns.Experiment'],
	id: 'workspace_experimentview',
	border: 0,
	columns: Ext.create('VBI.Workspace.view.columns.Experiment'),
	dockedItems: [{
		xtype: 'experimenttoolbar',
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
