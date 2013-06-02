
'use strict';


var MRPbuffer = module.exports = function(buf) {
 this.b= buf;
 //if ((buf[0] !==0xeb) || (buf[1] !==0xeb) || (buf.length <792) || (buf.length >1040)) {
 if ((this.preamble() != 0xebeb) || (buf.length <792) || (buf.length >1040) || (this.flagA_MRPversion() !=2)) {
  console.log("not an MRP!");
  this.b= '';
 }
}

MRPbuffer.prototype.preamble= function() {
 //console.log("first two Bytes", this.b[0], this.b[1]);
 //return this.b.slice(0,2);
 return this.b.readUInt16BE(0);
}

MRPbuffer.prototype.probeID= function() {
 console.log("probeID= ", this.b.slice(2,2+6));
 //return this.b.slice(2,2+6);
 return (this.b.readUInt16BE(2) <<32) +this.b.readUInt32BE(4);
}

MRPbuffer.prototype.sequence= function() {
 return this.b.readUInt16BE(8);
}

MRPbuffer.prototype.resets= function() {
 return this.b.readUInt16BE(10);
}

MRPbuffer.prototype.retries= function() {
 return this.b.readUInt16BE(12);
}

MRPbuffer.prototype.flagA= function() {
 return this.b.readUInt16BE(14);
}
MRPbuffer.prototype.flagA_MRPversion= function() {
 return (this.flagA() >>12) &0x0f;
}
MRPbuffer.prototype.flagA_HWmajorVersion= function() {
 return (this.flagA() >>7) &0x07;
}
MRPbuffer.prototype.flagA_HWminorVersion= function() {
 return this.flagA() &0x7f;
}

MRPbuffer.prototype.time_s= function() {
 return this.b.readUInt32BE(16);
}
MRPbuffer.prototype.time_ns= function() {
 return this.b.readUInt32BE(20);
}
MRPbuffer.prototype.time= function() {
 // Date() takes as input Unix timestamp in ms 
 //return new Date((this.time_s() +this.time_ns()/1000000000) *1000);
 return new Date(this.time_s()*1000 +this.time_ns()/1000000);
}

// Bytes 24..31 reserved

MRPbuffer.prototype.temp= function() {
 return this.b.readInt16LE(32);
}
MRPbuffer.prototype.temp_C= function() {
 return this.temp() /256;		// 1/256 degC
}

MRPbuffer.prototype.Vcc= function() {
 return this.b.readUInt16BE(34);
}
MRPbuffer.prototype.Vcc_V= function() {
 return this.Vcc() *0.0001;		// 100 uV
}

MRPbuffer.prototype.txBias= function() {
 return this.b.readUInt16BE(36);
}
MRPbuffer.prototype.txBias_V= function() {
 return this.txBias() *0.000002;	// 2 uV
}

MRPbuffer.prototype.txPower= function() {
 return this.b.readUInt16BE(38);
}
MRPbuffer.prototype.txPower_W= function() {
 return this.txPower() *0.0000001;	// 0.1 uW
}

MRPbuffer.prototype.rxPower= function() {
 return this.b.readUInt16BE(40);
}
MRPbuffer.prototype.rxPower_W= function() {
 return this.rxPower() *0.0000001;	// 0.1 uW
}

MRPbuffer.prototype.filteredPacketsCopper= function() {
 return this.b.readUInt32BE(42);
}
MRPbuffer.prototype.injectedPacketsCopper= function() {
 return this.b.readUInt32BE(46);
}
MRPbuffer.prototype.filteredPacketsFiber= function() {
 return this.b.readUInt32BE(50);
}
MRPbuffer.prototype.injectedPacketsFiber= function() {
 return this.b.readUInt32BE(54);
}


MRPbuffer.prototype.status1588= function() {
 return this.b.readUInt16BE(70);
}
MRPbuffer.prototype.status1588_Valid= function() {
 return (this.status1588() &0x0100) !=0;
}
MRPbuffer.prototype.status1588_Locked= function() {
 return (this.status1588() &0x0001) !=0;
}

