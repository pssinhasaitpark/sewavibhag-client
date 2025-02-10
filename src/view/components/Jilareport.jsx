import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Jilareport.css";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const validationSchema = Yup.object({
  mahanagar: Yup.object({
    zila_sam_mahanagar_bhag_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_sankhya: Yup.number().required("This field is required"),
    sewa_kary_yukt_sewa_basti: Yup.number().required("This field is required"),
    vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_palak_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_karyakarta_yukt_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    kul_sewa_karyakarta: Yup.number().required("This field is required"),
    mahanagar_mein_kul_sewa_kary: Yup.number().required(
      "This field is required"
    ),
    masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
      Yup.number().required("This field is required"),
  }),
  jilaKendra: Yup.object({
    zila_sam_mahanagar_bhag_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_sankhya: Yup.number().required("This field is required"),
    sewa_kary_yukt_sewa_basti: Yup.number().required("This field is required"),
    vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_palak_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_karyakarta_yukt_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    kul_sewa_karyakarta: Yup.number().required("This field is required"),
    mahanagar_mein_kul_sewa_kary: Yup.number().required(
      "This field is required"
    ),
    masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
      Yup.number().required("This field is required"),
  }),
  anyaNagar: Yup.object({
    zila_sam_mahanagar_bhag_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_sankhya: Yup.number().required("This field is required"),
    sewa_kary_yukt_sewa_basti: Yup.number().required("This field is required"),
    vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_basti_palak_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    sewa_karyakarta_yukt_shakha_w_milan_sankhya: Yup.number().required(
      "This field is required"
    ),
    kul_sewa_karyakarta: Yup.number().required("This field is required"),
    mahanagar_mein_kul_sewa_kary: Yup.number().required(
      "This field is required"
    ),
    masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
      Yup.number().required("This field is required"),
  }),
  villagesOver5000: Yup.object({
    total_villages: Yup.number().required("This field is required"),
    business_and_farming_villages: Yup.number().required(
      "This field is required"
    ),
    service_work_villages: Yup.number().required("This field is required"),
    total_service_work: Yup.number().required("This field is required"),
  }),
  villagesUnder5000: Yup.object({
    service_work_villages: Yup.number().required("This field is required"),
    total_service_work: Yup.number().required("This field is required"),
  }),
});

