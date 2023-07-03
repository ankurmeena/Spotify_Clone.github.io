import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utilities/StateReducer";
import { reducerCases } from "../utilities/Constants";
export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing ",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
        if(response.data!==""){
          const {item}=response.data;
          const currentlyPlaying={
            id:item.id,
            name:item.name,
            artists:item.artists.map((artist)=>artist.name),
            image:item.album.images[2].url,
          };  
      dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
        }
    };
    getCurrentTrack();
    },[token,dispatch]);
  return <Container>
      {
        currentlyPlaying&&(
          <div className="track">
            <div className="track_image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
            </div>
            <div className="track_info">
            <h4 className="track__info__track__name">{currentlyPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentlyPlaying.artists.join(", ")}
            </h6>
            </div>
          </div>
        )
      }
    </Container>
}
const Container=styled.div`
.track{
  display:flex;
  align-items:center;
  gap:1rem;
  &_info{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    &__track__name {
        color: white;
      }
    &__track__artists {
        color: #b3b3b3;
      }
  }  
} 
`;
