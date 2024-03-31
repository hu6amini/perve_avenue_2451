//Reply Counter
function waitForElementToAppear(selector, callback) {
    const interval = setInterval(function() {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100);
}

waitForElementToAppear('.post', function() {
    const processPostElements = function() {
        const posts = document.querySelectorAll('.post');
        const getPageNumber = function(postIndex) {
            const searchParams = new URLSearchParams(window.location.search);
            return parseInt(searchParams.get('st') || 0) + postIndex + 1;
        };

        posts.forEach(function(post, index) {
            // Check if .reply_counter already exists
            if (!post.querySelector('.reply_counter')) {
                (function createReplyCounter(postElement, postIndex) {
                    const replyCounter = document.createElement('b');
                    replyCounter.className = 'reply_counter';
                    replyCounter.textContent = '#' + getPageNumber(postIndex);
                    const miniButtons = postElement.querySelector('.mini_buttons.rt.Sub');
                    if (miniButtons) {
                        miniButtons.appendChild(replyCounter);
                    }
                })(post, index);
            }
        });
    };

    processPostElements();

    // Mutation Observer
    const mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(addedNode) {
                    if (addedNode.classList && addedNode.classList.contains('post')) {
                        processPostElements();
                    }
                });
            }
        });
    });

    const targetNode = document.querySelector('body');
    const config = { childList: true, subtree: true };

    const countObserver = mutationObserver.observe(targetNode, config);
});

//Favicons
document.addEventListener("DOMContentLoaded",(function(){function updateFaviconsForLinks(e){e.forEach((e=>{if(!(e.closest(".spoiler .code_top a")||e.closest(".fancyborder a")||e.closest(".quote_top a")||e.querySelector("img"))){let o=document.createElement("img");e.href.includes("youtu.be")?o.src="https://www.google.com/s2/favicons?domain=youtube.com":o.src="https://www.google.com/s2/favicons?domain="+e.href,o.alt="fav",e.matches(".quote a,.tmsg a")?(o.width=14,o.height=14):(o.width=16,o.height=16),e.prepend(o)}}))}const e=new MutationObserver((e=>{e.forEach((e=>{updateFaviconsForLinks(e.target.querySelectorAll(".color a, span.tmsg a"))}))})),o=document.querySelector("body");e.observe(o,{childList:!0,subtree:!0});updateFaviconsForLinks(document.querySelectorAll(".color a, span.tmsg a"))}));
//Quote
document.addEventListener("DOMContentLoaded",(()=>{function expandQuotes(e){const updateHeight=()=>{const t=e.querySelector(".quotebtn button");if(!t&&e.scrollHeight>170){e.style.maxHeight="170px";const t=document.createElement("div");t.className="quotebtn";const o=document.createElement("button");o.innerHTML="Show More...",t.appendChild(o),e.appendChild(t),o.addEventListener("click",(o=>{o.preventDefault(),o.stopPropagation(),e.style.transition="max-height 0.382s ease-in-out",e.style.maxHeight=e.scrollHeight+"px",t.style.display="none",setTimeout((()=>{e.style.maxHeight="none"}),382)}))}else t&&e.scrollHeight<=170&&t.parentNode.remove()};updateHeight();const t=new ResizeObserver(updateHeight);t.observe(e);const o=e.querySelector(".spoiler .code_top a");o&&o.addEventListener("click",(()=>{e.style.maxHeight="none",t.disconnect()}))}function modifyQuoteTop(e){const t=e.textContent,o=e.querySelector("a");if(t.includes("@")){const n=t.replace(/QUOTE\s*\(([^@]+)@[^)]+\)\s*/,"$1 said:");e.innerHTML=n,e.style.color="var(--mdcol)",o&&(e.appendChild(o),o.style.color="var(--mdcol)")}else{const t=e.querySelector(".quote_top b");t&&(t.style.opacity=1)}}(function initializeExpandQuotes(){document.querySelectorAll(".quote").forEach(expandQuotes),new MutationObserver((e=>{for(const t of e)t.addedNodes.length>0&&t.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&(e.classList.contains("quote")?expandQuotes(e):e.querySelectorAll(".quote").forEach(expandQuotes))}))})).observe(document.body,{childList:!0,subtree:!0})})(),document.querySelectorAll(".quote_top").forEach(modifyQuoteTop),function observeMutations(){new MutationObserver((e=>{for(const t of e)"childList"===t.type&&t.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.querySelectorAll(".quote_top").forEach(modifyQuoteTop)}))})).observe(document.body,{childList:!0,subtree:!0})}()}));
//Textarea Autogrow
document.addEventListener("DOMContentLoaded",(function(){!function resizeTextarea(){const e=document.querySelector("textarea#Post");function updateTextareaHeight(){e.style.height="0",e.style.height=e.scrollHeight+"px",e.style.maxHeight="655px"}e&&(updateTextareaHeight(),e.addEventListener("input",updateTextareaHeight),window.addEventListener("load",updateTextareaHeight),e.addEventListener("paste",(function(){setTimeout(updateTextareaHeight,0)})))}()}));
//Goto
document.addEventListener("DOMContentLoaded",(function(){let e;function scrollToSmooth(e){window.scrollTo({top:e,behavior:"smooth",duration:600})}function showGotoElement(e){e.classList.add("active"),e.style.zIndex="9999"}function hideGotoElement(e){e.classList.remove("active")}!function initSmoothScrolling(){document.querySelector(".p_up").addEventListener("click",(()=>{scrollToSmooth(0)})),document.querySelector(".p_down").addEventListener("click",(()=>{scrollToSmooth(document.body.scrollHeight)}));const o=document.querySelector(".goto");window.addEventListener("scroll",(()=>{clearTimeout(e),showGotoElement(o),e=setTimeout((()=>{hideGotoElement(o)}),3e3)})),o.addEventListener("mouseenter",(()=>{clearTimeout(e),showGotoElement(o)})),o.addEventListener("mouseleave",(()=>{e=setTimeout((()=>{hideGotoElement(o)}),3e3)}))}()}));
//Preview
document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".send").forEach((function(e){var n=e.querySelectorAll("ul li.Item");if(n.length>=2){var t=document.getElementById("loading");t&&n[1].appendChild(t)}}))}));
