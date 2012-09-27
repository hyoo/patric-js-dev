Ext.define('VBI.Workspace.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'na_feature_id',
	fields: [{name:'aa_length', type:'int'}, 'accession', 'annotation', {name:'end_min', type:'int'}, 
		'feature_type', 'genome_name', {name:'gid',  type:'int'}, 'locus_tag', 
		{name:'na_feature_id', type:'int'}, {name:'na_length', type:'int'}, 'product', 'refseq_locus_tag',
		'refseq_protein_id', {name:'start_max', type:'int'},  'strand'
	]
});
