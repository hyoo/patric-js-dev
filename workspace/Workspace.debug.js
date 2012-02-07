Ext.define('VBI.Workspace.controller.ColumnBrowser', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'columnbrowser': {
				columnbrowserfilter: this.onColumnBrowserFilter
			},
			'columnbrowser button': {
				columnbrowserfilter_reset: this.onColumnBrowserReset
			}
		});
	},
	onColumnBrowserReset: function(type) {
		
		var storeMap = Ext.data.StoreManager.lookup('Mappings');
		var storeFeatures = Ext.data.StoreManager.lookup('Features');
		
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
		
		var storeMap = Ext.data.StoreManager.lookup('Mappings');
		var storeCBTag = Ext.data.StoreManager.lookup('ColumnBrowser.Tags');
		var storeFeatures = Ext.data.StoreManager.lookup('Features');
		var storeGenomes = Ext.data.StoreManager.lookup('Genomes');
		var storeGroups = Ext.data.StoreManager.lookup('Groups');
		
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
Ext.define('VBI.Workspace.controller.Feature', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'featuretoolbar button': {
				runMSAFeature: this.runMSAFeature
			},
			'featuretoolbar menuitem': {
				ShowDownloadFasta: this.ShowDownloadFasta,
				downloadGrid: this.downloadGrid,
				callIDMapping: this.runIDMapping
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
		var store = Ext.StoreManager.lookup("Features");
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
	}
});
Ext.define('VBI.Workspace.controller.Genome', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'genometoolbar menuitem': {
				downloadGrid: this.downloadGrid
			}
		});
	},
	downloadGrid: function(type) {
		var idList = new Array();
		var store = Ext.StoreManager.lookup("Genomes");
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.internalId);
		});
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "Genome";
		Ext.getDom("fTableForm").submit();
	}
});
Ext.define('VBI.Workspace.controller.GlobalToolbar', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'globaltoolbar': {
				switchToListView: this.onSwitchToListView,
				switchToGroupView: this.onSwitchToGroupView
			}
		});
	},
	onSwitchToListView: function(button, e) 
	{	
		var vp = Ext.getCmp('workspace_view');
		vp.applyState({activeItem:'listview'});
		vp.getLayout().setActiveItem('listview');
	},
	onSwitchToGroupView: function(button, e) 
	{	
		var vp = Ext.getCmp('workspace_view');
		vp.applyState({activeItem:'groupview'});
		vp.getLayout().setActiveItem('groupview');
	}
});
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
Ext.define('VBI.Workspace.controller.Station', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'stationslist': {
				//selectionchange: this.onStationSelect
				//select: this.StationSelected,
				itemclick: this.onStationSelect
			}
		});
	},
	//onStationSelect: function (selModel, selected, options) {
	//onStationSelect: function(rowModel, record, index, options) {
	onStationSelect: function(view, record, item, index, e, options) {
		//console.log("on stations select: fired");
		// 1. get Prepared
			//var selectedType = selected[0].get("type");
			var selectedType = record.get("type");
			//console.log(selectedType);
			if (selectedType == "") { return false; }
			
			var storeMap = Ext.data.StoreManager.lookup('Mappings');
			var storeCBGrp = Ext.data.StoreManager.lookup('ColumnBrowser.Groups');
			var storeCBTag = Ext.data.StoreManager.lookup('ColumnBrowser.Tags');
			var storeFeatures = Ext.data.StoreManager.lookup('Features');
			var storeGenomes = Ext.data.StoreManager.lookup('Genomes');
			var storeGroups = Ext.data.StoreManager.lookup('Groups');
			
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
			//console.log("target tags:"+targetTags);
			
			storeMap.setTrackFilter("Group", targetTags);
			storeMap.setTrackFilter("String", null);
			var targetTracks = storeMap.getFilteredTracks();
			//console.log(targetTracks);
			
			if (selectedType == "Feature") {
				storeFeatures.filterByTracks(targetTracks);
				this.showFeatureListPanel();
			} else if (selectedType == "Genome") {
				storeGenomes.filterByTracks(targetTracks);
				this.showGenomeListPanel();
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
			Ext.getCmp('workspace_groupview').showGroupBrowser();
	},
	showFeatureListPanel: function() {
		Ext.getCmp('workspace_listview').getLayout().setActiveItem('featureview');
	},
	showGenomeListPanel: function() {
		Ext.getCmp('workspace_listview').getLayout().setActiveItem('genomeview');
	}
});
Ext.define('VBI.Workspace.model.ColumnBrowser', {
	extend: 'Ext.data.Model',
	fields: ['tagId', 'name', 'tagType', 'type'],
	idProperty: 'tagId',
});
Ext.define('VBI.Workspace.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'na_feature_id',
	//idProperty: 'rownum',
	fields: ['aa_length', 'accession', 'annotation', 'end_min', 'feature_type', 'genome_name', 'gid', 'locus_tag', 
		'na_feature_id', 'na_length', 'product',  'refseq_locus_tag', 'refseq_protein_id', 'start_max',  'strand']
});
Ext.define('VBI.Workspace.model.Genome', {
	extend: 'Ext.data.Model',
	idProperty: 'gid',
	fields: ['ncbi_tax_id', 'genome_name', 'rast_cds', 'refseq_cds', 'brc_cds', 'chromosome', 'contig', 'plasmid', 'length', 'gid']
});
Ext.define('VBI.Workspace.model.Group', {
	extend: 'Ext.data.Model',
	fields: ['tagId', 'name', 'members', 'cdate', 'mdate', 'desc', 'type', 
		{
			name: 'thumb', 
			convert: function(value, record) {
				return '/patric/images/workspace_'+record.get('type').toLowerCase()+'_group.png';
			}
		}
	],
	idProperty: 'tagId'
});
Ext.define('VBI.Workspace.model.Mapping', {
	extend: 'Ext.data.Model',
	fields: ['trackId', 'tagId']
});

Ext.define('VBI.Workspace.model.Station', {
	extend: 'Ext.data.Model',
	fields: [
	   'id', 'name', 'type', 'leaf',
	    {
	        name: 'iconCls', type: 'string', defaultValue: 'x-tree-noicon'
	    }
	],
	idProperty: 'id'
});


Ext.define('VBI.Workspace.store.ColumnBrowser.Groups', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.ColumnBrowser',
	model: 'VBI.Workspace.model.ColumnBrowser'
});

Ext.define('VBI.Workspace.store.ColumnBrowser.Tags', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.ColumnBrowser',
	model: 'VBI.Workspace.model.ColumnBrowser',
	filterByTag: function(tagId) {
		this.clearFilter();
		this.filter([
			Ext.create("Ext.util.Filter", {filterFn: function(item) {
				return Ext.Array.contains(tagId, item.get("tagId"));
			}})
		]);
	}
});

