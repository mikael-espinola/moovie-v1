import styled from "styled-components";


export const Container = styled.div`
    background-color: grey;
    color: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.2em;
    overflow: auto;
    z-index: 999;


    @media screen and (min-width: 851px) {
        width: 70%;
        min-height: 400px;
        height: max-content;
    }

    @media screen and (min-width: 580px ) and (max-width: 850px) {
        width: 80%;
        height: 80%;
    }
`

export const CloseButtonContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`
export const Button = styled.button`
    cursor: pointer;
    background: none;
    border: none;
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 850px) {
        display: flex;
        flex-direction: row;
    }
`

export const ImageContainer = styled.div`
    height: max-content;
    display: flex;
    justify-content: center;
    
`
export const Image = styled.img`
    height: 320px;
    width: 220px;
    @media screen and (min-width: 851px) {
        height: 350px;
        width: 350%;
    }
    @media screen and (min-width: 650px ) and (max-width: 850px) {
        height: 320px;
        width: 220px;
    }


`
export const Details = styled.div`
    width: 100%;

    @media screen and (min-width: 850px ) {
        width: 70%;
        height: max-content;
        padding: 0.3em;
    }
    
`
export const TitleContainer = styled.div`
    width: 100%;
    margin: 1em 0;
`
export const Title = styled.h1`
    text-align: center;
    font-size: 22px;
`

export const AvarengeContainer = styled.div`
    border: 2px solid green;
    display: flex;
    justify-content: center;
   
`

export const Average = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 850px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`
export const Rate = styled.h1`
    font-size: 20px;
    margin: 0.1em 0;

`

export const RelasedTime = styled.p`

`
export const OverviewContainer = styled.div`
    padding: 0.5em;
`
export const Overview = styled.p`

`
export const CategoriesContainer = styled.div`
    padding: 1em;
`
export const CategoriesList = styled.ul``
export const CategoriesItem = styled.li``
export const Categories = styled.p`
    
`

export const Iframe = styled.iframe`
    width: 100%;
    height: 250px;
    @media screen and (min-width: 750px) {
        margin-left: 0.5em;
        width: 100%;
        height: 300px;
    }
`

