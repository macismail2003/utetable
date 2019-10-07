/******** NP *******/	

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 25.03.2015
*$*$ Reference   : RTS1097
*$*$ Transport   : CGWK900884
*$*$ Tag         : MAC25032015
*$*$ Purpose     : UI5: Utilization Report
*$*$---------------------------------------------------------------------

*/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var jsonInventoryNaPage = [];
var NAPSummaryArray = [];
var NAPSummaryArrayBackup = [];
var oModelEDINAPSummary;

sap.ui.model.json.JSONModel.extend("napage", {
	
	createNAPage: function(){
		var oCurrent = this;
		
        var oBackNap = new sap.m.Link("idBackNap", {text: " < Back",
      	  width:"13%",
      	  wrapping:true,
      	  press: function(){
      		 /* var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "back"); */
      		  
              var viewId = "UTILREP1";
              var bus = sap.ui.getCore().getEventBus();
              bus.publish("nav", "to", {
                           id : viewId
              });
              
     	  }});
		
        var oLNAPUpdate = new sap.ui.commons.Label("idLNAPUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
        
		var btnNapRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          type:sap.m.ButtonType.Unstyled,
	          visible: false,
	          press:function(){
	        	 //oCurrent.getUTC();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnNapExport = new sap.m.Button("idExportNap", {
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryNaPage, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn");*/
		
		var btnNapExport = new sap.m.Image("idExportNap",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
			press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryNaPage, "Net A Report","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnNapExport.setVisible(false);
		}
		
		var buttonNapFlex = new sap.m.FlexBox({
			items: [   oLNAPUpdate,
                       btnNapExport
                     ],
                     direction: "Column"
                   }).addStyleClass("margin10");
		
		var oNapFilterText = new sap.ui.commons.Label("idNapFilter", {
			text : "Note: click on the header to sort or filter",
			//width : "150px"
		}).addStyleClass("marginTop10 font13Red"); 
		
		// Table
    	var oTableNAPSummary = new sap.ui.table.Table("idTableNAPSummary",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"90%",
            height: "35px",
            fixedRowCount: 1,
   		 	filter : [ function(oEvent) {
   		 		oCurrent.setVisibility(oEvent);
			}, this ],
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			 width: "15.82%",
      		 label: new sap.ui.commons.Label({text: "Country"}),
      		 template: new sap.ui.commons.TextView().bindProperty("text", "Country").bindProperty("helpId","Country").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "Country",
             filterProperty: "Country",
    		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			 width: "15.82%",
     		 label: new sap.ui.commons.Label({text: "Port"}),
     		template: new sap.ui.commons.TextView().bindProperty("text", "City").bindProperty("helpId","City").addStyleClass("wraptext"),
     		resizable:false,
            sortProperty: "City",
            filterProperty: "City",
   		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Material").bindProperty("helpId","Material").addStyleClass("wraptext"),
    		 resizable:false,
           sortProperty: "Material",
           filterProperty: "Material",
  		 }));
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Avlb").bindProperty("helpId","Avlb").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
		//	 width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "New AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Newavlb").bindProperty("helpId","Newavlb").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Newavlb",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
		//	 width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Auth for Repair", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Aurepa").bindProperty("helpId","Aurepa").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Booked", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Book").bindProperty("helpId","Book").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "HOLD", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Hold").bindProperty("helpId","Hold").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
 		 label: new sap.ui.commons.Label({text: "Awaiting", textAlign : sap.ui.core.TextAlign.End}),
 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Aeap").bindProperty("helpId","Aeap").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Material",
        //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Total Stock", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ttlstock").bindProperty("helpId","Ttlstock").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
			 //width: "12.68%",
 		 label: new sap.ui.commons.Label({text: "Net AVLB", textAlign : sap.ui.core.TextAlign.End}),
 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Netavlb").bindProperty("helpId","Netavlb").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Material",
        //filterProperty: "Material",
		 }));
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	/*oTableNAPSummary.addColumn(new sap.ui.table.Column({
      		 width: "12.68%",
       		 label: new sap.ui.commons.Label({text: "AVLB Units", textAlign : sap.ui.core.TextAlign.End}),
       		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
     			 path: "Avlb",
     			 type: new sap.ui.model.type.Integer({
                  groupingEnabled: false,
                  groupingSeparator: ","
              })}
     		 ),
     		 resizable:false,
              //sortProperty: "Avlb",
              //filterProperty: "Name",
     		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
      		 width: "13.43%",
       		 label: new sap.ui.commons.Label({text: "New AVLB Units", textAlign : sap.ui.core.TextAlign.End}),
       		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
     			 path: "Newavlb",
     			 type: new sap.ui.model.type.Integer({
                  groupingEnabled: false,
                  groupingSeparator: ","
              })}
     		 ),
     		 resizable:false,
              //sortProperty: "Newavlb",
              //filterProperty: "Name",
     		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
     		 width: "12.68%",
      		 label: new sap.ui.commons.Label({text: "AUTH for Repair", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
    			 path: "Aurepa",
    			 type: new sap.ui.model.type.Integer({
                 groupingEnabled: false,
                 groupingSeparator: ","
             })}
    		 ),
    		 resizable:false,
             //sortProperty: "Aurepa",
             //filterProperty: "Name",
    		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
   		 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Booked Units", textAlign : sap.ui.core.TextAlign.End}),
    		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Book",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               groupingSeparator: ","
           })}
  		 ),
  		 resizable:false,
           //sortProperty: "Book",
           //filterProperty: "Name",
  		 }));
    	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
     		 width: "12.68%",
      		 label: new sap.ui.commons.Label({text: "HOLD", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
    			 path: "Hold",
    			 type: new sap.ui.model.type.Integer({
                 groupingEnabled: false,
                 groupingSeparator: ","
             })}
    		 ),
    		 resizable:false,
             //sortProperty: "Book",
             //filterProperty: "Name",
    		 }));
   	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
	     		 width: "12.68%",
	      		 label: new sap.ui.commons.Label({text: "Total Stock", textAlign : sap.ui.core.TextAlign.End}),
	      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
	    			 path: "Ttlstock",
	    			 type: new sap.ui.model.type.Integer({
	                 groupingEnabled: false,
	                 groupingSeparator: ","
	             })}
	    		 ),
	    		 resizable:false,
	             //sortProperty: "Book",
	             //filterProperty: "Name",
	    		 }));
	   	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
	     		 width: "12.68%",
	      		 label: new sap.ui.commons.Label({text: "Awaiting", textAlign : sap.ui.core.TextAlign.End}),
	      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
	    			 path: "Aeap",
	    			 type: new sap.ui.model.type.Integer({
	                 groupingEnabled: false,
	                 groupingSeparator: ","
	             })}
	    		 ),
	    		 resizable:false,
	             //sortProperty: "Book",
	             //filterProperty: "Name",
	    		 }));
   	
    	oTableNAPSummary.addColumn(new sap.ui.table.Column({
   		 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Net AVLB Units", textAlign : sap.ui.core.TextAlign.End}),
    		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Netavlb",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               groupingSeparator: ","
           })}
  		 ),
  		 resizable:false,
           //sortProperty: "Netavlb",
           //filterProperty: "Name",
  		 }));*/
			 
			 
		var oNapLayout = new sap.ui.layout.form.ResponsiveGridLayout("idNapLayout");
   	 
		  // Online Form Starts
		     var oNapForm = new sap.ui.layout.form.Form("idNapForm",{
		             layout: oNapLayout,
		             formContainers: [		                     
		                     new sap.ui.layout.form.FormContainer("idNapFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idNapElem1",{
														fields: [oBackNap]		
													}),
													new sap.ui.layout.form.FormElement("idNapElem2",{
															fields: [buttonNapFlex]		
														}), 
													new sap.ui.layout.form.FormElement("idNapElem3",{
															fields: [oNapFilterText]
													}),
													new sap.ui.layout.form.FormElement("idNapElem4",{
															fields: [oTableNAPSummary]
													}),
													]
		                     })                    
		             ]
		     });
				
			return oNapForm;
			 
	},
	
	getNap: function(NapClassArray, excelData){
		sap.ui.getCore().byId("busy").setText('Loading Query...');
		busyDialog.open();
		jsonInventoryNaPage = [];
		jsonInventoryNaPage = excelData;		

		
		
		var oModelEDINapSummary = new sap.ui.model.json.JSONModel();
		oModelEDINapSummary.setData({modelData: NapClassArray});
    	sap.ui.getCore().byId("idTableNAPSummary").setModel(oModelEDINapSummary);
    	sap.ui.getCore().byId("idTableNAPSummary").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(50);
    	sap.ui.getCore().byId("idTableNAPSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	
    	busyDialog.close();
	},
	
	getNapNew: function(){
		sap.ui.getCore().byId("busy").setText('Loading Query...');
		busyDialog.open();
		var oCurrent = this;
		oModel = new sap.ui.model.odata.ODataModel(netAServiceFull, true);
    	
		busyDialog.open();
		OData.request({ 
		      requestUri: netALinkFull,
		      method: "GET", 
		      dataType: 'json',
		      username: "GW_ADMIN",
		      password: "Seaco@123",
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){	
		    	busyDialog.open();
			if(data.results.length == 0){
				if(NAPSummaryArrayBackup.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Result Found. Check data in bw Query.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    	}
				else{
					
				    
		    		oModelEDINAPSummary = new sap.ui.model.json.JSONModel();
		    		oModelEDINAPSummary.setData({modelData: NAPSummaryArrayBackup});
		        	sap.ui.getCore().byId("idTableNAPSummary").setModel(oModelEDINAPSummary);
		        	sap.ui.getCore().byId("idTableNAPSummary").bindRows("/modelData");
		        	
		        	sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(50);
		        	sap.ui.getCore().byId("idTableNAPSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	busyDialog.close();
		        }
				}
		    	else{
				
					NAPSummaryArray = [];
					jsonInventoryNaPage = [];
				    
		    		for(var i=0; i<data.results.length; i++){
					    
		    			if (i == 0){   	
		    				Timest = data.results[i].Timest;
			    		    var updateStringLNA = 'Net A Report as on ' + Timest + ' GMT';
			    		    sap.ui.getCore().byId("idLNAPUpdate").setText(updateStringLNA);
			    		}
		    			
				    	NAPSummaryArray.push({
		    				"Country": data.results[i].Country,
		    				"City": data.results[i].City,
		    				"Material": data.results[i].Material,
		    				"Avlb": data.results[i].Avlb,
		    				"Newavlb": data.results[i].Newavlb,
		    				"Aurepa": data.results[i].Aurepa,
		    				"Book": data.results[i].Book,
		    				"Hold": data.results[i].Hold,
		    				"Ttlstock": data.results[i].Ttlstock,
		    				"Aeap": data.results[i].Aeap,
		    				"Netavlb": data.results[i].Netavlb
			    			});	
					    	
				    		jsonInventoryNaPage.push({
			    				"Country": data.results[i].Country,
			    				"Port": data.results[i].City,
			    				"Material Type": data.results[i].Material,
			    				"AVLB Units": data.results[i].Avlb,
			    				"New AVLB Units": data.results[i].Newavlb,
			    				"Authorized for Repair": data.results[i].Aurepa,
			    				"Booked Units": data.results[i].Book,
			    				"Hold": data.results[i].Hold,
			    				"Total Stock": data.results[i].Ttlstock,
			    				"Awaiting Units": data.results[i].Aeap,
			    				"Net AVLB Units": data.results[i].Netavlb
			    			});	
					    	
		    		}
		    		
			    	
			    	NAPSummaryArrayBackup = NAPSummaryArray;
		    		oModelEDINAPSummary = new sap.ui.model.json.JSONModel();
		    		oModelEDINAPSummary.setData({modelData: NAPSummaryArray});
		        	sap.ui.getCore().byId("idTableNAPSummary").setModel(oModelEDINAPSummary);
		        	sap.ui.getCore().byId("idTableNAPSummary").bindRows("/modelData");
		        	
		        	sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(50);
		        	sap.ui.getCore().byId("idTableNAPSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	
		        	}
				
				
			//var oTableNAPSummarySummary = sap.ui.getCore().byId("idTableNAPSummary");
			
//				oTableNAPSummarySummary._oVSb.attachScroll(function() {  
//					oCurrent.colorRows();  
//	            });
				
				//oTableNAPSummarySummary.onAfterRendering(function() {  
				//	oCurrent.colorRows();  
	            //});
				
				//oCurrent.colorRows();
				busyDialog.close();
			},
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 alert("Error in reading full data...");
		    });
	},
	
	colorRows : function(){
		var oTableNAPSummary = sap.ui.getCore().byId("idTableNAPSummary");
        var rowCount = oTableNAPSummary.getVisibleRowCount(); //number of visible rows  
        var rowStart = oTableNAPSummary.getFirstVisibleRow(); //starting Row index  
        var currentRowContext;
        
        for (var i = 0; i < rowCount; i++) {  
          currentRowContext = oTableNAPSummary.getContextByIndex(rowStart + i); //content   
            var cellValue = oTableNAPSummary.getModel().getProperty("Country", currentRowContext); // Get Amount  
            if (cellValue != 'Total') {
            	$("#idTableNAPSummary-rows-row0").css("background-color", "");
                oTableNAPSummary.getRows()[i].$().removeClass("totalColor");  
            }
            else{
            	$("#idTableNAPSummary-rows-row0").css("background-color", "");
            	oTableNAPSummary.getRows()[i].$().removeClass("totalColor"); 
            	oTableNAPSummary.getRows()[i].$().addClass("totalColor");
            }
        } 
	},
	
	setVisibility : function(event){
		var count = 0;
		
		if(event.mParameters.value == ""){
			sap.ui.getCore().byId("idTableNAPSummary").setFixedRowCount(1);
		}
		else{
			sap.ui.getCore().byId("idTableNAPSummary").setFixedRowCount(0);
		}
		var column = event.mParameters.column.mProperties.filterProperty;
		var oTable = sap.ui.getCore().byId("idTableNAPSummary");
		var data = oTable.getModel().getData().modelData;
		if(column == 'City'){
		for(var i=0; i<data.length; i++){
		if(data[i].City == event.mParameters.value)
		count = count + 1;
		}
		}
		else if(column == 'Country'){
		for(var i=0; i<data.length; i++){
		if(data[i].Country == event.mParameters.value)
		count = count + 1;
		}
		}
		else if(column == 'Material'){
			for(var i=0; i<data.length; i++){
			if(data[i].Material == event.mParameters.value)
			count = count + 1;
		}
		}
		
		if(count == 1 || count == 0 || count > 50)
		{
		sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(data.length);
    	sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(50);
    	sap.ui.getCore().byId("idTableNAPSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
		else
		sap.ui.getCore().byId("idTableNAPSummary").setVisibleRowCount(count);
		}		
		
});