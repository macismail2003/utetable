jQuery.sap.require("sap.ui.model.json.JSONModel");

var loggedInUserID = "";
var loggedInUserName = "";
var loggedInUserType = "";
var loggedInUserData = [];
var loggedInUserLandingPage = "";
var objLoggedInUser;
var loggedInUserDROP4 = [];
var loggedInUserDROP5 = [];

sap.ui.model.json.JSONModel.extend("loggedInU",{
       setLoggedInUserID:function(userID){
              this.loggedInUserID = userID;
       },
       setLoggedInUserName:function(userName){
              this.loggedInUserName = userName;
       },
       setLoggedInUserType:function(department){
              if(department.trim().length>0){
                     if(department.trim().substring(0,3)=="SEA")
                           this.loggedInUserType = "SEACO";
                     else if(department.trim().substring(0,3)=="DEP")
                           this.loggedInUserType = "DEPOT";
                     else if(department.trim().substring(0,3)=="FAC")
                           this.loggedInUserType = "FACTORY";
                     else if(department.trim().substring(0,3)=="SUR")
                           this.loggedInUserType = "SURVEYOR";
                     else if(department.trim().substring(0,3)=="BUY")
                           this.loggedInUserType = "BUYER";
                     else if(department.trim().substring(0,3)=="CUS")
                           this.loggedInUserType = "CUSTOMER";
              }else{
                     this.loggedInUserType = "";
              }
              
       },
       setLoggedInUserLandingPage:function(page){
    	   this.loggedInUserLandingPage = page;
       },
       
       setLoggedInUserDROP4Data:function(){
    	 var v_drop4 = jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
       	  		return element.Type == "DROP4";
         });
    	 
    	 loggedInUserDROP4.push({
			 'Zdoc':"",
			 'DocType':""
		 });
    	 
    	 for(var i = 0; i<v_drop4.length; i++){
    		 loggedInUserDROP4.push({
    			 'Zdoc':v_drop4[i].Password,
    			 'DocType':v_drop4[i].ScrView
    		 });
    	 }
       },
       
       setLoggedInUserDROP5Data:function(){
    	   var v_drop5 = jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
      	  		return element.Type == "DROP5";
        });
   	 
    	   loggedInUserDROP5.push({
			 'Zdoc':"",
			 'DocType':""
		 });
   	 
   	   for(var i = 0; i<v_drop5.length; i++){
	   		 loggedInUserDROP5.push({
	   			 'Zdoc':v_drop5[i].Password,
	   			 'DocType':v_drop5[i].ScrView
	   		 });
   	   }
       },
       setLoggedInUserData:function(userData){
              objLoggedInUser = this;
              
              this.loggedInUserData = userData;
              

            	  	depotIdDashBoard = objLoggedInUser.loggedInUserData[0].Accnt;
                     objLoggedInUser.setLoggedInUserID(objLoggedInUser.loggedInUserData[0].Accnt);
                     objLoggedInUser.setLoggedInUserName(objLoggedInUser.loggedInUserData[0].Bname);
                     objLoggedInUser.setLoggedInUserType(objLoggedInUser.loggedInUserData[0].Department);
                     objLoggedInUser.setLoggedInUserLandingPage(objLoggedInUser.loggedInUserData[0].GrpName);
                     objLoggedInUser.setLoggedInUserDROP4Data();
                     objLoggedInUser.setLoggedInUserDROP5Data();
                     
                     // Get Landing Page
                     var landingPage = jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
                   	  	return element.GrpName != "";
                     });
                     
                     // Check Landing Page Rights
                     if(landingPage.length >0){
                    	 var landingPageRights = jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
                        	  	return element.Page1 == landingPage[0].GrpName;
                          }); 
                    	 
                    	 if(landingPageRights.length >0){ // Rights Available - Assign Landing Page
                    		 objLoggedInUser.setLoggedInUserLandingPage(landingPage[0].GrpName); 
                    	 }else{ // No Rights Available - Show No Authorization Message Page
                    		 objLoggedInUser.setLoggedInUserLandingPage("WelcomePg");
                    	 }
                     }
                     
       },
       
       getLoggedInUserID:function(){
              return objLoggedInUser.loggedInUserID;
       },
       getLoggedInUserName:function(){
              return objLoggedInUser.loggedInUserName;
       },
       getLoggedInUserData:function(){
   			return objLoggedInUser.loggedInUserData;
   	   },
       getLoggedInUserType:function(){
              return objLoggedInUser.loggedInUserType;
       },
       getLoggedInUserLandingPage:function(){
           return objLoggedInUser.loggedInUserLandingPage;
       },

       filterLoggedInUserData:function(v_type){
              
              var menuClickedDetails = jQuery.grep(menuClickedData, function(element, index){
            	  return element.clicked == menuClickedTxt;
              });
              
              var menuDetails =jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
            	  return element.Page1 == menuClickedDetails[0].page;
              });
              
              var filteredData = jQuery.grep(objLoggedInUser.loggedInUserData, function(element, index){
            	  return element.Test1 == menuDetails[0].Test1 && element.Type == v_type;
              });
              
              return filteredData;
       },
       clearLoggedInUserData:function(){
           objLoggedInUser.setLoggedInUserID("");
           objLoggedInUser.setLoggedInUserName("");
           objLoggedInUser.setLoggedInUserType("");
           
           objLoggedInUser = null;
    }
});
