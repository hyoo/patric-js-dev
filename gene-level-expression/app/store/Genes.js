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
			store.proxy.extraParams = Ext.Object.merge(store.proxy.extraParams, VBI.GeneExpression.param);
		},
		load: function(){
			this.updateRecordCount();
		}
	},
	updateRecordCount: function() {
		count = this.getCount();
		(count==1) ? countStr=count+' comparison' : countStr=count+' comparisons';
		Ext.getCmp('filterReport').setText("<b>"+countStr+"</b>");
	},
	filterField: function(fieldname, cutoff) {
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
			//this.filter("exp_name", param.keyword);
			this.filter([
				Ext.create('Ext.util.Filter', {property: "exp_name", value: param.keyword, root: 'data', anyMatch: true})
			]);
			// TODO: add search on accession, strain, mutant, condition, and timepoint, (pmid if possible)
		}
		if (param.log_ratio > 0) {
			this.filterField("exp_pratio", param.log_ratio);
		}
		if (param.zscore > 0) {
			this.filterField("exp_zscore", param.zscore);
		}
		//other filters
		/*
		if (param.accession != null && param.accession != "") {
			this.filter("exp_accession", param.accession);
		}*/
		
		this.updateRecordCount();
	}
});
