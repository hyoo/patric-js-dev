/**
 * @class CoordView.store.Genes
 * @extends Ext.data.Store
 *
 * This class implements the store for genes.
 */
Ext.define('CoordView.store.Genes', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.Gene',
	proxy: {
		type: 'ajax',
		url: '/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE',
		extraParams: {
			storeType: 'features'
		},
		pageParam: undefined,
		startParam: undefined,
		limitParam: undefined,
		reader: {
			type: 'json',
			root: 'results'
		},
		noCache: false
	},
	autoLoad: true,
	listeners: {
		beforeload: function(store, operation, eOpts) {
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, CoordView.param);
		},
		load: function(){
			this.updateRecordCount();
		},
		single: true
	},
	updateRecordCount: function() {
		count = this.getCount();
		(count==1) ? countStr=count+' record' : countStr=count+' records';
		Ext.getCmp('filterReport').setText(countStr);
	},
	filterOnFly: function(param) {
		this.clearFilter();
		if (param.keyword != null && param.keyword != "") {
			//console.log("filter on exp_name:"+param.keyword);
			this.filter("exp_name", param.keyword);
		}
		if (param.threshold != null && param.threshold > 0) {
			//console.log("filter on threshold:"+param.threshold);
			this.filter([
				Ext.create('Ext.util.Filter', {
					filterFn: function(item) {
						if (item.get("exp_pratio")>=param.threshold || item.get("exp_pratio")<=(-1)*param.threshold) {
							return true;
						} else {
							return false;
						}
					}
				})
			]);
		}
		//other filters
		if (param.accession != null && param.accession != "") {
			console.log("filter on accession:"+param.accession);
			this.filter("exp_accession", param.accession);
		}
		
		this.updateRecordCount();
	}
});
