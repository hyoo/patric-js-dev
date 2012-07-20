Ext.application({
	name: 'TranscriptomicsUploader',
	controllers: ['ViewController'],
	launch: function() {
		uploader = Ext.create('TranscriptomicsUploader.view.Viewport',{}).show();
	}
});	
