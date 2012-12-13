Ext.define('VBI.Workspace.view.columns.Feature', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Genome Name',
		dataIndex: 'genome_name',
		flex: 3,
		align: 'left',
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
		}
	}, {
		text: 'Accession',
		dataIndex: 'accession',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {
		text: 'Locus Tag', 
		dataIndex: 'locus_tag', 
		flex: 2,
		align: 'left',
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
			return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
		}
	}, {
		text: 'RefSeq Locus Tag',
		dataIndex: 'refseq_locus_tag',
		flex: 2,
		renderer: BasicRenderer
	}, {
		text: 'Gene Symbol',
		dataIndex: 'gene',
		flex: 1,
		renderer: BasicRenderer
	}, {
		text: 'Annotation', 
		dataIndex: 'annotation',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {
		text: 'Feature Type', 
		dataIndex: 'feature_type',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {		
		text: 'Start', 
		dataIndex: 'start_max', 
		flex: 1,
		hidden: true,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'End', 
		dataIndex: 'end_min', 
		flex: 1,
		hidden: true,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'Length (NT)', 
		dataIndex: 'na_length', 
		flex: 1,
		hidden: true,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'Strand', 
		dataIndex: 'strand',
		flex: 1,
		hidden: true
	}, {
		text: 'Protein ID',
		dataIndex: 'protein_id',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {
		text: 'Length (AA)', 
		dataIndex: 'aa_length', 
		flex: 1,
		hidden: true,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'Product Description', 
		dataIndex: 'product', 
		flex: 4,
		align: 'left',
		renderer: BasicRenderer
	}]
});
