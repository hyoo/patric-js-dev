Ext.define('TranscriptomicsUploader.model.GenomeName', {
	extend: 'Ext.data.Model',
	idProperty: 'ncbi_taxon_id',
	fields: [{
		name: 'ncbi_taxon_id',
		type: 'int'
	}, {
		name: 'genome_info_id',
		type: 'int'
	}, {
		name: 'display_name',
		type: 'string'
	}]
});