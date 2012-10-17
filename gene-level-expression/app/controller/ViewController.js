/**
 * @class VBI.GeneExpression.controller.ViewController
 * @extends Ext.app.Controller
 *
 * This class implements a controller.
 */
Ext.define('VBI.GeneExpression.controller.ViewController', {
	extend: 'Ext.app.Controller',
	models: ['Gene', 'CategoryCount'],
	views: ['FilterPanel', 'FeatureGrid', 'CategoryPieChart', 'CategoryBarChart'],
	stores: [
		'Genes',
		'Strains', 'Mutants', 'Conditions', 'StrainsTop5', 'MutantsTop5', 'ConditionsTop5',
		'LogRatios', 'ZScores'
	],
	init: function() {
		this.control({
			'filterpanel button': {
				reset: this.resetFilter,
				filter: this.doFilter,
				showall: this.showAll
			},
			'featuregrid > toolbar button': {
				downloadGrid: this.downloadGrid
			}/*,
			'categorypiechart': {
				filter: this.doFilter
			}*/
		})
	},
	resetFilter: function() {
		var param = new Object({keyword:'', threshold:'', strain:'', mutant:'', condition:''});
		VBI.GeneExpression.param = Ext.Object.merge(VBI.GeneExpression.param, param);
		
		// reload
		Ext.getStore('Genes').clearFilter();
		Ext.getStore('Genes').updateRecordCount();
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
	},
	doFilter: function(param) {
		if (param != null) {
			VBI.GeneExpression.param = Ext.Object.merge(VBI.GeneExpression.param, param);
		}
		
		Ext.getStore('Genes').filterOnFly(VBI.GeneExpression.param);
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
	},
	showAll: function() {
		var param = new Object({sampleId:'', keyword:'', threshold:'', strain:'', mutant:'', condition:''});
		VBI.GeneExpression.param = Ext.Object.merge(VBI.GeneExpression.param, param);
		
		// reload
		Ext.getStore('Genes').proxy.extraParams = Ext.Object.merge(Ext.getStore('Genes').proxy.extraParams, VBI.GeneExpression.param);
		Ext.getStore('Genes').load();
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
	},
	downloadGrid: function(type) {
		
		var idList = new Array();
		var store = Ext.getStore("Genes");
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.get('pid'));
		});
		var fids = {"na_feature_id":VBI.GeneExpression.param.featureId, "pid": idList.join(',')};
		
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "GeneExpression";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = Ext.JSON.encode(fids);
		Ext.getDom("idType").value = "GeneExpression-Pid";
		Ext.getDom("fTableForm").submit();
	}
});
