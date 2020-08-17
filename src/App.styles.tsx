import { styled } from "linaria/react";

export const Container = styled.div`
  width: 85vw;

  @media (min-width: 768px) {
    width: 768px;
  }

  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  margin: 3.2em 0 2em 0;
  padding: 0.2em 0.4em;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 4em;
  color: #797066;
`;

export const Score = styled.div`
  margin: 0 0 0 0.4em;
  font-size: 1.2em;
`;

export const Info = styled.nav`
  margin: auto 0 auto auto;
`;

export const Controls = styled.nav``;

export const Button = styled.button`
  margin: 0 0 0.2em 0.4em;
  padding: 0.24em 0.4em 0.2em 0.4em;

  font-size: 1.4em;
  background: #fd7c64;
  color: #faf7f4;
  border-radius: 0.4em;
  border: none;
`;

export const Body = styled.ul<{ disabled: boolean }>`
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

export const Block = styled.li<{ size: string; bg: string; color: string }>`
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

export const Failed = styled.div`
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

export const Footer = styled.footer`
  margin-top: 0.8em;
`;

export const Link = styled.a`
  text-decoration: none;
  font-size: 1.2em;
  margin: auto 0 auto 0.5em;
  color: #797066;
`;
