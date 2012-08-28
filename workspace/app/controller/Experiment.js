Ext.define('VBI.Workspace.controller.Experiment', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'expressionexperimenttoolbar button': {
				runGeneList: this.runGeneList
			},
			'expressionexperimenttoolbar menuitem': {
				downloadGrid: this.downloadGrid
			},
			'expressionsampletoolbar button': {
				runGeneList: this.runGeneList
			},
			'expressionsampletoolbar menuitem': {
				downloadGrid: this.downloadGrid
			}
		});
	},
	runGeneList: function(param) {
		var baseUrl = "http://dev.patricbrc.org";
		//var param = "&expId=144217&sampleId=&colId=ecbe6c2d-7aee-4138-88a1-d1b56e8c020b:0+1+2";
		document.location.href = baseUrl + "/portal/portal/patric/TranscriptomicsGene?cType=taxon&cId=2&dm=result&log_ratio=&zscore="+param;
	},
	downloadGrid: function(type) {
		var idList = new Array();
		var store = Ext.getStore("ExpressionExperiments");
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.internalId);
		});
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "ExpressionExperiment";
		Ext.getDom("fTableForm").submit();
	}
});
