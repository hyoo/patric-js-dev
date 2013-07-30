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
				runGeneList: this.runGeneList,
				viewExpList: this.viewExperimentList
			},
			'expressionsampletoolbar menuitem': {
				downloadGrid: this.downloadSamples
			},
			'detailview': {
				viewExpDetail: this.viewExperimentDetail
			}
		});
	},
	runGeneList: function(param) {
		document.location.href = "/portal/portal/patric/TranscriptomicsGene?cType=&cId=&dm=result&log_ratio=&zscore="+param;
	},
	viewExperimentList: function() {
		Ext.getCmp('workspace_view').getLayout().setActiveItem('listview');
	},
	viewExperimentDetail: function(expid) {
		var detailview = Ext.getCmp('workspace_detailview');
		detailview.child('#panel_info').getLayout().setActiveItem('experimentinfo');
		detailview.child('#panel_toolbar').getLayout().setActiveItem('sample');
		detailview.child('#panel_grid').getLayout().setActiveItem('experimentdetail');
		
		Ext.getStore('ExpressionSamples').getProxy().setExtraParam("expid", expid);
		Ext.getStore('ExpressionSamples').load();
		
		var record = Ext.getStore('ExpressionExperiments').getById(expid);
		Ext.getCmp('workspace_experimentinfoeditor').loadRecord(record);
		Ext.getCmp('workspace_view').getLayout().setActiveItem('detailview');
	},
	downloadExperiments: function(type) {
		var store = Ext.getStore("ExpressionExperiments"),
			USERExperiments = new Array();
		
		Ext.Array.each(store.getRange(), function(item) {			
			USERExperiments.push(item.internalId);
		});
		
		var fids = {
			"USERExperiments": USERExperiments
		};
		
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
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