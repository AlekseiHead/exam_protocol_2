import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Persist } from "formik-persist";

import "./styles.css";
import ReactSelect from "../ReactSelectComponent/ReactSelectComponent";
//import sendData from "src/utils/sendData/sendData";

const initialValues = {
  nodules: [
    {
      lung_position: "",
      local: "",
      type_of_nodule: "",
      size_of_finding: "",
      volume: "",
      benign_signs: "",
    },
  ],
  lung_rads: "",
  additional_inf: "",
  additional_inf_1: "",
  expert_required: false,
  second_report: "",
  expert_report: "",
};

const additionalInf = [
  {
    value: "Нет",
    label: "Нет",
  },
  {
    value: "Эмфизема",
    label: "Эмфизема",
  },
  {
    value: "Буллы",
    label: "Буллы",
  },
  {
    value: "Центральное образование",
    label: "Центральное образование",
  },
  {
    value: "Обтурационный ателектаз",
    label: "Обтурационный ателектаз",
  },
  {
    value: "Участки «матового стекла»",
    label: "Участки «матового стекла»",
  },
  {
    value: "Участки консолидации",
    label: "Участки консолидации",
  },
  {
    value: "Признаки туберкулеза",
    label: "Признаки туберкулеза",
  },
  {
    value: "Полость в легком",
    label: "Полость в легком",
  },
  {
    value: "Признаки мицетомы",
    label: "Признаки мицетомы",
  },
  {
    value: "Множественные кисты",
    label: "Множественные кисты",
  },
  {
    value: "Ретенционная киста",
    label: "Ретенционная киста",
  },
  {
    value: "Диссеминированный процесс",
    label: "Диссеминированный процесс",
  },
  {
    value: "Симптом «дерева в почках»",
    label: "Симптом «дерева в почках»",
  },
  {
    value: "Центрилобулярные очаги",
    label: "Центрилобулярные очаги",
  },
  {
    value: "Типичная ОИП",
    label: "Типичная ОИП",
  },
  {
    value: "Интерстициальные неуточненные изменения с фиброзированием",
    label: "Интерстициальные неуточненные изменения с фиброзированием",
  },
  {
    value: "Интерстициальные изменения неуточненные",
    label: "Интерстициальные изменения неуточненные",
  },
  {
    value: "Бронхоэктазы",
    label: "Бронхоэктазы",
  },
  {
    value: "Признаки венозного застоя",
    label: "Признаки венозного застоя",
  },
  {
    value: "Гидроторакс",
    label: "Гидроторакс",
  },
  {
    value: "Пневмоторакс",
    label: "Пневмоторакс",
  },
  {
    value: "Плевральные бляшки",
    label: "Плевральные бляшки",
  },
  {
    value: "Образования плевры",
    label: "Образования плевры",
  },
  {
    value: "Внтригрудная лимфаденопатия",
    label: "Внтригрудная лимфаденопатия",
  },
  {
    value: "Образование средостения",
    label: "Образование средостения",
  },
  {
    value: "ГПОД",
    label: "ГПОД",
  },
  {
    value: "Кальцинация коронарных артерий",
    label: "Кальцинация коронарных артерий",
  },
  {
    value: "Аневризма аорты",
    label: "Аневризма аорты",
  },
  {
    value: "Расширение легочных артерий",
    label: "Расширение легочных артерий",
  },
  {
    value: "Гидроперикард",
    label: "Гидроперикард",
  },
  {
    value: "Узлы щитовидной железы",
    label: "Узлы щитовидной железы",
  },
  {
    value: "Образование молочной железы",
    label: "Образование молочной железы",
  },
  {
    value: "Образование надпочечников",
    label: "Образование надпочечников",
  },
  {
    value: "Образования печени",
    label: "Образования печени",
  },
];

