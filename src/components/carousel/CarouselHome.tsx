import Carousel from 'react-bootstrap/Carousel';


const CarouselHome = () => {

    return(
        <>
            <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/75572-hamburguesa.jpg" alt="" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/wallpaperbetter.com_3840x2160 (1).jpg" alt="" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/wallpaperbetter.com_3840x2160.jpg" alt="" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
    )

}

export default CarouselHome;