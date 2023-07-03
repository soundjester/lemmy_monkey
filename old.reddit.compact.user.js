// ==UserScript==
// @name         Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)
// @namespace    https://github.com/soundjester/lemmy_monkey
// @description  Reformat widescreen desktop to look more like Reddit
// @version      2.6
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
 	var readingWidth = 940; /*controls the width of comments and text posts on individual post pages - default=940*/
	/***********************************/
	//Thank you God!
	var isLemmy;
	try {
		isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";
	} catch (_er) {
		isLemmy = false;
	}
	/*modify the presentation of fonts based on thumbnail size - larger thumbnails make resized test look a little silly...*/
	if(thumbnailSize<100){
		var postTitleFont = "font-size: 1rem !important;";
		var voteBarFont = "font-size: 0.95em !important;";
		var voteBarTopMargin = "unset";
		var smallTextFont = "80%";
		var postPFPSize = "1.25rem";
		var postFedLinks = "font-size: 0.75rem !important;";
	} else {
		var postTitleFont = "";
		var voteBarFont = "";
		var voteBarTopMargin = "unset"
		var smallTextFont = "unset !important;";
		var postPFPSize = "";
		var postFedLinks = "";
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
    		return;
	}
	async function ApplyCommentCountText(element) {
		const observer = new MutationObserver(function(mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					for (let addedNode of mutation.addedNodes) {
						try {
							var comm_count = addedNode.querySelectorAll(".btn.btn-link.btn-sm.text-muted.ps-0");
							comm_count.forEach(AppendCommentCountText);
						} catch (_er) {
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
    		return;
	}
	async function ApplyAppendPostURL(element) {
		const observer = new MutationObserver(function(mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					for (let addedNode of mutation.addedNodes) {
						try {
							var comm_count = addedNode.querySelectorAll("article > .col-12.col-sm-9 > .row > .col-12");
							comm_count.forEach(AppendPostURL);
						} catch (_er) {
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
			/***************/
			/* main page   */
			/***************/
			:root{
				--bs-body-font-size: 0.9375rem;
			}
			.home, .post, .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
				max-width: 100% !important;
			}
			#navbar {
				min-width: 100%;
			}
			/* padding between navbar and main content */
			.mt-4, .my-4 {
				margin-top: 0.5rem !important;
			}
			.vote-bar {
				min-width: 2.5em;
			}
			/*sidebar width*/
			 .col-md-4 {
				 flex: 0 0 20% !important;
				 width: 20% !important;
			}
			/*main post area (witdh optimized for widescreen)*/
			 .col-md-8 {
				 flex: 0 0 80% !important;
				 width: 80%;
			         max-width: unset;
			}
			/* Fix user drop down menu position */
			 .dropdown-content {
				 right: 0px;
			}
			.dropdown-menu.show {
				width: 100%;
			}
			hr {
				display: none;
			}
			/*table styles - primarily used on the "Communities" page*/
			 .table-responsive {
				 margin-top: 0.5em;
			}
			 .table-sm td, .table-sm th {
				 padding: 0.1rem;
				 vertical-align: middle;
			}
			/* user profile and community icons on posts */
			.small > a > picture > img {
				width: `+postPFPSize+`;
				height: `+postPFPSize+`;
			}
			/************************/
			/* Lemmy v0.17.4 hacks  */
			/************************/
			.col-sm-2 {
				flex: 0 0 1%;
				max-width: 16.66667%;
			}
				ul.text-muted.small > li.list-inline-item > a > picture > img,
				ul.text-muted.small > li.list-inline-item > span > a > picture > img{
				height: 1.5em !important;
				width: 1.5em !important;
			}
			/***************************/
			/* main page post listing  */
			/***************************/
			/* post title font size*/
			 .h5, h5 {
				 `+postTitleFont+`
				 margin-bottom: 0.1rem !important;
			}
   			/* enforce consistent spacing between posts in the post list*/
			.post-listing {
				margin-top: 0px !important;
				min-height: `+(thumbnailSize+10)+`px;
			}
			/*hide link TLD until it is moved back to the old spot*/
			 .small.m-0 {
				 display: none !important;
			}
			/*comment number and fediverse/lemmy links*/
			 .ps-0 {
				 `+postFedLinks+`
			}
			/* highlight number of new comments */
			 a > span.fst-italic {
				 color: var(--bs-orange) !important;
			}
			/*media collapse/expand button - appears after post title for offsite links that have a thumbnail*/
			 .btn.btn-sm.text-monospace.text-muted.d-inline-block {
				 padding-top: 0;
				 padding-bottom: 0;
			}
			 .text-body.mt-2.d-block{
				 display: none !important;
			}
			/***************/
			/* voting area */
			/***************/
			/*can be modified as you like*/
			 .vote-bar {
				 `+voteBarFont+`
				 flex: 0 0 4% !important;
				 max-width: 4% !important;
				 margin-top: `+voteBarTopMargin+` !important;
			}
			.col.flex-grow-0 {
				align-self: center !important;
			}
			.small, small {
				 font-size: `+smallTextFont+`;
				 font-weight: 400;
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
			a[href^="/post/"] .thumbnail {
				border: 1px solid #333;
				background-color: unset !important;
			}
			.px-0 {
				max-height: `+thumbnailSize+`px !important;
			}
			/************/
			/* comments */
			/************/
			/* Profile and Community Banner size */
			 .position-relative.mb-2 {
				 max-width: 730px;
			}
			/* restrict post and comment width - adjust to preference */
			/* may use li[role="comment"] instead of .md-div - this fully restricts all comment elements (eg. divider lines_ */
			 #postContent, .md-div, .alert-warning  {
				 max-width: `+readingWidth+`px;
			}
			 .mb-3.row {
				 max-width: `+(readingWidth+25)+`px; /*top-comment textarea needs extra width*/
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
					flex: 1 0 75% !important;
				}
				.col-md-4 {
					flex: 0 0 25% !important;
					max-width: 25%;
				}
				.vote-bar {
					flex: 0 0 8% !important;
					max-width: 8% !important;
				}
				.col-sm-9 {
					max-width: unset !important;
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
