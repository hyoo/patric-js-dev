Ext.define('VBI.Workspace.view.group.FeatureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.featuregrid',
	store: 'Features',
	id: 'workspace_featuregrid',
	border: 0,
	columns: [{
			text: 'Genome',
			dataIndex: 'genome_name',
			flex: 2,
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>', record.data.gid, value);
			}
		},{
			text: 'Product Description', 
			dataIndex: 'product', 
			flex: 3
		}, {
			text: 'Locus Tag', 
			dataIndex: 'locus_tag', 
			flex: 1,
			renderer: function(value, p, record) {
				return Ext.String.format('<a href="Feature?cType=feature&cId={0}">{1}</a>', record.data.na_feature_id, value);
			}
		}, {
			text: 'Annotation', 
			dataIndex: 'annotation', 
			flex: 1
		}, {
			text: 'Feature Type', 
			dataIndex: 'feature_type', 
			flex: 1
		}, {		
			text: 'Start', 
			dataIndex: 'start_max', 
			flex: 1
		}, {
			text: 'End', 
			dataIndex: 'end_min', 
			flex: 1
		}, {
			text: 'Length (NT)', 
			dataIndex: 'na_length', 
			flex: 1
		}, {
			text: 'Strand', 
			dataIndex: 'strand', 
			flex: 1
		}, {
			text: 'Accession',
			dataIndex: 'accession',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Locus Tag',
			dataIndex: 'refseq_locus_tag',
			flex: 1,
			hidden: true
		}, {
			text: 'RefSeq Protein',
			dataIndex: 'refseq_protein_id',
			flex: 1,
			hidden: true
		}
	],
	dockedItems: [{
		xtype: 'pagingtoolbar',
		store: 'Features',
		dock: 'bottom',
		displayInfo: true
	}],
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {		
		this.callParent(arguments);
	}
});
