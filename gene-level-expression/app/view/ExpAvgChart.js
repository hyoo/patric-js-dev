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
		store: 'Features',
		id: 'expavgchart',
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['exp_pavg'],
				title: 'Expression Level',
				minimum: -5
			},
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['rownum'],
				title: 'Samples',
				minimum: 0
			}/*
			{
				type: 'Category',
				position: 'bottom',
				fields: ['exp_samples'],
				title: 'Samples',
				minimum: 0
			}*/
		],
		series: [{
				type: 'scatter',
				markerConfig: {
					radius: 2,
					size: 2
				},
				axis: 'left',
				yField: 'exp_pavg',
				xField: 'rownum'
			}
		],
		listeners: {
			refresh: function(chart, eOpts) {
				chart.surface.removeAll();
				chart.redraw();
			}
		}
	}]
});