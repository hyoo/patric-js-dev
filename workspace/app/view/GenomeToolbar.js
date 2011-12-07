Ext.define('VBI.Workspace.view.GenomeToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.genometoolbar',
	id: 'workspace_genometoolbar',
	stateful: false,
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
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		
		if (viewport.activeItem == "groupview") {
			selection = Ext.getCmp('workspace_genomegrid').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_genomeview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No genome was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("gid"));
			});
			return selectedIDs;
		}
	},
	refreshWorkspaceViews: function() {

		Ext.StoreManager.lookup('Mappings').load({
			callback: function() {
				Ext.StoreManager.lookup('Groups').load({
					callback: function() {
						Ext.StoreManager.lookup('ColumnBrowser').refresh({
							callback:function() {
								Ext.StoreManager.lookup('Stations').load({
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
    initComponent: function() {

		this.items = [
			{
				title: 'Workspace', 
				xtype: 'buttongroup',
				columns: 1, 
				items:[{
					xtype:'tbar_btn_remove',
					handler: function(btn, e) {
						//var selectedGroups = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
						var groupList = this.findParentByType('genometoolbar').getSelectedGroup();
						var idList = this.findParentByType('genometoolbar').getSelectedID();
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
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
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
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
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
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
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
						var idList = this.findParentByType('genometoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						var btnGroupPopupSave = new Ext.Button({
							text:'Save to Group',
							handler: function(btn, e) {
								//console.log("custom button for save to group - genome level");
								saveToGroup(idList.join(","), 'Genome');
								
								Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
							}
						});
					 	
						popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
								title: 'Add Selected Genomes to Group',
								buttons: [btnGroupPopupSave,{
									text: 'Cancel',
									handler: function(){popup.hide();}
								}]
						}).show();
						loadATGCombo();
					}
				}]
			}, '-',
	        {
	            title: 'Download',
	            columns: 1,
	            xtype: 'buttongroup',
	            width: 115,
	            items: [
					{
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
		                        this.fireEvent('downloadGrid','xls');
		                    }
		                }]
		            }
				]
	        }, '->', '-',
	        {
	            xtype: 'tbar_btngrp_help'
	        }
		];
		
		this.layout = {
			type: 'hbox',
			align: 'stretch'
		};
		
        this.callParent(arguments);
    }
});
