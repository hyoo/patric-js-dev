Ext.define('VBI.Workspace.store.ColumnBrowser_Tags', {
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
