// ==UserScript==
// @name         Lemmy to Old.Reddit Re-format (Observer)
// @namespace    https://github.com/soundjester/lemmy_monkey/
// @description  Reformat Lemmy instances to the style of old.reddit - larger thumbnails
// @version      1.10
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822
// @updateURL    https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.user.js
// @downloadURL  https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.user.js
// @match        https://*/*
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
	// Lemmy to old.Reddit style reformats (portable custom stylesheet)
	if (isLemmy) {
		const css = `
			/**************************/
			/* NSFW automatic un-blur */
			/**************************/
			 .img-blur {
				 filter: none !important;
				 -webkit-filter: none !important;
				 -moz-filter: none !important;
				 -o-filter: none !important;
				 -ms-filter: none !important;
			}
			/***************************/
			/* bootstrap column widths */
			/***************************/
			/*main container*/
			 .container, .container-lg, .container-md, .container-sm, .container-xl {
				 max-width: 100% !important;
			}
			/*sidebar width*/
			 .col-md-4 {
				 flex: 0 0 20% !important;
				 max-width: 20%;
				 padding-right: unset !important;
			}
			/*main post area (witdh optimized for widescreen)*/
			 .col-md-8 {
				 flex: 0 0 80% !important;
				 max-width: 80%;
			}
			 .col-sm-2 {
				 flex: 0 0 10% !important;
				 max-width: 10%;
			}
			 .col-sm-9 {
				 flex: 0 0 80% !important;
				 max-width: 80%;
			}
			 .col-8 {
				 max-width: 100% !important;
			}
			/* specific column combos that need padding adjustment*/
			 .col-12.col-md-8 {
				 padding-left: unset !important;
			}
			 .col-12.col-sm-9 {
				 margin-left: 1em !important;
			}
			/* navbar padding*/
			 .navbar {
				 padding-left: 0 !important;
				 padding-right: 1em !important;
			}
			 .navbar-nav {
				 margin-top: 0px !important;
				 margin-bottom: 0px !important;
			}
			/* control vertical padding*/
			 .mb-1, .my-1 {
				 margin-bottom: 0.1rem !important;
			}
			 .mb-2, .my-2 {
				 margin-bottom: 0.1rem !important;
			}
			 .mt-3, .my-3 {
				 margin-top: 0.1rem !important;
			}
			 .mt-4, .my-4 {
				 margin-top: 0.1rem !important;
			}
			/***************/
			/* voting area */
			/***************/
			/*can be modified as you like*/
			 .vote-bar {
				 flex: 0 0 4% !important;
				 max-width: 4% !important;
				 margin-top: 1em !important;
			}
			.unselectable.pointer.font-weight-bold.text-muted.px-1 {
				font-size: 1.2em;
			}
			/******************/
			/* thumbnail area */
			/******************/
			/*keep thumbnails as square as we can and about the size of each post row*/
			 .post-media {
				 min-width: 100px !important;
				 max-width: 100px !important;
				 margin-right: 1em !important;
			}
			 .thumbnail {
				 min-height: 100px !important;
				 max-height: 100px !important;
				 min-width: 100px !important;
				 max-width: 100px !important;
			}
			/*this is needed for videos/gifs*/
			 .embed-responsive {
				 min-height: 100px !important;
				 max-height: 100px !important;
				 min-width: 100px !important;
				 max-width: 100px !important;
			}
			/*******************/
			/* main page posts */
			/*******************/
			/*can be adjusted smaller, but beyond .25 is gets too tight and individual post spacing starts to appear overlapping*/
			 .post-listing {
				 margin: 0.25rem 0 !important;
				 padding: 0.25rem 0 !important;
			}
			 .post-listing picture img.rounded-circle {
				 width: 1.25rem;
				 height: 1.25rem;
			}
			/*thumbnail width control (keep it square, dang it!)*/
			 .post-listing .d-none .row .col-sm-2 {
				 max-width: 100px;
			}
			 .post-listing .d-none .row .col-sm-9 {
				 display: flex;
				 align-items: unset !important;
			}
			/*comment number and fediverse/lemmy links*/
			 .py-0 {
				 font-size: 0.75rem !important;
			}
			/*the below .btn is deprecated as .py-0 (above) provides more consistent spacing;
			 however, some may prefer the look of smaller text on buttons*/
			/*.btn {
				 font-size:0.75rem !important;
			} */
			/*media collapse/expand button - appears after post title for offsite links that have a thumbnail*/
			 .btn.btn-link.text-monospace.text-muted.small.d-inline-block {
				 padding-top: 0;
				 padding-bottom: 0;
			}
			/************/
			/* comments */
			/************/
			/*top comment doesn't need to hug the comment sort buttons.*/
			 .comments:first-child {
				 padding-top: 0.5rem !important;
			}
			/*increase child comment indentation*/
			 .comment.ml-1 {
				 margin-left: 1em !important;
			}
			 .comment {
				 margin-top: 0.2em;
			}
			/*this can be adjuted to preference. 840px looks nice though.*/
			 .comment p {
				 max-width: 840px;
			}
			/*allow top-level comment box to be resized*/
			 .col-sm-12 > textarea {
				 resize: both !important;
			}
			/*allow comment reply box to be resized*/
			 .comment textarea {
				 max-width: 840px;
				 resize: both !important;
			}
			 .comment .details > div > div > .md-div > p {
				 font-size: 0.9rem;
			}
			/* keep tools with comment box*/
			 .flex-grow-1 {
				 flex-grow: 0 !important;
			}
			 .form-row {
				 width: 50%;
			}
			/* collapse comment chain on the very left - credit to ShittyKopper*/
			 .comment .d-flex button[aria-label="Collapse"], .comment .d-flex button[aria-label="Expand"] {
				 order: -1;
			}
			/******************************/
			/* entire page display tweaks */
			/******************************/
			 #app > div > .container-lg {
				 margin-left: 1em !important;
				 max-width: 99% !important;
				 margin-left: unset !important;
			}
			 #app > nav > .container-lg {
				 max-width: 100% !important;
			}
			 #app > navbar > .container-lg {
				 margin-left: unset !important;
			}
			/* post index layout*/
			 #app > .mt-4 > .container-lg hr.my-3 {
				 display: none;
			}
			 #app > .mt-4 > .container-lg > .row {
				 margin: unset !important;
			}
			/* post layout*/
			 #app > .mt-4 > .container-lg > .row > main {
				 max-width: 100%;
			}
			 #app > .mt-4 > .container-lg > .row > .col-md-8 {
				 width: calc(100% - 450px);
			}
			 #app > .mt-4 > .container-lg > .row > .col-md-4 {
				 width: 450px;
			}
			/* Fix user drop down menu position*/
			 .dropdown-content {
				 right: 0px;
			}
			/* Profile and Community Banner size */
			.position-relative.mb-2 {
				max-width: 730px;
			}
			/*table styles - primarily used on the "Communities" page*/
			 .table-responsive {
				 margin-top: 0.5em;
			}
			 .table-sm td, .table-sm th {
				 padding: 0.1rem;
				 vertical-align: middle;
			}
			/* some instances include a tag line*/
			 #tagline {
				 margin-left: 1em;
			}
			/**********************************************/
			/** Specific screen size (mobile) adjustments */
			/**********************************************/
			 @media screen and (min-width: 1981px) {
				 #app {
					 max-width: 1980px;
					 margin-left: auto;
					 margin-right: auto;
				}
			}
			 @media screen and (min-width: 1200px) and (max-width: 1640px) {
				 .col-md-4 {
					 flex: 0 0 25% !important;
					 max-width: 25%;
				}
				 .col-md-8 {
					 flex: 0 0 75% !important;
					 max-width: 75%;
				}
			}
			 @media screen and (max-width: 1199px) and (min-width: 992px) {
				 .col-md-4 {
					 flex: 0 0 33.3333% !important;
					 max-width: 33.3333%;
				}
				 .col-md-8 {
					 flex: 0 0 66.6666% !important;
					 max-width: 66.6666%;
				}
				 .navbar {
					 padding-right: 0em !important;
				}
			}
			 @media screen and (max-width: 1199px) and (min-width: 576px) {
				 .col-1 {
					 flex: 0 0 6% !important;
					 max-width: 6% !important;
				}
				 .col-12.col-sm-9 {
					 padding-left: 1em !important;
				}
			}
			 @media screen and (max-width: 940px) and (min-width: 576px) {
				 .col-md-8 {
					 flex: 0 0 100% !important;
					 max-width: 100%;
				}
			}
			 @media screen and (max-width: 768px) and (min-width: 576px) {
				 .pl-1, .px-1 {
					 padding-left: unset !important;
				}
				 .pl-3, .px-3 {
					 padding-left: 1rem !important;
					 padding-right: 1rem !important;
				}
			}
			 @media screen and (max-width: 575px) {
				 .col-12.col-md-8 {
					 padding-right: 0em !important;
				}
				 .col-8 {
					 flex: 0 0 75% !important;
					 max-width: 75%;
				}
				 .col-4 {
					 flex: 0 0 25% !important;
					 max-width: 25%;
					 justify-content: flex-end !important;
					 display: flex !important;
				}
			 }`

		const styleTag = document.createElement('style');
		styleTag.appendChild(document.createTextNode(css));
		document.head.appendChild(styleTag);

		/*move tagline element to be between navbar and content nav buttons*/
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
		/*Fix navbar craziness involving the search button*/
		var nav_list = document.querySelectorAll(".navbar-nav");
		
		[...nav_list].forEach(container => {
			if (!container.className.includes("my-2") && !container.className.includes("ml-auto") && !container.className.includes("ml-1")) {
				container.className += " " + "my-2";
			}
		});		
	}
})();