const ProtocolComponent = () => {
  return (
    <div>
      <h1>Протокол обследования</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          /*const max = 20000;
          const smid = Math.floor(Math.random() * max);
          sendData(
            "http://93.100.197.241:5088/sql",
            `INSERT INTO testReport(report_id,radiologist_id,therapist_id, patient_id,research_id, body_of_report) VALUES (${smid}, 126645561,126645561, 10277315, 1, '${JSON.stringify(
              values
            )}' )`
          );*/
          console.log(JSON.stringify(values, null, 2));
          console.log("Form is submitting!");
        }}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form>
            <FieldArray name="nodules">
              {({ insert, remove, push }: any) => (
                <div>
                  {values.nodules.length > 0 &&
                    values.nodules.map((nodule, index) => (
                      <div className="row" key={index}>
                        <div className="nodule-index">Очаг № {index + 1} </div>
                        <div className="col lung-position-select">
                          <label htmlFor={`nodules.${index}.lung_position`}>
                            Расположение легкого:{" "}
                          </label>
                          <Field
                            id={`nodules.${index}.lung_position`}
                            name={`nodules.${index}.lung_position`}
                            //placeholder="Выберите расположение"
                            type="text"
                            as="select"
                            required
                          >
                            <option value="" disabled>
                              Выберите расположение...
                            </option>
                            <option value="Левое">Левое</option>
                            <option value="Правое">Правое</option>
                          </Field>
                        </div>
                        <div className="col local-input">
                          <label htmlFor={`nodules.${index}.local`}>
                            Локализация очага:{" "}
                          </label>
                          <Field
                            id={`nodules.${index}.local`}
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
                            id={`nodules.${index}.type_of_nodule`}
                            name={`nodules.${index}.type_of_nodule`}
                            //placeholder="Выберите расположение"
                            type="text"
                            as="select"
                          >
                            <option className="placeholder" value="">
                              Выберите расположение...
                            </option>
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
                            id={`nodules.${index}.size_of_finding`}
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
                            id={`nodules.${index}.volume`}
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
                            id={`nodules.${index}.benign_signs`}
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
                    onClick={() =>
                      push({
                        lung_position: "",
                        local: "",
                        type_of_nodule: "",
                        size_of_finding: "",
                        volume: "",
                        benign_signs: "",
                      })
                    }
                  >
                    Добавить очаг
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="fields">
              <div className="col lung-rads-select">
                <label htmlFor="lung_rads">Категория Lung-RADS 1.1: </label>
                <Field
                  id="lung_rads"
                  name="lung_rads"
                  placeholder="Выберите категорию..."
                  type="text"
                  as="select"
                >
                  <option value="0 Неполная (неопределенная)">
                    0 Неполная (неопределенная)
                  </option>
                  <option value="1 Негативная: нет узелков в легких">
                    1 Негативная: нет узелков в легких
                  </option>
                  <option value="1 Негативная: узелок(и) со специфическими обызвествлениями">
                    1 Негативная: узелок(и) со специфическими обызвествлениями
                  </option>
                  <option value="2 Доброкачественные изменения: перифиссуральные узелок(и)">
                    2 Доброкачественные изменения: перифиссуральные узелок(и)
                  </option>
                  <option value="2 Доброкачественные изменения: солидный узелок(и)">
                    2 Доброкачественные изменения: солидный узелок(и)
                  </option>
                  <option value="2 Доброкачественные изменения: частично солидный узелок(и)">
                    2 Доброкачественные изменения: частично солидный узелок(и)
                  </option>
                  <option value="2 Доброкачественные изменения: не солидный узелок(и) (GGN)">
                    2 Доброкачественные изменения: не солидный узелок(и) (GGN)
                  </option>
                  <option value="3 Вероятно доброкачественные: солидный узелок(и)">
                    3 Вероятно доброкачественные: солидный узелок(и)
                  </option>
                  <option value="3 Вероятно доброкачественные: частично солидный узелок(и)">
                    3 Вероятно доброкачественные: частично солидный узелок(и)
                  </option>
                  <option value="3 Вероятно доброкачественные: не солидный узелок(и)(GGN)">
                    3 Вероятно доброкачественные: не солидный узелок(и)(GGN)
                  </option>
                  <option value="4A Подозрительные: солидный узелок(и)">
                    4A Подозрительные: солидный узелок(и)
                  </option>
                  <option value="4A Подозрительные: частично солидный узелок(и)">
                    4A Подозрительные: частично солидный узелок(и)
                  </option>
                  <option value="4B Очень подозрительные: 	солидный узелок(и)">
                    4B Очень подозрительные: солидный узелок(и)
                  </option>
                  <option value="4B Очень подозрительные: частично солидный узелок(и)">
                    4B Очень подозрительные: частично солидный узелок(и)
                  </option>
                  <option value="4X Очень подозрительные">
                    4X Очень подозрительные
                  </option>
                  <option value="S Другие">S Другие</option>
                </Field>
              </div>
              <div className="col additional-inf-select">
                <label htmlFor="additional_inf">
                  Дополнительные находки (S):{" "}
                </label>
                <ReactSelect
                  id="additional_inf"
                  name="additional_inf"
                  placeholder="Выберите находки..."
                  isMulti={true}
                  options={additionalInf}
                />
              </div>
              <div className="col additional-inf-1-input">
                <label htmlFor="additional_inf_1">
                  Другие дополнительные находки (S):{" "}
                </label>
                <Field
                  id="additional_inf_1"
                  name="additional_inf_1"
                  placeholder="Укажите находки..."
                  type="text"
                />
              </div>
              <div className="col expert-required-checkbox">
                <label htmlFor="expert_required">
                  Необходимость экспертного анализа:{" "}
                </label>
                <Field
                  type="checkbox"
                  id="expert_required"
                  name="expert_required"
                />
              </div>
              <div className="col second-report-select">
                <label htmlFor="second_report">
                  Результаты второго пересмотра:{" "}
                </label>
                <Field
                  id="second_report"
                  name="second_report"
                  placeholder="Выберите результаты..."
                  type="text"
                  as="select"
                >
                  <option value="default"></option>
                  <option value="Совпадение">Совпадение</option>
                  <option value="Присуствуют разночтения">
                    Присуствуют разночтения
                  </option>
                </Field>
              </div>
              <div className="col expert-report-select">
                <label htmlFor="expert_report">Причины разночтения: </label>
                <Field
                  id="expert_report"
                  name="expert_report"
                  //placeholder="Выберите причину..."
                  type="text"
                  as="select"
                >
                  <option value="default"></option>
                  <option value="Пропущен очаг/очаги">
                    Пропущен очаг/очаги
                  </option>
                  <option value="Разночтения размеров более 1 мм">
                    Разночтения размеров более 1 мм
                  </option>
                  <option value="Пропущена дополнительная находка">
                    Пропущена дополнительная находка
                  </option>
                </Field>
              </div>
            </div>
            <div className="buttons">
              <button type="submit" disabled={isSubmitting}>
                Отправить форму
              </button>
              <button type="reset">Reset</button>
            </div>
            <Persist name="exam-protocol-form"></Persist>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProtocolComponent;
