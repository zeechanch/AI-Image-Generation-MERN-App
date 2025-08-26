import React from 'react'
import styled from 'styled-components'
import Button from './button'
import TextInput from './TextInput'
import { AutoAwesome, CreateRounded } from '@mui/icons-material'
import { generateImage, createPost } from '../api'

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({theme}) => theme.text_primary};
`

const Desc = styled.p`
    font-size: 17px;
    font-weight: 400;
    color: ${({theme}) => theme.text_secondary};
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.text_secondary};
`

const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`

const GenrateImageForm = ({post, setPost, createPostLoading, setCreatePostLoading, generateImageLoading, setGenerateImageLoading}) => {
    const generateImageFun = async () => {
        if (!post.prompt) return;
        
        try {
            setGenerateImageLoading(true);
            console.log('Sending prompt:', post.prompt);
            
            const res = await generateImage({ prompt: post.prompt });
            console.log('Full response from server:', res);
            console.log('Response data:', res?.data);
            
            if (res?.data?.photo) {
                // Check if it's base64 data or a URL
                let photoUrl;
                if (res.data.photo.startsWith('data:')) {
                    // Already formatted as data URL
                    photoUrl = res.data.photo;
                } else if (res.data.photo.startsWith('http')) {
                    // It's a URL
                    photoUrl = res.data.photo;
                } else {
                    // It's base64 data - check if it's JPEG or PNG
                    // JPEG base64 starts with /9j/, PNG starts with iVBOR
                    if (res.data.photo.startsWith('/9j/')) {
                        photoUrl = `data:image/jpeg;base64,${res.data.photo}`;
                    } else {
                        photoUrl = `data:image/png;base64,${res.data.photo}`;
                    }
                }
                
                console.log('Setting photo URL:', photoUrl.substring(0, 100) + '...');
                const hasNsfw = Boolean(res?.data?.has_nsfw);
                setPost({ ...post, photo: photoUrl, has_nsfw: hasNsfw });
            } else {
                console.error('No photo in response:', res);
                console.error('Response structure:', JSON.stringify(res, null, 2));
            }
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setGenerateImageLoading(false);
        }
    };

    const createPostFun = async () => {
        if (!post.name || !post.prompt || !post.photo) {
            console.error('Missing required fields:', { name: post.name, prompt: post.prompt, photo: !!post.photo });
            return;
        }

        try {
            setCreatePostLoading(true);
            console.log('Creating post with data:', { name: post.name, prompt: post.prompt, photoLength: post.photo.length });
            
            const postData = {
                name: post.name,
                prompt: post.prompt,
                photo: post.photo
            };
            
            const response = await createPost(postData);
            console.log('Post created successfully:', response);
            
            // Reset form after successful post
            setPost({
                name: "",
                prompt: "",
                photo: ""
            });
            
            // Show success message (you could add a toast notification here)
            alert('Image posted successfully to the community!');
            
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to post image. Please try again.');
        } finally {
            setCreatePostLoading(false);
        }
    };

    return (
        <Form>
            <Top>
                <Title>Generate an Image</Title>
                <Desc>Write your prompt according to the image you want to generate</Desc>
            </Top>
           <Body>
            <TextInput label="Author" placeholder="Enter your name..." name="name" value={post.name} onChange={(e) => setPost({...post, name: e.target.value})}/>
            <TextInput label="Image prompt" placeholder="Write a detailed prompt about the image you want to generate . . ." name="prompt" rows="8" textArea value={post.prompt} onChange={(e) => setPost({...post, prompt: e.target.value})}/>
           * * You can post the AI generated image to the community * *
           </Body>
           <Actions>
            <Button text="Generate Image" flex leftIcon={<AutoAwesome/>} isLoading={generateImageLoading} isDisabled={post.prompt === ""} onClick={generateImageFun} />
            <Button text="Post Image" flex type="secondary" leftIcon={<CreateRounded/>} isLoading={createPostLoading} isDisabled={post.name === "" || post.prompt === "" || post.photo === ""} onClick={createPostFun} />
           </Actions>
        </Form>
    );
};

export default GenrateImageForm