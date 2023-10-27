import React, { useState } from "react";

import { Container } from "./styles";
import { Header } from "@components/Layout/Header";
import { Orders } from "@components/Lists/Orders";
import { NewOrder } from "@components/Controllers/NewOrder";

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Header />
      <Orders setIsOpen={setIsOpen}/>
      <NewOrder isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
}
