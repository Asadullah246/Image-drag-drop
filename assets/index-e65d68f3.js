(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
    new MutationObserver((r) => {
        for (const i of r) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function e(r) {
        const i = {};
        return (
            r.integrity && (i.integrity = r.integrity),
            r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy),
            r.crossorigin === "use-credentials" ? (i.credentials = "include") : r.crossorigin === "anonymous" ? (i.credentials = "omit") : (i.credentials = "same-origin"),
            i
        );
    }
    function s(r) {
        if (r.ep) return;
        r.ep = !0;
        const i = e(r);
        fetch(r.href, i);
    }
})();
function ut(n, t, e) {
    return Math.max(t, Math.min(n, e));
}
const d = {
    toVector(n, t) {
        return n === void 0 && (n = t), Array.isArray(n) ? n : [n, n];
    },
    add(n, t) {
        return [n[0] + t[0], n[1] + t[1]];
    },
    sub(n, t) {
        return [n[0] - t[0], n[1] - t[1]];
    },
    addTo(n, t) {
        (n[0] += t[0]), (n[1] += t[1]);
    },
    subTo(n, t) {
        (n[0] -= t[0]), (n[1] -= t[1]);
    },
};
function K(n, t, e) {
    return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(n, e * 5) : (n * t * e) / (t + e * n);
}
function B(n, t, e, s = 0.15) {
    return s === 0 ? ut(n, t, e) : n < t ? -K(t - n, e - t, s) + t : n > e ? +K(n - e, e - t, s) + e : n;
}
function ft(n, [t, e], [s, r]) {
    const [[i, o], [c, f]] = n;
    return [B(t, i, o, s), B(e, c, f, r)];
}
function g(n, t, e) {
    return t in n ? Object.defineProperty(n, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : (n[t] = e), n;
}
function R(n, t) {
    var e = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(n);
        t &&
            (s = s.filter(function (r) {
                return Object.getOwnPropertyDescriptor(n, r).enumerable;
            })),
            e.push.apply(e, s);
    }
    return e;
}
function u(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? R(Object(e), !0).forEach(function (s) {
                g(n, s, e[s]);
            })
            : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
                : R(Object(e)).forEach(function (s) {
                    Object.defineProperty(n, s, Object.getOwnPropertyDescriptor(e, s));
                });
    }
    return n;
}
const W = { pointer: { start: "down", change: "move", end: "up" }, mouse: { start: "down", change: "move", end: "up" }, touch: { start: "start", change: "move", end: "end" }, gesture: { start: "start", change: "change", end: "end" } };
function U(n) {
    return n ? n[0].toUpperCase() + n.slice(1) : "";
}
const lt = ["enter", "leave"];
function dt(n = !1, t) {
    return n && !lt.includes(t);
}
function ht(n, t = "", e = !1) {
    const s = W[n],
        r = (s && s[t]) || t;
    return "on" + U(n) + U(r) + (dt(e, r) ? "Capture" : "");
}
const pt = ["gotpointercapture", "lostpointercapture"];
function gt(n) {
    let t = n.substring(2).toLowerCase();
    const e = !!~t.indexOf("passive");
    e && (t = t.replace("passive", ""));
    const s = pt.includes(t) ? "capturecapture" : "capture",
        r = !!~t.indexOf(s);
    return r && (t = t.replace("capture", "")), { device: t, capture: r, passive: e };
}
function mt(n, t = "") {
    const e = W[n],
        s = (e && e[t]) || t;
    return n + s;
}
function x(n) {
    return "touches" in n;
}
function z(n) {
    return x(n) ? "touch" : "pointerType" in n ? n.pointerType : "mouse";
}
function yt(n) {
    return Array.from(n.touches).filter((t) => {
        var e, s;
        return t.target === n.currentTarget || ((e = n.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
    });
}
function _t(n) {
    return n.type === "touchend" || n.type === "touchcancel" ? n.changedTouches : n.targetTouches;
}
function F(n) {
    return x(n) ? _t(n)[0] : n;
}
function bt(n) {
    return yt(n).map((t) => t.identifier);
}
function L(n) {
    const t = F(n);
    return x(n) ? t.identifier : t.pointerId;
}
function V(n) {
    const t = F(n);
    return [t.clientX, t.clientY];
}
function vt(n) {
    const t = {};
    if (("buttons" in n && (t.buttons = n.buttons), "shiftKey" in n)) {
        const { shiftKey: e, altKey: s, metaKey: r, ctrlKey: i } = n;
        Object.assign(t, { shiftKey: e, altKey: s, metaKey: r, ctrlKey: i });
    }
    return t;
}
function P(n, ...t) {
    return typeof n == "function" ? n(...t) : n;
}
function wt() { }
function Et(...n) {
    return n.length === 0
        ? wt
        : n.length === 1
            ? n[0]
            : function () {
                let t;
                for (const e of n) t = e.apply(this, arguments) || t;
                return t;
            };
}
function Y(n, t) {
    return Object.assign({}, t, n || {});
}
const Tt = 32;
class St {
    constructor(t, e, s) {
        (this.ctrl = t), (this.args = e), (this.key = s), this.state || ((this.state = {}), this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
    }
    get state() {
        return this.ctrl.state[this.key];
    }
    set state(t) {
        this.ctrl.state[this.key] = t;
    }
    get shared() {
        return this.ctrl.state.shared;
    }
    get eventStore() {
        return this.ctrl.gestureEventStores[this.key];
    }
    get timeoutStore() {
        return this.ctrl.gestureTimeoutStores[this.key];
    }
    get config() {
        return this.ctrl.config[this.key];
    }
    get sharedConfig() {
        return this.ctrl.config.shared;
    }
    get handler() {
        return this.ctrl.handlers[this.key];
    }
    reset() {
        const { state: t, shared: e, ingKey: s, args: r } = this;
        (e[s] = t._active = t.active = t._blocked = t._force = !1),
            (t._step = [!1, !1]),
            (t.intentional = !1),
            (t._movement = [0, 0]),
            (t._distance = [0, 0]),
            (t._direction = [0, 0]),
            (t._delta = [0, 0]),
            (t._bounds = [
                [-1 / 0, 1 / 0],
                [-1 / 0, 1 / 0],
            ]),
            (t.args = r),
            (t.axis = void 0),
            (t.memo = void 0),
            (t.elapsedTime = 0),
            (t.direction = [0, 0]),
            (t.distance = [0, 0]),
            (t.overflow = [0, 0]),
            (t._movementBound = [!1, !1]),
            (t.velocity = [0, 0]),
            (t.movement = [0, 0]),
            (t.delta = [0, 0]),
            (t.timeStamp = 0);
    }
    start(t) {
        const e = this.state,
            s = this.config;
        e._active || (this.reset(), this.computeInitial(), (e._active = !0), (e.target = t.target), (e.currentTarget = t.currentTarget), (e.lastOffset = s.from ? P(s.from, e) : e.offset), (e.offset = e.lastOffset)),
            (e.startTime = e.timeStamp = t.timeStamp);
    }
    computeValues(t) {
        const e = this.state;
        (e._values = t), (e.values = this.config.transform(t));
    }
    computeInitial() {
        const t = this.state;
        (t._initial = t._values), (t.initial = t.values);
    }
    compute(t) {
        const { state: e, config: s, shared: r } = this;
        e.args = this.args;
        let i = 0;
        if (
            (t &&
                ((e.event = t),
                    s.preventDefault && t.cancelable && e.event.preventDefault(),
                    (e.type = t.type),
                    (r.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size),
                    (r.locked = !!document.pointerLockElement),
                    Object.assign(r, vt(t)),
                    (r.down = r.pressed = r.buttons % 2 === 1 || r.touches > 0),
                    (i = t.timeStamp - e.timeStamp),
                    (e.timeStamp = t.timeStamp),
                    (e.elapsedTime = e.timeStamp - e.startTime)),
                e._active)
        ) {
            const b = e._delta.map(Math.abs);
            d.addTo(e._distance, b);
        }
        this.axisIntent && this.axisIntent(t);
        const [o, c] = e._movement,
            [f, l] = s.threshold,
            { _step: a, values: p } = e;
        if (
            (s.hasCustomTransform
                ? (a[0] === !1 && (a[0] = Math.abs(o) >= f && p[0]), a[1] === !1 && (a[1] = Math.abs(c) >= l && p[1]))
                : (a[0] === !1 && (a[0] = Math.abs(o) >= f && Math.sign(o) * f), a[1] === !1 && (a[1] = Math.abs(c) >= l && Math.sign(c) * l)),
                (e.intentional = a[0] !== !1 || a[1] !== !1),
                !e.intentional)
        )
            return;
        const h = [0, 0];
        if (s.hasCustomTransform) {
            const [b, at] = p;
            (h[0] = a[0] !== !1 ? b - a[0] : 0), (h[1] = a[1] !== !1 ? at - a[1] : 0);
        } else (h[0] = a[0] !== !1 ? o - a[0] : 0), (h[1] = a[1] !== !1 ? c - a[1] : 0);
        this.restrictToAxis && !e._blocked && this.restrictToAxis(h);
        const y = e.offset,
            _ = (e._active && !e._blocked) || e.active;
        _ &&
            ((e.first = e._active && !e.active),
                (e.last = !e._active && e.active),
                (e.active = r[this.ingKey] = e._active),
                t && (e.first && ("bounds" in s && (e._bounds = P(s.bounds, e)), this.setup && this.setup()), (e.movement = h), this.computeOffset()));
        const [w, E] = e.offset,
            [[C, rt], [it, ot]] = e._bounds;
        (e.overflow = [w < C ? -1 : w > rt ? 1 : 0, E < it ? -1 : E > ot ? 1 : 0]),
            (e._movementBound[0] = e.overflow[0] ? (e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0]) : !1),
            (e._movementBound[1] = e.overflow[1] ? (e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1]) : !1);
        const ct = e._active ? s.rubberband || [0, 0] : [0, 0];
        if (((e.offset = ft(e._bounds, e.offset, ct)), (e.delta = d.sub(e.offset, y)), this.computeMovement(), _ && (!e.last || i > Tt))) {
            e.delta = d.sub(e.offset, y);
            const b = e.delta.map(Math.abs);
            d.addTo(e.distance, b), (e.direction = e.delta.map(Math.sign)), (e._direction = e._delta.map(Math.sign)), !e.first && i > 0 && (e.velocity = [b[0] / i, b[1] / i]);
        }
    }
    emit() {
        const t = this.state,
            e = this.shared,
            s = this.config;
        if ((t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !s.triggerAllEvents)) return;
        const r = this.handler(u(u(u({}, e), t), {}, { [this.aliasKey]: t.values }));
        r !== void 0 && (t.memo = r);
    }
    clean() {
        this.eventStore.clean(), this.timeoutStore.clean();
    }
}
function Ot([n, t], e) {
    const s = Math.abs(n),
        r = Math.abs(t);
    if (s > r && s > e) return "x";
    if (r > s && r > e) return "y";
}
class kt extends St {
    constructor(...t) {
        super(...t), g(this, "aliasKey", "xy");
    }
    reset() {
        super.reset(), (this.state.axis = void 0);
    }
    init() {
        (this.state.offset = [0, 0]), (this.state.lastOffset = [0, 0]);
    }
    computeOffset() {
        this.state.offset = d.add(this.state.lastOffset, this.state.movement);
    }
    computeMovement() {
        this.state.movement = d.sub(this.state.offset, this.state.lastOffset);
    }
    axisIntent(t) {
        const e = this.state,
            s = this.config;
        if (!e.axis && t) {
            const r = typeof s.axisThreshold == "object" ? s.axisThreshold[z(t)] : s.axisThreshold;
            e.axis = Ot(e._movement, r);
        }
        e._blocked = ((s.lockDirection || !!s.axis) && !e.axis) || (!!s.axis && s.axis !== e.axis);
    }
    restrictToAxis(t) {
        if (this.config.axis || this.config.lockDirection)
            switch (this.state.axis) {
                case "x":
                    t[1] = 0;
                    break;
                case "y":
                    t[0] = 0;
                    break;
            }
    }
}
const At = (n) => n,
    $ = 0.15,
    J = {
        enabled(n = !0) {
            return n;
        },
        eventOptions(n, t, e) {
            return u(u({}, e.shared.eventOptions), n);
        },
        preventDefault(n = !1) {
            return n;
        },
        triggerAllEvents(n = !1) {
            return n;
        },
        rubberband(n = 0) {
            switch (n) {
                case !0:
                    return [$, $];
                case !1:
                    return [0, 0];
                default:
                    return d.toVector(n);
            }
        },
        from(n) {
            if (typeof n == "function") return n;
            if (n != null) return d.toVector(n);
        },
        transform(n, t, e) {
            const s = n || e.shared.transform;
            return (this.hasCustomTransform = !!s), s || At;
        },
        threshold(n) {
            return d.toVector(n, 0);
        },
    },
    Dt = 0,
    S = u(
        u({}, J),
        {},
        {
            axis(n, t, { axis: e }) {
                if (((this.lockDirection = e === "lock"), !this.lockDirection)) return e;
            },
            axisThreshold(n = Dt) {
                return n;
            },
            bounds(n = {}) {
                if (typeof n == "function") return (i) => S.bounds(n(i));
                if ("current" in n) return () => n.current;
                if (typeof HTMLElement == "function" && n instanceof HTMLElement) return n;
                const { left: t = -1 / 0, right: e = 1 / 0, top: s = -1 / 0, bottom: r = 1 / 0 } = n;
                return [
                    [t, e],
                    [s, r],
                ];
            },
        }
    ),
    k = 10,
    H = { ArrowRight: (n = 1) => [k * n, 0], ArrowLeft: (n = 1) => [-k * n, 0], ArrowUp: (n = 1) => [0, -k * n], ArrowDown: (n = 1) => [0, k * n] };
class It extends kt {
    constructor(...t) {
        super(...t), g(this, "ingKey", "dragging");
    }
    reset() {
        super.reset();
        const t = this.state;
        (t._pointerId = void 0), (t._pointerActive = !1), (t._keyboardActive = !1), (t._preventScroll = !1), (t._delayed = !1), (t.swipe = [0, 0]), (t.tap = !1), (t.canceled = !1), (t.cancel = this.cancel.bind(this));
    }
    setup() {
        const t = this.state;
        if (t._bounds instanceof HTMLElement) {
            const e = t._bounds.getBoundingClientRect(),
                s = t.currentTarget.getBoundingClientRect(),
                r = { left: e.left - s.left + t.offset[0], right: e.right - s.right + t.offset[0], top: e.top - s.top + t.offset[1], bottom: e.bottom - s.bottom + t.offset[1] };
            t._bounds = S.bounds(r);
        }
    }
    cancel() {
        const t = this.state;
        t.canceled ||
            ((t.canceled = !0),
                (t._active = !1),
                setTimeout(() => {
                    this.compute(), this.emit();
                }, 0));
    }
    setActive() {
        this.state._active = this.state._pointerActive || this.state._keyboardActive;
    }
    clean() {
        this.pointerClean(), (this.state._pointerActive = !1), (this.state._keyboardActive = !1), super.clean();
    }
    pointerDown(t) {
        const e = this.config,
            s = this.state;
        if (t.buttons != null && (Array.isArray(e.pointerButtons) ? !e.pointerButtons.includes(t.buttons) : e.pointerButtons !== -1 && e.pointerButtons !== t.buttons)) return;
        const r = this.ctrl.setEventIds(t);
        e.pointerCapture && t.target.setPointerCapture(t.pointerId),
            !(r && r.size > 1 && s._pointerActive) &&
            (this.start(t),
                this.setupPointer(t),
                (s._pointerId = L(t)),
                (s._pointerActive = !0),
                this.computeValues(V(t)),
                this.computeInitial(),
                e.preventScrollAxis && z(t) !== "mouse" ? ((s._active = !1), this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
    }
    startPointerDrag(t) {
        const e = this.state;
        (e._active = !0), (e._preventScroll = !0), (e._delayed = !1), this.compute(t), this.emit();
    }
    pointerMove(t) {
        const e = this.state,
            s = this.config;
        if (!e._pointerActive || (e.type === t.type && t.timeStamp === e.timeStamp)) return;
        const r = L(t);
        if (e._pointerId !== void 0 && r !== e._pointerId) return;
        const i = V(t);
        if ((document.pointerLockElement === t.target ? (e._delta = [t.movementX, t.movementY]) : ((e._delta = d.sub(i, e._values)), this.computeValues(i)), d.addTo(e._movement, e._delta), this.compute(t), e._delayed && e.intentional)) {
            this.timeoutStore.remove("dragDelay"), (e.active = !1), this.startPointerDrag(t);
            return;
        }
        if (s.preventScrollAxis && !e._preventScroll)
            if (e.axis)
                if (e.axis === s.preventScrollAxis || s.preventScrollAxis === "xy") {
                    (e._active = !1), this.clean();
                    return;
                } else {
                    this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(t);
                    return;
                }
            else return;
        this.emit();
    }
    pointerUp(t) {
        this.ctrl.setEventIds(t);
        try {
            this.config.pointerCapture && t.target.hasPointerCapture(t.pointerId) && t.target.releasePointerCapture(t.pointerId);
        } catch { }
        const e = this.state,
            s = this.config;
        if (!e._active || !e._pointerActive) return;
        const r = L(t);
        if (e._pointerId !== void 0 && r !== e._pointerId) return;
        (this.state._pointerActive = !1), this.setActive(), this.compute(t);
        const [i, o] = e._distance;
        if (((e.tap = i <= s.tapsThreshold && o <= s.tapsThreshold), e.tap && s.filterTaps)) e._force = !0;
        else {
            const [c, f] = e.direction,
                [l, a] = e.velocity,
                [p, h] = e.movement,
                [y, _] = s.swipe.velocity,
                [w, E] = s.swipe.distance,
                C = s.swipe.duration;
            e.elapsedTime < C && (Math.abs(l) > y && Math.abs(p) > w && (e.swipe[0] = c), Math.abs(a) > _ && Math.abs(h) > E && (e.swipe[1] = f));
        }
        this.emit();
    }
    pointerClick(t) {
        !this.state.tap && t.detail > 0 && (t.preventDefault(), t.stopPropagation());
    }
    setupPointer(t) {
        const e = this.config,
            s = e.device;
        e.pointerLock && t.currentTarget.requestPointerLock(),
            e.pointerCapture ||
            (this.eventStore.add(this.sharedConfig.window, s, "change", this.pointerMove.bind(this)),
                this.eventStore.add(this.sharedConfig.window, s, "end", this.pointerUp.bind(this)),
                this.eventStore.add(this.sharedConfig.window, s, "cancel", this.pointerUp.bind(this)));
    }
    pointerClean() {
        this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
    }
    preventScroll(t) {
        this.state._preventScroll && t.cancelable && t.preventDefault();
    }
    setupScrollPrevention(t) {
        (this.state._preventScroll = !1), Pt(t);
        const e = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), { passive: !1 });
        this.eventStore.add(this.sharedConfig.window, "touch", "end", e),
            this.eventStore.add(this.sharedConfig.window, "touch", "cancel", e),
            this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, t);
    }
    setupDelayTrigger(t) {
        (this.state._delayed = !0),
            this.timeoutStore.add(
                "dragDelay",
                () => {
                    (this.state._step = [0, 0]), this.startPointerDrag(t);
                },
                this.config.delay
            );
    }
    keyDown(t) {
        const e = H[t.key];
        if (e) {
            const s = this.state,
                r = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
            this.start(t), (s._delta = e(r)), (s._keyboardActive = !0), d.addTo(s._movement, s._delta), this.compute(t), this.emit();
        }
    }
    keyUp(t) {
        t.key in H && ((this.state._keyboardActive = !1), this.setActive(), this.compute(t), this.emit());
    }
    bind(t) {
        const e = this.config.device;
        t(e, "start", this.pointerDown.bind(this)),
            this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))),
            this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))),
            this.config.filterTaps && t("click", "", this.pointerClick.bind(this), { capture: !0, passive: !1 });
    }
}
function Pt(n) {
    "persist" in n && typeof n.persist == "function" && n.persist();
}
const O = typeof window < "u" && window.document && window.document.createElement;
function xt() {
    return O && "ontouchstart" in window;
}
function N() {
    return xt() || (O && window.navigator.maxTouchPoints > 1);
}
function Ct() {
    return O && "onpointerdown" in window;
}
function Lt() {
    return O && "exitPointerLock" in window.document;
}
function Mt() {
    try {
        return "constructor" in GestureEvent;
    } catch {
        return !1;
    }
}
const m = { isBrowser: O, gesture: Mt(), touch: N(), touchscreen: N(), pointer: Ct(), pointerLock: Lt() },
    jt = 250,
    Kt = 180,
    Bt = 0.5,
    Rt = 50,
    Ut = 250,
    X = { mouse: 0, touch: 0, pen: 8 },
    Vt = u(
        u({}, S),
        {},
        {
            device(n, t, { pointer: { touch: e = !1, lock: s = !1, mouse: r = !1 } = {} }) {
                return (this.pointerLock = s && m.pointerLock), m.touch && e ? "touch" : this.pointerLock ? "mouse" : m.pointer && !r ? "pointer" : m.touch ? "touch" : "mouse";
            },
            preventScrollAxis(n, t, { preventScroll: e }) {
                if (((this.preventScrollDelay = typeof e == "number" ? e : e || (e === void 0 && n) ? jt : void 0), !(!m.touchscreen || e === !1))) return n || (e !== void 0 ? "y" : void 0);
            },
            pointerCapture(n, t, { pointer: { capture: e = !0, buttons: s = 1, keys: r = !0 } = {} }) {
                return (this.pointerButtons = s), (this.keys = r), !this.pointerLock && this.device === "pointer" && e;
            },
            threshold(n, t, { filterTaps: e = !1, tapsThreshold: s = 3, axis: r = void 0 }) {
                const i = d.toVector(n, e ? s : r ? 1 : 0);
                return (this.filterTaps = e), (this.tapsThreshold = s), i;
            },
            swipe({ velocity: n = Bt, distance: t = Rt, duration: e = Ut } = {}) {
                return { velocity: this.transform(d.toVector(n)), distance: this.transform(d.toVector(t)), duration: e };
            },
            delay(n = 0) {
                switch (n) {
                    case !0:
                        return Kt;
                    case !1:
                        return 0;
                    default:
                        return n;
                }
            },
            axisThreshold(n) {
                return n ? u(u({}, X), n) : X;
            },
        }
    );
