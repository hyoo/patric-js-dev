/**
* define Toolbar Buttons
*/

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

Ext.define('VBI.Workspace.view.Toolbar.button.ResetColumnState', {
	extend: 'Ext.Button',
	alias: 'widget.tbar_btn_resetcolumnstate',
	scale: 'large',
	iconAlign: 'left',
	text: 'Reset<br/>Configs'
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


/**
* define Toolbar ButtonGroups
*/
Ext.define('VBI.Workspace.view.Toolbar.buttongroup.Help', {
	extend: 'Ext.container.ButtonGroup',
	alias: 'widget.tbar_btngrp_help',
	title: 'Help',
	items: [{
		scale: 'small',
		text: 'PATRIC FAQs',
		icon: '/patric/images/toolbar_faq_small.png',
		handler: function() {
			window.open("http://enews.patricbrc.org/faqs/", "_new", "menubar=1,resizable=1,scrollbars=1, fullscreen=1, toolbar=1,titlebar=1,status=1");
		}
	}]
});