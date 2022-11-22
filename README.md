# Myuki Navigation Card 
> 一个简洁美观的个人导航主页、卡片

⛄️：可以是一张名片、个人网址的导航主页、或是作为网站的引导页等等。

## 简单用法

```javascript
<link rel="stylesheet" href="./css/MyukiGCard.css">
<script src="./js/MyukiGCard.js"></script>
```

```html
<script>
  // window.MyNavCard = $MGC();
window.MyNavCard = $MGC({
	icon: "https://stackblog.cf/img/avatar.jpg",
	/*
	icon:头像或者网站logo
	*/
	name: "Stack Dev",
	/*
	name: 名字或者网站名称
	*/
	info: "欢迎使用Myuki Guidance Card",
	/*
	info:个性签名、网站信息、口号等
	*/
	z_index: 9999,
	/*
	默认值: 9999
	*/
	blur: ".container",
	/*
	blur:想要模糊化处理的页面元素
	可选值： .className、#idName、tagName
	*/
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
	/*
	网址导航
	title：导航的名称
	url：网址
	type: 导航按钮的样式
	type的取值包括：
	default | primary | secondary | success | danger | waring | info | light | dark | link
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

[Myuki Navigation Card](https://stackblog.cf)
