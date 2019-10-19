let iconSet = 1;
textColor = $('#textColor').prop('0');

let preveiw = function(icoUrl, winColor, index){
	this.icon = icoUrl;
	this.color = winColor;
	this.index = index+1;	//Fixes index 0
}

let wins = [
new preveiw('http://i.imgur.com/LcuiTAS.png', '#a727a5', 0), 	//Unknown
new preveiw('http://i.imgur.com/zm9l6aq.png', '#65c1e0', 1), 	//E.Gadd
new preveiw('http://i.imgur.com/zHgzEsn.png', '#d1b81d', 2), 	//Gold Ghost
new preveiw('http://i.imgur.com/UT6NqKv.png', '#35c727', 3), 	//Luigi
new preveiw('http://i.imgur.com/63euRUe.png', '#8f53d3', 4),	//Boo
new preveiw('http://i.imgur.com/2MEmr5L.png', '#d40013', 5),	//Bowser
new preveiw('http://i.imgur.com/LcuiTAS.png', '#162bec', 6),	//Chauncy
new preveiw('http://i.imgur.com/a7RTpAf.png', '#d7514c', 7),	//Mario
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 8),	//Lydia
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 9),	//Lydia
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 10),	//Madame Clairvoya
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 11),	//Nana
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 12),	//Twins
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 13),	//Vincent Van Gore
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 14),	//Sue Pea
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 15),	//Shivers
new preveiw('http://i.imgur.com/xgTLsuw.png', '#3f92f1', 16),	//Green Toad
new preveiw('http://i.imgur.com/Q105NxU.png', '#3f92f1', 17),	//Red Toad
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 18),	//Jarvis
new preveiw('http://i.imgur.com/a7RTpAf.png', '#139729', 19),	//Sir Weston
new preveiw('http://i.imgur.com/LcuiTAS.png', '#ee7dce', 20),	//Mario Item
];


let colors = [
'white', 		//White
'#5aff67', 		//Green
'#d14949', 		//Red
'#ffb45a', 		//Orange
'black', 		//Black
'#1979e6', 		//Blue
'#1de2da', 		//Light Blue
'yellow'		//Yellow
];

let updatePreview = (win, textColor)=>{
	$('#msgVeiw').css('background-color', win.color);
	$('#icon').attr('src', win.icon);
	$('#msgVeiw').css('color', colors[textColor]);
	iconSet = win.index-1
}

let propCheck = (bool, tex)=>{
	return (bool ? tex:"")
}

//also just a small bug from the original
//that color setting for the text should be after the say command
//just change the order it gets formatted in js
//-spacey
let getText = (fCsv, tCol, tex, line)=>{
	return ( !fCsv ? '<COLOR>('+(tCol+1)+')<SAY>'+tex :"<SPEAK>("+line+")")
}


//Generate Switch INCOMPLETE
let genCases = (input)=>{
	cases = input.split("/");
	choice = "<CHOICE>";
	for (var i = 0; i < cases.length; i++) {
		choice += ("'"+cases[i]+"'");
	}
	choice += ("<LISTEND>\n");
	for(var i = 0; i < cases.length; i++){
		choice += ("<CASE>'"+cases[i]+"'\n");
	}
	return choice;
}

$(document).ready(()=>{
	$('#betaFeatures').hide(); 
	//$('#showBeta').hide();		//remove for access
	$('#srcCsv').hide();
	$("#showBeta").click(()=>{
		$('#betaFeatures').toggle(150);
	});
	$("#fromCsv").click(()=>{
		$('#srcSay').toggle(150);
		$('#srcCsv').toggle(150);
	});
	$("#genSwitch").click(()=>{
		$("#msgTag").val(genCases($('#cases').val()));
	});
	$("#gen").click(()=>{
		winPos = $('#winPos').prop('selectedIndex');
		winColor = $('#winColor').prop('selectedIndex');
		textColor = $('#textColor').prop('selectedIndex');
		wait = $('#wait').prop('checked');
		text = $('#pText').val();
		csvLine = $('#csvLine').val();
		$("#msgVeiw").slideToggle(300);
		setTimeout(()=>{
			updatePreview(wins[winColor], textColor);
			$("#sample").text(text);
			$("#msgVeiw").slideToggle(300);
			$("#msgTag").val(propCheck($('#lock').prop('checked'), "<LUIGISTOP>\n") + 
			'<WINDOW>('+winPos+')<COLOR>('+iconSet+')\n'+ getText($('#fromCsv').prop('checked'), textColor, text, csvLine) +
			'\n'+propCheck(wait, "<ANYKEY>\n")+'<CLOSEWINDOW>'+propCheck($('#lock').prop('checked'), "\n<LUIGIFREE>"));
		}, 300);
	});
});
