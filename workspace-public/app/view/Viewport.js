Ext.define('VBI.Workspace.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'VBI.Workspace.view.Toolbar',
		'VBI.Workspace.view.toolbar.Paging',
		'VBI.Workspace.view.ListView',
		'VBI.Workspace.view.DetailView'
	],
	layout: 'border',
	items: [{
		region: 'center',
		xtype: 'panel',
		layout: 'border',
		items: [{
			region: 'center',
			xtype: 'panel',
			id: 'workspace_view',
			layout: 'card',
			activeItem: 'listview',
			border: false,
			items: [{
				itemId: 'listview',
				xtype: 'listview',
				id: 'workspace_listview',
			}, {
				itemId: 'detailview',
				xtype: 'detailview',
				id: 'workspace_detailview'
			}]
		}]
	}],
	onRender: function() {
		var me = this;
		me.callParent(arguments);
		me.width = Ext.Element.getViewportWidth() - 15;
		me.height = Math.max(580, Ext.Element.getViewportHeight() - 320);
	},
	initComponent : function() {
		var me = this,
			html = document.body.parentNode,
			el;
			
		me.callParent(arguments);
		me.el = el = Ext.get('wksp');
	},
	fireResize: function(width, height) {
		if (width != this.width || height != this.height) {
			this.setSize(width - 15, Math.max(580, height - 320));
		}
	}
});