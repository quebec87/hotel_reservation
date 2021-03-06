! function(t, e, i) {
  ! function() {
    var s; var a; var n; var h = "2.2.3";
            var o = "datepicker";
            var r = ".datepicker-here";
            var c = !1;
            var d = '<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>';
            var l = {
                classes: "",
                inline: !1,
                language: "ru",
                startDate: new Date,
                firstDay: "",
                weekends: [6, 0],
                dateFormat: "",
                altField: "",
                altFieldDateFormat: "@",
                toggleSelected: !0,
                keyboardNav: !0,
                position: "bottom left",
                offset: 12,
                view: "days",
                minView: "days",
                showOtherMonths: !0,
                selectOtherMonths: !0,
                moveToOtherMonthsOnSelect: !0,
                showOtherYears: !0,
                selectOtherYears: !0,
                moveToOtherYearsOnSelect: !0,
                minDate: "",
                maxDate: "",
                disableNavWhenOutOfRange: !0,
                multipleDates: !1,
                multipleDatesSeparator: ",",
                range: !1,
                todayButton: !1,
                clearButton: !1,
                showEvent: "focus",
                autoClose: !1,
                monthsField: "monthsShort",
                prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
                nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
                navTitles: {
                    days: "MM, <i>yyyy</i>",
                    months: "yyyy",
                    years: "yyyy1 - yyyy2"
                },
                timepicker: !1,
                onlyTimepicker: !1,
                dateTimeSeparator: " ",
                timeFormat: "",
                minHours: 0,
                maxHours: 24,
                minMinutes: 0,
                maxMinutes: 59,
                hoursStep: 1,
                minutesStep: 1,
                onSelect: "",
                onShow: "",
                onHide: "",
                onChangeMonth: "",
                onChangeYear: "",
                onChangeDecade: "",
                onChangeView: "",
                onRenderCell: ""
            };
            var u = {
                ctrlRight: [17, 39],
                ctrlUp: [17, 38],
                ctrlLeft: [17, 37],
                ctrlDown: [17, 40],
                shiftRight: [16, 39],
                shiftUp: [16, 38],
                shiftLeft: [16, 37],
                shiftDown: [16, 40],
                altUp: [18, 38],
                altRight: [18, 39],
                altLeft: [18, 37],
                altDown: [18, 40],
                ctrlShiftUp: [16, 17, 38]
            };
            var m = function(t, a) {
        this.el = t, this.$el = e(t), this.opts = e.extend(!0, {}, l, a, this.$el.data()), s == i && (s = e('body')), this.opts.startDate || (this.opts.startDate = new Date), 'INPUT' == this.el.nodeName && (this.elIsInput = !0), this.opts.altField && (this.$altField = 'string' == typeof this.opts.altField ? e(this.opts.altField) : this.opts.altField), this.inited = !1, this.visible = !1, this.silent = !1, this.currentDate = this.opts.startDate, this.currentView = this.opts.view, this._createShortCuts(), this.selectedDates = [], this.views = {}, this.keys = [], this.minRange = '', this.maxRange = '', this._prevOnSelectValue = '', this.init();
      };
    n = m, n.prototype = {
      VERSION: h,
      viewIndexes: ['days', 'months', 'years'],
      init: function() {
        c || this.opts.inline || !this.elIsInput || this._buildDatepickersContainer(), this._buildBaseHtml(), this._defineLocale(this.opts.language), this._syncWithMinMaxDates(), this.elIsInput && (this.opts.inline || (this._setPositionClasses(this.opts.position), this._bindEvents()), this.opts.keyboardNav && !this.opts.onlyTimepicker && this._bindKeyboardEvents(), this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this)), this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this))), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.timepicker && (this.timepicker = new e.fn.datepicker.Timepicker(this, this.opts), this._bindTimepickerEvents()), this.opts.onlyTimepicker && this.$datepicker.addClass('-only-timepicker-'), this.views[this.currentView] = new e.fn.datepicker.Body(this, this.currentView, this.opts), this.views[this.currentView].show(), this.nav = new e.fn.datepicker.Navigation(this, this.opts), this.view = this.currentView, this.$el.on('clickCell.adp', this._onClickCell.bind(this)), this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this)), this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this)), this.inited = !0;
      },
      _createShortCuts: function() {
        this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-86399999136e5), this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(86399999136e5);
      },
      _bindEvents: function() {
        this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this)), this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this)), this.$el.on('blur.adp', this._onBlur.bind(this)), this.$el.on('keyup.adp', this._onKeyUpGeneral.bind(this)), e(t).on('resize.adp', this._onResize.bind(this)), e('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
      },
      _bindKeyboardEvents: function() {
        this.$el.on('keydown.adp', this._onKeyDown.bind(this)), this.$el.on('keyup.adp', this._onKeyUp.bind(this)), this.$el.on('hotKey.adp', this._onHotKey.bind(this));
      },
      _bindTimepickerEvents: function() {
        this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
      },
      isWeekend: function(t) {
        return -1 !== this.opts.weekends.indexOf(t);
      },
      _defineLocale: function(t) {
                'string' == typeof t ? (this.loc = e.fn.datepicker.language[t], this.loc || (console.warn('Can\'t find language "' + t + '" in Datepicker.language, will use "ru" instead'), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru)), this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, e.fn.datepicker.language[t])) : this.loc = e.extend(!0, {}, e.fn.datepicker.language.ru, t), this.opts.dateFormat && (this.loc.dateFormat = this.opts.dateFormat), this.opts.timeFormat && (this.loc.timeFormat = this.opts.timeFormat), '' !== this.opts.firstDay && (this.loc.firstDay = this.opts.firstDay), this.opts.timepicker && (this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator)), this.opts.onlyTimepicker && (this.loc.dateFormat = this.loc.timeFormat);
                let i = this._getWordBoundaryRegExp;
                (this.loc.timeFormat.match(i('aa')) || this.loc.timeFormat.match(i('AA'))) && (this.ampm = !0);
      },
      _buildDatepickersContainer: function() {
        c = !0, s.append('<div class="datepickers-container" id="datepickers-container"></div>'), a = e('#datepickers-container');
      },
      _buildBaseHtml: function() {
        var t; var i = e('<div class="datepicker-inline">');
        t = 'INPUT' == this.el.nodeName ? this.opts.inline ? i.insertAfter(this.$el) : a : i.appendTo(this.$el), this.$datepicker = e(d).appendTo(t), this.$content = e('.datepicker--content', this.$datepicker), this.$nav = e('.datepicker--nav', this.$datepicker);
      },
      _triggerOnChange: function() {
        if (!this.selectedDates.length) {
          if ('' === this._prevOnSelectValue) return;
          return this._prevOnSelectValue = '', this.opts.onSelect('', '', this);
        }
        var t; var e = this.selectedDates;
                    var i = n.getParsedDate(e[0]);
                    var s = this;
                    var a = new Date(i.year, i.month, i.date, i.hours, i.minutes);
        t = e.map(function(t) {
          return s.formatDate(s.loc.dateFormat, t);
        }).join(this.opts.multipleDatesSeparator), (this.opts.multipleDates || this.opts.range) && (a = e.map(function(t) {
          var e = n.getParsedDate(t);
          return new Date(e.year, e.month, e.date, e.hours, e.minutes);
        })), this._prevOnSelectValue = t, this.opts.onSelect(t, a, this);
      },
      next: function() {
        var t = this.parsedDate;
                    var e = this.opts;
        switch (this.view) {
          case 'days':
            this.date = new Date(t.year, t.month + 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;
          case 'months':
            this.date = new Date(t.year + 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
            break;
          case 'years':
            this.date = new Date(t.year + 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);
        }
      },
      prev: function() {
        var t = this.parsedDate;
                    var e = this.opts;
        switch (this.view) {
          case 'days':
            this.date = new Date(t.year, t.month - 1, 1), e.onChangeMonth && e.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
            break;
          case 'months':
            this.date = new Date(t.year - 1, t.month, 1), e.onChangeYear && e.onChangeYear(this.parsedDate.year);
            break;
          case 'years':
            this.date = new Date(t.year - 10, 0, 1), e.onChangeDecade && e.onChangeDecade(this.curDecade);
        }
      },
      formatDate: function(t, e) {
        e = e || this.date;
        var i; var s = t;
                    var a = this._getWordBoundaryRegExp;
                    var h = this.loc;
                    var o = n.getLeadingZeroNum;
                    var r = n.getDecade(e);
                    var c = n.getParsedDate(e);
                    var d = c.fullHours;
                    var l = c.hours;
                    var u = t.match(a("aa")) || t.match(a("AA"));
                    var m = "am";
                    var p = this._replacer;
        switch (this.opts.timepicker && this.timepicker && u && (i = this.timepicker._getValidHoursFromDate(e, u), d = o(i.hours), l = i.hours, m = i.dayPeriod), !0) {
          case /@/.test(s):
            s = s.replace(/@/, e.getTime());
          case /aa/.test(s):
            s = p(s, a('aa'), m);
          case /AA/.test(s):
            s = p(s, a('AA'), m.toUpperCase());
          case /dd/.test(s):
            s = p(s, a('dd'), c.fullDate);
          case /d/.test(s):
            s = p(s, a('d'), c.date);
          case /DD/.test(s):
            s = p(s, a('DD'), h.days[c.day]);
          case /D/.test(s):
            s = p(s, a('D'), h.daysShort[c.day]);
          case /mm/.test(s):
            s = p(s, a('mm'), c.fullMonth);
          case /m/.test(s):
            s = p(s, a('m'), c.month + 1);
          case /MM/.test(s):
            s = p(s, a('MM'), this.loc.months[c.month]);
          case /M/.test(s):
            s = p(s, a('M'), h.monthsShort[c.month]);
          case /ii/.test(s):
            s = p(s, a('ii'), c.fullMinutes);
          case /i/.test(s):
            s = p(s, a('i'), c.minutes);
          case /hh/.test(s):
            s = p(s, a('hh'), d);
          case /h/.test(s):
            s = p(s, a('h'), l);
          case /yyyy/.test(s):
            s = p(s, a('yyyy'), c.year);
          case /yyyy1/.test(s):
            s = p(s, a('yyyy1'), r[0]);
          case /yyyy2/.test(s):
            s = p(s, a('yyyy2'), r[1]);
          case /yy/.test(s):
            s = p(s, a('yy'), c.year.toString().slice(-2));
        }
        return s;
      },
      _replacer: function(t, e, i) {
        return t.replace(e, function(t, e, s, a) {
          return e + i + a;
        });
      },
      _getWordBoundaryRegExp: function(t) {
        var e = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
        return new RegExp('(^|>|' + e + ')(' + t + ')($|<|' + e + ')', 'g');
      },
      selectDate: function(t) {
        var e = this;
                    var i = e.opts;
                    var s = e.parsedDate;
                    var a = e.selectedDates;
                    var h = a.length;
                    var o = '';
        if (Array.isArray(t)) {return void t.forEach(function(t) {
                    e.selectDate(t)
                });}
        if (t instanceof Date) {
          if (this.lastSelectedDate = t, this.timepicker && this.timepicker._setTime(t), e._trigger('selectDate', t), this.timepicker && (t.setHours(this.timepicker.hours), t.setMinutes(this.timepicker.minutes)), 'days' == e.view && t.getMonth() != s.month && i.moveToOtherMonthsOnSelect && (o = new Date(t.getFullYear(), t.getMonth(), 1)), 'years' == e.view && t.getFullYear() != s.year && i.moveToOtherYearsOnSelect && (o = new Date(t.getFullYear(), 0, 1)), o && (e.silent = !0, e.date = o, e.silent = !1, e.nav._render()), i.multipleDates && !i.range) {
            if (h === i.multipleDates) return;
            e._isSelected(t) || e.selectedDates.push(t);
          } else i.range ? 2 == h ? (e.selectedDates = [t], e.minRange = t, e.maxRange = '') : 1 == h ? (e.selectedDates.push(t), e.maxRange ? e.minRange = t : e.maxRange = t, n.bigger(e.maxRange, e.minRange) && (e.maxRange = e.minRange, e.minRange = t), e.selectedDates = [e.minRange, e.maxRange]) : (e.selectedDates = [t], e.minRange = t) : e.selectedDates = [t];
          e._setInputValue(), i.onSelect && e._triggerOnChange(), i.autoClose && !this.timepickerIsActive && (i.multipleDates || i.range ? i.range && 2 == e.selectedDates.length && e.hide() : e.hide()), e.views[this.currentView]._render();
        }
      },
      removeDate: function(t) {
        var e = this.selectedDates;
                    var i = this;
        if (t instanceof Date) {return e.some(function(s, a) {
                    return n.isSame(s, t) ? (e.splice(a, 1), i.selectedDates.length ? i.lastSelectedDate = i.selectedDates[i.selectedDates.length - 1] : (i.minRange = "", i.maxRange = "", i.lastSelectedDate = ""), i.views[i.currentView]._render(), i._setInputValue(), i.opts.onSelect && i._triggerOnChange(), !0) : void 0
                })}
      },
      today: function() {
        this.silent = !0, this.view = this.opts.minView, this.silent = !1, this.date = new Date, this.opts.todayButton instanceof Date && this.selectDate(this.opts.todayButton);
      },
      clear: function() {
        this.selectedDates = [], this.minRange = '', this.maxRange = '', this.views[this.currentView]._render(), this._setInputValue(), this.opts.onSelect && this._triggerOnChange();
      },
      update: function(t, i) {
        var s = arguments.length;
                    var a = this.lastSelectedDate;
        return 2 == s ? this.opts[t] = i : 1 == s && 'object' == typeof t && (this.opts = e.extend(!0, this.opts, t)), this._createShortCuts(), this._syncWithMinMaxDates(), this._defineLocale(this.opts.language), this.nav._addButtonsIfNeed(), this.opts.onlyTimepicker || this.nav._render(), this.views[this.currentView]._render(), this.elIsInput && !this.opts.inline && (this._setPositionClasses(this.opts.position), this.visible && this.setPosition(this.opts.position)), this.opts.classes && this.$datepicker.addClass(this.opts.classes), this.opts.onlyTimepicker && this.$datepicker.addClass('-only-timepicker-'), this.opts.timepicker && (a && this.timepicker._handleDate(a), this.timepicker._updateRanges(), this.timepicker._updateCurrentTime(), a && (a.setHours(this.timepicker.hours), a.setMinutes(this.timepicker.minutes))), this._setInputValue(), this;
      },
      _syncWithMinMaxDates: function() {
        var t = this.date.getTime();
        this.silent = !0, this.minTime > t && (this.date = this.minDate), this.maxTime < t && (this.date = this.maxDate), this.silent = !1;
      },
      _isSelected: function(t, e) {
        var i = !1;
        return this.selectedDates.some(function(s) {
          return n.isSame(s, t, e) ? (i = s, !0) : void 0;
        }), i;
      },
      _setInputValue: function() {
        var t; var e = this;
                    var i = e.opts;
                    var s = e.loc.dateFormat;
                    var a = i.altFieldDateFormat;
                    var n = e.selectedDates.map(function(t) {
            return e.formatDate(s, t);
          });
        i.altField && e.$altField.length && (t = this.selectedDates.map(function(t) {
          return e.formatDate(a, t);
        }), t = t.join(this.opts.multipleDatesSeparator), this.$altField.val(t)), n = n.join(this.opts.multipleDatesSeparator), this.$el.val(n);
      },
      _isInRange: function(t, e) {
        var i = t.getTime();
                    var s = n.getParsedDate(t);
                    var a = n.getParsedDate(this.minDate);
                    var h = n.getParsedDate(this.maxDate);
                    var o = new Date(s.year, s.month, a.date).getTime();
                    var r = new Date(s.year, s.month, h.date).getTime();
                    var c = {
            day: i >= this.minTime && i <= this.maxTime,
            month: o >= this.minTime && r <= this.maxTime,
            year: s.year >= a.year && s.year <= h.year,
          };
        return e ? c[e] : c.day;
      },
      _getDimensions: function(t) {
        var e = t.offset();
        return {
          width: t.outerWidth(),
          height: t.outerHeight(),
          left: e.left,
          top: e.top,
        };
      },
      _getDateFromCell: function(t) {
        var e = this.parsedDate;
                    var s = t.data("year") || e.year;
                    var a = t.data("month") == i ? e.month : t.data("month");
                    var n = t.data('date') || 1;
        return new Date(s, a, n);
      },
      _setPositionClasses: function(t) {
        t = t.split(' ');
        var e = t[0];
                    var i = t[1];
                    var s = 'datepicker -' + e + '-' + i + '- -from-' + e + '-';
        this.visible && (s += ' active'), this.$datepicker.removeAttr('class').addClass(s);
      },
      setPosition: function(t) {
        t = t || this.opts.position;
        var e; var i; var s = this._getDimensions(this.$el);
                    var a = this._getDimensions(this.$datepicker);
                    var n = t.split(" ");
                    var h = this.opts.offset;
                    var o = n[0];
                    var r = n[1];
        switch (o) {
          case 'top':
            e = s.top - a.height - h;
            break;
          case 'right':
            i = s.left + s.width + h;
            break;
          case 'bottom':
            e = s.top + s.height + h;
            break;
          case 'left':
            i = s.left - a.width - h;
        }
        switch (r) {
          case 'top':
            e = s.top;
            break;
          case 'right':
            i = s.left + s.width - a.width;
            break;
          case 'bottom':
            e = s.top + s.height - a.height;
            break;
          case 'left':
            i = s.left;
            break;
          case 'center':
                        /left|right/.test(o) ? e = s.top + s.height / 2 - a.height / 2 : i = s.left + s.width / 2 - a.width / 2;
        }
        this.$datepicker.css({
          left: i,
          top: e,
        });
      },
      show: function() {
        var t = this.opts.onShow;
        this.setPosition(this.opts.position), this.$datepicker.addClass('active'), this.visible = !0, t && this._bindVisionEvents(t);
      },
      hide: function() {
        var t = this.opts.onHide;
        this.$datepicker.removeClass('active').css({
          left: '-100000px'
        }), this.focused = '', this.keys = [], this.inFocus = !1, this.visible = !1, this.$el.blur(), t && this._bindVisionEvents(t);
      },
      down: function(t) {
        this._changeView(t, 'down');
      },
      up: function(t) {
        this._changeView(t, 'up');
      },
      _bindVisionEvents: function(t) {
        this.$datepicker.off('transitionend.dp'), t(this, !1), this.$datepicker.one('transitionend.dp', t.bind(this, this, !0));
      },
      _changeView: function(t, e) {
        t = t || this.focused || this.date;
        var i = 'up' == e ? this.viewIndex + 1 : this.viewIndex - 1;
        i > 2 && (i = 2), 0 > i && (i = 0), this.silent = !0, this.date = new Date(t.getFullYear(), t.getMonth(), 1), this.silent = !1, this.view = this.viewIndexes[i];
      },
      _handleHotKey: function(t) {
        var e; var i; var s; var a = n.getParsedDate(this._getFocusedDate());
                    var h = this.opts;
                    var o = !1;
                    var r = !1;
                    var c = !1;
                    var d = a.year;
                    var l = a.month;
                    var u = a.date;
        switch (t) {
          case 'ctrlRight':
          case 'ctrlUp':
            l += 1, o = !0;
            break;
          case 'ctrlLeft':
          case 'ctrlDown':
            l -= 1, o = !0;
            break;
          case 'shiftRight':
          case 'shiftUp':
            r = !0, d += 1;
            break;
          case 'shiftLeft':
          case 'shiftDown':
            r = !0, d -= 1;
            break;
          case 'altRight':
          case 'altUp':
            c = !0, d += 10;
            break;
          case 'altLeft':
          case 'altDown':
            c = !0, d -= 10;
            break;
          case 'ctrlShiftUp':
            this.up();
        }
        s = n.getDaysCount(new Date(d, l)), i = new Date(d, l, u), u > s && (u = s), i.getTime() < this.minTime ? i = this.minDate : i.getTime() > this.maxTime && (i = this.maxDate), this.focused = i, e = n.getParsedDate(i), o && h.onChangeMonth && h.onChangeMonth(e.month, e.year), r && h.onChangeYear && h.onChangeYear(e.year), c && h.onChangeDecade && h.onChangeDecade(this.curDecade);
      },
      _registerKey: function(t) {
        var e = this.keys.some(function(e) {
          return e == t;
        });
        e || this.keys.push(t);
      },
      _unRegisterKey: function(t) {
        var e = this.keys.indexOf(t);
        this.keys.splice(e, 1);
      },
      _isHotKeyPressed: function() {
        var t; var e = !1;
                    var i = this;
                    var s = this.keys.sort();
        for (let a in u) {t = u[a], s.length == t.length && t.every(function(t, e) {
                    return t == s[e]
                }) && (i._trigger("hotKey", a), e = !0);}
        return e;
      },
      _trigger: function(t, e) {
        this.$el.trigger(t, e);
      },
      _focusNextCell: function(t, e) {
        e = e || this.cellType;
        var i = n.getParsedDate(this._getFocusedDate());
                    var s = i.year;
                    var a = i.month;
                    var h = i.date;
        if (!this._isHotKeyPressed()) {
          switch (t) {
            case 37:
                            'day' == e ? h -= 1 : '', 'month' == e ? a -= 1 : '', 'year' == e ? s -= 1 : '';
              break;
            case 38:
                            'day' == e ? h -= 7 : '', 'month' == e ? a -= 3 : '', 'year' == e ? s -= 4 : '';
              break;
            case 39:
                            'day' == e ? h += 1 : '', 'month' == e ? a += 1 : '', 'year' == e ? s += 1 : '';
              break;
            case 40:
                            'day' == e ? h += 7 : '', 'month' == e ? a += 3 : '', 'year' == e ? s += 4 : ''
          }
          var o = new Date(s, a, h);
                    o.getTime() < this.minTime ? o = this.minDate : o.getTime() > this.maxTime && (o = this.maxDate), this.focused = o;
        }
      },
      _getFocusedDate: function() {
        var t = this.focused || this.selectedDates[this.selectedDates.length - 1];
                    var e = this.parsedDate;
        if (!t) {switch (this.view) {
                    case "days":
                        t = new Date(e.year, e.month, (new Date).getDate());
                        break;
                    case "months":
                        t = new Date(e.year, e.month, 1);
                        break;
                    case "years":
                        t = new Date(e.year, 0, 1)
                }}
        return t;
      },
      _getCell: function(t, i) {
        i = i || this.cellType;
        var s; var a = n.getParsedDate(t);
                    var h = '.datepicker--cell[data-year="' + a.year + '"]';
        switch (i) {
          case 'month':
            h = '[data-month="' + a.month + '"]';
            break;
          case 'day':
            h += '[data-month="' + a.month + '"][data-date="' + a.date + '"]';
        }
        return s = this.views[this.currentView].$el.find(h), s.length ? s : e('');
      },
      destroy: function() {
        var t = this;
        t.$el.off('.adp').data('datepicker', ''), t.selectedDates = [], t.focused = '', t.views = {}, t.keys = [], t.minRange = '', t.maxRange = '', t.opts.inline || !t.elIsInput ? t.$datepicker.closest('.datepicker-inline').remove() : t.$datepicker.remove();
      },
      _handleAlreadySelectedDates: function(t, e) {
                this.opts.range ? this.opts.toggleSelected ? this.removeDate(e) : 2 != this.selectedDates.length && this._trigger('clickCell', e) : this.opts.toggleSelected && this.removeDate(e), this.opts.toggleSelected || (this.lastSelectedDate = t, this.opts.timepicker && (this.timepicker._setTime(t), this.timepicker.update()));
      },
      _onShowEvent: function(t) {
        this.visible || this.show();
      },
      _onBlur: function() {
        !this.inFocus && this.visible && this.hide();
      },
      _onMouseDownDatepicker: function(t) {
        this.inFocus = !0;
      },
      _onMouseUpDatepicker: function(t) {
        this.inFocus = !1, t.originalEvent.inFocus = !0, t.originalEvent.timepickerFocus || this.$el.focus();
      },
      _onKeyUpGeneral: function(t) {
        var e = this.$el.val();
        e || this.clear();
      },
      _onResize: function() {
        this.visible && this.setPosition();
      },
      _onMouseUpBody: function(t) {
        t.originalEvent.inFocus || this.visible && !this.inFocus && this.hide();
      },
      _onMouseUpEl: function(t) {
        t.originalEvent.inFocus = !0, setTimeout(this._onKeyUpGeneral.bind(this), 4);
      },
      _onKeyDown: function(t) {
        var e = t.which;
        if (this._registerKey(e), e >= 37 && 40 >= e && (t.preventDefault(), this._focusNextCell(e)), 13 == e && this.focused) {
          if (this._getCell(this.focused).hasClass('-disabled-')) return;
          if (this.view != this.opts.minView) this.down();
          else {
            var i = this._isSelected(this.focused, this.cellType);
            if (!i) return this.timepicker && (this.focused.setHours(this.timepicker.hours), this.focused.setMinutes(this.timepicker.minutes)), void this.selectDate(this.focused);
            this._handleAlreadySelectedDates(i, this.focused);
          }
        }
        27 == e && this.hide();
      },
      _onKeyUp: function(t) {
        var e = t.which;
        this._unRegisterKey(e);
      },
      _onHotKey: function(t, e) {
        this._handleHotKey(e);
      },
      _onMouseEnterCell: function(t) {
        var i = e(t.target).closest('.datepicker--cell');
                    var s = this._getDateFromCell(i);
        this.silent = !0, this.focused && (this.focused = ''), i.addClass('-focus-'), this.focused = s, this.silent = !1, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = '', n.less(this.minRange, this.focused) && (this.maxRange = this.minRange, this.minRange = ''), this.views[this.currentView]._update());
      },
      _onMouseLeaveCell: function(t) {
        var i = e(t.target).closest('.datepicker--cell');
        i.removeClass('-focus-'), this.silent = !0, this.focused = '', this.silent = !1;
      },
      _onTimeChange: function(t, e, i) {
        var s = new Date;
                    var a = this.selectedDates;
                    var n = !1;
        a.length && (n = !0, s = this.lastSelectedDate), s.setHours(e), s.setMinutes(i), n || this._getCell(s).hasClass('-disabled-') ? (this._setInputValue(), this.opts.onSelect && this._triggerOnChange()) : this.selectDate(s);
      },
      _onClickCell: function(t, e) {
        this.timepicker && (e.setHours(this.timepicker.hours), e.setMinutes(this.timepicker.minutes)), this.selectDate(e);
      },
      set focused(t) {
        if (!t && this.focused) {
          var e = this._getCell(this.focused);
          e.length && e.removeClass('-focus-');
        }
        this._focused = t, this.opts.range && 1 == this.selectedDates.length && (this.minRange = this.selectedDates[0], this.maxRange = '', n.less(this.minRange, this._focused) && (this.maxRange = this.minRange, this.minRange = '')), this.silent || (this.date = t);
      },
      get focused() {
        return this._focused;
      },
      get parsedDate() {
        return n.getParsedDate(this.date);
      },
      set date(t) {
        return t instanceof Date ? (this.currentDate = t, this.inited && !this.silent && (this.views[this.view]._render(), this.nav._render(), this.visible && this.elIsInput && this.setPosition()), t) : void 0;
      },
      get date() {
        return this.currentDate;
      },
      set view(t) {
        return this.viewIndex = this.viewIndexes.indexOf(t), this.viewIndex < 0 ? void 0 : (this.prevView = this.currentView, this.currentView = t, this.inited && (this.views[t] ? this.views[t]._render() : this.views[t] = new e.fn.datepicker.Body(this, t, this.opts), this.views[this.prevView].hide(), this.views[t].show(), this.nav._render(), this.opts.onChangeView && this.opts.onChangeView(t), this.elIsInput && this.visible && this.setPosition()), t);
      },
      get view() {
        return this.currentView;
      },
      get cellType() {
        return this.view.substring(0, this.view.length - 1);
      },
      get minTime() {
        var t = n.getParsedDate(this.minDate);
        return new Date(t.year, t.month, t.date).getTime();
      },
      get maxTime() {
        var t = n.getParsedDate(this.maxDate);
        return new Date(t.year, t.month, t.date).getTime();
      },
      get curDecade() {
        return n.getDecade(this.date);
      },
    }, n.getDaysCount = function(t) {
      return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    }, n.getParsedDate = function(t) {
      return {
        year: t.getFullYear(),
        month: t.getMonth(),
        fullMonth: t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1,
        date: t.getDate(),
        fullDate: t.getDate() < 10 ? '0' + t.getDate() : t.getDate(),
        day: t.getDay(),
        hours: t.getHours(),
        fullHours: t.getHours() < 10 ? '0' + t.getHours() : t.getHours(),
        minutes: t.getMinutes(),
        fullMinutes: t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(),
      };
    }, n.getDecade = function(t) {
      var e = 10 * Math.floor(t.getFullYear() / 10);
      return [e, e + 9];
    }, n.template = function(t, e) {
      return t.replace(/#\{([\w]+)\}/g, function(t, i) {
        return e[i] || 0 === e[i] ? e[i] : void 0;
      });
    }, n.isSame = function(t, e, i) {
      if (!t || !e) return !1;
      var s = n.getParsedDate(t);
                var a = n.getParsedDate(e);
                var h = i ? i : "day";
                var o = {
          day: s.date == a.date && s.month == a.month && s.year == a.year,
          month: s.month == a.month && s.year == a.year,
          year: s.year == a.year,
        };
      return o[h];
    }, n.less = function(t, e, i) {
      return t && e ? e.getTime() < t.getTime() : !1;
    }, n.bigger = function(t, e, i) {
      return t && e ? e.getTime() > t.getTime() : !1;
    }, n.getLeadingZeroNum = function(t) {
      return parseInt(t) < 10 ? '0' + t : t;
    }, n.resetTime = function(t) {
      return 'object' == typeof t ? (t = n.getParsedDate(t), new Date(t.year, t.month, t.date)) : void 0;
    }, e.fn.datepicker = function(t) {
      return this.each(function() {
        if (e.data(this, o)) {
          var i = e.data(this, o);
          i.opts = e.extend(!0, i.opts, t), i.update();
        } else e.data(this, o, new m(this, t));
      });
    }, e.fn.datepicker.Constructor = m, e.fn.datepicker.language = {
      ru: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.mm.yyyy',
        timeFormat: 'hh:ii',
        firstDay: 1,
      },
    }, e(function() {
      e(r).datepicker();
    });
  }(),
  function() {
    var t = {
        days: '<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',
        months: '<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',
        years: '<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>',
      };
            var s = e.fn.datepicker;
            var a = s.Constructor;
    s.Body = function(t, i, s) {
      this.d = t, this.type = i, this.opts = s, this.$el = e(''), this.opts.onlyTimepicker || this.init();
    }, s.Body.prototype = {
      init: function() {
        this._buildBaseHtml(), this._render(), this._bindEvents();
      },
      _bindEvents: function() {
        this.$el.on('click', '.datepicker--cell', e.proxy(this._onClickCell, this));
      },
      _buildBaseHtml: function() {
        this.$el = e(t[this.type]).appendTo(this.d.$content), this.$names = e('.datepicker--days-names', this.$el), this.$cells = e('.datepicker--cells', this.$el);
      },
      _getDayNamesHtml: function(t, e, s, a) {
        return e = e != i ? e : t, s = s ? s : '', a = a != i ? a : 0, a > 7 ? s : 7 == e ? this._getDayNamesHtml(t, 0, s, ++a) : (s += '<div class="datepicker--day-name' + (this.d.isWeekend(e) ? ' -weekend-' : '') + '">' + this.d.loc.daysMin[e] + '</div>', this._getDayNamesHtml(t, ++e, s, ++a));
      },
      _getCellContents: function(t, e) {
        var i = 'datepicker--cell datepicker--cell-' + e;
                    var s = new Date;
                    var n = this.d;
                    var h = a.resetTime(n.minRange);
                    var o = a.resetTime(n.maxRange);
                    var r = n.opts;
                    var c = a.getParsedDate(t);
                    var d = {};
                    var l = c.date;
        switch (e) {
          case 'day':
            n.isWeekend(c.day) && (i += ' -weekend-'), c.month != this.d.parsedDate.month && (i += ' -other-month-', r.selectOtherMonths || (i += ' -disabled-'), r.showOtherMonths || (l = ''));
            break;
          case 'month':
            l = n.loc[n.opts.monthsField][c.month];
            break;
          case 'year':
            var u = n.curDecade;
            l = c.year, (c.year < u[0] || c.year > u[1]) && (i += ' -other-decade-', r.selectOtherYears || (i += ' -disabled-'), r.showOtherYears || (l = ''));
        }
        return r.onRenderCell && (d = r.onRenderCell(t, e) || {}, l = d.html ? d.html : l, i += d.classes ? ' ' + d.classes : ''), r.range && (a.isSame(h, t, e) && (i += ' -range-from-'), a.isSame(o, t, e) && (i += ' -range-to-'), 1 == n.selectedDates.length && n.focused ? ((a.bigger(h, t) && a.less(n.focused, t) || a.less(o, t) && a.bigger(n.focused, t)) && (i += ' -in-range-'), a.less(o, t) && a.isSame(n.focused, t) && (i += ' -range-from-'), a.bigger(h, t) && a.isSame(n.focused, t) && (i += ' -range-to-')) : 2 == n.selectedDates.length && a.bigger(h, t) && a.less(o, t) && (i += ' -in-range-')), a.isSame(s, t, e) && (i += ' -current-'), n.focused && a.isSame(t, n.focused, e) && (i += ' -focus-'), n._isSelected(t, e) && (i += ' -selected-'), (!n._isInRange(t, e) || d.disabled) && (i += ' -disabled-'), {
          html: l,
          classes: i,
        };
      },
      _getDaysHtml: function(t) {
        var e = a.getDaysCount(t);
                    var i = new Date(t.getFullYear(), t.getMonth(), 1).getDay();
                    var s = new Date(t.getFullYear(), t.getMonth(), e).getDay();
                    var n = i - this.d.loc.firstDay;
                    var h = 6 - s + this.d.loc.firstDay;
        n = 0 > n ? n + 7 : n, h = h > 6 ? h - 7 : h;
        for (var o, r, c = -n + 1, d = '', l = c, u = e + h; u >= l; l++) r = t.getFullYear(), o = t.getMonth(), d += this._getDayHtml(new Date(r, o, l));
        return d;
      },
      _getDayHtml: function(t) {
        var e = this._getCellContents(t, 'day');
        return '<div class="' + e.classes + '" data-date="' + t.getDate() + '" data-month="' + t.getMonth() + '" data-year="' + t.getFullYear() + '">' + e.html + '</div>'
      },
      _getMonthsHtml: function(t) {
        for (var e = '', i = a.getParsedDate(t), s = 0; 12 > s;) e += this._getMonthHtml(new Date(i.year, s)), s++;
        return e;
      },
      _getMonthHtml: function(t) {
        var e = this._getCellContents(t, 'month');
        return '<div class="' + e.classes + '" data-month="' + t.getMonth() + '">' + e.html + '</div>'
      },
      _getYearsHtml: function(t) {
        var e = (a.getParsedDate(t), a.getDecade(t));
                    var i = e[0] - 1;
                    var s = "";
                    var n = i;
        for (n; n <= e[1] + 1; n++) s += this._getYearHtml(new Date(n, 0));
        return s;
      },
      _getYearHtml: function(t) {
        var e = this._getCellContents(t, 'year');
        return '<div class="' + e.classes + '" data-year="' + t.getFullYear() + '">' + e.html + '</div>'
      },
      _renderTypes: {
        days: function() {
          var t = this._getDayNamesHtml(this.d.loc.firstDay);
                        var e = this._getDaysHtml(this.d.currentDate);
          this.$cells.html(e), this.$names.html(t);
        },
        months: function() {
          var t = this._getMonthsHtml(this.d.currentDate);
          this.$cells.html(t);
        },
        years: function() {
          var t = this._getYearsHtml(this.d.currentDate);
          this.$cells.html(t);
        },
      },
      _render: function() {
        this.opts.onlyTimepicker || this._renderTypes[this.type].bind(this)();
      },
      _update: function() {
        var t; var i; var s; var a = e(".datepicker--cell", this.$cells);
                    var n = this;
        a.each(function(a, h) {
          i = e(this), s = n.d._getDateFromCell(e(this)), t = n._getCellContents(s, n.d.cellType), i.attr('class', t.classes);
        });
      },
      show: function() {
        this.opts.onlyTimepicker || (this.$el.addClass('active'), this.acitve = !0);
      },
      hide: function() {
        this.$el.removeClass('active'), this.active = !1;
      },
      _handleClick: function(t) {
        var e = t.data('date') || 1;
                    var i = t.data("month") || 0;
                    var s = t.data("year") || this.d.parsedDate.year;
                    var a = this.d;
        if (a.view != this.opts.minView) return void a.down(new Date(s, i, e));
        var n = new Date(s, i, e);
                    var h = this.d._isSelected(n, this.d.cellType);
        return h ? void a._handleAlreadySelectedDates.bind(a, h, n)() : void a._trigger('clickCell', n);
      },
      _onClickCell: function(t) {
        var i = e(t.target).closest('.datepicker--cell');
        i.hasClass('-disabled-') || this._handleClick.bind(this)(i);
      },
    };
  }(),
  function() {
    var t = '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>';
            var i = '<div class="datepicker--buttons"></div>';
            var s = '<span class="datepicker--button" data-action="#{action}">#{label}</span>';
            var a = e.fn.datepicker;
            var n = a.Constructor;
    a.Navigation = function(t, e) {
      this.d = t, this.opts = e, this.$buttonsContainer = '', this.init();
    }, a.Navigation.prototype = {
      init: function() {
        this._buildBaseHtml(), this._bindEvents();
      },
      _bindEvents: function() {
        this.d.$nav.on('click', '.datepicker--nav-action', e.proxy(this._onClickNavButton, this)), this.d.$nav.on('click', '.datepicker--nav-title', e.proxy(this._onClickNavTitle, this)), this.d.$datepicker.on('click', '.datepicker--button', e.proxy(this._onClickNavButton, this));
      },
      _buildBaseHtml: function() {
        this.opts.onlyTimepicker || this._render(), this._addButtonsIfNeed();
      },
      _addButtonsIfNeed: function() {
        this.opts.todayButton && this._addButton('today'), this.opts.clearButton && this._addButton('clear');
      },
      _render: function() {
        var i = this._getTitle(this.d.currentDate);
                    var s = n.template(t, e.extend({
            title: i,
          }, this.opts));
        this.d.$nav.html(s), 'years' == this.d.view && e('.datepicker--nav-title', this.d.$nav).addClass('-disabled-'), this.setNavStatus();
      },
      _getTitle: function(t) {
        return this.d.formatDate(this.opts.navTitles[this.d.view], t);
      },
      _addButton: function(t) {
        this.$buttonsContainer.length || this._addButtonsContainer();
        var i = {
            action: t,
            label: this.d.loc[t],
          };
                    var a = n.template(s, i);
        e('[data-action=' + t + ']', this.$buttonsContainer).length || this.$buttonsContainer.append(a);
      },
      _addButtonsContainer: function() {
        this.d.$datepicker.append(i), this.$buttonsContainer = e('.datepicker--buttons', this.d.$datepicker);
      },
      setNavStatus: function() {
        if ((this.opts.minDate || this.opts.maxDate) && this.opts.disableNavWhenOutOfRange) {
          var t = this.d.parsedDate;
                        var e = t.month;
                        var i = t.year;
                        var s = t.date;
          switch (this.d.view) {
            case 'days':
              this.d._isInRange(new Date(i, e - 1, 1), 'month') || this._disableNav('prev'), this.d._isInRange(new Date(i, e + 1, 1), 'month') || this._disableNav('next');
              break;
            case 'months':
              this.d._isInRange(new Date(i - 1, e, s), 'year') || this._disableNav('prev'), this.d._isInRange(new Date(i + 1, e, s), 'year') || this._disableNav('next');
              break;
            case 'years':
              var a = n.getDecade(this.d.date);
              this.d._isInRange(new Date(a[0] - 1, 0, 1), 'year') || this._disableNav('prev'), this.d._isInRange(new Date(a[1] + 1, 0, 1), 'year') || this._disableNav('next');
          }
        }
      },
      _disableNav: function(t) {
        e('[data-action="' + t + '"]', this.d.$nav).addClass('-disabled-');
      },
      _activateNav: function(t) {
        e('[data-action="' + t + '"]', this.d.$nav).removeClass('-disabled-');
      },
      _onClickNavButton: function(t) {
        var i = e(t.target).closest('[data-action]');
                    var s = i.data('action');
        this.d[s]();
      },
      _onClickNavTitle: function(t) {
        return e(t.target).hasClass('-disabled-') ? void 0 : 'days' == this.d.view ? this.d.view = 'months' : void(this.d.view = 'years');
      },
    };
  }(),
  function() {
    var t = '<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>';
            var i = e.fn.datepicker;
            var s = i.Constructor;
    i.Timepicker = function(t, e) {
      this.d = t, this.opts = e, this.init();
    }, i.Timepicker.prototype = {
      init: function() {
        var t = 'input';
        this._setTime(this.d.date), this._buildHTML(), navigator.userAgent.match(/trident/gi) && (t = 'change'), this.d.$el.on('selectDate', this._onSelectDate.bind(this)), this.$ranges.on(t, this._onChangeRange.bind(this)), this.$ranges.on('mouseup', this._onMouseUpRange.bind(this)), this.$ranges.on('mousemove focus ', this._onMouseEnterRange.bind(this)), this.$ranges.on('mouseout blur', this._onMouseOutRange.bind(this));
      },
      _setTime: function(t) {
        var e = s.getParsedDate(t);
        this._handleDate(t), this.hours = e.hours < this.minHours ? this.minHours : e.hours, this.minutes = e.minutes < this.minMinutes ? this.minMinutes : e.minutes;
      },
      _setMinTimeFromDate: function(t) {
        this.minHours = t.getHours(), this.minMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() > t.getHours() && (this.minMinutes = this.opts.minMinutes);
      },
      _setMaxTimeFromDate: function(t) {
        this.maxHours = t.getHours(), this.maxMinutes = t.getMinutes(), this.d.lastSelectedDate && this.d.lastSelectedDate.getHours() < t.getHours() && (this.maxMinutes = this.opts.maxMinutes);
      },
      _setDefaultMinMaxTime: function() {
        var t = 23;
                    var e = 59;
                    var i = this.opts;
        this.minHours = i.minHours < 0 || i.minHours > t ? 0 : i.minHours, this.minMinutes = i.minMinutes < 0 || i.minMinutes > e ? 0 : i.minMinutes, this.maxHours = i.maxHours < 0 || i.maxHours > t ? t : i.maxHours, this.maxMinutes = i.maxMinutes < 0 || i.maxMinutes > e ? e : i.maxMinutes;
      },
      _validateHoursMinutes: function(t) {
                this.hours < this.minHours ? this.hours = this.minHours : this.hours > this.maxHours && (this.hours = this.maxHours), this.minutes < this.minMinutes ? this.minutes = this.minMinutes : this.minutes > this.maxMinutes && (this.minutes = this.maxMinutes);
      },
      _buildHTML: function() {
        var i = s.getLeadingZeroNum;
                    var a = {
                        hourMin: this.minHours,
                        hourMax: i(this.maxHours),
                        hourStep: this.opts.hoursStep,
                        hourValue: this.hours,
                        hourVisible: i(this.displayHours),
                        minMin: this.minMinutes,
                        minMax: i(this.maxMinutes),
                        minStep: this.opts.minutesStep,
                        minValue: i(this.minutes)
                    };
                    var n = s.template(t, a);
        this.$timepicker = e(n).appendTo(this.d.$datepicker), this.$ranges = e('[type="range"]', this.$timepicker), this.$hours = e('[name="hours"]', this.$timepicker), this.$minutes = e('[name="minutes"]', this.$timepicker), this.$hoursText = e('.datepicker--time-current-hours', this.$timepicker), this.$minutesText = e('.datepicker--time-current-minutes', this.$timepicker), this.d.ampm && (this.$ampm = e('<span class="datepicker--time-current-ampm">').appendTo(e('.datepicker--time-current', this.$timepicker)).html(this.dayPeriod), this.$timepicker.addClass('-am-pm-'));
      },
      _updateCurrentTime: function() {
        var t = s.getLeadingZeroNum(this.displayHours);
                    var e = s.getLeadingZeroNum(this.minutes);
        this.$hoursText.html(t), this.$minutesText.html(e), this.d.ampm && this.$ampm.html(this.dayPeriod);
      },
      _updateRanges: function() {
        this.$hours.attr({
          min: this.minHours,
          max: this.maxHours,
        }).val(this.hours), this.$minutes.attr({
          min: this.minMinutes,
          max: this.maxMinutes,
        }).val(this.minutes);
      },
      _handleDate: function(t) {
        this._setDefaultMinMaxTime(), t && (s.isSame(t, this.d.opts.minDate) ? this._setMinTimeFromDate(this.d.opts.minDate) : s.isSame(t, this.d.opts.maxDate) && this._setMaxTimeFromDate(this.d.opts.maxDate)), this._validateHoursMinutes(t);
      },
      update: function() {
        this._updateRanges(), this._updateCurrentTime();
      },
      _getValidHoursFromDate: function(t, e) {
        var i = t;
                    var a = t;
        t instanceof Date && (i = s.getParsedDate(t), a = i.hours);
        var n = e || this.d.ampm;
                    var h = 'am';
        if (n) {switch (!0) {
                    case 0 == a:
                        a = 12;
                        break;
                    case 12 == a:
                        h = "pm";
                        break;
                    case a > 11:
                        a -= 12, h = "pm"
                }}
        return {
          hours: a,
          dayPeriod: h,
        };
      },
      set hours(t) {
        this._hours = t;
        var e = this._getValidHoursFromDate(t);
        this.displayHours = e.hours, this.dayPeriod = e.dayPeriod;
      },
      get hours() {
        return this._hours;
      },
      _onChangeRange: function(t) {
        var i = e(t.target);
                    var s = i.attr('name');
        this.d.timepickerIsActive = !0, this[s] = i.val(), this._updateCurrentTime(), this.d._trigger('timeChange', [this.hours, this.minutes]), this._handleDate(this.d.lastSelectedDate), this.update();
      },
      _onSelectDate: function(t, e) {
        this._handleDate(e), this.update();
      },
      _onMouseEnterRange: function(t) {
        var i = e(t.target).attr('name');
        e('.datepicker--time-current-' + i, this.$timepicker).addClass('-focus-');
      },
      _onMouseOutRange: function(t) {
        var i = e(t.target).attr('name');
        this.d.inFocus || e('.datepicker--time-current-' + i, this.$timepicker).removeClass('-focus-');
      },
      _onMouseUpRange: function(t) {
        this.d.timepickerIsActive = !1;
      },
    };
  }();
}(window, jQuery);

