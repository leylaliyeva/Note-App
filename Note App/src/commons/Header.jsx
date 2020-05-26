import React from 'react'
import styled from "styled-components"
import {NavLink} from "react-router-dom"
export const Header=()=>{
    return(
        <div>
        <header>
            <Apptext>NotesApp</Apptext>
        </header>
        <StyledNavLink exact to="/">Actual</StyledNavLink>
        <StyledNavLink to="/archive">Archive</StyledNavLink>
        <StyledNavLink to="/create">Create</StyledNavLink>
        </div>
    )
};

const Apptext=styled.div`
    font-weight:italic;
    font-size:40px;
`

//duzelis et 

const StyledNavLink =styled(NavLink)`
    color:black;
    text-decoration:none;
`