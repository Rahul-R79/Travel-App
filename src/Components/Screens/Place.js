import React, { useContext, useEffect, useState } from 'react'
import Header from './Includes/Header'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'

function Place() {
    const {id} = useParams()
    const [place, setPlaces] = useState({name: "",gallery: []})

    const userData = useContext(UserContext)

    useEffect(() =>{
      console.log(userData)
      axios
    .get(`https://traveller.talrop.works/api/v1/places/protected/${id}`,{
      headers:{
        Authorization:`Bearer ${userData.userData.access}`
      }
    })
    .then((response) =>{
      console.log(response.data.data)
      setPlaces(response.data.data)
    })
    .catch((error) =>{
      console.log(error)
    })
    },[])

    const renderFunction = ()=>{
      return place.gallery.map((picture) =>(
        <GalleryImageItem key={picture.id}> 
          <GalleryImage src={picture.image}></GalleryImage>
        </GalleryImageItem>
      ))
    }
    
  return (
    <>
      <Helmet>
        <title>{place.name} | Travel Guide</title>
      </Helmet>
      <Header/>
      <MainContainer>
        <Title>{place.name}</Title>
        <InfoContainer>
            <CategoryName>{place.category_name}</CategoryName>
            <LocationContainer>
                <LocationIcon src={require("../../assets/images/place.svg").default} alt="location"></LocationIcon>
                <LocationName>{place.location}</LocationName>
            </LocationContainer>
        </InfoContainer>
        <GalleryContainer>
            <GalleryImageItem>
                <GalleryImage src={place.image} alt="places"></GalleryImage>
            </GalleryImageItem>
            {renderFunction()}
        </GalleryContainer>
        <SubHeading>Place Description</SubHeading>
        <Description>{place.description}</Description>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.section`
  width: 70%;
  margin: 70px auto 70px;
`
const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;
`
const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`
const CategoryName = styled.span`
  padding: 8px 25px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid blue;
  color: #000;
  margin-right: 15px;
  font-weight: bold;
`
const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`
const LocationIcon = styled.img`
  margin-right: 5px;
`
const LocationName = styled.span`
  color: #9c9c9c;
`
const GalleryContainer = styled.ul`
  display: grid;
  grid-template-columns:repeat(4, 1fr);
  grid-gap: 20px;
`
const GalleryImageItem = styled.li`
  &:first-child{
    grid-column-end: span 2;
    grid-row-end: span 2;
  }
`
const GalleryImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 15px;
`
const SubHeading = styled.h3`
  font-size: 28px;
  margin-bottom: 10px;
` 
const Description = styled.p`
  font-size: 16px;
`

export default Place;