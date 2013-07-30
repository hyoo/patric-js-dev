Ext.define('VBI.Workspace.view.DetailView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.detailview',
	requires: [
		'VBI.Workspace.view.group.ExperimentInfoEditor',
		'VBI.Workspace.view.toolbar.ExpressionSample',
		'VBI.Workspace.view.selection.CheckboxModel'
	],
	border: false,
	layout: 'border',
	items: [{
		itemId: 'panel_info',
		region: 'west',
		xtype: 'panel',
		layout: 'card',
		border: false,
		activeItem: 'experimentinfo',
		items:[{
			itemId: 'experimentinfo',
			xtype: 'experimentinfoeditor',
			id: 'workspace_experimentinfoeditor'
		}]
	}, {
		itemId: 'panel_toolbar',
		region: 'north',
		xtype: 'panel',
		layout: 'card',
		border: false,
		activeItem: 'experiment',
		items: [{
			itemId: 'experiment',
			xtype: 'expressionexperimenttoolbar',
			id: 'expressionexperimenttoolbar'
		}, {
			itemId: 'sample',
			xtype: 'expressionsampletoolbar'
		}]
	}, {
		itemId: 'panel_grid',
		region: 'center',
		xtype: 'panel',
		layout: 'card',
		border: false,
		activeItem: 'experimentview',
		items: [{
			// expression experiment group detail view
			itemId: 'experimentview',
			xtype: 'gridpanel',
			store: 'ExpressionExperiments',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
			stateId: 'experimentlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionExperiments',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {itemId:'checkBOX'})
		}, {
			// expression experiment detail view
			itemId: 'experimentdetail',
			xtype: 'gridpanel',
			store: 'ExpressionSamples',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionSample'),
			stateId: 'comparisonlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {itemId:'checkBOX'})
		}]
	}]
});
