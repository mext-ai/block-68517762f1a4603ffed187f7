import React from 'react';

interface BlockProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

const Block: React.FC<BlockProps> = ({ 
  title = "Placeholder Image Block",
  description = "This block contains a placeholder image",
  imageUrl = "https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Placeholder+Image",
  imageAlt = "Placeholder image",
  width = 600,
  height = 400
}) => {
  
  // Send completion event on first interaction
  React.useEffect(() => {
    const sendCompletion = () => {
      window.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: '68517762f1a4603ffed187f7', 
        completed: true 
      }, '*');
      window.parent.postMessage({ 
        type: 'BLOCK_COMPLETION', 
        blockId: '68517762f1a4603ffed187f7', 
        completed: true 
      }, '*');
    };

    // Send completion immediately for content blocks
    sendCompletion();
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    gap: '20px'
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid #ddd'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    margin: '0'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: '1.5',
    margin: '0'
  };

  const imageInfoStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={descriptionStyle}>{description}</p>
      
      <div>
        <img 
          src={imageUrl}
          alt={imageAlt}
          style={imageStyle}
          width={width}
          height={height}
          onError={(e) => {
            // Fallback to a different placeholder service if the primary fails
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/${width}/${height}?grayscale`;
          }}
        />
        <p style={imageInfoStyle}>
          Dimensions: {width} × {height}px
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ fontSize: '12px', color: '#aaa' }}>
          This is a placeholder image. You can customize the URL, dimensions, and styling through the component props.
        </p>
      </div>
    </div>
  );
};

export default Block;