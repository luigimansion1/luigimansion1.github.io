$(document).ready(()=>{
	$("#LMB").hide();
	$("#BGM").hide();
	$("#BBG").hide();

	$("#dTitle").click(()=>{
		$("#LMB").slideToggle(200);
	});
	$("#bTitle").click(()=>{
		$("#BGM").slideToggle(200);
	});
	$("#gTitle").click(()=>{
		$("#BBG").slideToggle(200);
	});
});