/**
 * @class TranscriptomicsUploader.view.DescribeExperiment
 * @extends Ext.form.Panel
 * @xtype describeexperiment
 *
 * This class implements a chart of condition types.
 */
Ext.define('TranscriptomicsUploader.view.DescribeExperiment', {
	extend: 'Ext.form.Panel',
	alias: 'widget.describeexperiment',
	border: false,
	bodyPadding: 10,
	fieldDefaults: {
		labelWidth: 110,
		labelAlign: 'right',
		anchor: '100%'
	},	
	items: [{
		xtype: 'displayfield',
		value: '<b>Provide additional information for this experiment</b>'
	}, {
		xtype: 'textfield',
		name: 'experiment_title',
		fieldLabel: 'Experiment Title',
		emptyText: 'Title',
		allowBlank: false
	}, {
		xtype: 'textareafield',
		name: 'experiment_description',
		fieldLabel: 'Experiment <br/> Description',
		emptyText: 'Description (optional)'
	}, {
		xtype: 'textfield',
		name: "organism_name",
		fieldLabel: 'Organism Name',
		emptyText: 'Organism Name (optional)'
	}, {
		xtype: 'numberfield',
		name: "pubmed_id",
		fieldLabel: 'Pubmed ID',
		hideTrigger: true,
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		emptyText: 'Pubmed ID (optional)'
	}],
	buttons: [{
		text: 'Previous',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step02");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step02");
		}
	}, {
		text: 'Next',
		formBind: true,
		disabled: true,
		handler: function(me, e) {
			
			var collectionId = uploader.params.collectionId;
			var extra = uploader.params;
			extra.parsed.snapshot = undefined;
			var form = me.up('form').getForm();
			
			Ext.Ajax.request({
				url: '/portal/portal/patric/BreadCrumb/TranscriptomicsUploaderWindow?action=b&cacheability=PAGE',
				params: {
					mode: "save_experiment",
					collectionId: collectionId,
					extra: Ext.JSON.encode(extra),
					experiment_title: form.findField("experiment_title").getValue(),
					experiment_description: form.findField("experiment_description").getValue(),
					organism_name: form.findField("organism_name").getValue(),
					pubmed_id: form.findField("pubmed_id").getValue()
				},
				timeout: 60000,
				success: function(response) {
					//console.log('Success', response);
					Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step04");
					Ext.getCmp("uploader").getComponent("steps").setActiveTab("step04");
				},
				failure: function(response) {
					console.log('Failure', response);
				}
			});
		}
	}]
});
