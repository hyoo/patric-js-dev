
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
