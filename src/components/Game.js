import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInterval from "../hooks/use-interval.hook";
import { Link } from "react-router-dom";
import Item from "./Item";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
 
  const [cookieCount, setCookieCount] = useState(10000);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });


  const handleClick = (item) => {
    console.log(item);
    if (cookieCount < item.cost) {
      window.alert("No more cookies");
    } else {
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
      setCookieCount(cookieCount - item.cost);
    }
  };

  const calculateCookiesPerTick = () => {
    const cursor = purchasedItems.cursor * items[0].value;
    const grandma = purchasedItems.grandma * items[1].value;
    const farm = purchasedItems.farm * items[2].value;

    const totalValue = cursor + grandma + farm;
    return totalValue;
  };
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setCookieCount(cookieCount + numOfGeneratedCookies);
  }, 1000);

  const onKeyDown = (ev) => {
    ev.preventDefault();
    if (ev.code === "Space") {
      handleCookieClick();
    }
  };
  const handleCookieClick = () => {
    setCookieCount(cookieCount + 1);
  };

  useEffect(() => {
    document.title = `${cookieCount} cookies - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [cookieCount]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Wrapper> 
      <GameArea>
        <Indicator>
          <Total>{cookieCount} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button  onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        <Item
          items={items}
          numOwned={purchasedItems}
          handleClick={handleClick}
        />
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
