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
			}
		});
	},
	runGroupExplorer: function(selected, type) {
		
		document.location.href = "/portal/portal/patric/GroupManagement?mode=gse&groupType="+type+"&groupId="+selected;
	},
	switchToGroupViewer: function(view, record, item, index, e, options) {
		
		var grpView = view.findParentByType('groupview')
		var grid = Ext.getCmp('workspace_ingroupgrid');
		
		//console.log(view, record, item, index, e, options);
		// data processing
		var storeMap = Ext.data.StoreManager.lookup('Mappings');
		storeMap.setTrackFilter("Group", record.getId());
		storeMap.setTrackFilter("String", null);
		var targetTracks = storeMap.getFilteredTracks();
		
		if (record.get('type') == 'Feature') {		

			grpView.showFeatureGroupDetail();
			
			grid.getLayout().setActiveItem('features');
			Ext.StoreManager.lookup('Features').filterByTracks(targetTracks);
			
			Ext.getCmp('workspace_groupinfoeditor').loadRecord(record);
		}
		else if (record.get('type') == 'Genome') {

			grpView.showGenomeGroupDetail();
			
			grid.getLayout().setActiveItem('genomes');
			Ext.StoreManager.lookup('Genomes').filterByTracks(targetTracks);
			
			Ext.getCmp('workspace_groupinfoeditor').loadRecord(record);
		}
	},
	switchToBrowser: function(button, event, options) {
		button.findParentByType('groupview').showGroupBrowser();
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
