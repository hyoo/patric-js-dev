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
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
			xtype: 'tbspacer',
			width: 220
		}, {
			title: 'View',
			xtype: 'buttongroup',
			width: 115,
			columns: 1,
			items: [{
				xtype: 'tbar_btn_genelist',
				handler: function(btn, e) {
					var selection = btn.findParentByType('toolbar').getSelectedID(),
						expId = Ext.getCmp('workspace_experimentinfoeditor').record.get("expid"),
						store = Ext.getStore("ExpressionExperiments"),
						maxComparisions = 100,
						param = "";
					console.log(selection);
					if (selection != undefined) {
						if (selection.length >= maxComparisions) {
							alert("You have exceeded the limit of comparisons. Please lower than "+maxComparisions);
							return false;
						}
						param = "&expId=&sampleId=&colId=" + expId + ":" + selection.join("+").replace(new RegExp(expId, 'g'), '');
						
						//console.log(param);
						this.fireEvent('runGeneList', param);
					}
				}
			}, {
				xtype: 'button',
				scale: 'small',
				iconAlign: 'left',
				text: 'Experiment list',
				handler: function(btn, e) {
					this.fireEvent('viewExpList');
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
