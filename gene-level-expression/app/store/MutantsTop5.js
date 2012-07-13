/**
 * @class CoordView.store.Conditions
 * @extends Ext.data.Store
 *
 * This class implements the store for accessions.
 */
Ext.define('CoordView.store.MutantsTop5', {
	extend: 'Ext.data.Store',
	model: 'CoordView.model.CategoryCount',
	autoLoad: false
});