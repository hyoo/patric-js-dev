/**
 * @class CoordView.view.ExpAvgChart
 * @extends Ext.panel.Panel
 * @xtype expavgchart
 *
 * This class implements a chart of expression avg level.
 */
 Ext.define('CoordView.view.ExpAvgChart', {
 	extend: 'Ext.panel.Panel',
 	alias: 'widget.expavgchart',
 	id: 'p-expavgchart',
 	items: [{
 		xtype: 'chart',
 		store: 'ExpressionAvgs',
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
 				yField: 'count',
 				xField: 'range',
 				label: {
 					display: 'insideEnd',
 					field: 'count'
 				}
 			}
 		]
 	}]
 });
 