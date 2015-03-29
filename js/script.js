SC.initialize({
	client_id: '15ea6173afa1ed744833ecd36ed39e01',
	redirect_uri: 'file:///users/justinhe/Documents/workspace/CreateYourOwnMixtape/index.html'
});

$(document).ready(function() {
	SC.connect(function() {
		SC.get('/me', function(me){
			alert('Hello, ' + (me.username));
		});
	});
	SC.get('/tracks/198244632', function(track) {
		SC.oEmbed(track.permalink_url, document.getElementById('player'));
	});
	$('#startRecording a').click(function(e) {
		$('#startRecording').hide();
		$('#stopRecording').show();
		e.preventDefault();
		SC.get('/tracks/192174172', auto_play = true);
		SC.record({
			progress: function(ms, avgPeak) {
				updateTimer(ms);
			}
		});
	});
	$('#stopRecording a').click(function(e) {
		e.preventDefault();
		$('#playBack').show();
		$('#upload').show();
		$('#stopRecording').hide();
		SC.recordStop();
	});
	$('#playBack a').click(function(e) {
		e.preventDefault();
		updateTimer(0);
		SC.recordPlay({
			progress: function(ms) {
				updateTimer(ms);
			}
		});
	});
	$('#upload a').click(function(e) {
		e.preventDefault();
		SC.connect({
			connected: function() {
				$('.status').html('Uploading...');
				SC.recordUpload({
					track: { title: 'My Codecademy recording', sharing: 'private' }
				}, function(track) {
					$('.status').html("Uploaded: <a href='" + track.permalink_url + "'>" + track.permalink_url + "</a>");
				});
			 } //swag money swag
		});
	});
});

function updateTimer(ms) {
  // update the timer text. Used when we're recording
  $('.status').text(SC.Helper.millisecondsToHMS(ms));
}
