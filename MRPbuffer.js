
'use strict';


var MRPbuffer = module.exports = function(buf) {
 this.b= buf;
 //if ((buf[0] !==0xeb) || (buf[1] !==0xeb) || (buf.length <792) || (buf.length >1040)) {
 if ((this.preamble() != 0xebeb) || (buf.length <792) || (buf.length >1040) || (this.flagA_MRPversion() !=2)) {
  console.log("Error: buffer is not an MRP!");
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

MRPbuffer.prototype.timingOffset= function() {
 var t= this.b.readUInt32BE(58);
 if ((t & 0x80000000) !=0)
  return -(t &0x7FFFFFFF);
 else
  return t;
}
MRPbuffer.prototype.timingOffset_s= function() {
 return this.timingOffset() *0.000000001;	// ns
}

MRPbuffer.prototype.M2Sdelay= function() {
 return this.b.readUInt32BE(62);
}
MRPbuffer.prototype.M2Sdelay_s= function() {
 return this.M2Sdelay() *0.000000001;	// ns
}

MRPbuffer.prototype.S2Mdelay= function() {
 return this.b.readUInt32BE(66);
}
MRPbuffer.prototype.S2Mdelay_s= function() {
 return this.S2Mdelay() *0.000000001;	// ns
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

MRPbuffer.prototype.bytesCopper= function() {
 return (this.b.readUInt16BE(72) <<32) +this.b.readUInt32BE(74);
}
MRPbuffer.prototype.bytesFiber= function() {
 return (this.b.readUInt16BE(78) <<32) +this.b.readUInt32BE(80);
}

MRPbuffer.prototype.packetsCopper= function() {
 return this.b.readUInt32BE(84);
 //return this.b.readUInt32BE(84) &0x07ffffff;
}
MRPbuffer.prototype.IPv4packetsCopper= function() {
 return this.b.readUInt32BE(88);
}
MRPbuffer.prototype.TCPpacketsCopper= function() {
 return this.b.readUInt32BE(92);
}
MRPbuffer.prototype.UDPpacketsCopper= function() {
 return this.b.readUInt32BE(96);
}
MRPbuffer.prototype.SCTPpacketsCopper= function() {
 return this.b.readUInt32BE(100);
}
MRPbuffer.prototype.ICMPpacketsCopper= function() {
 return this.b.readUInt32BE(104);
}
MRPbuffer.prototype.IPv6packetsCopper= function() {
 return this.b.readUInt32BE(108);
}

MRPbuffer.prototype.IPv4MulticastPacketsCopper= function() {
 return this.b.readUInt32BE(112);
}
MRPbuffer.prototype.IPv4BroadcastPacketsCopper= function() {
 return this.b.readUInt32BE(116);
}
MRPbuffer.prototype.IPv6MulticastPacketsCopper= function() {
 return this.b.readUInt32BE(120);
}
MRPbuffer.prototype.IPv6BroadcastPacketsCopper= function() {
 return this.b.readUInt32BE(124);
}

MRPbuffer.prototype.lt64packetsCopper= function() {
 return this.b.readUInt32BE(128);
}
MRPbuffer.prototype.lt128packetsCopper= function() {
 return this.b.readUInt32BE(132);
}
MRPbuffer.prototype.lt256packetsCopper= function() {
 return this.b.readUInt32BE(136);
}
MRPbuffer.prototype.lt512packetsCopper= function() {
 return this.b.readUInt32BE(140);
}
MRPbuffer.prototype.lt1024packetsCopper= function() {
 return this.b.readUInt32BE(144);
}
MRPbuffer.prototype.le1500packetsCopper= function() {
 return this.b.readUInt32BE(148);
}
MRPbuffer.prototype.gt1500packetsCopper= function() {
 return this.b.readUInt32BE(152);
}
// Bytes 156..159 reserved
MRPbuffer.prototype.misalignedPacketsCopper= function() {
 return this.b.readUInt32BE(160);
}

// Bytes 164..211 reserved

MRPbuffer.prototype.packetsFiber= function() {
 return this.b.readUInt32BE(212);
 //return this.b.readUInt32BE(212) &0x07ffffff;
}
MRPbuffer.prototype.IPv4packetsFiber= function() {
 return this.b.readUInt32BE(216);
}
MRPbuffer.prototype.TCPpacketsFiber= function() {
 return this.b.readUInt32BE(220);
}
MRPbuffer.prototype.UDPpacketsFiber= function() {
 return this.b.readUInt32BE(224);
}
MRPbuffer.prototype.SCTPpacketsFiber= function() {
 return this.b.readUInt32BE(228);
}
MRPbuffer.prototype.ICMPpacketsFiber= function() {
 return this.b.readUInt32BE(232);
}
MRPbuffer.prototype.IPv6packetsFiber= function() {
 return this.b.readUInt32BE(236);
}

MRPbuffer.prototype.IPv4MulticastPacketsFiber= function() {
 return this.b.readUInt32BE(240);
}
MRPbuffer.prototype.IPv4BroadcastPacketsFiber= function() {
 return this.b.readUInt32BE(244);
}
MRPbuffer.prototype.IPv6MulticastPacketsFiber= function() {
 return this.b.readUInt32BE(248);
}
MRPbuffer.prototype.IPv6BroadcastPacketsFiber= function() {
 return this.b.readUInt32BE(252);
}

MRPbuffer.prototype.lt64packetsFiber= function() {
 return this.b.readUInt32BE(256);
}
MRPbuffer.prototype.lt128packetsFiber= function() {
 return this.b.readUInt32BE(260);
}
MRPbuffer.prototype.lt256packetsFiber= function() {
 return this.b.readUInt32BE(264);
}
MRPbuffer.prototype.lt512packetsFiber= function() {
 return this.b.readUInt32BE(268);
}
MRPbuffer.prototype.lt1024packetsFiber= function() {
 return this.b.readUInt32BE(272);
}
MRPbuffer.prototype.le1500packetsFiber= function() {
 return this.b.readUInt32BE(276);
}
MRPbuffer.prototype.gt1500packetsFiber= function() {
 return this.b.readUInt32BE(280);
}
// Bytes 284..287 reserved
MRPbuffer.prototype.misalignedPacketsFiber= function() {
 return this.b.readUInt32BE(288);
}

// Bytes 292..375 reserved

MRPbuffer.prototype.filteredPacketsCopper= function(i) {
 return this.b.readUInt32BE(376+(i&0x7)*4);
}
// Bytes 408..439 reserved
MRPbuffer.prototype.filteredPacketsFiber= function(i) {
 return this.b.readUInt32BE(440+(i&0x7)*4);
}

// Bytes 472..591 reserved

MRPbuffer.prototype.filteredBytesCopper= function(i) {
 if (this.b.readUInt8(592+(i&0x7)*6) &0x80)	// invalid, undercount due to jumbo frames
  return -1;
 else
  return (this.b.readUInt16BE(592+(i&0x7)*6) <<32) +this.b.readUInt32BE(592+2+(i&0x7)*6);
}
// Bytes 640..687 reserved
MRPbuffer.prototype.filteredBytesFiber= function(i) {
 if (this.b.readUInt8(688+(i&0x7)*6) &0x80)     // invalid, undercount due to jumbo frames
  return -1;
 else
  return (this.b.readUInt16BE(688+(i&0x7)*6) <<32) +this.b.readUInt32BE(688+2+(i&0x7)*6);
}

// Bytes 736..791 reserved

