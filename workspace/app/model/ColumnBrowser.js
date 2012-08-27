Ext.define('VBI.Workspace.model.ColumnBrowser', {
	extend: 'Ext.data.Model',
	fields: [{name:'tagId', type:'int'}, 'name', 'tagType', 'type'],
	idProperty: 'tagId',
});
