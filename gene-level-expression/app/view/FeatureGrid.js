/**
 * @class CoordView.view.GenomeGrid
 * @extends Ext.grid.Panel
 * @xtype genomegrid
 *
 * This class implements a grid of players.
 */
function BasicRenderer(value, metadata, record, rowIndex, colIndex, store){
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return value;
};

Ext.define('CoordView.view.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	store: 'Genes',
	autoScroll: true,
	columns: [
		{dataIndex: 'exp_accession',	header: 'Accession',	flex: 1, hidden: true},
		{dataIndex: 'exp_platform',		header: 'Platform',		flex: 1, hidden: true},
		{dataIndex: 'exp_samples',		header: 'Samples',		flex: 1, hidden: true},
		{dataIndex: 'exp_locustag',		header: 'Locus Tag',	flex: 1, hidden: true},
		{dataIndex: 'exp_name',			header: 'Exp Name',		flex: 4,	renderer:BasicRenderer},
		{dataIndex: 'exp_strain',		header: 'Strain',		flex: 1,	renderer:BasicRenderer},
		{dataIndex: 'exp_mutant',		header: 'Mutant',		flex: 1,	renderer:BasicRenderer},
		{dataIndex: 'exp_condition',	header: 'Condition',	flex: 2,	renderer:BasicRenderer},
		{dataIndex: 'exp_pavg',			header: 'Avg Intensity',flex: 1},
		{dataIndex: 'exp_pratio',		header: 'Ratio',		flex: 1},
		{dataIndex: 'exp_zscore',		header: 'Z Score',		flex: 1}
	]
});
