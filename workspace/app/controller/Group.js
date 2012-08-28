Ext.define('VBI.Workspace.controller.Group', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'grouptoolbar button': {
				runGroupExplorer: this.runGroupExplorer
			},
			'groupbrowser': {
				itemdblclick: this.switchToGroupViewer
			},
			'detailtoolbar > button': {
				click: this.switchToBrowser
			},
			'groupinfoeditor > button': {
				click: this.toggleEditorFields
			},
			'detailview': {
				viewExpDetail: this.viewExperimentDetail
			}
		});
	},
	runGroupExplorer: function(selected, type) {
		
		document.location.href = "/portal/portal/patric/GroupManagement?mode=gse&groupType="+type+"&groupId="+selected;
	},
	switchToGroupViewer: function(view, record, item, index, e, options) {
		
		var detailview = Ext.getCmp('workspace_detailview');
		detailview.child('#panel_info').getLayout().setActiveItem('groupinfo');
		
		//console.log(view, record, item, index, e, options);
		// data processing
		var storeMap = Ext.getStore('Mappings');
		storeMap.setTrackFilter("Group", record.getId());
		storeMap.setTrackFilter("String", null);
		var targetTracks = storeMap.getFilteredTracks();
		
		if (record.get('type') == 'Feature') {
			
			detailview.child('#panel_toolbar').getLayout().setActiveItem('feature');
			detailview.child('#panel_grid').getLayout().setActiveItem('featureview');
			Ext.getStore('Features').filterByTracks(targetTracks);
			
			Ext.getCmp('workspace_groupinfoeditor').loadRecord(record);
		}
		else if (record.get('type') == 'Genome') {
			
			detailview.child('#panel_toolbar').getLayout().setActiveItem('genome');
			detailview.child('#panel_grid').getLayout().setActiveItem('genomeview');
			Ext.getStore('Genomes').filterByTracks(targetTracks);
			
			Ext.getCmp('workspace_groupinfoeditor').loadRecord(record);
		}
		else if (record.get('type') == 'ExpressionExperiment') {
			
			detailview.child('#panel_toolbar').getLayout().setActiveItem('experiment');
			detailview.child('#panel_grid').getLayout().setActiveItem('experimentview');
			Ext.getStore('ExpressionExperiments').filterByTracks(targetTracks);
			
			Ext.getCmp('workspace_groupinfoeditor').loadRecord(record);
		}
		
		//switch to group detail view page
		Ext.getCmp('workspace_view').getLayout().setActiveItem('detailview');
	},
	viewExperimentDetail: function(expid) {
		//console.log(expid, typeof expid);
		//console.log('viewExperimentDetail is called');
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
	switchToBrowser: function(button, event, options) {
		//button.findParentByType('groupview').showGroupBrowser();
	},
	/**
		* Toggles the editability of the group info panel form fields.
		* @param {Ext.button.Button} button The button that fired the event.
		* @param {Event} event The event that was fired.
		* @param {Object} options Options passed to the event object.
	*/		
	toggleEditorFields: function(button, event, options) {
		var target = button.findParentByType('groupinfoeditor');
		button.pressed ? target.startEdit() : target.finishEdit();
	}
});
