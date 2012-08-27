/**
 * @class GroupExplorer.view.group.InfoEditor
 * @extends Ext.form.Panel
 * @xtype groupinfoeditor
 *
 * This class implements an info/edit panel for a single group.
 */
Ext.define('VBI.Workspace.view.group.GroupInfoEditor', {
	extend: 'Ext.form.Panel',
	alias: 'widget.groupinfoeditor',
	id: 'workspace_groupinfoeditor',
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
		xtype: 'component', 
		id: 'group-viewer-thumb',
		stateful: false,
		tpl: [
			'<tpl for=".">',
				'<div class="thumb-wrap">',
					'<img src="{thumb}" alt="{title}" title="{title}" />',
					'<span class="title">{title}</span>',
					'<div>{desc}</div>',
					'<div class="clear"></div>', 
				'</div>',
			'</tpl>'
		] 
	}, {
		xtype: 'displayfield',
		name: 'groupname', 
		itemId: 'groupname', 
		hideLabel: true, 
		allowBlank: false, 
		fieldStyle: {
			fontSize: '13px',
			fontWeight: 'bold', 
			paddingBottom: '5px',
			borderBottom: '1px dashed #000000'
		}
	}, {
		xtype: 'displayfield',
		name: 'description', 
		itemId: 'description', 
		fieldLabel: 'Description',
		labelAlign: 'top'
	}, {
		xtype: 'displayfield',
		name: 'tags',
		fieldLabel: 'Tags',
		labelWidth: 32
	}, {
		xtype: 'displayfield',
		name: 'updated',
		fieldLabel: 'Last Updated',
		labelWidth: 85
	}, {
		xtype: 'displayfield',
		name: 'created',
		fieldLabel: 'Created',
		labelWidth: 50
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
		console.log(record.data);
		
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
		this.insert(2, {
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
			fieldStyle: {
				fontSize: '13px',
				fontWeight: 'bold', 
				paddingBottom: '5px',
				borderBottom: '1px dashed #000000'
			}, 
			value: 'none'
		});
		this.remove('description');
		this.insert(2, {
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
