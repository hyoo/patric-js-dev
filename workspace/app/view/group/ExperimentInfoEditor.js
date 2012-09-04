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
	id: 'workspace_experimentinfoeditor',
	stateful: false,
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
		value: 'Transcriptomics Experiment', 
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
		labelAlign: 'top',
		value: ''
	}, {
		xtype: 'displayfield',
		name: 'description', 
		itemId: 'description', 
		fieldLabel: 'Description',
		labelAlign: 'top',
		value: ''
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
			subtitle = "(" + record.get("samples") + " samples)";
		} else {
			subtitle = "(" + record.get("samples") + " sample)";
		}
		
		this.getForm().setValues({
			title: record.get("title"), 
			samples: subtitle,
			description: record.get("desc"), 
			organism: record.get("organism"),
			updated: Ext.Date.format(Ext.Date.parse(record.get("mdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			created: Ext.Date.format(Ext.Date.parse(record.get("cdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			file: record.get("origFileName")
		});
		
	}, 
	
	startEdit: function() {
		
		this.remove('title');
		this.insert(0, {
			xtype: 'textfield',
			name: 'title', 
			itemId: 'title', 
			fieldLabel: 'Experiment title',
			labelAlign: 'top',
			allowBlank: false
		});
		
		this.remove('description');
		this.insert(4, {
			xtype: 'textareafield',
			name: 'description', 
			itemId: 'description', 
			fieldLabel: 'Description',
			labelAlign: 'top',
			allowBlank: true,
			grow: true, 
			growMin: 20, 
			growMax: 100, 
			value: 'none'
		});
		
		this.loadRecord(this.record);		
		this.getComponent('editInfoBtn').setText('Save');
	}, 
	
	finishEdit: function() {
		
		var newInfo = this.getForm().getValues();
		this.record.set("title", newInfo.title);
		this.record.set("desc", newInfo.description);
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
		this.remove('description');
		this.insert(4, {
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			fieldLabel: 'Description',
			labelAlign: 'top',
			value: ''
		});
		this.loadRecord(this.record);
		this.getComponent('editInfoBtn').setText('Edit');
	}
});
