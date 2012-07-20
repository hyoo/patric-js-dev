Ext.define('TranscriptomicsUploader.view.Viewport', {
	extend: 'Ext.window.Window', 
	title: 'Upload Transcriptomics Data to Workspace',
	width: 600,
	id: "uploader",
	items: [{
		xtype: 'tabpanel',
		itemId: 'breadcrumb',
		border: false,
		tabBar: {
			hidden: true
		},
		height: 50,
		items: [{
			xtype: 'imagecomponent',
			itemId: 'step01',
			src: 'http://www.patricbrc.org/patric/images/logo.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step02',
			src: 'http://www.patricbrc.org/patric/images/logo.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step03',
			src: 'http://www.patricbrc.org/patric/images/logo.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step04',
			src: 'http://www.patricbrc.org/patric/images/logo.png'
		}]
	}, {
		xtype: 'tabpanel',
		itemId: 'steps',
		border: false,
		tabBar: {
			hidden: true
		},
		//activeTab: 'step04',
		items: [{
			xtype: 'specifyfile',
			itemId: 'step01',
			title: 'Specify File'
		}, {
			xtype: 'mapgeneidentifiers',
			itemId: 'step02',
			title: 'Map Gene Identifiers'
		}, {
			xtype: 'describeexperiment',
			itemId: 'step03',
			title: 'Describe Experiment'
		}, {
			xtype: 'addtogroup',
			itemId: 'step04',
			title: 'Add to Group'
		}]
	}]
});
