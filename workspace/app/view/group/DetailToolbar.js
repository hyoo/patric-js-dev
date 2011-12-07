Ext.define('VBI.Workspace.view.group.DetailToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.detailtoolbar',
	items: [
		{ 
			text: '<font color=#fff><b>All Groups</b></font>', 
			//iconCls: 'x-btn-prev',
			iconCls: 'leftarrow',
			overCls: '',
			pressedCls: '',
			style: {
				'background-color': '#0a4773'
			},
			minWidth: 95,
			itemId: 'backButton', 
			scope: this
		}
	] //, 

	/**
	 * Add a title string to this toolbar. If the string is longer than 80% of 
	 * the total toolbar width, it is truncated. Pass an alignment argument to 
	 * align the title on the toolbar (defaults to center).
	 * @param {String} text The title string to add.
	 * @param {String} align The alignment of the title (left, right, center).
	*/
	/*
	addTitle: function(text, align) {
				
		if (typeof text == 'undefined' || text == null || text == '') 
			return;
		
		if (typeof align == 'undefined' || align == null || align == '') 
			align = 'center';
			
		var barW=this.getWidth();
		
		// max length of title is 80% of total toolbar width
		var maxLength = parseInt(barW*0.8);
		if (text.length > maxLength) 
			text = Ext.String.ellipsis(text, maxLength-3);
		
		switch (align) {
			case 'left': 
				this.add(text);
				break;
			case 'right':
				this.add('->', text);
				break;
			default:
				var btnW = this.getComponent('backButton').getWidth();
				var paddingLength = parseInt(barW/2-text.length/2-btnW);
				this.add(
					Ext.create('Ext.Toolbar.Spacer', {width: paddingLength}), 
					text
				);
		}
	}
	*/
});