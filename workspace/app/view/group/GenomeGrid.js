Ext.define('VBI.Workspace.view.group.GenomeGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.genomegrid',
	store: 'Genomes',
	id: 'workspace_genomegrid',
	border: 0,
	columns: {
		defaults: {
			align: 'center'
		},
		items: [{
			text: 'Organism Name', 
			dataIndex: 'genome_name', 
			flex: 2,
			align: 'left',
			renderer: function(value, metadata, record, rowIndex, colIndex, store) {
				metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
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
		}]
	},
	dockedItems: [{
		xtype: 'patricpagingtoolbar',
		store: 'Genomes',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.callParent(arguments);
	}
});
