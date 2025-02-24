import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "./Jilareport.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import fieldLabels from "./FiledLabels";
import { fetchVibhagList, fetchFormDataByJila, updateReportingForm, clearFormData } from "../redux/slice/JilaReportSlice"; 

const Jilareport = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];
  

  const vibhagList = useSelector((state) => state.jilareport.vibhagList);
  const formData = useSelector((state) => state.jilareport.formData);
  const userType = user?.user_type || "Guest";

  const [selectedVibhag, setSelectedVibhag] = useState("");
  const [selectedJila, setSelectedJila] = useState("");
  const [jilaList, setJilaList] = useState();
  const [selectedJilaData, setSelectedJilaData] = useState("");

  useEffect(() => {
    if (userType === "prant" || userType === "vibhag") {
      dispatch(fetchVibhagList());
    }
  }, [dispatch, userType]);

  useEffect(() => {
    dispatch(clearFormData());
    if (selectedJila) {
      console.log("selectedJila",fetchFormDataByJila);
      
      dispatch(fetchFormDataByJila(selectedJila));
    } else {
      dispatch(clearFormData());
    }
  }, [dispatch, selectedJila]);

  useEffect(() => {
    setSelectedJila("");
    dispatch(clearFormData());
  }, [dispatch, selectedVibhag]);

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

  const initialValues = {
    mahanagar: {
      zila_sam_mahanagar_bhag_sankhya:
        formData?.mahanagar?.zila_sam_mahanagar_bhag_sankhya || "",
      sewa_basti_sankhya: formData?.mahanagar?.sewa_basti_sankhya || "",
      sewa_kary_yukt_sewa_basti:
        formData?.mahanagar?.sewa_kary_yukt_sewa_basti || "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya:
        formData?.mahanagar
          ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya || "",
      sewa_basti_palak_shakha_w_milan_sankhya:
        formData?.mahanagar?.sewa_basti_palak_shakha_w_milan_sankhya || "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya:
        formData?.mahanagar?.sewa_karyakarta_yukt_shakha_w_milan_sankhya ||
        "",
      kul_sewa_karyakarta: formData?.mahanagar?.kul_sewa_karyakarta || "",
      mahanagar_mein_kul_sewa_kary:
        formData?.mahanagar?.mahanagar_mein_kul_sewa_kary || "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
        formData?.mahanagar
          ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya || "",
    },
    jilaKendra: {
      zila_sam_mahanagar_bhag_sankhya:
        formData?.mahanagar?.zila_sam_mahanagar_bhag_sankhya || "",
      sewa_basti_sankhya: formData?.mahanagar?.sewa_basti_sankhya || "",
      sewa_kary_yukt_sewa_basti:
        formData?.mahanagar?.sewa_kary_yukt_sewa_basti || "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya:
        formData?.mahanagar
          ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya || "",
      sewa_basti_palak_shakha_w_milan_sankhya:
        formData?.mahanagar?.sewa_basti_palak_shakha_w_milan_sankhya || "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya:
        formData?.mahanagar?.sewa_karyakarta_yukt_shakha_w_milan_sankhya ||
        "",
      kul_sewa_karyakarta: formData?.mahanagar?.kul_sewa_karyakarta || "",
      mahanagar_mein_kul_sewa_kary:
        formData?.mahanagar?.mahanagar_mein_kul_sewa_kary || "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
        formData?.mahanagar
          ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya || "",
    },
    anyaNagar: {
      zila_sam_mahanagar_bhag_sankhya:
        formData?.anyaNagar?.zila_sam_anya_nagar_bhag_sankhya || "",
      sewa_basti_sankhya:
        formData?.anyaNagar?.inmein_sewa_basti_sankhya || "",
      sewa_kary_yukt_sewa_basti:
        formData?.anyaNagar?.sewa_kary_yukt_sewa_basti || "",
      vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya:
        formData?.anyaNagar
          ?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya || "",
      sewa_basti_palak_shakha_w_milan_sankhya:
        formData?.anyaNagar?.sewa_basti_palak_shakha_w_milan_sankhya || "",
      sewa_karyakarta_yukt_shakha_w_milan_sankhya:
        formData?.anyaNagar?.sewa_karyakarta_yukt_shakha_w_milan_sankhya ||
        "",
      kul_sewa_karyakarta: formData?.anyaNagar?.kul_sewa_karyakarta || "",
      mahanagar_mein_kul_sewa_kary:
        formData?.anyaNagar?.anya_nagar_mein_kul_sewa_kary || "",
      masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya:
        formData?.anyaNagar
          ?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya || "",
    },
    villagesOver5000: {
      total_villages: formData?.villagesOver5000?.total_villages || "",
      business_and_farming_villages:
        formData?.villagesOver5000?.business_and_farming_villages || "",
      service_work_villages:
        formData?.villagesOver5000?.service_work_villages || "",
      total_service_work:
        formData?.villagesOver5000?.total_service_work || "",
    },
    villagesUnder5000: {
      service_work_villages:
        formData?.villagesUnder5000?.service_work_villages || "",
      total_service_work:
        formData?.villagesUnder5000?.total_service_work || "",
    },
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(updateReportingForm({ jila_id: selectedJila, values }));
      toast.success("Data submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    }
  };





  return (
    <>
      <ToastContainer />
      <div className="gradient-background">
        <Container>
          <Row className="mt-3 d-flex justify-content-between align-items-center">
            <Col xs="auto" className="mt-3 d-flex">
              {userType === "prant" && (
                <Col xs="auto" className="mt-3">
                  <Form.Control
                    as="select"
                    className="form-select"
                    value={selectedVibhag}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setSelectedVibhag(selectedId);
                      const selectedVibhagData = vibhagList?.map((vibhag) =>
                        vibhag?.vibhags?.find(
                          (vibhag) => vibhag._id === selectedId
                        )
                      );
                      setJilaList(() => selectedVibhagData);
                    }}
                  >
                    <option value="" className="bg-dark text-light">
                      Select Vibhag
                    </option>
                    {/* {vibhagList?.map((vibhag) => {
                      return (
                        
                        <optgroup  label={vibhag.vibhag_name} key={vibhag.id} >
                          {vibhag?.vibhags?.map((item) => {
                            return (
                              <>
                                <option key={item.id} value={item._id}>
                                  {item.vibhag_name}
                                </option>
                              </>
                            );
                          })}
                        </optgroup>
                      );
                    })} */}
                     {vibhagList?.flatMap((vibhag) =>
                      vibhag.vibhags?.map((item) => (
                        <option key={item.id} value={item._id}>
                          {item.vibhag_name}
                        </option>
                      ))
                    )}
                  </Form.Control>

                  {selectedVibhag && (
                    <Form.Control
                      as="select"
                      className="form-select mt-3"
                      value={selectedJila}
                      onChange={(e) => setSelectedJila(e.target.value)}
                    >
                      <option value="" className="bg-dark text-light">
                        Select Jila
                      </option>
                      {jilaList[0].jilas?.map((jila) => {
                        return (
                          <>
                            <option key={jila._id} value={jila._id}>
                              {jila.jila_name}
                            </option>
                          </>
                        );
                      })}
                    </Form.Control>
                  )}
                </Col>
              )}

              {userType === "vibhag" && (
                <Form.Control
                  as="select"
                  className="form-select"
                  onChange={(e) => {
                    const selectedJilaVal = e.target.value;
                    setSelectedJila(selectedJilaVal);
                  }}
                >
                  {vibhagList?.data?.map((jila) => {
                    return (
                      <>
                        <option key={jila.id} value={jila._id}>
                          {jila.jila_name}
                        </option>
                      </>
                    );
                  })}

                  {/* <option value="vibhag2">Indore</option> */}
                </Form.Control>
              )}
            </Col>
          </Row>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                {/* Mahanagar Section */}
                <Row className="mt-3">
                  <Col>
                    <h2>{fieldLabels[language]?.mahanagar}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language]?.districtNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="mahanagar.zila_sam_mahanagar_bhag_sankhya"
                            value={
                              values.mahanagar.zila_sam_mahanagar_bhag_sankhya
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.mahanagar
                                ?.zila_sam_mahanagar_bhag_sankhya &&
                              !!errors.mahanagar
                                ?.zila_sam_mahanagar_bhag_sankhya
                            }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceSettlementNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.businessCollegeNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceWorkerBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWorkers}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWork}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.monthlyContactNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                    <h2>{fieldLabels[language]?.jilaKendra}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language]?.districtNumber}
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
                              !!errors.jilaKendra
                                ?.zila_sam_mahanagar_bhag_sankhya
                            }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceSettlementNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.businessCollegeNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceWorkerBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWorkers}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWork}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.monthlyContactNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                    <h2>{fieldLabels[language]?.anyaNagar}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language]?.districtNumber}
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
                              !!errors.anyaNagar
                                ?.zila_sam_mahanagar_bhag_sankhya
                            }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceSettlementNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="anyaNagar.sewa_kary_yukt_sewa_basti"
                            value={values.anyaNagar.sewa_kary_yukt_sewa_basti}
                            onChange={handleChange}
                           isInvalid={
                          touched.mahanagar
                            ?.zila_sam_mahanagar_bhag_sankhya &&
                          !!errors.mahanagar
                            ?.zila_sam_mahanagar_bhag_sankhya
                        }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.businessCollegeNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.settlementBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceWorkerBranchNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWorkers}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceWork}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.monthlyContactNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                    <h2>{fieldLabels[language]?.villagesOver5000}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language]?.villagesOver5000}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.businessVillageNumber}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.serviceVillageNumber}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesOver5000.service_work_villages"
                            value={
                              values.villagesOver5000.service_work_villages
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesOver5000?.service_work_villages &&
                              !!errors.villagesOver5000?.service_work_villages
                            }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceInVillages}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                    <h2>{fieldLabels[language]?.villagesUnder5000}</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            {fieldLabels[language]?.villagesUnder5000}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="villagesUnder5000.service_work_villages"
                            value={
                              values.villagesUnder5000.service_work_villages
                            }
                            onChange={handleChange}
                            isInvalid={
                              touched.villagesUnder5000
                                ?.service_work_villages &&
                              !!errors.villagesUnder5000?.service_work_villages
                            }
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                            {fieldLabels[language]?.totalServiceInVillages}
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
                            disabled={
                              userType === "kshetra" || userType === "kendra"
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
                    <Button
                      type="submit"
                      className="submit_buttons"
                      disabled={userType === "kshetra" || userType === "kendra"}
                    >
                      {userType === "vibhag" || userType === "prant"
                        ? `${fieldLabels[language]?.SaveAsSubmit}`
                        : `${fieldLabels[language]?.Submit}`
                      }
                    </Button>
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