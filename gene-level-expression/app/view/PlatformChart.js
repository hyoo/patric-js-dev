/**
 * @class CoordView.view.GenomeTypeChart
 * @extends Ext.panel.Panel
 * @xtype genometypechart
 *
 * This class implements a chart of genome types.
 */
Ext.define('CoordView.view.PlatformChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.platformchart',
	id: 'p-platformchart',
	
	items: [{
		xtype: 'chart',
		store: 'Platforms',
		theme: 'Base',
		animate: true,
		series: [{
			type: 'pie',
			field: 'count',
			highlight: {
				segment: {margin:10}
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
					//console.log('heard it!');
					console.log(item.storeItem.getId());
					CoordView.filter('platform', item.storeItem.getId());
					return true;
				}
			}
		}]
	}]
	
});
