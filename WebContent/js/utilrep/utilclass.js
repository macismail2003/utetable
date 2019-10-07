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
var jsonInventory = [];
var UTClassArray = [];
sap.ui.model.json.JSONModel.extend("utilclasspage", {
	
	createUTCPage: function(){
		var oCurrent = this;
		
        var oBackutc = new sap.m.Link("idBackutc", {text: " < Back",
      	  width:"13%",
      	  wrapping:true,
      	  press: function(){
              var viewId = "UTILREP1";
              var bus = sap.ui.getCore().getEventBus();
              bus.publish("nav", "to", {
                           id : viewId
              });
              
     	  }});
        
        
		var oLCUpdate = new sap.ui.commons.Label("idLCUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 

		
		var btnRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          type:sap.m.ButtonType.Unstyled,
	          visible: false,
	          press:function(){
	        	 oCurrent.getUTC();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnNacExport = new sap.m.Button("idExportUcl",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn");*/
		
		var btnNacExport = new sap.m.Image("idExportUcl",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnNacExport.setVisible(false);
		}
		
		var buttonNacFlex = new sap.m.FlexBox({
			items: [
                       btnRefresh,
                       btnNacExport
                     ],
                     direction: "Row"
                   }).addStyleClass("margin10");
		// Table
    	var oTableUTC = new sap.ui.table.Table("idTableUTC",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            width: "95%",
            height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTableUTC.addColumn(new sap.ui.table.Column({
			 width: "30%",
      		 label: new sap.ui.commons.Label({text: "Category"}),
      		template: new sap.ui.commons.TextView().bindProperty("text", "Eqcat"),
    		 resizable:false,
             sortProperty: "Eqcat",
             filterProperty: "Eqcat",
    		 }));
    	
    	oTableUTC.addColumn(new sap.ui.table.Column({
			 width: "30%",
     		 label: new sap.ui.commons.Label({text: "Material Type"}),
     		template: new sap.ui.commons.TextView().bindProperty("text", "Matnr"),
   		 resizable:false,
            sortProperty: "Matnr",
            filterProperty: "Matnr",
   		 }));
    	
    	oTableUTC.addColumn(new sap.ui.table.Column({
    		 width: "20%",
      		 label: new sap.ui.commons.Label({text: "On Lease", textAlign : sap.ui.core.TextAlign.End}),
    		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
    			 path: "Noles",
    			 type: new sap.ui.model.type.Integer({
                 groupingEnabled: true,
                 groupingSeparator: ","
             })}
    		 ),
    		 resizable:false,
             sortProperty: "Noles",
             filterProperty: "Noles",
    		 }));
    	
    	oTableUTC.addColumn(new sap.ui.table.Column({
    		 width: "20%",
     		 label: new sap.ui.commons.Label({text: "Total", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Notot",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: true,
                groupingSeparator: ","
            })}
   		 ),
   		 resizable:false,
            sortProperty: "Notot",
            filterProperty: "Notot",
   		 }));
    	
    	oTableUTC.addColumn(new sap.ui.table.Column({
   		 width: "20%",
    		 label: new sap.ui.commons.Label({text: "Utilization %", textAlign : sap.ui.core.TextAlign.End}),
  		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Utiliz"),
  		 resizable:false,
         sortProperty: "Utiliz",
         filterProperty: "Utiliz",
  		 }));
			 
			 
		var oUTCLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUTCLayout");
   	 
		  // Online Form Starts
		     var oUTCForm = new sap.ui.layout.form.Form("idUTCForm",{
		             layout: oUTCLayout,
		             formContainers: [		                     
		                     new sap.ui.layout.form.FormContainer("idUTCFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idUTCElem4",{
														fields: [oBackutc]		
													}),
													new sap.ui.layout.form.FormElement("idUTCElem1",{
														fields: [oLCUpdate]		
													}),
													new sap.ui.layout.form.FormElement("idUTCElem2",{
															fields: [buttonNacFlex]		
														}),
													new sap.ui.layout.form.FormElement("idUTCElem3",{
														fields: [oTableUTC]
													}),
													]
		                     })                    
		             ]
		     });
				
			return oUTCForm;
			 
	},
	
	getUTC: function(eqclass, comp){
		sap.ui.getCore().byId("busy").setText('Loading Query...');
		busyDialog.open();
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUTE, true);
		var urlUTClass = serviceUTE + "/ZUTIL_SUMS?$filter=Reqtype eq ' ' and Class eq '" + eqclass + "' and Comp eq '" + comp + "'";
		
		OData.request({ 
		      requestUri: urlUTClass,
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
			if(data.results.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No relevant data found",
                          sap.ui.commons.MessageBox.Icon.WARNING,
                          "Warning",
                          [sap.ui.commons.MessageBox.Action.OK],
                          sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else{
				
					UTClassArray = [];
					jsonInventory = [];
		    		for(var i=0; i<data.results.length; i++){
		    			
					    
					    	UTClassArray.push({
				    				"Eqcat": data.results[i].Eqcat,
				    				"Matnr": data.results[i].Matnr,
				    				"Noles": data.results[i].Noles,
				    				"Notot": data.results[i].Notot,
				    				"Utiliz": data.results[i].Utiliz
				    			});	
					    	
					    	jsonInventory.push({
			    				"Equipment Category": data.results[i].Eqcat,
			    				"Material Number": data.results[i].Matnr,
			    				"On Lease": data.results[i].Noles,
			    				"Total": data.results[i].Notot,
			    				"Utilization %": data.results[i].Utiliz
			    			});	
					    	
		    		}
		    		

		    		
		    		
		    		var oModelEDIUTSummary = new sap.ui.model.json.JSONModel();
		    		oModelEDIUTSummary.setData({modelData: UTClassArray});
		        	sap.ui.getCore().byId("idTableUTC").setModel(oModelEDIUTSummary);
		        	sap.ui.getCore().byId("idTableUTC").bindRows("/modelData");
		        	
		        	sap.ui.getCore().byId("idTableUTC").setVisibleRowCount(UTClassArray.length);	
		        	
					}
			busyDialog.close();
			},
			function(err){
		    	 busyDialog.close();
		    	 //errorfromServer(err);
		    	 //alert("Error in data read from SAP");
		    });
	
		
	}
		
});