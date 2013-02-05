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
	autoScroll: true,
	items:[{
		xtype: 'groupbrowser',
		id: 'workspace_groupbrowser',
		store: 'Groups'
	}]
});
