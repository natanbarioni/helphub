import React, { useState } from "react";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { Form, Title } from "./styles";
import { Input } from "@components/Controllers/Input";
import { Button } from "@components/Controllers/Button";
import { TextArea } from "@components/Controllers/TextArea";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/Models";
import editActionTypes from "../../../redux/edit/action-types";

export function OrderForm() {
  const { editDescription, editEquipment, editPatrimony, id } = useSelector(
    (rootReducer: RootState) => rootReducer.editReducer
  );
  const dispatch = useDispatch();

  const [patrimony, setPatrimony] = useState(editPatrimony || "");
  const [equipment, setEquipment] = useState(editEquipment || "");
  const [description, setDescription] = useState(editDescription || "");

  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);
    const user = auth().currentUser;

    firestore()
      .collection("orders")
      .add({
        uid: user?.uid,
        patrimony,
        description,
        equipment,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch({
          type: editActionTypes.CLOSE,
        });
        Alert.alert("Chamado", "Chamado aberto com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function handleEditOrder() {
    setIsLoading(true);

    firestore()
      .collection("orders")
      .doc(id)
      .update({
        patrimony,
        description,
        equipment,
      })
      .then(() => {
        dispatch({
          type: editActionTypes.CLOSE,
        });
        Alert.alert("Chamado", "Chamado editado.");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <Form>
      <Title>Novo chamado</Title>
      <Input
        placeholder="Número do Patrimônio"
        value={patrimony}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Equipamento"
        value={equipment}
        onChangeText={setEquipment}
      />
      <TextArea
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title={!id ? "Enviar chamado" : "Editar chamado"}
        isLoading={isLoading}
        onPress={!id ? handleNewOrder : handleEditOrder}
      />
    </Form>
  );
}
