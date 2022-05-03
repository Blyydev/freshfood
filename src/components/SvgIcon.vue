<template>
	<component :is="name"></component>
</template>

<script>
	import apple from "./svg/apple.vue"
	import apple_2 from "./svg/apple_2.vue"
	import bacon from "./svg/bacon.vue"
	import banana from "./svg/banana.vue"
	import beef from "./svg/beef.vue"
	import carot from "./svg/carot.vue"
	import cat_fish from "./svg/cat_fish.vue"
	import cat_junkfood from "./svg/cat_junkfood.vue"
	import cat_milk from "./svg/cat_milk.vue"
	import cat_vegetable from "./svg/cat_vegetable.vue"
	import cat_viande from "./svg/cat_viande.vue"
	import cheese from "./svg/cheese.vue"
	import cherry from "./svg/cherry.vue"
	import chicken from "./svg/chicken.vue"
	import cordon_bleu from "./svg/cordon_bleu.vue"
	import crab from "./svg/crab.vue"
	import custom from "./svg/custom.vue"
	import eggplant from "./svg/eggplant.vue"
	import fish from "./svg/fish.vue"
	import garlic from "./svg/garlic.vue"
	import garlic_2 from "./svg/garlic_2.vue"
	import goat from "./svg/goat.vue"
	import ham from "./svg/ham.vue"
	import logo_inline from "./svg/logo_inline.vue"
	import milk from "./svg/milk.vue"
	import mushroom from "./svg/mushroom.vue"
	import mushroom_2 from "./svg/mushroom_2.vue"
	import nuggets from "./svg/nuggets.vue"
	import pizza from "./svg/pizza.vue"
	import pork from "./svg/pork.vue"
	import rabbit from "./svg/rabbit.vue"
	import salad from "./svg/salad.vue"
	import sausage_1 from "./svg/sausage_1.vue"
	import sausage_2 from "./svg/sausage_2.vue"
	import shrimp from "./svg/shrimp.vue"
	import sour_cream from "./svg/sour_cream.vue"
	import strawberry from "./svg/strawberry.vue"
	import tomato from "./svg/tomato.vue"
	import tomato_2 from "./svg/tomato_2.vue"
	import yogurt from "./svg/yogurt.vue"

	export default {
		props: {
			name: String
		},
		components: {
			apple,
			apple_2,
			bacon,
			banana,
			beef,
			carot,
			cat_fish,
			cat_junkfood,
			cat_milk,
			cat_vegetable,
			cat_viande,
			cheese,
			cherry,
			chicken,
			cordon_bleu,
			crab,
			custom,
			eggplant,
			fish,
			garlic,
			garlic_2,
			goat,
			ham,
			logo_inline,
			milk,
			mushroom,
			mushroom_2,
			nuggets,
			pizza,
			pork,
			rabbit,
			salad,
			sausage_1,
			sausage_2,
			shrimp,
			sour_cream,
			strawberry,
			tomato,
			tomato_2,
			yogurt
		},
	}
</script>