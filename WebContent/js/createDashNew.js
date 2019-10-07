sap.ui.model.json.JSONModel.extend("CreateDashboard", {
	createDepotDashboard: function(){
		
		var oCurrent = this;
			 var oUtilLayout = new sap.ui.layout.form.ResponsiveGridLayout( {
//				  labelSpanL: 1,
//		          labelSpanM: 1,
//		          labelSpanS: 1,
//				  emptySpanL: 0,
//		          emptySpanM: 0,
//		          emptySpanS: 0,
//		          columnsL: 1,
//		          columnsM: 1,
//		          columnsS: 1
			});
		
		

		
		var oUtilFormUtil = new sap.ui.layout.form.Form("idUtilFormUtil",{
			layout: oUtilLayout,
			formContainers: [
						new sap.ui.layout.form.FormContainer("secondRow",{
							//title: "Depot Inventory",
							formElements: [
								new sap.ui.layout.form.FormElement("secondRows",{
									fields: [],
								})
							],
							visible:false
						})]
		});
		
			
		 oCurrent.checkRole();
		 
		var totalFlex = new sap.m.FlexBox({
			items: [   oUtilFormUtil
                     ],
                     direction: "Column"
                   }).addStyleClass("marginTop10");
		
			
		 return totalFlex;
	},
	
	checkRole:function(){
		
//		var dashItem = new neta().createNAPage();
//		var formElement = sap.ui.getCore().byId('firstRows');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("firstRow").setVisible(true);
		
		var dashItem = new utilreppage().createUTPage();
		var formElement = sap.ui.getCore().byId('secondRows');
		formElement.insertField(dashItem,0);
		sap.ui.getCore().byId("secondRow").setVisible(true);	
		var loadSecond = new utilreppage();
		loadSecond.getUTSummary();
		
//		dashItem = new topbookcustpage().createTBCPage();
//		formElement = sap.ui.getCore().byId('thirdRowFirstColumns');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("thirdRowFirstColumn").setVisible(true);
//		
//		dashItem = new topbookdepopage().createTBDPage();
//		formElement = sap.ui.getCore().byId('thirdRowSecondColumns');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("thirdRowSecondColumn").setVisible(true);
//		
//		dashItem = new topretucustpage().createTRCPage();
//		formElement = sap.ui.getCore().byId('fourthRowFirstColumns');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("fourthRowFirstColumn").setVisible(true);
//		
//		dashItem = new topretudepopage().createTRDPage();
//		formElement = sap.ui.getCore().byId('fourthRowSecondColumns');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("fourthRowSecondColumn").setVisible(true);
//		
//		dashItem = new outstandingBookings().createOBKPage();
//		formElement = sap.ui.getCore().byId('fifthRows');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("fifthRow").setVisible(true);
//		
//		dashItem = new outstandingReturns().createORTPage();
//		formElement = sap.ui.getCore().byId('sixthRows');
//		formElement.insertField(dashItem,0);
//		sap.ui.getCore().byId("sixthRow").setVisible(true);
				
		
	}
});	

