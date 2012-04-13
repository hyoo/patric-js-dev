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
 		store: 'ExpressionRatios',
 		id: 'expavgchart',
 		axes: [
 			{
 				type: 'Numeric',
 				position: 'left',
 				fields: ['count'],
 				title: 'Records'
 			},
 			{
 				type: 'Category',
 				position: 'bottom',
 				fields: ['range'],
 				title: 'Range'
 			}
 		],
 		series: [{
 				type: 'bar',
 				column: true,
 				yField: ['count'],
 				xField: 'range',
				label: {
					display: 'insideEnd',
					field: 'count'
				}
 			}
 		]
 	}]
 });