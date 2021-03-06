/**
 * @class TranscriptomicsUploader.store.FileTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for file types.
 */
Ext.define('TranscriptomicsUploader.store.FileTypes', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [	{name:"csv", text:'Comma delimited (.csv)'}, 
			{name:"txt", text:'Tab delimited (.txt)'},
			{name:"xls", text:'Microsoft Excel (.xls)'},
			{name:"xlsx", text:'Microsoft Excel (.xlsx)'}
	]
});
