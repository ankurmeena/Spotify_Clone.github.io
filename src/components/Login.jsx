import React from 'react'
import { styled } from 'styled-components'
export default function Login() {
  const handleClick = () => {
    const clientId = "b10ea91626e64d6898607b015e84e5cf";
    const redirectUrl = "https://my-spotify-clone-context-api.netlify.app/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played"
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  };
  return <Container>
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black-768x230.png"  alt="spotify" />
    <button onClick={handleClick}>Connet Spotify</button>
  </Container>;
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background-color:#1db954;
gap: 5rem;
img{
height: 20vh;
}
button{
padding: 1rem 5rem;
border-radius: 5rem;
border:solid 2px white;
background: black;
color:#49f585;
font-size: 1.4rem;
cursor: pointer;
}
`;
