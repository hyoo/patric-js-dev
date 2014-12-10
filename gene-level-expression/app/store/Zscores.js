/**
 * @class VBI.GeneExpression.store.ZScores
 * @extends Ext.data.Store
 *
 * This class implements a store for Z score.
 */
Ext.define('VBI.GeneExpression.store.ZScores', {
	extend: 'Ext.data.Store',
	model: 'VBI.GeneExpression.model.CategoryCount',
	proxy: {
		type: 'memory',
		reader: {
			type: 'json',
			root: 'z_score'
		}
	}
});