Ext.define('VBI.Workspace.store.ColumnBrowser', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.ColumnBrowser',
	model: 'VBI.Workspace.model.ColumnBrowser',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getFacets',
		reader: {
			type: 'json',
			root: 'results'
		}
	},
	refresh: function(callback) {
		Ext.StoreManager.lookup('ColumnBrowser.Groups').removeAll(false);
		Ext.StoreManager.lookup('ColumnBrowser.Tags').removeAll(false);
		this.load(callback);
	},
	listeners: {
		load: function(store) {	
			store.clearFilter();
			store.filter("tagType", "Group");
			Ext.data.StoreManager.lookup('ColumnBrowser.Groups').add(store.getRange());
			store.clearFilter();
			store.filter("tagType", "String");
			Ext.data.StoreManager.lookup('ColumnBrowser.Tags').add(store.getRange());
		}
	}
});
Ext.define('VBI.Workspace.store.Features', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Feature',
	model: 'VBI.Workspace.model.Feature',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getFeatures',
		extraParams: {
			trackIds: ''
		},
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		noCache: false
	},
	stateId: 'workspace_pagesize',
	remoteSort: true,
	filterByTracks: function(tracks) {
		if (Ext.isArray(tracks)) {
			this.getProxy().extraParams.trackIds = tracks.join(",");
			this.load();
		}
		else if (Ext.isNumber(tracks)) {
			this.getProxy().extraParams.trackIds = tracks;
			this.load();
		}
	}
});
Ext.define('VBI.Workspace.store.Genomes', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Genome',
	model: 'VBI.Workspace.model.Genome',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getGenomes',
		extraParams: {
			trackIds: ''
		},
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		noCache: false
	},
	stateId: 'workspace_pagesize',
	remoteSort: true,
	filterByTracks: function(tracks) {
		if (Ext.isArray(tracks)) {
			this.getProxy().extraParams.trackIds = tracks.join(",");
			this.load();
		}
		else if (Ext.isNumber(tracks)) {
			this.getProxy().extraParams.trackIds = tracks;
			this.load();
		}
	}
});Ext.define('VBI.Workspace.store.Groups', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Group',
	model: 'VBI.Workspace.model.Group',
	autoLoad: true,
	//autoSync: true,
	proxy: {
		type: 'ajax',
		api: {
			read: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getGroups',
			update: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=updateGroupInfo'
		},
		reader: {
			type: 'json',
			successProperty: 'success',
			root: 'results'
		},
		writer: {
			type: 'json',
			writeAllFields: false,
			root: 'group_info',
			encode: true
		}
	},
	listeners: {
		write: function(store, operation) {
			Ext.StoreManager.lookup('ColumnBrowser').refresh();
		}
	},
	filterByTag: function(tagId) {
		this.clearFilter();
		this.filter([
			Ext.create("Ext.util.Filter", {filterFn: function(item) {
				return Ext.Array.contains(tagId, item.get("tagId"));
			}})
		]);
	}
});
Ext.define('VBI.Workspace.store.Mappings', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Mapping',
	model: 'VBI.Workspace.model.Mapping',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getMappings'
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
		/*
		return Ext.Array.sort(Ext.Array.unique(tracks), function(a,b) {
			return a-b;
		});
		*/
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
	},
	listeners: {
		load: function(store) {
			var task = new Ext.util.DelayedTask(function() {
				Ext.getCmp('workspace_station').setDefault("Features");
				Ext.getCmp('workspace_globaltoolbar').switchViewButtons();
			});
			task.delay(500);
		}
	}
});
Ext.override(Ext.data.TreeStore, {
	load: function(options) {
		options = options || {};
		options.params = options.params || {};

		var me = this,
			node = options.node || me.tree.getRootNode(),
			root;

		// If there is not a node it means the user hasnt defined a rootnode yet. In this case lets just
		// create one for them.
		if (!node) {
			node = me.setRootNode({
				expanded: true
			});
		}

		if (me.clearOnLoad) {
			// this is what we changed.  added false
			node.removeAll(false);
		}

		Ext.applyIf(options, {
			node: node
		});
		options.params[me.nodeParam] = node ? node.getId() : 'root';

		if (node) {
			node.set('loading', true);
		}

		return me.callParent([options]);
	}
});

Ext.define('VBI.Workspace.store.Stations', {
	extend: 'Ext.data.TreeStore',
	requires: 'VBI.Workspace.model.Station',
	model: 'VBI.Workspace.model.Station',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getLibrary'
	}
});
Ext.define('VBI.Workspace.view.ColumnBrowser', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.columnbrowser',
	border: 0,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	initComponent: function() {
	
		this.items = [{
			xtype: 'grid', //column browser
			id: 'columnbrowser_groups',
			stateful: false,
			flex: 1,
			border: true,
			store: 'ColumnBrowser.Groups',
			columns: [{
				header: 'Groups', 
				dataIndex: 'name', 
				flex: 1
			}],
			multiSelect: true,
			dockedItems: [{
				xtype:'toolbar',
				dock:'bottom',
				items: [{
					text:'reset',
					handler: function(btn, e) {
						btn.fireEvent("columnbrowserfilter_reset", "groups");
					}
				}]
			}],
			listeners: {
				scope: this,
				'selectionchange': {
					fn: function (model, selected, options) { 
						if (selected.length > 0) {
							this.fireEvent("columnbrowserfilter", "groups", selected);
						}
					}
				}
			}
		}, {
			xtype: 'grid',
			id: 'columnbrowser_tags',
			stateful: false,
			flex: 1,
			border: true,
			store: 'ColumnBrowser.Tags',
			columns:[{
				header: 'Tags', 
				dataIndex: 'name', 
				flex: 1
			}],
			multiSelect: true,
			dockedItems: [{
				xtype:'toolbar',
				dock:'bottom',
				items: [{
					text:'reset',
					handler: function() {
						this.fireEvent("columnbrowserfilter_reset", "tags");
					}
				}]
			}],
			listeners: {
				scope: this,
				'selectionchange': {
					fn: function (model, selected, options) { 
						if (selected.length > 0) {
							this.fireEvent("columnbrowserfilter", "tags", selected);
						}
					}
				}
			}
		}];
		
		this.callParent(arguments);
	}
});

