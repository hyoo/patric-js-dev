Ext.application({
	name: 'CoordView',
	controllers: ['ViewController'],
	param: {},
	autoCreateViewport: true,
	launch: function() {
		var param = new Object();
		param.featureId = Ext.getDom('featureId').value;
		param.sampleId = Ext.getDom("sampleId")?Ext.getDom('sampleId').value:"";
		param.filter = Ext.getDom("filter")?Ext.getDom('filter').value:"";
		param.cutoff = Ext.getDom("cutoff")?Ext.getDom('cutoff').value:"";
		if (param.filter != "" && param.cutoff != "") {
			fp = Ext.getCmp("p-filterpanel");
			//console.log(fp);
			fp.getComponent("filter").setValue(param.filter);
			fp.getComponent("cutoff").setValue(param.cutoff);
		}
		CoordView.param = param;
	}
});	
