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
						//clearTimeout(CoordView.filterCall);
						//CoordView.filterCall=null;
						var val=field.getValue();
						CoordView.filter('exp_name', val, true);
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
			labelWidth: 105,
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
				var param = new Object();
				param.keyword = this.ownerCt.getComponent("keyword").value;
				param.threshold = this.ownerCt.getComponent("threshold").value;
				
				CoordView.param = Ext.Object.merge(CoordView.param, param);
				
				Ext.getStore('Features').filterOnFly(CoordView.param);
				Ext.getStore('ExpressionRatios').load();
				Ext.getStore('Accessions').load();
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
				
				// reset CoordView.param
				var param = new Object({keyword:'', threshold:''});
				CoordView.param = Ext.Object.merge(CoordView.param, param);
				
				// reload
				Ext.getStore('Features').clearFilter();
				Ext.getStore('Features').updateRecordCount();
				Ext.getStore('ExpressionRatios').load();
				Ext.getStore('Accessions').load();
			}
		}
	]
});
