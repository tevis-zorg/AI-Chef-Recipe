import {useState} from 'react'

export const ingredientListState = () => {
  const [ingredient, setIngredients] = useState (["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
  return [ingredient, setIngredients]
}

export const recipiesDisplay = () => {
  const [recipeShwon, setRecipeShown] = useState(false);
  return [recipeShwon, setRecipeShown]
}

export const recipeResponse = () => {
  const [recipe, setRecipe] = useState("");
  return [recipe, setRecipe]
}
