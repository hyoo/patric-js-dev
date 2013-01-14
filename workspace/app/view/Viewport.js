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
	layout: 'border',
	items: [{
		region: 'center',
		xtype: 'panel',
		dockedItems: [{
			dock: 'top',
			xtype: 'globaltoolbar',
			id: 'workspace_globaltoolbar',
			height: 30
		}],
		layout: 'border',
		items: [{
			region: 'west',
			xtype: 'panel',
			border: false,
			items: [{
				xtype: 'stationslist',
				id: 'workspace_station',
				border: false,
				width: 150,
				height: 250
			}, {
				xtype: 'panel',
				layout: 'vbox',
				border: false,
				cls: 'no-underline-links',
				items: [{
					xtype: 'component',
					autoEl: {
						tag: 'img',
						onclick: "launchTranscriptomicsUploader()",
						style: "cursor: pointer",
						src: "/patric/images/transcriptomics_uploader_ad.png"
					},
					margin: '0 25px',
					height: 99
				}, {
					xtype: 'displayfield',
					width: 130,
					margin: '0 0 0 10px',
					value: '<a href="javascript:void(0)" onclick="launchTranscriptomicsUploader()">Upload your transcriptomics data</a> to analyze using PATRIC tools and to compare with other published datasets.'
				}, {
					xtype: 'component',
					overCls: 'no-underline-links',
					autoEl: {
						tag: 'a',
						href: 'http://enews.patricbrc.org/faqs/transcriptomics-faqs/upload-transcriptomics-data-to-workspace-faqs/',
						html: "Learn more",
						target: '_blank',
						cls: 'double-arrow-link'
					},
					padding: '0 0 0 10px'
				}]
			}]
		}, {
			region: 'center',
			xtype: 'panel',
			id: 'workspace_view',
			layout: 'card',
			stateful: true,
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
			border: false,
			items: [{
				itemId: 'listview',
				xtype: 'listview'
			}, {
				itemId: 'groupview',
				xtype: 'groupview'
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