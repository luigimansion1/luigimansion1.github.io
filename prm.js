let getVal = function(len, nm, d){
	if (len == 2) {
		return d.readInt16()
	}
	if (len == 4) {
		if (nm.includes("Color")) {
			return d.readHexColor();
		}
		return d.readInt32();
	}
}

let setVal = function(p, d){
	if (p.valen == 2) {
		d.writeInt16(p.value);
	}
	if (p.valen == 4) {
		if (p.name.includes("Color")) {
			d.writeHexColor(p.value);
		}
		if (!p.name.includes("Color")) {
			d.writeInt32(p.value);
		}
	}
}

let param = function(d){
	this.pos = d.anchor;
	this.hash = d.readBytes(2);
	this.nl = d.readInt16();
	this.name = d.readString(this.nl);
	this.valen = d.readInt32();
	this.value = getVal(this.valen, this.name, d);
	this.writeParam = function(bw) {
		bw.writeBytes(this.hash, 2);
		bw.writeInt16(this.nl);
		bw.writeString(this.name);
		bw.writeInt32(this.valen);
		setVal(this, bw);
	};
}


let loadParam = (id)=>{
	$('#name').html(prms[id].name);
	$('#vlen').html(prms[id].valen);
	$('#pVal').val(prms[id].value);
	if (prms[id].name.includes("Color")) {
		$('#colorPreview').css("background-color", prms[id].value);
	}
	curNode = id;
}

let prms = [];
let pCount = 0;
let curNode = 0;
let fileLength = 0;
$(document).ready(()=>{
	document.getElementById('prmFile').addEventListener('change', 
	(e)=>{
		let reader = new FileReader();
		reader.onload = (event)=>{
			$('#params').empty();
			prms = [];
			prm = reader.result;
			dv = new binStream(prm);
			prmCount = dv.readInt32();
			pCount = prmCount;
			fileLength = prm.byteLength;
			pCount = prmCount;
			console.log(fileLength);
			for (var i = 0; i < prmCount; i++) {
				prms.push(new param(dv));
			}
			i = -1;
			function load(){
				if (i++ < prmCount) {
					$('#params').append('<td width="150" height="150" class="prop" id="'+i+'" onclick="loadParam(this.id)">' + prms[i].name + '</td>');
					$('#'+i).hide().fadeIn(300);
					setTimeout(load, 50);
				}
			}
			load();
		};
		reader.readAsArrayBuffer(document.getElementById('prmFile').files[0]);
	});
	$("#save").click(()=>{
		let tempBuffer = new ArrayBuffer(fileLength);
		let writer = new binStream(tempBuffer);
		writer.writeInt32(pCount);
		for(var i = 0; i < prms.length; i++){
			prms[i].writeParam(writer);
		}
		let blob = new Blob([writer.dview]);
		saveAs(blob, ($('#savename').val()+".prm"));
	});
	$('#pVal').change(()=>{
		if (prms.length != 0) {
			prms[curNode].value = $('#pVal').val();
			if (prms[curNode].name.includes("Color")) {
				$('#colorPreview').css("background-color", prms[curNode].value);
			}
		}
	});
});