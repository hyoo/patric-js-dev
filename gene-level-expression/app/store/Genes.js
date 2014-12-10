/**
 * @class VBI.GeneExpression.store.Genes
 * @extends Ext.data.Store
 *
 * This class implements a store for genes.
 */
Ext.define('VBI.GeneExpression.store.Genes', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.Gene',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'summary'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'features'
		},
		noCache: false
	},
	autoLoad: true,
	listeners: {
		beforeload: function(store, operation, eOpts) {
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, VBI.GeneExpression.param);
		},
		load: function(store, records, successful){
			this.updateRecordCount();

			Ext.getStore('Strains').loadRawData(store.proxy.reader.jsonData);
			Ext.getStore('Mutants').loadRawData(store.proxy.reader.jsonData);
			Ext.getStore('Conditions').loadRawData(store.proxy.reader.jsonData);
			Ext.getStore('LogRatios').loadRawData(store.proxy.reader.jsonData);
			Ext.getStore('ZScores').loadRawData(store.proxy.reader.jsonData);
		}
	},
	updateRecordCount: function() {
		count = this.getCount();
		(count==1) ? countStr=count+' comparison' : countStr=count+' comparisons';
		Ext.getCmp('filterReport').setText("<b>"+countStr+"</b>");
	}
});
