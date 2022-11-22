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
		info: "欢迎使用Myuki Guidance Card",
		z_index: 9999,
		blur: ".container",
		links: [{
			"title": "My Blog",
			"url": "https://stackblog.cf/",
			"type": "primary"
		}, {
			"title": "My GitHub",
			"url": "http://github.com/Uyukisan"
		}, {
			"title": "My jq22",
			"url": "https://www.jq22.com/mem1320295"
		}]
	};
	Object.freeze(defaultSetting);
	var MyukiGCard = function(option, undefined) {
		return new MyukiGCard.fn.init(option, undefined);
	};
	MyukiGCard.prototype = MyukiGCard.fn = {
		constructor: MyukiGCard,

		init: function(option, undefined) {
			this.help();
			this._setting = extend({}, defaultSetting, option);
			let myukiGCard = document.createElement("div");
			addClass("myuki-gcard_mask", myukiGCard);
			myukiGCard.style.zIndex = parseInt(this._setting.z_index);
			let cardBox = document.createElement("div");
			addClass("myuki-gcard_box", cardBox);
			let cardIcon = document.createElement("div");
			addClass("myuki-gcard_icon", cardIcon);
			let img = document.createElement("img");
			img.setAttribute("src", this._setting.icon);
			img.setAttribute("alt", this._setting.name);
			cardIcon.appendChild(img);
			cardBox.appendChild(cardIcon);
			let cardName = document.createElement("div");
			addClass("myuki-gcard_title", cardName);
			cardName.innerText = this._setting.name;
			cardBox.appendChild(cardName);
			let cardInfo = document.createElement("div");
			addClass("myuki-gcard_info", cardInfo);
			let p = document.createElement("p");
			p.innerText = this._setting.info;
			cardInfo.appendChild(p);
			cardBox.appendChild(cardInfo);
			let cardBtnList = document.createElement("div");
			addClass("myuki-gcard_btn-list", cardBtnList);
			let links = this._setting.links;
			for (let i = 0; i < links.length; i++) {
				let btn = document.createElement("a");
				addClass("myuki-gcard_btn", btn);
				links[i].type ? addClass("btn-"+links[i].type, btn) : addClass("btn-default", btn);
				links[i].type ? btn.setAttribute("btn-type", links[i].type) : btn.setAttribute("btn-type", "btn-default");
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
			closeBtn.innerText = "关闭窗口";
			let _this = this;
			closeBtn.addEventListener("click",function(){
				_this.close();
			});
			cardBtnList.appendChild(closeBtn);
			cardBox.appendChild(cardBtnList);
			myukiGCard.appendChild(cardBox);
			document.body.appendChild(myukiGCard);
			let cardMini = document.createElement("div");
			addClass("myuki-gcard_mini", cardMini);
			let miniImg = document.createElement("img");
			miniImg.setAttribute("src", this._setting.icon);
			cardMini.appendChild(miniImg);
			cardMini.style.zIndex = this._setting.z_index;
			cardMini.addEventListener("click",function(){
				_this.open(()=>{
					removeClass("shown", cardMini);
				});
			});
			document.body.appendChild(cardMini);
			let container = document.querySelectorAll(this._setting.blur)[0];
			if(container != undefined){
				addClass("blur", container);
			}

			this._GCard = myukiGCard;
			return this;
		},

		getSetting: function() {
			return this._setting;
		},

		close: function(closecallback) {
			if(!this._closed){
				this._closed = true;
			}else{
				console.log("Myuki Guidance has been closed.");
				return;
			}
			let GCard = this._GCard;
			let cardBox = GCard.querySelectorAll(".myuki-gcard_box")[0];
			
			cardBox.addEventListener("animationend", cfun);
			// cardBox.removeEventListener("animationend", cfun);

			addClass("closed", cardBox);
			if(typeof closecallback == "function"){
				closecallback();
			}
			let _this = this;
			function cfun(){
				addClass("hidden", GCard);
				let container = document.querySelectorAll(_this._setting.blur)[0];
				let cardMini = document.querySelectorAll(".myuki-gcard_mini")[0];
				if(container != undefined){
					removeClass("blur", container);
				}
				cardMini != undefined ? addClass("shown", cardMini) : "";
				cardBox.removeEventListener("animationend", cfun);
			}
		},
		
		open: function(opencallback) {
			if(this._closed){
				this._closed = false;
			}else{
				console.log("Myuki Guidance has been opened.");
				return;
			}
			let GCard = this._GCard;
			let cardBox = GCard.querySelectorAll(".myuki-gcard_box")[0];
			removeClass("hidden", GCard);

			removeClass("closed", cardBox);
			let container = document.querySelectorAll(this._setting.blur)[0];
			if(container != undefined){
				addClass("blur", container);
			}
			if(typeof opencallback == "function"){
				opencallback();
			}
		},
		
		help: function() {
			console.log('%c⛄️欢迎使用Myuki Guidance Card👏',
				'font-size:14px;border:20px solid #1e90ff;border-radius:10px;background:white;color:black;'
			);
		}
	}


	function extend() {
		var length = arguments.length;
		var target = arguments[0] || {};
		if (typeof target != "object" && typeof target != "function") {
			target = {};
		}
		if (length == 1) {
			target = this;
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
