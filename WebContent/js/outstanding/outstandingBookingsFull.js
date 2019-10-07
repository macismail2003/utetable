/******** NP *******/	

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 25.03.2015
*$*$ Reference   : RTS1097
*$*$ TranspOBKFull   : CGWK900884
*$*$ Tag         : MAC25032015
*$*$ Purpose     : UI5: Utilization RepOBKFull
*$*$---------------------------------------------------------------------

*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsonInventoryOBKFull = [];
var OBKFullArray = [];
var OBKFullArrayBackup = [];
sap.ui.model.json.JSONModel.extend("outstandingBookingsFull", {
	
	createOBKFullPage: function(){
		var oCurrent = this;
	    
		var oBackOBK = new sap.m.Link("idBackOBK", {text: " < Back",
	      	  width:"13%",
	      	  wrapping:true,
	      	  press: function(){
	              var viewId = "UTILREP1";
	              var bus = sap.ui.getCore().getEventBus();
	              bus.publish("nav", "to", {
	                           id : viewId
	              });
	              
	     	  }});
		
		var oOBKFullUpdate = new sap.ui.commons.Label("idOBKFullUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnOBKFullRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getOBKFullSummary();
	          }
		}).addStyleClass("submitBtn");
		
		btnOBKFullRefresh.setTooltip("TBD Welcome");
		
		/*var btnOBKFullExport = new sap.m.Button("idExportOBKFull",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryOBKFull, "Outstanding Bookings","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnOBKFullExport = new sap.m.Image("idExportOBKFull",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryOBKFull, "Outstanding Bookings","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		
		if(isMobile.any()){
			btnOBKFullExport.setVisible(false);
		}
		
		var OBKFullViewAll = new sap.m.Button("idOBKFullViewAll",{
            text : "View All",
            icon: "images/view_all.png",
            //width : "61px",
            visible: false,
            type:sap.m.ButtonType.Unstyled,
            press:function(){
				
            }
         }).addStyleClass("toolbarBtn marginLeft");
		
		var buttonOBKFullFlex = new sap.m.FlexBox({
			items: [   btnOBKFullRefresh,
                       btnOBKFullExport,
                       OBKFullViewAll
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		// Table
    	var oTableOBKFullSummary = new sap.ui.table.Table("idTableOBKFullSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"100%",
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "110px",
    		 label: new sap.ui.commons.Label({text: "Booking Number"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "docNumber"),
    		resizable:false,
          // sOBKFullProperty: "A5ZDEPOCIT",
          // filterProperty: "A5ZDEPOCIT",
  		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "BP Number"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "bpartner").bindProperty("helpId","bpartner").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		label: new sap.ui.commons.Label({text: "Customer"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));

    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",  
   		 label: new sap.ui.commons.Label({text: "Lease No."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "docNum").bindProperty("helpId","docNum").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "75px",
   		 label: new sap.ui.commons.Label({text: "Depot"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZcrmDepi").bindProperty("helpId","ZcrmDepi").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Depot Name"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Depot").bindProperty("helpId","Depot").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "City"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zcity").bindProperty("helpId","Zcity").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Country"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "country").bindProperty("helpId","country").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Region"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZplanGrp").bindProperty("helpId","ZplanGrp").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "50px",
   		 label: new sap.ui.commons.Label({text: "UTC"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "materialZflprodl1").bindProperty("helpId","materialZflprodl1").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Mat. No."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "material").bindProperty("helpId","material").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Description"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Mattype").bindProperty("helpId","Mattype").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Start Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "hcDatefrm").bindProperty("helpId","hcDatefrm").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "End Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "hcDateto").bindProperty("helpId","hcDateto").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "125px",
   		 label: new sap.ui.commons.Label({text: "Creator"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "createdby").bindProperty("helpId","createdby").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "125px",
   		 label: new sap.ui.commons.Label({text: "Status"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zusstath").bindProperty("helpId","Zusstath").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "50px",
   		 label: new sap.ui.commons.Label({text: "New Cont."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Zcrmnewu").bindProperty("helpId","Zcrmnewu").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Comments"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ZcomDepo").bindProperty("helpId","ZcomDepo").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Ext. Refer"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "crmextrefo").bindProperty("helpId","crmextrefo").addStyleClass("wraptext"),
   		resizable:false,
         // sOBKFullProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Quantity", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Quantity").bindProperty("helpId","Quantity").addStyleClass("wraptext"),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Gated Out", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Gatedout").bindProperty("helpId","Gatedout").addStyleClass("wraptext"),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Bookings", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Oreturns").bindProperty("helpId","Oreturns").addStyleClass("wraptext"),
    		 resizable:false,
             //sOBKFullProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	
    	
    	
    	/*oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Quantity", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Quantity",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               //groupingSeparator: ","
           })}
  		 ),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
     		 label: new sap.ui.commons.Label({text: "Gated Out", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Gatedout",
  			 type: new sap.ui.model.type.Integer({
               groupingEnabled: false,
               //groupingSeparator: ","
           })}
  		 ),
   		 resizable:false,
            //sOBKFullProperty: "Name",
            //filterProperty: "Name",
   		 }));
    	
    	oTableOBKFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Bookings", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Oreturns",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: false,
                //groupingSeparator: ","
            })}
   		 ),
    		 resizable:false,
             //sOBKFullProperty: "Name",
             //filterProperty: "Name",
    		 })); */
    	
		var oOBKFullFilterText = new sap.ui.commons.Label("idOBKFullFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repOBKFullFlex = new sap.m.FlexBox("idRepOBKFullFlex", {
			items: [  oBackOBK, 
			           oOBKFullUpdate,
                       buttonOBKFullFlex,
                       oOBKFullFilterText,
                       oTableOBKFullSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		oCurrent.getOBKFullSummary();
		return repOBKFullFlex;
	
			 
	},
	
	getOBKFullSummary: function(){
	sap.ui.getCore().byId("busy").setText('Loading Query...');
	busyDialog.open();
	oModel = new sap.ui.model.odata.ODataModel(netAOBK, true);

	OData.request({ 
	      requestUri: netAOBKFull,
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
			if(OBKFullArrayBackup.length == 0){
	    		 //busyDialog.close();
	    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Bookings",
                        sap.ui.commons.MessageBox.Icon.WARNING,
                        "Warning",
                        [sap.ui.commons.MessageBox.Action.OK],
                        sap.ui.commons.MessageBox.Action.OK);
	    		
	    				sap.ui.getCore().byId("idRepOBKFullFlex").destroy();
	    	}
			else{
	    		var oModelOBKFullBackup = new sap.ui.model.json.JSONModel();
	    		oModelOBKFullBackup.setData({modelData: OBKFullArrayBackup});
	        	sap.ui.getCore().byId("idTableOBKFullSummary").setModel(oModelOBKFullBackup);
	        	sap.ui.getCore().byId("idTableOBKFullSummary").bindRows("/modelData");
	        	var vArrayLength = OBKFullArray.length;
	        	if(vArrayLength < 50){
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setVisibleRowCount(50);
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
			}
			}
	    	else{
			
				OBKFullArray = [];
				jsonInventoryOBKFull = [];
    			
	    		for(var i=0; i<data.results.length; i++){

	    			if (i == 0){   	
	    				Timest = data.results[i].Timest;
		    		    var updateStringOBKFull = 'Outstanding Bookings as on ' + Timest + ' GMT';
		    		    sap.ui.getCore().byId("idOBKFullUpdate").setText(updateStringOBKFull);
		    			}
				    
	    			
	    			OBKFullArray.push({
	    				"docNumber" :data.results[i].docNumber ,
	    				"bpartner" :data.results[i].bpartner ,
	    				"Customer" :data.results[i].Customer ,
	    				"docNum" :data.results[i].docNum ,
	    				"ZcrmDepi" :data.results[i].ZcrmDepi ,
	    				"Depot" :data.results[i].Depot ,
	    				"Zcity" :data.results[i].Zcity ,
	    				"country" :data.results[i].country ,
	    				"ZplanGrp" :data.results[i].ZplanGrp ,
	    				"materialZflprodl1" :data.results[i].materialZflprodl1 ,
	    				"material" :data.results[i].material ,
	    				"Mattype" :data.results[i].Mattype ,
	    				"hcDatefrm" :data.results[i].hcDatefrm ,
	    				"hcDateto" :data.results[i].hcDateto ,
	    				"createdby" :data.results[i].createdby ,
	    				"Zusstath" :data.results[i].Zusstath ,
	    				"Zcrmnewu" :data.results[i].Zcrmnewu ,
	    				"ZcomDepo" :data.results[i].ZcomDepo ,
	    				"crmextrefo" :data.results[i].crmextrefo ,
	    				"Quantity" :data.results[i].Quantity ,
	    				"Gatedout" :data.results[i].Gatedout ,
	    				"Oreturns" :data.results[i].Oreturns
		    			});	
				    	
				    	jsonInventoryOBKFull.push({
		    				"Booking Number" :data.results[i].docNumber ,
		    				"BP Number" :data.results[i].bpartner ,
		    				"Customer" :data.results[i].Customer ,
		    				"Lease Number" :data.results[i].docNum ,
		    				"Depot" :data.results[i].ZcrmDepi ,
		    				"Depot Name" :data.results[i].Depot ,
		    				"City" :data.results[i].Zcity ,
		    				"Country" :data.results[i].country ,
		    				"Region" :data.results[i].ZplanGrp ,
		    				"UTC" :data.results[i].materialZflprodl1 ,
		    				"Mat. No." :data.results[i].material ,
		    				"Description" :data.results[i].Mattype ,
		    				"Start Date" :data.results[i].hcDatefrm ,
		    				"End Date" :data.results[i].hcDateto ,
		    				"Creator" :data.results[i].createdby ,
		    				"Status" :data.results[i].Zusstath ,
		    				"New Cont." :data.results[i].Zcrmnewu ,
		    				"Comments" :data.results[i].ZcomDepo ,
		    				"Ext. Refer" :data.results[i].crmextrefo ,
		    				"Quantity" :data.results[i].Quantity ,
		    				"Gated Out" :data.results[i].Gatedout ,
		    				"Outstandin Bookings" :data.results[i].Oreturns
		    			});	
				    	
	    		}
		    	
		    	OBKFullArrayBackup = OBKFullArray;
	    		var oModelOBKFull123 = new sap.ui.model.json.JSONModel();
	    		oModelOBKFull123.setData({modelData: OBKFullArray});
	        	sap.ui.getCore().byId("idTableOBKFullSummary").setModel(oModelOBKFull123);
	        	sap.ui.getCore().byId("idTableOBKFullSummary").bindRows("/modelData");
	        	var vArrayLength = OBKFullArray.length;
	        	if(vArrayLength < 50){
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setVisibleRowCount(50);
	        		sap.ui.getCore().byId("idTableOBKFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	        	
	        	}
				
	    	
		busyDialog.close();
		},
		function(err){
	    	 busyDialog.close();
	    	 //errorfromServer(err);
	    });
	
		
	}
		
});