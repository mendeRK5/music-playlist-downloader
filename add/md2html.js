! function () {
    "use strict";
    var o, d = {},
        m = {};
    d.setDefaultOptions = function () {
        m.renderOnLoad = !0, m.useMathJax = !0, m.protectMath = !0, m.style = "viewer", m.onRenderPage = void 0, m.commonmarkURL = "https://cdnjs.cloudflare.com/ajax/libs/commonmark/0.28.1/commonmark.min.js", m.MathJaxURL = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
    };
    d.setOption = function (e, n) {
        m[e] = n
    };
    var e = function (e, n) {
        var o = window.document.createElement("script");
        o.src = e, o.onload = n, window.document.head.appendChild(o)
    };
    d.tokenType = {
        MARK: 0,
        MASK: 1
    }, d.tokenLiteral = {
        MASK: "::MASK::"
    };
    var c = {
        plain: ["body {", "  color: #333;", "}", "main {", "  max-width: 40em;", "  margin-left: auto;", "  margin-right: auto;", "}", "h1, h2, h3, h4, h5, h6, h7 {", "  margin-top: 1.2em;", "  margin-bottom: 0.5em;", "}", "a:link, a:visited {", "  color: #03c;", "  text-decoration: none;", "}", "a:hover, a:active {", "  color: #03f;", "  text-decoration: underline;", "}", "img {", "  max-width: 100%;", "}", "pre, code, samp, kbd {", "  font-family: monospace,monospace;", "  font-size: 0.9em;", "  color: #009;", "}", "pre code, pre samp, pre kbd {", "  font-size: 1em;", "}", "pre {", "  padding: 0.5em;", "  overflow: auto;", "  background: #eee;", "}", "blockquote {", "  border-left: medium solid #ccc;", "  margin-left: 0;", "  margin-right: 0;", "  padding: 0.5em;", "  background: #eee;", "}", "blockquote *:first-child {", "  margin-top: 0;", "}", "blockquote *:last-child {", "  margin-bottom: 0;", "}"].join("\n"),
        viewer: ["@media screen and (min-width: 40em) {", "  body {", "    background: #444;", "  }", "  main {", "    background: #fff;", "    padding: 5em 6em;", "    margin: 1em auto;", "    box-shadow: 0.4em 0.4em 0.4em #222;", "  }", "}"].join("\n"),
        none: ""
    };
    c.viewer = c.plain + c.viewer, d.tokenize = function (e) {
        for (var n, o, t = ["\\\\begin{.*}[\\s\\S]*?\\\\end{.*}", "\\\\\\[[\\s\\S]*?\\\\\\]", "\\\\\\([\\s\\S]*?\\\\\\)", "\\\\\\$", "\\$\\$(?:[^\\\\]|\\\\.)*?\\$\\$", "\\$(?:[^$\\\\]|\\\\.)+?\\$", d.tokenLiteral.MASK].join("|"), a = new RegExp(t, "g"), i = [], r = 0; null !== (n = a.exec(e));) n.index > r && (o = e.substring(r, n.index), i.push([d.tokenType.MARK, o])), i.push([d.tokenType.MASK, n[0]]), r = a.lastIndex;
        return o = e.substring(r), e.length > r && i.push([d.tokenType.MARK, o]), i
    }, d.mask = function (e) {
        var n, o, t, a = [],
            i = [];
        for (t = 0; t < e.length; t++) n = e[t][0], o = e[t][1], n === d.tokenType.MARK ? a.push(o) : (a.push(d.tokenLiteral.MASK), i.push(o));
        return {
            text: a.join(""),
            tokenValues: i
        }
    }, d.unmask = function (e, n) {
        var o = new RegExp(d.tokenLiteral.MASK, "g"),
            t = 0;
        return e.replace(o, function () {
            return n[t++]
        })
    }, d.renderCommonMark = function (e) {
        var n = (new o.Parser).parse(e);
        return (new o.HtmlRenderer).render(n)
    }, d.protectMathAndRenderCommonMark = function (e) {
        var n = d.tokenize(e),
            o = d.mask(n),
            t = d.renderCommonMark(o.text);
        return d.unmask(t, o.tokenValues)
    }, d.render = function (e) {
        return m.protectMath ? d.protectMathAndRenderCommonMark(e) : d.renderCommonMark(e)
    }, d.renderPage = function () {
        var e, n, o = window.document.getElementsByTagName("textarea"),
            t = window.document.createElement("main");
        0 < o.length ? (e = o[0].value.trim(), o[0].remove()) : (e = window.document.body.innerHTML.trim(), window.document.body.innerHTML = ""), void 0 !== window.document.title && "" !== window.document.title || (n = e.split("\n", 1)[0].replace(/^\s*#*\s*|\s*#*\s*$/g, ""), window.document.title = n), window.document.body.appendChild(t);
        var a = window.document.createElement("style"),
            i = c[m.style];
        a.appendChild(window.document.createTextNode(i)), window.document.head.appendChild(a);
        var r = window.document.createElement("meta");
        r.name = "viewport", r.content = "width=device-width; initial-scale=1.0", window.document.head.appendChild(r), t.innerHTML = d.render(e), m.useMathJax && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, t]), void 0 !== m.onRenderPage && m.onRenderPage()
    }, d.turn = function (input,output) {
        var n, e=window.document.getElementById(input).value.trim().replace('<','＜'),
            t = window.document.getElementById(output);
        void 0 !== window.document.title && "" !== window.document.title || (n = e.split("\n", 1)[0].replace(/^\s*#*\s*|\s*#*\s*$/g, ""), window.document.title = n);
        t.innerHTML = d.render(e), m.useMathJax && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, t]), void 0 !== m.onRenderPage && m.onRenderPage()
    },
    d.main = function () {
        d.setDefaultOptions(), "undefined" != typeof window ? (! function () {
            var e;
            for (e in m) "undefined" != typeof window && void 0 !== window.texme && void 0 !== window.texme[e] && (m[e] = window.texme[e])
        }(), e(m.commonmarkURL, function () {
            o = window.commonmark
        }), m.useMathJax && (window.MathJax = {
            tex2jax: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"]
                ],
                processEscapes: !0
            },
            TeX: {
                equationNumbers: {
                    autoNumber: "AMS"
                }
            },
            skipStartupTypeset: !0
        }, e(m.MathJaxURL)), m.renderOnLoad && (window.onload = d.renderPage), window.texme = d) : (o = require("commonmark"), module.exports = d)
    }, d.main()
}();