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
	items: [/*{
		xtype: 'fieldset',
		title: 'my-super-gool-data.csv (1232 gene IDs, 53 samples)',
		items: [{
			xtype: 'textarea',
			name: 'parsed_dataset'
		}]
	}, */ 
	{
		xtype: 'label',
		text: 'my-super-cool-data.csv (1232 gene IDs, 43 samples)'
	}, {
		xtype: 'textarea',
		anchor: '100%'
	}, {
		xtype: 'fieldset',
		title: 'Specify organism name and ID typ to map data into PATRIC',
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Organism Name',
			//width: 300
			anchor: '100%'
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'combobox',
				fieldLabel: 'Gene ID Type',
				width: 300,
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
			xtype: 'button',
			text: 'Mapping',
			align: 'right'
		}]
	}, {
		xtype: 'fieldset',
		title: 'Mapping Result',
		items: [{
			xtype: 'label',
			//text: 'All 1232 Brucella genes mapped to PATRIC'
			text: '14 of 1232 genes did NOT map to PATRIC'
		}]
	}],
	buttons: [{
		text: 'Previous',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step01");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step01");
		}
	}, {
		text: 'Next',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step03");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step03");
		}
	}]
});
