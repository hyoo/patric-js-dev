Ext.define('VBI.Workspace.model.Genome', {
	extend: 'Ext.data.Model',
	idProperty: 'gid',
	fields: ['ncbi_tax_id', 'genome_name', 'rast_cds', 'refseq_cds', 'brc_cds', 'chromosome', 'contig', 'plasmid', 'length', 'gid']
});
