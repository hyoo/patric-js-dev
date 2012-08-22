Ext.define('VBI.Workspace.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'VBI.Workspace.view.Toolbar',
		'VBI.Workspace.view.toolbar.Global',
		'VBI.Workspace.view.toolbar.Paging',
		'VBI.Workspace.view.StationsList',
		'VBI.Workspace.view.ListView',
		'VBI.Workspace.view.GroupView',
		'VBI.Workspace.view.DetailView'
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
				items: [{
					itemId: 'listview',
					xtype: 'listview'
				}, {
					itemId: 'groupview',
					xtype: 'groupview'
				}, {
					itemId: 'detailview',
					xtype: 'detailview'
				}]
		}]
	},
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