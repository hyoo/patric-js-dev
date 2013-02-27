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
		align: 'center',
		draggable: false,
		resizable: false
	},
	items: [
		{text:'Source',			itemId:'Experiment_source',		dataIndex:'source',		flex:1, align:'left'}, 
		{text:'Title',			itemId:'Experiment_title',		dataIndex:'title',		flex:4, align:'left', renderer:renderExperimentTitle}, 
		{text:'Comparisons',	itemId:'Experiment_samples',	dataIndex:'samples',	flex:1},
		{text:'Genes',			itemId:'Experiment_genes',		dataIndex:'genes',		flex:1, renderer:renderGeneCount}, 
		{text:'PubMed',			itemId:'Experiment_pmid',		dataIndex:'pmid',		flex:1, renderer:renderPubmedID}, 
		{text:'Organism',		itemId:'Experiment_organism',	dataIndex:'organism',	flex:3, align:'left', renderer:BasicRenderer}
	]
});
