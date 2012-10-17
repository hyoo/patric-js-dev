/**
 * @class VBI.GeneExpression.store.ConditionsTop5
 * @extends Ext.data.Store
 *
 */
Ext.define('VBI.GeneExpression.store.ConditionsTop5', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	autoLoad: false
});