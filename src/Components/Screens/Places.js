import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import HeaderContainer from './Includes/Header'
import { styled } from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import reactManifest from "react-manifest"
import Image from  "../../assets/images/Icons/icon-144x144.png"
import Image2 from "../../assets/images/Icons/icon-192x192.png"
import Image3 from "../../assets/images/Icons/icon-256x256.png"
import Image4 from "../../assets/images/Icons/icon-384x384.png"
import Image5 from "../../assets/images/Icons/icon-512x512.png"

function Places() {
  const [Places, setPlaces] = useState([])
  useEffect(() =>{
    axios.get("https://traveller.talrop.works/api/v1/places/").then((response) =>{
      console.log(response.data.data)
      setPlaces(response.data.data)
    }).catch((error) =>{
      console.log(error)
    })
  },[])

  useEffect(() => {
    const manifestDetails = {
        name: "Moke Travel",
        short_name: "Moke",
        description: "Travel Guide Application...",
        start_url: "/",
        display: "standalone",
        background_color: "#000",
        theme_color: "#fff",
        scope: "/",
        icons: [
            {
                src: Image,
                type: "image/png",
                sizes: "144x144",
            },
            {
                src: Image2,
                type: "image/png",
                sizes: "192x192",
            },
            {
                src: Image3,
                type: "image/png",
                sizes: "256x256",
            },
            {
                src: Image4,
                type: "image/png",
                sizes: "384x384",
            },
            {
                src: Image5,
                type: "image/png",
                sizes: "512x512",
            },
        ],
    };
    reactManifest.update(manifestDetails, "#manifest-placeholder");
});

  const renderFunction = ()=>{
    return Places.map((place) =>(
        <PlaceCard key={place.id}>
            <PlaceCardLink to={`/places/${place.id}`}>
                <PlaceImage src={place.image} alt={place.name}/>
                <PlaceBottom>
                    <PlaceTitle>{place.name}</PlaceTitle>
                    <Location>
                        <LocationIcon src={require("../../assets/images/place.svg").default} alt="Image"></LocationIcon>
                        <LocationName>{place.location}</LocationName>
                    </Location>
                </PlaceBottom>
            </PlaceCardLink>
        </PlaceCard>
    ))
  }
  return (
    <>
      <Helmet>
        <title>Places ~ Travel | App</title>
      </Helmet>
      <HeaderContainer/>
      <TopContainer>
        <Heading>Welcome John Doe</Heading>
        <Paragraph>Explore the world around you</Paragraph>
      </TopContainer>
      <PlacesContainer>
        {renderFunction()}
      </PlacesContainer>
    </>
  )
}

const TopContainer = styled.section`
  padding: 40px;
` 
const Heading = styled.h1`
  font-size: 40px;
`
const Paragraph = styled.p`
  color: grey;
`
const PlacesContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const PlaceCard = styled.li`
  width: 25%;
  display: flex;
  justify-content: center;
  `
const PlaceCardLink = styled(Link)``
const PlaceImage = styled.img`
  width: 330px;
  display: block;
  border-radius: 8px;
`
const PlaceBottom = styled.div`
  margin: 20px;
`
const PlaceTitle = styled.h3``

const Location = styled.div`
  display: flex;
  align-items: center;
`
const LocationIcon = styled.img`
  width: 15px;
  margin-right: 8px;
`
const LocationName = styled.span``

export default Places;


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
  navigator.serviceWorker.register("/ServiceWorker.js")
  .then(function(registration) {
  console.log("ServiceWorker registration successful with scope: ", registration.scope);
  })
  .catch(function(err) {
  console.log("ServiceWorker registration failed: ", err);
  });
  });
  }