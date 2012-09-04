Ext.define('VBI.Workspace.controller.Experiment', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'expressionexperimenttoolbar button': {
				runGeneList: this.runGeneList
			},
			'expressionexperimenttoolbar menuitem': {
				downloadGrid: this.downloadExperiments
			},
			'expressionsampletoolbar button': {
				runGeneList: this.runGeneList
			},
			'expressionsampletoolbar menuitem': {
				downloadGrid: this.downloadSamples
			},
			'experimentinfoeditor > button': {
				click: this.toggleEditorFields
			}
		});
	},
	runGeneList: function(param) {
		document.location.href = "/portal/portal/patric/TranscriptomicsGene?cType=taxon&cId=2&dm=result&log_ratio=&zscore="+param;
	},
	toggleEditorFields: function(button, event, options) {
		var target = button.findParentByType('experimentinfoeditor');
		button.pressed ? target.startEdit() : target.finishEdit();
	},
	downloadExperiments: function(type) {
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
	},
	downloadSamples: function(type) {
		var idList = new Array();
		var store = Ext.getStore("ExpressionSamples");
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.internalId);
		});
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "ExpressionSample";
		Ext.getDom("fTableForm").submit();
	}
});
