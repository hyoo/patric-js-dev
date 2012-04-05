Ext.define("CoordView.model.Accession",{extend:"Ext.data.Model",idProperty:"name",fields:[{name:"name",type:"string"},{name:"count",type:"int"}]});Ext.define("CoordView.model.Feature",{extend:"Ext.data.Model",idProperty:"rownum",fields:["exp_accession","exp_samples","exp_platform","exp_name","exp_locustag",{name:"exp_pavg",type:"float",useNull:true},{name:"exp_pratio",type:"float",useNull:true},"patric_locus_tag","figfam_id","rownum"]});Ext.define("CoordView.model.Platform",{extend:"Ext.data.Model",idProperty:"name",fields:[{name:"name",type:"string"},{name:"count",type:"int"}]});Ext.define("CoordView.store.Accessions",{extend:"Ext.data.Store",model:"CoordView.model.Accession",storeId:"accessionStore",proxy:{type:"ajax",url:"/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE",extraParams:{featureId:""},reader:{type:"json",root:"exp_stat_accession"},noCache:false},autoLoad:true,pageSize:500});Ext.define("CoordView.store.Features",{extend:"Ext.data.Store",model:"CoordView.model.Feature",storeId:"featureStore",proxy:{type:"ajax",url:"/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE",extraParams:{featureId:""},reader:{type:"json",root:"results"},noCache:false},autoLoad:true,pageSize:50,listeners:{load:function(){count=Ext.getStore("Features").getCount();(count==1)?countStr=count+" record":countStr=count+" records";Ext.getCmp("filterReport").setText(countStr)},single:true}});Ext.define("CoordView.store.Platforms",{extend:"Ext.data.Store",model:"CoordView.model.Platform",storeId:"platformStore",proxy:{type:"ajax",url:"/portal/portal/patric/TranscriptomicsGeneExp/TranscriptomicsGeneExpWindow?action=b&cacheability=PAGE",extraParams:{featureId:""},reader:{type:"json",root:"exp_stat_platform"},noCache:false},autoLoad:true,pageSize:500});Ext.define("CoordView.view.AccessionChart",{extend:"Ext.panel.Panel",alias:"widget.accessionchart",id:"p-accessionchart",items:[{xtype:"chart",store:"Accessions",theme:"Base",animate:true,series:[{type:"pie",field:"count",highlight:{segment:{margin:10}},donut:6,label:{field:"name",display:"rotate",contrast:true,font:"11px Arial",renderer:function(a){return Ext.String.ellipsis(a,30,true)}},listeners:{itemmouseup:function(a,b){console.log(a.storeItem.getId());CoordView.filter("exp_accession",a.storeItem.getId());return true}}}]}]});Ext.define("CoordView.view.ExpAvgChart",{extend:"Ext.panel.Panel",alias:"widget.expavgchart",id:"p-expavgchart",items:[{xtype:"chart",store:"Features",id:"expavgchart",axes:[{type:"Numeric",position:"left",fields:["exp_pavg"],title:"Expression Level",minimum:-5},{type:"Numeric",position:"bottom",fields:["rownum"],title:"Samples",minimum:0}],series:[{type:"scatter",markerConfig:{radius:2,size:2},axis:"left",yField:"exp_pavg",xField:"rownum"}],listeners:{refresh:function(b,a){b.surface.removeAll();b.redraw()}}}]});Ext.define("CoordView.view.ExpRatioChart",{extend:"Ext.panel.Panel",alias:"widget.expratiochart",id:"p-expratiochart",items:[{xtype:"chart",store:"Features",axes:[{type:"Numeric",position:"left",fields:["exp_pratio"],title:"Expression Ratio",minimum:-3},{type:"Numeric",position:"bottom",fields:["rownum"],title:"Samples",minimum:0}],series:[{type:"scatter",markerConfig:{radius:2,size:2},axis:"left",yField:"exp_pratio",xField:"rownum"}]}]});Ext.define("CoordView.view.PlatformChart",{extend:"Ext.panel.Panel",alias:"widget.platformchart",id:"p-platformchart",items:[{xtype:"chart",store:"Platforms",theme:"Base",animate:true,series:[{type:"pie",field:"count",highlight:{segment:{margin:10}},donut:6,label:{field:"name",display:"rotate",contrast:true,font:"11px Arial",renderer:function(a){return Ext.String.ellipsis(a,30,true)}},listeners:{itemmouseup:function(a,b){console.log(a.storeItem.getId());CoordView.filter("exp_platform",a.storeItem.getId());return true}}}]}]});Ext.define("CoordView.view.FeatureGrid",{extend:"Ext.grid.Panel",alias:"widget.featuregrid",id:"p-featuregrid",store:"Features",autoScroll:true,columns:[{dataIndex:"rownum",header:"ID",flex:1},{dataIndex:"exp_accession",header:"Accession",flex:1},{dataIndex:"exp_samples",header:"Samples",flex:1},{dataIndex:"exp_platform",header:"Platform",flex:1},{dataIndex:"exp_name",header:"Condition",flex:3},{dataIndex:"exp_locustag",header:"Locus Tag",flex:1},{dataIndex:"exp_pavg",header:"Avg",flex:1},{dataIndex:"exp_pratio",header:"Ratio",flex:1}],renderGenome:function(c,b,a){if(typeof c=="undefined"){return""}if(typeof a=="undefined"||!a.hasOwnProperty("data")||!a.data.hasOwnProperty("genome_info_id")||a.data.cId==""){return c}if(c==null||c==""){return Ext.String.format('<a href="Genome?cType=genome&cId={0}">cid:{0}</a>',a.data.genome_info_id)}else{return Ext.String.format('<a href="Genome?cType=genome&cId={0}">{1}</a>',a.data.cId,c)}}});Ext.define("CoordView.controller.ViewController",{extend:"Ext.app.Controller",id:"ViewController",views:["FeatureGrid","AccessionChart","PlatformChart","ExpAvgChart","ExpRatioChart"],stores:["Features","Accessions","Platforms"],models:["Feature","Accession","Platform"],init:function(){console.log("Initialized controller!")},seriesClick:function(a,b){console.log("ViewController.seriesClick");console.log(arguments)}});Ext.onReady(function(){Ext.application({name:"CoordView",appFolder:"app",models:["Genome","Feature","Disease","GenomeType","SeqStatus","SeqPlatform","IsoSource","Pathovar"],controllers:["ViewController"],launch:function(){console.log("launched app!");var a=Ext.getDom("featureId").value;Ext.getStore("Features").getProxy().extraParams.featureId=a;Ext.getStore("Accessions").getProxy().extraParams.featureId=a;Ext.getStore("Platforms").getProxy().extraParams.featureId=a;CoordView.filterCall=null;CoordView.filter=function(h,g,e){var c=Ext.getStore("Features");c.clearFilter();var d="";var f=0;if(g==""||g==null||g=="Filter"){c.filter();f=Ext.getStore("Features").getCount();(f==1)?d=f+" record":d=f+" records";Ext.getCmp("filterReport").setText(d)}else{(e)?c.filter(h,new RegExp(g,"gi")):c.filter(h,g);f=Ext.getStore("Features").getCount();(f==1)?d=f+" record matches":d=f+" records match";var b="<i>"+g+"</i>";if(h!="indx_str"){Ext.getCmp("filterTextField").reset()}Ext.getCmp("filterReport").setText(d+" "+b)}};Ext.create("Ext.panel.Panel",{renderTo:"expression_panel",id:"p-genomelist-ui",layout:"border",minHeight:600,minWidth:700,width:1000,height:700,maximizable:true,minimizable:false,closable:false,items:[{region:"center",layout:"border",items:[{region:"center",xtype:"featuregrid"},{region:"south",height:250,layout:"fit",items:[{xtype:"tabpanel",items:[{title:"Avg",layout:"fit",xtype:"expavgchart"},{title:"Ratio",layout:"fit",xtype:"expratiochart"}]}]}]},{region:"east",width:320,layout:{type:"vbox",align:"center"},items:[{xtype:"tabpanel",width:320,flex:1,items:[{title:"Accession",layout:"fit",xtype:"accessionchart"}]},{xtype:"tabpanel",width:320,flex:1,items:[{title:"Platform",layout:"fit",xtype:"platformchart"}]}]}],dockedItems:[{xtype:"toolbar",dock:"bottom",items:[{xtype:"textfield",name:"filterField",id:"filterTextField",itemId:"filterText",width:125,hideLabel:true,allowBlank:true,value:"",emptyText:"Filter",scope:this,listeners:{specialkey:function(c,b){if(b.getKey()==b.ENTER){clearTimeout(CoordView.filterCall);CoordView.filterCall=null;var d=c.getValue();CoordView.filter("exp_name",d,true)}}}},"->",{xtype:"tbtext",text:"",id:"filterReport"}]}]}).show()}})});