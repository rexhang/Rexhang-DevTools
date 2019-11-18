// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

let listerDatas = {
	type: {
		'get_poster': null
	}
};

// A generic onclick callback function.
function genericOnClick(info, tab) {
	// console.log(info);
	// console.log(tab);
	if(info.menuItemId === '1'){
		// 菜单一被点击@获取封面图片
		// console.log(info.linkUrl);
		// 发送消息@2
		// chrome.tabs.sendMessage(tab.id, '你好 我是 background', function(response){
		// 	console.log(response);
		// });
		let bodyMsg = null;
		if(listerDatas.type.get_poster){
			console.log(`视频封面原尺寸地址${listerDatas.type.get_poster}`);
			openUrl('https://'+listerDatas.type.get_poster);
			bodyMsg = '视频封面获取成功';
		} else {
			console.log('未获取到视频封面');
			console.log(listerDatas);
			bodyMsg = '未获取到视频封面';
		}
		if (window.Notification) {
			var time = /(..)(:..)/.exec(new Date());
			var hour = time[1] % 12 || 12;
			var period = time[1] < 12 ? '上午' : '下午';
			new Notification(hour + time[2] + ' ' + period, {
				icon: 'logo.png',
				body: bodyMsg
			});
		}
	}
	// 将body背景变为红色
	// chrome.tabs.executeScript({
	// 	code: 'document.body.style.backgroundColor="red"'
	// });
	// chrome.tabs.executeScript(
	// 	tab.id,
	// 	{
	// 		code: 'window.print();'
	// 	}
	// );
}

// Create one test item for each context type.
const contexts = ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"];
// for (let i = 0; i < contexts.length; i++) {
// 	const typeName = contexts[i];
// 	chrome.contextMenus.create({
// 		"id": i.toString(),
// 		"title": typeName + "menu item",
// 		"contexts":[typeName]
// 	});
// }

chrome.contextMenus.create({
	"title": "Rexhang DevTools",
	"contexts": ['all'],
	"id": '0'
});


// Create a parent item and two children.
const child1 = chrome.contextMenus.create({
	"title": "❤️ 获取BiliBili视频封面图",
	"contexts": ['link'],
	"parentId": '0',
	"id": '1',
	"documentUrlPatterns": ["*://www.bilibili.com/"]
});

chrome.contextMenus.onClicked.addListener(genericOnClick);

// Create some radio items.
// function radioOnClick(info, tab) {
// 	console.log("radio item " + info.menuItemId +
// 		" was clicked (previous checked state was "  +
// 		info.wasChecked + ")");
// }
// var radio1 = chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
// 	"onclick":radioOnClick});
// var radio2 = chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
// 	"onclick":radioOnClick});
// console.log("radio1:" + radio1 + " radio2:" + radio2);


// Create some checkbox items.
// function checkboxOnClick(info, tab) {
// 	console.log(JSON.stringify(info));
// 	console.log("checkbox item " + info.menuItemId +
// 		" was clicked, state is now: " + info.checked +
// 		"(previous state was " + info.wasChecked + ")");
//
// }
// var checkbox1 = chrome.contextMenus.create(
// 	{"title": "Checkbox1", "type": "checkbox", "onclick":checkboxOnClick});
// var checkbox2 = chrome.contextMenus.create(
// 	{"title": "Checkbox2", "type": "checkbox", "onclick":checkboxOnClick});
// console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);


// Intentionally create an invalid item, to show off error checking in the
// create callback.
// console.log("About to try creating an invalid item - an error about item 999 should show up");
// chrome.contextMenus.create({"title": "Oops", "parentId": 999}, function() {
// 	if (chrome.extension.lastError) {
// 		console.log("Got expected error: " + chrome.extension.lastError.message);
// 	}
// });

// 监听消息@1
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
// {
// // code...
// 	console.log(request);
// 	console.log(sender);
// 	sendResponse('回复：我已收到你的消息：' +JSON.stringify(request));//做出回应
// });

// 监听消息@打开前端获取到的海报地址
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
// code...
// 	console.log(request);
// 	console.log(sender);
	listerDatas.type[request.type] = request.data;
	sendResponse('回复：我已收到你的消息：' +JSON.stringify(request));//做出回应
});

function openUrl(url) {
	chrome.tabs.create({url});
}

