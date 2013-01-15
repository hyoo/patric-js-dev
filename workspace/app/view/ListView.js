Ext.define('VBI.Workspace.view.ListView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.listview',
	requires: [
		'VBI.Workspace.view.ColumnBrowser',
		'VBI.Workspace.view.toolbar.Feature', 'VBI.Workspace.view.columns.Feature',
		'VBI.Workspace.view.toolbar.Genome', 'VBI.Workspace.view.columns.Genome',
		'VBI.Workspace.view.toolbar.ExpressionExperiment', 'VBI.Workspace.view.columns.ExpressionExperiment'
	],
	border: false,
	layout: 'border',
	items: [{
		xtype: 'columnbrowser', //column browser
		title: 'Column Browser',
		width: 200,
		region: 'west',
		collapsible: true,
		resizable: true
	},
	{
		xtype: 'panel',
		region: 'center',
		layout: 'card',
		activeItem: 'featureview',
		id: 'workspace_listview',
		flex: 1,
		border: false,
		items: [{
			// list of features
			itemId: 'featureview',
			xtype: 'gridpanel',
			store: 'Features',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Feature'),
			stateful: true,
			stateId: 'featurelist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'featuretoolbar',
				dock: 'top'
			}, {
				xtype: 'patricpagingtoolbar',
				store: 'Features',
				dock: 'bottom'
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}, {
			// list of genomes
			itemId: 'genomeview',
			xtype: 'gridpanel',
			store: 'Genomes',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Genome'),
			stateful: true,
			stateId: 'genomelist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'genometoolbar',
				dock: 'top'
			}, {
				xtype: 'patricpagingtoolbar',
				store: 'Genomes',
				dock: 'bottom'
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}, {
			// list of expression experiments
			itemId: 'experimentview',
			xtype: 'gridpanel',
			store: 'ExpressionExperiments',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
			stateful: true,
			stateId: 'expressionexperimentlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'expressionexperimenttoolbar',
				dock: 'top'
			}, {
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionExperiments',
				dock: 'bottom'
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}]
	}]
});
