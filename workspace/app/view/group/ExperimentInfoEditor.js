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
	bodyPadding: 8, 
	cls: 'x-infoeditor-view',
	defaultType: 'displayfield',
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
		
		console.log(record);
		/*
		this.record = record;
		var title, desc;
		
		if (record.get("type") == "Feature") {
			title = "Feature Group";
			if (record.get("members") > 1) {
				desc = "(" + record.get("members") + " features)";
			} else {
				desc = "("+record.get("members")+" feature)";
			}
		} 
		else if (record.get("type") == "Genome")
		{
			title = "Genome Group";
			if (record.get("members") > 1) {
				desc = "(" + record.get("members") + " genomes)";
			} else {
				desc = "("+record.get("members")+" genome)";
			}
		}
		else if (record.get("type") == "ExpressionExperiment")
		{
			title = "Transcriptomics Experiment Group";
			if (record.get("members") > 1) {
				desc = "(" + record.get("members") + " experiments)";
			} else {
				desc = "("+record.get("members")+" experiment)";
			}
		} 
		else
		{
			title = "Unknown Group";
			if (record.get("members") > 1) {
				desc = "(" + record.get("members") + " members)";
			} else {
				desc = "("+record.get("members")+" member)";
			}
			
		}
		
		// update the thumbnail for the group
		//console.log(Ext.ComponentQuery.query('infoviewer > dataview')[0]);
		Ext.getCmp('group-viewer-thumb').update({
			thumb: record.get("thumb"),
			title: title,
			desc: desc
		});
		
		// update the form elements
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
			title: 'Expression of Escherichia coli trated with cefsulodin and mecillinam', 
			description: 'In this experiment, we trated a number of e coli samples with varying levels of cefusolodin and mecillinam', 
			organism: 'Escherichia coli K-12',
			updated: "Aug 8, 2012",
			created: "Aug 6, 2012",
			file: "my-cool-data.csv"
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
