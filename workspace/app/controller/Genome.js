Ext.define('VBI.Workspace.controller.Genome', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'genometoolbar menuitem': {
				downloadGrid: this.downloadGrid
			}
		});
	},
	downloadGrid: function(type) {
		var idList = new Array(),
			store = Ext.getStore("Genomes");
			
		Ext.Array.each(store.getRange(), function(item) {
			idList.push(item.internalId);
		});
		Ext.getDom("fTableForm").action = "/patric-searches-and-tools/jsp/grid_download_handler.jsp";
		Ext.getDom("fTableForm").target = "";
		Ext.getDom("tablesource").value = "Workspace";
		Ext.getDom("fileformat").value = type;
		Ext.getDom("fids").value = idList.join(",");
		Ext.getDom("idType").value = "Genome";
		Ext.getDom("fTableForm").submit();
	}
});
