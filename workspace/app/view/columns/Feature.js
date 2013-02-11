function renderGenomeName (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
}

function renderLocustag (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
}

Ext.define('VBI.Workspace.view.columns.Feature', {
	defaults: {
		align:'center'
	},
	items: [
		{text:'Genome Name',			id:'Feature_genome_name_col',		dataIndex:'genome_name',		flex:3, align:'left', renderer:renderGenomeName}, 
		{text:'Accession',				id:'Feature_accession_col',			dataIndex:'accession',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Locus Tag',				id:'Feature_locus_tag_col',			dataIndex:'locus_tag',			flex:2, align:'left', renderer:renderLocustag},
		{text:'RefSeq Locus Tag',		id:'Feature_refseq_locus_tag_col',	dataIndex:'refseq_locus_tag',	flex:2, renderer:BasicRenderer}, 
		{text:'Gene Symbol',			id:'Feature_gene_col',				dataIndex:'gene',				flex:1, renderer:BasicRenderer}, 
		{text:'Annotation',				id:'Feature_annotation_col',		dataIndex:'annotation',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Feature Type',			id:'Feature_feature_type_col',		dataIndex:'feature_type',		flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Start',					id:'Feature_start_max_col',			dataIndex:'start_max',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'End',					id:'Feature_end_min_col',			dataIndex:'end_min',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Length (NT)',			id:'Feature_na_length_col',			dataIndex:'na_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Strand',					id:'Feature_strand_col',			dataIndex:'strand',				flex:1, hidden:true}, 
		{text:'Protein ID',				id:'Feature_protein_id_col',		dataIndex:'protein_id',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Length (AA)',			id:'Feature_aa_length_col',			dataIndex:'aa_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Product Description',	id:'Feature_product_col',			dataIndex:'product',			flex:4, align:'left', renderer:BasicRenderer}
	]
});
