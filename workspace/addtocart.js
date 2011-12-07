var btnGroupPopupSave = new Ext.Button({text:'Save to Workspace'});
var popup;
var signup_popup;

function addSelectedItems(workspace_type){
	
	Ext.Ajax.request({
		method:'GET',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=LoginStatus&action=getLoginStatus',
		success: function(response, opts) {
			if(response.responseText == "false") {
				Ext.Ajax.request({
					method:'GET',
					url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=PopupShowedStatus&action=getPopupStatus',
					success: function(response, opts) {
						if (response.responseText == "false") {
							if (!signup_popup) {
								signup_popup = getSignUpPopupWindow(workspace_type);
								signup_popup.show();
							}
						} else {
							DecideToShowPopup(workspace_type);
						}
					
					}
				});
			} else {
				setPopupStatus(workspace_type);
			}
		}
	});
}

function DecideToShowPopup(workspace_type){
	
	if (!popup) {
		popup = getCartWindow(workspace_type);
		popup.show();
	} else {
		popup.workspace_type = workspace_type;
		popup.show();
		loadATGCombo();	
	}
	
	Ext.Ajax.request({
		method:'GET',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=LoginStatus&action=getLoginStatus',
		success: function(response, opts) {
			if(response.responseText == "true"){
				ATGform.remove(note_to_user);
			}
		}
	});
	
}

function saveToGroup(fid, type) {
	Ext.getCmp('group_name').setValue(Ext.getCmp('group_name_textfield').getValue());
	Ext.getDom('group_members').value = fid;
	
	popup.hide();
	
	Ext.Ajax.request({
		method:'POST',
		params:{
			group_name:Ext.getCmp('group_name').getValue(),
			group_desc:Ext.getCmp('group_desc').getValue(),
			group_type: type,
			tracks:fid,
			tags:Ext.getCmp('group_tags_textfield').getValue()
			},
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=groupAction&action=create',
		success: function(response, opts) {
			updateCartInfo();
		}
	});
	return true;
	
}

var existing_combo = null;
var combo_store = new Ext.data.Store({
	fields: ['name', 'description', 'tags']
});

var existing_textfield  = Ext.create('Ext.form.field.Text', {
	xfield:'textfield',
	emptyText: 'New group name',
	name: 'group_name_textfield',
	id: 'group_name_textfield',
	anchor:'100%',
	value:'',
	disabled: true
});

var existing_textarea = Ext.create('Ext.form.field.TextArea', {
	xtype: 'textareafield',
	emptyText: 'Description',
	name: 'group_desc',
	id: 'group_desc',
	anchor: '100%',
	value:'',
	disabled: true
});

var existing_tags  = Ext.create('Ext.form.field.Text', {
	xfield:'textfield',
	fieldLabel: 'Tags',
	emptyText: '(comma separated)',
	name: 'group_tags_textfield',
	id: 'group_tags_textfield',
	anchor:'100%',
	value:''
});


var note_to_user = Ext.create('Ext.form.Label', {
	xtype: 'label',
	html:'<br/><u>Note:</u> As Guest, your Workspace items persist until you close your browser.' +
		'To save your Workspace items, <a target="_blank" href="https://www.patricbrc.org/portal/portal/patric/MyAccount/PATRICUserPortletWindow?_jsfBridgeViewId=%2Fjsf%2Findex.xhtml&amp;action=1">register</a> or <a href="javascript:LoginonPopupClick();">login</a>.',
	height: 20,
	width : 250
});

function LoginonPopupClick(){
	popup.hide();
	alertModal('login-modal','login-modal-msg', window.location.href.replace("portal/portal", "portal/auth/portal"));
	
}

var ATGform = Ext.create('Ext.form.Panel', {
	formId: 'ATGform',
	baseCls: 'x-plain',
	fieldDefaults:{
		labelWidth: 40
	},
	style: {
		'background-color': 'white',
		'padding': '10px'
	},
	items: [
		{
			xtype:'combo',
			labelWidth: 80,
			fieldLabel: 'Add to group',
			queryMode: 'local',
			store: combo_store,
			editable: false,
			autoSelect: false,
			displayField: 'name',
			valueField:'name',
			anchor: '100%',
			listeners: {
				added: function(combo, option) {
					combo.select("None");
				},
				change: function(field, newValue, oldValue, options) {
					if (newValue == 'None') {
						existing_textfield.disable();
						existing_textarea.disable();
						
					} else if (newValue == 'Create New Group') {
						existing_textfield.enable();
						existing_textfield.setValue("");
						existing_textfield.setReadOnly(false);
						existing_textfield.focus();
						
						existing_textarea.enable();
						existing_textarea.setValue("");
						existing_tags.setValue("");
						
					} else {
						idx = combo_store.find("name", newValue, undefined, undefined, undefined, true);
						record = combo_store.getAt(idx);
						
						existing_textfield.enable();
						existing_textfield.setValue(record.get('name'));
						existing_textfield.setReadOnly(true);
						
						existing_textarea.enable();
						existing_textarea.setValue(record.get('description'));
						existing_tags.setValue(record.get('tags'));
					}
				}
			}
		},
		existing_textfield,
		existing_textarea, 
		existing_tags,
		note_to_user,
		new Ext.form.Hidden({
			  id: 'group_name'
		}),
		new Ext.form.Hidden({
			name: 'action_type',
			value: 'groupAction'
		}),
		new Ext.form.Hidden({
			name: 'action',
			value: 'add'
		}), 
		new Ext.form.Hidden({
			id: 'group_members',
			name: 'fid'
		})
	]
});