;
(function($) {
  $.fn.datepicker.language['zh'] = {
    days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    daysShort: ['日', '一', '二', '三', '四', '五', '六'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除',
    dateFormat: 'yyyy-mm-dd',
    timeFormat: 'hh:ii',
    firstDay: 1,
  };
})(jQuery);

/* !
 * Lightbox v2.11.1
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
! function(a, b) {
    'function' == typeof define && define.amd ? define(['jquery'], b) : 'object' == typeof exports ? module.exports = b(require('jquery')) : a.lightbox = b(a.jQuery);
}(this, function(a) {
  function b(b) {
    this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b);
  }
  return b.defaults = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: !1,
    fadeDuration: 600,
    fitImagesInViewport: !0,
    imageFadeDuration: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: !0,
    wrapAround: !1,
    disableScrolling: !1,
    sanitizeTitle: !1,
  }, b.prototype.option = function(b) {
    a.extend(this.options, b);
  }, b.prototype.imageCountLabel = function(a, b) {
    return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b);
  }, b.prototype.init = function() {
    var b = this;
    a(document).ready(function() {
      b.enable(), b.build();
    });
  }, b.prototype.enable = function() {
    var b = this;
    a('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(c) {
      return b.start(a(c.currentTarget)), !1;
    });
  }, b.prototype.build = function() {
    if (!(a('#lightbox').length > 0)) {
      var b = this;
      a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a('body')), this.$lightbox = a('#lightbox'), this.$overlay = a('#lightboxOverlay'), this.$outerContainer = this.$lightbox.find('.lb-outerContainer'), this.$container = this.$lightbox.find('.lb-container'), this.$image = this.$lightbox.find('.lb-image'), this.$nav = this.$lightbox.find('.lb-nav'), this.containerPadding = {
        top: parseInt(this.$container.css('padding-top'), 10),
        right: parseInt(this.$container.css('padding-right'), 10),
        bottom: parseInt(this.$container.css('padding-bottom'), 10),
        left: parseInt(this.$container.css('padding-left'), 10),
      }, this.imageBorderWidth = {
        top: parseInt(this.$image.css('border-top-width'), 10),
        right: parseInt(this.$image.css('border-right-width'), 10),
        bottom: parseInt(this.$image.css('border-bottom-width'), 10),
        left: parseInt(this.$image.css('border-left-width'), 10),
      }, this.$overlay.hide().on('click', function() {
        return b.end(), !1;
      }), this.$lightbox.hide().on('click', function(c) {
        "lightbox" === a(c.target).attr('id') && b.end();
      }), this.$outerContainer.on('click', function(c) {
        return 'lightbox' === a(c.target).attr('id') && b.end(), !1;
      }), this.$lightbox.find('.lb-prev').on('click', function() {
        return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1;
      }), this.$lightbox.find('.lb-next').on('click', function() {
        return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1;
      }), this.$nav.on('mousedown', function(a) {
        3 === a.which && (b.$nav.css('pointer-events', 'none'), b.$lightbox.one('contextmenu', function() {
          setTimeout(function() {
            this.$nav.css('pointer-events', 'auto');
          }.bind(b), 0);
        }));
      }), this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
        return b.end(), !1;
      });
    }
  }, b.prototype.start = function(b) {
    function c(a) {
      d.album.push({
        alt: a.attr('data-alt'),
        link: a.attr('href'),
        title: a.attr('data-title') || a.attr('title'),
      });
    }
    var d = this;
            var e = a(window);
    e.on('resize', a.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
    var f; var g = 0;
            var h = b.attr('data-lightbox');
    if (h) {
      f = a(b.prop('tagName') + '[data-lightbox="' + h + '"]');
      for (let i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i);
    } else if ('lightbox' === b.attr('rel')) c(b);
    else {
      f = a(b.prop('tagName') + '[rel="' + b.attr('rel') + '"]');
      for (let j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j);
    }
    var k = e.scrollTop() + this.options.positionFromTop;
            var l = e.scrollLeft();
    this.$lightbox.css({
      top: k + 'px',
      left: l + 'px'
    }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a('body').addClass('lb-disable-scrolling'), this.changeImage(g);
  }, b.prototype.changeImage = function(b) {
    var c = this;
            var d = this.album[b].link;
            var e = d.split(".").slice(-1)[0];
            var f = this.$lightbox.find('.lb-image');
    this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), a('.lb-loader').fadeIn('slow'), this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide(), this.$outerContainer.addClass('animating');
    var g = new Image;
    g.onload = function() {
      var h; var i; var j; var k; var l; var m;
      f.attr({
        alt: c.album[b].alt,
        src: d,
      }), a(g), f.width(g.width), f.height(g.height), m = a(window).width(), l = a(window).height(), k = m - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, j = l - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - c.options.positionFromTop - 70, 'svg' === e && (0 !== g.width && 0 !== g.height || (f.width(k), f.height(j))), c.options.fitImagesInViewport ? (c.options.maxWidth && c.options.maxWidth < k && (k = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (j = c.options.maxHeight)) : (k = c.options.maxWidth || g.width || k, j = c.options.maxHeight || g.height || j), (g.width > k || g.height > j) && (g.width / k > g.height / j ? (i = k, h = parseInt(g.height / (g.width / i), 10), f.width(i), f.height(h)) : (h = j, i = parseInt(g.width / (g.height / h), 10), f.width(i), f.height(h))), c.sizeContainer(f.width(), f.height());
    }, g.src = this.album[b].link, this.currentImageIndex = b;
  }, b.prototype.sizeOverlay = function() {
    var b = this;
    setTimeout(function() {
      b.$overlay.width(a(document).width()).height(a(document).height());
    }, 0);
  }, b.prototype.sizeContainer = function(a, b) {
    function c() {
      d.$lightbox.find('.lb-dataContainer').width(g), d.$lightbox.find('.lb-prevLink').height(h), d.$lightbox.find('.lb-nextLink').height(h), d.$overlay.focus(), d.showImage();
    }
    var d = this;
            var e = this.$outerContainer.outerWidth();
            var f = this.$outerContainer.outerHeight();
            var g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
            var h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
        e !== g || f !== h ? this.$outerContainer.animate({
          width: g,
          height: h,
        }, this.options.resizeDuration, 'swing', function() {
          c();
        }) : c();
  }, b.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(!0).hide(), this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav();
  }, b.prototype.updateNav = function() {
    var a = !1;
    try {
      document.createEvent('TouchEvent'), a = !!this.options.alwaysShowNavOnTouchDevices;
    } catch (a) {}
    this.$lightbox.find('.lb-nav').show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1'), this.$lightbox.find('.lb-prev, .lb-next').show()) : (this.currentImageIndex > 0 && (this.$lightbox.find('.lb-prev').show(), a && this.$lightbox.find('.lb-prev').css('opacity', '1')), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find('.lb-next').show(), a && this.$lightbox.find('.lb-next').css('opacity', '1'))));
  }, b.prototype.updateDetails = function() {
    var a = this;
    if (void 0 !== this.album[this.currentImageIndex].title && '' !== this.album[this.currentImageIndex].title) {
      var b = this.$lightbox.find('.lb-caption');
            this.options.sanitizeTitle ? b.text(this.album[this.currentImageIndex].title) : b.html(this.album[this.currentImageIndex].title), b.fadeIn('fast');
    }
    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(c).fadeIn('fast');
    } else this.$lightbox.find('.lb-number').hide();
    this.$outerContainer.removeClass('animating'), this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return a.sizeOverlay();
    });
  }, b.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      (new Image).src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      (new Image).src = this.album[this.currentImageIndex - 1].link;
    }
  }, b.prototype.enableKeyboardNav = function() {
    this.$lightbox.on('keyup.keyboard', a.proxy(this.keyboardAction, this)), this.$overlay.on('keyup.keyboard', a.proxy(this.keyboardAction, this));
  }, b.prototype.disableKeyboardNav = function() {
    this.$lightbox.off('.keyboard'), this.$overlay.off('.keyboard');
  }, b.prototype.keyboardAction = function(a) {
    var b = a.keyCode;
        27 === b ? (a.stopPropagation(), this.end()) : 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === b && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0));
  }, b.prototype.end = function() {
    this.disableKeyboardNav(), a(window).off('resize', this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && a('body').removeClass('lb-disable-scrolling');
  }, new b;
});
// # sourceMappingURL=lightbox.min.map

// Main.js
const roomsURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
const roomURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/";
const token = "3tkZlYd8R8XzCo2BEJSVrWk0lfCjQetT7gYpB9DPwW0ojctPdzTXvOjZJ2vg";
let roomsData = [];
let myRoomData = {};
let currentid;
let selectDate = [];

function getHomeData() {
    fetch(roomsURL, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                console.log('status ' + response.status);
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })
        .then(function(data) {
            //console.log('data ' + data + "  sucess   " + data.success);
            // for (var i = 0; i < data.items.length; i++) {
            //     var slide = '<div class="swiper-slide"><img src="' + data.items[i].imageUrl + '" data-src="' + data.items[i].imageUrl + '" alt="' + data.items[i].name + '" /></div>';
            //     $('.swiper-wrapper').append(slide);
            // }
            parseData(data);
        }).catch(function(error) {
            console.log('request failed', error);
            return error.response.json();
        });
}

function parseData(data) {
    for (var i = 0; i < data.items.length; i++) {
        roomsData.push(data.items[i]);
    }
    buildHtml();
}

function buildHtml() {
    for (var i = 0; i < roomsData.length; i++) {
        //bg
        var slide = '<div class="swiper-slide"><img src="' + roomsData[i].imageUrl + '" data-src="' + roomsData[i].imageUrl + '" alt="' + roomsData[i].name + '" /></div>';
        $('.swiper-wrapper').append(slide);
        //section
        var room = '<li class="room-block" data-id="' + roomsData[i].id + '">' +
            '<a href="room.html?' + roomsData[i].id + '">' +
            '<img class="center-cropped" src="' + roomsData[i].imageUrl + '" alt="' + roomsData[i].name + '" />' +
            '<div class="room-info">' +
            '<h4>' + roomsData[i].name + '</h4>' +
            '<div class="price-info">' +
            '<h3>NT.<span class="normal-price">' + roomsData[i].normalDayPrice + '</span><span class="small">&nbsp;Weekday</span></h3>' +
            '<p class="small">NT.<span class="holiday-price">' + roomsData[i].holidayPrice + '</span>&nbsp;Weekend</p>' +
            '</div></div></a></li>';
        $('.rooms-pane').append(room);
    }
    buildApp();
}

function buildApp() {
    buildBg();
    // buildRooms();
}

function buildBg() {
    $('.logo').addClass('loaded');
    $('main').addClass('show');
    var swiper = new Swiper('.swiper-container', {
        preloadImages: true,
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoHeight: true,
        autoplay: {
            delay: 5000
        },
        loop: true,
    });
}

function getRoomData(_currentid) {
    var fullRoomURL = roomURL + _currentid;
    fetch(fullRoomURL, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                console.log('status ' + response.status);
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })
        .then(function(data) {
            console.log('data ' + data + "  sucess   " + data.success);
            buildSelectedRoom(data);
        }).catch(function(error) {
            console.log('request failed', error);
            return error.response;
        });
}

function buildRooms() {
    $('.room-block').on('click', function() {
        let currentid = $(this).attr('data-id');
        getRoomData(currentid);
    })
}


function buildSelectedRoom(data) {
    var roomData = data.room[0];
    myRoomData = roomData;
    var photoHtml = '<div class="grid-item row-item70" style="background-image:url(' + roomData.imageUrl[0] + ');"><a href="' + roomData.imageUrl[0] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="row-item30 column">' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[1] + ');"><a href="' + roomData.imageUrl[1] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[2] + ');"><a href="' + roomData.imageUrl[2] + '" data-lightbox="roomImgs"></a></div>' +
        '</div>';
    $('.photo-grid .row').append(photoHtml);
    lightbox.option({
        //showImageNumberLabel: false
        wrapAround: false
    });
    $('.room-name').html(roomData.name);
    $('.guest-limit').html(roomData.descriptionShort.GuestMin + ' ~ ' + roomData.descriptionShort.GuestMax);
    $('.bed-type').html(roomData.descriptionShort.Bed.toString());
    $('.bath').html(roomData.descriptionShort["Private-Bath"]);
    $('.room-size').html(roomData.descriptionShort.Footage);
    $('.description').html(roomData.description);
    $('.check-in').html(roomData.checkInAndOut.checkInEarly + " - " + roomData.checkInAndOut.checkInLate);
    $('.check-out').html(roomData.checkInAndOut.checkOut);
    for (var i = 0; i < $('.amenities li').length; i++) {
        var dataKey = $('.amenities li').eq(i).attr('id');
        var value = roomData.amenities[dataKey];
        if (value == true) {
            $('.amenities li').eq(i).addClass('yes');
        }
    }
    $('.normal-price').html(roomData.normalDayPrice);
    $('.holiday-price').html(roomData.holidayPrice);
    renderRoomPage();
}

function renderRoomPage() {
    $('main').addClass('show');
    $("#datepicker").datepicker({
        inline: true,
        language: 'zh',
        minDate: new Date(),
        range: true,
        toggleSelected: false,
        navTitles: {
            days: 'yyyy / m',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        },
        onSelect: function(formattedDate, date, inst) {
            selectDate = [];
            selectDate = date;
        }
    });
    $('.reservation-btn').click(reservationClicked);
    $('.reset-date-icon').click(hideReservationPane);
    $('.cancel-btn').click(hideReservationPane);
    $('.submit-btn').click(submitClicked);
    $('.reservation-form').parsley().on('form:submit', function() {
            return false; // Don't submit form for this demo
        })
        .on('form:success', function() {
            let _data = {
                "name": $('#name').val(),
                "tel": $('#phone').val(),
                "date[]": getMultiDateArr(selectDate[0], selectDate[1])
            }
            console.log('send ' + _data);
            sendReservationData(currentid, $.param(_data, true));
        })
    $('.back-btn').click(backClicked);
}

function sendReservationData(_currentid, _data) {
    var fullRoomURL = roomURL + _currentid + "?" + _data;
    fetch(fullRoomURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        // body: JSON.stringify(_data)
    }).then((response) => {
        return response.json();
    }).then((jsonData) => {
        console.log(jsonData);
        let top = $('body').scrollTop() + ($(window).height() - $('.reservation-pane_response').height()) * 0.5;
        $('.reservation-pane_response').css('top', top + 'px');
        if (jsonData.success == true) {
            $('.reservation-pane_response h2').html("預約成功");
            $('.reservation-pane_response p').html('');
            $('.reservation-pane_response').addClass('sucess');
        } else {
            $('.reservation-pane_response p').html(jsonData.message);
            $('.reservation-pane_response h2').html("預約失敗");
            $('.reservation-pane_response').addClass('fail');
        }
        $('.reservation-pane_content').fadeOut();
        $('.reservation-pane_response').show();
    }).catch((err) => {
        console.log('ERROR:', err);
    })
}


function reservationClicked() {
    if (selectDate.length == 0) {
        alert('Please select date.');
        return;
    }
    if (selectDate.length == 1) {
        alert('Please select check out date.');
        return;
    }
    let top = $('body').scrollTop() + ($(window).height() - $('.reservation-pane_content').height()) * 0.5;
    $('.reservation-pane_content').css('top', top + 'px');
    setResDate();
    $('.reservation-pane').show();
}

function submitClicked() {
    $('.reservation-form').submit();
}

function setResDate() {
    let checkinDate = selectDate[0];
    let checkoutDate = selectDate[1];
    let checkin = getDateString(checkinDate);
    let checkout = getDateString(checkoutDate);
    $('#res-date').val(checkin + ' - ' + checkout);
    $('#res-date')[0].addEventListener("input", function() {
        this.value = checkin + ' - ' + checkout;
    }, false);
    let dayCountArr = getDayCount(checkinDate, checkoutDate);
    $('.calc-normal').html(dayCountArr[0]);
    $('.calc-weekend').html(dayCountArr[1]);
    $('.calc-price_number').html(getPrice(dayCountArr));
}

function getDateString(_dateobj) {
    return _dateobj.getFullYear() + '/' + (_dateobj.getMonth() + 1) + '/' + _dateobj.getDate();
}

function getDayCount(_checkin, _checkout) {
    let normal = 0;
    let weekend = 0;
    for (var i = _checkin.getTime(); i < _checkout.getTime(); i += 86400000) {
        var day = new Date(i).getDay();
        if (day > 0 && day < 5) {
            normal++;
        } else {
            weekend++;
        }
    }
    return [normal, weekend];
}

function getPrice(_dayCountArr) {
    return myRoomData.normalDayPrice * _dayCountArr[0] + myRoomData.holidayPrice * _dayCountArr[1];
}


function getMultiDateArr(_checkin, _checkout) {
    var multiArr = [];
    for (var i = _checkin.getTime(); i < _checkout.getTime(); i += 86400000) {
        var mydate = new Date(i);
        var dateString = mydate.getFullYear() + '-' + paddingLeft((mydate.getMonth() + 1).toString(), 2) + '-' + paddingLeft(mydate.getDate().toString(), 2);
        multiArr.push(dateString);
    }
    return multiArr;
}

function paddingLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return paddingLeft("0" + str, lenght);
}

function hideReservationPane() {
    $('.reservation-pane').hide();
}

function backClicked() {
    if ($('.reservation-pane_response').hasClass('sucess')) {
        $('#name').val('');
        $('#phone').val('');
        $('.reservation-pane_response').removeClass('sucess').hide();
    } else {
        $('.reservation-pane_response').removeClass('fail').hide();
    }
    hideReservationPane();
    $('.reservation-pane_content').css({
        "opacity": 1,
        "display": "block"
    });
}


$(document).ready(function() {
    //console.log(window.location)
    if (window.location.pathname.indexOf('room.html') == -1) {
        getHomeData();
    } else {
        currentid = window.location.search.substr(1);
        getRoomData(currentid);
    }
})
! function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = e(require('jquery')) : 'function' == typeof define && define.amd ? define(['jquery'], e) : t.parsley = e(t.jQuery);
}(this, function(h) {
  "use strict";

  function r(t) {
    return (r = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(t) {
      return typeof t;
    } : function(t) {
      return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
    })(t);
  }

  function o() {
    return (o = Object.assign || function(t) {
      for (let e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (let n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
      }
      return t;
    }).apply(this, arguments);
  }

  function l(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t;
    }(t) || function(t, e) {
      var i = [];
                var n = !0;
                var r = !1;
                var s = void 0;
      try {
        for (var a, o = t[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), !e || i.length !== e); n = !0);
      } catch (t) {
        r = !0, s = t;
      } finally {
        try {
          n || null == o.return || o.return();
        } finally {
          if (r) throw s;
        }
      }
      return i;
    }(t, e) || function() {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }();
  }

  function u(t) {
    return function(t) {
      if (Array.isArray(t)) {
        for (var e = 0, i = new Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
      }
    }(t) || function(t) {
      if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t)) return Array.from(t);
    }(t) || function() {
      throw new TypeError('Invalid attempt to spread non-iterable instance');
    }();
  }
  var i; var t = 1;
        var e = {};
        var d = {
            attr: function(t, e, i) {
                var n, r, s, a = new RegExp("^" + e, "i");
                if (void 0 === i) i = {};
                else
                    for (n in i) i.hasOwnProperty(n) && delete i[n];
                if (!t) return i;
                for (n = (s = t.attributes).length; n--;)(r = s[n]) && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(e.length))] = this.deserializeValue(r.value));
                return i
            },
            checkAttr: function(t, e, i) {
                return t.hasAttribute(e + i)
            },
            setAttr: function(t, e, i, n) {
                t.setAttribute(this.dasherize(e + i), String(n))
            },
            getType: function(t) {
                return t.getAttribute("type") || "text"
            },
            generateID: function() {
                return "" + t++
            },
            deserializeValue: function(e) {
                var t;
                try {
                    return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e
                } catch (t) {
                    return e
                }
            },
            camelize: function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            },
            dasherize: function(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            },
            warn: function() {
                var t;
                window.console && "function" == typeof window.console.warn && (t = window.console).warn.apply(t, arguments)
            },
            warnOnce: function(t) {
                e[t] || (e[t] = !0, this.warn.apply(this, arguments))
            },
            _resetWarnings: function() {
                e = {}
            },
            trimString: function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            parse: {
                date: function(t) {
                    var e = t.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
                    if (!e) return null;
                    var i = l(e.map(function(t) {
                            return parseInt(t, 10)
                        }), 4),
                        n = (i[0], i[1]),
                        r = i[2],
                        s = i[3],
                        a = new Date(n, r - 1, s);
                    return a.getFullYear() !== n || a.getMonth() + 1 !== r || a.getDate() !== s ? null : a
                },
                string: function(t) {
                    return t
                },
                integer: function(t) {
                    return isNaN(t) ? null : parseInt(t, 10)
                },
                number: function(t) {
                    if (isNaN(t)) throw null;
                    return parseFloat(t)
                },
                boolean: function(t) {
                    return !/^\s*false\s*$/i.test(t)
                },
                object: function(t) {
                    return d.deserializeValue(t)
                },
                regexp: function(t) {
                    var e = "";
                    return t = /^\/.*\/(?:[gimy]*)$/.test(t) ? (e = t.replace(/.*\/([gimy]*)$/, "$1"), t.replace(new RegExp("^/(.*?)/" + e + "$"), "$1")) : "^" + t + "$", new RegExp(t, e)
                }
            },
            parseRequirement: function(t, e) {
                var i = this.parse[t || "string"];
                if (!i) throw 'Unknown requirement specification: "' + t + '"';
                var n = i(e);
                if (null === n) throw "Requirement is not a ".concat(t, ': "').concat(e, '"');
                return n
            },
            namespaceEvents: function(t, e) {
                return (t = this.trimString(t || "").split(/\s+/))[0] ? h.map(t, function(t) {
                    return "".concat(t, ".").concat(e)
                }).join(" ") : ""
            },
            difference: function(t, i) {
                var n = [];
                return h.each(t, function(t, e) {
                    -1 == i.indexOf(e) && n.push(e)
                }), n
            },
            all: function(t) {
                return h.when.apply(h, u(t).concat([42, 42]))
            },
            objectCreate: Object.create || (i = function() {}, function(t) {
                if (1 < arguments.length) throw Error("Second argument not supported");
                if ("object" != r(t)) throw TypeError("Argument must be an object");
                i.prototype = t;
                var e = new i;
                return i.prototype = null, e
            }),
            _SubmitSelector: 'input[type="submit"], button:submit'
        };
        var n = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            multiple: null,
            group: null,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            triggerAfterFailure: "input",
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function(t) {},
            errorsContainer: function(t) {},
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: "<li></li>"
        };
        var s = function() {
      this.__id__ = d.generateID();
    };
  s.prototype = {
    asyncSupport: !0,
    _pipeAccordingToValidationResult: function() {
      var e = this;
                var t = function() {
          var t = h.Deferred();
          return !0 !== e.validationResult && t.reject(), t.resolve().promise();
        };
      return [t, t];
    },
    actualizeOptions: function() {
      return d.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this;
    },
    _resetOptions: function(t) {
      for (let e in this.domOptions = d.objectCreate(this.parent.options), this.options = d.objectCreate(this.domOptions), t) t.hasOwnProperty(e) && (this.options[e] = t[e]);
      this.actualizeOptions();
    },
    _listeners: null,
    on: function(t, e) {
      return this._listeners = this._listeners || {}, (this._listeners[t] = this._listeners[t] || []).push(e), this;
    },
    subscribe: function(t, e) {
      h.listenTo(this, t.toLowerCase(), e);
    },
    off: function(t, e) {
      var i = this._listeners && this._listeners[t];
      if (i)
        if (e)
          for (let n = i.length; n--;) i[n] === e && i.splice(n, 1);
        else delete this._listeners[t];
      return this;
    },
    unsubscribe: function(t, e) {
      h.unsubscribeTo(this, t.toLowerCase());
    },
    trigger: function(t, e, i) {
      e = e || this;
      var n; var r = this._listeners && this._listeners[t];
      if (r)
        for (let s = r.length; s--;)
          if (!1 === (n = r[s].call(e, e, i))) return n;
      return !this.parent || this.parent.trigger(t, e, i);
    },
    asyncIsValid: function(t, e) {
      return d.warnOnce('asyncIsValid is deprecated; please use whenValid instead'), this.whenValid({
        group: t,
        force: e,
      });
    },
    _findRelated: function() {
      return this.options.multiple ? h(this.parent.element.querySelectorAll('['.concat(this.options.namespace, 'multiple="').concat(this.options.multiple, '"]'))) : this.$element;
    },
  };
  var c = function(t) {
    h.extend(!0, this, t);
  };
  c.prototype = {
    validate: function(t, e) {
      if (this.fn) return 3 < arguments.length && (e = [].slice.call(arguments, 1, -1)), this.fn(t, e);
      if (Array.isArray(t)) {
        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      }
      var i = arguments[arguments.length - 1];
      if (this.validateDate && i._isDateInput()) return null !== (t = d.parse.date(t)) && this.validateDate.apply(this, arguments);
      if (this.validateNumber) return !t || !isNaN(t) && (t = parseFloat(t), this.validateNumber.apply(this, arguments));
      if (this.validateString) return this.validateString.apply(this, arguments);
      throw 'Validator `' + this.name + '` only handles multiple values'
    },
    parseRequirements: function(t, e) {
      if ('string' != typeof t) return Array.isArray(t) ? t : [t];
      var i = this.requirementType;
      if (Array.isArray(i)) {
        for (var n = function(t, e) {
            var i = t.match(/^\s*\[(.*)\]\s*$/);
            if (!i) throw 'Requirement is not an array: "' + t + '"';
            var n = i[1].split(',').map(d.trimString);
            if (n.length !== e) throw 'Requirement has ' + n.length + ' values when ' + e + ' are needed';
            return n;
          }(t, i.length), r = 0; r < n.length; r++) n[r] = d.parseRequirement(i[r], n[r]);
        return n;
      }
      return h.isPlainObject(i) ? function(t, e, i) {
        var n = null;
                    var r = {};
        for (let s in t)
          if (s) {
            var a = i(s);
            "string" == typeof a && (a = d.parseRequirement(t[s], a)), r[s] = a;
          } else n = d.parseRequirement(t[s], e);
        return [n, r];
      }(i, t, e) : [d.parseRequirement(i, t)];
    },
    requirementType: 'string',
    priority: 2,
  };
  var a = function(t, e) {
      this.__class__ = 'ValidatorRegistry', this.locale = 'en', this.init(t || {}, e || {});
    };
        var p = {
      email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
      number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
      integer: /^-?\d+$/,
      digits: /^\d+$/,
      alphanum: /^\w+$/i,
      date: {
        test: function(t) {
          return null !== d.parse.date(t);
        },
      },
      url: new RegExp('^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$'),
    };
  p.range = p.number;
  var f = function(t) {
      var e = ('' + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0;
    };
        var m = function(s, a) {
            return function(t) {
                for (var e = arguments.length, i = new Array(1 < e ? e - 1 : 0), n = 1; n < e; n++) i[n - 1] = arguments[n];
                return i.pop(), a.apply(void 0, [t].concat(u((r = s, i.map(d.parse[r])))));
                var r
            }
        };
        var g = function(t) {
      return {
        validateDate: m('date', t),
        validateNumber: m('number', t),
        requirementType: t.length <= 2 ? 'string' : ['string', 'string'],
        priority: 30,
      };
    };
  a.prototype = {
    init: function(t, e) {
      for (let i in this.catalog = e, this.validators = o({}, this.validators), t) this.addValidator(i, t[i].fn, t[i].priority);
      window.Parsley.trigger('parsley:validator:init');
    },
    setLocale: function(t) {
      if (void 0 === this.catalog[t]) throw new Error(t + ' is not available in the catalog');
      return this.locale = t, this;
    },
    addCatalog: function(t, e, i) {
      return 'object' === r(e) && (this.catalog[t] = e), !0 === i ? this.setLocale(t) : this;
    },
    addMessage: function(t, e, i) {
      return void 0 === this.catalog[t] && (this.catalog[t] = {}), this.catalog[t][e] = i, this;
    },
    addMessages: function(t, e) {
      for (let i in e) this.addMessage(t, i, e[i]);
      return this;
    },
    addValidator: function(t, e, i) {
      if (this.validators[t]) d.warn('Validator "' + t + '" is already defined.');
      else if (n.hasOwnProperty(t)) return void d.warn('"' + t + '" is a restricted keyword and is not a valid validator name.');
      return this._setValidator.apply(this, arguments);
    },
    hasValidator: function(t) {
      return !!this.validators[t];
    },
    updateValidator: function(t, e, i) {
      return this.validators[t] ? this._setValidator.apply(this, arguments) : (d.warn('Validator "' + t + '" is not already defined.'), this.addValidator.apply(this, arguments));
    },
    removeValidator: function(t) {
      return this.validators[t] || d.warn('Validator "' + t + '" is not defined.'), delete this.validators[t], this;
    },
    _setValidator: function(t, e, i) {
      for (let n in 'object' !== r(e) && (e = {
        fn: e,
        priority: i,
      }), e.validate || (e = new c(e)), (this.validators[t] = e).messages || {}) this.addMessage(n, t, e.messages[n]);
      return this;
    },
    getErrorMessage: function(t) {
      var e;
            'type' === t.name ? e = (this.catalog[this.locale][t.name] || {})[t.requirements] : e = this.formatMessage(this.catalog[this.locale][t.name], t.requirements);
            return e || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },
    formatMessage: function(t, e) {
      if ('object' !== r(e)) return 'string' == typeof t ? t.replace(/%s/i, e) : '';
      for (let i in e) t = this.formatMessage(t, e[i]);
      return t;
    },
    validators: {
      notblank: {
        validateString: function(t) {
          return /\S/.test(t);
        },
        priority: 2,
      },
      required: {
        validateMultiple: function(t) {
          return 0 < t.length;
        },
        validateString: function(t) {
          return /\S/.test(t);
        },
        priority: 512,
      },
      type: {
        validateString: function(t, e) {
          var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                        var n = i.step;
                        var r = void 0 === n ? "any" : n;
                        var s = i.base;
                        var a = void 0 === s ? 0 : s;
                        var o = p[e];
          if (!o) throw new Error('validator type `' + e + '` is not supported');
          if (!t) return !0;
          if (!o.test(t)) return !1;
          if ('number' === e && !/^any$/i.test(r || '')) {
            var l = Number(t);
                            var u = Math.max(f(r), f(a));
            if (f(l) > u) return !1;
            var d = function(t) {
              return Math.round(t * Math.pow(10, u));
            };
            if ((d(l) - d(a)) % d(r) != 0) return !1;
          }
          return !0;
        },
        requirementType: {
          "": 'string',
          step: 'string',
          base: 'number'
        },
        priority: 256,
      },
      pattern: {
        validateString: function(t, e) {
          return !t || e.test(t);
        },
        requirementType: 'regexp',
        priority: 64,
      },
      minlength: {
        validateString: function(t, e) {
          return !t || t.length >= e;
        },
        requirementType: 'integer',
        priority: 30,
      },
      maxlength: {
        validateString: function(t, e) {
          return t.length <= e;
        },
        requirementType: 'integer',
        priority: 30,
      },
      length: {
        validateString: function(t, e, i) {
          return !t || t.length >= e && t.length <= i;
        },
        requirementType: ['integer', 'integer'],
        priority: 30,
      },
      mincheck: {
        validateMultiple: function(t, e) {
          return t.length >= e;
        },
        requirementType: 'integer',
        priority: 30,
      },
      maxcheck: {
        validateMultiple: function(t, e) {
          return t.length <= e;
        },
        requirementType: 'integer',
        priority: 30,
      },
      check: {
        validateMultiple: function(t, e, i) {
          return t.length >= e && t.length <= i;
        },
        requirementType: ['integer', 'integer'],
        priority: 30,
      },
      min: g(function(t, e) {
        return e <= t;
      }),
      max: g(function(t, e) {
        return t <= e;
      }),
      range: g(function(t, e, i) {
        return e <= t && t <= i;
      }),
      equalto: {
        validateString: function(t, e) {
          if (!t) return !0;
          var i = h(e);
          return i.length ? t === i.val() : t === e;
        },
        priority: 256,
      },
      euvatin: {
        validateString: function(t, e) {
          if (!t) return !0;
          return /^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/.test(t);
        },
        priority: 30,
      },
    },
  };
  var v = {};
  v.Form = {
    _actualizeTriggers: function() {
      var e = this;
      this.$element.on('submit.Parsley', function(t) {
        e.onSubmitValidate(t);
      }), this.$element.on('click.Parsley', d._SubmitSelector, function(t) {
        e.onSubmitButton(t);
      }), !1 !== this.options.uiEnabled && this.element.setAttribute('novalidate', '');
    },
    focus: function() {
      if (!(this._focusedField = null) === this.validationResult || 'none' === this.options.focus) return null;
      for (let t = 0; t < this.fields.length; t++) {
        var e = this.fields[t];
        if (!0 !== e.validationResult && 0 < e.validationResult.length && void 0 === e.options.noFocus && (this._focusedField = e.$element, 'first' === this.options.focus)) break;
      }
      return null === this._focusedField ? null : this._focusedField.focus();
    },
    _destroyUI: function() {
      this.$element.off('.Parsley');
    },
  }, v.Field = {
    _reflowUI: function() {
      if (this._buildUI(), this._ui) {
        var t = function t(e, i, n) {
          for (var r = [], s = [], a = 0; a < e.length; a++) {
            for (var o = !1, l = 0; l < i.length; l++)
              if (e[a].assert.name === i[l].assert.name) {
                o = !0;
                break;
              }
                        o ? s.push(e[a]) : r.push(e[a]);
          }
          return {
            kept: s,
            added: r,
            removed: n ? [] : t(i, e, !0).added,
          };
        }(this.validationResult, this._ui.lastValidationResult);
        this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(t), this._actualizeTriggers(), !t.kept.length && !t.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers());
      }
    },
    getErrorsMessages: function() {
      if (!0 === this.validationResult) return [];
      for (var t = [], e = 0; e < this.validationResult.length; e++) t.push(this.validationResult[e].errorMessage || this._getErrorMessage(this.validationResult[e].assert));
      return t;
    },
    addError: function(t) {
      var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                var i = e.message;
                var n = e.assert;
                var r = e.updateClass;
                var s = void 0 === r || r;
      this._buildUI(), this._addError(t, {
        message: i,
        assert: n,
      }), s && this._errorClass();
    },
    updateError: function(t) {
      var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                var i = e.message;
                var n = e.assert;
                var r = e.updateClass;
                var s = void 0 === r || r;
      this._buildUI(), this._updateError(t, {
        message: i,
        assert: n,
      }), s && this._errorClass();
    },
    removeError: function(t) {
      var e = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).updateClass;
                var i = void 0 === e || e;
      this._buildUI(), this._removeError(t), i && this._manageStatusClass();
    },
    _manageStatusClass: function() {
            this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : 0 < this.validationResult.length ? this._errorClass() : this._resetClass();
    },
    _manageErrorsMessages: function(t) {
      if (void 0 === this.options.errorsMessagesDisabled) {
        if (void 0 !== this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length && this._ui.$errorsWrapper.append(h(this.options.errorTemplate).addClass('parsley-custom-error-message')), this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
        for (var e = 0; e < t.removed.length; e++) this._removeError(t.removed[e].assert.name);
        for (e = 0; e < t.added.length; e++) {this._addError(t.added[e].assert.name, {
                    message: t.added[e].errorMessage,
                    assert: t.added[e].assert
                });}
        for (e = 0; e < t.kept.length; e++) {this._updateError(t.kept[e].assert.name, {
                    message: t.kept[e].errorMessage,
                    assert: t.kept[e].assert
                })}
      }
    },
    _addError: function(t, e) {
      var i = e.message;
                var n = e.assert;
      this._insertErrorWrapper(), this._ui.$errorClassHandler.attr('aria-describedby', this._ui.errorsWrapperId), this._ui.$errorsWrapper.addClass('filled').append(h(this.options.errorTemplate).addClass('parsley-' + t).html(i || this._getErrorMessage(n)));
    },
    _updateError: function(t, e) {
      var i = e.message;
                var n = e.assert;
      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + t).html(i || this._getErrorMessage(n));
    },
    _removeError: function(t) {
      this._ui.$errorClassHandler.removeAttr('aria-describedby'), this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + t).remove();
    },
    _getErrorMessage: function(t) {
      var e = t.name + 'Message';
      return void 0 !== this.options[e] ? window.Parsley.formatMessage(this.options[e], t.requirements) : window.Parsley.getErrorMessage(t);
    },
    _buildUI: function() {
      if (!this._ui && !1 !== this.options.uiEnabled) {
        var t = {};
        this.element.setAttribute(this.options.namespace + 'id', this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__), t.$errorsWrapper = h(this.options.errorsWrapper).attr('id', t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t;
      }
    },
    _manageClassHandler: function() {
      if ('string' == typeof this.options.classHandler && h(this.options.classHandler).length) return h(this.options.classHandler);
      var t = this.options.classHandler;
      if ('string' == typeof this.options.classHandler && 'function' == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), 'function' == typeof t) {
        var e = t.call(this, this);
        if (void 0 !== e && e.length) return e;
      } else {
        if ('object' === r(t) && t instanceof jQuery && t.length) return t;
        t && d.warn('The class handler `' + t + '` does not exist in DOM nor as a global JS function');
      }
      return this._inputHolder();
    },
    _inputHolder: function() {
      return this.options.multiple && 'SELECT' !== this.element.nodeName ? this.$element.parent() : this.$element;
    },
    _insertErrorWrapper: function() {
      var t = this.options.errorsContainer;
      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
      if ('string' == typeof t) {
        if (h(t).length) return h(t).append(this._ui.$errorsWrapper);
                'function' == typeof window[t] ? t = window[t] : d.warn('The errors container `' + t + '` does not exist in DOM nor as a global JS function');
      }
      return 'function' == typeof t && (t = t.call(this, this)), 'object' === r(t) && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper);
    },
    _actualizeTriggers: function() {
      var t; var e = this;
                var i = this._findRelated();
      i.off('.Parsley'), this._failedOnce ? i.on(d.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function() {
        e._validateIfNeeded();
      }) : (t = d.namespaceEvents(this.options.trigger, 'Parsley')) && i.on(t, function(t) {
        e._validateIfNeeded(t);
      });
    },
    _validateIfNeeded: function(t) {
      var e = this;
      t && /key|input/.test(t.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function() {
        return e.validate();
      }, this.options.debounce)) : this.validate());
    },
    _resetUI: function() {
      this._failedOnce = !1, this._actualizeTriggers(), void 0 !== this._ui && (this._ui.$errorsWrapper.removeClass('filled').children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1);
    },
    _destroyUI: function() {
      this._resetUI(), void 0 !== this._ui && this._ui.$errorsWrapper.remove(), delete this._ui;
    },
    _successClass: function() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    },
    _errorClass: function() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    },
    _resetClass: function() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    },
  };
  var y = function(t, e, i) {
      this.__class__ = 'Form', this.element = t, this.$element = h(t), this.domOptions = e, this.options = i, this.parent = window.Parsley, this.fields = [], this.validationResult = null;
    };
        var _ = {
      pending: null,
      resolved: !0,
      rejected: !1,
    };
  y.prototype = {
    onSubmitValidate: function(t) {
      var e = this;
      if (!0 !== t.parsley) {
        var i = this._submitSource || this.$element.find(d._SubmitSelector)[0];
        if (this._submitSource = null, this.$element.find('.parsley-synthetic-submit-button').prop('disabled', !0), !i || null === i.getAttribute('formnovalidate')) {
          window.Parsley._remoteCache = {};
          var n = this.whenValidate({
            event: t,
          });
          "resolved" === n.state() && !1 !== this._trigger('submit') || (t.stopImmediatePropagation(), t.preventDefault(), 'pending' === n.state() && n.done(function() {
            e._submit(i);
          }));
        }
      }
    },
    onSubmitButton: function(t) {
      this._submitSource = t.currentTarget;
    },
    _submit: function(t) {
      if (!1 !== this._trigger('submit')) {
        if (t) {
          var e = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', !1);
          0 === e.length && (e = h('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), e.attr({
            name: t.getAttribute('name'),
            value: t.getAttribute('value'),
          });
        }
        this.$element.trigger(o(h.Event('submit'), {
          parsley: !0,
        }));
      }
    },
    validate: function(t) {
      if (1 <= arguments.length && !h.isPlainObject(t)) {
        d.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');
        var e = Array.prototype.slice.call(arguments);
        t = {
          group: e[0],
          force: e[1],
          event: e[2],
        };
      }
      return _[this.whenValidate(t).state()];
    },
    whenValidate: function() {
      var t; var e = this;
                var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                var n = i.group;
                var r = i.force;
                var s = i.event;
      (this.submitEvent = s) && (this.submitEvent = o({}, s, {
        preventDefault: function() {
          d.warnOnce('Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`'), e.validationResult = !1;
        },
      })), this.validationResult = !0, this._trigger('validate'), this._refreshFields();
      var a = this._withoutReactualizingFormOptions(function() {
        return h.map(e.fields, function(t) {
          return t.whenValidate({
            force: r,
            group: n,
          });
        });
      });
      return (t = d.all(a).done(function() {
        e._trigger('success');
      }).fail(function() {
        e.validationResult = !1, e.focus(), e._trigger('error');
      }).always(function() {
        e._trigger('validated');
      })).pipe.apply(t, u(this._pipeAccordingToValidationResult()));
    },
    isValid: function(t) {
      if (1 <= arguments.length && !h.isPlainObject(t)) {
        d.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');
        var e = Array.prototype.slice.call(arguments);
        t = {
          group: e[0],
          force: e[1],
        };
      }
      return _[this.whenValid(t).state()];
    },
    whenValid: function() {
      var t = this;
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                var i = e.group;
                var n = e.force;
      this._refreshFields();
      var r = this._withoutReactualizingFormOptions(function() {
        return h.map(t.fields, function(t) {
          return t.whenValid({
            group: i,
            force: n,
          });
        });
      });
      return d.all(r);
    },
    refresh: function() {
      return this._refreshFields(), this;
    },
    reset: function() {
      for (let t = 0; t < this.fields.length; t++) this.fields[t].reset();
      this._trigger('reset');
    },
    destroy: function() {
      this._destroyUI();
      for (let t = 0; t < this.fields.length; t++) this.fields[t].destroy();
      this.$element.removeData('Parsley'), this._trigger('destroy');
    },
    _refreshFields: function() {
      return this.actualizeOptions()._bindFields();
    },
    _bindFields: function() {
      var r = this;
                var t = this.fields;
      return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function() {
        r.$element.find(r.options.inputs).not(r.options.excluded).not('['.concat(r.options.namespace, 'excluded=true]')).each(function(t, e) {
          var i = new window.Parsley.Factory(e, {}, r);
          if ('Field' === i.__class__ || 'FieldMultiple' === i.__class__) {
            var n = i.__class__ + '-' + i.__id__;
            void 0 === r.fieldsMappedById[n] && (r.fieldsMappedById[n] = i, r.fields.push(i));
          }
        }), h.each(d.difference(t, r.fields), function(t, e) {
          e.reset();
        });
      }), this;
    },
    _withoutReactualizingFormOptions: function(t) {
      var e = this.actualizeOptions;
      this.actualizeOptions = function() {
        return this;
      };
      var i = t();
      return this.actualizeOptions = e, i;
    },
    _trigger: function(t) {
      return this.trigger('form:' + t);
    },
  };
  var w = function(t, e, i, n, r) {
      var s = window.Parsley._validatorRegistry.validators[e];
                var a = new c(s);
      o(this, {
        validator: a,
        name: e,
        requirements: i,
        priority: n = n || t.options[e + 'Priority'] || a.priority,
        isDomConstraint: r = !0 === r,
      }), this._parseRequirements(t.options);
    };
        var b = function(t, e, i, n) {
            this.__class__ = "Field", this.element = t, this.$element = h(t), void 0 !== n && (this.parent = n), this.options = i, this.domOptions = e, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
        };
        var F = {
      pending: null,
      resolved: !0,
      rejected: !(w.prototype = {
        validate: function(t, e) {
          var i;
          return (i = this.validator).validate.apply(i, [t].concat(u(this.requirementList), [e]));
        },
        _parseRequirements: function(i) {
          var n = this;
          this.requirementList = this.validator.parseRequirements(this.requirements, function(t) {
            return i[n.name + (e = t, e[0].toUpperCase() + e.slice(1))];
            var e;
          });
        },
      }),
    };
  b.prototype = {
    validate: function(t) {
      1 <= arguments.length && !h.isPlainObject(t) && (d.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.'), t = {
        options: t,
      });
      var e = this.whenValidate(t);
      if (!e) return !0;
      switch (e.state()) {
        case 'pending':
          return null;
        case 'resolved':
          return !0;
        case 'rejected':
          return this.validationResult;
      }
    },
    whenValidate: function() {
      var t; var e = this;
                var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                var n = i.force;
                var r = i.group;
      if (this.refresh(), !r || this._isInGroup(r)) {return this.value = this.getValue(), this._trigger("validate"), (t = this.whenValid({
                force: n,
                value: this.value,
                _refreshed: !0
            }).always(function() {
                e._reflowUI()
            }).done(function() {
                e._trigger("success")
            }).fail(function() {
                e._trigger("error")
            }).always(function() {
                e._trigger("validated")
            })).pipe.apply(t, u(this._pipeAccordingToValidationResult()))}
    },
    hasConstraints: function() {
      return 0 !== this.constraints.length;
    },
    needsValidation: function(t) {
      return void 0 === t && (t = this.getValue()), !(!t.length && !this._isRequired() && void 0 === this.options.validateIfEmpty);
    },
    _isInGroup: function(t) {
      return Array.isArray(this.options.group) ? -1 !== h.inArray(t, this.options.group) : this.options.group === t;
    },
    isValid: function(t) {
      if (1 <= arguments.length && !h.isPlainObject(t)) {
        d.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');
        var e = Array.prototype.slice.call(arguments);
        t = {
          force: e[0],
          value: e[1],
        };
      }
      var i = this.whenValid(t);
      return !i || F[i.state()];
    },
    whenValid: function() {
      var n = this;
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                var e = t.force;
                var i = void 0 !== e && e;
                var r = t.value;
                var s = t.group;
      if (t._refreshed || this.refresh(), !s || this._isInGroup(s)) {
        if (this.validationResult = !0, !this.hasConstraints()) return h.when();
        if (null == r && (r = this.getValue()), !this.needsValidation(r) && !0 !== i) return h.when();
        var a = this._getGroupedConstraints();
                    var o = [];
        return h.each(a, function(t, e) {
          var i = d.all(h.map(e, function(t) {
            return n._validateConstraint(r, t);
          }));
          if (o.push(i), 'rejected' === i.state()) return !1;
        }), d.all(o);
      }
    },
    _validateConstraint: function(t, e) {
      var i = this;
                var n = e.validate(t, this);
      return !1 === n && (n = h.Deferred().reject()), d.all([n]).fail(function(t) {
        i.validationResult instanceof Array || (i.validationResult = []), i.validationResult.push({
          assert: e,
          errorMessage: 'string' == typeof t && t,
        });
      });
    },
    getValue: function() {
      var t;
      return null == (t = 'function' == typeof this.options.value ? this.options.value(this) : void 0 !== this.options.value ? this.options.value : this.$element.val()) ? '' : this._handleWhitespace(t);
    },
    reset: function() {
      return this._resetUI(), this._trigger('reset');
    },
    destroy: function() {
      this._destroyUI(), this.$element.removeData('Parsley'), this.$element.removeData('FieldMultiple'), this._trigger('destroy');
    },
    refresh: function() {
      return this._refreshConstraints(), this;
    },
    _refreshConstraints: function() {
      return this.actualizeOptions()._bindConstraints();
    },
    refreshConstraints: function() {
      return d.warnOnce('Parsley\'s refreshConstraints is deprecated. Please use refresh'), this.refresh();
    },
    addConstraint: function(t, e, i, n) {
      if (window.Parsley._validatorRegistry.validators[t]) {
        var r = new w(this, t, e, i, n);
        "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r;
      }
      return this;
    },
    removeConstraint: function(t) {
      for (let e = 0; e < this.constraints.length; e++)
        if (t === this.constraints[e].name) {
          this.constraints.splice(e, 1);
          break;
        }
      return delete this.constraintsByName[t], this;
    },
    updateConstraint: function(t, e, i) {
      return this.removeConstraint(t).addConstraint(t, e, i);
    },
    _bindConstraints: function() {
      for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (t.push(this.constraints[i]), e[this.constraints[i].name] = this.constraints[i]);
      for (let n in this.constraints = t, this.constraintsByName = e, this.options) this.addConstraint(n, this.options[n], void 0, !0);
      return this._bindHtml5Constraints();
    },
    _bindHtml5Constraints: function() {
      null !== this.element.getAttribute('required') && this.addConstraint('required', !0, void 0, !0), null !== this.element.getAttribute('pattern') && this.addConstraint('pattern', this.element.getAttribute('pattern'), void 0, !0);
      var t = this.element.getAttribute('min');
                var e = this.element.getAttribute('max');
            null !== t && null !== e ? this.addConstraint('range', [t, e], void 0, !0) : null !== t ? this.addConstraint('min', t, void 0, !0) : null !== e && this.addConstraint('max', e, void 0, !0), null !== this.element.getAttribute('minlength') && null !== this.element.getAttribute('maxlength') ? this.addConstraint('length', [this.element.getAttribute('minlength'), this.element.getAttribute('maxlength')], void 0, !0) : null !== this.element.getAttribute('minlength') ? this.addConstraint('minlength', this.element.getAttribute('minlength'), void 0, !0) : null !== this.element.getAttribute('maxlength') && this.addConstraint('maxlength', this.element.getAttribute('maxlength'), void 0, !0);
            let i = d.getType(this.element);
            return 'number' === i ? this.addConstraint('type', ['number', {
              step: this.element.getAttribute('step') || '1',
              base: t || this.element.getAttribute('value'),
            }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint('type', i, void 0, !0) : this;
    },
    _isRequired: function() {
      return void 0 !== this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements;
    },
    _trigger: function(t) {
      return this.trigger('field:' + t);
    },
    _handleWhitespace: function(t) {
      return !0 === this.options.trimValue && d.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), 'squish' === this.options.whitespace && (t = t.replace(/\s{2,}/g, ' ')), 'trim' !== this.options.whitespace && 'squish' !== this.options.whitespace && !0 !== this.options.trimValue || (t = d.trimString(t)), t;
    },
    _isDateInput: function() {
      var t = this.constraintsByName.type;
      return t && 'date' === t.requirements;
    },
    _getGroupedConstraints: function() {
      if (!1 === this.options.priorityEnabled) return [this.constraints];
      for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) {
        var n = this.constraints[i].priority;
        e[n] || t.push(e[n] = []), e[n].push(this.constraints[i]);
      }
      return t.sort(function(t, e) {
        return e[0].priority - t[0].priority;
      }), t;
    },
  };
  var C = function() {
    this.__class__ = 'FieldMultiple'
  };
  C.prototype = {
    addElement: function(t) {
      return this.$elements.push(t), this;
    },
    _refreshConstraints: function() {
      var t;
      if (this.constraints = [], 'SELECT' === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
      for (let e = 0; e < this.$elements.length; e++)
        if (h('html').has(this.$elements[e]).length) {
          t = this.$elements[e].data('FieldMultiple')._refreshConstraints().constraints;
          for (let i = 0; i < t.length; i++) this.addConstraint(t[i].name, t[i].requirements, t[i].priority, t[i].isDomConstraint);
        } else this.$elements.splice(e, 1);
      return this;
    },
    getValue: function() {
      if ('function' == typeof this.options.value) return this.options.value(this);
      if (void 0 !== this.options.value) return this.options.value;
      if ('INPUT' === this.element.nodeName) {
        var t = d.getType(this.element);
        if ('radio' === t) return this._findRelated().filter(':checked').val() || '';
        if ('checkbox' === t) {
          var e = [];
          return this._findRelated().filter(':checked').each(function() {
            e.push(h(this).val());
          }), e;
        }
      }
      return 'SELECT' === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val();
    },
    _init: function() {
      return this.$elements = [this.$element], this;
    },
  };
  var A = function(t, e, i) {
    this.element = t, this.$element = h(t);
    var n = this.$element.data('Parsley');
    if (n) return void 0 !== i && n.parent === window.Parsley && (n.parent = i, n._resetOptions(n.options)), 'object' === r(e) && o(n.options, e), n;
    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');
    if (void 0 !== i && 'Form' !== i.__class__) throw new Error('Parent instance must be a Form instance');
    return this.parent = i || window.Parsley, this.init(e);
  };
  A.prototype = {
    init: function(t) {
      return this.__class__ = 'Parsley', this.__version__ = '2.9.1', this.__id__ = d.generateID(), this._resetOptions(t), 'FORM' === this.element.nodeName || d.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs) ? this.bind('parsleyForm') : this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },
    isMultiple: function() {
      var t = d.getType(this.element);
      return 'radio' === t || 'checkbox' === t || 'SELECT' === this.element.nodeName && null !== this.element.getAttribute('multiple');
    },
    handleMultiple: function() {
      var t; var e; var n = this;
      if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute('name')) || this.element.getAttribute('id'), 'SELECT' === this.element.nodeName && null !== this.element.getAttribute('multiple')) return this.options.multiple = this.options.multiple || this.__id__, this.bind('parsleyFieldMultiple');
      if (!this.options.multiple) return d.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element), this;
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ''), t && h('input[name="' + t + '"]').each(function(t, e) {
        var i = d.getType(e);
        "radio" !== i && 'checkbox' !== i || e.setAttribute(n.options.namespace + 'multiple', n.options.multiple);
      });
      for (let i = this._findRelated(), r = 0; r < i.length; r++)
        if (void 0 !== (e = h(i.get(r)).data('Parsley'))) {
          this.$element.data('FieldMultiple') || e.addElement(this.$element);
          break;
        }
      return this.bind('parsleyField', !0), e || this.bind('parsleyFieldMultiple');
    },
    bind: function(t, e) {
      var i;
      switch (t) {
        case 'parsleyForm':
          i = h.extend(new y(this.element, this.domOptions, this.options), new s, window.ParsleyExtend)._bindFields();
          break;
        case 'parsleyField':
          i = h.extend(new b(this.element, this.domOptions, this.options, this.parent), new s, window.ParsleyExtend);
          break;
        case 'parsleyFieldMultiple':
          i = h.extend(new b(this.element, this.domOptions, this.options, this.parent), new C, new s, window.ParsleyExtend)._init();
          break;
        default:
          throw new Error(t + 'is not a supported Parsley type');
      }
      return this.options.multiple && d.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple), void 0 !== e ? this.$element.data('FieldMultiple', i) : (this.$element.data('Parsley', i), i._actualizeTriggers(), i._trigger('init')), i;
    },
  };
  var E = h.fn.jquery.split('.');
  if (parseInt(E[0]) <= 1 && parseInt(E[1]) < 8) throw 'The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.';
  E.forEach || d.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  var x = o(new s, {
    element: document,
    $element: h(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: A,
    version: '2.9.1'
  });
  o(b.prototype, v.Field, s.prototype), o(y.prototype, v.Form, s.prototype), o(A.prototype, s.prototype), h.fn.parsley = h.fn.psly = function(t) {
    if (1 < this.length) {
      var e = [];
      return this.each(function() {
        e.push(h(this).parsley(t));
      }), e;
    }
    if (0 != this.length) return new A(this[0], t);
  }, void 0 === window.ParsleyExtend && (window.ParsleyExtend = {}), x.options = o(d.objectCreate(n), window.ParsleyConfig), window.ParsleyConfig = x.options, window.Parsley = window.psly = x, x.Utils = d, window.ParsleyUtils = {}, h.each(d, function(t, e) {
    "function" == typeof e && (window.ParsleyUtils[t] = function() {
      return d.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.'), d[t].apply(d, arguments);
    });
  });
  var $ = window.Parsley._validatorRegistry = new a(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {}, h.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator'.split(' '), function(t, e) {
    window.Parsley[e] = function() {
      return $[e].apply($, arguments);
    }, window.ParsleyValidator[e] = function() {
      var t;
      return d.warnOnce('Accessing the method \''.concat(e, '\' through Validator is deprecated. Simply call \'window.Parsley.').concat(e, '(...)\'')), (t = window.Parsley)[e].apply(t, arguments);
    };
  }), window.Parsley.UI = v, window.ParsleyUI = {
    removeError: function(t, e, i) {
      var n = !0 !== i;
      return d.warnOnce('Accessing UI is deprecated. Call \'removeError\' on the instance directly. Please comment in issue 1073 as to your need to call this method.'), t.removeError(e, {
        updateClass: n,
      });
    },
    getErrorsMessages: function(t) {
      return d.warnOnce('Accessing UI is deprecated. Call \'getErrorsMessages\' on the instance directly.'), t.getErrorsMessages();
    },
  }, h.each('addError updateError'.split(' '), function(t, a) {
    window.ParsleyUI[a] = function(t, e, i, n, r) {
      var s = !0 !== r;
      return d.warnOnce('Accessing UI is deprecated. Call \''.concat(a, '\' on the instance directly. Please comment in issue 1073 as to your need to call this method.')), t[a](e, {
        message: i,
        assert: n,
        updateClass: s,
      });
    };
  }), !1 !== window.ParsleyConfig.autoBind && h(function() {
    h('[data-parsley-validate]').length && h('[data-parsley-validate]').parsley();
  });
  var V = h({});
        var P = function() {
      d.warnOnce('Parsley\'s pubsub module is deprecated; use the \'on\' and \'off\' methods on parsley instances or window.Parsley');
    };

  function O(e, i) {
    return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function() {
      var t = Array.prototype.slice.call(arguments, 0);
      t.unshift(this), e.apply(i || V, t);
    }), e.parsleyAdaptedCallback;
  }
  var T = 'parsley:';

  function M(t) {
    return 0 === t.lastIndexOf(T, 0) ? t.substr(T.length) : t;
  }
  return h.listen = function(t, e) {
    var i;
    if (P(), 'object' === r(arguments[1]) && 'function' == typeof arguments[2] && (i = arguments[1], e = arguments[2]), 'function' != typeof e) throw new Error('Wrong parameters');
    window.Parsley.on(M(t), O(e, i));
  }, h.listenTo = function(t, e, i) {
    if (P(), !(t instanceof b || t instanceof y)) throw new Error('Must give Parsley instance');
    if ('string' != typeof e || 'function' != typeof i) throw new Error('Wrong parameters');
    t.on(M(e), O(i));
  }, h.unsubscribe = function(t, e) {
    if (P(), 'string' != typeof t || 'function' != typeof e) throw new Error('Wrong arguments');
    window.Parsley.off(M(t), e.parsleyAdaptedCallback);
  }, h.unsubscribeTo = function(t, e) {
    if (P(), !(t instanceof b || t instanceof y)) throw new Error('Must give Parsley instance');
    t.off(M(e));
  }, h.unsubscribeAll = function(e) {
    P(), window.Parsley.off(M(e)), h('form,input,textarea,select').each(function() {
      var t = h(this).data('Parsley');
      t && t.off(M(e));
    });
  }, h.emit = function(t, e) {
    var i;
    P();
    var n = e instanceof b || e instanceof y;
            var r = Array.prototype.slice.call(arguments, n ? 2 : 1);
    r.unshift(M(t)), n || (e = window.Parsley), (i = e).trigger.apply(i, u(r));
  }, h.extend(!0, x, {
    asyncValidators: {
      default: {
        fn: function(t) {
          return 200 <= t.status && t.status < 300;
        },
        url: !1,
      },
      reverse: {
        fn: function(t) {
          return t.status < 200 || 300 <= t.status;
        },
        url: !1,
      },
    },
    addAsyncValidator: function(t, e, i, n) {
      return x.asyncValidators[t] = {
        fn: e,
        url: i || !1,
        options: n || {},
      }, this;
    },
  }), x.addValidator('remote', {
    requirementType: {
      "": 'string',
      validator: 'string',
      reverse: 'boolean',
      options: 'object'
    },
    validateString: function(t, e, i, n) {
      var r; var s; var a = {};
                var o = i.validator || (!0 === i.reverse ? 'reverse' : 'default');
      if (void 0 === x.asyncValidators[o]) throw new Error('Calling an undefined async validator: `' + o + '`'); - 1 < (e = x.asyncValidators[o].url || e).indexOf('{value}') ? e = e.replace('{value}', encodeURIComponent(t)) : a[n.element.getAttribute('name') || n.element.getAttribute('id')] = t;
      var l = h.extend(!0, i.options || {}, x.asyncValidators[o].options);
      r = h.extend(!0, {}, {
        url: e,
        data: a,
        type: 'GET'
      }, l), n.trigger('field:ajaxoptions', n, r), s = h.param(r), void 0 === x._remoteCache && (x._remoteCache = {});
      var u = x._remoteCache[s] = x._remoteCache[s] || h.ajax(r);
                var d = function() {
          var t = x.asyncValidators[o].fn.call(n, u, e, i);
          return t || (t = h.Deferred().reject()), h.when(t);
        };
      return u.then(d, d);
    },
    priority: -1,
  }), x.on('form:submit', function() {
    x._remoteCache = {};
  }), s.prototype.addAsyncValidator = function() {
    return d.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`'), x.addAsyncValidator.apply(x, arguments);
  }, x.addMessages('en', {
    defaultMessage: 'This value seems to be invalid.',
    type: {
      email: 'This value should be a valid email.',
      url: 'This value should be a valid url.',
      number: 'This value should be a valid number.',
      integer: 'This value should be a valid integer.',
      digits: 'This value should be digits.',
      alphanum: 'This value should be alphanumeric.'
    },
    notblank: 'This value should not be blank.',
    required: 'This value is required.',
    pattern: 'This value seems to be invalid.',
    min: 'This value should be greater than or equal to %s.',
    max: 'This value should be lower than or equal to %s.',
    range: 'This value should be between %s and %s.',
    minlength: 'This value is too short. It should have %s characters or more.',
    maxlength: 'This value is too long. It should have %s characters or fewer.',
    length: 'This value length is invalid. It should be between %s and %s characters long.',
    mincheck: 'You must select at least %s choices.',
    maxcheck: 'You must select %s choices or fewer.',
    check: 'You must select between %s and %s choices.',
    equalto: 'This value should be the same.',
    euvatin: 'It\'s not a valid VAT Identification Number.'
  }), x.setLocale('en'), (new function() {
    var n = this;
            var r = window || global;
    o(this, {
      isNativeEvent: function(t) {
        return t.originalEvent && !1 !== t.originalEvent.isTrusted;
      },
      fakeInputEvent: function(t) {
        n.isNativeEvent(t) && h(t.target).trigger('input');
      },
      misbehaves: function(t) {
        n.isNativeEvent(t) && (n.behavesOk(t), h(document).on('change.inputevent', t.data.selector, n.fakeInputEvent), n.fakeInputEvent(t));
      },
      behavesOk: function(t) {
        n.isNativeEvent(t) && h(document).off('input.inputevent', t.data.selector, n.behavesOk).off('change.inputevent', t.data.selector, n.misbehaves);
      },
      install: function() {
        if (!r.inputEventPatched) {
          r.inputEventPatched = '0.0.3';
          for (let t = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], e = 0; e < t.length; e++) {
            var i = t[e];
            h(document).on('input.inputevent', i, {
              selector: i,
            }, n.behavesOk).on('change.inputevent', i, {
              selector: i,
            }, n.misbehaves);
          }
        }
      },
      uninstall: function() {
        delete r.inputEventPatched, h(document).off('.inputevent');
      },
    });
  }).install(), x;
});
// # sourceMappingURL=parsley.min.js.map

/**
 * Swiper 4.5.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 22, 2019
 */
! function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t();
}(this, function() {
  "use strict";
  var f = 'undefined' == typeof document ? {
    body: {},
    addEventListener: function() {},
    removeEventListener: function() {},
    activeElement: {
      blur: function() {},
      nodeName: ''
    },
    querySelector: function() {
      return null;
    },
    querySelectorAll: function() {
      return [];
    },
    getElementById: function() {
      return null;
    },
    createEvent: function() {
      return {
        initEvent: function() {},
      };
    },
    createElement: function() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function() {},
        getElementsByTagName: function() {
          return [];
        },
      };
    },
    location: {
      hash: ''
    },
  } : document;
        var J = "undefined" == typeof window ? {
            document: f,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window;
        var l = function(e) {
      for (let t = 0; t < e.length; t += 1) this[t] = e[t];
      return this.length = e.length, this;
    };

  function L(e, t) {
    var a = [];
            var i = 0;
    if (e && !t && e instanceof l) return e;
    if (e)
      if ('string' == typeof e) {
        var s; var r; var n = e.trim();
        if (0 <= n.indexOf('<') && 0 <= n.indexOf('>')) {
          var o = 'div';
          for (0 === n.indexOf('<li') && (o = 'ul'), 0 === n.indexOf('<tr') && (o = 'tbody'), 0 !== n.indexOf('<td') && 0 !== n.indexOf('<th') || (o = 'tr'), 0 === n.indexOf('<tbody') && (o = 'table'), 0 === n.indexOf('<option') && (o = 'select'), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i]);
        } else
          for (s = t || '#' !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split('#')[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i]);
      } else if (e.nodeType || e === J || e === f) a.push(e);
      else if (0 < e.length && e[0].nodeType)
        for (i = 0; i < e.length; i += 1) a.push(e[i]);
    return new l(a);
  }

  function r(e) {
    for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
    return t;
  }
  L.fn = l.prototype, L.Class = l, L.Dom7 = l;
  var t = {
    addClass: function(e) {
      if (void 0 === e) return this;
      for (let t = e.split(' '), a = 0; a < t.length; a += 1)
        for (let i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
      return this;
    },
    removeClass: function(e) {
      for (let t = e.split(' '), a = 0; a < t.length; a += 1)
        for (let i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
      return this;
    },
    hasClass: function(e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function(e) {
      for (let t = e.split(' '), a = 0; a < t.length; a += 1)
        for (let i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
      return this;
    },
    attr: function(e, t) {
      var a = arguments;
      if (1 === arguments.length && 'string' == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
      for (let i = 0; i < this.length; i += 1)
        if (2 === a.length) this[i].setAttribute(e, t);
        else
          for (let s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
      return this;
    },
    removeAttr: function(e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function(e, t) {
      var a;
      if (void 0 !== t) {
        for (let i = 0; i < this.length; i += 1)(a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
        return this;
      }
      if (a = this[0]) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
        var s = a.getAttribute('data-' + e);
        return s || void 0;
      }
    },
    transform: function(e) {
      for (let t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransform = e, a.transform = e;
      }
      return this;
    },
    transition: function(e) {
      "string" != typeof e && (e += 'ms');
      for (let t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransitionDuration = e, a.transitionDuration = e;
      }
      return this;
    },
    on: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      var i = t[0];
                var r = t[1];
                var n = t[2];
                var s = t[3];

      function o(e) {
        var t = e.target;
        if (t) {
          var a = e.target.dom7EventData || [];
          if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a);
          else
            for (let i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a);
        }
      }

      function l(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1);
      for (var d, p = i.split(' '), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r)
          for (d = 0; d < p.length; d += 1) {
            var h = p[d];
            u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
              listener: n,
              proxyListener: o,
            }), u.addEventListener(h, o, s);
          } else
          for (d = 0; d < p.length; d += 1) {
            var v = p[d];
            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
              listener: n,
              proxyListener: l,
            }), u.addEventListener(v, l, s);
          }
      }
      return this;
    },
    off: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      var i = t[0];
                var s = t[1];
                var r = t[2];
                var n = t[3];
      "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
      for (let o = i.split(' '), l = 0; l < o.length; l += 1)
        for (let d = o[l], p = 0; p < this.length; p += 1) {
          var c = this[p];
                        var u = void 0;
          if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
            for (let h = u.length - 1; 0 <= h; h -= 1) {
              var v = u[h];
                            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1));
            }
        }
      return this;
    },
    trigger: function() {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      for (let a = e[0].split(' '), i = e[1], s = 0; s < a.length; s += 1)
        for (let r = a[s], n = 0; n < this.length; n += 1) {
          var o = this[n];
                        var l = void 0;
          try {
            l = new J.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (e) {
            (l = f.createEvent('Event')).initEvent(r, !0, !0), l.detail = i;
          }
          o.dom7EventData = e.filter(function(e, t) {
            return 0 < t;
          }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData;
        }
      return this;
    },
    transitionEnd: function(t) {
      var a; var i = ["webkitTransitionEnd", "transitionend"];
                var s = this;

      function r(e) {
        if (e.target === this)
          for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r);
      }
      if (t)
        for (a = 0; a < i.length; a += 1) s.on(i[a], r);
      return this;
    },
    outerWidth: function(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue('margin-right')) + parseFloat(t.getPropertyValue('margin-left'));
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue('margin-top')) + parseFloat(t.getPropertyValue('margin-bottom'));
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function() {
      if (0 < this.length) {
        var e = this[0];
                    var t = e.getBoundingClientRect();
                    var a = f.body;
                    var i = e.clientTop || a.clientTop || 0;
                    var s = e.clientLeft || a.clientLeft || 0;
                    var r = e === J ? J.scrollY : e.scrollTop;
                    var n = e === J ? J.scrollX : e.scrollLeft;
        return {
          top: t.top + r - i,
          left: t.left + n - s,
        };
      }
      return null;
    },
    css: function(e, t) {
      var a;
      if (1 === arguments.length) {
        if ('string' != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (let i in e) this[a].style[i] = e[i];
          return this;
        }
        if (this[0]) return J.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && 'string' == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function(e) {
      if (!e) return this;
      for (let t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this;
    },
    html: function(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function(e) {
      var t; var a; var i = this[0];
      if (!i || void 0 === e) return !1;
      if ('string' == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (t = L(e), a = 0; a < t.length; a += 1)
          if (t[a] === i) return !0;
        return !1;
      }
      if (e === f) return i === f;
      if (e === J) return i === J;
      if (e.nodeType || e instanceof l) {
        for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
          if (t[a] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function() {
      var e; var t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function(e) {
      if (void 0 === e) return this;
      var t; var a = this.length;
      return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]]);
    },
    append: function() {
      for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
      for (let i = 0; i < t.length; i += 1) {
        e = t[i];
        for (let s = 0; s < this.length; s += 1)
          if ('string' == typeof e) {
            var r = f.createElement('div');
            for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild);
          } else if (e instanceof l)
            for (let n = 0; n < e.length; n += 1) this[s].appendChild(e[n]);
          else this[s].appendChild(e);
      }
      return this;
    },
    prepend: function(e) {
      var t; var a;
      for (t = 0; t < this.length; t += 1)
        if ('string' == typeof e) {
          var i = f.createElement('div');
          for (i.innerHTML = e, a = i.childNodes.length - 1; 0 <= a; a -= 1) this[t].insertBefore(i.childNodes[a], this[t].childNodes[0]);
        } else if (e instanceof l)
          for (a = 0; a < e.length; a += 1) this[t].insertBefore(e[a], this[t].childNodes[0]);
        else this[t].insertBefore(e, this[t].childNodes[0]);
      return this;
    },
    next: function(e) {
      return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([]);
    },
    nextAll: function(e) {
      var t = [];
                var a = this[0];
      if (!a) return new l([]);
      for (; a.nextElementSibling;) {
        var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i;
      }
      return new l(t);
    },
    prev: function(e) {
      if (0 < this.length) {
        var t = this[0];
        return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([]);
      }
      return new l([]);
    },
    prevAll: function(e) {
      var t = [];
                var a = this[0];
      if (!a) return new l([]);
      for (; a.previousElementSibling;) {
        var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i;
      }
      return new l(t);
    },
    parent: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
      return L(r(t));
    },
    parents: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (let i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
      return L(r(t));
    },
    closest: function(e) {
      var t = this;
      return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (let i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
      return new l(t);
    },
    children: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1)
        for (let i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
      return new l(r(t));
    },
    remove: function() {
      for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
    add: function() {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      var a; var i;
      for (a = 0; a < e.length; a += 1) {
        var s = L(e[a]);
        for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1;
      }
      return this;
    },
    styles: function() {
      return this[0] ? J.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(t).forEach(function(e) {
    L.fn[e] = t[e];
  });
  var e; var a; var i; var s; var ee = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, t) {
                var a, i, s;
                void 0 === t && (t = "x");
                var r = J.getComputedStyle(e, null);
                return J.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), s = new J.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = J.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = J.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
            },
            parseUrlQuery: function(e) {
                var t, a, i, s, r = {},
                    n = e || J.location.href;
                if ("string" == typeof n && n.length)
                    for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                            return "" !== e
                        })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
                return r
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                    var s = e[i];
                    if (null != s)
                        for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                            var l = r[n],
                                d = Object.getOwnPropertyDescriptor(s, l);
                            void 0 !== d && d.enumerable && (ee.isObject(a[l]) && ee.isObject(s[l]) ? ee.extend(a[l], s[l]) : !ee.isObject(a[l]) && ee.isObject(s[l]) ? (a[l] = {}, ee.extend(a[l], s[l])) : a[l] = s[l])
                        }
                }
                return a
            }
        };
        var te = (i = f.createElement("div"), {
            touch: J.Modernizr && !0 === J.Modernizr.touch || !!(0 < J.navigator.maxTouchPoints || "ontouchstart" in J || J.DocumentTouch && f instanceof J.DocumentTouch),
            pointerEvents: !!(J.navigator.pointerEnabled || J.PointerEvent || "maxTouchPoints" in J.navigator && 0 < J.navigator.maxTouchPoints),
            prefixedPointerEvents: !!J.navigator.msPointerEnabled,
            transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a),
            transforms3d: J.Modernizr && !0 === J.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
            flexbox: function() {
                for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1)
                    if (t[a] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in J || "WebkitMutationObserver" in J,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    J.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in J
        });
        var I = {
            isIE: !!J.navigator.userAgent.match(/Trident/g) || !!J.navigator.userAgent.match(/MSIE/g),
            isEdge: !!J.navigator.userAgent.match(/Edge/g),
            isSafari: (s = J.navigator.userAgent.toLowerCase(), 0 <= s.indexOf("safari") && s.indexOf("chrome") < 0 && s.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(J.navigator.userAgent)
        };
        var n = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
                t.on(e, t.params.on[e])
            })
        };
        var o = {
      components: {
        configurable: !0,
      },
    };
  n.prototype.on = function(e, t, a) {
    var i = this;
    if ('function' != typeof t) return i;
    var s = a ? 'unshift' : 'push';
    return e.split(' ').forEach(function(e) {
      i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t);
    }), i;
  }, n.prototype.once = function(a, i, e) {
    var s = this;
    if ('function' != typeof i) return s;

    function r() {
      for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
      i.apply(s, e), s.off(a, r), r.f7proxy && delete r.f7proxy;
    }
    return r.f7proxy = i, s.on(a, r, e);
  }, n.prototype.off = function(e, i) {
    var s = this;
    return s.eventsListeners && e.split(' ').forEach(function(a) {
            void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function(e, t) {
              (e === i || e.f7proxy && e.f7proxy === i) && s.eventsListeners[a].splice(t, 1);
            });
    }), s;
  }, n.prototype.emit = function() {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
    var a; var i; var s; var r = this;
    return r.eventsListeners && ('string' == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), s = r) : (a = e[0].events, i = e[0].data, s = e[0].context || r), (Array.isArray(a) ? a : a.split(' ')).forEach(function(e) {
      if (r.eventsListeners && r.eventsListeners[e]) {
        var t = [];
        r.eventsListeners[e].forEach(function(e) {
          t.push(e);
        }), t.forEach(function(e) {
          e.apply(s, i);
        });
      }
    })), r;
  }, n.prototype.useModulesParams = function(a) {
    var i = this;
    i.modules && Object.keys(i.modules).forEach(function(e) {
      var t = i.modules[e];
      t.params && ee.extend(a, t.params);
    });
  }, n.prototype.useModules = function(i) {
    void 0 === i && (i = {});
    var s = this;
    s.modules && Object.keys(s.modules).forEach(function(e) {
      var a = s.modules[e];
                var t = i[e] || {};
      a.instance && Object.keys(a.instance).forEach(function(e) {
        var t = a.instance[e];
        s[e] = 'function' == typeof t ? t.bind(s) : t;
      }), a.on && s.on && Object.keys(a.on).forEach(function(e) {
        s.on(e, a.on[e]);
      }), a.create && a.create.bind(s)(t);
    });
  }, o.components.set = function(e) {
    this.use && this.use(e);
  }, n.installModule = function(t) {
    for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1];
    var i = this;
    i.prototype.modules || (i.prototype.modules = {});
    var s = t.name || Object.keys(i.prototype.modules).length + '_' + ee.now();
    return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function(e) {
      i.prototype[e] = t.proto[e];
    }), t.static && Object.keys(t.static).forEach(function(e) {
      i[e] = t.static[e];
    }), t.install && t.install.apply(i, e), i;
  }, n.use = function(e) {
    for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1];
    var i = this;
    return Array.isArray(e) ? (e.forEach(function(e) {
      return i.installModule(e);
    }), i) : i.installModule.apply(i, [e].concat(t));
  }, Object.defineProperties(n, o);
  var d = {
    updateSize: function() {
      var e; var t; var a = this;
                var i = a.$el;
      e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css('padding-left'), 10) - parseInt(i.css('padding-right'), 10), t = t - parseInt(i.css('padding-top'), 10) - parseInt(i.css('padding-bottom'), 10), ee.extend(a, {
        width: e,
        height: t,
        size: a.isHorizontal() ? e : t,
      }));
    },
    updateSlides: function() {
      var e = this;
                var t = e.params;
                var a = e.$wrapperEl;
                var i = e.size;
                var s = e.rtlTranslate;
                var r = e.wrongRTL;
                var n = e.virtual && t.virtual.enabled;
                var o = n ? e.virtual.slides.length : e.slides.length;
                var l = a.children("." + e.params.slideClass);
                var d = n ? e.virtual.slides.length : l.length;
                var p = [];
                var c = [];
                var u = [];
                var h = t.slidesOffsetBefore;
      "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
      var v = t.slidesOffsetAfter;
      "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
      var f = e.snapGrid.length;
                var m = e.snapGrid.length;
                var g = t.spaceBetween;
                var b = -h;
                var w = 0;
                var y = 0;
      if (void 0 !== i) {
        var x; var T;
        "string" == typeof g && 0 <= g.indexOf('%') && (g = parseFloat(g.replace('%', '')) / 100 * i), e.virtualSize = -g, s ? l.css({
          marginLeft: '',
          marginTop: ''
        }) : l.css({
          marginRight: '',
          marginBottom: ''
        }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, 'auto' !== t.slidesPerView && 'row' === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
        for (var E, S = t.slidesPerColumn, C = x / S, M = Math.floor(d / t.slidesPerColumn), z = 0; z < d; z += 1) {
          T = 0;
          var P = l.eq(z);
          if (1 < t.slidesPerColumn) {
            var k = void 0;
                            var $ = void 0;
                            var L = void 0;
                        'column' === t.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), k = $ + L * x / S, P.css({
                          "-webkit-box-ordinal-group": k,
                          "-moz-box-ordinal-group": k,
                          "-ms-flex-order": k,
                          "-webkit-order": k,
                          order: k,
                        })) : $ = z - (L = Math.floor(z / C)) * C, P.css('margin-' + (e.isHorizontal() ? 'top' : 'left'), 0 !== L && t.spaceBetween && t.spaceBetween + 'px').attr('data-swiper-column', $).attr('data-swiper-row', L);
          }
          if ('none' !== P.css('display')) {
            if ('auto' === t.slidesPerView) {
              var I = J.getComputedStyle(P[0], null);
                                var D = P[0].style.transform;
                                var O = P[0].style.webkitTransform;
              if (D && (P[0].style.transform = 'none'), O && (P[0].style.webkitTransform = 'none'), t.roundLengths) T = e.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0);
              else if (e.isHorizontal()) {
                var A = parseFloat(I.getPropertyValue('width'));
                                    var H = parseFloat(I.getPropertyValue("padding-left"));
                                    var N = parseFloat(I.getPropertyValue("padding-right"));
                                    var G = parseFloat(I.getPropertyValue("margin-left"));
                                    var B = parseFloat(I.getPropertyValue("margin-right"));
                                    var X = I.getPropertyValue('box-sizing');
                T = X && 'border-box' === X ? A + G + B : A + H + N + G + B;
              } else {
                var Y = parseFloat(I.getPropertyValue('height'));
                                    var V = parseFloat(I.getPropertyValue("padding-top"));
                                    var F = parseFloat(I.getPropertyValue("padding-bottom"));
                                    var R = parseFloat(I.getPropertyValue("margin-top"));
                                    var q = parseFloat(I.getPropertyValue("margin-bottom"));
                                    var W = I.getPropertyValue('box-sizing');
                T = W && 'border-box' === W ? Y + R + q : Y + V + F + R + q;
              }
              D && (P[0].style.transform = D), O && (P[0].style.webkitTransform = O), t.roundLengths && (T = Math.floor(T));
            } else T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[z] && (e.isHorizontal() ? l[z].style.width = T + 'px' : l[z].style.height = T + 'px');
            l[z] && (l[z].swiperSlideSize = T), u.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== z && (b = b - i / 2 - g), 0 === z && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1;
          }
        }
        if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ('slide' === t.effect || 'coverflow' === t.effect) && a.css({
          width: e.virtualSize + t.spaceBetween + 'px'
        }), te.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
          width: e.virtualSize + t.spaceBetween + 'px'
        }) : a.css({
          height: e.virtualSize + t.spaceBetween + 'px'
        })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({
          width: e.virtualSize + t.spaceBetween + 'px'
        }) : a.css({
          height: e.virtualSize + t.spaceBetween + 'px'
        }), t.centeredSlides)) {
          E = [];
          for (let j = 0; j < p.length; j += 1) {
            var U = p[j];
            t.roundLengths && (U = Math.floor(U)), p[j] < e.virtualSize + p[0] && E.push(U);
          }
          p = E;
        }
        if (!t.centeredSlides) {
          E = [];
          for (let K = 0; K < p.length; K += 1) {
            var _ = p[K];
            t.roundLengths && (_ = Math.floor(_)), p[K] <= e.virtualSize - i && E.push(_);
          }
          p = E, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i);
        }
        if (0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
          marginLeft: g + 'px'
        }) : l.css({
          marginRight: g + 'px'
        }) : l.css({
          marginBottom: g + 'px'
        })), t.centerInsufficientSlides) {
          var Z = 0;
          if (u.forEach(function(e) {
            Z += e + (t.spaceBetween ? t.spaceBetween : 0);
          }), (Z -= t.spaceBetween) < i) {
            var Q = (i - Z) / 2;
            p.forEach(function(e, t) {
              p[t] = e - Q;
            }), c.forEach(function(e, t) {
              c[t] = e + Q;
            });
          }
        }
        ee.extend(e, {
          slides: l,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u,
        }), d !== o && e.emit('slidesLengthChange'), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit('snapGridLengthChange')), c.length !== m && e.emit('slidesGridLengthChange'), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset();
      }
    },
    updateAutoHeight: function(e) {
      var t; var a = this;
                var i = [];
                var s = 0;
      if ('number' == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), 'auto' !== a.params.slidesPerView && 1 < a.params.slidesPerView)
        for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
          var r = a.activeIndex + t;
          if (r > a.slides.length) break;
          i.push(a.slides.eq(r)[0]);
        } else i.push(a.slides.eq(a.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1)
        if (void 0 !== i[t]) {
          var n = i[t].offsetHeight;
          s = s < n ? n : s;
        }
      s && a.$wrapperEl.css('height', s + 'px');
    },
    updateSlidesOffset: function() {
      for (let e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
    },
    updateSlidesProgress: function(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this;
                var a = t.params;
                var i = t.slides;
                var s = t.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        var r = -e;
        s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
        for (let n = 0; n < i.length; n += 1) {
          var o = i[n];
                        var l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
          if (a.watchSlidesVisibility) {
            var d = -(r - o.swiperSlideOffset);
                            var p = d + t.slidesSizesGrid[n];
            (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass));
          }
          o.progress = s ? -l : l;
        }
        t.visibleSlides = L(t.visibleSlides);
      }
    },
    updateProgress: function(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this;
                var a = t.params;
                var i = t.maxTranslate() - t.minTranslate();
                var s = t.progress;
                var r = t.isBeginning;
                var n = t.isEnd;
                var o = r;
                var l = n;
            0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, n = 1 <= s), ee.extend(t, {
        progress: s,
        isBeginning: r,
        isEnd: n,
      }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit('reachBeginning toEdge'), n && !l && t.emit('reachEnd toEdge'), (o && !r || l && !n) && t.emit('fromEdge'), t.emit('progress', s);
    },
    updateSlidesClasses: function() {
      var e; var t = this;
                var a = t.slides;
                var i = t.params;
                var s = t.$wrapperEl;
                var r = t.activeIndex;
                var n = t.realIndex;
                var o = t.virtual && i.virtual.enabled;
      a.removeClass(i.slideActiveClass + ' ' + i.slideNextClass + ' ' + i.slidePrevClass + ' ' + i.slideDuplicateActiveClass + ' ' + i.slideDuplicateNextClass + ' ' + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find('.' + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children('.' + i.slideClass + ':not(.' + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children('.' + i.slideClass + '.' + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
      var l = e.nextAll('.' + i.slideClass).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
      var d = e.prevAll('.' + i.slideClass).eq(0).addClass(i.slidePrevClass);
      i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children('.' + i.slideClass + ':not(.' + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr('data-swiper-slide-index') + '"]').addClass(i.slideDuplicateNextClass) : s.children('.' + i.slideClass + '.' + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr('data-swiper-slide-index') + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children('.' + i.slideClass + ':not(.' + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr('data-swiper-slide-index') + '"]').addClass(i.slideDuplicatePrevClass) : s.children('.' + i.slideClass + '.' + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr('data-swiper-slide-index') + '"]').addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function(e) {
      var t; var a = this;
                var i = a.rtlTranslate ? a.translate : -a.translate;
                var s = a.slidesGrid;
                var r = a.snapGrid;
                var n = a.params;
                var o = a.activeIndex;
                var l = a.realIndex;
                var d = a.snapIndex;
                var p = e;
      if (void 0 === p) {
        for (let c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
      }
      if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
        var u = parseInt(a.slides.eq(p).attr('data-swiper-slide-index') || p, 10);
        ee.extend(a, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: p,
        }), a.emit('activeIndexChange'), a.emit('snapIndexChange'), l !== u && a.emit('realIndexChange'), a.emit('slideChange');
      } else t !== d && (a.snapIndex = t, a.emit('snapIndexChange'));
    },
    updateClickedSlide: function(e) {
      var t = this;
                var a = t.params;
                var i = L(e.target).closest("." + a.slideClass)[0];
                var s = !1;
      if (i)
        for (let r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
      if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
      t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr('data-swiper-slide-index'), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
    },
  };
  var p = {
    getTranslate: function(e) {
      void 0 === e && (e = this.isHorizontal() ? 'x' : 'y');
      var t = this.params;
                var a = this.rtlTranslate;
                var i = this.translate;
                var s = this.$wrapperEl;
      if (t.virtualTranslate) return a ? -i : i;
      var r = ee.getTranslate(s[0], e);
      return a && (r = -r), r || 0;
    },
    setTranslate: function(e, t) {
      var a = this;
                var i = a.rtlTranslate;
                var s = a.params;
                var r = a.$wrapperEl;
                var n = a.progress;
                var o = 0;
                var l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (te.transforms3d ? r.transform('translate3d(' + o + 'px, ' + l + 'px, 0px)') : r.transform('translate(' + o + 'px, ' + l + 'px)')), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
            let d = a.maxTranslate() - a.minTranslate();
            (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit('setTranslate', a.translate, t);
    },
    minTranslate: function() {
      return -this.snapGrid[0];
    },
    maxTranslate: function() {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
  };
  var c = {
    setTransition: function(e, t) {
      this.$wrapperEl.transition(e), this.emit('setTransition', e, t);
    },
    transitionStart: function(e, t) {
      void 0 === e && (e = !0);
      var a = this;
                var i = a.activeIndex;
                var s = a.params;
                var r = a.previousIndex;
      s.autoHeight && a.updateAutoHeight();
      var n = t;
      if (n || (n = r < i ? 'next' : i < r ? 'prev' : 'reset'), a.emit('transitionStart'), e && i !== r) {
        if ('reset' === n) return void a.emit('slideResetTransitionStart');
        a.emit('slideChangeTransitionStart'), 'next' === n ? a.emit('slideNextTransitionStart') : a.emit('slidePrevTransitionStart');
      }
    },
    transitionEnd: function(e, t) {
      void 0 === e && (e = !0);
      var a = this;
                var i = a.activeIndex;
                var s = a.previousIndex;
      a.animating = !1, a.setTransition(0);
      var r = t;
      if (r || (r = s < i ? 'next' : i < s ? 'prev' : 'reset'), a.emit('transitionEnd'), e && i !== s) {
        if ('reset' === r) return void a.emit('slideResetTransitionEnd');
        a.emit('slideChangeTransitionEnd'), 'next' === r ? a.emit('slideNextTransitionEnd') : a.emit('slidePrevTransitionEnd');
      }
    },
  };
  var u = {
    slideTo: function(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = this;
                var r = e;
      r < 0 && (r = 0);
      var n = s.params;
                var o = s.snapGrid;
                var l = s.slidesGrid;
                var d = s.previousIndex;
                var p = s.activeIndex;
                var c = s.rtlTranslate;
      if (s.animating && n.preventInteractionOnTransition) return !1;
      var u = Math.floor(r / n.slidesPerGroup);
      u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit('beforeSlideChangeStart');
      var h; var v = -o[u];
      if (s.updateProgress(v), n.normalizeSlideIndex)
        for (let f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
      if (s.initialized && r !== p) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
        if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1;
      }
      return h = p < r ? 'next' : r < p ? 'prev' : 'reset', c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), 'slide' !== n.effect && s.setTranslate(v), 'reset' !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && te.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit('beforeTransitionStart', t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
        s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener('transitionend', s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener('webkitTransitionEnd', s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h));
      }), s.$wrapperEl[0].addEventListener('transitionend', s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener('webkitTransitionEnd', s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit('beforeTransitionStart', t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0);
    },
    slideToLoop: function(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = e;
      return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i);
    },
    slideNext: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this;
                var s = i.params;
                var r = i.animating;
      return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
    },
    slidePrev: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this;
                var s = i.params;
                var r = i.animating;
                var n = i.snapGrid;
                var o = i.slidesGrid;
                var l = i.rtlTranslate;
      if (s.loop) {
        if (r) return !1;
        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft;
      }

      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      var p; var c = d(l ? i.translate : -i.translate);
                var u = n.map(function(e) {
                    return d(e)
                });
                var h = (o.map(function(e) {
          return d(e);
        }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
      return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a);
    },
    slideReset: function(e, t, a) {
      return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a);
    },
    slideToClosest: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this;
                var s = i.activeIndex;
                var r = Math.floor(s / i.params.slidesPerGroup);
      if (r < i.snapGrid.length - 1) {
        var n = i.rtlTranslate ? i.translate : -i.translate;
                    var o = i.snapGrid[r];
        (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup);
      }
      return i.slideTo(s, e, t, a);
    },
    slideToClickedSlide: function() {
      var e; var t = this;
                var a = t.params;
                var i = t.$wrapperEl;
                var s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView;
                var r = t.clickedIndex;
      if (a.loop) {
        if (t.animating) return;
        e = parseInt(L(t.clickedSlide).attr('data-swiper-slide-index'), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children('.' + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ')').eq(0).index(), ee.nextTick(function() {
          t.slideTo(r);
        })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children('.' + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ')').eq(0).index(), ee.nextTick(function() {
          t.slideTo(r);
        })) : t.slideTo(r);
      } else t.slideTo(r);
    },
  };
  var h = {
    loopCreate: function() {
      var i = this;
                var e = i.params;
                var t = i.$wrapperEl;
      t.children('.' + e.slideClass + '.' + e.slideDuplicateClass).remove();
      var s = t.children('.' + e.slideClass);
      if (e.loopFillGroupWithBlank) {
        var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
        if (a !== e.slidesPerGroup) {
          for (let r = 0; r < a; r += 1) {
            var n = L(f.createElement('div')).addClass(e.slideClass + ' ' + e.slideBlankClass);
            t.append(n);
          }
          s = t.children('.' + e.slideClass);
        }
      }
      "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
      var o = [];
                var l = [];
      s.each(function(e, t) {
        var a = L(t);
        e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr('data-swiper-slide-index', e);
      });
      for (let d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
      for (let p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass));
    },
    loopFix: function() {
      var e; var t = this;
                var a = t.params;
                var i = t.activeIndex;
                var s = t.slides;
                var r = t.loopedSlides;
                var n = t.allowSlidePrev;
                var o = t.allowSlideNext;
                var l = t.snapGrid;
                var d = t.rtlTranslate;
      t.allowSlidePrev = !0, t.allowSlideNext = !0;
      var p = -l[i] - t.getTranslate();
            i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ('auto' === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = n, t.allowSlideNext = o;
    },
    loopDestroy: function() {
      var e = this.$wrapperEl;
                var t = this.params;
                var a = this.slides;
      e.children('.' + t.slideClass + '.' + t.slideDuplicateClass + ',.' + t.slideClass + '.' + t.slideBlankClass).remove(), a.removeAttr('data-swiper-slide-index');
    },
  };
  var v = {
    setGrabCursor: function(e) {
      if (!(te.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
        var t = this.el;
        t.style.cursor = 'move', t.style.cursor = e ? '-webkit-grabbing' : '-webkit-grab', t.style.cursor = e ? '-moz-grabbin' : '-moz-grab', t.style.cursor = e ? 'grabbing' : 'grab'
      }
    },
    unsetGrabCursor: function() {
      te.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = '');
    },
  };
  var m = {
      appendSlide: function(e) {
        var t = this;
                    var a = t.$wrapperEl;
                    var i = t.params;
        if (i.loop && t.loopDestroy(), 'object' == typeof e && 'length' in e)
          for (let s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
        else a.append(e);
        i.loop && t.loopCreate(), i.observer && te.observer || t.update();
      },
      prependSlide: function(e) {
        var t = this;
                    var a = t.params;
                    var i = t.$wrapperEl;
                    var s = t.activeIndex;
        a.loop && t.loopDestroy();
        var r = s + 1;
        if ('object' == typeof e && 'length' in e) {
          for (let n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
          r = s + e.length;
        } else i.prepend(e);
        a.loop && t.loopCreate(), a.observer && te.observer || t.update(), t.slideTo(r, 0, !1);
      },
      addSlide: function(e, t) {
        var a = this;
                    var i = a.$wrapperEl;
                    var s = a.params;
                    var r = a.activeIndex;
        s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children('.' + s.slideClass));
        var n = a.slides.length;
        if (e <= 0) a.prependSlide(t);
        else if (n <= e) a.appendSlide(t);
        else {
          for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
            var p = a.slides.eq(d);
            p.remove(), l.unshift(p);
          }
          if ('object' == typeof t && 'length' in t) {
            for (let c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
            o = e < r ? r + t.length : r;
          } else i.append(t);
          for (let u = 0; u < l.length; u += 1) i.append(l[u]);
          s.loop && a.loopCreate(), s.observer && te.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1);
        }
      },
      removeSlide: function(e) {
        var t = this;
                    var a = t.params;
                    var i = t.$wrapperEl;
                    var s = t.activeIndex;
        a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children('.' + a.slideClass));
        var r; var n = s;
        if ('object' == typeof e && 'length' in e) {
          for (let o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
          n = Math.max(n, 0);
        } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
        a.loop && t.loopCreate(), a.observer && te.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
      },
      removeAllSlides: function() {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      },
    };
        var g = function() {
      var e = J.navigator.userAgent;
                var t = {
                    ios: !1,
                    android: !1,
                    androidChrome: !1,
                    desktop: !1,
                    windows: !1,
                    iphone: !1,
                    ipod: !1,
                    ipad: !1,
                    cordova: J.cordova || J.phonegap,
                    phonegap: J.cordova || J.phonegap
                };
                var a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
                var i = e.match(/(Android);?[\s\/]+([\d.]+)?/);
                var s = e.match(/(iPad).*OS\s([\d_]+)/);
                var r = e.match(/(iPod)(.*OS\s([\d_]+))?/);
                var n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (a && (t.os = 'windows', t.osVersion = a[2], t.windows = !0), i && !a && (t.os = 'android', t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf('chrome')), (s || n || r) && (t.os = 'ios', t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, '.'), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, '.'), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, '.') : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf('Version/') && '10' === t.osVersion.split('.')[0] && (t.osVersion = e.toLowerCase().split('version/')[1].split(' ')[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && 'ios' === t.os) {
        var o = t.osVersion.split('.');
                    var l = f.querySelector('meta[name="viewport"]');
        t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute('content').indexOf('minimal-ui');
      }
      return t.pixelRatio = J.devicePixelRatio || 1, t;
    }();

  function b() {
    var e = this;
            var t = e.params;
            var a = e.el;
    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var i = e.allowSlideNext;
                var s = e.allowSlidePrev;
                var r = e.snapGrid;
      if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
        var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight();
      } else e.updateSlidesClasses(), ('auto' === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
      e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
  }
  var w = {
      init: !0,
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: .02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: 'slide',
      breakpoints: void 0,
      breakpointsInverse: !1,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: 'swiper-container-',
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      runCallbacksOnInit: !0,
    };
        var y = {
            update: d,
            translate: p,
            transition: c,
            slide: u,
            loop: h,
            grabCursor: v,
            manipulation: m,
            events: {
                attachEvents: function() {
                    var e = this,
                        t = e.params,
                        a = e.touchEvents,
                        i = e.el,
                        s = e.wrapperEl;
                    e.onTouchStart = function(e) {
                        var t = this,
                            a = t.touchEventsData,
                            i = t.params,
                            s = t.touches;
                        if (!t.animating || !i.preventInteractionOnTransition) {
                            var r = e;
                            if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved))
                                if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;
                                else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
                                s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                                var n = s.currentX,
                                    o = s.currentY,
                                    l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                                    d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                                if (!l || !(n <= d || n >= J.screen.width - d)) {
                                    if (ee.extend(a, {
                                            isTouched: !0,
                                            isMoved: !1,
                                            allowTouchCallbacks: !0,
                                            isScrolling: void 0,
                                            startMoving: void 0
                                        }), s.startX = n, s.startY = o, a.touchStartTime = ee.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                                        var p = !0;
                                        L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur();
                                        var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                                        (i.touchStartForcePreventDefault || c) && r.preventDefault()
                                    }
                                    t.emit("touchStart", r)
                                }
                            }
                        }
                    }.bind(e), e.onTouchMove = function(e) {
                        var t = this,
                            a = t.touchEventsData,
                            i = t.params,
                            s = t.touches,
                            r = t.rtlTranslate,
                            n = e;
                        if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
                            if (!a.isTouchEvent || "mousemove" !== n.type) {
                                var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                                    l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                                if (n.preventedByNestedSwiper) return s.startX = o, void(s.startY = l);
                                if (!t.allowTouchMove) return t.allowClick = !1, void(a.isTouched && (ee.extend(s, {
                                    startX: o,
                                    startY: l,
                                    currentX: o,
                                    currentY: l
                                }), a.touchStartTime = ee.now()));
                                if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                                    if (t.isVertical()) {
                                        if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1)
                                    } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
                                if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void(t.allowClick = !1);
                                if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                                    s.currentX = o, s.currentY = l;
                                    var d, p = s.currentX - s.startX,
                                        c = s.currentY - s.startY;
                                    if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold))
                                        if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;
                                        else if (a.startMoving) {
                                        t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                                        var u = t.isHorizontal() ? p : c;
                                        s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                                        var h = !0,
                                            v = i.resistanceRatio;
                                        if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                                            if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate);
                                            if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                        }
                                        i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                            position: s[t.isHorizontal() ? "startX" : "startY"],
                                            time: a.touchStartTime
                                        }), a.velocities.push({
                                            position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                            time: ee.now()
                                        })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate))
                                    }
                                }
                            }
                        } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
                    }.bind(e), e.onTouchEnd = function(e) {
                        var t = this,
                            a = t.touchEventsData,
                            i = t.params,
                            s = t.touches,
                            r = t.rtlTranslate,
                            n = t.$wrapperEl,
                            o = t.slidesGrid,
                            l = t.snapGrid,
                            d = e;
                        if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
                        i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var p, c = ee.now(),
                            u = c - a.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = ee.nextTick(function() {
                                t && !t.destroyed && t.emit("click", d)
                            }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = ee.now(), ee.nextTick(function() {
                                t.destroyed || (t.allowClick = !0)
                            }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
                        if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
                            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                            if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                            if (i.freeModeMomentum) {
                                if (1 < a.velocities.length) {
                                    var h = a.velocities.pop(),
                                        v = a.velocities.pop(),
                                        f = h.position - v.position,
                                        m = h.time - v.time;
                                    t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < ee.now() - h.time) && (t.velocity = 0)
                                } else t.velocity = 0;
                                t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                                var g = 1e3 * i.freeModeMomentumRatio,
                                    b = t.velocity * g,
                                    w = t.translate + b;
                                r && (w = -w);
                                var y, x, T = !1,
                                    E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                                if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), y = t.maxTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);
                                else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), y = t.minTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);
                                else if (i.freeModeSticky) {
                                    for (var S, C = 0; C < l.length; C += 1)
                                        if (l[C] > -w) {
                                            S = C;
                                            break
                                        }
                                    w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                                }
                                if (x && t.once("transitionEnd", function() {
                                        t.loopFix()
                                    }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                                else if (i.freeModeSticky) return void t.slideToClosest();
                                i.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function() {
                                    t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function() {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))
                                })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function() {
                                    t && !t.destroyed && t.transitionEnd()
                                }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                            } else if (i.freeModeSticky) return void t.slideToClosest();
                            (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                        } else {
                            for (var M = 0, z = t.slidesSizesGrid[0], P = 0; P < o.length; P += i.slidesPerGroup) void 0 !== o[P + i.slidesPerGroup] ? p >= o[P] && p < o[P + i.slidesPerGroup] && (z = o[(M = P) + i.slidesPerGroup] - o[P]) : p >= o[P] && (M = P, z = o[o.length - 1] - o[o.length - 2]);
                            var k = (p - o[M]) / z;
                            if (u > i.longSwipesMs) {
                                if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && (k >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (k > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                            } else {
                                if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
                            }
                        }
                    }.bind(e), e.onClick = function(e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }.bind(e);
                    var r = "container" === t.touchEventsTarget ? i : s,
                        n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("touchstart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, te.passiveListener ? {
                                passive: !1,
                                capture: n
                            } : n), r.addEventListener(a.end, e.onTouchEnd, o)
                        }(t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1))
                    } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b, !0)
                },
                detachEvents: function() {
                    var e = this,
                        t = e.params,
                        a = e.touchEvents,
                        i = e.el,
                        s = e.wrapperEl,
                        r = "container" === t.touchEventsTarget ? i : s,
                        n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("onTouchStart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o)
                        }(t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1))
                    } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this,
                        t = e.activeIndex,
                        a = e.initialized,
                        i = e.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = e.params,
                        r = s.breakpoints;
                    if (r && (!r || 0 !== Object.keys(r).length)) {
                        var n = e.getBreakpoint(r);
                        if (n && e.currentBreakpoint !== n) {
                            var o = n in r ? r[n] : void 0;
                            o && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function(e) {
                                var t = o[e];
                                void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var l = o || e.originalParams,
                                d = l.direction && l.direction !== s.direction,
                                p = s.loop && (l.slidesPerView !== s.slidesPerView || d);
                            d && a && e.changeDirection(), ee.extend(e.params, l), ee.extend(e, {
                                allowTouchMove: e.params.allowTouchMove,
                                allowSlideNext: e.params.allowSlideNext,
                                allowSlidePrev: e.params.allowSlidePrev
                            }), e.currentBreakpoint = n, p && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                        }
                    }
                },
                getBreakpoint: function(e) {
                    if (e) {
                        var t = !1,
                            a = [];
                        Object.keys(e).forEach(function(e) {
                            a.push(e)
                        }), a.sort(function(e, t) {
                            return parseInt(e, 10) - parseInt(t, 10)
                        });
                        for (var i = 0; i < a.length; i += 1) {
                            var s = a[i];
                            this.params.breakpointsInverse ? s <= J.innerWidth && (t = s) : s >= J.innerWidth && !t && (t = s)
                        }
                        return t || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var t = this.classNames,
                        a = this.params,
                        e = this.rtl,
                        i = this.$el,
                        s = [];
                    s.push("initialized"), s.push(a.direction), a.freeMode && s.push("free-mode"), te.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), g.android && s.push("android"), g.ios && s.push("ios"), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function(e) {
                        t.push(a.containerModifierClass + e)
                    }), i.addClass(t.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, t, a, i, s, r) {
                    var n;

                    function o() {
                        r && r()
                    }
                    e.complete && s ? o() : t ? ((n = new J.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        };
        var x = {};
        var T = function(u) {
            function h() {
                for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0], s = e[1]), s || (s = {}), s = ee.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(y).forEach(function(t) {
                    Object.keys(y[t]).forEach(function(e) {
                        h.prototype[e] || (h.prototype[e] = y[t][e])
                    })
                });
                var r = this;
                void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function(e) {
                    var t = r.modules[e];
                    if (t.params) {
                        var a = Object.keys(t.params)[0],
                            i = t.params[a];
                        if ("object" != typeof i || null === i) return;
                        if (!(a in s && "enabled" in i)) return;
                        !0 === s[a] && (s[a] = {
                            enabled: !0
                        }), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {
                            enabled: !1
                        })
                    }
                });
                var n = ee.extend({}, w);
                r.useModulesParams(n), r.params = ee.extend({}, n, x, s), r.originalParams = ee.extend({}, r.params), r.passedParams = ee.extend({}, s);
                var o = (r.$ = L)(r.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function(e, t) {
                            var a = ee.extend({}, s, {
                                el: t
                            });
                            l.push(new h(a))
                        }), l
                    }
                    t.swiper = r, o.data("swiper", r);
                    var d, p, c = o.children("." + r.params.wrapperClass);
                    return ee.extend(r, {
                        $el: o,
                        el: t,
                        $wrapperEl: c,
                        wrapperEl: c[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === r.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === r.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === c.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: r.params.allowSlideNext,
                        allowSlidePrev: r.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], te.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : te.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, r.touchEventsDesktop = {
                            start: p[0],
                            move: p[1],
                            end: p[2]
                        }, te.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: ee.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: r.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), r.useModules(), r.params.init && r.init(), r
                }
            }
            u && (h.__proto__ = u);
            var e = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
                var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
                    for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0))
                } else
                    for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
                return n
            }, h.prototype.update = function() {
                var a = this;
                if (a && !a.destroyed) {
                    var e = a.snapGrid,
                        t = a.params;
                    t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update")
                }

                function i() {
                    var e = a.rtlTranslate ? -1 * a.translate : a.translate,
                        t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                    a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses()
                }
            }, h.prototype.changeDirection = function(a, e) {
                void 0 === e && (e = !0);
                var t = this,
                    i = t.params.direction;
                return a || (a = "horizontal" === i ? "vertical" : "horizontal"), a === i || "horizontal" !== a && "vertical" !== a || ("vertical" === i && (t.$el.removeClass(t.params.containerModifierClass + "vertical wp8-vertical").addClass("" + t.params.containerModifierClass + a), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)), "horizontal" === i && (t.$el.removeClass(t.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + t.params.containerModifierClass + a), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)), t.params.direction = a, t.slides.each(function(e, t) {
                    "vertical" === a ? t.style.width = "" : t.style.height = ""
                }), t.emit("changeDirection"), e && t.update()), t
            }, h.prototype.init = function() {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, h.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a = this,
                    i = a.params,
                    s = a.$el,
                    r = a.$wrapperEl,
                    n = a.slides;
                return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function(e) {
                    a.off(e)
                }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), ee.deleteProps(a)), a.destroyed = !0), null
            }, h.extendDefaults = function(e) {
                ee.extend(x, e)
            }, e.extendedDefaults.get = function() {
                return x
            }, e.defaults.get = function() {
                return w
            }, e.Class.get = function() {
                return u
            }, e.$.get = function() {
                return L
            }, Object.defineProperties(h, e), h
        }(n);
        var E = {
            name: "device",
            proto: {
                device: g
            },
            static: {
                device: g
            }
        };
        var S = {
            name: "support",
            proto: {
                support: te
            },
            static: {
                support: te
            }
        };
        var C = {
            name: "browser",
            proto: {
                browser: I
            },
            static: {
                browser: I
            }
        };
        var M = {
            name: "resize",
            create: function() {
                var e = this;
                ee.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    J.addEventListener("resize", this.resize.resizeHandler), J.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    J.removeEventListener("resize", this.resize.resizeHandler), J.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        };
        var z = {
            func: J.MutationObserver || J.WebkitMutationObserver,
            attach: function(e, t) {
                void 0 === t && (t = {});
                var a = this,
                    i = new z.func(function(e) {
                        if (1 !== e.length) {
                            var t = function() {
                                a.emit("observerUpdate", e[0])
                            };
                            J.requestAnimationFrame ? J.requestAnimationFrame(t) : J.setTimeout(t, 0)
                        } else a.emit("observerUpdate", e[0])
                    });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.observer.observers.push(i)
            },
            init: function() {
                var e = this;
                if (te.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        };
        var P = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                ee.extend(this, {
                    observer: {
                        init: z.init.bind(this),
                        attach: z.attach.bind(this),
                        destroy: z.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        };
        var k = {
            update: function(e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.params.virtual,
                    o = n.addSlidesBefore,
                    l = n.addSlidesAfter,
                    d = t.virtual,
                    p = d.from,
                    c = d.to,
                    u = d.slides,
                    h = d.slidesGrid,
                    v = d.renderSlide,
                    f = d.offset;
                t.updateActiveIndex();
                var m, g, b, w = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + o, b = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, b = s + l);
                var y = Math.max((w || 0) - b, 0),
                    x = Math.min((w || 0) + g, u.length - 1),
                    T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

                function E() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (ee.extend(t.virtual, {
                        from: y,
                        to: x,
                        offset: T,
                        slidesGrid: t.slidesGrid
                    }), p === y && c === x && !e) return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: T,
                    from: y,
                    to: x,
                    slides: function() {
                        for (var e = [], t = y; t <= x; t += 1) e.push(u[t]);
                        return e
                    }()
                }), void E();
                var S = [],
                    C = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var M = p; M <= c; M += 1)(M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
                for (var z = 0; z < u.length; z += 1) y <= z && z <= x && (void 0 === c || e ? C.push(z) : (c < z && C.push(z), z < p && S.push(z)));
                C.forEach(function(e) {
                    t.$wrapperEl.append(v(u[e], e))
                }), S.sort(function(e, t) {
                    return t - e
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(v(u[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(m, T + "px"), E()
            },
            renderSlide: function(e, t) {
                var a = this,
                    i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this,
                    a = t.activeIndex,
                    i = a + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                    i = a + e.length, s = e.length
                } else t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache,
                        o = {};
                    Object.keys(n).forEach(function(e) {
                        o[parseInt(e, 10) + s] = n[e]
                    }), t.virtual.cache = o
                }
                t.virtual.update(!0), t.slideTo(i, 0)
            },
            removeSlide: function(e) {
                var t = this;
                if (null != e) {
                    var a = t.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; 0 <= i; i -= 1) t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0);
                    else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
                    t.virtual.update(!0), t.slideTo(a, 0)
                }
            },
            removeAllSlides: function() {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        };
        var $ = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                var e = this;
                ee.extend(e, {
                    virtual: {
                        update: k.update.bind(e),
                        appendSlide: k.appendSlide.bind(e),
                        prependSlide: k.prependSlide.bind(e),
                        removeSlide: k.removeSlide.bind(e),
                        removeAllSlides: k.removeAllSlides.bind(e),
                        renderSlide: k.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        ee.extend(e.params, t), ee.extend(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                    }
                },
                setTranslate: function() {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        };
        var D = {
            handle: function(e) {
                var t = this,
                    a = t.rtlTranslate,
                    i = e;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var n = J.innerWidth,
                            o = J.innerHeight,
                            l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], p = 0; p < d.length; p += 1) {
                            var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                        }
                        if (!r) return
                    }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s)
                }
            },
            enable: function() {
                this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        };
        var O = {
      name: 'keyboard',
      params: {
        keyboard: {
          enabled: !1,
          onlyInViewport: !0,
        },
      },
      create: function() {
        ee.extend(this, {
          keyboard: {
            enabled: !1,
            enable: D.enable.bind(this),
            disable: D.disable.bind(this),
            handle: D.handle.bind(this),
          },
        });
      },
      on: {
        init: function() {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function() {
          this.keyboard.enabled && this.keyboard.disable();
        },
      },
    };
  var A = {
      lastScrollTime: ee.now(),
      event: -1 < J.navigator.userAgent.indexOf('firefox') ? 'DOMMouseScroll' : function() {
        var e = 'onwheel',
          t = e in f;
        if (!t) {
          var a = f.createElement('div');
          a.setAttribute(e, 'return;'), t = 'function' == typeof a[e];
        }
        return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature('', '') && (t = f.implementation.hasFeature('Events.wheel', '3.0')), t;
      }() ? 'wheel' : 'mousewheel',
      normalize: function(e) {
        var t = 0;
                    var a = 0;
                    var i = 0;
                    var s = 0;
        return 'detail' in e && (a = e.detail), 'wheelDelta' in e && (a = -e.wheelDelta / 120), 'wheelDeltaY' in e && (a = -e.wheelDeltaY / 120), 'wheelDeltaX' in e && (t = -e.wheelDeltaX / 120), 'axis' in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, 'deltaY' in e && (s = e.deltaY), 'deltaX' in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
          spinX: t,
          spinY: a,
          pixelX: i,
          pixelY: s,
        };
      },
      handleMouseEnter: function() {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function() {
        this.mouseEntered = !1;
      },
      handle: function(e) {
        var t = e;
                    var a = this;
                    var i = a.params.mousewheel;
        if (!a.mouseEntered && !i.releaseOnEdges) return !0;
        t.originalEvent && (t = t.originalEvent);
        var s = 0;
                    var r = a.rtlTranslate ? -1 : 1;
                    var n = A.normalize(t);
        if (i.forceToAxis)
          if (a.isHorizontal()) {
            if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
            s = n.pixelX * r;
          } else {
            if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
            s = n.pixelY;
          }
        else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
        if (0 === s) return !0;
        if (i.invert && (s = -s), a.params.freeMode) {
          a.params.loop && a.loopFix();
          var o = a.getTranslate() + s * i.sensitivity;
                        var l = a.isBeginning;
                        var d = a.isEnd;
          if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = ee.nextTick(function() {
            a.slideToClosest();
          }, 300)), a.emit('scroll', t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0;
        } else {
          if (60 < ee.now() - a.mousewheel.lastScrollTime)
            if (s < 0)
              if (a.isEnd && !a.params.loop || a.animating) {
                if (i.releaseOnEdges) return !0;
              } else a.slideNext(), a.emit('scroll', t);
            else if (a.isBeginning && !a.params.loop || a.animating) {
              if (i.releaseOnEdges) return !0;
            } else a.slidePrev(), a.emit('scroll', t);
          a.mousewheel.lastScrollTime = (new J.Date).getTime();
        }
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1;
      },
      enable: function() {
        var e = this;
        if (!A.event) return !1;
        if (e.mousewheel.enabled) return !1;
        var t = e.$el;
        return 'container' !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on('mouseenter', e.mousewheel.handleMouseEnter), t.on('mouseleave', e.mousewheel.handleMouseLeave), t.on(A.event, e.mousewheel.handle), e.mousewheel.enabled = !0;
      },
      disable: function() {
        var e = this;
        if (!A.event) return !1;
        if (!e.mousewheel.enabled) return !1;
        var t = e.$el;
        return 'container' !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(A.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1);
      },
    };
        var H = {
            update: function() {
                var e = this,
                    t = e.params.navigation;
                if (!e.params.loop) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            onPrevClick: function(e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function(e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function() {
                var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", a.navigation.onNextClick), t && 0 < t.length && t.on("click", a.navigation.onPrevClick), ee.extend(a.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this,
                    t = e.navigation,
                    a = t.$nextEl,
                    i = t.$prevEl;
                a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
            }
        };
        var N = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    s = e.params.pagination;
                if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var o, l, d, p = e.pagination.bullets;
                        if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function(e, t) {
                            var a = L(t),
                                i = a.index();
                            i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                        });
                        else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
                            for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
                            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                        }
                        if (s.dynamicBullets) {
                            var v = Math.min(p.length, s.dynamicMainBullets + 4),
                                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
                        var g;
                        g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var b = (r + 1) / n,
                            w = 1,
                            y = 1;
                        "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                    }
                    "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = "";
                    if ("bullets" === t.type) {
                        for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var a = this,
                    e = a.params.pagination;
                if (e.el) {
                    var t = L(e.el);
                    0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                        e.preventDefault();
                        var t = L(this).index() * a.params.slidesPerGroup;
                        a.params.loop && (t += a.loopedSlides), a.slideTo(t)
                    }), ee.extend(a.pagination, {
                        $el: t,
                        el: t[0]
                    }))
                }
            },
            destroy: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass)
                }
            }
        };
        var G = {
            setTranslate: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (te.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (te.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() {
                        o[0].style.opacity = 0, o.transition(400)
                    }, 1e3))
                }
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), ee.extend(t, {
                        trackSize: r,
                        divider: n,
                        moveDivider: o,
                        dragSize: s
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            setDragPosition: function(e) {
                var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    o = i.trackSize;
                t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    a = this.$wrapperEl,
                    i = t.$el,
                    s = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = ee.nextTick(function() {
                    i.css("opacity", 0), i.transition(400)
                }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEventsTouch,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    te.touch ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.touchEventsTouch,
                        i = e.touchEventsDesktop,
                        s = e.params,
                        r = t.$el[0],
                        n = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        o = !(!te.passiveListener || !s.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    te.touch ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
                }
            },
            init: function() {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = L(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), ee.extend(t, {
                        $el: s,
                        el: s[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && t.enableDraggable()
                }
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        };
        var B = {
            setTransform: function(e, t) {
                var a = this.rtl,
                    i = L(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    o = i.attr("data-swiper-parallax-y"),
                    l = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity");
                if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else {
                    var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function() {
                var i = this,
                    e = i.$el,
                    t = i.slides,
                    s = i.progress,
                    r = i.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    i.parallax.setTransform(t, s)
                }), t.each(function(e, t) {
                    var a = t.progress;
                    1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                        i.parallax.setTransform(t, a)
                    })
                })
            },
            setTransition: function(s) {
                void 0 === s && (s = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    var a = L(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                    0 === s && (i = 0), a.transition(i)
                })
            }
        };
        var X = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function(e) {
                var t = this,
                    a = t.params.zoom,
                    i = t.zoom,
                    s = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !te.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, s.scaleStart = X.getDistanceBetweenTouches(e)
                }
                s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!te.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    a.fakeGestureMoved = !0, i.scaleMove = X.getDistanceBetweenTouches(e)
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = te.gestures ? e.scale * a.currentScale : i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    a = this.zoom,
                    i = a.gesture;
                if (!te.gestures) {
                    if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android) return;
                    a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
                }
                i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.zoom,
                    a = t.gesture,
                    i = t.image;
                a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (g.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = ee.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = ee.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var n = s.width * a.scale,
                        o = s.height * a.scale;
                    if (!(n < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1;
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        o = a.currentX + n,
                        l = i.y * r,
                        d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = o, a.currentY = d;
                    var c = a.width * e.scale,
                        u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this,
                    b = g.zoom,
                    w = g.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, a = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function() {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e = this,
                    t = e.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    te.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            },
            disable: function() {
                var e = this,
                    t = e.zoom;
                if (t.enabled) {
                    e.zoom.enabled = !1;
                    var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    te.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }
        };
        var Y = {
            loadInSlide: function(e, l) {
                void 0 === l && (l = !0);
                var d = this,
                    p = d.params.lazy;
                if (void 0 !== e && 0 !== d.slides.length) {
                    var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                        t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                    !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function(e, t) {
                        var i = L(t);
                        i.addClass(p.loadingClass);
                        var s = i.attr("data-background"),
                            r = i.attr("data-src"),
                            n = i.attr("data-srcset"),
                            o = i.attr("data-sizes");
                        d.loadImage(i[0], r || s, n, o, !1, function() {
                            if (null != d && d && (!d || d.params) && !d.destroyed) {
                                if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                                    var e = c.attr("data-swiper-slide-index");
                                    if (c.hasClass(d.params.slideDuplicateClass)) {
                                        var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                        d.lazy.loadInSlide(t.index(), !1)
                                    } else {
                                        var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        d.lazy.loadInSlide(a.index(), !1)
                                    }
                                }
                                d.emit("lazyImageReady", c[0], i[0])
                            }
                        }), d.emit("lazyImageLoad", c[0], i[0])
                    })
                }
            },
            load: function() {
                var i = this,
                    t = i.$wrapperEl,
                    a = i.params,
                    s = i.slides,
                    e = i.activeIndex,
                    r = i.virtual && a.virtual.enabled,
                    n = a.lazy,
                    o = a.slidesPerView;

                function l(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (s[e]) return !0;
                    return !1
                }

                function d(e) {
                    return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
                }
                if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function(e, t) {
                    var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                    i.lazy.loadInSlide(a)
                });
                else if (1 < o)
                    for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p);
                else i.lazy.loadInSlide(e);
                if (n.loadPrevNext)
                    if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f);
                        for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m)
                    } else {
                        var g = t.children("." + a.slideNextClass);
                        0 < g.length && i.lazy.loadInSlide(d(g));
                        var b = t.children("." + a.slidePrevClass);
                        0 < b.length && i.lazy.loadInSlide(d(b))
                    }
            }
        };
        var V = {
            LinearSpline: function(e, t) {
                var a, i, s, r, n, o = function(e, t) {
                    for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var a, i, s = this,
                    r = s.controller.control;

                function n(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof T && n(r[o]);
                else r instanceof T && t !== r && n(r)
            },
            setTransition: function(t, e) {
                var a, i = this,
                    s = i.controller.control;

                function r(e) {
                    e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && ee.nextTick(function() {
                        e.updateAutoHeight()
                    }), e.$wrapperEl.transitionEnd(function() {
                        s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd())
                    }))
                }
                if (Array.isArray(s))
                    for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof T && r(s[a]);
                else s instanceof T && e !== s && r(s)
            }
        };
        var F = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this,
                    a = t.params.a11y;
                if (13 === e.keyCode) {
                    var i = L(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
                }
            },
            updatePagination: function() {
                var i = this,
                    s = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e, t) {
                    var a = L(t);
                    i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                })
            },
            init: function() {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, a, i = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t, a = this;
                a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
            }
        };
        var R = {
            init: function() {
                var e = this;
                if (e.params.history) {
                    if (!J.history || !J.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var t = e.history;
                    t.initialized = !0, t.paths = R.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || J.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function() {
                this.params.history.replaceState || J.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                this.history.paths = R.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function() {
                var e = J.location.pathname.slice(1).split("/").filter(function(e) {
                        return "" !== e
                    }),
                    t = e.length;
                return {
                    key: e[t - 2],
                    value: e[t - 1]
                }
            },
            setHistory: function(e, t) {
                if (this.history.initialized && this.params.history.enabled) {
                    var a = this.slides.eq(t),
                        i = R.slugify(a.attr("data-history"));
                    J.location.pathname.includes(e) || (i = e + "/" + i);
                    var s = J.history.state;
                    s && s.value === i || (this.params.history.replaceState ? J.history.replaceState({
                        value: i
                    }, null, i) : J.history.pushState({
                        value: i
                    }, null, i))
                }
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (R.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var o = n.index();
                            i.slideTo(o, e, a)
                        }
                    } else i.slideTo(0, e, a)
            }
        };
        var q = {
            onHashCange: function() {
                var e = this,
                    t = f.location.hash.replace("#", "");
                if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === a) return;
                    e.slideTo(a)
                }
            },
            setHash: function() {
                var e = this;
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && J.history && J.history.replaceState) J.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else {
                        var t = e.slides.eq(e.activeIndex),
                            a = t.attr("data-hash") || t.attr("data-history");
                        f.location.hash = a || ""
                    }
            },
            init: function() {
                var e = this;
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var t = f.location.hash.replace("#", "");
                    if (t)
                        for (var a = 0, i = e.slides.length; a < i; a += 1) {
                            var s = e.slides.eq(a);
                            if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                                var r = s.index();
                                e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && L(J).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                this.params.hashNavigation.watchState && L(J).off("hashchange", this.hashNavigation.onHashCange)
            }
        };
        var W = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = ee.nextTick(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }, a)
            },
            start: function() {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function() {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        };
        var j = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s, s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var a = this,
                    t = a.slides,
                    i = a.$wrapperEl;
                if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    t.transitionEnd(function() {
                        if (!s && a && !a.destroyed) {
                            s = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t])
                        }
                    })
                }
            }
        };
        var U = {
            setTranslate: function() {
                var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.params.cubeEffect,
                    p = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e)));
                for (var h = 0; h < s.length; h += 1) {
                    var v = s.eq(h),
                        f = h;
                    c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && (m = -m, g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
                    var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
                        var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), d.shadow)
                    if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            z = d.shadowScale,
                            P = d.shadowScale / M,
                            k = d.shadowOffset;
                        e.transform("scale3d(" + z + ", 1, " + P + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / P + "px) rotateX(-90deg)")
                    }
                var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        };
        var K = {
            setTranslate: function() {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function(e) {
                var a = this,
                    t = a.slides,
                    i = a.activeIndex,
                    s = a.$wrapperEl;
                if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    t.eq(i).transitionEnd(function() {
                        if (!r && a && !a.destroyed) {
                            r = !0, a.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t])
                        }
                    })
                }
            }
        };
        var _ = {
            setTranslate: function() {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                    var v = i.eq(u),
                        f = r[u],
                        m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
                        g = o ? p * m : 0,
                        b = o ? 0 : p * m,
                        w = -c * Math.abs(m),
                        y = o ? 0 : n.stretch * m,
                        x = o ? n.stretch * m : 0;
                    Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
                    var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                    if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
                        var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                    }
                }(te.pointerEvents || te.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        };
        var Z = {
            init: function() {
                var e = this,
                    t = e.params.thumbs,
                    a = e.constructor;
                t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, ee.extend(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), ee.extend(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : ee.isObject(t.swiper) && (e.thumbs.swiper = new a(ee.extend({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
            },
            onThumbClick: function() {
                var e = this,
                    t = e.thumbs.swiper;
                if (t) {
                    var a = t.clickedIndex,
                        i = t.clickedSlide;
                    if (!(i && L(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                        var s;
                        if (s = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
                            var r = e.activeIndex;
                            e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
                            var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                                o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                        }
                        e.slideTo(s)
                    }
                }
            },
            update: function(e) {
                var t = this,
                    a = t.thumbs.swiper;
                if (a) {
                    var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
                    if (t.realIndex !== a.realIndex) {
                        var s, r = a.activeIndex;
                        if (a.params.loop) {
                            a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, r = a.activeIndex);
                            var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r == r - n ? r : o - r < r - n ? o : n
                        } else s = t.realIndex;
                        a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1), a.slideTo(s, e ? 0 : void 0))
                    }
                    var l = 1,
                        d = t.params.thumbs.slideThumbActiveClass;
                    if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), a.slides.removeClass(d), a.params.loop)
                        for (var p = 0; p < l; p += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
                    else
                        for (var c = 0; c < l; c += 1) a.slides.eq(t.realIndex + c).addClass(d)
                }
            }
        };
        var Q = [E, S, C, M, P, $, O, {
      name: 'mousewheel',
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: 'container'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          mousewheel: {
            enabled: !1,
            enable: A.enable.bind(e),
            disable: A.disable.bind(e),
            handle: A.handle.bind(e),
            handleMouseEnter: A.handleMouseEnter.bind(e),
            handleMouseLeave: A.handleMouseLeave.bind(e),
            lastScrollTime: ee.now(),
          },
        });
      },
      on: {
        init: function() {
          this.params.mousewheel.enabled && this.mousewheel.enable();
        },
        destroy: function() {
          this.mousewheel.enabled && this.mousewheel.disable();
        },
      },
    }, {
      name: 'navigation',
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          navigation: {
            init: H.init.bind(e),
            update: H.update.bind(e),
            destroy: H.destroy.bind(e),
            onNextClick: H.onNextClick.bind(e),
            onPrevClick: H.onPrevClick.bind(e),
          },
        });
      },
      on: {
        init: function() {
          this.navigation.init(), this.navigation.update();
        },
        toEdge: function() {
          this.navigation.update();
        },
        fromEdge: function() {
          this.navigation.update();
        },
        destroy: function() {
          this.navigation.destroy();
        },
        click: function(e) {
          var t; var a = this;
                        var i = a.navigation;
                        var s = i.$nextEl;
                        var r = i.$prevEl;
          !a.params.navigation.hideOnClick || L(e.target).is(r) || L(e.target).is(s) || (s ? t = s.hasClass(a.params.navigation.hiddenClass) : r && (t = r.hasClass(a.params.navigation.hiddenClass)), !0 === t ? a.emit('navigationShow', a) : a.emit('navigationHide', a), s && s.toggleClass(a.params.navigation.hiddenClass), r && r.toggleClass(a.params.navigation.hiddenClass));
        },
      },
    }, {
      name: 'pagination',
      params: {
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: 'bullets',
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: function(e) {
            return e;
          },
          formatFractionTotal: function(e) {
            return e;
          },
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          modifierClass: 'swiper-pagination-',
          currentClass: 'swiper-pagination-current',
          totalClass: 'swiper-pagination-total',
          hiddenClass: 'swiper-pagination-hidden',
          progressbarFillClass: 'swiper-pagination-progressbar-fill',
          progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
          clickableClass: 'swiper-pagination-clickable',
          lockClass: 'swiper-pagination-lock'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          pagination: {
            init: N.init.bind(e),
            render: N.render.bind(e),
            update: N.update.bind(e),
            destroy: N.destroy.bind(e),
            dynamicBulletIndex: 0,
          },
        });
      },
      on: {
        init: function() {
          this.pagination.init(), this.pagination.render(), this.pagination.update();
        },
        activeIndexChange: function() {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update();
        },
        snapIndexChange: function() {
          this.params.loop || this.pagination.update();
        },
        slidesLengthChange: function() {
          this.params.loop && (this.pagination.render(), this.pagination.update());
        },
        snapGridLengthChange: function() {
          this.params.loop || (this.pagination.render(), this.pagination.update());
        },
        destroy: function() {
          this.pagination.destroy();
        },
        click: function(e) {
          var t = this;
          t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit('paginationShow', t) : t.emit('paginationHide', t), t.pagination.$el.toggleClass(t.params.pagination.hiddenClass));
        },
      },
    }, {
      name: 'scrollbar',
      params: {
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          scrollbar: {
            init: G.init.bind(e),
            destroy: G.destroy.bind(e),
            updateSize: G.updateSize.bind(e),
            setTranslate: G.setTranslate.bind(e),
            setTransition: G.setTransition.bind(e),
            enableDraggable: G.enableDraggable.bind(e),
            disableDraggable: G.disableDraggable.bind(e),
            setDragPosition: G.setDragPosition.bind(e),
            onDragStart: G.onDragStart.bind(e),
            onDragMove: G.onDragMove.bind(e),
            onDragEnd: G.onDragEnd.bind(e),
            isTouched: !1,
            timeout: null,
            dragTimeout: null,
          },
        });
      },
      on: {
        init: function() {
          this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
        },
        update: function() {
          this.scrollbar.updateSize();
        },
        resize: function() {
          this.scrollbar.updateSize();
        },
        observerUpdate: function() {
          this.scrollbar.updateSize();
        },
        setTranslate: function() {
          this.scrollbar.setTranslate();
        },
        setTransition: function(e) {
          this.scrollbar.setTransition(e);
        },
        destroy: function() {
          this.scrollbar.destroy();
        },
      },
    }, {
      name: 'parallax',
      params: {
        parallax: {
          enabled: !1,
        },
      },
      create: function() {
        ee.extend(this, {
          parallax: {
            setTransform: B.setTransform.bind(this),
            setTranslate: B.setTranslate.bind(this),
            setTransition: B.setTransition.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
        },
        init: function() {
          this.params.parallax.enabled && this.parallax.setTranslate();
        },
        setTranslate: function() {
          this.params.parallax.enabled && this.parallax.setTranslate();
        },
        setTransition: function(e) {
          this.params.parallax.enabled && this.parallax.setTransition(e);
        },
      },
    }, {
      name: 'zoom',
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed'
        },
      },
      create: function() {
        var i = this;
                    var t = {
            enabled: !1,
            scale: 1,
            currentScale: 1,
            isScaling: !1,
            gesture: {
              $slideEl: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              $imageEl: void 0,
              $imageWrapEl: void 0,
              maxRatio: 3,
            },
            image: {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {},
            },
            velocity: {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0,
            },
          };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(' ').forEach(function(e) {
          t[e] = X[e].bind(i);
        }), ee.extend(i, {
          zoom: t,
        });
        var s = 1;
        Object.defineProperty(i.zoom, 'scale', {
          get: function() {
            return s;
          },
          set: function(e) {
            if (s !== e) {
              var t = i.zoom.gesture.$imageEl ? i.zoom.gesture.$imageEl[0] : void 0;
                                var a = i.zoom.gesture.$slideEl ? i.zoom.gesture.$slideEl[0] : void 0;
              i.emit('zoomChange', e, t, a);
            }
            s = e;
          },
        });
      },
      on: {
        init: function() {
          this.params.zoom.enabled && this.zoom.enable();
        },
        destroy: function() {
          this.zoom.disable();
        },
        touchStart: function(e) {
          this.zoom.enabled && this.zoom.onTouchStart(e);
        },
        touchEnd: function(e) {
          this.zoom.enabled && this.zoom.onTouchEnd(e);
        },
        doubleTap: function(e) {
          this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
        },
        transitionEnd: function() {
          this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
        },
      },
    }, {
      name: 'lazy',
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader'
        },
      },
      create: function() {
        ee.extend(this, {
          lazy: {
            initialImageLoaded: !1,
            load: Y.load.bind(this),
            loadInSlide: Y.loadInSlide.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
        },
        init: function() {
          this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
        },
        scroll: function() {
          this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
        },
        resize: function() {
          this.params.lazy.enabled && this.lazy.load();
        },
        scrollbarDragMove: function() {
          this.params.lazy.enabled && this.lazy.load();
        },
        transitionStart: function() {
          var e = this;
          e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load();
        },
        transitionEnd: function() {
          this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
        },
      },
    }, {
      name: 'controller',
      params: {
        controller: {
          control: void 0,
          inverse: !1,
          by: 'slide'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          controller: {
            control: e.params.controller.control,
            getInterpolateFunction: V.getInterpolateFunction.bind(e),
            setTranslate: V.setTranslate.bind(e),
            setTransition: V.setTransition.bind(e),
          },
        });
      },
      on: {
        update: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        resize: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        observerUpdate: function() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        setTranslate: function(e, t) {
          this.controller.control && this.controller.setTranslate(e, t);
        },
        setTransition: function(e, t) {
          this.controller.control && this.controller.setTransition(e, t);
        },
      },
    }, {
      name: 'a11y',
      params: {
        a11y: {
          enabled: !0,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}'
        },
      },
      create: function() {
        var t = this;
        ee.extend(t, {
          a11y: {
            liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
          },
        }), Object.keys(F).forEach(function(e) {
          t.a11y[e] = F[e].bind(t);
        });
      },
      on: {
        init: function() {
          this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
        },
        toEdge: function() {
          this.params.a11y.enabled && this.a11y.updateNavigation();
        },
        fromEdge: function() {
          this.params.a11y.enabled && this.a11y.updateNavigation();
        },
        paginationUpdate: function() {
          this.params.a11y.enabled && this.a11y.updatePagination();
        },
        destroy: function() {
          this.params.a11y.enabled && this.a11y.destroy();
        },
      },
    }, {
      name: 'history',
      params: {
        history: {
          enabled: !1,
          replaceState: !1,
          key: 'slides'
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          history: {
            init: R.init.bind(e),
            setHistory: R.setHistory.bind(e),
            setHistoryPopState: R.setHistoryPopState.bind(e),
            scrollToSlide: R.scrollToSlide.bind(e),
            destroy: R.destroy.bind(e),
          },
        });
      },
      on: {
        init: function() {
          this.params.history.enabled && this.history.init();
        },
        destroy: function() {
          this.params.history.enabled && this.history.destroy();
        },
        transitionEnd: function() {
          this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
        },
      },
    }, {
      name: 'hash-navigation',
      params: {
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1,
        },
      },
      create: function() {
        var e = this;
        ee.extend(e, {
          hashNavigation: {
            initialized: !1,
            init: q.init.bind(e),
            destroy: q.destroy.bind(e),
            setHash: q.setHash.bind(e),
            onHashCange: q.onHashCange.bind(e),
          },
        });
      },
      on: {
        init: function() {
          this.params.hashNavigation.enabled && this.hashNavigation.init();
        },
        destroy: function() {
          this.params.hashNavigation.enabled && this.hashNavigation.destroy();
        },
        transitionEnd: function() {
          this.hashNavigation.initialized && this.hashNavigation.setHash();
        },
      },
    }, {
      name: 'autoplay',
      params: {
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
        },
      },
      create: function() {
        var t = this;
        ee.extend(t, {
          autoplay: {
            running: !1,
            paused: !1,
            run: W.run.bind(t),
            start: W.start.bind(t),
            stop: W.stop.bind(t),
            pause: W.pause.bind(t),
            onTransitionEnd: function(e) {
              t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener('transitionend', t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener('webkitTransitionEnd', t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
            },
          },
        });
      },
      on: {
        init: function() {
          this.params.autoplay.enabled && this.autoplay.start();
        },
        beforeTransitionStart: function(e, t) {
          this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
        },
        sliderFirstMove: function() {
          this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
        },
        destroy: function() {
          this.autoplay.running && this.autoplay.stop();
        },
      },
    }, {
      name: 'effect-fade',
      params: {
        fadeEffect: {
          crossFade: !1,
        },
      },
      create: function() {
        ee.extend(this, {
          fadeEffect: {
            setTranslate: j.setTranslate.bind(this),
            setTransition: j.setTransition.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ('fade' === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + 'fade');
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0,
            };
            ee.extend(e.params, t), ee.extend(e.originalParams, t);
          }
        },
        setTranslate: function() {
          "fade" === this.params.effect && this.fadeEffect.setTranslate();
        },
        setTransition: function(e) {
          "fade" === this.params.effect && this.fadeEffect.setTransition(e);
        },
      },
    }, {
      name: 'effect-cube',
      params: {
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: .94,
        },
      },
      create: function() {
        ee.extend(this, {
          cubeEffect: {
            setTranslate: U.setTranslate.bind(this),
            setTransition: U.setTransition.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ('cube' === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + 'cube'), e.classNames.push(e.params.containerModifierClass + '3d');
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0,
            };
            ee.extend(e.params, t), ee.extend(e.originalParams, t);
          }
        },
        setTranslate: function() {
          "cube" === this.params.effect && this.cubeEffect.setTranslate();
        },
        setTransition: function(e) {
          "cube" === this.params.effect && this.cubeEffect.setTransition(e);
        },
      },
    }, {
      name: 'effect-flip',
      params: {
        flipEffect: {
          slideShadows: !0,
          limitRotation: !0,
        },
      },
      create: function() {
        ee.extend(this, {
          flipEffect: {
            setTranslate: K.setTranslate.bind(this),
            setTransition: K.setTransition.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          var e = this;
          if ('flip' === e.params.effect) {
            e.classNames.push(e.params.containerModifierClass + 'flip'), e.classNames.push(e.params.containerModifierClass + '3d');
            var t = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0,
            };
            ee.extend(e.params, t), ee.extend(e.originalParams, t);
          }
        },
        setTranslate: function() {
          "flip" === this.params.effect && this.flipEffect.setTranslate();
        },
        setTransition: function(e) {
          "flip" === this.params.effect && this.flipEffect.setTransition(e);
        },
      },
    }, {
      name: 'effect-coverflow',
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0,
        },
      },
      create: function() {
        ee.extend(this, {
          coverflowEffect: {
            setTranslate: _.setTranslate.bind(this),
            setTransition: _.setTransition.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          var e = this;
          "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + 'coverflow'), e.classNames.push(e.params.containerModifierClass + '3d'), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0);
        },
        setTranslate: function() {
          "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
        },
        setTransition: function(e) {
          "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
        },
      },
    }, {
      name: 'thumbs',
      params: {
        thumbs: {
          swiper: null,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-container-thumbs'
        },
      },
      create: function() {
        ee.extend(this, {
          thumbs: {
            swiper: null,
            init: Z.init.bind(this),
            update: Z.update.bind(this),
            onThumbClick: Z.onThumbClick.bind(this),
          },
        });
      },
      on: {
        beforeInit: function() {
          var e = this.params.thumbs;
          e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
        },
        slideChange: function() {
          this.thumbs.swiper && this.thumbs.update();
        },
        update: function() {
          this.thumbs.swiper && this.thumbs.update();
        },
        resize: function() {
          this.thumbs.swiper && this.thumbs.update();
        },
        observerUpdate: function() {
          this.thumbs.swiper && this.thumbs.update();
        },
        setTransition: function(e) {
          var t = this.thumbs.swiper;
          t && t.setTransition(e);
        },
        beforeDestroy: function() {
          var e = this.thumbs.swiper;
          e && this.thumbs.swiperCreated && e && e.destroy();
        },
      },
    }];
  return void 0 === T.use && (T.use = T.Class.use, T.installModule = T.Class.installModule), T.use(Q), T;
});
// # sourceMappingURL=swiper.min.js.map
