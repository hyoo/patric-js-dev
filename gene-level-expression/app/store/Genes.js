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
			Ext.get("p-featuregrid").mask("loading");
		},
		load: function(){
			this.updateRecordCount();
			Ext.get("p-featuregrid").unmask();
		}
	},
	updateRecordCount: function() {
		count = this.getCount();
		(count==1) ? countStr=count+' record' : countStr=count+' records';
		Ext.getCmp('filterReport').setText("<b>"+countStr+"</b>");
	},
	filterField: function(fieldname, cutoff) {
		//console.log("filter on "+fieldname+", "+cutoff);
		this.filter([
			Ext.create('Ext.util.Filter', {
				filterFn: function(item) {
					if (item.get(fieldname)>=cutoff || item.get(fieldname)<=(-1)*cutoff) {
						return true;
					} else {
						return false;
					}
				}
			})
		]);
	},
	filterOnFly: function(param) {
		this.clearFilter();
		if (param.keyword != null && param.keyword != "") {
			//console.log("filter on exp_name:"+param.keyword);
			this.filter("exp_name", param.keyword);
		}
		if (param.log_ratio > 0) {
			this.filterField("exp_pratio", param.log_ratio);			
		}
		if (param.zscore > 0) {
			this.filterField("exp_zscore", param.zscore);
		}
		//other filters
		if (param.accession != null && param.accession != "") {
			//console.log("filter on accession:"+param.accession);
			this.filter("exp_accession", param.accession);
		}
		
		this.updateRecordCount();
	}
});
