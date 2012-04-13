/**
 * @class CoordView.model.Genome
 * @extends Ext.data.Model
 *
 * This class defines the data model for a genome.
 *
 */
Ext.define('CoordView.model.Feature', {
	extend: 'Ext.data.Model',
	idProperty: 'rownum',
	fields: [
		'exp_accession', 'exp_samples', 'exp_platform', 'exp_name', 'exp_locustag',
		{name:'exp_pavg', type:'float', useNull:false}, {name:'exp_pratio', type:'float', useNull:false}, 'patric_locus_tag', 'figfam_id', 
		{name:'rownum', type:'int'}
	]
});