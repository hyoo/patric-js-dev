function renderGenomeName (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
};
function renderLocustag (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
};
function renderGenomeBrowserByFeature(value, metadata, record, rowIndex, colIndex, store) {
	//metadata.tdAttr = 'data-qtip="Genome Browser" data-qclass="x-tip"';
	var tracks = "DNA,",
		window_start = Math.max(0,(record.data.start_max-1000)),
		window_end = parseInt(record.data.end_min)+1000;
	
	if (record.data.feature_type != null && record.data.feature_type == "CDS") {
		tracks += record.data.feature_type;
	} else if (record.data.feature_type != null && record.data.feature_type.indexOf(/.*RNA/) != -1) {
		tracks += "RNA";
	} else {
		tracks += "Misc";
	}
	if (record.data.annotation == "PATRIC") {
		tracks += "(PATRIC)";
	} else if (record.data.annotation == "Legacy BRC") {
		tracks += "(BRC)";
	} else {
		tracks += "(RefSeq)";
	}
	
	return Ext.String.format('<a href="GenomeBrowser?cType=genome&cId={0}&loc={1}:{2}..{3}&tracks={4}"><img src="/patric/images/icon_genome_browser.gif"  alt="Genome Browser" style="margin:-4px" /></a>', 
			record.data.gid, record.data.accession, window_start, window_end, tracks);
};
Ext.define('VBI.Workspace.view.columns.Feature', {
	defaults: {
		align:'center'/*,
		draggable: false,
		resizable: false*/
	},
	items: [
		{text:'Genome Name',			itemId:'Feature_genome_name',		dataIndex:'genome_name',		flex:3, align:'left', renderer:renderGenomeName},
		{text:'Accession',				itemId:'Feature_accession',			dataIndex:'accession',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Locus Tag',				itemId:'Feature_locus_tag',			dataIndex:'locus_tag',			flex:2, align:'left', renderer:renderLocustag},
		{text:'RefSeq Locus Tag',		itemId:'Feature_refseq_locus_tag',	dataIndex:'refseq_locus_tag',	flex:2, renderer:BasicRenderer},
		{text:'Gene Symbol',			itemId:'Feature_gene',				dataIndex:'gene',				flex:1, renderer:BasicRenderer},
		{text:'Genome Browser',			itemId:'Feature_',					dataIndex:'',					flex:1, hidden:true, sortable: false, renderer:renderGenomeBrowserByFeature},
		{text:'Annotation',				itemId:'Feature_annotation',		dataIndex:'annotation',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Feature Type',			itemId:'Feature_feature_type',		dataIndex:'feature_type',		flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Start',					itemId:'Feature_start_max',			dataIndex:'start_max',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'End',					itemId:'Feature_end_min',			dataIndex:'end_min',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Length (NT)',			itemId:'Feature_na_length',			dataIndex:'na_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Strand',					itemId:'Feature_strand',			dataIndex:'strand',				flex:1, hidden:true},
		{text:'Protein ID',				itemId:'Feature_refseq_protein_id',	dataIndex:'protein_id',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Length (AA)',			itemId:'Feature_aa_length',			dataIndex:'aa_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Anticodon',				itemId:'Feature_anticodon',			dataIndex:'anticodon',			flex:1, hidden:true},
		{text:'Product Description',	itemId:'Feature_product',			dataIndex:'product',			flex:4, align:'left', renderer:BasicRenderer},
		{text:'Bound Moiety',			itemId:'Feature_bound_moiety',		dataIndex:'bound_moiety',		flex:1, hidden:true}
	]
});
