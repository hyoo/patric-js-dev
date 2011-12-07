/*
Ext.define('VBI.Workspace.view.group.GroupGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.groupgrid',
	store: 'Groups',
	id: 'workspace_groupgrid',
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	border: true,
	initComponent: function() {
		
		this.columns = [{
				header: 'Group Name', 
				dataIndex: 'name',
				flex: 2,
				editor: {
					allowBlank: false
				}
			}, {
				header: 'Description', 
				dataIndex: 'desc', 				
				flex: 3,
				editor: {
					allowBlank: true
				}
			}, {
				header: 'Members', 
				dataIndex: 'members', 
				flex: 1
			}, {
				header: 'Created', 
				dataIndex: 'cdate', 
				flex: 1
			}, {
				header: 'Modified', 
				dataIndex: 'mdate', 
				flex: 1
		}];
		
		this.tbar = {
			xtype: 'grouptoolbar',
			height: 70
		};
		
		this.dockedItems = [{
			xtype: 'pagingtoolbar',
			store: this.store,
			dock: 'bottom',
			displayInfo: true
		}];
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor:1,
			autoCancel: false
		});
		
		this.plugins = [rowEditing];
		
		this.callParent(arguments);
	}
});
*/