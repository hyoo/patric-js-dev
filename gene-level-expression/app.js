Ext.application({
	name: 'CoordView',
	controllers: ['ViewController'],
	param: {},
	autoCreateViewport: true,
	launch: function() {
		var param = new Object();
		param.featureId = Ext.getDom('featureId').value;
		param.sampleId = Ext.getDom('sampleId').value;
		param.filter = Ext.getDom('filter').value;
		param.cutoff = Ext.getDom('cutoff').value;
		CoordView.param = param;
	}
});	
