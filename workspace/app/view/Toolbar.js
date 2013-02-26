/**
* define Toolbar Buttons
*/
Ext.define('VBI.Workspace.view.Toolbar.button.Remove', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_remove',
	scale: 'small',
	iconAlign: 'left',
	text: 'Remove',
	width: 110,
	icon: '/patric/images/toolbar_workspace_remove.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.Create', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_create',
	scale: 'small',
	iconAlign: 'left',
	text: 'Create',
	width: 110,
	icon: '/patric/images/toolbar_workspace_add.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.Pathway', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_pathway',
	scale: 'small',
	iconAlign: 'left',
	text: 'Pathway Summary',
	icon: '/patric/images/16x16-toolbar-icon-pathway.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.MSA', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_msa',
	scale: 'small',
	iconAlign: 'left',
	text: 'Multiple Seq Alignment',
	icon: '/patric/images/16x16-toolbar-icon-msa.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.MapIDsTo', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_mapidsto',
	scale: 'small',
	iconAlign: 'left',
	text: 'MAP IDs to...',
	icon: '/patric/images/16x16-toolbar-icon-idmapping.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.GeneList', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_genelist',
	scale: 'small',
	iconAlign: 'left',
	text: 'Gene List',
	width: 110,
	icon: '/patric/images/toolbar_icon_genelist.png'
});

Ext.define('VBI.Workspace.view.Toolbar.button.ShowHide', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_showhide',
	scale: 'large',
	iconAlign: 'left',
	icon: '/patric/images/toolbar_hideshow.png',
	text: 'Show/Hide'
});

/**
* define menu Items
*/
Ext.define('VBI.Workspace.view.Toolbar.menu.Download_Table_Txt', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_tb_txt',
	scale: 'small',
	iconAlign: 'left',
	text: 'Text File (.txt)',
	icon: '/patric/images/toolbar_text.png'
});

Ext.define('VBI.Workspace.view.Toolbar.menu.Download_Table_Xls', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_tb_xls',
	scale: 'small',
	iconAlign: 'left',
	text: 'Excel file (.xlsx)',
	icon: '/patric/images/toolbar_excel.png'
});

Ext.define('VBI.Workspace.view.Toolbar.menu.Download_dna', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_dna',
	scale: 'small',
	iconAlign: 'left',
	text: 'DNA',
	icon: '/patric/images/toolbar_dna.png',
});

Ext.define('VBI.Workspace.view.Toolbar.menu.Download_protein', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_protein',
	scale: 'small',
	iconAlign: 'left',
	text: 'Protein',
	icon: '/patric/images/toolbar_protein.png'
});

Ext.define('VBI.Workspace.view.Toolbar.menu.Download_dnaprotein', {
	extend: 'Ext.menu.Item',
	alias: 'widget.tbar_menu_dn_dnaprotein',
	scale: 'small',
	iconAlign: 'left',
	text: 'DNA/Protein',
	icon: '/patric/images/toolbar_dna_protein.png'
});

/**
* define Toolbar ButtonGroups
*/
Ext.define('VBI.Workspace.view.Toolbar.buttongroup.Help', {
	extend: 'Ext.container.ButtonGroup',
	alias: 'widget.tbar_btngrp_help',
	title: 'Help',
	items: [{
		scale: 'large',
		text: 'FAQs',
		icon: '/patric/images/toolbar_faq.png',
		handler: function() {
			window.open("http://enews.patricbrc.org/faqs/", "_new", "menubar=1,resizable=1,scrollbars=1, fullscreen=1, toolbar=1,titlebar=1,status=1");
		}
	}]
});

/**
* define Modal 
*/
Ext.define('VBI.Workspace.view.Toolbar.window.AddToGroup', {
	extend: 'Ext.Window',
	alias: 'widget.tbar_window_addtogroup',
	layout:'fit',
	width:350,
	height:300,
	closeAction:'hide',
	modal: true,
	items: [{
		xtype: 'addtoworkspace',
		id: 'ATGform'
	}]
});
