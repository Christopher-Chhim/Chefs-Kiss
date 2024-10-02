import React, { useState } from 'react';

const ChefsKissButton = () => {
  // State to keep track of the number of likes
  const [likes, setLikes] = useState(0);

  // Function to handle click and increment the likes
  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={handleLike}
        style={{
          fontSize: '2rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        💋
      </button>
      <span style={{ marginLeft: '8px', fontSize: '1.5rem' }}>{likes}</span>
    </div>
  );
};

export default ChefsKissButton;