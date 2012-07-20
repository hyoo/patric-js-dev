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
			scope: this
		},
		{
			xtype: 'tbspacer',
			width: 20
		},
		{
			xtype: 'combobox',
			itemId: 'log_ratio',
			fieldLabel: 'Log Ratio',
			queryMode: 'local',
			displayField: 'name',
			labelWidth: 60,
			width: 120,
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
			xtype: 'combobox',
			itemId: 'zscore',
			fieldLabel: 'Z-score',
			queryMode: 'local',
			displayField: 'name',
			labelWidth: 50,
			width: 120,
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
			handler: function() {
				// collect parameters
				var param = new Object();
				param.keyword 	= this.ownerCt.getComponent("keyword").getValue();
				param.log_ratio = this.ownerCt.getComponent("log_ratio").getValue();
				param.zscore 	= this.ownerCt.getComponent("zscore").getValue();
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
				this.ownerCt.getComponent("log_ratio").setValue(0);
				this.ownerCt.getComponent("zscore").setValue(0);
				// fire reset
				this.fireEvent('reset');
			}
		},
		{
			xtype: 'tbspacer',
			width: 20
		},
		{
			xtype: 'button',
			text: 'Show All Samples',
			handler: function() {
				// reset interface
				this.ownerCt.getComponent("keyword").setValue('');
				this.ownerCt.getComponent("log_ratio").setValue(0);
				this.ownerCt.getComponent("zscore").setValue(0);
				// fire filter
				this.fireEvent('showall');
			}
		}
	]
});
