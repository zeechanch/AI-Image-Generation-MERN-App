import styled from 'styled-components'
import { darkTheme} from '../utils/Theme'
import GenrateImageForm from '../components/GenrateImageForm'
import GenerateImageCard from '../components/GenerateImageCard'
import React, { useState } from 'react'

const Container  = styled.div`
    height: 100%;
    overflow-y: scroll;
    background: ${({theme}) => theme.bg};
    padding: 30px 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 768px){
    padding: 130px 10px 10px;
    }
`;

const Wrapper = styled.div`

  height: fit-content;
  width: 100%;
  max-width: 1200px;
  gap: 8%;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px){
  flex-direction: column;
  }
`;



const CreatePost = () => {
  const [GenerateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({  
    name: "",
    prompt: "",
    photo: "",
    has_nsfw: false,
  })
  return (
    <Container>
      <Wrapper>
      <GenrateImageForm post={post} setPost={setPost} createPostLoading={createPostLoading} setCreatePostLoading={setCreatePostLoading} generateImageLoading={GenerateImageLoading} setGenerateImageLoading={setGenerateImageLoading} />
      <GenerateImageCard loading={GenerateImageLoading} src={post?.photo} hasNsfw={post?.has_nsfw} />
      </Wrapper>
      </Container>
  )
}

export default CreatePost