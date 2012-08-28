Ext.define('VBI.Workspace.store.ExpressionSamples', {
	extend: 'Ext.data.Store',
	//requires: 'VBI.Workspace.model.ExpressionSample',
	//model: 'VBI.Workspace.model.ExpressionSample',
	fields: ["accesion", "condition", "expmean", "expname", "expstddev", "modification", "organism", "pid", 
    "pubmed", "sampleUserGivenId", "strain"],
	/*fields: ['pid', 'expname', 'genes', 'sig_log_ratio', 'sig_z_score', 'strain', 'condition', 'timepoint'],
	data: [
		{pid:"S1", expname:'10 ug cefsulodin -5 min / untreated -5 min', genes:4147, sig_log_ratio: 0, sig_z_score: 160, strain: 'MG1655', condition: 'cefsulodin', timepoint: "-5"},
		{pid:"S2", expname:'0.03 ug mecillinam -5 min / untreated -5 min', genes:4147, sig_log_ratio: 0, sig_z_score: 154, strain: 'MG1655', condition: 'mecillinam', timepoint: "-5"}
	]*/
	autoLoad: false,
	proxy: {
		type: 'ajax',
		/*actionMethods: {
			read: 'POST'
		},*/
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport',
		extraParams: {
			action: 'getSamples',
			//expid: 'a8866d21-05fc-45d5-9c2f-0be94177b1bd',
			//sampleIds: '',
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
	//stateId: 'workspace_pagesize',
	remoteSort: false/*,
	filterByTracks: function(tracks) {
		if (Ext.isArray(tracks)) {
			this.getProxy().extraParams.trackIds = tracks.join(",");
			this.load();
		}
		else if (Ext.isNumber(tracks)) {
			this.getProxy().extraParams.trackIds = tracks;
			this.load();
		}
	}*/
});
