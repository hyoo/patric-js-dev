/**
 * @class TranscriptomicsUploader.store.FileTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for file types.
 */
Ext.define('TranscriptomicsUploader.store.DataTypes', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [	{name:"Transcriptomics", text:'Transcriptomics'},
			{name:"Proteomics", text:'Proteomics'},
			{name:"Phenomics", text:'Phenomics'}
	]
});
