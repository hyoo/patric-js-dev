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
				href: 'http://enews.patricbrc.org/faqs/transcriptomics-faqs/upload-transcriptomics-data-to-workspace-faqs/#gene-matrix',
				html: "what's this?",
				target: '_blank'
			},
			listeners: {
				afterrender: function(link) {
					link.mon(link.el, 'click', function() { 
						Ext.create('Ext.tip.ToolTip', {
							target: link.el,
							html: 'File format describes how the expression data is orgnaized in your source file.  Gene Matrix format specifies gene identifiers in rows, samples in columns, and interior cells contain expression values as log-ratio.  Gene List format specifies gene ID, sample, and expressions value as log-ratio per row.'
						});
					}, this);
				}
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
		anchor: '100%',
		validator: function(value) {
			var file1 = this.up('form').getForm().findField("file0");
			
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
	},{
		xtype: 'displayfield',
		padding: '15 0 0 0',
		value: '<b>Specify the comparison metadata to upload (optional)</b>'
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
									
									// clear filenames
									fm.findField("expression_filename").setValue("");
									fm.findField("sample_filename").setValue("");
									//fm.findField("file0").setValue();
									//fm.findField("file0").validate();
									
									// parse
									var myMask = new Ext.LoadMask(uploader.body, {msg:"Uploading your file"});
									myMask.show();
									
									Ext.Function.defer(function() {
										Ext.Ajax.request({
											url: '/portal/portal/patric/BreadCrumb/TranscriptomicsUploaderWindow?action=b&cacheability=PAGE',
											params: {
												mode: 'parse_collection',
												collectionId: collectionId
											},
											timeout: 300000,
											success: function(response) {
												uploader.params.parsed = Ext.JSON.decode(response.responseText);
												myMask.hide();
												
												if (uploader.params.parsed.success == true) {
													
													Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step02");
													Ext.getCmp("uploader").getComponent("steps").setActiveTab("step02");
													
													Ext.getCmp("MapGeneIdentifiersPanel").initParsedResult();
													
												} else {
													Ext.Msg.alert('Fail', uploader.params.parsed.msg);
												}
											},
											failure: function(response) {
												console.log('Parsing failed', response);
											}
										});
									}, 1000);
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
