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
	/**
	 * Loads a given record into the panel. Updates the dataview containing the 
	 * group thumbnail and the form containing the group details.
	 * @param {Ext.data.Model} record The data record to load.
	 */
	loadRecord: function(record) {
		//console.log(record);
		
		this.record = record;
		
		var subtitle;
		if (record.get("samples") > 1) {
			subtitle = "(" + record.get("samples") + " samples)";
		} else {
			subtitle = "(" + record.get("samples") + " sample)";
		}
		
		// update the form elements
		/*
		this.getForm().setValues({
			groupname: record.get("name"), 
			description: record.get("desc"), 
			tags: record.get("tags"),
			updated: Ext.Date.format(Ext.Date.parse(record.get("mdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			created: Ext.Date.format(Ext.Date.parse(record.get("cdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			owner: record.get("owner")
		});
		*/
		
		this.getForm().setValues({
			title: record.get("title"), 
			samples: subtitle,
			description: record.get("desc"), 
			organism: record.get("organism"),
			updated: "Aug 8, 2012",
			created: "Aug 6, 2012",
			file: record.get("origFileName")
		});
		
	}, 
	
	startEdit: function() {
		
		this.remove('groupname');
		this.insert(1, {
			xtype: 'textfield',
			name: 'groupname', 
			itemId: 'groupname', 
			hideLabel: true, 
			allowBlank: false,
			value: 'none'
		});
		
		this.remove('description');
		this.insert(3, {
			xtype: 'textareafield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
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
		this.record.set("desc", newInfo.description);
		this.record.set("name", newInfo.groupname);
		Ext.getStore('Groups').sync();
		
		this.disableFields();
	}, 
	
	disableFields: function() {
		// disable the form elements by changing their types to displayfield
		this.remove('groupname');
		this.insert(1, {
			xtype: 'displayfield',
			name: 'groupname', 
			itemId: 'groupname', 
			hideLabel: true, 
			allowBlank: false, 
			style: {
				fontWeight: 'bold', 
				marginBottom: '3px'
			}, 
			value: 'none'
		});
		this.remove('description');
		this.insert(3, {
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
			style: {
				marginTop: '0px', 
				marginBottom: '15px' 
			}, 
			value: ''
		});
		this.loadRecord(this.record);
		this.getComponent('editInfoBtn').setText('Edit');
	}
});
