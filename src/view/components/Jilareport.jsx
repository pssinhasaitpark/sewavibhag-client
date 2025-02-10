import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, ToastContainer } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./Jilareport.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const validationSchema = Yup.object({
  mahanagar: Yup.object({
    districtNumber: Yup.number().required("This field is required"),
    settlementNumber: Yup.number().required("This field is required"),
    serviceSettlementNumber: Yup.number().required("This field is required"),
    businessCollegeNumber: Yup.number().required("This field is required"),
    settlementBranchNumber: Yup.number().required("This field is required"),
    serviceWorkerBranchNumber: Yup.number().required("This field is required"),
    totalServiceWorkers: Yup.number().required("This field is required"),
    totalServiceWork: Yup.number().required("This field is required"),
    monthlyContactNumber: Yup.number().required("This field is required"),
   
  }),
  JilaKendra: Yup.object({
    districtNumber: Yup.number().required("This field is required"),
    settlementNumber: Yup.number().required("This field is required"),
    serviceSettlementNumber: Yup.number().required("This field is required"),
    businessCollegeNumber: Yup.number().required("This field is required"),
    settlementBranchNumber: Yup.number().required("This field is required"),
    serviceWorkerBranchNumber: Yup.number().required("This field is required"),
    totalServiceWorkers: Yup.number().required("This field is required"),
    totalServiceWork: Yup.number().required("This field is required"),
    monthlyContactNumber: Yup.number().required("This field is required"),
  }),
  AnyaNagar: Yup.object({
    districtNumber: Yup.number().required("This field is required"),
    settlementNumber: Yup.number().required("This field is required"),
    serviceSettlementNumber: Yup.number().required("This field is required"),
    businessCollegeNumber: Yup.number().required("This field is required"),
    settlementBranchNumber: Yup.number().required("This field is required"),
    serviceWorkerBranchNumber: Yup.number().required("This field is required"),
    totalServiceWorkers: Yup.number().required("This field is required"),
    totalServiceWork: Yup.number().required("This field is required"),
    monthlyContactNumber: Yup.number().required("This field is required"),
  }),
  villagesAbove5000: Yup.object({
    villagesAbove5000: Yup.number().required("This field is required"),
    businessVillageNumber: Yup.number().required("This field is required"),
    serviceVillageNumber: Yup.number().required("This field is required"),
    totalServiceInVillages: Yup.number().required("This field is required"),
  }),
  villagesBelow5000: Yup.object({
    villagesBelow5000: Yup.number().required("This field is required"),
    totalServiceInVillages: Yup.number().required("This field is required"),
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
      districtNumber: "",
      settlementNumber: "",
      serviceSettlementNumber: "",
      businessCollegeNumber: "",
      settlementBranchNumber: "",
      serviceWorkerBranchNumber: "",
      totalServiceWorkers: "",
      totalServiceWork: "",
      monthlyContactNumber: "",
     
    },
    JilaKendra: {
      districtNumber: '',
      settlementNumber: '',
      serviceSettlementNumber: '',
      businessCollegeNumber: '',
      settlementBranchNumber: '',
      serviceWorkerBranchNumber: '',
      totalServiceWorkers: '',
      totalServiceWork: '',
      monthlyContactNumber: '',
    },
    AnyaNagar: {
      districtNumber: '',
      settlementNumber: '',
      serviceSettlementNumber: '',
      businessCollegeNumber: '',
      settlementBranchNumber: '',
      serviceWorkerBranchNumber: '',
      totalServiceWorkers: '',
      totalServiceWork: '',
      monthlyContactNumber: '',
    },
    villagesAbove5000: {
      villagesAbove5000: "",
      businessVillageNumber: "",
      serviceVillageNumber: "",
      totalServiceInVillages: "",
    },
    villagesBelow5000: {
      villagesBelow5000: "",
      totalServiceInVillages: "",
    },
  };


  
  const onSubmit = async (values) => {
  
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/reporting-forms`,  values);
      alert("Forms Submitted Successfully")
      toast.success("forms data succes");
      console.log("Data submitted successfully:", response);
        
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      }  else {
        console.error("Error message:", error.message);
        toast.error("Invalid Credentials! Please fill the correct !!", {
                position: "top-right",
                autoClose: 2000,
              });
      }
    }
  };

  console.log("heyyyyyyy1");

  const fieldLabels = {
    english: {
      districtNumber: "District Number / Section",
      settlementNumber: "Settlement Number",
      serviceSettlementNumber: "Service Settlement Number",
      businessCollegeNumber: "Business and College Branch Number",
      settlementBranchNumber: "Settlement Branch Number",
      serviceWorkerBranchNumber: "Service Worker Branch Number",
      totalServiceWorkers: "Total Service Workers",
      totalServiceWork: "Total Service Work (Including Service Work of Organizations)",
      monthlyContactNumber: "Monthly Contacting Settlement Branch Number",
      villagesAbove5000: "Villages with Population greater than 5000",
      businessVillageNumber: "Business or Farmer Branch Village Number",
      serviceVillageNumber: "Service-Enabled Village Number",
      totalServiceInVillages: "Total Service Work in Villages",
      villagesBelow5000: "Villages with Population less than 5000",
      serviceVillagesBelow5000: "Service-Enabled Villages with Population less than 5000",
      totalServiceInVillagesBelow5000: "Total Service Work in Villages with Population less than 5000",
      selectNagar: "Select Nagar Type",
      mahanagar: "Mahanagar",
      JilaKendra: "Jila Kendra",
      AnyaNagar: "Anya Nagar",
    },
    hindi: {
      districtNumber: "जिला सम महानगर/भाग संख्या",
      settlementNumber: "इनमें सेवा बस्ती संख्या",
      serviceSettlementNumber: "सेवा कार्य युक्त सेवा बस्ती",
      businessCollegeNumber: "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या",
      settlementBranchNumber: "सेवा बस्ती पालक शाखा व मिलन संख्या",
      serviceWorkerBranchNumber: "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या",
      totalServiceWorkers: "कुल सेवा कार्यकर्ता",
      totalServiceWork: "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
      monthlyContactNumber: "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
      villagesAbove5000: "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या",
      businessVillageNumber: "इनमें व्यवसायी या कृषक शाखायुक्त ग्राम",
      serviceVillageNumber: "इनमें सेवा कार्ययुक्त ग्राम",
      totalServiceInVillages: "इनमें कुल सेवा कार्य",
      villagesBelow5000: "5000 से कम जनसंख्या के ग्रामों की संख्या",
      serviceVillagesBelow5000: "इनमें सेवा कार्ययुक्त ग्राम",
      totalServiceInVillagesBelow5000: "इनमें कुल सेवा कार्य",
      selectNagar: "नगर प्रकार चुनें",
      mahanagar: "महानगर",
      JilaKendra: "जिलाकेंद्र",
      AnyaNagar: "अन्य नगर",
    },
  };

  return (
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
                        <Form.Label>{fieldLabels[language].districtNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.districtNumber"
                          value={values.mahanagar.districtNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.districtNumber && !!errors.mahanagar?.districtNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.districtNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.settlementNumber"
                          value={values.mahanagar.settlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.settlementNumber && !!errors.mahanagar?.settlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.settlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceSettlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.serviceSettlementNumber"
                          value={values.mahanagar.serviceSettlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.serviceSettlementNumber && !!errors.mahanagar?.serviceSettlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.serviceSettlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].businessCollegeNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.businessCollegeNumber"
                          value={values.mahanagar.businessCollegeNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.businessCollegeNumber && !!errors.mahanagar?.businessCollegeNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.businessCollegeNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.settlementBranchNumber"
                          value={values.mahanagar.settlementBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.settlementBranchNumber && !!errors.mahanagar?.settlementBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.settlementBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceWorkerBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.serviceWorkerBranchNumber"
                          value={values.mahanagar.serviceWorkerBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.serviceWorkerBranchNumber && !!errors.mahanagar?.serviceWorkerBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.serviceWorkerBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWorkers}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.totalServiceWorkers"
                          value={values.mahanagar.totalServiceWorkers}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.totalServiceWorkers && !!errors.mahanagar?.totalServiceWorkers}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.totalServiceWorkers}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWork}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.totalServiceWork"
                          value={values.mahanagar.totalServiceWork}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.totalServiceWork && !!errors.mahanagar?.totalServiceWork}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.totalServiceWork}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].monthlyContactNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="mahanagar.monthlyContactNumber"
                          value={values.mahanagar.monthlyContactNumber}
                          onChange={handleChange}
                          isInvalid={touched.mahanagar?.monthlyContactNumber && !!errors.mahanagar?.monthlyContactNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mahanagar?.monthlyContactNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Jila Kendra Section */}
              <Row className="mt-3">
                <Col>
                  <h2>{fieldLabels[language].JilaKendra}</h2>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].districtNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.districtNumber"
                          value={values.JilaKendra.districtNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.districtNumber && !!errors.JilaKendra?.districtNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.districtNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.settlementNumber"
                          value={values.JilaKendra.settlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.settlementNumber && !!errors.JilaKendra?.settlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.settlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceSettlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.serviceSettlementNumber"
                          value={values.JilaKendra.serviceSettlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.serviceSettlementNumber && !!errors.JilaKendra?.serviceSettlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.serviceSettlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].businessCollegeNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.businessCollegeNumber"
                          value={values.JilaKendra.businessCollegeNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.businessCollegeNumber && !!errors.JilaKendra?.businessCollegeNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.businessCollegeNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.settlementBranchNumber"
                          value={values.JilaKendra.settlementBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.settlementBranchNumber && !!errors.JilaKendra?.settlementBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.settlementBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceWorkerBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.serviceWorkerBranchNumber"
                          value={values.JilaKendra.serviceWorkerBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.serviceWorkerBranchNumber && !!errors.JilaKendra?.serviceWorkerBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.serviceWorkerBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWorkers}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.totalServiceWorkers"
                          value={values.JilaKendra.totalServiceWorkers}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.totalServiceWorkers && !!errors.JilaKendra?.totalServiceWorkers}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.totalServiceWorkers}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWork}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.totalServiceWork"
                          value={values.JilaKendra.totalServiceWork}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.totalServiceWork && !!errors.JilaKendra?.totalServiceWork}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.totalServiceWork}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].monthlyContactNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="JilaKendra.monthlyContactNumber"
                          value={values.JilaKendra.monthlyContactNumber}
                          onChange={handleChange}
                          isInvalid={touched.JilaKendra?.monthlyContactNumber && !!errors.JilaKendra?.monthlyContactNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.JilaKendra?.monthlyContactNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Anya Nagar Section */}
              <Row className="mt-3">
                <Col>
                  <h2>{fieldLabels[language].AnyaNagar}</h2>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].districtNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.districtNumber"
                          value={values.AnyaNagar.districtNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.districtNumber && !!errors.AnyaNagar?.districtNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.districtNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.settlementNumber"
                          value={values.AnyaNagar.settlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.settlementNumber && !!errors.AnyaNagar?.settlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.settlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceSettlementNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.serviceSettlementNumber"
                          value={values.AnyaNagar.serviceSettlementNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.serviceSettlementNumber && !!errors.AnyaNagar?.serviceSettlementNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.serviceSettlementNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].businessCollegeNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.businessCollegeNumber"
                          value={values.AnyaNagar.businessCollegeNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.businessCollegeNumber && !!errors.AnyaNagar?.businessCollegeNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.businessCollegeNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].settlementBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.settlementBranchNumber"
                          value={values.AnyaNagar.settlementBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.settlementBranchNumber && !!errors.AnyaNagar?.settlementBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.settlementBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].serviceWorkerBranchNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.serviceWorkerBranchNumber"
                          value={values.AnyaNagar.serviceWorkerBranchNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.serviceWorkerBranchNumber && !!errors.AnyaNagar?.serviceWorkerBranchNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.serviceWorkerBranchNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWorkers}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.totalServiceWorkers"
                          value={values.AnyaNagar.totalServiceWorkers}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.totalServiceWorkers && !!errors.AnyaNagar?.totalServiceWorkers}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.totalServiceWorkers}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].totalServiceWork}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.totalServiceWork"
                          value={values.AnyaNagar.totalServiceWork}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.totalServiceWork && !!errors.AnyaNagar?.totalServiceWork}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.totalServiceWork}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-2">
                      <Form.Group>
                        <Form.Label>{fieldLabels[language].monthlyContactNumber}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="AnyaNagar.monthlyContactNumber"
                          value={values.AnyaNagar.monthlyContactNumber}
                          onChange={handleChange}
                          isInvalid={touched.AnyaNagar?.monthlyContactNumber && !!errors.AnyaNagar?.monthlyContactNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.AnyaNagar?.monthlyContactNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Villages Section above 5000*/}
              <Row className="mt-3">
                <Col>
                  <h2>{fieldLabels[language].villagesAbove5000}</h2>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          {fieldLabels[language].villagesAbove5000}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="villagesAbove5000.villagesAbove5000"
                          value={values.villagesAbove5000.villagesAbove5000}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesAbove5000?.villagesAbove5000 &&
                            !!errors.villagesAbove5000?.villagesAbove5000
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesAbove5000?.villagesAbove5000}
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
                          name="villagesAbove5000.businessVillageNumber"
                          value={values.villagesAbove5000.businessVillageNumber}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesAbove5000?.businessVillageNumber &&
                            !!errors.villagesAbove5000?.businessVillageNumber
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesAbove5000?.businessVillageNumber}
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
                          name="villagesAbove5000.serviceVillageNumber"
                          value={values.villagesAbove5000.serviceVillageNumber}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesAbove5000?.serviceVillageNumber &&
                            !!errors.villagesAbove5000?.serviceVillageNumber
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesAbove5000?.serviceVillageNumber}
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
                          name="villagesAbove5000.totalServiceInVillages"
                          value={values.villagesAbove5000.totalServiceInVillages}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesAbove5000?.totalServiceInVillages &&
                            !!errors.villagesAbove5000?.totalServiceInVillages
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesAbove5000?.totalServiceInVillages}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Villages Section below 5000*/}
              <Row className="mt-3">
                <Col>
                  <h2>{fieldLabels[language].villagesBelow5000}</h2>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          {fieldLabels[language].villagesBelow5000}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="villagesBelow5000.villagesBelow5000"
                          value={values.villagesBelow5000.villagesBelow5000}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesBelow5000?.villagesBelow5000 &&
                            !!errors.villagesBelow5000?.villagesBelow5000
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesBelow5000?.villagesBelow5000}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          {fieldLabels[language]. totalServiceInVillages}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number"
                          name="villagesBelow5000.totalServiceInVillages"
                          value={values.villagesBelow5000.totalServiceInVillages}
                          onChange={handleChange}
                          isInvalid={
                            touched.villagesBelow5000?.totalServiceInVillages &&
                            !!errors.villagesBelow5000?.totalServiceInVillages
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.villagesBelow5000?.totalServiceInVillages}
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
  );
};

export default Jilareport;