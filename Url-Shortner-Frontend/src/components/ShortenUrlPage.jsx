import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      // Remove trailing slash from backend URL if present
      const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
      // Remove leading slash from short code
      const shortCode = url.replace(/^\/+/, "");

      if (backendUrl) {
        window.location.href = `${backendUrl}/${shortCode}`;
      } else {
        window.location.href = `/${shortCode}`;
      }
    }
  }, [url]);

  return <p>Redirecting...</p>;
};

export default ShortenUrlPage;
