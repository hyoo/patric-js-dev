/**
 * @class CoordView.view.ChartCondition
 * @extends Ext.panel.Panel
 * @xtype chartcondition
 *
 * This class implements a chart of condition types.
 */
Ext.define('CoordView.view.ChartCondition', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.chartcondition',
	id: 'p-chartcondition',
	store: 'Conditions',
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
				param.condition = item.storeItem.getId();
				this.chart.fireEvent('filter', param);
				return true;
			}
		}
	}]
});
