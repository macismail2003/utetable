sap.ui.controller("view.Login", {
	LogonBtnPress: function(uName,pwd){
		var oLoginView = new LoginView();
		oLoginView.authenticateUser()
			//window.open("UserHome.html","_self");
	}
});