const Jilareport = () => {
  const savedLanguage = localStorage.getItem("language") || "english";
  const [language, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const initialValues = {
    mahanagar: {
      zila_sam_mahanagar_bhag_sankhya: "",
      sewa_basti_sankhya: "",
      sewa_kary_yukt_sewa_basti: "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: "",
      sewa_basti_palak_shakha_w_milan_sankhya: "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya: "",
      kul_sewa_karyakarta: "",
      mahanagar_mein_kul_sewa_kary: "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya: "",
    },
    jilaKendra: {
      zila_sam_mahanagar_bhag_sankhya: "",
      sewa_basti_sankhya: "",
      sewa_kary_yukt_sewa_basti: "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: "",
      sewa_basti_palak_shakha_w_milan_sankhya: "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya: "",
      kul_sewa_karyakarta: "",
      mahanagar_mein_kul_sewa_kary: "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya: "",
    },
    anyaNagar: {
      zila_sam_mahanagar_bhag_sankhya: "",
      sewa_basti_sankhya: "",
      sewa_kary_yukt_sewa_basti: "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya: "",
      sewa_basti_palak_shakha_w_milan_sankhya: "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya: "",
      kul_sewa_karyakarta: "",
      mahanagar_mein_kul_sewa_kary: "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya: "",
    },
    villagesOver5000: {
      total_villages: "",
      business_and_farming_villages: "",
      service_work_villages: "",
      total_service_work: "",
    },
    villagesUnder5000: {
      service_work_villages: "",
      total_service_work: "",
    },
  };

  const onSubmit = async (values) => {
    try {


      const response = await axios.post(`${BASE_URL}/api/v1/reporting-forms`, values);
      console.log('v>>>>>>>>', response?.data?.message);
      if (response?.data) {
        toast.success(`${response?.data?.message}`);
      }
      console.log("Data submitted successfully:", response);

    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error message:", error.message);
        toast.error("Invalid Credentials! Please fill the correct !!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };



  const fieldLabels = {
    english: {
      districtNumber: "District Number / Section",
      settlementNumber: "Settlement Number",
      serviceSettlementNumber: "Service Settlement Number",
      businessCollegeNumber: "Business and College Branch Number",
      settlementBranchNumber: "Settlement Branch Number",
      serviceWorkerBranchNumber: "Service Worker Branch Number",
      totalServiceWorkers: "Total Service Workers",
      totalServiceWork:
        "Total Service Work (Including Service Work of Organizations)",
      monthlyContactNumber: "Monthly Contacting Settlement Branch Number",
      villagesAbove5000: "Villages with Population greater than 5000",
      businessVillageNumber: "Business or Farmer Branch Village Number",
      serviceVillageNumber: "Service-Enabled Village Number",
      totalServiceInVillages: "Total Service Work in Villages",
      villagesOver5000: "Villages with Population less than 5000",
      villagesUnder5000:
        "Service-Enabled Villages with Population less than 5000",
      totalServiceInVillagesBelow5000:
        "Total Service Work in Villages with Population less than 5000",
      selectNagar: "Select Nagar Type",
      mahanagar: "Mahanagar",
      jilaKendra: "Jila Kendra",
      anyaNagar: "Anya Nagar",
    },
    hindi: {
      districtNumber: "जिला सम महानगर/भाग संख्या",
      settlementNumber: "इनमें सेवा बस्ती संख्या",
      serviceSettlementNumber: "सेवा कार्य युक्त सेवा बस्ती",
      businessCollegeNumber: "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या",
      settlementBranchNumber: "सेवा बस्ती पालक शाखा व मिलन संख्या",
      serviceWorkerBranchNumber: "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या",
      totalServiceWorkers: "कुल सेवा कार्यकर्ता",
      totalServiceWork:
        "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
      monthlyContactNumber:
        "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
      villagesAbove5000: "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या",
      businessVillageNumber: "इनमें व्यवसायी या कृषक शाखायुक्त ग्राम",
      serviceVillageNumber: "इनमें सेवा कार्ययुक्त ग्राम",
      totalServiceInVillages: "इनमें कुल सेवा कार्य",
      villagesOver5000: "5000 से कम जनसंख्या के ग्रामों की संख्या",
      villagesUnder5000: "इनमें सेवा कार्ययुक्त ग्राम",
      totalServiceInVillagesBelow5000: "इनमें कुल सेवा कार्य",
      selectNagar: "नगर प्रकार चुनें",
      mahanagar: "महानगर",
      jilaKendra: "जिलाकेंद्र",
      anyaNagar: "अन्य नगर",
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="gradient-background">
        <Container>
          <Row className="mt-3">
            <Col xs="auto" className="mt-3">
              <Form.Control
                as="select"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </Form.Control>
            </Col>
          </Row>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                {/* Mahanagar Section */}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language].mahanagar}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].districtNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.zila_sam_mahanagar_bhag_sankhya"
                            value={values.mahanagar.zila_sam_mahanagar_bhag_sankhya}
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.zila_sam_mahanagar_bhag_sankhya &&
                              !!errors.mahanagar?.zila_sam_mahanagar_bhag_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mahanagar?.zila_sam_mahanagar_bhag_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.sewa_basti_sankhya"
                            value={values.mahanagar.sewa_basti_sankhya}
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar?.sewa_basti_sankhya &&
                              !!errors.mahanagar?.sewa_basti_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mahanagar?.sewa_basti_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceSettlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.sewa_kary_yukt_sewa_basti"
                            value={values.mahanagar.sewa_kary_yukt_sewa_basti}
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar?.sewa_kary_yukt_sewa_basti &&
                              !!errors.mahanagar?.sewa_kary_yukt_sewa_basti
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mahanagar?.sewa_kary_yukt_sewa_basti}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].businessCollegeNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya"
                            value={
                              values.mahanagar
                                .vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya &&
                              !!errors.mahanagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.mahanagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.sewa_basti_palak_shakha_w_milan_sankhya"
                            value={
                              values.mahanagar
                                .sewa_basti_palak_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya &&
                              !!errors.mahanagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.mahanagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceWorkerBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.sewa_karyakarta_yukt_shakha_w_milan_sankhya"
                            value={
                              values.mahanagar
                                .sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya &&
                              !!errors.mahanagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.mahanagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWorkers}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.kul_sewa_karyakarta"
                            value={values.mahanagar.kul_sewa_karyakarta}
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar?.kul_sewa_karyakarta &&
                              !!errors.mahanagar?.kul_sewa_karyakarta
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mahanagar?.kul_sewa_karyakarta}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWork}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.mahanagar_mein_kul_sewa_kary"
                            value={
                              values.mahanagar.mahanagar_mein_kul_sewa_kary
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar?.mahanagar_mein_kul_sewa_kary &&
                              !!errors.mahanagar?.mahanagar_mein_kul_sewa_kary
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mahanagar?.mahanagar_mein_kul_sewa_kary}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].monthlyContactNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya"
                            value={
                              values.mahanagar
                                .masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya &&
                              !!errors.mahanagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.mahanagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Jila Kendra Section */}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language].jilaKendra}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].districtNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.zila_sam_mahanagar_bhag_sankhya"
                            value={
                              values.jilaKendra.zila_sam_mahanagar_bhag_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra
                                ?.zila_sam_mahanagar_bhag_sankhya &&
                              !!errors.jilaKendra?.zila_sam_mahanagar_bhag_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jilaKendra?.zila_sam_mahanagar_bhag_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.sewa_basti_sankhya"
                            value={values.jilaKendra.sewa_basti_sankhya}
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra?.sewa_basti_sankhya &&
                              !!errors.jilaKendra?.sewa_basti_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jilaKendra?.sewa_basti_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceSettlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.sewa_kary_yukt_sewa_basti"
                            value={values.jilaKendra.sewa_kary_yukt_sewa_basti}
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra?.sewa_kary_yukt_sewa_basti &&
                              !!errors.jilaKendra?.sewa_kary_yukt_sewa_basti
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jilaKendra?.sewa_kary_yukt_sewa_basti}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].businessCollegeNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya"
                            value={
                              values.jilaKendra
                                .vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya &&
                              !!errors.jilaKendra
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.jilaKendra
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.sewa_basti_palak_shakha_w_milan_sankhya"
                            value={
                              values.jilaKendra
                                .sewa_basti_palak_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra
                                ?.sewa_basti_palak_shakha_w_milan_sankhya &&
                              !!errors.jilaKendra
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.jilaKendra
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceWorkerBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.sewa_karyakarta_yukt_shakha_w_milan_sankhya"
                            value={
                              values.jilaKendra
                                .sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya &&
                              !!errors.jilaKendra
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.jilaKendra
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWorkers}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.kul_sewa_karyakarta"
                            value={values.jilaKendra.kul_sewa_karyakarta}
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra?.kul_sewa_karyakarta &&
                              !!errors.jilaKendra?.kul_sewa_karyakarta
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jilaKendra?.kul_sewa_karyakarta}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWork}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.mahanagar_mein_kul_sewa_kary"
                            value={values.jilaKendra.mahanagar_mein_kul_sewa_kary}
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra?.mahanagar_mein_kul_sewa_kary &&
                              !!errors.jilaKendra?.mahanagar_mein_kul_sewa_kary
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jilaKendra?.mahanagar_mein_kul_sewa_kary}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].monthlyContactNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="jilaKendra.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya"
                            value={
                              values.jilaKendra
                                .masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.jilaKendra
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya &&
                              !!errors.jilaKendra
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.jilaKendra
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Anya Nagar Section */}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language].anyaNagar}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].districtNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.zila_sam_mahanagar_bhag_sankhya"
                            value={
                              values.anyaNagar.zila_sam_mahanagar_bhag_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar
                                ?.zila_sam_mahanagar_bhag_sankhya &&
                              !!errors.anyaNagar?.zila_sam_mahanagar_bhag_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.anyaNagar?.zila_sam_mahanagar_bhag_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.sewa_basti_sankhya"
                            value={values.anyaNagar.sewa_basti_sankhya}
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar?.sewa_basti_sankhya &&
                              !!errors.anyaNagar?.sewa_basti_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.anyaNagar?.sewa_basti_sankhya}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceSettlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.sewa_kary_yukt_sewa_basti"
                            value={values.anyaNagar.sewa_kary_yukt_sewa_basti}
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar?.sewa_kary_yukt_sewa_basti &&
                              !!errors.anyaNagar?.sewa_kary_yukt_sewa_basti
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.anyaNagar?.sewa_kary_yukt_sewa_basti}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].businessCollegeNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya"
                            value={
                              values.anyaNagar
                                .vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya &&
                              !!errors.anyaNagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.anyaNagar
                                ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].settlementBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.sewa_basti_palak_shakha_w_milan_sankhya"
                            value={
                              values.anyaNagar
                                .sewa_basti_palak_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya &&
                              !!errors.anyaNagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.anyaNagar
                                ?.sewa_basti_palak_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceWorkerBranchNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.sewa_karyakarta_yukt_shakha_w_milan_sankhya"
                            value={
                              values.anyaNagar
                                .sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya &&
                              !!errors.anyaNagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.anyaNagar
                                ?.sewa_karyakarta_yukt_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWorkers}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.kul_sewa_karyakarta"
                            value={values.anyaNagar.kul_sewa_karyakarta}
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar?.kul_sewa_karyakarta &&
                              !!errors.anyaNagar?.kul_sewa_karyakarta
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.anyaNagar?.kul_sewa_karyakarta}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceWork}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.mahanagar_mein_kul_sewa_kary"
                            value={values.anyaNagar.mahanagar_mein_kul_sewa_kary}
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar?.mahanagar_mein_kul_sewa_kary &&
                              !!errors.anyaNagar?.mahanagar_mein_kul_sewa_kary
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.anyaNagar?.mahanagar_mein_kul_sewa_kary}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].monthlyContactNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya"
                            value={
                              values.anyaNagar
                                .masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.anyaNagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya &&
                              !!errors.anyaNagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.anyaNagar
                                ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Villages Section above 5000*/}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language].villagesOver5000}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].villagesOver5000}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesOver5000.total_villages"
                            value={values.villagesOver5000.total_villages}
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesOver5000?.total_villages &&
                              !!errors.villagesOver5000?.total_villages
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.villagesOver5000?.total_villages}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].businessVillageNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesOver5000.business_and_farming_villages"
                            value={
                              values.villagesOver5000
                                .business_and_farming_villages
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesOver5000
                                ?.business_and_farming_villages &&
                              !!errors.villagesOver5000
                                ?.business_and_farming_villages
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {
                              errors.villagesOver5000
                                ?.business_and_farming_villages
                            }
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].serviceVillageNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesOver5000.service_work_villages"
                            value={values.villagesOver5000.service_work_villages}
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesOver5000?.service_work_villages &&
                              !!errors.villagesOver5000?.service_work_villages
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.villagesOver5000?.service_work_villages}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mt-2">
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceInVillages}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesOver5000.total_service_work"
                            value={values.villagesOver5000.total_service_work}
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesOver5000?.total_service_work &&
                              !!errors.villagesOver5000?.total_service_work
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.villagesOver5000?.total_service_work}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Villages Section below 5000*/}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language].villagesUnder5000}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].villagesUnder5000}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesUnder5000.service_work_villages"
                            value={values.villagesUnder5000.service_work_villages}
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesUnder5000?.service_work_villages &&
                              !!errors.villagesUnder5000?.service_work_villages
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.villagesUnder5000?.service_work_villages}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language].totalServiceInVillages}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesUnder5000.total_service_work"
                            value={values.villagesUnder5000.total_service_work}
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesUnder5000?.total_service_work &&
                              !!errors.villagesUnder5000?.total_service_work
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.villagesUnder5000?.total_service_work}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col className="text-center">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default Jilareport;
