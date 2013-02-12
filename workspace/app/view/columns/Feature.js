function renderGenomeName (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
};
function renderLocustag (value, metadata, record, rowIndex, colIndex, store) {
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
};

Ext.define('VBI.Workspace.view.columns.Feature', {
	defaults: {
		align:'center'
	},
	items: [
		{text:'Genome Name',			id:'Feature_genome_name',		dataIndex:'genome_name',		flex:3, align:'left', renderer:renderGenomeName}, 
		{text:'Accession',				id:'Feature_accession',			dataIndex:'accession',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Locus Tag',				id:'Feature_locus_tag',			dataIndex:'locus_tag',			flex:2, align:'left', renderer:renderLocustag},
		{text:'RefSeq Locus Tag',		id:'Feature_refseq_locus_tag',	dataIndex:'refseq_locus_tag',	flex:2, renderer:BasicRenderer}, 
		{text:'Gene Symbol',			id:'Feature_gene',				dataIndex:'gene',				flex:1, renderer:BasicRenderer}, 
		{text:'Annotation',				id:'Feature_annotation',		dataIndex:'annotation',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Feature Type',			id:'Feature_feature_type',		dataIndex:'feature_type',		flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Start',					id:'Feature_start_max',			dataIndex:'start_max',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'End',					id:'Feature_end_min',			dataIndex:'end_min',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Length (NT)',			id:'Feature_na_length',			dataIndex:'na_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Strand',					id:'Feature_strand',			dataIndex:'strand',				flex:1, hidden:true}, 
		{text:'Protein ID',				id:'Feature_protein_id',		dataIndex:'protein_id',			flex:1, hidden:true, renderer:BasicRenderer}, 
		{text:'Length (AA)',			id:'Feature_aa_length',			dataIndex:'aa_length',			flex:1, hidden:true, align:'right', renderer:BasicRenderer}, 
		{text:'Product Description',	id:'Feature_product',			dataIndex:'product',			flex:4, align:'left', renderer:BasicRenderer}
	]
});
