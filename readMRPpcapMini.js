// read .pcap and decode MRPs from JDSU PacketPortal

'use strict';

var util= require('util');
var pcapp = require("pcap-parser");


//var parser = pcapp.parse("./pcap/mrp1SFProbe.pcap");
//var parser = pcapp.parse("./pcap/mrp1SFProbeEthernet.pcap");
var parser = pcapp.parse("./pcap/mrp5SFProbe.pcap");
//var parser = pcapp.parse("./pcap/mrp5SFProbeEthernet.pcap");
var n= 0;


parser.on('globalHeader', function(globalHeader) {
 console.log(globalHeader);
});


//parser.on('packetHeader', function (header) {
 // header only, without data
//}

//parser.on('packetData', function (data) {
 // data only, without header
//}

parser.on('packet', function (p) {
 // header and data
 var mrp= p.data.slice(14+20+8);
 var probeID= new Buffer(6);

 //console.log("capturedLength= ", p.header.capturedLength);
 //console.log("data= ", p.data[(14+20+8) +0],  p.data[(14+20+8) +1]);
 console.log("data= ", mrp[0],  mrp[1]);
 //console.log("probeID= ", mrp.slice(2,2+6));
 //console.log("sequence= ", mrp.readUInt16BE(8));
 mrp.copy(probeID,0,2,2+6); console.log("probeID= ", probeID);
 console.log("sequence= ", mrp.readUInt16BE(8));
 n++;
 console.log("----------------------------------------------------------------\n" + n + ":");
 //console.log(packet.frp);
 //console.log(packet.frp.time.value + "  " + packet.frp.probeID.value + "  " + packet.frp.injected.value + "  " + packet.frp.sequence.value);
 //console.log(util.inspect(packet.ip, true, null, true));
 //console.log(util.inspect(packet.dns, true, null, true));
 //console.log(util.inspect(packet.ntp, true, null, true));
 //console.log(util.inspect(packet.tcp, true, null, true));
});

parser.on('error', function(err) {
 console.log("error:", err);
});

parser.on('end', function() {
 //dissector.close();
});

//parser.parse();

//console.log(packet);
//console.log(packet.frp);
//console.log(packet);
//console.log(packet.dns);

console.log("done.");

