// ==UserScript==
// @name         Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Reformat widescreen desktop to look more like Reddit
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822
// @match        https://enterprise.lemmy.ml/*
// @updateURL    https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.compact.user.js
// @downloadURL  https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.compact.user.js
// source-url    https://github.com/soundjester/lemmy_monkey/
// ==/UserScript==
(function() {
    'use strict';
    //Thank you God!
    var isLemmy;
    try {
        isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";
    } catch (_er) {
        isLemmy = false;
    }

    //special thanks to StackOverflow - the one true source of all code, amen.
    function GM_addStyle(css) {
        const style = document.getElementById("GM_addStyleBy8626") || (function() {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = "GM_addStyleBy8626";
            document.head.appendChild(style);
            return style;
        })();
        const sheet = style.sheet;
        sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
    }

  // Lemmy to old.Reddit style reformats (to be used for custom stylesheet at a later date)
	if (isLemmy) {
		//main container
		GM_addStyle(".container, .container-lg, .container-md, .container-sm, .container-xl { max-width: 100% !important; }");
		// bootstrap main column widths
		GM_addStyle(".col-md-4 { flex: 0 0 20% !important; max-width: 20%; }"); //sidebar width
		GM_addStyle(".col-md-8 { flex: 0 0 80% !important; max-width: 80%; }"); //main post area (for widescreen)
		
		// voting area
		GM_addStyle(".vote-bar { flex: 0 0 4% !important; max-width: 4% !important;}");
		
		//control size of thumbnails
		GM_addStyle(".post-media { min-width: 70px !important; max-width: 70px !important; margin-right:1em !important }"); //keep thumbnails as square as we can and about the size of each post row
		GM_addStyle(".thumbnail { min-height: 70px; max-height: 70px; min-width: 70px; max-width: 70px; }"); //keep thumbnails as square as we can and about the size of each post row
		//GM_addStyle(".embed-responsive-item { min-height: 70px; max-height: 70px; min-width: 70px; max-width: 70px; }"); //this may be needed for videos/gifs - nothing to test on yet
		GM_addStyle(".img-cover.img-icon.me-2 {   max-height: 20px;   max-width: 20px; }"); //community link icons
		
		/*************
		* font sizes *
		**************/
		// size of vote counter
		GM_addStyle(".vote-bar { font-size: .85em; }");
		GM_addStyle(".h5, h5 {  font-size: 1rem !important; }"); //post title
		GM_addStyle(".list-inline.mb-1.text-muted.small.mt-2 { font-size: .75em; }"); //author and community
		GM_addStyle(".d-flex align-items-center justify-content-start flex-wrap text-muted {font-size: .75em; }"); //number of comments
	}
})();
