Ext.define('VBI.Workspace.view.columns.Feature', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Genome',
		dataIndex: 'genome_name',
		flex: 2,
		align: 'left',
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
		}
	}, {
		text: 'Product Description', 
		dataIndex: 'product', 
		flex: 3,
		align: 'left',
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
		text: 'Annotation', 
		dataIndex: 'annotation',
		flex: 1,
		renderer: BasicRenderer
	}, {
		text: 'Feature Type', 
		dataIndex: 'feature_type',
		flex: 1,
		renderer: BasicRenderer
	}, {		
		text: 'Start', 
		dataIndex: 'start_max', 
		flex: 1,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'End', 
		dataIndex: 'end_min', 
		flex: 1,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'Length (NT)', 
		dataIndex: 'na_length', 
		flex: 1,
		align: 'right',
		renderer: BasicRenderer
	}, {
		text: 'Strand', 
		dataIndex: 'strand',
		flex: 1
	}, {
		text: 'Accession',
		dataIndex: 'accession',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {
		text: 'RefSeq Locus Tag',
		dataIndex: 'refseq_locus_tag',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}, {
		text: 'RefSeq Protein',
		dataIndex: 'refseq_protein_id',
		flex: 1,
		hidden: true,
		renderer: BasicRenderer
	}]
});
