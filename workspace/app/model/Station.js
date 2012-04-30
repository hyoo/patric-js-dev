Ext.define('VBI.Workspace.model.Station', {
	extend: 'Ext.data.Model',
	fields: [
		'id', 'name', 'type', 'leaf',
		{name: 'iconCls', type: 'string', defaultValue: 'x-tree-noicon'}
	],
	idProperty: 'id'
});
