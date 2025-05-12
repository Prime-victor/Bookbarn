import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value,
  size = 'md',
  showValue = true,
  interactive = false,
  onChange
}) => {
  const stars = 5;
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverValue(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverValue(null);
    }
  };
  
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="flex mr-1">
        {[...Array(stars)].map((_, index) => {
          const starValue = index + 1;
          const displayValue = hoverValue !== null ? hoverValue : value;
          const filled = starValue <= displayValue;
          const halfFilled = starValue === Math.ceil(displayValue) && !Number.isInteger(displayValue);
          
          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer' : ''} ${
                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 dark:text-gray-400">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;