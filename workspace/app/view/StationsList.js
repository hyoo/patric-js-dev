Ext.define('VBI.Workspace.view.StationsList', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.stationslist',
	store: 'Stations',
	rootVisible: false,
	hideHeaders: true,
	useArrows: true,
	columns:[{
		xtype: 'treecolumn',
		dataIndex: 'name', 
		flex: 1
	}],
	setDefault: function(station) {
		if (station == "Features") 
		{
			this.getView().select(2);
			var node = this.getStore().getNodeById(2);
			this.fireEvent('itemclick', this.getView(), node);
		}
		else if (station == "Genomes") 
		{
			this.getView().select(1);
			var node = this.getStore().getNodeById(3);
			this.fireEvent('itemclick', this.getView(), node);
		}
		else if (station == "ExpressionExperiments")
		{
			this.getView().select(3);
			var node = this.getStore().getNodeById(4);
			this.fireEvent('itemclick', this.getView(), node);
		}
	}
});
