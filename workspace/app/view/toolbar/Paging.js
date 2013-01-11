Ext.define('VBI.Workspace.view.toolbar.Paging', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.patricpagingtoolbar',
	beforePageSizeText: 'Show',
	afterPageSizeText: 'per page',
	displayMsg : 'Displaying record {0} - {1} of {2}',
	displayInfo: true,
	pageSize: 20,
	maskOnDisable: true,
	getPagingItems: function() {
		var me = this;
		return [{
			itemId: 'first',
			tooltip: me.firstText,
			overflowText: me.firstText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
			disabled: true,
			handler: me.moveFirst,
			scope: me
		},{
			itemId: 'prev',
			tooltip: me.prevText,
			overflowText: me.prevText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
			disabled: true,
			handler: me.movePrevious,
			scope: me
		},
		'-',
		me.beforePageText,
		{
			xtype: 'numberfield',
			itemId: 'inputItem',
			name: 'inputItem',
			cls: Ext.baseCSSPrefix + 'tbar-page-number',
			allowDecimals: false,
			minValue: 1,
			hideTrigger: true,
			enableKeyEvents: true,
			keyNavEnabled: false,
			selectOnFocus: true,
			submitValue: false,
			width: me.inputItemWidth,
			margins: '-1 2 3 2',
			listeners: {
				scope: me,
				keydown: me.onPagingKeyDown,
				blur: me.onPagingBlur
			}
		},{
			xtype: 'tbtext',
			itemId: 'afterTextItem',
			text: Ext.String.format(me.afterPageText, 1)
		},
		'-',
		{
			itemId: 'next',
			tooltip: me.nextText,
			overflowText: me.nextText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
			disabled: true,
			handler: me.moveNext,
			scope: me
		},{
			itemId: 'last',
			tooltip: me.lastText,
			overflowText: me.lastText,
			iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
			disabled: true,
			handler: me.moveLast,
			scope: me
		},
		'-', 
		/* modification start */
		me.beforePageSizeText,
		{
			xtype: 'numberfield',
			itemId: 'pagesize',
			cls: Ext.baseCSSPrefix + 'tbar-page-number',
			allowDecimals: false,
			minValue: 1,
			maxValue: 64000,
			hideTrigger: true,
			enableKeyEvents: true,
			selectOnFocus: true,
			submitValue: false,
			width: 50,
			margins: '-1 2 3 2',
			value: me.pageSize,
			stateId: 'workspace_pagesize',
			stateEvents:['change'],
			getState: function() {
				//console.log("getState:"+this.value);
				return { pageSize: this.value };
			},
			applyState: function(state) {
				//console.log(state.pageSize, this.value);
				if ((state == undefined || state.pageSize == undefined) && this.value == undefined) {
					var state = { pageSize: 100 };
					this.setValue(state.pageSize);
				}
				else if (state != undefined && this.value != state.pageSize) {
					this.setValue(state.pageSize);
				}
			},
			listeners: {
				scope: me,
				specialKey: function(field, e) {
					if (e.getKey() == e.ENTER) {
						//this.doRefresh();
						var	value = field.getValue(),
							valueIsNull = value === null;
					
						if (valueIsNull == false) {
							if (Ext.isString(me.store)) {
								var store = Ext.getStore(me.store);
								store.currentPage = 1;
								store.pageSize = value;
							} else {
								me.store.currentPage = 1;
								me.store.pageSize = value;
							}
						}
					}
				}
			}
		},
		me.afterPageSizeText,
		'-',
		/* end of modification */
		{
			itemId: 'refresh',
			tooltip: me.refreshText,
			overflowText: me.refreshText,
			iconCls: Ext.baseCSSPrefix + 'tbar-loading',
			handler: me.doRefresh,
			scope: me
		}];
	},
	initComponent: function() {
		var me = this;
		if (me.store != null && typeof me.store == 'string') {
			me.store = Ext.getStore(me.store);
		}
		if (me.store != null && me.store.pageSize != null) {
			if (typeof me.store.pageSize == 'string') {
				me.pageSize = parseInt(me.store.pageSize);
			} else if (typeof me.store.pageSize == 'number') {
				me.pageSize = me.store.pageSize;
			}
		}
		this.callParent();
	}
});