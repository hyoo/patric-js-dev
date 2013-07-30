Ext.define('VBI.Workspace.view.group.DetailToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.detailtoolbar',
	items: [{ 
		text: '<font color=#fff><b>All Groups</b></font>', 
		iconCls: 'leftarrow',
		overCls: '',
		pressedCls: '',
		style: {
			'background-color': '#0a4773'
		},
		minWidth: 95,
		itemId: 'backButton', 
		scope: this
	}]
});