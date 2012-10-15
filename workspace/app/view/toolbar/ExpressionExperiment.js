Ext.define('VBI.Workspace.view.toolbar.ExpressionExperiment', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.expressionexperimenttoolbar',
	getSelectedGroup: function() {
		var viewport = Ext.getCmp('workspace_view'),
			selection,
			groupList = new Array();
		
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
	getSelectedID: function(type) {
		var selection;
		
		if (Ext.getCmp('workspace_view').activeItem == "groupview") {
			selection = Ext.getCmp('workspace_detailview').child('#panel_grid').child('#experimentview').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_listview').child('#experimentview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No experiment was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				if (type != undefined) {
					selectedIDs.push(item.get(type));
				} else {
					selectedIDs.push(item.get("expid"));
				}
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
										Ext.getCmp('workspace_station').setDefault("ExpressionExperiments");
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
			xtype: 'tbar_btn_remove',
			text: 'Remove Experiment(s)',
			width: 150,
			handler: function(btn, e) {
				var groupList = btn.findParentByType('toolbar').getSelectedGroup(),
					idList = btn.findParentByType('toolbar').getSelectedID(),
					me = this;
						
				if (idList == null) { return false; }
					
				//var idList = new Array();
				//idList.push('b5ed6492-f333-4ade-a40e-1a34fdd86cfa');
					
				if (groupList.length == 0) {
					// no group selected, delete from workspace
					Ext.Msg.show({
						msg: 'Do you want to delete this experiment from your workspace?',
						buttons: Ext.Msg.OKCANCEL,
						icon: Ext.Msg.QUESTION,
						fn: function(buttonId, opt) {
							if (buttonId == "ok" && idList.length > 0) {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE',
									params: {
										action_type: 'groupAction',
										action: 'removeTrack',
										removeFrom: 'workspace',
										idType: 'ExpressionExperiment',
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
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE',
									params: {
										action_type: 'groupAction',
										action: 'removeTrack',
										removeFrom:'groups',
										groups: groupList.join(","),
										idType: 'ExpressionExperiment',
										idList: idList.join(",")
									},
									success: function(response) {
										me.findParentByType('toolbar').refreshWorkspaceViews();
									}
								});
							} else if (buttonId == "no") {
								Ext.Ajax.request({
									url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE',
									params: {
										action_type: 'groupAction',
										action: 'removeTrack',
										removeFrom:'workspace',
										idType: 'ExpressionExperiment',
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
			xtype: 'tbar_btn_create',
			text: 'Add to Group',
			handler: function(btn, e) {
				var idList = btn.findParentByType('toolbar').getSelectedID(),
					me = this;
				
				if (idList == null) { return false; }
					
				var btnGroupPopupSave = new Ext.Button({
					text:'Save to Group',
					handler: function(btn, e) {
						//console.log("custom button for save to group - genome level");
						saveToGroup(idList.join(","), 'ExpressionExperiment');
						me.findParentByType('toolbar').refreshWorkspaceViews();
					}
				});
						
				popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
					title: 'Add Selected Experiments to Group',
					buttons: [btnGroupPopupSave,{
						text: 'Cancel',
						handler: function(){popup.hide();}
					}]
				}).show();
			}
		}]
	}, {
		title: 'View',
		xtype: 'buttongroup',
		width: 115,
		items: [{
			xtype: 'tbar_btn_genelist',
			handler: function(btn, e) {
				var selection = btn.findParentByType('toolbar').getSelectedID(),
					expIds = new Array(),
					colIds = new Array(),
					store = Ext.getStore("ExpressionExperiments"),
					param;
				//console.log(selection);
					
				Ext.Array.each(selection, function(expid) {
					item = store.getById(expid);
						
					if (item.get("source") == "PATRIC") {
						expIds.push(item.get("eid"));
					}
					else if (item.get("source") == "me") {
						colIds.push(item.get("expid"));
					}
				});
				param = "&expId=" + expIds.join(",") + "&sampleId=&colId=" + colIds.join(",");
				if (expIds.length > 0 || colIds.length >0) {
					//console.log (expIds, colIds);
					this.fireEvent('runGeneList', param);
				}
			}
		}]
	}, {
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
			}, {
				xtype: 'tbar_menu_dn_tb_xls',
				handler: function() {
					this.fireEvent('downloadGrid','xlsx');
				}
			}]
		}]
	}, {
		title: 'Upload',
		xtype: 'buttongroup',
		width: 155,
		items: [{
			scale: 'large',
			text: 'Transcriptomics Data',
			icon: '/patric/images/transcriptomics_uploader_icon_32x32.png',
			handler: launchTranscriptomicsUploader
		}]
	}, '->', '-',
	{
		xtype: 'tbar_btngrp_help'
	}]
});
