Ext.define('VBI.Workspace.store.ExpressionSamples', {
	extend: 'Ext.data.Store',
	requires: 'VBI.Workspace.model.ExpressionSample',
	model: 'VBI.Workspace.model.ExpressionSample',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport',
		extraParams: {
			action: 'getSamples',
			expsource: 'User'
		},
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		startParam: undefined,
		limitParam: undefined,
		pageParam: undefined,
		noCache: false
	},
	remoteSort: false
});
