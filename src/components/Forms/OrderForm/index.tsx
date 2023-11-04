import React, { useState } from "react";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { Form, Title } from "./styles";
import { Input } from "@components/Controllers/Input";
import { Button } from "@components/Controllers/Button";
import { TextArea } from "@components/Controllers/TextArea";
import { Alert } from "react-native";

export function OrderForm() {
  const [patrimony, setPatrimony] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
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
      .then(() => Alert.alert("Chamado", "Chamado aberto com sucesso!"))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <Form>
      <Title>Novo chamado</Title>
      <Input placeholder="Número do Patrimônio" onChangeText={setPatrimony} />
      <Input placeholder="Equipamento" onChangeText={setEquipment} />
      <TextArea placeholder="Descrição" onChangeText={setDescription} />

      <Button
        title="Enviar chamado"
        isLoading={isLoading}
        onPress={handleNewOrder}
      />
    </Form>
  );
}
