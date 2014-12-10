Ext.define('VBI.Workspace.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'feature_id',
	fields: [
		{name:'genome_id',			type:'string'},
		{name:'genome_name',		type:'string'},
		{name:'sequence_id',		type:'string'},
		{name:'accession',			type:'string'},
		{name:'seed_id',			type:'string'},
		{name:'refseq_locus_tag',	type:'string'},
		{name:'alt_locus_tag',		type:'string'},
		{name:'feature_id',			type:'string'},
		{name:'annotation',			type:'string'},
		{name:'feature_type',		type:'string'},
		{name:'start',			type:'int'},
		{name:'end',			type:'int'},
		{name:'na_length',			type:'int'},
		{name:'strand',				type:'string'},
		{name:'protein_id',			type:'string'},
		{name:'aa_length',			type:'int'},
		{name:'gene',				type:'string'},
		{name:'product',			type:'string'}
	]
});
