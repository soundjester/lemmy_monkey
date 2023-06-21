// ==UserScript==
// @name         Compact Lemmy to Old.Reddit Re-format (Observer)
// @namespace    http://tampermonkey.net/
// @version      1.9.5
// @description  Reformat widescreen desktop to look more like Reddit
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822
// @match        https://*/*
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
		/**************************
		* NSFW automatic un-blur  *
		***************************/
		GM_addStyle(".img-blur {filter: none !important; -webkit-filter: none !important; -moz-filter:none !important; -o-filter: none !important; -ms-filter: none !important;}");
		/**************************
		* bootstrap column widths *
		***************************/
		GM_addStyle(".container, .container-lg, .container-md, .container-sm, .container-xl { max-width: 100% !important; }"); //main container
		GM_addStyle(".col-md-4 { flex: 0 0 20% !important; max-width: 20%; padding-right:unset !important; }"); //sidebar width
		GM_addStyle(".col-md-8 { flex: 0 0 80% !important; max-width: 80%; }"); //main post area (witdh optimized for widescreen)
		GM_addStyle(".col-sm-2 { flex: 0 0 10% !important; max-width: 10% }");
		GM_addStyle(".col-8 { max-width: 100% !important; }");
		// specific column combos that need padding adjustment
		GM_addStyle(".col-12.col-md-8 { padding-left: unset !important; }");
		GM_addStyle(".col-12.col-sm-9 { padding-left: unset !important; }");
		// navbar padding
		GM_addStyle(".navbar { padding-left: 0 !important; padding-right: 1em !important; }");
		GM_addStyle(".navbar-nav { margin-top: 0px !important; margin-bottom: 0px !important; }");
		// control vertical padding
		GM_addStyle(".mb-1, .my-1 { margin-bottom: 0.1rem !important; }");
		GM_addStyle(".mb-2, .my-2 { margin-bottom: 0.1rem !important; }");
		GM_addStyle(".mt-3, .my-3 { margin-top: 0.1rem !important; }");
		GM_addStyle(".mt-4, .my-4 { margin-top: 0.1rem !important; }");
		/**************
		* voting area *
		**************/
		GM_addStyle(".vote-bar { font-size: .85em; }"); //can be modified as you like
		GM_addStyle(".vote-bar { flex: 0 0 4% !important; max-width: 4% !important;}");
		/*****************
		* thumbnail area *
		******************/
		GM_addStyle(".post-media { min-width: 70px !important; max-width: 70px !important; margin-right:1em !important }"); //keep thumbnails as square as we can and about the size of each post row
		GM_addStyle(".thumbnail { min-height: 70px; max-height: 70px; min-width: 70px; max-width: 70px; }"); //keep thumbnails as square as we can and about the size of each post row
		GM_addStyle(".embed-responsive { min-height: 70px; max-height: 70px; min-width: 70px; max-width: 70px; }"); //this may be needed for videos/gifs - nothing to test on yet
		/******************
		* main page posts *
		*******************/
		GM_addStyle(".h5, h5 {  font-size: 1rem !important; margin-bottom: 0.1rem !important;}"); // post title font size
		GM_addStyle(".post-listing { margin: 0.25rem 0 !important; padding: 0.25rem 0 !important;}"); //can be adjusted smaller, but beyond .25 is gets too tight and individual post spacing starts to appear overlapping
		GM_addStyle(".post-listing picture img.rounded-circle{ width:1.25rem; height:1.25rem;}");
		GM_addStyle(".post-listing .d-none .row .col-sm-2 { max-width:100px; }"); //thumbnail width control (keep it square, dang it!)
		GM_addStyle(".post-listing .d-none .row .col-sm-9 { display:flex; align-items:unset !important; }");
		GM_addStyle(".py-0 { font-size:0.75rem !important; }"); //comment number and fediverse/lemmy links
		//GM_addStyle(".btn { font-size:0.75rem !important; }"); //this is deprecated as .py-0 provides more consistent spacing; however, some may prefer the look of smaller text on buttons
		/************
		* comments  *
		************/
		GM_addStyle(".comments:first-child {  padding-top: 0.5rem !important; }"); //top comment doesn't need to hug the comment sort buttons.
		GM_addStyle(".comments:not(:first-child) {  margin-left: 1em !important; }");
		GM_addStyle(".comment { margin-top: 0.2em; }");
		GM_addStyle(".comment p { max-width: 840px }"); //this can be adjuted to preference.  840px looks nice though.
		GM_addStyle(".col-sm-12 > textarea { resize: both !important; }"); //allow top-level comment box to be resized
		GM_addStyle(".comment textarea {  max-width: 840px; resize: both !important; }"); //allow comment reply box to be resized
		GM_addStyle(".comment .details > div > div > .md-div > p { font-size:0.9rem; }");
		GM_addStyle(".flex-grow-1 {  flex-grow: 0 !important; }"); // keep tools with comment box
		GM_addStyle(".form-row { width:50% }");
		// collapse comment chain on the very left - credit to ShittyKopper
		GM_addStyle(".comment .d-flex button[aria-label='Collapse'], .comment .d-flex button[aria-label='Expand'] {    order: -1;  }");
		/******************************
		* entire page display tweaks  *
		******************************/
		GM_addStyle("#app > div > .container-lg { margin-left: 1em !important;}");
		GM_addStyle("#app > div > .container-lg { max-width: 99% !important; }");
		GM_addStyle("#app > div > .container-lg { margin-left: unset !important }");
		GM_addStyle("#app > nav > .container-lg { max-width: 100% !important;}");
		GM_addStyle("#app > navbar > .container-lg { margin-left: unset !important }");
		GM_addStyle("#app > .mt-4 > .container-lg hr.my-3 { display: none;}");
		// post index layout
		GM_addStyle("#app > .mt-4 > .container-lg > .row  { margin: unset !important;}");
		GM_addStyle("#app > .mt-4 > .container-lg > .row > main { max-width:100%;}");
		// post layout
		GM_addStyle("#app > .mt-4 > .container-lg > .row > .col-md-8 { width:calc(100% - 450px);}");
		GM_addStyle("#app > .mt-4 > .container-lg > .row > .col-md-4 { width:450px;}");
		// Fix user drop down menu position
		GM_addStyle(".dropdown-content {right: 0px;}");
		//table styles - primarily used on the "Communities" page
		GM_addStyle(".table-responsive {   margin-top:0.5em; }");
		GM_addStyle(".table-sm td, .table-sm th {   padding: .1rem;   vertical-align: middle; }");
		// some instances include a tag line
		GM_addStyle("#tagline {margin-left:1em;}");
		//*********************************************//
		//* Specific screen size (mobile) adjustments *//
		//*********************************************//
		GM_addStyle("@media screen and (min-width:1981px) {#app { max-width:1980px; margin-left:auto; margin-right:auto;}}"); //big screens
		GM_addStyle("@media screen and (max-width:1100px) and (min-width:731px) {.col-md-4 { flex: 0 0 33.3333% !important; max-width: 33.3333%; }}");
		GM_addStyle("@media screen and (max-width:1100px) and (min-width:731px) {.col-md-8 { flex: 0 0 66.6666% !important; max-width: 66.6666%; }}");
		GM_addStyle("@media screen and (max-width:1100px) and (min-width:731px) {.navbar { padding-right: 0em !important; }}");
		GM_addStyle("@media screen and (max-width:1100px) and (min-width:576px) {.col-1 { flex: 0 0 6% !important; max-width: 6% !important;}}");
		GM_addStyle("@media screen and (max-width:1100px) and (min-width:576px) {.col-12.col-sm-9 { padding-left: 1em !important; }}");
		GM_addStyle("@media screen and (max-width:730px) {.col-md-8 { flex: 0 0 100% !important; max-width: 100%; }}");
		GM_addStyle("@media screen and (max-width:730px) and (min-width:576px) {.pl-1, .px-1 { padding-left: unset !important; }}");
		GM_addStyle("@media screen and (max-width:730px) {.pl-3, .px-3 { padding-left: 1rem !important; padding-right: 1rem !important; }}");
		GM_addStyle("@media screen and (max-width:575px) {.col-12.col-md-8 { padding-right: 0em !important; }}");
		GM_addStyle("@media screen and (max-width:575px) {.col-8 { flex: 0 0 75% !important; max-width: 75%; }}");
		GM_addStyle("@media screen and (max-width:575px) {.col-4 { flex: 0 0 25% !important; max-width: 25%; justify-content: flex-end !important; display: flex !important;}}");
		
		//move tagline element to be between navbar and content nav buttons
		var div_list = document.querySelectorAll("div#app");
		var div_array = [...div_list];
		
		div_array.forEach(container => {
			var firstTargDiv = container.querySelector("div#tagline");
			var secondTargDiv = container.querySelector(".mt-4.p-0.fl-1");
			//-- Swap last to first.
			if(firstTargDiv !== null && secondTargDiv !== null){
				container.insertBefore(firstTargDiv, secondTargDiv);
			}
		});
	}
})();
