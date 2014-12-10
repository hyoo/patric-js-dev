function renderGenomeName (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.genome_id, value);
};
function renderSeedId (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.feature_id, value);
};
function renderLocustag (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.feature_id, value);
};
function renderGenomeBrowserByFeature(value, metadata, record, rowIndex, colIndex, store) {
	var tracks = "DNA,PATRICGenes,RefSeqGenes",
		window_start = Math.max(0,(record.data.start-1000)),
		window_end = parseInt(record.data.end)+1000;

	return Ext.String.format('<a href="GenomeBrowser?cType=feature&cId={0}&loc={1}:{2}..{3}&tracks={4}"><img src="/patric/images/icon_genome_browser.gif"  alt="Genome Browser" style="margin:-4px" /></a>', 
			value, record.data.accession, window_start, window_end, tracks);
};
Ext.define('VBI.Workspace.view.columns.Feature', {
	extend: 'VBI.Workspace.view.columns.HeaderContainer',
	defaults: {
		align:'center'
	},
	items: [
		{text:'Genome Name',			itemId:'Feature_genome_name',		dataIndex:'genome_name',		flex:3, align:'left', renderer:renderGenomeName},
		{text:'Accession',				itemId:'Feature_accession',			dataIndex:'accession',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'SEED ID',				itemId:'Feature_seed_id',			dataIndex:'seed_id',			flex:2, align:'left', renderer:renderSeedId},
		{text:'RefSeq Locus Tag',		itemId:'Feature_refseq_locus_tag',	dataIndex:'refseq_locus_tag',	flex:2, renderer:BasicRenderer},
		{text:'Alt Locus Tag',			itemId:'Feature_alt_locus_tag',		dataIndex:'alt_locus_tag',		flex:2, align:'left', renderer:renderLocustag},
		{text:'Gene Symbol',			itemId:'Feature_gene',				dataIndex:'gene',				flex:1, renderer:BasicRenderer},
		{text:'Genome Browser',			itemId:'Feature_',					dataIndex:'feature_id',			flex:1, hidden:true, sortable: false, renderer:renderGenomeBrowserByFeature},
		{text:'Annotation',				itemId:'Feature_annotation',		dataIndex:'annotation',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Feature Type',			itemId:'Feature_feature_type',		dataIndex:'feature_type',		flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Start',					itemId:'Feature_start_max',			dataIndex:'start',				flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'End',					itemId:'Feature_end_min',			dataIndex:'end',				flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Length (NT)',			itemId:'Feature_na_length',			dataIndex:'na_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Strand',					itemId:'Feature_strand',			dataIndex:'strand',				flex:1, hidden:true},
		{text:'Protein ID',				itemId:'Feature_refseq_protein_id',	dataIndex:'protein_id',			flex:1, hidden:true, renderer:BasicRenderer},
		{text:'Length (AA)',			itemId:'Feature_aa_length',			dataIndex:'aa_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer},
		{text:'Product Description',	itemId:'Feature_product',			dataIndex:'product',			flex:4, align:'left', renderer:BasicRenderer}
	]
});
