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
			stateful: true,
			stateId: 'pagesize',
			stateEvents: ['savePageSize'],
			applyState: function(state) {
				if(state.hasOwnProperty('value')) {
					me.store.pageSize = state.value;
					this.setValue(state.value);
				}
				/*
				//console.log(state.pageSize, this.value, me.pageSize);
				if (state != undefined && this.value != state.pageSize) {
					this.setValue(state.pageSize);
					me.getStore().pageSize = state.pageSize;
				}*/
			},
			initComponent: function () {
		        var me = this;
		        if (me.allowOnlyWhitespace === false) {
		            me.allowBlank = false;
		        }
		        me.callParent();
		        me.addEvents('autosize', 'keydown', 'keyup', 'keypress', 'change');
		        //me.addStateEvents('change');
		        me.setGrowSizePolicy();
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
		/*{
			itemId: 'refresh',
			tooltip: me.refreshText,
			overflowText: me.refreshText,
			iconCls: Ext.baseCSSPrefix + 'tbar-loading',
			handler: me.doRefresh,
			scope: me
		}*/
		{
			itemId: 'refresh',
			text: 'Apply',
			style: {
				'border-color':'#81a4d0',
				'background-color':'#dbeeff',
				'background-image':'-webkit-linear-gradient(top,#dbeeff,#d0e7ff 48%,#bbd2f0 52%,#bed6f5)'
			},
			handler: function(){
				if (me.child('#pagesize').getValue() != pageSize) {
					me.store.currentPage = 1;
					me.store.pageSize = me.child('#pagesize').getValue();
					me.store.load();
				}
			},
			scope: me
		},
		'-', 
		{
			itemId: 'saveState',
			text: 'Apply to ALL tables',
			style: {
				'border-color':'#81a4d0',
				'background-color':'#dbeeff',
				'background-image':'-webkit-linear-gradient(top,#dbeeff,#d0e7ff 48%,#bbd2f0 52%,#bed6f5)'
			},
			handler: function(){
				me.child('#pagesize').fireEvent('savePageSize');
				if (me.child('#pagesize').getValue() != pageSize) {
					me.store.currentPage = 1;
					me.store.pageSize = me.child('#pagesize').getValue();
					me.store.load();
				}
			},
			scope: me
		}
		];
	},
	initComponent: function() {
		var me = this;
		//getting store
		if (me.store != null && typeof me.store == 'string') {
			me.store = Ext.getStore(me.store);
		}
		//set pageSize
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