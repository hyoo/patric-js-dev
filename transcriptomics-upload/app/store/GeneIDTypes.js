/**
 * @class TranscriptomicsUploader.store.GeneIDTypes
 * @extends Ext.data.Store
 *
 * This class implements the store for gene ID types.
 */
Ext.define('TranscriptomicsUploader.store.GeneIDTypes', {
	extend: 'Ext.data.Store',
	fields: ['name', 'text'],
	data: [{name:"refseq_source_id", text:'RefSeq Locus Tag'}, {name:"source_id", text:'PATRIC Locus Tag'}]
});
