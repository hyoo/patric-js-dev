function renderGenomeName(value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.genome_info_id, value);
};
function renderGenomeBrowserByGenome(alue, metadata, record, rowIndex, colIndex, store) {
	var tracks = "DNA,CDS(PATRIC),gene(PATRIC),RNA(PATRIC)";
	return Ext.String.format('<a href="GenomeBrowser?cType=genome&cId={0}&loc={2}..{3}&tracks={4}"><img src="/patric/images/icon_genome_browser.gif" alt="Genome Browser" style="margin:-4px" /></a>', 
			record.data.genome_info_id, '', 0, 10000, tracks);
};
function renderCDS_Count_RAST(value, metadata, record, rowIndex, colIndex, store) {
	if(value != "0"){
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=PATRIC&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	}else{
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return "0";
	}
};
function renderCDS_Count_BRC(value, metadata, record, rowIndex, colIndex, store) {
	if(value != "0"){ 
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=BRC&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	}else{
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return "0";
	}
};
function renderCDS_Count_RefSeq(value, metadata, record, rowIndex, colIndex, store) {
	if(value != "0"){
		metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
		return Ext.String.format('<a href="FeatureTable?cType=genome&amp;cId={0}&amp;featuretype=CDS&amp;annotation=RefSeq&amp;filtertype=">{1}</a>', record.data.genome_info_id, value);
	}else{
		metadata.tdAttr = 'data-qtip="0" data-qclass="x-tip"';
		return "0";
	}
};

Ext.define('VBI.Workspace.view.columns.Genome', {
	defaults: {
		align: 'center'
	},
	items: [
		{header:'Organism Name',		dataIndex:'genome_name',		flex:2, align:'left', renderer:renderGenomeName}, 
		{header:'Genome Status',		dataIndex:'genome_status',		flex:1}, 
		{header:'Genome Browser',		dataIndex:'genome_browser',		flex:1, hidden:true, sortable:false, renderer:renderGenomeBrowserByGenome},
		{header:'Size',					dataIndex:'genome_length',		flex:1, hidden:true, align:'right'},
		{header:'Chromosome',			dataIndex:'chromosomes',		flex:1, hidden:true},
		{header:'Plasmids',				dataIndex:'plasmids',			flex:1, hidden:true},
		{header:'Contigs',				dataIndex:'contigs',			flex:1, hidden:true},
		{header:'Sequences',			dataIndex:'sequences',			flex:1, hidden:true/*, renderer:renderTotal*/},
		{header:'PATRIC CDS',			dataIndex:'rast_cds',			flex:1, renderer:renderCDS_Count_RAST},
		{header:'Legacy BRC CDS',		dataIndex:'brc_cds',			flex:1, hidden:true, renderer:renderCDS_Count_BRC},
		{header:'RefSeq CDS',			dataIndex:'refseq_cds',			flex:1, hidden:true, renderer:renderCDS_Count_RefSeq},
		{header:'Isolation Country',	dataIndex:'isolation_country',	flex:1}, 
		{header:'Host Name',			dataIndex:'host_name',			flex:1}, 
		{header:'Disease', 				dataIndex:'disease',			flex:1}, 
		{header:'Collection Date', 		dataIndex:'collection_date',	flex:1},
		{header:'Completion Date', 		dataIndex:'completion_date',	flex:1},
		{header:'Strain',				dataIndex:'strain', 			flex:1, hidden:true},      
		{header:'Serovar',				dataIndex:'serovar',			flex:1, hidden:true},
		{header:'Biovar',				dataIndex:'biovar',				flex:1, hidden:true},
		{header:'Pathovar',				dataIndex:'pathovar',			flex:1, hidden:true},
		{header:'Culture Collection',	dataIndex:'culture_collection',	flex:1, hidden:true},
		{header:'Type Strain',			dataIndex:'type_strain',		flex:1, hidden:true},
		{header:'Project Status', 		dataIndex:'project_status',		flex:1, hidden:true},
		{header:'Availability', 		dataIndex:'availability',		flex:1, hidden:true},
		{header:'Sequencing Center',	dataIndex:'sequencing_centers', flex:1, hidden:true},
		{header:'Publication', 			dataIndex:'publication',		flex:1, hidden:true},
		{header:'NCBI Project Id', 		dataIndex:'ncbi_project_id',	flex:1, hidden:true},
		{header:'RefSeq Project Id',	dataIndex:'refseq_project_id',	flex:1, hidden:true},
		{header:'Genbank Accessions',	dataIndex:'genbank_accessions',	flex:1, hidden:true},
		{header:'RefSeq Accessions',	dataIndex:'refseq_accessions',	flex:1, hidden:true},
		{header:'Sequencing Platform',	dataIndex:'sequencing_platform',flex:1, hidden:true},
		{header:'Sequencing Depth',		dataIndex:'sequencing_depth',	flex:1, hidden:true},
		{header:'Assembly Method',		dataIndex:'assembly_method',	flex:1, hidden:true},
		{header:'GC Content',			dataIndex:'gc_content',			flex:1, hidden:true},
		{header:'Isolation Site', 		dataIndex:'isolation_site',		flex:1, hidden:true},
		{header:'Isolation Source', 	dataIndex:'isolation_source',	flex:1, hidden:true},
		{header:'Isolation Comments',	dataIndex:'isolation_comments',	flex:1, hidden:true},
		{header:'Geographic Location',	dataIndex:'geographic_location',flex:1, hidden:true},
		{header:'Latitude',				dataIndex:'latitude',		 	flex:1, hidden:true},
		{header:'Longitude',			dataIndex:'longitude',		 	flex:1, hidden:true},
		{header:'Altitude', 			dataIndex:'altitude',		 	flex:1, hidden:true},
		{header:'Depth', 				dataIndex:'depth', 			 	flex:1, hidden:true},
		{header:'Host Gender',			dataIndex:'host_gender',	 	flex:1, hidden:true},
		{header:'Host Age', 			dataIndex:'host_age',		 	flex:1, hidden:true},
		{header:'Host Health',			dataIndex:'host_health',	 	flex:1, hidden:true},
		{header:'Body Sample Site',		dataIndex:'body_sample_site',	flex:1, hidden:true},
		{header:'Body Sample Subsite',	dataIndex:'body_sample_subsite',flex:1, hidden:true},
		{header:'Gram Stain',			dataIndex:'gram_stain',			flex:1, hidden:true},
		{header:'Cell Shape',			dataIndex:'cell_shape',			flex:1, hidden:true},
		{header:'Motility',				dataIndex:'motility',			flex:1, hidden:true},
		{header:'Sporulation',			dataIndex:'sporulation',		flex:1, hidden:true},
		{header:'Temperature Range',	dataIndex:'temperature_range',	flex:1, hidden:true},
		{header:'Optimal Temperature',	dataIndex:'optimal_temperature',flex:1, hidden:true},
		{header:'Salinity',				dataIndex:'salinity', 			flex:1, hidden:true},
		{header:'Oxygen Requirement',	dataIndex:'oxygen_requirement', flex:1, hidden:true},
		{header:'Habitat',				dataIndex:'habitat',			flex:1, hidden:true},
		{header:'Others',				dataIndex:'comments',			flex:1, hidden:true}
	]
});
