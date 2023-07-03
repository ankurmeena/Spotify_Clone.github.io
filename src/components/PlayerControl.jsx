import React from 'react'
import { styled } from 'styled-components'
import axios from "axios";
import { useStateProvider } from "../utilities/StateReducer";
import { reducerCases } from "../utilities/Constants";
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev} from 'react-icons/cg';
import {FiRepeat} from 'react-icons/fi'
export default function PlayerControl(){
    const [{ token, playerState }, dispatch] = useStateProvider();
      const changeTrack = async (type) => {
        await axios.post(
          `https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({ type: reducerCases.SET_PLAY_STATE, playerState: true });
        const response1 = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response1.data !== "") {
          const currentlyPlaying = {
            id: response1.data.item.id,
            name: response1.data.item.name,
            artists: response1.data.item.artists.map((artist) => artist.name),
            image: response1.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
        }
      };
      const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
          `https://api.spotify.com/v1/me/player/${state}`,
          {},
          {
            headers: {
               Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: reducerCases.SET_PLAY_STATE,playerState: !playerState});
      };
  return <Container>
    <div className="shuffle">
       <BsShuffle/>
    </div>
    <div className="previous">
       <CgPlayTrackPrev onClick={()=>changeTrack("previous")}/>
    </div>
    <div className="state">
     {playerState? <BsFillPauseCircleFill onClick={()=>changeState()}/>:<BsFillPlayCircleFill onClick={()=>changeState()}/>}
    </div>
    <div className="next">
        <CgPlayTrackNext onClick={()=>changeTrack("next")}/>
    </div>
    <div className="repeat">
        <FiRepeat/>
    </div>
  </Container>
};
const Container=styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:2rem;
svg{
    color:#b3b3b3;
    &:hover{
        color:white;
    }
    .state {
      svg {
         color: white;
        }
    }
}
.previous,.next,.state {
    font-size: 3rem;
}

`;
