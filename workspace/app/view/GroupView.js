Ext.define('VBI.Workspace.view.GroupView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupview',
	id: 'workspace_groupview',
	requires: [
		'VBI.Workspace.view.group.GroupToolbar',
		//'VBI.Workspace.view.group.GroupGrid',
		'VBI.Workspace.view.group.Browser',
		'VBI.Workspace.view.group.ViewDetail'
	],
	border: true,
	layout: 'card',
	activeItem: 'browser',
	stateful: false,
	dockedItems:[{
		xtype: 'grouptoolbar',
		height: 80
	}],
	items:[{
		itemId: 'browser',
		xtype: 'groupbrowser'
	}, {
		itemId: 'detail',
		xtype: 'groupviewdetail'
	}],
	initComponent: function() {
		this.callParent(arguments);
	},
	showGroupBrowser: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "grouptoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.group.GroupToolbar', {id:'workspace_grp_grptbar', height:80}));
		}
		this.getLayout().setActiveItem('browser');
	},
	showFeatureGroupDetail: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "featuretoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.FeatureToolbar', {id:'workspace_grp_ftrtbar',height:80}));
		}
		this.getLayout().setActiveItem('detail');
	},
	showGenomeGroupDetail: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "genometoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.GenomeToolbar', {id:'workspace_grp_gmntbar',height:80}));
		}
		this.getLayout().setActiveItem('detail');
	}
});