Ext.define('VBI.Workspace.view.FeatureToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.featuretoolbar',
	id: 'workspace_featuretoolbar',
	stateful: false,
	getSelectedGroup: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		var groupList = new Array();
		
		if (viewport.activeItem == "groupview") {
			selection = new Array();
			groupList.push( Ext.getCmp('workspace_groupinfoeditor').record.get("tagId") );
			
		} else {
			selection = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
			Ext.Array.each(selection, function(item) {
				groupList.push(item.get("tagId"));
			});
		}
		return groupList;
	},
	getSelectedID: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		
		if (viewport.activeItem == "groupview") {
			selection = Ext.getCmp('workspace_featuregrid').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_featureview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No feature was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("na_feature_id"));
			});
			return selectedIDs;
		}
	},
	refreshWorkspaceViews: function() {
		Ext.StoreManager.lookup('Mappings').load({
			callback: function() {
				Ext.StoreManager.lookup('Groups').load({
					callback: function() {
						Ext.StoreManager.lookup('ColumnBrowser').refresh({
							callback:function() {
								Ext.StoreManager.lookup('Stations').load({
									callback: function() {
										Ext.getCmp('workspace_station').setDefault("Features");
										updateCartInfo();
									}
								});
							}
						});
					}
				});
			}
		});
	},
	initComponent: function() {
		
		this.items = [
			{
				title: 'Workspace', 
				xtype: 'buttongroup', 
				columns: 1,
				items:[{
					xtype:'tbar_btn_remove',
					handler: function(btn, e) {
						var groupList = this.findParentByType('featuretoolbar').getSelectedGroup();
						
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						if (groupList.length == 0) {
							Ext.Msg.show({
								msg: 'Do you want to delete this feature from your workspace?',
								buttons: Ext.Msg.OKCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "ok" && idList.length > 0) {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom: 'workspace',
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
							
						} else {
							
							Ext.Msg.show({
								msg: 'Do you want to delete this feature from your selected groups? Click No if you want to delete from entire workspace',
								buttons: Ext.Msg.YESNOCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "yes") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'groups',
												groups: groupList.join(","),
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									} else if (buttonId == "no") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'workspace',
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
						}
					}
				}, {
					xtype: 'tbar_btn_create',
					handler: function(btn, e) {
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						var btnGroupPopupSave = new Ext.Button({
							text:'Save to Group',
							handler: function(btn, e) {
								//console.log("custom button for save to group - feature level");
								saveToGroup(idList.join(","), 'Feature');
								
								Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
							}
						});
					 	
						popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
								title: 'Add Selected Features to Group',
								buttons: [btnGroupPopupSave,{
									text: 'Cancel',
									handler: function(){popup.hide();}
								}]
						}).show();
						loadATGCombo();
					}
				}]
			}, '-',
			{
				title: 'View',
				columns: 1,
				xtype: 'buttongroup',
				items: [
					{
						scale: 'small',
						iconAlign: 'left',
						text: 'FASTA',
						width: 110,
						//icon: '/patric/images/toolbar_fasta.png',
						xtype: 'splitbutton',
						menu: [{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA DNA',
							icon: '/patric/images/toolbar_dna.png',
							handler: function() {	
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'dna', idList.join(","));
								}
							}
						},
						{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA Protein',
							icon: '/patric/images/toolbar_protein.png',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'protein', idList.join(","));
								}
							}
						},
						{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA DNA/Protein',
							icon: '/patric/images/toolbar_dna_protein.png',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'both', idList.join(","));
								}
							}
						}]
					}
				]
			},
			{
				title: 'Download',
				columns: 1,
				xtype: 'buttongroup',
				width: 115,
				items: [
					{
						scale: 'small',
						iconAlign: 'left',
						width: 110,
						text: 'Table',
						icon: '/patric/images/toolbar_table.png',
						xtype: 'splitbutton',
						menu: [{
							xtype: 'tbar_menu_dn_tb_txt',
							handler: function() {
								this.fireEvent('downloadGrid','txt');
							}
						},
						{
							xtype: 'tbar_menu_dn_tb_xls',
							handler: function() {
								this.fireEvent('downloadGrid','xls');
							}
						}]
					},
					{
						scale: 'small',
						iconAlign: 'left',
						text: 'FASTA',
						width: 110,
						icon: '/patric/images/toolbar_fasta.png',
						xtype: 'splitbutton',
						menu: [{
							xtype: 'tbar_menu_dn_dna',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'dna', idList.join(","));
								}
							}
						},
						{
							xtype: 'tbar_menu_dn_protein',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'protein', idList.join(","));
								}
							}
						},
						{
							xtype: 'tbar_menu_dn_dnaprotein',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'both', idList.join(","));
								}
							}
						}]
					}
				]
			},
			{
				title: 'Tools',
				xtype: 'buttongroup',
				items: [{
					xtype: 'tbar_btn_msa',
					width: 80,
					handler: function() {
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { 
							return false; 
						} else {
							this.fireEvent('runMSAFeature', idList.join(","));
						}
					}
				}, {
					xtype: 'tbar_btn_mapidsto',
					width: 120,
					menu:{
						defaults:{
							height:16,
							style:'margin-left: 15px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;',
							plain:true
						},
						items:[{	
							text:'<b>PATRIC Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text: 'PATRIC Locus Tag', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PATRIC Locus Tag", idList.join(","));
								}
							}
						},{
							text: 'PATRIC ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PATRIC ID", idList.join(","));
								}
							}
						},{
							text: 'PSEED ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PSEED ID", idList.join(","));
								}
							}
						},{
							text:'<b>REFSEQ Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text: 'RefSeq Locus Tag', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "RefSeq Locus Tag", idList.join(","));
								}
							}
						},{
							text: 'RefSeq', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "RefSeq", idList.join(","));
								}
							}
						},{
							text: 'Gene ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "Gene ID", idList.join(","));
								}
							}
						},{
							text: 'GI', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "GI", idList.join(","));
								}
							}
						},{
							text:'<b>Other Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text:'Allergome',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "Allergome", idList.join(","));
								}
							}
						},{
							text:'BioCyc',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "BioCyc", idList.join(","));
								}
							}
						},{
							text:'DIP',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DIP", idList.join(","));
								}
							}
						},{
							text:'DisProt',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DisProt", idList.join(","));
								}
							}
						},{
							text:'DrugBank',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DrugBank", idList.join(","));
								}
							}
						},{
							text:'ECO2DBASE',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "ECO2DBASE", idList.join(","));
								}
							}
						},{
							text:'EMBL',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EMBL", idList.join(","));
								}
							}
						},{
							text:'EMBL-CDS',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EMBL-CDS", idList.join(","));
								}
							}
						},{
							text:'EchoBASE',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EchoBASE", idList.join(","));
								}
							}
						},{
							text:'EcoGene',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EcoGene", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome_PRO',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome_PRO", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome_TRS',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome_TRS", idList.join(","));
								}
							}
						},
						{
							text:'More ...',
							itemCls:'x-menu-item-cstm',
							menu:[{
								text:'GeneTree',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GeneTree", idList.join(","));
									}
								}
							},{
								text:'GenoList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GenoList", idList.join(","));
									}
								}
							},{
								text:'GenomeReviews',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GenomeReviews", idList.join(","));
									}
								}
							},{
								text:'HOGENOM',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "HOGENOM", idList.join(","));
									}
								}
							},{
								text:'HSSP',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "HSSP", idList.join(","));
									}
								}
							},{
								text:'KEGG',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "KEGG", idList.join(","));
									}
								}
							},{
								text:'LegioList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "LegioList", idList.join(","));
									}
								}
							},{
								text:'Leproma',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "Leproma", idList.join(","));
									}
								}
							},{
								text:'MEROPS',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "MEROPS", idList.join(","));
									}
								}
							},{
								text:'MINT',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "MINT", idList.join(","));
									}
								}
							},{
								text:'NMPDR',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "NMPDR", idList.join(","));
									}
								}
							},{
								text:'OMA',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "OMA", idList.join(","));
									}
								}
							},{
								text:'OrthoDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "OrthoDB", idList.join(","));
									}
								}
							},{
								text:'PDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PDB", idList.join(","));
									}
								}
							},{
								text:'PeroxiBase',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PeroxiBase", idList.join(","));
									}
								}
							},{
								text:'PptaseDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PptaseDB", idList.join(","));
									}
								}
							},{
								text:'ProtClustDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "ProtClustDB", idList.join(","));
									}
								}
							},{
								text:'PseudoCAP',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PseudoCAP", idList.join(","));
									}
								}
							},{
								text:'REBASE',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "REBASE", idList.join(","));
									}
								}
							},{
								text:'Reactome',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "Reactome", idList.join(","));
									}
								}
							},{
								text:'RefSeq_NT',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "RefSeq_NT", idList.join(","));
									}
								}
							},{
								text:'TCDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TCDB", idList.join(","));
									}
								}
							},{
								text:'TIGR',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TIGR", idList.join(","));
									}
								}
							},{
								text:'TubercuList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TubercuList", idList.join(","));
									}
								}
							},{
								text:'UniParc',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniParc", idList.join(","));
									}
								}
							},{
								text:'UniProtKB-ID',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniProtKB-ID", idList.join(","));
									}
								}
							},{
								text:'UniRef100',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef100", idList.join(","));
									}
								}
							},{
								text:'UniRef50',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef50", idList.join(","));
									}
								}
							},{
								text:'UniRef90',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef90", idList.join(","));
									}
								}
							},{
								text:'World-2DPAGE',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "World-2DPAGE", idList.join(","));
									}
								}
							},{
								text:'eggNOG',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "eggNOG", idList.join(","));
									}
								}
							}
							]
						}]
					}
				}]
			}, '->', '-',
			{
				xtype: 'tbar_btngrp_help'
			}
		];
		this.layout = {
			type: 'hbox',
			align: 'stretch'
		};
		this.callParent(arguments);
	}
});

