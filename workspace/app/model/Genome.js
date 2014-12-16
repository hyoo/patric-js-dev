Ext.define('VBI.Workspace.model.Genome', {
	extend: 'Ext.data.Model',
	idProperty: 'genome_id',
	fields: [
		{name:'genome_name',		type:'string'},
		{name:'genome_id',			type:'string'},
		{name:'genome_status',		type:'string'},
		{name:'isolation_country',	type:'string'},
		{name:'host_name',			type:'string'},
		{name:'oxygen_requirement',	type:'string'},
		{name:'sporulation',		type:'string'},
		{name:'temperature_range',	type:'string'},
		{name:'disease',			type:'string'},
		{name:'habitat',			type:'string'},
		{name:'motility',			type:'string'},
		{name:'sequences',			type:'int'},
		{name:'collection_date',	type:'string'},
		{name:'mlst', 				type:'string'},
		{name:'other_typing', 		type:'string'},
		{name:'genome_length',		type:'int'},
		{name:'complete',			type:'string'},
		{name:'patric_cds',			type:'int'},
		{name:'brc1_cds',			type:'int'},
		{name:'refseq_cds',			type:'int'},
		{name:'chromosomes',		type:'int'},
		{name:'plasmids',			type:'int'},
		{name:'contigs',			type:'int'},
		{name:'taxon_id',			type:'int'},
		{name:'organism_name',		type:'string'},
		{name:'strain',				type:'string'},
		{name:'serovar',			type:'string'},
		{name:'biovar',				type:'string'},
		{name:'pathovar',			type:'string'},
		{name:'culture_collection',	type:'string'},
		{name:'type_strain',		type:'string'},
		{name:'sequencing_centers',	type:'string'},
		{name:'completion_date',	type:'string'},
		{name:'publication',		type:'string'},
		{name:'completion_date',	type:'string'},
		{name:'bioproject_accession', type:'string'},
		{name:'biosample_accession', type:'string'},
		{name:'assembly_accession', type:'string'},
		{name:'genbank_accessions',	type:'string'},
		{name:'refseq_accessions',	type:'string'},
		{name:'sequencing_status',	type:'string'},
		{name:'sequencing_platform',type:'string'},
		{name:'sequencing_depth',	type:'string'},
		{name:'assembly_method',	type:'string'},
		{name:'gc_content',			type:'string'},
		{name:'isolation_site',		type:'string'},
		{name:'isolation_source',	type:'string'},
		{name:'isolation_comments',	type:'string'},
		{name:'geographic_location',type:'string'},
		{name:'latitude',			type:'string'},
		{name:'longitude',			type:'string'},
		{name:'altitude',			type:'string'},
		{name:'depth',				type:'string'},
		{name:'other_environmental', type:'string'},
		{name:'host_gender',		type:'string'},
		{name:'host_age',			type:'string'},
		{name:'host_health',		type:'string'},
		{name:'body_sample_site',	type:'string'},
		{name:'body_sample_subsite',type:'string'},
		{name:'other_clinical',		type:'string'},
		{name:'antimicrobial_resistance', type:'string'},
		{name:'antimicrobial_resistance_evidence', type:'string'},
		{name:'gram_stain',			type:'string'},
		{name:'cell_shape',			type:'string'},
		{name:'temperature_range',	type:'string'},
		{name:'optimal_temperature',type:'string'},
		{name:'salinity',			type:'string'},
		{name:'disease',			type:'string'},
		{name:'comments',			type:'string'},
		{name:'additional_metadata', type:'string'},
		{name:'highlight'}
	]
});