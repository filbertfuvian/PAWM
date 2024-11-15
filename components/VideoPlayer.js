import React from 'react';

const VideoPlayer = ({ videoId, onMarkAsRead }) => {
  const handleVideoEnd = () => {
    // Panggil fungsi untuk menandai video sebagai dibaca
    onMarkAsRead();
  };

  return (
    <div>
      <video controls onEnded={handleVideoEnd} src={`https://example.com/videos/${videoId}.mp4`} />
    </div>
  );
};

export default VideoPlayer;