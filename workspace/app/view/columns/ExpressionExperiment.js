function renderExperimentTitle (value, metadata, record, rowIndex, colIndex, store) {
	if (typeof record.get('expid') == "number") {
		return Ext.String.format('<a href="javascript:void(0)" onclick="launchExperimentDetail({1})">{0}</a>', value, record.get('expid'));
	} else {
		return Ext.String.format('<a href="javascript:void(0)" onclick="launchExperimentDetail(\'{1}\')">{0}</a>', value, record.get('expid'));
	}
};
function renderGeneCount (value, metadata, record, rowIndex, colIndex, store) {
	if (record.get("source") != "PATRIC") {
		return value;
	}
	if (value != 0) {
		return Ext.String.format('<a href="TranscriptomicsGene?cType=&cId=&dm=result&expId={1}&sampleId=&log_ratio=0&zscore=0">{0}</a>', 
			value, record.get("eid"));
	} else {
		return 0;
	}
};
function renderPubmedID (value, metadata, record, rowIndex, colIndex, store) {
	if (value != undefined && value != "") {
		return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}" target="_blank">{0}</a>', value);
	} else {
		return "";
	}
};

Ext.define('VBI.Workspace.view.columns.ExpressionExperiment', {
	defaults: {
		align: 'center'
	},
	items: [
		{text:'Source',			id:'Experiment_source_col',	dataIndex:'source',		flex: 1, align: 'left'}, 
		{text:'Title',			id:'Experiment_title_col',		dataIndex:'title',		flex: 4, align: 'left', renderer:renderExperimentTitle}, 
		{text:'Comparisons',	id:'Experiment_samples_col',	dataIndex:'samples',	flex: 1},
		{text:'Genes',			id:'Experiment_genes_col',		dataIndex:'genes',		flex: 1, renderer:renderGeneCount}, 
		{text:'PubMed',			id:'Experiment_pmid_col',		dataIndex:'pmid',		flex: 1, renderer:renderPubmedID}, 
		{text:'Organism',		id:'Experiment_organism_col',	dataIndex:'organism',	flex: 3, align:'left', renderer:BasicRenderer}
	]
});
