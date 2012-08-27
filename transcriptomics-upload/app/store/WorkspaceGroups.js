/**
 * @class TranscriptomicsUploader.store.WorkspaceGroups
 * @extends Ext.data.Store
 *
 * This class implements the store for WorkspaceGroups.
 */
Ext.define('TranscriptomicsUploader.store.WorkspaceGroups', {
	extend: 'Ext.data.Store',
	fields: ['name', 'description', 'tags'],
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getGroupList&group_type=ExpressionExperiment',
		startParam: undefined,
		limitParam: undefined,
		pageParam: undefined,
		noCache: false,
		reader: {
			type: 'json'
		}
	},
	listeners: {
		load: function(me, records, successful, eOpts) {
			if (successful) {
				me.insert(0, {"name":"Create New Group"});
				me.insert(0, {"name":"None"});
			}
		}
	}
});
