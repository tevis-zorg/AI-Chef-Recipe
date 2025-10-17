import ReactMarkdown from 'react-markdown'

export const GenerateResponse = (props) => {
  return (
    <>
      {
        // If recipe is done, then show the formatted response;
        props.recipe
        &&
        <section 
        className='suggested-recipe-container' aria-live='polite'>
          <h2 ref={props.refScroll}>AI Chef Recommends : </h2>
          <ReactMarkdown>
            {props.recipe}
          </ReactMarkdown>
        </section>
        
      }
    </>
  )
}
