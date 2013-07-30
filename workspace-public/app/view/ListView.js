Ext.define('VBI.Workspace.view.ListView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.listview',
	requires: [
		'VBI.Workspace.view.toolbar.ExpressionExperiment',
		'VBI.Workspace.view.columns.ExpressionExperiment',
		'VBI.Workspace.view.selection.CheckboxModel'
	],
	border: false,
	layout: 'border',
	items: [{
		xtype: 'panel',
		region: 'center',
		layout: 'card',
		activeItem: 'experimentview',
		id: 'workspace_listview_expview',
		flex: 1,
		border: false,
		items: [{
			// list of expression experiments
			itemId: 'experimentview',
			xtype: 'gridpanel',
			store: 'ExpressionExperiments',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
			stateful: true,
			stateId: 'experimentlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'expressionexperimenttoolbar',
				dock: 'top'
			}, {
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionExperiments',
				dock: 'bottom'
			}],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {itemId:'checkBOX'})
		}]
	}]
});
