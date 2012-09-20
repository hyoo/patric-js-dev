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
		name: 'file0_type',
		fieldLabel: 'File Type',
		labelWidth: 180,
		width: 350,
		value: 'txt',
		store: 'FileTypes',
		queryMode: 'local',
		displayField: 'text',
		valueField: 'name',
		editable: false
	}, {
		xtype: 'container',
		layout: 'hbox',
		padding: '0 0 5px 0',
		items: [{
			xtype: 'combobox',
			name: 'file0_format',
			fieldLabel: 'File Format',
			labelWidth: 180,
			width: 350,
			value: 'matrix',
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
		xtype: 'container',
		padding: '5 80',
		items: [{
			xtype: 'imagecomponent',
			src: '/patric/images/transcriptomics_uploader_rule.png'
		}, {
			xtype: 'imagecomponent',
			src: '/patric/images/transcriptomics_uploader_rule.png'
		}]
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'filefield',
			name: 'file0',
			buttonOnly: true,
			buttonText: 'Choose File',
			fieldLabel: 'Specify a file on your computer',
			labelWidth: 180,
			width: 256,
			listeners: {
				'change': function (me, value, eOpts) {
					var arr = value.split("\\");
					var filename = arr[arr.length-1];
					//console.log(arr, filename, me.up('form').getForm().findField("expression_filename"));
					me.up('form').getForm().findField("expression_filename").setValue(filename);
				}
			}
		}, {
			xtype: 'displayfield',
			name: 'expression_filename',
			//value: '(no file has chosen)',
			padding: '0 0 0 20px'
		}]
	},{
		xtype: 'imagecomponent',
		padding: '5 80',
		src: '/patric/images/transcriptomics_uploader_rule_or.png'
	},{
		xtype: 'textfield',
		name: 'remoteData_1',
		fieldLabel: 'Specify a URL for a file',
		labelWidth: 180,
		anchor: '100%'
	},{
		xtype: 'displayfield',
		padding: '15 0 0 0',
		value: '<b>Specify the sample metadata to upload (optional)</b>'
	}, {
		// sample file type
		xtype: 'container',
		layout: 'hbox',
		padding: '0 0 5px 0',
		items: [{
			xtype: 'combobox',
			name: 'file1_type',
			fieldLabel: 'File Type',
			labelWidth: 180,
			width: 350,
			value: 'txt',
			store: 'FileTypes',
			queryMode: 'local',
			displayField: 'text',
			valueField: 'name',
			editable: false
		}, {
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: 'http://enews.patricbrc.org',
				html: "download template",
				target: '_blank'
			},
			padding: '0 0 0 15px'
		}]
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'filefield',
			name: 'file1',
			buttonOnly: true,
			buttonText: 'Choose File',
			fieldLabel: 'Specify a file on your computer',
			labelWidth: 180,
			width: 256,
			listeners: {
				'change': function (me, value, eOpts) {
					var arr = value.split("\\");
					var filename = arr[arr.length-1];
					me.up('form').getForm().findField("sample_filename").setValue(filename);
				}
			}
		}, {
			xtype: 'displayfield',
			name: 'sample_filename',
			//value: '(no file has chosen)',
			padding: '0 0 0 20px'
		}]
	}],
	buttons: [{
		text: 'Next',
		formBind: true,
		disabled: true,
		handler: function(me, e) {
			
			Ext.Ajax.request({
				url: '/portal/portal/patric/BreadCrumb/TranscriptomicsUploaderWindow?action=b&cacheability=PAGE',
				params: {
					mode: "create_collection"
				},
				success: function(response) {
					var jsonResponse = Ext.JSON.decode(response.responseText);
					var authToken = jsonResponse.token;
					var collectionId = jsonResponse.collection;
					var baseUrl = jsonResponse.url;
					var success = jsonResponse.success;
					
					/*
					var baseUrl = uploader.params.baseUrl;
					var authToken = uploader.params.authToken;
					var collectionId = uploader.params.collectionId;
					var success = true;
					//console.log("token="+authToken,"collection="+collectionId);
					*/
					
					if (success) {
					
						uploader.params = {"baseUrl": baseUrl, "authToken":authToken, "collectionId": collectionId};
						var form = me.up('form').getForm();
						var params = {
							file0_content: "expression",
							file0_orientation: "svg"
						};
						// sample metadata (optional)
						if (form.findField("file1").getValue() != "") {
							Ext.applyIf(params, {
								file1_format: "list",
								file1_content: "sample"
							});
						}
						// url upload
						if (form.findField("remoteData_1").getValue() != "") {
							Ext.applyIf (params, {
								remoteData_1_type: form.findField("file0_type").getValue(),
								remoteData_1_format: form.findField("file0_format").getValue(),
								remoteData_1_content: "expression",
								remoteData_1_orientation: "svg"
							});
						}
						if (form.isValid()) {
							form.submit({
								url: baseUrl+'/Collection/'+collectionId+"?http_accept=application/json&http_authorized_session=polyomic%20authorization_token%3D"+authToken,
								params: params,
								success: function(fm, action) {
									//console.log('success', action);
									
									var myMask = new Ext.LoadMask(uploader, {msg:"Uploading your file"});
									myMask.show();
									
									Ext.Ajax.request({
										url: '/portal/portal/patric/BreadCrumb/TranscriptomicsUploaderWindow?action=b&cacheability=PAGE',
										params: {
											mode: 'parse_collection',
											collectionId: collectionId
										},
										timeout: 60000,
										success: function(response) {
											uploader.params.parsed = Ext.JSON.decode(response.responseText);
											
											Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step02");
											Ext.getCmp("uploader").getComponent("steps").setActiveTab("step02");
											
											Ext.getCmp("MapGeneIdentifiersPanel").initParsedResult();
											
											myMask.hide();
										},
										failure: function(response) {
											console.log('Parsing failed', response);
										}
									});
								},
								failure: function(fm, action) {
									console.log('Form submission failed', action);
								}
							});
						}
						// end of file upload
					}
					else {
						// "create_collection" mode is failed
						Ext.Msg.alert("Status", jsonResponse.msg);
					}
					
				}
			});
			
		}
	}]
});