Ext.define('VBI.Workspace.view.FeatureView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featureview',
	store: 'Features',
	requires: ['VBI.Workspace.view.FeatureToolbar'],
	id: 'workspace_featureview',
	border: 0,
	columns: {
		defaults: {
			align:'center'
		},
		items:[{
			text: 'Genome',
			dataIndex: 'genome_name',
			flex: 2,
			align: 'left',
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
			}
		},{
			text: 'Product Description', 
			dataIndex: 'product', 
			flex: 3,
			align: 'left'
		}, {
			text: 'Locus Tag', 
			dataIndex: 'locus_tag', 
			flex: 2,
			align: 'left',
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
			}
		}, {
			text: 'Annotation', 
			dataIndex: 'annotation',
			flex: 1
		}, {
			text: 'Feature Type', 
			dataIndex: 'feature_type',
			flex: 1
		}, {		
			text: 'Start', 
			dataIndex: 'start_max', 
			flex: 1,
			align: 'right'
		}, {
			text: 'End', 
			dataIndex: 'end_min', 
			flex: 1,
			align: 'right'
		}, {
			text: 'Length (NT)', 
			dataIndex: 'na_length', 
			flex: 1,
			align: 'right'
		}, {
			text: 'Strand', 
			dataIndex: 'strand',
			flex: 1
		}, {
			text: 'Accession',
			dataIndex: 'accession',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Locus Tag',
			dataIndex: 'refseq_locus_tag',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Protein',
			dataIndex: 'refseq_protein_id',
			flex: 1,
			hidden: true
		}]
	},
	dockedItems: [{
		xtype: 'featuretoolbar',
		height: 70,
		dock: 'top'
	}, {
		xtype: 'patricpagingtoolbar',
		store: 'Features',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.callParent(arguments);
	}
});
Ext.define('VBI.Workspace.view.GenomeToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.genometoolbar',
	id: 'workspace_genometoolbar',
	stateful: false,
	getSelectedGroup: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		var groupList = new Array();
		
		if (viewport.activeItem == "groupview") {
			selection = new Array();
			groupList.push( Ext.getCmp('workspace_groupinfoeditor').record.get("tagId") );
			
		} else {
			selection = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
			Ext.Array.each(selection, function(item) {
				groupList.push(item.get("tagId"));
			});
		}
		return groupList;
	},
	getSelectedID: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		
		if (viewport.activeItem == "groupview") {
			selection = Ext.getCmp('workspace_genomegrid').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_genomeview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No genome was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("gid"));
			});
			return selectedIDs;
		}
	},
	refreshWorkspaceViews: function() {

		Ext.StoreManager.lookup('Mappings').load({
			callback: function() {
				Ext.StoreManager.lookup('Groups').load({
					callback: function() {
						Ext.StoreManager.lookup('ColumnBrowser').refresh({
							callback:function() {
								Ext.StoreManager.lookup('Stations').load({
									callback: function() {
										Ext.getCmp('workspace_station').setDefault("Genomes");
										updateCartInfo();
									}
								});
							}
						});
					}
				});
			}
		});
	},
    initComponent: function() {

		this.items = [
			{
				title: 'Workspace', 
				xtype: 'buttongroup',
				columns: 1, 
				items:[{
					xtype:'tbar_btn_remove',
					handler: function(btn, e) {
						//var selectedGroups = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
						var groupList = this.findParentByType('genometoolbar').getSelectedGroup();
						var idList = this.findParentByType('genometoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						if (groupList.length == 0) {
							// no group selected, delete from workspace
							Ext.Msg.show({
								msg: 'Do you want to delete this genome from your workspace?',
								buttons: Ext.Msg.OKCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "ok" && idList.length > 0) {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom: 'workspace',
												idType: 'Genome',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
						} else {
							
							Ext.Msg.show({
								msg: 'Do you want to delete this genome from your selected groups? Click No if you want to delete from entire workspace',
								buttons: Ext.Msg.YESNOCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "yes") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'groups',
												groups: groupList.join(","),
												idType: 'Genome',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
											}
										});
									} else if (buttonId == "no") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'workspace',
												idType: 'Genome',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
						}
					}
				},{
					xtype:'tbar_btn_create',
					handler: function(btn, e) {
						var idList = this.findParentByType('genometoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						var btnGroupPopupSave = new Ext.Button({
							text:'Save to Group',
							handler: function(btn, e) {
								//console.log("custom button for save to group - genome level");
								saveToGroup(idList.join(","), 'Genome');
								
								Ext.getCmp('workspace_genometoolbar').refreshWorkspaceViews();
							}
						});
					 	
						popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
								title: 'Add Selected Genomes to Group',
								buttons: [btnGroupPopupSave,{
									text: 'Cancel',
									handler: function(){popup.hide();}
								}]
						}).show();
						loadATGCombo();
					}
				}]
			}, '-',
	        {
	            title: 'Download',
	            columns: 1,
	            xtype: 'buttongroup',
	            width: 115,
	            items: [
					{
		                scale: 'small',
		                iconAlign: 'left',
		                width: 110,
		                text: 'Table',
		                icon: '/patric/images/toolbar_table.png',
		                xtype: 'splitbutton',
		                menu: [{
		                    xtype: 'tbar_menu_dn_tb_txt',
		                    handler: function() {
		                        this.fireEvent('downloadGrid','txt');
		                    }
		                },
		                {
		                    xtype: 'tbar_menu_dn_tb_xls',
		                    handler: function() {
		                        this.fireEvent('downloadGrid','xls');
		                    }
		                }]
		            }
				]
	        }, '->', '-',
	        {
	            xtype: 'tbar_btngrp_help'
	        }
		];
		
		this.layout = {
			type: 'hbox',
			align: 'stretch'
		};
		
        this.callParent(arguments);
    }
});
Ext.define('VBI.Workspace.view.GenomeView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomeview',
	store: 'Genomes',
	requires: ['VBI.Workspace.view.GenomeToolbar'],
	id: 'workspace_genomeview',
	border: 0,
	columns: {
		defaults: {
			align: 'center'
		},
		items: [{
			text: 'Organism Name', 
			dataIndex: 'genome_name', 
			flex: 2,
			align: 'left',
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
			}
		}, {
			text: 'Size', 
			dataIndex: 'length', 
			flex: 1
		}, {
			text: 'PATRIC CDS', 
			dataIndex: 'rast_cds', 
			flex: 1
		}, {
			text: 'Legacy BRC CDS', 
			dataIndex: 'brc_cds', 
			flex: 1
		}, {		
			text: 'RefSeq CDS', 
			dataIndex: 'refseq_cds', 
			flex: 1
		}, {
			text: 'chromosome', 
			dataIndex: 'chromosome', 
			flex: 1
		}, {
			text: 'plasmid', 
			dataIndex: 'plasmid', 
			flex: 1
		}]
	},
	dockedItems: [{
		xtype: 'genometoolbar',
		height: 70,
		dock: 'top'
	}, {
		xtype: 'patricpagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.callParent(arguments);
	}
});
Ext.define('VBI.Workspace.view.GlobalToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.globaltoolbar',
	id: 'workspace_globaltoolbar',
	stateful: false,
	switchViewButtons: function(cView) {
		if (cView == null) {
			cView = Ext.getCmp('workspace_view').activeItem;
		}
		if (cView == 'listview') {
			this.getComponent('btnItemView').toggle(true, true);
			this.getComponent('btnGroupView').toggle(false, true);
		} else {
			this.getComponent('btnItemView').toggle(false, true);
			this.getComponent('btnGroupView').toggle(true, true);
		}
	},
    initComponent: function() {

		this.items = [{
				xtype: 'tbtext',
				//text: 'Workspace > Features > Staph group for Class > CDS'
				text: ''
			},
			'->', 
			{
				text: '(new feature group)',
				handler: function() {
					Ext.Ajax.request({
						url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=create',
						params: {
							group_name:'',
							group_desc:'description2',
							group_type:'Feature',	//Feature or Genome
							tracks:'30098156,30169012,30176074,30216134,30255345,30285150,30330130,30312096,30300283,30405530,30558208,30532095,30509534,30465308,30653216,30639677,30645960,30722337,30680621,30938147', //na_feature_id or genome_info_id
							tags:'tag1, tag2, tag3, tag4' //tags delimitted by comma (,)
						},
						disableCaching: false
					});
				}
			},
			{
				text: '(new genome group)',
				handler: function() {
					Ext.Ajax.request({
						url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=create',
						params: {
							group_name:'genome group',
							group_desc:'description',
							group_type:'Genome',	//Feature or Genome
							tracks:'38055,25663,113143', //na_feature_id or genome_info_id
							tags:'' //tags delimitted by comma (,)
						},
						disableCaching: false
					});
				}
			},
			{
				text: '(status)',
				handler: function() {
					Ext.Ajax.request({
						url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=status',
						success: function(response) {
							console.log(response.responseText);
						}
					});
				}
			}, 
			'-', 
			{
				xtype: 'button',
				itemId: 'btnItemView',
				text: 'Item View',
				icon: '/patric/images/workspace_item_view_icon.png',
				enableToggle: true,
				scope: this,
				handler: function() {
					this.fireEvent('switchToListView');
					this.switchViewButtons('listview');
				}
			},
			'-',
			{
				xtype: 'button',
				itemId: 'btnGroupView',
				text: 'Group View',
				icon: '/patric/images/workspace_group_view_icon.png',
				enableToggle: true,
				scope: this,
				handler: function() {
					this.fireEvent('switchToGroupView');
					this.switchViewButtons('groupview');
				}
		}];
		
        this.callParent(arguments);
    }
});
Ext.define('VBI.Workspace.view.group.Browser', {
    extend: 'Ext.view.View',
    alias : 'widget.groupbrowser',
    store: 'Groups', 
	id: 'workspace_groupbrowser',
	stateful: false,
	tpl: [
			'<tpl for=".">',
				'<div class="thumb-wrap">',
					'<div class="thumb">',
						(!Ext.isIE6? '<img src="{thumb}"  alt="{name}" title="{name}" />' : 
						'<div style="width:76px;height:76px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{thumb}\')"></div>'),
					'</div>',
					'<div class="title">{[Ext.String.ellipsis(values.name, 20)]} ({members})</div>',
					'<div class="type">{type} Group</div>',
					'<div class="updated">Updated: {[Ext.Date.format(Ext.Date.parse(values.mdate, "Y-m-d H:i:s"), "x-date-relative")]}</div>',
				'</div>',
			'</tpl>'
    ],
	autoScroll: true,
	multiSelect: true,
	//simpleSelect: true,
	itemSelector: 'div.thumb-wrap',
    cls: 'x-browser-view',
	initComponent: function() {
		this.callParent(arguments);
	},
	listeners: { /*
		itemclick: {
			fn: function(view, record, item, index, e, options) {
				console.log(view, record, item, index, e, options);
			}
		},
		itemdblclick: {
			fn: function(view, record, item, index, e, options) {
				
				console.log(view, record, item, index, e, options);
				console.log("*** itemdblclick");
			}
		}*/
	}
});
Ext.define('VBI.Workspace.view.group.DetailToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.detailtoolbar',
	items: [
		{ 
			text: '<font color=#fff><b>All Groups</b></font>', 
			//iconCls: 'x-btn-prev',
			iconCls: 'leftarrow',
			overCls: '',
			pressedCls: '',
			style: {
				'background-color': '#0a4773'
			},
			minWidth: 95,
			itemId: 'backButton', 
			scope: this
		}
	] //, 

	/**
	 * Add a title string to this toolbar. If the string is longer than 80% of 
	 * the total toolbar width, it is truncated. Pass an alignment argument to 
	 * align the title on the toolbar (defaults to center).
	 * @param {String} text The title string to add.
	 * @param {String} align The alignment of the title (left, right, center).
	*/
	/*
	addTitle: function(text, align) {
				
		if (typeof text == 'undefined' || text == null || text == '') 
			return;
		
		if (typeof align == 'undefined' || align == null || align == '') 
			align = 'center';
			
		var barW=this.getWidth();
		
		// max length of title is 80% of total toolbar width
		var maxLength = parseInt(barW*0.8);
		if (text.length > maxLength) 
			text = Ext.String.ellipsis(text, maxLength-3);
		
		switch (align) {
			case 'left': 
				this.add(text);
				break;
			case 'right':
				this.add('->', text);
				break;
			default:
				var btnW = this.getComponent('backButton').getWidth();
				var paddingLength = parseInt(barW/2-text.length/2-btnW);
				this.add(
					Ext.create('Ext.Toolbar.Spacer', {width: paddingLength}), 
					text
				);
		}
	}
	*/
});Ext.define('VBI.Workspace.view.group.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	store: 'Features',
	id: 'workspace_featuregrid',
	border: 0,
	columns: [{
			text: 'Genome',
			dataIndex: 'genome_name',
			flex: 2,
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
			}
		},{
			text: 'Product Description', 
			dataIndex: 'product', 
			flex: 3
		}, {
			text: 'Locus Tag', 
			dataIndex: 'locus_tag', 
			flex: 1,
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
			}
		}, {
			text: 'Annotation', 
			dataIndex: 'annotation', 
			flex: 1
		}, {
			text: 'Feature Type', 
			dataIndex: 'feature_type', 
			flex: 1
		}, {		
			text: 'Start', 
			dataIndex: 'start_max', 
			flex: 1
		}, {
			text: 'End', 
			dataIndex: 'end_min', 
			flex: 1
		}, {
			text: 'Length (NT)', 
			dataIndex: 'na_length', 
			flex: 1
		}, {
			text: 'Strand', 
			dataIndex: 'strand', 
			flex: 1
		}, {
			text: 'Accession',
			dataIndex: 'accession',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Locus Tag',
			dataIndex: 'refseq_locus_tag',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Protein',
			dataIndex: 'refseq_protein_id',
			flex: 1,
			hidden: true
		}
	],
	dockedItems: [{
		xtype: 'patricpagingtoolbar',
		store: 'Features',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {		
		this.callParent(arguments);
	}
});
Ext.define('VBI.Workspace.view.group.GenomeGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomegrid',
	store: 'Genomes',
	id: 'workspace_genomegrid',
	border: 0,
	columns: [{
		text: 'Organism Name', 
		dataIndex: 'genome_name', 
		flex: 2,
		renderer: function(value, p, record) {
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
		}
	}, {
		text: 'Size', 
		dataIndex: 'length', 
		flex: 1
	}, {
		text: 'PATRIC CDS', 
		dataIndex: 'rast_cds', 
		flex: 1
	}, {
		text: 'Legacy BRC CDS', 
		dataIndex: 'brc_cds', 
		flex: 1
	}, {		
		text: 'RefSeq CDS', 
		dataIndex: 'refseq_cds', 
		flex: 1
	}, {
		text: 'chromosome', 
		dataIndex: 'chromosome', 
		flex: 1
	}, {
		text: 'plasmid', 
		dataIndex: 'plasmid', 
		flex: 1
	}],
	dockedItems: [{
		xtype: 'patricpagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.callParent(arguments);
	}
});
/*
Ext.define('VBI.Workspace.view.group.GroupGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.groupgrid',
	store: 'Groups',
	id: 'workspace_groupgrid',
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	border: true,
	initComponent: function() {
		
		this.columns = [{
				header: 'Group Name', 
				dataIndex: 'name',
				flex: 2,
				editor: {
					allowBlank: false
				}
			}, {
				header: 'Description', 
				dataIndex: 'desc', 				
				flex: 3,
				editor: {
					allowBlank: true
				}
			}, {
				header: 'Members', 
				dataIndex: 'members', 
				flex: 1
			}, {
				header: 'Created', 
				dataIndex: 'cdate', 
				flex: 1
			}, {
				header: 'Modified', 
				dataIndex: 'mdate', 
				flex: 1
		}];
		
		this.tbar = {
			xtype: 'grouptoolbar',
			height: 70
		};
		
		this.dockedItems = [{
			xtype: 'pagingtoolbar',
			store: this.store,
			dock: 'bottom',
			displayInfo: true
		}];
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor:1,
			autoCancel: false
		});
		
		this.plugins = [rowEditing];
		
		this.callParent(arguments);
	}
});
*//**
 * @class GroupExplorer.view.group.InfoEditor
 * @extends Ext.form.Panel
 * @xtype groupinfoeditor
 *
 * This class implements an info/edit panel for a single group.
 */
