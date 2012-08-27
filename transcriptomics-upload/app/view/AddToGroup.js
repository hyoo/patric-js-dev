/**
 * @class TranscriptomicsUploader.view.AddToGroup
 * @extends Ext.form.Panel
 * @xtype addtogroup
 *
 * This class implements a chart of condition types.
 */
Ext.define('TranscriptomicsUploader.view.AddToGroup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.addtogroup',
	border: false,
	bodyPadding: 10,
	fieldDefaults: {
		labelWidth: 80,
		anchor: '100%'
	},
	items: [{
		xtype: 'displayfield',
		value: '<b>Specify a Group for this Experiment (optional)</b>'
	}, {
		xtype: 'combobox',
		name: 'atg',
		fieldLabel: 'Add to Group',
		store: 'WorkspaceGroups',
		editable: false,
		displayField: 'name',
		valueField: 'name',
		id: 'test_this_form',
		listeners: {
			added: function (me, option) {
				me.select("None");
			},
			change: function (me, newValue, oldValue, eOpts) {
				var form = me.up("form");
				
				if (oldValue == undefined) {
					return false;
				}
				
				//console.log(form, newValue, oldValue);
				//console.log(form.child("#groupName"));
				
				if (newValue == "None") {
					form.child("#groupName").setDisabled(true);
					form.child("#groupDesc").setDisabled(true);
				}
				else if (newValue == "Create New Group") {
					
					form.child("#groupName").setDisabled(false);
					form.child("#groupName").setValue("");
					form.child("#groupName").focus();
					form.child("#groupName").setReadOnly(false);
						
					form.child("#groupDesc").setDisabled(false);
					form.child("#groupDesc").setValue("");
					
					form.child("#groupTag").setValue("");
					
				} else {
					
					record = me.getStore().findRecord("name", newValue, undefined, undefined, undefined, true);
					
					form.child("#groupName").setDisabled(false);
					form.child("#groupName").setValue(record.get("name"));
					form.child("#groupName").setReadOnly(true);
					
					form.child("#groupDesc").setDisabled(false);
					form.child("#groupDesc").setValue(record.get("description"));
					form.child("#groupDesc").setReadOnly(true);
					
					form.child("#groupTag").setValue(record.get("tags"));
				}
			}
		}
	}, {
		xtype: 'textfield',
		itemId: 'groupName',
		name: 'group_name',
		emptyText: 'New group name',
		disabled: true
	}, {
		xtype: 'textareafield',
		itemId: 'groupDesc',
		name: 'group_desc',
		emptyText: 'Group Description',
		disabled: true
	}, {
		xtype: 'textfield',
		itemId: 'groupTag',
		name: 'tags',
		fieldLabel: 'Group Tags',
		emptyText: '(comma separated)'
	}],
	buttons: [{
		text: 'Previous',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step03");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step03");
		}
	}, {
		text: 'Save to Workspace',
		handler: function(me) {
			
			var collectionId = uploader.params.collectionId;
			
			var form = me.up('form').getForm();
			if (form.isValid()) {
				form.submit({
					url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE',
					params: {
						action_type: 'groupAction',
						action: 'create',
						group_type: 'ExpressionExperiment',
						tracks: collectionId
					},
					submitEmptyText: false,
					success: function(fm, action) {
						Ext.Msg.alert('Success', 'Saved in workspace');
						
					},
					failure: function(fm, action) {
						console.log('Form submission failed', action);
					}
				});
			}
		}
	}]
});
