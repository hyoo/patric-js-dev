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
	initComponent: function() {
		//this.callParent();
		
		var me = this,
	     	html = Ext.fly(document.body.parentNode),
	    	el;
        me.callParent(arguments);
        //html.addCls(Ext.baseCSSPrefix + 'viewport');
        //if (me.autoScroll) {
        //    html.setStyle('overflow', 'auto');
        //}
        //me.el = el = Ext.getBody();
		me.el = el = Ext.get('wksp');
        // el.setHeight = Ext.emptyFn;
        // el.setWidth = Ext.emptyFn;
        //el.setSize = Ext.emptyFn;
		
        // el.dom.scroll = 'no';
        // me.allowDomMove = false;
         Ext.EventManager.onWindowResize(me.fireResize, me);
        // me.renderTo = me.el;
        // me.width = Ext.Element.getViewportWidth();
        // me.height = Ext.Element.getViewportHeight();
		me.width = Ext.Element.getViewportWidth() - 20;
		me.height = Ext.Element.getViewportHeight() - 300;
	},
	fireResize: function(w,h) {
		//console.log("resizing",w,h-300);
		this.setSize(w-20,h-300);
	}
});