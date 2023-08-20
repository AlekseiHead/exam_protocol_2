import React from "react";
import ReactDOM from "react-dom";
//import { createRoot } from "react-dom/client";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  nodules: [
    {
      lung_position: "",
      email: "",
      local: "",
      type_of_nodule: "",
      size_of_finding: "",
      volume: "",
      benign_signs: "",
    },
  ],
};

const ProtocolComponent = () => {
  return (
    <div>
      <h1>Протокол обследования</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="nodules">
              {({ insert, remove, push }: any) => (
                <div>
                  {values.nodules.length > 0 &&
                    values.nodules.map((nodule, index) => (
                      <div className="row" key={index}>
                        <div>Очаг № {index + 1} </div>
                        <div className="col lung-position-select">
                          <label htmlFor={`nodules.${index}.lung_position`}>
                            Расположение легкого:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.lung_position`}
                            placeholder="Выберите расположение"
                            type="text"
                            as="select"
                          >
                            <option value="default"></option>
                            <option value="Левое">Левое</option>
                            <option value="Правое">Правое</option>
                          </Field>
                        </div>
                        <div className="col local-input">
                          <label htmlFor={`nodules.${index}.local`}>
                            Локализация очага:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.local`}
                            placeholder="Укажите локализацию очага..."
                            type="text"
                          />
                        </div>
                        <div className="col type-of-nodule-select">
                          <label htmlFor={`nodules.${index}.type_of_nodule`}>
                            Тип очага:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.type_of_nodule`}
                            placeholder="Выберите расположение"
                            type="text"
                            as="select"
                          >
                            <option value="default"></option>
                            <option value="Солидный">Солидный</option>
                            <option value="Частично солидный">
                              Частично солидный
                            </option>
                            <option value="«Матовое стекло»">
                              «Матовое стекло»
                            </option>
                          </Field>
                        </div>
                        <div className="col size-of-finding-input">
                          <label htmlFor={`nodules.${index}.size_of_finding`}>
                            Размер очага в мм:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.size_of_finding`}
                            placeholder="Укажите размер очага..."
                            type="text"
                          />
                        </div>
                        <div className="col volume-input">
                          <label htmlFor={`nodules.${index}.volume`}>
                            Объём в мм<sup>3</sup>:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.volume`}
                            placeholder="Укажите объем очага..."
                            type="text"
                          />
                        </div>
                        <div className="col benign-signs-select">
                          <label htmlFor={`nodules.${index}.benign_signs`}>
                            Признаки доброкачественности:{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.benign_signs`}
                            placeholder="Выберите признаки..."
                            type="text"
                            as="select"
                          >
                            <option value="Нет">Нет</option>
                            <option value="Кальцинация">Кальцинация</option>
                            <option value="Жир">Жир</option>
                            <option value="Внутрилегочный лимфоузел">
                              Внутрилегочный лимфоузел
                            </option>
                          </Field>
                        </div>
                        <div className="col">
                          <label htmlFor={`nodules.${index}.email`}>
                            Email
                          </label>
                          <Field
                            name={`nodules.${index}.email`}
                            placeholder="jane@acme.com"
                            type="email"
                          />
                          <ErrorMessage
                            name={`nodules.${index}.lung_position`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            Удалить очаг
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ lung_position: "", email: "" })}
                  >
                    Добавить очаг
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Отправить форму</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProtocolComponent;