u(
    u({}, J),
    {},
    {
        device(n, t, { shared: e, pointer: { touch: s = !1 } = {} }) {
            if (e.target && !m.touch && m.gesture) return "gesture";
            if (m.touch && s) return "touch";
            if (m.touchscreen) {
                if (m.pointer) return "pointer";
                if (m.touch) return "touch";
            }
        },
        bounds(n, t, { scaleBounds: e = {}, angleBounds: s = {} }) {
            const r = (o) => {
                const c = Y(P(e, o), { min: -1 / 0, max: 1 / 0 });
                return [c.min, c.max];
            },
                i = (o) => {
                    const c = Y(P(s, o), { min: -1 / 0, max: 1 / 0 });
                    return [c.min, c.max];
                };
            return typeof e != "function" && typeof s != "function" ? [r(), i()] : (o) => [r(o), i(o)];
        },
        threshold(n, t, e) {
            return (this.lockDirection = e.axis === "lock"), d.toVector(n, this.lockDirection ? [0.1, 3] : 0);
        },
        modifierKey(n) {
            return n === void 0 ? "ctrlKey" : n;
        },
        pinchOnWheel(n = !0) {
            return n;
        },
    }
);
u(u({}, S), {}, { mouseOnly: (n = !0) => n });
u(u({}, S), {}, { mouseOnly: (n = !0) => n });
const Q = new Map(),
    j = new Map();
