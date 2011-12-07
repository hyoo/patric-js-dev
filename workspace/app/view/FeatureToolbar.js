Ext.define('VBI.Workspace.view.FeatureToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.featuretoolbar',
	id: 'workspace_featuretoolbar',
	stateful: false,
	getSelectedGroup: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		var groupList = new Array();
		
		if (viewport.activeItem == "groupview") {
			selection = new Array();
			groupList.push( Ext.getCmp('workspace_groupinfoeditor').record.get("tagId") );
			
		} else {
			selection = Ext.getCmp('columnbrowser_groups').getSelectionModel().getSelection();
			Ext.Array.each(selection, function(item) {
				groupList.push(item.get("tagId"));
			});
		}
		return groupList;
	},
	getSelectedID: function() {
		var viewport = Ext.getCmp('workspace_view');
		var selection;
		
		if (viewport.activeItem == "groupview") {
			selection = Ext.getCmp('workspace_featuregrid').getSelectionModel().getSelection();
		} else {
			selection = Ext.getCmp('workspace_featureview').getSelectionModel().getSelection();
		}
		
		if (selection.length == 0) {
			Ext.Msg.alert("Alert", "No feature was selected");
			return null;
		} else {
			var selectedIDs = new Array();
			Ext.Array.each(selection, function(item) {
				selectedIDs.push(item.get("na_feature_id"));
			});
			return selectedIDs;
		}
	},
	refreshWorkspaceViews: function() {
		Ext.StoreManager.lookup('Mappings').load({
			callback: function() {
				Ext.StoreManager.lookup('Groups').load({
					callback: function() {
						Ext.StoreManager.lookup('ColumnBrowser').refresh({
							callback:function() {
								Ext.StoreManager.lookup('Stations').load({
									callback: function() {
										Ext.getCmp('workspace_station').setDefault("Features");
										updateCartInfo();
									}
								});
							}
						});
					}
				});
			}
		});
	},
	initComponent: function() {
		
		this.items = [
			{
				title: 'Workspace', 
				xtype: 'buttongroup', 
				columns: 1,
				items:[{
					xtype:'tbar_btn_remove',
					handler: function(btn, e) {
						var groupList = this.findParentByType('featuretoolbar').getSelectedGroup();
						
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						if (groupList.length == 0) {
							Ext.Msg.show({
								msg: 'Do you want to delete this feature from your workspace?',
								buttons: Ext.Msg.OKCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "ok" && idList.length > 0) {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom: 'workspace',
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
							
						} else {
							
							Ext.Msg.show({
								msg: 'Do you want to delete this feature from your selected groups? Click No if you want to delete from entire workspace',
								buttons: Ext.Msg.YESNOCANCEL,
								icon: Ext.Msg.QUESTION,
								fn: function(buttonId, opt) {
									if (buttonId == "yes") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'groups',
												groups: groupList.join(","),
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									} else if (buttonId == "no") {
										Ext.Ajax.request({
											url:'/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=removeTrack',
											params: {
												removeFrom:'workspace',
												idType: 'Feature',
												idList: idList.join(",")
											},
											success: function(response) {
												Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
											}
										});
									}
								}
							});
						}
					}
				}, {
					xtype: 'tbar_btn_create',
					handler: function(btn, e) {
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { return false; }
						
						var btnGroupPopupSave = new Ext.Button({
							text:'Save to Group',
							handler: function(btn, e) {
								//console.log("custom button for save to group - feature level");
								saveToGroup(idList.join(","), 'Feature');
								
								Ext.getCmp('workspace_featuretoolbar').refreshWorkspaceViews();
							}
						});
					 	
						popup = Ext.create('VBI.Workspace.view.Toolbar.window.AddToGroup', {
								title: 'Add Selected Features to Group',
								buttons: [btnGroupPopupSave,{
									text: 'Cancel',
									handler: function(){popup.hide();}
								}]
						}).show();
						loadATGCombo();
					}
				}]
			}, '-',
			{
				title: 'View',
				columns: 1,
				xtype: 'buttongroup',
				items: [
					{
						scale: 'small',
						iconAlign: 'left',
						text: 'FASTA',
						width: 110,
						//icon: '/patric/images/toolbar_fasta.png',
						xtype: 'splitbutton',
						menu: [{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA DNA',
							icon: '/patric/images/toolbar_dna.png',
							handler: function() {	
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'dna', idList.join(","));
								}
							}
						},
						{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA Protein',
							icon: '/patric/images/toolbar_protein.png',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'protein', idList.join(","));
								}
							}
						},
						{
							scale: 'small',
							iconAlign: 'left',
							text: 'FASTA DNA/Protein',
							icon: '/patric/images/toolbar_dna_protein.png',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'display', 'both', idList.join(","));
								}
							}
						}]
					}
				]
			},
			{
				title: 'Download',
				columns: 1,
				xtype: 'buttongroup',
				width: 115,
				items: [
					{
						scale: 'small',
						iconAlign: 'left',
						width: 110,
						text: 'Table',
						icon: '/patric/images/toolbar_table.png',
						xtype: 'splitbutton',
						menu: [{
							xtype: 'tbar_menu_dn_tb_txt',
							handler: function() {
								this.fireEvent('downloadGrid','txt');
							}
						},
						{
							xtype: 'tbar_menu_dn_tb_xls',
							handler: function() {
								this.fireEvent('downloadGrid','xls');
							}
						}]
					},
					{
						scale: 'small',
						iconAlign: 'left',
						text: 'FASTA',
						width: 110,
						icon: '/patric/images/toolbar_fasta.png',
						xtype: 'splitbutton',
						menu: [{
							xtype: 'tbar_menu_dn_dna',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'dna', idList.join(","));
								}
							}
						},
						{
							xtype: 'tbar_menu_dn_protein',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'protein', idList.join(","));
								}
							}
						},
						{
							xtype: 'tbar_menu_dn_dnaprotein',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent('ShowDownloadFasta', 'download', 'both', idList.join(","));
								}
							}
						}]
					}
				]
			},
			{
				title: 'Tools',
				xtype: 'buttongroup',
				items: [{
					xtype: 'tbar_btn_msa',
					width: 80,
					handler: function() {
						var idList = this.findParentByType('featuretoolbar').getSelectedID();
						if (idList == null) { 
							return false; 
						} else {
							this.fireEvent('runMSAFeature', idList.join(","));
						}
					}
				}, {
					xtype: 'tbar_btn_mapidsto',
					width: 120,
					menu:{
						defaults:{
							height:16,
							style:'margin-left: 15px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;',
							plain:true
						},
						items:[{	
							text:'<b>PATRIC Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text: 'PATRIC Locus Tag', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PATRIC Locus Tag", idList.join(","));
								}
							}
						},{
							text: 'PATRIC ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PATRIC ID", idList.join(","));
								}
							}
						},{
							text: 'PSEED ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "PSEED ID", idList.join(","));
								}
							}
						},{
							text:'<b>REFSEQ Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text: 'RefSeq Locus Tag', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "RefSeq Locus Tag", idList.join(","));
								}
							}
						},{
							text: 'RefSeq', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "RefSeq", idList.join(","));
								}
							}
						},{
							text: 'Gene ID', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "Gene ID", idList.join(","));
								}
							}
						},{
							text: 'GI', 
							handler: function(){
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "GI", idList.join(","));
								}
							}
						},{
							text:'<b>Other Identifiers</b>',
							style:'margin-left: 5px; margin-bottom: 0px; margin-right: 0px; margin-top: 5px;'
						},{
							text:'Allergome',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "Allergome", idList.join(","));
								}
							}
						},{
							text:'BioCyc',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "BioCyc", idList.join(","));
								}
							}
						},{
							text:'DIP',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DIP", idList.join(","));
								}
							}
						},{
							text:'DisProt',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DisProt", idList.join(","));
								}
							}
						},{
							text:'DrugBank',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "DrugBank", idList.join(","));
								}
							}
						},{
							text:'ECO2DBASE',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "ECO2DBASE", idList.join(","));
								}
							}
						},{
							text:'EMBL',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EMBL", idList.join(","));
								}
							}
						},{
							text:'EMBL-CDS',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EMBL-CDS", idList.join(","));
								}
							}
						},{
							text:'EchoBASE',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EchoBASE", idList.join(","));
								}
							}
						},{
							text:'EcoGene',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EcoGene", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome_PRO',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome_PRO", idList.join(","));
								}
							}
						},{
							text:'EnsemblGenome_TRS',
							handler: function() {
								var idList = this.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
								if (idList == null) { 
									return false; 
								} else {
									this.fireEvent("callIDMapping", "EnsemblGenome_TRS", idList.join(","));
								}
							}
						},
						{
							text:'More ...',
							itemCls:'x-menu-item-cstm',
							menu:[{
								text:'GeneTree',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GeneTree", idList.join(","));
									}
								}
							},{
								text:'GenoList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GenoList", idList.join(","));
									}
								}
							},{
								text:'GenomeReviews',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "GenomeReviews", idList.join(","));
									}
								}
							},{
								text:'HOGENOM',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "HOGENOM", idList.join(","));
									}
								}
							},{
								text:'HSSP',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "HSSP", idList.join(","));
									}
								}
							},{
								text:'KEGG',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "KEGG", idList.join(","));
									}
								}
							},{
								text:'LegioList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "LegioList", idList.join(","));
									}
								}
							},{
								text:'Leproma',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "Leproma", idList.join(","));
									}
								}
							},{
								text:'MEROPS',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "MEROPS", idList.join(","));
									}
								}
							},{
								text:'MINT',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "MINT", idList.join(","));
									}
								}
							},{
								text:'NMPDR',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "NMPDR", idList.join(","));
									}
								}
							},{
								text:'OMA',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "OMA", idList.join(","));
									}
								}
							},{
								text:'OrthoDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "OrthoDB", idList.join(","));
									}
								}
							},{
								text:'PDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PDB", idList.join(","));
									}
								}
							},{
								text:'PeroxiBase',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PeroxiBase", idList.join(","));
									}
								}
							},{
								text:'PptaseDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PptaseDB", idList.join(","));
									}
								}
							},{
								text:'ProtClustDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "ProtClustDB", idList.join(","));
									}
								}
							},{
								text:'PseudoCAP',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "PseudoCAP", idList.join(","));
									}
								}
							},{
								text:'REBASE',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "REBASE", idList.join(","));
									}
								}
							},{
								text:'Reactome',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "Reactome", idList.join(","));
									}
								}
							},{
								text:'RefSeq_NT',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "RefSeq_NT", idList.join(","));
									}
								}
							},{
								text:'TCDB',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TCDB", idList.join(","));
									}
								}
							},{
								text:'TIGR',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TIGR", idList.join(","));
									}
								}
							},{
								text:'TubercuList',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "TubercuList", idList.join(","));
									}
								}
							},{
								text:'UniParc',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniParc", idList.join(","));
									}
								}
							},{
								text:'UniProtKB-ID',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniProtKB-ID", idList.join(","));
									}
								}
							},{
								text:'UniRef100',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef100", idList.join(","));
									}
								}
							},{
								text:'UniRef50',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef50", idList.join(","));
									}
								}
							},{
								text:'UniRef90',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "UniRef90", idList.join(","));
									}
								}
							},{
								text:'World-2DPAGE',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "World-2DPAGE", idList.join(","));
									}
								}
							},{
								text:'eggNOG',
								handler: function(){
									var idList = this.parentMenu.parentMenu.floatParent.findParentByType('featuretoolbar').getSelectedID();
									if (idList == null) { 
										return false; 
									} else {
										this.fireEvent("callIDMapping", "eggNOG", idList.join(","));
									}
								}
							}
							]
						}]
					}
				}]
			}, '->', '-',
			{
				xtype: 'tbar_btngrp_help'
			}
		];
		this.layout = {
			type: 'hbox',
			align: 'stretch'
		};
		this.callParent(arguments);
	}
});

