Ext.define('VBI.Workspace.view.toolbar.ExpressionSample', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.expressionsampletoolbar',
	getSelectedID: function() {
		var selection = Ext.getCmp('workspace_detailview').child('#panel_grid').child('#experimentdetail').getSelectionModel().getSelection();
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No sample was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("pid"));
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
	items: [/* // comment out for now
		{
			title: 'Workspace', 
			xtype: 'buttongroup',
			columns: 1,
			items:[{
				xtype: 'tbar_btn_remove',
				text: 'Remove Sample(s)',
				width: 150,
				handler: function(btn, e) {
					var idList = btn.findParentByType('toolbar').getSelectedID();
					if (idList == null) { return false; }
					var me = this;
					
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
				}
			},{
				xtype: 'tbar_btn_create',
				text: 'Add to Group',
				handler: function(btn, e) {
					var idList = btn.findParentByType('toolbar').getSelectedID();
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
		}, */
		{
			xtype: 'tbspacer',
			width: 220
		}, {
			title: 'View',
			xtype: 'buttongroup',
			width: 115,
			items: [{
				xtype: 'tbar_btn_genelist',
				handler: function(btn, e) {
					var selection = btn.findParentByType('toolbar').getSelectedID(),
						expId = Ext.getCmp('workspace_experimentinfoeditor').record.get("expid"),
						store = Ext.getStore("ExpressionExperiments"),
						maxComparisions = 100,
						param = "";
					//console.log(selection);
					if (selection != undefined) {
						if (selection.length >= maxComparisions) {
							alert("You have exceeded the limit of comparisons. Please lower than "+maxComparisions);
							return false;
						}
						if (store.getById(expId).get("source")=="PATRIC") {
							param = "&expId=" + expId + "&sampleId=" + selection.join(",") + "&colId=";
						} 
						else if (store.getById(expId).get("source")=="me") {
							param = "&expId=&sampleId=&colId=" + expId + ":" + selection.join("+").replace(new RegExp(expId, 'g'), '');
						}
					
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
				},
				{
					xtype: 'tbar_menu_dn_tb_xls',
					handler: function() {
						this.fireEvent('downloadGrid','xlsx');
					}
				}]
			}]
		}, '->', '-',
		{
			xtype: 'tbar_btngrp_help'
		}
	]
});
