import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Background } from "./styles";
import { Button } from "@components/Controllers/Button";
import { OrderForm } from "@components/Forms/OrderForm";
import { RootState } from "src/redux/Models";

export function NewOrder() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { isOpen } = useSelector(
    (rootReducer: RootState) => rootReducer.editReducer
  );
  const dispatch = useDispatch();

  const onDismiss = () => {
    dispatch({
      type: "edit/close",
    });
  };

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  function handleClose() {
    bottomSheetRef.current?.forceClose();
  }

  useEffect(() => {
    isOpen && handleSnapPress();
    !isOpen && handleClose();
  }, [isOpen]);

  return (
    <>
      <Button title="Novo chamado" onPress={handleSnapPress} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          onDismiss={() => onDismiss()}
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
