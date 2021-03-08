import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";
// constantes globales
const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};
// Inicio
export default function CarouselScreenshots(props) {
  // props
  const { screenshosts, title } = props;
  // state
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);
  // Funciones
  const openImagen = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  return (
    <>
      <Slider {...settings}>
        {map(screenshosts, (screenshost) => (
          <Image
            key={screenshost.id}
            src={screenshost.url}
            alt={screenshost.name}
            onClick={() => openImagen(screenshost.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
