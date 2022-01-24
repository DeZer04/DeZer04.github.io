! function(t) {
    t.fn.tagify = function(e = {}) {
            return this.each((function() {
                var i, s = t(this);
                if (s.data("tagify")) return this;
                e.isJQueryPlugin = !0, i = new Tagify(s[0], e), s.data("tagify", i)
            }))
        },
        function(t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Tagify = e() }(this, (function() {
            "use strict";
            const t = (t, e, i, s) => (t = "" + t, e = "" + e, s && (t = t.trim(), e = e.trim()), i ? t == e : t.toLowerCase() == e.toLowerCase());

            function e(t) { var e = document.createElement("div"); return t.replace(/\&#?[0-9a-z]+;/gi, (function(t) { return e.innerHTML = t, e.innerText })) }

            function i(t, e) {
                for (e = e || "previous"; t = t[e + "Sibling"];)
                    if (3 == t.nodeType) return t
            }

            function s(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/`|'/g, "&#039;") }

            function a(t) { return t instanceof Array }

            function n(t) { var e = Object.prototype.toString.call(t).split(" ")[1].slice(0, -1); return t === Object(t) && "Array" != e && "Function" != e && "RegExp" != e && "HTMLUnknownElement" != e }

            function o(t, e, i) {
                function s(t, e) {
                    for (var i in e)
                        if (e.hasOwnProperty(i)) {
                            if (n(e[i])) { n(t[i]) ? s(t[i], e[i]) : t[i] = Object.assign({}, e[i]); continue }
                            if (a(e[i])) { t[i] = Object.assign([], e[i]); continue }
                            t[i] = e[i]
                        }
                }
                return t instanceof Object || (t = {}), s(t, e), i && s(t, i), t
            }

            function r(t) { return String.prototype.normalize ? "string" == typeof t ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : void 0 : t }
            var l, d = () => /(?=.*chrome)(?=.*android)/i.test(navigator.userAgent),
                h = {
                    init() { this.DOM.dropdown = this.parseTemplate("dropdown", [this.settings]), this.DOM.dropdown.content = this.DOM.dropdown.querySelector(this.settings.classNames.dropdownWrapperSelector) },
                    show(e) {
                        var i, s, a, o = this.settings,
                            r = "mix" == o.mode && !o.enforceWhitelist,
                            l = !o.whitelist || !o.whitelist.length,
                            d = "manual" == o.dropdown.position;
                        if (e = void 0 === e ? this.state.inputText : e, (!l || r || o.templates.dropdownItemNoMatch) && !1 !== o.dropdown.enable && !this.state.isLoading) {
                            if (clearTimeout(this.dropdownHide__bindEventsTimeout), this.suggestedListItems = this.dropdown.filterListItems.call(this, e), e && !this.suggestedListItems.length && (this.trigger("dropdown:noMatch", e), o.templates.dropdownItemNoMatch && (a = o.templates.dropdownItemNoMatch.call(this, { value: e }))), !a) {
                                if (this.suggestedListItems.length) e && r && !this.state.editing.scope && !t(this.suggestedListItems[0].value, e) && this.suggestedListItems.unshift({ value: e });
                                else {
                                    if (!e || !r || this.state.editing.scope) return this.input.autocomplete.suggest.call(this), void this.dropdown.hide.call(this);
                                    this.suggestedListItems = [{ value: e }]
                                }
                                s = "" + (n(i = this.suggestedListItems[0]) ? i.value : i), o.autoComplete && s && 0 == s.indexOf(e) && this.input.autocomplete.suggest.call(this, i)
                            }
                            this.dropdown.fill.call(this, a), o.dropdown.highlightFirst && this.dropdown.highlightOption.call(this, this.DOM.dropdown.content.children[0]), this.state.dropdown.visible || setTimeout(this.dropdown.events.binding.bind(this)), this.state.dropdown.visible = e || !0, this.state.dropdown.query = e, this.setStateSelection(), d || setTimeout(() => { this.dropdown.position.call(this), this.dropdown.render.call(this) }), setTimeout(() => { this.trigger("dropdown:show", this.DOM.dropdown) })
                        }
                    },
                    hide(t) {
                        var e = this.DOM,
                            i = e.scope,
                            s = e.dropdown,
                            a = "manual" == this.settings.dropdown.position && !t;
                        if (s && document.body.contains(s) && !a) return window.removeEventListener("resize", this.dropdown.position), this.dropdown.events.binding.call(this, !1), i.setAttribute("aria-expanded", !1), s.parentNode.removeChild(s), setTimeout(() => { this.state.dropdown.visible = !1 }, 100), this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null, this.state.tag && this.state.tag.value.length && (this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag), this.trigger("dropdown:hide", s), this
                    },
                    render() {
                        var t, e, i = ((e = this.DOM.dropdown.cloneNode(!0)).style.cssText = "position:fixed; top:-9999px; opacity:0", document.body.appendChild(e), t = e.clientHeight, e.parentNode.removeChild(e), t),
                            s = this.settings;
                        return this.DOM.scope.setAttribute("aria-expanded", !0), document.body.contains(this.DOM.dropdown) || (this.DOM.dropdown.classList.add(s.classNames.dropdownInital), this.dropdown.position.call(this, i), s.dropdown.appendTarget.appendChild(this.DOM.dropdown), setTimeout(() => this.DOM.dropdown.classList.remove(s.classNames.dropdownInital))), this
                    },
                    fill(t) {
                        var e;
                        t = "string" == typeof t ? t : this.dropdown.createListHTML.call(this, t || this.suggestedListItems), this.DOM.dropdown.content.innerHTML = (e = t) ? e.replace(/\>[\r\n ]+\</g, "><").replace(/(<.*?>)|\s+/g, (t, e) => e || " ") : ""
                    },
                    refilter(t) { t = t || this.state.dropdown.query || "", this.suggestedListItems = this.dropdown.filterListItems.call(this, t), this.dropdown.fill.call(this), this.suggestedListItems.length || this.dropdown.hide.call(this), this.trigger("dropdown:updated", this.DOM.dropdown) },
                    position(t) {
                        var e = this.settings.dropdown;
                        if ("manual" != e.position) {
                            var i, s, a, n, o, r, l = this.DOM.dropdown,
                                d = e.placeAbove,
                                h = document.documentElement.clientHeight,
                                g = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 480 ? e.position : "all",
                                c = this.DOM["input" == g ? "input" : "scope"];
                            t = t || l.clientHeight, this.state.dropdown.visible && ("text" == g ? (a = (i = this.getCaretGlobalPosition()).bottom, s = i.top, n = i.left, o = "auto") : (r = function(t) { for (var e = 0, i = 0; t;) e += t.offsetLeft || 0, i += t.offsetTop || 0, t = t.parentNode; return { left: e, top: i } }(this.settings.dropdown.appendTarget), s = (i = c.getBoundingClientRect()).top - r.top, a = i.bottom - 1 - r.top, n = i.left - r.left, o = i.width + "px"), s = Math.floor(s), a = Math.ceil(a), d = void 0 === d ? h - i.bottom < t : d, l.style.cssText = "left:" + (n + window.pageXOffset) + "px; width:" + o + ";" + (d ? "top: " + (s + window.pageYOffset) + "px" : "top: " + (a + window.pageYOffset) + "px"), l.setAttribute("placement", d ? "top" : "bottom"), l.setAttribute("position", g))
                        }
                    },
                    events: {
                        binding(t = !0) {
                            var e = this.dropdown.events.callbacks,
                                i = this.listeners.dropdown = this.listeners.dropdown || { position: this.dropdown.position.bind(this), onKeyDown: e.onKeyDown.bind(this), onMouseOver: e.onMouseOver.bind(this), onMouseLeave: e.onMouseLeave.bind(this), onClick: e.onClick.bind(this), onScroll: e.onScroll.bind(this) },
                                s = t ? "addEventListener" : "removeEventListener";
                            "manual" != this.settings.dropdown.position && (window[s]("resize", i.position), window[s]("keydown", i.onKeyDown)), this.DOM.dropdown[s]("mouseover", i.onMouseOver), this.DOM.dropdown[s]("mouseleave", i.onMouseLeave), this.DOM.dropdown[s]("mousedown", i.onClick), this.DOM.dropdown.content[s]("scroll", i.onScroll)
                        },
                        callbacks: {
                            onKeyDown(t) {
                                var e = this.DOM.dropdown.querySelector(this.settings.classNames.dropdownItemActiveSelector),
                                    i = this.dropdown.getSuggestionDataByNode.call(this, e);
                                switch (t.key) {
                                    case "ArrowDown":
                                    case "ArrowUp":
                                    case "Down":
                                    case "Up":
                                        var s;
                                        t.preventDefault(), e && (e = e[("ArrowUp" == t.key || "Up" == t.key ? "previous" : "next") + "ElementSibling"]), e || (s = this.DOM.dropdown.content.children, e = s["ArrowUp" == t.key || "Up" == t.key ? s.length - 1 : 0]), i = this.dropdown.getSuggestionDataByNode.call(this, e), this.dropdown.highlightOption.call(this, e, !0);
                                        break;
                                    case "Escape":
                                    case "Esc":
                                        this.dropdown.hide.call(this);
                                        break;
                                    case "ArrowRight":
                                        if (this.state.actions.ArrowLeft) return;
                                    case "Tab":
                                        if ("mix" != this.settings.mode && e && !this.settings.autoComplete.rightKey && !this.state.editing) { t.preventDefault(); var a = this.dropdown.getMappedValue.call(this, i); return this.input.autocomplete.set.call(this, a), !1 }
                                        return !0;
                                    case "Enter":
                                        t.preventDefault(), this.settings.hooks.suggestionClick(t, { tagify: this, tagData: i, suggestionElm: e }).then(() => { e ? this.dropdown.selectOption.call(this, e) : this.dropdown.hide.call(this) }).catch(t => t);
                                        break;
                                    case "Backspace":
                                        { if ("mix" == this.settings.mode || this.state.editing.scope) return; let t = this.state.inputText.trim(); "" != t && 8203 != t.charCodeAt(0) || (!0 === this.settings.backspace ? this.removeTags() : "edit" == this.settings.backspace && setTimeout(this.editTag.bind(this), 0)) }
                                }
                            },
                            onMouseOver(t) {
                                var e = t.target.closest(this.settings.classNames.dropdownItemSelector);
                                e && this.dropdown.highlightOption.call(this, e)
                            },
                            onMouseLeave(t) { this.dropdown.highlightOption.call(this) },
                            onClick(t) {
                                if (0 == t.button && t.target != this.DOM.dropdown && t.target != this.DOM.dropdown.content) {
                                    var e = t.target.closest(this.settings.classNames.dropdownItemSelector),
                                        i = this.dropdown.getSuggestionDataByNode.call(this, e);
                                    this.state.actions.selectOption = !0, setTimeout(() => this.state.actions.selectOption = !1, 50), this.settings.hooks.suggestionClick(t, { tagify: this, tagData: i, suggestionElm: e }).then(() => { e ? this.dropdown.selectOption.call(this, e) : this.dropdown.hide.call(this) }).catch(t => t)
                                }
                            },
                            onScroll(t) {
                                var e = t.target,
                                    i = e.scrollTop / (e.scrollHeight - e.parentNode.clientHeight) * 100;
                                this.trigger("dropdown:scroll", { percentage: Math.round(i) })
                            }
                        }
                    },
                    getSuggestionDataByNode(t) { var e = t ? +t.getAttribute("tagifySuggestionIdx") : -1; return this.suggestedListItems[e] || null },
                    highlightOption(t, e) {
                        var i, s = this.settings.classNames.dropdownItemActive;
                        if (this.state.ddItemElm && (this.state.ddItemElm.classList.remove(s), this.state.ddItemElm.removeAttribute("aria-selected")), !t) return this.state.ddItemData = null, this.state.ddItemElm = null, void this.input.autocomplete.suggest.call(this);
                        i = this.suggestedListItems[this.getNodeIndex(t)], this.state.ddItemData = i, this.state.ddItemElm = t, t.classList.add(s), t.setAttribute("aria-selected", !0), e && (t.parentNode.scrollTop = t.clientHeight + t.offsetTop - t.parentNode.clientHeight), this.settings.autoComplete && (this.input.autocomplete.suggest.call(this, i), this.dropdown.position.call(this))
                    },
                    selectOption(t) {
                        var e = this.settings.dropdown,
                            i = e.clearOnSelect,
                            s = e.closeOnSelect;
                        if (!t) return this.addTags(this.state.inputText, !0), void(s && this.dropdown.hide.call(this));
                        var a = t.getAttribute("tagifySuggestionIdx"),
                            n = this.suggestedListItems[+a];
                        if (this.trigger("dropdown:select", { data: n, elm: t }), a && n) {
                            if (this.state.editing ? this.onEditTagDone(null, o({ __isValid: !0 }, n)) : this["mix" == this.settings.mode ? "addMixTags" : "addTags"]([n], i), setTimeout(() => { this.DOM.input.focus(), this.toggleFocusClass(!0) }), s) return this.dropdown.hide.call(this);
                            this.dropdown.refilter.call(this)
                        } else this.dropdown.hide.call(this)
                    },
                    selectAll() { return this.suggestedListItems.length = 0, this.dropdown.hide.call(this), this.addTags(this.dropdown.filterListItems.call(this, ""), !0), this },
                    filterListItems(t, e) {
                        var i, s, a, o, l, d = this.settings,
                            h = d.dropdown,
                            g = (e = e || {}, []),
                            c = d.whitelist,
                            p = h.maxItems || 1 / 0,
                            u = h.searchKeys,
                            m = 0;
                        if (!t || !u.length || "select" == d.mode) return (d.duplicates ? c : c.filter(t => !this.isTagDuplicate(n(t) ? t.value : t))).slice(0, p);

                        function v(t, e) { return e.toLowerCase().split(" ").every(e => t.includes(e.toLowerCase())) }
                        for (l = h.caseSensitive ? "" + t : ("" + t).toLowerCase(); m < c.length; m++) { i = c[m] instanceof Object ? c[m] : { value: c[m] }; let t = Object.keys(i).some(t => u.includes(t)) ? u : ["value"]; if (h.fuzzySearch && !e.exact ? (a = t.reduce((t, e) => t + " " + (i[e] || ""), "").toLowerCase(), h.accentedSearch && (a = r(a), l = r(l)), s = v(a, l)) : s = t.some(t => { var s = "" + (i[t] || ""); return h.accentedSearch && (s = r(s), l = r(l)), h.caseSensitive || (s = s.toLowerCase()), e.exact ? s == l : 0 == s.indexOf(l) }), o = !d.duplicates && this.isTagDuplicate(n(i) ? i.value : i), s && !o && p-- && g.push(i), 0 == p) break }
                        return g
                    },
                    getMappedValue(t) { var e = this.settings.dropdown.mapValueTo; return e ? "function" == typeof e ? e(t) : t[e] || t.value : t.value },
                    createListHTML(t) {
                        return o([], t).map((t, e) => {
                            "string" != typeof t && "number" != typeof t || (t = { value: t });
                            var i = this.dropdown.getMappedValue.call(this, t);
                            t.value = i && "string" == typeof i ? s(i) : i;
                            var a = this.settings.templates.dropdownItem.call(this, t);
                            return a.replace(/\s*tagifySuggestionIdx=(["'])(.*?)\1/gim, "").replace(">", ` tagifySuggestionIdx="${e}">`)
                        }).join("")
                    }
                },
                g = { delimiters: ",", pattern: null, tagTextProp: "value", maxTags: 1 / 0, callbacks: {}, addTagOnBlur: !0, duplicates: !1, whitelist: [], blacklist: [], enforceWhitelist: !1, keepInvalidTags: !1, mixTagsAllowedAfter: /,|\.|\:|\s/, mixTagsInterpolator: ["[[", "]]"], backspace: !0, skipInvalid: !1, editTags: { clicks: 2, keepInvalid: !0 }, transformTag: () => {}, trim: !0, mixMode: { insertAfterTag: " " }, autoComplete: { enabled: !0, rightKey: !1 }, classNames: { namespace: "tagify", mixMode: "tagify--mix", selectMode: "tagify--select", input: "tagify__input", focus: "tagify--focus", tag: "tagify__tag", tagNoAnimation: "tagify--noAnim", tagInvalid: "tagify--invalid", tagNotAllowed: "tagify--notAllowed", inputInvalid: "tagify__input--invalid", tagX: "tagify__tag__removeBtn", tagText: "tagify__tag-text", dropdown: "tagify__dropdown", dropdownWrapper: "tagify__dropdown__wrapper", dropdownItem: "tagify__dropdown__item", dropdownItemActive: "tagify__dropdown__item--active", dropdownInital: "tagify__dropdown--initial", scopeLoading: "tagify--loading", tagLoading: "tagify__tag--loading", tagEditing: "tagify__tag--editable", tagFlash: "tagify__tag--flash", tagHide: "tagify__tag--hide", hasMaxTags: "tagify--hasMaxTags", hasNoTags: "tagify--noTags", empty: "tagify--empty" }, dropdown: { classname: "", enabled: 2, maxItems: 10, searchKeys: ["value", "searchBy"], fuzzySearch: !0, caseSensitive: !1, accentedSearch: !0, highlightFirst: !1, closeOnSelect: !0, clearOnSelect: !0, position: "all", appendTarget: null }, hooks: { beforeRemoveTag: () => Promise.resolve(), suggestionClick: () => Promise.resolve() } },
                c = {
                    wrapper: (t, e) => `<tags class="${e.classNames.namespace} ${e.mode?""+e.classNames[e.mode+"Mode"]:""} ${t.className}"\n                    ${e.readonly?"readonly":""}\n                    ${e.required?"required":""}\n                    tabIndex="-1">\n            <span ${e.readonly&&"mix"==e.mode?"":"contenteditable"} data-placeholder="${e.placeholder||"&#8203;"}" aria-placeholder="${e.placeholder||""}"\n                class="${e.classNames.input}"\n                role="textbox"\n                aria-autocomplete="both"\n                aria-multiline="${"mix"==e.mode}"></span>\n        </tags>`,
                    tag(t) { return `<tag title="${t.title||t.value}"\n                    contenteditable='false'\n                    spellcheck='false'\n                    tabIndex="-1"\n                    class="${this.settings.classNames.tag} ${t.class?t.class:""}"\n                    ${this.getAttributes(t)}>\n            <x title='' class="${this.settings.classNames.tagX}" role='button' aria-label='remove tag'></x>\n            <div>\n                <span class="${this.settings.classNames.tagText}">${t[this.settings.tagTextProp]||t.value}</span>\n            </div>\n        </tag>` },
                    dropdown(t) {
                        var e = t.dropdown,
                            i = "manual" == e.position,
                            s = "" + t.classNames.dropdown;
                        return `<div class="${i?"":s} ${e.classname}" role="listbox" aria-labelledby="dropdown">\n                    <div class="${t.classNames.dropdownWrapper}"></div>\n                </div>`
                    },
                    dropdownItem(t) { return `<div ${this.getAttributes(t)}\n                    class='${this.settings.classNames.dropdownItem} ${t.class?t.class:""}'\n                    tabindex="0"\n                    role="option">${t.value}</div>` },
                    dropdownItemNoMatch: null
                },
                p = {
                    customBinding() { this.customEventsList.forEach(t => { this.on(t, this.settings.callbacks[t]) }) },
                    binding(t = !0) {
                        var e, i = this.events.callbacks,
                            s = t ? "addEventListener" : "removeEventListener";
                        if (!this.state.mainEvents || !t)
                            for (var a in this.state.mainEvents = t, t && !this.listeners.main && (this.DOM.input.addEventListener(this.isIE ? "keydown" : "input", i[this.isIE ? "onInputIE" : "onInput"].bind(this)), this.settings.isJQueryPlugin && jQuery(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this))), e = this.listeners.main = this.listeners.main || { focus: ["input", i.onFocusBlur.bind(this)], blur: ["input", i.onFocusBlur.bind(this)], keydown: ["input", i.onKeydown.bind(this)], click: ["scope", i.onClickScope.bind(this)], dblclick: ["scope", i.onDoubleClickScope.bind(this)], paste: ["input", i.onPaste.bind(this)] })("blur" != a || t) && this.DOM[e[a][0]][s](a, e[a][1])
                    },
                    callbacks: {
                        onFocusBlur(t) {
                            var e = t.target ? this.trim(t.target.textContent) : "",
                                i = this.settings,
                                s = t.type,
                                a = i.dropdown.enabled >= 0,
                                n = { relatedTarget: t.relatedTarget },
                                o = this.state.actions.selectOption && (a || !i.dropdown.closeOnSelect),
                                r = this.state.actions.addNew && a;
                            if ("blur" == s) {
                                if (t.relatedTarget === this.DOM.scope) return this.dropdown.hide.call(this), void this.DOM.input.focus();
                                this.postUpdate(), this.triggerChangeEvent()
                            }
                            if (!o && !r)
                                if (this.state.hasFocus = "focus" == s && +new Date, this.toggleFocusClass(this.state.hasFocus), "mix" != i.mode) { if ("focus" == s) return this.trigger("focus", n), void(0 === i.dropdown.enabled && this.dropdown.show.call(this)); "blur" == s && (this.trigger("blur", n), this.loading(!1), ("select" == this.settings.mode ? !this.value.length || this.value[0].value != e : e && !this.state.actions.selectOption && i.addTagOnBlur) && this.addTags(e, !0)), this.DOM.input.removeAttribute("style"), this.dropdown.hide.call(this) } else "focus" == s ? this.trigger("focus", n) : "blur" == t.type && (this.trigger("blur", n), this.loading(!1), this.dropdown.hide.call(this), this.state.dropdown.visible = void 0, this.setStateSelection())
                        },
                        onKeydown(t) {
                            var s = this.trim(t.target.textContent);
                            if (this.trigger("keydown", { originalEvent: this.cloneEvent(t) }), "mix" == this.settings.mode) {
                                switch (t.key) {
                                    case "Left":
                                    case "ArrowLeft":
                                        this.state.actions.ArrowLeft = !0;
                                        break;
                                    case "Delete":
                                    case "Backspace":
                                        if (this.state.editing) return;
                                        var a, n, o = document.getSelection(),
                                            r = "Delete" == t.key && o.anchorOffset == (o.anchorNode.length || 0),
                                            h = 1 == o.anchorNode.nodeType || !o.anchorOffset && o.anchorNode.previousElementSibling,
                                            g = e(this.DOM.input.innerHTML),
                                            c = this.getTagElms();
                                        if (d() && h) return n = i(h), h.hasAttribute("readonly") || h.remove(), this.DOM.input.focus(), void setTimeout(() => { this.placeCaretAfterNode(n), this.DOM.input.click() });
                                        if ("BR" == o.anchorNode.nodeName) return;
                                        if ((r || h) && 1 == o.anchorNode.nodeType ? a = 0 == o.anchorOffset ? r ? c[0] : null : c[o.anchorOffset - 1] : r ? a = o.anchorNode.nextElementSibling : h && (a = h), 3 == o.anchorNode.nodeType && !o.anchorNode.nodeValue && o.anchorNode.previousElementSibling && t.preventDefault(), (h || r) && !this.settings.backspace) return void t.preventDefault();
                                        if ("Range" != o.type && !o.anchorOffset && o.anchorNode == this.DOM.input && "Delete" != t.key) return void t.preventDefault();
                                        if ("Range" != o.type && a && a.hasAttribute("readonly")) return void this.placeCaretAfterNode(i(a));
                                        clearTimeout(l), l = setTimeout(() => {
                                            console.log(111);
                                            var t = document.getSelection(),
                                                i = e(this.DOM.input.innerHTML),
                                                s = t.anchorNode.previousElementSibling;
                                            if (!d() && i.length >= g.length && s && !s.hasAttribute("readonly") && (this.removeTags(s), this.fixFirefoxLastTagNoCaret(), 2 == this.DOM.input.children.length && "BR" == this.DOM.input.children[1].tagName)) return this.DOM.input.innerHTML = "", this.value.length = 0, !0;
                                            this.value = [].map.call(c, (t, e) => {
                                                var i = this.tagData(t);
                                                if (t.parentNode || i.readonly) return i;
                                                this.trigger("remove", { tag: t, index: e, data: i })
                                            }).filter(t => t)
                                        }, 20)
                                }
                                return !0
                            }
                            switch (t.key) {
                                case "Backspace":
                                    this.state.dropdown.visible && "manual" != this.settings.dropdown.position || "" != s && 8203 != s.charCodeAt(0) || (!0 === this.settings.backspace ? this.removeTags() : "edit" == this.settings.backspace && setTimeout(this.editTag.bind(this), 0));
                                    break;
                                case "Esc":
                                case "Escape":
                                    if (this.state.dropdown.visible) return;
                                    t.target.blur();
                                    break;
                                case "Down":
                                case "ArrowDown":
                                    this.state.dropdown.visible || this.dropdown.show.call(this);
                                    break;
                                case "ArrowRight":
                                    { let t = this.state.inputSuggestion || this.state.ddItemData; if (t && this.settings.autoComplete.rightKey) return void this.addTags([t], !0); break }
                                case "Tab":
                                    { let e = "select" == this.settings.mode; if (!s || e) return !0;t.preventDefault() }
                                case "Enter":
                                    if (this.state.dropdown.visible || 229 == t.keyCode) return;
                                    t.preventDefault(), setTimeout(() => { this.state.actions.selectOption || this.addTags(s, !0) })
                            }
                        },
                        onInput(t) {
                            if ("mix" == this.settings.mode) return this.events.callbacks.onMixTagsInput.call(this, t);
                            var e = this.input.normalize.call(this),
                                i = e.length >= this.settings.dropdown.enabled,
                                s = { value: e, inputElm: this.DOM.input };
                            s.isValid = this.validateTag({ value: e }), this.trigger("input", s), this.state.inputText != e && (this.input.set.call(this, e, !1), -1 != e.search(this.settings.delimiters) ? this.addTags(e) && this.input.set.call(this) : this.settings.dropdown.enabled >= 0 && this.dropdown[i ? "show" : "hide"].call(this, e))
                        },
                        onMixTagsInput(t) {
                            var e, i, s, a, n, r, l, h, g = this.settings,
                                c = this.value.length,
                                p = this.getTagElms(),
                                u = document.createDocumentFragment(),
                                m = window.getSelection().getRangeAt(0),
                                v = [].map.call(p, t => this.tagData(t).value);
                            if ("deleteContentBackward" == t.inputType && d() && this.events.callbacks.onKeydown.call(this, { target: t.target, key: "Backspace" }), this.value.slice().forEach(t => { t.readonly && !v.includes(t.value) && u.appendChild(this.createTagElem(t)) }), u.childNodes.length && (m.insertNode(u), this.setRangeAtStartEnd(!1, u.lastChild)), p.length != c) return this.value = [].map.call(this.getTagElms(), t => this.tagData(t)), void this.update({ withoutChangeEvent: !0 });
                            if (this.hasMaxTags()) return !0;
                            if (window.getSelection && (r = window.getSelection()).rangeCount > 0 && 3 == r.anchorNode.nodeType) {
                                if ((m = r.getRangeAt(0).cloneRange()).collapse(!0), m.setStart(r.focusNode, 0), s = (e = m.toString().slice(0, m.endOffset)).split(g.pattern).length - 1, (i = e.match(g.pattern)) && (a = e.slice(e.lastIndexOf(i[i.length - 1]))), a) {
                                    if (this.state.actions.ArrowLeft = !1, this.state.tag = { prefix: a.match(g.pattern)[0], value: a.replace(g.pattern, "") }, this.state.tag.baseOffset = r.baseOffset - this.state.tag.value.length, h = this.state.tag.value.match(g.delimiters)) return this.state.tag.value = this.state.tag.value.replace(g.delimiters, ""), this.state.tag.delimiters = h[0], this.addTags(this.state.tag.value, g.dropdown.clearOnSelect), void this.dropdown.hide.call(this);
                                    n = this.state.tag.value.length >= g.dropdown.enabled;
                                    try { l = (l = this.state.flaggedTags[this.state.tag.baseOffset]).prefix == this.state.tag.prefix && l.value[0] == this.state.tag.value[0], this.state.flaggedTags[this.state.tag.baseOffset] && !this.state.tag.value && delete this.state.flaggedTags[this.state.tag.baseOffset] } catch (t) {}(l || s < this.state.mixMode.matchedPatternCount) && (n = !1)
                                } else this.state.flaggedTags = {};
                                this.state.mixMode.matchedPatternCount = s
                            }
                            setTimeout(() => { this.update({ withoutChangeEvent: !0 }), this.trigger("input", o({}, this.state.tag, { textContent: this.DOM.input.textContent })), this.state.tag && this.dropdown[n ? "show" : "hide"].call(this, this.state.tag.value) }, 10)
                        },
                        onInputIE(t) {
                            var e = this;
                            setTimeout((function() { e.events.callbacks.onInput.call(e, t) }))
                        },
                        onClickScope(t) {
                            var e = this.settings,
                                i = t.target.closest("." + e.classNames.tag),
                                s = +new Date - this.state.hasFocus;
                            if (t.target != this.DOM.scope) {
                                if (!t.target.classList.contains(e.classNames.tagX)) return i ? (this.trigger("click", { tag: i, index: this.getNodeIndex(i), data: this.tagData(i), originalEvent: this.cloneEvent(t) }), void(1 !== e.editTags && 1 !== e.editTags.clicks || this.events.callbacks.onDoubleClickScope.call(this, t))) : void(t.target == this.DOM.input && ("mix" == e.mode && this.fixFirefoxLastTagNoCaret(), s > 500) ? this.state.dropdown.visible ? this.dropdown.hide.call(this) : 0 === e.dropdown.enabled && "mix" != e.mode && this.dropdown.show.call(this) : "select" == e.mode && !this.state.dropdown.visible && this.dropdown.show.call(this));
                                this.removeTags(t.target.parentNode)
                            } else this.state.hasFocus || this.DOM.input.focus()
                        },
                        onPaste(t) {
                            var e;
                            t.preventDefault(), this.settings.readonly || (e = (t.clipboardData || window.clipboardData).getData("Text"), this.injectAtCaret(e, window.getSelection().getRangeAt(0)), "mix" != this.settings.mode && this.addTags(this.DOM.input.textContent, !0))
                        },
                        onEditTagInput(t, e) {
                            var i = t.closest("." + this.settings.classNames.tag),
                                s = this.getNodeIndex(i),
                                a = this.tagData(i),
                                n = this.input.normalize.call(this, t),
                                r = i.innerHTML != i.__tagifyTagData.__originalHTML,
                                l = this.validateTag({
                                    [this.settings.tagTextProp]: n
                                });
                            r || !0 !== t.originalIsValid || (l = !0), i.classList.toggle(this.settings.classNames.tagInvalid, !0 !== l), a.__isValid = l, i.title = !0 === l ? a.title || a.value : l, n.length >= this.settings.dropdown.enabled && (this.state.editing && (this.state.editing.value = n), this.dropdown.show.call(this, n)), this.trigger("edit:input", { tag: i, index: s, data: o({}, this.value[s], { newValue: n }), originalEvent: this.cloneEvent(e) })
                        },
                        onEditTagFocus(t) { this.state.editing = { scope: t, input: t.querySelector("[contenteditable]") } },
                        onEditTagBlur(t) {
                            if (this.state.hasFocus || this.toggleFocusClass(), this.DOM.scope.contains(t)) {
                                var e, i = this.settings,
                                    s = t.closest("." + i.classNames.tag),
                                    a = this.input.normalize.call(this, t),
                                    n = this.tagData(s).__originalData,
                                    r = s.innerHTML != s.__tagifyTagData.__originalHTML,
                                    l = this.validateTag({
                                        [i.tagTextProp]: a
                                    });
                                if (a)
                                    if (r) {
                                        if (e = this.getWhitelistItem(a) || o({}, n, {
                                                [i.tagTextProp]: a,
                                                value: a
                                            }), i.transformTag.call(this, e, n), !0 !== (l = this.validateTag({
                                                [i.tagTextProp]: e[i.tagTextProp]
                                            }))) {
                                            if (this.trigger("invalid", { data: e, tag: s, message: l }), i.editTags.keepInvalid) return;
                                            i.keepInvalidTags ? e.__isValid = l : e = n
                                        }
                                        this.onEditTagDone(s, e)
                                    } else this.onEditTagDone(s, n);
                                else this.onEditTagDone(s)
                            }
                        },
                        onEditTagkeydown(t, e) {
                            switch (this.trigger("edit:keydown", { originalEvent: this.cloneEvent(t) }), t.key) {
                                case "Esc":
                                case "Escape":
                                    e.innerHTML = e.__tagifyTagData.__originalHTML;
                                case "Enter":
                                case "Tab":
                                    t.preventDefault(), t.target.blur()
                            }
                        },
                        onDoubleClickScope(t) {
                            var e, i, s = t.target.closest("." + this.settings.classNames.tag),
                                a = this.settings;
                            s && (e = s.classList.contains(this.settings.classNames.tagEditing), i = s.hasAttribute("readonly"), "select" == a.mode || a.readonly || e || i || !this.settings.editTags || this.editTag(s), this.toggleFocusClass(!0), this.trigger("dblclick", { tag: s, index: this.getNodeIndex(s), data: this.tagData(s) }))
                        }
                    }
                };

            function u(t, e) {
                return t ? t.previousElementSibling && t.previousElementSibling.classList.contains("tagify") ? (console.warn("Tagify: ", "input element is already Tagified", t), this) : (o(this, function(t) {
                    var e = document.createTextNode("");

                    function i(t, i, s) { s && i.split(/\s+/g).forEach(i => e[t + "EventListener"].call(e, i, s)) }
                    return {
                        off(t, e) { return i("remove", t, e), this },
                        on(t, e) { return e && "function" == typeof e && i("add", t, e), this },
                        trigger(i, s, a) {
                            var n;
                            if (a = a || { cloneData: !0 }, i)
                                if (t.settings.isJQueryPlugin) "remove" == i && (i = "removeTag"), jQuery(t.DOM.originalInput).triggerHandler(i, [s]);
                                else {
                                    try {
                                        var r = "object" == typeof s ? s : { value: s };
                                        if ((r = a.cloneData ? o({}, r) : r).tagify = this, s instanceof Object)
                                            for (var l in s) s[l] instanceof HTMLElement && (r[l] = s[l]);
                                        n = new CustomEvent(i, { detail: r })
                                    } catch (t) { console.warn(t) }
                                    e.dispatchEvent(n)
                                }
                        }
                    }
                }(this)), this.isFirefox = "undefined" != typeof InstallTrigger, this.isIE = window.document.documentMode, this.applySettings(t, e || {}), this.state = { inputText: "", editing: !1, actions: {}, mixMode: {}, dropdown: {}, flaggedTags: {} }, this.value = [], this.listeners = {}, this.DOM = {}, this.build(t), this.getCSSVars(), this.loadOriginalValues(), this.events.customBinding.call(this), this.events.binding.call(this), void(t.autofocus && this.DOM.input.focus())) : (console.warn("Tagify: ", "input element not found", t), this)
            }
            return u.prototype = {
                dropdown: h,
                TEXTS: { empty: "empty", exceed: "number of tags exceeded", pattern: "pattern mismatch", duplicate: "already exists", notAllowed: "not allowed" },
                customEventsList: ["change", "add", "remove", "invalid", "input", "click", "keydown", "focus", "blur", "edit:input", "edit:beforeUpdate", "edit:updated", "edit:start", "edit:keydown", "dropdown:show", "dropdown:hide", "dropdown:select", "dropdown:updated", "dropdown:noMatch"],
                trim(t) { return this.settings.trim && t && "string" == typeof t ? t.trim() : t },
                parseHTML: function(t) { return (new DOMParser).parseFromString(t.trim(), "text/html").body.firstElementChild },
                templates: c,
                parseTemplate(t, e) { return t = this.settings.templates[t] || t, this.parseHTML(t.apply(this, e)) },
                applySettings(t, e) {
                    g.templates = this.templates;
                    var i = this.settings = o({}, g, e);
                    i.readonly = t.hasAttribute("readonly"), i.placeholder = t.getAttribute("placeholder") || i.placeholder || "", i.required = t.hasAttribute("required");
                    for (let t in i.classNames) Object.defineProperty(i.classNames, t + "Selector", {get() { return "." + this[t].split(" ").join(".") } });
                    if (this.isIE && (i.autoComplete = !1), ["whitelist", "blacklist"].forEach(e => {
                            var s = t.getAttribute("data-" + e);
                            s && (s = s.split(i.delimiters)) instanceof Array && (i[e] = s)
                        }), "autoComplete" in e && !n(e.autoComplete) && (i.autoComplete = g.autoComplete, i.autoComplete.enabled = e.autoComplete), "mix" == i.mode && (i.autoComplete.rightKey = !0, i.delimiters = e.delimiters || null, i.tagTextProp && !i.dropdown.searchKeys.includes(i.tagTextProp) && i.dropdown.searchKeys.push(i.tagTextProp)), t.pattern) try { i.pattern = new RegExp(t.pattern) } catch (t) {}
                    if (this.settings.delimiters) try { i.delimiters = new RegExp(this.settings.delimiters, "g") } catch (t) {}
                    "select" == i.mode && (i.dropdown.enabled = 0), i.dropdown.appendTarget = e.dropdown && e.dropdown.appendTarget ? e.dropdown.appendTarget : document.body
                },
                getAttributes(t) {
                    if ("[object Object]" != Object.prototype.toString.call(t)) return "";
                    var e, i, s = Object.keys(t),
                        a = "";
                    for (i = s.length; i--;) "class" != (e = s[i]) && t.hasOwnProperty(e) && void 0 !== t[e] && (a += " " + e + (void 0 !== t[e] ? `="${t[e]}"` : ""));
                    return a
                },
                setStateSelection() {
                    var t = window.getSelection(),
                        e = { anchorOffset: t.anchorOffset, anchorNode: t.anchorNode, range: t.getRangeAt && t.rangeCount && t.getRangeAt(0) };
                    return this.state.selection = e, e
                },
                getCaretGlobalPosition() {
                    const t = document.getSelection();
                    if (t.rangeCount) {
                        const e = t.getRangeAt(0),
                            i = e.startContainer,
                            s = e.startOffset;
                        let a, n;
                        if (s > 0) return n = document.createRange(), n.setStart(i, s - 1), n.setEnd(i, s), a = n.getBoundingClientRect(), { left: a.right, top: a.top, bottom: a.bottom };
                        if (i.getBoundingClientRect) return i.getBoundingClientRect()
                    }
                    return { left: -9999, top: -9999 }
                },
                getCSSVars() {
                    var t = getComputedStyle(this.DOM.scope, null);
                    this.CSSVars = { tagHideTransition: (({ value: t, unit: e }) => "s" == e ? 1e3 * t : t)(function(t) { if (!t) return {}; var e = (t = t.trim().split(" ")[0]).split(/\d+/g).filter(t => t).pop().trim(); return { value: +t.split(e).filter(t => t)[0].trim(), unit: e } }(("tag-hide-transition", t.getPropertyValue("--tag-hide-transition")))) }
                },
                build(t) {
                    var e = this.DOM;
                    this.settings.mixMode.integrated ? (e.originalInput = null, e.scope = t, e.input = t) : (e.originalInput = t, e.scope = this.parseTemplate("wrapper", [t, this.settings]), e.input = e.scope.querySelector(this.settings.classNames.inputSelector), t.parentNode.insertBefore(e.scope, t)), this.settings.dropdown.enabled >= 0 && this.dropdown.init.call(this)
                },
                destroy() { this.DOM.scope.parentNode.removeChild(this.DOM.scope), this.dropdown.hide.call(this, !0), clearTimeout(this.dropdownHide__bindEventsTimeout) },
                loadOriginalValues(t) {
                    var e, i = this.settings;
                    if (t = t || (i.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value))
                        if (this.removeAllTags({ withoutChangeEvent: !0 }), "mix" == i.mode) this.parseMixTags(t.trim()), (e = this.DOM.input.lastChild) && "BR" == e.tagName || this.DOM.input.insertAdjacentHTML("beforeend", "<br>");
                        else {
                            try { JSON.parse(t) instanceof Array && (t = JSON.parse(t)) } catch (t) {}
                            this.addTags(t).forEach(t => t && t.classList.add(i.classNames.tagNoAnimation))
                        }
                    else this.postUpdate();
                    this.state.lastOriginalValueReported = i.mixMode.integrated ? "" : this.DOM.originalInput.value, this.state.loadedOriginalValues = !0
                },
                cloneEvent(t) { var e = {}; for (var i in t) e[i] = t[i]; return e },
                loading(t) { return this.state.isLoading = t, this.DOM.scope.classList[t ? "add" : "remove"](this.settings.classNames.scopeLoading), this },
                tagLoading(t, e) { return t && t.classList[e ? "add" : "remove"](this.settings.classNames.tagLoading), this },
                toggleClass(t, e) { "string" == typeof t && this.DOM.scope.classList.toggle(t, e) },
                toggleFocusClass(t) { this.toggleClass(this.settings.classNames.focus, !!t) },
                triggerChangeEvent: function() {
                    if (!this.settings.mixMode.integrated) {
                        var t = this.DOM.originalInput,
                            e = this.state.lastOriginalValueReported !== t.value,
                            i = new CustomEvent("change", { bubbles: !0 });
                        e && (this.state.lastOriginalValueReported = t.value, i.simulated = !0, t._valueTracker && t._valueTracker.setValue(Math.random()), t.dispatchEvent(i), this.trigger("change", this.state.lastOriginalValueReported), t.value = this.state.lastOriginalValueReported)
                    }
                },
                events: p,
                fixFirefoxLastTagNoCaret() {},
                placeCaretAfterNode(t) {
                    if (t && t.parentNode) {
                        var e = t.nextSibling,
                            i = window.getSelection(),
                            s = i.getRangeAt(0);
                        i.rangeCount && (s.setStartBefore(e || t), s.setEndBefore(e || t), i.removeAllRanges(), i.addRange(s))
                    }
                },
                insertAfterTag(t, e) { if (e = e || this.settings.mixMode.insertAfterTag, t && t.parentNode && e) return e = "string" == typeof e ? document.createTextNode(e) : e, t.parentNode.insertBefore(e, t.nextSibling), e },
                editTag(t, e) {
                    t = t || this.getLastTag(), e = e || {}, this.dropdown.hide.call(this);
                    var i = this.settings;

                    function s() { return t.querySelector(i.classNames.tagTextSelector) }
                    var a = s(),
                        n = this.getNodeIndex(t),
                        r = this.tagData(t),
                        l = this.events.callbacks,
                        d = this,
                        h = !0;
                    if (a) { if (!(r instanceof Object && "editable" in r) || r.editable) return a.setAttribute("contenteditable", !0), t.classList.add(i.classNames.tagEditing), this.tagData(t, { __originalData: o({}, r), __originalHTML: t.innerHTML }), a.addEventListener("focus", l.onEditTagFocus.bind(this, t)), a.addEventListener("blur", (function() { setTimeout(() => l.onEditTagBlur.call(d, s())) })), a.addEventListener("input", l.onEditTagInput.bind(this, a)), a.addEventListener("keydown", e => l.onEditTagkeydown.call(this, e, t)), a.focus(), this.setRangeAtStartEnd(!1, a), e.skipValidation || (h = this.editTagToggleValidity(t, r.value)), a.originalIsValid = h, this.trigger("edit:start", { tag: t, index: n, data: r, isValid: h }), this } else console.warn("Cannot find element in Tag template: .", i.classNames.tagTextSelector)
                },
                editTagToggleValidity(t, e) {
                    var i, s = this.tagData(t);
                    if (s) return i = !(!s.__isValid || 1 == s.__isValid), t.classList.toggle(this.settings.classNames.tagInvalid, i), s.__isValid;
                    console.warn("tag has no data: ", t, s)
                },
                onEditTagDone(t, e) {
                    e = e || {};
                    var i = { tag: t = t || this.state.editing.scope, index: this.getNodeIndex(t), previousData: this.tagData(t), data: e };
                    this.trigger("edit:beforeUpdate", i, { cloneData: !1 }), this.state.editing = !1, delete e.__originalData, delete e.__originalHTML, t && e[this.settings.tagTextProp] ? (this.editTagToggleValidity(t), this.replaceTag(t, e)) : t && this.removeTags(t), this.trigger("edit:updated", i), this.dropdown.hide.call(this), this.settings.keepInvalidTags && this.reCheckInvalidTags()
                },
                replaceTag(t, e) {
                    e && e.value || (e = t.__tagifyTagData), e.__isValid && 1 != e.__isValid && o(e, this.getInvalidTagAttrs(e, e.__isValid));
                    var i = this.createTagElem(e);
                    t.parentNode.replaceChild(i, t), this.updateValueByDOMTags()
                },
                updateValueByDOMTags() { this.value.length = 0, [].forEach.call(this.getTagElms(), t => { t.classList.contains(this.settings.classNames.tagNotAllowed.split(" ")[0]) || this.value.push(this.tagData(t)) }), this.update() },
                setRangeAtStartEnd(t, e) { t = "number" == typeof t ? t : !!t, e = (e = e || this.DOM.input).lastChild || e; var i = document.getSelection(); try { i.rangeCount >= 1 && ["Start", "End"].forEach(s => i.getRangeAt(0)["set" + s](e, t || e.length)) } catch (t) { console.warn("Tagify: ", t) } },
                injectAtCaret(t, e) { if (e = e || this.state.selection.range) return "string" == typeof t && (t = document.createTextNode(t)), e.deleteContents(), e.insertNode(t), this.setRangeAtStartEnd(!1, t), this.updateValueByDOMTags(), this.update(), this },
                input: {set(t = "", e = !0) {
                        var i = this.settings.dropdown.closeOnSelect;
                        this.state.inputText = t, e && (this.DOM.input.innerHTML = s("" + t)), !t && i && this.dropdown.hide.bind(this), this.input.autocomplete.suggest.call(this), this.input.validate.call(this)
                    },
                    validate() { var t = !this.state.inputText || !0 === this.validateTag({ value: this.state.inputText }); return this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !t), t },
                    normalize(t) {
                        var e = t || this.DOM.input,
                            i = [];
                        e.childNodes.forEach(t => 3 == t.nodeType && i.push(t.nodeValue)), i = i.join("\n");
                        try { i = i.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0)) } catch (t) {}
                        return i = i.replace(/\s/g, " "), this.settings.trim && (i = i.replace(/^\s+/, "")), i
                    },
                    autocomplete: {
                        suggest(t) {
                            if (this.settings.autoComplete.enabled) {
                                "string" == typeof(t = t || {}) && (t = { value: t });
                                var e = t.value ? "" + t.value : "",
                                    i = e.substr(0, this.state.inputText.length).toLowerCase(),
                                    s = e.substring(this.state.inputText.length);
                                e && this.state.inputText && i == this.state.inputText.toLowerCase() ? (this.DOM.input.setAttribute("data-suggest", s), this.state.inputSuggestion = t) : (this.DOM.input.removeAttribute("data-suggest"), delete this.state.inputSuggestion)
                            }
                        },
                        set(t) {
                            var e = this.DOM.input.getAttribute("data-suggest"),
                                i = t || (e ? this.state.inputText + e : null);
                            return !!i && ("mix" == this.settings.mode ? this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + i)) : (this.input.set.call(this, i), this.setRangeAtStartEnd()), this.input.autocomplete.suggest.call(this), this.dropdown.hide.call(this), !0)
                        }
                    }
                },
                getTagIdx(t) { return this.value.findIndex(e => e.value == (t || {}).value) },
                getNodeIndex(t) {
                    var e = 0;
                    if (t)
                        for (; t = t.previousElementSibling;) e++;
                    return e
                },
                getTagElms(...t) { var e = "." + [...this.settings.classNames.tag.split(" "), ...t].join("."); return [].slice.call(this.DOM.scope.querySelectorAll(e)) },
                getLastTag() { var t = this.DOM.scope.querySelectorAll(`${this.settings.classNames.tagSelector}:not(.${this.settings.classNames.tagHide}):not([readonly])`); return t[t.length - 1] },
                tagData: (t, e, i) => t ? (e && (t.__tagifyTagData = i ? e : o({}, t.__tagifyTagData || {}, e)), t.__tagifyTagData) : (console.warn("tag elment doesn't exist", t, e), e),
                isTagDuplicate(e, i) { var s = this.settings; return "select" != s.mode && this.value.reduce((a, n) => t(this.trim("" + e), n.value, i || s.dropdown.caseSensitive) ? a + 1 : a, 0) },
                getTagIndexByValue(e) { var i = []; return this.getTagElms().forEach((s, a) => { t(this.trim(s.textContent), e, this.settings.dropdown.caseSensitive) && i.push(a) }), i },
                getTagElmByValue(t) { var e = this.getTagIndexByValue(t)[0]; return this.getTagElms()[e] },
                flashTag(t) { t && (t.classList.add(this.settings.classNames.tagFlash), setTimeout(() => { t.classList.remove(this.settings.classNames.tagFlash) }, 100)) },
                isTagBlacklisted(t) { return t = this.trim(t.toLowerCase()), this.settings.blacklist.filter(e => ("" + e).toLowerCase() == t).length },
                isTagWhitelisted(t) { return !!this.getWhitelistItem(t) },
                getWhitelistItem(e, i, s) { i = i || "value"; var a, n = this.settings; return (s = s || n.whitelist).some(s => { var o = "string" == typeof s ? s : s[i] || s.value; if (t(o, e, n.dropdown.caseSensitive, n.trim)) return a = "string" == typeof s ? { value: s } : s, !0 }), a || "value" != i || "value" == n.tagTextProp || (a = this.getWhitelistItem(e, n.tagTextProp, s)), a },
                validateTag(t) {
                    var e = this.settings,
                        i = "value" in t ? "value" : e.tagTextProp,
                        s = this.trim(t[i] + "");
                    return (t[i] + "").trim() ? e.pattern && e.pattern instanceof RegExp && !e.pattern.test(s) ? this.TEXTS.pattern : !e.duplicates && this.isTagDuplicate(s, this.state.editing) ? this.TEXTS.duplicate : this.isTagBlacklisted(s) || e.enforceWhitelist && !this.isTagWhitelisted(s) ? this.TEXTS.notAllowed : !e.validate || e.validate(t) : this.TEXTS.empty
                },
                getInvalidTagAttrs(t, e) { return { "aria-invalid": !0, class: `${t.class||""} ${this.settings.classNames.tagNotAllowed}`.trim(), title: e } },
                hasMaxTags() { return this.value.length >= this.settings.maxTags && this.TEXTS.exceed },
                setReadonly(t) {
                    var e = this.settings;
                    document.activeElement.blur(), e.readonly = t, this.DOM.scope[(t ? "set" : "remove") + "Attribute"]("readonly", !0), "mix" == e.mode && (this.DOM.input.contentEditable = !t)
                },
                normalizeTags(t) {
                    var e = this.settings,
                        i = e.whitelist,
                        s = e.delimiters,
                        a = e.mode,
                        n = e.tagTextProp;
                    e.enforceWhitelist;
                    var o = [],
                        r = !!i && i[0] instanceof Object,
                        l = t instanceof Array,
                        d = t => (t + "").split(s).filter(t => t).map(t => ({
                            [n]: this.trim(t),
                            value: this.trim(t)
                        }));
                    if ("number" == typeof t && (t = t.toString()), "string" == typeof t) {
                        if (!t.trim()) return [];
                        t = d(t)
                    } else l && (t = [].concat(...t.map(t => t.value ? t : d(t))));
                    return r && (t.forEach(t => {
                        var e = o.map(t => t.value),
                            i = this.dropdown.filterListItems.call(this, t[n], { exact: !0 }).filter(t => !e.includes(t.value)),
                            s = i.length > 1 ? this.getWhitelistItem(t[n], n, i) : i[0];
                        s && s instanceof Object ? o.push(s) : "mix" != a && (null == t.value && (t.value = t[n]), o.push(t))
                    }), t = o), t
                },
                parseMixTags(t) {
                    var e = this.settings,
                        i = e.mixTagsInterpolator,
                        s = e.duplicates,
                        a = e.transformTag,
                        n = e.enforceWhitelist,
                        o = e.maxTags,
                        r = e.tagTextProp,
                        l = [];
                    return t = t.split(i[0]).map((t, e) => {
                        var d, h, g, c = t.split(i[1]),
                            p = c[0],
                            u = l.length == o;
                        try {
                            if (p == +p) throw Error;
                            h = JSON.parse(p)
                        } catch (t) { h = this.normalizeTags(p)[0] || { value: p } }
                        if (u || !(c.length > 1) || n && !this.isTagWhitelisted(h.value) || !s && this.isTagDuplicate(h.value)) { if (t) return e ? i[0] + t : t } else a.call(this, h), h[d = h[r] ? r : "value"] = this.trim(h[d]), g = this.createTagElem(h), l.push(h), g.classList.add(this.settings.classNames.tagNoAnimation), c[0] = g.outerHTML, this.value.push(h);
                        return c.join("")
                    }).join(""), this.DOM.input.innerHTML = t, this.DOM.input.appendChild(document.createTextNode("")), this.DOM.input.normalize(), this.getTagElms().forEach((t, e) => this.tagData(t, l[e])), this.update({ withoutChangeEvent: !0 }), t
                },
                replaceTextWithNode(t, e) {
                    if (this.state.tag || e) {
                        e = e || this.state.tag.prefix + this.state.tag.value;
                        var i, s, a = window.getSelection(),
                            n = a.anchorNode,
                            o = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0;
                        return n.splitText(a.anchorOffset - o), i = n.nodeValue.lastIndexOf(e), s = n.splitText(i), t && n.parentNode.replaceChild(t, s), !0
                    }
                },
                selectTag(t, e) { if (!this.settings.enforceWhitelist || this.isTagWhitelisted(e.value)) return this.input.set.call(this, e.value, !0), this.state.actions.selectOption && setTimeout(this.setRangeAtStartEnd.bind(this)), this.getLastTag() ? this.replaceTag(this.getLastTag(), e) : this.appendTag(t), this.value[0] = e, this.trigger("add", { tag: t, data: e }), this.update(), [t] },
                addEmptyTag(t) {
                    var e = o({ value: "" }, t || {}),
                        i = this.createTagElem(e);
                    this.tagData(i, e), this.appendTag(i), this.editTag(i, { skipValidation: !0 })
                },
                addTags(t, e, i = this.settings.skipInvalid) {
                    var s = [],
                        a = this.settings;
                    return t && 0 != t.length ? (t = this.normalizeTags(t), "mix" == a.mode ? this.addMixTags(t) : ("select" == a.mode && (e = !1), this.DOM.input.removeAttribute("style"), t.forEach(t => {
                        var e, n = {},
                            r = Object.assign({}, t, { value: t.value + "" });
                        if ((t = Object.assign({}, r)).__isValid = this.hasMaxTags() || this.validateTag(t), a.transformTag.call(this, t), !0 !== t.__isValid) {
                            if (i) return;
                            o(n, this.getInvalidTagAttrs(t, t.__isValid), { __preInvalidData: r }), t.__isValid == this.TEXTS.duplicate && this.flashTag(this.getTagElmByValue(t.value))
                        }
                        if (t.readonly && (n["aria-readonly"] = !0), e = this.createTagElem(o({}, t, n)), s.push(e), "select" == a.mode) return this.selectTag(e, t);
                        this.appendTag(e), t.__isValid && !0 === t.__isValid ? (this.value.push(t), this.update(), this.trigger("add", { tag: e, index: this.value.length - 1, data: t })) : (this.trigger("invalid", { data: t, index: this.value.length, tag: e, message: t.__isValid }), a.keepInvalidTags || setTimeout(() => this.removeTags(e, !0), 1e3)), this.dropdown.position.call(this)
                    }), t.length && e && this.input.set.call(this), this.dropdown.refilter.call(this), s)) : ("select" == a.mode && this.removeAllTags(), s)
                },
                addMixTags(t) {
                    if (t[0].prefix || this.state.tag) this.prefixedTextToTag(t[0]);
                    else {
                        "string" == typeof t && (t = [{ value: t }]);
                        var e = !!this.state.selection,
                            i = document.createDocumentFragment();
                        t.forEach(t => {
                            var e = this.createTagElem(t);
                            i.appendChild(e), this.insertAfterTag(e)
                        }), e ? this.injectAtCaret(i) : (this.DOM.input.focus(), (e = this.setStateSelection()).range.setStart(this.DOM.input, e.range.endOffset), e.range.setEnd(this.DOM.input, e.range.endOffset), this.DOM.input.appendChild(i), this.updateValueByDOMTags(), this.update())
                    }
                },
                prefixedTextToTag(t) {
                    var e, i = this.settings,
                        s = this.state.tag.delimiters;
                    if (i.transformTag.call(this, t), t.prefix = t.prefix || this.state.tag ? this.state.tag.prefix : (i.pattern.source || i.pattern)[0], e = this.createTagElem(t), this.replaceTextWithNode(e) || this.DOM.input.appendChild(e), setTimeout(() => e.classList.add(this.settings.classNames.tagNoAnimation), 300), this.value.push(t), this.update(), !s) {
                        var a = this.insertAfterTag(e) || e;
                        this.placeCaretAfterNode(a)
                    }
                    return this.state.tag = null, this.trigger("add", o({}, { tag: e }, { data: t })), e
                },
                appendTag(t) {
                    var e = this.DOM.scope.lastElementChild;
                    e === this.DOM.input ? this.DOM.scope.insertBefore(t, e) : this.DOM.scope.appendChild(t)
                },
                createTagElem(t) { var e, i = o({}, t, { value: s(t.value + "") }); return function(t) { for (var e, i = document.createNodeIterator(t, NodeFilter.SHOW_TEXT, null, !1); e = i.nextNode();) e.textContent.trim() || e.parentNode.removeChild(e) }(e = this.parseTemplate("tag", [i])), this.tagData(e, t), e },
                reCheckInvalidTags() {
                    var t = this.settings,
                        e = `${t.classNames.tagSelector}${t.classNames.tagNotAllowedSelector}`,
                        i = this.DOM.scope.querySelectorAll(e);
                    [].forEach.call(i, t => {
                        var e = this.tagData(t),
                            i = t.getAttribute("title") == this.TEXTS.duplicate,
                            s = !0 === this.validateTag(e);
                        i && s && (e = e.__preInvalidData ? e.__preInvalidData : { value: e.value }, this.replaceTag(t, e))
                    })
                },
                removeTags(t, e, i) {
                    var s;
                    t = t && t instanceof HTMLElement ? [t] : t instanceof Array ? t : t ? [t] : [this.getLastTag()], s = t.reduce((t, e) => (e && "string" == typeof e && (e = this.getTagElmByValue(e)), e && t.push({ node: e, idx: this.getTagIdx(this.tagData(e)), data: this.tagData(e, { __removed: !0 }) }), t), []), i = "number" == typeof i ? i : this.CSSVars.tagHideTransition, "select" == this.settings.mode && (i = 0, this.input.set.call(this)), 1 == s.length && s[0].node.classList.contains(this.settings.classNames.tagNotAllowed) && (e = !0), s.length && this.settings.hooks.beforeRemoveTag(s, { tagify: this }).then(() => {
                        function t(t) { t.node.parentNode && (t.node.parentNode.removeChild(t.node), e ? this.settings.keepInvalidTags && this.trigger("remove", { tag: t.node, index: t.idx }) : (this.trigger("remove", { tag: t.node, index: t.idx, data: t.data }), this.dropdown.refilter.call(this), this.dropdown.position.call(this), this.DOM.input.normalize(), this.settings.keepInvalidTags && this.reCheckInvalidTags())) }
                        i && i > 10 && 1 == s.length ? function(e) { e.node.style.width = parseFloat(window.getComputedStyle(e.node).width) + "px", document.body.clientTop, e.node.classList.add(this.settings.classNames.tagHide), setTimeout(t.bind(this), i, e) }.call(this, s[0]) : s.forEach(t.bind(this)), e || (s.forEach(t => {
                            var e = Object.assign({}, t.data);
                            delete e.__removed;
                            var i = this.getTagIdx(e);
                            i > -1 && this.value.splice(i, 1)
                        }), this.update())
                    }).catch(t => {})
                },
                removeAllTags(t) { t = t || {}, this.value = [], "mix" == this.settings.mode ? this.DOM.input.innerHTML = "" : Array.prototype.slice.call(this.getTagElms()).forEach(t => t.parentNode.removeChild(t)), this.dropdown.position.call(this), "select" == this.settings.mode && this.input.set.call(this), this.update(t) },
                postUpdate() {
                    var t = this.settings.classNames,
                        e = "mix" == this.settings.mode ? this.settings.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value : this.value.length;
                    this.toggleClass(t.hasMaxTags, this.value.length >= this.settings.maxTags), this.toggleClass(t.hasNoTags, !this.value.length), this.toggleClass(t.empty, !e)
                },
                update(t) {
                    var e, i, s = this.DOM.originalInput,
                        a = (t || {}).withoutChangeEvent,
                        n = (e = this.value, i = ["__isValid", "__removed"], e.map(t => { var e = {}; for (var s in t) i.indexOf(s) < 0 && (e[s] = t[s]); return e }));
                    this.settings.mixMode.integrated || (s.value = "mix" == this.settings.mode ? this.getMixedTagsAsString(n) : n.length ? this.settings.originalInputValueFormat ? this.settings.originalInputValueFormat(n) : JSON.stringify(n) : ""), this.postUpdate(), !a && this.state.loadedOriginalValues && this.triggerChangeEvent()
                },
                getMixedTagsAsString() {
                    var t = "",
                        e = this,
                        i = this.settings.mixTagsInterpolator;
                    return function s(a) { a.childNodes.forEach(a => { if (1 == a.nodeType) { if (a.classList.contains(e.settings.classNames.tag) && e.tagData(a)) { if (e.tagData(a).__removed) return; return void(t += i[0] + JSON.stringify(a.__tagifyTagData) + i[1]) } "BR" != a.tagName || a.parentNode != e.DOM.input && 1 != a.parentNode.childNodes.length ? "DIV" != a.tagName && "P" != a.tagName || (t += "\r\n", s(a)) : t += "\r\n" } else t += a.textContent }) }(this.DOM.input), t
                }
            }, u.prototype.removeTag = u.prototype.removeTags, u
        }))
}(jQuery);