Ext.application({
	name: 'CoordView',
	controllers: ['ViewController'],
	param: {},
	autoCreateViewport: true,
	launch: function() {
		var param = new Object();
		param.featureId = Ext.getDom('featureId').value;
		param.exp_geneId = Ext.getDom('exp_geneId').value;
		CoordView.param = param;
	}
});	
