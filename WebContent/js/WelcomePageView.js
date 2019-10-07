sap.ui.model.json.JSONModel.extend("welcomePageView", {
       
       createWelcomePage: function(){
              
              var oSeacoLogo = new sap.ui.commons.Image();
              oSeacoLogo.setSrc("images/seacologo.png");
              oSeacoLogo.setDecorative(false);
              oSeacoLogo.addStyleClass("centered");
              
              var oFlexImage = new sap.m.FlexBox({
                  items: [
                          oSeacoLogo
                  ],
                  direction : "Row",
                        width:"100%"
                           });
              
              var oWelcomePageLayout = new sap.ui.layout.form.ResponsiveLayout("idWelcomePageLayout",{
                labelSpanL: 1,
            labelSpanM: 1,
            labelSpanS: 1,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 1,
            columnsM: 1,
            columnsS: 1,
            breakpointL: 765,
            breakpointM: 320
           });
                          
      var oWelcomePageForm = new sap.ui.layout.form.Form("idWelcomePageForm",{
         layout: oWelcomePageLayout,
         formContainers: [
                 new sap.ui.layout.form.FormContainer("idWelcomePageFormC1",{
                     formElements: [                                           
                                             new sap.ui.layout.form.FormElement({
                                                 fields: [oFlexImage],
                                             })
                                      ],
                             layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                 })
                                      ]
      });
                             
         return oWelcomePageForm;
       }
});
