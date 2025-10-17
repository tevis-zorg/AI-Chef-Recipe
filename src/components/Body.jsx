
// State imports
import { useEffect, useRef } from 'react';
import { ingredientListState, recipiesDisplay, recipeResponse } from '../states/States'

// Child Components import
import { GetRecipeButton } from './component-child/Buttons';
import { GenerateResponse } from './component-child/GeneratedResponse';

//API
import { getRecipeFromMistral } from '../../AI';

import './Body.css'

const Body = () => {

  // Single source of truth
  // See "../states/States.jsx"
  const [ingredients, setIngredients] = ingredientListState();
  const [recipeShown, setRecipeShown] = recipiesDisplay();
  const [recipe, setRecipe] = recipeResponse();

  const recipeSection = useRef(null);
  
  const signNewIngredients = (ingredientData) => {
    const newIngredients = ingredientData.get("added-ingredients");

    // handling user ingredients input
    newIngredients === "" ? alert("Please type your ingredient")
    :
    setIngredients(
      prevIngredientItems => [
        ...prevIngredientItems,
        newIngredients
      ]
    )

    console.log(`Adding : ${newIngredients} to your ingredient list`)
  }

  const ingredientsListItems = ingredients.map((ing) => {
    return (
      <li key={ing}>
        {ing}
      </li>
    )
  })

  const showRecipeButtonHanlder = () => {

    // To instruct the button would the user are they 
    // sure to the given ingredient they choose;
    setRecipeShown(recipeShown => !recipeShown)

  }

  // Effect states
  useEffect(
    () => {

      if(!recipeShown) {
        setRecipe(null)
        setRecipe("")
        return;
      }

      // Initializing API abort constructor
      // to become set as clean up after the usage of side-effects
      const abortController = new AbortController();
      const signal = abortController.signal;
      let scrollTimeout = null;

      const getRecipeHandler = async () => {
        // Fetch request retrieve response from API provider
        // and store it inside of state
        try{

          const chefRes = await getRecipeFromMistral(ingredients, {signal});
          setRecipe(chefRes)
          console.log("Fetching...");

          // Scroll behavior after the response were succeeded.
          // to make user notice, the recipe are done;
          scrollTimeout = setTimeout(
            () => {
                if(recipeSection.current) {
                recipeSection.current.scrollIntoView(
                  {
                    behavior: 'smooth',
                    block: 'center'
                  }
                )
              }
            }, 500
          )

        } catch (error){

          console.error("Fail to fetch data!")

        }
      }

      getRecipeHandler()

      return () => {
        // Cleaning unmounted fetch functions
        abortController.abort(); //Cancel ongoing fetch Request
        if (scrollTimeout) clearTimeout(scrollTimeout);
      }      

    }, [recipeShown, ingredients]
  )


  

  
  return (
    <main>
      <form 
        className='add-ingredient-form'
        action={signNewIngredients}
        >

        <input 
          type="text" 
          placeholder='e.g Egg, Chicken, Oregano'
          aria-label='Add ingredient'
          name="added-ingredients"
        />

        <button>
          Add Ingredient
        </button>

      </form>

      <GetRecipeButton
        key={ingredients.id}
        ingredientsList = {ingredients}
        ingredientsListDisplay = {ingredientsListItems}
        recipeGetter = {showRecipeButtonHanlder}
      />

      <GenerateResponse
        recipe = {recipe}
        refScroll={recipeSection}
      />

      
    </main>
  )
}

export default Body
