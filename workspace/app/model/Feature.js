Ext.define('VBI.Workspace.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'na_feature_id',
	fields: [
		{name:'genome_info_id',		type:'int'},
		{name:'gid',				type:'int'},
		{name:'genome_name',		type:'string'},
		{name:'accession',			type:'string'},
		{name:'locus_tag',			type:'string'},
		{name:'na_feature_id',		type:'int'},
		{name:'annotation',			type:'string'},
		{name:'feature_type',		type:'string'},
		{name:'start_max',			type:'int'},
		{name:'end_min',			type:'int'},
		{name:'na_length',			type:'int'},
		{name:'strand',				type:'string'},
		{name:'protein_id',			type:'string'},
		{name:'aa_length',			type:'int'},
		{name:'gene',				type:'string'},
		{name:'is_pseudo',			type:'string'},
		{name:'bound_moiety',		type:'string'},
		{name:'anticodon',			type:'string'},
		{name:'product',			type:'string'},
		{name:'refseq_locus_tag',	type:'string'},
		{name:'pseed_id',			type:'string'}
	]
});
