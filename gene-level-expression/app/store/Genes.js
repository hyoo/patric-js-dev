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
		if (param.filter != null && param.cutoff > 0) {
			var fieldname = "";
			if (param.filter == 'log_ratio') {
				fieldname = "exp_pratio";
			} else if (param.filter == 'z_score') {
				fieldname = "exp_zscore";
			} else {
				return false;
			}
			this.filter([
				Ext.create('Ext.util.Filter', {
					filterFn: function(item) {
						if (item.get(fieldname)>=param.cutoff || item.get(fieldname)<=(-1)*param.cutoff) {
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
