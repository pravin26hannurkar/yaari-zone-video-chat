import React from 'react';

const AdBanner = ({ slot, style = {}, className = "" }) => {
  React.useEffect(() => {
    // Load AdSense ads when component mounts
    if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // Don't show ads in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={`bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center text-gray-400 ${className}`}>
        <div className="text-sm">Ad Banner Placeholder</div>
        <div className="text-xs mt-1">Slot: {slot}</div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.VITE_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
