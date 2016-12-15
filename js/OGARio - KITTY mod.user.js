
// ==UserScript==
// @name         KITTY mod v2 (OGARio v3)
// @namespace    ogario.v2
// @version      2.6.10
// @description  OGARio - KITTY mod v2
// @author       szymy and KITTY (mod only)
// @icon         https://kittymod.github.io/mod/logo.png
// @match        http://agar.io/*
// @downloadURL  https://kittymod.github.io/mod/kittymod.user.js
// @updateURL    https://kittymod.github.io/mod/kittymod.user.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// Copyright © 2016 ogario.ovh

if (location.host == "agar.io" && location.pathname == "/") {

    location.href = "http://agar.io/ogario" + window.location.search + location.hash;
    //return;
}

var ogarioCSS =     '<link href="http://cdn.ogario.ovh/v3/ogario.v3.css?v=300" rel="stylesheet"></link>';
var ogarioSniffJS = '<script src="http://cdn.ogario.ovh/v3/ogario.v3.sniff.js?v=300"></script>';
var ogarioJS =      '<script src="http://cdn.ogario.ovh/v3/ogario.v3.js?v=300" charset="utf-8"></script>';

var cpickerJS =  '<script src="http://cdn.ogario.ovh/static/js/bootstrap-colorpicker.min.js"></script>';
var toastrJS =   '<script src="http://cdn.ogario.ovh/static/js/toastr.min.js"></script>';
var switchJS =   '<script src="http://cdn.ogario.ovh/static/js/switchery.min.js"></script>';
var rangeJS =    '<script src="http://cdn.ogario.ovh/static/js/rangeslider.min.js"></script>';
var perfectJS =  '<script src="http://cdn.ogario.ovh/static/js/perfect-scrollbar.jquery.min.js"></script>';

var kittyJS = '<script src="https://kittymod.github.io/mod/kittymod.js"></script>';

var cpickerCSS = '<link href="http://cdn.ogario.ovh/static/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrCSS =  '<link href="http://cdn.ogario.ovh/static/css/toastr.min.css" rel="stylesheet"></link>';
var switchCSS =  '<link href="http://cdn.ogario.ovh/static/css/switchery.min.css" rel="stylesheet"></link>';
var rangeCSS =   '<link href="http://cdn.ogario.ovh/static/css/rangeslider.css" rel="stylesheet"></link>';
var perfectCSS = '<link href="http://cdn.ogario.ovh/static/css/perfect-scrollbar.min.css" rel="stylesheet"></link>';

var ytJS = '<script src="http://www.youtube.com/iframe_api"></script>';
var faCSS  = '<link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>';
var gaJS = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-86435799-2', 'auto'); ga('send', 'pageview');</script>";

var modVersion = GM_info.script.version;

function inject(page) {
    var page = page.replace("</head>", cpickerCSS + toastrCSS + switchCSS + rangeCSS + perfectCSS + ogarioCSS + faCSS + cpickerJS + toastrJS + switchJS + rangeJS + perfectJS + ogarioSniffJS + ytJS + gaJS + "</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    page = page.replace("</body>", ogarioJS + kittyJS + "<script>init('" + modVersion + "');</script>" + "</body>");
    return page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});