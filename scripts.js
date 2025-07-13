/**
 * Script 1: Cloudflare Email Decode (kept in HTML for dependency)
 * <script data-cfasync="false" src=".../email-decode.min.js"></script>
 */

/**
 * Script 2: Nested Link Click Handler
 */
(() => {
    function setupNestedLinks() {
        function openLink(href, rel, target) {
            let linkElement = document.createElement("a");
            linkElement.href = href;
            linkElement.target = target;
            linkElement.rel = rel;
            document.body.appendChild(linkElement);
            linkElement.click();
            linkElement.remove();
        }

        function handleClick(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("click", handleClick);
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            let href = this.getAttribute("href");
            if (!href) return;
            if (/Mac|iPod|iPhone|iPad/u.test(navigator.userAgent) ? event.metaKey : event.ctrlKey) {
                return openLink(href, "", "_blank");
            }
            let rel = this.getAttribute("rel") ?? "";
            let target = this.getAttribute("target") ?? "";
            openLink(href, rel, target);
        }

        function handleAuxClick(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("auxclick", handleAuxClick);
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            let href = this.getAttribute("href");
            if (href) {
                openLink(href, "", "_blank");
            }
        }

        function handleKeyDown(event) {
            if (this.dataset.hydrated) {
                this.removeEventListener("keydown", handleKeyDown);
                return;
            }
            if (event.key !== "Enter") return;
            event.preventDefault();
            event.stopPropagation();
            let href = this.getAttribute("href");
            if (!href) return;
            let rel = this.getAttribute("rel") ?? "";
            let target = this.getAttribute("target") ?? "";
            openLink(href, rel, target);
        }

        document.querySelectorAll("[data-nested-link]").forEach(element => {
            if (element instanceof HTMLElement) {
                element.addEventListener("click", handleClick);
                element.addEventListener("auxclick", handleAuxClick);
                element.addEventListener("keydown", handleKeyDown);
            }
        });
    }
    return setupNestedLinks;
})()();


/**
 * Script 3: Framer Breakpoint Rewriter
 */
(() => {
    function rewriteBreakpoints() {
        for (let element of document.querySelectorAll("[data-framer-original-sizes]")) {
            let originalSizes = element.getAttribute("data-framer-original-sizes");
            if (originalSizes === "") {
                element.removeAttribute("sizes");
            } else {
                element.setAttribute("sizes", originalSizes);
            }
            element.removeAttribute("data-framer-original-sizes");
        }
    }

    function setupBreakpointRewrite() {
        window.__framer_onRewriteBreakpoints = rewriteBreakpoints;
    }
    return setupBreakpointRewrite;
})()();

/**
 * Script 4: URL Parameter Preservation
 */
! function() {
    function constructUrlWithParams(newParams, baseUrl) {
        let hashIndex = baseUrl.indexOf("#");
        let urlWithoutHash = hashIndex === -1 ? baseUrl : baseUrl.substring(0, hashIndex);
        let hash = hashIndex === -1 ? "" : baseUrl.substring(hashIndex);
        let queryIndex = urlWithoutHash.indexOf("?");

        if (queryIndex === -1) {
            return urlWithoutHash + newParams + hash;
        }

        let existingParamsStr = urlWithoutHash.substring(queryIndex + 1);
        let newUrlParams = new URLSearchParams(newParams);
        let existingUrlParams = new URLSearchParams(existingParamsStr);

        for (let [key, value] of newUrlParams) {
            if (!existingUrlParams.has(key)) {
                existingUrlParams.append(key, value);
            }
        }
        return urlWithoutHash.substring(0, queryIndex + 1) + existingUrlParams.toString() + hash;
    }

    var linkSelector = 'div#main a[href^="#"],div#main a[href^="/"],div#main a[href^="."]',
        preserveParamsSelector = "div#main a[data-framer-preserve-params]",
        currentScript,
        preserveInternal = (currentScript = document.currentScript) == null ? void 0 : currentScript.hasAttribute("data-preserve-internal-params");

    if (window.location.search && !/bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent)) {
        let linksToUpdate = document.querySelectorAll(preserveInternal ? `${linkSelector},${preserveParamsSelector}` : preserveParamsSelector);
        for (let link of linksToUpdate) {
            let newHref = constructUrlWithParams(window.location.search, link.href);
            link.setAttribute("href", newHref);
        }
    }
}();


/**
 * Script 5: Framer Animator
 */
var animator = (() => {
    // ... All the minified animator code goes here ...
    var Lr = {
        animateAppearEffects: Oe,
        getActiveVariantHash: Ve,
        spring: D,
        startOptimizedAppearAnimation: oe
    };
    return Lr
})();

/**
 * Script 6: Framer Appear Animation Trigger
 */
(() => {
    function triggerAppearAnimation(i, o, m) {
        if (window.__framer_disable_appear_effects_optimization__ || typeof animator > "u") return;
        let e = {
            detail: {
                bg: document.hidden
            }
        };
        requestAnimationFrame(() => {
            let a = "framer-appear-start";
            performance.mark(a, e);
            animator.animateAppearEffects(JSON.parse(window.__framer__appearAnimationsContent.text), (s, p, d) => {
                let t = document.querySelector(s);
                if (t)
                    for (let [r, f] of Object.entries(p)) animator.startOptimizedAppearAnimation(t, r, f, d[r])
            }, i, o, m && window.matchMedia("(prefers-reduced-motion:reduce)").matches === !0, animator.getActiveVariantHash(JSON.parse(window.__framer__breakpoints.text)));
            let n = "framer-appear-end";
            performance.mark(n, e);
            performance.measure("framer-appear", {
                start: a,
                end: n,
                detail: e.detail
            })
        })
    }
    return triggerAppearAnimation
})()("data-framer-appear-id", "__Appear_Animation_Transform__", false);