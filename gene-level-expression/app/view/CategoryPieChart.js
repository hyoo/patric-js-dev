/**
 * @class CoordView.view.ChartCondition
 * @extends Ext.panel.Panel
 * @xtype chartcondition
 *
 * This class implements a chart of condition types.
 */
Ext.define('CoordView.view.CategoryPieChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.categorypiechart',
	animate: true,
	series: [{
		type: 'pie',
		field: 'count',
		highlight: {
			segment: {
				margin:20
			}
		},
		donut: 20,
		label: {
			field: 'category',
			display: 'rotate',
			contrast: true
		}
		/*,
		listeners: {
			'itemmouseup': function(item, obj){
				console.log(item);
				var param = new Object();
				param.condition = item.storeItem.getId();
				this.chart.fireEvent('filter', param);
				return true;
			}
		}*/
	}],
	theme: 'PATRIC'
});
