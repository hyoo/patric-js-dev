Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'VBI.Workspace',
	autoCreateViewport: true,
	init: function() {
	},
	launch: function() {
		// This is fired as soon as the page is ready
		Ext.fly(document.body).setStyle('overflow', 'auto');
	},
	id: 'workspace',
	models: ['ExpressionExperiment', 'ExpressionSample'],
	stores: ['ExpressionExperiments', 'ExpressionSamples'],
	controllers: ['Experiment']
});

function BasicRenderer(value, metadata, record, rowIndex, colIndex, store){
	metadata.tdAttr = 'data-qtip="' + value + '" data-qclass="x-tip"';
	return value;
}

function launchExperimentDetail(expid) {
	Ext.getCmp("workspace_detailview").fireEvent('viewExpDetail', expid);
}