import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Persist } from "formik-persist";
import ReactSelect from "../ReactSelectComponent/ReactSelectComponent";

import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoIcon from "../../assets/Itmologoblack.svg";
import AlertItem from "../../assets/happylungs.svg";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./styles.css";
//import sendData from "src/utils/sendData/sendData";

interface Values {
  nodules: [
    {
      lung_position: string;
      local: string;
      type_of_nodule: string;
      size_of_finding: string;
      volume: string;
      benign_signs: string;
    }
  ];
  lung_rads: string;
  additional_inf: string;
  additional_inf_1: string;
  expert_required: boolean;
  second_report: string;
  expert_report: string;
}

const ADDITIONAL_INF = [
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
const LUNG_RADS = [
  {
    value: "0 Неполная (неопределенная)",
    label: "0 Неполная (неопределенная)",
  },
  {
    value: "1 Негативная: нет узелков в легких",
    label: "1 Негативная: нет узелков в легких",
  },
  {
    value: "1 Негативная: узелок(и) со специфическими обызвествлениями",
    label: "1 Негативная: узелок(и) со специфическими обызвествлениями",
  },
  {
    value: "2 Доброкачественные изменения: перифиссуральные узелок(и)",
    label: "2 Доброкачественные изменения: перифиссуральные узелок(и)",
  },
  {
    value: "2 Доброкачественные изменения: солидный узелок(и)",
    label: "2 Доброкачественные изменения: солидный узелок(и)",
  },
  {
    value: "2 Доброкачественные изменения: частично солидный узелок(и)",
    label: "2 Доброкачественные изменения: частично солидный узелок(и)",
  },
  {
    value: "2 Доброкачественные изменения: не солидный узелок(и) (GGN)",
    label: "2 Доброкачественные изменения: не солидный узелок(и) (GGN)",
  },
  {
    value: "3 Вероятно доброкачественные: солидный узелок(и)",
    label: "3 Вероятно доброкачественные: солидный узелок(и)",
  },
  {
    value: "3 Вероятно доброкачественные: частично солидный узелок(и)",
    label: "3 Вероятно доброкачественные: частично солидный узелок(и)",
  },
  {
    value: "3 Вероятно доброкачественные: не солидный узелок(и)(GGN)",
    label: "3 Вероятно доброкачественные: не солидный узелок(и)(GGN)",
  },
  {
    value: "4A Подозрительные: солидный узелок(и)",
    label: "4A Подозрительные: солидный узелок(и)",
  },
  {
    value: "4A Подозрительные: частично солидный узелок(и)",
    label: "4A Подозрительные: частично солидный узелок(и)",
  },
  {
    value: "4B Очень подозрительные: 	солидный узелок(и)",
    label: "4B Очень подозрительные: 	солидный узелок(и)",
  },
  {
    value: "4B Очень подозрительные: частично солидный узелок(и)",
    label: "4B Очень подозрительные: частично солидный узелок(и)",
  },
  {
    value: "4X Очень подозрительные",
    label: "4X Очень подозрительные",
  },
  {
    value: "S Другие",
    label: "S Другие",
  },
];
const SECOND_REPORT = [
  {
    value: "",
    label: "...",
  },
  {
    value: "Совпадение",
    label: "Совпадение",
  },
  {
    value: "Присуствуют разночтения",
    label: "Присуствуют разночтения",
  },
];
const EXPERT_REPORT = [
  {
    value: "Пропущен очаг/очаги",
    label: "Пропущен очаг/очаги",
  },
  {
    value: "Разночтения размеров более 1 мм",
    label: "Разночтения размеров более 1 мм",
  },
  {
    value: "Пропущена дополнительная находка",
    label: "Пропущена дополнительная находка",
  },
];

const ProtocolComponent = () => {
  //Dialog
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  //Checkbox expert_required
  const [checkbox, setCheckbox] = useState(false);
  const handleCheck = () => {
    setCheckbox(!checkbox);
  };

  return (
    <div>
      <Formik
        initialValues={{
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
        }}
        onSubmit={async (values: Values) => {
          await new Promise((r) => setTimeout(r, 500));
          /*const max = 20000;
          const smid = Math.floor(Math.random() * max);
          sendData(
            "http://93.100.197.241:5088/sql",
            `INSERT INTO testReport(report_id,radiologist_id,therapist_id, patient_id,research_id, body_of_report) VALUES (${smid}, 126645561,126645561, 10277315, 1, '${JSON.stringify(
              values
            )}' )`
          );*/
          setOpen(!open);
          console.log(JSON.stringify(values, null, 2));
          console.log("Form is submitting!");
        }}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form className="form">
            <AppBar position="static" className="appbar">
              <Container fixed className="toolbar">
                <Box className="toolbar-items">
                  <Typography
                    className="toolbar-text"
                    variant="h6"
                    gutterBottom
                  >
                    Протокол рентгенологического <br></br> исследования DPHT
                  </Typography>
                  <Link href="https://dpht.itmo.ru/" target="_blank">
                    <img src={LogoIcon} alt="ITMO University" />
                  </Link>
                </Box>
              </Container>
            </AppBar>
            <div className="form-paper">
              <FieldArray name="nodules">
                {({ remove, push }: any) => (
                  <Container className="nodules-container">
                    {values.nodules.length > 0 &&
                      values.nodules.map((nodule, index) => (
                        <Grid container className="nodules-items" key={index}>
                          <Grid item className="nodules-index">
                            Очаг № {index + 1}
                          </Grid>
                          <Grid
                            container
                            className="nodules-items-col lung-position-select"
                          >
                            <Grid item xs={12} md={4}>
                              <label htmlFor={`nodules.${index}.lung_position`}>
                                Расположение легкого:{" "}
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.lung_position`}
                                name={`nodules.${index}.lung_position`}
                                className="nodules-items-field"
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
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className="nodules-items-col local-input"
                          >
                            <Grid item xs={12} md={4}>
                              <label htmlFor={`nodules.${index}.local`}>
                                Локализация очага:{" "}
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.local`}
                                name={`nodules.${index}.local`}
                                className="nodules-items-field"
                                placeholder="Укажите локализацию очага..."
                                type="text"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className="nodules-items-col type-of-nodule-select"
                          >
                            <Grid item xs={12} md={4}>
                              <label
                                htmlFor={`nodules.${index}.type_of_nodule`}
                              >
                                Тип очага:
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.type_of_nodule`}
                                name={`nodules.${index}.type_of_nodule`}
                                className="nodules-items-field"
                                //placeholder="Выберите тип..."
                                type="text"
                                as="select"
                              >
                                <option value="" disabled>
                                  Выберите тип...
                                </option>
                                <option value="Солидный">Солидный</option>
                                <option value="Частично солидный">
                                  Частично солидный
                                </option>
                                <option value="«Матовое стекло»">
                                  «Матовое стекло»
                                </option>
                              </Field>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className="nodules-items-col size-of-finding-input"
                          >
                            <Grid item xs={12} md={4}>
                              <label
                                htmlFor={`nodules.${index}.size_of_finding`}
                              >
                                Размер очага в мм:{" "}
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.size_of_finding`}
                                name={`nodules.${index}.size_of_finding`}
                                className="nodules-items-field"
                                placeholder="Укажите размер очага..."
                                type="text"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className="nodules-items-col volume-input"
                          >
                            <Grid item xs={12} md={4}>
                              <label htmlFor={`nodules.${index}.volume`}>
                                Объём в мм<sup>3</sup>:{" "}
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.volume`}
                                name={`nodules.${index}.volume`}
                                className="nodules-items-field"
                                placeholder="Укажите объем очага..."
                                type="text"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className="nodules-items-col benign-signs-select"
                          >
                            <Grid item xs={12} md={4}>
                              <label htmlFor={`nodules.${index}.benign_signs`}>
                                Признаки доброкачественности:
                              </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Field
                                id={`nodules.${index}.benign_signs`}
                                name={`nodules.${index}.benign_signs`}
                                className="nodules-items-field"
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
                            </Grid>
                          </Grid>

                          <Stack
                            className="nodules-items-button"
                            spacing={2}
                            direction="row"
                          >
                            <Button
                              variant="contained"
                              color="error"
                              type="button"
                              className="secondary nodules-items-button-remove"
                              startIcon={<DeleteIcon />}
                              onClick={() => remove(index)}
                            >
                              Удалить очаг
                            </Button>
                          </Stack>
                        </Grid>
                      ))}
                    <Stack className="nodules-button" direction="row">
                      <Button
                        variant="contained"
                        type="button"
                        className="secondary nodules-button-add "
                        startIcon={<AddCircleOutlineIcon />}
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
                      </Button>
                    </Stack>
                  </Container>
                )}
              </FieldArray>

              <Container className="fields">
                <Grid container className="fields-items">
                  <Grid container className="fields-items-col lung-rads-select">
                    <Grid item xs={12} md={4}>
                      <label htmlFor="lung_rads">
                        Категория Lung-RADS 1.1:{" "}
                      </label>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <ReactSelect
                        className="fields-items-select"
                        id="lung_rads"
                        name="lung_rads"
                        placeholder="Выберите категорию..."
                        isMulti={false}
                        options={LUNG_RADS}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className="fields-items-col additional-inf-select"
                  >
                    <Grid item xs={12} md={4}>
                      <label htmlFor="additional_inf">
                        Дополнительные находки (S):{" "}
                      </label>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <ReactSelect
                        className="fields-items-select"
                        id="additional_inf"
                        name="additional_inf"
                        placeholder="Выберите находки..."
                        isMulti={true}
                        options={ADDITIONAL_INF}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className="fields-items-col additional-inf-1-input"
                  >
                    <Grid item xs={12} md={4}>
                      <label htmlFor="additional_inf_1">
                        Другие дополнительные находки (S):{" "}
                      </label>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Field
                        className="nodules-items-field fields-items-select col"
                        id="additional_inf_1"
                        name="additional_inf_1"
                        placeholder="Укажите находки..."
                        type="text"
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className="fields-items-col expert-required-checkbox"
                  >
                    <Grid item xs={12} md={4}>
                      <label htmlFor="expert_required">
                        Необходимость экспертного анализа:{" "}
                      </label>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={8}
                      className="expert-required-checkbox-item"
                    >
                      <Field
                        className="checkbox"
                        type="checkbox"
                        id="expert_required"
                        name="expert_required"
                        onClick={handleCheck}
                      />
                      <p>{checkbox ? "Требуется" : "Не требуется"}</p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className="fields-items-col second-report-select"
                  >
                    <Grid item xs={12} md={4}>
                      <label htmlFor="second_report">
                        Результаты второго пересмотра:{" "}
                      </label>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <ReactSelect
                        className="fields-items-select"
                        id="second_report"
                        name="second_report"
                        placeholder="Выберите результаты..."
                        isMulti={false}
                        options={SECOND_REPORT}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    className="fields-items-col expert-report-select"
                  >
                    <Grid item xs={12} md={4}>
                      <label htmlFor="expert_report">
                        Причины разночтения:{" "}
                      </label>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <ReactSelect
                        className="fields-items-select"
                        id="expert_report"
                        name="expert_report"
                        placeholder="Выберите причину..."
                        isMulti={false}
                        options={EXPERT_REPORT}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Container>

              <Stack spacing={2} direction="row" className="form-buttons">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  endIcon={<SendIcon />}
                >
                  Отправить форму
                </Button>
                <Button
                  type="reset"
                  variant="outlined"
                  color="error"
                  endIcon={<RefreshIcon />}
                >
                  Очистить форму
                </Button>
                <Dialog open={open} onClose={handleClick}>
                  <Alert icon={false} variant="filled" severity="info">
                    <Box className="form-buttons-alert-items">
                      <img
                        src={AlertItem}
                        className="form-buttons-alert-img"
                        alt="Lungs"
                      />
                      <p>Данные успешно отправлены!</p>
                    </Box>
                  </Alert>
                </Dialog>
              </Stack>
            </div>
            <footer className="footer">
              <Container fixed>
                <Box className="footer-contacts">
                  <Typography>
                    Контакты:{" "}
                    <Link
                      href="mailto:dpht1014@itmo.ru"
                      className="link"
                      underline="hover"
                      color="inherit"
                    >
                      dpht1014@itmo.ru
                    </Link>
                  </Typography>

                  <Link href="https://dpht.itmo.ru/" target="_blank">
                    <img
                      src={LogoIcon}
                      alt="ITMO University"
                      className="footer-items-img"
                    />
                  </Link>
                </Box>
                <Typography
                  className="footer-text"
                  align="center"
                  color="textSecondary"
                  component="p"
                  variant="subtitle1"
                >
                  &#169; Цифровые технологии в общественном здоровье
                </Typography>
              </Container>
            </footer>

            <Persist name="exam-protocol-form"></Persist>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProtocolComponent;
