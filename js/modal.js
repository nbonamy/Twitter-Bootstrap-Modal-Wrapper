
// define some globals for alerts
$.alertGlobals = {
	title: null,
	fade: false,
	confirm: 'OK',
	dismiss: 'Cancel',
	confirmClass: 'btn-primary',
	cancelClass: ''
};

(function( $ ) {
  
  // show alert
  // msg: can be a text or a jquery selector
  // opts:
  //   title:        title of modal (default null)
  //   fade:         fade modal on show/hide (default false)
  //	 confirm:      label of confirm button (default OK)
  //   dismiss:      label of dismiss button (default Cancel)
  //   confirmClass: CSS class of the confirm button (default btn-primary)
  //   cancelClass:  CSS class of the cancel button (default empty)
  //   noDismiss:    force that no dismiss button is displayed
  //   onDismiss:    function called when modal is dismissed
  //   onConfirm:    function called when modal is confirmed
  //                 return false to prevent modal from closing
  //   onHide:       called when dialog is finished being hidden from the user
  //   buttons:      additional buttons = array of objects with 3 properties
  //                                      label, cssClass, onClick
  //                 onClick should return true to close modal
  $.alert = function(msg, opts) {
  	
  	// defaults
  	var settings = {
  		title: $.alertGlobals.title,
  		fade: $.alertGlobals.fade,
  		confirm: $.alertGlobals.confirm,
  		dismiss: $.alertGlobals.cancel,
  		confirmClass: $.alertGlobals.confirmClass,
  		cancelClass: $.alertGlobals.cancelClass,
  		noDismiss: false,
  		onDismiss: null,
  		onConfirm: null,
  		onHide: null,
  		buttons: []
  	};
  	
  	// take care of opts
  	if (typeof(opts) == 'function') {
  		
  		// simple opts with onConfirm only
  		opts = {
  				onConfirm: opts
  		};
  		
  	} else if (opts == null) {
  		opts = {};
  	}

		// now merge
		settings = $.extend(settings, opts);

		// by default confirm dismisses
		var showDismiss = true;
		if (settings.onConfirm == null) {
			showDismiss = false;
			settings.onConfirm = function() {
				modal.modal('hide');
			};
		}
		
  	// build markup
  	var modal = $('<div class="modal"></div>');
  	if (settings.fade === true) {
  		modal.addClass('fade');
  	}
  	
  	// event handler
  	if (settings.onHide != null) {
  		modal.on('hidden', settings.onHide);
  	}
  	
  	// is show dismiss overridden?
  	showDismiss = (showDismiss && settings.noDismiss != true);

  	// header
  	if (settings.title != null) {
  		var header = $('<div class="modal-header"></div>');
  		if (showDismiss) {
  			header.append('<button type="button" class="close" data-dismiss="modal">×</button>');
  		}
  		header.append('<h3>'+settings.title+'</h3>');
  		modal.append(header);
  	}
  	
  	// add buttons in footer
  	var footer = $('<div class="modal-footer"></div>');
  	
  	// start with additional buttons
  	if (settings.buttons instanceof Array) {
    	for (var i=0; i<settings.buttons.length; i++) {
    		var btn = settings.buttons[i];
  	  	var button = $('<a href="#" class="btn '+btn.cssClass+'">'+btn.label+'</a>');
  	  	button.on('click', function() {
  	  		if (btn.onClick != null) {
  	  			if (btn.onClick() === true) {
  	  				modal.modal('hide');
  	  			}
  	  		}
  	  	});
  	  	footer.append(button);
  		}
  	}

  	// dismiss
  	if (showDismiss) {
	  	var dismiss = $('<a href="#" class="btn '+settings.cancelClass+'" data-dismiss="modal">'+settings.dismiss+'</a>');
	  	dismiss.on('click', function() {
	  		if (settings.onDismiss != null) {
	  			settings.onDismiss();
	  		}
	  	});
  	}
  	
  	// confirm
  	var confirm = $('<a href="#" class="btn '+settings.confirmClass+'">'+settings.confirm+'</a>');
  	confirm.on('click', function() {
  		if (settings.onConfirm != null) {
  			if (settings.onConfirm() !== false) {
  				modal.modal('hide');
  			}
  		}
  	});
  	
  	// done with footer
  	footer.append(dismiss);
  	footer.append(confirm);

  	// body depends
  	var body = $('<div class="modal-body"></div>');
  	if (typeof(msg) == 'string') {
  		body.append('<p>'+msg+'</p>');
  	} else {
  		msg.show();
  		body.append(msg);
  	}
  	
  	// tooltip on body
  	body.find('.modal-popover').popover();
  	body.find('.modal-tooltip').tooltip();
  	
  	// done
  	modal.append(body);
  	modal.append(footer);
  	modal.modal();
  	
  };
  
  // shortcut
  $.fn.alert = function(opts) {
  	$.alert(this, opts);
  	return this;
  };
		
})( jQuery );
