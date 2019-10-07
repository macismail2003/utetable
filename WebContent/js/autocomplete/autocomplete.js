//*-------------------------------------------------------------------
////*-------------/WEBCONTENT/JS/AUTOCOMPLETE/AUTOCOMPLETE.JS
//*-------------------------------------------------------------------

//*-------------------------------------------------------------------
//*layout
//*-------------------------------------------------------------------
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.ui.commons.AutoComplete');
jQuery.sap.require('sap.ui.commons.library');
jQuery.sap.require('sap.ui.commons.ComboBox');
sap.ui.commons.ComboBox.extend('sap.ui.commons.AutoComplete', {
	metadata : {
		interfaces : [ 'sap.ui.commons.ToolbarItem' ],
		publicMethods : [ 'setFilterFunction' ],
		library : 'sap.ui.commons',
		properties : {
			'enableScrolling' : {
				type : 'boolean',
				group : 'Misc',
				defaultValue : true
			},
			'showListExpander' : {
				type : 'boolean',
				group : 'Misc',
				defaultValue : false
			}
		},
		events : {
			'suggest' : {},
			'afterClearText' : {}
		}
	}
});
sap.ui.commons.AutoComplete.M_EVENTS = {
	'suggest' : 'suggest',
	'afterClearText' :'afterClearText' 
};
jQuery.sap.require('jquery.sap.strings');
sap.ui.commons.AutoComplete._DEFAULTFILTER = function(v, i) {
	var abc = jQuery.sap.startsWithIgnoreCase(i.getText(), v);
	var returnval = false;
	if(i.getText().toLowerCase().indexOf(v.toLowerCase()) >= 0){
		returnval = true;
	}
	return returnval;
};
sap.ui.commons.AutoComplete.prototype.init = function() {
	sap.ui.commons.ComboBox.prototype.init.apply(this, arguments);
	this.mobile = false;
	this._filter = sap.ui.commons.AutoComplete._DEFAULTFILTER
};
sap.ui.commons.AutoComplete.prototype.exit = function() {
	if (this._oListBox) {
		this._oListBox.removeAllItems()
	}
	sap.ui.commons.ComboBox.prototype.exit.apply(this, arguments)
};
sap.ui.commons.AutoComplete.prototype.setFilterFunction = function(f) {
	if (typeof (f) == 'function') {
		this._filter = f
	} else {
		this._filter = sap.ui.commons.AutoComplete._DEFAULTFILTER
	}
};
/*sap.ui.commons.AutoComplete.prototype.onfocusin = function(e) {
	//alert('onfocusin');
	//this._sTypeAhead = null;
	//this._sWantedSelectedKey = undefined;
	//this._sWantedSelectedItemId = undefined;
	//this.autocmplfocucunt = 0;
	//alert(this.getProperty('selectedKey'));
	console.log('onfocusin' + this.autocmplfocucunt);
	this._sTypedChars = jQuery(this.getInputDomRef()).val();
	this.$().addClass('sapUiTfFoc');
	if((this._sTypedChars == '') && (this.autocmplfocucunt == 0)){
		this._fireLiveChange({liveValue : this._sTypedChars});
		this.autocmplfocucunt = 1;
	}
};*/

sap.ui.commons.AutoComplete.prototype.onclick = function(e) {
	//if(this.sId != undefined){
		if((this.getEnabled()) && (this.getEditable())){
			this.$().addClass('sapUiTfFoc');
			this._fireLiveChange({liveValue : this._sTypedChars});
		}
	//}
};
sap.ui.commons.AutoComplete.prototype.onkeyup = function(e) {
	var k = e.which || e.keyCode;
	if (k === jQuery.sap.KeyCodes.ESCAPE) {
		sap.ui.commons.TextField.prototype.onkeypress.apply(this, arguments);
		this.getInputDomRef().value = '';
		this._sTypedChars = '';
		jQuery(this.getInputDomRef()).removeAttr('aria-posinset');
	}else if((k === jQuery.sap.KeyCodes.ARROW_DOWN) || (k === jQuery.sap.KeyCodes.ARROW_UP) || (k === jQuery.sap.KeyCodes.ARROW_LEFT)
			|| (k === jQuery.sap.KeyCodes.ARROW_RIGHT) || (k === jQuery.sap.KeyCodes.ENTER)){
		// SKIP FILTER FOR ABOVE CONDITION
	}else{
		this._fireLiveChange({liveValue : this._sTypedChars});
		
		/*if(this._oListBox.mAggregations.items.length <1){
			this.getInputDomRef().value = '';
			this._sTypedChars = '';
		}*/
	}
};

