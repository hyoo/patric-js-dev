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
		fieldLabel: 'Add to Group'
	}, {
		xtype: 'textfield',
		name: 'group_name',
		emptyText: 'New group name',
		disabled: true
	}, {
		xtype: 'textareafield',
		name: 'group_desc',
		emptyText: 'Group Description',
		disabled: true
	}, {
		xtype: 'textfield',
		name: 'group_tags',
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
		text: 'Save to Workspace'
	}]
});
