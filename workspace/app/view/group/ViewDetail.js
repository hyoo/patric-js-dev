Ext.define('VBI.Workspace.view.group.ViewDetail', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.groupviewdetail',
	requires:[
		'VBI.Workspace.view.group.GroupInfoEditor',
		'VBI.Workspace.view.group.DetailToolbar',
		'VBI.Workspace.view.group.GenomeGrid',
		'VBI.Workspace.view.group.FeatureGrid'
	],
	border: 0,
	layout: 'border',
	height: '100%',
	items: [
		{
			region: 'west', 
			xtype: 'groupinfoeditor' 
		},
		{
			region: 'center', 
			xtype: 'panel',
			layout: 'card',
			activeItem: 'features',
			id: 'workspace_ingroupgrid',
			items: [{
				itemId: 'genomes',
				xtype: 'genomegrid'
			}, {
				itemId: 'features',
				xtype: 'featuregrid'
			}]
		}
	],
	dockedItems: [{
		xtype: 'detailtoolbar', 
		dock: 'top'
	}],
    initComponent: function() {	
		this.callParent(arguments);
	}
});
