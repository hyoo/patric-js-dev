Ext.define('VBI.Workspace.store.ExpressionSamples', {
	extend: 'Ext.data.Store',
	//requires: 'VBI.Workspace.model.ExpressionSample',
	//model: 'VBI.Workspace.model.ExpressionSample',
	fields: ['pid', 'expname', 'genes', 'sig_log_ratio', 'sig_z_score', 'strain', 'condition', 'timepoint'],
	data: [
		{pid:"S1", expname:'10 ug cefsulodin -5 min / untreated -5 min', genes:4147, sig_log_ratio: 0, sig_z_score: 160, strain: 'MG1655', condition: 'cefsulodin', timepoint: "-5"},
		{pid:"S2", expname:'0.03 ug mecillinam -5 min / untreated -5 min', genes:4147, sig_log_ratio: 0, sig_z_score: 154, strain: 'MG1655', condition: 'mecillinam', timepoint: "-5"}
	]
	/*
	'accession',
			{name:'channels', type:'int'},
			'condition',
			{name:'eid', type:'int'},
			{name:'expmean', type:'float'},
			'expname',
			{name:'expstddev', type:'float'},
			{name:'genes', type:'int'},
			'mutant', 'organism',
			{name:'pid', type:'int'},
			'platform',	
			'samples',
			{name:'sig_log_ratio', type:'int'},
			{name:'sig_z_score', type:'int'},
			'strain', 'timepoint'
	*/
	/*autoLoad: true,
	proxy: {
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getExperiments',
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
	}*/
});
