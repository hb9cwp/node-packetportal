// read .pcap and decode MRP feed from JDSU PacketPortal PRE

'use strict';

var util= require('util');
var pcap = require("pcap-parser");
var MRPbuffer = require("./MRPbuffer");


var parser = pcap.parse("./mrp1SFProbe.pcap");
//var parser = pcap.parse("./mrp1SFProbeEthernet.pcap");
//var parser = pcap.parse("./mrp5SFProbe.pcap");
//var parser = pcap.parse("./mrp5SFProbeEthernet.pcap");
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
 //console.log("capturedLength= ", p.header.capturedLength);
 var mrp= new MRPbuffer(p.data.slice(14+20+8));

 n++;
 console.log("----------------------------------------------------------------\n" + n + ":");
 //console.log("preamble= ", mrp.preamble());
 console.log("probeID= ", mrp.probeID());
 console.log("resets= ", mrp.resets(), "   retries= ", mrp.retries());
 console.log("time_s= ", mrp.time_s(), "   time_ns= ", mrp.time_ns(), "   time= ", mrp.time());
 console.log("sequence= ", mrp.sequence());
 //console.log("MRPversion= ", mrp.flagA_MRPversion());
 console.log("temp_C= ", mrp.temp_C(), "   Vcc_V= ", mrp.Vcc_V(), "   txBias_V= ", mrp.txBias_V());
 console.log("txPower_W= ", mrp.txPower_W(), "   rxPower_W= ", mrp.rxPower_W());
 console.log("filteredPacketsCopper= ", mrp.filteredPacketsCopper(), "   injectedPacketsCopper= ", mrp.injectedPacketsCopper());
 console.log("filteredPacketsFiber= ", mrp.filteredPacketsFiber(), "   injectedPacketsFiber= ", mrp.injectedPacketsFiber());
 console.log("1588 Status Valid= ", mrp.status1588_Valid(), "   Locked= ", mrp.status1588_Locked());
});

parser.on('error', function(err) {
 console.log("error:", err);
});

parser.on('end', function() {
 //dissector.close();
});

console.log("done.");

