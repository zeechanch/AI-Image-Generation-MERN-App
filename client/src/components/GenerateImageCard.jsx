import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: 2px dashed ${({theme}) => theme.yellow};
    color: ${({theme}) => theme.arrow+80};
    border-radius: 20px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background-color: ${({theme}) => theme.black+50};
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

const GenerateImageCard = ({src, loading}) => {
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
                            <>
                                <Image 
                                    src={src} 
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                    alt="Generated AI image"
                                    crossOrigin="anonymous"
                                />
                                {imageError && (
                                    <ErrorMessage>
                                        Failed to load image. The URL might be invalid or inaccessible.
                                        <br />
                                        Error details logged to console.
                                    </ErrorMessage>
                                )}
                            </>
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