/**
 * name: Bilibili video site video cover get plugin
 * author:　rexhang
 */

window.onload = function(){
	const doms = document.querySelectorAll('.spread-module');
	console.log(
		`
		/**
		 * plugin inject success
		 * name: Bilibili video site video cover get plugin
		 * author:　rexhang
		 */
		`
	);
	doms.forEach(item=>{
		item.addEventListener('mousedown', function (ev) {
			// ev.preventDefault();
			if (ev.button === 2){
				// 点击了右键, 获取封面
				const posterOrigin = $(this).find('.lazy-img img').attr('src').split('@')[0] + '@.webp';
				// console.log(posterOrigin);
				// 发送消息@获取到的真实海报地址
				chrome.runtime.sendMessage(
					{type: 'get_poster', data: posterOrigin},
					function(response) {
						// 打开成功
						// console.log('收到来自后台的回复：' + response);
					}
				);
			}
		}, false)
	});
	
};

// 发送消息@1
// chrome.runtime.sendMessage(
// 	{greeting: '你好，我是content-script呀，我主动发消息给后台！'},
// 	function(response) {
// 		console.log('收到来自后台的回复：' + response);
// 	}
// );

// 监听消息@2
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	// code...
// 	console.log(request);
// 	console.log(sender);
// 	sendResponse('回复：我已收到你的消息：' +JSON.stringify(request));//做出回应
// });


