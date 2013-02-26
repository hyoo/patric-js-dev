Ext.define('VBI.Workspace.view.DetailView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.detailview',
	requires: [
		'VBI.Workspace.view.group.GroupInfoEditor', 'VBI.Workspace.view.group.ExperimentInfoEditor',
		'VBI.Workspace.view.toolbar.Group', 'VBI.Workspace.view.toolbar.ExpressionSample',
		'VBI.Workspace.view.columns.Genome', 'VBI.Workspace.view.columns.Feature',
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
		activeItem: 'groupinfo',
		items:[{
			itemId: 'groupinfo',
			xtype: 'groupinfoeditor',
			id: 'workspace_groupinfoeditor'
		}, {
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
		activeItem: 'group',
		items: [{
			itemId: 'group',
			xtype: 'grouptoolbar'
		}, {
			itemId: 'feature',
			xtype: 'featuretoolbar'
		}, {
			itemId: 'genome',
			xtype: 'genometoolbar'
		}, {
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
		activeItem: 'genomeview',
		items: [{
			// feature group detail view
			itemId: 'featureview',
			xtype: 'gridpanel',
			store: 'Features',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Feature'),
			stateful: true,
			stateId: 'featurelist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'Features',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {id:'checkBOX'})
		}, {
			// genome group detail view
			itemId: 'genomeview',
			xtype: 'gridpanel',
			store: 'Genomes',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Genome'),
			stateful: true,
			stateId: 'genomelist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'Genomes',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {id:'checkBOX'})
		}, {
			// expression experiment group detail view
			itemId: 'experimentview',
			xtype: 'gridpanel',
			store: 'ExpressionExperiments',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
			stateful: true,
			stateId: 'experimentlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionExperiments',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {id:'checkBOX'})
		}, {
			// expression experiment detail view
			itemId: 'experimentdetail',
			xtype: 'gridpanel',
			store: 'ExpressionSamples',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionSample'),
			stateful: true,
			stateId: 'comparisonlist',
			stateEvents: ['hide', 'show', 'columnmove', 'columnresize'],
			selModel: Ext.create('VBI.Workspace.view.selection.CheckboxModel', {id:'checkBOX'})
		}]
	}]
});
