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
		{name:'exp_pavg', type:'float', useNull:true}, {name:'exp_pratio', type:'float', useNull:true}, 'patric_locus_tag', 'figfam_id', 'rownum'
	]
});