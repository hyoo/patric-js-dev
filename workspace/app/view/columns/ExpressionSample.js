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
		align:'center'
	},
	items: [
		{text:'Accession',						id:'Sample_accession_col',		dataIndex:'accession',		flex:1, align:'left' ,hidden:true}, 
		{text:'Title',							id:'Sample_expname_col',		dataIndex:'expname',		flex:4, align:'left', renderer:BasicRenderer}, 
		{text:'Genes',							id:'Sample_genes_col',			dataIndex:'genes',			flex:1, renderer:linkToGeneList}, 
		{text:'Significant genes(Log Ratio)',	id:'Sample_sig_log_ratio_col',	dataIndex:'sig_log_ratio',	flex:1, renderer:linkToGeneListFold}, 
		{text:'Significant genes(Z Score)',		id:'Sample_sig_z_score_col',	dataIndex:'sig_z_score',	flex:1, renderer:linkToGeneListZScore}, 
		{text:'Organism',						id:'Sample_organism_col',		dataIndex:'organism',		flex:1, align:'left', hidden: true, renderer:BasicRenderer}, 
		{text:'Strain', 						id:'Sample_strain_col',			dataIndex:'strain',			flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Gene Modification',				id:'Sample_mutant_col',			dataIndex:'mutant',			flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Experimental Condition',			id:'Sample_condision_col',		dataIndex:'condition',		flex:1, align:'left', renderer:BasicRenderer}, 
		{text:'Time Point',						id:'Sample_timepoint_col',		dataIndex:'timepoint',		flex:1, align:'left', renderer:BasicRenderer}
	]
});
