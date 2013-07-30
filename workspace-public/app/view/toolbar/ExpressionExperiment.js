Ext.define('VBI.Workspace.view.toolbar.ExpressionExperiment', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.expressionexperimenttoolbar',
	getSelectedID: function(type) {
		var selection = Ext.getCmp('workspace_listview_expview').child('#experimentview').getSelectionModel().getSelection();
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No experiment was selected");
			return null;
		}
		else {
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
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
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
					countComparisons = 0,
					maxComparisions = 100,
					param;
				//console.log(selection);
					
				Ext.Array.each(selection, function(expid) {
					item = store.getById(expid);
					countComparisons += item.get("samples");
					colIds.push(item.get("expid"));
				});
				//console.log(countComparisons);
				if (countComparisons >= maxComparisions) {
					alert("You have exceeded the limit of comparisons. Please lower than "+maxComparisions);
					return false;
				}
				
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
	}, '->', '-',
	{
		xtype: 'tbar_btngrp_help'
	}]
});
