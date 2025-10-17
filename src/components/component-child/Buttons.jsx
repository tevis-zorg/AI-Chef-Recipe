export const GetRecipeButton = (props) => {

  return (
    <>
      {
        // display <section> if ingredient > 0
        props.ingredientsList.length > 0
        &&
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">{props.ingredientsListDisplay}</ul>
          {
            // specifies ingredient to must more than 3 ingredients
            props.ingredientsList.length <= 3 ?
            <h3> Please input at least 4 ingredients. </h3>
            :
            <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.recipeGetter}>
                  Get a recipe
                </button>
            </div>
          }
        </section>
      }
    </>
  )
}