Ext.define('VBI.Workspace.view.group.GroupInfoEditor', {
	extend: 'Ext.form.Panel',
	alias: 'widget.groupinfoeditor',
	id: 'workspace_groupinfoeditor',
	stateful: false,
	width: 225, 
	minWidth: 225, 
	bodyPadding: 8, 
	cls: 'x-infoeditor-view',
	defaultType: 'displayfield',
	fieldDefaults: {
		labelAlign: 'left', 
		anchor: '100%', 
	},
	items: [
		{
			xtype: 'component', 
			id: 'group-viewer-thumb',
			stateful: false,
			tpl: [
					'<tpl for=".">',
						'<div class="thumb-wrap">',
							'<div class="thumb">',
								(!Ext.isIE6? '<img src="{thumb}"  alt="{name}" title="{name}" />' : 
								'<div style="width:76px;height:76px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{thumb}\')"></div>'),
							'</div>', 
						'</div>', 
					'</tpl>'
			] 
		}, 
		{
			xtype: 'displayfield',
			name: 'groupname', 
			itemId: 'groupname', 
			hideLabel: true, 
			allowBlank: false, 
			style: {
				fontWeight: 'bold', 
				marginBottom: '3px'
			}, 
			value: 'none'
		}, 
		{
			xtype: 'displayfield',
			name: 'updated_min',
			hideLabel: true, 
			style: {
				paddingBottom: '5px',
				marginBottom: '5px',
				borderBottom: '1px dashed #000000'
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'descriptionlabel',
			fieldLabel: '<b>Description</b>',
			style: {
				marginBottom: '1px'
			}, 
			value: ''
		},
		{
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: ''
		},
		{
			xtype: 'displayfield',
			name: 'tags',
			fieldLabel: '<b>Tags</b>',
			labelWidth: 32, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'updated',
			fieldLabel: '<b>Last Updated</b>',
			labelWidth: 85, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'created',
			fieldLabel: '<b>Created</b>',
			labelWidth: 50, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		}, /*
		{
			xtype: 'displayfield',
			name: 'owner',
			fieldLabel: '<b>Owner</b>',
			labelWidth: 44, 
			style: {
					paddingBottom: '30px',
			}, 
			value: 'none'
		}, */
		{ 
			xtype: 'button', 
			itemId: 'editInfoBtn', 
			text: 'Edit', 
			iconCls: 'x-btn-edit', 
			iconAlign: 'right', 
			scope: this, 
			enableToggle: true
		}
	],


	/**
	 * Loads a given record into the panel. Updates the dataview containing the 
	 * group thumbnail and the form containing the group details.
	 * @param {Ext.data.Model} record The data record to load.
	 */
	loadRecord: function(record) {
		//console.log(record);
		
		this.record = record;
		
		// update the thumbnail for the group
		//console.log(Ext.ComponentQuery.query('infoviewer > dataview')[0]);
		Ext.getCmp('group-viewer-thumb').update({
			thumb: record.data.thumb 
		});
		
		// update the form elements
		this.getForm().setValues({
			groupname: record.data.name, 
			updated_min: Ext.Date.format(Ext.Date.parse(record.data.mdate, "Y-m-d H:i:s"), "x-date-relative"), 
			description: record.data.desc, 
			tags: record.data.tags,
			updated: Ext.Date.format(Ext.Date.parse(record.data.mdate, 'Y-m-d H:i:s'), 'M j, Y'), 
			//updated: record.data.mdate, 
			created: Ext.Date.format(Ext.Date.parse(record.data.cdate, 'Y-m-d H:i:s'), 'M j, Y'), 
			owner: record.data.owner
		});
		
	}, 
	
	startEdit: function() {
		
		this.remove('groupname');
		this.insert(1, {
			xtype: 'textfield',
			name: 'groupname', 
			itemId: 'groupname', 
			hideLabel: true, 
			allowBlank: false,
			value: 'none'
		});

		this.remove('description');
		this.insert(4, {
			xtype: 'textareafield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
			allowBlank: true,
			grow: true, 
			growMin: 20, 
			growMax: 100, 
			value: 'none'
		});

		this.loadRecord(this.record);		
		this.getComponent('editInfoBtn').setText('Save');
	}, 
		
	finishEdit: function() {
		
		var newInfo = this.getForm().getValues();
		this.record.set("desc", newInfo.description);
		this.record.set("name", newInfo.groupname);
		//console.log(this.record);
		Ext.StoreManager.lookup('Groups').sync();
		
		this.disableFields();
	}, 
	
	disableFields: function() {
		// disable the form elements by changing their types to displayfield
		this.remove('groupname');
		this.insert(1, {
			xtype: 'displayfield',
			name: 'groupname', 
			itemId: 'groupname', 
			hideLabel: true, 
			allowBlank: false, 
			style: {
				fontWeight: 'bold', 
				marginBottom: '3px'
			}, 
			value: 'none'
		});
		this.remove('description');
		this.insert(4, {
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
			style: {
				marginTop: '0px', 
				marginBottom: '15px' 
			}, 
			value: ''
		});
		this.loadRecord(this.record);
		this.getComponent('editInfoBtn').setText('Edit');
	}
	
});
Ext.define('VBI.Workspace.view.group.GroupToolbar', {
	extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.grouptoolbar',
	border: 0,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	id: 'workspace_grouptoolbar',
	stateful: false,
	getSelectedID: function() {
		var selection = Ext.getCmp('workspace_groupbrowser').getSelectionModel().getSelection();
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "no group selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("tagId"));
			});
			return selectedIDs;
		}
	},
	getSelectedGroupType: function() {
		var selection = Ext.getCmp('workspace_groupbrowser').getSelectionModel().getSelection();
		if (selection.length > 0) {
			return selection[0].get('type');
		}
	},
	refreshWorkspaceViews: function() {
		Ext.StoreManager.lookup('ColumnBrowser').refresh({
			callback:function() {
				Ext.StoreManager.lookup('Groups').load({
					callback: function() {
						Ext.StoreManager.lookup('Stations').load();
						updateCartInfo();
					}
				});
			}
		});
	},
    initComponent: function() {

		this.items = [
			{
				title: 'Workspace', 
				xtype: 'buttongroup', 
				columns: 1,
				items:[{
					xtype:'tbar_btn_remove',
					handler: function(btn, e) {
						
						var idList = this.findParentByType('grouptoolbar').getSelectedID();
						if (idList == null) { return false; }
												
						Ext.Msg.show({
							msg: 'Do you want to delete this group from your workspace?',
							buttons: Ext.Msg.OKCANCEL,
							icon: Ext.Msg.QUESTION,
							fn: function(buttonId, opt) {
								if (buttonId == "ok" && idList.length > 0) {
									Ext.Ajax.request({
										url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeGroup',
										params: {
											idList: idList.join(",")
										},
										success: function(response) {
											Ext.getCmp('workspace_grouptoolbar').refreshWorkspaceViews();
										}
									});
								}
							}
						});
						
					}
				}]
			}, '-',
			{
				title: 'Tools',
				xtype: 'buttongroup',
				items: [{
					scale: 'large',
					iconAlign: 'left',
					text: 'Group Explorer',
					icon: '/patric/images/toolbar_gse.png',
					handler: function() {
						var idList = this.findParentByType('grouptoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						var type = this.findParentByType('grouptoolbar').getSelectedGroupType();
						
						this.fireEvent("runGroupExplorer", idList.join(","), type);
					}
				}]
			},
			{
				title: 'Sort',
				xtype: 'buttongroup',
				columns: 3,
				items: [{
					text: 'Name Ascending',
					icon: '/patric/js/extjs4/resources/themes/images/default/grid/hmenu-asc.gif',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('name','ASC');
					}
				}, {
					text: 'Oldest First',
					icon: '/patric/images/calendar_icon.png',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('mdate','ASC');
					}
				}, {
					text: 'Smallest First',
					icon: '/patric/images/sort_count_asc.png',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('members','ASC');
					}
				}, {
					text: 'Name Descending',
					icon: '/patric/js/extjs4/resources/themes/images/default/grid/hmenu-desc.gif',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('name','DESC');
					}
				}, {
					text: 'Newest First',
					icon: '/patric/images/calendar_icon.png',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('mdate','DESC');
					}
				}, {
					text: 'Largest First',
					icon: '/patric/images/sort_count_des.png',
					handler: function() {
						Ext.StoreManager.lookup('Groups').sort('members','DESC');
					}
				}]
			},
			'->', '-',
			{
				xtype: 'tbar_btngrp_help'
			}
		];		
		this.callParent(arguments);
    }
});Ext.define('VBI.Workspace.view.group.ViewDetail', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.groupviewdetail',
	requires:[
		'VBI.Workspace.view.group.GroupInfoEditor',
		'VBI.Workspace.view.group.DetailToolbar',
		'VBI.Workspace.view.group.GenomeGrid',
		'VBI.Workspace.view.group.FeatureGrid'
	],
	border: 0,
	layout: 'border',
	height: '100%',
	items: [
		{
			region: 'west', 
			xtype: 'groupinfoeditor' 
		},
		{
			region: 'center', 
			xtype: 'panel',
			layout: 'card',
			activeItem: 'features',
			id: 'workspace_ingroupgrid',
			items: [{
				itemId: 'genomes',
				xtype: 'genomegrid'
			}, {
				itemId: 'features',
				xtype: 'featuregrid'
			}]
		}
	],
	dockedItems: [{
		xtype: 'detailtoolbar', 
		dock: 'top'
	}],
    initComponent: function() {	
		this.callParent(arguments);
	}
});
Ext.define('VBI.Workspace.view.GroupView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.groupview',
	id: 'workspace_groupview',
	requires: [
		'VBI.Workspace.view.group.GroupToolbar',
		//'VBI.Workspace.view.group.GroupGrid',
		'VBI.Workspace.view.group.Browser',
		'VBI.Workspace.view.group.ViewDetail'
	],
	border: true,
	layout: 'card',
	activeItem: 'browser',
	stateful: false,
	dockedItems:[{
		xtype: 'grouptoolbar',
		height: 80
	}],
	items:[{
		itemId: 'browser',
		xtype: 'groupbrowser'
	}, {
		itemId: 'detail',
		xtype: 'groupviewdetail'
	}],
	initComponent: function() {
		this.callParent(arguments);
	},
	showGroupBrowser: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "grouptoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.group.GroupToolbar', {id:'workspace_grp_grptbar', height:80}));
		}
		this.getLayout().setActiveItem('browser');
	},
	showFeatureGroupDetail: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "featuretoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.FeatureToolbar', {id:'workspace_grp_ftrtbar',height:80}));
		}
		this.getLayout().setActiveItem('detail');
	},
	showGenomeGroupDetail: function() {
		var tbar = this.getDockedComponent(0);
		if (tbar.getXType() != "genometoolbar") {	
			this.removeDocked(tbar);
			this.addDocked(Ext.create('VBI.Workspace.view.GenomeToolbar', {id:'workspace_grp_gmntbar',height:80}));
		}
		this.getLayout().setActiveItem('detail');
	}
});
Ext.define('VBI.Workspace.view.ListView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.listview',
	requires: [
		'VBI.Workspace.view.ColumnBrowser',
		'VBI.Workspace.view.FeatureView',
		'VBI.Workspace.view.GenomeView'
	],
	height: '100%',
	border: false,/*
	layout: {
		type: 'hbox',
		align: 'stretch'
		},*/
	layout: 'border',
	items: [{
			xtype: 'columnbrowser', //column browser
			title: 'Column Browser',
			width: 200,
			region: 'west',
			collapsible: true,
			resizable: true
		},
		{
			xtype: 'panel',
			region: 'center',
			layout: 'card',
			activeItem: 'featureview',
			id: 'workspace_listview',
			stateful: false,
			flex: 1,
			border: true,
			items: [{
				itemId: 'featureview',
				xtype: 'featureview'
			}, {
				itemId: 'genomeview',
				xtype: 'genomeview'
			}]
		}
	],
	initComponent: function() {	
		this.callParent(arguments);
	}
});
Ext.define('VBI.Workspace.view.PagingToolbar', {
	extend: 'Ext.PagingToolbar',
	alias: 'widget.patricpagingtoolbar',
	beforePageSizeText: 'Show',
	afterPageSizeText: 'per page',
	displayMsg : 'Displaying record {0} - {1} of {2}',
	getPagingItems: function() {
		var me = this;
		return [{
			itemId: 'first',
			tooltip: me.firstText,
			overflowText: me.firstText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
			disabled: true,
			handler: me.moveFirst,
			scope: me
		},{
			itemId: 'prev',
			tooltip: me.prevText,
			overflowText: me.prevText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
			disabled: true,
			handler: me.movePrevious,
			scope: me
		},
		'-',
		me.beforePageText,
		{
			xtype: 'numberfield',
			itemId: 'inputItem',
			name: 'inputItem',
			cls: Ext.baseCSSPrefix + 'tbar-page-number',
			allowDecimals: false,
			minValue: 1,
			hideTrigger: true,
			enableKeyEvents: true,
			selectOnFocus: true,
			submitValue: false,
			width: me.inputItemWidth,
			margins: '-1 2 3 2',
			listeners: {
				scope: me,
				keydown: me.onPagingKeyDown,
				blur: me.onPagingBlur
			}
		},{
			xtype: 'tbtext',
			itemId: 'afterTextItem',
			text: Ext.String.format(me.afterPageText, 1)
		},
		'-',
		{
			itemId: 'next',
			tooltip: me.nextText,
			overflowText: me.nextText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
			disabled: true,
			handler: me.moveNext,
			scope: me
		},{
			itemId: 'last',
			tooltip: me.lastText,
			overflowText: me.lastText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
			disabled: true,
			handler: me.moveLast,
			scope: me
		},
		'-', 
		/* modification start */
		me.beforePageSizeText,
		{
			xtype: 'numberfield',
			itemId: 'pagesize',
			cls: Ext.baseCSSPrefix + 'tbar-page-number',
			allowDecimals: false,
			minValue: 1,
			maxValue: 64000,
			hideTrigger: true,
			enableKeyEvents: true,
			selectOnFocus: true,
			submitValue: false,
			width: 50,
			margins: '-1 2 3 2',
			value: undefined,
			stateId: 'workspace_pagesize',
			stateEvents:['change'],
			getState: function() {
				//console.log("getState:"+this.value);
				return { pageSize: this.value };
			},
			applyState: function(state) {
				//console.log(state.pageSize, this.value);
				if ((state == undefined || state.pageSize == undefined) && this.value == undefined) {
					var state = { pageSize: 100 };
					this.setValue(state.pageSize);
				}
				else if (state != undefined && this.value != state.pageSize) {
					this.setValue(state.pageSize);
				}
			},
			listeners: {
				scope: me,
				specialKey: function(field, e) {
					if (e.getKey() == e.ENTER) {
						this.doRefresh();
					}
				}
			},
			onChange: function(newValue, oldValue, options) {
				var	value = newValue,
					valueIsNull = value === null;
					
				if (valueIsNull == false) {
					if (Ext.isString(me.store)) {
						var store = Ext.StoreManager.lookup(me.store);
						store.currentPage = 1;
						store.pageSize = value;
					} else {
						me.store.currentPage = 1;
						me.store.pageSize = value;
					}
				}
			}
		},
		me.afterPageSizeText,
		'-',
		/* end of modification */
		{
			itemId: 'refresh',
			tooltip: me.refreshText,
			overflowText: me.refreshText,
			iconCls: Ext.baseCSSPrefix + 'tbar-loading',
			handler: me.doRefresh,
			scope: me
		}];
	}
});Ext.define('VBI.Workspace.view.StationsList', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.stationslist',
	store: 'Stations',
	border: true,
	rootVisible: false,
	hideHeaders: true,
	useArrows: true,
	id: 'workspace_station',
	stateful: false,
	columns:[{
		xtype: 'treecolumn',
		text: 'Stations',
		dataIndex: 'name', 
		flex:1
	}],
	setDefault: function(station) {
		if (station == "Genomes") {
			this.getView().select(1);
			var node = this.getStore().getNodeById(3);
			this.fireEvent('itemclick', this.getView(), node);
		} else if (station == "Features") {
			this.getView().select(2);
			var node = this.getStore().getNodeById(2);
			this.fireEvent('itemclick', this.getView(), node);
		}
	},
	initComponent: function() {
		this.callParent(arguments);
	}
});
/**
* define Toolbar Buttons
*/
Ext.define('VBI.Workspace.view.Toolbar.button.Remove', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_remove',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'Remove',
	width: 110,
	icon: '/patric/images/toolbar_workspace_remove.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.Create', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_create',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'Create',
	width: 110,
	icon: '/patric/images/toolbar_workspace_add.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.MSA', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_msa',
	scale: 'large',  
	iconAlign: 'left', 
	text:'M S A', 
	icon: '/patric/images/toolbar_msa.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.MapIDsTo', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_mapidsto',
	scale: 'large',
	iconAlign: 'left',
	text:'MAP IDs to', 
	icon: '/patric/images/toolbar_id_mapping.png'
});

