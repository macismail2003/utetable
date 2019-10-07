/*
 * 
 
Information: This file is copied from inventorysearch.js on 21.09.2014 by Seyed Ismail
			 and the changes to this file are marked as MAC26092014
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 26.09.2014
*$*$ Reference   : P1 CR#11
*$*$ Transport   : 
*$*$ Tag         : MAC26092014
*$*$ Purpose     : P1 CR# 22 : Retaining only the needed nodes in the menu
*$*$---------------------------------------------------------------------
**/

var menuData = {
     //Seaco System Admin - Start  
    seacoSystemAdmin:{
       name: "root",
              0:{
                     name: "Depot Dashboard", inActive:"images/menu/L0.png" , activeIcon:"images/menu/L0a.PNG", iSelected:true,
              },
              1:{
                        name:"View CRM Docs", inActive:"images/menu/L1.png" , activeIcon:"images/menu/L1a.PNG", isSelected:false,
                        0:{
                               name: "Releases"
                        },
                        1:{
                               name: "Returns"
                        },
                        2:{
                               name: "Repair Estimates"
                        }
                        
              },
              2:{
                        name:"View ECC Docs", inActive:"images/menu/L2.png" , activeIcon:"images/menu/L2a.PNG", isSelected:false,
                        0:{
                               name: "Accounts Summary"
                        },
                        1:{
                               name: "Depot Specific Documents"
                        },
                        2:{
                            name: "View Inventory"
                        },
                        3:{
                            name: "Inventory Reconciliation"
                        }
              },
              3:{
                        name:"Upload Documents", inActive:"images/menu/L3.png" , activeIcon:"images/menu/L3a.PNG", isSelected:false,
                        0:{
                               name: "Certificates - Single"
                        },
                        1:{
                               name: "Certificates - Multiple"
                        },
                        2:{
                               name: "DN Pictures"
                        },
                        3:{
                               name: "Sale Pictures"
                        },
                        4:{
                               name: "New Build Pictures"
                        }
              },
              4:{
                  name:"Movement Management", inActive:"images/menu/L4.png" , activeIcon:"images/menu/L4a.PNG", isSelected:false,
                  0:{
                         name: "Gate In Single"
                  },
                  1:{
                         name: "Gate In Multiple"
                  },
                  2:{
                         name: "Gate Out Single"
                  },
                  3:{
                         name: "Gate Out Multiple"
                  },
                  4:{
                         name: "Correct Movement Date"
                  }
              },
              5:{
                  name:"Repairs and Maintenance", inActive:"images/menu/L4.png" , activeIcon:"images/menu/L4a.PNG", isSelected:false,
                  0:{
                         name: "Repair Estimate Single"
                  },
                  1:{
                         name: "Repair Estimate Multiple"
                  },
                  2:{
                         name: "Zero Cost Estimate"
                  },
                  3:{
                         name: "Lessee Approval Single"
                  },
                  4:{
                         name: "Lessee Approval Multiple"
                  },
                  5:{
                      name: "Repair Completion Single"
                  }
              },
              6:{
                  name:"Fix Partial Update", inActive:"images/menu/L4.png" , activeIcon:"images/menu/L4a.PNG", isSelected:false,
                  0:{
                         name: "Gate In"
                  },
                  1:{
                         name: "Gate Out"
                  },
                  2:{
                         name: "Repair Estimate"
                  },
                  /*3:{
                         name: "Lessee Approval"
                  },*/
                  3:{
                         name: "Repair Completion"
                  }
              },
              7:{
                  name:"Logs", inActive:"images/menu/L4.png" , activeIcon:"images/menu/L4a.PNG", isSelected:false,
                  0:{
                         name: "EDI Transmission Logs"
                  },
                  1:{
                         name: "Portal Processing Logs"
                  }
              },
              8:{
                      name:"Depot Inventory", inActive:"images/menu/L5.png" , activeIcon:"images/menu/L5a.PNG", isSelected:false,
              },
              9:{
                  name:"Remarketing Inventory", inActive:"images/menu/L10.png" , activeIcon:"images/menu/L10a.PNG", isSelected:false,
                  0:{
                         name: "Sale Inventory"
                  },
                  1:{
                      name: "Outstanding Releases"
                     },
                     2:{
                             name: "Outstanding Payments"
                     },
              },
             10:{
                     name: "Customer Dashboard", inActive:"images/menu/L6.png" , activeIcon:"images/menu/L6a.PNG", isSelected:false,
              },
              11:{
                     name: "Online Returns", inActive:"images/menu/L7.png" , activeIcon:"images/menu/L7a.PNG", isSelected:false,
              },
              12:{
                  name:"Approve DN / JS", inActive:"images/menu/L8.png" , activeIcon:"images/menu/L8a.PNG", isSelected:false,
                  0:{
                         name: "View DN/JS"
                  },
                  1:{
                         name: "Lessee Approval"
                  }
              },
              13:{
                  name: "DRV", inActive:"images/menu/L9.png" , activeIcon:"images/menu/L9a.PNG", isSelected:false,
              },
              
              14:{
                  name: "Unit Enquiry", inActive:"images/menu/L11.png" , activeIcon:"images/menu/L11a.PNG", isSelected:false,
              },
              15:{
                  name: "Seaco Publications", inActive:"images/menu/L12.png" , activeIcon:"images/menu/L12a.PNG", isSelected:false,
              },
              16:{
                  name: "Depot Information", inActive:"images/menu/L5.png" , activeIcon:"images/menu/L5a.PNG", isSelected:false,
              },
              17:{
                  name: "Repair Progress", inActive:"images/menu/L11.png" , activeIcon:"images/menu/L11a.PNG", isSelected:false,
              },
    },
     //Seaco System Admin - End
};

