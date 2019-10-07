sap.ui.model.json.JSONModel.extend("CreateDashboard", {
	createDepotDashboard: function(){
		
		var oCurrent = this;
		if(isMobile.any()){
			 var oUtilLayout = new sap.ui.layout.form.ResponsiveGridLayout( {
				  labelSpanL: 1,
		          labelSpanM: 1,
		          labelSpanS: 1,
				  emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1
			});
		}
		else
			{
		
			 var oUtilLayoutNeta = new sap.ui.layout.form.ResponsiveGridLayout( {
				  labelSpanL: 1,
		          labelSpanM: 1,
		          labelSpanS: 1,
				  emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1,
		          breakpointL: 887,
				  breakpointM: 320
			});
			
			 var oUtilLayoutUtil = new sap.ui.layout.form.ResponsiveGridLayout( {
				  labelSpanL: 1,
		          labelSpanM: 1,
		          labelSpanS: 1,
				  emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1,
		          breakpointL: 887,
				  breakpointM: 320
			});
			 
		 var oUtilLayout = new sap.ui.layout.form.ResponsiveGridLayout( {
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
			  emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 2,
	          columnsM: 1,
	          columnsS: 1,
	          breakpointL: 887,
			  breakpointM: 320
		 	});
		 
		 var oUtilLayoutUtilOuts = new sap.ui.layout.form.ResponsiveGridLayout( {
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
			  emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 1,
	          columnsM: 1,
	          columnsS: 1
		});
		 
		}
		
		var oUtilFormNeta = new sap.ui.layout.form.Form("idUtilFormNeta",{
			layout: oUtilLayoutNeta,
			formContainers: [
						new sap.ui.layout.form.FormContainer("firstRow",{
							//title: "Depot Inventory",
							formElements: [
								new sap.ui.layout.form.FormElement("firstRows",{
									fields: [],
								})
							],
							visible:false
						})]
		});
		
		var oUtilFormUtil = new sap.ui.layout.form.Form("idUtilFormUtil",{
			layout: oUtilLayoutUtil,
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
		
		 var oUtilForm = new sap.ui.layout.form.Form("idUtilForm",{
				layout: oUtilLayout,
				formContainers: [
							new sap.ui.layout.form.FormContainer("thirdRowFirstColumn",{
								//title: "Active Releases - Top 5",
								formElements: [
									new sap.ui.layout.form.FormElement("thirdRowFirstColumns",{
										fields: [], 
									})
								],
								visible:false,
								layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}), //FC3
							new sap.ui.layout.form.FormContainer("thirdRowSecondColumn",{
								//title: "Active Returns - Top 5",
								formElements: [
									new sap.ui.layout.form.FormElement("thirdRowSecondColumns",{
										fields: [], 
									})
								], 
								visible:false
							}), 
							new sap.ui.layout.form.FormContainer("fourthRowFirstColumn",{
								//title: "Performance by EDI Message Processing",
								formElements: [
									new sap.ui.layout.form.FormElement("fourthRowFirstColumns",{
										fields: [], 
									})
								],
								visible:false,
								layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}), 
							new sap.ui.layout.form.FormContainer("fourthRowSecondColumn",{
								//title: "Performance by M & R",
								formElements: [
									new sap.ui.layout.form.FormElement("fourthRowSecondColumns",{
										fields: [],
									})
								],
								visible:false
							})
							]
		 });
		 
			var oUtilFormOuts = new sap.ui.layout.form.Form("idUtilFormUtilOuts",{
				layout: oUtilLayoutUtilOuts,
				formContainers: [
								new sap.ui.layout.form.FormContainer("fifthRow",{
									//title: "Performance by EDI Message Processing",
									formElements: [
										new sap.ui.layout.form.FormElement("fifthRows",{
											fields: [], 
										})
									],
									visible:false
								}), 
								new sap.ui.layout.form.FormContainer("sixthRow",{
									//title: "Performance by M & R",
									formElements: [
										new sap.ui.layout.form.FormElement("sixthRows",{
											fields: [],
										})
									],
									visible:false
								}), 
								]
			});
			
		 oCurrent.checkRole();
		 
		var totalFlex = new sap.m.FlexBox({
			items: [   oUtilFormNeta,
			           oUtilFormUtil,
			           oUtilForm,
			           oUtilFormOuts
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

