Ext.define('VBI.Workspace.view.ListView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.listview',
	requires: [
		'VBI.Workspace.view.ColumnBrowser',
		'VBI.Workspace.view.FeatureView',
		'VBI.Workspace.view.GenomeView'
	],
	height: '100%',
	border: false,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
			xtype: 'columnbrowser', //column browser
			width: 200
		},
		{
			xtype: 'panel',
			layout: 'card',
			activeItem: 'featureview',
			id: 'workspace_listview',
			stateful: false,
			flex: 1,
			border: true,
			items: [{
				itemId: 'featureview',
				xtype: 'featureview'
			}, {
				itemId: 'genomeview',
				xtype: 'genomeview'
			}]
		}
	],
	initComponent: function() {	
		this.callParent(arguments);
	}
});
