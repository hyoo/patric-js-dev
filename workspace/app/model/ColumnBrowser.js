Ext.define('VBI.Workspace.model.ColumnBrowser', {
	extend: 'Ext.data.Model',
	idProperty: 'tagId',
	fields: [{name:'tagId', type:'int'}, 'name', 'tagType', 'type']
});