function Yt(n) {
    Q.set(n.key, n.engine), j.set(n.key, n.resolver);
}
const $t = { key: "drag", engine: It, resolver: Vt };
function Ht(n, t) {
    if (n == null) return {};
    var e = {},
        s = Object.keys(n),
        r,
        i;
    for (i = 0; i < s.length; i++) (r = s[i]), !(t.indexOf(r) >= 0) && (e[r] = n[r]);
    return e;
}
function Nt(n, t) {
    if (n == null) return {};
    var e = Ht(n, t),
        s,
        r;
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(n);
        for (r = 0; r < i.length; r++) (s = i[r]), !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(n, s) && (e[s] = n[s]);
    }
    return e;
}
const Xt = {
    target(n) {
        if (n) return () => ("current" in n ? n.current : n);
    },
    enabled(n = !0) {
        return n;
    },
    window(n = m.isBrowser ? window : void 0) {
        return n;
    },
    eventOptions({ passive: n = !0, capture: t = !1 } = {}) {
        return { passive: n, capture: t };
    },
    transform(n) {
        return n;
    },
},
    qt = ["target", "eventOptions", "window", "enabled", "transform"];
function D(n = {}, t) {
    const e = {};
    for (const [s, r] of Object.entries(t))
        switch (typeof r) {
            case "function":
                e[s] = r.call(e, n[s], s, n);
                break;
            case "object":
                e[s] = D(n[s], r);
                break;
            case "boolean":
                r && (e[s] = n[s]);
                break;
        }
    return e;
}
function Gt(n, t, e = {}) {
    const s = n,
        { target: r, eventOptions: i, window: o, enabled: c, transform: f } = s,
        l = Nt(s, qt);
    if (((e.shared = D({ target: r, eventOptions: i, window: o, enabled: c, transform: f }, Xt)), t)) {
        const a = j.get(t);
        e[t] = D(u({ shared: e.shared }, l), a);
    } else
        for (const a in l) {
            const p = j.get(a);
            p && (e[a] = D(u({ shared: e.shared }, l[a]), p));
        }
    return e;
}
class Z {
    constructor(t, e) {
        g(this, "_listeners", new Set()), (this._ctrl = t), (this._gestureKey = e);
    }
    add(t, e, s, r, i) {
        const o = this._listeners,
            c = mt(e, s),
            f = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {},
            l = u(u({}, f), i);
        t.addEventListener(c, r, l);
        const a = () => {
            t.removeEventListener(c, r, l), o.delete(a);
        };
        return o.add(a), a;
    }
    clean() {
        this._listeners.forEach((t) => t()), this._listeners.clear();
    }
}
class Wt {
    constructor() {
        g(this, "_timeouts", new Map());
    }
    add(t, e, s = 140, ...r) {
        this.remove(t), this._timeouts.set(t, window.setTimeout(e, s, ...r));
    }
    remove(t) {
        const e = this._timeouts.get(t);
        e && window.clearTimeout(e);
    }
    clean() {
        this._timeouts.forEach((t) => void window.clearTimeout(t)), this._timeouts.clear();
    }
}
class zt {
    constructor(t) {
        g(this, "gestures", new Set()),
            g(this, "_targetEventStore", new Z(this)),
            g(this, "gestureEventStores", {}),
            g(this, "gestureTimeoutStores", {}),
            g(this, "handlers", {}),
            g(this, "config", {}),
            g(this, "pointerIds", new Set()),
            g(this, "touchIds", new Set()),
            g(this, "state", { shared: { shiftKey: !1, metaKey: !1, ctrlKey: !1, altKey: !1 } }),
            Ft(this, t);
    }
    setEventIds(t) {
        if (x(t)) return (this.touchIds = new Set(bt(t))), this.touchIds;
        if ("pointerId" in t) return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
    }
    applyHandlers(t, e) {
        (this.handlers = t), (this.nativeHandlers = e);
    }
    applyConfig(t, e) {
        this.config = Gt(t, e, this.config);
    }
    clean() {
        this._targetEventStore.clean();
        for (const t of this.gestures) this.gestureEventStores[t].clean(), this.gestureTimeoutStores[t].clean();
    }
    effect() {
        return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
    }
    bind(...t) {
        const e = this.config.shared,
            s = {};
        let r;
        if (!(e.target && ((r = e.target()), !r))) {
            if (e.enabled) {
                for (const o of this.gestures) {
                    const c = this.config[o],
                        f = q(s, c.eventOptions, !!r);
                    if (c.enabled) {
                        const l = Q.get(o);
                        new l(this, t, o).bind(f);
                    }
                }
                const i = q(s, e.eventOptions, !!r);
                for (const o in this.nativeHandlers) i(o, "", (c) => this.nativeHandlers[o](u(u({}, this.state.shared), {}, { event: c, args: t })), void 0, !0);
            }
            for (const i in s) s[i] = Et(...s[i]);
            if (!r) return s;
            for (const i in s) {
                const { device: o, capture: c, passive: f } = gt(i);
                this._targetEventStore.add(r, o, "", s[i], { capture: c, passive: f });
            }
        }
    }
}
function T(n, t) {
    n.gestures.add(t), (n.gestureEventStores[t] = new Z(n, t)), (n.gestureTimeoutStores[t] = new Wt());
}
function Ft(n, t) {
    t.drag && T(n, "drag"), t.wheel && T(n, "wheel"), t.scroll && T(n, "scroll"), t.move && T(n, "move"), t.pinch && T(n, "pinch"), t.hover && T(n, "hover");
}
const q = (n, t, e) => (s, r, i, o = {}, c = !1) => {
    var f, l;
    const a = (f = o.capture) !== null && f !== void 0 ? f : t.capture,
        p = (l = o.passive) !== null && l !== void 0 ? l : t.passive;
    let h = c ? s : ht(s, r, a);
    e && p && (h += "Passive"), (n[h] = n[h] || []), n[h].push(i);
};
function Jt(n, t, e) {
    return t in n ? Object.defineProperty(n, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : (n[t] = e), n;
}
function G(n, t) {
    var e = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(n);
        t &&
            (s = s.filter(function (r) {
                return Object.getOwnPropertyDescriptor(n, r).enumerable;
            })),
            e.push.apply(e, s);
    }
    return e;
}
function A(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? G(Object(e), !0).forEach(function (s) {
                Jt(n, s, e[s]);
            })
            : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
                : G(Object(e)).forEach(function (s) {
                    Object.defineProperty(n, s, Object.getOwnPropertyDescriptor(e, s));
                });
    }
    return n;
}
class Qt {
    constructor(t, e, s, r, i) {
        (this._target = t), (this._gestureKey = r), (this._ctrl = new zt(e)), this._ctrl.applyHandlers(e, i), this._ctrl.applyConfig(A(A({}, s), {}, { target: t }), r), this._ctrl.effect();
    }
    destroy() {
        this._ctrl.clean();
    }
    setConfig(t) {
        this._ctrl.clean(), this._ctrl.applyConfig(A(A({}, t), {}, { target: this._target }), this._gestureKey), this._ctrl.effect();
    }
}
const tt = function (t, e, s) {
    return Yt($t), new Qt(t, { drag: e }, s || {}, "drag");
},
    et = (n, t) => {
        if (!t) throw new Error("no element");
        t.style.border = n ? "2px solid red" : "none";
    },
    v = document.querySelector(".xboard.xleft"),
    Zt = (n, t, e) => {
        const s = t,
            r = e;
        document.querySelectorAll(".container.main").forEach((p) => {
            const h = p.getBoundingClientRect(),
                { x: y, y: _, width: w, height: E } = h;
            y < s && s < y + w && _ < r && r < _ + E && (console.log("drop", p), p.appendChild(n));
        });
        const o = v == null ? void 0 : v.getBoundingClientRect(),
            { x: c, y: f, width: l, height: a } = o;
        c < s && s < c + l && f < r && r < f + a && (console.log("drop", v), v == null || v.appendChild(n));
    },
    te = (n, t, e) => {
        const s = n.offsetTop + e,
            r = n.offsetLeft + t;
        (n.style.top = `${s < 0 ? 0 : s}px`), (n.style.left = `${r < 0 ? 0 : r}px`);
    },
    nt = ({ targets: n, translateX: t, translateY: e, duration: s }) => {
        if (!n) throw new Error("no element");
        n.style.transform = `translate(${t}px, ${e}px)`;
    },
    st = (n) => {
        new tt(n, ({ active: t, movement: [e, s] }) => {
            const r = n.parentElement;
            if ((et(t, r), nt({ targets: r, translateX: t ? e : 0, translateY: s, duration: t ? 0 : 1e3 }), !t)) {
                console.log("end",t, e, s);
                const i = r;
                (i.style.transform = `translate(${0}px, ${0}px)`), te(r, e, s);
            }
        });
    };











