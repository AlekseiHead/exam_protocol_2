import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  nodules: [
    {
      lung_position: "",
      email: "",
    },
  ],
};

const ProtocolComponent = () => {
  return (
    <div>
      <h1>Очаг № 2</h1>
      <img src="./src/assets/26.png" alt="22w2" />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
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
                        <div className="col lung-position__choice">
                          <label htmlFor={`nodules.${index}.lung_position`}>
                            Расположение легкого{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.lung_position`}
                            placeholder="Выберите расположение"
                            type="text"
                          />
                        </div>
                        <div className="col lung-position__choice">
                          <label htmlFor={`nodules.${index}.lung_position`}>
                            Расположение легкого{" "}
                          </label>
                          <Field
                            name={`nodules.${index}.lung_position`}
                            placeholder="Выберите расположение"
                            type="text"
                            as="select"
                          >
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
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

ReactDOM.render(<ProtocolComponent />, document.getElementById("root"));

export default ProtocolComponent;