/**
* define menu Items
*/
Ext.define('VBI.Workspace.view.Toolbar.menu.Download_Table_Txt', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_tb_txt',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'Text File (.txt)',
    icon: '/patric/images/toolbar_text.png'
});

Ext.define('VBI.Workspace.view.Toolbar.menu.Download_Table_Xls', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_tb_xls',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'Excel file (.xls)',
    icon: '/patric/images/toolbar_excel.png'
});


Ext.define('VBI.Workspace.view.Toolbar.menu.Download_dna', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_dna',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'DNA',
    icon: '/patric/images/toolbar_dna.png',
});
Ext.define('VBI.Workspace.view.Toolbar.menu.Download_protein', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_protein',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'Protein',
    icon: '/patric/images/toolbar_protein.png'
});
Ext.define('VBI.Workspace.view.Toolbar.menu.Download_dnaprotein', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_dnaprotein',
	scale: 'small',  
	iconAlign: 'left', 
	text: 'DNA/Protein',
    icon: '/patric/images/toolbar_dna_protein.png'
});



/**
* define Toolbar ButtonGroups
*/
Ext.define('VBI.Workspace.view.Toolbar.buttongroup.Help', {
	extend: 'Ext.container.ButtonGroup',
	alias: 'widget.tbar_btngrp_help',
	title: 'Help',
    items: [{
        scale: 'large',
        text: 'FAQs',
        icon: '/patric/images/toolbar_faq.png',
        handler: function() {
			window.open("http://enews.patricbrc.org/faqs/", "_new", "menubar=1,resizable=1,scrollbars=1, fullscreen=1, toolbar=1,titlebar=1,status=1");
        }
    }]
});

