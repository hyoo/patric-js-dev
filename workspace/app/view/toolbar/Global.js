Ext.define('VBI.Workspace.view.toolbar.Global', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.globaltoolbar',
	switchViewButtons: function(cView) {
		if (cView == null) {
			cView = Ext.getCmp('workspace_view').activeItem;
		}
		if (cView == 'listview') {
			this.child('#btnItemView').toggle(true, true);
			this.child('#btnGroupView').toggle(false, true);
		} else {
			this.child('#btnItemView').toggle(false, true);
			this.child('#btnGroupView').toggle(true, true);
		}
	},
	items: [
		{
			xtype: 'tbtext',
			text: '<b>Workspace</b>'
		},
		'->', /*
		{
			text: '(status)',
			handler: function() {
				Ext.Ajax.request({
					url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=status',
					success: function(response) {
						console.log(response.responseText);
					}
				});
			}
		}, 
		'-', */
		{
			xtype: 'button',
			itemId: 'btnItemView',
			text: 'Item View',
			icon: '/patric/images/workspace_item_view_icon.png',
			enableToggle: true,
			handler: function(me, e) {
				me.fireEvent('switchToListView');
				me.ownerCt.switchViewButtons('listview');
			}
		},
		'-',
		{
			xtype: 'button',
			itemId: 'btnGroupView',
			text: 'Group View',
			icon: '/patric/images/workspace_group_view_icon.png',
			enableToggle: true,
			handler: function(me, e) {
				me.fireEvent('switchToGroupView');
				me.ownerCt.switchViewButtons('groupview');
			}
		}
	]
});