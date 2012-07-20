Ext.define('TranscriptomicsUploader.controller.ViewController', {
	extend: 'Ext.app.Controller',
	models: [],
	views: ['SpecifyFile', 'MapGeneIdentifiers', 'DescribeExperiment', 'AddToGroup'],
	stores: ['FileTypes', 'FileFormats', 'GeneIDTypes'],
	init: function() {
		this.control({
			/*'filterpanel button': {
				reset: this.resetFilter
			}
			*/
		})
	}
});
