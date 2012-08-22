Ext.define('VBI.Workspace.view.DetailView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.detailview',
	requires: [
		'VBI.Workspace.view.group.GroupInfoEditor',
		'VBI.Workspace.view.group.ExperimentInfoEditor',
		'VBI.Workspace.view.toolbar.Group',
		'VBI.Workspace.view.columns.Genome', 
		'VBI.Workspace.view.columns.Feature'],
	id: 'workspace_detailview',
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
			xtype: 'groupinfoeditor'
		}, {
			itemId: 'experimentinfo',
			xtype: 'experimentinfoeditor'
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
			xtype: 'grouptoolbar',
			height: 80
		}, {
			itemId: 'feature',
			xtype: 'featuretoolbar'
		}, {
			itemId: 'genome',
			xtype: 'genometoolbar'
		}, {
			itemId: 'experiment',
			xtype: 'experimenttoolbar'
		}]
	}, {
		itemId: 'panel_grid',
		region: 'center',
		xtype: 'panel',
		layout: 'card',
		border: false,
		activeItem: 'genome_group',
		items: [{
			// feature group detail view
			itemId: 'feature_group',
			xtype: 'grid',
			store: 'Features',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Feature'),
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'Features',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}, {
			// genome group detail view
			itemId: 'genome_group',
			xtype: 'grid',
			store: 'Genomes',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.Genome'),
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'Genomes',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}, {
			// expression experiment group detail view
			itemId: 'experiment_group',
			xtype: 'grid',
			store: 'ExpressionExperiments',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionExperiment'),
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionExperiments',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}, {
			// expression experiment detail view
			itemId: 'experiment_detail',
			xtype: 'grid',
			store: 'ExpressionSamples',
			border: false,
			columns: Ext.create('VBI.Workspace.view.columns.ExpressionSample'),
			dockedItems: [{
				xtype: 'patricpagingtoolbar',
				store: 'ExpressionSamples',
				dock: 'bottom',
				displayInfo: true
			}],
			selModel: Ext.create('Ext.selection.CheckboxModel')
		}]
	}]
});
