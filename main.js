//Slideshow
var index = 0;
var imgList = ["https://i.imgur.com/A2282DY.png", "https://i.imgur.com/9lTc7wl.jpg", "https://i.imgur.com/vPqIitb.png", 
 "https://i.imgur.com/POhy29b.png"];
$(document).ready(() => {
 	$("#vidLst").find("ul").slideToggle();

	$('#slideshow').click(()=>{
		$('#slideshow').fadeOut(600, () => {
			index += 1;
			if (index == imgList.length) {
				index = 0;
			}
			$('#slideshow').attr('src', imgList[index]).fadeIn(600);
		});
	});
	
//Video list
	$('#nav').find("li").find("a").hover(()=>{
		$(this).toggle();
	});

	$("#vidLst").find("h3").click(()=>{
		$("#vidLst").find("ul").slideToggle(200);
	});

	getVideos();

	function getVideos(){
		$.get(
			"https://www.googleapis.com/youtube/v3/channels", {
				part: 'contentDetails',
				id: 'UCqVW5Gte_r1C4Jb1Fqht6uA',
				key: 'AIzaSyCoUXrbm3F-kOaSWgeV6fhxbTP_zQ2O8c4'},
				(data) =>{
					$.each(data.items, (i, item) => {
						p = item.contentDetails.relatedPlaylists.uploads;
						getList(p);
						getVid(p);
					});
				}
		);
	};

	function getList (pl) {
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", {
			part: 'snippet',
			maxResults: 6,
			playlistId: pl,
			key: 'AIzaSyCoUXrbm3F-kOaSWgeV6fhxbTP_zQ2O8c4'},
			(data) =>{
				$.each(data.items, (i, item) => {
					$('#playLst').append('<li><a href="https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '"><img src="' + item.snippet.thumbnails.high.url + '"/></li></a>');
				});
			}
		);
	};

	function getVid (pl) {
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", {
			part: 'snippet',
			maxResults: 1,
			playlistId: pl,
			key: 'AIzaSyCoUXrbm3F-kOaSWgeV6fhxbTP_zQ2O8c4'},
			(data) =>{
				$.each(data.items, (i, item) => {
					$('#lVideo').attr('src', "https://www.youtube.com/embed/" + item.snippet.resourceId.videoId);
				});
			}
		);
	};
});
