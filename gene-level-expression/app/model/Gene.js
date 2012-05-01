/**
 * @class CoordView.model.Gene
 * @extends Ext.data.Model
 *
 * This class defines the data model for expression level of a gene.
 *
 */
Ext.define('CoordView.model.Gene', {
	extend: 'Ext.data.Model',
	idProperty: 'pid',
	fields: [
		'exp_id', 'exp_accession', 'exp_platform', 'exp_samples', 'pid', 'exp_locustag', 
		{name:'exp_pavg', type:'float', useNull:false}, {name:'exp_pratio', type:'float', useNull:false}, 
		{name:'exp_zscore', type:'float', useNull:false},
		'exp_name', 'exp_channels', 'exp_timepoint', 'exp_organism', 'exp_strain', 'exp_mutant', 'exp_condition', 'exp_source',
		'na_feature_id', 'patric_locus_tag', 'figfam_id', 
		{name:'exp_geneid', type:'int'}
	]
});