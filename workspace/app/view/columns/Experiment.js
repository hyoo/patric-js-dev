Ext.define('VBI.Workspace.view.columns.Experiment', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Source',
		dataIndex: 'source',
		flex: 1,
		align: 'left',
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
		}
	}, {
		text: 'Experiment Title', 
		dataIndex: 'title', 
		flex: 3,
		align: 'left',
		renderer: BasicRenderer
	}, {
		text: 'Edit', 
		dataIndex: '', 
		flex: 1,
		align: 'left',
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
			return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
		}
	}, {
		text: 'PubMed', 
		dataIndex: 'pubmed',
		flex: 1,
		renderer: BasicRenderer
	}, {
		text: 'Samples', 
		dataIndex: 'samples',
		flex: 1,
		renderer: BasicRenderer
	}, {		
		text: 'Organism', 
		dataIndex: 'organism', 
		flex: 1,
		align: 'right',
		renderer: BasicRenderer
	}]
});
