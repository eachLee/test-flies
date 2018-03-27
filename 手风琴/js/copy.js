var box = document.getElementById('box');
var allLi = box.getElementsByTagName('li');
var boxW = box.offsetWidth - 2;
var allLiLen = allLi.length;
var activeEle = box.getElementsByClassName('activeEle')[0];
//展开之后的宽度
var activeH = 300;
// 出去展开之后其余的平均宽度
var randomW = Math.floor((boxW - activeH) / (allLiLen - 1));
// 轮播的时间
var setTime = 1000;
var timer = null;
var timer2 = null;

// 自动轮播调用的函数
function autoChange(ele) {
	if (ele) {
		// 先去掉原有的样式
		for (var i = 0; i < allLi.length; i++) {
			allLi[i].className = '';
			allLi[i].style.width = randomW + 'px';
			allLi[i].style.transition = '.5s';
		}
		ele.className = 'activeEle';
		ele.style.width = activeH + 'px';
		// 自动切换为下一个
		ele = activeEle = ele.nextElementSibling;
		timer2 = setTimeout(autoChange.bind(this, ele), setTime);
	} else {
		for (var n = 0; n < allLi.length; n++) {
			allLi[n].className = '';
			allLi[n].style.width = randomW + 'px';
			allLi[n].style.transition = '.5s';
		}
		// 如果下一个ele不存在 则把ele改为第一个元素
		ele = activeEle = box.firstElementChild;
		ele.className = 'activeEle';
		ele.style.width = activeH + 'px';
		timer2 = setTimeout(
			autoChange.bind(this, ele.nextElementSibling),
			setTime
		);
	}
}
autoChange(allLi[0]);
for (var i = 0; i < allLiLen; i++) {
	allLi[i].className = '';
	allLi[i].addEventListener('mousemove', function() {
		var that = this;
		// 鼠标移入之后 执行hoverFn 渐变放大图片
		for (var i = 0; i < allLi.length; i++) {
			var ele = allLi[i];
			ele.style.transition = '0s';
			if (ele !== that) {
				ele.className = '';
			}
		}
		clearInterval(timer);
		clearTimeout(timer2);
		timer = setInterval(function() {
			hoverFn(that);
		}, 10);
	});
	allLi[i].addEventListener(
		'mouseout',
		function() {
			// 清除已开的定时器防止抖动
			clearInterval(timer);
			clearTimeout(timer2);
			timer2 = setTimeout(function() {
				if (activeEle && activeEle.previousElementSibling) {
					autoChange(activeEle.previousElementSibling);
				} else {
					autoChange(allLi[allLiLen - 1]);
				}
			}, 0);
		},
		false
	);
	allLi[i].addEventListener(
		'click',
		function() {
			// 点击之后 更改一下 移出显示的元素
			if (this.nextElementSibling) {
				activeEle = this.nextElementSibling;
			} else {
				activeEle = box.firstElementChild;
			}
		},
		false
	);
}
function hoverFn(ele) {
	var eleW = parseInt(ele.offsetWidth);
	// 判断当前元素没有完全展开时执行
	if (eleW < activeH) {
		// 算没有展开的元素的总宽度
		var addW = 0;
		for (var i = 0; i < allLiLen; i++) {
			// 修改不是当前元素的样式
			if (allLi[i] !== ele) {
				var allLiW = allLi[i].offsetWidth,
					p = 0;
				if (allLiW > randomW) {
					// 每次执行 减少的像素
					p = Math.floor((allLiW - randomW) / 10) || 1;
					allLi[i].style.width = allLiW - p + 'px';
				}
				addW = addW + allLiW - p;
			}
		}
		var notActiveW = boxW - addW;
		if (notActiveW > activeH) {
			notActiveW = activeH;
		}
		ele.style.width = notActiveW + 'px';
	} else {
		clearInterval(timer);
	}
}
