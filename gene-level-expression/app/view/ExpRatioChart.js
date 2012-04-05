/**
 * @class CoordView.view.ExpRatioChart
 * @extends Ext.panel.Panel
 * @xtype expratiochart
 *
 * This class implements a chart of expression ratio level.
 */
Ext.define('CoordView.view.ExpRatioChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.expratiochart',
	id: 'p-expratiochart',
	items: [{
		xtype: 'chart',
		store: 'Features',
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
