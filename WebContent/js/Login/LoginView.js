/*
 *
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 15.12.2014
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC15122014
*$*$ Purpose     : Removed "First Time Login Click HERE"
*$*$---------------------------------------------------------------------
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 12.02.2014
*$*$ Reference   : RTS1059
*$*$ Transport   : CGWK900840
*$*$ Tag         : MAC12022014
*$*$ Purpose     : If the password input is Seaco@123, Open a dialog box that will reset the password
*$*$---------------------------------------------------------------------
**/	

jQuery.sap.require("sap.ui.model.odata.datajs");
var csrftokenGlobal = "";
var aGlobalDepotNames = [];
var aChngPswd;
var oUserName;
var oPassword;
var oNPassword;
var oCPassword;
var oPassChangeDialog;
sap.ui.model.json.JSONModel.extend("LoginView", {
	
	createLoginForm: function(oController){
			var oCurrent = this;
            var vTxtWelcome = new sap.m.Text({text: "Welcome To "}).addStyleClass("fontWelcome");
            var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
            var vTxtSeaweb = new sap.m.Text({text: " Seaweb"}).addStyleClass("fontWelcomeRed");
            var oFlexboxWelcome = new sap.m.FlexBox({
                     items: [
                       vTxtWelcome,lblSpaceLegend,
                       vTxtSeaweb
                     ],
                     direction: "Row"
                   });
            
            
            var vUserImg = new sap.m.Image("idUserImg",{src:"images/login/Username_icon.png"});
            var vPswdImg = new sap.m.Image("idPswdImg",{src:"images/login/Password_icon.png"});
            
           var vtxtUsername = new sap.ui.commons.TextField("idtxtUsername",{/*value:"ztest_seadm",*/
                   placeholder:"User ID"
            });
            vtxtUsername.focus();
            var vtxtPassword = new sap.ui.commons.PasswordField("idtxtPassword",{/*value:"Admin@123",*/
                   placeholder:"Password",
                   
            });
            sap.ui.commons.PasswordField.prototype.onkeyup = function(e) {
                var k = e.which || e.keyCode;
				        if (k === jQuery.sap.KeyCodes.ENTER) 
						{
						if (oPassChangeDialog == undefined)
						{
							oController.LogonBtnPress(vtxtPassword.getValue());
						}
						else if (oPassChangeDialog.isOpen() == false)
					    {
                            oController.LogonBtnPress(vtxtPassword.getValue());
                        }
						else if (oPassChangeDialog.isOpen() == true){
						var userId = sap.ui.getCore().byId("idtxtUsername").getValue();
						var pswd = sap.ui.getCore().byId("idtxtPassword").getValue();	
						if(oCurrent.validateFieldsForPswdChng())
						{
						busyDialog.open();
						oCurrent.callBackend(userId, pswd, oNPassword.getValue(), oCPassword.getValue());
						busyDialog.close();
						}							
						}
						}
						}
            
            var oFlexboxUsername = new sap.m.FlexBox({
                     items: [
                       vUserImg,
                       vtxtUsername
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
            var oFlexboxPassword = new sap.m.FlexBox({
                     items: [
                       vPswdImg,
                       vtxtPassword
                     ],
                     direction: "Row"
                   }).addStyleClass("marginTop10");
            
            var vLoginBtn = new sap.m.Button("idBtnLogin",{
                   text:"Login",
          type:sap.m.ButtonType.Unstyled,
          layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4"}),
                   press: function() {
                         oController.LogonBtnPress(vtxtPassword.getValue());
                   }
            }).addStyleClass("submitBtn");
            
            var vTxtLogonPrblms = new sap.m.Text({text: "Need help?"}).addStyleClass("font13");
            var lblSpaceLegend2 = new sap.ui.commons.Label( {text: " ",width : '5px'});
            var vLinkGetSupport = new sap.ui.commons.Link({
                   text:"Need help?",
                   press:function(){                                                          //MAC26092014
                       window.open("GetSupport.html","_self");                               //MAC26092014
                 }
            }).addStyleClass("font13 marginTop2");
            
            var oFlexboxLogonPrblm = new sap.m.FlexBox({
                     items: [
                       vLinkGetSupport
                     ],
                     alignItems: sap.m.FlexAlignItems.Center,
                     direction: "Row"
                   }).addStyleClass("marginTop10");
            
            var vLinkNewAccount = new sap.ui.commons.Link({
                   text:"Create an account",
                   press:function(){                                                          //MAC26092014
                       window.open("GetSupport.html","_self");                               //MAC26092014
                 }
            }).addStyleClass("font13 marginTop2");
            
            var oFlexboxLogonPrblm2 = new sap.m.FlexBox({
                     items: [
                             vLinkNewAccount
                     ],
                     alignItems: sap.m.FlexAlignItems.Center,
                     direction: "Row"
                   }).addStyleClass("marginTop10");
            
            var vTxtChngPswd = new sap.m.Text({text: "First time Login click"}).addStyleClass("font13");
            var lblSpaceLegend3 = new sap.ui.commons.Label( {text: " ",width : '4px'});
            var vLinkHereLink = new sap.ui.commons.Link({
                   text:"here",
                   press:function(){
                	   window.open("ChangePassword.html","_self");
                   }
            }).addStyleClass("font13 marginTop2");
            
            var oFlexboxChngPswd = new sap.m.FlexBox({
                items: [
                  vTxtChngPswd,lblSpaceLegend3,
                  vLinkHereLink
                ],
                alignItems: sap.m.FlexAlignItems.Center,
                direction: "Row"
              }).addStyleClass("marginTop10");
            
            
            var vTxtLogonWarning = new sap.m.Text({text: "This website has been optimized for "}).addStyleClass("font13 marginTop10");
            var vTxtLogonWarningC = new sap.m.Text({text: "-Chrome 30.x.x onwards"}).addStyleClass("font13");
            
            var isWarningVisible = false;
            var browserName = sap.ui.Device.browser;
            
            if(browserName.name == browserName.BROWSER.CHROME) // check if Browser is Chrome
            	isWarningVisible = false;
            else
            	isWarningVisible = true;
            
            var oFlexboxLogonWarning = new sap.m.FlexBox({
                items: [
                  vTxtLogonWarning,
                  vTxtLogonWarningC
                ],
                visible:isWarningVisible,
                //alignItems: sap.m.FlexAlignItems.Center,
                direction: "Column"
            }).addStyleClass("marginTop10");
            
            
            var oFlexboxLoginForm = new sap.m.FlexBox("idFlexLoginForm",{
                     items: [
                       oFlexboxWelcome,
                       oFlexboxUsername,
                       //oFlexboxChngPswd,				//MAC15122014-
                       oFlexboxPassword,
                       vLoginBtn,
                       //oFlexboxLogonPrblm,
                       //oFlexboxLogonPrblm2,
                       //oFlexboxLogonWarning
                     ],
                     alignItems: sap.m.FlexAlignItems.Center,
                     direction: "Column"
                   });
                                              
            oFlexboxLoginForm.placeAt("loginForm");

	},
	passwordNotOk: function(){
		sap.ui.commons.MessageBox.alert("Please check the passwords and retry!");
	},
	
	callBackend: function(userId, password, newPassword, conPassword){
		
		oModel = new sap.ui.model.odata.ODataModel(auth_serviceUrl, true, "ismail", 'kayal99');
		var urlToCall = auth_serviceUrl + "/popup_password_changes(Userid='" + userId + "',Opassword='" + password + "',Password='" + newPassword + "',Cpassword='" +conPassword+ "')";
		OData.request({ 
		      requestUri: urlToCall,
		      method: "GET", 
		      dataType: 'json',
		      user: "ismail", password: "kayal99",
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	aChngPswd = data.Message;
		    	sap.ui.commons.MessageBox.alert(data.Message);
				if(data.Message == 'Password changed successfully'){
				oPassChangeDialog.close();
				}
		    },
		    function(err){
		    	 errorfromServer(err);
		    	 //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
		
		
	},
	
	validateFieldsForPswdChng: function(){
		
		var vUser = oUserName;
		var vOldPswd = oPassword;
		var vNewPswd = oNPassword;		
		var vConfirmPswd = oCPassword;	
		
		var isValid = true,isValidPswd = true;
		var ConfirmPswdFlag = true;
		var isValidFormat = true;
		var passw = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 
		
		if(vUser.getValue().trim().length == 0){
			vUser.setValueState(sap.ui.core.ValueState.Error);
			vUser.setValue("");
			vUser.setPlaceholder("Required");
			isValid = false;
		}
		
		if(vOldPswd.getValue().trim().length == 0){
			vOldPswd.setValueState(sap.ui.core.ValueState.Error);
			vOldPswd.setValue("");
			vOldPswd.setPlaceholder("Required");
			isValid = false;
		}
		
		if(vNewPswd.getValue().trim().length == 0){
			vNewPswd.setValueState(sap.ui.core.ValueState.Error);
			vNewPswd.setValue("");
			vNewPswd.setPlaceholder("Required");
			ConfirmPswdFlag = false;
		}
		if(vConfirmPswd.getValue().trim().length == 0){
			vConfirmPswd.setValueState(sap.ui.core.ValueState.Error);
			vConfirmPswd.setValue("");
			vConfirmPswd.setPlaceholder("Required");
			ConfirmPswdFlag = false;
		}
		
		
		if(ConfirmPswdFlag){
			if(vNewPswd.getValue().trim().match(passw)){
				vNewPswd.setValueState(sap.ui.core.ValueState.None);
				vNewPswd.setPlaceholder("New Password");
				isValidFormat = true;
			}
			else{
				vNewPswd.setValueState(sap.ui.core.ValueState.Error);
				vNewPswd.setValue("");
				vConfirmPswd.setValue("");
				vNewPswd.setPlaceholder("Invalid Password");
				vConfirmPswd.setPlaceholder("Confirm Password");
				isValidFormat = false;
			}
			
			if(isValidFormat){
				if((vNewPswd.getValue().trim() != vConfirmPswd.getValue().trim())){
					vNewPswd.setValueState(sap.ui.core.ValueState.Error);
					vNewPswd.setValue("");
					vNewPswd.setPlaceholder("Passwords mismatch");
					
					vConfirmPswd.setValueState(sap.ui.core.ValueState.Error);
					vConfirmPswd.setValue("");
					vConfirmPswd.setPlaceholder("Passwords mismatch");
					isValidPswd = false;
				}
				else{
					vNewPswd.setValueState(sap.ui.core.ValueState.None);
					vNewPswd.setPlaceholder("New Password");
					
					vConfirmPswd.setValueState(sap.ui.core.ValueState.None);
					vConfirmPswd.setPlaceholder("Confirm Password");
					isValidPswd = true;
				}
			}
			else{
				isValidPswd = false;
			}
		}
		else{
			isValidPswd = false;
		}
		
		if(isValid && isValidPswd){
			vUser.setValueState(sap.ui.core.ValueState.None);
			vUser.setPlaceholder("User ID");
			
			vOldPswd.setValueState(sap.ui.core.ValueState.None);
			vOldPswd.setPlaceholder("Old Password");
			return true;
		}
		else if(isValid && !isValidPswd)
			return false;
		else if(!isValid && isValidPswd)
			return false;
		else if(!isValid && !isValidPswd)
			return false;
	},
	
	changePassword: function(){
		var oCurrent = this;
		var userId = sap.ui.getCore().byId("idtxtUsername").getValue();
		var pswd = sap.ui.getCore().byId("idtxtPassword").getValue();	
		
		var layoutTitle = new sap.ui.commons.Label({
			text : "Password Change"}).addStyleClass("headingColor");
		oPassChangeDialog = new sap.ui.ux3.OverlayDialog({
			width: "360px",
			height: "390px"
		});
		/*var oPassChangeDialog = new sap.ui.commons.Dialog({
						//id : "idPassChangeDialog",
						height : "250px",
						width : "350px",
						modal : true,
						showCloseButton : true
					}); */
		//oPassChangeDialog.setTitle(layoutTitle.getText());
		
		var validationMessage = "All fields are Mandatory. \n" +
        "Password should be of minimum 6 characters - includes at least one lowercase, one uppercase, one numeric digit and one special character.";
		var vTxtValidationMsg = new sap.m.Text({text: validationMessage}).addStyleClass("font13");

		var oChangeButton = new sap.ui.commons.Button({
					    width: "70px",
						styled:false,
						text:"Change", 
						press:function(){
						if(oCurrent.validateFieldsForPswdChng())
						{
						busyDialog.open();
						oCurrent.callBackend(userId, pswd, oNPassword.getValue(), oCPassword.getValue());
						busyDialog.close();
						}
						else
						{
						oCurrent.passwordNotOk();
						}		        		
						}}).addStyleClass("submitBtn marginBottom50");
						
		
		var changeFlex = new sap.m.FlexBox({ items: [  oChangeButton  ],  direction: "Row"	, 
			justifyContent : sap.m.FlexJustifyContent.Center,
			alignItems: sap.m.FlexAlignItems.Center,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4", margin: false})}).addStyleClass("marginTop10");
			
			
		//oPassChangeDialog.addButton(oCloseButton);
		
		
		/*var oPassChangeLayout = new sap.ui.commons.layout.MatrixLayout();
		oPassChangeLayout.setLayoutFixed(false); */
		
		var oLUserName = new sap.ui.commons.Label({
			text : "User Name",
			width : "150px"
		}).addStyleClass("marginTop10");
		
		oUserName = new sap.ui.commons.TextField({
			editable : false,
			width : "120px",
			value : userId,
		}); 
		
		var oFlexboxUsername = new sap.m.FlexBox({
		 items: [
		   oLUserName,
		   oUserName
		 ],
		 direction: "Row"
	   }).addStyleClass("marginTop10");
				   
				   
		
		var oLPassword = new sap.ui.commons.Label({
			text : "Old Password",
			width : "150px"
		}).addStyleClass("marginTop10");
		
		oPassword = new sap.ui.commons.PasswordField({
			editable : false,
			width : "120px",
			value : pswd,
		}); 
		
		var oFlexboxPassword = new sap.m.FlexBox({
		 items: [
		   oLPassword,
		   oPassword
		 ],
		 direction: "Row"
	   }).addStyleClass("marginTop10");
	   
		
			
		var oLNPassword = new sap.ui.commons.Label({
			text : "New Password",
			width : "150px"
		}).addStyleClass("marginTop10");
		
		oNPassword = new sap.ui.commons.PasswordField({
			editable : true,
			width : "120px",
			//value : pswd,
		});
		
		var oFlexboxNPassword = new sap.m.FlexBox({
		 items: [
		   oLNPassword,
		   oNPassword
		 ],
		 direction: "Row"
	   }).addStyleClass("marginTop10");
	   
		
		var oLCPassword = new sap.ui.commons.Label({
			text : "Confirm New Password",
			width : "150px"
		}).addStyleClass("marginTop10"); 

		oCPassword = new sap.ui.commons.PasswordField({
			editable : true,
			width : "120px",
			//value : pswd,
		}); 
		
		var oFlexboxCPassword = new sap.m.FlexBox({
		 items: [
		   oLCPassword,
		   oCPassword
		 ],
		 direction: "Row"
	   }).addStyleClass("marginTop10");
	   
		var oFlexboxPassChange = new sap.m.FlexBox({
		 items: [
		   layoutTitle,
		   oFlexboxUsername,
		   oFlexboxPassword,
		   oFlexboxNPassword,
		   oFlexboxCPassword,
		   changeFlex,
		   vTxtValidationMsg
		 ],
		 alignItems: sap.m.FlexAlignItems.Center,
		 direction: "Column"
	   });
	   
		
		/*oPassChangeLayout.createRow( oLUserName, oUserName);
		
		oPassChangeLayout.createRow( oLPassword, oPassword);
		
		oPassChangeLayout.createRow( oLNPassword, oNPassword);
		
		oPassChangeLayout.createRow( oLCPassword, oCPassword);
		
					
		oPassChangeDialog.addContent(oPassChangeLayout); */
		
		var oChangDialogLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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
		
		var oChangDialogForm = new sap.ui.layout.form.Form({
          layout: oChangDialogLayout,
          formContainers: [
                  new sap.ui.layout.form.FormContainer({
                      formElements: [ 
                             new sap.ui.layout.form.FormElement({
                                  fields: [ oFlexboxPassChange ],
                             })
                      ]
                  })
          ]
		});
		
		
		oPassChangeDialog.addContent(oChangDialogForm);
		
		oPassChangeDialog.open();	
		
		
	},
	
	authenticateUser:function(){
		var oCurrent = this;
		busyDialog.open();
		isAuthentic = true;
		var userId = sap.ui.getCore().byId("idtxtUsername").getValue();
		var pswd = sap.ui.getCore().byId("idtxtPassword").getValue();
		
		//var filter = ";mo/User_Login_New(SAP__Origin='FGW_100',Userid='"+userId+"|"+pswd+"')";
		var filter = "/User_Login_new('"+userId+"|"+pswd+"')";
		//oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true, userId, pswd );
		
		OData.request({ 
		      requestUri: auth_serviceUrl + filter,
		      method: "GET", 
		      dataType: 'json',
		      user: userId, password: pswd,
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	 //csrftokenGlobal = response.headers['x-csrf-token'];
		    	//busyDialog.close();
		    		if(data.Message == "SUCCESS"){
			    		isAuthentic = true;
			    		sessionStorage.setItem("uName", userId);
			    		sessionStorage.setItem("login", "success");

			    		//sessionStorage.setItem("pwd", pswd);
			    		window.open("UserHome.html","_self");
			    		
			    		//call to populate depot at once
			    		//oCurrent.PopulateDepotAfterLogin();
			    	}
			    		
			    	else if(data.Message != "SUCCESS"){
			    		busyDialog.close();
			    		isAuthentic = false;
			    		sap.ui.commons.MessageBox.alert("Logon Failed. Please check entered Username and Password");
			    		//sap.ui.getCore().byId("idtxtUsername").setValue("");
			    		sap.ui.getCore().byId("idtxtPassword").setValue("");
			    	}
		    	
		    	/*if(data.results.length > 0){
		    		if(data.results[0].Message == "SUCCESS"){
			    		isAuthentic = true;
			    		sessionStorage.setItem("uName", userId);
			    		sessionStorage.setItem("login", "success");

			    		//sessionStorage.setItem("pwd", pswd);
			    		window.open("UserHome.html","_self");
			    	}
			    		
			    	else if(data.results[0].Message != "SUCCESS"){
			    		busyDialog.close();
			    		isAuthentic = false;
			    		sap.ui.commons.MessageBox.alert("Logon Failed. Please check entered Username and Password");
			    		//sap.ui.getCore().byId("idtxtUsername").setValue("");
			    		sap.ui.getCore().byId("idtxtPassword").setValue("");
			    	}
		    	}*/
	
		    },
		    function(err){
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("Error while Login. Please try again");
		    	//alert("Error while Login. Please try again "+ window.JSON.stringify(err.response.body));
		    }
		);
		
		
		return isAuthentic;
		
	},
	
	LogoutUser: function(){
		busyDialog.open();
		
		//http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECROLE_PGW_SRV/User_LogOff(Bname='ZTEST_DU',Extra='')
		var vUserName = objLoginUser.getLoggedInUserName().toUpperCase();
		/*oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallCER = serviceUrl + "/User_LogOff_CER(Bname='" + vUserName + "',Extra='')";
		OData.request({ 
		      requestUri: urlToCallCER,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	
		    },
		    function(err){
		    	
		    });*/
		
		oModel1 = new sap.ui.model.odata.ODataModel(auth_serviceUrl, true);
		var urlToCall = auth_serviceUrl + "/User_LogOff(Bname='" + vUserName + "',Extra='')";
		OData.request({ 
		      requestUri: urlToCall,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	
		    },
		    function(err){
		    	/*busyDialog.close();
		    	 localStorage.clear();
                 sessionStorage.clear();
                 window.location.assign('index.html');*/
		    });
		
		
		busyDialog.close();
   	 localStorage.clear();
        sessionStorage.clear();
        window.location.assign('index.html');
	},
	
	PopulateDepotAfterLogin: function(){
		busyDialog.open();
		/*oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCall = serviceUrl15 + "/F4_Functional_Location";
		
		
		OData.request({ 
		      requestUri: urlToCall,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){ 
		    	aGlobalDepotNames = [];
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		aGlobalDepotNames[i] = data.results[i].FunctionalLoc;
				}
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });*/
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
		//alert("urlToCall : "+urlToCall);
		OData.request({ 
		      requestUri: urlToCall,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	aGlobalDepotNames = [];
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		aGlobalDepotNames = data.results[i].FunctionalLoc;
				}
				
		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
		
		busyDialog.close();
	}
	
});
function fnRedirectToLogin(){
	
	if(aChngPswd == "Password changed successfully"){
		window.open("index.html","_self");
	}
}
