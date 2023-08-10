import { useContext,useEffect,useState } from 'react'
import { ToolContext } from '../../App'
import '../../styles/GridView.css'
import BookMark from './BookMark'


const GridView = ({ currentProducts }) => {
  const { handelBookmarkAdd, bookmarks, deleteres, darkMode } =
    useContext(ToolContext)
    const [showAlert, setShowAlert] = useState(false);
    const [text,setText] = useState("");
    

  const handleShareClick = async (product) => {
    try {
      if (navigator.share) {
        let customShareLink = `${
          window.location.href.split('?')[0]
        }?q=${encodeURIComponent(product.productName)}`

        await navigator.share({
          title: product.productName,
          text: product.description,
          url: customShareLink,
        })
      } else {
        // Fallback for browsers that do not support the Web Share API
        const customShareLink = `${
          window.location.origin
        }/?q=${encodeURIComponent(product.productName)}`

        // Copy the link to the clipboard
        await navigator.clipboard.writeText(customShareLink)
        alert('Link copied!')
        console.log('Web Share API is not supported in this browser.')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

 

  return (
    <main className={`grid ${darkMode ? 'dark-mode' : ''}`}>
      {currentProducts.map((product, index) => {
        const [imageWidth, setImageWidth] = useState(null)

        useEffect(() => {
          // Create an Image object
          const image = new Image()

          // Set up a listener for the image's onload event
          image.onload = () => {
            setImageWidth(image.height)
          }

          // Set the image source URL to trigger the onload event
          image.src = product.image
        }, [product.image])


       
        return (
          <article key={index}>
            <BookMark  showAlert={showAlert} setShowAlert={()=>setShowAlert()} text={text}/>
            <div className="text_top">
              {product.image ? (
                <div className={`card-image ${imageWidth && imageWidth!==null  < 350 && "tag"}`}>
                  <img
                    className={` ${darkMode ? 'dark-mode' : ''} zoomImg`}
                    src={product.image}
                    alt="product-img"
                    onError={(e) => {
                      e.target.src = 'https://i.ibb.co/9H0s34n/default-img.jpg'
                    }}
                  />
                </div>
              ) : (
                <img
                  className={`card-image ${darkMode ? 'dark-mode' : ''}`}
                  src="https://i.ibb.co/9H0s34n/default-img.jpg"
                  alt="Default"
                />
              )}
              <h2 className={`card-title ${darkMode ? 'dark-mode' : ''}`}>
                {product.productName.charAt(0).toUpperCase() +
                  product.productName.slice(1)}
              </h2>

              {/* Share icon and implement the click event */}
              <button
                className={`share-icon`}
                onClick={() => handleShareClick(product)}
              >
                <i
                  className="ri-share-line"
                  style={{ color: darkMode ? 'white' : '' }}
                ></i>
              </button>
            </div>
            <p className={`card-description ${darkMode ? 'dark-mode' : ''}`}>
              {product.description}
            </p>
            <div className="btn-cont">
              <a target="_blank" href={product.link}>
                <button className={`visit ${darkMode ? 'dark-mode' : ''}`}>
                  <font size="4">Visit</font>
                </button>
              </a>
              {bookmarks.some(
                (obj) => obj['productName'] === product.productName
              ) ? (
                <button
                  className={`delete ${darkMode ? 'dark-mode' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteres(product)
                    setShowAlert(true)
                    setText("BookMark Deleted successfully")
                  }}
                >
                  Delete
                  <i
                    className={`ri-bookmark-fill ${
                      darkMode ? 'dark-mode' : ''
                    }`}
                  ></i>
                </button>
              ) : (
                <button
                  className={`bookmark ${darkMode ? 'dark-mode' : ''}`}
                  onClick={() => {handelBookmarkAdd(product);  setShowAlert(true);setText("Website Added successfully")}}
                >
                  <font size="4">Bookmark</font>
                </button>
              )}
            </div>
          </article>
        )
      })}
    </main>
  )
}

export default GridView
