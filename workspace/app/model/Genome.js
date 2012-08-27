Ext.define('VBI.Workspace.model.Genome', {
	extend: 'Ext.data.Model',
	idProperty: 'gid',
	fields: [{name:'ncbi_tax_id', type:'int'}, 'genome_name', {name:'rast_cds', type:'int'}, 
		{name:'refseq_cds', type:'int'}, {name:'brc_cds', type:'int'}, {name:'chromosome', type:'int'}, 
		{name:'contig',  type:'int'}, {name:'plasmid', type:'int'}, {name:'length', type:'int'}, {name:'gid', type:'int'}]
});