/**
* define Modal 
*/
Ext.define('VBI.Workspace.view.Toolbar.window.AddToGroup', {
	extend: 'Ext.Window',
	alias: 'widget.tbar_window_addtogroup',
	layout:'fit',
	width:350,
	height:280,
	closeAction:'hide',
	plain: true,
	modal: true,
	items: [ATGform]
});
Ext.define('VBI.Workspace.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'VBI.Workspace.view.Toolbar',
		'VBI.Workspace.view.GlobalToolbar',
		'VBI.Workspace.view.PagingToolbar',
		'VBI.Workspace.view.StationsList',
		'VBI.Workspace.view.ListView',
		'VBI.Workspace.view.GroupView'
	],
	layout: 'fit',
	border: false,
	items: {
		xtype: 'panel',
		dockedItems: [{
			dock: 'top',
			xtype: 'globaltoolbar',
			height: 30
		}],
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
				xtype: 'stationslist', //source list
				width: 150
			}, 
			{
				xtype: 'panel',
				id: 'workspace_view',
				layout: 'card',
				activeItem: 'listview',
				stateEvents:['updateview'],
				getState: function() {
					return { activeItem: this.activeItem };
				},
				applyState: function(state) {
					if (state != undefined && this.activeItem != state.activeItem ) {
						this.activeItem = state.activeItem;
						this.fireEvent('updateview');
					}
				},
				flex: 1,
				border: false,
				items: [
					{
						itemId: 'listview',
						xtype: 'listview'
					}, {
						itemId: 'groupview',
						xtype: 'groupview'
				}]
		}]
	},
	initComponent: function() {
		//this.callParent();
		
		var me = this,
	     	html = Ext.fly(document.body.parentNode),
	    	el;
        me.callParent(arguments);
        //html.addCls(Ext.baseCSSPrefix + 'viewport');
        //if (me.autoScroll) {
        //    html.setStyle('overflow', 'auto');
        //}
        //me.el = el = Ext.getBody();
		me.el = el = Ext.get('wksp');
        // el.setHeight = Ext.emptyFn;
        // el.setWidth = Ext.emptyFn;
        //el.setSize = Ext.emptyFn;
		
        // el.dom.scroll = 'no';
        // me.allowDomMove = false;
         Ext.EventManager.onWindowResize(me.fireResize, me);
        // me.renderTo = me.el;
        // me.width = Ext.Element.getViewportWidth();
        // me.height = Ext.Element.getViewportHeight();
		me.width = Ext.Element.getViewportWidth() - 20;
		me.height = Ext.Element.getViewportHeight() - 300;
	},
	fireResize: function(w,h) {
		//console.log("resizing",w,h-300);
		this.setSize(w-20,h-300);
	}
});Ext.Loader.setConfig({
	enabled: true
});

Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
	expires: new Date(new Date().getTime()+(1000*60*60*24*7))
}));