var menuClickedData = [
        
     // Seaco System Admin        
        {clicked:"Depot Dashboard", role:"seacoSystemAdmin", page:"DepotDashboard", title:"Depot Dashboard"},
        {clicked:"Releases", role:"seacoSystemAdmin", page:"Release", title:"Releases"},     
        {clicked:"Returns", role:"seacoSystemAdmin", page:"Return", title:"Returns"},
        {clicked:"Repair Estimates", role:"seacoSystemAdmin", page:"RepairEstimates", title:"Repair Estimates"},
        {clicked:"View Inventory", role:"seacoSystemAdmin", page:"Inventory", title:"View Inventory"},
        {clicked:"Inventory Reconciliation", role:"seacoSystemAdmin", page:"InventoryReconSearch", title:"Inventory Reconciliation"},
        {clicked:"Accounts Summary", role:"seacoSystemAdmin", page:"AccountsSummary", title:"Accounts Summary"},
        {clicked:"Depot Specific Documents", role:"seacoSystemAdmin", page:"DepotSpecificDocs", title:"Depot Specfic Documents"},
        {clicked:"Certificates - Single", role:"seacoSystemAdmin", page:"UpldCrtfcatSingle", title:"Upload Certificates - Single"},
        {clicked:"Certificates - Multiple", role:"seacoSystemAdmin", page:"UpldCrtfcatMultiple", title:"Upload Certificates - Multiple"},
        {clicked:"DN Pictures", role:"seacoSystemAdmin", page:"UploadDNPictures", title:"Upload DN Pictures"},
        {clicked:"Sale Pictures", role:"seacoSystemAdmin", page:"UploadDNPicturesSalesVw", title:"Upload Sale Pictures"},
        {clicked:"New Build Pictures", role:"seacoSystemAdmin", page:"uploapNewBuildPict", title:"Upload New Build Pictures"},
        
        {clicked:"Gate In Single", role:"seacoSystemAdmin", page:"AddMoveInSingle", title:"Add Movement In - Single"},
        {clicked:"Gate In Multiple", role:"seacoSystemAdmin", page:"AddMoveInMultiple", title:"Add Movement In - Multiple"},
        {clicked:"Gate Out Single", role:"seacoSystemAdmin", page:"AddMoveSingle", title:"Add Movement Out - Single"},
        {clicked:"Gate Out Multiple", role:"seacoSystemAdmin", page:"AddMoveMultiple", title:"Add Movement Out - Multiple"},
        {clicked:"Correct Movement Date", role:"seacoSystemAdmin", page:"CorrectMoveDate", title:"Correct Movement Date"},
        
        {clicked:"Repair Estimate Single", role:"seacoSystemAdmin", page:"underConstruction", title:"Repair Estimate - Single"},
        {clicked:"Repair Estimate Multiple", role:"seacoSystemAdmin", page:"underConstruction", title:"Repair Estimate - Single"},
        {clicked:"Zero Cost Estimate", role:"seacoSystemAdmin", page:"underConstruction", title:"Zero Cost Estimate"},
        {clicked:"Lessee Approval Single", role:"seacoSystemAdmin", page:"underConstruction", title:"Lessee Approval Single"},
        {clicked:"Lessee Approval Multiple", role:"seacoSystemAdmin", page:"underConstruction", title:"Lessee Approval Multiple"},
        
        /*{clicked:"Zero Cost Estimate", role:"seacoSystemAdmin", page:"ZeroCostEstimateMultiple", title:"Zero Cost Estimate"},
        {clicked:"Lessee Approval Single", role:"seacoSystemAdmin", page:"LesseeApprovalSingle", title:"Lessee Approval Single"},
        {clicked:"Lessee Approval Multiple", role:"seacoSystemAdmin", page:"LesseeApprovalMultiple", title:"Lessee Approval Multiple"},*/
        /*{clicked:"Lessee Approval Single", role:"seacoSystemAdmin", page:"LesseeApprovalSingle", title:"Lessee Approval - Single"},
        {clicked:"Lessee Approval Multiple", role:"seacoSystemAdmin", page:"LesseeApprovalMultiple", title:"Lessee Approval - Multiple"},*/
        {clicked:"Repair Completion Single", role:"seacoSystemAdmin", page:"underConstruction", title:"Repair Completion Single"},
        
       // {clicked:"Gate In", role:"seacoSystemAdmin", page:"MovInFrmLease", title:"Gate In"},
        {clicked:"Gate In", role:"seacoSystemAdmin", page:"underConstruction", title:"Gate In"},
        {clicked:"Gate Out", role:"seacoSystemAdmin", page:"underConstruction", title:"Gate Out"},
        {clicked:"Repair Estimate", role:"seacoSystemAdmin", page:"underConstruction", title:"Repair Estimate"},
        //{clicked:"Lessee Approval", role:"seacoSystemAdmin", page:"underConstruction", title:"Lessee Approval"},
        {clicked:"Repair Completion", role:"seacoSystemAdmin", page:"underConstruction", title:"Repair Completion"},
        
        {clicked:"EDI Transmission Logs", role:"seacoSystemAdmin", page:"underConstruction", title:"EDI Transmission Logs"},
        {clicked:"Portal Processing Logs", role:"seacoSystemAdmin", page:"underConstruction", title:"Portal Processing Logs"},
        
        {clicked:"Depot Inventory", role:"seacoSystemAdmin", page:"DepoInvOverview", title:"Inventory Overview"}, // Changes from InventorySearch to DepoInvOverview by Seyed Ismail
        {clicked:"Customer Dashboard", role:"seacoSystemAdmin", page:"CustomerDashboardVw", title:"Customer Dashboard"},
        {clicked:"Online Returns", role:"seacoSystemAdmin", page:"OnlineReturns", title:"Online Returns"},
        {clicked:"View DN/JS", role:"seacoSystemAdmin", page:"DN_JS", title:"View DN/JS"},
        {clicked:"Lessee Approval", role:"seacoSystemAdmin", page:"Lessee_approvel", title:"Lessee Approval"},
        {clicked:"DRV", role:"seacoSystemAdmin", page:"DepReplValue", title:"Depreciated Replacement Value (DRV)"},
        {clicked:"Sale Inventory", role:"seacoSystemAdmin", page:"SaleInvOverview", title:"Sale Inventory"},
        {clicked:"Outstanding Releases", role:"seacoSystemAdmin", page:"OutstandingReleases", title:"Outstanding Releases"},
        {clicked:"Outstanding Payments", role:"seacoSystemAdmin", page:"OutPayView", title:"Outstanding Payments"},
        {clicked:"Unit Enquiry", role:"seacoSystemAdmin", page:"UnitEnquiry", title:"Unit Enquiry"},
        {clicked:"Seaco Publications", role:"seacoSystemAdmin", page:"SeacoPublicationsVw", title:"Seaco Publications"},
        {clicked:"Depot Information", role:"seacoSystemAdmin", page:"PortsDeports", title:"Ports and Depots"},
        {clicked:"Repair Progress", role:"seacoSystemAdmin", page:"repairProgress", title:"Repair Progress Scenarios"},
        
];



