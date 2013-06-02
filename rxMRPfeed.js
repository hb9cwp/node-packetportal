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
});

rx.on('error', function(err) {
 throw err;
});

rx.on('listening', function() {
 console.log('Bound to ' +rxIP + ':' +rxPort);
});

rx.bind(rxPort, rxIP);
