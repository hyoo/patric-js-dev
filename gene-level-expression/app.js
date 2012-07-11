Ext.application({
	name: 'CoordView',
	controllers: ['ViewController'],
	param: {},
	autoCreateViewport: true,
	launch: function() {
		var param = new Object();
		param.featureId = Ext.getDom('featureId').value;
		param.sampleId 	= Ext.getDom("sampleId")?Ext.getDom('sampleId').value:"";
		param.log_ratio = Ext.getDom("log_ratio")?Ext.getDom('log_ratio').value:0;
		param.zscore 	= Ext.getDom("zscore")?Ext.getDom('zscore').value:0;
		if (param.log_ratio > 0 || param.zscore > 0) {
			fp = Ext.getCmp("p-filterpanel");
			fp.getComponent("log_ratio").setValue(param.log_ratio);
			fp.getComponent("zscore").setValue(param.zscore);
		}
		CoordView.param = param;
	}
});	
