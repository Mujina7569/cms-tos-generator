import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const KofiButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      kofiwidget2.init('Support Me on Ko-fi', '#29abe0', 'D1D15QW3O');
      kofiwidget2.draw();
    };

    return () => {
      // Clean up the script to avoid memory leaks when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <style>
        {`
          #kofi-button {
            background-color: #29abe0;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          #kofi-button:hover {
            background-color: #1c7a99;
          }
        `}
      </style>
      <Button id="kofi-button">Support Me on Ko-fi</Button>
    </div>
  );
};

export default KofiButton;
