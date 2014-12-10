/**
 * @class VBI.GeneExpression.model.Gene
 * @extends Ext.data.Model
 *
 * This class defines a data model for gene properties combined with relevant expression data.
 *
 */
Ext.define('VBI.GeneExpression.model.Gene', {
	extend: 'Ext.data.Model',
	idProperty: 'pid',
	fields: [
		'exp_id', 'exp_accession', 'exp_platform', 'exp_samples', {name:'pid', type:'int'}, 'exp_locustag', 
		{name:'exp_pavg', type:'float', useNull:false}, {name:'exp_pratio', type:'float', useNull:false}, 
		{name:'exp_zscore', type:'float', useNull:false},
		'exp_name', 'exp_channels', 'exp_timepoint', 'exp_organism', 'exp_strain', 'exp_mutant', 'exp_condition', 'pmid',
		'feature_id', 'patric_locus_tag', 'figfam_id',
		{name:'exp_geneid', type:'int'}
	]
});