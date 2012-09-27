Ext.Loader.setConfig({
	enabled: true
});

Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider', {
	expires: new Date(new Date().getTime()+(1000*60*60*24*7))
}));

Ext.application({
	name: 'VBI.Workspace',
	autoCreateViewport: true,
	launch: function() {
		// This is fired as soon as the page is ready
		var task = new Ext.util.DelayedTask(function() {
				Ext.getCmp('workspace_station').setDefault("Features");
				Ext.getCmp('workspace_globaltoolbar').switchViewButtons();
		});
		task.delay(500);
	},
	id: 'workspace',
	models: ['ColumnBrowser', 'Station', 'Feature', 'Genome', 'Group'],
	stores: ['ColumnBrowser', 'ColumnBrowser.Groups', 'ColumnBrowser.Tags', 'Stations', 'Features', 'Genomes', 'Groups', 'Mappings', 
		'ExpressionExperiments', 'ExpressionSamples'],
	controllers: ['ColumnBrowser', 'Station', 'Feature', 'Genome', 'Group', 'GlobalToolbar', 'Experiment']
});

Date.prototype.getDayOfYear = function(){
	var daysPerMonth = {
		1 : 31,	// jan
		2 : 28,	// feb
		3 : 31,	// mar
		4 : 30,	// apr
		5 : 31,	// may
		6 : 30,	// jun
		7 : 31,	// jul
		8 : 31,	// aug
		9 : 30,	// sep
		10: 31,	// oct
		11: 30,	// nov
		12: 31	// dec
	};

	// account for leap year
	if ((this.getFullYear()-1900)%4==0) 
		daysPerMonth[2] = 29;

	var doy = this.getDate();
	var i=this.getMonth()-1;
	while (i>0) {
		doy+=daysPerMonth[i];
		i--;
	}
	return doy;
};
Ext.Date.formatFunctions['x-date-relative'] = formatRelativeDate;

/**
	* This is our custom friendly Date formatter. It accepts an Ext.Date and 
	* formats it according to temporal distance from now:
	* 
	* <ul>
	* <li>A few seconds ago</li>
	* <li>A few minutes ago</li>
	* <li>About an hour ago</li>
	* <li>Today at [time]</li>
	* <li>Yesterday at [time]</li>
	* <li>Last [Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday]</li>
	* <li>About [1-6] weeks ago</li>
	* <li>[date]</li>
	* </ul>
	*
	* @param {Ext.Date} dateExt The date to format.
	* @return {String} The formatted date string.
	*
	* Due to a bug in ExtJS 4.0.2a, this function is not passed any arguments. so 
	* we just use 'this' for the Date to format.
	*
	* Due to the dysfunctional state of the Ext.Date object in ExtJDS 4.0.2a, 
	* we mostly use javascript Date functions instead of Ext.Date functions.
	*
*/
function formatRelativeDate(dateExt) {
	var dateExt = this;	// handle the no-argument bug
	var ms = Ext.Date.getElapsed(dateExt);
	var fullDate = Ext.Date.format(dateExt, 'M j, Y');	// Jan 1, 2001
	var fullTime = Ext.Date.format(dateExt, 'g:i a');		// 3:01 pm

	// handle the easy cases by ms comparisons
	// less than a minute
	if (ms<6e4) 
		return 'A few seconds ago';
	
	// less than 50 minutes ago
	if (ms<3e6) 
		return 'A few minutes ago';
	
	// less than 70 minutes ago
	if (ms<4.2e6) 
		return 'About an hour ago';
	

	// if not within the past hour, need some more sophistication
	// NOTE: calculations below all use javascript Date objects!

	// convert incoming Ext.Date to javascipt Date
	var dateStr = Ext.Date.format(dateExt, "d F, Y H:i:s");
	var date = new Date(Ext.Date.format(dateExt, "d F, Y H:i:s"));
	//var nt70 = new Date("01 January, 1970 00:00:00");
	//var msSince = Ext.Date.getElapsed(nt70, dateExt);
	//var date = new Date(msSince);

	// find out the now
	//var nowExt = Ext.Date.now();
	var now = new Date();
	var daysAgo = now.getDayOfYear()-date.getDayOfYear();
	var weeksAgo = Math.floor(daysAgo/7);
	var partialDaysAgo = (now.getDayOfYear()-date.getDayOfYear())%7;
	
	// more than a year ago
	if (now.getFullYear()-date.getFullYear() > 0) 
		return fullDate;
		
	// today (same year, same month, same day)
	if (now.getMonth()==date.getMonth() && now.getDate()==date.getDate()) 
		return 'Today at ' + fullTime;
	
	// yesterday (same year, same month, previous day)
	if (now.getMonth()==date.getMonth() && now.getDate()-date.getDate()==1) 
		return 'Yesterday at ' + fullTime;
	
	// within the past week
	if (weeksAgo==0 || (weeksAgo==1 && partialDaysAgo==0)) 
		return 'Last ' + Ext.Date.format(dateExt, 'l');
	
	// within the past ten days
	if (daysAgo<11) 
		return daysAgo + ' days ago';


	// 1-6 weeks ago
	// exact weeks
	if (weeksAgo<7 && partialDaysAgo==0) 
		return weeksAgo + ' weeks ago';
	
	// partial weeks
	if (weeksAgo<7 && partialDaysAgo<4) 
		return 'About ' + weeksAgo + ' weeks ago';
	if (weeksAgo<7 && partialDaysAgo>3) 
		return 'About ' + (weeksAgo+1) + ' weeks ago';

	return fullDate;
};

function BasicRenderer(value, metadata, record, rowIndex, colIndex, store){
	metadata.tdAttr = 'data-qtip="'+value+'" data-qclass="x-tip"';
	return value;
}

function launchExperimentDetail(expid) {
	Ext.getCmp("workspace_detailview").fireEvent('viewExpDetail', expid);
}