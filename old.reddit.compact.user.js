// ==UserScript==
// @name         Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)
// @namespace    https://github.com/soundjester/lemmy_monkey
// @description  Reformat widescreen desktop to look more like Reddit
// @version      2.3
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822, Jakylla
// @updateURL    https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.compact.user.js
// @downloadURL  https://github.com/soundjester/lemmy_monkey/raw/main/old.reddit.compact.user.js
// @match        https://*/*
// @run-at       document-idle
// ==/UserScript==
(function() {
	'use strict';
	/***********************************/
	/* set desired thumbnail size here */
	/* 70px - compact default          */
	/* 100px - large thumbnail default */
	/***********************************/
 	var thumbnailSize = 70;
	/***********************************/
	//Thank you God!
	var isLemmy;
	try {
		isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";
	} catch (_er) {
		isLemmy = false;
	}
	
	function AppendCommentCountText(container) {
		var svgElem = container.querySelectorAll("svg")[0].outerHTML;
		var numComms = container.title;
		var spanElem = container.querySelectorAll("span");
		var spanElemHTML = "";
		if(spanElem[0]){
			spanElemHTML = " " + spanElem[0].outerHTML
		}
		container.innerHTML = svgElem + numComms + spanElemHTML;
	}

	function ApplyCommentCountText(element) {
		const observer = new MutationObserver(function(mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					for (let addedNode of mutation.addedNodes) {
						try {
							var comm_count = addedNode.querySelectorAll(".btn.btn-link.btn-sm.text-muted.ps-0");
							comm_count.forEach(AppendCommentCountText);
						} catch (_er) {
							console.log(_er);
							return;
						}
					}
				}
			}
		});

		observer.observe(element, { childList: true, subtree: true });
	}

	function AppendPostURL(container) {
		var tld_link = container.querySelectorAll(".d-flex.text-muted.align-items-center.gap-1.small.m-0")[0];
		var post_details = container.querySelectorAll("span.small")[0];
		if (tld_link) {
			var post_detail = tld_link.nextSibling.innerText;
			post_details.innerHTML += " • " + tld_link.innerHTML
		}
	}

	function ApplyAppendPostURL(element) {
		const observer = new MutationObserver(function(mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					for (let addedNode of mutation.addedNodes) {
						try {
							var comm_count = addedNode.querySelectorAll("article > .col-12.col-sm-9 > .row > .col-12");
							comm_count.forEach(AppendPostURL);
						} catch (_er) {
							console.log(_er);
							return;
						}
					}
				}
			}
		});

		observer.observe(element, { childList: true, subtree: true });
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
			.home {
				padding-left: 1em !important;
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
			/* .col-12.col-md-8 {
				 padding-left: unset !important;
			}
			 */
			/* .col-12.col-sm-9 {
				 padding-left: unset !important;
			}
			 */
			/* navbar padding*/
			 .navbar {
				/*padding-left: 0 !important;
				*/
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
				 font-size: 0.85em !important;
				 flex: 0 0 4% !important;
				 max-width: 4% !important;
				 margin-top:unset !important;
			}
			/******************/
			/* thumbnail area */
			/******************/
			/*keep thumbnails as square as we can and about the size of each post row*/
			 .post-media {
				 min-width: `+thumbnailSize+`px !important;
				 max-width: `+thumbnailSize+`px !important;
				 margin-right: 1em !important;
			}
			 .thumbnail {
				 min-height: `+thumbnailSize+`px !important;
				 max-height: `+thumbnailSize+`px !important;
				 min-width: `+thumbnailSize+`px !important;
				 max-width: `+thumbnailSize+`px !important;
			         background-color: #333;
				 object-fit: scale-down; /* instead of "cover" */
			}
			/*this is needed for videos/gifs*/
			 .embed-responsive {
				 min-height: `+thumbnailSize+`px !important;
				 max-height: `+thumbnailSize+`px !important;
				 min-width: `+thumbnailSize+`px !important;
				 max-width: `+thumbnailSize+`px !important;
			}
			/*apply specific styling to text posts*/
			.post-media a[href^="/post/"] .thumbnail {
				border: 1px solid #333;
				background-color: unset !important;
			}   
			/*******************/
			/* main page posts */
			/*******************/
			/* post title font size*/
			 .h5, h5 {
				 font-size: 1rem !important;
				 margin-bottom: 0.1rem !important;
			}
			 .small, small {
				 font-size: 80%;
				 font-weight: 400;
			}
			/*can be adjusted smaller, but beyond .25 is gets too tight and individual post spacing starts to appear overlapping*/
			 .post-listing {
				 margin: 0.25rem 0 !important;
				 padding: 0.25rem 0 !important;
			}
			 .post-listing picture img.rounded-circle {
				 width: 1.25rem;
				 height: 1.25rem;
			}
			/*hide link TLD until it is moved back to the old spot*/
			 p.d-flex.text-muted.align-items-center.gap-1.small.m-0 {
				 display: none !important;
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
			 .ps-0 {
				 font-size: 0.75rem !important;
			}
			/*the below .btn is deprecated as .py-0 (above) provides more consistent spacing;
			 however, some may prefer the look of smaller text on buttons*/
			/*.btn {
				 font-size:0.75rem !important;
			}
			*/
			/*media collapse/expand button - appears after post title for offsite links that have a thumbnail*/
			 .btn.btn-sm.text-monospace.text-muted.d-inline-block {
				 padding-top: 0;
				 padding-bottom: 0;
			}
			 .text-body.mt-2.d-block{
				 font-size: 0.8rem;
				 display: none !important;
			}
			/************/
			/* comments */
			/************/
			/* restrict post and comment width - adjust to preference */
			 #postContent {
				 max-width: 940px;
			}
			 .md-div {
				 max-width: 940px;
			}
			 .mb-3.row {
				 max-width: 965px;
			}
			/*top comment doesn't need to hug the comment sort buttons.*/
			 .comments:first-child {
				 margin-top: 0.5rem !important;
			}
			/*allow top-level comment box to be resized*/
			 div > textarea {
				 resize: both !important;
			}
   			/*increase the indent for child comments*/
			 .ms-1 {
				 margin-left: 1em !important;
			}
			/***********/
			/* sidebar */
			/***********/
			 #sidebarContainer {
				 padding-right: 1em;
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
			 hr {
				 display: none;
			}
			/* highlight number of new comments */
			 .text-muted.fst-italic {
				 color: var(--bs-orange) !important;
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
			        .col-12 {
				          flex: 0 0 100% !important;
				          max-width: 75%;
			        }
				 .col-md-4 {
					 flex: 0 0 25% !important;
					 max-width: 25%;
				}
			        .vote-bar {
				          flex: 0 0 8% !important;
				          max-width: 8% !important;
			        }
			}
			 @media screen and (max-width: 768px) and (min-width: 576px) {
			        .col-12 {
				          flex: 0 0 100% !important;
				          max-width: 100%;
			        }
			        .col-sm-9 {
				          flex: 0 0 72% !important;
				          max-width: 72%;
			        }
			        .vote-bar {
				          flex: 0 0 8% !important;
				          max-width: 8% !important;
			        }
			}
			 @media screen and (max-width: 575px) {
				 #tagline {
					 padding-right: 1em;
				}
				 .col-12 {
					 flex: 0 0 100% !important;
					 max-width: 100%;
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
		/*append comment icon with "comment" text*/
		var comm_count = document.querySelectorAll(".btn.btn-link.btn-sm.text-muted.ps-0");
		comm_count.forEach(AppendCommentCountText);

		/*Apply AppendCommentCountText to dynamically loaded elements */
		ApplyCommentCountText(document.documentElement);

		/*append post TLD link to post detail area*/
		var post_info = document.querySelectorAll("article > .col-12.col-sm-9 > .row > .col-12");
		post_info.forEach(AppendPostURL);

		/* Apply AppendPostURL to dynamically loaded elements */
		ApplyAppendPostURL(document.documentElement);
	}
})();
