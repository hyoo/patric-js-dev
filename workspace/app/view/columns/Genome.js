function renderGenomeName(value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.genome_info_id, value);
};
function renderGenomeBrowserByGenome(alue, metadata, record, rowIndex, colIndex, store) {
	var tracks = "DNA,CDS(PATRIC),RNA(PATRIC)";
	return Ext.String.format('<a href="GenomeBrowser?cType=genome&cId={0}&loc={2}..{3}&tracks={4}"><img src="/patric/images/icon_genome_browser.gif" alt="Genome Browser" style="margin:-4px" /></a>', 
			record.data.genome_info_id, '', 0, 10000, tracks);
};
function renderCDS_Count_RAST(value, metadata, record, rowIndex, colIndex, store) {
	if (value != 0) {
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=PATRIC&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	} else {
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return 0;
	}
};
function renderCDS_Count_BRC(value, metadata, record, rowIndex, colIndex, store) {
	if (value != 0) { 
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=BRC&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	} else {
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return 0;
	}
};
function renderCDS_Count_RefSeq(value, metadata, record, rowIndex, colIndex, store) {
	if (value != 0) {
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=RefSeq&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	} else {
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return 0;
	}
};

Ext.define('VBI.Workspace.view.columns.Genome', {
	defaults: {
		align: 'center'/*,
		draggable: false,
		resizable: false*/
	},
	items: [
		{text:'Organism Name',			itemId:'Genome_genome_name',			dataIndex:'genome_name',				flex:2, align:'left', renderer:renderGenomeName},
		{text:'Genome Status',			itemId:'Genome_genome_status',			dataIndex:'genome_status',				flex:1}, 
		{text:'Genome Browser',			itemId:'Genome_genome_browser',			dataIndex:'genome_browser',				flex:1, hidden:true, sortable:false, renderer:renderGenomeBrowserByGenome},
		{text:'Size',					itemId:'Genome_genome_length',			dataIndex:'genome_length',				flex:1, hidden:true, align:'right'},
		{text:'Chromosome',				itemId:'Genome_chromosomes',			dataIndex:'chromosomes',				flex:1, hidden:true},
		{text:'Plasmids',				itemId:'Genome_plasmids',				dataIndex:'plasmids',					flex:1, hidden:true},
		{text:'Contigs',				itemId:'Genome_contigs',				dataIndex:'contigs',					flex:1, hidden:true},
		{text:'Sequences',				itemId:'Genome_sequences',				dataIndex:'sequences',					flex:1, hidden:true},
		{text:'PATRIC CDS',				itemId:'Genome_rast_cds',				dataIndex:'rast_cds',					flex:1, renderer:renderCDS_Count_RAST},
		{text:'Legacy BRC CDS',			itemId:'Genome_brc_cds',				dataIndex:'brc_cds',					flex:1, hidden:true, renderer:renderCDS_Count_BRC},
		{text:'RefSeq CDS',				itemId:'Genome_refseq_cds',				dataIndex:'refseq_cds',					flex:1, hidden:true, renderer:renderCDS_Count_RefSeq},
		{text:'Isolation Country',		itemId:'Genome_isolation_country',		dataIndex:'isolation_country',			flex:1},
		{text:'Host Name',				itemId:'Genome_host_name',				dataIndex:'host_name',					flex:1},
		{text:'Disease', 				itemId:'Genome_disease',				dataIndex:'disease',					flex:1},
		{text:'Collection Date', 		itemId:'Genome_collection_date',		dataIndex:'collection_date',			flex:1},
		{text:'Completion Date', 		itemId:'Genome_completion_date',		dataIndex:'completion_date',			flex:1},
		{text:'Strain',					itemId:'Genome_strain',					dataIndex:'strain', 					flex:1, hidden:true},
		{text:'Serovar',				itemId:'Genome_serovar',				dataIndex:'serovar',					flex:1, hidden:true},
		{text:'Biovar',					itemId:'Genome_biovar',					dataIndex:'biovar',						flex:1, hidden:true},
		{text:'Pathovar',				itemId:'Genome_pathovar',				dataIndex:'pathovar',					flex:1, hidden:true},
		{text:'Culture Collection',		itemId:'Genome_culture_collection',		dataIndex:'culture_collection',			flex:1, hidden:true},
		{text:'Type Strain',			itemId:'Genome_type_strain',			dataIndex:'type_strain',				flex:1, hidden:true},
		{text:'Project Status', 		itemId:'Genome_project_status',			dataIndex:'project_status',				flex:1, hidden:true},
		{text:'Availability', 			itemId:'Genome_availability',			dataIndex:'availability',				flex:1, hidden:true},
		{text:'Sequencing Center',		itemId:'Genome_sequencing_centers',		dataIndex:'sequencing_centers', 		flex:1, hidden:true},
		{text:'Publication', 			itemId:'Genome_publication',			dataIndex:'publication',				flex:1, hidden:true},
		{text:'NCBI Project Id', 		itemId:'Genome_ncbi_project',			dataIndex:'ncbi_project_id',			flex:1, hidden:true},
		{text:'RefSeq Project Id',		itemId:'Genome_refseq_project',			dataIndex:'refseq_project_id',			flex:1, hidden:true},
		{text:'Genbank Accessions',		itemId:'Genome_genbank_accessions',		dataIndex:'genbank_accessions',			flex:1, hidden:true},
		{text:'RefSeq Accessions',		itemId:'Genome_refseq_accessions',		dataIndex:'refseq_accessions',			flex:1, hidden:true},
		{text:'Sequencing Platform',	itemId:'Genome_sequencing_platform',	dataIndex:'sequencing_platform',		flex:1, hidden:true},
		{text:'Sequencing Depth',		itemId:'Genome_sequencing_depth',		dataIndex:'sequencing_depth',			flex:1, hidden:true},
		{text:'Assembly Method',		itemId:'Genome_assembly_method',		dataIndex:'assembly_method',			flex:1, hidden:true},
		{text:'GC Content',				itemId:'Genome_gc_content',				dataIndex:'gc_content',					flex:1, hidden:true},
		{text:'Isolation Site', 		itemId:'Genome_isolation_site',			dataIndex:'isolation_site',				flex:1, hidden:true},
		{text:'Isolation Source', 		itemId:'Genome_isolation_source',		dataIndex:'isolation_source',			flex:1, hidden:true},
		{text:'Isolation Comments',		itemId:'Genome_isolation_comments',		dataIndex:'isolation_comments',			flex:1, hidden:true},
		{text:'Geographic Location',	itemId:'Genome_geographic_location',	dataIndex:'geographic_location',		flex:1, hidden:true},
		{text:'Latitude',				itemId:'Genome_latitude',				dataIndex:'latitude',		 			flex:1, hidden:true},
		{text:'Longitude',				itemId:'Genome_longitude',				dataIndex:'longitude',		 			flex:1, hidden:true},
		{text:'Altitude', 				itemId:'Genome_altitude',				dataIndex:'altitude',		 			flex:1, hidden:true},
		{text:'Depth', 					itemId:'Genome_depth',					dataIndex:'depth', 			 			flex:1, hidden:true},
		{text:'Host Gender',			itemId:'Genome_host_gender',			dataIndex:'host_gender',	 			flex:1, hidden:true},
		{text:'Host Age', 				itemId:'Genome_host_age',				dataIndex:'host_age',		 			flex:1, hidden:true},
		{text:'Host Health',			itemId:'Genome_host_health',			dataIndex:'host_health',	 			flex:1, hidden:true},
		{text:'Body Sample Site',		itemId:'Genome_body_sample',			dataIndex:'body_sample_site',			flex:1, hidden:true},
		{text:'Body Sample Subsite',	itemId:'Genome_body_sample',			dataIndex:'body_sample_subsite',		flex:1, hidden:true},
		{text:'Gram Stain',				itemId:'Genome_gram_stain',				dataIndex:'gram_stain',					flex:1, hidden:true},
		{text:'Cell Shape',				itemId:'Genome_cell_shape',				dataIndex:'cell_shape',					flex:1, hidden:true},
		{text:'Motility',				itemId:'Genome_motility',				dataIndex:'motility',					flex:1, hidden:true},
		{text:'Sporulation',			itemId:'Genome_sporulation',			dataIndex:'sporulation',				flex:1, hidden:true},
		{text:'Temperature Range',		itemId:'Genome_temperature_range',		dataIndex:'temperature_range',			flex:1, hidden:true},
		{text:'Optimal Temperature',	itemId:'Genome_optimal_temperature',	dataIndex:'optimal_temperature',		flex:1, hidden:true},
		{text:'Salinity',				itemId:'Genome_salinity',				dataIndex:'salinity', 					flex:1, hidden:true},
		{text:'Oxygen Requirement',		itemId:'Genome_oxygen_requirement',		dataIndex:'oxygen_requirement', 		flex:1, hidden:true},
		{text:'Habitat',				itemId:'Genome_habitat',				dataIndex:'habitat',					flex:1, hidden:true},
		{text:'Others',					itemId:'Genome_comments',				dataIndex:'comments',					flex:1, hidden:true}
	]
});
