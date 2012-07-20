/**
 * @class TranscriptomicsUploader.store.GeneIDTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for gene ID types.
 */
Ext.define('TranscriptomicsUploader.store.GeneIDTypes', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [{name:"refseq", text:'RefSeq'}, {name:"patric", text:'PATRIC'}]
});
