/**
 * @class TranscriptomicsUploader.store.GenomeNames
 * @extends Ext.data.Store
 *
 * This class implements the store for GenomeNames.
 */
Ext.define('TranscriptomicsUploader.store.GenomeNames', {
	extend: 'Ext.data.Store',
	model: 'TranscriptomicsUploader.model.GenomeName',
	proxy: {
		type: 'ajax',
		url: '/patric-common/jsp/genomeselector_support.json.jsp',
		startParam: undefined,
		limitParam: undefined,
		pageParam: undefined,
		noCache: false,
		reader: {
			type: 'json',
			root: 'genomeList',
			totalProperty: 'totalCount'
		},
		extraParams: {
			mode: 'search',
			start: 2,
			searchon: 'azlist'
		}
	}
});
