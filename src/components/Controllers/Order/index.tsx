import React from "react";
import { useDispatch } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Alert } from "react-native";

import { formatDate } from "../../../../src/constants/functions";
import firestore from "@react-native-firebase/firestore";

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
} from "./styles";
import { OrderProps } from "./Models";
import editActionTypes from "../../../redux/edit/action-types";

export function Order({ data }: OrderProps) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handlerEdit = () => {
    dispatch({
      type: editActionTypes.OPEN,
    });
    dispatch({
      type: editActionTypes.EDIT,
      payload: {
        id: data.id,
        editPatrimony: data.patrimony,
        editEquipment: data.equipment,
        editDescription: data.description,
      },
    });
  };

  function handlerDeleteOrder() {
    firestore()
      .collection("orders")
      .doc(data.id)
      .delete()
      .then(() => {
        Alert.alert("Chamado deletado.");
      })
      .catch((error) => console.log(error));
  }

  const handlerOrder = () => {
    Alert.alert("O que deseja fazer?", "Escolha uma opção", [
      {
        text: "Excluir",
        onPress: () => handlerDeleteOrder(),
      },
      {
        text: "Editar",
        onPress: () => handlerEdit(),
        style: "cancel",
      },
      { text: "Cancelar", onPress: () => null },
    ]);
  };

  return (
    <Container activeOpacity={0.5} onPress={handlerOrder}>
      <Status status={data.status} />

      <Content>
        <Header>
          <Title>{data.equipment}</Title>
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
            <Label>{formatDate(data.created_at)}</Label>
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
