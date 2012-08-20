Ext.define('VBI.Workspace.store.Experiments', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.Experiment',
	model: 'VBI.Workspace.model.Experiment',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getFeatures',
		extraParams: {
			trackIds: ''
		},
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		noCache: false
	},
	stateId: 'workspace_pagesize',
	remoteSort: true,
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
