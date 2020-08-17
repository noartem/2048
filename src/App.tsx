import React from "react";
import { useSwipeable } from "react-swipeable";

import { nextBlocks, Direction, newBlocks, getColor } from "./blocks";
import {
  Container,
  Header,
  Title,
  Score,
  Info,
  Controls,
  Button,
  Failed,
  Body,
  Block,
  Footer,
  Link,
} from "./App.styles";
import useShortcut from "./useShortcut";
import useLocalStorage from "./useLocalStorage";

function App() {
  const size = 4;
  const [isEnd, setIsEnd] = useLocalStorage("is-end", false);
  const [score, setScore] = useLocalStorage("score", 0);
  const [prevScore, setPrevScore] = useLocalStorage("score-back", score);
  const [blocks, setBlocks] = useLocalStorage("blocks", newBlocks(size));
  const [prevBlocks, setPrevBlocks] = useLocalStorage("blocks-back", blocks);

  const updateBlocks = (direction: Direction) => () =>
    !isEnd &&
    setBlocks((blocks) => {
      const { newBlocks, isFailed, newScore } = nextBlocks(
        blocks,
        direction,
        size
      );

      setIsEnd(isFailed);
      setPrevBlocks(blocks);
      setScore((score) => {
        setPrevScore(score);
        return score + newScore;
      });

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
    setScore(prevScore);
  };

  useShortcut("ctrl+z", back, [back]);

  return (
    <Container>
      <Header>
        <Title>2048</Title>

        <Info>
          <Controls>
            <Button onClick={back}>Back</Button>
            <Button onClick={reset}>Reset</Button>
          </Controls>
          <Score>Score: {score}</Score>
        </Info>
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