sap.ui.commons.AutoComplete.prototype.onkeypress = function(e) {
	/*var k = e.which || e.keyCode;
	if (k === jQuery.sap.KeyCodes.ESCAPE) {
		sap.ui.commons.TextField.prototype.onkeypress.apply(this, arguments);
		this.getInputDomRef().value = '';
		this._sTypedChars = '';
		jQuery(this.getInputDomRef()).removeAttr('aria-posinset')
	}*/
};

/*sap.ui.commons.AutoComplete.prototype.onfocusout = function(e) {
	console.log('onfoucout event' );
	if(this._oListBox.getSelectedIndex() < 0){
		console.log('list clear _handleClosed' );
		this.setValue('');
		this.getInputDomRef().value = '';
		this._sTypedChars = '';
	}
};*/

(function() {
	function g(a, I) {
		var d = a.getAriaDescribedBy();
		var D = '';
		for ( var i = 0; i < d.length; i++) {
			D += d[i];
			if (i < d.length - 1) {
				D += ' '
			}
		}
		if (I) {
			D += ' ' + a.getId() + '-ariaLbl'
		}
		return D
	}
	;
	function u(a) {
		var $ = jQuery(a.getInputDomRef());
		var d = g(a, false);
		if (d.length > 0) {
			$.attr('aria-describedby', d)
		} else {
			$.removeAttr('aria-describedby')
		}
		$.removeAttr('aria-posinset');
		$.removeAttr('aria-setsize')
	}
	;
	sap.ui.commons.AutoComplete.prototype._close = function() {
		// = 0;
		//console.log('_close event');
		u(this);
		if(this._oListBox.getSelectedIndex() < 0){
			console.log('list clear _handleClosed' );
			this.setValue('');
			this.getInputDomRef().value = '';
			this._sTypedChars = '';
			this.fireAfterClearText({});
		}
		sap.ui.commons.ComboBox.prototype._close.apply(this, arguments);
	};
	sap.ui.commons.AutoComplete.prototype._handleClosed = function() {
		u(this);
		//console.log('_handleClosed event' );
		if((this._oListBox.getSelectedIndex() < 0) && (this.sId.indexOf('searchField') > -1)
				&& ((this.getValue() != '') || (this._sTypedChars != ''))){
			//console.log('list clear _handleClosed' );
			this.setValue('');
			this.getInputDomRef().value = '';
			this._sTypedChars = '';
			this.fireAfterClearText({});
		}
		sap.ui.commons.ComboBox.prototype._handleClosed.apply(this, arguments)
	};
	sap.ui.commons.AutoComplete.prototype.onAfterRendering = function() {
		if(this.getShowListExpander())
			$('#'+this.sId).prepend('<div id="' + this.sId +'-icon" unselectable="on" role="presentation" class="sapUiTfComboIcon"></div>');
		
		sap.ui.commons.ComboBox.prototype.onAfterRendering.apply(this,
				arguments);
		jQuery(this.getInputDomRef()).removeAttr('aria-setsize');
	};
	sap.ui.commons.AutoComplete.prototype._prepareOpen = function(l) {
		var $ = jQuery(this.getInputDomRef());
		var d = g(this, true);
		$.attr('aria-describedby', d);
		$.removeAttr('aria-posinset')
	};
	sap.ui.commons.AutoComplete.prototype._fireLiveChange = function(e) {
		var f = false;
		//console.log('_fireLiveChange');
		if (!this.getEnabled() || !this.getEditable()) {
			this._close()
		} else {
			this._sTypedChars = jQuery(this.getInputDomRef()).val();
			switch (e.type) {
			case 'keyup':
				if (!sap.ui.commons.ComboBox._isHotKey(e)) {
					var k = e.which || e.keyCode;
					if (k === jQuery.sap.KeyCodes.ESCAPE) {
						this._close();
						break
					} else {
						f = true
					}
				} else {
					break
				}
			default:
				r(this);
				f = true
			}
		}
		if (f) {
			this.fireSuggest({
				suggestValue : this._sTypedChars
			})
		}
		sap.ui.commons.ComboBox.prototype._fireLiveChange
				.apply(this, arguments)
	};
	sap.ui.commons.AutoComplete.prototype._doTypeAhead = function() {
		this._sTypeAhead = null;
		this._sWantedSelectedKey = undefined;
		this._sWantedSelectedItemId = undefined;
		this._sTypedChars = jQuery(this.getInputDomRef()).val();
		r(this)
	};
	sap.ui.commons.AutoComplete.prototype.getItems = function() {
		return this.getAggregation('items', [])
	};
	sap.ui.commons.AutoComplete.prototype.insertItem = function(i, I) {
		this.insertAggregation('items', I, i, true);
		r(this);
		return this
	};
	sap.ui.commons.AutoComplete.prototype.addItem = function(i) {
		this.addAggregation('items', i, true);
		r(this);
		return this
	};
	sap.ui.commons.AutoComplete.prototype.removeItem = function(i) {
		var a = this.removeAggregation('items', i, true);
		r(this);
		return a
	};
	sap.ui.commons.AutoComplete.prototype.removeAllItems = function() {
		var a = this.removeAllAggregation('items');
		r(this);
		return a
	};
	sap.ui.commons.AutoComplete.prototype.indexOfItem = function(i) {
		return this.indexOfAggregation('items', i)
	};
	sap.ui.commons.AutoComplete.prototype.destroyItems = function() {
		this.destroyAggregation('items', true);
		r(this);
		return this
	};
	sap.ui.commons.AutoComplete.prototype.setEnableScrolling = function(e) {
		this.setProperty('enableScrolling', e, true);
		if (this.oPopup && this.oPopup.isOpen()) {
			r(this)
		}
		return this
	};
	function r(a) {
		if (!a.getDomRef() || !a.$().hasClass('sapUiTfFoc')) {
			return false
		}
		var I, b = a.getItems(), f = a._sTypedChars //NEED TO CHANGE 
				&& a._sTypedChars.length > 0, l = a._getListBox(), m = a
				.getMaxPopupItems(), s = a.getEnableScrolling(), h = [];
		/*if (!f) {
			a._close();
			return
		}*/
		l.removeAllItems();
		l.clearSelection();
		for ( var i = 0; i < b.length; i++) {
			I = b[i];
			if (!I.__CLONE) {
				I.__CLONE = I.clone(I.getId() + '-CLONE', null, {
					cloneBindings : false
				});
				I.__origexit = I.exit;
				I.exit = function() {
					this.__CLONE.destroy();
					delete this.__CLONE;
					this.exit = this.__origexit;
					delete this.__origexit;
					if (typeof this.exit === 'function') {
						this.exit.apply(this, arguments)
					}
				}
			}
			if ((a._filter(a._sTypedChars, I)) //MAKE CHANGES 
					&& (s || (!s && h.length < m))) {
				h.push(I.__CLONE)
			}
		}
		var c = h.length;
		if (c > 0) {
			if (a._sort) {
				h.sort(function(o, d) {
					if (o.getText() > d.getText())
						return 1;
					if (o.getText() < d.getText())
						return -1;
					return 0
				})
			}
			for ( var i = 0; i < c; i++) {
				l.addItem(h[i])
			}
			l.setVisibleItems(m < c ? m : c);
			if (!a.oPopup || !a.oPopup.isOpen()) {
				a._open()
			}
		} else {
			a._close()
		}
	}
})();
sap.ui.commons.AutoComplete.prototype.setListBox = function() {
	return this
};
sap.ui.commons.AutoComplete.prototype.setSelectedKey = function() {
	return this
};
sap.ui.commons.AutoComplete.prototype.setSelectedItemId = function() {
	return this
};

// @
// sourceURL=http://localhost:56916/autocomplete/resources/sap/ui/commons/library-preload.json/sap/ui/commons/AutoComplete.js




