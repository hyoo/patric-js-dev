/**
 * @class CoordView.store.Platforms
 * @extends Ext.data.Store
 *
 * This class implements the store for platforms.
 */
Ext.define('CoordView.store.Platforms', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Platform',
	storeId: 'platformStore',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'platforms',
			featureId: '',
			figfamId: ''
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'exp_stat_platform'
		},
		noCache: false
	},
	autoLoad: true,
	pageSize: 500
});
