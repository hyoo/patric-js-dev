/**
 * @class GroupExplorer.view.group.InfoEditor
 * @extends Ext.form.Panel
 * @xtype groupinfoeditor
 *
 * This class implements an info/edit panel for a single group.
 */
Ext.define('VBI.Workspace.view.group.ExperimentInfoEditor', {
	extend: 'Ext.form.Panel',
	alias: 'widget.experimentinfoeditor',
	width: 225, 
	minWidth: 225, 
	bodyPadding: 5, 
	cls: 'x-infoeditor-view',
	fieldDefaults: {
		labelAlign: 'left',
		anchor: '100%',
		labelStyle: 'font-weight:bold'
	},
	items: [{
		xtype: 'displayfield', 
		itemId: 'title',
		name: 'title',
		hideLabel: true,
		fieldStyle: {
			fontSize: '15px',
			fontWeight: 'bold'
		},
		style: {
			marginBottom: '0px'
		}
	}, {
		xtype: 'displayfield', 
		name: 'samples',
		hideLabel: true,
		fieldStyle: {
			paddingTop: '0px'
		}
	}, {
		xtype: 'displayfield',
		itemId: 'datatype',
		name: 'datatype',
		renderer: function(value, record) {
			return value + ' Experiment';
		},
		fieldStyle: {
			paddingBottom: '5px',
			borderTop: '1px dashed #000000',
			borderBottom: '1px dashed #000000'
		}
	}, {
		xtype: 'displayfield',
		name: 'organism', 
		itemId: 'organism', 
		fieldLabel: 'Platform Organism',
		labelAlign: 'top'
	}, {
		xtype: 'displayfield',
		name: 'pmid', 
		itemId: 'pmid', 
		fieldLabel: 'Pubmed ID',
		labelWidth: 80,
		renderer: function(value, record) {
			return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}" target=_blank>{0}</a>', value);
		}
	}, {
		xtype: 'displayfield',
		name: 'description', 
		itemId: 'description', 
		fieldLabel: 'Description',
		labelAlign: 'top'
	}, {
		xtype: 'displayfield',
		name: 'updated',
		fieldLabel: 'Last modified',
		labelWidth: 90,
		value: 'none'
	}, {
		xtype: 'displayfield',
		name: 'created',
		fieldLabel: 'Uploaded',
		labelWidth: 70,
		value: 'none'
	}, {
		xtype: 'displayfield',
		name: 'file',
		fieldLabel: 'Source file',
		labelWidth: 70,
		value: 'none'
	}, { 
		xtype: 'button', 
		itemId: 'editInfoBtn', 
		text: 'Edit', 
		iconCls: 'x-btn-edit', 
		iconAlign: 'right', 
		scope: this, 
		enableToggle: true
	}],
	loadRecord: function(record) {
		//console.log(record);
		
		this.record = record;
		
		var subtitle;
		if (record.get("samples") > 1) {
			subtitle = "(" + record.get("samples") + " comparisons)";
		} else {
			subtitle = "(" + record.get("samples") + " comparison)";
		}
		
		this.getForm().setValues({
			title: record.get("title"), 
			samples: subtitle,
			datatype: record.get("data_type") || 'Transcriptomics',
			description: record.get("desc"), 
			organism: record.get("organism"),
			pmid: (record.get("pmid")!=0)?record.get("pmid"):"",
			updated: Ext.Date.format(Ext.Date.parse(record.get("mdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			created: Ext.Date.format(Ext.Date.parse(record.get("cdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			file: record.get("origFileName")
		});
		
		if (record.get("source") == "PATRIC") {
			this.getComponent('editInfoBtn').setDisabled(true);
		} else {
			this.getComponent('editInfoBtn').setDisabled(false);
		}
	}, 
	
	startEdit: function() {
		//console.log(this.child('#title'));
		this.remove('title');
		this.insert(0, {
			xtype: 'textfield',
			name: 'title', 
			itemId: 'title', 
			fieldLabel: 'Experiment title',
			labelAlign: 'top',
			allowBlank: false
		});
		this.remove('datatype');
		this.insert(2, {
			xtype: 'combobox',
			name: 'datatype',
			itemId: 'datatype',
			store: {
				xtype: 'store',
				fields: ['name', 'text'],
				data: [
					{name:"Transcriptomics", text:'Transcriptomics'},
					{name:"Proteomics", text:'Proteomics'},
					{name:"Phenomics", text:'Phenomics'}]
			},
			queryMode: 'local',
			displayField: 'text',
			valueField: 'name',
			editable: false
		});
		this.remove('organism');
		this.insert(3, {
			xtype: 'textfield',
			name: 'organism', 
			itemId: 'organism', 
			fieldLabel: 'Platform Organism',
			labelAlign: 'top'
		});
		this.remove('pmid');
		this.insert(4, {
			xtype: 'numberfield',
			name: 'pmid', 
			itemId: 'pmid', 
			fieldLabel: 'Pubmed ID',
			labelWidth: 80,
			hideTrigger: true,
			keyNavEnabled: false,
			mouseWheelEnabled: false
		});
		this.remove('description');
		this.insert(5, {
			xtype: 'textareafield',
			name: 'description', 
			itemId: 'description', 
			fieldLabel: 'Description',
			labelAlign: 'top',
			allowBlank: true,
			grow: true, 
			growMin: 20, 
			growMax: 100
		});
		
		this.loadRecord(this.record);		
		this.getComponent('editInfoBtn').setText('Save');
	}, 
	
	finishEdit: function() {
		
		var newInfo = this.getForm().getValues();
		this.record.set("title", newInfo.title);
		this.record.set("data_type", newInfo.datatype);
		this.record.set("desc", newInfo.description);
		this.record.set("organism", newInfo.organism);
		this.record.set("pmid", newInfo.pmid);
		console.log(newInfo, this.record);
		Ext.getStore('ExpressionExperiments').sync();
		
		this.disableFields();
	}, 
	
	disableFields: function() {
		// disable the form elements by changing their types to displayfield
		this.remove('title');
		this.insert(0, {
			xtype: 'displayfield', 
			itemId: 'title',
			name: 'title',
			hideLabel: true,
			fieldStyle: {
				fontSize: '15px',
				fontWeight: 'bold'
			},
			style: {
				marginBottom: '0px'
			}
		});
		
		this.remove('datatype');
		this.insert(2, {
			xtype: 'displayfield',
			itemId: 'datatype',
			name: 'datatype',
			renderer: function(value, record) {
				return value + ' Experiment';
			},
			fieldStyle: {
				paddingBottom: '5px',
				borderTop: '1px dashed #000000',
				borderBottom: '1px dashed #000000'
			}
		});
		
		this.remove('organism');
		this.insert(3, {
			xtype: 'displayfield',
			name: 'organism', 
			itemId: 'organism', 
			fieldLabel: 'Platform Organism',
			labelAlign: 'top'
		});
		
		this.remove('pmid');
		this.insert(4, {
			xtype: 'displayfield',
			name: 'pmid', 
			itemId: 'pmid', 
			fieldLabel: 'Pubmed ID',
			labelWidth: 80,
			renderer: function(value, record) {
				return Ext.String.format('<a href="http://www.ncbi.nlm.nih.gov/pubmed/{0}" target=_blank>{0}</a>', value);
			}
		});
		
		this.remove('description');
		this.insert(5, {
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			fieldLabel: 'Description',
			labelAlign: 'top'
		});
		this.loadRecord(this.record);
		this.getComponent('editInfoBtn').setText('Edit');
	}
});
