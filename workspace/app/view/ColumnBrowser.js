Ext.define('VBI.Workspace.view.ColumnBrowser', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.columnbrowser',
	border: 0,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	initComponent: function() {
	
		this.items = [{
			xtype: 'grid', //column browser
			id: 'columnbrowser_groups',
			stateful: false,
			flex: 1,
			border: true,
			store: 'ColumnBrowser.Groups',
			columns: [{
				header: 'Groups', 
				dataIndex: 'name', 
				flex: 1
			}],
			multiSelect: true,
			dockedItems: [{
				xtype:'toolbar',
				dock:'bottom',
				items: [{
					text:'reset',
					handler: function(btn, e) {
						btn.fireEvent("columnbrowserfilter_reset", "groups");
					}
				}]
			}],
			listeners: {
				scope: this,
				'selectionchange': {
					fn: function (model, selected, options) { 
						if (selected.length > 0) {
							this.fireEvent("columnbrowserfilter", "groups", selected);
						}
					}
				}
			}
		}, {
			xtype: 'grid',
			id: 'columnbrowser_tags',
			stateful: false,
			flex: 1,
			border: true,
			store: 'ColumnBrowser.Tags',
			columns:[{
				header: 'Tags', 
				dataIndex: 'name', 
				flex: 1
			}],
			multiSelect: true,
			dockedItems: [{
				xtype:'toolbar',
				dock:'bottom',
				items: [{
					text:'reset',
					handler: function() {
						this.fireEvent("columnbrowserfilter_reset", "tags");
					}
				}]
			}],
			listeners: {
				scope: this,
				'selectionchange': {
					fn: function (model, selected, options) { 
						if (selected.length > 0) {
							this.fireEvent("columnbrowserfilter", "tags", selected);
						}
					}
				}
			}
		}];
		
		this.callParent(arguments);
	}
});

