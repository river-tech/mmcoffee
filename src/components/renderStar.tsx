import React from 'react'
import { GoStar, GoStarFill } from 'react-icons/go';

const RenderStar = ({ratingindex} : {ratingindex :number}) => {
    const rating = ratingindex;
     const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            rating <= i ? (
              <GoStar key={i}  />
            ) : (
              <GoStarFill key={i} className="primary_text" />
            )
          );
        }
        return stars;
      };
  return (
    <>
        {renderStars(rating)}
    </>
  )
}

export default RenderStar
