import { PrimaryButton } from './Buttons';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MainPageSection = ({ title, description, buttonLabel, link, imageSrc, imageAlign = 'right' }) => {
  const isMobile = useMediaQuery({ maxWidth: 980 });

  const text = (
    <div className="section-txt">
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="section-btn">
        <PrimaryButton to={link}>{buttonLabel}</PrimaryButton>
      </div>
    </div>
  );

  const image = <img className="section-img" src={imageSrc}/>;

  if (isMobile) {
    return (
      <div className="main-page-section">
        {image}
        {text}
      </div>
    );
  }

  const imageStyles = imageAlign === 'right'
    ? { marginLeft: '2rem' }
    : { marginRight: '2rem' };

  return (
    <div className="main-page-section">
      {imageAlign === 'left' ? <div style={imageStyles}>{image}</div> : null}
      {text}
      {imageAlign === 'right' ? <div style={imageStyles}>{image}</div> : null}
    </div>
  );
}

export default MainPageSection;