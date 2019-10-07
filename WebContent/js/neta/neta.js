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
var jsonInventoryNA = [];
var NASummaryArray = [];
var NASummaryArrayBackup = [];
var oModelEDINASummary;
var avUnits;
var navUnits;
var bUnits;
var savUnits;
var sumavUnits;
var sumnavUnits;
var sumbUnits;
var sumsavUnits;
//var netAService = "http://sapcgwci.seaco.com:8000/sap/opu/odoNaPage.getNap()ata/sap/ZNW_UI5_BWDASH_2_SRV/";
//var netALink = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_UI5_BWDASH_2_SRV/ZPM_M04_YGES_ZPM_M04_Q0001UResults";
sap.ui.model.json.JSONModel.extend("neta", {
	
	createNAPage: function(){
		var oCurrent = this;
		var oLUpdate = new sap.ui.commons.Label("idLNAUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    var updateString = 'Net A Report';
	    sap.ui.getCore().byId("idLNAUpdate").setText(updateString);
		
		var btnRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          tooltip: "Click me to refresh Neta",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getNASummary();
	          }
		}).addStyleClass("submitBtn");
		
		
		
		var btnNetaExport = new sap.m.Image("idExportNeta",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
			press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryNA, "Net A Report","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		/*var btnNetaExport = new sap.m.Button("idExportNeta", {
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: excelImage,
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryNA, "Net A Report","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft"); //marginLeft355*/
		
		if(isMobile.any()){
			btnNetaExport.setVisible(false);
		}
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '5px'});
		
    	var obtnNAViewAll = new sap.m.Button("idbtnNAViewAll",{
            text : "View All",
            //width : "61px",
            //icon: "images/view_all.png",
            type:sap.m.ButtonType.Unstyled,
            visible:true,
            press:function(){
						/*this.setVisible(false);
						var NATbl = sap.ui.getCore().byId("idTableNASummary");
						
						if(NASummaryArray.length < 100){
							NATbl.setVisibleRowCount(NASummaryArray.length);
							NATbl.setNavigationMode(sap.ui.table.NavigationMode.None);
					   }else{
						   NATbl.setVisibleRowCount(100);
						   NATbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
					   }*/
            	
          		var bus = sap.ui.getCore().getEventBus();
          	  	bus.publish("nav", "to", {
                id : "napage"
        	  	});
          	  	
        		/*var oNaPage = new napage();
        		if(NASummaryArray.length != 0)
        			{
        		oNaPage.getNap(NASummaryArray, jsonInventoryNA);
        			}
        		else if(NASummaryArrayBackup.length != 0)
        			{
            	oNaPage.getNap(NASummaryArrayBackup, jsonInventoryNA);
        			}*/          	  	
    			var oNaPage = new napage();
    			oNaPage.getNapNew();
            }
         }).addStyleClass("toolbarBtn marginTop10");
    	
		var buttonNetaFlex = new sap.m.FlexBox({
			items: [
                       btnNetaExport,
                       lblSpace,
                       obtnNAViewAll
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		var oFilterText = new sap.ui.commons.Label("idLFilter", {
			text : "",
			//width : "150px"
		}).addStyleClass("marginTop10 font13Red"); 
//		if (!!sap.ui.Device.browser.webkit && !document.width) {
//		    jQuery.sap.require("sap.ui.core.ScrollBar");
//		     var fnOrg = sap.ui.core.ScrollBar.prototype.onAfterRendering;
//		     sap.ui.core.ScrollBar.prototype.onAfterRendering = function() {
//		         document.width = window.outerWidth;
//		         fnOrg.apply(this, arguments);
//		         document.width = undefined;
//		     };
//		}
		
		// Table
    	var oTableNASummary = new sap.ui.table.Table("idTableNASummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None, 
            width:"80%",
   		 	visibleRowCount: 6,
   		 	fixedRowCount: 1,
   		 	filter : [ function(oEvent) {
   		 		//oCurrent.setVisibility(oEvent);
			}, this ],
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	var labCou = new sap.ui.commons.Label("idLabCoun", {text: "Country"});
    	var counCol = new sap.ui.table.Column("idColCoun",{
			 //width: "15.82%",
      		 label: labCou,
      		 template: new sap.ui.commons.TextView().bindProperty("text", "Country").bindProperty("helpId","Country").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "Country",
             filterProperty: "Country",
    		 });
    	
    	// Table Columns
    	oTableNASummary.addColumn(counCol);
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			 //width: "15.82%",
     		 label: new sap.ui.commons.Label({text: "Port"}),
     		template: new sap.ui.commons.TextView().bindProperty("text", "City").bindProperty("helpId","City").addStyleClass("wraptext"),
     		resizable:false,
            sortProperty: "City",
            filterProperty: "City",
   		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Unit Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Material").bindProperty("helpId","Material").addStyleClass("wraptext"),
    		 resizable:false,
           sortProperty: "Material",
           filterProperty: "Material",
  		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Avlb").bindProperty("helpId","Avlb").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
		//	 width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "New AVLB", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Newavlb").bindProperty("helpId","Newavlb").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Newavlb",
         //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
		//	 width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Auth for Repair", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Aurepa").bindProperty("helpId","Aurepa").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Booked", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Book").bindProperty("helpId","Book").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "HOLD", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Hold").bindProperty("helpId","Hold").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
 		 label: new sap.ui.commons.Label({text: "Awaiting", textAlign : sap.ui.core.TextAlign.End}),
 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Aeap").bindProperty("helpId","Aeap").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Material",
        //filterProperty: "Material",
		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			// width: "12.68%",
  		 label: new sap.ui.commons.Label({text: "Total Stock", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ttlstock").bindProperty("helpId","Ttlstock").addStyleClass("wraptext"),
  		 resizable:false,
         //sortProperty: "Material",
         //filterProperty: "Material",
		 }));
    	
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
			 //width: "12.68%",
 		 label: new sap.ui.commons.Label({text: "Net AVLB", textAlign : sap.ui.core.TextAlign.End}),
 		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Netavlb").bindProperty("helpId","Netavlb").addStyleClass("wraptext"),
 		 resizable:false,
        //sortProperty: "Material",
        //filterProperty: "Material",
		 }));
    	
    	/*
    	oTableNASummary.addColumn(new sap.ui.table.Column({
      		 width: "12.68%",
       		 label: new sap.ui.commons.Label({text: "AVLB", textAlign : sap.ui.core.TextAlign.End}),
       		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
     			 path: "Avlb",
     			 type: new sap.ui.model.type.Integer({
                  //groupingEnabled: false,
                  //groupingSeparator: ","
              })}
     		 ),
     		 resizable:false,
              sortProperty: "Avlb",
              //filterProperty: "Name",
     		 }));
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
      		 width: "13.43%",
       		 label: new sap.ui.commons.Label({text: "New AVLB", textAlign : sap.ui.core.TextAlign.End}),
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
   		 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Booked", textAlign : sap.ui.core.TextAlign.End}),
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableNASummary.addColumn(new sap.ui.table.Column({
   		 width: "12.68%",
    		 label: new sap.ui.commons.Label({text: "Net AVLB", textAlign : sap.ui.core.TextAlign.End}),
    		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Netavlb",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               groupingSeparator: ","
           })}
  		 ),
  		 //resizable:false,
           sortProperty: "Netavlb",
           //filterProperty: "Name",
  		 }));
    	*/		 
			 
		/*var oUTLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUTLayout");
   	 
		  // Online Form Starts
		     var oUTForm = new sap.ui.layout.form.Form("idUTForm",{
		             layout: oUTLayout,
		             formContainers: [		                     
		                     new sap.ui.layout.form.FormContainer("idUTFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idUTElem1",{
														fields: [oLUpdate]		
													}),
													new sap.ui.layout.form.FormElement("idUTElem2",{
															fields: [buttonFlex]		
														}),
													new sap.ui.layout.form.FormElement("idUTElem3",{
														fields: [oTableNASummary]
													}),
													]
		                     })                    
		             ]
		     });	
				
			return oUTForm; */

    	
		var repFlex = new sap.m.FlexBox({
			items: [
                       oLUpdate,
                       buttonNetaFlex,
                       oFilterText,
                       oTableNASummary,
                       //obtnNAViewAll
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("marginTop10");
		
		oCurrent.getNASummary();
		
		return repFlex;
		
	},
	
	getNASummary: function(){
	busyDialog.open();
		var oCurrent = this;
		oModel = new sap.ui.model.odata.ODataModel(netAService, true);
		OData.request({ 
		      requestUri: netALink,
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
		    //busyDialog.open();
			if(data.results.length == 0){
				if(NASummaryArrayBackup.length == 0){
		    		 //busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Result Found. Check data in bw Query.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    		
					var loadSecond = new utilreppage();
					loadSecond.getUTSummary();
		    	}
				else{
					
				    var updateString = 'Net A Report as on ' + Timest + ' GMT';
				    sap.ui.getCore().byId("idLNAUpdate").setText(updateString);
				    
		    		oModelEDINASummary = new sap.ui.model.json.JSONModel();
		    		oModelEDINASummary.setData({modelData: NASummaryArrayBackup});
		        	sap.ui.getCore().byId("idTableNASummary").setModel(oModelEDINASummary);
		        	sap.ui.getCore().byId("idTableNASummary").bindRows("/modelData");
		        	sap.ui.getCore().byId("idTableNASummary").setVisibleRowCount(6);
		        	sap.ui.getCore().byId("idbtnNAViewAll").setVisible(true);
		        	//busyDialog.close();
		        	
					var loadSecond = new utilreppage();
					loadSecond.getUTSummary();
		        }
				}
		    	else{
				
					NASummaryArray = [];
					jsonInventoryNA = [];
					sumavUnits = 0;
	    			sumnavUnits = 0;
	    			sumbUnits = 0;
	    			sumsavUnits = 0;
				    
		    		for(var i=0; i<data.results.length; i++){
					    
		    			if (i == 0){   	
		    				Timest = data.results[i].Timest;
			    		    var updateStringLNA = 'Net A Report as on ' + Timest + ' GMT';
			    		    sap.ui.getCore().byId("idLNAUpdate").setText(updateStringLNA);
			    		}
		    			
//					    avUnits = Number(data.results[i].Avlb); 
//					    navUnits = Number(data.results[i].Newavlb);
//					    bUnits = Number(data.results[i].Book);
//					    savUnits = Number(data.results[i].Netavlb);
//					    
//		    			sumavUnits = avUnits + sumavUnits;
//		    			sumnavUnits = navUnits + sumnavUnits;
//		    			sumbUnits = bUnits + sumbUnits;
//		    			sumsavUnits = savUnits + sumsavUnits;
		    			
				    	NASummaryArray.push({
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
					    	
					    	jsonInventoryNA.push({
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
		    		
//			    	NASummaryArray.unshift({
//	    				"Country": "TOTAL",
//	    				"City": "",
//	    				"Material": "",
//	    				"Avlb": sumavUnits,
//	    				"Newavlb": sumnavUnits,
//	    				"Book": sumbUnits,
//	    				"Netavlb": sumsavUnits
//		    			});	
			    	
			    	NASummaryArrayBackup = NASummaryArray;
		    		oModelEDINASummary = new sap.ui.model.json.JSONModel();
		    		oModelEDINASummary.setData({modelData: NASummaryArray});
		        	sap.ui.getCore().byId("idTableNASummary").setModel(oModelEDINASummary);
		        	sap.ui.getCore().byId("idTableNASummary").bindRows("/modelData");
              
		        	sap.ui.getCore().byId("idTableNASummary").setVisibleRowCount(6);
		        	sap.ui.getCore().byId("idbtnNAViewAll").setVisible(true);
		        	}
				
				
			var oTableNASummary = sap.ui.getCore().byId("idTableNASummary");
			
				//oTableNASummary._oVSb.attachScroll(function() {  
				//	oCurrent.colorRows();  
	            //});
				
				//busyDialog.close();
				
				var loadSecond = new utilreppage();
				loadSecond.getUTSummary();
	              
			},
			function(err){
		    	 //busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from BW Query");
		    });
		
	},
	
	navigToClass : function(eqclass){
		
  		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "utilclass"
	  	});
  	  	
		var oUTC = new utilclasspage();
		oUTC.getUTC(eqclass);
		

		
	},
	
	colorRows : function(){
		var oTableNASummary = sap.ui.getCore().byId("idTableNASummary");
        var rowCount = oTableNASummary.getVisibleRowCount(); //number of visible rows  
        var rowStart = oTableNASummary.getFirstVisibleRow(); //starting Row index  
        var currentRowContext;
        
        for (var i = 0; i < rowCount; i++) {  
          currentRowContext = oTableNASummary.getContextByIndex(rowStart + i); //content   
            var cellValue = oTableNASummary.getModel().getProperty("Country", currentRowContext); // Get Amount  
            if (cellValue != 'TOTAL') {
            	$("#idTableNASummary-rows-row0").css("background-color", "");
                oTableNASummary.getRows()[i].$().removeClass("totalColor");  
            }
            else{
            	$("#idTableNASummary-rows-row0").css("background-color", "");
            	oTableNASummary.getRows()[i].$().removeClass("totalColor"); 
            	oTableNASummary.getRows()[i].$().addClass("totalColor");
            }
        } 
	},
	
	setVisibility : function(event){
		var count = 0;
		
		if(event.mParameters.value == ""){
			sap.ui.getCore().byId("idTableNASummary").setFixedRowCount(1);
		}
		else{
			sap.ui.getCore().byId("idTableNASummary").setFixedRowCount(0);
		}
		var column = event.mParameters.column.mProperties.filterProperty;
		var oTable = sap.ui.getCore().byId("idTableNASummary");
		var data = oTable.getModel().getData().modelData;
		for(var i=0; i<data.length; i++){
		if(data[i].City == event.mParameters.value)
			count = count + 1;
		}
		
		if(count > 6 || count == 1)
		sap.ui.getCore().byId("idTableNASummary").setVisibleRowCount(6);
		else
		sap.ui.getCore().byId("idTableNASummary").setVisibleRowCount(count);
		}		
});