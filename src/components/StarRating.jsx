
 const StarRating=({rating})=>{
    const numberOfStars = Math.min(5, Math.max(0, Math.round(rating))); // Ensure rating is between 0 and 5
  
    return (
      <div>
        {Array.from({ length: numberOfStars }, (_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
    );
  }
  export default StarRating;