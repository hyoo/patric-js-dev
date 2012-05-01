/**
 * @class CoordView.view.ChartMutant
 * @extends Ext.panel.Panel
 * @xtype chartmutant
 *
 * This class implements a chart of genome types.
 */
Ext.define('CoordView.view.ChartMutant', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chartmutant',
	id: 'p-chartmutant',
	store: 'Mutants',
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
			field: 'category',
			display: 'rotate',
			contrast: true,
			font: '11px Arial',
			renderer:function(val){
				return Ext.String.ellipsis(val, 30, true);
			}
		},
		listeners: {
			'itemmouseup': function(item, obj){
				var param = new Object();
				param.accession = item.storeItem.getId();
				this.chart.fireEvent('filter', param);
				return true;
			}
		}
	}]
});