function loadATGCombo() {
	existing_textfield.setValue("");
	existing_textarea.setValue("");
	existing_tags.setValue("");
	
	loadGroups();
}
 
// cart-window

function getCartWindow(workspace_type) {
	popup = Ext.create('Ext.Window', {
		layout:'fit',
		width:350,
		height:280,
		closeAction:'hide',
		plain: true,
		modal: true,
		title: "Add Selected "+workspace_type+"(s) to Workspace",
		items: [ATGform],
		buttons: [btnGroupPopupSave,{
			text: 'Cancel',
			handler: function(){popup.hide();}
		}]
	});
	popup.workspace_type = workspace_type;
	loadATGCombo();
	
	return popup;
}

function getSignUpPopupWindow(workspace_type){
	
	signup_popup = Ext.create('Ext.Window', {
		    
		closeAction:'hide',
		plain: true,
		modal: true,
		width: 330,
		height: 465,
		layout:'border',
		title:'WANT TO SAVE WORKSPACE ITEMS?',
		items:[{
			height: 320,
			region:'center',
			html:'<div style="padding-top: 10px;font-size: 16px;font-weight: bold; line-height: 18px; text-align:center;">WANT TO SAVE</div><div style="font-size: 16px;font-weight: bold; line-height: 18px; text-align:center;">WORKSPACE ITEMS?</div>'+
				'<div style="padding-top: 12px;padding-left: 7px;"><img src="/patric/images/horizonal_rule_302x2.png"></div>'+
				'<div style="padding: 5px;font-size: 14px;font-weight: bold; line-height: 18px;">Login to your PATRIC Account</div>'+
				'<div style="padding: 10px 5px 10px 25px;"><div id="window_login-modal"><div id="window_login-modal-msg" style="width:255px;height:109px"><div id="window_loginIframe" class="login-content"></div></div></div></div>'+
				'<div style="padding-top: 12px;padding-left: 7px;"><img src="/patric/images/horizonal_rule_OR_302x9.png"></div>'+
				'<div style="padding: 5px;font-size: 14px;font-weight: bold; line-height: 18px;">Register @ PATRIC</div>'+
				'<p style="padding:9px"><a target="_blank" href="https://www.patricbrc.org/portal/portal/patric/MyAccount/PATRICUserPortletWindow?_jsfBridgeViewId=%2Fjsf%2Findex.xhtml&amp;action=1">Sign up</a> for a PATRIC account to save custom sets of workspace genomes and more<br><a target="_blank" href="http://enews.patricbrc.org/faqs/workspace-faqs/registration-faqs/" style="float: right;padding: 0px 20px;">Learn more</a></p>'+
				'<div style="padding-top: 12px;padding-left: 7px;"><img src="/patric/images/horizonal_rule_OR_302x9.png"></div>'+
				'<div style="padding: 5px;font-size: 14px;font-weight: bold; line-height: 18px;">Work as Guest</div>'+
				'<p style="padding: 9px;">As Guest, your Workspace items persists until you close your browser.<br><input style="width:120px;height:20px;top: 1px;padding: 0px 0px 0px 13px;position:relative;left: 180px;cursor: move;" onclick="javascript:setPopupStatus(\''+workspace_type+'\');return false;" value="Continue as Guest" class="login-button"></p></div>',
			border:false
		}],
		listeners:{
			hide: function() {
				setPopupStatus(workspace_type);
			},
			show: function() {
				PopupModalLoading = true;
				alertModal('login-modal','login-modal-msg', window.location.href.replace("portal/portal", "portal/auth/portal"));
			}
		}
	});
	
	return signup_popup;
	
}

function setPopupStatus(workspace_type){
	PopupModalLoading = false;
	isPopupModalLoaded = true;
	if(signup_popup != null)
		signup_popup.destroy();
	Ext.Ajax.request({
		method:'GET',
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=PopupShowedStatus&action=setPopupStatus',
		success: function(response, opts) {
			DecideToShowPopup(workspace_type);
		}
	});
	
}

function loadGroups() {
	
	Ext.Ajax.request({
		url: '/portal/portal/patric/BreadCrumb/WorkspaceWindow?action=b&cacheability=PAGE&action_type=WSSupport&action=getGroupList&group_type='+popup.workspace_type,
		method: 'GET',
		success: function(response, opts) {
			readerx = Ext.JSON.decode(response.responseText);
			combo_store.loadData(readerx);
			
			combo_store.insert(0, {"name":"Create New Group"});
			combo_store.insert(0, {"name":"None"});
		}
	});		 
	
}
