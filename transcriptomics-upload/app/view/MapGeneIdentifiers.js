/**
 * @class TranscriptomicsUploader.view.MapGeneIdentifiers
 * @extends Ext.form.Panel
 * @xtype mapgeneidentifiers
 *
 * This class implements a chart of condition types.
 */
Ext.define('TranscriptomicsUploader.view.MapGeneIdentifiers', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mapgeneidentifiers',
	border: false,
	bodyPadding: 10,
	fieldDefaults: {
		labelAlign: 'right'
	},
	items: [{
		xtype: 'displayfield',
		value: '<b>my-super-cool-data.csv (1232 gene IDs, 43 samples)</b>'
	}, {
		xtype: 'textarea',
		anchor: '100%'
	}, {
		xtype: 'displayfield',
		value: '<b>Specify organism name and ID typ to map data into PATRIC</b>'
	},{
		xtype: 'textfield',
		fieldLabel: 'Organism Name',
		anchor: '100%'
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'combobox',
			fieldLabel: 'Gene ID Type',
			width: 300,
			value: 'patric',
			store: 'GeneIDTypes',
			queryMode: 'local',
			displayField: 'text',
			valueField: 'name',
			editable: false
		}, {
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: 'http://enews.patricbrc.org',
				html: "what's this?",
				target: '_blank'
			},
			padding: '0 0 0 15px'
		}, {
			xtype: 'label',
			text: "Don't see your ID Type (",
			padding: '0 0 0 5px'
		}, {
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: 'http://enews.patricbrc.org',
				html: "FAQ",
				target: '_blank'
			}
		}, {
			xtype: 'label',
			text: ')'
		}]
	}, {
		//spacer between lines
		xtype: 'displayfield',
		value: ''
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'displayfield',
			value: '<b>Map your genes into PATRIC</b>'
		}, {
			xtype: 'button',
			text: 'Map Genes',
			margin: '0 0 0 20px',
			handler: function() {
				//enable next button
				//set mapping result
				//Ext.getCmp("mapping_result").setValue('All 1232 Brucella genes mapped to PATRIC');
				//Ext.getCmp("mapping_result").setValue('14 of 1232 genes did NOT map to PATRIC');
			}
		}]
	},{
		xtype: 'displayfield',
		id: 'mapping_result',
		value: 'You must map your genes into PATRIC before procedding to the next step'
	}],
	buttons: [{
		text: 'Previous',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step01");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step01");
		}
	}, {
		text: 'Next',
		formBind: true,
		disabled: true,
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step03");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step03");
		}
	}]
});
