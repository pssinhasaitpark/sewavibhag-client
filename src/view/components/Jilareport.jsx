import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Jilareport.css';

// Validation Schema with Yup
const validationSchema = Yup.object({
  districtNumber: Yup.number().required('This field is required'),
  settlementNumber: Yup.number().required('This field is required'),
  serviceSettlementNumber: Yup.number().required('This field is required'),
  businessCollegeNumber: Yup.number().required('This field is required'),
  settlementBranchNumber: Yup.number().required('This field is required'),
  serviceWorkerBranchNumber: Yup.number().required('This field is required'),
  totalServiceWorkers: Yup.number().required('This field is required'),
  totalServiceWork: Yup.number().required('This field is required'),
  monthlyContactNumber: Yup.number().required('This field is required'),
  villagesAbove5000: Yup.number().required('This field is required'),
  businessVillageNumber: Yup.number().required('This field is required'),
  serviceVillageNumber: Yup.number().required('This field is required'),
  totalServiceInVillages: Yup.number().required('This field is required'),
  villagesBelow5000: Yup.number().required('This field is required'),
  serviceVillagesBelow5000: Yup.number().required('This field is required'),
  totalServiceInVillagesBelow5000: Yup.number().required('This field is required'),
});

const Jilareport = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [language, setLanguage] = useState('english'); // Default language is English

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const initialValues = {
    districtNumber: '',
    settlementNumber: '',
    serviceSettlementNumber: '',
    businessCollegeNumber: '',
    settlementBranchNumber: '',
    serviceWorkerBranchNumber: '',
    totalServiceWorkers: '',
    totalServiceWork: '',
    monthlyContactNumber: '',
    villagesAbove5000: '',
    businessVillageNumber: '',
    serviceVillageNumber: '',
    totalServiceInVillages: '',
    villagesBelow5000: '',
    serviceVillagesBelow5000: '',
    totalServiceInVillagesBelow5000: '',
  };

  const onSubmit = (values) => {
    axios
      .post('your-api-endpoint', values)
      .then((response) => {
        console.log('Data submitted successfully', response);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  // Field Labels based on Language
  const fieldLabels = {
    english: {
      districtNumber: 'District Number / Section',
      settlementNumber: 'Settlement Number',
      serviceSettlementNumber: 'Service Settlement Number',
      businessCollegeNumber: 'Business and College Branch Number',
      settlementBranchNumber: 'Settlement Branch Number',
      serviceWorkerBranchNumber: 'Service Worker Branch Number',
      totalServiceWorkers: 'Total Service Workers',
      totalServiceWork: 'Total Service Work (Including Service Work of Organizations)',
      monthlyContactNumber: 'Monthly Contacting Settlement Branch Number',
      villagesAbove5000: 'Villages with Population greater than 5000',
      businessVillageNumber: 'Business or Farmer Branch Village Number',
      serviceVillageNumber: 'Service-Enabled Village Number',
      totalServiceInVillages: 'Total Service Work in Villages',
      villagesBelow5000: 'Villages with Population less than 5000',
      serviceVillagesBelow5000: 'Service-Enabled Villages with Population less than 5000',
      totalServiceInVillagesBelow5000: 'Total Service Work in Villages with Population less than 5000',
      selectNagar:'Select Nagar Type',
      Mahanagar:"Mahanagar",
      JilaKendra:"Jila Kendra",
      AnyaNagar:"Anya Nagar"
    },
    hindi: {
      districtNumber: 'जिला सम महानगर/भाग संख्या',
      settlementNumber: 'इनमें सेवा बस्ती संख्या',
      serviceSettlementNumber: 'सेवा कार्य युक्त सेवा बस्ती',
      businessCollegeNumber: 'व्यवसायी व महाविद्यालय शाखा व मिलन संख्या',
      settlementBranchNumber: 'सेवा बस्ती पालक शाखा व मिलन संख्या',
      serviceWorkerBranchNumber: 'सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या',
      totalServiceWorkers: 'कुल सेवा कार्यकर्ता',
      totalServiceWork: 'महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)',
      monthlyContactNumber: 'मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या',
      villagesAbove5000: '5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या',
      businessVillageNumber: 'इनमें व्यवसायी या कृषक शाखायुक्त ग्राम',
      serviceVillageNumber: 'इनमें सेवा कार्ययुक्त ग्राम',
      totalServiceInVillages: 'इनमें कुल सेवा कार्य',
      villagesBelow5000: '5000 से कम जनसंख्या के ग्रामों की संख्या',
      serviceVillagesBelow5000: 'इनमें सेवा कार्ययुक्त ग्राम',
      totalServiceInVillagesBelow5000: 'इनमें कुल सेवा कार्य',
      selectNagar:"नगर प्रकार चुनें",
      Mahanagar:"महानगर",
      JilaKendra:"जिलाकेंद्र",
      AnyaNagar:"अन्य नगर"


    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h4>{fieldLabels[language].selectNagar}</h4>
          <div className=''>
          <Form className='d-flex gap-3'>
            <Form.Check
              type="radio"
              label="Mahanagar"
              name="category"
              value="Mahanagar"
              onChange={handleCategoryChange}
              checked={selectedCategory === 'Mahanagar'}
            />
            <Form.Check
              type="radio"
              label="Jila Kendra"
              name="category"
              value="Jila Kendra"
              onChange={handleCategoryChange}
              checked={selectedCategory === 'Jila Kendra'}
            />
            <Form.Check
              type="radio"
              label="Anya Nagar"
              name="category"
              value="Anya Nagar"
              onChange={handleCategoryChange}
              checked={selectedCategory === 'Anya Nagar'}
            />
          </Form>
          </div>
        </Col>

        <Col xs="auto" className="mt-3">
          
          <Form.Control as="select" value={language} onChange={handleLanguageChange}>

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
            {selectedCategory && (
              <Row className="mt-3">
                <Col>
                  <h1>{fieldLabels[language].Nagar}</h1>
                  {(selectedCategory === 'Mahanagar' ||
                    selectedCategory === 'Jila Kendra' ||
                    selectedCategory === 'Anya Nagar') && (
                    <>
                      {/* All Fields */}
                      <Row>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].districtNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="districtNumber"
                              value={values.districtNumber}
                              onChange={handleChange}
                              isInvalid={touched.districtNumber && !!errors.districtNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.districtNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].settlementNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="settlementNumber"
                              value={values.settlementNumber}
                              onChange={handleChange}
                              isInvalid={touched.settlementNumber && !!errors.settlementNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.settlementNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].serviceSettlementNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="serviceSettlementNumber"
                              value={values.serviceSettlementNumber}
                              onChange={handleChange}
                              isInvalid={touched.serviceSettlementNumber && !!errors.serviceSettlementNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.serviceSettlementNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].businessCollegeNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="businessCollegeNumber"
                              value={values.businessCollegeNumber}
                              onChange={handleChange}
                              isInvalid={touched.businessCollegeNumber && !!errors.businessCollegeNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.businessCollegeNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].settlementBranchNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="settlementBranchNumber"
                              value={values.settlementBranchNumber}
                              onChange={handleChange}
                              isInvalid={touched.settlementBranchNumber && !!errors.settlementBranchNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.settlementBranchNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].serviceWorkerBranchNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="serviceWorkerBranchNumber"
                              value={values.serviceWorkerBranchNumber}
                              onChange={handleChange}
                              isInvalid={touched.serviceWorkerBranchNumber && !!errors.serviceWorkerBranchNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.serviceWorkerBranchNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].totalServiceWorkers}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="totalServiceWorkers"
                              value={values.totalServiceWorkers}
                              onChange={handleChange}
                              isInvalid={touched.totalServiceWorkers && !!errors.totalServiceWorkers}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.totalServiceWorkers}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].totalServiceWork}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="totalServiceWork"
                              value={values.totalServiceWork}
                              onChange={handleChange}
                              isInvalid={touched.totalServiceWork && !!errors.totalServiceWork}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.totalServiceWork}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].monthlyContactNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="monthlyContactNumber"
                              value={values.monthlyContactNumber}
                              onChange={handleChange}
                              isInvalid={touched.monthlyContactNumber && !!errors.monthlyContactNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.monthlyContactNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                    
                    </>
                  )}
                </Col>
              </Row>
            )}

            {/* Villages Section */}
            <Row className="mt-3">
              <Col>
                <h1>{fieldLabels[language].villagesAbove5000}</h1>
                <Row>
                <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].villagesAbove5000}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="villagesAbove5000"
                              value={values.villagesAbove5000}
                              onChange={handleChange}
                              isInvalid={touched.villagesAbove5000 && !!errors.villagesAbove5000}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.villagesAbove5000}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].businessVillageNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="businessVillageNumber"
                              value={values.businessVillageNumber}
                              onChange={handleChange}
                              isInvalid={touched.businessVillageNumber && !!errors.businessVillageNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.businessVillageNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>


                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].serviceVillageNumber}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="serviceVillageNumber"
                              value={values.serviceVillageNumber}
                              onChange={handleChange}
                              isInvalid={touched.serviceVillageNumber && !!errors.serviceVillageNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.serviceVillageNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6} className='mt-2'>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].totalServiceInVillagesBelow5000}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="totalServiceInVillagesBelow5000"
                              value={values.totalServiceInVillagesBelow5000}
                              onChange={handleChange}
                              isInvalid={touched.serviceVillagesBelow5000 && !!errors.totalServiceInVillagesBelow5000}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.totalServiceInVillagesBelow5000}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        
                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
              <h1>{fieldLabels[language].villagesBelow5000}</h1>
              <Row>
              <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].serviceVillagesBelow5000}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="serviceVillagesBelow5000"
                              value={values.serviceVillagesBelow5000}
                              onChange={handleChange}
                              isInvalid={touched.serviceVillagesBelow5000 && !!errors.serviceVillagesBelow5000}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.serviceVillagesBelow5000}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>{fieldLabels[language].totalServiceInVillagesBelow5000}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter number"
                              name="totalServiceInVillagesBelow5000"
                              value={values.totalServiceInVillagesBelow5000}
                              onChange={handleChange}
                              isInvalid={touched.serviceVillagesBelow5000 && !!errors.totalServiceInVillagesBelow5000}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.totalServiceInVillagesBelow5000}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
              </Row>
              </Col>
            </Row>

            

            {/* Submit Button */}
            <Row className="mt-3">
              <Col className='text-center'>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Jilareport;
