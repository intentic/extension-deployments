import { hostSlot as e, sandboxPoll as t, sandboxValue as n } from "@intentic/extension-api";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, normalizeClass as f, normalizeStyle as p, onMounted as ee, openBlock as m, ref as te, renderList as ne, resolveDirective as re, toDisplayString as h, toRef as ie, unref as g, withCtx as _, withDirectives as ae } from "vue";
import { AgentRunButton as oe, Button as se, Code as ce, DisclosureRow as le, Icon as ue, Notice as de, Page as fe, PageAction as pe, PageHeader as me, Picker as he, ProjectChip as ge, RowGroup as _e, StatusBadge as ve, StatusTally as ye, noticeOf as be, timeAgo as xe, ui as Se, useAgentRunPick as Ce } from "@intentic/extension-ui";
import { useMutation as we, useQuery as Te, useQueryClient as Ee } from "@tanstack/vue-query";
//#region \0rolldown/runtime.js
var De = Object.defineProperty, v = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, Oe = (e, t) => {
	let n = {};
	for (var r in e) De(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || De(n, Symbol.toStringTag, { value: "Module" }), n;
}, ke, Ae, je = v((() => {
	({bindHost: ke, host: Ae} = e("ext-deployments"));
}));
//#endregion
//#region node_modules/.pnpm/@orpc+shared@1.15.4/node_modules/@orpc/shared/dist/index.mjs
function Me(e) {
	return e[0] ?? {};
}
function Ne(e) {
	let t = Promise.resolve();
	return (...n) => t = t.catch(() => {}).then(() => e(...n));
}
function Pe(e) {
	return !e || typeof e != "object" ? !1 : "next" in e && typeof e.next == "function" && Symbol.asyncIterator in e && typeof e[Symbol.asyncIterator] == "function";
}
function Fe(e) {
	return Ie(e) ? Object.getPrototypeOf(e)?.constructor : null;
}
function Ie(e) {
	return !!e && (typeof e == "object" || typeof e == "function");
}
var Le, Re, ze, Be, Ve = v((() => {
	Le = "@orpc/shared", Re = "1.15.4", `${Le}${Re}`, ze = Symbol.asyncDispose ?? Symbol.for("asyncDispose"), Be = class {
		#e = !1;
		#t = !1;
		#n;
		#r;
		constructor(e, t) {
			this.#n = t, this.#r = Ne(async () => {
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
		async [ze]() {
			this.#e = !0, this.#t || (this.#t = !0, await this.#n("dispose"));
		}
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.15.4/node_modules/@orpc/client/dist/shared/client.DS9vjH_1.mjs
function He(e, t) {
	return t ?? qe[e]?.status ?? 500;
}
function Ue(e, t) {
	return t || qe[e]?.message || e;
}
function We(e) {
	return e < 200 || e >= 400;
}
var Ge, Ke, qe, Je, Ye, Xe = v((() => {
	Ve(), Ge = "@orpc/client", Ke = "1.15.4", qe = {
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
	}, Ye = class e extends Error {
		defined;
		code;
		status;
		data;
		static {
			let t = Symbol.for(`__${Ge}@${Ke}/error/ORPC_ERROR_CONSTRUCTORS__`);
			globalThis[t] ??= /* @__PURE__ */ new WeakSet(), Je = globalThis[t], Je.add(e);
		}
		constructor(e, ...t) {
			let n = Me(t);
			if (n.status !== void 0 && !We(n.status)) throw Error("[ORPCError] Invalid error status code.");
			let r = Ue(e, n.message);
			super(r, n), this.code = e, this.status = He(e, n.status), this.defined = n.defined ?? !1, this.data = n.data;
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
			if (Je.has(this)) {
				let t = Fe(e);
				if (t && Je.has(t)) return !0;
			}
			return super[Symbol.hasInstance](e);
		}
	};
}));
function Ze(e) {
	return it.test(e);
}
function Qe(e) {
	if (Ze(e)) throw new rt("Event's id must not contain a carriage return or newline character");
}
function $e(e) {
	if (!Number.isInteger(e) || e < 0) throw new rt("Event's retry must be a integer and >= 0");
}
function et(e) {
	if (Ze(e)) throw new rt("Event's comment must not contain a carriage return or newline character");
}
function tt(e, t) {
	if (t.id === void 0 && t.retry === void 0 && !t.comments?.length) return e;
	if (t.id !== void 0 && Qe(t.id), t.retry !== void 0 && $e(t.retry), t.comments !== void 0) for (let e of t.comments) et(e);
	return new Proxy(e, { get(e, n, r) {
		return n === at ? t : Reflect.get(e, n, r);
	} });
}
function nt(e) {
	return Ie(e) ? Reflect.get(e, at) : void 0;
}
var rt, it, at, ot = v((() => {
	Ve(), rt = class extends TypeError {}, TransformStream, it = /\r\n|[\n\r]/, at = Symbol("ORPC_EVENT_SOURCE_META");
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.15.4/node_modules/@orpc/client/dist/shared/client.BLtwTQUg.mjs
function st(e, t) {
	let n = async (e) => {
		let n = await t.error(e);
		if (n !== e) {
			let t = nt(e);
			t && Ie(n) && (n = tt(n, t));
		}
		return n;
	};
	return new Be(async () => {
		let { done: r, value: i } = await (async () => {
			try {
				return await e.next();
			} catch (e) {
				throw await n(e);
			}
		})(), a = await t.value(i, r);
		if (a !== i) {
			let e = nt(i);
			e && Ie(a) && (a = tt(a, e));
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
var ct = v((() => {
	Ve(), ot();
})), lt = v((() => {
	Ve(), Xe(), ct(), ot();
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.15.4/node_modules/@orpc/contract/dist/shared/contract.D_dZrO__.mjs
function ut(e, t) {
	return {
		...e,
		...t
	};
}
function dt(e) {
	return e instanceof pt || (typeof e == "object" || typeof e == "function") && e !== null && "~orpc" in e && typeof e["~orpc"] == "object" && e["~orpc"] !== null && "errorMap" in e["~orpc"] && "route" in e["~orpc"] && "meta" in e["~orpc"];
}
var ft, pt, mt = v((() => {
	lt(), ft = class extends Error {
		issues;
		data;
		constructor(e) {
			super(e.message, e), this.issues = e.issues, this.data = e.data;
		}
	}, pt = class {
		"~orpc";
		constructor(e) {
			if (e.route?.successStatus && We(e.route.successStatus)) throw Error("[ContractProcedure] Invalid successStatus.");
			if (Object.values(e.errorMap).some((e) => e && e.status && !We(e.status))) throw Error("[ContractProcedure] Invalid error status code.");
			this["~orpc"] = e;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.15.4/node_modules/@orpc/contract/dist/index.mjs
function ht(e, t) {
	return {
		...e,
		...t
	};
}
function gt(e, t) {
	return {
		...e,
		...t
	};
}
function _t(e, t) {
	return e.path ? {
		...e,
		path: `${t}${e.path}`
	} : e;
}
function vt(e, t) {
	return {
		...e,
		tags: [...t, ...e.tags ?? []]
	};
}
function yt(e, t) {
	return e ? `${e}${t}` : t;
}
function bt(e, t) {
	return e ? [...e, ...t] : t;
}
function xt(e, t) {
	let n = e;
	return t.prefix && (n = _t(n, t.prefix)), t.tags?.length && (n = vt(n, t.tags)), n;
}
function St(e, t) {
	if (dt(e)) return new pt({
		...e["~orpc"],
		errorMap: ut(t.errorMap, e["~orpc"].errorMap),
		route: xt(e["~orpc"].route, t)
	});
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) n[r] = St(e[r], t);
	return n;
}
function Ct(e, t) {
	return { "~standard": {
		[Tt]: {
			yields: e,
			returns: t
		},
		vendor: "orpc",
		version: 1,
		validate(n) {
			return Pe(n) ? { value: st(n, {
				async value(n, r) {
					let i = r ? t : e;
					if (!i) return n;
					let a = await i["~standard"].validate(n);
					if (a.issues) throw new Ye("EVENT_ITERATOR_VALIDATION_FAILED", {
						message: "Event iterator validation failed",
						cause: new ft({
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
var wt, y, Tt, Et = v((() => {
	mt(), Ve(), lt(), wt = class e extends pt {
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
				errorMap: ut(this["~orpc"].errorMap, t)
			});
		}
		meta(t) {
			return new e({
				...this["~orpc"],
				meta: ht(this["~orpc"].meta, t)
			});
		}
		route(t) {
			return new e({
				...this["~orpc"],
				route: gt(this["~orpc"].route, t)
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
				prefix: yt(this["~orpc"].prefix, t)
			});
		}
		tag(...t) {
			return new e({
				...this["~orpc"],
				tags: bt(this["~orpc"].tags, t)
			});
		}
		router(e) {
			return St(e, this["~orpc"]);
		}
	}, y = new wt({
		errorMap: {},
		route: {},
		meta: {}
	}), Tt = Symbol("ORPC_EVENT_ITERATOR_DETAILS");
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function Dt(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Ot(e, t = "|") {
	return e.map((e) => Xt(e)).join(t);
}
function kt(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function At(e) {
	return new En(e);
}
function jt(e) {
	return e == null;
}
function Mt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Nt(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function Pt(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Dn) return r === void 0 && (r = Dn, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function Ft(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function It(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Lt(e) {
	return It(e._zod.def) ?? e._zod.def.shape;
}
function Rt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Ft(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function zt(e, t, n) {
	t in e ? Ft(e, t, n) : e[t] = n;
}
function Bt(e, t, n, r) {
	let i = Lt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Rt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : zt(e, a, r ? r(n.value, a) : n.value));
	}
}
function Vt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Rt(e, n, () => t[n]) : zt(e, n, r.value));
	}
}
function Ht(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function Ut(e) {
	return JSON.stringify(e);
}
function Wt(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function Gt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Kt(e) {
	if (Gt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Gt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function qt(e) {
	return Kt(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function Jt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Yt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function b(e) {
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
function Xt(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function Zt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Qt(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	let i = {};
	return Bt(i, e, $t(e, t)), Yt(e, Ht(n, {
		shape: i,
		checks: []
	}));
}
function $t(e, t) {
	let n = Lt(e), r = [];
	for (let e of Reflect.ownKeys(t)) {
		if (!Object.getOwnPropertyDescriptor(n, e)?.enumerable) throw Error(`Unrecognized key: "${String(e)}"`);
		t[e] && r.push(e);
	}
	return r;
}
function en(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	let i = new Set($t(e, t)), a = {};
	return Bt(a, e, Reflect.ownKeys(Lt(e)).filter((e) => !i.has(e))), Yt(e, Ht(n, {
		shape: a,
		checks: []
	}));
}
function tn(e, t) {
	if (!Kt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Lt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Yt(e, Ht(e._zod.def, { shape: nn(e, t) }));
}
function nn(e, t) {
	let n = {};
	return Bt(n, e, Reflect.ownKeys(Lt(e))), Vt(n, t), n;
}
function rn(e, t) {
	if (!Kt(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return Yt(e, Ht(e._zod.def, { shape: nn(e, t) }));
}
function an(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let n = {};
	return Bt(n, e, Reflect.ownKeys(Lt(e))), Bt(n, t, Reflect.ownKeys(Lt(t))), Yt(e, Ht(e._zod.def, {
		shape: n,
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function on(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	let a = n ? new Set($t(t, n)) : void 0, o = {};
	return Bt(o, t, Reflect.ownKeys(Lt(t)), e && ((t, n) => a && !a.has(n) ? t : new e({
		type: "optional",
		innerType: t
	}))), Yt(t, Ht(t._zod.def, {
		shape: o,
		checks: []
	}));
}
function sn(e, t, n) {
	let r = n ? new Set($t(t, n)) : void 0, i = {};
	return Bt(i, t, Reflect.ownKeys(Lt(t)), (t, n) => r && !r.has(n) ? t : new e({
		type: "nonoptional",
		innerType: t
	})), Yt(t, Ht(t._zod.def, { shape: i }));
}
function cn(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function ln(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function un(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function dn(e) {
	return typeof e == "string" ? e : e?.message;
}
function fn(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function pn(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : dn(e.inst?._zod.def?.error?.(e)) ?? dn(a?.(e)) ?? dn(t?.error?.(e)) ?? dn(n.customError?.(e)) ?? dn(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
function mn(e) {
	let t = e.length;
	if (!Nn.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function hn(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function gn(e) {
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
function _n(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function vn(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Sn(e, n, r.value);
	}
}
function yn(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function bn(e, t, n) {
	return yn(e, t, n, !1);
}
function xn(e, t) {
	for (let n in e) {
		let r = e[n];
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !0,
			get() {
				return yn(this, n, r(this));
			},
			set(e) {
				yn(this, n, e);
			}
		});
	}
	return t;
}
function Sn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : yn(this, t, n.bind(this));
		},
		set(e) {
			yn(this, t, e);
		}
	});
}
function Cn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function x(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Pn !== e._zod) {
		Pn = void 0;
		return;
	}
	Pn = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, In);
			let e = Fn;
			Fn = !1;
			try {
				let r = n(this);
				return Fn ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Fn ||= e, r;
			} catch (n) {
				throw delete this[t], Fn ||= e, n;
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
function wn(e, t, n, r) {
	let i = Cn(e, t);
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
function Tn(e) {
	let t = () => e;
	return t[Ln] = !0, t;
}
var En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn = v((() => {
	qn(), En = class {
		constructor(e) {
			this._getter = e, this._value = void 0;
		}
		get value() {
			let e = this._getter;
			return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
		}
	}, Dn = /* @__PURE__*/ Symbol("evaluating"), On = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, kn = /* @__PURE__*/ At(() => {
		if (Kn.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), An = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), jn = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Mn = {
		int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
		uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
	}, Nn = /[\uD800-\uDBFF]/, Fn = !1, In = {
		configurable: !0,
		get() {
			Fn = !0;
		}
	}, Ln = "~constantCatch";
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
function zn(e) {
	let t = Un;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Un = null, new e();
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
function S(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Hn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Hn);
			} finally {
				Hn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), vn(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? zn(u) : this;
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
function Bn(e) {
	return e && Object.assign(Kn, e), Kn;
}
var Vn, Hn, Un, Wn, Gn, Kn, qn = v((() => {
	Rn(), Hn = {
		value: void 0,
		enumerable: !1
	}, Un = "captureStackTrace" in Error ? Error : null, Wn = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, Gn = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (Vn = globalThis).__zod_globalConfig ?? (Vn.__zod_globalConfig = {}), Kn = globalThis.__zod_globalConfig;
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function Jn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, kt, 2), e.message;
}
function Yn(e) {
	this._zod.message = e;
}
function Xn(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function Zn(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? Xn(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Qn(e, t = (e) => e.message) {
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
var $n, er, tr, nr, rr, ir = v((() => {
	qn(), Rn(), $n = {
		get: Jn,
		set: Yn,
		enumerable: !0,
		configurable: !0
	}, er = {
		value: void 0,
		enumerable: !1
	}, tr = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), nr = (e, t) => {
		e.name = "$ZodError", er.value = t, Object.defineProperty(e, "issues", er), er.value = void 0, Object.defineProperty(e, "message", $n);
		let n = Object.getPrototypeOf(e);
		tr.has(n) || (tr.add(n), Object.defineProperty(n, "toString", {
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
	}, rr = S("$ZodError", nr), S("$ZodError", nr, void 0, { Parent: Error });
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function ar(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
function or(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => pn(e, n, Bn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
function sr(e, t, n) {
	let r = n ? {
		...n,
		async: !1,
		abortEarly: !0
	} : {
		async: !1,
		abortEarly: !0
	}, i = e._zod.bag.fallbackRun, a;
	if (i ? (r[pr] = !0, a = i({
		value: t,
		issues: []
	}, r)) : a = e._zod.run({
		value: t,
		issues: []
	}, r), a instanceof Promise) throw new Wn();
	return a.issues.length === 0;
}
var cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr = v((() => {
	qn(), Rn(), cr = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new Wn();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => pn(e, o, Bn())));
				throw On(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, lr = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => pn(e, o, Bn())));
				throw On(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, ur = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new Wn();
		return a.issues.length ? or(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, dr = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? or(e, a.issues, i) : {
			success: !0,
			data: a.value
		};
	}, fr = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), pr = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), mr = ((e, t, n) => {
		let r = e._zod.bag.validator;
		if (r !== void 0) {
			if (r(t) !== fr) return !0;
			if (r.definite === !0 && n === void 0) return !1;
		}
		return sr(e, t, n);
	}), hr = async (e, t, n) => {
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
	}, gr = (e) => {
		let t = cr(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, ar(n, a));
		};
		return n;
	}, _r = (e) => {
		let t = cr(e), n = (e, r, i, a) => t(e, r, i, ar(n, a));
		return n;
	}, vr = (e) => {
		let t = lr(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, ar(n, a));
		};
		return n;
	}, yr = (e) => {
		let t = lr(e), n = async (e, r, i, a) => await t(e, r, i, ar(n, a));
		return n;
	}, br = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return ur(e)(t, n, i);
	}, xr = (e) => (t, n, r) => ur(e)(t, n, r), Sr = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return dr(e)(t, n, i);
	}, Cr = (e) => async (t, n, r) => dr(e)(t, n, r);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
function Tr(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function Er() {
	return new RegExp(Vr, "u");
}
function Dr(e) {
	return RegExp(`^${e}$`);
}
function Or(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function kr(e) {
	return RegExp(`^${Or(e)}$`);
}
function Ar(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Or({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Or({ precision: e.precision })}` : n;
	return RegExp(`^${Xr}T(?:${r})$`);
}
var jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr, Zr, Qr, $r, ei, ti, ni, ri, ii = v((() => {
	jr = /^[cC][0-9a-z]{6,}$/, Mr = /^[0-9a-z]+$/, Nr = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Pr = /^[0-9a-vA-V]{20}$/, Fr = /^[A-Za-z0-9]{27}$/, Ir = /^[a-zA-Z0-9_-]{21}$/, Lr = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Rr = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, zr = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Br = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Vr = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", Hr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ur = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Wr = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Gr = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Kr = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, qr = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, Jr = /^https?$/, Yr = /^\+[1-9]\d{6,14}$/, Xr = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Zr = /*@__PURE__*/ Dr(Xr), Qr = /^[\s\S]{0,}$/, $r = /^-?\d+$/, ei = /^-?\d+(?:\.\d+)?$/, ti = /^(?:true|false)$/i, ni = /^[^A-Z]*$/, ri = /^[^a-z]*$/;
})), C, ai, oi, si, ci, li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si = v((() => {
	qn(), ii(), Rn(), C = /*@__PURE__*/ S("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), ai = (e) => {
		let t = e.value;
		return !jt(t) && t.length !== void 0;
	}, oi = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, si = /*@__PURE__*/ S("$ZodCheckLessThan", (e, t) => {
		C.init(e, t);
		let n = oi[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: oi[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), ci = /*@__PURE__*/ S("$ZodCheckGreaterThan", (e, t) => {
		C.init(e, t);
		let n = oi[typeof t.value];
		e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: oi[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), li = /*@__PURE__*/ S("$ZodCheckMultipleOf", (e, t) => {
		C.init(e, t), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : Nt(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ui = /*@__PURE__*/ S("$ZodCheckNumberFormat", (e, t) => {
		C.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = jn[t.format];
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
	}), di = /*@__PURE__*/ S("$ZodCheckMaxLength", (e, t) => {
		var n;
		C.init(e, t), (n = e._zod.def).when ?? (n.when = ai), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? mn(r) : i) <= t.maximum) return;
			let a = hn(r);
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
	}), fi = /*@__PURE__*/ S("$ZodCheckMinLength", (e, t) => {
		var n;
		C.init(e, t), (n = e._zod.def).when ?? (n.when = ai), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? mn(r) : i) >= t.minimum) return;
			let a = hn(r);
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
	}), pi = /*@__PURE__*/ S("$ZodCheckLengthEquals", (e, t) => {
		var n;
		C.init(e, t), (n = e._zod.def).when ?? (n.when = ai), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? mn(r) : i;
			if (a === t.length) return;
			let o = hn(r), s = a > t.length;
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
	}), mi = /*@__PURE__*/ S("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		C.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
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
	}), hi = /*@__PURE__*/ S("$ZodCheckRegex", (e, t) => {
		mi.init(e, t), e._zod.check = (n) => {
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
	}), gi = /*@__PURE__*/ S("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= ni, mi.init(e, t);
	}), _i = /*@__PURE__*/ S("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= ri, mi.init(e, t);
	}), vi = /*@__PURE__*/ S("$ZodCheckIncludes", (e, t) => {
		C.init(e, t);
		let n = Jt(t.includes);
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
	}), yi = /*@__PURE__*/ S("$ZodCheckStartsWith", (e, t) => {
		C.init(e, t);
		let n = RegExp(`^${Jt(t.prefix)}.*`);
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
	}), bi = /*@__PURE__*/ S("$ZodCheckEndsWith", (e, t) => {
		C.init(e, t);
		let n = RegExp(`.*${Jt(t.suffix)}$`);
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
	}), xi = /*@__PURE__*/ S("$ZodCheckOverwrite", (e, t) => {
		C.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), Ci, wi = v((() => {
	Ci = class {
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
})), Ti, Ei = v((() => {
	Ti = {
		major: 4,
		minor: 6,
		patch: 5
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
async function Di(e, t) {
	let n = { async: !0 };
	return oa(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Oi(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return oa(r, n);
			} catch {}
			return Di(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
function ki(e) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(e) : (new URL(e), !0);
	} catch {
		return !1;
	}
}
function Ai(e, t) {
	return !("normalize" in t) && !("hostname" in t) && !("protocol" in t) ? ki(e) || 2 : ji(e, t);
}
function ji(e, t) {
	if (!t.normalize && t.protocol?.source === Jr.source && !/^https?:\/\//i.test(e)) return 1;
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
function Mi(e) {
	return e.replace(da, "");
}
function Ni(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Pi(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function Fi(e) {
	return Ta.test(e) ? ki(`http://[${e}]`) : !1;
}
function Ii(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Fi(n);
}
function Li(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function Ri(e) {
	if (!ja.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Li(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function zi(e, t = null) {
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
function Bi(e, t, n) {
	e.issues.length && t.issues.push(...un(n, e.issues)), t.value[n] = e.value;
}
function Vi(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...un(n, e.issues));
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
function Hi(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Va, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Zt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Ui(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (cn(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Vi(e, n, i, t, d, f))) : Vi(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function Wi(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !cn(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => pn(e, r, Bn())))
	}), t);
}
function Gi(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
function Ki(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (Kt(e) && Kt(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Ki(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Ki(i, a);
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
function qi(e, t, n) {
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
	let c = Ki(t.value, n.value);
	if (!c.valid) {
		if (cn(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function Ji(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function Yi(e, t, n) {
	e.issues.length && t.issues.push(...un(n, e.issues)), t.value[n] = e.value;
}
function Xi(e, t, n, r, i) {
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
			t.issues.push(...un(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
function Zi(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function Qi(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function $i(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function ea(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => pn(e, r, Bn())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function ta(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function na(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => ra(e, r, t.out, n)) : ra(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => ra(e, r, t.in, n)) : ra(e, r, t.in, n);
	}
}
function ra(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
function ia(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function aa(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(_n(e));
	}
}
var w, oa, sa, T, ca, la, ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra, za, Ba, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo = v((() => {
	Si(), qn(), wi(), ii(), Rn(), Ei(), w = /*@__PURE__*/ S("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ti;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = cn(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (ln(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new Wn();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (fn(t.issues, n, e), i ||= cn(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						fn(t.issues, n, e), i ||= cn(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (cn(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Wn();
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
					if (a.async === !1) throw new Wn();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return bn(this, "~standard", Oi(this));
		},
		set "~standard"(e) {
			yn(this, "~standard", e);
		}
	}), oa = (e, t) => e.issues.length ? { issues: e.issues.map((e) => pn(e, t, Bn())) } : { value: e.value }, sa = /*@__PURE__*/ S("$ZodString", (e, t) => {
		w.init(e, t), e._zod.pattern = t.pattern ?? Qr, e._zod.parse = (n, r) => {
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
	}), T = /*@__PURE__*/ S("$ZodStringFormat", (e, t) => {
		mi.init(e, t), sa.init(e, t);
	}), ca = /*@__PURE__*/ S("$ZodGUID", (e, t) => {
		t.pattern ??= Rr, T.init(e, t);
	}), la = /*@__PURE__*/ S("$ZodUUID", (e, t) => {
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
			t.pattern ??= zr(e);
		} else t.pattern ??= zr();
		T.init(e, t);
	}), ua = /*@__PURE__*/ S("$ZodEmail", (e, t) => {
		t.pattern ??= Br, T.init(e, t);
	}), da = /[\t\n\r]/g, fa = /*@__PURE__*/ S("$ZodURL", (e, t) => {
		T.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = Ai(r, t);
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
					n.value = Mi(r);
					return;
				}
				t.hostname && !Ni(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !Pi(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : Mi(r);
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
	}), pa = /*@__PURE__*/ S("$ZodEmoji", (e, t) => {
		t.pattern ??= Er(), T.init(e, t);
	}), ma = /*@__PURE__*/ S("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? Ir : Tr(t.length), T.init(e, t);
	}), ha = /*@__PURE__*/ S("$ZodCUID", (e, t) => {
		t.pattern ??= jr, T.init(e, t);
	}), ga = /*@__PURE__*/ S("$ZodCUID2", (e, t) => {
		t.pattern ??= Mr, T.init(e, t);
	}), _a = /*@__PURE__*/ S("$ZodULID", (e, t) => {
		t.pattern ??= Nr, T.init(e, t);
	}), va = /*@__PURE__*/ S("$ZodXID", (e, t) => {
		t.pattern ??= Pr, T.init(e, t);
	}), ya = /*@__PURE__*/ S("$ZodKSUID", (e, t) => {
		t.pattern ??= Fr, T.init(e, t);
	}), ba = /*@__PURE__*/ S("$ZodISODateTime", (e, t) => {
		t.pattern ??= Ar(t), T.init(e, t);
	}), xa = /*@__PURE__*/ S("$ZodISODate", (e, t) => {
		t.pattern ??= Zr, T.init(e, t);
	}), Sa = /*@__PURE__*/ S("$ZodISOTime", (e, t) => {
		t.pattern ??= kr(t), T.init(e, t);
	}), Ca = /*@__PURE__*/ S("$ZodISODuration", (e, t) => {
		t.pattern ??= Lr, T.init(e, t);
	}), wa = /*@__PURE__*/ S("$ZodIPv4", (e, t) => {
		t.pattern ??= Hr, T.init(e, t);
	}), Ta = /^[0-9a-fA-F:.]+$/, Ea = /*@__PURE__*/ S("$ZodIPv6", (e, t) => {
		t.pattern ??= Ur, T.init(e, t), e._zod.check = (n) => {
			Fi(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Da = /*@__PURE__*/ S("$ZodCIDRv4", (e, t) => {
		t.pattern ??= Wr, T.init(e, t);
	}), Oa = /*@__PURE__*/ S("$ZodCIDRv6", (e, t) => {
		t.pattern ??= Gr, T.init(e, t), e._zod.check = (n) => {
			Ii(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ka = /^[0-9a-zA-Z+/]*={0,2}$/, Aa = /*@__PURE__*/ S("$ZodBase64", (e, t) => {
		t.pattern ??= ka, T.init(e, t), e._zod.check = (n) => {
			Li(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ja = /^[A-Za-z0-9_-]*$/, Ma = /*@__PURE__*/ S("$ZodBase64URL", (e, t) => {
		t.pattern ??= ja, T.init(e, t), e._zod.check = (n) => {
			Ri(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Na = /*@__PURE__*/ S("$ZodE164", (e, t) => {
		t.pattern ??= Yr, T.init(e, t);
	}), Pa = /*@__PURE__*/ S("$ZodJWT", (e, t) => {
		T.init(e, t), e._zod.check = (n) => {
			zi(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Fa = /*@__PURE__*/ S("$ZodNumber", (e, t) => {
		w.init(e, t), e._zod.pattern = ei, e._zod.parse = (n, r) => {
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
	}), Ia = /*@__PURE__*/ S("$ZodNumberFormat", (e, t) => {
		ui.init(e, t), Fa.init(e, t);
	}), La = /*@__PURE__*/ S("$ZodBoolean", (e, t) => {
		w.init(e, t), e._zod.pattern = ti, e._zod.parse = (n, r) => {
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
	}), Ra = /*@__PURE__*/ S("$ZodUnknown", (e, t) => {
		w.init(e, t), e._zod.parse = (e) => e;
	}), za = /*@__PURE__*/ S("$ZodNever", (e, t) => {
		w.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), Ba = /*@__PURE__*/ S("$ZodArray", (e, t) => {
		w.init(e, t);
		let n = Kn.memoizer;
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
				if (c instanceof Promise) o.push(c.then((t) => Bi(t, r, e)));
				else if (Bi(c, r, e), s && c.issues.length !== 0 && cn(c)) break;
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Va = [], Ha = /*@__PURE__*/ S("$ZodObject", (e, t) => {
		w.init(e, t);
		let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
		if (r) {
			let e = () => {
				let n = { ...r };
				return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
			};
			e.raw = r, Object.defineProperty(t, "shape", { get: e });
		}
		let i = At(() => Hi(t));
		x(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || Ft(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let a = Gt, o = t.catchall, s, c = Kn.memoizer;
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
					if (cn(t, f)) break;
					f = t.issues.length;
				}
				if (e === "__proto__") continue;
				let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
					value: r[e],
					issues: []
				}, n);
				s instanceof Promise ? l.push(s.then((n) => Vi(n, t, e, r, a, o))) : Vi(s, t, e, r, a, o);
			}
			return o ? Ui(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), Ua = /*@__PURE__*/ S("$ZodObjectJIT", (e, t) => {
		Ha.init(e, t);
		let n = e._zod.parse, r = At(() => Hi(t)), i = Kn.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new Ci(["payload", "ctx"], {
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
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : Ut(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
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
		}, o, s = Gt, c = !Kn.jitless, l = c && kn.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Ui([], p, i, f, d, e, f?.abortEarly === !0) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), Wa = /*@__PURE__*/ S("$ZodUnion", (e, t) => {
		w.init(e, t), x(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), x(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), x(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), x(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => Mt(e.source)).join("|")})$`);
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
			return a ? Promise.all(o).then((t) => Wi(t, r, e, i)) : Wi(o, r, e, i);
		};
	}), Ga = /*@__PURE__*/ S("$ZodDiscriminatedUnion", (e, t) => {
		t.inclusive = !1, Wa.init(e, t);
		let n = e._zod.parse;
		x(e, "propValues", (e) => {
			let t = {}, n = 0;
			for (let r of e.def.options) {
				let i = r._zod.propValues;
				if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
				i[e.def.discriminator]?.has(void 0) && n++;
				for (let [e, n] of Object.entries(i)) {
					Object.prototype.hasOwnProperty.call(t, e) || Ft(t, e, /* @__PURE__ */ new Set());
					for (let r of n) t[e].add(r);
				}
			}
			return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
		}), t.options.forEach((e, n) => {
			let r = It(e._zod.def);
			if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
		});
		let r = At(() => Gi(t));
		e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Gt(o)) return i.issues.push({
				code: "invalid_type",
				expected: "object",
				input: o,
				inst: e
			}), i;
			let s = o?.[t.discriminator], c = r.value.get(s);
			return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
				code: "invalid_union",
				errors: [],
				note: "No matching discriminator",
				discriminator: t.discriminator,
				options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
				input: o,
				path: [t.discriminator],
				inst: e
			}), i);
		};
	}), Ka = /*@__PURE__*/ S("$ZodIntersection", (e, t) => {
		w.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => qi(e, t, n)) : qi(e, i, a);
		};
	}), qa = /*@__PURE__*/ S("$ZodTuple", (e, t) => {
		w.init(e, t);
		let n = t.items, r = Kn.memoizer;
		r?.attach(e), e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Array.isArray(o)) return i.issues.push({
				input: o,
				inst: e,
				expected: "tuple",
				code: "invalid_type"
			}), i;
			i.value = r ? r.alloc(e, i, [], a) : [];
			let s = [], c = Ji(n, "optin"), l = Ji(n, "optout");
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
			let u = Array(n.length), d = t.rest ? a?.abortEarly : void 0, f = !1;
			for (let e = 0; e < n.length; e++) {
				let t = n[e]._zod.run({
					value: o[e],
					issues: []
				}, a);
				t instanceof Promise ? s.push(t.then((t) => {
					u[e] = t;
				})) : (u[e] = t, d && !f && t.issues.length && (f = cn(t)));
			}
			if (t.rest && !f) {
				let e = n.length - 1, r = o.slice(n.length), c = i.issues.length;
				for (let n of r) {
					if (d && i.issues.length !== c) {
						if (cn(i, c)) break;
						c = i.issues.length;
					}
					e++;
					let r = t.rest._zod.run({
						value: n,
						issues: []
					}, a);
					r instanceof Promise ? s.push(r.then((t) => Yi(t, i, e))) : Yi(r, i, e);
				}
			}
			return s.length ? Promise.all(s).then(() => Xi(u, i, n, o, l)) : Xi(u, i, n, o, l);
		};
	}), Ja = /*@__PURE__*/ S("$ZodRecord", (e, t) => {
		w.init(e, t);
		let n = Kn.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!Kt(a)) return r.issues.push({
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
							issues: s.issues.map((e) => pn(e, i, Bn())),
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
						e.issues.length && r.issues.push(...un(n, e.issues)), r.value[l] = e.value;
					})) : (u.issues.length && r.issues.push(...un(n, u.issues)), r.value[l] = u.value);
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
					if (typeof n == "string" && ei.test(n) && l.issues.length) {
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
							issues: l.issues.map((e) => pn(e, i, Bn())),
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
						e.issues.length && r.issues.push(...un(n, e.issues)), r.value[u] = e.value;
					})) : (d.issues.length && r.issues.push(...un(n, d.issues)), r.value[u] = d.value);
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
	}), Ya = /*@__PURE__*/ S("$ZodEnum", (e, t) => {
		w.init(e, t);
		let n = Dt(t.entries), r = new Set(n);
		e._zod.values = r, x(e, "pattern", (e) => {
			let t = Dt(e.def.entries).filter((e) => An.has(typeof e));
			return RegExp(t.length ? `^(${t.map((e) => Jt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
		}), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), Xa = /*@__PURE__*/ S("$ZodLiteral", (e, t) => {
		w.init(e, t);
		let n = new Set(t.values);
		e._zod.values = n, x(e, "pattern", (e) => {
			let t = e.def.values;
			return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Jt(e) : e ? Jt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
		}), e._zod.parse = (r, i) => {
			let a = r.value;
			return n.has(a) || r.issues.push({
				code: "invalid_value",
				values: t.values,
				input: a,
				inst: e
			}), r;
		};
	}), Za = /*@__PURE__*/ S("$ZodTransform", (e, t) => {
		w.init(e, t), e._zod.optin = "optional", Kn.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new Gn(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new Wn();
			return n.value = i, n;
		};
	}), Qa = /*@__PURE__*/ S("$ZodOptional", (e, t) => {
		w.init(e, t), x(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", x(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), x(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Mt(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => Zi(e, t)) : Zi(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), $a = /*@__PURE__*/ S("$ZodExactOptional", (e, t) => {
		Qa.init(e, t), x(e, "values", (e) => e.def.innerType._zod.values), x(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), eo = /*@__PURE__*/ S("$ZodNullable", (e, t) => {
		w.init(e, t), x(e, "optin", (e) => e.def.innerType._zod.optin), x(e, "optout", (e) => e.def.innerType._zod.optout), x(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${Mt(t.source)}|null)$`) : void 0;
		}), x(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), to = /*@__PURE__*/ S("$ZodDefault", (e, t) => {
		w.init(e, t), e._zod.optin = "defaulted", x(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Qi(e, t)) : Qi(r, t);
		};
	}), no = /*@__PURE__*/ S("$ZodPrefault", (e, t) => {
		w.init(e, t), e._zod.optin = "defaulted", x(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), ro = /*@__PURE__*/ S("$ZodNonOptional", (e, t) => {
		w.init(e, t), x(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => $i(t, e)) : $i(i, e);
		};
	}), io = /*@__PURE__*/ S("$ZodCatch", (e, t) => {
		w.init(e, t), x(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), x(e, "optout", (e) => e.def.innerType._zod.optout), x(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => ea(e, r, t, n)) : ea(e, r, t, n);
		};
	}), ao = /*@__PURE__*/ S("$ZodPipe", (e, t) => {
		w.init(e, t), x(e, "values", (e) => e.def.in._zod.values), x(e, "optin", (e) => e.def.in._zod.optin), x(e, "optout", (e) => e.def.out._zod.optout), x(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => ta(e, t.in, n)) : ta(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => ta(e, t.out, n)) : ta(r, t.out, n);
		};
	}), oo = /*@__PURE__*/ S("$ZodCodec", (e, t) => {
		w.init(e, t), x(e, "values", (e) => e.def.in._zod.values), x(e, "optin", (e) => e.def.in._zod.optin), x(e, "optout", (e) => e.def.out._zod.optout), x(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if ((n.direction || "forward") === "forward") {
				let r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => na(e, t, n)) : na(r, t, n);
			}
			{
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => na(e, t, n)) : na(r, t, n);
			}
		};
	}), so = /*@__PURE__*/ S("$ZodReadonly", (e, t) => {
		w.init(e, t), x(e, "propValues", (e) => e.def.innerType._zod.propValues), x(e, "values", (e) => e.def.innerType._zod.values), x(e, "optin", (e) => e.def.innerType?._zod?.optin), x(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(ia) : ia(r);
		};
	}), co = /*@__PURE__*/ S("$ZodLazy", (e, t) => {
		w.init(e, t), Pt(e._zod, "innerType", () => {
			let e = t;
			return e._cachedInner ||= t.getter(), e._cachedInner;
		}), x(e, "pattern", (e) => e.innerType?._zod?.pattern), x(e, "propValues", (e) => e.innerType?._zod?.propValues), x(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), x(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
	}), lo = /*@__PURE__*/ S("$ZodCustom", (e, t) => {
		C.init(e, t), w.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => aa(t, n, r, e));
			aa(i, n, r, e);
		};
	});
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
function fo(e) {
	return typeof e == "object" && !!e;
}
function po(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function mo(e, t, n) {
	let r = So.get(e);
	if (r !== void 0) return r ? To : Co;
	if (t.has(e)) return To;
	t.add(e);
	let i = Co, a = (e) => {
		if (i !== To && e?._zod) {
			let r = mo(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = Co;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? wo : o.value?._zod ? mo(o.value, t, n) : Co;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = It(c);
			s(e ? o(e, !0) : wo), a(c.catchall);
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
			s(r ? mo(r, t, !1) : wo);
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
	return t.delete(e), ho(e, i);
}
function ho(e, t) {
	return t !== wo && So.set(e, t === To), t;
}
function go(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
function _o() {
	return Oo;
}
function vo(e, t) {
	let n = e[bo]?.backEdges;
	return n !== void 0 && fo(t) && n.has(t);
}
var yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko = v((() => {
	Rn(), yo = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, bo = "~memo", xo = [], So = /*@__PURE__*/ new WeakMap(), Co = 0, wo = 1, To = 2, Do = [], Oo = {
		alloc(e, t, n) {
			let r = Eo;
			if (!r) return n;
			Eo = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), Do.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && vo(n, e.value)) throw new yo();
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
						let i = mo(e, /* @__PURE__ */ new Set(), !1);
						if (i === Co) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
						i === To || r ? n = !0 : r = !0;
					}
					let l = s.value;
					if (!fo(l)) return t(s, c);
					let u = c[bo];
					u || (u = {
						buckets: /* @__PURE__ */ new WeakMap(),
						backEdges: void 0
					}, c[bo] = u);
					let d;
					i === c ? d = a : (d = go(u, e), i = c, a = d);
					let f = d.get(l);
					if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...po(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
					Eo = d;
					let p = Do.length, ee = t(s, c);
					Eo = void 0;
					let m = Do.length > p ? Do.pop() : void 0;
					return ee instanceof Promise ? ee.then((e) => (m && (m.issues = e.issues.length ? po(e.issues) : xo), e)) : (m && (m.issues = ee.issues.length ? po(ee.issues) : xo), ee);
				};
				e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
			});
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
function Ao() {
	return { localeError: jo() };
}
var jo, Mo = v((() => {
	Rn(), jo = () => {
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
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(gn(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${Xt(e.values[0])}` : `Invalid option: expected one of ${Ot(e.values, "|")}`;
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
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Ot(e.keys, ", ")}`;
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
function No() {
	return new Fo();
}
var Po, Fo, Io, Lo = v((() => {
	Fo = class {
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
	}, (Po = globalThis).__zod_globalRegistry ?? (Po.__zod_globalRegistry = No()), Io = globalThis.__zod_globalRegistry;
})), Ro = v((() => {}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function zo(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Bo(e, t) {
	return new e(zo({
		type: "string",
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Vo(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ho(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Uo(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wo(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Go(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ko(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qo(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Jo(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Yo(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xo(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zo(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qo(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $o(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function es(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ts(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ns(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rs(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function is(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function as(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function os(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cs(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ls(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function us(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ds(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ps(e, t) {
	return new e(zo({
		type: "number",
		checks: [],
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ms(e, t) {
	return new e(zo({
		type: "number",
		coerce: !0,
		checks: [],
		...b(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function hs(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gs(e, t) {
	return new e({
		type: "boolean",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _s(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function vs(e, t) {
	return new e({
		type: "never",
		...b(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ys(e, t) {
	return new si({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function bs(e, t) {
	return new si({
		check: "less_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function xs(e, t) {
	return new ci({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Ss(e, t) {
	return new ci({
		check: "greater_than",
		...b(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Cs(e, t) {
	return new li({
		check: "multiple_of",
		...b(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function ws(e, t) {
	return new di({
		check: "max_length",
		...b(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ts(e, t) {
	return new fi({
		check: "min_length",
		...b(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Es(e, t) {
	return new pi({
		check: "length_equals",
		...b(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ds(e, t) {
	return new hi({
		check: "string_format",
		format: "regex",
		...b(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Os(e) {
	return new gi({
		check: "string_format",
		format: "lowercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function ks(e) {
	return new _i({
		check: "string_format",
		format: "uppercase",
		...b(e)
	});
}
// @__NO_SIDE_EFFECTS__
function As(e, t) {
	return new vi({
		check: "string_format",
		format: "includes",
		...b(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function js(e, t) {
	return new yi({
		check: "string_format",
		format: "starts_with",
		...b(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ms(e, t) {
	return new bi({
		check: "string_format",
		format: "ends_with",
		...b(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ns(e) {
	return new xi({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ps(e) {
	return /* @__PURE__ */ Ns((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Fs() {
	return /* @__PURE__ */ Ns((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Is() {
	return /* @__PURE__ */ Ns((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Ls() {
	return /* @__PURE__ */ Ns((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Rs() {
	return /* @__PURE__ */ Ns((e) => Wt(e));
}
// @__NO_SIDE_EFFECTS__
function zs(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Bs(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...b(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t) {
	let n = /* @__PURE__ */ Hs((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(_n(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(_n(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Hs(e, t) {
	let n = new C({
		check: "custom",
		...b(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Us(e, t) {
	let n = b(t), r = n.truthy ?? [
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
	let a = new Set(r), o = new Set(i), s = e.Codec ?? oo, c = e.Boolean ?? La, l = new s({
		type: "pipe",
		in: new (e.String ?? sa)({
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
var Ws = v((() => {
	Si(), uo(), Rn();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function Gs(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && Ft(e, t, n[t]);
	return e;
}
function Ks(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Io,
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
function qs(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function E(e, t, n = {
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
		a && (o.ref ||= a, E(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Gs(o.schema, c), t.io === "input" && tc(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Js(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Ys(e, t) {
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
				ref: `${i("__shared")}#/${r}/${Js(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Js(a)
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
function Xs(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Xs(e);
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
function Zs(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Qs(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!nc.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Zs(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			Ft(n, r, e.length === 1 ? e[0] : Qs(e) ?? { allOf: e });
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
			let t = Zs(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function $s(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of nc) if (t in e) return;
	let n = t.filter((e) => rc.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Qs(t);
	else {
		let e = n[0], i = rc.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Qs([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Gs(e, r));
}
function ec(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Gs(i, s), Gs(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
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
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Xs(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) $s(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Gs(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, Ft(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: ac(t, "input", e.processors),
					output: ac(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function tc(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return tc(r.element, n);
	if (r.type === "set") return tc(r.valueType, n);
	if (r.type === "lazy") return tc(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return tc(r.innerType, n);
	if (r.type === "intersection") return tc(r.left, n) || tc(r.right, n);
	if (r.type === "record" || r.type === "map") return tc(r.keyType, n) || tc(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : tc(r.in, n) || tc(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (tc(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (tc(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (tc(e, n)) return !0;
		return !!(r.rest && tc(r.rest, n));
	}
	return !1;
}
var nc, rc, ic, ac, oc = v((() => {
	Lo(), Rn(), nc = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), rc = ["oneOf", "anyOf"], ic = (e, t = {}) => (n) => {
		let r = Ks({
			...n,
			processors: t
		});
		return E(e, r), Ys(r, e), ec(r, e);
	}, ac = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = Ks({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return E(e, o), Ys(o, e), ec(o, e);
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
function sc(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) Sc[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && fc(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && fc(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && pc(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && pc(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && hc(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && _c(t, i.mime);
	for (let e of i.patterns ?? []) gc(t, e);
	return t;
}
function cc(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? cc(t.out) : t.type === "catch" ? cc(t.innerType) : e._zod.optin;
}
function lc(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = lc(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => lc(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? ei : $r).source), p) : p;
}
function uc(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Bc.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = lc(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
function dc(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (qs(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Wc) : JSON.parse(o);
}
var fc, pc, mc, hc, gc, _c, vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, Dc, Oc, kc, Ac, jc, Mc, Nc, Pc, Fc, Ic, Lc, Rc, zc, Bc, Vc, Hc, Uc, Wc, Gc, Kc, qc, Jc, Yc, Xc, Zc, Qc = v((() => {
	ii(), uo(), oc(), Rn(), fc = (e, t, n) => {
		(e[t] === void 0 || n > e[t]) && (e[t] = n);
	}, pc = (e, t, n) => {
		(e[t] === void 0 || n < e[t]) && (e[t] = n);
	}, mc = (e, t) => {
		fc(e, "minimum", t), pc(e, "maximum", t);
	}, hc = (e, t) => {
		e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
	}, gc = (e, t) => {
		e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
	}, _c = (e, t) => {
		e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
	}, vc = (e, t) => {
		e.format = t, t.includes("int") && (e.isInt = !0);
	}, yc = (e, t) => fc(e, "minimum", t.minimum), bc = (e, t) => pc(e, "maximum", t.maximum), xc = (e) => (t, n) => {
		vc(t, n.format);
		let [r, i] = e[n.format];
		fc(t, "minimum", r), pc(t, "maximum", i);
	}, Sc = {
		greater_than: (e, t) => fc(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
		less_than: (e, t) => pc(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
		multiple_of: (e, t) => hc(e, t.value),
		number_format: xc(jn),
		bigint_format: xc(Mn),
		min_length: yc,
		max_length: bc,
		length_equals: (e, t) => mc(e, t.length),
		min_size: yc,
		max_size: bc,
		size_equals: (e, t) => mc(e, t.size),
		string_format: (e, t) => {
			vc(e, t.format), t.pattern && gc(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
		},
		mime_type: (e, t) => _c(e, t.mime)
	}, Cc = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, wc = /* @__PURE__ */ new Map([[ka, Kr], [ja, qr]]), Tc = (e) => wc.get(e) ?? e, Ec = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = sc(e);
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Cc[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c].map(Tc);
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, Dc = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = sc(e);
		i.type = u ? "integer" : "number";
		let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
			let n = /* @__PURE__ */ new Set();
			for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : qs(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
			let [a, ...o] = n;
			a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
		}
	}, Oc = (e, t, n, r) => {
		n.type = "boolean";
	}, kc = (e, t, n, r) => {
		n.not = {};
	}, Ac = (e, t, n, r) => {}, jc = (e, t, n, r) => {
		let i = e._zod.def, a = Dt(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, Mc = (e, t, n, r) => {
		let i = e._zod.def;
		if (i.values.length === 0) {
			n.not = {};
			return;
		}
		let a = [];
		for (let o of i.values) if (o === void 0) {
			if (qs(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
		} else if (typeof o == "bigint") {
			if (qs(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
			a.push(Number(o));
		} else a.push(o);
		if (a.length !== 0) {
			if (a.length === 1) {
				let e = a[0];
				n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
			} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
		}
	}, Nc = (e, t, n, r) => {
		qs(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, Pc = (e, t, n, r) => {
		qs(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, Fc = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = sc(e);
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = E(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, Ic = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && qs(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) Ft(i.properties, e, E(o[e], t, {
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
			(t.io === "input" ? cc(n) === void 0 : n._zod.optout === void 0) && s.push(e);
		}
		s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = E(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, Lc = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => E(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, Rc = (e, t, n, r) => {
		let i = e._zod.def, a = E(i.left, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				0
			]
		}), o = E(i.right, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				1
			]
		}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
		n.allOf = c, t.intersections.push(c);
	}, zc = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "array";
		let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => E(e, t, {
			...r,
			path: [
				...r.path,
				o,
				n
			]
		})), l = a.rest ? E(a.rest, t, {
			...r,
			path: [
				...r.path,
				s,
				...t.target === "openapi-3.0" ? [a.items.length] : []
			]
		}) : null, u = a.items.length;
		for (; u > 0;) {
			let e = a.items[u - 1];
			if (!(t.io === "input" ? cc(e) !== void 0 : e._zod.optout === "optional")) break;
			u--;
		}
		let d = a.items.length, f = !a.rest;
		t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
		let { minimum: p, maximum: ee } = sc(e);
		typeof p == "number" && (i.minItems = p), typeof ee == "number" && (i.maxItems = ee);
	}, Bc = /* @__PURE__ */ new WeakMap(), Vc = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "object";
		let o = a.keyType, s = sc(o).patterns;
		if (a.mode === "loose" && s && s.size > 0) {
			let e = E(a.valueType, t, {
				...r,
				path: [
					...r.path,
					"patternProperties",
					"*"
				]
			});
			i.patternProperties = {};
			for (let t of s) Ft(i.patternProperties, Tc(t).source, e);
		} else {
			if (t.target === "draft-07" || t.target === "draft-2020-12") {
				i.propertyNames = E(a.keyType, t, {
					...r,
					path: [...r.path, "propertyNames"]
				});
				let n = Bc.get(t);
				n || (n = [], Bc.set(t, n), t.deferred.push(() => uc(t))), n.push(e);
			}
			i.additionalProperties = E(a.valueType, t, {
				...r,
				path: [...r.path, "additionalProperties"]
			});
		}
		let c = o._zod.values, l = t.io === "input" && cc(a.valueType) !== void 0;
		if (c && !a.partial && !l) {
			let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
			e.length > 0 && (i.required = e.map(String));
		}
	}, Hc = (e, t, n, r) => {
		let i = e._zod.def, a = E(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, Uc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Wc = Symbol(), Gc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = dc(i.defaultValue, e, t, n, r);
		o !== Wc && (n.default = o);
	}, Kc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = dc(i.defaultValue, e, t, n, r);
		o !== Wc && (n._prefault = o);
	}, qc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			qs(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, Jc = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		E(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, Yc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, Xc = (e, t, n, r) => {
		let i = e._zod.def;
		E(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Zc = (e, t, n, r) => {
		let i = e._zod.innerType;
		E(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	};
})), $c = v((() => {
	qn(), wr(), ir(), uo(), ko(), Si(), Ei(), Rn(), ii(), Mo(), Lo(), wi(), Ro(), Ws(), oc(), Qc(), oc();
})), el = v((() => {
	$c();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
function tl(e, t, n) {
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
var nl, rl, il, al = v((() => {
	$c(), Rn(), nl = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), rl = (e, t) => {
		rr.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		nl.has(n) || (nl.add(n), tl(n, "format", (e) => (t) => Qn(e, t)), tl(n, "flatten", (e) => (t) => Zn(e, t)), tl(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, kt, 2);
		}), tl(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, kt, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, il = /*@__PURE__*/ S("ZodError", rl, void 0, { Parent: Error });
})), ol, sl, cl, ll, ul, dl, fl, pl, ml, hl, gl, _l, vl = v((() => {
	$c(), al(), ol = /* @__PURE__ */ cr(il), sl = /* @__PURE__ */ lr(il), cl = /* @__PURE__ */ ur(il), ll = /* @__PURE__ */ dr(il), ul = /* @__PURE__ */ gr(il), dl = /* @__PURE__ */ _r(il), fl = /* @__PURE__ */ vr(il), pl = /* @__PURE__ */ yr(il), ml = /* @__PURE__ */ br(il), hl = /* @__PURE__ */ xr(il), gl = /* @__PURE__ */ Sr(il), _l = /* @__PURE__ */ Cr(il);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function yl() {
	Kn.localeError || Bn(Ao());
}
function bl() {
	Kn.memoizer || Bn({ memoizer: _o() });
}
function D(e) {
	return /* @__PURE__ */ Bo(Gl, e);
}
function O(e) {
	return /* @__PURE__ */ qo($l, e);
}
function xl(e) {
	return /* @__PURE__ */ rs(lu, e);
}
function Sl(e) {
	return /* @__PURE__ */ is(uu, e);
}
function k(e) {
	return /* @__PURE__ */ ps(hu, e);
}
function Cl(e) {
	return /* @__PURE__ */ hs(gu, e);
}
function A(e) {
	return /* @__PURE__ */ gs(_u, e);
}
function wl() {
	return /* @__PURE__ */ _s(vu);
}
function Tl(e) {
	return /* @__PURE__ */ vs(yu, e);
}
function j(e, t) {
	return /* @__PURE__ */ zs(bu, e, t);
}
function M(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...b(t)
	};
	return new xu(n);
}
function El(e, t) {
	return new xu({
		type: "object",
		shape: e,
		catchall: Tl(),
		...b(t)
	});
}
function Dl(e, t) {
	return new xu({
		type: "object",
		shape: e,
		catchall: wl(),
		...b(t)
	});
}
function N(e, t) {
	return new Su({
		type: "union",
		options: e,
		...b(t)
	});
}
function P(e, t, n) {
	return new Cu({
		type: "union",
		options: t,
		discriminator: e,
		...b(n)
	});
}
function Ol(e, t) {
	return new wu({
		type: "intersection",
		left: e,
		right: t
	});
}
function kl(e, t, n) {
	let r = t instanceof w;
	return new Tu({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...b(r ? n : t)
	});
}
function F(e, t, n) {
	return !t || !t._zod ? new Eu({
		type: "record",
		keyType: D(),
		valueType: e,
		...b(t)
	}) : new Eu({
		type: "record",
		keyType: e,
		valueType: t,
		...b(n)
	});
}
function Al(e, t, n) {
	return new Eu({
		type: "record",
		keyType: e,
		valueType: t,
		...b(n),
		partial: !0
	});
}
function I(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new Du({
		type: "enum",
		entries: n,
		...b(t)
	});
}
function L(e, t) {
	return new Ou({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...b(t)
	});
}
function jl(e) {
	return new ku({
		type: "transform",
		transform: e
	});
}
function Ml(e) {
	return new Au({
		type: "optional",
		innerType: e
	});
}
function Nl(e) {
	return new ju({
		type: "optional",
		innerType: e
	});
}
function Pl(e) {
	return new Mu({
		type: "nullable",
		innerType: e
	});
}
function Fl(e, t) {
	return new Nu({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : qt(t);
		}
	});
}
function Il(e, t) {
	return new Pu({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : qt(t);
		}
	});
}
function Ll(e, t) {
	return new Fu({
		type: "nonoptional",
		innerType: e,
		...b(t)
	});
}
function Rl(e, t) {
	return new Iu({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Tn(t)
	});
}
function zl(e, t) {
	return new Lu({
		type: "pipe",
		in: e,
		out: t
	});
}
function Bl(e) {
	return new zu({
		type: "readonly",
		innerType: e
	});
}
function Vl(e) {
	return new Bu({
		type: "lazy",
		getter: e
	});
}
function Hl(e, t = {}) {
	return /* @__PURE__ */ Bs(Vu, e, t);
}
function Ul(e, t) {
	return /* @__PURE__ */ Vs(e, t);
}
var R, Wl, Gl, z, Kl, ql, Jl, Yl, Xl, Zl, Ql, $l, eu, tu, nu, ru, iu, au, ou, su, cu, lu, uu, du, fu, pu, mu, hu, gu, _u, vu, yu, bu, xu, Su, Cu, wu, Tu, Eu, Du, Ou, ku, Au, ju, Mu, Nu, Pu, Fu, Iu, Lu, Ru, zu, Bu, Vu, Hu, Uu = v((() => {
	$c(), Qc(), oc(), Mo(), el(), vl(), R = /*@__PURE__*/ S("ZodType", (e, t) => (yl(), w.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(Ht(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return Yt(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(Hl(e, t));
		},
		superRefine(e, t) {
			return this.check(Ul(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ Ns(e));
		},
		optional() {
			return Ml(this);
		},
		exactOptional() {
			return Nl(this);
		},
		nullable() {
			return Pl(this);
		},
		nullish() {
			return Ml(Pl(this));
		},
		nonoptional(e) {
			return Ll(this, e);
		},
		array() {
			return j(this);
		},
		or(e) {
			return N([this, e]);
		},
		and(e) {
			return Ol(this, e);
		},
		transform(e) {
			return zl(this, jl(e));
		},
		default(e) {
			return Fl(this, e);
		},
		prefault(e) {
			return Il(this, e);
		},
		catch(e) {
			return Rl(this, e);
		},
		pipe(e) {
			return zl(this, e);
		},
		readonly() {
			return Bl(this);
		},
		describe(e) {
			let t = this.clone();
			return Io.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return Io.get(this);
			let t = this.clone();
			return Io.add(t, e[0]), t;
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
			return bn(this, "~standard", {
				...Oi(this),
				jsonSchema: {
					input: ac(this, "input"),
					output: ac(this, "output")
				}
			});
		},
		set "~standard"(e) {
			yn(this, "~standard", e);
		},
		parse: function e(t, n) {
			return ol(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await sl(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return cl(this, e, t);
		},
		async safeParseAsync(e, t) {
			return ll(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			yn(this, "spa", e);
		},
		validate(e, t) {
			return mr(this, e, t);
		},
		validateAsync(e, t) {
			return hr(this, e, t);
		},
		encode: function e(t, n) {
			return ul(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return dl(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await fl(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await pl(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return ml(this, e, t);
		},
		safeDecode(e, t) {
			return hl(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return gl(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return _l(this, e, t);
		},
		toJSONSchema(e) {
			return ic(this, {})(e);
		},
		get description() {
			return Io.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), Wl = /*@__PURE__*/ S("_ZodString", (e, t) => {
		sa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ec(e, t, n, r);
	}, /*@__PURE__*/ xn({
		format: (e) => sc(e).format ?? null,
		minLength: (e) => sc(e).minimum ?? null,
		maxLength: (e) => sc(e).maximum ?? null
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ Ds(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ As(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ js(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ Ms(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Ts(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ ws(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Es(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Ts(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Os(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ ks(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Fs());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Ps(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ Is());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Ls());
		},
		slugify() {
			return this.check(/* @__PURE__ */ Rs());
		}
	})), Gl = /*@__PURE__*/ S("ZodString", (e, t) => {
		sa.init(e, t), Wl.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ Vo(Xl, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ qo($l, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ cs(mu, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ Jo(eu, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ Ho(Zl, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ Uo(Ql, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ Wo(Ql, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ Go(Ql, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ Ko(Ql, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ Yo(tu, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ Xo(nu, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ Zo(ru, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ Qo(iu, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ as(du, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ os(fu, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ $o(au, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ es(ou, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ ts(su, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ ns(cu, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ rs(lu, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ is(uu, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ ss(pu, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ ls(Kl, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ us(ql, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ ds(Jl, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ fs(Yl, e));
		}
	}), z = /*@__PURE__*/ S("ZodStringFormat", (e, t) => {
		T.init(e, t), Wl.init(e, t);
	}), Kl = /*@__PURE__*/ S("ZodISODateTime", (e, t) => {
		ba.init(e, t), z.init(e, t);
	}), ql = /*@__PURE__*/ S("ZodISODate", (e, t) => {
		xa.init(e, t), z.init(e, t);
	}), Jl = /*@__PURE__*/ S("ZodISOTime", (e, t) => {
		Sa.init(e, t), z.init(e, t);
	}), Yl = /*@__PURE__*/ S("ZodISODuration", (e, t) => {
		Ca.init(e, t), z.init(e, t);
	}), Xl = /*@__PURE__*/ S("ZodEmail", (e, t) => {
		ua.init(e, t), z.init(e, t);
	}), Zl = /*@__PURE__*/ S("ZodGUID", (e, t) => {
		ca.init(e, t), z.init(e, t);
	}), Ql = /*@__PURE__*/ S("ZodUUID", (e, t) => {
		la.init(e, t), z.init(e, t);
	}), $l = /*@__PURE__*/ S("ZodURL", (e, t) => {
		fa.init(e, t), z.init(e, t);
	}), eu = /*@__PURE__*/ S("ZodEmoji", (e, t) => {
		pa.init(e, t), z.init(e, t);
	}), tu = /*@__PURE__*/ S("ZodNanoID", (e, t) => {
		ma.init(e, t), z.init(e, t);
	}), nu = /*@__PURE__*/ S("ZodCUID", (e, t) => {
		ha.init(e, t), z.init(e, t);
	}), ru = /*@__PURE__*/ S("ZodCUID2", (e, t) => {
		ga.init(e, t), z.init(e, t);
	}), iu = /*@__PURE__*/ S("ZodULID", (e, t) => {
		_a.init(e, t), z.init(e, t);
	}), au = /*@__PURE__*/ S("ZodXID", (e, t) => {
		va.init(e, t), z.init(e, t);
	}), ou = /*@__PURE__*/ S("ZodKSUID", (e, t) => {
		ya.init(e, t), z.init(e, t);
	}), su = /*@__PURE__*/ S("ZodIPv4", (e, t) => {
		wa.init(e, t), z.init(e, t);
	}), cu = /*@__PURE__*/ S("ZodIPv6", (e, t) => {
		Ea.init(e, t), z.init(e, t);
	}), lu = /*@__PURE__*/ S("ZodCIDRv4", (e, t) => {
		Da.init(e, t), z.init(e, t);
	}), uu = /*@__PURE__*/ S("ZodCIDRv6", (e, t) => {
		Oa.init(e, t), z.init(e, t);
	}), du = /*@__PURE__*/ S("ZodBase64", (e, t) => {
		Aa.init(e, t), z.init(e, t);
	}), fu = /*@__PURE__*/ S("ZodBase64URL", (e, t) => {
		Ma.init(e, t), z.init(e, t);
	}), pu = /*@__PURE__*/ S("ZodE164", (e, t) => {
		Na.init(e, t), z.init(e, t);
	}), mu = /*@__PURE__*/ S("ZodJWT", (e, t) => {
		Pa.init(e, t), z.init(e, t);
	}), hu = /*@__PURE__*/ S("ZodNumber", (e, t) => {
		Fa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dc(e, t, n, r), e.isFinite = !0;
	}, /*@__PURE__*/ xn({
		minValue: (e) => {
			let { minimum: t, exclusiveMinimum: n } = sc(e);
			return Math.max(t ?? -Infinity, n ?? -Infinity);
		},
		maxValue: (e) => {
			let { maximum: t, exclusiveMaximum: n } = sc(e);
			return Math.min(t ?? Infinity, n ?? Infinity);
		},
		isInt: (e) => {
			let { isInt: t, multipleOf: n } = sc(e);
			return !!t || !!n?.some(Number.isSafeInteger);
		},
		format: (e) => sc(e).format ?? null
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ xs(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Ss(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Ss(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ ys(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ bs(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ bs(e, t));
		},
		int(e) {
			return this.check(Cl(e));
		},
		safe(e) {
			return this.check(Cl(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ xs(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Ss(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ ys(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ bs(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Cs(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Cs(e, t));
		},
		finite() {
			return this;
		}
	})), gu = /*@__PURE__*/ S("ZodNumberFormat", (e, t) => {
		Ia.init(e, t), hu.init(e, t);
	}), _u = /*@__PURE__*/ S("ZodBoolean", (e, t) => {
		La.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oc(e, t, n, r);
	}), vu = /*@__PURE__*/ S("ZodUnknown", (e, t) => {
		Ra.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ac(e, t, n, r);
	}), yu = /*@__PURE__*/ S("ZodNever", (e, t) => {
		za.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => kc(e, t, n, r);
	}), bu = /*@__PURE__*/ S("ZodArray", (e, t) => {
		bl(), Ba.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fc(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ Ts(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Ts(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ ws(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Es(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), xu = /*@__PURE__*/ S("ZodObject", (e, t) => {
		bl(), Ua.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ic(e, t, n, r), wn(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return I(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone(Ht(this._zod.def, { catchall: e }));
		},
		passthrough() {
			return this.clone(Ht(this._zod.def, { catchall: wl() }));
		},
		loose() {
			return this.clone(Ht(this._zod.def, { catchall: wl() }));
		},
		strict() {
			return this.clone(Ht(this._zod.def, { catchall: Tl() }));
		},
		strip() {
			return this.clone(Ht(this._zod.def, { catchall: void 0 }));
		},
		extend(e) {
			return tn(this, e);
		},
		safeExtend(e) {
			return rn(this, e);
		},
		merge(e) {
			return an(this, e);
		},
		pick(e) {
			return Qt(this, e);
		},
		omit(e) {
			return en(this, e);
		},
		partial(...e) {
			return on(Au, this, e[0]);
		},
		exactPartial(...e) {
			return on(ju, this, e[0], "exactPartial");
		},
		required(...e) {
			return sn(Fu, this, e[0]);
		}
	}), Su = /*@__PURE__*/ S("ZodUnion", (e, t) => {
		Wa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Lc(e, t, n, r), e.options = t.options;
	}), Cu = /*@__PURE__*/ S("ZodDiscriminatedUnion", (e, t) => {
		Su.init(e, t), Ga.init(e, t);
	}), wu = /*@__PURE__*/ S("ZodIntersection", (e, t) => {
		Ka.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Rc(e, t, n, r);
	}), Tu = /*@__PURE__*/ S("ZodTuple", (e, t) => {
		bl(), qa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => zc(e, t, n, r);
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
				items: e.items.map((e) => new Au({
					type: "optional",
					innerType: e
				}))
			});
		}
	}), Eu = /*@__PURE__*/ S("ZodRecord", (e, t) => {
		bl(), Ja.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vc(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
	}), Du = /*@__PURE__*/ S("ZodEnum", (e, t) => {
		Ya.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => jc(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new Du({
				...t,
				checks: [],
				...b(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new Du({
				...t,
				checks: [],
				...b(r),
				entries: i
			});
		};
	}), Ou = /*@__PURE__*/ S("ZodLiteral", (e, t) => {
		Xa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mc(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
			if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return t.values[0];
		} });
	}), ku = /*@__PURE__*/ S("ZodTransform", (e, t) => {
		bl(), Za.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pc(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new Gn(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(_n(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(_n(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), Au = /*@__PURE__*/ S("ZodOptional", (e, t) => {
		Qa.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), ju = /*@__PURE__*/ S("ZodExactOptional", (e, t) => {
		$a.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Mu = /*@__PURE__*/ S("ZodNullable", (e, t) => {
		eo.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Nu = /*@__PURE__*/ S("ZodDefault", (e, t) => {
		to.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gc(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), Pu = /*@__PURE__*/ S("ZodPrefault", (e, t) => {
		no.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Fu = /*@__PURE__*/ S("ZodNonOptional", (e, t) => {
		ro.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Uc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Iu = /*@__PURE__*/ S("ZodCatch", (e, t) => {
		io.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => qc(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), Lu = /*@__PURE__*/ S("ZodPipe", (e, t) => {
		ao.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jc(e, t, n, r), e.in = t.in, e.out = t.out;
	}), Ru = /*@__PURE__*/ S("ZodCodec", (e, t) => {
		Lu.init(e, t), oo.init(e, t);
	}), zu = /*@__PURE__*/ S("ZodReadonly", (e, t) => {
		so.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yc(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Bu = /*@__PURE__*/ S("ZodLazy", (e, t) => {
		co.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zc(e, t, n, r), e.unwrap = () => e._zod.def.getter();
	}), Vu = /*@__PURE__*/ S("ZodCustom", (e, t) => {
		lo.init(e, t), R.init(e, t), e._zod.processJSONSchema = (t, n, r) => Nc(e, t, n, r);
	}), Hu = (...e) => /* @__PURE__ */ Us({
		Codec: Ru,
		Boolean: _u,
		String: Gl
	}, ...e);
})), Wu = v((() => {
	$c();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/iso.js
function Gu(e) {
	return /* @__PURE__ */ ls(Kl, e);
}
var Ku = v((() => {
	$c(), Uu();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/coerce.js
function B(e) {
	return /* @__PURE__ */ ms(hu, e);
}
var qu = v((() => {
	$c(), Uu();
})), Ju = v((() => {
	$c(), Uu(), el(), al(), vl(), Wu(), Qc(), Lo(), Rn(), el(), Ku(), Uu(), uo(), Mo(), qu();
})), V = v((() => {
	Ju(), Ju();
})), Yu, Xu = v((() => {
	V(), Yu = M({
		subject: D(),
		detail: D()
	});
})), Zu, Qu, $u, ed, td, nd, rd, id, ad, od, sd, cd, ld = v((() => {
	V(), Xu(), M({
		type: L("runner-hello"),
		token: D(),
		version: D(),
		image: D(),
		channel: D().optional(),
		overlayHash: D().optional(),
		definitionToml: D().optional()
	}), Zu = "/system/runners/translator", M({
		agent: D().optional(),
		account: D().optional(),
		model: D().optional()
	}), N([
		M({
			ok: L(!0),
			kind: L("oauth"),
			accessToken: D(),
			account: D().optional()
		}),
		M({
			ok: L(!0),
			kind: L("parent-translator"),
			model: D(),
			trial: A().optional()
		}),
		M({
			ok: L(!0),
			kind: L("endpoint"),
			baseUrl: D(),
			authToken: D(),
			model: D(),
			trial: A().optional()
		}),
		M({
			ok: L(!1),
			code: I([
				"subscription-required",
				"claude-reauth",
				"trial-unavailable"
			]).optional(),
			message: D()
		})
	]), M({
		account: D().min(1),
		rejected: D().min(1)
	}), M({ accessToken: D().optional() }), Qu = M({
		cpus: k().int().positive(),
		memoryMb: k().int().positive(),
		freeDiskMb: k().int().nonnegative(),
		load: k().nonnegative()
	}), $u = I([
		"current",
		"outdated",
		"unknown"
	]), M({
		id: D(),
		host: D().optional(),
		online: A(),
		version: D().optional(),
		image: D().optional(),
		channel: D().optional(),
		overlayHash: D().optional(),
		facts: Qu.optional(),
		lastSeen: k().optional(),
		parity: $u,
		drift: j(Yu).optional()
	}), ed = M({
		op: I(["pull", "push"]),
		conversationId: D().min(1),
		branch: D().min(1),
		repos: j(M({
			repo: D().min(1),
			dir: D(),
			mainBranch: D().min(1)
		}))
	}), td = N([M({
		kind: L("line"),
		text: D()
	}), M({
		kind: L("done"),
		ok: A(),
		detail: D().optional()
	})]), nd = M({
		conversationId: D().min(1),
		branch: D().min(1),
		prompt: D(),
		provider: D(),
		harness: D(),
		model: D().optional(),
		effort: D().optional(),
		thinking: A().optional(),
		fast: A().optional(),
		account: D().optional(),
		sessionId: D().optional(),
		attachments: j(M({
			path: D().min(1),
			bytesBase64: D()
		})).optional()
	}), rd = "refs/intentic-offload/", id = D().regex(/^[a-z0-9][a-z0-9-]{7,63}$/u), ad = D().regex(/^[A-Za-z_][A-Za-z0-9_]*$/u), od = M({
		runId: id,
		repo: D().min(1),
		ref: D().startsWith(rd),
		cwd: D().refine((e) => !e.startsWith("/") && !e.split("/").includes(".."), "must stay inside the repo"),
		command: D().min(1).max(64e3),
		env: F(ad, D()).default({}),
		exports: j(ad).max(8).default([]),
		label: D().min(1).max(80),
		timeoutMs: k().int().positive().max(216e5).optional()
	}), sd = N([
		M({
			kind: L("status"),
			text: D()
		}),
		M({
			kind: L("output"),
			stream: I(["stdout", "stderr"]),
			text: D()
		}),
		M({
			kind: L("exit"),
			code: k().int(),
			signal: D().optional(),
			failure: D().optional(),
			ran: A().default(!0),
			patchBase64: D().optional(),
			files: F(ad, D()).default({})
		})
	]), cd = N([M({ kind: L("local") }), M({
		kind: L("runner"),
		id: D().min(1)
	})]);
})), ud, dd, fd = v((() => {
	ld(), ud = {
		"GET /health": {
			auth: "door",
			beforeBoot: !0
		},
		"GET /": {
			auth: "door",
			beforeBoot: !0
		},
		"GET /diff/raw": { lane: "bulk" },
		"GET /speech/status": { guest: !0 },
		"POST /speech/transcribe": {
			floor: "collaborator",
			guest: !0
		},
		"GET /workspace/raw": {
			guest: !0,
			lane: "bulk"
		},
		"GET /workspace/thumb": { guest: !0 },
		"GET /workspace/media": {
			auth: "door",
			guest: !0,
			lane: "bulk"
		},
		"GET /workspace/download": {
			auth: "door",
			guest: !0,
			lane: "bulk"
		},
		"POST /workspace/upload": {
			floor: "writer",
			attachmentFloor: "collaborator",
			lane: "bulk"
		},
		"POST /workspace/upload-diff": {},
		"POST /workspace/upload-archive": { lane: "bulk" },
		"POST /system/ws-ticket": {
			beforeBoot: !0,
			floor: "collaborator",
			control: "never"
		},
		"GET /system/terminal": {
			auth: "door",
			beforeBoot: !0,
			control: "never",
			front: !0
		},
		"GET /system/vitals": {
			auth: "door",
			beforeBoot: !0,
			front: !0
		},
		"GET /system/sync/ssh": {
			sync: "pipe",
			control: "never",
			lane: "bulk"
		},
		"GET /system/browser-profile": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"GET /system/browser-view": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /enroll": {
			auth: "door",
			control: "never"
		},
		"POST /automations/{id}/fire": { auth: "door" },
		"POST /workflows/{id}/gate": { auth: "door" },
		"GET /webchat/widget.js": {
			auth: "door",
			embedded: !0
		},
		"GET /webchat/{id}/config": {
			auth: "door",
			embedded: !0
		},
		"GET /webchat/{id}/challenge": {
			auth: "door",
			embedded: !0
		},
		"POST /webchat/{id}/message": {
			auth: "door",
			embedded: !0
		},
		"GET /webchat/{id}/messages": {
			auth: "door",
			embedded: !0
		},
		"GET /webchat/{id}/installs": {},
		"GET /intake/sdk.js": {
			auth: "door",
			embedded: !0
		},
		"GET /intake/{id}/config": {
			auth: "door",
			embedded: !0
		},
		"GET /intake/{id}/challenge": {
			auth: "door",
			embedded: !0
		},
		"POST /intake/{id}/report": {
			auth: "door",
			embedded: !0
		},
		"GET /members": { control: "never" },
		"POST /members": { control: "never" },
		"DELETE /members": { control: "never" },
		"DELETE /members/self": {
			floor: "viewer",
			guest: !0,
			control: "never"
		},
		"POST /platform/relink": { control: "never" },
		"GET /environment": {},
		"GET /environment/contents": {},
		"POST /environment/approve": {},
		"POST /environment/reject": {},
		"POST /environment/runtime-install": {},
		"POST /environment/remove": {},
		"POST /environment/rebuild-when-idle": {},
		"DELETE /environment/rebuild-when-idle": {},
		"GET /engines": {},
		"POST /engines/channel": {},
		"POST /engines/update": {},
		"POST /engines/revert": {},
		"GET /bundles": { control: "never" },
		"POST /bundles": { control: "never" },
		"DELETE /bundles": { control: "never" },
		"POST /bundles/ticket": { control: "never" },
		"GET /bundles/download": {
			auth: "door",
			control: "never",
			lane: "bulk"
		},
		"GET /definition": {},
		"POST /definition/diff": {},
		"GET /definition/workspace": {},
		"POST /definition/workspace/publish": {},
		"POST /arrivals/plan": {},
		"GET /arrivals/hosts": {},
		"POST /arrivals/scan": {},
		"POST /arrivals/apply": {},
		"DELETE /arrivals": {},
		"GET /extensions/{id}/bundle": { lane: "bulk" },
		"ALL /x/*": {},
		"GET /capabilities/connectable": {
			floor: "maintainer",
			agent: !0,
			control: "never"
		},
		"GET /sandboxes": { agent: !0 },
		"POST /sandboxes": { agent: !0 },
		"GET /wallet/status": {
			agent: !0,
			control: "never"
		},
		"POST /wallet/fetch": {
			agent: !0,
			control: "never"
		},
		"GET /wallet/history": {
			agent: !0,
			control: "never"
		},
		"POST /children/spawn": {
			agent: !0,
			control: "never"
		},
		"GET /children/providers": {
			agent: !0,
			control: "never"
		},
		"POST /children/wait": {
			agent: !0,
			control: "never"
		},
		"POST /children/send": {
			agent: !0,
			control: "never"
		},
		"POST /children/answer": {
			agent: !0,
			control: "never"
		},
		"POST /children/cancel": {
			agent: !0,
			control: "never"
		},
		"POST /children/merge": {
			agent: !0,
			control: "never"
		},
		"GET /children": {
			agent: !0,
			control: "never"
		},
		"GET /fleet": { agent: !0 },
		"POST /fleet/message": { agent: !0 },
		"GET /fleet/{handle}": { agent: !0 },
		"GET /listeners/{provider}/state": {
			floor: "maintainer",
			panel: !1,
			control: "never"
		},
		"POST /listeners/{provider}/dispatch": {
			panel: !1,
			control: "never"
		},
		"POST /listeners/{provider}/failure": {
			panel: !1,
			control: "never"
		},
		"POST /listeners/{provider}/status": {
			panel: !1,
			control: "never"
		},
		"POST /ci/webhook/{host}": { auth: "door" },
		"POST /system/sync/pair": {
			floor: "collaborator",
			control: "never"
		},
		"POST /system/hosts/pair": { control: "never" },
		"POST /system/hosts/enroll": {
			auth: "door",
			control: "never"
		},
		"GET /system/hosts": { control: "never" },
		"DELETE /system/hosts/{id}": { control: "never" },
		"GET /system/hosts/connect": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /system/webext/pair": { control: "never" },
		"POST /system/webext/enroll": {
			auth: "door",
			control: "never"
		},
		"GET /system/webext": { control: "never" },
		"DELETE /system/webext/{id}": { control: "never" },
		"GET /system/webext/connect": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /system/runners/pair": { control: "never" },
		"POST /system/runners/enroll": {
			auth: "door",
			control: "never"
		},
		"GET /system/runners": { control: "never" },
		"DELETE /system/runners/{id}": { control: "never" },
		"GET /system/runners/connect": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"ALL /mcp/{mount}": {
			auth: "door",
			control: "never"
		},
		"POST /system/webext/session": {
			auth: "door",
			control: "never"
		},
		"POST /system/webext/lend": {
			auth: "door",
			control: "never"
		},
		"POST /system/runners/{id}/definition/sync": { control: "never" },
		"GET /system/runners/git/{repo}/info/refs": {
			auth: "door",
			control: "never",
			lane: "bulk"
		},
		"POST /system/runners/git/{repo}/git-upload-pack": {
			auth: "door",
			control: "never",
			lane: "bulk"
		},
		"POST /system/runners/git/{repo}/git-receive-pack": {
			auth: "door",
			control: "never",
			lane: "bulk"
		},
		"POST /system/runners/credentials": {
			auth: "door",
			control: "never"
		},
		"POST /system/runners/credentials/refresh": {
			auth: "door",
			control: "never"
		},
		[`ALL ${Zu}/*`]: {
			auth: "door",
			control: "never"
		},
		"ALL /privacy/gateway/{session}/*": {
			auth: "door",
			control: "never",
			stream: !0
		},
		"POST /system/control/tokens": { control: "never" },
		"GET /system/control/tokens": { control: "never" },
		"DELETE /system/control/tokens/{id}": { control: "never" },
		"GET /system/passkeys": {
			guest: !0,
			control: "never"
		},
		"POST /system/passkeys/register/options": {
			floor: "viewer",
			guest: !0,
			enrolment: !0,
			control: "never"
		},
		"POST /system/passkeys/register": {
			floor: "viewer",
			guest: !0,
			enrolment: !0,
			control: "never"
		},
		"POST /system/passkeys/assert/options": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /system/passkeys/assert": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /system/passkeys/policy": { control: "never" },
		"POST /system/passkeys/recovery": { control: "never" },
		"DELETE /system/passkeys/{id}": {
			floor: "viewer",
			guest: !0,
			control: "never"
		},
		"POST /system/session/recover": {
			auth: "door",
			beforeBoot: !0,
			control: "never"
		},
		"POST /system/sessions/revoke": { control: "never" },
		"POST /system/access/disable": {
			auth: "door",
			control: "never"
		},
		"POST /system/authorized-key": {
			auth: "door",
			control: "never"
		},
		"GET /system/sync": { control: "never" },
		"POST /system/sync/report": {
			sync: "poll",
			control: "never"
		},
		"DELETE /system/authorized-key": {
			auth: "door",
			control: "never"
		},
		"DELETE /system/authorized-key/{machine}": { control: "never" }
	}, dd = (e) => e.slice(e.indexOf(" ") + 1), Object.keys(ud).map((e) => ({
		name: e,
		method: e.slice(0, e.indexOf(" ")),
		path: dd(e),
		meta: ud[e]
	}));
})), pd, H, md = v((() => {
	Et(), pd = Symbol.for("intentic.contract.frame"), H = (e) => Object.assign(Ct(e), { [pd]: e });
})), hd, gd, _d = v((() => {
	md(), hd = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { route: t, meta: n } = e["~orpc"];
		if (t?.method !== void 0 && t.path !== void 0) return {
			method: t.method,
			path: t.path,
			meta: n ?? {}
		};
	}, gd = (e) => {
		let t = [];
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			let r = hd(i);
			r !== void 0 && t.push({
				name: `${n}.${e}`,
				...r
			});
		}
		return t.toSorted((e, t) => e.name.localeCompare(t.name));
	};
})), U, W = v((() => {
	Et(), U = y.$meta({});
})), vd, yd, bd = v((() => {
	V(), vd = P("kind", [
		M({
			kind: L("person"),
			email: D().describe("The signed-in member, as the sandbox verified them."),
			name: D().optional().describe("Their display name, where the sign-in carries one.")
		}),
		M({
			kind: L("program"),
			token: D().describe("The label of the control token a person minted and handed to this program.")
		}),
		M({
			kind: L("agent"),
			conversationId: D().describe("The conversation whose agent is speaking: a child reporting back, a peer's message.")
		}),
		M({
			kind: L("sandbox"),
			source: D().optional().describe("What in the sandbox spoke: an automation, a watch that fired, a job that ended, a repair. Absent when it does not say.")
		})
	]), yd = I([
		"land-conflict",
		"verify-nudge",
		"land-breakage",
		"land-fix",
		"land-fix-nudge",
		"land-held",
		"push-fix",
		"push-fix-nudge",
		"ci-fix",
		"ci-fix-nudge"
	]);
})), xd, Sd = v((() => {
	xd = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
})), Cd, wd, Td, Ed, Dd = v((() => {
	V(), I(["helper", "run"]), Cd = [
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
			id: "model-router",
			label: "New chat routing",
			blurb: "Which model reads a new chat's first message and picks what it opens on: the model, effort and account, and the persona.",
			kind: "helper",
			icon: "sparkles"
		},
		{
			id: "pipeline-fix",
			label: "Pipeline fixes",
			blurb: "The agent started by Fix on a failed pipeline.",
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
	], wd = Cd.map((e) => e.id), Td = I(wd), Ed = (e) => Cd.filter((t) => e(t)), Ed((e) => e.kind === "helper"), Ed((e) => e.kind === "run" && e.trigger === "pressed"), Ed((e) => e.kind === "run" && e.trigger === "unprompted");
})), Od, kd, Ad, jd, Md, Nd = v((() => {
	Od = {
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
		warm: !0,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "hooks",
		secrets: "masked",
		privacy: "gateway"
	}, kd = {
		runtime: "codex",
		steering: !0,
		permissions: "plan",
		questions: !0,
		mcp: "http",
		execution: ["shell"],
		effort: !0,
		fastMode: !1,
		isolation: "namespace",
		commands: !0,
		terminals: !1,
		recovery: !1,
		warm: !1,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "approval",
		secrets: "none",
		privacy: "gateway"
	}, Ad = {
		runtime: "opencode",
		steering: !1,
		permissions: "plan",
		questions: !1,
		mcp: "http",
		execution: ["shell"],
		effort: !1,
		fastMode: !1,
		isolation: "cwd",
		commands: !1,
		terminals: !1,
		recovery: !1,
		warm: !1,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "approval",
		secrets: "none",
		privacy: "gateway"
	}, jd = {
		...Ad,
		runtime: "opencode-gemini"
	}, Md = {
		runtime: "cursor",
		steering: !0,
		permissions: "plan",
		questions: !0,
		mcp: "tools",
		execution: ["shell", "js"],
		effort: !0,
		fastMode: !1,
		isolation: "namespace",
		commands: !1,
		terminals: !1,
		recovery: !0,
		warm: !1,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "hooks",
		secrets: "none",
		privacy: "none"
	};
})), Pd, Fd, Id, Ld = v((() => {
	Nd(), Pd = [
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
				native: Od,
				claudeCode: Od
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
				native: kd,
				claudeCode: Od
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
				native: Ad,
				claudeCode: Od
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
				native: Od,
				claudeCode: Od
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
				native: jd,
				claudeCode: jd
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
				native: Md,
				claudeCode: Md
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
				native: Od,
				claudeCode: Od
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
				native: Od,
				claudeCode: Od
			}
		}
	], Fd = Pd.map((e) => e.id), new Map(Pd.map((e) => [e.id, e])), Id = Pd.filter((e) => e.auth.kind === "translator").map((e) => e.id), Pd.filter((e) => e.auth.kind === "minted").map((e) => e.id);
})), Rd = v((() => {})), G, zd, Bd, Vd = v((() => {
	V(), G = D().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/), zd = D().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]*$/).max(200), Bd = I(["on", "off"]).default("off");
})), Hd, Ud, Wd, Gd, Kd, qd, Jd, Yd, Xd, Zd, Qd, $d, ef, tf, nf, rf, af, of, sf, cf, lf, uf, df, ff, pf, mf, hf, gf, K = v((() => {
	bd(), V(), Sd(), Dd(), Ld(), ld(), Rd(), Vd(), Hd = D().min(1), Ud = M({ provider: I(Fd) }), Wd = I(["native", "claude-code"]), Gd = M({
		repo: D(),
		base: D().min(1)
	}), Kd = M({
		file: D().min(1).describe("The file open in the editor, as a workspace path."),
		startLine: k().int().min(1).optional().describe("First line of the selection, counting from one. Leave both out when the whole file is the context."),
		endLine: k().int().min(1).optional().describe("Last line of the selection, counting from one."),
		selection: D().max(2e4).optional().describe("The selected text itself. Cut it down before sending if it is long: this is context, not an upload.")
	}), qd = D().regex(xd), Jd = M({
		automationId: D(),
		provider: D(),
		channelId: D().optional(),
		author: D().optional()
	}), I([
		"schedule",
		"event",
		"listener",
		"webchat",
		"issues",
		"workspace",
		"workflow"
	]), Yd = I([
		"allow",
		"hold",
		"deny"
	]), Xd = I(["sandbox", "device"]), Zd = I([
		"git.destructive",
		"git.branch-switch",
		"files.destructive",
		"system.destructive",
		"container.state",
		"secrets.access",
		"package.publish",
		"network.outbound"
	]), Qd = M({
		schedule: Yd.default("allow"),
		event: Yd.default("allow"),
		listener: Yd.default("allow"),
		webchat: Yd.default("allow"),
		issues: Yd.default("hold"),
		workspace: Yd.default("allow"),
		workflow: I(["allow", "deny"]).default("allow")
	}), $d = I([
		"default",
		"plan",
		"bypassPermissions"
	]), ef = M({
		conversationId: qd,
		index: k().int().nonnegative(),
		files: I(["then", "now"])
	}), tf = M({
		prompt: D().describe("What to say to the agent. May be empty if you are only attaching files."),
		errand: yd.optional().describe("What the words are for, when the app or the sandbox composed them rather than a person typing them: a land conflict to resolve, a failed CI run to fix. Shown as the sandbox's words, not yours. Leave it out for your own words."),
		messageId: D().min(1).max(128).optional().describe("Your id for this message. Sending again under an id the sandbox already took is answered with what it did with it the first time, never a second delivery. Leave it out and the sandbox names the message itself."),
		title: D().max(80).optional().describe("A title for a conversation this turn is opening. Ignored for a conversation that already has one."),
		attachments: j(D().min(1)).max(20).optional().describe("Files to hand the agent along with the prompt, as workspace paths. Upload them first."),
		mentions: j(D().min(1)).max(20).optional().describe("Workspace paths the prompt mentions with `@`. Unlike attachments, one that escapes the workspace or names no file is ignored rather than refused."),
		agent: Hd.optional().describe("Which model provider serves this turn. Leave it out for Claude."),
		harness: Wd.optional().describe("Which agentic loop runs the turn. Leave it out to use each provider's own."),
		account: D().optional().describe("Which of that provider's connected accounts pays for the turn. Leave it out to continue on the account the conversation runs on, or, for its first turn on this provider, to take whichever account can serve with the most room. To move a running conversation, use `switchAccount`."),
		actsAs: G.optional().describe("Which persona the turn speaks as out in the world. Not the same as which account pays for it."),
		sessionId: D().optional().describe("Resume this provider session instead of starting a fresh one."),
		conversationId: qd.optional().describe("The conversation this turn belongs to. You choose it, it survives model switches, and it is how you address the conversation later. Naming one that does not exist opens it."),
		isolated: A().optional().describe("Work in this conversation's own private copy of the repos rather than the shared tree, so several agents can work at once. Needs a conversation id."),
		startIn: D().max(200).optional().describe("Which folder the conversation opens in, relative to the workspace root; the project it belongs to. Decided on the first turn. A persona that names its own start folder wins."),
		placement: cd.optional().describe("Where this conversation runs: this sandbox (leave it out), or a paired runner by id. Decided on the first turn; later turns follow the conversation."),
		worktreeBase: j(Gd).min(1).max(50).optional().describe("Pin a new private copy to these exact commits instead of today's workspace. Used when several agents must start from identical files."),
		autoLand: A().optional().describe("Whether this turn's work merges into the workspace when it finishes. Overrides the conversation's own setting for this turn only."),
		runRole: Td.optional().describe("What started this turn, when it was not a person typing: which of the sandbox's per-job model lists answers for it. Only used when the turn names no model of its own."),
		origin: Jd.optional().describe("Set by the sandbox alone: this turn opened a conversation on behalf of a message from outside rather than a person."),
		forkOf: M({
			conversationId: qd.describe("The conversation this one was cut from."),
			keep: k().int().nonnegative().describe("How many of that conversation's messages to copy in before this turn runs."),
			files: I(["then", "now"]).describe("Which files the fork opens on: \"now\" is the workspace as it stands, \"then\" is the files as they were at the cut, which needs a private copy.")
		}).optional().describe("Where this conversation was cut from, on its first turn only. Only the client knows this, so only the client can say it."),
		model: D().optional().describe("Which model to use. Leave it out for the provider's default."),
		unattended: A().optional().describe("Nobody is watching this turn: a schedule, a queue or another agent started it and no chat is open on it. A card that needs a person is refused rather than raised, plan mode and the terminal hand-off are withheld, and the sandbox's signed-in accounts stay out of it unless a persona carries them."),
		outsideWake: D().min(1).optional().describe("Content from outside caused this turn, and what to call the source. It is what makes the sandbox treat the turn as carrying somebody else's words."),
		permissionMode: $d.optional().describe("How tool calls are gated: ask before each tool, propose a plan first, or run everything. The agent can move itself between these mid-turn."),
		allowedTools: j(D().min(1)).optional().describe("Narrow the turn to these tools. Leave it out for everything the runtime has. For a turn driven by an outside message this list is the real boundary, because prompt wording is only advice."),
		effort: D().optional().describe("How hard the model should think, where the provider offers a choice."),
		thinking: A().optional().describe("Whether to show the model's reasoning as it works."),
		fast: A().optional().describe("Ask for the same work at a higher rate for a higher price. A request rather than a promise: the answer says what actually happened."),
		autoPicked: A().optional().describe("Whether this turn's model was chosen for you by reading the conversation's opening message, rather than picked by hand. Recorded so the choice can be judged later against what you did next."),
		editorContext: Kd.optional().describe("What the user has open in their editor, folded into the prompt so that pointing words like \"this\" resolve."),
		sendAt: k().int().positive().optional().describe("Hold this message until then (epoch milliseconds) instead of starting a turn now: a time you chose, or the reopen of an allowance you know is spent. It waits in the conversation's queue, where it can be sent early, reworded, rescheduled or removed, and goes by itself at that instant, even for a conversation this message opens or one whose turn is running now. Ignored when already past; at most a month ahead."),
		sendAfter: qd.optional().describe("Hold this message until the conversation named here has finished and all of its work has landed in the workspace, instead of starting a turn now: for work that builds on another agent's. It waits in this conversation's queue, where it can be sent early, reworded, rescheduled or removed. Sent at once when that conversation has nothing running and nothing left to land."),
		conversationAutoLand: A().optional().describe("Whether this conversation's finished work merges into the workspace by itself from now on: its own answer to the sandbox-wide setting, the one `agents.autoLand` changes later. Read only from the message that opens the conversation, and only from a maintainer. Unlike `autoLand`, it holds for every later turn.")
	}), nf = tf.refine((e) => e.prompt.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "prompt or attachments required" }).refine((e) => e.isolated !== !0 || e.conversationId !== void 0, { message: "isolated requires conversationId" }).refine((e) => e.worktreeBase === void 0 || e.isolated === !0 && e.conversationId !== void 0, { message: "worktreeBase requires an isolated conversationId" }).refine((e) => e.origin === void 0 || e.conversationId !== void 0, { message: "origin requires conversationId" }).refine((e) => e.forkOf === void 0 || e.conversationId !== void 0, { message: "forkOf requires conversationId" }).refine((e) => e.forkOf?.files !== "then" || e.isolated === !0, { message: "forkOf.files \"then\" requires isolated" }).refine((e) => e.sendAt === void 0 || e.sendAfter === void 0, { message: "sendAt and sendAfter are two different holds: name one" }).refine((e) => e.sendAfter === void 0 || e.sendAfter !== e.conversationId, { message: "a conversation cannot wait for its own work to land" }), rf = nf.safeExtend({ continues: L(!0).optional().describe("Carry the conversation on from where its last turn stopped instead of saying anything: nothing of yours is added to the conversation, and `prompt` is ignored. A turn the sandbox still holds runs again as it was; otherwise the agent is told to continue in its own session. Refused while a turn is running.") }), af = tf.pick({
		agent: !0,
		harness: !0,
		account: !0,
		model: !0,
		effort: !0,
		thinking: !0,
		fast: !0,
		actsAs: !0,
		isolated: !0,
		unattended: !0,
		runRole: !0
	}), Object.keys(af.shape), of = M({
		agent: D().min(1).describe("Which provider."),
		model: D().min(1).describe("Which of its models. Both or neither, because a model name only means anything to the provider that serves it."),
		account: D().optional().describe("Which connected account of that provider pays, by its daemon-minted id. Leave it out to take whichever account can serve with the most room."),
		harness: Wd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own."),
		effort: D().optional().describe("How hard that model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: A().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: A().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise.")
	}).optional(), sf = (e) => ({
		agent: e.provider,
		model: e.model,
		...e.account === void 0 ? {} : { account: e.account },
		...e.harness === void 0 ? {} : { harness: e.harness },
		...e.effort === void 0 ? {} : { effort: e.effort },
		...e.thinking === void 0 ? {} : { thinking: e.thinking },
		...e.fast === void 0 ? {} : { fast: e.fast }
	}), cf = M({
		provider: Hd.describe("Which provider serves this work."),
		model: D().min(1).describe("Which of its models. Both halves, because a model name only means anything to the provider that serves it."),
		effort: D().optional().describe("How hard this model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: A().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: A().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise."),
		harness: Wd.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own.")
	}), lf = M({ run: D().describe("The id of the run that just started. Hand it back when you attach: the stream always opens on the conversation's newest run, so a different id there means another turn has started since.") }), uf = M({
		delivered: I([
			"started",
			"steered",
			"queued"
		]).describe("What became of the message: it started a turn, it was said into the turn already running, or it waits in the conversation's queue for the next one."),
		run: D().optional().describe("The run the message is in: the turn it started, or the one it was said into. Hand it back when you attach. Absent while the message waits in the queue."),
		duplicate: L(!0).optional().describe("The sandbox had already taken a message under this id: this is what became of it, and nothing new happened.")
	}), df = I([
		"person",
		"sandbox",
		"agent"
	]), ff = M({
		id: D().describe("The message's id: what its sender named it, or what the sandbox did."),
		text: D().describe("The words, as they will go out."),
		attachments: j(D()).optional().describe("Files that go with it, as workspace paths."),
		voice: df.describe("Who it is from: a person, the sandbox itself, or another agent."),
		queuedAt: k().describe("When it joined the queue, in milliseconds."),
		revision: k().int().nonnegative().describe("The queue's revision when this message was last written. An edit or a removal names it, and is refused if the message has changed since.")
	}), pf = I([
		"stopped",
		"refused",
		"scheduled"
	]), mf = M({
		items: j(ff).describe("What waits, in the order it goes out."),
		revision: k().int().nonnegative().describe("Moves with every change to the queue, so of two copies the higher is the newer."),
		paused: pf.optional().describe("Why nothing goes out by itself: somebody stopped the turn, the turn these messages started was refused before it ran, or they were scheduled for a time or for after another conversation's work lands. Resuming lets them go, and so does sending another message."),
		until: k().optional().describe("When scheduled messages go out by themselves, in milliseconds. Only on a queue paused as `scheduled`."),
		after: qd.optional().describe("The conversation whose finished work must land before scheduled messages go out by themselves. Only on a queue paused as `scheduled`, in place of `until`.")
	}), hf = M({
		run: D().optional().describe("The turn the waiting messages started. Absent when a turn was already running, and they go after it."),
		queue: mf.optional().describe("The queue the release left: what still waits once the turn took what it could. Absent from sandboxes older than the field.")
	}), gf = M({
		conversationId: qd.describe("Which conversation to watch."),
		run: D().optional().describe("The run you were watching. The stream opens on the conversation's newest run whatever you name: if a newer turn has started since, the head names that one instead, and its rows are that turn's.")
	});
})), _f, vf, yf = v((() => {
	_f = String.raw`[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?`, vf = new RegExp(String.raw`^(?:\*\.${_f}(?:\.${_f})+|${_f}(?:\.${_f})*)$`);
})), bf, xf, Sf, Cf, wf, Tf, Ef, Df, Of, kf, Af, jf, Mf, Nf, Pf, Ff, If, Lf, Rf, zf, Bf, Vf, Hf, Uf, Wf, Gf = v((() => {
	V(), yf(), bf = /^[A-Za-z_][A-Za-z0-9_]*$/, xf = D().regex(bf).max(128), Sf = M({
		key: xf.describe("The name to store it under, which is the name a process will find it by."),
		value: D().min(1).describe("The value. It goes straight to your sandbox and never through the platform.")
	}), Cf = M({ keys: j(D()).describe("The names that exist here. Only the names: the values never leave the sandbox.") }), wf = M({ key: xf.describe("Which secret, by name.") }), Tf = M({ value: D().describe("The value itself. The only place in this API one is ever returned.") }), Ef = [
		"hex",
		"base64url",
		"alnum"
	], Df = M({
		key: xf.describe("The name to store it under: a name nothing here holds yet, since a new value would break whatever uses the old one."),
		bytes: k().int().min(16).max(128).default(32).describe("How much randomness, in bytes. 32 unless whatever reads it demands a particular length."),
		format: I(Ef).default("hex").describe("How it is spelled: `hex` (0-9, a-f), `base64url` (letters, digits, - and _), or `alnum` (letters and digits only, for readers that refuse symbols).")
	}), Of = M({
		key: D().describe("The name it is stored under."),
		length: k().int().describe("How many characters it is, which a reader's validation may care about."),
		stored: I(["env", "sandbox"]).describe("Where it was kept: desired-state/.env once DevOps is active, the sandbox's own store before that.")
	}), kf = I(["use", "conversation"]).describe("How far one release goes: `use` asks again every single time (one click releases exactly one use), `conversation` covers the rest of this conversation and is forgotten when the daemon restarts."), Af = I(["secret", "capability"]).describe("Whether this gate covers one stored secret, by the name a reference carries, or one whole connected capability, by its id."), jf = I([
		"shell",
		"code",
		"browser",
		"session",
		"otp"
	]).describe("What the credential was about to be used for: a shell command, a script, typing into a page, mounting a connected account, or one one-time code."), Mf = M({
		subject: D().min(1).describe("What is gated: a secret's name, or a connected capability's id."),
		kind: Af,
		approvers: j(D().min(3)).min(1).describe("Exactly who may release it, by email, from the people on the Access roster. Not a seniority floor: nobody outside this list can release it, the owner included, unless the owner is on it."),
		scope: kf
	}), Nf = M({ gates: j(Mf).describe("Every gate in force. Names, subjects and approver addresses only: this answer never carries a credential.") }), Pf = M({ subject: D().min(1).describe("Which gate, by the secret name or capability id it covers.") }), Ff = M({
		subject: D().min(1).describe("What to ask for: the secret's name, or the connected capability's id."),
		why: D().max(280).optional().describe("One line on what it is for. The only words on the card that are the agent's."),
		conversationId: D().optional().describe("Which conversation to raise the card in. The CLI fills this from the running turn.")
	}), If = M({
		granted: L(!0).describe("Always true: a refusal is an error with a sentence, never a `false` here."),
		approvedBy: D().describe("Who released it."),
		message: D().describe("What the grant means in practice, and what to do next.")
	}), Lf = D().max(253).regex(vf).describe("One host, `api.github.com`, or every host under a domain, `*.github.com` (which does not include github.com itself). Lowercase, no scheme or port."), Rf = I(["owner", "connector"]).describe("Who set it: the owner, or the connector the credential belongs to, whose guard is on with its own service's hosts until the owner changes it."), zf = M({
		subject: D().min(1).describe("Which secret, by the name its reference carries, or which connected capability, by its id."),
		kind: Af,
		guard: A().describe("On: a use off the list, or whose destination cannot be read, asks a person first. Off: it never asks."),
		hosts: j(Lf).max(64).describe("Where it goes without asking while the guard is on. Empty with the guard on: every use asks. Kept while it is off, for turning it back on."),
		source: Rf
	}), Bf = M({ guards: j(zf).describe("Every secret whose host guard has been set, or that a connector guards by default. One not listed has its guard off. Names and hosts only, never a value.") }), Vf = M({
		subject: D().min(1).describe("Which secret, by name, or which connected capability, by id."),
		kind: Af.optional().describe("Whether the subject is a secret or a capability. Worked out from the name when absent."),
		guard: A().describe("Whether a use off the list, or whose destination cannot be read, must ask a person first."),
		hosts: j(Lf).max(64).describe("The whole new list. Turning the guard on or taking hosts away is open to anybody who may use secrets; turning it off or adding a host is the owner's to approve."),
		conversationId: D().optional().describe("Which conversation to ask the owner in, when the change needs them. The CLI fills this from the running turn.")
	}), Hf = M({
		guard: A().describe("Whether the guard is on now."),
		hosts: j(D()).describe("Where it goes without asking while the guard is on."),
		approvedBy: D().optional().describe("Who approved the change, when it needed the owner's click. Absent when nobody had to.")
	}), Uf = M({
		key: D().describe("What identifies it. Unique across the whole inventory, so several accounts of one provider each get their own entry."),
		kind: I([
			"env",
			"generated",
			"capability",
			"provider"
		]).describe("Where it came from: you set it, the sandbox generated it, a connection needs it, or it is a model account's credential."),
		label: D().optional().describe("A friendlier name, for entries that have one."),
		status: I([
			"missing",
			"set",
			"connected"
		]).describe("Whether it exists and, for a connection, whether it is working."),
		requiredBy: j(M({
			resourceId: D().describe("Which resource."),
			type: D().describe("What kind of resource it is.")
		})).describe("What is waiting on it. Empty for a connection's or an account's own credential."),
		storedAt: D().describe("Where it actually lives, in words."),
		revealable: A().describe("Whether its value can be shown at all. Everything except a model account's credential can be."),
		ci: M({
			synced: A().describe("Whether the pipeline has it."),
			pushedAt: D().optional().describe("When it was last sent there.")
		}).optional().describe("Whether a copy has been given to the build pipeline."),
		lastUse: M({
			at: k().describe("When, in milliseconds."),
			lane: I([
				"shell",
				"code",
				"browser"
			]).describe("How it was used: a command, a script, or typed into a page."),
			detail: D().optional().describe("Where it went: the start of the command or script, or the site. Names and destinations only, never values."),
			approvedBy: D().optional().describe("Who released it for that use, when it is gated. Absent when nothing had to be approved.")
		}).optional().describe("The last time an agent actually spent this secret. Absent while it never has been, which most never are."),
		gate: M({
			approvers: j(D()).describe("Who may release it, by email. Nobody else can, whatever their role."),
			scope: kf
		}).optional().describe("Who has to release this before the agent can use it, and for how long one release lasts. Absent when it is not gated."),
		hosts: M({
			guard: A().describe("Whether a use off the list, or whose destination cannot be read, asks a person first."),
			list: j(D()).describe("The hosts it goes to unasked while the guard is on, each exact or `*.domain`."),
			source: Rf
		}).optional().describe("Its host guard. Absent when none was ever set and no connector sets one: the guard is off.")
	}), Wf = M({ entries: j(Uf).describe("One entry per secret this sandbox knows about, from every place they live. No values, ever.") });
})), Kf, qf, Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np, rp, ip, ap, op, sp, cp, lp, up, dp, fp, pp, mp, hp, gp, _p, vp, yp, bp, xp, Sp, Cp, wp, Tp, Ep, Dp = v((() => {
	V(), K(), Gf(), Kf = M({
		label: D().describe("The choice, in a few words."),
		description: D().describe("What picking it means."),
		preview: D().optional().describe("Something to look at while deciding: a mock-up, a snippet, a layout.")
	}), qf = M({
		question: D().describe("What the agent is asking."),
		header: D().describe("A short label for the question."),
		multiSelect: A().describe("Whether more than one answer can be picked."),
		options: j(Kf).describe("The choices offered. A free-text answer is always possible as well.")
	}), Jf = M({
		text: D().describe("What would run."),
		language: I(["bash", "javascript"]).describe("Which of the two backends it is written for, named as the grammar that colours it."),
		truncated: A().describe("Whether this is an excerpt of a longer program, so the request can say so instead of ending mid-word. An excerpt always carries the flagged fragment: the beginning, then a window around the fragment, with any skipped middle written into the text as a bracketed count."),
		spans: j(M({
			start: k().int().nonnegative(),
			end: k().int().nonnegative()
		})).describe("Which fragments of the text the pattern match fired on: every matched class's, or, under the hard rule, only the class the title names. Offsets into text, in order, never overlapping.")
	}), Yf = M({
		provider: Hd.describe("Which provider serves it."),
		model: D().min(1).describe("Which of that provider's models."),
		harness: Wd.optional().describe("Which agentic loop runs it. Absent is the provider's own."),
		account: D().optional().describe("Which of that provider's connected accounts pays for it. Absent is whichever has the most room when it starts."),
		effort: D().optional().describe("How hard it thinks, where the model offers a choice. Absent is the model's own default."),
		thinking: A().optional().describe("Whether it reasons before it answers, where the model offers the choice."),
		fast: A().optional().describe("Whether it asks for the faster rate, at the higher price.")
	}), Xf = I([
		"spawn",
		"send",
		"answer"
	]), Zf = Yf.extend({
		move: Xf.describe("What the parent asks to do: start a new child, say something to one it started, or answer one's question."),
		child: D().optional().describe("The child's id, for one that already exists."),
		task: D().optional().describe("What the child is for, in a line."),
		message: D().optional().describe("What the parent would say to it: the message it sends, or the answers it gives. Clipped for the request."),
		on: D().optional().describe("Which machine it runs on, when one is named: a runner, or \"here\" for this sandbox."),
		proposed: Yf.optional().describe("What the agent asked to start it on, when the owner started it on something else instead. Present only once the request has settled that way.")
	}), Qf = M({
		toolName: D().describe("Which tool it wants to use."),
		title: D().optional().describe("The whole question, as a sentence, exactly as the runtime words it."),
		displayName: D().optional().describe("A short phrase for the button, such as read file."),
		description: D().optional().describe("More about what it is asking for."),
		reason: D().optional().describe("Why it is asking at all: a rule, the current mode, something that looked risky."),
		path: D().optional().describe("Which file it concerns, when it concerns one."),
		alwaysLabel: D().optional().describe("The wording for an always-allow answer. Present only when there is something an always could actually remember; without it the only answers are once and no."),
		alwaysAsks: L(!0).optional().describe("This request asks every time: an owner's hard rule, a sandbox restart other conversations would feel, or a change only the owner may make. Allow everything in this conversation is not offered on it and never answers it."),
		program: Jf.optional().describe("The program this request is holding, when the request is about one. Present on a command gate's request and absent on every other permission ask."),
		child: Zf.optional().describe("The subagent this request would start or reach, and what it runs on. Present on the request to start or reach a subagent and absent on every other permission ask."),
		explain: D().optional().describe("One plain sentence saying what the program does and why it is being asked about, where the title says something else. Written by the judge that read your safety policy, never by the agent being gated.")
	}), $f = M({
		entry: D().describe("Which catalog entry is being asked for."),
		name: D().describe("What it is called, as the catalogue titles it rather than as the agent named it."),
		why: D().optional().describe("The agent's case for connecting it, and the only words on this request that are the agent's.")
	}), ep = M({
		url: D().describe("What is being paid for."),
		description: D().optional().describe("What the endpoint says it is."),
		payTo: D().describe("Where the money goes, taken verbatim from the endpoint's own demand."),
		network: D().describe("On which network."),
		asset: D().describe("In which token."),
		assetName: D().describe("That token's name. It is pegged to the dollar, which is what lets every amount here read as dollars."),
		amountUsd: D().describe("The exact price. Not a ceiling: this scheme has no ranges, so this is the whole spend."),
		spentTodayUsd: D().describe("What has already gone out today."),
		dailyCapUsd: D().describe("What may go out in a day."),
		why: D().optional().describe("The agent's case for paying, and the only words on this request that are the agent's.")
	}), tp = M({
		subject: D().describe("Which credential is being asked for."),
		kind: Af,
		lane: jf,
		detail: D().optional().describe("Where it would go: the start of the command, the site, or what is being mounted. Never a value: the command still reads as a reference at this point."),
		why: D().optional().describe("The agent's case for using it, and the only words on this request that are the agent's."),
		approvers: j(D()).describe("Who may release it. A click from anyone else is refused and leaves the request standing."),
		scope: kf
	}), np = M({
		name: D().describe("What to type, without the leading slash."),
		description: D().describe("What it does."),
		hint: D().optional().describe("What its argument should look like, shown after the name.")
	}), rp = M({ agent: Hd.optional().describe("Whose commands to read. Leave it out for Claude.") }), ip = M({ commands: j(np).describe("The shortcut commands, as the provider last published them.") }), ap = M({
		content: D().describe("The item, as the agent wrote it."),
		status: I([
			"pending",
			"in_progress",
			"completed"
		]).describe("Where it is."),
		activeForm: D().optional().describe("How to phrase it while it is happening, so a screen can say what the agent is doing rather than what it plans to do.")
	}), op = M({
		tokens: k().describe("How much the latest request sent, all told."),
		contextWindow: k().describe("How much the model can hold. The gap between these two is how close the conversation is to being compacted."),
		cachedAt: k().optional().describe("When that request last touched the provider's prompt cache, in milliseconds. The cache's clock runs from here, since a read refreshes it as a write does."),
		cacheTtlMs: k().optional().describe("How long that cache entry lives from `cachedAt`, in milliseconds.")
	}), sp = I([
		"read",
		"edit",
		"delete",
		"move",
		"search",
		"execute",
		"think",
		"fetch",
		"other"
	]), cp = I([
		"pending",
		"in_progress",
		"completed",
		"failed"
	]), lp = M({
		path: D().describe("The file, as a workspace path, whatever directory the tool was run from."),
		line: k().optional().describe("Which line, counting from one.")
	}), up = P("type", [
		M({
			type: L("text").describe("Plain output."),
			text: D().describe("What the tool said.")
		}),
		M({
			type: L("diff").describe("A change to a file."),
			path: D().describe("Which file, as a workspace path."),
			oldText: D().optional().describe("What was there. Absent for a new file, or where the previous contents are not known."),
			newText: D().describe("What is there now."),
			truncated: A().optional().describe("One of the two sides was too large to send whole.")
		}),
		M({
			type: L("image").describe("A picture the tool produced."),
			path: D().describe("Where it is, as a workspace path. A path rather than the bytes, because the workspace already serves it, sending it inline would bloat every stored record, and this way the picture stays openable afterwards.")
		})
	]), dp = M({
		path: D().describe("Where it lives, as a workspace path."),
		title: D().describe("What it is called: its opening heading, or its file name."),
		markdown: D().describe("The document itself."),
		truncated: A().optional().describe("It was clipped at the wire cap; the file on disk has more."),
		plan: A().optional().describe("It is one of the CLI's plan files, written to be approved rather than merely read.")
	}), fp = D().describe("What to send back when you answer."), pp = {
		requestId: fp,
		text: D().describe("The plan itself."),
		document: dp.optional().describe("The write-up this plan refers to, when the plan itself is a pointer to one.")
	}, mp = {
		requestId: fp,
		questions: j(qf).describe("What it wants to know."),
		document: dp.optional().describe("The document this turn wrote and is asking about, so the choice can be read beside it.")
	}, hp = { requestId: fp }, gp = {
		requestId: D(),
		session: D(),
		account: D(),
		message: D()
	}, _p = {
		requestId: D(),
		session: D(),
		message: D()
	}, vp = {
		requestId: D(),
		offer: $f
	}, yp = {
		requestId: D(),
		offer: ep
	}, bp = {
		requestId: D(),
		offer: tp
	}, xp = M({
		outcome: I(["connected", "unfinished"]),
		id: D().optional()
	}), Sp = M({
		outcome: I(["paid", "failed"]),
		amountUsd: D(),
		transaction: D().optional(),
		network: D().optional()
	}), Cp = M({
		outcome: I(["released", "refused"]),
		approvedBy: D().optional()
	}), wp = M({
		kind: L("plan").describe("The agent has written a plan and is waiting for a yes."),
		...pp
	}), Tp = M({
		kind: L("question").describe("The agent has asked you something and is waiting."),
		...mp
	}), Ep = Qf.extend({
		kind: L("permission").describe("The agent wants to use a tool it needs permission for."),
		...hp
	}), P("kind", [
		wp,
		Tp,
		Ep
	]);
})), Op, kp, Ap, jp, Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, Gp, Kp, qp, Jp, Yp, Xp, Zp, Qp, $p = v((() => {
	V(), Dp(), Ld(), K(), Rd(), Op = N([
		L("all"),
		L("none"),
		M({ models: j(D().min(1)).min(1) })
	]), kp = M({
		kind: D(),
		label: D().optional(),
		utilization: k(),
		resetsAt: k().optional(),
		gates: Op
	}), Ap = M({
		since: k().describe("When re-reading this account first failed, in milliseconds. It has failed on every attempt since."),
		reason: D().describe("Why, in the provider's own words where it gave some (\"Verify your account to continue.\"). Short enough to print; never a pasted response body.")
	}), jp = M({
		windows: j(kp),
		measuredAt: k(),
		unread: Ap.optional().describe("Present while re-reading this account keeps failing: these windows are the last reading that succeeded, and `measuredAt` will not move until a read succeeds again.")
	}), Mp = I([
		"reconnect",
		"admin",
		"verify",
		"wait"
	]), Np = P("kind", [
		M({
			kind: L("ready"),
			room: k().describe("How much of the fullest pool that gates the turn is left, in percent (above 0, up to 100). Pickers take the most room.")
		}),
		M({
			kind: L("spent"),
			reopensAt: k().optional().describe("When every full pool has reopened, in epoch seconds, where the plan publishes it. Absent means unknown, never now.")
		}),
		M({
			kind: L("blocked"),
			fix: Mp.describe("Who can make it serve again: `reconnect` (sign in again on this sandbox), `admin` (an organisation admin hands the seat back), `verify` (the account's owner confirms it on the provider's page, at `url`), or `wait` (it lifts by itself, at `until` where known)."),
			reason: D().describe("Why, in words a person can act on: the provider's own sentence where it gave one."),
			until: k().optional().describe("When waiting lifts it, in epoch seconds, for `wait` only."),
			url: D().optional().describe("The provider's page where the account's owner lifts it, for `verify` only.")
		}),
		M({ kind: L("unknown").describe("Nothing blocks it and nothing has been measured: usable, never read as room.") })
	]), Pp = M({
		available: A().describe("Whether the provider will reopen this account's session window right now. The only thing a button may be drawn from."),
		reason: D().optional().describe("Why not, in the provider's own word, when it gave one. Absent when it is available, or when the provider said nothing."),
		nextAvailableAt: k().optional().describe("When the next reset may be claimed, in epoch seconds, where the provider publishes it. Absent means unknown, never 'now'."),
		weeklyResetsAt: k().optional().describe("When the weekly allowance itself reopens, in epoch seconds, where the provider publishes it.")
	}), Fp = M({
		result: I([
			"reset",
			"already_used",
			"not_limited",
			"ineligible",
			"unavailable",
			"error"
		]).describe("What the provider did. Only `reset` reopened the window; every other value means nothing changed."),
		nextAvailableAt: k().optional().describe("When another reset may be claimed, in epoch seconds, where the provider published it."),
		detail: D().optional().describe("What went wrong, in words, for the two outcomes that are this sandbox's fault rather than the plan's.")
	}), Ip = M({
		at: k().describe("When it refused, in milliseconds."),
		kind: I([
			"limit",
			"auth",
			"entitlement"
		]).describe("Three different noes, kept apart because what fixes each is different. A spent allowance is answered by waiting; a refused credential by signing in again; and an entitlement refusal, where somebody has switched this off for your seat, by neither of those. That last one authenticates fine and reports healthy limits the whole time it refuses everything."),
		message: D().describe("The provider's own words, verbatim. The only part that says which limit or which credential."),
		account: D().optional().describe("Which account was serving, where that is known."),
		model: D().optional().describe("Which model the refused turn was on, where that is known."),
		resetsAt: k().optional().describe("When the provider said to try again, in epoch seconds, for a spent allowance where it named one. Until then the refusal stands whatever a reading says; after it, it is over.")
	}), Lp = M({ refusals: F(D(), Ip).describe("The most recent refusal per provider. Read alongside an account's usage: that says how full it was when last checked, this says whether it has since started saying no.") }), Rp = M({
		name: D(),
		label: D(),
		usage: jp.optional(),
		cooling: M({
			until: k().optional(),
			reason: D().optional(),
			verify: D().optional()
		}).optional(),
		state: Np.optional().describe("Whether it can serve a turn now, judged from everything above plus the provider's last refusal. Absent from a daemon older than this field.")
	}), zp = M(Object.fromEntries(Id.map((e) => [e, j(Rp)]))), Bp = P("kind", [
		M({
			kind: L("plan").describe("Answering a plan the agent proposed."),
			requestId: D().min(1).describe("Which card you are answering, from the frame that raised it."),
			approve: A().describe("Whether to go ahead. Approving means the plan then runs without a prompt per tool, because being asked whether a plan you just approved may run its first command is not a question worth having."),
			feedback: D().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		M({
			kind: L("question").describe("Answering a question the agent asked."),
			requestId: D().min(1).describe("Which card you are answering."),
			answers: F(D(), j(D())).optional().describe("What you chose, keyed by the question, with the chosen labels or your own words."),
			attachments: F(D(), j(D())).optional().describe("Files that go with your own-words answer, keyed by the question, as workspace-relative paths of files already uploaded (a screenshot, a mock-up)."),
			cancelled: A().optional().describe("Dismissing it instead, which tells the agent to carry on using sensible defaults rather than leaving it waiting.")
		}),
		M({
			kind: L("permission").describe("Answering a request to use a tool."),
			requestId: D().min(1).describe("Which card you are answering."),
			decision: I([
				"once",
				"always",
				"everything",
				"deny"
			]).describe("Once allows this call alone; always allows what the request's always-label names (a tool, a rule, a secret) for the rest of the conversation; everything allows this call and every later request in this conversation that an allow-once could settle, until it is taken back on Grants; no blocks it. A request that always asks (alwaysAsks) reads everything as once."),
			feedback: D().optional().describe("Why not, which goes back to the model as the reason."),
			child: Yf.optional().describe("For a request to start a subagent: what to start it on instead of what the agent asked for. It replaces the whole run (model, account, effort and the rest), not only the fields it names. Ignored with a no, and on any other request.")
		}),
		M({
			kind: L("browser_help").describe("Answering a request for help in the agent's browser: a captcha, a password it does not hold, a check on your phone."),
			requestId: D().min(1).describe("Which card you are answering."),
			helped: A().describe("Whether you cleared it. Yes means the turn carries on from the page as you left it; no tells the agent so, and it moves on rather than waiting for ever."),
			note: D().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		M({
			kind: L("terminal_help").describe("Answering a request for help at a terminal: a code to type, a confirmation only a person can give."),
			requestId: D().min(1).describe("Which card you are answering."),
			helped: A().describe("Whether you did it. Yes also hands the agent what the terminal now says, because a person answering a prompt is exactly the moment the agent cannot see."),
			note: D().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		M({
			kind: L("capability_offer").describe("Answering a request to connect something the agent needs."),
			requestId: D().min(1).describe("Which card you are answering."),
			connect: A().describe("Yes keeps the agent waiting while you set it up, and it carries on the moment the connection comes alive. No tells it to continue without. The reply itself connects nothing: setting it up is still your own doing.")
		}),
		M({
			kind: L("payment_offer").describe("Answering a request to pay for something."),
			requestId: D().min(1).describe("Which card you are answering."),
			approve: A().describe("Yes releases exactly one payment. Anything else spends nothing. This click is the only way the money can move.")
		}),
		M({
			kind: L("credential_offer").describe("Releasing a credential the agent may only use once a named person says so."),
			requestId: D().min(1).describe("Which card you are answering."),
			approve: A().describe("Yes releases it, as far as the card says (this one use, or the rest of the conversation). Only the people the card names can answer at all, yes or no.")
		})
	]), Vp = Bp.options.map((e) => e.shape.kind.value), new Set(Vp), Hp = M({
		conversationId: D().min(1).describe("Which running conversation to interrupt."),
		text: D().max(2e4).describe("What to say to it. It arrives mid-turn without stopping the turn."),
		messageId: D().min(1).max(128).optional().describe("Your id for this message. Sending again under an id the sandbox already took is answered with what it did with it the first time, never a second delivery. Leave it out and the sandbox names the message itself."),
		attachments: j(D().min(1)).max(20).optional().describe("Files to send with it, as workspace paths. A screenshot dropped in mid-turn with no words is a legitimate thing to send."),
		mentions: j(D().min(1)).max(20).optional().describe("Workspace paths the message mentions with `@`. Unlike attachments, one that escapes the workspace or names no file is ignored rather than refused."),
		editorContext: Kd.optional().describe("What you have open, folded in so that pointing words resolve.")
	}).refine((e) => e.text.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "text or attachments required" }), Up = N([
		M({
			conversationId: D().min(1).describe("Which conversation's running turn to cancel."),
			run: D().min(1).describe("The run you mean to cancel, as starting or attaching to it named it. If another turn has started since, nothing is cancelled and the answer names the one running instead.")
		}),
		M({
			conversationId: D().min(1).describe("Which conversation's running turn to cancel."),
			messageId: D().min(1).describe("The message you sent, while its run is not named yet: cancels the turn it is in. If none is, nothing is cancelled: the message has not become a turn, or its turn has already ended.")
		}),
		M({
			conversationId: D().min(1).describe("Which conversation's running turn to cancel."),
			live: L(!0).describe("Cancel whatever turn is running now, whichever that is. Only for a turn you cannot name: one that has no run to attach to.")
		})
	]), Wp = M({
		stopped: A().describe("Whether a turn was cancelled."),
		running: D().optional().describe("The run that is live instead of the one you named, left running. Absent when nothing else runs.")
	}), Gp = M({
		agent: Hd.describe("Which provider serves the re-run."),
		harness: Wd.describe("Which agentic loop runs it."),
		account: D().optional().describe("Which of that provider's accounts pays for it. Leave it out to keep the account the conversation runs on, or, on another provider, to take whichever of its accounts can serve with the most room. Moving to another account of the same provider is `switchAccount`'s job; naming one here still works."),
		model: D().optional().describe("Which model. Leave it out to keep the one the refused turn named."),
		carry: A().optional().describe("When the account changes, keep the provider session (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record. Ignored when the provider changes, or when nothing changes.")
	}), Kp = M({
		conversationId: D().min(1).describe("Which conversation's held turn to run again."),
		routing: Gp.optional().describe("Who serves the re-run, when the conversation has been re-pointed since it was refused. Leave it out to run it on whatever the turn carried.")
	}), qp = M({
		conversationId: D().min(1).describe("Whose queue."),
		id: D().min(1).describe("Which waiting message."),
		revision: k().int().nonnegative().describe("The message's revision as you read it. If it has been changed since, from this window or another, nothing happens.")
	}), Jp = qp.extend({ text: D().describe("What the message should say instead. It keeps its place in the queue.") }), Yp = M({
		conversationId: D().min(1).describe("Whose queue to let go."),
		routing: Gp.optional().describe("Who serves the turn the waiting messages start, when the conversation has been re-pointed since they were queued: the usual answer to a refusal that held them. Leave it out to send them as they were queued.")
	}), Xp = M({
		conversationId: D().min(1).describe("Whose queue."),
		sendAt: k().int().positive().optional().describe("Send what waits at this instant (epoch milliseconds) instead. At most a month ahead; an instant already past sends it now."),
		sendAfter: qd.optional().describe("Send what waits once that conversation has finished and all of its work has landed in the workspace, instead. Sent now when it has nothing running and nothing left to land.")
	}).refine((e) => e.sendAt === void 0 != (e.sendAfter === void 0), { message: "name exactly one of sendAt and sendAfter" }).refine((e) => e.sendAfter !== e.conversationId, { message: "a conversation cannot wait for its own work to land" }), Zp = M({
		conversationId: D().min(1).describe("Which conversation to move."),
		account: D().min(1).describe("Which of the conversation's provider's connected accounts pays for its turns from now on."),
		carry: A().optional().describe("Keep the provider session across the move (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record."),
		run: A().optional().describe("Also run a turn that a spent allowance, a stop or a refusal is holding, at once on the new account. Leave it out to only move the conversation: a held turn stays held until something asks for it.")
	}), Qp = M({ run: D().optional().describe("The run that re-ran a held turn on the new account, when one was waiting: attach to it. Absent when nothing was held.") });
})), em, tm, nm, rm = v((() => {
	V(), em = M({
		id: D().min(1),
		host: I(["localhost", "127.0.0.1"]),
		port: k().int().min(1).max(65535),
		path: D().startsWith("/"),
		expiresAt: k(),
		title: D().min(1)
	}).strict(), tm = P("type", [
		M({ type: L("listening") }),
		M({
			type: L("busy"),
			reason: D()
		}),
		M({
			type: L("landed"),
			url: D().min(1)
		})
	]), nm = M({
		kind: I(["device", "browser"]),
		label: D().min(1)
	});
})), im, am = v((() => {
	V(), Ld(), im = I(Id);
})), om, sm, cm, lm, um, dm, fm, pm, mm, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm, Em = v((() => {
	V(), $p(), rm(), am(), om = M({
		id: D().describe("The account's id, which is what a turn names to spend on it and what disconnecting takes."),
		label: D().describe("What it is called here, which somebody can change."),
		email: D().optional().describe("Who it signs in as, in the provider's own words. Kept beside the label rather than folded into it, so a renamed account can still say whose it is. Absent when the provider says nothing, which is exactly when renaming is the only answer."),
		organization: D().optional().describe("Which organisation it belongs to, where the provider says."),
		variant: D().optional().describe("Which of the provider's estates it signs in to, for a provider selling more than one (Z.ai's international or mainland plan). With the email and organisation, it is who the account is: a sign-in matching all three lands on this account again, same id."),
		scope: D().optional().describe("What the credential is permitted to do, in the provider's terms."),
		connectedAt: k().describe("When it was connected, in milliseconds."),
		needsReauth: A().optional().describe("Its stored credential can no longer be renewed and somebody has to sign in again. Absent means healthy, or not checked yet."),
		detail: D().optional().describe("Why, in words a person can act on."),
		seatRefusal: D().optional().describe("Its organisation has switched it off for this harness (no seat): it still signs in and its plan limits may still read, but no turn can run on it until an admin gives access back. The provider's own sentence; cleared by the next turn that runs on it. Absent means no refusal is on file."),
		usage: jp.optional().describe("How full its plan limits were when last measured, so a picker can show what is left before committing work to it. Absent until a reading exists, which reads as unknown rather than as nothing left."),
		state: Np.optional().describe("Whether it can serve a turn now, judged once from the sign-in, the seat, the provider's last refusal and the plan limits: the verdict every picker in the sandbox uses. Read this rather than the fields it was judged from. Absent from a daemon older than this field.")
	}), sm = M({ accounts: j(om).describe("The connected accounts. Tokens never travel in this shape: being in this list is what connected means.") }), cm = M({ force: Hu().default(!1).describe("Measure the plan limits again before answering, rather than serving a recent reading. Slower, and the right thing when somebody has just changed a plan and is asking whether what they can see is still true.") }), lm = M({ id: D().min(1).describe("Which account.") }), um = M({
		id: D().min(1).describe("Which account."),
		label: D().max(80).describe("The new name. Blank restores the one derived from the sign-in, rather than leaving a nameless row.")
	}), dm = I([
		"device",
		"redirect",
		"paste"
	]), fm = M({
		url: D().describe("The page to open and sign in on."),
		code: D().describe("The one-time code the page will ask for, where the vendor issues one. Blank when the page is already addressed to this attempt."),
		state: D().describe("For a redirect sign-in, the marker in the address the browser lands on, so a pasted URL can be recognised as this attempt's. Blank otherwise."),
		flow: dm.describe("How this attempt ends. A device sign-in finishes by itself and you watch the account list; a redirect needs the address it landed on handed back; a paste needs the code the page showed."),
		variant: D().describe("Which of the provider's estates this attempt signs in to. Blank for a provider with one."),
		handshake: D().describe("This attempt's id, for finishing or abandoning it. Not a credential and not redeemable: the proof that completes the sign-in never leaves the sandbox."),
		expiresAt: k().describe("When this attempt stops being answerable, in milliseconds, so a card can stop waiting instead of spinning."),
		catchers: j(nm).optional().describe("Who is watching for where the browser lands, on the machine it is on: a device or a browser of yours. Listed means the sign-in finishes by itself once the page is approved there; the paste stays open for a browser anywhere else. Empty or absent means nothing is watching.")
	}), pm = M({ variant: D().min(1).optional().describe("Which estate to sign in to. Absent takes the provider's default.") }), mm = M({
		handshake: D().min(1).describe("Which attempt this belongs to."),
		code: D().optional().describe("The code the sign-in page showed, for a paste sign-in."),
		redirectUrl: D().optional().describe("The address the browser was sent to, whole, for a redirect sign-in. The grant is inside it."),
		label: D().optional().describe("What to call the account. Blank derives one from the sign-in.")
	}), hm = M({ account: om.optional().describe("The account it connected, where the sign-in ends here. Absent means keep watching the account list.") }), gm = P("status", [
		M({ status: L("wait") }),
		M({
			status: L("ok"),
			account: om.optional().describe("The account it connected. Absent where the row lands in the account list a little later.")
		}),
		M({
			status: L("error"),
			error: D().min(1).describe("Why it failed, to show as it is.")
		})
	]), _m = M({ handshake: D().min(1).describe("Which attempt.") }), vm = M({ handshake: D().min(1).describe("Which attempt to stop waiting on.") }), ym = M({
		url: D().describe("The page to open."),
		code: D().describe("The one-time code, where the provider uses one."),
		state: D().min(1).describe("The handshake's id, which status reads and the finishing call sends back."),
		flow: I(["device", "redirect"]).describe("Which shape this is. A device sign-in finishes by itself and you poll the attempt; a redirect needs the address it landed on handed back. Said outright rather than guessed at from whether a code happens to exist."),
		catchers: j(nm).optional().describe("Who is watching for where the browser lands, on the machine it is on: a device or a browser of yours. Listed means the sign-in finishes by itself once the page is approved there; the paste stays open for a browser anywhere else. Empty or absent means nothing is watching.")
	}), bm = P("status", [
		M({ status: L("wait") }),
		M({ status: L("ok") }),
		M({
			status: L("error"),
			error: D().min(1)
		})
	]), xm = M({
		provider: im.describe("Which provider."),
		redirectUrl: D().min(1).describe("The address the browser was sent to, whole. The grant is inside it."),
		state: D().min(1).describe("The handshake this belongs to. A mismatch is refused.")
	}), Sm = I(["reasoning", "fast"]), Cm = I(["no-tool-calls", "instant-tier"]), wm = M({
		id: D().describe("What to name when asking for this model."),
		label: D().describe("What to call it on screen."),
		efforts: j(D()).optional().describe("The thinking levels it accepts, where the provider says. Empty means use your own defaults."),
		description: D().optional().describe("What it is good for, in the provider's own words. Absent where the provider publishes only ids, which is the honest answer rather than something to paper over with a hand-written table."),
		badges: j(Sm).optional().describe("What it is known for, where the provider says so."),
		contextWindow: k().optional().describe("How many tokens this model will accept in one request, where the server publishes it."),
		helperOnly: Cm.optional().describe("Set where this model may write commit messages, titles and other one-shot jobs but never run a chat turn, and why: its server says it cannot call tools, or it is the small local model kept for quick jobs. Absent means nothing has said it cannot."),
		availableAt: k().optional().describe("When this model can be asked again, where every credential that serves it is currently refused. Absent means it can be asked now. A model here is still worth showing, unlike one the plan does not cover at all: the wait is the whole answer.")
	}), Tm = M({
		models: j(wm).describe("What this provider serves, in its own preference order, which is not rearranged here. Never empty."),
		default: D().describe("Which one a fresh conversation starts on. Always present.")
	});
})), q, Dm, Om, J, Y = v((() => {
	V(), q = M({ ok: L(!0).describe("Always true. A route that answers this either did the thing or refused with a status; there is no third outcome to report.") }), Dm = I([
		"guest",
		"viewer",
		"collaborator",
		"writer",
		"maintainer",
		"owner"
	]), I([
		"guest",
		"viewer",
		"collaborator",
		"writer",
		"maintainer"
	]), Om = M({ token: D().min(1).describe("The freshly minted credential. The previous one stopped working the moment this answered.") }), J = M({ repo: D().describe("Which repository. \"root\" is the workspace itself; anything else is a repository's folder relative to the workspace root, URL-encoded.") });
})), km, Am = v((() => {
	W(), K(), Em(), Y(), km = {
		start: U.route({
			method: "POST",
			path: "/accounts/{provider}/login/start",
			summary: "Begin connecting an account",
			description: "Hands back the page to sign in on, and the code it will ask for where there is one. The sandbox holds the proof and finishes what it can itself: a device sign-in lands in the account list on its own, a paste or a redirect needs one thing brought back to the finishing call."
		}).input(Ud.extend(pm.shape)).output(fm),
		complete: U.route({
			method: "POST",
			path: "/accounts/{provider}/login/complete",
			summary: "Finish a sign-in with what the page handed back",
			description: "Takes the code the page showed, or the address a redirect landed on, and finishes the attempt. Answers with the account where the exchange ends here; otherwise the sandbox still has a mint to do and the row appears in the account list."
		}).input(Ud.extend(mm.shape)).output(hm),
		status: U.route({
			method: "GET",
			path: "/accounts/{provider}/login/status",
			summary: "Read a sign-in attempt",
			description: "Whether this exact attempt is still waiting, has connected an account, or failed. Tied to the attempt, not to the account list, so adding a second account is told apart from the first already being there. An attempt that finishes by itself on a device or browser of yours ends here."
		}).input(Ud.extend(_m.shape)).output(gm),
		cancel: U.route({
			method: "POST",
			path: "/accounts/{provider}/login/cancel",
			summary: "Abandon a sign-in",
			description: "Stops waiting on a sign-in nobody completed. An abandoned attempt also expires on its own."
		}).input(Ud.extend(vm.shape)).output(q),
		accounts: U.route({
			method: "GET",
			path: "/accounts/{provider}",
			summary: "Connected accounts of a provider",
			description: "Each connected account with how full its plan limits were when last measured, where the provider publishes any. Ask for a fresh measurement and it takes one before answering, which is slower. The credentials themselves never travel: being in this list is what connected means."
		}).input(Ud.extend(cm.shape)).output(sm),
		rename: U.route({
			method: "POST",
			path: "/accounts/{provider}/rename",
			summary: "Rename an account",
			description: "Changes the label one account shows under, so several are tellable apart. Blank restores the one derived from the sign-in."
		}).input(Ud.extend(um.shape)).output(om),
		disconnect: U.route({
			method: "POST",
			path: "/accounts/{provider}/disconnect",
			summary: "Disconnect an account",
			description: "Clears one stored credential, and stops any sign-in still in flight for this provider. The others stay connected."
		}).input(Ud.extend(lm.shape)).output(q)
	};
})), jm, Mm, Nm, Pm, Fm, Im = v((() => {
	V(), K(), jm = M({
		id: D().describe("The entry's own id."),
		at: k().describe("When it happened, in milliseconds. Also what you page by."),
		provider: D().optional().describe("Which outside service, when one was involved. Absent for the sandbox's own events."),
		account: D().optional().describe("Which account handled it. Absent for the sandbox's own events and for work run on a provider's default."),
		direction: I([
			"in",
			"out",
			"system"
		]).describe("Whether something arrived, something went out, or the sandbox did it to itself."),
		type: D().describe("Exactly what happened: a message received or sent, a reaction, a turn starting or ending, a rule doing something. A rule that ran and passed says nothing here, because a feed of passes is one the eye learns to skip."),
		channelId: D().optional().describe("Which channel or thread it happened in."),
		author: D().optional().describe("Who sent it, for something that arrived."),
		actor: D().optional().describe("Who asked for the turn, as the sandbox verified it: a member's email, token:<label> for a program's control token, or agent:<conversation id> for a parent conversation's child. Absent for a wake nothing asked for."),
		content: D().optional().describe("The message, in full, whichever direction it went."),
		method: D().optional().describe("The verb of an outgoing call."),
		endpoint: D().optional().describe("The address of an outgoing call. Credentials travel in headers, so they are never here."),
		sessionId: D().optional().describe("The provider session behind it."),
		turnId: D().optional().describe("Ties one turn's entries together. A turn writes several, and read as separate rows they say one thing several times, so a feed groups on this."),
		conversationId: D().optional().describe("Which conversation. This, rather than the provider session, is what the same agent means across a feed, because a session is retired whenever the model changes."),
		title: D().optional().describe("What that conversation was called at the time. Copied in rather than looked up, because an audit entry must still read as words years later, after the conversation has been renamed or pruned."),
		origin: Jd.optional().describe("What woke the conversation from outside, when something did. It is how a turn gets filed under the chat service that caused it rather than under the model that served it."),
		automationIds: j(D()).optional().describe("Which automations were involved."),
		outcome: I(["ok", "error"]).optional().describe("How it ended."),
		error: D().optional().describe("What went wrong, when something did."),
		extra: F(D(), wl()).optional().describe("Whatever else the source had to say: attachments, participants, a recording's path. Shape varies by source.")
	}), Mm = M({
		provider: D().optional().describe("Narrow it to one outside service."),
		limit: B().min(1).max(500).default(100).describe("How many entries to return."),
		before: B().optional().describe("Only entries older than this timestamp, so paging walks backwards through the feed.")
	}), Nm = M({ events: j(jm).describe("The audit entries, newest first.") }), Pm = M({
		capabilityId: D().describe("Which connection."),
		provider: D().describe("Which service it is."),
		gateway: I([
			"ready",
			"connecting",
			"pairing",
			"disconnected",
			"idle"
		]).describe("Idle means it is up but has nothing to listen for, which is different from a connection that should be up and is not. Pairing means somebody started a sign-in and never finished it, which no amount of waiting will fix."),
		lastError: D().optional().describe("The most recent thing that went wrong on it.")
	}), Fm = M({
		connections: j(Pm).describe("Each source feeding the record, and whether it is working. Probed now rather than remembered."),
		voice: M({
			channelId: D().describe("Which channel."),
			channelName: D().describe("What it is called."),
			startedAt: k().describe("When it joined, in milliseconds."),
			participants: j(D()).describe("Who else is in it.")
		}).optional().describe("A voice call the sandbox is currently in, when it is in one.")
	});
})), Lm, Rm = v((() => {
	W(), Im(), Lm = {
		list: U.route({
			method: "GET",
			path: "/activity",
			summary: "What the agent has done out in the world",
			description: "The audit trail of actions taken on outside services. Read-only on purpose: entries are written by the sandbox alone, which is what makes it a record worth trusting."
		}).input(Mm).output(Nm),
		status: U.route({
			method: "GET",
			path: "/activity/status",
			summary: "Whether the audit trail is being kept",
			description: "Which sources are feeding the record and whether each is working."
		}).output(Fm)
	};
})), zm = v((() => {})), Bm = v((() => {})), Vm, Hm = v((() => {
	Vm = [
		{
			id: "free",
			name: "Free",
			cpuKind: "shared",
			cpus: 4,
			memoryMb: 4096,
			volumeGb: 10,
			monthlyHours: 40,
			priceUsd: 0,
			flyHourUsd: .0329
		},
		{
			id: "standard",
			name: "Standard",
			cpuKind: "shared",
			cpus: 8,
			memoryMb: 8192,
			volumeGb: 25,
			monthlyHours: 220,
			priceUsd: 20,
			flyHourUsd: .0657
		},
		{
			id: "max",
			name: "Max",
			cpuKind: "shared",
			cpus: 8,
			memoryMb: 16384,
			volumeGb: 50,
			monthlyHours: 320,
			priceUsd: 50,
			flyHourUsd: .1234
		}
	], Vm[0], Vm.filter((e) => e.priceUsd > 0);
})), Um = v((() => {})), Wm, Gm, Km, qm, Jm, Ym = v((() => {
	zm(), Bm(), Hm(), Um(), Wm = "/history", Gm = ".intentic", Km = "public", qm = ".intentic/config/field-notes.toon", Jm = "481795963975-cq9msl6higcd91joidrfp8mjlkuq5fk3.apps.googleusercontent.com", `${Jm}`;
})), Xm, Zm, Qm, $m, eh = v((() => {
	V(), Xm = /^[a-zA-Z_][a-zA-Z0-9_]{0,39}$/, Zm = M({
		name: D().regex(Xm),
		type: I([
			"string",
			"number",
			"boolean",
			"string[]"
		]),
		description: D().min(1),
		required: A()
	}), Qm = (e) => {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		for (let r of e) t.has(r.name) && n.add(r.name), t.add(r.name);
		return [...n];
	}, $m = j(Zm).min(1).max(16).superRefine((e, t) => {
		for (let n of Qm(e)) t.addIssue({
			code: "custom",
			message: `Output field names must be unique; "${n}" is repeated.`
		});
	});
})), th, nh, rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh = v((() => {
	V(), Ym(), eh(), K(), Vd(), th = I(["fresh", "continue"]), nh = P("kind", [
		M({ kind: L("none").describe("It produces nothing but its work. The classic make the suite pass: what it leaves behind is a passing suite, and asking it to also file a report is asking it to spend a round on paperwork.") }),
		M({ kind: L("claim").describe("Each round says whether it is done and why. Structured prose: done is a value read rather than a sentence interpreted. Self-assessment, so advisory by construction; it exists because plenty of goals have no command that could check them.") }),
		M({
			kind: L("json").describe("Each round writes a real answer in a shape you declared. This is the one that makes a step's output usable as the next step's input: a paragraph mentioning three files cannot be fed to anything, a list of three files can."),
			fields: $m.describe("The shape that answer has to match.")
		})
	]), rh = P("kind", [M({
		kind: L("command").describe("Run something and see if it passes. Deterministic, free, and the only signal here whose answer does not come from a model. A passing test suite beats any amount of self-report."),
		command: D().min(1).describe("The command to run in the conversation's own tree. Exiting cleanly means satisfied.")
	}), M({
		kind: L("judge").describe("Put the question to a separate model with no tools, which reads the round's own report and rules on it, having done none of the work and nothing invested in its being finished."),
		rubric: D().min(1).describe("What that judge is asked."),
		model: D().optional().describe("Which model judges. Leave it out for the cheap one the other small jobs use.")
	})]), ih = M({
		done: A().describe("Whether the goal is met. Reading this is the whole point of the file."),
		reason: D().describe("Why, in one line. The most-read sentence in the feature: the next round reads it first and the history shows it."),
		evidence: D().optional().describe("What was checked to know that. Optional, so a round with nothing to point at says so by leaving it out rather than by inventing a sentence."),
		data: F(D(), wl()).optional().describe("The declared answer, for a loop that asked for one, checked against the shape it declared.")
	}), ah = 50, oh = M({
		conversationId: qd.describe("The conversation to loop. It need not exist yet: naming a fresh one opens it, which is what lets run this until it passes be the first thing you ever say."),
		goal: D().min(1).describe("What done means, in your words. It goes into every round's instructions and into the judge's question, so the model is told the bar rather than left to infer it."),
		prompt: D().min(1).describe("What each round is asked to do. The suite passes is the goal; run the tests, take the top failure, fix it is the instruction."),
		context: th.describe("How each round meets the last. Starting fresh makes the files the memory rather than the conversation, so the twentieth round reads the tree as clearly as the first, and costs a re-read each time. Carrying on is cheaper and keeps the reasoning, which suits a short polish-this loop and degrades on long ones: a session that has spent eleven rounds arguing for its own approach is the worst available judge of whether that approach is finished."),
		output: nh,
		checks: j(rh).describe("What else has to be true, all of them together. A list because the suite passes and the report is written is a real bar, and running it as two loops would do the work twice."),
		maxIterations: k().int().min(1).max(ah).describe("How many rounds before it gives up. A loop that has not got there in fifty is not one round short of it."),
		maxSpendUsd: k().positive().optional().describe("A ceiling on what the whole loop may spend, in dollars. Optional for a short loop somebody is watching, and strongly wanted otherwise: this is the first thing here that can keep spending with nobody pressing anything between rounds."),
		stallLimit: k().int().min(1).describe("Stop after this many rounds in a row that changed nothing on disk. The guard that matters most: a loop's failure is not runaway success, it is an agent re-reading the same three files, restating the same plan and declaring more work remains, eleven times. Every one of those rounds succeeds, so only the tree not moving catches it."),
		isolated: A().describe("Whether it works in the conversation's own private copy or in the shared tree. It also decides where a check runs: testing the shared tree would be testing code this loop has not merged yet."),
		agent: Hd.optional().describe("Which provider the rounds run on. Absent falls back to the conversation's own last choice."),
		harness: Wd.optional().describe("Which agentic loop they run on."),
		account: D().optional().describe("Which account pays."),
		model: D().optional().describe("Which model."),
		actsAs: G.optional().describe("Which persona the rounds act as. It matters here: every round is unwatched, and an unwatched turn naming no persona reaches no signed-in account at all, so pinning one is how a loop gets hands."),
		worktreeBase: j(Gd).min(1).max(50).optional().describe("Pin the private copy to these exact commits, so a restart cannot quietly change what the loop is working on."),
		autoLand: A().optional().describe("Whether the work merges as it goes.")
	}), `${Gm}`, sh = M({
		n: k().int().min(1).describe("Which round this was."),
		at: k().describe("When it ran, in milliseconds."),
		outcome: I([
			"continue",
			"done",
			"error"
		]).describe("How the round ended, which is not the same question as how the loop did. A round that errored does not end the loop by itself: a failing turn is often exactly what the next round is meant to fix."),
		detail: D().optional().describe("What the check said, in its own words. What a run history is actually read for: why it kept going, and why it stopped."),
		costUsd: k().optional().describe("What the round cost, in dollars."),
		changed: A().describe("Whether anything on disk moved. Three unchanged rounds in a row is the shape of a loop that is not working."),
		sessionId: D().optional().describe("The session it ran on, and the way from a history row to a readable record.")
	}), ch = I([
		"running",
		"done",
		"exhausted",
		"stalled",
		"overspent",
		"stopped",
		"error",
		"unpriced"
	]), lh = oh.extend({
		state: ch.describe("How it ended, and each of these is a different thing to be told. Out of rounds says give it more room; stalled says it is not making progress and more room will not help. Overspent, stopped by a person, and the loop itself failing are all their own answers."),
		startedAt: k().describe("When it began, in milliseconds."),
		endedAt: k().optional().describe("When it ended, in milliseconds."),
		resumed: k().int().min(0).describe("How many times the sandbox restarted under it and picked it back up. Counted rather than flagged, so a loop whose round reliably kills the sandbox is not resurrected on every boot for ever."),
		detail: D().optional().describe("Why it ended, for the endings whose reason is not in their name."),
		iterations: j(sh).describe("Every round, in order. Why it stopped at the fourth is the question a loop gets read for, and this is the answer.")
	}), uh = M({ loops: j(lh).describe("Every loop this workspace has run, newest first, kept after they end.") }), dh = M({ conversationId: qd.describe("Which conversation's loop.") }), fh = M({
		id: G.describe("The design's id."),
		name: D().min(1).max(60).describe("What to call it. Short, because it has to be readable on a small badge."),
		description: D().max(280).optional().describe("What it is for, in one line. Optional, because a well-named loop has already said it."),
		prompt: D().optional().describe("What each round is asked to do, when that is worth saying separately from the goal. Absent means each round works towards the goal however it sees fit."),
		context: th.describe("How each round meets the last: starting clean, or carrying on."),
		output: nh.describe("What it has to produce."),
		checks: j(rh).describe("What else has to be true."),
		maxIterations: k().int().min(1).max(ah).describe("How many rounds before it gives up."),
		maxSpendUsd: k().positive().optional().describe("A ceiling on what it may spend, in dollars."),
		stallLimit: k().int().min(1).describe("Stop after this many rounds in a row that changed nothing.")
	}), ph = M({ designs: j(fh).describe("Saved loops: the machinery with the goal left out, so one design can be pointed at a different job every time.") }), mh = M({
		design: fh.describe("The design to write."),
		create: A().describe("Whether you mean to make a new one or replace an existing one, so an id that happens to collide cannot silently overwrite the one you had.")
	}), hh = M({ id: G.describe("Which saved loop.") });
})), _h, vh, yh, bh, xh, Sh, Ch, wh = v((() => {
	V(), _h = I([
		"limit",
		"outage",
		"stopped"
	]), vh = I([..._h.options, "flagged"]), yh = I([
		"wait",
		"resend",
		"move"
	]), bh = I(["wait", "retry"]), xh = I([
		"wait",
		"resend",
		"move",
		"retry"
	]), Sh = [
		5e3,
		15e3,
		45e3
	], Sh.length, Ch = M({
		made: k().int().min(0).describe("Automatic re-runs already sent for this turn."),
		max: k().int().min(1).describe("How many the ladder may send before it stands down.")
	});
})), Th, Eh, Dh, Oh, kh, Ah = v((() => {
	V(), Th = I([
		"elapsed",
		"allowance",
		"changed",
		"cold",
		"failed"
	]), Eh = M({
		since: k().describe("When keeping it warm started, in milliseconds."),
		until: k().describe("When it stops by itself, in milliseconds: the time asked for, shortened to what the sandbox can honestly keep, which is never past the point where refreshing costs more than re-reading, nor past the date change that rewrites the prompt."),
		refreshes: k().int().min(0).describe("Refreshes sent so far."),
		readTokens: k().optional().describe("How much the last refresh read back from the provider's cache, in tokens: the proof the cache was still there."),
		ended: M({
			at: k().describe("When it stopped, in milliseconds."),
			reason: Th.describe("Why: `elapsed` the time asked for ran out; `allowance` the account reached the reserve kept for real work, or the provider refused a refresh for its limit; `changed` what the next turn would send no longer matches the cache (a part of the prompt, the date in it, or the conversation's session or account); `cold` the cache was gone, expired before a refresh could run or found missing by one; `failed` a refresh failed."),
			detail: D().optional().describe("The specifics, when there are any: which parts of the prompt changed, how full the account was, or the failure's own words.")
		}).optional().describe("Why keeping it warm stopped before anyone picked the conversation up. Absent while it is still being kept.")
	}), Dh = M({
		id: D().min(1).describe("Which conversation."),
		until: k().nullable().describe("Keep its prompt cache warm until this instant, in milliseconds; shortened to what the sandbox can honestly keep. Null stops keeping it warm.")
	}), Oh = M({
		readTokens: k().describe("Tokens the turn's first request read from the provider's cache."),
		writtenTokens: k().describe("Tokens it wrote to the cache, which is what it paid full price for."),
		kept: M({
			forMs: k().describe("How long the cache had been kept warm for this turn, in milliseconds."),
			refreshes: k().int().min(0).describe("How many refreshes that took.")
		}).optional().describe("Present when this turn picked up a conversation the sandbox had been keeping warm.")
	}), kh = M({
		hash: D().describe("One short hash over every part."),
		parts: F(D(), D()).describe("Each part's own short hash or value, by name.")
	});
})), jh, Mh, Nh, Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh, Gh, Kh, qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg = v((() => {
	V(), jh = [
		"capability",
		"secret",
		"grant",
		"release",
		"environment"
	], Mh = I(jh).describe("What is being asked for: a connection, a secret's value, wider reach, a gated credential, or a tool in the image."), Nh = I([
		"open",
		"working",
		"met",
		"declined",
		"cancelled"
	]).describe("Where it stands: open (waiting on a person), working (a person said yes and it is being set up), met, declined, or cancelled (the agent withdrew it, or its conversation went away)."), Ph = F(D(), D()), Fh = I([
		"connect",
		"reconnect",
		"change"
	]).describe("Connect something new, give a connected one a credential that works again, or change a setting on a connected one."), Ih = M({
		kind: L("capability"),
		entry: D().min(1).describe("The catalog entry, as the catalog names it."),
		name: D().describe("What the catalog calls it, never the agent's spelling."),
		mode: Fh,
		instance: D().optional().describe("The connection a reconnect or a change is about."),
		target: D().optional().describe("The site, host or address the connection is for, when the entry can hold several."),
		prefill: Ph.optional().describe("Settings the agent could fill in for a new connection, never a credential: the daemon keeps only the entry's own non-secret fields."),
		changes: Ph.optional().describe("For a change: each setting and the value it would take. Never a credential."),
		reason: D().optional().describe("The daemon's own sentence on why this is the ask, such as the refusal a connected credential keeps getting."),
		reported: A().optional().describe("The agent reported the credential refused while the connection still probes as working, so only a person's word that it is fixed meets it: the probe could not see the refusal in the first place.")
	}), Lh = /^[A-Za-z_][A-Za-z0-9_]{0,127}$/, Rh = M({
		kind: L("secret"),
		name: D().regex(Lh).describe("The name it is stored under, and what `{{secret:NAME}}` will resolve."),
		where: D().max(200).optional().describe("How it will be used: the header, the command, the site it goes to."),
		link: D().url().refine((e) => e.startsWith("https://"), "only an https link").optional().describe("Where a person gets one, shown as a link on the card."),
		hint: D().max(120).optional().describe("What a valid one looks like, so a wrong paste is caught by eye."),
		replace: A().optional().describe("One is stored under this name and is being refused: the ask is for a new value in its place.")
	}), zh = I([
		"capability",
		"folder",
		"shelf",
		"site"
	]).describe("A connected capability the persona leaves out, a folder outside the conversation's reach, a whole shelf of tools, or a site in the person's own browser, which only their browser extension can allow."), Bh = [
		"files",
		"shell",
		"code",
		"web",
		"browser",
		"delegate",
		"sandbox"
	], Vh = I(Bh), Hh = I(["conversation", "persona"]).describe("How far a yes goes: this conversation only, or the persona itself, for every conversation that wears it."), Uh = M({
		kind: L("grant"),
		subject: zh,
		what: D().min(1).describe("The capability's id, the folder, or the shelf."),
		label: D().describe("What it is, in the daemon's words: the account and its kind, the folder, the shelf's name."),
		persona: D().optional().describe("The persona that withholds it, when one does."),
		scope: Hh.optional().describe("How far the yes went, once there was one.")
	}), Wh = M({
		kind: L("release"),
		subject: D().min(1).describe("The gated account or connector."),
		approvers: j(D()).describe("Who may release it. Anyone else's answer is refused and leaves it waiting.")
	}), Gh = M({
		kind: L("environment"),
		tool: D().min(1).describe("What the steps install, the name the proposal is filed under."),
		steps: D().min(1).describe("The Dockerfile steps proposed for the image's custom section: RUN and ENV lines only."),
		approvedHash: D().optional().describe("The overlay these steps were approved into; met once the running container was built from it.")
	}), Kh = P("kind", [
		Ih,
		Rh,
		Uh,
		Wh,
		Gh
	]).describe("What exactly is asked for."), qh = I([
		"call",
		"turn",
		"queued"
	]), Jh = M({
		id: D().describe("The need's handle, the one `needs cancel` takes."),
		conversationId: D().describe("The conversation that asked, and the one its answer wakes."),
		subject: Kh,
		title: D().describe("The one line it leads with, in the daemon's words."),
		why: D().max(280).optional().describe("The agent's case for it, and the only words on a need that are the agent's."),
		status: Nh,
		createdAt: k().describe("When it was raised, in milliseconds."),
		updatedAt: k().describe("When it last moved, in milliseconds."),
		answeredBy: D().optional().describe("Who answered it, as the sandbox verified them."),
		outcome: D().optional().describe("How it ended, in the daemon's words, once it has."),
		told: qh.optional().describe("How the agent heard the outcome, once it has."),
		unattended: A().optional().describe("Raised by a turn nobody was watching, so the card waited for whoever came next.")
	}), Yh = P("kind", [
		M({
			kind: L("capability"),
			entry: D().min(1).describe("The catalog entry or a connected instance's id."),
			target: D().max(200).optional().describe("The site, host or address it is for."),
			set: Ph.optional().describe("Settings to fill in, or to change on a connected one. Credentials are refused."),
			reconnect: A().optional().describe("It is connected, but its credential is being refused: ask for a new one rather than being told to use it.")
		}),
		Rh,
		M({
			kind: L("grant"),
			subject: zh,
			what: D().min(1).max(400)
		}),
		M({
			kind: L("release"),
			subject: D().min(1)
		}),
		M({
			kind: L("environment"),
			tool: D().min(1).max(64),
			steps: D().min(1).max(2e4)
		})
	]), Xh = M({
		ask: Yh,
		why: D().max(280).optional(),
		wait: k().int().min(0).max(100).optional().describe("Seconds to hold the call for an answer. Absent is 90 for a watched turn and 0 for an unattended one.")
	}), Zh = M({
		state: I([
			"met",
			"open",
			"refused"
		]),
		message: D().describe("The sentence the CLI prints, written for the agent to act on."),
		need: Jh.optional(),
		code: D().optional().describe("A refusal's type, for a script to branch on.")
	}), Qh = P("kind", [
		M({
			kind: L("decline"),
			note: D().max(500).optional().describe("Why not, passed to the agent.")
		}),
		M({ kind: L("accept") }),
		M({ kind: L("apply") }),
		M({
			kind: L("grant"),
			scope: Hh
		}),
		M({ kind: L("release") }),
		M({ kind: L("approve") })
	]), $h = M({ id: D().min(1).describe("Which need.") }), eg = $h.extend({ answer: Qh }), tg = $h.extend({ value: D().min(1).max(64e3).describe("The secret's value. Stored, never echoed, never written into a transcript.") }), ng = M({
		conversationId: D().optional().describe("One conversation's needs. Absent is every conversation's."),
		open: A().optional().describe("Only the ones still waiting.")
	}), rg = M({ needs: j(Jh).describe("Newest first.") }), M({
		entries: j(M({
			entry: D().describe("The catalog entry's id, what `capabilities request` takes."),
			name: D(),
			description: D(),
			connected: A().describe("Whether an instance of it is live, not merely added.")
		})),
		suggested: j(M({
			entry: D(),
			claim: D().describe("What the workspace seems to want, in words."),
			evidence: D().describe("What was read to say so, verbatim: a file, a remote.")
		})).default([])
	}), ig = M({
		id: D(),
		kind: Mh,
		title: D(),
		status: Nh
	}), M({
		capabilities: j(D()).default([]).describe("Connected capabilities it may use although its persona leaves them out."),
		folders: j(D()).default([]).describe("Workspace folders its file tools may touch beyond its fence."),
		shelves: j(Vh).default([]).describe("Shelves of tools opened for it."),
		installs: A().default(!1).describe("Whether its own dependency installs run without asking, where the owner's setting would otherwise ask first."),
		secrets: j(D()).default([]).describe("Secrets whose host guard it may send past without asking, by registry name."),
		everything: A().default(!1).describe("Whether every request an allow-once could settle is allowed without asking, until somebody takes it back."),
		updatedAt: k().describe("When it last changed, in milliseconds."),
		by: D().optional().describe("Who last allowed something here.")
	}), ag = M({ conversations: j(M({
		conversationId: D(),
		capabilities: j(D()).describe("Connected capabilities allowed although its persona leaves them out."),
		folders: j(D()).describe("Workspace folders its file tools may touch beyond its fence."),
		shelves: j(Vh).describe("Shelves of tools opened for it."),
		installs: A().default(!1).describe("Whether its own dependency installs run without asking."),
		secrets: j(D()).default([]).describe("Secrets it may send past their host guard without asking."),
		everything: A().default(!1).describe("Whether every request an allow-once could settle is allowed without asking."),
		by: D().optional().describe("Who last allowed one of those."),
		updatedAt: k().optional().describe("When one of those last changed, in milliseconds."),
		releases: j(M({
			subject: D(),
			approvedBy: D(),
			at: k()
		})).describe("Gated credentials released to it, until somebody takes one back.")
	})) }), og = M({
		conversationId: D(),
		kind: I([
			"capability",
			"folder",
			"shelf",
			"release",
			"install",
			"secret",
			"everything"
		]).describe("Which kind of yes: a grant past the persona or area, a credential's release, letting its installs run unasked, a secret sent past its host guard, or allowing everything."),
		what: D().describe("The capability id, folder, shelf, released credential or secret it named; empty for installs and everything.")
	}), F(D(), Jh);
})), cg, lg, ug, dg = v((() => {
	cg = new Intl.Segmenter(void 0, { granularity: "grapheme" }), lg = /[\p{Extended_Pictographic}\p{Regional_Indicator}\u{20E3}]/u, ug = (e) => {
		if (e.length === 0 || e.length > 64 || !lg.test(e)) return !1;
		let t = cg.segment(e)[Symbol.iterator]();
		return t.next().done !== !0 && t.next().done === !0;
	};
})), fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, X, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg, Ig, Lg, Rg, zg, Bg, Vg, Hg, Ug, Wg, Gg, Kg, qg, Jg, Yg, Xg, Zg, Qg, $g, e_ = v((() => {
	V(), K(), gh(), wh(), Ah(), sg(), dg(), fg = I([
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
	]), pg = M({
		tool: D().optional().describe("The last tool it reached for."),
		target: D().optional().describe("What it reached for that tool with: a file, a command, a URL."),
		todo: D().optional().describe("The item on its own list that it is working through.")
	}), mg = M({
		done: k().describe("Items it has completed."),
		total: k().describe("Items on the list. Never zero: a conversation that kept no list carries no clause at all.")
	}), hg = M({
		plan: A().describe("It has proposed a plan and is waiting for a yes."),
		question: A().describe("It has asked you something."),
		permission: A().describe("It wants to use a tool it needs permission for."),
		capability: A().describe("It needs something connected that is not connected yet."),
		credential: A().describe("It is waiting for a named person to release a credential. The one pause that may not be yours to clear, whatever your role."),
		conflict: A().describe("Its work cannot be merged without somebody resolving a clash."),
		need: A().optional().describe("It asked a person for something it still needs: a connection, a secret, wider reach, a tool. Absent from a daemon older than needs.")
	}), gg = M({
		at: k().describe("When the turn that left this ended, in milliseconds."),
		steps: M({
			open: k().describe("Items on it that were never completed."),
			total: k().describe("Items on the whole list."),
			next: D().optional().describe("The one it would have done next: what it was working through, or the first still waiting.")
		}).optional().describe("The agent's own checklist where that turn left it. Absent for a conversation that kept no list."),
		check: D().optional().describe("The end-of-turn check that was still failing when the turn ended, by name. No longer written: nothing checks inside a turn.")
	}), _g = M({
		at: k().describe("When the turn that left this ended, in milliseconds."),
		verification: I([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Verified: a check it ran passed after its last edit to code. Failing: the last one it ran failed. Unproven: it changed code and ran nothing that checked it. No-code: it changed nothing a check could speak to."),
		check: D().optional().describe("The command that spoke, when one did, so a targeted test is never read as the whole suite."),
		unviewed: k().optional().describe("How many rendered files it changed (pages, components, styles) without looking at the result afterwards. Absent when none.")
	}), vg = M({
		subject: D().describe("One line saying what the merged work did, read off the code rather than off the opening request. A conversation that asks for an audit and then spends four turns fixing what it found needs a subject about the fixes."),
		note: D().optional().describe("The same change said to somebody who uses the product, for a repository that keeps a changelog. Usually absent, because most changes are not ones a user would notice."),
		breaking: D().optional().describe("What this change takes away, for anything already relying on it. Nearly always absent: it is for removals, not for additions."),
		testNote: D().optional().describe("Why a test this change weakened is meant to be weaker, in the conversation's own words. Nearly always absent."),
		allows: j(D()).optional().describe("Exceptions the conversation declared for this change, each `<check> — <reason>` in its own words. Nearly always absent.")
	}), yg = M({
		provider: D().min(1).describe("Which provider was asked."),
		model: D().min(1).describe("Which of its models."),
		status: I([
			"asking",
			"answered",
			"refused",
			"skipped"
		]).describe("How this one went. Skipped means it was not asked at all, because it refused a few minutes ago and the walk stepped over it."),
		at: k().optional().describe("When it started being asked, in milliseconds. Absent for one that was skipped, which cost no time."),
		ms: k().optional().describe("How long it took. Absent while it is still being asked."),
		reason: D().optional().describe("Why it refused, in its own words.")
	}), bg = M({
		startedAt: k().describe("When the drafting began, in milliseconds."),
		steps: j(yg).describe("Each model that was asked, in the order they were spent, so the list is the timeline. Empty with no outcome means the diff is still being read."),
		outcome: I(["written", "failed"]).optional().describe("How it ended. Absent means it is still going."),
		reason: D().optional().describe("The one-line account of a failure, for a screen with one line to spend. The steps carry each model's own words."),
		finishedAt: k().optional().describe("When it ended, in milliseconds.")
	}), xg = I([
		"workspace",
		"diverged",
		"binary"
	]), Sg = M({
		email: D().describe("Who it was, as the sandbox verified them."),
		name: D().optional().describe("What to call them, when their sign-in carried a name. Absent leaves the address to stand for them."),
		at: k().describe("When they marked it, in milliseconds.")
	}), Cg = M({
		email: D().describe("Who answers for this conversation, as the sandbox verified them."),
		name: D().optional().describe("What to call them, when the sign-in that made them its owner carried a name. Absent leaves the address to stand for them."),
		since: k().describe("When they became its owner, in milliseconds.")
	}), wg = M({
		emoji: D().describe("The mark itself, one emoji, carried as the character rather than as a name that would need a table on both sides."),
		by: j(Sg).min(1).describe("Everyone wearing this mark, oldest first, each by name. Carried whole rather than as a count, because a chip reading 3 that cannot say whose is a number nobody can answer. Never empty: the last person taking theirs back takes the whole chip with it.")
	}), X = M({
		id: D().describe("The conversation id, which is how every other call addresses it."),
		sessionId: D().optional().describe("The provider session behind the last turn. It is retired whenever the model or account changes."),
		title: D().optional().describe("What to call it: the first prompt cut to one line, unless somebody renamed it."),
		titleAction: D().optional().describe("One word for the kind of work the naming pass read in it (fix, audit, redesign). Never part of the displayed name: a board tints and glyphs a card by it. Absent for a title nothing named an action for."),
		status: fg.describe("What it is doing. Stopping and stopped are the two halves of somebody pressing stop, because a cancel is not instant; dismissing is the same window for a question waved away, which ends the turn too but owes the user nothing; resuming means the sandbox is already putting right whatever killed the turn; landing means its work is being carried into the workspace right now, and nothing may act on its branch until that settles."),
		failure: D().optional().describe("Why the last turn failed, in the words it died on. Absent unless it did, and cleared the moment it runs again. Carried here because the word error on its own is not an answer, least of all for a run nobody was watching."),
		failureCode: D().optional().describe("Which kind of failure it was, as the turn's own error frame coded it. Absent for a failure nothing could classify, which reads as the plain red line it is."),
		limitResetsAt: k().optional().describe("When the spent allowance reopens, in epoch seconds. Absent when the provider publishes no instant."),
		limitHeld: A().optional().describe("Whether the refused turn is held whole, so sending again re-runs it instead of appending to it."),
		limitScheduled: A().optional().describe("Whether the held turn is already booked to go again at the reset, so nobody has to press anything."),
		limitMoving: D().optional().describe("The account the held turn is being moved to by the owner's policy, while that move is booked."),
		provider: Hd.describe("Which model provider it runs on."),
		harness: Wd.describe("Which agentic loop it runs on."),
		runner: D().optional().describe("The runner this conversation runs on. Absent means this sandbox."),
		startIn: D().optional().describe("Which folder it opened in, relative to the workspace root. Absent means the root."),
		actsAs: D().optional().describe("Which persona its first turn acted as. Absent for an ordinary chat."),
		lastActsAs: D().optional().describe("Which persona its last turn acted as: each turn runs as the persona it names, so this is who the conversation speaks as now, and what a view groups it under. Absent for an ordinary chat."),
		model: D().optional().describe("What its last turn ran with. Kept per conversation so opening it restores the choices made in it, rather than whatever some other tab last picked."),
		effort: D().optional().describe("How hard that turn was told to think."),
		thinking: A().optional().describe("Whether that turn showed its reasoning."),
		fast: A().optional().describe("Whether that turn asked for higher speed. What was asked for, not what was served."),
		account: D().optional().describe("Which connected account paid for it."),
		branch: D().optional().describe("The branch its private copy works on. Absent for a conversation that works directly in the shared tree."),
		autoLand: A().optional().describe("This conversation's own answer to whether its work merges automatically. Absent means it follows the sandbox-wide setting, which is the common case."),
		limitPolicy: yh.optional(),
		outagePolicy: bh.optional(),
		stopPolicy: bh.optional(),
		landRequested: M({
			email: D().describe("Who asked."),
			name: D().optional().describe("Their display name."),
			at: k().describe("When they asked, in milliseconds.")
		}).optional().describe("A collaborator has asked a maintainer to merge this work. Cleared by whichever merge or discard answers it. Absent means nobody is waiting."),
		reactions: j(wg).optional().describe("What people have marked this conversation with, one entry per emoji, in the order the emoji were first used. Absent means nobody has marked it, which is most conversations."),
		origin: Jd.optional().describe("Where the conversation came from when nobody typed it: a chat mention, a visitor's message, a webhook. Absent means a person started it."),
		startedBy: D().optional().describe("Who asked for the first turn, as the sandbox verified it: a member's email, token:<label> for a program's control token, or agent:<conversation id> for a child another conversation spawned. Absent when nothing was verified (a wake, a loopback caller)."),
		areas: j(D()).optional().describe("Which named areas of the workspace this conversation was started within, latched from whoever asked for the first turn. Absent means its starter held the whole workspace, which is why a fenced member is not shown it."),
		owner: Cg.optional().describe("The member answerable for this conversation: set from whoever started it, inherited from the parent by a spawned child, moved by handing it over. Absent means nobody has claimed it yet."),
		forkedFrom: ef.optional().describe("The conversation this one was cut from. Recorded once and never cleared: it is the relationship, not a pending state."),
		base: D().optional().describe("The commit its private copy started from, shortened."),
		costUsd: k().optional().describe("What it has cost so far, in dollars. A subagent's spend is its own and is not folded in here."),
		inputTokens: k().optional().describe("Uncached input tokens, excluding cache reads and cache writes."),
		outputTokens: k().optional().describe("Tokens received."),
		contextTokens: k().optional().describe("How much of the window the conversation currently fills."),
		contextWindow: k().optional().describe("How large that window is."),
		promptCache: M({
			at: k().describe("When its last request touched the provider's prompt cache, in milliseconds."),
			ttlMs: k().describe("How long that entry lives from `at`, in milliseconds."),
			rollsAt: k().optional().describe("When the date written into the agent's prompt next changes, in milliseconds (midnight where the agent runs). Past it the next turn sends a different prompt, so nothing kept before it is read again."),
			keepableUntil: k().optional().describe("Present when this sandbox can keep this cache warm (its provider can replay the last turn's prefix): the furthest instant a hold can reach, in milliseconds, where refreshing would cost more than the cold resume it saves or the date in the prompt changes, whichever comes first.")
		}).optional().describe("When this conversation's prompt cache was last kept alive and how long it lasts, which together say when picking the conversation up stops being cheap. Absent when the provider publishes nothing to ground it on."),
		keepWarm: Eh.optional().describe("Whether the sandbox is keeping this conversation's prompt cache warm while it sits idle, how that is going, or why it stopped. Absent when nobody asked for it."),
		activity: pg.optional().describe("What it is doing at this moment."),
		checklist: mg.optional().describe("How far it is through its own checklist. Absent for a conversation that kept no list, which is most short ones."),
		landedMessageDraft: bg.optional().describe("The whole story of this merge's commit message being written: which models were asked, how long each took, what refused and in what words. Forgotten on restart, which is right, because a restart also killed the drafting it describes."),
		landedMessage: vg.optional().describe("What this conversation's merged work is called, once the drafting above has finished. It arrives on the same push that ends the draft, so the promise and the answer travel together."),
		startedAt: k().optional().describe("When the running turn started, in milliseconds. Absent when none is running."),
		run: D().optional().describe("The run under way right now: what a stop names, so it cannot cancel a turn that started after it was pressed. Absent when none is running, and for a turn with no run to attach to."),
		queue: mf.optional().describe("Messages waiting for its next turn, and whether they are held. Absent for a conversation nothing has ever waited for."),
		updatedAt: k().describe("When it last did something, in milliseconds. Reading it does not count."),
		seenAt: k().optional().describe("When somebody last opened it, in milliseconds. Newer activity than this is what makes it unread. Kept by the sandbox rather than by a browser, so clearing site data or picking up a phone does not resurrect every badge."),
		unsentAt: k().optional().describe("Since when somebody's composer has held a message for it that they have not sent yet, in milliseconds. While set, the sandbox never archives it on its own for being idle."),
		attention: hg.describe("Which kinds of waiting-for-you it is doing."),
		permissionAsk: M({
			requestId: D().describe("Which request this is: the id an answer to it names."),
			ask: D().describe("What it asks to do, on one line: the runtime's own sentence, else the tool's short name.")
		}).optional().describe("The oldest permission its running turn is waiting on, so it can be answered where the conversation is listed. Absent when none waits, and from a sandbox older than it."),
		landFailure: M({
			reason: D().describe("Why it failed, in the words it failed with."),
			code: D().optional().describe("Which kind of failure it was, when the sandbox could tell: unlinked when its copy lost its link to the workspace. Absent otherwise."),
			at: k().describe("When it failed, in milliseconds.")
		}).optional().describe("The last attempt to bring its work into the workspace failed, and why. Cleared by the next land that goes through. Absent when nothing failed, and from a sandbox older than it."),
		conflictCauses: j(xg).optional().describe("Why its work will not merge, and so who can clear it: your own uncommitted edits, which only you can commit or stash, against a moved main line or an unmergeable binary, which the conversation can redo on its own copy. Absent unless it is refusing to merge."),
		unfinished: gg.optional().describe("What its last turn left open: steps it never completed. Absent for a turn that finished what it started."),
		proof: _g.optional().describe("What its last turn showed of its work: whether a check it ran passed after its last edit, and whether it looked at interface files it changed. Absent until a turn that edited or checked anything has ended."),
		turns: k().optional().describe("Turns it has finished."),
		toolUses: k().optional().describe("Tools it has used, over its whole life."),
		subagents: M({
			running: k().describe("Subagents working right now."),
			total: k().describe("Subagents it has started over its whole life.")
		}).optional().describe("Subagents this one started, in-process and spawned alike. Absent means it never has, which is most conversations. Their spend is their own and is not folded into this conversation's cost."),
		diff: M({
			files: k().describe("Files touched."),
			insertions: k().describe("Lines added."),
			deletions: k().describe("Lines removed.")
		}).optional().describe("Everything it has written, measured from where it started. Independent of how much has been merged."),
		landedPresence: M({
			landed: k().describe("Paths this conversation merged in."),
			present: k().describe("How many of them are still there, either pending or committed."),
			removedBy: P("kind", [M({
				kind: L("agent"),
				id: D().describe("The conversation that took them out."),
				title: D().optional().describe("What that conversation is called.")
			}), M({
				kind: L("person"),
				email: D().optional().describe("Who it was, as the sandbox verified them. Absent when the request carried no identity."),
				name: D().optional().describe("What to call them, when their sign-in carried a name.")
			})]).optional().describe("Who took them out, when the sandbox could tell: an agent working in the workspace, or a person throwing the changes away. Absent when it could not tell, and from a sandbox older than it.")
		}).optional().describe("Present only when some of what it merged has since been thrown away. Absent is the steady state: its presence is the signal, so an ordinary card spends no line on it."),
		loop: M({
			state: ch.describe("How the loop is going."),
			iteration: k().int().min(0).describe("Which round it is on."),
			maxIterations: k().int().min(1).describe("How many rounds it will attempt before giving up."),
			goal: D().describe("What it is looping towards.")
		}).optional().describe("The loop driving this conversation, if one is. Absent for an ordinary conversation, which is nearly all of them."),
		workflow: M({
			runId: D().describe("The run this belongs to, which is how a board groups its steps together."),
			name: D().describe("The workflow's name."),
			step: D().describe("Which step this conversation is on now. It moves when steps are chained."),
			index: k().int().min(1).describe("This step's place in the workflow, counting from one."),
			total: k().int().min(1).describe("How many steps the workflow has.")
		}).optional().describe("The workflow run this conversation is a step of. Without it, a four-step run reads as four unrelated conversations that happen to have started together."),
		awaitingWake: A().optional().describe("Whether this conversation runs again by itself with nobody pressing anything: a watch is armed on it, or words the sandbox or another agent sent wait for it. A finished-looking card that is awaiting a wake is not finished yet."),
		watches: j(M({
			id: D().describe("The daemon's handle for this watch, the same one the agent was given when it armed it."),
			note: D().describe("The agent's own line on what it is waiting for."),
			intervalSeconds: k().int().min(1).describe("How often the check runs."),
			deadlineAt: k().describe("When it gives up and wakes the conversation anyway, in milliseconds. Every watch has one.")
		})).optional().describe("Outside conditions this conversation is parked on, each of which will wake it. Absent means none, which is nearly every conversation: an armed watch is why a finished-looking agent starts working by itself, and why a hosted machine will not go idle."),
		needs: j(ig).optional().describe("What it is waiting on people for and has not got yet, oldest first. Absent means nothing: an open need is why an idle-looking agent still needs you."),
		jobs: j(M({
			id: D().describe("The daemon's handle for this job, the one its transcript row names."),
			label: D().describe("What the job is, in the agent's own words when it gave any, else its command on one line."),
			session: D().describe("The terminal session its pane runs in, which is what opening it focuses."),
			startedAt: k().describe("When it started, in milliseconds."),
			endedAt: k().optional().describe("When the command exited, in milliseconds. Absent while it runs."),
			exitCode: k().int().optional().describe("The code it exited with. Absent while it runs, or when its exit left none."),
			watch: D().optional().describe("The watch its exit wakes this conversation through. Present once the turn that left it running has ended and the conversation is waiting on it."),
			handed: A().optional().describe("Left running for the person: the agent kept it for them with the `keep` tool (or it holds a port this conversation already left them), so it outlives the turn, wakes nothing and is theirs to stop."),
			ports: j(k().int()).optional().describe("The ports it was listening on when its turn ended."),
			stoppedBy: I([
				"turn",
				"person",
				"agent"
			]).optional().describe("Who stopped it: the sandbox, when the turn that used it ended without handing it over; a person; or the agent itself. Present from the moment the stop is asked. Absent for a job that exited by itself.")
		})).optional().describe("Commands this conversation left running in the background, and how the most recent ones ended. Absent means none since the daemon started. A job is running exactly while it has no end."),
		archivedAt: k().optional().describe("When it was put away, in milliseconds. Nothing was lost: its branch, its record and every counter stayed, and bringing it back gives it a fresh working copy. Absent means it is live on the board.")
	}), Tg = M({ id: D().min(1).describe("Which conversation.") }), Eg = Tg.extend({ watchId: D().optional().describe("Which watch to disarm. Absent disarms every watch this conversation is parked on.") }), Dg = Tg.extend({ jobId: D().min(1).describe("Which of its background jobs, by the id its card and transcript row carry.") }), Og = Tg.extend({
		before: B().int().optional().describe("Return the messages before this position in the record: the `from` of the page below. Absent asks for the most recent turns."),
		turns: B().int().min(1).max(200).optional().describe("How many of the user's turns to return, newest first. Absent takes the daemon's default.")
	}), kg = Tg.extend({ toolId: D().min(1).describe("Which tool call, by the id its card carries.") }), Ag = Tg.extend({ subagentId: D().min(1).describe("Which subagent this conversation's runtime ran in-process, by the id of the call that started it.") }), jg = M({ ids: j(D().min(1)).min(1).max(500).describe("Which conversations.") }), Mg = M({
		moved: j(X).describe("What actually moved, whole, rather than the fleet afterwards. Two archives finishing at once would each carry a snapshot from a different instant, and swapping one in wholesale would let the slower answer resurrect what the faster one just filed away."),
		rev: k().describe("The version of the fleet that includes this move, so a caller can hold its own optimistic change until it sees a list at least that new.")
	}), Ng = Mg.extend({ failed: j(M({
		id: D().describe("Which conversation stayed on the board."),
		reason: D().describe("Why its working copy could not be released, in the words the failure came with.")
	})).describe("The conversations this press could not put away, each with the reason, so the board can say it instead of reporting silence.") }), Pg = M({ removed: j(D()).describe("Which conversations were deleted, as ids. Ids rather than whole cards, because these no longer exist anywhere: there is nothing left to show and nothing to put back.") }), Fg = M({
		query: D().trim().min(2).describe("What to look for. Searched against what was said, both sides of the conversation, and nothing else: not the thinking, not the tool output, which between them name nearly every identifier in the workspace and would return most of the board."),
		caseSensitive: Hu().optional().describe("Whether capitals matter.")
	}), Ig = I(["user", "agent"]), Lg = M({
		text: D().describe("The matching line, with a little either side of it."),
		speaker: Ig.describe("Who said it. Carried with the words rather than beside them, because a line of the agent's prose under a card reads as something you typed until the row says otherwise.")
	}), Rg = M({
		id: D().describe("Which conversation matched."),
		snippet: Lg.optional().describe("Why, in its own words. Absent when the title was the match, which the card already shows: repeating it underneath is noise where evidence was wanted.")
	}), zg = M({
		matches: j(Rg).describe("What matched, from the live fleet and the archive together."),
		scanned: k().describe("How many conversations were actually read, so a screen can say when a search saw less than everything rather than implying it saw all of it."),
		indexing: A().describe("Whether what was said is still being read in the background. True means this answer can still grow, so a screen must say it is incomplete rather than presenting it as the whole list.")
	}), Bg = M({
		id: D().min(1).describe("Which conversation."),
		title: D().trim().min(1).max(80).describe("What to call it from now on.")
	}), Vg = M({
		id: D().min(1).describe("Which conversation."),
		to: D().trim().toLowerCase().email().describe("Who should answer for it from now on, by the address they sign in with. Must be the sandbox owner or a member.")
	}), Hg = M({
		id: D().min(1).describe("Which conversation."),
		emoji: D().trim().max(64).refine(ug, { message: "not a single emoji" }).describe("The mark to leave, as the emoji character itself. Exactly one: a chip has room for one mark, and a press is one press."),
		on: A().describe("Whether to add your mark or take it back. Saying what you want rather than flipping what is there, so pressing twice lands where pressing once did.")
	}), Ug = M({
		id: D().min(1).describe("Which conversation."),
		text: D().trim().min(1).max(8e3).describe("The words to put in the agent's mouth. Bounded just above what the next turn can carry whole, because a line too long to be handed over intact would reach the agent truncated and quietly break the very thing this is for.")
	}), Wg = M({
		id: D().min(1).describe("Which conversation."),
		autoLand: A().nullable().describe("Whether its work merges automatically when a turn finishes. Null clears the override and goes back to following the sandbox-wide setting, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), Gg = M({
		id: D().min(1).describe("Which conversation."),
		at: k().nullable().describe("When the composer started holding the unsent message, in milliseconds. Null says it no longer holds one: it was sent or cleared.")
	}), Kg = M({
		id: D().min(1).describe("Which conversation."),
		ending: _h.describe("Which wall this answers for: a spent usage limit, a provider outage, or a turn that stopped short."),
		policy: xh.nullable().describe("What happens next for that ending. `wait` holds the turn for a press; `retry` re-runs it on a bounded ladder (outage, stop); `resend` sends it again at the published reset and `move` also tries another account with room (limit only). An answer the ending does not allow is refused. Null clears the override and goes back to following the sandbox-wide policy, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), qg = M({
		id: D().min(1).describe("Which conversation."),
		repo: D().min(1).describe("Which repository."),
		path: D().min(1).describe("Which file, relative to that repository.")
	}), Jg = M({
		path: D().describe("Which file."),
		reason: xg.describe("Why it would not merge, and the three have nothing in common but the symptom. Your own uncommitted edits on that path, where yours is the copy at risk. The shared tree having moved under the conversation since it started, where nothing of yours is at risk. Or a file git cannot merge at all, where no automatic answer exists.")
	}), Yg = M({
		repo: D().describe("Which repository."),
		paths: j(Jg).describe("The files that genuinely would not apply. Not the whole change: reporting everything whenever the cause could not be pinned down turned four real conflicts into a wall of fourteen."),
		clean: k().describe("How many files in this repository passed but remain held with the refused composition. Zero alongside an empty list means the repository could not be reached at all."),
		mainBranch: D().optional().describe("The branch your own checkout is on, which is what the conversation has to rebase onto. Carried because only the sandbox can see it. Absent where there is no name to give.")
	}), Xg = M({
		landed: A().describe("Whether the entire composed change was applied."),
		changed: A().describe("Whether anything actually moved. False alongside merged means there was nothing on the branch to apply: the work is already in your tree, or the branch never carried any."),
		conflicts: j(Yg).optional().describe("What stopped the whole composed change, grouped per repository."),
		resolving: j(M({
			repo: D().describe("Which repository."),
			paths: j(D()).describe("Which files now hold conflict markers to sort out by hand.")
		})).optional().describe("Files left half-merged when you asked to carry the whole composition with its conflicts marked for resolution."),
		held: A().optional().describe("Nothing was applied and nothing failed: there is work waiting on the branch for a deliberate merge. Not merged on its own cannot say that, because on its own it means refused.")
	}), Zg = I([
		"check",
		"merge",
		"measure"
	]), Qg = I(["cumulative", "outstanding"]), $g = M({
		id: D().min(1).describe("Which conversation's work to merge."),
		mode: Zg.optional().describe("How to apply it. The default applies every repository or none, so a refusal leaves the workspace exactly as it was. The other carries the whole composition and leaves conflicted paths with markers to resolve by hand."),
		span: Qg.optional().describe("How much of the work to take. Leave it out for everything not yet merged."),
		force: A().optional().describe("Go ahead despite a check that would otherwise refuse.")
	});
})), t_, n_ = v((() => {
	V(), t_ = M({
		window: k().int().positive().describe("The window that decided it, in tokens, as the model's server declared it."),
		omitted: j(D()).describe("What was left out, under the same label the chat would have drawn it with, in the order a full turn would have read them."),
		base: A().describe("Whether the agent loop's own base instructions were swapped for a short paragraph as well, which only a replacing runtime can do.")
	});
})), r_, i_ = v((() => {
	V(), r_ = M({
		status: I([
			"allowed",
			"allowed_warning",
			"rejected"
		]),
		resetsAt: k().optional(),
		rateLimitType: D().optional(),
		utilization: k().optional()
	});
})), a_, o_ = v((() => {
	V(), a_ = I([
		"off",
		"cooldown",
		"on"
	]);
})), s_, c_, l_, u_, d_, f_, p_, m_, h_, g_, __, v_, y_, b_, x_ = v((() => {
	V(), s_ = M({
		name: D().describe("Its id, and what the close route takes."),
		label: D().optional().describe("What to call it on screen."),
		kind: I([
			"shell",
			"panel",
			"agent",
			"job",
			"process"
		]).describe("What sort of thing it is: a terminal somebody opened, a repository's dev server, where an agent's commands run, a job the sandbox started, or a background process that is watched rather than typed into."),
		running: A().describe("Whether it is alive. A finished one-shot job leaves a dead shell behind, which reads as false and is how it gets swept up."),
		activityAt: k().describe("When it last produced output, in milliseconds. Zero means it did not say, which is unknown rather than 1970."),
		exitCode: k().optional().describe("How the last thing in it ended. Absent while that pane is still alive."),
		command: D().optional().describe("What is running in it right now. Absent when it is sitting at a prompt. Not a second spelling of whether it is alive: this says whether anything is happening, which is what a close button should ask about before it ends something."),
		extensionId: D().optional().describe("Which extension declared this process, when one did."),
		processName: D().optional().describe("Which of that extension's processes it is, which together with the id above addresses its start and stop routes."),
		help: M({
			requestId: D().describe("What to send back when you answer, through the agent reply route."),
			message: D().describe("What the agent needs, in its own words."),
			requestedAt: k().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has stopped at something only a person can clear, and is waiting at this terminal. Present only while it is waiting.")
	}), c_ = M({ sessions: j(s_).describe("Every live surface the sandbox is holding, in one list, because the question they all answer is the same one.") }), l_ = M({ name: D().describe("Which terminal.") }), u_ = M({
		name: D().describe("Which terminal."),
		lines: B().min(1).max(1e5).default(2e4).describe("How far back to ask for. Clamped to the history that actually exists.")
	}), d_ = M({
		name: D().describe("Which terminal this is from."),
		text: D().describe("The history, oldest line first, with wrapped lines rejoined so a copied address or path comes back whole."),
		lines: k().describe("How many lines you got."),
		truncated: A().describe("It stopped because you asked for that many, not because the history ran out.")
	}), f_ = M({
		id: D().describe("Stable for the life of the page, which is what lets a tab survive a refresh of this list. Its address changes as the agent navigates and its position changes when a sibling closes."),
		title: D().optional().describe("The page's title. Absent mid-navigation, which is exactly when a tab still has to be drawn."),
		url: D().describe("Where it is."),
		active: A().describe("The one the agent last touched, or for a finished session, the one it ended on. Exactly one page has this.")
	}), p_ = M({
		name: D().describe("Its id, and what the close route takes."),
		label: D().describe("What to call it on screen: the open page's title, or its site, or which browser this is."),
		server: D().describe("Which browser drives it: the credential-free one, or a signed-in account's. The difference between a throwaway page and one logged in as you, which is worth saying out loud."),
		running: A().describe("Whether it is still open. A closed one is listed for a while with the pages it had, as the record of where the agent went."),
		activityAt: k().describe("When it last did anything, in milliseconds."),
		finishedAt: k().optional().describe("When it closed, in milliseconds. Absent while it is open."),
		help: M({
			requestId: D().describe("What to send back when you answer, through the agent reply route."),
			message: D().describe("What the agent needs, in its own words."),
			requestedAt: k().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has hit something only a person can clear: a captcha, a password it does not hold, a check on your phone. Present only while it is waiting."),
		dialog: M({
			pageId: D().describe("Which page opened it."),
			kind: I([
				"alert",
				"confirm",
				"prompt",
				"beforeunload"
			]).describe("What it asks: an alert wants dismissing, a confirm a yes or no, a prompt a text."),
			message: D().describe("What the page says."),
			defaultValue: D().optional().describe("A prompt's prefilled answer.")
		}).optional().describe("A dialog a page has open and is waiting on. You or the agent answers it; present only while it is open."),
		pages: j(f_).describe("Every page it has open. A browser holds several at once, which is the reason it is listed apart from the terminals.")
	}), m_ = M({ sessions: j(p_).describe("Every browser the agents have running, open or recently closed.") }), h_ = M({ name: D().describe("Which browser.") }), g_ = I(["subagent", "spawned"]), __ = I([
		"pending",
		"running",
		"blocked",
		"completed",
		"failed",
		"killed",
		"paused"
	]), v_ = M({
		state: I([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Whether anything proved its work: a check passed after its last edit, it changed code and nothing checked it, a check ran and failed, or it changed no code at all."),
		paths: j(D()).optional().describe("The code files it changed, most recent last. The first few; the record holds the rest."),
		check: D().optional().describe("The command that spoke: the one that cleared it, or the one that failed. Named rather than summarised, so a targeted test is not read as the whole suite.")
	}), y_ = M({
		id: D().describe("The id of the tool call that started it (an SDK child) or the child's own conversation id (a spawned one); either way both sides already hold it, so a card links to its subagent with the id it has and the subagent points back the same way."),
		kind: g_.describe("How it was started: in-process by the runtime's own Agent/Task tool, or spawned by the daemon as a conversation of its own, on any provider. It changes where its record is read from and what else can be done with it, never what it is."),
		conversationId: D().describe("The conversation whose turn started it, and the way back to the chat it belongs to."),
		agentType: D().optional().describe("What kind of subagent it is."),
		description: D().optional().describe("What it was asked to do, in one line."),
		model: D().optional().describe("Which model it runs on: the exact id its provider served once its own record says so, where the call that started it named only an alias or nothing."),
		effort: D().optional().describe("How hard it was told to think: its own definition's tier, else the one it inherited from its parent's turn."),
		provider: D().optional().describe("Which provider serves it, for a subagent spawned across providers."),
		spawnDepth: k().optional().describe("How deep in the chain it sits, where one means the turn itself started it. A subagent can start subagents, and a flat list that could not say so would read as though the turn started all of them."),
		background: A().optional().describe("The parent carried on working instead of waiting for it. Such a subagent is otherwise invisible until its result lands, sometimes minutes later."),
		status: __.describe("How it is going. Blocked means it needs an answer, which a parent and an operator act on differently from it simply working."),
		startedAt: k().describe("When it started, in milliseconds."),
		endedAt: k().optional().describe("When it finished, in milliseconds. Absent while it works."),
		activityAt: k().describe("When it last did anything, in milliseconds."),
		tokens: k().optional().describe("What it has spent. Its own, so a parent's cost and the sum of its subagents' are two different true numbers."),
		toolUses: k().optional().describe("How many tools it has used."),
		lastTool: D().optional().describe("The last one it reached for."),
		summary: D().optional().describe("Its report: what it concluded, without opening its record. The question a finished subagent gets read for."),
		error: D().optional().describe("Why it failed, when it did."),
		verification: v_.optional().describe("Whether anything proved the work its report describes.")
	}), b_ = M({ sessions: j(y_).describe("The subagents conversations the caller can see have started, in-process and spawned alike: every one still working, and the most recent that have settled. Working ones first, then the most recently active.") });
})), S_, C_, w_, T_, E_, D_, O_ = v((() => {
	V(), S_ = I(["messages", "everything"]), C_ = M({
		id: D().describe("The share's own id, minted fresh each time, so sharing one conversation twice gives two links. Deliberately not the conversation's id, which is memorable by design and would make a page's address guessable."),
		conversationId: D().describe("Which conversation it was taken from."),
		title: D().describe("The title on the page, which is the sharer's choice rather than the conversation's own."),
		detail: S_.describe("How much travels: the two speakers' words alone, or the whole record including the agent's work and thinking, which necessarily publishes the code and command output in it."),
		sharedAt: k().describe("When the snapshot was taken, in milliseconds. A share is frozen, so this dates what a recipient can see rather than when the conversation happened."),
		messages: k().describe("How many messages are behind the link."),
		url: D().optional().describe("The page's address. Absent on a sandbox with nowhere to publish to.")
	}), w_ = M({ shares: j(C_).describe("Every conversation currently published as a page.") }), T_ = M({
		conversationId: D().min(1).describe("Which conversation to publish."),
		title: D().min(1).max(80).describe("The title for the page. The conversation's own name is only what a dialog would open with."),
		detail: S_.describe("How much to publish. Two levels rather than a set of switches, because every extra toggle is another thing to get wrong about a link that cannot be recalled.")
	}), E_ = M({ id: D().min(1).describe("Which share to re-take. Its link stays the same, which matters because it has already been sent.") }), D_ = M({ id: D().min(1).describe("Which share to take down.") });
})), k_, A_, j_, M_, N_ = v((() => {
	V(), k_ = M({
		code: D().describe("Which of the sandbox's notices this row is, by name. A reader that does not know the name shows the row's text."),
		params: F(D(), N([
			D(),
			k(),
			A()
		])).optional().describe("The facts the notice was worded from, by name: counts, names, and the provider's own sentence where the notice quotes one.")
	}), A_ = k().int().nonnegative(), j_ = {
		message: D(),
		error: D().optional()
	}, M_ = I([
		"auth",
		"outage",
		"restart",
		"stopped",
		"limit",
		"switched",
		"carried",
		"refused",
		"door",
		"overflow",
		"flagged",
		"continued"
	]), P("code", [
		M({ code: L("compacted") }),
		M({ code: L("stopped") }),
		M({
			code: L("synced"),
			params: M({
				commits: A_,
				blocked: D().optional()
			})
		}),
		M({ code: L("intoParent") }),
		M({
			code: L("intoParentClash"),
			params: M({ files: A_ })
		}),
		M({ code: L("landHeld") }),
		M({
			code: L("landConflict"),
			params: M({
				files: A_,
				repos: D()
			})
		}),
		M({
			code: L("landed"),
			params: M({
				deps: A_.optional(),
				queued: A().optional()
			}).optional()
		}),
		M({
			code: L("retrying"),
			params: M({
				...j_,
				attempt: A_,
				of: A_
			})
		}),
		M({
			code: L("retried"),
			params: M({
				...j_,
				made: A_,
				of: A_
			})
		}),
		M({
			code: L("outageWaiting"),
			params: M(j_)
		}),
		M({
			code: L("renewing"),
			params: M(j_)
		}),
		M({
			code: L("renewalWithdrawn"),
			params: M(j_)
		}),
		M({
			code: L("reconnect"),
			params: M(j_)
		}),
		M({
			code: L("undelivered"),
			params: M({
				...j_,
				unattended: A().optional()
			})
		}),
		M({
			code: L("kept"),
			params: M({
				...j_,
				memory: A().optional()
			})
		}),
		M({
			code: L("memoryHeld"),
			params: M(j_)
		}),
		M({
			code: L("failed"),
			params: M(j_)
		}),
		M({ code: L("questionDismissed") }),
		M({ code: L("planApproved") }),
		M({ code: L("keptPlanning") }),
		M({
			code: L("watching"),
			params: M({
				note: D(),
				every: D()
			})
		}),
		M({ code: L("restartInterrupted") }),
		M({
			code: L("keptWarm"),
			params: M({
				tokens: D(),
				span: D(),
				refreshes: A_
			})
		}),
		M({
			code: L("keptCold"),
			params: M({
				tokens: D(),
				span: D(),
				refreshes: A_
			})
		}),
		M({
			code: L("contextTrim"),
			params: M({
				window: D(),
				omitted: D().optional(),
				base: A()
			})
		}),
		M({
			code: L("resumed"),
			params: M({ reason: M_ })
		}),
		M({
			code: L("installing"),
			params: M({
				ownCopy: A(),
				root: A().optional(),
				projects: D().optional(),
				more: A_.optional()
			})
		})
	]);
})), P_, F_, I_, L_, R_, z_, B_, V_, H_, U_, W_, G_, K_, q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv, rv, iv, av, ov, sv, cv, lv = v((() => {
	V(), K(), O_(), bd(), x_(), sg(), wh(), N_(), Dp(), P_ = I([
		"pending",
		"approved",
		"rejected",
		"cancelled"
	]), F_ = I([
		"pending",
		"answered",
		"cancelled"
	]), I_ = I([
		"pending",
		"allowed",
		"always",
		"everything",
		"denied",
		"cancelled"
	]), L_ = I([
		"pending",
		"helped",
		"declined",
		"cancelled"
	]), R_ = I([
		"pending",
		"approved",
		"skipped",
		"cancelled"
	]), z_ = I([
		"pending",
		"connecting",
		"skipped",
		"cancelled"
	]), B_ = M({
		...pp,
		status: P_.describe("Where the decision stands.")
	}), V_ = M({
		...mp,
		status: F_.describe("Where the answer stands."),
		answers: F(D(), j(D())).optional().describe("What was chosen, keyed by the question, with the chosen labels or the user's own words."),
		attachments: F(D(), j(D())).optional().describe("Files the user attached to their own-words answer, keyed by the question, as workspace-relative paths.")
	}), H_ = Qf.extend({
		...hp,
		status: I_.describe("Where the decision stands.")
	}), U_ = M({
		...gp,
		status: L_.describe("How the hand-over ended.")
	}), W_ = M({
		..._p,
		status: L_.describe("How the hand-over ended.")
	}), G_ = M({
		...vp,
		status: z_.describe("Where the decision stands."),
		outcome: xp.optional().describe("How an accepted ask's setup ended (the capability_outcome frame).")
	}), K_ = M({
		...yp,
		status: R_.describe("Where the decision stands."),
		receipt: Sp.optional().describe("How the approved payment ended (the payment_receipt frame).")
	}), q_ = M({
		...bp,
		status: R_.describe("Where the decision stands."),
		receipt: Cp.optional().describe("Who released it, or that somebody refused (the credential_receipt frame).")
	}), J_ = Vl(() => M({
		id: D().describe("The call's id."),
		name: D().describe("Which tool."),
		category: sp.describe("What kind of thing it does: read, edit, delete, move, search, run, think, fetch. Named the same way whatever the backend called the tool."),
		status: cp.describe("How it went."),
		target: D().optional().describe("What it acted on, in one line: a file, a command, an address."),
		locations: j(lp).optional().describe("The files it touched."),
		content: j(up).optional().describe("What it produced: text, a change to a file, or a picture."),
		children: j(J_).optional().describe("Calls a delegated subagent made, nested under the call that started it, so a reopened conversation redraws the delegation rather than collapsing it into one result."),
		nested: k().int().nonnegative().optional().describe("How many calls sit under this one, present in place of `children` when they were left behind. A transcript page does that, since a settled delegation draws collapsed; ask for the call's own children to fill it in."),
		thinking: D().optional().describe("What the agent was reasoning about around this call."),
		subagent: Y_.optional().describe("The helper this call started, as the daemon's registry sees it: what it is, how it is going, what it has spent. What a card can say about a backgrounded child whose result is minutes away.")
	})), Y_ = M({
		id: D().optional().describe("Its own id, where that is not the card's: a spawned subagent is named by its own conversation, which is what the roster, `wait` and its own chat call it. Absent, the card's id is its id, as it is for one the runtime started in-process."),
		kind: g_,
		agentType: D().optional(),
		description: D().optional(),
		model: D().optional(),
		provider: D().optional(),
		background: A().optional(),
		status: __,
		tokens: k().optional(),
		toolUses: k().optional(),
		lastTool: D().optional(),
		summary: D().optional(),
		error: D().optional(),
		verification: v_.optional()
	}), X_ = I([
		"met",
		"timeout",
		"restart-expired",
		"broken"
	]), Z_ = M({
		outcome: X_.describe("How the watch ended: the condition held, the deadline passed, or a restart cut it short."),
		note: D().describe("The agent's own line on what it was waiting for."),
		elapsed: D().describe("How long the watch stood, already worded ('43m'): carried rather than recomputed, since the arming instant is not on the row."),
		sent: D().describe("The whole prompt the model was woken with, disclosed under the row.")
	}), Q_ = M({
		outcome: I(["met", "declined"]).describe("How the need ended: a person gave it, or said no."),
		title: D().describe("The need, as its card leads with it."),
		id: D().describe("The need's handle, which its live card is keyed by."),
		sent: D().describe("The whole prompt the model received, disclosed under the row.")
	}), $_ = M({
		kind: I(["peer", "child"]).describe("Who sent it: another conversation in the workspace, or a subagent this one started."),
		from: D().describe("The sending conversation's id."),
		title: D().optional().describe("The sender's title, when it had one."),
		failed: A().optional().describe("A child's report on a turn that failed rather than finished."),
		sent: D().describe("The whole prompt the model received, disclosed under the row.")
	}), ev = M({
		id: D().describe("The daemon's handle for the job, which its live state on the conversation's card is keyed by."),
		label: D().describe("What the job is, in the agent's own words when it gave any, else its command on one line."),
		command: D().describe("The command as the agent wrote it, folded to one line."),
		startedAt: k().describe("When it started, in milliseconds.")
	}), tv = M({
		title: D().describe("The one line a reader sees, on a row that opens to the text below."),
		text: D().describe("The note itself, which is also exactly what the model was told.")
	}), nv = M({
		costUsd: k().optional(),
		inputTokens: k().optional(),
		outputTokens: k().optional(),
		durationMs: k().optional(),
		numTurns: k().optional()
	}), rv = M({
		role: I([
			"user",
			"assistant",
			"notice"
		]).describe("Who said it. A notice is neither side: it is something that happened to the turn, recorded so a reopened conversation can say it. Without those, a turn a provider refused ends on the user's message and reads as broken."),
		text: D().describe("The words."),
		run: D().optional().describe("The run that produced this row. Present on everything a turn produced, absent on rows written outside one. A client draws a run's rows over whatever it already holds for that run, which is what this identifies; content cannot, because the last row of a live run keeps growing."),
		sentAt: k().optional().describe("When it was sent, in milliseconds. On the user's rows only, because that is the only moment actually known: a turn's own frames arrive with no clock, so stamping the agent's rows could only ever mean the whole turn's start or end."),
		messageId: D().optional().describe("The message's own id, on the rows of messages sent to the agent: what its sender named it, or what the sandbox did. A rewind names the message by it, and the same id sent again is recognised rather than delivered twice."),
		attachments: j(D()).optional().describe("Files attached to this message, as workspace paths."),
		checkpointId: D().optional().describe("The saved point this message can be rewound to. Looked up on each read rather than stored, so what is offered is exactly what is still there to go back to."),
		rewindIndex: k().int().nonnegative().optional().describe("This message's position in the conversation's record, which is how a rewind names it. Present only beside a checkpoint."),
		thinking: D().optional().describe("What the agent was reasoning about."),
		tools: j(J_).optional().describe("The tool calls this part of the turn made."),
		todos: j(ap).optional().describe("The agent's task checklist, as of this bubble."),
		usage: nv.optional().describe("What the turn cost, on the bubble its answer ended in."),
		notes: j(tv).optional().describe("What the sandbox added to this message before the model saw it. Carried on the message rather than as rows of their own, because they genuinely were part of what was sent."),
		speaker: vd.optional().describe("Who sent this message, as the sandbox verified it. Absent where it does not say."),
		errand: yd.optional().describe("What this message is for, when the sandbox or the app composed it rather than a person typing it. Absent on a person's own words."),
		placed: A().optional().describe("A person wrote this in the agent's voice, with no turn behind it. Marked for the human re-reading the conversation months later, so their own words do not pass as the agent's. The agent itself never sees the mark."),
		noticeAction: I([
			"landHold",
			"depsInstall",
			"watchStop",
			"sandboxMemory",
			"sendAnyway",
			"sendAgain"
		]).optional().describe("A one-press follow-up this notice offers, by name. The chat decides what it does and whether it still applies."),
		sandboxHeld: A().optional().describe("The sandbox kept this refused turn whole, its message still above, so the notice's press runs that turn again instead of letting the conversation's queue go, which never held these words."),
		noticeWait: I([
			"credentialRenewal",
			"chatRoute",
			"watch"
		]).optional().describe("The wait this notice describes, by name, so a reader can say whether it is still on."),
		noticeWaitId: D().optional().describe("Which instance of the wait this notice names, for a kind that can have several running at once."),
		noticeCode: k_.optional().describe("Which of the sandbox's own notices this row is, and the facts it was worded from, so a reader can say it in the reader's own language. The text stays the English sentence."),
		plan: B_.optional().describe("The plan this row asked approval for, and the answer."),
		question: V_.optional().describe("The questions this row asked, and the picks that answered them."),
		permission: H_.optional().describe("The tool this row asked permission for, and the decision."),
		browserHelp: U_.optional().describe("The browser hand-over this row asked for, and how it ended."),
		terminalHelp: W_.optional().describe("The terminal hand-over this row asked for, and how it ended."),
		capabilityOffer: G_.optional().describe("The capability setup this row asked for, the decision, and the outcome."),
		paymentOffer: K_.optional().describe("The payment this row asked for, the decision, and the receipt."),
		watchWake: Z_.optional().describe("The condition watch that woke this conversation, and the prompt it was woken with."),
		need: Jh.optional().describe("Something the agent asked a person for, as it was when raised. Its live state (answered, met) is read by its id, since it outlives the turn."),
		needWake: Q_.optional().describe("The answered need that reached this conversation, and the prompt it came as."),
		agentWords: $_.optional().describe("Another agent's words that reached this conversation, whose they are, and the prompt they came as."),
		backgroundJob: ev.optional().describe("The background job this row marks the start of."),
		credentialOffer: q_.optional().describe("The gated credential this row asked to use, who may release it, and who did.")
	}), iv = P("op", [
		M({
			op: L("append").describe("A new row at the end."),
			row: rv
		}),
		M({
			op: L("replace").describe("This row, whole, in place of the one at that index."),
			index: k().int().nonnegative(),
			row: rv
		}),
		M({
			op: L("drop").describe("The row at that index is gone: it was opened and never written into."),
			index: k().int().nonnegative()
		}),
		M({
			op: L("text").describe("More of the agent's prose, onto that row's text."),
			index: k().int().nonnegative(),
			text: D()
		}),
		M({
			op: L("thinking").describe("More of the agent's reasoning, onto that row's thinking."),
			index: k().int().nonnegative(),
			text: D()
		}),
		M({
			op: L("toolThinking").describe("More of a delegated subagent's reasoning, onto the thinking of the card that started it."),
			index: k().int().nonnegative(),
			id: D().describe("The card's id, matched wherever it nests."),
			text: D()
		}),
		M({
			op: L("tool").describe("A tool card's own fields: new, or the latest state of one already there, matched by id wherever it nests. Carries no `children` or `thinking`; a card already there keeps its own."),
			index: k().int().nonnegative(),
			tool: J_,
			parent: D().optional().describe("The card this one nests under, when it is a delegated subagent's own call.")
		})
	]), av = M({ messages: j(rv).describe("The conversation, in order. Each block of the agent's prose is its own message with the tools that block introduced, which is what reproduces the way it actually unfolded.") }), ov = M({
		reason: vh.describe("Which ending left the work here: a Stop or a daemon killed under the turn, a spent usage allowance, a provider that refused it, or the provider's safety classifier stopping it partway."),
		resetsAt: k().optional().describe("When the spent allowance reopens, in epoch seconds. Absent for every ending that names no instant, and for a provider that publishes none."),
		held: M({
			ran: A().describe("Whether the held turn got anywhere before it was refused, which is a different sentence from one refused at the door."),
			contextTokens: k().optional().describe("How much context a press that keeps the session re-reads once, on this account at the reset or carried to another. Absent when no usage frame measured it."),
			handoffTokens: k().optional().describe("What a press that opens a fresh session pays instead: the capped record plus the sandbox's measured brief, counted at the failure."),
			moving: D().optional().describe("The account the owner's policy is already moving this turn to, when it is; the surface then reports the move rather than offering a press.")
		}).optional().describe("Present when the daemon still holds the refused turn whole, so a press re-runs it rather than appending a message after it."),
		scheduled: A().optional().describe("Whether something other than the user is already booked to send this turn again, so the surface reports the wait instead of offering a press."),
		nextAt: k().optional().describe("When the booked send actually fires, in epoch seconds. Present only with `scheduled`; absent for a booking that fires on the next pass, which is 'now' to a reader."),
		retries: Ch.optional().describe("How many automatic re-runs a stopped turn has already had, of how many. Absent before its first; equal counts mean the ladder is spent and only a press sends it again.")
	}), sv = av.extend({
		sessionId: D().optional().describe("The provider session behind the last turn, when there is one."),
		provider: Hd.optional().describe("Which provider minted that session."),
		harness: Wd.optional().describe("Which runtime minted it: a session resumes only on the loop that opened it."),
		account: D().optional().describe("Which stored account it belongs to, as the daemon resolved it. Absent when no stored account paid for the turn."),
		ending: ov.optional().describe("How the last turn ended, when it left work behind that one press finishes. Absent for a conversation whose last turn ended on its own, and for the failures that name something to repair first."),
		from: k().int().nonnegative().describe("Where the first message sits in the whole record, and the `before` that asks for the page above this one."),
		more: A().describe("Whether older messages precede this page.")
	}), cv = M({ children: j(J_).describe("The calls the delegated agent made, in the order it made them.") }), M({
		title: D(),
		sharedAt: k(),
		detail: S_,
		messages: j(rv)
	});
})), uv, dv, fv, pv, mv, hv = v((() => {
	V(), K(), bd(), e_(), n_(), i_(), o_(), sg(), Ah(), $p(), x_(), wh(), Dp(), lv(), uv = P("kind", [
		M({
			kind: L("session"),
			sessionId: D(),
			account: D().optional().describe("Which stored account this session belongs to, as the daemon resolved it for the turn.")
		}),
		M({
			kind: L("worktree"),
			branch: D(),
			base: D(),
			unenforced: A().optional(),
			sync: M({
				commits: k(),
				blocked: j(D())
			}).optional(),
			remote: D().optional()
		}),
		M({
			kind: L("landed"),
			landed: A(),
			conflicts: j(Yg).optional(),
			held: A().optional(),
			deps: M({
				missing: k(),
				started: j(D()),
				deferred: A()
			}).optional(),
			into: D().optional()
		}),
		M({
			kind: L("preamble"),
			notes: j(tv)
		}),
		t_.extend({ kind: L("context_trim") }),
		M({
			kind: L("init"),
			model: D(),
			prompt: kh.optional()
		}),
		M({
			kind: L("checkpoint"),
			id: D(),
			index: k().int().nonnegative().optional()
		}),
		M({
			kind: L("steer"),
			text: D(),
			sentAt: k(),
			attachments: j(D()).optional(),
			voice: I(["sandbox", "agent"]).optional(),
			errand: yd.optional(),
			messageId: D().optional()
		}),
		M({
			kind: L("delta"),
			text: D(),
			parentToolUseId: D().optional()
		}),
		M({
			kind: L("text_end"),
			parentToolUseId: D().optional()
		}),
		M({
			kind: L("thinking"),
			text: D(),
			parentToolUseId: D().optional()
		}),
		M({
			kind: L("tool_call"),
			id: D(),
			name: D(),
			category: sp,
			status: cp,
			target: D().optional(),
			locations: j(lp).optional(),
			content: j(up).optional(),
			parentToolUseId: D().optional()
		}),
		M({
			kind: L("tool_call_update"),
			id: D(),
			status: cp.optional(),
			content: j(up).optional(),
			locations: j(lp).optional()
		}),
		M({
			kind: L("terminal"),
			session: D()
		}),
		M({
			kind: L("browser"),
			session: D()
		}),
		M({
			kind: L("subagent"),
			id: D(),
			subagentKind: g_,
			agentType: D().optional(),
			description: D().optional(),
			model: D().optional(),
			provider: D().optional(),
			background: A().optional()
		}),
		M({
			kind: L("subagent_update"),
			id: D(),
			status: __.optional(),
			tokens: k().optional(),
			toolUses: k().optional(),
			lastTool: D().optional(),
			summary: D().optional(),
			error: D().optional(),
			verification: v_.optional()
		}),
		M({
			kind: L("todos"),
			items: j(ap)
		}),
		M({
			kind: L("commands"),
			items: j(np)
		}),
		M({
			kind: L("usage"),
			account: D().optional(),
			costUsd: k().optional(),
			inputTokens: k().optional(),
			outputTokens: k().optional(),
			cacheReadTokens: k().optional(),
			cacheCreationTokens: k().optional(),
			durationMs: k().optional(),
			numTurns: k().optional(),
			openingCacheReadTokens: k().optional(),
			openingCacheCreationTokens: k().optional(),
			promptFingerprint: D().optional()
		}),
		Oh.extend({ kind: L("prompt_cache") }),
		r_.extend({
			kind: L("rate_limit_info"),
			account: D().optional()
		}),
		M({
			kind: L("fast_mode"),
			state: a_,
			reason: D().optional()
		}),
		M({
			kind: L("provider_retry"),
			attempt: k(),
			maxAttempts: k().optional(),
			nextAttemptAt: k().optional(),
			status: k().optional()
		}),
		M({
			kind: L("account_usage"),
			account: D().optional(),
			windows: j(kp)
		}),
		op.extend({ kind: L("context_usage") }),
		M({
			kind: L("compact"),
			trigger: D(),
			preTokens: k().optional(),
			postTokens: k().optional()
		}),
		M({
			kind: L("install"),
			reach: I(["own-copy", "main-tree"]).describe("Where it writes: this conversation's own copy of the tree, or the main tree every conversation reads."),
			projects: j(D()).describe("The projects it works on, workspace-relative, the workspace root as an empty string; empty when none could be named.")
		}),
		wp,
		Tp,
		Ep,
		M({
			kind: L("browser_help"),
			...gp
		}),
		M({
			kind: L("terminal_help"),
			..._p
		}),
		M({
			kind: L("capability_offer"),
			...vp
		}),
		xp.extend({
			kind: L("capability_outcome"),
			requestId: D()
		}),
		M({
			kind: L("payment_offer"),
			...yp
		}),
		Sp.extend({
			kind: L("payment_receipt"),
			requestId: D()
		}),
		M({
			kind: L("credential_offer"),
			...bp
		}),
		Cp.extend({
			kind: L("credential_receipt"),
			requestId: D()
		}),
		M({
			kind: L("need"),
			need: Jh
		}),
		M({
			kind: L("resolved"),
			requestId: D(),
			reply: Bp.optional()
		}),
		M({
			kind: L("mode"),
			mode: $d
		}),
		M({
			kind: L("error"),
			message: D(),
			code: I(/* @__PURE__ */ "session-not-found.rate_limit.codex-advisory.codex-reauth.acp-auth-required.claude-reauth.claude-token-refused.claude-not-entitled.provider-outage.trial-unavailable.trial-model-unavailable.trial-exhausted.unknown-command.grok-model-invalid.codex-model-invalid.model-unavailable.context-window-too-small.model-helper-only.privacy-unshielded.context-overflow.subscription-required.agent-busy.sandbox-memory-low.turn-cap.harness-incomplete.engine-version-floor.safeguard-flagged".split(".")).optional(),
			refusal: M({
				category: D().optional().describe("The classifier's category as the provider named it (cyber, bio, reasoning_extraction, …), when it did."),
				resumeAt: D().optional().describe("The last session entry before the stopped response: a retry resumes the session there, so the model never sees what was stopped.")
			}).optional(),
			engine: M({
				id: D().describe("Which engine (e.g. claude)."),
				running: D().optional().describe("The version that was refused, when the provider named it."),
				floor: D().describe("The lowest version the provider will accept.")
			}).optional(),
			resetsAt: k().optional(),
			account: D().optional().describe("Which of the provider's accounts served (or was refused for) the turn, where the sandbox holds it."),
			autoResume: I(["scheduled", "available"]).optional(),
			nextAt: k().optional(),
			held: M({
				ran: A(),
				contextTokens: k().optional(),
				handoffTokens: k().optional(),
				moving: D().optional()
			}).optional(),
			outage: M({ retryAt: k() }).optional(),
			retries: Ch.optional(),
			memory: M({
				limitBytes: k().describe("The cgroup's ceiling: what a raise would move."),
				residentBytes: k().describe("memory.current, the resident charge alone."),
				swapBytes: k().describe("memory.swap.current; 0 when swap is off or unaccounted.")
			}).optional(),
			unattended: A().optional()
		}),
		M({ kind: L("done") })
	]), dv = [
		"session",
		"worktree",
		"init",
		"terminal",
		"browser",
		"commands",
		"usage",
		"rate_limit_info",
		"fast_mode",
		"provider_retry",
		"account_usage",
		"context_usage",
		"mode",
		"error"
	], fv = uv.options.filter((e) => dv.includes(e.shape.kind.value)), pv = P("kind", fv), mv = P("kind", [
		M({
			kind: L("attached").describe("The first frame, identifying the run you have joined and handing you its transcript so far."),
			run: D().describe("The run's id."),
			startedAt: k().describe("When it started, in milliseconds, so a window joining late can show how long it has been going."),
			seq: k().describe("How many frames the run has produced so far. A fact at or below this number is being replayed; a patch is never."),
			rows: j(rv).describe("The turn's rows as they stand: what was asked, and everything the agent has said and done since. Draw these, then apply the patches that follow.")
		}),
		M({
			kind: L("patch").describe("One change to the run's rows."),
			seq: k().describe("Its position in the run, counting from one."),
			patch: iv
		}),
		M({
			kind: L("fact").describe("One thing about the turn that is not a row: its session, its branch, its cost, a failure."),
			seq: k().describe("Its position in the run, counting from one. At or below the head's number, it is being replayed."),
			fact: pv
		}),
		M({ kind: L("end").describe("The run is over and every frame has been delivered. A stream that closes without this was dropped mid-run, so re-attach rather than assuming the turn finished.") })
	]);
})), gv, _v, vv, yv, bv, xv = v((() => {
	V(), K(), Vd(), gv = M({
		prompt: D().min(1).max(2e4).describe("The message a new chat is about to open with."),
		paths: j(D().min(1).max(500)).max(50).default([]).describe("Workspace paths the message names: uploads, @-mentions, the editor's own file. How much real code the work touches, and which persona's ground it stands on."),
		folder: D().max(200).optional().describe("The workspace folder the chat was opened in, when it was opened in one."),
		editorContext: A().optional().describe("Whether the message carries a file and selection the user pointed at, so it is about real code."),
		planMode: A().optional().describe("Whether the chat opens in plan mode, which is a request to think before acting."),
		model: A().describe("Whether to choose the model, effort and account: true when the chat is on Auto and nothing has been picked by hand."),
		persona: A().describe("Whether to choose the persona: true when persona matching is on and the chat has not been pointed at one by hand.")
	}), _v = M({
		provider: Hd.describe("Which provider serves the conversation."),
		model: D().min(1).describe("Which of its models."),
		effort: D().optional().describe("How hard it should think, where the model offers a choice. Absent takes the model's own default."),
		account: D().optional().describe("Which connected account pays, by its daemon-minted id. Absent leaves it to whichever account has the most headroom.")
	}), vv = M({
		id: G.optional().describe("The persona this message belongs to, or absent when none does."),
		reason: D().describe("Why, in the one clause a chat can show. Present whether or not a persona was named.")
	}), yv = M({
		pick: _v.optional().describe("What the conversation should run on, or absent when nothing could be chosen and the usual pick stands."),
		reason: D().describe("Why, in the one clause a chat can show. Present whether or not a model was named.")
	}), bv = M({
		persona: vv.optional().describe("The persona half's answer, present only when it was asked for."),
		model: yv.optional().describe("The model half's answer, present only when it was asked for."),
		judge: D().optional().describe("Which model answered, as `provider:model`, so the chat can name what the reading cost. Absent when no model was reached at all.")
	});
})), Sv, Cv, wv, Tv, Ev, Dv, Ov, kv, Av, jv, Mv, Nv = v((() => {
	V(), Sv = I([
		"turn",
		"interval",
		"pre-restore",
		"restore",
		"user"
	]), Cv = M({
		id: D().describe("The saved point's id, which is what restoring and diffing take."),
		at: k().describe("When it was taken, in milliseconds."),
		trigger: Sv.describe("What caused it. The automatic between-turn captures are a safety net and are not listed; they dissolve into the next visible point's differences."),
		label: D().optional().describe("What to call it. For one taken before a turn, that turn's prompt.")
	}), wv = M({ snapshots: j(Cv).describe("Every point you can go back to, newest first.") }), Tv = M({
		conversationId: D().min(1).describe("Which conversation to rewind."),
		index: k().int().nonnegative().describe("Which message to go back to, counting from the start. It is also how many messages survive: rewinding to the first keeps none of them and puts the files back to before it ran."),
		messageId: D().min(1).describe("The id of the message at that position, as its row names it. If that position now holds a different message, nothing is rewound: the transcript has moved since you read it.")
	}), Ev = M({
		snapshot: D().optional().describe("The saved point the files were put back to. Absent for a conversation working in its own copy, whose rewind moved a branch rather than the shared timeline."),
		dropped: k().int().nonnegative().describe("How many messages were removed.")
	}), Dv = M({ id: D().min(1).describe("Which saved point.") }), Ov = M({
		scope: D().describe("Which part of the workspace the path belongs to: the workspace root, or one of the repositories inside it."),
		path: D().describe("The path, relative to that scope."),
		status: I([
			"added",
			"modified",
			"deleted",
			"type-changed"
		]).describe("What happened to it.")
	}), kv = M({ changes: j(Ov).describe("Everything that differs between this saved point and the one before it.") }), Av = M({
		id: D().min(1).describe("Which saved point."),
		scope: D().min(1).describe("Which part of the workspace the path belongs to."),
		path: D().min(1).describe("The file, relative to that scope.")
	}), jv = M({
		beforeBytes: k().int().nonnegative().optional().describe("How big the before side is, in bytes. Absent when the file did not exist yet."),
		afterBytes: k().int().nonnegative().optional().describe("How big the after side is, in bytes. Absent when the file was deleted."),
		patch: D().optional().describe("The changed regions as unified-diff hunks (`@@` sections only). Absent when the change was too large to render even as a patch."),
		more: A().optional().describe("There were more changed regions than fit; the patch stops at a region boundary.")
	}), Mv = M({
		before: D().optional().describe("The whole file as it was. Absent when it did not exist yet, or when `partial` is set."),
		after: D().optional().describe("The whole file as it is now. Absent when it was deleted, or when `partial` is set."),
		binary: A().optional().describe("The file is not text, so neither side is sent."),
		partial: jv.optional().describe("Set when the file was too large to send whole: what is sent instead of the two sides.")
	});
})), Pv, Fv = v((() => {
	W(), _d(), Dp(), hv(), K(), xv(), Nv(), $p(), Y(), Pv = {
		run: U.route({
			method: "POST",
			path: "/agent",
			summary: "Say something to an agent",
			description: "Answers at once with what became of the message: it starts a turn when the conversation is free, is said into the running turn where that turn takes words mid-way, and otherwise waits in the conversation's queue for the next turn, where every window sees it. The work runs inside the sandbox whether or not anybody stays connected; watch it by attaching. Naming a conversation that does not exist yet opens it. Give the message an id, and sending it again after a lost answer is met with what became of it the first time rather than a second delivery."
		}).meta({
			floor: "collaborator",
			guest: !0,
			control: "editor"
		}).input(rf).output(uf),
		attach: U.route({
			method: "POST",
			path: "/agent/attach",
			summary: "Watch a turn happen",
			description: "Streams everything the agent does: its words, the tools it reaches for, and the answers it gets. It opens with the turn's transcript whole as it stands, then sends every change as it lands, so a reload or a dropped connection loses nothing: attaching again hands over the whole transcript again. The window that started the turn holds no special claim, and any number of watchers on any number of devices see the same thing."
		}).meta({
			floor: "viewer",
			guest: !0,
			stream: !0,
			control: "read"
		}).input(gf).output(H(mv)),
		reply: U.route({
			method: "POST",
			path: "/agent/reply",
			summary: "Answer a question the agent asked",
			description: "Un-parks a turn that is waiting on you: approving a plan, choosing between options, or permitting a tool. The turn picks up where it stopped."
		}).meta({
			floor: "collaborator",
			guest: !0,
			control: "editor"
		}).input(Bp).output(q),
		steer: U.route({
			method: "POST",
			path: "/agent/steer",
			summary: "Interrupt a running turn",
			description: "Slips a message into a turn already under way, without stopping it. This is how you redirect an agent mid-thought rather than waiting for it to finish being wrong. Give the message an id, and sending it again after a lost answer is met with what became of it the first time rather than saying it twice."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Hp).output(uf),
		stop: U.route({
			method: "POST",
			path: "/agent/stop",
			summary: "Stop a turn now",
			description: "Cancels the running turn inside the sandbox. Whatever it had already written to disk stays written, and whatever waits in the conversation's queue is held there, for everyone, until somebody resumes it. Name the run you mean: a stop that arrives after that run has ended cancels nothing, rather than whatever turn started next."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Up).output(Wp),
		queueEdit: U.route({
			method: "POST",
			path: "/agent/queue/edit",
			summary: "Reword a waiting message",
			description: "Changes what a message waiting in the conversation's queue says, keeping its place. Name the revision you read it at: if somebody changed it since, on this device or another, nothing is changed and you are told so."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Jp).output(mf),
		queueRemove: U.route({
			method: "POST",
			path: "/agent/queue/remove",
			summary: "Take back a waiting message",
			description: "Removes a message from the conversation's queue before the agent gets it. Name the revision you read it at: a message somebody reworded since is left alone, so you never take back words you have not seen."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(qp).output(mf),
		queueResume: U.route({
			method: "POST",
			path: "/agent/queue/resume",
			summary: "Let waiting messages go",
			description: "Releases a queue held after a stop or a refusal: what waits goes out now as one turn when nothing is running, or after the running turn otherwise. Name who serves that turn when the conversation has been re-pointed since the messages were queued."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Yp).output(hf),
		queueSchedule: U.route({
			method: "POST",
			path: "/agent/queue/schedule",
			summary: "Reschedule waiting messages",
			description: "Books what waits in the conversation's queue to go out by itself at another instant, or once another conversation has finished and its work has landed, holding it until then. Works on a queue that is held for any reason, or on messages waiting behind a running turn. A time already past, or a conversation with nothing left to land, lets them go now."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Xp).output(mf),
		resume: U.route({
			method: "POST",
			path: "/agent/resume",
			summary: "Run a refused turn again",
			description: "Sends the same turn again when the model provider's allowance refused it, with everything it originally carried except who serves it: the caller may name a different provider, harness or account, which is the usual answer to a spent allowance. It repeats the request rather than adding a new message to the conversation, so pressing it twice costs nothing and the agent is never told to continue work it has not started."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Kp).output(lf),
		switchAccount: U.route({
			method: "POST",
			path: "/agent/account",
			summary: "Move a conversation to another account",
			description: "Points the conversation at another connected account of the provider it runs on, for every turn from now on. It starts nothing by itself: with `run`, a turn held by a spent allowance or a stop runs again at once on that account, which is how a refused turn continues elsewhere. Without `carry` the next turn opens a fresh session seeded from the record."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Zp).output(Qp),
		rewind: U.route({
			method: "POST",
			path: "/agent/rewind",
			summary: "Go back to an earlier message",
			description: "Puts the files back as they stood at that point, drops every message after it, and forgets what the model remembered, so the next thing you say starts from there cleanly. Refused while a turn is running, because a restore cannot overwrite files an agent is editing; refused for a message with no saved state to return to; and refused when that position no longer holds the message you named, because the conversation moved since you read it."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Tv).output(Ev),
		commands: U.route({
			method: "GET",
			path: "/agent/commands",
			summary: "Shortcut commands the agent knows",
			description: "The commands a provider published the last time one of its turns ran, so a composer can offer them before this conversation has run anything. A running turn's own list wins over this one."
		}).meta({ guest: !0 }).input(rp).output(ip),
		routeChat: U.route({
			method: "POST",
			path: "/agent/route-chat",
			summary: "Choose what a new chat opens on",
			description: "Reads a new chat's opening message once and answers whichever of two questions it still has: the model, effort and account that conversation should run on, from what is connected and still has allowance left, and which of this sandbox's personas should handle it. `model` and `persona` on the ask say which halves to answer, and only those are put to the model. Asked once per chat, on the message actually sent, and never again: every turn after it runs on what the chat is wearing, which you are free to change. Answers with nothing, and a reason, whenever it cannot choose — a chat is never held up by this."
		}).meta({ floor: "collaborator" }).input(gv).output(bv),
		refusals: U.route({
			method: "GET",
			path: "/agent/refusals",
			summary: "The last time each provider said no",
			description: "What each model provider most recently refused and why. Read this alongside an account's usage: the usage says how full it was when last checked, this says whether it has since started turning work away."
		}).meta({ guest: !0 }).output(Lp)
	};
})), Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv, Kv, qv, Jv, Yv, Xv, Zv, Qv, $v = v((() => {
	V(), Vd(), Iv = I([
		"crash",
		"report",
		"detection"
	]), Lv = M({
		at: k().describe("When, in milliseconds."),
		kind: D().max(40).describe("What sort of thing it was: a console line, a request, a click, a route change."),
		message: D().max(300).describe("What it said, already truncated by the SDK.")
	}), Rv = M({
		email: D().max(320).optional().describe("An address they typed, to reach them about it. Unverified."),
		name: D().max(200).optional().describe("A name they typed. Unverified, and never identity.")
	}), zv = 20, Bv = F(D().max(60), D().max(300)).refine((e) => Object.keys(e).length <= zv, { message: `at most ${zv} context entries` }), Vv = M({
		kind: Iv.describe("A crash the SDK caught, something a person wrote in, or a problem the SDK noticed on its own."),
		message: D().min(1).max(1e3).describe("The error's own message, or the headline of what a person reported."),
		stack: D().max(2e4).optional().describe("The stack, verbatim from the browser."),
		url: D().max(2e3).optional().describe("Where it happened: the page's address, or a screen name in an app."),
		release: D().max(200).optional().describe("Which build it came from: a commit sha or a tag. With it the agent reads your real source rather than minified frames."),
		userAgent: D().max(400).optional().describe("What the browser said it was."),
		description: D().max(5e3).optional().describe("What the person typed, when a person is the one reporting."),
		reporter: Rv.optional().describe("Who says they are reporting it. Unverified by construction."),
		breadcrumbs: j(Lv).max(40).optional().describe("What happened just before, oldest first."),
		context: Bv.optional().describe("Whatever else the app attached: a route, a version, a locale."),
		fingerprint: D().max(200).optional().describe("Group by this instead of by the stack, when your app knows better than the stack does.")
	}), M({
		report: Vv,
		clientId: D().min(1).max(200).describe("The SDK's own id for this browser. Not a secret: it is what the rate limit counts against."),
		powNonce: D().max(400).optional(),
		key: D().max(200).optional()
	}), Hv = I([
		"open",
		"investigating",
		"resolved",
		"ignored"
	]), Uv = M({
		conversationId: D().describe("The conversation this run became."),
		at: k().describe("When it started, in milliseconds."),
		atCount: k().describe("How many times it had happened when this run started.")
	}), Wv = M({
		kind: Iv,
		title: D().min(1).max(300).describe("The one line this is listed under."),
		culprit: D().max(300).optional().describe("The frame it came from, when the stack named one."),
		automationId: G.describe("Which intake received it."),
		origin: D().max(400).optional().describe("Which site it came from."),
		firstSeen: k().describe("When it first happened, in milliseconds."),
		lastSeen: k().describe("When it last happened, in milliseconds."),
		count: k().describe("How many times this exact thing has arrived."),
		status: Hv.default("open").describe("Where it stands with you."),
		statusAt: k().optional().describe("When the status last changed, in milliseconds."),
		release: D().max(200).optional().describe("The build the latest one came from."),
		sample: Vv.describe("The most recent one, in full."),
		firedAt: k().optional().describe("What the count stood at the last time this woke an agent."),
		runs: j(Uv).max(20).optional().describe("The turns started for it.")
	}), Gv = Wv.extend({ id: G.describe("The issue's id, which is its fingerprint.") }), Kv = M({
		issues: j(Gv).describe("The inbox, most recently seen first."),
		invalid: j(D()).describe("Files in the issues directory that could not be read at all.")
	}), qv = M({ id: G.describe("Which issue.") }), Jv = M({
		id: G.describe("Which issue."),
		status: I([
			"open",
			"resolved",
			"ignored"
		]).describe("Where it now stands with you.")
	}), Yv = M({
		keyFromBrowsers: A().optional().describe("Let a browser report with the key alone, rather than only from a site you listed. Off unless you need it."),
		dailyReportMax: k().int().positive().optional().describe("How many reports a day this intake accepts at all."),
		escalateAfter: k().int().positive().optional().describe("How many more times a known crash must happen before it wakes an agent again."),
		antiBot: I(["pow"]).optional().describe("Make a person's browser solve a small puzzle before it accepts a written report."),
		title: D().max(80).optional().describe("The dialog's heading."),
		prompt: D().max(300).optional().describe("The line above the box they type in."),
		thanks: D().max(300).optional().describe("What it says once they have sent it."),
		askEmail: A().optional().describe("Ask for an address to reply to. Optional for them either way."),
		accent: D().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		captureCrashes: A().optional().describe("Catch uncaught errors automatically, as well as what people write in.")
	}), M({
		automationId: D(),
		title: D(),
		prompt: D(),
		thanks: D(),
		askEmail: A(),
		accent: D(),
		captureCrashes: A(),
		antiBot: I(["pow", "off"])
	}), M({
		ok: L(!0),
		id: D()
	}), Xv = M({
		origin: D(),
		allowed: A(),
		lastSeenAt: k(),
		loads: k()
	}), Zv = M({ origins: j(Xv) }), Qv = M({ automationId: G.describe("Which intake.") });
})), ey, ty, ny = v((() => {
	V(), ey = (e) => {
		if (e.startsWith("+") || e.startsWith("-")) return !1;
		try {
			return Intl.DateTimeFormat("en", { timeZone: e }).resolvedOptions().timeZone !== "";
		} catch {
			return !1;
		}
	}, ty = D().refine(ey, { message: "Not a zone name ICU knows, e.g. Europe/Warsaw or UTC." }), D().regex(/^\d{4}-\d{2}-\d{2}$/, "A calendar day as YYYY-MM-DD.");
})), ry, iy, ay, oy, sy, cy, ly, uy, dy, fy, py, my, hy, gy, _y, vy, yy, by, xy, Sy, Cy, wy, Ty, Ey = v((() => {
	V(), K(), e_(), Vd(), $v(), ny(), ry = I([
		"turn.settled",
		"agent.landed",
		"deps.broken",
		"deps.fixed"
	]), M({
		event: ry,
		agentId: D(),
		title: D().optional(),
		branch: D(),
		outcome: I([
			"landed",
			"conflict",
			"ready",
			"idle",
			"error"
		]),
		repos: j(M({
			repo: D(),
			from: D(),
			dir: D()
		})),
		deps: M({
			project: D(),
			command: D(),
			exitCode: k(),
			attempt: k(),
			logTail: D()
		}).optional()
	}), iy = P("kind", [
		M({
			kind: L("schedule").describe("On a clock."),
			cron: D().min(1).describe("When, in cron notation."),
			tz: ty.optional().describe("Which clock the times in the cron mean, as a zone name like Europe/Warsaw. Leave it out to use the sandbox's own setting, which is what you want unless this one chore belongs to a different place."),
			afterSessions: k().int().positive().optional().describe("Fire only once at least this many new sessions have been run since the last wake. A due run short of that is skipped, and says how far off it is.")
		}),
		M({
			kind: L("once").describe("At one moment, and then never again."),
			at: k().int().positive().describe("The moment it fires, in milliseconds. An absolute instant, so it means the same thing wherever the sandbox runs.")
		}),
		M({
			kind: L("event").describe("When something calls its webhook."),
			dailyMax: k().int().positive().optional().describe("How many webhook calls a day may wake the agent, across every caller. Absent is a modest default rather than unlimited.")
		}),
		M({
			kind: L("listener").describe("When a message arrives from somewhere outside."),
			provider: D().min(1).describe("Which service to listen to."),
			channelId: D().min(1).optional().describe("Narrow it to one channel or thread."),
			eventType: D().min(1).optional().describe("Narrow it to one kind of event."),
			mentioned: A().optional().describe("Only when the agent is actually addressed, rather than on everything said in earshot."),
			branch: D().min(1).optional().describe("Narrow it to one branch, for the sources that have branches. Absent means every branch of the repositories it matches."),
			allowedOrigins: j(D()).optional().describe("Which websites may reach the public endpoint, the chat widget's or the bug reporter's. Absent or empty admits nobody.")
		}),
		M({
			kind: L("workspace").describe("When something happens to the files or the repositories."),
			event: ry.describe("Which happening."),
			repo: D().min(1).optional().describe("Narrow it to one repository. Absent means any of them.")
		})
	]), ay = M({
		access: I(["public", "google"]).optional().describe("Who may write to it. Absent means anyone, which is the anonymous support box it looks like."),
		requireName: A().optional().describe("Ask a visitor for a name first. Cosmetic: the name is typed, so it reaches the model as something a stranger said, never as identity."),
		antiBot: I(["turnstile", "pow"]).optional().describe("How to keep bots out: a third-party check that needs the site's own keys, or a puzzle the sandbox sets and the widget solves, so a site with no such account still has something. Absent leaves the site allowlist and the rate limit as the whole boundary."),
		turnstileSiteKey: D().optional().describe("The public half of those keys, which ships to the visitor's browser."),
		turnstileSecret: D().optional().describe("The private half, which the sandbox keeps and the widget never sees."),
		googleClientId: D().optional().describe("The site's own sign-in client id. It cannot be ours: a sign-in is only issued to an approved origin, and no single client can list every customer's domain."),
		title: D().max(80).optional(),
		greeting: D().max(500).optional(),
		accent: D().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		position: I([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]).optional(),
		dailyMessageMax: k().int().positive().optional(),
		conversationMessageMax: k().int().positive().optional(),
		sessionTtlMinutes: k().int().positive().optional()
	}), M({
		automationId: D(),
		title: D(),
		greeting: D(),
		accent: D(),
		position: I([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]),
		access: I(["public", "google"]),
		requireName: A(),
		antiBot: I([
			"turnstile",
			"pow",
			"off"
		]),
		turnstileSiteKey: D().optional(),
		googleClientId: D().optional()
	}), M({
		salt: D(),
		difficulty: k().int().positive()
	}), M({
		conversationId: D().min(1).max(200),
		content: D().min(1),
		displayName: D().max(200).optional(),
		idToken: D().optional(),
		turnstileToken: D().optional(),
		powNonce: D().optional(),
		history: j(M({
			author: D().optional(),
			content: D()
		})).max(50).optional()
	}), M({
		replies: j(M({
			seq: k(),
			at: k(),
			text: D()
		})),
		cursor: k()
	}), oy = M({
		label: D().max(60).optional().describe("What to call these people on screen."),
		ids: j(D().min(1).max(200)).max(200).optional().describe("Sender ids, as the service names them, never display names."),
		groups: j(D().min(1).max(200)).max(50).optional().describe("Group ids the service reports on a sender, a Discord role. Only for a source whose messages carry them."),
		actsAs: G.optional().describe("Which persona their wakes speak as. Absent is no persona: the full toolbox, reaching no account."),
		requireApproval: A().optional().describe("Hold their wakes for a person, even when the automation itself does not.")
	}).refine((e) => (e.ids?.length ?? 0) + (e.groups?.length ?? 0) > 0, { message: "a sender rule must name at least one id or group" }), sy = M({
		rules: j(oy).max(50).describe("Walked in order; the first rule naming the sender decides."),
		others: I([
			"allow",
			"hold",
			"ignore"
		]).describe("What a sender no rule names gets: the automation as configured, a hold for a person, or nothing at all.")
	}), cy = M({
		id: G.describe("The automation's id."),
		trigger: iy.describe("What sets it off: a schedule, an event in the workspace, a message arriving from outside, or a webhook."),
		guard: D().min(1).optional().describe("A command run before the wake that decides whether there is anything to do. Skipped by the guard is often the most useful thing an automation can report."),
		prompt: D().min(1).describe("What the woken agent is told."),
		webchat: ay.optional().describe("Settings for the public chat widget, for an automation that answers visitors."),
		issues: Yv.optional().describe("Settings for the bug reporter, for an automation that takes crash reports from your own sites and apps."),
		allowedTools: j(D().min(1)).optional().describe("Narrow the woken turn to these tools. For one driven by an outside message this list is the real boundary, because prompt wording is only advice and an empty toolbox is not."),
		models: j(cf).min(1).max(10).describe("Which models this automation may run on, best first. Required, and nothing is chosen for you: work that fires while nobody is watching spends a real allowance, so it names the models it spends rather than inheriting one. Tried in order, so a spent account does not silently stop the job."),
		account: D().optional().describe("Which account pays for it."),
		actsAs: G.optional().describe("Which persona it speaks as. An unwatched turn naming none reaches no signed-in account at all."),
		senders: sy.optional().describe("Who may talk to it, and as whom: rules by sender id or group, each naming the persona those people get, plus what everyone else gets. Absent admits everyone the trigger's filters do."),
		requireApproval: A().optional().describe("Hold every fire for a person instead of running it. Only a person can release one of those."),
		holdForSeconds: k().optional().describe("Hold each fire this long before running it anyway, which is a delay rather than a decision."),
		chore: A().optional().describe("This automation is a maintenance job, which is what files it under chores rather than among ordinary automations."),
		enabled: A().describe("Whether it fires at all.")
	}), ly = M({
		id: G.describe("This waiting item's own id, which approving and rejecting take."),
		automationId: D().describe("Which automation it came from."),
		payload: D().optional().describe("What set it off, kept whole so an approved wake carries the same thing it would have had. Absent for one on a schedule, which carries nothing."),
		origin: Jd.optional().describe("Where the message came from, kept alongside the payload so an approved wake appears on the board exactly as an automatic one would have."),
		title: D().optional().describe("What the conversation would be called."),
		conversationId: D().optional().describe("The thread this belongs to, when it has one, so approving continues that conversation rather than opening a new one. Without it, one visitor's chat becomes a card per approved message and an agent that meets them again every turn."),
		sessionId: D().optional().describe("The provider session that thread last ran on."),
		thread: D().optional().describe("Which inbound thread this belongs to, so the approved run continues that thread's memory rather than a fresh one."),
		actsAs: G.optional().describe("Which persona the approved run speaks as, decided when it was held."),
		createdAt: k().describe("When it started waiting, in milliseconds."),
		autoRunAt: k().optional().describe("When it goes ahead on its own, in milliseconds, for a hold that is only a delay. Absent for one that genuinely waits on a person.")
	}), uy = M({
		agents: j(X).describe("The conversations."),
		rev: k().describe("Which version of the fleet this is. The fleet is published as whole snapshots, so without a version a list read before a change but delivered after it would silently undo that change. Drop any list older than the newest you have already applied."),
		held: j(ly).default([]).describe("Automations waiting at the door for a yes, put alongside the running conversations so needs-you sits beside working rather than on a page nobody opens.")
	}), dy = M({ approvals: j(ly).describe("Everything waiting for a yes.") }), fy = M({ id: D().describe("Which waiting item.") }), py = M({
		at: k(),
		outcome: I([
			"completed",
			"skipped",
			"error",
			"interrupted"
		]),
		detail: D().optional(),
		conversationId: D().optional()
	}), my = cy.extend({
		runs: j(py),
		nextRun: k().optional(),
		webhookToken: D().optional().describe("What a caller presents at /automations/{id}/fire, for an event automation. Shown to a maintainer or the owner only."),
		ingestKey: D().optional().describe("What a client with no website origin presents to a bug intake. Shown to a maintainer or the owner only.")
	}), hy = M({ automations: j(my) }), gy = M({
		id: D().describe("The sender id the service vouches for, what a rule stores."),
		name: D().describe("What they were called on their last message, for display only."),
		groups: j(D()).optional().describe("The group ids the service reported on their last message, a Discord role list."),
		firstSeenAt: k().describe("When they first reached an automation here, in milliseconds."),
		lastSeenAt: k().describe("When they last did, in milliseconds."),
		messages: k().describe("How many of their messages reached an automation's filters, admitted or not.")
	}), _y = M({ senders: j(gy).describe("Newest first.") }), vy = M({ provider: D().min(1).describe("Which listener source.") }), yy = M({ id: D() }), by = M({
		id: D(),
		enabled: A()
	}), xy = M({
		label: D().min(1),
		placeholder: D().min(1),
		hint: D().min(1).optional()
	}), Sy = M({
		provider: D().min(1),
		label: D().min(1),
		logo: D().min(1).optional(),
		icon: D().min(1).optional(),
		events: j(M({
			value: D().min(1),
			label: D().min(1)
		})),
		channel: xy,
		branchField: xy.optional(),
		sender: xy.optional(),
		senderGroup: xy.optional(),
		mentionLabel: D().min(1).optional(),
		starterPrompt: D().min(1).optional(),
		requires: j(D().min(1)).default([]),
		enabled: A()
	}), Cy = I(["create", "configure"]), wy = M({
		id: D().min(1),
		title: D().min(1),
		logo: D().min(1).optional(),
		icon: D().min(1).optional(),
		requires: j(D().min(1)).default([]),
		trigger: iy,
		guard: D().min(1).optional(),
		holdForSeconds: k().int().positive().optional(),
		prompt: D().min(1),
		note: D().min(1).optional(),
		setup: D().min(1).optional(),
		description: D().min(1).optional(),
		offer: Cy.optional(),
		chore: A().optional()
	}), Ty = M({
		sources: j(Sy),
		templates: j(wy)
	});
})), Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy, Iy, Ly, Ry, zy, By, Vy, Hy, Uy = v((() => {
	V(), K(), Dy = I(["github", "gitlab"]), Oy = I([
		"queued",
		"running",
		"success",
		"failed",
		"canceled",
		"skipped"
	]), ky = M({
		repo: D().describe("Which workspace repository it belongs to."),
		host: Dy.describe("Which forge is running it."),
		project: D().describe("The project there, as that forge names it."),
		runId: k().describe("The forge's own id for the run, which is what re-running and cancelling take."),
		title: D().optional().describe("The run's headline, usually the commit subject or the pull request's title. Absent means falling back to the branch and commit."),
		authorName: D().optional().describe("Who the forge credits for setting it off."),
		authorAvatarUrl: D().optional().describe("Their picture, hosted by the forge. Absent means drawing their initials instead."),
		trigger: D().optional().describe("What set it off, in the forge's own word rather than flattened into a shared vocabulary, because the forge's word is the precise one."),
		workflow: D().optional().describe("Which workflow it is a run of, where a push starts several. Absent where a commit has one pipeline."),
		branch: D().describe("Which branch."),
		sha: D().describe("Which commit."),
		status: Oy.describe("How it is going. Queued means the forge has accepted it and nothing is executing it yet, which is a different thing to wait on than a run actually in progress."),
		url: D().describe("Its page on the forge."),
		createdAt: k().describe("When it started, in milliseconds."),
		durationSeconds: k().optional().describe("How long it took."),
		failedJobs: j(D()).optional().describe("What broke, by name. Fetched only for failed runs, so that a notification or a screen can say what went wrong rather than just that something did.")
	}), Ay = M({
		name: D().describe("The job's name."),
		status: Oy.describe("How it went."),
		stage: D().optional().describe("Which stage it belongs to, where the pipeline groups its jobs that way."),
		needs: j(D()).optional().describe("Which jobs in this run it declared it waits on: the real shape of the pipeline. Absent means nothing could be read, which is different from an empty list, which is the claim that it waits on nothing."),
		startedAt: k().optional().describe("When it began, in milliseconds. Absent while it is queued."),
		finishedAt: k().optional().describe("When it ended, in milliseconds."),
		durationSeconds: k().optional().describe("How long it took."),
		webUrl: D().optional().describe("Its page on the forge, which is the shortest path from this step failed to the log that says why.")
	}), jy = M({ jobs: j(Ay).describe("The steps inside one run. Fetched separately from the run list, so that list stays cheap.") }), My = M({
		repo: D().describe("Which workspace repository."),
		host: Dy.describe("Which forge it lives on."),
		project: D().describe("The project there."),
		url: D().describe("Its page on the forge."),
		hookWarning: D().optional().describe("Present when the sandbox could not register for instant notifications, with what happened. Without them the sandbox polls instead, so this costs a couple of minutes' delay rather than the feature."),
		hookRecipe: D().optional().describe("What to paste into the repository's webhook settings by hand, secret included. Shown to a maintainer or the owner only.")
	}), Ny = I([
		"fix-up",
		"reported",
		"spent"
	]), Py = I([
		"turns",
		"no-change",
		"stopped",
		"interrupted",
		"turn-failed",
		"gone",
		"refused"
	]), Fy = M({
		kind: Ny.describe("What was decided."),
		reason: Py.optional().describe("Why the fix agent handed it back, on a `spent` decision."),
		conversationId: D().optional().describe("The conversation working on it, when one is."),
		at: k().describe("When that was decided, in milliseconds."),
		detail: D().optional().describe("One short sentence on why, in the sandbox's words.")
	}), Iy = M({
		repo: D().describe("Which workspace repository."),
		branch: D().describe("Which main-line branch."),
		since: k().describe("When its first job failed, in milliseconds."),
		runId: k().describe("The newest run that failed on it."),
		jobs: j(D()).describe("The jobs failing on it now, by name: the newest failed run's failures, and any that failed since."),
		fixer: D().optional().describe("The one conversation working on it, which every failure goes to until the branch passes. Absent while nobody is on it."),
		decision: Fy.optional().describe("The latest thing decided about it: `fix-up` while the fix agent has it, `spent` once it waits for you (its turns are used up, or it stopped without a fix), `reported` when repairs are off.")
	}), Ly = M({
		repos: j(My).describe("Which workspace repositories are wired to a forge, and how each one's notifications are set up."),
		runs: j(ky).describe("Runs across all of them, newest first."),
		failures: j(Iy).optional().describe("Every main-line branch failing right now, with the fix agent on it. Absent from a daemon that keeps none.")
	}), Ry = M({
		repo: D().describe("Which workspace repository. The project behind it is resolved fresh each call, so a stale screen cannot act on one the workspace no longer maps to."),
		runId: k().describe("Which run, by the forge's own id.")
	}), zy = Ry.extend({
		pick: of.describe("Which model to open the conversation on, when somebody chose one. Leave it out for the sandbox's own choice, which is the ordinary path."),
		fallback: of.describe("The model a new chat opens on for whoever pressed, for when nobody chose one and no model set for fixing pipelines can run. Used while this sandbox can serve its provider; left out, or not servable, the sandbox takes its default provider when connected, else the first one connected."),
		mode: I(["continue", "start-over"]).optional().describe("What to do about the attempt already made at this run, when there is one. `continue` carries on in that conversation; `start-over` stops it if running, files it away, and opens the next attempt on a clean worktree. Leave it out for the plain press: an attempt that ended is continued, a fresh failure gets attempt 1, and one still in play answers CONFLICT with why."),
		force: A().optional().describe("Open the conversation even when every failed job died in its runner's own setup, which is the fleet's fault and nothing an agent on the code can repair. Left out, such a run is refused with that sentence.")
	}), By = M({ conversationId: D().describe("The conversation that was opened, already holding the failure. Open it to watch, or attach to its turn.") }), Vy = I([
		"idle",
		"running",
		"passed",
		"failed",
		"error",
		"cancelled"
	]), Hy = M({
		status: Vy.describe("Where the run is. Failed and error are deliberately different: failed means the code is wrong, error means the command could not be run at all, and calling the second one a test failure would send an agent hunting a bug that is not there."),
		command: D().describe("What actually ran, echoed here rather than read back from the settings, so a result looked at after the setting changed still says what produced it."),
		startedAt: k().optional().describe("When it began, in milliseconds."),
		finishedAt: k().optional().describe("When it ended, in milliseconds."),
		exitCode: k().optional().describe("How the command exited."),
		timedOut: A().optional().describe("It was killed for taking too long rather than finishing."),
		session: D().optional().describe("The terminal it runs in, which is where to watch it. Absent where the sandbox has no terminals, in which case there is nothing to attach to."),
		output: D().describe("The end of what it printed, as plain text with the colour codes and redrawn progress lines resolved away. The end rather than the beginning, because a suite's verdict is at the end. Empty while it runs, and for one that was killed.")
	});
})), Wy, Gy, Ky, qy, Jy, Yy, Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib = v((() => {
	V(), K(), e_(), Uy(), Vd(), Y(), Wy = I([
		"staged",
		"unstaged",
		"conflicted"
	]), Gy = M({
		side: Wy.optional().describe("Narrow to one of the three lists a repository's changes split into. Leave it out for all of them, which is the whole repository."),
		origin: D().min(1).optional().describe("Narrow to the files one conversation landed. Leave it out for everyone's, including your own edits.")
	}), Ky = 1e3, qy = j(D().min(1)).max(Ky).describe("Exactly these repository-relative paths. For anything bigger than a hand-picked selection, describe a scope instead."), Jy = M({
		paths: qy.optional(),
		scope: Gy.optional().describe("What to act on, described rather than listed, so it covers every matching file in the repository and not just the ones a list could hold.")
	}), Yy = { message: "name paths or a scope, not both" }, Xy = (e) => e.paths === void 0 || e.scope === void 0, Zy = J.extend({
		message: D().min(1).describe("The commit message."),
		stage: Jy.refine(Xy, Yy).optional().describe("What to stage before committing. Leave it out to record the index exactly as it stands; give it an empty object to stage everything first.")
	}), Qy = J.extend(Jy.shape).describe("What to throw away. Neither paths nor a scope discards every uncommitted change in the repository.").refine(Xy, Yy), $y = J.extend(Jy.shape).describe("What to move across the index. Nothing on disk changes either way.").refine(Xy, Yy), eb = J.extend({ branch: D().min(1).optional().describe("Which branch to push. Leave it out for the checked-out one. A branch with no upstream yet gets one set on this push.") }), tb = I([
		"hook",
		"remote",
		"transport"
	]), nb = Hy.extend({
		repo: D().describe("The repository this run is about, the same id the routes take."),
		reason: D().optional().describe("Why not, in git's own words: the last verdict line, for a row that has room for one line. The whole tail is `output`."),
		refusedBy: tb.optional().describe("Who refused a failed push: this repository's own pre-push hook (what it printed is about the code), the remote (pull first), or the transport (credentials, network: retry). Absent while it runs and for a push that went.")
	}), rb = J.extend({ path: D().min(1).describe("The file to read, relative to the repository root.") }), ib = J.extend({
		path: D().min(1).describe("Where to write, relative to the repository root. Missing folders are created."),
		content: D().describe("The file's whole new contents.")
	}), ab = J.extend({
		path: D().min(1).describe("The file, relative to the repository root."),
		side: Wy.describe("Which comparison you want. A file that is staged and then edited again has genuinely different answers for each, which is why this is required rather than assumed.")
	}), ob = M({
		branch: D().describe("The checked-out branch."),
		dirty: A().describe("Whether anything is uncommitted."),
		files: j(D()).describe("Every path with something pending, staged or not.")
	}), sb = M({ files: j(D()).describe("Every path git tracks, relative to the repository root. Ignored and untracked files are not here.") }), cb = M({
		path: D().describe("The path, as asked for."),
		content: D().describe("The file's contents as they stand on disk.")
	}), M({ repo: D().min(1).describe("Which repository.") }).extend(Jy.shape).refine(Xy, Yy), lb = M({
		path: D().describe("The path, relative to the repository root. For a rename this is the new one."),
		status: I([
			"added",
			"modified",
			"deleted",
			"renamed",
			"type-changed",
			"conflicted"
		]).describe("What happened to it. Conflicted is not a kind of edit: nothing can be committed anywhere in the repository while one exists."),
		from: D().optional().describe("Where a renamed file came from."),
		additions: k().optional().describe("Lines added. Absent for a binary file, and for an untracked one, which has nothing to compare against."),
		deletions: k().optional().describe("Lines removed. Absent for the same reasons additions is."),
		code: M({
			additions: k(),
			deletions: k()
		}).optional().describe("The same +/− with every comment stripped from both sides, which is what a review shows beside a diff that opens on code alone. Absent when the file cannot be read that way (binary, too large, or a language this build ships no grammar for): git's own counts above are then the reading.")
	}), ub = M({
		remote: D().optional().describe("The remote this branch pushes to. Absent means none is configured. In a fork with two remotes, pushing to the wrong one succeeds and leaves the count stuck, which is why this says which."),
		branch: D().optional().describe("The checked-out branch. Absent when the repository is on a bare commit, or has no commits yet."),
		upstream: D().optional().describe("The branch on the remote this one follows. Absent means the next push will publish it."),
		ahead: k().describe("Commits you have that the remote does not."),
		behind: k().describe("Commits the remote has that you do not, as of the last fetch. Fetch before trusting it.")
	}), db = M({
		name: D().describe("The branch name."),
		current: A().describe("Whether this is the one checked out."),
		upstream: D().optional().describe("The branch on the remote it follows, if any."),
		ahead: k().describe("Commits this branch has that its remote counterpart does not."),
		behind: k().describe("Commits its remote counterpart has that it does not."),
		gone: A().optional().describe("The branch it followed no longer exists on the remote, usually because a merged pull request deleted it. The signal that this one is safe to delete."),
		at: k().describe("When its tip was committed, in milliseconds. Lists are newest first.")
	}), fb = M({
		name: D().describe("The full name, such as origin/main."),
		remote: D().describe("Just the remote part, so a picker can group by it without re-parsing."),
		branch: D().describe("Just the branch part."),
		at: k().describe("When its tip was committed, in milliseconds, as this repository last saw it.")
	}), pb = M({
		branches: j(db).describe("Branches in this repository."),
		remotes: j(fb).describe("Branches on its remotes, as last seen. Sent together with the locals so a switcher never draws a half-filled list.")
	}), mb = J.extend({
		name: zd.describe("The new branch's name."),
		start: D().min(1).optional().describe("Where to start it: a commit or another branch. Leave it out to start from where you are."),
		checkout: A().optional().describe("Switch to it as well as creating it.")
	}), hb = J.extend({
		name: zd.describe("The branch to delete."),
		force: A().optional().describe("Delete it even though it holds work that was never merged. The deliberate retry after the first attempt refuses.")
	}), gb = I([
		"merge",
		"rebase",
		"cherry-pick",
		"revert"
	]), _b = M({
		repo: D().describe("The repository asked about."),
		operation: gb.optional().describe("Which operation the working tree is stuck inside. Absent means it is not stuck at all, which is almost always. While one is present git refuses nearly everything else, and abandoning it is the only way out.")
	}), vb = I([
		"hidden",
		"byproduct",
		"checkout",
		"oversized",
		"root"
	]).describe("Why it looks like scratch. A new hidden directory that is not one a project keeps on purpose (like `.github`). A log, dump, backup or editor leftover. A git checkout of its own. A new file past the size source code reaches. Or a new dotfile at the top of a workspace whose projects are the repositories inside it."), yb = M({
		path: D().describe("Relative to its repository. A directory ends in a slash and stands for everything inside it."),
		reason: vb,
		files: k().optional().describe("How many files it holds. Absent for a checkout of its own, whose contents are not walked."),
		bytes: k().optional().describe("Their total size in bytes. Absent exactly when `files` is.")
	}), bb = M({
		repo: D(),
		branch: D().optional().describe("The checked-out branch. Absent in a repository that has no commits yet."),
		conflicted: j(lb).describe("Paths a merge or rebase could not finish. First, because nothing anywhere in this repository can be committed until they are resolved. Held apart from the two lists below, because staged or not is not a question one of these has an answer to."),
		operation: gb.optional().describe("What halted, when something did. This is the sentence that explains the conflicts above and names the way out of them."),
		staged: j(lb).describe("What a plain commit would record right now."),
		unstaged: j(lb).describe("Edits on disk that are not staged, plus untracked files. A path can be in both lists at once with different line counts, which is why they are separate."),
		truncated: M({
			staged: k().describe("Staged changes not listed above."),
			unstaged: k().describe("Unstaged changes not listed above.")
		}).optional().describe("How many changes were cut from each of the two lists above. A freshly cloned monorepo or a mass delete runs to six figures, which no screen can draw, so past a budget the lists arrive short and this says by how much on each side. Absent means they are complete."),
		scratch: j(yb).optional().describe("Untracked paths that look like scratch. Staging or committing everything leaves them out, while staging one by its own path takes it like any other file. Absent when there are none."),
		remote: ub.optional().describe("Where this repository stands against its remote."),
		origins: F(D(), j(D())).optional().describe("Which conversation put each path here, newest first, keyed by path. Only work that went through a merge can appear: edits made in the shared tree, in a terminal, or by a person are simply absent rather than guessed at."),
		error: D().optional().describe("Why the repository could not be read at all, in git's own words. A repository left broken by a failed import arrives with empty lists and this set, rather than vanishing from the answer with nothing to act on.")
	}), xb = M({
		title: D().optional().describe("The conversation's title. Absent for one that never got as far as having a title."),
		provider: Hd.describe("Which model provider it ran on."),
		landedMessage: vg.optional().describe("What the merged work did, drafted by the conversation itself. Carried here as well as on its card, because merged lines outlive the card: archiving a finished conversation does not uncommit its work.")
	}), Sb = M({
		repos: j(bb).describe("One entry per repository that has something pending, is out of step with its remote, or could not be read. A clean repository is simply absent."),
		originAgents: F(D(), xb).optional().describe("Who each conversation named above is, keyed by id, so a caller need not look them up. Absent when nothing in the review can be attributed."),
		committing: j(D()).optional().describe("Repositories with a commit running right now. The sandbox's answer rather than any one tab's, so a reload, a second window and another device all know. Absent means nothing is committing.")
	}), Cb = M({
		committed: A().describe("Whether a commit was actually recorded."),
		changes: bb.optional().describe("What this repository looks like now, read in the same breath as the commit so a caller can redraw from here instead of asking for a fresh scan. Absent means there is nothing left to show."),
		originAgents: F(D(), xb).optional().describe("Who the conversations named in those changes are. Merge it over what you already hold rather than replacing: other repositories still name their own.")
	}), wb = M({
		dir: D().describe("Where the package lives, relative to its repository. Empty when the repository is itself one package."),
		name: D().describe("The name the package declares for itself.")
	}), Tb = M({
		repo: D().describe("Which repository."),
		modules: j(wb).describe("Its packages.")
	}), Eb = M({ repos: j(Tb).describe("Every repository with the packages inside it.") }), Db = lb.extend({ landed: A().describe("Whether your workspace already holds this content. Read from the tree at request time, not from what a land recorded: discard a landed file in the Changes panel and this goes back to false, which is what puts it back under Land now.") }), Ob = M({
		path: D().describe("The manifest, relative to the repository root, such as video/package.json."),
		added: j(D()).describe("The names it declares now and did not declare before, sorted. Only new names: a version bump of a dependency already there is not listed.")
	}), kb = M({
		repo: D().describe("Which repository."),
		branch: D().optional().describe("The branch this conversation's work sits on."),
		changes: j(Db).describe("What it changed there."),
		modules: j(wb).describe("The packages of the tree these changes came from, so a review can group by package. Carried with the changes rather than looked up separately, because a package the conversation has just created exists only in its own copy and the shared tree has never heard of it."),
		addedDependencies: j(Ob).optional().describe("Dependencies the changed manifests here declare that they did not before (package.json, pyproject.toml, requirements.txt), one entry per manifest that gained any. The review is where a new dependency is approved: a conversation installs freely in its own copy, and this is what the project takes on if the work lands. Absent when none was added.")
	}), Ab = M({
		repos: j(kb).describe("One entry per repository the conversation touched."),
		absorbed: k().describe("How many of this conversation's files your own history already carries, and which are therefore not listed as differences any more."),
		conflicts: j(Yg).optional().describe("Why the last merge refused, when one did. Carried here as well as in the merge's own answer, because a conflict is found the moment a turn ends and dealt with hours later on this surface, which would otherwise open with nothing to explain what it promised to resolve."),
		elsewhere: j(M({
			repo: D().describe("Which repository."),
			branch: D().optional().describe("The branch its copy is standing on. Absent where it stands on no branch at all, which is a state git allows."),
			carried: A().optional().describe("Whether everything the conversation committed there has also been copied onto its own branch, so what is listed here and what a merge brings include it. False where a commit would not copy over cleanly. Absent from a sandbox too old to copy it, which never did."),
			uncommitted: A().optional().describe("Whether its copy there holds uncommitted changes to tracked files, which no merge brings until they are committed there.")
		})).optional().describe("Repositories whose copy the conversation left standing on a different branch of its own. What is listed for them is this conversation's own branch, onto which each turn copies what it committed on the other branch unless `carried` says it could not."),
		scratch: j(M({
			repo: D().describe("Which repository."),
			paths: j(yb).describe("What it keeps out there.")
		})).optional().describe("Untracked files the conversation left in its copy that look like scratch: logs, probe scripts, dumps, a checkout of its own. They are not in the list above and no merge carries them. They stay in its copy until they are included or deleted, and go with the copy when it is archived or retired. Absent when there are none.")
	}), jb = Ab.pick({ conflicts: !0 }), Mb = M({
		id: D().min(1).describe("Which conversation."),
		repo: D().min(1).describe("Which repository of its composition."),
		paths: j(D().min(1)).min(1).max(Ky).describe("Paths exactly as the review lists them under scratch, a directory with its trailing slash.")
	}), Nb = M({
		sha: D().describe("The commit."),
		short: D().describe("Its abbreviated hash, which is what a reader recognises it by."),
		subject: D().describe("Its first line."),
		author: D().describe("Who committed it."),
		at: k().describe("When it was authored, in milliseconds."),
		changes: j(lb).describe("The conversation's files that this commit is the newest carrier of, as the conversation changed them. Every file appears under exactly one commit, so these counts add up to the work rather than over-counting a file that history touched twice.")
	}), Pb = M({
		repo: D().describe("Which repository."),
		commits: j(Nb).describe("The commits carrying this conversation's work there, newest first."),
		modules: j(wb).describe("The packages of the tree these files came from, so a review can group them by package.")
	}), Fb = M({
		repos: j(Pb).describe("One entry per repository holding committed work of this conversation."),
		unaccounted: k().describe("How many of the conversation's absorbed files none of these commits carries. Above zero means its content reached your main line by some other road, so the commits listed are not the whole story.")
	});
})), Lb = v((() => {})), Rb, zb, Bb, Vb, Hb, Ub, Wb, Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb, $b = v((() => {
	Ym(), K(), Rb = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), zb = [
		/\bgit\s+push\b[^|;&]*\s(?:-f\b|--force\b|--force-with-lease\b|--delete\b)/,
		/\bgit\s+reset\b[^|;&]*\s--hard\b/,
		/\bgit\s+clean\b[^|;&]*\s-{1,2}[a-zA-Z]*f/,
		/\bgit\s+branch\b[^|;&]*\s(?:-D\b|--delete\s+--force\b|--force\s+--delete\b)/,
		/\bgit\s+filter-branch\b/
	], Bb = [/\bgit\s+switch\b/, /\bgit\s+checkout\b(?![^|;&]*\s--\s)(?![^|;&]*\s\.(?:\s|$))/], Vb = [/\{\{secret:[A-Za-z0-9_./-]+\}\}/], Hb = String.raw`[\w~$.{}/\\-]*`, Ub = [
		/(?<![\w.])\.env(?!\.(?:example|sample|template))(?:\.[\w-]+)?\b/,
		/\.ssh(?!\w)(?!\/(?:known_hosts|config|authorized_keys|environment)(?!\w))(?!\/[\w.-]*\.pub(?!\w))(?:\/[\w.\-/]*)?/,
		/\bid_(?:rsa|dsa|ecdsa|ed25519)\b(?!\.pub\b)/,
		new RegExp(String.raw`${Hb}\.aws/credentials\b`),
		new RegExp(String.raw`${Hb}\.npmrc(?!\.(?:example|sample|template))\b`),
		new RegExp(String.raw`${Hb}\.git-credentials\b`),
		new RegExp(String.raw`${Hb}\.credentials\.json\b`)
	], Wb = [
		/\b(?:npm|pnpm|yarn|bun)\s+publish\b/,
		/\bcargo\s+publish\b/,
		/\bgh\s+release\s+create\b/,
		/\bdocker\s+push\b/,
		/\btwine\s+upload\b/
	], Gb = String.raw`localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|::1`, Kb = String.raw`(?:${Gb})(?::\d+)?(?=[/?#\s'"\x60]|$)`, new RegExp(String.raw`^(?:${Gb})$`, "i"), new RegExp(String.raw`\bfetch\(\s*['"\x60]https?://(?!${Kb})`, "g"), qb = /* @__PURE__ */ new Map([
		["curl", "url"],
		["wget", "url"],
		["nc", "host"],
		["ncat", "host"],
		["netcat", "host"],
		["telnet", "host"],
		["ftp", "host"],
		["ssh", "host"],
		["scp", "spec"],
		["sftp", "spec"],
		["rsync", "spec"],
		["socat", "socket"]
	]), Jb = (e) => new RegExp(String.raw`(?<![\w.$-])(${e.join("|")})(?:\.exe)?(?=\s+[^\s=(),:;|&<>?+*/%!\]}])`, "g"), Jb([...qb.keys()]), Jb([
		String.raw`python[23]?(?:\.\d+)?`,
		"node",
		"nodejs",
		"deno",
		"bun",
		"ruby",
		"perl",
		"php"
	]), Yb = [
		/\bmkfs(?:\.\w+)?\b/,
		/\bwipefs\b/,
		/\bblkdiscard\b/,
		/\bsgdisk\b[^|;&]*\s(?:--zap-all|-Z)\b/,
		/\bdd\b[^|;&]*\bof=(?:\/dev\/|['"`]\/dev\/)/,
		/\bshred\b[^|;&]*\s\/dev\//,
		/>\s*\/dev\/(?:[shv]d[a-z]|nvme\d|disk\d|mmcblk\d)/
	], Xb = [
		/\b(?:docker|podman)\s+volume\s+(?:rm|remove|prune)\b/,
		/\b(?:docker|podman)\s+system\s+prune\b/,
		/\b(?:docker(?:\s+compose|-compose)?|podman-compose)\s+down\b[^|;&]*\s(?:-v\b|--volumes\b)/
	], Rb(zb), Rb(Bb), Rb(Vb), Rb(Ub), Rb(Wb), Rb(Yb), Rb(Xb), Zb = {
		"git.destructive": "rewrite or discard git history",
		"git.branch-switch": "move a checkout you share with this conversation onto another branch",
		"files.destructive": "delete files recursively",
		"system.destructive": "wipe a disk, or delete a whole root directory",
		"container.state": "delete a container volume or the data in it",
		"secrets.access": "read credential material",
		"package.publish": "publish or release a package",
		"network.outbound": "send a request out to the internet"
	}, Qb = {
		"git.destructive": [
			{
				code: "git push --force",
				qualifier: "also -f and --force-with-lease"
			},
			{ code: "git push --delete" },
			{ code: "git reset --hard" },
			{ code: "git clean -f" },
			{ code: "git branch -D" },
			{ code: "git filter-branch" },
			{
				code: "rm .git",
				qualifier: "any flags: a checkout's link to its history"
			},
			{
				code: "git init",
				qualifier: "only in the current folder, which may already be a checkout"
			}
		],
		"git.branch-switch": [{ code: "git switch <branch>" }, {
			code: "git checkout <branch>",
			qualifier: "not `git checkout -- <path>` or `git checkout .`, which restore files and move nothing"
		}],
		"files.destructive": [
			{ code: "rm -rf <path>" },
			{
				code: "fs.rm(<path>, { recursive: true })",
				qualifier: "also rmSync, rmdir, rmdirSync"
			},
			{ code: "rimraf(<path>)" },
			{
				code: "find <path> -delete",
				qualifier: "also -exec rm and -execdir rm"
			},
			{ code: "xargs rm" }
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
				qualifier: "also find / -delete; only when the target is a root, listed below"
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
		"network.outbound": [
			{
				code: "curl https://…",
				qualifier: "also wget; a literal loopback address does not count, even with a variable port"
			},
			{
				code: "curl $URL",
				qualifier: "a destination built at run time counts, since its host can't be read beforehand"
			},
			{
				code: "nc host.example 443",
				qualifier: "also ncat, netcat, telnet, ftp and ssh"
			},
			{
				code: "scp file host:/path",
				qualifier: "also sftp and rsync with a remote side, and socat TCP:host:port"
			},
			{
				code: "python3 -c 'import urllib…'",
				qualifier: "any interpreter's inline code that opens a connection"
			},
			{
				code: "fetch(\"https://…\")",
				qualifier: "in a script"
			}
		]
	};
})), ex, tx, nx, rx, ix, ax, ox, sx, cx, lx, ux, dx = v((() => {
	V(), $b(), K(), ex = /* @__PURE__ */ new Set(["system.destructive"]), tx = /* @__PURE__ */ new Set([
		"system.destructive",
		"container.state",
		"files.destructive"
	]), nx = (e) => e === "sandbox" ? ex : tx, rx = {
		sandbox: "/ and /history. Not /work, /usr or /etc: the worktree's changes are uncommitted work, and the container comes back from its image.",
		device: "/, a home directory, a Windows drive, and the top-level directories an OS keeps."
	}, ix = (e) => Object.fromEntries(Xd.options.map((t) => [t, nx(t).has(e) ? "hard" : "judged"])), ax = (e) => Xd.options.filter((t) => e.tiers[t] === "hard").length, Zd.options.map((e) => ({
		commandClass: e,
		label: Zb[e],
		patterns: Qb[e],
		tiers: ix(e),
		...e === "system.destructive" ? { notes: rx } : {}
	})).sort((e, t) => ax(t) - ax(e)), ox = I([
		"off",
		"watch",
		"on"
	]), sx = I([
		"automatic",
		"ask",
		"never"
	]), cx = I([
		"allow",
		"ask",
		"refuse"
	]), M({
		decision: cx.describe("Run it, ask the owner, or refuse it."),
		sentence: D().describe("What this command does and why it was allowed, held or refused, in one plain sentence."),
		policyLine: D().optional().describe("A line the owner could add to their policy so this stops being asked. Shown on the card before it is accepted.")
	}), lx = M({
		at: k().int().describe("When it was judged, epoch milliseconds."),
		program: D().describe("The command or script, excerpted."),
		classes: j(D()).describe("The kinds of consequence triage matched, which is why a judge looked."),
		decision: cx.describe("What the judge decided."),
		sentence: D().describe("The judge's sentence."),
		outcome: I([
			"allowed",
			"asked",
			"refused"
		]).describe("What the gate did in the end."),
		answer: I([
			"allowed",
			"declined",
			"unanswered"
		]).optional().describe("How the owner answered, when they were asked."),
		machine: D().optional().describe("Which connected device it was headed for, when it was not this sandbox.")
	}), ux = M({
		text: D().describe("The policy, as the owner wrote it."),
		custom: A().describe("False when nobody has edited it and this is the text this product ships.")
	});
})), fx, px, mx, hx, gx, _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox, kx, Ax, jx, Mx, Nx, Px, Fx, Ix, Lx, Rx, zx, Bx, Vx, Hx, Ux, Wx, Gx, Kx, qx, Jx, Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS = v((() => {
	Ym(), V(), dx(), Dd(), K(), wh(), ny(), fx = I([
		"intentic",
		"claude",
		"custom"
	]), px = M({ base: I(["intentic", "claude"]) }), mx = 2e4, hx = 2e3, gx = I([
		"file.edited",
		"turn.ending",
		"agent.finished",
		"agent.landed"
	]), _x = I(["verify-ui-edits", "version-landed"]), vx = P("kind", [
		M({
			kind: L("command"),
			command: D().max(500),
			timeoutMs: k().min(6e4).max(36e5).default(9e5)
		}),
		M({
			kind: L("verdict"),
			verdict: I(["allow", "hold"])
		}),
		M({
			kind: L("builtin"),
			name: _x
		})
	]), yx = I([
		"clean",
		"error",
		"conflict",
		"checks-failed"
	]), bx = M({
		repo: D().min(1).optional(),
		paths: j(D().min(1)).max(20).optional(),
		outcome: j(yx).optional(),
		sample: k().gt(0).lt(1).optional()
	}), xx = {
		"file.edited": ["command"],
		"turn.ending": ["builtin", "command"],
		"agent.finished": ["verdict"],
		"agent.landed": ["builtin"]
	}, Sx = {
		"turn.ending": ["verify-ui-edits"],
		"agent.landed": ["version-landed"]
	}, Cx = M({
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: D().min(1).max(80),
		moment: gx,
		when: bx.optional(),
		action: vx,
		enabled: A().default(!0)
	}).refine((e) => xx[e.moment].includes(e.action.kind), {
		message: "that action cannot stand at that moment",
		path: ["action"]
	}).refine((e) => e.action.kind !== "builtin" || (Sx[e.moment] ?? []).includes(e.action.name), {
		message: "that built-in cannot stand at that moment",
		path: ["action"]
	}), wx = (e) => e.moment === "turn.ending" || e.action.kind === "builtin" && e.action.name === "verify-ui-edits", Tx = F(D(), k()), Ex = I([
		"builtin",
		"own",
		"capability",
		"extension",
		"plugin",
		"persona",
		"dropped"
	]), Dx = D().regex(/^[a-z0-9][a-z0-9-]*$/, "a skill name is lowercase letters, digits and dashes"), Ox = M({
		id: D().describe("Its handle, which reading and deleting take. A skill of your own is simply its name; one belonging to something else is qualified, because two packages may each ship a review."),
		name: D().describe("Its name."),
		description: D().describe("What it is for, which is the line the agent reads to decide whether to reach for it. Empty when the skill declares none, which is worth showing as the blank it is: a skill with no description is rarely picked."),
		origin: Ex.describe("Where it came from."),
		owner: D().optional().describe("Who ships it, as the row would name them."),
		enabled: A().describe("Whether the agent can reach it."),
		switchable: A().describe("Whether this surface can switch it. Everything else is on because its extension or its plugin is, and a switch here that silently did nothing would be worse than none, so the row names its owner instead."),
		editable: A().describe("Whether it can be rewritten here. Your own only: editing somebody else's in place would be undone the next time the thing that ships it catches up."),
		removable: A()
	}), kx = j(Ox), Ax = M({
		id: D().describe("The skill's id, which can carry the owner it came from."),
		name: D().describe("Its name."),
		body: D().describe("The instructions themselves, as written.")
	}), jx = M({ id: D().min(1).describe("Which skill. It travels in the query rather than the address, because an id can name the owner it came from and that will not fit in a path.") }), Mx = M({
		name: Dx.describe("What to call it. Saving over an existing name rewrites it, which is also how one is renamed."),
		description: D().min(1).max(1024).describe("What it is for, which is what the agent reads to decide whether to reach for it."),
		body: D().min(1).describe("The skill itself.")
	}), Nx = M({ name: Dx.describe("Which skill to delete. The stored text and the agent's copy go together, so nothing is left half done.") }), Px = M({
		name: Dx.describe("Which skill of your own to switch."),
		on: A().describe("On writes the agent's copy from the stored text; off removes that copy and keeps the text.")
	}), Fx = M({
		auto: A().default(!1).describe("Keep a Claude conversation's prompt cache warm after each turn a person asked for. Each refresh re-reads the cached context at the cache price and adds nothing to the conversation."),
		hours: k().min(1).max(8).default(4).describe("How long an idle conversation is kept warm after its last turn, in hours, and what a press on one offers first. Shortened where refreshing would cost more than the cold resume it saves, and at midnight where the agent runs, when the date in its prompt changes."),
		minTokens: k().int().min(0).default(1e5).describe("Only conversations at least this large, in tokens, are kept warm by `auto`: a small one is cheap to re-read anyway."),
		reserve: k().int().min(0).max(90).default(15).describe("How much of an account's usage limit, in percent, keeping conversations warm must leave untouched for real work. Refreshing stops once any limit that account's model spends is fuller than that.")
	}), Ix = I(["developer", "maker"]), Lx = M({ audience: Ix.optional().describe("developer for git's own words, maker for plain ones. Absent until this person has chosen here.") }), Rx = M({
		timezone: N([L(""), ty]).default("").describe("Which clock this sandbox's schedules are set by, as a zone name like Europe/Warsaw. Automations that repeat on a clock fire by this, not by the machine's own time. Leave it empty and they fire by UTC, which is almost certainly not what you meant when you typed a time."),
		stableSystemPrompt: A().default(!1).describe("Keep the instructions identical between turns so the provider can cache them, moving anything that varies into the message instead. Cheaper, at the cost of some flexibility."),
		skills: j(D()).default(["lsp", "fileq"]).describe("Which built-in tools are switched on. A skill of your own is not listed here: it is on while the agent's copy of it exists."),
		personaRouting: A().default(!0).describe("Whether a new chat is matched to one of your personas from its first message. It is read once the message is sent, in the same single call that chooses what the chat runs on (the New chat routing job under Models), and the chat says in its own transcript which persona it landed on. Never applies to unwatched runs, which name their persona themselves."),
		hashlineEdits: A().default(!1).describe("Have the agent edit files by line number rather than by quoting the text it wants replaced. Cheaper on large files, and less forgiving of a stale read."),
		systemPromptMode: fx.default("intentic").describe("Which instructions the agent starts from: intentic's own, the ones the installed Claude Code carries, or your own. The first two both get this product's own guidance added on top; your own gets nothing added, which is the point of it."),
		systemPrompt: D().max(mx).default("").describe("Your own instructions, used only when the mode above says custom. Then it is the whole of them: both built-in bases go, and so does everything this product would otherwise add, including the guidance the chat's own cards are driven by. That is the price of total control."),
		leanGuidance: A().default(!1).describe("Send this product's own guidance in its short form: only what the agent cannot find out by looking, instead of a paragraph for every habit it was once caught in. Off by default, because the long form is the one the product was tuned on."),
		leanGuidanceHoldout: k().min(0).max(1).default(0).describe("What share of conversations to keep on the long form, so the two can be compared. Whole conversations rather than individual turns, because the guidance sits in the prompt for the whole session."),
		iqSearch: A().default(!1).describe("Teach the agent how to use this workspace's own search tool, rather than leaving it to grep around."),
		iqSearchHoldout: k().min(0).max(1).default(0).describe("What share of conversations to run without that teaching, so the two can be compared. Whole conversations rather than individual turns, because once the teaching is in a session, withholding it from the next request does not make the model forget it."),
		workspaceMap: A().default(!1).describe("Open every conversation with a map of the project it starts in: what is in it, what each part is for, and where the agent is standing. Worked out fresh each time rather than written down anywhere, because a written layout is wrong within a fortnight. Off by default, since it spends tokens on the first message of every conversation."),
		workspaceMapHoldout: k().min(0).max(1).default(0).describe("What share of conversations to open without the map, so the two can be compared. Whole conversations rather than individual turns, because the map is sent once and stays in the conversation's history afterwards."),
		fieldNotes: A().default(!1).describe("Open every turn with a brief on how work actually goes in this sandbox: the traps that cost past sessions calls, the commands that really verify, what the machine can take. Written once a month by an automation that reads back the sessions run here, rather than worked out per turn, because it is drawn from history rather than from the tree. Off by default, since it rides every turn of every conversation."),
		fieldNotesBudget: k().int().min(500).max(2e4).default(4e3).describe("How much of that brief to send. Its sections are ranked, most costly-to-not-know first, and they are taken whole in that order until this runs out — so raising it buys more of the tail, never a fuller version of the same thing."),
		fieldNotesHoldout: k().min(0).max(1).default(0).describe("What share of conversations to run without the brief, so the two can be compared. Whole conversations rather than individual turns, because the brief sits in the prompt for the whole session and withholding it from one turn would not take it back."),
		outputCleaners: D().default("").describe("Which command outputs to trim before the agent reads them, cutting the noise a build tool prints without cutting what it said."),
		outputHoldout: k().min(0).max(1).default(0).describe("What share of commands to leave untrimmed, so the saving can be measured against a real comparison rather than estimated."),
		modelRoles: Al(Td, j(cf).max(10)).default({}).describe("Which models do which job, one ordered list per job: commit messages, session titles, the safety judge, pipeline fixes, and every other place this sandbox picks a model for you. Tried in order, so one spent account does not take a job down. Nothing is chosen for you: a one-shot job with no list does not run, and a whole session with no list opens on whatever your own chat is set to."),
		autoModelGuidance: D().max(hx).default("").describe("What you would tell somebody choosing the model for a new chat on your behalf: which model you want the cheap work on, which account to leave alone, when to reach for the strongest one. Read once per chat, alongside the models and allowances this sandbox can actually run, and it overrides the product's own advice where the two disagree. It cannot invent a model: the answer is still a choice from that list."),
		changelogRepos: j(D()).max(50).default([]).describe("Which repositories keep a changelog, and so get a user-facing note written alongside each merge. A list rather than a switch, and empty by default, because the commit writer's standing rule is to copy the house style rather than impose one, and a repository that has never written such a note gives it nothing to copy."),
		agentRetentionDays: k().min(0).max(365).default(3).describe("How many days a finished conversation stays on the board before being put away. Zero means never. The one setting here that defaults on, because each card left behind is a real working copy on disk, not just a row."),
		limitPolicy: yh.default("wait").describe("What happens to a turn a spent usage limit refused. `wait` holds it for a press. `resend` sends it again by itself once the allowance reopens, which needs a provider that publishes a reset (Grok and Cursor publish none). `move` also tries another connected account of the same provider that still has room, as soon as the refusal lands, and keeps the reset as its fallback. The sandbox-wide default; any one conversation can say otherwise."),
		outagePolicy: bh.default("wait").describe("What happens to a turn the model provider's own failure killed. `wait` holds it for a press. `retry` re-runs it on the shared per-provider breaker, backing off between attempts. The sandbox-wide default; any one conversation can say otherwise. Worth `retry` for a sandbox whose work mostly happens with nobody in the room."),
		stopPolicy: bh.default("wait").describe("What happens to a turn that stopped short with nothing to repair — a hung runtime, a crashed harness. `wait` holds it for a press. `retry` re-runs the held turn on a short ladder, standing down after three tries that got nowhere rather than looping forever."),
		limitMoveCarryUnder: k().int().min(0).default(1e5).describe("When a spent usage limit moves a turn to another account, carry the provider session (the model keeps everything, and re-reads all of it once on the other account) while the conversation's context is under this many tokens; at or above it, start a fresh session with the sandbox's measured brief instead. Zero always starts fresh."),
		keepWarm: Fx.prefault({}).describe("Keeping an idle conversation's prompt cache warm, so coming back to it hours later costs a cache read instead of re-sending everything. Any one conversation can be kept warm or let cool by hand whatever `auto` says."),
		autoRepair: A().default(!0).describe("Whether main's CI failing is repaired without asking. The first job that fails on main starts one fix agent, without waiting for the rest of the run, and every later failure on main goes to that same agent until a run passes. It gets a few turns; when they are spent, or it finishes without changing anything (a failure that is not in the code), the failure waits for you. A failure on the CI fleet itself is re-run once instead. Off, all of it is only reported."),
		followOrigin: A().default(!0).describe("Whether each workspace repo keeps up with the remote branch it tracks. Every couple of minutes it is fetched, and what arrived is brought into the main tree: a fast-forward when you have no commits of your own, else a merge commit. Only while it is quiet (no turn working in the main tree, no merge or rebase of yours open), and never half-way: a conflict, or an uncommitted file in the way, leaves the repo exactly as it was until the next try. Nothing is ever pushed. Off, nothing is fetched."),
		offload: M({ commands: F(D().min(1), D().min(1)).default({}) }).default({ commands: {} }).describe("Which heavy work runs on a runner on one of your machines instead of this sandbox: agents' commands by the kind the heavy-command rules sort them into (tests, typechecks, verify…). The code travels as it stands, uncommitted work included; the output streams back, and any file the command changed comes back with it. A machine that is offline, outdated or busy hands the work back to this sandbox, and the output says so."),
		continueWhenNeedMet: A().default(!0).describe("Whether a conversation carries on by itself once something it asked a person for arrives: a connection made, a secret given, access allowed, a tool built into the image. Off leaves the answer on the conversation's card until someone sends a message."),
		autoResumeOnRestart: A().default(!1).describe("Whether a turn killed by the sandbox restarting is re-run once it comes back. A switch rather than one of the policies above, because a restart is the one ending with nobody watching it, so there is no in-chat question to answer. Off to begin with: it would spend your allowance on work you are not watching and edit files while you are still waiting for the sandbox to return. Either way the interruption is recorded rather than silently lost."),
		adoptedChecks: F(D(), D()).default({}).describe("Which repositories may run the checks they declare for themselves, and exactly which version of those checks you agreed to. A repository's declaration does nothing until it appears here, the same rule git keeps for hooks, which are never cloned; and a declaration that changes afterwards is held until you look at it again."),
		rules: j(Cx).max(50).default([]).refine((e) => e.every((e) => e.action.kind !== "command"), { message: "a command belongs in the repository's own .intentic/checks.json, not in settings" }).describe("Standing decisions about the sandbox's own work: land or hold finished work, save a version of what landed. Empty is the default and is exactly the behaviour of a fresh sandbox, because each of those defaults is what no rule matched means at its own moment. A command to run is a repository's own check, declared in its .intentic/checks.json."),
		automationFailureLimit: k().min(0).max(20).default(0).describe("How many failures in a row before an automation switches itself off. Zero means never, which is the default, because the failure is not always the automation's fault and a job disabled at three in the morning is one nobody re-enables. Only real errors count: a guard deciding there was nothing to do, or the sandbox dying mid-run, say nothing about the automation."),
		admission: Qd.prefault({}).describe("Whether work started from outside may run, per kind of trigger: let it, hold it for approval, or refuse it. Composes with each automation's own setting, and the stricter of the two wins, so holding every visitor's message needs no edit to each automation."),
		actionRules: F(D(), Yd).default({}).describe("What an agent may do out in the world, per kind of action: go ahead, ask first, or never."),
		commandJudge: ox.default("on").describe("Whether a model reads your safety policy before a flagged command runs. Off judges nothing and asks about nothing; Watch judges everything and records it without ever interrupting you, which is how you find out what your policy actually does before you let it stop anything; On lets the verdict decide. Wiping a disk or deleting under /history asks at every setting — that rule is typed rather than judged, and cannot be turned off."),
		projectInstalls: sx.default("automatic").describe("What happens when an agent installs a project's packages itself (pnpm add, npm install, uv sync). Automatic lets it run and keep working; Ask first stops for your answer in the chat, once or for the whole conversation; Never refuses, and a dependency the agent added to a manifest is installed when you land its work. A conversation in its own worktree installs into its own copy, and the land review lists every dependency its work adds."),
		subagentsAtOnce: k().min(1).max(200).default(20).describe("How many subagents may work at the same time."),
		subagentsPerTurn: k().min(1).max(2e3).default(200).describe("How many a single turn may start in total."),
		subagentDepth: k().min(1).max(10).default(3).describe("How many levels deep the delegation may go, since a subagent can start subagents of its own.")
	}), zx = Rx.refine((e) => !e.rules.some(wx), {
		message: "turn.ending is retired: nothing runs when a turn ends any more, so a rule cannot stand there",
		path: ["rules"]
	}), Bx = M({
		audience: Ix.describe("developer for git's own words, maker for plain ones."),
		offer: A().optional().describe("Take it only while this person has no answer kept here yet. Absent or false replaces whatever is kept.")
	}), Vx = M({
		audience: Ix.describe("The words this sandbox's editor now uses."),
		adopted: A().describe("Whether this call set it. False means an offer met an answer already kept, which stands.")
	}), Hx = M({ timezone: ty.describe("The zone the offering machine is in, as an IANA name like Europe/Warsaw.") }), Ux = M({
		timezone: D().describe("The zone this sandbox's schedules are now read in. Empty only if none could be resolved."),
		adopted: A().describe("Whether this call is what set it. False means it was already answered and the stored zone stands.")
	}), Wx = M({
		text: D(),
		version: D()
	}), Gx = M({
		id: D(),
		commands: k(),
		savedTokens: k()
	}), Kx = M({
		updatedAt: k().optional(),
		commands: k(),
		rawTokens: k(),
		emittedTokens: k(),
		savedPct: k(),
		perCleaner: j(Gx),
		holdout: M({
			cleaned: k(),
			heldOut: k(),
			measuredSavedPct: k().optional()
		}),
		gaps: j(M({
			command: D(),
			commands: k(),
			tokens: k()
		}))
	}), qx = M({
		turns: k(),
		mean: k()
	}), Jx = M({
		metric: I([
			"searchCalls",
			"openingSearches",
			"openingListings",
			"callsBeforeTarget",
			"failedCalls"
		]),
		on: qx,
		off: qx,
		controlTurnsNeeded: k().optional(),
		marginPct: k().optional(),
		deltaPct: k().optional(),
		saved: k().optional()
	}), Yx = M({
		metrics: kl([Jx], Jx),
		minTurns: k(),
		sampleUnit: I([
			"turns",
			"conversations",
			"opening turns"
		]).optional(),
		cohort: D().optional()
	}), Xx = M({
		present: A(),
		writtenAt: k().optional(),
		ranksSent: k().optional(),
		ranksTotal: k().optional(),
		chars: k().optional(),
		automation: I([
			"missing",
			"enabled",
			"disabled"
		]),
		nextRunAt: k().optional(),
		unreadable: D().optional()
	}), Zx = M({
		input: Kx,
		search: Yx.optional(),
		map: Yx.optional(),
		notes: Yx.optional(),
		guidance: Yx.optional()
	}), Qx = `${Gm}/checks.json`, $x = I([
		"edit",
		"turn",
		"land"
	]), eS = M({
		when: $x.describe("When to run it: `edit` on each file as it is written (`{file}` is its path). `turn` and `land` are retired and run nothing: checks no longer run while a conversation works or after its work lands, since CI checks what is pushed."),
		run: D().min(1).max(500).describe("The command, run in this repository's own directory, so it reads as it would in a terminal there."),
		label: D().min(1).max(80).optional().describe("What to call it on screen. Absent names it after the command."),
		timeoutMs: k().min(6e4).max(36e5).optional().describe("How long it may take before it is killed and counted as failed."),
		paths: j(D().min(1)).max(20).optional().describe("Only run it when the change touches these paths, written relative to this repository. Absent runs it on every change here.")
	}), M({ checks: j(eS).max(10).default([]) }), tS = M({
		repo: D().describe("Which repository, by its workspace id (\"root\" is the workspace itself)."),
		path: D().describe("Where the declaration lives, relative to the workspace, whether or not the file exists yet."),
		checks: j(eS).describe("What it declares, in the order the file lists them."),
		fired: j(k().nullable()).describe("When each declared check last reported something, in the file's order, as epoch milliseconds; null for one that never has, or for a retired one, which runs nothing."),
		adopted: A().describe("Whether these are running. False means declared and inert: nothing a repository writes runs until the owner switches it on."),
		changed: A().describe("Whether the declaration changed since it was adopted, which holds it until the owner looks again. True only for a repository that was adopted before."),
		error: D().optional().describe("Why the file could not be read, when it exists but does not parse. The checks list is empty in that case.")
	}), nS = M({ repos: j(tS).describe("Every repository that declares checks, in id order.") }), rS = M({
		repo: D().min(1).describe("Which repository's declaration to switch."),
		on: A().describe("On adopts what it declares as it stands now; off stops running it. Adopting again is how a changed declaration is accepted.")
	});
})), aS, oS, sS, cS, lS, uS, dS = v((() => {
	V(), iS(), aS = I([
		"guidance",
		"persona",
		"field-notes",
		"memory"
	]), oS = M({
		source: aS.describe("Which mechanism added this."),
		title: D().describe("The one line a reader sees on the row that opens to the text below."),
		text: D().describe("The section's exact words, as the model received them.")
	}), sS = I([
		"intentic",
		"claude",
		"custom",
		"runtime",
		"trimmed"
	]), cS = M({
		kind: sS.describe("Which prompt the additions ride on."),
		text: D().optional().describe("The base's own words, when they can be read here. Absent for a runtime that keeps its prompt to itself."),
		model: D().optional().describe("The model the turn ran on, for a built-in base: Claude Code renders a different preset for each.")
	}), lS = M({
		at: k().describe("When the turn that was told this was sent (epoch ms)."),
		runtime: D().describe("Which runtime served that turn."),
		mode: fx.describe("Which base the turn was configured to run on."),
		base: cS,
		sections: j(oS).describe("What the daemon added to that base, in the order the model reads them.")
	}), uS = M({ prompt: lS.optional().describe("What the most recent turn of this conversation was told, if one has been recorded.") });
})), fS, pS = v((() => {
	W(), lv(), e_(), Ey(), Ib(), Nv(), Y(), Ah(), dS(), fS = {
		list: U.route({
			method: "GET",
			path: "/agents",
			summary: "Every live conversation",
			description: "The fleet as the board draws it: each conversation with its title, what it is doing, when it last moved and whether anybody has read it since. Archived conversations are not in here."
		}).meta({ guest: !0 }).output(uy),
		archived: U.route({
			method: "GET",
			path: "/agents/archived",
			summary: "Conversations put away",
			description: "The same shape as the live fleet, for the conversations somebody has decided are finished. Their work is kept, and any one of them can be brought back."
		}).meta({ guest: !0 }).output(uy),
		search: U.route({
			method: "GET",
			path: "/agents/search",
			summary: "Find a conversation",
			description: "Searches the live fleet and the archive together. Both halves on purpose: the board hides finished work by design, and a filter that says it found nothing while the answer sits one click away is simply wrong."
		}).input(Fg).output(zg),
		get: U.route({
			method: "GET",
			path: "/agents/{id}",
			summary: "One conversation's card",
			description: "Everything the board shows for a single conversation: its title, state, working branch, unread marker and timestamps."
		}).meta({ guest: !0 }).input(Tg).output(X),
		transcript: U.route({
			method: "GET",
			path: "/agents/{id}/transcript",
			summary: "One page of a conversation",
			description: "The most recent turns of one conversation, in order, including the tool calls and their results: what the chat replays and the next turn is seeded from. A page, not the whole record — pass the answer's `from` back as `before` to walk further back, until `more` reads false."
		}).meta({ guest: !0 }).input(Og).output(sv),
		systemPrompt: U.route({
			method: "GET",
			path: "/agents/{id}/system-prompt",
			summary: "What this conversation is told before it is asked anything",
			description: "The system prompt the most recent turn of this conversation actually ran on: which base it was, and every piece the sandbox added to it — this product's guidance, the persona, the field notes, the workspace's own standing rules — each with the exact words the model received. None of this appears in the transcript, so this is the only way to read it."
		}).input(Tg).output(uS),
		toolChildren: U.route({
			method: "GET",
			path: "/agents/{id}/transcript/tools/{toolId}",
			summary: "One delegation's own calls",
			description: "The calls a delegated agent made under one tool card. A transcript page leaves them behind and reports their count as `nested`, since a settled delegation draws collapsed; this is what fills the card in when it is opened. Empty when the record no longer holds that call."
		}).input(kg).output(cv),
		subagentTranscript: U.route({
			method: "GET",
			path: "/agents/{id}/subagents/{subagentId}/transcript",
			summary: "One in-process subagent's own record",
			description: "What a subagent this conversation's runtime ran in-process said and did, as a transcript of its own: its ask, its thinking, its calls and its words. Read from the runtime's own record of the subagent where it keeps one, which it writes as the subagent works, else from the calls the delegation's card holds in this conversation's record. A subagent spawned as a conversation of its own is read through `transcript` instead."
		}).meta({ guest: !0 }).input(Ag).output(av),
		place: U.route({
			method: "POST",
			path: "/agents/{id}/place",
			summary: "Put words in the agent's mouth",
			description: "Writes a line into the record as though the agent had said it, with no turn behind it and no reply. Human readers see it marked as placed. The next real turn starts fresh from the record, where the line reads as the agent's own. Refused while a turn is running."
		}).input(Ug).output(q),
		rename: U.route({
			method: "POST",
			path: "/agents/{id}/rename",
			summary: "Retitle a conversation",
			description: "Sets the title a person chose, replacing the one that was generated. Allowed while the conversation is working, and it does not count as activity."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Bg).output(X),
		autoLand: U.route({
			method: "POST",
			path: "/agents/{id}/auto-land",
			summary: "Whether this conversation merges its work automatically",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to go back to following the default. Deliberately allowed mid-turn, because the setting is read when the turn finishes, so flipping it while the agent works means exactly hold this piece of work for review."
		}).input(Wg).output(X),
		breakPolicy: U.route({
			method: "POST",
			path: "/agents/{id}/break-policy",
			summary: "What this conversation does when a turn stops before it finished",
			description: "One answer per ending — a spent usage limit, a provider outage, a turn that stopped short — overriding the sandbox-wide policy for one conversation; clear it to follow the default again. The answers are mutually exclusive by construction, so nothing here can arm two automations over the same wall. Every ending starts at `wait` unless asked otherwise, because a re-run spends the user's own allowance on a turn they sent once."
		}).meta({ floor: "collaborator" }).input(Kg).output(X),
		keepWarm: U.route({
			method: "POST",
			path: "/agents/{id}/keep-warm",
			summary: "Keep this conversation's prompt cache warm while it sits idle",
			description: "Re-reads the conversation's cached context shortly before the provider would drop it, until the time asked for, so picking it back up costs a cache read instead of re-sending everything. Each refresh is a forked, unsaved request that adds nothing to the conversation. Stops by itself when the time runs out, when a turn starts, when the account nears its limit, or when the prompt the next turn would send has changed. Refused for a conversation whose cache is already cold or that this sandbox cannot replay. Null stops it."
		}).meta({ floor: "collaborator" }).input(Dh).output(X),
		seen: U.route({
			method: "POST",
			path: "/agents/{id}/seen",
			summary: "Mark a conversation read",
			description: "Stamps the read marker behind the unread badge on one card. Allowed while the conversation is working, and reading never counts as activity."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(Tg).output(X),
		unsent: U.route({
			method: "POST",
			path: "/agents/{id}/unsent",
			summary: "Report that a composer holds an unsent message for a conversation",
			description: "The words stay in the browser; the sandbox only records since when some composer has held them, so a conversation waiting on a message nobody has sent yet is never archived for being idle. Null clears it once the message is sent or deleted. Does not count as activity."
		}).meta({ floor: "collaborator" }).input(Gg).output(X),
		stopWatching: U.route({
			method: "POST",
			path: "/agents/{id}/stop-watching",
			summary: "Stop a conversation's condition watches",
			description: "Disarms this conversation's outside-condition watches, so they will not wake it. Named without a watch id it disarms all of them, because that is what the press means when it is made about a card; a press made about one watch's own row names that watch and leaves the rest armed. Nothing else about the conversation changes."
		}).input(Eg).output(X),
		stopJob: U.route({
			method: "POST",
			path: "/agents/{id}/stop-job",
			summary: "Stop one of a conversation's background jobs",
			description: "Ends a command this conversation left running: the server it handed over, or the build it is waiting on. The watch that would have woken the conversation on its exit is disarmed first, so stopping it wakes nothing. Stopping a job that already ended is not an error."
		}).input(Dg).output(X),
		seenAll: U.route({
			method: "POST",
			path: "/agents/seen",
			summary: "Mark every conversation read",
			description: "Clears the unread badge across the whole fleet at once, and hands the refreshed list back."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).output(uy),
		diff: U.route({
			method: "GET",
			path: "/agents/{id}/diff",
			summary: "Everything a conversation has changed",
			description: "One flat set of changed files per repo, measured against where each repo stood when the conversation started, with every file flagged as already merged or not. Not the staged-and-unstaged shape a working copy has, because nobody ever checks this branch out to stage into it."
		}).input(Tg).output(Ab),
		conflicts: U.route({
			method: "GET",
			path: "/agents/{id}/conflicts",
			summary: "Why a conversation's last merge refused",
			description: "What still blocks the conversation's last refused merge, checked again against your workspace as it stands now. Returns the same `conflicts` the full change list carries, without the change list itself. Empty when nothing refused, or when what refused before has since stopped being in the way."
		}).input(Tg).output(jb),
		history: U.route({
			method: "GET",
			path: "/agents/{id}/history",
			summary: "Where a conversation's committed work lives",
			description: "The commits in your own history that carry this conversation's work, with the files each one brought. Use it when the change list is empty or short because you already committed what it wrote: those files are not differences against the main line any more, so they are not in the review, and this is where they went."
		}).input(Tg).output(Fb),
		fileDiff: U.route({
			method: "GET",
			path: "/agents/{id}/{repo}/file-diff",
			summary: "One file's before and after in a conversation's work",
			description: "Both sides of a single file: what it held when the conversation started and what it holds on its branch now."
		}).input(qg).output(Mv),
		includeScratch: U.route({
			method: "POST",
			path: "/agents/{id}/scratch/include",
			summary: "Carry files set aside as scratch with a conversation's work",
			description: "Takes files the review lists as scratch and adds them to the conversation's work, so the next merge carries them like any other file. For the file that only looked like scratch. Refused for a checkout of its own, which no merge can carry, while a turn is running, and for a path that is not scratch right now."
		}).input(Mb).output(q),
		deleteScratch: U.route({
			method: "POST",
			path: "/agents/{id}/scratch/delete",
			summary: "Delete a conversation's scratch",
			description: "Removes files the review lists as scratch from the conversation's copy. Nothing else is touched, and nothing of it was ever merged. Refused while a turn is running, and for a path that is not scratch right now."
		}).input(Mb).output(q),
		land: U.route({
			method: "POST",
			path: "/agents/{id}/land",
			summary: "Merge a conversation's work into the workspace",
			description: "Brings the conversation's branches into the main tree, one repo at a time. A conflict is reported rather than raised and nothing is lost when it fails. Refused while a turn is running, and refused for a conversation that works directly in the shared tree, which has nothing to merge."
		}).meta({ control: "land" }).input($g).output(Xg),
		requestLand: U.route({
			method: "POST",
			path: "/agents/{id}/request-land",
			summary: "Ask a maintainer to merge this work",
			description: "For a collaborator who is not allowed to merge: marks the conversation as waiting for review, with who asked. The request shows on every maintainer's board and clears when somebody merges or discards it."
		}).meta({ floor: "collaborator" }).input(Tg).output(X),
		assign: U.route({
			method: "POST",
			path: "/agents/{id}/assign",
			summary: "Make a member answerable for this conversation",
			description: "Hands a conversation to a member: its owner is who answers its questions and who a reviewer asks about its work. Its owner may hand it to anyone; a maintainer may reassign any conversation; one nobody owns may be claimed by anyone allowed to drive agents. Refused for an address that is not a member's. Nothing about the conversation's own work changes."
		}).meta({ floor: "collaborator" }).input(Vg).output(X),
		react: U.route({
			method: "POST",
			path: "/agents/{id}/react",
			summary: "Mark a conversation with an emoji",
			description: "Puts your mark on a conversation, or takes it back. Everyone sharing the sandbox sees it, with who left it, which is what makes it worth more than a private bookmark. One mark per person per emoji; nothing about the conversation's own work changes."
		}).meta({
			floor: "viewer",
			guest: !0
		}).input(Hg).output(X),
		discard: U.route({
			method: "POST",
			path: "/agents/{id}/discard",
			summary: "Throw a conversation's work away",
			description: "Deletes the conversation's working copies, its branches and its entry. Nothing is kept. Refused while a turn is running, and refused for a conversation working in the shared tree."
		}).meta({ control: "land" }).input(Tg).output(q),
		archive: U.route({
			method: "POST",
			path: "/agents/archive",
			summary: "Put conversations away",
			description: "The gentle counterpart to discarding. Commits whatever the conversation still has in progress onto its own branch, releases its working copy, and keeps the entry and the record. Its scratch is not committed and goes with the copy. It leaves the live fleet and joins the archive. Refused for a conversation that is running."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(jg).output(Ng),
		unarchive: U.route({
			method: "POST",
			path: "/agents/unarchive",
			summary: "Bring conversations back",
			description: "Returns archived conversations to the live fleet. The next turn picks up a fresh working copy from the branch that was kept."
		}).meta({
			floor: "collaborator",
			guest: !0
		}).input(jg).output(Mg),
		purge: U.route({
			method: "POST",
			path: "/agents/purge",
			summary: "Empty the archive for good",
			description: "Discards every conversation already in the archive: working copies, branches and entries. The whole archive rather than a chosen few, because the archive is the pile somebody has already decided is over. A teardown that fails on one conversation leaves that one behind instead of taking the rest down with it."
		}).meta({ control: "land" }).output(Pg)
	};
})), mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS = v((() => {
	V(), Vd(), I(["post", "action"]), mS = I([
		"proposed",
		"approved",
		"running",
		"done",
		"failed"
	]), hS = {
		actsAs: G.optional().describe("Whose name it acts under. Needed for anything that requires being logged in, because an unwatched turn naming nobody is allowed no account at all. Never guessed: one site can be connected five times over, and picking for you means picking wrong in public with no undo."),
		scheduledAt: k().optional().describe("When it should happen, in milliseconds. An agent may propose without one and you set it when approving; an approved item with no time goes after a short countdown you can still stop."),
		status: mS.default("proposed").describe("Where it is: proposed by the agent, approved by you, being carried out, done, or failed. Rejecting is deleting it; retrying is approving a failed one again."),
		createdAt: k().optional().describe("When it was written, in milliseconds."),
		startedAt: k().optional().describe("When it started being carried out, in milliseconds. Needed to tell a run that is under way from one whose turn died mid-flight, which the scheduled time cannot."),
		finishedAt: k().optional().describe("When it was done, in milliseconds."),
		result: D().optional().describe("What came back, when something did: the post's own address, a confirmation number. The one thing a finished item can offer that reading it cannot."),
		error: D().optional().describe("Why it failed, written as a sentence for a person to read rather than as a code.")
	}, gS = M({
		kind: L("post").describe("A post to publish somewhere."),
		platform: D().min(1).describe("Where it should go. A plain name, so a new site needs no change here; an unknown one simply fails when it tries to post."),
		content: D().min(1).describe("The post itself."),
		title: D().optional().describe("A title, where the site wants one."),
		target: D().optional().describe("Where on the site: a community, a channel. Or the address of the thing this replies to, in which case it is a reply, and on some sites the difference between a thread's address and one comment's is the difference between talking to the room and answering the person."),
		media: j(D()).optional().describe("Anything to attach, as workspace paths."),
		...hS
	}), _S = M({
		kind: L("action").describe("Something the agent will do once you say so."),
		summary: D().min(1).max(200).describe("What will happen, in one line: the row's headline and the confirm dialog's item."),
		details: D().optional().describe("The specifics, as Markdown: everything you would want to see before saying yes."),
		instructions: D().min(1).describe("What to do once approved, written for the fresh turn that will do it: names, ids and steps, since it has none of this conversation."),
		...hS
	}), P("kind", [gS, _S]), vS = { id: G.describe("The approval's id.") }, yS = gS.extend(vS), bS = _S.extend(vS), xS = P("kind", [yS, bS]), SS = M({
		approvals: j(xS).describe("The queue."),
		invalid: j(D()).describe("Files that could not be read at all, or name a kind this daemon does not know. Listed rather than skipped, because an agent writes these files directly and a malformed one would otherwise never run and never say why.")
	}), CS = M({ id: G.describe("Which approval.") }), wS = D().regex(/^[0-9a-f]{64}$/), TS = M({
		source: I(["user", "project"]).describe("Whose configuration declares it: the sandbox's own (~/.claude) or the workspace's (.claude/ in the project)."),
		declaredIn: D().optional().describe("The skill, subagent or command whose frontmatter declares it, spelled like a script path. Absent when it comes from the settings.json of its source."),
		event: D().describe("When it runs, in Claude Code's own words: before a tool, after one, when a prompt is sent, when a session starts."),
		matcher: D().optional().describe("Which tools it is limited to, when it is limited at all."),
		type: D().describe("What kind of hook it is: a shell command, an address it calls, a prompt it asks a model."),
		run: D().describe("Exactly what it runs: the command line, the address, the prompt.")
	}), ES = M({
		path: D().describe("A file one of the hooks runs, spelled the way the hook names it: inside the workspace as $CLAUDE_PROJECT_DIR/…, under the home directory as ~/…, otherwise absolute."),
		sha256: D().describe("Its contents when the hooks were found. The approval covers these bytes, so editing the file asks again, the same as editing the command would.")
	}), DS = M({
		digest: wS.describe("The set's fingerprint: every hook as declared plus the bytes of every file they run. Approving it approves exactly this, and nothing that differs from it by a character."),
		seenAt: k().describe("When a turn first found this set, in milliseconds."),
		conversationId: D().optional().describe("The conversation whose turn found it, when one did."),
		hooks: j(TS).describe("Every hook in the set. Until it is approved, turns run with all of them off, and so with every other hook the agent would load."),
		scripts: j(ES).describe("The files those hooks run by name, which the approval pins byte for byte."),
		dismissed: A().optional().describe("Kept off on purpose: no longer counted as waiting, and still approvable. Present only when it was dismissed.")
	}), OS = M({
		requests: j(DS).describe("Hook sets waiting for a yes, newest first, then the dismissed ones."),
		ledgerUnreadable: A().optional().describe("The record of what was approved could not be read, so no settings-file hook runs anywhere until a set is approved again. Present only when that is the case.")
	}), kS = M({ digest: wS.describe("Which hook set, by its fingerprint.") });
})), jS, MS = v((() => {
	W(), AS(), Y(), jS = {
		list: U.route({
			method: "GET",
			path: "/approvals",
			summary: "Things waiting for your yes",
			description: "Everything an agent has prepared and would like to do: posts to publish, actions to carry out. Nothing here has happened yet."
		}).output(SS),
		upsert: U.route({
			method: "POST",
			path: "/approvals",
			summary: "Approve, edit or retry one",
			description: "All three are the same act with a different field changed, so they share one call. Send the item back as you want it."
		}).input(xS).output(q),
		remove: U.route({
			method: "DELETE",
			path: "/approvals/{id}",
			summary: "Reject one",
			description: "Throws it away undone."
		}).input(CS).output(q),
		hookRequests: U.route({
			method: "GET",
			path: "/approvals/hooks",
			summary: "Hooks waiting for your yes",
			description: "Hook sets a turn found in Claude Code's settings files, or in a skill's or subagent's definition, that nobody has approved in that exact form. Until one is approved, turns in this workspace run with every hook switched off; the sandbox's own safeguards are not hooks of this kind and keep working."
		}).meta({ floor: "maintainer" }).output(OS),
		approveHooks: U.route({
			method: "POST",
			path: "/approvals/hooks/{digest}/approve",
			summary: "Let a hook set run",
			description: "Approves exactly this set, commands and the bytes of the files they run, from the next turn on. Any later change to either is a new set and asks again. Owner and maintainers only, and never through a token a program holds."
		}).meta({
			panel: !1,
			control: "never"
		}).input(kS).output(q),
		dismissHooks: U.route({
			method: "POST",
			path: "/approvals/hooks/{digest}/dismiss",
			summary: "Keep a hook set off without being asked again",
			description: "Takes the set off the list. Its hooks stay switched off; a change to them is a new set, which asks again."
		}).meta({
			panel: !1,
			control: "never"
		}).input(kS).output(q)
	};
})), NS, PS, FS, IS, LS = v((() => {
	Ym(), NS = (e) => {
		if (e.startsWith("/") || /^[A-Za-z]:/.test(e)) return;
		let t = [];
		for (let n of e.split(/[\\/]/)) if (n !== "" && n !== ".") {
			if (n !== "..") {
				t.push(n);
				continue;
			}
			if (t.pop() === void 0) return;
		}
		return t.join("/");
	}, PS = (e, t) => {
		let n = NS(e), r = NS(t);
		return n === void 0 || r === void 0 ? !1 : n === "" || r === n || r.startsWith(`${n}/`);
	}, FS = [Gm, Km], IS = (e) => FS.some((t) => PS(t, e));
})), RS, zS, BS, VS, HS = v((() => {
	V(), LS(), Vd(), RS = D().min(1).max(200).refine((e) => (NS(e) ?? "") !== "", { message: "a folder is workspace-relative and inside the workspace; the workspace root is what naming no area already means" }).refine((e) => !IS(e), { message: "an area cannot name the sandbox's own configuration or its public outbox" }), zS = M({
		id: G.describe("The area's id, the name a member row points at."),
		label: D().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		brief: D().max(200).optional().describe("What this part of the workspace is, in one line, so whoever grants it can tell what they are handing over."),
		folders: j(RS).min(1).max(50).describe("The folders it admits, workspace-relative. At least one: an area naming nothing would be a grant with no reader, and the way to grant everything is to name no area at all.")
	}), BS = M({ areas: j(zS).describe("Every named part of the workspace this sandbox grants access in.") }), VS = M({ id: G.describe("Which area.") });
})), US, WS = v((() => {
	W(), Y(), HS(), US = {
		list: U.route({
			method: "GET",
			path: "/areas",
			summary: "The named parts of the workspace",
			description: "Each area with the folders it admits. Access is granted in these rather than in folder lists per person, so widening what a team sees is one edit here instead of one edit per member."
		}).meta({ guest: !0 }).output(BS),
		save: U.route({
			method: "POST",
			path: "/areas",
			summary: "Create or edit an area",
			description: "Writes the whole area; sending an id that exists edits it. Editing the folders of an area people already hold changes what those people see on their next request, which is why this is the sandbox owner's to do and why the file it writes is tracked and reviewable."
		}).input(zS).output(q),
		remove: U.route({
			method: "DELETE",
			path: "/areas/{id}",
			summary: "Delete an area",
			description: "Removes the name and the folders behind it. Refused while a member still points at it, since nobody chose what such a row should then mean; move them onto another area first, or off areas entirely."
		}).input(VS).output(q)
	};
})), GS, KS = v((() => {
	W(), Ey(), Y(), GS = {
		list: U.route({
			method: "GET",
			path: "/automations",
			summary: "Things that wake an agent on their own",
			description: "Every automation with its recent runs and when it fires next."
		}).output(hy),
		catalog: U.route({
			method: "GET",
			path: "/automations/catalog",
			summary: "What can trigger an automation here",
			description: "Every trigger this sandbox understands and every template worth starting from, the daemon's own merged with each installed extension's. Writing an automation is checked against this same list, so a screen and the daemon can never disagree about what is allowed."
		}).output(Ty),
		upsert: U.route({
			method: "POST",
			path: "/automations",
			summary: "Create or edit an automation",
			description: "Writes an automation by id. Nothing needs provisioning: the scheduler picks it up on its next sweep."
		}).input(cy).output(q),
		setEnabled: U.route({
			method: "POST",
			path: "/automations/{id}/enabled",
			summary: "Turn an automation on or off",
			description: "Flips only the switch, so a row in a list can be toggled without rebuilding the whole record."
		}).input(by).output(q),
		remove: U.route({
			method: "DELETE",
			path: "/automations/{id}",
			summary: "Delete an automation",
			description: "Removes it, so nothing fires from it again."
		}).input(yy).output(q),
		rotateToken: U.route({
			method: "POST",
			path: "/automations/{id}/rotate-token",
			summary: "Rotate an automation's webhook token or intake key",
			description: "Mints a new credential for the door this automation opens and retires the old one at once. Every caller has to be handed the new URL; that is the point. Refused for an automation with no door."
		}).input(yy).output(Om),
		run: U.route({
			method: "POST",
			path: "/automations/{id}/run",
			summary: "Fire an automation by hand",
			description: "The answer to writing something that runs at three in the morning and having no way to try it. It takes exactly the path the real trigger takes, including the check that decides whether there was anything to do, since skipped by the guard is the most useful thing this can tell you. A switched-off automation fires too, because trying it before switching it on is the main reason to press this. Not available for the trigger that listens for incoming messages, where a hand-fire would produce an agent asked to handle events and handed none; send the bot a message instead. Answers straight away and runs detached."
		}).input(yy).output(q),
		senders: U.route({
			method: "GET",
			path: "/automations/senders/{provider}",
			summary: "Who has written to a listener source",
			description: "Everyone whose message reached one of this source's automations, newest first, admitted or not. What the sender rules picker offers by name while storing the id the service vouches for."
		}).input(vy).output(_y),
		pendingList: U.route({
			method: "GET",
			path: "/automations/pending",
			summary: "Automations waiting for a yes",
			description: "The queue an automation set to ask first lands in each time it would have fired."
		}).output(dy),
		approve: U.route({
			method: "POST",
			path: "/automations/pending/{id}/approve",
			summary: "Let a held automation run",
			description: "Releases one waiting automation and runs the wake it was holding. Answers straight away and runs detached."
		}).input(fy).output(q),
		reject: U.route({
			method: "POST",
			path: "/automations/pending/{id}/reject",
			summary: "Drop a held automation",
			description: "Throws one waiting fire away. The automation stays on, and the next trigger queues as usual."
		}).input(fy).output(q)
	};
})), qS, JS, YS, XS, ZS, QS, $S, eC, tC, nC, rC, iC, aC, oC, sC, cC, lC, uC, dC, fC, pC, mC, hC, gC, _C, vC, yC, bC, xC, SC, CC, wC, TC = v((() => {
	V(), K(), qS = M({ agent: qd.optional().describe("Read a conversation's own private copy of the workspace rather than the shared tree. Leave it out for the shared tree. A conversation that is not working privately resolves back to the shared tree rather than failing, so a link need not know which mode it runs in.") }), JS = M({
		to: D().describe("What the link says, verbatim, rather than where it ends up. That is what the person who made it wrote, and what they would edit."),
		state: I(["broken", "outside"]).optional().describe("Absent for an ordinary link. Broken means there is nothing at the other end, and it is listed anyway because a dangling link is worth seeing. Outside means it leads out of the workspace, so it is shown and refused.")
	}), YS = M({
		name: D().describe("Just this entry's own name."),
		path: D().describe("Its full path from the workspace root, which feeds straight back into the file routes."),
		type: I(["file", "dir"]).describe("What it is. For a link, what it points at, so a link to a folder opens like a folder."),
		size: k().optional().describe("Size in bytes, for a file."),
		ignored: A().optional().describe("Tooling ignores it: installed packages, git internals, anything the ignore rules exclude. Usually drawn greyed out."),
		link: JS.optional().describe("Present when this entry is a link."),
		get children() {
			return j(YS).optional().describe("What is inside a folder. Absent means it was not opened, either because it is ignored or because the walk ran out of budget above it, so ask for it separately. An empty list means it really is empty.");
		}
	}), XS = M({
		root: D().describe("The path everything below is relative to."),
		tree: j(YS).describe("The workspace, one entry per file and folder."),
		hidden: k().describe("How many entries at the top level were cut for size. Zero means the listing is complete."),
		barren: j(D()).describe("Folders whose whole contents are empty folders, and nothing else. Complete for the workspace, however much of the tree above was listed, and ordered like the tree, so a parent comes before the branch below it."),
		generation: k().int().nonnegative().optional().describe("Which state of the shared tree this is; the changes that follow count from it. Absent for a conversation's own checkout, which is listed when asked and followed by no changes.")
	}), ZS = M({
		from: k().int().nonnegative().describe("The generation this applies on top of. A reader holding any other fetches the tree afresh instead."),
		generation: k().int().nonnegative().describe("The generation it leaves the tree at."),
		dirs: j(M({
			path: D().describe("The folder, as a workspace path; empty for the workspace root."),
			entries: j(YS).describe("Its entries now, without their contents: a folder whose own entries also changed comes as an item of its own.")
		})).describe("Each folder that changed, parents before the folders inside them."),
		barren: j(D()).optional().describe("The barren folders now, present only when that list moved.")
	}), QS = qS.extend({
		path: D().min(1).describe("The folder to open, as a workspace path."),
		depth: B().int().min(1).max(5).optional().describe("How many levels to include. Omitted means direct children only; at most five levels can be read in one request.")
	}), $S = M({
		entries: j(YS).describe("What is inside it, as a flat list. With the default depth these are direct children; a deeper request also includes descendants, whose full paths say where they belong. Folders carry no nested contents of their own."),
		hidden: k().describe("How many entries were cut for size. Zero means the listing is complete.")
	}), eC = M({ path: D().min(1).describe("The file or folder, as a workspace path.") }), tC = qS.extend({ path: D().min(1).describe("The media file the ticket should cover.") }), nC = M({
		ticket: D().describe("Hand this to the streaming route in the query string. It buys exactly the one file it was minted for."),
		expiresAt: k().describe("When it stops working, in milliseconds, so a player can tell a dead ticket from a dead file.")
	}), rC = qS.extend({ paths: j(D().min(1)).min(1).max(1e4).describe("The files and folders to download together, as workspace paths. A folder brings everything inside it.") }), iC = M({
		ticket: D().describe("Hand this to the download route in the query string. It buys exactly the selection it was minted for, once resolved."),
		expiresAt: k().describe("When it stops working, in milliseconds. It is meant to be used at once."),
		filename: D().describe("What the archive is saved as, so a caller can say what is on its way.")
	}), aC = qS.extend({
		path: D().min(1).describe("The file to read, as a workspace path."),
		offset: B().int().optional().describe("Which byte to start at. A negative number reads that many bytes from the end, which is how you follow a growing log without knowing its size first."),
		limit: B().int().min(1).optional().describe("How many bytes to read. Capped by the sandbox, so leaving it out or asking for too much gives you the cap rather than the whole file.")
	}), oC = M({
		present: L(!0).describe("There is something at that path."),
		path: D().describe("The path, as asked for."),
		content: D().describe("The bytes of the window you asked for, as text."),
		size: k().describe("How large the whole file is. Compare it with the window below to know whether there is more."),
		offset: k().describe("Which byte the window starts at."),
		bytes: k().describe("How many bytes the window holds."),
		shared: A().describe("Which tree answered. True when no conversation was named, and also when one was but its own copy has no such file, which is the case a reader has to be told about rather than left to assume."),
		lossy: L(!0).optional().describe("The bytes are not valid UTF-8, so `content` holds replacement characters where they failed to decode. Saving that text back would change the file, so treat it as read-only.")
	}), sC = M({
		present: L(!1).describe("Nothing there. An answer, not a failure: reading a file that may not exist yet is the ordinary case for half the reads in this product."),
		path: D().describe("The path, as asked for.")
	}), cC = P("present", [oC, sC]), lC = M({ path: D().min(1).describe("The file you want the text of, as a workspace path. The real file, not its shadow: where the text is kept is this route's business.") }), uC = I([
		"deriving",
		"idle",
		"broken",
		"undeliverable"
	]), dC = { state: uC.describe("Where this file stands: being read right now, settled (what it has is what it gets until someone asks), or unreachable because the renderer is missing. `undeliverable` is a format nothing here reads.") }, fC = M({
		...dC,
		present: L(!0).describe("There is derived text for that file."),
		path: D().describe("The file it was derived from, as asked for."),
		content: D().describe("The text itself, as markdown."),
		deriver: D().describe("Which reader wrote it, and at which version, such as `pdf+ocr v1`. A file re-derives when this changes."),
		derivedAt: D().optional().describe("When it was written, as an ISO timestamp. Absent only for a shadow whose front matter was edited by hand."),
		title: D().optional().describe("The title the format carried, where it carried one."),
		notes: j(D()).describe("Every cap and degradation the derivation hit: a sheet cut to 200 rows, a book cut at 2 MB, a scan recognised rather than read. Show these with the text, since text that was cut reading as complete is the one failure this whole feature cannot afford."),
		tokens: k().describe("Roughly what an agent spends reading it, by the same four-chars-a-token estimate every budget here uses."),
		truncated: A().describe("Whether this is only the start of the shadow, cut to keep the response sendable. The file on disk holds the rest."),
		stale: A().describe("Whether the file has changed since this text was derived, compared by content rather than by clock. True means you are reading a rendering of an older version of the file, and deriving it again catches it up.")
	}), pC = M({
		...dC,
		present: L(!1).describe("There is no derived text for that file. Read `state` before saying so to anyone: absent and being read are different answers."),
		path: D().describe("The file, as asked for."),
		derivable: A().describe("Whether this format can be turned into text at all. True means asking for it to be derived is worth offering; false means nothing here reads this format."),
		reason: D().optional().describe("Why there is none, when deriving was just attempted and produced nothing: the file is too large, corrupt, or of a format no reader claims.")
	}), mC = P("present", [fC, pC]), hC = qS.extend({ path: D().min(1).max(512).describe("The reference as somebody wrote it. Often only the tail of the real path, which is why this is matched against the tree rather than read as-is.") }), gC = M({ path: D().optional().describe("The real path it means. Absent when nothing in the workspace ends that way.") }), _C = M({ path: D().min(1).describe("The folder to create. Missing folders above it are created too.") }), vC = M({
		from: D().min(1).describe("What to move or copy, as a workspace path."),
		to: D().min(1).describe("Where it should end up. Changing only the last part is how you rename something.")
	}), yC = M({ path: D().describe("Where the contents landed, as a workspace path: a new folder named after the archive, or the decompressed file itself when the archive held just one. Never an existing entry written over, so a name already taken lands beside it under a free one.") }), bC = M({
		ok: L(!0).describe("Always true: the entry is gone from where it was, or was never there."),
		trashed: D().optional().describe("The trash id that brings it back through the restore call, for a day. Absent when there was nothing at that path to delete.")
	}), xC = M({ trashed: D().min(1).describe("The trash id a delete answered with.") }), SC = M({ path: D().describe("Where it came back, as a workspace path: where it was deleted from, or beside that under a `(restored)` name when something new has taken the name since.") }), CC = I([
		"repositories",
		"documents",
		"media",
		"archives",
		"other"
	]), wC = M({ classifications: j(M({
		path: D().describe("What was looked at."),
		bucket: CC.describe("Which bucket it was sorted into."),
		reason: D().describe("The signal that decided it, so the proposal can be argued with rather than trusted.")
	})).describe("One entry per repository folder and loose file at the top of the workspace. A read-only proposal: nothing moves until you apply it.") });
})), EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC, BC, VC, HC, UC, WC = v((() => {
	V(), e_(), $p(), Y(), TC(), EC = Dl({ kind: D() }), DC = M({
		kind: L("heartbeat"),
		rev: k()
	}), OC = M({
		key: D(),
		label: D(),
		state: I([
			"pending",
			"running",
			"done",
			"failed"
		]),
		ms: k().optional()
	}), kC = M({
		ready: A(),
		startedAt: k(),
		steps: j(OC)
	}), AC = M({
		kind: L("boot"),
		...kC.shape
	}), jC = M({
		kind: L("hello"),
		workspaceId: D(),
		routes: j(D()).optional(),
		shapes: F(D(), D()).optional(),
		build: D().optional(),
		boot: kC.optional(),
		projectDir: D().optional(),
		surface: I(["sandbox", "folder"]).optional()
	}), MC = M({
		kind: L("reposChanged"),
		repos: j(D())
	}), NC = M({
		kind: L("workspaceChanged"),
		paths: j(D())
	}), PC = M({
		kind: L("derivedChanged"),
		paths: j(D())
	}), FC = M({
		kind: L("refsChanged"),
		repos: j(D())
	}), IC = M({
		kind: L("runtimeChanged"),
		domains: j(D())
	}), LC = M({
		clientId: D(),
		email: D(),
		name: D().optional(),
		picture: D().optional(),
		role: Dm,
		idle: A(),
		view: D().optional(),
		sessionId: D().optional(),
		path: D().optional()
	}), RC = M({
		kind: L("presence"),
		users: j(LC)
	}), zC = M({
		kind: L("agents"),
		agents: j(X),
		rev: k()
	}), BC = M({
		kind: L("accountUsage"),
		provider: D(),
		account: D(),
		usage: jp.optional()
	}), VC = M({
		kind: L("providerRefusal"),
		provider: D(),
		refusal: Ip.optional()
	}), HC = ZS.extend({ kind: L("treeChanged") }), UC = P("kind", [
		jC,
		DC,
		AC,
		NC,
		HC,
		PC,
		MC,
		FC,
		IC,
		RC,
		zC,
		BC,
		VC
	]);
})), GC, KC, qC, JC, YC, XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw = v((() => {
	V(), Vd(), GC = I([
		"tor",
		"vpngate",
		"wireguard"
	]), KC = D().regex(/^[A-Za-z]{2}$/, "A country is its two-letter code, like DE, US or JP.").transform((e) => e.toUpperCase()), qC = M({
		provider: L("tor"),
		country: KC.optional(),
		autoStart: Bd
	}), JC = M({
		provider: L("vpngate"),
		country: KC.optional(),
		autoStart: Bd
	}), YC = M({
		provider: L("wireguard"),
		config: D().min(1),
		country: KC.optional(),
		autoStart: Bd
	}), XC = P("provider", [
		qC,
		JC,
		YC
	]), ZC = I([
		"up",
		"starting",
		"down",
		"unavailable",
		"failed"
	]), QC = M({
		ip: D().describe("The address the world sees, looked up through the exit's own proxy rather than assumed."),
		country: D().optional().describe("Which country that address is in. Absent when the lookup gave an address and no country, in which case a switch is judged on the address having changed instead."),
		countryName: D().optional().describe("That country's name, spelled out.")
	}), $C = M({
		country: D().describe("The country's code."),
		countryName: D().describe("Its name, spelled out."),
		servers: k().describe("How many servers this provider has there."),
		share: k().optional().describe("How much of the provider's actual capacity is there, from zero to one. This is what a list should be sorted by: a third of the countries on offer are one overloaded machine behind a flag, and a count of servers would rank them first.")
	}), ew = M({
		countries: j($C).describe("Where this exit can put you, best-supplied first."),
		live: A().describe("Whether the provider answered, or this came from a built-in list. Said out loud rather than presenting an old list as current.")
	}), tw = M({
		id: D().describe("Which exit."),
		provider: GC.describe("What it runs on."),
		state: ZC.describe("Whether it is carrying traffic, coming up, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		proxy: D().describe("Where to point traffic that should go through it. Fixed per exit and unchanged by a country switch, which is what lets a long job move country halfway through without reconfiguring anything."),
		country: D().optional().describe("Where it was asked to come out. Absent means the provider chose."),
		observedCountry: D().optional().describe("Where it actually comes out, as last checked. Kept separate from what was asked for, because those two disagreeing is the most useful fault signal this whole feature has."),
		ip: D().optional().describe("The address behind that observation."),
		checkedAt: k().optional().describe("When that was checked, in milliseconds, so an old reading can be shown as old."),
		interface: D().optional().describe("The network interface, for the kinds that have one."),
		since: k().optional().describe("When it came up, in milliseconds."),
		autoStart: A().describe("Whether it starts itself when the sandbox does."),
		detail: D().optional().describe("Why it failed, or a note about a healthy one.")
	}), nw = M({ links: j(tw).describe("Every configured exit, with where it was asked to come out and where it actually does.") }), rw = M({ id: D().describe("Which exit.") }), iw = M({
		id: D().describe("Which exit."),
		country: KC.optional().describe("Where to come out. Leaving it out means letting the provider choose, so clearing a country is something you can actually say rather than only setting one.")
	});
})), ow, sw, cw, lw, uw, dw, fw, pw, mw, hw, gw, _w = v((() => {
	V(), ow = I(["smb"]), sw = I(["read", "readwrite"]), cw = I([
		"auto",
		"3.1.1",
		"3.0",
		"2.1",
		"1.0"
	]), lw = I(["on", "off"]).default("on"), uw = (e) => D().min(1).refine((e) => !/[\\/\s]/.test(e), { message: `${e} is one name, without slashes or spaces.` }), dw = M({
		provider: L("smb"),
		server: uw("Server").describe("The NAS or file server: a hostname or address, reachable from the sandbox (through a VPN if it is behind one)."),
		share: uw("Share").describe("The share name, the first path segment after the server in //server/share."),
		path: D().optional().refine((e) => e === void 0 || !e.startsWith("/") && !e.split("/").includes(".."), { message: "Path is a folder inside the share, like projects/2026, with no leading slash and no '..'." }).describe("A folder inside the share to mount instead of its root."),
		username: D().min(1).describe("The account the sandbox mounts as. For a read-only disk, give it an account the server itself limits to reading."),
		password: D().optional().describe("Its password. Leave empty for a guest share."),
		domain: D().optional().describe("The Windows domain or workgroup, only where the server asks for one."),
		access: sw.default("read").describe("Whether the agent may write to it. Read-only is the default."),
		version: cw.default("auto").describe("The SMB dialect to insist on. Leave on auto unless the server refuses."),
		autoMount: lw
	}), fw = P("provider", [dw]), pw = I([
		"mounted",
		"unmounted",
		"unavailable"
	]), mw = M({
		id: D().describe("Which disk."),
		provider: ow.describe("What protocol it speaks."),
		state: pw.describe("Whether it is mounted, resting, or not mountable yet because its client needs a rebuild to arrive."),
		target: D().describe("What it mounts, as //server/share. For display only, and never a credential."),
		mountPoint: D().describe("Where its files appear inside the sandbox."),
		access: sw.describe("What the card asked for: read, or read and write."),
		writable: A().optional().describe("Whether the live mount accepts writes, as the kernel has it. Absent unless mounted."),
		since: k().optional().describe("When it was mounted, in milliseconds. Absent unless it is."),
		autoMount: A().describe("Whether it mounts itself when the sandbox starts."),
		detail: D().optional().describe("Why it is unavailable, or a note about a healthy one. Never a credential.")
	}), hw = M({ links: j(mw).describe("Every configured disk with its live mount state, read back from the kernel each time rather than remembered.") }), gw = M({ id: D().describe("Which disk.") });
})), vw, yw, bw, xw, Sw, Cw, ww, Tw, Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw = v((() => {
	V(), vw = I([
		"wireguard",
		"fortinet",
		"ipsec"
	]), yw = I(["on", "off"]).default("on"), bw = (e) => /^Enc[X]?\s+[0-9A-Fa-f]{8,}$/.test(e.trim()), xw = (e, t) => e.refine((e) => !bw(e), { message: `That looks like a value copied straight out of a FortiClient config, FortiClient encrypts it with a key tied to the machine that exported it, so it can't be used here. Enter the actual ${t} (ask whoever administers the gateway).` }), Sw = M({
		provider: L("wireguard"),
		config: D().min(1),
		autoConnect: yw
	}), Cw = M({
		provider: L("fortinet"),
		server: D().min(1),
		port: B().int().min(1).max(65535).default(443),
		username: D().min(1),
		password: xw(D().min(1), "password"),
		trustedCert: D().min(1).optional(),
		realm: D().min(1).optional(),
		autoConnect: yw
	}), ww = M({
		provider: L("ipsec"),
		server: D().min(1),
		presharedKey: xw(D().min(1), "pre-shared key"),
		localId: D().min(1).optional(),
		remoteId: D().min(1).optional(),
		username: D().min(1).optional(),
		password: xw(D().min(1), "XAuth password").optional(),
		ikeVersion: I(["1", "2"]).default("1"),
		pfs: I(["on", "off"]).default("on"),
		dhGroup: I([
			"2",
			"5",
			"14",
			"15",
			"16",
			"19",
			"20"
		]).default("14"),
		aggressive: I(["on", "off"]).default("on"),
		routedNetworks: D().default("0.0.0.0/0").refine((e) => e.split(",").map((e) => e.trim()).every((e) => xl().safeParse(e).success || Sl().safeParse(e).success), { message: "Routed networks is a comma-separated list of CIDRs, like 10.0.0.0/8,192.168.0.0/16. A single host needs its prefix too (192.168.0.168/32). Leave it at 0.0.0.0/0 to send everything through the gateway." }),
		autoConnect: yw
	}), Tw = P("provider", [
		Sw,
		Cw,
		ww
	]), Ew = I([
		"connected",
		"connecting",
		"disconnected",
		"unavailable",
		"failed"
	]), Dw = M({
		id: D().describe("Which tunnel."),
		provider: vw.describe("What kind of tunnel it is."),
		state: Ew.describe("Whether it is up, dialling, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		gateway: D().optional().describe("What it dials. For display only, and never a credential."),
		interface: D().optional().describe("The network interface carrying it, once one exists."),
		address: D().optional().describe("The address the far end gave this sandbox, which is the single most useful answer to whether you are on the VPN."),
		routes: j(D()).default([]).describe("What goes through it. Everything, when the range covers the whole internet. Empty until it is up."),
		dns: j(D()).default([]).describe("Name servers it pushed, when it pushed any."),
		since: k().optional().describe("When it came up, in milliseconds. Absent unless it is."),
		autoConnect: A().describe("Whether it dials itself when the sandbox starts."),
		detail: D().optional().describe("Why it failed, or a note about a healthy one. Never a credential.")
	}), Ow = M({ links: j(Dw).describe("Every configured tunnel with its live state, read back from the operating system each time rather than remembered.") }), kw = M({
		id: D().describe("Which tunnel to dial."),
		otp: D().min(1).optional().describe("A one-time code, where the gateway wants one. Supplied per dial and never stored; without it such a gateway refuses and says so.")
	}), Aw = M({ id: D().describe("Which tunnel.") }), jw = M({ xml: D().min(1).describe("The exported configuration file, whole. Nothing is stored: it is read and thrown away.") }), Mw = M({
		id: D().describe("The id it would be added under."),
		label: D().describe("Its name as the file has it, so somebody recognises the connection they are picking."),
		provider: vw.describe("What kind of tunnel it is."),
		server: D().describe("Where it dials."),
		port: k().describe("On which port."),
		username: D().optional().describe("The username, but only when the file stored it in the clear. An encrypted one is dropped rather than guessed at."),
		description: D().optional().describe("Whatever the file said about it."),
		localId: D().optional().describe("An identity some tunnel types need, when the file stored it readably."),
		aggressive: A().optional().describe("Which negotiation mode it used."),
		pfs: A().optional().describe("Whether it asked for forward secrecy."),
		dhGroup: D().optional().describe("Which key-exchange group it used. Together with the setting above, this is what decides whether the connection can complete at all."),
		needs: j(D()).describe("What you still have to type in before it can dial. Always at least the password, because the export wraps credentials in encryption that cannot be undone here.")
	}), Nw = M({ connections: j(Mw).describe("The connections found in the file, ready to be added one at a time.") });
})), Fw, Iw, Lw, Rw, zw, Bw, Vw, Hw = v((() => {
	V(), Fw = I(["on", "off"]), Iw = M({
		read: Fw.default("on"),
		act: Fw.default("on"),
		screenshot: Fw.default("off"),
		cookies: Fw.default("off"),
		confirm: I([
			"sensitive",
			"always",
			"never"
		]).default("sensitive")
	}), Lw = Iw.extend({ platform: D().min(1) }), Rw = M({
		origin: D(),
		mode: I(["read", "act"])
	}), zw = M({
		browser: D(),
		tabs: k(),
		grants: j(Rw),
		paused: A(),
		features: j(D()).optional()
	}), Bw = M({
		id: D(),
		platform: D().min(1),
		online: A(),
		version: D().optional(),
		lastSeen: k().optional(),
		facts: zw.optional()
	}), M({ browsers: j(Bw) }), Vw = M({
		name: D(),
		value: D(),
		domain: D(),
		path: D(),
		expires: k().optional(),
		httpOnly: A(),
		secure: A(),
		sameSite: I([
			"Strict",
			"Lax",
			"None"
		])
	}), M({
		account: D().min(1),
		origin: D().min(1),
		cookies: j(Vw).min(1).max(300)
	}), M({
		account: D().min(1),
		domain: D().min(1)
	}), M({
		ok: A(),
		message: D(),
		cookies: j(Vw).optional()
	});
})), Uw, Ww, Gw, Kw, qw, Jw, Yw, Xw, Zw, Qw, $w, eT, tT, nT, rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT = v((() => {
	V(), aw(), Vd(), _w(), Pw(), Hw(), Uw = I([
		"devops",
		"monorepo",
		"mcp",
		"cli",
		"plugin",
		"extension",
		"ssh",
		"vpn",
		"exit",
		"netdisk",
		"docker",
		"browser",
		"identity",
		"device",
		"webext",
		"agent",
		"endpoint",
		"localmodel",
		"wallet",
		"fleet"
	]), Ww = I([
		"active",
		"pending",
		"error",
		"inactive"
	]), Gw = M({
		url: O().describe("Where the tool server answers."),
		token: D().optional().describe("The credential it needs, if any. Stored, never echoed back.")
	}), Kw = M({ provider: D().min(1).describe("Which tool to give the agent. The rest of the fields are whatever that tool's own card declares it needs, and are checked against it when you connect.") }).catchall(D()), qw = M({
		url: O().describe("The repository to take the plugin from."),
		ref: D().min(1).optional().describe("A branch, tag or commit to pin to. Leave it out to follow the default branch."),
		path: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the plugin lives, for one that sits in a larger checkout."),
		token: D().min(1).optional().describe("A credential for a private repository. Stored, never echoed back.")
	}), Jw = M({
		url: O().describe("The repository to take the extension from."),
		ref: D().regex(/^[0-9a-f]{40}$/, "ref must be a full 40-character commit sha").describe("The exact commit to install, in full. Required rather than optional because extension code runs with your browser's trust: the owner approves precisely the code that runs, and an update is a deliberate re-install at a new commit."),
		path: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the extension lives, for one that sits in a larger checkout."),
		token: D().min(1).optional().describe("A credential for a private repository. Stored, never echoed back."),
		registry: O().optional().describe("Which registry this install came from, which is what update checks and security advisories are read against. Absent falls back to the official one.")
	}), Yw = P("auth", [
		M({
			auth: L("key").describe("Sign in with a key."),
			host: D().min(1).describe("The machine's address."),
			port: B().default(22).describe("Which port it listens on."),
			user: D().min(1).describe("Which user to connect as."),
			privateKey: D().min(1).describe("The private key, whole. Stored with tight permissions and never echoed back.")
		}),
		M({
			auth: L("generated").describe("Sign in with a key the sandbox generated. Its private half never left the sandbox."),
			host: D().min(1).describe("The machine's address."),
			port: B().default(22).describe("Which port it listens on."),
			user: D().min(1).describe("Which user to connect as."),
			privateKey: D().min(1).describe("The private half of the generated key. Stored with tight permissions and never echoed back.")
		}),
		M({
			auth: L("password").describe("Sign in with a password."),
			host: D().min(1).describe("The machine's address."),
			port: B().default(22).describe("Which port it listens on."),
			user: D().min(1).describe("Which user to connect as."),
			password: D().min(1).describe("The password. Stored, never echoed back.")
		})
	]), Xw = M({
		gpu: I(["on", "off"]).default("off"),
		registryMirror: O().optional(),
		insecureRegistries: D().optional(),
		addressPool: D().optional()
	}), Zw = M({
		platform: D().min(1),
		username: D().optional(),
		password: D().optional(),
		identity: D().optional(),
		purpose: D().optional(),
		openedAt: D().optional(),
		exit: D().optional()
	}).catchall(D()), Qw = M({
		email: D().min(3),
		password: D().optional(),
		mailbox: D().optional(),
		loginUrl: O().optional(),
		openAccounts: I(["on", "off"]).default("off"),
		exit: D().optional()
	}), $w = I(["on", "off"]), eT = M({
		shell: $w.default("on"),
		write: $w.default("off"),
		screen: $w.default("on"),
		control: $w.default("off"),
		sandboxes: $w.default("off"),
		destructive: $w.default("off"),
		roots: D().optional()
	}), tT = eT.extend({ platform: D().min(1) }), nT = M({
		command: D().min(1),
		name: D().min(1).optional(),
		env: D().optional(),
		loginCommand: D().min(1).optional()
	}), rT = I(["openai", "anthropic"]), iT = M({
		baseUrl: O(),
		protocol: rT.default("openai"),
		apiKey: D().optional(),
		headers: D().optional()
	}), aT = [
		"16384",
		"32768",
		"65536",
		"131072"
	], oT = "65536", sT = 2048, cT = 1048576, lT = [
		{
			id: "unsloth/Qwen3.5-2B-GGUF/Qwen3.5-2B-Q4_K_M.gguf",
			label: "Qwen3.5 2B",
			weightsBytes: 1280835840,
			tier: "instant",
			revision: "f6d5376be1edb4d416d56da11e5397a961aca8ae",
			sha256: "aaf42c8b7c3cab2bf3d69c355048d4a0ee9973d48f16c731c0520ee914699223"
		},
		{
			id: "unsloth/Phi-4-mini-instruct-GGUF/Phi-4-mini-instruct-Q4_K_M.gguf",
			label: "Phi-4-mini 3.8B",
			weightsBytes: 2491874272,
			tier: "work",
			revision: "78eb92a46fc37e6b524df991ed9aca9bc6aa7b80",
			sha256: "88c00229914083cd112853aab84ed51b87bdf6b9ce42f532d8c85c7c63b1730a"
		},
		{
			id: "unsloth/Qwen3.5-9B-GGUF/Qwen3.5-9B-Q4_K_M.gguf",
			label: "Qwen3.5 9B",
			weightsBytes: 5680522464,
			tier: "work",
			revision: "3885219b6810b007914f3a7950a8d1b469d598a5",
			sha256: "03b74727a860a56338e042c4420bb3f04b2fec5734175f4cb9fa853daf52b7e8"
		},
		{
			id: "unsloth/gemma-4-12b-it-GGUF/gemma-4-12b-it-Q4_K_M.gguf",
			label: "Gemma 4 12B",
			weightsBytes: 7121861440,
			tier: "work",
			revision: "fc034cfff751157913579611efad8462ac1be606",
			sha256: "0a270ec9fe6b34f4a0d33992b6135117b484ebc4766ab76b51d4ae8c457e4c42"
		},
		{
			id: "unsloth/Qwen3.8-27B-GGUF/Qwen3.8-27B-UD-Q4_K_M.gguf",
			label: "Qwen3.8 27B",
			weightsBytes: 16464440224,
			tier: "work",
			revision: "4ca720788d1e01f1bff70c033e0d0028fd02e502",
			sha256: "322e194ff79741c7baa497c240f677f54b201b0efab44ca8e50f122b39123482"
		}
	], lT.find((e) => e.tier === "instant"), uT = M({
		model: D().min(1),
		gpu: I(["on", "off"]).default("off"),
		url: O().optional(),
		context: N([I(aT), L("custom")]).default(oT),
		contextTokens: B().int().min(sT).max(cT).optional()
	}), dT = D().regex(/^\d+(\.\d{1,6})?$/, "a USD amount like 0.50 (up to six decimals: USDC's own precision)"), fT = I(["eip155:8453", "eip155:84532"]), pT = M({
		network: fT.default("eip155:8453"),
		address: D().optional(),
		perPaymentMaxUsd: dT.default("1.00"),
		autoApproveUnderUsd: dT.default("0"),
		dailyCapUsd: dT.default("5.00"),
		allow: D().optional(),
		deny: D().optional()
	}), mT = M({ token: D().min(1).describe("A provisioning token from Settings ▸ Tokens. Stored, never echoed back.") }), hT = P("kind", [
		M({
			id: G,
			kind: L("devops"),
			config: M({})
		}),
		M({
			id: G,
			kind: L("monorepo"),
			config: M({})
		}),
		M({
			id: G,
			kind: L("mcp"),
			config: Gw
		}),
		M({
			id: G,
			kind: L("cli"),
			config: Kw
		}),
		M({
			id: G,
			kind: L("plugin"),
			config: qw
		}),
		M({
			id: G,
			kind: L("extension"),
			config: Jw
		}),
		M({
			id: G,
			kind: L("ssh"),
			config: Yw
		}),
		M({
			id: G,
			kind: L("vpn"),
			config: Tw
		}),
		M({
			id: G,
			kind: L("exit"),
			config: XC
		}),
		M({
			id: G,
			kind: L("netdisk"),
			config: fw
		}),
		M({
			id: G,
			kind: L("docker"),
			config: Xw
		}),
		M({
			id: G,
			kind: L("browser"),
			config: Zw
		}),
		M({
			id: G,
			kind: L("identity"),
			config: Qw
		}),
		M({
			id: G,
			kind: L("device"),
			config: tT
		}),
		M({
			id: G,
			kind: L("webext"),
			config: Lw
		}),
		M({
			id: G,
			kind: L("agent"),
			config: nT
		}),
		M({
			id: G,
			kind: L("endpoint"),
			config: iT
		}),
		M({
			id: G,
			kind: L("localmodel"),
			config: uT
		}),
		M({
			id: G,
			kind: L("wallet"),
			config: pT
		}),
		M({
			id: G,
			kind: L("fleet"),
			config: mT
		})
	]), gT = M({
		state: Ww.describe("Whether it is live, still coming up, broken, or switched off."),
		detail: D().optional().describe("What is wrong, in words a person can act on."),
		code: D().optional().describe("A short marker for that reason, for anything deciding what to do about it."),
		settling: A().optional().describe("True while something under way will move this on its own: a start, a download, a pairing code waiting to be typed. Absent when only a person can move it, or a pushed change will say when it moved.")
	}), _T = M({
		id: D().describe("The connection's id."),
		kind: Uw.describe("What sort of thing it is."),
		status: gT.describe("Whether it is working."),
		config: F(D(), N([
			D(),
			k(),
			A()
		])).describe("Its settings, minus anything secret."),
		secrets: j(D()).default([]).describe("Which credentials it holds, by name. The values are on one route only, and it is not this one.")
	}), vT = M({
		entry: D().describe("Which catalog entry is being suggested."),
		evidence: D().describe("What was seen that prompted it: a file, a remote, printed verbatim so the claim can be checked rather than believed."),
		reason: D().describe("The same claim in words, without repeating the evidence into it."),
		prefill: F(D(), D()).describe("Settings the scan could read, to fill the form so you supply only the credential. Never a secret, even when one is sitting in a checked-in file: the suggestion points at such a file, it does not absorb what is in it.")
	}), yT = M({
		capabilities: j(_T).describe("What this sandbox is connected to."),
		recommendations: j(vT).default([]).describe("Things worth connecting, worked out from what is actually in the workspace rather than from anything you configured. Re-derived on every read, so one whose evidence has moved simply stops being suggested.")
	}), bT = M({ id: D().describe("Which connection.") }), xT = M({
		id: D().describe("The connection's id."),
		kind: D().describe("What sort of thing it is."),
		config: F(D(), D()).describe("Its settings exactly as stored, credentials included. The field names are its own kind's, which the caller already knows.")
	}), ST = M({ entry: D().describe("Which suggestion to stop making.") }), CT = M({
		id: D().describe("Which connection."),
		value: D().min(1).describe("The new credential. Its other settings are left alone.")
	}), wT = M({
		id: D(),
		to: D().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
	}), TT = M({ session: D().describe("The terminal the sign-in is happening in. Attach to it to type.") }), ET = M({
		code: D().describe("The code."),
		secondsRemaining: k().describe("How long it lasts. Its expiring is what makes handing one to an agent safe, since the seed behind it is never revealed.")
	}), DT = M({
		checked: A().describe("Whether this connection can be tested from here at all. False is not a failure: it is 'no test exists'."),
		ok: A().describe("Whether the service answered as itself."),
		message: D().describe("What happened, in the words a person standing in front of the form needs: the service's own answer, or its refusal."),
		who: D().optional().describe("Who the service said the credential belongs to, when it said.")
	}), OT = M({
		publicKey: D().describe("The public half, as the one line a server's authorized_keys holds: `ssh-ed25519 AAAA… intentic-<sandbox>`."),
		token: D().describe("Stands for the private half, which never leaves the sandbox. Sent wrapped as a marker in the private key's place, it installs that key once, and it lapses after thirty minutes.")
	});
})), AT, jT, MT, NT = v((() => {
	V(), AT = M({
		url: D(),
		ref: D().optional(),
		path: D().optional()
	}), jT = (e, t, n) => {
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
	}, MT = /^[0-9a-f]{40}$/;
})), PT, FT, IT, LT, RT, zT, BT = v((() => {
	V(), NT(), PT = M({
		sha: D().regex(MT, "must be a full lowercase commit sha"),
		url: D().min(1),
		path: D().min(1).optional(),
		policy: D().min(1),
		reviewer: D().min(1),
		reviewedAt: Gu(),
		runId: D().min(1),
		deterministic: M({
			policy: D().min(1),
			scanner: D().min(1),
			version: D().min(1),
			runId: D().min(1)
		})
	}), FT = I([
		"verified",
		"listed",
		"blocked"
	]), IT = M({
		name: D(),
		description: D().optional(),
		version: D().optional(),
		kind: I(["plugin", "extension"]).optional(),
		trust: FT.optional(),
		trustReason: D().optional(),
		securityReview: PT.optional(),
		securityFix: A().optional(),
		category: D().optional(),
		art: D().max(4096).optional(),
		logo: D().optional(),
		icon: D().optional(),
		homepage: O().optional(),
		source: wl()
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
		let r = jT(e.source, "", void 0);
		(r?.ref !== e.securityReview.sha || r?.url !== e.securityReview.url || r.path !== e.securityReview.path) && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "must equal the exact repository, commit and subdirectory named by source"
		});
	}), M({
		name: D(),
		metadata: M({ pluginRoot: D().optional() }).optional(),
		plugins: j(IT)
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
	}), LT = M({
		sha: D(),
		manifest: D(),
		bundle: D(),
		engines: D().optional()
	}), RT = M({
		name: D(),
		stars: k().int().nonnegative().optional(),
		pushedAt: D().optional(),
		checks: LT.optional()
	}), M({
		scannedAt: D(),
		entries: j(RT)
	}), zT = M({
		name: D(),
		description: D().optional(),
		version: D().optional(),
		kind: I(["plugin", "extension"]),
		trust: FT,
		trustReason: D().optional(),
		securityReview: PT.optional(),
		admitted: A(),
		securityFix: A().optional(),
		category: D().optional(),
		art: D().optional(),
		logo: D().optional(),
		icon: D().optional(),
		homepage: D().optional(),
		install: AT.optional(),
		stars: k().int().nonnegative().optional(),
		pushedAt: D().optional(),
		checks: LT.optional()
	});
})), VT = v((() => {
	BT(), NT();
})), HT, UT, WT = v((() => {
	V(), VT(), HT = M({
		url: O().describe("The registry to read."),
		token: D().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log.")
	}), UT = M({
		name: D().describe("What the registry calls itself."),
		plugins: j(zT).describe("What it lists, each with the curated decision, the resolved pointer and what a scan found upstream.")
	});
})), GT, KT, qT, JT = v((() => {
	V(), GT = M({
		url: O().describe("The repository to ask. http(s) only: an ssh remote would stop on a host-key prompt nobody can answer."),
		token: D().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log. A form editing a live connection has never been shown its token: it sends the VAULTED marker here and names the connection in `keeping`, so a private repository still answers without anyone retyping a key."),
		keeping: D().min(1).optional().describe("Which connection a VAULTED token belongs to. Ignored when a real token is sent.")
	}), KT = M({
		name: D().describe("The branch or tag as a person names it: `main`, `v1.4.0`."),
		kind: I(["branch", "tag"]),
		sha: D().regex(/^[0-9a-f]{40}$/).describe("The commit it points at. An annotated tag is peeled here, so this is always a commit, never a tag object.")
	}), qT = M({
		defaultBranch: D().optional().describe("The branch the remote advertises as HEAD, the one to offer first. Absent when the remote advertises no symref."),
		refs: j(KT).describe("Every branch the remote advertises, then every tag. Which to offer first is the reader's question, not this one's.")
	});
})), Z, YT, XT = v((() => {
	W(), _d(), WC(), kT(), WT(), JT(), Y(), Z = U.meta({
		floor: "maintainer",
		control: "never"
	}), YT = {
		list: Z.route({
			method: "GET",
			path: "/capabilities",
			summary: "Everything this sandbox is connected to",
			description: "Each connection with its live state, the settings that are safe to show, and the names of the credentials it holds. The values of those credentials are never in the answer, on any route but one."
		}).output(yT),
		add: Z.route({
			method: "POST",
			path: "/capabilities",
			summary: "Connect something, or change a connection",
			description: "Writes a connection and streams the work of applying it, because some kinds provision real infrastructure and take a while. Sending an id that already exists edits that connection: this is the edit as well as the create. Since a caller is never shown stored credentials, it marks the ones it is leaving alone and the daemon fills them in, which is the only way to change one setting without retyping a key."
		}).input(hT).output(H(EC)),
		probe: Z.route({
			method: "POST",
			path: "/capabilities/probe",
			summary: "Test a connection's settings without saving them",
			description: "Dials the service the way this connection would and hands back what it said, before anything is written. The answer is the service's own confirmation or its exact refusal, so a wrong token or an unreachable host is found on the form rather than on a card afterwards."
		}).meta({ panel: !1 }).input(hT).output(DT),
		sshKey: Z.route({
			method: "POST",
			path: "/capabilities/ssh-key",
			summary: "Generate an SSH key for a connection",
			description: "Makes an ed25519 key pair inside the sandbox and answers with its public half, to authorize on the server, and a one-time token. The private half is never in the answer: it waits in the sandbox until an add sends the token where the private key goes, and lapses if none does within thirty minutes."
		}).meta({ panel: !1 }).output(OT),
		remove: Z.route({
			method: "DELETE",
			path: "/capabilities/{id}",
			summary: "Disconnect something",
			description: "Tears a connection down. The kinds that own real infrastructure refuse, because deleting those would be losing data rather than losing a connection."
		}).input(bT).output(q),
		rename: Z.route({
			method: "POST",
			path: "/capabilities/{id}/rename",
			summary: "Rename a connection",
			description: "Carries everything the old name keyed across with it: a browser profile and its logins, an enrolled machine, an extension's copy of its source. Removing and re-adding would lose exactly the state that made the connection worth keeping. Kinds whose name is part of what they are refuse."
		}).input(wT).output(q),
		setSecret: Z.route({
			method: "POST",
			path: "/capabilities/{id}/secret",
			summary: "Replace a stored credential",
			description: "Swaps one connection's key or token for a new one and re-applies it, without touching any of its other settings."
		}).input(CT).output(q),
		status: Z.route({
			method: "GET",
			path: "/capabilities/{id}/status",
			summary: "Re-check one connection",
			description: "Probes a single connection right now, for a screen that wants to refresh one row rather than the whole list."
		}).input(bT).output(gT),
		connection: Z.route({
			method: "GET",
			path: "/capabilities/{id}/connection",
			summary: "A connection's settings, credentials included",
			description: "The one call that hands back stored secrets, so an extension's own backend can dial the service behind a connection. Never answered for a signed-in person: only a machine credential reaches it, and an extension's only if its manifest asked for this route out loud at install time, and only for a connection of a kind that extension itself contributes."
		}).meta({ panel: !1 }).input(bT).output(xT),
		marketplace: Z.route({
			method: "POST",
			path: "/capabilities/marketplace",
			summary: "Read a plugin marketplace",
			description: "Resolves a plugin marketplace source into the list of connections you could install from it."
		}).input(HT).output(UT),
		refs: Z.route({
			method: "POST",
			path: "/capabilities/refs",
			summary: "The versions a repository offers",
			description: "Asks a git remote what it advertises and hands back every branch and tag with the commit it points at, plus which branch is its default. Nothing is cloned and nothing is written, so this is cheap enough to answer a form as someone types a repository into it."
		}).input(GT).output(qT),
		dismiss: Z.route({
			method: "DELETE",
			path: "/capabilities/recommendations/{entry}",
			summary: "Stop suggesting this connection",
			description: "Not needed, for now. Nothing is torn down. The suggestion comes back if what prompted it in the workspace changes, because what is remembered is the evidence, not the refusal."
		}).input(ST).output(q),
		login: Z.route({
			method: "POST",
			path: "/capabilities/{id}/login",
			summary: "Sign in to a connection by hand",
			description: "Opens the connection's own sign-in in a terminal a person can type into, for the flows that need a code pasted or a device confirmed. The answer names the terminal to attach to."
		}).input(bT).output(TT),
		otp: Z.route({
			method: "GET",
			path: "/capabilities/{id}/otp",
			summary: "Mint a one-time code",
			description: "Generates a single two-factor code from a stored seed. The one credential-adjacent read an agent is allowed, and it is safe because a code expires in seconds and never reveals the seed, so an agent can answer a prompt without ever holding the factor."
		}).meta({ agent: !0 }).input(bT).output(ET)
	};
})), ZT, QT, $T, eE, tE, nE, rE, iE = v((() => {
	V(), ZT = M({
		query: D().min(2).max(512).describe("What to look for. Plain words, a pattern, a symbol name, or a question."),
		mode: I([
			"q",
			"find",
			"files",
			"def",
			"refs",
			"sym",
			"ast"
		]).optional().describe("Narrow the search to one kind: plain text, filenames, definitions, references, symbols, or code structure. Leave it out to blend them, which also answers a question asked in words."),
		includeIgnored: Hu().optional().describe("Search inside installed packages and other ignored folders too."),
		dir: D().max(512).optional().describe("Only look inside this folder, given as a path from the workspace root. Leave it out to search everything."),
		literal: Hu().optional().describe("Treat the query as fixed text rather than a pattern."),
		word: Hu().optional().describe("Match whole words only."),
		caseSensitive: Hu().optional().describe("Whether capitals matter. Off means they do not, rather than being guessed at from the query."),
		include: D().max(512).optional().describe("Which files to ask, in the same grammar an editor's files-to-include box takes: comma-separated patterns, matched at any depth unless anchored, a leading exclamation mark excluding instead."),
		limit: B().int().positive().optional().describe("How many results to return."),
		after: D().optional().describe("Resume from the cursor a previous answer handed back.")
	}), QT = M({
		kind: I([
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
		score: k().optional().describe("How strongly that reason applied.")
	}), $T = M({
		start: k().describe("First character of the match within the line."),
		end: k().describe("One past the last.")
	}), eE = M({
		line: k().describe("Which line, counting from one."),
		text: D().describe("The line itself."),
		spans: j($T).describe("Where in the line the matches are, so you can highlight without searching again. Empty when the whole line is the match rather than part of it."),
		tags: j(QT).describe("Why it matched."),
		context: D().optional().describe("What it sits inside: the function, the class, the heading. Often enough that you need not open the file.")
	}), tE = M({
		path: D().describe("The file."),
		score: k().describe("How well it matched. Groups arrive best first, never in path order."),
		hits: j(eE).describe("The matching lines in it."),
		capped: A().optional().describe("This file had more matches than are kept per file, so the count is a floor. Say fifty-plus rather than fifty.")
	}), nE = M({
		state: I([
			"fresh",
			"building",
			"stale"
		]).describe("Whether the index matches what is on disk, is still filling, or has fallen behind."),
		ageMs: k().optional().describe("How long since it last matched the disk, in milliseconds."),
		progress: k().optional().describe("How far through building it is, from zero to one."),
		behind: k().optional().describe("How many files it has not caught up with. Worth showing, because the word stale on its own reads as a warning about the answer, which it almost never is.")
	}), rE = M({
		mode: D().describe("Which kind of search actually ran, which matters when you let it choose."),
		total: k().describe("Matching lines across the whole workspace, not just this page."),
		files: k().describe("Files the query matched in total."),
		shown: k().describe("How many of those lines are on this page."),
		groups: j(tE).describe("The results, grouped by file, best first."),
		freshness: nE.describe("Whether the index behind the answer is up to date."),
		truncated: A().describe("This page is not all of it. Use the cursor."),
		partial: A().optional().describe("At least one file had more matches than are kept per file, so the total is a floor. Different from the page being truncated: a complete page can still count partially."),
		cursor: D().optional().describe("Pass this back as `after` to get the next page."),
		hint: D().optional().describe("A suggestion for getting a better answer out of this query."),
		note: D().optional().describe("What the engine did that you did not ask for: a pattern rerun as plain text because it was not valid, escapes rewritten, a language filter that matched nothing."),
		related: j(D()).optional().describe("Places next door to the best results: where each is defined, and whatever calls it most."),
		candidates: j(D()).optional().describe("Ranked places that scored but did not make the page, best first. The answer often sits at rank five to thirteen, so this saves paging through to find out."),
		features: j(D()).optional().describe("Which stages of the search were switched off for this run. Absent means all of them ran.")
	});
})), aE, oE, sE, cE, lE = v((() => {
	V(), iE(), aE = M({
		repo: D().min(1).describe("Which repository, using the same ids the git routes take."),
		since: D().max(16).optional().describe("How far back to count changes, written as a span such as 2d, 12h, 1w or 3m. Leave it out for all of history."),
		limit: B().int().positive().max(200).optional().describe("How many files and modules to rank. A leaderboard rather than an inventory: past a screenful the ranking stops being the point.")
	}), oE = M({
		path: D(),
		commits: k(),
		adds: k(),
		dels: k(),
		complexity: k(),
		score: k(),
		latestMs: k()
	}), sE = M({
		path: D(),
		exports: k()
	}), cE = M({
		repo: D().describe("Which repository this describes."),
		totals: M({
			files: k().describe("Files counted."),
			symbols: k().describe("Named things they export."),
			complexity: k().describe("Branch points across all of them added up."),
			hotspots: k().describe("How many files qualify as hotspots at all. The list below is capped; this is not.")
		}).describe("Counts anybody could recount in the files themselves. Deliberately no single maintainability grade: those cannot be checked and are not comparable between projects."),
		hotspots: j(oE).describe("Files that change often and are complicated at the same time, worst first."),
		modules: j(sE).describe("The parts of the codebase the rest of it leans on most."),
		freshness: nE.describe("Whether the index these numbers were read from is up to date.")
	});
})), uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, DE, OE, kE, AE, jE, ME, NE = v((() => {
	V(), lE(), uE = [
		"outdated",
		"audit",
		"knip",
		"jscpd",
		"ui",
		"bundle",
		"mutation"
	], dE = I(uE), fE = M({
		name: D().describe("The dependency."),
		current: D().describe("What you are on."),
		latest: D().describe("What is published."),
		kind: I([
			"major",
			"minor",
			"patch"
		]).describe("How far apart those are. This is not one number because forty patch releases behind is a morning's work and one major version is a project."),
		section: D().describe("Which part of the manifest declares it. A major version behind on a build-time tool is a different risk from one that ships.")
	}), pE = M({
		name: D().describe("The dependency it concerns."),
		severity: I([
			"critical",
			"high",
			"moderate",
			"low",
			"info"
		]).describe("How bad it is said to be."),
		title: D().describe("What it is, in one line. No scoring vector and no reference list: those are for reading on the advisory's own page, and carrying them would put a kilobyte of prose per finding on every poll."),
		patched: D().optional().describe("Which versions fix it. Absent means no fix has been published, which is exactly when nothing should offer to upgrade and something should say so instead."),
		dev: A().describe("Whether it only reaches build-time tooling, which is a different problem from one that reaches what you ship.")
	}), mE = M({
		files: k().int().nonnegative().describe("Files nothing reaches."),
		exports: k().int().nonnegative().describe("Exported things nothing uses."),
		types: k().int().nonnegative().describe("Types nothing uses."),
		dependencies: k().int().nonnegative().describe("Declared dependencies nothing imports."),
		devDependencies: k().int().nonnegative().describe("The same, for build-time ones."),
		sample: j(D()).describe("A handful of the files, so a reader need not take the count on faith. Counts and a sample rather than the whole list, because an agent re-measures against the live tree anyway.")
	}), hE = M({
		percentage: k().describe("How much of the scanned code is duplicated. A share rather than a count, because a count grows with the repository and would mean something different every quarter."),
		clones: k().int().nonnegative().describe("How many duplicated stretches were found."),
		top: j(M({
			lines: k().int().nonnegative().describe("How long the duplicated stretch is."),
			first: D().describe("One of the two places."),
			second: D().describe("The other.")
		})).describe("The largest of them.")
	}), gE = M({
		components: j(D()).describe("The interface's own source files, with tests, stories and generated output left out."),
		bypasses: j(M({
			path: D().describe("The file."),
			count: k().int().positive().describe("How many times, in that file.")
		})).describe("Where the design system was routed around and a value hard-coded instead. Counted per file, because a reader deciding what to open is served by a file and a number, not by eleven snippets."),
		idioms: j(M({
			id: D().describe("Which outdated idiom. Looked up rather than listed here, so a sandbox one version behind can still report one this list has never heard of."),
			files: j(D()).describe("The files still on it.")
		})).describe("Files still written the way their framework has since replaced.")
	}), _E = M({
		dir: D().describe("Which folder was measured. Read from build output already on disk rather than by building, so this is sometimes a commit behind and never leaves anything in your working tree."),
		totalBytes: k().int().nonnegative().describe("The whole thing, raw."),
		totalGzip: k().int().nonnegative().describe("The whole thing, compressed. The ratio between the two is the difference between big and big-and-incompressible, which are different problems."),
		assets: j(M({
			path: D().describe("The file."),
			bytes: k().int().nonnegative().describe("Its raw size."),
			gzip: k().int().nonnegative().describe("Its compressed size.")
		})).describe("What is in it, piece by piece.")
	}), vE = M({
		score: k().describe("The share of injected faults the suite caught. Not a coverage figure: coverage says a line ran, this says an assertion depended on it."),
		killed: k().int().nonnegative().describe("Faults the suite caught."),
		survived: k().int().nonnegative().describe("Faults it did not: code that can be broken with every test still passing."),
		inconclusive: k().int().nonnegative().describe("Faults it never got a verdict on, because they would not compile or were configured out. Left out of the score entirely, since neither answer is known."),
		survivors: j(M({
			file: D().describe("Where it is."),
			line: k().int().nonnegative().describe("Which line."),
			mutator: D().describe("What was changed, in the mutation tool's own vocabulary."),
			replacement: D().describe("What it became, so a reader can judge whether it matters without opening the file.")
		})).describe("The surviving faults themselves. A percentage is a mood; a named line with the change that went unnoticed is a morning's work.")
	}), yE = I([
		"ok",
		"unavailable",
		"failed"
	]), bE = P("id", [
		M({
			id: L("outdated"),
			packages: j(fE)
		}),
		M({
			id: L("audit"),
			advisories: j(pE)
		}),
		M({
			id: L("knip"),
			deadCode: mE
		}),
		M({
			id: L("jscpd"),
			duplication: hE
		}),
		M({
			id: L("ui"),
			scan: gE
		}),
		M({
			id: L("bundle"),
			bundle: _E
		}),
		M({
			id: L("mutation"),
			mutation: vE
		})
	]), xE = M({
		id: dE.describe("Which measurement this is."),
		state: yE.describe("Whether the tool ran and reported, is not part of this repository at all, or broke. The middle one is not evidence of health: the check simply cannot be made here."),
		ranAt: k().describe("When it last finished, in milliseconds, which is what its age is measured from."),
		tookMs: k().int().nonnegative().describe("How long it took. Worth knowing before asking for it again: some of these run for minutes."),
		facts: bE.optional().describe("What it found, including finding nothing, which is a real answer and the one that keeps a chore quiet."),
		reason: D().optional().describe("Why it broke, quoted from the tool rather than summarised, or, when it never ran, what is missing. Never a sentence built from the check's own name, which would have an unmeasured check claiming there is nothing to measure.")
	}), SE = M({
		dir: D().describe("Where the package lives."),
		name: D().describe("What it declares itself as."),
		engines: F(D(), D()).optional().describe("Which runtime versions it says it needs, verbatim."),
		dependencies: j(D()).describe("What it depends on."),
		devDependencies: j(D()).describe("What it needs only to build."),
		documented: A().describe("Whether it has a README, which in this workspace is what a package's own documentation is.")
	}), CE = M({
		docs: j(D()).describe("The repository's own architecture documents, when it has any. Their existence is the question: a repository with none has never been through the documentation flow at all."),
		dockerfiles: j(D()).describe("Container definitions in it."),
		ci: j(D()).describe("Pipeline definitions in it."),
		lockfile: A().describe("Whether dependencies are pinned to exact versions, which is what makes a security audit mean anything."),
		packageManifest: A().describe("Whether it is a JavaScript project at all. A Rust or Go repository has no majors to be behind on, and offering it those checks would be this surface guessing at what it is looking at."),
		deps: j(D()).describe("Every dependency name declared anywhere in the repository. Names rather than a verdict about which framework this is, because that judgement belongs to whatever reads this, not to a sandbox baked months ago.")
	}), wE = M({
		packages: j(SE).describe("Each package in the repository, as its own manifest declares it."),
		shape: CE.describe("What the repository is made of, which decides whether a given chore is even a sensible question to ask of it."),
		hotspots: j(oE).describe("Files that change often and are complicated at once, capped tight: a chore only asks whether something has entered the top of the ranking."),
		keyModules: j(sE).describe("The parts the rest of the code leans on most, capped the same way."),
		totals: M({
			files: k().describe("Files counted."),
			symbols: k().describe("Named things they export."),
			complexity: k().describe("Branch points added up."),
			hotspots: k().describe("How many files qualify as hotspots at all.")
		}).describe("The repository in numbers."),
		indexed: A().describe("Whether the index these rankings came from is finished. Nothing should act on a half-built one.")
	}), TE = I([
		"acted",
		"reported",
		"clean"
	]), EE = M({
		repo: D().describe("Which repository."),
		chore: D().describe("Which chore."),
		ranAt: k().describe("When it ran, in milliseconds."),
		runId: D().describe("The conversation that ran it, so its whole record can be opened."),
		outcome: TE.describe("What it concluded: it did something, it wrote something down, or it looked and found the finding to be false. That last one matters most, or the same turn starts again for ever."),
		digest: D().describe("A fingerprint of the evidence standing at the time. A chore whose evidence has since changed is due again on its own merits; one whose evidence has not stays quiet."),
		snoozedUntil: k().optional().describe("Not until then, in milliseconds. The chore stays visible and stays out of the badge. Different from switching it off, which is a setting.")
	}), DE = M({
		repo: D().describe("Which repository."),
		id: dE.describe("Which measurement."),
		askedAt: k().describe("When it was asked for, in milliseconds, so one still waiting can say how long it has waited."),
		startedAt: k().optional().describe("When it actually began. Absent while it is queued behind another, which is a real and common state: there is one lane for the whole sandbox.")
	}), OE = M({
		repos: j(M({
			repo: D().describe("Which repository."),
			probes: j(xE).describe("The expensive measurements, served from a cache with an age on each rather than run on demand."),
			signals: wE.describe("The cheap facts, worked out fresh every time.")
		})).describe("Every repository's standing evidence. One answer for all of them, because a badge polls this on a timer and one request per repository is the kind of poll that shows up in a battery graph."),
		ledger: j(EE).describe("What has already been done about all of it."),
		running: j(DE).describe("What is being measured right now and what is waiting behind it. Part of this read rather than a route of its own, because a screen that had to ask twice would show the two halves disagreeing."),
		node: D().describe("The runtime version this sandbox is actually running, read off the process rather than off a manifest, because what is installed is the fact that matters and a declared range is a wish.")
	}), kE = M({
		repo: D().min(1).describe("Which repository."),
		id: dE.describe("Which measurement to retake, ahead of its usual schedule.")
	}), AE = EE, jE = M({
		id: D().describe("Which check."),
		label: D().describe("What it is called."),
		status: I([
			"pass",
			"warn",
			"fail"
		]).describe("How it went. A warning is a real third answer rather than a soft failure."),
		detail: D().describe("What it found.")
	}), ME = M({ checks: j(jE).describe("Everything that can be checked from the extension's own files, for an author about to publish.") });
})), PE, FE = v((() => {
	W(), NE(), Y(), PE = {
		list: U.route({
			method: "GET",
			path: "/chores",
			summary: "What maintenance the repos are asking for",
			description: "Every repo's standing evidence in one read: what the last measurement found and how old it is, the cheap signals that are always current, and what has already been decided about each."
		}).output(OE),
		probe: U.route({
			method: "POST",
			path: "/chores/probe",
			summary: "Measure one repo again now",
			description: "Re-runs a single check without waiting for it to go stale. Answers immediately: the work happens in the background and the result turns up in the next read, because some of these sweeps outlive any sane request."
		}).input(kE).output(q),
		record: U.route({
			method: "POST",
			path: "/chores/ledger",
			summary: "Record a verdict, or snooze one",
			description: "Writes what somebody concluded about one repo's chore, replacing the previous verdict. A chore has one current answer, not a growing pile of times it was fine."
		}).input(AE).output(q)
	};
})), IE, LE = v((() => {
	W(), Uy(), Y(), IE = {
		runs: U.route({
			method: "GET",
			path: "/ci/runs",
			summary: "Pipeline runs across the repos",
			description: "What the forges are reporting for every workspace repo that has a remote, served from a cache and filled in on demand. Repos whose notifications are not wired up say so."
		}).output(Ly),
		rerun: U.route({
			method: "POST",
			path: "/ci/runs/rerun",
			summary: "Run a pipeline again",
			description: "Asks the forge to re-run one pipeline. The daemon only passes the request along."
		}).input(Ry).output(q),
		cancel: U.route({
			method: "POST",
			path: "/ci/runs/cancel",
			summary: "Cancel a pipeline run",
			description: "Asks the forge to stop a run in progress."
		}).input(Ry).output(q),
		jobs: U.route({
			method: "POST",
			path: "/ci/runs/jobs",
			summary: "The steps inside one pipeline run",
			description: "Each job in a run with its outcome, which is where you look to find out what actually broke."
		}).input(Ry).output(jy),
		fix: U.route({
			method: "POST",
			path: "/ci/fix",
			summary: "Put an agent on a broken pipeline",
			description: "Opens a fresh isolated conversation already holding the failure: which job, which repo, what it said. The answer names the conversation so you can open it."
		}).input(zy).output(By)
	};
})), RE, zE, BE, VE, HE, UE = v((() => {
	V(), Ib(), RE = D().min(1).describe("The file, relative to the repo or scope the diff belongs to."), zE = D().min(1).describe("Which repository: \"root\" for the workspace itself, otherwise a repo id."), BE = P("source", [
		M({
			source: L("working"),
			repo: zE,
			side: Wy.describe("Which git side the row came from; a half-staged file is two different diffs."),
			path: RE
		}).describe("Uncommitted work in a workspace repo, what the Changes panel lists."),
		M({
			source: L("agent"),
			agent: D().min(1).describe("The conversation whose work is under review."),
			repo: zE,
			path: RE
		}).describe("One agent's work against the base its review is listed against."),
		M({
			source: L("commit"),
			repo: zE,
			sha: D().regex(/^[0-9a-f]{4,64}$/).describe("The commit, compared against its first parent."),
			path: RE
		}).describe("A commit against its first parent."),
		M({
			source: L("checkpoint"),
			snapshot: D().min(1).describe("Which saved point."),
			scope: D().min(1).describe("Which part of the workspace the path belongs to."),
			path: RE
		}).describe("A saved point in the timeline, against the visible one before it.")
	]), VE = P("present", [M({
		present: L(!0),
		content: D().describe("The side as markdown."),
		deriver: D().describe("Which reader made this text, with its version."),
		notes: j(D()).describe("Every cap and degradation the conversion hit, one line each."),
		truncated: A().describe("The rendering was longer than this response carries; only its start is here.")
	}), M({
		present: L(!1),
		reason: D().describe("Why this side has no text: a format nothing reads, a broken file, a sandbox with no reader.")
	})]), HE = M({
		before: VE.optional().describe("The file as it was, rendered to text. Absent when it did not exist yet."),
		after: VE.optional().describe("The file as it is now, rendered to text. Absent when it was deleted.")
	});
})), WE, GE = v((() => {
	W(), UE(), WE = { derived: U.route({
		method: "GET",
		path: "/diff/derived",
		summary: "Both sides of a document's diff, as text",
		description: "A document, spreadsheet, presentation or notebook that changed, both versions rendered to markdown the way an agent reads them, so the change can be shown as tracked changes instead of two downloads. The side on disk reuses the shadow the sandbox already keeps; a past version is rendered from its bytes and kept by content hash, so the same version is never rendered twice. A side nothing can read says why."
	}).input(BE).output(HE) };
})), KE, qE, JE, YE, XE, ZE, QE, $E, eD, tD = v((() => {
	W(), V(), kT(), Em(), KE = I([
		"unknown",
		"healthy",
		"degraded",
		"unavailable"
	]), qE = M({
		available: A(),
		allowance: k().int().nonnegative(),
		used: k().int().nonnegative(),
		remaining: k().int().nonnegative(),
		health: KE,
		resetsAt: D().optional(),
		retryAt: D().optional(),
		servedModel: D().optional()
	}), JE = I([
		"granted",
		"unsupported",
		"absent"
	]), YE = I(["gpu", "host"]), XE = M({
		tokens: k().int().positive(),
		totalBytes: k().int().nonnegative(),
		fits: A(),
		fullSpeed: A().optional()
	}), ZE = M({
		model: D(),
		label: D(),
		tier: I(["instant", "work"]),
		weightsBytes: k().int().nonnegative(),
		held: A(),
		windows: j(XE)
	}), QE = M({
		model: D(),
		state: I([
			"idle",
			"downloading",
			"held",
			"failed"
		]),
		receivedBytes: k().int().nonnegative(),
		totalBytes: k().int().nonnegative(),
		detail: D().optional()
	}), $E = M({
		memoryBytes: k().int().nonnegative(),
		memoryCapped: A(),
		gpu: JE,
		gpuMemoryBytes: k().int().nonnegative(),
		gpuFreeBytes: k().int().nonnegative().optional(),
		budgetBytes: k().int().nonnegative(),
		fullSpeedBytes: k().int().nonnegative().optional(),
		fullSpeedDevice: YE.optional(),
		serverReady: A(),
		options: j(ZE),
		instant: M({
			model: D(),
			context: D()
		}).optional(),
		best: M({
			model: D(),
			context: D()
		}).optional(),
		prefetch: QE
	}), eD = {
		models: U.route({
			method: "GET",
			path: "/endpoints/{id}/models",
			summary: "Models a connected server offers",
			description: "Asks one configured model server what it serves. There is no built-in list and no fallback: what a server offers is knowable only by asking it, so an empty answer is the honest report that we could not."
		}).input(bT).output(Tm),
		trial: U.route({
			method: "GET",
			path: "/endpoints/trial/status",
			summary: "What is left of the free trial",
			description: "The allowance, what has been used, when it resets, and which model actually answered the last message. Not being available is the ordinary answer rather than a failure: most sandboxes run against a platform that offers no trial at all."
		}).output(qE),
		localModelFit: U.route({
			method: "GET",
			path: "/endpoints/local-model/fit",
			summary: "Which local models this machine can actually run",
			description: "The memory this sandbox may use, whether a GPU reached it, and every curated model priced two ways: whether it fits on one device's free memory and so runs at full speed, and whether it can load at all. The two the connect view offers, one that downloads in a minute and the best this machine runs at full speed, come from the first; a start is refused only on the second."
		}).output($E),
		localModelPrefetch: U.route({
			method: "POST",
			path: "/endpoints/local-model/prefetch",
			summary: "Fetch the small model's weights ahead of being asked",
			description: "Downloads the curated instant model into the workspace cache so that adding it later costs nothing. Stopping leaves the part file, so a later start resumes from where this one stopped rather than beginning again."
		}).input(M({ action: I(["start", "stop"]) })).output(QE)
	};
})), nD, rD, iD = v((() => {
	W(), _d(), WC(), aw(), Y(), nD = U.meta({
		agent: !0,
		control: "never"
	}), rD = {
		list: nD.route({
			method: "GET",
			path: "/exit",
			summary: "Ways to come out somewhere else",
			description: "Every configured exit with its live state, the country it was asked to appear in, and the country it actually appears in. Those last two disagreeing is the whole reason this reports both."
		}).output(nw),
		countries: nD.route({
			method: "GET",
			path: "/exit/{id}/countries",
			summary: "Countries one exit can reach",
			description: "Where this exit can put you, ranked by how much capacity is really there. Asked of the provider when it answers and taken from a built-in list when it does not, and the answer says which of those you got."
		}).input(rw).output(ew),
		start: nD.route({
			method: "POST",
			path: "/exit/{id}/start",
			summary: "Bring an exit up",
			description: "Starts the exit in the country it was configured for. Streamed, because a first start fetches a catalogue, raises a tunnel and then checks the address, which takes tens of seconds on the free providers and can fail at each step with something worth reading. Starting one that is already up simply says so."
		}).input(rw).output(H(EC)),
		use: nD.route({
			method: "POST",
			path: "/exit/{id}/use",
			summary: "Move to another country",
			description: "Switches the exit's country, starting it first if it was down. It ends by checking where the world actually sees you and fails if that does not match what you asked for. A switch that quietly left your traffic where it was is the exact failure this whole feature exists to rule out."
		}).input(iw).output(H(EC)),
		rotate: nD.route({
			method: "POST",
			path: "/exit/{id}/rotate",
			summary: "Take a different address, same country",
			description: "Swaps to another address in the country you are already in. Fails if the address does not actually change, which on a small pool it sometimes cannot."
		}).input(rw).output(H(EC)),
		check: nD.route({
			method: "POST",
			path: "/exit/{id}/check",
			summary: "Where the world sees you right now",
			description: "Looks up the address and country as seen through this exit. Cheap, and the honest answer to whether you are really where you meant to be, which is what every other call here is judged against."
		}).input(rw).output(QC),
		stop: nD.route({
			method: "POST",
			path: "/exit/{id}/stop",
			summary: "Take an exit down",
			description: "Shuts the exit off. One that was already down is fine: the promise is that it is not up afterwards, not that it was up before."
		}).input(rw).output(q)
	};
})), aD = v((() => {})), oD = v((() => {})), sD, cD, lD = v((() => {
	V(), sD = 4096, cD = {
		art: D().max(sD).optional().describe("This extension's own mark, as a complete SVG document inline: the tier an author controls fully. Give it a viewBox and let it fill its own square edge to edge; it is drawn as the tile, not as a glyph on a plate. Kept as readable SVG text (not base64) so a registry reviewer can see what they are publishing, drawn inert so it cannot script the page, and capped at 4 KB. Anything that does not parse as SVG falls back to `logo`, then `icon`, then initials."),
		logo: D().optional().describe("A simple-icons slug, fetched from a CDN: right for standing in for somebody else's product. Add a \"/<hex>\" suffix to force a colour for a mark that vanishes against the surface it lands on. Unreachable in an offline sandbox, so it falls back to `icon`, then to initials."),
		icon: D().optional().describe("A name from the host's own icon set, drawn when no simple-icons slug fits. It ships in the image, follows the theme and costs no request: what actually carries a first-party extension. An unknown name falls back to initials rather than to a hole.")
	};
})), uD, dD, fD, pD, mD, hD, gD = v((() => {
	uD = /* @__PURE__ */ new Set([
		"GET",
		"HEAD",
		"POST",
		"PUT",
		"PATCH",
		"DELETE",
		"OPTIONS"
	]), dD = /^(?:\.|%2e){1,2}$/iu, fD = (e) => {
		if (e.includes("*") && e !== "*") return `"${e}" is not a segment glob: a \`*\` stands alone between slashes and matches one whole segment, so \`**\` and a \`*\` inside a segment are not supported`;
		if (dD.test(e)) return `"${e}" is not a route segment: the URL resolves it away before any route sees it`;
	}, pD = (e, t) => t === "" ? "expected \"<METHOD> <path-glob>\", e.g. \"GET /panels\"" : uD.has(e.toUpperCase()) ? t.startsWith("/") ? /[?#\\]/u.test(t) ? "the path may not hold \"?\", \"#\" or \"\\\": routes are matched on the path alone" : t.slice(1).split("/").map(fD).find((e) => e !== void 0) : "the path must start with \"/\"" : `"${e}" is not one of ${[...uD].join(", ")}`, mD = (e) => {
		let [, t = "", n = ""] = /^(\S+)\s+(\S+)$/u.exec(e.trim()) ?? [];
		return {
			method: t,
			glob: n
		};
	}, hD = (e) => {
		let { method: t, glob: n } = mD(e), r = pD(t, n);
		return r === void 0 ? void 0 : `invalid permission "${e}": ${r}`;
	};
})), _D, vD, yD = v((() => {
	V(), _D = M({ path: D().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root.") }).meta({ power: {
		key: "agent",
		sentence: "contributes skills, agents and hooks to the agent's turns"
	} }), vD = {
		name: "agent",
		description: "Declare that this checkout is also a Claude Code plugin, so Claude Code turns pick up its skills, agents, hooks and commands. Only Claude Code reads it: give the agent tools with `contributes.tools`, which every runtime gets, and put a skill every runtime should read in a capability card's `skill`. MCP servers in the plugin's `.mcp.json` are deprecated, reach Claude Code alone, and are warned about at load.",
		schema: _D
	};
})), bD, xD, SD = v((() => {
	V(), bD = M({
		id: D().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/).describe("Prefills the automation name, and is what \"does one of these exist already\" is asked by, so spell it as an id, not as prose."),
		title: D().min(1),
		logo: D().min(1).optional().describe("A simple-icons slug for the card."),
		icon: D().min(1).optional().describe("A name from the host's icon set, drawn when no simple-icons slug fits."),
		requires: j(D().min(1)).optional().describe("Capability providers that make this template work: any one connected is enough (fixing CI rides github or gitlab). Omitted ⇒ nothing to connect, so it is always offered."),
		trigger: M({
			kind: I([
				"schedule",
				"event",
				"listener",
				"workspace"
			]),
			cron: D().min(1).optional(),
			provider: D().min(1).optional(),
			eventType: D().min(1).optional(),
			event: D().min(1).optional()
		}).describe("What wakes it. Checked against the real trigger schema when the daemon builds the catalogue, so a template can never offer one that would be refused."),
		guard: D().min(1).optional().describe("A condition that must hold before the turn runs: what makes a template safe to leave switched on."),
		holdForSeconds: k().int().positive().optional().describe("Wait this long and coalesce repeats, rather than firing on every event."),
		prompt: D().min(1).describe("The turn this starts. You own the trigger's payload vocabulary, so you own the prompt that reads it."),
		note: D().min(1).optional(),
		setup: D().min(1).optional().describe("What the user must do themselves before this can work."),
		description: D().min(1).optional(),
		offer: I(["create", "configure"]).optional().describe("Absent ⇒ it waits in the gallery, where you go once you know what you want. `create` puts a card on the page that makes it, switched off, in one click. `configure` puts one there that opens the dialog prefilled, for a template that cannot work unconfigured. Both are for what a user would never think to go looking for: mark everything as offered and you have rebuilt the gallery with extra steps."),
		chore: A().optional().describe("Whether what this makes watches THIS codebase rather than the outside world. Declared rather than read off the trigger: a nightly dependency sweep and a nightly Stripe poll are both schedules.")
	}), xD = {
		name: "automationTemplates",
		description: "Starting points this pack offers in the automation composer, a trigger, a prompt written for that trigger's payload, and whatever guard makes it safe to leave on. Declared by whoever knows the service rather than by the composer, so they appear when your pack is installed and disappear with it. Pure prefill: creating one makes an ordinary automation.",
		schema: j(bD)
	};
})), CD, wD = v((() => {
	V(), CD = {
		name: "bin",
		description: "A checkout-relative directory of executables the daemon puts on the agent's PATH every turn, how you ship the agent a command-line tool. The files are the approved code themselves: they ride the pinned checkout, and the daemon only adds the directory to PATH.",
		schema: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "bin must stay inside the checkout" }).meta({ power: {
			key: "bin",
			sentence: "puts its shipped tools on the agent's PATH"
		} })
	};
})), TD, ED, DD, OD, kD, AD, jD, MD, ND = v((() => {
	TD = class extends Error {
		source;
		offset;
		constructor(e, t, n) {
			super(`${e} (in \`${t}\` at ${n})`), this.source = t, this.offset = n, this.name = "WhenSyntaxError";
		}
	}, ED = [
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
	], DD = /[A-Za-z_]/, OD = /[A-Za-z0-9_.-]/, kD = (e) => {
		let t = [], n = 0;
		for (; n < e.length;) {
			let r = e[n] ?? "";
			if (r.trim() === "") {
				n += 1;
				continue;
			}
			if (r === "'" || r === "\"") {
				let i = e.indexOf(r, n + 1);
				if (i === -1) throw new TD("unterminated string", e, n);
				t.push({
					kind: "literal",
					value: e.slice(n + 1, i),
					at: n
				}), n = i + 1;
				continue;
			}
			let i = ED.find((t) => e.startsWith(t, n));
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
			if (DD.test(r)) {
				let r = n + 1;
				for (; r < e.length && OD.test(e[r] ?? "");) r += 1;
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
			throw new TD(`unexpected character ${JSON.stringify(r)}`, e, n);
		}
		return t;
	}, AD = class {
		tokens;
		source;
		index = 0;
		constructor(e, t) {
			this.tokens = e, this.source = t;
		}
		parse() {
			let e = this.or(), t = this.tokens[this.index];
			if (t !== void 0) throw new TD("unexpected trailing input", this.source, t.at);
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
			if (e?.kind !== "key") throw new TD("expected a context key", this.source, e?.at ?? this.source.length);
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
			if (e?.kind !== "literal") throw new TD("expected a literal value", this.source, e?.at ?? this.source.length);
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
			if (!this.eat(e)) throw new TD(`expected \`${e}\``, this.source, this.tokens[this.index]?.at ?? this.source.length);
		}
	}, jD = (e) => new AD(kD(e), e).parse(), MD = (e) => {
		try {
			return jD(e), !0;
		} catch {
			return !1;
		}
	};
})), PD, FD, ID, LD = v((() => {
	V(), PD = /^[a-z0-9][a-z0-9-]*(?:\/[a-z0-9][a-z0-9-]*)*$/, FD = M({
		perCard: D().regex(/^[a-z0-9][a-z0-9-]*$/).optional().describe("The id of one of this extension's `cli` capability cards. Every turn granted a card of that kind gets one server named by the card's id, handed that card's settings (secrets included) with each call. Absent ⇒ one server for the extension, named by its `name`, in every turn while the extension is enabled."),
		process: D().regex(/^[a-z0-9][a-z0-9-]*$/).optional().describe("A process from `contributes.processes`, declared with `port: \"auto\"`, that answers MCP over Streamable HTTP at `path` on its port. Absent ⇒ your `server` bundle serves the tools."),
		path: D().regex(PD).optional().describe("Where the MCP endpoint answers, without a leading or trailing slash: on the process's port, or in your backend's own namespace when your `server` bundle speaks MCP itself. Absent with no `process` ⇒ the host serves what `api.tools.serve` returns, which is what you want: the host owns the transport, the deadlines and the card lookup. With `perCard`, a request arrives at `<path>/<card id>`.")
	}).meta({
		effect: "mcp",
		mintsServer: !0,
		power: {
			key: "tools${perCard?-${perCard}:}",
			sentence: "gives the agent MCP tools${perCard?, one server for each \"${perCard}\" card:}"
		}
	}), ID = {
		name: "tools",
		description: "Tools for the agent, as an MCP server the daemon mounts into every turn and every runtime (Claude Code, Codex, Cursor, ACP agents). Serve them from your `server` bundle with `api.tools.serve((card) => [...])`, or from a declared process's port. Replaces an agent plugin's `.mcp.json`, which only Claude Code read.",
		schema: FD
	};
})), RD, zD, BD, VD, HD = v((() => {
	RD = (e) => {
		let { power: t, effect: n, mintsServer: r } = e.meta() ?? {};
		return {
			...t === void 0 ? {} : { power: t },
			...n === void 0 ? {} : { effect: n },
			...r === void 0 ? {} : { mintsServer: r }
		};
	}, zD = /* @__PURE__ */ new Set([
		"optional",
		"nullable",
		"default",
		"prefault",
		"readonly",
		"nonoptional",
		"catch"
	]), BD = (e) => {
		let t = e, n = [];
		for (;;) {
			n.unshift(RD(t));
			let e = t._zod.def;
			if (zD.has(e.type) && e.innerType !== void 0) t = e.innerType;
			else if (e.type === "pipe" && e.in !== void 0) t = e.in;
			else return {
				schema: t,
				meaning: Object.assign({}, ...n)
			};
		}
	}, VD = (e) => {
		let t = /* @__PURE__ */ new Map(), n = BD(e).schema.shape ?? {};
		for (let [e, r] of Object.entries(n)) {
			let { meaning: n } = BD(r);
			Object.keys(n).length > 0 && t.set(e, n);
		}
		return t;
	};
})), UD, WD, GD, KD, qD, JD, YD, XD = v((() => {
	ND(), V(), LD(), lD(), HD(), UD = M({
		key: D().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
		label: D().min(1),
		placeholder: D().optional(),
		secret: A().optional().describe("Mask it, and never echo it back."),
		optional: A().optional(),
		multiline: A().optional(),
		advanced: A().optional().describe("Fold this field behind the form's Advanced disclosure: for answers whose default is right for nearly everyone. The disclosure opens by itself while any advanced field holds a non-default value, so an edit never hides live settings."),
		boolean: A().optional().describe("Render it as a switch, carrying \"on\"/\"off\". For an opt-in EXTRA rather than a decision: a two-option picker says the same thing but presents a choice the user must make to proceed, sized like the required fields around it. A switch always holds a value, so a field like this never blocks a submit."),
		hint: D().optional().describe("A line under this control, for what the label alone cannot say: a host requirement, when a value takes effect. The card's own `hint` speaks for the whole card; this one is bound to the field it qualifies."),
		rebuild: A().optional().describe("This value only takes effect after the sandbox is rebuilt, because it rides the image overlay. Shown as a chip beside the label: two switches side by side, identical in every visible way, can otherwise cost five seconds or five minutes with no way to tell which."),
		default: D().optional(),
		options: j(M({
			value: D(),
			label: D()
		})).optional().describe("Turns the field into a select."),
		when: D().refine(MD, { message: "not a valid `when` condition" }).optional().describe("Only show this field while a condition over the answers already given holds: `auth == 'key'`, `provider in ['ipsec', 'fortinet']`, `!advanced`. Supports `&&`, `||`, `!`, comparisons and `in`."),
		value: D().optional().describe("A fixed value baked into the config rather than asked for: how a card pins its discriminator (platform=\"reddit\", provider=\"stripe\"). Renders as nothing."),
		totp: A().optional().describe("This field holds a TOTP seed, the base32 key or otpauth:// URI a service shows when enrolling an authenticator app. Declare it with `secret: true`. Unlike an ordinary secret it never enters the agent's environment: the daemon mints the six-digit codes on demand and only those cross.")
	}), WD = M({
		url: D().min(1).describe("The URL to call, as a template over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Same spelling as `env`."),
		method: I([
			"GET",
			"POST",
			"HEAD"
		]).optional().describe("Defaults to GET."),
		headers: F(D(), D()).optional().describe("The request headers, templated the same way: `{\"Authorization\": \"Bearer ${token}\"}`."),
		identity: D().optional().describe("A dotted path into the JSON answer naming who the caller is (\"login\", \"user.name\"), so success can say which account answered."),
		insecure: A().optional().describe("Accept a self-signed certificate, for a service whose local install ships one (Obsidian's Local REST API).")
	}), GD = M({
		name: D().min(1),
		...cD,
		description: D().min(1).describe("ONE LINE: aim for 60 characters or fewer. The grid clamps it at two lines in a narrow pane, so a paragraph here is a paragraph the reader gets truncated. Everything longer belongs in `hint`."),
		category: D().min(1),
		hint: D().optional().describe("The paragraph, shown under the add form and searched from the catalog, so the words that identify this card to someone hunting for it (\"webauthn\", \"socket mode\") belong here even when the tile cannot show them."),
		guide: M({
			url: D().optional(),
			urlFromField: D().optional(),
			path: D().optional(),
			linkLabel: D().optional(),
			scopes: D().optional(),
			steps: j(D()).optional()
		}).optional().describe("The walkthrough the install dialog renders for getting the credential this card asks for.")
	}), KD = {
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		catalog: GD,
		fields: j(UD)
	}, qD = P("kind", [
		M({
			...KD,
			kind: L("cli"),
			fields: j(UD).min(1),
			env: F(D().regex(/^[A-Z][A-Z0-9_]*$/), D()).describe("The environment the agent's shell gets, as value templates over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Each name is suffixed per instance."),
			skill: D().min(1).describe("Checkout-relative SKILL.md teaching the agent this tool. `${id}` in it is replaced with the instance name at apply time."),
			fragment: D().min(1).optional().describe("A Dockerfile fragment holding the client binary this tool needs (psql, mysql, whisper).").meta({ effect: "image" }),
			pack: D().min(1).optional().describe("A sandbox feature pack name (whisper, llamacpp, browser, …) supplying this tool. Preferred over `fragment`: an image that already bakes the pack needs no rebuild, and there is no copy to drift.").meta({ effect: "image" }),
			probe: WD.optional().describe("One authenticated request that tests this card's settings before they are saved, so a wrong token or an unreachable host is answered on the form rather than by a card that says 'not connected' afterwards."),
			hosts: j(D().min(1)).optional().describe("The hosts this card's credential is meant for, as templates over the fields like `env` (`api.github.com`, `*.githubusercontent.com`, `${url}`); a value that comes out as a URL counts as its host. The sandbox limits the credential's `{{secret:…}}` reference to them by default, so a use aimed anywhere else asks a person first. The owner can change or lift the list on the Secrets view."),
			mcp: D().regex(PD).optional().describe("Deprecated: declare `contributes.tools` with `perCard` naming this card instead, and serve the tools with `api.tools.serve`. A path in this extension's backend (`server`) answering MCP over Streamable HTTP; every turn granted a card of this kind gets it as a server named by the card's id, each request arriving at `<path>/<card id>`.").meta({
				effect: "mcp",
				mintsServer: !0,
				power: {
					key: "capability-tools:${id}",
					sentence: "serves MCP tools to the agent for each \"${catalog.name}\" card"
				}
			})
		}),
		M({
			...KD,
			kind: L("browser"),
			loginUrl: O().optional().describe("What the sign-in window opens; the profile it persists IS the credential. Optional so one card can be the generic one that asks for the URL on its form instead, but a card must either pin this or declare a field that supplies it, or the window opens on nothing."),
			homeUrl: O().optional().describe("Where that same profile opens once it HAS a session: the owner's own hands on the connected browser. Separate from loginUrl because for some platforms the login lives on another site entirely (YouTube signs in at accounts.google.com)."),
			skill: D().min(1).describe("Checkout-relative SKILL.md teaching the agent this site's actions: rendered once per site, all its connected accounts on one roster (`${accounts}`), the core tool note at `${tools}`.")
		}),
		M({
			...KD,
			kind: L("device"),
			skill: D().min(1).describe("Checkout-relative SKILL.md teaching the agent that machine's shell.")
		}).meta({ mintsServer: !0 }),
		M({
			...KD,
			kind: L("webext"),
			install: O().optional().describe("Where this browser's extension is installed from: its store listing, or a page offering the build."),
			skill: D().min(1).describe("Checkout-relative SKILL.md teaching the agent to drive this browser.")
		}).meta({ mintsServer: !0 }),
		M({
			...KD,
			kind: L("agent")
		})
	]).superRefine((e, t) => {
		if (e.kind === "cli") for (let n of e.fields.filter((e) => e.totp === !0)) Object.values(e.env).some((e) => e.includes(`\${${n.key}}`) || e.includes(`\${${n.key}:uri}`)) && t.addIssue({
			code: "custom",
			message: `env must not reference the totp field "${n.key}", the daemon mints codes from it instead`
		});
	}).meta({ power: {
		key: "capability:${id}",
		sentence: "a ${kind} capability card \"${catalog.name}\""
	} }), JD = {
		name: "capabilities",
		description: "Capability cards this pack adds to the \"+\" grid: a connected CLI tool, a site the agent acts on as the owner through the shared browser, an operating system pack, a browser family the owner connects their own copy of, or a preset over a core kind. The card and its form are data here; the machinery that acts on them is core, which is why a card may only name one of these five kinds.",
		schema: j(qD)
	}, YD = () => {
		let e = /* @__PURE__ */ new Set();
		for (let t of qD.options) {
			let n = t.shape.kind?._zod.def?.values?.[0];
			n !== void 0 && (BD(t).meaning.mintsServer === !0 || [...VD(t).values()].some((e) => e.mintsServer === !0)) && e.add(n);
		}
		return e;
	};
})), ZD, QD, $D = v((() => {
	ND(), V(), ZD = M({
		command: D().regex(/^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/),
		title: D().min(1).describe("What the command palette shows. The manifest's value wins over the one passed at registration."),
		category: D().min(1).optional().describe("What the command acts on (\"Deployments\", \"Knowledge\"), drawn ahead of the title as \"Category: Title\" and searched with it. Use the extension's own name so its commands group together; omit it and the command stands alone."),
		icon: D().optional().describe("A name from the host's icon set, drawn beside the title."),
		keybinding: D().regex(/^\S+$/).optional().describe("A global keyboard shortcut, e.g. \"Mod+Shift+K\" — `Mod` is ⌘ on Apple and Ctrl elsewhere. Declared here because a global shortcut is consequential: the owner approves it at install, and the host binds only what was approved.").meta({ power: {
			key: "keybinding:${command}",
			sentence: "the global shortcut ${keybinding} (\"${title}\")"
		} }),
		when: D().refine(MD, { message: "not a valid `when` condition" }).optional().describe("When the shortcut applies, as a condition over the shell's context keys, `tabSurface == 'chat'`, `!editableTarget`. Without one the chord is claimed everywhere, including inside a terminal where a bare key belongs to the program running in it. The command palette ignores this: a command is always runnable by name.")
	}).meta({ power: {
		key: "command:${command}",
		sentence: "a palette command \"${title}\""
	} }), QD = {
		name: "commands",
		description: "Commands this extension may register handlers for, surfaced in the command palette. Title, icon and shortcut all come from here rather than from the registration call, because this is what the owner approved at install.",
		schema: j(ZD)
	};
})), eO, tO, nO = v((() => {
	V(), eO = M({
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: D().min(1).describe("The family's name, shown in the install dialog beside your other contributions. Per-row wording stays with the provider, which is the only thing that knows what it found.")
	}).meta({ power: {
		key: "document:${id}",
		sentence: "marks workspace directories (\"${label}\")"
	} }), tO = {
		name: "documents",
		description: "Per-directory documents this extension can offer. Your provider marks the rows in the Workspace tree it has something to say about, and the host opens your component as a tab.",
		schema: j(eO)
	};
})), rO, iO, aO = v((() => {
	V(), rO = M({ fragment: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "fragment must stay inside the checkout" }).describe("Checkout-relative path to a file holding ONLY RUN and ENV instructions. FROM and privileged directives are rejected: those stay daemon-owned.") }).meta({
		effect: "image",
		power: {
			key: "environment",
			sentence: "bakes an environment fragment into the sandbox image"
		}
	}), iO = {
		name: "environment",
		description: "A Dockerfile fragment baked into the sandbox image so your tools are actually installed at runtime: a whisper binary, a psql client. The owner approves the composed overlay and rebuilds out of band, so this does not take effect immediately.",
		schema: rO
	};
})), oO, sO, cO = v((() => {
	V(), oO = M({
		path: D().min(1).refine((e) => !e.startsWith("/") && !e.split("/").includes(".."), { message: "path must be workspace-root-relative and stay inside the workspace" }).describe("Workspace-root-relative, forward-slash, matched by prefix, so one entry covers an exact file (`.intentic/config/automations.json`), a directory (`.intentic/config/approvals/`, with the trailing slash so it cannot match a sibling file) or a name family (`.intentic/environment.`). Not a glob."),
		invalidates: j(D().min(1)).min(1).describe("The query keys this path makes stale, the first element of your own api.sandbox.key(...) keys. Keep both this and the path as narrow as the view actually needs: a broad prefix costs every connected browser a refetch on every matching write.")
	}).meta({ power: {
		key: "files:${path}",
		sentence: "is told when ${path} changes"
	} }), sO = {
		name: "files",
		description: "Which workspace files back your views, so the daemon's file watcher can tell the browser they went stale instead of you polling for it. The agent edits the workspace out of band from every HTTP route, and this push is the only thing that can notice.",
		schema: j(oO)
	};
})), lO, uO, dO, fO = v((() => {
	V(), lO = M({
		label: D().min(1),
		placeholder: D().min(1),
		hint: D().min(1).optional().describe("The sentence under the input, for a filter whose empty case is easy to get wrong.")
	}), uO = M({
		provider: D().regex(/^[a-z0-9][a-z0-9-]*$/).describe("The slug this source's automation triggers fire on."),
		events: j(M({
			type: D().regex(/^[a-z0-9][a-z0-9_]*$/),
			label: D().min(1)
		})).min(1).refine((e) => new Set(e.map((e) => e.type)).size === e.length, { message: "listener event types must be unique" }).describe("The event types this source can fire, with the wording the automation editor offers them under. The daemon accepts no others."),
		automation: M({
			label: D().min(1),
			mentionLabel: D().min(1).optional().describe("Only for a source whose message events distinguish being addressed. Absent ⇒ the editor offers no mention-only filter, rather than inventing semantics you did not promise."),
			channel: lO.describe("The primary narrowing filter, a channel, a room, a repo."),
			branchField: lO.optional().describe("A second narrowing axis, for a source whose events carry one: a pipeline's git ref, so a trigger can say \"the branch that ships\" rather than \"every agent's every failure\"."),
			sender: lO.optional().describe("How this source names a sender, and where a person finds that id. Declaring it promises that `author.id` is an identity the service vouches for, not a name the sender typed; absent ⇒ the editor offers no sender rules on this source."),
			senderGroup: lO.optional().describe("How this source names a sender's group, for a source whose messages carry `author.groups` (a Discord role). Absent ⇒ rules match ids only."),
			starterPrompt: D().min(1).describe("The first prompt a new automation on this source is prefilled with. You own the payload vocabulary, so you own the prompt that explains it.")
		}).describe("How the generic automation editor presents this source: its name, its filters, and the prompt it starts people on.")
	}).meta({ power: {
		key: "listener:${provider}",
		sentence: "a realtime listener provider \"${provider}\""
	} }), dO = {
		name: "listener",
		description: "A realtime event source this extension supplies, so automations can trigger on it. One declaration feeds both halves: the daemon accepts these event types and serves this provider's control surface, and the automation editor derives its source picker, filters and starter prompt from it, so a newly installed listener is configurable without a matching app release.",
		schema: uO
	};
})), pO, mO, hO = v((() => {
	V(), pO = M({
		name: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		command: D().min(1),
		cwd: D().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root."),
		port: L("auto").optional().describe("Assign a free port and inject it as PORT."),
		preview: A().optional().describe("Expose the port on a tunnelled preview hostname."),
		autoStart: A().optional().describe("Launch it on install and on daemon boot, rather than waiting to be started.")
	}).meta({
		effect: "process",
		power: {
			key: "process:${name}",
			sentence: "a background process \"${name}\"${autoStart? (starts on boot):}"
		}
	}), mO = {
		name: "processes",
		description: "Long-lived background processes the daemon runs for this extension: a gateway holding a connection the daemon must not, a dev server. Managed the same way panel dev servers are, and startable and stoppable from the Extensions tab.",
		schema: j(pO)
	};
})), gO, _O, vO = v((() => {
	V(), gO = M({
		key: D().regex(/^[a-z0-9][a-zA-Z0-9-]*$/),
		type: I([
			"boolean",
			"string",
			"number",
			"enum"
		]).describe("Which control the Settings page draws. `enum` reads its choices from `enum`."),
		title: D().min(1),
		description: D().optional().describe("The line under the control."),
		default: N([
			D(),
			k(),
			A()
		]).optional(),
		enum: j(D()).optional().describe("The choices, for type \"enum\". Meaningless otherwise."),
		secret: A().optional().describe("Mask the value in the UI and strip it from reads: a set secret round-trips as 'still set', never as its value."),
		env: D().regex(/^[A-Z][A-Z0-9_]*$/).optional().describe("Inject the stored value into the agent's shell environment under this name, every turn. How a credential you hold reaches the agent's command-line tools.").meta({ power: {
			key: "setting-env:${key}",
			sentence: "puts the \"${key}\" setting into the agent's environment as ${env}"
		} })
	}), _O = {
		name: "settings",
		description: "Typed settings the host renders into the Settings page for you and persists daemon-side. You never draw the form or store the value; you read it back with api.settings.get.",
		schema: j(gO)
	};
})), yO, bO, xO = v((() => {
	V(), yO = M({
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: D().min(1).describe("What one of these is called (\"CI run\"), shown in the install dialog and on a tab whose own title could not be read. Each tab's title is the extension's to say for the thing it shows."),
		links: A().optional().describe("Allow this side view to take links the chat renders: a link it recognises (its registration's `claim`) opens beside the chat instead of in a new browser tab. Declared because it changes what the reader's click does; leave it out and the host never asks.").meta({ power: {
			key: "side-view-links:${id}",
			sentence: "opens links it recognises as \"${label}\" beside the chat"
		} })
	}).meta({ power: {
		key: "side-view:${id}",
		sentence: "shows \"${label}\" in the side panel"
	} }), bO = {
		name: "sideViews",
		description: "Things this extension can show in the editor's side panel, one input at a time, beside whatever the reader is doing. Each entry reserves an id; the extension supplies the component with api.sideViews.register and opens one with api.sideViews.open, and the host refuses any id this list does not cover.",
		schema: j(yO)
	};
})), SO, CO, wO = v((() => {
	V(), SO = M({
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		extensions: j(D().regex(/^[a-z0-9]+$/)).min(1).describe("Bare file extensions, no dot: e.g. [\"docx\", \"xlsx\"]."),
		fetch: I([
			"text",
			"blob",
			"url",
			"path"
		]).describe("How much of the file the host hands you. `text` for a format that is text (svg, a subtitle track). `blob` for one that must be parsed end to end before any of it shows (a .docx, a spreadsheet), bounded by the daemon's raw-read cap. `url` for anything range-read rather than parsed (audio, video): your component gets a streaming URL to point an element at, never the bytes. `path` for a viewer whose own backend reads and writes the file: you get the workspace path and the scope it is viewed in, plus `readOnly` where the window may not write the file and, in a desktop app's local window, a `text` slot holding the document's text for while your own view can't show it. Emit `dirty` (a boolean) whenever you start or stop holding edits the file doesn't have, so a window closing over them can ask first."),
		edit: A().optional().describe("Whether this viewer writes the file back. An editing viewer is chosen over a render-only viewer claiming the same extension, whatever order the two activated in."),
		compare: A().optional().describe("Whether this viewer also draws two versions of a file as one, with what changed marked in place: its registration then carries a `compare` component the host renders with `before` and `after` blobs. Only for `fetch: \"blob\"`.")
	}).meta({ power: {
		key: "viewer:${id}",
		sentence: "${edit?opens and edits:opens}${compare? and compares:} .${extensions|, .} files (${fetch})"
	} }), CO = {
		name: "viewers",
		description: "File formats this extension can render. The host resolves an opened file to your viewer by its extension, fetches the content, and renders your component with it: you keep none of the fetch lifecycle and none of the daemon credentials.",
		schema: j(SO)
	};
})), TO, EO, DO = v((() => {
	V(), TO = M({
		id: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: D().min(1).describe("The name shown on the tile or tab. The manifest's value wins over the one passed at registration."),
		surface: I([
			"rail",
			"directory",
			"sandbox"
		]).describe("Where it appears. `rail` is a tile in the global left rail; `directory` is a panel opened from a repo in the Workspace tree; `sandbox` is a tab on the Sandbox hub, for a view whose subject is the box rather than the work."),
		badge: A().optional().describe("Allow this view to say something on its tile: a count, a glyph, or that work is running there. Declared because a badge interrupts from every other screen in the app; leave it out and any badge the extension registers is dropped.").meta({ power: {
			key: "view-badge:${id}",
			sentence: "may badge the \"${label}\" tile from any screen"
		} })
	}).meta({ power: {
		key: "view:${id}",
		sentence: "a ${surface} view \"${label}\""
	} }), EO = {
		name: "views",
		description: "Sidebar elements this extension may register at runtime. Each entry reserves an id and a surface; the extension supplies the component with api.views.register, and the host refuses any registration this list does not cover.",
		schema: j(TO)
	};
})), OO, kO, AO = v((() => {
	V(), yD(), SD(), wD(), XD(), $D(), nO(), aO(), cO(), fO(), hO(), vO(), xO(), LD(), wO(), DO(), yD(), SD(), wD(), XD(), $D(), nO(), aO(), cO(), fO(), hO(), vO(), xO(), LD(), wO(), DO(), OO = [
		EO,
		sO,
		CO,
		tO,
		bO,
		QD,
		_O,
		mO,
		vD,
		iO,
		JD,
		dO,
		xD,
		CD,
		ID
	], kO = M(Object.fromEntries(OO.map((e) => [e.name, e.schema.describe(e.description).optional()])));
})), jO, MO, NO, PO, FO = v((() => {
	V(), lD(), gD(), AO(), jO = () => D().superRefine((e, t) => {
		let n = hD(e);
		n !== void 0 && t.addIssue({
			code: "custom",
			message: n
		});
	}), MO = M({
		$schema: D().optional().describe("The authoring schema, for editor completion and validation. Nothing at runtime reads it."),
		publisher: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		name: D().regex(/^[a-z0-9][a-z0-9-]*$/),
		version: D().min(1).describe("Your own semver, display and identity only. The installed code's identity is the pinned commit sha."),
		category: D().min(1).optional().describe("Which section of the Extensions tab this sits under: a grouping by what it is FOR, which cannot be derived from what it contributes. A section this app has never heard of lands in 'Other' rather than failing to install."),
		...cD,
		engines: M({ intentic: D().min(1) }).describe("A semver range over the host's extension API version, checked before your code is activated."),
		entry: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "entry must stay inside the checkout" }).meta({ power: {
			key: "entry",
			sentence: "runs a UI bundle in your browser"
		} }).optional().describe("Repo-relative path of your prebuilt single-file ESM bundle, built with `vue` and `@intentic/extension-api` as externals. Absent ⇒ an extension with no UI."),
		server: D().min(1).refine((e) => !e.split("/").includes(".."), { message: "server must stay inside the checkout" }).meta({ power: {
			key: "server",
			sentence: "runs a backend bundle inside the daemon's extension host"
		} }).optional().describe("Repo-relative path of your prebuilt single-file node ESM server bundle, exporting `activateServer`. Served under your own route namespace, which the daemon proxies. Nothing is provided at runtime but node builtins, so bundle everything else in. Absent ⇒ no backend."),
		permissions: M({
			sandbox: j(jO().meta({ power: {
				key: "sandbox:${value}",
				sentence: "its UI calls the sandbox route ${value}"
			} })).optional().describe("Daemon routes your UI half may call. Your own backend namespace needs no entry: its backend is your own code."),
			daemon: j(jO().meta({ power: {
				key: "daemon:${value}",
				sentence: "its backend calls the daemon route ${value}"
			} })).optional().describe("Daemon routes your SERVER half may call. Separate from `sandbox` because the two halves run as different principals: the UI as the owner's session, the backend as a minted per-extension token, so a grant to one must never quietly widen the other.")
		}).optional().describe("How far this extension may reach into the daemon, as \"<METHOD> <path-glob>\" entries where `*` matches one path segment: e.g. \"GET /panels\", \"POST /panels/*/start\". The install dialog shows these, the host refuses anything undeclared, and the usage ledger records which were actually earned."),
		contributes: kO.optional()
	}), NO = (e, t) => {
		let n = e.contributes, r = n?.tools, i = n?.capabilities ?? [];
		for (let n of i) n.kind === "cli" && n.mcp !== void 0 && e.server === void 0 && t.addIssue({
			code: "custom",
			path: ["contributes", "capabilities"],
			message: `card "${n.id}" declares \`mcp\`, which only a \`server\` bundle can answer`
		});
		r !== void 0 && (r.process === void 0 ? e.server === void 0 && t.addIssue({
			code: "custom",
			path: ["contributes", "tools"],
			message: "tools need a `server` bundle to serve them, or a `process` that does"
		}) : (n?.processes?.find((e) => e.name === r.process)?.port !== "auto" && t.addIssue({
			code: "custom",
			path: [
				"contributes",
				"tools",
				"process"
			],
			message: "tools.process must name a process in contributes.processes declared with port: \"auto\""
		}), r.path === void 0 && t.addIssue({
			code: "custom",
			path: [
				"contributes",
				"tools",
				"path"
			],
			message: "tools served by a process need the path its MCP endpoint answers at"
		})), r.perCard !== void 0 && !i.some((e) => e.kind === "cli" && e.id === r.perCard) && t.addIssue({
			code: "custom",
			path: [
				"contributes",
				"tools",
				"perCard"
			],
			message: "tools.perCard must name one of this extension's cli cards"
		}));
	}, PO = MO.superRefine(NO);
})), IO = v((() => {
	FO();
})), LO = v((() => {
	FO();
})), RO = v((() => {})), zO = v((() => {
	aD(), oD(), IO(), FO(), HD(), gD(), AO(), LO(), RO();
})), BO, VO, HO, UO, WO, GO, KO, qO, JO, YO, XO, ZO, QO, $O, ek, tk, nk, rk, ik, ak, ok, sk, ck, lk, uk, dk, fk, pk = v((() => {
	V(), zO(), BO = D().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/), VO = M({
		updates: I([
			"notify",
			"agent",
			"auto"
		]),
		advisories: I(["auto-disable", "notify"])
	}), HO = M({
		ref: D().describe("The commit being offered."),
		version: D().optional().describe("What it calls itself."),
		url: D().describe("Where it comes from."),
		path: D().optional().describe("Where inside that repository it lives."),
		trust: I(["verified", "listed"]).describe("Whether anybody vouched for it, or it is merely listed."),
		securityFix: A().optional().describe("This release fixes a security problem in earlier ones, so here the old version is the dangerous one."),
		registry: D().describe("Which registry said so."),
		at: D().describe("When it was published."),
		needsReview: D().optional().describe("Why this one was not taken automatically and is asking for a person instead: it wants more than it used to, or nobody has vouched for it."),
		review: M({
			conversationId: D().describe("Where to read what it found."),
			at: D().describe("When it looked.")
		}).optional().describe("An agent has already read the difference between what is installed and this, so the card can link to what it found rather than offer to start looking.")
	}), UO = M({
		reason: D().describe("Why the registry pulled the listing, in its own words. Delisting protects people browsing; this record is for the person already running it."),
		registry: D().describe("Which registry said so."),
		at: D().describe("When."),
		autoDisabled: A().describe("Whether the sandbox has already switched it off.")
	}), WO = M({
		state: I([
			"watching",
			"healthy",
			"unhealthy"
		]).describe("How it has behaved since the last update. Checks catch broken, not wrong, so for a while after a swap it is simply watched."),
		detail: D().optional().describe("What is going wrong, when something is."),
		fromRef: D().optional().describe("Which version it was updated from, which is what going back would return to."),
		at: D().describe("When the watching started."),
		autoReverted: A().optional().describe("The update was already rolled back without anybody asking. The record stays rather than pretending the attempt never happened.")
	}), GO = M({
		added: j(D()).describe("What the new version asks for that the running one does not. The whole point of the comparison."),
		removed: j(D()).describe("What it no longer asks for."),
		unchanged: j(D()).describe("What stays the same.")
	}), KO = M({
		id: BO.describe("Which extension."),
		ref: D().regex(/^[0-9a-f]{40}$/).optional().describe("Which commit, in full. Leave it out for whatever the last check found, which is what most callers mean.")
	}), qO = M({
		ref: D().describe("The commit this would install."),
		version: D().describe("What that version calls itself."),
		installedVersion: D().describe("What is running now."),
		engines: D().describe("Which sandbox versions the new one says it needs."),
		compatible: A().describe("Whether this sandbox is one of them."),
		powers: GO.describe("Exactly what the new code asks for that the running one does not. This is what approving an update is approving.")
	}), JO = M({
		ok: L(!0).describe("It went through."),
		ref: D().describe("Which commit is now running."),
		rebuildNeeded: A().optional().describe("The new version changes what the sandbox image contains, so a one-time rebuild is still pending and the update is not wholly landed yet.")
	}), YO = M({
		id: BO.describe("Which extension."),
		updates: I([
			"notify",
			"agent",
			"auto"
		]).optional().describe("What to do about a newer version: tell you, have an agent read the difference first, or just take it."),
		advisories: I(["auto-disable", "notify"]).optional().describe("What to do about a security warning: switch it off at once, or tell you.")
	}), XO = M({
		ok: L(!0).describe("The check ran."),
		checkedAt: D().describe("When, so a screen can date the answer.")
	}), ZO = M({
		id: BO.describe("The extension's id."),
		manifest: PO.describe("What it declares about itself: what it contributes, what it needs, and what it may reach."),
		commit: D().describe("Exactly which commit is installed."),
		source: I([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where the code comes from: baked into the sandbox image and not removable, installed from a repository at a pinned commit, or written in this workspace and edited in place."),
		enabled: A().describe("The owner's switch. A switched-off extension is still listed, which is what makes it switchable back on, but nothing it contributes is wired up."),
		essential: A().optional().describe("Its switch is fixed on, because it is the only way to see or stop an engine the sandbox runs regardless. Hiding that page would not stop the spending, only your ability to notice it. Declared by the core about its own surfaces, never by an extension about itself, which would be a pack making itself un-removable."),
		usage: F(D(), M({
			calls: k().int().nonnegative().describe("How many times."),
			last: D().describe("When, most recently.")
		})).optional().describe("How much of the reach it asked for it has actually used, keyed by what it declared. Absent means never observed doing anything, which is a different claim from uses none of them, and the two have to stay tellable apart: reading either as these permissions are unnecessary turns evidence into a guess with a number on it."),
		backend: M({
			state: I([
				"running",
				"error",
				"absent",
				"incompatible",
				"starting",
				"stopped"
			]).describe("How its server half is doing. Absent means the code is not in this image at all; incompatible means it needs a different sandbox version."),
			detail: D().optional().describe("What went wrong, so a backend that failed to start is a sentence rather than an address that answers nothing.")
		}).optional().describe("Present only for an extension that ships a server half."),
		problems: j(D()).optional().describe("Declarations in its manifest the sandbox refused at load, each a sentence saying what and why, such as a listener for a provider another extension already owns. The rest of it still loads. Absent when nothing was refused."),
		update: HO.optional().describe("A newer version waiting. All five of these exist only for one installed from a repository: a built-in updates with the image and one written here is edited live."),
		advisory: UO.optional().describe("A security warning about the installed version."),
		health: WO.optional().describe("How it has behaved since the last update, which is what decides whether that update sticks."),
		previous: M({
			ref: D().describe("The commit that was running before."),
			version: D().optional().describe("What it called itself.")
		}).optional().describe("The version kept one step back, which is what going back means."),
		updatePolicy: VO.optional().describe("The owner's standing answer for this one: tell me, have an agent look, or just do it.")
	}), QO = M({
		dir: D().describe("Which folder."),
		error: D().describe("Why it could not be read.")
	}), $O = M({
		id: BO.describe("The extension's id."),
		dir: D().describe("Which folder under .intentic/config/workspace-extensions/."),
		manifest: PO.describe("What it declares about itself."),
		powers: GO.describe("What saying yes allows, as plain sentences. Against what was approved before when something was: `added` is what it asks for now that it did not then. Never approved before, everything it declares is `added`."),
		approvedBefore: A().describe("An earlier shape of it was approved, and the powers it declares have changed since, which is what put it back here."),
		digest: D().regex(/^[0-9a-f]{64}$/).describe("The fingerprint of the powers shown, sent back with the approval so a change made while you were reading is caught rather than approved.")
	}), ek = M({
		id: BO.describe("Which extension."),
		digest: D().regex(/^[0-9a-f]{64}$/).describe("The fingerprint of the powers you read, from the pending list. A mismatch means they changed since, and nothing is approved.")
	}), tk = M({
		extensions: j(ZO).describe("What is installed."),
		invalid: j(QO).describe("Extensions written here that could not be read at all. Listed rather than dropped, because there is no install moment at which to reject a broken one, so this is its only way of saying anything."),
		pending: j($O).describe("Extensions written in this workspace that wait for the owner's approval before anything of theirs runs: never approved, or approved when they declared less than they do now."),
		updatesCheckedAt: D().optional().describe("When updates were last looked for. Absent until the first check has run. Sent so a screen can say checked an hour ago rather than presenting staleness as certainty.")
	}), nk = M({
		settings: F(D(), N([
			D(),
			k(),
			A()
		])).describe("The values, minus anything marked secret."),
		secretsSet: j(D()).describe("Which of its secret settings actually hold a value. Names only: the values themselves never come back.")
	}), rk = M({
		id: D().describe("Which extension."),
		settings: F(D(), N([
			D(),
			k(),
			A()
		])).describe("The values to write. A key the extension never declared is refused rather than quietly stored.")
	}), ik = M({
		id: D().describe("Which extension."),
		enabled: A().describe("On or off.")
	}), ak = M({
		publisher: D().regex(/^[a-z0-9][a-z0-9-]*$/).describe("Who it is by, which together with the name makes its id."),
		name: D().regex(/^[a-z0-9][a-z0-9-]*$/).describe("What it is called.")
	}), ok = M({
		id: D().describe("The id it was given."),
		dir: D().describe("Where its files are, so you can open them.")
	}), sk = M({
		id: D().describe("The name the owner gave it, which is also the agent's handle for it."),
		kind: D().describe("Which core kind it is underneath: cli, browser, host or webext."),
		entry: D().describe("The catalog entry it was added from, named as the grid names it."),
		secrets: j(D()).describe("Credential fields stored for it, by name. The values are deleted with the entry and cannot be recovered from here."),
		effect: D().describe("What tearing it down actually takes away, in one sentence.")
	}), ck = M({
		id: BO.describe("The extension's id, as the list addresses it."),
		name: D().describe("Its publisher.name identity, which is the key its settings and switch are stored under."),
		version: D().describe("The version being removed."),
		source: I([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where its code comes from, which decides what removal means."),
		blocked: D().optional().describe("Why this one cannot be removed, when it cannot. Present means every other field is what would go if it could."),
		files: j(M({
			path: D().describe("Workspace-relative."),
			detail: D().describe("What is in there.")
		})).describe("Directories deleted outright. For an extension written here this is the owner's own source, which nothing else keeps a copy of."),
		connections: j(sk).describe("Connections configured from its cards, which are removed with it."),
		settings: j(M({
			key: D().describe("Which setting."),
			secret: A().describe("Whether its value is a stored credential.")
		})).describe("Values the owner entered for this extension that are forgotten. Only keys actually holding a value are listed."),
		processes: j(D()).describe("Background processes it declared, stopped before its files go."),
		automations: j(D()).describe("Automations of the owner's own that wake on a listener this extension provides. They are NOT removed, and are listed because they stop firing, which is the sort of thing a removal is otherwise discovered by."),
		rebuildNeeded: A().describe("It bakes a layer into the sandbox image, so what it added to the image is only gone after the next environment rebuild."),
		keeps: j(D()).describe("What removal deliberately leaves alone, so the list of what goes can be read as complete.")
	}), lk = M({
		ok: L(!0).describe("It is gone."),
		connections: j(D()).describe("Which configured connections went with it, by name."),
		rebuildNeeded: A().optional().describe("Its image layer is still in the running sandbox until the next environment rebuild; nothing else is pending.")
	}), uk = M({ reports: F(D(), F(D(), k().int().positive())).describe("Each extension that called something, and the counts against the declared powers it exercised.") }), dk = M({
		id: D().describe("Which extension."),
		name: D().describe("Which of its declared processes.")
	}), fk = M({
		name: D().describe("Which process."),
		running: A().describe("Whether it is up. False with a port means it crashed and the supervisor is waiting to retry it."),
		port: k().optional().describe("The port it was given."),
		restarts: k().optional().describe("How many times it died and was brought back since it was started. A growing number is a service in trouble."),
		lastExitCode: k().optional().describe("How it last exited, when it has crashed at least once."),
		previewUrl: D().optional().describe("Where to open it, when it has an address.")
	});
})), mk, hk = v((() => {
	W(), kT(), pk(), NE(), Y(), mk = {
		list: U.route({
			method: "GET",
			path: "/extensions",
			summary: "Installed extensions",
			description: "Every extension installed here, resolved to the manifest the owner approved, which is what the app boots its extension host from. The code itself is served separately, because raw script bytes are not a JSON answer."
		}).output(tk),
		create: U.route({
			method: "POST",
			path: "/extensions/workspace",
			summary: "Write a new extension in place",
			description: "Scaffolds a working extension into this workspace and installs it. The only call here that creates one, and it exists because that folder is otherwise reachable only through an agent's file tools, which is a fine way to change an extension and a poor way to meet the idea of one."
		}).input(ak).output(ok),
		removalPlan: U.route({
			method: "GET",
			path: "/extensions/{id}/removal",
			summary: "What removing an extension would take away",
			description: "Everything one removal destroys, before it happens: the files deleted, the connections configured from its cards, the settings and credentials forgotten, the background processes stopped, and the owner's own automations that quietly stop firing. Also answerable for an extension that cannot be removed, in which case it says why."
		}).input(bT).output(ck),
		remove: U.route({
			method: "POST",
			path: "/extensions/{id}/remove",
			summary: "Remove an extension",
			description: "Uninstalls it and everything that only existed because it was here: the connections added from its cards, with their stored credentials, its settings, its switch and its update record. What the owner made with it — automations, files in the workspace — is left alone. Owner only, for the same reason installing is. Built-in extensions cannot be removed; switch them off instead."
		}).input(bT).output(lk),
		settings: U.route({
			method: "GET",
			path: "/extensions/{id}/settings",
			summary: "An extension's settings",
			description: "The current values for the settings this extension declared it has."
		}).input(bT).output(nk),
		setSettings: U.route({
			method: "POST",
			path: "/extensions/{id}/settings",
			summary: "Change an extension's settings",
			description: "Writes new values. A key the extension never declared is refused rather than quietly stored, the same honesty rule that governs everything else an extension claims."
		}).input(rk).output(q),
		approve: U.route({
			method: "POST",
			path: "/extensions/{id}/approve",
			summary: "Let a workspace extension run",
			description: "Approves an extension written in this workspace with the powers it declares now: its background processes start, its backend loads, and what it contributes is wired from the next turn. Editing its code keeps the approval; declaring a power it did not have puts it back in the pending list. Owner and maintainers only."
		}).meta({
			panel: !1,
			control: "never"
		}).input(ek).output(q),
		setEnabled: U.route({
			method: "POST",
			path: "/extensions/{id}/enabled",
			summary: "Turn an extension on or off",
			description: "The owner's switch. Turning one off stops its background processes at once. What it contributes to an agent's tools is rebuilt at the start of the next turn, and anything it adds to the sandbox image only at the next rebuild."
		}).input(ik).output(q),
		recordUsage: U.route({
			method: "POST",
			path: "/extensions/usage",
			summary: "Record what extensions just used",
			description: "One batch written by the app rather than measured by the daemon, because the permission gate runs in the browser: from the sandbox's side extension traffic is indistinguishable from anyone else's. This is how the record of which powers each extension actually exercises gets kept without one reporting request per extension."
		}).input(uk).output(q),
		readiness: U.route({
			method: "GET",
			path: "/extensions/{id}/readiness",
			summary: "Whether an extension is fit to share",
			description: "The checks that can be answered from an extension's own files, for an author about to publish. Read on demand rather than carried on the list, because it reads the code off disk each time."
		}).input(bT).output(ME),
		checkUpdates: U.route({
			method: "POST",
			path: "/extensions/updates/check",
			summary: "Look for extension updates now",
			description: "Compares every installed extension against its source and reports what is newer, what carries an advisory and what looks unhealthy. This also happens on a schedule; call it to check on demand."
		}).output(XO),
		updatePreview: U.route({
			method: "POST",
			path: "/extensions/{id}/update/preview",
			summary: "What an update would change",
			description: "The read before the click: which versions are involved and exactly which powers the new code asks for that the running one does not. Costs one throwaway copy of the source, the same as browsing a registry entry."
		}).input(KO).output(qO),
		applyUpdate: U.route({
			method: "POST",
			path: "/extensions/{id}/update",
			summary: "Update an extension",
			description: "The whole swap as one transaction: fetch, check, quiet the running one, replace it while keeping the outgoing copy one step back, restart and watch it come up. The existing configuration is kept, so a token for a private source survives what removing and re-adding would lose. Owner only, because it changes what code runs."
		}).input(KO).output(JO),
		revert: U.route({
			method: "POST",
			path: "/extensions/{id}/revert",
			summary: "Go back to the previous version",
			description: "Swaps the copy kept from before the last update back into place. Owner only, for the same reason updating is."
		}).input(bT).output(JO),
		setUpdatePolicy: U.route({
			method: "POST",
			path: "/extensions/{id}/update-policy",
			summary: "How an extension should handle its own updates",
			description: "The owner's standing answer for one extension: tell me, have an agent look at it, or just do it. Security advisories can be opted out of separately."
		}).input(YO).output(q),
		processStatus: U.route({
			method: "GET",
			path: "/extensions/{id}/processes/{name}",
			summary: "Whether an extension's background process is up",
			description: "The state of one process an extension declared, with the port it was given and its preview address if it has one."
		}).input(dk).output(fk),
		processStart: U.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/start",
			summary: "Start an extension's background process",
			description: "Brings one of an extension's declared processes up in an attachable terminal."
		}).input(dk).output(q),
		processStop: U.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/stop",
			summary: "Stop an extension's background process",
			description: "Shuts one of an extension's declared processes down and frees its port."
		}).input(dk).output(q)
	};
})), gk = v((() => {})), _k, vk, yk, bk, xk, Sk, Ck, wk, Tk, Ek, Dk, Ok, kk, Ak = v((() => {
	V(), K(), Vd(), iS(), _k = M({
		files: I([
			"none",
			"read",
			"write"
		]).default("write").describe("What it may do with files: nothing, look and search, or also create and change."),
		shell: A().default(!0).describe("Whether it may run commands, and with them the terminals, the test runs and every tool on the image. The switch the strength of the others depends on."),
		code: A().default(!0).describe("Whether it may write and run a script rather than a command line. Its fence is real where the shell's is not: reads and writes follow the files answer, and it can start no other program unless commands are allowed too. The one stated gap is that the fence cannot cut the network."),
		web: A().default(!0).describe("Whether it may fetch a page or run a search."),
		browser: A().default(!0),
		delegate: A().default(!0),
		sandbox: A().default(!0),
		connectors: j(G).max(100).optional(),
		devices: j(G).max(50).optional(),
		mcp: j(G).max(50).optional(),
		extensions: j(D().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/)).max(100).optional().describe("Which extensions' own agent tools and agent plugin (skills, commands, subagents) it gets, by extension id. Absent means every enabled one; empty means none. The tools an extension serves for a connected card follow the connectors list instead.")
	}), vk = M({
		startIn: D().max(200).optional().describe("Which folder a conversation opens in."),
		folders: j(D().min(1)).max(50).optional().describe("Which folders it may touch at all. Absent means the whole workspace.")
	}), yk = M({ repos: j(D().min(1).max(200)).max(50).describe("Which nested repositories a conversation on this persona carries, by workspace-relative path. The workspace itself is always carried; empty means the workspace alone.") }), bk = I([
		"map",
		"context",
		"skills",
		"search",
		"delegation",
		"checks",
		"dependencies",
		"repoSync",
		"handoff"
	]), xk = M({ omit: j(bk).max(20).describe("Which of the notes the sandbox prepends to each message a conversation on this persona does NOT get. Everything not named here is sent as usual; the notes that keep a turn inside its own branch or explain a missing account cannot be named at all.") }), Sk = M({
		id: G.describe("The persona's id."),
		label: D().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		capabilities: j(G).max(50).describe("Which connected accounts are its hands. Named individually rather than by site, because two accounts on one site is the whole problem this solves. Naming one that is not connected yet is not an error: it is a card describing an account this sandbox has still to sign into."),
		brief: D().max(200).optional().describe("What this persona is for, in one line. A new chat is routed onto a persona by this sentence, and the Personas page shows it under the name."),
		powers: _k.optional().describe("What a conversation wearing it may do. Absent means the full toolbox, so a card written before this existed behaves exactly as it did."),
		workspace: vk.optional().describe("Where it works. Absent means the whole workspace."),
		context: yk.optional().describe("Which part of the workspace a conversation wearing it carries: the repositories its checkout holds. Absent means every repository."),
		briefing: xk.optional().describe("Which of the notes the sandbox prepends to every message this card's conversations do without. Absent means all of them, which is what a card written before this existed keeps."),
		models: j(cf).max(10).optional().describe("Which models a conversation wearing it runs on, tried in order. Absent means whatever the chat or the job would have run on anyway; a model chosen for the turn itself always wins."),
		systemPromptMode: fx.optional()
	}), Ck = M({ id: G.describe("Which persona.") }), wk = M({
		personas: j(Sk).describe("The characters an agent can wear."),
		connected: j(D()).describe("Which accounts are actually connected right now, so a persona naming one that has since been disconnected can be shown as broken rather than as working.")
	}), Tk = M({
		prompt: D().describe("What this persona is told, on top of everything else. Empty means it simply follows the sandbox's own instructions."),
		skills: j(M({
			name: D().describe("The skill's name."),
			description: D().describe("What it is for.")
		})).describe("Skills only this persona's conversations can reach. A different question from what the agent knows generally, with a different answer.")
	}), Ek = Ck.extend({ prompt: D().max(mx).describe("What to tell this persona. Sending an empty one removes it entirely rather than storing a blank, so the persona falls back to the sandbox's own instructions.") }), Dk = Ck.extend(Mx.shape), Ok = Ck.extend({ name: Dx.describe("Which skill.") }), kk = M({
		name: D().describe("The skill's name."),
		description: D().describe("What it is for."),
		body: D().describe("The skill itself, in full.")
	});
})), jk, Mk = v((() => {
	W(), Ak(), Y(), jk = {
		list: U.route({
			method: "GET",
			path: "/personas",
			summary: "The characters an agent can wear",
			description: "Each persona with the connected accounts it speaks for, what a conversation wearing it is allowed to do, and where it works."
		}).meta({ guest: !0 }).output(wk),
		save: U.route({
			method: "POST",
			path: "/personas",
			summary: "Create or edit a persona",
			description: "Writes the whole card; sending an id that exists edits it. Nothing is connected, installed or spent by saving one, because a persona only records a decision about accounts that already exist. It is stored as a file you can equally well edit by hand, which is why this writes the card whole rather than patching a field: a round trip through a screen should leave a change a reviewer recognises."
		}).input(Sk).output(q),
		remove: U.route({
			method: "DELETE",
			path: "/personas/{id}",
			summary: "Delete a persona",
			description: "Takes away the character, never the accounts: every login it named stays connected. Its own prompt and skills go with it, since a folder nothing can reach is worse than deleting what somebody just asked to delete. Anything still pointed at it goes quiet rather than falling back to speaking as everyone."
		}).input(Ck).output(q),
		kit: U.route({
			method: "GET",
			path: "/personas/{id}/kit",
			summary: "What one persona carries",
			description: "The instructions this persona is given and the skills only its conversations can reach. A different question from what the agent knows generally, with a different answer."
		}).input(Ck).output(Tk),
		savePrompt: U.route({
			method: "POST",
			path: "/personas/{id}/prompt",
			summary: "Write a persona's instructions",
			description: "Sets what this persona is told. Saving an empty one removes it entirely rather than storing a blank, so the persona simply falls back to the sandbox's own instructions."
		}).input(Ek).output(q),
		readSkill: U.route({
			method: "GET",
			path: "/personas/{id}/skills/read",
			summary: "Read one of a persona's skills",
			description: "The full text of a single skill belonging to this persona."
		}).input(Ok).output(kk),
		saveSkill: U.route({
			method: "POST",
			path: "/personas/{id}/skills",
			summary: "Write one of a persona's skills",
			description: "Creates or replaces a skill by name. There is nothing to switch on: a persona's skill is available exactly when that persona is worn, which is what belonging to it has to mean."
		}).input(Dk).output(q),
		removeSkill: U.route({
			method: "POST",
			path: "/personas/{id}/skills/remove",
			summary: "Delete one of a persona's skills",
			description: "Removes a single skill from this persona and leaves the rest of its kit alone."
		}).input(Ok).output(q)
	};
})), Nk, Pk, Fk, Ik, Lk, Rk, zk, Bk, Vk, Hk, Uk, Wk, Gk, Kk, qk, Jk, Yk, Xk, Zk, Q, Qk, $k, eA, tA, nA, rA, iA, aA, oA, sA, cA, lA = v((() => {
	V(), Vd(), Y(), Ib(), Nk = D().regex(/^[0-9a-f]{4,64}$/), Pk = M({
		sha: D().describe("The commit, in full."),
		short: D().describe("The abbreviated form, for showing."),
		parents: j(D()).describe("What it came from. None means the first commit, one is ordinary, two or more is a merge, which is what a graph draws its lanes from."),
		subject: D().describe("Its first line."),
		body: D().describe("Everything after that."),
		author: D().describe("Who wrote it."),
		email: D().describe("Their address."),
		at: k().describe("When they wrote it, in milliseconds."),
		refs: j(D()).describe("Branches and tags sitting on it."),
		head: A().describe("Whether this is where the repository currently stands.")
	}), Fk = M({
		repo: D().describe("Which repository."),
		branch: D().optional().describe("Which branch these are from."),
		commits: j(Pk).describe("The commits, newest first."),
		hasMore: A().describe("There are older ones behind this page. It is also what stops the last row being drawn as the beginning of history, which is how a truncated log used to claim it started where the page happened to stop.")
	}), Ik = J.extend({
		limit: B().int().positive().max(2e3).optional().describe("How many commits to return."),
		skip: B().int().nonnegative().max(1e6).optional().describe("How many newer commits to step over, which is how you page further back. Paged rather than read whole, because a large repository's history is tens of thousands of rows.")
	}), Lk = M({ repos: j(D()).describe("Every repository's id. The workspace itself is always present as \"root\".") }), Rk = M({
		repo: D().describe("The workspace repository."),
		host: D().describe("Which forge its remote points at."),
		project: D().describe("Which project there, as owner and name.")
	}), zk = M({ repos: j(Rk).describe("Each repository matched to the project its remote points at.") }), Bk = J.extend({
		path: D().min(1).describe("Which file, relative to the repository."),
		content: D().describe("Its whole new contents."),
		message: D().min(1).describe("The commit message.")
	}), Vk = M({
		ok: A().describe("Whether the whole thing went through."),
		wrote: A().describe("The file was written."),
		committed: A().describe("The commit was recorded."),
		pushed: A().describe("It reached the remote."),
		branch: D().optional().describe("Which branch it happened on."),
		defaultBranch: D().optional().describe("Which branch the repository considers its main one, so a caller can see it was on a side branch."),
		reason: D().optional().describe("Why it stopped where it did. Being on a side branch, having no remote and having no credentials are all reported here rather than raised.")
	}), Hk = J.extend({ sha: Nk.describe("Which commit.") }), Uk = M({ files: j(lb).describe("Which files it touched, with counts but not contents. Fetch any one file's contents separately, so a commit with a thousand files stays one cheap answer.") }), Wk = J.extend({
		sha: Nk.describe("Which commit."),
		path: D().min(1).describe("Which file in it.")
	}), Gk = J.extend({
		sha: Nk.describe("Which commit to start it at."),
		name: zd.describe("The new branch's name.")
	}), Kk = J.extend({
		sha: Nk.describe("Which commit to tag."),
		name: zd.describe("The tag's name.")
	}), qk = J.extend({ ref: zd.describe("Where to switch to: a branch, a tag, or a commit.") }), Jk = J.extend({
		name: zd.describe("Which tag."),
		remote: zd.optional().describe("Also delete it there. Leave it out to remove it locally only.")
	}), Yk = J.extend({
		name: zd.describe("Which tag."),
		remote: zd.describe("Which remote to send it to.")
	}), Xk = J.extend({
		sha: Nk.describe("Which commit to move the branch to."),
		mode: I([
			"soft",
			"mixed",
			"hard"
		]).describe("How much to take with it: move the branch alone, also unstage, or also throw away what is on disk. The last one takes a checkpoint first.")
	}), Zk = J.extend({ sha: Nk.describe("Which commit to act on.") }), Q = M({
		ok: A().describe("Whether it worked."),
		reason: D().optional().describe("Why not, in git's own words. A conflict, a missing remote and missing credentials are all reported here rather than raised, because they are things a screen has to render rather than breakages.")
	}), Qk = M({
		ref: D().describe("How to address it, which applying and dropping take."),
		sha: D().describe("The commit behind it, because a stash entry is a commit."),
		short: D().describe("The abbreviated form, for showing."),
		subject: D().describe("What it was set aside as, with git's own scaffolding stripped off."),
		branch: D().optional().describe("Which branch it was set aside from."),
		at: k().describe("When, in milliseconds."),
		parents: j(D()).describe("What it sits on, so a graph can draw it like any other commit.")
	}), $k = M({
		repo: D().describe("Which repository."),
		stashes: j(Qk).describe("What is set aside, newest first.")
	}), eA = D().regex(/^stash@\{\d{1,4}\}$/), tA = J.extend({
		message: D().max(500).optional().describe("What to call it, so you know what it was later."),
		includeUntracked: A().optional().describe("Also set aside files git is not yet tracking, which are otherwise left where they are.")
	}), nA = J.extend({
		ref: eA.describe("Which entry."),
		pop: A().optional().describe("Remove it from the stash once it has been applied cleanly.")
	}), rA = J.extend({ ref: eA.describe("Which entry.") }), iA = J.extend({ ref: eA.describe("Which entry.") }), aA = I([
		"commit",
		"amend",
		"merge",
		"rebase",
		"cherry-pick",
		"revert",
		"reset",
		"pull",
		"other"
	]), oA = M({
		kind: aA.describe("What the last action was."),
		description: D().describe("What undoing it would do, in words."),
		branch: D().describe("Which branch would move."),
		sha: D().describe("Where it stands now."),
		previousSha: D().describe("Where it would go back to. Send this with the undo as proof you looked, so one prepared against a view that has since moved is refused rather than landing somewhere unexamined."),
		changesWorkingTree: A().describe("Undoing would rewrite files as well as moving the branch, so anything offering it should warn about losing work.")
	}), sA = M({
		repo: D().describe("Which repository."),
		action: oA.optional().describe("What undoing would reverse. Absent means there is nothing to go back from.")
	}), cA = J.extend({
		previousSha: Nk.describe("Where to go back to, from the matching read. It is also proof you looked: one prepared against a stale view is refused."),
		discardChanges: A().optional().describe("Also rewrite the files, rather than only moving the branch.")
	});
})), uA, dA = v((() => {
	W(), Ib(), lA(), Nv(), Y(), uA = {
		changes: U.route({
			method: "GET",
			path: "/git/changes",
			summary: "Uncommitted work across every repo",
			description: "The workspace's whole review set in one answer: every repo that has something uncommitted, and within it every changed file with its status and line counts. This is what the Changes panel draws, and it is the call to make when you want to know whether a workspace is clean without walking the repos yourself."
		}).output(Sb),
		repos: U.route({
			method: "GET",
			path: "/git/repos",
			summary: "Every git repo in the workspace",
			description: "The repos the daemon found under the workspace root, each with the id every other call in this group expects as its `{repo}` segment. The workspace root itself is always present as `root`."
		}).output(Lk),
		remoteRepos: U.route({
			method: "GET",
			path: "/git/remote-repos",
			summary: "Repos matched to their remotes",
			description: "The same repo list, but with the forge host and `owner/name` each one's remote points at. Use it to recognise a workspace repo in a list of names that came from somewhere else, such as a set of pull requests. Costs a remote lookup per repo, which is why it is separate from the plain repo list."
		}).output(zk),
		log: U.route({
			method: "GET",
			path: "/git/{repo}/log",
			summary: "Commit history for one repo",
			description: "A page of commits on the current branch, newest first, each with its author, subject, timestamp and the refs pointing at it. Paginate with the cursor the answer hands back rather than by offset, so a commit landing mid-scroll does not shift the page under you."
		}).input(Ik).output(Fk),
		commitDiff: U.route({
			method: "GET",
			path: "/git/{repo}/commit-diff",
			summary: "What one commit changed",
			description: "The list of files a single commit touched, with per-file status and line counts but not the content. Fetch the content of any one of them with the commit file diff call, so a commit with a thousand files stays one cheap answer."
		}).input(Hk).output(Uk),
		commitFileDiff: U.route({
			method: "GET",
			path: "/git/{repo}/commit-file-diff",
			summary: "One file's before and after at a commit",
			description: "Both sides of a single file as of one commit: the content its parent had and the content that commit left. The daemon returns whole sides rather than a patch, so a caller can render the comparison however it likes."
		}).input(Wk).output(Mv),
		operation: U.route({
			method: "GET",
			path: "/git/{repo}/operation",
			summary: "Whether a merge or rebase is halted mid-flight",
			description: "Names the git operation the worktree is stuck inside, if any: a conflicted merge, an interrupted rebase, a half-applied cherry-pick. Check this first when another call refuses, because a halted worktree is the usual reason and the abort call is the way out."
		}).input(J).output(_b),
		abort: U.route({
			method: "POST",
			path: "/git/{repo}/abort",
			summary: "Abandon a halted merge or rebase",
			description: "Runs git's own abort for whichever operation has the worktree halted, putting the repo back where it stood before the operation started. Nothing else clears that state."
		}).input(J).output(Q),
		undoable: U.route({
			method: "GET",
			path: "/git/{repo}/undo",
			summary: "What undoing the last action would do",
			description: "Reads the branch's reflog to describe the move that undo would reverse, and hands back the commit it would land on. Pass that commit to the undo call as proof you looked, and an undo prepared against a view that has since moved is refused rather than landing somewhere unexamined."
		}).input(J).output(sA),
		undo: U.route({
			method: "POST",
			path: "/git/{repo}/undo",
			summary: "Move the branch back one step",
			description: "Walks the current branch back to where it pointed before its last action. This moves the branch ref and leaves the working tree alone, which is the opposite of restoring a checkpoint. Requires the commit the matching read handed you."
		}).input(cA).output(Q),
		stashes: U.route({
			method: "GET",
			path: "/git/{repo}/stashes",
			summary: "Everything set aside in the stash",
			description: "The repo's stash entries, newest first, each with the message and the commit behind it. A stash entry is a commit, so it reads the same way a log entry does and its contents come back from the stash diff call."
		}).input(J).output($k),
		stashDiff: U.route({
			method: "GET",
			path: "/git/{repo}/stash-diff",
			summary: "What one stash entry holds",
			description: "The files a single stash entry would bring back, with per-file status and line counts. The same shape a commit diff has, because a stash entry is a commit."
		}).input(iA).output(Uk),
		stashPush: U.route({
			method: "POST",
			path: "/git/{repo}/stash",
			summary: "Set the current changes aside",
			description: "Moves the working tree's changes onto the stash and leaves a clean tree behind. Nothing is lost: the entry is a commit you can inspect, apply or drop afterwards."
		}).input(tA).output(Q),
		stashApply: U.route({
			method: "POST",
			path: "/git/{repo}/stash/apply",
			summary: "Bring a stash entry back",
			description: "Replays one stash entry onto the working tree. A conflict is reported in the answer rather than raised as a failure, because a conflicting apply is an ordinary outcome a screen has to render."
		}).input(nA).output(Q),
		stashDrop: U.route({
			method: "POST",
			path: "/git/{repo}/stash/drop",
			summary: "Discard a stash entry",
			description: "Deletes one stash entry. This is the only unrecoverable call in the stash set, so the daemon takes a checkpoint of the workspace first."
		}).input(rA).output(q),
		createBranch: U.route({
			method: "POST",
			path: "/git/{repo}/branch",
			summary: "Start a branch at a commit",
			description: "Points a new branch name at any commit, without moving HEAD. Use the checkout call if you also want to switch to it."
		}).input(Gk).output(q),
		createTag: U.route({
			method: "POST",
			path: "/git/{repo}/tag",
			summary: "Tag a commit",
			description: "Puts a tag on any commit. Local only: pushing it to the remote is a separate call."
		}).input(Kk).output(q),
		deleteTag: U.route({
			method: "POST",
			path: "/git/{repo}/tag/delete",
			summary: "Remove a tag",
			description: "Deletes a tag locally. A tag already pushed stays on the remote until it is deleted there too."
		}).input(Jk).output(q),
		pushTag: U.route({
			method: "POST",
			path: "/git/{repo}/tag/push",
			summary: "Send a tag to the remote",
			description: "Pushes one tag to the repo's remote. Reports the outcome rather than failing, since a missing remote or missing credentials are ordinary answers here."
		}).input(Yk).output(Q),
		checkout: U.route({
			method: "POST",
			path: "/git/{repo}/checkout",
			summary: "Switch to a branch or commit",
			description: "Moves HEAD to a branch, tag or commit and reshapes the working tree to match. The daemon takes a checkpoint first, so an unexpected result is recoverable. Uncommitted work that would be overwritten is reported instead of being trampled."
		}).input(qk).output(Q),
		cherryPick: U.route({
			method: "POST",
			path: "/git/{repo}/cherry-pick",
			summary: "Replay one commit onto this branch",
			description: "Applies a single commit's changes on top of the current branch as a new commit. A conflict comes back in the answer, with the halted state readable from the operation call."
		}).input(Zk).output(Q),
		revert: U.route({
			method: "POST",
			path: "/git/{repo}/revert",
			summary: "Undo a commit with a new commit",
			description: "Adds a commit that reverses an earlier one, leaving the history intact. This is the safe way to take something back on a branch other people have pulled."
		}).input(Zk).output(Q),
		drop: U.route({
			method: "POST",
			path: "/git/{repo}/drop",
			summary: "Remove a commit from history",
			description: "Rewrites the branch so one commit is no longer in it. History changes, so this is for branches nobody else has pulled. A checkpoint is taken first."
		}).input(Zk).output(Q),
		merge: U.route({
			method: "POST",
			path: "/git/{repo}/merge",
			summary: "Merge another branch in",
			description: "Merges a branch or commit into the current one. Conflicts are reported in the answer and leave the worktree halted, which the operation call explains and the abort call clears."
		}).input(Zk).output(Q),
		rebase: U.route({
			method: "POST",
			path: "/git/{repo}/rebase",
			summary: "Replay this branch onto another",
			description: "Moves the current branch's commits on top of a different base. History changes. Conflicts halt the rebase and are reported rather than raised, so the operation and abort calls are the way through."
		}).input(Zk).output(Q),
		reset: U.route({
			method: "POST",
			path: "/git/{repo}/reset",
			summary: "Move the branch to a commit",
			description: "Repoints the current branch at another commit, optionally reshaping the working tree to match. The destructive modes take a checkpoint first."
		}).input(Xk).output(Q),
		fileDiff: U.route({
			method: "GET",
			path: "/git/{repo}/file-diff",
			summary: "One file's committed and working copies",
			description: "Both sides of a file as it stands right now: what the last commit holds and what is on disk. This is what a review pane shows for an uncommitted change."
		}).input(ab).output(Mv),
		status: U.route({
			method: "GET",
			path: "/git/{repo}/status",
			summary: "One repo's branch and pending changes",
			description: "The current branch, its sync position against the remote, and every staged, unstaged and untracked path. The single-repo counterpart to the workspace-wide changes call."
		}).input(J).output(ob),
		commit: U.route({
			method: "POST",
			path: "/git/{repo}/commit",
			summary: "Commit the pending changes",
			description: "Records a commit with your message. It commits whatever is staged; add `stage` to stage something first — an empty object for everything pending, or a scope such as one side or one conversation's landed files. The answer carries the commit it created."
		}).input(Zy).output(Cb),
		discard: U.route({
			method: "POST",
			path: "/git/{repo}/discard",
			summary: "Throw away pending changes",
			description: "Restores files to their committed state and deletes untracked ones. Name paths or a scope to narrow it; with neither it throws away every uncommitted change in the repository. The daemon checkpoints the workspace first, so this is recoverable from the timeline."
		}).input(Qy).output(q),
		stage: U.route({
			method: "POST",
			path: "/git/{repo}/stage",
			summary: "Mark changes for the next commit",
			description: "Adds changes to the index: exactly the paths you name, everything a scope describes, or the whole repository when you name neither. Nothing on disk changes, so this is always safe and always reversible with the unstage call."
		}).input($y).output(q),
		unstage: U.route({
			method: "POST",
			path: "/git/{repo}/unstage",
			summary: "Take changes back out of the next commit",
			description: "Removes changes from the index and leaves the files themselves untouched, on the same terms as staging. The exact reverse of it."
		}).input($y).output(q),
		branches: U.route({
			method: "GET",
			path: "/git/{repo}/branches",
			summary: "Local branches and how far each has drifted",
			description: "Every local branch with how many commits it sits ahead of and behind its remote counterpart, so a branch switcher can show sync state without a call per branch."
		}).input(J).output(pb),
		createBranchAt: U.route({
			method: "POST",
			path: "/git/{repo}/branches",
			summary: "Create a branch from a starting point",
			description: "Makes a branch at a named start point and optionally switches to it. The branch-switcher counterpart to creating a branch at a specific commit."
		}).input(mb).output(q),
		deleteBranch: U.route({
			method: "POST",
			path: "/git/{repo}/branches/delete",
			summary: "Delete a local branch",
			description: "Removes a branch from the repo. Unmerged work is refused unless you ask for it to be forced, and the remote branch is untouched either way."
		}).input(hb).output(q),
		remote: U.route({
			method: "GET",
			path: "/git/{repo}/remote",
			summary: "Sync position against the remote",
			description: "How far the current branch sits ahead of and behind its remote, as of the last fetch, plus whether a remote and working credentials exist at all. This is a read of what the daemon already knows, not a network call, which is why fetching is a separate button."
		}).input(J).output(ub),
		fetch: U.route({
			method: "POST",
			path: "/git/{repo}/fetch",
			summary: "Refresh what the remote holds",
			description: "Contacts the remote and updates the daemon's picture of it without touching your branch. Run this before trusting the sync position."
		}).input(J).output(Q),
		pull: U.route({
			method: "POST",
			path: "/git/{repo}/pull",
			summary: "Bring remote commits down",
			description: "Fetches and integrates the remote's commits into the current branch. A pull that cannot fast-forward is reported in the answer rather than raised, because that is an ordinary thing to be told."
		}).input(J).output(Q),
		push: U.route({
			method: "POST",
			path: "/git/{repo}/push",
			summary: "Start sending commits to the remote",
			description: "Starts pushing the current branch, setting its upstream on first push, and answers at once: the push runs in a real terminal (it runs this repository's pre-push hook, which can be a whole suite), so watch it there and poll pushState for the verdict. A second start while one is going joins it rather than pushing twice."
		}).input(eb).output(q),
		pushState: U.route({
			method: "GET",
			path: "/git/{repo}/push",
			summary: "How the push is going",
			description: "The verdict, or the progress so far: where it is, the terminal it runs in, and for a push that did not go, git's last words and who refused it, the repository's own pre-push hook, the remote, or the transport. Idle when nothing has been started for this repository."
		}).input(J).output(nb),
		pushCancel: U.route({
			method: "POST",
			path: "/git/{repo}/push/cancel",
			summary: "Stop the push",
			description: "Kills the run. It settles as cancelled; nothing that git had not already sent reaches the remote."
		}).input(J).output(q),
		files: U.route({
			method: "GET",
			path: "/git/{repo}/files",
			summary: "Every tracked path in the repo",
			description: "The flat list of files git tracks, which is what a file picker or a search box wants. Ignored and untracked files are not in it."
		}).input(J).output(sb),
		readFile: U.route({
			method: "GET",
			path: "/git/{repo}/file",
			summary: "Read a file from the repo",
			description: "The contents of one file as it stands on disk. A path that climbs out of the repo is refused."
		}).input(rb).output(cb),
		writeFile: U.route({
			method: "PUT",
			path: "/git/{repo}/file",
			summary: "Write a file into the repo",
			description: "Replaces one file's contents, creating it and its parent folders if they are missing. Nothing is committed: the change shows up as pending work."
		}).input(ib).output(q),
		publishFile: U.route({
			method: "POST",
			path: "/git/{repo}/publish-file",
			summary: "Write, commit and push one file",
			description: "The three steps as a single call with a single answer, committing only the path you named and leaving any other pending work alone. Being on a side branch, having no remote and having no credentials are all reported rather than raised."
		}).input(Bk).output(Vk)
	};
})), fA, pA = v((() => {
	W(), Nv(), Y(), fA = {
		list: U.route({
			method: "GET",
			path: "/history/snapshots",
			summary: "Points you can go back to",
			description: "The saved states of the whole workspace, taken automatically as work happens. This is the timeline behind undoing a change that was never committed."
		}).output(wv),
		diff: U.route({
			method: "GET",
			path: "/history/diff",
			summary: "What changed since a saved point",
			description: "The files that differ between one saved point and the one before it, taking in everything that happened in between."
		}).input(Dv).output(kv),
		fileDiff: U.route({
			method: "GET",
			path: "/history/file-diff",
			summary: "One file's before and after across a saved point",
			description: "Both sides of a single file at one point in the timeline."
		}).input(Av).output(Mv),
		restore: U.route({
			method: "POST",
			path: "/history/restore",
			summary: "Put the workspace back",
			description: "Returns every file to how it stood at a saved point. This restores the files; moving a branch is a different thing and lives with the git calls."
		}).input(Dv).output(q)
	};
})), mA, hA = v((() => {
	V(), mA = M({ args: j(D()) });
})), gA, _A = v((() => {
	W(), _d(), WC(), hA(), Y(), gA = {
		run: U.route({
			method: "POST",
			path: "/intentic",
			summary: "Run an infrastructure command",
			description: "Runs the sandbox's own command-line tool and streams its output as it arrives, so progress is visible rather than arriving all at once at the end. A failure surfaces once the stream closes."
		}).input(mA).output(H(EC)),
		apply: U.route({
			method: "POST",
			path: "/intentic/apply",
			summary: "Bring the infrastructure into line",
			description: "Starts the long reconcile that makes the running world match what was declared, and answers immediately. It takes minutes, so it runs in a terminal you attach to rather than on a held-open request."
		}).output(q),
		applyEvents: U.route({
			method: "GET",
			path: "/intentic/apply/events",
			summary: "Follow the reconcile",
			description: "The same progress the terminal shows, as structured events, kept on disk so a page refresh does not lose it. It replays from the start of the run and then follows live, closing when the run ends."
		}).meta({ stream: !0 }).output(H(EC))
	};
})), vA, yA, bA, xA, SA, CA, wA, TA, EA, DA, OA, kA, AA = v((() => {
	V(), vA = I([
		"host",
		"cloudflare",
		"github",
		"gitlab",
		"stripe"
	]), yA = I([
		"signoz",
		"outline",
		"paperless",
		"openproject",
		"invoiceninja",
		"infisical"
	]), bA = F(D(), N([D(), k()])), xA = /^[a-zA-Z_][a-zA-Z0-9_]*$/, SA = D().min(1).max(60).regex(xA), CA = M({
		kind: L("backend").describe("Something you already have: a machine, an account with a hosting provider."),
		provider: vA.describe("Which provider it is with."),
		name: D().describe("What to call it, which is also how everything else refers to it."),
		values: bA.describe("Its settings. Anything secret is stored separately and referred to here, never written in.")
	}), wA = M({
		kind: L("service").describe("Something you want provisioned."),
		service: yA.describe("Which service."),
		name: D().describe("What to call it."),
		values: bA.describe("Its settings."),
		on: D().describe("Which of your machines to put it on."),
		expose: D().describe("How it should be reachable.")
	}), TA = M({
		kind: L("app").describe("An app of your own, built from source and deployed."),
		name: D().describe("What to call it."),
		values: bA.describe("Its settings, including the address it should answer on."),
		on: D().describe("Which of your machines to put it on."),
		expose: D().describe("How it should be reachable.")
	}), EA = P("kind", [
		CA,
		wA,
		TA
	]), DA = P("kind", [
		CA.extend({ name: SA }),
		wA.extend({ name: SA }),
		TA.extend({ name: SA })
	]), OA = M({ name: D().describe("Which entry, by name.") }), kA = M({ entries: j(EA).describe("Everything declared: what you have, and what you want provisioned.") }), M({
		name: SA,
		user: D().min(1),
		address: D().min(1),
		port: B().default(22),
		via: I(["direct", "cloudflared"]).default("cloudflared"),
		sshKey: D().min(1),
		cfToken: D().optional(),
		cfZone: D().optional()
	});
})), jA, MA = v((() => {
	W(), AA(), jA = {
		list: U.route({
			method: "GET",
			path: "/inventory",
			summary: "Machines and services you have declared",
			description: "What the deployment configuration says this setup owns and what it wants provisioned."
		}).output(kA),
		add: U.route({
			method: "POST",
			path: "/inventory",
			summary: "Declare a machine or service",
			description: "Writes the entry into the configuration file and commits it, exactly as an agent editing that file by hand would. Answers with the whole updated list, so a screen redraws from one response."
		}).input(DA).output(kA),
		remove: U.route({
			method: "DELETE",
			path: "/inventory/{name}",
			summary: "Undeclare a machine or service",
			description: "Takes the entry back out of the configuration and commits that too. Answers with the whole updated list."
		}).input(OA).output(kA)
	};
})), NA, PA = v((() => {
	W(), $v(), Y(), NA = {
		list: U.route({
			method: "GET",
			path: "/issues",
			summary: "Bugs your users have reported",
			description: "Everything that has crashed or been written in, grouped so a crash that hit a thousand people is one row with a count."
		}).output(Kv),
		status: U.route({
			method: "POST",
			path: "/issues/{id}/status",
			summary: "File one away, or reopen it",
			description: "Moves one issue between open, resolved and ignored. Resolving does not close anything upstream: it is your own inbox."
		}).input(Jv).output(q),
		investigate: U.route({
			method: "POST",
			path: "/issues/{id}/investigate",
			summary: "Put an agent on it now",
			description: "Starts a turn on this issue with the crash, its stack and what led up to it as the brief. Answers straight away and runs detached; the issue goes to 'being looked at'."
		}).input(qv).output(q),
		remove: U.route({
			method: "DELETE",
			path: "/issues/{id}",
			summary: "Throw one away",
			description: "Forgets an issue entirely. It will come back as new if it happens again, which is usually what you want."
		}).input(qv).output(q),
		installs: U.route({
			method: "GET",
			path: "/issues/installs/{automationId}",
			summary: "Which sites have loaded the reporter",
			description: "The sites whose pages actually loaded this intake's script, and the ones that were turned away. The answer to 'did the snippet land?', which an empty inbox cannot give you."
		}).input(Qv).output(Zv)
	};
})), FA, IA, LA, RA, zA, BA, VA, HA, UA = v((() => {
	V(), FA = M({
		name: D().describe("Its name, which is what the read route takes."),
		sizeBytes: k().describe("Size in bytes."),
		modifiedAt: k().describe("When it last changed, in milliseconds.")
	}), IA = M({ files: j(FA).describe("Every log the sandbox keeps: captured terminal output, command runs, and its own log.") }), LA = M({
		name: D().min(1).describe("Which log. It travels in the query rather than the address, because log names contain slashes."),
		bytes: B().min(1).max(1048576).default(65536).describe("How much of the end to read. The newest bytes win when the file is larger.")
	}), RA = M({
		name: D().describe("Which log this is from."),
		sizeBytes: k().describe("How large the whole file is."),
		text: D().describe("The end of it, as text."),
		truncated: A().describe("There is more before what you got.")
	}), zA = M({
		seenAt: k().describe("When the browser saw it, in milliseconds."),
		level: I(["warn", "error"]).describe("How bad it was."),
		event: D().min(1).max(100).describe("What kind of thing it was, as a stable name."),
		message: D().max(2e3).describe("What it said."),
		route: D().max(300).optional().describe("Which page they were on."),
		requestId: D().max(100).optional().describe("Which daemon call it belonged to, when it belonged to one."),
		build: D().max(100).optional().describe("Which build of the app was running."),
		fields: F(D().max(60), N([
			D().max(4e3),
			k(),
			A()
		])).optional().describe("Whatever else was worth keeping.")
	}), BA = M({ events: j(zA).min(1).max(50).describe("What the browser has to report, oldest first.") }), VA = M({ recorded: k().describe("How many were written down.") }), HA = M({
		clientId: D().describe("This connection's own id, the same one it gave the event stream."),
		idle: A().describe("Whether the person has stopped doing anything."),
		view: D().optional().describe("Which view they are on."),
		sessionId: D().optional().describe("Which conversation they have open."),
		path: D().optional().describe("Which file they are looking at. Sent whole rather than merged: leaving a field out clears it, so a tab that closes a file drops the path in the same report.")
	});
})), WA, GA, KA = v((() => {
	W(), UA(), WA = U.meta({
		floor: "maintainer",
		control: "never"
	}), GA = {
		list: WA.route({
			method: "GET",
			path: "/logs",
			summary: "Logs the sandbox keeps",
			description: "Every log file the daemon owns: captured terminal output, command runs, and the daemon's own log. Read-only, because only the sandbox writes them."
		}).output(IA),
		read: WA.route({
			method: "GET",
			path: "/logs/file",
			summary: "Read part of a log",
			description: "A window of one log file's text. A window rather than the whole thing, because a busy log outgrows any single answer."
		}).input(LA).output(RA),
		report: U.meta({
			floor: "viewer",
			control: "never"
		}).route({
			method: "POST",
			path: "/logs/client",
			summary: "Report what the browser saw",
			description: "Errors the app caught, stalls it measured, and recoveries it performed, written to a log of their own. The browser is the only witness to these, so without it a bug someone hit in their own browser leaves no record at all."
		}).input(BA).output(VA)
	};
})), qA, JA = v((() => {
	W(), gh(), Y(), qA = {
		list: U.route({
			method: "GET",
			path: "/loops",
			summary: "Every loop that has run",
			description: "The loops this workspace has run, newest first, kept after they end. Why it stopped on the fourth round is the question a loop gets read for, and the round-by-round history is the answer."
		}).output(uh),
		start: U.route({
			method: "POST",
			path: "/loops",
			summary: "Run a conversation until it is done",
			description: "Starts repeating a conversation towards a goal and answers straight away with the loop as recorded; the work carries on without you. The conversation need not exist yet, so run this until it passes can be the first thing you ever say to a new agent. A conversation already looping is refused."
		}).input(oh).output(lh),
		stop: U.route({
			method: "POST",
			path: "/loops/{conversationId}/stop",
			summary: "Make this round the last",
			description: "Means do not start another round, not stop what is running. Somebody watching the sixth round do good work can say this is the last one without throwing that work away. To cut the current round off as well, stop the conversation too."
		}).input(dh).output(q),
		designs: U.route({
			method: "GET",
			path: "/loops/designs",
			summary: "Saved loop designs",
			description: "Loops somebody authored once and can point at a different job each time. A saved loop is the same loop with its goal left blank until you type one, not a different feature."
		}).output(ph),
		saveDesign: U.route({
			method: "POST",
			path: "/loops/designs",
			summary: "Create or replace a saved loop",
			description: "Say which of the two you mean, so a name that happens to collide cannot silently overwrite somebody's work. A design that could never finish, with nothing to produce and nothing to check, is refused in the same words an ad-hoc loop would be: catching that at save time is the whole advantage of saving."
		}).input(mh).output(fh),
		removeDesign: U.route({
			method: "DELETE",
			path: "/loops/designs/{id}",
			summary: "Delete a saved loop",
			description: "Removes the design. A loop already running from it keeps going on its own terms, because it took a copy of what it needed when it started."
		}).input(hh).output(q)
	};
})), YA, XA, ZA, QA, $A = v((() => {
	V(), YA = I([
		"launching",
		"installing",
		"starting",
		"exited"
	]), XA = M({
		repo: D().describe("Which repository."),
		hasPanel: A().describe("Whether it has anything runnable at all."),
		running: A().describe("Whether the sandbox has it running."),
		installed: A().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: YA.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves."),
		healthy: A().describe("Whether anything it owns is actually answering. A different question: a server still installing is running and not yet healthy, and one somebody started by hand is healthy without the sandbox running it."),
		port: k().optional().describe("The port the sandbox told it to use. What it actually bound is below, and for a repository that pins its own ports those are different numbers."),
		servers: j(M({
			port: k().describe("The port it is listening on, which is what forwarding it takes."),
			url: D().describe("Where it answers, with the right scheme: a server on its own certificate is served over https."),
			dir: D().optional().describe("Which part of the repository it belongs to, which for a repository whose dev command fans out is the only thing telling them apart."),
			session: D().optional().describe("The terminal it runs in: the sandbox's when it started it, yours when you did, and absent when nothing here owns it, which is the case worth designing for.")
		})).describe("Every server this repository is really serving, found by looking at what is listening. Empty when nothing answers."),
		previewUrl: D().optional().describe("Where to open it from outside, present only while that address really serves it. Absent on a sandbox with no outside address."),
		role: I([
			"intent",
			"desired-state",
			"app"
		]).optional().describe("Which of the workspace's three fixed roles this repository fills. Absent for one that was simply cloned in."),
		deployConfig: A().describe("It declares infrastructure."),
		desiredState: A().describe("That declaration has been resolved at least once."),
		directoryUi: A().describe("It carries a small interface of its own."),
		monorepo: A().describe("It holds several packages."),
		tests: A().describe("It has tests that can be run."),
		userStories: A().describe("It carries stories an agent could test the running app against. The one fact here that says nothing about the language."),
		docs: A().describe("It carries generated architecture documentation.")
	}), ZA = M({ panels: j(XA).describe("One entry per repository, worked out in a single pass so nothing has to walk the workspace file by file.") }), QA = M({ repo: D().describe("Which repository.") });
})), ej, tj = v((() => {
	W(), $A(), Y(), ej = {
		list: U.route({
			method: "GET",
			path: "/panels",
			summary: "Repos you can run and preview",
			description: "Every repo with whether its dev server is up and what the sandbox worked out about its contents."
		}).output(ZA),
		start: U.route({
			method: "POST",
			path: "/panels/{repo}/start",
			summary: "Start a repo's dev server",
			description: "Brings the repo's own runnable app up in a terminal you can attach to, so its preview address starts answering."
		}).input(QA).output(q),
		stop: U.route({
			method: "POST",
			path: "/panels/{repo}/stop",
			summary: "Stop a repo's dev server",
			description: "Shuts it down and frees the port."
		}).input(QA).output(q)
	};
})), nj, rj, ij, aj, oj = v((() => {
	V(), nj = M({
		port: k().describe("The port number."),
		host: I(["127.0.0.1", "::1"]).describe("Which loopback address it actually answers on. Some tools bind only one of the two, and anything dialling it has to know which."),
		forwardable: A().describe("Whether it can be exposed at all. Some listeners answer only at their own address and nowhere else; those are listed for honesty and refused for forwarding."),
		kind: I(["workspace", "system"]).describe("Whether somebody's own work put it there, or the sandbox's own machinery did. Only the first kind is worth previewing."),
		title: D().describe("What a person would call it. Always present: a listener nothing can explain is still named, because the button beside it publishes the port to the internet."),
		purpose: D().describe("One sentence about what it is for, including when the honest answer is that nothing could work it out."),
		origin: I([
			"terminal",
			"agent",
			"panel",
			"extension",
			"container",
			"sandbox",
			"unknown"
		]).describe("Who put it there, which is the question somebody is really asking: mine, my agent's, or the box's own."),
		pid: k().optional().describe("The process holding it. Absent when nothing could be matched to the socket."),
		command: D().optional().describe("The command behind it, as it was run. Absent only when nothing could be attributed at all."),
		cwd: D().optional().describe("Where it is running from, which is how a port gets attributed to a repository."),
		session: D().optional().describe("The terminal it came from, to watch it in or stop it from. Absent when nothing in its ancestry is one, which is the honest \"you cannot reach this from here\"."),
		job: M({
			conversationId: D().describe("The conversation whose turn left it running."),
			jobId: D().describe("The job, as that conversation's card names it; stopping it stops this port."),
			label: D().describe("What the job is, in the agent's own words when it gave any.")
		}).optional().describe("The background job an agent left running for you on this port, when that is what answers here."),
		forwarded: A().describe("Whether it is currently reachable from outside."),
		previewUrl: D().optional().describe("Where to open it. Present only while forwarded, and only on a sandbox that has an outside address.")
	}), rj = M({ ports: j(nj).describe("Everything listening inside the sandbox right now, read fresh each time rather than from a register the sandbox keeps.") }), ij = M({ port: k().int().min(1).max(65535).describe("Which port.") }), aj = M({ previewUrl: D().optional().describe("Where it can now be reached. Absent on a sandbox with no outside address, where the mapping exists but has no public name.") });
})), sj, cj = v((() => {
	W(), oj(), Y(), sj = {
		list: U.route({
			method: "GET",
			path: "/ports",
			summary: "What is listening inside the sandbox",
			description: "Every port something is answering on, and whether each one is reachable from outside."
		}).meta({ sync: "poll" }).output(rj),
		forward: U.route({
			method: "POST",
			path: "/ports/forward",
			summary: "Make a port reachable",
			description: "Gives one port an address on the outside. Asking twice is harmless: the second call hands back the address the first one made."
		}).input(ij).output(aj),
		unforward: U.route({
			method: "POST",
			path: "/ports/unforward",
			summary: "Stop exposing a port",
			description: "Frees the slot at once. The address keeps resolving; it simply stops leading anywhere."
		}).input(ij).output(q)
	};
})), lj, uj, dj, fj, pj, mj = v((() => {
	V(), lj = M({
		path: D().describe("Where it sits inside the outbox."),
		size: k().describe("Size in bytes."),
		modifiedAt: k().describe("When it last changed, in milliseconds."),
		url: D().optional().describe("Its public address. Absent when this sandbox has no outside address, or when the file is being refused."),
		blocked: D().optional().describe("Why a file sitting in the outbox is not being served: a hidden name, a credential-shaped name, contents that look like a token, or sheer size. Only the publisher sees this; a stranger asking for the same file gets the same nothing every other miss gets.")
	}), uj = M({
		url: D().optional().describe("Your public address, which every file's own hangs off. Absent on a sandbox with nowhere to publish to."),
		files: j(lj).describe("What the outbox holds.")
	}), dj = M({ path: D().min(1).describe("What to publish, as a workspace path. It is copied rather than moved, so a repository does not lose its build output because somebody shared it.") }), fj = M({ path: D().min(1).describe("What to withdraw, as a path inside the outbox rather than a workspace path.") }), pj = M({
		path: D().describe("Where it landed inside the outbox."),
		url: D().optional().describe("Its public address. Absent on a sandbox with nowhere to publish to.")
	});
})), hj, gj = v((() => {
	W(), mj(), Y(), hj = {
		list: U.route({
			method: "GET",
			path: "/public",
			summary: "What is published to the internet",
			description: "Everything currently in the outbox and the address it answers on. There is no call to read a published file back: it is served openly to anyone with the link, which is the entire point of having put it there."
		}).output(uj),
		publish: U.route({
			method: "POST",
			path: "/public/publish",
			summary: "Put a file on the internet",
			description: "Copies a workspace file or folder into the outbox, where it is served to anyone with the link and no sign-in. Answers with the address."
		}).input(dj).output(pj),
		unpublish: U.route({
			method: "POST",
			path: "/public/unpublish",
			summary: "Take something off the internet",
			description: "Withdraws one published entry. When the last one goes, the outbox goes with it, so its existing at all always means something is published."
		}).input(fj).output(q)
	};
})), _j, vj, yj = v((() => {
	W(), _d(), WC(), _w(), Y(), _j = U.meta({ agent: !0 }), vj = {
		list: _j.route({
			method: "GET",
			path: "/netdisk",
			summary: "Configured disks and which are mounted",
			description: "Every stored network disk with its live mount state, read back from the kernel's mount table rather than from memory, so a disk unmounted from a shell and one unmounted from a screen look the same here."
		}).output(hw),
		mount: _j.route({
			method: "POST",
			path: "/netdisk/{id}/mount",
			summary: "Mount a disk",
			description: "Mounts a stored disk at its place under /mnt/netdisk, streaming progress. Mounting one that is already mounted simply says so. A read-only disk is mounted read-only; the kernel refuses writes to it."
		}).input(gw).output(H(EC)),
		unmount: _j.route({
			method: "POST",
			path: "/netdisk/{id}/unmount",
			summary: "Unmount a disk",
			description: "Takes the disk down. One that was already unmounted is fine: the promise is that it is not mounted afterwards."
		}).input(gw).output(q)
	};
})), bj, xj, Sj = v((() => {
	W(), V(), K(), Em(), bj = M({
		native: j(Ud.shape.provider).describe("Native providers with a working credential here, by id; never what holds it."),
		agents: j(M({
			id: D(),
			label: D()
		})).describe("ACP agents installed here. The id is the provider id itself, the label its display name."),
		endpoints: j(M({
			id: D(),
			label: D(),
			kind: I(["endpoint", "localmodel"])
		})).describe("Model endpoints, already prefixed `endpoint/`, including the daemon-provisioned free trial.")
	}), xj = {
		list: U.route({
			method: "GET",
			path: "/providers",
			summary: "Providers a chat can run on here",
			description: "The installed ACP agents and model endpoints, which are the providers this sandbox adds to the fixed native list. A read for anyone who may watch or drive a turn: it names what a message can be addressed to, not what credential stands behind it."
		}).meta({ guest: !0 }).output(bj),
		models: U.route({
			method: "GET",
			path: "/providers/{provider}/models",
			summary: "Models one provider offers",
			description: "Every model this provider serves and which one it defaults to. Never empty: it is discovered live with a stored list behind it. The order is the provider's own preference and is not rearranged here."
		}).meta({ guest: !0 }).input(Ud).output(Tm)
	};
})), Cj, wj, Tj, Ej, Dj, Oj, kj, Aj = v((() => {
	V(), Cj = M({
		kind: L("webpush").describe("A browser, which the sandbox can reach directly and encrypt end to end."),
		endpoint: O().describe("Where that browser's push service accepts sends. It also identifies the device everywhere else in this group."),
		keys: M({
			p256dh: D().min(1).describe("The browser's public key, for encrypting what is sent."),
			auth: D().min(1).describe("The browser's secret, for the same.")
		}).describe("What the browser handed you when it subscribed. Post it back exactly as it came; nothing reshapes it.")
	}), wj = M({
		kind: L("relay").describe("A native app, whose operating system only accepts sends from the app's publisher, so the sandbox posts through a relay instead. The message passes through that relay readable, which is the price of the publisher having to be in the loop."),
		url: O().describe("Where to post a send. Recorded rather than assumed, so the sandbox need not know any platform by name."),
		deviceId: D().min(1).describe("The device's id, which also identifies this registration everywhere else in this group."),
		secret: D().min(1).describe("Proof that this sandbox may notify this device. The relay never learns which sandbox is calling.")
	}), Tj = P("kind", [Cj, wj]), M({
		title: D().min(1).describe("The headline."),
		body: D().describe("The line under it. Push services cap the whole payload at a few kilobytes, which is why nothing here carries a transcript or a diff: a notification is a pointer back, not a delivery."),
		url: D().optional().describe("Where tapping it goes. An existing tab is focused rather than a new one opened."),
		tag: D().optional().describe("Collapses repeats: a second notification with the same tag replaces the first instead of stacking beside it."),
		requireInteraction: A().optional().describe("Keep it on screen until it is dismissed. Used when the agent is waiting for you, where one that fades away is a question that went unanswered in silence."),
		silent: A().optional().describe("Arrive without sound or vibration. Used for the replacement that says an ask stopped waiting: it takes the waiting one's place under the same tag, and is news nobody has to act on.")
	}), Ej = M({
		publicKey: D().describe("The key a browser needs in order to subscribe. Native apps ignore it."),
		subscribed: A().describe("Whether the asking device is already registered, so a toggle can show its real state instead of trusting the device's own permission, which can be granted with nothing behind it.")
	}), Dj = M({ id: D().min(1).describe("Which device: a browser's push address, or a native install's device id.") }), Oj = M({ id: D().min(1).optional().describe("Which device is asking. Without it the answer can only speak for the sandbox as a whole, which is rarely the question.") }), kj = M({ delivered: k().int().nonnegative().describe("How many devices actually accepted it. A count rather than a yes, because this button exists to prove a chain nobody can inspect, and the sandbox having accepted the request is not the question being asked.") });
})), jj, Mj, Nj = v((() => {
	W(), Aj(), Y(), jj = U.meta({ control: "never" }), Mj = {
		config: jj.route({
			method: "GET",
			path: "/push/config",
			summary: "What a device needs to subscribe",
			description: "The public key and settings a browser or app needs before it can register for notifications from this sandbox."
		}).input(Oj).output(Ej),
		subscribe: jj.route({
			method: "POST",
			path: "/push/subscribe",
			summary: "Send notifications to this device",
			description: "Registers one device. The sandbox only interrupts you on the three moments where attention is genuinely wanted: a turn has finished, the agent is stuck on a question, and something is waiting for approval."
		}).meta({ floor: "collaborator" }).input(Tj).output(q),
		unsubscribe: jj.route({
			method: "POST",
			path: "/push/unsubscribe",
			summary: "Stop notifying a device",
			description: "Removes one registered device. Others keep receiving."
		}).meta({ floor: "collaborator" }).input(Dj).output(q),
		test: jj.route({
			method: "POST",
			path: "/push/test",
			summary: "Send a test notification",
			description: "Proves the whole chain end to end. Worth having, because there are four separate places a notification can be lost that nobody can inspect from the outside: the device's permission, its registration, the sandbox's key, and the delivery service."
		}).meta({ floor: "collaborator" }).output(kj)
	};
})), Pj, Fj, Ij, Lj, Rj, zj, Bj, Vj, Hj, Uj, Wj, Gj, Kj, qj, Jj, Yj, Xj, Zj, Qj, $j = v((() => {
	V(), Pj = [
		"person-name",
		"national-id",
		"tax-id",
		"identity-document",
		"bank-account",
		"payment-card",
		"email",
		"phone",
		"address"
	], Fj = I(Pj), Ij = I([
		"off",
		"watch",
		"on"
	]), Lj = I(["mask", "allow"]), Rj = I(["dictionary", "model"]), zj = 1e3, Bj = M({
		conversationId: D().min(1).max(200),
		provider: D().min(1).max(200).describe("Provider id, as the trusted list names it.")
	}), Vj = M({
		mode: Ij.default("off").describe("Whether the shield is off, only watching, or masking."),
		trusted: j(D().min(1).max(200)).max(200).default([]).describe("Providers that may read personal data as it is, by provider id (`claude`, `codex`, `endpoint/<id>`). A local model is always trusted."),
		classes: j(Fj).default([...Pj]).describe("Which kinds of personal data are looked for."),
		images: Lj.default("mask").describe("What an image bound for an untrusted provider becomes."),
		names: Rj.default("dictionary").describe("How names are found."),
		allow: j(D().min(1).max(200)).max(zj).default([]).describe("Values never masked: your own company, a public figure, a word the detector keeps mistaking for a name."),
		conversations: j(Bj).max(200).default([]).describe("Providers that may read one conversation's personal data as it is, each granted from that conversation; oldest first.")
	}), Vj.parse({}), Hj = M({
		id: D().describe("Provider id, as the trusted list names it."),
		label: D(),
		shieldable: A().describe("Its runtime can be put behind the gateway; one that cannot is refused while the shield is on, unless trusted."),
		local: A().describe("It runs on this machine, so it is trusted whatever the list says.")
	}), Uj = M({
		policy: Vj,
		known: k().int().describe("Values taught from your datasets, matched exactly wherever they appear."),
		tokens: k().int().describe("Values the shield has given a token so far."),
		readers: M({
			ocr: A().describe("The local text reader (PaddleOCR) that finds personal data in images is installed."),
			model: A().describe("A local named-entity model for names is installed.")
		}),
		providers: j(Hj)
	}), Wj = I([
		"masked",
		"watched",
		"passed",
		"refused"
	]), Gj = M({
		at: D().describe("When, as an ISO timestamp."),
		conversationId: D().optional(),
		provider: D(),
		trusted: A(),
		action: Wj,
		counts: Al(Fj, k().int()).describe("How many of each kind were found in what this request added."),
		images: k().int().describe("Images the shield changed: personal data painted over, or held back when they could not be read."),
		documents: k().int().describe("Documents replaced by their masked text."),
		protocol: D().describe("Which wire format the request spoke."),
		detail: D().optional().describe("Why it was refused, when it was.")
	}), Kj = 5e4, qj = M({
		value: D().min(2).max(500),
		class: Fj
	}), Jj = M({
		source: D().describe("Where the values came from, as whoever taught them named it."),
		count: k().int(),
		at: D().describe("When they were last taught.")
	}), Yj = M({
		id: D().describe("Stable id of the list."),
		kind: I([
			"first-name",
			"surname",
			"ambiguous",
			"title",
			"never"
		]).describe("What a word on it says about a name."),
		languages: j(I(["pl", "en"])).describe("The languages its words come from."),
		count: k().int().describe("How many words it holds."),
		matching: I(["inflected", "as-written"]).describe("inflected: matched in every grammatical form of a listed word; as-written: matched only exactly as listed."),
		source: D().describe("Where the words come from: the register or dataset, or that they were written by hand."),
		url: D().optional().describe("The source's page, where it has one."),
		license: D().optional()
	}), Xj = M({
		word: D(),
		firstName: A().describe("A listed first name, in this form or as an inflection of one."),
		surname: A().describe("A listed surname, in this form or as an inflection of one."),
		surnameForm: A().describe("Shaped like a Polish surname (-ski, -cki, -wicz…), listed or not."),
		ambiguous: A().describe("Also an ordinary word, so found only beside other evidence (a surname, a title)."),
		never: A().describe("Never taken as part of a name (a title, an institution, a function word).")
	}), Zj = M({
		text: D().describe("The query as a name is written: each word capitalized."),
		found: A().describe("Whether the dictionary alone masks it as a name, written so on its own."),
		words: j(Xj)
	}), Qj = M({
		lists: j(Yj),
		totals: M({
			firstNames: k().int(),
			surnames: k().int()
		}).describe("Distinct words across the first-name lists, and across the surname lists."),
		matches: j(M({
			word: D(),
			lists: j(D()).describe("Ids of the lists holding it.")
		})),
		lookup: Zj.optional()
	});
})), eM, tM = v((() => {
	V(), W(), $j(), Y(), eM = {
		status: U.route({
			method: "GET",
			path: "/privacy/shield",
			summary: "The privacy shield and what it covers",
			description: "Whether personal data is kept from untrusted model providers, which providers are trusted, which local readers are installed, and how many values it has learned."
		}).meta({ agent: !0 }).output(Uj),
		setPolicy: U.route({
			method: "POST",
			path: "/privacy/shield",
			summary: "Change the privacy shield",
			description: "Replaces the policy whole. Turning the shield on puts every turn that starts from then on, whose runtime can be shielded, behind the gateway, and refuses the turns that cannot be shielded on an untrusted provider; a turn already running keeps the route it started with. A change to what is masked or trusted holds from the next model request."
		}).meta({
			floor: "owner",
			control: "never",
			panel: !1
		}).input(Vj).output(q),
		log: U.route({
			method: "GET",
			path: "/privacy/log",
			summary: "What the privacy shield did lately",
			description: "Each model request the gateway handled: which provider, whether it was trusted, and how many of each kind of personal data it found. Never the values."
		}).output(j(Gj)),
		dictionary: U.route({
			method: "GET",
			path: "/privacy/dictionary",
			summary: "The name lists the shield finds names by",
			description: "Every list the dictionary holds (first names, surnames, words that are names only beside other evidence, titles), how many words each has and where they come from. With a query, what the dictionary makes of it as a name, and for one word the listed words starting with it."
		}).meta({ agent: !0 }).input(M({ query: D().max(100).optional().describe("A word, the start of one, or a full name.") })).output(Qj),
		sources: U.route({
			method: "GET",
			path: "/privacy/known",
			summary: "The datasets taught to the shield",
			description: "Each source values were taught from, and how many. The values themselves are never sent back."
		}).meta({ agent: !0 }).output(j(Jj)),
		learn: U.route({
			method: "POST",
			path: "/privacy/known",
			summary: "Teach the shield a dataset's values",
			description: "Each value is masked wherever it appears from now on, in every form it is written, whether or not the detectors would have found it. Teaching only ever masks more, so the agent may do it."
		}).meta({ agent: !0 }).input(M({
			source: D().min(1).max(200).describe("Where the values came from: a file and its column, a table."),
			values: j(qj).max(Kj)
		})).output(M({
			added: k().int(),
			known: k().int()
		})),
		forget: U.route({
			method: "POST",
			path: "/privacy/known/forget",
			summary: "Forget a taught dataset",
			description: "Stops matching the values taught from one source. Tokens already given to them still resolve, so earlier conversations keep reading right."
		}).meta({
			floor: "owner",
			control: "never",
			panel: !1
		}).input(M({ source: D().min(1).max(200) })).output(M({ forgotten: k().int() }))
	};
})), nM, rM = v((() => {
	W(), dx(), Y(), V(), nM = {
		policy: U.route({
			method: "GET",
			path: "/safety/policy",
			summary: "The safety policy this sandbox is judged against",
			description: "The document that decides when an agent stops to ask you before running something. Prose, not settings: it is read by the model that judges each command. When nobody has written one, this is the text the product ships with, and it describes the behaviour a fresh sandbox already has."
		}).output(ux),
		setPolicy: U.route({
			method: "POST",
			path: "/safety/policy",
			summary: "Rewrite the safety policy",
			description: "Replaces the document whole. Nothing in it can widen what the sandbox is structurally allowed to do: it decides which of the things an agent may already do are worth interrupting you about."
		}).input(M({ text: D().describe("The policy, as you want it written.") })).output(q),
		log: U.route({
			method: "GET",
			path: "/safety/log",
			summary: "Recent safety verdicts",
			description: "What was judged lately, what the judge decided, and whether you were interrupted. Newest first. This is where you find out why you were not asked about something, which is the question a policy page otherwise cannot answer."
		}).output(j(lx))
	};
})), iM, aM, oM, sM = v((() => {
	W(), Y(), sg(), iM = U.meta({
		agent: !0,
		control: "never"
	}), aM = U.meta({
		floor: "maintainer",
		control: "never"
	}), oM = {
		ask: iM.route({
			method: "POST",
			path: "/needs/ask",
			summary: "Ask a person for something the task needs",
			description: "Raises a need in the conversation the calling shell belongs to and holds the call up to `wait` seconds for an answer. Answers `met` when it is usable now (or already was), `open` when it is still waiting, and `refused` when nothing was raised or a person declined. An open need's answer reaches the conversation by itself."
		}).meta({ stream: !0 }).input(Xh).output(Zh),
		mine: iM.route({
			method: "GET",
			path: "/needs/mine",
			summary: "This conversation's needs",
			description: "Every need the calling shell's conversation raised, newest first, open or answered."
		}).output(rg),
		withdraw: iM.route({
			method: "POST",
			path: "/needs/{id}/withdraw",
			summary: "Withdraw a need",
			description: "Closes one of this conversation's open needs because the task no longer needs it. Its card says so."
		}).input($h).output(Jh),
		list: U.route({
			method: "GET",
			path: "/needs",
			summary: "What agents are waiting on people for",
			description: "Needs across the sandbox, or one conversation's, newest first. Never a secret's value."
		}).input(ng).output(rg),
		answer: aM.route({
			method: "POST",
			path: "/needs/{id}/answer",
			summary: "Answer a need",
			description: "Declines it, or says yes the way its card offered: accept a connection being set up, apply a change, grant for this conversation or the persona, release a gated credential, approve an environment proposal. A release is refused from anyone the gate does not name."
		}).input(eg).output(Jh),
		provideSecret: aM.route({
			method: "POST",
			path: "/needs/{id}/secret",
			summary: "Give a secret a need asked for",
			description: "Stores the value under the name the need asked for and meets it. The value goes to the sandbox's secret store and nowhere else: not the answer, not the transcript, not a log."
		}).meta({ panel: !1 }).input(tg).output(Jh),
		grants: aM.route({
			method: "GET",
			path: "/needs/grants",
			summary: "The yeses still standing",
			description: "What people allowed conversations beyond their persona or area, and the gated credentials released to them, by conversation. Names only, never a value."
		}).output(ag),
		revokeGrant: aM.route({
			method: "POST",
			path: "/needs/grants/revoke",
			summary: "Take a yes back",
			description: "Takes back one grant or one release. The conversation's next turn runs without it; a turn already running keeps what it mounted."
		}).input(og).output(q)
	};
})), cM, lM, uM = v((() => {
	W(), Gf(), Y(), cM = U.meta({
		floor: "maintainer",
		control: "never"
	}), lM = {
		set: cM.route({
			method: "POST",
			path: "/secrets",
			summary: "Store a secret",
			description: "Writes one name and value where the agent's references resolve it, without a restart: desired-state/.env once DevOps is active, the sandbox's own secret store before that."
		}).input(Sf).output(q),
		generate: cM.route({
			method: "POST",
			path: "/secrets/generate",
			summary: "Make and store a random secret",
			description: "Makes a random value and stores it under a new name, where `set` would have put it, for a secret nobody has to find or paste (a session key, a signing secret, a password the task sets up itself). Answers the name and its length, never the value. Refused for a name something here already holds."
		}).meta({ agent: !0 }).input(Df).output(Of),
		list: cM.route({
			method: "GET",
			path: "/secrets",
			summary: "Names of the stored secrets",
			description: "Which secrets exist here. Names only, never values."
		}).output(Cf),
		remove: cM.route({
			method: "DELETE",
			path: "/secrets/{key}",
			summary: "Delete a secret",
			description: "Removes one by name."
		}).input(wf).output(q),
		inventory: cM.route({
			method: "GET",
			path: "/secrets/inventory",
			summary: "Every secret this sandbox holds, from everywhere",
			description: "One view across all the places secrets live here: what exists, where it came from and whether it is working. Never any values. This one always answers, even before there is a store to write to."
		}).output(Wf),
		reveal: cM.route({
			method: "POST",
			path: "/secrets/reveal",
			summary: "Show one secret's value",
			description: "The only call that hands a value back, and it is for the owner alone. Sent as a body rather than in the address, so the name never ends up in a log or a browser's history."
		}).meta({ panel: !1 }).input(wf).output(Tf),
		gates: cM.route({
			method: "GET",
			path: "/secrets/gates",
			summary: "Which credentials need somebody's approval",
			description: "What is gated and who may release it. Names and addresses only, never values, and the agent may read it too: knowing a credential needs Bob is what stops it concluding the account is simply not connected."
		}).meta({ agent: !0 }).output(Nf),
		setGate: cM.route({
			method: "PUT",
			path: "/secrets/gates/{subject}",
			summary: "Put a credential behind named approvers",
			description: "Names exactly who may release one secret or one connected account, and how far a single release goes. The owner's call alone. A signed-in browser or a mounted server cannot be released for one use, so those are always for the rest of the conversation."
		}).input(Mf).output(q),
		removeGate: cM.route({
			method: "DELETE",
			path: "/secrets/gates/{subject}",
			summary: "Stop requiring approval for a credential",
			description: "Removes one gate, so the agent can use that credential the way it uses any other. The owner's call alone."
		}).input(Pf).output(q),
		hosts: cM.route({
			method: "GET",
			path: "/secrets/hosts",
			summary: "Which secrets are host-guarded, and where they may go",
			description: "Every secret and connected account whose host guard is set, on or off, and its hosts. With the guard on, a use aimed off the list, or anywhere a command's text does not show, asks a person first, whatever the safety judge says. Names and hosts only, never values."
		}).meta({ agent: !0 }).output(Bf),
		setHosts: cM.route({
			method: "PUT",
			path: "/secrets/hosts/{subject}",
			summary: "Turn a secret's host guard on or off, and set its hosts",
			description: "Replaces one secret's host guard. Anybody who may use secrets can turn it on or take hosts away; turning it off or adding a host is the owner's: from the agent it raises a card for the owner in the live conversation and waits for their answer."
		}).meta({ agent: !0 }).input(Vf).output(Hf),
		request: cM.route({
			method: "POST",
			path: "/secrets/request",
			summary: "Ask a named person to release a credential",
			description: "Raises the release card in the live conversation and waits for one of the people named on it. Refused, rather than held, when there is nobody to ask: an unattended turn, no live conversation, or a click with no verified identity behind it."
		}).meta({ agent: !0 }).input(Ff).output(If)
	};
})), dM, fM, pM, mM = v((() => {
	V(), e_(), dM = M({ id: D().describe("Which past conversation.") }), fM = M({
		id: D().describe("Its id."),
		title: D().describe("What it is called."),
		updatedAt: k().describe("When it last moved, in milliseconds."),
		snippet: Lg.optional().describe("Why a search matched: the line it hit, with a little around it, and who said it. Absent on an unfiltered list, and on a match the title already shows, where repeating it would be noise rather than evidence.")
	}), pM = M({ sessions: j(fM).describe("Past conversations, newest first.") });
})), hM, gM = v((() => {
	W(), V(), lv(), mM(), hM = {
		list: U.route({
			method: "GET",
			path: "/sessions",
			summary: "Past conversations in this workspace",
			description: "Summaries for a history menu, filtered when you pass a search. Covers conversations that worked in their own private copies too, so nothing is hidden just because it happened on a branch."
		}).meta({ control: "editor" }).input(M({
			query: D().optional(),
			caseSensitive: Hu().optional()
		})).output(pM),
		get: U.route({
			method: "GET",
			path: "/sessions/{id}",
			summary: "Read one past conversation",
			description: "The full record of a single conversation, restored for display."
		}).meta({ control: "editor" }).input(dM).output(av)
	};
})), _M, vM, yM, bM, xM, SM = v((() => {
	V(), M({
		at: k().describe("When the turn ended, in milliseconds."),
		day: D().describe("The day it fell in, as YYYY-MM-DD in UTC, worked out once so nothing downstream has to do timezone arithmetic."),
		provider: D().describe("Which model provider served it."),
		account: D().optional().describe("Which account paid. Absent for a turn run on a plain key, which belongs to no account."),
		model: D().optional().describe("The model that actually ran, past whatever was asked for and every default. Absent only when the provider's own default served it without being named."),
		modelRequested: D().optional().describe("The model that was asked for, when one was named. Differs from `model` when something resolved it."),
		harness: D().describe("Which agentic loop it ran on."),
		outcome: I([
			"ok",
			"error",
			"cancelled"
		]).optional().describe("How it ended: finished, failed, or was stopped by the user."),
		errorCode: D().optional().describe("The failure's code, when it had one."),
		errorMessage: D().optional().describe("What the failure said, trimmed."),
		conversationId: D().optional().describe("Which conversation it belonged to, so spending can be traced to a card. Absent only for an internal one-off with no conversation at all."),
		turns: k().describe("The provider's own count for the request, since one exchange can be several under the hood. One when it reported none."),
		inputTokens: k().describe("Uncached input tokens, excluding cache reads and cache writes."),
		outputTokens: k().describe("Tokens received."),
		cacheReadTokens: k().describe("Tokens served from cache, which cost less."),
		cacheCreationTokens: k().describe("Tokens written to cache, which cost more up front and less afterwards."),
		costUsd: k().describe("What it cost, in dollars."),
		costKnown: A().optional().describe("False when the vendor did not report a cost and the recorded zero is a placeholder, not a price. Absent or true means the cost is real."),
		durationMs: k().describe("How long it took, in milliseconds."),
		iqSearchArm: A().optional(),
		iqSearchCohort: D().optional(),
		searchCalls: k().optional(),
		openingSearches: k().optional(),
		openingListings: k().optional(),
		callsBeforeTarget: k().optional(),
		failedCalls: k().optional(),
		mapArm: A().optional(),
		mapChars: k().optional(),
		notesArm: A().optional(),
		notesChars: k().optional(),
		notesCohort: D().optional(),
		guidanceArm: A().optional(),
		guidanceCohort: D().optional(),
		turnContext: I([
			"delivered",
			"ineligible",
			"deadline",
			"indexing",
			"no-hits",
			"failed"
		]).optional(),
		turnContextMs: k().optional(),
		turnIndex: k().optional(),
		verification: I([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).optional(),
		check: D().optional(),
		filesEdited: k().optional(),
		toolCalls: k().optional(),
		checklistTotal: k().optional(),
		checklistOpen: k().optional(),
		compactions: k().optional(),
		contextTokens: k().optional(),
		contextWindow: k().optional(),
		purpose: I(["keep-warm"]).optional().describe("What the row is when it is not a turn: `keep-warm` is a cache refresh sent while the conversation sat idle."),
		openingCacheReadTokens: k().optional().describe("Tokens the turn's first request read from the provider's cache."),
		openingCacheCreationTokens: k().optional().describe("Tokens the turn's first request wrote to the provider's cache."),
		promptFingerprint: D().optional().describe("A short hash over the parts of the prompt a cache is keyed on; a change between two turns names why the second could not reuse the first's cache."),
		autoPicked: A().optional()
	}), _M = M({
		day: D().describe("The day, as YYYY-MM-DD in UTC."),
		provider: D().describe("Which model provider."),
		account: D().optional().describe("Which account. Absent for work run on a plain key."),
		model: D().optional().describe("Which model."),
		harness: D().describe("Which agentic loop."),
		conversationId: D().optional().describe("Which conversation."),
		turns: k().describe("Turns in this group."),
		inputTokens: k().describe("Uncached input tokens, excluding cache reads and cache writes."),
		outputTokens: k().describe("Tokens received."),
		cacheReadTokens: k().describe("Tokens served from cache."),
		cacheCreationTokens: k().describe("Tokens written to cache."),
		costUsd: k().describe("What the group cost, in dollars."),
		costKnown: A().optional().describe("False when the cost includes unpriced turns and is a lower bound rather than the true total."),
		durationMs: k().describe("Time spent, in milliseconds.")
	}), vM = M({
		from: D().optional().describe("First day to include, as YYYY-MM-DD in UTC. Leave it out for everything up to the end day."),
		to: D().optional().describe("Last day to include, as YYYY-MM-DD in UTC, and it is included rather than excluded. Leave it out for everything from the start day onwards.")
	}), yM = M({ rows: j(_M).describe("Spending grouped by day, provider, account, model and conversation. Everything a cost screen shows is a rearrangement of these rows, which is why there is no second call for any of it.") }), bM = M({
		provider: D(),
		account: D(),
		turns: k(),
		inputTokens: k(),
		outputTokens: k(),
		cacheReadTokens: k(),
		cacheCreationTokens: k(),
		costUsd: k()
	}), xM = M({ accounts: j(bM) });
})), CM, wM = v((() => {
	Ym(), W(), iS(), Y(), SM(), CM = {
		get: U.route({
			method: "GET",
			path: "/settings",
			summary: "How this sandbox is configured",
			description: "Every setting that governs how agents behave here, with the defaults filled in for anything nobody has chosen."
		}).meta({ guest: !0 }).output(Rx),
		set: U.route({
			method: "POST",
			path: "/settings",
			summary: "Change the sandbox settings",
			description: "Writes the settings whole, so send the complete object rather than the fields you changed."
		}).input(zx).output(q),
		savings: U.route({
			method: "GET",
			path: "/settings/savings",
			summary: "What the token-saving measures were worth",
			description: "Measured rather than estimated: what each mechanism actually saved over a range of days. The same day range the spending ledger takes, so one calendar filters both."
		}).input(vM).output(Zx),
		builtinPrompt: U.route({
			method: "GET",
			path: "/settings/system-prompt/{base}",
			summary: "Read a built-in system prompt",
			description: "The actual text behind one of the built-in modes, so a settings screen can show the prompt instead of asking anyone to trust a description of it, and so either can be forked into a custom one."
		}).input(px).output(Wx),
		firings: U.route({
			method: "GET",
			path: "/settings/rule-firings",
			summary: "When each rule last did something",
			description: "A separate read rather than a field on the settings, because a rule firing is not somebody editing anything: folding it in would turn every firing into a settings write and put a self-changing value inside the object a screen edits."
		}).output(Tx),
		repoChecks: U.route({
			method: "GET",
			path: "/settings/repo-checks",
			summary: "What each repository asks to run on its own code",
			description: `Every repository that declares its own checks at \`${Qx}\`, what it declares, and whether you have switched it on. A repository declares what to run because the command belongs beside the scripts it names; nothing it declares runs until you say so.`
		}).output(nS),
		fieldNotes: U.route({
			method: "GET",
			path: "/settings/field-notes",
			summary: "The state of this sandbox's field notes",
			description: `Whether \`${qm}\` exists, when it was last rewritten, how much of it the current budget reaches, and whether a monthly rewrite is scheduled.`
		}).output(Xx),
		adoptTimezone: U.route({
			method: "POST",
			path: "/settings/timezone",
			summary: "Offer this sandbox a clock, if it has none",
			description: "Sets which timezone this sandbox's schedules are meant in, but only while it has none set. Already answered, the stored zone wins and comes back unchanged, so any number of browsers can offer theirs without fighting over it. To change a zone that is already set, write the settings."
		}).input(Hx).output(Ux),
		audience: U.route({
			method: "GET",
			path: "/settings/audience",
			summary: "Which words the editor uses for you here",
			description: "Whether your editor speaks git's own words (developer) or plain ones (maker) on this sandbox, in every browser and on every device. Absent until you have chosen here."
		}).meta({ guest: !0 }).output(Lx),
		setAudience: U.route({
			method: "POST",
			path: "/settings/audience",
			summary: "Choose which words the editor uses for you here",
			description: "Sets whether your editor speaks git's own words (developer) or plain ones (maker) on this sandbox, for every browser and device you open it on. Other members keep their own. With `offer` it is taken only while you have none kept, and the kept answer comes back unchanged."
		}).meta({
			guest: !0,
			floor: "viewer"
		}).input(Bx).output(Vx),
		adoptRepoChecks: U.route({
			method: "POST",
			path: "/settings/repo-checks/adopt",
			summary: "Switch a repository's own checks on or off",
			description: "Adopts exactly what that repository declares as it stands now. If the declaration changes afterwards it stops running until you adopt it again, so a command nobody has read cannot inherit the answer given to a different one."
		}).input(rS).output(q)
	};
})), TM, EM = v((() => {
	W(), O_(), Y(), TM = {
		list: U.route({
			method: "GET",
			path: "/share",
			summary: "Conversations published as pages",
			description: "Every conversation that has been turned into a read-only page, with its link. There is no call to read one back: the page itself is the read, and it answers to anyone who has the link."
		}).output(w_),
		create: U.route({
			method: "POST",
			path: "/share",
			summary: "Publish a conversation",
			description: "Renders a conversation into a page anybody with the link can read, without signing in. Answers with the link, so nothing has to be listed again to find it."
		}).input(T_).output(C_),
		update: U.route({
			method: "POST",
			path: "/share/update",
			summary: "Refresh a published page",
			description: "Re-renders an existing page from the conversation as it stands now. Same link, newer contents."
		}).input(E_).output(C_),
		remove: U.route({
			method: "POST",
			path: "/share/remove",
			summary: "Unpublish a conversation",
			description: "Takes the page down, so the link stops answering."
		}).input(D_).output(q)
	};
})), DM, OM = v((() => {
	W(), iS(), Y(), DM = {
		list: U.route({
			method: "GET",
			path: "/skills",
			summary: "What the agent knows how to do",
			description: "Every skill available here and whether it is switched on, joined from all the places they come from: the owner's own, the settings, plugins a connection installed, folders inside extensions, and persona kits."
		}).output(kx),
		read: U.route({
			method: "GET",
			path: "/skills/read",
			summary: "Read one skill",
			description: "The full text of a single skill. The name travels in the query rather than the address, because a name can carry the owner it came from and that will not fit in a path."
		}).input(jx).output(Ax),
		save: U.route({
			method: "POST",
			path: "/skills",
			summary: "Write a skill",
			description: "Creates or rewrites a skill by name. A new one starts switched on, because you wrote it in order to use it; rewriting one you switched off leaves it off. Renaming is saving under the new name and deleting the old."
		}).input(Mx).output(q),
		switch: U.route({
			method: "POST",
			path: "/skills/switch",
			summary: "Switch one of your own skills on or off",
			description: "Off takes the agent's copy away and keeps your text; on writes the copy back from it. Built-in tools are switched in the agent settings instead, and nothing else has a switch."
		}).input(Px).output(q),
		remove: U.route({
			method: "POST",
			path: "/skills/remove",
			summary: "Delete a skill",
			description: "Removes the text and the agent's copy in one step, so a screen never has to sequence two calls and never leaves one half done."
		}).input(Nx).output(q)
	};
})), kM, AM, jM, MM, NM, PM = v((() => {
	V(), kM = M({ distro: D() }), AM = D().regex(/^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/), jM = M({
		machineId: AM.optional(),
		os: D(),
		arch: D(),
		shell: D(),
		home: D(),
		roots: j(D()),
		engine: M({
			memoryBytes: k(),
			cpus: k()
		}).optional(),
		hostname: D().optional(),
		wsl: kM.optional(),
		wslDistros: j(D()).optional(),
		links: M({
			total: k(),
			unreachable: k(),
			unreachableSince: k().optional()
		}).optional(),
		features: j(D()).optional(),
		icOutOfDate: D().optional()
	}), I([
		"reshape-later",
		"set-shape",
		"rollback-to",
		"loopback-catch",
		"background-prepare"
	]), MM = M({
		key: D().min(1),
		machineId: AM.optional(),
		online: A(),
		version: D().optional(),
		lastSeen: k().optional(),
		facts: jM.optional()
	}), NM = M({
		id: D(),
		card: D().optional(),
		platform: D().min(1),
		environments: j(MM).min(1),
		online: A(),
		version: D().optional(),
		lastSeen: k().optional(),
		facts: jM.optional()
	}), M({ hosts: j(NM) });
})), FM, IM, LM, RM, zM, BM = v((() => {
	V(), FM = I([
		"updated",
		"kept",
		"restored",
		"rolled-back"
	]), IM = M({
		result: FM.describe("What happened. Updated: the new version passed its first health check and runs, with the previous one kept ready until keepUntil. Kept: that probation ended and the new version stays. Restored: the new version never came up, so the previous container was put back at once. Rolled back: the new version came up and then failed its probation (it kept crashing, never became ready, or lost its tunnel), so the host went back to the previous one by itself."),
		verb: D().optional().describe("What was asked for: update, rollback, rebuild, dev, reshape, or the probation watch acting on its own."),
		at: k().describe("When it happened, in milliseconds."),
		from: D().optional().describe("The version (or, when it would not say, the image) that ran before."),
		to: D().optional().describe("The version (or image) that was moved onto, or that was tried and given up on."),
		reason: D().optional().describe("Why the host gave up on the new version, in plain words. Absent when nothing went wrong."),
		log: D().optional().describe("Where the host kept the full log of the swap, as a path on the machine that runs the sandbox."),
		keepUntil: k().optional().describe("Until when the previous version stays parked and ready, in milliseconds. While it does, going back takes seconds and nothing is downloaded or rebuilt; after it, going back uses the pinned image.")
	}), LM = M({
		version: D().describe("The withdrawn version, which is the one this sandbox is running."),
		reason: D().optional().describe("Why it was withdrawn, as the people who withdrew it put it.")
	}), RM = M({ version: D().min(1).nullable().describe("The release to stop offering, or null to offer the newest release again. A newer release than the skipped one is always offered.") }), zM = M({
		image: D().describe("The local image a rollback would run, pinned under a tag no other flow writes."),
		version: D().optional().describe("What that image says it is. Absent when it would not say.")
	});
})), VM = v((() => {})), HM, UM, WM, GM, KM, qM, JM, YM, XM, ZM, QM, $M, eN, tN, nN, rN, iN, aN, oN, sN, cN, lN, uN, dN, fN, pN, mN, hN, gN, _N, vN, yN = v((() => {
	V(), PM(), BM(), HM = M({
		memoryGib: Cl().positive().nullable().optional(),
		cpus: Cl().positive().nullable().optional(),
		privileged: A().optional(),
		gpu: A().optional()
	}), UM = M({
		memoryGib: Cl().positive().nullable(),
		cpus: Cl().positive().nullable(),
		privileged: A(),
		gpu: A()
	}), WM = I(["now", "nextRestart"]), GM = M({
		memoryBytes: k().optional(),
		cpus: k().optional(),
		privileged: A(),
		gpu: A(),
		hostRuntime: j(D()),
		overlayRuntime: j(D()),
		shape: UM.optional(),
		desired: UM.optional(),
		saved: HM.optional()
	}), KM = HM.strict().refine((e) => Object.values(e).some((e) => e !== void 0), { message: "a reshape must change at least one thing" }), qM = M({
		slug: D(),
		container: D(),
		name: D().optional(),
		running: A(),
		image: D(),
		tunnelRunning: A().optional(),
		resources: GM.optional(),
		staged: M({
			image: D(),
			version: D().optional(),
			channel: D().optional()
		}).optional(),
		version: D().optional(),
		parked: A().optional(),
		probationUntil: k().optional(),
		lastUpdate: IM.optional(),
		rollbackTargets: j(zM).optional()
	}), JM = I([
		"start",
		"stop",
		"restart",
		"prepare",
		"prepare-background",
		"update",
		"rebuild",
		"rollback",
		"reshape",
		"set-shape",
		"forget-shape",
		"remove",
		"logs",
		"reconnect",
		"create",
		"runner-up",
		"runner-remove"
	]), YM = El({
		op: JM,
		slug: D().min(1),
		hash: D().optional(),
		to: D().min(1).optional(),
		shape: El(UM.shape).optional(),
		when: WM.optional(),
		resources: KM.optional(),
		later: A().optional(),
		parentUrl: D().optional(),
		pair: D().optional().meta({ secret: !0 }),
		setupCode: D().optional().meta({ secret: !0 }),
		platformUrl: D().optional(),
		definition: D().optional(),
		overlay: D().optional(),
		overlayHash: D().optional()
	}), XM = YM.extend({
		id: D().min(1),
		resumeTurns: A().optional()
	}), ZM = P("kind", [
		M({
			kind: L("line"),
			text: D()
		}),
		M({
			kind: L("result"),
			message: D()
		}),
		M({
			kind: L("error"),
			message: D()
		})
	]), QM = I([
		"upgrade",
		"restart",
		"forget-unreachable"
	]), $M = El({ op: QM }), eN = $M.extend({ id: D().min(1) }), tN = I([
		"mirror-off",
		"mirror-on",
		"mirror-ignore",
		"mirror-unignore",
		"sync-pause",
		"sync-resume",
		"sync-unpair",
		"sync-clean",
		"dev-restart",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), tN.exclude([
		"dev-restart",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install",
		"sync-clean"
	]), nN = D().max(200).regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/), rN = D().min(1).max(4096).regex(/^(?:~|\/|[A-Za-z]:[\\/])[^"'`$;|&\n\r]*$/), iN = k().int().min(1).max(65535), aN = M({
		id: D().min(1),
		command: tN,
		sandboxId: nN.optional(),
		mode: I(["sync", "mirror"]).optional(),
		localDir: rN.optional(),
		port: iN.optional()
	}), oN = M({
		ok: A(),
		message: D(),
		output: D().optional(),
		refused: A()
	}), sN = I([
		"created",
		"modified",
		"deleted",
		"untracked"
	]), cN = I(["derived-leftover", "both-edited"]), lN = M({
		path: D(),
		local: sN.optional(),
		sandbox: sN.optional(),
		nature: cN.optional()
	}), uN = M({
		sandboxId: D(),
		mode: I(["sync", "mirror"]),
		localDir: D().optional(),
		remoteDir: D().optional(),
		mirroring: I(["on", "off"]).optional(),
		mutagenStatus: D().optional(),
		conflicts: k().int().nonnegative().optional(),
		conflictedPaths: j(lN).optional(),
		paused: A().optional(),
		backupStatus: D().optional()
	}), dN = I([
		"mirrored",
		"held-by-sandbox",
		"busy",
		"ignored"
	]), dN.exclude(["mirrored"]), fN = M({
		port: iN,
		host: I(["127.0.0.1", "::1"]),
		sandboxId: D(),
		state: dN,
		heldBy: D().optional(),
		command: D().optional()
	}), pN = M({
		running: A(),
		pid: k().int().optional(),
		installed: D().optional(),
		build: D().optional(),
		lastTickAt: k().optional()
	}), mN = M({
		machineId: AM.optional(),
		hostname: D(),
		os: D(),
		wsl: kM.optional(),
		pairings: j(uN),
		ports: j(fN),
		agent: pN,
		capturedAt: k()
	}), hN = I([
		"offline",
		"scope-off",
		"unreported"
	]), gN = M({
		machine: D(),
		mode: I(["sync", "mirror"]),
		seenAt: k().optional(),
		machineId: AM.optional(),
		environment: D().optional()
	}), D().regex(/^(?:ssh-ed25519|ssh-rsa|ecdsa-sha2-nistp(?:256|384|521)|sk-ssh-ed25519@openssh\.com|sk-ecdsa-sha2-nistp256@openssh\.com) [A-Za-z0-9+/]+={0,2}$/), M({
		key: D(),
		machineId: AM.optional(),
		environment: D().min(1).optional()
	}), M({
		ok: L(!0).optional(),
		syncToken: D().optional(),
		mode: I(["sync", "mirror"]).optional(),
		hostKey: D().optional()
	}), _N = M({
		key: D(),
		label: D(),
		sync: gN.optional(),
		hostId: D().optional(),
		card: D().optional(),
		machineId: AM.optional(),
		online: A().optional(),
		platform: D().optional(),
		facts: jM.optional(),
		agentVersion: D().optional(),
		lastSeen: k().optional(),
		report: mN.optional(),
		sandboxes: j(qM).optional(),
		gap: hN.optional()
	}), vN = M({ devices: j(_N) }), M({
		enrolled: A(),
		syncing: A().optional(),
		available: A().optional(),
		machines: j(mN).optional()
	});
})), bN, xN, SN, CN, wN, TN, EN, DN, ON, kN, AN, jN, MN, NN, PN, FN, IN, LN, RN = v((() => {
	V(), bN = [
		"languageServer",
		"searchEngine",
		"agentRuntime",
		"browser",
		"git",
		"translator",
		"extension",
		"terminal",
		"toolchain",
		"localModel",
		"container",
		"other"
	], xN = I(bN), SN = M({
		processes: k().describe("How many processes."),
		rssBytes: k().describe("Their resident memory added up, in bytes. Memory two processes share is counted in each, so this can exceed what they cost together.")
	}), CN = SN.extend({ cpuPercent: k().optional().describe("CPU its processes used over the window, as a percentage of one core, so a conversation busy on four cores reads 400. Counts commands that finished inside the window too. Absent on a first reading, which has nothing earlier to measure from.") }), wN = M({
		cpu: k().describe("Percent of the last ten seconds in which something was waiting for a CPU."),
		memory: k().describe("Percent of the last ten seconds in which something was waiting on memory: reclaim, swap-in, or a refault."),
		io: k().describe("Percent of the last ten seconds in which something was waiting on disk.")
	}), TN = M({
		freeBytes: k().optional().describe("The limit less what is used and what work admitted in the last minute and a half still holds. Absent where nothing measures it."),
		reservedBytes: k().describe("What work admitted in the last minute and a half holds before it shows in `memoryBytes`."),
		personNeedBytes: k().describe("What a person's turn needs free to start without a warning: below it, the sandbox is short."),
		stallPercent: k().describe("Percent of the last ten seconds in which everything in the sandbox waited on memory (pressure `full`)."),
		stallLimitPercent: k().describe("The stall at or past which the sandbox counts as short of memory, whatever `freeBytes` says.")
	}), EN = M({
		cpuPercent: k().optional().describe("CPU the whole sandbox used over the window, as a percentage of all it may use (`cores`). Absent on a first reading."),
		cores: k().describe("How many cores the sandbox may use: its CPU quota, or every core it is allowed to run on when it has none."),
		memoryBytes: k().describe("Memory in use as the daemon admits work by it: resident memory less the file cache the kernel takes back on demand, plus what was pushed to swap."),
		memoryLimitBytes: k().describe("The memory limit work is admitted against: where the kernel starts throttling the container (memory.high), else its hard limit, else the machine's memory."),
		swapBytes: k().optional().describe("Of `memoryBytes`, what was pushed out to swap. Absent where the sandbox cannot see its own memory."),
		memoryRoom: TN.optional().describe("What admission reads off the same reading. Absent from a daemon that predates it."),
		diskBytes: k().optional().describe("Space used on the volume the workspace lives on. Absent when the volume would not say."),
		diskTotalBytes: k().optional().describe("That volume's size. Absent when the volume would not say."),
		loadAverage: kl([
			k(),
			k(),
			k()
		]).describe("The load average over 1, 5 and 15 minutes. It is the machine's, so other sandboxes on it count too."),
		machineCores: k().optional().describe("Cores the machine's load average reads against: every core the sandbox may be scheduled on, before any quota. Absent from a daemon that predates it."),
		processes: k().describe("How many processes are running in the sandbox."),
		pressure: wN.optional().describe("How much work waited on CPU, memory or disk lately. Absent where the kernel does not report it.")
	}), DN = M({
		rssBytes: k().describe("The daemon's own resident memory."),
		heapUsedBytes: k().describe("Of that, JavaScript objects in use."),
		cpuPercent: k().optional().describe("CPU the daemon itself used over the window, as a percentage of one core. Absent on a first reading."),
		eventLoopPercent: k().optional().describe("How much of the window the daemon spent busy rather than waiting. Near 100, every request queues behind whatever it is doing. Absent on a first reading.")
	}), ON = M({
		at: k().describe("When this reading was taken, in milliseconds."),
		windowMs: k().optional().describe("How long the CPU figures were measured over, in milliseconds. Absent on a first reading, and then so is every CPU figure."),
		sandbox: EN.describe("The sandbox as a whole."),
		daemon: DN.describe("The daemon that runs it, which none of the other figures include."),
		sessions: F(D(), CN).describe("What each conversation's processes use, by conversation id: the agent's own process and everything it started. Only conversations with processes running, and only those the caller may see."),
		roles: Al(xN, SN).describe("Every process in the sandbox but the daemon, by what kind of work it is. A kind with nothing running is absent.")
	}), kN = I([
		"none",
		"safe",
		"confirm"
	]), AN = {
		workspace: "none",
		conversations: "none",
		checkouts: "none",
		restorePoints: "none",
		repositories: "none",
		engines: "none",
		indexes: "none",
		extensions: "none",
		docker: "none",
		state: "none",
		other: "none",
		trash: "confirm",
		backups: "confirm",
		exports: "confirm",
		artifacts: "confirm",
		browserCaptures: "confirm",
		browserProfiles: "confirm",
		modelWeights: "confirm",
		logs: "safe",
		scratch: "safe",
		packageStores: "safe",
		buildCaches: "safe"
	}, jN = I(Object.keys(AN)), MN = M({
		path: D().describe("Where it is, as an absolute path inside the sandbox."),
		bytes: k().describe("Its size in bytes.")
	}), NN = M({
		id: jN,
		cleanability: kN.describe("Whether this category can be cleaned from here, and whether cleaning it asks first."),
		bytes: k().describe("Its size in bytes."),
		files: k().describe("How many files it holds."),
		cleanableBytes: k().optional().describe("What cleaning it would free right now: only what is old enough and not in use. Absent where nothing here may be cleaned, and for a package store, whose own tool decides what no project needs."),
		items: j(MN).describe("Its biggest parts, largest first, at most eight.")
	}), PN = M({
		startedAt: k().describe("When the scan began, in milliseconds."),
		finishedAt: k().describe("When it ended, in milliseconds: the moment these sizes describe."),
		outcome: I(["complete", "partial"]).describe("`partial` when the scan hit its time limit first, so every size is at least what it says rather than exactly it."),
		disk: M({
			usedBytes: k().describe("Space used on the volume the workspace lives on."),
			totalBytes: k().describe("That volume's size.")
		}).optional().describe("The volume as a whole. Absent when the volume would not say."),
		categories: j(NN).describe("Every category that holds anything, largest first."),
		unreadable: k().describe("Files and folders the scan could not read, and so did not count.")
	}), FN = M({
		scan: PN.optional().describe("The last scan that finished. Absent until one has, and again after the daemon restarts."),
		scanning: A().describe("Whether a scan is running now.")
	}), IN = M({ category: jN.describe("The category to clean; one whose cleanability is `none` is refused.") }), LN = M({
		category: jN,
		freedBytes: k().describe("Space the removals gave back, in bytes. A file that is still linked elsewhere frees nothing and is not counted."),
		removed: k().describe("How many items were removed."),
		kept: k().describe("How many were left in place: changed too recently, in use by a running program, or no longer this category's."),
		failed: k().describe("How many removals the filesystem refused.")
	});
})), zN, BN, VN, HN = v((() => {
	V(), zN = M({
		document: D().describe("The stored file, workspace-relative, or `<volume>:<path>` for one on another volume; a structural step's id."),
		change: D().describe("What is done to it, in one line."),
		detail: D().optional().describe("What was particular about this one: a conflict's losing value, a retired entry, a mapped value.")
	}), BN = M({
		document: D().describe("The stored file whose conversion would fail, or the structural step that would."),
		detail: D().describe("Why, in the conversion's own words.")
	}), VN = M({
		plan: L(1).describe("The format of this line. A reader refuses any other rather than guessing at its fields."),
		version: D().describe("The release of the image that planned it; 0.0.0 for a development build."),
		engine: k().describe("The conversion count builds before the digest compared. Reported, never decided by."),
		digest: D().describe("What identifies the planning build's conversion set: its episodes resume only under the same one."),
		ok: A().describe("False when a conversion would fail on this sandbox's files, which refuses the update before anything is touched."),
		downgrade: A().describe("A newer release than the planning build ran here: it opens what it cannot read read-only."),
		failures: j(BN).describe("Each conversion or step that would fail, and why."),
		steps: j(zN).describe("What the first boot changes on disk: documents moved, structural steps run."),
		converts: j(zN).optional().describe("What the build's conversions change as its stores read these files, written by each store's next save. Absent from a build before it."),
		files: j(D()).describe("Every file the first boot writes, workspace-relative where it can be.")
	}), M({
		journal: I([
			"open",
			"none",
			"failed"
		]).describe("Open from the start of a boot that changed stored files until that boot has converged. Failed when a conversion threw partway: the files were put back as they were, and a host takes that as the update not having taken."),
		engine: k().describe("The running build's conversion count.")
	});
})), UN, WN, GN, KN, qN, JN, YN, XN, ZN, QN, $N, eP, tP, nP = v((() => {
	V(), HN(), BM(), UN = M({
		state: I([
			"ready",
			"unavailable",
			"unknown"
		]).describe("Whether this runtime can serve a turn. Unknown is a real answer rather than a soft no: a check that could not run must not grey out a provider you can in fact use."),
		detail: D().optional().describe("Why it cannot, and what to do about it. Absent when it can."),
		checkedAt: k().describe("When it was last checked, in milliseconds.")
	}), WN = M({
		version: D().optional().describe("What the downloaded build says it is. Absent means ready but unnamed, never that nothing is ready."),
		channel: D().describe("Which channel it was taken from. Not necessarily the one this sandbox follows: downloading a beta build is not the same as moving onto beta."),
		at: k().describe("When the download finished, in milliseconds, which answers whether this is still the update being offered."),
		plan: VN.partial().extend({ ok: VN.shape.ok }).optional().describe("What the downloaded build's first boot would convert in this sandbox's stored files. Absent when no plan could be had, which says nothing either way.")
	}), GN = M({
		channel: D().describe("Which channel it is being taken from."),
		startedAt: k().describe("When the download began, in milliseconds."),
		at: k().describe("When the machine last said it is still working on it, in milliseconds."),
		phase: D().describe("What it is doing: download (pulling the new image), build (building this sandbox's environment on it), or check (checking this sandbox's stored files against it)."),
		percent: k().min(0).max(100).optional().describe("How far through the download it is, from 0 to 100. Absent for a step with no measure of its own.")
	}), KN = M({
		name: D().optional().describe("What this sandbox is called."),
		image: D().optional().describe("The image it is running."),
		version: D().optional().describe("The version of that image."),
		latest: D().optional().describe("The newest published version on its channel."),
		updateAvailable: A().optional().describe("Whether those two differ."),
		runtimes: F(D(), UN).optional().describe("Which agent runtimes can serve a turn right now, keyed by runtime. Absent until the first check has run, which reads the same as every entry being unknown."),
		channel: D().optional().describe("Which release channel this sandbox follows."),
		previousImage: D().optional().describe("The image the last update replaced, which is what a rollback would return to. Absent means there is nothing to go back to."),
		updateNotes: j(D()).optional().describe("What is in the update, in the words of the people it is for, newest first. Absent or empty whenever there is nothing worth saying, which reads on screen exactly as it did before there were notes at all."),
		moreUpdateNotes: k().optional().describe("How many further notes there are beyond the ones sent, for a sandbox left alone a long time. Absent or zero means you have all of them."),
		breakingNotes: j(D()).optional().describe("What the update takes away, uncapped, because a warning that fell off a shortened list is a breaking update taken unwarned. Absent for the overwhelming majority, which break nothing."),
		staged: WN.optional().describe("An update already downloaded and built on the machine running this container, waiting only for the restart that applies it. That restart is seconds, where an unprepared update is minutes, which is a different decision entirely. Absent when nothing is waiting."),
		preparing: GN.optional().describe("A download of the next update running on the machine right now, and how far it has got. Absent when nothing is downloading, or when the machine stopped saying it is."),
		lastUpdate: IM.optional().describe("What the machine running this sandbox last did about its version: an update that took, one it gave up on and why, and until when the previous version stays ready. Absent when that machine has never said."),
		withdrawn: LM.optional().describe("Set when the version this sandbox runs was withdrawn after it shipped, which is the moment to go back to the one before it. Absent for every version still standing."),
		skippedVersion: D().optional().describe("A release the owner chose to skip. While it is the newest, no update is offered; a newer one is. Absent when nothing is skipped.")
	}), qN = M({
		kind: I([
			"unreadable",
			"unknownKey",
			"invalidEntry"
		]).describe("What to do about it. Unreadable means the whole file is being ignored and everything in it is at its default. An unknown key means only that key is ignored. An invalid entry means one item of a list was skipped and the rest is fine."),
		reason: I([
			"io",
			"not-json",
			"conversion-failed",
			"rejected"
		]).optional().describe("Why it could not be read: the file could not be opened (io), it is not JSON, a conversion to this version's shape failed, or its contents are not what this version expects (rejected). A rejected file after a newer version ran is usually that version's, not a broken one."),
		detail: D().describe("What exactly was wrong, as one sentence and nothing else. Never the remedy: that is `fix`."),
		suggestion: D().optional().describe("The name it was probably meant to be, when one is close enough to guess honestly."),
		fix: D().optional().describe("What to do about it, when that is something other than 'correct the file'. Absent whenever the file itself is the thing to edit.")
	}), JN = M({
		path: D().describe("The file, as a workspace path, or as its absolute path on the daemon's own history volume for one kept there (the conversation registry). The file is the unit somebody fixes, which is why problems are grouped by it."),
		problems: j(qN).describe("Everything currently wrong with it. A file with nothing wrong is absent rather than present and empty.")
	}), YN = j(JN), XN = M({
		path: D().describe("The file to repair, as the workspace path the problem was reported under. Only the handful of manifests a person hand-edits can be named; anything else is refused."),
		key: D().describe("The stray top-level key, exactly as it was reported. Absent from the file already means there is nothing to do."),
		to: D().optional().describe("Rename the key to this instead of removing it, carrying its value across. Absent means remove it. Naming a key that is already in the file is refused rather than silently overwriting what is there.")
	}), ZN = M({
		token: D().describe("The credential every other call carries. Present it as a bearer token."),
		expiresAt: k().describe("When it stops working, in milliseconds, so a caller can renew ahead of it without reading the token."),
		email: D().describe("Who the sandbox verified you as.")
	}), I([
		"google",
		"ticket",
		"passkey",
		"recovery"
	]), QN = M({
		id: D().describe("The credential id the authenticator chose, base64url."),
		email: D().describe("Whose passkey this is; the owner's list carries every member's, a member's only their own."),
		label: D().describe("The name given at registration, or the daemon's default."),
		rpId: D().describe("The editor host this passkey is bound to; a passkey answers only from that origin."),
		createdAt: k().describe("Epoch ms of registration."),
		lastUsedAt: k().optional().describe("Epoch ms of the last sign-in it answered; absent means never."),
		backedUp: A().describe("Whether the authenticator syncs this passkey (a phone's keychain) or holds the only copy (a hardware key).")
	}), M({
		passkeys: j(QN),
		required: A().describe("Whether a passkey is the only proof that opens this sandbox; owner-set."),
		recovery: M({ remaining: k() }).optional().describe("Owner only, while required: how many one-time recovery codes are still unspent.")
	}), M({ required: A() }), M({ codes: j(D()) }), M({ code: D().min(1) }), M({
		error: D(),
		requires: L("passkey"),
		enrolled: A()
	}), $N = D().regex(/^[A-Za-z0-9_-]+$/, "base64url"), eP = M({
		id: $N,
		rawId: $N,
		type: L("public-key"),
		response: M({
			clientDataJSON: $N,
			attestationObject: $N,
			transports: j(D()).optional()
		}),
		authenticatorAttachment: D().optional(),
		clientExtensionResults: F(D(), wl()).optional()
	}), tP = M({
		id: $N,
		rawId: $N,
		type: L("public-key"),
		response: M({
			clientDataJSON: $N,
			authenticatorData: $N,
			signature: $N,
			userHandle: $N.optional()
		}),
		authenticatorAttachment: D().optional(),
		clientExtensionResults: F(D(), wl()).optional()
	}), M({
		response: eP,
		label: D().optional()
	}), M({ response: tP });
})), $, rP, iP = v((() => {
	W(), _d(), V(), WC(), yN(), UA(), RN(), Y(), nP(), BM(), x_(), SM(), $ = U.meta({ control: "never" }), rP = {
		info: U.route({
			method: "GET",
			path: "/info",
			summary: "What this sandbox is",
			description: "The sandbox's own identity and state: which workspace it holds, which image it runs, what it is called, and the list of calls it actually implements. Start here, because a browser is routinely newer than the sandbox it is talking to and this is how it finds out what is there."
		}).meta({ guest: !0 }).output(KN),
		skipUpdate: $.route({
			method: "POST",
			path: "/system/update/skip",
			summary: "Stop offering one release",
			description: "Stops offering the named release as an update, typically one this sandbox already tried and went back from. A newer release is offered as usual. Null offers the newest release again."
		}).meta({ floor: "maintainer" }).input(RM).output(q),
		manifestProblems: $.route({
			method: "GET",
			path: "/system/manifest-problems",
			summary: "Settings files the sandbox could not read",
			description: "Anything the daemon tripped over in its own configuration on disk: a file it had to fall back from, a key it did not recognise, an entry it skipped. Separate from the identity call because it goes stale for a different reason, namely a file changing."
		}).output(YN),
		repairManifest: $.route({
			method: "POST",
			path: "/system/manifest-problems/repair",
			summary: "Take a stray setting out of a file",
			description: "Removes a key the sandbox does not recognise from one of its settings files, or renames it to the one it was probably meant to be, keeping the value. Only the files a person hand-edits can be named, and only a key — never a value — so this can only ever remove something already being ignored. Renaming onto a key the file already has is refused instead of overwriting it."
		}).input(XN).output(q),
		session: $.route({
			method: "POST",
			path: "/system/session",
			summary: "Trade a sign-in for a session",
			description: "Exchanges a verified sign-in, or a session that has not expired yet, for a fresh session the daemon minted. That session is the credential every other call carries, and calling this again with a live one renews it."
		}).meta({
			beforeBoot: !0,
			floor: "viewer",
			guest: !0
		}).output(ZN),
		events: U.route({
			method: "GET",
			path: "/events",
			summary: "The live event stream",
			description: "A stream held open for as long as you want it, carrying heartbeats so a caller notices the sandbox dying at once, batches of file changes so a tree or an editor can refresh itself, and the roster of who else is looking. Give it an id for this connection to appear in that roster; leave it out and you watch without being seen."
		}).meta({
			beforeBoot: !0,
			stream: !0,
			guest: !0
		}).input(M({ clientId: D().optional() })).output(H(UC)),
		presence: $.route({
			method: "POST",
			path: "/system/presence",
			summary: "Say what you are looking at",
			description: "Reports which view, conversation or file this connection is on, or that it has gone idle. The daemon fans it back out on the event stream so everyone else's roster updates."
		}).meta({
			beforeBoot: !0,
			floor: "viewer",
			guest: !0
		}).input(HA).output(q),
		usage: $.route({
			method: "GET",
			path: "/system/usage",
			summary: "What has been spent",
			description: "Token and cost totals per account, added up from the record of every finished turn."
		}).meta({ floor: "maintainer" }).output(xM),
		metrics: $.route({
			method: "GET",
			path: "/system/metrics",
			summary: "What the sandbox is using right now",
			description: "CPU and memory for the sandbox as a whole, for the daemon that runs it, for each kind of process, and for each conversation's own processes. Measured when you ask and never in between, so CPU is the use since the previous reading: the first reading after a quiet spell has memory and no CPU, and the next one a few seconds later has both."
		}).output(ON),
		storage: $.route({
			method: "GET",
			path: "/system/storage",
			summary: "What is filling the disk",
			description: "The last measurement of the sandbox's disk, by what the space is for: conversations, checkouts, restore points, caches, logs, the trash and the rest, each with its biggest parts and whether it can be cleaned from here. Reading it measures nothing; ask for a scan to measure again."
		}).meta({ floor: "maintainer" }).output(FN),
		scanStorage: $.route({
			method: "POST",
			path: "/system/storage/scan",
			summary: "Measure what is filling the disk",
			description: "Walks the sandbox's volumes and answers with the new measurement once it is done. A scan already running is joined rather than doubled. It stops at a time limit and says so, since a size it could not finish is still worth reading. A cancelled scan answers with the previous measurement."
		}).output(FN),
		cancelStorageScan: $.route({
			method: "DELETE",
			path: "/system/storage/scan",
			summary: "Stop measuring the disk",
			description: "Stops a running scan. Whoever was waiting on it gets the previous measurement back; nothing is lost but the time."
		}).output(q),
		cleanStorage: $.route({
			method: "POST",
			path: "/system/storage/clean",
			summary: "Free the space one category holds",
			description: "Removes what one cleanable category holds, and says how much space that gave back. Only what is old enough and not in use goes: today's logs, a browser that is open, the weights a running model reads and a pack still being written all stay. Nothing outside the sandbox's own volumes, and nothing a category may not hold, is ever removed. Categories that cannot be cleaned are refused."
		}).input(IN).output(LN),
		terminals: $.route({
			method: "GET",
			path: "/system/terminals",
			summary: "Open terminals",
			description: "The terminal sessions this sandbox is holding, which is what a terminal panel rebuilds its tabs from after a reload. The live typing and output run over a separate socket; this is the list."
		}).meta({ beforeBoot: !0 }).output(c_),
		killTerminal: $.route({
			method: "DELETE",
			path: "/system/terminals/{name}",
			summary: "Close a terminal",
			description: "Destroys one terminal session and whatever was running inside it."
		}).input(l_).output(q),
		terminalScrollback: $.route({
			method: "GET",
			path: "/system/terminals/{name}/scrollback",
			summary: "A terminal's history as plain text",
			description: "What has scrolled past in one terminal, as text you can select and copy. The live view is a picture of a screen on the far side of a socket, with nothing in the page to select, so scrolling back and copying is this call rather than a gesture."
		}).input(u_).output(d_),
		browsers: $.route({
			method: "GET",
			path: "/system/browsers",
			summary: "Browsers the agent has open",
			description: "Every browser a conversation currently has running and the pages inside each one. The picture of what they are showing comes over a separate socket; this is the roster."
		}).output(m_),
		closeBrowser: $.route({
			method: "DELETE",
			path: "/system/browsers/{name}",
			summary: "Shut a browser down",
			description: "Closes one of the agent's browsers. Its next attempt to use that browser then fails as though it had crashed, which is the honest account of somebody pulling the plug."
		}).input(h_).output(q),
		subagents: $.route({
			method: "GET",
			path: "/system/subagents",
			summary: "Subagents the agents have started",
			description: "Every subagent that conversations the caller can see have delegated work to, whichever tool started it, with what each one is doing: all that are still working, and the most recent that have settled."
		}).output(b_),
		devices: $.route({
			method: "GET",
			path: "/system/devices",
			summary: "The machines you have connected",
			description: "Every computer this sandbox can see, whether it reached it through desktop sync or through a connected device, in one row per machine: what it says about itself, which sandboxes it holds, and what stopped it answering when nothing came back."
		}).output(vN),
		manageDeviceSandbox: $.route({
			method: "POST",
			path: "/system/devices/{id}/sandboxes/{slug}",
			summary: "Drive a sandbox on one of your own devices",
			description: "Start, stop, restart, update, rebuild, roll back, reshape (its memory and CPU caps, privileged, GPU) or remove a sandbox running on a machine you own, relayed over the connection that machine holds open. The answer is a stream because the slowest of these takes minutes, and it is the same stream whichever you ask for. The daemon adds no opinion: the machine enforces its own permissions and a refusal arrives as the last line, in the machine's words, naming the switch to flip."
		}).input(XM).output(H(ZM)),
		runDeviceCommand: $.route({
			method: "POST",
			path: "/system/devices/{id}/commands/{command}",
			summary: "Run one of your device's own CLI actions",
			description: "Performs a named action on a machine you own by running its own intentic-machine command there — turning that device's port mirroring off, say — over the connection it holds open. The set of actions is fixed and the command line is built here from the name, never sent by the caller. The machine enforces its own permissions and a refusal comes back as its own sentence, naming the switch to flip."
		}).input(aN).output(oN),
		runDeviceAgentFlow: $.route({
			method: "POST",
			path: "/system/devices/{id}/agent/{op}",
			summary: "Update, restart, or clean up the links of the agent on one of your own devices",
			description: "Updates a machine you own to the current intentic-machine agent, restarts the loop it is running, or drops the links it holds to sandboxes that have stopped answering — over the connection that machine holds open. The answer is a stream of the run's own output — and it normally stops mid-run, because the agent's loop is what carries this connection: the work is detached from it first, so it finishes regardless, and the device's reported version is what confirms it. Takes the machine's \"Run commands\" permission, the same one a command typed there would."
		}).input(eN).output(H(ZM))
	};
})), aP, oP = v((() => {
	W(), V(), $p(), Em(), am(), Y(), aP = {
		accounts: U.route({
			method: "GET",
			path: "/translator/accounts",
			summary: "Subscriptions connected through the translator",
			description: "What is signed in per provider. Each provider can hold several accounts at once, and the translator spreads work across them."
		}).output(zp),
		connect: U.route({
			method: "POST",
			path: "/translator/{provider}/connect",
			summary: "Start connecting a subscription",
			description: "Begins the sign-in for one provider and says which of the two shapes it is: a code you type into a device page, which finishes by itself in the background, or a redirect whose landing address you hand back afterwards."
		}).input(M({ provider: im })).output(ym),
		status: U.route({
			method: "GET",
			path: "/translator/{provider}/connect",
			summary: "Read a subscription connection attempt",
			description: "Reports whether this exact sign-in attempt is waiting, completed, or failed. Completion is tied to the attempt rather than a change in account count, because signing in to an existing account replaces its credential in place."
		}).input(M({
			provider: im,
			state: D().min(1)
		})).output(bm),
		complete: U.route({
			method: "POST",
			path: "/translator/{provider}/complete",
			summary: "Finish a redirect sign-in",
			description: "For the providers that redirect somewhere this sandbox cannot receive: hand back the address you landed on and the connection completes."
		}).input(xm).output(q),
		disconnect: U.route({
			method: "POST",
			path: "/translator/{provider}/disconnect",
			summary: "Disconnect one subscription",
			description: "Clears a single account by name. Any others under the same provider stay connected."
		}).input(M({
			provider: im,
			name: D().min(1)
		})).output(q)
	};
})), sP, cP, lP, uP = v((() => {
	W(), V(), $p(), SM(), sP = M({ force: A().default(!1).describe("Measure again even if a reading was taken a moment ago.") }), cP = M({
		ok: L(!0),
		held: j(M({
			provider: D().describe("Which provider is holding the read off."),
			account: D().describe("The account as its provider's list names it: an account id, or a routed auth file's name."),
			resumesAt: k().describe("Unix seconds: when this account may be read again, the provider's own retry-after.")
		})).describe("Accounts whose plan limits could not be read now because the provider is rate-limiting them.")
	}), lP = {
		rollup: U.route({
			method: "GET",
			path: "/usage/rollup",
			summary: "What was spent, grouped",
			description: "The spending record over a range of days, grouped by day, provider, account and model. Everything a cost screen shows is a rearrangement of this one answer, so nothing needs a second call. Read-only: rows are written by the sandbox as turns end, which is what makes it worth trusting."
		}).input(vM).output(yM),
		refreshPlanLimits: U.route({
			method: "POST",
			path: "/usage/plan-limits/refresh",
			summary: "Measure every account's plan limits again",
			description: "Reads how full each connected account's plan limits are, for every provider, and records it. Forced, it measures even accounts read a moment ago, which is the right thing when a plan was just changed and the question is whether the number on screen is still true. Answers with the accounts it could not read because the provider is rate-limiting them, and when each may be asked again: those keep the reading they already had, so a number that does not move is explained rather than silent."
		}).input(sP).output(cP),
		limitReset: U.route({
			method: "GET",
			path: "/usage/limit-reset/{account}",
			summary: "Whether this account's session window can be reopened now",
			description: "Asks the provider whether it will reopen this account's spent session window immediately, which some plans grant once a week. Only worth asking about an account that has actually been refused: the answer is the provider's judgement at this moment, it is not cached, and an account with no such grant answers plainly that it has none."
		}).input(M({ account: D().min(1).describe("Which account.") })).output(Pp),
		claimLimitReset: U.route({
			method: "POST",
			path: "/usage/limit-reset/{account}/claim",
			summary: "Reopen this account's session window now",
			description: "Spends one of the account's weekly resets to reopen its session window immediately. The weekly allowance is untouched and still binds. Answers with what the provider actually did: only `reset` changed anything, and it is the cue to send the refused turn again."
		}).input(M({ account: D().min(1).describe("Which account.") })).output(Fp)
	};
})), dP, fP, pP, mP, hP, gP = v((() => {
	V(), ld(), dP = M({
		runner: D().min(1),
		name: D().min(1),
		ready: A(),
		why: D().optional()
	}), fP = od.extend({ runner: D().min(1) }), pP = N([...sd.options, M({
		kind: L("refused"),
		why: D()
	})]), mP = M({
		runId: D(),
		runner: D(),
		name: D(),
		label: D(),
		command: D(),
		startedAt: k(),
		endedAt: k().optional(),
		code: k().int().optional(),
		failure: D().optional()
	}), hP = M({
		id: D().min(1),
		pattern: D()
	});
})), _P, vP, yP = v((() => {
	V(), W(), _d(), gP(), Y(), _P = U.meta({
		agent: !0,
		control: "never"
	}), vP = {
		target: _P.route({
			method: "GET",
			path: "/offload/runners/{runner}",
			summary: "Whether a runner can take a heavy command",
			description: "Answers whether the runner a kind of heavy work is sent to is connected and able to run it, before anything is copied to it. When it is not, the command runs in this sandbox and says why."
		}).input(M({ runner: D().min(1) })).output(dP),
		run: _P.route({
			method: "POST",
			path: "/offload/runs",
			summary: "Run a heavy command on a runner",
			description: "Hands one command to a runner on one of your machines, together with a snapshot of the code as it stands, and streams its output back as it comes. It ends with the exit code, every file the command changed and any report it wrote."
		}).meta({ stream: !0 }).input(fP).output(H(pP)),
		cancel: _P.route({
			method: "POST",
			path: "/offload/runs/{runId}/cancel",
			summary: "Stop an offloaded command",
			description: "Stops a command running on a runner, with everything it started there."
		}).input(M({ runId: D().min(1) })).output(q),
		kinds: U.route({
			method: "GET",
			path: "/offload/kinds",
			summary: "Kinds of heavy work that can run elsewhere",
			description: "The kinds this sandbox sorts heavy commands into (tests, typechecks, verify…), each of which can be sent to a runner on one of your machines instead of running here."
		}).output(M({ kinds: j(hP) })),
		runs: U.route({
			method: "GET",
			path: "/offload/runs",
			summary: "Recent offloaded commands",
			description: "The heavy commands this sandbox sent to runners lately, newest first, with where they ran and how they ended."
		}).output(M({ runs: j(mP) }))
	};
})), bP, xP, SP = v((() => {
	W(), _d(), WC(), Y(), Pw(), bP = U.meta({
		agent: !0,
		control: "never"
	}), xP = {
		list: bP.route({
			method: "GET",
			path: "/vpn",
			summary: "Configured tunnels and which are up",
			description: "Every stored VPN with its live link state, read back from the operating system rather than from memory, so a tunnel dropped from a shell and one dropped from a screen look the same here."
		}).output(Ow),
		connect: bP.route({
			method: "POST",
			path: "/vpn/{id}/connect",
			summary: "Dial a VPN",
			description: "Brings a stored tunnel up, streaming the client's progress as it authenticates and then sets up routing. Streamed because a dial takes seconds and can fail with something you have to read: a wrong password, a gateway certificate nobody trusts, a code it wants. Connecting one that is already up simply says so."
		}).input(kw).output(H(EC)),
		disconnect: bP.route({
			method: "POST",
			path: "/vpn/{id}/disconnect",
			summary: "Drop a tunnel",
			description: "Takes the tunnel down. One that was already down is fine: the promise is that it is not up afterwards."
		}).input(Aw).output(q),
		importForticlient: bP.route({
			method: "POST",
			path: "/vpn/import-forticlient",
			summary: "Read connections out of an exported config",
			description: "Turns an exported FortiClient configuration into a list of connections you can add, so somebody holding that file picks from a list instead of retyping a host and port for every tunnel."
		}).input(jw).output(Nw)
	};
})), CP, wP, TP, EP, DP, OP, kP, AP, jP, MP, NP, PP, FP, IP, LP, RP, zP, BP, VP, HP, UP = v((() => {
	V(), K(), Vd(), gh(), CP = D().min(1).max(24).regex(/^[a-z0-9][a-z0-9-]*$/), wP = I(["fresh", "continue"]), TP = 24, EP = M({
		id: CP.describe("This step's own name, which other steps use to say they wait on it."),
		title: D().min(1).max(60).describe("What to call it on screen. Short: the instruction below is where the detail goes."),
		goal: D().min(1).optional().describe("What done means for this step, in your words. It is what the step is judged against, and a different sentence from what it is told to do."),
		prompt: D().min(1).optional().describe("What the step is told to do. The goal is the suite passes; this is run the tests, take the top failure, fix it. Leaving it out hands over the run's own request untouched, which is right for a step whose whole job is do what was asked."),
		needs: j(CP).describe("Which steps must finish first. Empty means it starts when the run does. Naming a step that does not exist, or a loop between steps, is refused when the workflow is saved."),
		handoff: wP.describe("How it meets what came before: a fresh conversation handed the previous step's result, or the same conversation carried on."),
		output: nh.describe("What it has to produce for the step to count."),
		checks: j(rh).describe("What has to pass before it counts as done."),
		context: th.describe("How the step's own repeats meet each other. A long-running step wants to start clean each round; a short polish-this step wants to carry on."),
		maxSpendUsd: k().positive().optional().describe("A ceiling on what this step may spend. The one resource that cannot be recovered after an unattended fan-out, which is why it is here and iteration limits are not. Absent is uncapped."),
		agent: Hd.optional().describe("Which provider runs it."),
		harness: Wd.optional().describe("Which agentic loop runs it."),
		account: D().optional().describe("Which account pays for it."),
		model: D().optional().describe("Which model runs it."),
		actsAs: G.optional().describe("Which persona it acts as. Unpinned, a step gets the strict unwatched default: every tool, and no signed-in accounts at all. Pinning one is how a release check gets a voice, a folder to work in, or the single account it may post from.")
	}), DP = M({
		step: CP.describe("Which step's answer carries the decision. Usually a last step that weighs up the ones before it, though nothing requires that."),
		field: D().min(1).describe("Which of that step's declared answers to read. A declared field is the one part of a step's answer that was checked rather than fished out of prose, which is the whole rule here. Checked when the workflow is saved."),
		pass: j(D().min(1)).min(1).describe("Which values mean ship it. Everything else fails. A list of what passes rather than what fails, because a step answering mostly-pass or pass-with-notes must not ship, and this gets that right without anybody having had to enumerate the ways a model can hedge."),
		dailyMax: k().int().positive().optional().describe("How many runs a day, across every caller. A gate is a paid door with nobody in the loop: one wired into a push-triggered pipeline is a fan-out of conversations per commit. Absent is a small default rather than unlimited.")
	}), OP = I([
		"pass",
		"fail",
		"blocked"
	]), M({
		outcome: OP.describe("Ship it, do not, or we could not tell. That third answer exists because could not reach a judgement is not the product is broken: a gate that reported its own outages as failures is one a team switches off, so it should be the honest answer far more often than the convenient one, and it means a neutral build rather than a failed one."),
		reason: D().describe("Why, in one line. Realistically the only part of this a build log will ever show."),
		runId: D().describe("The run behind the verdict, so somebody can go and read it."),
		value: D().optional().describe("What the step actually answered. Absent when there was nothing to read, which is most of the could-not-tell cases.")
	}), kP = M({
		id: G.describe("The workflow's id."),
		name: D().min(1).max(80).describe("What to call it."),
		description: D().max(400).optional().describe("What it is for."),
		steps: j(EP).min(1).max(TP).describe("The steps, each with what it waits on. Every one runs in its own private copy of the repos, always, because parallel steps sharing a tree collide."),
		gate: DP.optional().describe("Present means a machine can run this design and get a ship-it answer back. Absent means an ordinary workflow, started by a person, with no outside door onto it at all."),
		maxParallel: k().int().min(1).max(8).describe("How many steps may run at once. Bounded, because a fan-out of twelve is twelve model sessions, twelve working copies and twelve times the burn rate, on one machine.")
	}), AP = I([
		"pending",
		"running",
		"done",
		"failed",
		"skipped",
		"stopped"
	]), jP = M({
		stepId: CP.describe("Which step this is."),
		state: AP.describe("How it went. Skipped carries what the others cannot: it never ran, because something it was waiting on did not finish. That is why a failed run shows one failed step and a trail of skipped ones."),
		conversationId: D().describe("The conversation it ran on, and the way from a node on the graph to a real record. Shared with the step before it when they were chained, which is what makes those two one card."),
		startedAt: k().optional().describe("When it began, in milliseconds."),
		endedAt: k().optional().describe("When it ended, in milliseconds."),
		iterations: k().int().min(0).describe("How many rounds it took."),
		costUsd: k().optional().describe("What it cost, in dollars."),
		loopState: ch.optional().describe("How its repeating ended. Out of rounds and stuck both come out as a failed step, and the difference between them is the difference between give it more room and more room will not help."),
		detail: D().optional().describe("What went wrong, when something did."),
		document: ih.optional().describe("What it produced, once it has produced something that passes its own declared shape. This is what the steps after it are handed."),
		report: D().optional().describe("The start of its closing words. Bounded, so a long answer is not silently cut down to its last few thousand characters and the record stays a sensible size."),
		reportPath: D().optional().describe("Where the whole answer is, as a workspace path. Every step can read it, so a long handoff need not be copied into anybody's prompt.")
	}), MP = I([
		"running",
		"done",
		"failed",
		"stopped",
		"overspent",
		"error"
	]), NP = M({
		runId: D().min(1).describe("This run's id."),
		workflow: kP.describe("The design as it stood when the run started, copied rather than looked up. The run has to keep showing the graph it actually ran, not the one edited twice since, and a run of a deleted workflow has to stay readable."),
		repos: j(Gd).min(1).max(50).describe("The workspace as this run began, one exact commit per repository. Every step branches from these, even if the shared tree moves while a wide fan-out is still opening its copies, so the steps can be compared with each other afterwards."),
		request: D().optional().describe("What this run was asked to do, handed to every step on top of its own instructions. It is what makes one saved design worth keeping: two models, one task is a shape, and the task is different every time. Absent for a run started with nowhere to type one."),
		state: MP.describe("How the run is going. Finished means every step that ran got there; a run with skipped steps counts as failed, because a graph that never reached its end did not do what it was asked whatever the survivors managed."),
		startedAt: k().describe("When it began, in milliseconds."),
		endedAt: k().optional().describe("When it ended, in milliseconds."),
		resumed: k().int().min(0).describe("How many times the sandbox restarted under it and picked it back up."),
		detail: D().optional().describe("What went wrong, when something did."),
		steps: j(jP).describe("One entry per step, in the design's own order. Every one is written down as waiting when the run starts, so the picture is complete from the first frame and a missing step never has to mean two things."),
		archivedAt: k().optional().describe("When it was put away, in milliseconds. The record stays readable and every step's branch, transcript and counters are untouched. Its conversations are put away with it, and brought back with it. Absent means live on the board.")
	}), PP = D().optional().describe("What a pipeline presents at /workflows/{id}/gate, when the design declares a gate. Shown to a maintainer or the owner only."), FP = kP.extend({ gateToken: PP }), IP = kP.extend({
		runs: j(NP).describe("Its runs, newest first."),
		gateToken: PP
	}), LP = M({ workflows: j(IP).describe("Every saved design with its own run history.") }), RP = M({ runs: j(NP).describe("Every run across every workflow, newest first, including runs of workflows since deleted.") }), zP = M({ id: D().describe("Which workflow.") }), BP = M({ runId: D().describe("Which run.") }), VP = zP.extend({ request: D().min(1).max(2e4).optional().describe("What to point it at. Optional, because a design whose steps already say what they want is complete on its own; only one written as a shape needs today's sentence.") }), HP = M({
		workflow: kP.describe("The design to write."),
		create: A().describe("Whether you mean to make a new one or replace an existing one. Said outright rather than inferred, so an id that happens to collide is a refusal instead of one saved design quietly overwriting another.")
	});
})), WP, GP = v((() => {
	W(), Y(), UP(), WP = {
		list: U.route({
			method: "GET",
			path: "/workflows",
			summary: "Saved workflows and their runs",
			description: "Every workflow somebody has designed, each with its own run history, newest first. One answer rather than two, because a workflow that has never been run is the interesting case rather than a mistake."
		}).output(LP),
		save: U.route({
			method: "POST",
			path: "/workflows",
			summary: "Create or replace a workflow",
			description: "Writes a workflow design. Say which of the two you mean, so an id that happens to collide cannot silently overwrite somebody's work. A design that could never run is refused, in the same words the editor shows while you type: a loop in the steps, a step waiting on one that is not there, a step with no way of knowing it is finished."
		}).input(HP).output(FP),
		rotateGateToken: U.route({
			method: "POST",
			path: "/workflows/{id}/gate/rotate",
			summary: "Rotate a release gate's token",
			description: "Mints a new credential for the workflow's release gate and retires the old one at once. Every pipeline wired to the gate has to be handed the new URL. Refused for a workflow that declares no gate."
		}).input(zP).output(Om),
		remove: U.route({
			method: "DELETE",
			path: "/workflows/{id}",
			summary: "Delete a workflow",
			description: "Removes the design. A run of it that is already going keeps going and stays readable and stoppable, because a run takes its own copy of the design when it starts."
		}).input(zP).output(q),
		run: U.route({
			method: "POST",
			path: "/workflows/{id}/run",
			summary: "Start a workflow",
			description: "Kicks a workflow off and answers immediately with the run as recorded; the work carries on without you. Point it at a question and every step gets that on top of its own instructions. Every step is written down as waiting up front, so the picture is complete from the first frame. Several runs of one design can be in flight at once without colliding."
		}).input(VP).output(NP),
		runs: U.route({
			method: "GET",
			path: "/workflows/runs",
			summary: "Every workflow run",
			description: "All runs across all workflows, newest first. This is also the only place the runs of a deleted workflow are still reachable."
		}).output(RP),
		stopRun: U.route({
			method: "POST",
			path: "/workflows/runs/{runId}/stop",
			summary: "Stop a run now",
			description: "Nothing further starts, and the steps already going are cut off where they stand. Whatever they had written stays on their branches. Deliberately abrupt rather than letting the current step finish: a step is a whole agent turn, and a stop that kept spending for minutes afterwards is indistinguishable from a button that does nothing. It always ends the run, including one left stranded by a daemon that was replaced mid-flight."
		}).input(BP).output(q),
		archiveRun: U.route({
			method: "POST",
			path: "/workflows/runs/{runId}/archive",
			summary: "Take a finished run off the board",
			description: "Nothing is lost and the working copies are reclaimed. Every conversation the run started is put away with it, which is what makes this an archive rather than a dismissal: a step has no card of its own, so merely dropping the run would spill its conversations onto the board at the moment somebody said they were done. Refused while the run is still going."
		}).input(BP).output(q),
		unarchiveRun: U.route({
			method: "POST",
			path: "/workflows/runs/{runId}/unarchive",
			summary: "Bring an archived run back",
			description: "Puts a run and every conversation it started back on the board."
		}).input(BP).output(q)
	};
})), KP, qP, JP, YP, XP, ZP, QP, $P, eF, tF, nF, rF, iF, aF, oF, sF, cF, lF, uF, dF = v((() => {
	V(), $A(), KP = M({ repos: j(D()).describe("Every repository's id, sorted. An id is its folder relative to the workspace root, and \"root\" is the workspace itself.") }), qP = M({
		name: D().min(1).describe("What to call it in the workspace."),
		cloneUrl: D().min(1).describe("Where to clone it from."),
		branch: D().optional().describe("Which branch to check out. Leave it out for the repository's default.")
	}), JP = M({
		name: D().describe("What it ended up called."),
		path: D().describe("Where it landed.")
	}), YP = M({ name: D().min(1).describe("What to call it, which is also its folder under the workspace root.") }), XP = M({
		repo: D().describe("Which repository."),
		status: I([
			"updated",
			"current",
			"dirty",
			"diverged",
			"no-remote",
			"skipped",
			"error"
		]).describe("What happened to it. Dirty and diverged are why a repository was left alone: it had uncommitted work, or it had moved in a way that cannot be fast-forwarded."),
		behind: k().optional().describe("How many commits it was behind."),
		ahead: k().optional().describe("How many commits it was ahead."),
		head: D().optional().describe("The commit it ended up on."),
		message: D().optional().describe("What went wrong, when something did.")
	}), ZP = M({ repos: j(XP).describe("One entry per repository, saying what happened to it.") }), QP = M({
		template: D().min(1).describe("Which kind of app to scaffold, by its key in the template list."),
		name: D().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("What to call this one.")
	}), $P = M({
		repo: D().describe("Which repository to scaffold into."),
		apps: j(QP).min(1).describe("The apps to add.")
	}), eF = M({
		repo: D().describe("Which repository."),
		session: D().describe("What to call the terminal this runs in, so you can find it again."),
		dirs: j(D()).min(1).describe("Which projects to test, as folders relative to the repository. Empty targets the repository root.")
	}), tF = M({
		key: D().describe("The id to name when scaffolding one."),
		label: D().describe("What to call it on screen."),
		description: D().describe("What you get.")
	}), nF = M({ templates: j(tF).describe("The kinds of app the configured source repository knows how to scaffold.") }), rF = M({
		app: D().describe("The app's name, which is also its folder."),
		kind: D().optional().describe("What sort of app it is: the template it came from, or the framework worked out from its dependencies. Absent when it was found purely by having a dev script."),
		previewUrl: D().optional().describe("Where to open it. Absent when this sandbox has no outside address."),
		running: A().describe("Whether its dev server is up."),
		healthy: A().describe("Whether it is actually answering."),
		installed: A().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: YA.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves.")
	}), iF = M({ apps: j(rF).describe("The apps in this repository.") }), aF = M({
		name: D().describe("The name the package declares."),
		dir: D().describe("Where it lives, relative to the repository."),
		group: D().describe("The top-level folder it sits under, which is what a diagram colours by.")
	}), oF = I([
		"prod",
		"dev",
		"peer"
	]), sF = M({
		from: D().describe("The package that depends."),
		to: D().describe("The package it depends on."),
		type: oF.describe("Which kind of dependency declared it.")
	}), cF = M({
		packages: j(aF).describe("Every package in the repository."),
		edges: j(sF).describe("Which of them use which. Pure data: how to lay it out is yours to decide.")
	}), lF = M({ repo: D().describe("Which repository.") }), uF = M({
		repo: D().describe("Which repository."),
		app: D().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("Which app inside it.")
	});
})), fF, pF, mF, hF, gF = v((() => {
	V(), fF = M({
		dir: D().describe("Where the project is, relative to the workspace root. Empty means the root itself."),
		ecosystem: I(["node", "python"]).describe("Which language's tooling it uses."),
		manager: D().describe("The tool that would do the installing."),
		command: D().describe("The exact command that would run."),
		evidence: D().describe("The file that decided all of the above, so the answer can be checked rather than trusted."),
		state: I([
			"ready",
			"installing",
			"needs-setup",
			"unsupported",
			"stale"
		]).describe("Ready means its dependencies are really there. Stale means it was installed once and has since outgrown that, which is what an agent leaves behind when it adds a dependency without installing it. Unsupported means this sandbox has no such tool."),
		missing: k().optional().describe("How many declared dependencies cannot be found on disk. What separates never-installed from outgrown.")
	}), pF = M({ projects: j(fF).describe("Every project the sandbox found, and whether each is usable.") }), mF = M({ dirs: j(D().max(500)).min(1).max(50).describe("Which projects to install, by folder. Ones already ready, already installing, or with no tool to install them are skipped rather than refused.") }), hF = M({ queued: j(D()).describe("Which of them actually started, which is not necessarily what you asked for.") });
})), _F, vF = v((() => {
	W(), lE(), Ib(), Y(), dF(), iE(), gF(), TC(), _F = {
		tree: U.route({
			method: "GET",
			path: "/workspace/tree",
			summary: "The workspace file tree",
			description: "Every folder and file under the workspace root, as one walk. Name a conversation to read its own private copy of the tree instead of the shared one. Folders the daemon skips, such as installed packages, come back without their contents; ask for those separately."
		}).meta({ guest: !0 }).input(qS).output(XS),
		children: U.route({
			method: "GET",
			path: "/workspace/children",
			summary: "A bounded folder listing",
			description: "The entries inside a folder as one flat list. Direct children are the default, which is how the explorer opens a folder the full tree walk left closed; callers that need a small subtree can ask for up to five levels without a request per directory."
		}).meta({ guest: !0 }).input(QS).output($S),
		file: U.route({
			method: "GET",
			path: "/workspace/file",
			summary: "Read part of a text file",
			description: "A window of one file's text, plus how large the whole file is. Never the entire file: an unbounded read is how a single enormous log stalls the daemon for everyone, so ask for the slice you mean to show and page through if you need more."
		}).meta({ guest: !0 }).input(aC).output(cC),
		derived: U.route({
			method: "GET",
			path: "/workspace/derived",
			summary: "Read a file's derived text",
			description: "What a document, picture, recording or archive says, as text, from the shadow the sandbox keeps beside it. This is the same rendering an agent reads instead of the bytes, so it is also the way to check what one is working from. Nothing is derived here: a file with no shadow yet answers that it has none, and whether it could have one."
		}).meta({ guest: !0 }).input(lC).output(mC),
		derive: U.route({
			method: "POST",
			path: "/workspace/derive",
			summary: "Derive a file's text now",
			description: "Renders one file to text and answers with the result, for when its shadow is missing or you want it rebuilt. The same work the background pass does when that setting is on, so this is how a reader gets the text without turning it on for the whole workspace. Costs a parse of exactly one file; a format nothing can read says so rather than failing."
		}).meta({
			floor: "viewer",
			guest: !0
		}).input(lC).output(mC),
		mediaTicket: U.route({
			method: "POST",
			path: "/workspace/media-ticket",
			summary: "Get a pass for streaming a media file",
			description: "Mints the short-lived ticket a video or audio element hands to the streaming route, which serves byte ranges and so cannot carry an ordinary header. Minting it here means a caller can tell whether this sandbox streams media at all, rather than discovering it mid-playback."
		}).meta({
			floor: "viewer",
			guest: !0
		}).input(tC).output(nC),
		downloadTicket: U.route({
			method: "POST",
			path: "/workspace/download-ticket",
			summary: "Get a pass for downloading files and folders together",
			description: "Mints the short-lived ticket the download route takes, bound to a selection of files and folders. The route answers one ZIP streamed straight from disk: folders whole, already-compressed formats stored as they are and everything else deflated. Minting it first means a missing or unreadable path is refused here, before the browser starts a download that cannot finish."
		}).meta({
			floor: "viewer",
			guest: !0
		}).input(rC).output(iC),
		resolve: U.route({
			method: "GET",
			path: "/workspace/resolve",
			summary: "Turn a written path into a real file",
			description: "Matches a path somebody wrote in prose against the real tree and says which file it means. A path mentioned in a message is often only the tail of the real one, so this is the lookup behind every clickable file reference rather than a plain existence check."
		}).meta({ guest: !0 }).input(hC).output(gC),
		search: U.route({
			method: "GET",
			path: "/workspace/search",
			summary: "Search the code",
			description: "Ranked results across the whole workspace, grouped, each carrying why it matched and how fresh it is. Left alone it blends plain text, structure, meaning and history in one pass; narrow it to a single kind of search when you already know which you want. Long result sets resume from the cursor it hands back."
		}).meta({
			guest: !0,
			control: "editor"
		}).input(ZT).output(rE),
		health: U.route({
			method: "GET",
			path: "/workspace/health",
			summary: "A repo's shape in numbers",
			description: "Where one repo's risk sits: the files that change often and are complicated at once, what the index holds, and which modules the rest of the code leans on most. Scoped to a repo, because a codebase is a repo rather than the whole drop."
		}).input(aE).output(cE),
		classify: U.route({
			method: "GET",
			path: "/workspace/classify",
			summary: "Sort a messy drop into buckets",
			description: "Proposes which of the loose things in the workspace are code, documents, media or archives. A read-only suggestion by fixed rules, with no model involved: nothing moves until a caller applies the moves it likes through the move call."
		}).output(wC),
		mkdir: U.route({
			method: "POST",
			path: "/workspace/dir",
			summary: "Create a folder",
			description: "Makes a folder, and any missing folders above it."
		}).meta({ floor: "writer" }).input(_C).output(q),
		delete: U.route({
			method: "DELETE",
			path: "/workspace/entry",
			summary: "Delete a file or folder",
			description: "Removes one entry and everything under it. It goes to the trash rather than being erased, and the answer carries the id that brings it back through the restore call for a day. The path travels in the body rather than the address, the same as every other write in this group."
		}).meta({ floor: "writer" }).input(eC).output(bC),
		restore: U.route({
			method: "POST",
			path: "/workspace/restore",
			summary: "Bring back something deleted",
			description: "Puts an entry a delete sent to the trash back where it was, recreating the folders above it. Nothing is written over: when something new holds the name, it comes back beside it and the answer says where. Trash older than a day is gone."
		}).meta({ floor: "writer" }).input(xC).output(SC),
		move: U.route({
			method: "POST",
			path: "/workspace/move",
			summary: "Move or rename something",
			description: "Moves one entry to a new path, which is also how you rename it."
		}).meta({ floor: "writer" }).input(vC).output(q),
		copy: U.route({
			method: "POST",
			path: "/workspace/copy",
			summary: "Copy a file or folder",
			description: "Duplicates one entry at a new path, recursively for a folder."
		}).meta({ floor: "writer" }).input(vC).output(q),
		extract: U.route({
			method: "POST",
			path: "/workspace/extract",
			summary: "Unpack an archive",
			description: "Unpacks a zip or tar already in the workspace into a new folder beside it, named after the archive. An archive that is one folder of its own name lands as that folder rather than as it twice, and a .gz, .bz2, .xz or .zst holding a single file lands as that file. Nothing is ever written over: the answer says where it landed. Formats with no tool here, such as .7z and .rar, are refused."
		}).meta({ floor: "writer" }).input(eC).output(yC),
		setup: U.route({
			method: "GET",
			path: "/workspace/setup",
			summary: "Which projects have their dependencies installed",
			description: "Per project, whether its dependencies are actually present. A project that arrives by import comes without them, so files landing is not the same as the project working: until this says a project is ready, its type checks and tests can only mislead you."
		}).output(pF),
		install: U.route({
			method: "POST",
			path: "/workspace/setup/install",
			summary: "Install a project's dependencies",
			description: "Starts the install for one or more projects in a terminal you can attach to, and answers immediately. The run survives a page reload and its output stays in the terminal history."
		}).input(mF).output(hF),
		repos: U.route({
			method: "GET",
			path: "/workspace/repos",
			summary: "Repos in the workspace",
			description: "Every git repo the daemon found in the workspace, with where each one sits and what it is called."
		}).meta({ guest: !0 }).output(KP),
		addRepo: U.route({
			method: "POST",
			path: "/workspace/repos",
			summary: "Clone a repo in",
			description: "Clones a repository into the workspace beside the others, using whatever forge credentials the sandbox already holds."
		}).input(qP).output(JP),
		createRepo: U.route({
			method: "POST",
			path: "/workspace/repos/new",
			summary: "Start a new repo",
			description: "Makes an empty repository in the workspace: a folder named after it, initialised, with a README that names it and one commit, so an agent can start on it at once. Nothing is cloned and nothing leaves the machine."
		}).input(YP).output(JP),
		sync: U.route({
			method: "POST",
			path: "/workspace/sync",
			summary: "Pull every repo up to date",
			description: "Fetches every repo that has a remote and fast-forwards the ones that can move safely, reporting what happened to each. This runs by itself at the start of a turn; call it directly to refresh on demand, or to re-sync a repo that had drifted."
		}).output(ZP),
		templates: U.route({
			method: "GET",
			path: "/workspace/templates",
			summary: "App templates you can add",
			description: "The kinds of app the configured source repo knows how to scaffold, which is what an add-app picker lists."
		}).output(nF),
		addApps: U.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps",
			summary: "Scaffold new apps into a repo",
			description: "Starts scaffolding one or more apps inside an existing multi-package repo and answers straight away. Watch the terminal it opens for progress and for anything that goes wrong."
		}).input($P).output(q),
		appsList: U.route({
			method: "GET",
			path: "/workspace/repos/{repo}/apps",
			summary: "Apps inside a repo",
			description: "The apps in one multi-package repo, each with its preview address and whether its dev server is up."
		}).input(lF).output(iF),
		packageGraph: U.route({
			method: "GET",
			path: "/workspace/repos/{repo}/graph",
			summary: "How a repo's packages depend on each other",
			description: "Every package in one multi-package repo and which of its siblings each one uses, which is what a dependency view draws."
		}).input(lF).output(cF),
		modules: U.route({
			method: "GET",
			path: "/workspace/modules",
			summary: "Every package across every repo",
			description: "The named packages in the whole workspace, which is what a review list groups changed files under when a reader wants packages rather than paths. Whole-workspace in one answer, because a review spans repos and asking per repo would be a fan-out on every open."
		}).output(Eb),
		startApp: U.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/start",
			summary: "Start an app's dev server",
			description: "Brings up one app's preview server in an attachable terminal, so its address starts answering."
		}).input(uF).output(q),
		stopApp: U.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/stop",
			summary: "Stop an app's dev server",
			description: "Shuts one app's preview server down and frees its port."
		}).input(uF).output(q),
		runTests: U.route({
			method: "POST",
			path: "/workspace/repos/{repo}/tests",
			summary: "Run a project's tests",
			description: "Starts the test run for the projects you name in an attachable terminal and answers straight away. The terminal is where the results appear."
		}).input(eF).output(q)
	};
})), yF = v((() => {
	Et(), _d(), V(), yN(), kT(), PM(), rm(), Y(), y.output(jM), y.output(mN), y.input(eT.extend({ platform: D().optional() }).strict()).output(q), y.output(q), y.input(wl()).output(wl()), y.input(YM).output(H(ZM)), y.input($M).output(H(ZM)), y.input(em).output(H(tm));
})), bF = v((() => {
	Et(), V(), md(), rm(), Y(), Hw(), y.output(zw), y.input(Iw).output(q), y.output(q), y.input(wl()).output(wl()), y.input(em).output(H(tm));
})), xF = v((() => {
	Et(), _d(), V(), hv(), ld(), K(), $p(), Y(), y.output(Qu), y.input(ed).output(H(td)), y.input(nd).output(H(uv)), y.input(Bp).output(M({ applied: A() })), y.input(M({
		conversationId: D().min(1),
		text: D(),
		attachments: j(D()).optional(),
		mentions: j(D()).optional(),
		editorContext: Kd.optional()
	})).output(M({
		applied: A(),
		invalid: D().optional()
	})), y.input(M({ toml: D() })).output(M({ settings: j(D()) })), y.input(nd.pick({ conversationId: !0 })).output(q), y.input(od).output(H(sd)), y.input(od.pick({ runId: !0 })).output(q), y.output(q);
})), SF = v((() => {
	new Set(Object.keys({
		"no-tunnel": !0,
		"unknown-sandbox": !0,
		dropped: !0
	}));
})), CF, wF, TF = v((() => {
	V(), CF = {
		starting: "starting",
		up: "up",
		restarting: "restarting"
	}, wF = M({
		cpu: k(),
		memory: k(),
		io: k()
	}), M({
		node: I(CF),
		lagMs: k().nonnegative().nullable().catch(null),
		restarts: k().int().nonnegative(),
		uptimeS: k().int().nonnegative(),
		pressure: wF.nullable().catch(null)
	});
})), EF = v((() => {})), DF = v((() => {})), OF = v((() => {})), kF, AF, jF, MF = v((() => {
	N_(), kF = "The interrupted request is repeated below, where part of it was already completed in this session, continue from that point instead of starting over.", AF = {
		auth: `The Claude credential that interrupted this conversation has been renewed, and this turn resumed automatically. ${kF}`,
		outage: `The model provider was briefly unavailable and interrupted this conversation; this turn resumed automatically. ${kF}`,
		restart: `The sandbox restarted while this turn was running, which stopped it, and this turn resumed automatically once it came back. ${kF}`,
		stopped: `The previous attempt at this request stopped before it finished, and it has been sent again. ${kF}`,
		limit: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again. ${kF}`,
		switched: "The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account, which starts a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over.",
		carried: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account of the same provider, in this same session: everything you knew is still here. ${kF}`,
		refused: "The model provider refused the previous attempt at this request outright, because its usage allowance was spent: no part of the request below was read or acted on, and nothing has been done towards it. It has been sent again, and starts from the beginning. Where the sandbox has measured earlier work on this branch, it is in the note headed 'Where the work stands'.",
		door: "The previous attempt at this request was turned away before any of it reached you: no part of the request below was read or acted on. It has now been sent, and starts from the beginning.",
		overflow: "This conversation's session grew larger than the model's context window can hold, which stopped this turn, and it has been sent again in a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over. Keep this session small: read large files and long command output in parts rather than whole.",
		flagged: `The model provider's safety classifier stopped the previous attempt at this request partway, and it has been sent again after the person looking at this conversation chose to go on. The stopped response has been removed from this session. ${kF}`,
		continued: "The previous turn in this conversation ended before it finished (it was stopped, or something cut it short, such as a sandbox restart), and the person looking at this conversation chose to carry on without writing anything new: continue the work from where the conversation left off. Anything they declined along the way stays declined.",
		answered: "The sandbox restarted while this conversation was waiting for the user to respond; it is back, and their response follows below: continue from where the session left off."
	}, jF = (e, t) => ({
		kind: "notice",
		text: t,
		reason: e
	}), jF("auth", "Claude sign-in renewed, this turn picked up where it left off."), jF("outage", "The model provider came back, this turn picked up where it left off."), jF("restart", "The sandbox came back, this turn picked up where it left off."), jF("stopped", "Sent again after the turn stopped short, picking up where it left off."), jF("limit", "Sent again after the allowance ran out mid-turn, picking up where it left off."), jF("switched", "Sent again on the switched account after the allowance ran out mid-turn, in a fresh session."), jF("carried", "Sent again on the switched account after the allowance ran out mid-turn, carrying the session with it."), jF("refused", "Sent again after the allowance refused it: nothing had run."), jF("door", "Sent again: the first attempt was turned away before anything ran."), jF("overflow", "Sent again in a fresh session after the last one outgrew the model's context window."), jF("flagged", "Sent again after the model's safeguards stopped it, without the stopped response."), jF("continued", "Carried on from where the last turn stopped."), AF.answered;
})), NF = v((() => {})), PF = v((() => {
	MF();
})), FF = v((() => {})), IF = v((() => {
	PF(), MF();
})), LF = v((() => {})), RF = v((() => {
	lv();
})), zF = v((() => {})), BF = v((() => {})), VF = v((() => {
	fd();
})), HF, UF = v((() => {
	V(), HF = [
		"editor",
		"read",
		"drive",
		"land"
	], I(HF);
})), WF, GF, KF, qF, JF, YF, XF = v((() => {
	Ym(), WF = [
		{
			path: ".intentic/config/capabilities.json",
			invalidates: [
				"capabilities",
				"extensions",
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
			path: ".intentic/config/areas.json",
			invalidates: ["areas", "manifests"],
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
			path: ".intentic/local/privacy-log.json",
			invalidates: ["privacy-log"],
			portability: "derived",
			note: "The target starts its own record of what its shield did."
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
			path: ".intentic/config/field-notes.toon",
			invalidates: ["settings"],
			portability: "carry",
			versioned: !0,
			outsideWriter: "the field-notes automation's agent turn (the daemon only reads it, through FIELD_NOTES_FILE)"
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
			path: ".intentic/records/needs.json",
			invalidates: ["needs"],
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
			path: ".intentic/records/automation-schedule.json",
			invalidates: [],
			why: "Scheduler bookkeeping nothing in the browser renders: what a catch-up fire produces reaches the run ledger, which carries the automations key.",
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
			why: "Which origins have loaded a Visitor chat's widget, written on a 30s flush timer while a customer's site serves page views. The install panel that renders it fetches on open and polls itself while it is on screen, which is the whole window in which the answer changes for anyone. Pushing instead would bill every connected browser a refetch per flush, for a panel almost nobody has open.",
			portability: "carry"
		},
		{
			path: ".intentic/records/issue-installs.json",
			invalidates: [],
			why: "The same probe for the bug reporter's script, on the same flush timer and read by the same kind of panel, so it is outside the push path for the same reason the Visitor chat's is.",
			portability: "carry"
		},
		{
			path: ".intentic/records/webchat-outbox.json",
			invalidates: [],
			why: "Visitor chat replies a visitor has not collected yet, written when an approved wake answers or a human writes as the agent. The only reader is a stranger's browser polling the public /webchat door, which no query key in this app addresses; the owner's own view of the same words is the conversation's transcript, which the agent registry already pushes.",
			portability: "carry"
		},
		{
			path: ".intentic/records/thread-sessions.json",
			invalidates: [],
			why: "Thread bookkeeping (an inbound thread, a Visitor chat visitor, a Discord or Slack channel, → sandbox conversation + provider session), written on EVERY inbound message. Nothing in the browser reads it: what a thread produces is a conversation, and the fleet board already learns about that from the agent registry's own push. Naming a key here would bill every connected browser a refetch per inbound message, the request storm this table's own note warns about, to refresh nothing it can see.",
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
			path: ".intentic/records/conversions.json",
			invalidates: [],
			why: "Written once per update that converted something, at boot before any browser is connected; the update card reads the plan from the new image instead.",
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
			path: ".intentic/records/artifacts/browser/",
			invalidates: [],
			why: "Page snapshots, screenshots and console logs a turn's browser wrote while looking at a site; read back by that turn and by nothing after it.",
			portability: "carry",
			backup: !1
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
			path: ".intentic/local/trash/",
			invalidates: [],
			why: "Entries deleted from the file view, held for a day so Undo can restore them; nothing renders it, and the janitor expires it.",
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
			path: ".intentic/secrets/converting/",
			invalidates: [],
			why: "Pre-images of the files an update's conversions changed; only the boot step reads them, to put a rolled-back version's files back.",
			portability: "secret",
			note: "An export does not carry an update's undo record; the target converts its own files."
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
	], GF = WF, GF.filter((e) => e.versioned).map((e) => e.path), GF.filter((e) => e.versioned || e.authored).map((e) => e.path), KF = {
		config: `${Gm}/config`,
		records: `${Gm}/records`,
		local: `${Gm}/local`,
		identity: `${Gm}/identity`,
		secrets: `${Gm}/secrets`
	}, qF = Object.keys(KF), JF = (e) => {
		switch (e.portability) {
			case "secret": return "secrets";
			case "identity": return "identity";
			case "derived": return "local";
			case "carry": return e.versioned === !0 || e.authored === !0 ? "config" : "records";
		}
	}, qF.flatMap((e) => {
		let t = GF.filter((t) => JF(t) === e);
		return t.some((e) => e.versioned === !0) ? t.filter((e) => e.versioned !== !0).map((e) => e.path) : [`${KF[e]}/`];
	}), YF = GF.filter((e) => e.backup !== !1 && (e.portability === "carry" || e.portability === "identity")).map((e) => e.path), GF.filter((e) => !YF.includes(e.path)).map((e) => e.path), GF.filter((e) => e.invalidates.includes("manifests")).map((e) => e.path), `${Wm}`, `${Gm}`, `${Gm}`;
})), ZF = v((() => {})), QF = v((() => {})), $F = v((() => {})), eI = v((() => {
	e_();
})), tI = v((() => {})), nI = v((() => {
	eI();
})), rI = v((() => {
	Nd(), Ld(), Pd.map((e) => ({
		label: e.label,
		value: e.id
	})), Object.fromEntries(Pd.map((e) => [e.id, e.access])), Pd.filter((e) => e.access.kind === "free").map((e) => e.id), Object.fromEntries(Pd.map((e) => [e.id, e.vendor])), Pd.filter((e) => e.planLimits).map((e) => e.id);
})), iI = v((() => {})), aI, oI = v((() => {
	aI = (e) => e instanceof Error ? e.message : String(e);
})), sI = v((() => {})), cI, lI = v((() => {
	zO(), cI = {
		ui: "control",
		accounts: "control",
		terminal: "control",
		code: "control",
		secrets: "control",
		hashline: "control",
		subagents: "control",
		watch: "control",
		deps: "control",
		diagnostics: "outside",
		web: "outside",
		browser: "outside"
	}, new Set(Object.keys(cI)), new Set(Object.entries(cI).filter(([, e]) => e === "control").map(([e]) => e)), [...YD()];
})), uI, dI, fI, pI, mI = v((() => {
	uI = /(?:auth[_-]?token|access[_-]?token|refresh[_-]?token|api[_-]?key|access[_-]?key|secret[_-]?key|client[_-]?secret|private[_-]?key|passwo?rd|passphrase|credentials?|secret|token|bearer)["']?[ \t]*[:=][ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s"',;}\n]*))/gi, dI = [
		/-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
		/PuTTY-User-Key-File-\d/,
		/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:(?!\*+@)[^\s/@]{3,}@/i
	], fI = [
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
	], [...dI, ...fI], pI = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), pI(fI), new RegExp(uI.source, uI.flags);
})), hI = v((() => {})), gI, _I = v((() => {
	gI = 80, gI * .6;
})), vI, yI = v((() => {
	_I(), XF(), vI = /* @__PURE__ */ new Map([
		["docx", "docx"],
		["pptx", "pptx"],
		["xlsx", "xlsx"],
		["pdf", "pdf"],
		["html", "html"],
		["htm", "html"]
	]), [...vI.keys()];
})), bI = v((() => {
	V(), M({
		type: L("hello"),
		token: D(),
		version: D()
	});
})), xI = v((() => {
	V(), M({
		type: L("hello"),
		token: D(),
		version: D()
	});
})), SI = v((() => {})), CI, wI = v((() => {
	V(), Im(), M({
		provider: D().min(1),
		type: D().min(1),
		id: D(),
		channelId: D(),
		author: M({
			id: D(),
			name: D(),
			groups: j(D()).optional()
		}),
		content: D(),
		mentioned: A().optional(),
		branch: D().optional(),
		history: j(M({
			author: M({
				id: D(),
				name: D()
			}),
			content: D(),
			timestamp: D(),
			self: A().optional()
		})).optional(),
		timestamp: D(),
		extra: F(D(), wl()).optional()
	}), CI = M({
		state: I([
			"waiting",
			"code",
			"failed"
		]),
		code: D().optional(),
		detail: D().optional(),
		since: k().optional()
	}), Fm.extend({
		whisperReady: A().optional(),
		pairing: F(D(), CI).optional()
	});
})), TI = v((() => {})), EI = v((() => {})), DI = v((() => {})), OI = v((() => {
	Ym();
})), kI = v((() => {})), AI = v((() => {})), jI = v((() => {})), MI = v((() => {})), NI = v((() => {})), PI = v((() => {})), FI, II = v((() => {
	FI = {
		".zip": "zip",
		".tar": "tar",
		".tar.gz": "tar",
		".tgz": "tar",
		".tar.bz2": "tar",
		".tbz": "tar",
		".tbz2": "tar",
		".tar.xz": "tar",
		".txz": "tar",
		".tar.zst": "tar",
		".tzst": "tar",
		".gz": "gzip",
		".bz2": "bzip2",
		".xz": "xz",
		".zst": "zstd"
	}, Object.keys(FI).sort((e, t) => t.length - e.length);
})), LI = v((() => {})), RI = v((() => {
	LS();
})), zI, BI, VI, HI, UI, WI = v((() => {
	V(), zI = [
		"claude",
		"codex",
		"cursor",
		"opencode",
		"translator"
	], BI = I(zI), VI = M({
		kind: I([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where this engine's version comes from."),
		version: D().optional().describe("Which version, when it is pinned to one.")
	}), HI = M({
		version: D().describe("Which version was refused."),
		reason: D().describe("What was wrong with it: it would not launch, or it did not export what the daemon calls."),
		at: D().describe("When it was refused.")
	}), UI = M({
		id: BI.describe("Which engine."),
		label: D().describe("What it is called on screen."),
		running: M({
			version: D().optional().describe("The version a turn would use right now. Absent means there is no copy of this engine here yet."),
			source: I(["image", "store"]).describe("Whether that version is the one baked into the sandbox image or one the store installed over it.")
		}).describe("What a turn started now would actually run."),
		baked: D().optional().describe("The version the image bakes, which is the floor everything else falls back to. Absent on an image that carries no copy of it."),
		channel: VI.describe("The owner's standing answer for this engine."),
		offered: M({
			version: D().describe("The version this engine would move to."),
			blessed: A().describe("Whether the blessed list names this version, which on the latest channel is routinely no.")
		}).optional().describe("A newer version waiting, absent when the running one is already what the channel asks for."),
		blessed: D().optional().describe("What the blessed list names for this engine, when the list has been read."),
		previous: D().optional().describe("The version kept one step back, which is what going back means."),
		quarantined: j(HI).describe("Versions the store installed and then refused, with the reason."),
		diskBytes: k().int().nonnegative().describe("What this engine's kept versions cost on the daemon's volume."),
		installing: A().optional().describe("Whether this engine is currently being installed in the background.")
	}), M({
		engines: j(UI).describe("Every engine this sandbox can run, whether or not the store holds anything for it."),
		checkedAt: D().optional().describe("When upstream was last asked what it publishes. Absent until the first check has run."),
		listSource: D().describe("Where the blessed list is read from, so a self-hosted sandbox can show its own."),
		listReadAt: D().optional().describe("When that list was last read. Absent means it has never been reachable from here.")
	}), M({
		id: BI.describe("Which engine."),
		kind: I([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where its version should come from."),
		version: D().optional().describe("Which version, required when pinning and ignored otherwise.")
	}), M({
		id: BI.describe("Which engine."),
		version: D().optional().describe("Which version. Leave it out for whatever the channel offers; naming one takes a version nobody has blessed, deliberately."),
		floor: D().optional().describe("Install the lowest published version at or above this one. What a turn refused for being too old sends back.")
	}), M({ id: BI.describe("Which engine.") }), M({
		ok: L(!0).describe("It went through."),
		version: D().describe("Which version is now active."),
		source: I(["image", "store"]).describe("Whether that is the image's copy or the store's."),
		fromNextTurn: A().describe("Whether the change reaches turns already in flight, or only the next one.")
	});
})), GI, KI, qI, JI, YI, XI, ZI, QI, $I, eL, tL, nL = v((() => {
	V(), GI = M({
		content: D(),
		hash: D()
	}), KI = M({
		bornAt: k(),
		at: k(),
		apt: j(D()),
		paths: j(D())
	}), qI = I([
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
	]), JI = M({
		tool: D(),
		kind: qI,
		sessions: j(D()),
		commands: j(D()),
		firstAt: k(),
		lastAt: k(),
		count: k(),
		declinedAt: k().optional()
	}), YI = M({
		tool: D(),
		hash: D(),
		at: k()
	}), M({
		installs: j(JI),
		drift: KI.optional(),
		settled: j(YI).optional()
	}), XI = M({
		tool: D(),
		kind: qI,
		sessions: k(),
		lastAt: k(),
		live: A(),
		drafted: A().optional(),
		declined: A().optional(),
		step: D().optional()
	}), M({
		tool: D().min(1),
		decision: I([
			"adopt",
			"dismiss",
			"restore"
		])
	}), ZI = M({
		base: D(),
		root: D().optional()
	}), QI = M({
		hash: D(),
		host: D(),
		requestedAt: k(),
		phase: I([
			"waiting",
			"rebuilding",
			"failed"
		]),
		waitingOn: j(D()),
		message: D().optional()
	}), M({
		host: D().min(1),
		hash: D().min(1)
	}), M({
		proposal: GI.optional(),
		custom: GI.optional(),
		approved: GI.optional(),
		appliedHash: D().optional(),
		container: D().optional(),
		drift: KI.optional(),
		recurring: j(XI).optional(),
		localImage: ZI.optional(),
		rebuildWhenIdle: QI.optional(),
		waitsForAgents: L(!0).optional()
	}), M({ hash: D().min(1) }), $I = M({
		name: D(),
		version: D().optional()
	}), eL = M({
		id: D(),
		name: D(),
		origin: I([
			"custom",
			"capability",
			"base"
		]),
		originLabel: D().optional(),
		state: I([
			"active",
			"after-rebuild",
			"awaiting-approval"
		]),
		tools: j($I),
		extras: k().optional(),
		purpose: D().optional(),
		detail: D().optional(),
		commands: D().optional(),
		block: D().optional()
	}), M({ block: D() }), M({ items: j(eL) }), tL = M({
		name: D(),
		status: I([
			"packing",
			"ready",
			"failed"
		]),
		bytes: k(),
		createdAt: k(),
		secrets: A(),
		error: D().optional()
	}), M({ exports: j(tL) });
})), rL, iL = v((() => {
	V(), rL = M({
		state: I([
			"off",
			"pending",
			"registered",
			"rejected",
			"unreachable"
		]),
		detail: D().optional(),
		retrying: A().optional(),
		reason: I(["unknown", "deleted"]).optional(),
		identity: D().optional(),
		at: k().optional()
	}), M({
		ticket: D().min(1).optional(),
		name: D().max(60).optional(),
		image: D().max(15e4).optional()
	}), M({
		announce: rL,
		adoption: M({
			status: k(),
			detail: D()
		}).optional()
	});
})), aL, oL, sL, cL, lL, uL, dL, fL = v((() => {
	aL = (e) => typeof e == "object" && !!e && !Array.isArray(e), oL = (e) => ({
		kind: "drop",
		describe: `drops ${e}`,
		key: e
	}), sL = (e, t, n, r = `converts ${e} to its new form`) => ({
		kind: "retype",
		describe: r,
		key: e,
		guard: t,
		convert: n
	}), cL = (e, t) => {
		let n = Object.values(t).filter((e) => typeof e == "string" && Object.hasOwn(t, e));
		if (n.length > 0) throw Error(`mapValue(${e}) maps onto its own keys (${n.join(", ")}), so it would not settle`);
		return {
			kind: "mapValue",
			describe: `converts ${e} from its old values`,
			key: e,
			mapping: t
		};
	}, lL = (e, t) => ({
		kind: "fold",
		describe: e,
		from: t.from,
		into: t.into,
		applies: t.applies,
		convert: t.convert
	}), uL = (e) => e.map((e) => oL(e)), dL = (e, t) => ({
		kind: "at",
		describe: `${t.describe} under ${e}`,
		path: e,
		inner: t
	});
})), pL, mL, hL, gL, _L, vL, yL, bL, xL, SL, CL = v((() => {
	V(), fL(), pL = /* @__PURE__ */ new Set(["push.starting"]), mL = /* @__PURE__ */ new Set(["instruct"]), hL = /* @__PURE__ */ new Set([
		"verify-edits",
		"verify-removals",
		"verify-tests"
	]), gL = (e) => {
		if (!aL(e)) return !1;
		let t = aL(e.action) ? e.action : {};
		return pL.has(e.moment) || mL.has(t.kind) || t.kind === "builtin" && hL.has(t.name);
	}, _L = (e) => Array.isArray(e) && e.some(gL), vL = (e) => aL(e) && (e.moment === "turn.ending" || aL(e.action) && e.action.kind === "builtin" && e.action.name === "verify-ui-edits"), yL = (e) => Array.isArray(e) && e.some(vL), bL = [
		"keepWarm",
		"keepWarmHours",
		"keepWarmMinTokens",
		"keepWarmReserve"
	], xL = A(), SL = k(), lL("folds keepWarm, keepWarmHours, keepWarmMinTokens and keepWarmReserve into one keepWarm object", {
		from: bL,
		into: "keepWarm",
		applies: (e) => xL.safeParse(e.keepWarm).success || bL.slice(1).some((t) => Object.hasOwn(e, t)),
		convert: ({ keepWarm: e, keepWarmHours: t, keepWarmMinTokens: n, keepWarmReserve: r }) => {
			let i = {}, a = xL.safeParse(e), o = SL.safeParse(t), s = SL.safeParse(n), c = SL.safeParse(r);
			return a.success && (i.auto = a.data), o.success && (i.hours = o.data), s.success && (i.minTokens = s.data), c.success && (i.reserve = c.data), i;
		}
	}), [
		...uL([
			"agentRunEffort",
			"agentRunModel",
			"agentRunModels",
			"autoFastModels",
			"autoTier",
			"autoTierEagerness",
			"commandJudgeModels",
			"commandRules",
			"contextShelf",
			"dependencyFreshness",
			"explainCommands",
			"iqContext",
			"iqContextHoldout",
			"moveAfterLimit",
			"quickModel",
			"resumeAfterLimit",
			"resumeAfterOutage",
			"sidecars",
			"terseHoldout",
			"terseOutput",
			"testFaultDetection"
		]),
		sL("rules", _L, (e) => e.filter((e) => !gL(e)), "drops rules at a withdrawn moment or with a withdrawn action (push.starting, instruct, three built-in checks)"),
		cL("personaRouting", {
			off: !1,
			suggest: !0,
			auto: !0
		}),
		sL("rules", yL, (e) => e.filter((e) => !vL(e)), "drops rules at the retired turn.ending moment (and the verify-ui-edits built-in), which run nothing"),
		dL("offload", oL("landCheck")),
		dL("modelRoles", oL("pre-push-fix"))
	];
})), wL, TL, EL, DL, OL, kL = v((() => {
	V(), Xu(), wL = I([
		"definition",
		"bundle",
		"hermes",
		"openclaw"
	]), TL = I(["hermes", "openclaw"]), EL = I([
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
	]), DL = M({
		id: D(),
		group: EL,
		label: D(),
		detail: D().optional(),
		applicable: A(),
		reason: D().optional(),
		recommended: A(),
		secrets: j(D())
	}), M({
		source: wL,
		token: D(),
		name: D().optional(),
		items: j(DL),
		carriesSecrets: A(),
		refused: j(D()),
		needsAction: j(Yu)
	}), M({
		token: D(),
		items: j(D()),
		includeSecrets: A()
	}), M({
		applied: j(M({
			id: D(),
			group: EL,
			label: D()
		})),
		failed: j(M({
			id: D(),
			label: D(),
			error: D()
		})),
		refused: j(D()),
		needsAction: j(Yu),
		presentation: M({
			name: D().optional(),
			image: D().optional()
		}).optional()
	}), OL = M({
		id: D(),
		online: A(),
		found: TL.optional(),
		detail: D().optional()
	}), M({ hosts: j(OL) }), M({ host: D().min(1) });
})), AL, jL, ML, NL, PL, FL, IL = v((() => {
	V(), Xu(), kT(), iS(), AL = El({
		id: D().min(1),
		remote: D().min(1),
		ref: D().optional()
	}), jL = El({
		remote: D().min(1),
		ref: D().optional()
	}), ML = El({
		baseImage: D().optional(),
		dockerfile: D().optional()
	}), NL = (e) => {
		let t = e;
		for (; t instanceof Nu || t instanceof Pu;) t = t.unwrap();
		return t;
	}, PL = () => El(Object.fromEntries(Object.entries(Rx.shape).map(([e, t]) => [e, NL(t).optional()]))).prefault({}), FL = El({
		schemaVersion: L(1),
		name: D().optional(),
		environment: ML.prefault({}),
		workspace: jL.optional(),
		repositories: j(AL).prefault([]),
		capabilities: j(hT).prefault([]),
		secrets: j(D()).prefault([]),
		settings: PL()
	}), M({
		toml: D(),
		omitted: j(Yu)
	}), M({ differences: j(Yu) }), M({
		remote: D().min(1).optional(),
		name: D().min(1).optional(),
		owner: D().min(1).optional()
	}), M({
		remote: D(),
		branch: D(),
		created: A()
	}), M({
		remote: D().optional(),
		branch: D().optional(),
		hosts: j(D())
	}), M({
		version: L(3),
		sandbox: M({ name: D() }).optional(),
		presentation: M({
			name: D().optional(),
			image: D().optional()
		}).optional(),
		createdAt: k(),
		secrets: A(),
		repos: j(D()),
		definition: FL,
		excluded: j(M({
			path: D(),
			portability: D(),
			note: D().optional()
		}))
	});
})), LL = v((() => {})), RL = v((() => {})), zL = v((() => {})), BL = v((() => {
	eh();
})), VL, HL, UL = v((() => {
	fd(), _d(), Am(), Rm(), Fv(), pS(), MS(), WS(), KS(), XT(), FE(), LE(), GE(), tD(), iD(), hk(), Mk(), dA(), pA(), _A(), MA(), PA(), KA(), JA(), tj(), cj(), gj(), yj(), Sj(), Nj(), tM(), rM(), sM(), uM(), gM(), wM(), EM(), OM(), iP(), oP(), uP(), yP(), SP(), GP(), vF(), yF(), bF(), xF(), SF(), TF(), hv(), OF(), Dp(), MF(), N_(), WC(), lv(), NF(), PF(), FF(), IF(), EF(), DF(), RF(), LF(), zF(), Rd(), BF(), _d(), W(), VF(), UF(), Ym(), XF(), ZF(), QF(), $F(), eI(), tI(), nI(), Nd(), Ld(), rI(), iI(), $b(), sI(), dx(), lI(), mI(), hI(), yf(), Sd(), yI(), bI(), xI(), SI(), ld(), wI(), TI(), EI(), OI(), kI(), AI(), jI(), MI(), gk(), Dd(), NI(), PI(), II(), eh(), LI(), Im(), K(), HS(), LS(), RI(), e_(), bd(), AS(), Ey(), kT(), xv(), Uy(), i_(), lE(), n_(), yN(), WI(), nL(), aw(), pk(), o_(), UE(), Ib(), lA(), Nv(), PM(), rm(), hA(), AA(), $v(), UA(), gh(), NE(), WT(), RN(), $A(), Ak(), $j(), $p(), iL(), oj(), Em(), am(), mj(), Aj(), JT(), sg(), Gf(), _w(), mM(), iS(), CL(), O_(), Y(), dS(), nP(), HN(), BM(), x_(), wh(), Ah(), SM(), Pw(), gP(), Hw(), UP(), dF(), iE(), gF(), TC(), kL(), IL(), LL(), DI(), _I(), VM(), RL(), Lb(), zL(), BL(), dg(), ny(), VL = {
		accounts: km,
		activity: Lm,
		agent: Pv,
		agents: fS,
		approvals: jS,
		areas: US,
		automations: GS,
		capabilities: YT,
		chores: PE,
		ci: IE,
		diff: WE,
		endpoints: eD,
		extensions: mk,
		personas: jk,
		privacy: eM,
		safety: nM,
		sessions: hM,
		settings: CM,
		share: TM,
		skills: DM,
		intentic: gA,
		git: uA,
		history: fA,
		workspace: _F,
		inventory: jA,
		issues: NA,
		logs: GA,
		loops: qA,
		panels: ej,
		ports: sj,
		public: hj,
		providers: xj,
		push: Mj,
		needs: oM,
		secrets: lM,
		system: rP,
		translator: aP,
		usage: lP,
		vpn: xP,
		offload: vP,
		exit: rD,
		netdisk: vj,
		workflows: WP
	}, HL = gd(VL), HL.map((e) => e.name);
})), WL, GL, KL, qL, JL, YL, XL, ZL, QL, $L, eR, tR, nR, rR, iR, aR = v((() => {
	UL(), V(), WL = I([
		"running",
		"deploying",
		"stopped",
		"unhealthy",
		"unknown"
	]), GL = I(["deployment", "stack"]), KL = M({
		name: D(),
		image: D(),
		updateAvailable: A()
	}), qL = M({
		kind: GL,
		id: D(),
		name: D(),
		state: WL,
		status: D().optional(),
		server: D().optional(),
		image: D().optional(),
		updateAvailable: A(),
		services: j(KL),
		url: D()
	}), JL = I([
		"ok",
		"unreachable",
		"disabled"
	]), YL = M({
		id: D(),
		name: D(),
		state: JL,
		cpuPercent: k().optional(),
		memPercent: k().optional(),
		diskPercent: k().optional(),
		url: D()
	}), XL = M({
		id: D(),
		type: D(),
		level: I([
			"ok",
			"warning",
			"critical"
		]),
		resolved: A(),
		ts: k(),
		resource: D().optional(),
		server: D().optional(),
		from: D().optional(),
		to: D().optional()
	}), ZL = M({
		username: D(),
		admin: A()
	}), QL = M({
		repo: D(),
		projectName: D(),
		composePath: D(),
		linkedStack: D().optional(),
		suggestions: j(D())
	}), M({
		capability: D(),
		repo: D(),
		stack: D()
	}), $L = M({
		komodoUrl: D(),
		reachable: A(),
		unreachableReason: D().optional(),
		viewer: ZL.optional(),
		repos: j(QL).default([]),
		resources: j(qL),
		servers: j(YL),
		alerts: j(XL),
		seenAt: k().optional()
	}), M({ capability: D() }), eR = I([
		"deploy",
		"restart",
		"start",
		"stop",
		"pull"
	]), M({
		capability: D(),
		kind: GL,
		id: D(),
		action: eR
	}), tR = M({
		capability: D(),
		kind: GL,
		id: D()
	}), tR.extend({ pick: of }), nR = M({
		stdout: D(),
		stderr: D()
	}), rR = M({ conversationId: D() }), iR = M({ seenAt: k() });
})), oR, sR, cR, lR, uR, dR, fR, pR, mR, hR, gR, _R, vR, yR, bR = v((() => {
	oR = /* @__PURE__ */ new Set([
		"exited",
		"dead",
		"restarting",
		"unhealthy"
	]), sR = /* @__PURE__ */ new Set([
		"ServerUnreachable",
		"SwarmUnhealthy",
		"BuildFailed",
		"RepoBuildFailed",
		"ProcedureFailed",
		"ActionFailed"
	]), cR = /* @__PURE__ */ new Set([
		"ServerCpu",
		"ServerMem",
		"ServerDisk"
	]), lR = /* @__PURE__ */ new Set([
		"DeploymentImageUpdateAvailable",
		"StackImageUpdateAvailable",
		"ResourceSyncPendingUpdates"
	]), uR = /* @__PURE__ */ new Set(["ContainerStateChange", "StackStateChange"]), dR = (e) => e.server === void 0 ? "" : ` on ${e.server}`, fR = (e) => e.resource ?? e.server ?? "something", pR = (e) => {
		if (e.type === "ServerUnreachable") return `${fR(e)} is unreachable`;
		if (uR.has(e.type)) {
			let t = e.from === void 0 ? "" : `${e.from} → `;
			return `${fR(e)} ${t}${e.to ?? "changed state"}${dR(e)}`;
		}
		return lR.has(e.type) ? `${fR(e)} has a newer image${dR(e)}` : sR.has(e.type) ? `${fR(e)} failed${dR(e)}` : cR.has(e.type) ? `${fR(e)} is high on ${e.type.replace("Server", "").toLowerCase()}` : `${fR(e)}: ${e.type}${dR(e)}`;
	}, mR = (e) => uR.has(e.type) ? e.to !== void 0 && oR.has(e.to) ? "danger" : void 0 : sR.has(e.type) ? "danger" : cR.has(e.type) ? "warning" : lR.has(e.type) ? "info" : void 0, hR = (e) => e.filter((e) => !e.resolved).flatMap((e) => {
		let t = mR(e);
		return t === void 0 ? [] : [{
			alert: e,
			tone: t,
			summary: pR(e)
		}];
	}).toSorted((e, t) => t.alert.ts - e.alert.ts), gR = (e, t) => e.filter((e) => e.alert.ts > (t ?? 0)), _R = {
		danger: 0,
		warning: 1,
		info: 2
	}, vR = (e) => {
		let t = e.reduce((e, t) => e === void 0 || _R[t.tone] < _R[e] ? t.tone : e, void 0);
		return t === void 0 ? [] : e.filter((e) => e.tone === t);
	}, yR = (e) => {
		let [t] = e;
		if (e.length === 1 && t !== void 0) return t.summary;
		let n = e[0]?.tone === "info" ? "updates available" : "needing you";
		return `${e.length} ${n}`;
	};
})), xR, SR, CR, wR, TR, ER, DR, OR, kR = v((() => {
	aR(), bR(), je(), xR = n(() => []), {state: SR, start: CR, refresh: wR} = t({
		host: Ae,
		everyMs: 6e4,
		immediate: !1,
		initial: () => /* @__PURE__ */ new Map(),
		read: async (e, t) => {
			let n = new Map(t);
			for (let t of xR.value) try {
				n.set(t, $L.parse(await e.backend.json(`komodo/${t}/overview`)));
			} catch {}
			return n;
		}
	}), TR = (e) => {
		let t = e.filter((e) => !xR.value.includes(e));
		xR.value = e, t.length > 0 && wR();
	}, ER = (e) => {
		let t = e.resources.filter((e) => e.state === "deploying").length;
		return t === 0 ? void 0 : `${t} deploying`;
	}, DR = (e) => {
		let t = SR.value.get(e);
		if (t === void 0) return;
		if (!t.reachable) return t.seenAt === void 0 ? {
			mark: "exclamation-circle",
			tone: "warning",
			tooltip: "can't reach Komodo"
		} : void 0;
		let n = ER(t), r = vR(gR(hR(t.alerts), t.seenAt));
		return r.length === 0 ? n === void 0 ? void 0 : { running: n } : {
			count: r.length,
			tone: r[0]?.tone ?? "info",
			tooltip: yR(r),
			...n === void 0 ? {} : { running: n }
		};
	}, OR = async (e) => {
		try {
			let t = Ae();
			if (!t.sandbox.reachable()) return;
			let { seenAt: n } = iR.parse(await t.backend.json(`komodo/${e}/seen`, { method: "POST" })), r = SR.value.get(e);
			r !== void 0 && (SR.value = new Map(SR.value).set(e, {
				...r,
				seenAt: n
			}));
		} catch {}
	};
})), AR, jR, MR, NR, PR = v((() => {
	AR = {
		role: "status",
		"aria-busy": "true",
		"aria-label": "Loading deployments"
	}, jR = { class: "min-w-0 flex-1" }, MR = { class: "flex h-5 items-center gap-2" }, NR = /*@__PURE__*/ d({
		__name: "DeploymentsSkeleton",
		setup(e) {
			let t = [
				{ name: "w-32" },
				{ name: "w-44" },
				{ name: "w-24" },
				{ name: "w-40" }
			];
			return (e, n) => (m(), s("div", AR, [u(g(_e), null, {
				label: _(() => [...n[0] ||= [c("span", { class: "flex h-4 items-center gap-3" }, [
					c("span", { class: "skeleton h-3 w-28" }),
					c("span", { class: "skeleton h-3.5 w-12 rounded-full" }),
					c("span", { class: "skeleton h-1.5 w-12 rounded-full" }),
					c("span", { class: "skeleton h-1.5 w-12 rounded-full" })
				], -1)]]),
				default: _(() => [(m(), s(r, null, ne(t, (e, t) => c("div", {
					key: t,
					class: "flex w-full items-center gap-3 border-l-4 border-line px-4 py-3"
				}, [
					n[3] ||= c("span", { class: "skeleton h-4 w-4 shrink-0 rounded-full" }, null, -1),
					c("div", jR, [c("div", MR, [c("span", { class: f(["skeleton h-3.5 max-w-full", e.name]) }, null, 2), n[1] ||= c("span", { class: "skeleton h-4 w-10 rounded" }, null, -1)]), n[2] ||= c("div", { class: "mt-0.5 flex h-4 items-center gap-2" }, [c("span", { class: "skeleton h-2.5 w-20" }), c("span", { class: "skeleton h-2.5 w-28" })], -1)]),
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
})), FR, IR = v((() => {
	PR(), PR(), FR = NR;
})), LR, RR, zR, BR, VR, HR, UR, WR, GR, KR, qR = v((() => {
	LR = { class: "px-4 py-3" }, RR = { class: "flex flex-wrap items-center gap-x-3 gap-y-2" }, zR = { class: "flex min-w-0 items-center gap-2.5" }, BR = { class: "min-w-0" }, VR = { class: "block truncate text-sm font-medium text-content" }, HR = { class: "block truncate font-mono text-2xs text-subtle" }, UR = { class: "ml-auto flex flex-wrap items-center gap-2" }, WR = { class: "text-2xs text-muted" }, GR = { class: "font-medium text-content" }, KR = /*@__PURE__*/ d({
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
			}))), ne = i(() => n.link.suggestions[0]), ie = (e) => {
				e !== void 0 && (f.value = !1, d("link", n.link.repo, e));
			};
			return (t, n) => {
				let i = re("tooltip");
				return m(), s("div", LR, [c("div", RR, [c("span", zR, [u(g(ue), {
					name: "folder",
					class: "shrink-0 text-muted"
				}), c("span", BR, [c("span", VR, h(e.link.repo), 1), ae((m(), s("span", HR, [l(h(e.link.projectName), 1)])), [[
					i,
					e.link.composePath,
					void 0,
					{ top: !0 }
				]])])]), c("span", UR, [e.link.linkedStack !== void 0 && !f.value ? (m(), s(r, { key: 0 }, [
					u(g(ve), {
						variant: "success",
						size: "xs",
						dot: "",
						label: e.link.linkedStack
					}, null, 8, ["label"]),
					u(g(se), {
						label: "Change",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[0] ||= (e) => f.value = !0
					}, null, 8, ["disabled"]),
					u(g(se), {
						label: "Unlink",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[1] ||= (t) => d("link", e.link.repo, "")
					}, null, 8, ["disabled"])
				], 64)) : f.value ? (m(), s(r, { key: 2 }, [u(g(he), {
					modelValue: p.value,
					"onUpdate:modelValue": [n[5] ||= (e) => p.value = e, ie],
					options: ee.value,
					disabled: e.busy,
					placeholder: "Choose a stack",
					"aria-label": "Komodo stack",
					class: "text-xs"
				}, null, 8, [
					"modelValue",
					"options",
					"disabled"
				]), u(g(se), {
					label: "Cancel",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy,
					onClick: n[6] ||= (e) => f.value = !1
				}, null, 8, ["disabled"])], 64)) : (m(), s(r, { key: 1 }, [ne.value === void 0 ? (m(), s(r, { key: 1 }, [n[8] ||= c("span", { class: "text-2xs text-subtle" }, "no stack matches this name", -1), u(g(se), {
					label: "Choose a stack",
					size: "small",
					severity: "secondary",
					text: "",
					disabled: e.busy || e.stacks.length === 0,
					onClick: n[4] ||= (e) => f.value = !0
				}, null, 8, ["disabled"])], 64)) : (m(), s(r, { key: 0 }, [
					c("span", WR, [n[7] ||= l(" looks like ", -1), c("span", GR, h(ne.value), 1)]),
					u(g(se), {
						label: "Link",
						size: "small",
						disabled: e.busy,
						onClick: n[2] ||= (t) => d("link", e.link.repo, ne.value)
					}, null, 8, ["disabled"]),
					u(g(se), {
						label: "Pick another",
						size: "small",
						severity: "secondary",
						text: "",
						disabled: e.busy,
						onClick: n[3] ||= (e) => f.value = !0
					}, null, 8, ["disabled"])
				], 64))], 64))])]), e.error ? (m(), a(g(de), {
					key: 0,
					of: g(be)(e.error),
					class: "mt-2"
				}, null, 8, ["of"])) : o("", !0)]);
			};
		}
	});
})), JR, YR = v((() => {
	qR(), qR(), JR = KR;
})), XR, ZR, QR, $R, ez, tz = v((() => {
	XR = {
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
	}, ZR = {
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
	}, QR = {
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
	}, $R = (e) => e >= 90 ? "bg-danger" : e >= 75 ? "bg-warning" : "bg-success", ez = (e) => e.split("/").at(-1) ?? e;
})), nz, rz, iz, az, oz, sz, cz, lz, uz, dz, fz, pz, mz, hz, gz, _z, vz, yz = v((() => {
	je(), tz(), nz = { class: "flex flex-wrap items-center gap-x-2 gap-y-1 font-normal" }, rz = { class: "truncate text-sm font-medium text-content" }, iz = {
		key: 0,
		class: "shrink-0 rounded border border-line px-2.5 py-1 text-2xs font-medium text-subtle"
	}, az = { class: "flex flex-wrap items-center gap-x-2 gap-y-0.5 text-2xs text-subtle" }, oz = { class: "truncate" }, sz = {
		key: 0,
		class: "truncate font-mono"
	}, cz = { class: "flex shrink-0 items-center gap-1" }, lz = ["href"], uz = {
		key: 1,
		class: "@container mb-3"
	}, dz = { class: "grid gap-x-6 gap-y-1 @lg:grid-cols-2" }, fz = { class: "shrink-0 font-medium text-content" }, pz = { class: "truncate font-mono text-subtle" }, mz = { class: "mb-3 flex flex-wrap items-center gap-2" }, hz = {
		key: 2,
		class: "flex flex-col gap-1.5",
		role: "status",
		"aria-busy": "true",
		"aria-label": "Reading logs"
	}, gz = { class: "flex flex-col gap-1.5 rounded-md border border-line bg-canvas px-3 py-2.5" }, _z = {
		key: 4,
		class: "text-2xs text-subtle"
	}, vz = /*@__PURE__*/ d({
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
			let n = e, d = t, p = Ce(() => Ae().models, "deployment-fix"), ee = () => {
				d("fix", n.resource, p.overridden.value ? p.model.value : void 0), p.clear();
			}, ie = i(() => XR[n.resource.state]), fe = te(!1), pe = () => {
				fe.value = !fe.value, fe.value && n.logs === void 0 && d("logs", n.resource);
			}, me = i(() => {
				if (n.resource.state !== "deploying") return n.resource.updateAvailable ? {
					action: "pull",
					label: "Update"
				} : {
					action: "deploy",
					label: "Redeploy"
				};
			}), he = i(() => n.resource.state === "running" || n.resource.state === "unhealthy" ? {
				action: "restart",
				label: "Restart"
			} : n.resource.state === "stopped" ? {
				action: "start",
				label: "Start"
			} : void 0), ge = [
				"w-11/12",
				"w-3/5",
				"w-3/4",
				"w-2/5",
				"w-5/6",
				"w-1/2"
			], _e = i(() => {
				let e = n.logs;
				return e === void 0 ? "" : [e.stdout, e.stderr].filter((e) => e.trim() !== "").join("\n");
			});
			return (t, n) => {
				let i = re("tooltip");
				return m(), a(g(le), {
					class: f(["border-l-4", ie.value.rowBorder]),
					density: "comfortable",
					body: "drawer",
					open: fe.value,
					"onUpdate:open": pe
				}, {
					lead: _(({ iconClass: e }) => [u(g(ue), {
						name: ie.value.icon,
						spin: ie.value.spin,
						class: f(["shrink-0", [e, ie.value.text]])
					}, null, 8, [
						"name",
						"spin",
						"class"
					])]),
					title: _(() => [c("span", nz, [
						c("span", rz, h(e.resource.name), 1),
						e.resource.kind === "stack" ? (m(), s("span", iz, " stack ")) : o("", !0),
						e.resource.updateAvailable ? (m(), a(g(ve), {
							key: 1,
							variant: "info",
							size: "xs",
							label: "new image",
							class: "shrink-0"
						})) : o("", !0)
					])]),
					description: _(() => [c("span", az, [c("span", oz, h(e.resource.status ?? ie.value.label), 1), e.resource.image ? ae((m(), s("span", sz, [l(h(g(ez)(e.resource.image)), 1)])), [[
						i,
						e.resource.image,
						void 0,
						{ top: !0 }
					]]) : o("", !0)])]),
					control: _(() => [c("div", cz, [
						me.value ? (m(), a(g(se), {
							key: 0,
							label: me.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							loading: e.busy,
							disabled: e.busy,
							onClick: n[0] ||= (t) => d("act", e.resource, me.value.action)
						}, null, 8, [
							"label",
							"loading",
							"disabled"
						])) : o("", !0),
						he.value ? (m(), a(g(se), {
							key: 1,
							label: he.value.label,
							size: "small",
							severity: "secondary",
							text: "",
							disabled: e.busy,
							onClick: n[1] ||= (t) => d("act", e.resource, he.value.action)
						}, null, 8, ["label", "disabled"])) : o("", !0),
						ae((m(), s("a", {
							href: e.resource.url,
							target: "_blank",
							rel: "noopener",
							class: f(g(Se).iconButton())
						}, [u(g(ue), {
							name: "arrow-up-right",
							class: "text-xs"
						})], 10, lz)), [[
							i,
							"Open in Komodo",
							void 0,
							{ top: !0 }
						]])
					])]),
					below: _(() => [
						e.error ? (m(), a(g(de), {
							key: 0,
							of: g(be)(e.error),
							class: "mb-3"
						}, null, 8, ["of"])) : o("", !0),
						e.resource.services.length > 0 ? (m(), s("div", uz, [c("div", { class: f(g(Se).sectionLabel("mb-1.5 text-2xs")) }, "Services", 2), c("div", dz, [(m(!0), s(r, null, ne(e.resource.services, (e) => (m(), s("div", {
							key: e.name,
							class: "flex min-w-0 items-baseline gap-2 text-2xs"
						}, [
							c("span", fz, h(e.name), 1),
							ae((m(), s("span", pz, [l(h(g(ez)(e.image)), 1)])), [[
								i,
								e.image,
								void 0,
								{ top: !0 }
							]]),
							e.updateAvailable ? ae((m(), a(g(ue), {
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
						c("div", mz, [
							u(g(oe), {
								label: "Ask the agent to fix",
								icon: "sparkles",
								picker: g(p),
								loading: e.busy,
								disabled: e.busy,
								onRun: ee
							}, null, 8, [
								"picker",
								"loading",
								"disabled"
							]),
							e.resource.state === "stopped" ? o("", !0) : (m(), a(g(se), {
								key: 0,
								label: "Stop",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.busy,
								onClick: n[2] ||= (t) => d("act", e.resource, "stop")
							}, null, 8, ["disabled"])),
							u(g(se), {
								label: "Refresh logs",
								size: "small",
								severity: "secondary",
								text: "",
								disabled: e.logsPending,
								onClick: n[3] ||= (t) => d("logs", e.resource)
							}, null, 8, ["disabled"])
						]),
						e.logsPending && _e.value === "" ? (m(), s("div", hz, [n[4] ||= c("span", { class: "skeleton h-2.5 w-24" }, null, -1), c("div", gz, [(m(), s(r, null, ne(ge, (e, t) => c("span", {
							key: t,
							class: f(["skeleton h-2.5", e])
						}, null, 2)), 64))])])) : _e.value === "" ? (m(), s("div", _z, "No log output.")) : (m(), a(g(ce), {
							key: 3,
							code: _e.value,
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
})), bz, xz = v((() => {
	yz(), yz(), bz = vz;
})), Sz, Cz, wz, Tz, Ez, Dz, Oz = v((() => {
	tz(), Sz = { class: "flex flex-wrap items-center gap-x-3 gap-y-1.5" }, Cz = { class: "text-2xs text-subtle" }, wz = { class: "h-1.5 w-12 overflow-hidden rounded-full bg-line" }, Tz = { class: "text-2xs text-subtle" }, Ez = ["href"], Dz = /*@__PURE__*/ d({
		__name: "ServerMeta",
		props: { server: {} },
		setup(e) {
			let t = i(() => ZR[e.server.state]), n = i(() => [
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
			return (i, a) => (m(), s("div", Sz, [
				u(g(ve), {
					variant: t.value.variant,
					label: t.value.label,
					size: "xs",
					dot: ""
				}, null, 8, ["variant", "label"]),
				(m(!0), s(r, null, ne(n.value, (e) => (m(), s("span", {
					key: e.label,
					class: "flex items-center gap-1.5"
				}, [
					c("span", Cz, h(e.label), 1),
					c("span", wz, [c("span", {
						class: f(["block h-full rounded-full", g($R)(e.value)]),
						style: p({ width: `${e.value}%` })
					}, null, 6)]),
					c("span", Tz, h(e.value) + "%", 1)
				]))), 128)),
				c("a", {
					href: e.server.url,
					target: "_blank",
					rel: "noopener",
					class: "flex items-center gap-1 text-2xs text-subtle hover:text-link"
				}, [a[0] ||= l(" Komodo ", -1), u(g(ue), { name: "arrow-up-right" })], 8, Ez)
			]));
		}
	});
})), kz, Az = v((() => {
	Oz(), Oz(), kz = Dz;
})), jz, Mz, Nz, Pz, Fz, Iz = v((() => {
	je(), tz(), jz = { class: "flex flex-col gap-1" }, Mz = { class: "flex items-start gap-2" }, Nz = { class: "min-w-0 flex-1 text-sm text-content" }, Pz = { class: "whitespace-nowrap text-2xs text-subtle" }, Fz = /*@__PURE__*/ d({
		__name: "IncidentRow",
		props: {
			incident: {},
			resource: {},
			failure: {}
		},
		emits: ["fix"],
		setup(e, { emit: t }) {
			let n = t, r = Ce(() => Ae().models, "deployment-fix"), i = () => {
				e.resource !== void 0 && (n("fix", e.resource, r.overridden.value ? r.model.value : void 0), r.clear());
			};
			return (t, n) => (m(), s("div", jz, [c("div", Mz, [
				c("span", { class: f(["mt-1.5 h-2 w-2 shrink-0 rounded-full", g(QR)[e.incident.tone].dot]) }, null, 2),
				c("span", Nz, [l(h(e.incident.summary) + " ", 1), c("span", Pz, h(g(xe)(e.incident.alert.ts)), 1)]),
				e.resource ? (m(), a(g(oe), {
					key: 0,
					label: "Ask the agent",
					icon: "sparkles",
					class: "-my-1 shrink-0",
					severity: "secondary",
					text: "",
					picker: g(r),
					onRun: i
				}, null, 8, ["picker"])) : o("", !0)
			]), e.failure ? (m(), a(g(de), {
				key: 0,
				of: g(be)(e.failure)
			}, null, 8, ["of"])) : o("", !0)]));
		}
	});
})), Lz, Rz = v((() => {
	Iz(), Iz(), Lz = Fz;
}));
//#endregion
//#region src/useDeploymentBoard.ts
function zz(e) {
	let t = Ae(), n = Ee(), r = i(() => t.sandbox.key("komodo-overview", e.value)), a = i(() => t.sandbox.reachable()), o = Te({
		queryKey: r,
		queryFn: async () => $L.parse(await t.backend.json(`komodo/${e.value}/overview`)),
		enabled: a,
		refetchInterval: Bz
	}), s = () => n.invalidateQueries({ queryKey: r.value }), c = we({
		mutationFn: (n) => t.backend.json(`komodo/${e.value}/action`, Vz({
			kind: n.resource.kind,
			id: n.resource.id,
			action: n.action
		})),
		onSuccess: s
	}), l = we({
		mutationFn: (n) => t.backend.json(`komodo/${e.value}/link`, Vz(n)),
		onSuccess: s
	}), u = we({ mutationFn: async (n) => nR.parse(await t.backend.json(`komodo/${e.value}/logs`, Vz({
		kind: n.kind,
		id: n.id
	}))) }), d = we({ mutationFn: async ({ resource: n, pick: r }) => rR.parse(await t.backend.json(`komodo/${e.value}/fix`, Vz({
		kind: n.kind,
		id: n.id,
		...r === void 0 ? {} : { pick: sf(r) }
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
var Bz, Vz, Hz = v((() => {
	UL(), aR(), je(), Bz = 1e4, Vz = (e) => ({
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(e)
	});
})), Uz, Wz, Gz, Kz, qz, Jz, Yz, Xz, Zz, Qz = v((() => {
	oI(), je(), kR(), IR(), bR(), YR(), xz(), Az(), tz(), Rz(), Hz(), Uz = {
		key: 0,
		class: "mt-2 font-mono text-2xs"
	}, Wz = { class: "flex items-center gap-2" }, Gz = { class: "mt-2 flex flex-col gap-2" }, Kz = { class: "flex flex-col gap-6" }, qz = { class: "font-medium text-content" }, Jz = { class: "mt-1" }, Yz = { class: "text-sm font-medium text-content" }, Xz = "Not on a server", Zz = /*@__PURE__*/ d({
		__name: "DeploymentsView",
		props: { capability: {} },
		setup(e) {
			let t = e, n = i(() => t.capability ?? "komodo"), { board: l, error: d, isPending: p, act: re, link: ae, logs: oe, fix: ce, refetch: le } = zz(ie(n));
			ee(() => void OR(n.value));
			let he = i(() => vR(hR(l.value?.alerts ?? []))), ve = i(() => he.value[0]?.tone), xe = i(() => l.value?.resources ?? []), Ce = i(() => l.value?.servers ?? []), we = Ae(), Te = i(() => l.value?.repos ?? []), Ee = i(() => Te.value.filter((e) => we.workspace.inProject(e.repo))), De = i(() => Te.value.length - Ee.value.length), v = i(() => xe.value.filter((e) => e.kind === "stack").map((e) => e.name)), Oe = i(() => l.value === void 0 ? void 0 : `${l.value.komodoUrl}/stacks`), ke = i(() => {
				if (xe.value.length > 0 || l.value === void 0 || !l.value.reachable) return;
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
			}), je = i(() => {
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
			}), Me = i(() => {
				let e = /* @__PURE__ */ new Map();
				for (let t of xe.value) {
					let n = t.server ?? Xz;
					e.set(n, [...e.get(n) ?? [], t]);
				}
				let t = new Set(Ce.value.map((e) => e.name));
				return [...Ce.value.map((t) => ({
					label: t.name,
					server: t,
					resources: e.get(t.name) ?? []
				})), ...[...e.entries()].filter(([e]) => !t.has(e)).map(([e, t]) => ({
					label: e,
					server: void 0,
					resources: t
				}))];
			}), Ne = i(() => Me.value.filter((e) => e.resources.length > 0)), Pe = i(() => Me.value.flatMap((e) => e.resources.length === 0 && e.server !== void 0 ? [e.server] : [])), Fe = te(void 0), Ie = te(/* @__PURE__ */ new Map()), Le = te(void 0), Re = te(/* @__PURE__ */ new Map()), ze = (e) => {
				let t = new Map(Re.value);
				t.delete(e), Re.value = t;
			}, Be = (e, t) => {
				Re.value = new Map(Re.value).set(e, aI(t));
			}, Ve = async (e, t) => {
				Fe.value = e.id, ze(e.id);
				try {
					await re.mutateAsync({
						resource: e,
						action: t
					});
				} catch (t) {
					Be(e.id, t);
				} finally {
					Fe.value = void 0;
				}
			}, He = async (e) => {
				Le.value = e.id, ze(e.id);
				try {
					Ie.value = new Map(Ie.value).set(e.id, await oe.mutateAsync(e));
				} catch (t) {
					Be(e.id, t);
				} finally {
					Le.value = void 0;
				}
			}, Ue = async (e, t, n) => {
				Fe.value = e.id, ze(t);
				try {
					let { conversationId: t } = await ce.mutateAsync({
						resource: e,
						pick: n
					});
					window.location.assign(`/agents?focus=${encodeURIComponent(t)}`);
				} catch (e) {
					Be(t, e);
				} finally {
					Fe.value = void 0;
				}
			}, We = (e) => e === void 0 ? void 0 : xe.value.find((t) => t.name === e), Ge = te(void 0), Ke = async (e, t) => {
				Ge.value = e, ze(e);
				try {
					await ae.mutateAsync({
						repo: e,
						stack: t
					});
				} catch (t) {
					Be(e, t);
				} finally {
					Ge.value = void 0;
				}
			};
			return (e, t) => (m(), a(g(fe), { width: "wide" }, {
				default: _(() => [
					u(g(me), { title: "Deployments" }, {
						info: _(() => [!g(p) && g(l)?.reachable && xe.value.length > 0 ? (m(), a(g(ye), {
							key: 0,
							items: je.value,
							class: "ml-2"
						}, null, 8, ["items"])) : o("", !0)]),
						actions: _(() => [u(g(ge), {
							project: g(we).workspace.project(),
							hidden: De.value,
							noun: "repositories",
							onClear: t[0] ||= (e) => g(we).workspace.setProject(void 0)
						}, null, 8, ["project", "hidden"]), Oe.value === void 0 ? o("", !0) : (m(), a(g(pe), {
							key: 0,
							icon: "box",
							label: "Open Komodo stacks",
							href: Oe.value
						}, null, 8, ["href"]))]),
						_: 1
					}),
					g(d) && g(l) !== void 0 ? (m(), a(g(de), {
						key: 0,
						of: g(be)(g(d)),
						class: "mb-4"
					}, null, 8, ["of"])) : o("", !0),
					g(p) ? (m(), a(FR, { key: 1 })) : g(l) === void 0 ? (m(), a(g(de), {
						key: 2,
						of: {
							tone: "danger",
							title: "Couldn't load this Komodo connection",
							detail: g(d) ?? "The sandbox did not answer.",
							action: {
								label: "Try again",
								run: () => void g(le)()
							}
						}
					}, null, 8, ["of"])) : g(l).reachable ? (m(), s(r, { key: 4 }, [ve.value ? (m(), s("div", {
						key: 0,
						class: f(["mb-6 rounded-lg border px-4 py-3", g(QR)[ve.value].panel])
					}, [c("div", Wz, [u(g(ue), {
						name: "exclamation-circle",
						class: f(["text-sm", g(QR)[ve.value].text])
					}, null, 8, ["class"]), t[2] ||= c("span", { class: "text-sm font-semibold text-content" }, "Needs you", -1)]), c("div", Gz, [(m(!0), s(r, null, ne(he.value, (e) => (m(), a(Lz, {
						key: e.alert.id,
						incident: e,
						resource: We(e.alert.resource),
						failure: Re.value.get(e.alert.id),
						onFix: (t, n) => Ue(t, e.alert.id, n)
					}, null, 8, [
						"incident",
						"resource",
						"failure",
						"onFix"
					]))), 128))])], 2)) : o("", !0), c("div", Kz, [ke.value ? (m(), s("div", {
						key: 0,
						class: f(g(Se).emptyState("text-left"))
					}, [c("div", qz, h(ke.value.title), 1), c("div", Jz, h(ke.value.detail), 1)], 2)) : (m(), s(r, { key: 1 }, [(m(!0), s(r, null, ne(Ne.value, (e) => (m(), a(g(_e), {
						key: e.label,
						label: e.label
					}, {
						info: _(() => [e.server ? (m(), a(kz, {
							key: 0,
							server: e.server
						}, null, 8, ["server"])) : o("", !0)]),
						default: _(() => [(m(!0), s(r, null, ne(e.resources, (e) => (m(), a(bz, {
							key: e.id,
							resource: e,
							busy: Fe.value === e.id,
							logs: Ie.value.get(e.id),
							"logs-pending": Le.value === e.id,
							error: Re.value.get(e.id),
							onAct: Ve,
							onLogs: He,
							onFix: (e, t) => Ue(e, e.id, t)
						}, null, 8, [
							"resource",
							"busy",
							"logs",
							"logs-pending",
							"error",
							"onFix"
						]))), 128))]),
						_: 2
					}, 1032, ["label"]))), 128)), Pe.value.length > 0 ? (m(), a(g(_e), {
						key: 0,
						label: "Other hosts",
						caption: "Connected to this Komodo with nothing deployed on them."
					}, {
						default: _(() => [(m(!0), s(r, null, ne(Pe.value, (e) => (m(), s("div", {
							key: e.id,
							class: "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3"
						}, [c("span", Yz, h(e.name), 1), u(kz, {
							server: e,
							class: "ml-auto"
						}, null, 8, ["server"])]))), 128))]),
						_: 1
					})) : o("", !0)], 64)), Ee.value.length > 0 ? (m(), a(g(_e), {
						key: 2,
						label: "Your repos",
						caption: "Which Komodo stack each repo in this workspace deploys to."
					}, {
						default: _(() => [(m(!0), s(r, null, ne(Ee.value, (e) => (m(), a(JR, {
							key: e.repo,
							link: e,
							stacks: v.value,
							busy: Ge.value === e.repo,
							error: Re.value.get(e.repo),
							onLink: Ke
						}, null, 8, [
							"link",
							"stacks",
							"busy",
							"error"
						]))), 128))]),
						_: 1
					})) : o("", !0)])], 64)) : (m(), a(g(de), {
						key: 3,
						class: "px-4 py-3",
						of: {
							tone: "warning",
							title: `Can't reach Komodo at ${g(l).komodoUrl}`,
							detail: "Nothing below is current, this is not a report that your deployments are down, only that we couldn't ask."
						}
					}, {
						default: _(() => [g(l).unreachableReason ? (m(), s("div", Uz, h(g(l).unreachableReason), 1)) : o("", !0), u(g(se), {
							class: "mt-3",
							label: "Try again",
							size: "small",
							severity: "secondary",
							onClick: t[1] ||= (e) => g(le)()
						})]),
						_: 1
					}, 8, ["of"]))
				]),
				_: 1
			}));
		}
	});
})), $z = /* @__PURE__ */ Oe({ default: () => eB }), eB, tB = v((() => {
	Qz(), Qz(), eB = Zz;
}));
je(), kR();
var nB = (e, t) => {
	ke(e), t.subscriptions.push(CR()), t.subscriptions.push(e.views.register({
		id: "deployments",
		label: "Deployments",
		surface: "rail",
		detect: (e, t) => {
			let n = t.filter((e) => e.kind === "cli" && e.config.provider === "komodo").map((e) => e.id);
			return TR(n), n.map((e) => ({
				key: e,
				title: n.length === 1 ? "Deployments" : `Deployments · ${e}`,
				icon: "box",
				props: { capability: e }
			}));
		},
		badge: (e) => DR(e.key),
		view: async () => (await Promise.resolve().then(() => (tB(), $z))).default
	}));
}, rB = {
	$schema: "https://intentic.dev/intentic-extension.schema.json",
	publisher: "intentic",
	name: "deployments",
	version: "1.0.0",
	category: "work",
	icon: "box",
	engines: { intentic: "^2.20.0" },
	entry: "dist/extension.js",
	server: "dist/server.js",
	permissions: {
		sandbox: ["GET /settings"],
		daemon: ["GET /capabilities/*/connection", "POST /agent"]
	},
	contributes: {
		capabilities: [{
			id: "komodo",
			kind: "cli",
			catalog: {
				name: "Komodo",
				icon: "box",
				description: "Drive your Komodo stacks and deployments.",
				category: "deploy",
				hint: "An API key inherits its user's permissions: a read-only agent wants a non-admin user.",
				guide: {
					urlFromField: "url",
					path: "/profile",
					linkLabel: "Open your Komodo profile",
					scopes: "the key inherits the user's permissions",
					steps: [
						"Set the `Komodo URL` above first.",
						"Profile (top-right) → `Api Keys` → `New Api Key`.",
						"Copy both the key and the secret here: shown once.",
						"Read-only agent: make the key on a `Read`-only user."
					]
				}
			},
			fields: [
				{
					key: "url",
					label: "Komodo URL",
					placeholder: "https://komodo.example.com"
				},
				{
					key: "apiKey",
					label: "API key"
				},
				{
					key: "apiSecret",
					label: "API secret",
					secret: !0
				}
			],
			env: {
				KOMODO_ADDRESS: "${url}",
				KOMODO_API_KEY: "${apiKey}",
				KOMODO_API_SECRET: "${apiSecret}"
			},
			hosts: ["${url}"],
			skill: "skills/komodo/SKILL.md",
			probe: {
				url: "${url}/auth",
				method: "POST",
				headers: {
					"X-Api-Key": "${apiKey}",
					"X-Api-Secret": "${apiSecret}"
				}
			}
		}],
		automationTemplates: [{
			id: "komodo-alert",
			title: "Deployment alert",
			icon: "box",
			requires: ["komodo"],
			trigger: { kind: "event" },
			prompt: "Komodo just fired an alert, the payload is in $AUTOMATION_PAYLOAD: `level` is the severity, `target` names the resource ({type, id}), `data` carries the specifics, and `resolved` is true when this is the all-clear for an earlier alert. Use your Komodo capability to look up that resource and its recent container logs, then say what broke and what would fix it. Do not deploy, restart or stop anything unless the user asks.",
			setup: "In Komodo: Alerters → New Alerter → endpoint type Custom → paste this URL. Narrow it with the alerter's alert-type and resource filters."
		}],
		views: [{
			id: "deployments",
			label: "Deployments",
			surface: "rail",
			badge: !0
		}]
	}
};
//#endregion
//#region src/manifest.ts
zO();
var iB = PO.parse(rB);
//#endregion
export { nB as activate, iB as manifest };
