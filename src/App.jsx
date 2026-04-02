import React from 'react';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--bg-deep)',
      }}
    >
      {/* Subtle light orb decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-120px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,106,79,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '-100px',
          left: '-60px',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,106,79,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Chat window */}
      <div
        className="relative flex flex-col w-full h-full md:w-[820px] md:h-[92vh] md:rounded-3xl overflow-hidden shadow-xl"
        style={{
          border: '1px solid var(--border)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        }}
      >
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;