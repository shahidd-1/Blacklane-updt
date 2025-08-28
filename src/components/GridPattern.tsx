import React from 'react';

const GridPattern = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Main grid pattern */}
      <div className="relative w-full h-full">
        {/* Base grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        ></div>
        
        {/* Accent lines - Vertical */}
        <div className="absolute inset-0">
          {/* Primary vertical accent line */}
          <div 
            className="absolute top-0 bottom-0 w-px opacity-40 bg-white"
            style={{
              left: '20%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)'
            }}
          ></div>
          
          {/* Secondary vertical accent line */}
          <div 
            className="absolute top-0 bottom-0 w-px opacity-25 bg-white"
            style={{
              right: '25%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)'
            }}
          ></div>
        </div>
        
        {/* Accent lines - Horizontal */}
        <div className="absolute inset-0">
          {/* Primary horizontal accent line */}
          <div 
            className="absolute left-0 right-0 h-px opacity-35 bg-white"
            style={{
              top: '40%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)'
            }}
          ></div>
          
          {/* Secondary horizontal accent line */}
          <div 
            className="absolute left-0 right-0 h-px opacity-20 bg-white"
            style={{
              bottom: '30%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)'
            }}
          ></div>
        </div>
        
        {/* Intersection points */}
        <div className="absolute inset-0">
          {/* Main intersection point */}
          <div 
            className="absolute w-1 h-1 bg-white opacity-60 rounded-full"
            style={{
              left: '20%',
              top: '40%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
          
          {/* Secondary intersection point */}
          <div 
            className="absolute w-0.5 h-0.5 bg-white opacity-40 rounded-full"
            style={{
              right: '25%',
              bottom: '30%',
              transform: 'translate(50%, 50%)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GridPattern;