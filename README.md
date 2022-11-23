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
//window.mgc = $MGC();
//高级用法
window.mgc = $MGC({
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
	info: 个性签名、网站口号、信息等
	*/
	z_index: 9999,
	/*
	不用解释，默认值为9999
	*/
	blur: ".container",
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
	links: [{
		"title": "My Blog",
		"url": "https://stackblog.cf/",
		"type": "primary"
	}, {
		"title": "My GitHub",
		"url": "http://github.com/Uyukisan"
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

