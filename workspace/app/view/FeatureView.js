Ext.define('VBI.Workspace.view.FeatureView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featureview',
	store: 'Features',
	requires: ['VBI.Workspace.view.FeatureToolbar', 'VBI.Workspace.view.columns.Feature'],
	id: 'workspace_featureview',
	border: 0,
	columns: Ext.create('VBI.Workspace.view.columns.Feature'),
	dockedItems: [{
		xtype: 'featuretoolbar',
		height: 70,
		dock: 'top'
	}, {
		xtype: 'patricpagingtoolbar',
		store: 'Features',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel')
});
