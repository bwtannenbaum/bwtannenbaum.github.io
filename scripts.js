// All the JavaScript from the <script> tags in the original HTML file
// should be placed in this file.

// For example, the animator logic:
var animator = (() => {
    // ... (the entire animator script from the original file)
})();

// And the appear animations content:
const appearAnimationsContent = {
    "kipv5d": { /* ... */ },
    "mrb1b1": { /* ... */ },
    // ... (the entire content of the <script type="framer/appear"> tag)
};

// And the script that triggers the animations:
(() => {
    function c(i, o, m) {
        if (window.__framer_disable_appear_effects_optimization__ || typeof animator > "u") return;
        let e = { detail: { bg: document.hidden } };
        requestAnimationFrame(() => {
            let a = "framer-appear-start";
            performance.mark(a, e);
            animator.animateAppearEffects(appearAnimationsContent, (s, p, d) => {
                let t = document.querySelector(s);
                if (t)
                    for (let [r, f] of Object.entries(p)) animator.startOptimizedAppearAnimation(t, r, f, d[r])
            }, i, o, m && window.matchMedia("(prefers-reduced-motion:reduce)").matches === !0, animator.getActiveVariantHash(JSON.parse(window.__framer__breakpoints.text)));
            let n = "framer-appear-end";
            performance.mark(n, e), performance.measure("framer-appear", { start: a, end: n, detail: e.detail })
        })
    }
    // ... (rest of the script)
})();