/**
 * @class TranscriptomicsUploader.store.FileTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for file types.
 */
Ext.define('TranscriptomicsUploader.store.FileTypes', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [{name:"csv", text:'Comma delimited (.csv)'}]
});
