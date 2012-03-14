/**
 * @class CoordView.view.GenomeGrid
 * @extends Ext.grid.Panel
 * @xtype genomegrid
 *
 * This class implements a grid of players.
 */
Ext.define('CoordView.view.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	id: 'p-featuregrid',
	
	store: 'Features',
	
	/*
	requires: [
		'Ext.grid.PagingScroller'
	], 
	*/
	autoScroll: true, 
	
	/*
	verticalScrollerType: 'paginggridscroller', 
	invalidateScrollerOnRefresh: false, 
	//disableSelection: true, 
	*/
	
	columns: [
		{dataIndex: 'exp_accession',	header: 'Accession',	flex: 1},
		{dataIndex: 'exp_samples',		header: 'Samples',		flex: 1},
		{dataIndex: 'exp_platform',		header: 'Platform',		flex: 1},
		{dataIndex: 'exp_name',			header: 'Condition',	flex: 3},
		{dataIndex: 'exp_locustag',		header: 'Locus Tag',	flex: 1},
		{dataIndex: 'exp_pavg',			header: 'Avg',			flex: 1},
		{dataIndex: 'exp_pratio',		header: 'Ratio',		flex: 1}/*,
		{dataIndex: 'locus_tag',		header: 'Locus Tag',	flex: 1},
		{dataIndex: 'genome_name',		header: 'Genome',		flex: 1},
		{dataIndex: 'start_max',		header: 'Start',		flex: 1},
		{dataIndex: 'end_min',			header: 'End',			flex: 1},
		{dataIndex: 'na_length',		header: 'NA Length',	flex: 1},
		{dataIndex: 'proudct',			header: 'Product',		flex: 1},
		{dataIndex: 'aa_length',		header: 'AA Length',	flex: 1}*/
	],
	
	/**
		* Renders hyperlinked PATRIC genomes. Returns the empty 
		* string if no value is supplied. Returns the value unformatted if no valid 
		* record is supplied.
		*
		* See {@link Ext.grid.column.Column.renderer} for full details about 
		* column renderer functions.
		*
		* @param {String} value The value to be formatted.
		* @param {Object} metaData A collection of metadata about the current cell.
		* @param {Ext.Data.Record} record The record that supplies the value.
		* @return {String} The formatted string.
	*/
	renderGenome: function(value, metaData, record){
		// handle the breaking cases
		if (typeof value == 'undefined') 
			return '';
		if (typeof record == 'undefined' || 
				!record.hasOwnProperty('data') || 
				!record.data.hasOwnProperty('genome_info_id') || 
				record.data.cId == '') 
			return value;
		
		if (value==null || value == '') 
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">cid:{0}</a>', record.data.genome_info_id);
		else 
			return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.cId, value);
	}
});
