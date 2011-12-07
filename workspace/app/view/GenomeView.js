Ext.define('VBI.Workspace.view.GenomeView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomeview',
	store: 'Genomes',
	requires: ['VBI.Workspace.view.GenomeToolbar'],
	id: 'workspace_genomeview',
	border: 0,
	columns: [{
			text: 'Organism Name', 
			dataIndex: 'genome_name', 
			flex: 2,
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
			}
		}, {
			text: 'Size', 
			dataIndex: 'length', 
			flex: 1
		}, {
			text: 'PATRIC CDS', 
			dataIndex: 'rast_cds', 
			flex: 1
		}, {
			text: 'Legacy BRC CDS', 
			dataIndex: 'brc_cds', 
			flex: 1
		}, {		
			text: 'RefSeq CDS', 
			dataIndex: 'refseq_cds', 
			flex: 1
		}, {
			text: 'chromosome', 
			dataIndex: 'chromosome', 
			flex: 1
		}, {
			text: 'plasmid', 
			dataIndex: 'plasmid', 
			flex: 1
		}
	],
	dockedItems: [{
		xtype: 'genometoolbar',
		height: 70,
		dock: 'top'
	}, {
		xtype: 'pagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.callParent(arguments);
	}
});
