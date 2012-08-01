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
		xtype: 'displayfield',
		value: '<b>Specify the file type to upload</b>'
	}, {
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
	}, {
		xtype: 'displayfield',
		value: ' '
	}, {
		xtype: 'filefield',
		itemId: 'file1',
		buttonOnly: true,
		buttonText: 'Choose File',
		fieldLabel: 'Specify a file on your computer',
		labelWidth: 180,
		anchor: '100%',
		listeners: {
			'change': function (me, value, eOpts) {
				console.log(me, value);
			}
		}
	},{
		xtype: 'displayfield',
		padding: '0 0 0 190px',
		value: '--- or ---'
	},{
		xtype: 'textfield',
		itemId: 'file2',
		fieldLabel: 'Specify a URL for a file',
		labelWidth: 180,
		anchor: '100%',
		validator: function (value) {
			var file1 = this.up('panel').getComponent("file1");
			if (file1.isValid() && file1.getValue()!="") {
				return true;
			} else {
				// validate url form
				if (Ext.form.field.VTypes.url(value)) { 
					return true;
				} else {
					return false;
				}
			}
		}
	}],
	buttons: [{
		text: 'Next',
		formBind: true,
		disabled: true,
		handler: function() {
			/*
			// process upload
			var form = this.up('form').getForm();
			if (form.isValid()) {
				form.submit({
					url: '',
					waitMsg: 'Uploading your file...',
					success: function(fp, o) {
						msg('Success', 'Processed file "'+o.result.file+'" on the server');
					}
				});
			}
			*/
			// navigation
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step02");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step02");
		}
	}]
});
