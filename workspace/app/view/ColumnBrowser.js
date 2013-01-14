Ext.define('VBI.Workspace.view.ColumnBrowser', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.columnbrowser',
	border: false,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'grid', //column browser
		id: 'columnbrowser_groups',
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
			'selectionchange': {
				fn: function (model, selected, options) { 
					if (selected.length > 0) {
						this.fireEvent("columnbrowserfilter", "tags", selected);
					}
				}
			}
		}
	}]
});

