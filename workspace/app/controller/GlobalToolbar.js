Ext.define('VBI.Workspace.controller.GlobalToolbar', {
	extend: 'Ext.app.Controller',
	init: function() {
		this.control({
			'globaltoolbar button': {
				switchToListView: this.onSwitchToListView,
				switchToGroupView: this.onSwitchToGroupView
			}
		});
	},
	onSwitchToListView: function(button, e) {
		var vp = Ext.getCmp('workspace_view');
		vp.applyState({activeItem:'listview'});
		vp.getLayout().setActiveItem('listview');
	},
	onSwitchToGroupView: function(button, e) {
		var vp = Ext.getCmp('workspace_view');
		vp.applyState({activeItem:'groupview'});
		vp.getLayout().setActiveItem('groupview');
	}
});
