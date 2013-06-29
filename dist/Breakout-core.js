/***
    Breakout - 0.2.3

    Copyright (c) 2011-2013 Jeff Hoefs <soundanalogous@gmail.com>
    Released under the MIT license. See LICENSE file for details.
    http://breakoutjs.com
    ***/
'use strict';var BO=BO||{},BREAKOUT=BREAKOUT||BO;BREAKOUT.VERSION="0.2.3";BO.enableDebugging=!1;var JSUTILS=JSUTILS||{};JSUTILS.namespace=function(a){var a=a.split("."),e=window,f;for(f=0;f<a.length;f+=1)"undefined"===typeof e[a[f]]&&(e[a[f]]={}),e=e[a[f]];return e};JSUTILS.inherit=function(a){function e(){}if(null===a)throw new TypeError;if(Object.create)return Object.create(a);var f=typeof a;if("object"!==f&&"function"!==f)throw new TypeError;e.prototype=a;return new e};
if(!Function.prototype.bind)Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),f=this,h=function(){},c=function(){return f.apply(this instanceof h?this:a||window,e.concat(Array.prototype.slice.call(arguments)))};h.prototype=this.prototype;c.prototype=new h;return c};JSUTILS.namespace("JSUTILS.Event");
JSUTILS.Event=function(){var a;a=function(a){this._type=a;this._target=null;this.name="Event"};a.prototype={constructor:a,get type(){return this._type},set type(a){this._type=a},get target(){return this._target},set target(a){this._target=a}};a.CONNECTED="connected";a.CHANGE="change";a.COMPLETE="complete";return a}();JSUTILS.namespace("JSUTILS.EventDispatcher");
JSUTILS.EventDispatcher=function(){var a;a=function(a){this._target=a||null;this._eventListeners={};this.name="EventDispatcher"};a.prototype={constructor:a,addEventListener:function(a,f){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(f)},removeEventListener:function(a,f){for(var h=0,c=this._eventListeners[a].length;h<c;h++)this._eventListeners[a][h]===f&&this._eventListeners[a].splice(h,1)},hasEventListener:function(a){return this._eventListeners[a]&&0<this._eventListeners[a].length?
!0:!1},dispatchEvent:function(a,f){a.target=this._target;var h=!1,c;for(c in f)f.hasOwnProperty(c)&&(a[c.toString()]=f[c]);if(this.hasEventListener(a.type)){c=0;for(var g=this._eventListeners[a.type].length;c<g;c++)try{this._eventListeners[a.type][c].call(this,a),h=!0}catch(b){console.log("error: Error calling event handler. "+b)}}return h}};return a}();JSUTILS.namespace("JSUTILS.TimerEvent");
JSUTILS.TimerEvent=function(){var a,e=JSUTILS.Event;a=function(a){this.name="TimerEvent";e.call(this,a)};a.TIMER="timerTick";a.TIMER_COMPLETE="timerComplete";a.prototype=JSUTILS.inherit(e.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("JSUTILS.Timer");
JSUTILS.Timer=function(){var a,e=JSUTILS.TimerEvent,f=JSUTILS.EventDispatcher;a=function(a,c){f.call(this,this);this.name="Timer";this._count=0;this._delay=a;this._repeatCount=c||0;this._isRunning=!1;this._timer=null};a.prototype=JSUTILS.inherit(f.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("delay",function(){return this._delay});a.prototype.__defineSetter__("delay",function(a){this._delay=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("repeatCount",
function(){return this._repeatCount});a.prototype.__defineSetter__("repeatCount",function(a){this._repeatCount=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("running",function(){return this._isRunning});a.prototype.__defineGetter__("currentCount",function(){return this._count});a.prototype.start=function(){if(null===this._timer)this._timer=setInterval(this.onTick.bind(this),this._delay),this._isRunning=!0};a.prototype.reset=function(){this.stop();this._count=0};a.prototype.stop=
function(){if(null!==this._timer)clearInterval(this._timer),this._timer=null,this._isRunning=!1};a.prototype.onTick=function(){this._count+=1;0!==this._repeatCount&&this._count>this._repeatCount?(this.stop(),this.dispatchEvent(new e(e.TIMER_COMPLETE))):this.dispatchEvent(new e(e.TIMER))};return a}();JSUTILS.namespace("JSUTILS.SignalScope");
JSUTILS.SignalScope=function(){var a;a=function(a,f,h,c,g,b,d){this.name="SignalScope";this._canvas=document.getElementById(a);this._ctx=this._canvas.getContext("2d");this._width=f;this._height=h;this._rangeMin=c;this._rangeMax=g;this._ch1Color=b||"#FF0000";this._ch2Color=d||"#0000FF";this._markers=null;this._ch1Values=Array(f);this._ch2Values=Array(f);for(a=0;a<f;a++)this._ch1Values[a]=0,this._ch2Values[a]=0;this._range=100*(1/(g-c))};a.prototype.update=function(a,f){this._ctx.clearRect(0,0,this._width,
this._height);this._ch1Values.push(a);this._ch1Values.shift();this.drawChannel(this._ch1Values,this._ch1Color);void 0!==f&&(this._ch2Values.push(f),this._ch2Values.shift(),this.drawChannel(this._ch2Values,this._ch2Color));this.drawMarkers()};a.prototype.drawChannel=function(a,f){var h=0;this._ctx.strokeStyle=f;this._ctx.lineWidth=1;this._ctx.beginPath();this._ctx.moveTo(0,this._height);for(var c=0,g=a.length;c<g;c++)h=(this._rangeMax-a[c])*this._range,this._ctx.lineTo(c,h);this._ctx.stroke()};a.prototype.drawMarkers=
function(){var a=0;if(null!==this._markers)for(var f=0,h=this._markers.length;f<h;f++)a=(this._rangeMax-this._markers[f][0])*this._range,this._ctx.strokeStyle=this._markers[f][1],this._ctx.lineWidth=0.5,this._ctx.beginPath(),this._ctx.moveTo(0,a),this._ctx.lineTo(this._width,a),this._ctx.stroke()};a.prototype.addMarker=function(a,f){if(null===this._markers)this._markers=[];this._markers.push([a,f])};a.prototype.removeAllMarkers=function(){this._markers=null};return a}();JSUTILS.namespace("BO.IOBoardEvent");
BO.IOBoardEvent=function(){var a,e=JSUTILS.Event;a=function(a){this.name="IOBoardEvent";e.call(this,a)};a.ANALOG_DATA="analogData";a.DIGITAL_DATA="digitalData";a.FIRMWARE_VERSION="firmwareVersion";a.FIRMWARE_NAME="firmwareName";a.STRING_MESSAGE="stringMessage";a.SYSEX_MESSAGE="sysexMessage";a.PIN_STATE_RESPONSE="pinStateResponse";a.READY="ioBoardReady";a.CONNECTED="ioBoardConnected";a.DISCONNECTED="ioBoardDisonnected";a.prototype=JSUTILS.inherit(e.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketEvent");
BO.WSocketEvent=function(){var a,e=JSUTILS.Event;a=function(a){this.name="WSocketEvent";e.call(this,a)};a.CONNECTED="webSocketConnected";a.MESSAGE="webSocketMessage";a.CLOSE="webSocketClosed";a.prototype=JSUTILS.inherit(e.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketWrapper");
BO.WSocketWrapper=function(){var a,e=JSUTILS.EventDispatcher,f=BO.WSocketEvent;a=function(a,c,g){this.name="WSocketWrapper";e.call(this,this);this._host=a;this._port=c;this._protocol=g||"default-protocol";this._socket=null;this._readyState="";this.init(this)};a.prototype=JSUTILS.inherit(e.prototype);a.prototype.constructor=a;a.prototype.init=function(a){if("undefined"!==typeof io){a._socket=io.connect("http://"+a._host+":"+a._port);try{a._socket.on("connect",function(){a._socket.socket.options.reconnect=
!1;a.dispatchEvent(new f(f.CONNECTED));a._socket.on("message",function(g){a.dispatchEvent(new f(f.MESSAGE),{message:g})})})}catch(c){console.log("Error "+c)}}else try{if("MozWebSocket"in window)a._socket=new MozWebSocket("ws://"+a._host+":"+a._port+"/websocket",a._protocol);else if("WebSocket"in window)a._socket=new WebSocket("ws://"+a._host+":"+a._port+"/websocket");else throw console.log("Websockets not supported by this browser"),"Websockets not supported by this browser";a._socket.onopen=function(){a.dispatchEvent(new f(f.CONNECTED));
a._socket.onmessage=function(g){a.dispatchEvent(new f(f.MESSAGE),{message:g.data})};a._socket.onclose=function(){a._readyState=a._socket.readyState;a.dispatchEvent(new f(f.CLOSE))}}}catch(g){console.log("Error "+g)}};a.prototype.send=function(a){this.sendString(a)};a.prototype.sendString=function(a){this._socket.send(a.toString())};a.prototype.__defineGetter__("readyState",function(){return this._readyState});return a}();JSUTILS.namespace("BO.generators.GeneratorEvent");
BO.generators.GeneratorEvent=function(){var a,e=JSUTILS.Event;a=function(a){e.call(this,a);this.name="GeneratorEvent"};a.prototype=JSUTILS.inherit(e.prototype);a.prototype.constructor=a;a.UPDATE="update";return a}();JSUTILS.namespace("BO.generators.GeneratorBase");
BO.generators.GeneratorBase=function(){var a,e=JSUTILS.EventDispatcher;a=function(){e.call(this,this);this.name="GeneratorBase";this._value=void 0};a.prototype=JSUTILS.inherit(e.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("value",function(){return this._value});a.prototype.__defineSetter__("value",function(a){this._value=a});return a}();JSUTILS.namespace("BO.PinEvent");
BO.PinEvent=function(){var a,e=JSUTILS.Event;a=function(a){this.name="PinEvent";e.call(this,a)};a.CHANGE="pinChange";a.RISING_EDGE="risingEdge";a.FALLING_EDGE="fallingEdge";a.prototype=JSUTILS.inherit(e.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.Pin");
BO.Pin=function(){var a,e=JSUTILS.EventDispatcher,f=BO.PinEvent;a=function(a,c){this.name="Pin";this._type=c;this._capabilities={};this._number=a;this._analogNumber=void 0;this._maxPWMValue=255;this._value=0;this._lastValue=-1;this._average=this._preFilterValue=0;this._minimum=Math.pow(2,16);this._numSamples=this._sum=this._maximum=0;this._generator=this._filters=null;this._state=void 0;this._autoSetValueCallback=this.autoSetValue.bind(this);this._evtDispatcher=new e(this)};a.prototype={constructor:a,
setAnalogNumber:function(a){this._analogNumber=a},get analogNumber(){return this._analogNumber},get number(){return this._number},setMaxPWMValue:function(a){this._maxPWMValue=a},setState:function(h){this._type===a.PWM&&(h/=this.maxPWMValue);this._state=h},get maxPWMValue(){return this._maxPWMValue},get average(){return this._average},get minimum(){return this._minimum},get maximum(){return this._maximum},get state(){return this._state},get value(){return this._value},set value(a){this._lastValue=
this._value;this._preFilterValue=a;this._value=this.applyFilters(a);this.calculateMinMaxAndMean(this._value);this.detectChange(this._lastValue,this._value)},get lastValue(){return this._lastValue},get preFilterValue(){return this._preFilterValue},get filters(){return this._filters},set filters(a){this._filters=a},get generator(){return this._generator},getType:function(){return this._type},setType:function(h){if(0<=h&&h<a.TOTAL_PIN_MODES)this._type=h},getCapabilities:function(){return this._capabilities},
setCapabilities:function(a){this._capabilities=a},detectChange:function(a,c){a!==c&&(this.dispatchEvent(new f(f.CHANGE)),0>=a&&0!==c?this.dispatchEvent(new f(f.RISING_EDGE)):0!==a&&0>=c&&this.dispatchEvent(new f(f.FALLING_EDGE)))},clearWeight:function(){this._sum=this._average;this._numSamples=1},calculateMinMaxAndMean:function(a){var c=Number.MAX_VALUE;this._minimum=Math.min(a,this._minimum);this._maximum=Math.max(a,this._maximum);this._sum+=a;this._average=this._sum/++this._numSamples;this._numSamples>=
c&&this.clearWeight()},clear:function(){this._minimum=this._maximum=this._average=this._lastValue=this._preFilterValue;this.clearWeight()},addFilter:function(a){if(null!==a){if(null===this._filters)this._filters=[];this._filters.push(a)}},removeFilter:function(a){1>this._filters.length||(a=this._filters.indexOf(a),-1!==a&&this._filters.splice(a,1))},addGenerator:function(a){this.removeGenerator();this._generator=a;this._generator.addEventListener(BO.generators.GeneratorEvent.UPDATE,this._autoSetValueCallback)},
removeGenerator:function(){null!==this._generator&&this._generator.removeEventListener(BO.generators.GeneratorEvent.UPDATE,this._autoSetValueCallback);this._generator=null},removeAllFilters:function(){this._filters=null},autoSetValue:function(){this.value=this._generator.value},applyFilters:function(a){if(null===this._filters)return a;for(var c=this._filters.length,g=0;g<c;g++)a=this._filters[g].processSample(a);return a},addEventListener:function(a,c){this._evtDispatcher.addEventListener(a,c)},removeEventListener:function(a,
c){this._evtDispatcher.removeEventListener(a,c)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,c){return this._evtDispatcher.dispatchEvent(a,c)}};a.HIGH=1;a.LOW=0;a.ON=1;a.OFF=0;a.DIN=0;a.DOUT=1;a.AIN=2;a.AOUT=3;a.PWM=3;a.SERVO=4;a.SHIFT=5;a.I2C=6;a.ONEWIRE=7;a.STEPPER=8;a.TOTAL_PIN_MODES=9;return a}();JSUTILS.namespace("BO.PhysicalInputBase");
BO.PhysicalInputBase=function(){var a,e=JSUTILS.EventDispatcher;a=function(){this.name="PhysicalInputBase";this._evtDispatcher=new e(this)};a.prototype={constructor:a,addEventListener:function(a,e){this._evtDispatcher.addEventListener(a,e)},removeEventListener:function(a,e){this._evtDispatcher.removeEventListener(a,e)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,e){return this._evtDispatcher.dispatchEvent(a,e)}};return a}();JSUTILS.namespace("BO.I2CBase");
BO.I2CBase=function(){var a,e=BO.Pin,f=JSUTILS.EventDispatcher,h=BO.IOBoardEvent;a=function(c,g,b){if(void 0!==c){this.name="I2CBase";this.board=c;var d=b||0,b=d&255,d=d>>7&255;this._address=g;this._evtDispatcher=new f(this);g=c.getI2cPins();2===g.length?(c.getPin(g[0]).getType()!==e.I2C&&(c.getPin(g[0]).setType(e.I2C),c.getPin(g[1]).setType(e.I2C)),c.addEventListener(h.SYSEX_MESSAGE,this.onSysExMessage.bind(this)),c.sendSysex(a.I2C_CONFIG,[b,d])):console.log("Error, this board does not support i2c")}};
a.prototype={constructor:a,get address(){return this._address},onSysExMessage:function(c){var c=c.message,g=this.board.getValueFromTwo7bitBytes(c[1],c[2]),b=[];if(c[0]==a.I2C_REPLY&&g==this._address){for(var g=3,d=c.length;g<d;g+=2)b.push(this.board.getValueFromTwo7bitBytes(c[g],c[g+1]));this.handleI2C(b)}},sendI2CRequest:function(c){var g=[],b=c[0];g[0]=c[1];g[1]=b<<3;for(var b=2,d=c.length;b<d;b++)g.push(c[b]&127),g.push(c[b]>>7&127);this.board.sendSysex(a.I2C_REQUEST,g)},update:function(){},handleI2C:function(){},
addEventListener:function(a,g){this._evtDispatcher.addEventListener(a,g)},removeEventListener:function(a,g){this._evtDispatcher.removeEventListener(a,g)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,g){return this._evtDispatcher.dispatchEvent(a,g)}};a.I2C_REQUEST=118;a.I2C_REPLY=119;a.I2C_CONFIG=120;a.WRITE=0;a.READ=1;a.READ_CONTINUOUS=2;a.STOP_READING=3;return a}();JSUTILS.namespace("BO.IOBoard");
BO.IOBoard=function(){var a,e=BO.Pin,f=JSUTILS.EventDispatcher,h=BO.PinEvent,c=BO.IOBoardEvent;a=function(a,b,d){this.name="IOBoard";this._socket=null;this._inputDataBuffer=[];this._digitalPort=[];this._numPorts=0;this._analogPinMapping=[];this._digitalPinMapping=[];this._i2cPins=[];this._ioPins=[];this._totalAnalogPins=this._totalPins=0;this._samplingInterval=19;this._isReady=!1;this._firmwareName="";this._firmwareVersion=0;this._evtDispatcher=null;this._capabilityQueryResponseReceived=this._isConfigured=
this._isMultiClientEnabled=!1;this._debugMode=BO.enableDebugging;this._numPinStateRequests=0;this._evtDispatcher=new f(this);this.initialVersionResultHandler=this.onInitialVersionResult.bind(this);this.sendOutHandler=this.sendOut.bind(this);this.socketConnectionHandler=this.onSocketConnection.bind(this);this.socketMessageHandler=this.onSocketMessage.bind(this);this.socketClosedHandler=this.onSocketClosed.bind(this);this._socket=new BO.WSocketWrapper(a,b,d);this._socket.addEventListener(BO.WSocketEvent.CONNECTED,
this.socketConnectionHandler);this._socket.addEventListener(BO.WSocketEvent.MESSAGE,this.socketMessageHandler);this._socket.addEventListener(BO.WSocketEvent.CLOSE,this.socketClosedHandler)};a.prototype={constructor:a,onSocketConnection:function(){this.debug("debug: Socket Status: (open)");this.dispatchEvent(new c(c.CONNECTED));this.begin()},onSocketMessage:function(a){var b=a.message,a=[];if(1<b.length)for(var a=b.split(","),b=a.length,d=0;d<b;d++)this.parseInputMessage(a[d]);else this.parseInputMessage(b)},
parseInputMessage:function(a){var b="";a.match(/config/)?(b=a.substr(a.indexOf(":")+2),this.processStatusMessage(b)):this.processInput(parseInt(a,10))},onSocketClosed:function(){this.debug("debug: Socket Status: "+this._socket.readyState+" (Closed)");this.dispatchEvent(new c(c.DISCONNECTED))},begin:function(){this.addEventListener(c.FIRMWARE_NAME,this.initialVersionResultHandler);this.reportFirmware()},onInitialVersionResult:function(a){var b=10*a.version,d=a.name,e=this;this.removeEventListener(c.FIRMWARE_NAME,
this.initialVersionResultHandler);this.debug("debug: Firmware name = "+d+", Firmware version = "+a.version);23<=b?this._isMultiClientEnabled?(this.queryCapabilities(),this.checkForQueryResponse()):(this.systemReset(),setTimeout(function(){e.queryCapabilities();e.checkForQueryResponse()},200)):console.log("error: You must upload StandardFirmata version 2.3 or greater from Arduino version 1.0 or higher")},checkForQueryResponse:function(){var a=this;setTimeout(function(){!1===a._capabilityQueryResponseReceived&&
a.startup()},200)},processStatusMessage:function(a){if("multiClient"===a)this.debug("debug: Multi-client mode enabled"),this._isMultiClientEnabled=!0},processInput:function(a){var b;this._inputDataBuffer.push(a);b=this._inputDataBuffer.length;if(128<=this._inputDataBuffer[0]&&240!=this._inputDataBuffer[0]){if(3===b)this.processMultiByteCommand(this._inputDataBuffer),this._inputDataBuffer=[]}else if(240===this._inputDataBuffer[0]&&247===this._inputDataBuffer[b-1])this.processSysexCommand(this._inputDataBuffer),
this._inputDataBuffer=[];else if(128<=a&&128>this._inputDataBuffer[0])console.log("warning: Malformed input data... resetting buffer"),this._inputDataBuffer=[],247!==a&&this._inputDataBuffer.push(a)},processMultiByteCommand:function(a){var b=a[0],d;240>b&&(b&=240,d=a[0]&15);switch(b){case 144:this.processDigitalMessage(d,a[1],a[2]);break;case 249:this._firmwareVersion=a[1]+a[2]/10;this.dispatchEvent(new c(c.FIRMWARE_VERSION),{version:this._firmwareVersion});break;case 224:this.processAnalogMessage(d,
a[1],a[2])}},processDigitalMessage:function(a,b,d){var f=8*a,a=f+8,b=b|d<<7,d={};if(a>=this._totalPins)a=this._totalPins;for(var h=0,k=f;k<a;k++){d=this.getDigitalPin(k);if(void 0===d)break;if(d.getType()==e.DIN&&(f=b>>h&1,f!=d.value))d.value=f,this.dispatchEvent(new c(c.DIGITAL_DATA),{pin:d});h++}},processAnalogMessage:function(a,b,d){a=this.getAnalogPin(a);if(void 0!==a)a.value=this.getValueFromTwo7bitBytes(b,d)/1023,a.value!=a.lastValue&&this.dispatchEvent(new c(c.ANALOG_DATA),{pin:a})},processSysexCommand:function(a){a.shift();
a.pop();switch(a[0]){case 121:this.processQueryFirmwareResult(a);break;case 113:this.processSysExString(a);break;case 108:this.processCapabilitiesResponse(a);break;case 110:this.processPinStateResponse(a);break;case 106:this.processAnalogMappingResponse(a);break;default:this.dispatchEvent(new c(c.SYSEX_MESSAGE),{message:a})}},processQueryFirmwareResult:function(a){for(var b,d=3,e=a.length;d<e;d+=2)b=a[d],b+=a[d+1],this._firmwareName+=String.fromCharCode(b);this._firmwareVersion=a[1]+a[2]/10;this.dispatchEvent(new c(c.FIRMWARE_NAME),
{name:this._firmwareName,version:this._firmwareVersion})},processSysExString:function(a){for(var b="",d,e=a.length,f=1;f<e;f+=2)d=a[f],d+=a[f+1],b+=String.fromCharCode(d);this.dispatchEvent(new c(c.STRING_MESSAGE),{message:b})},processCapabilitiesResponse:function(a){if(!this._isConfigured){var b={},d=1,c=0,f=0,h=a.length,i;for(this._capabilityQueryResponseReceived=!0;d<=h;)if(127==a[d]){this._digitalPinMapping[c]=c;i=void 0;if(b[e.DOUT])i=e.DOUT;if(b[e.AIN])i=e.AIN,this._analogPinMapping[f++]=c;
i=new e(c,i);i.setCapabilities(b);this.managePinListener(i);this._ioPins[c]=i;i.getCapabilities()[e.I2C]&&this._i2cPins.push(i.number);b={};c++;d++}else b[a[d]]=a[d+1],d+=2;this._numPorts=Math.ceil(c/8);this.debug("debug: Num ports = "+this._numPorts);for(a=0;a<this._numPorts;a++)this._digitalPort[a]=0;this._totalPins=c;this._totalAnalogPins=f;this.debug("debug: Num pins = "+this._totalPins);this.queryAnalogMapping()}},processAnalogMappingResponse:function(a){if(!this._isConfigured){for(var b=a.length,
d=1;d<b;d++)127!=a[d]&&(this._analogPinMapping[a[d]]=d-1,this.getPin(d-1).setAnalogNumber(a[d]));this._isMultiClientEnabled?this.startupInMultiClientMode():this.startup()}},startupInMultiClientMode:function(){for(var a=this.getPinCount(),b=0;b<a;b++)this.queryPinState(this.getDigitalPin(b));setTimeout(this.startup.bind(this),500);this._isConfigured=!0},startup:function(){this.debug("debug: IOBoard ready");this._isReady=!0;this.enableDigitalPins();this.dispatchEvent(new c(c.READY))},systemReset:function(){this.debug("debug: System reset");
this.send(255)},processPinStateResponse:function(a){if(!(0>=this._numPinStateRequests)){var b=a.length,d=a[2],e,f=this._ioPins[a[1]];4<b?e=this.getValueFromTwo7bitBytes(a[3],a[4]):3<b&&(e=a[3]);f.getType()!=d&&(f.setType(d),this.managePinListener(f));f.setState(e);this._numPinStateRequests--;if(0>this._numPinStateRequests)this._numPinStateRequests=0;this.dispatchEvent(new c(c.PIN_STATE_RESPONSE),{pin:f})}},toDec:function(a){a=a.substring(0,1);return a.charCodeAt(0)},sendOut:function(a){var b=a.target.getType(),
d=a.target.number,a=a.target.value;switch(b){case e.DOUT:this.sendDigitalData(d,a);break;case e.AOUT:this.sendAnalogData(d,a);break;case e.SERVO:this.sendServoData(d,a)}},managePinListener:function(a){if(a.getType()==e.DOUT||a.getType()==e.AOUT||a.getType()==e.SERVO)a.hasEventListener(h.CHANGE)||a.addEventListener(h.CHANGE,this.sendOutHandler);else if(a.hasEventListener(h.CHANGE))try{a.removeEventListener(h.CHANGE,this.sendOutHandler)}catch(b){this.debug("debug: Caught pin removeEventListener exception")}},
sendAnalogData:function(a,b){var d=this.getDigitalPin(a).maxPWMValue,b=b*d,b=0>b?0:b,b=b>d?d:b;15<a||b>Math.pow(2,14)?this.sendExtendedAnalogData(a,b):this.send([224|a&15,b&127,b>>7&127])},sendExtendedAnalogData:function(a,b){var d=[];if(b>Math.pow(2,16))throw console.log("error: Extended Analog values > 16 bits are not currently supported by StandardFirmata"),"error: Extended Analog values > 16 bits are not currently supported by StandardFirmata";d[0]=240;d[1]=111;d[2]=a;d[3]=b&127;d[4]=b>>7&127;
b>=Math.pow(2,14)&&(d[5]=b>>14&127);d.push(247);this.send(d)},sendDigitalData:function(a,b){var d=Math.floor(a/8);if(b==e.HIGH)this._digitalPort[d]|=b<<a%8;else if(b==e.LOW)this._digitalPort[d]&=~(1<<a%8);else{console.log("warning: Invalid value passed to sendDigital, value must be 0 or 1.");return}this.sendDigitalPort(d,this._digitalPort[d])},sendServoData:function(a,b){var d=this.getDigitalPin(a);d.getType()==e.SERVO&&d.lastValue!=b&&this.sendAnalogData(a,b)},queryCapabilities:function(){this.send([240,
107,247])},queryAnalogMapping:function(){this.send([240,105,247])},setAnalogPinReporting:function(a,b){this.send([192|a,b]);this.getAnalogPin(a).setType(e.AIN)},debug:function(a){this._debugMode&&console.log(a)},get samplingInterval(){return this._samplingInterval},set samplingInterval(a){10<=a&&100>=a?(this._samplingInterval=a,this.send([240,122,a&127,a>>7&127,247])):console.log("warning: Sampling interval must be between 10 and 100")},get isReady(){return this._isReady},getValueFromTwo7bitBytes:function(a,
b){return b<<7|a},getSocket:function(){return this._socket},reportVersion:function(){this.send(249)},reportFirmware:function(){this.send([240,121,247])},disableDigitalPins:function(){for(var a=0;a<this._numPorts;a++)this.sendDigitalPortReporting(a,e.OFF)},enableDigitalPins:function(){for(var a=0;a<this._numPorts;a++)this.sendDigitalPortReporting(a,e.ON)},sendDigitalPortReporting:function(a,b){this.send([208|a,b])},enableAnalogPin:function(a){this.setAnalogPinReporting(a,e.ON)},disableAnalogPin:function(a){this.setAnalogPinReporting(a,
e.OFF)},setDigitalPinMode:function(a,b,d){this.getDigitalPin(a).setType(b);this.managePinListener(this.getDigitalPin(a));(!d||!0!==d)&&this.send([244,a,b])},enablePullUp:function(a){this.sendDigitalData(a,e.HIGH)},getFirmwareName:function(){return this._firmwareName},getFirmwareVersion:function(){return this._firmwareVersion},getPinCapabilities:function(){var a=[],b,d,c,e,f={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"};b=this._ioPins.length;for(var h=0;h<b;h++){d={};c=this._ioPins[h].getCapabilities();
e=!1;for(var j in c)c.hasOwnProperty(j)&&(e=!0,0<=j&&(d[f[j]]=this._ioPins[h].getCapabilities()[j]));a[h]=e?d:{"not available":"0"}}return a},queryPinState:function(a){this.send([240,109,a.number,247]);this._numPinStateRequests++},sendDigitalPort:function(a,b){this.send([144|a&15,b&127,b>>7])},sendString:function(a){for(var b=[],d=0,c=a.length;d<c;d++)b.push(this.toDec(a[d])&127),b.push(this.toDec(a[d])>>7&127);this.sendSysex(113,b)},sendSysex:function(a,b){var d=[240];d[1]=a;for(var c=0,e=b.length;c<
e;c++)d.push(b[c]);d.push(247);this.send(d)},sendServoAttach:function(a,b,d){var c=[],b=b||544,d=d||2400;c[0]=240;c[1]=112;c[2]=a;c[3]=b%128;c[4]=b>>7;c[5]=d%128;c[6]=d>>7;c[7]=247;this.send(c);a=this.getDigitalPin(a);a.setType(e.SERVO);this.managePinListener(a)},getPin:function(a){return this._ioPins[a]},getAnalogPin:function(a){return this._ioPins[this._analogPinMapping[a]]},getDigitalPin:function(a){return this._ioPins[this._digitalPinMapping[a]]},getPins:function(){return this._ioPins},analogToDigital:function(a){return this.getAnalogPin(a).number},
getPinCount:function(){return this._totalPins},getAnalogPinCount:function(){return this._totalAnalogPins},getI2cPins:function(){return this._i2cPins},reportCapabilities:function(){for(var a=this.getPinCapabilities(),b=a.length,c,e=0;e<b;e++){console.log("Pin "+e+":");for(var f in a[e])a[e].hasOwnProperty(f)&&(c=a[e][f],console.log("\t"+f+" ("+c+(1<c?" bits)":" bit)")))}},send:function(a){this._socket.sendString(a)},close:function(){this._socket.close()},addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,
b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};return a}();
