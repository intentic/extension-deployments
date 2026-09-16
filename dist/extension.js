import { hostSlot as e, sandboxPoll as t, sandboxValue as n } from "@intentic/extension-api";
import { ExtensionManifestSchema as r } from "@intentic/extension-manifest";
import { Fragment as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, normalizeClass as p, normalizeStyle as ee, onMounted as te, openBlock as m, ref as ne, renderList as re, resolveDirective as ie, toDisplayString as ae, toRef as oe, unref as h, withCtx as se, withDirectives as ce } from "vue";
import { AgentRunButton as le, Button as ue, Code as de, DisclosureRow as fe, Icon as pe, Notice as me, Page as he, PageAction as ge, PageHeader as _e, Picker as ve, ProjectChip as ye, RowGroup as be, StatusBadge as xe, StatusTally as Se, noticeOf as Ce, timeAgo as we, ui as Te, useAgentRunPick as Ee } from "@intentic/extension-ui";
import { useMutation as De, useQuery as Oe, useQueryClient as ke } from "@tanstack/vue-query";
//#region \0rolldown/runtime.js
var Ae = Object.defineProperty, g = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, je = (e, t) => {
	let n = {};
	for (var r in e) Ae(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Ae(n, Symbol.toStringTag, { value: "Module" }), n;
}, Me, Ne, Pe = g((() => {
	({bindHost: Me, host: Ne} = e("ext-deployments"));
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/util.js
function Fe(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Ie(e, t = "|") {
	return e.map((e) => Ze(e)).join(t);
}
function Le(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function Re(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function ze(e) {
	return e == null;
}
function Be(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ve(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function He(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Ct) return r === void 0 && (r = Ct, r = n()), r;
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
function Ue(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function We(e) {
	return JSON.stringify(e);
}
function Ge(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function Ke(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function qe(e) {
	if (Ke(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Ke(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function Je(e) {
	return qe(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function Ye(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Xe(e, t, n) {
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
function Ze(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Qe(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function $e(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return Xe(e, Ue(e._zod.def, {
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
function et(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return Xe(e, Ue(e._zod.def, {
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
function tt(e, t) {
	if (!qe(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Xe(e, Ue(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return _(this, "shape", n), n;
	} }));
}
function nt(e, t) {
	if (!qe(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return Xe(e, Ue(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return _(this, "shape", n), n;
	} }));
}
function rt(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return Xe(e, Ue(e._zod.def, {
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
function it(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	return Xe(t, Ue(t._zod.def, {
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
function at(e, t, n) {
	return Xe(t, Ue(t._zod.def, { get shape() {
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
function ot(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function st(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function ct(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function lt(e) {
	return typeof e == "string" ? e : e?.message;
}
function ut(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function dt(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : lt(e.inst?._zod.def?.error?.(e)) ?? lt(a?.(e)) ?? lt(t?.error?.(e)) ?? lt(n.customError?.(e)) ?? lt(n.localeError?.(e)) ?? "Invalid input", { inst: s, schema: c, continue: l, input: u, ...d } = e;
	return d.path ??= [], d.message = o, t?.reportInput && (d.input = u), d;
}
function ft(e) {
	let t = e.length;
	if (!Ot.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function pt(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function mt(e) {
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
function ht(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function gt(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : yt(e, n, r.value);
	}
}
function _t(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function vt(e, t, n) {
	return _t(e, t, n, !1);
}
function yt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : _t(this, t, n.bind(this));
		},
		set(e) {
			_t(this, t, e);
		}
	});
}
function bt(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function y(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && kt !== e._zod) {
		kt = void 0;
		return;
	}
	kt = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, jt);
			let e = At;
			At = !1;
			try {
				let r = n(this);
				return At ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), At ||= e, r;
			} catch (n) {
				throw delete this[t], At ||= e, n;
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
function xt(e, t, n, r) {
	let i = bt(e, t);
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
function St(e) {
	let t = () => e;
	return t[Mt] = !0, t;
}
var Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt = g((() => {
	Ht(), Ct = /* @__PURE__*/ Symbol("evaluating"), wt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, Tt = /* @__PURE__*/ Re(() => {
		if (Vt.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), Et = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), Dt = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Ot = /[\uD800-\uDBFF]/, At = !1, jt = {
		configurable: !0,
		get() {
			At = !0;
		}
	}, Mt = "~constantCatch";
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/core.js
function Pt(e) {
	let t = Rt;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Rt = null, new e();
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
			Lt.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Lt);
			} finally {
				Lt.value = void 0;
			}
		}
		if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), gt(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Pt(u) : this;
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
function Ft(e) {
	return e && Object.assign(Vt, e), Vt;
}
var It, Lt, Rt, zt, Bt, Vt, Ht = g((() => {
	Nt(), Lt = {
		value: void 0,
		enumerable: !1
	}, Rt = "captureStackTrace" in Error ? Error : null, zt = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, Bt = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (It = globalThis).__zod_globalConfig ?? (It.__zod_globalConfig = {}), Vt = globalThis.__zod_globalConfig;
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/errors.js
function Ut() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Le, 2), e.message;
}
function Wt(e) {
	this._zod.message = e;
}
function Gt(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function Kt(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? Gt(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function qt(e, t = (e) => e.message) {
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
var Jt, Yt, Xt, Zt, Qt, $t, en, tn = g((() => {
	Ht(), Nt(), Jt = {
		get: Ut,
		set: Wt,
		enumerable: !0,
		configurable: !0
	}, Yt = {
		value: void 0,
		enumerable: !1
	}, Xt = {
		value: void 0,
		enumerable: !1
	}, Zt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Qt = (e, t) => {
		e.name = "$ZodError", Yt.value = e._zod, Object.defineProperty(e, "_zod", Yt), Xt.value = t, Object.defineProperty(e, "issues", Xt), Yt.value = void 0, Xt.value = void 0, Object.defineProperty(e, "message", Jt);
		let n = Object.getPrototypeOf(e);
		Zt.has(n) || (Zt.add(n), Object.defineProperty(n, "toString", {
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
	}, $t = b("$ZodError", Qt), en = b("$ZodError", Qt, void 0, { Parent: Error });
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/parse.js
function nn(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn = g((() => {
	Ht(), tn(), Nt(), rn = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new zt();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => dt(e, o, Ft())));
				throw wt(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, an = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => dt(e, o, Ft())));
				throw wt(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, on = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new zt();
		return a.issues.length ? {
			success: !1,
			error: new (e ?? $t)(a.issues.map((e) => dt(e, i, Ft())))
		} : {
			success: !0,
			data: a.value
		};
	}, sn = /* @__PURE__*/ on(en), cn = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? {
			success: !1,
			error: new e(a.issues.map((e) => dt(e, i, Ft())))
		} : {
			success: !0,
			data: a.value
		};
	}, ln = /* @__PURE__*/ cn(en), un = (e) => {
		let t = rn(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, nn(n, a));
		};
		return n;
	}, dn = (e) => {
		let t = rn(e), n = (e, r, i, a) => t(e, r, i, nn(n, a));
		return n;
	}, fn = (e) => {
		let t = an(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, nn(n, a));
		};
		return n;
	}, pn = (e) => {
		let t = an(e), n = async (e, r, i, a) => await t(e, r, i, nn(n, a));
		return n;
	}, mn = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return on(e)(t, n, i);
	}, hn = (e) => (t, n, r) => on(e)(t, n, r), gn = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return cn(e)(t, n, i);
	}, _n = (e) => async (t, n, r) => cn(e)(t, n, r);
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/regexes.js
function yn(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function bn() {
	return new RegExp(Fn, "u");
}
function xn(e) {
	return RegExp(`^${e}$`);
}
function Sn(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Cn(e) {
	return RegExp(`^${Sn(e)}$`);
}
function wn(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Sn({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Sn({ precision: e.precision })}` : n;
	return RegExp(`^${Wn}T(?:${r})$`);
}
var Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn = g((() => {
	Tn = /^[cC][0-9a-z]{6,}$/, En = /^[0-9a-z]+$/, Dn = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, On = /^[0-9a-vA-V]{20}$/, kn = /^[A-Za-z0-9]{27}$/, An = /^[a-zA-Z0-9_-]{21}$/, jn = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Mn = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Nn = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Pn = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Fn = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", In = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ln = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Rn = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, zn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Bn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Vn = /^[A-Za-z0-9_-]*$/, Hn = /^https?$/, Un = /^\+[1-9]\d{6,14}$/, Wn = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Gn = /*@__PURE__*/ xn(Wn), Kn = (e) => {
		let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return RegExp(`^${t}$`);
	}, qn = /^-?\d+$/, Jn = /^-?\d+(?:\.\d+)?$/, Yn = /^(?:true|false)$/i, Xn = /^[^A-Z]*$/, Zn = /^[^a-z]*$/;
})), $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r = g((() => {
	Ht(), Qn(), Nt(), $n = /*@__PURE__*/ b("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), er = (e) => {
		let t = e.value;
		return !ze(t) && t.length !== void 0;
	}, tr = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, nr = /*@__PURE__*/ b("$ZodCheckLessThan", (e, t) => {
		$n.init(e, t);
		let n = tr[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
			t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: tr[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), rr = /*@__PURE__*/ b("$ZodCheckGreaterThan", (e, t) => {
		$n.init(e, t);
		let n = tr[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
			t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: tr[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), ir = /*@__PURE__*/ b("$ZodCheckMultipleOf", (e, t) => {
		$n.init(e, t), e._zod.onattach.push((e) => {
			var n;
			(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
		}), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : Ve(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ar = /*@__PURE__*/ b("$ZodCheckNumberFormat", (e, t) => {
		$n.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Dt[t.format];
		e._zod.onattach.push((e) => {
			let r = e._zod.bag;
			r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = qn);
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
	}), or = /*@__PURE__*/ b("$ZodCheckMaxLength", (e, t) => {
		var n;
		$n.init(e, t), (n = e._zod.def).when ?? (n.when = er), e._zod.onattach.push((e) => {
			let n = e._zod.bag.maximum ?? Infinity;
			t.maximum < n && (e._zod.bag.maximum = t.maximum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? ft(r) : i) <= t.maximum) return;
			let a = pt(r);
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
	}), sr = /*@__PURE__*/ b("$ZodCheckMinLength", (e, t) => {
		var n;
		$n.init(e, t), (n = e._zod.def).when ?? (n.when = er), e._zod.onattach.push((e) => {
			let n = e._zod.bag.minimum ?? -Infinity;
			t.minimum > n && (e._zod.bag.minimum = t.minimum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? ft(r) : i) >= t.minimum) return;
			let a = pt(r);
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
	}), cr = /*@__PURE__*/ b("$ZodCheckLengthEquals", (e, t) => {
		var n;
		$n.init(e, t), (n = e._zod.def).when ?? (n.when = er), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.minimum = t.length, n.maximum = t.length, n.length = t.length;
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? ft(r) : i;
			if (a === t.length) return;
			let o = pt(r), s = a > t.length;
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
	}), lr = /*@__PURE__*/ b("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		$n.init(e, t), e._zod.onattach.push((e) => {
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
	}), ur = /*@__PURE__*/ b("$ZodCheckRegex", (e, t) => {
		lr.init(e, t), e._zod.check = (n) => {
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
	}), dr = /*@__PURE__*/ b("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= Xn, lr.init(e, t);
	}), fr = /*@__PURE__*/ b("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= Zn, lr.init(e, t);
	}), pr = /*@__PURE__*/ b("$ZodCheckIncludes", (e, t) => {
		$n.init(e, t);
		let n = Ye(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
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
	}), mr = /*@__PURE__*/ b("$ZodCheckStartsWith", (e, t) => {
		$n.init(e, t);
		let n = RegExp(`^${Ye(t.prefix)}.*`);
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
	}), hr = /*@__PURE__*/ b("$ZodCheckEndsWith", (e, t) => {
		$n.init(e, t);
		let n = RegExp(`.*${Ye(t.suffix)}$`);
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
	}), gr = /*@__PURE__*/ b("$ZodCheckOverwrite", (e, t) => {
		$n.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), vr, yr = g((() => {
	vr = class {
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
})), br, xr = g((() => {
	br = {
		major: 4,
		minor: 5,
		patch: 4
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/schemas.js
function Sr(e) {
	return {
		validate: (t) => {
			try {
				return Zr(sn(e, t));
			} catch {
				return ln(e, t).then(Zr);
			}
		},
		vendor: "zod",
		version: 1
	};
}
function Cr(e, t) {
	if (!t.normalize && t.protocol?.source === Hn.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		return new URL(e);
	} catch {
		return 2;
	}
}
function wr(e) {
	return e.replace(ni, "");
}
function Tr(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Er(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function Dr(e) {
	if (!gi.test(e)) return !1;
	try {
		return new URL(`http://[${e}]`), !0;
	} catch {
		return !1;
	}
}
function Or(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Dr(n);
}
function kr(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function Ar(e) {
	if (!Vn.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return kr(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function jr(e, t = null) {
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
function Mr(e, t, n) {
	e.issues.length && t.issues.push(...ct(n, e.issues)), t.value[n] = e.value;
}
function Nr(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...ct(n, e.issues));
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
function Pr(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Ai, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Qe(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Fr(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => Nr(e, n, i, t, u, d))) : Nr(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function Ir(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !ot(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => dt(e, r, Ft())))
	}), t);
}
function Lr(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (qe(e) && qe(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Lr(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Lr(i, a);
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
function Rr(e, t, n) {
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
	let c = Lr(t.value, n.value);
	if (!c.valid) {
		if (ot(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function zr(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function Br(e, t, n) {
	e.issues.length && t.issues.push(...ct(n, e.issues)), t.value[n] = e.value;
}
function Vr(e, t, n, r, i) {
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
			t.issues.push(...ct(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
function Hr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function Ur(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function Wr(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function Gr(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => dt(e, r, Ft())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function Kr(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function qr(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => Jr(e, r, t.out, n)) : Jr(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => Jr(e, r, t.in, n)) : Jr(e, r, t.in, n);
	}
}
function Jr(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
function Yr(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function Xr(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(ht(e));
	}
}
var x, Zr, Qr, S, $r, ei, ti, ni, ri, ii, ai, oi, si, ci, li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea = g((() => {
	_r(), Ht(), yr(), vn(), Qn(), Nt(), xr(), x = /*@__PURE__*/ b("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = br;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = ot(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (st(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new zt();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (ut(t.issues, n, e), i ||= ot(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						ut(t.issues, n, e), i ||= ot(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (ot(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new zt();
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
					if (a.async === !1) throw new zt();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return vt(this, "~standard", Sr(this));
		},
		set "~standard"(e) {
			_t(this, "~standard", e);
		}
	}), Zr = (e) => e.success ? { value: e.data } : { issues: e.error?.issues }, Qr = /*@__PURE__*/ b("$ZodString", (e, t) => {
		x.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Kn(e._zod.bag), e._zod.parse = (n, r) => {
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
		lr.init(e, t), Qr.init(e, t);
	}), $r = /*@__PURE__*/ b("$ZodGUID", (e, t) => {
		t.pattern ??= Mn, S.init(e, t);
	}), ei = /*@__PURE__*/ b("$ZodUUID", (e, t) => {
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
			t.pattern ??= Nn(e);
		} else t.pattern ??= Nn();
		S.init(e, t);
	}), ti = /*@__PURE__*/ b("$ZodEmail", (e, t) => {
		t.pattern ??= Pn, S.init(e, t);
	}), ni = /[\t\n\r]/g, ri = /*@__PURE__*/ b("$ZodURL", (e, t) => {
		S.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = Cr(r, t);
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
				t.hostname && !Tr(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !Er(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : wr(r);
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
	}), ii = /*@__PURE__*/ b("$ZodEmoji", (e, t) => {
		t.pattern ??= bn(), S.init(e, t);
	}), ai = /*@__PURE__*/ b("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? An : yn(t.length), S.init(e, t);
	}), oi = /*@__PURE__*/ b("$ZodCUID", (e, t) => {
		t.pattern ??= Tn, S.init(e, t);
	}), si = /*@__PURE__*/ b("$ZodCUID2", (e, t) => {
		t.pattern ??= En, S.init(e, t);
	}), ci = /*@__PURE__*/ b("$ZodULID", (e, t) => {
		t.pattern ??= Dn, S.init(e, t);
	}), li = /*@__PURE__*/ b("$ZodXID", (e, t) => {
		t.pattern ??= On, S.init(e, t);
	}), ui = /*@__PURE__*/ b("$ZodKSUID", (e, t) => {
		t.pattern ??= kn, S.init(e, t);
	}), di = /*@__PURE__*/ b("$ZodISODateTime", (e, t) => {
		t.pattern ??= wn(t), S.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((e) => {
			e._zod.bag.laxFormat = !0;
		}));
	}), fi = /*@__PURE__*/ b("$ZodISODate", (e, t) => {
		t.pattern ??= Gn, S.init(e, t);
	}), pi = /*@__PURE__*/ b("$ZodISOTime", (e, t) => {
		t.pattern ??= Cn(t), S.init(e, t);
	}), mi = /*@__PURE__*/ b("$ZodISODuration", (e, t) => {
		t.pattern ??= jn, S.init(e, t);
	}), hi = /*@__PURE__*/ b("$ZodIPv4", (e, t) => {
		t.pattern ??= In, S.init(e, t), e._zod.bag.format = "ipv4";
	}), gi = /^[0-9a-fA-F:.]+$/, _i = /*@__PURE__*/ b("$ZodIPv6", (e, t) => {
		t.pattern ??= Ln, S.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
			Dr(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), vi = /*@__PURE__*/ b("$ZodCIDRv4", (e, t) => {
		t.pattern ??= Rn, S.init(e, t);
	}), yi = /*@__PURE__*/ b("$ZodCIDRv6", (e, t) => {
		t.pattern ??= zn, S.init(e, t), e._zod.check = (n) => {
			Or(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), bi = /*@__PURE__*/ b("$ZodBase64", (e, t) => {
		t.pattern ??= Bn, S.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
			kr(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), xi = /*@__PURE__*/ b("$ZodBase64URL", (e, t) => {
		t.pattern ??= Vn, S.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
			Ar(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Si = /*@__PURE__*/ b("$ZodE164", (e, t) => {
		t.pattern ??= Un, S.init(e, t);
	}), Ci = /*@__PURE__*/ b("$ZodJWT", (e, t) => {
		S.init(e, t), e._zod.check = (n) => {
			jr(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), wi = /*@__PURE__*/ b("$ZodNumber", (e, t) => {
		x.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Jn, e._zod.parse = (n, r) => {
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
	}), Ti = /*@__PURE__*/ b("$ZodNumberFormat", (e, t) => {
		ar.init(e, t), wi.init(e, t);
	}), Ei = /*@__PURE__*/ b("$ZodBoolean", (e, t) => {
		x.init(e, t), e._zod.pattern = Yn, e._zod.parse = (n, r) => {
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
	}), Di = /*@__PURE__*/ b("$ZodUnknown", (e, t) => {
		x.init(e, t), e._zod.parse = (e) => e;
	}), Oi = /*@__PURE__*/ b("$ZodNever", (e, t) => {
		x.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), ki = /*@__PURE__*/ b("$ZodArray", (e, t) => {
		x.init(e, t);
		let n = Vt.memoizer;
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
				s instanceof Promise ? o.push(s.then((t) => Mr(t, r, e))) : Mr(s, r, e);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Ai = [], ji = /* @__PURE__ */ new WeakMap(), Mi = /*@__PURE__*/ b("$ZodObject", (e, t) => {
		if (x.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
			let e = t.shape;
			ji.set(t, e), Object.defineProperty(t, "shape", { get: () => {
				let n = { ...e };
				return Object.defineProperty(t, "shape", { value: n }), ji.set(t, n), n;
			} });
		}
		let n = Re(() => Pr(t));
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
		let r = Ke, i = t.catchall, a, o = Vt.memoizer;
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
				a instanceof Promise ? l.push(a.then((n) => Nr(n, t, e, c, r, i))) : Nr(a, t, e, c, r, i);
			}
			return i ? Fr(l, c, t, s, n.value, e) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), Ni = /*@__PURE__*/ b("$ZodObjectJIT", (e, t) => {
		Mi.init(e, t);
		let n = e._zod.parse, r = Re(() => Pr(t)), i = Vt.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new vr(["payload", "ctx"], {
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
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : We(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
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
		}, o, s = Ke, c = !Vt.jitless, l = c && Tt.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Fr([], p, i, f, d, e) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), Pi = /*@__PURE__*/ b("$ZodUnion", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), y(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), y(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), y(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => Be(e.source)).join("|")})$`);
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
			return a ? Promise.all(o).then((t) => Ir(t, r, e, i)) : Ir(o, r, e, i);
		};
	}), Fi = /*@__PURE__*/ b("$ZodDiscriminatedUnion", (e, t) => {
		t.inclusive = !1, Pi.init(e, t);
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
			let r = ji.get(e._zod.def);
			if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
		});
		let r = Re(() => {
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
			if (!Ke(o)) return i.issues.push({
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
	}), Ii = /*@__PURE__*/ b("$ZodIntersection", (e, t) => {
		x.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Rr(e, t, n)) : Rr(e, i, a);
		};
	}), Li = /*@__PURE__*/ b("$ZodTuple", (e, t) => {
		x.init(e, t);
		let n = t.items, r = Vt.memoizer;
		r?.attach(e), e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Array.isArray(o)) return i.issues.push({
				input: o,
				inst: e,
				expected: "tuple",
				code: "invalid_type"
			}), i;
			i.value = r ? r.alloc(e, i, [], a) : [];
			let s = [], c = zr(n, "optin"), l = zr(n, "optout");
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
					r instanceof Promise ? s.push(r.then((t) => Br(t, i, e))) : Br(r, i, e);
				}
			}
			return s.length ? Promise.all(s).then(() => Vr(u, i, n, o, l)) : Vr(u, i, n, o, l);
		};
	}), Ri = /*@__PURE__*/ b("$ZodRecord", (e, t) => {
		x.init(e, t);
		let n = Vt.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!qe(a)) return r.issues.push({
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
							issues: s.issues.map((e) => dt(e, i, Ft())),
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
						e.issues.length && r.issues.push(...ct(n, e.issues)), r.value[l] = e.value;
					})) : (u.issues.length && r.issues.push(...ct(n, u.issues)), r.value[l] = u.value);
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
					if (typeof n == "string" && Jn.test(n) && l.issues.length) {
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
							issues: l.issues.map((e) => dt(e, i, Ft())),
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
						e.issues.length && r.issues.push(...ct(n, e.issues)), r.value[u] = e.value;
					})) : (d.issues.length && r.issues.push(...ct(n, d.issues)), r.value[u] = d.value);
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
	}), zi = /*@__PURE__*/ b("$ZodEnum", (e, t) => {
		x.init(e, t);
		let n = Fe(t.entries), r = new Set(n);
		e._zod.values = r;
		let i = n.filter((e) => Et.has(typeof e));
		e._zod.pattern = RegExp(i.length ? `^(${i.map((e) => Ye(e.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), Bi = /*@__PURE__*/ b("$ZodLiteral", (e, t) => {
		x.init(e, t);
		let n = new Set(t.values);
		e._zod.values = n, e._zod.pattern = RegExp(t.values.length ? `^(${t.values.map((e) => typeof e == "string" ? Ye(e) : e ? Ye(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, i) => {
			let a = r.value;
			return n.has(a) || r.issues.push({
				code: "invalid_value",
				values: t.values,
				input: a,
				inst: e
			}), r;
		};
	}), Vi = /*@__PURE__*/ b("$ZodTransform", (e, t) => {
		x.init(e, t), e._zod.optin = "optional", Vt.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new Bt(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new zt();
			return n.value = i, n;
		};
	}), Hi = /*@__PURE__*/ b("$ZodOptional", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", y(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), y(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Be(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => Hr(e, t)) : Hr(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), Ui = /*@__PURE__*/ b("$ZodExactOptional", (e, t) => {
		Hi.init(e, t), y(e, "values", (e) => e.def.innerType._zod.values), y(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), Wi = /*@__PURE__*/ b("$ZodNullable", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin), y(e, "optout", (e) => e.def.innerType._zod.optout), y(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Be(t.source)}|null)$`) : void 0;
		}), y(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), Gi = /*@__PURE__*/ b("$ZodDefault", (e, t) => {
		x.init(e, t), e._zod.optin = "defaulted", y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Ur(e, t)) : Ur(r, t);
		};
	}), Ki = /*@__PURE__*/ b("$ZodPrefault", (e, t) => {
		x.init(e, t), e._zod.optin = "defaulted", y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), qi = /*@__PURE__*/ b("$ZodNonOptional", (e, t) => {
		x.init(e, t), y(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => Wr(t, e)) : Wr(i, e);
		};
	}), Ji = /*@__PURE__*/ b("$ZodCatch", (e, t) => {
		x.init(e, t), y(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), y(e, "optout", (e) => e.def.innerType._zod.optout), y(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => Gr(e, r, t, n)) : Gr(e, r, t, n);
		};
	}), Yi = /*@__PURE__*/ b("$ZodPipe", (e, t) => {
		x.init(e, t), y(e, "values", (e) => e.def.in._zod.values), y(e, "optin", (e) => e.def.in._zod.optin), y(e, "optout", (e) => e.def.out._zod.optout), y(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => Kr(e, t.in, n)) : Kr(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Kr(e, t.out, n)) : Kr(r, t.out, n);
		};
	}), Xi = /*@__PURE__*/ b("$ZodCodec", (e, t) => {
		x.init(e, t), y(e, "values", (e) => e.def.in._zod.values), y(e, "optin", (e) => e.def.in._zod.optin), y(e, "optout", (e) => e.def.out._zod.optout), y(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if ((n.direction || "forward") === "forward") {
				let r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => qr(e, t, n)) : qr(r, t, n);
			}
			{
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => qr(e, t, n)) : qr(r, t, n);
			}
		};
	}), Zi = /*@__PURE__*/ b("$ZodReadonly", (e, t) => {
		x.init(e, t), y(e, "propValues", (e) => e.def.innerType._zod.propValues), y(e, "values", (e) => e.def.innerType._zod.values), y(e, "optin", (e) => e.def.innerType?._zod?.optin), y(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(Yr) : Yr(r);
		};
	}), Qi = /*@__PURE__*/ b("$ZodLazy", (e, t) => {
		x.init(e, t), He(e._zod, "innerType", () => {
			let e = t;
			return e._cachedInner ||= t.getter(), e._cachedInner;
		}), y(e, "pattern", (e) => e.innerType?._zod?.pattern), y(e, "propValues", (e) => e.innerType?._zod?.propValues), y(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), y(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
	}), $i = /*@__PURE__*/ b("$ZodCustom", (e, t) => {
		$n.init(e, t), x.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => Xr(t, n, r, e));
			Xr(i, n, r, e);
		};
	});
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/memoizer.js
function ta(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function na(e, t) {
	let n = la.get(e);
	if (n !== void 0) return n;
	if (t.has(e)) return !0;
	t.add(e);
	let r = !1, i = (e) => {
		!r && e?._zod && na(e, t) && (r = !0);
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
	return t.delete(e), la.set(e, r), r;
}
function ra(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
function ia() {
	return fa;
}
function aa(e, t) {
	let n = e[sa]?.backEdges;
	return n !== void 0 && typeof t == "object" && !!t && n.has(t);
}
var oa, sa, ca, la, ua, da, fa, pa = g((() => {
	oa = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, sa = "~memo", ca = [], la = /*@__PURE__*/ new WeakMap(), da = [], fa = {
		alloc(e, t, n) {
			let r = ua;
			if (!r) return n;
			ua = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), da.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && aa(n, e.value)) throw new oa();
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
					if (n === void 0 && (n = na(e, /* @__PURE__ */ new Set()), !n)) return e._zod.parse = t, e._zod.run === a && (e._zod.run = t), t(o, s);
					let c = o.value;
					if (typeof c != "object" || !c) return t(o, s);
					let l = s[sa];
					l || (l = {
						buckets: /* @__PURE__ */ new Map(),
						backEdges: void 0
					}, s[sa] = l);
					let u;
					r === s ? u = i : (u = ra(l, e), r = s, i = u);
					let d = u.get(c);
					if (d) return o.value = d.value, d.issues ? d.issues.length && o.issues.push(...ta(d.issues)) : (o.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(d.value)), o;
					ua = u;
					let f = da.length, p = t(o, s);
					ua = void 0;
					let ee = da.length > f ? da.pop() : void 0;
					return p instanceof Promise ? p.then((e) => (ee && (ee.issues = e.issues.length ? ta(e.issues) : ca), e)) : (ee && (ee.issues = p.issues.length ? ta(p.issues) : ca), p);
				};
				e._zod.parse = a, e._zod.run === t && (e._zod.run = a);
			});
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/locales/en.js
function ma() {
	return { localeError: ha() };
}
var ha, ga = g((() => {
	Nt(), ha = () => {
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
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(mt(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${Ze(e.values[0])}` : `Invalid option: expected one of ${Ie(e.values, "|")}`;
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
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Ie(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/registries.js
function _a() {
	return new ya();
}
var va, ya, ba, xa = g((() => {
	ya = class {
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
	}, (va = globalThis).__zod_globalRegistry ?? (va.__zod_globalRegistry = _a()), ba = globalThis.__zod_globalRegistry;
})), Sa = g((() => {}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function Ca(e, t) {
	return new e({
		type: "string",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wa(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ta(e, t) {
	return new e({
		type: "string",
		format: "guid",
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
		version: "v4",
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
		version: "v6",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ka(e, t) {
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
function Aa(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ja(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ma(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Na(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pa(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fa(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ia(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function La(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ra(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function za(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ba(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Va(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ha(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ua(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wa(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ga(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ka(e, t) {
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
function qa(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ja(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ya(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xa(e, t) {
	return new e({
		type: "number",
		checks: [],
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Za(e, t) {
	return new e({
		type: "number",
		coerce: !0,
		checks: [],
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qa(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $a(e, t) {
	return new e({
		type: "boolean",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function eo(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function to(e, t) {
	return new e({
		type: "never",
		...v(t)
	});
}
// @__NO_SIDE_EFFECTS__
function no(e, t) {
	return new nr({
		check: "less_than",
		...v(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function ro(e, t) {
	return new nr({
		check: "less_than",
		...v(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function io(e, t) {
	return new rr({
		check: "greater_than",
		...v(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function ao(e, t) {
	return new rr({
		check: "greater_than",
		...v(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function oo(e, t) {
	return new ir({
		check: "multiple_of",
		...v(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function so(e, t) {
	return new or({
		check: "max_length",
		...v(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function co(e, t) {
	return new sr({
		check: "min_length",
		...v(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function lo(e, t) {
	return new cr({
		check: "length_equals",
		...v(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function uo(e, t) {
	return new ur({
		check: "string_format",
		format: "regex",
		...v(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function fo(e) {
	return new dr({
		check: "string_format",
		format: "lowercase",
		...v(e)
	});
}
// @__NO_SIDE_EFFECTS__
function po(e) {
	return new fr({
		check: "string_format",
		format: "uppercase",
		...v(e)
	});
}
// @__NO_SIDE_EFFECTS__
function mo(e, t) {
	return new pr({
		check: "string_format",
		format: "includes",
		...v(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function ho(e, t) {
	return new mr({
		check: "string_format",
		format: "starts_with",
		...v(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function go(e, t) {
	return new hr({
		check: "string_format",
		format: "ends_with",
		...v(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function _o(e) {
	return new gr({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function vo(e) {
	return /* @__PURE__ */ _o((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function yo() {
	return /* @__PURE__ */ _o((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function bo() {
	return /* @__PURE__ */ _o((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function xo() {
	return /* @__PURE__ */ _o((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function So() {
	return /* @__PURE__ */ _o((e) => Ge(e));
}
// @__NO_SIDE_EFFECTS__
function Co(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...v(n)
	});
}
// @__NO_SIDE_EFFECTS__
function wo(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...v(n)
	});
}
// @__NO_SIDE_EFFECTS__
function To(e, t) {
	let n = /* @__PURE__ */ Eo((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(ht(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(ht(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Eo(e, t) {
	let n = new $n({
		check: "custom",
		...v(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Do(e, t) {
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
	let a = new Set(r), o = new Set(i), s = e.Codec ?? Xi, c = e.Boolean ?? Ei, l = new s({
		type: "pipe",
		in: new (e.String ?? Qr)({
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
var Oo = g((() => {
	_r(), ea(), Nt();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/to-json-schema.js
function ko(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && _(e, t, n[t]);
	return e;
}
function Ao(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? ba,
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
	return c && ko(o.schema, c), t.io === "input" && Ro(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function jo(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Mo(e, t) {
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
				ref: `${i("__shared")}#/${r}/${jo(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + jo(a)
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
function No(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		No(e);
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
function Po(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Fo(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!zo.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Po(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			_(n, r, e.length === 1 ? e[0] : Fo(e) ?? { allOf: e });
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
			let t = Po(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Io(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of zo) if (t in e) return;
	let n = t.filter((e) => Bo.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Fo(t);
	else {
		let e = n[0], i = Bo.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Fo([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, ko(e, r));
}
function Lo(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : ko(i, s), ko(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
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
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) No(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Io(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	ko(i, n.defId ? n.schema : n.def ?? n.schema);
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
					input: Ho(t, "input", e.processors),
					output: Ho(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function Ro(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return Ro(r.element, n);
	if (r.type === "set") return Ro(r.valueType, n);
	if (r.type === "lazy") return Ro(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return Ro(r.innerType, n);
	if (r.type === "intersection") return Ro(r.left, n) || Ro(r.right, n);
	if (r.type === "record" || r.type === "map") return Ro(r.keyType, n) || Ro(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Ro(r.in, n) || Ro(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (Ro(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (Ro(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (Ro(e, n)) return !0;
		return !!(r.rest && Ro(r.rest, n));
	}
	return !1;
}
var zo, Bo, Vo, Ho, Uo = g((() => {
	xa(), Nt(), zo = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), Bo = ["oneOf", "anyOf"], Vo = (e, t = {}) => (n) => {
		let r = Ao({
			...n,
			processors: t
		});
		return w(e, r), Mo(r, e), Lo(r, e);
	}, Ho = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = Ao({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return w(e, o), Mo(o, e), Lo(o, e);
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/json-schema-processors.js
function Wo(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? Wo(t.out) : t.type === "catch" ? Wo(t.innerType) : e._zod.optin;
}
function Go(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Go(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Go(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? Jn : qn).source), p) : p;
}
function Ko(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of ws.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Go(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
function qo(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (C(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Os) : JSON.parse(o);
}
function Jo(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Ao({
			...t,
			processors: Ls
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
			Mo(r, n), _(a, t, Lo(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Ao({
		...t,
		processors: Ls
	});
	return w(e, n), Mo(n, e), Lo(n, e);
}
var Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs, ps, ms, hs, gs, _s, vs, ys, bs, xs, Ss, Cs, ws, Ts, Es, Ds, Os, ks, As, js, Ms, Ns, Ps, Fs, Is, Ls, Rs = g((() => {
	Qn(), Uo(), Nt(), Yo = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, Xo = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = e._zod.bag;
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Yo[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c];
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, Zo = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
		i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
		let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? i.multipleOf = Math.abs(c) : C(e, t, i, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
	}, Qo = (e, t, n, r) => {
		n.type = "boolean";
	}, $o = (e, t, n, r) => {
		C(e, t, n, r, "BigInt cannot be represented in JSON Schema");
	}, es = (e, t, n, r) => {
		C(e, t, n, r, "Symbols cannot be represented in JSON Schema");
	}, ts = (e, t, n, r) => {
		t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
	}, ns = (e, t, n, r) => {
		C(e, t, n, r, "Undefined cannot be represented in JSON Schema");
	}, rs = (e, t, n, r) => {
		C(e, t, n, r, "Void cannot be represented in JSON Schema");
	}, is = (e, t, n, r) => {
		n.not = {};
	}, as = (e, t, n, r) => {}, os = (e, t, n, r) => {}, ss = (e, t, n, r) => {
		C(e, t, n, r, "Date cannot be represented in JSON Schema");
	}, cs = (e, t, n, r) => {
		let i = e._zod.def, a = Fe(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, ls = (e, t, n, r) => {
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
	}, us = (e, t, n, r) => {
		C(e, t, n, r, "NaN cannot be represented in JSON Schema");
	}, ds = (e, t, n, r) => {
		let i = n, a = e._zod.pattern;
		if (!a) throw Error("Pattern not found in template literal");
		i.type = "string", i.pattern = a.source;
	}, fs = (e, t, n, r) => {
		let i = n, a = {
			type: "string",
			format: "binary",
			contentEncoding: "binary"
		}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
		o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
	}, ps = (e, t, n, r) => {
		n.type = "boolean";
	}, ms = (e, t, n, r) => {
		C(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, hs = (e, t, n, r) => {
		C(e, t, n, r, "Function types cannot be represented in JSON Schema");
	}, gs = (e, t, n, r) => {
		C(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, _s = (e, t, n, r) => {
		C(e, t, n, r, "Map cannot be represented in JSON Schema");
	}, vs = (e, t, n, r) => {
		C(e, t, n, r, "Set cannot be represented in JSON Schema");
	}, ys = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = w(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, bs = (e, t, n, r) => {
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
			return t.io === "input" ? Wo(n) === void 0 : n._zod.optout === void 0;
		}));
		c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = w(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, xs = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => w(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, Ss = (e, t, n, r) => {
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
	}, Cs = (e, t, n, r) => {
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
			if (!(t.io === "input" ? Wo(e) !== void 0 : e._zod.optout === "optional")) break;
			u--;
		}
		let d = a.items.length, f = !a.rest;
		t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
		let { minimum: p, maximum: ee } = e._zod.bag;
		typeof p == "number" && (i.minItems = p), typeof ee == "number" && (i.maxItems = ee);
	}, ws = /* @__PURE__ */ new WeakMap(), Ts = (e, t, n, r) => {
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
				let n = ws.get(t);
				n || (n = [], ws.set(t, n), t.deferred.push(() => Ko(t))), n.push(e);
			}
			i.additionalProperties = w(a.valueType, t, {
				...r,
				path: [...r.path, "additionalProperties"]
			});
		}
		let c = o._zod.values, l = t.io === "input" && Wo(a.valueType) !== void 0;
		if (c && !a.partial && !l) {
			let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
			e.length > 0 && (i.required = e.map(String));
		}
	}, Es = (e, t, n, r) => {
		let i = e._zod.def, a = w(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, Ds = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Os = Symbol(), ks = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = qo(i.defaultValue, e, t, n, r);
		o !== Os && (n.default = o);
	}, As = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = qo(i.defaultValue, e, t, n, r);
		o !== Os && (n._prefault = o);
	}, js = (e, t, n, r) => {
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
	}, Ms = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		w(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, Ns = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, Ps = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Fs = (e, t, n, r) => {
		let i = e._zod.def;
		w(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Is = (e, t, n, r) => {
		let i = e._zod.innerType;
		w(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}, Ls = {
		string: Xo,
		number: Zo,
		boolean: Qo,
		bigint: $o,
		symbol: es,
		null: ts,
		undefined: ns,
		void: rs,
		never: is,
		any: as,
		unknown: os,
		date: ss,
		enum: cs,
		literal: ls,
		nan: us,
		template_literal: ds,
		file: fs,
		success: ps,
		custom: ms,
		function: hs,
		transform: gs,
		map: _s,
		set: vs,
		array: ys,
		object: bs,
		union: xs,
		intersection: Ss,
		tuple: Cs,
		record: Ts,
		nullable: Es,
		nonoptional: Ds,
		default: ks,
		prefault: As,
		catch: js,
		pipe: Ms,
		readonly: Ns,
		promise: Ps,
		optional: Fs,
		lazy: Is
	};
})), zs = g((() => {
	Ht(), vn(), tn(), ea(), pa(), _r(), xr(), Nt(), Qn(), ga(), xa(), yr(), Sa(), Oo(), Uo(), Rs(), Uo();
})), Bs = g((() => {
	zs();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/errors.js
function Vs(e, t, n) {
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
var Hs, Us, Ws, Gs = g((() => {
	zs(), Nt(), Hs = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Us = (e, t) => {
		$t.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		Hs.has(n) || (Hs.add(n), Vs(n, "format", (e) => (t) => qt(e, t)), Vs(n, "flatten", (e) => (t) => Kt(e, t)), Vs(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, Le, 2);
		}), Vs(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, Le, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, Ws = /*@__PURE__*/ b("ZodError", Us, void 0, { Parent: Error });
})), Ks, qs, Js, Ys, Xs, Zs, Qs, $s, ec, tc, nc, rc, ic = g((() => {
	zs(), Gs(), Ks = /* @__PURE__ */ rn(Ws), qs = /* @__PURE__ */ an(Ws), Js = /* @__PURE__ */ on(Ws), Ys = /* @__PURE__ */ cn(Ws), Xs = /* @__PURE__ */ un(Ws), Zs = /* @__PURE__ */ dn(Ws), Qs = /* @__PURE__ */ fn(Ws), $s = /* @__PURE__ */ pn(Ws), ec = /* @__PURE__ */ mn(Ws), tc = /* @__PURE__ */ hn(Ws), nc = /* @__PURE__ */ gn(Ws), rc = /* @__PURE__ */ _n(Ws);
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/schemas.js
function ac() {
	Vt.localeError || Ft(ma());
}
function oc() {
	Vt.memoizer || Ft({ memoizer: ia() });
}
function T(e) {
	return /* @__PURE__ */ Ca(Nc, e);
}
function sc(e) {
	return /* @__PURE__ */ Aa(Vc, e);
}
function cc(e) {
	return /* @__PURE__ */ Ba(Zc, e);
}
function lc(e) {
	return /* @__PURE__ */ Va(Qc, e);
}
function E(e) {
	return /* @__PURE__ */ Xa(rl, e);
}
function uc(e) {
	return /* @__PURE__ */ Qa(il, e);
}
function D(e) {
	return /* @__PURE__ */ $a(al, e);
}
function dc() {
	return /* @__PURE__ */ eo(ol);
}
function fc(e) {
	return /* @__PURE__ */ to(sl, e);
}
function O(e, t) {
	return /* @__PURE__ */ Co(cl, e, t);
}
function k(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...v(t)
	};
	return new ll(n);
}
function pc(e, t) {
	return new ll({
		type: "object",
		shape: e,
		catchall: fc(),
		...v(t)
	});
}
function mc(e, t) {
	return new ll({
		type: "object",
		shape: e,
		catchall: dc(),
		...v(t)
	});
}
function hc(e, t) {
	return new ul({
		type: "union",
		options: e,
		...v(t)
	});
}
function A(e, t, n) {
	return new dl({
		type: "union",
		options: t,
		discriminator: e,
		...v(n)
	});
}
function gc(e, t) {
	return new fl({
		type: "intersection",
		left: e,
		right: t
	});
}
function _c(e, t, n) {
	let r = t instanceof x;
	return new pl({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...v(r ? n : t)
	});
}
function j(e, t, n) {
	return !t || !t._zod ? new ml({
		type: "record",
		keyType: T(),
		valueType: e,
		...v(t)
	}) : new ml({
		type: "record",
		keyType: e,
		valueType: t,
		...v(n)
	});
}
function vc(e, t, n) {
	return new ml({
		type: "record",
		keyType: e,
		valueType: t,
		...v(n),
		partial: !0
	});
}
function M(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new hl({
		type: "enum",
		entries: n,
		...v(t)
	});
}
function N(e, t) {
	return new gl({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...v(t)
	});
}
function yc(e) {
	return new _l({
		type: "transform",
		transform: e
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
		type: "optional",
		innerType: e
	});
}
function Sc(e) {
	return new bl({
		type: "nullable",
		innerType: e
	});
}
function Cc(e, t) {
	return new xl({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Je(t);
		}
	});
}
function wc(e, t) {
	return new Sl({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : Je(t);
		}
	});
}
function Tc(e, t) {
	return new Cl({
		type: "nonoptional",
		innerType: e,
		...v(t)
	});
}
function Ec(e, t) {
	return new wl({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : St(t)
	});
}
function Dc(e, t) {
	return new Tl({
		type: "pipe",
		in: e,
		out: t
	});
}
function Oc(e) {
	return new Dl({
		type: "readonly",
		innerType: e
	});
}
function kc(e) {
	return new Ol({
		type: "lazy",
		getter: e
	});
}
function Ac(e, t = {}) {
	return /* @__PURE__ */ wo(kl, e, t);
}
function jc(e, t) {
	return /* @__PURE__ */ To(e, t);
}
var P, Mc, Nc, F, Pc, Fc, Ic, Lc, Rc, zc, Bc, Vc, Hc, Uc, Wc, Gc, Kc, qc, Jc, Yc, Xc, Zc, Qc, $c, el, tl, nl, rl, il, al, ol, sl, cl, ll, ul, dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl, Sl, Cl, wl, Tl, El, Dl, Ol, kl, Al, jl = g((() => {
	zs(), Rs(), Uo(), ga(), Bs(), ic(), P = /*@__PURE__*/ b("ZodType", (e, t) => (ac(), x.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(Ue(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return Xe(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(Ac(e, t));
		},
		superRefine(e, t) {
			return this.check(jc(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ _o(e));
		},
		optional() {
			return bc(this);
		},
		exactOptional() {
			return xc(this);
		},
		nullable() {
			return Sc(this);
		},
		nullish() {
			return bc(Sc(this));
		},
		nonoptional(e) {
			return Tc(this, e);
		},
		array() {
			return O(this);
		},
		or(e) {
			return hc([this, e]);
		},
		and(e) {
			return gc(this, e);
		},
		transform(e) {
			return Dc(this, yc(e));
		},
		default(e) {
			return Cc(this, e);
		},
		prefault(e) {
			return wc(this, e);
		},
		catch(e) {
			return Ec(this, e);
		},
		pipe(e) {
			return Dc(this, e);
		},
		readonly() {
			return Oc(this);
		},
		describe(e) {
			let t = this.clone();
			return ba.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return ba.get(this);
			let t = this.clone();
			return ba.add(t, e[0]), t;
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
			return vt(this, "~standard", {
				...Sr(this),
				jsonSchema: {
					input: Ho(this, "input"),
					output: Ho(this, "output")
				}
			});
		},
		set "~standard"(e) {
			_t(this, "~standard", e);
		},
		parse: function e(t, n) {
			return Ks(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await qs(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return Js(this, e, t);
		},
		async safeParseAsync(e, t) {
			return Ys(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			_t(this, "spa", e);
		},
		encode: function e(t, n) {
			return Xs(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return Zs(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await Qs(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await $s(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return ec(this, e, t);
		},
		safeDecode(e, t) {
			return tc(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return nc(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return rc(this, e, t);
		},
		toJSONSchema(e) {
			return Vo(this, {})(e);
		},
		get description() {
			return ba.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), Mc = /*@__PURE__*/ b("_ZodString", (e, t) => {
		Qr.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xo(e, t, n, r);
		let n = e._zod.bag;
		e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ uo(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ mo(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ ho(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ go(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ co(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ so(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ lo(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ co(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ fo(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ po(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ yo());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ vo(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ bo());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ xo());
		},
		slugify() {
			return this.check(/* @__PURE__ */ So());
		}
	}), Nc = /*@__PURE__*/ b("ZodString", (e, t) => {
		Qr.init(e, t), Mc.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ wa(Rc, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ Aa(Vc, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ Ga(nl, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ ja(Hc, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ Ta(zc, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ Ea(Bc, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ Da(Bc, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ Oa(Bc, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ ka(Bc, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ Ma(Uc, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ Na(Wc, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ Pa(Gc, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ Fa(Kc, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ Ha($c, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ Ua(el, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ Ia(qc, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ La(Jc, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ Ra(Yc, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ za(Xc, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ Ba(Zc, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ Va(Qc, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ Wa(tl, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ Ka(Pc, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ qa(Fc, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ Ja(Ic, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ Ya(Lc, e));
		}
	}), F = /*@__PURE__*/ b("ZodStringFormat", (e, t) => {
		S.init(e, t), Mc.init(e, t);
	}), Pc = /*@__PURE__*/ b("ZodISODateTime", (e, t) => {
		di.init(e, t), F.init(e, t);
	}), Fc = /*@__PURE__*/ b("ZodISODate", (e, t) => {
		fi.init(e, t), F.init(e, t);
	}), Ic = /*@__PURE__*/ b("ZodISOTime", (e, t) => {
		pi.init(e, t), F.init(e, t);
	}), Lc = /*@__PURE__*/ b("ZodISODuration", (e, t) => {
		mi.init(e, t), F.init(e, t);
	}), Rc = /*@__PURE__*/ b("ZodEmail", (e, t) => {
		ti.init(e, t), F.init(e, t);
	}), zc = /*@__PURE__*/ b("ZodGUID", (e, t) => {
		$r.init(e, t), F.init(e, t);
	}), Bc = /*@__PURE__*/ b("ZodUUID", (e, t) => {
		ei.init(e, t), F.init(e, t);
	}), Vc = /*@__PURE__*/ b("ZodURL", (e, t) => {
		ri.init(e, t), F.init(e, t);
	}), Hc = /*@__PURE__*/ b("ZodEmoji", (e, t) => {
		ii.init(e, t), F.init(e, t);
	}), Uc = /*@__PURE__*/ b("ZodNanoID", (e, t) => {
		ai.init(e, t), F.init(e, t);
	}), Wc = /*@__PURE__*/ b("ZodCUID", (e, t) => {
		oi.init(e, t), F.init(e, t);
	}), Gc = /*@__PURE__*/ b("ZodCUID2", (e, t) => {
		si.init(e, t), F.init(e, t);
	}), Kc = /*@__PURE__*/ b("ZodULID", (e, t) => {
		ci.init(e, t), F.init(e, t);
	}), qc = /*@__PURE__*/ b("ZodXID", (e, t) => {
		li.init(e, t), F.init(e, t);
	}), Jc = /*@__PURE__*/ b("ZodKSUID", (e, t) => {
		ui.init(e, t), F.init(e, t);
	}), Yc = /*@__PURE__*/ b("ZodIPv4", (e, t) => {
		hi.init(e, t), F.init(e, t);
	}), Xc = /*@__PURE__*/ b("ZodIPv6", (e, t) => {
		_i.init(e, t), F.init(e, t);
	}), Zc = /*@__PURE__*/ b("ZodCIDRv4", (e, t) => {
		vi.init(e, t), F.init(e, t);
	}), Qc = /*@__PURE__*/ b("ZodCIDRv6", (e, t) => {
		yi.init(e, t), F.init(e, t);
	}), $c = /*@__PURE__*/ b("ZodBase64", (e, t) => {
		bi.init(e, t), F.init(e, t);
	}), el = /*@__PURE__*/ b("ZodBase64URL", (e, t) => {
		xi.init(e, t), F.init(e, t);
	}), tl = /*@__PURE__*/ b("ZodE164", (e, t) => {
		Si.init(e, t), F.init(e, t);
	}), nl = /*@__PURE__*/ b("ZodJWT", (e, t) => {
		Ci.init(e, t), F.init(e, t);
	}), rl = /*@__PURE__*/ b("ZodNumber", (e, t) => {
		wi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zo(e, t, n, r);
		let n = e._zod.bag;
		e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ io(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ ao(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ ao(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ no(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ ro(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ ro(e, t));
		},
		int(e) {
			return this.check(uc(e));
		},
		safe(e) {
			return this.check(uc(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ io(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ ao(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ no(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ ro(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ oo(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ oo(e, t));
		},
		finite() {
			return this;
		}
	}), il = /*@__PURE__*/ b("ZodNumberFormat", (e, t) => {
		Ti.init(e, t), rl.init(e, t);
	}), al = /*@__PURE__*/ b("ZodBoolean", (e, t) => {
		Ei.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Qo(e, t, n, r);
	}), ol = /*@__PURE__*/ b("ZodUnknown", (e, t) => {
		Di.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => os(e, t, n, r);
	}), sl = /*@__PURE__*/ b("ZodNever", (e, t) => {
		Oi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => is(e, t, n, r);
	}), cl = /*@__PURE__*/ b("ZodArray", (e, t) => {
		oc(), ki.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ys(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ co(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ co(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ so(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ lo(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), ll = /*@__PURE__*/ b("ZodObject", (e, t) => {
		oc(), Ni.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => bs(e, t, n, r), xt(e, "shape", (e) => e._zod.def.shape, !1);
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
				catchall: dc()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: dc()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: fc()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return tt(this, e);
		},
		safeExtend(e) {
			return nt(this, e);
		},
		merge(e) {
			return rt(this, e);
		},
		pick(e) {
			return $e(this, e);
		},
		omit(e) {
			return et(this, e);
		},
		partial(...e) {
			return it(vl, this, e[0]);
		},
		exactPartial(...e) {
			return it(yl, this, e[0], "exactPartial");
		},
		required(...e) {
			return at(Cl, this, e[0]);
		}
	}), ul = /*@__PURE__*/ b("ZodUnion", (e, t) => {
		Pi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => xs(e, t, n, r), e.options = t.options;
	}), dl = /*@__PURE__*/ b("ZodDiscriminatedUnion", (e, t) => {
		ul.init(e, t), Fi.init(e, t);
	}), fl = /*@__PURE__*/ b("ZodIntersection", (e, t) => {
		Ii.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ss(e, t, n, r);
	}), pl = /*@__PURE__*/ b("ZodTuple", (e, t) => {
		oc(), Li.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cs(e, t, n, r);
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
				items: e.items.map((e) => new vl({
					type: "optional",
					innerType: e
				}))
			});
		}
	}), ml = /*@__PURE__*/ b("ZodRecord", (e, t) => {
		oc(), Ri.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ts(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
	}), hl = /*@__PURE__*/ b("ZodEnum", (e, t) => {
		zi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => cs(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new hl({
				...t,
				checks: [],
				...v(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new hl({
				...t,
				checks: [],
				...v(r),
				entries: i
			});
		};
	}), gl = /*@__PURE__*/ b("ZodLiteral", (e, t) => {
		Bi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ls(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
			if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return t.values[0];
		} });
	}), _l = /*@__PURE__*/ b("ZodTransform", (e, t) => {
		oc(), Vi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => gs(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new Bt(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(ht(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(ht(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), vl = /*@__PURE__*/ b("ZodOptional", (e, t) => {
		Hi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fs(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), yl = /*@__PURE__*/ b("ZodExactOptional", (e, t) => {
		Ui.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fs(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), bl = /*@__PURE__*/ b("ZodNullable", (e, t) => {
		Wi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Es(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), xl = /*@__PURE__*/ b("ZodDefault", (e, t) => {
		Gi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ks(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), Sl = /*@__PURE__*/ b("ZodPrefault", (e, t) => {
		Ki.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => As(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Cl = /*@__PURE__*/ b("ZodNonOptional", (e, t) => {
		qi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ds(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), wl = /*@__PURE__*/ b("ZodCatch", (e, t) => {
		Ji.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => js(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), Tl = /*@__PURE__*/ b("ZodPipe", (e, t) => {
		Yi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ms(e, t, n, r), e.in = t.in, e.out = t.out;
	}), El = /*@__PURE__*/ b("ZodCodec", (e, t) => {
		Tl.init(e, t), Xi.init(e, t);
	}), Dl = /*@__PURE__*/ b("ZodReadonly", (e, t) => {
		Zi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ns(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Ol = /*@__PURE__*/ b("ZodLazy", (e, t) => {
		Qi.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => Is(e, t, n, r), e.unwrap = () => e._zod.def.getter();
	}), kl = /*@__PURE__*/ b("ZodCustom", (e, t) => {
		$i.init(e, t), P.init(e, t), e._zod.processJSONSchema = (t, n, r) => ms(e, t, n, r);
	}), Al = (...e) => /* @__PURE__ */ Do({
		Codec: El,
		Boolean: al,
		String: Nc
	}, ...e);
})), Ml = g((() => {
	zs();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/iso.js
function Nl(e) {
	return /* @__PURE__ */ Ka(Pc, e);
}
var Pl = g((() => {
	zs(), jl();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/coerce.js
function I(e) {
	return /* @__PURE__ */ Za(rl, e);
}
var Fl = g((() => {
	zs(), jl();
})), Il = g((() => {
	zs(), jl(), Bs(), Gs(), ic(), Ml(), Rs(), xa(), Nt(), Bs(), Pl(), jl(), ea(), ga(), Fl();
})), L = g((() => {
	Il(), Il();
})), Ll, Rl, zl, Bl, Vl, Hl, Ul, Wl = g((() => {
	L(), Ll = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { route: t } = e["~orpc"];
		if (t?.method !== void 0 && t.path !== void 0) return {
			method: t.method,
			path: t.path
		};
	}, Rl = (e) => {
		let t = [];
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			let r = Ll(i);
			r !== void 0 && t.push({
				name: `${n}.${e}`,
				method: r.method,
				path: r.path
			});
		}
		return t.toSorted((e, t) => e.name.localeCompare(t.name));
	}, zl = /* @__PURE__ */ new Set([
		"required",
		"enum",
		"anyOf",
		"oneOf",
		"allOf"
	]), Bl = (e, t) => {
		if (Array.isArray(e)) {
			let n = e.map((e) => Bl(e));
			return t !== void 0 && zl.has(t) ? n.toSorted((e, t) => JSON.stringify(e).localeCompare(JSON.stringify(t))) : n;
		}
		return typeof e != "object" || !e ? e : Object.entries(e).toSorted(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, Bl(t, e)]);
	}, Vl = (e) => {
		let t = JSON.stringify(Bl(e)), n = 2166136261;
		for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619) >>> 0;
		return n.toString(36);
	}, Hl = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { inputSchema: t, outputSchema: n } = e["~orpc"];
		try {
			return Vl({
				in: t === void 0 ? void 0 : Jo(t, { io: "input" }),
				out: n === void 0 ? void 0 : Jo(n, { io: "output" })
			});
		} catch {
			return;
		}
	}, Ul = (e) => {
		let t = {};
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			if (Ll(i) === void 0) continue;
			let r = Hl(i);
			r !== void 0 && (t[`${n}.${e}`] = r);
		}
		return t;
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/@orpc+shared@1.14.13/node_modules/@orpc/shared/dist/index.mjs
function Gl(e) {
	return e[0] ?? {};
}
function Kl(e) {
	let t = Promise.resolve();
	return (...n) => t = t.catch(() => {}).then(() => e(...n));
}
function ql(e) {
	return !e || typeof e != "object" ? !1 : "next" in e && typeof e.next == "function" && Symbol.asyncIterator in e && typeof e[Symbol.asyncIterator] == "function";
}
function Jl(e) {
	return Yl(e) ? Object.getPrototypeOf(e)?.constructor : null;
}
function Yl(e) {
	return !!e && (typeof e == "object" || typeof e == "function");
}
var Xl, Zl, Ql, $l, eu = g((() => {
	Xl = "@orpc/shared", Zl = "1.14.13", `${Xl}${Zl}`, Ql = Symbol.asyncDispose ?? Symbol.for("asyncDispose"), $l = class {
		#e = !1;
		#t = !1;
		#n;
		#r;
		constructor(e, t) {
			this.#n = t, this.#r = Kl(async () => {
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
		async [Ql]() {
			this.#e = !0, this.#t || (this.#t = !0, await this.#n("dispose"));
		}
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.DexhfmWd.mjs
function tu(e, t) {
	return t ?? ou[e]?.status ?? 500;
}
function nu(e, t) {
	return t || ou[e]?.message || e;
}
function ru(e) {
	return e < 200 || e >= 400;
}
var iu, au, ou, su, cu, lu = g((() => {
	eu(), iu = "@orpc/client", au = "1.14.13", ou = {
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
	}, cu = class e extends Error {
		defined;
		code;
		status;
		data;
		static {
			let t = Symbol.for(`__${iu}@${au}/error/ORPC_ERROR_CONSTRUCTORS__`);
			globalThis[t] ??= /* @__PURE__ */ new WeakSet(), su = globalThis[t], su.add(e);
		}
		constructor(e, ...t) {
			let n = Gl(t);
			if (n.status !== void 0 && !ru(n.status)) throw Error("[ORPCError] Invalid error status code.");
			let r = nu(e, n.message);
			super(r, n), this.code = e, this.status = tu(e, n.status), this.defined = n.defined ?? !1, this.data = n.data;
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
			if (su.has(this)) {
				let t = Jl(e);
				if (t && su.has(t)) return !0;
			}
			return super[Symbol.hasInstance](e);
		}
	};
}));
function uu(e) {
	return _u.test(e);
}
function du(e) {
	if (uu(e)) throw new gu("Event's id must not contain a carriage return or newline character");
}
function fu(e) {
	if (!Number.isInteger(e) || e < 0) throw new gu("Event's retry must be a integer and >= 0");
}
function pu(e) {
	if (uu(e)) throw new gu("Event's comment must not contain a carriage return or newline character");
}
function mu(e, t) {
	if (t.id === void 0 && t.retry === void 0 && !t.comments?.length) return e;
	if (t.id !== void 0 && du(t.id), t.retry !== void 0 && fu(t.retry), t.comments !== void 0) for (let e of t.comments) pu(e);
	return new Proxy(e, { get(e, n, r) {
		return n === vu ? t : Reflect.get(e, n, r);
	} });
}
function hu(e) {
	return Yl(e) ? Reflect.get(e, vu) : void 0;
}
var gu, _u, vu, yu = g((() => {
	eu(), gu = class extends TypeError {}, TransformStream, _u = /\r\n|[\n\r]/, vu = Symbol("ORPC_EVENT_SOURCE_META");
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.BLtwTQUg.mjs
function bu(e, t) {
	let n = async (e) => {
		let n = await t.error(e);
		if (n !== e) {
			let t = hu(e);
			t && Yl(n) && (n = mu(n, t));
		}
		return n;
	};
	return new $l(async () => {
		let { done: r, value: i } = await (async () => {
			try {
				return await e.next();
			} catch (e) {
				throw await n(e);
			}
		})(), a = await t.value(i, r);
		if (a !== i) {
			let e = hu(i);
			e && Yl(a) && (a = mu(a, e));
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
var xu = g((() => {
	eu(), yu();
})), Su = g((() => {
	eu(), lu(), xu(), yu();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/shared/contract.D_dZrO__.mjs
function Cu(e, t) {
	return {
		...e,
		...t
	};
}
function wu(e) {
	return e instanceof Eu || (typeof e == "object" || typeof e == "function") && e !== null && "~orpc" in e && typeof e["~orpc"] == "object" && e["~orpc"] !== null && "errorMap" in e["~orpc"] && "route" in e["~orpc"] && "meta" in e["~orpc"];
}
var Tu, Eu, Du = g((() => {
	Su(), Tu = class extends Error {
		issues;
		data;
		constructor(e) {
			super(e.message, e), this.issues = e.issues, this.data = e.data;
		}
	}, Eu = class {
		"~orpc";
		constructor(e) {
			if (e.route?.successStatus && ru(e.route.successStatus)) throw Error("[ContractProcedure] Invalid successStatus.");
			if (Object.values(e.errorMap).some((e) => e && e.status && !ru(e.status))) throw Error("[ContractProcedure] Invalid error status code.");
			this["~orpc"] = e;
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/index.mjs
function Ou(e, t) {
	return {
		...e,
		...t
	};
}
function ku(e, t) {
	return {
		...e,
		...t
	};
}
function Au(e, t) {
	return e.path ? {
		...e,
		path: `${t}${e.path}`
	} : e;
}
function ju(e, t) {
	return {
		...e,
		tags: [...t, ...e.tags ?? []]
	};
}
function Mu(e, t) {
	return e ? `${e}${t}` : t;
}
function Nu(e, t) {
	return e ? [...e, ...t] : t;
}
function Pu(e, t) {
	let n = e;
	return t.prefix && (n = Au(n, t.prefix)), t.tags?.length && (n = ju(n, t.tags)), n;
}
function Fu(e, t) {
	if (wu(e)) return new Eu({
		...e["~orpc"],
		errorMap: Cu(t.errorMap, e["~orpc"].errorMap),
		route: Pu(e["~orpc"].route, t)
	});
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) n[r] = Fu(e[r], t);
	return n;
}
function Iu(e, t) {
	return { "~standard": {
		[Ru]: {
			yields: e,
			returns: t
		},
		vendor: "orpc",
		version: 1,
		validate(n) {
			return ql(n) ? { value: bu(n, {
				async value(n, r) {
					let i = r ? t : e;
					if (!i) return n;
					let a = await i["~standard"].validate(n);
					if (a.issues) throw new cu("EVENT_ITERATOR_VALIDATION_FAILED", {
						message: "Event iterator validation failed",
						cause: new Tu({
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
var Lu, R, Ru, z = g((() => {
	Du(), eu(), Su(), Lu = class e extends Eu {
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
				errorMap: Cu(this["~orpc"].errorMap, t)
			});
		}
		meta(t) {
			return new e({
				...this["~orpc"],
				meta: Ou(this["~orpc"].meta, t)
			});
		}
		route(t) {
			return new e({
				...this["~orpc"],
				route: ku(this["~orpc"].route, t)
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
				prefix: Mu(this["~orpc"].prefix, t)
			});
		}
		tag(...t) {
			return new e({
				...this["~orpc"],
				tags: Nu(this["~orpc"].tags, t)
			});
		}
		router(e) {
			return Fu(e, this["~orpc"]);
		}
	}, R = new Lu({
		errorMap: {},
		route: {},
		meta: {}
	}), Ru = Symbol("ORPC_EVENT_ITERATOR_DETAILS");
})), zu, Bu = g((() => {
	zu = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
})), Vu, Hu, Uu, Wu, Gu = g((() => {
	L(), M(["helper", "run"]), Vu = [
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
	], Hu = Vu.map((e) => e.id), Uu = M(Hu), Wu = (e) => Vu.filter((t) => e(t)), Wu((e) => e.kind === "helper"), Wu((e) => e.kind === "run" && e.trigger === "pressed"), Wu((e) => e.kind === "run" && e.trigger === "unprompted");
})), Ku, qu, Ju, Yu, Xu, Zu = g((() => {
	Ku = {
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
	}, qu = {
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
	}, Ju = {
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
	}, Yu = {
		...Ju,
		runtime: "opencode-gemini"
	}, Xu = {
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
})), Qu, $u, ed, td = g((() => {
	Zu(), Qu = [
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
				native: Ku,
				claudeCode: Ku
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
				native: qu,
				claudeCode: Ku
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
				native: Ju,
				claudeCode: Ku
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
				native: Ku,
				claudeCode: Ku
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
				native: Yu,
				claudeCode: Yu
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
				native: Xu,
				claudeCode: Xu
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
				native: Ku,
				claudeCode: Ku
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
				native: Ku,
				claudeCode: Ku
			}
		}
	], $u = Qu.map((e) => e.id), new Map(Qu.map((e) => [e.id, e])), ed = Qu.filter((e) => e.auth.kind === "translator").map((e) => e.id), Qu.filter((e) => e.auth.kind === "minted").map((e) => e.id);
})), nd, rd = g((() => {
	L(), nd = k({
		subject: T(),
		detail: T()
	});
})), id, ad, od, sd, cd, ld, ud = g((() => {
	L(), rd(), k({
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
	}), hc([
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
	}), k({ accessToken: T().optional() }), id = k({
		cpus: E().int().positive(),
		memoryMb: E().int().positive(),
		freeDiskMb: E().int().nonnegative(),
		load: E().nonnegative()
	}), ad = M([
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
		facts: id.optional(),
		lastSeen: E().optional(),
		parity: ad,
		drift: O(nd).optional()
	}), od = k({
		op: M(["pull", "push"]),
		conversationId: T().min(1),
		branch: T().min(1),
		repos: O(k({
			repo: T().min(1),
			dir: T(),
			mainBranch: T().min(1)
		}))
	}), sd = hc([k({
		kind: N("line"),
		text: T()
	}), k({
		kind: N("done"),
		ok: D(),
		detail: T().optional()
	})]), cd = k({
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
	}), ld = hc([k({ kind: N("local") }), k({
		kind: N("runner"),
		id: T().min(1)
	})]);
})), B, dd, fd, pd = g((() => {
	L(), B = T().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/), dd = T().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]*$/).max(200), fd = M(["on", "off"]).default("off");
})), md, hd, gd, _d, vd, yd, bd, xd, Sd, Cd, wd, Td, Ed, Dd, Od, kd, Ad, jd, Md, V = g((() => {
	L(), Bu(), Gu(), td(), ud(), pd(), md = T().min(1), hd = k({ provider: M($u) }), gd = M(["native", "claude-code"]), _d = k({
		repo: T(),
		base: T().min(1)
	}), vd = k({
		file: T().min(1).describe("The file open in the editor, as a workspace path."),
		startLine: E().int().min(1).optional().describe("First line of the selection, counting from one. Leave both out when the whole file is the context."),
		endLine: E().int().min(1).optional().describe("Last line of the selection, counting from one."),
		selection: T().max(2e4).optional().describe("The selected text itself. Cut it down before sending if it is long: this is context, not an upload.")
	}), yd = T().regex(zu), bd = k({
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
	]), xd = M([
		"allow",
		"hold",
		"deny"
	]), Sd = M(["sandbox", "device"]), Cd = M([
		"git.destructive",
		"files.destructive",
		"system.destructive",
		"container.state",
		"secrets.access",
		"package.publish",
		"network.outbound"
	]), wd = k({
		schedule: xd.default("allow"),
		event: xd.default("allow"),
		listener: xd.default("allow"),
		webchat: xd.default("allow"),
		issues: xd.default("hold"),
		workspace: xd.default("allow"),
		workflow: M(["allow", "deny"]).default("allow")
	}), Td = M([
		"default",
		"plan",
		"bypassPermissions"
	]), Ed = k({
		conversationId: yd,
		index: E().int().nonnegative(),
		files: M(["then", "now"])
	}), Dd = k({
		prompt: T().describe("What to say to the agent. May be empty if you are only attaching files."),
		title: T().max(80).optional().describe("A title for a conversation this turn is opening. Ignored for a conversation that already has one."),
		attachments: O(T().min(1)).max(20).optional().describe("Files to hand the agent along with the prompt, as workspace paths. Upload them first."),
		agent: md.optional().describe("Which model provider serves this turn. Leave it out for Claude."),
		harness: gd.optional().describe("Which agentic loop runs the turn. Leave it out to use each provider's own."),
		account: T().optional().describe("Which of that provider's connected accounts pays for the turn. Leave it out for the first one."),
		actsAs: B.optional().describe("Which persona the turn speaks as out in the world. Not the same as which account pays for it."),
		sessionId: T().optional().describe("Resume this provider session instead of starting a fresh one."),
		conversationId: yd.optional().describe("The conversation this turn belongs to. You choose it, it survives model switches, and it is how you address the conversation later. Naming one that does not exist opens it."),
		isolated: D().optional().describe("Work in this conversation's own private copy of the repos rather than the shared tree, so several agents can work at once. Needs a conversation id."),
		startIn: T().max(200).optional().describe("Which folder the conversation opens in, relative to the workspace root; the project it belongs to. Decided on the first turn. A persona that names its own start folder wins."),
		placement: ld.optional().describe("Where this conversation runs: this sandbox (leave it out), or a paired runner by id. Decided on the first turn; later turns follow the conversation."),
		worktreeBase: O(_d).min(1).max(50).optional().describe("Pin a new private copy to these exact commits instead of today's workspace. Used when several agents must start from identical files."),
		autoLand: D().optional().describe("Whether this turn's work merges into the workspace when it finishes. Overrides the conversation's own setting for this turn only."),
		runRole: Uu.optional().describe("What started this turn, when it was not a person typing: which of the sandbox's per-job model lists answers for it. Only used when the turn names no model of its own."),
		origin: bd.optional().describe("Set by the sandbox alone: this turn opened a conversation on behalf of a message from outside rather than a person."),
		forkOf: k({
			conversationId: yd.describe("The conversation this one was cut from."),
			keep: E().int().nonnegative().describe("How many of that conversation's messages to copy in before this turn runs."),
			files: M(["then", "now"]).describe("Which files the fork opens on: \"now\" is the workspace as it stands, \"then\" is the files as they were at the cut, which needs a private copy.")
		}).optional().describe("Where this conversation was cut from, on its first turn only. Only the client knows this, so only the client can say it."),
		model: T().optional().describe("Which model to use. Leave it out for the provider's default."),
		unattended: D().optional().describe("Nobody chose a model for this turn because a screen started it rather than a person. The sandbox then fills in the model its owner picked for unwatched work."),
		outsideWake: T().min(1).optional().describe("Content from outside caused this turn, and what to call the source. It is what makes the sandbox treat the turn as carrying somebody else's words."),
		permissionMode: Td.optional().describe("How tool calls are gated: ask before each tool, propose a plan first, or run everything. The agent can move itself between these mid-turn."),
		allowedTools: O(T().min(1)).optional().describe("Narrow the turn to these tools. Leave it out for everything the runtime has. For a turn driven by an outside message this list is the real boundary, because prompt wording is only advice."),
		effort: T().optional().describe("How hard the model should think, where the provider offers a choice."),
		thinking: D().optional().describe("Whether to show the model's reasoning as it works."),
		fast: D().optional().describe("Ask for the same work at a higher rate for a higher price. A request rather than a promise: the answer says what actually happened."),
		tierHold: D().optional().describe("Run exactly the model that was picked, even when the turn looks simple enough for a cheaper one. The judgement is still recorded; nothing is substituted."),
		editorContext: vd.optional().describe("What the user has open in their editor, folded into the prompt so that pointing words like \"this\" resolve.")
	}).refine((e) => e.prompt.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "prompt or attachments required" }).refine((e) => e.isolated !== !0 || e.conversationId !== void 0, { message: "isolated requires conversationId" }).refine((e) => e.worktreeBase === void 0 || e.isolated === !0 && e.conversationId !== void 0, { message: "worktreeBase requires an isolated conversationId" }).refine((e) => e.origin === void 0 || e.conversationId !== void 0, { message: "origin requires conversationId" }).refine((e) => e.forkOf === void 0 || e.conversationId !== void 0, { message: "forkOf requires conversationId" }).refine((e) => e.forkOf?.files !== "then" || e.isolated === !0, { message: "forkOf.files \"then\" requires isolated" }), Od = k({
		agent: T().min(1).describe("Which provider."),
		model: T().min(1).describe("Which of its models. Both or neither, because a model name only means anything to the provider that serves it."),
		account: T().optional().describe("Which connected account of that provider pays, by its daemon-minted id. Leave it out for whichever has headroom."),
		harness: gd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own."),
		effort: T().optional().describe("How hard that model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: D().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: D().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise.")
	}).optional(), kd = (e) => ({
		agent: e.provider,
		model: e.model,
		...e.account === void 0 ? {} : { account: e.account },
		...e.harness === void 0 ? {} : { harness: e.harness },
		...e.effort === void 0 ? {} : { effort: e.effort },
		...e.thinking === void 0 ? {} : { thinking: e.thinking },
		...e.fast === void 0 ? {} : { fast: e.fast }
	}), Ad = k({
		provider: md.describe("Which provider serves this work."),
		model: T().min(1).describe("Which of its models. Both halves, because a model name only means anything to the provider that serves it."),
		effort: T().optional().describe("How hard this model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: D().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: D().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise."),
		harness: gd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own.")
	}), jd = k({ run: T().describe("The id of the run that just started. Hand it back when you attach, so the stream resumes rather than replaying.") }), Md = k({
		conversationId: yd.describe("Which conversation to watch."),
		run: T().optional().describe("The run you were watching. If a newer turn has started since, the head names that one instead, and its rows are that turn's.")
	});
})), Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd, Ud, Wd, Gd, Kd, qd = g((() => {
	L(), td(), V(), Nd = hc([
		N("all"),
		N("none"),
		k({ models: O(T().min(1)).min(1) })
	]), Pd = k({
		kind: T(),
		label: T().optional(),
		utilization: E(),
		resetsAt: E().optional(),
		gates: Nd
	}), Fd = k({
		windows: O(Pd),
		measuredAt: E()
	}), Id = k({
		available: D().describe("Whether the provider will reopen this account's session window right now. The only thing a button may be drawn from."),
		reason: T().optional().describe("Why not, in the provider's own word, when it gave one. Absent when it is available, or when the provider said nothing."),
		nextAvailableAt: E().optional().describe("When the next reset may be claimed, in epoch seconds, where the provider publishes it. Absent means unknown, never 'now'."),
		weeklyResetsAt: E().optional().describe("When the weekly allowance itself reopens, in epoch seconds, where the provider publishes it.")
	}), Ld = k({
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
	}), Rd = k({
		at: E().describe("When it refused, in milliseconds."),
		kind: M([
			"limit",
			"auth",
			"entitlement"
		]).describe("Three different noes, kept apart because what fixes each is different. A spent allowance is answered by waiting; a refused credential by signing in again; and an entitlement refusal, where somebody has switched this off for your seat, by neither of those. That last one authenticates fine and reports healthy limits the whole time it refuses everything."),
		message: T().describe("The provider's own words, verbatim. The only part that says which limit or which credential."),
		account: T().optional().describe("Which account was serving, where that is known."),
		model: T().optional().describe("Which model the refused turn was on, where that is known.")
	}), zd = k({ refusals: j(T(), Rd).describe("The most recent refusal per provider. Read alongside an account's usage: that says how full it was when last checked, this says whether it has since started saying no.") }), Bd = k({
		name: T(),
		label: T(),
		usage: Fd.optional(),
		cooling: k({
			until: E().optional(),
			reason: T().optional()
		}).optional()
	}), Vd = k(Object.fromEntries(ed.map((e) => [e, O(Bd)]))), Hd = A("kind", [
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
	]), Ud = k({
		conversationId: T().min(1).describe("Which running conversation to interrupt."),
		text: T().max(2e4).describe("What to say to it. It arrives mid-turn without stopping the turn."),
		attachments: O(T().min(1)).max(20).optional().describe("Files to send with it, as workspace paths. A screenshot dropped in mid-turn with no words is a legitimate thing to send."),
		editorContext: vd.optional().describe("What you have open, folded in so that pointing words resolve.")
	}).refine((e) => e.text.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "text or attachments required" }), Wd = k({ conversationId: T().min(1).describe("Which conversation's running turn to cancel.") }), Gd = k({
		agent: md.describe("Which provider serves the re-run."),
		harness: gd.describe("Which agentic loop runs it."),
		account: T().optional().describe("Which of that provider's accounts pays for it. Leave it out for the first one."),
		model: T().optional().describe("Which model. Leave it out to keep the one the refused turn named."),
		carry: D().optional().describe("When the account changes, keep the provider session (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record. Ignored when the provider changes, or when nothing changes.")
	}), Kd = k({
		conversationId: T().min(1).describe("Which conversation's held turn to run again."),
		routing: Gd.optional().describe("Who serves the re-run, when the conversation has been re-pointed since it was refused. Leave it out to run it on whatever the turn carried.")
	});
})), Jd, Yd = g((() => {
	L(), td(), Jd = M(ed);
})), Xd, Zd, Qd, $d, ef, tf, nf, rf, af, of, sf, cf, lf, uf, df, ff, pf, mf = g((() => {
	L(), qd(), Yd(), Xd = k({
		id: T().describe("The account's id, which is what a turn names to spend on it and what disconnecting takes."),
		label: T().describe("What it is called here, which somebody can change."),
		email: T().optional().describe("Who it signs in as, in the provider's own words. Kept beside the label rather than folded into it, so a renamed account can still say whose it is. Absent when the provider says nothing, which is exactly when renaming is the only answer."),
		organization: T().optional().describe("Which organisation it belongs to, where the provider says."),
		scope: T().optional().describe("What the credential is permitted to do, in the provider's terms."),
		connectedAt: E().describe("When it was connected, in milliseconds."),
		needsReauth: D().optional().describe("Its stored credential can no longer be renewed and somebody has to sign in again. Absent means healthy, or not checked yet."),
		detail: T().optional().describe("Why, in words a person can act on."),
		usage: Fd.optional().describe("How full its plan limits were when last measured, so a picker can show what is left before committing work to it. Absent until a reading exists, which reads as unknown rather than as nothing left.")
	}), Zd = k({ accounts: O(Xd).describe("The connected accounts. Tokens never travel in this shape: being in this list is what connected means.") }), Qd = k({ force: Al().default(!1).describe("Measure the plan limits again before answering, rather than serving a recent reading. Slower, and the right thing when somebody has just changed a plan and is asking whether what they can see is still true.") }), $d = k({ id: T().min(1).describe("Which account.") }), ef = k({
		id: T().min(1).describe("Which account."),
		label: T().max(80).describe("The new name. Blank restores the one derived from the sign-in, rather than leaving a nameless row.")
	}), tf = M([
		"device",
		"redirect",
		"paste"
	]), nf = k({
		url: T().describe("The page to open and sign in on."),
		code: T().describe("The one-time code the page will ask for, where the vendor issues one. Blank when the page is already addressed to this attempt."),
		state: T().describe("For a redirect sign-in, the marker in the address the browser lands on, so a pasted URL can be recognised as this attempt's. Blank otherwise."),
		flow: tf.describe("How this attempt ends. A device sign-in finishes by itself and you watch the account list; a redirect needs the address it landed on handed back; a paste needs the code the page showed."),
		variant: T().describe("Which of the provider's estates this attempt signs in to. Blank for a provider with one."),
		handshake: T().describe("This attempt's id, for finishing or abandoning it. Not a credential and not redeemable: the proof that completes the sign-in never leaves the sandbox."),
		expiresAt: E().describe("When this attempt stops being answerable, in milliseconds, so a card can stop waiting instead of spinning.")
	}), rf = k({ variant: T().min(1).optional().describe("Which estate to sign in to. Absent takes the provider's default.") }), af = k({
		handshake: T().min(1).describe("Which attempt this belongs to."),
		code: T().optional().describe("The code the sign-in page showed, for a paste sign-in."),
		redirectUrl: T().optional().describe("The address the browser was sent to, whole, for a redirect sign-in. The grant is inside it."),
		label: T().optional().describe("What to call the account. Blank derives one from the sign-in.")
	}), of = k({ account: Xd.optional().describe("The account it connected, where the sign-in ends here. Absent means keep watching the account list.") }), sf = k({ handshake: T().min(1).describe("Which attempt to stop waiting on.") }), cf = k({
		url: T().describe("The page to open."),
		code: T().describe("The one-time code, where the provider uses one."),
		state: T().min(1).describe("The handshake's id, which status reads and the finishing call sends back."),
		flow: M(["device", "redirect"]).describe("Which shape this is. A device sign-in finishes by itself and you poll the attempt; a redirect needs the address it landed on handed back. Said outright rather than guessed at from whether a code happens to exist.")
	}), lf = A("status", [
		k({ status: N("wait") }),
		k({ status: N("ok") }),
		k({
			status: N("error"),
			error: T().min(1)
		})
	]), uf = k({
		provider: Jd.describe("Which provider."),
		redirectUrl: T().min(1).describe("The address the browser was sent to, whole. The grant is inside it."),
		state: T().min(1).describe("The handshake this belongs to. A mismatch is refused.")
	}), df = M(["reasoning", "fast"]), ff = k({
		id: T().describe("What to name when asking for this model."),
		label: T().describe("What to call it on screen."),
		efforts: O(T()).optional().describe("The thinking levels it accepts, where the provider says. Empty means use your own defaults."),
		description: T().optional().describe("What it is good for, in the provider's own words. Absent where the provider publishes only ids, which is the honest answer rather than something to paper over with a hand-written table."),
		badges: O(df).optional().describe("What it is known for, where the provider says so."),
		contextWindow: E().optional().describe("How many tokens this model will accept in one request, where the server publishes it.")
	}), pf = k({
		models: O(ff).describe("What this provider serves, in its own preference order, which is not rearranged here. Never empty."),
		default: T().describe("Which one a fresh conversation starts on. Always present.")
	});
})), H, hf, gf, U, W = g((() => {
	L(), H = k({ ok: N(!0).describe("Always true. A route that answers this either did the thing or refused with a status; there is no third outcome to report.") }), hf = M([
		"viewer",
		"collaborator",
		"maintainer",
		"owner"
	]), M([
		"viewer",
		"collaborator",
		"maintainer"
	]), gf = k({ token: T().min(1).describe("The freshly minted credential. The previous one stopped working the moment this answered.") }), U = k({ repo: T().describe("Which repository. \"root\" is the workspace itself; anything else is a repository's folder relative to the workspace root, URL-encoded.") });
})), _f, vf = g((() => {
	z(), V(), mf(), W(), _f = {
		start: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/start",
			summary: "Begin connecting an account",
			description: "Hands back the page to sign in on, and the code it will ask for where there is one. The sandbox holds the proof and finishes what it can itself: a device sign-in lands in the account list on its own, a paste or a redirect needs one thing brought back to the finishing call."
		}).input(hd.extend(rf.shape)).output(nf),
		complete: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/complete",
			summary: "Finish a sign-in with what the page handed back",
			description: "Takes the code the page showed, or the address a redirect landed on, and finishes the attempt. Answers with the account where the exchange ends here; otherwise the sandbox still has a mint to do and the row appears in the account list."
		}).input(hd.extend(af.shape)).output(of),
		cancel: R.route({
			method: "POST",
			path: "/accounts/{provider}/login/cancel",
			summary: "Abandon a sign-in",
			description: "Stops waiting on a sign-in nobody completed. An abandoned attempt also expires on its own."
		}).input(hd.extend(sf.shape)).output(H),
		accounts: R.route({
			method: "GET",
			path: "/accounts/{provider}",
			summary: "Connected accounts of a provider",
			description: "Each connected account with how full its plan limits were when last measured, where the provider publishes any. Ask for a fresh measurement and it takes one before answering, which is slower. The credentials themselves never travel: being in this list is what connected means."
		}).input(hd.extend(Qd.shape)).output(Zd),
		rename: R.route({
			method: "POST",
			path: "/accounts/{provider}/rename",
			summary: "Rename an account",
			description: "Changes the label one account shows under, so several are tellable apart. Blank restores the one derived from the sign-in."
		}).input(hd.extend(ef.shape)).output(Xd),
		disconnect: R.route({
			method: "POST",
			path: "/accounts/{provider}/disconnect",
			summary: "Disconnect an account",
			description: "Clears one stored credential, and stops any sign-in still in flight for this provider. The others stay connected."
		}).input(hd.extend($d.shape)).output(H)
	};
})), yf, bf, xf, Sf, Cf, wf = g((() => {
	L(), V(), yf = k({
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
		origin: bd.optional().describe("What woke the conversation from outside, when something did. It is how a turn gets filed under the chat service that caused it rather than under the model that served it."),
		automationIds: O(T()).optional().describe("Which automations were involved."),
		outcome: M(["ok", "error"]).optional().describe("How it ended."),
		error: T().optional().describe("What went wrong, when something did."),
		extra: j(T(), dc()).optional().describe("Whatever else the source had to say: attachments, participants, a recording's path. Shape varies by source.")
	}), bf = k({
		provider: T().optional().describe("Narrow it to one outside service."),
		limit: I().min(1).max(500).default(100).describe("How many entries to return."),
		before: I().optional().describe("Only entries older than this timestamp, so paging walks backwards through the feed.")
	}), xf = k({ events: O(yf).describe("The audit entries, newest first.") }), Sf = k({
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
	}), Cf = k({
		connections: O(Sf).describe("Each source feeding the record, and whether it is working. Probed now rather than remembered."),
		voice: k({
			channelId: T().describe("Which channel."),
			channelName: T().describe("What it is called."),
			startedAt: E().describe("When it joined, in milliseconds."),
			participants: O(T()).describe("Who else is in it.")
		}).optional().describe("A voice call the sandbox is currently in, when it is in one.")
	});
})), Tf, Ef = g((() => {
	z(), wf(), Tf = {
		list: R.route({
			method: "GET",
			path: "/activity",
			summary: "What the agent has done out in the world",
			description: "The audit trail of actions taken on outside services. Read-only on purpose: entries are written by the sandbox alone, which is what makes it a record worth trusting."
		}).input(bf).output(xf),
		status: R.route({
			method: "GET",
			path: "/activity/status",
			summary: "Whether the audit trail is being kept",
			description: "Which sources are feeding the record and whether each is working."
		}).output(Cf)
	};
})), Df, Of, kf, Af, jf, Mf, Nf, Pf, Ff, If, Lf, Rf, zf, Bf, Vf, Hf, Uf = g((() => {
	L(), Df = /^[A-Za-z_][A-Za-z0-9_]*$/, Of = T().regex(Df).max(128), kf = k({
		key: Of.describe("The name to store it under, which is the name a process will find it by."),
		value: T().min(1).describe("The value. It goes straight to your sandbox and never through the platform.")
	}), Af = k({ keys: O(T()).describe("The names that exist here. Only the names: the values never leave the sandbox.") }), jf = k({ key: Of.describe("Which secret, by name.") }), Mf = k({ value: T().describe("The value itself. The only place in this API one is ever returned.") }), Nf = M(["use", "conversation"]).describe("How far one release goes: `use` asks again every single time (one click releases exactly one use), `conversation` covers the rest of this conversation and is forgotten when the daemon restarts."), Pf = M(["secret", "capability"]).describe("Whether this gate covers one stored secret, by the name a reference carries, or one whole connected capability, by its id."), Ff = M([
		"shell",
		"code",
		"browser",
		"session",
		"otp"
	]).describe("What the credential was about to be used for: a shell command, a script, typing into a page, mounting a connected account, or one one-time code."), If = k({
		subject: T().min(1).describe("What is gated: a secret's name, or a connected capability's id."),
		kind: Pf,
		approvers: O(T().min(3)).min(1).describe("Exactly who may release it, by email, from the people on the Access roster. Not a seniority floor: nobody outside this list can release it, the owner included, unless the owner is on it."),
		scope: Nf
	}), Lf = k({ gates: O(If).describe("Every gate in force. Names, subjects and approver addresses only: this answer never carries a credential.") }), Rf = k({ subject: T().min(1).describe("Which gate, by the secret name or capability id it covers.") }), zf = k({
		subject: T().min(1).describe("What to ask for: the secret's name, or the connected capability's id."),
		why: T().max(280).optional().describe("One line on what it is for. The only words on the card that are the agent's."),
		conversationId: T().optional().describe("Which conversation to raise the card in. The CLI fills this from the running turn.")
	}), Bf = k({
		granted: N(!0).describe("Always true: a refusal is an error with a sentence, never a `false` here."),
		approvedBy: T().describe("Who released it."),
		message: T().describe("What the grant means in practice, and what to do next.")
	}), Vf = k({
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
			scope: Nf
		}).optional().describe("Who has to release this before the agent can use it, and for how long one release lasts. Absent when it is not gated.")
	}), Hf = k({ entries: O(Vf).describe("One entry per secret this sandbox knows about, from every place they live. No values, ever.") });
})), Wf, Gf, Kf, qf, Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np, rp, ip, ap, op, sp, cp, lp, up, dp, fp, pp, mp, hp, gp, _p, vp, yp, bp, xp, Sp = g((() => {
	L(), V(), Uf(), Wf = k({
		label: T().describe("The choice, in a few words."),
		description: T().describe("What picking it means."),
		preview: T().optional().describe("Something to look at while deciding: a mock-up, a snippet, a layout.")
	}), Gf = k({
		question: T().describe("What the agent is asking."),
		header: T().describe("A short label for the question."),
		multiSelect: D().describe("Whether more than one answer can be picked."),
		options: O(Wf).describe("The choices offered. A free-text answer is always possible as well.")
	}), Kf = k({
		text: T().describe("What would run."),
		language: M(["bash", "javascript"]).describe("Which of the two backends it is written for, named as the grammar that colours it."),
		truncated: D().describe("Whether this is an excerpt of a longer program, so the card can say so instead of ending mid-word. An excerpt always carries the flagged fragment: the beginning, then a window around the fragment, with any skipped middle written into the text as a bracketed count."),
		spans: O(k({
			start: E().int().nonnegative(),
			end: E().int().nonnegative()
		})).describe("Which fragments of the text the pattern match fired on: every matched class's, or, under the hard rule, only the class the title names. Offsets into text, in order, never overlapping.")
	}), qf = k({
		toolName: T().describe("Which tool it wants to use."),
		title: T().optional().describe("The whole question, as a sentence, exactly as the runtime words it."),
		displayName: T().optional().describe("A short phrase for the button, such as read file."),
		description: T().optional().describe("More about what it is asking for."),
		reason: T().optional().describe("Why it is asking at all: a rule, the current mode, something that looked risky."),
		path: T().optional().describe("Which file it concerns, when it concerns one."),
		alwaysLabel: T().optional().describe("The wording for an always-allow answer. Present only when there is something an always could actually remember; without it the only answers are once and no."),
		program: Kf.optional().describe("The program this card is holding, when the card is about one. Present on a command gate's card and absent on every other permission ask."),
		explain: T().optional().describe("One plain sentence saying what the program does and why it is being asked about, where the title says something else. Written by the judge that read your safety policy, never by the agent being gated.")
	}), Jf = k({
		card: T().describe("Which connection is being asked for."),
		name: T().describe("What it is called, as the catalogue titles it rather than as the agent named it."),
		why: T().optional().describe("The agent's case for connecting it, and the only words on this card that are the agent's.")
	}), Yf = k({
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
	}), Xf = k({
		subject: T().describe("Which credential is being asked for."),
		kind: Pf,
		lane: Ff,
		detail: T().optional().describe("Where it would go: the start of the command, the site, or what is being mounted. Never a value: the command still reads as a reference at this point."),
		why: T().optional().describe("The agent's case for using it, and the only words on this card that are the agent's."),
		approvers: O(T()).describe("Who may release it. A click from anyone else is refused and leaves the card standing."),
		scope: Nf
	}), Zf = k({
		name: T().describe("What to type, without the leading slash."),
		description: T().describe("What it does."),
		hint: T().optional().describe("What its argument should look like, shown after the name.")
	}), Qf = k({ agent: md.optional().describe("Whose commands to read. Leave it out for Claude.") }), $f = k({ commands: O(Zf).describe("The shortcut commands, as the provider last published them.") }), ep = k({
		content: T().describe("The item, as the agent wrote it."),
		status: M([
			"pending",
			"in_progress",
			"completed"
		]).describe("Where it is."),
		activeForm: T().optional().describe("How to phrase it while it is happening, so a screen can say what the agent is doing rather than what it plans to do.")
	}), tp = k({
		tokens: E().describe("How much the latest request sent, all told."),
		contextWindow: E().describe("How much the model can hold. The gap between these two is how close the conversation is to being compacted."),
		cachedAt: E().optional().describe("When that request last touched the provider's prompt cache, in milliseconds. The cache's clock runs from here, since a read refreshes it as a write does."),
		cacheTtlMs: E().optional().describe("How long that cache entry lives from `cachedAt`, in milliseconds.")
	}), np = M([
		"read",
		"edit",
		"delete",
		"move",
		"search",
		"execute",
		"think",
		"fetch",
		"other"
	]), rp = M([
		"pending",
		"in_progress",
		"completed",
		"failed"
	]), ip = k({
		path: T().describe("The file, as a workspace path, whatever directory the tool was run from."),
		line: E().optional().describe("Which line, counting from one.")
	}), ap = A("type", [
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
	]), op = k({
		path: T().describe("Where it lives, as a workspace path."),
		title: T().describe("What it is called: its opening heading, or its file name."),
		markdown: T().describe("The document itself."),
		truncated: D().optional().describe("It was clipped at the wire cap; the file on disk has more."),
		plan: D().optional().describe("It is one of the CLI's plan files, written to be approved rather than merely read.")
	}), sp = T().describe("What to send back when you answer."), cp = {
		requestId: sp,
		text: T().describe("The plan itself."),
		document: op.optional().describe("The write-up this plan refers to, when the plan itself is a pointer to one.")
	}, lp = {
		requestId: sp,
		questions: O(Gf).describe("What it wants to know."),
		document: op.optional().describe("The document this turn wrote and is asking about, so the choice can be read beside it.")
	}, up = { requestId: sp }, dp = {
		requestId: T(),
		session: T(),
		account: T(),
		message: T()
	}, fp = {
		requestId: T(),
		session: T(),
		message: T()
	}, pp = {
		requestId: T(),
		offer: Jf
	}, mp = {
		requestId: T(),
		offer: Yf
	}, hp = {
		requestId: T(),
		offer: Xf
	}, gp = k({
		outcome: M(["connected", "unfinished"]),
		id: T().optional()
	}), _p = k({
		outcome: M(["paid", "failed"]),
		amountUsd: T(),
		transaction: T().optional(),
		network: T().optional()
	}), vp = k({
		outcome: M(["released", "refused"]),
		approvedBy: T().optional()
	}), yp = k({
		kind: N("plan").describe("The agent has written a plan and is waiting for a yes."),
		...cp
	}), bp = k({
		kind: N("question").describe("The agent has asked you something and is waiting."),
		...lp
	}), xp = qf.extend({
		kind: N("permission").describe("The agent wants to use a tool it needs permission for."),
		...up
	}), A("kind", [
		yp,
		bp,
		xp
	]);
})), Cp = g((() => {})), wp = g((() => {})), Tp, Ep, Dp = g((() => {
	Cp(), wp(), Tp = ".intentic", Ep = "481795963975-cq9msl6higcd91joidrfp8mjlkuq5fk3.apps.googleusercontent.com", `${Ep}`;
})), Op, kp, Ap, jp, Mp = g((() => {
	L(), Op = /^[a-zA-Z_][a-zA-Z0-9_]{0,39}$/, kp = k({
		name: T().regex(Op),
		type: M([
			"string",
			"number",
			"boolean",
			"string[]"
		]),
		description: T().min(1),
		required: D()
	}), Ap = (e) => {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		for (let r of e) t.has(r.name) && n.add(r.name), t.add(r.name);
		return [...n];
	}, jp = O(kp).min(1).max(16).superRefine((e, t) => {
		for (let n of Ap(e)) t.addIssue({
			code: "custom",
			message: `Output field names must be unique; "${n}" is repeated.`
		});
	});
})), Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, Gp, Kp, qp, Jp = g((() => {
	L(), Dp(), Mp(), V(), pd(), Np = M(["fresh", "continue"]), Pp = A("kind", [
		k({ kind: N("none").describe("It produces nothing but its work. The classic make the suite pass: what it leaves behind is a passing suite, and asking it to also file a report is asking it to spend a round on paperwork.") }),
		k({ kind: N("claim").describe("Each round says whether it is done and why. Structured prose: done is a value read rather than a sentence interpreted. Self-assessment, so advisory by construction; it exists because plenty of goals have no command that could check them.") }),
		k({
			kind: N("json").describe("Each round writes a real answer in a shape you declared. This is the one that makes a step's output usable as the next step's input: a paragraph mentioning three files cannot be fed to anything, a list of three files can."),
			fields: jp.describe("The shape that answer has to match.")
		})
	]), Fp = A("kind", [k({
		kind: N("command").describe("Run something and see if it passes. Deterministic, free, and the only signal here whose answer does not come from a model. A passing test suite beats any amount of self-report."),
		command: T().min(1).describe("The command to run in the conversation's own tree. Exiting cleanly means satisfied.")
	}), k({
		kind: N("judge").describe("Put the question to a separate model with no tools, which reads the round's own report and rules on it, having done none of the work and nothing invested in its being finished."),
		rubric: T().min(1).describe("What that judge is asked."),
		model: T().optional().describe("Which model judges. Leave it out for the cheap one the other small jobs use.")
	})]), Ip = k({
		done: D().describe("Whether the goal is met. Reading this is the whole point of the file."),
		reason: T().describe("Why, in one line. The most-read sentence in the feature: the next round reads it first and the history shows it."),
		evidence: T().optional().describe("What was checked to know that. Optional, so a round with nothing to point at says so by leaving it out rather than by inventing a sentence."),
		data: j(T(), dc()).optional().describe("The declared answer, for a loop that asked for one, checked against the shape it declared.")
	}), Lp = 50, Rp = k({
		conversationId: yd.describe("The conversation to loop. It need not exist yet: naming a fresh one opens it, which is what lets run this until it passes be the first thing you ever say."),
		goal: T().min(1).describe("What done means, in your words. It goes into every round's instructions and into the judge's question, so the model is told the bar rather than left to infer it."),
		prompt: T().min(1).describe("What each round is asked to do. The suite passes is the goal; run the tests, take the top failure, fix it is the instruction."),
		context: Np.describe("How each round meets the last. Starting fresh makes the files the memory rather than the conversation, so the twentieth round reads the tree as clearly as the first, and costs a re-read each time. Carrying on is cheaper and keeps the reasoning, which suits a short polish-this loop and degrades on long ones: a session that has spent eleven rounds arguing for its own approach is the worst available judge of whether that approach is finished."),
		output: Pp,
		checks: O(Fp).describe("What else has to be true, all of them together. A list because the suite passes and the report is written is a real bar, and running it as two loops would do the work twice."),
		maxIterations: E().int().min(1).max(Lp).describe("How many rounds before it gives up. A loop that has not got there in fifty is not one round short of it."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what the whole loop may spend, in dollars. Optional for a short loop somebody is watching, and strongly wanted otherwise: this is the first thing here that can keep spending with nobody pressing anything between rounds."),
		stallLimit: E().int().min(1).describe("Stop after this many rounds in a row that changed nothing on disk. The guard that matters most: a loop's failure is not runaway success, it is an agent re-reading the same three files, restating the same plan and declaring more work remains, eleven times. Every one of those rounds succeeds, so only the tree not moving catches it."),
		isolated: D().describe("Whether it works in the conversation's own private copy or in the shared tree. It also decides where a check runs: testing the shared tree would be testing code this loop has not merged yet."),
		agent: md.optional().describe("Which provider the rounds run on. Absent falls back to the conversation's own last choice."),
		harness: gd.optional().describe("Which agentic loop they run on."),
		account: T().optional().describe("Which account pays."),
		model: T().optional().describe("Which model."),
		actsAs: B.optional().describe("Which persona the rounds act as. It matters here: every round is unwatched, and an unwatched turn naming no persona reaches no signed-in account at all, so pinning one is how a loop gets hands."),
		worktreeBase: O(_d).min(1).max(50).optional().describe("Pin the private copy to these exact commits, so a restart cannot quietly change what the loop is working on."),
		autoLand: D().optional().describe("Whether the work merges as it goes.")
	}), `${Tp}`, zp = k({
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
	}), Bp = M([
		"running",
		"done",
		"exhausted",
		"stalled",
		"overspent",
		"stopped",
		"error"
	]), Vp = Rp.extend({
		state: Bp.describe("How it ended, and each of these is a different thing to be told. Out of rounds says give it more room; stalled says it is not making progress and more room will not help. Overspent, stopped by a person, and the loop itself failing are all their own answers."),
		startedAt: E().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		resumed: E().int().min(0).describe("How many times the sandbox restarted under it and picked it back up. Counted rather than flagged, so a loop whose round reliably kills the sandbox is not resurrected on every boot for ever."),
		detail: T().optional().describe("Why it ended, for the endings whose reason is not in their name."),
		iterations: O(zp).describe("Every round, in order. Why it stopped at the fourth is the question a loop gets read for, and this is the answer.")
	}), Hp = k({ loops: O(Vp).describe("Every loop this workspace has run, newest first, kept after they end.") }), Up = k({ conversationId: yd.describe("Which conversation's loop.") }), Wp = k({
		id: B.describe("The design's id."),
		name: T().min(1).max(60).describe("What to call it. Short, because it has to be readable on a small badge."),
		description: T().max(280).optional().describe("What it is for, in one line. Optional, because a well-named loop has already said it."),
		prompt: T().optional().describe("What each round is asked to do, when that is worth saying separately from the goal. Absent means each round works towards the goal however it sees fit."),
		context: Np.describe("How each round meets the last: starting clean, or carrying on."),
		output: Pp.describe("What it has to produce."),
		checks: O(Fp).describe("What else has to be true."),
		maxIterations: E().int().min(1).max(Lp).describe("How many rounds before it gives up."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what it may spend, in dollars."),
		stallLimit: E().int().min(1).describe("Stop after this many rounds in a row that changed nothing.")
	}), Gp = k({ designs: O(Wp).describe("Saved loops: the machinery with the goal left out, so one design can be pointed at a different job every time.") }), Kp = k({
		design: Wp.describe("The design to write."),
		create: D().describe("Whether you mean to make a new one or replace an existing one, so an id that happens to collide cannot silently overwrite the one you had.")
	}), qp = k({ id: B.describe("Which saved loop.") });
})), Yp, Xp, Zp, Qp, $p, em, tm, nm, rm, im, am, om, sm, cm, lm, um, dm, fm, pm, mm, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm, Em, Dm, Om, km, Am = g((() => {
	L(), V(), Jp(), Yp = M([
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
	]), Xp = k({
		tool: T().optional().describe("The last tool it reached for."),
		target: T().optional().describe("What it reached for that tool with: a file, a command, a URL."),
		todo: T().optional().describe("The item on its own list that it is working through.")
	}), Zp = k({
		done: E().describe("Items it has completed."),
		total: E().describe("Items on the list. Never zero: a conversation that kept no list carries no clause at all.")
	}), Qp = k({
		plan: D().describe("It has proposed a plan and is waiting for a yes."),
		question: D().describe("It has asked you something."),
		permission: D().describe("It wants to use a tool it needs permission for."),
		capability: D().describe("It needs something connected that is not connected yet."),
		credential: D().describe("It is waiting for a named person to release a credential. The one pause that may not be yours to clear, whatever your role."),
		conflict: D().describe("Its work cannot be merged without somebody resolving a clash.")
	}), $p = k({
		at: E().describe("When the turn that left this ended, in milliseconds."),
		steps: k({
			open: E().describe("Items on it that were never completed."),
			total: E().describe("Items on the whole list."),
			next: T().optional().describe("The one it would have done next: what it was working through, or the first still waiting.")
		}).optional().describe("The agent's own checklist where that turn left it. Absent for a conversation that kept no list."),
		check: T().optional().describe("The end-of-turn check that was still failing when the turn ended, by name.")
	}), em = k({
		subject: T().describe("One line saying what the merged work did, read off the code rather than off the opening request. A conversation that asks for an audit and then spends four turns fixing what it found needs a subject about the fixes."),
		note: T().optional().describe("The same change said to somebody who uses the product, for a repository that keeps a changelog. Usually absent, because most changes are not ones a user would notice."),
		breaking: T().optional().describe("What this change takes away, for anything already relying on it. Nearly always absent: it is for removals, not for additions.")
	}), tm = k({
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
	}), nm = k({
		startedAt: E().describe("When the drafting began, in milliseconds."),
		steps: O(tm).describe("Each model that was asked, in the order they were spent, so the list is the timeline. Empty with no outcome means the diff is still being read."),
		outcome: M(["written", "failed"]).optional().describe("How it ended. Absent means it is still going."),
		reason: T().optional().describe("The one-line account of a failure, for a screen with one line to spend. The steps carry each model's own words."),
		finishedAt: E().optional().describe("When it ended, in milliseconds.")
	}), rm = M([
		"workspace",
		"diverged",
		"binary"
	]), im = k({
		id: T().describe("The conversation id, which is how every other call addresses it."),
		sessionId: T().optional().describe("The provider session behind the last turn. It is retired whenever the model or account changes."),
		title: T().optional().describe("What to call it: the first prompt cut to one line, unless somebody renamed it."),
		status: Yp.describe("What it is doing. Stopping and stopped are the two halves of somebody pressing stop, because a cancel is not instant; dismissing is the same window for a question waved away, which ends the turn too but owes the user nothing; resuming means the sandbox is already putting right whatever killed the turn; landing means its work is being carried into the workspace right now, and nothing may act on its branch until that settles."),
		failure: T().optional().describe("Why the last turn failed, in the words it died on. Absent unless it did, and cleared the moment it runs again. Carried here because the word error on its own is not an answer, least of all for a run nobody was watching."),
		failureCode: T().optional().describe("Which kind of failure it was, as the turn's own error frame coded it. Absent for a failure nothing could classify, which reads as the plain red line it is."),
		limitResetsAt: E().optional().describe("When the spent allowance reopens, in epoch seconds. Absent when the provider publishes no instant."),
		limitHeld: D().optional().describe("Whether the refused turn is held whole, so sending again re-runs it instead of appending to it."),
		limitScheduled: D().optional().describe("Whether the held turn is already booked to go again at the reset, so nobody has to press anything."),
		limitMoving: T().optional().describe("The account the held turn is being moved to by the owner's policy, while that move is booked."),
		provider: md.describe("Which model provider it runs on."),
		harness: gd.describe("Which agentic loop it runs on."),
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
		origin: bd.optional().describe("Where the conversation came from when nobody typed it: a chat mention, a visitor's message, a webhook. Absent means a person started it."),
		startedBy: T().optional().describe("Who asked for the first turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent when nothing was verified (a wake, a loopback caller)."),
		forkedFrom: Ed.optional().describe("The conversation this one was cut from. Recorded once and never cleared: it is the relationship, not a pending state."),
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
		activity: Xp.optional().describe("What it is doing at this moment."),
		checklist: Zp.optional().describe("How far it is through its own checklist. Absent for a conversation that kept no list, which is most short ones."),
		landedMessageDraft: nm.optional().describe("The whole story of this merge's commit message being written: which models were asked, how long each took, what refused and in what words. Forgotten on restart, which is right, because a restart also killed the drafting it describes."),
		landedMessage: em.optional().describe("What this conversation's merged work is called, once the drafting above has finished. It arrives on the same push that ends the draft, so the promise and the answer travel together."),
		startedAt: E().optional().describe("When the running turn started, in milliseconds. Absent when none is running."),
		updatedAt: E().describe("When it last did something, in milliseconds. Reading it does not count."),
		seenAt: E().optional().describe("When somebody last opened it, in milliseconds. Newer activity than this is what makes it unread. Kept by the sandbox rather than by a browser, so clearing site data or picking up a phone does not resurrect every badge."),
		attention: Qp.describe("Which kinds of waiting-for-you it is doing."),
		conflictCauses: O(rm).optional().describe("Why its work will not merge, and so who can clear it: your own uncommitted edits, which only you can commit or stash, against a moved main line or an unmergeable binary, which the conversation can redo on its own copy. Absent unless it is refusing to merge."),
		unfinished: $p.optional().describe("What its last turn left open: steps it never completed, a check still failing. Absent for a turn that finished what it started."),
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
			state: Bp.describe("How the loop is going."),
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
	}), am = k({ id: T().min(1).describe("Which conversation.") }), om = am.extend({
		before: I().int().optional().describe("Return the messages before this position in the record: the `from` of the page below. Absent asks for the most recent turns."),
		turns: I().int().min(1).max(200).optional().describe("How many of the user's turns to return, newest first. Absent takes the daemon's default.")
	}), sm = k({ ids: O(T().min(1)).max(500).optional().describe("Which conversations to put away. Leave it out for every finished one that can be archived right now.") }), cm = k({ ids: O(T().min(1)).min(1).max(500).describe("Which conversations.") }), lm = k({
		moved: O(im).describe("What actually moved, whole, rather than the fleet afterwards. Two archives finishing at once would each carry a snapshot from a different instant, and swapping one in wholesale would let the slower answer resurrect what the faster one just filed away."),
		rev: E().describe("The version of the fleet that includes this move, so a caller can hold its own optimistic change until it sees a list at least that new.")
	}), um = lm.extend({ failed: O(k({
		id: T().describe("Which conversation stayed on the board."),
		reason: T().describe("Why its working copy could not be released, in the words the failure came with.")
	})).describe("The conversations this press could not put away, each with the reason, so the board can say it instead of reporting silence.") }), dm = k({ removed: O(T()).describe("Which conversations were deleted, as ids. Ids rather than whole cards, because these no longer exist anywhere: there is nothing left to show and nothing to put back.") }), fm = k({
		query: T().trim().min(2).describe("What to look for. Searched against what was said, both sides of the conversation, and nothing else: not the thinking, not the tool output, which between them name nearly every identifier in the workspace and would return most of the board."),
		caseSensitive: Al().optional().describe("Whether capitals matter.")
	}), pm = M(["user", "agent"]), mm = k({
		text: T().describe("The matching line, with a little either side of it."),
		speaker: pm.describe("Who said it. Carried with the words rather than beside them, because a line of the agent's prose under a card reads as something you typed until the row says otherwise.")
	}), hm = k({
		id: T().describe("Which conversation matched."),
		snippet: mm.optional().describe("Why, in its own words. Absent when the title was the match, which the card already shows: repeating it underneath is noise where evidence was wanted.")
	}), gm = k({
		matches: O(hm).describe("What matched, from the live fleet and the archive together."),
		scanned: E().describe("How many conversations were actually read, so a screen can say when a search saw less than everything rather than implying it saw all of it."),
		indexing: D().describe("Whether what was said is still being read in the background. True means this answer can still grow, so a screen must say it is incomplete rather than presenting it as the whole list.")
	}), _m = k({
		id: T().min(1).describe("Which conversation."),
		title: T().trim().min(1).max(80).describe("What to call it from now on.")
	}), vm = k({
		id: T().min(1).describe("Which conversation."),
		text: T().trim().min(1).max(8e3).describe("The words to put in the agent's mouth. Bounded just above what the next turn can carry whole, because a line too long to be handed over intact would reach the agent truncated and quietly break the very thing this is for.")
	}), ym = k({
		id: T().min(1).describe("Which conversation."),
		autoLand: D().nullable().describe("Whether its work merges automatically when a turn finishes. Null clears the override and goes back to following the sandbox-wide setting, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), bm = k({
		id: T().min(1).describe("Which conversation."),
		resumeAfterOutage: D().nullable().describe("Whether it retries by itself when the model provider was what failed. Null clears the override back to the sandbox-wide setting.")
	}), xm = k({
		id: T().min(1).describe("Which conversation."),
		resumeAfterLimit: D().nullable().describe("Whether the turn a spent allowance refused is sent again by itself once the window reopens. Null clears the override back to the sandbox-wide setting.")
	}), Sm = k({
		id: T().min(1).describe("Which conversation."),
		moveAfterLimit: D().nullable().describe("Whether the turn a spent allowance refused is moved to another connected account of the same provider that has room, as soon as the refusal lands. Null clears the override back to the sandbox-wide setting.")
	}), Cm = k({
		id: T().min(1).describe("Which conversation."),
		repo: T().min(1).describe("Which repository."),
		path: T().min(1).describe("Which file, relative to that repository.")
	}), wm = k({
		path: T().describe("Which file."),
		reason: rm.describe("Why it would not merge, and the three have nothing in common but the symptom. Your own uncommitted edits on that path, where yours is the copy at risk. The shared tree having moved under the conversation since it started, where nothing of yours is at risk. Or a file git cannot merge at all, where no automatic answer exists.")
	}), Tm = k({
		repo: T().describe("Which repository."),
		paths: O(wm).describe("The files that genuinely would not apply. Not the whole change: reporting everything whenever the cause could not be pinned down turned four real conflicts into a wall of fourteen."),
		clean: E().describe("How many files in this repository passed but remain held with the refused composition. Zero alongside an empty list means the repository could not be reached at all."),
		mainBranch: T().optional().describe("The branch your own checkout is on, which is what the conversation has to rebase onto. Carried because only the sandbox can see it. Absent where there is no name to give.")
	}), Em = k({
		landed: D().describe("Whether the entire composed change was applied."),
		conflicts: O(Tm).optional().describe("What stopped the whole composed change, grouped per repository."),
		resolving: O(k({
			repo: T().describe("Which repository."),
			paths: O(T()).describe("Which files now hold conflict markers to sort out by hand.")
		})).optional().describe("Files left half-merged when you asked to carry the whole composition with its conflicts marked for resolution."),
		held: D().optional().describe("Nothing was applied and nothing failed: there is work waiting on the branch for a deliberate merge. Not merged on its own cannot say that, because on its own it means refused.")
	}), Dm = M([
		"check",
		"merge",
		"measure"
	]), Om = M(["cumulative", "outstanding"]), km = k({
		id: T().min(1).describe("Which conversation's work to merge."),
		mode: Dm.optional().describe("How to apply it. The default applies every repository or none, so a refusal leaves the workspace exactly as it was. The other carries the whole composition and leaves conflicted paths with markers to resolve by hand."),
		span: Om.optional().describe("How much of the work to take. Leave it out for everything not yet merged."),
		force: D().optional().describe("Go ahead despite a check that would otherwise refuse.")
	});
})), jm, Mm = g((() => {
	L(), jm = k({
		status: M([
			"allowed",
			"allowed_warning",
			"rejected"
		]),
		resetsAt: E().optional(),
		rateLimitType: T().optional(),
		utilization: E().optional()
	});
})), Nm, Pm = g((() => {
	L(), Nm = M([
		"off",
		"cooldown",
		"on"
	]);
})), Fm, Im, Lm, Rm, zm, Bm, Vm, Hm, Um, Wm, Gm, Km, qm, Jm, Ym, Xm = g((() => {
	L(), Fm = k({
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
	}), Im = k({ sessions: O(Fm).describe("Every live surface the sandbox is holding, in one list, because the question they all answer is the same one.") }), Lm = k({ name: T().describe("Which terminal.") }), Rm = k({
		name: T().describe("Which terminal."),
		lines: I().min(1).max(1e5).default(2e4).describe("How far back to ask for. Clamped to the history that actually exists.")
	}), zm = k({
		name: T().describe("Which terminal this is from."),
		text: T().describe("The history, oldest line first, with wrapped lines rejoined so a copied address or path comes back whole."),
		lines: E().describe("How many lines you got."),
		truncated: D().describe("It stopped because you asked for that many, not because the history ran out.")
	}), Bm = k({
		id: T().describe("Stable for the life of the page, which is what lets a tab survive a refresh of this list. Its address changes as the agent navigates and its position changes when a sibling closes."),
		title: T().optional().describe("The page's title. Absent mid-navigation, which is exactly when a tab still has to be drawn."),
		url: T().describe("Where it is."),
		active: D().describe("The one the agent last touched, or for a finished session, the one it ended on. Exactly one page has this.")
	}), Vm = k({
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
		pages: O(Bm).describe("Every page it has open. A browser holds several at once, which is the reason it is listed apart from the terminals.")
	}), Hm = k({ sessions: O(Vm).describe("Every browser the agents have running, open or recently closed.") }), Um = k({ name: T().describe("Which browser.") }), Wm = M(["subagent", "spawned"]), Gm = M([
		"pending",
		"running",
		"blocked",
		"completed",
		"failed",
		"killed",
		"paused"
	]), Km = k({
		state: M([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Whether anything proved its work: a check passed after its last edit, it changed code and nothing checked it, a check ran and failed, or it changed no code at all."),
		paths: O(T()).optional().describe("The code files it changed, most recent last. The first few; the record holds the rest."),
		check: T().optional().describe("The command that spoke: the one that cleared it, or the one that failed. Named rather than summarised, so a targeted test is not read as the whole suite.")
	}), qm = k({
		id: T().describe("The id of the tool call that started it (an SDK child) or the child's own conversation id (a spawned one); either way both sides already hold it, so a card links to its subagent with the id it has and the subagent points back the same way."),
		kind: Wm.describe("What sort of subagent: one the runtime's own Task tool spawned in-process, or a full child agent the daemon started for the turn. It changes only how you watch it."),
		conversationId: T().describe("The conversation whose turn started it, and the way back to the chat it belongs to."),
		agentType: T().optional().describe("What kind of subagent it is."),
		description: T().optional().describe("What it was asked to do, in one line."),
		model: T().optional().describe("Which model it runs on."),
		provider: T().optional().describe("Which provider serves it, for a child agent spawned across providers."),
		spawnDepth: E().optional().describe("How deep in the chain it sits, where one means the turn itself started it. A subagent can start subagents, and a flat list that could not say so would read as though the turn started all of them."),
		background: D().optional().describe("The parent carried on working instead of waiting for it. This is the whole reason the list exists: such a subagent used to be invisible until its result landed, sometimes minutes later."),
		status: Gm.describe("How it is going. Blocked means it needs an answer, which a parent and an operator act on differently from it simply working."),
		startedAt: E().describe("When it started, in milliseconds."),
		endedAt: E().optional().describe("When it finished, in milliseconds. Absent while it works."),
		activityAt: E().describe("When it last did anything, in milliseconds."),
		tokens: E().optional().describe("What it has spent. Its own, so a parent's cost and the sum of its subagents' are two different true numbers."),
		toolUses: E().optional().describe("How many tools it has used."),
		lastTool: T().optional().describe("The last one it reached for."),
		summary: T().optional().describe("Its report: what it concluded, without opening its record. The question a finished subagent gets read for."),
		error: T().optional().describe("Why it failed, when it did."),
		verification: Km.optional().describe("Whether anything proved the work its report describes.")
	}), Jm = k({ sessions: O(qm).describe("Every subagent and child agent this sandbox's conversations have started.") }), Ym = k({ id: T() });
})), Zm, Qm, $m, eh, th, nh, rh = g((() => {
	L(), Zm = M(["messages", "everything"]), Qm = k({
		id: T().describe("The share's own id, minted fresh each time, so sharing one conversation twice gives two links. Deliberately not the conversation's id, which is memorable by design and would make a page's address guessable."),
		conversationId: T().describe("Which conversation it was taken from."),
		title: T().describe("The title on the page, which is the sharer's choice rather than the conversation's own."),
		detail: Zm.describe("How much travels: the two speakers' words alone, or the whole record including the agent's work and thinking, which necessarily publishes the code and command output in it."),
		sharedAt: E().describe("When the snapshot was taken, in milliseconds. A share is frozen, so this dates what a recipient can see rather than when the conversation happened."),
		messages: E().describe("How many messages are behind the link."),
		url: T().optional().describe("The page's address. Absent on a sandbox with nowhere to publish to.")
	}), $m = k({ shares: O(Qm).describe("Every conversation currently published as a page.") }), eh = k({
		conversationId: T().min(1).describe("Which conversation to publish."),
		title: T().min(1).max(80).describe("The title for the page. The conversation's own name is only what a dialog would open with."),
		detail: Zm.describe("How much to publish. Two levels rather than a set of switches, because every extra toggle is another thing to get wrong about a link that cannot be recalled.")
	}), th = k({ id: T().min(1).describe("Which share to re-take. Its link stays the same, which matters because it has already been sent.") }), nh = k({ id: T().min(1).describe("Which share to take down.") });
})), ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh = g((() => {
	L(), V(), rh(), Xm(), Sp(), ih = M([
		"pending",
		"approved",
		"rejected",
		"cancelled"
	]), ah = M([
		"pending",
		"answered",
		"cancelled"
	]), oh = M([
		"pending",
		"allowed",
		"always",
		"denied",
		"cancelled"
	]), sh = M([
		"pending",
		"helped",
		"declined",
		"cancelled"
	]), ch = M([
		"pending",
		"approved",
		"skipped",
		"cancelled"
	]), lh = M([
		"pending",
		"connecting",
		"skipped",
		"cancelled"
	]), uh = k({
		...cp,
		status: ih.describe("Where the decision stands.")
	}), dh = k({
		...lp,
		status: ah.describe("Where the answer stands."),
		answers: j(T(), O(T())).optional().describe("What was chosen, keyed by the question, with the chosen labels or the user's own words.")
	}), fh = qf.extend({
		...up,
		status: oh.describe("Where the decision stands.")
	}), ph = k({
		...dp,
		status: sh.describe("How the hand-over ended.")
	}), mh = k({
		...fp,
		status: sh.describe("How the hand-over ended.")
	}), hh = k({
		...pp,
		status: lh.describe("Where the decision stands."),
		outcome: gp.optional().describe("How an accepted ask's setup ended (the capability_outcome frame).")
	}), gh = k({
		...mp,
		status: ch.describe("Where the decision stands."),
		receipt: _p.optional().describe("How the approved payment ended (the payment_receipt frame).")
	}), _h = k({
		...hp,
		status: ch.describe("Where the decision stands."),
		receipt: vp.optional().describe("Who released it, or that somebody refused (the credential_receipt frame).")
	}), vh = kc(() => k({
		id: T().describe("The call's id."),
		name: T().describe("Which tool."),
		category: np.describe("What kind of thing it does: read, edit, delete, move, search, run, think, fetch. Named the same way whatever the backend called the tool."),
		status: rp.describe("How it went."),
		target: T().optional().describe("What it acted on, in one line: a file, a command, an address."),
		locations: O(ip).optional().describe("The files it touched."),
		content: O(ap).optional().describe("What it produced: text, a change to a file, or a picture."),
		children: O(vh).optional().describe("Calls a delegated subagent made, nested under the call that started it, so a reopened conversation redraws the delegation rather than collapsing it into one result."),
		thinking: T().optional().describe("What the agent was reasoning about around this call."),
		subagent: yh.optional().describe("The helper this call started, as the daemon's registry sees it: what it is, how it is going, what it has spent. What a card can say about a backgrounded child whose result is minutes away.")
	})), yh = k({
		kind: Wm,
		agentType: T().optional(),
		description: T().optional(),
		model: T().optional(),
		provider: T().optional(),
		background: D().optional(),
		status: Gm,
		tokens: E().optional(),
		toolUses: E().optional(),
		lastTool: T().optional(),
		summary: T().optional(),
		error: T().optional(),
		verification: Km.optional()
	}), bh = k({
		title: T().describe("The one line a reader sees, on a row that opens to the text below."),
		text: T().describe("The note itself, which is also exactly what the model was told.")
	}), xh = k({
		costUsd: E().optional(),
		inputTokens: E().optional(),
		outputTokens: E().optional(),
		durationMs: E().optional(),
		numTurns: E().optional()
	}), Sh = k({
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
		tools: O(vh).optional().describe("The tool calls this part of the turn made."),
		todos: O(ep).optional().describe("The agent's task checklist, as of this bubble."),
		usage: xh.optional().describe("What the turn cost, on the bubble its answer ended in."),
		notes: O(bh).optional().describe("What the sandbox added to this message before the model saw it. Carried on the message rather than as rows of their own, because they genuinely were part of what was sent."),
		placed: D().optional().describe("A person wrote this in the agent's voice, with no turn behind it. Marked for the human re-reading the conversation months later, so their own words do not pass as the agent's. The agent itself never sees the mark."),
		noticeAction: M([
			"landHold",
			"outageOptOut",
			"depsInstall",
			"tierHold"
		]).optional().describe("A one-press follow-up this notice offers, by name. The chat decides what it does and whether it still applies."),
		noticeWait: M(["credentialRenewal", "personaRoute"]).optional().describe("The wait this notice describes, by name, so a reader can say whether it is still on."),
		plan: uh.optional().describe("The plan this row asked approval for, and the answer."),
		question: dh.optional().describe("The questions this row asked, and the picks that answered them."),
		permission: fh.optional().describe("The tool this row asked permission for, and the decision."),
		browserHelp: ph.optional().describe("The browser hand-over this row asked for, and how it ended."),
		terminalHelp: mh.optional().describe("The terminal hand-over this row asked for, and how it ended."),
		capabilityOffer: hh.optional().describe("The capability setup this row asked for, the decision, and the outcome."),
		paymentOffer: gh.optional().describe("The payment this row asked for, the decision, and the receipt."),
		credentialOffer: _h.optional().describe("The gated credential this row asked to use, who may release it, and who did.")
	}), Ch = A("op", [
		k({
			op: N("append").describe("A new row at the end."),
			row: Sh
		}),
		k({
			op: N("replace").describe("This row, whole, in place of the one at that index."),
			index: E().int().nonnegative(),
			row: Sh
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
			tool: vh,
			parent: T().optional().describe("The card this one nests under, when it is a delegated subagent's own call.")
		})
	]), wh = k({ messages: O(Sh).describe("The conversation, in order. Each block of the agent's prose is its own message with the tools that block introduced, which is what reproduces the way it actually unfolded.") }), Th = k({
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
	}), Eh = wh.extend({
		sessionId: T().optional().describe("The provider session behind the last turn, when there is one."),
		provider: md.optional().describe("Which provider minted that session."),
		harness: gd.optional().describe("Which runtime minted it: a session resumes only on the loop that opened it."),
		account: T().optional().describe("Which stored account it belongs to, as the daemon resolved it. Absent when no stored account paid for the turn."),
		ending: Th.optional().describe("How the last turn ended, when it left work behind that one press finishes. Absent for a conversation whose last turn ended on its own, and for the failures that name something to repair first."),
		from: E().int().nonnegative().describe("Where the first message sits in the whole record, and the `before` that asks for the page above this one."),
		more: D().describe("Whether older messages precede this page.")
	}), k({
		title: T(),
		sharedAt: E(),
		detail: Zm,
		messages: O(Sh)
	});
})), Oh, kh, Ah, jh, Mh, Nh = g((() => {
	L(), V(), Am(), Mm(), Pm(), qd(), Xm(), Sp(), Dh(), Oh = A("kind", [
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
			conflicts: O(Tm).optional(),
			held: D().optional(),
			deps: k({
				missing: E(),
				started: O(T()),
				deferred: D()
			}).optional()
		}),
		k({
			kind: N("preamble"),
			notes: O(bh)
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
			category: np,
			status: rp,
			target: T().optional(),
			locations: O(ip).optional(),
			content: O(ap).optional(),
			parentToolUseId: T().optional()
		}),
		k({
			kind: N("tool_call_update"),
			id: T(),
			status: rp.optional(),
			content: O(ap).optional(),
			locations: O(ip).optional()
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
			subagentKind: Wm,
			agentType: T().optional(),
			description: T().optional(),
			model: T().optional(),
			provider: T().optional(),
			background: D().optional()
		}),
		k({
			kind: N("subagent_update"),
			id: T(),
			status: Gm.optional(),
			tokens: E().optional(),
			toolUses: E().optional(),
			lastTool: T().optional(),
			summary: T().optional(),
			error: T().optional(),
			verification: Km.optional()
		}),
		k({
			kind: N("todos"),
			items: O(ep)
		}),
		k({
			kind: N("commands"),
			items: O(Zf)
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
		jm.extend({
			kind: N("rate_limit_info"),
			account: T().optional()
		}),
		k({
			kind: N("fast_mode"),
			state: Nm,
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
			windows: O(Pd)
		}),
		tp.extend({ kind: N("context_usage") }),
		k({
			kind: N("compact"),
			trigger: T(),
			preTokens: E().optional(),
			postTokens: E().optional()
		}),
		yp,
		bp,
		xp,
		k({
			kind: N("browser_help"),
			...dp
		}),
		k({
			kind: N("terminal_help"),
			...fp
		}),
		k({
			kind: N("capability_offer"),
			...pp
		}),
		gp.extend({
			kind: N("capability_outcome"),
			requestId: T()
		}),
		k({
			kind: N("payment_offer"),
			...mp
		}),
		_p.extend({
			kind: N("payment_receipt"),
			requestId: T()
		}),
		k({
			kind: N("credential_offer"),
			...hp
		}),
		vp.extend({
			kind: N("credential_receipt"),
			requestId: T()
		}),
		k({
			kind: N("resolved"),
			requestId: T(),
			reply: Hd.optional()
		}),
		k({
			kind: N("mode"),
			mode: Td
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
	]), kh = [
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
	], Ah = Oh.options.filter((e) => kh.includes(e.shape.kind.value)), jh = A("kind", Ah), Mh = A("kind", [
		k({
			kind: N("attached").describe("The first frame, identifying the run you have joined and handing you its transcript so far."),
			run: T().describe("The run's id."),
			startedAt: E().describe("When it started, in milliseconds, so a window joining late can show how long it has been going."),
			seq: E().describe("How many frames the run has produced so far. A fact at or below this number is being replayed; a patch is never."),
			rows: O(Sh).describe("The turn's rows as they stand: what was asked, and everything the agent has said and done since. Draw these, then apply the patches that follow.")
		}),
		k({
			kind: N("patch").describe("One change to the run's rows."),
			seq: E().describe("Its position in the run, counting from one."),
			patch: Ch
		}),
		k({
			kind: N("fact").describe("One thing about the turn that is not a row: its session, its branch, its cost, a failure."),
			seq: E().describe("Its position in the run, counting from one. At or below the head's number, it is being replayed."),
			fact: jh
		}),
		k({ kind: N("end").describe("The run is over and every frame has been delivered. A stream that closes without this was dropped mid-run, so re-attach rather than assuming the turn finished.") })
	]);
})), Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh, Gh = g((() => {
	L(), Ph = M([
		"turn",
		"interval",
		"pre-restore",
		"restore",
		"user"
	]), Fh = k({
		id: T().describe("The saved point's id, which is what restoring and diffing take."),
		at: E().describe("When it was taken, in milliseconds."),
		trigger: Ph.describe("What caused it. The automatic between-turn captures are a safety net and are not listed; they dissolve into the next visible point's differences."),
		label: T().optional().describe("What to call it. For one taken before a turn, that turn's prompt.")
	}), Ih = k({ snapshots: O(Fh).describe("Every point you can go back to, newest first.") }), Lh = k({
		conversationId: T().min(1).describe("Which conversation to rewind."),
		index: E().int().nonnegative().describe("Which message to go back to, counting from the start. It is also how many messages survive: rewinding to the first keeps none of them and puts the files back to before it ran.")
	}), Rh = k({
		snapshot: T().optional().describe("The saved point the files were put back to. Absent for a conversation working in its own copy, whose rewind moved a branch rather than the shared timeline."),
		dropped: E().int().nonnegative().describe("How many messages were removed.")
	}), zh = k({ id: T().min(1).describe("Which saved point.") }), Bh = k({
		scope: T().describe("Which part of the workspace the path belongs to: the workspace root, or one of the repositories inside it."),
		path: T().describe("The path, relative to that scope."),
		status: M([
			"added",
			"modified",
			"deleted",
			"type-changed"
		]).describe("What happened to it.")
	}), Vh = k({ changes: O(Bh).describe("Everything that differs between this saved point and the one before it.") }), Hh = k({
		id: T().min(1).describe("Which saved point."),
		scope: T().min(1).describe("Which part of the workspace the path belongs to."),
		path: T().min(1).describe("The file, relative to that scope.")
	}), Uh = k({
		beforeBytes: E().int().nonnegative().optional().describe("How big the before side is, in bytes. Absent when the file did not exist yet."),
		afterBytes: E().int().nonnegative().optional().describe("How big the after side is, in bytes. Absent when the file was deleted."),
		patch: T().optional().describe("The changed regions as unified-diff hunks (`@@` sections only). Absent when the change was too large to render even as a patch."),
		more: D().optional().describe("There were more changed regions than fit; the patch stops at a region boundary.")
	}), Wh = k({
		before: T().optional().describe("The whole file as it was. Absent when it did not exist yet, or when `partial` is set."),
		after: T().optional().describe("The whole file as it is now. Absent when it was deleted, or when `partial` is set."),
		binary: D().optional().describe("The file is not text, so neither side is sent."),
		partial: Uh.optional().describe("Set when the file was too large to send whole: what is sent instead of the two sides.")
	});
})), Kh, qh = g((() => {
	z(), Sp(), Nh(), V(), Gh(), qd(), W(), Kh = {
		run: R.route({
			method: "POST",
			path: "/agent",
			summary: "Say something to an agent",
			description: "Starts a turn and answers immediately with its id; the work runs inside the sandbox whether or not anybody stays connected. Watch it by attaching. Naming a conversation that does not exist yet opens it."
		}).input(Dd).output(jd),
		attach: R.route({
			method: "POST",
			path: "/agent/attach",
			summary: "Watch a turn happen",
			description: "Streams everything the agent does: its words, the tools it reaches for, and the answers it gets. Give it the point you have already seen and it replays from there before going live, so a reload loses nothing. The window that started the turn holds no special claim, and any number of watchers on any number of devices see the same thing."
		}).input(Md).output(Iu(Mh)),
		reply: R.route({
			method: "POST",
			path: "/agent/reply",
			summary: "Answer a question the agent asked",
			description: "Un-parks a turn that is waiting on you: approving a plan, choosing between options, or permitting a tool. The turn picks up where it stopped."
		}).input(Hd).output(H),
		steer: R.route({
			method: "POST",
			path: "/agent/steer",
			summary: "Interrupt a running turn",
			description: "Slips a message into a turn already under way, without stopping it. This is how you redirect an agent mid-thought rather than waiting for it to finish being wrong."
		}).input(Ud).output(H),
		stop: R.route({
			method: "POST",
			path: "/agent/stop",
			summary: "Stop a turn now",
			description: "Cancels the running turn inside the sandbox. Whatever it had already written to disk stays written."
		}).input(Wd).output(H),
		resume: R.route({
			method: "POST",
			path: "/agent/resume",
			summary: "Run a refused turn again",
			description: "Sends the same turn again when the model provider's allowance refused it, with everything it originally carried except who serves it: the caller may name a different provider, harness or account, which is the usual answer to a spent allowance. It repeats the request rather than adding a new message to the conversation, so pressing it twice costs nothing and the agent is never told to continue work it has not started."
		}).input(Kd).output(jd),
		rewind: R.route({
			method: "POST",
			path: "/agent/rewind",
			summary: "Go back to an earlier message",
			description: "Puts the files back as they stood at that point, drops every message after it, and forgets what the model remembered, so the next thing you say starts from there cleanly. Refused while a turn is running, because a restore cannot overwrite files an agent is editing, and refused for a message with no saved state to return to."
		}).input(Lh).output(Rh),
		commands: R.route({
			method: "GET",
			path: "/agent/commands",
			summary: "Shortcut commands the agent knows",
			description: "The commands a provider published the last time one of its turns ran, so a composer can offer them before this conversation has run anything. A running turn's own list wins over this one."
		}).input(Qf).output($f),
		refusals: R.route({
			method: "GET",
			path: "/agent/refusals",
			summary: "The last time each provider said no",
			description: "What each model provider most recently refused and why. Read this alongside an account's usage: the usage says how full it was when last checked, this says whether it has since started turning work away."
		}).output(zd)
	};
})), Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg, cg, lg, ug, dg = g((() => {
	L(), pd(), Jh = M([
		"crash",
		"report",
		"detection"
	]), Yh = k({
		at: E().describe("When, in milliseconds."),
		kind: T().max(40).describe("What sort of thing it was: a console line, a request, a click, a route change."),
		message: T().max(300).describe("What it said, already truncated by the SDK.")
	}), Xh = k({
		email: T().max(320).optional().describe("An address they typed, to reach them about it. Unverified."),
		name: T().max(200).optional().describe("A name they typed. Unverified, and never identity.")
	}), Zh = 20, Qh = j(T().max(60), T().max(300)).refine((e) => Object.keys(e).length <= Zh, { message: `at most ${Zh} context entries` }), $h = k({
		kind: Jh.describe("A crash the SDK caught, something a person wrote in, or a problem the SDK noticed on its own."),
		message: T().min(1).max(1e3).describe("The error's own message, or the headline of what a person reported."),
		stack: T().max(2e4).optional().describe("The stack, verbatim from the browser."),
		url: T().max(2e3).optional().describe("Where it happened: the page's address, or a screen name in an app."),
		release: T().max(200).optional().describe("Which build it came from: a commit sha or a tag. With it the agent reads your real source rather than minified frames."),
		userAgent: T().max(400).optional().describe("What the browser said it was."),
		description: T().max(5e3).optional().describe("What the person typed, when a person is the one reporting."),
		reporter: Xh.optional().describe("Who says they are reporting it. Unverified by construction."),
		breadcrumbs: O(Yh).max(40).optional().describe("What happened just before, oldest first."),
		context: Qh.optional().describe("Whatever else the app attached: a route, a version, a locale."),
		fingerprint: T().max(200).optional().describe("Group by this instead of by the stack, when your app knows better than the stack does.")
	}), k({
		report: $h,
		clientId: T().min(1).max(200).describe("The SDK's own id for this browser. Not a secret: it is what the rate limit counts against."),
		powNonce: T().max(400).optional(),
		key: T().max(200).optional()
	}), eg = M([
		"open",
		"investigating",
		"resolved",
		"ignored"
	]), tg = k({
		conversationId: T().describe("The conversation this run became."),
		at: E().describe("When it started, in milliseconds."),
		atCount: E().describe("How many times it had happened when this run started.")
	}), ng = k({
		kind: Jh,
		title: T().min(1).max(300).describe("The one line this is listed under."),
		culprit: T().max(300).optional().describe("The frame it came from, when the stack named one."),
		automationId: B.describe("Which intake received it."),
		origin: T().max(400).optional().describe("Which site it came from."),
		firstSeen: E().describe("When it first happened, in milliseconds."),
		lastSeen: E().describe("When it last happened, in milliseconds."),
		count: E().describe("How many times this exact thing has arrived."),
		status: eg.default("open").describe("Where it stands with you."),
		statusAt: E().optional().describe("When the status last changed, in milliseconds."),
		release: T().max(200).optional().describe("The build the latest one came from."),
		sample: $h.describe("The most recent one, in full."),
		firedAt: E().optional().describe("What the count stood at the last time this woke an agent."),
		runs: O(tg).max(20).optional().describe("The turns started for it.")
	}), rg = ng.extend({ id: B.describe("The issue's id, which is its fingerprint.") }), ig = k({
		issues: O(rg).describe("The inbox, most recently seen first."),
		invalid: O(T()).describe("Files in the issues directory that could not be read at all.")
	}), ag = k({ id: B.describe("Which issue.") }), og = k({
		id: B.describe("Which issue."),
		status: M([
			"open",
			"resolved",
			"ignored"
		]).describe("Where it now stands with you.")
	}), sg = k({
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
	}), cg = k({
		origin: T(),
		allowed: D(),
		lastSeenAt: E(),
		loads: E()
	}), lg = k({ origins: O(cg) }), ug = k({ automationId: B.describe("Which intake.") });
})), fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg = g((() => {
	L(), V(), Am(), pd(), dg(), fg = M([
		"turn.settled",
		"agent.landed",
		"deps.broken",
		"deps.fixed"
	]), k({
		event: fg,
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
	}), pg = A("kind", [
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
			event: fg.describe("Which happening."),
			repo: T().min(1).optional().describe("Narrow it to one repository. Absent means any of them.")
		})
	]), mg = k({
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
	}), hg = k({
		label: T().max(60).optional().describe("What to call these people on screen."),
		ids: O(T().min(1).max(200)).max(200).optional().describe("Sender ids, as the service names them, never display names."),
		groups: O(T().min(1).max(200)).max(50).optional().describe("Group ids the service reports on a sender, a Discord role. Only for a source whose messages carry them."),
		actsAs: B.optional().describe("Which persona their wakes speak as. Absent is no persona: the full toolbox, reaching no account."),
		requireApproval: D().optional().describe("Hold their wakes for a person, even when the automation itself does not.")
	}).refine((e) => (e.ids?.length ?? 0) + (e.groups?.length ?? 0) > 0, { message: "a sender rule must name at least one id or group" }), gg = k({
		rules: O(hg).max(50).describe("Walked in order; the first rule naming the sender decides."),
		others: M([
			"allow",
			"hold",
			"ignore"
		]).describe("What a sender no rule names gets: the automation as configured, a hold for a person, or nothing at all.")
	}), _g = k({
		id: B.describe("The automation's id."),
		trigger: pg.describe("What sets it off: a schedule, an event in the workspace, a message arriving from outside, or a webhook."),
		guard: T().min(1).optional().describe("A command run before the wake that decides whether there is anything to do. Skipped by the guard is often the most useful thing an automation can report."),
		prompt: T().min(1).describe("What the woken agent is told."),
		webchat: mg.optional().describe("Settings for the public chat widget, for an automation that answers visitors."),
		issues: sg.optional().describe("Settings for the bug reporter, for an automation that takes crash reports from your own sites and apps."),
		allowedTools: O(T().min(1)).optional().describe("Narrow the woken turn to these tools. For one driven by an outside message this list is the real boundary, because prompt wording is only advice and an empty toolbox is not."),
		models: O(Ad).min(1).max(10).describe("Which models this automation may run on, best first. Required, and nothing is chosen for you: work that fires while nobody is watching spends a real allowance, so it names the models it spends rather than inheriting one. Tried in order, so a spent account does not silently stop the job."),
		account: T().optional().describe("Which account pays for it."),
		actsAs: B.optional().describe("Which persona it speaks as. An unwatched turn naming none reaches no signed-in account at all."),
		senders: gg.optional().describe("Who may talk to it, and as whom: rules by sender id or group, each naming the persona those people get, plus what everyone else gets. Absent admits everyone the trigger's filters do."),
		requireApproval: D().optional().describe("Hold every fire for a person instead of running it. Only a person can release one of those."),
		holdForSeconds: E().optional().describe("Hold each fire this long before running it anyway, which is a delay rather than a decision."),
		chore: D().optional().describe("This automation is a maintenance job, which is what files it under chores rather than among ordinary automations."),
		enabled: D().describe("Whether it fires at all.")
	}), vg = k({
		id: B.describe("This waiting item's own id, which approving and rejecting take."),
		automationId: T().describe("Which automation it came from."),
		payload: T().optional().describe("What set it off, kept whole so an approved wake carries the same thing it would have had. Absent for one on a schedule, which carries nothing."),
		origin: bd.optional().describe("Where the message came from, kept alongside the payload so an approved wake appears on the board exactly as an automatic one would have."),
		title: T().optional().describe("What the conversation would be called."),
		conversationId: T().optional().describe("The thread this belongs to, when it has one, so approving continues that conversation rather than opening a new one. Without it, one visitor's chat becomes a card per approved message and an agent that meets them again every turn."),
		sessionId: T().optional().describe("The provider session that thread last ran on."),
		thread: T().optional().describe("Which inbound thread this belongs to, so the approved run continues that thread's memory rather than a fresh one."),
		actsAs: B.optional().describe("Which persona the approved run speaks as, decided when it was held."),
		createdAt: E().describe("When it started waiting, in milliseconds."),
		autoRunAt: E().optional().describe("When it goes ahead on its own, in milliseconds, for a hold that is only a delay. Absent for one that genuinely waits on a person.")
	}), yg = k({
		agents: O(im).describe("The conversations."),
		rev: E().describe("Which version of the fleet this is. The fleet is published as whole snapshots, so without a version a list read before a change but delivered after it would silently undo that change. Drop any list older than the newest you have already applied."),
		held: O(vg).default([]).describe("Automations waiting at the door for a yes, put alongside the running conversations so needs-you sits beside working rather than on a page nobody opens.")
	}), bg = k({ approvals: O(vg).describe("Everything waiting for a yes.") }), xg = k({ id: T().describe("Which waiting item.") }), Sg = k({
		at: E(),
		outcome: M([
			"completed",
			"skipped",
			"error",
			"interrupted"
		]),
		detail: T().optional(),
		conversationId: T().optional()
	}), Cg = _g.extend({
		runs: O(Sg),
		nextRun: E().optional(),
		webhookToken: T().optional().describe("What a caller presents at /automations/{id}/fire, for an event automation. Shown to a maintainer or the owner only."),
		ingestKey: T().optional().describe("What a client with no website origin presents to a bug intake. Shown to a maintainer or the owner only.")
	}), wg = k({ automations: O(Cg) }), Tg = k({
		id: T().describe("The sender id the service vouches for, what a rule stores."),
		name: T().describe("What they were called on their last message, for display only."),
		groups: O(T()).optional().describe("The group ids the service reported on their last message, a Discord role list."),
		firstSeenAt: E().describe("When they first reached an automation here, in milliseconds."),
		lastSeenAt: E().describe("When they last did, in milliseconds."),
		messages: E().describe("How many of their messages reached an automation's filters, admitted or not.")
	}), Eg = k({ senders: O(Tg).describe("Newest first.") }), Dg = k({ provider: T().min(1).describe("Which listener source.") }), Og = k({ id: T() }), kg = k({
		id: T(),
		enabled: D()
	}), Ag = k({
		label: T().min(1),
		placeholder: T().min(1),
		hint: T().min(1).optional()
	}), jg = k({
		provider: T().min(1),
		label: T().min(1),
		logo: T().min(1).optional(),
		icon: T().min(1).optional(),
		events: O(k({
			value: T().min(1),
			label: T().min(1)
		})),
		channel: Ag,
		branchField: Ag.optional(),
		sender: Ag.optional(),
		senderGroup: Ag.optional(),
		mentionLabel: T().min(1).optional(),
		starterPrompt: T().min(1).optional(),
		requires: O(T().min(1)).default([]),
		enabled: D()
	}), Mg = M(["create", "configure"]), Ng = k({
		id: T().min(1),
		title: T().min(1),
		logo: T().min(1).optional(),
		icon: T().min(1).optional(),
		requires: O(T().min(1)).default([]),
		trigger: pg,
		guard: T().min(1).optional(),
		holdForSeconds: E().int().positive().optional(),
		prompt: T().min(1),
		note: T().min(1).optional(),
		setup: T().min(1).optional(),
		description: T().min(1).optional(),
		offer: Mg.optional(),
		chore: D().optional()
	}), Pg = k({
		sources: O(jg),
		templates: O(Ng)
	});
})), Ig, Lg, Rg, zg, Bg, Vg, Hg, Ug, Wg, Gg, Kg, qg, Jg = g((() => {
	L(), V(), Ig = M(["github", "gitlab"]), Lg = M([
		"queued",
		"running",
		"success",
		"failed",
		"canceled",
		"skipped"
	]), Rg = k({
		repo: T().describe("Which workspace repository it belongs to."),
		host: Ig.describe("Which forge is running it."),
		project: T().describe("The project there, as that forge names it."),
		runId: E().describe("The forge's own id for the run, which is what re-running and cancelling take."),
		title: T().optional().describe("The run's headline, usually the commit subject or the pull request's title. Absent means falling back to the branch and commit."),
		authorName: T().optional().describe("Who the forge credits for setting it off."),
		authorAvatarUrl: T().optional().describe("Their picture, hosted by the forge. Absent means drawing their initials instead."),
		trigger: T().optional().describe("What set it off, in the forge's own word rather than flattened into a shared vocabulary, because the forge's word is the precise one."),
		branch: T().describe("Which branch."),
		sha: T().describe("Which commit."),
		status: Lg.describe("How it is going. Queued means the forge has accepted it and nothing is executing it yet, which is a different thing to wait on than a run actually in progress."),
		url: T().describe("Its page on the forge."),
		createdAt: E().describe("When it started, in milliseconds."),
		durationSeconds: E().optional().describe("How long it took."),
		failedJobs: O(T()).optional().describe("What broke, by name. Fetched only for failed runs, so that a notification or a screen can say what went wrong rather than just that something did.")
	}), zg = k({
		name: T().describe("The job's name."),
		status: Lg.describe("How it went."),
		stage: T().optional().describe("Which stage it belongs to, where the pipeline groups its jobs that way."),
		needs: O(T()).optional().describe("Which jobs in this run it declared it waits on: the real shape of the pipeline. Absent means nothing could be read, which is different from an empty list, which is the claim that it waits on nothing."),
		startedAt: E().optional().describe("When it began, in milliseconds. Absent while it is queued."),
		finishedAt: E().optional().describe("When it ended, in milliseconds."),
		durationSeconds: E().optional().describe("How long it took."),
		webUrl: T().optional().describe("Its page on the forge, which is the shortest path from this step failed to the log that says why.")
	}), Bg = k({ jobs: O(zg).describe("The steps inside one run. Fetched separately from the run list, so that list stays cheap.") }), Vg = k({
		repo: T().describe("Which workspace repository."),
		host: Ig.describe("Which forge it lives on."),
		project: T().describe("The project there."),
		url: T().describe("Its page on the forge."),
		hookWarning: T().optional().describe("Present when the sandbox could not register for instant notifications, with what happened. Without them the sandbox polls instead, so this costs a couple of minutes' delay rather than the feature."),
		hookRecipe: T().optional().describe("What to paste into the repository's webhook settings by hand, secret included. Shown to a maintainer or the owner only.")
	}), Hg = k({
		repos: O(Vg).describe("Which workspace repositories are wired to a forge, and how each one's notifications are set up."),
		runs: O(Rg).describe("Runs across all of them, newest first.")
	}), Ug = k({
		repo: T().describe("Which workspace repository. The project behind it is resolved fresh each call, so a stale screen cannot act on one the workspace no longer maps to."),
		runId: E().describe("Which run, by the forge's own id.")
	}), Wg = Ug.extend({
		pick: Od.describe("Which model to open the conversation on, when somebody chose one. Leave it out for the sandbox's own choice, which is the ordinary path."),
		mode: M(["continue", "start-over"]).optional().describe("What to do about the attempt already made at this run, when there is one. `continue` carries on in that conversation; `start-over` stops it if running, files it away, and opens the next attempt on a clean worktree. Leave it out for the plain press: an attempt that ended is continued, a fresh failure gets attempt 1, and one still in play answers CONFLICT with why."),
		force: D().optional().describe("Open the conversation even when every failed job died in its runner's own setup, which is the fleet's fault and nothing an agent on the code can repair. Left out, such a run is refused with that sentence.")
	}), Gg = k({ conversationId: T().describe("The conversation that was opened, already holding the failure. Open it to watch, or attach to its turn.") }), Kg = M([
		"idle",
		"running",
		"passed",
		"failed",
		"error",
		"cancelled"
	]), qg = k({
		status: Kg.describe("Where the run is. Failed and error are deliberately different: failed means the code is wrong, error means the command could not be run at all, and calling the second one a test failure would send an agent hunting a bug that is not there."),
		command: T().describe("What actually ran, echoed here rather than read back from the settings, so a result looked at after the setting changed still says what produced it."),
		startedAt: E().optional().describe("When it began, in milliseconds."),
		finishedAt: E().optional().describe("When it ended, in milliseconds."),
		exitCode: E().optional().describe("How the command exited."),
		timedOut: D().optional().describe("It was killed for taking too long rather than finishing."),
		session: T().optional().describe("The terminal it runs in, which is where to watch it. Absent where the sandbox has no terminals, in which case there is nothing to attach to."),
		output: T().describe("The end of what it printed, as plain text with the colour codes and redrawn progress lines resolved away. The end rather than the beginning, because a suite's verdict is at the end. Empty while it runs, and for one that was killed.")
	});
})), Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_, c_, l_, u_, d_, f_, p_, m_, h_, g_, __, v_, y_, b_, x_, S_, C_, w_, T_, E_, D_, O_, k_, A_, j_, M_, N_, P_, F_, I_ = g((() => {
	L(), V(), Am(), Jg(), pd(), W(), Yg = M([
		"staged",
		"unstaged",
		"conflicted"
	]), Xg = k({
		side: Yg.optional().describe("Narrow to one of the three lists a repository's changes split into. Leave it out for all of them, which is the whole repository."),
		origin: T().min(1).optional().describe("Narrow to the files one conversation landed. Leave it out for everyone's, including your own edits.")
	}), Zg = 1e3, Qg = O(T().min(1)).max(Zg).describe("Exactly these repository-relative paths. For anything bigger than a hand-picked selection, describe a scope instead."), $g = k({
		paths: Qg.optional(),
		scope: Xg.optional().describe("What to act on, described rather than listed, so it covers every matching file in the repository and not just the ones a list could hold.")
	}), e_ = { message: "name paths or a scope, not both" }, t_ = (e) => e.paths === void 0 || e.scope === void 0, n_ = U.extend({
		message: T().min(1).describe("The commit message."),
		stage: $g.refine(t_, e_).optional().describe("What to stage before committing. Leave it out to record the index exactly as it stands; give it an empty object to stage everything first.")
	}), r_ = U.extend($g.shape).describe("What to throw away. Neither paths nor a scope discards every uncommitted change in the repository.").refine(t_, e_), i_ = U.extend($g.shape).describe("What to move across the index. Nothing on disk changes either way.").refine(t_, e_), a_ = U.extend({ branch: T().min(1).optional().describe("Which branch to push. Leave it out for the checked-out one. A branch with no upstream yet gets one set on this push.") }), o_ = M([
		"hook",
		"remote",
		"transport"
	]), s_ = qg.extend({
		repo: T().describe("The repository this run is about, the same id the routes take."),
		reason: T().optional().describe("Why not, in git's own words: the last verdict line, for a row that has room for one line. The whole tail is `output`."),
		refusedBy: o_.optional().describe("Who refused a failed push: this repository's pre-push hook (the code is wrong, a fix is worth proposing), the remote (pull first), or the transport (credentials, network: retry). Absent while it runs and for a push that went.")
	}), c_ = U.extend({ path: T().min(1).describe("The file to read, relative to the repository root.") }), l_ = U.extend({
		path: T().min(1).describe("Where to write, relative to the repository root. Missing folders are created."),
		content: T().describe("The file's whole new contents.")
	}), u_ = U.extend({
		path: T().min(1).describe("The file, relative to the repository root."),
		side: Yg.describe("Which comparison you want. A file that is staged and then edited again has genuinely different answers for each, which is why this is required rather than assumed.")
	}), d_ = k({
		branch: T().describe("The checked-out branch."),
		dirty: D().describe("Whether anything is uncommitted."),
		files: O(T()).describe("Every path with something pending, staged or not.")
	}), f_ = k({ files: O(T()).describe("Every path git tracks, relative to the repository root. Ignored and untracked files are not here.") }), p_ = k({
		path: T().describe("The path, as asked for."),
		content: T().describe("The file's contents as they stand on disk.")
	}), k({ repo: T().min(1).describe("Which repository.") }).extend($g.shape).refine(t_, e_), m_ = k({
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
	}), h_ = k({
		remote: T().optional().describe("The remote this branch pushes to. Absent means none is configured. In a fork with two remotes, pushing to the wrong one succeeds and leaves the count stuck, which is why this says which."),
		branch: T().optional().describe("The checked-out branch. Absent when the repository is on a bare commit, or has no commits yet."),
		upstream: T().optional().describe("The branch on the remote this one follows. Absent means the next push will publish it."),
		ahead: E().describe("Commits you have that the remote does not."),
		behind: E().describe("Commits the remote has that you do not, as of the last fetch. Fetch before trusting it.")
	}), g_ = k({
		name: T().describe("The branch name."),
		current: D().describe("Whether this is the one checked out."),
		upstream: T().optional().describe("The branch on the remote it follows, if any."),
		ahead: E().describe("Commits this branch has that its remote counterpart does not."),
		behind: E().describe("Commits its remote counterpart has that it does not."),
		gone: D().optional().describe("The branch it followed no longer exists on the remote, usually because a merged pull request deleted it. The signal that this one is safe to delete."),
		at: E().describe("When its tip was committed, in milliseconds. Lists are newest first.")
	}), __ = k({
		name: T().describe("The full name, such as origin/main."),
		remote: T().describe("Just the remote part, so a picker can group by it without re-parsing."),
		branch: T().describe("Just the branch part."),
		at: E().describe("When its tip was committed, in milliseconds, as this repository last saw it.")
	}), v_ = k({
		branches: O(g_).describe("Branches in this repository."),
		remotes: O(__).describe("Branches on its remotes, as last seen. Sent together with the locals so a switcher never draws a half-filled list.")
	}), y_ = U.extend({
		name: dd.describe("The new branch's name."),
		start: T().min(1).optional().describe("Where to start it: a commit or another branch. Leave it out to start from where you are."),
		checkout: D().optional().describe("Switch to it as well as creating it.")
	}), b_ = U.extend({
		name: dd.describe("The branch to delete."),
		force: D().optional().describe("Delete it even though it holds work that was never merged. The deliberate retry after the first attempt refuses.")
	}), x_ = M([
		"merge",
		"rebase",
		"cherry-pick",
		"revert"
	]), S_ = k({
		repo: T().describe("The repository asked about."),
		operation: x_.optional().describe("Which operation the working tree is stuck inside. Absent means it is not stuck at all, which is almost always. While one is present git refuses nearly everything else, and abandoning it is the only way out.")
	}), C_ = k({
		repo: T(),
		branch: T().optional().describe("The checked-out branch. Absent in a repository that has no commits yet."),
		conflicted: O(m_).describe("Paths a merge or rebase could not finish. First, because nothing anywhere in this repository can be committed until they are resolved. Held apart from the two lists below, because staged or not is not a question one of these has an answer to."),
		operation: x_.optional().describe("What halted, when something did. This is the sentence that explains the conflicts above and names the way out of them."),
		staged: O(m_).describe("What a plain commit would record right now."),
		unstaged: O(m_).describe("Edits on disk that are not staged, plus untracked files. A path can be in both lists at once with different line counts, which is why they are separate."),
		truncated: k({
			staged: E().describe("Staged changes not listed above."),
			unstaged: E().describe("Unstaged changes not listed above.")
		}).optional().describe("How many changes were cut from each of the two lists above. A freshly cloned monorepo or a mass delete runs to six figures, which no screen can draw, so past a budget the lists arrive short and this says by how much on each side. Absent means they are complete."),
		remote: h_.optional().describe("Where this repository stands against its remote."),
		origins: j(T(), O(T())).optional().describe("Which conversation put each path here, newest first, keyed by path. Only work that went through a merge can appear: edits made in the shared tree, in a terminal, or by a person are simply absent rather than guessed at."),
		error: T().optional().describe("Why the repository could not be read at all, in git's own words. A repository left broken by a failed import arrives with empty lists and this set, rather than vanishing from the answer with nothing to act on.")
	}), w_ = k({
		title: T().optional().describe("The conversation's title. Absent for one that never got as far as having a title."),
		provider: md.describe("Which model provider it ran on."),
		landedMessage: em.optional().describe("What the merged work did, drafted by the conversation itself. Carried here as well as on its card, because merged lines outlive the card: archiving a finished conversation does not uncommit its work.")
	}), T_ = k({
		repos: O(C_).describe("One entry per repository that has something pending, is out of step with its remote, or could not be read. A clean repository is simply absent."),
		originAgents: j(T(), w_).optional().describe("Who each conversation named above is, keyed by id, so a caller need not look them up. Absent when nothing in the review can be attributed."),
		committing: O(T()).optional().describe("Repositories with a commit running right now. The sandbox's answer rather than any one tab's, so a reload, a second window and another device all know. Absent means nothing is committing.")
	}), E_ = k({
		committed: D().describe("Whether a commit was actually recorded."),
		changes: C_.optional().describe("What this repository looks like now, read in the same breath as the commit so a caller can redraw from here instead of asking for a fresh scan. Absent means there is nothing left to show."),
		originAgents: j(T(), w_).optional().describe("Who the conversations named in those changes are. Merge it over what you already hold rather than replacing: other repositories still name their own.")
	}), D_ = k({
		dir: T().describe("Where the package lives, relative to its repository. Empty when the repository is itself one package."),
		name: T().describe("The name the package declares for itself.")
	}), O_ = k({
		repo: T().describe("Which repository."),
		modules: O(D_).describe("Its packages.")
	}), k_ = k({ repos: O(O_).describe("Every repository with the packages inside it.") }), A_ = m_.extend({ landed: D().describe("Whether your workspace already holds this content. Read from the tree at request time, not from what a land recorded: discard a landed file in the Changes panel and this goes back to false, which is what puts it back under Land now.") }), j_ = k({
		repo: T().describe("Which repository."),
		branch: T().optional().describe("The branch this conversation's work sits on."),
		changes: O(A_).describe("What it changed there."),
		modules: O(D_).describe("The packages of the tree these changes came from, so a review can group by package. Carried with the changes rather than looked up separately, because a package the conversation has just created exists only in its own copy and the shared tree has never heard of it.")
	}), M_ = k({
		repos: O(j_).describe("One entry per repository the conversation touched."),
		absorbed: E().describe("How many of this conversation's files your own history already carries, and which are therefore not listed as differences any more."),
		conflicts: O(Tm).optional().describe("Why the last merge refused, when one did. Carried here as well as in the merge's own answer, because a conflict is found the moment a turn ends and dealt with hours later on this surface, which would otherwise open with nothing to explain what it promised to resolve.")
	}), N_ = k({
		sha: T().describe("The commit."),
		short: T().describe("Its abbreviated hash, which is what a reader recognises it by."),
		subject: T().describe("Its first line."),
		author: T().describe("Who committed it."),
		at: E().describe("When it was authored, in milliseconds."),
		changes: O(m_).describe("The conversation's files that this commit is the newest carrier of, as the conversation changed them. Every file appears under exactly one commit, so these counts add up to the work rather than over-counting a file that history touched twice.")
	}), P_ = k({
		repo: T().describe("Which repository."),
		commits: O(N_).describe("The commits carrying this conversation's work there, newest first."),
		modules: O(D_).describe("The packages of the tree these files came from, so a review can group them by package.")
	}), F_ = k({
		repos: O(P_).describe("One entry per repository holding committed work of this conversation."),
		unaccounted: E().describe("How many of the conversation's absorbed files none of these commits carries. Above zero means its content reached your main line by some other road, so the commits listed are not the whole story.")
	});
})), L_, R_ = g((() => {
	z(), Dh(), Am(), Fg(), I_(), Gh(), W(), L_ = {
		list: R.route({
			method: "GET",
			path: "/agents",
			summary: "Every live conversation",
			description: "The fleet as the board draws it: each conversation with its title, what it is doing, when it last moved and whether anybody has read it since. Archived conversations are not in here."
		}).output(yg),
		archived: R.route({
			method: "GET",
			path: "/agents/archived",
			summary: "Conversations put away",
			description: "The same shape as the live fleet, for the conversations somebody has decided are finished. Their work is kept, and any one of them can be brought back."
		}).output(yg),
		search: R.route({
			method: "GET",
			path: "/agents/search",
			summary: "Find a conversation",
			description: "Searches the live fleet and the archive together. Both halves on purpose: the board hides finished work by design, and a filter that says it found nothing while the answer sits one click away is simply wrong."
		}).input(fm).output(gm),
		get: R.route({
			method: "GET",
			path: "/agents/{id}",
			summary: "One conversation's card",
			description: "Everything the board shows for a single conversation: its title, state, working branch, unread marker and timestamps."
		}).input(am).output(im),
		transcript: R.route({
			method: "GET",
			path: "/agents/{id}/transcript",
			summary: "One page of a conversation",
			description: "The most recent turns of one conversation, in order, including the tool calls and their results: what the chat replays and the next turn is seeded from. A page, not the whole record — pass the answer's `from` back as `before` to walk further back, until `more` reads false."
		}).input(om).output(Eh),
		place: R.route({
			method: "POST",
			path: "/agents/{id}/place",
			summary: "Put words in the agent's mouth",
			description: "Writes a line into the record as though the agent had said it, with no turn behind it and no reply. Human readers see it marked as placed. The next real turn starts fresh from the record, where the line reads as the agent's own. Refused while a turn is running."
		}).input(vm).output(H),
		rename: R.route({
			method: "POST",
			path: "/agents/{id}/rename",
			summary: "Retitle a conversation",
			description: "Sets the title a person chose, replacing the one that was generated. Allowed while the conversation is working, and it does not count as activity."
		}).input(_m).output(im),
		autoLand: R.route({
			method: "POST",
			path: "/agents/{id}/auto-land",
			summary: "Whether this conversation merges its work automatically",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to go back to following the default. Deliberately allowed mid-turn, because the setting is read when the turn finishes, so flipping it while the agent works means exactly hold this piece of work for review."
		}).input(ym).output(im),
		resumeAfterOutage: R.route({
			method: "POST",
			path: "/agents/{id}/resume-after-outage",
			summary: "Whether this conversation retries after a provider outage",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. This is what the offer shown when a turn dies writes, because the press happens inside one conversation and honestly means finish this piece of work."
		}).input(bm).output(im),
		resumeAfterLimit: R.route({
			method: "POST",
			path: "/agents/{id}/resume-after-limit",
			summary: "Whether this conversation sends itself again when its allowance comes back",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. Off unless asked for, because the allowance is the user's own budget and a turn that spends it the moment it reopens is not a decision to make on their behalf."
		}).input(xm).output(im),
		moveAfterLimit: R.route({
			method: "POST",
			path: "/agents/{id}/move-after-limit",
			summary: "Whether this conversation moves to another account when its allowance is spent",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. A move spends a second account of the same provider on this conversation's behalf, so it is off unless asked for."
		}).input(Sm).output(im),
		seen: R.route({
			method: "POST",
			path: "/agents/{id}/seen",
			summary: "Mark a conversation read",
			description: "Stamps the read marker behind the unread badge on one card. Allowed while the conversation is working, and reading never counts as activity."
		}).input(am).output(im),
		stopWatching: R.route({
			method: "POST",
			path: "/agents/{id}/stop-watching",
			summary: "Stop every condition watch a conversation is parked on",
			description: "Disarms all of this conversation's outside-condition watches, so none of them will wake it. All of them rather than one, because that is what the press means when it is made about a card. Nothing else about the conversation changes."
		}).input(am).output(im),
		seenAll: R.route({
			method: "POST",
			path: "/agents/seen",
			summary: "Mark every conversation read",
			description: "Clears the unread badge across the whole fleet at once, and hands the refreshed list back."
		}).output(yg),
		diff: R.route({
			method: "GET",
			path: "/agents/{id}/diff",
			summary: "Everything a conversation has changed",
			description: "One flat set of changed files per repo, measured against where each repo stood when the conversation started, with every file flagged as already merged or not. Not the staged-and-unstaged shape a working copy has, because nobody ever checks this branch out to stage into it."
		}).input(am).output(M_),
		history: R.route({
			method: "GET",
			path: "/agents/{id}/history",
			summary: "Where a conversation's committed work lives",
			description: "The commits in your own history that carry this conversation's work, with the files each one brought. Use it when the change list is empty or short because you already committed what it wrote: those files are not differences against the main line any more, so they are not in the review, and this is where they went."
		}).input(am).output(F_),
		fileDiff: R.route({
			method: "GET",
			path: "/agents/{id}/{repo}/file-diff",
			summary: "One file's before and after in a conversation's work",
			description: "Both sides of a single file: what it held when the conversation started and what it holds on its branch now."
		}).input(Cm).output(Wh),
		land: R.route({
			method: "POST",
			path: "/agents/{id}/land",
			summary: "Merge a conversation's work into the workspace",
			description: "Brings the conversation's branches into the main tree, one repo at a time. A conflict is reported rather than raised and nothing is lost when it fails. Refused while a turn is running, and refused for a conversation that works directly in the shared tree, which has nothing to merge."
		}).input(km).output(Em),
		requestLand: R.route({
			method: "POST",
			path: "/agents/{id}/request-land",
			summary: "Ask a maintainer to merge this work",
			description: "For a collaborator who is not allowed to merge: marks the conversation as waiting for review, with who asked. The request shows on every maintainer's board and clears when somebody merges or discards it."
		}).input(am).output(im),
		discard: R.route({
			method: "POST",
			path: "/agents/{id}/discard",
			summary: "Throw a conversation's work away",
			description: "Deletes the conversation's working copies, its branches and its entry. Nothing is kept. Refused while a turn is running, and refused for a conversation working in the shared tree."
		}).input(am).output(H),
		archive: R.route({
			method: "POST",
			path: "/agents/archive",
			summary: "Put conversations away",
			description: "The gentle counterpart to discarding. Commits whatever the conversation still has in progress onto its own branch, releases its working copy, and keeps the entry and the record. It leaves the live fleet and joins the archive. Refused for a conversation that is running."
		}).input(sm).output(um),
		unarchive: R.route({
			method: "POST",
			path: "/agents/unarchive",
			summary: "Bring conversations back",
			description: "Returns archived conversations to the live fleet. The next turn picks up a fresh working copy from the branch that was kept."
		}).input(cm).output(lm),
		purge: R.route({
			method: "POST",
			path: "/agents/purge",
			summary: "Empty the archive for good",
			description: "Discards every conversation already in the archive: working copies, branches and entries. The whole archive rather than a chosen few, because the archive is the pile somebody has already decided is over. A teardown that fails on one conversation leaves that one behind instead of taking the rest down with it."
		}).output(dm)
	};
})), z_, B_, V_, H_, U_, W_, G_, K_, q_, J_, Y_ = g((() => {
	L(), pd(), M(["post", "action"]), z_ = M([
		"proposed",
		"approved",
		"running",
		"done",
		"failed"
	]), B_ = {
		actsAs: B.optional().describe("Whose name it acts under. Needed for anything that requires being logged in, because an unwatched turn naming nobody is allowed no account at all. Never guessed: one site can be connected five times over, and picking for you means picking wrong in public with no undo."),
		scheduledAt: E().optional().describe("When it should happen, in milliseconds. An agent may propose without one and you set it when approving; an approved item with no time goes after a short countdown you can still stop."),
		status: z_.default("proposed").describe("Where it is: proposed by the agent, approved by you, being carried out, done, or failed. Rejecting is deleting it; retrying is approving a failed one again."),
		createdAt: E().optional().describe("When it was written, in milliseconds."),
		startedAt: E().optional().describe("When it started being carried out, in milliseconds. Needed to tell a run that is under way from one whose turn died mid-flight, which the scheduled time cannot."),
		finishedAt: E().optional().describe("When it was done, in milliseconds."),
		result: T().optional().describe("What came back, when something did: the post's own address, a confirmation number. The one thing a finished item can offer that reading it cannot."),
		error: T().optional().describe("Why it failed, written as a sentence for a person to read rather than as a code.")
	}, V_ = k({
		kind: N("post").describe("A post to publish somewhere."),
		platform: T().min(1).describe("Where it should go. A plain name, so a new site needs no change here; an unknown one simply fails when it tries to post."),
		content: T().min(1).describe("The post itself."),
		title: T().optional().describe("A title, where the site wants one."),
		target: T().optional().describe("Where on the site: a community, a channel. Or the address of the thing this replies to, in which case it is a reply, and on some sites the difference between a thread's address and one comment's is the difference between talking to the room and answering the person."),
		media: O(T()).optional().describe("Anything to attach, as workspace paths."),
		...B_
	}), H_ = k({
		kind: N("action").describe("Something the agent will do once you say so."),
		summary: T().min(1).max(200).describe("What will happen, in one line: the row's headline and the confirm dialog's item."),
		details: T().optional().describe("The specifics, as Markdown: everything you would want to see before saying yes."),
		instructions: T().min(1).describe("What to do once approved, written for the fresh turn that will do it: names, ids and steps, since it has none of this conversation."),
		...B_
	}), A("kind", [V_, H_]), U_ = { id: B.describe("The approval's id.") }, W_ = V_.extend(U_), G_ = H_.extend(U_), K_ = A("kind", [W_, G_]), q_ = k({
		approvals: O(K_).describe("The queue."),
		invalid: O(T()).describe("Files that could not be read at all, or name a kind this daemon does not know. Listed rather than skipped, because an agent writes these files directly and a malformed one would otherwise never run and never say why.")
	}), J_ = k({ id: B.describe("Which approval.") });
})), X_, Z_ = g((() => {
	z(), Y_(), W(), X_ = {
		list: R.route({
			method: "GET",
			path: "/approvals",
			summary: "Things waiting for your yes",
			description: "Everything an agent has prepared and would like to do: posts to publish, actions to carry out. Nothing here has happened yet."
		}).output(q_),
		upsert: R.route({
			method: "POST",
			path: "/approvals",
			summary: "Approve, edit or retry one",
			description: "All three are the same act with a different field changed, so they share one call. Send the item back as you want it."
		}).input(K_).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/approvals/{id}",
			summary: "Reject one",
			description: "Throws it away undone."
		}).input(J_).output(H)
	};
})), Q_, $_ = g((() => {
	z(), Fg(), W(), Q_ = {
		list: R.route({
			method: "GET",
			path: "/automations",
			summary: "Things that wake an agent on their own",
			description: "Every automation with its recent runs and when it fires next."
		}).output(wg),
		catalog: R.route({
			method: "GET",
			path: "/automations/catalog",
			summary: "What can trigger an automation here",
			description: "Every trigger this sandbox understands and every template worth starting from, the daemon's own merged with each installed extension's. Writing an automation is checked against this same list, so a screen and the daemon can never disagree about what is allowed."
		}).output(Pg),
		upsert: R.route({
			method: "POST",
			path: "/automations",
			summary: "Create or edit an automation",
			description: "Writes an automation by id. Nothing needs provisioning: the scheduler picks it up on its next sweep."
		}).input(_g).output(H),
		setEnabled: R.route({
			method: "POST",
			path: "/automations/{id}/enabled",
			summary: "Turn an automation on or off",
			description: "Flips only the switch, so a row in a list can be toggled without rebuilding the whole record."
		}).input(kg).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/automations/{id}",
			summary: "Delete an automation",
			description: "Removes it, so nothing fires from it again."
		}).input(Og).output(H),
		rotateToken: R.route({
			method: "POST",
			path: "/automations/{id}/rotate-token",
			summary: "Rotate an automation's webhook token or intake key",
			description: "Mints a new credential for the door this automation opens and retires the old one at once. Every caller has to be handed the new URL; that is the point. Refused for an automation with no door."
		}).input(Og).output(gf),
		run: R.route({
			method: "POST",
			path: "/automations/{id}/run",
			summary: "Fire an automation by hand",
			description: "The answer to writing something that runs at three in the morning and having no way to try it. It takes exactly the path the real trigger takes, including the check that decides whether there was anything to do, since skipped by the guard is the most useful thing this can tell you. A switched-off automation fires too, because trying it before switching it on is the main reason to press this. Not available for the trigger that listens for incoming messages, where a hand-fire would produce an agent asked to handle events and handed none; send the bot a message instead. Answers straight away and runs detached."
		}).input(Og).output(H),
		senders: R.route({
			method: "GET",
			path: "/automations/senders/{provider}",
			summary: "Who has written to a listener source",
			description: "Everyone whose message reached one of this source's automations, newest first, admitted or not. What the sender rules picker offers by name while storing the id the service vouches for."
		}).input(Dg).output(Eg),
		pendingList: R.route({
			method: "GET",
			path: "/automations/pending",
			summary: "Automations waiting for a yes",
			description: "The queue an automation set to ask first lands in each time it would have fired."
		}).output(bg),
		approve: R.route({
			method: "POST",
			path: "/automations/pending/{id}/approve",
			summary: "Let a held automation run",
			description: "Releases one waiting automation and runs the wake it was holding. Answers straight away and runs detached."
		}).input(xg).output(H),
		reject: R.route({
			method: "POST",
			path: "/automations/pending/{id}/reject",
			summary: "Drop a held automation",
			description: "Throws one waiting fire away. The automation stays on, and the next trigger queues as usual."
		}).input(xg).output(H)
	};
})), ev, tv, nv, rv, iv, av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv, Tv, Ev = g((() => {
	L(), V(), ev = k({ agent: yd.optional().describe("Read a conversation's own private copy of the workspace rather than the shared tree. Leave it out for the shared tree. A conversation that is not working privately resolves back to the shared tree rather than failing, so a link need not know which mode it runs in.") }), tv = k({
		to: T().describe("What the link says, verbatim, rather than where it ends up. That is what the person who made it wrote, and what they would edit."),
		state: M(["broken", "outside"]).optional().describe("Absent for an ordinary link. Broken means there is nothing at the other end, and it is listed anyway because a dangling link is worth seeing. Outside means it leads out of the workspace, so it is shown and refused.")
	}), nv = k({
		name: T().describe("Just this entry's own name."),
		path: T().describe("Its full path from the workspace root, which feeds straight back into the file routes."),
		type: M(["file", "dir"]).describe("What it is. For a link, what it points at, so a link to a folder opens like a folder."),
		size: E().optional().describe("Size in bytes, for a file."),
		ignored: D().optional().describe("Tooling ignores it: installed packages, git internals, anything the ignore rules exclude. Usually drawn greyed out."),
		link: tv.optional().describe("Present when this entry is a link."),
		get children() {
			return O(nv).optional().describe("What is inside a folder. Absent means it was not opened, either because it is ignored or because the walk ran out of budget above it, so ask for it separately. An empty list means it really is empty.");
		}
	}), rv = k({
		root: T().describe("The path everything below is relative to."),
		tree: O(nv).describe("The workspace, one entry per file and folder."),
		hidden: E().describe("How many entries at the top level were cut for size. Zero means the listing is complete."),
		barren: O(T()).describe("Folders whose whole contents are empty folders, and nothing else. Complete for the workspace, however much of the tree above was listed, and ordered like the tree, so a parent comes before the branch below it.")
	}), iv = ev.extend({
		path: T().min(1).describe("The folder to open, as a workspace path."),
		depth: I().int().min(1).max(5).optional().describe("How many levels to include. Omitted means direct children only; at most five levels can be read in one request.")
	}), av = k({
		entries: O(nv).describe("What is inside it, as a flat list. With the default depth these are direct children; a deeper request also includes descendants, whose full paths say where they belong. Folders carry no nested contents of their own."),
		hidden: E().describe("How many entries were cut for size. Zero means the listing is complete.")
	}), ov = k({ path: T().min(1).describe("The file or folder, as a workspace path.") }), sv = ev.extend({ path: T().min(1).describe("The media file the ticket should cover.") }), cv = k({
		ticket: T().describe("Hand this to the streaming route in the query string. It buys exactly the one file it was minted for."),
		expiresAt: E().describe("When it stops working, in milliseconds, so a player can tell a dead ticket from a dead file.")
	}), lv = ev.extend({
		path: T().min(1).describe("The file to read, as a workspace path."),
		offset: I().int().optional().describe("Which byte to start at. A negative number reads that many bytes from the end, which is how you follow a growing log without knowing its size first."),
		limit: I().int().min(1).optional().describe("How many bytes to read. Capped by the sandbox, so leaving it out or asking for too much gives you the cap rather than the whole file.")
	}), uv = k({
		present: N(!0).describe("There is something at that path."),
		path: T().describe("The path, as asked for."),
		content: T().describe("The bytes of the window you asked for, as text."),
		size: E().describe("How large the whole file is. Compare it with the window below to know whether there is more."),
		offset: E().describe("Which byte the window starts at."),
		bytes: E().describe("How many bytes the window holds."),
		shared: D().describe("Which tree answered. True when no conversation was named, and also when one was but its own copy has no such file, which is the case a reader has to be told about rather than left to assume.")
	}), dv = k({
		present: N(!1).describe("Nothing there. An answer, not a failure: reading a file that may not exist yet is the ordinary case for half the reads in this product."),
		path: T().describe("The path, as asked for.")
	}), fv = A("present", [uv, dv]), pv = k({ path: T().min(1).describe("The file you want the text of, as a workspace path. The real file, not its shadow: where the text is kept is this route's business.") }), mv = k({
		enabled: D().describe("Whether the background pass is on (the `sidecars` setting). Off means a shadow exists only where someone asked for one."),
		queued: E().describe("Files waiting for a shadow, not counting the batch being rendered right now."),
		deriving: O(T()).describe("The files being rendered at this moment, as workspace paths. One batch at a time, because derivation shares the box with the agent it serves."),
		sweeping: D().describe("Whether a whole-tree pass is running, which is what a freshly enabled setting or an unlistably large batch triggers."),
		broken: D().describe("Whether the `fileq` binary is missing, in which case nothing renders in the background until this sandbox restarts."),
		shadows: E().optional().describe("How many shadows the last whole-tree pass counted. Absent until one has run in this daemon's lifetime."),
		sweptAt: T().optional().describe("When that pass finished, as an ISO timestamp.")
	}), hv = M([
		"off",
		"queued",
		"deriving",
		"idle",
		"broken",
		"undeliverable"
	]), gv = {
		state: hv.describe("Where this file stands with the background pass: switched off, waiting its turn, being read right now, settled, or unreachable because the renderer is missing. `undeliverable` is a format nothing here reads."),
		queue: mv.describe("How the background pass as a whole is doing, so a wait can be reported as a queue rather than as nothing happening.")
	}, _v = k({
		...gv,
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
	}), vv = k({
		...gv,
		present: N(!1).describe("There is no derived text for that file. Read `state` before saying so to anyone: absent and queued are different answers."),
		path: T().describe("The file, as asked for."),
		derivable: D().describe("Whether this format can be turned into text at all. True means asking for it to be derived is worth offering; false means nothing here reads this format."),
		reason: T().optional().describe("Why there is none, when deriving was just attempted and produced nothing: the file is too large, corrupt, or of a format no reader claims.")
	}), yv = A("present", [_v, vv]), bv = ev.extend({ path: T().min(1).max(512).describe("The reference as somebody wrote it. Often only the tail of the real path, which is why this is matched against the tree rather than read as-is.") }), xv = k({ path: T().optional().describe("The real path it means. Absent when nothing in the workspace ends that way.") }), Sv = k({ path: T().min(1).describe("The folder to create. Missing folders above it are created too.") }), Cv = k({
		from: T().min(1).describe("What to move or copy, as a workspace path."),
		to: T().min(1).describe("Where it should end up. Changing only the last part is how you rename something.")
	}), wv = M([
		"repositories",
		"documents",
		"media",
		"archives",
		"other"
	]), Tv = k({ classifications: O(k({
		path: T().describe("What was looked at."),
		bucket: wv.describe("Which bucket it was sorted into."),
		reason: T().describe("The signal that decided it, so the proposal can be argued with rather than trusted.")
	})).describe("One entry per repository folder and loose file at the top of the workspace. A read-only proposal: nothing moves until you apply it.") });
})), Dv, Ov, kv, Av, jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv = g((() => {
	L(), Am(), qd(), W(), Ev(), Dv = mc({ kind: T() }), Ov = k({
		kind: N("heartbeat"),
		rev: E()
	}), kv = k({
		key: T(),
		label: T(),
		state: M([
			"pending",
			"running",
			"done",
			"failed"
		]),
		ms: E().optional()
	}), Av = k({
		ready: D(),
		startedAt: E(),
		steps: O(kv)
	}), jv = k({
		kind: N("boot"),
		...Av.shape
	}), Mv = k({
		kind: N("hello"),
		workspaceId: T(),
		routes: O(T()).optional(),
		shapes: j(T(), T()).optional(),
		build: T().optional(),
		boot: Av.optional()
	}), Nv = k({
		kind: N("reposChanged"),
		repos: O(T())
	}), Pv = k({
		kind: N("workspaceChanged"),
		paths: O(T())
	}), Fv = k({
		kind: N("derivedChanged"),
		paths: O(T()),
		queue: mv
	}), Iv = k({
		kind: N("refsChanged"),
		repos: O(T())
	}), Lv = k({
		kind: N("runtimeChanged"),
		domains: O(T())
	}), Rv = k({
		clientId: T(),
		email: T(),
		name: T().optional(),
		picture: T().optional(),
		role: hf,
		idle: D(),
		view: T().optional(),
		sessionId: T().optional(),
		path: T().optional()
	}), zv = k({
		kind: N("presence"),
		users: O(Rv)
	}), Bv = k({
		kind: N("agents"),
		agents: O(im),
		rev: E()
	}), Vv = k({
		kind: N("accountUsage"),
		provider: T(),
		account: T(),
		usage: Fd.optional()
	}), Hv = k({
		kind: N("providerRefusal"),
		provider: T(),
		refusal: Rd.optional()
	}), Uv = A("kind", [
		Mv,
		Ov,
		jv,
		Pv,
		Fv,
		Nv,
		Iv,
		Lv,
		zv,
		Bv,
		Vv,
		Hv
	]);
})), Gv, Kv, qv, Jv, Yv, Xv, Zv, Qv, $v, ey, ty, ny, ry, iy, ay = g((() => {
	L(), pd(), Gv = M([
		"tor",
		"vpngate",
		"wireguard"
	]), Kv = T().regex(/^[A-Za-z]{2}$/, "A country is its two-letter code, like DE, US or JP.").transform((e) => e.toUpperCase()), qv = k({
		provider: N("tor"),
		country: Kv.optional(),
		autoStart: fd
	}), Jv = k({
		provider: N("vpngate"),
		country: Kv.optional(),
		autoStart: fd
	}), Yv = k({
		provider: N("wireguard"),
		config: T().min(1),
		country: Kv.optional(),
		autoStart: fd
	}), Xv = A("provider", [
		qv,
		Jv,
		Yv
	]), Zv = M([
		"up",
		"starting",
		"down",
		"unavailable",
		"failed"
	]), Qv = k({
		ip: T().describe("The address the world sees, looked up through the exit's own proxy rather than assumed."),
		country: T().optional().describe("Which country that address is in. Absent when the lookup gave an address and no country, in which case a switch is judged on the address having changed instead."),
		countryName: T().optional().describe("That country's name, spelled out.")
	}), $v = k({
		country: T().describe("The country's code."),
		countryName: T().describe("Its name, spelled out."),
		servers: E().describe("How many servers this provider has there."),
		share: E().optional().describe("How much of the provider's actual capacity is there, from zero to one. This is what a list should be sorted by: a third of the countries on offer are one overloaded machine behind a flag, and a count of servers would rank them first.")
	}), ey = k({
		countries: O($v).describe("Where this exit can put you, best-supplied first."),
		live: D().describe("Whether the provider answered, or this came from a built-in list. Said out loud rather than presenting an old list as current.")
	}), ty = k({
		id: T().describe("Which exit."),
		provider: Gv.describe("What it runs on."),
		state: Zv.describe("Whether it is carrying traffic, coming up, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		proxy: T().describe("Where to point traffic that should go through it. Fixed per exit and unchanged by a country switch, which is what lets a long job move country halfway through without reconfiguring anything."),
		country: T().optional().describe("Where it was asked to come out. Absent means the provider chose."),
		observedCountry: T().optional().describe("Where it actually comes out, as last checked. Kept separate from what was asked for, because those two disagreeing is the most useful fault signal this whole feature has."),
		ip: T().optional().describe("The address behind that observation."),
		checkedAt: E().optional().describe("When that was checked, in milliseconds, so an old reading can be shown as old."),
		interface: T().optional().describe("The network interface, for the kinds that have one."),
		since: E().optional().describe("When it came up, in milliseconds."),
		autoStart: D().describe("Whether it starts itself when the sandbox does."),
		detail: T().optional().describe("Why it failed, or a note about a healthy one.")
	}), ny = k({ links: O(ty).describe("Every configured exit, with where it was asked to come out and where it actually does.") }), ry = k({ id: T().describe("Which exit.") }), iy = k({
		id: T().describe("Which exit."),
		country: Kv.optional().describe("Where to come out. Leaving it out means letting the provider choose, so clearing a country is something you can actually say rather than only setting one.")
	});
})), oy, sy, cy, ly, uy, dy, fy, py, my, hy, gy, _y, vy = g((() => {
	L(), oy = M([
		"host",
		"cloudflare",
		"github",
		"gitlab",
		"stripe"
	]), sy = M([
		"signoz",
		"outline",
		"paperless",
		"openproject",
		"invoiceninja",
		"infisical"
	]), cy = j(T(), hc([T(), E()])), ly = /^[a-zA-Z_][a-zA-Z0-9_]*$/, uy = T().min(1).max(60).regex(ly), dy = k({
		kind: N("backend").describe("Something you already have: a machine, an account with a hosting provider."),
		provider: oy.describe("Which provider it is with."),
		name: T().describe("What to call it, which is also how everything else refers to it."),
		values: cy.describe("Its settings. Anything secret is stored separately and referred to here, never written in.")
	}), fy = k({
		kind: N("service").describe("Something you want provisioned."),
		service: sy.describe("Which service."),
		name: T().describe("What to call it."),
		values: cy.describe("Its settings."),
		on: T().describe("Which of your machines to put it on."),
		expose: T().describe("How it should be reachable.")
	}), py = k({
		kind: N("app").describe("An app of your own, built from source and deployed."),
		name: T().describe("What to call it."),
		values: cy.describe("Its settings, including the address it should answer on."),
		on: T().describe("Which of your machines to put it on."),
		expose: T().describe("How it should be reachable.")
	}), my = A("kind", [
		dy,
		fy,
		py
	]), hy = A("kind", [
		dy.extend({ name: uy }),
		fy.extend({ name: uy }),
		py.extend({ name: uy })
	]), gy = k({ name: T().describe("Which entry, by name.") }), _y = k({ entries: O(my).describe("Everything declared: what you have, and what you want provisioned.") }), k({
		name: uy,
		user: T().min(1),
		address: T().min(1),
		port: I().default(22),
		via: M(["direct", "cloudflared"]).default("cloudflared"),
		sshKey: T().min(1),
		cfToken: T().optional(),
		cfZone: T().optional()
	});
})), yy, by, xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy = g((() => {
	L(), yy = M([
		"wireguard",
		"fortinet",
		"ipsec"
	]), by = M(["on", "off"]).default("on"), xy = (e) => /^Enc[X]?\s+[0-9A-Fa-f]{8,}$/.test(e.trim()), Sy = (e, t) => e.refine((e) => !xy(e), { message: `That looks like a value copied straight out of a FortiClient config, FortiClient encrypts it with a key tied to the machine that exported it, so it can't be used here. Enter the actual ${t} (ask whoever administers the gateway).` }), Cy = k({
		provider: N("wireguard"),
		config: T().min(1),
		autoConnect: by
	}), wy = k({
		provider: N("fortinet"),
		server: T().min(1),
		port: I().int().min(1).max(65535).default(443),
		username: T().min(1),
		password: Sy(T().min(1), "password"),
		trustedCert: T().min(1).optional(),
		realm: T().min(1).optional(),
		autoConnect: by
	}), Ty = k({
		provider: N("ipsec"),
		server: T().min(1),
		presharedKey: Sy(T().min(1), "pre-shared key"),
		localId: T().min(1).optional(),
		remoteId: T().min(1).optional(),
		username: T().min(1).optional(),
		password: Sy(T().min(1), "XAuth password").optional(),
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
		routedNetworks: T().default("0.0.0.0/0").refine((e) => e.split(",").map((e) => e.trim()).every((e) => cc().safeParse(e).success || lc().safeParse(e).success), { message: "Routed networks is a comma-separated list of CIDRs, like 10.0.0.0/8,192.168.0.0/16. A single host needs its prefix too (192.168.0.168/32). Leave it at 0.0.0.0/0 to send everything through the gateway." }),
		autoConnect: by
	}), Ey = A("provider", [
		Cy,
		wy,
		Ty
	]), Dy = M([
		"connected",
		"connecting",
		"disconnected",
		"unavailable",
		"failed"
	]), Oy = k({
		id: T().describe("Which tunnel."),
		provider: yy.describe("What kind of tunnel it is."),
		state: Dy.describe("Whether it is up, dialling, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		gateway: T().optional().describe("What it dials. For display only, and never a credential."),
		interface: T().optional().describe("The network interface carrying it, once one exists."),
		address: T().optional().describe("The address the far end gave this sandbox, which is the single most useful answer to whether you are on the VPN."),
		routes: O(T()).default([]).describe("What goes through it. Everything, when the range covers the whole internet. Empty until it is up."),
		dns: O(T()).default([]).describe("Name servers it pushed, when it pushed any."),
		since: E().optional().describe("When it came up, in milliseconds. Absent unless it is."),
		autoConnect: D().describe("Whether it dials itself when the sandbox starts."),
		detail: T().optional().describe("Why it failed, or a note about a healthy one. Never a credential.")
	}), ky = k({ links: O(Oy).describe("Every configured tunnel with its live state, read back from the operating system each time rather than remembered.") }), Ay = k({
		id: T().describe("Which tunnel to dial."),
		otp: T().min(1).optional().describe("A one-time code, where the gateway wants one. Supplied per dial and never stored; without it such a gateway refuses and says so.")
	}), jy = k({ id: T().describe("Which tunnel.") }), My = k({ xml: T().min(1).describe("The exported configuration file, whole. Nothing is stored: it is read and thrown away.") }), Ny = k({
		id: T().describe("The id it would be added under."),
		label: T().describe("Its name as the file has it, so somebody recognises the connection they are picking."),
		provider: yy.describe("What kind of tunnel it is."),
		server: T().describe("Where it dials."),
		port: E().describe("On which port."),
		username: T().optional().describe("The username, but only when the file stored it in the clear. An encrypted one is dropped rather than guessed at."),
		description: T().optional().describe("Whatever the file said about it."),
		localId: T().optional().describe("An identity some tunnel types need, when the file stored it readably."),
		aggressive: D().optional().describe("Which negotiation mode it used."),
		pfs: D().optional().describe("Whether it asked for forward secrecy."),
		dhGroup: T().optional().describe("Which key-exchange group it used. Together with the setting above, this is what decides whether the connection can complete at all."),
		needs: O(T()).describe("What you still have to type in before it can dial. Always at least the password, because the export wraps credentials in encryption that cannot be undone here.")
	}), Py = k({ connections: O(Ny).describe("The connections found in the file, ready to be added one at a time.") });
})), Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky, qy, Jy, Yy, Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb = g((() => {
	L(), ay(), pd(), vy(), Fy(), Iy = M([
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
	]), Ly = M([
		"active",
		"pending",
		"error",
		"inactive"
	]), Ry = k({
		url: sc().describe("Where the tool server answers."),
		token: T().optional().describe("The credential it needs, if any. Stored, never echoed back.")
	}), zy = k({
		service: sy.describe("Which service to provision."),
		domain: T().min(1).describe("The address it should answer on."),
		on: T().min(1).describe("Which machine to put it on."),
		expose: T().min(1).describe("How it should be reachable.")
	}), By = k({ provider: N("stripe").describe("Which outside service's credential to make available to deployed apps.") }), Vy = k({ provider: T().min(1).describe("Which tool to give the agent. The rest of the fields are whatever that tool's own card declares it needs, and are checked against it when you connect.") }).catchall(T()), Hy = k({
		url: sc().describe("The repository to take the plugin from."),
		ref: T().min(1).optional().describe("A branch, tag or commit to pin to. Leave it out to follow the default branch."),
		path: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the plugin lives, for one that sits in a larger checkout."),
		token: T().min(1).optional().describe("A credential for a private repository. Stored, never echoed back.")
	}), Uy = k({
		url: sc().describe("The repository to take the extension from."),
		ref: T().regex(/^[0-9a-f]{40}$/, "ref must be a full 40-character commit sha").describe("The exact commit to install, in full. Required rather than optional because extension code runs with your browser's trust: the owner approves precisely the code that runs, and an update is a deliberate re-install at a new commit."),
		path: T().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the extension lives, for one that sits in a larger checkout."),
		token: T().min(1).optional().describe("A credential for a private repository. Stored, never echoed back."),
		registry: sc().optional().describe("Which registry this install came from, which is what update checks and security advisories are read against. Absent falls back to the official one.")
	}), Wy = A("auth", [k({
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
	})]), Gy = k({
		gpu: M(["on", "off"]).default("off"),
		registryMirror: sc().optional(),
		insecureRegistries: T().optional(),
		addressPool: T().optional()
	}), Ky = k({
		platform: T().min(1),
		username: T().optional(),
		password: T().optional(),
		identity: T().optional(),
		purpose: T().optional(),
		openedAt: T().optional(),
		exit: T().optional()
	}).catchall(T()), qy = k({
		email: T().min(3),
		password: T().optional(),
		mailbox: T().optional(),
		loginUrl: sc().optional(),
		openAccounts: M(["on", "off"]).default("off"),
		exit: T().optional()
	}), Jy = M(["on", "off"]), Yy = k({
		shell: Jy.default("on"),
		write: Jy.default("off"),
		screen: Jy.default("on"),
		control: Jy.default("off"),
		sandboxes: Jy.default("off"),
		destructive: Jy.default("off"),
		roots: T().optional()
	}), Xy = Yy.extend({ platform: T().min(1) }), Zy = M(["on", "off"]), Qy = k({
		read: Zy.default("on"),
		act: Zy.default("on"),
		screenshot: Zy.default("off"),
		cookies: Zy.default("off"),
		confirm: M([
			"sensitive",
			"always",
			"never"
		]).default("sensitive")
	}), $y = Qy.extend({ platform: T().min(1) }), eb = k({
		command: T().min(1),
		name: T().min(1).optional(),
		env: T().optional(),
		loginCommand: T().min(1).optional()
	}), tb = M(["openai", "anthropic"]), nb = k({
		baseUrl: sc(),
		protocol: tb.default("openai"),
		apiKey: T().optional(),
		headers: T().optional()
	}), rb = [
		"16384",
		"32768",
		"65536",
		"131072"
	], ib = "65536", ab = 2048, ob = 1048576, sb = k({
		model: T().min(1),
		gpu: M(["on", "off"]).default("off"),
		url: sc().optional(),
		context: hc([M(rb), N("custom")]).default(ib),
		contextTokens: I().int().min(ab).max(ob).optional()
	}), cb = T().regex(/^\d+(\.\d{1,6})?$/, "a USD amount like 0.50 (up to six decimals: USDC's own precision)"), lb = M(["eip155:8453", "eip155:84532"]), ub = k({
		network: lb.default("eip155:8453"),
		address: T().optional(),
		perPaymentMaxUsd: cb.default("1.00"),
		autoApproveUnderUsd: cb.default("0"),
		dailyCapUsd: cb.default("5.00"),
		allow: T().optional(),
		deny: T().optional()
	}), db = A("kind", [
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
			config: Ry
		}),
		k({
			id: B,
			kind: N("service"),
			config: zy
		}),
		k({
			id: B,
			kind: N("integration"),
			config: By
		}),
		k({
			id: B,
			kind: N("cli"),
			config: Vy
		}),
		k({
			id: B,
			kind: N("plugin"),
			config: Hy
		}),
		k({
			id: B,
			kind: N("extension"),
			config: Uy
		}),
		k({
			id: B,
			kind: N("ssh"),
			config: Wy
		}),
		k({
			id: B,
			kind: N("vpn"),
			config: Ey
		}),
		k({
			id: B,
			kind: N("exit"),
			config: Xv
		}),
		k({
			id: B,
			kind: N("docker"),
			config: Gy
		}),
		k({
			id: B,
			kind: N("browser"),
			config: Ky
		}),
		k({
			id: B,
			kind: N("identity"),
			config: qy
		}),
		k({
			id: B,
			kind: N("host"),
			config: Xy
		}),
		k({
			id: B,
			kind: N("webext"),
			config: $y
		}),
		k({
			id: B,
			kind: N("agent"),
			config: eb
		}),
		k({
			id: B,
			kind: N("endpoint"),
			config: nb
		}),
		k({
			id: B,
			kind: N("localmodel"),
			config: sb
		}),
		k({
			id: B,
			kind: N("wallet"),
			config: ub
		})
	]), fb = k({
		state: Ly.describe("Whether it is live, still coming up, broken, or switched off."),
		detail: T().optional().describe("What is wrong, in words a person can act on."),
		code: T().optional().describe("A short marker for that reason, for anything deciding what to do about it.")
	}), pb = k({
		id: T().describe("The connection's id."),
		kind: Iy.describe("What sort of thing it is."),
		status: fb.describe("Whether it is working."),
		config: j(T(), hc([
			T(),
			E(),
			D()
		])).describe("Its settings, minus anything secret."),
		secrets: O(T()).default([]).describe("Which credentials it holds, by name. The values are on one route only, and it is not this one.")
	}), mb = k({
		card: T().describe("Which connection is being suggested."),
		evidence: T().describe("What was seen that prompted it: a file, a remote, printed verbatim so the claim can be checked rather than believed."),
		reason: T().describe("The same claim in words, without repeating the evidence into it."),
		prefill: j(T(), T()).describe("Settings the scan could read, to fill the form so you supply only the credential. Never a secret, even when one is sitting in a checked-in file: the suggestion points at such a file, it does not absorb what is in it.")
	}), hb = k({
		capabilities: O(pb).describe("What this sandbox is connected to."),
		recommendations: O(mb).default([]).describe("Things worth connecting, worked out from what is actually in the workspace rather than from anything you configured. Re-derived on every read, so one whose evidence has moved simply stops being suggested.")
	}), gb = k({ id: T().describe("Which connection.") }), _b = k({
		id: T().describe("The connection's id."),
		kind: T().describe("What sort of thing it is."),
		config: j(T(), T()).describe("Its settings exactly as stored, credentials included. The field names are its own kind's, which the caller already knows.")
	}), vb = k({ card: T().describe("Which suggestion to stop making.") }), yb = k({
		id: T().describe("Which connection."),
		value: T().min(1).describe("The new credential. Its other settings are left alone.")
	}), bb = k({
		id: T(),
		to: T().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
	}), xb = k({ session: T().describe("The terminal the sign-in is happening in. Attach to it to type.") }), Sb = k({
		code: T().describe("The code."),
		secondsRemaining: E().describe("How long it lasts. Its expiring is what makes handing one to an agent safe, since the seed behind it is never revealed.")
	}), Cb = k({
		checked: D().describe("Whether this connection can be tested from here at all. False is not a failure: it is 'no test exists'."),
		ok: D().describe("Whether the service answered as itself."),
		message: T().describe("What happened, in the words a person standing in front of the form needs: the service's own answer, or its refusal.")
	});
})), Tb, Eb, Db, Ob = g((() => {
	L(), Tb = k({
		url: T(),
		ref: T().optional(),
		path: T().optional()
	}), Eb = (e, t, n) => {
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
	}, Db = /^[0-9a-f]{40}$/;
})), kb, Ab, jb, Mb, Nb, Pb, Fb = g((() => {
	L(), Ob(), kb = k({
		sha: T().regex(Db, "must be a full lowercase commit sha"),
		url: T().min(1),
		path: T().min(1).optional(),
		policy: T().min(1),
		reviewer: T().min(1),
		reviewedAt: Nl(),
		runId: T().min(1),
		deterministic: k({
			policy: T().min(1),
			scanner: T().min(1),
			version: T().min(1),
			runId: T().min(1)
		})
	}), Ab = M([
		"verified",
		"listed",
		"blocked"
	]), jb = k({
		name: T(),
		description: T().optional(),
		version: T().optional(),
		kind: M(["plugin", "extension"]).optional(),
		trust: Ab.optional(),
		trustReason: T().optional(),
		securityReview: kb.optional(),
		securityFix: D().optional(),
		category: T().optional(),
		art: T().max(4096).optional(),
		logo: T().optional(),
		icon: T().optional(),
		homepage: sc().optional(),
		source: dc()
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
		let r = Eb(e.source, "", void 0);
		(r?.ref !== e.securityReview.sha || r?.url !== e.securityReview.url || r.path !== e.securityReview.path) && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "must equal the exact repository, commit and subdirectory named by source"
		});
	}), k({
		name: T(),
		metadata: k({ pluginRoot: T().optional() }).optional(),
		plugins: O(jb)
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
	}), Mb = k({
		sha: T(),
		manifest: T(),
		bundle: T(),
		engines: T().optional()
	}), Nb = k({
		name: T(),
		stars: E().int().nonnegative().optional(),
		pushedAt: T().optional(),
		checks: Mb.optional()
	}), k({
		scannedAt: T(),
		entries: O(Nb)
	}), Pb = k({
		name: T(),
		description: T().optional(),
		version: T().optional(),
		kind: M(["plugin", "extension"]),
		trust: Ab,
		trustReason: T().optional(),
		securityReview: kb.optional(),
		admitted: D(),
		securityFix: D().optional(),
		category: T().optional(),
		art: T().optional(),
		logo: T().optional(),
		icon: T().optional(),
		homepage: T().optional(),
		install: Tb.optional(),
		stars: E().int().nonnegative().optional(),
		pushedAt: T().optional(),
		checks: Mb.optional()
	});
})), Ib = g((() => {
	Fb(), Ob();
})), Lb, Rb, zb = g((() => {
	L(), Ib(), Lb = k({
		url: sc().describe("The registry to read."),
		token: T().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log.")
	}), Rb = k({
		name: T().describe("What the registry calls itself."),
		plugins: O(Pb).describe("What it lists, each with the curated decision, the resolved pointer and what a scan found upstream.")
	});
})), Bb, Vb, Hb, Ub = g((() => {
	L(), Bb = k({
		url: sc().describe("The repository to ask. http(s) only: an ssh remote would stop on a host-key prompt nobody can answer."),
		token: T().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log. A form editing a live connection has never been shown its token: it sends the VAULTED marker here and names the connection in `keeping`, so a private repository still answers without anyone retyping a key."),
		keeping: T().min(1).optional().describe("Which connection a VAULTED token belongs to. Ignored when a real token is sent.")
	}), Vb = k({
		name: T().describe("The branch or tag as a person names it: `main`, `v1.4.0`."),
		kind: M(["branch", "tag"]),
		sha: T().regex(/^[0-9a-f]{40}$/).describe("The commit it points at. An annotated tag is peeled here, so this is always a commit, never a tag object.")
	}), Hb = k({
		defaultBranch: T().optional().describe("The branch the remote advertises as HEAD, the one to offer first. Absent when the remote advertises no symref."),
		refs: O(Vb).describe("Every branch the remote advertises, then every tag. Which to offer first is the reader's question, not this one's.")
	});
})), Wb, Gb = g((() => {
	z(), Wv(), wb(), zb(), Ub(), W(), Wb = {
		list: R.route({
			method: "GET",
			path: "/capabilities",
			summary: "Everything this sandbox is connected to",
			description: "Each connection with its live state, the settings that are safe to show, and the names of the credentials it holds. The values of those credentials are never in the answer, on any route but one."
		}).output(hb),
		add: R.route({
			method: "POST",
			path: "/capabilities",
			summary: "Connect something, or change a connection",
			description: "Writes a connection and streams the work of applying it, because some kinds provision real infrastructure and take a while. Sending an id that already exists edits that connection: this is the edit as well as the create. Since a caller is never shown stored credentials, it marks the ones it is leaving alone and the daemon fills them in, which is the only way to change one setting without retyping a key."
		}).input(db).output(Iu(Dv)),
		probe: R.route({
			method: "POST",
			path: "/capabilities/probe",
			summary: "Test a connection's settings without saving them",
			description: "Dials the service the way this connection would and hands back what it said, before anything is written. The answer is the service's own confirmation or its exact refusal, so a wrong token or an unreachable host is found on the form rather than on a card afterwards."
		}).input(db).output(Cb),
		remove: R.route({
			method: "DELETE",
			path: "/capabilities/{id}",
			summary: "Disconnect something",
			description: "Tears a connection down. The kinds that own real infrastructure refuse, because deleting those would be losing data rather than losing a connection."
		}).input(gb).output(H),
		rename: R.route({
			method: "POST",
			path: "/capabilities/{id}/rename",
			summary: "Rename a connection",
			description: "Carries everything the old name keyed across with it: a browser profile and its logins, an enrolled machine, an extension's copy of its source. Removing and re-adding would lose exactly the state that made the connection worth keeping. Kinds whose name is part of what they are refuse."
		}).input(bb).output(H),
		setSecret: R.route({
			method: "POST",
			path: "/capabilities/{id}/secret",
			summary: "Replace a stored credential",
			description: "Swaps one connection's key or token for a new one and re-applies it, without touching any of its other settings."
		}).input(yb).output(H),
		status: R.route({
			method: "GET",
			path: "/capabilities/{id}/status",
			summary: "Re-check one connection",
			description: "Probes a single connection right now, for a screen that wants to refresh one row rather than the whole list."
		}).input(gb).output(fb),
		connection: R.route({
			method: "GET",
			path: "/capabilities/{id}/connection",
			summary: "A connection's settings, credentials included",
			description: "The one call that hands back stored secrets, so an extension's own backend can dial the service behind a connection. Never answered for a signed-in person: only a machine credential reaches it, and an extension's only if its manifest asked for this route out loud at install time."
		}).input(gb).output(_b),
		marketplace: R.route({
			method: "POST",
			path: "/capabilities/marketplace",
			summary: "Read a plugin marketplace",
			description: "Resolves a plugin marketplace source into the list of connections you could install from it."
		}).input(Lb).output(Rb),
		refs: R.route({
			method: "POST",
			path: "/capabilities/refs",
			summary: "The versions a repository offers",
			description: "Asks a git remote what it advertises and hands back every branch and tag with the commit it points at, plus which branch is its default. Nothing is cloned and nothing is written, so this is cheap enough to answer a form as someone types a repository into it."
		}).input(Bb).output(Hb),
		dismiss: R.route({
			method: "DELETE",
			path: "/capabilities/recommendations/{card}",
			summary: "Stop suggesting this connection",
			description: "Not needed, for now. Nothing is torn down. The suggestion comes back if what prompted it in the workspace changes, because what is remembered is the evidence, not the refusal."
		}).input(vb).output(H),
		login: R.route({
			method: "POST",
			path: "/capabilities/{id}/login",
			summary: "Sign in to a connection by hand",
			description: "Opens the connection's own sign-in in a terminal a person can type into, for the flows that need a code pasted or a device confirmed. The answer names the terminal to attach to."
		}).input(gb).output(xb),
		otp: R.route({
			method: "GET",
			path: "/capabilities/{id}/otp",
			summary: "Mint a one-time code",
			description: "Generates a single two-factor code from a stored seed. The one credential-adjacent read an agent is allowed, and it is safe because a code expires in seconds and never reveals the seed, so an agent can answer a prompt without ever holding the factor."
		}).input(gb).output(Sb)
	};
})), Kb, qb, Jb, Yb, Xb, Zb, Qb, $b = g((() => {
	L(), Kb = k({
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
		includeIgnored: Al().optional().describe("Search inside installed packages and other ignored folders too."),
		literal: Al().optional().describe("Treat the query as fixed text rather than a pattern."),
		word: Al().optional().describe("Match whole words only."),
		caseSensitive: Al().optional().describe("Whether capitals matter. Off means they do not, rather than being guessed at from the query."),
		include: T().max(512).optional().describe("Which files to ask, in the same grammar an editor's files-to-include box takes: comma-separated patterns, matched at any depth unless anchored, a leading exclamation mark excluding instead."),
		limit: I().int().positive().optional().describe("How many results to return."),
		after: T().optional().describe("Resume from the cursor a previous answer handed back.")
	}), qb = k({
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
	}), Jb = k({
		start: E().describe("First character of the match within the line."),
		end: E().describe("One past the last.")
	}), Yb = k({
		line: E().describe("Which line, counting from one."),
		text: T().describe("The line itself."),
		spans: O(Jb).describe("Where in the line the matches are, so you can highlight without searching again. Empty when the whole line is the match rather than part of it."),
		tags: O(qb).describe("Why it matched."),
		context: T().optional().describe("What it sits inside: the function, the class, the heading. Often enough that you need not open the file.")
	}), Xb = k({
		path: T().describe("The file."),
		score: E().describe("How well it matched. Groups arrive best first, never in path order."),
		hits: O(Yb).describe("The matching lines in it."),
		capped: D().optional().describe("This file had more matches than are kept per file, so the count is a floor. Say fifty-plus rather than fifty.")
	}), Zb = k({
		state: M([
			"fresh",
			"building",
			"stale"
		]).describe("Whether the index matches what is on disk, is still filling, or has fallen behind."),
		ageMs: E().optional().describe("How long since it last matched the disk, in milliseconds."),
		progress: E().optional().describe("How far through building it is, from zero to one."),
		behind: E().optional().describe("How many files it has not caught up with. Worth showing, because the word stale on its own reads as a warning about the answer, which it almost never is.")
	}), Qb = k({
		mode: T().describe("Which kind of search actually ran, which matters when you let it choose."),
		total: E().describe("Matching lines across the whole workspace, not just this page."),
		files: E().describe("Files the query matched in total."),
		shown: E().describe("How many of those lines are on this page."),
		groups: O(Xb).describe("The results, grouped by file, best first."),
		freshness: Zb.describe("Whether the index behind the answer is up to date."),
		truncated: D().describe("This page is not all of it. Use the cursor."),
		partial: D().optional().describe("At least one file had more matches than are kept per file, so the total is a floor. Different from the page being truncated: a complete page can still count partially."),
		cursor: T().optional().describe("Pass this back as `after` to get the next page."),
		hint: T().optional().describe("A suggestion for getting a better answer out of this query."),
		note: T().optional().describe("What the engine did that you did not ask for: a pattern rerun as plain text because it was not valid, escapes rewritten, a language filter that matched nothing."),
		related: O(T()).optional().describe("Places next door to the best results: where each is defined, and whatever calls it most."),
		candidates: O(T()).optional().describe("Ranked places that scored but did not make the page, best first. The answer often sits at rank five to thirteen, so this saves paging through to find out."),
		features: O(T()).optional().describe("Which stages of the search were switched off for this run. Absent means all of them ran.")
	});
})), ex, tx, nx, rx, ix = g((() => {
	L(), $b(), ex = k({
		repo: T().min(1).describe("Which repository, using the same ids the git routes take."),
		since: T().max(16).optional().describe("How far back to count changes, written as a span such as 2d, 12h, 1w or 3m. Leave it out for all of history."),
		limit: I().int().positive().max(200).optional().describe("How many files and modules to rank. A leaderboard rather than an inventory: past a screenful the ranking stops being the point.")
	}), tx = k({
		path: T(),
		commits: E(),
		adds: E(),
		dels: E(),
		complexity: E(),
		score: E(),
		latestMs: E()
	}), nx = k({
		path: T(),
		exports: E()
	}), rx = k({
		repo: T().describe("Which repository this describes."),
		totals: k({
			files: E().describe("Files counted."),
			symbols: E().describe("Named things they export."),
			complexity: E().describe("Branch points across all of them added up."),
			hotspots: E().describe("How many files qualify as hotspots at all. The list below is capped; this is not.")
		}).describe("Counts anybody could recount in the files themselves. Deliberately no single maintainability grade: those cannot be checked and are not comparable between projects."),
		hotspots: O(tx).describe("Files that change often and are complicated at the same time, worst first."),
		modules: O(nx).describe("The parts of the codebase the rest of it leans on most."),
		freshness: Zb.describe("Whether the index these numbers were read from is up to date.")
	});
})), ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox = g((() => {
	L(), ix(), ax = [
		"outdated",
		"audit",
		"knip",
		"jscpd",
		"ui",
		"bundle",
		"mutation"
	], ox = M(ax), sx = k({
		name: T().describe("The dependency."),
		current: T().describe("What you are on."),
		latest: T().describe("What is published."),
		kind: M([
			"major",
			"minor",
			"patch"
		]).describe("How far apart those are. This is not one number because forty patch releases behind is a morning's work and one major version is a project."),
		section: T().describe("Which part of the manifest declares it. A major version behind on a build-time tool is a different risk from one that ships.")
	}), cx = k({
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
	}), lx = k({
		files: E().int().nonnegative().describe("Files nothing reaches."),
		exports: E().int().nonnegative().describe("Exported things nothing uses."),
		types: E().int().nonnegative().describe("Types nothing uses."),
		dependencies: E().int().nonnegative().describe("Declared dependencies nothing imports."),
		devDependencies: E().int().nonnegative().describe("The same, for build-time ones."),
		sample: O(T()).describe("A handful of the files, so a reader need not take the count on faith. Counts and a sample rather than the whole list, because an agent re-measures against the live tree anyway.")
	}), ux = k({
		percentage: E().describe("How much of the scanned code is duplicated. A share rather than a count, because a count grows with the repository and would mean something different every quarter."),
		clones: E().int().nonnegative().describe("How many duplicated stretches were found."),
		top: O(k({
			lines: E().int().nonnegative().describe("How long the duplicated stretch is."),
			first: T().describe("One of the two places."),
			second: T().describe("The other.")
		})).describe("The largest of them.")
	}), dx = k({
		components: O(T()).describe("The interface's own source files, with tests, stories and generated output left out."),
		bypasses: O(k({
			path: T().describe("The file."),
			count: E().int().positive().describe("How many times, in that file.")
		})).describe("Where the design system was routed around and a value hard-coded instead. Counted per file, because a reader deciding what to open is served by a file and a number, not by eleven snippets."),
		idioms: O(k({
			id: T().describe("Which outdated idiom. Looked up rather than listed here, so a sandbox one version behind can still report one this list has never heard of."),
			files: O(T()).describe("The files still on it.")
		})).describe("Files still written the way their framework has since replaced.")
	}), fx = k({
		dir: T().describe("Which folder was measured. Read from build output already on disk rather than by building, so this is sometimes a commit behind and never leaves anything in your working tree."),
		totalBytes: E().int().nonnegative().describe("The whole thing, raw."),
		totalGzip: E().int().nonnegative().describe("The whole thing, compressed. The ratio between the two is the difference between big and big-and-incompressible, which are different problems."),
		assets: O(k({
			path: T().describe("The file."),
			bytes: E().int().nonnegative().describe("Its raw size."),
			gzip: E().int().nonnegative().describe("Its compressed size.")
		})).describe("What is in it, piece by piece.")
	}), px = k({
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
	}), mx = M([
		"ok",
		"unavailable",
		"failed"
	]), hx = A("id", [
		k({
			id: N("outdated"),
			packages: O(sx)
		}),
		k({
			id: N("audit"),
			advisories: O(cx)
		}),
		k({
			id: N("knip"),
			deadCode: lx
		}),
		k({
			id: N("jscpd"),
			duplication: ux
		}),
		k({
			id: N("ui"),
			scan: dx
		}),
		k({
			id: N("bundle"),
			bundle: fx
		}),
		k({
			id: N("mutation"),
			mutation: px
		})
	]), gx = k({
		id: ox.describe("Which measurement this is."),
		state: mx.describe("Whether the tool ran and reported, is not part of this repository at all, or broke. The middle one is not evidence of health: the check simply cannot be made here."),
		ranAt: E().describe("When it last finished, in milliseconds, which is what its age is measured from."),
		tookMs: E().int().nonnegative().describe("How long it took. Worth knowing before asking for it again: some of these run for minutes."),
		facts: hx.optional().describe("What it found, including finding nothing, which is a real answer and the one that keeps a chore quiet."),
		reason: T().optional().describe("Why it broke, quoted from the tool rather than summarised, or, when it never ran, what is missing. Never a sentence built from the check's own name, which would have an unmeasured check claiming there is nothing to measure.")
	}), _x = k({
		dir: T().describe("Where the package lives."),
		name: T().describe("What it declares itself as."),
		engines: j(T(), T()).optional().describe("Which runtime versions it says it needs, verbatim."),
		dependencies: O(T()).describe("What it depends on."),
		devDependencies: O(T()).describe("What it needs only to build."),
		documented: D().describe("Whether it has a README, which in this workspace is what a package's own documentation is.")
	}), vx = k({
		docs: O(T()).describe("The repository's own architecture documents, when it has any. Their existence is the question: a repository with none has never been through the documentation flow at all."),
		dockerfiles: O(T()).describe("Container definitions in it."),
		ci: O(T()).describe("Pipeline definitions in it."),
		lockfile: D().describe("Whether dependencies are pinned to exact versions, which is what makes a security audit mean anything."),
		packageManifest: D().describe("Whether it is a JavaScript project at all. A Rust or Go repository has no majors to be behind on, and offering it those checks would be this surface guessing at what it is looking at."),
		deps: O(T()).describe("Every dependency name declared anywhere in the repository. Names rather than a verdict about which framework this is, because that judgement belongs to whatever reads this, not to a sandbox baked months ago.")
	}), yx = k({
		packages: O(_x).describe("Each package in the repository, as its own manifest declares it."),
		shape: vx.describe("What the repository is made of, which decides whether a given chore is even a sensible question to ask of it."),
		hotspots: O(tx).describe("Files that change often and are complicated at once, capped tight: a chore only asks whether something has entered the top of the ranking."),
		keyModules: O(nx).describe("The parts the rest of the code leans on most, capped the same way."),
		totals: k({
			files: E().describe("Files counted."),
			symbols: E().describe("Named things they export."),
			complexity: E().describe("Branch points added up."),
			hotspots: E().describe("How many files qualify as hotspots at all.")
		}).describe("The repository in numbers."),
		indexed: D().describe("Whether the index these rankings came from is finished. Nothing should act on a half-built one.")
	}), bx = M([
		"acted",
		"reported",
		"clean"
	]), xx = k({
		repo: T().describe("Which repository."),
		chore: T().describe("Which chore."),
		ranAt: E().describe("When it ran, in milliseconds."),
		runId: T().describe("The conversation that ran it, so its whole record can be opened."),
		outcome: bx.describe("What it concluded: it did something, it wrote something down, or it looked and found the finding to be false. That last one matters most, or the same turn starts again for ever."),
		digest: T().describe("A fingerprint of the evidence standing at the time. A chore whose evidence has since changed is due again on its own merits; one whose evidence has not stays quiet."),
		snoozedUntil: E().optional().describe("Not until then, in milliseconds. The chore stays visible and stays out of the badge. Different from switching it off, which is a setting.")
	}), Sx = k({
		repo: T().describe("Which repository."),
		id: ox.describe("Which measurement."),
		askedAt: E().describe("When it was asked for, in milliseconds, so one still waiting can say how long it has waited."),
		startedAt: E().optional().describe("When it actually began. Absent while it is queued behind another, which is a real and common state: there is one lane for the whole sandbox.")
	}), Cx = k({
		repos: O(k({
			repo: T().describe("Which repository."),
			probes: O(gx).describe("The expensive measurements, served from a cache with an age on each rather than run on demand."),
			signals: yx.describe("The cheap facts, worked out fresh every time.")
		})).describe("Every repository's standing evidence. One answer for all of them, because a badge polls this on a timer and one request per repository is the kind of poll that shows up in a battery graph."),
		ledger: O(xx).describe("What has already been done about all of it."),
		running: O(Sx).describe("What is being measured right now and what is waiting behind it. Part of this read rather than a route of its own, because a screen that had to ask twice would show the two halves disagreeing."),
		node: T().describe("The runtime version this sandbox is actually running, read off the process rather than off a manifest, because what is installed is the fact that matters and a declared range is a wish.")
	}), wx = k({
		repo: T().min(1).describe("Which repository."),
		id: ox.describe("Which measurement to retake, ahead of its usual schedule.")
	}), Tx = xx, Ex = k({
		id: T().describe("Which check."),
		label: T().describe("What it is called."),
		status: M([
			"pass",
			"warn",
			"fail"
		]).describe("How it went. A warning is a real third answer rather than a soft failure."),
		detail: T().describe("What it found.")
	}), Dx = k({ checks: O(Ex).describe("Everything that can be checked from the extension's own files, for an author about to publish.") });
})), kx, Ax = g((() => {
	z(), Ox(), W(), kx = {
		list: R.route({
			method: "GET",
			path: "/chores",
			summary: "What maintenance the repos are asking for",
			description: "Every repo's standing evidence in one read: what the last measurement found and how old it is, the cheap signals that are always current, and what has already been decided about each."
		}).output(Cx),
		probe: R.route({
			method: "POST",
			path: "/chores/probe",
			summary: "Measure one repo again now",
			description: "Re-runs a single check without waiting for it to go stale. Answers immediately: the work happens in the background and the result turns up in the next read, because some of these sweeps outlive any sane request."
		}).input(wx).output(H),
		record: R.route({
			method: "POST",
			path: "/chores/ledger",
			summary: "Record a verdict, or snooze one",
			description: "Writes what somebody concluded about one repo's chore, replacing the previous verdict. A chore has one current answer, not a growing pile of times it was fine."
		}).input(Tx).output(H)
	};
})), jx, Mx = g((() => {
	z(), Jg(), W(), jx = {
		runs: R.route({
			method: "GET",
			path: "/ci/runs",
			summary: "Pipeline runs across the repos",
			description: "What the forges are reporting for every workspace repo that has a remote, served from a cache and filled in on demand. Repos whose notifications are not wired up say so."
		}).output(Hg),
		rerun: R.route({
			method: "POST",
			path: "/ci/runs/rerun",
			summary: "Run a pipeline again",
			description: "Asks the forge to re-run one pipeline. The daemon only passes the request along."
		}).input(Ug).output(H),
		cancel: R.route({
			method: "POST",
			path: "/ci/runs/cancel",
			summary: "Cancel a pipeline run",
			description: "Asks the forge to stop a run in progress."
		}).input(Ug).output(H),
		jobs: R.route({
			method: "POST",
			path: "/ci/runs/jobs",
			summary: "The steps inside one pipeline run",
			description: "Each job in a run with its outcome, which is where you look to find out what actually broke."
		}).input(Ug).output(Bg),
		fix: R.route({
			method: "POST",
			path: "/ci/fix",
			summary: "Put an agent on a broken pipeline",
			description: "Opens a fresh isolated conversation already holding the failure: which job, which repo, what it said. The answer names the conversation so you can open it."
		}).input(Wg).output(Gg)
	};
})), Nx, Px, Fx, Ix = g((() => {
	z(), L(), wb(), mf(), Nx = M([
		"unknown",
		"healthy",
		"degraded",
		"unavailable"
	]), Px = k({
		available: D(),
		allowance: E().int().nonnegative(),
		used: E().int().nonnegative(),
		remaining: E().int().nonnegative(),
		health: Nx,
		resetsAt: T().optional(),
		retryAt: T().optional(),
		servedModel: T().optional()
	}), Fx = {
		models: R.route({
			method: "GET",
			path: "/endpoints/{id}/models",
			summary: "Models a connected server offers",
			description: "Asks one configured model server what it serves. There is no built-in list and no fallback: what a server offers is knowable only by asking it, so an empty answer is the honest report that we could not."
		}).input(gb).output(pf),
		trial: R.route({
			method: "GET",
			path: "/endpoints/trial/status",
			summary: "What is left of the free trial",
			description: "The allowance, what has been used, when it resets, and which model actually answered the last message. Not being available is the ordinary answer rather than a failure: most sandboxes run against a platform that offers no trial at all."
		}).output(Px)
	};
})), Lx, Rx = g((() => {
	z(), Wv(), ay(), W(), Lx = {
		list: R.route({
			method: "GET",
			path: "/exit",
			summary: "Ways to come out somewhere else",
			description: "Every configured exit with its live state, the country it was asked to appear in, and the country it actually appears in. Those last two disagreeing is the whole reason this reports both."
		}).output(ny),
		countries: R.route({
			method: "GET",
			path: "/exit/{id}/countries",
			summary: "Countries one exit can reach",
			description: "Where this exit can put you, ranked by how much capacity is really there. Asked of the provider when it answers and taken from a built-in list when it does not, and the answer says which of those you got."
		}).input(ry).output(ey),
		start: R.route({
			method: "POST",
			path: "/exit/{id}/start",
			summary: "Bring an exit up",
			description: "Starts the exit in the country it was configured for. Streamed, because a first start fetches a catalogue, raises a tunnel and then checks the address, which takes tens of seconds on the free providers and can fail at each step with something worth reading. Starting one that is already up simply says so."
		}).input(ry).output(Iu(Dv)),
		use: R.route({
			method: "POST",
			path: "/exit/{id}/use",
			summary: "Move to another country",
			description: "Switches the exit's country, starting it first if it was down. It ends by checking where the world actually sees you and fails if that does not match what you asked for. A switch that quietly left your traffic where it was is the exact failure this whole feature exists to rule out."
		}).input(iy).output(Iu(Dv)),
		rotate: R.route({
			method: "POST",
			path: "/exit/{id}/rotate",
			summary: "Take a different address, same country",
			description: "Swaps to another address in the country you are already in. Fails if the address does not actually change, which on a small pool it sometimes cannot."
		}).input(ry).output(Iu(Dv)),
		check: R.route({
			method: "POST",
			path: "/exit/{id}/check",
			summary: "Where the world sees you right now",
			description: "Looks up the address and country as seen through this exit. Cheap, and the honest answer to whether you are really where you meant to be, which is what every other call here is judged against."
		}).input(ry).output(Qv),
		stop: R.route({
			method: "POST",
			path: "/exit/{id}/stop",
			summary: "Take an exit down",
			description: "Shuts the exit off. One that was already down is fine: the promise is that it is not up afterwards, not that it was up before."
		}).input(ry).output(H)
	};
})), zx, Bx, Vx, Hx, Ux, Wx, Gx, Kx, qx, Jx, Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS = g((() => {
	L(), zx = T().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/), Bx = k({
		updates: M([
			"notify",
			"agent",
			"auto"
		]),
		advisories: M(["auto-disable", "notify"])
	}), Vx = k({
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
	}), Hx = k({
		reason: T().describe("Why the registry pulled the listing, in its own words. Delisting protects people browsing; this record is for the person already running it."),
		registry: T().describe("Which registry said so."),
		at: T().describe("When."),
		autoDisabled: D().describe("Whether the sandbox has already switched it off.")
	}), Ux = k({
		state: M([
			"watching",
			"healthy",
			"unhealthy"
		]).describe("How it has behaved since the last update. Checks catch broken, not wrong, so for a while after a swap it is simply watched."),
		detail: T().optional().describe("What is going wrong, when something is."),
		fromRef: T().optional().describe("Which version it was updated from, which is what going back would return to."),
		at: T().describe("When the watching started."),
		autoReverted: D().optional().describe("The update was already rolled back without anybody asking. The record stays rather than pretending the attempt never happened.")
	}), Wx = k({
		added: O(T()).describe("What the new version asks for that the running one does not. The whole point of the comparison."),
		removed: O(T()).describe("What it no longer asks for."),
		unchanged: O(T()).describe("What stays the same.")
	}), Gx = k({
		id: zx.describe("Which extension."),
		ref: T().regex(/^[0-9a-f]{40}$/).optional().describe("Which commit, in full. Leave it out for whatever the last check found, which is what most callers mean.")
	}), Kx = k({
		ref: T().describe("The commit this would install."),
		version: T().describe("What that version calls itself."),
		installedVersion: T().describe("What is running now."),
		engines: T().describe("Which sandbox versions the new one says it needs."),
		compatible: D().describe("Whether this sandbox is one of them."),
		powers: Wx.describe("Exactly what the new code asks for that the running one does not. This is what approving an update is approving.")
	}), qx = k({
		ok: N(!0).describe("It went through."),
		ref: T().describe("Which commit is now running."),
		rebuildNeeded: D().optional().describe("The new version changes what the sandbox image contains, so a one-time rebuild is still pending and the update is not wholly landed yet.")
	}), Jx = k({
		id: zx.describe("Which extension."),
		updates: M([
			"notify",
			"agent",
			"auto"
		]).optional().describe("What to do about a newer version: tell you, have an agent read the difference first, or just take it."),
		advisories: M(["auto-disable", "notify"]).optional().describe("What to do about a security warning: switch it off at once, or tell you.")
	}), Yx = k({
		ok: N(!0).describe("The check ran."),
		checkedAt: T().describe("When, so a screen can date the answer.")
	}), Xx = k({
		id: zx.describe("The extension's id."),
		manifest: r.describe("What it declares about itself: what it contributes, what it needs, and what it may reach."),
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
		update: Vx.optional().describe("A newer version waiting. All five of these exist only for one installed from a repository: a built-in updates with the image and one written here is edited live."),
		advisory: Hx.optional().describe("A security warning about the installed version."),
		health: Ux.optional().describe("How it has behaved since the last update, which is what decides whether that update sticks."),
		previous: k({
			ref: T().describe("The commit that was running before."),
			version: T().optional().describe("What it called itself.")
		}).optional().describe("The version kept one step back, which is what going back means."),
		updatePolicy: Bx.optional().describe("The owner's standing answer for this one: tell me, have an agent look, or just do it.")
	}), Zx = k({
		dir: T().describe("Which folder."),
		error: T().describe("Why it could not be read.")
	}), Qx = k({
		extensions: O(Xx).describe("What is installed."),
		invalid: O(Zx).describe("Extensions written here that could not be read at all. Listed rather than dropped, because there is no install moment at which to reject a broken one, so this is its only way of saying anything."),
		updatesCheckedAt: T().optional().describe("When updates were last looked for. Absent until the first check has run. Sent so a screen can say checked an hour ago rather than presenting staleness as certainty.")
	}), $x = k({
		settings: j(T(), hc([
			T(),
			E(),
			D()
		])).describe("The values, minus anything marked secret."),
		secretsSet: O(T()).describe("Which of its secret settings actually hold a value. Names only: the values themselves never come back.")
	}), eS = k({
		id: T().describe("Which extension."),
		settings: j(T(), hc([
			T(),
			E(),
			D()
		])).describe("The values to write. A key the extension never declared is refused rather than quietly stored.")
	}), tS = k({
		id: T().describe("Which extension."),
		enabled: D().describe("On or off.")
	}), nS = k({
		publisher: T().regex(/^[a-z0-9][a-z0-9-]*$/).describe("Who it is by, which together with the name makes its id."),
		name: T().regex(/^[a-z0-9][a-z0-9-]*$/).describe("What it is called.")
	}), rS = k({
		id: T().describe("The id it was given."),
		dir: T().describe("Where its files are, so you can open them.")
	}), iS = k({
		id: T().describe("The name the owner gave it, which is also the agent's handle for it."),
		kind: T().describe("Which core kind it is underneath: cli, browser, host or webext."),
		card: T().describe("The card it was added from, named as the grid names it."),
		secrets: O(T()).describe("Credential fields stored for it, by name. The values are deleted with the entry and cannot be recovered from here."),
		effect: T().describe("What tearing it down actually takes away, in one sentence.")
	}), aS = k({
		id: zx.describe("The extension's id, as the list addresses it."),
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
		connections: O(iS).describe("Connections configured from its cards, which are removed with it."),
		settings: O(k({
			key: T().describe("Which setting."),
			secret: D().describe("Whether its value is a stored credential.")
		})).describe("Values the owner entered for this extension that are forgotten. Only keys actually holding a value are listed."),
		processes: O(T()).describe("Background processes it declared, stopped before its files go."),
		automations: O(T()).describe("Automations of the owner's own that wake on a listener this extension provides. They are NOT removed, and are listed because they stop firing, which is the sort of thing a removal is otherwise discovered by."),
		rebuildNeeded: D().describe("It bakes a layer into the sandbox image, so what it added to the image is only gone after the next environment rebuild."),
		keeps: O(T()).describe("What removal deliberately leaves alone, so the list of what goes can be read as complete.")
	}), oS = k({
		ok: N(!0).describe("It is gone."),
		connections: O(T()).describe("Which configured connections went with it, by name."),
		rebuildNeeded: D().optional().describe("Its image layer is still in the running sandbox until the next environment rebuild; nothing else is pending.")
	}), sS = k({ reports: j(T(), j(T(), E().int().positive())).describe("Each extension that called something, and the counts against the declared powers it exercised.") }), cS = k({
		id: T().describe("Which extension."),
		name: T().describe("Which of its declared processes.")
	}), lS = k({
		name: T().describe("Which process."),
		running: D().describe("Whether it is up. False with a port means it crashed and the supervisor is waiting to retry it."),
		port: E().optional().describe("The port it was given."),
		restarts: E().optional().describe("How many times it died and was brought back since it was started. A growing number is a service in trouble."),
		lastExitCode: E().optional().describe("How it last exited, when it has crashed at least once."),
		previewUrl: T().optional().describe("Where to open it, when it has an address.")
	});
})), dS, fS = g((() => {
	z(), wb(), uS(), Ox(), W(), dS = {
		list: R.route({
			method: "GET",
			path: "/extensions",
			summary: "Installed extensions",
			description: "Every extension installed here, resolved to the manifest the owner approved, which is what the app boots its extension host from. The code itself is served separately, because raw script bytes are not a JSON answer."
		}).output(Qx),
		create: R.route({
			method: "POST",
			path: "/extensions/workspace",
			summary: "Write a new extension in place",
			description: "Scaffolds a working extension into this workspace and installs it. The only call here that creates one, and it exists because that folder is otherwise reachable only through an agent's file tools, which is a fine way to change an extension and a poor way to meet the idea of one."
		}).input(nS).output(rS),
		removalPlan: R.route({
			method: "GET",
			path: "/extensions/{id}/removal",
			summary: "What removing an extension would take away",
			description: "Everything one removal destroys, before it happens: the files deleted, the connections configured from its cards, the settings and credentials forgotten, the background processes stopped, and the owner's own automations that quietly stop firing. Also answerable for an extension that cannot be removed, in which case it says why."
		}).input(gb).output(aS),
		remove: R.route({
			method: "POST",
			path: "/extensions/{id}/remove",
			summary: "Remove an extension",
			description: "Uninstalls it and everything that only existed because it was here: the connections added from its cards, with their stored credentials, its settings, its switch and its update record. What the owner made with it — automations, files in the workspace — is left alone. Owner only, for the same reason installing is. Built-in extensions cannot be removed; switch them off instead."
		}).input(gb).output(oS),
		settings: R.route({
			method: "GET",
			path: "/extensions/{id}/settings",
			summary: "An extension's settings",
			description: "The current values for the settings this extension declared it has."
		}).input(gb).output($x),
		setSettings: R.route({
			method: "POST",
			path: "/extensions/{id}/settings",
			summary: "Change an extension's settings",
			description: "Writes new values. A key the extension never declared is refused rather than quietly stored, the same honesty rule that governs everything else an extension claims."
		}).input(eS).output(H),
		setEnabled: R.route({
			method: "POST",
			path: "/extensions/{id}/enabled",
			summary: "Turn an extension on or off",
			description: "The owner's switch. Turning one off stops its background processes at once. What it contributes to an agent's tools is rebuilt at the start of the next turn, and anything it adds to the sandbox image only at the next rebuild."
		}).input(tS).output(H),
		recordUsage: R.route({
			method: "POST",
			path: "/extensions/usage",
			summary: "Record what extensions just used",
			description: "One batch written by the app rather than measured by the daemon, because the permission gate runs in the browser: from the sandbox's side extension traffic is indistinguishable from anyone else's. This is how the record of which powers each extension actually exercises gets kept without one reporting request per extension."
		}).input(sS).output(H),
		readiness: R.route({
			method: "GET",
			path: "/extensions/{id}/readiness",
			summary: "Whether an extension is fit to share",
			description: "The checks that can be answered from an extension's own files, for an author about to publish. Read on demand rather than carried on the list, because it reads the code off disk each time."
		}).input(gb).output(Dx),
		checkUpdates: R.route({
			method: "POST",
			path: "/extensions/updates/check",
			summary: "Look for extension updates now",
			description: "Compares every installed extension against its source and reports what is newer, what carries an advisory and what looks unhealthy. This also happens on a schedule; call it to check on demand."
		}).output(Yx),
		updatePreview: R.route({
			method: "POST",
			path: "/extensions/{id}/update/preview",
			summary: "What an update would change",
			description: "The read before the click: which versions are involved and exactly which powers the new code asks for that the running one does not. Costs one throwaway copy of the source, the same as browsing a registry entry."
		}).input(Gx).output(Kx),
		applyUpdate: R.route({
			method: "POST",
			path: "/extensions/{id}/update",
			summary: "Update an extension",
			description: "The whole swap as one transaction: fetch, check, quiet the running one, replace it while keeping the outgoing copy one step back, restart and watch it come up. The existing configuration is kept, so a token for a private source survives what removing and re-adding would lose. Owner only, because it changes what code runs."
		}).input(Gx).output(qx),
		revert: R.route({
			method: "POST",
			path: "/extensions/{id}/revert",
			summary: "Go back to the previous version",
			description: "Swaps the copy kept from before the last update back into place. Owner only, for the same reason updating is."
		}).input(gb).output(qx),
		setUpdatePolicy: R.route({
			method: "POST",
			path: "/extensions/{id}/update-policy",
			summary: "How an extension should handle its own updates",
			description: "The owner's standing answer for one extension: tell me, have an agent look at it, or just do it. Security advisories can be opted out of separately."
		}).input(Jx).output(H),
		processStatus: R.route({
			method: "GET",
			path: "/extensions/{id}/processes/{name}",
			summary: "Whether an extension's background process is up",
			description: "The state of one process an extension declared, with the port it was given and its preview address if it has one."
		}).input(cS).output(lS),
		processStart: R.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/start",
			summary: "Start an extension's background process",
			description: "Brings one of an extension's declared processes up in an attachable terminal."
		}).input(cS).output(H),
		processStop: R.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/stop",
			summary: "Stop an extension's background process",
			description: "Shuts one of an extension's declared processes down and frees its port."
		}).input(cS).output(H)
	};
})), pS = g((() => {
	Zu(), td(), Qu.map((e) => ({
		label: e.label,
		value: e.id
	})), Object.fromEntries(Qu.map((e) => [e.id, e.access])), Qu.filter((e) => e.access.kind === "free").map((e) => e.id), Object.fromEntries(Qu.map((e) => [e.id, e.vendor])), Qu.filter((e) => e.planLimits).map((e) => e.id);
})), mS = g((() => {
	pS();
})), hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS = g((() => {
	Dp(), V(), hS = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), gS = [
		/\bgit\s+push\b[^|;&]*\s(?:-f\b|--force\b|--force-with-lease\b|--delete\b)/,
		/\bgit\s+reset\b[^|;&]*\s--hard\b/,
		/\bgit\s+clean\b[^|;&]*\s-{1,2}[a-zA-Z]*f/,
		/\bgit\s+branch\b[^|;&]*\s(?:-D\b|--delete\s+--force\b|--force\s+--delete\b)/,
		/\bgit\s+filter-branch\b/
	], _S = [/\{\{secret:[A-Za-z0-9_./-]+\}\}/], vS = String.raw`[\w~$.{}/\\-]*`, yS = [
		/(?<![\w.])\.env(?!\.(?:example|sample|template))(?:\.[\w-]+)?\b/,
		/\.ssh(?!\w)(?!\/(?:known_hosts|config|authorized_keys|environment)(?!\w))(?!\/[\w.-]*\.pub(?!\w))(?:\/[\w.\-/]*)?/,
		/\bid_(?:rsa|dsa|ecdsa|ed25519)\b(?!\.pub\b)/,
		new RegExp(String.raw`${vS}\.aws/credentials\b`),
		new RegExp(String.raw`${vS}\.npmrc(?!\.(?:example|sample|template))\b`),
		new RegExp(String.raw`${vS}\.git-credentials\b`),
		new RegExp(String.raw`${vS}\.credentials\.json\b`)
	], bS = [
		/\b(?:npm|pnpm|yarn|bun)\s+publish\b/,
		/\bcargo\s+publish\b/,
		/\bgh\s+release\s+create\b/,
		/\bdocker\s+push\b/,
		/\btwine\s+upload\b/
	], xS = String.raw`(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?(?=[/?#\s'"\x60]|$)`, SS = [new RegExp(String.raw`\b(?:curl|wget)\b[^|;&]*\bhttps?://(?!${xS})`), new RegExp(String.raw`\bfetch\(\s*['"\x60]https?://(?!${xS})`)], CS = [
		/\bmkfs(?:\.\w+)?\b/,
		/\bwipefs\b/,
		/\bblkdiscard\b/,
		/\bsgdisk\b[^|;&]*\s(?:--zap-all|-Z)\b/,
		/\bdd\b[^|;&]*\bof=(?:\/dev\/|['"`]\/dev\/)/,
		/\bshred\b[^|;&]*\s\/dev\//,
		/>\s*\/dev\/(?:[shv]d[a-z]|nvme\d|disk\d|mmcblk\d)/
	], wS = [
		/\b(?:docker|podman)\s+volume\s+(?:rm|remove|prune)\b/,
		/\b(?:docker|podman)\s+system\s+prune\b/,
		/\b(?:docker(?:\s+compose|-compose)?|podman-compose)\s+down\b[^|;&]*\s(?:-v\b|--volumes\b)/
	], hS(gS), hS(_S), hS(yS), hS(bS), hS(SS), hS(CS), hS(wS), TS = {
		"git.destructive": "rewrite or discard git history",
		"files.destructive": "delete files recursively",
		"system.destructive": "wipe a disk, or delete a whole root directory",
		"container.state": "delete a container volume or the data in it",
		"secrets.access": "read credential material",
		"package.publish": "publish or release a package",
		"network.outbound": "send a request out to the internet"
	}, ES = {
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
})), OS, kS, AS, jS, MS, NS, PS, FS, IS, LS, RS = g((() => {
	L(), DS(), V(), OS = /* @__PURE__ */ new Set(["system.destructive"]), kS = /* @__PURE__ */ new Set([
		"system.destructive",
		"container.state",
		"files.destructive"
	]), AS = (e) => e === "sandbox" ? OS : kS, jS = {
		sandbox: "/ and /history. Not /work, /usr or /etc: the worktree's changes are uncommitted work, and the container comes back from its image.",
		device: "/, a home directory, a Windows drive, and the top-level directories an OS keeps."
	}, MS = (e) => Object.fromEntries(Sd.options.map((t) => [t, AS(t).has(e) ? "hard" : "judged"])), NS = (e) => Sd.options.filter((t) => e.tiers[t] === "hard").length, Cd.options.map((e) => ({
		commandClass: e,
		label: TS[e],
		patterns: ES[e],
		tiers: MS(e),
		...e === "system.destructive" ? { notes: jS } : {}
	})).sort((e, t) => NS(t) - NS(e)), PS = M([
		"off",
		"watch",
		"on"
	]), FS = M([
		"allow",
		"ask",
		"refuse"
	]), k({
		decision: FS.describe("Run it, ask the owner, or refuse it."),
		sentence: T().describe("What this command does and why it was allowed, held or refused, in one plain sentence."),
		policyLine: T().optional().describe("A line the owner could add to their policy so this stops being asked. Shown on the card before it is accepted.")
	}), IS = k({
		at: E().int().describe("When it was judged, epoch milliseconds."),
		program: T().describe("The command or script, excerpted."),
		classes: O(T()).describe("The kinds of consequence triage matched, which is why a judge looked."),
		decision: FS.describe("What the judge decided."),
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
	}), LS = k({
		text: T().describe("The policy, as the owner wrote it."),
		custom: D().describe("False when nobody has edited it and this is the text this product ships.")
	});
})), zS, BS, VS, HS, US, WS, GS, KS, qS, JS, YS, XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC, SC, CC = g((() => {
	Dp(), L(), RS(), Gu(), V(), zS = M([
		"intentic",
		"claude",
		"custom"
	]), BS = k({ base: M(["intentic", "claude"]) }), VS = M([
		"off",
		"versions",
		"full"
	]), HS = M([
		"file.edited",
		"turn.ending",
		"push.starting",
		"agent.finished",
		"agent.landed"
	]), US = M([
		"verify-edits",
		"verify-removals",
		"verify-ui-edits",
		"verify-tests",
		"version-landed"
	]), WS = A("kind", [
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
			name: US
		})
	]), GS = M([
		"clean",
		"error",
		"conflict",
		"checks-failed"
	]), KS = k({
		repo: T().min(1).optional(),
		paths: O(T().min(1)).max(20).optional(),
		outcome: O(GS).optional(),
		sample: E().gt(0).lt(1).optional()
	}), qS = {
		"file.edited": ["command"],
		"turn.ending": [
			"builtin",
			"instruct",
			"command"
		],
		"push.starting": ["command"],
		"agent.finished": ["verdict"],
		"agent.landed": ["builtin"]
	}, JS = {
		"turn.ending": [
			"verify-edits",
			"verify-removals",
			"verify-ui-edits",
			"verify-tests"
		],
		"agent.landed": ["version-landed"]
	}, YS = k({
		id: T().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: T().min(1).max(80),
		moment: HS,
		when: KS.optional(),
		action: WS,
		enabled: D().default(!0)
	}).refine((e) => qS[e.moment].includes(e.action.kind), {
		message: "that action cannot stand at that moment",
		path: ["action"]
	}).refine((e) => e.action.kind !== "builtin" || (JS[e.moment] ?? []).includes(e.action.name), {
		message: "that built-in cannot stand at that moment",
		path: ["action"]
	}), XS = j(T(), E()), ZS = M([
		"builtin",
		"own",
		"capability",
		"extension",
		"plugin",
		"persona",
		"dropped"
	]), QS = T().regex(/^[a-z0-9][a-z0-9-]*$/, "a skill name is lowercase letters, digits and dashes"), $S = k({
		id: T().describe("Its handle, which reading and deleting take. A skill of your own is simply its name; one belonging to something else is qualified, because two packages may each ship a review."),
		name: T().describe("Its name."),
		description: T().describe("What it is for, which is the line the agent reads to decide whether to reach for it. Empty when the skill declares none, which is worth showing as the blank it is: a skill with no description is rarely picked."),
		origin: ZS.describe("Where it came from."),
		owner: T().optional().describe("Who ships it, as the row would name them."),
		enabled: D().describe("Whether the agent can reach it."),
		switchable: D().describe("Whether this surface can switch it. Everything else is on because its extension or its plugin is, and a switch here that silently did nothing would be worse than none, so the row names its owner instead."),
		editable: D().describe("Whether it can be rewritten here. Your own only: editing somebody else's in place would be undone the next time the thing that ships it catches up."),
		removable: D()
	}), eC = O($S), tC = k({
		id: T().describe("The skill's id, which can carry the owner it came from."),
		name: T().describe("Its name."),
		body: T().describe("The instructions themselves, as written.")
	}), nC = k({ id: T().min(1).describe("Which skill. It travels in the query rather than the address, because an id can name the owner it came from and that will not fit in a path.") }), rC = k({
		name: QS.describe("What to call it. Saving over an existing name rewrites it, which is also how one is renamed."),
		description: T().min(1).max(1024).describe("What it is for, which is what the agent reads to decide whether to reach for it."),
		body: T().min(1).describe("The skill itself.")
	}), iC = k({ name: QS.describe("Which skill to delete. The stored text and the agent's copy go together, so nothing is left half done.") }), aC = k({
		name: QS.describe("Which skill of your own to switch."),
		on: D().describe("On writes the agent's copy from the stored text; off removes that copy and keeps the text.")
	}), oC = k({
		stableSystemPrompt: D().default(!1).describe("Keep the instructions identical between turns so the provider can cache them, moving anything that varies into the message instead. Cheaper, at the cost of some flexibility."),
		skills: O(T()).default(["lsp", "fileq"]).describe("Which built-in tools are switched on. A skill of your own is not listed here: it is on while the agent's copy of it exists."),
		personaRouting: D().default(!0).describe("Whether a new chat is matched to one of your personas from its first message. The message is read once it is sent, by the model on the persona-routing list, and the chat says in its own transcript what was asked and which persona it landed on. Never applies to unwatched runs, which name their persona themselves."),
		hashlineEdits: D().default(!1).describe("Have the agent edit files by line number rather than by quoting the text it wants replaced. Cheaper on large files, and less forgiving of a stale read."),
		systemPromptMode: zS.default("intentic").describe("Which instructions the agent starts from: intentic's own, the ones the installed Claude Code carries, or your own. The first two both get this product's own guidance added on top; your own gets nothing added, which is the point of it."),
		systemPrompt: T().max(2e4).default("").describe("Your own instructions, used only when the mode above says custom. Then it is the whole of them: both built-in bases go, and so does everything this product would otherwise add, including the guidance the chat's own cards are driven by. That is the price of total control."),
		iqSearch: D().default(!1).describe("Teach the agent how to use this workspace's own search tool, rather than leaving it to grep around."),
		iqSearchHoldout: E().min(0).max(1).default(0).describe("What share of conversations to run without that teaching, so the two can be compared. Whole conversations rather than individual turns, because once the teaching is in a session, withholding it from the next request does not make the model forget it."),
		workspaceMap: D().default(!1).describe("Open every conversation with a map of the project it starts in: what is in it, what each part is for, and where the agent is standing. Worked out fresh each time rather than written down anywhere, because a written layout is wrong within a fortnight. Off by default, since it spends tokens on the first message of every conversation."),
		workspaceMapHoldout: E().min(0).max(1).default(0).describe("What share of conversations to open without the map, so the two can be compared. Whole conversations rather than individual turns, because the map is sent once and stays in the conversation's history afterwards."),
		sidecars: D().default(!1).describe("Keep an up-to-date markdown rendering of every document, image and audio file in the workspace, made in the background as files land, so the agent reads a pre-derived text instead of paying to parse the file mid-task. Costs background CPU on a document-heavy workspace, so it is a switch rather than a default."),
		dependencyFreshness: VS.default("off").describe("Whether a version the agent is about to pin is checked against the package's own registry first. Facts only, or facts plus the name of a maintained replacement where the registry agrees the current choice has been abandoned. It tells the agent and lets it decide rather than refusing, because matching a version your project already uses is usually the right answer and a gate would fight it."),
		outputCleaners: T().default("").describe("Which command outputs to trim before the agent reads them, cutting the noise a build tool prints without cutting what it said."),
		outputHoldout: E().min(0).max(1).default(0).describe("What share of commands to leave untrimmed, so the saving can be measured against a real comparison rather than estimated."),
		modelRoles: vc(Uu, O(Ad).max(10)).default({}).describe("Which models do which job, one ordered list per job: commit messages, session titles, the safety judge, pipeline fixes, and every other place this sandbox picks a model for you. Tried in order, so one spent account does not take a job down. Nothing is chosen for you: a one-shot job with no list does not run, and a whole session with no list opens on whatever your own chat is set to."),
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
		rules: O(YS).max(50).default([]).describe("Standing instructions you give the sandbox about its own work: ask for proof before a turn ends, run something before a push, hold or release finished work. Empty is the default and is exactly the behaviour of a fresh sandbox, because each of those defaults is what no rule matched means at its own moment."),
		automationFailureLimit: E().min(0).max(20).default(0).describe("How many failures in a row before an automation switches itself off. Zero means never, which is the default, because the failure is not always the automation's fault and a job disabled at three in the morning is one nobody re-enables. Only real errors count: a guard deciding there was nothing to do, or the sandbox dying mid-run, say nothing about the automation."),
		admission: wd.prefault({}).describe("Whether work started from outside may run, per kind of trigger: let it, hold it for approval, or refuse it. Composes with each automation's own setting, and the stricter of the two wins, so holding every visitor's message needs no edit to each automation."),
		actionRules: j(T(), xd).default({}).describe("What an agent may do out in the world, per kind of action: go ahead, ask first, or never."),
		commandJudge: PS.default("on").describe("Whether a model reads your safety policy before a flagged command runs. Off judges nothing and asks about nothing; Watch judges everything and records it without ever interrupting you, which is how you find out what your policy actually does before you let it stop anything; On lets the verdict decide. Wiping a disk or deleting under /history asks at every setting — that rule is typed rather than judged, and cannot be turned off."),
		subagentsAtOnce: E().min(1).max(200).default(20).describe("How many subagents may work at the same time."),
		subagentsPerTurn: E().min(1).max(2e3).default(200).describe("How many a single turn may start in total."),
		subagentDepth: E().min(1).max(10).default(3).describe("How many levels deep the delegation may go, since a subagent can start subagents of its own.")
	}), sC = k({
		text: T(),
		version: T()
	}), cC = k({
		id: T(),
		commands: E(),
		savedTokens: E()
	}), lC = k({
		updatedAt: E().optional(),
		commands: E(),
		rawTokens: E(),
		emittedTokens: E(),
		savedPct: E(),
		perCleaner: O(cC),
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
	}), uC = k({
		turns: E(),
		mean: E()
	}), dC = k({
		metric: M([
			"searchCalls",
			"openingSearches",
			"openingListings",
			"callsBeforeTarget"
		]),
		on: uC,
		off: uC,
		controlTurnsNeeded: E().optional(),
		marginPct: E().optional(),
		deltaPct: E().optional(),
		saved: E().optional()
	}), fC = k({
		metrics: _c([dC], dC),
		minTurns: E(),
		sampleUnit: M([
			"turns",
			"conversations",
			"opening turns"
		]).optional(),
		cohort: T().optional()
	}), pC = k({
		judged: E(),
		fast: E(),
		atStakeUsd: E(),
		routed: E(),
		routedUsd: E(),
		escalated: E(),
		denied: E()
	}), mC = k({
		prevented: T(),
		chosen: T(),
		reason: T(),
		at: E().optional()
	}), hC = k({
		checked: E(),
		improved: E(),
		recent: O(mC),
		updatedAt: E().optional()
	}), gC = k({
		input: lC,
		search: fC.optional(),
		map: fC.optional(),
		tier: pC.optional(),
		dependencies: hC.optional()
	}), _C = `${Tp}/checks.json`, vC = M(["turn", "push"]), yC = k({
		when: vC.describe("When to run it: `turn` before the assistant finishes, `push` before code leaves the machine."),
		run: T().min(1).max(500).describe("The command, run in this repository's own directory, so it reads as it would in a terminal there."),
		label: T().min(1).max(80).optional().describe("What to call it on screen. Absent names it after the command."),
		timeoutMs: E().min(6e4).max(36e5).optional().describe("How long it may take before it is killed and counted as failed."),
		paths: O(T().min(1)).max(20).optional().describe("Only run it when the change touches these paths, written relative to this repository. Absent runs it on every change here.")
	}), k({ checks: O(yC).max(10).default([]) }), bC = k({
		repo: T().describe("Which repository, by its workspace id (\"root\" is the workspace itself)."),
		path: T().describe("Where the declaration lives, relative to the workspace, whether or not the file exists yet."),
		checks: O(yC).describe("What it declares, in the order the file lists them."),
		adopted: D().describe("Whether these are running. False means declared and inert: nothing a repository writes runs until the owner switches it on."),
		changed: D().describe("Whether the declaration changed since it was adopted, which holds it until the owner looks again. True only for a repository that was adopted before."),
		error: T().optional().describe("Why the file could not be read, when it exists but does not parse. The checks list is empty in that case.")
	}), xC = k({ repos: O(bC).describe("Every repository that declares checks, plus any the owner has adopted before, sorted by id.") }), SC = k({
		repo: T().min(1).describe("Which repository's declaration to switch."),
		on: D().describe("On adopts what it declares as it stands now; off stops running it. Adopting again is how a changed declaration is accepted.")
	});
})), wC, TC, EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC = g((() => {
	L(), mS(), V(), pd(), CC(), wC = k({
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
	}), TC = k({
		startIn: T().max(200).optional().describe("Which folder a conversation opens in."),
		folders: O(T().min(1)).max(50).optional().describe("Which folders it may touch at all. Absent means the whole workspace.")
	}), EC = k({ repos: O(T().min(1).max(200)).max(50).describe("Which nested repositories a conversation wearing this card carries, by workspace-relative path. The workspace itself is always carried; empty means the workspace alone.") }), DC = M([
		"map",
		"context",
		"skills",
		"search",
		"delegation",
		"checks",
		"dependencies",
		"repoSync",
		"handoff"
	]), OC = k({ omit: O(DC).max(20).describe("Which of the notes the sandbox prepends to each message a conversation wearing this card does NOT get. Everything not named here is sent as usual; the notes that keep a turn inside its own branch or explain a missing account cannot be named at all.") }), kC = k({
		id: B.describe("The persona's id."),
		label: T().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		capabilities: O(B).max(50).describe("Which connected accounts are its hands. Named individually rather than by site, because two accounts on one site is the whole problem this solves. Naming one that is not connected yet is not an error: it is a card describing an account this sandbox has still to sign into."),
		brief: T().max(200).optional().describe("What this persona is for, in one line. A new chat is routed onto a persona by this sentence, and the Personas page shows it under the name."),
		powers: wC.optional().describe("What a conversation wearing it may do. Absent means the full toolbox, so a card written before this existed behaves exactly as it did."),
		workspace: TC.optional().describe("Where it works. Absent means the whole workspace."),
		context: EC.optional().describe("Which part of the workspace a conversation wearing it carries: the repositories its checkout holds. Absent means every repository."),
		briefing: OC.optional().describe("Which of the notes the sandbox prepends to every message this card's conversations do without. Absent means all of them, which is what a card written before this existed keeps."),
		models: O(Ad).max(10).optional().describe("Which models a conversation wearing it runs on, tried in order. Absent means whatever the chat or the job would have run on anyway; a model chosen for the turn itself always wins."),
		systemPromptMode: zS.optional()
	}), AC = k({
		prompt: T().min(1).max(2e4).describe("The message a new chat is about to open with."),
		folder: T().max(200).optional().describe("The workspace folder the chat was opened in, when it was opened in one."),
		paths: O(T().min(1).max(500)).max(50).default([]).describe("Workspace paths the message names: uploads, @-mentions, the editor's own file.")
	}), jC = k({
		persona: B.optional().describe("The card this message belongs to, or absent when none does and the chat should stay open to everything."),
		reason: T().describe("Why, in the one line a chat can show. Present whether or not a card was named."),
		model: T().optional().describe("Which model answered, as `provider:model`, so the chat can name what the reading cost. Absent when no model was asked at all, which a folder match and an empty persona list both are.")
	}), MC = k({ id: B.describe("Which persona.") }), NC = k({
		personas: O(kC).describe("The characters an agent can wear."),
		connected: O(T()).describe("Which accounts are actually connected right now, so a persona naming one that has since been disconnected can be shown as broken rather than as working.")
	}), PC = k({
		prompt: T().describe("What this persona is told, on top of everything else. Empty means it simply follows the sandbox's own instructions."),
		skills: O(k({
			name: T().describe("The skill's name."),
			description: T().describe("What it is for.")
		})).describe("Skills only this persona's conversations can reach. A different question from what the agent knows generally, with a different answer.")
	}), FC = MC.extend({ prompt: T().max(2e4).describe("What to tell this persona. Sending an empty one removes it entirely rather than storing a blank, so the persona falls back to the sandbox's own instructions.") }), IC = MC.extend(rC.shape), LC = MC.extend({ name: QS.describe("Which skill.") }), RC = k({
		name: T().describe("The skill's name."),
		description: T().describe("What it is for."),
		body: T().describe("The skill itself, in full.")
	});
})), BC, VC = g((() => {
	z(), zC(), W(), BC = {
		list: R.route({
			method: "GET",
			path: "/personas",
			summary: "The characters an agent can wear",
			description: "Each persona with the connected accounts it speaks for, what a conversation wearing it is allowed to do, and where it works."
		}).output(NC),
		save: R.route({
			method: "POST",
			path: "/personas",
			summary: "Create or edit a persona",
			description: "Writes the whole card; sending an id that exists edits it. Nothing is connected, installed or spent by saving one, because a persona only records a decision about accounts that already exist. It is stored as a file you can equally well edit by hand, which is why this writes the card whole rather than patching a field: a round trip through a screen should leave a change a reviewer recognises."
		}).input(kC).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/personas/{id}",
			summary: "Delete a persona",
			description: "Takes away the character, never the accounts: every login it named stays connected. Its own prompt and skills go with it, since a folder nothing can reach is worse than deleting what somebody just asked to delete. Anything still pointed at it goes quiet rather than falling back to speaking as everyone."
		}).input(MC).output(H),
		route: R.route({
			method: "POST",
			path: "/personas/route",
			summary: "Which persona a new chat belongs to",
			description: "Reads the message a chat has just been sent, and one line per persona, and names the card it belongs to, or none, along with the model that answered. Costs one small model call on the persona-routing list, and says so. Nothing is applied here: the chat that asked puts the card on, and only when the persona routing setting is on."
		}).input(AC).output(jC),
		kit: R.route({
			method: "GET",
			path: "/personas/{id}/kit",
			summary: "What one persona carries",
			description: "The instructions this persona is given and the skills only its conversations can reach. A different question from what the agent knows generally, with a different answer."
		}).input(MC).output(PC),
		savePrompt: R.route({
			method: "POST",
			path: "/personas/{id}/prompt",
			summary: "Write a persona's instructions",
			description: "Sets what this persona is told. Saving an empty one removes it entirely rather than storing a blank, so the persona simply falls back to the sandbox's own instructions."
		}).input(FC).output(H),
		readSkill: R.route({
			method: "GET",
			path: "/personas/{id}/skills/read",
			summary: "Read one of a persona's skills",
			description: "The full text of a single skill belonging to this persona."
		}).input(LC).output(RC),
		saveSkill: R.route({
			method: "POST",
			path: "/personas/{id}/skills",
			summary: "Write one of a persona's skills",
			description: "Creates or replaces a skill by name. There is nothing to switch on: a persona's skill is available exactly when that persona is worn, which is what belonging to it has to mean."
		}).input(IC).output(H),
		removeSkill: R.route({
			method: "POST",
			path: "/personas/{id}/skills/remove",
			summary: "Delete one of a persona's skills",
			description: "Removes a single skill from this persona and leaves the rest of its kit alone."
		}).input(LC).output(H)
	};
})), HC, UC, WC, GC, KC, qC, JC, YC, XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw, ow, sw, cw, lw, uw, dw, fw, pw, mw, hw, gw, _w, vw, yw = g((() => {
	L(), pd(), W(), I_(), HC = T().regex(/^[0-9a-f]{4,64}$/), UC = k({
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
	}), WC = k({
		repo: T().describe("Which repository."),
		branch: T().optional().describe("Which branch these are from."),
		commits: O(UC).describe("The commits, newest first."),
		hasMore: D().describe("There are older ones behind this page. It is also what stops the last row being drawn as the beginning of history, which is how a truncated log used to claim it started where the page happened to stop.")
	}), GC = U.extend({
		limit: I().int().positive().max(2e3).optional().describe("How many commits to return."),
		skip: I().int().nonnegative().max(1e6).optional().describe("How many newer commits to step over, which is how you page further back. Paged rather than read whole, because a large repository's history is tens of thousands of rows.")
	}), KC = k({ repos: O(T()).describe("Every repository's id. The workspace itself is always present as \"root\".") }), qC = k({
		repo: T().describe("The workspace repository."),
		host: T().describe("Which forge its remote points at."),
		project: T().describe("Which project there, as owner and name.")
	}), JC = k({ repos: O(qC).describe("Each repository matched to the project its remote points at.") }), YC = U.extend({
		path: T().min(1).describe("Which file, relative to the repository."),
		content: T().describe("Its whole new contents."),
		message: T().min(1).describe("The commit message.")
	}), XC = k({
		ok: D().describe("Whether the whole thing went through."),
		wrote: D().describe("The file was written."),
		committed: D().describe("The commit was recorded."),
		pushed: D().describe("It reached the remote."),
		branch: T().optional().describe("Which branch it happened on."),
		defaultBranch: T().optional().describe("Which branch the repository considers its main one, so a caller can see it was on a side branch."),
		reason: T().optional().describe("Why it stopped where it did. Being on a side branch, having no remote and having no credentials are all reported here rather than raised.")
	}), ZC = U.extend({ sha: HC.describe("Which commit.") }), QC = k({ files: O(m_).describe("Which files it touched, with counts but not contents. Fetch any one file's contents separately, so a commit with a thousand files stays one cheap answer.") }), $C = U.extend({
		sha: HC.describe("Which commit."),
		path: T().min(1).describe("Which file in it.")
	}), ew = U.extend({
		sha: HC.describe("Which commit to start it at."),
		name: dd.describe("The new branch's name.")
	}), tw = U.extend({
		sha: HC.describe("Which commit to tag."),
		name: dd.describe("The tag's name.")
	}), nw = U.extend({ ref: dd.describe("Where to switch to: a branch, a tag, or a commit.") }), rw = U.extend({
		name: dd.describe("Which tag."),
		remote: dd.optional().describe("Also delete it there. Leave it out to remove it locally only.")
	}), iw = U.extend({
		name: dd.describe("Which tag."),
		remote: dd.describe("Which remote to send it to.")
	}), aw = U.extend({
		sha: HC.describe("Which commit to move the branch to."),
		mode: M([
			"soft",
			"mixed",
			"hard"
		]).describe("How much to take with it: move the branch alone, also unstage, or also throw away what is on disk. The last one takes a checkpoint first.")
	}), ow = U.extend({ sha: HC.describe("Which commit to act on.") }), sw = k({
		ok: D().describe("Whether it worked."),
		reason: T().optional().describe("Why not, in git's own words. A conflict, a missing remote and missing credentials are all reported here rather than raised, because they are things a screen has to render rather than breakages.")
	}), cw = k({
		ref: T().describe("How to address it, which applying and dropping take."),
		sha: T().describe("The commit behind it, because a stash entry is a commit."),
		short: T().describe("The abbreviated form, for showing."),
		subject: T().describe("What it was set aside as, with git's own scaffolding stripped off."),
		branch: T().optional().describe("Which branch it was set aside from."),
		at: E().describe("When, in milliseconds."),
		parents: O(T()).describe("What it sits on, so a graph can draw it like any other commit.")
	}), lw = k({
		repo: T().describe("Which repository."),
		stashes: O(cw).describe("What is set aside, newest first.")
	}), uw = T().regex(/^stash@\{\d{1,4}\}$/), dw = U.extend({
		message: T().max(500).optional().describe("What to call it, so you know what it was later."),
		includeUntracked: D().optional().describe("Also set aside files git is not yet tracking, which are otherwise left where they are.")
	}), fw = U.extend({
		ref: uw.describe("Which entry."),
		pop: D().optional().describe("Remove it from the stash once it has been applied cleanly.")
	}), pw = U.extend({ ref: uw.describe("Which entry.") }), mw = U.extend({ ref: uw.describe("Which entry.") }), hw = M([
		"commit",
		"amend",
		"merge",
		"rebase",
		"cherry-pick",
		"revert",
		"reset",
		"pull",
		"other"
	]), gw = k({
		kind: hw.describe("What the last action was."),
		description: T().describe("What undoing it would do, in words."),
		branch: T().describe("Which branch would move."),
		sha: T().describe("Where it stands now."),
		previousSha: T().describe("Where it would go back to. Send this with the undo as proof you looked, so one prepared against a view that has since moved is refused rather than landing somewhere unexamined."),
		changesWorkingTree: D().describe("Undoing would rewrite files as well as moving the branch, so anything offering it should warn about losing work.")
	}), _w = k({
		repo: T().describe("Which repository."),
		action: gw.optional().describe("What undoing would reverse. Absent means there is nothing to go back from.")
	}), vw = U.extend({
		previousSha: HC.describe("Where to go back to, from the matching read. It is also proof you looked: one prepared against a stale view is refused."),
		discardChanges: D().optional().describe("Also rewrite the files, rather than only moving the branch.")
	});
})), bw, xw = g((() => {
	z(), I_(), yw(), Gh(), W(), bw = {
		changes: R.route({
			method: "GET",
			path: "/git/changes",
			summary: "Uncommitted work across every repo",
			description: "The workspace's whole review set in one answer: every repo that has something uncommitted, and within it every changed file with its status and line counts. This is what the Changes panel draws, and it is the call to make when you want to know whether a workspace is clean without walking the repos yourself."
		}).output(T_),
		repos: R.route({
			method: "GET",
			path: "/git/repos",
			summary: "Every git repo in the workspace",
			description: "The repos the daemon found under the workspace root, each with the id every other call in this group expects as its `{repo}` segment. The workspace root itself is always present as `root`."
		}).output(KC),
		remoteRepos: R.route({
			method: "GET",
			path: "/git/remote-repos",
			summary: "Repos matched to their remotes",
			description: "The same repo list, but with the forge host and `owner/name` each one's remote points at. Use it to recognise a workspace repo in a list of names that came from somewhere else, such as a set of pull requests. Costs a remote lookup per repo, which is why it is separate from the plain repo list."
		}).output(JC),
		log: R.route({
			method: "GET",
			path: "/git/{repo}/log",
			summary: "Commit history for one repo",
			description: "A page of commits on the current branch, newest first, each with its author, subject, timestamp and the refs pointing at it. Paginate with the cursor the answer hands back rather than by offset, so a commit landing mid-scroll does not shift the page under you."
		}).input(GC).output(WC),
		commitDiff: R.route({
			method: "GET",
			path: "/git/{repo}/commit-diff",
			summary: "What one commit changed",
			description: "The list of files a single commit touched, with per-file status and line counts but not the content. Fetch the content of any one of them with the commit file diff call, so a commit with a thousand files stays one cheap answer."
		}).input(ZC).output(QC),
		commitFileDiff: R.route({
			method: "GET",
			path: "/git/{repo}/commit-file-diff",
			summary: "One file's before and after at a commit",
			description: "Both sides of a single file as of one commit: the content its parent had and the content that commit left. The daemon returns whole sides rather than a patch, so a caller can render the comparison however it likes."
		}).input($C).output(Wh),
		operation: R.route({
			method: "GET",
			path: "/git/{repo}/operation",
			summary: "Whether a merge or rebase is halted mid-flight",
			description: "Names the git operation the worktree is stuck inside, if any: a conflicted merge, an interrupted rebase, a half-applied cherry-pick. Check this first when another call refuses, because a halted worktree is the usual reason and the abort call is the way out."
		}).input(U).output(S_),
		abort: R.route({
			method: "POST",
			path: "/git/{repo}/abort",
			summary: "Abandon a halted merge or rebase",
			description: "Runs git's own abort for whichever operation has the worktree halted, putting the repo back where it stood before the operation started. Nothing else clears that state."
		}).input(U).output(sw),
		undoable: R.route({
			method: "GET",
			path: "/git/{repo}/undo",
			summary: "What undoing the last action would do",
			description: "Reads the branch's reflog to describe the move that undo would reverse, and hands back the commit it would land on. Pass that commit to the undo call as proof you looked, and an undo prepared against a view that has since moved is refused rather than landing somewhere unexamined."
		}).input(U).output(_w),
		undo: R.route({
			method: "POST",
			path: "/git/{repo}/undo",
			summary: "Move the branch back one step",
			description: "Walks the current branch back to where it pointed before its last action. This moves the branch ref and leaves the working tree alone, which is the opposite of restoring a checkpoint. Requires the commit the matching read handed you."
		}).input(vw).output(sw),
		stashes: R.route({
			method: "GET",
			path: "/git/{repo}/stashes",
			summary: "Everything set aside in the stash",
			description: "The repo's stash entries, newest first, each with the message and the commit behind it. A stash entry is a commit, so it reads the same way a log entry does and its contents come back from the stash diff call."
		}).input(U).output(lw),
		stashDiff: R.route({
			method: "GET",
			path: "/git/{repo}/stash-diff",
			summary: "What one stash entry holds",
			description: "The files a single stash entry would bring back, with per-file status and line counts. The same shape a commit diff has, because a stash entry is a commit."
		}).input(mw).output(QC),
		stashPush: R.route({
			method: "POST",
			path: "/git/{repo}/stash",
			summary: "Set the current changes aside",
			description: "Moves the working tree's changes onto the stash and leaves a clean tree behind. Nothing is lost: the entry is a commit you can inspect, apply or drop afterwards."
		}).input(dw).output(sw),
		stashApply: R.route({
			method: "POST",
			path: "/git/{repo}/stash/apply",
			summary: "Bring a stash entry back",
			description: "Replays one stash entry onto the working tree. A conflict is reported in the answer rather than raised as a failure, because a conflicting apply is an ordinary outcome a screen has to render."
		}).input(fw).output(sw),
		stashDrop: R.route({
			method: "POST",
			path: "/git/{repo}/stash/drop",
			summary: "Discard a stash entry",
			description: "Deletes one stash entry. This is the only unrecoverable call in the stash set, so the daemon takes a checkpoint of the workspace first."
		}).input(pw).output(H),
		createBranch: R.route({
			method: "POST",
			path: "/git/{repo}/branch",
			summary: "Start a branch at a commit",
			description: "Points a new branch name at any commit, without moving HEAD. Use the checkout call if you also want to switch to it."
		}).input(ew).output(H),
		createTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag",
			summary: "Tag a commit",
			description: "Puts a tag on any commit. Local only: pushing it to the remote is a separate call."
		}).input(tw).output(H),
		deleteTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag/delete",
			summary: "Remove a tag",
			description: "Deletes a tag locally. A tag already pushed stays on the remote until it is deleted there too."
		}).input(rw).output(H),
		pushTag: R.route({
			method: "POST",
			path: "/git/{repo}/tag/push",
			summary: "Send a tag to the remote",
			description: "Pushes one tag to the repo's remote. Reports the outcome rather than failing, since a missing remote or missing credentials are ordinary answers here."
		}).input(iw).output(sw),
		checkout: R.route({
			method: "POST",
			path: "/git/{repo}/checkout",
			summary: "Switch to a branch or commit",
			description: "Moves HEAD to a branch, tag or commit and reshapes the working tree to match. The daemon takes a checkpoint first, so an unexpected result is recoverable. Uncommitted work that would be overwritten is reported instead of being trampled."
		}).input(nw).output(sw),
		cherryPick: R.route({
			method: "POST",
			path: "/git/{repo}/cherry-pick",
			summary: "Replay one commit onto this branch",
			description: "Applies a single commit's changes on top of the current branch as a new commit. A conflict comes back in the answer, with the halted state readable from the operation call."
		}).input(ow).output(sw),
		revert: R.route({
			method: "POST",
			path: "/git/{repo}/revert",
			summary: "Undo a commit with a new commit",
			description: "Adds a commit that reverses an earlier one, leaving the history intact. This is the safe way to take something back on a branch other people have pulled."
		}).input(ow).output(sw),
		drop: R.route({
			method: "POST",
			path: "/git/{repo}/drop",
			summary: "Remove a commit from history",
			description: "Rewrites the branch so one commit is no longer in it. History changes, so this is for branches nobody else has pulled. A checkpoint is taken first."
		}).input(ow).output(sw),
		merge: R.route({
			method: "POST",
			path: "/git/{repo}/merge",
			summary: "Merge another branch in",
			description: "Merges a branch or commit into the current one. Conflicts are reported in the answer and leave the worktree halted, which the operation call explains and the abort call clears."
		}).input(ow).output(sw),
		rebase: R.route({
			method: "POST",
			path: "/git/{repo}/rebase",
			summary: "Replay this branch onto another",
			description: "Moves the current branch's commits on top of a different base. History changes. Conflicts halt the rebase and are reported rather than raised, so the operation and abort calls are the way through."
		}).input(ow).output(sw),
		reset: R.route({
			method: "POST",
			path: "/git/{repo}/reset",
			summary: "Move the branch to a commit",
			description: "Repoints the current branch at another commit, optionally reshaping the working tree to match. The destructive modes take a checkpoint first."
		}).input(aw).output(sw),
		fileDiff: R.route({
			method: "GET",
			path: "/git/{repo}/file-diff",
			summary: "One file's committed and working copies",
			description: "Both sides of a file as it stands right now: what the last commit holds and what is on disk. This is what a review pane shows for an uncommitted change."
		}).input(u_).output(Wh),
		status: R.route({
			method: "GET",
			path: "/git/{repo}/status",
			summary: "One repo's branch and pending changes",
			description: "The current branch, its sync position against the remote, and every staged, unstaged and untracked path. The single-repo counterpart to the workspace-wide changes call."
		}).input(U).output(d_),
		commit: R.route({
			method: "POST",
			path: "/git/{repo}/commit",
			summary: "Commit the pending changes",
			description: "Records a commit with your message. It commits whatever is staged; add `stage` to stage something first — an empty object for everything pending, or a scope such as one side or one conversation's landed files. The answer carries the commit it created."
		}).input(n_).output(E_),
		discard: R.route({
			method: "POST",
			path: "/git/{repo}/discard",
			summary: "Throw away pending changes",
			description: "Restores files to their committed state and deletes untracked ones. Name paths or a scope to narrow it; with neither it throws away every uncommitted change in the repository. The daemon checkpoints the workspace first, so this is recoverable from the timeline."
		}).input(r_).output(H),
		stage: R.route({
			method: "POST",
			path: "/git/{repo}/stage",
			summary: "Mark changes for the next commit",
			description: "Adds changes to the index: exactly the paths you name, everything a scope describes, or the whole repository when you name neither. Nothing on disk changes, so this is always safe and always reversible with the unstage call."
		}).input(i_).output(H),
		unstage: R.route({
			method: "POST",
			path: "/git/{repo}/unstage",
			summary: "Take changes back out of the next commit",
			description: "Removes changes from the index and leaves the files themselves untouched, on the same terms as staging. The exact reverse of it."
		}).input(i_).output(H),
		branches: R.route({
			method: "GET",
			path: "/git/{repo}/branches",
			summary: "Local branches and how far each has drifted",
			description: "Every local branch with how many commits it sits ahead of and behind its remote counterpart, so a branch switcher can show sync state without a call per branch."
		}).input(U).output(v_),
		createBranchAt: R.route({
			method: "POST",
			path: "/git/{repo}/branches",
			summary: "Create a branch from a starting point",
			description: "Makes a branch at a named start point and optionally switches to it. The branch-switcher counterpart to creating a branch at a specific commit."
		}).input(y_).output(H),
		deleteBranch: R.route({
			method: "POST",
			path: "/git/{repo}/branches/delete",
			summary: "Delete a local branch",
			description: "Removes a branch from the repo. Unmerged work is refused unless you ask for it to be forced, and the remote branch is untouched either way."
		}).input(b_).output(H),
		remote: R.route({
			method: "GET",
			path: "/git/{repo}/remote",
			summary: "Sync position against the remote",
			description: "How far the current branch sits ahead of and behind its remote, as of the last fetch, plus whether a remote and working credentials exist at all. This is a read of what the daemon already knows, not a network call, which is why fetching is a separate button."
		}).input(U).output(h_),
		fetch: R.route({
			method: "POST",
			path: "/git/{repo}/fetch",
			summary: "Refresh what the remote holds",
			description: "Contacts the remote and updates the daemon's picture of it without touching your branch. Run this before trusting the sync position."
		}).input(U).output(sw),
		pull: R.route({
			method: "POST",
			path: "/git/{repo}/pull",
			summary: "Bring remote commits down",
			description: "Fetches and integrates the remote's commits into the current branch. A pull that cannot fast-forward is reported in the answer rather than raised, because that is an ordinary thing to be told."
		}).input(U).output(sw),
		push: R.route({
			method: "POST",
			path: "/git/{repo}/push",
			summary: "Start sending commits to the remote",
			description: "Starts pushing the current branch, setting its upstream on first push, and answers at once: the push runs in a real terminal (it runs this repository's pre-push hook, which can be a whole suite), so watch it there and poll pushState for the verdict. A second start while one is going joins it rather than pushing twice."
		}).input(a_).output(H),
		pushState: R.route({
			method: "GET",
			path: "/git/{repo}/push",
			summary: "How the push is going",
			description: "The verdict, or the progress so far: where it is, the terminal it runs in, and for a push that did not go, git's last words and who refused it, the repository's own pre-push hook, the remote, or the transport. Idle when nothing has been started for this repository."
		}).input(U).output(s_),
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
		}).input(U).output(f_),
		readFile: R.route({
			method: "GET",
			path: "/git/{repo}/file",
			summary: "Read a file from the repo",
			description: "The contents of one file as it stands on disk. A path that climbs out of the repo is refused."
		}).input(c_).output(p_),
		writeFile: R.route({
			method: "PUT",
			path: "/git/{repo}/file",
			summary: "Write a file into the repo",
			description: "Replaces one file's contents, creating it and its parent folders if they are missing. Nothing is committed: the change shows up as pending work."
		}).input(l_).output(H),
		publishFile: R.route({
			method: "POST",
			path: "/git/{repo}/publish-file",
			summary: "Write, commit and push one file",
			description: "The three steps as a single call with a single answer, committing only the path you named and leaving any other pending work alone. Being on a side branch, having no remote and having no credentials are all reported rather than raised."
		}).input(YC).output(XC)
	};
})), Sw, Cw = g((() => {
	z(), Gh(), W(), Sw = {
		list: R.route({
			method: "GET",
			path: "/history/snapshots",
			summary: "Points you can go back to",
			description: "The saved states of the whole workspace, taken automatically as work happens. This is the timeline behind undoing a change that was never committed."
		}).output(Ih),
		diff: R.route({
			method: "GET",
			path: "/history/diff",
			summary: "What changed since a saved point",
			description: "The files that differ between one saved point and the one before it, taking in everything that happened in between."
		}).input(zh).output(Vh),
		fileDiff: R.route({
			method: "GET",
			path: "/history/file-diff",
			summary: "One file's before and after across a saved point",
			description: "Both sides of a single file at one point in the timeline."
		}).input(Hh).output(Wh),
		restore: R.route({
			method: "POST",
			path: "/history/restore",
			summary: "Put the workspace back",
			description: "Returns every file to how it stood at a saved point. This restores the files; moving a branch is a different thing and lives with the git calls."
		}).input(zh).output(H)
	};
})), ww, Tw = g((() => {
	L(), ww = k({ args: O(T()) });
})), Ew, Dw = g((() => {
	z(), Wv(), Tw(), W(), Ew = {
		run: R.route({
			method: "POST",
			path: "/intentic",
			summary: "Run an infrastructure command",
			description: "Runs the sandbox's own command-line tool and streams its output as it arrives, so progress is visible rather than arriving all at once at the end. A failure surfaces once the stream closes."
		}).input(ww).output(Iu(Dv)),
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
		}).output(Iu(Dv))
	};
})), Ow, kw = g((() => {
	z(), vy(), Ow = {
		list: R.route({
			method: "GET",
			path: "/inventory",
			summary: "Machines and services you have declared",
			description: "What the deployment configuration says this setup owns and what it wants provisioned."
		}).output(_y),
		add: R.route({
			method: "POST",
			path: "/inventory",
			summary: "Declare a machine or service",
			description: "Writes the entry into the configuration file and commits it, exactly as an agent editing that file by hand would. Answers with the whole updated list, so a screen redraws from one response."
		}).input(hy).output(_y),
		remove: R.route({
			method: "DELETE",
			path: "/inventory/{name}",
			summary: "Undeclare a machine or service",
			description: "Takes the entry back out of the configuration and commits that too. Answers with the whole updated list."
		}).input(gy).output(_y)
	};
})), Aw, jw = g((() => {
	z(), dg(), W(), Aw = {
		list: R.route({
			method: "GET",
			path: "/issues",
			summary: "Bugs your users have reported",
			description: "Everything that has crashed or been written in, grouped so a crash that hit a thousand people is one row with a count."
		}).output(ig),
		status: R.route({
			method: "POST",
			path: "/issues/{id}/status",
			summary: "File one away, or reopen it",
			description: "Moves one issue between open, resolved and ignored. Resolving does not close anything upstream: it is your own inbox."
		}).input(og).output(H),
		investigate: R.route({
			method: "POST",
			path: "/issues/{id}/investigate",
			summary: "Put an agent on it now",
			description: "Starts a turn on this issue with the crash, its stack and what led up to it as the brief. Answers straight away and runs detached; the issue goes to 'being looked at'."
		}).input(ag).output(H),
		remove: R.route({
			method: "DELETE",
			path: "/issues/{id}",
			summary: "Throw one away",
			description: "Forgets an issue entirely. It will come back as new if it happens again, which is usually what you want."
		}).input(ag).output(H),
		installs: R.route({
			method: "GET",
			path: "/issues/installs/{automationId}",
			summary: "Which sites have loaded the reporter",
			description: "The sites whose pages actually loaded this intake's script, and the ones that were turned away. The answer to 'did the snippet land?', which an empty inbox cannot give you."
		}).input(ug).output(lg)
	};
})), Mw, Nw, Pw, Fw, Iw, Lw, Rw, zw, Bw = g((() => {
	L(), Mw = k({
		name: T().describe("Its name, which is what the read route takes."),
		sizeBytes: E().describe("Size in bytes."),
		modifiedAt: E().describe("When it last changed, in milliseconds.")
	}), Nw = k({ files: O(Mw).describe("Every log the sandbox keeps: captured terminal output, command runs, and its own log.") }), Pw = k({
		name: T().min(1).describe("Which log. It travels in the query rather than the address, because log names contain slashes."),
		bytes: I().min(1).max(1048576).default(65536).describe("How much of the end to read. The newest bytes win when the file is larger.")
	}), Fw = k({
		name: T().describe("Which log this is from."),
		sizeBytes: E().describe("How large the whole file is."),
		text: T().describe("The end of it, as text."),
		truncated: D().describe("There is more before what you got.")
	}), Iw = k({
		seenAt: E().describe("When the browser saw it, in milliseconds."),
		level: M(["warn", "error"]).describe("How bad it was."),
		event: T().min(1).max(100).describe("What kind of thing it was, as a stable name."),
		message: T().max(2e3).describe("What it said."),
		route: T().max(300).optional().describe("Which page they were on."),
		requestId: T().max(100).optional().describe("Which daemon call it belonged to, when it belonged to one."),
		build: T().max(100).optional().describe("Which build of the app was running."),
		fields: j(T().max(60), hc([
			T().max(4e3),
			E(),
			D()
		])).optional().describe("Whatever else was worth keeping.")
	}), Lw = k({ events: O(Iw).min(1).max(50).describe("What the browser has to report, oldest first.") }), Rw = k({ recorded: E().describe("How many were written down.") }), zw = k({
		clientId: T().describe("This connection's own id, the same one it gave the event stream."),
		idle: D().describe("Whether the person has stopped doing anything."),
		view: T().optional().describe("Which view they are on."),
		sessionId: T().optional().describe("Which conversation they have open."),
		path: T().optional().describe("Which file they are looking at. Sent whole rather than merged: leaving a field out clears it, so a tab that closes a file drops the path in the same report.")
	});
})), Vw, Hw = g((() => {
	z(), Bw(), Vw = {
		list: R.route({
			method: "GET",
			path: "/logs",
			summary: "Logs the sandbox keeps",
			description: "Every log file the daemon owns: captured terminal output, command runs, and the daemon's own log. Read-only, because only the sandbox writes them."
		}).output(Nw),
		read: R.route({
			method: "GET",
			path: "/logs/file",
			summary: "Read part of a log",
			description: "A window of one log file's text. A window rather than the whole thing, because a busy log outgrows any single answer."
		}).input(Pw).output(Fw),
		report: R.route({
			method: "POST",
			path: "/logs/client",
			summary: "Report what the browser saw",
			description: "Errors the app caught, stalls it measured, and recoveries it performed, written to a log of their own. The browser is the only witness to these, so without it a bug someone hit in their own browser leaves no record at all."
		}).input(Lw).output(Rw)
	};
})), Uw, Ww = g((() => {
	z(), Jp(), W(), Uw = {
		list: R.route({
			method: "GET",
			path: "/loops",
			summary: "Every loop that has run",
			description: "The loops this workspace has run, newest first, kept after they end. Why it stopped on the fourth round is the question a loop gets read for, and the round-by-round history is the answer."
		}).output(Hp),
		start: R.route({
			method: "POST",
			path: "/loops",
			summary: "Run a conversation until it is done",
			description: "Starts repeating a conversation towards a goal and answers straight away with the loop as recorded; the work carries on without you. The conversation need not exist yet, so run this until it passes can be the first thing you ever say to a new agent. A conversation already looping is refused."
		}).input(Rp).output(Vp),
		stop: R.route({
			method: "POST",
			path: "/loops/{conversationId}/stop",
			summary: "Make this round the last",
			description: "Means do not start another round, not stop what is running. Somebody watching the sixth round do good work can say this is the last one without throwing that work away. To cut the current round off as well, stop the conversation too."
		}).input(Up).output(H),
		designs: R.route({
			method: "GET",
			path: "/loops/designs",
			summary: "Saved loop designs",
			description: "Loops somebody authored once and can point at a different job each time. A saved loop is the same loop with its goal left blank until you type one, not a different feature."
		}).output(Gp),
		saveDesign: R.route({
			method: "POST",
			path: "/loops/designs",
			summary: "Create or replace a saved loop",
			description: "Say which of the two you mean, so a name that happens to collide cannot silently overwrite somebody's work. A design that could never finish, with nothing to produce and nothing to check, is refused in the same words an ad-hoc loop would be: catching that at save time is the whole advantage of saving."
		}).input(Kp).output(Wp),
		removeDesign: R.route({
			method: "DELETE",
			path: "/loops/designs/{id}",
			summary: "Delete a saved loop",
			description: "Removes the design. A loop already running from it keeps going on its own terms, because it took a copy of what it needed when it started."
		}).input(qp).output(H)
	};
})), Gw, Kw, qw, Jw, Yw = g((() => {
	L(), Gw = M([
		"launching",
		"installing",
		"starting",
		"exited"
	]), Kw = k({
		repo: T().describe("Which repository."),
		hasPanel: D().describe("Whether it has anything runnable at all."),
		running: D().describe("Whether the sandbox has it running."),
		installed: D().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: Gw.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves."),
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
	}), qw = k({ panels: O(Kw).describe("One entry per repository, worked out in a single pass so nothing has to walk the workspace file by file.") }), Jw = k({ repo: T().describe("Which repository.") });
})), Xw, Zw = g((() => {
	z(), Yw(), W(), Xw = {
		list: R.route({
			method: "GET",
			path: "/panels",
			summary: "Repos you can run and preview",
			description: "Every repo with whether its dev server is up and what the sandbox worked out about its contents."
		}).output(qw),
		start: R.route({
			method: "POST",
			path: "/panels/{repo}/start",
			summary: "Start a repo's dev server",
			description: "Brings the repo's own runnable app up in a terminal you can attach to, so its preview address starts answering."
		}).input(Jw).output(H),
		stop: R.route({
			method: "POST",
			path: "/panels/{repo}/stop",
			summary: "Stop a repo's dev server",
			description: "Shuts it down and frees the port."
		}).input(Jw).output(H)
	};
})), Qw, $w, eT, tT, nT = g((() => {
	L(), Qw = k({
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
	}), $w = k({ ports: O(Qw).describe("Everything listening inside the sandbox right now, read fresh each time rather than from a register the sandbox keeps.") }), eT = k({ port: E().int().min(1).max(65535).describe("Which port.") }), tT = k({ previewUrl: T().optional().describe("Where it can now be reached. Absent on a sandbox with no outside address, where the mapping exists but has no public name.") });
})), rT, iT = g((() => {
	z(), nT(), W(), rT = {
		list: R.route({
			method: "GET",
			path: "/ports",
			summary: "What is listening inside the sandbox",
			description: "Every port something is answering on, and whether each one is reachable from outside."
		}).output($w),
		forward: R.route({
			method: "POST",
			path: "/ports/forward",
			summary: "Make a port reachable",
			description: "Gives one port an address on the outside. Asking twice is harmless: the second call hands back the address the first one made."
		}).input(eT).output(tT),
		unforward: R.route({
			method: "POST",
			path: "/ports/unforward",
			summary: "Stop exposing a port",
			description: "Frees the slot at once. The address keeps resolving; it simply stops leading anywhere."
		}).input(eT).output(H)
	};
})), aT, oT, sT, cT, lT, uT = g((() => {
	L(), aT = k({
		path: T().describe("Where it sits inside the outbox."),
		size: E().describe("Size in bytes."),
		modifiedAt: E().describe("When it last changed, in milliseconds."),
		url: T().optional().describe("Its public address. Absent when this sandbox has no outside address, or when the file is being refused."),
		blocked: T().optional().describe("Why a file sitting in the outbox is not being served: a hidden name, a credential-shaped name, contents that look like a token, or sheer size. Only the publisher sees this; a stranger asking for the same file gets the same nothing every other miss gets.")
	}), oT = k({
		url: T().optional().describe("Your public address, which every file's own hangs off. Absent on a sandbox with nowhere to publish to."),
		files: O(aT).describe("What the outbox holds.")
	}), sT = k({ path: T().min(1).describe("What to publish, as a workspace path. It is copied rather than moved, so a repository does not lose its build output because somebody shared it.") }), cT = k({ path: T().min(1).describe("What to withdraw, as a path inside the outbox rather than a workspace path.") }), lT = k({
		path: T().describe("Where it landed inside the outbox."),
		url: T().optional().describe("Its public address. Absent on a sandbox with nowhere to publish to.")
	});
})), dT, fT = g((() => {
	z(), uT(), W(), dT = {
		list: R.route({
			method: "GET",
			path: "/public",
			summary: "What is published to the internet",
			description: "Everything currently in the outbox and the address it answers on. There is no call to read a published file back: it is served openly to anyone with the link, which is the entire point of having put it there."
		}).output(oT),
		publish: R.route({
			method: "POST",
			path: "/public/publish",
			summary: "Put a file on the internet",
			description: "Copies a workspace file or folder into the outbox, where it is served to anyone with the link and no sign-in. Answers with the address."
		}).input(sT).output(lT),
		unpublish: R.route({
			method: "POST",
			path: "/public/unpublish",
			summary: "Take something off the internet",
			description: "Withdraws one published entry. When the last one goes, the outbox goes with it, so its existing at all always means something is published."
		}).input(cT).output(H)
	};
})), pT, mT, hT = g((() => {
	z(), L(), Jg(), W(), pT = k({ repos: O(T().min(1)).max(100).default([]).describe("The repositories going out, by workspace id. Empty runs only what stands for every push, whichever repository it is.") }).prefault({}), mT = {
		state: R.route({
			method: "GET",
			path: "/prepush/state",
			summary: "How the pre-push check is going",
			description: "The verdict, or the progress so far. Nothing is addressed by id here, because there is one working tree and so exactly one check."
		}).output(qg),
		run: R.route({
			method: "POST",
			path: "/prepush/run",
			summary: "Run the checks before pushing",
			description: "Starts the suite the workspace runs before anything leaves the machine, and answers immediately. A suite takes minutes, and a request held open that long dies at the first proxy. It runs in a real terminal, so watch it there and poll for the verdict. Name the repositories going out, and each one's own checks run in its own directory."
		}).input(pT).output(H),
		cancel: R.route({
			method: "POST",
			path: "/prepush/cancel",
			summary: "Stop the pre-push check",
			description: "Kills the run. It settles as cancelled and the push it was gating does not go."
		}).output(H)
	};
})), gT, _T, vT = g((() => {
	z(), L(), V(), mf(), gT = k({
		agents: O(k({
			id: T(),
			label: T()
		})).describe("ACP agents installed here. The id is the provider id itself, the label its display name."),
		endpoints: O(k({
			id: T(),
			label: T(),
			kind: M(["endpoint", "localmodel"])
		})).describe("Model endpoints, already prefixed `endpoint/`, including the daemon-provisioned free trial.")
	}), _T = {
		list: R.route({
			method: "GET",
			path: "/providers",
			summary: "Providers a chat can run on here",
			description: "The installed ACP agents and model endpoints, which are the providers this sandbox adds to the fixed native list. A read for anyone who may watch or drive a turn: it names what a message can be addressed to, not what credential stands behind it."
		}).output(gT),
		models: R.route({
			method: "GET",
			path: "/providers/{provider}/models",
			summary: "Models one provider offers",
			description: "Every model this provider serves and which one it defaults to. Never empty: it is discovered live with a stored list behind it. The order is the provider's own preference and is not rearranged here."
		}).input(hd).output(pf)
	};
})), yT, bT, xT, ST, CT, wT, TT, ET = g((() => {
	L(), yT = k({
		kind: N("webpush").describe("A browser, which the sandbox can reach directly and encrypt end to end."),
		endpoint: sc().describe("Where that browser's push service accepts sends. It also identifies the device everywhere else in this group."),
		keys: k({
			p256dh: T().min(1).describe("The browser's public key, for encrypting what is sent."),
			auth: T().min(1).describe("The browser's secret, for the same.")
		}).describe("What the browser handed you when it subscribed. Post it back exactly as it came; nothing reshapes it.")
	}), bT = k({
		kind: N("relay").describe("A native app, whose operating system only accepts sends from the app's publisher, so the sandbox posts through a relay instead. The message passes through that relay readable, which is the price of the publisher having to be in the loop."),
		url: sc().describe("Where to post a send. Recorded rather than assumed, so the sandbox need not know any platform by name."),
		deviceId: T().min(1).describe("The device's id, which also identifies this registration everywhere else in this group."),
		secret: T().min(1).describe("Proof that this sandbox may notify this device. The relay never learns which sandbox is calling.")
	}), xT = A("kind", [yT, bT]), k({
		title: T().min(1).describe("The headline."),
		body: T().describe("The line under it. Push services cap the whole payload at a few kilobytes, which is why nothing here carries a transcript or a diff: a notification is a pointer back, not a delivery."),
		url: T().optional().describe("Where tapping it goes. An existing tab is focused rather than a new one opened."),
		tag: T().optional().describe("Collapses repeats: a second notification with the same tag replaces the first instead of stacking beside it."),
		requireInteraction: D().optional().describe("Keep it on screen until it is dismissed. Used when the agent is waiting for you, where one that fades away is a question that went unanswered in silence.")
	}), ST = k({
		publicKey: T().describe("The key a browser needs in order to subscribe. Native apps ignore it."),
		subscribed: D().describe("Whether the asking device is already registered, so a toggle can show its real state instead of trusting the device's own permission, which can be granted with nothing behind it.")
	}), CT = k({ id: T().min(1).describe("Which device: a browser's push address, or a native install's device id.") }), wT = k({ id: T().min(1).optional().describe("Which device is asking. Without it the answer can only speak for the sandbox as a whole, which is rarely the question.") }), TT = k({ delivered: E().int().nonnegative().describe("How many devices actually accepted it. A count rather than a yes, because this button exists to prove a chain nobody can inspect, and the sandbox having accepted the request is not the question being asked.") });
})), DT, OT = g((() => {
	z(), ET(), W(), DT = {
		config: R.route({
			method: "GET",
			path: "/push/config",
			summary: "What a device needs to subscribe",
			description: "The public key and settings a browser or app needs before it can register for notifications from this sandbox."
		}).input(wT).output(ST),
		subscribe: R.route({
			method: "POST",
			path: "/push/subscribe",
			summary: "Send notifications to this device",
			description: "Registers one device. The sandbox only interrupts you on the three moments where attention is genuinely wanted: a turn has finished, the agent is stuck on a question, and something is waiting for approval."
		}).input(xT).output(H),
		unsubscribe: R.route({
			method: "POST",
			path: "/push/unsubscribe",
			summary: "Stop notifying a device",
			description: "Removes one registered device. Others keep receiving."
		}).input(CT).output(H),
		test: R.route({
			method: "POST",
			path: "/push/test",
			summary: "Send a test notification",
			description: "Proves the whole chain end to end. Worth having, because there are four separate places a notification can be lost that nobody can inspect from the outside: the device's permission, its registration, the sandbox's key, and the delivery service."
		}).output(TT)
	};
})), kT, AT = g((() => {
	z(), RS(), W(), L(), kT = {
		policy: R.route({
			method: "GET",
			path: "/safety/policy",
			summary: "The safety policy this sandbox is judged against",
			description: "The document that decides when an agent stops to ask you before running something. Prose, not settings: it is read by the model that judges each command. When nobody has written one, this is the text the product ships with, and it describes the behaviour a fresh sandbox already has."
		}).output(LS),
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
		}).output(O(IS))
	};
})), jT, MT = g((() => {
	z(), Uf(), W(), jT = {
		set: R.route({
			method: "POST",
			path: "/secrets",
			summary: "Store a secret",
			description: "Writes one name and value into the sandbox's own store, where running processes pick it up without a restart. Refused until the sandbox has somewhere to keep them."
		}).input(kf).output(H),
		list: R.route({
			method: "GET",
			path: "/secrets",
			summary: "Names of the stored secrets",
			description: "Which secrets exist here. Names only, never values."
		}).output(Af),
		remove: R.route({
			method: "DELETE",
			path: "/secrets/{key}",
			summary: "Delete a secret",
			description: "Removes one by name."
		}).input(jf).output(H),
		inventory: R.route({
			method: "GET",
			path: "/secrets/inventory",
			summary: "Every secret this sandbox holds, from everywhere",
			description: "One view across all the places secrets live here: what exists, where it came from and whether it is working. Never any values. This one always answers, even before there is a store to write to."
		}).output(Hf),
		reveal: R.route({
			method: "POST",
			path: "/secrets/reveal",
			summary: "Show one secret's value",
			description: "The only call that hands a value back, and it is for the owner alone. Sent as a body rather than in the address, so the name never ends up in a log or a browser's history."
		}).input(jf).output(Mf),
		gates: R.route({
			method: "GET",
			path: "/secrets/gates",
			summary: "Which credentials need somebody's approval",
			description: "What is gated and who may release it. Names and addresses only, never values, and the agent may read it too: knowing a credential needs Bob is what stops it concluding the account is simply not connected."
		}).output(Lf),
		setGate: R.route({
			method: "PUT",
			path: "/secrets/gates/{subject}",
			summary: "Put a credential behind named approvers",
			description: "Names exactly who may release one secret or one connected account, and how far a single release goes. The owner's call alone. A signed-in browser or a mounted server cannot be released for one use, so those are always for the rest of the conversation."
		}).input(If).output(H),
		removeGate: R.route({
			method: "DELETE",
			path: "/secrets/gates/{subject}",
			summary: "Stop requiring approval for a credential",
			description: "Removes one gate, so the agent can use that credential the way it uses any other. The owner's call alone."
		}).input(Rf).output(H),
		request: R.route({
			method: "POST",
			path: "/secrets/request",
			summary: "Ask a named person to release a credential",
			description: "Raises the release card in the live conversation and waits for one of the people named on it. Refused, rather than held, when there is nobody to ask: an unattended turn, no live conversation, or a click with no verified identity behind it."
		}).input(zf).output(Bf)
	};
})), NT, PT, FT, IT = g((() => {
	L(), Am(), NT = k({ id: T().describe("Which past conversation.") }), PT = k({
		id: T().describe("Its id."),
		title: T().describe("What it is called."),
		updatedAt: E().describe("When it last moved, in milliseconds."),
		snippet: mm.optional().describe("Why a search matched: the line it hit, with a little around it, and who said it. Absent on an unfiltered list, and on a match the title already shows, where repeating it would be noise rather than evidence.")
	}), FT = k({ sessions: O(PT).describe("Past conversations, newest first.") });
})), LT, RT = g((() => {
	z(), L(), Dh(), IT(), LT = {
		list: R.route({
			method: "GET",
			path: "/sessions",
			summary: "Past conversations in this workspace",
			description: "Summaries for a history menu, filtered when you pass a search. Covers conversations that worked in their own private copies too, so nothing is hidden just because it happened on a branch."
		}).input(k({
			query: T().optional(),
			caseSensitive: Al().optional()
		})).output(FT),
		get: R.route({
			method: "GET",
			path: "/sessions/{id}",
			summary: "Read one past conversation",
			description: "The full record of a single conversation, restored for display."
		}).input(NT).output(wh)
	};
})), zT, BT, VT, HT, UT, WT = g((() => {
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
	}), zT = k({
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
	}), BT = k({
		from: T().optional().describe("First day to include, as YYYY-MM-DD in UTC. Leave it out for everything up to the end day."),
		to: T().optional().describe("Last day to include, as YYYY-MM-DD in UTC, and it is included rather than excluded. Leave it out for everything from the start day onwards.")
	}), VT = k({ rows: O(zT).describe("Spending grouped by day, provider, account, model and conversation. Everything a cost screen shows is a rearrangement of these rows, which is why there is no second call for any of it.") }), HT = k({
		provider: T(),
		account: T(),
		turns: E(),
		inputTokens: E(),
		outputTokens: E(),
		cacheReadTokens: E(),
		cacheCreationTokens: E(),
		costUsd: E()
	}), UT = k({ accounts: O(HT) });
})), GT, KT = g((() => {
	z(), CC(), W(), WT(), GT = {
		get: R.route({
			method: "GET",
			path: "/settings",
			summary: "How this sandbox is configured",
			description: "Every setting that governs how agents behave here, with the defaults filled in for anything nobody has chosen."
		}).output(oC),
		set: R.route({
			method: "POST",
			path: "/settings",
			summary: "Change the sandbox settings",
			description: "Writes the settings whole, so send the complete object rather than the fields you changed."
		}).input(oC).output(H),
		savings: R.route({
			method: "GET",
			path: "/settings/savings",
			summary: "What the token-saving measures were worth",
			description: "Measured rather than estimated: what each mechanism actually saved over a range of days. The same day range the spending ledger takes, so one calendar filters both."
		}).input(BT).output(gC),
		builtinPrompt: R.route({
			method: "GET",
			path: "/settings/system-prompt/{base}",
			summary: "Read a built-in system prompt",
			description: "The actual text behind one of the built-in modes, so a settings screen can show the prompt instead of asking anyone to trust a description of it, and so either can be forked into a custom one."
		}).input(BS).output(sC),
		firings: R.route({
			method: "GET",
			path: "/settings/rule-firings",
			summary: "When each rule last did something",
			description: "A separate read rather than a field on the settings, because a rule firing is not somebody editing anything: folding it in would turn every firing into a settings write and put a self-changing value inside the object a screen edits."
		}).output(XS),
		repoChecks: R.route({
			method: "GET",
			path: "/settings/repo-checks",
			summary: "What each repository asks to run on its own code",
			description: `Every repository that declares its own checks at \`${_C}\`, what it declares, and whether you have switched it on. A repository declares what to run because the command belongs beside the scripts it names; nothing it declares runs until you say so.`
		}).output(xC),
		adoptRepoChecks: R.route({
			method: "POST",
			path: "/settings/repo-checks/adopt",
			summary: "Switch a repository's own checks on or off",
			description: "Adopts exactly what that repository declares as it stands now. If the declaration changes afterwards it stops running until you adopt it again, so a command nobody has read cannot inherit the answer given to a different one."
		}).input(SC).output(H)
	};
})), qT, JT = g((() => {
	z(), rh(), W(), qT = {
		list: R.route({
			method: "GET",
			path: "/share",
			summary: "Conversations published as pages",
			description: "Every conversation that has been turned into a read-only page, with its link. There is no call to read one back: the page itself is the read, and it answers to anyone who has the link."
		}).output($m),
		create: R.route({
			method: "POST",
			path: "/share",
			summary: "Publish a conversation",
			description: "Renders a conversation into a page anybody with the link can read, without signing in. Answers with the link, so nothing has to be listed again to find it."
		}).input(eh).output(Qm),
		update: R.route({
			method: "POST",
			path: "/share/update",
			summary: "Refresh a published page",
			description: "Re-renders an existing page from the conversation as it stands now. Same link, newer contents."
		}).input(th).output(Qm),
		remove: R.route({
			method: "POST",
			path: "/share/remove",
			summary: "Unpublish a conversation",
			description: "Takes the page down, so the link stops answering."
		}).input(nh).output(H)
	};
})), YT, XT = g((() => {
	z(), CC(), W(), YT = {
		list: R.route({
			method: "GET",
			path: "/skills",
			summary: "What the agent knows how to do",
			description: "Every skill available here and whether it is switched on, joined from all the places they come from: the owner's own, the settings, plugins a connection installed, folders inside extensions, and persona kits."
		}).output(eC),
		read: R.route({
			method: "GET",
			path: "/skills/read",
			summary: "Read one skill",
			description: "The full text of a single skill. The name travels in the query rather than the address, because a name can carry the owner it came from and that will not fit in a path."
		}).input(nC).output(tC),
		save: R.route({
			method: "POST",
			path: "/skills",
			summary: "Write a skill",
			description: "Creates or rewrites a skill by name. A new one starts switched on, because you wrote it in order to use it; rewriting one you switched off leaves it off. Renaming is saving under the new name and deleting the old."
		}).input(rC).output(H),
		switch: R.route({
			method: "POST",
			path: "/skills/switch",
			summary: "Switch one of your own skills on or off",
			description: "Off takes the agent's copy away and keeps your text; on writes the copy back from it. Built-in tools are switched in the agent settings instead, and nothing else has a switch."
		}).input(aC).output(H),
		remove: R.route({
			method: "POST",
			path: "/skills/remove",
			summary: "Delete a skill",
			description: "Removes the text and the agent's copy in one step, so a screen never has to sequence two calls and never leaves one half done."
		}).input(iC).output(H)
	};
})), ZT, QT, $T, eE, tE = g((() => {
	L(), ZT = k({ distro: T() }), QT = k({
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
		wsl: ZT.optional(),
		wslDistros: O(T()).optional()
	}), $T = k({
		key: T().min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: QT.optional()
	}), eE = k({
		id: T(),
		platform: T().min(1),
		environments: O($T).min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: QT.optional()
	}), k({ hosts: O(eE) });
})), nE = g((() => {})), rE, iE, aE, oE, sE, cE, lE, uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, DE, OE, kE, AE = g((() => {
	L(), tE(), rE = k({
		memoryBytes: E().optional(),
		cpus: E().optional(),
		privileged: D(),
		gpu: D(),
		hostRuntime: O(T()),
		overlayRuntime: O(T())
	}), iE = k({
		memoryGib: uc().positive().nullable().optional(),
		cpus: uc().positive().nullable().optional(),
		privileged: D().optional(),
		gpu: D().optional()
	}), aE = iE.refine((e) => Object.values(e).some((e) => e !== void 0), { message: "a reshape must change at least one thing" }), oE = k({
		slug: T(),
		container: T(),
		name: T().optional(),
		running: D(),
		image: T(),
		tunnelRunning: D().optional(),
		resources: rE.optional()
	}), sE = M([
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
	]), cE = k({
		op: sE,
		slug: T().min(1),
		hash: T().optional(),
		resources: aE.optional(),
		parentUrl: T().optional(),
		pair: T().optional().meta({ secret: !0 }),
		setupCode: T().optional().meta({ secret: !0 }),
		definition: T().optional(),
		overlay: T().optional(),
		overlayHash: T().optional()
	}), lE = cE.extend({ id: T().min(1) }), uE = A("kind", [
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
	]), dE = M(["upgrade", "restart"]), fE = k({ op: dE }), pE = fE.extend({ id: T().min(1) }), mE = M([
		"mirror-off",
		"mirror-on",
		"sync-pause",
		"sync-resume",
		"sync-unpair",
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), mE.exclude([
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), hE = T().max(200).regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/), gE = T().min(1).max(4096).regex(/^(?:~|\/|[A-Za-z]:[\\/])[^"'`$;|&\n\r]*$/), _E = k({
		id: T().min(1),
		command: mE,
		sandboxId: hE.optional(),
		mode: M(["sync", "mirror"]).optional(),
		localDir: gE.optional()
	}), vE = k({
		ok: D(),
		message: T(),
		output: T().optional(),
		refused: D()
	}), yE = M([
		"created",
		"modified",
		"deleted"
	]), bE = k({
		path: T(),
		local: yE.optional(),
		sandbox: yE.optional()
	}), xE = k({
		sandboxId: T(),
		mode: M(["sync", "mirror"]),
		localDir: T().optional(),
		mirroring: M(["on", "off"]).optional(),
		mutagenStatus: T().optional(),
		conflicts: E().int().nonnegative().optional(),
		conflictedPaths: O(bE).optional(),
		paused: D().optional(),
		backupStatus: T().optional()
	}), SE = M([
		"mirrored",
		"held-by-sandbox",
		"busy"
	]), CE = k({
		port: E().int().min(1).max(65535),
		host: M(["127.0.0.1", "::1"]),
		sandboxId: T(),
		state: SE,
		heldBy: T().optional(),
		command: T().optional()
	}), wE = k({
		running: D(),
		pid: E().int().optional(),
		installed: T().optional(),
		build: T().optional(),
		lastTickAt: E().optional()
	}), TE = k({
		hostname: T(),
		os: T(),
		wsl: ZT.optional(),
		pairings: O(xE),
		ports: O(CE),
		agent: wE,
		capturedAt: E()
	}), EE = M([
		"offline",
		"scope-off",
		"no-agent",
		"unreported"
	]), DE = k({
		machine: T(),
		mode: M(["sync", "mirror"]),
		seenAt: E().optional()
	}), OE = k({
		key: T(),
		label: T(),
		sync: DE.optional(),
		hostId: T().optional(),
		online: D().optional(),
		platform: T().optional(),
		facts: QT.optional(),
		agentVersion: T().optional(),
		lastSeen: E().optional(),
		report: TE.optional(),
		sandboxes: O(oE).optional(),
		gap: EE.optional()
	}), kE = k({ devices: O(OE) }), k({
		enrolled: D(),
		available: D().optional(),
		machines: O(TE).optional()
	});
})), jE, ME, NE, PE, FE, IE, LE, RE, zE, BE, VE, HE, UE = g((() => {
	L(), jE = k({
		state: M([
			"ready",
			"unavailable",
			"unknown"
		]).describe("Whether this runtime can serve a turn. Unknown is a real answer rather than a soft no: a check that could not run must not grey out a provider you can in fact use."),
		detail: T().optional().describe("Why it cannot, and what to do about it. Absent when it can."),
		checkedAt: E().describe("When it was last checked, in milliseconds.")
	}), ME = k({
		version: T().optional().describe("What the downloaded build says it is. Absent means ready but unnamed, never that nothing is ready."),
		channel: T().describe("Which channel it was taken from. Not necessarily the one this sandbox follows: downloading a beta build is not the same as moving onto beta."),
		at: E().describe("When the download finished, in milliseconds, which answers whether this is still the update being offered.")
	}), NE = k({
		name: T().optional().describe("What this sandbox is called."),
		image: T().optional().describe("The image it is running."),
		version: T().optional().describe("The version of that image."),
		latest: T().optional().describe("The newest published version on its channel."),
		updateAvailable: D().optional().describe("Whether those two differ."),
		runtimes: j(T(), jE).optional().describe("Which agent runtimes can serve a turn right now, keyed by runtime. Absent until the first check has run, which reads the same as every entry being unknown."),
		channel: T().optional().describe("Which release channel this sandbox follows."),
		previousImage: T().optional().describe("The image the last update replaced, which is what a rollback would return to. Absent means there is nothing to go back to."),
		updateNotes: O(T()).optional().describe("What is in the update, in the words of the people it is for, newest first. Absent or empty whenever there is nothing worth saying, which reads on screen exactly as it did before there were notes at all."),
		moreUpdateNotes: E().optional().describe("How many further notes there are beyond the ones sent, for a sandbox left alone a long time. Absent or zero means you have all of them."),
		breakingNotes: O(T()).optional().describe("What the update takes away, uncapped, because a warning that fell off a shortened list is a breaking update taken unwarned. Absent for the overwhelming majority, which break nothing."),
		staged: ME.optional().describe("An update already downloaded and built on the machine running this container, waiting only for the restart that applies it. That restart is seconds, where an unprepared update is minutes, which is a different decision entirely. Absent when nothing is waiting.")
	}), PE = k({
		kind: M([
			"unreadable",
			"unknownKey",
			"invalidEntry"
		]).describe("What to do about it. Unreadable means the whole file is being ignored and everything in it is at its default. An unknown key means only that key is ignored. An invalid entry means one item of a list was skipped and the rest is fine."),
		detail: T().describe("What exactly was wrong, as one sentence and nothing else. Never the remedy: that is `fix`."),
		suggestion: T().optional().describe("The name it was probably meant to be, when one is close enough to guess honestly."),
		fix: T().optional().describe("What to do about it, when that is something other than 'correct the file'. Absent whenever the file itself is the thing to edit.")
	}), FE = k({
		path: T().describe("The file, as a workspace path. The file is the unit somebody fixes, which is why problems are grouped by it."),
		problems: O(PE).describe("Everything currently wrong with it. A file with nothing wrong is absent rather than present and empty.")
	}), IE = O(FE), LE = k({
		path: T().describe("The file to repair, as the workspace path the problem was reported under. Only the handful of manifests a person hand-edits can be named; anything else is refused."),
		key: T().describe("The stray top-level key, exactly as it was reported. Absent from the file already means there is nothing to do."),
		to: T().optional().describe("Rename the key to this instead of removing it, carrying its value across. Absent means remove it. Naming a key that is already in the file is refused rather than silently overwriting what is there.")
	}), RE = k({
		token: T().describe("The credential every other call carries. Present it as a bearer token."),
		expiresAt: E().describe("When it stops working, in milliseconds, so a caller can renew ahead of it without reading the token."),
		email: T().describe("Who the sandbox verified you as.")
	}), M([
		"google",
		"ticket",
		"passkey",
		"recovery"
	]), zE = k({
		id: T().describe("The credential id the authenticator chose, base64url."),
		email: T().describe("Whose passkey this is; the owner's list carries every member's, a member's only their own."),
		label: T().describe("The name given at registration, or the daemon's default."),
		rpId: T().describe("The editor host this passkey is bound to; a passkey answers only from that origin."),
		createdAt: E().describe("Epoch ms of registration."),
		lastUsedAt: E().optional().describe("Epoch ms of the last sign-in it answered; absent means never."),
		backedUp: D().describe("Whether the authenticator syncs this passkey (a phone's keychain) or holds the only copy (a hardware key).")
	}), k({
		passkeys: O(zE),
		required: D().describe("Whether a passkey is the only proof that opens this sandbox; owner-set."),
		recovery: k({ remaining: E() }).optional().describe("Owner only, while required: how many one-time recovery codes are still unspent.")
	}), k({ required: D() }), k({ codes: O(T()) }), k({ code: T().min(1) }), k({
		error: T(),
		requires: N("passkey"),
		enrolled: D()
	}), BE = T().regex(/^[A-Za-z0-9_-]+$/, "base64url"), VE = k({
		id: BE,
		rawId: BE,
		type: N("public-key"),
		response: k({
			clientDataJSON: BE,
			attestationObject: BE,
			transports: O(T()).optional()
		}),
		authenticatorAttachment: T().optional(),
		clientExtensionResults: j(T(), dc()).optional()
	}), HE = k({
		id: BE,
		rawId: BE,
		type: N("public-key"),
		response: k({
			clientDataJSON: BE,
			authenticatorData: BE,
			signature: BE,
			userHandle: BE.optional()
		}),
		authenticatorAttachment: T().optional(),
		clientExtensionResults: j(T(), dc()).optional()
	}), k({
		response: VE,
		label: T().optional()
	}), k({ response: HE });
})), WE, GE = g((() => {
	z(), L(), Dh(), Wv(), AE(), Bw(), W(), UE(), Xm(), WT(), WE = {
		info: R.route({
			method: "GET",
			path: "/info",
			summary: "What this sandbox is",
			description: "The sandbox's own identity and state: which workspace it holds, which image it runs, what it is called, and the list of calls it actually implements. Start here, because a browser is routinely newer than the sandbox it is talking to and this is how it finds out what is there."
		}).output(NE),
		manifestProblems: R.route({
			method: "GET",
			path: "/system/manifest-problems",
			summary: "Settings files the sandbox could not read",
			description: "Anything the daemon tripped over in its own configuration on disk: a file it had to fall back from, a key it did not recognise, an entry it skipped. Separate from the identity call because it goes stale for a different reason, namely a file changing."
		}).output(IE),
		repairManifest: R.route({
			method: "POST",
			path: "/system/manifest-problems/repair",
			summary: "Take a stray setting out of a file",
			description: "Removes a key the sandbox does not recognise from one of its settings files, or renames it to the one it was probably meant to be, keeping the value. Only the files a person hand-edits can be named, and only a key — never a value — so this can only ever remove something already being ignored. Renaming onto a key the file already has is refused instead of overwriting it."
		}).input(LE).output(H),
		session: R.route({
			method: "POST",
			path: "/system/session",
			summary: "Trade a sign-in for a session",
			description: "Exchanges a verified sign-in, or a session that has not expired yet, for a fresh session the daemon minted. That session is the credential every other call carries, and calling this again with a live one renews it."
		}).output(RE),
		events: R.route({
			method: "GET",
			path: "/events",
			summary: "The live event stream",
			description: "A stream held open for as long as you want it, carrying heartbeats so a caller notices the sandbox dying at once, batches of file changes so a tree or an editor can refresh itself, and the roster of who else is looking. Give it an id for this connection to appear in that roster; leave it out and you watch without being seen."
		}).input(k({ clientId: T().optional() })).output(Iu(Uv)),
		presence: R.route({
			method: "POST",
			path: "/system/presence",
			summary: "Say what you are looking at",
			description: "Reports which view, conversation or file this connection is on, or that it has gone idle. The daemon fans it back out on the event stream so everyone else's roster updates."
		}).input(zw).output(H),
		usage: R.route({
			method: "GET",
			path: "/system/usage",
			summary: "What has been spent",
			description: "Token and cost totals per account, added up from the record of every finished turn."
		}).output(UT),
		terminals: R.route({
			method: "GET",
			path: "/system/terminals",
			summary: "Open terminals",
			description: "The terminal sessions this sandbox is holding, which is what a terminal panel rebuilds its tabs from after a reload. The live typing and output run over a separate socket; this is the list."
		}).output(Im),
		killTerminal: R.route({
			method: "DELETE",
			path: "/system/terminals/{name}",
			summary: "Close a terminal",
			description: "Destroys one terminal session and whatever was running inside it."
		}).input(Lm).output(H),
		terminalScrollback: R.route({
			method: "GET",
			path: "/system/terminals/{name}/scrollback",
			summary: "A terminal's history as plain text",
			description: "What has scrolled past in one terminal, as text you can select and copy. The live view is a picture of a screen on the far side of a socket, with nothing in the page to select, so scrolling back and copying is this call rather than a gesture."
		}).input(Rm).output(zm),
		browsers: R.route({
			method: "GET",
			path: "/system/browsers",
			summary: "Browsers the agent has open",
			description: "Every browser a conversation currently has running and the pages inside each one. The picture of what they are showing comes over a separate socket; this is the roster."
		}).output(Hm),
		closeBrowser: R.route({
			method: "DELETE",
			path: "/system/browsers/{name}",
			summary: "Shut a browser down",
			description: "Closes one of the agent's browsers. Its next attempt to use that browser then fails as though it had crashed, which is the honest account of somebody pulling the plug."
		}).input(Um).output(H),
		subagents: R.route({
			method: "GET",
			path: "/system/subagents",
			summary: "Subagents the agents have started",
			description: "Every subagent and child agent this sandbox's conversations have delegated work to, whichever tool started it, with what each one is doing."
		}).output(Jm),
		subagentTranscript: R.route({
			method: "GET",
			path: "/system/subagents/{id}/transcript",
			summary: "A subagent's record",
			description: "The full record of one delegated subagent, in the same shape as any other conversation. It comes live from the parent turn while it works, and from stored history once it has finished."
		}).input(Ym).output(wh),
		devices: R.route({
			method: "GET",
			path: "/system/devices",
			summary: "The machines you have connected",
			description: "Every computer this sandbox can see, whether it reached it through desktop sync or through a connected device, in one row per machine: what it says about itself, which sandboxes it holds, and what stopped it answering when nothing came back."
		}).output(kE),
		manageDeviceSandbox: R.route({
			method: "POST",
			path: "/system/devices/{id}/sandboxes/{slug}",
			summary: "Drive a sandbox on one of your own devices",
			description: "Start, stop, restart, update, rebuild, roll back, reshape (its memory and CPU caps, privileged, GPU) or remove a sandbox running on a machine you own, relayed over the connection that machine holds open. The answer is a stream because the slowest of these takes minutes, and it is the same stream whichever you ask for. The daemon adds no opinion: the machine enforces its own permissions and a refusal arrives as the last line, in the machine's words, naming the switch to flip."
		}).input(lE).output(Iu(uE)),
		runDeviceCommand: R.route({
			method: "POST",
			path: "/system/devices/{id}/commands/{command}",
			summary: "Run one of your device's own CLI actions",
			description: "Performs a named action on a machine you own by running its own intentic-machine command there — turning that device's port mirroring off, say — over the connection it holds open. The set of actions is fixed and the command line is built here from the name, never sent by the caller. The machine enforces its own permissions and a refusal comes back as its own sentence, naming the switch to flip."
		}).input(_E).output(vE),
		runDeviceAgentFlow: R.route({
			method: "POST",
			path: "/system/devices/{id}/agent/{op}",
			summary: "Update or restart the agent on one of your own devices",
			description: "Updates a machine you own to the current intentic-machine agent, or restarts the loop it is running, over the connection that machine holds open. The answer is a stream of the run's own output — and it normally stops mid-run, because the agent's loop is what carries this connection: the work is detached from it first, so it finishes regardless, and the device's reported version is what confirms it. Takes the machine's \"Run commands\" permission, the same one a command typed there would."
		}).input(pE).output(Iu(uE))
	};
})), KE, qE = g((() => {
	z(), L(), qd(), mf(), Yd(), W(), KE = {
		accounts: R.route({
			method: "GET",
			path: "/translator/accounts",
			summary: "Subscriptions connected through the translator",
			description: "What is signed in per provider. Each provider can hold several accounts at once, and the translator spreads work across them."
		}).output(Vd),
		connect: R.route({
			method: "POST",
			path: "/translator/{provider}/connect",
			summary: "Start connecting a subscription",
			description: "Begins the sign-in for one provider and says which of the two shapes it is: a code you type into a device page, which finishes by itself in the background, or a redirect whose landing address you hand back afterwards."
		}).input(k({ provider: Jd })).output(cf),
		status: R.route({
			method: "GET",
			path: "/translator/{provider}/connect",
			summary: "Read a subscription connection attempt",
			description: "Reports whether this exact sign-in attempt is waiting, completed, or failed. Completion is tied to the attempt rather than a change in account count, because signing in to an existing account replaces its credential in place."
		}).input(k({
			provider: Jd,
			state: T().min(1)
		})).output(lf),
		complete: R.route({
			method: "POST",
			path: "/translator/{provider}/complete",
			summary: "Finish a redirect sign-in",
			description: "For the providers that redirect somewhere this sandbox cannot receive: hand back the address you landed on and the connection completes."
		}).input(uf).output(H),
		disconnect: R.route({
			method: "POST",
			path: "/translator/{provider}/disconnect",
			summary: "Disconnect one subscription",
			description: "Clears a single account by name. Any others under the same provider stay connected."
		}).input(k({
			provider: Jd,
			name: T().min(1)
		})).output(H)
	};
})), JE, YE, XE = g((() => {
	z(), L(), qd(), WT(), JE = k({ force: D().default(!1).describe("Measure again even if a reading was taken a moment ago.") }), YE = {
		rollup: R.route({
			method: "GET",
			path: "/usage/rollup",
			summary: "What was spent, grouped",
			description: "The spending record over a range of days, grouped by day, provider, account and model. Everything a cost screen shows is a rearrangement of this one answer, so nothing needs a second call. Read-only: rows are written by the sandbox as turns end, which is what makes it worth trusting."
		}).input(BT).output(VT),
		refreshPlanLimits: R.route({
			method: "POST",
			path: "/usage/plan-limits/refresh",
			summary: "Measure every account's plan limits again",
			description: "Reads how full each connected account's plan limits are, for every provider, and records it. Forced, it measures even accounts read a moment ago, which is the right thing when a plan was just changed and the question is whether the number on screen is still true."
		}).input(JE).output(k({ ok: N(!0) })),
		limitReset: R.route({
			method: "GET",
			path: "/usage/limit-reset/{account}",
			summary: "Whether this account's session window can be reopened now",
			description: "Asks the provider whether it will reopen this account's spent session window immediately, which some plans grant once a week. Only worth asking about an account that has actually been refused: the answer is the provider's judgement at this moment, it is not cached, and an account with no such grant answers plainly that it has none."
		}).input(k({ account: T().min(1).describe("Which account.") })).output(Id),
		claimLimitReset: R.route({
			method: "POST",
			path: "/usage/limit-reset/{account}/claim",
			summary: "Reopen this account's session window now",
			description: "Spends one of the account's weekly resets to reopen its session window immediately. The weekly allowance is untouched and still binds. Answers with what the provider actually did: only `reset` changed anything, and it is the cue to send the refused turn again."
		}).input(k({ account: T().min(1).describe("Which account.") })).output(Ld)
	};
})), ZE, QE = g((() => {
	z(), Wv(), W(), Fy(), ZE = {
		list: R.route({
			method: "GET",
			path: "/vpn",
			summary: "Configured tunnels and which are up",
			description: "Every stored VPN with its live link state, read back from the operating system rather than from memory, so a tunnel dropped from a shell and one dropped from a screen look the same here."
		}).output(ky),
		connect: R.route({
			method: "POST",
			path: "/vpn/{id}/connect",
			summary: "Dial a VPN",
			description: "Brings a stored tunnel up, streaming the client's progress as it authenticates and then sets up routing. Streamed because a dial takes seconds and can fail with something you have to read: a wrong password, a gateway certificate nobody trusts, a code it wants. Connecting one that is already up simply says so."
		}).input(Ay).output(Iu(Dv)),
		disconnect: R.route({
			method: "POST",
			path: "/vpn/{id}/disconnect",
			summary: "Drop a tunnel",
			description: "Takes the tunnel down. One that was already down is fine: the promise is that it is not up afterwards."
		}).input(jy).output(H),
		importForticlient: R.route({
			method: "POST",
			path: "/vpn/import-forticlient",
			summary: "Read connections out of an exported config",
			description: "Turns an exported FortiClient configuration into a list of connections you can add, so somebody holding that file picks from a list instead of retyping a host and port for every tunnel."
		}).input(My).output(Py)
	};
})), $E, eD, tD, nD, rD, iD, aD, oD, sD, cD, lD, uD, dD, fD, pD, mD, hD, gD, _D, vD, yD = g((() => {
	L(), V(), pd(), Jp(), $E = T().min(1).max(24).regex(/^[a-z0-9][a-z0-9-]*$/), eD = M(["fresh", "continue"]), tD = 24, nD = k({
		id: $E.describe("This step's own name, which other steps use to say they wait on it."),
		title: T().min(1).max(60).describe("What to call it on screen. Short: the instruction below is where the detail goes."),
		goal: T().min(1).optional().describe("What done means for this step, in your words. It is what the step is judged against, and a different sentence from what it is told to do."),
		prompt: T().min(1).optional().describe("What the step is told to do. The goal is the suite is green; this is run the tests, take the top failure, fix it. Leaving it out hands over the run's own request untouched, which is right for a step whose whole job is do what was asked."),
		needs: O($E).describe("Which steps must finish first. Empty means it starts when the run does. Naming a step that does not exist, or a loop between steps, is refused when the workflow is saved."),
		handoff: eD.describe("How it meets what came before: a fresh conversation handed the previous step's result, or the same conversation carried on."),
		output: Pp.describe("What it has to produce for the step to count."),
		checks: O(Fp).describe("What has to pass before it counts as done."),
		context: Np.describe("How the step's own repeats meet each other. A long-running step wants to start clean each round; a short polish-this step wants to carry on."),
		maxSpendUsd: E().positive().optional().describe("A ceiling on what this step may spend. The one resource that cannot be recovered after an unattended fan-out, which is why it is here and iteration limits are not. Absent is uncapped."),
		agent: md.optional().describe("Which provider runs it."),
		harness: gd.optional().describe("Which agentic loop runs it."),
		account: T().optional().describe("Which account pays for it."),
		model: T().optional().describe("Which model runs it."),
		actsAs: B.optional().describe("Which persona it acts as. Unpinned, a step gets the strict unwatched default: every tool, and no signed-in accounts at all. Pinning one is how a release check gets a voice, a folder to work in, or the single account it may post from.")
	}), rD = k({
		step: $E.describe("Which step's answer carries the decision. Usually a last step that weighs up the ones before it, though nothing requires that."),
		field: T().min(1).describe("Which of that step's declared answers to read. A declared field is the one part of a step's answer that was checked rather than fished out of prose, which is the whole rule here. Checked when the workflow is saved."),
		pass: O(T().min(1)).min(1).describe("Which values mean ship it. Everything else fails. A list of what passes rather than what fails, because a step answering mostly-pass or pass-with-notes must not ship, and this gets that right without anybody having had to enumerate the ways a model can hedge."),
		dailyMax: E().int().positive().optional().describe("How many runs a day, across every caller. A gate is a paid door with nobody in the loop: one wired into a push-triggered pipeline is a fan-out of conversations per commit. Absent is a small default rather than unlimited.")
	}), iD = M([
		"pass",
		"fail",
		"blocked"
	]), k({
		outcome: iD.describe("Ship it, do not, or we could not tell. That third answer exists because could not reach a judgement is not the product is broken: a gate that reported its own outages as failures is one a team switches off, so it should be the honest answer far more often than the convenient one, and it means a neutral build rather than a red one."),
		reason: T().describe("Why, in one line. Realistically the only part of this a build log will ever show."),
		runId: T().describe("The run behind the verdict, so somebody can go and read it."),
		value: T().optional().describe("What the step actually answered. Absent when there was nothing to read, which is most of the could-not-tell cases.")
	}), aD = k({
		id: B.describe("The workflow's id."),
		name: T().min(1).max(80).describe("What to call it."),
		description: T().max(400).optional().describe("What it is for."),
		steps: O(nD).min(1).max(tD).describe("The steps, each with what it waits on. Every one runs in its own private copy of the repos, always, because parallel steps sharing a tree collide."),
		gate: rD.optional().describe("Present means a machine can run this design and get a ship-it answer back. Absent means an ordinary workflow, started by a person, with no outside door onto it at all."),
		maxParallel: E().int().min(1).max(8).describe("How many steps may run at once. Bounded, because a fan-out of twelve is twelve model sessions, twelve working copies and twelve times the burn rate, on one machine.")
	}), oD = M([
		"pending",
		"running",
		"done",
		"failed",
		"skipped",
		"stopped"
	]), sD = k({
		stepId: $E.describe("Which step this is."),
		state: oD.describe("How it went. Skipped carries what the others cannot: it never ran, because something it was waiting on did not finish. That is why a failed run shows one red step and a trail of grey ones."),
		conversationId: T().describe("The conversation it ran on, and the way from a node on the graph to a real record. Shared with the step before it when they were chained, which is what makes those two one card."),
		startedAt: E().optional().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		iterations: E().int().min(0).describe("How many rounds it took."),
		costUsd: E().optional().describe("What it cost, in dollars."),
		loopState: Bp.optional().describe("How its repeating ended. Out of rounds and stuck both come out as a failed step, and the difference between them is the difference between give it more room and more room will not help."),
		detail: T().optional().describe("What went wrong, when something did."),
		document: Ip.optional().describe("What it produced, once it has produced something that passes its own declared shape. This is what the steps after it are handed."),
		report: T().optional().describe("The start of its closing words. Bounded, so a long answer is not silently cut down to its last few thousand characters and the record stays a sensible size."),
		reportPath: T().optional().describe("Where the whole answer is, as a workspace path. Every step can read it, so a long handoff need not be copied into anybody's prompt.")
	}), cD = M([
		"running",
		"done",
		"failed",
		"stopped",
		"overspent",
		"error"
	]), lD = k({
		runId: T().min(1).describe("This run's id."),
		workflow: aD.describe("The design as it stood when the run started, copied rather than looked up. The run has to keep showing the graph it actually ran, not the one edited twice since, and a run of a deleted workflow has to stay readable."),
		repos: O(_d).min(1).max(50).describe("The workspace as this run began, one exact commit per repository. Every step branches from these, even if the shared tree moves while a wide fan-out is still opening its copies, so the steps can be compared with each other afterwards."),
		request: T().optional().describe("What this run was asked to do, handed to every step on top of its own instructions. It is what makes one saved design worth keeping: two models, one task is a shape, and the task is different every time. Absent for a run started with nowhere to type one."),
		state: cD.describe("How the run is going. Finished means every step that ran got there; a run with skipped steps counts as failed, because a graph that never reached its end did not do what it was asked whatever the survivors managed."),
		startedAt: E().describe("When it began, in milliseconds."),
		endedAt: E().optional().describe("When it ended, in milliseconds."),
		resumed: E().int().min(0).describe("How many times the sandbox restarted under it and picked it back up."),
		detail: T().optional().describe("What went wrong, when something did."),
		steps: O(sD).describe("One entry per step, in the design's own order. Every one is written down as waiting when the run starts, so the picture is complete from the first frame and a missing step never has to mean two things."),
		archivedAt: E().optional().describe("When it was put away, in milliseconds. The record stays readable and every step's branch, transcript and counters are untouched. Its conversations are put away with it, and brought back with it. Absent means live on the board.")
	}), uD = T().optional().describe("What a pipeline presents at /workflows/{id}/gate, when the design declares a gate. Shown to a maintainer or the owner only."), dD = aD.extend({ gateToken: uD }), fD = aD.extend({
		runs: O(lD).describe("Its runs, newest first."),
		gateToken: uD
	}), pD = k({ workflows: O(fD).describe("Every saved design with its own run history.") }), mD = k({ runs: O(lD).describe("Every run across every workflow, newest first, including runs of workflows since deleted.") }), hD = k({ id: T().describe("Which workflow.") }), gD = k({ runId: T().describe("Which run.") }), _D = hD.extend({ request: T().min(1).max(2e4).optional().describe("What to point it at. Optional, because a design whose steps already say what they want is complete on its own; only one written as a shape needs today's sentence.") }), vD = k({
		workflow: aD.describe("The design to write."),
		create: D().describe("Whether you mean to make a new one or replace an existing one. Said outright rather than inferred, so an id that happens to collide is a refusal instead of one saved design quietly overwriting another.")
	});
})), bD, xD = g((() => {
	z(), W(), yD(), bD = {
		list: R.route({
			method: "GET",
			path: "/workflows",
			summary: "Saved workflows and their runs",
			description: "Every workflow somebody has designed, each with its own run history, newest first. One answer rather than two, because a workflow that has never been run is the interesting case rather than a mistake."
		}).output(pD),
		save: R.route({
			method: "POST",
			path: "/workflows",
			summary: "Create or replace a workflow",
			description: "Writes a workflow design. Say which of the two you mean, so an id that happens to collide cannot silently overwrite somebody's work. A design that could never run is refused, in the same words the editor shows while you type: a loop in the steps, a step waiting on one that is not there, a step with no way of knowing it is finished."
		}).input(vD).output(dD),
		rotateGateToken: R.route({
			method: "POST",
			path: "/workflows/{id}/gate/rotate",
			summary: "Rotate a release gate's token",
			description: "Mints a new credential for the workflow's release gate and retires the old one at once. Every pipeline wired to the gate has to be handed the new URL. Refused for a workflow that declares no gate."
		}).input(hD).output(gf),
		remove: R.route({
			method: "DELETE",
			path: "/workflows/{id}",
			summary: "Delete a workflow",
			description: "Removes the design. A run of it that is already going keeps going and stays readable and stoppable, because a run takes its own copy of the design when it starts."
		}).input(hD).output(H),
		run: R.route({
			method: "POST",
			path: "/workflows/{id}/run",
			summary: "Start a workflow",
			description: "Kicks a workflow off and answers immediately with the run as recorded; the work carries on without you. Point it at a question and every step gets that on top of its own instructions. Every step is written down as waiting up front, so the picture is complete from the first frame. Several runs of one design can be in flight at once without colliding."
		}).input(_D).output(lD),
		runs: R.route({
			method: "GET",
			path: "/workflows/runs",
			summary: "Every workflow run",
			description: "All runs across all workflows, newest first. This is also the only place the runs of a deleted workflow are still reachable."
		}).output(mD),
		stopRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/stop",
			summary: "Stop a run now",
			description: "Nothing further starts, and the steps already going are cut off where they stand. Whatever they had written stays on their branches. Deliberately abrupt rather than letting the current step finish: a step is a whole agent turn, and a stop that kept spending for minutes afterwards is indistinguishable from a button that does nothing. It always ends the run, including one left stranded by a daemon that was replaced mid-flight."
		}).input(gD).output(H),
		archiveRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/archive",
			summary: "Take a finished run off the board",
			description: "Nothing is lost and the working copies are reclaimed. Every conversation the run started is put away with it, which is what makes this an archive rather than a dismissal: a step has no card of its own, so merely dropping the run would spill its conversations onto the board at the moment somebody said they were done. Refused while the run is still going."
		}).input(gD).output(H),
		unarchiveRun: R.route({
			method: "POST",
			path: "/workflows/runs/{runId}/unarchive",
			summary: "Bring an archived run back",
			description: "Puts a run and every conversation it started back on the board."
		}).input(gD).output(H)
	};
})), SD, CD, wD, TD, ED, DD, OD, kD, AD, jD, MD, ND, PD, FD, ID, LD, RD, zD, BD, VD = g((() => {
	L(), Yw(), SD = k({ repos: O(T()).describe("Every repository's id, sorted. An id is its folder relative to the workspace root, and \"root\" is the workspace itself.") }), CD = k({
		name: T().min(1).describe("What to call it in the workspace."),
		cloneUrl: T().min(1).describe("Where to clone it from."),
		branch: T().optional().describe("Which branch to check out. Leave it out for the repository's default.")
	}), wD = k({
		name: T().describe("What it ended up called."),
		path: T().describe("Where it landed.")
	}), TD = k({ name: T().min(1).describe("What to call it, which is also its folder under the workspace root.") }), ED = k({
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
	}), DD = k({ repos: O(ED).describe("One entry per repository, saying what happened to it.") }), OD = k({
		template: T().min(1).describe("Which kind of app to scaffold, by its key in the template list."),
		name: T().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("What to call this one.")
	}), kD = k({
		repo: T().describe("Which repository to scaffold into."),
		apps: O(OD).min(1).describe("The apps to add.")
	}), AD = k({
		repo: T().describe("Which repository."),
		session: T().describe("What to call the terminal this runs in, so you can find it again."),
		dirs: O(T()).min(1).describe("Which projects to test, as folders relative to the repository. Empty targets the repository root.")
	}), jD = k({
		key: T().describe("The id to name when scaffolding one."),
		label: T().describe("What to call it on screen."),
		description: T().describe("What you get.")
	}), MD = k({ templates: O(jD).describe("The kinds of app the configured source repository knows how to scaffold.") }), ND = k({
		app: T().describe("The app's name, which is also its folder."),
		kind: T().optional().describe("What sort of app it is: the template it came from, or the framework worked out from its dependencies. Absent when it was found purely by having a dev script."),
		previewUrl: T().optional().describe("Where to open it. Absent when this sandbox has no outside address."),
		running: D().describe("Whether its dev server is up."),
		healthy: D().describe("Whether it is actually answering."),
		installed: D().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: Gw.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves.")
	}), PD = k({ apps: O(ND).describe("The apps in this repository.") }), FD = k({
		name: T().describe("The name the package declares."),
		dir: T().describe("Where it lives, relative to the repository."),
		group: T().describe("The top-level folder it sits under, which is what a diagram colours by.")
	}), ID = M([
		"prod",
		"dev",
		"peer"
	]), LD = k({
		from: T().describe("The package that depends."),
		to: T().describe("The package it depends on."),
		type: ID.describe("Which kind of dependency declared it.")
	}), RD = k({
		packages: O(FD).describe("Every package in the repository."),
		edges: O(LD).describe("Which of them use which. Pure data: how to lay it out is yours to decide.")
	}), zD = k({ repo: T().describe("Which repository.") }), BD = k({
		repo: T().describe("Which repository."),
		app: T().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("Which app inside it.")
	});
})), HD, UD, WD, GD, KD = g((() => {
	L(), HD = k({
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
	}), UD = k({ projects: O(HD).describe("Every project the sandbox found, and whether each is usable.") }), WD = k({ dirs: O(T().max(500)).min(1).max(50).describe("Which projects to install, by folder. Ones already ready, already installing, or with no tool to install them are skipped rather than refused.") }), GD = k({ queued: O(T()).describe("Which of them actually started, which is not necessarily what you asked for.") });
})), qD, JD = g((() => {
	z(), ix(), I_(), W(), VD(), $b(), KD(), Ev(), qD = {
		tree: R.route({
			method: "GET",
			path: "/workspace/tree",
			summary: "The workspace file tree",
			description: "Every folder and file under the workspace root, as one walk. Name a conversation to read its own private copy of the tree instead of the shared one. Folders the daemon skips, such as installed packages, come back without their contents; ask for those separately."
		}).input(ev).output(rv),
		children: R.route({
			method: "GET",
			path: "/workspace/children",
			summary: "A bounded folder listing",
			description: "The entries inside a folder as one flat list. Direct children are the default, which is how the explorer opens a folder the full tree walk left closed; callers that need a small subtree can ask for up to five levels without a request per directory."
		}).input(iv).output(av),
		file: R.route({
			method: "GET",
			path: "/workspace/file",
			summary: "Read part of a text file",
			description: "A window of one file's text, plus how large the whole file is. Never the entire file: an unbounded read is how a single enormous log stalls the daemon for everyone, so ask for the slice you mean to show and page through if you need more."
		}).input(lv).output(fv),
		derived: R.route({
			method: "GET",
			path: "/workspace/derived",
			summary: "Read a file's derived text",
			description: "What a document, picture, recording or archive says, as text, from the shadow the sandbox keeps beside it. This is the same rendering an agent reads instead of the bytes, so it is also the way to check what one is working from. Nothing is derived here: a file with no shadow yet answers that it has none, and whether it could have one."
		}).input(pv).output(yv),
		derive: R.route({
			method: "POST",
			path: "/workspace/derive",
			summary: "Derive a file's text now",
			description: "Renders one file to text and answers with the result, for when its shadow is missing or you want it rebuilt. The same work the background pass does when that setting is on, so this is how a reader gets the text without turning it on for the whole workspace. Costs a parse of exactly one file; a format nothing can read says so rather than failing."
		}).input(pv).output(yv),
		derivedStatus: R.route({
			method: "GET",
			path: "/workspace/derived-status",
			summary: "How the background rendering is doing",
			description: "Whether documents, pictures, recordings and archives are being rendered to text in the background, how many are waiting, which are being read right now, and how many shadows the last whole-tree pass counted. Ask this to tell a file nothing can read from a file whose turn has not come."
		}).output(mv),
		mediaTicket: R.route({
			method: "POST",
			path: "/workspace/media-ticket",
			summary: "Get a pass for streaming a media file",
			description: "Mints the short-lived ticket a video or audio element hands to the streaming route, which serves byte ranges and so cannot carry an ordinary header. Minting it here means a caller can tell whether this sandbox streams media at all, rather than discovering it mid-playback."
		}).input(sv).output(cv),
		resolve: R.route({
			method: "GET",
			path: "/workspace/resolve",
			summary: "Turn a written path into a real file",
			description: "Matches a path somebody wrote in prose against the real tree and says which file it means. A path mentioned in a message is often only the tail of the real one, so this is the lookup behind every clickable file reference rather than a plain existence check."
		}).input(bv).output(xv),
		search: R.route({
			method: "GET",
			path: "/workspace/search",
			summary: "Search the code",
			description: "Ranked results across the whole workspace, grouped, each carrying why it matched and how fresh it is. Left alone it blends plain text, structure, meaning and history in one pass; narrow it to a single kind of search when you already know which you want. Long result sets resume from the cursor it hands back."
		}).input(Kb).output(Qb),
		health: R.route({
			method: "GET",
			path: "/workspace/health",
			summary: "A repo's shape in numbers",
			description: "Where one repo's risk sits: the files that change often and are complicated at once, what the index holds, and which modules the rest of the code leans on most. Scoped to a repo, because a codebase is a repo rather than the whole drop."
		}).input(ex).output(rx),
		classify: R.route({
			method: "GET",
			path: "/workspace/classify",
			summary: "Sort a messy drop into buckets",
			description: "Proposes which of the loose things in the workspace are code, documents, media or archives. A read-only suggestion by fixed rules, with no model involved: nothing moves until a caller applies the moves it likes through the move call."
		}).output(Tv),
		mkdir: R.route({
			method: "POST",
			path: "/workspace/dir",
			summary: "Create a folder",
			description: "Makes a folder, and any missing folders above it."
		}).input(Sv).output(H),
		delete: R.route({
			method: "DELETE",
			path: "/workspace/entry",
			summary: "Delete a file or folder",
			description: "Removes one entry and everything under it. The path travels in the body rather than the address, the same as every other write in this group."
		}).input(ov).output(H),
		move: R.route({
			method: "POST",
			path: "/workspace/move",
			summary: "Move or rename something",
			description: "Moves one entry to a new path, which is also how you rename it."
		}).input(Cv).output(H),
		copy: R.route({
			method: "POST",
			path: "/workspace/copy",
			summary: "Copy a file or folder",
			description: "Duplicates one entry at a new path, recursively for a folder."
		}).input(Cv).output(H),
		setup: R.route({
			method: "GET",
			path: "/workspace/setup",
			summary: "Which projects have their dependencies installed",
			description: "Per project, whether its dependencies are actually present. A project that arrives by import comes without them, so files landing is not the same as the project working: until this says a project is ready, its type checks and tests can only mislead you."
		}).output(UD),
		install: R.route({
			method: "POST",
			path: "/workspace/setup/install",
			summary: "Install a project's dependencies",
			description: "Starts the install for one or more projects in a terminal you can attach to, and answers immediately. The run survives a page reload and its output stays in the terminal history."
		}).input(WD).output(GD),
		repos: R.route({
			method: "GET",
			path: "/workspace/repos",
			summary: "Repos in the workspace",
			description: "Every git repo the daemon found in the workspace, with where each one sits and what it is called."
		}).output(SD),
		addRepo: R.route({
			method: "POST",
			path: "/workspace/repos",
			summary: "Clone a repo in",
			description: "Clones a repository into the workspace beside the others, using whatever forge credentials the sandbox already holds."
		}).input(CD).output(wD),
		createRepo: R.route({
			method: "POST",
			path: "/workspace/repos/new",
			summary: "Start a new repo",
			description: "Makes an empty repository in the workspace: a folder named after it, initialised, with a README that names it and one commit, so an agent can start on it at once. Nothing is cloned and nothing leaves the machine."
		}).input(TD).output(wD),
		sync: R.route({
			method: "POST",
			path: "/workspace/sync",
			summary: "Pull every repo up to date",
			description: "Fetches every repo that has a remote and fast-forwards the ones that can move safely, reporting what happened to each. This runs by itself at the start of a turn; call it directly to refresh on demand, or to re-sync a repo that had drifted."
		}).output(DD),
		templates: R.route({
			method: "GET",
			path: "/workspace/templates",
			summary: "App templates you can add",
			description: "The kinds of app the configured source repo knows how to scaffold, which is what an add-app picker lists."
		}).output(MD),
		addApps: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps",
			summary: "Scaffold new apps into a repo",
			description: "Starts scaffolding one or more apps inside an existing multi-package repo and answers straight away. Watch the terminal it opens for progress and for anything that goes wrong."
		}).input(kD).output(H),
		appsList: R.route({
			method: "GET",
			path: "/workspace/repos/{repo}/apps",
			summary: "Apps inside a repo",
			description: "The apps in one multi-package repo, each with its preview address and whether its dev server is up."
		}).input(zD).output(PD),
		packageGraph: R.route({
			method: "GET",
			path: "/workspace/repos/{repo}/graph",
			summary: "How a repo's packages depend on each other",
			description: "Every package in one multi-package repo and which of its siblings each one uses, which is what a dependency view draws."
		}).input(zD).output(RD),
		modules: R.route({
			method: "GET",
			path: "/workspace/modules",
			summary: "Every package across every repo",
			description: "The named packages in the whole workspace, which is what a review list groups changed files under when a reader wants packages rather than paths. Whole-workspace in one answer, because a review spans repos and asking per repo would be a fan-out on every open."
		}).output(k_),
		startApp: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/start",
			summary: "Start an app's dev server",
			description: "Brings up one app's preview server in an attachable terminal, so its address starts answering."
		}).input(BD).output(H),
		stopApp: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/stop",
			summary: "Stop an app's dev server",
			description: "Shuts one app's preview server down and frees its port."
		}).input(BD).output(H),
		runTests: R.route({
			method: "POST",
			path: "/workspace/repos/{repo}/tests",
			summary: "Run a project's tests",
			description: "Starts the test run for the projects you name in an attachable terminal and answers straight away. The terminal is where the results appear."
		}).input(AD).output(H)
	};
})), YD = g((() => {
	z(), L(), AE(), wb(), tE(), W(), R.output(QT), R.input(Yy).output(H), R.output(H), R.input(dc()).output(dc()), R.input(cE).output(Iu(uE)), R.input(fE).output(Iu(uE));
})), XD, ZD, QD, $D, eO = g((() => {
	L(), XD = k({
		origin: T(),
		mode: M(["read", "act"])
	}), ZD = k({
		browser: T(),
		tabs: E(),
		grants: O(XD),
		paused: D()
	}), QD = k({
		id: T(),
		platform: T().min(1),
		online: D(),
		version: T().optional(),
		lastSeen: E().optional(),
		facts: ZD.optional()
	}), k({ browsers: O(QD) }), $D = k({
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
		cookies: O($D).min(1).max(300)
	}), k({
		account: T().min(1),
		domain: T().min(1)
	}), k({
		ok: D(),
		message: T(),
		cookies: O($D).optional()
	});
})), tO = g((() => {
	z(), L(), wb(), W(), eO(), R.output(ZD), R.input(Qy).output(H), R.output(H), R.input(dc()).output(dc());
})), nO = g((() => {
	z(), L(), Nh(), ud(), V(), qd(), W(), R.output(id), R.input(od).output(Iu(sd)), R.input(cd).output(Iu(Oh)), R.input(Hd).output(k({ applied: D() })), R.input(k({
		conversationId: T().min(1),
		text: T(),
		attachments: O(T()).optional(),
		editorContext: vd.optional()
	})).output(k({
		applied: D(),
		invalid: T().optional()
	})), R.input(k({ toml: T() })).output(k({ settings: O(T()) })), R.input(cd.pick({ conversationId: !0 })).output(H), R.output(H);
})), rO = g((() => {})), iO, aO, oO = g((() => {
	iO = "The interrupted request is repeated below, where part of it was already completed in this session, continue from that point instead of starting over.", aO = {
		auth: `The Claude credential that interrupted this conversation has been renewed, and this turn resumed automatically. ${iO}`,
		outage: `The model provider was briefly unavailable and interrupted this conversation; this turn resumed automatically. ${iO}`,
		restart: `The sandbox restarted while this turn was running, which stopped it, and this turn resumed automatically once it came back. ${iO}`,
		stopped: `The previous attempt at this request stopped before it finished, and it has been sent again. ${iO}`,
		limit: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again. ${iO}`,
		switched: "The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account, which starts a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over.",
		carried: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account of the same provider, in this same session: everything you knew is still here. ${iO}`,
		refused: "The model provider refused the previous attempt at this request outright, because its usage allowance was spent: no part of the request below was read or acted on, and nothing has been done towards it. It has been sent again, and starts from the beginning. Where the sandbox has measured earlier work on this branch, it is in the note headed 'Where the work stands'.",
		answered: "The sandbox restarted while this conversation was waiting for the user to respond; it is back, and their response follows below: continue from where the session left off."
	}, aO.answered;
})), sO = g((() => {})), cO = g((() => {})), lO = g((() => {})), uO, dO = g((() => {
	L(), uO = [
		"editor",
		"read",
		"drive",
		"land"
	], M(uO);
})), fO, pO, mO, hO, gO, _O, vO = g((() => {
	Dp(), fO = [
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
	], pO = fO, pO.filter((e) => e.versioned).map((e) => e.path), pO.filter((e) => e.versioned || e.authored).map((e) => e.path), mO = {
		config: `${Tp}/config`,
		records: `${Tp}/records`,
		local: `${Tp}/local`,
		identity: `${Tp}/identity`,
		secrets: `${Tp}/secrets`
	}, hO = Object.keys(mO), gO = (e) => {
		switch (e.portability) {
			case "secret": return "secrets";
			case "identity": return "identity";
			case "derived": return "local";
			case "carry": return e.versioned === !0 || e.authored === !0 ? "config" : "records";
		}
	}, hO.flatMap((e) => {
		let t = pO.filter((t) => gO(t) === e);
		return t.some((e) => e.versioned === !0) ? t.filter((e) => e.versioned !== !0).map((e) => e.path) : [`${mO[e]}/`];
	}), _O = pO.filter((e) => e.backup !== !1 && (e.portability === "carry" || e.portability === "identity")).map((e) => e.path), pO.filter((e) => !_O.includes(e.path)).map((e) => e.path), pO.filter((e) => e.invalidates.includes("manifests")).map((e) => e.path), `${Tp}`, `${Tp}`;
})), yO = g((() => {})), bO = g((() => {})), xO = g((() => {})), SO = g((() => {})), CO = g((() => {})), wO = g((() => {})), TO, EO = g((() => {
	TO = (e) => e instanceof Error ? e.message : String(e);
})), DO = g((() => {})), OO, kO, AO, jO, MO = g((() => {
	OO = /(?:auth[_-]?token|access[_-]?token|refresh[_-]?token|api[_-]?key|access[_-]?key|secret[_-]?key|client[_-]?secret|private[_-]?key|passwo?rd|passphrase|credentials?|secret|token|bearer)["']?[ \t]*[:=][ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s"',;}\n]*))/gi, kO = [
		/-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
		/PuTTY-User-Key-File-\d/,
		/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:(?!\*+@)[^\s/@]{3,}@/i
	], AO = [
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
	], [...kO, ...AO], jO = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), jO(AO), new RegExp(OO.source, OO.flags);
})), NO = g((() => {})), PO, FO = g((() => {
	PO = 80, PO * .6;
})), IO = g((() => {
	FO(), vO();
})), LO = g((() => {})), RO = g((() => {
	mS();
})), zO = g((() => {
	L(), k({
		type: N("hello"),
		token: T(),
		version: T()
	});
})), BO = g((() => {
	L(), k({
		type: N("hello"),
		token: T(),
		version: T()
	});
})), VO = g((() => {})), HO, UO = g((() => {
	L(), wf(), k({
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
		extra: j(T(), dc()).optional()
	}), HO = k({
		state: M([
			"waiting",
			"code",
			"failed"
		]),
		code: T().optional(),
		detail: T().optional(),
		since: E().optional()
	}), Cf.extend({
		whisperReady: D().optional(),
		pairing: j(T(), HO).optional()
	});
})), WO = g((() => {})), GO = g((() => {})), KO = g((() => {})), qO = g((() => {})), JO = g((() => {})), YO, XO = g((() => {
	YO = {
		cautious: 0,
		balanced: .25,
		eager: .4
	}, YO.balanced;
})), ZO = g((() => {})), QO, $O, ek, tk, nk, rk = g((() => {
	L(), QO = [
		"claude",
		"codex",
		"cursor",
		"opencode",
		"translator"
	], $O = M(QO), ek = k({
		kind: M([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where this engine's version comes from."),
		version: T().optional().describe("Which version, when it is pinned to one.")
	}), tk = k({
		version: T().describe("Which version was refused."),
		reason: T().describe("What was wrong with it: it would not launch, or it did not export what the daemon calls."),
		at: T().describe("When it was refused.")
	}), nk = k({
		id: $O.describe("Which engine."),
		label: T().describe("What it is called on screen."),
		running: k({
			version: T().optional().describe("The version a turn would use right now. Absent means there is no copy of this engine here yet."),
			source: M(["image", "store"]).describe("Whether that version is the one baked into the sandbox image or one the store installed over it.")
		}).describe("What a turn started now would actually run."),
		baked: T().optional().describe("The version the image bakes, which is the floor everything else falls back to. Absent on an image that carries no copy of it."),
		channel: ek.describe("The owner's standing answer for this engine."),
		offered: k({
			version: T().describe("The version this engine would move to."),
			blessed: D().describe("Whether the blessed list names this version, which on the latest channel is routinely no.")
		}).optional().describe("A newer version waiting, absent when the running one is already what the channel asks for."),
		blessed: T().optional().describe("What the blessed list names for this engine, when the list has been read."),
		previous: T().optional().describe("The version kept one step back, which is what going back means."),
		quarantined: O(tk).describe("Versions the store installed and then refused, with the reason."),
		diskBytes: E().int().nonnegative().describe("What this engine's kept versions cost on the daemon's volume."),
		installing: D().optional().describe("Whether this engine is currently being installed in the background.")
	}), k({
		engines: O(nk).describe("Every engine this sandbox can run, whether or not the store holds anything for it."),
		checkedAt: T().optional().describe("When upstream was last asked what it publishes. Absent until the first check has run."),
		listSource: T().describe("Where the blessed list is read from, so a self-hosted sandbox can show its own."),
		listReadAt: T().optional().describe("When that list was last read. Absent means it has never been reachable from here.")
	}), k({
		id: $O.describe("Which engine."),
		kind: M([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where its version should come from."),
		version: T().optional().describe("Which version, required when pinning and ignored otherwise.")
	}), k({
		id: $O.describe("Which engine."),
		version: T().optional().describe("Which version. Leave it out for whatever the channel offers; naming one takes a version nobody has blessed, deliberately."),
		floor: T().optional().describe("Install the lowest published version at or above this one. What a turn refused for being too old sends back.")
	}), k({ id: $O.describe("Which engine.") }), k({
		ok: N(!0).describe("It went through."),
		version: T().describe("Which version is now active."),
		source: M(["image", "store"]).describe("Whether that is the image's copy or the store's."),
		fromNextTurn: D().describe("Whether the change reaches turns already in flight, or only the next one.")
	});
})), ik, ak, ok, sk, ck, lk, uk, dk, fk, pk = g((() => {
	L(), ik = k({
		content: T(),
		hash: T()
	}), ak = k({
		bornAt: E(),
		at: E(),
		apt: O(T()),
		paths: O(T())
	}), ok = M([
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
	]), sk = k({
		tool: T(),
		kind: ok,
		sessions: O(T()),
		commands: O(T()),
		firstAt: E(),
		lastAt: E(),
		count: E(),
		declinedAt: E().optional()
	}), k({
		installs: O(sk),
		drift: ak.optional()
	}), ck = k({
		tool: T(),
		kind: ok,
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
	}), lk = k({
		base: T(),
		root: T().optional()
	}), k({
		proposal: ik.optional(),
		custom: ik.optional(),
		approved: ik.optional(),
		appliedHash: T().optional(),
		container: T().optional(),
		drift: ak.optional(),
		recurring: O(ck).optional(),
		localImage: lk.optional()
	}), k({ hash: T().min(1) }), uk = k({
		name: T(),
		version: T().optional()
	}), dk = k({
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
		tools: O(uk),
		extras: E().optional(),
		purpose: T().optional(),
		detail: T().optional(),
		commands: T().optional()
	}), k({ items: O(dk) }), fk = k({
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
	}), k({ exports: O(fk) });
})), mk, hk, gk, _k, vk, yk = g((() => {
	L(), rd(), mk = M([
		"definition",
		"bundle",
		"hermes",
		"openclaw"
	]), hk = M(["hermes", "openclaw"]), gk = M([
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
	]), _k = k({
		id: T(),
		group: gk,
		label: T(),
		detail: T().optional(),
		applicable: D(),
		reason: T().optional(),
		recommended: D(),
		secrets: O(T())
	}), k({
		source: mk,
		token: T(),
		name: T().optional(),
		items: O(_k),
		carriesSecrets: D(),
		refused: O(T()),
		needsAction: O(nd)
	}), k({
		token: T(),
		items: O(T()),
		includeSecrets: D()
	}), k({
		applied: O(k({
			id: T(),
			group: gk,
			label: T()
		})),
		failed: O(k({
			id: T(),
			label: T(),
			error: T()
		})),
		refused: O(T()),
		needsAction: O(nd),
		presentation: k({
			name: T().optional(),
			image: T().optional()
		}).optional()
	}), vk = k({
		id: T(),
		online: D(),
		found: hk.optional(),
		detail: T().optional()
	}), k({ hosts: O(vk) }), k({ host: T().min(1) });
})), bk, xk, Sk, Ck, wk, Tk, Ek = g((() => {
	L(), rd(), wb(), CC(), bk = pc({
		id: T().min(1),
		remote: T().min(1),
		ref: T().optional()
	}), xk = pc({
		remote: T().min(1),
		ref: T().optional()
	}), Sk = pc({
		baseImage: T().optional(),
		dockerfile: T().optional()
	}), Ck = (e) => {
		let t = e;
		for (; t instanceof xl || t instanceof Sl;) t = t.unwrap();
		return t;
	}, wk = () => pc(Object.fromEntries(Object.entries(oC.shape).map(([e, t]) => [e, Ck(t).optional()]))).prefault({}), Tk = pc({
		schemaVersion: N(1),
		name: T().optional(),
		environment: Sk.prefault({}),
		workspace: xk.optional(),
		repositories: O(bk).prefault([]),
		capabilities: O(db).prefault([]),
		secrets: O(T()).prefault([]),
		settings: wk()
	}), k({
		toml: T(),
		omitted: O(nd)
	}), k({ differences: O(nd) }), k({
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
		definition: Tk,
		excluded: O(k({
			path: T(),
			portability: T(),
			note: T().optional()
		}))
	});
})), Dk = g((() => {})), Ok = g((() => {})), kk = g((() => {})), Ak = g((() => {})), jk = g((() => {})), Mk = g((() => {
	Mp();
})), Nk, Pk, Fk = g((() => {
	Wl(), vf(), Ef(), qh(), R_(), Z_(), $_(), Gb(), Ax(), Mx(), Ix(), Rx(), fS(), VC(), xw(), Cw(), Dw(), kw(), jw(), Hw(), Ww(), Zw(), iT(), fT(), hT(), vT(), OT(), AT(), MT(), RT(), KT(), JT(), XT(), GE(), qE(), XE(), QE(), xD(), JD(), YD(), tO(), nO(), rO(), Nh(), Sp(), oO(), Wv(), Dh(), sO(), cO(), lO(), Wl(), dO(), Dp(), vO(), yO(), bO(), xO(), SO(), CO(), Zu(), td(), pS(), wO(), DS(), DO(), RS(), MO(), NO(), Bu(), IO(), RO(), zO(), BO(), VO(), ud(), UO(), WO(), GO(), KO(), LO(), mS(), Gu(), qO(), JO(), XO(), Mp(), ZO(), wf(), V(), Am(), Y_(), Fg(), wb(), Jg(), Mm(), ix(), AE(), rk(), pk(), ay(), uS(), Pm(), I_(), yw(), Gh(), tE(), Tw(), vy(), dg(), Bw(), Jp(), Ox(), zb(), Yw(), zC(), qd(), nT(), mf(), Yd(), uT(), ET(), Ub(), Uf(), IT(), CC(), rh(), W(), UE(), Xm(), WT(), Fy(), eO(), yD(), VD(), $b(), KD(), Ev(), yk(), Ek(), Dk(), Ok(), kk(), FO(), nE(), Ak(), jk(), Mk(), Nk = {
		accounts: _f,
		activity: Tf,
		agent: Kh,
		agents: L_,
		approvals: X_,
		automations: Q_,
		capabilities: Wb,
		chores: kx,
		ci: jx,
		endpoints: Fx,
		extensions: dS,
		personas: BC,
		safety: kT,
		sessions: LT,
		settings: GT,
		share: qT,
		skills: YT,
		intentic: Ew,
		git: bw,
		history: Sw,
		workspace: qD,
		inventory: Ow,
		issues: Aw,
		logs: Vw,
		loops: Uw,
		panels: Xw,
		ports: rT,
		public: dT,
		prepush: mT,
		providers: _T,
		push: DT,
		secrets: jT,
		system: WE,
		translator: KE,
		usage: YE,
		vpn: ZE,
		exit: Lx,
		workflows: bD
	}, Pk = Rl(Nk), Pk.map((e) => e.name), Ul(Nk);
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function Ik(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Lk(e, t = "|") {
	return e.map((e) => iA(e)).join(t);
}
function Rk(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function zk(e) {
	return new NA(e);
}
function Bk(e) {
	return e == null;
}
function Vk(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Hk(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function Uk(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Wk(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Gk(e) {
	return Wk(e._zod.def) ?? e._zod.def.shape;
}
function Kk(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Uk(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function qk(e, t, n) {
	t in e ? Uk(e, t, n) : e[t] = n;
}
function Jk(e, t, n, r) {
	let i = Gk(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Kk(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : qk(e, a, r ? r(n.value, a) : n.value));
	}
}
function Yk(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Kk(e, n, () => t[n]) : qk(e, n, r.value));
	}
}
function Xk(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function Zk(e) {
	return JSON.stringify(e);
}
function Qk(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function $k(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function eA(e) {
	if ($k(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return $k(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function tA(e) {
	return eA(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function nA(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function rA(e, t, n) {
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
function iA(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function aA(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function oA(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return Jk(i, e, sA(e, t)), rA(e, Xk(n, {
		shape: i,
		checks: []
	}));
}
function sA(e, t) {
	let n = Gk(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function cA(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set(sA(e, t)), a = {};
	return Jk(a, e, Reflect.ownKeys(Gk(e)).filter((e) => !i.has(e))), rA(e, Xk(n, {
		shape: a,
		checks: []
	}));
}
function lA(e, t) {
	if (!eA(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Gk(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return rA(e, Xk(e._zod.def, { shape: uA(e, t) }));
}
function uA(e, t) {
	let n = {};
	return Jk(n, e, Reflect.ownKeys(Gk(e))), Yk(n, t), n;
}
function dA(e, t) {
	if (!eA(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return rA(e, Xk(e._zod.def, { shape: uA(e, t) }));
}
function fA(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return Jk(n, e, Reflect.ownKeys(Gk(e))), Jk(n, t, Reflect.ownKeys(Gk(t))), rA(e, Xk(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function pA(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set(sA(t, n)) : void 0, o = {};
	return Jk(o, t, Reflect.ownKeys(Gk(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), rA(t, Xk(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function mA(e, t, n) {
	let r = n ? new Set(sA(t, n)) : void 0, i = {};
	return Jk(i, t, Reflect.ownKeys(Gk(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), rA(t, Xk(t._zod.def, { shape: i }));
}
function hA(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function gA(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function _A(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function vA(e) {
	return typeof e == "string" ? e : e?.message;
}
function yA(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function bA(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : vA(e.inst?._zod.def?.error?.(e)) ?? vA(a?.(e)) ?? vA(t?.error?.(e)) ?? vA(n.customError?.(e)) ?? vA(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
function xA(e) {
	let t = e.length;
	if (!zA.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function SA(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function CA(e) {
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
function wA(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function TA(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : kA(e, n, r.value);
	}
}
function EA(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function DA(e, t, n) {
	return EA(e, t, n, !1);
}
function OA(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return EA(this, n, r(this));
			},
			set(e) {
				EA(this, n, e);
			}
		});
	}
	return t;
}
function kA(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : EA(this, t, n.bind(this));
		},
		set(e) {
			EA(this, t, e);
		}
	});
}
function AA(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function K(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && BA !== e._zod) {
		BA = void 0;
		return;
	}
	BA = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, HA);
			let e = VA;
			VA = !1;
			try {
				let r = n(this);
				return VA ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), VA ||= e, r;
			} catch (n) {
				throw delete this[t], VA ||= e, n;
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
function jA(e, t, n, r) {
	let i = AA(e, t);
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
function MA(e) {
	let t = () => e;
	return t[UA] = !0, t;
}
var NA, PA, FA, IA, LA, RA, zA, BA, VA, HA, UA, WA = g((() => {
	$A(), NA = class {
		constructor(e) {
			this._getter = e, this._value = void 0;
		}
		get value() {
			let e = this._getter;
			return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
		}
	}, PA = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, FA = /* @__PURE__*/ zk(() => {
		if (QA.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), IA = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), LA = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, RA = {
		int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
		uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
	}, zA = /[\uD800-\uDBFF]/, VA = !1, HA = {
		configurable: !0,
		get() {
			VA = !0;
		}
	}, UA = "~constantCatch";
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
function GA(e) {
	let t = YA;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return YA = null, new e();
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
			JA.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", JA);
			} finally {
				JA.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), TA(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? GA(u) : this;
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
function KA(e) {
	return e && Object.assign(QA, e), QA;
}
var qA, JA, YA, XA, ZA, QA, $A = g((() => {
	WA(), JA = {
		value: void 0,
		enumerable: !1
	}, YA = "captureStackTrace" in Error ? Error : null, XA = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, ZA = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (qA = globalThis).__zod_globalConfig ?? (qA.__zod_globalConfig = {}), QA = globalThis.__zod_globalConfig;
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function ej() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Rk, 2), e.message;
}
function tj(e) {
	this._zod.message = e;
}
function nj(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function rj(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? nj(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function ij(e, t = (e) => e.message) {
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
var aj, oj, sj, cj, lj, uj = g((() => {
	$A(), WA(), aj = {
		get: ej,
		set: tj,
		enumerable: !0,
		configurable: !0
	}, oj = {
		value: void 0,
		enumerable: !1
	}, sj = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), cj = (e, t) => {
		e.name = "$ZodError", oj.value = t, Object.defineProperty(e, "issues", oj), oj.value = void 0, Object.defineProperty(e, "message", aj);
		let n = Object.getPrototypeOf(e);
		sj.has(n) || (sj.add(n), Object.defineProperty(n, "toString", {
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
	}, lj = q("$ZodError", cj), q("$ZodError", cj, void 0, { Parent: Error });
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function dj(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
function fj(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => bA(e, n, KA()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
function pj(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[yj] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new XA();
	return a.issues.length === 0;
}
var mj, hj, gj, _j, vj, yj, bj, xj, Sj, Cj, wj, Tj, Ej, Dj, Oj, kj, Aj = g((() => {
	$A(), WA(), mj = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new XA();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => bA(e, o, KA())));
				throw PA(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, hj = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => bA(e, o, KA())));
				throw PA(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, gj = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new XA();
		return a.issues.length ? fj(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, _j = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? fj(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, vj = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), yj = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), bj = ((e, t, n) => {
		let r = e._zod.bag.validator;
		if (r !== void 0) {
			if (r(t) !== vj) return !0;
			if (r.definite === !0 && n === void 0) return !1;
		}
		return pj(e, t, n);
	}), xj = async (e, t, n) => {
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
	}, Sj = (e) => {
		let t = mj(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, dj(n, a));
		};
		return n;
	}, Cj = (e) => {
		let t = mj(e), n = (e, r, i, a) => t(e, r, i, dj(n, a));
		return n;
	}, wj = (e) => {
		let t = hj(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, dj(n, a));
		};
		return n;
	}, Tj = (e) => {
		let t = hj(e), n = async (e, r, i, a) => await t(e, r, i, dj(n, a));
		return n;
	}, Ej = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return gj(e)(t, n, i);
	}, Dj = (e) => (t, n, r) => gj(e)(t, n, r), Oj = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return _j(e)(t, n, i);
	}, kj = (e) => async (t, n, r) => _j(e)(t, n, r);
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
function jj(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function Mj() {
	return new RegExp(qj, "u");
}
function Nj(e) {
	return RegExp(`^${e}$`);
}
function Pj(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Fj(e) {
	return RegExp(`^${Pj(e)}$`);
}
function Ij(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Pj({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Pj({ precision: e.precision })}` : n;
	return RegExp(`^${nM}T(?:${r})$`);
}
var Lj, Rj, zj, Bj, Vj, Hj, Uj, Wj, Gj, Kj, qj, Jj, Yj, Xj, Zj, Qj, $j, eM, tM, nM, rM, iM, aM, oM, sM, cM, lM = g((() => {
	Lj = /^[cC][0-9a-z]{6,}$/, Rj = /^[0-9a-z]+$/, zj = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Bj = /^[0-9a-vA-V]{20}$/, Vj = /^[A-Za-z0-9]{27}$/, Hj = /^[a-zA-Z0-9_-]{21}$/, Uj = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Wj = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Gj = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Kj = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, qj = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", Jj = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yj = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Xj = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Zj = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qj = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, $j = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, eM = /^https?$/, tM = /^\+[1-9]\d{6,14}$/, nM = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", rM = /*@__PURE__*/ Nj(nM), iM = /^[\s\S]{0,}$/, aM = /^-?\d+(?:\.\d+)?$/, oM = /^(?:true|false)$/i, sM = /^[^A-Z]*$/, cM = /^[^a-z]*$/;
})), uM, dM, fM, pM, mM, hM, gM, _M, vM, yM, bM, xM, SM, CM, wM, TM, EM, DM, OM = g((() => {
	$A(), lM(), WA(), uM = /*@__PURE__*/ q("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), dM = (e) => {
		let t = e.value;
		return !Bk(t) && t.length !== void 0;
	}, fM = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, pM = /*@__PURE__*/ q("$ZodCheckLessThan", (e, t) => {
		uM.init(e, t);
		let n = fM[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: fM[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), mM = /*@__PURE__*/ q("$ZodCheckGreaterThan", (e, t) => {
		uM.init(e, t);
		let n = fM[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: fM[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), hM = /*@__PURE__*/ q("$ZodCheckMultipleOf", (e, t) => {
		uM.init(e, t), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : Hk(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), gM = /*@__PURE__*/ q("$ZodCheckNumberFormat", (e, t) => {
		uM.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = LA[t.format];
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
	}), _M = /*@__PURE__*/ q("$ZodCheckMaxLength", (e, t) => {
		var n;
		uM.init(e, t), (n = e._zod.def).when ?? (n.when = dM), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? xA(r) : i) <= t.maximum) return;
			let a = SA(r);
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
	}), vM = /*@__PURE__*/ q("$ZodCheckMinLength", (e, t) => {
		var n;
		uM.init(e, t), (n = e._zod.def).when ?? (n.when = dM), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? xA(r) : i) >= t.minimum) return;
			let a = SA(r);
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
	}), yM = /*@__PURE__*/ q("$ZodCheckLengthEquals", (e, t) => {
		var n;
		uM.init(e, t), (n = e._zod.def).when ?? (n.when = dM), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? xA(r) : i;
			if (a === t.length) return;
			let o = SA(r), s = a > t.length;
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
	}), bM = /*@__PURE__*/ q("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		uM.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
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
	}), xM = /*@__PURE__*/ q("$ZodCheckRegex", (e, t) => {
		bM.init(e, t), e._zod.check = (n) => {
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
	}), SM = /*@__PURE__*/ q("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= sM, bM.init(e, t);
	}), CM = /*@__PURE__*/ q("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= cM, bM.init(e, t);
	}), wM = /*@__PURE__*/ q("$ZodCheckIncludes", (e, t) => {
		uM.init(e, t);
		let n = nA(t.includes);
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
	}), TM = /*@__PURE__*/ q("$ZodCheckStartsWith", (e, t) => {
		uM.init(e, t);
		let n = RegExp(`^${nA(t.prefix)}.*`);
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
	}), EM = /*@__PURE__*/ q("$ZodCheckEndsWith", (e, t) => {
		uM.init(e, t);
		let n = RegExp(`.*${nA(t.suffix)}$`);
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
	}), DM = /*@__PURE__*/ q("$ZodCheckOverwrite", (e, t) => {
		uM.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), kM, AM = g((() => {
	kM = class {
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
})), jM, MM = g((() => {
	jM = {
		major: 4,
		minor: 6,
		patch: 5
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
async function NM(e, t) {
	let n = { async: !0 };
	return oN(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function PM(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return oN(r, n);
			} catch {}
			return NM(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
function FM(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function IM(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? FM(e) || 2 : LM(e, t);
}
function LM(e, t) {
	if (!t.normalize && t.protocol?.source === eM.source && !/^https?:\/\//i.test(e)) return 1;
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
function RM(e) {
	return e.replace(dN, "");
}
function zM(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function BM(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function VM(e) {
	return TN.test(e) ? FM(`http://[${e}]`) : !1;
}
function HM(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : VM(n);
}
function UM(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function WM(e) {
	if (!jN.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return UM(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function GM(e, t = null) {
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
function KM(e, t, n) {
	e.issues.length && t.issues.push(..._A(n, e.issues)), t.value[n] = e.value;
}
function qM(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(..._A(n, e.issues));
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
function JM(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : VN, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = aA(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function YM(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (hA(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => qM(e, n, i, t, d, f))) : qM(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function XM(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !hA(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => bA(e, r, KA())))
	}), t);
}
function ZM(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (eA(e) && eA(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = ZM(e[n], t[n]);
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
			let i = e[r], a = t[r], o = ZM(i, a);
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
function QM(e, t, n) {
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
	let c = ZM(t.value, n.value);
	if (!c.valid) {
		if (hA(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function $M(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function eN(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function tN(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function nN(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => bA(e, r, KA())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function rN(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function iN(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function aN(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(wA(e));
	}
}
var J, oN, sN, Y, cN, lN, uN, dN, fN, pN, mN, hN, gN, _N, vN, yN, bN, xN, SN, CN, wN, TN, EN, DN, ON, kN, AN, jN, MN, NN, PN, FN, IN, LN, RN, zN, BN, VN, HN, UN, WN, GN, KN, qN, JN, YN, XN, ZN, QN, $N, eP, tP, nP, rP, iP = g((() => {
	OM(), $A(), AM(), lM(), WA(), MM(), J = /*@__PURE__*/ q("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = jM;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = hA(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (gA(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new XA();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (yA(t.issues, n, e), i ||= hA(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						yA(t.issues, n, e), i ||= hA(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (hA(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new XA();
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
					if (a.async === !1) throw new XA();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return DA(this, "~standard", PM(this));
		},
		set "~standard"(e) {
			EA(this, "~standard", e);
		}
	}), oN = (e, t) => e.issues.length ? { issues: e.issues.map((e) => bA(e, t, KA())) } : { value: e.value }, sN = /*@__PURE__*/ q("$ZodString", (e, t) => {
		J.init(e, t), e._zod.pattern = t.pattern ?? iM, e._zod.parse = (n, r) => {
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
		bM.init(e, t), sN.init(e, t);
	}), cN = /*@__PURE__*/ q("$ZodGUID", (e, t) => {
		t.pattern ??= Wj, Y.init(e, t);
	}), lN = /*@__PURE__*/ q("$ZodUUID", (e, t) => {
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
			t.pattern ??= Gj(e);
		} else t.pattern ??= Gj();
		Y.init(e, t);
	}), uN = /*@__PURE__*/ q("$ZodEmail", (e, t) => {
		t.pattern ??= Kj, Y.init(e, t);
	}), dN = /[\t\n\r]/g, fN = /*@__PURE__*/ q("$ZodURL", (e, t) => {
		Y.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = IM(r, t);
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
					n.value = RM(r);
					return;
				}
				t.hostname && !zM(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !BM(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : RM(r);
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
	}), pN = /*@__PURE__*/ q("$ZodEmoji", (e, t) => {
		t.pattern ??= Mj(), Y.init(e, t);
	}), mN = /*@__PURE__*/ q("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? Hj : jj(t.length), Y.init(e, t);
	}), hN = /*@__PURE__*/ q("$ZodCUID", (e, t) => {
		t.pattern ??= Lj, Y.init(e, t);
	}), gN = /*@__PURE__*/ q("$ZodCUID2", (e, t) => {
		t.pattern ??= Rj, Y.init(e, t);
	}), _N = /*@__PURE__*/ q("$ZodULID", (e, t) => {
		t.pattern ??= zj, Y.init(e, t);
	}), vN = /*@__PURE__*/ q("$ZodXID", (e, t) => {
		t.pattern ??= Bj, Y.init(e, t);
	}), yN = /*@__PURE__*/ q("$ZodKSUID", (e, t) => {
		t.pattern ??= Vj, Y.init(e, t);
	}), bN = /*@__PURE__*/ q("$ZodISODateTime", (e, t) => {
		t.pattern ??= Ij(t), Y.init(e, t);
	}), xN = /*@__PURE__*/ q("$ZodISODate", (e, t) => {
		t.pattern ??= rM, Y.init(e, t);
	}), SN = /*@__PURE__*/ q("$ZodISOTime", (e, t) => {
		t.pattern ??= Fj(t), Y.init(e, t);
	}), CN = /*@__PURE__*/ q("$ZodISODuration", (e, t) => {
		t.pattern ??= Uj, Y.init(e, t);
	}), wN = /*@__PURE__*/ q("$ZodIPv4", (e, t) => {
		t.pattern ??= Jj, Y.init(e, t);
	}), TN = /^[0-9a-fA-F:.]+$/, EN = /*@__PURE__*/ q("$ZodIPv6", (e, t) => {
		t.pattern ??= Yj, Y.init(e, t), e._zod.check = (n) => {
			VM(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), DN = /*@__PURE__*/ q("$ZodCIDRv4", (e, t) => {
		t.pattern ??= Xj, Y.init(e, t);
	}), ON = /*@__PURE__*/ q("$ZodCIDRv6", (e, t) => {
		t.pattern ??= Zj, Y.init(e, t), e._zod.check = (n) => {
			HM(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), kN = /^[0-9a-zA-Z+/]*={0,2}$/, AN = /*@__PURE__*/ q("$ZodBase64", (e, t) => {
		t.pattern ??= kN, Y.init(e, t), e._zod.check = (n) => {
			UM(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), jN = /^[A-Za-z0-9_-]*$/, MN = /*@__PURE__*/ q("$ZodBase64URL", (e, t) => {
		t.pattern ??= jN, Y.init(e, t), e._zod.check = (n) => {
			WM(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), NN = /*@__PURE__*/ q("$ZodE164", (e, t) => {
		t.pattern ??= tM, Y.init(e, t);
	}), PN = /*@__PURE__*/ q("$ZodJWT", (e, t) => {
		Y.init(e, t), e._zod.check = (n) => {
			GM(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), FN = /*@__PURE__*/ q("$ZodNumber", (e, t) => {
		J.init(e, t), e._zod.pattern = aM, e._zod.parse = (n, r) => {
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
	}), IN = /*@__PURE__*/ q("$ZodNumberFormat", (e, t) => {
		gM.init(e, t), FN.init(e, t);
	}), LN = /*@__PURE__*/ q("$ZodBoolean", (e, t) => {
		J.init(e, t), e._zod.pattern = oM, e._zod.parse = (n, r) => {
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
	}), RN = /*@__PURE__*/ q("$ZodUnknown", (e, t) => {
		J.init(e, t), e._zod.parse = (e) => e;
	}), zN = /*@__PURE__*/ q("$ZodNever", (e, t) => {
		J.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), BN = /*@__PURE__*/ q("$ZodArray", (e, t) => {
		J.init(e, t);
		let n = QA.memoizer;
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
				if (c instanceof Promise) o.push(c.then((t) => KM(t, r, e)));
				else if (KM(c, r, e), s && c.issues.length !== 0 && hA(c)) break;
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), VN = [], HN = /*@__PURE__*/ q("$ZodObject", (e, t) => {
		J.init(e, t);
		let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
		if (r) {
			let e = () => {
				let n = { ...r };
				return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
			};
			e.raw = r, Object.defineProperty(t, "shape", { get: e });
		}
		let i = zk(() => JM(t));
		K(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || Uk(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let a = $k, o = t.catchall, s, c = QA.memoizer;
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
					if (hA(t, f)) break;
					f = t.issues.length;
				}
				if (e === "__proto__") continue;
				let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
					value: r[e],
					issues: []
				}, n);
				s instanceof Promise ? l.push(s.then((n) => qM(n, t, e, r, a, o))) : qM(s, t, e, r, a, o);
			}
			return o ? YM(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), UN = /*@__PURE__*/ q("$ZodObjectJIT", (e, t) => {
		HN.init(e, t);
		let n = e._zod.parse, r = zk(() => JM(t)), i = QA.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new kM(["payload", "ctx"], {
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
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : Zk(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
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
		}, o, s = $k, c = !QA.jitless, l = c && FA.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? YM([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), WN = /*@__PURE__*/ q("$ZodUnion", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), K(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), K(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), K(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => Vk(e.source)).join("|")})$`);
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
			return a ? Promise.all(o).then((t) => XM(t, r, e, i)) : XM(o, r, e, i);
		};
	}), GN = /*@__PURE__*/ q("$ZodIntersection", (e, t) => {
		J.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => QM(e, t, n)) : QM(e, i, a);
		};
	}), KN = /*@__PURE__*/ q("$ZodEnum", (e, t) => {
		J.init(e, t);
		let n = Ik(t.entries), r = new Set(n);
		e._zod.values = r, K(e, "pattern", (e) => {
			let t = Ik(e.def.entries).filter((e) => IA.has(typeof e));
			return RegExp(t.length ? `^(${t.map((e) => nA(e.toString())).join("|")})$` : "^[^\\s\\S]$");
		}), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), qN = /*@__PURE__*/ q("$ZodTransform", (e, t) => {
		J.init(e, t), e._zod.optin = "optional", QA.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new ZA(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new XA();
			return n.value = i, n;
		};
	}), JN = /*@__PURE__*/ q("$ZodOptional", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", K(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), K(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Vk(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => $M(e, t)) : $M(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), YN = /*@__PURE__*/ q("$ZodExactOptional", (e, t) => {
		JN.init(e, t), K(e, "values", (e) => e.def.innerType._zod.values), K(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), XN = /*@__PURE__*/ q("$ZodNullable", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin), K(e, "optout", (e) => e.def.innerType._zod.optout), K(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Vk(t.source)}|null)$`) : void 0;
		}), K(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), ZN = /*@__PURE__*/ q("$ZodDefault", (e, t) => {
		J.init(e, t), e._zod.optin = "defaulted", K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => eN(e, t)) : eN(r, t);
		};
	}), QN = /*@__PURE__*/ q("$ZodPrefault", (e, t) => {
		J.init(e, t), e._zod.optin = "defaulted", K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), $N = /*@__PURE__*/ q("$ZodNonOptional", (e, t) => {
		J.init(e, t), K(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => tN(t, e)) : tN(i, e);
		};
	}), eP = /*@__PURE__*/ q("$ZodCatch", (e, t) => {
		J.init(e, t), K(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), K(e, "optout", (e) => e.def.innerType._zod.optout), K(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => nN(e, r, t, n)) : nN(e, r, t, n);
		};
	}), tP = /*@__PURE__*/ q("$ZodPipe", (e, t) => {
		J.init(e, t), K(e, "values", (e) => e.def.in._zod.values), K(e, "optin", (e) => e.def.in._zod.optin), K(e, "optout", (e) => e.def.out._zod.optout), K(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => rN(e, t.in, n)) : rN(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => rN(e, t.out, n)) : rN(r, t.out, n);
		};
	}), nP = /*@__PURE__*/ q("$ZodReadonly", (e, t) => {
		J.init(e, t), K(e, "propValues", (e) => e.def.innerType._zod.propValues), K(e, "values", (e) => e.def.innerType._zod.values), K(e, "optin", (e) => e.def.innerType?._zod?.optin), K(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(iN) : iN(r);
		};
	}), rP = /*@__PURE__*/ q("$ZodCustom", (e, t) => {
		uM.init(e, t), J.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => aN(t, n, r, e));
			aN(i, n, r, e);
		};
	});
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
function aP(e) {
	return typeof e == "object" && !!e;
}
function oP(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function sP(e, t, n) {
	let r = hP.get(e);
	if (r !== void 0) return r ? vP : gP;
	if (t.has(e)) return vP;
	t.add(e);
	let i = gP, a = (e) => {
		if (i !== vP && e?._zod) {
			let r = sP(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = gP;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? _P : o.value?._zod ? sP(o.value, t, n) : gP;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = Wk(c);
			s(e ? o(e, !0) : _P), a(c.catchall);
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
			s(r ? sP(r, t, !1) : _P);
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
	return t.delete(e), cP(e, i);
}
function cP(e, t) {
	return t !== _P && hP.set(e, t === vP), t;
}
function lP(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
function uP() {
	return xP;
}
function dP(e, t) {
	let n = e[pP]?.backEdges;
	return n !== void 0 && aP(t) && n.has(t);
}
var fP, pP, mP, hP, gP, _P, vP, yP, bP, xP, SP = g((() => {
	WA(), fP = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, pP = "~memo", mP = [], hP = /*@__PURE__*/ new WeakMap(), gP = 0, _P = 1, vP = 2, bP = [], xP = {
		alloc(e, t, n) {
			let r = yP;
			if (!r) return n;
			yP = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), bP.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && dP(n, e.value)) throw new fP();
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
						let i = sP(e, /* @__PURE__ */ new Set(), !1);
						if (i === gP) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
						i === vP || r ? n = !0 : r = !0;
					}
					let l = s.value;
					if (!aP(l)) return t(s, c);
					let u = c[pP];
					u || (u = {
						buckets: /* @__PURE__ */ new WeakMap(),
						backEdges: void 0
					}, c[pP] = u);
					let d;
					i === c ? d = a : (d = lP(u, e), i = c, a = d);
					let f = d.get(l);
					if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...oP(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
					yP = d;
					let p = bP.length, ee = t(s, c);
					yP = void 0;
					let te = bP.length > p ? bP.pop() : void 0;
					return ee instanceof Promise ? ee.then((e) => (te && (te.issues = e.issues.length ? oP(e.issues) : mP), e)) : (te && (te.issues = ee.issues.length ? oP(ee.issues) : mP), ee);
				};
				e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
			});
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
function CP() {
	return { localeError: wP() };
}
var wP, TP = g((() => {
	WA(), wP = () => {
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
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(CA(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${iA(e.values[0])}` : `Invalid option: expected one of ${Lk(e.values, "|")}`;
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
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Lk(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
function EP() {
	return new OP();
}
var DP, OP, kP, AP = g((() => {
	OP = class {
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
	}, (DP = globalThis).__zod_globalRegistry ?? (DP.__zod_globalRegistry = EP()), kP = globalThis.__zod_globalRegistry;
})), jP = g((() => {}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function MP(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function NP(e, t) {
	return new e(MP({
		type: "string",
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function PP(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function FP(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function IP(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function LP(e, t) {
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
function RP(e, t) {
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
function zP(e, t) {
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
function BP(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function VP(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function HP(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function UP(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function WP(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function GP(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function KP(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qP(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function JP(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function YP(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function XP(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ZP(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function QP(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $P(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function eF(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tF(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nF(e, t) {
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
function rF(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function iF(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function aF(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function oF(e, t) {
	return new e(MP({
		type: "number",
		checks: [],
		...G(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function sF(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cF(e, t) {
	return new e({
		type: "boolean",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lF(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function uF(e, t) {
	return new e({
		type: "never",
		...G(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dF(e, t) {
	return new pM({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function fF(e, t) {
	return new pM({
		check: "less_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function pF(e, t) {
	return new mM({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function mF(e, t) {
	return new mM({
		check: "greater_than",
		...G(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function hF(e, t) {
	return new hM({
		check: "multiple_of",
		...G(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function gF(e, t) {
	return new _M({
		check: "max_length",
		...G(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function _F(e, t) {
	return new vM({
		check: "min_length",
		...G(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function vF(e, t) {
	return new yM({
		check: "length_equals",
		...G(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function yF(e, t) {
	return new xM({
		check: "string_format",
		format: "regex",
		...G(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function bF(e) {
	return new SM({
		check: "string_format",
		format: "lowercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function xF(e) {
	return new CM({
		check: "string_format",
		format: "uppercase",
		...G(e)
	});
}
// @__NO_SIDE_EFFECTS__
function SF(e, t) {
	return new wM({
		check: "string_format",
		format: "includes",
		...G(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function CF(e, t) {
	return new TM({
		check: "string_format",
		format: "starts_with",
		...G(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function wF(e, t) {
	return new EM({
		check: "string_format",
		format: "ends_with",
		...G(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function TF(e) {
	return new DM({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function EF(e) {
	return /* @__PURE__ */ TF((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function DF() {
	return /* @__PURE__ */ TF((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function OF() {
	return /* @__PURE__ */ TF((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function kF() {
	return /* @__PURE__ */ TF((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function AF() {
	return /* @__PURE__ */ TF((e) => Qk(e));
}
// @__NO_SIDE_EFFECTS__
function jF(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function MF(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...G(n)
	});
}
// @__NO_SIDE_EFFECTS__
function NF(e, t) {
	let n = /* @__PURE__ */ PF((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(wA(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(wA(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function PF(e, t) {
	let n = new uM({
		check: "custom",
		...G(t)
	});
	return n._zod.check = e, n;
}
var FF = g((() => {
	OM(), WA();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function IF(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && Uk(e, t, n[t]);
	return e;
}
function LF(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? kP,
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
function RF(e, t, n, r, i) {
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
	return c && IF(o.schema, c), t.io === "input" && KF(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function zF(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function BF(e, t) {
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
				ref: `${i("__shared")}#/${r}/${zF(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + zF(a)
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
function VF(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		VF(e);
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
function HF(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function UF(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!qF.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? HF(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			Uk(n, r, e.length === 1 ? e[0] : UF(e) ?? { allOf: e });
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
			let t = HF(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function WF(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of qF) if (t in e) return;
	let n = t.filter((e) => JF.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = UF(t);
	else {
		let e = n[0], i = JF.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => UF([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, IF(e, r));
}
function GF(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : IF(i, s), IF(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
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
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) VF(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) WF(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	IF(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, Uk(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: XF(t, "input", e.processors),
					output: XF(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function KF(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return KF(r.element, n);
	if (r.type === "set") return KF(r.valueType, n);
	if (r.type === "lazy") return KF(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return KF(r.innerType, n);
	if (r.type === "intersection") return KF(r.left, n) || KF(r.right, n);
	if (r.type === "record" || r.type === "map") return KF(r.keyType, n) || KF(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : KF(r.in, n) || KF(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (KF(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (KF(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (KF(e, n)) return !0;
		return !!(r.rest && KF(r.rest, n));
	}
	return !1;
}
var qF, JF, YF, XF, ZF = g((() => {
	AP(), WA(), qF = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), JF = ["oneOf", "anyOf"], YF = (e, t = {}) => (n) => {
		let r = LF({
			...n,
			processors: t
		});
		return X(e, r), BF(r, e), GF(r, e);
	}, XF = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = LF({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return X(e, o), BF(o, e), GF(o, e);
	};
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
function QF(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) dI[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && tI(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && tI(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && nI(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && nI(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && iI(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && oI(t, i.mime);
	for (let e of i.patterns ?? []) aI(t, e);
	return t;
}
function $F(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? $F(t.out) : t.type === "catch" ? $F(t.innerType) : e._zod.optin;
}
function eI(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (RF(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), kI) : JSON.parse(o);
}
var tI, nI, rI, iI, aI, oI, sI, cI, lI, uI, dI, fI, pI, mI, hI, gI, _I, vI, yI, bI, xI, SI, CI, wI, TI, EI, DI, OI, kI, AI, jI, MI, NI, PI, FI, II = g((() => {
	lM(), iP(), ZF(), WA(), tI = (e, t, n) => {
		(e[t] === void 0 || n > e[t]) && (e[t] = n);
	}, nI = (e, t, n) => {
		(e[t] === void 0 || n < e[t]) && (e[t] = n);
	}, rI = (e, t) => {
		tI(e, "minimum", t), nI(e, "maximum", t);
	}, iI = (e, t) => {
		e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
	}, aI = (e, t) => {
		e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
	}, oI = (e, t) => {
		e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
	}, sI = (e, t) => {
		e.format = t, t.includes("int") && (e.isInt = !0);
	}, cI = (e, t) => tI(e, "minimum", t.minimum), lI = (e, t) => nI(e, "maximum", t.maximum), uI = (e) => (t, n) => {
		sI(t, n.format);
		let [r, i] = e[n.format];
		tI(t, "minimum", r), nI(t, "maximum", i);
	}, dI = {
		greater_than: (e, t) => tI(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
		less_than: (e, t) => nI(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
		multiple_of: (e, t) => iI(e, t.value),
		number_format: uI(LA),
		bigint_format: uI(RA),
		min_length: cI,
		max_length: lI,
		length_equals: (e, t) => rI(e, t.length),
		min_size: cI,
		max_size: lI,
		size_equals: (e, t) => rI(e, t.size),
		string_format: (e, t) => {
			sI(e, t.format), t.pattern && aI(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
		},
		mime_type: (e, t) => oI(e, t.mime)
	}, fI = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, pI = /* @__PURE__ */ new Map([[kN, Qj], [jN, $j]]), mI = (e) => pI.get(e) ?? e, hI = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = QF(e);
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = fI[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c].map(mI);
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, gI = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = QF(e);
		i.type = u ? "integer" : "number";
		let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
			let n = /* @__PURE__ */ new Set();
			for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : RF(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
			let [a, ...o] = n;
			a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
		}
	}, _I = (e, t, n, r) => {
		n.type = "boolean";
	}, vI = (e, t, n, r) => {
		n.not = {};
	}, yI = (e, t, n, r) => {}, bI = (e, t, n, r) => {
		let i = e._zod.def, a = Ik(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, xI = (e, t, n, r) => {
		RF(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, SI = (e, t, n, r) => {
		RF(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, CI = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = QF(e);
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = X(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, wI = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && RF(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) Uk(i.properties, e, X(o[e], t, {
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
			(t.io === "input" ? $F(n) === void 0 : n._zod.optout === void 0) && s.push(e);
		}
		s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = X(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, TI = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => X(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, EI = (e, t, n, r) => {
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
	}, DI = (e, t, n, r) => {
		let i = e._zod.def, a = X(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, OI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, kI = Symbol(), AI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = eI(i.defaultValue, e, t, n, r);
		o !== kI && (n.default = o);
	}, jI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = eI(i.defaultValue, e, t, n, r);
		o !== kI && (n._prefault = o);
	}, MI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			RF(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, NI = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		X(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, PI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, FI = (e, t, n, r) => {
		let i = e._zod.def;
		X(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	};
})), LI = g((() => {
	$A(), Aj(), uj(), iP(), SP(), OM(), MM(), WA(), lM(), TP(), AP(), AM(), jP(), FF(), ZF(), II(), ZF();
})), RI = g((() => {
	LI();
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
function zI(e, t, n) {
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
var BI, VI, HI, UI = g((() => {
	LI(), WA(), BI = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), VI = (e, t) => {
		lj.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		BI.has(n) || (BI.add(n), zI(n, "format", (e) => (t) => ij(e, t)), zI(n, "flatten", (e) => (t) => rj(e, t)), zI(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, Rk, 2);
		}), zI(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, Rk, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, HI = /*@__PURE__*/ q("ZodError", VI, void 0, { Parent: Error });
})), WI, GI, KI, qI, JI, YI, XI, ZI, QI, $I, eL, tL, nL = g((() => {
	LI(), UI(), WI = /* @__PURE__ */ mj(HI), GI = /* @__PURE__ */ hj(HI), KI = /* @__PURE__ */ gj(HI), qI = /* @__PURE__ */ _j(HI), JI = /* @__PURE__ */ Sj(HI), YI = /* @__PURE__ */ Cj(HI), XI = /* @__PURE__ */ wj(HI), ZI = /* @__PURE__ */ Tj(HI), QI = /* @__PURE__ */ Ej(HI), $I = /* @__PURE__ */ Dj(HI), eL = /* @__PURE__ */ Oj(HI), tL = /* @__PURE__ */ kj(HI);
}));
//#endregion
//#region ../../../tmp/extbuild/deployments/node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function rL() {
	QA.localeError || KA(CP());
}
function iL() {
	QA.memoizer || KA({ memoizer: uP() });
}
function Z(e) {
	return /* @__PURE__ */ NP(OL, e);
}
function aL(e) {
	return /* @__PURE__ */ oF(QL, e);
}
function oL(e) {
	return /* @__PURE__ */ sF($L, e);
}
function sL(e) {
	return /* @__PURE__ */ cF(eR, e);
}
function cL() {
	return /* @__PURE__ */ lF(tR);
}
function lL(e) {
	return /* @__PURE__ */ uF(nR, e);
}
function uL(e, t) {
	return /* @__PURE__ */ jF(rR, e, t);
}
function dL(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...G(t)
	};
	return new iR(n);
}
function fL(e, t) {
	return new aR({
		type: "union",
		options: e,
		...G(t)
	});
}
function pL(e, t) {
	return new oR({
		type: "intersection",
		left: e,
		right: t
	});
}
function mL(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new sR({
		type: "enum",
		entries: n,
		...G(t)
	});
}
function hL(e) {
	return new cR({
		type: "transform",
		transform: e
	});
}
function gL(e) {
	return new lR({
		type: "optional",
		innerType: e
	});
}
function _L(e) {
	return new uR({
		type: "optional",
		innerType: e
	});
}
function vL(e) {
	return new dR({
		type: "nullable",
		innerType: e
	});
}
function yL(e, t) {
	return new fR({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : tA(t);
		}
	});
}
function bL(e, t) {
	return new pR({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : tA(t);
		}
	});
}
function xL(e, t) {
	return new mR({
		type: "nonoptional",
		innerType: e,
		...G(t)
	});
}
function SL(e, t) {
	return new hR({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : MA(t)
	});
}
function CL(e, t) {
	return new gR({
		type: "pipe",
		in: e,
		out: t
	});
}
function wL(e) {
	return new _R({
		type: "readonly",
		innerType: e
	});
}
function TL(e, t = {}) {
	return /* @__PURE__ */ MF(vR, e, t);
}
function EL(e, t) {
	return /* @__PURE__ */ NF(e, t);
}
var Q, DL, OL, $, kL, AL, jL, ML, NL, PL, FL, IL, LL, RL, zL, BL, VL, HL, UL, WL, GL, KL, qL, JL, YL, XL, ZL, QL, $L, eR, tR, nR, rR, iR, aR, oR, sR, cR, lR, uR, dR, fR, pR, mR, hR, gR, _R, vR, yR = g((() => {
	LI(), II(), ZF(), TP(), RI(), nL(), Q = /*@__PURE__*/ q("ZodType", (e, t) => (rL(), J.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(Xk(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return rA(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(TL(e, t));
		},
		superRefine(e, t) {
			return this.check(EL(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ TF(e));
		},
		optional() {
			return gL(this);
		},
		exactOptional() {
			return _L(this);
		},
		nullable() {
			return vL(this);
		},
		nullish() {
			return gL(vL(this));
		},
		nonoptional(e) {
			return xL(this, e);
		},
		array() {
			return uL(this);
		},
		or(e) {
			return fL([this, e]);
		},
		and(e) {
			return pL(this, e);
		},
		transform(e) {
			return CL(this, hL(e));
		},
		default(e) {
			return yL(this, e);
		},
		prefault(e) {
			return bL(this, e);
		},
		catch(e) {
			return SL(this, e);
		},
		pipe(e) {
			return CL(this, e);
		},
		readonly() {
			return wL(this);
		},
		describe(e) {
			let t = this.clone();
			return kP.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return kP.get(this);
			let t = this.clone();
			return kP.add(t, e[0]), t;
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
			return DA(this, "~standard", {
				...PM(this),
				jsonSchema: {
					input: XF(this, "input"),
					output: XF(this, "output")
				}
			});
		},
		set "~standard"(e) {
			EA(this, "~standard", e);
		},
		parse: function e(t, n) {
			return WI(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await GI(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return KI(this, e, t);
		},
		async safeParseAsync(e, t) {
			return qI(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			EA(this, "spa", e);
		},
		validate(e, t) {
			return bj(this, e, t);
		},
		validateAsync(e, t) {
			return xj(this, e, t);
		},
		encode: function e(t, n) {
			return JI(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return YI(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await XI(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await ZI(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return QI(this, e, t);
		},
		safeDecode(e, t) {
			return $I(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return eL(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return tL(this, e, t);
		},
		toJSONSchema(e) {
			return YF(this, {})(e);
		},
		get description() {
			return kP.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), DL = /*@__PURE__*/ q("_ZodString", (e, t) => {
		sN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => hI(e, t, n, r);
	}, /*@__PURE__*/ OA({
		format: (e) => QF(e).format ?? null,
		minLength: (e) => QF(e).minimum ?? null,
		maxLength: (e) => QF(e).maximum ?? null
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ yF(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ SF(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ CF(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ wF(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ _F(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ gF(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ vF(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ _F(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ bF(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ xF(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ DF());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ EF(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ OF());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ kF());
		},
		slugify() {
			return this.check(/* @__PURE__ */ AF());
		}
	})), OL = /*@__PURE__*/ q("ZodString", (e, t) => {
		sN.init(e, t), DL.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ PP(NL, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ BP(IL, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ tF(ZL, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ VP(LL, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ FP(PL, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ IP(FL, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ LP(FL, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ RP(FL, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ zP(FL, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ HP(RL, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ UP(zL, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ WP(BL, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ GP(VL, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ QP(JL, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ $P(YL, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ KP(HL, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ qP(UL, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ JP(WL, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ YP(GL, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ XP(KL, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ ZP(qL, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ eF(XL, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ nF(kL, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ rF(AL, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ iF(jL, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ aF(ML, e));
		}
	}), $ = /*@__PURE__*/ q("ZodStringFormat", (e, t) => {
		Y.init(e, t), DL.init(e, t);
	}), kL = /*@__PURE__*/ q("ZodISODateTime", (e, t) => {
		bN.init(e, t), $.init(e, t);
	}), AL = /*@__PURE__*/ q("ZodISODate", (e, t) => {
		xN.init(e, t), $.init(e, t);
	}), jL = /*@__PURE__*/ q("ZodISOTime", (e, t) => {
		SN.init(e, t), $.init(e, t);
	}), ML = /*@__PURE__*/ q("ZodISODuration", (e, t) => {
		CN.init(e, t), $.init(e, t);
	}), NL = /*@__PURE__*/ q("ZodEmail", (e, t) => {
		uN.init(e, t), $.init(e, t);
	}), PL = /*@__PURE__*/ q("ZodGUID", (e, t) => {
		cN.init(e, t), $.init(e, t);
	}), FL = /*@__PURE__*/ q("ZodUUID", (e, t) => {
		lN.init(e, t), $.init(e, t);
	}), IL = /*@__PURE__*/ q("ZodURL", (e, t) => {
		fN.init(e, t), $.init(e, t);
	}), LL = /*@__PURE__*/ q("ZodEmoji", (e, t) => {
		pN.init(e, t), $.init(e, t);
	}), RL = /*@__PURE__*/ q("ZodNanoID", (e, t) => {
		mN.init(e, t), $.init(e, t);
	}), zL = /*@__PURE__*/ q("ZodCUID", (e, t) => {
		hN.init(e, t), $.init(e, t);
	}), BL = /*@__PURE__*/ q("ZodCUID2", (e, t) => {
		gN.init(e, t), $.init(e, t);
	}), VL = /*@__PURE__*/ q("ZodULID", (e, t) => {
		_N.init(e, t), $.init(e, t);
	}), HL = /*@__PURE__*/ q("ZodXID", (e, t) => {
		vN.init(e, t), $.init(e, t);
	}), UL = /*@__PURE__*/ q("ZodKSUID", (e, t) => {
		yN.init(e, t), $.init(e, t);
	}), WL = /*@__PURE__*/ q("ZodIPv4", (e, t) => {
		wN.init(e, t), $.init(e, t);
	}), GL = /*@__PURE__*/ q("ZodIPv6", (e, t) => {
		EN.init(e, t), $.init(e, t);
	}), KL = /*@__PURE__*/ q("ZodCIDRv4", (e, t) => {
		DN.init(e, t), $.init(e, t);
	}), qL = /*@__PURE__*/ q("ZodCIDRv6", (e, t) => {
		ON.init(e, t), $.init(e, t);
	}), JL = /*@__PURE__*/ q("ZodBase64", (e, t) => {
		AN.init(e, t), $.init(e, t);
	}), YL = /*@__PURE__*/ q("ZodBase64URL", (e, t) => {
		MN.init(e, t), $.init(e, t);
	}), XL = /*@__PURE__*/ q("ZodE164", (e, t) => {
		NN.init(e, t), $.init(e, t);
	}), ZL = /*@__PURE__*/ q("ZodJWT", (e, t) => {
		PN.init(e, t), $.init(e, t);
	}), QL = /*@__PURE__*/ q("ZodNumber", (e, t) => {
		FN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => gI(e, t, n, r), e.isFinite = !0;
	}, /*@__PURE__*/ OA({
		minValue: (e) => {
			let { minimum: t, exclusiveMinimum: n } = QF(e);
			return Math.max(t ?? -Infinity, n ?? -Infinity);
		},
		maxValue: (e) => {
			let { maximum: t, exclusiveMaximum: n } = QF(e);
			return Math.min(t ?? Infinity, n ?? Infinity);
		},
		isInt: (e) => {
			let { isInt: t, multipleOf: n } = QF(e);
			return !!t || !!n?.some(Number.isSafeInteger);
		},
		format: (e) => QF(e).format ?? null
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ pF(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ mF(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ mF(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ dF(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ fF(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ fF(e, t));
		},
		int(e) {
			return this.check(oL(e));
		},
		safe(e) {
			return this.check(oL(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ pF(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ mF(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ dF(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ fF(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ hF(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ hF(e, t));
		},
		finite() {
			return this;
		}
	})), $L = /*@__PURE__*/ q("ZodNumberFormat", (e, t) => {
		IN.init(e, t), QL.init(e, t);
	}), eR = /*@__PURE__*/ q("ZodBoolean", (e, t) => {
		LN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => _I(e, t, n, r);
	}), tR = /*@__PURE__*/ q("ZodUnknown", (e, t) => {
		RN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => yI(e, t, n, r);
	}), nR = /*@__PURE__*/ q("ZodNever", (e, t) => {
		zN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => vI(e, t, n, r);
	}), rR = /*@__PURE__*/ q("ZodArray", (e, t) => {
		iL(), BN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => CI(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ _F(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ _F(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ gF(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ vF(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), iR = /*@__PURE__*/ q("ZodObject", (e, t) => {
		iL(), UN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => wI(e, t, n, r), jA(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return mL(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone(Xk(this._zod.def, { catchall: e }));
		},
		passthrough() {
			return this.clone(Xk(this._zod.def, { catchall: cL() }));
		},
		loose() {
			return this.clone(Xk(this._zod.def, { catchall: cL() }));
		},
		strict() {
			return this.clone(Xk(this._zod.def, { catchall: lL() }));
		},
		strip() {
			return this.clone(Xk(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return lA(this, e);
		},
		safeExtend(e) {
			return dA(this, e);
		},
		merge(e) {
			return fA(this, e);
		},
		pick(e) {
			return oA(this, e);
		},
		omit(e) {
			return cA(this, e);
		},
		partial(...e) {
			return pA(lR, this, e[0]);
		},
		exactPartial(...e) {
			return pA(uR, this, e[0], "exactPartial");
		},
		required(...e) {
			return mA(mR, this, e[0]);
		}
	}), aR = /*@__PURE__*/ q("ZodUnion", (e, t) => {
		WN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => TI(e, t, n, r), e.options = t.options;
	}), oR = /*@__PURE__*/ q("ZodIntersection", (e, t) => {
		GN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => EI(e, t, n, r);
	}), sR = /*@__PURE__*/ q("ZodEnum", (e, t) => {
		KN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => bI(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new sR({
				...t,
				checks: [],
				...G(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new sR({
				...t,
				checks: [],
				...G(r),
				entries: i
			});
		};
	}), cR = /*@__PURE__*/ q("ZodTransform", (e, t) => {
		iL(), qN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => SI(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new ZA(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(wA(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(wA(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), lR = /*@__PURE__*/ q("ZodOptional", (e, t) => {
		JN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => FI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), uR = /*@__PURE__*/ q("ZodExactOptional", (e, t) => {
		YN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => FI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), dR = /*@__PURE__*/ q("ZodNullable", (e, t) => {
		XN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => DI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), fR = /*@__PURE__*/ q("ZodDefault", (e, t) => {
		ZN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => AI(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), pR = /*@__PURE__*/ q("ZodPrefault", (e, t) => {
		QN.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => jI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), mR = /*@__PURE__*/ q("ZodNonOptional", (e, t) => {
		$N.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => OI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), hR = /*@__PURE__*/ q("ZodCatch", (e, t) => {
		eP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => MI(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), gR = /*@__PURE__*/ q("ZodPipe", (e, t) => {
		tP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => NI(e, t, n, r), e.in = t.in, e.out = t.out;
	}), _R = /*@__PURE__*/ q("ZodReadonly", (e, t) => {
		nP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => PI(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), vR = /*@__PURE__*/ q("ZodCustom", (e, t) => {
		rP.init(e, t), Q.init(e, t), e._zod.processJSONSchema = (t, n, r) => xI(e, t, n, r);
	});
})), bR = g((() => {
	LI();
})), xR = g((() => {
	LI(), yR(), RI(), UI(), nL(), bR(), II(), AP(), WA(), RI(), yR(), iP(), TP();
})), SR = g((() => {
	xR(), xR();
})), CR, wR, TR, ER, DR, OR, kR, AR, jR, MR, NR, PR, FR, IR, LR, RR, zR = g((() => {
	Fk(), SR(), CR = "/x/intentic.deployments", wR = mL([
		"running",
		"deploying",
		"stopped",
		"unhealthy",
		"unknown"
	]), TR = mL(["deployment", "stack"]), ER = dL({
		name: Z(),
		image: Z(),
		updateAvailable: sL()
	}), DR = dL({
		kind: TR,
		id: Z(),
		name: Z(),
		state: wR,
		status: Z().optional(),
		server: Z().optional(),
		image: Z().optional(),
		updateAvailable: sL(),
		services: uL(ER),
		url: Z()
	}), OR = mL([
		"ok",
		"unreachable",
		"disabled"
	]), kR = dL({
		id: Z(),
		name: Z(),
		state: OR,
		cpuPercent: aL().optional(),
		memPercent: aL().optional(),
		diskPercent: aL().optional(),
		url: Z()
	}), AR = dL({
		id: Z(),
		type: Z(),
		level: mL([
			"ok",
			"warning",
			"critical"
		]),
		resolved: sL(),
		ts: aL(),
		resource: Z().optional(),
		server: Z().optional(),
		from: Z().optional(),
		to: Z().optional()
	}), jR = dL({
		username: Z(),
		admin: sL()
	}), MR = dL({
		repo: Z(),
		projectName: Z(),
		composePath: Z(),
		linkedStack: Z().optional(),
		suggestions: uL(Z())
	}), dL({
		capability: Z(),
		repo: Z(),
		stack: Z()
	}), NR = dL({
		komodoUrl: Z(),
		reachable: sL(),
		unreachableReason: Z().optional(),
		viewer: jR.optional(),
		repos: uL(MR).default([]),
		resources: uL(DR),
		servers: uL(kR),
		alerts: uL(AR),
		seenAt: aL().optional()
	}), dL({ capability: Z() }), PR = mL([
		"deploy",
		"restart",
		"start",
		"stop",
		"pull"
	]), dL({
		capability: Z(),
		kind: TR,
		id: Z(),
		action: PR
	}), FR = dL({
		capability: Z(),
		kind: TR,
		id: Z()
	}), FR.extend({ pick: Od }), IR = dL({
		stdout: Z(),
		stderr: Z()
	}), LR = dL({ conversationId: Z() }), RR = dL({ seenAt: aL() });
})), BR, VR, HR, UR, WR, GR, KR, qR, JR, YR, XR, ZR, QR, $R, ez = g((() => {
	BR = /* @__PURE__ */ new Set([
		"exited",
		"dead",
		"restarting",
		"unhealthy"
	]), VR = /* @__PURE__ */ new Set([
		"ServerUnreachable",
		"SwarmUnhealthy",
		"BuildFailed",
		"RepoBuildFailed",
		"ProcedureFailed",
		"ActionFailed"
	]), HR = /* @__PURE__ */ new Set([
		"ServerCpu",
		"ServerMem",
		"ServerDisk"
	]), UR = /* @__PURE__ */ new Set([
		"DeploymentImageUpdateAvailable",
		"StackImageUpdateAvailable",
		"ResourceSyncPendingUpdates"
	]), WR = /* @__PURE__ */ new Set(["ContainerStateChange", "StackStateChange"]), GR = (e) => e.server === void 0 ? "" : ` on ${e.server}`, KR = (e) => e.resource ?? e.server ?? "something", qR = (e) => {
		if (e.type === "ServerUnreachable") return `${KR(e)} is unreachable`;
		if (WR.has(e.type)) {
			let t = e.from === void 0 ? "" : `${e.from} → `;
			return `${KR(e)} ${t}${e.to ?? "changed state"}${GR(e)}`;
		}
		return UR.has(e.type) ? `${KR(e)} has a newer image${GR(e)}` : VR.has(e.type) ? `${KR(e)} failed${GR(e)}` : HR.has(e.type) ? `${KR(e)} is high on ${e.type.replace("Server", "").toLowerCase()}` : `${KR(e)}: ${e.type}${GR(e)}`;
	}, JR = (e) => WR.has(e.type) ? e.to !== void 0 && BR.has(e.to) ? "danger" : void 0 : VR.has(e.type) ? "danger" : HR.has(e.type) ? "warning" : UR.has(e.type) ? "info" : void 0, YR = (e) => e.filter((e) => !e.resolved).flatMap((e) => {
		let t = JR(e);
		return t === void 0 ? [] : [{
			alert: e,
			tone: t,
			summary: qR(e)
		}];
	}).toSorted((e, t) => t.alert.ts - e.alert.ts), XR = (e, t) => e.filter((e) => e.alert.ts > (t ?? 0)), ZR = {
		danger: 0,
		warning: 1,
		info: 2
	}, QR = (e) => {
		let t = e.reduce((e, t) => e === void 0 || ZR[t.tone] < ZR[e] ? t.tone : e, void 0);
		return t === void 0 ? [] : e.filter((e) => e.tone === t);
	}, $R = (e) => {
		let [t] = e;
		if (e.length === 1 && t !== void 0) return t.summary;
		let n = e[0]?.tone === "info" ? "updates available" : "needing you";
		return `${e.length} ${n}`;
	};
})), tz, nz, rz, iz, az, oz, sz, cz, lz = g((() => {
	zR(), ez(), Pe(), tz = n(() => []), {state: nz, start: rz, refresh: iz} = t({
		host: Ne,
		everyMs: 6e4,
		immediate: !1,
		initial: () => /* @__PURE__ */ new Map(),
		read: async (e, t) => {
			let n = new Map(t);
			for (let t of tz.value) try {
				n.set(t, NR.parse(await e.sandbox.json(`${CR}/komodo/${t}/overview`)));
			} catch {}
			return n;
		}
	}), az = (e) => {
		let t = e.filter((e) => !tz.value.includes(e));
		tz.value = e, t.length > 0 && iz();
	}, oz = (e) => {
		let t = e.resources.filter((e) => e.state === "deploying").length;
		return t === 0 ? void 0 : `${t} deploying`;
	}, sz = (e) => {
		let t = nz.value.get(e);
		if (t === void 0) return;
		if (!t.reachable) return t.seenAt === void 0 ? {
			mark: "exclamation-circle",
			tone: "warning",
			tooltip: "can't reach Komodo"
		} : void 0;
		let n = oz(t), r = QR(XR(YR(t.alerts), t.seenAt));
		return r.length === 0 ? n === void 0 ? void 0 : { running: n } : {
			count: r.length,
			tone: r[0]?.tone ?? "info",
			tooltip: $R(r),
			...n === void 0 ? {} : { running: n }
		};
	}, cz = async (e) => {
		try {
			let t = Ne();
			if (!t.sandbox.reachable()) return;
			let { seenAt: n } = RR.parse(await t.sandbox.json(`${CR}/komodo/${e}/seen`, { method: "POST" })), r = nz.value.get(e);
			r !== void 0 && (nz.value = new Map(nz.value).set(e, {
				...r,
				seenAt: n
			}));
		} catch {}
	};
})), uz, dz, fz, pz, mz = g((() => {
	uz = {
		role: "status",
		"aria-busy": "true",
		"aria-label": "Loading deployments"
	}, dz = { class: "min-w-0 flex-1" }, fz = { class: "flex h-5 items-center gap-2" }, pz = /*@__PURE__*/ f({
		__name: "DeploymentsSkeleton",
		setup(e) {
			let t = [
				{ name: "w-32" },
				{ name: "w-44" },
				{ name: "w-24" },
				{ name: "w-40" }
			];
			return (e, n) => (m(), c("div", uz, [d(h(be), null, {
				label: se(() => [...n[0] ||= [l("span", { class: "flex h-4 items-center gap-3" }, [
					l("span", { class: "skeleton h-3 w-28" }),
					l("span", { class: "skeleton h-3.5 w-12 rounded-full" }),
					l("span", { class: "skeleton h-1.5 w-12 rounded-full" }),
					l("span", { class: "skeleton h-1.5 w-12 rounded-full" })
				], -1)]]),
				default: se(() => [(m(), c(i, null, re(t, (e, t) => l("div", {
					key: t,
					class: "flex w-full items-center gap-3 border-l-4 border-line px-4 py-3"
				}, [
					n[3] ||= l("span", { class: "skeleton h-4 w-4 shrink-0 rounded-full" }, null, -1),
					l("div", dz, [l("div", fz, [l("span", { class: p(["skeleton h-3.5 max-w-full", e.name]) }, null, 2), n[1] ||= l("span", { class: "skeleton h-4 w-10 rounded" }, null, -1)]), n[2] ||= l("div", { class: "mt-0.5 flex h-4 items-center gap-2" }, [l("span", { class: "skeleton h-2.5 w-20" }), l("span", { class: "skeleton h-2.5 w-28" })], -1)]),
					n[4] ||= l("div", { class: "flex shrink-0 items-center gap-1" }, [
						l("span", { class: "skeleton h-6 w-16 rounded-md" }),
						l("span", { class: "skeleton h-6 w-14 rounded-md" }),
						l("span", { class: "skeleton h-6 w-6 rounded-md" })
					], -1)
				])), 64))]),
				_: 1
			})]));
		}
	});
})), hz, gz = g((() => {
	mz(), mz(), hz = pz;
})), _z, vz, yz, bz, xz, Sz, Cz, wz, Tz, Ez, Dz = g((() => {
	_z = { class: "px-4 py-3" }, vz = { class: "flex flex-wrap items-center gap-x-3 gap-y-2" }, yz = { class: "flex min-w-0 items-center gap-2.5" }, bz = { class: "min-w-0" }, xz = { class: "block truncate text-sm font-medium text-content" }, Sz = { class: "block truncate font-mono text-2xs text-subtle" }, Cz = { class: "ml-auto flex flex-wrap items-center gap-2" }, wz = { class: "text-2xs text-muted" }, Tz = { class: "font-medium text-content" }, Ez = /*@__PURE__*/ f({
		__name: "RepoLinkRow",
		props: {
			link: {},
			stacks: {},
			busy: { type: Boolean },
			error: {}
		},
		emits: ["link"],
		setup(e, { emit: t }) {
			let n = e, r = t, f = ne(!1), p = ne(n.link.linkedStack), ee = a(() => n.stacks.map((e) => ({
				value: e,
				label: e
			}))), te = a(() => n.link.suggestions[0]), re = (e) => {
				e !== void 0 && (f.value = !1, r("link", n.link.repo, e));
			};
			return (t, n) => {
				let a = ie("tooltip");
				return m(), c("div", _z, [l("div", vz, [l("span", yz, [d(h(pe), {
					name: "folder",
					class: "shrink-0 text-muted"
				}), l("span", bz, [l("span", xz, ae(e.link.repo), 1), ce((m(), c("span", Sz, [u(ae(e.link.projectName), 1)])), [[
					a,
					e.link.composePath,
					void 0,
					{ top: !0 }
				]])])]), l("span", Cz, [e.link.linkedStack !== void 0 && !f.value ? (m(), c(i, { key: 0 }, [
					d(h(xe), {
						variant: "success",
						size: "xs",
						dot: "",
						label: e.link.linkedStack
					}, null, 8, ["label"]),
					d(h(ue), {
						label: "Change",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[0] ||= (e) => f.value = !0
					}, null, 8, ["disabled"]),
					d(h(ue), {
						label: "Unlink",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[1] ||= (t) => r("link", e.link.repo, "")
					}, null, 8, ["disabled"])
				], 64)) : f.value ? (m(), c(i, { key: 2 }, [d(h(ve), {
					modelValue: p.value,
					"onUpdate:modelValue": [n[5] ||= (e) => p.value = e, re],
					options: ee.value,
					disabled: e.busy,
					placeholder: "Choose a stack",
					"aria-label": "Komodo stack",
					class: "text-xs"
				}, null, 8, [
					"modelValue",
					"options",
					"disabled"
				]), d(h(ue), {
					label: "Cancel",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy,
					onClick: n[6] ||= (e) => f.value = !1
				}, null, 8, ["disabled"])], 64)) : (m(), c(i, { key: 1 }, [te.value === void 0 ? (m(), c(i, { key: 1 }, [n[8] ||= l("span", { class: "text-2xs text-subtle" }, "no stack matches this name", -1), d(h(ue), {
					label: "Choose a stack",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy || e.stacks.length === 0,
					onClick: n[4] ||= (e) => f.value = !0
				}, null, 8, ["disabled"])], 64)) : (m(), c(i, { key: 0 }, [
					l("span", wz, [n[7] ||= u(" looks like ", -1), l("span", Tz, ae(te.value), 1)]),
					d(h(ue), {
						label: "Link",
						size: "small",
						disabled: e.busy,
						onClick: n[2] ||= (t) => r("link", e.link.repo, te.value)
					}, null, 8, ["disabled"]),
					d(h(ue), {
						label: "Pick another",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[3] ||= (e) => f.value = !0
					}, null, 8, ["disabled"])
				], 64))], 64))])]), e.error ? (m(), o(h(me), {
					key: 0,
					of: h(Ce)(e.error),
					class: "mt-2"
				}, null, 8, ["of"])) : s("", !0)]);
			};
		}
	});
})), Oz, kz = g((() => {
	Dz(), Dz(), Oz = Ez;
})), Az, jz, Mz, Nz, Pz, Fz = g((() => {
	Az = {
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
	}, jz = {
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
	}, Mz = {
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
	}, Nz = (e) => e >= 90 ? "bg-danger" : e >= 75 ? "bg-warning" : "bg-success", Pz = (e) => e.split("/").at(-1) ?? e;
})), Iz, Lz, Rz, zz, Bz, Vz, Hz, Uz, Wz, Gz, Kz, qz, Jz, Yz, Xz, Zz, Qz, $z = g((() => {
	Pe(), Fz(), Iz = { class: "flex flex-wrap items-center gap-x-2 gap-y-1 font-normal" }, Lz = { class: "truncate text-sm font-medium text-content" }, Rz = {
		key: 0,
		class: "shrink-0 rounded border border-line px-2.5 py-1 text-2xs font-medium text-subtle"
	}, zz = { class: "flex flex-wrap items-center gap-x-2 gap-y-0.5 text-2xs text-subtle" }, Bz = { class: "truncate" }, Vz = {
		key: 0,
		class: "truncate font-mono"
	}, Hz = { class: "flex shrink-0 items-center gap-1" }, Uz = ["href"], Wz = {
		key: 1,
		class: "@container mb-3"
	}, Gz = { class: "grid gap-x-6 gap-y-1 @lg:grid-cols-2" }, Kz = { class: "shrink-0 font-medium text-content" }, qz = { class: "truncate font-mono text-subtle" }, Jz = { class: "mb-3 flex flex-wrap items-center gap-2" }, Yz = {
		key: 2,
		class: "flex flex-col gap-1.5",
		role: "status",
		"aria-busy": "true",
		"aria-label": "Reading logs"
	}, Xz = { class: "flex flex-col gap-1.5 rounded-md border border-line bg-canvas px-3 py-2.5" }, Zz = {
		key: 4,
		class: "text-2xs text-subtle"
	}, Qz = /*@__PURE__*/ f({
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
			let n = e, r = t, f = Ee(() => Ne().models, "deployment-fix"), ee = () => {
				r("fix", n.resource, f.overridden.value ? f.model.value : void 0), f.clear();
			}, te = a(() => Az[n.resource.state]), oe = ne(!1), he = () => {
				oe.value = !oe.value, oe.value && n.logs === void 0 && r("logs", n.resource);
			}, ge = a(() => {
				if (n.resource.state !== "deploying") return n.resource.updateAvailable ? {
					action: "pull",
					label: "Update"
				} : {
					action: "deploy",
					label: "Redeploy"
				};
			}), _e = a(() => n.resource.state === "running" || n.resource.state === "unhealthy" ? {
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
			], ye = a(() => {
				let e = n.logs;
				return e === void 0 ? "" : [e.stdout, e.stderr].filter((e) => e.trim() !== "").join("\n");
			});
			return (t, n) => {
				let a = ie("tooltip");
				return m(), o(h(fe), {
					class: p(["border-l-4", te.value.rowBorder]),
					density: "comfortable",
					body: "drawer",
					open: oe.value,
					"onUpdate:open": he
				}, {
					lead: se(({ iconClass: e }) => [d(h(pe), {
						name: te.value.icon,
						spin: te.value.spin,
						class: p(["shrink-0", [e, te.value.text]])
					}, null, 8, [
						"name",
						"spin",
						"class"
					])]),
					title: se(() => [l("span", Iz, [
						l("span", Lz, ae(e.resource.name), 1),
						e.resource.kind === "stack" ? (m(), c("span", Rz, " stack ")) : s("", !0),
						e.resource.updateAvailable ? (m(), o(h(xe), {
							key: 1,
							variant: "info",
							size: "xs",
							label: "new image",
							class: "shrink-0"
						})) : s("", !0)
					])]),
					description: se(() => [l("span", zz, [l("span", Bz, ae(e.resource.status ?? te.value.label), 1), e.resource.image ? ce((m(), c("span", Vz, [u(ae(h(Pz)(e.resource.image)), 1)])), [[
						a,
						e.resource.image,
						void 0,
						{ top: !0 }
					]]) : s("", !0)])]),
					control: se(() => [l("div", Hz, [
						ge.value ? (m(), o(h(ue), {
							key: 0,
							label: ge.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							loading: e.busy,
							disabled: e.busy,
							onClick: n[0] ||= (t) => r("act", e.resource, ge.value.action)
						}, null, 8, [
							"label",
							"loading",
							"disabled"
						])) : s("", !0),
						_e.value ? (m(), o(h(ue), {
							key: 1,
							label: _e.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							disabled: e.busy,
							onClick: n[1] ||= (t) => r("act", e.resource, _e.value.action)
						}, null, 8, ["label", "disabled"])) : s("", !0),
						ce((m(), c("a", {
							href: e.resource.url,
							target: "_blank",
							rel: "noopener",
							class: p(h(Te).iconButton())
						}, [d(h(pe), {
							name: "arrow-up-right",
							class: "text-xs"
						})], 10, Uz)), [[
							a,
							"Open in Komodo",
							void 0,
							{ top: !0 }
						]])
					])]),
					below: se(() => [
						e.error ? (m(), o(h(me), {
							key: 0,
							of: h(Ce)(e.error),
							class: "mb-3"
						}, null, 8, ["of"])) : s("", !0),
						e.resource.services.length > 0 ? (m(), c("div", Wz, [l("div", { class: p(h(Te).sectionLabel("mb-1.5 text-2xs")) }, "Services", 2), l("div", Gz, [(m(!0), c(i, null, re(e.resource.services, (e) => (m(), c("div", {
							key: e.name,
							class: "flex min-w-0 items-baseline gap-2 text-2xs"
						}, [
							l("span", Kz, ae(e.name), 1),
							ce((m(), c("span", qz, [u(ae(h(Pz)(e.image)), 1)])), [[
								a,
								e.image,
								void 0,
								{ top: !0 }
							]]),
							e.updateAvailable ? ce((m(), o(h(pe), {
								key: 0,
								name: "arrow-circle-up",
								class: "shrink-0 text-info"
							}, null, 512)), [[
								a,
								"A newer image exists",
								void 0,
								{ top: !0 }
							]]) : s("", !0)
						]))), 128))])])) : s("", !0),
						l("div", Jz, [
							d(h(le), {
								label: "Ask the agent to fix",
								icon: "sparkles",
								picker: h(f),
								loading: e.busy,
								disabled: e.busy,
								onRun: ee
							}, null, 8, [
								"picker",
								"loading",
								"disabled"
							]),
							e.resource.state === "stopped" ? s("", !0) : (m(), o(h(ue), {
								key: 0,
								label: "Stop",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.busy,
								onClick: n[2] ||= (t) => r("act", e.resource, "stop")
							}, null, 8, ["disabled"])),
							d(h(ue), {
								label: "Refresh logs",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.logsPending,
								onClick: n[3] ||= (t) => r("logs", e.resource)
							}, null, 8, ["disabled"])
						]),
						e.logsPending && ye.value === "" ? (m(), c("div", Yz, [n[4] ||= l("span", { class: "skeleton h-2.5 w-24" }, null, -1), l("div", Xz, [(m(), c(i, null, re(ve, (e, t) => l("span", {
							key: t,
							class: p(["skeleton h-2.5", e])
						}, null, 2)), 64))])])) : ye.value === "" ? (m(), c("div", Zz, "No log output.")) : (m(), o(h(de), {
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
})), eB, tB = g((() => {
	$z(), $z(), eB = Qz;
})), nB, rB, iB, aB, oB, sB, cB = g((() => {
	Fz(), nB = { class: "flex flex-wrap items-center gap-x-3 gap-y-1.5" }, rB = { class: "text-2xs text-subtle" }, iB = { class: "h-1.5 w-12 overflow-hidden rounded-full bg-line" }, aB = { class: "text-2xs text-subtle" }, oB = ["href"], sB = /*@__PURE__*/ f({
		__name: "ServerMeta",
		props: { server: {} },
		setup(e) {
			let t = a(() => jz[e.server.state]), n = a(() => [
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
			return (r, a) => (m(), c("div", nB, [
				d(h(xe), {
					variant: t.value.variant,
					label: t.value.label,
					size: "xs",
					dot: ""
				}, null, 8, ["variant", "label"]),
				(m(!0), c(i, null, re(n.value, (e) => (m(), c("span", {
					key: e.label,
					class: "flex items-center gap-1.5"
				}, [
					l("span", rB, ae(e.label), 1),
					l("span", iB, [l("span", {
						class: p(["block h-full rounded-full", h(Nz)(e.value)]),
						style: ee({ width: `${e.value}%` })
					}, null, 6)]),
					l("span", aB, ae(e.value) + "%", 1)
				]))), 128)),
				l("a", {
					href: e.server.url,
					target: "_blank",
					rel: "noopener",
					class: "flex items-center gap-1 text-2xs text-subtle hover:text-link"
				}, [a[0] ||= u(" Komodo ", -1), d(h(pe), { name: "arrow-up-right" })], 8, oB)
			]));
		}
	});
})), lB, uB = g((() => {
	cB(), cB(), lB = sB;
})), dB, fB, pB, mB, hB, gB = g((() => {
	Pe(), Fz(), dB = { class: "flex flex-col gap-1" }, fB = { class: "flex items-start gap-2" }, pB = { class: "min-w-0 flex-1 text-sm text-content" }, mB = { class: "whitespace-nowrap text-2xs text-subtle" }, hB = /*@__PURE__*/ f({
		__name: "IncidentRow",
		props: {
			incident: {},
			resource: {},
			failure: {}
		},
		emits: ["fix"],
		setup(e, { emit: t }) {
			let n = t, r = Ee(() => Ne().models, "deployment-fix"), i = () => {
				e.resource !== void 0 && (n("fix", e.resource, r.overridden.value ? r.model.value : void 0), r.clear());
			};
			return (t, n) => (m(), c("div", dB, [l("div", fB, [
				l("span", { class: p(["mt-1.5 h-2 w-2 shrink-0 rounded-full", h(Mz)[e.incident.tone].dot]) }, null, 2),
				l("span", pB, [u(ae(e.incident.summary) + " ", 1), l("span", mB, ae(h(we)(e.incident.alert.ts)), 1)]),
				e.resource ? (m(), o(h(le), {
					key: 0,
					label: "Ask the agent",
					icon: "sparkles",
					class: "-my-1 shrink-0",
					severity: "secondary",
					text: "",
					picker: h(r),
					onRun: i
				}, null, 8, ["picker"])) : s("", !0)
			]), e.failure ? (m(), o(h(me), {
				key: 0,
				of: h(Ce)(e.failure)
			}, null, 8, ["of"])) : s("", !0)]));
		}
	});
})), _B, vB = g((() => {
	gB(), gB(), _B = hB;
}));
//#endregion
//#region src/useDeploymentBoard.ts
function yB(e) {
	let t = Ne(), n = ke(), r = a(() => t.sandbox.key("komodo-overview", e.value)), i = a(() => t.sandbox.reachable()), o = Oe({
		queryKey: r,
		queryFn: async () => NR.parse(await t.sandbox.json(`${CR}/komodo/${e.value}/overview`)),
		enabled: i,
		refetchInterval: bB
	}), s = () => n.invalidateQueries({ queryKey: r.value }), c = De({
		mutationFn: (n) => t.sandbox.json(`${CR}/komodo/${e.value}/action`, xB({
			kind: n.resource.kind,
			id: n.resource.id,
			action: n.action
		})),
		onSuccess: s
	}), l = De({
		mutationFn: (n) => t.sandbox.json(`${CR}/komodo/${e.value}/link`, xB(n)),
		onSuccess: s
	}), u = De({ mutationFn: async (n) => IR.parse(await t.sandbox.json(`${CR}/komodo/${e.value}/logs`, xB({
		kind: n.kind,
		id: n.id
	}))) }), d = De({ mutationFn: async ({ resource: n, pick: r }) => LR.parse(await t.sandbox.json(`${CR}/komodo/${e.value}/fix`, xB({
		kind: n.kind,
		id: n.id,
		...r === void 0 ? {} : { pick: kd(r) }
	}))) });
	return {
		board: a(() => o.data.value),
		error: a(() => o.error.value?.message),
		isPending: o.isPending,
		act: c,
		link: l,
		logs: u,
		fix: d,
		refetch: o.refetch
	};
}
var bB, xB, SB = g((() => {
	Fk(), zR(), Pe(), bB = 1e4, xB = (e) => ({
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(e)
	});
})), CB, wB, TB, EB, DB, OB, kB, AB, jB, MB = g((() => {
	EO(), Pe(), lz(), gz(), ez(), kz(), tB(), uB(), Fz(), vB(), SB(), CB = {
		key: 0,
		class: "mt-2 font-mono text-2xs"
	}, wB = { class: "flex items-center gap-2" }, TB = { class: "mt-2 flex flex-col gap-2" }, EB = { class: "flex flex-col gap-6" }, DB = { class: "font-medium text-content" }, OB = { class: "mt-1" }, kB = { class: "text-sm font-medium text-content" }, AB = "Not on a server", jB = /*@__PURE__*/ f({
		__name: "DeploymentsView",
		props: { capability: {} },
		setup(e) {
			let t = e, n = a(() => t.capability ?? "komodo"), { board: r, error: u, isPending: f, act: ee, link: ie, logs: ce, fix: le, refetch: de } = yB(oe(n));
			te(() => void cz(n.value));
			let fe = a(() => QR(YR(r.value?.alerts ?? []))), ve = a(() => fe.value[0]?.tone), xe = a(() => r.value?.resources ?? []), we = a(() => r.value?.servers ?? []), Ee = Ne(), De = a(() => r.value?.repos ?? []), Oe = a(() => De.value.filter((e) => Ee.workspace.inProject(e.repo))), ke = a(() => De.value.length - Oe.value.length), Ae = a(() => xe.value.filter((e) => e.kind === "stack").map((e) => e.name)), g = a(() => r.value === void 0 ? void 0 : `${r.value.komodoUrl}/stacks`), je = a(() => {
				if (xe.value.length > 0 || r.value === void 0 || !r.value.reachable) return;
				let e = r.value.viewer;
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
			}), Me = a(() => {
				let e = {
					running: 0,
					stopped: 0,
					unhealthy: 0,
					updates: 0
				};
				for (let t of xe.value) t.state === "running" ? e.running++ : t.state === "unhealthy" ? e.unhealthy++ : t.state === "stopped" && e.stopped++, t.updateAvailable && e.updates++;
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
			}), Pe = a(() => {
				let e = /* @__PURE__ */ new Map();
				for (let t of xe.value) {
					let n = t.server ?? AB;
					e.set(n, [...e.get(n) ?? [], t]);
				}
				let t = new Set(we.value.map((e) => e.name));
				return [...we.value.map((t) => ({
					label: t.name,
					server: t,
					resources: e.get(t.name) ?? []
				})), ...[...e.entries()].filter(([e]) => !t.has(e)).map(([e, t]) => ({
					label: e,
					server: void 0,
					resources: t
				}))];
			}), Fe = a(() => Pe.value.filter((e) => e.resources.length > 0)), Ie = a(() => Pe.value.flatMap((e) => e.resources.length === 0 && e.server !== void 0 ? [e.server] : [])), Le = ne(void 0), Re = ne(/* @__PURE__ */ new Map()), ze = ne(void 0), Be = ne(/* @__PURE__ */ new Map()), Ve = (e) => {
				let t = new Map(Be.value);
				t.delete(e), Be.value = t;
			}, He = (e, t) => {
				Be.value = new Map(Be.value).set(e, TO(t));
			}, _ = async (e, t) => {
				Le.value = e.id, Ve(e.id);
				try {
					await ee.mutateAsync({
						resource: e,
						action: t
					});
				} catch (t) {
					He(e.id, t);
				} finally {
					Le.value = void 0;
				}
			}, Ue = async (e) => {
				ze.value = e.id, Ve(e.id);
				try {
					Re.value = new Map(Re.value).set(e.id, await ce.mutateAsync(e));
				} catch (t) {
					He(e.id, t);
				} finally {
					ze.value = void 0;
				}
			}, We = async (e, t, n) => {
				Le.value = e.id, Ve(t);
				try {
					let { conversationId: t } = await le.mutateAsync({
						resource: e,
						pick: n
					});
					window.location.assign(`/agents?focus=${encodeURIComponent(t)}`);
				} catch (e) {
					He(t, e);
				} finally {
					Le.value = void 0;
				}
			}, Ge = (e) => e === void 0 ? void 0 : xe.value.find((t) => t.name === e), Ke = ne(void 0), qe = async (e, t) => {
				Ke.value = e, Ve(e);
				try {
					await ie.mutateAsync({
						repo: e,
						stack: t
					});
				} catch (t) {
					He(e, t);
				} finally {
					Ke.value = void 0;
				}
			};
			return (e, t) => (m(), o(h(he), { width: "wide" }, {
				default: se(() => [
					d(h(_e), { title: "Deployments" }, {
						info: se(() => [!h(f) && h(r)?.reachable && xe.value.length > 0 ? (m(), o(h(Se), {
							key: 0,
							items: Me.value,
							class: "ml-2"
						}, null, 8, ["items"])) : s("", !0)]),
						actions: se(() => [d(h(ye), {
							project: h(Ee).workspace.project(),
							hidden: ke.value,
							noun: "repositories",
							onClear: t[0] ||= (e) => h(Ee).workspace.setProject(void 0)
						}, null, 8, ["project", "hidden"]), g.value === void 0 ? s("", !0) : (m(), o(h(ge), {
							key: 0,
							icon: "box",
							label: "Open Komodo stacks",
							href: g.value
						}, null, 8, ["href"]))]),
						_: 1
					}),
					h(u) && h(r) !== void 0 ? (m(), o(h(me), {
						key: 0,
						of: h(Ce)(h(u)),
						class: "mb-4"
					}, null, 8, ["of"])) : s("", !0),
					h(f) ? (m(), o(hz, { key: 1 })) : h(r) === void 0 ? (m(), o(h(me), {
						key: 2,
						of: {
							tone: "danger",
							title: "Couldn't load this Komodo connection",
							detail: h(u) ?? "The sandbox did not answer.",
							action: {
								label: "Try again",
								run: () => void h(de)()
							}
						}
					}, null, 8, ["of"])) : h(r).reachable ? (m(), c(i, { key: 4 }, [ve.value ? (m(), c("div", {
						key: 0,
						class: p(["mb-6 rounded-lg border px-4 py-3", h(Mz)[ve.value].panel])
					}, [l("div", wB, [d(h(pe), {
						name: "exclamation-circle",
						class: p(["text-sm", h(Mz)[ve.value].text])
					}, null, 8, ["class"]), t[2] ||= l("span", { class: "text-sm font-semibold text-content" }, "Needs you", -1)]), l("div", TB, [(m(!0), c(i, null, re(fe.value, (e) => (m(), o(_B, {
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
					]))), 128))])], 2)) : s("", !0), l("div", EB, [je.value ? (m(), c("div", {
						key: 0,
						class: p(h(Te).emptyState("text-left"))
					}, [l("div", DB, ae(je.value.title), 1), l("div", OB, ae(je.value.detail), 1)], 2)) : (m(), c(i, { key: 1 }, [(m(!0), c(i, null, re(Fe.value, (e) => (m(), o(h(be), {
						key: e.label,
						label: e.label
					}, {
						info: se(() => [e.server ? (m(), o(lB, {
							key: 0,
							server: e.server
						}, null, 8, ["server"])) : s("", !0)]),
						default: se(() => [(m(!0), c(i, null, re(e.resources, (e) => (m(), o(eB, {
							key: e.id,
							resource: e,
							busy: Le.value === e.id,
							logs: Re.value.get(e.id),
							"logs-pending": ze.value === e.id,
							error: Be.value.get(e.id),
							onAct: _,
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
					}, 1032, ["label"]))), 128)), Ie.value.length > 0 ? (m(), o(h(be), {
						key: 0,
						label: "Other hosts",
						caption: "Connected to this Komodo with nothing deployed on them."
					}, {
						default: se(() => [(m(!0), c(i, null, re(Ie.value, (e) => (m(), c("div", {
							key: e.id,
							class: "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3"
						}, [l("span", kB, ae(e.name), 1), d(lB, {
							server: e,
							class: "ml-auto"
						}, null, 8, ["server"])]))), 128))]),
						_: 1
					})) : s("", !0)], 64)), Oe.value.length > 0 ? (m(), o(h(be), {
						key: 2,
						label: "Your repos",
						caption: "Which Komodo stack each repo in this workspace deploys to."
					}, {
						default: se(() => [(m(!0), c(i, null, re(Oe.value, (e) => (m(), o(Oz, {
							key: e.repo,
							link: e,
							stacks: Ae.value,
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
					})) : s("", !0)])], 64)) : (m(), o(h(me), {
						key: 3,
						class: "px-4 py-3",
						of: {
							tone: "warning",
							title: `Can't reach Komodo at ${h(r).komodoUrl}`,
							detail: "Nothing below is current, this is not a report that your deployments are down, only that we couldn't ask."
						}
					}, {
						default: se(() => [h(r).unreachableReason ? (m(), c("div", CB, ae(h(r).unreachableReason), 1)) : s("", !0), d(h(ue), {
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
})), NB = /* @__PURE__ */ je({ default: () => PB }), PB, FB = g((() => {
	MB(), MB(), PB = jB;
}));
Pe(), lz();
var IB = (e, t) => {
	Me(e), t.subscriptions.push(rz()), t.subscriptions.push(e.views.register({
		id: "deployments",
		label: "Deployments",
		surface: "rail",
		detect: (e, t) => {
			let n = t.filter((e) => e.kind === "cli" && e.config.provider === "komodo").map((e) => e.id);
			return az(n), n.map((e) => ({
				key: e,
				title: n.length === 1 ? "Deployments" : `Deployments · ${e}`,
				icon: "box",
				props: { capability: e }
			}));
		},
		badge: (e) => sz(e.key),
		view: async () => (await Promise.resolve().then(() => (FB(), NB))).default
	}));
}, LB = r.parse({
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
});
//#endregion
export { IB as activate, LB as manifest };
