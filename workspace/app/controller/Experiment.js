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
		document.location.href = "/portal/portal/patric/TranscriptomicsGene?cType=taxon&cId=131567&dm=result&log_ratio=&zscore="+param;
	},
	toggleEditorFields: function(button, event, options) {
		var target = button.findParentByType('experimentinfoeditor');
		button.pressed ? target.startEdit() : target.finishEdit();
	},
	downloadExperiments: function(type) {
		var store = Ext.getStore("ExpressionExperiments"),
			PATRICExperiments = new Array(),
			USERExperiments = new Array();
		
		Ext.Array.each(store.getRange(), function(item) {
			
			if (item.get("source") == "PATRIC") {
				//PATRICExperiments.push(item.internalId);
				PATRICExperiments.push({trackType:"ExpressionExperiment", internalId: item.internalId});
			} else if (item.get("source") == "me") {
				USERExperiments.push(item.internalId);
			}
		});
		
		var fids = {
			"PATRICExperiments": PATRICExperiments,
			"USERExperiments": USERExperiments
		};
		
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		//Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "ExpressionExperiment";
		
		Ext.Ajax.request({
			url: "/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getToken",
			success: function(response) {
				fids.token = response.responseText;
				Ext.getDom("fids").value = Ext.JSON.encode(fids);
				Ext.getDom("fTableForm").submit();
			}
		});
	},
	downloadSamples: function(type) {
		var store	= Ext.getStore("ExpressionSamples"),
			expInfo	= Ext.getCmp('workspace_experimentinfoeditor').record,
			fids = {
				source: expInfo.get("source"),
				eid: expInfo.get("eid"),
				expId: expInfo.get("expid")
			};
		
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		//Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "ExpressionSample";
		
		Ext.Ajax.request({
			url: "/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getToken",
			success: function(response) {
				fids.token = response.responseText;
				Ext.getDom("fids").value = Ext.JSON.encode(fids);
				Ext.getDom("fTableForm").submit();
			}
		});
	}
});
