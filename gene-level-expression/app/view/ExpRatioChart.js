/**
 * @class CoordView.view.SizeVsGCChart
 * @extends Ext.panel.Panel
 * @xtype diseasechart
 *
 * This class implements a chart of genome size vs gc content.
 */
Ext.define('CoordView.view.ExpRatioChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.expratiochart',
	id: 'p-expratiochart',
	
	items: [{
		xtype: 'chart',
		store: 'Features',
//		theme: 'Base',
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['exp_pratio'],
				title: 'Expression Ratio',
				minimum: -3
			},
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['rownum'],
				title: 'Samples',
				minimum: 0
			}
		],
    series: [
			{
				type: 'scatter',
				markerConfig: {
					radius: 2,
					size: 2
				},
				axis: 'left',
				yField: 'exp_pratio',
				xField: 'rownum'
			}
    ]   
	}]
	
});


