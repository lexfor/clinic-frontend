import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Title = styled.p`
  margin: 0.2em 0em 0em 0em;
  text-align: center;
  font-size: 20em;
  font-weight: bolder;
  background: radial-gradient(circle, rgba(64,156,240,1) 0%, rgba(255,151,247,1) 50%, rgba(151,255,219,1) 100%);
  color:transparent;
  -webkit-background-clip: text;
`

const Paragraph = styled.p`
  margin-bottom: 0em;
  font-size: 1.5em;
  font-weight: bold;
  color: #374084;
  text-align: center;
`

function NotFound() {
    return(
        <Main>
            <Title>404</Title>
            <Paragraph>Oops...</Paragraph>
            <Paragraph>We can't seem to find the page you are looking for.</Paragraph>
        </Main>
    )
}

export default NotFound;