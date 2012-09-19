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
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			if (typeof record.get('expid') == "number") {
				return Ext.String.format('<a href="javascript:void(0)" onclick="launchExperimentDetail({1})">{0}</a>', value, record.get('expid'));
			} else {
				return Ext.String.format('<a href="javascript:void(0)" onclick="launchExperimentDetail(\'{1}\')">{0}</a>', value, record.get('expid'));
			}
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
		flex: 3,
		align: 'left',
		renderer: BasicRenderer
	}]
});
