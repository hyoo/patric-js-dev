/**
 * @class TranscriptomicsUploader.view.SpecifyFile
 * @extends Ext.form.Panel
 * @xtype specifyfile
 *
 * This class implements a chart of condition types.
 */
Ext.define('TranscriptomicsUploader.view.SpecifyFile', {
	extend: 'Ext.form.Panel',
	alias: 'widget.specifyfile',
	border: false,
	bodyPadding: 10,
	fieldDefaults: {
		msgTarget: 'under',
		labelAlign: 'right'
	},
	items: [{
		xtype: 'fieldset',
		title: 'Specify the file type to upload',
		items: [{
			xtype: 'combobox',
			name: 'upload_file_type',
			fieldLabel: 'File Type',
			width: 300,
			value: 'csv',
			padding: '0 0 0 50px',
			store: 'FileTypes',
			queryMode: 'local',
			displayField: 'text',
			valueField: 'name',
			editable: false
		}, {
			xtype: 'container',
			layout: 'hbox',
			padding: '0 0 0 50px',
			items: [{
				xtype: 'combobox',
				name: 'upload_file_format',
				fieldLabel: 'File Format',
				width: 300,
				value: 'genematrix',
				store: 'FileFormats',
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
			}]
		}]
	}, {
		xtype: 'fieldset',
		defaults: {
			labelWidth: 180,
			anchor: '100%'
		},
		items: [{
			xtype: 'filefield',
			buttonOnly: true,
			buttonText: 'Choose File',
			fieldLabel: 'Specify a file on your computer'
		},{
			xtype: 'label',
			text: '--- or ---'
		},{
			xtype: 'textfield',
			fieldLabel: 'Specify a URL for a file'
		}]
	}],
	buttons: [{
		text: 'Next',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step02");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step02");
		}
	}]
});
