Ext.define('VBI.Workspace.selection.CheckboxModel', {
	extend: 'Ext.selection.CheckboxModel',
	getHeaderConfig: function() {
		var me = this,
			showCheck = me.showHeaderCheckbox !== false;
		return {
			id: me.id, //added
			isCheckerHd: showCheck,
			text : '&#160;',
			width: me.headerWidth,
			sortable: false,
			draggable: false,
			resizable: false,
			hideable: false,
			menuDisabled: true,
			dataIndex: '',
			cls: showCheck ? Ext.baseCSSPrefix + 'column-header-checkbox ' : '',
			renderer: Ext.Function.bind(me.renderer, me),
			editRenderer: me.editRenderer || me.renderEmpty,
			locked: me.hasLockedHeader()
		};
	}
});