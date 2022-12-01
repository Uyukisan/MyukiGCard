;
/**
 * author: stack dev
 * github: https://github.com/Uyukisan
 * blog: https://stackblog.cf
 */
(function(window) {
	"use strict";

	var defaultSetting = {
		icon: "https://stackblog.cf/img/avatar.jpg",
		name: "Stack Dev",
		info: "",
		z_index: 9999,
		blur: ".container",
		lang: "zh-CN",
		mini: true,
		darkmode: 1,
		maxWidth: "480px",
		fontFamily: "",
		hitokoto: {
			"enable": false,
			"cats": [],
			"color": "#70a1ff",
			"offline": "我是一条格言"
		},
		links: [{
			"title": "My Blog",
			"url": "https://stackblog.cf/",
			"type": "primary"
		}, {
			"title": "My GitHub",
			"url": "https://github.com/Uyukisan"
		}, {
			"title": "My jq22",
			"url": "https://www.jq22.com/mem1320295"
		}]
	};
	var i18n = new Map([
		["zh-CN", {
			"close": "关闭窗口"
		}],
		["zh-TW", {
			"close": "關閉窗口"
		}],
		["en-US", {
			"close": "Ignore it"
		}]
	]);
	var darkmode = [0, 1, 2, 3];
	Object.freeze(defaultSetting);
	var MyukiGCard = function(option, undefined) {
		return new MyukiGCard.fn.init(option, undefined);
	};
	MyukiGCard.prototype = MyukiGCard.fn = {
		constructor: MyukiGCard,

		init: function(option, undefined) {
			let _this = this;
			_this.help();
			_this._setting = extend({}, defaultSetting, option);
			let myukiGCard = document.createElement("div");
			addClass("myuki-gcard_mask", myukiGCard);
			myukiGCard.style.zIndex = parseInt(_this._setting.z_index);
			let cardBox = document.createElement("div");
			addClass("myuki-gcard_box", cardBox);
			_this._setting.fontFamily != "" ? cardBox.style.fontFamily = _this._setting.fontFamily : "";
			cardBox.style.maxWidth = _this._setting.maxWidth;
			let cardIcon = document.createElement("div");
			addClass("myuki-gcard_icon", cardIcon);
			let img = document.createElement("img");
			img.setAttribute("src", _this._setting.icon);
			img.setAttribute("alt", _this._setting.name);
			cardIcon.appendChild(img);
			cardBox.appendChild(cardIcon);
			let cardName = document.createElement("div");
			addClass("myuki-gcard_title", cardName);
			cardName.innerText = _this._setting.name;
			cardBox.appendChild(cardName);
			let cardInfo = document.createElement("div");
			addClass("myuki-gcard_info", cardInfo);
			if (_this._setting.info != "") {
				let p = document.createElement("p");
				p.innerText = _this._setting.info;
				cardInfo.appendChild(p);
			}
			// 添加一言API，不兼容IE
			if (_this._setting.hitokoto.enable == true) {
				let hitokoto = {};
				let catStr = _this._setting.hitokoto.cats ? _this._setting.hitokoto.cats.map(c => "c=" + c)
					.join("&") : defaultSetting.hitokoto.cats.map(c => "c=" + c).join("&");
				fetch('https://v1.hitokoto.cn/?' + catStr)
					.then((res) => res.json()).then((data) => {
						hitokoto.text = data.hitokoto;
						hitokoto.uuid = data.uuid;
					})
					.catch((err) => {
						console.error("一言API请求错误：" + err);
						hitokoto.text = _this._setting.hitokoto.offline ? _this._setting.hitokoto
							.offline :
							defaultSetting.hitokoto.offline;
					})
					.finally(() => {
						hitokoto.text = `「${hitokoto.text}」`;
						let p = document.createElement("p");
						let a = document.createElement("a");
						a.setAttribute("target", "_blank");
						a.innerText = hitokoto.text;
						a.setAttribute("href", `https://hitokoto.cn?uuid=${hitokoto.uuid}`);
						p.appendChild(a);
						p.setAttribute("class", "myuki-gcard_hitokoto");
						p.style.color = _this._setting.hitokoto.color ? _this._setting.hitokoto.color :
							defaultSetting.hitokoto.color;
						cardInfo.appendChild(p);
					});

			}
			cardBox.appendChild(cardInfo);
			let cardBtnList = document.createElement("div");
			addClass("myuki-gcard_btn-list", cardBtnList);
			let links = _this._setting.links;
			for (let i = 0; i < links.length; i++) {
				let btn = document.createElement("a");
				addClass("myuki-gcard_btn", btn);
				links[i].type ? addClass("btn-" + links[i].type, btn) : addClass("btn-default", btn);
				links[i].type ? btn.setAttribute("btn-type", links[i].type) : btn.setAttribute("btn-type",
					"btn-default");
				links[i].target ? btn.setAttribute("target", links[i].target) : "";
				btn.setAttribute("href", links[i].url);
				btn.innerText = links[i].title;
				cardBtnList.appendChild(btn);
			}
			let closeBtn = document.createElement("a");
			addClass("myuki-gcard_btn", closeBtn);
			addClass("btn-close", closeBtn);
			closeBtn.setAttribute("href", "javascript: void (0);");
			closeBtn.setAttribute("id", "myuki-gcard_close");
			closeBtn.setAttribute("btn-type", "btn-close");
			let lang = i18n.get(_this._setting.lang) ? _this._setting.lang : document.documentElement
				.lang !=
				"" ? document.documentElement.lang : defaultSetting.lang;
			closeBtn.innerText = i18n.get(lang) ? i18n.get(lang).close : i18n.get(defaultSetting.lang)
				.close;
			closeBtn.addEventListener("click", function() {
				_this.close();
			});
			cardBtnList.appendChild(closeBtn);
			cardBox.appendChild(cardBtnList);
			// darkmode
			let dmode = darkmode.includes(_this._setting.darkmode) ? _this._setting.darkmode :
				defaultSetting
				.darkmode;
			switch (dmode) {
				case 0:
					removeClass("darkmode", cardBox);
					break;
				case 1:
					window.matchMedia("(prefers-color-scheme: dark)").matches ? addClass("darkmode",
						cardBox) : "";
					break;
				case 2:
					let hour = new Date().getHours();
					hour < 6 || hour >= 18 ? addClass("darkmode", cardBox) : "";
					break;
				case 3:
					addClass("darkmode", cardBox);
				default:
					break;

			}
			myukiGCard.appendChild(cardBox);
			document.body.appendChild(myukiGCard);
			if (_this._setting.mini == true) {
				let cardMini = document.createElement("div");
				addClass("myuki-gcard_mini", cardMini);
				let miniImg = document.createElement("img");
				miniImg.setAttribute("src", _this._setting.icon);
				cardMini.appendChild(miniImg);
				cardMini.style.zIndex = _this._setting.z_index;
				cardMini.addEventListener("click", function() {
					_this.open(() => {
						removeClass("shown", cardMini);
					});
				});
				document.body.appendChild(cardMini);
			}
			let container = document.querySelectorAll(_this._setting.blur)[0];
			if (container != undefined) {
				addClass("blur", container);
			}

			this._GCard = myukiGCard;
			return this;
		},

		getSetting: function() {
			return this._setting;
		},

		close: function(closecallback) {
			if (!this._closed) {
				this._closed = true;
			} else {
				console.warn("MyukiGCard closed.");
				return;
			}
			let GCard = this._GCard;
			let cardBox = GCard.querySelectorAll(".myuki-gcard_box")[0];

			cardBox.addEventListener("animationend", cfun);
			// cardBox.removeEventListener("animationend", cfun);

			addClass("closed", cardBox);
			if (typeof closecallback == "function") {
				closecallback();
			}
			let _this = this;

			function cfun() {
				addClass("hidden", GCard);
				let container = document.querySelectorAll(_this._setting.blur)[0];
				let cardMini = document.querySelectorAll(".myuki-gcard_mini")[0];
				if (container != undefined) {
					removeClass("blur", container);
				}
				cardMini != undefined ? addClass("shown", cardMini) : "";
				cardBox.removeEventListener("animationend", cfun);
			}
		},

		open: function(opencallback) {
			if (this._closed) {
				this._closed = false;
			} else {
				console.warn("MyukiGCard opened.");
				return;
			}
			let GCard = this._GCard;
			let cardBox = GCard.querySelectorAll(".myuki-gcard_box")[0];
			removeClass("hidden", GCard);

			removeClass("closed", cardBox);
			let container = document.querySelectorAll(this._setting.blur)[0];
			if (container != undefined) {
				addClass("blur", container);
			}
			if (typeof opencallback == "function") {
				opencallback();
			}
		},

		help: function() {
			console.info("⛄️欢迎使用MyukiGCard:", {
				"author": "Stack Dev",
				"github": "https://github.com/Uyukisan",
				"usage": "https://github.com/Uyukisan/MyukiGCard",
				"preview": "https://uyukisan.github.io/MyukiGCard/"
			});
			return {
				"author": "Stack Dev",
				"github": "https://github.com/Uyukisan",
				"usage": "https://github.com/Uyukisan/MyukiGCard",
				"preview": "https://uyukisan.github.io/MyukiGCard/"
			};
		}
	}

	function extend() {
		var length = arguments.length;
		var target = arguments[0] || {};
		if (typeof target != "object" && typeof target != "function") {
			target = {};
		}
		if (length == 1) {
			target = _this;
			i--;
		}
		for (var i = 1; i < length; i++) {
			var source = arguments[i];
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	}

	function hasClass(cla, element) {
		if (element.className.trim().length === 0) return false;
		let allClass = element.className.trim().split(" ");
		return allClass.indexOf(cla) > -1;
	}

	function addClass(cla, element) {
		if (!hasClass(cla, element)) {
			if (element.setAttribute) {
				let newClass = element.getAttribute("class") ? element.getAttribute("class") + " " + cla : cla;
				element.setAttribute("class", newClass);
			} else {
				element.className = element.className + " " + cla;
			}

		}
	}

	function removeClass(cla, element) {
		let classList = element.getAttribute("class").split(" ");
		for (let i = 0; i < classList.length; i++) {
			if (classList[i] == cla) {
				classList.splice(i, 1);
			}
		}

		element.setAttribute("class", classList.join(" "));

	}


	MyukiGCard.fn.init.prototype = MyukiGCard.fn;
	window.MyukiGCard = MyukiGCard;
	window.$MGC = MyukiGCard;
	return this;
})(window);
