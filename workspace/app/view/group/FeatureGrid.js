Ext.define('VBI.Workspace.view.group.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	store: 'Features',
	id: 'workspace_featuregrid',
	border: 0,
	requires: ['VBI.Workspace.view.columns.Feature'],
	columns: Ext.create('VBI.Workspace.view.columns.Feature'),
	dockedItems: [{
		xtype: 'patricpagingtoolbar',
		store: 'Features',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel')
});
