import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const gradientLoop = keyframes`
  0%   { background-position: 200% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
    flex: 1;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    position: relative;
    color: ${({theme}) => theme.arrow+80};
    border-radius: 20px;
    background: transparent;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        padding: 2px;
        background: linear-gradient(
          90deg,
          #00B2B2,
          #008C8F,
          #005B5C,
          #002D32,
          #00B2B2
        );
        background-size: 200% 100%;
        animation: ${gradientLoop} 4s linear infinite;
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        z-index: 0;
    }
    
    & > * {
        position: relative;
        z-index: 1;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background-color: ${({theme}) => theme.black+50};
`

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
`

const ErrorMessage = styled.div`
    color: ${({theme}) => theme.red || '#ff4444'};
    text-align: center;
    padding: 20px;
`

const DebugInfo = styled.div`
    font-size: 12px;
    color: ${({theme}) => theme.text_secondary};
    word-break: break-all;
    max-width: 100%;
    padding: 10px;
    background: rgba(0,0,0,0.1);
    border-radius: 8px;
`

const Banner = styled.div`
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: 0 0 24px 24px;
      background: #141414;
    color: red;
    font-size: 28px;
    font-weight: bold;
    backdrop-filter: blur(6px);
`;

const GenerateImageCard = ({src, loading, hasNsfw}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    console.error('Image src was:', src);
    setImageError(true);
    setImageLoaded(false);
  };

  // Reset states when src changes
  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    if (src) {
      console.log('Image src changed to:', src.substring(0, 100) + '...');
    }
  }, [src]);

  return (
    <Container>
        {
            loading ? (
            <> 
            <CircularProgress style={{color: "inherit", width: "24px", height: "24px"}} />
            Generating your image...
            </> 
        
        ) : (
                <>
                    {
                        src ? (
                            <ImageWrapper>
                                <Image 
                                    src={src} 
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    alt="Generated AI image"
                                    crossOrigin="anonymous"
                                />
                                {hasNsfw && (
                                    <Banner>
                                        <p>Buddy I know your ip address</p>
                                    </Banner>
                                )}
                                {imageError && (
                                    <ErrorMessage>
                                        Failed to load image. The URL might be invalid or inaccessible.
                                        <br />
                                        Error details logged to console.
                                    </ErrorMessage>
                                )}
                            </ImageWrapper>
                        ) : (
                            <>write a prompt to generate an image</>
                        )
                    }
                </>
            )
        }
    </Container>
  )
}

export default GenerateImageCard