# MyukiGCard 
> 一个简洁美观的个人导航主页、链接卡片

⛄️：可以是一张名片，个人网址的导航主页、介绍页、或是作为网站的引导页、消息弹框等等。

## 用法

```html
<link rel="stylesheet" href="./css/MyukiGCard.css">
<script src="./js/MyukiGCard.js"></script>
```

```html
<script>
//简单用法
//window.MyNavCard = $MGC();
//高级用法
window.MyNavCard = $MGC({
	icon: "https://stackblog.cf/img/avatar.jpg",
	/*
	icon: 可以是头像、网站logo等
	*/
	name: "Stack Dev",
	/*
	name: 可是是名字、网站名称等
	*/
	info: "欢迎使用MyukiGCard",
	/*
	info: 个性签名、网站口号、信息等，为空或者不设置将不显示
	默认值: 空
	*/
	z_index: 9999,
	/*
	不用解释，默认值为9999
	*/
	blur: "#write",
	/*
	blur: 想要模糊化处理的页面元素，取值可以是.className（类名）、#idName（id属性值）、tagName（标签名）
	*/
	lang: "en-US",
	/*
	lang: 语言设置，目前和关闭按钮的文本有关
	默认值: zh-CN
	可选值: zh-CN,zh-TW,en-US
	如果不提供或者提供的不在可选值内，将使用默认值或者使用html页面的lang属性
	*/
	mini: true,
	/*
	mini: 迷你按钮，用于重新打开MyukiGCard（在页面底部中间位置）
	默认值: true
	*/
	darkmode: 2,
	/*
	darkmode: 夜间模式
	默认值: 1
	可选值: 0、1、2、3
	0: 禁用夜间模式
	1: 跟随系统（如果系统支持夜间模式）
	2: 根据时间，下午6时～上午6时打开夜间模式
	3: 常开夜间模式
	*/
	maxWidth: "480px",
	/*
	maxWidth: MyukiGCard的最大宽度
	默认值: 480px
	*/
	fontFamily: "",
	/*
	fontFamily: 字体，为空或不设置将使用默认字体
	*/
	hitokoto: {
		"enable": true,
		/*
		enable: 是否启用一言API
		默认值: false
		*/
		"cats": ["d", "i", "k"],
		/*
		cats: 句子类型，详见：https://developer.hitokoto.cn/sentence/#句子类型-参数
		默认值: []
		a: 动画, b: 漫画, c: 游戏, d: 文学, e: 原创, f: 网络, 
		g: 其他, h: 影视, i: 诗词, j: 网易, k: 哲学, i: 抖机灵
		*/
		"offline": "兰博基尼和法拉利能一样吗？分手！",
		/*
		offline: 一言API请求错误时用于替换的离线语句
		*/
		"color": "#70a1ff",
		/*
		color: 一言语句颜色
		默认值: #70a1ff
		*/
	},
	/*
	hitokoto: 一言API
	注: 不兼容IE
	*/
	links: [{
		"title": "My Blog",
		"url": "https://stackblog.cf/",
		"type": "primary",
		"target": "_blank"
	}, {
		"title": "My GitHub",
		"url": "https://github.com/Uyukisan",
	}, {
		"title": "MyukiGCard Usage",
		"url": "https://github.com/Uyukisan/MyukiGCard",
	}],
	/*
	导航链接列表
	title: 链接的标题
	url: 链接地址
	
	type: 链接按钮的类型，包括：
	default | primary | secondary | success | danger | waring | info | light | dark | link
	如果不提供type，默认为dafault
	
	target: 在何处打开链接，包括：
	_blank（新窗口）| _self(默认) | _parent(父框架) | _top(整个窗口) | framename(指定的框架)
	如果不提供target，将使用默认
	*/
});

/*
 方法：close()
*/

MyNavCard.close();
// 使用回调函数
MyNavCard.close(closeCallBack);

function closeCallBack() {
	console.log("关闭回调函数...");
}

/*
 方法：open()
*/

MyNavCard.open();
// 使用回调函数
MyNavCard.open(openCallBack);

function openCallBack() {
	console.log("打开回调函数...");
}
</script>
```

## 预览

[MyukiGCard](https://uyukisan.github.io/MyukiGCard/)

