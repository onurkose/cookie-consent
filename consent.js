"use strict";
(() => {
  var Qe = Object.defineProperty;
  var Xe = (n, e, t) => e in n ? Qe(n, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : n[e] = t;
  var p = (n, e, t) => (Xe(n, typeof e != "symbol" ? e + "" : e, t), t);
  var F = (n, e = "flex") => new Promise(t => {
      n.style.opacity = "0", n.style.display = e,
        function o() {
          let r = parseFloat(n.style.opacity);
          if (r >= 1) {
            t();
            return
          }
          let s = r + .1;
          n.style.opacity = s.toString(), requestAnimationFrame(o)
        }()
    }),
    D = n => new Promise(e => {
      n.style.opacity = "1",
        function t() {
          let r = parseFloat(n.style.opacity) - .1;
          n.style.opacity = r.toString(), r <= 0 ? (n.style.display = "none", e()) : requestAnimationFrame(t)
        }()
    });
  var C = class {
    static activateAlerts() {
      this.alertsActivated = !0
    }
    static alert(e, t) {
      if (this.alertsActivated && window.alert(e), t === "error") throw new Error(e)
    }
  };
  p(C, "alertsActivated", !1);
  var g = (n, e) => !!n && e.includes(n);
  var T = (n, e) => (Array.isArray(e) || (e = [e]), e.map(o => n.dispatchEvent(new Event(o, {
    bubbles: !0
  }))).every(o => o));

  function le(n, e, t, o = !0) {
    let r = t ? [t] : [];
    if (!n) return r;
    let s = n.split(",").reduce((i, a) => {
      let c = a.trim();
      return (!o || c) && i.push(c), i
    }, []);
    if (e) {
      let i = s.filter(a => g(a, e));
      return i.length ? i : r
    }
    return s
  }
  var de = n => Object.entries(n);
  var N = n => Object.keys(n);
  var V = n => {
    let {
      overflow: e
    } = getComputedStyle(n);
    return e === "auto" || e === "scroll"
  };
  var xe = n => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
  var y = (n, e, t = document) => {
    let o = t.querySelector(n);
    if (o instanceof e) return o
  };
  var fe = n => n.replace(/\/+$/, "");
  var Y = (n, e = !0) => (e !== n.checked && (n.checked = e, T(n, ["click", "input", "change"])), n.type === "checkbox" ? n.checked : n.value);
  var Se = n => new Promise(e => setTimeout(e, n));
  var G = class {
    constructor({
      element: e,
      duration: t
    }) {
      p(this, "element");
      p(this, "active", !1);
      p(this, "running", !1);
      p(this, "runningPromise");
      p(this, "duration");
      p(this, "isActive", () => this.active);
      p(this, "isRunning", () => this.running);
      p(this, "untilFinished", () => this.runningPromise);
      var o, r;
      this.element = typeof e == "string" ? y(e, HTMLElement) || C.alert(`No interaction with the ${e} selector was found.`, "error") : e, this.duration = {
        first: typeof t == "number" ? t : (o = t == null ? void 0 : t.first) != null ? o : 0,
        second: typeof t == "number" ? t : (r = t == null ? void 0 : t.second) != null ? r : 0
      }
    }
    async trigger(e) {
      return e === "first" && this.active || e === "second" && !this.active ? !1 : (e || (e = this.active ? "second" : "first"), T(this.element, "click"), this.running = !0, this.runningPromise = Se(this.duration[e]), await this.runningPromise, this.running = !1, this.active = e === "first", !0)
    }
  };
  var O = class {
    constructor({
      element: e,
      interaction: t,
      displayProperty: o,
      noTransition: r,
      startsHidden: s
    }) {
      p(this, "interaction");
      p(this, "noTransition");
      p(this, "displayProperty");
      p(this, "visible");
      p(this, "element");
      p(this, "isVisible", () => this.visible);
      if (this.element = typeof e == "string" ? y(e, HTMLElement) || C.alert(`No element with the ${e} selector was found.`, "error") : e, this.noTransition = r, this.displayProperty = o || "block", s ? (this.element.style.display = "none", this.visible = !1) : this.visible = xe(this.element), t) {
        let {
          element: i,
          duration: a
        } = t;
        this.interaction = new G({
          element: i,
          duration: a
        })
      }
    }
    async show() {
      this.visible || (this.interaction ? await this.interaction.trigger("first") : this.noTransition ? this.element.style.display = this.displayProperty : await F(this.element, this.displayProperty), this.visible = !0)
    }
    async hide() {
      this.visible && (this.interaction ? await this.interaction.trigger("second") : this.noTransition ? this.element.style.display = "none" : await D(this.element), this.visible = !1)
    }
  };
  p(O, "displayProperties", ["block", "flex", "grid", "inline-block", "inline"]);
  var pe = (n = document) => n.documentElement.getAttribute("data-wf-site");
  var ue = async n => {
    var t, o;
    let {
      Webflow: e
    } = window;
    if (!(!e || !("destroy" in e) || !("ready" in e) || !("require" in e)) && !(n && !n.length)) {
      if (n || (e.destroy(), e.ready()), !n || n.includes("ix2")) {
        let r = e.require("ix2");
        if (r) {
          let {
            store: s,
            actions: i
          } = r, {
            eventState: a
          } = s.getState().ixSession, c = Object.entries(a);
          n || r.destroy(), r.init(), await Promise.all(c.map(l => s.dispatch(i.eventStateChanged(...l))))
        }
      }
      if (!n || n.includes("commerce")) {
        let r = e.require("commerce"),
          s = pe();
        r && s && (r.destroy(), r.init({
          siteId: s,
          apiUrl: "https://render.webflow.com"
        }))
      }
      if (n != null && n.includes("lightbox") && ((t = e.require("lightbox")) == null || t.ready()), n != null && n.includes("slider")) {
        let r = e.require("slider");
        r && (r.redraw(), r.ready())
      }
      return n != null && n.includes("tabs") && ((o = e.require("tabs")) == null || o.redraw()), new Promise(r => e.push(() => r(void 0)))
    }
  };

  function Ze(n) {
    if (Array.isArray(n)) {
      for (var e = 0, t = Array(n.length); e < n.length; e++) t[e] = n[e];
      return t
    } else return Array.from(n)
  }
  var he = !1;
  typeof window != "undefined" && (me = {
    get passive() {
      he = !0
    }
  }, window.addEventListener("testPassive", null, me), window.removeEventListener("testPassive", null, me));
  var me, J = typeof window != "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1),
    M = [],
    Q = !1,
    ye = -1,
    U = void 0,
    A = void 0,
    R = void 0,
    Te = function(e) {
      return M.some(function(t) {
        return !!(t.options.allowTouchMove && t.options.allowTouchMove(e))
      })
    },
    X = function(e) {
      var t = e || window.event;
      return Te(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1)
    },
    et = function(e) {
      if (R === void 0) {
        var t = !!e && e.reserveScrollBarGap === !0,
          o = window.innerWidth - document.documentElement.clientWidth;
        if (t && o > 0) {
          let r = parseInt(window.getComputedStyle(window.top.document.body).getPropertyValue("padding-right"), 10);
          R = window.top.document.body.style.paddingRight, window.top.document.body.style.paddingRight = `${r+o}px`
        }
      }
      U === void 0 && (U = window.top.document.body.style.overflow, window.top.document.body.style.overflow = "hidden")
    },
    tt = function() {
      R !== void 0 && (window.top.document.body.style.paddingRight = R, R = void 0), U !== void 0 && (window.top.document.body.style.overflow = U, U = void 0)
    },
    ot = function() {
      return window.requestAnimationFrame(function() {
        if (A === void 0) {
          A = {
            position: window.top.body.style.position,
            top: window.top.body.style.top,
            left: window.top.body.style.left
          };
          let {
            scrollY: e,
            scrollX: t,
            innerHeight: o
          } = window;
          window.top.document.body.style.position = "fixed", window.top.document.body.style.top = `${-e}px`, window.top.document.body.style.left = `${-t}px`
        }
      })
    },
    nt = function() {
      if (A !== void 0) {
        let e = -parseInt(window.top.document.body.style.top, 10),
          t = -parseInt(window.top.document.body.style.left, 10);
        window.top.body.style.position = A.position, window.top.body.style.top = A.top, window.top.body.style.left = A.left, window.scrollTo(t, e), A = void 0
      }
    },
    rt = function(e) {
      return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1
    },
    it = function(e, t) {
      var o = e.targetTouches[0].clientY - ye;
      return Te(e.target) ? !1 : t && t.scrollTop === 0 && o > 0 || rt(t) && o < 0 ? X(e) : (e.stopPropagation(), !0)
    },
    Oe = function(e, t) {
      if (!e) {
        console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
        return
      }
      if (!M.some(function(r) {
          return r.targetElement === e
        })) {
        var o = {
          targetElement: e,
          options: t || {}
        };
        M = [].concat(Ze(M), [o]), J ? ot() : et(t), J && (e.ontouchstart = function(r) {
          r.targetTouches.length === 1 && (ye = r.targetTouches[0].clientY)
        }, e.ontouchmove = function(r) {
          r.targetTouches.length === 1 && it(r, e)
        }, Q || (document.addEventListener("touchmove", X, he ? {
          passive: !1
        } : void 0), Q = !0))
      }
    },
    Ae = function() {
      J && (M.forEach(function(e) {
        e.targetElement.ontouchstart = null, e.targetElement.ontouchmove = null
      }), Q && (document.removeEventListener("touchmove", X, he ? {
        passive: !1
      } : void 0), Q = !1), ye = -1), J ? nt() : tt(), M = []
    };
  var w = new WeakMap,
    x = new WeakMap,
    b = new WeakMap;
  var te = Symbol("anyProducer"),
    ke = Promise.resolve(),
    oe = Symbol("listenerAdded"),
    ne = Symbol("listenerRemoved"),
    re = !1,
    be = !1;

  function I(n) {
    if (typeof n != "string" && typeof n != "symbol" && typeof n != "number") throw new TypeError("`eventName` must be a string, symbol, or number")
  }

  function Z(n) {
    if (typeof n != "function") throw new TypeError("listener must be a function")
  }

  function P(n, e) {
    let t = x.get(n);
    if (t.has(e)) return t.get(e)
  }

  function j(n, e) {
    let t = typeof e == "string" || typeof e == "symbol" || typeof e == "number" ? e : te,
      o = b.get(n);
    if (o.has(t)) return o.get(t)
  }

  function st(n, e, t) {
    let o = b.get(n);
    if (o.has(e))
      for (let r of o.get(e)) r.enqueue(t);
    if (o.has(te)) {
      let r = Promise.all([e, t]);
      for (let s of o.get(te)) s.enqueue(r)
    }
  }

  function Me(n, e) {
    e = Array.isArray(e) ? e : [e];
    let t = !1,
      o = () => {},
      r = [],
      s = {
        enqueue(i) {
          r.push(i), o()
        },
        finish() {
          t = !0, o()
        }
      };
    for (let i of e) {
      let a = j(n, i);
      a || (a = new Set, b.get(n).set(i, a)), a.add(s)
    }
    return {
      async next() {
        return r ? r.length === 0 ? t ? (r = void 0, this.next()) : (await new Promise(i => {
          o = i
        }), this.next()) : {
          done: !1,
          value: await r.shift()
        } : {
          done: !0
        }
      },
      async return (i) {
        r = void 0;
        for (let a of e) {
          let c = j(n, a);
          c && (c.delete(s), c.size === 0 && b.get(n).delete(a))
        }
        return o(), arguments.length > 0 ? {
          done: !0,
          value: await i
        } : {
          done: !0
        }
      },
      [Symbol.asyncIterator]() {
        return this
      }
    }
  }

  function Ie(n) {
    if (n === void 0) return Pe;
    if (!Array.isArray(n)) throw new TypeError("`methodNames` must be an array of strings");
    for (let e of n)
      if (!Pe.includes(e)) throw typeof e != "string" ? new TypeError("`methodNames` element must be a string") : new Error(`${e} is not Emittery method`);
    return n
  }
  var L = n => n === oe || n === ne;

  function ee(n, e, t) {
    if (L(e)) try {
      re = !0, n.emit(e, t)
    } finally {
      re = !1
    }
  }
  var h = class n {
      static mixin(e, t) {
        return t = Ie(t), o => {
          if (typeof o != "function") throw new TypeError("`target` must be function");
          for (let i of t)
            if (o.prototype[i] !== void 0) throw new Error(`The property \`${i}\` already exists on \`target\``);

          function r() {
            return Object.defineProperty(this, e, {
              enumerable: !1,
              value: new n
            }), this[e]
          }
          Object.defineProperty(o.prototype, e, {
            enumerable: !1,
            get: r
          });
          let s = i => function(...a) {
            return this[e][i](...a)
          };
          for (let i of t) Object.defineProperty(o.prototype, i, {
            enumerable: !1,
            value: s(i)
          });
          return o
        }
      }
      static get isDebugEnabled() {
        var t, o;
        if (typeof((t = globalThis.process) == null ? void 0 : t.env) != "object") return be;
        let {
          env: e
        } = (o = globalThis.process) != null ? o : {
          env: {}
        };
        return e.DEBUG === "emittery" || e.DEBUG === "*" || be
      }
      static set isDebugEnabled(e) {
        be = e
      }
      constructor(e = {}) {
        var t;
        w.set(this, new Set), x.set(this, new Map), b.set(this, new Map), b.get(this).set(te, new Set), this.debug = (t = e.debug) != null ? t : {}, this.debug.enabled === void 0 && (this.debug.enabled = !1), this.debug.logger || (this.debug.logger = (o, r, s, i) => {
          try {
            i = JSON.stringify(i)
          } catch {
            i = `Object with the following keys failed to stringify: ${Object.keys(i).join(",")}`
          }(typeof s == "symbol" || typeof s == "number") && (s = s.toString());
          let a = new Date,
            c = `${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}.${a.getMilliseconds()}`;
          console.log(`[${c}][emittery:${o}][${r}] Event Name: ${s}
	data: ${i}`)
        })
      }
      logIfDebugEnabled(e, t, o) {
        (n.isDebugEnabled || this.debug.enabled) && this.debug.logger(e, this.debug.name, t, o)
      }
      on(e, t) {
        Z(t), e = Array.isArray(e) ? e : [e];
        for (let o of e) {
          I(o);
          let r = P(this, o);
          r || (r = new Set, x.get(this).set(o, r)), r.add(t), this.logIfDebugEnabled("subscribe", o, void 0), L(o) || ee(this, oe, {
            eventName: o,
            listener: t
          })
        }
        return this.off.bind(this, e, t)
      }
      off(e, t) {
        Z(t), e = Array.isArray(e) ? e : [e];
        for (let o of e) {
          I(o);
          let r = P(this, o);
          r && (r.delete(t), r.size === 0 && x.get(this).delete(o)), this.logIfDebugEnabled("unsubscribe", o, void 0), L(o) || ee(this, ne, {
            eventName: o,
            listener: t
          })
        }
      }
      once(e) {
        let t, o = new Promise(r => {
          t = this.on(e, s => {
            t(), r(s)
          })
        });
        return o.off = t, o
      }
      events(e) {
        e = Array.isArray(e) ? e : [e];
        for (let t of e) I(t);
        return Me(this, e)
      }
      async emit(e, t) {
        var a;
        if (I(e), L(e) && !re) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
        this.logIfDebugEnabled("emit", e, t), st(this, e, t);
        let o = (a = P(this, e)) != null ? a : new Set,
          r = w.get(this),
          s = [...o],
          i = L(e) ? [] : [...r];
        await ke, await Promise.all([...s.map(async c => {
          if (o.has(c)) return c(t)
        }), ...i.map(async c => {
          if (r.has(c)) return c(e, t)
        })])
      }
      async emitSerial(e, t) {
        var a;
        if (I(e), L(e) && !re) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
        this.logIfDebugEnabled("emitSerial", e, t);
        let o = (a = P(this, e)) != null ? a : new Set,
          r = w.get(this),
          s = [...o],
          i = [...r];
        await ke;
        for (let c of s) o.has(c) && await c(t);
        for (let c of i) r.has(c) && await c(e, t)
      }
      onAny(e) {
        return Z(e), this.logIfDebugEnabled("subscribeAny", void 0, void 0), w.get(this).add(e), ee(this, oe, {
          listener: e
        }), this.offAny.bind(this, e)
      }
      anyEvent() {
        return Me(this)
      }
      offAny(e) {
        Z(e), this.logIfDebugEnabled("unsubscribeAny", void 0, void 0), ee(this, ne, {
          listener: e
        }), w.get(this).delete(e)
      }
      clearListeners(e) {
        e = Array.isArray(e) ? e : [e];
        for (let t of e)
          if (this.logIfDebugEnabled("clear", t, void 0), typeof t == "string" || typeof t == "symbol" || typeof t == "number") {
            let o = P(this, t);
            o && o.clear();
            let r = j(this, t);
            if (r) {
              for (let s of r) s.finish();
              r.clear()
            }
          } else {
            w.get(this).clear();
            for (let [o, r] of x.get(this).entries()) r.clear(), x.get(this).delete(o);
            for (let [o, r] of b.get(this).entries()) {
              for (let s of r) s.finish();
              r.clear(), b.get(this).delete(o)
            }
          }
      }
      listenerCount(e) {
        var o, r, s, i, a, c;
        e = Array.isArray(e) ? e : [e];
        let t = 0;
        for (let l of e) {
          if (typeof l == "string") {
            t += w.get(this).size + ((r = (o = P(this, l)) == null ? void 0 : o.size) != null ? r : 0) + ((i = (s = j(this, l)) == null ? void 0 : s.size) != null ? i : 0) + ((c = (a = j(this)) == null ? void 0 : a.size) != null ? c : 0);
            continue
          }
          typeof l != "undefined" && I(l), t += w.get(this).size;
          for (let u of x.get(this).values()) t += u.size;
          for (let u of b.get(this).values()) t += u.size
        }
        return t
      }
      bindMethods(e, t) {
        if (typeof e != "object" || e === null) throw new TypeError("`target` must be an object");
        t = Ie(t);
        for (let o of t) {
          if (e[o] !== void 0) throw new Error(`The property \`${o}\` already exists on \`target\``);
          Object.defineProperty(e, o, {
            enumerable: !1,
            value: this[o].bind(this)
          })
        }
      }
    },
    Pe = Object.getOwnPropertyNames(h.prototype).filter(n => n !== "constructor");
  Object.defineProperty(h, "listenerAdded", {
    value: oe,
    writable: !1,
    enumerable: !0,
    configurable: !1
  });
  Object.defineProperty(h, "listenerRemoved", {
    value: ne,
    writable: !1,
    enumerable: !0,
    configurable: !1
  });
  var at = ["essential"],
    ge = ["personalization", "analytics", "marketing"],
    we = "uncategorized",
    ie = [...at, ...ge, we],
    f = "fs-cc",
    wo = f + "-ie",
    Le = ["informational", "opt-in", "opt-out"],
    B = {
      allow: "allow",
      deny: "deny",
      submit: "submit"
    },
    E = {
      banner: `[${f}="banner"]`,
      preferences: `[${f}="preferences"]`,
      manager: `[${f}="manager"]`
    },
    S = {
      allow: `[${f}="${B.allow}"]`,
      deny: `[${f}="${B.deny}"]`,
      submit: `[${f}="${B.submit}"]`,
      openPreferences: `[${f}="open-preferences"]`,
      close: `[${f}="close"]`
    },
    Ee = {
      interactionTrigger: `[${f}="interaction"]`
    },
    m = {
      categories: [`${f}-category`, `${f}-categories`],
      disableScroll: `${f}-scroll`,
      displayProperty: `${f}-display`,
      cookieMaxAge: `${f}-expires`,
      mode: `${f}-mode`,
      debugMode: `${f}-debug`,
      endpoint: `${f}-endpoint`,
      componentsSource: `${f}-source`,
      src: `${f}-src`,
      placeholder: `${f}-placeholder`,
      domain: `${f}-domain`
    },
    $ = {
      main: f,
      consentsUpdated: `${f}-updated`
    };
  var H = {
    checkbox: n => `[${f}-checkbox="${n}"]`,
    gtmEvent: n => `${n}-activated`
  };
  var $e = `<style>${E.banner},${E.manager},${E.preferences},${Ee.interactionTrigger}{display:none}</style>`;
  var ct = {
      info: "green",
      warning: "yellow",
      error: "red"
    },
    d = class {
      static activate() {
        this.init(), this.active = !0
      }
      static init() {
        this.element = document.createElement("div"), Object.assign(this.element.style, {
          position: "fixed",
          left: "auto",
          top: "auto",
          right: "16px",
          bottom: "0px",
          "z-index": "999999",
          "max-width": "320px",
          "font-size": "14px",
          "line-height": "1.25"
        }), document.body.appendChild(this.element)
      }
      static alert(e, t) {
        if (!this.active) return;
        let o = document.createElement("div");
        Object.assign(o.style, {
          position: "relative",
          padding: "16px",
          opacity: "0",
          "margin-bottom": "16px",
          "border-left": `4px solid ${ct[t]}`,
          "background-color": "#fff",
          "box-shadow": "1px 1px 3px 0 rgba(0, 0, 0, 0.1)",
          "word-break": "break-all"
        });
        let r = document.createElement("div");
        r.innerText = e, o.appendChild(r), o.insertAdjacentHTML("beforeend", `<div ${f}="close" style="position: absolute; left: auto; top: 4px; right: 8px; bottom: auto; cursor: pointer">\u2716</div>`), this.handleCard(o)
      }
      static handleCard(e) {
        let t = o => {
          o.target instanceof Element && o.target.closest(S.close) && (e.removeEventListener("click", t), e.remove())
        };
        e.addEventListener("click", t), this.element.insertAdjacentElement("afterbegin", e), F(e)
      }
    };
  d.active = !1;
  var se = Object.freeze({
      analytics: !1,
      essential: !0,
      marketing: !1,
      personalization: !1,
      uncategorized: !1
    }),
    K = Object.freeze({
      analytics: !0,
      essential: !0,
      marketing: !0,
      personalization: !0,
      uncategorized: !0
    }),
    Fe = "180";
  var _ = class {
    constructor() {
      this.confirmed = !1;
      this.bannerText = "empty";
      this.scripts = [];
      this.iFrames = [];
      this.userHasConfirmed = () => this.confirmed;
      this.getStoredElements = () => [...this.scripts, ...this.iFrames];
      this.getActivableElements = () => this.getStoredElements().filter(({
        active: e,
        categories: t
      }) => !e && t.every(o => this.consents[o]));
      this.getConsents = () => this.consents;
      this.getConsentsEntries = () => de(this.consents);
      this.getConsent = e => this.consents[e];
      this.getBannerText = () => this.bannerText;
      let {
        currentScript: e
      } = document, t = e == null ? void 0 : e.getAttribute(m.mode);
      switch (this.mode = g(t, Le) ? t : "opt-in", this.mode) {
        case "informational":
        case "opt-out":
          this.consents = {
            ...K
          };
          break;
        default:
          this.consents = {
            ...se
          }
      }
      this.cookieMaxAge = parseInt((e == null ? void 0 : e.getAttribute(m.cookieMaxAge)) || Fe);
      let o = e == null ? void 0 : e.getAttribute(m.debugMode);
      this.debugMode = o === "" || o === "true", this.debugMode && d.activate(), this.endpoint = e == null ? void 0 : e.getAttribute(m.endpoint), this.componentsSource = e == null ? void 0 : e.getAttribute(m.componentsSource), this.domain = e == null ? void 0 : e.getAttribute(m.domain), d.alert(`The cookie banner is set to ${this.mode} mode with a consent expiry time of ${this.cookieMaxAge} days.${this.endpoint?`The consents will be POSTed to ${this.endpoint}`:""}`, "info")
    }
    storeScript(e) {
      this.scripts.push({
        ...e,
        type: "script"
      })
    }
    storeIFrame(e) {
      this.iFrames.push({
        ...e,
        type: "iframe"
      })
    }
    storeConsents(e) {
      let t = [];
      return N(e).forEach(o => {
        if (o === "essential") return;
        let r = e[o];
        r === void 0 || r === this.consents[o] || (this.consents[o] = r, t.push(o))
      }), this.confirmed = !0, t
    }
    storeBannerText(e) {
      e && e.textContent && (this.bannerText = e.textContent)
    }
  };
  var De = async n => {
    let {
      origin: e,
      pathname: t,
      href: o
    } = window.location, {
      origin: r,
      pathname: s,
      href: i
    } = new URL(document.baseURI);
    try {
      if (n.startsWith("/")) {
        let ce = i === o ? e : r + s;
        n = fe(ce) + n
      }
      let {
        origin: a,
        pathname: c
      } = new URL(n);
      if (a + c === e + t) return;
      let u = await (await fetch(n)).text(),
        Je = new DOMParser().parseFromString(u, "text/html");
      Object.values(E).forEach(ce => {
        let Ce = Je.querySelector(ce);
        Ce && document.body.appendChild(Ce)
      }), ue()
    } catch (a) {
      d.alert(`${a}`, "error")
    }
  }, Ne = n => {
    if (V(n)) return n;
    let e = n.querySelectorAll("*");
    for (let t of e)
      if (V(t)) return t
  }, Ue = ({
    element: n
  }) => {
    let e = document.createElement("script");
    return e.type = "text/javascript", e.innerText = n.innerText, e.text = n.text, n.src && (e.src = n.src), e
  }, Re = ({
    element: n,
    src: e,
    placeholder: t
  }) => {
    let o = document.createElement("iframe");
    for (let {
        name: r,
        value: s
      }
      of n.attributes) o.setAttribute(r, s);
    return o.innerText = n.innerText, o.src = e, t && o.addEventListener("load", () => D(t)), o
  };
  var q = class extends h {
    constructor(t, o) {
      super();
      this.element = t;
      this.store = o;
      this.checkboxes = new Map;
      this.initElements(), this.listenEvents(), this.updateCheckboxes()
    }
    initElements() {
      let t = ge.filter(o => {
        let r = H.checkbox(o),
          s = this.element.querySelector(`input${r}, ${r} input`);
        console.log(s, `input${r}, ${r} input`)
        return !s || s.type !== "checkbox" ? !0 : (s.checked && Y(s, !1), this.checkboxes.set(o, s), !1)
      });
      t.length && d.alert(`The Consents Form is missing the following checkboxes: ${t.map(o=>H.checkbox(o)).join(", ")}.`, "warning")
    }
    listenEvents() {
      this.element.addEventListener("submit", t => this.handleSubmit(t))
    }
    handleSubmit(t) {
      t.preventDefault(), t.stopPropagation();
      let o = {};
      this.checkboxes.forEach((r, s) => {
        var i;
        o[s] = (i = r.checked) != null ? i : !1
      }), this.emit("submit", o)
    }
    updateCheckboxes() {
      let t = this.store.getConsents();
      this.checkboxes.forEach((o, r) => {
        !!t[r] !== o.checked && Y(o, t[r])
      })
    }
    submit() {
      T(this.element, "submit")
    }
  };
  var k = class extends h {
    constructor(t, o) {
      super();
      this.selector = t;
      this.store = o;
      this.disableScrollOnOpen = !1;
      this.ready = !1;
      this.isReady = () => this.ready;
      document.readyState === "complete" ? this.init() : window.addEventListener("load", () => this.init())
    }
    init() {
      let {
        banner: t,
        manager: o,
        preferences: r
      } = E;
      if (!this.initElements()) {
        switch (this.selector) {
          case t:
            d.alert(`No element with the ${t} attribute was found, it is required to have it!`, "error");
            break;
          case o:
            d.alert(`No element with the ${o} attribute was found, did you want to use the Manager component?`, "info");
            break;
          case r:
            d.alert(`No element with the ${r} attribute was found, did you want to use the Preferences component?`, "info");
            break
        }
        return
      }
      this.handleAccessibility(), this.listenEvents(), this.ready = !0, this.emit("ready", this.element)
    }
    initElements() {
      this.element = y(this.selector, HTMLElement);
      let {
        element: t,
        store: o
      } = this;
      if (!t) return !1;
      let r = y("form", HTMLFormElement, t);
      r && (this.form = new q(r, o));
      let s = t.getAttribute(m.displayProperty);
      this.disableScrollOnOpen = t.getAttribute(m.disableScroll) === "disable", this.disableScrollOnOpen && (this.scrollableElement = Ne(t));
      let i = y(Ee.interactionTrigger, HTMLElement, t);
      return this.displayController = new O({
        element: t,
        interaction: i ? {
          element: i
        } : void 0,
        displayProperty: g(s, O.displayProperties) ? s : "flex",
        startsHidden: !0
      }), !0
    }
    handleAccessibility() {
      let {
        element: t
      } = this;
      t && N(S).forEach(o => {
        let r = t.querySelector(S[o]);
        r && (r.setAttribute("role", "button"), r.setAttribute("tabindex", "0"))
      })
    }
    listenEvents() {
      let {
        element: t,
        form: o
      } = this;
      t && (t.addEventListener("click", r => this.handleMouseAndKeyboard(r)), t.addEventListener("keydown", r => this.handleMouseAndKeyboard(r)), o == null || o.on("submit", r => this.handleFormSubmit(r)))
    }
    handleMouseAndKeyboard(t) {
      var c;
      let {
        target: o
      } = t, {
        allow: r,
        deny: s,
        close: i,
        submit: a
      } = S;
      o instanceof Element && ("key" in t && t.key !== "Enter" || (o.closest(r) ? (this.emit("allow"), this.close()) : o.closest(s) ? (this.emit("deny"), this.close()) : o.closest(i) ? this.close() : o.closest(a) && ((c = this.form) == null || c.submit())))
    }
    handleFormSubmit(t) {
      this.emit("formsubmit", t), this.close()
    }
    show(t = !0) {
      let {
        element: o,
        displayController: r,
        disableScrollOnOpen: s,
        scrollableElement: i
      } = this;
      !o || !r || r.isVisible() === t || (r[t ? "show" : "hide"](), s && (t ? Oe(i || o, {
        reserveScrollBarGap: !0
      }) : Ae()), this.emit(t ? "open" : "close"))
    }
    open() {
      this.ready ? this.show() : this.once("ready").then(() => this.show())
    }
    close() {
      this.ready ? this.show(!1) : this.once("ready").then(() => this.show(!1))
    }
  };
  var je = (n = 21) => crypto.getRandomValues(new Uint8Array(n)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
  var Be = async ({
    id: n,
    endpoint: e,
    consents: t,
    action: o,
    bannerText: r
  }) => {
    if (e) try {
      let s = JSON.stringify({
          id: n,
          action: o,
          consents: t,
          bannerText: r,
          url: window.location.href,
          userAgent: navigator.userAgent
        }),
        i = await fetch(e, {
          body: s,
          method: "POST"
        });
      if (i.ok) d.alert("The new consents were successfully POSTed to the API endpoint.", "info");
      else throw new Error(`The API returned a ${i.status} status.`)
    } catch (s) {
      d.alert(`There was an error while POSTing to the API: ${s}`, "error")
    }
  };

  function ae(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t) n[o] = t[o]
    }
    return n
  }
  var lt = {
    read: function(n) {
      return n[0] === '"' && (n = n.slice(1, -1)), n.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function(n) {
      return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
    }
  };

  function ve(n, e) {
    function t(r, s, i) {
      if (typeof document != "undefined") {
        i = ae({}, e, i), typeof i.expires == "number" && (i.expires = new Date(Date.now() + i.expires * 864e5)), i.expires && (i.expires = i.expires.toUTCString()), r = encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var a = "";
        for (var c in i) i[c] && (a += "; " + c, i[c] !== !0 && (a += "=" + i[c].split(";")[0]));
        return document.cookie = r + "=" + n.write(s, r) + a
      }
    }

    function o(r) {
      if (!(typeof document == "undefined" || arguments.length && !r)) {
        for (var s = document.cookie ? document.cookie.split("; ") : [], i = {}, a = 0; a < s.length; a++) {
          var c = s[a].split("="),
            l = c.slice(1).join("=");
          try {
            var u = decodeURIComponent(c[0]);
            if (i[u] = n.read(l, u), r === u) break
          } catch {}
        }
        return r ? i[r] : i
      }
    }
    return Object.create({
      set: t,
      get: o,
      remove: function(r, s) {
        t(r, "", ae({}, s, {
          expires: -1
        }))
      },
      withAttributes: function(r) {
        return ve(this.converter, ae({}, this.attributes, r))
      },
      withConverter: function(r) {
        return ve(ae({}, this.converter, r), this.attributes)
      }
    }, {
      attributes: {
        value: Object.freeze(e)
      },
      converter: {
        value: Object.freeze(n)
      }
    })
  }
  var v = ve(lt, {
    path: "/"
  });
  var He = n => Object.keys(n).every(e => g(e, ie));
  var Ke = n => {
      if (!n) return;
      let {
        hostname: e
      } = window.location;
      return e.includes("webflow.io") ? e : n
    },
    _e = () => {
      let n = v.get($.main);
      if (!n) return;
      let e = JSON.parse(decodeURIComponent(n));
      if (e.consents && He(e.consents)) return e.consents
    },
    qe = (n, e, t = 120, o) => {
      let s = encodeURIComponent(JSON.stringify({
        id: n,
        consents: e
      }));
      o = Ke(o), v.set($.main, s, {
        expires: t,
        domain: o
      })
    },
    ze = () => {
      let n = v.get();
      for (let e in n) {
        if (e === $.main) continue;
        let t = window.location.host.split(".");
        for (; t.length > 1;) v.remove(e), v.remove(e, {
          domain: `.${t.join(".")}`
        }), v.remove(e, {
          domain: `${t.join(".")}`
        }), t.splice(0, 1)
      }
    },
    We = () => !!v.get($.consentsUpdated),
    Ve = (n = 120, e) => {
      e = Ke(e), v.set($.consentsUpdated, "true", {
        expires: n,
        domain: e
      })
    };
  var Ye = n => {
    window.dataLayer = window.dataLayer || [], window.dataLayer.find(e => e.event === n) || (window.dataLayer.push({
      event: n
    }), d.alert(`The GTM event ${n} has been fired.`, "info"))
  };
  var z = class extends h {
    constructor(t) {
      super();
      this.store = t;
      this.loadConsents(), this.storeElements(), document.readyState !== "complete" && window.addEventListener("load", () => {
        this.storeElements(), this.applyConsents()
      }), this.applyConsents()
    }
    storeElements() {
      let {
        store: t
      } = this, o = document.querySelectorAll(`script[type="${f}"], iframe[${m.src}]`), r = t.getStoredElements();
      [...o].filter(i => !r.find(({
        element: a
      }) => i === a)).forEach(i => {
        let a = le(i.getAttribute(m.categories[0]) || i.getAttribute(m.categories[1]), ie, we);
        if (i instanceof HTMLScriptElement && t.storeScript({
            categories: a,
            element: i,
            active: !1
          }), i instanceof HTMLIFrameElement) {
          let c = i.getAttribute(m.src);
          if (!c) return;
          i.src = "";
          let l = i.getAttribute(m.placeholder),
            u = l ? y(l, HTMLElement) : void 0;
          t.storeIFrame({
            categories: a,
            element: i,
            src: c,
            placeholder: u,
            active: !1
          })
        }
        d.alert(`Stored the element: ${i.outerHTML} in the categories: ${a.join(", ")}`, "info")
      })
    }
    loadConsents() {
      let t = _e();
      if (!t) return;
      d.alert(`The following consents were loaded from the stored cookies: ${JSON.stringify(t)}`, "info"), this.store.storeConsents(t), We() && (ze(), d.alert("Previously denied cookies have been deleted.", "info"))
    }
    async applyConsents() {
      let {
        store: t
      } = this;
      for (let o of t.getActivableElements()) await new Promise(r => {
        let {
          element: s
        } = o, {
          src: i,
          parentElement: a
        } = s, c;
        if (o.type === "script") c = Ue(o);
        else if (o.type === "iframe") c = Re(o);
        else {
          r(void 0);
          return
        }
        let l = () => {
          o.element = c, o.active = !0, r(void 0)
        };
        i && c.addEventListener("load", l), a == null || a.insertBefore(c, s), s.remove(), i || l()
      });
      t.getConsentsEntries().forEach(([o, r]) => {
        r && Ye(H.gtmEvent(o))
      })
    }
    updateConsents(t, o) {
      let {
        store: r
      } = this, {
        cookieMaxAge: s,
        endpoint: i,
        domain: a
      } = r, c = r.storeConsents(t), l = je();
      qe(l, r.getConsents(), s, a), i && Be({
        action: o,
        endpoint: i,
        id: l,
        consents: r.getConsents(),
        bannerText: r.getBannerText() || ""
      }), c.length && (Ve(s, a), this.applyConsents(), d.alert(`The following consents were updated: ${c.join(", ")}`, "info")), this.emit("updateconsents")
    }
  };
  var W = class {
    constructor(e = []) {
      this.store = new _;
      this.consentController = new z(this.store), this.initComponents().then(() => this.init(e))
    }
    async initComponents() {
      let {
        store: e
      } = this, {
        componentsSource: t
      } = e, {
        banner: o,
        preferences: r,
        manager: s
      } = E;
      t && await De(t), this.banner = new k(o, e), this.preferences = new k(r, e), this.manager = new k(s, e)
    }
    init(e = []) {
      let {
        store: t,
        manager: o,
        banner: r
      } = this;
      document.head.insertAdjacentHTML("beforeend", $e), !/bot|crawler|spider|crawling/i.test(navigator.userAgent) && (this.push(...e), t.userHasConfirmed() ? o.open() : r.open(), this.listenEvents())
    }
    listenEvents() {
      let {
        allow: e,
        deny: t,
        submit: o
      } = B, r = ["banner", "manager", "preferences"], {
        store: s,
        consentController: i,
        banner: a,
        manager: c
      } = this;
      document.addEventListener("click", l => this.handleMouseAndKeyboard(l)), document.addEventListener("keydown", l => this.handleMouseAndKeyboard(l)), a.isReady() ? s.storeBannerText(a.element) : a.on("ready", l => s.storeBannerText(l)), i.on("updateconsents", () => {
        r.forEach(l => {
          var u;
          return (u = this[l].form) == null ? void 0 : u.updateCheckboxes()
        })
      }), r.forEach(l => {
        this[l].on("allow", () => {
          d.alert(`Allow button was clicked in the ${l} component.`, "info"), i.updateConsents(K, e)
        }), this[l].on("deny", () => {
          d.alert(`Deny button was clicked in the ${l} component.`, "info"), i.updateConsents(se, t)
        }), this[l].on("formsubmit", u => {
          d.alert(`Consents Form was submitted in the ${l} component with the following consents: ${JSON.stringify(u)}`, "info"), i.updateConsents(u, o)
        }), l !== "manager" && this[l].on("close", () => {
          d.alert(`The ${l} component was closed.`, "info"), s.mode === "informational" && (d.alert(`All cookies were accepted because the mode is set to ${s.mode}.`, "warning"), i.updateConsents(K, e)), c.open()
        })
      })
    }
    handleMouseAndKeyboard(e) {
      let {
        target: t
      } = e, {
        banner: o,
        manager: r,
        preferences: s
      } = this;
      t instanceof Element && ("key" in e && e.key !== "Enter" || t.closest(S.openPreferences) && (o.close(), r.close(), s.open(), d.alert("Open Preferences button was clicked.", "info")))
    }
    push(...e) {
      e.forEach(t => t(this))
    }
  };
  var dt = Array.isArray(window.FsCC) ? window.FsCC : [];
  window.FsCC = new W(dt);
})();