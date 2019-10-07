//var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV";

//var serviceUrl ="http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT2_SRV";
//var serviceUrl ="http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT2_SRV";

//var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT3_SRV";
//var serviceUrl = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT3_SRV";

//var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SRV";
//var serviceUrl = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SRV";

//var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV"; 


//var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT1_TO_4_SEC_SRV";

// DEV
/*var auth_serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY_ROLE_SRV";
var serviceUrl = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV";
//lot 5 urls
var serviceUrl15 = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";
var serviceUrl15_old = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";*/


//QltY
/*var auth_serviceUrl = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY_ROLE_SRV";
var serviceUrl = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV";
//lot 5 urls
var serviceUrl15 = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";
var serviceUrl15_old = "http://seanwgf1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";*/


/*AWS URL Dev*/

/*var auth_serviceUrl = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY_ROLE_SRV";
var serviceUrl = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV";
//lot 5 urls
var serviceUrl15 = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";
var serviceUrl15_old = "http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";*/

/*AWS URL Quality*/

/*var auth_serviceUrl = "http://sapfgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY_ROLE_SRV";
var serviceUrl = "http://sapfgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV";
//lot 5 urls
var serviceUrl15 = "http://sapfgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";
var serviceUrl15_old = "http://sapfgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";*/



/*AWS URL Dev web-dispatcher*/

/*var auth_serviceUrl = "http://172.17.3.29:8100/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY_ROLE_SRV";
var serviceUrl = "http://172.17.3.29:8100/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV";
//lot 5 urls
var serviceUrl15 = "http://172.17.3.29:8100/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";
var serviceUrl15_old = "http://172.17.3.29:8100/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV";*/

var menuClickedData = [];

var aMenuLinks = [];
var menuData = [];
var child = [];
var loggedInCustomer = "Customer";
var donutColor = ["#99cc33","#002E63","#cc292b"];
var columnColor = ["#cc292b"];
var menuClickedTxt = "";
var objLoginUser;
var backendMenuJSON = [];

/*var testJSON = {
		results:{
			0:{
				Accnt: "",
				ActiveIcon: "images/menu/L5a.png",
				AgrName: "ZE.EPP07",
				Bname: "ZTEST_SEADM",
				ChildMenu: "",
				Department: "SEACO_SYS_ADM",
				//EMsg: "",
				Extra: "00000000000000000001",
				GrpName: "InventorySearch",
				InactiveIcon: "images/menu/L5.png",
				Menu: "Depot Inventory",
				MenuName: "Depot Inventory",
				Page1: "InventorySearch",
				Parent: "X",
				Password: "",
				SAP__Origin: "CGW_100",
				ScrView: "",
				Sequence: "6.0",
				//Test: "",
				Test1: "00000000000000000027",
				Title: "Inventory Overview",
				Type: "",
				UDat: "/Date(253392451200000)/"
			},
			
		}
};*/