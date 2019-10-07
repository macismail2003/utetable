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
var jsonInventoryORTFull = [];
var ORTFullArray = [];
var ORTFullArrayBackup = [];
sap.ui.model.json.JSONModel.extend("outstandingReturnsFull", {
	
	createORTFullPage: function(){
		var oCurrent = this;
	    
		var oBackORT = new sap.m.Link("idBackORT", {text: " < Back",
	      	  width:"13%",
	      	  wrapping:true,
	      	  press: function(){
	              var viewId = "UTILREP1";
	              var bus = sap.ui.getCore().getEventBus();
	              bus.publish("nav", "to", {
	                           id : viewId
	              });
	              
	     	  }});
		
		var oORTFullUpdate = new sap.ui.commons.Label("idORTFullUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnORTFullRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getORTFullSummary();
	          }
		}).addStyleClass("submitBtn");
		
		btnORTFullRefresh.setTooltip("TBD Welcome"
		);		
		/*var btnORTFullExport = new sap.m.Button("idExportORTFull",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryORTFull, "Oustanding Returns","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnORTFullExport = new sap.m.Image("idExportORTFull",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryORTFull, "Oustanding Returns","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnORTFullExport.setVisible(false);
		}
		
		var ORTFullViewAll = new sap.m.Button("idORTFullViewAll",{
            text : "View All",
            //width : "61px",
            icon: "images/view_all.png",
            type:sap.m.ButtonType.Unstyled,
            visible:false,
            press:function(){
            	
            	var bus = sap.ui.getCore().getEventBus();
          	  	bus.publish("nav", "to", {
                id : "ortall"
        	  	});
            }
         }).addStyleClass("toolbarBtn marginLeft");
		
		var buttonORTFullFlex = new sap.m.FlexBox({
			items: [   btnORTFullRefresh,
                       btnORTFullExport,
                       ORTFullViewAll
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		
		// Table
    	var oTableORTFullSummary = new sap.ui.table.Table("idTableORTFullSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"100%",
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
			 width: "100px",
    		 label: new sap.ui.commons.Label({text: "Lease Number"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "Lnumber").bindProperty("helpId","Lnumber").addStyleClass("wraptext"),
    		resizable:false,
          // sortProperty: "A5ZDEPOCIT",
          // filterProperty: "A5ZDEPOCIT",
  		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Lease Type"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Ltype").bindProperty("helpId","Ltype").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "BP Number"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Bpartner").bindProperty("helpId","Bpartner").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Customer"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Return Auth"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Ranumber").bindProperty("helpId","Ranumber").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Internal Ref No."}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Irefnumber").bindProperty("helpId","Irefnumber").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "125px",
   		 label: new sap.ui.commons.Label({text: "Creator"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Createdby").bindProperty("helpId","Createdby").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Start Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "StartDt").bindProperty("helpId","StartDt").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Expiry Date"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDt").bindProperty("helpId","ExpiryDt").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "City"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "City").bindProperty("helpId","City").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "80px",
   		 label: new sap.ui.commons.Label({text: "Region"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Region").bindProperty("helpId","Region").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "70px",
   		 label: new sap.ui.commons.Label({text: "Depot"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Depot").bindProperty("helpId","Depot").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "250px",
   		 label: new sap.ui.commons.Label({text: "Depot Name"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Dname").bindProperty("helpId","Dname").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "75px",
   		 label: new sap.ui.commons.Label({text: "Category"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Category").bindProperty("helpId","Category").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "75px",
   		 label: new sap.ui.commons.Label({text: "Mat. Type"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Mtype").bindProperty("helpId","Mtype").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "200px",
   		 label: new sap.ui.commons.Label({text: "Mat. Description"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Mname").bindProperty("helpId","Mname").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
   		 label: new sap.ui.commons.Label({text: "Serial Number"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Sernum").bindProperty("helpId","Sernum").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "200px",
   		 label: new sap.ui.commons.Label({text: "Comments"}),
   		template: new sap.ui.commons.TextView().bindProperty("text", "Comments").bindProperty("helpId","Comments").addStyleClass("wraptext"),
   		resizable:false,
         // sortProperty: "A5ZDEPOCIT",
         // filterProperty: "A5ZDEPOCIT",
 		 }));
    	
    	oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Returns", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Oreturns").bindProperty("helpId","Oreturns").addStyleClass("wraptext"),
    		 resizable:false,
             //sortProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	
    	
    	/*oTableORTFullSummary.addColumn(new sap.ui.table.Column({
    		width: "100px",
      		 label: new sap.ui.commons.Label({text: "Oustanding Returns", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Oreturns",
   			 type: new sap.ui.model.type.Integer({
                groupingEnabled: false,
                //groupingSeparator: ","
            })}
   		 ),
    		 resizable:false,
             //sortProperty: "Name",
             //filterProperty: "Name",
    		 }));*/
    	
    	
   	 
    	
		var oORTFullFilterText = new sap.ui.commons.Label("idORTFullFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repORTFullFlex = new sap.m.FlexBox("idRepORTFullFlex", {
			items: [   oBackORT,
			           oORTFullUpdate,
                       buttonORTFullFlex,
                       oORTFullFilterText,
                       oTableORTFullSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		oCurrent.getORTFullSummary();
		return repORTFullFlex;
	
			 
	},
	
	getORTFullSummary: function(){
	sap.ui.getCore().byId("busy").setText('Loading Query...');
	busyDialog.open();
	oModel = new sap.ui.model.odata.ODataModel(netAORT, true);

	OData.request({ 
	      requestUri: netAORTFull,
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
			if(ORTFullArrayBackup.length == 0){
	    		 //busyDialog.close();
	    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Returns",
                        sap.ui.commons.MessageBox.Icon.WARNING,
                        "Warning",
                        [sap.ui.commons.MessageBox.Action.OK],
                        sap.ui.commons.MessageBox.Action.OK);
	    		
	    				sap.ui.getCore().byId("idRepORTFullFlex").destroy();
	    	}
			else{
	    		var oModelORTFullBackup = new sap.ui.model.json.JSONModel();
	    		oModelORTFullBackup.setData({modelData: ORTFullArrayBackup});
	        	sap.ui.getCore().byId("idTableORTFullSummary").setModel(oModelORTFullBackup);
	        	sap.ui.getCore().byId("idTableORTFullSummary").bindRows("/modelData");
	        	var vArrayLength = ORTFullArray.length;
	        	if(vArrayLength < 50){
	        		sap.ui.getCore().byId("idTableORTFullSummary").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTableORTFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTableORTFullSummary").setVisibleRowCount(50);
	        		sap.ui.getCore().byId("idTableORTFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
			}
			}
	    	else{
			
				ORTFullArray = [];
				jsonInventoryORTFull = [];
    			
	    		for(var i=0; i<data.results.length; i++){

	    			if (i == 0){   	
	    				Timest = data.results[i].Timest;
		    		    var updateStringORTFull = 'Outstanding Returns as on ' + Timest + ' GMT';
		    		    sap.ui.getCore().byId("idORTFullUpdate").setText(updateStringORTFull);
		    			}
				    
	    			
	    			ORTFullArray.push({
	    				"Lnumber" :data.results[i].Lnumber,
	    				"Ltype" :data.results[i].Ltype,
	    				"Bpartner" :data.results[i].Bpartner,
	    				"Customer" :data.results[i].Customer,
	    				"Ranumber" :data.results[i].Ranumber,
	    				"Irefnumber" :data.results[i].Irefnumber,
	    				"Createdby" :data.results[i].Createdby,
	    				"StartDt" :data.results[i].StartDt,
	    				"ExpiryDt" :data.results[i].ExpiryDt,
	    				"City" :data.results[i].City,
	    				"Region" :data.results[i].Region,
	    				"Depot" :data.results[i].Depot,
	    				"Dname" :data.results[i].Dname,
	    				"Category" :data.results[i].Category,
	    				"Mtype" :data.results[i].Mtype,
	    				"Mname" :data.results[i].Mname,
	    				"Sernum" :data.results[i].Sernum,
	    				"Comments" :data.results[i].Comments,
	    				"Oreturns" :data.results[i].Oreturns,
	    			});
				    	
				    	jsonInventoryORTFull.push({
				    		"Lease Number" :data.results[i].Lnumber,
				    		"Lease Type" :data.results[i].Ltype,
				    		"BP Number" :data.results[i].Bpartner,
				    		"Customer" :data.results[i].Customer,
				    		"Return Auth No." :data.results[i].Ranumber,
				    		"Internal Ref No." :data.results[i].Irefnumber,
				    		"Creator" :data.results[i].Createdby,
				    		"Start Date" :data.results[i].StartDt,
				    		"Expiry Date" :data.results[i].ExpiryDt,
				    		"City" :data.results[i].City,
				    		"Region" :data.results[i].Region,
				    		"Depot" :data.results[i].Depot,
				    		"Depot Name" :data.results[i].Dname,
				    		"Category" :data.results[i].Category,
				    		"Mat. Type" :data.results[i].Mtype,
				    		"Mat. Description" :data.results[i].Mname,
				    		"Serial Number" :data.results[i].Sernum,
				    		"Comments" :data.results[i].Comments,
				    		"Outstanding Ret." :data.results[i].Oreturns,
		    			});	
				    	
	    		}
		    	
		    	ORTFullArrayBackup = ORTFullArray;
	    		var oModelORTFull = new sap.ui.model.json.JSONModel();
	    		oModelORTFull.setData({modelData: ORTFullArray});
	        	sap.ui.getCore().byId("idTableORTFullSummary").setModel(oModelORTFull);
	        	sap.ui.getCore().byId("idTableORTFullSummary").bindRows("/modelData");
	        	var vArrayLength = ORTFullArray.length;
	        	if(vArrayLength < 50){
	        		sap.ui.getCore().byId("idTableORTFullSummary").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTableORTFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTableORTFullSummary").setVisibleRowCount(50);
	        		sap.ui.getCore().byId("idTableORTFullSummary").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
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