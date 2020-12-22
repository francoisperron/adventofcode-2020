import { unique } from '../arrays.js'

const part1 = foods => {
  const allergens = findAllergens(foods)
  const ingredientsWithAllergent = Object.values(allergens).flat().filter(unique)

  return foods.reduce((sum, f) => sum + f.ingredients.filter(i => !ingredientsWithAllergent.includes(i)).length, 0)
}

const part2 = foods => {
  const allergens = findAllergens(foods)
  const uniqueAllergens = findUniqueAllergen(allergens)

  return Object.keys(uniqueAllergens).sort().flatMap(a => uniqueAllergens[a]).join(',')
}

const parseFood = food => {
  const [ingredients, allergens] = food.split(' (')

  return { ingredients: ingredients.split(' '), allergens: allergens.slice(9, -1).split(', ') }
}

const findAllergens = foods => {
  const allergens = {}
  for (const food of foods) {
    for (const allergen of food.allergens) {
      allergens[allergen] = allergens[allergen] == null ? [...food.ingredients] : allergens[allergen].filter(i => food.ingredients.includes(i))
    }
  }

  return allergens
}

const findUniqueAllergen = allergens => {
  const uniqueAllergens = { ...allergens }
  while (Object.values(uniqueAllergens).some(ingredients => ingredients.length !== 1)) {
    for (const allergen1 of Object.keys(uniqueAllergens)) {
      for (const allergen2 of Object.keys(uniqueAllergens)) {
        if (allergen1 !== allergen2) {
          const ingredients = uniqueAllergens[allergen1].filter(i => !uniqueAllergens[allergen2].includes(i))
          uniqueAllergens[allergen1] = ingredients.length === 0 ? uniqueAllergens[allergen1] : ingredients
        }
      }
    }
  }

  return uniqueAllergens
}

export { parseFood, findAllergens, findUniqueAllergen, part1, part2 }
