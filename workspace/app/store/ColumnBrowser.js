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
		},
		noCache: false
	},
	refresh: function(callback) {
		Ext.getStore('ColumnBrowser_Groups').removeAll(false);
		Ext.getStore('ColumnBrowser_Tags').removeAll(false);
		this.load(callback);
	},
	listeners: {
		load: function(store) {	
			store.clearFilter();
			store.filter("tagType", "Group");
			Ext.getStore('ColumnBrowser_Groups').add(store.getRange());
			store.clearFilter();
			store.filter("tagType", "String");
			Ext.getStore('ColumnBrowser_Tags').add(store.getRange());
		}
	}
});
