Ext.define('VBI.Workspace.view.ListView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.listview',
	requires: [
		'VBI.Workspace.view.ColumnBrowser',
		'VBI.Workspace.view.toolbar.Feature', 'VBI.Workspace.view.columns.Feature',
		'VBI.Workspace.view.toolbar.Genome', 'VBI.Workspace.view.columns.Genome',
		'VBI.Workspace.view.toolbar.ExpressionExperiment', 'VBI.Workspace.view.columns.ExpressionExperiment'
	],
	height: '100%',
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
			stateful: false,
			flex: 1,
			border: true,
			items: [{
				// list of features
				itemId: 'featureview',
				xtype: 'gridpanel',
				id: 'workspace_featureview', //??
				store: 'Features',
				border: false,
				columns: Ext.create('VBI.Workspace.view.columns.Feature'),
				dockedItems: [{
					xtype: 'featuretoolbar',
					dock: 'top'
				}, {
					xtype: 'patricpagingtoolbar',
					store: 'Features',
					dock: 'bottom',
					displayInfo: true
				}],
				selModel: Ext.create('Ext.selection.CheckboxModel')
			}, {
				// list of genomes
				itemId: 'genomeview',
				xtype: 'gridpanel',
				store: 'Genomes',
				id: 'workspace_genomeview', //?
				border: false,
				columns: Ext.create('VBI.Workspace.view.columns.Genome'),
				dockedItems: [{
					xtype: 'genometoolbar',
					dock: 'top'
				}, {
					xtype: 'patricpagingtoolbar',
					store: 'Genomes',
					dock: 'bottom',
					displayInfo: true
				}],
				selModel: Ext.create('Ext.selection.CheckboxModel')
			}, {
				// list of expression experiments
				itemId: 'experimentview',
				xtype: 'gridpanel',
				store: 'ExpressionExperiments',
				id: 'workspace_experimentview', //??
				border: false,
				columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
				dockedItems: [{
					xtype: 'experimenttoolbar',
					dock: 'top'
				}, {
					xtype: 'patricpagingtoolbar',
					store: 'Experiments',
					dock: 'bottom',
					displayInfo: true
				}],
				selModel: Ext.create('Ext.selection.CheckboxModel')
			}]
		}
	]
});
