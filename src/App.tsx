import React from "react";
import { styled } from "linaria/react";
import { useSwipeable } from "react-swipeable";

import { nextBlocks, Direction, newBlocks, getColor } from "./blocks";
import useShortcut from "./useShortcut";
import useLocalStorage from "./useLocalStorage";

const Container = styled.div`
  width: 85vw;

  @media (min-width: 768px) {
    width: 768px;
  }

  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  margin: 3.2em 0 2em 0;
  padding: 0.2em 0.4em;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 4em;
  color: #797066;
`;

const Controls = styled.nav`
  margin: auto 0 auto auto;
`;

const Button = styled.button`
  margin: 0 0 0.2em 0.4em;
  padding: 0.24em 0.4em 0.2em 0.4em;

  font-size: 1.4em;
  background: #fd7c64;
  color: #faf7f4;
  border-radius: 0.4em;
  border: none;
`;

const Body = styled.ul<{ disabled: boolean }>`
  width: 80vw;
  height: 80vw;

  @media (min-width: 768px) {
    width: 748px;
    height: 748px;
  }

  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  margin: 0 auto;
  padding: 0;

  background: #bcada1;
  border-radius: 0.4em;
  padding: 0.32em;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const Block = styled.li<{ size: string; bg: string; color: string }>`
  margin: 0.32em;
  padding: 0;

  list-style: none;
  border-radius: 0.4em;
  overflow: hidden;
  background: ${(props) => props.bg};

  display: flex;

  @media (min-width: 768px) {
    border-radius: 0.8em;
  }

  span {
    margin: auto;

    font-size: ${(props) => props.size};
    color: ${(props) => props.color};
    font-weight: 680;
  }
`;

const Failed = styled.div`
  position: relative;
  text-align: center;
  top: 7.2em;
  height: 0;

  @media (min-width: 768px) {
    font-size: 2.4em;
  }

  h1 {
    margin: 0;
    padding: 0;
  }
`;

const Footer = styled.footer`
  margin-top: 0.8em;
`;

const Link = styled.a`
  text-decoration: none;
  font-size: 1.2em;
  margin: auto 0 auto 0.5em;
  color: #797066;
`;

function App() {
  const size = 4;
  const [isEnd, setIsEnd] = useLocalStorage("is-end", false);
  const [blocks, setBlocks] = useLocalStorage("blocks", newBlocks(size));
  const [prevBlocks, setPrevBlocks] = useLocalStorage("blocks-back", blocks);

  const updateBlocks = (direction: Direction) => () =>
    !isEnd &&
    setBlocks((blocks) => {
      const { newBlocks, isFailed } = nextBlocks(blocks, direction, size);
      setIsEnd(isFailed);
      setPrevBlocks(blocks);
      return newBlocks;
    });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: updateBlocks(0),
    onSwipedUp: updateBlocks(1),
    onSwipedRight: updateBlocks(2),
    onSwipedDown: updateBlocks(3),
  });

  useShortcut("left", updateBlocks(0));
  useShortcut("up", updateBlocks(1));
  useShortcut("right", updateBlocks(2));
  useShortcut("down", updateBlocks(3));

  const reset = () => {
    if (!window.confirm("Are you sure?")) return;
    setBlocks(newBlocks(size));
    setIsEnd(false);
  };

  const back = () => {
    setIsEnd(false);
    setBlocks(prevBlocks);
  };

  useShortcut("ctrl+z", back, [back]);

  return (
    <Container>
      <Header>
        <Title>2048</Title>

        <Controls>
          <Button onClick={back}>Back</Button>
          <Button onClick={reset}>Reset</Button>
        </Controls>
      </Header>
      {isEnd && (
        <Failed>
          <h1>That's all, folks!</h1>
        </Failed>
      )}
      <Body disabled={isEnd} {...swipeHandlers}>
        {blocks.map((block, index) => (
          <Block
            bg={getColor(block).background}
            color={getColor(block).font}
            size={block > 512 ? (block > 16000 ? "1.4em" : "1.6em") : "2em"}
            key={`${block}-${index}`}
          >
            <span>{block}</span>
          </Block>
        ))}
      </Body>
      <Footer>
        <Link href="https://github.com/noartem" target="_blank">
          @noartem
        </Link>
      </Footer>{" "}
    </Container>
  );
}

export default App;
