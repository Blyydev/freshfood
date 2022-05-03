const data = {
	level_1: [
		{
			slug: "meat",
			title: "Boucherie",
			icon: 'cat_viande'
		},
		{
			slug: "fish",
			title: "Poissonnerie",
			icon: 'cat_fish'
		},
		{
			slug: "vegetable",
			title: "Fruits & Légumes",
			icon: 'cat_vegetable'
		},
		{
			slug: "dairy",
			title: "Crémerie",
			icon: 'cat_milk'
		},
		{
			slug: "junkfood",
			title: "Traiteur",
			icon: 'cat_junkfood'
		}
	],
	level_2: [
		// VIANDE
		{
			parent:'meat',
			slug: "pork",
			title: "Porc",
			icon: 'pork'
		},
		{
			parent:'meat',
			slug: "beef",
			title: "Boeuf",
			icon: 'beef'
		},
		{
			parent:'meat',
			slug: "ham",
			title: "Jambon",
			icon: 'ham'
		},
		{
			parent:'meat',
			slug: "chicken",
			title: "Poulet",
			icon: 'chicken'
		},
		{
			parent:'meat',
			slug: "rabbit",
			title: "Lapin",
			icon: 'rabbit'
		},
		{
			parent:'meat',
			slug: "sausage",
			title: "Saucisse",
			icon: 'sausage_1'
		},
		{
			parent:'meat',
			slug: "bacon",
			title: "Bacon",
			icon: 'bacon'
		},
		{
			parent:'meat',
			slug: "goat",
			title: "Chèvre",
			icon: 'goat'
		},
		// POISSONS
		{
			parent:'fish',
			slug: "fish",
			title: "Poisson",
			icon: 'fish'
		},
		{
			parent:'fish',
			slug: "crab",
			title: "Crabe",
			icon: 'crab'
		},
		{
			parent:'fish',
			slug: "shrimp",
			title: "Crevette",
			icon: 'shrimp'
		},
		// LEGUME & FRUIT
		{
			parent:'vegetable',
			slug: "tomato",
			title: "Tomates",
			icon: 'tomato'
		},
		{
			parent:'vegetable',
			slug: "carot",
			title: "Carotte",
			icon: 'carot'
		},
		{
			parent:'vegetable',
			slug: "mushroom",
			title: "Champignon",
			icon: 'mushroom'
		},
		{
			parent:'vegetable',
			slug: "eggplant",
			title: "Aubergine",
			icon: 'eggplant'
		},
		{
			parent:'vegetable',
			slug: "salad",
			title: "Salade",
			icon: 'salad'
		},
		{
			parent:'vegetable',
			slug: "garlic",
			title: "Ail",
			icon: 'garlic'
		},
		{
			parent:'vegetable',
			slug: "apple",
			title: "Pomme",
			icon: 'apple'
		},
		{
			parent:'vegetable',
			slug: "banana",
			title: "Banane",
			icon: 'banana'
		},
		{
			parent:'vegetable',
			slug: "cherry",
			title: "Cerise",
			icon: 'cherry'
		},
		{
			parent:'vegetable',
			slug: "strawberry",
			title: "Fraise",
			icon: 'strawberry'
		},
		// CREMERIE
		{
			parent:'dairy',
			slug: "milk",
			title: "Lait",
			icon: 'milk'
		},
		{
			parent:'dairy',
			slug: "sour_cream",
			title: "Crème fraîche",
			icon: 'sour_cream'
		},
		{
			parent:'dairy',
			slug: "cheese",
			title: "Fromage",
			icon: 'cheese'
		},
		{
			parent:'dairy',
			slug: "yogurt",
			title: "Yaourt",
			icon: 'yogurt'
		},
		// JUNKFOOD
		{
			parent:'junkfood',
			slug: "cordon_bleu",
			title: "Cordon Bleu",
			icon: 'cordon_bleu'
		},
		{
			parent:'junkfood',
			slug: "pizza",
			title: "Pizza",
			icon: 'pizza'
		},
		{
			parent:'junkfood',
			slug: "nuggets",
			title: "Nuggets",
			icon: 'nuggets'
		}

	]
}

export default data