/***
	Breakout - 0.2.0

    Copyright (c) 2011-2012 Jeff Hoefs <soundanalogous@gmail.com>
    Released under the MIT license. See LICENSE file for details.
	http.//breakoutjs.com
	***/
'use strict';var BO=BO||{},BREAKOUT=BREAKOUT||BO;BREAKOUT.VERSION="0.2.0";BO.enableDebugging=!1;var JSUTILS=JSUTILS||{};JSUTILS.namespace=function(a){var a=a.split("."),c=window,e;for(e=0;e<a.length;e+=1)"undefined"===typeof c[a[e]]&&(c[a[e]]={}),c=c[a[e]];return c};JSUTILS.inherit=function(a){function c(){}if(null==a)throw TypeError();if(Object.create)return Object.create(a);var e=typeof a;if("object"!==e&&"function"!==e)throw TypeError();c.prototype=a;return new c};
if(!Function.prototype.bind)Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var c=Array.prototype.slice.call(arguments,1),e=this,g=function(){},b=function(){return e.apply(this instanceof g?this:a||window,c.concat(Array.prototype.slice.call(arguments)))};g.prototype=this.prototype;b.prototype=new g;return b};JSUTILS.namespace("JSUTILS.Event");
JSUTILS.Event=function(){var a;a=function(a){this._type=a;this._target=null;this.name="Event"};a.prototype={get type(){return this._type},set type(a){this._type=a},get target(){return this._target},set target(a){this._target=a}};a.CONNECTED="connected";a.CHANGE="change";a.COMPLETE="complete";return a}();JSUTILS.namespace("JSUTILS.EventDispatcher");
JSUTILS.EventDispatcher=function(){var a;a=function(a){this._target=a||null;this._eventListeners={};this.name="EventDispatcher"};a.prototype={addEventListener:function(a,e){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(e)},removeEventListener:function(a,e){for(var g=0,b=this._eventListeners[a].length;g<b;g++)this._eventListeners[a][g]===e&&this._eventListeners[a].splice(g,1)},hasEventListener:function(a){return this._eventListeners[a]&&0<this._eventListeners[a].length?
!0:!1},dispatchEvent:function(a,e){a.target=this._target;var g=!1,b;for(b in e)a[b.toString()]=e[b];if(this.hasEventListener(a.type)){b=0;for(var d=this._eventListeners[a.type].length;b<d;b++)try{this._eventListeners[a.type][b].call(this,a),g=!0}catch(k){console.log("error: Error calling event handler. "+k)}}return g}};return a}();JSUTILS.namespace("JSUTILS.TimerEvent");
JSUTILS.TimerEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="TimerEvent";c.call(this,a)};a.TIMER="timerTick";a.TIMER_COMPLETE="timerComplete";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("JSUTILS.Timer");
JSUTILS.Timer=function(){var a,c=JSUTILS.TimerEvent,e=JSUTILS.EventDispatcher;a=function(a,b){e.call(this,this);this.name="Timer";this._count=0;this._delay=a;this._repeatCount=b||0;this._isRunning=!1;this._timer=null};a.prototype=JSUTILS.inherit(e.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("delay",function(){return this._delay});a.prototype.__defineSetter__("delay",function(a){this._delay=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("repeatCount",
function(){return this._repeatCount});a.prototype.__defineSetter__("repeatCount",function(a){this._repeatCount=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("running",function(){return this._isRunning});a.prototype.__defineGetter__("currentCount",function(){return this._count});a.prototype.start=function(){if(null===this._timer)this._timer=setInterval(this.onTick.bind(this),this._delay),this._isRunning=!0};a.prototype.reset=function(){this.stop();this._count=0};a.prototype.stop=
function(){if(null!==this._timer)clearInterval(this._timer),this._timer=null,this._isRunning=!1};a.prototype.onTick=function(){this._count+=1;0!==this._repeatCount&&this._count>this._repeatCount?(this.stop(),this.dispatchEvent(new c(c.TIMER_COMPLETE))):this.dispatchEvent(new c(c.TIMER))};return a}();JSUTILS.namespace("JSUTILS.SignalScope");
JSUTILS.SignalScope=function(){var a;a=function(a,e,g,b,d,k,m){this.name="SignalScope";this._canvas=document.getElementById(a);this._ctx=this._canvas.getContext("2d");this._width=e;this._height=g;this._rangeMin=b;this._rangeMax=d;this._ch1Color=k||"#FF0000";this._ch2Color=m||"#0000FF";this._markers=null;this._ch1Values=Array(e);this._ch2Values=Array(e);for(a=0;a<e;a++)this._ch1Values[a]=0,this._ch2Values[a]=0;this._range=100*(1/(d-b))};a.prototype.update=function(a,e){this._ctx.clearRect(0,0,this._width,
this._height);this._ch1Values.push(a);this._ch1Values.shift();this.drawChannel(this._ch1Values,this._ch1Color);void 0!==e&&(this._ch2Values.push(e),this._ch2Values.shift(),this.drawChannel(this._ch2Values,this._ch2Color));this.drawMarkers()};a.prototype.drawChannel=function(a,e){var g=0;this._ctx.strokeStyle=e;this._ctx.lineWidth=1;this._ctx.beginPath();this._ctx.moveTo(0,this._height);for(var b=0,d=a.length;b<d;b++)g=(this._rangeMax-a[b])*this._range,this._ctx.lineTo(b,g);this._ctx.stroke()};a.prototype.drawMarkers=
function(){var a=0;if(null!==this._markers)for(var e=0,g=this._markers.length;e<g;e++)a=(this._rangeMax-this._markers[e][0])*this._range,this._ctx.strokeStyle=this._markers[e][1],this._ctx.lineWidth=0.5,this._ctx.beginPath(),this._ctx.moveTo(0,a),this._ctx.lineTo(this._width,a),this._ctx.stroke()};a.prototype.addMarker=function(a,e){if(null===this._markers)this._markers=[];this._markers.push([a,e])};a.prototype.removeAllMarkers=function(){this._markers=null};return a}();JSUTILS.namespace("BO.IOBoardEvent");
BO.IOBoardEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="IOBoardEvent";c.call(this,a)};a.ANALOG_DATA="analogData";a.DIGITAL_DATA="digitalData";a.FIRMWARE_VERSION="firmwareVersion";a.FIRMWARE_NAME="firmwareName";a.STRING_MESSAGE="stringMessage";a.SYSEX_MESSAGE="sysexMessage";a.PIN_STATE_RESPONSE="pinStateResponse";a.READY="ioBoardReady";a.CONNECTED="ioBoardConnected";a.DISCONNECTED="ioBoardDisonnected";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketEvent");
BO.WSocketEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="WSocketEvent";c.call(this,a)};a.CONNECTED="webSocketConnected";a.MESSAGE="webSocketMessage";a.CLOSE="webSocketClosed";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketWrapper");
BO.WSocketWrapper=function(){var a,c=JSUTILS.EventDispatcher,e=BO.WSocketEvent;a=function(a,e,d){this.name="WSocketWrapper";c.call(this,this);this._host=a;this._port=e;this._protocol=d||"default-protocol";this._socket=null;this._readyState="";this.init(this)};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.init=function(a){if("undefined"!==typeof io){a._socket=io.connect("http://"+a._host+":"+a._port);try{a._socket.on("connect",function(){a._socket.socket.options.reconnect=
!1;a.dispatchEvent(new e(e.CONNECTED));a._socket.on("message",function(d){a.dispatchEvent(new e(e.MESSAGE),{message:d})})})}catch(b){console.log("Error "+b)}}else try{if("MozWebSocket"in window)a._socket=new MozWebSocket("ws://"+a._host+":"+a._port+"/websocket",a._protocol);else if("WebSocket"in window)a._socket=new WebSocket("ws://"+a._host+":"+a._port+"/websocket");else throw console.log("Websockets not supported by this browser"),"Websockets not supported by this browser";a._socket.onopen=function(){a.dispatchEvent(new e(e.CONNECTED));
a._socket.onmessage=function(d){a.dispatchEvent(new e(e.MESSAGE),{message:d.data})};a._socket.onclose=function(){a._readyState=a._socket.readyState;a.dispatchEvent(new e(e.CLOSE))}}}catch(d){console.log("Error "+d)}};a.prototype.send=function(a){this.sendString(a)};a.prototype.sendString=function(a){this._socket.send(a.toString())};a.prototype.__defineGetter__("readyState",function(){return this._readyState});return a}();JSUTILS.namespace("BO.filters.FilterBase");
BO.filters.FilterBase=function(){var a;a=function(){throw Error("Can't instantiate abstract classes");};a.prototype.processSample=function(){throw Error("Filter objects must implement the method processSample");};return a}();JSUTILS.namespace("BO.filters.Scaler");
BO.filters.Scaler=function(){var a,c=BO.filters.FilterBase;a=function(e,c,b,d,k,m){this.name="Scaler";this._inMin=e||0;this._inMax=c||1;this._outMin=b||0;this._outMax=d||1;this._type=k||a.LINEAR;this._limiter=m||!0};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){var c=this._outMax-this._outMin,a=(a-this._inMin)/(this._inMax-this._inMin);this._limiter&&(a=Math.max(0,Math.min(1,a)));return c*this._type(a)+this._outMin};a.LINEAR=function(a){return a};
a.SQUARE=function(a){return a*a};a.SQUARE_ROOT=function(a){return Math.pow(a,0.5)};a.CUBE=function(a){return a*a*a*a};a.CUBE_ROOT=function(a){return Math.pow(a,0.25)};return a}();JSUTILS.namespace("BO.filters.Convolution");
BO.filters.Convolution=function(){var a,c=BO.filters.FilterBase;a=function(a){this.name="Convolution";this._buffer=[];this.coef=a};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("coef",function(){return this._coef});a.prototype.__defineSetter__("coef",function(a){this._coef=a;this._buffer=Array(this._coef.length);for(var a=this._buffer.length,c=0;c<a;c++)this._buffer[c]=0});a.prototype.processSample=function(a){this._buffer.unshift(a);this._buffer.pop();
for(var a=0,c=this._buffer.length,b=0;b<c;b++)a+=this._coef[b]*this._buffer[b];return a};a.LPF=[1/3,1/3,1/3];a.HPF=[1/3,-2/3,1/3];a.MOVING_AVERAGE=[0.125,0.125,0.125,0.125,0.125,0.125,0.125,0.125];return a}();JSUTILS.namespace("BO.filters.TriggerPoint");
BO.filters.TriggerPoint=function(){var a,c=BO.filters.FilterBase;a=function(a){this.name="TriggerPoint";this._points={};this._range=[];void 0===a&&(a=[[0.5,0]]);if(a[0]instanceof Array)for(var c=a.length,b=0;b<c;b++)this._points[a[b][0]]=a[b][1];else"number"===typeof a[0]&&(this._points[a[0]]=a[1]);this.updateRange();this._lastStatus=0};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){for(var c=this._lastStatus,b=this._range.length,d=0;d<b;d++){var k=
this._range[d];if(k[0]<=a&&a<=k[1]){c=d;break}}return this._lastStatus=c};a.prototype.addPoint=function(a,c){this._points[a]=c;this.updateRange()};a.prototype.removePoint=function(a){delete this._points[a];this.updateRange()};a.prototype.removeAllPoints=function(){this._points={};this.updateRange()};a.prototype.updateRange=function(){this._range=[];var a=this.getKeys(this._points),c=a[0];this._range.push([Number.NEGATIVE_INFINITY,c-this._points[c]]);for(var c=a.length-1,b=0;b<c;b++){var d=a[b],k=
a[b+1],d=1*d+this._points[d],k=k-this._points[k];if(d>=k)throw Error("The specified range overlaps...");this._range.push([d,k])}a=a[a.length-1];this._range.push([1*a+this._points[a],Number.POSITIVE_INFINITY])};a.prototype.getKeys=function(a){var c=[],b;for(b in a)c.push(b);return c.sort()};return a}();JSUTILS.namespace("BO.generators.GeneratorEvent");
BO.generators.GeneratorEvent=function(){var a,c=JSUTILS.Event;a=function(a){c.call(this,a);this.name="GeneratorEvent"};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.UPDATE="update";return a}();JSUTILS.namespace("BO.generators.GeneratorBase");
BO.generators.GeneratorBase=function(){var a,c=JSUTILS.EventDispatcher;a=function(){c.call(this,this);this.name="GeneratorBase"};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("value",function(){return this._value});a.prototype.__defineSetter__("value",function(a){this._value=a});return a}();JSUTILS.namespace("BO.generators.Oscillator");
BO.generators.Oscillator=function(){var a,c=BO.generators.GeneratorBase,e=BO.generators.GeneratorEvent,g=JSUTILS.Timer,b=JSUTILS.TimerEvent;a=function(d,b,e,t,B,l){c.call(this);this.name="Oscillator";this._wave=d||a.SIN;this._freq=b||1;this._amplitude=e||1;this._offset=t||0;this._phase=B||0;this._times=l||0;if(0===b)throw Error("Frequency should be larger than 0");this._autoUpdateCallback=this.autoUpdate.bind(this);this._timer=new g(33);this._timer.start();this.reset()};a.prototype=JSUTILS.inherit(c.prototype);
a.prototype.constructor=a;a.prototype.__defineSetter__("serviceInterval",function(a){this._timer.delay=a});a.prototype.__defineGetter__("serviceInterval",function(){return this._timer.delay});a.prototype.start=function(){this.stop();this._timer.addEventListener(b.TIMER,this._autoUpdateCallback);this._startTime=(new Date).getTime();this.autoUpdate(null)};a.prototype.stop=function(){this._timer.hasEventListener(b.TIMER)&&this._timer.removeEventListener(b.TIMER,this._autoUpdateCallback)};a.prototype.reset=
function(){this._time=0;this._lastVal=0.999};a.prototype.update=function(a){a=a||-1;this._time=0>a?this._time+this._timer.delay:this._time+a;this.computeValue()};a.prototype.autoUpdate=function(){this._time=(new Date).getTime()-this._startTime;this.computeValue()};a.prototype.computeValue=function(){var b=this._time/1E3;0!==this._times&&this._freq*b>=this._times?(this.stop(),this._value=this._wave!==a.LINEAR?this._offset:this._amplitude*this._wave(1,0)+this._offset):(b=this._freq*(b+this._phase),
this._value=this._amplitude*this._wave(b,this._lastVal)+this._offset,this._lastVal=b);this.dispatchEvent(new e(e.UPDATE))};a.SIN=function(a){return 0.5*(1+Math.sin(2*Math.PI*(a-0.25)))};a.SQUARE=function(a){return 0.5>=a%1?1:0};a.TRIANGLE=function(a){a%=1;return 0.5>=a?2*a:2-2*a};a.SAW=function(a){a%=1;return 0.5>=a?a+0.5:a-0.5};a.IMPULSE=function(a,b){return a%1<b%1?1:0};a.LINEAR=function(a){return 1>a?a:1};return a}();JSUTILS.namespace("BO.PinEvent");
BO.PinEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="PinEvent";c.call(this,a)};a.CHANGE="pinChange";a.RISING_EDGE="risingEdge";a.FALLING_EDGE="fallingEdge";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.Pin");
BO.Pin=function(){var a,c=JSUTILS.EventDispatcher,e=BO.PinEvent,g=BO.generators.GeneratorEvent;a=function(a,d){this.name="Pin";this._type=d;this._number=a;this._analogNumber=void 0;this._maxPWMValue=255;this._value=0;this._lastValue=-1;this._average=0;this._minimum=Math.pow(2,16);this._numSamples=this._sum=this._maximum=0;this._generator=this._filters=null;this._autoSetValueCallback=this.autoSetValue.bind(this);this._evtDispatcher=new c(this)};a.prototype={setAnalogNumber:function(a){this._analogNumber=
a},get analogNumber(){return this._analogNumber},get number(){return this._number},setMaxPWMValue:function(){this._maxPWMValue=value},get maxPWMValue(){return this._maxPWMValue},get average(){return this._average},get minimum(){return this._minimum},get maximum(){return this._maximum},get value(){return this._value},set value(a){this._lastValue=this._value;this._preFilterValue=a;this._value=this.applyFilters(a);this.calculateMinMaxAndMean(this._value);this.detectChange(this._lastValue,this._value)},
get lastValue(){return this._lastValue},get preFilterValue(){return this._preFilterValue},get filters(){return this._filters},set filters(a){this._filters=a},get generator(){return this._generator},getType:function(){return this._type},setType:function(b){if(0<=b&&b<a.TOTAL_PIN_MODES)this._type=b},getCapabilities:function(){return this._capabilities},setCapabilities:function(a){this._capabilities=a},detectChange:function(a,d){a!==d&&(this.dispatchEvent(new e(e.CHANGE)),0>=a&&0!==d?this.dispatchEvent(new e(e.RISING_EDGE)):
0!==a&&0>=d&&this.dispatchEvent(new e(e.FALLING_EDGE)))},clearWeight:function(){this._sum=this._average;this._numSamples=1},calculateMinMaxAndMean:function(a){var d=Number.MAX_VALUE;this._minimum=Math.min(a,this._minimum);this._maximum=Math.max(a,this._maximum);this._sum+=a;this._average=this._sum/++this._numSamples;this._numSamples>=d&&this.clearWeight()},clear:function(){this._minimum=this._maximum=this._average=this._lastValue=this._preFilterValue;this.clearWeight()},addFilter:function(a){if(null!==
a){if(null===this._filters)this._filters=[];this._filters.push(a)}},addGenerator:function(a){this.removeGenerator();this._generator=a;this._generator.addEventListener(g.UPDATE,this._autoSetValueCallback)},removeGenerator:function(){null!==this._generator&&this._generator.removeEventListener(g.UPDATE,this._autoSetValueCallback);this._generator=null},removeAllFilters:function(){this._filters=null},autoSetValue:function(){this.value=this._generator.value},applyFilters:function(a){if(null===this._filters)return a;
for(var d=this._filters.length,c=0;c<d;c++)a=this._filters[c].processSample(a);return a},addEventListener:function(a,d){this._evtDispatcher.addEventListener(a,d)},removeEventListener:function(a,d){this._evtDispatcher.removeEventListener(a,d)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,d){return this._evtDispatcher.dispatchEvent(a,d)}};a.HIGH=1;a.LOW=0;a.ON=1;a.OFF=0;a.DIN=0;a.DOUT=1;a.AIN=2;a.AOUT=3;a.PWM=3;a.SERVO=4;a.SHIFT=5;a.I2C=6;a.TOTAL_PIN_MODES=
7;return a}();JSUTILS.namespace("BO.I2CBase");
BO.I2CBase=function(){var a,c=BO.Pin,e=JSUTILS.EventDispatcher,g=BO.IOBoardEvent;a=function(b,d,k){if(void 0!=b){this.name="I2CBase";this.board=b;var m=k||0,k=m&255,m=m>>8&255;this._address=d;this._evtDispatcher=new e(this);d=b.getI2cPins();2==d.length?(b.getPin(d[0]).getType()!=c.I2C&&(b.getPin(d[0]).setType(c.I2C),b.getPin(d[1]).setType(c.I2C)),b.addEventListener(g.SYSEX_MESSAGE,this.onSysExMessage.bind(this)),b.sendSysex(a.I2C_CONFIG,[k,m])):console.log("Error, this board does not support i2c")}};a.prototype=
{get address(){return this._address},onSysExMessage:function(b){var b=b.message,d=this.board.getValueFromTwo7bitBytes(b[1],b[2]),c=[];if(b[0]==a.I2C_REPLY&&d==this._address){for(var d=3,e=b.length;d<e;d+=2)c.push(this.board.getValueFromTwo7bitBytes(b[d],b[d+1]));this.handleI2C(c)}},sendI2CRequest:function(b){var d=[],c=b[0];d[0]=b[1];d[1]=c<<3;for(var c=2,e=b.length;c<e;c++)d.push(b[c]&127),d.push(b[c]>>7&127);this.board.sendSysex(a.I2C_REQUEST,d)},update:function(){},handleI2C:function(){},addEventListener:function(a,
c){this._evtDispatcher.addEventListener(a,c)},removeEventListener:function(a,c){this._evtDispatcher.removeEventListener(a,c)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,c){return this._evtDispatcher.dispatchEvent(a,c)}};a.I2C_REQUEST=118;a.I2C_REPLY=119;a.I2C_CONFIG=120;a.WRITE=0;a.READ=1;a.READ_CONTINUOUS=2;a.STOP_READING=3;return a}();JSUTILS.namespace("BO.PhysicalInputBase");
BO.PhysicalInputBase=function(){var a,c=JSUTILS.EventDispatcher;a=function(){this.name="PhysicalInputBase";this._evtDispatcher=new c(this)};a.prototype={addEventListener:function(a,c){this._evtDispatcher.addEventListener(a,c)},removeEventListener:function(a,c){this._evtDispatcher.removeEventListener(a,c)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,c){return this._evtDispatcher.dispatchEvent(a,c)}};return a}();JSUTILS.namespace("BO.IOBoard");
BO.IOBoard=function(){var a=224,c=240,e=247,g=111,b=107,d=BO.Pin,k=JSUTILS.EventDispatcher,m=BO.PinEvent,t=BO.WSocketEvent,B=BO.WSocketWrapper,l=BO.IOBoardEvent;return function(O,P,Q){function D(a){i.removeEventListener(l.FIRMWARE_NAME,D);var d=10*a.version;q("debug: Firmware name = "+a.name+"\t, Firmware version = "+a.version);23<=d?i.send([c,b,e]):console.log("error: You must upload StandardFirmata version 2.3 or greater from Arduino version 1.0 or higher")}function E(){q("debug: IOBoard ready");
F=!0;i.dispatchEvent(new l(l.READY));i.enableDigitalPins()}function G(a){a=a.substring(0,1);return a.charCodeAt(0)}function H(a){var c=a.target.getType(),b=a.target.number,a=a.target.value;switch(c){case d.DOUT:I(b,a);break;case d.AOUT:J(b,a);break;case d.SERVO:c=i.getDigitalPin(b),c.getType()==d.SERVO&&c.lastValue!=a&&J(b,a)}}function y(a){if(a.getType()==d.DOUT||a.getType()==d.AOUT||a.getType()==d.SERVO)a.hasEventListener(m.CHANGE)||a.addEventListener(m.CHANGE,H);else if(a.hasEventListener(m.CHANGE))try{a.removeEventListener(m.CHANGE,
H)}catch(c){q("debug: Caught pin removeEventListener exception")}}function J(h,b){var d=i.getDigitalPin(h).maxPWMValue,b=b*d,b=0>b?0:b,b=b>d?d:b;if(15<h||b>Math.pow(2,14)){var d=b,f=[];if(d>Math.pow(2,16))throw console.log("error: Extended Analog values > 16 bits are not currently supported by StandardFirmata"),"error: Extended Analog values > 16 bits are not currently supported by StandardFirmata";f[0]=c;f[1]=g;f[2]=h;f[3]=d&127;f[4]=d>>7&127;d>=Math.pow(2,14)&&(f[5]=d>>14&127);f.push(e);i.send(f)}else i.send([a|
h&15,b&127,b>>7&127])}function I(a,c){var b=Math.floor(a/8);if(c==d.HIGH)s[b]|=c<<a%8;else if(c==d.LOW)s[b]&=~(1<<a%8);else{console.log("warning: Invalid value passed to sendDigital, value must be 0 or 1.");return}i.sendDigitalPort(b,s[b])}function q(a){R&&console.log(a)}this.name="IOBoard";var i=this,r,n=[],s=[],u,C=[],K=[],L=[],o=[],v=0,M=19,F=!1,z="",w=0,x,N=!1,A=!1,R=BO.enableDebugging;x=new k(this);r=new B(O,P,Q);r.addEventListener(t.CONNECTED,function(){q("debug: Socket Status: (open)");i.dispatchEvent(new l(l.CONNECTED));
i.addEventListener(l.FIRMWARE_NAME,D);i.reportFirmware()});r.addEventListener(t.MESSAGE,function(h){var b="";if(h.message.match(/config/))b=h.message.substr(h.message.indexOf(":")+2),"multiClient"===b&&(q("debug: Multi-client mode enabled"),N=!0);else if(h=h.message,h*=1,n.push(h),b=n.length,128<=n[0]&&n[0]!=c){if(3===b){var j=n,h=j[0],f;240>h&&(h&=240,f=j[0]&15);switch(h){case 144:var g=8*f;f=g+8;j=j[1]|j[2]<<7;h={};f>=v&&(f=v);for(var b=0,k=g;k<f;k++){h=i.getDigitalPin(k);if(void 0==h)break;if(h.getType()==
d.DIN&&(g=j>>b&1,g!=h.value))h.value=g,i.dispatchEvent(new l(l.DIGITAL_DATA),{pin:h});b++}break;case 249:w=j[1]+j[2]/10;i.dispatchEvent(new l(l.FIRMWARE_VERSION),{version:w});break;case a:if(h=j[1],j=j[2],f=i.getAnalogPin(f),void 0!==f)f.value=i.getValueFromTwo7bitBytes(h,j)/1023,f.value!=f.lastValue&&i.dispatchEvent(new l(l.ANALOG_DATA),{pin:f})}n=[]}}else if(n[0]===c&&n[b-1]===e){f=n;f.shift();f.pop();switch(f[0]){case 121:for(h=3;h<f.length;h+=2)j=String.fromCharCode(f[h]),j+=String.fromCharCode(f[h+
1]),z+=j;w=f[1]+f[2]/10;i.dispatchEvent(new l(l.FIRMWARE_NAME),{name:z,version:w});break;case 113:j="";b=f.length;for(g=1;g<b;g+=2)h=String.fromCharCode(f[g]),h+=String.fromCharCode(f[g+1]),j+=h.charAt(0);i.dispatchEvent(new l(l.STRING_MESSAGE),{message:j});break;case 108:if(!A){for(var h={},b=1,g=j=0,k=f.length,p;b<=k;)if(127==f[b]){K[j]=j;p=void 0;if(h[d.DOUT])p=d.DOUT;if(h[d.AIN])p=d.AIN,C[g++]=j;p=new d(j,p);p.setCapabilities(h);y(p);o[j]=p;p.getCapabilities()[d.I2C]&&L.push(p.number);h={};j++;
b++}else h[f[b]]=f[b+1],b+=2;u=Math.ceil(j/8);q("debug: Num ports = "+u);for(f=0;f<u;f++)s[f]=0;v=j;q("debug: Num pins = "+v);i.send([c,105,e])}break;case 110:if(!A){h=f.length;b=f[2];g=o[f[1]];4<h?j=i.getValueFromTwo7bitBytes(f[3],f[4]):3<h&&(j=f[3]);g.getType()!=b&&(g.setType(b),y(g));if(g.value!=j)g.value=j;i.dispatchEvent(new l(l.PIN_STATE_RESPONSE),{pin:g})}break;case 106:if(!A){j=f.length;for(h=1;h<j;h++)127!=f[h]&&(C[f[h]]=h-1,i.getPin(h-1).setAnalogNumber(f[h]));if(N){for(f=0;f<i.getPinCount();f++)j=
i.getDigitalPin(f),i.send([c,109,j.number,e]);setTimeout(E,500);A=!0}else q("debug: System reset"),i.send(255),setTimeout(E,500)}break;default:i.dispatchEvent(new l(l.SYSEX_MESSAGE),{message:f})}n=[]}else 128<=h&&128>n[0]&&(console.log("warning: Malformed input data... resetting buffer"),n=[],h!==e&&n.push(h))});r.addEventListener(t.CLOSE,function(){q("debug: Socket Status: "+r.readyState+" (Closed)");i.dispatchEvent(new l(l.DISCONNECTED))});this.__defineGetter__("samplingInterval",function(){return M});
this.__defineSetter__("samplingInterval",function(a){10<=a&&100>=a?(M=a,i.send([c,122,a&127,a>>7&127,e])):console.log("warning: Sampling interval must be between 10 and 100")});this.__defineGetter__("isReady",function(){return F});this.getValueFromTwo7bitBytes=function(a,b){return b<<7|a};this.getSocket=function(){return r};this.reportVersion=function(){i.send(249)};this.reportFirmware=function(){i.send([c,121,e])};this.disableDigitalPins=function(){for(var a=0;a<u;a++)i.sendDigitalPortReporting(a,
d.OFF)};this.enableDigitalPins=function(){for(var a=0;a<u;a++)i.sendDigitalPortReporting(a,d.ON)};this.sendDigitalPortReporting=function(a,b){i.send([208|a,b])};this.enableAnalogPin=function(a){i.send([192|a,d.ON]);i.getAnalogPin(a).setType(d.AIN)};this.disableAnalogPin=function(a){i.send([192|a,d.OFF]);i.getAnalogPin(a).setType(d.AIN)};this.setDigitalPinMode=function(a,b){i.getDigitalPin(a).setType(b);y(i.getDigitalPin(a));i.send([244,a,b])};this.enablePullUp=function(a){I(a,d.HIGH)};this.getFirmwareName=
function(){return z};this.getFirmwareVersion=function(){return w};this.getPinCapabilities=function(){for(var a=[],b={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},c=0;c<o.length;c++){var d=[],e=0,g;for(g in o[c].getCapabilities()){var i=[];0<=g&&(i[0]=b[g],i[1]=o[c].getCapabilities()[g]);d[e]=i;e++}a[c]=d}return a};this.sendDigitalPort=function(a,b){i.send([144|a&15,b&127,b>>7])};this.sendString=function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(G(a[c])&127),b.push(G(a[c])>>
7&127);this.sendSysex(113,b)};this.sendSysex=function(a,b){var d=[];d[0]=c;d[1]=a;for(var f=0,g=b.length;f<g;f++)d.push(b[f]);d.push(e);i.send(d)};this.sendServoAttach=function(a,b,g){var f=[],b=b||544,g=g||2400;f[0]=c;f[1]=112;f[2]=a;f[3]=b%128;f[4]=b>>7;f[5]=g%128;f[6]=g>>7;f[7]=e;i.send(f);a=i.getDigitalPin(a);a.setType(d.SERVO);y(a)};this.getPin=function(a){return o[a]};this.getAnalogPin=function(a){return o[C[a]]};this.getDigitalPin=function(a){return o[K[a]]};this.analogToDigital=function(a){return i.getAnalogPin(a).number};
this.getPinCount=function(){return v};this.getI2cPins=function(){return L};this.reportCapabilities=function(){for(var a={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},b=0,c=o.length;b<c;b++)for(var d in o[b].getCapabilities())console.log("Pin "+b+"\tMode: "+a[d]+"\tResolution (# of bits): "+o[b].getCapabilities()[d])};this.send=function(a){r.sendString(a)};this.close=function(){r.close()};this.addEventListener=function(a,b){x.addEventListener(a,b)};this.removeEventListener=
function(a,b){x.removeEventListener(a,b)};this.hasEventListener=function(a){return x.hasEventListener(a)};this.dispatchEvent=function(a,b){return x.dispatchEvent(a,b)}}}();