Ext.application({
	name: 'VBI.Workspace',
	autoCreateViewport: true,
	launch: function() {
		// This is fired as soon as the page is ready
	},
	id: 'workspace',
	models: ['ColumnBrowser', 'Station', 'Feature', 'Genome', 'Group'],
	stores: ['ColumnBrowser', 'ColumnBrowser.Groups', 'ColumnBrowser.Tags', 'Stations', 'Features', 'Genomes', 'Groups', 'Mappings'],
	controllers: ['ColumnBrowser', 'Station', 'Feature', 'Genome', 'Group', 'GlobalToolbar']
});

Date.prototype.getDayOfYear = function(){
	var daysPerMonth = {
		1 : 31,	// jan
		2 : 28,	// feb
		3 : 31,	// mar
		4 : 30,	// apr
		5 : 31,	// may
		6 : 30,	// jun
		7 : 31,	// jul
		8 : 31,	// aug
		9 : 30,	// sep
		10: 31,	// oct
		11: 30,	// nov
		12: 31	// dec
	};

	// account for leap year
	if ((this.getFullYear()-1900)%4==0) 
		daysPerMonth[2] = 29;

	var doy = this.getDate();
	var i=this.getMonth()-1;
	while (i>0) {
		doy+=daysPerMonth[i];
		i--;
	}
	return doy;
};
Ext.Date.formatFunctions['x-date-relative'] = formatRelativeDate;

/**
	* This is our custom friendly Date formatter. It accepts an Ext.Date and 
	* formats it according to temporal distance from now:
	* 
	* <ul>
	* <li>A few seconds ago</li>
	* <li>A few minutes ago</li>
	* <li>About an hour ago</li>
	* <li>Today at [time]</li>
	* <li>Yesterday at [time]</li>
	* <li>Last [Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday]</li>
	* <li>About [1-6] weeks ago</li>
	* <li>[date]</li>
	* </ul>
	*
	* @param {Ext.Date} dateExt The date to format.
	* @return {String} The formatted date string.
	*
	* Due to a bug in ExtJS 4.0.2a, this function is not passed any arguments. so 
	* we just use 'this' for the Date to format.
	*
	* Due to the dysfunctional state of the Ext.Date object in ExtJDS 4.0.2a, 
	* we mostly use javascript Date functions instead of Ext.Date functions.
	*
*/
function formatRelativeDate(dateExt) {
	var dateExt = this;	// handle the no-argument bug
	var ms = Ext.Date.getElapsed(dateExt);
	var fullDate = Ext.Date.format(dateExt, 'M j, Y');	// Jan 1, 2001
	var fullTime = Ext.Date.format(dateExt, 'g:i a');		// 3:01 pm

	// handle the easy cases by ms comparisons
	// less than a minute
	if (ms<6e4) 
		return 'A few seconds ago';
	
	// less than 50 minutes ago
	if (ms<3e6) 
		return 'A few minutes ago';
	
	// less than 70 minutes ago
	if (ms<4.2e6) 
		return 'About an hour ago';
	

	// if not within the past hour, need some more sophistication
	// NOTE: calculations below all use javascript Date objects!

	// convert incoming Ext.Date to javascipt Date
	var dateStr = Ext.Date.format(dateExt, "d F, Y H:i:s");
	var date = new Date(Ext.Date.format(dateExt, "d F, Y H:i:s"));
	//var nt70 = new Date("01 January, 1970 00:00:00");
	//var msSince = Ext.Date.getElapsed(nt70, dateExt);
	//var date = new Date(msSince);

	// find out the now
	//var nowExt = Ext.Date.now();
	var now = new Date();
	var daysAgo = now.getDayOfYear()-date.getDayOfYear();
	var weeksAgo = Math.floor(daysAgo/7);
	var partialDaysAgo = (now.getDayOfYear()-date.getDayOfYear())%7;
	
	// more than a year ago
	if (now.getFullYear()-date.getFullYear() > 0) 
		return fullDate;
		
	// today (same year, same month, same day)
	if (now.getMonth()==date.getMonth() && now.getDate()==date.getDate()) 
		return 'Today at ' + fullTime;
	
	// yesterday (same year, same month, previous day)
	if (now.getMonth()==date.getMonth() && now.getDate()-date.getDate()==1) 
		return 'Yesterday at ' + fullTime;
	
	// within the past week
	if (weeksAgo==0 || (weeksAgo==1 && partialDaysAgo==0)) 
		return 'Last ' + Ext.Date.format(dateExt, 'l');
	
	// within the past ten days
	if (daysAgo<11) 
		return daysAgo + ' days ago';


	// 1-6 weeks ago
	// exact weeks
	if (weeksAgo<7 && partialDaysAgo==0) 
		return weeksAgo + ' weeks ago';
	
	// partial weeks
	if (weeksAgo<7 && partialDaysAgo<4) 
		return 'About ' + weeksAgo + ' weeks ago';
	if (weeksAgo<7 && partialDaysAgo>3) 
		return 'About ' + (weeksAgo+1) + ' weeks ago';

	return fullDate;
};
