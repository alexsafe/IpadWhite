	  //<![CDATA[
	  AnyChart.renderingType = anychart.RenderingType.SVG_PREFERRED; //.FLASH_PREFERRED; //
	  var chart = new AnyChart();
	  //chart.width = 700;
	  //chart.height = 280;
	  chart.width = 250;
	  chart.height = 150;
	  chart.setXMLFile('../chart/1.7prj156sm0.xml');
	  chart.write();
	  //]]>
alert(chart);