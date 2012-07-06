$(document).ready(function() {

	// overwrite some alert globals
	$.alertGlobals.title = 'Twitter Bootstrap Modal Wrapper';

	// simple message
	$.alert('You are <span class="label label-success">Ready!</span> to go');

	// full alert
	var confirmCount = 0;
	$('#alert').on('click', function() {

		$('#full').alert({
			title: null,
			fade: true,
			dismiss: 'Close',
			confirm: 'Great!',
			confirmClass: 'btn-success',
			cancelClass: 'btn-danger',
			onDismiss: function() {
				alert('Hope you liked it!');
			},
			onConfirm: function() {
				if (confirmCount++ == 0) {
					alert('Please say it again :-)');
					return false;
				} else {
					alert('Thanks!');
				}
			},
			onHide: function() {
				confirmCount = 0;
			},
			buttons: [{
				label: 'Custom button',
				cssClass: 'btn-warning',
				onClick: function() {
					alert('Click the other buttons');
				}
			}]
		});

	});

});
