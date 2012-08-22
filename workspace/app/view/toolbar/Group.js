Ext.define('VBI.Workspace.view.toolbar.Group', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.grouptoolbar',
	border: 0,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	getSelectedID: function() {
		var selection = Ext.getCmp('workspace_groupbrowser').getSelectionModel().getSelection();
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "no group selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("tagId"));
			});
			return selectedIDs;
		}
	},
	getSelectedGroupType: function() {
		var selection = Ext.getCmp('workspace_groupbrowser').getSelectionModel().getSelection();
		if (selection.length > 0) {
			return selection[0].get('type');
		}
	},
	refreshWorkspaceViews: function() {
		Ext.getStore('ColumnBrowser').refresh({
			callback:function() {
				Ext.getStore('Groups').load({
					callback: function() {
						Ext.getStore('Stations').load();
						updateCartInfo();
					}
				});
			}
		});
	},
	items: [
		{
			title: 'Workspace', 
			xtype: 'buttongroup', 
			columns: 1,
			items:[{
				xtype:'tbar_btn_remove',
				handler: function(me, e) {
						
					var idList = me.findParentByType('grouptoolbar').getSelectedID();
					if (idList == null) { return false; }
						
					Ext.Msg.show({
						msg: 'Do you want to delete this group from your workspace?',
						buttons: Ext.Msg.OKCANCEL,
						icon: Ext.Msg.QUESTION,
						fn: function(buttonId, opt) {
							if (buttonId == "ok" && idList.length > 0) {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeGroup',
									params: {
										idList: idList.join(",")
									},
									success: function(response) {
										Ext.getCmp('workspace_grouptoolbar').refreshWorkspaceViews();
									}
								});
							}
						}
					});
						
				}
			}]
		}, '-',
		{
			title: 'Tools',
			xtype: 'buttongroup',
			items: [{
				scale: 'large',
				iconAlign: 'left',
				text: 'Group Explorer',
				icon: '/patric/images/toolbar_gse.png',
				handler: function(me, e) {
					var idList = me.findParentByType('grouptoolbar').getSelectedID();
					if (idList == null) { return false; }
						
					var type = me.findParentByType('grouptoolbar').getSelectedGroupType();
						
					me.fireEvent("runGroupExplorer", idList.join(","), type);
				}
			}]
		},
		{
			title: 'Sort',
			xtype: 'buttongroup',
			columns: 3,
			items: [{
				text: 'Name Ascending',
				icon: '/patric/js/extjs4/resources/themes/images/default/grid/hmenu-asc.gif',
				handler: function() {
					Ext.getStore('Groups').sort('name','ASC');
				}
			}, {
				text: 'Oldest First',
				icon: '/patric/images/calendar_icon.png',
				handler: function() {
					Ext.getStore('Groups').sort('mdate','ASC');
				}
			}, {
				text: 'Smallest First',
				icon: '/patric/images/sort_count_asc.png',
				handler: function() {
					Ext.getStore('Groups').sort('members','ASC');
				}
			}, {
				text: 'Name Descending',
				icon: '/patric/js/extjs4/resources/themes/images/default/grid/hmenu-desc.gif',
				handler: function() {
					Ext.getStore('Groups').sort('name','DESC');
				}
			}, {
				text: 'Newest First',
				icon: '/patric/images/calendar_icon.png',
				handler: function() {
					Ext.getStore('Groups').sort('mdate','DESC');
				}
			}, {
				text: 'Largest First',
				icon: '/patric/images/sort_count_des.png',
				handler: function() {
					Ext.getStore('Groups').sort('members','DESC');
				}
			}]
		},
		'->', '-',
		{
			xtype: 'tbar_btngrp_help'
		}
	]
});