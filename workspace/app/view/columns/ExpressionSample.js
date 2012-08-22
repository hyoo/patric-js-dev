Ext.define('VBI.Workspace.view.columns.ExpressionSample', {
	defaults: {
		align: 'center'
	},
	items: [{
		text: 'Sample', 
		dataIndex: 'expname', 
		flex: 4,
		align: 'left',
		renderer: BasicRenderer
	}, {
		text: 'Genes', 
		dataIndex: 'genes', 
		flex: 1
	}, {
		text: 'Significant genes(Log Ratio)', 
		dataIndex: 'sig_log_ratio',
		flex: 1
	}, {
		text: 'Significant genes(Z Score)', 
		dataIndex: 'sig_z_score',
		flex: 1
	}, {		
		text: 'Sample Strain', 
		dataIndex: 'strain', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}, {		
		text: 'Gene modification', 
		dataIndex: 'mutant', 
		flex: 1,
		align: 'left',
		renderer: BasicRenderer
	}, {		
		text: 'Experiment Condition', 
		dataIndex: 'condition', 
		flex: 2,
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
