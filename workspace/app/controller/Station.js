Ext.define('VBI.Workspace.controller.Station', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'stationslist': {
				itemclick: this.onStationSelect
			}
		});
	},
	onStationSelect: function(view, record, item, index, e, options) {
		//console.log("on stations select: fired");
		// 1. get Prepared
			//var selectedType = selected[0].get("type");
			var selectedType = record.get("type");
			//console.log(selectedType);
			if (selectedType == "") { return false; }
			
			var storeMap = Ext.getStore('Mappings');
			var storeCBGrp = Ext.getStore('ColumnBrowser_Groups');
			var storeCBTag = Ext.getStore('ColumnBrowser_Tags');
			var storeFeatures = Ext.getStore('Features');
			var storeGenomes = Ext.getStore('Genomes');
			var storeGroups = Ext.getStore('Groups');
			var storeExpressionExperiments = Ext.getStore('ExpressionExperiments');
			
		// 2. update ColumnBrowser
			
			// 2.1 update groups
			storeCBGrp.clearFilter();
			storeCBGrp.filter("type", selectedType);
			
			// 2.2 update tags- moved after step 3
		
		// 3. update Track view
			var targetTags = new Array();
			Ext.Array.each(storeCBGrp.getRange(), function(grp) {
				targetTags.push(grp.get("tagId"));
			});
			//console.log("target tags:",targetTags);
			
			storeMap.setTrackFilter("Group", targetTags);
			storeMap.setTrackFilter("String", null);
			var targetTracks = storeMap.getFilteredTracks();
			//console.log("targetTracks:",targetTracks);
			
			if (selectedType === "Feature") {
				if (targetTags.length > 0) {
					storeFeatures.filterByTracks(targetTracks);
				}
				this.showListPanel('featureview');
			} 
			else if (selectedType === "Genome") {
				if (targetTags.length > 0) {
					storeGenomes.filterByTracks(targetTracks);
				}
				this.showListPanel('genomeview');
			} 
			else if (selectedType === "ExpressionExperiment") {
				if (targetTags.length > 0) {
					storeExpressionExperiments.filterByTracks(targetTracks);
				}
				this.showListPanel('experimentview');
			}
			
		// 3.5 update column browser tags
			var targetTags = storeMap.getTagsByTrack(targetTracks);
			storeCBTag.filterByTag(targetTags);
			
		// 3.6 update UI
			Ext.getCmp('columnbrowser_groups').getSelectionModel().deselectAll();
			Ext.getCmp('columnbrowser_tags').getSelectionModel().deselectAll();
		
		// 4. update Group view
			storeGroups.clearFilter();
			storeGroups.filter("type", selectedType);
	},
	showListPanel: function(viewType) {
		Ext.getCmp('workspace_view').getLayout().setActiveItem(Ext.getCmp('workspace_view').activeItem);
		Ext.getCmp('workspace_listview').getLayout().setActiveItem(viewType);
	}
});
