Ext.define('VBI.Workspace.view.columns.ExpressionExperiment', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Source',
		dataIndex: 'source',
		flex: 1,
		align: 'left'
	}, {
		text: 'Experiment Title', 
		dataIndex: 'title', 
		flex: 4,
		align: 'left',
		renderer: BasicRenderer
	}, {
		text: 'Edit', 
		dataIndex: 'expid', 
		flex: 1,
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			return Ext.String.format('<a href="Feature?cType=feature&cId={0}">E</a>', value);
		}
	}, {
		text: 'PubMed', 
		dataIndex: 'pmid',
		flex: 1,
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			if (value != undefined && value != "") {
				return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}">{0}</a>', value);
			} else {
				return "";
			}
		}
	}, {
		text: 'Samples', 
		dataIndex: 'samples',
		flex: 1
	}, {		
		text: 'Organism', 
		dataIndex: 'organism', 
		flex: 2,
		align: 'left',
		renderer: BasicRenderer
	}]
});
