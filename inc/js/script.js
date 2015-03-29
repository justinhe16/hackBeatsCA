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
	SC.get('/tracks/198204783', function(track) {
		SC.oEmbed(track.permalink_url, document.getElementById('player'));
	});
});
