function linkToGeneList(value, metadata, record, rowIndex, colIndex, store) {
	if (record.get("source") != "PATRIC") {
		return value;
	}
	if (value != 0) {
		return Ext.String.format('<a href="TranscriptomicsGene?cType=&cId=&dm=result&expId={1}&sampleId={2}&log_ratio={3}&zscore={4}">{0}</a>', 
			value, record.get("eid"), record.get("pid"), 0, 0);
	} else {
		return 0;
	}
}
function linkToGeneListFold(value, metadata, record, rowIndex, colIndex, store) {
	if (record.get("source") != "PATRIC") {
		return value;
	}
	if (value != 0) {
		return Ext.String.format('<a href="TranscriptomicsGene?cType=&cId=&dm=result&expId={1}&sampleId={2}&log_ratio={3}&zscore={4}">{0}</a>', 
			value, record.get("eid"), record.get("pid"), 1, 0);
	} else {
		return 0;
	}
}
function linkToGeneListZScore(value, metadata, record, rowIndex, colIndex, store) {
	if (record.get("source") != "PATRIC") {
		return value;
	}
	if (value != 0) {
		return Ext.String.format('<a href="TranscriptomicsGene?cType=&cId=&dm=result&expId={1}&sampleId={2}&log_ratio={3}&zscore={4}">{0}</a>', 
			value, record.get("eid"), record.get("pid"), 0, 2);
	} else {
		return 0;
	}
}

Ext.define('VBI.Workspace.view.columns.ExpressionSample', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Accession',
		dataIndex: 'accession',
		flex: 1,
		align: 'left',
		hidden: true
	}, {
		text: 'Title', 
		dataIndex: 'expname', 
		flex: 4,
		align: 'left',
		renderer: BasicRenderer
	}, {
		text: 'Genes', 
		dataIndex: 'genes', 
		flex: 1,
		renderer: linkToGeneList
	}, {
		text: 'Significant genes(Log Ratio)', 
		dataIndex: 'sig_log_ratio',
		flex: 1,
		renderer: linkToGeneListFold
	}, {
		text: 'Significant genes(Z Score)', 
		dataIndex: 'sig_z_score',
		flex: 1,
		renderer: linkToGeneListZScore
	}, {		
		text: 'Organism', 
		dataIndex: 'organism', 
		flex: 1,
		align: 'left',
		hidden: true,
		renderer: BasicRenderer
	}, {		
		text: 'Strain', 
		dataIndex: 'strain', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}, {		
		text: 'Gene Modification', 
		dataIndex: 'mutant', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}, {		
		text: 'Experimental Condition', 
		dataIndex: 'condition', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}, {		
		text: 'Time Point', 
		dataIndex: 'timepoint', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}]
});
