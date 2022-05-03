import styled from "styled-components";

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, 0.4);
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
`

const ActiveSection = styled.section`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, 0.4);
  align-items: center;
  justify-content: center;
  opacity: 1;
  pointer-events: all;
`

const Content  = styled.section`
  margin: 15em 30em;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
`

function Popup({active, setActive, children}:any) {

    if(active){
        return(
            <ActiveSection onClick={() => setActive(false)}>
                <Content onClick={e => e.stopPropagation()}>
                    {children}
                </Content>
            </ActiveSection>
        );
    }

    return(
        <Section onClick={() => setActive(false)}>
            <Content onClick={e => e.stopPropagation()}>
                {children}
            </Content>
        </Section>
    );
}

export default Popup;