// function ee() {
//     document.addEventListener("click", function (n) {
//         const t = n.pageX,
//             e = n.pageY;
//         console.log("click", t, e), (document.getElementById("test").innerHTML = "x: " + t + ", y: " + e);
//         const s = ne(t, e, document.getElementById("img1"));
        
//         console.log("feedback", s);
//     });
// }
// const ne = (n, t, e) => {
//     const s = e.getBoundingClientRect(),
//         { left: r, top: i, right: o, bottom: c } = s;
//     return r < n && n < o && i < t && t < c;
// };
// ee();
// const se = document.querySelectorAll(".ximg");
// se.forEach((n) => {
//     new tt(n, ({ active: t, movement: [e, s] }) => {
//         et(t, n), nt({ targets: n, translateX: t ? e : 0, translateY: t ? s : 0, duration: t ? 0 : 1e3 });
//         // const r = n.parentElement;
//         // if (((r.style.overflow = "visible"), !t)) {
//         //     const { x: i, y: o } = n.getBoundingClientRect();
//         //     Zt(n, i + e, o + s), console.log("drop", i + e, o + s), (r.style.overflow = "auto");
//         // }
//     });
// });












const I = document.querySelector("#containerNest");
if (!I) throw new Error("no containerNest");
let re = document.querySelectorAll(".container.handle");
re.forEach((n) => {
    st(n);
});
const M = document.querySelector("#addContainer");
M == null ||
    M.addEventListener("click", () => {
        console.log("add container");

        let touched_items=document.querySelectorAll('.active_touched_item');
                    for(let touched_item of touched_items){
                        touched_item.classList.remove('active_touched_item');
                    } 


        const n = document.createElement("div"),
            t = document.createElement("div"),
            e = document.createElement("div");
        n.classList.add("container", "main", "resizable", "catchable", "created_container","active_touched_item"),
            t.classList.add("container", "handle"),
            e.classList.add("container", "close"),
            n.appendChild(t),
            n.appendChild(e),
            I == null || I.appendChild(n),
            e.addEventListener("click", () => {
                n.remove();
            }),
            st(t);
            




            n.addEventListener('dragover',dragOver);
            n.addEventListener('dragenter',dragEnter);
            n.addEventListener('dragleave',dragLeave);
            n.addEventListener('drop',drop);


            
            n.addEventListener('mousedown',function(){
                if(document.querySelector('.active_touched_item')){
                    let touched_items=document.querySelectorAll('.active_touched_item');
                    for(let touched_item of touched_items){
                        touched_item.classList.remove('active_touched_item');
                    }                    
                }
                this.classList.add('active_touched_item');
            });



    });