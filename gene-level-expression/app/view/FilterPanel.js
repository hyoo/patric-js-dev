/**
 * @class CoordView.view.FilterPanel
 * @extends Ext.panel.Panel
 * @xtype filterpanel
 *
 * This class implements a chart of disease data.
 */
Ext.define('CoordView.view.FilterPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filterpanel',
	id: 'p-filterpanel',
	bodyPadding: 5,
	layout: 'hbox',
	items: [
		{
			xtype: 'textfield',
			name: 'filterField',
			id: 'filterTextField',
			itemId: 'filterText',
			width: 125,
			hideLabel: true,
			allowBlank: true,
			value: '',
			emptyText: 'Filter',
			scope: this,
			listeners: {
				specialkey: function(field, e){
					// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
					// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
					if (e.getKey() == e.ENTER) {
						clearTimeout(CoordView.filterCall);
						CoordView.filterCall=null;
						var val=field.getValue();
						CoordView.filter('exp_name', val, true);
					}
				}
			}
		},
		{
			xtype: 'numberfield',
			name: 'threshold',
			id: 'filter_threshold',
			fieldLabel: 'fold change',
			step: 0.5,
			value: 0,
			minValue: 0
		}, { /*
			xtype: 'textfield',
			name: 'filter_keyword',
			id: 'filter_keyword',
			emptyText: 'enter keyword'
		}, {*/
			xtype: 'button',
			text: 'Filter',
			handler: function() {
				//console.log("filter!!")
				//console.log(this);
				thrhd = Ext.getCmp("filter_threshold").value;
				Ext.getStore('Features').filterByRatio(thrhd);
			}
		}
	]
});
