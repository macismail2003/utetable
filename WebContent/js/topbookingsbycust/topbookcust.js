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
var jsonInventoryTBC = [];
var TBCArray = [];
var TBCArrayBackup = [];
sap.ui.model.json.JSONModel.extend("topbookcustpage", {
	
	createTBCPage: function(){
		var oCurrent = this;
	    
		var oTBCUpdate = new sap.ui.commons.Label("idTBCUpdate", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10 marginBottom25 fontTitle"); 
		
	    
		var btnTBDRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          visible: false,
	          type:sap.m.ButtonType.Unstyled,
	          press:function(){
	        	 oCurrent.getTBCSummary();
	          }
		}).addStyleClass("submitBtn");
		
		btnTBDRefresh.setTooltip("TBD Welcome"
		);		
		/*var btnTBCExport = new sap.m.Button("idExportTBC",{
			  //width : '150px',
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: "images/export_icon.png",
	          tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTBC, "UTE Summary","export");
	          }
		}).addStyleClass("toolbarBtn marginLeft");*/
		
		var btnTBCExport = new sap.m.Image("idExportTBC",{
			type:sap.m.ButtonType.Unstyled,
			src: "images/export_icon.png",
			tooltip: "Excel Download",
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventoryTBC, "UTE Summary","export");
	          }
		}).addStyleClass("excelBtn marginTop10");
		
		if(isMobile.any()){
			btnTBCExport.setVisible(false);
		}
		
		var buttonTBCFlex = new sap.m.FlexBox({
			items: [
                       btnTBDRefresh,
                       btnTBCExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
		// Table
    	var oTableTBCSummary = new sap.ui.table.Table("idTableTBCSummary",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"80%",
            //height: "35px",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	 //Table Columns
    	oTableTBCSummary.addColumn(new sap.ui.table.Column({
			 width: "75%",
    		 label: new sap.ui.commons.Label({text: "Customer"}),
    		template: new sap.ui.commons.TextView().bindProperty("text", "Customer").bindProperty("helpId","Customer").addStyleClass("wraptext"),
    		resizable:false,
          // sortProperty: "A5ZDEPOCIT",
          // filterProperty: "A5ZDEPOCIT",
  		 }));
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	oTableTBCSummary.addColumn(new sap.ui.table.Column({
   		 width: "25%",
     		 label: new sap.ui.commons.Label({text: "No. of Units", textAlign : sap.ui.core.TextAlign.End}),
      		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ouquan").bindProperty("helpId","Ouquan").addStyleClass("wraptext"),
   		 resizable:false,
            //sortProperty: "Name",
            //filterProperty: "Name",
   		 }));
   	
    	oTableTBCSummary.addColumn(new sap.ui.table.Column({
  		 width: "25%",
    		 label: new sap.ui.commons.Label({text: "CEU", textAlign : sap.ui.core.TextAlign.End}),
    		 template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", "Ceu").bindProperty("helpId","Ceu").addStyleClass("wraptext"),
    		 resizable:false,
  		 }));
   	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	

    	/*oTableTBCSummary.addColumn(new sap.ui.table.Column({
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
    	
    	oTableTBCSummary.addColumn(new sap.ui.table.Column({
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
    	
		var oTBCFilterText = new sap.ui.commons.Label("idTBCFilter", {
			text : " ",
			//width : "150px"
		}).addStyleClass("marginTop10"); 
		
		var repTBCFlex = new sap.m.FlexBox("idRepTBCFlex", {
			items: [   
			           oTBCUpdate,
                       buttonTBCFlex,
                       oTBCFilterText,
                       oTableTBCSummary
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
		//oCurrent.getTBCSummary();
		return repTBCFlex;
	
			 
	},
	
	getTBCSummary: function(){
	//busyDialog.open();
	
	oModel = new sap.ui.model.odata.ODataModel(netATBC, true);

	OData.request({ 
	      requestUri: netATBCService,
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
	    sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n25% Completed');
	    //busyDialog.open();
		if(data.results.length == 0){
			if(TBCArrayBackup.length == 0){
	    		 //busyDialog.close();
	    		sap.ui.commons.MessageBox.show("No Results Found for Outstanding Bookings by Customer",
                        sap.ui.commons.MessageBox.Icon.WARNING,
                        "Warning",
                        [sap.ui.commons.MessageBox.Action.OK],
                        sap.ui.commons.MessageBox.Action.OK);
	    		
	    				sap.ui.getCore().byId("idRepTBCFlex").destroy();
	    				
	    				var loadFourth = new topbookdepopage();
	    				loadFourth.getTBDSummary();
	    	}
			else{
	    		var oModelTBCBackup = new sap.ui.model.json.JSONModel();
	    		oModelTBCBackup.setData({modelData: TBCArrayBackup});
	        	sap.ui.getCore().byId("idTableTBCSummary").setModel(oModelTBCBackup);
	        	sap.ui.getCore().byId("idTableTBCSummary").bindRows("/modelData");
	        	sap.ui.getCore().byId("idTableTBCSummary").setVisibleRowCount(11);
	        	
				var loadFourth = new topbookdepopage();
				loadFourth.getTBDSummary();
			}
			}
	    	else{
			
				TBCArray = [];
				jsonInventoryTBC = [];
    			
	    		for(var i=0; i<data.results.length; i++){

	    			if (i == 0){   	
	    				Timest = data.results[i].Timest;
		    		    var updateStringTBC = 'Top 10 Bookings by Customers as on ' + Timest + ' GMT';
		    		    sap.ui.getCore().byId("idTBCUpdate").setText(updateStringTBC);
		    			}
				    
	    			
	    			TBCArray.push({
	    				"Customer": data.results[i].Customer,
	    				"Ouquan": data.results[i].Ouquan,
	    				"Ceu": data.results[i].Ceu,
		    			});	
				    	
				    	jsonInventoryTBC.push({
		    				"Customer": data.results[i].Customer,
		    				"No. of Units": data.results[i].Ouquan,
		    				"CEU": data.results[i].Ceu,
		    			});	
				    	
	    		}
		    	
		    	TBCArrayBackup = TBCArray;
	    		var oModelTBC = new sap.ui.model.json.JSONModel();
	    		oModelTBC.setData({modelData: TBCArray});
	        	sap.ui.getCore().byId("idTableTBCSummary").setModel(oModelTBC);
	        	sap.ui.getCore().byId("idTableTBCSummary").bindRows("/modelData");
	        	sap.ui.getCore().byId("idTableTBCSummary").setVisibleRowCount(11);
	        	
				var loadFourth = new topbookdepopage();
				loadFourth.getTBDSummary();
				
	        	}
				
	    	
		//busyDialog.close();
		},
		function(err){
			 sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n25% Completed');
	    	 //busyDialog.close();
	    	 //errorfromServer(err);
	    	 //alert("Error in data read from BW Query");
	    });
	
		
	}
		
});