Ext.define('VBI.Workspace.view.group.Browser', {
	extend: 'Ext.view.View',
	alias : 'widget.groupbrowser',
	store: 'Groups', 
	id: 'workspace_groupbrowser',
	stateful: false,
	tpl: [
			'<tpl for=".">',
				'<div class="thumb-wrap">',
					'<div class="thumb">',
						(!Ext.isIE6? '<img src="{thumb}"  alt="{name}" title="{name}" />' : 
						'<div style="width:76px;height:76px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{thumb}\')"></div>'),
					'</div>',
					'<div class="title">{[Ext.String.ellipsis(values.name, 20)]} ({members})</div>',
					'<div class="type">{type} Group</div>',
					'<div class="updated">Updated: {[Ext.Date.format(Ext.Date.parse(values.mdate, "Y-m-d H:i:s"), "x-date-relative")]}</div>',
				'</div>',
			'</tpl>'
	],
	autoScroll: true,
	multiSelect: true,
	itemSelector: 'div.thumb-wrap',
	cls: 'x-browser-view'
});
