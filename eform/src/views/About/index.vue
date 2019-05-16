<template>
	<div class="intro" align="center">
		<h2>#开发人员</h2>
		<hr align=center width=300 color=purple SIZE=2 />
		<div class="dev">
			<li v-for="i in members">
				<img v-bind:src="i.avater" v-on:click="i.sw=!i.sw" class="ava"> 
				<transition name="slide-fade"> <span v-if="i.sw"> >{{i.names}}</span> </transition> 
			</li>	
		</div>
		
		<div class="foot">
			<span class="foo" >Powered by </span> <img src="./imgs/icon.png">	
			<p > email: sumstc@outlook.com </p>
		</div>
		
		
		<!-- <h1>SUMSC</h1> -->
		
	</div>
</template>

<script>
    export default {	
        name: "About",

        data() {
        	return {
        		
	        	members:[
	        	{names:"Amber",avater:require("./imgs/amber.png"),sw:false},
	        	{names:"LionTao",avater:require("./imgs/liontao.jpg"),sw:false},
	        	{names:"Count_Zero",avater:require("./imgs/sanakan.jpg"),sw:false},
	        	{names:"Artorius",avater:require("./imgs/artorius.jpg"),sw:false}
	        	]
			}
        }
        
    }
    
</script>

<style scoped>
	.ava{
		transition: all .3s ease;
	}
	.ava:active{
		transform: translateX(-20px);
	}
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .3s ease/*cubic-bezier(1.0, 0.5, 0.8, 1.0)*/;
	}
	.slide-fade-enter, .slide-fade-leave-to{
	  transform: translateX(10px);
	  opacity: 0;
	}
	.foot{
		background-color: pink;
		padding :30px;
	}
	.dev{
		padding: 40px;
	}
	p{
		color : purple;
		font-weight: 1;
		line-height: 30px;
		
	}
	.foo{
		font-weight: bold;
	}
	span{
		font-size: 30px;

	}
	li{
		line-height: 30px;
	}
	h2{
		line-height: 70px;
	}
	img{
		width:50px;
		height: 100%;
	}
</style>