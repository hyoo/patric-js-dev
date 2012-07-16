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
	bodyPadding: 8, 
	cls: 'x-infoeditor-view',
	defaultType: 'displayfield',
	fieldDefaults: {
		labelAlign: 'left', 
		anchor: '100%', 
	},
	items: [
		{
			xtype: 'component', 
			id: 'group-viewer-thumb',
			stateful: false,
			tpl: [
					'<tpl for=".">',
						'<div class="thumb-wrap">',
							'<div class="thumb">',
								(!Ext.isIE6? '<img src="{thumb}"  alt="{name}" title="{name}" />' : 
								'<div style="width:76px;height:76px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{thumb}\')"></div>'),
							'</div>', 
						'</div>', 
					'</tpl>'
			] 
		}, 
		{
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
		}, 
		{
			xtype: 'displayfield',
			name: 'updated_min',
			hideLabel: true, 
			style: {
				paddingBottom: '5px',
				marginBottom: '5px',
				borderBottom: '1px dashed #000000'
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'descriptionlabel',
			fieldLabel: '<b>Description</b>',
			style: {
				marginBottom: '1px'
			}, 
			value: ''
		},
		{
			xtype: 'displayfield',
			name: 'description', 
			itemId: 'description', 
			hideLabel: true, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: ''
		},
		{
			xtype: 'displayfield',
			name: 'tags',
			fieldLabel: '<b>Tags</b>',
			labelWidth: 32, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'updated',
			fieldLabel: '<b>Last Updated</b>',
			labelWidth: 85, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		},
		{
			xtype: 'displayfield',
			name: 'created',
			fieldLabel: '<b>Created</b>',
			labelWidth: 50, 
			style: {
				marginTop: '0px', 
				marginBottom: '10px' 
			}, 
			value: 'none'
		}, /*
		{
			xtype: 'displayfield',
			name: 'owner',
			fieldLabel: '<b>Owner</b>',
			labelWidth: 44, 
			style: {
					paddingBottom: '30px',
			}, 
			value: 'none'
		}, */
		{ 
			xtype: 'button', 
			itemId: 'editInfoBtn', 
			text: 'Edit', 
			iconCls: 'x-btn-edit', 
			iconAlign: 'right', 
			scope: this, 
			enableToggle: true
		}
	],
	/**
	 * Loads a given record into the panel. Updates the dataview containing the 
	 * group thumbnail and the form containing the group details.
	 * @param {Ext.data.Model} record The data record to load.
	 */
	loadRecord: function(record) {
		//console.log(record);
		
		this.record = record;
		
		// update the thumbnail for the group
		//console.log(Ext.ComponentQuery.query('infoviewer > dataview')[0]);
		Ext.getCmp('group-viewer-thumb').update({
			thumb: record.data.thumb 
		});
		
		// update the form elements
		this.getForm().setValues({
			groupname: record.data.name, 
			updated_min: Ext.Date.format(Ext.Date.parse(record.data.mdate, "Y-m-d H:i:s"), "x-date-relative"), 
			description: record.data.desc, 
			tags: record.data.tags,
			updated: Ext.Date.format(Ext.Date.parse(record.data.mdate, 'Y-m-d H:i:s'), 'M j, Y'), 
			//updated: record.data.mdate, 
			created: Ext.Date.format(Ext.Date.parse(record.data.cdate, 'Y-m-d H:i:s'), 'M j, Y'), 
			owner: record.data.owner
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
		this.insert(4, {
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
		this.insert(4, {
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
