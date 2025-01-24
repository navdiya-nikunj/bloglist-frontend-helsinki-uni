import styled from "styled-components";

const LoginContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: space-around;
    margin-left: 10%;
    border: 1px solid gray;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 5px 5px 5px ;
`

const LoginlayoutBg = styled.div`
    background-image: url('/bg1.jpg');
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    background-color: aliceblue;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
`

export { LoginContainer, LoginlayoutBg }