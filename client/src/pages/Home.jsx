import styled, { keyframes } from 'styled-components'
import { darkTheme} from '../utils/Theme'
import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react'
import ImageCard from '../components/ImageCard';
import { getPosts } from '../api';

const Container  = styled.div`
    height: 100%;
    overflow-y: scroll;
    background: ${({theme}) => theme.bg};
    padding: 30px 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px){
    padding: 6px 10px;
    }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({theme}) => theme.text_primary};
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px){
    font-size: 22px;
  }
`;


const gradientLoop = keyframes`
  0%   { background-position: 200% 50%; }
  100% { background-position: 0% 50%; }
`;

const PremiumGradientLoop = styled.span`
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

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;


const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(45deg, #FFB8FF, #FF2EFF, #D100D1, #470047);

  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;

  @media (max-width: 600px) {
  font-size: 20px;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper =  styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  
  @media(min-width:1200px){
  grid-template-columns: repeat(4,1fr);
  }

  @media(min-width: 640px) and (max-width: 1199px){
  grid-template-columns: repeat(3,1fr);
  }

  @media(max-width: 639px){
  grid-template-columns: repeat(2,1fr);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${({theme}) => theme.text_secondary};
  font-size: 18px;
  padding: 40px;
`;

const NoPostsMessage = styled.div`
  text-align: center;
  color: ${({theme}) => theme.text_secondary};
  font-size: 18px;
  padding: 40px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      
      // The API returns {success: true, data: [...]}
      if (response?.data?.success && response?.data?.data) {
        setPosts(response.data.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  const normalizedQuery = query.trim().toLowerCase();
  const visiblePosts = normalizedQuery
    ? posts.filter((post) => {
        const name = String(post?.name || "").toLowerCase();
        const prompt = String(post?.prompt || "").toLowerCase();
        return name.includes(normalizedQuery) || prompt.includes(normalizedQuery);
      })
    : posts;

  return (
    <Container>
      <Headline>
        <p>Explore Popular posts in the community!</p>
        <PremiumGradientLoop>⦿ Generated with AI ⦿</PremiumGradientLoop>
      </Headline>
      
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Wrapper>
        <CardWrapper>
          {loading ? (
            <LoadingMessage>Loading posts...</LoadingMessage>
          ) : error ? (
            <div>
              <NoPostsMessage>{error}</NoPostsMessage>
              <button onClick={handleRefresh}>Try Again</button>
            </div>
          ) : posts.length === 0 ? (
            <NoPostsMessage>No posts yet. Be the first to create one!</NoPostsMessage>
          ) : visiblePosts.length === 0 && normalizedQuery ? (
            <NoPostsMessage>No results for "{query}"</NoPostsMessage>
          ) : (
            visiblePosts.map((post, index) => (
              <ImageCard 
                key={post._id || index} 
                item={{
                  photo: post.photo,
                  author: post.name,
                  prompt: post.prompt
                }} 
              />
            ))
          )}
        </CardWrapper>
      </Wrapper>
    </Container>
  )
}

export default Home