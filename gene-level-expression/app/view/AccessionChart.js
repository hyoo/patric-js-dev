/**
 * @class CoordView.view.AccessionChart
 * @extends Ext.panel.Panel
 * @xtype accessionchart
 *
 * This class implements a chart of genome types.
 */
Ext.define('CoordView.view.AccessionChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.accessionchart',
	id: 'p-accessionchart',
	store: 'Accessions',
	theme: 'Base',
	animate: true,
	series: [{
		type: 'pie',
		field: 'count',
		highlight: {
			segment: {
				margin:10
			}
		},
		donut: 6,
		label: {
			field: 'name',
			display: 'rotate',
			contrast: true,
			font: '11px Arial',
			renderer:function(val){
				return Ext.String.ellipsis(val, 30, true);
			}
		},
		listeners: {
			'itemmouseup': function(item, obj){
				var accession = item.storeItem.getId();
				CoordView.param.accession = accession;
				
				Ext.getStore('ExpressionRatios').load();
				Ext.getStore('Accessions').load();
				Ext.getStore('Features').filterOnFly(CoordView.param);
				return true;
			}
		}
	}]
});
