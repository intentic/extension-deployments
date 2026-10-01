import { hostSlot as e, sandboxPoll as t, sandboxValue as n } from "@intentic/extension-api";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, normalizeClass as f, normalizeStyle as p, onMounted as ee, openBlock as m, ref as te, renderList as ne, resolveDirective as re, toDisplayString as ie, toRef as ae, unref as h, withCtx as oe, withDirectives as se } from "vue";
import { AgentRunButton as ce, Button as le, Code as ue, DisclosureRow as de, Icon as fe, Notice as pe, Page as me, PageAction as he, PageHeader as ge, Picker as _e, ProjectChip as ve, RowGroup as ye, StatusBadge as be, StatusTally as xe, noticeOf as Se, timeAgo as Ce, ui as we, useAgentRunPick as Te } from "@intentic/extension-ui";
import { useMutation as Ee, useQuery as De, useQueryClient as Oe } from "@tanstack/vue-query";
//#region \0rolldown/runtime.js
var ke = Object.defineProperty, g = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, Ae = (e, t) => {
	let n = {};
	for (var r in e) ke(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ke(n, Symbol.toStringTag, { value: "Module" }), n;
}, je, Me, Ne = g((() => {
	({bindHost: je, host: Me} = e("ext-deployments"));
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/util.js
function Pe(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Fe(e, t = "|") {
	return e.map((e) => Xe(e)).join(t);
}
function Ie(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function Le(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function Re(e) {
	return e == null;
}
function ze(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Be(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function Ve(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== St) return r === void 0 && (r = St, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function _(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function He(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function Ue(e) {
	return JSON.stringify(e);
}
function We(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function Ge(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ke(e) {
	if (Ge(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Ge(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function qe(e) {
	return Ke(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function Je(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ye(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function v(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function Xe(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Ze(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Qe(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return Ye(e, He(e._zod.def, {
		get shape() {
			let e = {};
			for (let r of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, r)) throw Error(`Unrecognized key: "${String(r)}"`);
				t[r] && _(e, r, n.shape[r]);
			}
			return _(this, "shape", e), e;
		},
		checks: []
	}));
}
function $e(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return Ye(e, He(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, e)) throw Error(`Unrecognized key: "${String(e)}"`);
				t[e] && delete r[e];
			}
			return _(this, "shape", r), r;
		},
		checks: []
	}));
}
function et(e, t) {
	if (!Ke(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Ye(e, He(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return _(this, "shape", n), n;
	} }));
}
function tt(e, t) {
	if (!Ke(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return Ye(e, He(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return _(this, "shape", n), n;
	} }));
}
function nt(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return Ye(e, He(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return _(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function rt(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	return Ye(t, He(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t of Reflect.ownKeys(n)) {
				if (!Object.prototype.hasOwnProperty.call(r, t)) throw Error(`Unrecognized key: "${String(t)}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t of Reflect.ownKeys(r)) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return _(this, "shape", i), i;
		},
		checks: []
	}));
}
function it(e, t, n) {
	return Ye(t, He(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t of Reflect.ownKeys(n)) {
			if (!Object.prototype.hasOwnProperty.call(i, t)) throw Error(`Unrecognized key: "${String(t)}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t of Reflect.ownKeys(r)) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return _(this, "shape", i), i;
	} }));
}
function at(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function ot(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function st(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function ct(e) {
	return typeof e == "string" ? e : e?.message;
}
function lt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function ut(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : ct(e.inst?._zod.def?.error?.(e)) ?? ct(a?.(e)) ?? ct(t?.error?.(e)) ?? ct(n.customError?.(e)) ?? ct(n.localeError?.(e)) ?? "Invalid input", { inst: s, schema: c, continue: l, input: u, ...d } = e;
	return d.path ??= [], d.message = o, t?.reportInput && (d.input = u), d;
}
function dt(e) {
	let t = e.length;
	if (!Dt.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function ft(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function pt(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function mt(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function ht(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : vt(e, n, r.value);
	}
}
function gt(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function _t(e, t, n) {
	return gt(e, t, n, !1);
}
function vt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : gt(this, t, n.bind(this));
		},
		set(e) {
			gt(this, t, e);
		}
	});
}
function yt(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function y(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Ot !== e._zod) {
		Ot = void 0;
		return;
	}
	Ot = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, At);
			let e = kt;
			kt = !1;
			try {
				let r = n(this);
				return kt ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), kt ||= e, r;
			} catch (n) {
				throw delete this[t], kt ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function bt(e, t, n, r) {
	let i = yt(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
function xt(e) {
	let t = () => e;
	return t[jt] = !0, t;
}
var St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt = g((() => {
	Vt(), St = /* @__PURE__*/ Symbol("evaluating"), Ct = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, wt = /* @__PURE__*/ Le(() => {
		if (Bt.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), Tt = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), Et = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Dt = /[\uD800-\uDBFF]/, kt = !1, At = {
		configurable: !0,
		get() {
			kt = !0;
		}
	}, jt = "~constantCatch";
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/core.js
function Nt(e) {
	let t = Lt;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Lt = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function b(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			It.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", It);
			} finally {
				It.value = void 0;
			}
		}
		if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), ht(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Nt(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
function Pt(e) {
	return e && Object.assign(Bt, e), Bt;
}
var Ft, It, Lt, Rt, zt, Bt, Vt = g((() => {
	Mt(), It = {
		value: void 0,
		enumerable: !1
	}, Lt = "captureStackTrace" in Error ? Error : null, Rt = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, zt = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (Ft = globalThis).__zod_globalConfig ?? (Ft.__zod_globalConfig = {}), Bt = globalThis.__zod_globalConfig;
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/errors.js
function Ht() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Ie, 2), e.message;
}
function Ut(e) {
	this._zod.message = e;
}
function Wt(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function Gt(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? Wt(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Kt(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
var qt, Jt, Yt, Xt, Zt, Qt, $t, en = g((() => {
	Vt(), Mt(), qt = {
		get: Ht,
		set: Ut,
		enumerable: !0,
		configurable: !0
	}, Jt = {
		value: void 0,
		enumerable: !1
	}, Yt = {
		value: void 0,
		enumerable: !1
	}, Xt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Zt = (e, t) => {
		e.name = "$ZodError", Jt.value = e._zod, Object.defineProperty(e, "_zod", Jt), Yt.value = t, Object.defineProperty(e, "issues", Yt), Jt.value = void 0, Yt.value = void 0, Object.defineProperty(e, "message", qt);
		let n = Object.getPrototypeOf(e);
		Xt.has(n) || (Xt.add(n), Object.defineProperty(n, "toString", {
			configurable: !0,
			enumerable: !1,
			get() {
				let e = () => this.message;
				return Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				}), e;
			},
			set(e) {
				Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				});
			}
		}));
	}, Qt = b("$ZodError", Zt), $t = b("$ZodError", Zt, void 0, { Parent: Error });
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/parse.js
function tn(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n = g((() => {
	Vt(), en(), Mt(), nn = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new Rt();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => ut(e, o, Pt())));
				throw Ct(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, rn = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => ut(e, o, Pt())));
				throw Ct(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, an = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new Rt();
		return a.issues.length ? {
			success: !1,
			error: new (e ?? Qt)(a.issues.map((e) => ut(e, i, Pt())))
		} : {
			success: !0,
			data: a.value
		};
	}, on = /* @__PURE__*/ an($t), sn = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? {
			success: !1,
			error: new e(a.issues.map((e) => ut(e, i, Pt())))
		} : {
			success: !0,
			data: a.value
		};
	}, cn = /* @__PURE__*/ sn($t), ln = (e) => {
		let t = nn(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, tn(n, a));
		};
		return n;
	}, un = (e) => {
		let t = nn(e), n = (e, r, i, a) => t(e, r, i, tn(n, a));
		return n;
	}, dn = (e) => {
		let t = rn(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, tn(n, a));
		};
		return n;
	}, fn = (e) => {
		let t = rn(e), n = async (e, r, i, a) => await t(e, r, i, tn(n, a));
		return n;
	}, pn = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return an(e)(t, n, i);
	}, mn = (e) => (t, n, r) => an(e)(t, n, r), hn = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return sn(e)(t, n, i);
	}, gn = (e) => async (t, n, r) => sn(e)(t, n, r);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/regexes.js
function vn(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function yn() {
	return new RegExp(Pn, "u");
}
function bn(e) {
	return RegExp(`^${e}$`);
}
function xn(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Sn(e) {
	return RegExp(`^${xn(e)}$`);
}
function Cn(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${xn({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${xn({ precision: e.precision })}` : n;
	return RegExp(`^${Un}T(?:${r})$`);
}
var wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn = g((() => {
	wn = /^[cC][0-9a-z]{6,}$/, Tn = /^[0-9a-z]+$/, En = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Dn = /^[0-9a-vA-V]{20}$/, On = /^[A-Za-z0-9]{27}$/, kn = /^[a-zA-Z0-9_-]{21}$/, An = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, jn = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Mn = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Nn = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Pn = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", Fn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, In = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Ln = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Rn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, zn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Bn = /^[A-Za-z0-9_-]*$/, Vn = /^https?$/, Hn = /^\+[1-9]\d{6,14}$/, Un = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Wn = /*@__PURE__*/ bn(Un), Gn = (e) => {
		let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return RegExp(`^${t}$`);
	}, Kn = /^-?\d+$/, qn = /^-?\d+(?:\.\d+)?$/, Jn = /^(?:true|false)$/i, Yn = /^[^A-Z]*$/, Xn = /^[^a-z]*$/;
})), Qn, $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr = g((() => {
	Vt(), Zn(), Mt(), Qn = /*@__PURE__*/ b("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), $n = (e) => {
		let t = e.value;
		return !Re(t) && t.length !== void 0;
	}, er = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, tr = /*@__PURE__*/ b("$ZodCheckLessThan", (e, t) => {
		Qn.init(e, t);
		let n = er[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
			t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: er[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), nr = /*@__PURE__*/ b("$ZodCheckGreaterThan", (e, t) => {
		Qn.init(e, t);
		let n = er[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
			t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: er[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), rr = /*@__PURE__*/ b("$ZodCheckMultipleOf", (e, t) => {
		Qn.init(e, t), e._zod.onattach.push((e) => {
			var n;
			(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
		}), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : Be(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ir = /*@__PURE__*/ b("$ZodCheckNumberFormat", (e, t) => {
		Qn.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Et[t.format];
		e._zod.onattach.push((e) => {
			let r = e._zod.bag;
			r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = Kn);
		}), e._zod.check = (o) => {
			let s = o.value;
			if (n) {
				if (!Number.isInteger(s)) {
					o.issues.push({
						expected: r,
						format: t.format,
						code: "invalid_type",
						continue: !1,
						input: s,
						inst: e
					});
					return;
				}
				if (!Number.isSafeInteger(s)) {
					s > 0 ? o.issues.push({
						input: s,
						code: "too_big",
						maximum: 2 ** 53 - 1,
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					}) : o.issues.push({
						input: s,
						code: "too_small",
						minimum: -(2 ** 53 - 1),
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					});
					return;
				}
			}
			s < i && o.issues.push({
				origin: "number",
				input: s,
				code: "too_small",
				minimum: i,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			}), s > a && o.issues.push({
				origin: "number",
				input: s,
				code: "too_big",
				maximum: a,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			});
		};
	}), ar = /*@__PURE__*/ b("$ZodCheckMaxLength", (e, t) => {
		var n;
		Qn.init(e, t), (n = e._zod.def).when ?? (n.when = $n), e._zod.onattach.push((e) => {
			let n = e._zod.bag.maximum ?? Infinity;
			t.maximum < n && (e._zod.bag.maximum = t.maximum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? dt(r) : i) <= t.maximum) return;
			let a = ft(r);
			n.issues.push({
				origin: a,
				code: "too_big",
				maximum: t.maximum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), or = /*@__PURE__*/ b("$ZodCheckMinLength", (e, t) => {
		var n;
		Qn.init(e, t), (n = e._zod.def).when ?? (n.when = $n), e._zod.onattach.push((e) => {
			let n = e._zod.bag.minimum ?? -Infinity;
			t.minimum > n && (e._zod.bag.minimum = t.minimum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? dt(r) : i) >= t.minimum) return;
			let a = ft(r);
			n.issues.push({
				origin: a,
				code: "too_small",
				minimum: t.minimum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), sr = /*@__PURE__*/ b("$ZodCheckLengthEquals", (e, t) => {
		var n;
		Qn.init(e, t), (n = e._zod.def).when ?? (n.when = $n), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.minimum = t.length, n.maximum = t.length, n.length = t.length;
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? dt(r) : i;
			if (a === t.length) return;
			let o = ft(r), s = a > t.length;
			n.issues.push({
				origin: o,
				...s ? {
					code: "too_big",
					maximum: t.length
				} : {
					code: "too_small",
					minimum: t.length
				},
				inclusive: !0,
				exact: !0,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), cr = /*@__PURE__*/ b("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		Qn.init(e, t), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
		}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: t.format,
				input: n.value,
				...t.pattern ? { pattern: t.pattern.toString() } : {},
				inst: e,
				continue: !t.abort
			});
		}) : (r = e._zod).check ?? (r.check = () => {});
	}), lr = /*@__PURE__*/ b("$ZodCheckRegex", (e, t) => {
		cr.init(e, t), e._zod.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: n.value,
				pattern: t.pattern.toString(),
				inst: e,
				continue: !t.abort
			});
		};
	}), ur = /*@__PURE__*/ b("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= Yn, cr.init(e, t);
	}), dr = /*@__PURE__*/ b("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= Xn, cr.init(e, t);
	}), fr = /*@__PURE__*/ b("$ZodCheckIncludes", (e, t) => {
		Qn.init(e, t);
		let n = Je(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
		t.pattern = r, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
		}), e._zod.check = (n) => {
			n.value.includes(t.includes, t.position) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: t.includes,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), pr = /*@__PURE__*/ b("$ZodCheckStartsWith", (e, t) => {
		Qn.init(e, t);
		let n = RegExp(`^${Je(t.prefix)}.*`);
		t.pattern ??= n, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
		}), e._zod.check = (n) => {
			n.value.startsWith(t.prefix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: t.prefix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), mr = /*@__PURE__*/ b("$ZodCheckEndsWith", (e, t) => {
		Qn.init(e, t);
		let n = RegExp(`.*${Je(t.suffix)}$`);
		t.pattern ??= n, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
		}), e._zod.check = (n) => {
			n.value.endsWith(t.suffix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: t.suffix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), hr = /*@__PURE__*/ b("$ZodCheckOverwrite", (e, t) => {
		Qn.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), _r, vr = g((() => {
	_r = class {
		constructor(e = [], t = {}) {
			this.content = [], this.indent = 0, this.args = e, this.closed = t;
		}
		indented(e) {
			this.indent += 1, e(this), --this.indent;
		}
		write(e) {
			if (typeof e == "function") {
				e(this, { execution: "sync" }), e(this, { execution: "async" });
				return;
			}
			let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
			for (let e of r) this.content.push(e);
		}
		compile() {
			let e = Function, t = this?.content ?? [""];
			return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
		}
	};
})), yr, br = g((() => {
	yr = {
		major: 4,
		minor: 5,
		patch: 4
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/schemas.js
function xr(e) {
	return {
		validate: (t) => {
			try {
				return Xr(on(e, t));
			} catch {
				return cn(e, t).then(Xr);
			}
		},
		vendor: "zod",
		version: 1
	};
}
function Sr(e, t) {
	if (!t.normalize && t.protocol?.source === Vn.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		return new URL(e);
	} catch {
		return 2;
	}
}
function Cr(e) {
	return e.replace(ti, "");
}
function wr(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Tr(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function Er(e) {
	if (!hi.test(e)) return !1;
	try {
		return new URL(`http://[${e}]`), !0;
	} catch {
		return !1;
	}
}
function Dr(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Er(n);
}
function Or(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function kr(e) {
	if (!Bn.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Or(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function Ar(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
function jr(e, t, n) {
	e.issues.length && t.issues.push(...st(n, e.issues)), t.value[n] = e.value;
}
function Mr(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...st(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
function Nr(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ki, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Ze(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Pr(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin, d = c.optout;
	for (let i in t) {
		if (s.has(i)) continue;
		if (i === "__proto__") {
			l === "never" && o.push(i);
			continue;
		}
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => Mr(e, n, i, t, u, d))) : Mr(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function Fr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !at(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => ut(e, r, Pt())))
	}), t);
}
function Ir(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (Ke(e) && Ke(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Ir(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Ir(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Lr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = Ir(t.value, n.value);
	if (!c.valid) {
		if (at(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function Rr(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function zr(e, t, n) {
	e.issues.length && t.issues.push(...st(n, e.issues)), t.value[n] = e.value;
}
function Br(e, t, n, r, i) {
	for (let a = 0; a < n.length; a++) {
		let o = e[a], s = a < r.length;
		if (!s && a >= i && n[a]._zod.optin === "optional") {
			t.value.length = a;
			break;
		}
		if (o.issues.length) {
			if (!s && a >= i) {
				t.value.length = a;
				break;
			}
			t.issues.push(...st(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
function Vr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function Hr(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function Ur(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function Wr(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => ut(e, r, Pt())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function Gr(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function Kr(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => qr(e, r, t.out, n)) : qr(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => qr(e, r, t.in, n)) : qr(e, r, t.in, n);
	}
}
function qr(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
function Jr(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function Yr(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(mt(e));
	}
}
var x, Xr, Zr, S, Qr, $r, ei, ti, ni, ri, ii, ai, oi, si, ci, li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i = g((() => {
	gr(), Vt(), vr(), _n(), Zn(), Mt(), br(), x = /*@__PURE__*/ b("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = yr;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = at(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (ot(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new Rt();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (lt(t.issues, n, e), i ||= at(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						lt(t.issues, n, e), i ||= at(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (at(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Rt();
					return o.then((t) => e._zod.parse(t, a));
				}
				return e._zod.parse(o, a);
			};
			e._zod.run = (r, a) => {
				if (a.skipChecks) return e._zod.parse(r, a);
				if (a.direction === "backward") {
					let t = e._zod.parse({
						value: r.value,
						issues: []
					}, {
						...a,
						skipChecks: !0
					});
					return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
				}
				let o = e._zod.parse(r, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Rt();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return _t(this, "~standard", xr(this));
		},
		set "~standard"(e) {
			gt(this, "~standard", e);
		}
	}), Xr = (e) => e.success ? { value: e.data } : { issues: e.error?.issues }, Zr = /*@__PURE__*/ b("$ZodString", (e, t) => {
		x.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Gn(e._zod.bag), e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = String(n.value);
			} catch {}
			return typeof n.value == "string" || n.issues.push({
				expected: "string",
				code: "invalid_type",
				input: n.value,
				inst: e
			}), n;
		};
	}), S = /*@__PURE__*/ b("$ZodStringFormat", (e, t) => {
		cr.init(e, t), Zr.init(e, t);
	}), Qr = /*@__PURE__*/ b("$ZodGUID", (e, t) => {
		t.pattern ??= jn, S.init(e, t);
	}), $r = /*@__PURE__*/ b("$ZodUUID", (e, t) => {
		if (t.version) {
			let e = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[t.version];
			if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ??= Mn(e);
		} else t.pattern ??= Mn();
		S.init(e, t);
	}), ei = /*@__PURE__*/ b("$ZodEmail", (e, t) => {
		t.pattern ??= Nn, S.init(e, t);
	}), ti = /[\t\n\r]/g, ni = /*@__PURE__*/ b("$ZodURL", (e, t) => {
		S.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = Sr(r, t);
				if (i === 1) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				if (i === 2) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				t.hostname && !wr(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !Tr(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : Cr(r);
				return;
			} catch {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
			}
		};
	}), ri = /*@__PURE__*/ b("$ZodEmoji", (e, t) => {
		t.pattern ??= yn(), S.init(e, t);
	}), ii = /*@__PURE__*/ b("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? kn : vn(t.length), S.init(e, t);
	}), ai = /*@__PURE__*/ b("$ZodCUID", (e, t) => {
		t.pattern ??= wn, S.init(e, t);
	}), oi = /*@__PURE__*/ b("$ZodCUID2", (e, t) => {
		t.pattern ??= Tn, S.init(e, t);
	}), si = /*@__PURE__*/ b("$ZodULID", (e, t) => {
		t.pattern ??= En, S.init(e, t);
	}), ci = /*@__PURE__*/ b("$ZodXID", (e, t) => {
		t.pattern ??= Dn, S.init(e, t);
	}), li = /*@__PURE__*/ b("$ZodKSUID", (e, t) => {
		t.pattern ??= On, S.init(e, t);
	}), ui = /*@__PURE__*/ b("$ZodISODateTime", (e, t) => {
		t.pattern ??= Cn(t), S.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((e) => {
			e._zod.bag.laxFormat = !0;
		}));
	}), di = /*@__PURE__*/ b("$ZodISODate", (e, t) => {
		t.pattern ??= Wn, S.init(e, t);
	}), fi = /*@__PURE__*/ b("$ZodISOTime", (e, t) => {
		t.pattern ??= Sn(t), S.init(e, t);
	}), pi = /*@__PURE__*/ b("$ZodISODuration", (e, t) => {
		t.pattern ??= An, S.init(e, t);
	}), mi = /*@__PURE__*/ b("$ZodIPv4", (e, t) => {
		t.pattern ??= Fn, S.init(e, t), e._zod.bag.format = "ipv4";
	}), hi = /^[0-9a-fA-F:.]+$/, gi = /*@__PURE__*/ b("$ZodIPv6", (e, t) => {
		t.pattern ??= In, S.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
			Er(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), _i = /*@__PURE__*/ b("$ZodCIDRv4", (e, t) => {
		t.pattern ??= Ln, S.init(e, t);
	}), vi = /*@__PURE__*/ b("$ZodCIDRv6", (e, t) => {
		t.pattern ??= Rn, S.init(e, t), e._zod.check = (n) => {
			Dr(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), yi = /*@__PURE__*/ b("$ZodBase64", (e, t) => {
		t.pattern ??= zn, S.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
			Or(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), bi = /*@__PURE__*/ b("$ZodBase64URL", (e, t) => {
		t.pattern ??= Bn, S.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
			kr(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), xi = /*@__PURE__*/ b("$ZodE164", (e, t) => {
		t.pattern ??= Hn, S.init(e, t);
	}), Si = /*@__PURE__*/ b("$ZodJWT", (e, t) => {
		S.init(e, t), e._zod.check = (n) => {
			Ar(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Ci = /*@__PURE__*/ b("$ZodNumber", (e, t) => {
		x.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? qn, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = Number(n.value);
			} catch {}
			let i = n.value;
			if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
			let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
			return n.issues.push({
				expected: "number",
				code: "invalid_type",
				input: i,
				inst: e,
				...a ? { received: a } : {}
			}), n;
		};
	}), wi = /*@__PURE__*/ b("$ZodNumberFormat", (e, t) => {
		ir.init(e, t), Ci.init(e, t);
	}), Ti = /*@__PURE__*/ b("$ZodBoolean", (e, t) => {
		x.init(e, t), e._zod.pattern = Jn, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = !!n.value;
			} catch {}
			let i = n.value;
			return typeof i == "boolean" || n.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input: i,
				inst: e
			}), n;
		};
	}), Ei = /*@__PURE__*/ b("$ZodUnknown", (e, t) => {
		x.init(e, t), e._zod.parse = (e) => e;
	}), Di = /*@__PURE__*/ b("$ZodNever", (e, t) => {
		x.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), Oi = /*@__PURE__*/ b("$ZodArray", (e, t) => {
		x.init(e, t);
		let n = Bt.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!Array.isArray(a)) return r.issues.push({
				expected: "array",
				code: "invalid_type",
				input: a,
				inst: e
			}), r;
			r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
			let o = [];
			for (let e = 0; e < a.length; e++) {
				let n = a[e], s = t.element._zod.run({
					value: n,
					issues: []
				}, i);
				s instanceof Promise ? o.push(s.then((t) => jr(t, r, e))) : jr(s, r, e);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), ki = [], Ai = /* @__PURE__ */ new WeakMap(), ji = /*@__PURE__*/ b("$ZodObject", (e, t) => {
		if (x.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
			let e = t.shape;
			Ai.set(t, e), Object.defineProperty(t, "shape", { get: () => {
				let n = { ...e };
				return Object.defineProperty(t, "shape", { value: n }), Ai.set(t, n), n;
			} });
		}
		let n = Le(() => Nr(t));
		y(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || _(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let r = Ge, i = t.catchall, a, o = Bt.memoizer;
		o?.attach(e), e._zod.parse = (t, s) => {
			a ??= n.value;
			let c = t.value;
			if (!r(c)) return t.issues.push({
				expected: "object",
				code: "invalid_type",
				input: c,
				inst: e
			}), t;
			t.value = o ? o.alloc(e, t, {}, s) : {};
			let l = [], u = a.shape;
			for (let e of a.allKeys) {
				if (e === "__proto__") continue;
				let n = u[e], r = n._zod.optin, i = n._zod.optout, a = n._zod.run({
					value: c[e],
					issues: []
				}, s);
				a instanceof Promise ? l.push(a.then((n) => Mr(n, t, e, c, r, i))) : Mr(a, t, e, c, r, i);
			}
			return i ? Pr(l, c, t, s, n.value, e) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), Mi = /*@__PURE__*/ b("$ZodObjectJIT", (e, t) => {
		ji.init(e, t);
		let n = e._zod.parse, r = Le(() => Nr(t)), i = Bt.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new _r(["payload", "ctx"], {
				shape: t,
				inst: e,
				memo: i,
				syms: a
			}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
          }`;
			o.write("const input = payload.value;");
			let l = Object.create(null), u = 0;
			for (let e of n.allKeys) l[e] = `key_${u++}`;
			o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
			for (let e of n.allKeys) {
				if (e === "__proto__") continue;
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : Ue(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
				if (o.write(`const ${n} = ${s(r)};`), f && p) {
					let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
					o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
				} else f ? o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
        
        if (${n}.value === undefined) {
          if (${i}) {
            newResult[${r}] = undefined;
          }
        } else {
          newResult[${r}] = ${n}.value;
        }

      `) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
			}
			return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
		}, o, s = Ge, c = !Bt.jitless, l = c && wt.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Pr([], p, i, f, d, e) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), Ni = /*@__PURE__*/ b("$ZodUnion", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), y(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), y(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), y(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => ze(e.source)).join("|")})$`);
			}
		});
		let n = t.options.length === 1 ? t.options[0]._zod.run : null;
		e._zod.parse = (r, i) => {
			if (n) return n(r, i);
			let a = !1, o = [];
			for (let e of t.options) {
				let t = e._zod.run({
					value: r.value,
					issues: []
				}, i);
				if (t instanceof Promise) o.push(t), a = !0;
				else {
					if (t.issues.length === 0) return t;
					o.push(t);
				}
			}
			return a ? Promise.all(o).then((t) => Fr(t, r, e, i)) : Fr(o, r, e, i);
		};
	}), Pi = /*@__PURE__*/ b("$ZodDiscriminatedUnion", (e, t) => {
		t.inclusive = !1, Ni.init(e, t);
		let n = e._zod.parse;
		y(e, "propValues", (e) => {
			let t = {};
			for (let n of e.def.options) {
				let r = n._zod.propValues;
				if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(n)}"`);
				for (let [e, n] of Object.entries(r)) {
					Object.prototype.hasOwnProperty.call(t, e) || _(t, e, /* @__PURE__ */ new Set());
					for (let r of n) t[e].add(r);
				}
			}
			return t;
		}), t.options.forEach((e, n) => {
			let r = Ai.get(e._zod.def);
			if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
		});
		let r = Le(() => {
			let e = t.options, n = /* @__PURE__ */ new Map();
			for (let r of e) {
				let e = r._zod.propValues?.[t.discriminator];
				if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
				for (let t of e) {
					if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
					n.set(t, r);
				}
			}
			return n;
		});
		e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Ge(o)) return i.issues.push({
				code: "invalid_type",
				expected: "object",
				input: o,
				inst: e
			}), i;
			let s = r.value.get(o?.[t.discriminator]);
			return s ? s._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
				code: "invalid_union",
				errors: [],
				note: "No matching discriminator",
				discriminator: t.discriminator,
				options: Array.from(r.value.keys()),
				input: o,
				path: [t.discriminator],
				inst: e
			}), i);
		};
	}), Fi = /*@__PURE__*/ b("$ZodIntersection", (e, t) => {
		x.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Lr(e, t, n)) : Lr(e, i, a);
		};
	}), Ii = /*@__PURE__*/ b("$ZodTuple", (e, t) => {
		x.init(e, t);
		let n = t.items, r = Bt.memoizer;
		r?.attach(e), e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Array.isArray(o)) return i.issues.push({
				input: o,
				inst: e,
				expected: "tuple",
				code: "invalid_type"
			}), i;
			i.value = r ? r.alloc(e, i, [], a) : [];
			let s = [], c = Rr(n, "optin"), l = Rr(n, "optout");
			if (!t.rest) {
				if (o.length < c) return i.issues.push({
					code: "too_small",
					minimum: c,
					inclusive: !0,
					input: o,
					inst: e,
					origin: "array"
				}), i;
				o.length > n.length && i.issues.push({
					code: "too_big",
					maximum: n.length,
					inclusive: !0,
					input: o,
					inst: e,
					origin: "array"
				});
			}
			let u = Array(n.length);
			for (let e = 0; e < n.length; e++) {
				let t = n[e]._zod.run({
					value: o[e],
					issues: []
				}, a);
				t instanceof Promise ? s.push(t.then((t) => {
					u[e] = t;
				})) : u[e] = t;
			}
			if (t.rest) {
				let e = n.length - 1, r = o.slice(n.length);
				for (let n of r) {
					e++;
					let r = t.rest._zod.run({
						value: n,
						issues: []
					}, a);
					r instanceof Promise ? s.push(r.then((t) => zr(t, i, e))) : zr(r, i, e);
				}
			}
			return s.length ? Promise.all(s).then(() => Br(u, i, n, o, l)) : Br(u, i, n, o, l);
		};
	}), Li = /*@__PURE__*/ b("$ZodRecord", (e, t) => {
		x.init(e, t);
		let n = Bt.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!Ke(a)) return r.issues.push({
				expected: "record",
				code: "invalid_type",
				input: a,
				inst: e
			}), r;
			let o = [], s = t.keyType._zod.values;
			if (s && !t.partial) {
				r.value = n ? n.alloc(e, r, {}, i) : {};
				let c = /* @__PURE__ */ new Set();
				for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
					if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
					let s = t.keyType._zod.run({
						value: n,
						issues: []
					}, i);
					if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					if (s.issues.length) {
						r.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: s.issues.map((e) => ut(e, i, Pt())),
							input: n,
							path: [n],
							inst: e
						});
						continue;
					}
					let l = s.value;
					if (l === "__proto__") continue;
					let u = t.valueType._zod.run({
						value: a[n],
						issues: []
					}, i);
					u instanceof Promise ? o.push(u.then((e) => {
						e.issues.length && r.issues.push(...st(n, e.issues)), r.value[l] = e.value;
					})) : (u.issues.length && r.issues.push(...st(n, u.issues)), r.value[l] = u.value);
				}
				let l;
				for (let e in a) if (!c.has(e)) {
					if (t.mode === "loose") {
						if (e === "__proto__") continue;
						r.value[e] = a[e];
					} else l ??= [], l.push(e);
				}
				l && l.length > 0 && r.issues.push({
					code: "unrecognized_keys",
					input: a,
					inst: e,
					keys: l,
					continue: !0
				});
			} else {
				r.value = n ? n.alloc(e, r, {}, i) : {};
				let c;
				for (let n of Reflect.ownKeys(a)) {
					if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
					let l = t.keyType._zod.run({
						value: n,
						issues: []
					}, i);
					if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					if (typeof n == "string" && qn.test(n) && l.issues.length) {
						let e = t.keyType._zod.run({
							value: Number(n),
							issues: []
						}, i);
						if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
						e.issues.length === 0 && (l = e);
					}
					if (l.issues.length) {
						t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: l.issues.map((e) => ut(e, i, Pt())),
							input: n,
							path: [n],
							inst: e
						});
						continue;
					}
					let u = l.value;
					if (u === "__proto__") continue;
					let d = t.valueType._zod.run({
						value: a[n],
						issues: []
					}, i);
					d instanceof Promise ? o.push(d.then((e) => {
						e.issues.length && r.issues.push(...st(n, e.issues)), r.value[u] = e.value;
					})) : (d.issues.length && r.issues.push(...st(n, d.issues)), r.value[u] = d.value);
				}
				c && c.length > 0 && r.issues.push({
					code: "unrecognized_keys",
					input: a,
					inst: e,
					keys: c,
					continue: !0
				});
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Ri = /*@__PURE__*/ b("$ZodEnum", (e, t) => {
		x.init(e, t);
		let n = Pe(t.entries), r = new Set(n);
		e._zod.values = r;
		let i = n.filter((e) => Tt.has(typeof e));
		e._zod.pattern = RegExp(i.length ? `^(${i.map((e) => Je(e.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), zi = /*@__PURE__*/ b("$ZodLiteral", (e, t) => {
		x.init(e, t);
		let n = new Set(t.values);
		e._zod.values = n, e._zod.pattern = RegExp(t.values.length ? `^(${t.values.map((e) => typeof e == "string" ? Je(e) : e ? Je(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, i) => {
			let a = r.value;
			return n.has(a) || r.issues.push({
				code: "invalid_value",
				values: t.values,
				input: a,
				inst: e
			}), r;
		};
	}), Bi = /*@__PURE__*/ b("$ZodTransform", (e, t) => {
		x.init(e, t), e._zod.optin = "optional", Bt.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new zt(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new Rt();
			return n.value = i, n;
		};
	}), Vi = /*@__PURE__*/ b("$ZodOptional", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", y(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), y(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${ze(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => Vr(e, t)) : Vr(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), Hi = /*@__PURE__*/ b("$ZodExactOptional", (e, t) => {
		Vi.init(e, t), y(e, "values", (e) => e.def.innerType._zod.values), y(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), Ui = /*@__PURE__*/ b("$ZodNullable", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin), y(e, "optout", (e) => e.def.innerType._zod.optout), y(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${ze(t.source)}|null)$`) : void 0;
		}), y(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), Wi = /*@__PURE__*/ b("$ZodDefault", (e, t) => {
		x.init(e, t), e._zod.optin = "defaulted", y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Hr(e, t)) : Hr(r, t);
		};
	}), Gi = /*@__PURE__*/ b("$ZodPrefault", (e, t) => {
		x.init(e, t), e._zod.optin = "defaulted", y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), Ki = /*@__PURE__*/ b("$ZodNonOptional", (e, t) => {
		x.init(e, t), y(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => Ur(t, e)) : Ur(i, e);
		};
	}), qi = /*@__PURE__*/ b("$ZodCatch", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), y(e, "optout", (e) => e.def.innerType._zod.optout), y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => Wr(e, r, t, n)) : Wr(e, r, t, n);
		};
	}), Ji = /*@__PURE__*/ b("$ZodPipe", (e, t) => {
		x.init(e, t), y(e, "values", (e) => e.def.in._zod.values), y(e, "optin", (e) => e.def.in._zod.optin), y(e, "optout", (e) => e.def.out._zod.optout), y(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => Gr(e, t.in, n)) : Gr(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Gr(e, t.out, n)) : Gr(r, t.out, n);
		};
	}), Yi = /*@__PURE__*/ b("$ZodCodec", (e, t) => {
		x.init(e, t), y(e, "values", (e) => e.def.in._zod.values), y(e, "optin", (e) => e.def.in._zod.optin), y(e, "optout", (e) => e.def.out._zod.optout), y(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if ((n.direction || "forward") === "forward") {
				let r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => Kr(e, t, n)) : Kr(r, t, n);
			}
			{
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => Kr(e, t, n)) : Kr(r, t, n);
			}
		};
	}), Xi = /*@__PURE__*/ b("$ZodReadonly", (e, t) => {
		x.init(e, t), y(e, "propValues", (e) => e.def.innerType._zod.propValues), y(e, "values", (e) => e.def.innerType._zod.values), y(e, "optin", (e) => e.def.innerType?._zod?.optin), y(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(Jr) : Jr(r);
		};
	}), Zi = /*@__PURE__*/ b("$ZodLazy", (e, t) => {
		x.init(e, t), Ve(e._zod, "innerType", () => {
			let e = t;
			return e._cachedInner ||= t.getter(), e._cachedInner;
		}), y(e, "pattern", (e) => e.innerType?._zod?.pattern), y(e, "propValues", (e) => e.innerType?._zod?.propValues), y(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), y(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
	}), Qi = /*@__PURE__*/ b("$ZodCustom", (e, t) => {
		Qn.init(e, t), x.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => Yr(t, n, r, e));
			Yr(i, n, r, e);
		};
	});
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/memoizer.js
function ea(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function ta(e, t) {
	let n = ca.get(e);
	if (n !== void 0) return n;
	if (t.has(e)) return !0;
	t.add(e);
	let r = !1, i = (e) => {
		!r && e?._zod && ta(e, t) && (r = !0);
	}, a = e._zod.def;
	switch (a.type) {
		case "object":
			for (let e of Reflect.ownKeys(a.shape)) i(a.shape[e]);
			i(a.catchall);
			break;
		case "array":
			i(a.element);
			break;
		case "tuple":
			for (let e of a.items) i(e);
			i(a.rest);
			break;
		case "record":
		case "map":
			i(a.keyType), i(a.valueType);
			break;
		case "set":
			i(a.valueType);
			break;
		case "union":
			for (let e of a.options) i(e);
			break;
		case "intersection":
			i(a.left), i(a.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			i(a.innerType);
			break;
		case "pipe":
			i(a.in), i(a.out);
			break;
		case "function":
			i(a.input), i(a.output);
			break;
		case "lazy":
			i(e._zod.innerType);
			break;
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in a) {
			let t = Object.getOwnPropertyDescriptor(a, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) i(n);
				else if (Array.isArray(n)) for (let e of n) i(e);
			}
		}
	}
	return t.delete(e), ca.set(e, r), r;
}
function na(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
function ra() {
	return da;
}
function ia(e, t) {
	let n = e[oa]?.backEdges;
	return n !== void 0 && typeof t == "object" && !!t && n.has(t);
}
var aa, oa, sa, ca, la, ua, da, fa = g((() => {
	aa = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, oa = "~memo", sa = [], ca = /*@__PURE__*/ new WeakMap(), ua = [], da = {
		alloc(e, t, n) {
			let r = la;
			if (!r) return n;
			la = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), ua.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && ia(n, e.value)) throw new aa();
					return t(e, n);
				};
				e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
			});
		},
		attach(e) {
			var t;
			let n, r, i;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, a = (o, s) => {
					if (n === void 0 && (n = ta(e, /* @__PURE__ */ new Set()), !n)) return e._zod.parse = t, e._zod.run === a && (e._zod.run = t), t(o, s);
					let c = o.value;
					if (typeof c != "object" || !c) return t(o, s);
					let l = s[oa];
					l || (l = {
						buckets: /* @__PURE__ */ new Map(),
						backEdges: void 0
					}, s[oa] = l);
					let u;
					r === s ? u = i : (u = na(l, e), r = s, i = u);
					let d = u.get(c);
					if (d) return o.value = d.value, d.issues ? d.issues.length && o.issues.push(...ea(d.issues)) : (o.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(d.value)), o;
					la = u;
					let f = ua.length, p = t(o, s);
					la = void 0;
					let ee = ua.length > f ? ua.pop() : void 0;
					return p instanceof Promise ? p.then((e) => (ee && (ee.issues = e.issues.length ? ea(e.issues) : sa), e)) : (ee && (ee.issues = p.issues.length ? ea(p.issues) : sa), p);
				};
				e._zod.parse = a, e._zod.run === t && (e._zod.run = a);
			});
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/locales/en.js
function pa() {
	return { localeError: ma() };
}
var ma, ha = g((() => {
	Mt(), ma = () => {
		let e = {
			string: {
				unit: "characters",
				verb: "to have"
			},
			file: {
				unit: "bytes",
				verb: "to have"
			},
			array: {
				unit: "items",
				verb: "to have"
			},
			set: {
				unit: "items",
				verb: "to have"
			},
			map: {
				unit: "entries",
				verb: "to have"
			}
		};
		function t(t) {
			return e[t] ?? null;
		}
		let n = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			credit_card: "credit card number",
			jwt: "JWT",
			template_literal: "input"
		}, r = { nan: "NaN" };
		function i(e, t) {
			return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
		}
		return (e) => {
			switch (e.code) {
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(pt(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${Xe(e.values[0])}` : `Invalid option: expected one of ${Fe(e.values, "|")}`;
				case "too_big": {
					let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
					return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
				}
				case "too_small": {
					let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
					return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
				}
				case "invalid_format": {
					let t = e;
					return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
				}
				case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Fe(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/registries.js
function ga() {
	return new va();
}
var _a, va, ya, ba = g((() => {
	va = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
		}
		add(e, ...t) {
			let n = t[0];
			return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
		}
		clear() {
			return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
		}
		remove(e) {
			let t = this._map.get(e);
			return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
		}
		get(e) {
			let t = e._zod.parent;
			if (t) {
				let n = { ...this.get(t) ?? {} };
				delete n.id;
				let r = {
					...n,
					...this._map.get(e)
				};
				return Object.keys(r).length ? r : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	}, (_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = ga()), ya = globalThis.__zod_globalRegistry;
})), xa = g((() => {}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function Sa(e, t) {
	return new e({
		type: "string",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ca(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wa(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ta(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ea(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Da(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Oa(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ka(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Aa(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ja(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ma(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Na(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pa(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fa(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ia(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function La(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ra(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function za(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ba(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Va(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ha(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ua(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wa(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ga(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ka(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qa(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ja(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ya(e, t) {
	return new e({
		type: "number",
		checks: [],
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xa(e, t) {
	return new e({
		type: "number",
		coerce: !0,
		checks: [],
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Za(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qa(e, t) {
	return new e({
		type: "boolean",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $a(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function eo(e, t) {
	return new e({
		type: "never",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function to(e, t) {
	return new tr({
		check: "less_than",
		...v(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function no(e, t) {
	return new tr({
		check: "less_than",
		...v(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function ro(e, t) {
	return new nr({
		check: "greater_than",
		...v(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function io(e, t) {
	return new nr({
		check: "greater_than",
		...v(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function ao(e, t) {
	return new rr({
		check: "multiple_of",
		...v(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function oo(e, t) {
	return new ar({
		check: "max_length",
		...v(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function so(e, t) {
	return new or({
		check: "min_length",
		...v(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function co(e, t) {
	return new sr({
		check: "length_equals",
		...v(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function lo(e, t) {
	return new lr({
		check: "string_format",
		format: "regex",
		...v(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function uo(e) {
	return new ur({
		check: "string_format",
		format: "lowercase",
		...v(e)
	});
}
// @__NO_SIDE_EFFECTS__
function fo(e) {
	return new dr({
		check: "string_format",
		format: "uppercase",
		...v(e)
	});
}
// @__NO_SIDE_EFFECTS__
function po(e, t) {
	return new fr({
		check: "string_format",
		format: "includes",
		...v(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function mo(e, t) {
	return new pr({
		check: "string_format",
		format: "starts_with",
		...v(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function ho(e, t) {
	return new mr({
		check: "string_format",
		format: "ends_with",
		...v(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function go(e) {
	return new hr({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function _o(e) {
	return /* @__PURE__ */ go((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function vo() {
	return /* @__PURE__ */ go((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function yo() {
	return /* @__PURE__ */ go((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function bo() {
	return /* @__PURE__ */ go((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function xo() {
	return /* @__PURE__ */ go((e) => We(e));
}
// @__NO_SIDE_EFFECTS__
function So(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...v(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Co(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...v(n)
	});
}
// @__NO_SIDE_EFFECTS__
function wo(e, t) {
	let n = /* @__PURE__ */ To((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(mt(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(mt(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function To(e, t) {
	let n = new Qn({
		check: "custom",
		...v(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Eo(e, t) {
	let n = v(t), r = n.truthy ?? [
		"true",
		"1",
		"yes",
		"on",
		"y",
		"enabled"
	], i = n.falsy ?? [
		"false",
		"0",
		"no",
		"off",
		"n",
		"disabled"
	];
	n.case !== "sensitive" && (r = r.map((e) => typeof e == "string" ? e.toLowerCase() : e), i = i.map((e) => typeof e == "string" ? e.toLowerCase() : e));
	let a = new Set(r), o = new Set(i), s = e.Codec ?? Yi, c = e.Boolean ?? Ti, l = new s({
		type: "pipe",
		in: new (e.String ?? Zr)({
			type: "string",
			error: n.error
		}),
		out: new c({
			type: "boolean",
			error: n.error
		}),
		transform: ((e, t) => {
			let r = e;
			return n.case !== "sensitive" && (r = r.toLowerCase()), a.has(r) ? !0 : !o.has(r) && (t.issues.push({
				code: "invalid_value",
				expected: "stringbool",
				values: [...a, ...o],
				input: t.value,
				inst: l,
				continue: !1
			}), {});
		}),
		reverseTransform: ((e, t) => e === !0 ? r[0] || "true" : i[0] || "false"),
		error: n.error
	});
	return l._zod.bag.truthy = r, l._zod.bag.falsy = i, l._zod.bag.case = n.case ?? "insensitive", l;
}
var Do = g((() => {
	gr(), $i(), Mt();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/to-json-schema.js
function Oo(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && _(e, t, n[t]);
	return e;
}
function ko(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? ya,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function C(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function w(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, w(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Oo(o.schema, c), t.io === "input" && Lo(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Ao(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function jo(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${Ao(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Ao(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function Mo(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Mo(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
function No(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Po(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Ro.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? No(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			_(n, r, e.length === 1 ? e[0] : Po(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = No(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Fo(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Ro) if (t in e) return;
	let n = t.filter((e) => zo.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Po(t);
	else {
		let e = n[0], i = zo.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Po([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Oo(e, r));
}
function Io(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Oo(i, s), Oo(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Mo(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Fo(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Oo(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, _(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: Vo(t, "input", e.processors),
					output: Vo(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function Lo(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return Lo(r.element, n);
	if (r.type === "set") return Lo(r.valueType, n);
	if (r.type === "lazy") return Lo(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return Lo(r.innerType, n);
	if (r.type === "intersection") return Lo(r.left, n) || Lo(r.right, n);
	if (r.type === "record" || r.type === "map") return Lo(r.keyType, n) || Lo(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Lo(r.in, n) || Lo(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (Lo(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (Lo(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (Lo(e, n)) return !0;
		return !!(r.rest && Lo(r.rest, n));
	}
	return !1;
}
var Ro, zo, Bo, Vo, Ho = g((() => {
	ba(), Mt(), Ro = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), zo = ["oneOf", "anyOf"], Bo = (e, t = {}) => (n) => {
		let r = ko({
			...n,
			processors: t
		});
		return w(e, r), jo(r, e), Io(r, e);
	}, Vo = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = ko({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return w(e, o), jo(o, e), Io(o, e);
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/json-schema-processors.js
function Uo(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Uo(t.out) : t.type === "catch" ? Uo(t.innerType) : e._zod.optin;
}
function Wo(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Wo(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Wo(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? qn : Kn).source), p) : p;
}
function Go(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Cs.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Wo(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
function Ko(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (C(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Ds) : JSON.parse(o);
}
function qo(e, t) {
	if ("_idmap" in e) {
		let n = e, r = ko({
			...t,
			processors: Is
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			w(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			jo(r, n), _(a, t, Io(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = ko({
		...t,
		processors: Is
	});
	return w(e, n), jo(n, e), Io(n, e);
}
var Jo, Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs, ps, ms, hs, gs, _s, vs, ys, bs, xs, Ss, Cs, ws, Ts, Es, Ds, Os, ks, As, js, Ms, Ns, Ps, Fs, Is, Ls = g((() => {
	Zn(), Ho(), Mt(), Jo = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, Yo = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = e._zod.bag;
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Jo[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c];
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, Xo = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
		i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
		let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? i.multipleOf = Math.abs(c) : C(e, t, i, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
	}, Zo = (e, t, n, r) => {
		n.type = "boolean";
	}, Qo = (e, t, n, r) => {
		C(e, t, n, r, "BigInt cannot be represented in JSON Schema");
	}, $o = (e, t, n, r) => {
		C(e, t, n, r, "Symbols cannot be represented in JSON Schema");
	}, es = (e, t, n, r) => {
		t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
	}, ts = (e, t, n, r) => {
		C(e, t, n, r, "Undefined cannot be represented in JSON Schema");
	}, ns = (e, t, n, r) => {
		C(e, t, n, r, "Void cannot be represented in JSON Schema");
	}, rs = (e, t, n, r) => {
		n.not = {};
	}, is = (e, t, n, r) => {}, as = (e, t, n, r) => {}, os = (e, t, n, r) => {
		C(e, t, n, r, "Date cannot be represented in JSON Schema");
	}, ss = (e, t, n, r) => {
		let i = e._zod.def, a = Pe(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, cs = (e, t, n, r) => {
		let i = e._zod.def;
		if (i.values.length === 0) {
			n.not = {};
			return;
		}
		let a = [];
		for (let o of i.values) if (o === void 0) {
			if (C(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
		} else if (typeof o == "bigint") {
			if (C(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
			a.push(Number(o));
		} else a.push(o);
		if (a.length !== 0) {
			if (a.length === 1) {
				let e = a[0];
				n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
			} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
		}
	}, ls = (e, t, n, r) => {
		C(e, t, n, r, "NaN cannot be represented in JSON Schema");
	}, us = (e, t, n, r) => {
		let i = n, a = e._zod.pattern;
		if (!a) throw Error("Pattern not found in template literal");
		i.type = "string", i.pattern = a.source;
	}, ds = (e, t, n, r) => {
		let i = n, a = {
			type: "string",
			format: "binary",
			contentEncoding: "binary"
		}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
		o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
	}, fs = (e, t, n, r) => {
		n.type = "boolean";
	}, ps = (e, t, n, r) => {
		C(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, ms = (e, t, n, r) => {
		C(e, t, n, r, "Function types cannot be represented in JSON Schema");
	}, hs = (e, t, n, r) => {
		C(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, gs = (e, t, n, r) => {
		C(e, t, n, r, "Map cannot be represented in JSON Schema");
	}, _s = (e, t, n, r) => {
		C(e, t, n, r, "Set cannot be represented in JSON Schema");
	}, vs = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = w(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, ys = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && C(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) _(i.properties, e, w(o[e], t, {
			...r,
			path: [
				...r.path,
				"properties",
				e
			]
		}));
		let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
			let n = a.shape[e];
			return t.io === "input" ? Uo(n) === void 0 : n._zod.optout === void 0;
		}));
		c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = w(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, bs = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => w(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, xs = (e, t, n, r) => {
		let i = e._zod.def, a = w(i.left, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				0
			]
		}), o = w(i.right, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				1
			]
		}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
		n.allOf = c, t.intersections.push(c);
	}, Ss = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "array";
		let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => w(e, t, {
			...r,
			path: [
				...r.path,
				o,
				n
			]
		})), l = a.rest ? w(a.rest, t, {
			...r,
			path: [
				...r.path,
				s,
				...t.target === "openapi-3.0" ? [a.items.length] : []
			]
		}) : null, u = a.items.length;
		for (; u > 0;) {
			let e = a.items[u - 1];
			if (!(t.io === "input" ? Uo(e) !== void 0 : e._zod.optout === "optional")) break;
			u--;
		}
		let d = a.items.length, f = !a.rest;
		t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
		let { minimum: p, maximum: ee } = e._zod.bag;
		typeof p == "number" && (i.minItems = p), typeof ee == "number" && (i.maxItems = ee);
	}, Cs = /* @__PURE__ */ new WeakMap(), ws = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "object";
		let o = a.keyType, s = o._zod.bag?.patterns;
		if (a.mode === "loose" && s && s.size > 0) {
			let e = w(a.valueType, t, {
				...r,
				path: [
					...r.path,
					"patternProperties",
					"*"
				]
			});
			i.patternProperties = {};
			for (let t of s) _(i.patternProperties, t.source, e);
		} else {
			if (t.target === "draft-07" || t.target === "draft-2020-12") {
				i.propertyNames = w(a.keyType, t, {
					...r,
					path: [...r.path, "propertyNames"]
				});
				let n = Cs.get(t);
				n || (n = [], Cs.set(t, n), t.deferred.push(() => Go(t))), n.push(e);
			}
			i.additionalProperties = w(a.valueType, t, {
				...r,
				path: [...r.path, "additionalProperties"]
			});
		}
		let c = o._zod.values, l = t.io === "input" && Uo(a.valueType) !== void 0;
		if (c && !a.partial && !l) {
			let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
			e.length > 0 && (i.required = e.map(String));
		}
	}, Ts = (e, t, n, r) => {
		let i = e._zod.def, a = w(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, Es = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Ds = Symbol(), Os = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = Ko(i.defaultValue, e, t, n, r);
		o !== Ds && (n.default = o);
	}, ks = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = Ko(i.defaultValue, e, t, n, r);
		o !== Ds && (n._prefault = o);
	}, As = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			C(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, js = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		w(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, Ms = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, Ns = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Ps = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Fs = (e, t, n, r) => {
		let i = e._zod.innerType;
		w(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}, Is = {
		string: Yo,
		number: Xo,
		boolean: Zo,
		bigint: Qo,
		symbol: $o,
		null: es,
		undefined: ts,
		void: ns,
		never: rs,
		any: is,
		unknown: as,
		date: os,
		enum: ss,
		literal: cs,
		nan: ls,
		template_literal: us,
		file: ds,
		success: fs,
		custom: ps,
		function: ms,
		transform: hs,
		map: gs,
		set: _s,
		array: vs,
		object: ys,
		union: bs,
		intersection: xs,
		tuple: Ss,
		record: ws,
		nullable: Ts,
		nonoptional: Es,
		default: Os,
		prefault: ks,
		catch: As,
		pipe: js,
		readonly: Ms,
		promise: Ns,
		optional: Ps,
		lazy: Fs
	};
})), Rs = g((() => {
	Vt(), _n(), en(), $i(), fa(), gr(), br(), Mt(), Zn(), ha(), ba(), vr(), xa(), Do(), Ho(), Ls(), Ho();
})), zs = g((() => {
	Rs();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/errors.js
function Bs(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var Vs, Hs, Us, Ws = g((() => {
	Rs(), Mt(), Vs = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Hs = (e, t) => {
		Qt.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		Vs.has(n) || (Vs.add(n), Bs(n, "format", (e) => (t) => Kt(e, t)), Bs(n, "flatten", (e) => (t) => Gt(e, t)), Bs(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, Ie, 2);
		}), Bs(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, Ie, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, Us = /*@__PURE__*/ b("ZodError", Hs, void 0, { Parent: Error });
})), Gs, Ks, qs, Js, Ys, Xs, Zs, Qs, $s, ec, tc, nc, rc = g((() => {
	Rs(), Ws(), Gs = /* @__PURE__ */ nn(Us), Ks = /* @__PURE__ */ rn(Us), qs = /* @__PURE__ */ an(Us), Js = /* @__PURE__ */ sn(Us), Ys = /* @__PURE__ */ ln(Us), Xs = /* @__PURE__ */ un(Us), Zs = /* @__PURE__ */ dn(Us), Qs = /* @__PURE__ */ fn(Us), $s = /* @__PURE__ */ pn(Us), ec = /* @__PURE__ */ mn(Us), tc = /* @__PURE__ */ hn(Us), nc = /* @__PURE__ */ gn(Us);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/schemas.js
function ic() {
	Bt.localeError || Pt(pa());
}
function ac() {
	Bt.memoizer || Pt({ memoizer: ra() });
}
function T(e) {
	return /* @__PURE__ */ Sa(Mc, e);
}
function oc(e) {
	return /* @__PURE__ */ ka(Bc, e);
}
function sc(e) {
	return /* @__PURE__ */ za(Xc, e);
}
function cc(e) {
	return /* @__PURE__ */ Ba(Zc, e);
}
function E(e) {
	return /* @__PURE__ */ Ya(nl, e);
}
function lc(e) {
	return /* @__PURE__ */ Za(rl, e);
}
function D(e) {
	return /* @__PURE__ */ Qa(il, e);
}
function uc() {
	return /* @__PURE__ */ $a(al);
}
function dc(e) {
	return /* @__PURE__ */ eo(ol, e);
}
function O(e, t) {
	return /* @__PURE__ */ So(sl, e, t);
}
function k(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...v(t)
	};
	return new cl(n);
}
function fc(e, t) {
	return new cl({
		type: "object",
		shape: e,
		catchall: dc(),
		...v(t)
	});
}
function pc(e, t) {
	return new cl({
		type: "object",
		shape: e,
		catchall: uc(),
		...v(t)
	});
}
function mc(e, t) {
	return new ll({
		type: "union",
		options: e,
		...v(t)
	});
}
function A(e, t, n) {
	return new ul({
		type: "union",
		options: t,
		discriminator: e,
		...v(n)
	});
}
function hc(e, t) {
	return new dl({
		type: "intersection",
		left: e,
		right: t
	});
}
function gc(e, t, n) {
	let r = t instanceof x;
	return new fl({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...v(r ? n : t)
	});
}
function j(e, t, n) {
	return !t || !t._zod ? new pl({
		type: "record",
		keyType: T(),
		valueType: e,
		...v(t)
	}) : new pl({
		type: "record",
		keyType: e,
		valueType: t,
		...v(n)
	});
}
function _c(e, t, n) {
	return new pl({
		type: "record",
		keyType: e,
		valueType: t,
		...v(n),
		partial: !0
	});
}
function M(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new ml({
		type: "enum",
		entries: n,
		...v(t)
	});
}
function N(e, t) {
	return new hl({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...v(t)
	});
}
function vc(e) {
	return new gl({
		type: "transform",
		transform: e
	});
}
function yc(e) {
	return new _l({
		type: "optional",
		innerType: e
	});
}
function bc(e) {
	return new vl({
		type: "optional",
		innerType: e
	});
}
function xc(e) {
	return new yl({
		type: "nullable",
		innerType: e
	});
}
function Sc(e, t) {
	return new bl({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : qe(t);
		}
	});
}
function Cc(e, t) {
	return new xl({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : qe(t);
		}
	});
}
function wc(e, t) {
	return new Sl({
		type: "nonoptional",
		innerType: e,
		...v(t)
	});
}
function Tc(e, t) {
	return new Cl({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : xt(t)
	});
}
function Ec(e, t) {
	return new wl({
		type: "pipe",
		in: e,
		out: t
	});
}
function Dc(e) {
	return new El({
		type: "readonly",
		innerType: e
	});
}
function Oc(e) {
	return new Dl({
		type: "lazy",
		getter: e
	});
}
function kc(e, t = {}) {
	return /* @__PURE__ */ Co(Ol, e, t);
}
function Ac(e, t) {
	return /* @__PURE__ */ wo(e, t);
}
var P, jc, Mc, F, Nc, Pc, Fc, Ic, Lc, Rc, zc, Bc, Vc, Hc, Uc, Wc, Gc, Kc, qc, Jc, Yc, Xc, Zc, Qc, $c, el, tl, nl, rl, il, al, ol, sl, cl, ll, ul, dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl, Sl, Cl, wl, Tl, El, Dl, Ol, kl, Al = g((() => {
	Rs(), Ls(), Ho(), ha(), zs(), rc(), P = /*@__PURE__*/ b("ZodType", (e, t) => (ic(), x.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(He(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return Ye(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(kc(e, t));
		},
		superRefine(e, t) {
			return this.check(Ac(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ go(e));
		},
		optional() {
			return yc(this);
		},
		exactOptional() {
			return bc(this);
		},
		nullable() {
			return xc(this);
		},
		nullish() {
			return yc(xc(this));
		},
		nonoptional(e) {
			return wc(this, e);
		},
		array() {
			return O(this);
		},
		or(e) {
			return mc([this, e]);
		},
		and(e) {
			return hc(this, e);
		},
		transform(e) {
			return Ec(this, vc(e));
		},
		default(e) {
			return Sc(this, e);
		},
		prefault(e) {
			return Cc(this, e);
		},
		catch(e) {
			return Tc(this, e);
		},
		pipe(e) {
			return Ec(this, e);
		},
		readonly() {
			return Dc(this);
		},
		describe(e) {
			let t = this.clone();
			return ya.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return ya.get(this);
			let t = this.clone();
			return ya.add(t, e[0]), t;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(e, ...t) {
			return t.length === 0 ? e(this) : e(this, ...t);
		},
		get "~standard"() {
			return _t(this, "~standard", {
				...xr(this),
				jsonSchema: {
					input: Vo(this, "input"),
					output: Vo(this, "output")
				}
			});
		},
		set "~standard"(e) {
			gt(this, "~standard", e);
		},
		parse: function e(t, n) {
			return Gs(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await Ks(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return qs(this, e, t);
		},
		async safeParseAsync(e, t) {
			return Js(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			gt(this, "spa", e);
		},
		encode: function e(t, n) {
			return Ys(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return Xs(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await Zs(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await Qs(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return $s(this, e, t);
		},
		safeDecode(e, t) {
			return ec(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return tc(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return nc(this, e, t);
		},
		toJSONSchema(e) {
			return Bo(this, {})(e);
		},
		get description() {
			return ya.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), jc = /*@__PURE__*/ b("_ZodString", (e, t) => {
		Zr.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yo(e, t, n, r);
		let n = e._zod.bag;
		e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ lo(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ po(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ mo(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ ho(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ so(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ oo(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ co(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ so(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ uo(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ fo(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ vo());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ _o(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ yo());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ bo());
		},
		slugify() {
			return this.check(/* @__PURE__ */ xo());
		}
	}), Mc = /*@__PURE__*/ b("ZodString", (e, t) => {
		Zr.init(e, t), jc.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ Ca(Lc, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ ka(Bc, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ Wa(tl, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ Aa(Vc, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ wa(Rc, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ Ta(zc, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ Ea(zc, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ Da(zc, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ Oa(zc, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ ja(Hc, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ Ma(Uc, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ Na(Wc, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ Pa(Gc, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ Va(Qc, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ Ha($c, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ Fa(Kc, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ Ia(qc, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ La(Jc, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ Ra(Yc, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ za(Xc, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ Ba(Zc, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ Ua(el, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ Ga(Nc, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ Ka(Pc, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ qa(Fc, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ Ja(Ic, e));
		}
	}), F = /*@__PURE__*/ b("ZodStringFormat", (e, t) => {
		S.init(e, t), jc.init(e, t);
	}), Nc = /*@__PURE__*/ b("ZodISODateTime", (e, t) => {
		ui.init(e, t), F.init(e, t);
	}), Pc = /*@__PURE__*/ b("ZodISODate", (e, t) => {
		di.init(e, t), F.init(e, t);
	}), Fc = /*@__PURE__*/ b("ZodISOTime", (e, t) => {
		fi.init(e, t), F.init(e, t);
	}), Ic = /*@__PURE__*/ b("ZodISODuration", (e, t) => {
		pi.init(e, t), F.init(e, t);
	}), Lc = /*@__PURE__*/ b("ZodEmail", (e, t) => {
		ei.init(e, t), F.init(e, t);
	}), Rc = /*@__PURE__*/ b("ZodGUID", (e, t) => {
		Qr.init(e, t), F.init(e, t);
	}), zc = /*@__PURE__*/ b("ZodUUID", (e, t) => {
		$r.init(e, t), F.init(e, t);
	}), Bc = /*@__PURE__*/ b("ZodURL", (e, t) => {
		ni.init(e, t), F.init(e, t);
	}), Vc = /*@__PURE__*/ b("ZodEmoji", (e, t) => {
		ri.init(e, t), F.init(e, t);
	}), Hc = /*@__PURE__*/ b("ZodNanoID", (e, t) => {
		ii.init(e, t), F.init(e, t);
	}), Uc = /*@__PURE__*/ b("ZodCUID", (e, t) => {
		ai.init(e, t), F.init(e, t);
	}), Wc = /*@__PURE__*/ b("ZodCUID2", (e, t) => {
		oi.init(e, t), F.init(e, t);
	}), Gc = /*@__PURE__*/ b("ZodULID", (e, t) => {
		si.init(e, t), F.init(e, t);
	}), Kc = /*@__PURE__*/ b("ZodXID", (e, t) => {
		ci.init(e, t), F.init(e, t);
	}), qc = /*@__PURE__*/ b("ZodKSUID", (e, t) => {
		li.init(e, t), F.init(e, t);
	}), Jc = /*@__PURE__*/ b("ZodIPv4", (e, t) => {
		mi.init(e, t), F.init(e, t);
	}), Yc = /*@__PURE__*/ b("ZodIPv6", (e, t) => {
		gi.init(e, t), F.init(e, t);
	}), Xc = /*@__PURE__*/ b("ZodCIDRv4", (e, t) => {
		_i.init(e, t), F.init(e, t);
	}), Zc = /*@__PURE__*/ b("ZodCIDRv6", (e, t) => {
		vi.init(e, t), F.init(e, t);
	}), Qc = /*@__PURE__*/ b("ZodBase64", (e, t) => {
		yi.init(e, t), F.init(e, t);
	}), $c = /*@__PURE__*/ b("ZodBase64URL", (e, t) => {
		bi.init(e, t), F.init(e, t);
	}), el = /*@__PURE__*/ b("ZodE164", (e, t) => {
		xi.init(e, t), F.init(e, t);
	}), tl = /*@__PURE__*/ b("ZodJWT", (e, t) => {
		Si.init(e, t), F.init(e, t);
	}), nl = /*@__PURE__*/ b("ZodNumber", (e, t) => {
		Ci.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xo(e, t, n, r);
		let n = e._zod.bag;
		e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ ro(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ io(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ io(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ to(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ no(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ no(e, t));
		},
		int(e) {
			return this.check(lc(e));
		},
		safe(e) {
			return this.check(lc(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ ro(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ io(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ to(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ no(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ ao(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ ao(e, t));
		},
		finite() {
			return this;
		}
	}), rl = /*@__PURE__*/ b("ZodNumberFormat", (e, t) => {
		wi.init(e, t), nl.init(e, t);
	}), il = /*@__PURE__*/ b("ZodBoolean", (e, t) => {
		Ti.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zo(e, t, n, r);
	}), al = /*@__PURE__*/ b("ZodUnknown", (e, t) => {
		Ei.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => as(e, t, n, r);
	}), ol = /*@__PURE__*/ b("ZodNever", (e, t) => {
		Di.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => rs(e, t, n, r);
	}), sl = /*@__PURE__*/ b("ZodArray", (e, t) => {
		ac(), Oi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => vs(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ so(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ so(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ oo(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ co(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), cl = /*@__PURE__*/ b("ZodObject", (e, t) => {
		ac(), Mi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ys(e, t, n, r), bt(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return M(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: uc()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: uc()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: dc()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return et(this, e);
		},
		safeExtend(e) {
			return tt(this, e);
		},
		merge(e) {
			return nt(this, e);
		},
		pick(e) {
			return Qe(this, e);
		},
		omit(e) {
			return $e(this, e);
		},
		partial(...e) {
			return rt(_l, this, e[0]);
		},
		exactPartial(...e) {
			return rt(vl, this, e[0], "exactPartial");
		},
		required(...e) {
			return it(Sl, this, e[0]);
		}
	}), ll = /*@__PURE__*/ b("ZodUnion", (e, t) => {
		Ni.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => bs(e, t, n, r), e.options = t.options;
	}), ul = /*@__PURE__*/ b("ZodDiscriminatedUnion", (e, t) => {
		ll.init(e, t), Pi.init(e, t);
	}), dl = /*@__PURE__*/ b("ZodIntersection", (e, t) => {
		Fi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => xs(e, t, n, r);
	}), fl = /*@__PURE__*/ b("ZodTuple", (e, t) => {
		ac(), Ii.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ss(e, t, n, r);
	}, {
		rest(e) {
			return this.clone({
				...this._zod.def,
				rest: e
			});
		},
		partial() {
			let e = this._zod.def;
			if (e.checks?.length) throw Error(".partial() cannot be used on tuple schemas containing refinements");
			return this.clone({
				...e,
				items: e.items.map((e) => new _l({
					type: "optional",
					innerType: e
				}))
			});
		}
	}), pl = /*@__PURE__*/ b("ZodRecord", (e, t) => {
		ac(), Li.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ws(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
	}), ml = /*@__PURE__*/ b("ZodEnum", (e, t) => {
		Ri.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ss(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new ml({
				...t,
				checks: [],
				...v(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new ml({
				...t,
				checks: [],
				...v(r),
				entries: i
			});
		};
	}), hl = /*@__PURE__*/ b("ZodLiteral", (e, t) => {
		zi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => cs(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
			if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return t.values[0];
		} });
	}), gl = /*@__PURE__*/ b("ZodTransform", (e, t) => {
		ac(), Bi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => hs(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new zt(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(mt(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(mt(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), _l = /*@__PURE__*/ b("ZodOptional", (e, t) => {
		Vi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ps(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), vl = /*@__PURE__*/ b("ZodExactOptional", (e, t) => {
		Hi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ps(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), yl = /*@__PURE__*/ b("ZodNullable", (e, t) => {
		Ui.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ts(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), bl = /*@__PURE__*/ b("ZodDefault", (e, t) => {
		Wi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Os(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), xl = /*@__PURE__*/ b("ZodPrefault", (e, t) => {
		Gi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ks(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Sl = /*@__PURE__*/ b("ZodNonOptional", (e, t) => {
		Ki.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Es(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Cl = /*@__PURE__*/ b("ZodCatch", (e, t) => {
		qi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => As(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), wl = /*@__PURE__*/ b("ZodPipe", (e, t) => {
		Ji.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => js(e, t, n, r), e.in = t.in, e.out = t.out;
	}), Tl = /*@__PURE__*/ b("ZodCodec", (e, t) => {
		wl.init(e, t), Yi.init(e, t);
	}), El = /*@__PURE__*/ b("ZodReadonly", (e, t) => {
		Xi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ms(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Dl = /*@__PURE__*/ b("ZodLazy", (e, t) => {
		Zi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fs(e, t, n, r), e.unwrap = () => e._zod.def.getter();
	}), Ol = /*@__PURE__*/ b("ZodCustom", (e, t) => {
		Qi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ps(e, t, n, r);
	}), kl = (...e) => /* @__PURE__ */ Eo({
		Codec: Tl,
		Boolean: il,
		String: Mc
	}, ...e);
})), jl = g((() => {
	Rs();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/iso.js
function Ml(e) {
	return /* @__PURE__ */ Ga(Nc, e);
}
var Nl = g((() => {
	Rs(), Al();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/coerce.js
function I(e) {
	return /* @__PURE__ */ Xa(nl, e);
}
var Pl = g((() => {
	Rs(), Al();
})), Fl = g((() => {
	Rs(), Al(), zs(), Ws(), rc(), jl(), Ls(), ba(), Mt(), zs(), Nl(), Al(), $i(), ha(), Pl();
})), L = g((() => {
	Fl(), Fl();
})), Il, Ll, Rl, zl, Bl, Vl, Hl, Ul = g((() => {
	L(), Il = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { route: t } = e["~orpc"];
		if (t?.method !== void 0 && t.path !== void 0) return {
			method: t.method,
			path: t.path
		};
	}, Ll = (e) => {
		let t = [];
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			let r = Il(i);
			r !== void 0 && t.push({
				name: `${n}.${e}`,
				method: r.method,
				path: r.path
			});
		}
		return t.toSorted((e, t) => e.name.localeCompare(t.name));
	}, Rl = /* @__PURE__ */ new Set([
		"required",
		"enum",
		"anyOf",
		"oneOf",
		"allOf"
	]), zl = (e, t) => {
		if (Array.isArray(e)) {
			let n = e.map((e) => zl(e));
			return t !== void 0 && Rl.has(t) ? n.toSorted((e, t) => JSON.stringify(e).localeCompare(JSON.stringify(t))) : n;
		}
		return typeof e != "object" || !e ? e : Object.entries(e).toSorted(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, zl(t, e)]);
	}, Bl = (e) => {
		let t = JSON.stringify(zl(e)), n = 2166136261;
		for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619) >>> 0;
		return n.toString(36);
	}, Vl = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { inputSchema: t, outputSchema: n } = e["~orpc"];
		try {
			return Bl({
				in: t === void 0 ? void 0 : qo(t, { io: "input" }),
				out: n === void 0 ? void 0 : qo(n, { io: "output" })
			});
		} catch {
			return;
		}
	}, Hl = (e) => {
		let t = {};
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			if (Il(i) === void 0) continue;
			let r = Vl(i);
			r !== void 0 && (t[`${n}.${e}`] = r);
		}
		return t;
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+shared@1.14.13/node_modules/@orpc/shared/dist/index.mjs
function Wl(e) {
	return e[0] ?? {};
}
function Gl(e) {
	let t = Promise.resolve();
	return (...n) => t = t.catch(() => {}).then(() => e(...n));
}
function Kl(e) {
	return !e || typeof e != "object" ? !1 : "next" in e && typeof e.next == "function" && Symbol.asyncIterator in e && typeof e[Symbol.asyncIterator] == "function";
}
function ql(e) {
	return Jl(e) ? Object.getPrototypeOf(e)?.constructor : null;
}
function Jl(e) {
	return !!e && (typeof e == "object" || typeof e == "function");
}
var Yl, Xl, Zl, Ql, $l = g((() => {
	Yl = "@orpc/shared", Xl = "1.14.13", `${Yl}${Xl}`, Zl = Symbol.asyncDispose ?? Symbol.for("asyncDispose"), Ql = class {
		#e = !1;
		#t = !1;
		#n;
		#r;
		constructor(e, t) {
			this.#n = t, this.#r = Gl(async () => {
				if (this.#e) return {
					done: !0,
					value: void 0
				};
				try {
					let t = await e();
					return t.done && (this.#e = !0), t;
				} catch (e) {
					throw this.#e = !0, e;
				} finally {
					this.#e && !this.#t && (this.#t = !0, await this.#n("next"));
				}
			});
		}
		next() {
			return this.#r();
		}
		async return(e) {
			return this.#e = !0, this.#t || (this.#t = !0, await this.#n("return")), {
				done: !0,
				value: e
			};
		}
		async throw(e) {
			throw this.#e = !0, this.#t || (this.#t = !0, await this.#n("throw")), e;
		}
		async [Zl]() {
			this.#e = !0, this.#t || (this.#t = !0, await this.#n("dispose"));
		}
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.DexhfmWd.mjs
function eu(e, t) {
	return t ?? au[e]?.status ?? 500;
}
function tu(e, t) {
	return t || au[e]?.message || e;
}
function nu(e) {
	return e < 200 || e >= 400;
}
var ru, iu, au, ou, su, cu = g((() => {
	$l(), ru = "@orpc/client", iu = "1.14.13", au = {
		BAD_REQUEST: {
			status: 400,
			message: "Bad Request"
		},
		UNAUTHORIZED: {
			status: 401,
			message: "Unauthorized"
		},
		FORBIDDEN: {
			status: 403,
			message: "Forbidden"
		},
		NOT_FOUND: {
			status: 404,
			message: "Not Found"
		},
		METHOD_NOT_SUPPORTED: {
			status: 405,
			message: "Method Not Supported"
		},
		NOT_ACCEPTABLE: {
			status: 406,
			message: "Not Acceptable"
		},
		TIMEOUT: {
			status: 408,
			message: "Request Timeout"
		},
		CONFLICT: {
			status: 409,
			message: "Conflict"
		},
		PRECONDITION_FAILED: {
			status: 412,
			message: "Precondition Failed"
		},
		PAYLOAD_TOO_LARGE: {
			status: 413,
			message: "Payload Too Large"
		},
		UNSUPPORTED_MEDIA_TYPE: {
			status: 415,
			message: "Unsupported Media Type"
		},
		UNPROCESSABLE_CONTENT: {
			status: 422,
			message: "Unprocessable Content"
		},
		TOO_MANY_REQUESTS: {
			status: 429,
			message: "Too Many Requests"
		},
		CLIENT_CLOSED_REQUEST: {
			status: 499,
			message: "Client Closed Request"
		},
		INTERNAL_SERVER_ERROR: {
			status: 500,
			message: "Internal Server Error"
		},
		NOT_IMPLEMENTED: {
			status: 501,
			message: "Not Implemented"
		},
		BAD_GATEWAY: {
			status: 502,
			message: "Bad Gateway"
		},
		SERVICE_UNAVAILABLE: {
			status: 503,
			message: "Service Unavailable"
		},
		GATEWAY_TIMEOUT: {
			status: 504,
			message: "Gateway Timeout"
		}
	}, su = class e extends Error {
		defined;
		code;
		status;
		data;
		static {
			let t = Symbol.for(`__${ru}@${iu}/error/ORPC_ERROR_CONSTRUCTORS__`);
			globalThis[t] ??= /* @__PURE__ */ new WeakSet(), ou = globalThis[t], ou.add(e);
		}
		constructor(e, ...t) {
			let n = Wl(t);
			if (n.status !== void 0 && !nu(n.status)) throw Error("[ORPCError] Invalid error status code.");
			let r = tu(e, n.message);
			super(r, n), this.code = e, this.status = eu(e, n.status), this.defined = n.defined ?? !1, this.data = n.data;
		}
		toJSON() {
			return {
				defined: this.defined,
				code: this.code,
				status: this.status,
				message: this.message,
				data: this.data
			};
		}
		static [Symbol.hasInstance](e) {
			if (ou.has(this)) {
				let t = ql(e);
				if (t && ou.has(t)) return !0;
			}
			return super[Symbol.hasInstance](e);
		}
	};
}));
function lu(e) {
	return gu.test(e);
}
function uu(e) {
	if (lu(e)) throw new hu("Event's id must not contain a carriage return or newline character");
}
function du(e) {
	if (!Number.isInteger(e) || e < 0) throw new hu("Event's retry must be a integer and >= 0");
}
function fu(e) {
	if (lu(e)) throw new hu("Event's comment must not contain a carriage return or newline character");
}
function pu(e, t) {
	if (t.id === void 0 && t.retry === void 0 && !t.comments?.length) return e;
	if (t.id !== void 0 && uu(t.id), t.retry !== void 0 && du(t.retry), t.comments !== void 0) for (let e of t.comments) fu(e);
	return new Proxy(e, { get(e, n, r) {
		return n === _u ? t : Reflect.get(e, n, r);
	} });
}
function mu(e) {
	return Jl(e) ? Reflect.get(e, _u) : void 0;
}
var hu, gu, _u, vu = g((() => {
	$l(), hu = class extends TypeError {}, TransformStream, gu = /\r\n|[\n\r]/, _u = Symbol("ORPC_EVENT_SOURCE_META");
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.BLtwTQUg.mjs
function yu(e, t) {
	let n = async (e) => {
		let n = await t.error(e);
		if (n !== e) {
			let t = mu(e);
			t && Jl(n) && (n = pu(n, t));
		}
		return n;
	};
	return new Ql(async () => {
		let { done: r, value: i } = await (async () => {
			try {
				return await e.next();
			} catch (e) {
				throw await n(e);
			}
		})(), a = await t.value(i, r);
		if (a !== i) {
			let e = mu(i);
			e && Jl(a) && (a = pu(a, e));
		}
		return {
			done: r,
			value: a
		};
	}, async () => {
		try {
			await e.return?.();
		} catch (e) {
			throw await n(e);
		}
	});
}
var bu = g((() => {
	$l(), vu();
})), xu = g((() => {
	$l(), cu(), bu(), vu();
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/shared/contract.D_dZrO__.mjs
function Su(e, t) {
	return {
		...e,
		...t
	};
}
function Cu(e) {
	return e instanceof Tu || (typeof e == "object" || typeof e == "function") && e !== null && "~orpc" in e && typeof e["~orpc"] == "object" && e["~orpc"] !== null && "errorMap" in e["~orpc"] && "route" in e["~orpc"] && "meta" in e["~orpc"];
}
var wu, Tu, Eu = g((() => {
	xu(), wu = class extends Error {
		issues;
		data;
		constructor(e) {
			super(e.message, e), this.issues = e.issues, this.data = e.data;
		}
	}, Tu = class {
		"~orpc";
		constructor(e) {
			if (e.route?.successStatus && nu(e.route.successStatus)) throw Error("[ContractProcedure] Invalid successStatus.");
			if (Object.values(e.errorMap).some((e) => e && e.status && !nu(e.status))) throw Error("[ContractProcedure] Invalid error status code.");
			this["~orpc"] = e;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/index.mjs
function Du(e, t) {
	return {
		...e,
		...t
	};
}
function Ou(e, t) {
	return {
		...e,
		...t
	};
}
function ku(e, t) {
	return e.path ? {
		...e,
		path: `${t}${e.path}`
	} : e;
}
function Au(e, t) {
	return {
		...e,
		tags: [...t, ...e.tags ?? []]
	};
}
function ju(e, t) {
	return e ? `${e}${t}` : t;
}
function Mu(e, t) {
	return e ? [...e, ...t] : t;
}
function Nu(e, t) {
	let n = e;
	return t.prefix && (n = ku(n, t.prefix)), t.tags?.length && (n = Au(n, t.tags)), n;
}
function Pu(e, t) {
	if (Cu(e)) return new Tu({
		...e["~orpc"],
		errorMap: Su(t.errorMap, e["~orpc"].errorMap),
		route: Nu(e["~orpc"].route, t)
	});
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) n[r] = Pu(e[r], t);
	return n;
}
function Fu(e, t) {
	return { "~standard": {
		[Lu]: {
			yields: e,
			returns: t
		},
		vendor: "orpc",
		version: 1,
		validate(n) {
			return Kl(n) ? { value: yu(n, {
				async value(n, r) {
					let i = r ? t : e;
					if (!i) return n;
					let a = await i["~standard"].validate(n);
					if (a.issues) throw new su("EVENT_ITERATOR_VALIDATION_FAILED", {
						message: "Event iterator validation failed",
						cause: new wu({
							issues: a.issues,
							message: "Event iterator validation failed",
							data: n
						})
					});
					return a.value;
				},
				error: async (e) => e
			}) } : { issues: [{
				message: "Expect event iterator",
				path: []
			}] };
		}
	} };
}
var Iu, R, Lu, z = g((() => {
	Eu(), $l(), xu(), Iu = class e extends Tu {
		constructor(e) {
			super(e), this["~orpc"].prefix = e.prefix, this["~orpc"].tags = e.tags;
		}
		$meta(t) {
			return new e({
				...this["~orpc"],
				meta: t
			});
		}
		$route(t) {
			return new e({
				...this["~orpc"],
				route: t
			});
		}
		$input(t) {
			return new e({
				...this["~orpc"],
				inputSchema: t
			});
		}
		errors(t) {
			return new e({
				...this["~orpc"],
				errorMap: Su(this["~orpc"].errorMap, t)
			});
		}
		meta(t) {
			return new e({
				...this["~orpc"],
				meta: Du(this["~orpc"].meta, t)
			});
		}
		route(t) {
			return new e({
				...this["~orpc"],
				route: Ou(this["~orpc"].route, t)
			});
		}
		input(t) {
			return new e({
				...this["~orpc"],
				inputSchema: t
			});
		}
		output(t) {
			return new e({
				...this["~orpc"],
				outputSchema: t
			});
		}
		prefix(t) {
			return new e({
				...this["~orpc"],
				prefix: ju(this["~orpc"].prefix, t)
			});
		}
		tag(...t) {
			return new e({
				...this["~orpc"],
				tags: Mu(this["~orpc"].tags, t)
			});
		}
		router(e) {
			return Pu(e, this["~orpc"]);
		}
	}, R = new Iu({
		errorMap: {},
		route: {},
		meta: {}
	}), Lu = Symbol("ORPC_EVENT_ITERATOR_DETAILS");
})), Ru, zu = g((() => {
	Ru = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
})), Bu, Vu, Hu, Uu, Wu = g((() => {
	L(), M(["helper", "run"]), Bu = [
		{
			id: "commit-message",
			label: "Commit messages",
			blurb: "The subject written when an agent's work lands, and the release note under it.",
			kind: "helper",
			icon: "file-edit"
		},
		{
			id: "session-title",
			label: "Session titles",
			blurb: "The name a conversation wears on the board, written a second into its first turn.",
			kind: "helper",
			icon: "pencil"
		},
		{
			id: "safety-judge",
			label: "Safety judge",
			blurb: "Which model reads your safety policy before a flagged command runs.",
			kind: "helper",
			icon: "shield"
		},
		{
			id: "loop-verdict",
			label: "Loop verdicts",
			blurb: "Whether a loop's iteration met the goal, or the loop goes round again.",
			kind: "helper",
			icon: "check-square"
		},
		{
			id: "persona-router",
			label: "Persona routing",
			blurb: "Which model reads a new chat's first message and picks the persona for it.",
			kind: "helper",
			icon: "users"
		},
		{
			id: "pipeline-fix",
			label: "Pipeline fixes",
			blurb: "The agent started by Fix on a red pipeline.",
			kind: "run",
			trigger: "pressed",
			icon: "wave-pulse"
		},
		{
			id: "deployment-fix",
			label: "Deployment fixes",
			blurb: "The agent started by Fix on a deployment that is down.",
			kind: "run",
			trigger: "pressed",
			icon: "server"
		},
		{
			id: "maintenance-chore",
			label: "Maintenance chores",
			blurb: "A chore run started from the Maintenance board.",
			kind: "run",
			trigger: "pressed",
			icon: "wrench"
		},
		{
			id: "documentation-run",
			label: "Documentation runs",
			blurb: "A pass over a repo's own documentation.",
			kind: "run",
			trigger: "pressed",
			icon: "book"
		},
		{
			id: "acceptance-run",
			label: "Acceptance runs",
			blurb: "One session per story in an acceptance fan-out.",
			kind: "run",
			trigger: "pressed",
			icon: "list-check"
		},
		{
			id: "pre-push-fix",
			label: "Pre-push fixes",
			blurb: "The fix proposed when a check fails on the way to a push.",
			kind: "run",
			trigger: "pressed",
			icon: "cloud-upload"
		},
		{
			id: "approval-queue",
			label: "Approvals queue",
			blurb: "The turn that publishes or acts on what you approved.",
			kind: "run",
			trigger: "pressed",
			icon: "check-circle"
		},
		{
			id: "extension-review",
			label: "Extension update reviews",
			blurb: "The agent that reads an extension update before it is applied.",
			kind: "run",
			trigger: "unprompted",
			icon: "box"
		},
		{
			id: "loop-iteration",
			label: "Loop iterations",
			blurb: "Each round of a loop working towards its goal.",
			kind: "run",
			trigger: "unprompted",
			icon: "repeat"
		}
	], Vu = Bu.map((e) => e.id), Hu = M(Vu), Uu = (e) => Bu.filter((t) => e(t)), Uu((e) => e.kind === "helper"), Uu((e) => e.kind === "run" && e.trigger === "pressed"), Uu((e) => e.kind === "run" && e.trigger === "unprompted");
})), Gu, Ku, qu, Ju, Yu, Xu = g((() => {
	Gu = {
		runtime: "claude-code",
		steering: !0,
		permissions: "modes",
		questions: !0,
		mcp: "full",
		execution: ["shell", "js"],
		effort: !0,
		fastMode: !0,
		isolation: "namespace",
		commands: !0,
		terminals: !0,
		recovery: !0,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "hooks",
		secrets: "masked"
	}, Ku = {
		runtime: "codex",
		steering: !0,
		permissions: "plan",
		questions: !0,
		mcp: "browser",
		execution: ["shell"],
		effort: !0,
		fastMode: !1,
		isolation: "namespace",
		commands: !0,
		terminals: !1,
		recovery: !1,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "approval",
		secrets: "none"
	}, qu = {
		runtime: "opencode",
		steering: !1,
		permissions: "plan",
		questions: !1,
		mcp: "none",
		execution: ["shell"],
		effort: !1,
		fastMode: !1,
		isolation: "cwd",
		commands: !1,
		terminals: !1,
		recovery: !1,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "refuse-only",
		secrets: "none"
	}, Ju = {
		...qu,
		runtime: "opencode-gemini"
	}, Yu = {
		runtime: "cursor",
		steering: !1,
		permissions: "plan",
		questions: !0,
		mcp: "tools",
		execution: ["shell"],
		effort: !0,
		fastMode: !1,
		isolation: "cwd",
		commands: !1,
		terminals: !1,
		recovery: !0,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "hooks",
		secrets: "none"
	};
})), Zu, Qu, $u, ed = g((() => {
	Xu(), Zu = [
		{
			id: "claude",
			label: "Claude Code",
			vendor: "Claude",
			accountLabel: "Claude",
			destination: "Anthropic",
			brand: "claude",
			access: {
				kind: "subscription",
				requirement: "Claude subscription",
				runs: "Claude Code"
			},
			auth: { kind: "oauth" },
			planLimits: !0,
			runtimes: {
				native: Gu,
				claudeCode: Gu
			}
		},
		{
			id: "codex",
			label: "Codex",
			vendor: "ChatGPT",
			accountLabel: "ChatGPT",
			destination: "ChatGPT",
			brand: "codex",
			access: {
				kind: "subscription",
				requirement: "ChatGPT subscription",
				runs: "Codex"
			},
			auth: {
				kind: "translator",
				cliProxy: "codex"
			},
			planLimits: !0,
			runtimes: {
				native: Ku,
				claudeCode: Gu
			}
		},
		{
			id: "grok",
			label: "Grok",
			vendor: "xAI",
			accountLabel: "Grok",
			destination: "x.ai",
			brand: "grok",
			access: {
				kind: "subscription",
				requirement: "SuperGrok subscription",
				runs: "Grok"
			},
			auth: {
				kind: "translator",
				cliProxy: "xai"
			},
			planLimits: !1,
			runtimes: {
				native: qu,
				claudeCode: Gu
			}
		},
		{
			id: "kimi",
			label: "Kimi Code",
			vendor: "Kimi Code",
			accountLabel: "Kimi Code",
			destination: "Kimi Code",
			brand: "kimi",
			access: {
				kind: "subscription",
				requirement: "Kimi Code subscription",
				runs: "Kimi Code"
			},
			auth: {
				kind: "translator",
				cliProxy: "kimi"
			},
			planLimits: !0,
			runtimes: {
				native: Gu,
				claudeCode: Gu
			}
		},
		{
			id: "gemini",
			label: "Google",
			vendor: "Google",
			accountLabel: "Google",
			destination: "Google",
			brand: "gemini",
			access: {
				kind: "free",
				requirement: "Google sign-in",
				runs: "Gemini, Claude and GPT-OSS under Claude Code"
			},
			auth: {
				kind: "translator",
				cliProxy: "antigravity"
			},
			planLimits: !0,
			runtimes: {
				native: Ju,
				claudeCode: Ju
			}
		},
		{
			id: "cursor",
			label: "Cursor",
			vendor: "Cursor",
			accountLabel: "Cursor",
			destination: "Cursor",
			brand: "cursor",
			access: {
				kind: "subscription",
				requirement: "Cursor Pro subscription",
				runs: "Cursor Agent"
			},
			auth: { kind: "oauth" },
			planLimits: !1,
			runtimes: {
				native: Yu,
				claudeCode: Yu
			}
		},
		{
			id: "meta",
			label: "Meta",
			vendor: "Meta",
			accountLabel: "Meta",
			destination: "Meta",
			brand: "meta",
			access: {
				kind: "subscription",
				requirement: "Muse Code subscription",
				runs: "Muse Spark under Claude Code"
			},
			auth: {
				kind: "minted",
				variants: [{
					id: "meta",
					label: "Meta",
					flow: "device",
					anthropicBase: "https://api.meta.ai",
					catalogBase: "https://api.meta.ai/v1"
				}]
			},
			planLimits: !1,
			runtimes: {
				native: Gu,
				claudeCode: Gu
			}
		},
		{
			id: "zai",
			label: "Z.ai",
			vendor: "Z.ai",
			accountLabel: "Z.ai",
			destination: "Z.ai",
			brand: "zai",
			access: {
				kind: "subscription",
				requirement: "Z.ai GLM Coding Plan",
				runs: "GLM under Claude Code"
			},
			auth: {
				kind: "minted",
				variants: [{
					id: "zai",
					label: "Z.ai international",
					flow: "device",
					anthropicBase: "https://api.z.ai/api/anthropic",
					catalogBase: "https://api.z.ai/api/coding/paas/v4"
				}, {
					id: "bigmodel",
					label: "BigModel (中国大陆)",
					flow: "redirect",
					anthropicBase: "https://open.bigmodel.cn/api/anthropic",
					catalogBase: "https://open.bigmodel.cn/api/coding/paas/v4"
				}]
			},
			planLimits: !1,
			runtimes: {
				native: Gu,
				claudeCode: Gu
			}
		}
	], Qu = Zu.map((e) => e.id), new Map(Zu.map((e) => [e.id, e])), $u = Zu.filter((e) => e.auth.kind === "translator").map((e) => e.id), Zu.filter((e) => e.auth.kind === "minted").map((e) => e.id);
})), td, nd = g((() => {
	L(), td = k({
		subject: T(),
		detail: T()
	});
})), rd, id, ad, od, sd, cd, ld = g((() => {
	L(), nd(), k({
		type: N("runner-hello"),
		token: T(),
		version: T(),
		image: T(),
		channel: T().optional(),
		overlayHash: T().optional(),
		definitionToml: T().optional()
	}), k({
		agent: T().optional(),
		account: T().optional(),
		model: T().optional()
	}), mc([
		k({
			ok: N(!0),
			kind: N("oauth"),
			accessToken: T(),
			account: T().optional()
		}),
		k({
			ok: N(!0),
			kind: N("parent-translator"),
			model: T(),
			trial: D().optional()
		}),
		k({
			ok: N(!0),
			kind: N("endpoint"),
			baseUrl: T(),
			authToken: T(),
			model: T(),
			trial: D().optional()
		}),
		k({
			ok: N(!1),
			code: M([
				"subscription-required",
				"claude-reauth",
				"trial-unavailable"
			]).optional(),
			message: T()
		})
	]), k({
		account: T().min(1),
		rejected: T().min(1)
	}), k({ accessToken: T().optional() }), rd = k({
		cpus: E().int().positive(),
		memoryMb: E().int().positive(),
		freeDiskMb: E().int().nonnegative(),
		load: E().nonnegative()
	}), id = M([
		"current",
		"outdated",
		"unknown"
	]), k({
		id: T(),
		host: T().optional(),
		online: D(),
		version: T().optional(),
		image: T().optional(),
		channel: T().optional(),
		overlayHash: T().optional(),
		facts: rd.optional(),
		lastSeen: E().optional(),
		parity: id,
		drift: O(td).optional()
	}), ad = k({
		op: M(["pull", "push"]),
		conversationId: T().min(1),
		branch: T().min(1),
		repos: O(k({
			repo: T().min(1),
			dir: T(),
			mainBranch: T().min(1)
		}))
	}), od = mc([k({
		kind: N("line"),
		text: T()
	}), k({
		kind: N("done"),
		ok: D(),
		detail: T().optional()
	})]), sd = k({
		conversationId: T().min(1),
		branch: T().min(1),
		prompt: T(),
		provider: T(),
		harness: T(),
		model: T().optional(),
		effort: T().optional(),
		thinking: D().optional(),
		fast: D().optional(),
		account: T().optional(),
		sessionId: T().optional(),
		attachments: O(k({
			path: T().min(1),
			bytesBase64: T()
		})).optional()
	}), cd = mc([k({ kind: N("local") }), k({
		kind: N("runner"),
		id: T().min(1)
	})]);
})), B, ud, dd, fd = g((() => {
	L(), B = T().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/), ud = T().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]*$/).max(200), dd = M(["on", "off"]).default("off");
})), pd, md, hd, gd, _d, vd, yd, bd, xd, Sd, Cd, wd, Td, Ed, Dd, Od, kd, Ad, jd, V = g((() => {
	L(), zu(), Wu(), ed(), ld(), fd(), pd = T().min(1), md = k({ provider: M(Qu) }), hd = M(["native", "claude-code"]), gd = k({
		repo: T(),
		base: T().min(1)
	}), _d = k({
		file: T().min(1).describe("The file open in the editor, as a workspace path."),
		startLine: E().int().min(1).optional().describe("First line of the selection, counting from one. Leave both out when the whole file is the context."),
		endLine: E().int().min(1).optional().describe("Last line of the selection, counting from one."),
		selection: T().max(2e4).optional().describe("The selected text itself. Cut it down before sending if it is long: this is context, not an upload.")
	}), vd = T().regex(Ru), yd = k({
		automationId: T(),
		provider: T(),
		channelId: T().optional(),
		author: T().optional()
	}), M([
		"schedule",
		"event",
		"listener",
		"webchat",
		"issues",
		"workspace",
		"workflow"
	]), bd = M([
		"allow",
		"hold",
		"deny"
	]), xd = M(["sandbox", "device"]), Sd = M([
		"git.destructive",
		"files.destructive",
		"system.destructive",
		"container.state",
		"secrets.access",
		"package.publish",
		"network.outbound"
	]), Cd = k({
		schedule: bd.default("allow"),
		event: bd.default("allow"),
		listener: bd.default("allow"),
		webchat: bd.default("allow"),
		issues: bd.default("hold"),
		workspace: bd.default("allow"),
		workflow: M(["allow", "deny"]).default("allow")
	}), wd = M([
		"default",
		"plan",
		"bypassPermissions"
	]), Td = k({
		conversationId: vd,
		index: E().int().nonnegative(),
		files: M(["then", "now"])
	}), Ed = k({
		prompt: T().describe("What to say to the agent. May be empty if you are only attaching files."),
		title: T().max(80).optional().describe("A title for a conversation this turn is opening. Ignored for a conversation that already has one."),
		attachments: O(T().min(1)).max(20).optional().describe("Files to hand the agent along with the prompt, as workspace paths. Upload them first."),
		agent: pd.optional().describe("Which model provider serves this turn. Leave it out for Claude."),
		harness: hd.optional().describe("Which agentic loop runs the turn. Leave it out to use each provider's own."),
		account: T().optional().describe("Which of that provider's connected accounts pays for the turn. Leave it out for the first one."),
		actsAs: B.optional().describe("Which persona the turn speaks as out in the world. Not the same as which account pays for it."),
		sessionId: T().optional().describe("Resume this provider session instead of starting a fresh one."),
		conversationId: vd.optional().describe("The conversation this turn belongs to. You choose it, it survives model switches, and it is how you address the conversation later. Naming one that does not exist opens it."),
		isolated: D().optional().describe("Work in this conversation's own private copy of the repos rather than the shared tree, so several agents can work at once. Needs a conversation id."),
		startIn: T().max(200).optional().describe("Which folder the conversation opens in, relative to the workspace root; the project it belongs to. Decided on the first turn. A persona that names its own start folder wins."),
		placement: cd.optional().describe("Where this conversation runs: this sandbox (leave it out), or a paired runner by id. Decided on the first turn; later turns follow the conversation."),
		worktreeBase: O(gd).min(1).max(50).optional().describe("Pin a new private copy to these exact commits instead of today's workspace. Used when several agents must start from identical files."),
		autoLand: D().optional().describe("Whether this turn's work merges into the workspace when it finishes. Overrides the conversation's own setting for this turn only."),
		runRole: Hu.optional().describe("What started this turn, when it was not a person typing: which of the sandbox's per-job model lists answers for it. Only used when the turn names no model of its own."),
		origin: yd.optional().describe("Set by the sandbox alone: this turn opened a conversation on behalf of a message from outside rather than a person."),
		forkOf: k({
			conversationId: vd.describe("The conversation this one was cut from."),
			keep: E().int().nonnegative().describe("How many of that conversation's messages to copy in before this turn runs."),
			files: M(["then", "now"]).describe("Which files the fork opens on: \"now\" is the workspace as it stands, \"then\" is the files as they were at the cut, which needs a private copy.")
		}).optional().describe("Where this conversation was cut from, on its first turn only. Only the client knows this, so only the client can say it."),
		model: T().optional().describe("Which model to use. Leave it out for the provider's default."),
		unattended: D().optional().describe("Nobody chose a model for this turn because a screen started it rather than a person. The sandbox then fills in the model its owner picked for unwatched work."),
		outsideWake: T().min(1).optional().describe("Content from outside caused this turn, and what to call the source. It is what makes the sandbox treat the turn as carrying somebody else's words."),
		permissionMode: wd.optional().describe("How tool calls are gated: ask before each tool, propose a plan first, or run everything. The agent can move itself between these mid-turn."),
		allowedTools: O(T().min(1)).optional().describe("Narrow the turn to these tools. Leave it out for everything the runtime has. For a turn driven by an outside message this list is the real boundary, because prompt wording is only advice."),
		effort: T().optional().describe("How hard the model should think, where the provider offers a choice."),
		thinking: D().optional().describe("Whether to show the model's reasoning as it works."),
		fast: D().optional().describe("Ask for the same work at a higher rate for a higher price. A request rather than a promise: the answer says what actually happened."),
		tierHold: D().optional().describe("Run exactly the model that was picked, even when the turn looks simple enough for a cheaper one. The judgement is still recorded; nothing is substituted."),
		editorContext: _d.optional().describe("What the user has open in their editor, folded into the prompt so that pointing words like \"this\" resolve.")
	}).refine((e) => e.prompt.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "prompt or attachments required" }).refine((e) => e.isolated !== !0 || e.conversationId !== void 0, { message: "isolated requires conversationId" }).refine((e) => e.worktreeBase === void 0 || e.isolated === !0 && e.conversationId !== void 0, { message: "worktreeBase requires an isolated conversationId" }).refine((e) => e.origin === void 0 || e.conversationId !== void 0, { message: "origin requires conversationId" }).refine((e) => e.forkOf === void 0 || e.conversationId !== void 0, { message: "forkOf requires conversationId" }).refine((e) => e.forkOf?.files !== "then" || e.isolated === !0, { message: "forkOf.files \"then\" requires isolated" }), Dd = k({
		agent: T().min(1).describe("Which provider."),
		model: T().min(1).describe("Which of its models. Both or neither, because a model name only means anything to the provider that serves it."),
		account: T().optional().describe("Which connected account of that provider pays, by its daemon-minted id. Leave it out for whichever has headroom."),
		harness: hd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own."),
		effort: T().optional().describe("How hard that model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: D().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: D().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise.")
	}).optional(), Od = (e) => ({
		agent: e.provider,
		model: e.model,
		...e.account === void 0 ? {} : { account: e.account },
		...e.harness === void 0 ? {} : { harness: e.harness },
		...e.effort === void 0 ? {} : { effort: e.effort },
		...e.thinking === void 0 ? {} : { thinking: e.thinking },
		...e.fast === void 0 ? {} : { fast: e.fast }
	}), kd = k({
		provider: pd.describe("Which provider serves this work."),
		model: T().min(1).describe("Which of its models. Both halves, because a model name only means anything to the provider that serves it."),
		effort: T().optional().describe("How hard this model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: D().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: D().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise."),
		harness: hd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own.")
	}), Ad = k({ run: T().describe("The id of the run that just started. Hand it back when you attach, so the stream resumes rather than replaying.") }), jd = k({
		conversationId: vd.describe("Which conversation to watch."),
		run: T().optional().describe("The run you were watching. If a newer turn has started since, the head names that one instead, and its rows are that turn's.")
	});
})), Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd, Ud, Wd, Gd, Kd = g((() => {
	L(), ed(), V(), Md = mc([
		N("all"),
		N("none"),
		k({ models: O(T().min(1)).min(1) })
	]), Nd = k({
		kind: T(),
		label: T().optional(),
		utilization: E(),
		resetsAt: E().optional(),
		gates: Md
	}), Pd = k({
		windows: O(Nd),
		measuredAt: E()
	}), Fd = k({
		available: D().describe("Whether the provider will reopen this account's session window right now. The only thing a button may be drawn from."),
		reason: T().optional().describe("Why not, in the provider's own word, when it gave one. Absent when it is available, or when the provider said nothing."),
		nextAvailableAt: E().optional().describe("When the next reset may be claimed, in epoch seconds, where the provider publishes it. Absent means unknown, never 'now'."),
		weeklyResetsAt: E().optional().describe("When the weekly allowance itself reopens, in epoch seconds, where the provider publishes it.")
	}), Id = k({
		result: M([
			"reset",
			"already_used",
			"not_limited",
			"ineligible",
			"unavailable",
			"error"
		]).describe("What the provider did. Only `reset` reopened the window; every other value means nothing changed."),
		nextAvailableAt: E().optional().describe("When another reset may be claimed, in epoch seconds, where the provider published it."),
		detail: T().optional().describe("What went wrong, in words, for the two outcomes that are this sandbox's fault rather than the plan's.")
	}), Ld = k({
		at: E().describe("When it refused, in milliseconds."),
		kind: M([
			"limit",
			"auth",
			"entitlement"
		]).describe("Three different noes, kept apart because what fixes each is different. A spent allowance is answered by waiting; a refused credential by signing in again; and an entitlement refusal, where somebody has switched this off for your seat, by neither of those. That last one authenticates fine and reports healthy limits the whole time it refuses everything."),
		message: T().describe("The provider's own words, verbatim. The only part that says which limit or which credential."),
		account: T().optional().describe("Which account was serving, where that is known."),
		model: T().optional().describe("Which model the refused turn was on, where that is known.")
	}), Rd = k({ refusals: j(T(), Ld).describe("The most recent refusal per provider. Read alongside an account's usage: that says how full it was when last checked, this says whether it has since started saying no.") }), zd = k({
		name: T(),
		label: T(),
		usage: Pd.optional(),
		cooling: k({
			until: E().optional(),
			reason: T().optional()
		}).optional()
	}), Bd = k(Object.fromEntries($u.map((e) => [e, O(zd)]))), Vd = A("kind", [
		k({
			kind: N("plan").describe("Answering a plan the agent proposed."),
			requestId: T().min(1).describe("Which card you are answering, from the frame that raised it."),
			approve: D().describe("Whether to go ahead. Approving means the plan then runs without a prompt per tool, because being asked whether a plan you just approved may run its first command is not a question worth having."),
			feedback: T().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		k({
			kind: N("question").describe("Answering a question the agent asked."),
			requestId: T().min(1).describe("Which card you are answering."),
			answers: j(T(), O(T())).optional().describe("What you chose, keyed by the question, with the chosen labels or your own words."),
			cancelled: D().optional().describe("Dismissing it instead, which tells the agent to carry on using sensible defaults rather than leaving it waiting.")
		}),
		k({
			kind: N("permission").describe("Answering a request to use a tool."),
			requestId: T().min(1).describe("Which card you are answering."),
			decision: M([
				"once",
				"always",
				"deny"
			]).describe("Once allows this call alone; always allows that whole tool for the rest of the conversation; no blocks it."),
			feedback: T().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		k({
			kind: N("browser_help").describe("Answering a request for help in the agent's browser: a captcha, a password it does not hold, a check on your phone."),
			requestId: T().min(1).describe("Which card you are answering."),
			helped: D().describe("Whether you cleared it. Yes means the turn carries on from the page as you left it; no tells the agent so, and it moves on rather than waiting for ever."),
			note: T().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		k({
			kind: N("terminal_help").describe("Answering a request for help at a terminal: a code to type, a confirmation only a person can give."),
			requestId: T().min(1).describe("Which card you are answering."),
			helped: D().describe("Whether you did it. Yes also hands the agent what the terminal now says, because a person answering a prompt is exactly the moment the agent cannot see."),
			note: T().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		k({
			kind: N("capability_offer").describe("Answering a request to connect something the agent needs."),
			requestId: T().min(1).describe("Which card you are answering."),
			connect: D().describe("Yes keeps the agent waiting while you set it up, and it carries on the moment the connection comes alive. No tells it to continue without. The reply itself connects nothing: setting it up is still your own doing.")
		}),
		k({
			kind: N("payment_offer").describe("Answering a request to pay for something."),
			requestId: T().min(1).describe("Which card you are answering."),
			approve: D().describe("Yes releases exactly one payment. Anything else spends nothing. This click is the only way the money can move.")
		}),
		k({
			kind: N("credential_offer").describe("Releasing a credential the agent may only use once a named person says so."),
			requestId: T().min(1).describe("Which card you are answering."),
			approve: D().describe("Yes releases it, as far as the card says (this one use, or the rest of the conversation). Only the people the card names can answer at all, yes or no.")
		})
	]), Hd = k({
		conversationId: T().min(1).describe("Which running conversation to interrupt."),
		text: T().max(2e4).describe("What to say to it. It arrives mid-turn without stopping the turn."),
		attachments: O(T().min(1)).max(20).optional().describe("Files to send with it, as workspace paths. A screenshot dropped in mid-turn with no words is a legitimate thing to send."),
		editorContext: _d.optional().describe("What you have open, folded in so that pointing words resolve.")
	}).refine((e) => e.text.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "text or attachments required" }), Ud = k({ conversationId: T().min(1).describe("Which conversation's running turn to cancel.") }), Wd = k({
		agent: pd.describe("Which provider serves the re-run."),
		harness: hd.describe("Which agentic loop runs it."),
		account: T().optional().describe("Which of that provider's accounts pays for it. Leave it out for the first one."),
		model: T().optional().describe("Which model. Leave it out to keep the one the refused turn named."),
		carry: D().optional().describe("When the account changes, keep the provider session (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record. Ignored when the provider changes, or when nothing changes.")
	}), Gd = k({
		conversationId: T().min(1).describe("Which conversation's held turn to run again."),
		routing: Wd.optional().describe("Who serves the re-run, when the conversation has been re-pointed since it was refused. Leave it out to run it on whatever the turn carried.")
	});
})), qd, Jd = g((() => {
	L(), ed(), qd = M($u);
})), Yd, Xd, Zd, Qd, $d, ef, tf, nf, rf, af, of, sf, cf, lf, uf, df, ff, pf = g((() => {
	L(), Kd(), Jd(), Yd = k({
		id: T().describe("The account's id, which is what a turn names to spend on it and what disconnecting takes."),
		label: T().describe("What it is called here, which somebody can change."),
		email: T().optional().describe("Who it signs in as, in the provider's own words. Kept beside the label rather than folded into it, so a renamed account can still say whose it is. Absent when the provider says nothing, which is exactly when renaming is the only answer."),
		organization: T().optional().describe("Which organisation it belongs to, where the provider says."),
		scope: T().optional().describe("What the credential is permitted to do, in the provider's terms."),
		connectedAt: E().describe("When it was connected, in milliseconds."),
		needsReauth: D().optional().describe("Its stored credential can no longer be renewed and somebody has to sign in again. Absent means healthy, or not checked yet."),
		detail: T().optional().describe("Why, in words a person can act on."),
		usage: Pd.optional().describe("How full its plan limits were when last measured, so a picker can show what is left before committing work to it. Absent until a reading exists, which reads as unknown rather than as nothing left.")
	}), Xd = k({ accounts: O(Yd).describe("The connected accounts. Tokens never travel in this shape: being in this list is what connected means.") }), Zd = k({ force: kl().default(!1).describe("Measure the plan limits again before answering, rather than serving a recent reading. Slower, and the right thing when somebody has just changed a plan and is asking whether what they can see is still true.") }), Qd = k({ id: T().min(1).describe("Which account.") }), $d = k({
		id: T().min(1).describe("Which account."),
		label: T().max(80).describe("The new name. Blank restores the one derived from the sign-in, rather than leaving a nameless row.")
	}), ef = M([
		"device",
		"redirect",
		"paste"
	]), tf = k({
		url: T().describe("The page to open and sign in on."),
		code: T().describe("The one-time code the page will ask for, where the vendor issues one. Blank when the page is already addressed to this attempt."),
		state: T().describe("For a redirect sign-in, the marker in the address the browser lands on, so a pasted URL can be recognised as this attempt's. Blank otherwise."),
		flow: ef.describe("How this attempt ends. A device sign-in finishes by itself and you watch the account list; a redirect needs the address it landed on handed back; a paste needs the code the page showed."),
		variant: T().describe("Which of the provider's estates this attempt signs in to. Blank for a provider with one."),
		handshake: T().describe("This attempt's id, for finishing or abandoning it. Not a credential and not redeemable: the proof that completes the sign-in never leaves the sandbox."),
		expiresAt: E().describe("When this attempt stops being answerable, in milliseconds, so a card can stop waiting instead of spinning.")
	}), nf = k({ variant: T().min(1).optional().describe("Which estate to sign in to. Absent takes the provider's default.") }), rf = k({
		handshake: T().min(1).describe("Which attempt this belongs to."),
		code: T().optional().describe("The code the sign-in page showed, for a paste sign-in."),
		redirectUrl: T().optional().describe("The address the browser was sent to, whole, for a redirect sign-in. The grant is inside it."),
		label: T().optional().describe("What to call the account. Blank derives one from the sign-in.")
	}), af = k({ account: Yd.optional().describe("The account it connected, where the sign-in ends here. Absent means keep watching the account list.") }), of = k({ handshake: T().min(1).describe("Which attempt to stop waiting on.") }), sf = k({
		url: T().describe("The page to open."),
		code: T().describe("The one-time code, where the provider uses one."),
		state: T().min(1).describe("The handshake's id, which status reads and the finishing call sends back."),
		flow: M(["device", "redirect"]).describe("Which shape this is. A device sign-in finishes by itself and you poll the attempt; a redirect needs the address it landed on handed back. Said outright rather than guessed at from whether a code happens to exist.")
	}), cf = A("status", [
		k({ status: N("wait") }),
		k({ status: N("ok") }),
		k({
			status: N("error"),
			error: T().min(1)
		})
	]), lf = k({
		provider: qd.describe("Which provider."),
		redirectUrl: T().min(1).describe("The address the browser was sent to, whole. The grant is inside it."),
		state: T().min(1).describe("The handshake this belongs to. A mismatch is refused.")
	}), uf = M(["reasoning", "fast"]), df = k({
		id: T().describe("What to name when asking for this model."),
		label: T().describe("What to call it on screen."),
		efforts: O(T()).optional().describe("The thinking levels it accepts, where the provider says. Empty means use your own defaults."),
		description: T().optional().describe("What it is good for, in the provider's own words. Absent where the provider publishes only ids, which is the honest answer rather than something to paper over with a hand-written table."),
		badges: O(uf).optional().describe("What it is known for, where the provider says so."),
		contextWindow: E().optional().describe("How many tokens this model will accept in one request, where the server publishes it.")
	}), ff = k({
		models: O(df).describe("What this provider serves, in its own preference order, which is not rearranged here. Never empty."),
		default: T().describe("Which one a fresh conversation starts on. Always present.")
	});
})), H, mf, hf, U, W = g((() => {
	L(), H = k({ ok: N(!0).describe("Always true. A route that answers this either did the thing or refused with a status; there is no third outcome to report.") }), mf = M([
		"viewer",
		"collaborator",
		"maintainer",
		"owner"
	]), M([
		"viewer",
		"collaborator",
		"maintainer"
	]), hf = k({ token: T().min(1).describe("The freshly minted credential. The previous one stopped working the moment this answered.") }), U = k({ repo: T().describe("Which repository. \"root\" is the workspace itself; anything else is a repository's folder relative to the workspace root, URL-encoded.") });
})), gf, _f = g((() => {
	z(), V(), pf(), W(), gf = {
		start: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/start",
			summary: "Begin connecting an account",
			description: "Hands back the page to sign in on, and the code it will ask for where there is one. The sandbox holds the proof and finishes what it can itself: a device sign-in lands in the account list on its own, a paste or a redirect needs one thing brought back to the finishing call."
		}).input(md.extend(nf.shape)).output(tf),
		complete: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/complete",
			summary: "Finish a sign-in with what the page handed back",
			description: "Takes the code the page showed, or the address a redirect landed on, and finishes the attempt. Answers with the account where the exchange ends here; otherwise the sandbox still has a mint to do and the row appears in the account list."
		}).input(md.extend(rf.shape)).output(af),
		cancel: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/cancel",
			summary: "Abandon a sign-in",
			description: "Stops waiting on a sign-in nobody completed. An abandoned attempt also expires on its own."
		}).input(md.extend(of.shape)).output(H),
		accounts: R.route({
			method: "GET",
			path: "/accounts/{provider}",
			summary: "Connected accounts of a provider",
			description: "Each connected account with how full its plan limits were when last measured, where the provider publishes any. Ask for a fresh measurement and it takes one before answering, which is slower. The credentials themselves never travel: being in this list is what connected means."
		}).input(md.extend(Zd.shape)).output(Xd),
		rename: R.route({
			method: "POST",
			path: "/accounts/{provider}/rename",
			summary: "Rename an account",
			description: "Changes the label one account shows under, so several are tellable apart. Blank restores the one derived from the sign-in."
		}).input(md.extend($d.shape)).output(Yd),
		disconnect: R.route({
			method: "POST",
			path: "/accounts/{provider}/disconnect",
			summary: "Disconnect an account",
			description: "Clears one stored credential, and stops any sign-in still in flight for this provider. The others stay connected."
		}).input(md.extend(Qd.shape)).output(H)
	};
})), vf, yf, bf, xf, Sf, Cf = g((() => {
	L(), V(), vf = k({
		id: T().describe("The entry's own id."),
		at: E().describe("When it happened, in milliseconds. Also what you page by."),
		provider: T().optional().describe("Which outside service, when one was involved. Absent for the sandbox's own events."),
		account: T().optional().describe("Which account handled it. Absent for the sandbox's own events and for work run on a provider's default."),
		direction: M([
			"in",
			"out",
			"system"
		]).describe("Whether something arrived, something went out, or the sandbox did it to itself."),
		type: T().describe("Exactly what happened: a message received or sent, a reaction, a turn starting or ending, a rule doing something. A rule that ran and passed says nothing here, because a feed of green ticks is one the eye learns to skip."),
		channelId: T().optional().describe("Which channel or thread it happened in."),
		author: T().optional().describe("Who sent it, for something that arrived."),
		actor: T().optional().describe("Who asked for the turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent for a wake nothing asked for."),
		content: T().optional().describe("The message, in full, whichever direction it went."),
		method: T().optional().describe("The verb of an outgoing call."),
		endpoint: T().optional().describe("The address of an outgoing call. Credentials travel in headers, so they are never here."),
		sessionId: T().optional().describe("The provider session behind it."),
		turnId: T().optional().describe("Ties one turn's entries together. A turn writes several, and read as separate rows they say one thing several times, so a feed groups on this."),
		conversationId: T().optional().describe("Which conversation. This, rather than the provider session, is what the same agent means across a feed, because a session is retired whenever the model changes."),
		title: T().optional().describe("What that conversation was called at the time. Copied in rather than looked up, because an audit entry must still read as words years later, after the conversation has been renamed or pruned."),
		origin: yd.optional().describe("What woke the conversation from outside, when something did. It is how a turn gets filed under the chat service that caused it rather than under the model that served it."),
		automationIds: O(T()).optional().describe("Which automations were involved."),
		outcome: M(["ok", "error"]).optional().describe("How it ended."),
		error: T().optional().describe("What went wrong, when something did."),
		extra: j(T(), uc()).optional().describe("Whatever else the source had to say: attachments, participants, a recording's path. Shape varies by source.")
	}), yf = k({
		provider: T().optional().describe("Narrow it to one outside service."),
		limit: I().min(1).max(500).default(100).describe("How many entries to return."),
		before: I().optional().describe("Only entries older than this timestamp, so paging walks backwards through the feed.")
	}), bf = k({ events: O(vf).describe("The audit entries, newest first.") }), xf = k({
		capabilityId: T().describe("Which connection."),
		provider: T().describe("Which service it is."),
		gateway: M([
			"ready",
			"connecting",
			"pairing",
			"disconnected",
			"idle"
		]).describe("Idle means it is up but has nothing to listen for, which is different from a connection that should be up and is not. Pairing means somebody started a sign-in and never finished it, which no amount of waiting will fix."),
		lastError: T().optional().describe("The most recent thing that went wrong on it.")
	}), Sf = k({
		connections: O(xf).describe("Each source feeding the record, and whether it is working. Probed now rather than remembered."),
		voice: k({
			channelId: T().describe("Which channel."),
			channelName: T().describe("What it is called."),
			startedAt: E().describe("When it joined, in milliseconds."),
			participants: O(T()).describe("Who else is in it.")
		}).optional().describe("A voice call the sandbox is currently in, when it is in one.")
	});
})), wf, Tf = g((() => {
	z(), Cf(), wf = {
		list: R.route({
			method: "GET",
			path: "/activity",
			summary: "What the agent has done out in the world",
			description: "The audit trail of actions taken on outside services. Read-only on purpose: entries are written by the sandbox alone, which is what makes it a record worth trusting."
		}).input(yf).output(bf),
		status: R.route({
			method: "GET",
			path: "/activity/status",
			summary: "Whether the audit trail is being kept",
			description: "Which sources are feeding the record and whether each is working."
		}).output(Sf)
	};
})), Ef, Df, Of, kf, Af, jf, Mf, Nf, Pf, Ff, If, Lf, Rf, zf, Bf, Vf, Hf = g((() => {
	L(), Ef = /^[A-Za-z_][A-Za-z0-9_]*$/, Df = T().regex(Ef).max(128), Of = k({
		key: Df.describe("The name to store it under, which is the name a process will find it by."),
		value: T().min(1).describe("The value. It goes straight to your sandbox and never through the platform.")
	}), kf = k({ keys: O(T()).describe("The names that exist here. Only the names: the values never leave the sandbox.") }), Af = k({ key: Df.describe("Which secret, by name.") }), jf = k({ value: T().describe("The value itself. The only place in this API one is ever returned.") }), Mf = M(["use", "conversation"]).describe("How far one release goes: `use` asks again every single time (one click releases exactly one use), `conversation` covers the rest of this conversation and is forgotten when the daemon restarts."), Nf = M(["secret", "capability"]).describe("Whether this gate covers one stored secret, by the name a reference carries, or one whole connected capability, by its id."), Pf = M([
		"shell",
		"code",
		"browser",
		"session",
		"otp"
	]).describe("What the credential was about to be used for: a shell command, a script, typing into a page, mounting a connected account, or one one-time code."), Ff = k({
		subject: T().min(1).describe("What is gated: a secret's name, or a connected capability's id."),
		kind: Nf,
		approvers: O(T().min(3)).min(1).describe("Exactly who may release it, by email, from the people on the Access roster. Not a seniority floor: nobody outside this list can release it, the owner included, unless the owner is on it."),
		scope: Mf
	}), If = k({ gates: O(Ff).describe("Every gate in force. Names, subjects and approver addresses only: this answer never carries a credential.") }), Lf = k({ subject: T().min(1).describe("Which gate, by the secret name or capability id it covers.") }), Rf = k({
		subject: T().min(1).describe("What to ask for: the secret's name, or the connected capability's id."),
		why: T().max(280).optional().describe("One line on what it is for. The only words on the card that are the agent's."),
		conversationId: T().optional().describe("Which conversation to raise the card in. The CLI fills this from the running turn.")
	}), zf = k({
		granted: N(!0).describe("Always true: a refusal is an error with a sentence, never a `false` here."),
		approvedBy: T().describe("Who released it."),
		message: T().describe("What the grant means in practice, and what to do next.")
	}), Bf = k({
		key: T().describe("What identifies it. Unique across the whole inventory, so several accounts of one provider each get their own entry."),
		kind: M([
			"env",
			"generated",
			"capability",
			"provider"
		]).describe("Where it came from: you set it, the sandbox generated it, a connection needs it, or it is a model account's credential."),
		label: T().optional().describe("A friendlier name, for entries that have one."),
		status: M([
			"missing",
			"set",
			"connected"
		]).describe("Whether it exists and, for a connection, whether it is working."),
		requiredBy: O(k({
			resourceId: T().describe("Which resource."),
			type: T().describe("What kind of resource it is.")
		})).describe("What is waiting on it. Empty for a connection's or an account's own credential."),
		storedAt: T().describe("Where it actually lives, in words."),
		revealable: D().describe("Whether its value can be shown at all. Everything except a model account's credential can be."),
		ci: k({
			synced: D().describe("Whether the pipeline has it."),
			pushedAt: T().optional().describe("When it was last sent there.")
		}).optional().describe("Whether a copy has been given to the build pipeline."),
		lastUse: k({
			at: E().describe("When, in milliseconds."),
			lane: M([
				"shell",
				"code",
				"browser"
			]).describe("How it was used: a command, a script, or typed into a page."),
			detail: T().optional().describe("Where it went: the start of the command or script, or the site. Names and destinations only, never values."),
			approvedBy: T().optional().describe("Who released it for that use, when it is gated. Absent when nothing had to be approved.")
		}).optional().describe("The last time an agent actually spent this secret. Absent while it never has been, which most never are."),
		gate: k({
			approvers: O(T()).describe("Who may release it, by email. Nobody else can, whatever their role."),
			scope: Mf
		}).optional().describe("Who has to release this before the agent can use it, and for how long one release lasts. Absent when it is not gated.")
	}), Vf = k({ entries: O(Bf).describe("One entry per secret this sandbox knows about, from every place they live. No values, ever.") });
})), Uf, Wf, Gf, Kf, qf, Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np, rp, ip, ap, op, sp, cp, lp, up, dp, fp, pp, mp, hp, gp, _p, vp, yp, bp, xp = g((() => {
	L(), V(), Hf(), Uf = k({
		label: T().describe("The choice, in a few words."),
		description: T().describe("What picking it means."),
		preview: T().optional().describe("Something to look at while deciding: a mock-up, a snippet, a layout.")
	}), Wf = k({
		question: T().describe("What the agent is asking."),
		header: T().describe("A short label for the question."),
		multiSelect: D().describe("Whether more than one answer can be picked."),
		options: O(Uf).describe("The choices offered. A free-text answer is always possible as well.")
	}), Gf = k({
		text: T().describe("What would run."),
		language: M(["bash", "javascript"]).describe("Which of the two backends it is written for, named as the grammar that colours it."),
		truncated: D().describe("Whether this is an excerpt of a longer program, so the card can say so instead of ending mid-word. An excerpt always carries the flagged fragment: the beginning, then a window around the fragment, with any skipped middle written into the text as a bracketed count."),
		spans: O(k({
			start: E().int().nonnegative(),
			end: E().int().nonnegative()
		})).describe("Which fragments of the text the pattern match fired on: every matched class's, or, under the hard rule, only the class the title names. Offsets into text, in order, never overlapping.")
	}), Kf = k({
		toolName: T().describe("Which tool it wants to use."),
		title: T().optional().describe("The whole question, as a sentence, exactly as the runtime words it."),
		displayName: T().optional().describe("A short phrase for the button, such as read file."),
		description: T().optional().describe("More about what it is asking for."),
		reason: T().optional().describe("Why it is asking at all: a rule, the current mode, something that looked risky."),
		path: T().optional().describe("Which file it concerns, when it concerns one."),
		alwaysLabel: T().optional().describe("The wording for an always-allow answer. Present only when there is something an always could actually remember; without it the only answers are once and no."),
		program: Gf.optional().describe("The program this card is holding, when the card is about one. Present on a command gate's card and absent on every other permission ask."),
		explain: T().optional().describe("One plain sentence saying what the program does and why it is being asked about, where the title says something else. Written by the judge that read your safety policy, never by the agent being gated.")
	}), qf = k({
		card: T().describe("Which connection is being asked for."),
		name: T().describe("What it is called, as the catalogue titles it rather than as the agent named it."),
		why: T().optional().describe("The agent's case for connecting it, and the only words on this card that are the agent's.")
	}), Jf = k({
		url: T().describe("What is being paid for."),
		description: T().optional().describe("What the endpoint says it is."),
		payTo: T().describe("Where the money goes, taken verbatim from the endpoint's own demand."),
		network: T().describe("On which network."),
		asset: T().describe("In which token."),
		assetName: T().describe("That token's name. It is pegged to the dollar, which is what lets every amount here read as dollars."),
		amountUsd: T().describe("The exact price. Not a ceiling: this scheme has no ranges, so this is the whole spend."),
		spentTodayUsd: T().describe("What has already gone out today."),
		dailyCapUsd: T().describe("What may go out in a day."),
		why: T().optional().describe("The agent's case for paying, and the only words on this card that are the agent's.")
	}), Yf = k({
		subject: T().describe("Which credential is being asked for."),
		kind: Nf,
		lane: Pf,
		detail: T().optional().describe("Where it would go: the start of the command, the site, or what is being mounted. Never a value: the command still reads as a reference at this point."),
		why: T().optional().describe("The agent's case for using it, and the only words on this card that are the agent's."),
		approvers: O(T()).describe("Who may release it. A click from anyone else is refused and leaves the card standing."),
		scope: Mf
	}), Xf = k({
		name: T().describe("What to type, without the leading slash."),
		description: T().describe("What it does."),
		hint: T().optional().describe("What its argument should look like, shown after the name.")
	}), Zf = k({ agent: pd.optional().describe("Whose commands to read. Leave it out for Claude.") }), Qf = k({ commands: O(Xf).describe("The shortcut commands, as the provider last published them.") }), $f = k({
		content: T().describe("The item, as the agent wrote it."),
		status: M([
			"pending",
			"in_progress",
			"completed"
		]).describe("Where it is."),
		activeForm: T().optional().describe("How to phrase it while it is happening, so a screen can say what the agent is doing rather than what it plans to do.")
	}), ep = k({
		tokens: E().describe("How much the latest request sent, all told."),
		contextWindow: E().describe("How much the model can hold. The gap between these two is how close the conversation is to being compacted."),
		cachedAt: E().optional().describe("When that request last touched the provider's prompt cache, in milliseconds. The cache's clock runs from here, since a read refreshes it as a write does."),
		cacheTtlMs: E().optional().describe("How long that cache entry lives from `cachedAt`, in milliseconds.")
	}), tp = M([
		"read",
		"edit",
		"delete",
		"move",
		"search",
		"execute",
		"think",
		"fetch",
		"other"
	]), np = M([
		"pending",
		"in_progress",
		"completed",
		"failed"
	]), rp = k({
		path: T().describe("The file, as a workspace path, whatever directory the tool was run from."),
		line: E().optional().describe("Which line, counting from one.")
	}), ip = A("type", [
		k({
			type: N("text").describe("Plain output."),
			text: T().describe("What the tool said.")
		}),
		k({
			type: N("diff").describe("A change to a file."),
			path: T().describe("Which file, as a workspace path."),
			oldText: T().optional().describe("What was there. Absent for a new file, or where the previous contents are not known."),
			newText: T().describe("What is there now."),
			truncated: D().optional().describe("One of the two sides was too large to send whole.")
		}),
		k({
			type: N("image").describe("A picture the tool produced."),
			path: T().describe("Where it is, as a workspace path. A path rather than the bytes, because the workspace already serves it, sending it inline would bloat every stored record, and this way the picture stays openable afterwards.")
		})
	]), ap = k({
		path: T().describe("Where it lives, as a workspace path."),
		title: T().describe("What it is called: its opening heading, or its file name."),
		markdown: T().describe("The document itself."),
		truncated: D().optional().describe("It was clipped at the wire cap; the file on disk has more."),
		plan: D().optional().describe("It is one of the CLI's plan files, written to be approved rather than merely read.")
	}), op = T().describe("What to send back when you answer."), sp = {
		requestId: op,
		text: T().describe("The plan itself."),
		document: ap.optional().describe("The write-up this plan refers to, when the plan itself is a pointer to one.")
	}, cp = {
		requestId: op,
		questions: O(Wf).describe("What it wants to know."),
		document: ap.optional().describe("The document this turn wrote and is asking about, so the choice can be read beside it.")
	}, lp = { requestId: op }, up = {
		requestId: T(),
		session: T(),
		account: T(),
		message: T()
	}, dp = {
		requestId: T(),
		session: T(),
		message: T()
	}, fp = {
		requestId: T(),
		offer: qf
	}, pp = {
		requestId: T(),
		offer: Jf
	}, mp = {
		requestId: T(),
		offer: Yf
	}, hp = k({
		outcome: M(["connected", "unfinished"]),
		id: T().optional()
	}), gp = k({
		outcome: M(["paid", "failed"]),
		amountUsd: T(),
		transaction: T().optional(),
		network: T().optional()
	}), _p = k({
		outcome: M(["released", "refused"]),
		approvedBy: T().optional()
	}), vp = k({
		kind: N("plan").describe("The agent has written a plan and is waiting for a yes."),
		...sp
	}), yp = k({
		kind: N("question").describe("The agent has asked you something and is waiting."),
		...cp
	}), bp = Kf.extend({
		kind: N("permission").describe("The agent wants to use a tool it needs permission for."),
		...lp
	}), A("kind", [
		vp,
		yp,
		bp
	]);
})), Sp = g((() => {})), Cp = g((() => {})), wp, Tp, Ep = g((() => {
	Sp(), Cp(), wp = ".intentic", Tp = "481795963975-cq9msl6higcd91joidrfp8mjlkuq5fk3.apps.googleusercontent.com", `${Tp}`;
})), Dp, Op, kp, Ap, jp = g((() => {
	L(), Dp = /^[a-zA-Z_][a-zA-Z0-9_]{0,39}$/, Op = k({
		name: T().regex(Dp),
		type: M([
			"string",
			"number",
			"boolean",
			"string[]"
		]),
		description: T().min(1),
		required: D()
	}), kp = (e) => {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		for (let r of e) t.has(r.name) && n.add(r.name), t.add(r.name);
		return [...n];
	}, Ap = O(Op).min(1).max(16).superRefine((e, t) => {
		for (let n of kp(e)) t.addIssue({
			code: "custom",
			message: `Output field names must be unique; "${n}" is repeated.`
		});
	});
})), Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, Gp, Kp, qp = g((() => {
	L(), Ep(), jp(), V(), fd(), Mp = M(["fresh", "continue"]), Np = A("kind", [
		k({ kind: N("none").describe("It produces nothing but its work. The classic make the suite pass: what it leaves behind is a passing suite, and asking it to also file a report is asking it to spend a round on paperwork.") }),
		k({ kind: N("claim").describe("Each round says whether it is done and why. Structured prose: done is a value read rather than a sentence interpreted. Self-assessment, so advisory by construction; it exists because plenty of goals have no command that could check them.") }),
		k({
			kind: N("json").describe("Each round writes a real answer in a shape you declared. This is the one that makes a step's output usable as the next step's input: a paragraph mentioning three files cannot be fed to anything, a list of three files can."),
			fields: Ap.describe("The shape that answer has to match.")
		})
	]), Pp = A("kind", [k({
		kind: N("command").describe("Run something and see if it passes. Deterministic, free, and the only signal here whose answer does not come from a model. A passing test suite beats any amount of self-report."),
		command: T().min(1).describe("The command to run in the conversation's own tree. Exiting cleanly means satisfied.")
	}), k({
		kind: N("judge").describe("Put the question to a separate model with no tools, which reads the round's own report and rules on it, having done none of the work and nothing invested in its being finished."),
		rubric: T().min(1).describe("What that judge is asked."),
		model: T().optional().describe("Which model judges. Leave it out for the cheap one the other small jobs use.")
	})]), Fp = k({
		done: D().describe("Whether the goal is met. Reading this is the whole point of the file."),
		reason: T().describe("Why, in one line. The most-read sentence in the feature: the next round reads it first and the history shows it."),
		evidence: T().optional().describe("What was checked to know that. Optional, so a round with nothing to point at says so by leaving it out rather than by inventing a sentence."),
		data: j(T(), uc()).optional().describe("The declared answer, for a loop that asked for one, checked against the shape it declared.")
	}), Ip = 50, Lp = k({
		conversationId: vd.describe("The conversation to loop. It need not exist yet: naming a fresh one opens it, which is what lets run this until it passes be the first thing you ever say."),
		goal: T().min(1).describe("What done means, in your words. It goes into every round's instructions and into the judge's question, so the model is told the bar rather than left to infer it."),
		prompt: T().min(1).describe("What each round is asked to do. The suite passes is the goal; run the tests, take the top failure, fix it is the instruction."),
		context: Mp.describe("How each round meets the last. Starting fresh makes the files the memory rather than the conversation, so the twentieth round reads the tree as clearly as the first, and costs a re-read each time. Carrying on is cheaper and keeps the reasoning, which suits a short polish-this loop and degrades on long ones: a session that has spent eleven rounds arguing for its own approach is the worst available judge of whether that approach is finished."),
		output: Np,
		checks: O(Pp).describe("What else has to be true, all of them together. A list because the suite passes and the report is written is a real bar, and running it as two loops would do the work twice."),
		maxIterations: E().int().min(1).max(Ip).describe("How many rounds before it gives up. A loop that has not got there in fifty is not one round short of it."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what the whole loop may spend, in dollars. Optional for a short loop somebody is watching, and strongly wanted otherwise: this is the first thing here that can keep spending with nobody pressing anything between rounds."),
		stallLimit: E().int().min(1).describe("Stop after this many rounds in a row that changed nothing on disk. The guard that matters most: a loop's failure is not runaway success, it is an agent re-reading the same three files, restating the same plan and declaring more work remains, eleven times. Every one of those rounds succeeds, so only the tree not moving catches it."),
		isolated: D().describe("Whether it works in the conversation's own private copy or in the shared tree. It also decides where a check runs: testing the shared tree would be testing code this loop has not merged yet."),
		agent: pd.optional().describe("Which provider the rounds run on. Absent falls back to the conversation's own last choice."),
		harness: hd.optional().describe("Which agentic loop they run on."),
		account: T().optional().describe("Which account pays."),
		model: T().optional().describe("Which model."),
		actsAs: B.optional().describe("Which persona the rounds act as. It matters here: every round is unwatched, and an unwatched turn naming no persona reaches no signed-in account at all, so pinning one is how a loop gets hands."),
		worktreeBase: O(gd).min(1).max(50).optional().describe("Pin the private copy to these exact commits, so a restart cannot quietly change what the loop is working on."),
		autoLand: D().optional().describe("Whether the work merges as it goes.")
	}), `${wp}`, Rp = k({
		n: E().int().min(1).describe("Which round this was."),
		at: E().describe("When it ran, in milliseconds."),
		outcome: M([
			"continue",
			"done",
			"error"
		]).describe("How the round ended, which is not the same question as how the loop did. A round that errored does not end the loop by itself: a failing turn is often exactly what the next round is meant to fix."),
		detail: T().optional().describe("What the check said, in its own words. What a run history is actually read for: why it kept going, and why it stopped."),
		costUsd: E().optional().describe("What the round cost, in dollars."),
		changed: D().describe("Whether anything on disk moved. Three unchanged rounds in a row is the shape of a loop that is not working."),
		sessionId: T().optional().describe("The session it ran on, and the way from a history row to a readable record.")
	}), zp = M([
		"running",
		"done",
		"exhausted",
		"stalled",
		"overspent",
		"stopped",
		"error"
	]), Bp = Lp.extend({
		state: zp.describe("How it ended, and each of these is a different thing to be told. Out of rounds says give it more room; stalled says it is not making progress and more room will not help. Overspent, stopped by a person, and the loop itself failing are all their own answers."),
		startedAt: E().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		resumed: E().int().min(0).describe("How many times the sandbox restarted under it and picked it back up. Counted rather than flagged, so a loop whose round reliably kills the sandbox is not resurrected on every boot for ever."),
		detail: T().optional().describe("Why it ended, for the endings whose reason is not in their name."),
		iterations: O(Rp).describe("Every round, in order. Why it stopped at the fourth is the question a loop gets read for, and this is the answer.")
	}), Vp = k({ loops: O(Bp).describe("Every loop this workspace has run, newest first, kept after they end.") }), Hp = k({ conversationId: vd.describe("Which conversation's loop.") }), Up = k({
		id: B.describe("The design's id."),
		name: T().min(1).max(60).describe("What to call it. Short, because it has to be readable on a small badge."),
		description: T().max(280).optional().describe("What it is for, in one line. Optional, because a well-named loop has already said it."),
		prompt: T().optional().describe("What each round is asked to do, when that is worth saying separately from the goal. Absent means each round works towards the goal however it sees fit."),
		context: Mp.describe("How each round meets the last: starting clean, or carrying on."),
		output: Np.describe("What it has to produce."),
		checks: O(Pp).describe("What else has to be true."),
		maxIterations: E().int().min(1).max(Ip).describe("How many rounds before it gives up."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what it may spend, in dollars."),
		stallLimit: E().int().min(1).describe("Stop after this many rounds in a row that changed nothing.")
	}), Wp = k({ designs: O(Up).describe("Saved loops: the machinery with the goal left out, so one design can be pointed at a different job every time.") }), Gp = k({
		design: Up.describe("The design to write."),
		create: D().describe("Whether you mean to make a new one or replace an existing one, so an id that happens to collide cannot silently overwrite the one you had.")
	}), Kp = k({ id: B.describe("Which saved loop.") });
})), Jp, Yp, Xp, Zp, Qp, $p, em, tm, nm, rm, im, am, om, sm, cm, lm, um, dm, fm, pm, mm, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm, Em, Dm, Om, km = g((() => {
	L(), V(), qp(), Jp = M([
		"idle",
		"running",
		"awaiting",
		"stopping",
		"dismissing",
		"stopped",
		"resuming",
		"landing",
		"ready",
		"landed",
		"conflict",
		"error",
		"interrupted"
	]), Yp = k({
		tool: T().optional().describe("The last tool it reached for."),
		target: T().optional().describe("What it reached for that tool with: a file, a command, a URL."),
		todo: T().optional().describe("The item on its own list that it is working through.")
	}), Xp = k({
		done: E().describe("Items it has completed."),
		total: E().describe("Items on the list. Never zero: a conversation that kept no list carries no clause at all.")
	}), Zp = k({
		plan: D().describe("It has proposed a plan and is waiting for a yes."),
		question: D().describe("It has asked you something."),
		permission: D().describe("It wants to use a tool it needs permission for."),
		capability: D().describe("It needs something connected that is not connected yet."),
		credential: D().describe("It is waiting for a named person to release a credential. The one pause that may not be yours to clear, whatever your role."),
		conflict: D().describe("Its work cannot be merged without somebody resolving a clash.")
	}), Qp = k({
		at: E().describe("When the turn that left this ended, in milliseconds."),
		steps: k({
			open: E().describe("Items on it that were never completed."),
			total: E().describe("Items on the whole list."),
			next: T().optional().describe("The one it would have done next: what it was working through, or the first still waiting.")
		}).optional().describe("The agent's own checklist where that turn left it. Absent for a conversation that kept no list."),
		check: T().optional().describe("The end-of-turn check that was still failing when the turn ended, by name.")
	}), $p = k({
		subject: T().describe("One line saying what the merged work did, read off the code rather than off the opening request. A conversation that asks for an audit and then spends four turns fixing what it found needs a subject about the fixes."),
		note: T().optional().describe("The same change said to somebody who uses the product, for a repository that keeps a changelog. Usually absent, because most changes are not ones a user would notice."),
		breaking: T().optional().describe("What this change takes away, for anything already relying on it. Nearly always absent: it is for removals, not for additions.")
	}), em = k({
		provider: T().min(1).describe("Which provider was asked."),
		model: T().min(1).describe("Which of its models."),
		status: M([
			"asking",
			"answered",
			"refused",
			"skipped"
		]).describe("How this one went. Skipped means it was not asked at all, because it refused a few minutes ago and the walk stepped over it."),
		at: E().optional().describe("When it started being asked, in milliseconds. Absent for one that was skipped, which cost no time."),
		ms: E().optional().describe("How long it took. Absent while it is still being asked."),
		reason: T().optional().describe("Why it refused, in its own words.")
	}), tm = k({
		startedAt: E().describe("When the drafting began, in milliseconds."),
		steps: O(em).describe("Each model that was asked, in the order they were spent, so the list is the timeline. Empty with no outcome means the diff is still being read."),
		outcome: M(["written", "failed"]).optional().describe("How it ended. Absent means it is still going."),
		reason: T().optional().describe("The one-line account of a failure, for a screen with one line to spend. The steps carry each model's own words."),
		finishedAt: E().optional().describe("When it ended, in milliseconds.")
	}), nm = M([
		"workspace",
		"diverged",
		"binary"
	]), rm = k({
		id: T().describe("The conversation id, which is how every other call addresses it."),
		sessionId: T().optional().describe("The provider session behind the last turn. It is retired whenever the model or account changes."),
		title: T().optional().describe("What to call it: the first prompt cut to one line, unless somebody renamed it."),
		status: Jp.describe("What it is doing. Stopping and stopped are the two halves of somebody pressing stop, because a cancel is not instant; dismissing is the same window for a question waved away, which ends the turn too but owes the user nothing; resuming means the sandbox is already putting right whatever killed the turn; landing means its work is being carried into the workspace right now, and nothing may act on its branch until that settles."),
		failure: T().optional().describe("Why the last turn failed, in the words it died on. Absent unless it did, and cleared the moment it runs again. Carried here because the word error on its own is not an answer, least of all for a run nobody was watching."),
		failureCode: T().optional().describe("Which kind of failure it was, as the turn's own error frame coded it. Absent for a failure nothing could classify, which reads as the plain red line it is."),
		limitResetsAt: E().optional().describe("When the spent allowance reopens, in epoch seconds. Absent when the provider publishes no instant."),
		limitHeld: D().optional().describe("Whether the refused turn is held whole, so sending again re-runs it instead of appending to it."),
		limitScheduled: D().optional().describe("Whether the held turn is already booked to go again at the reset, so nobody has to press anything."),
		limitMoving: T().optional().describe("The account the held turn is being moved to by the owner's policy, while that move is booked."),
		provider: pd.describe("Which model provider it runs on."),
		harness: hd.describe("Which agentic loop it runs on."),
		runner: T().optional().describe("The runner this conversation runs on. Absent means this sandbox."),
		startIn: T().optional().describe("Which folder it opened in, relative to the workspace root. Absent means the root."),
		actsAs: T().optional().describe("Which persona its first turn acted as. Absent for an ordinary chat."),
		model: T().optional().describe("What its last turn ran with. Kept per conversation so opening it restores the choices made in it, rather than whatever some other tab last picked."),
		effort: T().optional().describe("How hard that turn was told to think."),
		thinking: D().optional().describe("Whether that turn showed its reasoning."),
		fast: D().optional().describe("Whether that turn asked for higher speed. What was asked for, not what was served."),
		tier: M(["fast", "standard"]).optional().describe("How hard its last turn looked to the complexity judge. What the next turn's preview needs, not what actually ran."),
		tierHold: D().optional().describe("Whether this conversation is pinned to the picked model, so a turn that looks simple is never moved to a cheaper one."),
		account: T().optional().describe("Which connected account paid for it."),
		branch: T().optional().describe("The branch its private copy works on. Absent for a conversation that works directly in the shared tree."),
		autoLand: D().optional().describe("This conversation's own answer to whether its work merges automatically. Absent means it follows the sandbox-wide setting, which is the common case."),
		resumeAfterOutage: D().optional(),
		resumeAfterLimit: D().optional(),
		moveAfterLimit: D().optional(),
		landRequested: k({
			email: T().describe("Who asked."),
			name: T().optional().describe("Their display name."),
			at: E().describe("When they asked, in milliseconds.")
		}).optional().describe("A collaborator has asked a maintainer to merge this work. Cleared by whichever merge or discard answers it. Absent means nobody is waiting."),
		origin: yd.optional().describe("Where the conversation came from when nobody typed it: a chat mention, a visitor's message, a webhook. Absent means a person started it."),
		startedBy: T().optional().describe("Who asked for the first turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent when nothing was verified (a wake, a loopback caller)."),
		forkedFrom: Td.optional().describe("The conversation this one was cut from. Recorded once and never cleared: it is the relationship, not a pending state."),
		base: T().optional().describe("The commit its private copy started from, shortened."),
		costUsd: E().optional().describe("What it has cost so far, in dollars. A subagent's spend is its own and is not folded in here."),
		inputTokens: E().optional().describe("Tokens sent."),
		outputTokens: E().optional().describe("Tokens received."),
		contextTokens: E().optional().describe("How much of the window the conversation currently fills."),
		contextWindow: E().optional().describe("How large that window is."),
		promptCache: k({
			at: E().describe("When its last request touched the provider's prompt cache, in milliseconds."),
			ttlMs: E().describe("How long that entry lives from `at`, in milliseconds.")
		}).optional().describe("When this conversation's prompt cache was last kept alive and how long it lasts, which together say when picking the conversation up stops being cheap. Absent when the provider publishes nothing to ground it on."),
		activity: Yp.optional().describe("What it is doing at this moment."),
		checklist: Xp.optional().describe("How far it is through its own checklist. Absent for a conversation that kept no list, which is most short ones."),
		landedMessageDraft: tm.optional().describe("The whole story of this merge's commit message being written: which models were asked, how long each took, what refused and in what words. Forgotten on restart, which is right, because a restart also killed the drafting it describes."),
		landedMessage: $p.optional().describe("What this conversation's merged work is called, once the drafting above has finished. It arrives on the same push that ends the draft, so the promise and the answer travel together."),
		startedAt: E().optional().describe("When the running turn started, in milliseconds. Absent when none is running."),
		updatedAt: E().describe("When it last did something, in milliseconds. Reading it does not count."),
		seenAt: E().optional().describe("When somebody last opened it, in milliseconds. Newer activity than this is what makes it unread. Kept by the sandbox rather than by a browser, so clearing site data or picking up a phone does not resurrect every badge."),
		attention: Zp.describe("Which kinds of waiting-for-you it is doing."),
		conflictCauses: O(nm).optional().describe("Why its work will not merge, and so who can clear it: your own uncommitted edits, which only you can commit or stash, against a moved main line or an unmergeable binary, which the conversation can redo on its own copy. Absent unless it is refusing to merge."),
		unfinished: Qp.optional().describe("What its last turn left open: steps it never completed, a check still failing. Absent for a turn that finished what it started."),
		turns: E().optional().describe("Turns it has finished."),
		toolUses: E().optional().describe("Tools it has used, over its whole life."),
		subagents: k({
			running: E().describe("Subagents working right now."),
			total: E().describe("Subagents it has started over its whole life.")
		}).optional().describe("Subagents and child agents this one delegated to. Absent means it never has, which is most conversations. Their spend is their own and is not folded into this conversation's cost."),
		diff: k({
			files: E().describe("Files touched."),
			insertions: E().describe("Lines added."),
			deletions: E().describe("Lines removed.")
		}).optional().describe("Everything it has written, measured from where it started. Independent of how much has been merged."),
		landedPresence: k({
			landed: E().describe("Paths this conversation merged in."),
			present: E().describe("How many of them are still there, either pending or committed.")
		}).optional().describe("Present only when some of what it merged has since been thrown away. Absent is the steady state: its presence is the signal, so an ordinary card spends no line on it."),
		loop: k({
			state: zp.describe("How the loop is going."),
			iteration: E().int().min(0).describe("Which round it is on."),
			maxIterations: E().int().min(1).describe("How many rounds it will attempt before giving up."),
			goal: T().describe("What it is looping towards.")
		}).optional().describe("The loop driving this conversation, if one is. Absent for an ordinary conversation, which is nearly all of them."),
		workflow: k({
			runId: T().describe("The run this belongs to, which is how a board groups its steps together."),
			name: T().describe("The workflow's name."),
			step: T().describe("Which step this conversation is on now. It moves when steps are chained."),
			index: E().int().min(1).describe("This step's place in the workflow, counting from one."),
			total: E().int().min(1).describe("How many steps the workflow has.")
		}).optional().describe("The workflow run this conversation is a step of. Without it, a four-step run reads as four unrelated conversations that happen to have started together."),
		watches: O(k({
			id: T().describe("The daemon's handle for this watch, the same one the agent was given when it armed it."),
			note: T().describe("The agent's own line on what it is waiting for."),
			intervalSeconds: E().int().min(1).describe("How often the check runs."),
			deadlineAt: E().describe("When it gives up and wakes the conversation anyway, in milliseconds. Every watch has one.")
		})).optional().describe("Outside conditions this conversation is parked on, each of which will wake it. Absent means none, which is nearly every conversation: an armed watch is why a finished-looking agent starts working by itself, and why a hosted machine will not go idle."),
		archivedAt: E().optional().describe("When it was put away, in milliseconds. Nothing was lost: its branch, its record and every counter stayed, and bringing it back gives it a fresh working copy. Absent means it is live on the board.")
	}), im = k({ id: T().min(1).describe("Which conversation.") }), am = im.extend({
		before: I().int().optional().describe("Return the messages before this position in the record: the `from` of the page below. Absent asks for the most recent turns."),
		turns: I().int().min(1).max(200).optional().describe("How many of the user's turns to return, newest first. Absent takes the daemon's default.")
	}), om = k({ ids: O(T().min(1)).max(500).optional().describe("Which conversations to put away. Leave it out for every finished one that can be archived right now.") }), sm = k({ ids: O(T().min(1)).min(1).max(500).describe("Which conversations.") }), cm = k({
		moved: O(rm).describe("What actually moved, whole, rather than the fleet afterwards. Two archives finishing at once would each carry a snapshot from a different instant, and swapping one in wholesale would let the slower answer resurrect what the faster one just filed away."),
		rev: E().describe("The version of the fleet that includes this move, so a caller can hold its own optimistic change until it sees a list at least that new.")
	}), lm = cm.extend({ failed: O(k({
		id: T().describe("Which conversation stayed on the board."),
		reason: T().describe("Why its working copy could not be released, in the words the failure came with.")
	})).describe("The conversations this press could not put away, each with the reason, so the board can say it instead of reporting silence.") }), um = k({ removed: O(T()).describe("Which conversations were deleted, as ids. Ids rather than whole cards, because these no longer exist anywhere: there is nothing left to show and nothing to put back.") }), dm = k({
		query: T().trim().min(2).describe("What to look for. Searched against what was said, both sides of the conversation, and nothing else: not the thinking, not the tool output, which between them name nearly every identifier in the workspace and would return most of the board."),
		caseSensitive: kl().optional().describe("Whether capitals matter.")
	}), fm = M(["user", "agent"]), pm = k({
		text: T().describe("The matching line, with a little either side of it."),
		speaker: fm.describe("Who said it. Carried with the words rather than beside them, because a line of the agent's prose under a card reads as something you typed until the row says otherwise.")
	}), mm = k({
		id: T().describe("Which conversation matched."),
		snippet: pm.optional().describe("Why, in its own words. Absent when the title was the match, which the card already shows: repeating it underneath is noise where evidence was wanted.")
	}), hm = k({
		matches: O(mm).describe("What matched, from the live fleet and the archive together."),
		scanned: E().describe("How many conversations were actually read, so a screen can say when a search saw less than everything rather than implying it saw all of it."),
		indexing: D().describe("Whether what was said is still being read in the background. True means this answer can still grow, so a screen must say it is incomplete rather than presenting it as the whole list.")
	}), gm = k({
		id: T().min(1).describe("Which conversation."),
		title: T().trim().min(1).max(80).describe("What to call it from now on.")
	}), _m = k({
		id: T().min(1).describe("Which conversation."),
		text: T().trim().min(1).max(8e3).describe("The words to put in the agent's mouth. Bounded just above what the next turn can carry whole, because a line too long to be handed over intact would reach the agent truncated and quietly break the very thing this is for.")
	}), vm = k({
		id: T().min(1).describe("Which conversation."),
		autoLand: D().nullable().describe("Whether its work merges automatically when a turn finishes. Null clears the override and goes back to following the sandbox-wide setting, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), ym = k({
		id: T().min(1).describe("Which conversation."),
		resumeAfterOutage: D().nullable().describe("Whether it retries by itself when the model provider was what failed. Null clears the override back to the sandbox-wide setting.")
	}), bm = k({
		id: T().min(1).describe("Which conversation."),
		resumeAfterLimit: D().nullable().describe("Whether the turn a spent allowance refused is sent again by itself once the window reopens. Null clears the override back to the sandbox-wide setting.")
	}), xm = k({
		id: T().min(1).describe("Which conversation."),
		moveAfterLimit: D().nullable().describe("Whether the turn a spent allowance refused is moved to another connected account of the same provider that has room, as soon as the refusal lands. Null clears the override back to the sandbox-wide setting.")
	}), Sm = k({
		id: T().min(1).describe("Which conversation."),
		repo: T().min(1).describe("Which repository."),
		path: T().min(1).describe("Which file, relative to that repository.")
	}), Cm = k({
		path: T().describe("Which file."),
		reason: nm.describe("Why it would not merge, and the three have nothing in common but the symptom. Your own uncommitted edits on that path, where yours is the copy at risk. The shared tree having moved under the conversation since it started, where nothing of yours is at risk. Or a file git cannot merge at all, where no automatic answer exists.")
	}), wm = k({
		repo: T().describe("Which repository."),
		paths: O(Cm).describe("The files that genuinely would not apply. Not the whole change: reporting everything whenever the cause could not be pinned down turned four real conflicts into a wall of fourteen."),
		clean: E().describe("How many files in this repository passed but remain held with the refused composition. Zero alongside an empty list means the repository could not be reached at all."),
		mainBranch: T().optional().describe("The branch your own checkout is on, which is what the conversation has to rebase onto. Carried because only the sandbox can see it. Absent where there is no name to give.")
	}), Tm = k({
		landed: D().describe("Whether the entire composed change was applied."),
		conflicts: O(wm).optional().describe("What stopped the whole composed change, grouped per repository."),
		resolving: O(k({
			repo: T().describe("Which repository."),
			paths: O(T()).describe("Which files now hold conflict markers to sort out by hand.")
		})).optional().describe("Files left half-merged when you asked to carry the whole composition with its conflicts marked for resolution."),
		held: D().optional().describe("Nothing was applied and nothing failed: there is work waiting on the branch for a deliberate merge. Not merged on its own cannot say that, because on its own it means refused.")
	}), Em = M([
		"check",
		"merge",
		"measure"
	]), Dm = M(["cumulative", "outstanding"]), Om = k({
		id: T().min(1).describe("Which conversation's work to merge."),
		mode: Em.optional().describe("How to apply it. The default applies every repository or none, so a refusal leaves the workspace exactly as it was. The other carries the whole composition and leaves conflicted paths with markers to resolve by hand."),
		span: Dm.optional().describe("How much of the work to take. Leave it out for everything not yet merged."),
		force: D().optional().describe("Go ahead despite a check that would otherwise refuse.")
	});
})), Am, jm = g((() => {
	L(), Am = k({
		status: M([
			"allowed",
			"allowed_warning",
			"rejected"
		]),
		resetsAt: E().optional(),
		rateLimitType: T().optional(),
		utilization: E().optional()
	});
})), Mm, Nm = g((() => {
	L(), Mm = M([
		"off",
		"cooldown",
		"on"
	]);
})), Pm, Fm, Im, Lm, Rm, zm, Bm, Vm, Hm, Um, Wm, Gm, Km, qm, Jm, Ym = g((() => {
	L(), Pm = k({
		name: T().describe("Its id, and what the close route takes."),
		label: T().optional().describe("What to call it on screen."),
		kind: M([
			"shell",
			"panel",
			"agent",
			"job",
			"process"
		]).describe("What sort of thing it is: a terminal somebody opened, a repository's dev server, where an agent's commands run, a job the sandbox started, or a background process that is watched rather than typed into."),
		running: D().describe("Whether it is alive. A finished one-shot job leaves a dead shell behind, which reads as false and is how it gets swept up."),
		activityAt: E().describe("When it last produced output, in milliseconds. Zero means it did not say, which is unknown rather than 1970."),
		exitCode: E().optional().describe("How the last thing in it ended. Absent while that pane is still alive."),
		command: T().optional().describe("What is running in it right now. Absent when it is sitting at a prompt. Not a second spelling of whether it is alive: this says whether anything is happening, which is what a close button should ask about before it ends something."),
		extensionId: T().optional().describe("Which extension declared this process, when one did."),
		processName: T().optional().describe("Which of that extension's processes it is, which together with the id above addresses its start and stop routes."),
		help: k({
			requestId: T().describe("What to send back when you answer, through the agent reply route."),
			message: T().describe("What the agent needs, in its own words."),
			requestedAt: E().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has stopped at something only a person can clear, and is waiting at this terminal. Present only while it is waiting.")
	}), Fm = k({ sessions: O(Pm).describe("Every live surface the sandbox is holding, in one list, because the question they all answer is the same one.") }), Im = k({ name: T().describe("Which terminal.") }), Lm = k({
		name: T().describe("Which terminal."),
		lines: I().min(1).max(1e5).default(2e4).describe("How far back to ask for. Clamped to the history that actually exists.")
	}), Rm = k({
		name: T().describe("Which terminal this is from."),
		text: T().describe("The history, oldest line first, with wrapped lines rejoined so a copied address or path comes back whole."),
		lines: E().describe("How many lines you got."),
		truncated: D().describe("It stopped because you asked for that many, not because the history ran out.")
	}), zm = k({
		id: T().describe("Stable for the life of the page, which is what lets a tab survive a refresh of this list. Its address changes as the agent navigates and its position changes when a sibling closes."),
		title: T().optional().describe("The page's title. Absent mid-navigation, which is exactly when a tab still has to be drawn."),
		url: T().describe("Where it is."),
		active: D().describe("The one the agent last touched, or for a finished session, the one it ended on. Exactly one page has this.")
	}), Bm = k({
		name: T().describe("Its id, and what the close route takes."),
		label: T().describe("What to call it on screen: the open page's title, or its site, or which browser this is."),
		server: T().describe("Which browser drives it: the credential-free one, or a signed-in account's. The difference between a throwaway page and one logged in as you, which is worth saying out loud."),
		running: D().describe("Whether it is still open. A closed one is listed for a while with the pages it had, as the record of where the agent went."),
		activityAt: E().describe("When it last did anything, in milliseconds."),
		finishedAt: E().optional().describe("When it closed, in milliseconds. Absent while it is open."),
		help: k({
			requestId: T().describe("What to send back when you answer, through the agent reply route."),
			message: T().describe("What the agent needs, in its own words."),
			requestedAt: E().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has hit something only a person can clear: a captcha, a password it does not hold, a check on your phone. Present only while it is waiting."),
		pages: O(zm).describe("Every page it has open. A browser holds several at once, which is the reason it is listed apart from the terminals.")
	}), Vm = k({ sessions: O(Bm).describe("Every browser the agents have running, open or recently closed.") }), Hm = k({ name: T().describe("Which browser.") }), Um = M(["subagent", "spawned"]), Wm = M([
		"pending",
		"running",
		"blocked",
		"completed",
		"failed",
		"killed",
		"paused"
	]), Gm = k({
		state: M([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Whether anything proved its work: a check passed after its last edit, it changed code and nothing checked it, a check ran and failed, or it changed no code at all."),
		paths: O(T()).optional().describe("The code files it changed, most recent last. The first few; the record holds the rest."),
		check: T().optional().describe("The command that spoke: the one that cleared it, or the one that failed. Named rather than summarised, so a targeted test is not read as the whole suite.")
	}), Km = k({
		id: T().describe("The id of the tool call that started it (an SDK child) or the child's own conversation id (a spawned one); either way both sides already hold it, so a card links to its subagent with the id it has and the subagent points back the same way."),
		kind: Um.describe("What sort of subagent: one the runtime's own Task tool spawned in-process, or a full child agent the daemon started for the turn. It changes only how you watch it."),
		conversationId: T().describe("The conversation whose turn started it, and the way back to the chat it belongs to."),
		agentType: T().optional().describe("What kind of subagent it is."),
		description: T().optional().describe("What it was asked to do, in one line."),
		model: T().optional().describe("Which model it runs on."),
		provider: T().optional().describe("Which provider serves it, for a child agent spawned across providers."),
		spawnDepth: E().optional().describe("How deep in the chain it sits, where one means the turn itself started it. A subagent can start subagents, and a flat list that could not say so would read as though the turn started all of them."),
		background: D().optional().describe("The parent carried on working instead of waiting for it. This is the whole reason the list exists: such a subagent used to be invisible until its result landed, sometimes minutes later."),
		status: Wm.describe("How it is going. Blocked means it needs an answer, which a parent and an operator act on differently from it simply working."),
		startedAt: E().describe("When it started, in milliseconds."),
		endedAt: E().optional().describe("When it finished, in milliseconds. Absent while it works."),
		activityAt: E().describe("When it last did anything, in milliseconds."),
		tokens: E().optional().describe("What it has spent. Its own, so a parent's cost and the sum of its subagents' are two different true numbers."),
		toolUses: E().optional().describe("How many tools it has used."),
		lastTool: T().optional().describe("The last one it reached for."),
		summary: T().optional().describe("Its report: what it concluded, without opening its record. The question a finished subagent gets read for."),
		error: T().optional().describe("Why it failed, when it did."),
		verification: Gm.optional().describe("Whether anything proved the work its report describes.")
	}), qm = k({ sessions: O(Km).describe("Every subagent and child agent this sandbox's conversations have started.") }), Jm = k({ id: T() });
})), Xm, Zm, Qm, $m, eh, th, nh = g((() => {
	L(), Xm = M(["messages", "everything"]), Zm = k({
		id: T().describe("The share's own id, minted fresh each time, so sharing one conversation twice gives two links. Deliberately not the conversation's id, which is memorable by design and would make a page's address guessable."),
		conversationId: T().describe("Which conversation it was taken from."),
		title: T().describe("The title on the page, which is the sharer's choice rather than the conversation's own."),
		detail: Xm.describe("How much travels: the two speakers' words alone, or the whole record including the agent's work and thinking, which necessarily publishes the code and command output in it."),
		sharedAt: E().describe("When the snapshot was taken, in milliseconds. A share is frozen, so this dates what a recipient can see rather than when the conversation happened."),
		messages: E().describe("How many messages are behind the link."),
		url: T().optional().describe("The page's address. Absent on a sandbox with nowhere to publish to.")
	}), Qm = k({ shares: O(Zm).describe("Every conversation currently published as a page.") }), $m = k({
		conversationId: T().min(1).describe("Which conversation to publish."),
		title: T().min(1).max(80).describe("The title for the page. The conversation's own name is only what a dialog would open with."),
		detail: Xm.describe("How much to publish. Two levels rather than a set of switches, because every extra toggle is another thing to get wrong about a link that cannot be recalled.")
	}), eh = k({ id: T().min(1).describe("Which share to re-take. Its link stays the same, which matters because it has already been sent.") }), th = k({ id: T().min(1).describe("Which share to take down.") });
})), rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh = g((() => {
	L(), V(), nh(), Ym(), xp(), rh = M([
		"pending",
		"approved",
		"rejected",
		"cancelled"
	]), ih = M([
		"pending",
		"answered",
		"cancelled"
	]), ah = M([
		"pending",
		"allowed",
		"always",
		"denied",
		"cancelled"
	]), oh = M([
		"pending",
		"helped",
		"declined",
		"cancelled"
	]), sh = M([
		"pending",
		"approved",
		"skipped",
		"cancelled"
	]), ch = M([
		"pending",
		"connecting",
		"skipped",
		"cancelled"
	]), lh = k({
		...sp,
		status: rh.describe("Where the decision stands.")
	}), uh = k({
		...cp,
		status: ih.describe("Where the answer stands."),
		answers: j(T(), O(T())).optional().describe("What was chosen, keyed by the question, with the chosen labels or the user's own words.")
	}), dh = Kf.extend({
		...lp,
		status: ah.describe("Where the decision stands.")
	}), fh = k({
		...up,
		status: oh.describe("How the hand-over ended.")
	}), ph = k({
		...dp,
		status: oh.describe("How the hand-over ended.")
	}), mh = k({
		...fp,
		status: ch.describe("Where the decision stands."),
		outcome: hp.optional().describe("How an accepted ask's setup ended (the capability_outcome frame).")
	}), hh = k({
		...pp,
		status: sh.describe("Where the decision stands."),
		receipt: gp.optional().describe("How the approved payment ended (the payment_receipt frame).")
	}), gh = k({
		...mp,
		status: sh.describe("Where the decision stands."),
		receipt: _p.optional().describe("Who released it, or that somebody refused (the credential_receipt frame).")
	}), _h = Oc(() => k({
		id: T().describe("The call's id."),
		name: T().describe("Which tool."),
		category: tp.describe("What kind of thing it does: read, edit, delete, move, search, run, think, fetch. Named the same way whatever the backend called the tool."),
		status: np.describe("How it went."),
		target: T().optional().describe("What it acted on, in one line: a file, a command, an address."),
		locations: O(rp).optional().describe("The files it touched."),
		content: O(ip).optional().describe("What it produced: text, a change to a file, or a picture."),
		children: O(_h).optional().describe("Calls a delegated subagent made, nested under the call that started it, so a reopened conversation redraws the delegation rather than collapsing it into one result."),
		thinking: T().optional().describe("What the agent was reasoning about around this call."),
		subagent: vh.optional().describe("The helper this call started, as the daemon's registry sees it: what it is, how it is going, what it has spent. What a card can say about a backgrounded child whose result is minutes away.")
	})), vh = k({
		kind: Um,
		agentType: T().optional(),
		description: T().optional(),
		model: T().optional(),
		provider: T().optional(),
		background: D().optional(),
		status: Wm,
		tokens: E().optional(),
		toolUses: E().optional(),
		lastTool: T().optional(),
		summary: T().optional(),
		error: T().optional(),
		verification: Gm.optional()
	}), yh = k({
		title: T().describe("The one line a reader sees, on a row that opens to the text below."),
		text: T().describe("The note itself, which is also exactly what the model was told.")
	}), bh = k({
		costUsd: E().optional(),
		inputTokens: E().optional(),
		outputTokens: E().optional(),
		durationMs: E().optional(),
		numTurns: E().optional()
	}), xh = k({
		role: M([
			"user",
			"assistant",
			"notice"
		]).describe("Who said it. A notice is neither side: it is something that happened to the turn, recorded so a reopened conversation can say it. Without those, a turn a provider refused ends on the user's message and reads as broken."),
		text: T().describe("The words."),
		sentAt: E().optional().describe("When it was sent, in milliseconds. On the user's rows only, because that is the only moment actually known: a turn's own frames arrive with no clock, so stamping the agent's rows could only ever mean the whole turn's start or end."),
		attachments: O(T()).optional().describe("Files attached to this message, as workspace paths."),
		checkpointId: T().optional().describe("The saved point this message can be rewound to. Looked up on each read rather than stored, so what is offered is exactly what is still there to go back to."),
		rewindIndex: E().int().nonnegative().optional().describe("This message's position in the conversation's record, which is how a rewind names it. Present only beside a checkpoint."),
		thinking: T().optional().describe("What the agent was reasoning about."),
		tools: O(_h).optional().describe("The tool calls this part of the turn made."),
		todos: O($f).optional().describe("The agent's task checklist, as of this bubble."),
		usage: bh.optional().describe("What the turn cost, on the bubble its answer ended in."),
		notes: O(yh).optional().describe("What the sandbox added to this message before the model saw it. Carried on the message rather than as rows of their own, because they genuinely were part of what was sent."),
		placed: D().optional().describe("A person wrote this in the agent's voice, with no turn behind it. Marked for the human re-reading the conversation months later, so their own words do not pass as the agent's. The agent itself never sees the mark."),
		noticeAction: M([
			"landHold",
			"outageOptOut",
			"depsInstall",
			"tierHold"
		]).optional().describe("A one-press follow-up this notice offers, by name. The chat decides what it does and whether it still applies."),
		noticeWait: M(["credentialRenewal", "personaRoute"]).optional().describe("The wait this notice describes, by name, so a reader can say whether it is still on."),
		plan: lh.optional().describe("The plan this row asked approval for, and the answer."),
		question: uh.optional().describe("The questions this row asked, and the picks that answered them."),
		permission: dh.optional().describe("The tool this row asked permission for, and the decision."),
		browserHelp: fh.optional().describe("The browser hand-over this row asked for, and how it ended."),
		terminalHelp: ph.optional().describe("The terminal hand-over this row asked for, and how it ended."),
		capabilityOffer: mh.optional().describe("The capability setup this row asked for, the decision, and the outcome."),
		paymentOffer: hh.optional().describe("The payment this row asked for, the decision, and the receipt."),
		credentialOffer: gh.optional().describe("The gated credential this row asked to use, who may release it, and who did.")
	}), Sh = A("op", [
		k({
			op: N("append").describe("A new row at the end."),
			row: xh
		}),
		k({
			op: N("replace").describe("This row, whole, in place of the one at that index."),
			index: E().int().nonnegative(),
			row: xh
		}),
		k({
			op: N("drop").describe("The row at that index is gone: it was opened and never written into."),
			index: E().int().nonnegative()
		}),
		k({
			op: N("text").describe("More of the agent's prose, onto that row's text."),
			index: E().int().nonnegative(),
			text: T()
		}),
		k({
			op: N("thinking").describe("More of the agent's reasoning, onto that row's thinking."),
			index: E().int().nonnegative(),
			text: T()
		}),
		k({
			op: N("tool").describe("A tool card, whole: new, or the latest state of one already there, matched by id wherever it nests."),
			index: E().int().nonnegative(),
			tool: _h,
			parent: T().optional().describe("The card this one nests under, when it is a delegated subagent's own call.")
		})
	]), Ch = k({ messages: O(xh).describe("The conversation, in order. Each block of the agent's prose is its own message with the tools that block introduced, which is what reproduces the way it actually unfolded.") }), wh = k({
		reason: M([
			"stopped",
			"limit",
			"outage"
		]).describe("Which ending left the work here: a Stop or a daemon killed under the turn, a spent usage allowance, or a provider that refused it."),
		resetsAt: E().optional().describe("When the spent allowance reopens, in epoch seconds. Absent for every ending that names no instant, and for a provider that publishes none."),
		held: k({
			ran: D().describe("Whether the held turn got anywhere before it was refused, which is a different sentence from one refused at the door."),
			contextTokens: E().optional().describe("How much context a press that keeps the session re-reads once, on this account at the reset or carried to another. Absent when no usage frame measured it."),
			handoffTokens: E().optional().describe("What a press that opens a fresh session pays instead: the capped record plus the sandbox's measured brief, counted at the failure."),
			moving: T().optional().describe("The account the owner's policy is already moving this turn to, when it is; the surface then reports the move rather than offering a press.")
		}).optional().describe("Present when the daemon still holds the refused turn whole, so a press re-runs it rather than appending a message after it."),
		scheduled: D().optional().describe("Whether something other than the user is already booked to send this turn again, so the surface reports the wait instead of offering a press.")
	}), Th = Ch.extend({
		sessionId: T().optional().describe("The provider session behind the last turn, when there is one."),
		provider: pd.optional().describe("Which provider minted that session."),
		harness: hd.optional().describe("Which runtime minted it: a session resumes only on the loop that opened it."),
		account: T().optional().describe("Which stored account it belongs to, as the daemon resolved it. Absent when no stored account paid for the turn."),
		ending: wh.optional().describe("How the last turn ended, when it left work behind that one press finishes. Absent for a conversation whose last turn ended on its own, and for the failures that name something to repair first."),
		from: E().int().nonnegative().describe("Where the first message sits in the whole record, and the `before` that asks for the page above this one."),
		more: D().describe("Whether older messages precede this page.")
	}), k({
		title: T(),
		sharedAt: E(),
		detail: Xm,
		messages: O(xh)
	});
})), Dh, Oh, kh, Ah, jh, Mh = g((() => {
	L(), V(), km(), jm(), Nm(), Kd(), Ym(), xp(), Eh(), Dh = A("kind", [
		k({
			kind: N("session"),
			sessionId: T(),
			account: T().optional().describe("Which stored account this session belongs to, as the daemon resolved it for the turn.")
		}),
		k({
			kind: N("worktree"),
			branch: T(),
			base: T(),
			unenforced: D().optional(),
			sync: k({
				commits: E(),
				blocked: O(T())
			}).optional(),
			remote: T().optional()
		}),
		k({
			kind: N("landed"),
			landed: D(),
			conflicts: O(wm).optional(),
			held: D().optional(),
			deps: k({
				missing: E(),
				started: O(T()),
				deferred: D()
			}).optional()
		}),
		k({
			kind: N("preamble"),
			notes: O(yh)
		}),
		k({
			kind: N("init"),
			model: T()
		}),
		k({
			kind: N("checkpoint"),
			id: T(),
			index: E().int().nonnegative().optional()
		}),
		k({
			kind: N("steer"),
			text: T(),
			sentAt: E(),
			attachments: O(T()).optional()
		}),
		k({
			kind: N("delta"),
			text: T(),
			parentToolUseId: T().optional()
		}),
		k({
			kind: N("text_end"),
			parentToolUseId: T().optional()
		}),
		k({
			kind: N("thinking"),
			text: T(),
			parentToolUseId: T().optional()
		}),
		k({
			kind: N("tool_call"),
			id: T(),
			name: T(),
			category: tp,
			status: np,
			target: T().optional(),
			locations: O(rp).optional(),
			content: O(ip).optional(),
			parentToolUseId: T().optional()
		}),
		k({
			kind: N("tool_call_update"),
			id: T(),
			status: np.optional(),
			content: O(ip).optional(),
			locations: O(rp).optional()
		}),
		k({
			kind: N("terminal"),
			session: T()
		}),
		k({
			kind: N("browser"),
			session: T()
		}),
		k({
			kind: N("subagent"),
			id: T(),
			subagentKind: Um,
			agentType: T().optional(),
			description: T().optional(),
			model: T().optional(),
			provider: T().optional(),
			background: D().optional()
		}),
		k({
			kind: N("subagent_update"),
			id: T(),
			status: Wm.optional(),
			tokens: E().optional(),
			toolUses: E().optional(),
			lastTool: T().optional(),
			summary: T().optional(),
			error: T().optional(),
			verification: Gm.optional()
		}),
		k({
			kind: N("todos"),
			items: O($f)
		}),
		k({
			kind: N("commands"),
			items: O(Xf)
		}),
		k({
			kind: N("usage"),
			account: T().optional(),
			costUsd: E().optional(),
			inputTokens: E().optional(),
			outputTokens: E().optional(),
			cacheReadTokens: E().optional(),
			cacheCreationTokens: E().optional(),
			durationMs: E().optional(),
			numTurns: E().optional()
		}),
		Am.extend({
			kind: N("rate_limit_info"),
			account: T().optional()
		}),
		k({
			kind: N("fast_mode"),
			state: Mm,
			reason: T().optional()
		}),
		k({
			kind: N("tier"),
			tier: M(["fast", "standard"]),
			score: E(),
			rules: O(T()),
			model: T().optional(),
			routed: D(),
			held: D().optional()
		}),
		k({
			kind: N("provider_retry"),
			attempt: E(),
			maxAttempts: E().optional(),
			nextAttemptAt: E().optional(),
			status: E().optional()
		}),
		k({
			kind: N("account_usage"),
			account: T().optional(),
			windows: O(Nd)
		}),
		ep.extend({ kind: N("context_usage") }),
		k({
			kind: N("compact"),
			trigger: T(),
			preTokens: E().optional(),
			postTokens: E().optional()
		}),
		vp,
		yp,
		bp,
		k({
			kind: N("browser_help"),
			...up
		}),
		k({
			kind: N("terminal_help"),
			...dp
		}),
		k({
			kind: N("capability_offer"),
			...fp
		}),
		hp.extend({
			kind: N("capability_outcome"),
			requestId: T()
		}),
		k({
			kind: N("payment_offer"),
			...pp
		}),
		gp.extend({
			kind: N("payment_receipt"),
			requestId: T()
		}),
		k({
			kind: N("credential_offer"),
			...mp
		}),
		_p.extend({
			kind: N("credential_receipt"),
			requestId: T()
		}),
		k({
			kind: N("resolved"),
			requestId: T(),
			reply: Vd.optional()
		}),
		k({
			kind: N("mode"),
			mode: wd
		}),
		k({
			kind: N("error"),
			message: T(),
			code: M([
				"session-not-found",
				"rate_limit",
				"codex-advisory",
				"codex-reauth",
				"claude-reauth",
				"claude-token-refused",
				"claude-not-entitled",
				"provider-outage",
				"trial-unavailable",
				"trial-model-unavailable",
				"trial-exhausted",
				"unknown-command",
				"grok-model-invalid",
				"codex-model-invalid",
				"model-unavailable",
				"context-window-too-small",
				"subscription-required",
				"agent-busy",
				"sandbox-memory-low",
				"turn-cap",
				"harness-incomplete",
				"engine-version-floor"
			]).optional(),
			engine: k({
				id: T().describe("Which engine (e.g. claude)."),
				running: T().optional().describe("The version that was refused, when the provider named it."),
				floor: T().describe("The lowest version the provider will accept.")
			}).optional(),
			resetsAt: E().optional(),
			autoResume: M(["scheduled", "available"]).optional(),
			held: k({
				ran: D(),
				contextTokens: E().optional(),
				handoffTokens: E().optional(),
				moving: T().optional()
			}).optional(),
			outage: k({
				retryAt: E(),
				attempt: E(),
				maxAttempts: E()
			}).optional()
		}),
		k({ kind: N("done") })
	]), Oh = [
		"session",
		"worktree",
		"init",
		"terminal",
		"browser",
		"commands",
		"usage",
		"rate_limit_info",
		"fast_mode",
		"tier",
		"provider_retry",
		"account_usage",
		"context_usage",
		"mode",
		"error"
	], kh = Dh.options.filter((e) => Oh.includes(e.shape.kind.value)), Ah = A("kind", kh), jh = A("kind", [
		k({
			kind: N("attached").describe("The first frame, identifying the run you have joined and handing you its transcript so far."),
			run: T().describe("The run's id."),
			startedAt: E().describe("When it started, in milliseconds, so a window joining late can show how long it has been going."),
			seq: E().describe("How many frames the run has produced so far. A fact at or below this number is being replayed; a patch is never."),
			rows: O(xh).describe("The turn's rows as they stand: what was asked, and everything the agent has said and done since. Draw these, then apply the patches that follow.")
		}),
		k({
			kind: N("patch").describe("One change to the run's rows."),
			seq: E().describe("Its position in the run, counting from one."),
			patch: Sh
		}),
		k({
			kind: N("fact").describe("One thing about the turn that is not a row: its session, its branch, its cost, a failure."),
			seq: E().describe("Its position in the run, counting from one. At or below the head's number, it is being replayed."),
			fact: Ah
		}),
		k({ kind: N("end").describe("The run is over and every frame has been delivered. A stream that closes without this was dropped mid-run, so re-attach rather than assuming the turn finished.") })
	]);
})), Nh, Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh = g((() => {
	L(), Nh = M([
		"turn",
		"interval",
		"pre-restore",
		"restore",
		"user"
	]), Ph = k({
		id: T().describe("The saved point's id, which is what restoring and diffing take."),
		at: E().describe("When it was taken, in milliseconds."),
		trigger: Nh.describe("What caused it. The automatic between-turn captures are a safety net and are not listed; they dissolve into the next visible point's differences."),
		label: T().optional().describe("What to call it. For one taken before a turn, that turn's prompt.")
	}), Fh = k({ snapshots: O(Ph).describe("Every point you can go back to, newest first.") }), Ih = k({
		conversationId: T().min(1).describe("Which conversation to rewind."),
		index: E().int().nonnegative().describe("Which message to go back to, counting from the start. It is also how many messages survive: rewinding to the first keeps none of them and puts the files back to before it ran.")
	}), Lh = k({
		snapshot: T().optional().describe("The saved point the files were put back to. Absent for a conversation working in its own copy, whose rewind moved a branch rather than the shared timeline."),
		dropped: E().int().nonnegative().describe("How many messages were removed.")
	}), Rh = k({ id: T().min(1).describe("Which saved point.") }), zh = k({
		scope: T().describe("Which part of the workspace the path belongs to: the workspace root, or one of the repositories inside it."),
		path: T().describe("The path, relative to that scope."),
		status: M([
			"added",
			"modified",
			"deleted",
			"type-changed"
		]).describe("What happened to it.")
	}), Bh = k({ changes: O(zh).describe("Everything that differs between this saved point and the one before it.") }), Vh = k({
		id: T().min(1).describe("Which saved point."),
		scope: T().min(1).describe("Which part of the workspace the path belongs to."),
		path: T().min(1).describe("The file, relative to that scope.")
	}), Hh = k({
		beforeBytes: E().int().nonnegative().optional().describe("How big the before side is, in bytes. Absent when the file did not exist yet."),
		afterBytes: E().int().nonnegative().optional().describe("How big the after side is, in bytes. Absent when the file was deleted."),
		patch: T().optional().describe("The changed regions as unified-diff hunks (`@@` sections only). Absent when the change was too large to render even as a patch."),
		more: D().optional().describe("There were more changed regions than fit; the patch stops at a region boundary.")
	}), Uh = k({
		before: T().optional().describe("The whole file as it was. Absent when it did not exist yet, or when `partial` is set."),
		after: T().optional().describe("The whole file as it is now. Absent when it was deleted, or when `partial` is set."),
		binary: D().optional().describe("The file is not text, so neither side is sent."),
		partial: Hh.optional().describe("Set when the file was too large to send whole: what is sent instead of the two sides.")
	});
})), Gh, Kh = g((() => {
	z(), xp(), Mh(), V(), Wh(), Kd(), W(), Gh = {
		run: R.route({
			method: "POST",
			path: "/agent",
			summary: "Say something to an agent",
			description: "Starts a turn and answers immediately with its id; the work runs inside the sandbox whether or not anybody stays connected. Watch it by attaching. Naming a conversation that does not exist yet opens it."
		}).input(Ed).output(Ad),
		attach: R.route({
			method: "POST",
			path: "/agent/attach",
			summary: "Watch a turn happen",
			description: "Streams everything the agent does: its words, the tools it reaches for, and the answers it gets. Give it the point you have already seen and it replays from there before going live, so a reload loses nothing. The window that started the turn holds no special claim, and any number of watchers on any number of devices see the same thing."
		}).input(jd).output(Fu(jh)),
		reply: R.route({
			method: "POST",
			path: "/agent/reply",
			summary: "Answer a question the agent asked",
			description: "Un-parks a turn that is waiting on you: approving a plan, choosing between options, or permitting a tool. The turn picks up where it stopped."
		}).input(Vd).output(H),
		steer: R.route({
			method: "POST",
			path: "/agent/steer",
			summary: "Interrupt a running turn",
			description: "Slips a message into a turn already under way, without stopping it. This is how you redirect an agent mid-thought rather than waiting for it to finish being wrong."
		}).input(Hd).output(H),
		stop: R.route({
			method: "POST",
			path: "/agent/stop",
			summary: "Stop a turn now",
			description: "Cancels the running turn inside the sandbox. Whatever it had already written to disk stays written."
		}).input(Ud).output(H),
		resume: R.route({
			method: "POST",
			path: "/agent/resume",
			summary: "Run a refused turn again",
			description: "Sends the same turn again when the model provider's allowance refused it, with everything it originally carried except who serves it: the caller may name a different provider, harness or account, which is the usual answer to a spent allowance. It repeats the request rather than adding a new message to the conversation, so pressing it twice costs nothing and the agent is never told to continue work it has not started."
		}).input(Gd).output(Ad),
		rewind: R.route({
			method: "POST",
			path: "/agent/rewind",
			summary: "Go back to an earlier message",
			description: "Puts the files back as they stood at that point, drops every message after it, and forgets what the model remembered, so the next thing you say starts from there cleanly. Refused while a turn is running, because a restore cannot overwrite files an agent is editing, and refused for a message with no saved state to return to."
		}).input(Ih).output(Lh),
		commands: R.route({
			method: "GET",
			path: "/agent/commands",
			summary: "Shortcut commands the agent knows",
			description: "The commands a provider published the last time one of its turns ran, so a composer can offer them before this conversation has run anything. A running turn's own list wins over this one."
		}).input(Zf).output(Qf),
		refusals: R.route({
			method: "GET",
			path: "/agent/refusals",
			summary: "The last time each provider said no",
			description: "What each model provider most recently refused and why. Read this alongside an account's usage: the usage says how full it was when last checked, this says whether it has since started turning work away."
		}).output(Rd)
	};
})), qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg, cg, lg, ug = g((() => {
	L(), fd(), qh = M([
		"crash",
		"report",
		"detection"
	]), Jh = k({
		at: E().describe("When, in milliseconds."),
		kind: T().max(40).describe("What sort of thing it was: a console line, a request, a click, a route change."),
		message: T().max(300).describe("What it said, already truncated by the SDK.")
	}), Yh = k({
		email: T().max(320).optional().describe("An address they typed, to reach them about it. Unverified."),
		name: T().max(200).optional().describe("A name they typed. Unverified, and never identity.")
	}), Xh = 20, Zh = j(T().max(60), T().max(300)).refine((e) => Object.keys(e).length <= Xh, { message: `at most ${Xh} context entries` }), Qh = k({
		kind: qh.describe("A crash the SDK caught, something a person wrote in, or a problem the SDK noticed on its own."),
		message: T().min(1).max(1e3).describe("The error's own message, or the headline of what a person reported."),
		stack: T().max(2e4).optional().describe("The stack, verbatim from the browser."),
		url: T().max(2e3).optional().describe("Where it happened: the page's address, or a screen name in an app."),
		release: T().max(200).optional().describe("Which build it came from: a commit sha or a tag. With it the agent reads your real source rather than minified frames."),
		userAgent: T().max(400).optional().describe("What the browser said it was."),
		description: T().max(5e3).optional().describe("What the person typed, when a person is the one reporting."),
		reporter: Yh.optional().describe("Who says they are reporting it. Unverified by construction."),
		breadcrumbs: O(Jh).max(40).optional().describe("What happened just before, oldest first."),
		context: Zh.optional().describe("Whatever else the app attached: a route, a version, a locale."),
		fingerprint: T().max(200).optional().describe("Group by this instead of by the stack, when your app knows better than the stack does.")
	}), k({
		report: Qh,
		clientId: T().min(1).max(200).describe("The SDK's own id for this browser. Not a secret: it is what the rate limit counts against."),
		powNonce: T().max(400).optional(),
		key: T().max(200).optional()
	}), $h = M([
		"open",
		"investigating",
		"resolved",
		"ignored"
	]), eg = k({
		conversationId: T().describe("The conversation this run became."),
		at: E().describe("When it started, in milliseconds."),
		atCount: E().describe("How many times it had happened when this run started.")
	}), tg = k({
		kind: qh,
		title: T().min(1).max(300).describe("The one line this is listed under."),
		culprit: T().max(300).optional().describe("The frame it came from, when the stack named one."),
		automationId: B.describe("Which intake received it."),
		origin: T().max(400).optional().describe("Which site it came from."),
		firstSeen: E().describe("When it first happened, in milliseconds."),
		lastSeen: E().describe("When it last happened, in milliseconds."),
		count: E().describe("How many times this exact thing has arrived."),
		status: $h.default("open").describe("Where it stands with you."),
		statusAt: E().optional().describe("When the status last changed, in milliseconds."),
		release: T().max(200).optional().describe("The build the latest one came from."),
		sample: Qh.describe("The most recent one, in full."),
		firedAt: E().optional().describe("What the count stood at the last time this woke an agent."),
		runs: O(eg).max(20).optional().describe("The turns started for it.")
	}), ng = tg.extend({ id: B.describe("The issue's id, which is its fingerprint.") }), rg = k({
		issues: O(ng).describe("The inbox, most recently seen first."),
		invalid: O(T()).describe("Files in the issues directory that could not be read at all.")
	}), ig = k({ id: B.describe("Which issue.") }), ag = k({
		id: B.describe("Which issue."),
		status: M([
			"open",
			"resolved",
			"ignored"
		]).describe("Where it now stands with you.")
	}), og = k({
		keyFromBrowsers: D().optional().describe("Let a browser report with the key alone, rather than only from a site you listed. Off unless you need it."),
		dailyReportMax: E().int().positive().optional().describe("How many reports a day this intake accepts at all."),
		escalateAfter: E().int().positive().optional().describe("How many more times a known crash must happen before it wakes an agent again."),
		antiBot: M(["pow"]).optional().describe("Make a person's browser solve a small puzzle before it accepts a written report."),
		title: T().max(80).optional().describe("The dialog's heading."),
		prompt: T().max(300).optional().describe("The line above the box they type in."),
		thanks: T().max(300).optional().describe("What it says once they have sent it."),
		askEmail: D().optional().describe("Ask for an address to reply to. Optional for them either way."),
		accent: T().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		captureCrashes: D().optional().describe("Catch uncaught errors automatically, as well as what people write in.")
	}), k({
		automationId: T(),
		title: T(),
		prompt: T(),
		thanks: T(),
		askEmail: D(),
		accent: T(),
		captureCrashes: D(),
		antiBot: M(["pow", "off"])
	}), k({
		ok: N(!0),
		id: T()
	}), sg = k({
		origin: T(),
		allowed: D(),
		lastSeenAt: E(),
		loads: E()
	}), cg = k({ origins: O(sg) }), lg = k({ automationId: B.describe("Which intake.") });
})), dg, fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg = g((() => {
	L(), V(), km(), fd(), ug(), dg = M([
		"turn.settled",
		"agent.landed",
		"deps.broken",
		"deps.fixed"
	]), k({
		event: dg,
		agentId: T(),
		title: T().optional(),
		branch: T(),
		outcome: M([
			"landed",
			"conflict",
			"ready",
			"idle",
			"error"
		]),
		repos: O(k({
			repo: T(),
			from: T(),
			dir: T()
		})),
		deps: k({
			project: T(),
			command: T(),
			exitCode: E(),
			attempt: E(),
			logTail: T()
		}).optional()
	}), fg = A("kind", [
		k({
			kind: N("schedule").describe("On a clock."),
			cron: T().min(1).describe("When, in cron notation."),
			afterSessions: E().int().positive().optional().describe("Fire only once at least this many new sessions have been run since the last wake. A due run short of that is skipped, and says how far off it is.")
		}),
		k({
			kind: N("event").describe("When something calls its webhook."),
			dailyMax: E().int().positive().optional().describe("How many webhook calls a day may wake the agent, across every caller. Absent is a modest default rather than unlimited.")
		}),
		k({
			kind: N("listener").describe("When a message arrives from somewhere outside."),
			provider: T().min(1).describe("Which service to listen to."),
			channelId: T().min(1).optional().describe("Narrow it to one channel or thread."),
			eventType: T().min(1).optional().describe("Narrow it to one kind of event."),
			mentioned: D().optional().describe("Only when the agent is actually addressed, rather than on everything said in earshot."),
			branch: T().min(1).optional().describe("Narrow it to one branch, for the sources that have branches. Absent means every branch of the repositories it matches."),
			allowedOrigins: O(T()).optional().describe("Which websites may reach the public endpoint, the chat widget's or the bug reporter's. Absent or empty admits nobody.")
		}),
		k({
			kind: N("workspace").describe("When something happens to the files or the repositories."),
			event: dg.describe("Which happening."),
			repo: T().min(1).optional().describe("Narrow it to one repository. Absent means any of them.")
		})
	]), pg = k({
		access: M(["public", "google"]).optional().describe("Who may write to it. Absent means anyone, which is the anonymous support box it looks like."),
		requireName: D().optional().describe("Ask a visitor for a name first. Cosmetic: the name is typed, so it reaches the model as something a stranger said, never as identity."),
		antiBot: M(["turnstile", "pow"]).optional().describe("How to keep bots out: a third-party check that needs the site's own keys, or a puzzle the sandbox sets and the widget solves, so a site with no such account still has something. Absent leaves the site allowlist and the rate limit as the whole boundary."),
		turnstileSiteKey: T().optional().describe("The public half of those keys, which ships to the visitor's browser."),
		turnstileSecret: T().optional().describe("The private half, which the sandbox keeps and the widget never sees."),
		googleClientId: T().optional().describe("The site's own sign-in client id. It cannot be ours: a sign-in is only issued to an approved origin, and no single client can list every customer's domain."),
		title: T().max(80).optional(),
		greeting: T().max(500).optional(),
		accent: T().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		position: M([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]).optional(),
		dailyMessageMax: E().int().positive().optional(),
		conversationMessageMax: E().int().positive().optional(),
		sessionTtlMinutes: E().int().positive().optional()
	}), k({
		automationId: T(),
		title: T(),
		greeting: T(),
		accent: T(),
		position: M([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]),
		access: M(["public", "google"]),
		requireName: D(),
		antiBot: M([
			"turnstile",
			"pow",
			"off"
		]),
		turnstileSiteKey: T().optional(),
		googleClientId: T().optional()
	}), k({
		salt: T(),
		difficulty: E().int().positive()
	}), k({
		conversationId: T().min(1).max(200),
		content: T().min(1),
		displayName: T().max(200).optional(),
		idToken: T().optional(),
		turnstileToken: T().optional(),
		powNonce: T().optional(),
		history: O(k({
			author: T().optional(),
			content: T()
		})).max(50).optional()
	}), k({
		replies: O(k({
			seq: E(),
			at: E(),
			text: T()
		})),
		cursor: E()
	}), mg = k({
		label: T().max(60).optional().describe("What to call these people on screen."),
		ids: O(T().min(1).max(200)).max(200).optional().describe("Sender ids, as the service names them, never display names."),
		groups: O(T().min(1).max(200)).max(50).optional().describe("Group ids the service reports on a sender, a Discord role. Only for a source whose messages carry them."),
		actsAs: B.optional().describe("Which persona their wakes speak as. Absent is no persona: the full toolbox, reaching no account."),
		requireApproval: D().optional().describe("Hold their wakes for a person, even when the automation itself does not.")
	}).refine((e) => (e.ids?.length ?? 0) + (e.groups?.length ?? 0) > 0, { message: "a sender rule must name at least one id or group" }), hg = k({
		rules: O(mg).max(50).describe("Walked in order; the first rule naming the sender decides."),
		others: M([
			"allow",
			"hold",
			"ignore"
		]).describe("What a sender no rule names gets: the automation as configured, a hold for a person, or nothing at all.")
	}), gg = k({
		id: B.describe("The automation's id."),
		trigger: fg.describe("What sets it off: a schedule, an event in the workspace, a message arriving from outside, or a webhook."),
		guard: T().min(1).optional().describe("A command run before the wake that decides whether there is anything to do. Skipped by the guard is often the most useful thing an automation can report."),
		prompt: T().min(1).describe("What the woken agent is told."),
		webchat: pg.optional().describe("Settings for the public chat widget, for an automation that answers visitors."),
		issues: og.optional().describe("Settings for the bug reporter, for an automation that takes crash reports from your own sites and apps."),
		allowedTools: O(T().min(1)).optional().describe("Narrow the woken turn to these tools. For one driven by an outside message this list is the real boundary, because prompt wording is only advice and an empty toolbox is not."),
		models: O(kd).min(1).max(10).describe("Which models this automation may run on, best first. Required, and nothing is chosen for you: work that fires while nobody is watching spends a real allowance, so it names the models it spends rather than inheriting one. Tried in order, so a spent account does not silently stop the job."),
		account: T().optional().describe("Which account pays for it."),
		actsAs: B.optional().describe("Which persona it speaks as. An unwatched turn naming none reaches no signed-in account at all."),
		senders: hg.optional().describe("Who may talk to it, and as whom: rules by sender id or group, each naming the persona those people get, plus what everyone else gets. Absent admits everyone the trigger's filters do."),
		requireApproval: D().optional().describe("Hold every fire for a person instead of running it. Only a person can release one of those."),
		holdForSeconds: E().optional().describe("Hold each fire this long before running it anyway, which is a delay rather than a decision."),
		chore: D().optional().describe("This automation is a maintenance job, which is what files it under chores rather than among ordinary automations."),
		enabled: D().describe("Whether it fires at all.")
	}), _g = k({
		id: B.describe("This waiting item's own id, which approving and rejecting take."),
		automationId: T().describe("Which automation it came from."),
		payload: T().optional().describe("What set it off, kept whole so an approved wake carries the same thing it would have had. Absent for one on a schedule, which carries nothing."),
		origin: yd.optional().describe("Where the message came from, kept alongside the payload so an approved wake appears on the board exactly as an automatic one would have."),
		title: T().optional().describe("What the conversation would be called."),
		conversationId: T().optional().describe("The thread this belongs to, when it has one, so approving continues that conversation rather than opening a new one. Without it, one visitor's chat becomes a card per approved message and an agent that meets them again every turn."),
		sessionId: T().optional().describe("The provider session that thread last ran on."),
		thread: T().optional().describe("Which inbound thread this belongs to, so the approved run continues that thread's memory rather than a fresh one."),
		actsAs: B.optional().describe("Which persona the approved run speaks as, decided when it was held."),
		createdAt: E().describe("When it started waiting, in milliseconds."),
		autoRunAt: E().optional().describe("When it goes ahead on its own, in milliseconds, for a hold that is only a delay. Absent for one that genuinely waits on a person.")
	}), vg = k({
		agents: O(rm).describe("The conversations."),
		rev: E().describe("Which version of the fleet this is. The fleet is published as whole snapshots, so without a version a list read before a change but delivered after it would silently undo that change. Drop any list older than the newest you have already applied."),
		held: O(_g).default([]).describe("Automations waiting at the door for a yes, put alongside the running conversations so needs-you sits beside working rather than on a page nobody opens.")
	}), yg = k({ approvals: O(_g).describe("Everything waiting for a yes.") }), bg = k({ id: T().describe("Which waiting item.") }), xg = k({
		at: E(),
		outcome: M([
			"completed",
			"skipped",
			"error",
			"interrupted"
		]),
		detail: T().optional(),
		conversationId: T().optional()
	}), Sg = gg.extend({
		runs: O(xg),
		nextRun: E().optional(),
		webhookToken: T().optional().describe("What a caller presents at /automations/{id}/fire, for an event automation. Shown to a maintainer or the owner only."),
		ingestKey: T().optional().describe("What a client with no website origin presents to a bug intake. Shown to a maintainer or the owner only.")
	}), Cg = k({ automations: O(Sg) }), wg = k({
		id: T().describe("The sender id the service vouches for, what a rule stores."),
		name: T().describe("What they were called on their last message, for display only."),
		groups: O(T()).optional().describe("The group ids the service reported on their last message, a Discord role list."),
		firstSeenAt: E().describe("When they first reached an automation here, in milliseconds."),
		lastSeenAt: E().describe("When they last did, in milliseconds."),
		messages: E().describe("How many of their messages reached an automation's filters, admitted or not.")
	}), Tg = k({ senders: O(wg).describe("Newest first.") }), Eg = k({ provider: T().min(1).describe("Which listener source.") }), Dg = k({ id: T() }), Og = k({
		id: T(),
		enabled: D()
	}), kg = k({
		label: T().min(1),
		placeholder: T().min(1),
		hint: T().min(1).optional()
	}), Ag = k({
		provider: T().min(1),
		label: T().min(1),
		logo: T().min(1).optional(),
		icon: T().min(1).optional(),
		events: O(k({
			value: T().min(1),
			label: T().min(1)
		})),
		channel: kg,
		branchField: kg.optional(),
		sender: kg.optional(),
		senderGroup: kg.optional(),
		mentionLabel: T().min(1).optional(),
		starterPrompt: T().min(1).optional(),
		requires: O(T().min(1)).default([]),
		enabled: D()
	}), jg = M(["create", "configure"]), Mg = k({
		id: T().min(1),
		title: T().min(1),
		logo: T().min(1).optional(),
		icon: T().min(1).optional(),
		requires: O(T().min(1)).default([]),
		trigger: fg,
		guard: T().min(1).optional(),
		holdForSeconds: E().int().positive().optional(),
		prompt: T().min(1),
		note: T().min(1).optional(),
		setup: T().min(1).optional(),
		description: T().min(1).optional(),
		offer: jg.optional(),
		chore: D().optional()
	}), Ng = k({
		sources: O(Ag),
		templates: O(Mg)
	});
})), Fg, Ig, Lg, Rg, zg, Bg, Vg, Hg, Ug, Wg, Gg, Kg, qg = g((() => {
	L(), V(), Fg = M(["github", "gitlab"]), Ig = M([
		"queued",
		"running",
		"success",
		"failed",
		"canceled",
		"skipped"
	]), Lg = k({
		repo: T().describe("Which workspace repository it belongs to."),
		host: Fg.describe("Which forge is running it."),
		project: T().describe("The project there, as that forge names it."),
		runId: E().describe("The forge's own id for the run, which is what re-running and cancelling take."),
		title: T().optional().describe("The run's headline, usually the commit subject or the pull request's title. Absent means falling back to the branch and commit."),
		authorName: T().optional().describe("Who the forge credits for setting it off."),
		authorAvatarUrl: T().optional().describe("Their picture, hosted by the forge. Absent means drawing their initials instead."),
		trigger: T().optional().describe("What set it off, in the forge's own word rather than flattened into a shared vocabulary, because the forge's word is the precise one."),
		branch: T().describe("Which branch."),
		sha: T().describe("Which commit."),
		status: Ig.describe("How it is going. Queued means the forge has accepted it and nothing is executing it yet, which is a different thing to wait on than a run actually in progress."),
		url: T().describe("Its page on the forge."),
		createdAt: E().describe("When it started, in milliseconds."),
		durationSeconds: E().optional().describe("How long it took."),
		failedJobs: O(T()).optional().describe("What broke, by name. Fetched only for failed runs, so that a notification or a screen can say what went wrong rather than just that something did.")
	}), Rg = k({
		name: T().describe("The job's name."),
		status: Ig.describe("How it went."),
		stage: T().optional().describe("Which stage it belongs to, where the pipeline groups its jobs that way."),
		needs: O(T()).optional().describe("Which jobs in this run it declared it waits on: the real shape of the pipeline. Absent means nothing could be read, which is different from an empty list, which is the claim that it waits on nothing."),
		startedAt: E().optional().describe("When it began, in milliseconds. Absent while it is queued."),
		finishedAt: E().optional().describe("When it ended, in milliseconds."),
		durationSeconds: E().optional().describe("How long it took."),
		webUrl: T().optional().describe("Its page on the forge, which is the shortest path from this step failed to the log that says why.")
	}), zg = k({ jobs: O(Rg).describe("The steps inside one run. Fetched separately from the run list, so that list stays cheap.") }), Bg = k({
		repo: T().describe("Which workspace repository."),
		host: Fg.describe("Which forge it lives on."),
		project: T().describe("The project there."),
		url: T().describe("Its page on the forge."),
		hookWarning: T().optional().describe("Present when the sandbox could not register for instant notifications, with what happened. Without them the sandbox polls instead, so this costs a couple of minutes' delay rather than the feature."),
		hookRecipe: T().optional().describe("What to paste into the repository's webhook settings by hand, secret included. Shown to a maintainer or the owner only.")
	}), Vg = k({
		repos: O(Bg).describe("Which workspace repositories are wired to a forge, and how each one's notifications are set up."),
		runs: O(Lg).describe("Runs across all of them, newest first.")
	}), Hg = k({
		repo: T().describe("Which workspace repository. The project behind it is resolved fresh each call, so a stale screen cannot act on one the workspace no longer maps to."),
		runId: E().describe("Which run, by the forge's own id.")
	}), Ug = Hg.extend({
		pick: Dd.describe("Which model to open the conversation on, when somebody chose one. Leave it out for the sandbox's own choice, which is the ordinary path."),
		mode: M(["continue", "start-over"]).optional().describe("What to do about the attempt already made at this run, when there is one. `continue` carries on in that conversation; `start-over` stops it if running, files it away, and opens the next attempt on a clean worktree. Leave it out for the plain press: an attempt that ended is continued, a fresh failure gets attempt 1, and one still in play answers CONFLICT with why."),
		force: D().optional().describe("Open the conversation even when every failed job died in its runner's own setup, which is the fleet's fault and nothing an agent on the code can repair. Left out, such a run is refused with that sentence.")
	}), Wg = k({ conversationId: T().describe("The conversation that was opened, already holding the failure. Open it to watch, or attach to its turn.") }), Gg = M([
		"idle",
		"running",
		"passed",
		"failed",
		"error",
		"cancelled"
	]), Kg = k({
		status: Gg.describe("Where the run is. Failed and error are deliberately different: failed means the code is wrong, error means the command could not be run at all, and calling the second one a test failure would send an agent hunting a bug that is not there."),
		command: T().describe("What actually ran, echoed here rather than read back from the settings, so a result looked at after the setting changed still says what produced it."),
		startedAt: E().optional().describe("When it began, in milliseconds."),
		finishedAt: E().optional().describe("When it ended, in milliseconds."),
		exitCode: E().optional().describe("How the command exited."),
		timedOut: D().optional().describe("It was killed for taking too long rather than finishing."),
		session: T().optional().describe("The terminal it runs in, which is where to watch it. Absent where the sandbox has no terminals, in which case there is nothing to attach to."),
		output: T().describe("The end of what it printed, as plain text with the colour codes and redrawn progress lines resolved away. The end rather than the beginning, because a suite's verdict is at the end. Empty while it runs, and for one that was killed.")
	});
})), Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_, c_, l_, u_, d_, f_, p_, m_, h_, g_, __, v_, y_, b_, x_, S_, C_, w_, T_, E_, D_, O_, k_, A_, j_, M_, N_, P_, F_ = g((() => {
	L(), V(), km(), qg(), fd(), W(), Jg = M([
		"staged",
		"unstaged",
		"conflicted"
	]), Yg = k({
		side: Jg.optional().describe("Narrow to one of the three lists a repository's changes split into. Leave it out for all of them, which is the whole repository."),
		origin: T().min(1).optional().describe("Narrow to the files one conversation landed. Leave it out for everyone's, including your own edits.")
	}), Xg = 1e3, Zg = O(T().min(1)).max(Xg).describe("Exactly these repository-relative paths. For anything bigger than a hand-picked selection, describe a scope instead."), Qg = k({
		paths: Zg.optional(),
		scope: Yg.optional().describe("What to act on, described rather than listed, so it covers every matching file in the repository and not just the ones a list could hold.")
	}), $g = { message: "name paths or a scope, not both" }, e_ = (e) => e.paths === void 0 || e.scope === void 0, t_ = U.extend({
		message: T().min(1).describe("The commit message."),
		stage: Qg.refine(e_, $g).optional().describe("What to stage before committing. Leave it out to record the index exactly as it stands; give it an empty object to stage everything first.")
	}), n_ = U.extend(Qg.shape).describe("What to throw away. Neither paths nor a scope discards every uncommitted change in the repository.").refine(e_, $g), r_ = U.extend(Qg.shape).describe("What to move across the index. Nothing on disk changes either way.").refine(e_, $g), i_ = U.extend({ branch: T().min(1).optional().describe("Which branch to push. Leave it out for the checked-out one. A branch with no upstream yet gets one set on this push.") }), a_ = M([
		"hook",
		"remote",
		"transport"
	]), o_ = Kg.extend({
		repo: T().describe("The repository this run is about, the same id the routes take."),
		reason: T().optional().describe("Why not, in git's own words: the last verdict line, for a row that has room for one line. The whole tail is `output`."),
		refusedBy: a_.optional().describe("Who refused a failed push: this repository's pre-push hook (the code is wrong, a fix is worth proposing), the remote (pull first), or the transport (credentials, network: retry). Absent while it runs and for a push that went.")
	}), s_ = U.extend({ path: T().min(1).describe("The file to read, relative to the repository root.") }), c_ = U.extend({
		path: T().min(1).describe("Where to write, relative to the repository root. Missing folders are created."),
		content: T().describe("The file's whole new contents.")
	}), l_ = U.extend({
		path: T().min(1).describe("The file, relative to the repository root."),
		side: Jg.describe("Which comparison you want. A file that is staged and then edited again has genuinely different answers for each, which is why this is required rather than assumed.")
	}), u_ = k({
		branch: T().describe("The checked-out branch."),
		dirty: D().describe("Whether anything is uncommitted."),
		files: O(T()).describe("Every path with something pending, staged or not.")
	}), d_ = k({ files: O(T()).describe("Every path git tracks, relative to the repository root. Ignored and untracked files are not here.") }), f_ = k({
		path: T().describe("The path, as asked for."),
		content: T().describe("The file's contents as they stand on disk.")
	}), k({ repo: T().min(1).describe("Which repository.") }).extend(Qg.shape).refine(e_, $g), p_ = k({
		path: T().describe("The path, relative to the repository root. For a rename this is the new one."),
		status: M([
			"added",
			"modified",
			"deleted",
			"renamed",
			"type-changed",
			"conflicted"
		]).describe("What happened to it. Conflicted is not a kind of edit: nothing can be committed anywhere in the repository while one exists."),
		from: T().optional().describe("Where a renamed file came from."),
		additions: E().optional().describe("Lines added. Absent for a binary file, and for an untracked one, which has nothing to compare against."),
		deletions: E().optional().describe("Lines removed. Absent for the same reasons additions is."),
		code: k({
			additions: E(),
			deletions: E()
		}).optional().describe("The same +/− with every comment stripped from both sides, which is what a review shows beside a diff that opens on code alone. Absent when the file cannot be read that way (binary, too large, or a language this build ships no grammar for): git's own counts above are then the reading.")
	}), m_ = k({
		remote: T().optional().describe("The remote this branch pushes to. Absent means none is configured. In a fork with two remotes, pushing to the wrong one succeeds and leaves the count stuck, which is why this says which."),
		branch: T().optional().describe("The checked-out branch. Absent when the repository is on a bare commit, or has no commits yet."),
		upstream: T().optional().describe("The branch on the remote this one follows. Absent means the next push will publish it."),
		ahead: E().describe("Commits you have that the remote does not."),
		behind: E().describe("Commits the remote has that you do not, as of the last fetch. Fetch before trusting it.")
	}), h_ = k({
		name: T().describe("The branch name."),
		current: D().describe("Whether this is the one checked out."),
		upstream: T().optional().describe("The branch on the remote it follows, if any."),
		ahead: E().describe("Commits this branch has that its remote counterpart does not."),
		behind: E().describe("Commits its remote counterpart has that it does not."),
		gone: D().optional().describe("The branch it followed no longer exists on the remote, usually because a merged pull request deleted it. The signal that this one is safe to delete."),
		at: E().describe("When its tip was committed, in milliseconds. Lists are newest first.")
	}), g_ = k({
		name: T().describe("The full name, such as origin/main."),
		remote: T().describe("Just the remote part, so a picker can group by it without re-parsing."),
		branch: T().describe("Just the branch part."),
		at: E().describe("When its tip was committed, in milliseconds, as this repository last saw it.")
	}), __ = k({
		branches: O(h_).describe("Branches in this repository."),
		remotes: O(g_).describe("Branches on its remotes, as last seen. Sent together with the locals so a switcher never draws a half-filled list.")
	}), v_ = U.extend({
		name: ud.describe("The new branch's name."),
		start: T().min(1).optional().describe("Where to start it: a commit or another branch. Leave it out to start from where you are."),
		checkout: D().optional().describe("Switch to it as well as creating it.")
	}), y_ = U.extend({
		name: ud.describe("The branch to delete."),
		force: D().optional().describe("Delete it even though it holds work that was never merged. The deliberate retry after the first attempt refuses.")
	}), b_ = M([
		"merge",
		"rebase",
		"cherry-pick",
		"revert"
	]), x_ = k({
		repo: T().describe("The repository asked about."),
		operation: b_.optional().describe("Which operation the working tree is stuck inside. Absent means it is not stuck at all, which is almost always. While one is present git refuses nearly everything else, and abandoning it is the only way out.")
	}), S_ = k({
		repo: T(),
		branch: T().optional().describe("The checked-out branch. Absent in a repository that has no commits yet."),
		conflicted: O(p_).describe("Paths a merge or rebase could not finish. First, because nothing anywhere in this repository can be committed until they are resolved. Held apart from the two lists below, because staged or not is not a question one of these has an answer to."),
		operation: b_.optional().describe("What halted, when something did. This is the sentence that explains the conflicts above and names the way out of them."),
		staged: O(p_).describe("What a plain commit would record right now."),
		unstaged: O(p_).describe("Edits on disk that are not staged, plus untracked files. A path can be in both lists at once with different line counts, which is why they are separate."),
		truncated: k({
			staged: E().describe("Staged changes not listed above."),
			unstaged: E().describe("Unstaged changes not listed above.")
		}).optional().describe("How many changes were cut from each of the two lists above. A freshly cloned monorepo or a mass delete runs to six figures, which no screen can draw, so past a budget the lists arrive short and this says by how much on each side. Absent means they are complete."),
		remote: m_.optional().describe("Where this repository stands against its remote."),
		origins: j(T(), O(T())).optional().describe("Which conversation put each path here, newest first, keyed by path. Only work that went through a merge can appear: edits made in the shared tree, in a terminal, or by a person are simply absent rather than guessed at."),
		error: T().optional().describe("Why the repository could not be read at all, in git's own words. A repository left broken by a failed import arrives with empty lists and this set, rather than vanishing from the answer with nothing to act on.")
	}), C_ = k({
		title: T().optional().describe("The conversation's title. Absent for one that never got as far as having a title."),
		provider: pd.describe("Which model provider it ran on."),
		landedMessage: $p.optional().describe("What the merged work did, drafted by the conversation itself. Carried here as well as on its card, because merged lines outlive the card: archiving a finished conversation does not uncommit its work.")
	}), w_ = k({
		repos: O(S_).describe("One entry per repository that has something pending, is out of step with its remote, or could not be read. A clean repository is simply absent."),
		originAgents: j(T(), C_).optional().describe("Who each conversation named above is, keyed by id, so a caller need not look them up. Absent when nothing in the review can be attributed."),
		committing: O(T()).optional().describe("Repositories with a commit running right now. The sandbox's answer rather than any one tab's, so a reload, a second window and another device all know. Absent means nothing is committing.")
	}), T_ = k({
		committed: D().describe("Whether a commit was actually recorded."),
		changes: S_.optional().describe("What this repository looks like now, read in the same breath as the commit so a caller can redraw from here instead of asking for a fresh scan. Absent means there is nothing left to show."),
		originAgents: j(T(), C_).optional().describe("Who the conversations named in those changes are. Merge it over what you already hold rather than replacing: other repositories still name their own.")
	}), E_ = k({
		dir: T().describe("Where the package lives, relative to its repository. Empty when the repository is itself one package."),
		name: T().describe("The name the package declares for itself.")
	}), D_ = k({
		repo: T().describe("Which repository."),
		modules: O(E_).describe("Its packages.")
	}), O_ = k({ repos: O(D_).describe("Every repository with the packages inside it.") }), k_ = p_.extend({ landed: D().describe("Whether your workspace already holds this content. Read from the tree at request time, not from what a land recorded: discard a landed file in the Changes panel and this goes back to false, which is what puts it back under Land now.") }), A_ = k({
		repo: T().describe("Which repository."),
		branch: T().optional().describe("The branch this conversation's work sits on."),
		changes: O(k_).describe("What it changed there."),
		modules: O(E_).describe("The packages of the tree these changes came from, so a review can group by package. Carried with the changes rather than looked up separately, because a package the conversation has just created exists only in its own copy and the shared tree has never heard of it.")
	}), j_ = k({
		repos: O(A_).describe("One entry per repository the conversation touched."),
		absorbed: E().describe("How many of this conversation's files your own history already carries, and which are therefore not listed as differences any more."),
		conflicts: O(wm).optional().describe("Why the last merge refused, when one did. Carried here as well as in the merge's own answer, because a conflict is found the moment a turn ends and dealt with hours later on this surface, which would otherwise open with nothing to explain what it promised to resolve.")
	}), M_ = k({
		sha: T().describe("The commit."),
		short: T().describe("Its abbreviated hash, which is what a reader recognises it by."),
		subject: T().describe("Its first line."),
		author: T().describe("Who committed it."),
		at: E().describe("When it was authored, in milliseconds."),
		changes: O(p_).describe("The conversation's files that this commit is the newest carrier of, as the conversation changed them. Every file appears under exactly one commit, so these counts add up to the work rather than over-counting a file that history touched twice.")
	}), N_ = k({
		repo: T().describe("Which repository."),
		commits: O(M_).describe("The commits carrying this conversation's work there, newest first."),
		modules: O(E_).describe("The packages of the tree these files came from, so a review can group them by package.")
	}), P_ = k({
		repos: O(N_).describe("One entry per repository holding committed work of this conversation."),
		unaccounted: E().describe("How many of the conversation's absorbed files none of these commits carries. Above zero means its content reached your main line by some other road, so the commits listed are not the whole story.")
	});
})), I_, L_ = g((() => {
	z(), Eh(), km(), Pg(), F_(), Wh(), W(), I_ = {
		list: R.route({
			method: "GET",
			path: "/agents",
			summary: "Every live conversation",
			description: "The fleet as the board draws it: each conversation with its title, what it is doing, when it last moved and whether anybody has read it since. Archived conversations are not in here."
		}).output(vg),
		archived: R.route({
			method: "GET",
			path: "/agents/archived",
			summary: "Conversations put away",
			description: "The same shape as the live fleet, for the conversations somebody has decided are finished. Their work is kept, and any one of them can be brought back."
		}).output(vg),
		search: R.route({
			method: "GET",
			path: "/agents/search",
			summary: "Find a conversation",
			description: "Searches the live fleet and the archive together. Both halves on purpose: the board hides finished work by design, and a filter that says it found nothing while the answer sits one click away is simply wrong."
		}).input(dm).output(hm),
		get: R.route({
			method: "GET",
			path: "/agents/{id}",
			summary: "One conversation's card",
			description: "Everything the board shows for a single conversation: its title, state, working branch, unread marker and timestamps."
		}).input(im).output(rm),
		transcript: R.route({
			method: "GET",
			path: "/agents/{id}/transcript",
			summary: "One page of a conversation",
			description: "The most recent turns of one conversation, in order, including the tool calls and their results: what the chat replays and the next turn is seeded from. A page, not the whole record — pass the answer's `from` back as `before` to walk further back, until `more` reads false."
		}).input(am).output(Th),
		place: R.route({
			method: "POST",
			path: "/agents/{id}/place",
			summary: "Put words in the agent's mouth",
			description: "Writes a line into the record as though the agent had said it, with no turn behind it and no reply. Human readers see it marked as placed. The next real turn starts fresh from the record, where the line reads as the agent's own. Refused while a turn is running."
		}).input(_m).output(H),
		rename: R.route({
			method: "POST",
			path: "/agents/{id}/rename",
			summary: "Retitle a conversation",
			description: "Sets the title a person chose, replacing the one that was generated. Allowed while the conversation is working, and it does not count as activity."
		}).input(gm).output(rm),
		autoLand: R.route({
			method: "POST",
			path: "/agents/{id}/auto-land",
			summary: "Whether this conversation merges its work automatically",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to go back to following the default. Deliberately allowed mid-turn, because the setting is read when the turn finishes, so flipping it while the agent works means exactly hold this piece of work for review."
		}).input(vm).output(rm),
		resumeAfterOutage: R.route({
			method: "POST",
			path: "/agents/{id}/resume-after-outage",
			summary: "Whether this conversation retries after a provider outage",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. This is what the offer shown when a turn dies writes, because the press happens inside one conversation and honestly means finish this piece of work."
		}).input(ym).output(rm),
		resumeAfterLimit: R.route({
			method: "POST",
			path: "/agents/{id}/resume-after-limit",
			summary: "Whether this conversation sends itself again when its allowance comes back",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. Off unless asked for, because the allowance is the user's own budget and a turn that spends it the moment it reopens is not a decision to make on their behalf."
		}).input(bm).output(rm),
		moveAfterLimit: R.route({
			method: "POST",
			path: "/agents/{id}/move-after-limit",
			summary: "Whether this conversation moves to another account when its allowance is spent",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. A move spends a second account of the same provider on this conversation's behalf, so it is off unless asked for."
		}).input(xm).output(rm),
		seen: R.route({
			method: "POST",
			path: "/agents/{id}/seen",
			summary: "Mark a conversation read",
			description: "Stamps the read marker behind the unread badge on one card. Allowed while the conversation is working, and reading never counts as activity."
		}).input(im).output(rm),
		stopWatching: R.route({
			method: "POST",
			path: "/agents/{id}/stop-watching",
			summary: "Stop every condition watch a conversation is parked on",
			description: "Disarms all of this conversation's outside-condition watches, so none of them will wake it. All of them rather than one, because that is what the press means when it is made about a card. Nothing else about the conversation changes."
		}).input(im).output(rm),
		seenAll: R.route({
			method: "POST",
			path: "/agents/seen",
			summary: "Mark every conversation read",
			description: "Clears the unread badge across the whole fleet at once, and hands the refreshed list back."
		}).output(vg),
		diff: R.route({
			method: "GET",
			path: "/agents/{id}/diff",
			summary: "Everything a conversation has changed",
			description: "One flat set of changed files per repo, measured against where each repo stood when the conversation started, with every file flagged as already merged or not. Not the staged-and-unstaged shape a working copy has, because nobody ever checks this branch out to stage into it."
		}).input(im).output(j_),
		history: R.route({
			method: "GET",
			path: "/agents/{id}/history",
			summary: "Where a conversation's committed work lives",
			description: "The commits in your own history that carry this conversation's work, with the files each one brought. Use it when the change list is empty or short because you already committed what it wrote: those files are not differences against the main line any more, so they are not in the review, and this is where they went."
		}).input(im).output(P_),
		fileDiff: R.route({
			method: "GET",
			path: "/agents/{id}/{repo}/file-diff",
			summary: "One file's before and after in a conversation's work",
			description: "Both sides of a single file: what it held when the conversation started and what it holds on its branch now."
		}).input(Sm).output(Uh),
		land: R.route({
			method: "POST",
			path: "/agents/{id}/land",
			summary: "Merge a conversation's work into the workspace",
			description: "Brings the conversation's branches into the main tree, one repo at a time. A conflict is reported rather than raised and nothing is lost when it fails. Refused while a turn is running, and refused for a conversation that works directly in the shared tree, which has nothing to merge."
		}).input(Om).output(Tm),
		requestLand: R.route({
			method: "POST",
			path: "/agents/{id}/request-land",
			summary: "Ask a maintainer to merge this work",
			description: "For a collaborator who is not allowed to merge: marks the conversation as waiting for review, with who asked. The request shows on every maintainer's board and clears when somebody merges or discards it."
		}).input(im).output(rm),
		discard: R.route({
			method: "POST",
			path: "/agents/{id}/discard",
			summary: "Throw a conversation's work away",
			description: "Deletes the conversation's working copies, its branches and its entry. Nothing is kept. Refused while a turn is running, and refused for a conversation working in the shared tree."
		}).input(im).output(H),
		archive: R.route({
			method: "POST",
			path: "/agents/archive",
			summary: "Put conversations away",
			description: "The gentle counterpart to discarding. Commits whatever the conversation still has in progress onto its own branch, releases its working copy, and keeps the entry and the record. It leaves the live fleet and joins the archive. Refused for a conversation that is running."
		}).input(om).output(lm),
		unarchive: R.route({
			method: "POST",
			path: "/agents/unarchive",
			summary: "Bring conversations back",
			description: "Returns archived conversations to the live fleet. The next turn picks up a fresh working copy from the branch that was kept."
		}).input(sm).output(cm),
		purge: R.route({
			method: "POST",
			path: "/agents/purge",
			summary: "Empty the archive for good",
			description: "Discards every conversation already in the archive: working copies, branches and entries. The whole archive rather than a chosen few, because the archive is the pile somebody has already decided is over. A teardown that fails on one conversation leaves that one behind instead of taking the rest down with it."
		}).output(um)
	};
})), R_, z_, B_, V_, H_, U_, W_, G_, K_, q_, J_ = g((() => {
	L(), fd(), M(["post", "action"]), R_ = M([
		"proposed",
		"approved",
		"running",
		"done",
		"failed"
	]), z_ = {
		actsAs: B.optional().describe("Whose name it acts under. Needed for anything that requires being logged in, because an unwatched turn naming nobody is allowed no account at all. Never guessed: one site can be connected five times over, and picking for you means picking wrong in public with no undo."),
		scheduledAt: E().optional().describe("When it should happen, in milliseconds. An agent may propose without one and you set it when approving; an approved item with no time goes after a short countdown you can still stop."),
		status: R_.default("proposed").describe("Where it is: proposed by the agent, approved by you, being carried out, done, or failed. Rejecting is deleting it; retrying is approving a failed one again."),
		createdAt: E().optional().describe("When it was written, in milliseconds."),
		startedAt: E().optional().describe("When it started being carried out, in milliseconds. Needed to tell a run that is under way from one whose turn died mid-flight, which the scheduled time cannot."),
		finishedAt: E().optional().describe("When it was done, in milliseconds."),
		result: T().optional().describe("What came back, when something did: the post's own address, a confirmation number. The one thing a finished item can offer that reading it cannot."),
		error: T().optional().describe("Why it failed, written as a sentence for a person to read rather than as a code.")
	}, B_ = k({
		kind: N("post").describe("A post to publish somewhere."),
		platform: T().min(1).describe("Where it should go. A plain name, so a new site needs no change here; an unknown one simply fails when it tries to post."),
		content: T().min(1).describe("The post itself."),
		title: T().optional().describe("A title, where the site wants one."),
		target: T().optional().describe("Where on the site: a community, a channel. Or the address of the thing this replies to, in which case it is a reply, and on some sites the difference between a thread's address and one comment's is the difference between talking to the room and answering the person."),
		media: O(T()).optional().describe("Anything to attach, as workspace paths."),
		...z_
	}), V_ = k({
		kind: N("action").describe("Something the agent will do once you say so."),
		summary: T().min(1).max(200).describe("What will happen, in one line: the row's headline and the confirm dialog's item."),
		details: T().optional().describe("The specifics, as Markdown: everything you would want to see before saying yes."),
		instructions: T().min(1).describe("What to do once approved, written for the fresh turn that will do it: names, ids and steps, since it has none of this conversation."),
		...z_
	}), A("kind", [B_, V_]), H_ = { id: B.describe("The approval's id.") }, U_ = B_.extend(H_), W_ = V_.extend(H_), G_ = A("kind", [U_, W_]), K_ = k({
		approvals: O(G_).describe("The queue."),
		invalid: O(T()).describe("Files that could not be read at all, or name a kind this daemon does not know. Listed rather than skipped, because an agent writes these files directly and a malformed one would otherwise never run and never say why.")
	}), q_ = k({ id: B.describe("Which approval.") });
})), Y_, X_ = g((() => {
	z(), J_(), W(), Y_ = {
		list: R.route({
			method: "GET",
			path: "/approvals",
			summary: "Things waiting for your yes",
			description: "Everything an agent has prepared and would like to do: posts to publish, actions to carry out. Nothing here has happened yet."
		}).output(K_),
		upsert: R.route({
			method: "POST",
			path: "/approvals",
			summary: "Approve, edit or retry one",
			description: "All three are the same act with a different field changed, so they share one call. Send the item back as you want it."
		}).input(G_).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/approvals/{id}",
			summary: "Reject one",
			description: "Throws it away undone."
		}).input(q_).output(H)
	};
})), Z_, Q_ = g((() => {
	z(), Pg(), W(), Z_ = {
		list: R.route({
			method: "GET",
			path: "/automations",
			summary: "Things that wake an agent on their own",
			description: "Every automation with its recent runs and when it fires next."
		}).output(Cg),
		catalog: R.route({
			method: "GET",
			path: "/automations/catalog",
			summary: "What can trigger an automation here",
			description: "Every trigger this sandbox understands and every template worth starting from, the daemon's own merged with each installed extension's. Writing an automation is checked against this same list, so a screen and the daemon can never disagree about what is allowed."
		}).output(Ng),
		upsert: R.route({
			method: "POST",
			path: "/automations",
			summary: "Create or edit an automation",
			description: "Writes an automation by id. Nothing needs provisioning: the scheduler picks it up on its next sweep."
		}).input(gg).output(H),
		setEnabled: R.route({
			method: "POST",
			path: "/automations/{id}/enabled",
			summary: "Turn an automation on or off",
			description: "Flips only the switch, so a row in a list can be toggled without rebuilding the whole record."
		}).input(Og).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/automations/{id}",
			summary: "Delete an automation",
			description: "Removes it, so nothing fires from it again."
		}).input(Dg).output(H),
		rotateToken: R.route({
			method: "POST",
			path: "/automations/{id}/rotate-token",
			summary: "Rotate an automation's webhook token or intake key",
			description: "Mints a new credential for the door this automation opens and retires the old one at once. Every caller has to be handed the new URL; that is the point. Refused for an automation with no door."
		}).input(Dg).output(hf),
		run: R.route({
			method: "POST",
			path: "/automations/{id}/run",
			summary: "Fire an automation by hand",
			description: "The answer to writing something that runs at three in the morning and having no way to try it. It takes exactly the path the real trigger takes, including the check that decides whether there was anything to do, since skipped by the guard is the most useful thing this can tell you. A switched-off automation fires too, because trying it before switching it on is the main reason to press this. Not available for the trigger that listens for incoming messages, where a hand-fire would produce an agent asked to handle events and handed none; send the bot a message instead. Answers straight away and runs detached."
		}).input(Dg).output(H),
		senders: R.route({
			method: "GET",
			path: "/automations/senders/{provider}",
			summary: "Who has written to a listener source",
			description: "Everyone whose message reached one of this source's automations, newest first, admitted or not. What the sender rules picker offers by name while storing the id the service vouches for."
		}).input(Eg).output(Tg),
		pendingList: R.route({
			method: "GET",
			path: "/automations/pending",
			summary: "Automations waiting for a yes",
			description: "The queue an automation set to ask first lands in each time it would have fired."
		}).output(yg),
		approve: R.route({
			method: "POST",
			path: "/automations/pending/{id}/approve",
			summary: "Let a held automation run",
			description: "Releases one waiting automation and runs the wake it was holding. Answers straight away and runs detached."
		}).input(bg).output(H),
		reject: R.route({
			method: "POST",
			path: "/automations/pending/{id}/reject",
			summary: "Drop a held automation",
			description: "Throws one waiting fire away. The automation stays on, and the next trigger queues as usual."
		}).input(bg).output(H)
	};
})), $_, ev, tv, nv, rv, iv, av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv, Tv = g((() => {
	L(), V(), $_ = k({ agent: vd.optional().describe("Read a conversation's own private copy of the workspace rather than the shared tree. Leave it out for the shared tree. A conversation that is not working privately resolves back to the shared tree rather than failing, so a link need not know which mode it runs in.") }), ev = k({
		to: T().describe("What the link says, verbatim, rather than where it ends up. That is what the person who made it wrote, and what they would edit."),
		state: M(["broken", "outside"]).optional().describe("Absent for an ordinary link. Broken means there is nothing at the other end, and it is listed anyway because a dangling link is worth seeing. Outside means it leads out of the workspace, so it is shown and refused.")
	}), tv = k({
		name: T().describe("Just this entry's own name."),
		path: T().describe("Its full path from the workspace root, which feeds straight back into the file routes."),
		type: M(["file", "dir"]).describe("What it is. For a link, what it points at, so a link to a folder opens like a folder."),
		size: E().optional().describe("Size in bytes, for a file."),
		ignored: D().optional().describe("Tooling ignores it: installed packages, git internals, anything the ignore rules exclude. Usually drawn greyed out."),
		link: ev.optional().describe("Present when this entry is a link."),
		get children() {
			return O(tv).optional().describe("What is inside a folder. Absent means it was not opened, either because it is ignored or because the walk ran out of budget above it, so ask for it separately. An empty list means it really is empty.");
		}
	}), nv = k({
		root: T().describe("The path everything below is relative to."),
		tree: O(tv).describe("The workspace, one entry per file and folder."),
		hidden: E().describe("How many entries at the top level were cut for size. Zero means the listing is complete."),
		barren: O(T()).describe("Folders whose whole contents are empty folders, and nothing else. Complete for the workspace, however much of the tree above was listed, and ordered like the tree, so a parent comes before the branch below it.")
	}), rv = $_.extend({
		path: T().min(1).describe("The folder to open, as a workspace path."),
		depth: I().int().min(1).max(5).optional().describe("How many levels to include. Omitted means direct children only; at most five levels can be read in one request.")
	}), iv = k({
		entries: O(tv).describe("What is inside it, as a flat list. With the default depth these are direct children; a deeper request also includes descendants, whose full paths say where they belong. Folders carry no nested contents of their own."),
		hidden: E().describe("How many entries were cut for size. Zero means the listing is complete.")
	}), av = k({ path: T().min(1).describe("The file or folder, as a workspace path.") }), ov = $_.extend({ path: T().min(1).describe("The media file the ticket should cover.") }), sv = k({
		ticket: T().describe("Hand this to the streaming route in the query string. It buys exactly the one file it was minted for."),
		expiresAt: E().describe("When it stops working, in milliseconds, so a player can tell a dead ticket from a dead file.")
	}), cv = $_.extend({
		path: T().min(1).describe("The file to read, as a workspace path."),
		offset: I().int().optional().describe("Which byte to start at. A negative number reads that many bytes from the end, which is how you follow a growing log without knowing its size first."),
		limit: I().int().min(1).optional().describe("How many bytes to read. Capped by the sandbox, so leaving it out or asking for too much gives you the cap rather than the whole file.")
	}), lv = k({
		present: N(!0).describe("There is something at that path."),
		path: T().describe("The path, as asked for."),
		content: T().describe("The bytes of the window you asked for, as text."),
		size: E().describe("How large the whole file is. Compare it with the window below to know whether there is more."),
		offset: E().describe("Which byte the window starts at."),
		bytes: E().describe("How many bytes the window holds."),
		shared: D().describe("Which tree answered. True when no conversation was named, and also when one was but its own copy has no such file, which is the case a reader has to be told about rather than left to assume.")
	}), uv = k({
		present: N(!1).describe("Nothing there. An answer, not a failure: reading a file that may not exist yet is the ordinary case for half the reads in this product."),
		path: T().describe("The path, as asked for.")
	}), dv = A("present", [lv, uv]), fv = k({ path: T().min(1).describe("The file you want the text of, as a workspace path. The real file, not its shadow: where the text is kept is this route's business.") }), pv = k({
		enabled: D().describe("Whether the background pass is on (the `sidecars` setting). Off means a shadow exists only where someone asked for one."),
		queued: E().describe("Files waiting for a shadow, not counting the batch being rendered right now."),
		deriving: O(T()).describe("The files being rendered at this moment, as workspace paths. One batch at a time, because derivation shares the box with the agent it serves."),
		sweeping: D().describe("Whether a whole-tree pass is running, which is what a freshly enabled setting or an unlistably large batch triggers."),
		broken: D().describe("Whether the `fileq` binary is missing, in which case nothing renders in the background until this sandbox restarts."),
		shadows: E().optional().describe("How many shadows the last whole-tree pass counted. Absent until one has run in this daemon's lifetime."),
		sweptAt: T().optional().describe("When that pass finished, as an ISO timestamp.")
	}), mv = M([
		"off",
		"queued",
		"deriving",
		"idle",
		"broken",
		"undeliverable"
	]), hv = {
		state: mv.describe("Where this file stands with the background pass: switched off, waiting its turn, being read right now, settled, or unreachable because the renderer is missing. `undeliverable` is a format nothing here reads."),
		queue: pv.describe("How the background pass as a whole is doing, so a wait can be reported as a queue rather than as nothing happening.")
	}, gv = k({
		...hv,
		present: N(!0).describe("There is derived text for that file."),
		path: T().describe("The file it was derived from, as asked for."),
		content: T().describe("The text itself, as markdown."),
		deriver: T().describe("Which reader wrote it, and at which version, such as `pdf+ocr v1`. A file re-derives when this changes."),
		derivedAt: T().optional().describe("When it was written, as an ISO timestamp. Absent only for a shadow whose front matter was edited by hand."),
		title: T().optional().describe("The title the format carried, where it carried one."),
		notes: O(T()).describe("Every cap and degradation the derivation hit: a sheet cut to 200 rows, a book cut at 2 MB, a scan recognised rather than read. Show these with the text, since text that was cut reading as complete is the one failure this whole feature cannot afford."),
		tokens: E().describe("Roughly what an agent spends reading it, by the same four-chars-a-token estimate every budget here uses."),
		truncated: D().describe("Whether this is only the start of the shadow, cut to keep the response sendable. The file on disk holds the rest."),
		stale: D().describe("Whether the file has changed since this text was derived, compared by content rather than by clock. True means you are reading a rendering of an older version of the file, and deriving it again catches it up.")
	}), _v = k({
		...hv,
		present: N(!1).describe("There is no derived text for that file. Read `state` before saying so to anyone: absent and queued are different answers."),
		path: T().describe("The file, as asked for."),
		derivable: D().describe("Whether this format can be turned into text at all. True means asking for it to be derived is worth offering; false means nothing here reads this format."),
		reason: T().optional().describe("Why there is none, when deriving was just attempted and produced nothing: the file is too large, corrupt, or of a format no reader claims.")
	}), vv = A("present", [gv, _v]), yv = $_.extend({ path: T().min(1).max(512).describe("The reference as somebody wrote it. Often only the tail of the real path, which is why this is matched against the tree rather than read as-is.") }), bv = k({ path: T().optional().describe("The real path it means. Absent when nothing in the workspace ends that way.") }), xv = k({ path: T().min(1).describe("The folder to create. Missing folders above it are created too.") }), Sv = k({
		from: T().min(1).describe("What to move or copy, as a workspace path."),
		to: T().min(1).describe("Where it should end up. Changing only the last part is how you rename something.")
	}), Cv = M([
		"repositories",
		"documents",
		"media",
		"archives",
		"other"
	]), wv = k({ classifications: O(k({
		path: T().describe("What was looked at."),
		bucket: Cv.describe("Which bucket it was sorted into."),
		reason: T().describe("The signal that decided it, so the proposal can be argued with rather than trusted.")
	})).describe("One entry per repository folder and loose file at the top of the workspace. A read-only proposal: nothing moves until you apply it.") });
})), Ev, Dv, Ov, kv, Av, jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv = g((() => {
	L(), km(), Kd(), W(), Tv(), Ev = pc({ kind: T() }), Dv = k({
		kind: N("heartbeat"),
		rev: E()
	}), Ov = k({
		key: T(),
		label: T(),
		state: M([
			"pending",
			"running",
			"done",
			"failed"
		]),
		ms: E().optional()
	}), kv = k({
		ready: D(),
		startedAt: E(),
		steps: O(Ov)
	}), Av = k({
		kind: N("boot"),
		...kv.shape
	}), jv = k({
		kind: N("hello"),
		workspaceId: T(),
		routes: O(T()).optional(),
		shapes: j(T(), T()).optional(),
		build: T().optional(),
		boot: kv.optional()
	}), Mv = k({
		kind: N("reposChanged"),
		repos: O(T())
	}), Nv = k({
		kind: N("workspaceChanged"),
		paths: O(T())
	}), Pv = k({
		kind: N("derivedChanged"),
		paths: O(T()),
		queue: pv
	}), Fv = k({
		kind: N("refsChanged"),
		repos: O(T())
	}), Iv = k({
		kind: N("runtimeChanged"),
		domains: O(T())
	}), Lv = k({
		clientId: T(),
		email: T(),
		name: T().optional(),
		picture: T().optional(),
		role: mf,
		idle: D(),
		view: T().optional(),
		sessionId: T().optional(),
		path: T().optional()
	}), Rv = k({
		kind: N("presence"),
		users: O(Lv)
	}), zv = k({
		kind: N("agents"),
		agents: O(rm),
		rev: E()
	}), Bv = k({
		kind: N("accountUsage"),
		provider: T(),
		account: T(),
		usage: Pd.optional()
	}), Vv = k({
		kind: N("providerRefusal"),
		provider: T(),
		refusal: Ld.optional()
	}), Hv = A("kind", [
		jv,
		Dv,
		Av,
		Nv,
		Pv,
		Mv,
		Fv,
		Iv,
		Rv,
		zv,
		Bv,
		Vv
	]);
})), Wv, Gv, Kv, qv, Jv, Yv, Xv, Zv, Qv, $v, ey, ty, ny, ry, iy = g((() => {
	L(), fd(), Wv = M([
		"tor",
		"vpngate",
		"wireguard"
	]), Gv = T().regex(/^[A-Za-z]{2}$/, "A country is its two-letter code, like DE, US or JP.").transform((e) => e.toUpperCase()), Kv = k({
		provider: N("tor"),
		country: Gv.optional(),
		autoStart: dd
	}), qv = k({
		provider: N("vpngate"),
		country: Gv.optional(),
		autoStart: dd
	}), Jv = k({
		provider: N("wireguard"),
		config: T().min(1),
		country: Gv.optional(),
		autoStart: dd
	}), Yv = A("provider", [
		Kv,
		qv,
		Jv
	]), Xv = M([
		"up",
		"starting",
		"down",
		"unavailable",
		"failed"
	]), Zv = k({
		ip: T().describe("The address the world sees, looked up through the exit's own proxy rather than assumed."),
		country: T().optional().describe("Which country that address is in. Absent when the lookup gave an address and no country, in which case a switch is judged on the address having changed instead."),
		countryName: T().optional().describe("That country's name, spelled out.")
	}), Qv = k({
		country: T().describe("The country's code."),
		countryName: T().describe("Its name, spelled out."),
		servers: E().describe("How many servers this provider has there."),
		share: E().optional().describe("How much of the provider's actual capacity is there, from zero to one. This is what a list should be sorted by: a third of the countries on offer are one overloaded machine behind a flag, and a count of servers would rank them first.")
	}), $v = k({
		countries: O(Qv).describe("Where this exit can put you, best-supplied first."),
		live: D().describe("Whether the provider answered, or this came from a built-in list. Said out loud rather than presenting an old list as current.")
	}), ey = k({
		id: T().describe("Which exit."),
		provider: Wv.describe("What it runs on."),
		state: Xv.describe("Whether it is carrying traffic, coming up, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		proxy: T().describe("Where to point traffic that should go through it. Fixed per exit and unchanged by a country switch, which is what lets a long job move country halfway through without reconfiguring anything."),
		country: T().optional().describe("Where it was asked to come out. Absent means the provider chose."),
		observedCountry: T().optional().describe("Where it actually comes out, as last checked. Kept separate from what was asked for, because those two disagreeing is the most useful fault signal this whole feature has."),
		ip: T().optional().describe("The address behind that observation."),
		checkedAt: E().optional().describe("When that was checked, in milliseconds, so an old reading can be shown as old."),
		interface: T().optional().describe("The network interface, for the kinds that have one."),
		since: E().optional().describe("When it came up, in milliseconds."),
		autoStart: D().describe("Whether it starts itself when the sandbox does."),
		detail: T().optional().describe("Why it failed, or a note about a healthy one.")
	}), ty = k({ links: O(ey).describe("Every configured exit, with where it was asked to come out and where it actually does.") }), ny = k({ id: T().describe("Which exit.") }), ry = k({
		id: T().describe("Which exit."),
		country: Gv.optional().describe("Where to come out. Leaving it out means letting the provider choose, so clearing a country is something you can actually say rather than only setting one.")
	});
})), ay, oy, sy, cy, ly, uy, dy, fy, py, my, hy, gy, _y = g((() => {
	L(), ay = M([
		"host",
		"cloudflare",
		"github",
		"gitlab",
		"stripe"
	]), oy = M([
		"signoz",
		"outline",
		"paperless",
		"openproject",
		"invoiceninja",
		"infisical"
	]), sy = j(T(), mc([T(), E()])), cy = /^[a-zA-Z_][a-zA-Z0-9_]*$/, ly = T().min(1).max(60).regex(cy), uy = k({
		kind: N("backend").describe("Something you already have: a machine, an account with a hosting provider."),
		provider: ay.describe("Which provider it is with."),
		name: T().describe("What to call it, which is also how everything else refers to it."),
		values: sy.describe("Its settings. Anything secret is stored separately and referred to here, never written in.")
	}), dy = k({
		kind: N("service").describe("Something you want provisioned."),
		service: oy.describe("Which service."),
		name: T().describe("What to call it."),
		values: sy.describe("Its settings."),
		on: T().describe("Which of your machines to put it on."),
		expose: T().describe("How it should be reachable.")
	}), fy = k({
		kind: N("app").describe("An app of your own, built from source and deployed."),
		name: T().describe("What to call it."),
		values: sy.describe("Its settings, including the address it should answer on."),
		on: T().describe("Which of your machines to put it on."),
		expose: T().describe("How it should be reachable.")
	}), py = A("kind", [
		uy,
		dy,
		fy
	]), my = A("kind", [
		uy.extend({ name: ly }),
		dy.extend({ name: ly }),
		fy.extend({ name: ly })
	]), hy = k({ name: T().describe("Which entry, by name.") }), gy = k({ entries: O(py).describe("Everything declared: what you have, and what you want provisioned.") }), k({
		name: ly,
		user: T().min(1),
		address: T().min(1),
		port: I().default(22),
		via: M(["direct", "cloudflared"]).default("cloudflared"),
		sshKey: T().min(1),
		cfToken: T().optional(),
		cfZone: T().optional()
	});
})), vy, yy, by, xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py = g((() => {
	L(), vy = M([
		"wireguard",
		"fortinet",
		"ipsec"
	]), yy = M(["on", "off"]).default("on"), by = (e) => /^Enc[X]?\s+[0-9A-Fa-f]{8,}$/.test(e.trim()), xy = (e, t) => e.refine((e) => !by(e), { message: `That looks like a value copied straight out of a FortiClient config, FortiClient encrypts it with a key tied to the machine that exported it, so it can't be used here. Enter the actual ${t} (ask whoever administers the gateway).` }), Sy = k({
		provider: N("wireguard"),
		config: T().min(1),
		autoConnect: yy
	}), Cy = k({
		provider: N("fortinet"),
		server: T().min(1),
		port: I().int().min(1).max(65535).default(443),
		username: T().min(1),
		password: xy(T().min(1), "password"),
		trustedCert: T().min(1).optional(),
		realm: T().min(1).optional(),
		autoConnect: yy
	}), wy = k({
		provider: N("ipsec"),
		server: T().min(1),
		presharedKey: xy(T().min(1), "pre-shared key"),
		localId: T().min(1).optional(),
		remoteId: T().min(1).optional(),
		username: T().min(1).optional(),
		password: xy(T().min(1), "XAuth password").optional(),
		ikeVersion: M(["1", "2"]).default("1"),
		pfs: M(["on", "off"]).default("on"),
		dhGroup: M([
			"2",
			"5",
			"14",
			"15",
			"16",
			"19",
			"20"
		]).default("14"),
		aggressive: M(["on", "off"]).default("on"),
		routedNetworks: T().default("0.0.0.0/0").refine((e) => e.split(",").map((e) => e.trim()).every((e) => sc().safeParse(e).success || cc().safeParse(e).success), { message: "Routed networks is a comma-separated list of CIDRs, like 10.0.0.0/8,192.168.0.0/16. A single host needs its prefix too (192.168.0.168/32). Leave it at 0.0.0.0/0 to send everything through the gateway." }),
		autoConnect: yy
	}), Ty = A("provider", [
		Sy,
		Cy,
		wy
	]), Ey = M([
		"connected",
		"connecting",
		"disconnected",
		"unavailable",
		"failed"
	]), Dy = k({
		id: T().describe("Which tunnel."),
		provider: vy.describe("What kind of tunnel it is."),
		state: Ey.describe("Whether it is up, dialling, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		gateway: T().optional().describe("What it dials. For display only, and never a credential."),
		interface: T().optional().describe("The network interface carrying it, once one exists."),
		address: T().optional().describe("The address the far end gave this sandbox, which is the single most useful answer to whether you are on the VPN."),
		routes: O(T()).default([]).describe("What goes through it. Everything, when the range covers the whole internet. Empty until it is up."),
		dns: O(T()).default([]).describe("Name servers it pushed, when it pushed any."),
		since: E().optional().describe("When it came up, in milliseconds. Absent unless it is."),
		autoConnect: D().describe("Whether it dials itself when the sandbox starts."),
		detail: T().optional().describe("Why it failed, or a note about a healthy one. Never a credential.")
	}), Oy = k({ links: O(Dy).describe("Every configured tunnel with its live state, read back from the operating system each time rather than remembered.") }), ky = k({
		id: T().describe("Which tunnel to dial."),
		otp: T().min(1).optional().describe("A one-time code, where the gateway wants one. Supplied per dial and never stored; without it such a gateway refuses and says so.")
	}), Ay = k({ id: T().describe("Which tunnel.") }), jy = k({ xml: T().min(1).describe("The exported configuration file, whole. Nothing is stored: it is read and thrown away.") }), My = k({
		id: T().describe("The id it would be added under."),
		label: T().describe("Its name as the file has it, so somebody recognises the connection they are picking."),
		provider: vy.describe("What kind of tunnel it is."),
		server: T().describe("Where it dials."),
		port: E().describe("On which port."),
		username: T().optional().describe("The username, but only when the file stored it in the clear. An encrypted one is dropped rather than guessed at."),
		description: T().optional().describe("Whatever the file said about it."),
		localId: T().optional().describe("An identity some tunnel types need, when the file stored it readably."),
		aggressive: D().optional().describe("Which negotiation mode it used."),
		pfs: D().optional().describe("Whether it asked for forward secrecy."),
		dhGroup: T().optional().describe("Which key-exchange group it used. Together with the setting above, this is what decides whether the connection can complete at all."),
		needs: O(T()).describe("What you still have to type in before it can dial. Always at least the password, because the export wraps credentials in encryption that cannot be undone here.")
	}), Ny = k({ connections: O(My).describe("The connections found in the file, ready to be added one at a time.") });
})), Fy, Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky, qy, Jy, Yy, Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb = g((() => {
	L(), iy(), fd(), _y(), Py(), Fy = M([
		"devops",
		"monorepo",
		"mcp",
		"service",
		"integration",
		"cli",
		"plugin",
		"extension",
		"ssh",
		"vpn",
		"exit",
		"docker",
		"browser",
		"identity",
		"host",
		"webext",
		"agent",
		"endpoint",
		"localmodel",
		"wallet"
	]), Iy = M([
		"active",
		"pending",
		"error",
		"inactive"
	]), Ly = k({
		url: oc().describe("Where the tool server answers."),
		token: T().optional().describe("The credential it needs, if any. Stored, never echoed back.")
	}), Ry = k({
		service: oy.describe("Which service to provision."),
		domain: T().min(1).describe("The address it should answer on."),
		on: T().min(1).describe("Which machine to put it on."),
		expose: T().min(1).describe("How it should be reachable.")
	}), zy = k({ provider: N("stripe").describe("Which outside service's credential to make available to deployed apps.") }), By = k({ provider: T().min(1).describe("Which tool to give the agent. The rest of the fields are whatever that tool's own card declares it needs, and are checked against it when you connect.") }).catchall(T()), Vy = k({
		url: oc().describe("The repository to take the plugin from."),
		ref: T().min(1).optional().describe("A branch, tag or commit to pin to. Leave it out to follow the default branch."),
		path: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the plugin lives, for one that sits in a larger checkout."),
		token: T().min(1).optional().describe("A credential for a private repository. Stored, never echoed back.")
	}), Hy = k({
		url: oc().describe("The repository to take the extension from."),
		ref: T().regex(/^[0-9a-f]{40}$/, "ref must be a full 40-character commit sha").describe("The exact commit to install, in full. Required rather than optional because extension code runs with your browser's trust: the owner approves precisely the code that runs, and an update is a deliberate re-install at a new commit."),
		path: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the extension lives, for one that sits in a larger checkout."),
		token: T().min(1).optional().describe("A credential for a private repository. Stored, never echoed back."),
		registry: oc().optional().describe("Which registry this install came from, which is what update checks and security advisories are read against. Absent falls back to the official one.")
	}), Uy = A("auth", [k({
		auth: N("key").describe("Sign in with a key."),
		host: T().min(1).describe("The machine's address."),
		port: I().default(22).describe("Which port it listens on."),
		user: T().min(1).describe("Which user to connect as."),
		privateKey: T().min(1).describe("The private key, whole. Stored with tight permissions and never echoed back.")
	}), k({
		auth: N("password").describe("Sign in with a password."),
		host: T().min(1).describe("The machine's address."),
		port: I().default(22).describe("Which port it listens on."),
		user: T().min(1).describe("Which user to connect as."),
		password: T().min(1).describe("The password. Stored, never echoed back.")
	})]), Wy = k({
		gpu: M(["on", "off"]).default("off"),
		registryMirror: oc().optional(),
		insecureRegistries: T().optional(),
		addressPool: T().optional()
	}), Gy = k({
		platform: T().min(1),
		username: T().optional(),
		password: T().optional(),
		identity: T().optional(),
		purpose: T().optional(),
		openedAt: T().optional(),
		exit: T().optional()
	}).catchall(T()), Ky = k({
		email: T().min(3),
		password: T().optional(),
		mailbox: T().optional(),
		loginUrl: oc().optional(),
		openAccounts: M(["on", "off"]).default("off"),
		exit: T().optional()
	}), qy = M(["on", "off"]), Jy = k({
		shell: qy.default("on"),
		write: qy.default("off"),
		screen: qy.default("on"),
		control: qy.default("off"),
		sandboxes: qy.default("off"),
		destructive: qy.default("off"),
		roots: T().optional()
	}), Yy = Jy.extend({ platform: T().min(1) }), Xy = M(["on", "off"]), Zy = k({
		read: Xy.default("on"),
		act: Xy.default("on"),
		screenshot: Xy.default("off"),
		cookies: Xy.default("off"),
		confirm: M([
			"sensitive",
			"always",
			"never"
		]).default("sensitive")
	}), Qy = Zy.extend({ platform: T().min(1) }), $y = k({
		command: T().min(1),
		name: T().min(1).optional(),
		env: T().optional(),
		loginCommand: T().min(1).optional()
	}), eb = M(["openai", "anthropic"]), tb = k({
		baseUrl: oc(),
		protocol: eb.default("openai"),
		apiKey: T().optional(),
		headers: T().optional()
	}), nb = [
		"16384",
		"32768",
		"65536",
		"131072"
	], rb = "65536", ib = 2048, ab = 1048576, ob = k({
		model: T().min(1),
		gpu: M(["on", "off"]).default("off"),
		url: oc().optional(),
		context: mc([M(nb), N("custom")]).default(rb),
		contextTokens: I().int().min(ib).max(ab).optional()
	}), sb = T().regex(/^\d+(\.\d{1,6})?$/, "a USD amount like 0.50 (up to six decimals: USDC's own precision)"), cb = M(["eip155:8453", "eip155:84532"]), lb = k({
		network: cb.default("eip155:8453"),
		address: T().optional(),
		perPaymentMaxUsd: sb.default("1.00"),
		autoApproveUnderUsd: sb.default("0"),
		dailyCapUsd: sb.default("5.00"),
		allow: T().optional(),
		deny: T().optional()
	}), ub = A("kind", [
		k({
			id: B,
			kind: N("devops"),
			config: k({})
		}),
		k({
			id: B,
			kind: N("monorepo"),
			config: k({})
		}),
		k({
			id: B,
			kind: N("mcp"),
			config: Ly
		}),
		k({
			id: B,
			kind: N("service"),
			config: Ry
		}),
		k({
			id: B,
			kind: N("integration"),
			config: zy
		}),
		k({
			id: B,
			kind: N("cli"),
			config: By
		}),
		k({
			id: B,
			kind: N("plugin"),
			config: Vy
		}),
		k({
			id: B,
			kind: N("extension"),
			config: Hy
		}),
		k({
			id: B,
			kind: N("ssh"),
			config: Uy
		}),
		k({
			id: B,
			kind: N("vpn"),
			config: Ty
		}),
		k({
			id: B,
			kind: N("exit"),
			config: Yv
		}),
		k({
			id: B,
			kind: N("docker"),
			config: Wy
		}),
		k({
			id: B,
			kind: N("browser"),
			config: Gy
		}),
		k({
			id: B,
			kind: N("identity"),
			config: Ky
		}),
		k({
			id: B,
			kind: N("host"),
			config: Yy
		}),
		k({
			id: B,
			kind: N("webext"),
			config: Qy
		}),
		k({
			id: B,
			kind: N("agent"),
			config: $y
		}),
		k({
			id: B,
			kind: N("endpoint"),
			config: tb
		}),
		k({
			id: B,
			kind: N("localmodel"),
			config: ob
		}),
		k({
			id: B,
			kind: N("wallet"),
			config: lb
		})
	]), db = k({
		state: Iy.describe("Whether it is live, still coming up, broken, or switched off."),
		detail: T().optional().describe("What is wrong, in words a person can act on."),
		code: T().optional().describe("A short marker for that reason, for anything deciding what to do about it.")
	}), fb = k({
		id: T().describe("The connection's id."),
		kind: Fy.describe("What sort of thing it is."),
		status: db.describe("Whether it is working."),
		config: j(T(), mc([
			T(),
			E(),
			D()
		])).describe("Its settings, minus anything secret."),
		secrets: O(T()).default([]).describe("Which credentials it holds, by name. The values are on one route only, and it is not this one.")
	}), pb = k({
		card: T().describe("Which connection is being suggested."),
		evidence: T().describe("What was seen that prompted it: a file, a remote, printed verbatim so the claim can be checked rather than believed."),
		reason: T().describe("The same claim in words, without repeating the evidence into it."),
		prefill: j(T(), T()).describe("Settings the scan could read, to fill the form so you supply only the credential. Never a secret, even when one is sitting in a checked-in file: the suggestion points at such a file, it does not absorb what is in it.")
	}), mb = k({
		capabilities: O(fb).describe("What this sandbox is connected to."),
		recommendations: O(pb).default([]).describe("Things worth connecting, worked out from what is actually in the workspace rather than from anything you configured. Re-derived on every read, so one whose evidence has moved simply stops being suggested.")
	}), hb = k({ id: T().describe("Which connection.") }), gb = k({
		id: T().describe("The connection's id."),
		kind: T().describe("What sort of thing it is."),
		config: j(T(), T()).describe("Its settings exactly as stored, credentials included. The field names are its own kind's, which the caller already knows.")
	}), _b = k({ card: T().describe("Which suggestion to stop making.") }), vb = k({
		id: T().describe("Which connection."),
		value: T().min(1).describe("The new credential. Its other settings are left alone.")
	}), yb = k({
		id: T(),
		to: T().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
	}), bb = k({ session: T().describe("The terminal the sign-in is happening in. Attach to it to type.") }), xb = k({
		code: T().describe("The code."),
		secondsRemaining: E().describe("How long it lasts. Its expiring is what makes handing one to an agent safe, since the seed behind it is never revealed.")
	}), Sb = k({
		checked: D().describe("Whether this connection can be tested from here at all. False is not a failure: it is 'no test exists'."),
		ok: D().describe("Whether the service answered as itself."),
		message: T().describe("What happened, in the words a person standing in front of the form needs: the service's own answer, or its refusal.")
	});
})), wb, Tb, Eb, Db = g((() => {
	L(), wb = k({
		url: T(),
		ref: T().optional(),
		path: T().optional()
	}), Tb = (e, t, n) => {
		if (typeof e == "string") {
			let r = e.replace(/^\.\//, ""), i = n?.replace(/^\.\//, "").replace(/\/$/, "");
			return {
				url: t,
				path: i !== void 0 && i !== "" ? `${i}/${r}` : r
			};
		}
		if (typeof e != "object" || !e) return;
		let r = e, i = r.sha ?? r.ref;
		if (r.source === "github" && typeof r.repo == "string") return {
			url: `https://github.com/${r.repo}.git`,
			...i === void 0 ? {} : { ref: i }
		};
		if (r.source === "url" && typeof r.url == "string") return {
			url: r.url,
			...i === void 0 ? {} : { ref: i }
		};
		if (r.source === "git-subdir" && typeof r.url == "string" && typeof r.path == "string") return {
			url: r.url,
			path: r.path,
			...i === void 0 ? {} : { ref: i }
		};
	}, Eb = /^[0-9a-f]{40}$/;
})), Ob, kb, Ab, jb, Mb, Nb, Pb = g((() => {
	L(), Db(), Ob = k({
		sha: T().regex(Eb, "must be a full lowercase commit sha"),
		url: T().min(1),
		path: T().min(1).optional(),
		policy: T().min(1),
		reviewer: T().min(1),
		reviewedAt: Ml(),
		runId: T().min(1),
		deterministic: k({
			policy: T().min(1),
			scanner: T().min(1),
			version: T().min(1),
			runId: T().min(1)
		})
	}), kb = M([
		"verified",
		"listed",
		"blocked"
	]), Ab = k({
		name: T(),
		description: T().optional(),
		version: T().optional(),
		kind: M(["plugin", "extension"]).optional(),
		trust: kb.optional(),
		trustReason: T().optional(),
		securityReview: Ob.optional(),
		securityFix: D().optional(),
		category: T().optional(),
		art: T().max(4096).optional(),
		logo: T().optional(),
		icon: T().optional(),
		homepage: oc().optional(),
		source: uc()
	}).superRefine((e, t) => {
		let n = e.trust ?? "listed";
		if (n === "blocked" && (e.trustReason === void 0 || e.trustReason.trim() === "") && t.addIssue({
			code: "custom",
			path: ["trustReason"],
			message: "a blocked entry must say why"
		}), n === "verified" && e.securityReview === void 0 && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "a verified entry must carry its security review"
		}), e.securityReview === void 0) return;
		let r = Tb(e.source, "", void 0);
		(r?.ref !== e.securityReview.sha || r?.url !== e.securityReview.url || r.path !== e.securityReview.path) && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "must equal the exact repository, commit and subdirectory named by source"
		});
	}), k({
		name: T(),
		metadata: k({ pluginRoot: T().optional() }).optional(),
		plugins: O(Ab)
	}).superRefine((e, t) => {
		let n = /* @__PURE__ */ new Set();
		for (let r = 0; r < e.plugins.length; r += 1) {
			let i = e.plugins[r]?.name;
			i !== void 0 && n.has(i) && t.addIssue({
				code: "custom",
				path: [
					"plugins",
					r,
					"name"
				],
				message: "entry names must be unique"
			}), i !== void 0 && n.add(i);
		}
	}), jb = k({
		sha: T(),
		manifest: T(),
		bundle: T(),
		engines: T().optional()
	}), Mb = k({
		name: T(),
		stars: E().int().nonnegative().optional(),
		pushedAt: T().optional(),
		checks: jb.optional()
	}), k({
		scannedAt: T(),
		entries: O(Mb)
	}), Nb = k({
		name: T(),
		description: T().optional(),
		version: T().optional(),
		kind: M(["plugin", "extension"]),
		trust: kb,
		trustReason: T().optional(),
		securityReview: Ob.optional(),
		admitted: D(),
		securityFix: D().optional(),
		category: T().optional(),
		art: T().optional(),
		logo: T().optional(),
		icon: T().optional(),
		homepage: T().optional(),
		install: wb.optional(),
		stars: E().int().nonnegative().optional(),
		pushedAt: T().optional(),
		checks: jb.optional()
	});
})), Fb = g((() => {
	Pb(), Db();
})), Ib, Lb, Rb = g((() => {
	L(), Fb(), Ib = k({
		url: oc().describe("The registry to read."),
		token: T().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log.")
	}), Lb = k({
		name: T().describe("What the registry calls itself."),
		plugins: O(Nb).describe("What it lists, each with the curated decision, the resolved pointer and what a scan found upstream.")
	});
})), zb, Bb, Vb, Hb = g((() => {
	L(), zb = k({
		url: oc().describe("The repository to ask. http(s) only: an ssh remote would stop on a host-key prompt nobody can answer."),
		token: T().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log. A form editing a live connection has never been shown its token: it sends the VAULTED marker here and names the connection in `keeping`, so a private repository still answers without anyone retyping a key."),
		keeping: T().min(1).optional().describe("Which connection a VAULTED token belongs to. Ignored when a real token is sent.")
	}), Bb = k({
		name: T().describe("The branch or tag as a person names it: `main`, `v1.4.0`."),
		kind: M(["branch", "tag"]),
		sha: T().regex(/^[0-9a-f]{40}$/).describe("The commit it points at. An annotated tag is peeled here, so this is always a commit, never a tag object.")
	}), Vb = k({
		defaultBranch: T().optional().describe("The branch the remote advertises as HEAD, the one to offer first. Absent when the remote advertises no symref."),
		refs: O(Bb).describe("Every branch the remote advertises, then every tag. Which to offer first is the reader's question, not this one's.")
	});
})), Ub, Wb = g((() => {
	z(), Uv(), Cb(), Rb(), Hb(), W(), Ub = {
		list: R.route({
			method: "GET",
			path: "/capabilities",
			summary: "Everything this sandbox is connected to",
			description: "Each connection with its live state, the settings that are safe to show, and the names of the credentials it holds. The values of those credentials are never in the answer, on any route but one."
		}).output(mb),
		add: R.route({
			method: "POST",
			path: "/capabilities",
			summary: "Connect something, or change a connection",
			description: "Writes a connection and streams the work of applying it, because some kinds provision real infrastructure and take a while. Sending an id that already exists edits that connection: this is the edit as well as the create. Since a caller is never shown stored credentials, it marks the ones it is leaving alone and the daemon fills them in, which is the only way to change one setting without retyping a key."
		}).input(ub).output(Fu(Ev)),
		probe: R.route({
			method: "POST",
			path: "/capabilities/probe",
			summary: "Test a connection's settings without saving them",
			description: "Dials the service the way this connection would and hands back what it said, before anything is written. The answer is the service's own confirmation or its exact refusal, so a wrong token or an unreachable host is found on the form rather than on a card afterwards."
		}).input(ub).output(Sb),
		remove: R.route({
			method: "DELETE",
			path: "/capabilities/{id}",
			summary: "Disconnect something",
			description: "Tears a connection down. The kinds that own real infrastructure refuse, because deleting those would be losing data rather than losing a connection."
		}).input(hb).output(H),
		rename: R.route({
			method: "POST",
			path: "/capabilities/{id}/rename",
			summary: "Rename a connection",
			description: "Carries everything the old name keyed across with it: a browser profile and its logins, an enrolled machine, an extension's copy of its source. Removing and re-adding would lose exactly the state that made the connection worth keeping. Kinds whose name is part of what they are refuse."
		}).input(yb).output(H),
		setSecret: R.route({
			method: "POST",
			path: "/capabilities/{id}/secret",
			summary: "Replace a stored credential",
			description: "Swaps one connection's key or token for a new one and re-applies it, without touching any of its other settings."
		}).input(vb).output(H),
		status: R.route({
			method: "GET",
			path: "/capabilities/{id}/status",
			summary: "Re-check one connection",
			description: "Probes a single connection right now, for a screen that wants to refresh one row rather than the whole list."
		}).input(hb).output(db),
		connection: R.route({
			method: "GET",
			path: "/capabilities/{id}/connection",
			summary: "A connection's settings, credentials included",
			description: "The one call that hands back stored secrets, so an extension's own backend can dial the service behind a connection. Never answered for a signed-in person: only a machine credential reaches it, and an extension's only if its manifest asked for this route out loud at install time."
		}).input(hb).output(gb),
		marketplace: R.route({
			method: "POST",
			path: "/capabilities/marketplace",
			summary: "Read a plugin marketplace",
			description: "Resolves a plugin marketplace source into the list of connections you could install from it."
		}).input(Ib).output(Lb),
		refs: R.route({
			method: "POST",
			path: "/capabilities/refs",
			summary: "The versions a repository offers",
			description: "Asks a git remote what it advertises and hands back every branch and tag with the commit it points at, plus which branch is its default. Nothing is cloned and nothing is written, so this is cheap enough to answer a form as someone types a repository into it."
		}).input(zb).output(Vb),
		dismiss: R.route({
			method: "DELETE",
			path: "/capabilities/recommendations/{card}",
			summary: "Stop suggesting this connection",
			description: "Not needed, for now. Nothing is torn down. The suggestion comes back if what prompted it in the workspace changes, because what is remembered is the evidence, not the refusal."
		}).input(_b).output(H),
		login: R.route({
			method: "POST",
			path: "/capabilities/{id}/login",
			summary: "Sign in to a connection by hand",
			description: "Opens the connection's own sign-in in a terminal a person can type into, for the flows that need a code pasted or a device confirmed. The answer names the terminal to attach to."
		}).input(hb).output(bb),
		otp: R.route({
			method: "GET",
			path: "/capabilities/{id}/otp",
			summary: "Mint a one-time code",
			description: "Generates a single two-factor code from a stored seed. The one credential-adjacent read an agent is allowed, and it is safe because a code expires in seconds and never reveals the seed, so an agent can answer a prompt without ever holding the factor."
		}).input(hb).output(xb)
	};
})), Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb = g((() => {
	L(), Gb = k({
		query: T().min(2).max(512).describe("What to look for. Plain words, a pattern, a symbol name, or a question."),
		mode: M([
			"q",
			"find",
			"files",
			"def",
			"refs",
			"sym",
			"ast"
		]).optional().describe("Narrow the search to one kind: plain text, filenames, definitions, references, symbols, or code structure. Leave it out to blend them, which also answers a question asked in words."),
		includeIgnored: kl().optional().describe("Search inside installed packages and other ignored folders too."),
		literal: kl().optional().describe("Treat the query as fixed text rather than a pattern."),
		word: kl().optional().describe("Match whole words only."),
		caseSensitive: kl().optional().describe("Whether capitals matter. Off means they do not, rather than being guessed at from the query."),
		include: T().max(512).optional().describe("Which files to ask, in the same grammar an editor's files-to-include box takes: comma-separated patterns, matched at any depth unless anchored, a leading exclamation mark excluding instead."),
		limit: I().int().positive().optional().describe("How many results to return."),
		after: T().optional().describe("Resume from the cursor a previous answer handed back.")
	}), Kb = k({
		kind: M([
			"def",
			"text",
			"sem",
			"bm25",
			"rerank",
			"path",
			"import",
			"call",
			"type",
			"write",
			"fuzzy",
			"heuristic"
		]).describe("Why this line matched: the literal text, its meaning, the path, a definition, a call, and so on. Several kinds can agree on one line."),
		score: E().optional().describe("How strongly that reason applied.")
	}), qb = k({
		start: E().describe("First character of the match within the line."),
		end: E().describe("One past the last.")
	}), Jb = k({
		line: E().describe("Which line, counting from one."),
		text: T().describe("The line itself."),
		spans: O(qb).describe("Where in the line the matches are, so you can highlight without searching again. Empty when the whole line is the match rather than part of it."),
		tags: O(Kb).describe("Why it matched."),
		context: T().optional().describe("What it sits inside: the function, the class, the heading. Often enough that you need not open the file.")
	}), Yb = k({
		path: T().describe("The file."),
		score: E().describe("How well it matched. Groups arrive best first, never in path order."),
		hits: O(Jb).describe("The matching lines in it."),
		capped: D().optional().describe("This file had more matches than are kept per file, so the count is a floor. Say fifty-plus rather than fifty.")
	}), Xb = k({
		state: M([
			"fresh",
			"building",
			"stale"
		]).describe("Whether the index matches what is on disk, is still filling, or has fallen behind."),
		ageMs: E().optional().describe("How long since it last matched the disk, in milliseconds."),
		progress: E().optional().describe("How far through building it is, from zero to one."),
		behind: E().optional().describe("How many files it has not caught up with. Worth showing, because the word stale on its own reads as a warning about the answer, which it almost never is.")
	}), Zb = k({
		mode: T().describe("Which kind of search actually ran, which matters when you let it choose."),
		total: E().describe("Matching lines across the whole workspace, not just this page."),
		files: E().describe("Files the query matched in total."),
		shown: E().describe("How many of those lines are on this page."),
		groups: O(Yb).describe("The results, grouped by file, best first."),
		freshness: Xb.describe("Whether the index behind the answer is up to date."),
		truncated: D().describe("This page is not all of it. Use the cursor."),
		partial: D().optional().describe("At least one file had more matches than are kept per file, so the total is a floor. Different from the page being truncated: a complete page can still count partially."),
		cursor: T().optional().describe("Pass this back as `after` to get the next page."),
		hint: T().optional().describe("A suggestion for getting a better answer out of this query."),
		note: T().optional().describe("What the engine did that you did not ask for: a pattern rerun as plain text because it was not valid, escapes rewritten, a language filter that matched nothing."),
		related: O(T()).optional().describe("Places next door to the best results: where each is defined, and whatever calls it most."),
		candidates: O(T()).optional().describe("Ranked places that scored but did not make the page, best first. The answer often sits at rank five to thirteen, so this saves paging through to find out."),
		features: O(T()).optional().describe("Which stages of the search were switched off for this run. Absent means all of them ran.")
	});
})), $b, ex, tx, nx, rx = g((() => {
	L(), Qb(), $b = k({
		repo: T().min(1).describe("Which repository, using the same ids the git routes take."),
		since: T().max(16).optional().describe("How far back to count changes, written as a span such as 2d, 12h, 1w or 3m. Leave it out for all of history."),
		limit: I().int().positive().max(200).optional().describe("How many files and modules to rank. A leaderboard rather than an inventory: past a screenful the ranking stops being the point.")
	}), ex = k({
		path: T(),
		commits: E(),
		adds: E(),
		dels: E(),
		complexity: E(),
		score: E(),
		latestMs: E()
	}), tx = k({
		path: T(),
		exports: E()
	}), nx = k({
		repo: T().describe("Which repository this describes."),
		totals: k({
			files: E().describe("Files counted."),
			symbols: E().describe("Named things they export."),
			complexity: E().describe("Branch points across all of them added up."),
			hotspots: E().describe("How many files qualify as hotspots at all. The list below is capped; this is not.")
		}).describe("Counts anybody could recount in the files themselves. Deliberately no single maintainability grade: those cannot be checked and are not comparable between projects."),
		hotspots: O(ex).describe("Files that change often and are complicated at the same time, worst first."),
		modules: O(tx).describe("The parts of the codebase the rest of it leans on most."),
		freshness: Xb.describe("Whether the index these numbers were read from is up to date.")
	});
})), ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx = g((() => {
	L(), rx(), ix = [
		"outdated",
		"audit",
		"knip",
		"jscpd",
		"ui",
		"bundle",
		"mutation"
	], ax = M(ix), ox = k({
		name: T().describe("The dependency."),
		current: T().describe("What you are on."),
		latest: T().describe("What is published."),
		kind: M([
			"major",
			"minor",
			"patch"
		]).describe("How far apart those are. This is not one number because forty patch releases behind is a morning's work and one major version is a project."),
		section: T().describe("Which part of the manifest declares it. A major version behind on a build-time tool is a different risk from one that ships.")
	}), sx = k({
		name: T().describe("The dependency it concerns."),
		severity: M([
			"critical",
			"high",
			"moderate",
			"low",
			"info"
		]).describe("How bad it is said to be."),
		title: T().describe("What it is, in one line. No scoring vector and no reference list: those are for reading on the advisory's own page, and carrying them would put a kilobyte of prose per finding on every poll."),
		patched: T().optional().describe("Which versions fix it. Absent means no fix has been published, which is exactly when nothing should offer to upgrade and something should say so instead."),
		dev: D().describe("Whether it only reaches build-time tooling, which is a different problem from one that reaches what you ship.")
	}), cx = k({
		files: E().int().nonnegative().describe("Files nothing reaches."),
		exports: E().int().nonnegative().describe("Exported things nothing uses."),
		types: E().int().nonnegative().describe("Types nothing uses."),
		dependencies: E().int().nonnegative().describe("Declared dependencies nothing imports."),
		devDependencies: E().int().nonnegative().describe("The same, for build-time ones."),
		sample: O(T()).describe("A handful of the files, so a reader need not take the count on faith. Counts and a sample rather than the whole list, because an agent re-measures against the live tree anyway.")
	}), lx = k({
		percentage: E().describe("How much of the scanned code is duplicated. A share rather than a count, because a count grows with the repository and would mean something different every quarter."),
		clones: E().int().nonnegative().describe("How many duplicated stretches were found."),
		top: O(k({
			lines: E().int().nonnegative().describe("How long the duplicated stretch is."),
			first: T().describe("One of the two places."),
			second: T().describe("The other.")
		})).describe("The largest of them.")
	}), ux = k({
		components: O(T()).describe("The interface's own source files, with tests, stories and generated output left out."),
		bypasses: O(k({
			path: T().describe("The file."),
			count: E().int().positive().describe("How many times, in that file.")
		})).describe("Where the design system was routed around and a value hard-coded instead. Counted per file, because a reader deciding what to open is served by a file and a number, not by eleven snippets."),
		idioms: O(k({
			id: T().describe("Which outdated idiom. Looked up rather than listed here, so a sandbox one version behind can still report one this list has never heard of."),
			files: O(T()).describe("The files still on it.")
		})).describe("Files still written the way their framework has since replaced.")
	}), dx = k({
		dir: T().describe("Which folder was measured. Read from build output already on disk rather than by building, so this is sometimes a commit behind and never leaves anything in your working tree."),
		totalBytes: E().int().nonnegative().describe("The whole thing, raw."),
		totalGzip: E().int().nonnegative().describe("The whole thing, compressed. The ratio between the two is the difference between big and big-and-incompressible, which are different problems."),
		assets: O(k({
			path: T().describe("The file."),
			bytes: E().int().nonnegative().describe("Its raw size."),
			gzip: E().int().nonnegative().describe("Its compressed size.")
		})).describe("What is in it, piece by piece.")
	}), fx = k({
		score: E().describe("The share of injected faults the suite caught. Not a coverage figure: coverage says a line ran, this says an assertion depended on it."),
		killed: E().int().nonnegative().describe("Faults the suite caught."),
		survived: E().int().nonnegative().describe("Faults it did not: code that can be broken with every test still green."),
		inconclusive: E().int().nonnegative().describe("Faults it never got a verdict on, because they would not compile or were configured out. Left out of the score entirely, since neither answer is known."),
		survivors: O(k({
			file: T().describe("Where it is."),
			line: E().int().nonnegative().describe("Which line."),
			mutator: T().describe("What was changed, in the mutation tool's own vocabulary."),
			replacement: T().describe("What it became, so a reader can judge whether it matters without opening the file.")
		})).describe("The surviving faults themselves. A percentage is a mood; a named line with the change that went unnoticed is a morning's work.")
	}), px = M([
		"ok",
		"unavailable",
		"failed"
	]), mx = A("id", [
		k({
			id: N("outdated"),
			packages: O(ox)
		}),
		k({
			id: N("audit"),
			advisories: O(sx)
		}),
		k({
			id: N("knip"),
			deadCode: cx
		}),
		k({
			id: N("jscpd"),
			duplication: lx
		}),
		k({
			id: N("ui"),
			scan: ux
		}),
		k({
			id: N("bundle"),
			bundle: dx
		}),
		k({
			id: N("mutation"),
			mutation: fx
		})
	]), hx = k({
		id: ax.describe("Which measurement this is."),
		state: px.describe("Whether the tool ran and reported, is not part of this repository at all, or broke. The middle one is not evidence of health: the check simply cannot be made here."),
		ranAt: E().describe("When it last finished, in milliseconds, which is what its age is measured from."),
		tookMs: E().int().nonnegative().describe("How long it took. Worth knowing before asking for it again: some of these run for minutes."),
		facts: mx.optional().describe("What it found, including finding nothing, which is a real answer and the one that keeps a chore quiet."),
		reason: T().optional().describe("Why it broke, quoted from the tool rather than summarised, or, when it never ran, what is missing. Never a sentence built from the check's own name, which would have an unmeasured check claiming there is nothing to measure.")
	}), gx = k({
		dir: T().describe("Where the package lives."),
		name: T().describe("What it declares itself as."),
		engines: j(T(), T()).optional().describe("Which runtime versions it says it needs, verbatim."),
		dependencies: O(T()).describe("What it depends on."),
		devDependencies: O(T()).describe("What it needs only to build."),
		documented: D().describe("Whether it has a README, which in this workspace is what a package's own documentation is.")
	}), _x = k({
		docs: O(T()).describe("The repository's own architecture documents, when it has any. Their existence is the question: a repository with none has never been through the documentation flow at all."),
		dockerfiles: O(T()).describe("Container definitions in it."),
		ci: O(T()).describe("Pipeline definitions in it."),
		lockfile: D().describe("Whether dependencies are pinned to exact versions, which is what makes a security audit mean anything."),
		packageManifest: D().describe("Whether it is a JavaScript project at all. A Rust or Go repository has no majors to be behind on, and offering it those checks would be this surface guessing at what it is looking at."),
		deps: O(T()).describe("Every dependency name declared anywhere in the repository. Names rather than a verdict about which framework this is, because that judgement belongs to whatever reads this, not to a sandbox baked months ago.")
	}), vx = k({
		packages: O(gx).describe("Each package in the repository, as its own manifest declares it."),
		shape: _x.describe("What the repository is made of, which decides whether a given chore is even a sensible question to ask of it."),
		hotspots: O(ex).describe("Files that change often and are complicated at once, capped tight: a chore only asks whether something has entered the top of the ranking."),
		keyModules: O(tx).describe("The parts the rest of the code leans on most, capped the same way."),
		totals: k({
			files: E().describe("Files counted."),
			symbols: E().describe("Named things they export."),
			complexity: E().describe("Branch points added up."),
			hotspots: E().describe("How many files qualify as hotspots at all.")
		}).describe("The repository in numbers."),
		indexed: D().describe("Whether the index these rankings came from is finished. Nothing should act on a half-built one.")
	}), yx = M([
		"acted",
		"reported",
		"clean"
	]), bx = k({
		repo: T().describe("Which repository."),
		chore: T().describe("Which chore."),
		ranAt: E().describe("When it ran, in milliseconds."),
		runId: T().describe("The conversation that ran it, so its whole record can be opened."),
		outcome: yx.describe("What it concluded: it did something, it wrote something down, or it looked and found the finding to be false. That last one matters most, or the same turn starts again for ever."),
		digest: T().describe("A fingerprint of the evidence standing at the time. A chore whose evidence has since changed is due again on its own merits; one whose evidence has not stays quiet."),
		snoozedUntil: E().optional().describe("Not until then, in milliseconds. The chore stays visible and stays out of the badge. Different from switching it off, which is a setting.")
	}), xx = k({
		repo: T().describe("Which repository."),
		id: ax.describe("Which measurement."),
		askedAt: E().describe("When it was asked for, in milliseconds, so one still waiting can say how long it has waited."),
		startedAt: E().optional().describe("When it actually began. Absent while it is queued behind another, which is a real and common state: there is one lane for the whole sandbox.")
	}), Sx = k({
		repos: O(k({
			repo: T().describe("Which repository."),
			probes: O(hx).describe("The expensive measurements, served from a cache with an age on each rather than run on demand."),
			signals: vx.describe("The cheap facts, worked out fresh every time.")
		})).describe("Every repository's standing evidence. One answer for all of them, because a badge polls this on a timer and one request per repository is the kind of poll that shows up in a battery graph."),
		ledger: O(bx).describe("What has already been done about all of it."),
		running: O(xx).describe("What is being measured right now and what is waiting behind it. Part of this read rather than a route of its own, because a screen that had to ask twice would show the two halves disagreeing."),
		node: T().describe("The runtime version this sandbox is actually running, read off the process rather than off a manifest, because what is installed is the fact that matters and a declared range is a wish.")
	}), Cx = k({
		repo: T().min(1).describe("Which repository."),
		id: ax.describe("Which measurement to retake, ahead of its usual schedule.")
	}), wx = bx, Tx = k({
		id: T().describe("Which check."),
		label: T().describe("What it is called."),
		status: M([
			"pass",
			"warn",
			"fail"
		]).describe("How it went. A warning is a real third answer rather than a soft failure."),
		detail: T().describe("What it found.")
	}), Ex = k({ checks: O(Tx).describe("Everything that can be checked from the extension's own files, for an author about to publish.") });
})), Ox, kx = g((() => {
	z(), Dx(), W(), Ox = {
		list: R.route({
			method: "GET",
			path: "/chores",
			summary: "What maintenance the repos are asking for",
			description: "Every repo's standing evidence in one read: what the last measurement found and how old it is, the cheap signals that are always current, and what has already been decided about each."
		}).output(Sx),
		probe: R.route({
			method: "POST",
			path: "/chores/probe",
			summary: "Measure one repo again now",
			description: "Re-runs a single check without waiting for it to go stale. Answers immediately: the work happens in the background and the result turns up in the next read, because some of these sweeps outlive any sane request."
		}).input(Cx).output(H),
		record: R.route({
			method: "POST",
			path: "/chores/ledger",
			summary: "Record a verdict, or snooze one",
			description: "Writes what somebody concluded about one repo's chore, replacing the previous verdict. A chore has one current answer, not a growing pile of times it was fine."
		}).input(wx).output(H)
	};
})), Ax, jx = g((() => {
	z(), qg(), W(), Ax = {
		runs: R.route({
			method: "GET",
			path: "/ci/runs",
			summary: "Pipeline runs across the repos",
			description: "What the forges are reporting for every workspace repo that has a remote, served from a cache and filled in on demand. Repos whose notifications are not wired up say so."
		}).output(Vg),
		rerun: R.route({
			method: "POST",
			path: "/ci/runs/rerun",
			summary: "Run a pipeline again",
			description: "Asks the forge to re-run one pipeline. The daemon only passes the request along."
		}).input(Hg).output(H),
		cancel: R.route({
			method: "POST",
			path: "/ci/runs/cancel",
			summary: "Cancel a pipeline run",
			description: "Asks the forge to stop a run in progress."
		}).input(Hg).output(H),
		jobs: R.route({
			method: "POST",
			path: "/ci/runs/jobs",
			summary: "The steps inside one pipeline run",
			description: "Each job in a run with its outcome, which is where you look to find out what actually broke."
		}).input(Hg).output(zg),
		fix: R.route({
			method: "POST",
			path: "/ci/fix",
			summary: "Put an agent on a broken pipeline",
			description: "Opens a fresh isolated conversation already holding the failure: which job, which repo, what it said. The answer names the conversation so you can open it."
		}).input(Ug).output(Wg)
	};
})), Mx, Nx, Px, Fx = g((() => {
	z(), L(), Cb(), pf(), Mx = M([
		"unknown",
		"healthy",
		"degraded",
		"unavailable"
	]), Nx = k({
		available: D(),
		allowance: E().int().nonnegative(),
		used: E().int().nonnegative(),
		remaining: E().int().nonnegative(),
		health: Mx,
		resetsAt: T().optional(),
		retryAt: T().optional(),
		servedModel: T().optional()
	}), Px = {
		models: R.route({
			method: "GET",
			path: "/endpoints/{id}/models",
			summary: "Models a connected server offers",
			description: "Asks one configured model server what it serves. There is no built-in list and no fallback: what a server offers is knowable only by asking it, so an empty answer is the honest report that we could not."
		}).input(hb).output(ff),
		trial: R.route({
			method: "GET",
			path: "/endpoints/trial/status",
			summary: "What is left of the free trial",
			description: "The allowance, what has been used, when it resets, and which model actually answered the last message. Not being available is the ordinary answer rather than a failure: most sandboxes run against a platform that offers no trial at all."
		}).output(Nx)
	};
})), Ix, Lx = g((() => {
	z(), Uv(), iy(), W(), Ix = {
		list: R.route({
			method: "GET",
			path: "/exit",
			summary: "Ways to come out somewhere else",
			description: "Every configured exit with its live state, the country it was asked to appear in, and the country it actually appears in. Those last two disagreeing is the whole reason this reports both."
		}).output(ty),
		countries: R.route({
			method: "GET",
			path: "/exit/{id}/countries",
			summary: "Countries one exit can reach",
			description: "Where this exit can put you, ranked by how much capacity is really there. Asked of the provider when it answers and taken from a built-in list when it does not, and the answer says which of those you got."
		}).input(ny).output($v),
		start: R.route({
			method: "POST",
			path: "/exit/{id}/start",
			summary: "Bring an exit up",
			description: "Starts the exit in the country it was configured for. Streamed, because a first start fetches a catalogue, raises a tunnel and then checks the address, which takes tens of seconds on the free providers and can fail at each step with something worth reading. Starting one that is already up simply says so."
		}).input(ny).output(Fu(Ev)),
		use: R.route({
			method: "POST",
			path: "/exit/{id}/use",
			summary: "Move to another country",
			description: "Switches the exit's country, starting it first if it was down. It ends by checking where the world actually sees you and fails if that does not match what you asked for. A switch that quietly left your traffic where it was is the exact failure this whole feature exists to rule out."
		}).input(ry).output(Fu(Ev)),
		rotate: R.route({
			method: "POST",
			path: "/exit/{id}/rotate",
			summary: "Take a different address, same country",
			description: "Swaps to another address in the country you are already in. Fails if the address does not actually change, which on a small pool it sometimes cannot."
		}).input(ny).output(Fu(Ev)),
		check: R.route({
			method: "POST",
			path: "/exit/{id}/check",
			summary: "Where the world sees you right now",
			description: "Looks up the address and country as seen through this exit. Cheap, and the honest answer to whether you are really where you meant to be, which is what every other call here is judged against."
		}).input(ny).output(Zv),
		stop: R.route({
			method: "POST",
			path: "/exit/{id}/stop",
			summary: "Take an exit down",
			description: "Shuts the exit off. One that was already down is fine: the promise is that it is not up afterwards, not that it was up before."
		}).input(ny).output(H)
	};
})), Rx = g((() => {})), zx = g((() => {})), Bx, Vx, Hx = g((() => {
	L(), Bx = 4096, Vx = {
		art: T().max(Bx).optional().describe("This extension's own mark, as a complete SVG document inline: the tier an author controls fully. Give it a viewBox and let it fill its own square edge to edge; it is drawn as the tile, not as a glyph on a plate. Kept as readable SVG text (not base64) so a registry reviewer can see what they are publishing, drawn inert so it cannot script the page, and capped at 4 KB. Anything that does not parse as SVG falls back to `logo`, then `icon`, then initials."),
		logo: T().optional().describe("A simple-icons slug, fetched from a CDN: right for standing in for somebody else's product. Add a \"/<hex>\" suffix to force a colour for a mark that vanishes against the surface it lands on. Unreachable in an offline sandbox, so it falls back to `icon`, then to initials."),
		icon: T().optional().describe("A name from the host's own icon set, drawn when no simple-icons slug fits. It ships in the image, follows the theme and costs no request: what actually carries a first-party extension. An unknown name falls back to initials rather than to a hole.")
	};
})), Ux, Wx, Gx = g((() => {
	L(), Ux = k({ path: T().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root.") }), Wx = {
		name: "agent",
		description: "Declare that this checkout is also a Claude Code plugin, so the agent picks up its skills, agents, hooks, commands and MCP servers each turn. The daemon hands the directory to the plugin loader and never parses what is in it.",
		schema: Ux
	};
})), Kx, qx, Jx = g((() => {
	L(), Kx = k({
		id: T().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/).describe("Prefills the automation name, and is what \"does one of these exist already\" is asked by, so spell it as an id, not as prose."),
		title: T().min(1),
		logo: T().min(1).optional().describe("A simple-icons slug for the card."),
		icon: T().min(1).optional().describe("A name from the host's icon set, drawn when no simple-icons slug fits."),
		requires: O(T().min(1)).optional().describe("Capability providers that make this template work: any one connected is enough (fixing CI rides github or gitlab). Omitted ⇒ nothing to connect, so it is always offered."),
		trigger: k({
			kind: M([
				"schedule",
				"event",
				"listener",
				"workspace"
			]),
			cron: T().min(1).optional(),
			provider: T().min(1).optional(),
			eventType: T().min(1).optional(),
			event: T().min(1).optional()
		}).describe("What wakes it. Checked against the real trigger schema when the daemon builds the catalogue, so a template can never offer one that would be refused."),
		guard: T().min(1).optional().describe("A condition that must hold before the turn runs: what makes a template safe to leave switched on."),
		holdForSeconds: E().int().positive().optional().describe("Wait this long and coalesce repeats, rather than firing on every event."),
		prompt: T().min(1).describe("The turn this starts. You own the trigger's payload vocabulary, so you own the prompt that reads it."),
		note: T().min(1).optional(),
		setup: T().min(1).optional().describe("What the user must do themselves before this can work."),
		description: T().min(1).optional(),
		offer: M(["create", "configure"]).optional().describe("Absent ⇒ it waits in the gallery, where you go once you know what you want. `create` puts a card on the page that makes it, switched off, in one click. `configure` puts one there that opens the dialog prefilled, for a template that cannot work unconfigured. Both are for what a user would never think to go looking for: mark everything as offered and you have rebuilt the gallery with extra steps."),
		chore: D().optional().describe("Whether what this makes watches THIS codebase rather than the outside world. Declared rather than read off the trigger: a nightly dependency sweep and a nightly Stripe poll are both schedules.")
	}), qx = {
		name: "automationTemplates",
		description: "Starting points this pack offers in the automation composer, a trigger, a prompt written for that trigger's payload, and whatever guard makes it safe to leave on. Declared by whoever knows the service rather than by the composer, so they appear when your pack is installed and disappear with it. Pure prefill: creating one makes an ordinary automation.",
		schema: O(Kx)
	};
})), Yx, Xx = g((() => {
	L(), Yx = {
		name: "bin",
		description: "A checkout-relative directory of executables the daemon puts on the agent's PATH every turn, how you ship the agent a command-line tool. The files are the approved code themselves: they ride the pinned checkout, and the daemon only adds the directory to PATH.",
		schema: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "bin must stay inside the checkout" })
	};
})), Zx, Qx, $x, eS, tS, nS, rS, iS, aS = g((() => {
	Zx = class extends Error {
		source;
		offset;
		constructor(e, t, n) {
			super(`${e} (in \`${t}\` at ${n})`), this.source = t, this.offset = n, this.name = "WhenSyntaxError";
		}
	}, Qx = [
		"&&",
		"||",
		"==",
		"!=",
		">=",
		"<=",
		">",
		"<",
		"(",
		")",
		"[",
		"]",
		",",
		"!"
	], $x = /[A-Za-z_]/, eS = /[A-Za-z0-9_.-]/, tS = (e) => {
		let t = [], n = 0;
		for (; n < e.length;) {
			let r = e[n] ?? "";
			if (r.trim() === "") {
				n += 1;
				continue;
			}
			if (r === "'" || r === "\"") {
				let i = e.indexOf(r, n + 1);
				if (i === -1) throw new Zx("unterminated string", e, n);
				t.push({
					kind: "literal",
					value: e.slice(n + 1, i),
					at: n
				}), n = i + 1;
				continue;
			}
			let i = Qx.find((t) => e.startsWith(t, n));
			if (i !== void 0) {
				t.push({
					kind: "punct",
					text: i,
					at: n
				}), n += i.length;
				continue;
			}
			if (/[0-9]/.test(r)) {
				let r = /^[0-9]+(\.[0-9]+)?/.exec(e.slice(n))?.[0] ?? "";
				t.push({
					kind: "literal",
					value: Number(r),
					at: n
				}), n += r.length;
				continue;
			}
			if ($x.test(r)) {
				let r = n + 1;
				for (; r < e.length && eS.test(e[r] ?? "");) r += 1;
				let i = e.slice(n, r);
				i === "true" || i === "false" ? t.push({
					kind: "literal",
					value: i === "true",
					at: n
				}) : i === "in" || i === "not" ? t.push({
					kind: "punct",
					text: i,
					at: n
				}) : t.push({
					kind: "key",
					text: i,
					at: n
				}), n = r;
				continue;
			}
			throw new Zx(`unexpected character ${JSON.stringify(r)}`, e, n);
		}
		return t;
	}, nS = class {
		tokens;
		source;
		index = 0;
		constructor(e, t) {
			this.tokens = e, this.source = t;
		}
		parse() {
			let e = this.or(), t = this.tokens[this.index];
			if (t !== void 0) throw new Zx("unexpected trailing input", this.source, t.at);
			return e;
		}
		or() {
			let e = this.and();
			if (!this.at("||")) return e;
			let t = [e];
			for (; this.eat("||");) t.push(this.and());
			return {
				kind: "or",
				operands: t
			};
		}
		and() {
			let e = this.unary();
			if (!this.at("&&")) return e;
			let t = [e];
			for (; this.eat("&&");) t.push(this.unary());
			return {
				kind: "and",
				operands: t
			};
		}
		unary() {
			if (this.eat("!")) return {
				kind: "not",
				operand: this.unary()
			};
			if (this.eat("(")) {
				let e = this.or();
				return this.expect(")"), e;
			}
			let e = this.tokens[this.index];
			if (e?.kind !== "key") throw new Zx("expected a context key", this.source, e?.at ?? this.source.length);
			return this.index += 1, this.tail(e.text);
		}
		tail(e) {
			for (let t of [
				"==",
				"!=",
				">=",
				"<=",
				">",
				"<"
			]) if (this.eat(t)) return {
				kind: "compare",
				key: e,
				op: t,
				value: this.literal()
			};
			return this.eat("in") ? {
				kind: "member",
				key: e,
				values: this.list(),
				negated: !1
			} : this.at("not") ? (this.index += 1, this.expect("in"), {
				kind: "member",
				key: e,
				values: this.list(),
				negated: !0
			}) : {
				kind: "has",
				key: e
			};
		}
		list() {
			this.expect("[");
			let e = [this.literal()];
			for (; this.eat(",");) e.push(this.literal());
			return this.expect("]"), e;
		}
		literal() {
			let e = this.tokens[this.index];
			if (e?.kind !== "literal") throw new Zx("expected a literal value", this.source, e?.at ?? this.source.length);
			return this.index += 1, e.value;
		}
		at(e) {
			let t = this.tokens[this.index];
			return t?.kind === "punct" && t.text === e;
		}
		eat(e) {
			return this.at(e) ? (this.index += 1, !0) : !1;
		}
		expect(e) {
			if (!this.eat(e)) throw new Zx(`expected \`${e}\``, this.source, this.tokens[this.index]?.at ?? this.source.length);
		}
	}, rS = (e) => new nS(tS(e), e).parse(), iS = (e) => {
		try {
			return rS(e), !0;
		} catch {
			return !1;
		}
	};
})), oS, sS, cS, lS, uS, dS, fS = g((() => {
	aS(), L(), Hx(), oS = k({
		key: T().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
		label: T().min(1),
		placeholder: T().optional(),
		secret: D().optional().describe("Mask it, and never echo it back."),
		optional: D().optional(),
		multiline: D().optional(),
		advanced: D().optional().describe("Fold this field behind the form's Advanced disclosure: for answers whose default is right for nearly everyone. The disclosure opens by itself while any advanced field holds a non-default value, so an edit never hides live settings."),
		boolean: D().optional().describe("Render it as a switch, carrying \"on\"/\"off\". For an opt-in EXTRA rather than a decision: a two-option picker says the same thing but presents a choice the user must make to proceed, sized like the required fields around it. A switch always holds a value, so a field like this never blocks a submit."),
		hint: T().optional().describe("A line under this control, for what the label alone cannot say: a host requirement, when a value takes effect. The card's own `hint` speaks for the whole card; this one is bound to the field it qualifies."),
		rebuild: D().optional().describe("This value only takes effect after the sandbox is rebuilt, because it rides the image overlay. Shown as a chip beside the label: two switches side by side, identical in every visible way, can otherwise cost five seconds or five minutes with no way to tell which."),
		default: T().optional(),
		options: O(k({
			value: T(),
			label: T()
		})).optional().describe("Turns the field into a select."),
		when: T().refine(iS, { message: "not a valid `when` condition" }).optional().describe("Only show this field while a condition over the answers already given holds: `auth == 'key'`, `provider in ['ipsec', 'fortinet']`, `!advanced`. Supports `&&`, `||`, `!`, comparisons and `in`."),
		value: T().optional().describe("A fixed value baked into the config rather than asked for: how a card pins its discriminator (platform=\"reddit\", provider=\"stripe\"). Renders as nothing."),
		totp: D().optional().describe("This field holds a TOTP seed, the base32 key or otpauth:// URI a service shows when enrolling an authenticator app. Declare it with `secret: true`. Unlike an ordinary secret it never enters the agent's environment: the daemon mints the six-digit codes on demand and only those cross.")
	}), sS = k({
		url: T().min(1).describe("The URL to call, as a template over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Same spelling as `env`."),
		method: M([
			"GET",
			"POST",
			"HEAD"
		]).optional().describe("Defaults to GET."),
		headers: j(T(), T()).optional().describe("The request headers, templated the same way: `{\"Authorization\": \"Bearer ${token}\"}`."),
		identity: T().optional().describe("A dotted path into the JSON answer naming who the caller is (\"login\", \"user.name\"), so success can say which account answered."),
		insecure: D().optional().describe("Accept a self-signed certificate, for a service whose local install ships one (Obsidian's Local REST API).")
	}), cS = k({
		name: T().min(1),
		...Vx,
		description: T().min(1).describe("ONE LINE: aim for 60 characters or fewer. The grid clamps it at two lines in a narrow pane, so a paragraph here is a paragraph the reader gets truncated. Everything longer belongs in `hint`."),
		category: T().min(1),
		hint: T().optional().describe("The paragraph, shown under the add form and searched from the catalog, so the words that identify this card to someone hunting for it (\"webauthn\", \"socket mode\") belong here even when the tile cannot show them."),
		guide: k({
			url: T().optional(),
			urlFromField: T().optional(),
			path: T().optional(),
			linkLabel: T().optional(),
			scopes: T().optional(),
			steps: O(T()).optional()
		}).optional().describe("The walkthrough the install dialog renders for getting the credential this card asks for.")
	}), lS = {
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		catalog: cS,
		fields: O(oS)
	}, uS = A("kind", [
		k({
			...lS,
			kind: N("cli"),
			fields: O(oS).min(1),
			env: j(T().regex(/^[A-Z][A-Z0-9_]*$/), T()).describe("The environment the agent's shell gets, as value templates over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Each name is suffixed per instance."),
			skill: T().min(1).describe("Checkout-relative SKILL.md teaching the agent this tool. `${id}` in it is replaced with the instance name at apply time."),
			fragment: T().min(1).optional().describe("A Dockerfile fragment holding the client binary this tool needs (psql, mysql, whisper)."),
			pack: T().min(1).optional().describe("A sandbox feature pack name (whisper, llamacpp, browser, …) supplying this tool. Preferred over `fragment`: an image that already bakes the pack needs no rebuild, and there is no copy to drift."),
			probe: sS.optional().describe("One authenticated request that tests this card's settings before they are saved, so a wrong token or an unreachable host is answered on the form rather than by a card that says 'not connected' afterwards.")
		}),
		k({
			...lS,
			kind: N("browser"),
			loginUrl: oc().optional().describe("What the sign-in window opens; the profile it persists IS the credential. Optional so one card can be the generic one that asks for the URL on its form instead, but a card must either pin this or declare a field that supplies it, or the window opens on nothing."),
			homeUrl: oc().optional().describe("Where that same profile opens once it HAS a session: the owner's own hands on the connected browser. Separate from loginUrl because for some platforms the login lives on another site entirely (YouTube signs in at accounts.google.com)."),
			skill: T().min(1).describe("Checkout-relative SKILL.md teaching the agent this site's actions: rendered once per site, all its connected accounts on one roster (`${accounts}`), the core tool note at `${tools}`.")
		}),
		k({
			...lS,
			kind: N("host"),
			skill: T().min(1).describe("Checkout-relative SKILL.md teaching the agent that machine's shell.")
		}),
		k({
			...lS,
			kind: N("webext"),
			install: oc().describe("Where this browser's extension is installed from: its store listing, or a page offering the build."),
			skill: T().min(1).describe("Checkout-relative SKILL.md teaching the agent to drive this browser.")
		}),
		k({
			...lS,
			kind: N("agent")
		})
	]).superRefine((e, t) => {
		if (e.kind === "cli") for (let n of e.fields.filter((e) => e.totp === !0)) Object.values(e.env).some((e) => e.includes(`\${${n.key}}`) || e.includes(`\${${n.key}:uri}`)) && t.addIssue({
			code: "custom",
			message: `env must not reference the totp field "${n.key}", the daemon mints codes from it instead`
		});
	}), dS = {
		name: "capabilities",
		description: "Capability cards this pack adds to the \"+\" grid: a connected CLI tool, a site the agent acts on as the owner through the shared browser, an operating system pack, a browser family the owner connects their own copy of, or a preset over a core kind. The card and its form are data here; the machinery that acts on them is core, which is why a card may only name one of these five kinds.",
		schema: O(uS)
	};
})), pS, mS, hS = g((() => {
	aS(), L(), pS = k({
		command: T().regex(/^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/),
		title: T().min(1).describe("What the command palette shows. The manifest's value wins over the one passed at registration."),
		category: T().min(1).optional().describe("What the command acts on (\"Deployments\", \"Knowledge\"), drawn ahead of the title as \"Category: Title\" and searched with it. Use the extension's own name so its commands group together; omit it and the command stands alone."),
		icon: T().optional().describe("A name from the host's icon set, drawn beside the title."),
		keybinding: T().regex(/^\S+$/).optional().describe("A global keyboard shortcut, e.g. \"Mod+Shift+K\" — `Mod` is ⌘ on Apple and Ctrl elsewhere. Declared here because a global shortcut is consequential: the owner approves it at install, and the host binds only what was approved."),
		when: T().refine(iS, { message: "not a valid `when` condition" }).optional().describe("When the shortcut applies, as a condition over the shell's context keys, `tabSurface == 'chat'`, `!editableTarget`. Without one the chord is claimed everywhere, including inside a terminal where a bare key belongs to the program running in it. The command palette ignores this: a command is always runnable by name.")
	}), mS = {
		name: "commands",
		description: "Commands this extension may register handlers for, surfaced in the command palette. Title, icon and shortcut all come from here rather than from the registration call, because this is what the owner approved at install.",
		schema: O(pS)
	};
})), gS, _S, vS = g((() => {
	L(), gS = k({
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: T().min(1).describe("The family's name, shown in the install dialog beside your other contributions. Per-row wording stays with the provider, which is the only thing that knows what it found.")
	}), _S = {
		name: "documents",
		description: "Per-directory documents this extension can offer. Your provider marks the rows in the Workspace tree it has something to say about, and the host opens your component as a tab.",
		schema: O(gS)
	};
})), yS, bS, xS = g((() => {
	L(), yS = k({ fragment: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "fragment must stay inside the checkout" }).describe("Checkout-relative path to a file holding ONLY RUN and ENV instructions. FROM and privileged directives are rejected: those stay daemon-owned.") }), bS = {
		name: "environment",
		description: "A Dockerfile fragment baked into the sandbox image so your tools are actually installed at runtime: a whisper binary, a psql client. The owner approves the composed overlay and rebuilds out of band, so this does not take effect immediately.",
		schema: yS
	};
})), SS, CS, wS = g((() => {
	L(), SS = k({
		path: T().min(1).refine((e) => !e.startsWith("/") && !e.split("/").includes(".."), { message: "path must be workspace-root-relative and stay inside the workspace" }).describe("Workspace-root-relative, forward-slash, matched by prefix, so one entry covers an exact file (`.intentic/config/automations.json`), a directory (`.intentic/config/approvals/`, with the trailing slash so it cannot match a sibling file) or a name family (`.intentic/environment.`). Not a glob."),
		invalidates: O(T().min(1)).min(1).describe("The query keys this path makes stale, the first element of your own api.sandbox.key(...) keys. Keep both this and the path as narrow as the view actually needs: a broad prefix costs every connected browser a refetch on every matching write.")
	}), CS = {
		name: "files",
		description: "Which workspace files back your views, so the daemon's file watcher can tell the browser they went stale instead of you polling for it. The agent edits the workspace out of band from every HTTP route, and this push is the only thing that can notice.",
		schema: O(SS)
	};
})), TS, ES, DS, OS = g((() => {
	L(), TS = k({
		label: T().min(1),
		placeholder: T().min(1),
		hint: T().min(1).optional().describe("The sentence under the input, for a filter whose empty case is easy to get wrong.")
	}), ES = k({
		provider: T().regex(/^[a-z0-9][a-z0-9-]*$/).describe("The slug this source's automation triggers fire on."),
		events: O(k({
			type: T().regex(/^[a-z0-9][a-z0-9_]*$/),
			label: T().min(1)
		})).min(1).refine((e) => new Set(e.map((e) => e.type)).size === e.length, { message: "listener event types must be unique" }).describe("The event types this source can fire, with the wording the automation editor offers them under. The daemon accepts no others."),
		automation: k({
			label: T().min(1),
			mentionLabel: T().min(1).optional().describe("Only for a source whose message events distinguish being addressed. Absent ⇒ the editor offers no mention-only filter, rather than inventing semantics you did not promise."),
			channel: TS.describe("The primary narrowing filter, a channel, a room, a repo."),
			branchField: TS.optional().describe("A second narrowing axis, for a source whose events carry one: a pipeline's git ref, so a trigger can say \"the branch that ships\" rather than \"every agent's every failure\"."),
			sender: TS.optional().describe("How this source names a sender, and where a person finds that id. Declaring it promises that `author.id` is an identity the service vouches for, not a name the sender typed; absent ⇒ the editor offers no sender rules on this source."),
			senderGroup: TS.optional().describe("How this source names a sender's group, for a source whose messages carry `author.groups` (a Discord role). Absent ⇒ rules match ids only."),
			starterPrompt: T().min(1).describe("The first prompt a new automation on this source is prefilled with. You own the payload vocabulary, so you own the prompt that explains it.")
		}).describe("How the generic automation editor presents this source: its name, its filters, and the prompt it starts people on.")
	}), DS = {
		name: "listener",
		description: "A realtime event source this extension supplies, so automations can trigger on it. One declaration feeds both halves: the daemon accepts these event types and serves this provider's control surface, and the automation editor derives its source picker, filters and starter prompt from it, so a newly installed listener is configurable without a matching app release.",
		schema: ES
	};
})), kS, AS, jS = g((() => {
	L(), kS = k({
		name: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		command: T().min(1),
		cwd: T().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root."),
		port: N("auto").optional().describe("Assign a free port and inject it as PORT."),
		preview: D().optional().describe("Expose the port on a tunnelled preview hostname."),
		autoStart: D().optional().describe("Launch it on install and on daemon boot, rather than waiting to be started.")
	}), AS = {
		name: "processes",
		description: "Long-lived background processes the daemon runs for this extension: a gateway holding a connection the daemon must not, a dev server. Managed the same way panel dev servers are, and startable and stoppable from the Extensions tab.",
		schema: O(kS)
	};
})), MS, NS, PS = g((() => {
	L(), MS = k({
		key: T().regex(/^[a-z0-9][a-zA-Z0-9-]*$/),
		type: M([
			"boolean",
			"string",
			"number",
			"enum"
		]).describe("Which control the Settings page draws. `enum` reads its choices from `enum`."),
		title: T().min(1),
		description: T().optional().describe("The line under the control."),
		default: mc([
			T(),
			E(),
			D()
		]).optional(),
		enum: O(T()).optional().describe("The choices, for type \"enum\". Meaningless otherwise."),
		secret: D().optional().describe("Mask the value in the UI and strip it from reads: a set secret round-trips as 'still set', never as its value."),
		env: T().regex(/^[A-Z][A-Z0-9_]*$/).optional().describe("Inject the stored value into the agent's shell environment under this name, every turn. How a credential you hold reaches the agent's command-line tools.")
	}), NS = {
		name: "settings",
		description: "Typed settings the host renders into the Settings page for you and persists daemon-side. You never draw the form or store the value; you read it back with api.settings.get.",
		schema: O(MS)
	};
})), FS, IS, LS = g((() => {
	L(), FS = k({
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		extensions: O(T().regex(/^[a-z0-9]+$/)).min(1).describe("Bare file extensions, no dot: e.g. [\"docx\", \"xlsx\"]."),
		fetch: M([
			"text",
			"blob",
			"url"
		]).describe("How much of the file the host hands you. `text` for a format that is text (svg, a subtitle track). `blob` for one that must be parsed end to end before any of it shows (a .docx, a spreadsheet), bounded by the daemon's raw-read cap. `url` for anything range-read rather than parsed (audio, video): your component gets a streaming URL to point an element at, never the bytes.")
	}), IS = {
		name: "viewers",
		description: "File formats this extension can render. The host resolves an opened file to your viewer by its extension, fetches the content, and renders your component with it: you keep none of the fetch lifecycle and none of the daemon credentials.",
		schema: O(FS)
	};
})), RS, zS, BS = g((() => {
	L(), RS = k({
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: T().min(1).describe("The name shown on the tile or tab. The manifest's value wins over the one passed at registration."),
		surface: M([
			"rail",
			"directory",
			"sandbox"
		]).describe("Where it appears. `rail` is a tile in the global left rail; `directory` is a panel opened from a repo in the Workspace tree; `sandbox` is a tab on the Sandbox hub, for a view whose subject is the box rather than the work."),
		badge: D().optional().describe("Allow this view to say something on its tile: a count, a glyph, or that work is running there. Declared because a badge interrupts from every other screen in the app; leave it out and any badge the extension registers is dropped.")
	}), zS = {
		name: "views",
		description: "Sidebar elements this extension may register at runtime. Each entry reserves an id and a surface; the extension supplies the component with api.views.register, and the host refuses any registration this list does not cover.",
		schema: O(RS)
	};
})), VS, HS, US = g((() => {
	L(), Gx(), Jx(), Xx(), fS(), hS(), vS(), xS(), wS(), OS(), jS(), PS(), LS(), BS(), Gx(), Jx(), Xx(), fS(), hS(), vS(), xS(), wS(), OS(), jS(), PS(), LS(), BS(), VS = [
		zS,
		CS,
		IS,
		_S,
		mS,
		NS,
		AS,
		Wx,
		bS,
		dS,
		DS,
		qx,
		Yx
	], HS = k(Object.fromEntries(VS.map((e) => [e.name, e.schema.describe(e.description).optional()])));
})), WS, GS = g((() => {
	L(), Hx(), US(), WS = k({
		$schema: T().optional().describe("The authoring schema, for editor completion and validation. Nothing at runtime reads it."),
		publisher: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		name: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		version: T().min(1).describe("Your own semver, display and identity only. The installed code's identity is the pinned commit sha."),
		category: T().min(1).optional().describe("Which section of the Extensions tab this sits under: a grouping by what it is FOR, which cannot be derived from what it contributes. A section this app has never heard of lands in 'Other' rather than failing to install."),
		...Vx,
		engines: k({ intentic: T().min(1) }).describe("A semver range over the host's extension API version, checked before your code is activated."),
		entry: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "entry must stay inside the checkout" }).optional().describe("Repo-relative path of your prebuilt single-file ESM bundle, built with `vue` and `@intentic/extension-api` as externals. Absent ⇒ an extension with no UI."),
		server: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "server must stay inside the checkout" }).optional().describe("Repo-relative path of your prebuilt single-file node ESM server bundle, exporting `activateServer`. Served under your own route namespace, which the daemon proxies. Nothing is provided at runtime but node builtins, so bundle everything else in. Absent ⇒ no backend."),
		permissions: k({
			sandbox: O(T()).optional().describe("Daemon routes your UI half may call. Your own backend namespace needs no entry: its backend is your own code."),
			daemon: O(T()).optional().describe("Daemon routes your SERVER half may call. Separate from `sandbox` because the two halves run as different principals: the UI as the owner's session, the backend as a minted per-extension token, so a grant to one must never quietly widen the other.")
		}).optional().describe("How far this extension may reach into the daemon, as \"<METHOD> <path-glob>\" entries where `*` matches one path segment: e.g. \"GET /panels\", \"POST /panels/*/start\". The install dialog shows these, the host refuses anything undeclared, and the usage ledger records which were actually earned."),
		contributes: HS.optional()
	});
})), KS = g((() => {
	GS();
})), qS = g((() => {})), JS = g((() => {})), YS = g((() => {
	Rx(), zx(), KS(), GS(), qS(), US(), JS();
})), XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC = g((() => {
	L(), YS(), XS = T().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/), ZS = k({
		updates: M([
			"notify",
			"agent",
			"auto"
		]),
		advisories: M(["auto-disable", "notify"])
	}), QS = k({
		ref: T().describe("The commit being offered."),
		version: T().optional().describe("What it calls itself."),
		url: T().describe("Where it comes from."),
		path: T().optional().describe("Where inside that repository it lives."),
		trust: M(["verified", "listed"]).describe("Whether anybody vouched for it, or it is merely listed."),
		securityFix: D().optional().describe("This release fixes a security problem in earlier ones, so here the old version is the dangerous one."),
		registry: T().describe("Which registry said so."),
		at: T().describe("When it was published."),
		needsReview: T().optional().describe("Why this one was not taken automatically and is asking for a person instead: it wants more than it used to, or nobody has vouched for it."),
		review: k({
			conversationId: T().describe("Where to read what it found."),
			at: T().describe("When it looked.")
		}).optional().describe("An agent has already read the difference between what is installed and this, so the card can link to what it found rather than offer to start looking.")
	}), $S = k({
		reason: T().describe("Why the registry pulled the listing, in its own words. Delisting protects people browsing; this record is for the person already running it."),
		registry: T().describe("Which registry said so."),
		at: T().describe("When."),
		autoDisabled: D().describe("Whether the sandbox has already switched it off.")
	}), eC = k({
		state: M([
			"watching",
			"healthy",
			"unhealthy"
		]).describe("How it has behaved since the last update. Checks catch broken, not wrong, so for a while after a swap it is simply watched."),
		detail: T().optional().describe("What is going wrong, when something is."),
		fromRef: T().optional().describe("Which version it was updated from, which is what going back would return to."),
		at: T().describe("When the watching started."),
		autoReverted: D().optional().describe("The update was already rolled back without anybody asking. The record stays rather than pretending the attempt never happened.")
	}), tC = k({
		added: O(T()).describe("What the new version asks for that the running one does not. The whole point of the comparison."),
		removed: O(T()).describe("What it no longer asks for."),
		unchanged: O(T()).describe("What stays the same.")
	}), nC = k({
		id: XS.describe("Which extension."),
		ref: T().regex(/^[0-9a-f]{40}$/).optional().describe("Which commit, in full. Leave it out for whatever the last check found, which is what most callers mean.")
	}), rC = k({
		ref: T().describe("The commit this would install."),
		version: T().describe("What that version calls itself."),
		installedVersion: T().describe("What is running now."),
		engines: T().describe("Which sandbox versions the new one says it needs."),
		compatible: D().describe("Whether this sandbox is one of them."),
		powers: tC.describe("Exactly what the new code asks for that the running one does not. This is what approving an update is approving.")
	}), iC = k({
		ok: N(!0).describe("It went through."),
		ref: T().describe("Which commit is now running."),
		rebuildNeeded: D().optional().describe("The new version changes what the sandbox image contains, so a one-time rebuild is still pending and the update is not wholly landed yet.")
	}), aC = k({
		id: XS.describe("Which extension."),
		updates: M([
			"notify",
			"agent",
			"auto"
		]).optional().describe("What to do about a newer version: tell you, have an agent read the difference first, or just take it."),
		advisories: M(["auto-disable", "notify"]).optional().describe("What to do about a security warning: switch it off at once, or tell you.")
	}), oC = k({
		ok: N(!0).describe("The check ran."),
		checkedAt: T().describe("When, so a screen can date the answer.")
	}), sC = k({
		id: XS.describe("The extension's id."),
		manifest: WS.describe("What it declares about itself: what it contributes, what it needs, and what it may reach."),
		commit: T().describe("Exactly which commit is installed."),
		source: M([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where the code comes from: baked into the sandbox image and not removable, installed from a repository at a pinned commit, or written in this workspace and edited in place."),
		enabled: D().describe("The owner's switch. A switched-off extension is still listed, which is what makes it switchable back on, but nothing it contributes is wired up."),
		essential: D().optional().describe("Its switch is fixed on, because it is the only way to see or stop an engine the sandbox runs regardless. Hiding that page would not stop the spending, only your ability to notice it. Declared by the core about its own surfaces, never by an extension about itself, which would be a pack making itself un-removable."),
		usage: j(T(), k({
			calls: E().int().nonnegative().describe("How many times."),
			last: T().describe("When, most recently.")
		})).optional().describe("How much of the reach it asked for it has actually used, keyed by what it declared. Absent means never observed doing anything, which is a different claim from uses none of them, and the two have to stay tellable apart: reading either as these permissions are unnecessary turns evidence into a guess with a number on it."),
		backend: k({
			state: M([
				"running",
				"error",
				"absent",
				"incompatible",
				"starting",
				"stopped"
			]).describe("How its server half is doing. Absent means the code is not in this image at all; incompatible means it needs a different sandbox version."),
			detail: T().optional().describe("What went wrong, so a backend that failed to start is a sentence rather than an address that answers nothing.")
		}).optional().describe("Present only for an extension that ships a server half."),
		update: QS.optional().describe("A newer version waiting. All five of these exist only for one installed from a repository: a built-in updates with the image and one written here is edited live."),
		advisory: $S.optional().describe("A security warning about the installed version."),
		health: eC.optional().describe("How it has behaved since the last update, which is what decides whether that update sticks."),
		previous: k({
			ref: T().describe("The commit that was running before."),
			version: T().optional().describe("What it called itself.")
		}).optional().describe("The version kept one step back, which is what going back means."),
		updatePolicy: ZS.optional().describe("The owner's standing answer for this one: tell me, have an agent look, or just do it.")
	}), cC = k({
		dir: T().describe("Which folder."),
		error: T().describe("Why it could not be read.")
	}), lC = k({
		extensions: O(sC).describe("What is installed."),
		invalid: O(cC).describe("Extensions written here that could not be read at all. Listed rather than dropped, because there is no install moment at which to reject a broken one, so this is its only way of saying anything."),
		updatesCheckedAt: T().optional().describe("When updates were last looked for. Absent until the first check has run. Sent so a screen can say checked an hour ago rather than presenting staleness as certainty.")
	}), uC = k({
		settings: j(T(), mc([
			T(),
			E(),
			D()
		])).describe("The values, minus anything marked secret."),
		secretsSet: O(T()).describe("Which of its secret settings actually hold a value. Names only: the values themselves never come back.")
	}), dC = k({
		id: T().describe("Which extension."),
		settings: j(T(), mc([
			T(),
			E(),
			D()
		])).describe("The values to write. A key the extension never declared is refused rather than quietly stored.")
	}), fC = k({
		id: T().describe("Which extension."),
		enabled: D().describe("On or off.")
	}), pC = k({
		publisher: T().regex(/^[a-z0-9][a-z0-9-]*$/).describe("Who it is by, which together with the name makes its id."),
		name: T().regex(/^[a-z0-9][a-z0-9-]*$/).describe("What it is called.")
	}), mC = k({
		id: T().describe("The id it was given."),
		dir: T().describe("Where its files are, so you can open them.")
	}), hC = k({
		id: T().describe("The name the owner gave it, which is also the agent's handle for it."),
		kind: T().describe("Which core kind it is underneath: cli, browser, host or webext."),
		card: T().describe("The card it was added from, named as the grid names it."),
		secrets: O(T()).describe("Credential fields stored for it, by name. The values are deleted with the entry and cannot be recovered from here."),
		effect: T().describe("What tearing it down actually takes away, in one sentence.")
	}), gC = k({
		id: XS.describe("The extension's id, as the list addresses it."),
		name: T().describe("Its publisher.name identity, which is the key its settings and switch are stored under."),
		version: T().describe("The version being removed."),
		source: M([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where its code comes from, which decides what removal means."),
		blocked: T().optional().describe("Why this one cannot be removed, when it cannot. Present means every other field is what would go if it could."),
		files: O(k({
			path: T().describe("Workspace-relative."),
			detail: T().describe("What is in there.")
		})).describe("Directories deleted outright. For an extension written here this is the owner's own source, which nothing else keeps a copy of."),
		connections: O(hC).describe("Connections configured from its cards, which are removed with it."),
		settings: O(k({
			key: T().describe("Which setting."),
			secret: D().describe("Whether its value is a stored credential.")
		})).describe("Values the owner entered for this extension that are forgotten. Only keys actually holding a value are listed."),
		processes: O(T()).describe("Background processes it declared, stopped before its files go."),
		automations: O(T()).describe("Automations of the owner's own that wake on a listener this extension provides. They are NOT removed, and are listed because they stop firing, which is the sort of thing a removal is otherwise discovered by."),
		rebuildNeeded: D().describe("It bakes a layer into the sandbox image, so what it added to the image is only gone after the next environment rebuild."),
		keeps: O(T()).describe("What removal deliberately leaves alone, so the list of what goes can be read as complete.")
	}), _C = k({
		ok: N(!0).describe("It is gone."),
		connections: O(T()).describe("Which configured connections went with it, by name."),
		rebuildNeeded: D().optional().describe("Its image layer is still in the running sandbox until the next environment rebuild; nothing else is pending.")
	}), vC = k({ reports: j(T(), j(T(), E().int().positive())).describe("Each extension that called something, and the counts against the declared powers it exercised.") }), yC = k({
		id: T().describe("Which extension."),
		name: T().describe("Which of its declared processes.")
	}), bC = k({
		name: T().describe("Which process."),
		running: D().describe("Whether it is up. False with a port means it crashed and the supervisor is waiting to retry it."),
		port: E().optional().describe("The port it was given."),
		restarts: E().optional().describe("How many times it died and was brought back since it was started. A growing number is a service in trouble."),
		lastExitCode: E().optional().describe("How it last exited, when it has crashed at least once."),
		previewUrl: T().optional().describe("Where to open it, when it has an address.")
	});
})), SC, CC = g((() => {
	z(), Cb(), xC(), Dx(), W(), SC = {
		list: R.route({
			method: "GET",
			path: "/extensions",
			summary: "Installed extensions",
			description: "Every extension installed here, resolved to the manifest the owner approved, which is what the app boots its extension host from. The code itself is served separately, because raw script bytes are not a JSON answer."
		}).output(lC),
		create: R.route({
			method: "POST",
			path: "/extensions/workspace",
			summary: "Write a new extension in place",
			description: "Scaffolds a working extension into this workspace and installs it. The only call here that creates one, and it exists because that folder is otherwise reachable only through an agent's file tools, which is a fine way to change an extension and a poor way to meet the idea of one."
		}).input(pC).output(mC),
		removalPlan: R.route({
			method: "GET",
			path: "/extensions/{id}/removal",
			summary: "What removing an extension would take away",
			description: "Everything one removal destroys, before it happens: the files deleted, the connections configured from its cards, the settings and credentials forgotten, the background processes stopped, and the owner's own automations that quietly stop firing. Also answerable for an extension that cannot be removed, in which case it says why."
		}).input(hb).output(gC),
		remove: R.route({
			method: "POST",
			path: "/extensions/{id}/remove",
			summary: "Remove an extension",
			description: "Uninstalls it and everything that only existed because it was here: the connections added from its cards, with their stored credentials, its settings, its switch and its update record. What the owner made with it — automations, files in the workspace — is left alone. Owner only, for the same reason installing is. Built-in extensions cannot be removed; switch them off instead."
		}).input(hb).output(_C),
		settings: R.route({
			method: "GET",
			path: "/extensions/{id}/settings",
			summary: "An extension's settings",
			description: "The current values for the settings this extension declared it has."
		}).input(hb).output(uC),
		setSettings: R.route({
			method: "POST",
			path: "/extensions/{id}/settings",
			summary: "Change an extension's settings",
			description: "Writes new values. A key the extension never declared is refused rather than quietly stored, the same honesty rule that governs everything else an extension claims."
		}).input(dC).output(H),
		setEnabled: R.route({
			method: "POST",
			path: "/extensions/{id}/enabled",
			summary: "Turn an extension on or off",
			description: "The owner's switch. Turning one off stops its background processes at once. What it contributes to an agent's tools is rebuilt at the start of the next turn, and anything it adds to the sandbox image only at the next rebuild."
		}).input(fC).output(H),
		recordUsage: R.route({
			method: "POST",
			path: "/extensions/usage",
			summary: "Record what extensions just used",
			description: "One batch written by the app rather than measured by the daemon, because the permission gate runs in the browser: from the sandbox's side extension traffic is indistinguishable from anyone else's. This is how the record of which powers each extension actually exercises gets kept without one reporting request per extension."
		}).input(vC).output(H),
		readiness: R.route({
			method: "GET",
			path: "/extensions/{id}/readiness",
			summary: "Whether an extension is fit to share",
			description: "The checks that can be answered from an extension's own files, for an author about to publish. Read on demand rather than carried on the list, because it reads the code off disk each time."
		}).input(hb).output(Ex),
		checkUpdates: R.route({
			method: "POST",
			path: "/extensions/updates/check",
			summary: "Look for extension updates now",
			description: "Compares every installed extension against its source and reports what is newer, what carries an advisory and what looks unhealthy. This also happens on a schedule; call it to check on demand."
		}).output(oC),
		updatePreview: R.route({
			method: "POST",
			path: "/extensions/{id}/update/preview",
			summary: "What an update would change",
			description: "The read before the click: which versions are involved and exactly which powers the new code asks for that the running one does not. Costs one throwaway copy of the source, the same as browsing a registry entry."
		}).input(nC).output(rC),
		applyUpdate: R.route({
			method: "POST",
			path: "/extensions/{id}/update",
			summary: "Update an extension",
			description: "The whole swap as one transaction: fetch, check, quiet the running one, replace it while keeping the outgoing copy one step back, restart and watch it come up. The existing configuration is kept, so a token for a private source survives what removing and re-adding would lose. Owner only, because it changes what code runs."
		}).input(nC).output(iC),
		revert: R.route({
			method: "POST",
			path: "/extensions/{id}/revert",
			summary: "Go back to the previous version",
			description: "Swaps the copy kept from before the last update back into place. Owner only, for the same reason updating is."
		}).input(hb).output(iC),
		setUpdatePolicy: R.route({
			method: "POST",
			path: "/extensions/{id}/update-policy",
			summary: "How an extension should handle its own updates",
			description: "The owner's standing answer for one extension: tell me, have an agent look at it, or just do it. Security advisories can be opted out of separately."
		}).input(aC).output(H),
		processStatus: R.route({
			method: "GET",
			path: "/extensions/{id}/processes/{name}",
			summary: "Whether an extension's background process is up",
			description: "The state of one process an extension declared, with the port it was given and its preview address if it has one."
		}).input(yC).output(bC),
		processStart: R.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/start",
			summary: "Start an extension's background process",
			description: "Brings one of an extension's declared processes up in an attachable terminal."
		}).input(yC).output(H),
		processStop: R.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/stop",
			summary: "Stop an extension's background process",
			description: "Shuts one of an extension's declared processes down and frees its port."
		}).input(yC).output(H)
	};
})), wC = g((() => {
	Xu(), ed(), Zu.map((e) => ({
		label: e.label,
		value: e.id
	})), Object.fromEntries(Zu.map((e) => [e.id, e.access])), Zu.filter((e) => e.access.kind === "free").map((e) => e.id), Object.fromEntries(Zu.map((e) => [e.id, e.vendor])), Zu.filter((e) => e.planLimits).map((e) => e.id);
})), TC = g((() => {
	wC();
})), EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC = g((() => {
	Ep(), V(), EC = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), DC = [
		/\bgit\s+push\b[^|;&]*\s(?:-f\b|--force\b|--force-with-lease\b|--delete\b)/,
		/\bgit\s+reset\b[^|;&]*\s--hard\b/,
		/\bgit\s+clean\b[^|;&]*\s-{1,2}[a-zA-Z]*f/,
		/\bgit\s+branch\b[^|;&]*\s(?:-D\b|--delete\s+--force\b|--force\s+--delete\b)/,
		/\bgit\s+filter-branch\b/
	], OC = [/\{\{secret:[A-Za-z0-9_./-]+\}\}/], kC = String.raw`[\w~$.{}/\\-]*`, AC = [
		/(?<![\w.])\.env(?!\.(?:example|sample|template))(?:\.[\w-]+)?\b/,
		/\.ssh(?!\w)(?!\/(?:known_hosts|config|authorized_keys|environment)(?!\w))(?!\/[\w.-]*\.pub(?!\w))(?:\/[\w.\-/]*)?/,
		/\bid_(?:rsa|dsa|ecdsa|ed25519)\b(?!\.pub\b)/,
		new RegExp(String.raw`${kC}\.aws/credentials\b`),
		new RegExp(String.raw`${kC}\.npmrc(?!\.(?:example|sample|template))\b`),
		new RegExp(String.raw`${kC}\.git-credentials\b`),
		new RegExp(String.raw`${kC}\.credentials\.json\b`)
	], jC = [
		/\b(?:npm|pnpm|yarn|bun)\s+publish\b/,
		/\bcargo\s+publish\b/,
		/\bgh\s+release\s+create\b/,
		/\bdocker\s+push\b/,
		/\btwine\s+upload\b/
	], MC = String.raw`(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?(?=[/?#\s'"\x60]|$)`, NC = [new RegExp(String.raw`\b(?:curl|wget)\b[^|;&]*\bhttps?://(?!${MC})`), new RegExp(String.raw`\bfetch\(\s*['"\x60]https?://(?!${MC})`)], PC = [
		/\bmkfs(?:\.\w+)?\b/,
		/\bwipefs\b/,
		/\bblkdiscard\b/,
		/\bsgdisk\b[^|;&]*\s(?:--zap-all|-Z)\b/,
		/\bdd\b[^|;&]*\bof=(?:\/dev\/|['"`]\/dev\/)/,
		/\bshred\b[^|;&]*\s\/dev\//,
		/>\s*\/dev\/(?:[shv]d[a-z]|nvme\d|disk\d|mmcblk\d)/
	], FC = [
		/\b(?:docker|podman)\s+volume\s+(?:rm|remove|prune)\b/,
		/\b(?:docker|podman)\s+system\s+prune\b/,
		/\b(?:docker(?:\s+compose|-compose)?|podman-compose)\s+down\b[^|;&]*\s(?:-v\b|--volumes\b)/
	], EC(DC), EC(OC), EC(AC), EC(jC), EC(NC), EC(PC), EC(FC), IC = {
		"git.destructive": "rewrite or discard git history",
		"files.destructive": "delete files recursively",
		"system.destructive": "wipe a disk, or delete a whole root directory",
		"container.state": "delete a container volume or the data in it",
		"secrets.access": "read credential material",
		"package.publish": "publish or release a package",
		"network.outbound": "send a request out to the internet"
	}, LC = {
		"git.destructive": [
			{
				code: "git push --force",
				qualifier: "also -f and --force-with-lease"
			},
			{ code: "git push --delete" },
			{ code: "git reset --hard" },
			{ code: "git clean -f" },
			{ code: "git branch -D" },
			{ code: "git filter-branch" }
		],
		"files.destructive": [
			{ code: "rm -rf <path>" },
			{
				code: "fs.rm(<path>, { recursive: true })",
				qualifier: "also rmSync, rmdir, rmdirSync"
			},
			{ code: "rimraf(<path>)" }
		],
		"system.destructive": [
			{ code: "mkfs" },
			{ code: "wipefs" },
			{ code: "blkdiscard" },
			{ code: "sgdisk --zap-all" },
			{ code: "dd of=/dev/…" },
			{ code: "shred /dev/…" },
			{ code: "> /dev/sda" },
			{
				code: "rm -rf /",
				qualifier: "only when the target is a root, listed below"
			}
		],
		"container.state": [
			{
				code: "docker volume rm",
				qualifier: "also remove, prune, and podman for any of these"
			},
			{ code: "docker system prune" },
			{ code: "docker compose down -v" }
		],
		"secrets.access": [
			{
				code: "{{secret:NAME}}",
				qualifier: "a stored secret, used in the command itself"
			},
			{ code: ".env" },
			{ code: ".ssh/*" },
			{ code: "id_rsa" },
			{ code: ".aws/credentials" },
			{ code: ".npmrc" },
			{ code: ".git-credentials" }
		],
		"package.publish": [
			{
				code: "npm publish",
				qualifier: "also pnpm, yarn, bun"
			},
			{ code: "cargo publish" },
			{ code: "gh release create" },
			{ code: "docker push" },
			{ code: "twine upload" }
		],
		"network.outbound": [{
			code: "curl https://…",
			qualifier: "also wget; loopback does not count"
		}, {
			code: "fetch(\"https://…\")",
			qualifier: "in a script"
		}]
	};
})), zC, BC, VC, HC, UC, WC, GC, KC, qC, JC, YC = g((() => {
	L(), RC(), V(), zC = /* @__PURE__ */ new Set(["system.destructive"]), BC = /* @__PURE__ */ new Set([
		"system.destructive",
		"container.state",
		"files.destructive"
	]), VC = (e) => e === "sandbox" ? zC : BC, HC = {
		sandbox: "/ and /history. Not /work, /usr or /etc: the worktree's changes are uncommitted work, and the container comes back from its image.",
		device: "/, a home directory, a Windows drive, and the top-level directories an OS keeps."
	}, UC = (e) => Object.fromEntries(xd.options.map((t) => [t, VC(t).has(e) ? "hard" : "judged"])), WC = (e) => xd.options.filter((t) => e.tiers[t] === "hard").length, Sd.options.map((e) => ({
		commandClass: e,
		label: IC[e],
		patterns: LC[e],
		tiers: UC(e),
		...e === "system.destructive" ? { notes: HC } : {}
	})).sort((e, t) => WC(t) - WC(e)), GC = M([
		"off",
		"watch",
		"on"
	]), KC = M([
		"allow",
		"ask",
		"refuse"
	]), k({
		decision: KC.describe("Run it, ask the owner, or refuse it."),
		sentence: T().describe("What this command does and why it was allowed, held or refused, in one plain sentence."),
		policyLine: T().optional().describe("A line the owner could add to their policy so this stops being asked. Shown on the card before it is accepted.")
	}), qC = k({
		at: E().int().describe("When it was judged, epoch milliseconds."),
		program: T().describe("The command or script, excerpted."),
		classes: O(T()).describe("The kinds of consequence triage matched, which is why a judge looked."),
		decision: KC.describe("What the judge decided."),
		sentence: T().describe("The judge's sentence."),
		outcome: M([
			"allowed",
			"asked",
			"refused"
		]).describe("What the gate did in the end."),
		answer: M([
			"allowed",
			"declined",
			"unanswered"
		]).optional().describe("How the owner answered, when they were asked."),
		machine: T().optional().describe("Which connected device it was headed for, when it was not this sandbox.")
	}), JC = k({
		text: T().describe("The policy, as the owner wrote it."),
		custom: D().describe("False when nobody has edited it and this is the text this product ships.")
	});
})), XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw, ow, sw, cw, lw, uw, dw, fw, pw, mw, hw, gw, _w, vw, yw, bw, xw, Sw, Cw, ww, Tw, Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw = g((() => {
	Ep(), L(), YC(), Wu(), V(), XC = M([
		"intentic",
		"claude",
		"custom"
	]), ZC = k({ base: M(["intentic", "claude"]) }), QC = M([
		"off",
		"versions",
		"full"
	]), $C = M([
		"file.edited",
		"turn.ending",
		"push.starting",
		"agent.finished",
		"agent.landed"
	]), ew = M([
		"verify-edits",
		"verify-removals",
		"verify-ui-edits",
		"verify-tests",
		"version-landed"
	]), tw = A("kind", [
		k({
			kind: N("command"),
			command: T().max(500),
			timeoutMs: E().min(6e4).max(36e5).default(9e5)
		}),
		k({
			kind: N("instruct"),
			text: T().min(1).max(4e3)
		}),
		k({
			kind: N("verdict"),
			verdict: M(["allow", "hold"])
		}),
		k({
			kind: N("builtin"),
			name: ew
		})
	]), nw = M([
		"clean",
		"error",
		"conflict",
		"checks-failed"
	]), rw = k({
		repo: T().min(1).optional(),
		paths: O(T().min(1)).max(20).optional(),
		outcome: O(nw).optional(),
		sample: E().gt(0).lt(1).optional()
	}), iw = {
		"file.edited": ["command"],
		"turn.ending": [
			"builtin",
			"instruct",
			"command"
		],
		"push.starting": ["command"],
		"agent.finished": ["verdict"],
		"agent.landed": ["builtin"]
	}, aw = {
		"turn.ending": [
			"verify-edits",
			"verify-removals",
			"verify-ui-edits",
			"verify-tests"
		],
		"agent.landed": ["version-landed"]
	}, ow = k({
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: T().min(1).max(80),
		moment: $C,
		when: rw.optional(),
		action: tw,
		enabled: D().default(!0)
	}).refine((e) => iw[e.moment].includes(e.action.kind), {
		message: "that action cannot stand at that moment",
		path: ["action"]
	}).refine((e) => e.action.kind !== "builtin" || (aw[e.moment] ?? []).includes(e.action.name), {
		message: "that built-in cannot stand at that moment",
		path: ["action"]
	}), sw = j(T(), E()), cw = M([
		"builtin",
		"own",
		"capability",
		"extension",
		"plugin",
		"persona",
		"dropped"
	]), lw = T().regex(/^[a-z0-9][a-z0-9-]*$/, "a skill name is lowercase letters, digits and dashes"), uw = k({
		id: T().describe("Its handle, which reading and deleting take. A skill of your own is simply its name; one belonging to something else is qualified, because two packages may each ship a review."),
		name: T().describe("Its name."),
		description: T().describe("What it is for, which is the line the agent reads to decide whether to reach for it. Empty when the skill declares none, which is worth showing as the blank it is: a skill with no description is rarely picked."),
		origin: cw.describe("Where it came from."),
		owner: T().optional().describe("Who ships it, as the row would name them."),
		enabled: D().describe("Whether the agent can reach it."),
		switchable: D().describe("Whether this surface can switch it. Everything else is on because its extension or its plugin is, and a switch here that silently did nothing would be worse than none, so the row names its owner instead."),
		editable: D().describe("Whether it can be rewritten here. Your own only: editing somebody else's in place would be undone the next time the thing that ships it catches up."),
		removable: D()
	}), dw = O(uw), fw = k({
		id: T().describe("The skill's id, which can carry the owner it came from."),
		name: T().describe("Its name."),
		body: T().describe("The instructions themselves, as written.")
	}), pw = k({ id: T().min(1).describe("Which skill. It travels in the query rather than the address, because an id can name the owner it came from and that will not fit in a path.") }), mw = k({
		name: lw.describe("What to call it. Saving over an existing name rewrites it, which is also how one is renamed."),
		description: T().min(1).max(1024).describe("What it is for, which is what the agent reads to decide whether to reach for it."),
		body: T().min(1).describe("The skill itself.")
	}), hw = k({ name: lw.describe("Which skill to delete. The stored text and the agent's copy go together, so nothing is left half done.") }), gw = k({
		name: lw.describe("Which skill of your own to switch."),
		on: D().describe("On writes the agent's copy from the stored text; off removes that copy and keeps the text.")
	}), _w = k({
		stableSystemPrompt: D().default(!1).describe("Keep the instructions identical between turns so the provider can cache them, moving anything that varies into the message instead. Cheaper, at the cost of some flexibility."),
		skills: O(T()).default(["lsp", "fileq"]).describe("Which built-in tools are switched on. A skill of your own is not listed here: it is on while the agent's copy of it exists."),
		personaRouting: D().default(!0).describe("Whether a new chat is matched to one of your personas from its first message. The message is read once it is sent, by the model on the persona-routing list, and the chat says in its own transcript what was asked and which persona it landed on. Never applies to unwatched runs, which name their persona themselves."),
		hashlineEdits: D().default(!1).describe("Have the agent edit files by line number rather than by quoting the text it wants replaced. Cheaper on large files, and less forgiving of a stale read."),
		systemPromptMode: XC.default("intentic").describe("Which instructions the agent starts from: intentic's own, the ones the installed Claude Code carries, or your own. The first two both get this product's own guidance added on top; your own gets nothing added, which is the point of it."),
		systemPrompt: T().max(2e4).default("").describe("Your own instructions, used only when the mode above says custom. Then it is the whole of them: both built-in bases go, and so does everything this product would otherwise add, including the guidance the chat's own cards are driven by. That is the price of total control."),
		iqSearch: D().default(!1).describe("Teach the agent how to use this workspace's own search tool, rather than leaving it to grep around."),
		iqSearchHoldout: E().min(0).max(1).default(0).describe("What share of conversations to run without that teaching, so the two can be compared. Whole conversations rather than individual turns, because once the teaching is in a session, withholding it from the next request does not make the model forget it."),
		workspaceMap: D().default(!1).describe("Open every conversation with a map of the project it starts in: what is in it, what each part is for, and where the agent is standing. Worked out fresh each time rather than written down anywhere, because a written layout is wrong within a fortnight. Off by default, since it spends tokens on the first message of every conversation."),
		workspaceMapHoldout: E().min(0).max(1).default(0).describe("What share of conversations to open without the map, so the two can be compared. Whole conversations rather than individual turns, because the map is sent once and stays in the conversation's history afterwards."),
		sidecars: D().default(!1).describe("Keep an up-to-date markdown rendering of every document, image and audio file in the workspace, made in the background as files land, so the agent reads a pre-derived text instead of paying to parse the file mid-task. Costs background CPU on a document-heavy workspace, so it is a switch rather than a default."),
		dependencyFreshness: QC.default("off").describe("Whether a version the agent is about to pin is checked against the package's own registry first. Facts only, or facts plus the name of a maintained replacement where the registry agrees the current choice has been abandoned. It tells the agent and lets it decide rather than refusing, because matching a version your project already uses is usually the right answer and a gate would fight it."),
		outputCleaners: T().default("").describe("Which command outputs to trim before the agent reads them, cutting the noise a build tool prints without cutting what it said."),
		outputHoldout: E().min(0).max(1).default(0).describe("What share of commands to leave untrimmed, so the saving can be measured against a real comparison rather than estimated."),
		modelRoles: _c(Hu, O(kd).max(10)).default({}).describe("Which models do which job, one ordered list per job: commit messages, session titles, the safety judge, pipeline fixes, and every other place this sandbox picks a model for you. Tried in order, so one spent account does not take a job down. Nothing is chosen for you: a one-shot job with no list does not run, and a whole session with no list opens on whatever your own chat is set to."),
		changelogRepos: O(T()).max(50).default([]).describe("Which repositories keep a changelog, and so get a user-facing note written alongside each merge. A list rather than a switch, and empty by default, because the commit writer's standing rule is to copy the house style rather than impose one, and a repository that has never written such a note gives it nothing to copy."),
		autoTier: M([
			"off",
			"shadow",
			"on"
		]).default("shadow").describe("Whether an easy-looking turn may run on a cheaper model from the same provider. Three states rather than a switch, because the middle one is the only honest road to the third: it scores every turn and routes nothing, so the guess can become a measurement before it changes anything. It can only ever route down, so the worst case is one turn's quality rather than a bill nobody asked for."),
		autoTierEagerness: M([
			"cautious",
			"balanced",
			"eager"
		]).default("balanced").describe("How readily a turn counts as simple enough for the cheaper model. It moves only the cutoff: at every setting a turn still has to say something positively easy, so nothing here can downgrade a short vague request."),
		autoFastModels: O(T()).max(10).default([]).describe("Which cheaper model a downgraded turn lands on. A list so a sandbox spanning providers can name a rung on each, but not a fallback ladder: an entry naming a different provider than the turn is on is skipped rather than tried, because switching provider retires the conversation and starting over to save a fraction of a penny is not a saving. Empty picks the cheapest the turn's own provider publishes."),
		agentRetentionDays: E().min(0).max(365).default(3).describe("How many days a finished conversation stays on the board before being put away. Zero means never. The one setting here that defaults on, because each card left behind is a real working copy on disk, not just a row."),
		resumeAfterOutage: D().default(!1).describe("Whether a turn killed by the model provider failing is re-run automatically, backing off between attempts. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because a retry spends your allowance on a turn you sent once and only you can say whether it was worth paying for twice. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		resumeAfterLimit: D().default(!1).describe("Whether a turn a spent usage limit refused is sent again by itself once the allowance reopens. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because the allowance is your budget and a turn that spends it the second it comes back is not a decision to make for you. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		moveAfterLimit: D().default(!1).describe("Whether a turn a spent usage limit refused is moved to another connected account of the same provider that still has room, as soon as the refusal lands. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because it spends a second account on your behalf. With no account that has room the turn waits as the setting above says."),
		limitMoveCarryUnder: E().int().min(0).default(1e5).describe("When a spent usage limit moves a turn to another account, carry the provider session (the model keeps everything, and re-reads all of it once on the other account) while the conversation's context is under this many tokens; at or above it, start a fresh session with the sandbox's measured brief instead. Zero always starts fresh."),
		autoResumeOnRestart: D().default(!1).describe("Whether a turn killed by the sandbox restarting is re-run once it comes back. Off to begin with, for the same reason: it would spend your allowance on work you are not watching and edit files while you are still waiting for the sandbox to return. Either way the interruption is recorded rather than silently lost."),
		adoptedChecks: j(T(), T()).default({}).describe("Which repositories may run the checks they declare for themselves, and exactly which version of those checks you agreed to. A repository's declaration does nothing until it appears here, the same rule git keeps for hooks, which are never cloned; and a declaration that changes afterwards is held until you look at it again."),
		rules: O(ow).max(50).default([]).describe("Standing instructions you give the sandbox about its own work: ask for proof before a turn ends, run something before a push, hold or release finished work. Empty is the default and is exactly the behaviour of a fresh sandbox, because each of those defaults is what no rule matched means at its own moment."),
		automationFailureLimit: E().min(0).max(20).default(0).describe("How many failures in a row before an automation switches itself off. Zero means never, which is the default, because the failure is not always the automation's fault and a job disabled at three in the morning is one nobody re-enables. Only real errors count: a guard deciding there was nothing to do, or the sandbox dying mid-run, say nothing about the automation."),
		admission: Cd.prefault({}).describe("Whether work started from outside may run, per kind of trigger: let it, hold it for approval, or refuse it. Composes with each automation's own setting, and the stricter of the two wins, so holding every visitor's message needs no edit to each automation."),
		actionRules: j(T(), bd).default({}).describe("What an agent may do out in the world, per kind of action: go ahead, ask first, or never."),
		commandJudge: GC.default("on").describe("Whether a model reads your safety policy before a flagged command runs. Off judges nothing and asks about nothing; Watch judges everything and records it without ever interrupting you, which is how you find out what your policy actually does before you let it stop anything; On lets the verdict decide. Wiping a disk or deleting under /history asks at every setting — that rule is typed rather than judged, and cannot be turned off."),
		subagentsAtOnce: E().min(1).max(200).default(20).describe("How many subagents may work at the same time."),
		subagentsPerTurn: E().min(1).max(2e3).default(200).describe("How many a single turn may start in total."),
		subagentDepth: E().min(1).max(10).default(3).describe("How many levels deep the delegation may go, since a subagent can start subagents of its own.")
	}), vw = k({
		text: T(),
		version: T()
	}), yw = k({
		id: T(),
		commands: E(),
		savedTokens: E()
	}), bw = k({
		updatedAt: E().optional(),
		commands: E(),
		rawTokens: E(),
		emittedTokens: E(),
		savedPct: E(),
		perCleaner: O(yw),
		holdout: k({
			cleaned: E(),
			heldOut: E(),
			measuredSavedPct: E().optional()
		}),
		gaps: O(k({
			command: T(),
			commands: E(),
			tokens: E()
		}))
	}), xw = k({
		turns: E(),
		mean: E()
	}), Sw = k({
		metric: M([
			"searchCalls",
			"openingSearches",
			"openingListings",
			"callsBeforeTarget"
		]),
		on: xw,
		off: xw,
		controlTurnsNeeded: E().optional(),
		marginPct: E().optional(),
		deltaPct: E().optional(),
		saved: E().optional()
	}), Cw = k({
		metrics: gc([Sw], Sw),
		minTurns: E(),
		sampleUnit: M([
			"turns",
			"conversations",
			"opening turns"
		]).optional(),
		cohort: T().optional()
	}), ww = k({
		judged: E(),
		fast: E(),
		atStakeUsd: E(),
		routed: E(),
		routedUsd: E(),
		escalated: E(),
		denied: E()
	}), Tw = k({
		prevented: T(),
		chosen: T(),
		reason: T(),
		at: E().optional()
	}), Ew = k({
		checked: E(),
		improved: E(),
		recent: O(Tw),
		updatedAt: E().optional()
	}), Dw = k({
		input: bw,
		search: Cw.optional(),
		map: Cw.optional(),
		tier: ww.optional(),
		dependencies: Ew.optional()
	}), Ow = `${wp}/checks.json`, kw = M(["turn", "push"]), Aw = k({
		when: kw.describe("When to run it: `turn` before the assistant finishes, `push` before code leaves the machine."),
		run: T().min(1).max(500).describe("The command, run in this repository's own directory, so it reads as it would in a terminal there."),
		label: T().min(1).max(80).optional().describe("What to call it on screen. Absent names it after the command."),
		timeoutMs: E().min(6e4).max(36e5).optional().describe("How long it may take before it is killed and counted as failed."),
		paths: O(T().min(1)).max(20).optional().describe("Only run it when the change touches these paths, written relative to this repository. Absent runs it on every change here.")
	}), k({ checks: O(Aw).max(10).default([]) }), jw = k({
		repo: T().describe("Which repository, by its workspace id (\"root\" is the workspace itself)."),
		path: T().describe("Where the declaration lives, relative to the workspace, whether or not the file exists yet."),
		checks: O(Aw).describe("What it declares, in the order the file lists them."),
		adopted: D().describe("Whether these are running. False means declared and inert: nothing a repository writes runs until the owner switches it on."),
		changed: D().describe("Whether the declaration changed since it was adopted, which holds it until the owner looks again. True only for a repository that was adopted before."),
		error: T().optional().describe("Why the file could not be read, when it exists but does not parse. The checks list is empty in that case.")
	}), Mw = k({ repos: O(jw).describe("Every repository that declares checks, plus any the owner has adopted before, sorted by id.") }), Nw = k({
		repo: T().min(1).describe("Which repository's declaration to switch."),
		on: D().describe("On adopts what it declares as it stands now; off stops running it. Adopting again is how a changed declaration is accepted.")
	});
})), Fw, Iw, Lw, Rw, zw, Bw, Vw, Hw, Uw, Ww, Gw, Kw, qw, Jw, Yw, Xw = g((() => {
	L(), TC(), V(), fd(), Pw(), Fw = k({
		files: M([
			"none",
			"read",
			"write"
		]).default("write").describe("What it may do with files: nothing, look and search, or also create and change."),
		shell: D().default(!0).describe("Whether it may run commands, and with them the terminals, the test runs and every tool on the image. The switch the strength of the others depends on."),
		code: D().default(!0).describe("Whether it may write and run a script rather than a command line. Its fence is real where the shell's is not: reads and writes follow the files answer, and it can start no other program unless commands are allowed too. The one stated gap is that the fence cannot cut the network."),
		web: D().default(!0).describe("Whether it may fetch a page or run a search."),
		browser: D().default(!0),
		delegate: D().default(!0),
		sandbox: D().default(!0),
		connectors: O(B).max(100).optional(),
		devices: O(B).max(50).optional(),
		mcp: O(B).max(50).optional()
	}), Iw = k({
		startIn: T().max(200).optional().describe("Which folder a conversation opens in."),
		folders: O(T().min(1)).max(50).optional().describe("Which folders it may touch at all. Absent means the whole workspace.")
	}), Lw = k({ repos: O(T().min(1).max(200)).max(50).describe("Which nested repositories a conversation wearing this card carries, by workspace-relative path. The workspace itself is always carried; empty means the workspace alone.") }), Rw = M([
		"map",
		"context",
		"skills",
		"search",
		"delegation",
		"checks",
		"dependencies",
		"repoSync",
		"handoff"
	]), zw = k({ omit: O(Rw).max(20).describe("Which of the notes the sandbox prepends to each message a conversation wearing this card does NOT get. Everything not named here is sent as usual; the notes that keep a turn inside its own branch or explain a missing account cannot be named at all.") }), Bw = k({
		id: B.describe("The persona's id."),
		label: T().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		capabilities: O(B).max(50).describe("Which connected accounts are its hands. Named individually rather than by site, because two accounts on one site is the whole problem this solves. Naming one that is not connected yet is not an error: it is a card describing an account this sandbox has still to sign into."),
		brief: T().max(200).optional().describe("What this persona is for, in one line. A new chat is routed onto a persona by this sentence, and the Personas page shows it under the name."),
		powers: Fw.optional().describe("What a conversation wearing it may do. Absent means the full toolbox, so a card written before this existed behaves exactly as it did."),
		workspace: Iw.optional().describe("Where it works. Absent means the whole workspace."),
		context: Lw.optional().describe("Which part of the workspace a conversation wearing it carries: the repositories its checkout holds. Absent means every repository."),
		briefing: zw.optional().describe("Which of the notes the sandbox prepends to every message this card's conversations do without. Absent means all of them, which is what a card written before this existed keeps."),
		models: O(kd).max(10).optional().describe("Which models a conversation wearing it runs on, tried in order. Absent means whatever the chat or the job would have run on anyway; a model chosen for the turn itself always wins."),
		systemPromptMode: XC.optional()
	}), Vw = k({
		prompt: T().min(1).max(2e4).describe("The message a new chat is about to open with."),
		folder: T().max(200).optional().describe("The workspace folder the chat was opened in, when it was opened in one."),
		paths: O(T().min(1).max(500)).max(50).default([]).describe("Workspace paths the message names: uploads, @-mentions, the editor's own file.")
	}), Hw = k({
		persona: B.optional().describe("The card this message belongs to, or absent when none does and the chat should stay open to everything."),
		reason: T().describe("Why, in the one line a chat can show. Present whether or not a card was named."),
		model: T().optional().describe("Which model answered, as `provider:model`, so the chat can name what the reading cost. Absent when no model was asked at all, which a folder match and an empty persona list both are.")
	}), Uw = k({ id: B.describe("Which persona.") }), Ww = k({
		personas: O(Bw).describe("The characters an agent can wear."),
		connected: O(T()).describe("Which accounts are actually connected right now, so a persona naming one that has since been disconnected can be shown as broken rather than as working.")
	}), Gw = k({
		prompt: T().describe("What this persona is told, on top of everything else. Empty means it simply follows the sandbox's own instructions."),
		skills: O(k({
			name: T().describe("The skill's name."),
			description: T().describe("What it is for.")
		})).describe("Skills only this persona's conversations can reach. A different question from what the agent knows generally, with a different answer.")
	}), Kw = Uw.extend({ prompt: T().max(2e4).describe("What to tell this persona. Sending an empty one removes it entirely rather than storing a blank, so the persona falls back to the sandbox's own instructions.") }), qw = Uw.extend(mw.shape), Jw = Uw.extend({ name: lw.describe("Which skill.") }), Yw = k({
		name: T().describe("The skill's name."),
		description: T().describe("What it is for."),
		body: T().describe("The skill itself, in full.")
	});
})), Zw, Qw = g((() => {
	z(), Xw(), W(), Zw = {
		list: R.route({
			method: "GET",
			path: "/personas",
			summary: "The characters an agent can wear",
			description: "Each persona with the connected accounts it speaks for, what a conversation wearing it is allowed to do, and where it works."
		}).output(Ww),
		save: R.route({
			method: "POST",
			path: "/personas",
			summary: "Create or edit a persona",
			description: "Writes the whole card; sending an id that exists edits it. Nothing is connected, installed or spent by saving one, because a persona only records a decision about accounts that already exist. It is stored as a file you can equally well edit by hand, which is why this writes the card whole rather than patching a field: a round trip through a screen should leave a change a reviewer recognises."
		}).input(Bw).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/personas/{id}",
			summary: "Delete a persona",
			description: "Takes away the character, never the accounts: every login it named stays connected. Its own prompt and skills go with it, since a folder nothing can reach is worse than deleting what somebody just asked to delete. Anything still pointed at it goes quiet rather than falling back to speaking as everyone."
		}).input(Uw).output(H),
		route: R.route({
			method: "POST",
			path: "/personas/route",
			summary: "Which persona a new chat belongs to",
			description: "Reads the message a chat has just been sent, and one line per persona, and names the card it belongs to, or none, along with the model that answered. Costs one small model call on the persona-routing list, and says so. Nothing is applied here: the chat that asked puts the card on, and only when the persona routing setting is on."
		}).input(Vw).output(Hw),
		kit: R.route({
			method: "GET",
			path: "/personas/{id}/kit",
			summary: "What one persona carries",
			description: "The instructions this persona is given and the skills only its conversations can reach. A different question from what the agent knows generally, with a different answer."
		}).input(Uw).output(Gw),
		savePrompt: R.route({
			method: "POST",
			path: "/personas/{id}/prompt",
			summary: "Write a persona's instructions",
			description: "Sets what this persona is told. Saving an empty one removes it entirely rather than storing a blank, so the persona simply falls back to the sandbox's own instructions."
		}).input(Kw).output(H),
		readSkill: R.route({
			method: "GET",
			path: "/personas/{id}/skills/read",
			summary: "Read one of a persona's skills",
			description: "The full text of a single skill belonging to this persona."
		}).input(Jw).output(Yw),
		saveSkill: R.route({
			method: "POST",
			path: "/personas/{id}/skills",
			summary: "Write one of a persona's skills",
			description: "Creates or replaces a skill by name. There is nothing to switch on: a persona's skill is available exactly when that persona is worn, which is what belonging to it has to mean."
		}).input(qw).output(H),
		removeSkill: R.route({
			method: "POST",
			path: "/personas/{id}/skills/remove",
			summary: "Delete one of a persona's skills",
			description: "Removes a single skill from this persona and leaves the rest of its kit alone."
		}).input(Jw).output(H)
	};
})), $w, eT, tT, nT, rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT, AT = g((() => {
	L(), fd(), W(), F_(), $w = T().regex(/^[0-9a-f]{4,64}$/), eT = k({
		sha: T().describe("The commit, in full."),
		short: T().describe("The abbreviated form, for showing."),
		parents: O(T()).describe("What it came from. None means the first commit, one is ordinary, two or more is a merge, which is what a graph draws its lanes from."),
		subject: T().describe("Its first line."),
		body: T().describe("Everything after that."),
		author: T().describe("Who wrote it."),
		email: T().describe("Their address."),
		at: E().describe("When they wrote it, in milliseconds."),
		refs: O(T()).describe("Branches and tags sitting on it."),
		head: D().describe("Whether this is where the repository currently stands.")
	}), tT = k({
		repo: T().describe("Which repository."),
		branch: T().optional().describe("Which branch these are from."),
		commits: O(eT).describe("The commits, newest first."),
		hasMore: D().describe("There are older ones behind this page. It is also what stops the last row being drawn as the beginning of history, which is how a truncated log used to claim it started where the page happened to stop.")
	}), nT = U.extend({
		limit: I().int().positive().max(2e3).optional().describe("How many commits to return."),
		skip: I().int().nonnegative().max(1e6).optional().describe("How many newer commits to step over, which is how you page further back. Paged rather than read whole, because a large repository's history is tens of thousands of rows.")
	}), rT = k({ repos: O(T()).describe("Every repository's id. The workspace itself is always present as \"root\".") }), iT = k({
		repo: T().describe("The workspace repository."),
		host: T().describe("Which forge its remote points at."),
		project: T().describe("Which project there, as owner and name.")
	}), aT = k({ repos: O(iT).describe("Each repository matched to the project its remote points at.") }), oT = U.extend({
		path: T().min(1).describe("Which file, relative to the repository."),
		content: T().describe("Its whole new contents."),
		message: T().min(1).describe("The commit message.")
	}), sT = k({
		ok: D().describe("Whether the whole thing went through."),
		wrote: D().describe("The file was written."),
		committed: D().describe("The commit was recorded."),
		pushed: D().describe("It reached the remote."),
		branch: T().optional().describe("Which branch it happened on."),
		defaultBranch: T().optional().describe("Which branch the repository considers its main one, so a caller can see it was on a side branch."),
		reason: T().optional().describe("Why it stopped where it did. Being on a side branch, having no remote and having no credentials are all reported here rather than raised.")
	}), cT = U.extend({ sha: $w.describe("Which commit.") }), lT = k({ files: O(p_).describe("Which files it touched, with counts but not contents. Fetch any one file's contents separately, so a commit with a thousand files stays one cheap answer.") }), uT = U.extend({
		sha: $w.describe("Which commit."),
		path: T().min(1).describe("Which file in it.")
	}), dT = U.extend({
		sha: $w.describe("Which commit to start it at."),
		name: ud.describe("The new branch's name.")
	}), fT = U.extend({
		sha: $w.describe("Which commit to tag."),
		name: ud.describe("The tag's name.")
	}), pT = U.extend({ ref: ud.describe("Where to switch to: a branch, a tag, or a commit.") }), mT = U.extend({
		name: ud.describe("Which tag."),
		remote: ud.optional().describe("Also delete it there. Leave it out to remove it locally only.")
	}), hT = U.extend({
		name: ud.describe("Which tag."),
		remote: ud.describe("Which remote to send it to.")
	}), gT = U.extend({
		sha: $w.describe("Which commit to move the branch to."),
		mode: M([
			"soft",
			"mixed",
			"hard"
		]).describe("How much to take with it: move the branch alone, also unstage, or also throw away what is on disk. The last one takes a checkpoint first.")
	}), _T = U.extend({ sha: $w.describe("Which commit to act on.") }), vT = k({
		ok: D().describe("Whether it worked."),
		reason: T().optional().describe("Why not, in git's own words. A conflict, a missing remote and missing credentials are all reported here rather than raised, because they are things a screen has to render rather than breakages.")
	}), yT = k({
		ref: T().describe("How to address it, which applying and dropping take."),
		sha: T().describe("The commit behind it, because a stash entry is a commit."),
		short: T().describe("The abbreviated form, for showing."),
		subject: T().describe("What it was set aside as, with git's own scaffolding stripped off."),
		branch: T().optional().describe("Which branch it was set aside from."),
		at: E().describe("When, in milliseconds."),
		parents: O(T()).describe("What it sits on, so a graph can draw it like any other commit.")
	}), bT = k({
		repo: T().describe("Which repository."),
		stashes: O(yT).describe("What is set aside, newest first.")
	}), xT = T().regex(/^stash@\{\d{1,4}\}$/), ST = U.extend({
		message: T().max(500).optional().describe("What to call it, so you know what it was later."),
		includeUntracked: D().optional().describe("Also set aside files git is not yet tracking, which are otherwise left where they are.")
	}), CT = U.extend({
		ref: xT.describe("Which entry."),
		pop: D().optional().describe("Remove it from the stash once it has been applied cleanly.")
	}), wT = U.extend({ ref: xT.describe("Which entry.") }), TT = U.extend({ ref: xT.describe("Which entry.") }), ET = M([
		"commit",
		"amend",
		"merge",
		"rebase",
		"cherry-pick",
		"revert",
		"reset",
		"pull",
		"other"
	]), DT = k({
		kind: ET.describe("What the last action was."),
		description: T().describe("What undoing it would do, in words."),
		branch: T().describe("Which branch would move."),
		sha: T().describe("Where it stands now."),
		previousSha: T().describe("Where it would go back to. Send this with the undo as proof you looked, so one prepared against a view that has since moved is refused rather than landing somewhere unexamined."),
		changesWorkingTree: D().describe("Undoing would rewrite files as well as moving the branch, so anything offering it should warn about losing work.")
	}), OT = k({
		repo: T().describe("Which repository."),
		action: DT.optional().describe("What undoing would reverse. Absent means there is nothing to go back from.")
	}), kT = U.extend({
		previousSha: $w.describe("Where to go back to, from the matching read. It is also proof you looked: one prepared against a stale view is refused."),
		discardChanges: D().optional().describe("Also rewrite the files, rather than only moving the branch.")
	});
})), jT, MT = g((() => {
	z(), F_(), AT(), Wh(), W(), jT = {
		changes: R.route({
			method: "GET",
			path: "/git/changes",
			summary: "Uncommitted work across every repo",
			description: "The workspace's whole review set in one answer: every repo that has something uncommitted, and within it every changed file with its status and line counts. This is what the Changes panel draws, and it is the call to make when you want to know whether a workspace is clean without walking the repos yourself."
		}).output(w_),
		repos: R.route({
			method: "GET",
			path: "/git/repos",
			summary: "Every git repo in the workspace",
			description: "The repos the daemon found under the workspace root, each with the id every other call in this group expects as its `{repo}` segment. The workspace root itself is always present as `root`."
		}).output(rT),
		remoteRepos: R.route({
			method: "GET",
			path: "/git/remote-repos",
			summary: "Repos matched to their remotes",
			description: "The same repo list, but with the forge host and `owner/name` each one's remote points at. Use it to recognise a workspace repo in a list of names that came from somewhere else, such as a set of pull requests. Costs a remote lookup per repo, which is why it is separate from the plain repo list."
		}).output(aT),
		log: R.route({
			method: "GET",
			path: "/git/{repo}/log",
			summary: "Commit history for one repo",
			description: "A page of commits on the current branch, newest first, each with its author, subject, timestamp and the refs pointing at it. Paginate with the cursor the answer hands back rather than by offset, so a commit landing mid-scroll does not shift the page under you."
		}).input(nT).output(tT),
		commitDiff: R.route({
			method: "GET",
			path: "/git/{repo}/commit-diff",
			summary: "What one commit changed",
			description: "The list of files a single commit touched, with per-file status and line counts but not the content. Fetch the content of any one of them with the commit file diff call, so a commit with a thousand files stays one cheap answer."
		}).input(cT).output(lT),
		commitFileDiff: R.route({
			method: "GET",
			path: "/git/{repo}/commit-file-diff",
			summary: "One file's before and after at a commit",
			description: "Both sides of a single file as of one commit: the content its parent had and the content that commit left. The daemon returns whole sides rather than a patch, so a caller can render the comparison however it likes."
		}).input(uT).output(Uh),
		operation: R.route({
			method: "GET",
			path: "/git/{repo}/operation",
			summary: "Whether a merge or rebase is halted mid-flight",
			description: "Names the git operation the worktree is stuck inside, if any: a conflicted merge, an interrupted rebase, a half-applied cherry-pick. Check this first when another call refuses, because a halted worktree is the usual reason and the abort call is the way out."
		}).input(U).output(x_),
		abort: R.route({
			method: "POST",
			path: "/git/{repo}/abort",
			summary: "Abandon a halted merge or rebase",
			description: "Runs git's own abort for whichever operation has the worktree halted, putting the repo back where it stood before the operation started. Nothing else clears that state."
		}).input(U).output(vT),
		undoable: R.route({
			method: "GET",
			path: "/git/{repo}/undo",
			summary: "What undoing the last action would do",
			description: "Reads the branch's reflog to describe the move that undo would reverse, and hands back the commit it would land on. Pass that commit to the undo call as proof you looked, and an undo prepared against a view that has since moved is refused rather than landing somewhere unexamined."
		}).input(U).output(OT),
		undo: R.route({
			method: "POST",
			path: "/git/{repo}/undo",
			summary: "Move the branch back one step",
			description: "Walks the current branch back to where it pointed before its last action. This moves the branch ref and leaves the working tree alone, which is the opposite of restoring a checkpoint. Requires the commit the matching read handed you."
		}).input(kT).output(vT),
		stashes: R.route({
			method: "GET",
			path: "/git/{repo}/stashes",
			summary: "Everything set aside in the stash",
			description: "The repo's stash entries, newest first, each with the message and the commit behind it. A stash entry is a commit, so it reads the same way a log entry does and its contents come back from the stash diff call."
		}).input(U).output(bT),
		stashDiff: R.route({
			method: "GET",
			path: "/git/{repo}/stash-diff",
			summary: "What one stash entry holds",
			description: "The files a single stash entry would bring back, with per-file status and line counts. The same shape a commit diff has, because a stash entry is a commit."
		}).input(TT).output(lT),
		stashPush: R.route({
			method: "POST",
			path: "/git/{repo}/stash",
			summary: "Set the current changes aside",
			description: "Moves the working tree's changes onto the stash and leaves a clean tree behind. Nothing is lost: the entry is a commit you can inspect, apply or drop afterwards."
		}).input(ST).output(vT),
		stashApply: R.route({
			method: "POST",
			path: "/git/{repo}/stash/apply",
			summary: "Bring a stash entry back",
			description: "Replays one stash entry onto the working tree. A conflict is reported in the answer rather than raised as a failure, because a conflicting apply is an ordinary outcome a screen has to render."
		}).input(CT).output(vT),
		stashDrop: R.route({
			method: "POST",
			path: "/git/{repo}/stash/drop",
			summary: "Discard a stash entry",
			description: "Deletes one stash entry. This is the only unrecoverable call in the stash set, so the daemon takes a checkpoint of the workspace first."
		}).input(wT).output(H),
		createBranch: R.route({
			method: "POST",
			path: "/git/{repo}/branch",
			summary: "Start a branch at a commit",
			description: "Points a new branch name at any commit, without moving HEAD. Use the checkout call if you also want to switch to it."
		}).input(dT).output(H),
		createTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag",
			summary: "Tag a commit",
			description: "Puts a tag on any commit. Local only: pushing it to the remote is a separate call."
		}).input(fT).output(H),
		deleteTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag/delete",
			summary: "Remove a tag",
			description: "Deletes a tag locally. A tag already pushed stays on the remote until it is deleted there too."
		}).input(mT).output(H),
		pushTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag/push",
			summary: "Send a tag to the remote",
			description: "Pushes one tag to the repo's remote. Reports the outcome rather than failing, since a missing remote or missing credentials are ordinary answers here."
		}).input(hT).output(vT),
		checkout: R.route({
			method: "POST",
			path: "/git/{repo}/checkout",
			summary: "Switch to a branch or commit",
			description: "Moves HEAD to a branch, tag or commit and reshapes the working tree to match. The daemon takes a checkpoint first, so an unexpected result is recoverable. Uncommitted work that would be overwritten is reported instead of being trampled."
		}).input(pT).output(vT),
		cherryPick: R.route({
			method: "POST",
			path: "/git/{repo}/cherry-pick",
			summary: "Replay one commit onto this branch",
			description: "Applies a single commit's changes on top of the current branch as a new commit. A conflict comes back in the answer, with the halted state readable from the operation call."
		}).input(_T).output(vT),
		revert: R.route({
			method: "POST",
			path: "/git/{repo}/revert",
			summary: "Undo a commit with a new commit",
			description: "Adds a commit that reverses an earlier one, leaving the history intact. This is the safe way to take something back on a branch other people have pulled."
		}).input(_T).output(vT),
		drop: R.route({
			method: "POST",
			path: "/git/{repo}/drop",
			summary: "Remove a commit from history",
			description: "Rewrites the branch so one commit is no longer in it. History changes, so this is for branches nobody else has pulled. A checkpoint is taken first."
		}).input(_T).output(vT),
		merge: R.route({
			method: "POST",
			path: "/git/{repo}/merge",
			summary: "Merge another branch in",
			description: "Merges a branch or commit into the current one. Conflicts are reported in the answer and leave the worktree halted, which the operation call explains and the abort call clears."
		}).input(_T).output(vT),
		rebase: R.route({
			method: "POST",
			path: "/git/{repo}/rebase",
			summary: "Replay this branch onto another",
			description: "Moves the current branch's commits on top of a different base. History changes. Conflicts halt the rebase and are reported rather than raised, so the operation and abort calls are the way through."
		}).input(_T).output(vT),
		reset: R.route({
			method: "POST",
			path: "/git/{repo}/reset",
			summary: "Move the branch to a commit",
			description: "Repoints the current branch at another commit, optionally reshaping the working tree to match. The destructive modes take a checkpoint first."
		}).input(gT).output(vT),
		fileDiff: R.route({
			method: "GET",
			path: "/git/{repo}/file-diff",
			summary: "One file's committed and working copies",
			description: "Both sides of a file as it stands right now: what the last commit holds and what is on disk. This is what a review pane shows for an uncommitted change."
		}).input(l_).output(Uh),
		status: R.route({
			method: "GET",
			path: "/git/{repo}/status",
			summary: "One repo's branch and pending changes",
			description: "The current branch, its sync position against the remote, and every staged, unstaged and untracked path. The single-repo counterpart to the workspace-wide changes call."
		}).input(U).output(u_),
		commit: R.route({
			method: "POST",
			path: "/git/{repo}/commit",
			summary: "Commit the pending changes",
			description: "Records a commit with your message. It commits whatever is staged; add `stage` to stage something first — an empty object for everything pending, or a scope such as one side or one conversation's landed files. The answer carries the commit it created."
		}).input(t_).output(T_),
		discard: R.route({
			method: "POST",
			path: "/git/{repo}/discard",
			summary: "Throw away pending changes",
			description: "Restores files to their committed state and deletes untracked ones. Name paths or a scope to narrow it; with neither it throws away every uncommitted change in the repository. The daemon checkpoints the workspace first, so this is recoverable from the timeline."
		}).input(n_).output(H),
		stage: R.route({
			method: "POST",
			path: "/git/{repo}/stage",
			summary: "Mark changes for the next commit",
			description: "Adds changes to the index: exactly the paths you name, everything a scope describes, or the whole repository when you name neither. Nothing on disk changes, so this is always safe and always reversible with the unstage call."
		}).input(r_).output(H),
		unstage: R.route({
			method: "POST",
			path: "/git/{repo}/unstage",
			summary: "Take changes back out of the next commit",
			description: "Removes changes from the index and leaves the files themselves untouched, on the same terms as staging. The exact reverse of it."
		}).input(r_).output(H),
		branches: R.route({
			method: "GET",
			path: "/git/{repo}/branches",
			summary: "Local branches and how far each has drifted",
			description: "Every local branch with how many commits it sits ahead of and behind its remote counterpart, so a branch switcher can show sync state without a call per branch."
		}).input(U).output(__),
		createBranchAt: R.route({
			method: "POST",
			path: "/git/{repo}/branches",
			summary: "Create a branch from a starting point",
			description: "Makes a branch at a named start point and optionally switches to it. The branch-switcher counterpart to creating a branch at a specific commit."
		}).input(v_).output(H),
		deleteBranch: R.route({
			method: "POST",
			path: "/git/{repo}/branches/delete",
			summary: "Delete a local branch",
			description: "Removes a branch from the repo. Unmerged work is refused unless you ask for it to be forced, and the remote branch is untouched either way."
		}).input(y_).output(H),
		remote: R.route({
			method: "GET",
			path: "/git/{repo}/remote",
			summary: "Sync position against the remote",
			description: "How far the current branch sits ahead of and behind its remote, as of the last fetch, plus whether a remote and working credentials exist at all. This is a read of what the daemon already knows, not a network call, which is why fetching is a separate button."
		}).input(U).output(m_),
		fetch: R.route({
			method: "POST",
			path: "/git/{repo}/fetch",
			summary: "Refresh what the remote holds",
			description: "Contacts the remote and updates the daemon's picture of it without touching your branch. Run this before trusting the sync position."
		}).input(U).output(vT),
		pull: R.route({
			method: "POST",
			path: "/git/{repo}/pull",
			summary: "Bring remote commits down",
			description: "Fetches and integrates the remote's commits into the current branch. A pull that cannot fast-forward is reported in the answer rather than raised, because that is an ordinary thing to be told."
		}).input(U).output(vT),
		push: R.route({
			method: "POST",
			path: "/git/{repo}/push",
			summary: "Start sending commits to the remote",
			description: "Starts pushing the current branch, setting its upstream on first push, and answers at once: the push runs in a real terminal (it runs this repository's pre-push hook, which can be a whole suite), so watch it there and poll pushState for the verdict. A second start while one is going joins it rather than pushing twice."
		}).input(i_).output(H),
		pushState: R.route({
			method: "GET",
			path: "/git/{repo}/push",
			summary: "How the push is going",
			description: "The verdict, or the progress so far: where it is, the terminal it runs in, and for a push that did not go, git's last words and who refused it, the repository's own pre-push hook, the remote, or the transport. Idle when nothing has been started for this repository."
		}).input(U).output(o_),
		pushCancel: R.route({
			method: "POST",
			path: "/git/{repo}/push/cancel",
			summary: "Stop the push",
			description: "Kills the run. It settles as cancelled; nothing that git had not already sent reaches the remote."
		}).input(U).output(H),
		files: R.route({
			method: "GET",
			path: "/git/{repo}/files",
			summary: "Every tracked path in the repo",
			description: "The flat list of files git tracks, which is what a file picker or a search box wants. Ignored and untracked files are not in it."
		}).input(U).output(d_),
		readFile: R.route({
			method: "GET",
			path: "/git/{repo}/file",
			summary: "Read a file from the repo",
			description: "The contents of one file as it stands on disk. A path that climbs out of the repo is refused."
		}).input(s_).output(f_),
		writeFile: R.route({
			method: "PUT",
			path: "/git/{repo}/file",
			summary: "Write a file into the repo",
			description: "Replaces one file's contents, creating it and its parent folders if they are missing. Nothing is committed: the change shows up as pending work."
		}).input(c_).output(H),
		publishFile: R.route({
			method: "POST",
			path: "/git/{repo}/publish-file",
			summary: "Write, commit and push one file",
			description: "The three steps as a single call with a single answer, committing only the path you named and leaving any other pending work alone. Being on a side branch, having no remote and having no credentials are all reported rather than raised."
		}).input(oT).output(sT)
	};
})), NT, PT = g((() => {
	z(), Wh(), W(), NT = {
		list: R.route({
			method: "GET",
			path: "/history/snapshots",
			summary: "Points you can go back to",
			description: "The saved states of the whole workspace, taken automatically as work happens. This is the timeline behind undoing a change that was never committed."
		}).output(Fh),
		diff: R.route({
			method: "GET",
			path: "/history/diff",
			summary: "What changed since a saved point",
			description: "The files that differ between one saved point and the one before it, taking in everything that happened in between."
		}).input(Rh).output(Bh),
		fileDiff: R.route({
			method: "GET",
			path: "/history/file-diff",
			summary: "One file's before and after across a saved point",
			description: "Both sides of a single file at one point in the timeline."
		}).input(Vh).output(Uh),
		restore: R.route({
			method: "POST",
			path: "/history/restore",
			summary: "Put the workspace back",
			description: "Returns every file to how it stood at a saved point. This restores the files; moving a branch is a different thing and lives with the git calls."
		}).input(Rh).output(H)
	};
})), FT, IT = g((() => {
	L(), FT = k({ args: O(T()) });
})), LT, RT = g((() => {
	z(), Uv(), IT(), W(), LT = {
		run: R.route({
			method: "POST",
			path: "/intentic",
			summary: "Run an infrastructure command",
			description: "Runs the sandbox's own command-line tool and streams its output as it arrives, so progress is visible rather than arriving all at once at the end. A failure surfaces once the stream closes."
		}).input(FT).output(Fu(Ev)),
		apply: R.route({
			method: "POST",
			path: "/intentic/apply",
			summary: "Bring the infrastructure into line",
			description: "Starts the long reconcile that makes the running world match what was declared, and answers immediately. It takes minutes, so it runs in a terminal you attach to rather than on a held-open request."
		}).output(H),
		applyEvents: R.route({
			method: "GET",
			path: "/intentic/apply/events",
			summary: "Follow the reconcile",
			description: "The same progress the terminal shows, as structured events, kept on disk so a page refresh does not lose it. It replays from the start of the run and then follows live, closing when the run ends."
		}).output(Fu(Ev))
	};
})), zT, BT = g((() => {
	z(), _y(), zT = {
		list: R.route({
			method: "GET",
			path: "/inventory",
			summary: "Machines and services you have declared",
			description: "What the deployment configuration says this setup owns and what it wants provisioned."
		}).output(gy),
		add: R.route({
			method: "POST",
			path: "/inventory",
			summary: "Declare a machine or service",
			description: "Writes the entry into the configuration file and commits it, exactly as an agent editing that file by hand would. Answers with the whole updated list, so a screen redraws from one response."
		}).input(my).output(gy),
		remove: R.route({
			method: "DELETE",
			path: "/inventory/{name}",
			summary: "Undeclare a machine or service",
			description: "Takes the entry back out of the configuration and commits that too. Answers with the whole updated list."
		}).input(hy).output(gy)
	};
})), VT, HT = g((() => {
	z(), ug(), W(), VT = {
		list: R.route({
			method: "GET",
			path: "/issues",
			summary: "Bugs your users have reported",
			description: "Everything that has crashed or been written in, grouped so a crash that hit a thousand people is one row with a count."
		}).output(rg),
		status: R.route({
			method: "POST",
			path: "/issues/{id}/status",
			summary: "File one away, or reopen it",
			description: "Moves one issue between open, resolved and ignored. Resolving does not close anything upstream: it is your own inbox."
		}).input(ag).output(H),
		investigate: R.route({
			method: "POST",
			path: "/issues/{id}/investigate",
			summary: "Put an agent on it now",
			description: "Starts a turn on this issue with the crash, its stack and what led up to it as the brief. Answers straight away and runs detached; the issue goes to 'being looked at'."
		}).input(ig).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/issues/{id}",
			summary: "Throw one away",
			description: "Forgets an issue entirely. It will come back as new if it happens again, which is usually what you want."
		}).input(ig).output(H),
		installs: R.route({
			method: "GET",
			path: "/issues/installs/{automationId}",
			summary: "Which sites have loaded the reporter",
			description: "The sites whose pages actually loaded this intake's script, and the ones that were turned away. The answer to 'did the snippet land?', which an empty inbox cannot give you."
		}).input(lg).output(cg)
	};
})), UT, WT, GT, KT, qT, JT, YT, XT, ZT = g((() => {
	L(), UT = k({
		name: T().describe("Its name, which is what the read route takes."),
		sizeBytes: E().describe("Size in bytes."),
		modifiedAt: E().describe("When it last changed, in milliseconds.")
	}), WT = k({ files: O(UT).describe("Every log the sandbox keeps: captured terminal output, command runs, and its own log.") }), GT = k({
		name: T().min(1).describe("Which log. It travels in the query rather than the address, because log names contain slashes."),
		bytes: I().min(1).max(1048576).default(65536).describe("How much of the end to read. The newest bytes win when the file is larger.")
	}), KT = k({
		name: T().describe("Which log this is from."),
		sizeBytes: E().describe("How large the whole file is."),
		text: T().describe("The end of it, as text."),
		truncated: D().describe("There is more before what you got.")
	}), qT = k({
		seenAt: E().describe("When the browser saw it, in milliseconds."),
		level: M(["warn", "error"]).describe("How bad it was."),
		event: T().min(1).max(100).describe("What kind of thing it was, as a stable name."),
		message: T().max(2e3).describe("What it said."),
		route: T().max(300).optional().describe("Which page they were on."),
		requestId: T().max(100).optional().describe("Which daemon call it belonged to, when it belonged to one."),
		build: T().max(100).optional().describe("Which build of the app was running."),
		fields: j(T().max(60), mc([
			T().max(4e3),
			E(),
			D()
		])).optional().describe("Whatever else was worth keeping.")
	}), JT = k({ events: O(qT).min(1).max(50).describe("What the browser has to report, oldest first.") }), YT = k({ recorded: E().describe("How many were written down.") }), XT = k({
		clientId: T().describe("This connection's own id, the same one it gave the event stream."),
		idle: D().describe("Whether the person has stopped doing anything."),
		view: T().optional().describe("Which view they are on."),
		sessionId: T().optional().describe("Which conversation they have open."),
		path: T().optional().describe("Which file they are looking at. Sent whole rather than merged: leaving a field out clears it, so a tab that closes a file drops the path in the same report.")
	});
})), QT, $T = g((() => {
	z(), ZT(), QT = {
		list: R.route({
			method: "GET",
			path: "/logs",
			summary: "Logs the sandbox keeps",
			description: "Every log file the daemon owns: captured terminal output, command runs, and the daemon's own log. Read-only, because only the sandbox writes them."
		}).output(WT),
		read: R.route({
			method: "GET",
			path: "/logs/file",
			summary: "Read part of a log",
			description: "A window of one log file's text. A window rather than the whole thing, because a busy log outgrows any single answer."
		}).input(GT).output(KT),
		report: R.route({
			method: "POST",
			path: "/logs/client",
			summary: "Report what the browser saw",
			description: "Errors the app caught, stalls it measured, and recoveries it performed, written to a log of their own. The browser is the only witness to these, so without it a bug someone hit in their own browser leaves no record at all."
		}).input(JT).output(YT)
	};
})), eE, tE = g((() => {
	z(), qp(), W(), eE = {
		list: R.route({
			method: "GET",
			path: "/loops",
			summary: "Every loop that has run",
			description: "The loops this workspace has run, newest first, kept after they end. Why it stopped on the fourth round is the question a loop gets read for, and the round-by-round history is the answer."
		}).output(Vp),
		start: R.route({
			method: "POST",
			path: "/loops",
			summary: "Run a conversation until it is done",
			description: "Starts repeating a conversation towards a goal and answers straight away with the loop as recorded; the work carries on without you. The conversation need not exist yet, so run this until it passes can be the first thing you ever say to a new agent. A conversation already looping is refused."
		}).input(Lp).output(Bp),
		stop: R.route({
			method: "POST",
			path: "/loops/{conversationId}/stop",
			summary: "Make this round the last",
			description: "Means do not start another round, not stop what is running. Somebody watching the sixth round do good work can say this is the last one without throwing that work away. To cut the current round off as well, stop the conversation too."
		}).input(Hp).output(H),
		designs: R.route({
			method: "GET",
			path: "/loops/designs",
			summary: "Saved loop designs",
			description: "Loops somebody authored once and can point at a different job each time. A saved loop is the same loop with its goal left blank until you type one, not a different feature."
		}).output(Wp),
		saveDesign: R.route({
			method: "POST",
			path: "/loops/designs",
			summary: "Create or replace a saved loop",
			description: "Say which of the two you mean, so a name that happens to collide cannot silently overwrite somebody's work. A design that could never finish, with nothing to produce and nothing to check, is refused in the same words an ad-hoc loop would be: catching that at save time is the whole advantage of saving."
		}).input(Gp).output(Up),
		removeDesign: R.route({
			method: "DELETE",
			path: "/loops/designs/{id}",
			summary: "Delete a saved loop",
			description: "Removes the design. A loop already running from it keeps going on its own terms, because it took a copy of what it needed when it started."
		}).input(Kp).output(H)
	};
})), nE, rE, iE, aE, oE = g((() => {
	L(), nE = M([
		"launching",
		"installing",
		"starting",
		"exited"
	]), rE = k({
		repo: T().describe("Which repository."),
		hasPanel: D().describe("Whether it has anything runnable at all."),
		running: D().describe("Whether the sandbox has it running."),
		installed: D().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: nE.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves."),
		healthy: D().describe("Whether anything it owns is actually answering. A different question: a server still installing is running and not yet healthy, and one somebody started by hand is healthy without the sandbox running it."),
		port: E().optional().describe("The port the sandbox told it to use. What it actually bound is below, and for a repository that pins its own ports those are different numbers."),
		servers: O(k({
			port: E().describe("The port it is listening on, which is what forwarding it takes."),
			url: T().describe("Where it answers, with the right scheme: a server on its own certificate is served over https."),
			dir: T().optional().describe("Which part of the repository it belongs to, which for a repository whose dev command fans out is the only thing telling them apart."),
			session: T().optional().describe("The terminal it runs in: the sandbox's when it started it, yours when you did, and absent when nothing here owns it, which is the case worth designing for.")
		})).describe("Every server this repository is really serving, found by looking at what is listening. Empty when nothing answers."),
		previewUrl: T().optional().describe("Where to open it from outside, present only while that address really serves it. Absent on a sandbox with no outside address."),
		role: M([
			"intent",
			"desired-state",
			"app"
		]).optional().describe("Which of the workspace's three fixed roles this repository fills. Absent for one that was simply cloned in."),
		deployConfig: D().describe("It declares infrastructure."),
		desiredState: D().describe("That declaration has been resolved at least once."),
		directoryUi: D().describe("It carries a small interface of its own."),
		monorepo: D().describe("It holds several packages."),
		vitest: D().describe("It has tests that can be run."),
		userStories: D().describe("It carries stories an agent could test the running app against. The one fact here that says nothing about the language."),
		docs: D().describe("It carries generated architecture documentation.")
	}), iE = k({ panels: O(rE).describe("One entry per repository, worked out in a single pass so nothing has to walk the workspace file by file.") }), aE = k({ repo: T().describe("Which repository.") });
})), sE, cE = g((() => {
	z(), oE(), W(), sE = {
		list: R.route({
			method: "GET",
			path: "/panels",
			summary: "Repos you can run and preview",
			description: "Every repo with whether its dev server is up and what the sandbox worked out about its contents."
		}).output(iE),
		start: R.route({
			method: "POST",
			path: "/panels/{repo}/start",
			summary: "Start a repo's dev server",
			description: "Brings the repo's own runnable app up in a terminal you can attach to, so its preview address starts answering."
		}).input(aE).output(H),
		stop: R.route({
			method: "POST",
			path: "/panels/{repo}/stop",
			summary: "Stop a repo's dev server",
			description: "Shuts it down and frees the port."
		}).input(aE).output(H)
	};
})), lE, uE, dE, fE, pE = g((() => {
	L(), lE = k({
		port: E().describe("The port number."),
		host: M(["127.0.0.1", "::1"]).describe("Which loopback address it actually answers on. Some tools bind only one of the two, and anything dialling it has to know which."),
		forwardable: D().describe("Whether it can be exposed at all. Some listeners answer only at their own address and nowhere else; those are listed for honesty and refused for forwarding."),
		kind: M(["workspace", "system"]).describe("Whether somebody's own work put it there, or the sandbox's own machinery did. Only the first kind is worth previewing."),
		title: T().describe("What a person would call it. Always present: a listener nothing can explain is still named, because the button beside it publishes the port to the internet."),
		purpose: T().describe("One sentence about what it is for, including when the honest answer is that nothing could work it out."),
		origin: M([
			"terminal",
			"agent",
			"panel",
			"extension",
			"container",
			"sandbox",
			"unknown"
		]).describe("Who put it there, which is the question somebody is really asking: mine, my agent's, or the box's own."),
		pid: E().optional().describe("The process holding it. Absent when nothing could be matched to the socket."),
		command: T().optional().describe("The command behind it, as it was run. Absent only when nothing could be attributed at all."),
		cwd: T().optional().describe("Where it is running from, which is how a port gets attributed to a repository."),
		session: T().optional().describe("The terminal it came from, to watch it in or stop it from. Absent when nothing in its ancestry is one, which is the honest \"you cannot reach this from here\"."),
		forwarded: D().describe("Whether it is currently reachable from outside."),
		previewUrl: T().optional().describe("Where to open it. Present only while forwarded, and only on a sandbox that has an outside address.")
	}), uE = k({ ports: O(lE).describe("Everything listening inside the sandbox right now, read fresh each time rather than from a register the sandbox keeps.") }), dE = k({ port: E().int().min(1).max(65535).describe("Which port.") }), fE = k({ previewUrl: T().optional().describe("Where it can now be reached. Absent on a sandbox with no outside address, where the mapping exists but has no public name.") });
})), mE, hE = g((() => {
	z(), pE(), W(), mE = {
		list: R.route({
			method: "GET",
			path: "/ports",
			summary: "What is listening inside the sandbox",
			description: "Every port something is answering on, and whether each one is reachable from outside."
		}).output(uE),
		forward: R.route({
			method: "POST",
			path: "/ports/forward",
			summary: "Make a port reachable",
			description: "Gives one port an address on the outside. Asking twice is harmless: the second call hands back the address the first one made."
		}).input(dE).output(fE),
		unforward: R.route({
			method: "POST",
			path: "/ports/unforward",
			summary: "Stop exposing a port",
			description: "Frees the slot at once. The address keeps resolving; it simply stops leading anywhere."
		}).input(dE).output(H)
	};
})), gE, _E, vE, yE, bE, xE = g((() => {
	L(), gE = k({
		path: T().describe("Where it sits inside the outbox."),
		size: E().describe("Size in bytes."),
		modifiedAt: E().describe("When it last changed, in milliseconds."),
		url: T().optional().describe("Its public address. Absent when this sandbox has no outside address, or when the file is being refused."),
		blocked: T().optional().describe("Why a file sitting in the outbox is not being served: a hidden name, a credential-shaped name, contents that look like a token, or sheer size. Only the publisher sees this; a stranger asking for the same file gets the same nothing every other miss gets.")
	}), _E = k({
		url: T().optional().describe("Your public address, which every file's own hangs off. Absent on a sandbox with nowhere to publish to."),
		files: O(gE).describe("What the outbox holds.")
	}), vE = k({ path: T().min(1).describe("What to publish, as a workspace path. It is copied rather than moved, so a repository does not lose its build output because somebody shared it.") }), yE = k({ path: T().min(1).describe("What to withdraw, as a path inside the outbox rather than a workspace path.") }), bE = k({
		path: T().describe("Where it landed inside the outbox."),
		url: T().optional().describe("Its public address. Absent on a sandbox with nowhere to publish to.")
	});
})), SE, CE = g((() => {
	z(), xE(), W(), SE = {
		list: R.route({
			method: "GET",
			path: "/public",
			summary: "What is published to the internet",
			description: "Everything currently in the outbox and the address it answers on. There is no call to read a published file back: it is served openly to anyone with the link, which is the entire point of having put it there."
		}).output(_E),
		publish: R.route({
			method: "POST",
			path: "/public/publish",
			summary: "Put a file on the internet",
			description: "Copies a workspace file or folder into the outbox, where it is served to anyone with the link and no sign-in. Answers with the address."
		}).input(vE).output(bE),
		unpublish: R.route({
			method: "POST",
			path: "/public/unpublish",
			summary: "Take something off the internet",
			description: "Withdraws one published entry. When the last one goes, the outbox goes with it, so its existing at all always means something is published."
		}).input(yE).output(H)
	};
})), wE, TE, EE = g((() => {
	z(), L(), qg(), W(), wE = k({ repos: O(T().min(1)).max(100).default([]).describe("The repositories going out, by workspace id. Empty runs only what stands for every push, whichever repository it is.") }).prefault({}), TE = {
		state: R.route({
			method: "GET",
			path: "/prepush/state",
			summary: "How the pre-push check is going",
			description: "The verdict, or the progress so far. Nothing is addressed by id here, because there is one working tree and so exactly one check."
		}).output(Kg),
		run: R.route({
			method: "POST",
			path: "/prepush/run",
			summary: "Run the checks before pushing",
			description: "Starts the suite the workspace runs before anything leaves the machine, and answers immediately. A suite takes minutes, and a request held open that long dies at the first proxy. It runs in a real terminal, so watch it there and poll for the verdict. Name the repositories going out, and each one's own checks run in its own directory."
		}).input(wE).output(H),
		cancel: R.route({
			method: "POST",
			path: "/prepush/cancel",
			summary: "Stop the pre-push check",
			description: "Kills the run. It settles as cancelled and the push it was gating does not go."
		}).output(H)
	};
})), DE, OE, kE = g((() => {
	z(), L(), V(), pf(), DE = k({
		agents: O(k({
			id: T(),
			label: T()
		})).describe("ACP agents installed here. The id is the provider id itself, the label its display name."),
		endpoints: O(k({
			id: T(),
			label: T(),
			kind: M(["endpoint", "localmodel"])
		})).describe("Model endpoints, already prefixed `endpoint/`, including the daemon-provisioned free trial.")
	}), OE = {
		list: R.route({
			method: "GET",
			path: "/providers",
			summary: "Providers a chat can run on here",
			description: "The installed ACP agents and model endpoints, which are the providers this sandbox adds to the fixed native list. A read for anyone who may watch or drive a turn: it names what a message can be addressed to, not what credential stands behind it."
		}).output(DE),
		models: R.route({
			method: "GET",
			path: "/providers/{provider}/models",
			summary: "Models one provider offers",
			description: "Every model this provider serves and which one it defaults to. Never empty: it is discovered live with a stored list behind it. The order is the provider's own preference and is not rearranged here."
		}).input(md).output(ff)
	};
})), AE, jE, ME, NE, PE, FE, IE, LE = g((() => {
	L(), AE = k({
		kind: N("webpush").describe("A browser, which the sandbox can reach directly and encrypt end to end."),
		endpoint: oc().describe("Where that browser's push service accepts sends. It also identifies the device everywhere else in this group."),
		keys: k({
			p256dh: T().min(1).describe("The browser's public key, for encrypting what is sent."),
			auth: T().min(1).describe("The browser's secret, for the same.")
		}).describe("What the browser handed you when it subscribed. Post it back exactly as it came; nothing reshapes it.")
	}), jE = k({
		kind: N("relay").describe("A native app, whose operating system only accepts sends from the app's publisher, so the sandbox posts through a relay instead. The message passes through that relay readable, which is the price of the publisher having to be in the loop."),
		url: oc().describe("Where to post a send. Recorded rather than assumed, so the sandbox need not know any platform by name."),
		deviceId: T().min(1).describe("The device's id, which also identifies this registration everywhere else in this group."),
		secret: T().min(1).describe("Proof that this sandbox may notify this device. The relay never learns which sandbox is calling.")
	}), ME = A("kind", [AE, jE]), k({
		title: T().min(1).describe("The headline."),
		body: T().describe("The line under it. Push services cap the whole payload at a few kilobytes, which is why nothing here carries a transcript or a diff: a notification is a pointer back, not a delivery."),
		url: T().optional().describe("Where tapping it goes. An existing tab is focused rather than a new one opened."),
		tag: T().optional().describe("Collapses repeats: a second notification with the same tag replaces the first instead of stacking beside it."),
		requireInteraction: D().optional().describe("Keep it on screen until it is dismissed. Used when the agent is waiting for you, where one that fades away is a question that went unanswered in silence.")
	}), NE = k({
		publicKey: T().describe("The key a browser needs in order to subscribe. Native apps ignore it."),
		subscribed: D().describe("Whether the asking device is already registered, so a toggle can show its real state instead of trusting the device's own permission, which can be granted with nothing behind it.")
	}), PE = k({ id: T().min(1).describe("Which device: a browser's push address, or a native install's device id.") }), FE = k({ id: T().min(1).optional().describe("Which device is asking. Without it the answer can only speak for the sandbox as a whole, which is rarely the question.") }), IE = k({ delivered: E().int().nonnegative().describe("How many devices actually accepted it. A count rather than a yes, because this button exists to prove a chain nobody can inspect, and the sandbox having accepted the request is not the question being asked.") });
})), RE, zE = g((() => {
	z(), LE(), W(), RE = {
		config: R.route({
			method: "GET",
			path: "/push/config",
			summary: "What a device needs to subscribe",
			description: "The public key and settings a browser or app needs before it can register for notifications from this sandbox."
		}).input(FE).output(NE),
		subscribe: R.route({
			method: "POST",
			path: "/push/subscribe",
			summary: "Send notifications to this device",
			description: "Registers one device. The sandbox only interrupts you on the three moments where attention is genuinely wanted: a turn has finished, the agent is stuck on a question, and something is waiting for approval."
		}).input(ME).output(H),
		unsubscribe: R.route({
			method: "POST",
			path: "/push/unsubscribe",
			summary: "Stop notifying a device",
			description: "Removes one registered device. Others keep receiving."
		}).input(PE).output(H),
		test: R.route({
			method: "POST",
			path: "/push/test",
			summary: "Send a test notification",
			description: "Proves the whole chain end to end. Worth having, because there are four separate places a notification can be lost that nobody can inspect from the outside: the device's permission, its registration, the sandbox's key, and the delivery service."
		}).output(IE)
	};
})), BE, VE = g((() => {
	z(), YC(), W(), L(), BE = {
		policy: R.route({
			method: "GET",
			path: "/safety/policy",
			summary: "The safety policy this sandbox is judged against",
			description: "The document that decides when an agent stops to ask you before running something. Prose, not settings: it is read by the model that judges each command. When nobody has written one, this is the text the product ships with, and it describes the behaviour a fresh sandbox already has."
		}).output(JC),
		setPolicy: R.route({
			method: "POST",
			path: "/safety/policy",
			summary: "Rewrite the safety policy",
			description: "Replaces the document whole. Nothing in it can widen what the sandbox is structurally allowed to do: it decides which of the things an agent may already do are worth interrupting you about."
		}).input(k({ text: T().describe("The policy, as you want it written.") })).output(H),
		log: R.route({
			method: "GET",
			path: "/safety/log",
			summary: "Recent safety verdicts",
			description: "What was judged lately, what the judge decided, and whether you were interrupted. Newest first. This is where you find out why you were not asked about something, which is the question a policy page otherwise cannot answer."
		}).output(O(qC))
	};
})), HE, UE = g((() => {
	z(), Hf(), W(), HE = {
		set: R.route({
			method: "POST",
			path: "/secrets",
			summary: "Store a secret",
			description: "Writes one name and value into the sandbox's own store, where running processes pick it up without a restart. Refused until the sandbox has somewhere to keep them."
		}).input(Of).output(H),
		list: R.route({
			method: "GET",
			path: "/secrets",
			summary: "Names of the stored secrets",
			description: "Which secrets exist here. Names only, never values."
		}).output(kf),
		remove: R.route({
			method: "DELETE",
			path: "/secrets/{key}",
			summary: "Delete a secret",
			description: "Removes one by name."
		}).input(Af).output(H),
		inventory: R.route({
			method: "GET",
			path: "/secrets/inventory",
			summary: "Every secret this sandbox holds, from everywhere",
			description: "One view across all the places secrets live here: what exists, where it came from and whether it is working. Never any values. This one always answers, even before there is a store to write to."
		}).output(Vf),
		reveal: R.route({
			method: "POST",
			path: "/secrets/reveal",
			summary: "Show one secret's value",
			description: "The only call that hands a value back, and it is for the owner alone. Sent as a body rather than in the address, so the name never ends up in a log or a browser's history."
		}).input(Af).output(jf),
		gates: R.route({
			method: "GET",
			path: "/secrets/gates",
			summary: "Which credentials need somebody's approval",
			description: "What is gated and who may release it. Names and addresses only, never values, and the agent may read it too: knowing a credential needs Bob is what stops it concluding the account is simply not connected."
		}).output(If),
		setGate: R.route({
			method: "PUT",
			path: "/secrets/gates/{subject}",
			summary: "Put a credential behind named approvers",
			description: "Names exactly who may release one secret or one connected account, and how far a single release goes. The owner's call alone. A signed-in browser or a mounted server cannot be released for one use, so those are always for the rest of the conversation."
		}).input(Ff).output(H),
		removeGate: R.route({
			method: "DELETE",
			path: "/secrets/gates/{subject}",
			summary: "Stop requiring approval for a credential",
			description: "Removes one gate, so the agent can use that credential the way it uses any other. The owner's call alone."
		}).input(Lf).output(H),
		request: R.route({
			method: "POST",
			path: "/secrets/request",
			summary: "Ask a named person to release a credential",
			description: "Raises the release card in the live conversation and waits for one of the people named on it. Refused, rather than held, when there is nobody to ask: an unattended turn, no live conversation, or a click with no verified identity behind it."
		}).input(Rf).output(zf)
	};
})), WE, GE, KE, qE = g((() => {
	L(), km(), WE = k({ id: T().describe("Which past conversation.") }), GE = k({
		id: T().describe("Its id."),
		title: T().describe("What it is called."),
		updatedAt: E().describe("When it last moved, in milliseconds."),
		snippet: pm.optional().describe("Why a search matched: the line it hit, with a little around it, and who said it. Absent on an unfiltered list, and on a match the title already shows, where repeating it would be noise rather than evidence.")
	}), KE = k({ sessions: O(GE).describe("Past conversations, newest first.") });
})), JE, YE = g((() => {
	z(), L(), Eh(), qE(), JE = {
		list: R.route({
			method: "GET",
			path: "/sessions",
			summary: "Past conversations in this workspace",
			description: "Summaries for a history menu, filtered when you pass a search. Covers conversations that worked in their own private copies too, so nothing is hidden just because it happened on a branch."
		}).input(k({
			query: T().optional(),
			caseSensitive: kl().optional()
		})).output(KE),
		get: R.route({
			method: "GET",
			path: "/sessions/{id}",
			summary: "Read one past conversation",
			description: "The full record of a single conversation, restored for display."
		}).input(WE).output(Ch)
	};
})), XE, ZE, QE, $E, eD, tD = g((() => {
	L(), k({
		at: E().describe("When the turn ended, in milliseconds."),
		day: T().describe("The day it fell in, as YYYY-MM-DD in UTC, worked out once so nothing downstream has to do timezone arithmetic."),
		provider: T().describe("Which model provider served it."),
		account: T().optional().describe("Which account paid. Absent for a turn run on a plain key, which belongs to no account."),
		model: T().optional().describe("The model that actually ran, past whatever was asked for and every default. Absent only when the provider's own default served it without being named."),
		modelRequested: T().optional().describe("The model that was asked for, when one was named. Differs from `model` when something resolved it."),
		harness: T().describe("Which agentic loop it ran on."),
		outcome: M([
			"ok",
			"error",
			"cancelled"
		]).optional().describe("How it ended: finished, failed, or was stopped by the user."),
		errorCode: T().optional().describe("The failure's code, when it had one."),
		errorMessage: T().optional().describe("What the failure said, trimmed."),
		conversationId: T().optional().describe("Which conversation it belonged to, so spending can be traced to a card. Absent only for an internal one-off with no conversation at all."),
		turns: E().describe("The provider's own count for the request, since one exchange can be several under the hood. One when it reported none."),
		inputTokens: E().describe("Tokens sent."),
		outputTokens: E().describe("Tokens received."),
		cacheReadTokens: E().describe("Tokens served from cache, which cost less."),
		cacheCreationTokens: E().describe("Tokens written to cache, which cost more up front and less afterwards."),
		costUsd: E().describe("What it cost, in dollars."),
		durationMs: E().describe("How long it took, in milliseconds."),
		iqSearchArm: D().optional(),
		iqSearchCohort: T().optional(),
		searchCalls: E().optional(),
		openingSearches: E().optional(),
		openingListings: E().optional(),
		callsBeforeTarget: E().optional(),
		mapArm: D().optional(),
		mapChars: E().optional(),
		turnIndex: E().optional(),
		verification: M([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).optional(),
		check: T().optional(),
		filesEdited: E().optional(),
		toolCalls: E().optional(),
		checklistTotal: E().optional(),
		checklistOpen: E().optional(),
		compactions: E().optional(),
		contextTokens: E().optional(),
		contextWindow: E().optional(),
		tierScore: E().optional(),
		tierRules: O(T()).optional(),
		tierRouted: D().optional(),
		tierFast: D().optional(),
		tierCeiling: E().optional(),
		tierDenied: D().optional()
	}), XE = k({
		day: T().describe("The day, as YYYY-MM-DD in UTC."),
		provider: T().describe("Which model provider."),
		account: T().optional().describe("Which account. Absent for work run on a plain key."),
		model: T().optional().describe("Which model."),
		harness: T().describe("Which agentic loop."),
		conversationId: T().optional().describe("Which conversation."),
		turns: E().describe("Turns in this group."),
		inputTokens: E().describe("Tokens sent."),
		outputTokens: E().describe("Tokens received."),
		cacheReadTokens: E().describe("Tokens served from cache."),
		cacheCreationTokens: E().describe("Tokens written to cache."),
		costUsd: E().describe("What the group cost, in dollars."),
		durationMs: E().describe("Time spent, in milliseconds.")
	}), ZE = k({
		from: T().optional().describe("First day to include, as YYYY-MM-DD in UTC. Leave it out for everything up to the end day."),
		to: T().optional().describe("Last day to include, as YYYY-MM-DD in UTC, and it is included rather than excluded. Leave it out for everything from the start day onwards.")
	}), QE = k({ rows: O(XE).describe("Spending grouped by day, provider, account, model and conversation. Everything a cost screen shows is a rearrangement of these rows, which is why there is no second call for any of it.") }), $E = k({
		provider: T(),
		account: T(),
		turns: E(),
		inputTokens: E(),
		outputTokens: E(),
		cacheReadTokens: E(),
		cacheCreationTokens: E(),
		costUsd: E()
	}), eD = k({ accounts: O($E) });
})), nD, rD = g((() => {
	z(), Pw(), W(), tD(), nD = {
		get: R.route({
			method: "GET",
			path: "/settings",
			summary: "How this sandbox is configured",
			description: "Every setting that governs how agents behave here, with the defaults filled in for anything nobody has chosen."
		}).output(_w),
		set: R.route({
			method: "POST",
			path: "/settings",
			summary: "Change the sandbox settings",
			description: "Writes the settings whole, so send the complete object rather than the fields you changed."
		}).input(_w).output(H),
		savings: R.route({
			method: "GET",
			path: "/settings/savings",
			summary: "What the token-saving measures were worth",
			description: "Measured rather than estimated: what each mechanism actually saved over a range of days. The same day range the spending ledger takes, so one calendar filters both."
		}).input(ZE).output(Dw),
		builtinPrompt: R.route({
			method: "GET",
			path: "/settings/system-prompt/{base}",
			summary: "Read a built-in system prompt",
			description: "The actual text behind one of the built-in modes, so a settings screen can show the prompt instead of asking anyone to trust a description of it, and so either can be forked into a custom one."
		}).input(ZC).output(vw),
		firings: R.route({
			method: "GET",
			path: "/settings/rule-firings",
			summary: "When each rule last did something",
			description: "A separate read rather than a field on the settings, because a rule firing is not somebody editing anything: folding it in would turn every firing into a settings write and put a self-changing value inside the object a screen edits."
		}).output(sw),
		repoChecks: R.route({
			method: "GET",
			path: "/settings/repo-checks",
			summary: "What each repository asks to run on its own code",
			description: `Every repository that declares its own checks at \`${Ow}\`, what it declares, and whether you have switched it on. A repository declares what to run because the command belongs beside the scripts it names; nothing it declares runs until you say so.`
		}).output(Mw),
		adoptRepoChecks: R.route({
			method: "POST",
			path: "/settings/repo-checks/adopt",
			summary: "Switch a repository's own checks on or off",
			description: "Adopts exactly what that repository declares as it stands now. If the declaration changes afterwards it stops running until you adopt it again, so a command nobody has read cannot inherit the answer given to a different one."
		}).input(Nw).output(H)
	};
})), iD, aD = g((() => {
	z(), nh(), W(), iD = {
		list: R.route({
			method: "GET",
			path: "/share",
			summary: "Conversations published as pages",
			description: "Every conversation that has been turned into a read-only page, with its link. There is no call to read one back: the page itself is the read, and it answers to anyone who has the link."
		}).output(Qm),
		create: R.route({
			method: "POST",
			path: "/share",
			summary: "Publish a conversation",
			description: "Renders a conversation into a page anybody with the link can read, without signing in. Answers with the link, so nothing has to be listed again to find it."
		}).input($m).output(Zm),
		update: R.route({
			method: "POST",
			path: "/share/update",
			summary: "Refresh a published page",
			description: "Re-renders an existing page from the conversation as it stands now. Same link, newer contents."
		}).input(eh).output(Zm),
		remove: R.route({
			method: "POST",
			path: "/share/remove",
			summary: "Unpublish a conversation",
			description: "Takes the page down, so the link stops answering."
		}).input(th).output(H)
	};
})), oD, sD = g((() => {
	z(), Pw(), W(), oD = {
		list: R.route({
			method: "GET",
			path: "/skills",
			summary: "What the agent knows how to do",
			description: "Every skill available here and whether it is switched on, joined from all the places they come from: the owner's own, the settings, plugins a connection installed, folders inside extensions, and persona kits."
		}).output(dw),
		read: R.route({
			method: "GET",
			path: "/skills/read",
			summary: "Read one skill",
			description: "The full text of a single skill. The name travels in the query rather than the address, because a name can carry the owner it came from and that will not fit in a path."
		}).input(pw).output(fw),
		save: R.route({
			method: "POST",
			path: "/skills",
			summary: "Write a skill",
			description: "Creates or rewrites a skill by name. A new one starts switched on, because you wrote it in order to use it; rewriting one you switched off leaves it off. Renaming is saving under the new name and deleting the old."
		}).input(mw).output(H),
		switch: R.route({
			method: "POST",
			path: "/skills/switch",
			summary: "Switch one of your own skills on or off",
			description: "Off takes the agent's copy away and keeps your text; on writes the copy back from it. Built-in tools are switched in the agent settings instead, and nothing else has a switch."
		}).input(gw).output(H),
		remove: R.route({
			method: "POST",
			path: "/skills/remove",
			summary: "Delete a skill",
			description: "Removes the text and the agent's copy in one step, so a screen never has to sequence two calls and never leaves one half done."
		}).input(hw).output(H)
	};
})), cD, lD, uD, dD, fD = g((() => {
	L(), cD = k({ distro: T() }), lD = k({
		os: T(),
		arch: T(),
		shell: T(),
		home: T(),
		roots: O(T()),
		engine: k({
			memoryBytes: E(),
			cpus: E()
		}).optional(),
		hostname: T().optional(),
		wsl: cD.optional(),
		wslDistros: O(T()).optional()
	}), uD = k({
		key: T().min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: lD.optional()
	}), dD = k({
		id: T(),
		platform: T().min(1),
		environments: O(uD).min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: lD.optional()
	}), k({ hosts: O(dD) });
})), pD = g((() => {})), mD, hD, gD, _D, vD, yD, bD, xD, SD, CD, wD, TD, ED, DD, OD, kD, AD, jD, MD, ND, PD, FD, ID, LD, RD, zD, BD, VD = g((() => {
	L(), fD(), mD = k({
		memoryBytes: E().optional(),
		cpus: E().optional(),
		privileged: D(),
		gpu: D(),
		hostRuntime: O(T()),
		overlayRuntime: O(T())
	}), hD = k({
		memoryGib: lc().positive().nullable().optional(),
		cpus: lc().positive().nullable().optional(),
		privileged: D().optional(),
		gpu: D().optional()
	}), gD = hD.refine((e) => Object.values(e).some((e) => e !== void 0), { message: "a reshape must change at least one thing" }), _D = k({
		slug: T(),
		container: T(),
		name: T().optional(),
		running: D(),
		image: T(),
		tunnelRunning: D().optional(),
		resources: mD.optional()
	}), vD = M([
		"start",
		"stop",
		"restart",
		"prepare",
		"update",
		"rebuild",
		"rollback",
		"reshape",
		"remove",
		"logs",
		"reconnect",
		"runner-up",
		"runner-remove"
	]), yD = k({
		op: vD,
		slug: T().min(1),
		hash: T().optional(),
		resources: gD.optional(),
		parentUrl: T().optional(),
		pair: T().optional().meta({ secret: !0 }),
		setupCode: T().optional().meta({ secret: !0 }),
		definition: T().optional(),
		overlay: T().optional(),
		overlayHash: T().optional()
	}), bD = yD.extend({ id: T().min(1) }), xD = A("kind", [
		k({
			kind: N("line"),
			text: T()
		}),
		k({
			kind: N("result"),
			message: T()
		}),
		k({
			kind: N("error"),
			message: T()
		})
	]), SD = M(["upgrade", "restart"]), CD = k({ op: SD }), wD = CD.extend({ id: T().min(1) }), TD = M([
		"mirror-off",
		"mirror-on",
		"sync-pause",
		"sync-resume",
		"sync-unpair",
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), TD.exclude([
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), ED = T().max(200).regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/), DD = T().min(1).max(4096).regex(/^(?:~|\/|[A-Za-z]:[\\/])[^"'`$;|&\n\r]*$/), OD = k({
		id: T().min(1),
		command: TD,
		sandboxId: ED.optional(),
		mode: M(["sync", "mirror"]).optional(),
		localDir: DD.optional()
	}), kD = k({
		ok: D(),
		message: T(),
		output: T().optional(),
		refused: D()
	}), AD = M([
		"created",
		"modified",
		"deleted"
	]), jD = k({
		path: T(),
		local: AD.optional(),
		sandbox: AD.optional()
	}), MD = k({
		sandboxId: T(),
		mode: M(["sync", "mirror"]),
		localDir: T().optional(),
		mirroring: M(["on", "off"]).optional(),
		mutagenStatus: T().optional(),
		conflicts: E().int().nonnegative().optional(),
		conflictedPaths: O(jD).optional(),
		paused: D().optional(),
		backupStatus: T().optional()
	}), ND = M([
		"mirrored",
		"held-by-sandbox",
		"busy"
	]), PD = k({
		port: E().int().min(1).max(65535),
		host: M(["127.0.0.1", "::1"]),
		sandboxId: T(),
		state: ND,
		heldBy: T().optional(),
		command: T().optional()
	}), FD = k({
		running: D(),
		pid: E().int().optional(),
		installed: T().optional(),
		build: T().optional(),
		lastTickAt: E().optional()
	}), ID = k({
		hostname: T(),
		os: T(),
		wsl: cD.optional(),
		pairings: O(MD),
		ports: O(PD),
		agent: FD,
		capturedAt: E()
	}), LD = M([
		"offline",
		"scope-off",
		"no-agent",
		"unreported"
	]), RD = k({
		machine: T(),
		mode: M(["sync", "mirror"]),
		seenAt: E().optional()
	}), zD = k({
		key: T(),
		label: T(),
		sync: RD.optional(),
		hostId: T().optional(),
		online: D().optional(),
		platform: T().optional(),
		facts: lD.optional(),
		agentVersion: T().optional(),
		lastSeen: E().optional(),
		report: ID.optional(),
		sandboxes: O(_D).optional(),
		gap: LD.optional()
	}), BD = k({ devices: O(zD) }), k({
		enrolled: D(),
		available: D().optional(),
		machines: O(ID).optional()
	});
})), HD, UD, WD, GD, KD, qD, JD, YD, XD, ZD, QD, $D, eO = g((() => {
	L(), HD = k({
		state: M([
			"ready",
			"unavailable",
			"unknown"
		]).describe("Whether this runtime can serve a turn. Unknown is a real answer rather than a soft no: a check that could not run must not grey out a provider you can in fact use."),
		detail: T().optional().describe("Why it cannot, and what to do about it. Absent when it can."),
		checkedAt: E().describe("When it was last checked, in milliseconds.")
	}), UD = k({
		version: T().optional().describe("What the downloaded build says it is. Absent means ready but unnamed, never that nothing is ready."),
		channel: T().describe("Which channel it was taken from. Not necessarily the one this sandbox follows: downloading a beta build is not the same as moving onto beta."),
		at: E().describe("When the download finished, in milliseconds, which answers whether this is still the update being offered.")
	}), WD = k({
		name: T().optional().describe("What this sandbox is called."),
		image: T().optional().describe("The image it is running."),
		version: T().optional().describe("The version of that image."),
		latest: T().optional().describe("The newest published version on its channel."),
		updateAvailable: D().optional().describe("Whether those two differ."),
		runtimes: j(T(), HD).optional().describe("Which agent runtimes can serve a turn right now, keyed by runtime. Absent until the first check has run, which reads the same as every entry being unknown."),
		channel: T().optional().describe("Which release channel this sandbox follows."),
		previousImage: T().optional().describe("The image the last update replaced, which is what a rollback would return to. Absent means there is nothing to go back to."),
		updateNotes: O(T()).optional().describe("What is in the update, in the words of the people it is for, newest first. Absent or empty whenever there is nothing worth saying, which reads on screen exactly as it did before there were notes at all."),
		moreUpdateNotes: E().optional().describe("How many further notes there are beyond the ones sent, for a sandbox left alone a long time. Absent or zero means you have all of them."),
		breakingNotes: O(T()).optional().describe("What the update takes away, uncapped, because a warning that fell off a shortened list is a breaking update taken unwarned. Absent for the overwhelming majority, which break nothing."),
		staged: UD.optional().describe("An update already downloaded and built on the machine running this container, waiting only for the restart that applies it. That restart is seconds, where an unprepared update is minutes, which is a different decision entirely. Absent when nothing is waiting.")
	}), GD = k({
		kind: M([
			"unreadable",
			"unknownKey",
			"invalidEntry"
		]).describe("What to do about it. Unreadable means the whole file is being ignored and everything in it is at its default. An unknown key means only that key is ignored. An invalid entry means one item of a list was skipped and the rest is fine."),
		detail: T().describe("What exactly was wrong, as one sentence and nothing else. Never the remedy: that is `fix`."),
		suggestion: T().optional().describe("The name it was probably meant to be, when one is close enough to guess honestly."),
		fix: T().optional().describe("What to do about it, when that is something other than 'correct the file'. Absent whenever the file itself is the thing to edit.")
	}), KD = k({
		path: T().describe("The file, as a workspace path. The file is the unit somebody fixes, which is why problems are grouped by it."),
		problems: O(GD).describe("Everything currently wrong with it. A file with nothing wrong is absent rather than present and empty.")
	}), qD = O(KD), JD = k({
		path: T().describe("The file to repair, as the workspace path the problem was reported under. Only the handful of manifests a person hand-edits can be named; anything else is refused."),
		key: T().describe("The stray top-level key, exactly as it was reported. Absent from the file already means there is nothing to do."),
		to: T().optional().describe("Rename the key to this instead of removing it, carrying its value across. Absent means remove it. Naming a key that is already in the file is refused rather than silently overwriting what is there.")
	}), YD = k({
		token: T().describe("The credential every other call carries. Present it as a bearer token."),
		expiresAt: E().describe("When it stops working, in milliseconds, so a caller can renew ahead of it without reading the token."),
		email: T().describe("Who the sandbox verified you as.")
	}), M([
		"google",
		"ticket",
		"passkey",
		"recovery"
	]), XD = k({
		id: T().describe("The credential id the authenticator chose, base64url."),
		email: T().describe("Whose passkey this is; the owner's list carries every member's, a member's only their own."),
		label: T().describe("The name given at registration, or the daemon's default."),
		rpId: T().describe("The editor host this passkey is bound to; a passkey answers only from that origin."),
		createdAt: E().describe("Epoch ms of registration."),
		lastUsedAt: E().optional().describe("Epoch ms of the last sign-in it answered; absent means never."),
		backedUp: D().describe("Whether the authenticator syncs this passkey (a phone's keychain) or holds the only copy (a hardware key).")
	}), k({
		passkeys: O(XD),
		required: D().describe("Whether a passkey is the only proof that opens this sandbox; owner-set."),
		recovery: k({ remaining: E() }).optional().describe("Owner only, while required: how many one-time recovery codes are still unspent.")
	}), k({ required: D() }), k({ codes: O(T()) }), k({ code: T().min(1) }), k({
		error: T(),
		requires: N("passkey"),
		enrolled: D()
	}), ZD = T().regex(/^[A-Za-z0-9_-]+$/, "base64url"), QD = k({
		id: ZD,
		rawId: ZD,
		type: N("public-key"),
		response: k({
			clientDataJSON: ZD,
			attestationObject: ZD,
			transports: O(T()).optional()
		}),
		authenticatorAttachment: T().optional(),
		clientExtensionResults: j(T(), uc()).optional()
	}), $D = k({
		id: ZD,
		rawId: ZD,
		type: N("public-key"),
		response: k({
			clientDataJSON: ZD,
			authenticatorData: ZD,
			signature: ZD,
			userHandle: ZD.optional()
		}),
		authenticatorAttachment: T().optional(),
		clientExtensionResults: j(T(), uc()).optional()
	}), k({
		response: QD,
		label: T().optional()
	}), k({ response: $D });
})), tO, nO = g((() => {
	z(), L(), Eh(), Uv(), VD(), ZT(), W(), eO(), Ym(), tD(), tO = {
		info: R.route({
			method: "GET",
			path: "/info",
			summary: "What this sandbox is",
			description: "The sandbox's own identity and state: which workspace it holds, which image it runs, what it is called, and the list of calls it actually implements. Start here, because a browser is routinely newer than the sandbox it is talking to and this is how it finds out what is there."
		}).output(WD),
		manifestProblems: R.route({
			method: "GET",
			path: "/system/manifest-problems",
			summary: "Settings files the sandbox could not read",
			description: "Anything the daemon tripped over in its own configuration on disk: a file it had to fall back from, a key it did not recognise, an entry it skipped. Separate from the identity call because it goes stale for a different reason, namely a file changing."
		}).output(qD),
		repairManifest: R.route({
			method: "POST",
			path: "/system/manifest-problems/repair",
			summary: "Take a stray setting out of a file",
			description: "Removes a key the sandbox does not recognise from one of its settings files, or renames it to the one it was probably meant to be, keeping the value. Only the files a person hand-edits can be named, and only a key — never a value — so this can only ever remove something already being ignored. Renaming onto a key the file already has is refused instead of overwriting it."
		}).input(JD).output(H),
		session: R.route({
			method: "POST",
			path: "/system/session",
			summary: "Trade a sign-in for a session",
			description: "Exchanges a verified sign-in, or a session that has not expired yet, for a fresh session the daemon minted. That session is the credential every other call carries, and calling this again with a live one renews it."
		}).output(YD),
		events: R.route({
			method: "GET",
			path: "/events",
			summary: "The live event stream",
			description: "A stream held open for as long as you want it, carrying heartbeats so a caller notices the sandbox dying at once, batches of file changes so a tree or an editor can refresh itself, and the roster of who else is looking. Give it an id for this connection to appear in that roster; leave it out and you watch without being seen."
		}).input(k({ clientId: T().optional() })).output(Fu(Hv)),
		presence: R.route({
			method: "POST",
			path: "/system/presence",
			summary: "Say what you are looking at",
			description: "Reports which view, conversation or file this connection is on, or that it has gone idle. The daemon fans it back out on the event stream so everyone else's roster updates."
		}).input(XT).output(H),
		usage: R.route({
			method: "GET",
			path: "/system/usage",
			summary: "What has been spent",
			description: "Token and cost totals per account, added up from the record of every finished turn."
		}).output(eD),
		terminals: R.route({
			method: "GET",
			path: "/system/terminals",
			summary: "Open terminals",
			description: "The terminal sessions this sandbox is holding, which is what a terminal panel rebuilds its tabs from after a reload. The live typing and output run over a separate socket; this is the list."
		}).output(Fm),
		killTerminal: R.route({
			method: "DELETE",
			path: "/system/terminals/{name}",
			summary: "Close a terminal",
			description: "Destroys one terminal session and whatever was running inside it."
		}).input(Im).output(H),
		terminalScrollback: R.route({
			method: "GET",
			path: "/system/terminals/{name}/scrollback",
			summary: "A terminal's history as plain text",
			description: "What has scrolled past in one terminal, as text you can select and copy. The live view is a picture of a screen on the far side of a socket, with nothing in the page to select, so scrolling back and copying is this call rather than a gesture."
		}).input(Lm).output(Rm),
		browsers: R.route({
			method: "GET",
			path: "/system/browsers",
			summary: "Browsers the agent has open",
			description: "Every browser a conversation currently has running and the pages inside each one. The picture of what they are showing comes over a separate socket; this is the roster."
		}).output(Vm),
		closeBrowser: R.route({
			method: "DELETE",
			path: "/system/browsers/{name}",
			summary: "Shut a browser down",
			description: "Closes one of the agent's browsers. Its next attempt to use that browser then fails as though it had crashed, which is the honest account of somebody pulling the plug."
		}).input(Hm).output(H),
		subagents: R.route({
			method: "GET",
			path: "/system/subagents",
			summary: "Subagents the agents have started",
			description: "Every subagent and child agent this sandbox's conversations have delegated work to, whichever tool started it, with what each one is doing."
		}).output(qm),
		subagentTranscript: R.route({
			method: "GET",
			path: "/system/subagents/{id}/transcript",
			summary: "A subagent's record",
			description: "The full record of one delegated subagent, in the same shape as any other conversation. It comes live from the parent turn while it works, and from stored history once it has finished."
		}).input(Jm).output(Ch),
		devices: R.route({
			method: "GET",
			path: "/system/devices",
			summary: "The machines you have connected",
			description: "Every computer this sandbox can see, whether it reached it through desktop sync or through a connected device, in one row per machine: what it says about itself, which sandboxes it holds, and what stopped it answering when nothing came back."
		}).output(BD),
		manageDeviceSandbox: R.route({
			method: "POST",
			path: "/system/devices/{id}/sandboxes/{slug}",
			summary: "Drive a sandbox on one of your own devices",
			description: "Start, stop, restart, update, rebuild, roll back, reshape (its memory and CPU caps, privileged, GPU) or remove a sandbox running on a machine you own, relayed over the connection that machine holds open. The answer is a stream because the slowest of these takes minutes, and it is the same stream whichever you ask for. The daemon adds no opinion: the machine enforces its own permissions and a refusal arrives as the last line, in the machine's words, naming the switch to flip."
		}).input(bD).output(Fu(xD)),
		runDeviceCommand: R.route({
			method: "POST",
			path: "/system/devices/{id}/commands/{command}",
			summary: "Run one of your device's own CLI actions",
			description: "Performs a named action on a machine you own by running its own intentic-machine command there — turning that device's port mirroring off, say — over the connection it holds open. The set of actions is fixed and the command line is built here from the name, never sent by the caller. The machine enforces its own permissions and a refusal comes back as its own sentence, naming the switch to flip."
		}).input(OD).output(kD),
		runDeviceAgentFlow: R.route({
			method: "POST",
			path: "/system/devices/{id}/agent/{op}",
			summary: "Update or restart the agent on one of your own devices",
			description: "Updates a machine you own to the current intentic-machine agent, or restarts the loop it is running, over the connection that machine holds open. The answer is a stream of the run's own output — and it normally stops mid-run, because the agent's loop is what carries this connection: the work is detached from it first, so it finishes regardless, and the device's reported version is what confirms it. Takes the machine's \"Run commands\" permission, the same one a command typed there would."
		}).input(wD).output(Fu(xD))
	};
})), rO, iO = g((() => {
	z(), L(), Kd(), pf(), Jd(), W(), rO = {
		accounts: R.route({
			method: "GET",
			path: "/translator/accounts",
			summary: "Subscriptions connected through the translator",
			description: "What is signed in per provider. Each provider can hold several accounts at once, and the translator spreads work across them."
		}).output(Bd),
		connect: R.route({
			method: "POST",
			path: "/translator/{provider}/connect",
			summary: "Start connecting a subscription",
			description: "Begins the sign-in for one provider and says which of the two shapes it is: a code you type into a device page, which finishes by itself in the background, or a redirect whose landing address you hand back afterwards."
		}).input(k({ provider: qd })).output(sf),
		status: R.route({
			method: "GET",
			path: "/translator/{provider}/connect",
			summary: "Read a subscription connection attempt",
			description: "Reports whether this exact sign-in attempt is waiting, completed, or failed. Completion is tied to the attempt rather than a change in account count, because signing in to an existing account replaces its credential in place."
		}).input(k({
			provider: qd,
			state: T().min(1)
		})).output(cf),
		complete: R.route({
			method: "POST",
			path: "/translator/{provider}/complete",
			summary: "Finish a redirect sign-in",
			description: "For the providers that redirect somewhere this sandbox cannot receive: hand back the address you landed on and the connection completes."
		}).input(lf).output(H),
		disconnect: R.route({
			method: "POST",
			path: "/translator/{provider}/disconnect",
			summary: "Disconnect one subscription",
			description: "Clears a single account by name. Any others under the same provider stay connected."
		}).input(k({
			provider: qd,
			name: T().min(1)
		})).output(H)
	};
})), aO, oO, sO = g((() => {
	z(), L(), Kd(), tD(), aO = k({ force: D().default(!1).describe("Measure again even if a reading was taken a moment ago.") }), oO = {
		rollup: R.route({
			method: "GET",
			path: "/usage/rollup",
			summary: "What was spent, grouped",
			description: "The spending record over a range of days, grouped by day, provider, account and model. Everything a cost screen shows is a rearrangement of this one answer, so nothing needs a second call. Read-only: rows are written by the sandbox as turns end, which is what makes it worth trusting."
		}).input(ZE).output(QE),
		refreshPlanLimits: R.route({
			method: "POST",
			path: "/usage/plan-limits/refresh",
			summary: "Measure every account's plan limits again",
			description: "Reads how full each connected account's plan limits are, for every provider, and records it. Forced, it measures even accounts read a moment ago, which is the right thing when a plan was just changed and the question is whether the number on screen is still true."
		}).input(aO).output(k({ ok: N(!0) })),
		limitReset: R.route({
			method: "GET",
			path: "/usage/limit-reset/{account}",
			summary: "Whether this account's session window can be reopened now",
			description: "Asks the provider whether it will reopen this account's spent session window immediately, which some plans grant once a week. Only worth asking about an account that has actually been refused: the answer is the provider's judgement at this moment, it is not cached, and an account with no such grant answers plainly that it has none."
		}).input(k({ account: T().min(1).describe("Which account.") })).output(Fd),
		claimLimitReset: R.route({
			method: "POST",
			path: "/usage/limit-reset/{account}/claim",
			summary: "Reopen this account's session window now",
			description: "Spends one of the account's weekly resets to reopen its session window immediately. The weekly allowance is untouched and still binds. Answers with what the provider actually did: only `reset` changed anything, and it is the cue to send the refused turn again."
		}).input(k({ account: T().min(1).describe("Which account.") })).output(Id)
	};
})), cO, lO = g((() => {
	z(), Uv(), W(), Py(), cO = {
		list: R.route({
			method: "GET",
			path: "/vpn",
			summary: "Configured tunnels and which are up",
			description: "Every stored VPN with its live link state, read back from the operating system rather than from memory, so a tunnel dropped from a shell and one dropped from a screen look the same here."
		}).output(Oy),
		connect: R.route({
			method: "POST",
			path: "/vpn/{id}/connect",
			summary: "Dial a VPN",
			description: "Brings a stored tunnel up, streaming the client's progress as it authenticates and then sets up routing. Streamed because a dial takes seconds and can fail with something you have to read: a wrong password, a gateway certificate nobody trusts, a code it wants. Connecting one that is already up simply says so."
		}).input(ky).output(Fu(Ev)),
		disconnect: R.route({
			method: "POST",
			path: "/vpn/{id}/disconnect",
			summary: "Drop a tunnel",
			description: "Takes the tunnel down. One that was already down is fine: the promise is that it is not up afterwards."
		}).input(Ay).output(H),
		importForticlient: R.route({
			method: "POST",
			path: "/vpn/import-forticlient",
			summary: "Read connections out of an exported config",
			description: "Turns an exported FortiClient configuration into a list of connections you can add, so somebody holding that file picks from a list instead of retyping a host and port for every tunnel."
		}).input(jy).output(Ny)
	};
})), uO, dO, fO, pO, mO, hO, gO, _O, vO, yO, bO, xO, SO, CO, wO, TO, EO, DO, OO, kO, AO = g((() => {
	L(), V(), fd(), qp(), uO = T().min(1).max(24).regex(/^[a-z0-9][a-z0-9-]*$/), dO = M(["fresh", "continue"]), fO = 24, pO = k({
		id: uO.describe("This step's own name, which other steps use to say they wait on it."),
		title: T().min(1).max(60).describe("What to call it on screen. Short: the instruction below is where the detail goes."),
		goal: T().min(1).optional().describe("What done means for this step, in your words. It is what the step is judged against, and a different sentence from what it is told to do."),
		prompt: T().min(1).optional().describe("What the step is told to do. The goal is the suite is green; this is run the tests, take the top failure, fix it. Leaving it out hands over the run's own request untouched, which is right for a step whose whole job is do what was asked."),
		needs: O(uO).describe("Which steps must finish first. Empty means it starts when the run does. Naming a step that does not exist, or a loop between steps, is refused when the workflow is saved."),
		handoff: dO.describe("How it meets what came before: a fresh conversation handed the previous step's result, or the same conversation carried on."),
		output: Np.describe("What it has to produce for the step to count."),
		checks: O(Pp).describe("What has to pass before it counts as done."),
		context: Mp.describe("How the step's own repeats meet each other. A long-running step wants to start clean each round; a short polish-this step wants to carry on."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what this step may spend. The one resource that cannot be recovered after an unattended fan-out, which is why it is here and iteration limits are not. Absent is uncapped."),
		agent: pd.optional().describe("Which provider runs it."),
		harness: hd.optional().describe("Which agentic loop runs it."),
		account: T().optional().describe("Which account pays for it."),
		model: T().optional().describe("Which model runs it."),
		actsAs: B.optional().describe("Which persona it acts as. Unpinned, a step gets the strict unwatched default: every tool, and no signed-in accounts at all. Pinning one is how a release check gets a voice, a folder to work in, or the single account it may post from.")
	}), mO = k({
		step: uO.describe("Which step's answer carries the decision. Usually a last step that weighs up the ones before it, though nothing requires that."),
		field: T().min(1).describe("Which of that step's declared answers to read. A declared field is the one part of a step's answer that was checked rather than fished out of prose, which is the whole rule here. Checked when the workflow is saved."),
		pass: O(T().min(1)).min(1).describe("Which values mean ship it. Everything else fails. A list of what passes rather than what fails, because a step answering mostly-pass or pass-with-notes must not ship, and this gets that right without anybody having had to enumerate the ways a model can hedge."),
		dailyMax: E().int().positive().optional().describe("How many runs a day, across every caller. A gate is a paid door with nobody in the loop: one wired into a push-triggered pipeline is a fan-out of conversations per commit. Absent is a small default rather than unlimited.")
	}), hO = M([
		"pass",
		"fail",
		"blocked"
	]), k({
		outcome: hO.describe("Ship it, do not, or we could not tell. That third answer exists because could not reach a judgement is not the product is broken: a gate that reported its own outages as failures is one a team switches off, so it should be the honest answer far more often than the convenient one, and it means a neutral build rather than a red one."),
		reason: T().describe("Why, in one line. Realistically the only part of this a build log will ever show."),
		runId: T().describe("The run behind the verdict, so somebody can go and read it."),
		value: T().optional().describe("What the step actually answered. Absent when there was nothing to read, which is most of the could-not-tell cases.")
	}), gO = k({
		id: B.describe("The workflow's id."),
		name: T().min(1).max(80).describe("What to call it."),
		description: T().max(400).optional().describe("What it is for."),
		steps: O(pO).min(1).max(fO).describe("The steps, each with what it waits on. Every one runs in its own private copy of the repos, always, because parallel steps sharing a tree collide."),
		gate: mO.optional().describe("Present means a machine can run this design and get a ship-it answer back. Absent means an ordinary workflow, started by a person, with no outside door onto it at all."),
		maxParallel: E().int().min(1).max(8).describe("How many steps may run at once. Bounded, because a fan-out of twelve is twelve model sessions, twelve working copies and twelve times the burn rate, on one machine.")
	}), _O = M([
		"pending",
		"running",
		"done",
		"failed",
		"skipped",
		"stopped"
	]), vO = k({
		stepId: uO.describe("Which step this is."),
		state: _O.describe("How it went. Skipped carries what the others cannot: it never ran, because something it was waiting on did not finish. That is why a failed run shows one red step and a trail of grey ones."),
		conversationId: T().describe("The conversation it ran on, and the way from a node on the graph to a real record. Shared with the step before it when they were chained, which is what makes those two one card."),
		startedAt: E().optional().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		iterations: E().int().min(0).describe("How many rounds it took."),
		costUsd: E().optional().describe("What it cost, in dollars."),
		loopState: zp.optional().describe("How its repeating ended. Out of rounds and stuck both come out as a failed step, and the difference between them is the difference between give it more room and more room will not help."),
		detail: T().optional().describe("What went wrong, when something did."),
		document: Fp.optional().describe("What it produced, once it has produced something that passes its own declared shape. This is what the steps after it are handed."),
		report: T().optional().describe("The start of its closing words. Bounded, so a long answer is not silently cut down to its last few thousand characters and the record stays a sensible size."),
		reportPath: T().optional().describe("Where the whole answer is, as a workspace path. Every step can read it, so a long handoff need not be copied into anybody's prompt.")
	}), yO = M([
		"running",
		"done",
		"failed",
		"stopped",
		"overspent",
		"error"
	]), bO = k({
		runId: T().min(1).describe("This run's id."),
		workflow: gO.describe("The design as it stood when the run started, copied rather than looked up. The run has to keep showing the graph it actually ran, not the one edited twice since, and a run of a deleted workflow has to stay readable."),
		repos: O(gd).min(1).max(50).describe("The workspace as this run began, one exact commit per repository. Every step branches from these, even if the shared tree moves while a wide fan-out is still opening its copies, so the steps can be compared with each other afterwards."),
		request: T().optional().describe("What this run was asked to do, handed to every step on top of its own instructions. It is what makes one saved design worth keeping: two models, one task is a shape, and the task is different every time. Absent for a run started with nowhere to type one."),
		state: yO.describe("How the run is going. Finished means every step that ran got there; a run with skipped steps counts as failed, because a graph that never reached its end did not do what it was asked whatever the survivors managed."),
		startedAt: E().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		resumed: E().int().min(0).describe("How many times the sandbox restarted under it and picked it back up."),
		detail: T().optional().describe("What went wrong, when something did."),
		steps: O(vO).describe("One entry per step, in the design's own order. Every one is written down as waiting when the run starts, so the picture is complete from the first frame and a missing step never has to mean two things."),
		archivedAt: E().optional().describe("When it was put away, in milliseconds. The record stays readable and every step's branch, transcript and counters are untouched. Its conversations are put away with it, and brought back with it. Absent means live on the board.")
	}), xO = T().optional().describe("What a pipeline presents at /workflows/{id}/gate, when the design declares a gate. Shown to a maintainer or the owner only."), SO = gO.extend({ gateToken: xO }), CO = gO.extend({
		runs: O(bO).describe("Its runs, newest first."),
		gateToken: xO
	}), wO = k({ workflows: O(CO).describe("Every saved design with its own run history.") }), TO = k({ runs: O(bO).describe("Every run across every workflow, newest first, including runs of workflows since deleted.") }), EO = k({ id: T().describe("Which workflow.") }), DO = k({ runId: T().describe("Which run.") }), OO = EO.extend({ request: T().min(1).max(2e4).optional().describe("What to point it at. Optional, because a design whose steps already say what they want is complete on its own; only one written as a shape needs today's sentence.") }), kO = k({
		workflow: gO.describe("The design to write."),
		create: D().describe("Whether you mean to make a new one or replace an existing one. Said outright rather than inferred, so an id that happens to collide is a refusal instead of one saved design quietly overwriting another.")
	});
})), jO, MO = g((() => {
	z(), W(), AO(), jO = {
		list: R.route({
			method: "GET",
			path: "/workflows",
			summary: "Saved workflows and their runs",
			description: "Every workflow somebody has designed, each with its own run history, newest first. One answer rather than two, because a workflow that has never been run is the interesting case rather than a mistake."
		}).output(wO),
		save: R.route({
			method: "POST",
			path: "/workflows",
			summary: "Create or replace a workflow",
			description: "Writes a workflow design. Say which of the two you mean, so an id that happens to collide cannot silently overwrite somebody's work. A design that could never run is refused, in the same words the editor shows while you type: a loop in the steps, a step waiting on one that is not there, a step with no way of knowing it is finished."
		}).input(kO).output(SO),
		rotateGateToken: R.route({
			method: "POST",
			path: "/workflows/{id}/gate/rotate",
			summary: "Rotate a release gate's token",
			description: "Mints a new credential for the workflow's release gate and retires the old one at once. Every pipeline wired to the gate has to be handed the new URL. Refused for a workflow that declares no gate."
		}).input(EO).output(hf),
		remove: R.route({
			method: "DELETE",
			path: "/workflows/{id}",
			summary: "Delete a workflow",
			description: "Removes the design. A run of it that is already going keeps going and stays readable and stoppable, because a run takes its own copy of the design when it starts."
		}).input(EO).output(H),
		run: R.route({
			method: "POST",
			path: "/workflows/{id}/run",
			summary: "Start a workflow",
			description: "Kicks a workflow off and answers immediately with the run as recorded; the work carries on without you. Point it at a question and every step gets that on top of its own instructions. Every step is written down as waiting up front, so the picture is complete from the first frame. Several runs of one design can be in flight at once without colliding."
		}).input(OO).output(bO),
		runs: R.route({
			method: "GET",
			path: "/workflows/runs",
			summary: "Every workflow run",
			description: "All runs across all workflows, newest first. This is also the only place the runs of a deleted workflow are still reachable."
		}).output(TO),
		stopRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/stop",
			summary: "Stop a run now",
			description: "Nothing further starts, and the steps already going are cut off where they stand. Whatever they had written stays on their branches. Deliberately abrupt rather than letting the current step finish: a step is a whole agent turn, and a stop that kept spending for minutes afterwards is indistinguishable from a button that does nothing. It always ends the run, including one left stranded by a daemon that was replaced mid-flight."
		}).input(DO).output(H),
		archiveRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/archive",
			summary: "Take a finished run off the board",
			description: "Nothing is lost and the working copies are reclaimed. Every conversation the run started is put away with it, which is what makes this an archive rather than a dismissal: a step has no card of its own, so merely dropping the run would spill its conversations onto the board at the moment somebody said they were done. Refused while the run is still going."
		}).input(DO).output(H),
		unarchiveRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/unarchive",
			summary: "Bring an archived run back",
			description: "Puts a run and every conversation it started back on the board."
		}).input(DO).output(H)
	};
})), NO, PO, FO, IO, LO, RO, zO, BO, VO, HO, UO, WO, GO, KO, qO, JO, YO, XO, ZO, QO = g((() => {
	L(), oE(), NO = k({ repos: O(T()).describe("Every repository's id, sorted. An id is its folder relative to the workspace root, and \"root\" is the workspace itself.") }), PO = k({
		name: T().min(1).describe("What to call it in the workspace."),
		cloneUrl: T().min(1).describe("Where to clone it from."),
		branch: T().optional().describe("Which branch to check out. Leave it out for the repository's default.")
	}), FO = k({
		name: T().describe("What it ended up called."),
		path: T().describe("Where it landed.")
	}), IO = k({ name: T().min(1).describe("What to call it, which is also its folder under the workspace root.") }), LO = k({
		repo: T().describe("Which repository."),
		status: M([
			"updated",
			"current",
			"dirty",
			"diverged",
			"no-remote",
			"skipped",
			"error"
		]).describe("What happened to it. Dirty and diverged are why a repository was left alone: it had uncommitted work, or it had moved in a way that cannot be fast-forwarded."),
		behind: E().optional().describe("How many commits it was behind."),
		ahead: E().optional().describe("How many commits it was ahead."),
		head: T().optional().describe("The commit it ended up on."),
		message: T().optional().describe("What went wrong, when something did.")
	}), RO = k({ repos: O(LO).describe("One entry per repository, saying what happened to it.") }), zO = k({
		template: T().min(1).describe("Which kind of app to scaffold, by its key in the template list."),
		name: T().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("What to call this one.")
	}), BO = k({
		repo: T().describe("Which repository to scaffold into."),
		apps: O(zO).min(1).describe("The apps to add.")
	}), VO = k({
		repo: T().describe("Which repository."),
		session: T().describe("What to call the terminal this runs in, so you can find it again."),
		dirs: O(T()).min(1).describe("Which projects to test, as folders relative to the repository. Empty targets the repository root.")
	}), HO = k({
		key: T().describe("The id to name when scaffolding one."),
		label: T().describe("What to call it on screen."),
		description: T().describe("What you get.")
	}), UO = k({ templates: O(HO).describe("The kinds of app the configured source repository knows how to scaffold.") }), WO = k({
		app: T().describe("The app's name, which is also its folder."),
		kind: T().optional().describe("What sort of app it is: the template it came from, or the framework worked out from its dependencies. Absent when it was found purely by having a dev script."),
		previewUrl: T().optional().describe("Where to open it. Absent when this sandbox has no outside address."),
		running: D().describe("Whether its dev server is up."),
		healthy: D().describe("Whether it is actually answering."),
		installed: D().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: nE.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves.")
	}), GO = k({ apps: O(WO).describe("The apps in this repository.") }), KO = k({
		name: T().describe("The name the package declares."),
		dir: T().describe("Where it lives, relative to the repository."),
		group: T().describe("The top-level folder it sits under, which is what a diagram colours by.")
	}), qO = M([
		"prod",
		"dev",
		"peer"
	]), JO = k({
		from: T().describe("The package that depends."),
		to: T().describe("The package it depends on."),
		type: qO.describe("Which kind of dependency declared it.")
	}), YO = k({
		packages: O(KO).describe("Every package in the repository."),
		edges: O(JO).describe("Which of them use which. Pure data: how to lay it out is yours to decide.")
	}), XO = k({ repo: T().describe("Which repository.") }), ZO = k({
		repo: T().describe("Which repository."),
		app: T().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("Which app inside it.")
	});
})), $O, ek, tk, nk, rk = g((() => {
	L(), $O = k({
		dir: T().describe("Where the project is, relative to the workspace root. Empty means the root itself."),
		ecosystem: M(["node", "python"]).describe("Which language's tooling it uses."),
		manager: T().describe("The tool that would do the installing."),
		command: T().describe("The exact command that would run."),
		evidence: T().describe("The file that decided all of the above, so the answer can be checked rather than trusted."),
		state: M([
			"ready",
			"installing",
			"needs-setup",
			"unsupported",
			"stale"
		]).describe("Ready means its dependencies are really there. Stale means it was installed once and has since outgrown that, which is what an agent leaves behind when it adds a dependency without installing it. Unsupported means this sandbox has no such tool."),
		missing: E().optional().describe("How many declared dependencies cannot be found on disk. What separates never-installed from outgrown.")
	}), ek = k({ projects: O($O).describe("Every project the sandbox found, and whether each is usable.") }), tk = k({ dirs: O(T().max(500)).min(1).max(50).describe("Which projects to install, by folder. Ones already ready, already installing, or with no tool to install them are skipped rather than refused.") }), nk = k({ queued: O(T()).describe("Which of them actually started, which is not necessarily what you asked for.") });
})), ik, ak = g((() => {
	z(), rx(), F_(), W(), QO(), Qb(), rk(), Tv(), ik = {
		tree: R.route({
			method: "GET",
			path: "/workspace/tree",
			summary: "The workspace file tree",
			description: "Every folder and file under the workspace root, as one walk. Name a conversation to read its own private copy of the tree instead of the shared one. Folders the daemon skips, such as installed packages, come back without their contents; ask for those separately."
		}).input($_).output(nv),
		children: R.route({
			method: "GET",
			path: "/workspace/children",
			summary: "A bounded folder listing",
			description: "The entries inside a folder as one flat list. Direct children are the default, which is how the explorer opens a folder the full tree walk left closed; callers that need a small subtree can ask for up to five levels without a request per directory."
		}).input(rv).output(iv),
		file: R.route({
			method: "GET",
			path: "/workspace/file",
			summary: "Read part of a text file",
			description: "A window of one file's text, plus how large the whole file is. Never the entire file: an unbounded read is how a single enormous log stalls the daemon for everyone, so ask for the slice you mean to show and page through if you need more."
		}).input(cv).output(dv),
		derived: R.route({
			method: "GET",
			path: "/workspace/derived",
			summary: "Read a file's derived text",
			description: "What a document, picture, recording or archive says, as text, from the shadow the sandbox keeps beside it. This is the same rendering an agent reads instead of the bytes, so it is also the way to check what one is working from. Nothing is derived here: a file with no shadow yet answers that it has none, and whether it could have one."
		}).input(fv).output(vv),
		derive: R.route({
			method: "POST",
			path: "/workspace/derive",
			summary: "Derive a file's text now",
			description: "Renders one file to text and answers with the result, for when its shadow is missing or you want it rebuilt. The same work the background pass does when that setting is on, so this is how a reader gets the text without turning it on for the whole workspace. Costs a parse of exactly one file; a format nothing can read says so rather than failing."
		}).input(fv).output(vv),
		derivedStatus: R.route({
			method: "GET",
			path: "/workspace/derived-status",
			summary: "How the background rendering is doing",
			description: "Whether documents, pictures, recordings and archives are being rendered to text in the background, how many are waiting, which are being read right now, and how many shadows the last whole-tree pass counted. Ask this to tell a file nothing can read from a file whose turn has not come."
		}).output(pv),
		mediaTicket: R.route({
			method: "POST",
			path: "/workspace/media-ticket",
			summary: "Get a pass for streaming a media file",
			description: "Mints the short-lived ticket a video or audio element hands to the streaming route, which serves byte ranges and so cannot carry an ordinary header. Minting it here means a caller can tell whether this sandbox streams media at all, rather than discovering it mid-playback."
		}).input(ov).output(sv),
		resolve: R.route({
			method: "GET",
			path: "/workspace/resolve",
			summary: "Turn a written path into a real file",
			description: "Matches a path somebody wrote in prose against the real tree and says which file it means. A path mentioned in a message is often only the tail of the real one, so this is the lookup behind every clickable file reference rather than a plain existence check."
		}).input(yv).output(bv),
		search: R.route({
			method: "GET",
			path: "/workspace/search",
			summary: "Search the code",
			description: "Ranked results across the whole workspace, grouped, each carrying why it matched and how fresh it is. Left alone it blends plain text, structure, meaning and history in one pass; narrow it to a single kind of search when you already know which you want. Long result sets resume from the cursor it hands back."
		}).input(Gb).output(Zb),
		health: R.route({
			method: "GET",
			path: "/workspace/health",
			summary: "A repo's shape in numbers",
			description: "Where one repo's risk sits: the files that change often and are complicated at once, what the index holds, and which modules the rest of the code leans on most. Scoped to a repo, because a codebase is a repo rather than the whole drop."
		}).input($b).output(nx),
		classify: R.route({
			method: "GET",
			path: "/workspace/classify",
			summary: "Sort a messy drop into buckets",
			description: "Proposes which of the loose things in the workspace are code, documents, media or archives. A read-only suggestion by fixed rules, with no model involved: nothing moves until a caller applies the moves it likes through the move call."
		}).output(wv),
		mkdir: R.route({
			method: "POST",
			path: "/workspace/dir",
			summary: "Create a folder",
			description: "Makes a folder, and any missing folders above it."
		}).input(xv).output(H),
		delete: R.route({
			method: "DELETE",
			path: "/workspace/entry",
			summary: "Delete a file or folder",
			description: "Removes one entry and everything under it. The path travels in the body rather than the address, the same as every other write in this group."
		}).input(av).output(H),
		move: R.route({
			method: "POST",
			path: "/workspace/move",
			summary: "Move or rename something",
			description: "Moves one entry to a new path, which is also how you rename it."
		}).input(Sv).output(H),
		copy: R.route({
			method: "POST",
			path: "/workspace/copy",
			summary: "Copy a file or folder",
			description: "Duplicates one entry at a new path, recursively for a folder."
		}).input(Sv).output(H),
		setup: R.route({
			method: "GET",
			path: "/workspace/setup",
			summary: "Which projects have their dependencies installed",
			description: "Per project, whether its dependencies are actually present. A project that arrives by import comes without them, so files landing is not the same as the project working: until this says a project is ready, its type checks and tests can only mislead you."
		}).output(ek),
		install: R.route({
			method: "POST",
			path: "/workspace/setup/install",
			summary: "Install a project's dependencies",
			description: "Starts the install for one or more projects in a terminal you can attach to, and answers immediately. The run survives a page reload and its output stays in the terminal history."
		}).input(tk).output(nk),
		repos: R.route({
			method: "GET",
			path: "/workspace/repos",
			summary: "Repos in the workspace",
			description: "Every git repo the daemon found in the workspace, with where each one sits and what it is called."
		}).output(NO),
		addRepo: R.route({
			method: "POST",
			path: "/workspace/repos",
			summary: "Clone a repo in",
			description: "Clones a repository into the workspace beside the others, using whatever forge credentials the sandbox already holds."
		}).input(PO).output(FO),
		createRepo: R.route({
			method: "POST",
			path: "/workspace/repos/new",
			summary: "Start a new repo",
			description: "Makes an empty repository in the workspace: a folder named after it, initialised, with a README that names it and one commit, so an agent can start on it at once. Nothing is cloned and nothing leaves the machine."
		}).input(IO).output(FO),
		sync: R.route({
			method: "POST",
			path: "/workspace/sync",
			summary: "Pull every repo up to date",
			description: "Fetches every repo that has a remote and fast-forwards the ones that can move safely, reporting what happened to each. This runs by itself at the start of a turn; call it directly to refresh on demand, or to re-sync a repo that had drifted."
		}).output(RO),
		templates: R.route({
			method: "GET",
			path: "/workspace/templates",
			summary: "App templates you can add",
			description: "The kinds of app the configured source repo knows how to scaffold, which is what an add-app picker lists."
		}).output(UO),
		addApps: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps",
			summary: "Scaffold new apps into a repo",
			description: "Starts scaffolding one or more apps inside an existing multi-package repo and answers straight away. Watch the terminal it opens for progress and for anything that goes wrong."
		}).input(BO).output(H),
		appsList: R.route({
			method: "GET",
			path: "/workspace/repos/{repo}/apps",
			summary: "Apps inside a repo",
			description: "The apps in one multi-package repo, each with its preview address and whether its dev server is up."
		}).input(XO).output(GO),
		packageGraph: R.route({
			method: "GET",
			path: "/workspace/repos/{repo}/graph",
			summary: "How a repo's packages depend on each other",
			description: "Every package in one multi-package repo and which of its siblings each one uses, which is what a dependency view draws."
		}).input(XO).output(YO),
		modules: R.route({
			method: "GET",
			path: "/workspace/modules",
			summary: "Every package across every repo",
			description: "The named packages in the whole workspace, which is what a review list groups changed files under when a reader wants packages rather than paths. Whole-workspace in one answer, because a review spans repos and asking per repo would be a fan-out on every open."
		}).output(O_),
		startApp: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/start",
			summary: "Start an app's dev server",
			description: "Brings up one app's preview server in an attachable terminal, so its address starts answering."
		}).input(ZO).output(H),
		stopApp: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/stop",
			summary: "Stop an app's dev server",
			description: "Shuts one app's preview server down and frees its port."
		}).input(ZO).output(H),
		runTests: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/tests",
			summary: "Run a project's tests",
			description: "Starts the test run for the projects you name in an attachable terminal and answers straight away. The terminal is where the results appear."
		}).input(VO).output(H)
	};
})), ok = g((() => {
	z(), L(), VD(), Cb(), fD(), W(), R.output(lD), R.input(Jy).output(H), R.output(H), R.input(uc()).output(uc()), R.input(yD).output(Fu(xD)), R.input(CD).output(Fu(xD));
})), sk, ck, lk, uk, dk = g((() => {
	L(), sk = k({
		origin: T(),
		mode: M(["read", "act"])
	}), ck = k({
		browser: T(),
		tabs: E(),
		grants: O(sk),
		paused: D()
	}), lk = k({
		id: T(),
		platform: T().min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: ck.optional()
	}), k({ browsers: O(lk) }), uk = k({
		name: T(),
		value: T(),
		domain: T(),
		path: T(),
		expires: E().optional(),
		httpOnly: D(),
		secure: D(),
		sameSite: M([
			"Strict",
			"Lax",
			"None"
		])
	}), k({
		account: T().min(1),
		origin: T().min(1),
		cookies: O(uk).min(1).max(300)
	}), k({
		account: T().min(1),
		domain: T().min(1)
	}), k({
		ok: D(),
		message: T(),
		cookies: O(uk).optional()
	});
})), fk = g((() => {
	z(), L(), Cb(), W(), dk(), R.output(ck), R.input(Zy).output(H), R.output(H), R.input(uc()).output(uc());
})), pk = g((() => {
	z(), L(), Mh(), ld(), V(), Kd(), W(), R.output(rd), R.input(ad).output(Fu(od)), R.input(sd).output(Fu(Dh)), R.input(Vd).output(k({ applied: D() })), R.input(k({
		conversationId: T().min(1),
		text: T(),
		attachments: O(T()).optional(),
		editorContext: _d.optional()
	})).output(k({
		applied: D(),
		invalid: T().optional()
	})), R.input(k({ toml: T() })).output(k({ settings: O(T()) })), R.input(sd.pick({ conversationId: !0 })).output(H), R.output(H);
})), mk = g((() => {})), hk, gk, _k = g((() => {
	hk = "The interrupted request is repeated below, where part of it was already completed in this session, continue from that point instead of starting over.", gk = {
		auth: `The Claude credential that interrupted this conversation has been renewed, and this turn resumed automatically. ${hk}`,
		outage: `The model provider was briefly unavailable and interrupted this conversation; this turn resumed automatically. ${hk}`,
		restart: `The sandbox restarted while this turn was running, which stopped it, and this turn resumed automatically once it came back. ${hk}`,
		stopped: `The previous attempt at this request stopped before it finished, and it has been sent again. ${hk}`,
		limit: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again. ${hk}`,
		switched: "The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account, which starts a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over.",
		carried: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account of the same provider, in this same session: everything you knew is still here. ${hk}`,
		refused: "The model provider refused the previous attempt at this request outright, because its usage allowance was spent: no part of the request below was read or acted on, and nothing has been done towards it. It has been sent again, and starts from the beginning. Where the sandbox has measured earlier work on this branch, it is in the note headed 'Where the work stands'.",
		answered: "The sandbox restarted while this conversation was waiting for the user to respond; it is back, and their response follows below: continue from where the session left off."
	}, gk.answered;
})), vk = g((() => {})), yk = g((() => {})), bk = g((() => {})), xk, Sk = g((() => {
	L(), xk = [
		"editor",
		"read",
		"drive",
		"land"
	], M(xk);
})), Ck, wk, Tk, Ek, Dk, Ok, kk = g((() => {
	Ep(), Ck = [
		{
			path: ".intentic/config/capabilities.json",
			invalidates: [
				"capabilities",
				"environment",
				"panels",
				"manifests"
			],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/capability-dismissals.json",
			invalidates: ["capabilities"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/secret-uses.json",
			invalidates: ["secrets"],
			portability: "carry"
		},
		{
			path: ".intentic/records/wallet-ledger.json",
			invalidates: [],
			why: "Rendered through the wallet CLI and the capability card's live status probe, not from a browser query key.",
			portability: "carry"
		},
		{
			path: ".intentic/config/personas.json",
			invalidates: [
				"personas",
				"capabilities",
				"manifests"
			],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.custom.Dockerfile",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.Dockerfile",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.d/",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/environment.approved.Dockerfile",
			invalidates: ["environment"],
			portability: "derived",
			note: "The target composes its own overlay on first boot; rebuild it there to install the tools it names."
		},
		{
			path: ".intentic/config/settings.json",
			invalidates: ["settings", "manifests"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/safety.md",
			invalidates: ["safety-policy"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/safety-log.json",
			invalidates: ["safety-log"],
			portability: "derived",
			note: "The target starts its own record of what it decided."
		},
		{
			path: ".intentic/config/autostart.json",
			invalidates: [],
			why: "The browser reads what is running off /panels; this file only tells the daemon what to start at boot.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/heavy-commands.json",
			invalidates: ["settings"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/hooks/",
			invalidates: [],
			why: "The settings screen renders the rules that name these scripts, out of settings.json; nothing in the browser reads the scripts themselves.",
			portability: "carry",
			versioned: !0,
			outsideWriter: "the owner or an agent, authoring them; the daemon only ever RUNS one, by the path a rule's command names"
		},
		{
			path: ".intentic/local/rule-firings.json",
			invalidates: ["rule-firings"],
			portability: "derived",
			note: "Stamps of when each rule last did something; the new sandbox starts its own record."
		},
		{
			path: ".intentic/records/runtime-installs.json",
			invalidates: ["environment"],
			portability: "carry"
		},
		{
			path: ".intentic/config/engines.json",
			invalidates: ["engines"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/approvals/",
			invalidates: ["approvals"],
			portability: "carry",
			versioned: !0,
			authored: !0
		},
		{
			path: ".intentic/config/automations.json",
			invalidates: [],
			why: "Declared by the intentic.automations extension's contributes.files, `automations` is its query key, not core's.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/automation-runs.json",
			invalidates: [],
			why: "Declared by the intentic.automations extension's contributes.files, `automations` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/approvals/",
			invalidates: [],
			why: "Declared by the intentic.approvals extension's contributes.files (the page that lists held wakes), `automation-approvals` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/issues/",
			invalidates: [],
			why: "Declared by the intentic.issues extension's contributes.files, `issues` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/chores/",
			invalidates: [],
			why: "Declared by the intentic.maintenance extension's contributes.files, `maintenance-report`/`maintenance-runs` are its query keys, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/config/docs/",
			invalidates: [],
			why: "Declared by the intentic.documentation extension's contributes.files, `documentation`/`documentation-runs` are its query keys, not core's.",
			portability: "carry",
			authored: !0,
			outsideWriter: "the intentic.documentation extension's staging writes (its paths.ts)"
		},
		{
			path: ".intentic/config/workflows.json",
			invalidates: ["workflows"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/workflow-runs.json",
			invalidates: ["workflows", "workflow-runs"],
			portability: "carry"
		},
		{
			path: ".intentic/config/loop-designs.json",
			invalidates: ["loop-designs"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/loops.json",
			invalidates: [],
			why: "Ralph loops and their iteration history. Nothing observes it: where a RUNNING loop stands rides on the fleet roster (AgentSummary.loop), which the /events stream already pushes about once a second, and a second source invalidating on this file could only ever disagree with the card beside it. The iteration list of an ENDED loop is an on-demand read, nothing renders it until someone opens it (web's useLoops, which holds no query for exactly this reason).",
			portability: "carry"
		},
		{
			path: ".intentic/records/webchat-installs.json",
			invalidates: [],
			why: "Which origins have loaded a Front Desk's widget, written on a 30s flush timer while a customer's site serves page views. The install panel that renders it fetches on open and polls itself while it is on screen, which is the whole window in which the answer changes for anyone. Pushing instead would bill every connected browser a refetch per flush, for a panel almost nobody has open.",
			portability: "carry"
		},
		{
			path: ".intentic/records/issue-installs.json",
			invalidates: [],
			why: "The same probe for the bug reporter's script, on the same flush timer and read by the same kind of panel, so it is outside the push path for the same reason the Front Desk's is.",
			portability: "carry"
		},
		{
			path: ".intentic/records/webchat-outbox.json",
			invalidates: [],
			why: "Front Desk replies a visitor has not collected yet, written when an approved wake answers or a human writes as the agent. The only reader is a stranger's browser polling the public /webchat door, which no query key in this app addresses; the owner's own view of the same words is the conversation's transcript, which the agent registry already pushes.",
			portability: "carry"
		},
		{
			path: ".intentic/records/thread-sessions.json",
			invalidates: [],
			why: "Thread bookkeeping (an inbound thread, a Front Desk visitor, a Discord or Slack channel, → sandbox conversation + provider session), written on EVERY inbound message. Nothing in the browser reads it: what a thread produces is a conversation, and the fleet board already learns about that from the agent registry's own push. Naming a key here would bill every connected browser a refetch per inbound message, the request storm this table's own note warns about, to refresh nothing it can see.",
			portability: "carry"
		},
		{
			path: ".intentic/records/senders.json",
			invalidates: [],
			why: "Who has written to each listener source, written on every inbound message that reached an automation. Read only while the automation editor's sender picker is open, which fetches it on open; a live key here would refetch every connected browser per Discord message to refresh a list nobody has on screen.",
			portability: "carry"
		},
		{
			path: ".intentic/config/extension-settings.json",
			invalidates: [],
			why: "Held in a module-level shallowRef store per extension (web's extensionSettingsStore) with no query observer, and deliberately so: api.settings.get must answer SYNCHRONOUSLY from an extension's first activate() line, and the store outlives every component scope. A module-level QueryObserver is the one shape that would make invalidation refetch, and this app already ruled it out, it detaches on the queryClient.clear() at logout (see useSandbox's sandbox-list mirror). So a remote member's setting edit reaches this browser on its next load, not live.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/extension-enablement.json",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/workspace-extensions/",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0,
			authored: !0
		},
		{
			path: ".intentic/records/extension-updates.json",
			invalidates: ["extensions"],
			portability: "carry"
		},
		{
			path: ".intentic/config/extension-update-policy.json",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/extension-usage.json",
			invalidates: [],
			why: "Which of the routes each extension DECLARED it has actually called, the evidence behind the permissions list on its row. The one entry here whose empty set is a RATE decision rather than an architectural one: every browser with the app open reports its batch on a timer, so wiring this to the `extensions` query would refetch the whole list every few seconds for a figure nobody is watching change. The tab reads it when it loads, which is when anyone is reading it.",
			portability: "carry"
		},
		{
			path: ".intentic/identity/members.json",
			invalidates: [],
			why: "Not this view's source at all: SandboxAccess renders the PLATFORM's invite records (apiClient.invite.list), and this file is the daemon's ENFORCED copy, written first so a grant the enforcer never got is never recorded, then never read back. A change here means the two disagreed, which the write order makes fail-closed rather than stale.",
			portability: "identity",
			note: "Re-invite collaborators from the Access tab, a grant is the platform's record, and the target enforces its own copy."
		},
		{
			path: ".intentic/secrets/auth/",
			invalidates: [],
			why: "AI-provider credentials and runtime homes, plus the capability and extension-settings secret vaults; each account is rendered through owner-gated provider routes.",
			portability: "secret",
			note: "Sign the agent's AI accounts in again on the Agent tab, then re-enter each connection's credential on Capabilities and each extension's secret settings on Extensions, both arrived listed but unauthenticated."
		},
		{
			path: ".intentic/records/sessions/claude/",
			invalidates: [],
			why: "Agent session transcripts; nothing derives from watching them, and descending into them would cost a fifth of the watcher.",
			portability: "carry"
		},
		{
			path: ".intentic/records/artifacts/",
			invalidates: [],
			why: "Durable outputs owned by conversations and extension runs: attachments, browser captures, generated images, acceptance reports, workflow step reports, voice transcripts, and loop ledgers.",
			portability: "carry"
		},
		{
			path: ".intentic/local/cache/",
			invalidates: [],
			why: "Rebuildable indexes and caches, the iq index and its vector sidecar, the whisper model, fileq's derived/ markdown shadows of binary files; ignored by the watcher and recreated from carried workspace content.",
			portability: "derived"
		},
		{
			path: ".intentic/local/runtime/",
			invalidates: [],
			why: "Extension runtime scratch (watermarks, cached short-lived tokens); nothing renders it and gateways re-derive it.",
			portability: "derived",
			outsideWriter: "extensions, through extensionRuntimeDir below"
		},
		{
			path: ".intentic/local/tmp/",
			invalidates: [],
			why: "Scratch that agents and tools leave behind (build logs, demo checkouts); nothing reads it after the turn that wrote it. The state janitor empties it at boot.",
			portability: "derived"
		},
		{
			path: ".intentic/local/.pnpm-store/",
			invalidates: [],
			why: "pnpm's content-addressable store, auto-created by installs run from under .intentic; the next install rebuilds it.",
			portability: "derived",
			outsideWriter: "pnpm itself, when an install runs from under .intentic"
		},
		{
			path: ".intentic/local/newest-run.json",
			invalidates: [],
			why: "The newest daemon version that ever ran this workspace (store/newest-run.ts), a downgrade tripwire, about THIS sandbox the way rule-firings is.",
			portability: "derived",
			note: "The target stamps its own daemon version on first boot."
		},
		{
			path: ".intentic/records/verify.json",
			invalidates: [],
			why: "The dependency verifier's verdict memory; nothing renders it directly, outcomes reach the owner as activity entries and workspace events.",
			portability: "carry"
		},
		{
			path: ".intentic/local/verify/",
			invalidates: [],
			why: "A running check's wrapper artifacts (log + exit status), read once by the daemon when the panel finishes.",
			portability: "derived"
		},
		{
			path: ".intentic/secrets/ci.json",
			invalidates: [],
			why: "Webhook secret + conclusion memory; the Pipelines view reads it through /ci/runs, not off disk.",
			portability: "secret",
			note: "Re-add the CI webhook on the Pipelines view, its secret is per-sandbox."
		},
		{
			path: ".intentic/secrets/doors.json",
			invalidates: [],
			why: "The credentials behind the event webhooks, release gates and bug intakes; each surface reads its own through /automations and /workflows, never off disk.",
			portability: "secret",
			note: "Webhook, gate and intake URLs are minted fresh on the first read here: re-copy each into its caller's secret store."
		},
		{
			path: ".intentic/identity/control-tokens.json",
			invalidates: [],
			why: "Hashed control tokens (the ACP editor bridge, and anything else driving this sandbox from outside), listed on demand by the owner.",
			portability: "identity",
			backup: !1,
			note: "Mint fresh control tokens, the old ones authenticate against the source sandbox."
		},
		{
			path: ".intentic/identity/owner.json",
			invalidates: [],
			why: "Bound once on first use; a change here means the sandbox was re-owned, which re-authenticates anyway.",
			portability: "identity"
		},
		{
			path: ".intentic/identity/workspace.json",
			invalidates: [],
			why: "The workspace identity, read from the /events hello frame rather than as a file.",
			portability: "identity"
		},
		{
			path: ".intentic/identity/passkeys.json",
			invalidates: [],
			why: "The passkeys registered with this sandbox, whether one is required to open it, and the hashes of the owner's recovery codes; the Access tab reads them through /system/passkeys, never off disk.",
			portability: "identity",
			note: "Passkeys are bound to the sandbox they were registered with: add them again on the new one from its Access tab."
		},
		{
			path: ".intentic/config/templates.json",
			invalidates: [],
			why: "Scaffold templates, read when the scaffold dialog opens.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/browser/",
			invalidates: [],
			why: "Browser-login profiles: Chromium rewrites these constantly. Descent-ignored by the watcher outright.",
			portability: "derived",
			note: "Log the agent's browser back into any site it needs, profiles do not travel."
		},
		{
			path: ".intentic/local/extensions/",
			invalidates: [],
			why: "Extension checkouts, whole git clones. The `extensions` query is driven by the capability manifest above, not by their contents.",
			portability: "derived",
			note: "Extensions re-clone from the capability manifest on the target's next reconcile."
		},
		{
			path: ".intentic/records/plugins/",
			invalidates: [],
			why: "Agent plugin dirs, read by the SDK's loader each turn.",
			portability: "carry"
		},
		{
			path: ".intentic/config/skills/",
			invalidates: ["skills"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/personas/",
			invalidates: ["personas"],
			portability: "carry",
			versioned: !0
		}
	], wk = Ck, wk.filter((e) => e.versioned).map((e) => e.path), wk.filter((e) => e.versioned || e.authored).map((e) => e.path), Tk = {
		config: `${wp}/config`,
		records: `${wp}/records`,
		local: `${wp}/local`,
		identity: `${wp}/identity`,
		secrets: `${wp}/secrets`
	}, Ek = Object.keys(Tk), Dk = (e) => {
		switch (e.portability) {
			case "secret": return "secrets";
			case "identity": return "identity";
			case "derived": return "local";
			case "carry": return e.versioned === !0 || e.authored === !0 ? "config" : "records";
		}
	}, Ek.flatMap((e) => {
		let t = wk.filter((t) => Dk(t) === e);
		return t.some((e) => e.versioned === !0) ? t.filter((e) => e.versioned !== !0).map((e) => e.path) : [`${Tk[e]}/`];
	}), Ok = wk.filter((e) => e.backup !== !1 && (e.portability === "carry" || e.portability === "identity")).map((e) => e.path), wk.filter((e) => !Ok.includes(e.path)).map((e) => e.path), wk.filter((e) => e.invalidates.includes("manifests")).map((e) => e.path), `${wp}`, `${wp}`;
})), Ak = g((() => {})), jk = g((() => {})), Mk = g((() => {})), Nk = g((() => {})), Pk = g((() => {})), Fk = g((() => {})), Ik, Lk = g((() => {
	Ik = (e) => e instanceof Error ? e.message : String(e);
})), Rk = g((() => {})), zk, Bk, Vk, Hk, Uk = g((() => {
	zk = /(?:auth[_-]?token|access[_-]?token|refresh[_-]?token|api[_-]?key|access[_-]?key|secret[_-]?key|client[_-]?secret|private[_-]?key|passwo?rd|passphrase|credentials?|secret|token|bearer)["']?[ \t]*[:=][ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s"',;}\n]*))/gi, Bk = [
		/-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
		/PuTTY-User-Key-File-\d/,
		/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:(?!\*+@)[^\s/@]{3,}@/i
	], Vk = [
		/\bnpm_[A-Za-z0-9]{30,}/,
		/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}/,
		/\bgithub_pat_[A-Za-z0-9_]{50,}/,
		/\bglpat-[A-Za-z0-9_-]{16,}/,
		/\bxox[baprs]-[A-Za-z0-9-]{10,}/,
		/\bsk-[A-Za-z0-9_-]{20,}/,
		/\b(?:sk|rk)_live_[A-Za-z0-9]{16,}/,
		/\bAKIA[0-9A-Z]{16}\b/,
		/\bASIA[0-9A-Z]{16}\b/,
		/\bAIza[0-9A-Za-z_-]{35}\b/,
		/\bhf_[A-Za-z0-9]{30,}/,
		/\bdop_v1_[a-f0-9]{60,}/,
		/\bey[A-Za-z0-9_-]{10,}\.ey[A-Za-z0-9_-]{10,}\./
	], [...Bk, ...Vk], Hk = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), Hk(Vk), new RegExp(zk.source, zk.flags);
})), Wk = g((() => {})), Gk, Kk = g((() => {
	Gk = 80, Gk * .6;
})), qk = g((() => {
	Kk(), kk();
})), Jk = g((() => {})), Yk = g((() => {
	TC();
})), Xk = g((() => {
	L(), k({
		type: N("hello"),
		token: T(),
		version: T()
	});
})), Zk = g((() => {
	L(), k({
		type: N("hello"),
		token: T(),
		version: T()
	});
})), Qk = g((() => {})), $k, eA = g((() => {
	L(), Cf(), k({
		provider: T().min(1),
		type: T().min(1),
		id: T(),
		channelId: T(),
		author: k({
			id: T(),
			name: T(),
			groups: O(T()).optional()
		}),
		content: T(),
		mentioned: D().optional(),
		branch: T().optional(),
		history: O(k({
			author: k({
				id: T(),
				name: T()
			}),
			content: T(),
			timestamp: T(),
			self: D().optional()
		})).optional(),
		timestamp: T(),
		extra: j(T(), uc()).optional()
	}), $k = k({
		state: M([
			"waiting",
			"code",
			"failed"
		]),
		code: T().optional(),
		detail: T().optional(),
		since: E().optional()
	}), Sf.extend({
		whisperReady: D().optional(),
		pairing: j(T(), $k).optional()
	});
})), tA = g((() => {})), nA = g((() => {})), rA = g((() => {})), iA = g((() => {})), aA = g((() => {})), oA, sA = g((() => {
	oA = {
		cautious: 0,
		balanced: .25,
		eager: .4
	}, oA.balanced;
})), cA = g((() => {})), lA, uA, dA, fA, pA, mA = g((() => {
	L(), lA = [
		"claude",
		"codex",
		"cursor",
		"opencode",
		"translator"
	], uA = M(lA), dA = k({
		kind: M([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where this engine's version comes from."),
		version: T().optional().describe("Which version, when it is pinned to one.")
	}), fA = k({
		version: T().describe("Which version was refused."),
		reason: T().describe("What was wrong with it: it would not launch, or it did not export what the daemon calls."),
		at: T().describe("When it was refused.")
	}), pA = k({
		id: uA.describe("Which engine."),
		label: T().describe("What it is called on screen."),
		running: k({
			version: T().optional().describe("The version a turn would use right now. Absent means there is no copy of this engine here yet."),
			source: M(["image", "store"]).describe("Whether that version is the one baked into the sandbox image or one the store installed over it.")
		}).describe("What a turn started now would actually run."),
		baked: T().optional().describe("The version the image bakes, which is the floor everything else falls back to. Absent on an image that carries no copy of it."),
		channel: dA.describe("The owner's standing answer for this engine."),
		offered: k({
			version: T().describe("The version this engine would move to."),
			blessed: D().describe("Whether the blessed list names this version, which on the latest channel is routinely no.")
		}).optional().describe("A newer version waiting, absent when the running one is already what the channel asks for."),
		blessed: T().optional().describe("What the blessed list names for this engine, when the list has been read."),
		previous: T().optional().describe("The version kept one step back, which is what going back means."),
		quarantined: O(fA).describe("Versions the store installed and then refused, with the reason."),
		diskBytes: E().int().nonnegative().describe("What this engine's kept versions cost on the daemon's volume."),
		installing: D().optional().describe("Whether this engine is currently being installed in the background.")
	}), k({
		engines: O(pA).describe("Every engine this sandbox can run, whether or not the store holds anything for it."),
		checkedAt: T().optional().describe("When upstream was last asked what it publishes. Absent until the first check has run."),
		listSource: T().describe("Where the blessed list is read from, so a self-hosted sandbox can show its own."),
		listReadAt: T().optional().describe("When that list was last read. Absent means it has never been reachable from here.")
	}), k({
		id: uA.describe("Which engine."),
		kind: M([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where its version should come from."),
		version: T().optional().describe("Which version, required when pinning and ignored otherwise.")
	}), k({
		id: uA.describe("Which engine."),
		version: T().optional().describe("Which version. Leave it out for whatever the channel offers; naming one takes a version nobody has blessed, deliberately."),
		floor: T().optional().describe("Install the lowest published version at or above this one. What a turn refused for being too old sends back.")
	}), k({ id: uA.describe("Which engine.") }), k({
		ok: N(!0).describe("It went through."),
		version: T().describe("Which version is now active."),
		source: M(["image", "store"]).describe("Whether that is the image's copy or the store's."),
		fromNextTurn: D().describe("Whether the change reaches turns already in flight, or only the next one.")
	});
})), hA, gA, _A, vA, yA, bA, xA, SA, CA, wA = g((() => {
	L(), hA = k({
		content: T(),
		hash: T()
	}), gA = k({
		bornAt: E(),
		at: E(),
		apt: O(T()),
		paths: O(T())
	}), _A = M([
		"apt",
		"pip",
		"cargo",
		"npm",
		"rustup-target",
		"playwright",
		"gem",
		"pipx",
		"go",
		"other"
	]), vA = k({
		tool: T(),
		kind: _A,
		sessions: O(T()),
		commands: O(T()),
		firstAt: E(),
		lastAt: E(),
		count: E(),
		declinedAt: E().optional()
	}), k({
		installs: O(vA),
		drift: gA.optional()
	}), yA = k({
		tool: T(),
		kind: _A,
		sessions: E(),
		lastAt: E(),
		live: D(),
		drafted: D().optional(),
		declined: D().optional(),
		step: T().optional()
	}), k({
		tool: T().min(1),
		decision: M([
			"adopt",
			"dismiss",
			"restore"
		])
	}), bA = k({
		base: T(),
		root: T().optional()
	}), k({
		proposal: hA.optional(),
		custom: hA.optional(),
		approved: hA.optional(),
		appliedHash: T().optional(),
		container: T().optional(),
		drift: gA.optional(),
		recurring: O(yA).optional(),
		localImage: bA.optional()
	}), k({ hash: T().min(1) }), xA = k({
		name: T(),
		version: T().optional()
	}), SA = k({
		id: T(),
		name: T(),
		origin: M([
			"custom",
			"capability",
			"base"
		]),
		originLabel: T().optional(),
		state: M([
			"active",
			"after-rebuild",
			"awaiting-approval"
		]),
		tools: O(xA),
		extras: E().optional(),
		purpose: T().optional(),
		detail: T().optional(),
		commands: T().optional()
	}), k({ items: O(SA) }), CA = k({
		name: T(),
		status: M([
			"packing",
			"ready",
			"failed"
		]),
		bytes: E(),
		createdAt: E(),
		secrets: D(),
		error: T().optional()
	}), k({ exports: O(CA) });
})), TA, EA, DA, OA, kA, AA = g((() => {
	L(), nd(), TA = M([
		"definition",
		"bundle",
		"hermes",
		"openclaw"
	]), EA = M(["hermes", "openclaw"]), DA = M([
		"workspace",
		"repo",
		"files",
		"history",
		"environment",
		"capability",
		"settings",
		"memory",
		"skill",
		"automation",
		"secret"
	]), OA = k({
		id: T(),
		group: DA,
		label: T(),
		detail: T().optional(),
		applicable: D(),
		reason: T().optional(),
		recommended: D(),
		secrets: O(T())
	}), k({
		source: TA,
		token: T(),
		name: T().optional(),
		items: O(OA),
		carriesSecrets: D(),
		refused: O(T()),
		needsAction: O(td)
	}), k({
		token: T(),
		items: O(T()),
		includeSecrets: D()
	}), k({
		applied: O(k({
			id: T(),
			group: DA,
			label: T()
		})),
		failed: O(k({
			id: T(),
			label: T(),
			error: T()
		})),
		refused: O(T()),
		needsAction: O(td),
		presentation: k({
			name: T().optional(),
			image: T().optional()
		}).optional()
	}), kA = k({
		id: T(),
		online: D(),
		found: EA.optional(),
		detail: T().optional()
	}), k({ hosts: O(kA) }), k({ host: T().min(1) });
})), jA, MA, NA, PA, FA, IA, LA = g((() => {
	L(), nd(), Cb(), Pw(), jA = fc({
		id: T().min(1),
		remote: T().min(1),
		ref: T().optional()
	}), MA = fc({
		remote: T().min(1),
		ref: T().optional()
	}), NA = fc({
		baseImage: T().optional(),
		dockerfile: T().optional()
	}), PA = (e) => {
		let t = e;
		for (; t instanceof bl || t instanceof xl;) t = t.unwrap();
		return t;
	}, FA = () => fc(Object.fromEntries(Object.entries(_w.shape).map(([e, t]) => [e, PA(t).optional()]))).prefault({}), IA = fc({
		schemaVersion: N(1),
		name: T().optional(),
		environment: NA.prefault({}),
		workspace: MA.optional(),
		repositories: O(jA).prefault([]),
		capabilities: O(ub).prefault([]),
		secrets: O(T()).prefault([]),
		settings: FA()
	}), k({
		toml: T(),
		omitted: O(td)
	}), k({ differences: O(td) }), k({
		remote: T().min(1).optional(),
		name: T().min(1).optional(),
		owner: T().min(1).optional()
	}), k({
		remote: T(),
		branch: T(),
		created: D()
	}), k({
		remote: T().optional(),
		branch: T().optional(),
		hosts: O(T())
	}), k({
		version: N(3),
		sandbox: k({ name: T() }).optional(),
		presentation: k({
			name: T().optional(),
			image: T().optional()
		}).optional(),
		createdAt: E(),
		secrets: D(),
		repos: O(T()),
		definition: IA,
		excluded: O(k({
			path: T(),
			portability: T(),
			note: T().optional()
		}))
	});
})), RA = g((() => {})), zA = g((() => {})), BA = g((() => {})), VA = g((() => {})), HA = g((() => {})), UA = g((() => {
	jp();
})), WA, GA, KA = g((() => {
	Ul(), _f(), Tf(), Kh(), L_(), X_(), Q_(), Wb(), kx(), jx(), Fx(), Lx(), CC(), Qw(), MT(), PT(), RT(), BT(), HT(), $T(), tE(), cE(), hE(), CE(), EE(), kE(), zE(), VE(), UE(), YE(), rD(), aD(), sD(), nO(), iO(), sO(), lO(), MO(), ak(), ok(), fk(), pk(), mk(), Mh(), xp(), _k(), Uv(), Eh(), vk(), yk(), bk(), Ul(), Sk(), Ep(), kk(), Ak(), jk(), Mk(), Nk(), Pk(), Xu(), ed(), wC(), Fk(), RC(), Rk(), YC(), Uk(), Wk(), zu(), qk(), Yk(), Xk(), Zk(), Qk(), ld(), eA(), tA(), nA(), rA(), Jk(), TC(), Wu(), iA(), aA(), sA(), jp(), cA(), Cf(), V(), km(), J_(), Pg(), Cb(), qg(), jm(), rx(), VD(), mA(), wA(), iy(), xC(), Nm(), F_(), AT(), Wh(), fD(), IT(), _y(), ug(), ZT(), qp(), Dx(), Rb(), oE(), Xw(), Kd(), pE(), pf(), Jd(), xE(), LE(), Hb(), Hf(), qE(), Pw(), nh(), W(), eO(), Ym(), tD(), Py(), dk(), AO(), QO(), Qb(), rk(), Tv(), AA(), LA(), RA(), zA(), BA(), Kk(), pD(), VA(), HA(), UA(), WA = {
		accounts: gf,
		activity: wf,
		agent: Gh,
		agents: I_,
		approvals: Y_,
		automations: Z_,
		capabilities: Ub,
		chores: Ox,
		ci: Ax,
		endpoints: Px,
		extensions: SC,
		personas: Zw,
		safety: BE,
		sessions: JE,
		settings: nD,
		share: iD,
		skills: oD,
		intentic: LT,
		git: jT,
		history: NT,
		workspace: ik,
		inventory: zT,
		issues: VT,
		logs: QT,
		loops: eE,
		panels: sE,
		ports: mE,
		public: SE,
		prepush: TE,
		providers: OE,
		push: RE,
		secrets: HE,
		system: tO,
		translator: rO,
		usage: oO,
		vpn: cO,
		exit: Ix,
		workflows: jO
	}, GA = Ll(WA), GA.map((e) => e.name), Hl(WA);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function qA(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function JA(e, t = "|") {
	return e.map((e) => hj(e)).join(t);
}
function YA(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function XA(e) {
	return new Wj(e);
}
function ZA(e) {
	return e == null;
}
function QA(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function $A(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function ej(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function tj(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function nj(e) {
	return tj(e._zod.def) ?? e._zod.def.shape;
}
function rj(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return ej(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function ij(e, t, n) {
	t in e ? ej(e, t, n) : e[t] = n;
}
function aj(e, t, n, r) {
	let i = nj(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? rj(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : ij(e, a, r ? r(n.value, a) : n.value));
	}
}
function oj(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? rj(e, n, () => t[n]) : ij(e, n, r.value));
	}
}
function sj(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function cj(e) {
	return JSON.stringify(e);
}
function lj(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function uj(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function dj(e) {
	if (uj(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return uj(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function fj(e) {
	return dj(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function pj(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function mj(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function G(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function hj(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function gj(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function _j(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return aj(i, e, vj(e, t)), mj(e, sj(n, {
		shape: i,
		checks: []
	}));
}
function vj(e, t) {
	let n = nj(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function yj(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(vj(e, t)), a = {};
	return aj(a, e, Reflect.ownKeys(nj(e)).filter((e) => !i.has(e))), mj(e, sj(n, {
		shape: a,
		checks: []
	}));
}
function bj(e, t) {
	if (!dj(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = nj(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return mj(e, sj(e._zod.def, { shape: xj(e, t) }));
}
function xj(e, t) {
	let n = {};
	return aj(n, e, Reflect.ownKeys(nj(e))), oj(n, t), n;
}
function Sj(e, t) {
	if (!dj(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return mj(e, sj(e._zod.def, { shape: xj(e, t) }));
}
function Cj(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return aj(n, e, Reflect.ownKeys(nj(e))), aj(n, t, Reflect.ownKeys(nj(t))), mj(e, sj(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function wj(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(vj(t, n)) : void 0, o = {};
	return aj(o, t, Reflect.ownKeys(nj(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), mj(t, sj(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function Tj(e, t, n) {
	let r = n ? new Set(vj(t, n)) : void 0, i = {};
	return aj(i, t, Reflect.ownKeys(nj(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), mj(t, sj(t._zod.def, { shape: i }));
}
function Ej(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Dj(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Oj(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function kj(e) {
	return typeof e == "string" ? e : e?.message;
}
function Aj(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function jj(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : kj(e.inst?._zod.def?.error?.(e)) ?? kj(a?.(e)) ?? kj(t?.error?.(e)) ?? kj(n.customError?.(e)) ?? kj(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
function Mj(e) {
	let t = e.length;
	if (!Xj.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Nj(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Pj(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function Fj(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function Ij(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Bj(e, n, r.value);
	}
}
function Lj(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Rj(e, t, n) {
	return Lj(e, t, n, !1);
}
function zj(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return Lj(this, n, r(this));
			},
			set(e) {
				Lj(this, n, e);
			}
		});
	}
	return t;
}
function Bj(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Lj(this, t, n.bind(this));
		},
		set(e) {
			Lj(this, t, e);
		}
	});
}
function Vj(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function K(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Zj !== e._zod) {
		Zj = void 0;
		return;
	}
	Zj = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, $j);
			let e = Qj;
			Qj = !1;
			try {
				let r = n(this);
				return Qj ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Qj ||= e, r;
			} catch (n) {
				throw delete this[t], Qj ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function Hj(e, t, n, r) {
	let i = Vj(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
function Uj(e) {
	let t = () => e;
	return t[eM] = !0, t;
}
var Wj, Gj, Kj, qj, Jj, Yj, Xj, Zj, Qj, $j, eM, tM = g((() => {
	uM(), Wj = class {
		constructor(e) {
			this._getter = e, this._value = void 0;
		}
		get value() {
			let e = this._getter;
			return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
		}
	}, Gj = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, Kj = /* @__PURE__*/ XA(() => {
		if (lM.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), qj = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), Jj = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Yj = {
		int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
		uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
	}, Xj = /[\uD800-\uDBFF]/, Qj = !1, $j = {
		configurable: !0,
		get() {
			Qj = !0;
		}
	}, eM = "~constantCatch";
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
function nM(e) {
	let t = oM;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return oM = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function q(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			aM.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", aM);
			} finally {
				aM.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Ij(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? nM(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
function rM(e) {
	return e && Object.assign(lM, e), lM;
}
var iM, aM, oM, sM, cM, lM, uM = g((() => {
	tM(), aM = {
		value: void 0,
		enumerable: !1
	}, oM = "captureStackTrace" in Error ? Error : null, sM = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, cM = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (iM = globalThis).__zod_globalConfig ?? (iM.__zod_globalConfig = {}), lM = globalThis.__zod_globalConfig;
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function dM() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, YA, 2), e.message;
}
function fM(e) {
	this._zod.message = e;
}
function pM(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function mM(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? pM(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function hM(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
var gM, _M, vM, yM, bM, xM = g((() => {
	uM(), tM(), gM = {
		get: dM,
		set: fM,
		enumerable: !0,
		configurable: !0
	}, _M = {
		value: void 0,
		enumerable: !1
	}, vM = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), yM = (e, t) => {
		e.name = "$ZodError", _M.value = t, Object.defineProperty(e, "issues", _M), _M.value = void 0, Object.defineProperty(e, "message", gM);
		let n = Object.getPrototypeOf(e);
		vM.has(n) || (vM.add(n), Object.defineProperty(n, "toString", {
			configurable: !0,
			enumerable: !1,
			get() {
				let e = () => this.message;
				return Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				}), e;
			},
			set(e) {
				Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				});
			}
		}));
	}, bM = q("$ZodError", yM), q("$ZodError", yM, void 0, { Parent: Error });
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function SM(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
function CM(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => jj(e, n, rM()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
function wM(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[AM] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new sM();
	return a.issues.length === 0;
}
var TM, EM, DM, OM, kM, AM, jM, MM, NM, PM, FM, IM, LM, RM, zM, BM, VM = g((() => {
	uM(), tM(), TM = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new sM();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => jj(e, o, rM())));
				throw Gj(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, EM = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => jj(e, o, rM())));
				throw Gj(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, DM = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new sM();
		return a.issues.length ? CM(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, OM = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? CM(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, kM = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), AM = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), jM = ((e, t, n) => {
		let r = e._zod.bag.validator;
		if (r !== void 0) {
			if (r(t) !== kM) return !0;
			if (r.definite === !0 && n === void 0) return !1;
		}
		return wM(e, t, n);
	}), MM = async (e, t, n) => {
		let r = n ? {
			...n,
			async: !0,
			abortEarly: !0
		} : {
			async: !0,
			abortEarly: !0
		}, i = e._zod.run({
			value: t,
			issues: []
		}, r);
		return i instanceof Promise && (i = await i), i.issues.length === 0;
	}, NM = (e) => {
		let t = TM(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, SM(n, a));
		};
		return n;
	}, PM = (e) => {
		let t = TM(e), n = (e, r, i, a) => t(e, r, i, SM(n, a));
		return n;
	}, FM = (e) => {
		let t = EM(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, SM(n, a));
		};
		return n;
	}, IM = (e) => {
		let t = EM(e), n = async (e, r, i, a) => await t(e, r, i, SM(n, a));
		return n;
	}, LM = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return DM(e)(t, n, i);
	}, RM = (e) => (t, n, r) => DM(e)(t, n, r), zM = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return OM(e)(t, n, i);
	}, BM = (e) => async (t, n, r) => OM(e)(t, n, r);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
function HM(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function UM() {
	return new RegExp(iN, "u");
}
function WM(e) {
	return RegExp(`^${e}$`);
}
function GM(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function KM(e) {
	return RegExp(`^${GM(e)}$`);
}
function qM(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${GM({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${GM({ precision: e.precision })}` : n;
	return RegExp(`^${pN}T(?:${r})$`);
}
var JM, YM, XM, ZM, QM, $M, eN, tN, nN, rN, iN, aN, oN, sN, cN, lN, uN, dN, fN, pN, mN, hN, gN, _N, vN, yN, bN = g((() => {
	JM = /^[cC][0-9a-z]{6,}$/, YM = /^[0-9a-z]+$/, XM = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, ZM = /^[0-9a-vA-V]{20}$/, QM = /^[A-Za-z0-9]{27}$/, $M = /^[a-zA-Z0-9_-]{21}$/, eN = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, tN = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, nN = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, rN = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, iN = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", aN = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, oN = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, sN = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, cN = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, lN = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, uN = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, dN = /^https?$/, fN = /^\+[1-9]\d{6,14}$/, pN = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", mN = /*@__PURE__*/ WM(pN), hN = /^[\s\S]{0,}$/, gN = /^-?\d+(?:\.\d+)?$/, _N = /^(?:true|false)$/i, vN = /^[^A-Z]*$/, yN = /^[^a-z]*$/;
})), xN, SN, CN, wN, TN, EN, DN, ON, kN, AN, jN, MN, NN, PN, FN, IN, LN, RN, zN = g((() => {
	uM(), bN(), tM(), xN = /*@__PURE__*/ q("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), SN = (e) => {
		let t = e.value;
		return !ZA(t) && t.length !== void 0;
	}, CN = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, wN = /*@__PURE__*/ q("$ZodCheckLessThan", (e, t) => {
		xN.init(e, t);
		let n = CN[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: CN[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), TN = /*@__PURE__*/ q("$ZodCheckGreaterThan", (e, t) => {
		xN.init(e, t);
		let n = CN[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: CN[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), EN = /*@__PURE__*/ q("$ZodCheckMultipleOf", (e, t) => {
		xN.init(e, t), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : $A(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), DN = /*@__PURE__*/ q("$ZodCheckNumberFormat", (e, t) => {
		xN.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Jj[t.format];
		e._zod.check = (o) => {
			let s = o.value;
			if (n) {
				if (!Number.isInteger(s)) {
					o.issues.push({
						expected: r,
						format: t.format,
						code: "invalid_type",
						continue: !1,
						input: s,
						inst: e
					});
					return;
				}
				if (!Number.isSafeInteger(s)) {
					s > 0 ? o.issues.push({
						input: s,
						code: "too_big",
						maximum: 2 ** 53 - 1,
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					}) : o.issues.push({
						input: s,
						code: "too_small",
						minimum: -(2 ** 53 - 1),
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					});
					return;
				}
			}
			s < i && o.issues.push({
				origin: "number",
				input: s,
				code: "too_small",
				minimum: i,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			}), s > a && o.issues.push({
				origin: "number",
				input: s,
				code: "too_big",
				maximum: a,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			});
		};
	}), ON = /*@__PURE__*/ q("$ZodCheckMaxLength", (e, t) => {
		var n;
		xN.init(e, t), (n = e._zod.def).when ?? (n.when = SN), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? Mj(r) : i) <= t.maximum) return;
			let a = Nj(r);
			n.issues.push({
				origin: a,
				code: "too_big",
				maximum: t.maximum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), kN = /*@__PURE__*/ q("$ZodCheckMinLength", (e, t) => {
		var n;
		xN.init(e, t), (n = e._zod.def).when ?? (n.when = SN), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Mj(r) : i) >= t.minimum) return;
			let a = Nj(r);
			n.issues.push({
				origin: a,
				code: "too_small",
				minimum: t.minimum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), AN = /*@__PURE__*/ q("$ZodCheckLengthEquals", (e, t) => {
		var n;
		xN.init(e, t), (n = e._zod.def).when ?? (n.when = SN), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? Mj(r) : i;
			if (a === t.length) return;
			let o = Nj(r), s = a > t.length;
			n.issues.push({
				origin: o,
				...s ? {
					code: "too_big",
					maximum: t.length
				} : {
					code: "too_small",
					minimum: t.length
				},
				inclusive: !0,
				exact: !0,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), jN = /*@__PURE__*/ q("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		xN.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: t.format,
				input: n.value,
				...t.pattern ? { pattern: t.pattern.toString() } : {},
				inst: e,
				continue: !t.abort
			});
		}) : (r = e._zod).check ?? (r.check = () => {});
	}), MN = /*@__PURE__*/ q("$ZodCheckRegex", (e, t) => {
		jN.init(e, t), e._zod.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: n.value,
				pattern: t.pattern.toString(),
				inst: e,
				continue: !t.abort
			});
		};
	}), NN = /*@__PURE__*/ q("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= vN, jN.init(e, t);
	}), PN = /*@__PURE__*/ q("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= yN, jN.init(e, t);
	}), FN = /*@__PURE__*/ q("$ZodCheckIncludes", (e, t) => {
		xN.init(e, t);
		let n = pj(t.includes);
		t.pattern = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n), e._zod.check = (n) => {
			n.value.includes(t.includes, t.position) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: t.includes,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), IN = /*@__PURE__*/ q("$ZodCheckStartsWith", (e, t) => {
		xN.init(e, t);
		let n = RegExp(`^${pj(t.prefix)}.*`);
		t.pattern ??= n, e._zod.check = (n) => {
			n.value.startsWith(t.prefix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: t.prefix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), LN = /*@__PURE__*/ q("$ZodCheckEndsWith", (e, t) => {
		xN.init(e, t);
		let n = RegExp(`.*${pj(t.suffix)}$`);
		t.pattern ??= n, e._zod.check = (n) => {
			n.value.endsWith(t.suffix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: t.suffix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), RN = /*@__PURE__*/ q("$ZodCheckOverwrite", (e, t) => {
		xN.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), BN, VN = g((() => {
	BN = class {
		constructor(e = [], t = {}) {
			this.content = [], this.indent = 0, this.args = e, this.closed = t;
		}
		indented(e) {
			this.indent += 1;
			try {
				e(this);
			} finally {
				--this.indent;
			}
		}
		write(e) {
			if (typeof e == "function") {
				e(this, { execution: "sync" }), e(this, { execution: "async" });
				return;
			}
			let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
			for (let e of r) this.content.push(e);
		}
		compile() {
			let e = Function, t = this?.content ?? [""];
			return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
		}
	};
})), HN, UN = g((() => {
	HN = {
		major: 4,
		minor: 6,
		patch: 5
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
async function WN(e, t) {
	let n = { async: !0 };
	return _P(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function GN(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return _P(r, n);
			} catch {}
			return WN(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
function KN(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function qN(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? KN(e) || 2 : JN(e, t);
}
function JN(e, t) {
	if (!t.normalize && t.protocol?.source === dN.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		if (typeof URL < "u") {
			let t = URL;
			if (typeof t.parse == "function") return t.parse(e) ?? 2;
		}
		return new URL(e);
	} catch {
		return 2;
	}
}
function YN(e) {
	return e.replace(SP, "");
}
function XN(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function ZN(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function QN(e) {
	return IP.test(e) ? KN(`http://[${e}]`) : !1;
}
function $N(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : QN(n);
}
function eP(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function tP(e) {
	if (!HP.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return eP(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function nP(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
function rP(e, t, n) {
	e.issues.length && t.issues.push(...Oj(n, e.issues)), t.value[n] = e.value;
}
function iP(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Oj(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
function aP(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : QP, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = gj(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function oP(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Ej(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => iP(e, n, i, t, d, f))) : iP(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function sP(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Ej(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => jj(e, r, rM())))
	}), t);
}
function cP(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (dj(e) && dj(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = cP(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = cP(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function lP(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = cP(t.value, n.value);
	if (!c.valid) {
		if (Ej(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function uP(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function dP(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function fP(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function pP(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => jj(e, r, rM())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function mP(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function hP(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function gP(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Fj(e));
	}
}
var J, _P, vP, Y, yP, bP, xP, SP, CP, wP, TP, EP, DP, OP, kP, AP, jP, MP, NP, PP, FP, IP, LP, RP, zP, BP, VP, HP, UP, WP, GP, KP, qP, JP, YP, XP, ZP, QP, $P, eF, tF, nF, rF, iF, aF, oF, sF, cF, lF, uF, dF, fF, pF, mF, hF = g((() => {
	zN(), uM(), VN(), bN(), tM(), UN(), J = /*@__PURE__*/ q("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = HN;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = Ej(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (Dj(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new sM();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (Aj(t.issues, n, e), i ||= Ej(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						Aj(t.issues, n, e), i ||= Ej(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (Ej(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new sM();
					return o.then((t) => e._zod.parse(t, a));
				}
				return e._zod.parse(o, a);
			};
			e._zod.run = (r, a) => {
				if (a.skipChecks) return e._zod.parse(r, a);
				if (a.direction === "backward") {
					let t = e._zod.parse({
						value: r.value,
						issues: []
					}, {
						...a,
						skipChecks: !0
					});
					return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
				}
				let o = e._zod.parse(r, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new sM();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return Rj(this, "~standard", GN(this));
		},
		set "~standard"(e) {
			Lj(this, "~standard", e);
		}
	}), _P = (e, t) => e.issues.length ? { issues: e.issues.map((e) => jj(e, t, rM())) } : { value: e.value }, vP = /*@__PURE__*/ q("$ZodString", (e, t) => {
		J.init(e, t), e._zod.pattern = t.pattern ?? hN, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = String(n.value);
			} catch {}
			return typeof n.value == "string" || n.issues.push({
				expected: "string",
				code: "invalid_type",
				input: n.value,
				inst: e
			}), n;
		};
	}), Y = /*@__PURE__*/ q("$ZodStringFormat", (e, t) => {
		jN.init(e, t), vP.init(e, t);
	}), yP = /*@__PURE__*/ q("$ZodGUID", (e, t) => {
		t.pattern ??= tN, Y.init(e, t);
	}), bP = /*@__PURE__*/ q("$ZodUUID", (e, t) => {
		if (t.version) {
			let e = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[t.version];
			if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ??= nN(e);
		} else t.pattern ??= nN();
		Y.init(e, t);
	}), xP = /*@__PURE__*/ q("$ZodEmail", (e, t) => {
		t.pattern ??= rN, Y.init(e, t);
	}), SP = /[\t\n\r]/g, CP = /*@__PURE__*/ q("$ZodURL", (e, t) => {
		Y.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = qN(r, t);
				if (i === 1) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				if (i === 2) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				if (i === !0) {
					n.value = YN(r);
					return;
				}
				t.hostname && !XN(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !ZN(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : YN(r);
				return;
			} catch {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
			}
		};
	}), wP = /*@__PURE__*/ q("$ZodEmoji", (e, t) => {
		t.pattern ??= UM(), Y.init(e, t);
	}), TP = /*@__PURE__*/ q("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? $M : HM(t.length), Y.init(e, t);
	}), EP = /*@__PURE__*/ q("$ZodCUID", (e, t) => {
		t.pattern ??= JM, Y.init(e, t);
	}), DP = /*@__PURE__*/ q("$ZodCUID2", (e, t) => {
		t.pattern ??= YM, Y.init(e, t);
	}), OP = /*@__PURE__*/ q("$ZodULID", (e, t) => {
		t.pattern ??= XM, Y.init(e, t);
	}), kP = /*@__PURE__*/ q("$ZodXID", (e, t) => {
		t.pattern ??= ZM, Y.init(e, t);
	}), AP = /*@__PURE__*/ q("$ZodKSUID", (e, t) => {
		t.pattern ??= QM, Y.init(e, t);
	}), jP = /*@__PURE__*/ q("$ZodISODateTime", (e, t) => {
		t.pattern ??= qM(t), Y.init(e, t);
	}), MP = /*@__PURE__*/ q("$ZodISODate", (e, t) => {
		t.pattern ??= mN, Y.init(e, t);
	}), NP = /*@__PURE__*/ q("$ZodISOTime", (e, t) => {
		t.pattern ??= KM(t), Y.init(e, t);
	}), PP = /*@__PURE__*/ q("$ZodISODuration", (e, t) => {
		t.pattern ??= eN, Y.init(e, t);
	}), FP = /*@__PURE__*/ q("$ZodIPv4", (e, t) => {
		t.pattern ??= aN, Y.init(e, t);
	}), IP = /^[0-9a-fA-F:.]+$/, LP = /*@__PURE__*/ q("$ZodIPv6", (e, t) => {
		t.pattern ??= oN, Y.init(e, t), e._zod.check = (n) => {
			QN(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), RP = /*@__PURE__*/ q("$ZodCIDRv4", (e, t) => {
		t.pattern ??= sN, Y.init(e, t);
	}), zP = /*@__PURE__*/ q("$ZodCIDRv6", (e, t) => {
		t.pattern ??= cN, Y.init(e, t), e._zod.check = (n) => {
			$N(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), BP = /^[0-9a-zA-Z+/]*={0,2}$/, VP = /*@__PURE__*/ q("$ZodBase64", (e, t) => {
		t.pattern ??= BP, Y.init(e, t), e._zod.check = (n) => {
			eP(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), HP = /^[A-Za-z0-9_-]*$/, UP = /*@__PURE__*/ q("$ZodBase64URL", (e, t) => {
		t.pattern ??= HP, Y.init(e, t), e._zod.check = (n) => {
			tP(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), WP = /*@__PURE__*/ q("$ZodE164", (e, t) => {
		t.pattern ??= fN, Y.init(e, t);
	}), GP = /*@__PURE__*/ q("$ZodJWT", (e, t) => {
		Y.init(e, t), e._zod.check = (n) => {
			nP(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), KP = /*@__PURE__*/ q("$ZodNumber", (e, t) => {
		J.init(e, t), e._zod.pattern = gN, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = Number(n.value);
			} catch {}
			let i = n.value;
			if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
			let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
			return n.issues.push({
				expected: "number",
				code: "invalid_type",
				input: i,
				inst: e,
				...a ? { received: a } : {}
			}), n;
		};
	}), qP = /*@__PURE__*/ q("$ZodNumberFormat", (e, t) => {
		DN.init(e, t), KP.init(e, t);
	}), JP = /*@__PURE__*/ q("$ZodBoolean", (e, t) => {
		J.init(e, t), e._zod.pattern = _N, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = !!n.value;
			} catch {}
			let i = n.value;
			return typeof i == "boolean" || n.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input: i,
				inst: e
			}), n;
		};
	}), YP = /*@__PURE__*/ q("$ZodUnknown", (e, t) => {
		J.init(e, t), e._zod.parse = (e) => e;
	}), XP = /*@__PURE__*/ q("$ZodNever", (e, t) => {
		J.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), ZP = /*@__PURE__*/ q("$ZodArray", (e, t) => {
		J.init(e, t);
		let n = lM.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!Array.isArray(a)) return r.issues.push({
				expected: "array",
				code: "invalid_type",
				input: a,
				inst: e
			}), r;
			r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
			let o = [], s = i?.abortEarly;
			for (let e = 0; e < a.length; e++) {
				let n = a[e], c = t.element._zod.run({
					value: n,
					issues: []
				}, i);
				if (c instanceof Promise) o.push(c.then((t) => rP(t, r, e)));
				else if (rP(c, r, e), s && c.issues.length !== 0 && Ej(c)) break;
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), QP = [], $P = /*@__PURE__*/ q("$ZodObject", (e, t) => {
		J.init(e, t);
		let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
		if (r) {
			let e = () => {
				let n = { ...r };
				return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
			};
			e.raw = r, Object.defineProperty(t, "shape", { get: e });
		}
		let i = XA(() => aP(t));
		K(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || ej(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let a = uj, o = t.catchall, s, c = lM.memoizer;
		c?.attach(e), e._zod.parse = (t, n) => {
			s ??= i.value;
			let r = t.value;
			if (!a(r)) return t.issues.push({
				expected: "object",
				code: "invalid_type",
				input: r,
				inst: e
			}), t;
			t.value = c ? c.alloc(e, t, {}, n) : {};
			let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
			for (let e of s.allKeys) {
				if (d && t.issues.length !== f) {
					if (Ej(t, f)) break;
					f = t.issues.length;
				}
				if (e === "__proto__") continue;
				let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
					value: r[e],
					issues: []
				}, n);
				s instanceof Promise ? l.push(s.then((n) => iP(n, t, e, r, a, o))) : iP(s, t, e, r, a, o);
			}
			return o ? oP(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), eF = /*@__PURE__*/ q("$ZodObjectJIT", (e, t) => {
		$P.init(e, t);
		let n = e._zod.parse, r = XA(() => aP(t)), i = lM.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new BN(["payload", "ctx"], {
				shape: t,
				inst: e,
				memo: i,
				syms: a
			}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
			o.write("const input = payload.value;");
			let l = Object.create(null), u = 0;
			for (let e of n.allKeys) l[e] = `key_${u++}`;
			o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
			for (let e of n.allKeys) {
				if (e === "__proto__") continue;
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : cj(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
				if (o.write(`const ${n} = ${s(r)};`), f && p) {
					let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
					o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
				} else f ? (o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
      `), d === "defaulted" ? o.write(`newResult[${r}] = ${n}.value;`) : o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
			}
			return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
		}, o, s = uj, c = !lM.jitless, l = c && Kj.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? oP([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), tF = /*@__PURE__*/ q("$ZodUnion", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), K(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), K(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), K(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => QA(e.source)).join("|")})$`);
			}
		});
		let n = t.options.length === 1 ? t.options[0]._zod.run : null;
		e._zod.parse = (r, i) => {
			if (n) return n(r, i);
			let a = !1, o = [];
			for (let e of t.options) {
				let t = e._zod.run({
					value: r.value,
					issues: []
				}, i);
				if (t instanceof Promise) o.push(t), a = !0;
				else {
					if (t.issues.length === 0) return t;
					o.push(t);
				}
			}
			return a ? Promise.all(o).then((t) => sP(t, r, e, i)) : sP(o, r, e, i);
		};
	}), nF = /*@__PURE__*/ q("$ZodIntersection", (e, t) => {
		J.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => lP(e, t, n)) : lP(e, i, a);
		};
	}), rF = /*@__PURE__*/ q("$ZodEnum", (e, t) => {
		J.init(e, t);
		let n = qA(t.entries), r = new Set(n);
		e._zod.values = r, K(e, "pattern", (e) => {
			let t = qA(e.def.entries).filter((e) => qj.has(typeof e));
			return RegExp(t.length ? `^(${t.map((e) => pj(e.toString())).join("|")})$` : "^[^\\s\\S]$");
		}), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), iF = /*@__PURE__*/ q("$ZodTransform", (e, t) => {
		J.init(e, t), e._zod.optin = "optional", lM.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new cM(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new sM();
			return n.value = i, n;
		};
	}), aF = /*@__PURE__*/ q("$ZodOptional", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", K(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), K(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${QA(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => uP(e, t)) : uP(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), oF = /*@__PURE__*/ q("$ZodExactOptional", (e, t) => {
		aF.init(e, t), K(e, "values", (e) => e.def.innerType._zod.values), K(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), sF = /*@__PURE__*/ q("$ZodNullable", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin), K(e, "optout", (e) => e.def.innerType._zod.optout), K(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${QA(t.source)}|null)$`) : void 0;
		}), K(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), cF = /*@__PURE__*/ q("$ZodDefault", (e, t) => {
		J.init(e, t), e._zod.optin = "defaulted", K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => dP(e, t)) : dP(r, t);
		};
	}), lF = /*@__PURE__*/ q("$ZodPrefault", (e, t) => {
		J.init(e, t), e._zod.optin = "defaulted", K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), uF = /*@__PURE__*/ q("$ZodNonOptional", (e, t) => {
		J.init(e, t), K(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => fP(t, e)) : fP(i, e);
		};
	}), dF = /*@__PURE__*/ q("$ZodCatch", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), K(e, "optout", (e) => e.def.innerType._zod.optout), K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => pP(e, r, t, n)) : pP(e, r, t, n);
		};
	}), fF = /*@__PURE__*/ q("$ZodPipe", (e, t) => {
		J.init(e, t), K(e, "values", (e) => e.def.in._zod.values), K(e, "optin", (e) => e.def.in._zod.optin), K(e, "optout", (e) => e.def.out._zod.optout), K(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => mP(e, t.in, n)) : mP(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => mP(e, t.out, n)) : mP(r, t.out, n);
		};
	}), pF = /*@__PURE__*/ q("$ZodReadonly", (e, t) => {
		J.init(e, t), K(e, "propValues", (e) => e.def.innerType._zod.propValues), K(e, "values", (e) => e.def.innerType._zod.values), K(e, "optin", (e) => e.def.innerType?._zod?.optin), K(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(hP) : hP(r);
		};
	}), mF = /*@__PURE__*/ q("$ZodCustom", (e, t) => {
		xN.init(e, t), J.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => gP(t, n, r, e));
			gP(i, n, r, e);
		};
	});
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
function gF(e) {
	return typeof e == "object" && !!e;
}
function _F(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function vF(e, t, n) {
	let r = EF.get(e);
	if (r !== void 0) return r ? kF : DF;
	if (t.has(e)) return kF;
	t.add(e);
	let i = DF, a = (e) => {
		if (i !== kF && e?._zod) {
			let r = vF(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = DF;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? OF : o.value?._zod ? vF(o.value, t, n) : DF;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = tj(c);
			s(e ? o(e, !0) : OF), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? vF(r, t, !1) : OF);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), yF(e, i);
}
function yF(e, t) {
	return t !== OF && EF.set(e, t === kF), t;
}
function bF(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
function xF() {
	return MF;
}
function SF(e, t) {
	let n = e[wF]?.backEdges;
	return n !== void 0 && gF(t) && n.has(t);
}
var CF, wF, TF, EF, DF, OF, kF, AF, jF, MF, NF = g((() => {
	tM(), CF = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, wF = "~memo", TF = [], EF = /*@__PURE__*/ new WeakMap(), DF = 0, OF = 1, kF = 2, jF = [], MF = {
		alloc(e, t, n) {
			let r = AF;
			if (!r) return n;
			AF = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), jF.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && SF(n, e.value)) throw new CF();
					return t(e, n);
				};
				e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
			});
		},
		attach(e) {
			var t;
			let n, r = !1, i, a;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, o = (s, c) => {
					if (n === void 0) {
						let i = vF(e, /* @__PURE__ */ new Set(), !1);
						if (i === DF) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
						i === kF || r ? n = !0 : r = !0;
					}
					let l = s.value;
					if (!gF(l)) return t(s, c);
					let u = c[wF];
					u || (u = {
						buckets: /* @__PURE__ */ new WeakMap(),
						backEdges: void 0
					}, c[wF] = u);
					let d;
					i === c ? d = a : (d = bF(u, e), i = c, a = d);
					let f = d.get(l);
					if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(..._F(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
					AF = d;
					let p = jF.length, ee = t(s, c);
					AF = void 0;
					let m = jF.length > p ? jF.pop() : void 0;
					return ee instanceof Promise ? ee.then((e) => (m && (m.issues = e.issues.length ? _F(e.issues) : TF), e)) : (m && (m.issues = ee.issues.length ? _F(ee.issues) : TF), ee);
				};
				e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
			});
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
function PF() {
	return { localeError: FF() };
}
var FF, IF = g((() => {
	tM(), FF = () => {
		let e = {
			string: {
				unit: "characters",
				verb: "to have"
			},
			file: {
				unit: "bytes",
				verb: "to have"
			},
			array: {
				unit: "items",
				verb: "to have"
			},
			set: {
				unit: "items",
				verb: "to have"
			},
			map: {
				unit: "entries",
				verb: "to have"
			}
		};
		function t(t) {
			return e[t] ?? null;
		}
		let n = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			currency_code: "currency code",
			credit_card: "credit card number",
			iban: "IBAN",
			jwt: "JWT",
			template_literal: "input"
		}, r = { nan: "NaN" };
		function i(e, t) {
			return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
		}
		return (e) => {
			switch (e.code) {
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(Pj(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${hj(e.values[0])}` : `Invalid option: expected one of ${JA(e.values, "|")}`;
				case "too_big": {
					let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
					return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
				}
				case "too_small": {
					let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
					return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
				}
				case "invalid_format": {
					let t = e;
					return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
				}
				case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${JA(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
function LF() {
	return new zF();
}
var RF, zF, BF, VF = g((() => {
	zF = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
		}
		add(e, ...t) {
			let n = t[0];
			return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
		}
		clear() {
			return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
		}
		remove(e) {
			let t = this._map.get(e);
			return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
		}
		get(e) {
			let t = e._zod.parent;
			if (t) {
				let n = { ...this.get(t) ?? {} };
				delete n.id;
				let r = {
					...n,
					...this._map.get(e)
				};
				return Object.keys(r).length ? r : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	}, (RF = globalThis).__zod_globalRegistry ?? (RF.__zod_globalRegistry = LF()), BF = globalThis.__zod_globalRegistry;
})), HF = g((() => {}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function UF(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function WF(e, t) {
	return new e(UF({
		type: "string",
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function GF(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function KF(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qF(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function JF(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function YF(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function XF(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ZF(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function QF(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $F(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function eI(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tI(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nI(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rI(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function iI(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function aI(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function oI(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sI(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cI(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lI(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function uI(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dI(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fI(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pI(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mI(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hI(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gI(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _I(e, t) {
	return new e(UF({
		type: "number",
		checks: [],
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function vI(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yI(e, t) {
	return new e({
		type: "boolean",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function bI(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function xI(e, t) {
	return new e({
		type: "never",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function SI(e, t) {
	return new wN({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function CI(e, t) {
	return new wN({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function wI(e, t) {
	return new TN({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function TI(e, t) {
	return new TN({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function EI(e, t) {
	return new EN({
		check: "multiple_of",
		...G(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function DI(e, t) {
	return new ON({
		check: "max_length",
		...G(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function OI(e, t) {
	return new kN({
		check: "min_length",
		...G(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function kI(e, t) {
	return new AN({
		check: "length_equals",
		...G(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function AI(e, t) {
	return new MN({
		check: "string_format",
		format: "regex",
		...G(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function jI(e) {
	return new NN({
		check: "string_format",
		format: "lowercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function MI(e) {
	return new PN({
		check: "string_format",
		format: "uppercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function NI(e, t) {
	return new FN({
		check: "string_format",
		format: "includes",
		...G(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function PI(e, t) {
	return new IN({
		check: "string_format",
		format: "starts_with",
		...G(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function FI(e, t) {
	return new LN({
		check: "string_format",
		format: "ends_with",
		...G(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function II(e) {
	return new RN({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function LI(e) {
	return /* @__PURE__ */ II((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function RI() {
	return /* @__PURE__ */ II((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function zI() {
	return /* @__PURE__ */ II((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function BI() {
	return /* @__PURE__ */ II((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function VI() {
	return /* @__PURE__ */ II((e) => lj(e));
}
// @__NO_SIDE_EFFECTS__
function HI(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function UI(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function WI(e, t) {
	let n = /* @__PURE__ */ GI((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Fj(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Fj(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function GI(e, t) {
	let n = new xN({
		check: "custom",
		...G(t)
	});
	return n._zod.check = e, n;
}
var KI = g((() => {
	zN(), tM();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function qI(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && ej(e, t, n[t]);
	return e;
}
function JI(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? BF,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function YI(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function X(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, X(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && qI(o.schema, c), t.io === "input" && rL(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function XI(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function ZI(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${XI(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + XI(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		r.count > 1 && e.reused === "ref" && a(n);
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function QI(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		QI(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
function $I(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function eL(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!iL.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? $I(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			ej(n, r, e.length === 1 ? e[0] : eL(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = $I(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function tL(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of iL) if (t in e) return;
	let n = t.filter((e) => aL.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = eL(t);
	else {
		let e = n[0], i = aL.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => eL([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, qI(e, r));
}
function nL(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : qI(i, s), qI(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) QI(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) tL(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	qI(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, ej(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: sL(t, "input", e.processors),
					output: sL(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function rL(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return rL(r.element, n);
	if (r.type === "set") return rL(r.valueType, n);
	if (r.type === "lazy") return rL(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return rL(r.innerType, n);
	if (r.type === "intersection") return rL(r.left, n) || rL(r.right, n);
	if (r.type === "record" || r.type === "map") return rL(r.keyType, n) || rL(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : rL(r.in, n) || rL(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (rL(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (rL(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (rL(e, n)) return !0;
		return !!(r.rest && rL(r.rest, n));
	}
	return !1;
}
var iL, aL, oL, sL, cL = g((() => {
	VF(), tM(), iL = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), aL = ["oneOf", "anyOf"], oL = (e, t = {}) => (n) => {
		let r = JI({
			...n,
			processors: t
		});
		return X(e, r), ZI(r, e), nL(r, e);
	}, sL = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = JI({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return X(e, o), ZI(o, e), nL(o, e);
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
function lL(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) SL[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && fL(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && fL(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && pL(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && pL(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && hL(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && _L(t, i.mime);
	for (let e of i.patterns ?? []) gL(t, e);
	return t;
}
function uL(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? uL(t.out) : t.type === "catch" ? uL(t.innerType) : e._zod.optin;
}
function dL(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (YI(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), BL) : JSON.parse(o);
}
var fL, pL, mL, hL, gL, _L, vL, yL, bL, xL, SL, CL, wL, TL, EL, DL, OL, kL, AL, jL, ML, NL, PL, FL, IL, LL, RL, zL, BL, VL, HL, UL, WL, GL, KL, qL = g((() => {
	bN(), hF(), cL(), tM(), fL = (e, t, n) => {
		(e[t] === void 0 || n > e[t]) && (e[t] = n);
	}, pL = (e, t, n) => {
		(e[t] === void 0 || n < e[t]) && (e[t] = n);
	}, mL = (e, t) => {
		fL(e, "minimum", t), pL(e, "maximum", t);
	}, hL = (e, t) => {
		e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
	}, gL = (e, t) => {
		e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
	}, _L = (e, t) => {
		e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
	}, vL = (e, t) => {
		e.format = t, t.includes("int") && (e.isInt = !0);
	}, yL = (e, t) => fL(e, "minimum", t.minimum), bL = (e, t) => pL(e, "maximum", t.maximum), xL = (e) => (t, n) => {
		vL(t, n.format);
		let [r, i] = e[n.format];
		fL(t, "minimum", r), pL(t, "maximum", i);
	}, SL = {
		greater_than: (e, t) => fL(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
		less_than: (e, t) => pL(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
		multiple_of: (e, t) => hL(e, t.value),
		number_format: xL(Jj),
		bigint_format: xL(Yj),
		min_length: yL,
		max_length: bL,
		length_equals: (e, t) => mL(e, t.length),
		min_size: yL,
		max_size: bL,
		size_equals: (e, t) => mL(e, t.size),
		string_format: (e, t) => {
			vL(e, t.format), t.pattern && gL(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
		},
		mime_type: (e, t) => _L(e, t.mime)
	}, CL = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, wL = /* @__PURE__ */ new Map([[BP, lN], [HP, uN]]), TL = (e) => wL.get(e) ?? e, EL = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = lL(e);
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = CL[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c].map(TL);
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, DL = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = lL(e);
		i.type = u ? "integer" : "number";
		let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
			let n = /* @__PURE__ */ new Set();
			for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : YI(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
			let [a, ...o] = n;
			a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
		}
	}, OL = (e, t, n, r) => {
		n.type = "boolean";
	}, kL = (e, t, n, r) => {
		n.not = {};
	}, AL = (e, t, n, r) => {}, jL = (e, t, n, r) => {
		let i = e._zod.def, a = qA(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, ML = (e, t, n, r) => {
		YI(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, NL = (e, t, n, r) => {
		YI(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, PL = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = lL(e);
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = X(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, FL = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && YI(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) ej(i.properties, e, X(o[e], t, {
			...r,
			path: [
				...r.path,
				"properties",
				e
			]
		}));
		let s = [];
		for (let e of Object.keys(o)) {
			let n = a.shape[e];
			(t.io === "input" ? uL(n) === void 0 : n._zod.optout === void 0) && s.push(e);
		}
		s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = X(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, IL = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => X(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, LL = (e, t, n, r) => {
		let i = e._zod.def, a = X(i.left, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				0
			]
		}), o = X(i.right, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				1
			]
		}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
		n.allOf = c, t.intersections.push(c);
	}, RL = (e, t, n, r) => {
		let i = e._zod.def, a = X(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, zL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, BL = Symbol(), VL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = dL(i.defaultValue, e, t, n, r);
		o !== BL && (n.default = o);
	}, HL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = dL(i.defaultValue, e, t, n, r);
		o !== BL && (n._prefault = o);
	}, UL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			YI(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, WL = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		X(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, GL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, KL = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	};
})), JL = g((() => {
	uM(), VM(), xM(), hF(), NF(), zN(), UN(), tM(), bN(), IF(), VF(), VN(), HF(), KI(), cL(), qL(), cL();
})), YL = g((() => {
	JL();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
function XL(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var ZL, QL, $L, eR = g((() => {
	JL(), tM(), ZL = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), QL = (e, t) => {
		bM.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		ZL.has(n) || (ZL.add(n), XL(n, "format", (e) => (t) => hM(e, t)), XL(n, "flatten", (e) => (t) => mM(e, t)), XL(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, YA, 2);
		}), XL(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, YA, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, $L = /*@__PURE__*/ q("ZodError", QL, void 0, { Parent: Error });
})), tR, nR, rR, iR, aR, oR, sR, cR, lR, uR, dR, fR, pR = g((() => {
	JL(), eR(), tR = /* @__PURE__ */ TM($L), nR = /* @__PURE__ */ EM($L), rR = /* @__PURE__ */ DM($L), iR = /* @__PURE__ */ OM($L), aR = /* @__PURE__ */ NM($L), oR = /* @__PURE__ */ PM($L), sR = /* @__PURE__ */ FM($L), cR = /* @__PURE__ */ IM($L), lR = /* @__PURE__ */ LM($L), uR = /* @__PURE__ */ RM($L), dR = /* @__PURE__ */ zM($L), fR = /* @__PURE__ */ BM($L);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function mR() {
	lM.localeError || rM(PF());
}
function hR() {
	lM.memoizer || rM({ memoizer: xF() });
}
function Z(e) {
	return /* @__PURE__ */ WF(zR, e);
}
function gR(e) {
	return /* @__PURE__ */ _I(lz, e);
}
function _R(e) {
	return /* @__PURE__ */ vI(uz, e);
}
function vR(e) {
	return /* @__PURE__ */ yI(dz, e);
}
function yR() {
	return /* @__PURE__ */ bI(fz);
}
function bR(e) {
	return /* @__PURE__ */ xI(pz, e);
}
function xR(e, t) {
	return /* @__PURE__ */ HI(mz, e, t);
}
function SR(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...G(t)
	};
	return new hz(n);
}
function CR(e, t) {
	return new gz({
		type: "union",
		options: e,
		...G(t)
	});
}
function wR(e, t) {
	return new _z({
		type: "intersection",
		left: e,
		right: t
	});
}
function TR(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new vz({
		type: "enum",
		entries: n,
		...G(t)
	});
}
function ER(e) {
	return new yz({
		type: "transform",
		transform: e
	});
}
function DR(e) {
	return new bz({
		type: "optional",
		innerType: e
	});
}
function OR(e) {
	return new xz({
		type: "optional",
		innerType: e
	});
}
function kR(e) {
	return new Sz({
		type: "nullable",
		innerType: e
	});
}
function AR(e, t) {
	return new Cz({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : fj(t);
		}
	});
}
function jR(e, t) {
	return new wz({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : fj(t);
		}
	});
}
function MR(e, t) {
	return new Tz({
		type: "nonoptional",
		innerType: e,
		...G(t)
	});
}
function NR(e, t) {
	return new Ez({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Uj(t)
	});
}
function PR(e, t) {
	return new Dz({
		type: "pipe",
		in: e,
		out: t
	});
}
function FR(e) {
	return new Oz({
		type: "readonly",
		innerType: e
	});
}
function IR(e, t = {}) {
	return /* @__PURE__ */ UI(kz, e, t);
}
function LR(e, t) {
	return /* @__PURE__ */ WI(e, t);
}
var Q, RR, zR, $, BR, VR, HR, UR, WR, GR, KR, qR, JR, YR, XR, ZR, QR, $R, ez, tz, nz, rz, iz, az, oz, sz, cz, lz, uz, dz, fz, pz, mz, hz, gz, _z, vz, yz, bz, xz, Sz, Cz, wz, Tz, Ez, Dz, Oz, kz, Az = g((() => {
	JL(), qL(), cL(), IF(), YL(), pR(), Q = /*@__PURE__*/ q("ZodType", (e, t) => (mR(), J.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(sj(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return mj(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(IR(e, t));
		},
		superRefine(e, t) {
			return this.check(LR(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ II(e));
		},
		optional() {
			return DR(this);
		},
		exactOptional() {
			return OR(this);
		},
		nullable() {
			return kR(this);
		},
		nullish() {
			return DR(kR(this));
		},
		nonoptional(e) {
			return MR(this, e);
		},
		array() {
			return xR(this);
		},
		or(e) {
			return CR([this, e]);
		},
		and(e) {
			return wR(this, e);
		},
		transform(e) {
			return PR(this, ER(e));
		},
		default(e) {
			return AR(this, e);
		},
		prefault(e) {
			return jR(this, e);
		},
		catch(e) {
			return NR(this, e);
		},
		pipe(e) {
			return PR(this, e);
		},
		readonly() {
			return FR(this);
		},
		describe(e) {
			let t = this.clone();
			return BF.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return BF.get(this);
			let t = this.clone();
			return BF.add(t, e[0]), t;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(e, ...t) {
			return t.length === 0 ? e(this) : e(this, ...t);
		},
		get "~standard"() {
			return Rj(this, "~standard", {
				...GN(this),
				jsonSchema: {
					input: sL(this, "input"),
					output: sL(this, "output")
				}
			});
		},
		set "~standard"(e) {
			Lj(this, "~standard", e);
		},
		parse: function e(t, n) {
			return tR(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await nR(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return rR(this, e, t);
		},
		async safeParseAsync(e, t) {
			return iR(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Lj(this, "spa", e);
		},
		validate(e, t) {
			return jM(this, e, t);
		},
		validateAsync(e, t) {
			return MM(this, e, t);
		},
		encode: function e(t, n) {
			return aR(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return oR(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await sR(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await cR(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return lR(this, e, t);
		},
		safeDecode(e, t) {
			return uR(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return dR(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return fR(this, e, t);
		},
		toJSONSchema(e) {
			return oL(this, {})(e);
		},
		get description() {
			return BF.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), RR = /*@__PURE__*/ q("_ZodString", (e, t) => {
		vP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => EL(e, t, n, r);
	}, /*@__PURE__*/ zj({
		format: (e) => lL(e).format ?? null,
		minLength: (e) => lL(e).minimum ?? null,
		maxLength: (e) => lL(e).maximum ?? null
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ AI(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ NI(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ PI(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ FI(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ OI(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ DI(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ kI(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ OI(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ jI(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ MI(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ RI());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ LI(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ zI());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ BI());
		},
		slugify() {
			return this.check(/* @__PURE__ */ VI());
		}
	})), zR = /*@__PURE__*/ q("ZodString", (e, t) => {
		vP.init(e, t), RR.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ GF(WR, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ ZF(qR, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ fI(cz, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ QF(JR, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ KF(GR, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ qF(KR, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ JF(KR, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ YF(KR, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ XF(KR, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ $F(YR, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ eI(XR, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ tI(ZR, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ nI(QR, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ lI(az, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ uI(oz, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ rI($R, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ iI(ez, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ aI(tz, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ oI(nz, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ sI(rz, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ cI(iz, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ dI(sz, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ pI(BR, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ mI(VR, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ hI(HR, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ gI(UR, e));
		}
	}), $ = /*@__PURE__*/ q("ZodStringFormat", (e, t) => {
		Y.init(e, t), RR.init(e, t);
	}), BR = /*@__PURE__*/ q("ZodISODateTime", (e, t) => {
		jP.init(e, t), $.init(e, t);
	}), VR = /*@__PURE__*/ q("ZodISODate", (e, t) => {
		MP.init(e, t), $.init(e, t);
	}), HR = /*@__PURE__*/ q("ZodISOTime", (e, t) => {
		NP.init(e, t), $.init(e, t);
	}), UR = /*@__PURE__*/ q("ZodISODuration", (e, t) => {
		PP.init(e, t), $.init(e, t);
	}), WR = /*@__PURE__*/ q("ZodEmail", (e, t) => {
		xP.init(e, t), $.init(e, t);
	}), GR = /*@__PURE__*/ q("ZodGUID", (e, t) => {
		yP.init(e, t), $.init(e, t);
	}), KR = /*@__PURE__*/ q("ZodUUID", (e, t) => {
		bP.init(e, t), $.init(e, t);
	}), qR = /*@__PURE__*/ q("ZodURL", (e, t) => {
		CP.init(e, t), $.init(e, t);
	}), JR = /*@__PURE__*/ q("ZodEmoji", (e, t) => {
		wP.init(e, t), $.init(e, t);
	}), YR = /*@__PURE__*/ q("ZodNanoID", (e, t) => {
		TP.init(e, t), $.init(e, t);
	}), XR = /*@__PURE__*/ q("ZodCUID", (e, t) => {
		EP.init(e, t), $.init(e, t);
	}), ZR = /*@__PURE__*/ q("ZodCUID2", (e, t) => {
		DP.init(e, t), $.init(e, t);
	}), QR = /*@__PURE__*/ q("ZodULID", (e, t) => {
		OP.init(e, t), $.init(e, t);
	}), $R = /*@__PURE__*/ q("ZodXID", (e, t) => {
		kP.init(e, t), $.init(e, t);
	}), ez = /*@__PURE__*/ q("ZodKSUID", (e, t) => {
		AP.init(e, t), $.init(e, t);
	}), tz = /*@__PURE__*/ q("ZodIPv4", (e, t) => {
		FP.init(e, t), $.init(e, t);
	}), nz = /*@__PURE__*/ q("ZodIPv6", (e, t) => {
		LP.init(e, t), $.init(e, t);
	}), rz = /*@__PURE__*/ q("ZodCIDRv4", (e, t) => {
		RP.init(e, t), $.init(e, t);
	}), iz = /*@__PURE__*/ q("ZodCIDRv6", (e, t) => {
		zP.init(e, t), $.init(e, t);
	}), az = /*@__PURE__*/ q("ZodBase64", (e, t) => {
		VP.init(e, t), $.init(e, t);
	}), oz = /*@__PURE__*/ q("ZodBase64URL", (e, t) => {
		UP.init(e, t), $.init(e, t);
	}), sz = /*@__PURE__*/ q("ZodE164", (e, t) => {
		WP.init(e, t), $.init(e, t);
	}), cz = /*@__PURE__*/ q("ZodJWT", (e, t) => {
		GP.init(e, t), $.init(e, t);
	}), lz = /*@__PURE__*/ q("ZodNumber", (e, t) => {
		KP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => DL(e, t, n, r), e.isFinite = !0;
	}, /*@__PURE__*/ zj({
		minValue: (e) => {
			let { minimum: t, exclusiveMinimum: n } = lL(e);
			return Math.max(t ?? -Infinity, n ?? -Infinity);
		},
		maxValue: (e) => {
			let { maximum: t, exclusiveMaximum: n } = lL(e);
			return Math.min(t ?? Infinity, n ?? Infinity);
		},
		isInt: (e) => {
			let { isInt: t, multipleOf: n } = lL(e);
			return !!t || !!n?.some(Number.isSafeInteger);
		},
		format: (e) => lL(e).format ?? null
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ wI(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ TI(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ TI(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ SI(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ CI(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ CI(e, t));
		},
		int(e) {
			return this.check(_R(e));
		},
		safe(e) {
			return this.check(_R(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ wI(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ TI(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ SI(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ CI(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ EI(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ EI(e, t));
		},
		finite() {
			return this;
		}
	})), uz = /*@__PURE__*/ q("ZodNumberFormat", (e, t) => {
		qP.init(e, t), lz.init(e, t);
	}), dz = /*@__PURE__*/ q("ZodBoolean", (e, t) => {
		JP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => OL(e, t, n, r);
	}), fz = /*@__PURE__*/ q("ZodUnknown", (e, t) => {
		YP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => AL(e, t, n, r);
	}), pz = /*@__PURE__*/ q("ZodNever", (e, t) => {
		XP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => kL(e, t, n, r);
	}), mz = /*@__PURE__*/ q("ZodArray", (e, t) => {
		hR(), ZP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => PL(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ OI(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ OI(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ DI(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ kI(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), hz = /*@__PURE__*/ q("ZodObject", (e, t) => {
		hR(), eF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => FL(e, t, n, r), Hj(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return TR(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone(sj(this._zod.def, { catchall: e }));
		},
		passthrough() {
			return this.clone(sj(this._zod.def, { catchall: yR() }));
		},
		loose() {
			return this.clone(sj(this._zod.def, { catchall: yR() }));
		},
		strict() {
			return this.clone(sj(this._zod.def, { catchall: bR() }));
		},
		strip() {
			return this.clone(sj(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return bj(this, e);
		},
		safeExtend(e) {
			return Sj(this, e);
		},
		merge(e) {
			return Cj(this, e);
		},
		pick(e) {
			return _j(this, e);
		},
		omit(e) {
			return yj(this, e);
		},
		partial(...e) {
			return wj(bz, this, e[0]);
		},
		exactPartial(...e) {
			return wj(xz, this, e[0], "exactPartial");
		},
		required(...e) {
			return Tj(Tz, this, e[0]);
		}
	}), gz = /*@__PURE__*/ q("ZodUnion", (e, t) => {
		tF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => IL(e, t, n, r), e.options = t.options;
	}), _z = /*@__PURE__*/ q("ZodIntersection", (e, t) => {
		nF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => LL(e, t, n, r);
	}), vz = /*@__PURE__*/ q("ZodEnum", (e, t) => {
		rF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => jL(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new vz({
				...t,
				checks: [],
				...G(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new vz({
				...t,
				checks: [],
				...G(r),
				entries: i
			});
		};
	}), yz = /*@__PURE__*/ q("ZodTransform", (e, t) => {
		hR(), iF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => NL(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new cM(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(Fj(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(Fj(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), bz = /*@__PURE__*/ q("ZodOptional", (e, t) => {
		aF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => KL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), xz = /*@__PURE__*/ q("ZodExactOptional", (e, t) => {
		oF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => KL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Sz = /*@__PURE__*/ q("ZodNullable", (e, t) => {
		sF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => RL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Cz = /*@__PURE__*/ q("ZodDefault", (e, t) => {
		cF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => VL(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), wz = /*@__PURE__*/ q("ZodPrefault", (e, t) => {
		lF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => HL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Tz = /*@__PURE__*/ q("ZodNonOptional", (e, t) => {
		uF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => zL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Ez = /*@__PURE__*/ q("ZodCatch", (e, t) => {
		dF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => UL(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), Dz = /*@__PURE__*/ q("ZodPipe", (e, t) => {
		fF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => WL(e, t, n, r), e.in = t.in, e.out = t.out;
	}), Oz = /*@__PURE__*/ q("ZodReadonly", (e, t) => {
		pF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => GL(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), kz = /*@__PURE__*/ q("ZodCustom", (e, t) => {
		mF.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => ML(e, t, n, r);
	});
})), jz = g((() => {
	JL();
})), Mz = g((() => {
	JL(), Az(), YL(), eR(), pR(), jz(), qL(), VF(), tM(), YL(), Az(), hF(), IF();
})), Nz = g((() => {
	Mz(), Mz();
})), Pz, Fz, Iz, Lz, Rz, zz, Bz, Vz, Hz, Uz, Wz, Gz, Kz, qz, Jz, Yz, Xz = g((() => {
	KA(), Nz(), Pz = "/x/intentic.deployments", Fz = TR([
		"running",
		"deploying",
		"stopped",
		"unhealthy",
		"unknown"
	]), Iz = TR(["deployment", "stack"]), Lz = SR({
		name: Z(),
		image: Z(),
		updateAvailable: vR()
	}), Rz = SR({
		kind: Iz,
		id: Z(),
		name: Z(),
		state: Fz,
		status: Z().optional(),
		server: Z().optional(),
		image: Z().optional(),
		updateAvailable: vR(),
		services: xR(Lz),
		url: Z()
	}), zz = TR([
		"ok",
		"unreachable",
		"disabled"
	]), Bz = SR({
		id: Z(),
		name: Z(),
		state: zz,
		cpuPercent: gR().optional(),
		memPercent: gR().optional(),
		diskPercent: gR().optional(),
		url: Z()
	}), Vz = SR({
		id: Z(),
		type: Z(),
		level: TR([
			"ok",
			"warning",
			"critical"
		]),
		resolved: vR(),
		ts: gR(),
		resource: Z().optional(),
		server: Z().optional(),
		from: Z().optional(),
		to: Z().optional()
	}), Hz = SR({
		username: Z(),
		admin: vR()
	}), Uz = SR({
		repo: Z(),
		projectName: Z(),
		composePath: Z(),
		linkedStack: Z().optional(),
		suggestions: xR(Z())
	}), SR({
		capability: Z(),
		repo: Z(),
		stack: Z()
	}), Wz = SR({
		komodoUrl: Z(),
		reachable: vR(),
		unreachableReason: Z().optional(),
		viewer: Hz.optional(),
		repos: xR(Uz).default([]),
		resources: xR(Rz),
		servers: xR(Bz),
		alerts: xR(Vz),
		seenAt: gR().optional()
	}), SR({ capability: Z() }), Gz = TR([
		"deploy",
		"restart",
		"start",
		"stop",
		"pull"
	]), SR({
		capability: Z(),
		kind: Iz,
		id: Z(),
		action: Gz
	}), Kz = SR({
		capability: Z(),
		kind: Iz,
		id: Z()
	}), Kz.extend({ pick: Dd }), qz = SR({
		stdout: Z(),
		stderr: Z()
	}), Jz = SR({ conversationId: Z() }), Yz = SR({ seenAt: gR() });
})), Zz, Qz, $z, eB, tB, nB, rB, iB, aB, oB, sB, cB, lB, uB, dB = g((() => {
	Zz = /* @__PURE__ */ new Set([
		"exited",
		"dead",
		"restarting",
		"unhealthy"
	]), Qz = /* @__PURE__ */ new Set([
		"ServerUnreachable",
		"SwarmUnhealthy",
		"BuildFailed",
		"RepoBuildFailed",
		"ProcedureFailed",
		"ActionFailed"
	]), $z = /* @__PURE__ */ new Set([
		"ServerCpu",
		"ServerMem",
		"ServerDisk"
	]), eB = /* @__PURE__ */ new Set([
		"DeploymentImageUpdateAvailable",
		"StackImageUpdateAvailable",
		"ResourceSyncPendingUpdates"
	]), tB = /* @__PURE__ */ new Set(["ContainerStateChange", "StackStateChange"]), nB = (e) => e.server === void 0 ? "" : ` on ${e.server}`, rB = (e) => e.resource ?? e.server ?? "something", iB = (e) => {
		if (e.type === "ServerUnreachable") return `${rB(e)} is unreachable`;
		if (tB.has(e.type)) {
			let t = e.from === void 0 ? "" : `${e.from} → `;
			return `${rB(e)} ${t}${e.to ?? "changed state"}${nB(e)}`;
		}
		return eB.has(e.type) ? `${rB(e)} has a newer image${nB(e)}` : Qz.has(e.type) ? `${rB(e)} failed${nB(e)}` : $z.has(e.type) ? `${rB(e)} is high on ${e.type.replace("Server", "").toLowerCase()}` : `${rB(e)}: ${e.type}${nB(e)}`;
	}, aB = (e) => tB.has(e.type) ? e.to !== void 0 && Zz.has(e.to) ? "danger" : void 0 : Qz.has(e.type) ? "danger" : $z.has(e.type) ? "warning" : eB.has(e.type) ? "info" : void 0, oB = (e) => e.filter((e) => !e.resolved).flatMap((e) => {
		let t = aB(e);
		return t === void 0 ? [] : [{
			alert: e,
			tone: t,
			summary: iB(e)
		}];
	}).toSorted((e, t) => t.alert.ts - e.alert.ts), sB = (e, t) => e.filter((e) => e.alert.ts > (t ?? 0)), cB = {
		danger: 0,
		warning: 1,
		info: 2
	}, lB = (e) => {
		let t = e.reduce((e, t) => e === void 0 || cB[t.tone] < cB[e] ? t.tone : e, void 0);
		return t === void 0 ? [] : e.filter((e) => e.tone === t);
	}, uB = (e) => {
		let [t] = e;
		if (e.length === 1 && t !== void 0) return t.summary;
		let n = e[0]?.tone === "info" ? "updates available" : "needing you";
		return `${e.length} ${n}`;
	};
})), fB, pB, mB, hB, gB, _B, vB, yB, bB = g((() => {
	Xz(), dB(), Ne(), fB = n(() => []), {state: pB, start: mB, refresh: hB} = t({
		host: Me,
		everyMs: 6e4,
		immediate: !1,
		initial: () => /* @__PURE__ */ new Map(),
		read: async (e, t) => {
			let n = new Map(t);
			for (let t of fB.value) try {
				n.set(t, Wz.parse(await e.sandbox.json(`${Pz}/komodo/${t}/overview`)));
			} catch {}
			return n;
		}
	}), gB = (e) => {
		let t = e.filter((e) => !fB.value.includes(e));
		fB.value = e, t.length > 0 && hB();
	}, _B = (e) => {
		let t = e.resources.filter((e) => e.state === "deploying").length;
		return t === 0 ? void 0 : `${t} deploying`;
	}, vB = (e) => {
		let t = pB.value.get(e);
		if (t === void 0) return;
		if (!t.reachable) return t.seenAt === void 0 ? {
			mark: "exclamation-circle",
			tone: "warning",
			tooltip: "can't reach Komodo"
		} : void 0;
		let n = _B(t), r = lB(sB(oB(t.alerts), t.seenAt));
		return r.length === 0 ? n === void 0 ? void 0 : { running: n } : {
			count: r.length,
			tone: r[0]?.tone ?? "info",
			tooltip: uB(r),
			...n === void 0 ? {} : { running: n }
		};
	}, yB = async (e) => {
		try {
			let t = Me();
			if (!t.sandbox.reachable()) return;
			let { seenAt: n } = Yz.parse(await t.sandbox.json(`${Pz}/komodo/${e}/seen`, { method: "POST" })), r = pB.value.get(e);
			r !== void 0 && (pB.value = new Map(pB.value).set(e, {
				...r,
				seenAt: n
			}));
		} catch {}
	};
})), xB, SB, CB, wB, TB = g((() => {
	xB = {
		role: "status",
		"aria-busy": "true",
		"aria-label": "Loading deployments"
	}, SB = { class: "min-w-0 flex-1" }, CB = { class: "flex h-5 items-center gap-2" }, wB = /*@__PURE__*/ d({
		__name: "DeploymentsSkeleton",
		setup(e) {
			let t = [
				{ name: "w-32" },
				{ name: "w-44" },
				{ name: "w-24" },
				{ name: "w-40" }
			];
			return (e, n) => (m(), s("div", xB, [u(h(ye), null, {
				label: oe(() => [...n[0] ||= [c("span", { class: "flex h-4 items-center gap-3" }, [
					c("span", { class: "skeleton h-3 w-28" }),
					c("span", { class: "skeleton h-3.5 w-12 rounded-full" }),
					c("span", { class: "skeleton h-1.5 w-12 rounded-full" }),
					c("span", { class: "skeleton h-1.5 w-12 rounded-full" })
				], -1)]]),
				default: oe(() => [(m(), s(r, null, ne(t, (e, t) => c("div", {
					key: t,
					class: "flex w-full items-center gap-3 border-l-4 border-line px-4 py-3"
				}, [
					n[3] ||= c("span", { class: "skeleton h-4 w-4 shrink-0 rounded-full" }, null, -1),
					c("div", SB, [c("div", CB, [c("span", { class: f(["skeleton h-3.5 max-w-full", e.name]) }, null, 2), n[1] ||= c("span", { class: "skeleton h-4 w-10 rounded" }, null, -1)]), n[2] ||= c("div", { class: "mt-0.5 flex h-4 items-center gap-2" }, [c("span", { class: "skeleton h-2.5 w-20" }), c("span", { class: "skeleton h-2.5 w-28" })], -1)]),
					n[4] ||= c("div", { class: "flex shrink-0 items-center gap-1" }, [
						c("span", { class: "skeleton h-6 w-16 rounded-md" }),
						c("span", { class: "skeleton h-6 w-14 rounded-md" }),
						c("span", { class: "skeleton h-6 w-6 rounded-md" })
					], -1)
				])), 64))]),
				_: 1
			})]));
		}
	});
})), EB, DB = g((() => {
	TB(), TB(), EB = wB;
})), OB, kB, AB, jB, MB, NB, PB, FB, IB, LB, RB = g((() => {
	OB = { class: "px-4 py-3" }, kB = { class: "flex flex-wrap items-center gap-x-3 gap-y-2" }, AB = { class: "flex min-w-0 items-center gap-2.5" }, jB = { class: "min-w-0" }, MB = { class: "block truncate text-sm font-medium text-content" }, NB = { class: "block truncate font-mono text-2xs text-subtle" }, PB = { class: "ml-auto flex flex-wrap items-center gap-2" }, FB = { class: "text-2xs text-muted" }, IB = { class: "font-medium text-content" }, LB = /*@__PURE__*/ d({
		__name: "RepoLinkRow",
		props: {
			link: {},
			stacks: {},
			busy: { type: Boolean },
			error: {}
		},
		emits: ["link"],
		setup(e, { emit: t }) {
			let n = e, d = t, f = te(!1), p = te(n.link.linkedStack), ee = i(() => n.stacks.map((e) => ({
				value: e,
				label: e
			}))), ne = i(() => n.link.suggestions[0]), ae = (e) => {
				e !== void 0 && (f.value = !1, d("link", n.link.repo, e));
			};
			return (t, n) => {
				let i = re("tooltip");
				return m(), s("div", OB, [c("div", kB, [c("span", AB, [u(h(fe), {
					name: "folder",
					class: "shrink-0 text-muted"
				}), c("span", jB, [c("span", MB, ie(e.link.repo), 1), se((m(), s("span", NB, [l(ie(e.link.projectName), 1)])), [[
					i,
					e.link.composePath,
					void 0,
					{ top: !0 }
				]])])]), c("span", PB, [e.link.linkedStack !== void 0 && !f.value ? (m(), s(r, { key: 0 }, [
					u(h(be), {
						variant: "success",
						size: "xs",
						dot: "",
						label: e.link.linkedStack
					}, null, 8, ["label"]),
					u(h(le), {
						label: "Change",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[0] ||= (e) => f.value = !0
					}, null, 8, ["disabled"]),
					u(h(le), {
						label: "Unlink",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[1] ||= (t) => d("link", e.link.repo, "")
					}, null, 8, ["disabled"])
				], 64)) : f.value ? (m(), s(r, { key: 2 }, [u(h(_e), {
					modelValue: p.value,
					"onUpdate:modelValue": [n[5] ||= (e) => p.value = e, ae],
					options: ee.value,
					disabled: e.busy,
					placeholder: "Choose a stack",
					"aria-label": "Komodo stack",
					class: "text-xs"
				}, null, 8, [
					"modelValue",
					"options",
					"disabled"
				]), u(h(le), {
					label: "Cancel",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy,
					onClick: n[6] ||= (e) => f.value = !1
				}, null, 8, ["disabled"])], 64)) : (m(), s(r, { key: 1 }, [ne.value === void 0 ? (m(), s(r, { key: 1 }, [n[8] ||= c("span", { class: "text-2xs text-subtle" }, "no stack matches this name", -1), u(h(le), {
					label: "Choose a stack",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy || e.stacks.length === 0,
					onClick: n[4] ||= (e) => f.value = !0
				}, null, 8, ["disabled"])], 64)) : (m(), s(r, { key: 0 }, [
					c("span", FB, [n[7] ||= l(" looks like ", -1), c("span", IB, ie(ne.value), 1)]),
					u(h(le), {
						label: "Link",
						size: "small",
						disabled: e.busy,
						onClick: n[2] ||= (t) => d("link", e.link.repo, ne.value)
					}, null, 8, ["disabled"]),
					u(h(le), {
						label: "Pick another",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[3] ||= (e) => f.value = !0
					}, null, 8, ["disabled"])
				], 64))], 64))])]), e.error ? (m(), a(h(pe), {
					key: 0,
					of: h(Se)(e.error),
					class: "mt-2"
				}, null, 8, ["of"])) : o("", !0)]);
			};
		}
	});
})), zB, BB = g((() => {
	RB(), RB(), zB = LB;
})), VB, HB, UB, WB, GB, KB = g((() => {
	VB = {
		running: {
			icon: "check-circle",
			spin: !1,
			label: "running",
			variant: "success",
			text: "text-success",
			dot: "bg-success",
			rowBorder: "border-l-success"
		},
		deploying: {
			icon: "spinner",
			spin: !0,
			label: "deploying",
			variant: "info",
			text: "text-info",
			dot: "bg-info",
			rowBorder: "border-l-info"
		},
		unhealthy: {
			icon: "exclamation-circle",
			spin: !1,
			label: "unhealthy",
			variant: "danger",
			text: "text-danger",
			dot: "bg-danger",
			rowBorder: "border-l-danger"
		},
		stopped: {
			icon: "stop",
			spin: !1,
			label: "stopped",
			variant: "neutral",
			text: "text-subtle",
			dot: "bg-subtle",
			rowBorder: "border-l-subtle/40"
		},
		unknown: {
			icon: "question-circle",
			spin: !1,
			label: "unknown",
			variant: "neutral",
			text: "text-subtle",
			dot: "bg-subtle",
			rowBorder: "border-l-subtle/40"
		}
	}, HB = {
		ok: {
			icon: "check-circle",
			spin: !1,
			label: "ok",
			variant: "success",
			text: "text-success",
			dot: "bg-success",
			rowBorder: "border-l-success"
		},
		unreachable: {
			icon: "exclamation-circle",
			spin: !1,
			label: "unreachable",
			variant: "danger",
			text: "text-danger",
			dot: "bg-danger",
			rowBorder: "border-l-danger"
		},
		disabled: {
			icon: "stop",
			spin: !1,
			label: "disabled",
			variant: "neutral",
			text: "text-subtle",
			dot: "bg-subtle",
			rowBorder: "border-l-subtle/40"
		}
	}, UB = {
		danger: {
			text: "text-danger",
			dot: "bg-danger",
			variant: "danger",
			panel: "border-danger/20 bg-danger/5"
		},
		warning: {
			text: "text-warning",
			dot: "bg-warning",
			variant: "warning",
			panel: "border-warning/20 bg-warning/5"
		},
		info: {
			text: "text-info",
			dot: "bg-info",
			variant: "info",
			panel: "border-info/20 bg-info/5"
		}
	}, WB = (e) => e >= 90 ? "bg-danger" : e >= 75 ? "bg-warning" : "bg-success", GB = (e) => e.split("/").at(-1) ?? e;
})), qB, JB, YB, XB, ZB, QB, $B, eV, tV, nV, rV, iV, aV, oV, sV, cV, lV, uV = g((() => {
	Ne(), KB(), qB = { class: "flex flex-wrap items-center gap-x-2 gap-y-1 font-normal" }, JB = { class: "truncate text-sm font-medium text-content" }, YB = {
		key: 0,
		class: "shrink-0 rounded border border-line px-2.5 py-1 text-2xs font-medium text-subtle"
	}, XB = { class: "flex flex-wrap items-center gap-x-2 gap-y-0.5 text-2xs text-subtle" }, ZB = { class: "truncate" }, QB = {
		key: 0,
		class: "truncate font-mono"
	}, $B = { class: "flex shrink-0 items-center gap-1" }, eV = ["href"], tV = {
		key: 1,
		class: "@container mb-3"
	}, nV = { class: "grid gap-x-6 gap-y-1 @lg:grid-cols-2" }, rV = { class: "shrink-0 font-medium text-content" }, iV = { class: "truncate font-mono text-subtle" }, aV = { class: "mb-3 flex flex-wrap items-center gap-2" }, oV = {
		key: 2,
		class: "flex flex-col gap-1.5",
		role: "status",
		"aria-busy": "true",
		"aria-label": "Reading logs"
	}, sV = { class: "flex flex-col gap-1.5 rounded-md border border-line bg-canvas px-3 py-2.5" }, cV = {
		key: 4,
		class: "text-2xs text-subtle"
	}, lV = /*@__PURE__*/ d({
		__name: "ResourceRow",
		props: {
			resource: {},
			busy: { type: Boolean },
			logs: {},
			logsPending: { type: Boolean },
			error: {}
		},
		emits: [
			"act",
			"logs",
			"fix"
		],
		setup(e, { emit: t }) {
			let n = e, d = t, p = Te(() => Me().models, "deployment-fix"), ee = () => {
				d("fix", n.resource, p.overridden.value ? p.model.value : void 0), p.clear();
			}, ae = i(() => VB[n.resource.state]), me = te(!1), he = () => {
				me.value = !me.value, me.value && n.logs === void 0 && d("logs", n.resource);
			}, ge = i(() => {
				if (n.resource.state !== "deploying") return n.resource.updateAvailable ? {
					action: "pull",
					label: "Update"
				} : {
					action: "deploy",
					label: "Redeploy"
				};
			}), _e = i(() => n.resource.state === "running" || n.resource.state === "unhealthy" ? {
				action: "restart",
				label: "Restart"
			} : n.resource.state === "stopped" ? {
				action: "start",
				label: "Start"
			} : void 0), ve = [
				"w-11/12",
				"w-3/5",
				"w-3/4",
				"w-2/5",
				"w-5/6",
				"w-1/2"
			], ye = i(() => {
				let e = n.logs;
				return e === void 0 ? "" : [e.stdout, e.stderr].filter((e) => e.trim() !== "").join("\n");
			});
			return (t, n) => {
				let i = re("tooltip");
				return m(), a(h(de), {
					class: f(["border-l-4", ae.value.rowBorder]),
					density: "comfortable",
					body: "drawer",
					open: me.value,
					"onUpdate:open": he
				}, {
					lead: oe(({ iconClass: e }) => [u(h(fe), {
						name: ae.value.icon,
						spin: ae.value.spin,
						class: f(["shrink-0", [e, ae.value.text]])
					}, null, 8, [
						"name",
						"spin",
						"class"
					])]),
					title: oe(() => [c("span", qB, [
						c("span", JB, ie(e.resource.name), 1),
						e.resource.kind === "stack" ? (m(), s("span", YB, " stack ")) : o("", !0),
						e.resource.updateAvailable ? (m(), a(h(be), {
							key: 1,
							variant: "info",
							size: "xs",
							label: "new image",
							class: "shrink-0"
						})) : o("", !0)
					])]),
					description: oe(() => [c("span", XB, [c("span", ZB, ie(e.resource.status ?? ae.value.label), 1), e.resource.image ? se((m(), s("span", QB, [l(ie(h(GB)(e.resource.image)), 1)])), [[
						i,
						e.resource.image,
						void 0,
						{ top: !0 }
					]]) : o("", !0)])]),
					control: oe(() => [c("div", $B, [
						ge.value ? (m(), a(h(le), {
							key: 0,
							label: ge.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							loading: e.busy,
							disabled: e.busy,
							onClick: n[0] ||= (t) => d("act", e.resource, ge.value.action)
						}, null, 8, [
							"label",
							"loading",
							"disabled"
						])) : o("", !0),
						_e.value ? (m(), a(h(le), {
							key: 1,
							label: _e.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							disabled: e.busy,
							onClick: n[1] ||= (t) => d("act", e.resource, _e.value.action)
						}, null, 8, ["label", "disabled"])) : o("", !0),
						se((m(), s("a", {
							href: e.resource.url,
							target: "_blank",
							rel: "noopener",
							class: f(h(we).iconButton())
						}, [u(h(fe), {
							name: "arrow-up-right",
							class: "text-xs"
						})], 10, eV)), [[
							i,
							"Open in Komodo",
							void 0,
							{ top: !0 }
						]])
					])]),
					below: oe(() => [
						e.error ? (m(), a(h(pe), {
							key: 0,
							of: h(Se)(e.error),
							class: "mb-3"
						}, null, 8, ["of"])) : o("", !0),
						e.resource.services.length > 0 ? (m(), s("div", tV, [c("div", { class: f(h(we).sectionLabel("mb-1.5 text-2xs")) }, "Services", 2), c("div", nV, [(m(!0), s(r, null, ne(e.resource.services, (e) => (m(), s("div", {
							key: e.name,
							class: "flex min-w-0 items-baseline gap-2 text-2xs"
						}, [
							c("span", rV, ie(e.name), 1),
							se((m(), s("span", iV, [l(ie(h(GB)(e.image)), 1)])), [[
								i,
								e.image,
								void 0,
								{ top: !0 }
							]]),
							e.updateAvailable ? se((m(), a(h(fe), {
								key: 0,
								name: "arrow-circle-up",
								class: "shrink-0 text-info"
							}, null, 512)), [[
								i,
								"A newer image exists",
								void 0,
								{ top: !0 }
							]]) : o("", !0)
						]))), 128))])])) : o("", !0),
						c("div", aV, [
							u(h(ce), {
								label: "Ask the agent to fix",
								icon: "sparkles",
								picker: h(p),
								loading: e.busy,
								disabled: e.busy,
								onRun: ee
							}, null, 8, [
								"picker",
								"loading",
								"disabled"
							]),
							e.resource.state === "stopped" ? o("", !0) : (m(), a(h(le), {
								key: 0,
								label: "Stop",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.busy,
								onClick: n[2] ||= (t) => d("act", e.resource, "stop")
							}, null, 8, ["disabled"])),
							u(h(le), {
								label: "Refresh logs",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.logsPending,
								onClick: n[3] ||= (t) => d("logs", e.resource)
							}, null, 8, ["disabled"])
						]),
						e.logsPending && ye.value === "" ? (m(), s("div", oV, [n[4] ||= c("span", { class: "skeleton h-2.5 w-24" }, null, -1), c("div", sV, [(m(), s(r, null, ne(ve, (e, t) => c("span", {
							key: t,
							class: f(["skeleton h-2.5", e])
						}, null, 2)), 64))])])) : ye.value === "" ? (m(), s("div", cV, "No log output.")) : (m(), a(h(ue), {
							key: 3,
							code: ye.value,
							lang: "log",
							label: "Container log",
							"scroll-lines": 14,
							"scroll-bottom": ""
						}, null, 8, ["code"]))
					]),
					_: 1
				}, 8, ["class", "open"]);
			};
		}
	});
})), dV, fV = g((() => {
	uV(), uV(), dV = lV;
})), pV, mV, hV, gV, _V, vV, yV = g((() => {
	KB(), pV = { class: "flex flex-wrap items-center gap-x-3 gap-y-1.5" }, mV = { class: "text-2xs text-subtle" }, hV = { class: "h-1.5 w-12 overflow-hidden rounded-full bg-line" }, gV = { class: "text-2xs text-subtle" }, _V = ["href"], vV = /*@__PURE__*/ d({
		__name: "ServerMeta",
		props: { server: {} },
		setup(e) {
			let t = i(() => HB[e.server.state]), n = i(() => [
				{
					label: "cpu",
					value: e.server.cpuPercent
				},
				{
					label: "mem",
					value: e.server.memPercent
				},
				{
					label: "disk",
					value: e.server.diskPercent
				}
			].flatMap((e) => e.value === void 0 ? [] : [{
				label: e.label,
				value: e.value
			}]));
			return (i, a) => (m(), s("div", pV, [
				u(h(be), {
					variant: t.value.variant,
					label: t.value.label,
					size: "xs",
					dot: ""
				}, null, 8, ["variant", "label"]),
				(m(!0), s(r, null, ne(n.value, (e) => (m(), s("span", {
					key: e.label,
					class: "flex items-center gap-1.5"
				}, [
					c("span", mV, ie(e.label), 1),
					c("span", hV, [c("span", {
						class: f(["block h-full rounded-full", h(WB)(e.value)]),
						style: p({ width: `${e.value}%` })
					}, null, 6)]),
					c("span", gV, ie(e.value) + "%", 1)
				]))), 128)),
				c("a", {
					href: e.server.url,
					target: "_blank",
					rel: "noopener",
					class: "flex items-center gap-1 text-2xs text-subtle hover:text-link"
				}, [a[0] ||= l(" Komodo ", -1), u(h(fe), { name: "arrow-up-right" })], 8, _V)
			]));
		}
	});
})), bV, xV = g((() => {
	yV(), yV(), bV = vV;
})), SV, CV, wV, TV, EV, DV = g((() => {
	Ne(), KB(), SV = { class: "flex flex-col gap-1" }, CV = { class: "flex items-start gap-2" }, wV = { class: "min-w-0 flex-1 text-sm text-content" }, TV = { class: "whitespace-nowrap text-2xs text-subtle" }, EV = /*@__PURE__*/ d({
		__name: "IncidentRow",
		props: {
			incident: {},
			resource: {},
			failure: {}
		},
		emits: ["fix"],
		setup(e, { emit: t }) {
			let n = t, r = Te(() => Me().models, "deployment-fix"), i = () => {
				e.resource !== void 0 && (n("fix", e.resource, r.overridden.value ? r.model.value : void 0), r.clear());
			};
			return (t, n) => (m(), s("div", SV, [c("div", CV, [
				c("span", { class: f(["mt-1.5 h-2 w-2 shrink-0 rounded-full", h(UB)[e.incident.tone].dot]) }, null, 2),
				c("span", wV, [l(ie(e.incident.summary) + " ", 1), c("span", TV, ie(h(Ce)(e.incident.alert.ts)), 1)]),
				e.resource ? (m(), a(h(ce), {
					key: 0,
					label: "Ask the agent",
					icon: "sparkles",
					class: "-my-1 shrink-0",
					severity: "secondary",
					text: "",
					picker: h(r),
					onRun: i
				}, null, 8, ["picker"])) : o("", !0)
			]), e.failure ? (m(), a(h(pe), {
				key: 0,
				of: h(Se)(e.failure)
			}, null, 8, ["of"])) : o("", !0)]));
		}
	});
})), OV, kV = g((() => {
	DV(), DV(), OV = EV;
}));
//#endregion
//#region src/useDeploymentBoard.ts
function AV(e) {
	let t = Me(), n = Oe(), r = i(() => t.sandbox.key("komodo-overview", e.value)), a = i(() => t.sandbox.reachable()), o = De({
		queryKey: r,
		queryFn: async () => Wz.parse(await t.sandbox.json(`${Pz}/komodo/${e.value}/overview`)),
		enabled: a,
		refetchInterval: jV
	}), s = () => n.invalidateQueries({ queryKey: r.value }), c = Ee({
		mutationFn: (n) => t.sandbox.json(`${Pz}/komodo/${e.value}/action`, MV({
			kind: n.resource.kind,
			id: n.resource.id,
			action: n.action
		})),
		onSuccess: s
	}), l = Ee({
		mutationFn: (n) => t.sandbox.json(`${Pz}/komodo/${e.value}/link`, MV(n)),
		onSuccess: s
	}), u = Ee({ mutationFn: async (n) => qz.parse(await t.sandbox.json(`${Pz}/komodo/${e.value}/logs`, MV({
		kind: n.kind,
		id: n.id
	}))) }), d = Ee({ mutationFn: async ({ resource: n, pick: r }) => Jz.parse(await t.sandbox.json(`${Pz}/komodo/${e.value}/fix`, MV({
		kind: n.kind,
		id: n.id,
		...r === void 0 ? {} : { pick: Od(r) }
	}))) });
	return {
		board: i(() => o.data.value),
		error: i(() => o.error.value?.message),
		isPending: o.isPending,
		act: c,
		link: l,
		logs: u,
		fix: d,
		refetch: o.refetch
	};
}
var jV, MV, NV = g((() => {
	KA(), Xz(), Ne(), jV = 1e4, MV = (e) => ({
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(e)
	});
})), PV, FV, IV, LV, RV, zV, BV, VV, HV, UV = g((() => {
	Lk(), Ne(), bB(), DB(), dB(), BB(), fV(), xV(), KB(), kV(), NV(), PV = {
		key: 0,
		class: "mt-2 font-mono text-2xs"
	}, FV = { class: "flex items-center gap-2" }, IV = { class: "mt-2 flex flex-col gap-2" }, LV = { class: "flex flex-col gap-6" }, RV = { class: "font-medium text-content" }, zV = { class: "mt-1" }, BV = { class: "text-sm font-medium text-content" }, VV = "Not on a server", HV = /*@__PURE__*/ d({
		__name: "DeploymentsView",
		props: { capability: {} },
		setup(e) {
			let t = e, n = i(() => t.capability ?? "komodo"), { board: l, error: d, isPending: p, act: re, link: se, logs: ce, fix: ue, refetch: de } = AV(ae(n));
			ee(() => void yB(n.value));
			let _e = i(() => lB(oB(l.value?.alerts ?? []))), be = i(() => _e.value[0]?.tone), Ce = i(() => l.value?.resources ?? []), Te = i(() => l.value?.servers ?? []), Ee = Me(), De = i(() => l.value?.repos ?? []), Oe = i(() => De.value.filter((e) => Ee.workspace.inProject(e.repo))), ke = i(() => De.value.length - Oe.value.length), g = i(() => Ce.value.filter((e) => e.kind === "stack").map((e) => e.name)), Ae = i(() => l.value === void 0 ? void 0 : `${l.value.komodoUrl}/stacks`), je = i(() => {
				if (Ce.value.length > 0 || l.value === void 0 || !l.value.reachable) return;
				let e = l.value.viewer;
				return e === void 0 ? {
					title: "Komodo returned nothing",
					detail: "Nothing came back for this connection. If you expect stacks or deployments here, the usual cause is that the API key's user has no permissions on them: Komodo answers every list with nothing rather than refusing. Check the key's user in Komodo, or use one made on an admin account."
				} : e.admin ? {
					title: "Komodo has no stacks or deployments yet",
					detail: "Once you add one there, it appears here."
				} : {
					title: "This API key can't see anything in Komodo",
					detail: `The key acts as "${e.username}", which is not an admin and has no permissions on any resource, so Komodo answers every list with nothing. Grant that user access in Komodo (Settings → Users → ${e.username}), or replace the key with one made on an admin account.`
				};
			}), Ne = i(() => {
				let e = {
					running: 0,
					stopped: 0,
					unhealthy: 0,
					updates: 0
				};
				for (let t of Ce.value) t.state === "running" ? e.running++ : t.state === "unhealthy" ? e.unhealthy++ : t.state === "stopped" && e.stopped++, t.updateAvailable && e.updates++;
				return [
					{
						label: "unhealthy",
						value: e.unhealthy,
						variant: "danger"
					},
					{
						label: "running",
						value: e.running,
						variant: "success",
						always: !0
					},
					{
						label: "stopped",
						value: e.stopped,
						variant: "neutral"
					},
					{
						label: e.updates === 1 ? "update available" : "updates available",
						value: e.updates,
						variant: "info"
					}
				];
			}), Pe = i(() => {
				let e = /* @__PURE__ */ new Map();
				for (let t of Ce.value) {
					let n = t.server ?? VV;
					e.set(n, [...e.get(n) ?? [], t]);
				}
				let t = new Set(Te.value.map((e) => e.name));
				return [...Te.value.map((t) => ({
					label: t.name,
					server: t,
					resources: e.get(t.name) ?? []
				})), ...[...e.entries()].filter(([e]) => !t.has(e)).map(([e, t]) => ({
					label: e,
					server: void 0,
					resources: t
				}))];
			}), Fe = i(() => Pe.value.filter((e) => e.resources.length > 0)), Ie = i(() => Pe.value.flatMap((e) => e.resources.length === 0 && e.server !== void 0 ? [e.server] : [])), Le = te(void 0), Re = te(/* @__PURE__ */ new Map()), ze = te(void 0), Be = te(/* @__PURE__ */ new Map()), Ve = (e) => {
				let t = new Map(Be.value);
				t.delete(e), Be.value = t;
			}, _ = (e, t) => {
				Be.value = new Map(Be.value).set(e, Ik(t));
			}, He = async (e, t) => {
				Le.value = e.id, Ve(e.id);
				try {
					await re.mutateAsync({
						resource: e,
						action: t
					});
				} catch (t) {
					_(e.id, t);
				} finally {
					Le.value = void 0;
				}
			}, Ue = async (e) => {
				ze.value = e.id, Ve(e.id);
				try {
					Re.value = new Map(Re.value).set(e.id, await ce.mutateAsync(e));
				} catch (t) {
					_(e.id, t);
				} finally {
					ze.value = void 0;
				}
			}, We = async (e, t, n) => {
				Le.value = e.id, Ve(t);
				try {
					let { conversationId: t } = await ue.mutateAsync({
						resource: e,
						pick: n
					});
					window.location.assign(`/agents?focus=${encodeURIComponent(t)}`);
				} catch (e) {
					_(t, e);
				} finally {
					Le.value = void 0;
				}
			}, Ge = (e) => e === void 0 ? void 0 : Ce.value.find((t) => t.name === e), Ke = te(void 0), qe = async (e, t) => {
				Ke.value = e, Ve(e);
				try {
					await se.mutateAsync({
						repo: e,
						stack: t
					});
				} catch (t) {
					_(e, t);
				} finally {
					Ke.value = void 0;
				}
			};
			return (e, t) => (m(), a(h(me), { width: "wide" }, {
				default: oe(() => [
					u(h(ge), { title: "Deployments" }, {
						info: oe(() => [!h(p) && h(l)?.reachable && Ce.value.length > 0 ? (m(), a(h(xe), {
							key: 0,
							items: Ne.value,
							class: "ml-2"
						}, null, 8, ["items"])) : o("", !0)]),
						actions: oe(() => [u(h(ve), {
							project: h(Ee).workspace.project(),
							hidden: ke.value,
							noun: "repositories",
							onClear: t[0] ||= (e) => h(Ee).workspace.setProject(void 0)
						}, null, 8, ["project", "hidden"]), Ae.value === void 0 ? o("", !0) : (m(), a(h(he), {
							key: 0,
							icon: "box",
							label: "Open Komodo stacks",
							href: Ae.value
						}, null, 8, ["href"]))]),
						_: 1
					}),
					h(d) && h(l) !== void 0 ? (m(), a(h(pe), {
						key: 0,
						of: h(Se)(h(d)),
						class: "mb-4"
					}, null, 8, ["of"])) : o("", !0),
					h(p) ? (m(), a(EB, { key: 1 })) : h(l) === void 0 ? (m(), a(h(pe), {
						key: 2,
						of: {
							tone: "danger",
							title: "Couldn't load this Komodo connection",
							detail: h(d) ?? "The sandbox did not answer.",
							action: {
								label: "Try again",
								run: () => void h(de)()
							}
						}
					}, null, 8, ["of"])) : h(l).reachable ? (m(), s(r, { key: 4 }, [be.value ? (m(), s("div", {
						key: 0,
						class: f(["mb-6 rounded-lg border px-4 py-3", h(UB)[be.value].panel])
					}, [c("div", FV, [u(h(fe), {
						name: "exclamation-circle",
						class: f(["text-sm", h(UB)[be.value].text])
					}, null, 8, ["class"]), t[2] ||= c("span", { class: "text-sm font-semibold text-content" }, "Needs you", -1)]), c("div", IV, [(m(!0), s(r, null, ne(_e.value, (e) => (m(), a(OV, {
						key: e.alert.id,
						incident: e,
						resource: Ge(e.alert.resource),
						failure: Be.value.get(e.alert.id),
						onFix: (t, n) => We(t, e.alert.id, n)
					}, null, 8, [
						"incident",
						"resource",
						"failure",
						"onFix"
					]))), 128))])], 2)) : o("", !0), c("div", LV, [je.value ? (m(), s("div", {
						key: 0,
						class: f(h(we).emptyState("text-left"))
					}, [c("div", RV, ie(je.value.title), 1), c("div", zV, ie(je.value.detail), 1)], 2)) : (m(), s(r, { key: 1 }, [(m(!0), s(r, null, ne(Fe.value, (e) => (m(), a(h(ye), {
						key: e.label,
						label: e.label
					}, {
						info: oe(() => [e.server ? (m(), a(bV, {
							key: 0,
							server: e.server
						}, null, 8, ["server"])) : o("", !0)]),
						default: oe(() => [(m(!0), s(r, null, ne(e.resources, (e) => (m(), a(dV, {
							key: e.id,
							resource: e,
							busy: Le.value === e.id,
							logs: Re.value.get(e.id),
							"logs-pending": ze.value === e.id,
							error: Be.value.get(e.id),
							onAct: He,
							onLogs: Ue,
							onFix: (e, t) => We(e, e.id, t)
						}, null, 8, [
							"resource",
							"busy",
							"logs",
							"logs-pending",
							"error",
							"onFix"
						]))), 128))]),
						_: 2
					}, 1032, ["label"]))), 128)), Ie.value.length > 0 ? (m(), a(h(ye), {
						key: 0,
						label: "Other hosts",
						caption: "Connected to this Komodo with nothing deployed on them."
					}, {
						default: oe(() => [(m(!0), s(r, null, ne(Ie.value, (e) => (m(), s("div", {
							key: e.id,
							class: "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3"
						}, [c("span", BV, ie(e.name), 1), u(bV, {
							server: e,
							class: "ml-auto"
						}, null, 8, ["server"])]))), 128))]),
						_: 1
					})) : o("", !0)], 64)), Oe.value.length > 0 ? (m(), a(h(ye), {
						key: 2,
						label: "Your repos",
						caption: "Which Komodo stack each repo in this workspace deploys to."
					}, {
						default: oe(() => [(m(!0), s(r, null, ne(Oe.value, (e) => (m(), a(zB, {
							key: e.repo,
							link: e,
							stacks: g.value,
							busy: Ke.value === e.repo,
							error: Be.value.get(e.repo),
							onLink: qe
						}, null, 8, [
							"link",
							"stacks",
							"busy",
							"error"
						]))), 128))]),
						_: 1
					})) : o("", !0)])], 64)) : (m(), a(h(pe), {
						key: 3,
						class: "px-4 py-3",
						of: {
							tone: "warning",
							title: `Can't reach Komodo at ${h(l).komodoUrl}`,
							detail: "Nothing below is current, this is not a report that your deployments are down, only that we couldn't ask."
						}
					}, {
						default: oe(() => [h(l).unreachableReason ? (m(), s("div", PV, ie(h(l).unreachableReason), 1)) : o("", !0), u(h(le), {
							class: "mt-3",
							label: "Try again",
							size: "small",
							severity: "secondary",
							onClick: t[1] ||= (e) => h(de)()
						})]),
						_: 1
					}, 8, ["of"]))
				]),
				_: 1
			}));
		}
	});
})), WV = /* @__PURE__ */ Ae({ default: () => GV }), GV, KV = g((() => {
	UV(), UV(), GV = HV;
}));
Ne(), bB();
var qV = (e, t) => {
	je(e), t.subscriptions.push(mB()), t.subscriptions.push(e.views.register({
		id: "deployments",
		label: "Deployments",
		surface: "rail",
		detect: (e, t) => {
			let n = t.filter((e) => e.kind === "cli" && e.config.provider === "komodo").map((e) => e.id);
			return gB(n), n.map((e) => ({
				key: e,
				title: n.length === 1 ? "Deployments" : `Deployments · ${e}`,
				icon: "box",
				props: { capability: e }
			}));
		},
		badge: (e) => vB(e.key),
		view: async () => (await Promise.resolve().then(() => (KV(), WV))).default
	}));
}, JV = {
	$schema: "https://intentic.dev/intentic-extension.schema.json",
	publisher: "intentic",
	name: "deployments",
	version: "1.0.0",
	category: "work",
	icon: "box",
	engines: { intentic: "^2.1.0" },
	entry: "dist/extension.js",
	server: "dist/server.js",
	permissions: {
		sandbox: ["GET /settings"],
		daemon: ["GET /capabilities/*/connection", "POST /agent"]
	},
	contributes: { views: [{
		id: "deployments",
		label: "Deployments",
		surface: "rail",
		badge: !0
	}] }
};
//#endregion
//#region src/manifest.ts
YS();
var YV = WS.parse(JV);
//#endregion
export { qV as activate, YV as manifest };
