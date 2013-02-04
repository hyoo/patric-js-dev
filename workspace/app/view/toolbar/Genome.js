Ext.define('VBI.Workspace.view.toolbar.Genome', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.genometoolbar',
	getSelectedGroup: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		var groupList = new Array();
		
		if (viewport.activeItem == "groupview") {
			selection = new Array();
			groupList.push( Ext.getCmp('workspace_groupinfoeditor').record.get("tagId") );
			
		} else {
			selection = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
			Ext.Array.each(selection, function(item) {
				groupList.push(item.get("tagId"));
			});
		}
		return groupList;
	},
	getSelectedID: function() {
		var selection;
		
		if ( Ext.getCmp('workspace_view').activeItem == "groupview") {
			selection = Ext.getCmp('workspace_detailview').child('#panel_grid').child('#genomeview').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_listview').child('#genomeview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No genome was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("genome_info_id"));
			});
			return selectedIDs;
		}
	},
	refreshWorkspaceViews: function() {
		
		Ext.getStore('Mappings').load({
			callback: function() {
				Ext.getStore('Groups').load({
					callback: function() {
						Ext.getStore('ColumnBrowser').refresh({
							callback:function() {
								Ext.getStore('Stations').load({
									callback: function() {
										Ext.getCmp('workspace_station').setDefault("Genomes");
										updateCartInfo();
									}
								});
							}
						});
					}
				});
			}
		});
	},
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		title: 'Workspace', 
		xtype: 'buttongroup',
		columns: 1, 
		items:[{
			xtype:'tbar_btn_remove',
			handler: function(btn, e) {
				var groupList = btn.findParentByType('genometoolbar').getSelectedGroup(),
				idList = btn.findParentByType('genometoolbar').getSelectedID(),
				me = this;
				
				if (idList == null) { return false; }
					
				if (groupList.length == 0) {
					// no group selected, delete from workspace
					Ext.Msg.show({
						msg: 'Do you want to delete this genome from your workspace?',
						buttons: Ext.Msg.OKCANCEL,
						icon: Ext.Msg.QUESTION,
						fn: function(buttonId, opt) {
							if (buttonId == "ok" && idList.length > 0) {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
									params: {
										removeFrom: 'workspace',
										idType: 'Genome',
										idList: idList.join(",")
									},
									success: function(response) {
										me.findParentByType('toolbar').refreshWorkspaceViews();
									}
								});
							}
						}
					});
						
				} else {
							
					Ext.Msg.show({
						msg: 'Do you want to delete this genome from your selected groups? Click No if you want to delete from entire workspace',
						buttons: Ext.Msg.YESNOCANCEL,
						icon: Ext.Msg.QUESTION,
						fn: function(buttonId, opt) {
							if (buttonId == "yes") {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
									params: {
										removeFrom:'groups',
										groups: groupList.join(","),
										idType: 'Genome',
										idList: idList.join(",")
									},
									success: function(response) {
										me.findParentByType('toolbar').refreshWorkspaceViews();
									}
								});
							} else if (buttonId == "no") {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
									params: {
										removeFrom:'workspace',
										idType: 'Genome',
										idList: idList.join(",")
									},
									success: function(response) {
										me.findParentByType('toolbar').refreshWorkspaceViews();
									}
								});
							}
						}
					});
				}
			}
		},{
			xtype:'tbar_btn_create',
			handler: function(btn, e) {
				var idList = btn.findParentByType('genometoolbar').getSelectedID();
				if (idList == null) { return false; }
				var me = this;
				var btnGroupPopupSave = new Ext.Button({
					text:'Save to Group',
					handler: function(btn, e) {
						//console.log("custom button for save to group - genome level");
						saveToGroup(idList.join(","), 'Genome');
							
						me.findParentByType('toolbar').refreshWorkspaceViews();
					}
				});
				
				popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
					title: 'Add Selected Genomes to Group',
					buttons: [btnGroupPopupSave,{
						text: 'Cancel',
						handler: function(){popup.hide();}
					}]
				}).show();
			}
		}]
	}, '-',
	{
		title: 'Download',
		xtype: 'buttongroup',
		width: 115,
		items: [{
			scale: 'small',
			iconAlign: 'left',
			width: 110,
			text: 'Table',
			icon: '/patric/images/toolbar_table.png',
			xtype: 'splitbutton',
			menu: [{
				xtype: 'tbar_menu_dn_tb_txt',
				handler: function() {
					this.fireEvent('downloadGrid','txt');
				}
			},
			{
				xtype: 'tbar_menu_dn_tb_xls',
				handler: function() {
					this.fireEvent('downloadGrid','xlsx');
				}
			}]
		}]
	},
	{
		title: 'Columns',
		xtype: 'buttongroup',
		items: [{
			xtype: 'tbar_btn_showhide',
			menu: [],
			handler: function(me) {
				if (me.menu.items.length == 0) {
					var grid = me.findParentByType("gridpanel");
					
					if (grid != null) {
						me.menu = grid.headerCt.getMenu().child("#columnItem").menu;
					} else {
						var view = me.findParentByType("detailview")
						if (view != null) {
							grid = view.child("#panel_grid").child("#genomeview");
							me.menu = grid.headerCt.getMenu().child("#columnItem").menu;
						}
					}
					//console.log(grid.headerCt.getMenu().child("#columnItem").menu);
					me.showMenu();
				}
			}
		}]
	}, '->', '-',
	{
		xtype: 'tbar_btngrp_help'
	}]
});
