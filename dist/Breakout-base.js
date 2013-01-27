/***
    Breakout - 0.2.0

    Copyright (c) 2011-2013 Jeff Hoefs <soundanalogous@gmail.com>
    Released under the MIT license. See LICENSE file for details.
    http://breakoutjs.com
    ***/
'use strict';var BO=BO||{},BREAKOUT=BREAKOUT||BO;BREAKOUT.VERSION="0.2.0";BO.enableDebugging=!1;var JSUTILS=JSUTILS||{};JSUTILS.namespace=function(a){var a=a.split("."),b=window,c;for(c=0;c<a.length;c+=1)"undefined"===typeof b[a[c]]&&(b[a[c]]={}),b=b[a[c]];return b};JSUTILS.inherit=function(a){function b(){}if(null===a)throw TypeError();if(Object.create)return Object.create(a);var c=typeof a;if("object"!==c&&"function"!==c)throw TypeError();b.prototype=a;return new b};
if(!Function.prototype.bind)Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,g=function(){},d=function(){return c.apply(this instanceof g?this:a||window,b.concat(Array.prototype.slice.call(arguments)))};g.prototype=this.prototype;d.prototype=new g;return d};JSUTILS.namespace("JSUTILS.Event");
JSUTILS.Event=function(){var a;a=function(a){this._type=a;this._target=null;this.name="Event"};a.prototype={constructor:a,get type(){return this._type},set type(a){this._type=a},get target(){return this._target},set target(a){this._target=a}};a.CONNECTED="connected";a.CHANGE="change";a.COMPLETE="complete";return a}();JSUTILS.namespace("JSUTILS.EventDispatcher");
JSUTILS.EventDispatcher=function(){var a;a=function(a){this._target=a||null;this._eventListeners={};this.name="EventDispatcher"};a.prototype={constructor:a,addEventListener:function(a,c){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(c)},removeEventListener:function(a,c){for(var g=0,d=this._eventListeners[a].length;g<d;g++)this._eventListeners[a][g]===c&&this._eventListeners[a].splice(g,1)},hasEventListener:function(a){return this._eventListeners[a]&&0<this._eventListeners[a].length?
!0:!1},dispatchEvent:function(a,c){a.target=this._target;var g=!1,d;for(d in c)c.hasOwnProperty(d)&&(a[d.toString()]=c[d]);if(this.hasEventListener(a.type)){d=0;for(var f=this._eventListeners[a.type].length;d<f;d++)try{this._eventListeners[a.type][d].call(this,a),g=!0}catch(e){console.log("error: Error calling event handler. "+e)}}return g}};return a}();JSUTILS.namespace("JSUTILS.TimerEvent");
JSUTILS.TimerEvent=function(){var a,b=JSUTILS.Event;a=function(a){this.name="TimerEvent";b.call(this,a)};a.TIMER="timerTick";a.TIMER_COMPLETE="timerComplete";a.prototype=JSUTILS.inherit(b.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("JSUTILS.Timer");
JSUTILS.Timer=function(){var a,b=JSUTILS.TimerEvent,c=JSUTILS.EventDispatcher;a=function(a,d){c.call(this,this);this.name="Timer";this._count=0;this._delay=a;this._repeatCount=d||0;this._isRunning=!1;this._timer=null};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("delay",function(){return this._delay});a.prototype.__defineSetter__("delay",function(a){this._delay=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("repeatCount",
function(){return this._repeatCount});a.prototype.__defineSetter__("repeatCount",function(a){this._repeatCount=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("running",function(){return this._isRunning});a.prototype.__defineGetter__("currentCount",function(){return this._count});a.prototype.start=function(){if(null===this._timer)this._timer=setInterval(this.onTick.bind(this),this._delay),this._isRunning=!0};a.prototype.reset=function(){this.stop();this._count=0};a.prototype.stop=
function(){if(null!==this._timer)clearInterval(this._timer),this._timer=null,this._isRunning=!1};a.prototype.onTick=function(){this._count+=1;0!==this._repeatCount&&this._count>this._repeatCount?(this.stop(),this.dispatchEvent(new b(b.TIMER_COMPLETE))):this.dispatchEvent(new b(b.TIMER))};return a}();JSUTILS.namespace("JSUTILS.SignalScope");
JSUTILS.SignalScope=function(){var a;a=function(a,c,g,d,f,e,i){this.name="SignalScope";this._canvas=document.getElementById(a);this._ctx=this._canvas.getContext("2d");this._width=c;this._height=g;this._rangeMin=d;this._rangeMax=f;this._ch1Color=e||"#FF0000";this._ch2Color=i||"#0000FF";this._markers=null;this._ch1Values=Array(c);this._ch2Values=Array(c);for(a=0;a<c;a++)this._ch1Values[a]=0,this._ch2Values[a]=0;this._range=100*(1/(f-d))};a.prototype.update=function(a,c){this._ctx.clearRect(0,0,this._width,
this._height);this._ch1Values.push(a);this._ch1Values.shift();this.drawChannel(this._ch1Values,this._ch1Color);void 0!==c&&(this._ch2Values.push(c),this._ch2Values.shift(),this.drawChannel(this._ch2Values,this._ch2Color));this.drawMarkers()};a.prototype.drawChannel=function(a,c){var g=0;this._ctx.strokeStyle=c;this._ctx.lineWidth=1;this._ctx.beginPath();this._ctx.moveTo(0,this._height);for(var d=0,f=a.length;d<f;d++)g=(this._rangeMax-a[d])*this._range,this._ctx.lineTo(d,g);this._ctx.stroke()};a.prototype.drawMarkers=
function(){var a=0;if(null!==this._markers)for(var c=0,g=this._markers.length;c<g;c++)a=(this._rangeMax-this._markers[c][0])*this._range,this._ctx.strokeStyle=this._markers[c][1],this._ctx.lineWidth=0.5,this._ctx.beginPath(),this._ctx.moveTo(0,a),this._ctx.lineTo(this._width,a),this._ctx.stroke()};a.prototype.addMarker=function(a,c){if(null===this._markers)this._markers=[];this._markers.push([a,c])};a.prototype.removeAllMarkers=function(){this._markers=null};return a}();JSUTILS.namespace("BO.IOBoardEvent");
BO.IOBoardEvent=function(){var a,b=JSUTILS.Event;a=function(a){this.name="IOBoardEvent";b.call(this,a)};a.ANALOG_DATA="analogData";a.DIGITAL_DATA="digitalData";a.FIRMWARE_VERSION="firmwareVersion";a.FIRMWARE_NAME="firmwareName";a.STRING_MESSAGE="stringMessage";a.SYSEX_MESSAGE="sysexMessage";a.PIN_STATE_RESPONSE="pinStateResponse";a.READY="ioBoardReady";a.CONNECTED="ioBoardConnected";a.DISCONNECTED="ioBoardDisonnected";a.prototype=JSUTILS.inherit(b.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketEvent");
BO.WSocketEvent=function(){var a,b=JSUTILS.Event;a=function(a){this.name="WSocketEvent";b.call(this,a)};a.CONNECTED="webSocketConnected";a.MESSAGE="webSocketMessage";a.CLOSE="webSocketClosed";a.prototype=JSUTILS.inherit(b.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketWrapper");
BO.WSocketWrapper=function(){var a,b=JSUTILS.EventDispatcher,c=BO.WSocketEvent;a=function(a,c,f){this.name="WSocketWrapper";b.call(this,this);this._host=a;this._port=c;this._protocol=f||"default-protocol";this._socket=null;this._readyState="";this.init(this)};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.init=function(a){if("undefined"!==typeof io){a._socket=io.connect("http://"+a._host+":"+a._port);try{a._socket.on("connect",function(){a._socket.socket.options.reconnect=
!1;a.dispatchEvent(new c(c.CONNECTED));a._socket.on("message",function(d){a.dispatchEvent(new c(c.MESSAGE),{message:d})})})}catch(d){console.log("Error "+d)}}else try{if("MozWebSocket"in window)a._socket=new MozWebSocket("ws://"+a._host+":"+a._port+"/websocket",a._protocol);else if("WebSocket"in window)a._socket=new WebSocket("ws://"+a._host+":"+a._port+"/websocket");else throw console.log("Websockets not supported by this browser"),"Websockets not supported by this browser";a._socket.onopen=function(){a.dispatchEvent(new c(c.CONNECTED));
a._socket.onmessage=function(d){a.dispatchEvent(new c(c.MESSAGE),{message:d.data})};a._socket.onclose=function(){a._readyState=a._socket.readyState;a.dispatchEvent(new c(c.CLOSE))}}}catch(f){console.log("Error "+f)}};a.prototype.send=function(a){this.sendString(a)};a.prototype.sendString=function(a){this._socket.send(a.toString())};a.prototype.__defineGetter__("readyState",function(){return this._readyState});return a}();JSUTILS.namespace("BO.filters.FilterBase");
BO.filters.FilterBase=function(){var a;a=function(){throw Error("Can't instantiate abstract classes");};a.prototype.processSample=function(){throw Error("Filter objects must implement the method processSample");};return a}();JSUTILS.namespace("BO.filters.Scaler");
BO.filters.Scaler=function(){var a,b=BO.filters.FilterBase;a=function(c,b,d,f,e,i){this.name="Scaler";this._inMin=c||0;this._inMax=b||1;this._outMin=d||0;this._outMax=f||1;this._type=e||a.LINEAR;this._limiter=i||!0};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){var b=this._outMax-this._outMin,a=(a-this._inMin)/(this._inMax-this._inMin);this._limiter&&(a=Math.max(0,Math.min(1,a)));return b*this._type(a)+this._outMin};a.LINEAR=function(a){return a};
a.SQUARE=function(a){return a*a};a.SQUARE_ROOT=function(a){return Math.pow(a,0.5)};a.CUBE=function(a){return a*a*a*a};a.CUBE_ROOT=function(a){return Math.pow(a,0.25)};return a}();JSUTILS.namespace("BO.filters.Convolution");
BO.filters.Convolution=function(){var a,b=BO.filters.FilterBase;a=function(a){this.name="Convolution";this._buffer=[];this.coef=a};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("coef",function(){return this._coef});a.prototype.__defineSetter__("coef",function(a){this._coef=a;this._buffer=Array(this._coef.length);for(var a=this._buffer.length,b=0;b<a;b++)this._buffer[b]=0});a.prototype.processSample=function(a){this._buffer.unshift(a);this._buffer.pop();
for(var a=0,b=this._buffer.length,d=0;d<b;d++)a+=this._coef[d]*this._buffer[d];return a};a.LPF=[1/3,1/3,1/3];a.HPF=[1/3,-2/3,1/3];a.MOVING_AVERAGE=[0.125,0.125,0.125,0.125,0.125,0.125,0.125,0.125];return a}();JSUTILS.namespace("BO.filters.TriggerPoint");
BO.filters.TriggerPoint=function(){var a,b=BO.filters.FilterBase;a=function(a){this.name="TriggerPoint";this._points={};this._range=[];this._lastStatus=0;void 0===a&&(a=[[0.5,0]]);if(a[0]instanceof Array)for(var b=a.length,d=0;d<b;d++)this._points[a[d][0]]=a[d][1];else"number"===typeof a[0]&&(this._points[a[0]]=a[1]);this.updateRange();this._lastStatus=0};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){for(var b=this._lastStatus,d=this._range.length,
f=0;f<d;f++){var e=this._range[f];if(e[0]<=a&&a<=e[1]){b=f;break}}return this._lastStatus=b};a.prototype.addPoint=function(a,b){this._points[a]=b;this.updateRange()};a.prototype.removePoint=function(a){delete this._points[a];this.updateRange()};a.prototype.removeAllPoints=function(){this._points={};this.updateRange()};a.prototype.updateRange=function(){this._range=[];var a=this.getKeys(this._points),b=a[0];this._range.push([Number.NEGATIVE_INFINITY,b-this._points[b]]);for(var b=a.length-1,d=0;d<b;d++){var f=
a[d],e=a[d+1],f=1*f+this._points[f],e=e-this._points[e];if(f>=e)throw Error("The specified range overlaps...");this._range.push([f,e])}a=a[a.length-1];this._range.push([1*a+this._points[a],Number.POSITIVE_INFINITY])};a.prototype.getKeys=function(a){var b=[],d;for(d in a)a.hasOwnProperty(d)&&b.push(d);return b.sort()};return a}();JSUTILS.namespace("BO.generators.GeneratorEvent");
BO.generators.GeneratorEvent=function(){var a,b=JSUTILS.Event;a=function(a){b.call(this,a);this.name="GeneratorEvent"};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.UPDATE="update";return a}();JSUTILS.namespace("BO.generators.GeneratorBase");
BO.generators.GeneratorBase=function(){var a,b=JSUTILS.EventDispatcher;a=function(){b.call(this,this);this.name="GeneratorBase";this._value=void 0};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("value",function(){return this._value});a.prototype.__defineSetter__("value",function(a){this._value=a});return a}();JSUTILS.namespace("BO.generators.Oscillator");
BO.generators.Oscillator=function(){var a,b=BO.generators.GeneratorBase,c=BO.generators.GeneratorEvent,g=JSUTILS.Timer,d=JSUTILS.TimerEvent;a=function(d,c,i,k,h,m){b.call(this);this.name="Oscillator";this._wave=d||a.SIN;this._freq=c||1;this._amplitude=i||1;this._offset=k||0;this._phase=h||0;this._times=m||0;if(0===c)throw Error("Frequency should be larger than 0");this._lastVal=this._startTime=this._time=void 0;this._autoUpdateCallback=this.autoUpdate.bind(this);this._timer=new g(33);this._timer.start();
this.reset()};a.prototype=JSUTILS.inherit(b.prototype);a.prototype.constructor=a;a.prototype.__defineSetter__("serviceInterval",function(a){this._timer.delay=a});a.prototype.__defineGetter__("serviceInterval",function(){return this._timer.delay});a.prototype.start=function(){this.stop();this._timer.addEventListener(d.TIMER,this._autoUpdateCallback);this._startTime=(new Date).getTime();this.autoUpdate(null)};a.prototype.stop=function(){this._timer.hasEventListener(d.TIMER)&&this._timer.removeEventListener(d.TIMER,
this._autoUpdateCallback)};a.prototype.reset=function(){this._time=0;this._lastVal=0.999};a.prototype.update=function(a){a=a||-1;this._time=0>a?this._time+this._timer.delay:this._time+a;this.computeValue()};a.prototype.autoUpdate=function(){this._time=(new Date).getTime()-this._startTime;this.computeValue()};a.prototype.computeValue=function(){var d=this._time/1E3;0!==this._times&&this._freq*d>=this._times?(this.stop(),this._value=this._wave!==a.LINEAR?this._offset:this._amplitude*this._wave(1,0)+
this._offset):(d=this._freq*(d+this._phase),this._value=this._amplitude*this._wave(d,this._lastVal)+this._offset,this._lastVal=d);this.dispatchEvent(new c(c.UPDATE))};a.SIN=function(a){return 0.5*(1+Math.sin(2*Math.PI*(a-0.25)))};a.SQUARE=function(a){return 0.5>=a%1?1:0};a.TRIANGLE=function(a){a%=1;return 0.5>=a?2*a:2-2*a};a.SAW=function(a){a%=1;return 0.5>=a?a+0.5:a-0.5};a.IMPULSE=function(a,d){return a%1<d%1?1:0};a.LINEAR=function(a){return 1>a?a:1};return a}();JSUTILS.namespace("BO.PinEvent");
BO.PinEvent=function(){var a,b=JSUTILS.Event;a=function(a){this.name="PinEvent";b.call(this,a)};a.CHANGE="pinChange";a.RISING_EDGE="risingEdge";a.FALLING_EDGE="fallingEdge";a.prototype=JSUTILS.inherit(b.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.Pin");
BO.Pin=function(){var a,b=JSUTILS.EventDispatcher,c=BO.PinEvent,g=BO.generators.GeneratorEvent;a=function(a,c){this.name="Pin";this._type=c;this._capabilities={};this._number=a;this._analogNumber=void 0;this._maxPWMValue=255;this._value=0;this._lastValue=-1;this._average=this._preFilterValue=0;this._minimum=Math.pow(2,16);this._numSamples=this._sum=this._maximum=0;this._generator=this._filters=null;this._state=void 0;this._autoSetValueCallback=this.autoSetValue.bind(this);this._evtDispatcher=new b(this)};
a.prototype={constructor:a,setAnalogNumber:function(a){this._analogNumber=a},get analogNumber(){return this._analogNumber},get number(){return this._number},setMaxPWMValue:function(a){this._maxPWMValue=a},setState:function(d){this._type===a.PWM&&(d/=this.maxPWMValue);this._state=d},get maxPWMValue(){return this._maxPWMValue},get average(){return this._average},get minimum(){return this._minimum},get maximum(){return this._maximum},get state(){return this._state},get value(){return this._value},set value(a){this._lastValue=
this._value;this._preFilterValue=a;this._value=this.applyFilters(a);this.calculateMinMaxAndMean(this._value);this.detectChange(this._lastValue,this._value)},get lastValue(){return this._lastValue},get preFilterValue(){return this._preFilterValue},get filters(){return this._filters},set filters(a){this._filters=a},get generator(){return this._generator},getType:function(){return this._type},setType:function(d){if(0<=d&&d<a.TOTAL_PIN_MODES)this._type=d},getCapabilities:function(){return this._capabilities},
setCapabilities:function(a){this._capabilities=a},detectChange:function(a,b){a!==b&&(this.dispatchEvent(new c(c.CHANGE)),0>=a&&0!==b?this.dispatchEvent(new c(c.RISING_EDGE)):0!==a&&0>=b&&this.dispatchEvent(new c(c.FALLING_EDGE)))},clearWeight:function(){this._sum=this._average;this._numSamples=1},calculateMinMaxAndMean:function(a){var b=Number.MAX_VALUE;this._minimum=Math.min(a,this._minimum);this._maximum=Math.max(a,this._maximum);this._sum+=a;this._average=this._sum/++this._numSamples;this._numSamples>=
b&&this.clearWeight()},clear:function(){this._minimum=this._maximum=this._average=this._lastValue=this._preFilterValue;this.clearWeight()},addFilter:function(a){if(null!==a){if(null===this._filters)this._filters=[];this._filters.push(a)}},addGenerator:function(a){this.removeGenerator();this._generator=a;this._generator.addEventListener(g.UPDATE,this._autoSetValueCallback)},removeGenerator:function(){null!==this._generator&&this._generator.removeEventListener(g.UPDATE,this._autoSetValueCallback);this._generator=
null},removeAllFilters:function(){this._filters=null},autoSetValue:function(){this.value=this._generator.value},applyFilters:function(a){if(null===this._filters)return a;for(var b=this._filters.length,c=0;c<b;c++)a=this._filters[c].processSample(a);return a},addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,
b){return this._evtDispatcher.dispatchEvent(a,b)}};a.HIGH=1;a.LOW=0;a.ON=1;a.OFF=0;a.DIN=0;a.DOUT=1;a.AIN=2;a.AOUT=3;a.PWM=3;a.SERVO=4;a.SHIFT=5;a.I2C=6;a.TOTAL_PIN_MODES=7;return a}();JSUTILS.namespace("BO.I2CBase");
BO.I2CBase=function(){var a,b=BO.Pin,c=JSUTILS.EventDispatcher,g=BO.IOBoardEvent;a=function(d,f,e){if(void 0!==d){this.name="I2CBase";this.board=d;var i=e||0,e=i&255,i=i>>8&255;this._address=f;this._evtDispatcher=new c(this);f=d.getI2cPins();2==f.length?(d.getPin(f[0]).getType()!=b.I2C&&(d.getPin(f[0]).setType(b.I2C),d.getPin(f[1]).setType(b.I2C)),d.addEventListener(g.SYSEX_MESSAGE,this.onSysExMessage.bind(this)),d.sendSysex(a.I2C_CONFIG,[e,i])):console.log("Error, this board does not support i2c")}};
a.prototype={constructor:a,get address(){return this._address},onSysExMessage:function(b){var b=b.message,c=this.board.getValueFromTwo7bitBytes(b[1],b[2]),e=[];if(b[0]==a.I2C_REPLY&&c==this._address){for(var c=3,i=b.length;c<i;c+=2)e.push(this.board.getValueFromTwo7bitBytes(b[c],b[c+1]));this.handleI2C(e)}},sendI2CRequest:function(b){var c=[],e=b[0];c[0]=b[1];c[1]=e<<3;for(var e=2,i=b.length;e<i;e++)c.push(b[e]&127),c.push(b[e]>>7&127);this.board.sendSysex(a.I2C_REQUEST,c)},update:function(){},handleI2C:function(){},
addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};a.I2C_REQUEST=118;a.I2C_REPLY=119;a.I2C_CONFIG=120;a.WRITE=0;a.READ=1;a.READ_CONTINUOUS=2;a.STOP_READING=3;return a}();JSUTILS.namespace("BO.PhysicalInputBase");
BO.PhysicalInputBase=function(){var a,b=JSUTILS.EventDispatcher;a=function(){this.name="PhysicalInputBase";this._evtDispatcher=new b(this)};a.prototype={constructor:a,addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};return a}();JSUTILS.namespace("BO.IOBoard");
BO.IOBoard=function(){var a,b=BO.Pin,c=JSUTILS.EventDispatcher,g=BO.PinEvent,d=BO.WSocketEvent,f=BO.WSocketWrapper,e=BO.IOBoardEvent;a=function(a,b,h){this.name="IOBoard";this._socket=null;this._inputDataBuffer=[];this._digitalPort=[];this._numPorts=0;this._analogPinMapping=[];this._digitalPinMapping=[];this._i2cPins=[];this._ioPins=[];this._totalPins=0;this._samplingInterval=19;this._isReady=!1;this._firmwareName="";this._firmwareVersion=0;this._evtDispatcher=null;this._isConfigured=this._isMultiClientEnabled=
!1;this._debugMode=BO.enableDebugging;this._numPinStateRequests=0;this._evtDispatcher=new c(this);this.socketConnectionHandler=this.onSocketConnection.bind(this);this.socketMessageHandler=this.onSocketMessage.bind(this);this.socketClosedHandler=this.onSocketClosed.bind(this);this.initialVersionResultHandler=this.onInitialVersionResult.bind(this);this.sendOutHandler=this.sendOut.bind(this);this._socket=new f(a,b,h);this._socket.addEventListener(d.CONNECTED,this.socketConnectionHandler);this._socket.addEventListener(d.MESSAGE,
this.socketMessageHandler);this._socket.addEventListener(d.CLOSE,this.socketClosedHandler)};a.prototype={constructor:a,onSocketConnection:function(){this.debug("debug: Socket Status: (open)");this.dispatchEvent(new e(e.CONNECTED));this.begin()},onSocketMessage:function(a){var b="";a.message.match(/config/)?(b=a.message.substr(a.message.indexOf(":")+2),this.processStatusMessage(b)):this.processInput(a.message)},onSocketClosed:function(){this.debug("debug: Socket Status: "+this._socket.readyState+" (Closed)");
this.dispatchEvent(new e(e.DISCONNECTED))},begin:function(){this.addEventListener(e.FIRMWARE_NAME,this.initialVersionResultHandler);this.reportFirmware()},onInitialVersionResult:function(a){this.removeEventListener(e.FIRMWARE_NAME,this.initialVersionResultHandler);var b=10*a.version;this.debug("debug: Firmware name = "+a.name+"\t, Firmware version = "+a.version);23<=b?this.queryCapabilities():console.log("error: You must upload StandardFirmata version 2.3 or greater from Arduino version 1.0 or higher")},
processStatusMessage:function(a){if("multiClient"===a)this.debug("debug: Multi-client mode enabled"),this._isMultiClientEnabled=!0},processInput:function(a){var a=1*a,b;this._inputDataBuffer.push(a);b=this._inputDataBuffer.length;if(128<=this._inputDataBuffer[0]&&240!=this._inputDataBuffer[0]){if(3===b)this.processMultiByteCommand(this._inputDataBuffer),this._inputDataBuffer=[]}else if(240===this._inputDataBuffer[0]&&247===this._inputDataBuffer[b-1])this.processSysexCommand(this._inputDataBuffer),
this._inputDataBuffer=[];else if(128<=a&&128>this._inputDataBuffer[0])console.log("warning: Malformed input data... resetting buffer"),this._inputDataBuffer=[],247!==a&&this._inputDataBuffer.push(a)},processMultiByteCommand:function(a){var b=a[0],h;240>b&&(b&=240,h=a[0]&15);switch(b){case 144:this.processDigitalMessage(h,a[1],a[2]);break;case 249:this._firmwareVersion=a[1]+a[2]/10;this.dispatchEvent(new e(e.FIRMWARE_VERSION),{version:this._firmwareVersion});break;case 224:this.processAnalogMessage(h,
a[1],a[2])}},processDigitalMessage:function(a,k,h){var c=8*a,a=c+8,k=k|h<<7,h={};if(a>=this._totalPins)a=this._totalPins;for(var d=0,f=c;f<a;f++){h=this.getDigitalPin(f);if(void 0===h)break;if(h.getType()==b.DIN&&(c=k>>d&1,c!=h.value))h.value=c,this.dispatchEvent(new e(e.DIGITAL_DATA),{pin:h});d++}},processAnalogMessage:function(a,b,c){a=this.getAnalogPin(a);if(void 0!==a)a.value=this.getValueFromTwo7bitBytes(b,c)/1023,a.value!=a.lastValue&&this.dispatchEvent(new e(e.ANALOG_DATA),{pin:a})},processSysexCommand:function(a){a.shift();
a.pop();switch(a[0]){case 121:this.processQueryFirmwareResult(a);break;case 113:this.processSysExString(a);break;case 108:this.processCapabilitiesResponse(a);break;case 110:this.processPinStateResponse(a);break;case 106:this.processAnalogMappingResponse(a);break;default:this.dispatchEvent(new e(e.SYSEX_MESSAGE),{message:a})}},processQueryFirmwareResult:function(a){for(var b,c=3,d=a.length;c<d;c+=2)b=a[c],b+=a[c+1],this._firmwareName+=String.fromCharCode(b);this._firmwareVersion=a[1]+a[2]/10;this.dispatchEvent(new e(e.FIRMWARE_NAME),
{name:this._firmwareName,version:this._firmwareVersion})},processSysExString:function(a){for(var b="",c,d=a.length,f=1;f<d;f+=2)c=a[f],c+=a[f+1],b+=String.fromCharCode(c);this.dispatchEvent(new e(e.STRING_MESSAGE),{message:b})},processCapabilitiesResponse:function(a){if(!this._isConfigured){for(var c={},d=1,e=0,f=0,g=a.length,j;d<=g;)if(127==a[d]){this._digitalPinMapping[e]=e;j=void 0;if(c[b.DOUT])j=b.DOUT;if(c[b.AIN])j=b.AIN,this._analogPinMapping[f++]=e;j=new b(e,j);j.setCapabilities(c);this.managePinListener(j);
this._ioPins[e]=j;j.getCapabilities()[b.I2C]&&this._i2cPins.push(j.number);c={};e++;d++}else c[a[d]]=a[d+1],d+=2;this._numPorts=Math.ceil(e/8);this.debug("debug: Num ports = "+this._numPorts);for(a=0;a<this._numPorts;a++)this._digitalPort[a]=0;this._totalPins=e;this._totalAnalogPins=f;this.debug("debug: Num pins = "+this._totalPins);this.queryAnalogMapping()}},processAnalogMappingResponse:function(a){if(!this._isConfigured){for(var b=a.length,c=1;c<b;c++)127!=a[c]&&(this._analogPinMapping[a[c]]=c-
1,this.getPin(c-1).setAnalogNumber(a[c]));this._isMultiClientEnabled?this.startupInMultiClientMode():this.startupInSingleClientMode()}},startupInSingleClientMode:function(){this.debug("debug: System reset");this.systemReset();setTimeout(this.startup.bind(this),500)},startupInMultiClientMode:function(){for(var a=this.getPinCount(),b=0;b<a;b++)this.queryPinState(this.getDigitalPin(b));setTimeout(this.startup.bind(this),500);this._isConfigured=!0},startup:function(){this.debug("debug: IOBoard ready");
this._isReady=!0;this.dispatchEvent(new e(e.READY));this.enableDigitalPins()},systemReset:function(){this.send(255)},processPinStateResponse:function(a){if(!(0>=this._numPinStateRequests)){var b=a.length,c=a[2],d,f=this._ioPins[a[1]];4<b?d=this.getValueFromTwo7bitBytes(a[3],a[4]):3<b&&(d=a[3]);f.getType()!=c&&(f.setType(c),this.managePinListener(f));f.setState(d);this._numPinStateRequests--;if(0>this._numPinStateRequests)this._numPinStateRequests=0;this.dispatchEvent(new e(e.PIN_STATE_RESPONSE),{pin:f})}},
toDec:function(a){a=a.substring(0,1);return a.charCodeAt(0)},sendOut:function(a){var c=a.target.getType(),d=a.target.number,a=a.target.value;switch(c){case b.DOUT:this.sendDigitalData(d,a);break;case b.AOUT:this.sendAnalogData(d,a);break;case b.SERVO:this.sendServoData(d,a)}},managePinListener:function(a){if(a.getType()==b.DOUT||a.getType()==b.AOUT||a.getType()==b.SERVO)a.hasEventListener(g.CHANGE)||a.addEventListener(g.CHANGE,this.sendOutHandler);else if(a.hasEventListener(g.CHANGE))try{a.removeEventListener(g.CHANGE,
this.sendOutHandler)}catch(c){this.debug("debug: Caught pin removeEventListener exception")}},sendAnalogData:function(a,b){var c=this.getDigitalPin(a).maxPWMValue,b=b*c,b=0>b?0:b,b=b>c?c:b;15<a||b>Math.pow(2,14)?this.sendExtendedAnalogData(a,b):this.send([224|a&15,b&127,b>>7&127])},sendExtendedAnalogData:function(a,b){var c=[];if(b>Math.pow(2,16))throw console.log("error: Extended Analog values > 16 bits are not currently supported by StandardFirmata"),"error: Extended Analog values > 16 bits are not currently supported by StandardFirmata";
c[0]=240;c[1]=111;c[2]=a;c[3]=b&127;c[4]=b>>7&127;b>=Math.pow(2,14)&&(c[5]=b>>14&127);c.push(247);this.send(c)},sendDigitalData:function(a,c){var d=Math.floor(a/8);if(c==b.HIGH)this._digitalPort[d]|=c<<a%8;else if(c==b.LOW)this._digitalPort[d]&=~(1<<a%8);else{console.log("warning: Invalid value passed to sendDigital, value must be 0 or 1.");return}this.sendDigitalPort(d,this._digitalPort[d])},sendServoData:function(a,c){var d=this.getDigitalPin(a);d.getType()==b.SERVO&&d.lastValue!=c&&this.sendAnalogData(a,
c)},queryCapabilities:function(){this.send([240,107,247])},queryAnalogMapping:function(){this.send([240,105,247])},setAnalogPinReporting:function(a,c){this.send([192|a,c]);this.getAnalogPin(a).setType(b.AIN)},debug:function(a){this._debugMode&&console.log(a)},get samplingInterval(){return this._samplingInterval},set samplingInterval(a){10<=a&&100>=a?(this._samplingInterval=a,this.send([240,122,a&127,a>>7&127,247])):console.log("warning: Sampling interval must be between 10 and 100")},get isReady(){return this._isReady},
getValueFromTwo7bitBytes:function(a,b){return b<<7|a},getSocket:function(){return this._socket},reportVersion:function(){this.send(249)},reportFirmware:function(){this.send([240,121,247])},disableDigitalPins:function(){for(var a=0;a<this._numPorts;a++)this.sendDigitalPortReporting(a,b.OFF)},enableDigitalPins:function(){for(var a=0;a<this._numPorts;a++)this.sendDigitalPortReporting(a,b.ON)},sendDigitalPortReporting:function(a,b){this.send([208|a,b])},enableAnalogPin:function(a){this.setAnalogPinReporting(a,
b.ON)},disableAnalogPin:function(a){this.setAnalogPinReporting(a,b.OFF)},setDigitalPinMode:function(a,b){this.getDigitalPin(a).setType(b);this.managePinListener(this.getDigitalPin(a));this.send([244,a,b])},enablePullUp:function(a){this.sendDigitalData(a,b.HIGH)},getFirmwareName:function(){return this._firmwareName},getFirmwareVersion:function(){return this._firmwareVersion},getPinCapabilities:function(){var a=[],b,c,d,e,f={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"};b=this._ioPins.length;
for(var g=0;g<b;g++){c={};d=this._ioPins[g].getCapabilities();e=!1;for(var l in d)d.hasOwnProperty(l)&&(e=!0,0<=l&&(c[f[l]]=this._ioPins[g].getCapabilities()[l]));a[g]=e?c:{"not available":"0"}}return a},queryPinState:function(a){this.send([240,109,a.number,247]);this._numPinStateRequests++},sendDigitalPort:function(a,b){this.send([144|a&15,b&127,b>>7])},sendString:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(this.toDec(a[c])&127),b.push(this.toDec(a[c])>>7&127);this.sendSysex(113,b)},sendSysex:function(a,
b){var c=[240];c[1]=a;for(var d=0,e=b.length;d<e;d++)c.push(b[d]);c.push(247);this.send(c)},sendServoAttach:function(a,c,d){var e=[],c=c||544,d=d||2400;e[0]=240;e[1]=112;e[2]=a;e[3]=c%128;e[4]=c>>7;e[5]=d%128;e[6]=d>>7;e[7]=247;this.send(e);a=this.getDigitalPin(a);a.setType(b.SERVO);this.managePinListener(a)},getPin:function(a){return this._ioPins[a]},getAnalogPin:function(a){return this._ioPins[this._analogPinMapping[a]]},getDigitalPin:function(a){return this._ioPins[this._digitalPinMapping[a]]},
getPins:function(){return this._ioPins},analogToDigital:function(a){return this.getAnalogPin(a).number},getPinCount:function(){return this._totalPins},getAnalogPinCount:function(){return this._totalAnalogPins},getI2cPins:function(){return this._i2cPins},reportCapabilities:function(){for(var a=this.getPinCapabilities(),b=a.length,c,d=0;d<b;d++){console.log("Pin "+d+":");for(var e in a[d])a[d].hasOwnProperty(e)&&(c=a[d][e],console.log("\t"+e+" ("+c+(1<c?" bits)":" bit)")))}},send:function(a){this._socket.sendString(a)},
close:function(){this._socket.close()},addEventListener:function(a,b){this._evtDispatcher.addEventListener(a,b)},removeEventListener:function(a,b){this._evtDispatcher.removeEventListener(a,b)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,b){return this._evtDispatcher.dispatchEvent(a,b)}};return a}();
