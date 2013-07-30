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
};
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
};
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
};

Ext.define('VBI.Workspace.view.columns.ExpressionSample', {
	defaults: {
		align:'center',
		draggable: false,
		resizable: false
	},
	items: [
		{text:'Accession',						itemId:'Sample_accession',		dataIndex:'accession',		flex:1, align:'left' ,hidden:true}, 
		{text:'Title',							itemId:'Sample_expname',		dataIndex:'expname',		flex:4, align:'left', renderer:BasicRenderer}, 
		{text:'Genes',							itemId:'Sample_genes',			dataIndex:'genes',			flex:1, renderer:linkToGeneList}, 
		{text:'Significant genes(Log Ratio)',	itemId:'Sample_sig_log_ratio',	dataIndex:'sig_log_ratio',	flex:1, renderer:linkToGeneListFold}, 
		{text:'Significant genes(Z Score)',		itemId:'Sample_sig_z_score',	dataIndex:'sig_z_score',	flex:1, renderer:linkToGeneListZScore}, 
		{text:'Organism',						itemId:'Sample_organism',		dataIndex:'organism',		flex:1, align:'left', hidden: true, renderer:BasicRenderer}, 
		{text:'Strain', 						itemId:'Sample_strain',			dataIndex:'strain',			flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Gene Modification',				itemId:'Sample_mutant',			dataIndex:'mutant',			flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Experimental Condition',			itemId:'Sample_condision',		dataIndex:'condition',		flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Time Point',						itemId:'Sample_timepoint',		dataIndex:'timepoint',		flex:1, align:'left', renderer:BasicRenderer}
	]
});
