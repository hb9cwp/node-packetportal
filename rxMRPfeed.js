'use strict';

var util= require('util');
var dgram = require("dgram");
var MRPbuffer = require("./MRPbuffer");

var rxIP= '0.0.0.0';
var rxPort= 5003;

var n= 0;

var rx= dgram.createSocket("udp6", function (msg, tx) {
 n++;
 console.log("----------------------------------------------------------------\n" + n + ":");
 console.log('got message from ' +tx.address +':' +tx.port);
 console.log('dataLength= ' +tx.size);
 console.log(util.inspect(msg));

 var mrp= new MRPbuffer(msg);
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
 console.log("timingOffset= ", mrp.timingOffset(), "   timingOffset= ", mrp.timingOffset_s(),
             "   M2S -(M2S+S2M)/2= ", mrp.M2Sdelay() -(mrp.M2Sdelay()+mrp.S2Mdelay())/2);
 console.log("M2Sdelay= ", mrp.M2Sdelay(), "   M2Sdelay_s= ", mrp.M2Sdelay_s());
 console.log("S2Mdelay= ", mrp.S2Mdelay(), "   S2Mdelay_s= ", mrp.S2Mdelay_s());
 console.log("1588 Status Valid= ", mrp.status1588_Valid(), "   Locked= ", mrp.status1588_Locked());
 console.log("bytesCopper= ", mrp.bytesCopper(), "   bytesFiber= ", mrp.bytesFiber());
 console.log("packetsCopper= ", mrp.packetsCopper());
  console.log(" IPv4= ", mrp.IPv4packetsCopper(), "   TCP= ", mrp.TCPpacketsCopper(), "   UDP= ", mrp.UDPpacketsCopper(),
              " SCTP= ", mrp.SCTPpacketsCopper(), "   ICMP= ", mrp.ICMPpacketsCopper(), "   IPv6= ", mrp.IPv6packetsCopper());
  console.log(" IPv4mc= ", mrp.IPv4MulticastPacketsCopper(), "   IPv4bc= ", mrp.IPv4BroadcastPacketsCopper(), 
              " IPv6mc= ", mrp.IPv6MulticastPacketsCopper(), "   IPv6bc= ", mrp.IPv6BroadcastPacketsCopper());
  console.log(" <64= ", mrp.lt64packetsCopper(), "   <128= ", mrp.lt128packetsCopper(), "   <256= ", mrp.lt256packetsCopper(),
              " <512= ", mrp.lt512packetsCopper(), "   <1024= ", mrp.lt1024packetsCopper(), "   <=1500= ", mrp.le1500packetsCopper(),
              " >1500= ", mrp.gt1500packetsCopper(), "   misaligned= ", mrp.misalignedPacketsCopper());
 console.log("packetsFiber= ", mrp.packetsFiber());
  console.log(" IPv4= ", mrp.IPv4packetsFiber(), "   TCP= ", mrp.TCPpacketsFiber(), "   UDP= ", mrp.UDPpacketsFiber(),
              " SCTP= ", mrp.SCTPpacketsFiber(), "   ICMP= ", mrp.ICMPpacketsFiber(), "   IPv6= ", mrp.IPv6packetsFiber());
  console.log(" IPv4mc= ", mrp.IPv4MulticastPacketsFiber(), "   IPv4bc= ", mrp.IPv4BroadcastPacketsFiber(), 
              " IPv6mc= ", mrp.IPv6MulticastPacketsFiber(), "   IPv6bc= ", mrp.IPv6BroadcastPacketsFiber());
  console.log(" <64= ", mrp.lt64packetsFiber(), "   <128= ", mrp.lt128packetsFiber(), "   <256= ", mrp.lt256packetsFiber(),
              " <512= ", mrp.lt512packetsFiber(), "   <1024= ", mrp.lt1024packetsFiber(), "   <=1500= ", mrp.le1500packetsFiber(),
              " >1500= ", mrp.gt1500packetsFiber(), "   misaligned= ", mrp.misalignedPacketsFiber());
  console.log("filteredPacketsCopper(0..7)= ", mrp.filteredPacketsCopper(0), "  ",  mrp.filteredPacketsCopper(1),
              "  ", mrp.filteredPacketsCopper(2), "  ",  mrp.filteredPacketsCopper(3),
              "  ", mrp.filteredPacketsCopper(4), "  ",  mrp.filteredPacketsCopper(5),
              "  ", mrp.filteredPacketsCopper(6), "  ",  mrp.filteredPacketsCopper(7));
  console.log("filteredPacketsFiber(0..7)= ", mrp.filteredPacketsFiber(0), "  ",  mrp.filteredPacketsFiber(1),
              "  ", mrp.filteredPacketsFiber(2), "  ",  mrp.filteredPacketsFiber(3),
              "  ", mrp.filteredPacketsFiber(4), "  ",  mrp.filteredPacketsFiber(5),
              "  ", mrp.filteredPacketsFiber(6), "  ",  mrp.filteredPacketsFiber(7));   
  console.log("filteredBytesCopper(0..7)= ", mrp.filteredBytesCopper(0), "  ",  mrp.filteredBytesCopper(1),
              "  ", mrp.filteredBytesCopper(2), "  ",  mrp.filteredBytesCopper(3),
              "  ", mrp.filteredBytesCopper(4), "  ",  mrp.filteredBytesCopper(5),
              "  ", mrp.filteredBytesCopper(6), "  ",  mrp.filteredBytesCopper(7));
  console.log("filteredBytesFiber(0..7)= ", mrp.filteredBytesFiber(0), "  ",  mrp.filteredBytesFiber(1),
              "  ", mrp.filteredBytesFiber(2), "  ",  mrp.filteredBytesFiber(3),
              "  ", mrp.filteredBytesFiber(4), "  ",  mrp.filteredBytesFiber(5),
              "  ", mrp.filteredBytesFiber(6), "  ",  mrp.filteredBytesFiber(7));   
});

rx.on('error', function(err) {
 throw err;
});

rx.on('listening', function() {
 console.log('Bound to ' +rxIP + ':' +rxPort);
});

rx.bind(rxPort, rxIP);
