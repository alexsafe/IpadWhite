
var xmlPrj="";
var xmlReturn="";
function xmlToString(xmlData) 
{ 
    var xmlString;
    //IE
    if (window.ActiveXObject)
	{
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else
	{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}  
var url='http://pillar.pilon.co.uk:82/clientPack/info.php?key=3v3r3st&id=6598d72ef2d225ac18b294dc8acc85a2&sqlId=1';
var xml="";
function getHttpObject()
{
	var xmlhttp = null;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Your browser does not support XMLHTTP!");
	}
	return xmlhttp;
}
xmlhttp = getHttpObject();
xmlhttp.onreadystatechange = function() {
//alert(xmlhttp.status);//it is displaying 0 it means The server is not responding or is not reachable//
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// alert(xmlhttp.responseText);
xmlReturn=xmlhttp.responseText;
}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();


$(function() {
	$.get(url, function(responseXml) {
		xml = $(responseXml);
		// console.log("xml1->"+xml);
		var title = $("rows", xml).toArray();
		
		// console.log("title"+xmlToString(title[0]));
		xmlPrj=xmlToString(title[0]);
		//xmlPrj=xmlToString(xml);
	});
});

var map;
//response.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
//var lightBlue=['#00415d','#a1cee1','#9fcee1','#a0cde0','#9fcee1','#9ecde0','#00415d','#a1cee1','#9ecbde','#a0cde0']; //#a3d2e5
var darkerBlue=['#00415d'];//['#010101','#010101','#010101','#418794','#00000','#448996','#488d9a','#45909d','#418693','#458a96'];
//var green=['#34d04a','#3cd752','#3ed253','#43c455','#42cb55','#42bf54','#40c853','#40c84a','#53d95d','#54d05d'];
//var lightGreen=['#1cf46d','#1ef16e','#1ff16e','#1eed6c','#21ed6e','#22ed6f','#22ec6e','#25ec70','#22ea6d','#23ec6f'];
//var orange=['#ecb93e','#e7b53c','#e7b43a','#e5b339','#e3b23b','#e1af38','#dcac37','#deae39','#d9a936','#d9aa38'];
//var colorArray=lightGreen.concat(lightBlue).concat(orange);
var pX=0;
var pY=0;
var code=" ";
var currId=0;
var currCode=" ";
var colorArray=darkerBlue ;

var viewApp;
var backButton;
var buttonKPIs;
var buttonProgress;
var buttonFlags;
var buttonPrTeam;
var buttonMap;
var viewkpisn;
var paneCs;
var paneHs;
var panePeople;
var paneOperations;
var paneEfficiency;
var paneFlags;
var viewProgress;
var viewFlags;
var viewPrTeam;
var viewPrTeamScroll;
var panePrTeam;
var viewMap;
var Legend;
var LegendOpener;
var topicSubscribe;
var LegendTxt;
var opener;
require([
"dojo/_base/declare",
"dijit/_WidgetBase"	,
"dojo/dom",
"dojo/dom-construct",			
"dojo/ready",
"dojo/on",
"dojo/_base/connect",
"dijit/registry",
"dojox/mobile/compat",
"dojo/topic",
"dojox/gantt/GanttChart",
"dojox/gantt/GanttProjectItem",
"dojox/gantt/GanttTaskItem",
"dijit/_base/manager",
"dojox/xml/parser",
"dojox/xml/DomParser",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/FixedSplitter",
"dojox/mobile/Pane",
"dojox/mobile/TabBar",
"dojox/mobile/View",
"dojox/mobile/ScrollableView",
"dojox/mobile/GridLayout",
"dojox/mobile/Accordion",
"dojox/mobile/Heading",
"dojox/mobile/SwapView",
"dojox/mobile/Button",
"dojox/mobile/Opener",
"dojox/mobile/TransitionEvent",
"dijit/layout/ContentPane"					
],
function(declare,_WidgetBase,dom,domConstruct,ready,on,connect,registry,compat,topic, GanttChart, GanttProjectItem, GanttTaskItem)
{
	declare("ImgWidget", [_WidgetBase], {
		path1:0, 
		w:0,	  
		h:0,
		c:0,
		a:0,
		i:0,
		constructor: function(path,width,height,clas,align,idul) {
			declare.safeMixin(this, path,width,height,clas,align,idul);
			path1=path;
			w=width;
			h=height;
			c=clas;
			a=align;
			i=idul;
		},
		buildRendering: function(){
			this.domNode = domConstruct.create("img", {src:path1,style:{width:w,height:h},"class":c,align:a,"id":idul});
		}
	});
	
	declare("DivWidget", [_WidgetBase],  {
		bg:"", 
		details:"",	 
		cls:"",	
		idul:"",
		constructor: function(param0,param1,param2,param3) {
			declare.safeMixin(this,param0, param1,param2,param3);
			cls=param0;
			bg=param1;
			details=param2;
			idul=param3;
		},
		buildRendering: function(){
			this.domNode = domConstruct.create("div", {id:idul,"class":cls,innerHTML:details,style:{background:bg}});
			//this.domNode = domConstruct.create("div", {class:"line",innerHTML:details,style:{background:bg}});
		}
	});
	initWidgets=function()
	{
		console.log("in init");
		viewApp= new dojox.mobile.View({id:"view2",style:{height:"100%"}});
		backButton= new dojox.mobile.Heading({id:"butonBack",back:"Projects",moveTo:"viewMeniu"});
		buttonKPIs = new dojox.mobile.TabBarButton({id:"kpisB",moveTo:"kpis",label:"KPIs",transition:"slide"});
		buttonProgress = new dojox.mobile.TabBarButton({id:"progressB",moveTo:"progress",label:"Progress",transition:"slide"});
		buttonFlags = new dojox.mobile.TabBarButton({id:"flagsB",moveTo:"flags",label:"Flags",transition:"slide"});
		buttonPrTeam = new dojox.mobile.TabBarButton({id:"prTeamB",moveTo:"prTeam",label:"Project Team",transition:"slide"});
		buttonMap = new dojox.mobile.TabBarButton({id:"mapB",moveTo:"map",label:"Map",transition:"slide"});
		viewkpisn=new dojox.mobile.SwapView({id:"kpis"});	
		paneCs = new dijit.layout.ContentPane({id:"cs",	label: "Customer Satisfaction",	style:{width:"100%","margin-left":"50px"}	});
		paneHs = new dijit.layout.ContentPane({id:"hs",label: "Health &amp; Safety",style:{width:"100%","margin-left":"50px",display:"block"}});
		panePeople = new dijit.layout.ContentPane({id:"People",label: "People",	style:{width:"100%","margin-left":"50px"}});	
		paneOperations = new dijit.layout.ContentPane({id:"Operations",label: "Operations",style:{width:"100%","margin-left":"50px"}});	
		paneEfficiency = new dijit.layout.ContentPane({id:"Efficiency",label: "Efficiency",style:{width:"100%","margin-left":"50px"}});	
		viewProgress=new dojox.mobile.SwapView({id:"progress"});	
		viewFlags=new dojox.mobile.SwapView({id:"flags"});
		viewPrTeam=new dojox.mobile.SwapView({id:"prTeam"});	
		viewPrTeamScroll=new dojox.mobile.ScrollableView({id:"prTeamScroll",style:{height:"100%",width:"100%",overflow:"hidden","text-align":"center"}});
		viewMap=new dojox.mobile.SwapView({id:"map",style:{height:"100%"}});
		
	}	
	writeCharts=function(idPj)
	{
		
		AnyChart.renderingType = anychart.RenderingType.SVG_PREFERRED; //.FLASH_PREFERRED; //
		var chartCs = new AnyChart();
		chartCs.width = 300;
		chartCs.height = 200;
		chartCs.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/1.7prj'+idPj+'sm0.xml');
		chartCs.write("cs");		
		
		var chartHs1 = new AnyChart();
		chartHs1.width = 300;
		chartHs1.height = 200;
		chartHs1.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.5prj'+idPj+'sm0.xml');
		chartHs1.write("hs");		
		var chartHs2 = new AnyChart();
		chartHs2.width = 300;
		chartHs2.height = 200;
		chartHs2.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.7prj'+idPj+'sm0.xml');
		chartHs2.write("hs");		
		var chartHs3 = new AnyChart();
		chartHs3.width = 300;
		chartHs3.height = 200;
		chartHs3.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.6prj'+idPj+'sm0.xml');
		chartHs3.write("hs");		
		
		var chartPeople1 = new AnyChart();
		chartPeople1.width = 300;
		chartPeople1.height = 200;
		chartPeople1.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/3.3prj'+idPj+'sm0.xml');
		chartPeople1.write("People");		
		var chartPeople2 = new AnyChart();
		chartPeople2.width = 300;
		chartPeople2.height = 200;
		chartPeople2.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/3.7prj'+idPj+'sm0.xml');
		chartPeople2.write("People");		
		var chartPeople3= new AnyChart();
		chartPeople3.width = 300;
		chartPeople3.height = 200;
		chartPeople3.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/3.6prj'+idPj+'sm0.xml');
		chartPeople3.write("People");			
		
		var chartOperations1 = new AnyChart();
		chartOperations1.width = 300;
		chartOperations1.height = 200;
		chartOperations1.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.1prj'+idPj+'sm0.xml');
		chartOperations1.write("Operations");		
		var chartOperations2 = new AnyChart();
		chartOperations2.width = 300;
		chartOperations2.height = 200;
		chartOperations2.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.8prj'+idPj+'sm0.xml');
		chartOperations2.write("Operations");		
		var chartOperations3 = new AnyChart();
		chartOperations3.width = 300;
		chartOperations3.height = 200;
		chartOperations3.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/2.9prj'+idPj+'sm0.xml');
		chartOperations3.write("Operations");		
		
		var chartEfficiency1 = new AnyChart();
		chartEfficiency1.width = 300;
		chartEfficiency1.height = 200;
		chartEfficiency1.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/4.4prj'+idPj+'sm0.xml');
		chartEfficiency1.write("Efficiency");		
		var chartEfficiency2 = new AnyChart();
		chartEfficiency2.width = 300;
		chartEfficiency2.height = 200;
		chartEfficiency2.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/materials-usage.xml');
		chartEfficiency2.write("Efficiency");		
		var chartEfficiency3 = new AnyChart();
		chartEfficiency3.width = 300;
		chartEfficiency3.height = 200;
		chartEfficiency3.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/chart/project-cashflow.xml');
		chartEfficiency3.write("Efficiency");
		chartEfficiency1.addEventListener('render', function(){window.scrollBy(0,1);});	
		unsetCharts();
	}; 	
	unsetCharts=function()
	{
		delete chartCs;
		delete chartHs1;
		delete chartHs2;
		delete chartHs3;
		delete chartPeople1;
		delete chartPeople2;
		delete chartPeople3;
		delete chartOperations1;
		delete chartOperations2;
		delete chartOperations3;
		delete chartEfficiency1;
		delete chartEfficiency2;
		delete chartEfficiency3;
	}
	unsetPanes=function()
	{	
		if (paneCs) paneCs.destroy();
		if (paneHs) paneHs.destroy();
		if (panePeople) panePeople.destroy();
		if (paneOperations) paneOperations.destroy();
		if (paneEfficiency) paneEfficiency.destroy();
	}	
	writeFlags=function(idPb)
	{
		unsetFlags();	
		paneFlags = new dijit.layout.ContentPane({id:"FlagsChart",label: "Flags",style:{width:"100%","text-align":"center"}});			
		viewFlags.addChild(paneFlags);	
		var flags = new AnyChart();
		flags.id="id_flag_chart";
		flags.bgColor="white";
		flags.width = 700;
		flags.height = 400;
		flags.addEventListener('render', function(){window.focus();});		
		flags.setXMLFile('http://pillar.pilon.co.uk:82/reports/KPIG/kpiFlagsXml.php?projID='+idPb);
		setTimeout(function(){flags.write("FlagsChart");},100);
		flags.addEventListener('render', function(){window.scrollBy(0,-1);});
	}; 

	unsetFlags=function()
	{
		console.log("unset flag");
		if (paneFlags)
			paneFlags.destroy();
		console.log(" paneFlags unset");
	};
	placeLegend=function()
	{
		Legend=new dojox.mobile.Button({id:"legendBut",label:"Legend",},"legendButton");
		opener=new dojox.mobile.Opener({id:"action",style:{"float":"right"}});		
		Legend.placeAt(backButton);	
		opener.placeAt(Legend);	
		$("#action").append('<div class="legendTxt"><img src="img/bluearrow.png" alt="Required/Target" title="Required/Target"><br><div>Required / Target</div><br><img src="img/current.png" alt="Current Month" title="Current Month" height="80" border="0"><br><div>Current Month</div><br><img src="img/ytd.png" alt="Year To Date Average" title="Year To Date Average" height="80" border="0" width="72"><br><div>YTD Average</div></div>');	
		Legend.on("click",function(){
			console.log("a fost clicait");
			dijit.byId('action').show(this.domNode, ['above-centered','below-centered','after','before'])
		});	
	};
	destroyLegend=function()
	{
		console.log("destroying legend");
		opener.destroy();
		Legend.destroyRecursive();
	}
	init_map=function(currCode,pX, pY)
	{
		console.log("in init map : currCode,pX,pY "+currCode+","+pX+","+pY);
		var myLatlng = new google.maps.LatLng(pX, pY);
		var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(pX, pY),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map=new google.maps.Map(document.getElementById("mapCnt"),mapOptions);	
		//console.log(map);		
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			// title:"titlu "+currCode+" "+pX+" "+pY
			title:"titlu "+currCode
		});	
		map.setCenter(myLatlng);		
		google.maps.event.trigger(map, 'resize');	
	};
	createView2=function(id,currCode,pX,pY,paneContent)
	/*,viewApp,backButton,buttonKPIs,buttonProgress,buttonFlags,buttonPrTeam,
						buttonMap,viewkpisn,paneCs,paneHs,panePeople,paneOperations,paneEfficiency,viewProgress,
						viewFlags,viewPrTeam,viewMap)*/
	{
		console.log("view 2 creation for id="+id+" and: "+currCode+pX+pY);
		// console.log("initializing widgets");
		initWidgets();
		// console.log("widgets done");					
/*		
 var projectDev = new GanttProjectItem({
					id: 1,
					name: "Development Project",
					startDate: new Date(2012, 5, 11)
				});
				
				var taskRequirement = new GanttTaskItem({
					id: 1,
					name: "Requirement",
					startTime: new Date(2012, 5, 11),
					duration: 50,
					percentage: 50,
					taskOwner: "Jack"
				});
				
				var taskAnalysis = new GanttTaskItem({
					id: 2,
					name: "Analysis",
					startTime: new Date(2012, 5, 18),
					duration: 40,
					percentage: 80,
					previousTaskId: "1",
					taskOwner: "Michael"
				});
				var taskDesign = new GanttTaskItem({
					id: 3,
					name: "Design",
					startTime: new Date(2012, 5, 18),
					duration: 60,
					percentage: 80,
					previousTaskId: "1",
					taskOwner: "Jason"
				});
				var taskDetailDesign = new GanttTaskItem({
					id: 4,
					name: "Detail design",
					startTime: new Date(2012, 5, 18),
					duration: 30,
					percentage: 50,
					previousTaskId: "1",
					taskOwner: "Michael"
				});
				var taskDevelopmentDoc = new GanttTaskItem({
					id: 5,
					name: "Development doc",
					startTime: new Date(2012, 5, 20),
					duration: 20,
					percentage: 10,
					previousTaskId: "1",
					taskOwner: "Rock;Jack"
				});
				
				projectDev.addTask(taskRequirement);
				
				projectDev.addTask(taskAnalysis);
				projectDev.addTask(taskDesign);
				projectDev.addTask(taskDetailDesign);
				projectDev.addTask(taskDevelopmentDoc);
				
				var taskSketch = new GanttTaskItem({
					id: 6,
					name: "Sketch",
					startTime: new Date(2012, 6, 1),
					duration: 20,
					percentage: 50,
					previousTaskId: "3",
					taskOwner: "Rock"
				});
				var taskPrototype = new GanttTaskItem({
					id: 7,
					name: "Prototype",
					startTime: new Date(2012, 6, 6),
					duration: 60,
					percentage: 80,
					previousTaskId: "6",
					taskOwner: "Rock"
				});
				var taskImplementation = new GanttTaskItem({
					id: 8,
					name: "Implementation",
					startTime: new Date(2012, 6, 6),
					duration: 30,
					percentage: 80,
					previousTaskId: "6",
					taskOwner: "Jason"
				});
				var taskDetailImplement = new GanttTaskItem({
					id: 9,
					name: "Detail Implement",
					startTime: new Date(2012, 6, 17),
					duration: 120,
					percentage: 50,
					previousTaskId: "7",
					taskOwner: "Jason"
				});
				var taskDeliver = new GanttTaskItem({
					id: 10,
					name: "Deliver",
					startTime: new Date(2012, 6, 18),
					duration: 100,
					percentage: 30,
					previousTaskId: "8",
					taskOwner: "Michael;Jason"
				});
				
				projectDev.addTask(taskSketch);
				projectDev.addTask(taskPrototype);
				projectDev.addTask(taskImplementation);
				projectDev.addTask(taskDetailImplement);
				projectDev.addTask(taskDeliver);
				*/
		viewApp.addChild(backButton);
		var tabBar = new dojox.mobile.TabBar({barType : "segmentedControl",syncWithViews:"true",fixed:"top",style:{left:"24%"}}, "menuButtons");
			tabBar.addChild(buttonKPIs);						
			tabBar.addChild(buttonProgress);														
			tabBar.addChild(buttonFlags);					
			tabBar.addChild(buttonPrTeam);					
			tabBar.addChild(buttonMap);	
			backButton.addChild(tabBar);
			
//View KPIs		
		// Legend.startup();
		// viewkpisn.addChild(Legend);	
		viewApp.addChild(viewkpisn);
			connect.connect(viewkpisn, "onBeforeTransitionIn", null,
				function(moveTo, dir, transition, context, method){
				$("#progressB").removeClass("mblTabBarButtonSelected");	
				$("#flagsB").removeClass("mblTabBarButtonSelected");
				$("#prTeamB").removeClass("mblTabBarButtonSelected");
				$("#mapB").removeClass("mblTabBarButtonSelected");
				placeLegend();	
			});			

		
		var  viewkpis=new dojox.mobile.ScrollableView({style:{height:"1600px",width:"100%",overflow:"hidden"}});
		viewkpisn.addChild(viewkpis);	
		
			var accordionCs = new dojox.mobile.Accordion("csAccordion");
			accordionCs.startup();
			viewkpis.addChild(accordionCs);
			console.log("paneCs:"+paneCs);
			accordionCs.addChild(paneCs);							
			
			var accordionHs = new dojox.mobile.Accordion("hsAccordion");
			accordionHs.startup();		
			viewkpis.addChild(accordionHs);	
			accordionHs.addChild(paneHs);							

			var accordionPeople = new dojox.mobile.Accordion("PeopleAccordion");
			accordionPeople.startup();
			viewkpis.addChild(accordionPeople);
			accordionPeople.addChild(panePeople);							
			
			var accordionOperations = new dojox.mobile.Accordion("OperationsAccordion");
			accordionOperations.startup();
			viewkpis.addChild(accordionOperations);
			accordionOperations.addChild(paneOperations);							
			
			var accordionEfficiency = new dojox.mobile.Accordion("EfficiencyAccordion");
			accordionEfficiency.startup();
			viewkpis.addChild(accordionEfficiency);
			accordionEfficiency.addChild(paneEfficiency);	
				
//view progress
			viewApp.addChild(viewProgress);	
			connect.connect(viewProgress, "onBeforeTransitionIn", null,
				function(moveTo, dir, transition, context, method){
				$("#kpisB").removeClass("mblTabBarButtonSelected");	
				$("#flagsB").removeClass("mblTabBarButtonSelected");
				$("#prTeamB").removeClass("mblTabBarButtonSelected");
				$("#mapB").removeClass("mblTabBarButtonSelected");
				destroyLegend();
			});	
		
//view flags	
			connect.connect(viewFlags, "onBeforeTransitionIn", null,
				function(moveTo, dir, transition, context, method){				
					$("#kpisB").removeClass("mblTabBarButtonSelected");	
					$("#progressB").removeClass("mblTabBarButtonSelected");
					$("#prTeamB").removeClass("mblTabBarButtonSelected");
					$("#mapB").removeClass("mblTabBarButtonSelected");
					destroyLegend();
					console.log("vom scrie flags din click");
					setTimeout(function(){writeFlags(id);},100);
			});	
			viewApp.addChild(viewFlags);		
//view project team	
			viewApp.addChild(viewPrTeam);
					(new DivWidget("teamPhoto","","<img src='http://pillar.pilon.co.uk:82/reports/img/orgChart1/prj"+id+".png'/> ","idImgTeam")).placeAt(viewPrTeamScroll);	
			viewPrTeam.addChild(viewPrTeamScroll);
			connect.connect(viewPrTeam, "onBeforeTransitionIn", null,
				function(moveTo, dir, transition, context, method){
				$("#kpisB").removeClass("mblTabBarButtonSelected");
				$("#progressB").removeClass("mblTabBarButtonSelected");
				$("#flagsB").removeClass("mblTabBarButtonSelected");
				$("#mapB").removeClass("mblTabBarButtonSelected");
				$("#dojox_mobile_ScrollableView_1").css("height","1600px");
				destroyLegend();
				$("#prTeamScroll").css("height","100%");
			});	

				// console.log("prTeamId: "+id);
				
							
			
			
//view map	
			viewApp.addChild(viewMap);	
			connect.connect(viewMap, "onAfterTransitionIn", null,
				function(moveTo, dir, transition, context, method){
				$("#kpisB").removeClass("mblTabBarButtonSelected");
				$("#progressB").removeClass("mblTabBarButtonSelected");
				$("#flagsB").removeClass("mblTabBarButtonSelected");
				$("#prTeamB").removeClass("mblTabBarButtonSelected");
				destroyLegend();
				console.log("apelare init map:currCode,pX,pY: "+currCode+","+pX+","+pY); 
				setTimeout(function(){init_map(currCode,pX,pY);}, 1000);					
			});	
					
			var viewArray=['kpisB','progressB','flagsB','prTeamB','mapB'];
			topicSubscribe=topic.subscribe("/dojox/mobile/viewChanged",function(view) 
			{
				console.log("subscribe:"+view);				
				destroyLegend();
								
				for (var i=0;i<viewArray.length;i++)
				{
					var currentId=viewArray[i];
					$("#"+currentId).removeClass("mblTabBarButtonSelected");
					if (currentId.substr(0,currentId.length-1)==view.id)
					{
						$("#"+view.id+"B").addClass("mblTabBarButtonSelected");
					}
				}
				if (view.id=='kpis')
				{
					placeLegend();	
				}
				if (view.id=='flags')
				{
					console.log("vom scrie flags din swipe");
					setTimeout(function(){writeFlags(id);},100);
				}
				if (view.id=='map')
				{
					init_map(currCode,pX,pY);								
				}
			
			}); 				
		viewApp.placeAt(paneContent);		
		connect.connect(viewApp, "onBeforeTransitionIn", null, function(moveTo, dir, transition, context, method){
			// $("#footer").css("opacity","0");
			// $("#footer").css("z-index","-1");
			$("#content").css("height","100%");
		});			
		viewApp.startup();

		//viewkpisn.startup();
		accordionCs.expand(paneCs,0);
		accordionHs.expand(paneHs,0);
		accordionPeople.expand(panePeople,0);
		accordionOperations.expand(paneOperations,0);
		accordionEfficiency.expand(paneEfficiency,0);
	
		viewProgress.startup();
		viewFlags.startup();
		viewPrTeam.startup();	
		viewMap.startup();													
		//viewMeniu.startup();
		var div=document.createElement("div");
		div.id="mapCnt";
		document.getElementById("map").appendChild(div);
		/*
		var gantDiv=document.createElement("div");
		gantDiv.id="gantt";
		$('#progress').append(gantDiv);
		var ganttChart = new GanttChart({
			readOnly: false,			//optional: gantt chart editable
			//dataFilePath: "gnt.json",	//optional: json data file path for load and save, default is "gantt_default.json"
			//withTaskId: false,		//optional: if true, task id will be on the right of task name, default value is !readOnly.
			//animation: false,			//optional: whether you need animation when changing granularity of time line 
			height: 400,				//optional: chart height in pixel, default is 400px
			width: 1200,				//optional: chart width in pixel, default is 600px
			withResource: false//,			//optional: with the resource chart or not
			//dataFilePath: "gantt.json"
		}, "gantt");
		ganttChart.loadJSONData("gantt.json");
		// console.log("prj id: "+projectDev.id);
		// ganttChart.getProjectItemById("prj1");
		 // console.log(JSON.parse('{"hello":"world"}', true));
		ganttChart.init();
		
		$('#gantt').append(ganttChart);
		// document.getElementById("progress").appendChild(gantt);
*/		
		$("#projPlace").text(currCode);
		
	};
	goToSubMenu = function(id){
		console.log("in goToSubMenu "+id);
		var widget = registry.byId(id);
		// console.log("widget: "+id);
		// console.log("widget: "+widget);
		var opts = {moveTo: "view2", transition: "slide", transitionDir: 1};
		var ev = new dojox.mobile.TransitionEvent(widget.domNode, opts);
		ev.dispatch();
	};
	ready(function(){
//AnyChart.renderingType = anychart.RenderingType.SVG_PREFERRED; //.FLASH_PREFERRED; //	
		var splitter= new dojox.mobile.FixedSplitter({id:"view1", region: "center",orientation:"V",variablePane:"1"});
			var paneHeader= new dojox.mobile.Pane({id:"header"});
			splitter.addChild(paneHeader);							
				// (new ImgWidget("img/logobw.png","","","","")).placeAt(paneHeader);
				// (new ImgWidget("img/keepmoat_alb_mic.jpg","","","","right")).placeAt(paneHeader);
				// (new DivWidget("","","Refurbishment and building specialist","")).placeAt(paneHeader);
				
			var paneContent= new dojox.mobile.Pane({id:"content"});
			paneContent.startup();
			splitter.addChild(paneContent);		
			// var paneFooter= new dojox.mobile.Pane({id:"footer",innerHTML:"<p style='color:white;text-align:center'><marquee>Refurbishment and building specialist</marquee></p>","class":"txtFooter"});
			// splitter.addChild(paneFooter);				
			var viewMeniu= new dojox.mobile.ScrollableView({id:"viewMeniu"});
			
			connect.connect(viewMeniu, "onAfterTransitionIn", null, function(moveTo, dir, transition, context, method){
				// $("#footer").css("opacity","1");
				// $("#footer").css("filter","alpha(opacity=100)");
				// $("#footer").css("z-index","1");
				// console.log("destroying viewApp");
				$("#projPlace").text(" ");
				unsetPanes();
				viewApp.destroyRecursive();
				topicSubscribe.remove();
			});			
			connect.connect(viewMeniu, "onBeforeTransitionIn", null, function(moveTo, dir, transition, context, method){
				$("#projPlace").text(" ");
			});		
			viewMeniu.placeAt(paneContent);
			var grid1=  new dojox.mobile.GridLayout({cols:2, "class":"centerGrid"});
			grid1.placeAt(viewMeniu);		
			// console.log("xml :"+xml);
			var xmldom = dojox.xml.DomParser.parse(xmlPrj);
			//var docNode = xmldom.documentElement;				
			connect.connect(viewMeniu, "onAfterTransitionIn", null, function(moveTo, dir, transition, context, method){
				$(".dijitContentPane").css("height","140px");
			});			
			// var deferred = request(xmldom, {
				// "preventCache": false,
				// "handleAs": "xml"
			// });
			// deferred.then(
			// function(xmldom)
			{
				console.log("The file's content is: " + xmldom);
				//createView();
				var data = $("row", xmldom.documentElement);
				var currCode=" ";
				//console.log("length: " + data.length);
				if(data.length > 0)
				{ 
					for (var i=0;i<data.length;i++)
					{
						
						// console.log("Clientul no "+i, data[i]); 
						// console.log("id "+i, data[i].getAttribute('id')); 
						// console.log("address "+i, data[i].getAttribute('address')); 
						// console.log("lat "+i, data[i].getAttribute('p_x')); 
						// console.log("lon "+i, data[i].getAttribute('p_y')); 
						
						var elemlength = colorArray.length;
						var randomnum = Math.floor(Math.random()*elemlength);
						var randomColor = colorArray[randomnum];		
						var info="";
						var panouId="pane_"+data[i].getAttribute('id');
						var idProject=data[i].getAttribute('id');
							code=data[i].getAttribute('code');
							var address=data[i].getAttribute('address');
							var sDt="Start date: "+data[i].getAttribute('sDt');
							var prop="Opened properties: "+data[i].getAttribute('prop');
							pX=data[i].getAttribute('p_x');
							pY=data[i].getAttribute('p_y');
							info+="<p><b>"+code+"</b>"+"<br>"+address+"<br>"+sDt+"<br>"+prop+"</p>";
							var details=info;
							var panou = new dijit.layout.ContentPane({id:panouId,"code":code,"pX":pX,"pY":pY,"idProject":idProject,"class":"menuItem"});
							  on(panou, "click", function(e,panou){
								id=this.id;
								var widget = registry.byId(id);
								var idProject=this.idProject;
								currId=this.id;
								pX=this.pX;
								pY=this.pY;
								currCode=this.code;
								createView2(idProject,currCode,pX,pY,paneContent);
								/*,viewApp,backButton,buttonKPIs,buttonProgress,
											buttonFlags,buttonPrTeam,buttonMap,viewkpisn,paneCs,paneHs,panePeople,
											paneOperations,paneEfficiency,viewProgress,viewFlags,viewPrTeam,viewMap);
								*/

								connect.connect(viewApp, "onAfterTransitionIn", null, function(moveTo, dir, transition, context, method){
									setTimeout(function(){writeCharts(idProject);},100);
									placeLegend();
									//setTimeout(function(){init_map(currCode,pX,pY);}, 1000);	
									$(".dijitContentPane.mblAccordionPane").css("display","block");
									$(".dijitContentPane.mblAccordionPane").css("height","200px");
								});									
								var opts = {moveTo: "view2", transition: "slide", transitionDir: 1};
								var ev = new dojox.mobile.TransitionEvent(widget.domNode, opts);
								ev.dispatch();
							  });
							var navi=(new DivWidget("line",randomColor,details,"idNavi")).placeAt(panou);
							grid1.addChild(panou);
	
					}	
				}
			}
		splitter.startup();
		splitter.placeAt(document.body);	
		$('#header').append('<div><div style="float:left"><img src="img/keepmoat_alb_mic.jpg" class="" align="" id="ImgWidget_1" widgetid="ImgWidget_1"></div><div id="projPlace" style="float:left;margin-left:27%;position:relative;top:20px;">'+currCode+'</div><div style="float:right"><img src="img/logobw.png" class="" align="right" id="ImgWidget_0" widgetid="ImgWidget_0"></div></div>');						
	});
	
});