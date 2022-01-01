export function StarRating ({rating}) {
    const onSetRating = (idx) => {
      const target = {name: 'rating', value: idx};
      handleChange({target});
    };
  
      return (
        <div >
          {[...Array(5)].map((star, idx) => {
            idx += 1;
            return (
              <span
                type="button"
                key={idx}
                className={idx <= rating ? 'fas fa-star on' : 'fas fa-star off'}
                onClick={() => onSetRating(idx)}
              >
              </span>
            );
          })}
        </div>
      );
    
  }