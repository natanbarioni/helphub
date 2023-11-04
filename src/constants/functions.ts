import { PropsDateStamp } from "./Models";

export const formatDate = (dateStamp: PropsDateStamp) => {
  if (dateStamp) {
    const date = new Date(dateStamp.seconds * 1000);

    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    const hora = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");

    const dataFormatada = `${dia}/${mes}/${ano} às ${hora}h:${minutos}`;

    return dataFormatada;
  }
};
