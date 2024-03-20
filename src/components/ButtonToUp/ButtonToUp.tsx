import React from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Button, ButtonContainer } from "./styles";
import useScrollToUp from "../Hooks/useScrollToUp";

function ButtonToUp() {
  const GoToUp = () => {
    useScrollToUp();
  };
  return (
    <ButtonContainer>
      <Button onClick={GoToUp}>
        <MdKeyboardDoubleArrowUp />
      </Button>
    </ButtonContainer>
  );
}

export default ButtonToUp;
