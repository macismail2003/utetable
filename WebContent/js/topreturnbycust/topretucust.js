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
var jsonInventoryTRC = [];
var TRCArray = [];
var TRCArrayBackup = [];
sap.ui.model.json.JSONModel.extend("topretucustpage", {
	
	createTRCPage: function(){
		var oCurrent = this;
	    
		var oTRCUpdate = new sap.ui.commons.Label("idTRCUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 

	    
		var btnTRCRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getTRCSummary();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnTRCExport = new sap.m.Button("idExportTRC",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTRC, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnTRCExport = new sap.m.Image("idExportTRC",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTRC, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		
		if(isMobile.any()){
			btnTRCExport.setVisible(false);
		}
		
		var buttonTRCFlex = new sap.m.FlexBox({
			items: [
                       btnTRCRefresh,
                       btnTRCExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		// Table
    	var oTableTRCSummary = new sap.ui.table.Table("idTableTRCSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"80%",
            height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	oTableTRCSummary.addColumn(new sap.ui.table.Column({
			 width: "75%",
    		 label: new sap.ui.commons.Label({text: "Customer"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "A5ZDEPOCIT",
           //filterProperty: "A5ZDEPOCIT",
  		 }));
    	
    	
    	oTableTRCSummary.addColumn(new sap.ui.table.Column({
      		 width: "25%",
        		 label: new sap.ui.commons.Label({text: "No. of Units", textAlign : sap.ui.core.TextAlign.End}),
         		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ouquan").bindProperty("helpId","Ouquan").addStyleClass("wraptext"),
      		 resizable:false,
               //sortProperty: "Name",
               //filterProperty: "Name",
      		 }));
      	
       	oTableTRCSummary.addColumn(new sap.ui.table.Column({
     		 width: "25%",
       		 label: new sap.ui.commons.Label({text: "CEU", textAlign : sap.ui.core.TextAlign.End}),
       		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ceu").bindProperty("helpId","Ceu").addStyleClass("wraptext"),
       		 resizable:false,
     		 }));
       	
    	
    	
    	/*oTableTRCSummary.addColumn(new sap.ui.table.Column({
    		 width: "25%",
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
    	
    	oTableTRCSummary.addColumn(new sap.ui.table.Column({
   		 width: "25%",
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
   		 }));*/
    	
		var oTRCFilterText = new sap.ui.commons.Label("idTRCFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repTRCFlex = new sap.m.FlexBox("idRepTRCFlex", {
			items: [   
			           oTRCUpdate,
                       buttonTRCFlex,
                       oTRCFilterText,
                       oTableTRCSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getTRCSummary();
		return repTRCFlex;
			 
	},
	
	getTRCSummary: function(){
		//busyDialog.open();
		
		oModel = new sap.ui.model.odata.ODataModel(netATRC, true);

		OData.request({ 
		      requestUri: netATRCService,
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
		    	sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n50% Completed');
				if(data.results.length == 0){
					if(TRCArrayBackup.length == 0){
			    		 //busyDialog.close();
			    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Redeliveries by Customer",
		                        sap.ui.commons.MessageBox.Icon.WARNING,
		                        "Warning",
		                        [sap.ui.commons.MessageBox.Action.OK],
		                        sap.ui.commons.MessageBox.Action.OK);
			    		
			    				sap.ui.getCore().byId("idRepTRCFlex").destroy();
			    				
								var loadSixth = new topretudepopage();
								loadSixth.getTRDSummary();
			    	}
					else{
			    		var oModelTRCBackup = new sap.ui.model.json.JSONModel();
			    		oModelTRCBackup.setData({modelData: TRCArrayBackup});
			        	sap.ui.getCore().byId("idTableTRCSummary").setModel(oModelTRCBackup);
			        	sap.ui.getCore().byId("idTableTRCSummary").bindRows("/modelData");
			        	sap.ui.getCore().byId("idTableTRCSummary").setVisibleRowCount(11);
			        	
						var loadSixth = new topretudepopage();
						loadSixth.getTRDSummary();
					}
					}
			    	else{
					
						TRCArray = [];
						jsonInventoryTRC = [];
		    			
			    		for(var i=0; i<data.results.length; i++){

			    			if (i == 0){   	
			    				Timest = data.results[i].Timest;
				    		    var updateStringTRC = 'Top 10 Redeliveries by Customers as on ' + Timest + ' GMT';
				    		    sap.ui.getCore().byId("idTRCUpdate").setText(updateStringTRC);
				    			}
						    
			    			
			    			TRCArray.push({
			    				"Customer": data.results[i].Customer,
			    				"Ouquan": data.results[i].Ouquan,
			    				"Ceu": data.results[i].Ceu,
				    			});	
						    	
						    	jsonInventoryTRC.push({
				    				"Customer": data.results[i].Customer,
				    				"No. of Units": data.results[i].Ouquan,
				    				"CEU": data.results[i].Ceu,
				    			});	
						    	
			    		}
				    	
				    	TRCArrayBackup = TRCArray;
			    		var oModelTRC = new sap.ui.model.json.JSONModel();
			    		oModelTRC.setData({modelData: TRCArray});
			        	sap.ui.getCore().byId("idTableTRCSummary").setModel(oModelTRC);
			        	sap.ui.getCore().byId("idTableTRCSummary").bindRows("/modelData");
			        	sap.ui.getCore().byId("idTableTRCSummary").setVisibleRowCount(11);
			        	
						var loadSixth = new topretudepopage();
						loadSixth.getTRDSummary();
						
			        	}
						
			    	
				//busyDialog.close();
		},
		function(err){
	    	 //busyDialog.close();
	    	 //errorfromServer(err);
	    	 //alert("Error in data read from BW Query");
			sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n50% Completed');
	    });
	
		
	}
		
});