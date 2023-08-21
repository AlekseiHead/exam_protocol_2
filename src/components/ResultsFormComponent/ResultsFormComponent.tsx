import React from "react";
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
  lung_rads: "",
  additional_inf: "",
  additional_inf_1: "",
	expert_required: false,
	second_report: "",
	expert_report: "",
};

const ProtocolComponent = () => {
  return (
    <div>
      <h1>Протокол обследования</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
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
														id={`nodules.${index}.lung_position`}
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
                          <label htmlFor={`nodules.${index}.email`}>
                            Email
                          </label>
													<Field
														id={`nodules.${index}.email`}
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
                    onClick={() =>
                      push({
                        lung_position: "",
                        email: "",
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
                <Field
                  id="additional_inf"
                  name="additional_inf"
                  placeholder="Выберите находки..."
                  type="text"
                  as="select"
                >
                  <option value="Нет">Нет</option>
                  <option value="Эмфизема">Эмфизема</option>
                  <option value="Буллы">Буллы</option>
                  <option value="Центральное образование">
                    Центральное образование
                  </option>
                  <option value="Обтурационный ателектаз">
                    Обтурационный ателектаз
                  </option>
                  <option value="Участки «матового стекла»">
                    Участки «матового стекла»
                  </option>
                  <option value="Участки консолидации">
                    Участки консолидации
                  </option>
                  <option value="Признаки туберкулеза">
                    Признаки туберкулеза
                  </option>
                  <option value="Полость в легком">Полость в легком</option>
                  <option value="Признаки мицетомы">Признаки мицетомы</option>
                  <option value="Множественные кисты">
                    Множественные кисты
                  </option>
                  <option value="Ретенционная киста">Ретенционная киста</option>
                  <option value="Диссеминированный процесс">
                    Диссеминированный процесс
                  </option>
                  <option value="Симптом «дерева в почках»">
                    Симптом «дерева в почках»
                  </option>
                  <option value="Центрилобулярные очаги">
                    Центрилобулярные очаги
                  </option>
                  <option value="Типичная ОИП">Типичная ОИП</option>
                  <option value="Интерстициальные неуточненные изменения с фиброзированием">
                    Интерстициальные неуточненные изменения с фиброзированием
                  </option>
                  <option value="Интерстициальные изменения неуточненные">
                    Интерстициальные изменения неуточненные
                  </option>
                  <option value="Бронхоэктазы">Бронхоэктазы</option>
                  <option value="Признаки венозного застоя">
                    Признаки венозного застоя
                  </option>
                  <option value="Гидроторакс">Гидроторакс</option>
                  <option value="Пневмоторакс">Пневмоторакс</option>
                  <option value="Плевральные бляшки">Плевральные бляшки</option>
                  <option value="Образования плевры">Образования плевры</option>
                  <option value="Внтригрудная лимфаденопатия">
                    Внтригрудная лимфаденопатия
                  </option>
                  <option value="Образование средостения">
                    Образование средостения
                  </option>
                  <option value="ГПОД">ГПОД</option>
                  <option value="Кальцинация коронарных артерий">
                    Кальцинация коронарных артерий
                  </option>
                  <option value="Аневризма аорты">Аневризма аорты</option>
                  <option value="Расширение легочных артерий">
                    Расширение легочных артерий
                  </option>
                  <option value="Гидроперикард">Гидроперикард</option>
                  <option value="Узлы щитовидной железы">
                    Узлы щитовидной железы
                  </option>
                  <option value="Образование молочной железы">
                    Образование молочной железы
                  </option>
                  <option value="Образование надпочечников">
                    Образование надпочечников
                  </option>
                  <option value="Образования печени">Образования печени</option>
                </Field>
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
                  placeholder="Выберите причину..."
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
              <button type="submit">Отправить форму</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProtocolComponent;
