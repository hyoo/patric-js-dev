Ext.define('VBI.Workspace.view.GroupView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupview',
	id: 'workspace_groupview',
	requires: [
		'VBI.Workspace.view.toolbar.Group',
		'VBI.Workspace.view.group.Browser'
	],
	border: true,
	//layout: 'card',
	//activeItem: 'browser',
	dockedItems:[{
		xtype: 'grouptoolbar',
		height: 80
	}],
	items:[{
		xtype: 'groupbrowser'
	}]
});
