/**
 * @class TranscriptomicsUploader.store.FileFormats
 * @extends Ext.data.Store
 *
 * This class implements the store for file formats.
 */
Ext.define('TranscriptomicsUploader.store.FileFormats', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [{name:"matrix", text:'Gene Matrix'},{name:"list", text:'Gene List'}]
});
