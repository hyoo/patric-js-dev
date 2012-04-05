/**
 * @class CoordView.view.GenomeTypeChart
 * @extends Ext.panel.Panel
 * @xtype genometypechart
 *
 * This class implements a chart of genome types.
 */
Ext.define('CoordView.view.GenomeTypeChart', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.genometypechart',
	id: 'p-genometypechart',
	
	items: [{
		xtype: 'chart',
		store: 'GenomeTypes',
		//theme: 'CatTheme',
		theme: 'Base',
		animate: true,
		series: [{
			type: 'pie',
			field: 'genome_count',
			highlight: {
				segment: {margin:10}
			},
			donut: 6,
			label: {
				field: 'genome_status',
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
					CoordView.filter('genome_status', item.storeItem.getId());
					return true;
				}
			}
		}]
	}]
	
});
