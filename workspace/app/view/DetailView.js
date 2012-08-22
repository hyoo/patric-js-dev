Ext.define('VBI.Workspace.view.DetailView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.detailview',
	requires: ['VBI.Workspace.view.group.GroupInfoEditor',
		'VBI.Workspace.view.group.DetailToolbar',
		'VBI.Workspace.view.toolbar.Group',
		'VBI.Workspace.view.columns.Genome', 
		'VBI.Workspace.view.columns.Feature'],
	id: 'workspace_detailview',
	border: false,
	layout: 'border',
	items: [{
		region: 'west',
		xtype: 'groupinfoeditor'
	}, {
		region: 'north',
		xtype: 'panel',
		layout: 'card',
		activeItem: 'tbar_group',
		items: [{
			itemId: 'tbar_group',
			xtype: 'grouptoolbar',
			height: 80
		}]
	}, {
		region: 'center',
		xtype: 'panel',
		id: 'workspace_detailview_grid',
		layout: 'card',
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
			itemId: 'experiment_group'
		}, {
			// expression experiment detail view
			itemId: 'experiment_detail'
		}]
	}]
});
