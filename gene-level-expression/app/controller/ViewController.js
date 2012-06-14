Ext.define('CoordView.controller.ViewController', {
	extend: 'Ext.app.Controller',
	id: 'ViewController',
	models: ['Gene', 'CategoryCount'],
	views: [
		'FilterPanel', 'FeatureGrid',
		'ChartStrain', 'ChartMutant', 'ChartCondition', 'BarChartCondition', 
		'ChartLogRatio', 'ChartZScore'
	],
	stores: [
		'Genes',
		'Strains', 'Mutants', 'Conditions', 'Conditions2', 
		'LogRatios', 'ZScores'
	],
	init: function() {
		this.control({
			'filterpanel button': {
				reset: this.resetFilter,
				filter: this.doFilter,
				showall: this.showAll
			},
			'chartstrain': {
				filter: this.doFilter
			}
		})
	},
	resetFilter: function() {
		var param = new Object({keyword:'', threshold:'', strain:'', mutant:'', condition:''});
		CoordView.param = Ext.Object.merge(CoordView.param, param);
		
		// reload
		Ext.getStore('Genes').clearFilter();
		Ext.getStore('Genes').updateRecordCount();
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
		
		Ext.getStore('Conditions2').load();
		
	},
	doFilter: function(param) {
		if (param != null) {
			CoordView.param = Ext.Object.merge(CoordView.param, param);
		}
		
		Ext.getStore('Genes').filterOnFly(CoordView.param);
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
		
		Ext.getStore('Conditions2').load();
	},
	showAll: function() {
		var param = new Object({sampleId:'', keyword:'', threshold:'', strain:'', mutant:'', condition:''});
		CoordView.param = Ext.Object.merge(CoordView.param, param);
		
		// reload
		Ext.getStore('Genes').proxy.extraParams = Ext.Object.merge(Ext.getStore('Genes').proxy.extraParams,CoordView.param);
		Ext.getStore('Genes').load();
		Ext.getStore('LogRatios').load();
		Ext.getStore('ZScores').load();
		Ext.getStore('Strains').load();
		Ext.getStore('Mutants').load();
		Ext.getStore('Conditions').load();
		
		Ext.getStore('Conditions2').load();
	}
});
