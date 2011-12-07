Ext.define('VBI.Workspace.view.GlobalToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.globaltoolbar',
	id: 'workspace_globaltoolbar',
	stateful: false,
	switchViewButtons: function(cView) {
		if (cView == null) {
			cView = Ext.getCmp('workspace_view').activeItem;
		}
		if (cView == 'listview') {
			this.getComponent('btnItemView').toggle(true, true);
			this.getComponent('btnGroupView').toggle(false, true);
		} else {
			this.getComponent('btnItemView').toggle(false, true);
			this.getComponent('btnGroupView').toggle(true, true);
		}
	},
    initComponent: function() {

		this.items = [{
				xtype: 'tbtext',
				//text: 'Workspace > Features > Staph group for Class > CDS'
				text: ''
			},
			'->', /*
			{
				text: '(new feature group)',
				handler: function() {
					Ext.Ajax.request({
						url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=create',
						params: {
							group_name:'',
							group_desc:'description2',
							group_type:'Feature',	//Feature or Genome
							tracks:'30098156,30169012,30176074,30216134,30255345,30285150,30330130,30312096,30300283,30405530,30558208,30532095,30509534,30465308,30653216,30639677,30645960,30722337,30680621,30938147', //na_feature_id or genome_info_id
							tags:'tag1, tag2, tag3, tag4' //tags delimitted by comma (,)
						},
						disableCaching: false
					});
				}
			},
			{
				text: '(new genome group)',
				handler: function() {
					Ext.Ajax.request({
						url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=create',
						params: {
							group_name:'genome group',
							group_desc:'description',
							group_type:'Genome',	//Feature or Genome
							tracks:'38055,25663,113143', //na_feature_id or genome_info_id
							tags:'' //tags delimitted by comma (,)
						},
						disableCaching: false
					});
				}
			},
			{
				text: '(status)',
				handler: function() {
					Ext.Ajax.request({
						url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=status',
						success: function(response) {
							console.log(response.responseText);
						}
					});
				}
			}, 
			'-', */ 
			{
				xtype: 'button',
				itemId: 'btnItemView',
				text: 'Item View',
				icon: '/patric/images/workspace_item_view_icon.png',
				enableToggle: true,
				scope: this,
				handler: function() {
					this.fireEvent('switchToListView');
					this.switchViewButtons('listview');
				}
			},
			'-',
			{
				xtype: 'button',
				itemId: 'btnGroupView',
				text: 'Group View',
				icon: '/patric/images/workspace_group_view_icon.png',
				enableToggle: true,
				scope: this,
				handler: function() {
					this.fireEvent('switchToGroupView');
					this.switchViewButtons('groupview');
				}
		}];
		
        this.callParent(arguments);
    }
});
