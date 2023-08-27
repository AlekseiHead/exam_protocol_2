import React from "react";

const sendData = async (url: RequestInfo | URL, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${URL}, статус ошибки ${response}`);
  }
  return await response.json();
};
export default sendData;