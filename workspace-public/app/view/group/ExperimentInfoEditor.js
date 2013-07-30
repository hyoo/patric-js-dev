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
	}],
	loadRecord: function(record) {
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
			description: record.get("desc"), 
			organism: record.get("organism"),
			pmid: (record.get("pmid")!=0)?record.get("pmid"):"",
			updated: Ext.Date.format(Ext.Date.parse(record.get("mdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			created: Ext.Date.format(Ext.Date.parse(record.get("cdate"), 'Y-m-d H:i:s'), 'M j, Y'),
			file: record.get("origFileName")
		});
	}
});
