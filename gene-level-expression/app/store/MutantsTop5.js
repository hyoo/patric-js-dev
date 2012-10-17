/**
 * @class VBI.GeneExpression.store.MutantsTop5
 * @extends Ext.data.Store
 *
 */
Ext.define('VBI.GeneExpression.store.MutantsTop5', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	autoLoad: false
});