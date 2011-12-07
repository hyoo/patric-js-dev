Ext.define('VBI.Workspace.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'na_feature_id',
	//idProperty: 'rownum',
	fields: ['aa_length', 'accession', 'annotation', 'end_min', 'feature_type', 'genome_name', 'gid', 'locus_tag', 
		'na_feature_id', 'na_length', 'product',  'refseq_locus_tag', 'refseq_protein_id', 'start_max',  'strand']
});
