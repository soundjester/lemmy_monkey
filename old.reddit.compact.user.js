// ==UserScript==
// @name         Compact Lemmy to old.Reddit Re-format (UI 0.18.1 rc.4)
// @namespace    https://github.com/soundjester/lemmy_monkey
// @description  Reformat widescreen desktop to look more like Reddit
// @version      0.1
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822, Jakylla
// @updateURL    https://github.com/soundjester/lemmy_monkey/raw/dev-v.01-Lemmy-v.18.1/old.reddit.compact.user.js
// @downloadURL  https://github.com/soundjester/lemmy_monkey/raw/dev-v.01-Lemmy-v.18.1/old.reddit.compact.user.js
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
 	var thumbnailSize = 100;
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
    var smallTextFont = "";
  } else {
    var postTitleFont = "";
    var voteBarFont = "";
    var voteBarTopMargin = "1em";
    var smallTextFont = "font-size: unset !important;";
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
		var tld_link = container.querySelectorAll(".small.m-0")[0];
		var post_details = container.querySelectorAll("div.small")[0];
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
			/***************/
			/* main page   */
			/***************/
      .home, .post {
          max-width: 100%;
      }
      .vote-bar {
          min-width: 2.5em;
      }
			/* post title font size*/
			 .h5, h5 {
				 `+postTitleFont+`
				 margin-bottom: 0.1rem !important;
			}
			 hr {
				 display: none;
			}
      #navbar {
         min-width: 100%;
      }
			/*hide link TLD until it is moved back to the old spot*/
			 .small.m-0 {
				 display: none !important;
			}
			/* highlight number of new comments */
			 .text-muted.fst-italic {
				 color: var(--bs-orange) !important;
			}
			/* Fix user drop down menu position*/
			 .dropdown-content {
				 right: 0px;
			}
			.dropdown-menu.show {
				width: 100%;
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
      .small {
         `+smallTextFont+`
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
			/* restrict post and comment width - adjust to preference */
			/* may use li[role="comment"] instead of .md-div - this fully restricts all comment elements (eg. divider lines_ */
			 #postContent, .md-div, .comments, .alert-warning  {
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
			}`

		const styleTag = document.createElement('style');
		styleTag.appendChild(document.createTextNode(css));
		document.head.appendChild(styleTag);

		/*append comment icon with "comment" text*/
		var comm_count = document.querySelectorAll(".btn.btn-link.btn-sm.text-muted.ps-0");
		comm_count.forEach(AppendCommentCountText);

		/*append post TLD link to post detail area*/
		var post_info = document.querySelectorAll(".col.flex-grow-1 > div.row > div.col.flex-grow-1");
		post_info.forEach(AppendPostURL);

		/* Apply AppendPostURL to dynamically loaded elements */
		ApplyAppendPostURL(document.documentElement);
	}
})();
