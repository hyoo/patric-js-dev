/**
 * @class VBI.GeneExpression.view.FeatureGrid
 * @extends Ext.grid.Panel
 * @xtype featuregrid
 *
 * This class implements a grid of genes
 */
function BasicRenderer(value, metadata, record, rowIndex, colIndex, store){
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return value;
};

Ext.define('VBI.GeneExpression.view.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	store: 'Genes',
	autoScroll: true,
	columns: [
		{dataIndex: 'exp_platform',		header: 'Platform',		flex: 1, hidden: true},
		{dataIndex: 'exp_samples',		header: 'Samples',		flex: 1, hidden: true},
		{dataIndex: 'exp_locustag',		header: 'Locus Tag',	flex: 1, hidden: true},
		{dataIndex: 'exp_name',			header: 'Title',		flex: 4, renderer:BasicRenderer},
		{dataIndex: 'pmid',				header: 'PubMed',		flex: 1, 
			renderer: function(value, metadata, record, rowIndex, colIndex, store) {
				if (value != undefined && value != "") {
					return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}" target="_blank">{0}</a>', value);
				} else {
					return "";
				}
			}
		},
		{dataIndex: 'exp_accession',	header: 'Accession',	flex: 1,
			renderer: function (value, metadata, record, rowIndex, colIndex, store) {
				if (value != undefined && value !="") {
					return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc={0}" target="_blank">{0}</a>', value);
				} else {
					return "";
				}
			}
		},
		{dataIndex: 'exp_strain',		header: 'Strain',		flex: 1, renderer:BasicRenderer},
		{dataIndex: 'exp_mutant',		header: 'Gene Modification', flex: 1,	renderer:BasicRenderer},
		{dataIndex: 'exp_condition',	header: 'Experimental Condition', flex: 2,	renderer:BasicRenderer},
		{dataIndex: 'exp_timepoint',	header: 'Time Point',	flex: 1,	align: 'center'},
		{dataIndex: 'exp_pavg',			header: 'Avg Intensity',flex: 1},
		{dataIndex: 'exp_pratio',		header: 'Log Ratio',	flex: 1},
		{dataIndex: 'exp_zscore',		header: 'Z-score',		flex: 1}
	]
});
