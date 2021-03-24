/*! modernizr 3.11.6 (Custom Build) | MIT *
 * https://modernizr.com/download/?-fetch-promises !*/
!function(n,e,o,i){function s(n,e){return typeof n===e}var t=[],r={_version:"3.11.6",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var o=this;setTimeout(function(){e(o[n])},0)},addTest:function(n,e,o){t.push({name:n,fn:e,options:o})},addAsyncTest:function(n){t.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var a=[];Modernizr.addTest("promises",function(){return"Promise"in e&&"resolve"in e.Promise&&"reject"in e.Promise&&"all"in e.Promise&&"race"in e.Promise&&function(){var n;return new e.Promise(function(e){n=e}),"function"==typeof n}()}),Modernizr.addTest("fetch","fetch"in e),function(){var n,e,o,i,r,f,u;for(var c in t)if(t.hasOwnProperty(c)){if(n=[],e=t[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)n.push(e.options.aliases[o].toLowerCase());for(i=s(e.fn,"function")?e.fn():e.fn,r=0;r<n.length;r++)f=n[r],u=f.split("."),1===u.length?Modernizr[u[0]]=i:(Modernizr[u[0]]&&(!Modernizr[u[0]]||Modernizr[u[0]]instanceof Boolean)||(Modernizr[u[0]]=new Boolean(Modernizr[u[0]])),Modernizr[u[0]][u[1]]=i),a.push((i?"":"no-")+u.join("-"))}}(),delete r.addTest,delete r.addAsyncTest;for(var f=0;f<Modernizr._q.length;f++)Modernizr._q[f]();n.Modernizr=Modernizr}(window,window,document);