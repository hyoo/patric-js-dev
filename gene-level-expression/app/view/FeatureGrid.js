/**
 * @class CoordView.view.GenomeGrid
 * @extends Ext.grid.Panel
 * @xtype genomegrid
 *
 * This class implements a grid of players.
 */
Ext.define('CoordView.view.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	id: 'p-featuregrid',
	store: 'Features',
	autoScroll: true,
	columns: [
		{dataIndex: 'exp_geneid',		header: 'ID',			flex: 1},
		{dataIndex: 'exp_accession',	header: 'Accession',	flex: 1},
		{dataIndex: 'exp_samples',		header: 'Samples',		flex: 1},
		{dataIndex: 'exp_platform',		header: 'Platform',		flex: 1},
		{dataIndex: 'exp_name',			header: 'Condition',	flex: 3},
		{dataIndex: 'exp_locustag',		header: 'Locus Tag',	flex: 1},
		{dataIndex: 'exp_pavg',			header: 'Avg',			flex: 1},
		{dataIndex: 'exp_pratio',		header: 'Ratio',		flex: 1}
	]
});
