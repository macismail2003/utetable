//*-------------------------------------------------------------------
////*-------------/WEBCONTENT/JS/AUTOCOMPLETE/AUTOCMPLTEXTEND.JS
//*-------------------------------------------------------------------

//*-------------------------------------------------------------------
//*layout
//*-------------------------------------------------------------------
jQuery.sap.require("sap.ui.model.json.JSONModel");    	
jQuery.sap.declare("control.AutoCompleteValueHolder");
sap.ui.core.Control.extend("control.AutoCompleteValueHolder", { 
		    metadata : {
				properties: {
				   "codePropertyName": {type : "string", defaultValue: "code"},
				   "descriptionPropertyName": {type : "string", defaultValue: "description"},
				   "suggestValues": {type : "any", defaultValue: []},
				   "itemSelectLimit" : {type : "string", defaultValue: "100"},
				   "placeholder":{type : "string", defaultValue: ""},
				   "required": {type : "boolean", defaultValue: false},
				   "enabled": {type : "boolean", defaultValue: true},
				   "confirmEnabled": {type : "boolean", defaultValue: false},
				   "confirmMessage": {type : "string", defaultValue: ""}
				},
		        aggregations: {
		            "_layout" : {type : "sap.ui.layout.HorizontalLayout", multiple : false, visibility: "hidden"}
		        },
		        events: {
		        	"selectedItem": {},
		        	"deletedItem": {},
		        	"deletedAllItems": {},
		        	"beforDeleteItem": {}
		        	}
		    },

		    init: function() {     
		    	var oControl = this;
		    	var searchField = new sap.ui.commons.AutoComplete(this.getId() + '-searchField',{
		        	maxPopupItems: 10,
		        	displaySecondaryValues: false,
		        	placeholder: oControl.getPlaceholder(),
		        	enabled:oControl.getEnabled(),
		        	//suggest: this.autosuggest,
		        	change: function change(event) { 
		        		if (event.mParameters.selectedItem != null) {
		        			var layout = event.getSource().getParent().getParent().getAggregation("_layout");
			    			var content = layout.getContent();
			    			var repeated = false;
			    	    	if (content != null && content.length > 1) {
			    	    		for (var i=0; i<content.length-1; i++) {
			    	    			var keytext = content[i].getContent()[0].getControls()[0].mProperties.text;
			    	    			var keycontnt = content[i].getContent()[0].getControls()[0].mProperties.key;
			    	    			if(event.getSource().getSelectedKey() == keycontnt) repeated = true;
			    	    			
			    	    			if(content.length > oControl.getItemSelectLimit())repeated = true;
			    	    		}
			    	    	}
			    			
			    			if (!repeated) {
			        			var newValueField = new sap.ui.commons.FormattedTextView({
				        			//width: '100px'
				        		});
			        			newValueField.setHtmlText("<div title=\"" +event.mParameters.selectedItem.mProperties.text+ "\" class=\"autoCompleteValueHolder_valueFieldDiv\">"+event.mParameters.selectedItem.mProperties.text+" <div style='display:none'>"+event.mParameters.selectedItem.mProperties.key+"</div></div>");
			        			var newitem = new sap.ui.core.ListItem({text: event.mParameters.selectedItem.mProperties.text, key:event.mParameters.selectedItem.mProperties.key });
			        			newValueField.addControl(newitem);
				        		newValueField.addStyleClass('autoCompleteValueHolder_valueField');
				        		
				        		var newValueImage = new sap.ui.commons.Image({
				        			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIKEw06nF/eLQAAAb9JREFUKM9lkkFIFHEUxn//mf3TrJVOLjvu7phBBB0M3VyNTYg85CU6ZLfqmpAwRVBseqg1CI0OzZ47ePRkh9xQiAgWgqIOXUpNhHbBDGdFSxYX2m3+HZoNpe/yHt/73oP3vgfADHsxI8T/XCOZDuIkGHO9SWcMZKM2CnL+VMqZAGO3lgkw8rFDBe/+qMrbllsFsQhiNhZxy9kxlbetwmTQpANcgesnhy6MSF+iW9H0sw2vWtwf7u8aOHsvrCRmsvNI+e2H9Vl4rwOcgI/11dJBX5I+IJtQLU3nTCs6aDVH+L72lYVXr3NLlZ1Hb8DXp4A74C9Xay+P/9zaEeLXoFnXCdcV3nqR4ufFuw/LP7LP4fcUECrJENTqfAKqvo+/+o2atw2AsJqpKsVysOtmWxsCYAjkmXjkcVqoWx0b28xHTUBw3tuiZJm8U1puac3LPIUaALeP2c6Xnk5VAfXicEJdam3JXGw1M3MdtqqAWulLqlxvyvlnymUw3PZEYSHVpa4l4i4gADEcj7krfT3qSXu8MBCclXFNA+AqGDeP2je6dxkHyOnT/U437AMYF+Ivm5WhPW8wrGmMBIMaeBCI/wB5M5PywZXUzgAAAABJRU5ErkJggg==',
				        			press: function(event){
				        				oControl.fireBeforDeleteItem();
				        				
				        				var valueLayout = event.getSource().getParent();
        								var autoCompleteHolderLayout = event.getSource().getParent().getParent().getParent().getAggregation("_layout");
        								
        								if(oControl.getConfirmEnabled() == true){
        									sap.ui.commons.MessageBox.show(oControl.getConfirmMessage(),sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
				     							[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				     							function(result) { / * do something * /
				        							if(result == "YES"){
								        				//valueLayout[content.length-1].setPlaceholder("");
								        				autoCompleteHolderLayout.removeContent(valueLayout);
								        				oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setEnabled(true);
								        				oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setWidth('100%');
								        				oControl.fireDeletedItem({
										        			//allItems: oControl.getSelectedValues() //UNCOMMENT ON DELETE ITEM GET ALL ITEMS
										        		});
								        								        				
								        				if(oControl.getAggregation("_layout").getContent().length < 2){
								        					oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setPlaceholder(oControl.getPlaceholder());
								        				}
				        							}
				        					}, sap.ui.commons.MessageBox.Action.YES);
        								}else{
					        				//var valueLayout = event.getSource().getParent();
					        				//var autoCompleteHolderLayout = event.getSource().getParent().getParent().getParent().getAggregation("_layout");  
					        				autoCompleteHolderLayout.removeContent(valueLayout);
					        				oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setEnabled(true);
					        				oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setWidth('100%');
					        				oControl.fireDeletedItem({
							        			//allItems: oControl.getSelectedValues() //UNCOMMENT ON DELETE ITEM GET ALL ITEMS
							        		});
					        								        				
					        				if(oControl.getAggregation("_layout").getContent().length < 2){
					        					oControl.getAggregation("_layout").getContent()[oControl.getAggregation("_layout").getContent().length-1].setPlaceholder(oControl.getPlaceholder());
					        				}
        								}
				    				},
				    				width: '12px'
				        		});           		        		        		        		  
				        		newValueImage.addStyleClass('autoCompleteValueHolder_valueImage');        		
				        		
				        		var valueLayout = new sap.ui.layout.HorizontalLayout({content: [newValueField, newValueImage]});
				        		valueLayout.addStyleClass('autoCompleteValueHolder_valueLayout');
				        		
				        		layout.insertContent(valueLayout, content.length-1); //FOR INSERT NEW ITEM IN START USE 0 INSTEAD OF content.length-1);
								if(content.length == oControl.getItemSelectLimit()){
									content[content.length-1].setEnabled(false);
									//CHANGE WIDTH FOR SEARCHFEILD FOR SINGLE SELECTION
									content[content.length-1].setWidth('10%');
								}else{
									content[content.length-1].setEnabled(true);
									content[content.length-1].setWidth('100%');
								}
								var content = layout.getContent();
				        		content[content.length-1].setPlaceholder("");

				        		oControl.fireSelectedItem({
				        			newItem: {
				        				code: event.mParameters.selectedItem.mProperties.key, 
				        				description: event.mParameters.selectedItem.mProperties.text
				        			},
				        			allItems: oControl.getSelectedValues()
				        		});
			    			}

			        		var search = content[content.length-1];
			        		search.setValue('');
		        		}
		        	}
		        });
		    	searchField.addStyleClass('autoCompleteValueHolder_search');
		    	
		    	var layout = new sap.ui.layout.HorizontalLayout(this.getId() + '-valuesLayout',{allowWrapping: true});
		    	sap.ui.layout.HorizontalLayout.prototype.onclick = function(e) {
		    		if(e.srcElement == undefined) return;
		    		
		    		if(e.srcElement.className.indexOf("autoCompleteValueHolder_valuesLayout") >= 0){
		    			e.srcElement.lastChild.lastChild.focus();
		    			$('#'+e.srcElement.lastChild.lastChild.id).trigger( "click" );
		    		}
	            	/* var k = e.which || e.keyCode;
	            		if (k === jQuery.sap.KeyCodes.ENTER) {
	            			oController.LogonBtnPress();
	            		}*/
	             };
		    	
		    	layout.addContent(searchField);
		    	layout.addStyleClass('autoCompleteValueHolder_valuesLayout autoCompleteValueHolder_valuesLayoutScroll');
		    	
		        this.setAggregation("_layout", layout);
		    },
		    
		    renderer : {    	 
		        render : function(oRm, oControl) {
		    		var layout = oControl.getAggregation("_layout");
		    		if(layout.getContent().length < 2){
		    			layout.getContent()[layout.getContent().length-1].setPlaceholder(oControl.getPlaceholder());
		    			layout.getContent()[layout.getContent().length-1].setEnabled((oControl.getEnabled()));
		    		}
		            //layout.getContent()[0].setModel(oControl.getModel());
		            //var template = new sap.ui.core.ListItem({text: "{"+oControl.getDescriptionPropertyName()+"}", 
		                             //additionalText: "{"+oControl.getCodePropertyName()+"}"});
		            //layout.getContent()[0].bindItems(oControl.getPath(), template);
		            var suggestDataset = oControl.getSuggestValues();
			    	var descProp = oControl.getDescriptionPropertyName();
			    	var codeProp = oControl.getCodePropertyName();
			    	var itemsinlist = layout.getContent()[layout.getContent().length-1];
			    	if(itemsinlist.getItems().length < 1){
			    		for(var i=0; i<suggestDataset.length; i++){
			            	layout.getContent()[layout.getContent().length-1].addItem(new sap.ui.core.ListItem({text: suggestDataset[i][descProp], key:suggestDataset[i][codeProp] }));
		      			}
			    	}
		            
					//CHANGE WIDTH FOR SEARCHFEILD FOR SINGLE SELECTION
					//if(oControl.getItemSelectLimit() != "1"){
						layout.getContent()[layout.getContent().length-1].setWidth(layout.getContent()[layout.getContent().length-1].getWidth());
					//}
		    		oRm.renderControl(layout);	
		        }
		    },
		    
			addStyleClass: function(classname){
				var layoutcntrl = this.getAggregation("_layout");
				layoutcntrl.addStyleClass(classname)
			},
			
		    getSelectedValues: function() {
		    	var content = this.getAggregation("_layout").getContent();
		    	var result = [];
		    	this.getAggregation("_layout").removeStyleClass('redBorder');
		    	content[content.length-1].removeStyleClass('redBackgrond');
		    	this.getAggregation("_layout").removeStyleClass('redBackgrond');
		    	
		    	if (content != null && content.length > 1) {
		    		for (var i=0; i<content.length-1; i++) {
		    			var keytext = content[i].getContent()[0].getControls()[0].mProperties.text;
    	    			var keycontnt = content[i].getContent()[0].getControls()[0].mProperties.key;
		    			result.push({code: keycontnt, description:keytext });
		    		}
		    	}else if(this.getRequired()){
		    		this.getAggregation("_layout").addStyleClass('redBorder');
		    		this.getAggregation("_layout").addStyleClass('redBackgrond');
		    		//$('#'+content[content.length-1].sId).css('background-color', '#FAD4D4');
		    		content[content.length-1].addStyleClass('redBackgrond');
		    		content[content.length-1].setPlaceholder(this.getPlaceholder());
		    	}
		    	return result;
		    },
		  
			addholderitem: function (){
		    	console.log('suggest');
		    	this.clearSelectedValues("addholderitem");
		    	var laycontent = this.getAggregation("_layout").getContent();
		    	laycontent[laycontent.length-1].destroyItems();
		    	
		    	//this.mAggregations._layout.getContent()[0].setEnabled(this.getEnabled());
		    	//this.mAggregations._layout.getContent()[0].setPlaceholder(this.getPlaceholder());
		    	
		    	var suggestDataset = this.getSuggestValues();
		    	var descProp = this.getDescriptionPropertyName();
		    	var codeProp = this.getCodePropertyName();
		    	for(var i=0; i<suggestDataset.length; i++){
		    		laycontent[laycontent.length-1].addItem(new sap.ui.core.ListItem({text: suggestDataset[i][descProp], key:suggestDataset[i][codeProp] }));
      			}
		    },
		    
		    clearSelectedValues: function(eventFrom) {
		    	if (this.getAggregation("_layout").getContent() != null && this.getAggregation("_layout").getContent().length > 1) {
		    		while (this.getAggregation("_layout").getContent().length > 1) {
		    			this.getAggregation("_layout").removeContent(0);
		    		}
		    		//this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].setPlaceholder(this.getPlaceholder());
		    	}
		    	if(eventFrom != "addholderitem"){
		    		this.fireDeletedAllItems({});
		    	}
		    	
				this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].setWidth('100%');
				
		    	this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].setEnabled(this.getEnabled());
		    	this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].setPlaceholder(this.getPlaceholder());
		    	this.getAggregation("_layout").removeStyleClass('redBorder');
		    	this.getAggregation("_layout").removeStyleClass('redBackgrond');
		    	
		    	this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].removeStyleClass('redBackgrond');
		    },
		    
		    setHolderEnabled: function(valueBool){
		    	this.mProperties.enabled = valueBool;
		    	var content = this.getAggregation("_layout").getContent();
		    	content[content.length-1].setEnabled(this.getEnabled());
		    },
		    
		    setHolderPlaceHolder: function(textplace){
		    	this.mProperties.placeholder= textplace;
		    	var content = this.getAggregation("_layout").getContent();
		    	content[content.length-1].setPlaceholder(this.getPlaceholder());
		    	//this.mAggregations._layout.getContent()[this.mAggregations._layout.getContent().length-1].mProperties.placeholder= this.getPlaceholder();
		    },
		    
		    setHolderBorderReuqired: function(){
		    	var content = this.getAggregation("_layout").getContent();
		    	this.getAggregation("_layout").addStyleClass('redBorder');
	    		this.getAggregation("_layout").addStyleClass('redBackgrond');
	    		//$('#'+content[content.length-1].sId).css('background-color', '#FAD4D4');
	    		content[content.length-1].addStyleClass('redBackgrond');
	    		content[content.length-1].setPlaceholder(this.getPlaceholder());
		    },
		    
		    removeHolderReuqired: function(){
		          var content = this.getAggregation("_layout").getContent();
		          this.getAggregation("_layout").removeStyleClass('redBorder');
		          this.getAggregation("_layout").removeStyleClass('redBackgrond');
		          //$('#'+content[content.length-1].sId).css('background-color', '#FAD4D4');
		          content[content.length-1].removeStyleClass('redBackgrond');
		          if(content.length > 1){
		        	  content[content.length-1].setPlaceholder("");
		          }else{
		        	  content[content.length-1].setPlaceholder(this.getPlaceholder());
		          }
		        },

		        
		    destroyAllItems: function(){
		    	var laycontent = this.getAggregation("_layout");
		    	this.getAggregation("_layout").removeStyleClass('redBorder');
		    	this.getAggregation("_layout").removeStyleClass('redBackgrond');
		    	
		    	laycontent.getContent()[laycontent.getContent().length-1].removeStyleClass('redBackgrond');
		    	laycontent.getContent()[laycontent.getContent().length-1].setWidth('100%');
		    	laycontent.getContent()[laycontent.getContent().length-1].setEnabled(this.getEnabled());
		    	laycontent.getContent()[laycontent.getContent().length-1].setPlaceholder(this.getPlaceholder());
		    	laycontent.getContent()[laycontent.getContent().length-1].destroyItems();
		    	if (laycontent.getContent() != null && laycontent.getContent().length > 1) {
		    		while (laycontent.getContent().length > 1) {
		    			laycontent.removeContent(0);
		    		}
		    		//this.getAggregation("_layout").getContent()[this.getAggregation("_layout").getContent().length-1].setPlaceholder(this.getPlaceholder());
		    	}
		    },
		    
		    updateModel : function (newModel, newPath, codePropertyName, descriptionPropertyName) {
		    	this.setModel(newModel);
		    	this.setPath(newPath);
		    	this.setCodePropertyName(codePropertyName);
		    	this.setDescriptionPropertyName(descriptionPropertyName);
		    	
		    	var layout = this.getAggregation("_layout");    		
		        layout.getContent()[0].setModel(this.getModel());
		        
		        var template = new sap.ui.core.ListItem({
		                                                 text: "{"+this.getDescriptionPropertyName()+"}", 
		                                                 additionalText: "{"+this.getCodePropertyName()+"}"
		                                               });
		        layout.getContent()[0].bindItems(this.getPath(), template);     
		    },
		    
		});




