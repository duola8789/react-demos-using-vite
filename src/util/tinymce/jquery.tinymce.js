!function(){function p(){return d.tinymce}var f,l,u,s=[],d="undefined"!=typeof global?global:window,m=d.jQuery,y=(m.fn.tinymce=function(c){var e,t,i,o=this,a="";if(o.length){if(!c)return p()?p().get(o[0].id):null;o.css("visibility","hidden");function n(){var a=[],r=0;u||(y(),u=!0),o.each(function(e,t){var n=t.id,i=c.oninit;n||(t.id=n=p().DOM.uniqueId()),p().get(n)||(t=p().createEditor(n,c),a.push(t),t.on("init",function(){var e,t=i;o.css("visibility",""),i&&++r==a.length&&("string"==typeof t&&(e=-1===t.indexOf(".")?null:p().resolve(t.replace(/\.\w+$/,"")),t=p().resolve(t)),t.apply(e||p(),a))}))}),m.each(a,function(e,t){t.render()})}var r;d.tinymce||l||!(e=c.script_url)?1===l?s.push(n):n():(l=1,t=e.substring(0,e.lastIndexOf("/")),-1!=e.indexOf(".min")&&(a=".min"),d.tinymce=d.tinyMCEPreInit||{base:t,suffix:a},-1!=e.indexOf("gzip")&&(i=c.language||"en",e=e+(/\?/.test(e)?"&":"?")+"js=true&core=true&suffix="+escape(a)+"&themes="+escape(c.theme||"modern")+"&plugins="+escape(c.plugins||"")+"&languages="+(i||""),d.tinyMCE_GZ||(d.tinyMCE_GZ={start:function(){function n(e){p().ScriptLoader.markDone(p().baseURI.toAbsolute(e))}n("langs/"+i+".js"),n("themes/"+c.theme+"/theme"+a+".js"),n("themes/"+c.theme+"/langs/"+i+".js"),m.each(c.plugins.split(","),function(e,t){t&&(n("plugins/"+t+"/plugin"+a+".js"),n("plugins/"+t+"/langs/"+i+".js"))})},end:function(){}})),(r=document.createElement("script")).type="text/javascript",r.onload=r.onreadystatechange=function(e){e=e||window.event,2===l||"load"!=e.type&&!/complete|loaded/.test(r.readyState)||(p().dom.Event.domLoaded=1,l=2,c.script_loaded&&c.script_loaded(),n(),m.each(s,function(e,t){t()}))},r.src=e,document.body.appendChild(r))}return o},m.extend(m.expr[":"],{tinymce:function(e){return!!(e.id&&"tinymce"in d&&(e=p().get(e.id))&&e.editorManager===p())}}),function(){function i(e){"remove"===e&&this.each(function(e,t){t=u(t);t&&t.remove()}),this.find("span.mceEditor,div.mceEditor").each(function(e,t){t=p().get(t.id.replace(/_parent$/,""));t&&t.remove()})}function o(n){var e=this;if(null!=n)i.call(e),e.each(function(e,t){(t=p().get(t.id))&&t.setContent(n)});else if(0<e.length&&(e=p().get(e[0].id)))return e.getContent()}function l(e){return!!(e&&e.length&&d.tinymce&&e.is(":tinymce"))}var u=function(e){var t=null;return t=e&&e.id&&d.tinymce?p().get(e.id):t},s={};m.each(["text","html","val"],function(e,t){var r=s[t]=m.fn[t],c="text"===t;m.fn[t]=function(e){var i,a,t=this;return l(t)?e!==f?(o.call(t.filter(":tinymce"),e),r.apply(t.not(":tinymce"),arguments),t):(i="",a=arguments,(c?t:t.eq(0)).each(function(e,t){var n=u(t);i+=n?c?n.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):n.getContent({save:!0}):r.apply(m(t),a)}),i):r.apply(t,arguments)}}),m.each(["append","prepend"],function(e,t){var i=s[t]=m.fn[t],a="prepend"===t;m.fn[t]=function(n){var e=this;return l(e)?n!==f?("string"==typeof n&&e.filter(":tinymce").each(function(e,t){t=u(t);t&&t.setContent(a?n+t.getContent():t.getContent()+n)}),i.apply(e.not(":tinymce"),arguments),e):void 0:i.apply(e,arguments)}}),m.each(["remove","replaceWith","replaceAll","empty"],function(e,t){var n=s[t]=m.fn[t];m.fn[t]=function(){return i.call(this,t),n.apply(this,arguments)}}),s.attr=m.fn.attr,m.fn.attr=function(e,t){var n,i,a=this,r=arguments;return e&&"value"===e&&l(a)?t!==f?(o.call(a.filter(":tinymce"),t),s.attr.apply(a.not(":tinymce"),r),a):(n=a[0],(i=u(n))?i.getContent({save:!0}):s.attr.apply(m(n),r)):s.attr.apply(a,r)}})}();