import React, { useRef } from "react";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Background } from "./styles";
import { Button } from "@components/Controllers/Button";
import { OrderForm } from "@components/Forms/OrderForm";

export function NewOrder() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  return (
    <>
      <Button title="Novo chamado" onPress={handleSnapPress} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["65%"]}
          style={{ padding: 24 }}
          handleIndicatorStyle={{
            width: 60,
            borderRadius: 100,
            backgroundColor: "#00000064",
            marginTop: -8,
          }}
          enablePanDownToClose
          backdropComponent={() => <Background />}
        >
          <BottomSheetView>
            <OrderForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
