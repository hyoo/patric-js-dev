/**
 * @class TranscriptomicsUploader.view.MapGeneIdentifiers
 * @extends Ext.form.Panel
 * @xtype mapgeneidentifiers
 *
 * This class implements a chart of condition types.
 */
Ext.define('TranscriptomicsUploader.view.MapGeneIdentifiers', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mapgeneidentifiers',
	border: false,
	bodyPadding: 10,
	fieldDefaults: {
		labelAlign: 'right'
	},
	id: 'MapGeneIdentifiersPanel',
	initParsedResult: function() {
		var me = this;
		
		if (uploader.params.parsed == null) {
			return false;
		}
		var p = uploader.params.parsed;
		var strLabel =  "<b>"+p.origFileName+" ("+p.countGeneIDs+" gene IDs, "+p.countSamples+" samples)";
		me.getComponent("parsed_label").setValue(strLabel);
		
		var data = [], fields = [], cols = [], grid, header;
		
		if (p.snapshot!= undefined && p.snapshot.length > 0) {
			
			header = p.snapshot[0].line.split("\t");
			
			for (i=1; i<=header.length; i++) {
				fields.push("C"+i);
				cols.push({
					text: "Column "+i,
					dataIndex: "C"+i
				})
			}
			
			for (rowId=1; rowId<p.snapshot.length; rowId++) {
				
				row = p.snapshot[rowId].line.split("\t");
				tmpDataRow = {};
				for (i=1; i<=header.length; i++) {
					tmpDataRow["C"+i] = row[i-1];
				}
				data.push(tmpDataRow);
			}
		}
		
		grid = Ext.create('Ext.grid.Panel', {
			store: {
				data: data,
				fields: fields
			},
			columns: cols,
			height: 100
		});
		//console.log(me.child('#parsed_result'),Ext.getDom(me.child('#parsed_result').id));
		grid.render(me.child('#parsed_result').el, 0);
	},
	items: [{
		xtype: 'displayfield',
		itemId: 'parsed_label',
		value: '<b>my-super-cool-data.csv (1232 gene IDs, 43 samples)</b>'
	}, {
		itemId: 'parsed_result',
		height: 100,
		anchor: '100%',
		readOnly: true
	}, {
		xtype: 'displayfield',
		value: '<b>Specify organism name and ID typ to map data into PATRIC</b>'
	},{
		xtype: 'combobox',
		fieldLabel: 'Organism Name',
		name: "organismName",
		anchor: '100%',
		store: 'GenomeNames',
		typeAhead: false,
		listConfig: {
			itemSelector: 'div.search-item',
			loadingText: 'Searching...',
			getInnerTpl: function() {
				return '<div class="search-item">{display_name}</div>';
			}
		},
		hideTrigger: true,
		listeners: {
			scope: this,
			select: function(me, record) {
				var org = record[0].data;
				uploader.params.organism = org;
				me.setValue(org.display_name);
				Ext.getCmp("map_genes_btn").setDisabled(false);
			}
		}
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'combobox',
			fieldLabel: 'Gene ID Type',
			name: 'geneIdType',
			width: 300,
			value: 'refseq_source_id',
			store: 'GeneIDTypes',
			queryMode: 'local',
			displayField: 'text',
			valueField: 'name',
			editable: false
		}, {
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: 'http://enews.patricbrc.org',
				html: "what's this?",
				target: '_blank'
			},
			padding: '0 0 0 15px'
		}, {
			xtype: 'label',
			text: "Don't see your ID Type (",
			padding: '0 0 0 5px'
		}, {
			xtype: 'component',
			autoEl: {
				tag: 'a',
				href: 'http://enews.patricbrc.org',
				html: "FAQ",
				target: '_blank'
			}
		}, {
			xtype: 'label',
			text: ')'
		}]
	}, {
		//spacer between lines
		xtype: 'displayfield',
		value: ''
	}, {
		xtype: 'container',
		layout: 'hbox',
		items: [{
			xtype: 'displayfield',
			value: '<b>Map your genes into PATRIC</b>'
		}, {
			xtype: 'button',
			id: 'map_genes_btn',
			text: 'Map Genes',
			margin: '0 0 0 20px',
			disabled: true,
			handler: function(me) {
				var form = me.up('form').getForm();
				var organismName = form.findField("organismName").getValue();
				
				if (organismName == "" || organismName == undefined) {
					Ext.Msg.alert("Status", "Please specify your organism name.");
					return false;
				}
				
				var collectionId 	= uploader.params.collectionId;
				var ncbi_taxon_id	= uploader.params.organism.ncbi_taxon_id;	// not sure how to use this
				var gene_id_type	= form.findField("geneIdType").getValue();
				
				//console.log(ncbi_taxon_id, form, gene_id_type);
				var myMask = new Ext.LoadMask(uploader, {msg:"Mapping genes"});
				myMask.show();
				
				
				Ext.Ajax.request({
					url: '/portal/portal/patric/BreadCrumb/TranscriptomicsUploaderWindow?action=b&cacheability=PAGE',
					params: {
						mode: 'map_genes',
						collectionId: collectionId,
						organismName: organismName,
						ncbiTaxonId: ncbi_taxon_id,
						geneIdType: gene_id_type
					},
					timeout: 60000,
					success: function(response) {
						mapped_result = Ext.JSON.decode(response.responseText);
						uploader.params.mapping = mapped_result;
						//console.log(mapped_result);
						form.findField("mapping_result").setValue(mapped_result.msg);
						//enable next button
						Ext.getCmp("next_btn_to_experiment").setDisabled(false);
						
						myMask.hide();
					},
					failure: function(response) {
						console.log(response.status);
						myMask.hide();
					}
				});
				
			}
		}]
	},{
		xtype: 'displayfield',
		name: 'mapping_result',
		value: 'You must map your genes into PATRIC before procedding to the next step'
	}],
	buttons: [{
		text: 'Previous',
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step01");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step01");
			//console.log(uploader.params);
		}
	}, {
		text: 'Next',
		id: 'next_btn_to_experiment',
		disabled: true,
		handler: function() {
			Ext.getCmp("uploader").getComponent("breadcrumb").setActiveTab("step03");
			Ext.getCmp("uploader").getComponent("steps").setActiveTab("step03");
		}
	}]
});
