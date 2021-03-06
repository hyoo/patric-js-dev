Ext.define('VBI.Workspace.store.ExpressionExperiments', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.ExpressionExperiment',
	model: 'VBI.Workspace.model.ExpressionExperiment',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		api: {
			read: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getPublicExperiments'
		},
		extraParams: {
			trackIds: ''
		},
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		writer: {
			type: 'json',
			writeAllFields: false,
			root: 'experiment_info',
			encode: true
		},
		noCache: false
	},
	pageSize: 20,
	remoteSort: false,
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
