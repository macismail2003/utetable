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
var jsonInventoryTBD = [];
var TBDArray = [];
var TBDArrayBackup = [];
var ouUnitsTBD;
var sumTBD;

sap.ui.model.json.JSONModel.extend("topbookdepopage", {
	
	createTBDPage: function(){
		var oCurrent = this;
		
		var oTBDUpdate = new sap.ui.commons.Label("idTBDUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnTBDRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getTBDSummary();
	          }
		}).addStyleClass("submitBtn");
		
		/*var btnTBDExport = new sap.m.Button("idExportTBD",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTBD, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnTBDExport = new sap.m.Image("idExportTBD",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTBD, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		
		if(isMobile.any()){
			btnTBDExport.setVisible(false);
		}
		
		var buttonTBDFlex = new sap.m.FlexBox({
			items: [
                       btnTBDRefresh,
                       btnTBDExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		// Table
    	var oTableTBDSummary = new sap.ui.table.Table("idTableTBDSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"80%",
            height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
   	 //Table Columns
    	oTableTBDSummary.addColumn(new sap.ui.table.Column({
			 width: "65%",
    		 label: new sap.ui.commons.Label({text: "City"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
    		resizable:false,
           //sortProperty: "Customer",
           //filterProperty: "Customer",
  		 }));
    	
    	
    	
    	oTableTBDSummary.addColumn(new sap.ui.table.Column({
      		 width: "35%",
        		 label: new sap.ui.commons.Label({text: "No. of Units", textAlign : sap.ui.core.TextAlign.End}),
         		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ouquan").bindProperty("helpId","Ouquan").addStyleClass("wraptext"),
      		 resizable:false,
               //sortProperty: "Name",
               //filterProperty: "Name",
      		 }));
      	
       	oTableTBDSummary.addColumn(new sap.ui.table.Column({
     		 width: "35%",
       		 label: new sap.ui.commons.Label({text: "CEU", textAlign : sap.ui.core.TextAlign.End}),
       		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ceu").bindProperty("helpId","Ceu").addStyleClass("wraptext"),
       		 resizable:false,
     		 }));
       	
    	
    	/*oTableTBDSummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableTBDSummary.addColumn(new sap.ui.table.Column({
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
   		 }));*/
    	
		var oTBDFilterText = new sap.ui.commons.Label("idTBDFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repTBDFlex = new sap.m.FlexBox("idRepTBDFlex",{
			items: [	oTBDUpdate,			        
                       buttonTBDFlex,
                       oTBDFilterText,
                       oTableTBDSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getTBDSummary();
		return repTBDFlex;
			 
	},
	
	getTBDSummary: function(){
	//busyDialog.open();
	
	oModel = new sap.ui.model.odata.ODataModel(netATBD, true);

	OData.request({ 
	      requestUri: netATBDService,
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
	    	sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n38% Completed');
	    	//busyDialog.open();
			if(data.results.length == 0){
				if(TBDArrayBackup.length == 0){
		    		 //busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Bookings by City",
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK],
	                        sap.ui.commons.MessageBox.Action.OK);
		    		
		    				sap.ui.getCore().byId("idRepTBDFlex").destroy();
		    				
							var loadFifth = new topretucustpage();
							loadFifth.getTRCSummary();
		    	}
				else{
		    		var oModelTBDBackup = new sap.ui.model.json.JSONModel();
		    		oModelTBDBackup.setData({modelData: TBDArrayBackup});
		        	sap.ui.getCore().byId("idTableTBDSummary").setModel(oModelTBDBackup);
		        	sap.ui.getCore().byId("idTableTBDSummary").bindRows("/modelData");
		        	sap.ui.getCore().byId("idTableTBDSummary").setVisibleRowCount(11);
		        	
					var loadFifth = new topretucustpage();
					loadFifth.getTRCSummary();
				}
				}
		    	else{
				
					TBDArray = [];
					jsonInventoryTBD = [];
	    			
		    		for(var i=0; i<data.results.length; i++){

		    			if (i == 0){   	
		    				Timest = data.results[i].Timest;
			    		    var updateStringTBD = 'Top 10 Bookings by City as on ' + Timest + ' GMT';
			    		    sap.ui.getCore().byId("idTBDUpdate").setText(updateStringTBD);
			    			}
					    
		    			
		    			TBDArray.push({
		    				"Customer": data.results[i].Customer,
		    				"Ouquan": data.results[i].Ouquan,
		    				"Ceu": data.results[i].Ceu,
			    			});	
					    	
					    	jsonInventoryTBD.push({
			    				"Customer": data.results[i].Customer,
			    				"No. of Units": data.results[i].Ouquan,
			    				"CEU": data.results[i].Ceu,
			    			});	
					    	
		    		}
			    	
			    	TBDArrayBackup = TBDArray;
		    		var oModelTBD = new sap.ui.model.json.JSONModel();
		    		oModelTBD.setData({modelData: TBDArray});
		        	sap.ui.getCore().byId("idTableTBDSummary").setModel(oModelTBD);
		        	sap.ui.getCore().byId("idTableTBDSummary").bindRows("/modelData");
		        	sap.ui.getCore().byId("idTableTBDSummary").setVisibleRowCount(11);
		        	
					var loadFifth = new topretucustpage();
					loadFifth.getTRCSummary();
					
		        	}
					
		    	
			//busyDialog.close();
		},
		function(err){
	    	 //busyDialog.close();
	    	 //errorfromServer(err);
	    	 //alert("Error in data read from BW Query");
			sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n38% Completed');
	    });
	
		
	}
		
});