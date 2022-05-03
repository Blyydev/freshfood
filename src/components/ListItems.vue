<template>
	<div id="list_items">
		<transition-group name="list" tag="ul" v-if="items.length > 0" class="items_wrapper">
			<li v-for="fooditem in newItems" :key="fooditem.id" >
				<div class="days" :class="fooditem.styleDays">{{ fooditem.diffDate }}</div>
				<div v-if="!fooditem.isCustom" :class="'icon cat_'+fooditem.item.parent">
					<SvgIcon :name="fooditem.item.icon"></SvgIcon>
				</div>
				<div v-else class="title_custom">{{ fooditem.item.title }}</div>
				<button class="delete_btn" @click="removeItem(fooditem.id)">×</button>
			</li>
		</transition-group>

		<div v-else class="empty_list">
			<p>Il n'y a rien dans votre frigo !</p>
			<button class="no_item_button" @click="addItem">Ajouter quelque chose</button>
		</div>
	</div>
</template>

<script>
	import SvgIcon from './SvgIcon.vue'

	import _ from 'lodash'
	import dayjs from 'dayjs'

	const today = dayjs().format('MM/DD/YYYY')

	export default {
		props: {
			items: Array
		},
		methods: {
			removeItem(id){
				this.$emit('del_item', id);
			},
			addItem(){
				this.$emit('add_item');
			}
		},
		computed: {
			newItems: function(){
				let newArray = _.orderBy(this.items, 'date', 'item.title');
				return newArray.map( (el) => {
					let tmpDiff = dayjs(el.date).diff(today, "d", true)
					let prefix = ( tmpDiff < 0 ? 'J+' : 'J-');
					el.diffDate = prefix + Math.abs(tmpDiff)
					
					if(tmpDiff < 0){
						el.styleDays = 'style_0'
					}else if(tmpDiff < 1 ) {
						el.styleDays = 'style_1'
					}else if(tmpDiff < 2) {
						el.styleDays = 'style_2'
					}else if(tmpDiff < 3) {
						el.styleDays = 'style_3'
					}else{
						el.styleDays = 'style_4'
					}
					
					return el
				});
			}
		},
		mounted(){
		},
		components: {
			SvgIcon
		}
	};
</script>