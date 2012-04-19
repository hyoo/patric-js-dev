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
			itemId: 'keyword',
			width: 200,
			hideLabel: true,
			allowBlank: true,
			value: '',
			emptyText: 'keyword',
			scope: this /*,
			listeners: {
				specialkey: function(field, e){
					// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
					// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
					if (e.getKey() == e.ENTER) {
						//
					}
				}
			}*/
		},
		{
			xtype: 'tbspacer',
			width: 20
		},
		{
			xtype: 'combobox',
			itemId: 'threshold',
			fieldLabel: 'Select fold change',
			queryMode: 'local',
			displayField: 'name',
			labelWidth: 115,
			value: 0,
			store: Ext.create('Ext.data.Store', {
				fields: ['name'],
				data: [{name:"0"}, {name:"0.5"}, {name:"1"}, {name:"1.5"}, {name:"2"}, {name:"2.5"}, {name:"3"}, {name:">3"}]
			}),			
			editable: false
		},
		{
			xtype: 'tbspacer',
			width: 20
		},
		{
			xtype: 'button',
			text: 'Filter',
			itemId: 'filter',
			handler: function() {
				// collect parameters
				var param = new Object();
				param.keyword = this.ownerCt.getComponent("keyword").getValue();
				param.threshold = this.ownerCt.getComponent("threshold").getValue();
				// fire filter
				this.fireEvent('filter', param);
			}
		},
		{
			xtype: 'tbspacer',
			width: 20
		},
		{
			xtype: 'button',
			text: 'Reset Filter',
			handler: function() {
				// reset interface
				this.ownerCt.getComponent("keyword").setValue('');
				this.ownerCt.getComponent("threshold").setValue(0);
				// fire reset
				this.fireEvent('reset');
			}
		}
	]
});
