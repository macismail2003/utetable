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
var UTSummaryArraySeaco = [];
var UTSummaryArrayCronos = [];
var UTSummaryArrayBoth = [];
var UTClassArray = [];
sap.ui.model.json.JSONModel.extend("utilreppage", {

  createUTPage: function(){

    var oCurrent = this;
    var oLUpdate = new sap.ui.commons.Label("idLUpdate", {
      text : " ",
      visible: false,
      //width : "150px"
    }).addStyleClass("fontTitle"); 

    var oLUpdateBoth = new sap.ui.commons.Label("idLUpdateBoth", {
      text : "Combined Utilization",
      //width : "150px"
    }).addStyleClass("marginTop10 fontTitle"); 

    var oLUpdateSeaco = new sap.ui.commons.Label("idLUpdateSeaco", {
      text : "Seaco Utilization",
      //width : "150px"
    }).addStyleClass("marginTop10 fontTitle"); 

    var oLUpdateCronos = new sap.ui.commons.Label("idLUpdateCronos", {
      text : "Cronos Utilization",
      //width : "150px"
    }).addStyleClass("marginTop10 fontTitle"); 


    var btnRefresh = new sap.m.Button({
        width : '120px',
            text : "Refresh",
            visible: false,
            type:sap.m.ButtonType.Unstyled,
            press:function(){
             oCurrent.getUTSummary();
            }
    }).addStyleClass("submitBtn");

    /*var btnNaExport = new sap.m.Button("idExportUti",{
        //width : '150px',
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: "images/export_icon.png",
            tooltip: "Excel Download",
            press:function(){
          var objUtil = new utility();
              objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
            }
    }).addStyleClass("toolbarBtn marginLeft");*/

    var btnNaExport = new sap.m.Image("idExportUti",{
      type:sap.m.ButtonType.Unstyled,
      src: "images/export_icon.png",
      tooltip: "Excel Download",
      visible: false,
            press:function(){
          var objUtil = new utility();
              objUtil.makeHTMLTable(jsonInventory, "UTE Summary","export");
            }
    }).addStyleClass("excelBtn marginTop10");



    if(isMobile.any()){
      btnNaExport.setVisible(false);
    }

    var buttonNaFlex = new sap.m.FlexBox({
      items: [
                       btnRefresh,
                       btnNaExport
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");


    // Table for Seaco
      var oTableUTSummarySeaco = new sap.ui.table.Table("idTableUTSummarySeaco",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,  
            width: "95%",
            height: "35px",
       }).addStyleClass("fontStyle marginTop15 tblBorder marginBottom25");

       //Table Columns

      oTableUTSummarySeaco.addColumn(new sap.ui.table.Column({
       width: "20%",
         label: new sap.ui.commons.Label({text: "Category"}),
         template: new sap.m.Link({
        press : function(oEvent) {
          var comp = oEvent.getSource().getBindingContext().getProperty("Comp");
          oCurrent.navigToClass(this.getText(), comp);
        }
      }).bindProperty("text", "Eqcat").addStyleClass("wraptext"),
       resizable:false,
            //sortProperty: "Eqcat",
            //filterProperty: "Depot",
       }));

      oTableUTSummarySeaco.addColumn(new sap.ui.table.Column({
       width: "20%",
       visible: false,
         label: new sap.ui.commons.Label({text: "Company"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Comp").addStyleClass("wraptext"),
       resizable:false,
           //sortProperty: "Eqcat",
           //filterProperty: "Depot",
       }));

      oTableUTSummarySeaco.addColumn(new sap.ui.table.Column({
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
             //sortProperty: "Name",
             //filterProperty: "Name",
         }));

      oTableUTSummarySeaco.addColumn(new sap.ui.table.Column({
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
            //sortProperty: "Name",
            //filterProperty: "Name",
       }));

      oTableUTSummarySeaco.addColumn(new sap.ui.table.Column({
       width: "20%",
         label: new sap.ui.commons.Label({text: "Utilization %", textAlign : sap.ui.core.TextAlign.End}),
       template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utiliz"),
       resizable:false,
           //sortProperty: "Name",
           //filterProperty: "Name",
       }));

      // Table for Cronos
      var oTableUTSummaryCronos = new sap.ui.table.Table("idTableUTSummaryCronos",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,  
            width: "95%",
            height: "35px",
       }).addStyleClass("fontStyle marginTop15 tblBorder marginBottom25");

       //Table Columns

      oTableUTSummaryCronos.addColumn(new sap.ui.table.Column({
       width: "20%",
         label: new sap.ui.commons.Label({text: "Category"}),
         template: new sap.m.Link({
        press : function(oEvent) {
          var comp = oEvent.getSource().getBindingContext().getProperty("Comp");
          oCurrent.navigToClass(this.getText(), comp);
        }
      }).bindProperty("text", "Eqcat").addStyleClass("wraptext"),
       resizable:false,
            //sortProperty: "Eqcat",
            //filterProperty: "Depot",
       }));

      oTableUTSummaryCronos.addColumn(new sap.ui.table.Column({
       width: "20%",
       visible: false,
         label: new sap.ui.commons.Label({text: "Company"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Comp").addStyleClass("wraptext"),
       resizable:false,
           //sortProperty: "Eqcat",
           //filterProperty: "Depot",
       }));

      oTableUTSummaryCronos.addColumn(new sap.ui.table.Column({
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
             //sortProperty: "Name",
             //filterProperty: "Name",
         }));

      oTableUTSummaryCronos.addColumn(new sap.ui.table.Column({
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
            //sortProperty: "Name",
            //filterProperty: "Name",
       }));

      oTableUTSummaryCronos.addColumn(new sap.ui.table.Column({
       width: "20%",
         label: new sap.ui.commons.Label({text: "Utilization %", textAlign : sap.ui.core.TextAlign.End}),
       template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utiliz"),
       resizable:false,
           //sortProperty: "Name",
           //filterProperty: "Name",
       }));





      // Table for Both
      var oTableUTSummaryBoth = new sap.ui.table.Table("idTableUTSummaryBoth",{
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,  
            width: "100%",
            height: "35px",
       }).addStyleClass("fontStyle tblBorder");

       //Table Columns

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
       width: "22%",
         label: new sap.ui.commons.Label({text: "Category", textAlign : sap.ui.core.TextAlign.Center}),
         template: new sap.m.Link({
        press : function(oEvent) {
          var comp = oEvent.getSource().getBindingContext().getProperty("Comp");
          oCurrent.navigToClass(this.getText(), comp);
        }
      }).bindProperty("text", "Eqcat").addStyleClass("wraptext"),
       resizable:false,
            //sortProperty: "Eqcat",
            //filterProperty: "Depot",
       }));

      /*oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
       width: "16%",
       visible: false,
         label: new sap.ui.commons.Label({text: "Company"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Comp").addStyleClass("wraptext"),
       resizable:false,
           //sortProperty: "Eqcat",
           //filterProperty: "Depot",
       }));*/

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
         width: "18%",
           label: new sap.ui.commons.Label({text: "On Lease", textAlign : sap.ui.core.TextAlign.Center}),
          template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
         path: "Noles",
         type: new sap.ui.model.type.Integer({
                groupingEnabled: true,
                groupingSeparator: ","
            })}
       ),
         resizable:false,
             //sortProperty: "Name",
             //filterProperty: "Name",
         }));

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
         width: "18%",
         label: new sap.ui.commons.Label({text: "Total", textAlign : sap.ui.core.TextAlign.Center}),
        template: new sap.ui.commons.TextView({textAlign : sap.ui.core.TextAlign.End}).bindProperty("text", {
         path: "Notot",
         type: new sap.ui.model.type.Integer({
                groupingEnabled: true,
                groupingSeparator: ","
            })}
       ),
       resizable:false,
            //sortProperty: "Name",
            //filterProperty: "Name",
       }));

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
       width: "15%",
         label: new sap.ui.commons.Label({text: "UTE % \n Today", textAlign : sap.ui.core.TextAlign.Center}),
       template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utiliz"),
       resizable:false,
           //sortProperty: "Name",
           //filterProperty: "Name",
       }));

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
           width: "15%",
           label: new sap.ui.commons.Label({text: "UTE % \n Last WK", textAlign : sap.ui.core.TextAlign.Center}),
         template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utilizw"),
         resizable:false,
              //sortProperty: "Name",
              //filterProperty: "Name",
         }));

      oTableUTSummaryBoth.addColumn(new sap.ui.table.Column({
           width: "15%",
           label: new sap.ui.commons.Label({text: "UTE % \n Last MTH", textAlign : sap.ui.core.TextAlign.Center}),
         template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "Utilizm"),
         resizable:false,
              //sortProperty: "Name",
              //filterProperty: "Name",
         }));



       
       
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
                            fields: [oTableUTSummarySeaco]
                          }),
                          ]
                         })                    
                 ]
         });

      return oUTForm; */
    var oUTEFilterText = new sap.ui.commons.Label("idUTEFilter", {
      text : " ",
      //width : "150px"
    }).addStyleClass("marginTop10"); 

    var repFlex = new sap.m.FlexBox({
      items: [   //oLUpdate,
                       //buttonNaFlex,
                       //oUTEFilterText,
                       //oLUpdateBoth,
                       oTableUTSummaryBoth,
                       //oLUpdateSeaco,
                       //oTableUTSummarySeaco,
                       //oLUpdateCronos,
                       //oTableUTSummaryCronos,
                       
                     ],
                     direction: "Column",
                     //alignItems: sap.m.FlexAlignItems.Center
                   }).addStyleClass("");

    //oCurrent.getUTSummary();
    return repFlex;
       
  },

  getUTSummary: function(){

    /*UTSummaryArrayBoth = [];
    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "BOXES",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "REEFERS",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "SPECIALS",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "SWAPBODIES",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "TANKS",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    UTSummaryArrayBoth.push({
      Comp
      :
      "BOTH",
      Eqcat
      :
      "TOTAL",
      Noles
      :
      1105528,
      Notot
      :
      1194074,
      Utiliz
      :
      "92.58",
      Utilizm
      :
      "92.20",
      Utilizw
      :
      "92.50"
    });

    var oModelEDIUTSummaryBoth = new sap.ui.model.json.JSONModel();
    oModelEDIUTSummaryBoth.setData({modelData: UTSummaryArrayBoth});
      sap.ui.getCore().byId("idTableUTSummaryBoth").setModel(oModelEDIUTSummaryBoth);
      sap.ui.getCore().byId("idTableUTSummaryBoth").bindRows("/modelData");

      sap.ui.getCore().byId("idTableUTSummaryBoth").setVisibleRowCount(UTSummaryArrayBoth.length);  */

  //busyDialog.open();

    oModel = new sap.ui.model.odata.ODataModel(serviceUTE, true);
    var urlUT = serviceUTE + "/ZUTIL_SUMS?$filter=Reqtype eq 'F'";

    OData.request({ 
          requestUri: urlUT,
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
        sap.ui.getCore().byId("busy").setText('Loading Dashboard... \n12% Completed');
      if(data.results.length == 0){
             busyDialog.close();
            sap.ui.commons.MessageBox.show("No Result Found. Check data in SAP.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);

          }
          else{

          UTSummaryArraySeaco = [];
          jsonInventory = [];

            var vUpdateDate = data.results[0].Zdate.split("(");
            var vUpdateDates = vUpdateDate[1].split(")");
            //var vformattedUpdatedDate = new Date(Number(vUpdateDates[0]));
            var updatedDate = dateFormat(new Date(Number(vUpdateDates[0])), 'dd-mm-yyyy',"UTC");
            
            var updateString = 'Utilization Report as on ' + updatedDate + ' 02:00:00 GMT';
            
            sap.ui.getCore().byId("idLUpdate").setText(updateString);
            
            for(var i=0; i<data.results.length; i++){
                if(data.results[i].Comp == 'SEACO'){
                  UTSummaryArraySeaco.push({
                    "Eqcat": data.results[i].Eqcat,
                    "Comp": data.results[i].Comp,
                    "Noles": data.results[i].Noles,
                    "Notot": data.results[i].Notot,
                    "Utiliz": data.results[i].Utiliz,
                    "Utilizw": data.results[i].Utilizw,
                    "Utilizm": data.results[i].Utilizm
                  });
                }else if(data.results[i].Comp == 'CRONOS'){
                  UTSummaryArrayCronos.push({
                    "Eqcat": data.results[i].Eqcat,
                    "Comp": data.results[i].Comp,
                    "Noles": data.results[i].Noles,
                    "Notot": data.results[i].Notot,
                    "Utiliz": data.results[i].Utiliz,
                    "Utilizw": data.results[i].Utilizw,
                    "Utilizm": data.results[i].Utilizm
                  });
                }else if(data.results[i].Comp == 'BOTH'){
                  UTSummaryArrayBoth.push({
                    "Eqcat": data.results[i].Eqcat,
                    "Comp": data.results[i].Comp,
                    "Noles": data.results[i].Noles,
                    "Notot": data.results[i].Notot,
                    "Utiliz": data.results[i].Utiliz,
                    "Utilizw": data.results[i].Utilizw,
                    "Utilizm": data.results[i].Utilizm
                  });
                }


//                jsonInventory.push({
//                  "Equipment Category": data.results[i].Eqcat,
//                  "Company": data.results[i].Comp,
//                  "On Lease": data.results[i].Noles,
//                  "Total": data.results[i].Notot,
//                  "Utilization %": data.results[i].Utiliz
//                });

            }

            var oModelEDIUTSummarySeaco = new sap.ui.model.json.JSONModel();
            oModelEDIUTSummarySeaco.setData({modelData: UTSummaryArraySeaco});
              sap.ui.getCore().byId("idTableUTSummarySeaco").setModel(oModelEDIUTSummarySeaco);
              sap.ui.getCore().byId("idTableUTSummarySeaco").bindRows("/modelData");

              sap.ui.getCore().byId("idTableUTSummarySeaco").setVisibleRowCount(UTSummaryArraySeaco.length);

              var oModelEDIUTSummaryCronos = new sap.ui.model.json.JSONModel();
            oModelEDIUTSummaryCronos.setData({modelData: UTSummaryArrayCronos});
              sap.ui.getCore().byId("idTableUTSummaryCronos").setModel(oModelEDIUTSummaryCronos);
              sap.ui.getCore().byId("idTableUTSummaryCronos").bindRows("/modelData");

              sap.ui.getCore().byId("idTableUTSummaryCronos").setVisibleRowCount(UTSummaryArrayCronos.length);

              var oModelEDIUTSummaryBoth = new sap.ui.model.json.JSONModel();
            oModelEDIUTSummaryBoth.setData({modelData: UTSummaryArrayBoth});
              sap.ui.getCore().byId("idTableUTSummaryBoth").setModel(oModelEDIUTSummaryBoth);
              sap.ui.getCore().byId("idTableUTSummaryBoth").bindRows("/modelData");

              sap.ui.getCore().byId("idTableUTSummaryBoth").setVisibleRowCount(UTSummaryArrayBoth.length);

          }
      busyDialog.close();
      },
      function(err){
         sap.ui.getCore().byId("busy").setText('Loading Dashboard...');
           busyDialog.close();
           //errorfromServer(err);
           //alert("Error in data read from SAP");
        });

  },

  navigToClass : function(eqclass, comp){

      var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "to", {
        id : "utilclass"
      });

    var oUTC = new utilclasspage();
    oUTC.getUTC(eqclass, comp);



  }

});