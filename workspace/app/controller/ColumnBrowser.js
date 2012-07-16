Ext.define('VBI.Workspace.controller.ColumnBrowser', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'columnbrowser > grid': {
				columnbrowserfilter: this.onColumnBrowserFilter
			},
			'columnbrowser > grid > toolbar > button': {
				columnbrowserfilter_reset: this.onColumnBrowserReset
			}
		});
	},
	onColumnBrowserReset: function(type) {
		
		var storeMap = Ext.getStore('Mappings');
		var storeFeatures = Ext.getStore('Features');
		
		if (type == "groups") {	
		
			storeMap.setTrackFilter("Group", null);
			storeMap.setTrackFilter("String", null);
			storeFeatures.filterByTracks(storeMap.getFilteredTracks());
			
			this.resetColumnBrowserGroupsUI();
			this.resetColumnBrowserTagsUI();
		}
		else if (type == "tags") {
			
			storeMap.setTrackFilter("String", null);
			storeFeatures.filterByTracks(storeMap.getFilteredTracks());
			
			this.resetColumnBrowserTagsUI();
		}
	},
	onColumnBrowserFilter: function(type, selected) {
		
		var storeMap = Ext.getStore('Mappings');
		var storeCBTag = Ext.getStore('ColumnBrowser.Tags');
		var storeFeatures = Ext.getStore('Features');
		var storeGenomes = Ext.getStore('Genomes');
		var storeGroups = Ext.getStore('Groups');
		
		if (type == "groups") {
			
			// 1. get Prepared
				var targetGroupTags = new Array();
				Ext.each(selected, function(r) {
					targetGroupTags.push(r.get("tagId"));
				});
				
			// 2. update Tracks
				//var targetTracks = storeMap.getTracksByTag(targetGroupTags);
				storeMap.setTrackFilter("Group", targetGroupTags);
				storeMap.setTrackFilter("String", null);
				// UI - reset column browser tag list
				this.resetColumnBrowserTagsUI();
				
				var targetTracks = storeMap.getFilteredTracks();
				storeFeatures.filterByTracks(targetTracks);
				storeGenomes.filterByTracks(targetTracks);
				
			// 3. update Tags
				var targetStringTags = storeMap.getTagsByTrack(targetTracks);
				storeCBTag.filterByTag(targetStringTags);
				
			// 4. update Group view - done
				storeGroups.filterByTag(targetGroupTags);
			
		} else if (type == "tags") {
			
			// 1. get Prepared
				var targetStringTags = new Array();
				Ext.each(selected, function(r) {
					targetStringTags.push(r.get("tagId"));
				});
				
			// 2. update Track view
				storeMap.setTrackFilter("String", targetStringTags);
				var targetTracks = storeMap.getFilteredTracks();
				storeFeatures.filterByTracks(targetTracks);
				storeGenomes.filterByTracks(targetTracks);
			
			// 3. update Group view
			//	storeGroups.filterByTag(targetStringTags);
			// TODO: should we go through the Tracks?
		}
	},
	resetColumnBrowserGroupsUI: function() {
		Ext.getCmp('columnbrowser_groups').getSelectionModel().deselectAll();
	},
	resetColumnBrowserTagsUI: function() {
		Ext.getCmp('columnbrowser_tags').getSelectionModel().deselectAll();
	}
});
