<template>
  <!-- <div class="navbar"> -->
  <div :class="{ navbar: true, totop: isTop }">
    <ul class="bar">
      <li>首页</li>
      <li>乐享生活</li>
      <li>硬核编程</li>
      <li>绚丽前端</li>
      <li>数据仓库</li>
      <li>数据仓库</li>
      <li>数据仓库</li>
      <li>数据仓库</li>

      <li class="search">
        <el-icon icon-class="search" />
      </li>
    </ul>
    <div class="scoll-container" ref="scrollRef">
      <div class="content" @click="handleMenuClick">内容区滚动
				<div class="transfrom">
					<div class="icon-change">icon</div>
				</div>
			</div>
    </div>
  </div>
</template>
 
<script>
import { ref,onMounted } from 'vue';
export default {
	name: "home",
	setup () {
		const scrollRef = ref(null)
    const handleMenuClick = function () {
      console.log(scrollRef.value)
    }
    onMounted(async() => {
			const ele = scrollRef.value;
      scrollRef.value.addEventListener('scroll',function() {
				const scrollTop = ele.scrollTop;//获取dom滚动距离;
				const offsetHeight = ele.offsetHeight;//获取可视区高度;
				const scrollHeight = ele.scrollHeight; //获取滚动条总高度
				if(scrollTop + offsetHeight >= scrollHeight ) {// 判断是否到低了
					console.log('以滚动到底部了',scrollTop,scrollHeight,offsetHeight);

				}
			})
    })
    return {
      scrollRef,
			handleMenuClick
    }
  },
  data() {
    return {
      isTop: false,
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.scrollToTop, true);
  },
  unmounted() {
    // window.removeEventListener("scroll", this.scrollToTop, true);
  },
  methods: {
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //为了计算距离顶部的高度，当高度大于50显示回顶部图标，小于50则隐藏
      if (scrollTop > 60) {
        console.log("页面滚动超过60了");
        this.isTop = true;
      } else {
        console.log("页面没有超过50");
        this.isTop = false;
      }
    },
  },
};
</script>
 
<style>
.navbar {
  width: 100%;
  height: 58px;
  background-color: #244469;
  box-shadow: 0px 3px 5px #ccc;
}

.totop {
  position: fixed;
  top: 0;
  z-index: 999;
}

.bar {
  width: 100%;
  height: 58px;
  margin: 0 auto;
  padding: 0;
  line-height: 58px;
  font-size: 18px;
  font-weight: 500;
}

li {
  float: left;
  width: auto;
  padding: 0 20px;
  min-width: 75px;
  color: white;
  background-color: #244469;
}
li:hover {
  background-color: #246469;
}

.search {
  min-width: 25px;
  float: right;
}
.scoll-container {
  width: 100%;
  background: gold;
  height: 300px;
  overflow-y: scroll;
}
.content {
	height: 500px;
	text-align: center;
	font-size: 24px;
	color: purple;
	width: 100%;
}
.scoll-container::-webkit-scrollbar-thumb:hover {
  background-color: palegreen;
}
.scoll-container::-webkit-scrollbar-thumb {
  background-color: #246469;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  background-clip: padding-box;
}
.scoll-container::-webkit-scrollbar {
  width: 7px;
  height: 7px;
	display: none;
}
.scoll-container:hover::-webkit-scrollbar {
	display: block;
}
.transfrom {
	width: 80px;
	height: 50px;
	line-height: 50px;
	background: #244469;
}
.icon-change {
	background: red;
	transition: all linear;
}
@keyframes swiper {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
} 
.transfrom:hover .icon-change {
	animation: swiper 2s;
}

</style>