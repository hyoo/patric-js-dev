Ext.define('VBI.Workspace.store.Mappings', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Mapping',
	model: 'VBI.Workspace.model.Mapping',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getMappings',
		noCache: false
	},
	filterCriteria: {
		"Group": [],
		"String": []
	},
	setTrackFilter: function(criteria, tags) {
		if (criteria == "Group") {
			this.filterCriteria.Group = tags;
		}
		else if (criteria == "String") {
			this.filterCriteria.String = tags;
		}
	},
	getFilteredTracks: function() {
	
		//var tags = new Array(); 
		var tracks = new Array();
		var tracksInGroup = new Array();
		var tracksInTag = new Array();
		
		if (!Ext.isEmpty(this.filterCriteria.Group)) {
			var tags = Ext.Array.merge(this.filterCriteria.Group);
			this.each(function (record) {
				if (Ext.Array.contains (tags, record.get('tagId'))) {
					tracksInGroup.push(record.get('trackId'));
				}
			})
		}
		if (!Ext.isEmpty(this.filterCriteria.String)) {
			var tags = Ext.Array.merge(this.filterCriteria.String);
			this.each(function (record) {
				if (Ext.Array.contains (tags, record.get('tagId'))) {
					tracksInTag.push(record.get('trackId'));
				}
			})
		}
		//console.log(tracksInGroup, tracksInTag);
		
		if (!Ext.isEmpty(tracksInGroup) && !Ext.isEmpty(tracksInTag)) {
			if (tracksInGroup.length < tracksInTag.length) {
				Ext.Array.each(tracksInGroup, function (record) {
					if (Ext.Array.contains(tracksInTag, record)) {
						tracks.push(record);
					}
				});
			} else {
				Ext.Array.each(tracksInTag, function (record) {
					if (Ext.Array.contains(tracksInGroup, record)) {
						tracks.push(record);
					}
				});
			}
		}
		else if (!Ext.isEmpty(tracksInTag) && Ext.isEmpty(tracksInGroup)) {
			tracks = tracksInTag;
		}
		else if (!Ext.isEmpty(tracksInGroup) && Ext.isEmpty(tracksInTag)) {
			tracks = tracksInGroup;
		}
		else {
			this.each(function (record) {
				tracks.push(record.get('trackId'));
			})
		}
		
		return tracks;
	},
	getTagsByTrack: function(trackId) {
		var target = new Array();	
		if (Ext.isArray(trackId)) {
			this.each(function (record) {
				if  (Ext.Array.contains(trackId, record.get('trackId'))) {
					target.push(record.get('tagId'));
				}
			});
			
		} else if (Ext.isNumber(tracks)) {
			this.each(function(record) {
				if (record.get('trackId') == trackId) {
					target.push(record.get('tagId'));
				}
			});
		}
		target = Ext.Array.unique(target);
		return target;
	}
});
