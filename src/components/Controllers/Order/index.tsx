import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps,
  LabelEquipment,
} from "./styles";

export type OrderProps = OrderStyleProps & {
  id: string;
  patrimony: string;
  equipment: string;
  description: string;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
};

type Props = {
  data: OrderProps;
};

export function Order({ data }: Props) {
  const theme = useTheme();

  const date = new Date(data.created_at.seconds * 1000);

  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const ano = date.getFullYear();
  const hora = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");

  const dataFormatada = `${dia}/${mes}/${ano} às ${hora}h:${minutos}`;

  return (
    <Container>
      <Status status={data.status} />

      <Content>
        <Header>
          <Title>{data.description}</Title>
          <MaterialIcons
            name={data.status === "open" ? "hourglass-empty" : "check-circle"}
            size={24}
            color={
              data.status === "open"
                ? theme.COLORS.SECONDARY
                : theme.COLORS.PRIMARY
            }
          />
        </Header>

        <Footer>
          <Info>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={theme.COLORS.SUBTEXT}
            />
            <Label>{dataFormatada}</Label>
          </Info>

          <Info>
            <MaterialIcons
              name="computer"
              size={16}
              color={theme.COLORS.SUBTEXT}
            />
            <Label>{data.patrimony}</Label>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
}
