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
var jsonInventoryTRD = [];
var TRDArray = [];
var TRDArrayBackup = [];
var ouUnitsTRD;
var sumTRD;

sap.ui.model.json.JSONModel.extend("topretudepopage", {
	
	createTRDPage: function(){
		var oCurrent = this;
		
		var oTRDUpdate = new sap.ui.commons.Label("idTRDUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnTRDRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getTRDSummary();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnTRDExport = new sap.m.Button("idExportTRD",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTRD, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnTRDExport = new sap.m.Image("idExportTRD",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTRD, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnTRDExport.setVisible(false);
		}
		
		var buttonTRDFlex = new sap.m.FlexBox({
			items: [
                       btnTRDRefresh,
                       btnTRDExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		// Table
    	var oTableTRDSummary = new sap.ui.table.Table("idTableTRDSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"80%",
            height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
   	 //Table Columns
    	oTableTRDSummary.addColumn(new sap.ui.table.Column({
			 width: "65%",
    		 label: new sap.ui.commons.Label({text: "City"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Customer",
           //filterProperty: "Customer",
  		 }));
    	
    	oTableTRDSummary.addColumn(new sap.ui.table.Column({
     		 width: "35%",
       		 label: new sap.ui.commons.Label({text: "No. of Units", textAlign : sap.ui.core.TextAlign.End}),
        		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ouquan").bindProperty("helpId","Ouquan").addStyleClass("wraptext"),
     		 resizable:false,
              //sortProperty: "Name",
              //filterProperty: "Name",
     		 }));
     	
      	oTableTRDSummary.addColumn(new sap.ui.table.Column({
    		 width: "35%",
      		 label: new sap.ui.commons.Label({text: "CEU", textAlign : sap.ui.core.TextAlign.End}),
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ceu").bindProperty("helpId","Ceu").addStyleClass("wraptext"),
      		 resizable:false,
    		 }));
      	
    	
    	/* oTableTRDSummary.addColumn(new sap.ui.table.Column({
    		 width: "35%",
      		 label: new sap.ui.commons.Label({text: "No. of Units", textAlign : sap.ui.core.TextAlign.End}),
      		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
   			 path: "Ouquan",
   			 type: new sap.ui.model.type.Integer({
   			  groupingEnabled: false,
              //groupingSeparator: ","
            })}
   		 ),
    		 resizable:false,
             //sortProperty: "Name",
             //filterProperty: "Name",
    		 }));
    	
    	oTableTRDSummary.addColumn(new sap.ui.table.Column({
   		 width: "35%",
     		 label: new sap.ui.commons.Label({text: "CEU", textAlign : sap.ui.core.TextAlign.End}),
     		template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
  			 path: "Ceu",
  			 type: new sap.ui.model.type.Integer({
  			  groupingEnabled: false,
             //groupingSeparator: ","
           })}
  		 ),
   		 resizable:false,
            //sortProperty: "Name",
            //filterProperty: "Name",
   		 })); */
    	
		var oTRDFilterText = new sap.ui.commons.Label("idTRDFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repTRDFlex = new sap.m.FlexBox("idRepTRDFlex", {
			items: [	oTRDUpdate,			        
                       buttonTRDFlex,
                       oTRDFilterText,
                       oTableTRDSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getTRDSummary();
		return repTRDFlex;
			 
	},
	
	getTRDSummary: function(){
	//busyDialog.open();
		
		oModel = new sap.ui.model.odata.ODataModel(netATRD, true);

		OData.request({ 
		      requestUri: netATRDService,
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
		    	sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n75% Completed');
		    	//busyDialog.open();
				if(data.results.length == 0){
					if(TRDArrayBackup.length == 0){
			    		 //busyDialog.close();
			    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Redeliveries by Customer",
		                        sap.ui.commons.MessageBox.Icon.WARNING,
		                        "Warning",
		                        [sap.ui.commons.MessageBox.Action.OK],
		                        sap.ui.commons.MessageBox.Action.OK);
			    		
			    				sap.ui.getCore().byId("idRepTRDFlex").destroy();
			    				
								var loadSeventh = new outstandingBookings();
								loadSeventh.getOBKSummary();
			    	}
					else{
			    		var oModelTRDBackup = new sap.ui.model.json.JSONModel();
			    		oModelTRDBackup.setData({modelData: TRDArrayBackup});
			        	sap.ui.getCore().byId("idTableTRDSummary").setModel(oModelTRDBackup);
			        	sap.ui.getCore().byId("idTableTRDSummary").bindRows("/modelData");
			        	sap.ui.getCore().byId("idTableTRDSummary").setVisibleRowCount(11);
			        	
						var loadSeventh = new outstandingBookings();
						loadSeventh.getOBKSummary();
					}
					}
			    	else{
					
						TRDArray = [];
						jsonInventoryTRD = [];
		    			
			    		for(var i=0; i<data.results.length; i++){

			    			if (i == 0){   	
			    				Timest = data.results[i].Timest;
				    		    var updateStringTRD = 'Top 10 Redeliveries by City as on ' + Timest + ' GMT';
				    		    sap.ui.getCore().byId("idTRDUpdate").setText(updateStringTRD);
				    			}
						    
			    			
			    			TRDArray.push({
			    				"Customer": data.results[i].Customer,
			    				"Ouquan": data.results[i].Ouquan,
			    				"Ceu": data.results[i].Ceu,
				    			});	
						    	
						    	jsonInventoryTRD.push({
				    				"Customer": data.results[i].Customer,
				    				"No. of Units": data.results[i].Ouquan,
				    				"CEU": data.results[i].Ceu,
				    			});	
						    	
			    		}
				    	
				    	TRDArrayBackup = TRDArray;
			    		var oModelTRD = new sap.ui.model.json.JSONModel();
			    		oModelTRD.setData({modelData: TRDArray});
			        	sap.ui.getCore().byId("idTableTRDSummary").setModel(oModelTRD);
			        	sap.ui.getCore().byId("idTableTRDSummary").bindRows("/modelData");
			        	sap.ui.getCore().byId("idTableTRDSummary").setVisibleRowCount(11);
			        	
						var loadSeventh = new outstandingBookings();
						loadSeventh.getOBKSummary();
						
			        	}
						
			    	
				//busyDialog.close();
		},
		function(err){
	    	 //busyDialog.close();
	    	 //errorfromServer(err);
	    	 //alert("Error in data read from BW Query");
			sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n75% Completed');
	    });
	
		
	}
		
});