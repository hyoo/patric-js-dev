Ext.define('TranscriptomicsUploader.controller.ViewController', {
	extend: 'Ext.app.Controller',
	models: ['GenomeName'],
	views: 	['SpecifyFile', 'MapGeneIdentifiers', 'DescribeExperiment', 'AddToGroup'],
	stores: ['DataTypes', 'FileTypes', 'FileFormats', 'GeneIDTypes', 'GenomeNames', 'WorkspaceGroups']
});
