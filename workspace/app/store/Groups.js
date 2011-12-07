Ext.define('VBI.Workspace.store.Groups', {
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
