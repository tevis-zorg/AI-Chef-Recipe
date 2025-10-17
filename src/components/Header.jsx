import './Header.css'

const Header = (props) => {
  return (
    <article className='header-container'>

      <div className="icon-container">

        <img 
          className='header-image-container'
          src={props.img.src}
        />

      </div>

      <div className="info-container">

        <h2 className="header">
          {props.title}
        </h2>

      </div>
    </article>
  )
}

export default Header

