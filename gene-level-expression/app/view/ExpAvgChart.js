/**
 * @class CoordView.view.SizeVsGCChart
 * @extends Ext.panel.Panel
 * @xtype diseasechart
 *
 * This class implements a chart of genome size vs gc content.
 */
Ext.define('CoordView.view.ExpAvgChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.expavgchart',
	id: 'p-expavgchart',
	
	items: [{
		xtype: 'chart',
		store: 'Features',
//		theme: 'Base',
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
    series: [
			{
				type: 'scatter',
				markerConfig: {
					radius: 2,
					size: 2
				},
				axis: 'left',
				yField: 'exp_pavg',
				xField: 'rownum'
			}
    ]   
	}]
	
});


