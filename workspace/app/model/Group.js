Ext.define('VBI.Workspace.model.Group', {
	extend: 'Ext.data.Model',
	fields: [{name:'tagId', type:'int'}, 'name', {name:'members', type:'int'}, 'cdate', 
		'mdate', 'desc', 'type', 
		{name: 'thumb', convert: function(value, record) {
				return '/patric/images/workspace_'+record.get('type').toLowerCase()+'_group.png';
			}
		}
	],
	idProperty: 'tagId'
});
