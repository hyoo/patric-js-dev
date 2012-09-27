Ext.define('VBI.Workspace.view.GroupView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupview',
	requires: [
		'VBI.Workspace.view.toolbar.Group',
		'VBI.Workspace.view.group.Browser'
	],
	border: true,
	dockedItems:[{
		xtype: 'grouptoolbar'
	}],
	items:[{
		xtype: 'groupbrowser',
		id: 'workspace_groupbrowser',
		store: 'Groups'
	}]
});
