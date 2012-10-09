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
		text: 'Title', 
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
		text: 'Samples', 
		dataIndex: 'samples',
		flex: 1
	}, {
		text: 'Genes', 
		dataIndex: 'genes',
		flex: 1,
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			if (record.get("source") != "PATRIC") {
				return value;
			}
			if (value != 0) {
				return Ext.String.format('<a href="TranscriptomicsGene?cType=&cId=&dm=result&expId={1}&sampleId=&log_ratio=0&zscore=0">{0}</a>', 
					value, record.get("eid"));
			} else {
				return 0;
			}
		}
	}, {
		text: 'PubMed', 
		dataIndex: 'pmid',
		flex: 1,
		renderer: function(value, metadata, record, rowIndex, colIndex, store) {
			if (value != undefined && value != "") {
				return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}" target="_blank">{0}</a>', value);
			} else {
				return "";
			}
		}
	}, {		
		text: 'Organism', 
		dataIndex: 'organism', 
		flex: 3,
		align: 'left',
		renderer: BasicRenderer
	}]
});
