sap.ui.jsview("view.App", {

	getControllerName: function () {
		return "view.App";
	},
	createContent: function (oController) {

		// to avoid scrollbars on desktop the root view must be set to block display
		this.setDisplayBlock(true);

		// create app control
		this.app = new sap.m.App({
			homeIcon : {
				'phone' : 'img/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/fav_icon.ico',
				'precomposed': false
			}
		});
		this.app.setHeight('99.5%');
		
		//var LandingPageView = sap.ui.jsview("messagePage", "view.messagePage");
		var LandingPageView = sap.ui.jsview("UTILREP1", "view.UTILREP1");
		this.app.addPage(LandingPageView);

		return this.app;
	}
});
