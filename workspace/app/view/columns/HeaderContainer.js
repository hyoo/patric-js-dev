Ext.define('VBI.Workspace.view.columns.HeaderContainer', {
	applyColumnsState: function(columns) {
		if (!columns || !columns.length) {
			return;
		}

		var me 		= this,
			items	= me.items.items,
			count 	= items.length,
			i 		= 0,
			length 	= columns.length,
			c, col, columnState, index;

			for (c = 0; c < length; c++) {
				columnState = columns[c];

				for (index = count; index--; ) {
					col = items[index];
					//if (col.getStateId && col.getStateId() == columnState.id) {
					if (col.itemId == columnState.id) { //changed by Harry
						if (i !== index) {
							me.moveHeader(index, i);
						}

						if (col.applyColumnState) {
							col.applyColumnState(columnState);
						}
						++i;
						break;
					}
				}
			}
	},
	getColumnsState: function () {
		var me = this,
			columns = [],
			state;

		me.items.each(function (col) {
			state = col.getColumnState && col.getColumnState();
			if (state) {
				state.id = col.itemId; //added
				columns.push(state);
			}
		});

		return columns;
	}
});