/*
	MIT License

	Copyright (c) 2016 SpaceCats/SpaceCats64	

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:	

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.	

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
let binStream = function(ab){
	this.buff = ab;
	this.dview = new DataView(ab);
	this.anchor = 0;
	this.decoder = new TextDecoder('ascii');
	this.encoder = new TextEncoder('ascii');
	this.seek = function(off, flag){
		if (flag == "cur") {this.anchor += off;}
		if (flag == "begin") {this.anchor = off;}
	}
	this.readInt16 = function(){
		ret = this.dview.getInt16(this.anchor, false);
		this.anchor += 2;
		return ret;
	}
	this.readBytes = function(n){
		ret = new Uint8Array(n);
		for (var i = 0; i < n; i++) {
			ret[i] = this.dview.getUint8(this.anchor);
			this.anchor += 1;
		}
		return ret;
	}
	this.readHexColor = function(){
		st = "#";
		for (var i = 0; i < 4; i++) {
			st += this.dview.getUint8(this.anchor).toString(16);
			this.anchor += 1;
		}
		return st;
	}
	this.readString = function(strLen){
		ret = this.decoder.decode(new DataView(this.buff, this.anchor, strLen));
		this.anchor += strLen;
		return ret;
	}
	this.readInt32 = function(){
		ret = this.dview.getInt32(this.anchor, false);
		this.anchor += 4;
		return ret
	}
	this.writeInt32 = function(v){
		this.dview.setInt32(this.anchor,v, false);
		this.anchor += 4;
	}
	this.writeInt16 = function(v){
		this.dview.setInt16(this.anchor,v, false);
		this.anchor += 2;
	}
	this.writeBytes = function(v, count){
		for (var i = 0; i < count; i++) {
			this.dview.setUint8(this.anchor, v[i]);
			this.anchor += 1;
		}
	}
	this.writeHexColor = function(str){
		color = str.slice(1, str.length);
		r = str.slice(1, 3);
		g = str.slice(3, 5);
		b = str.slice(5, 7);
		this.dview.setUint8(this.anchor, parseInt(r, 16));
		this.anchor += 1;
		this.dview.setUint8(this.anchor, parseInt(g, 16));
		this.anchor += 1;
		this.dview.setUint8(this.anchor, parseInt(b, 16));
		this.anchor += 1;
		this.dview.setUint8(this.anchor, parseInt('FF', 16));
		this.anchor += 1;
	}
	this.writeString = function(str){
		s = this.encoder.encode(str);
		for (var i = 0; i < s.length; i++) {
			this.dview.setUint8(this.anchor, s[i]);
			this.anchor += 1;
		}
	}
}