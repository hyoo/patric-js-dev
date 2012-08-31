Ext.define('TranscriptomicsUploader.view.Viewport', {
	extend: 'Ext.window.Window', 
	title: 'Upload Transcriptomics Data to Workspace',
	width: 600,
	id: "uploader",
	params: {
		//collectionId: "80ed8f0c-a155-4d3b-b1ed-c7a64f5c9cef",
		//authToken: "7bdef354fda3a014fd26e19d2c3d7a41e2c9b88ccc64d14f10fa1228ebad114ded06a5bd101813c1",
		//baseUrl: "http://dayhoff.vbi.vt.edu:8888"
	},
	items: [{
		xtype: 'tabpanel',
		itemId: 'breadcrumb',
		border: false,
		tabBar: {
			hidden: true
		},
		height: 40,
		items: [{
			xtype: 'imagecomponent',
			itemId: 'step01',
			padding: 3,
			src: '/patric/images/transcriptomics_uploader_step1.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step02',
			padding: 3,
			src: '/patric/images/transcriptomics_uploader_step2.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step03',
			padding: 3,
			src: '/patric/images/transcriptomics_uploader_step3.png'
		}, {
			xtype: 'imagecomponent',
			itemId: 'step04',
			padding: 3,
			src: '/patric/images/transcriptomics_uploader_step4.png'
		}]
	}, {
		xtype: 'tabpanel',
		itemId: 'steps',
		border: false,
		tabBar: {
			hidden: true
		},
		//activeTab: 'step02',
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
