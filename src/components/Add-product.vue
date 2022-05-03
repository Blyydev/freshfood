<template>
	<div id="add_item_panel">
		<button class="cancel_btn" @click="cancel">×</button>

		<div v-if="state < 4">
			<h3>{{ title_step }}</h3>

			<ul class="cat_lvl_1" v-if="state == 1">
				<li v-for="item in fridgeItem.level_1" 
					@click="actionStep1" 
					:data-id="item.slug" 
					:key="item.slug" 
					:class="'cat_'+item.slug">
					<SvgIcon :name="item.icon"></SvgIcon>
				</li>
				<li @click="actionCustom" class="cat_custom">
					<SvgIcon name="custom"></SvgIcon>
				</li>
			</ul>

			<ul class="cat_lvl_2" v-else-if="state == 2">
				<li @click="backStep" class="back_btn">Retour</li>
				<li v-for="item in step2items" 
					@click="actionStep2" 
					:class="'cat_'+item.parent"
					:data-id="item.slug" 
					:key="item.slug" >
						<SvgIcon :name="item.icon"></SvgIcon>
				</li>
			</ul>

			<form @submit.prevent="actionCustomValidate" class="custom_form" v-else-if="state == 3">
				<input type="text" placeholder="Indiquez l'aliment" v-model="customName" />
				<button type="button" @click="actionCustomValidate">Valider</button>
			</form>
		</div>

		<div v-else-if="state === 4">
			<h3>DATE</h3>
		
			<ul class="date_items">
				<li @click="backStep" class="back_btn">Retour</li>
				<li v-for="date in datesDLC" @click="actionStepDate" :data-date="date[2]" :key="date[2]" >
					<span class="day">{{ date[0] }}</span>
					<span class="month">{{ date[1] }}</span>
				</li>
			</ul>
		</div>

		<div v-else-if="state === 5">
			<h3>Récapitulatif</h3>

			<div class="recap_item" :class="'cat_'+selected.cat.slug">
				<div class="icon_wrapper">
					<SvgIcon :name="selected.item.icon"></SvgIcon>
				</div>
				<h4 class="category_name">{{ selected.cat.title }}</h4>
				<h4 class="item_name">{{ selected.item.title }}</h4>
				<h4 class="date"><span>{{ recapDate }}</span></h4>
			</div>

			<button class="validate_btn" @click="addNewItem">AJOUTER</button>
		</div>

	</div>
</template>

<script>
	
	import datas from '../datas/fridgeItems'
	import SvgIcon from './SvgIcon.vue'
	import dayjs from 'dayjs'
	import 'dayjs/locale/fr'
	dayjs.locale('fr')
	
	const nextDaysDLC = 42

	export default {
		data() {
			return {
				state: 1,
				fridgeItem: datas,
				now : dayjs(),
				selected: {
					isCustom:false,
					cat:null,
					item:null,
					date:null
				},
				customName:''
			}
		},
		emits: ['additem'],
		methods: {
			backStep(){
				this.reset()
			},
			actionStep1(e){
				this.state = 2

				let tmpId = e.currentTarget.getAttribute('data-id')
				let tmpCat = this.fridgeItem.level_1.filter((item) => {
					return item.slug == tmpId
				})
				this.selected.cat = tmpCat[0] 
			},
			actionStep2(e){
				this.state = 4

				let tmpId = e.currentTarget.getAttribute('data-id')
				let tmpItem = this.fridgeItem.level_2.filter((item) => {
					return item.slug == tmpId
				})
				this.selected.item = tmpItem[0]
			},		
			actionCustom(){
				this.state = 3
				this.selected.isCustom = true
				this.selected.cat = {
					slug: "custom",
					title: "Custom"
				}
			},
			actionCustomValidate(){
				this.state = 4
				this.selected.item = {
					parent:	'custom',						
					slug: slugConverter(this.customName),
					title: this.customName
				}
			},
			actionStepDate(e){
				this.state = 5
				let tmpDate = e.currentTarget.getAttribute('data-date')
				this.selected.date = tmpDate
			},
			reset(){
				this.state = 1
				this.selected = {
					isCustom:false,
					cat:null,
					item:null,
					date:null
				}
				this.customName = ''
			},
			addNewItem(){
				this.$emit('additem', this.selected);
				this.reset()
			},
			cancel(){
				this.$emit('cancel_add');
				this.reset()
			}
		},
		computed: {
			title_step: function(){
				if(this.state === 2){
					return this.selected.cat.title;
				}else if(this.state === 3){
					return 'Personnalisé';
				}else{
					return 'Catégorie';
				}
			},
			step2items: function(){
				return this.fridgeItem.level_2.filter(item => item.parent == this.selected.cat.slug);
			},
			datesDLC: function(){
				let dates = []
				for (let i = 2 ; i < nextDaysDLC; i++) {
					dates.push([dayjs().add(i, 'day').format('DD'), dayjs().add(i, 'day').format('MMM'), dayjs().add(i, 'day').format('MM/DD/YYYY') ])
				}
				return dates
			},
			recapDate: function(){
				return dayjs(this.selected.date).format('DD MMM');
			}
		},
		components: {
			SvgIcon
		}
	};

	function slugConverter (str) {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}
		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		return str;
	}

	
/*
SWIPE
-
	window.addEventListener('load', function(){
	 
		var touchsurface = document.getElementById('touchsurface'),
			startX,
			startY,
			dist,
			threshold = 150, //required min distance traveled to be considered swipe
			allowedTime = 200, // maximum time allowed to travel that distance
			elapsedTime,
			startTime
	 
		function handleswipe(isrightswipe){
			if (isrightswipe)
				touchsurface.innerHTML = 'Congrats, you\'ve made a <span style="color:red">right swipe!</span>'
			else{
				touchsurface.innerHTML = 'Condition for right swipe not met yet'
			}
		}
	 
		touchsurface.addEventListener('touchstart', function(e){
			touchsurface.innerHTML = ''
			var touchobj = e.changedTouches[0]
			dist = 0
			startX = touchobj.pageX
			startY = touchobj.pageY
			startTime = new Date().getTime() // record time when finger first makes contact with surface
			e.preventDefault()
		}, false)
	 
		touchsurface.addEventListener('touchmove', function(e){
			e.preventDefault() // prevent scrolling when inside DIV
		}, false)
	 
		touchsurface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0]
			dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
			elapsedTime = new Date().getTime() - startTime // get time elapsed
			// check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
			var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
			handleswipe(swiperightBol)
			e.preventDefault()
		}, false)
	 
	}, false) // end window.onload

*/

</script>
