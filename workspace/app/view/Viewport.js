Ext.define('VBI.Workspace.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'VBI.Workspace.view.Toolbar',
		'VBI.Workspace.view.GlobalToolbar',
		'VBI.Workspace.view.PagingToolbar',
		'VBI.Workspace.view.StationsList',
		'VBI.Workspace.view.ListView',
		'VBI.Workspace.view.GroupView'
	],
	layout: 'fit',
	border: false,
	items: {
		xtype: 'panel',
		dockedItems: [{
			dock: 'top',
			xtype: 'globaltoolbar',
			height: 30
		}],
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
				xtype: 'stationslist', //source list
				width: 150
			}, 
			{
				xtype: 'panel',
				id: 'workspace_view',
				layout: 'card',
				activeItem: 'listview',
				stateEvents:['updateview'],
				getState: function() {
					return { activeItem: this.activeItem };
				},
				applyState: function(state) {
					if (state != undefined && this.activeItem != state.activeItem ) {
						this.activeItem = state.activeItem;
						this.fireEvent('updateview');
					}
				},
				flex: 1,
				border: false,
				items: [
					{
						itemId: 'listview',
						xtype: 'listview'
					}, {
						itemId: 'groupview',
						xtype: 'groupview'
				}]
		}]
	},
	onRender: function() {
		var me = this;
		me.callParent(arguments);
		me.width = Ext.Element.getViewportWidth() - 15;
		me.height = Ext.Element.getViewportHeight() - 320;
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
			this.setSize(width - 15, height - 320);
		}
	}
});