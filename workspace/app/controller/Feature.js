Ext.define('VBI.Workspace.controller.Feature', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'featuretoolbar button': {
				runMSAFeature: this.runMSAFeature,
				ShowDownloadFasta: this.ShowDownloadFasta,
				callIDMapping: this.runIDMapping,
				resetColumnState: this.resetColumnState
			},
			'featuretoolbar menuitem': {
				downloadGrid: this.downloadGrid
			}
		});
	},
	runMSAFeature: function(selected) {
		Ext.Ajax.request({
			url: "/portal/portal/patric/FIGfamSorter/FigFamSorterWindow?action=b&cacheability=PAGE",
			method: 'POST',
			params: {featureIds: selected, callType:"toAligner"},
			success: function(response, opts) {
				document.location.href = "TreeAlignerB?cType=&cId=&pk=" + response.responseText;
			}
		});
	},
	runIDMapping: function(to, selected) {	
		Ext.Ajax.request({
			url: "/portal/portal/patric/IDMapping/IDMappingWindow?action=b&cacheability=PAGE",
			method: 'POST',
			params: {keyword: selected, from:'PATRIC ID', to:to, sraction:'save_params'},
			success: function(response, opts) {
				document.location.href = "IDMapping?cType=&cId=&dm=result&pk="+response.responseText+"#key="+Math.floor(Math.random()*10001)+"&pS=20&aP=1&dir=ASC&sort=genome_name,accession,start_max";
			}
		});
	},
	ShowDownloadFasta: function(action, type, selected) {
		Ext.getDom("fTableForm").action = "/patric-common/jsp/fasta_download_handler.jsp";
		Ext.getDom("fastaaction").value = action;
		Ext.getDom("fastascope").value = "Selected";
		Ext.getDom("fastatype").value = type;
		Ext.getDom("fids").value = selected;

		if (action == "display") {
			window.open("","disp","width=920,height=400,scrollbars,resizable");
			Ext.getDom("fTableForm").target = "disp";
		} else {
			Ext.getDom("fTableForm").target = "";
		}
		Ext.getDom("fTableForm").submit();
	},
	downloadGrid: function(type) {
		var idList = new Array();
		var store = Ext.getStore("Features");
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.internalId);
		});
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "Feature";
		Ext.getDom("fTableForm").submit();
	},
	resetColumnState: function() {
		var baseUrl = "/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=HTTPProvider";
		var param = "&action=remove&name=featurelist";
		Ext.Ajax.request({
			url: baseUrl+param,
			method: 'GET',
			success: function(response, opts) {
				//console.log("resetColumnState: success");
			}
		});
	}
});
