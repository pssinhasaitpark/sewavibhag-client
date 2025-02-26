import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Card, Button, Spinner, Form as BootstrapForm, Row, Col } from "react-bootstrap";
import axios from "axios";
import fieldLabels from "../components/FiledLabels";
import { JilaTranslation, kshetraTranslation, PrantTranslation, VibhagTranslation } from "../components/Fileds";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user_type } = useSelector((state) => state?.auth?.user);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [levelList, setLevelList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState();
  const [hierarchyData, setHierarchyData] = useState([]);
  const [selectedPrant, setSelectedPrant] = useState("");
  const [selectedKshetra, setSelectedKshetra] = useState("");
  const [vibhagList, setVibhagList] = useState([]);
  const [selectedVibhag, setSelectedVibhag] = useState("");
  const [jilaList, setJilaList] = useState([]);
  const [selectedJila, setSelectedJila] = useState("");
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const language = useSelector((state) => state.language.language);
  const labels = fieldLabels[language];

  // useEffect(() => {
  //   if (user_type === "kendra" || user_type === "kshetra") {
  //     setLevelList([
  //       { label: `${labels?.Viewer}`, value: 1 },
  //       { label: `${labels?.Admin}`, value: 2 },
  //     ]);
  //   } else if (user_type === "prant" || user_type === "vibhag") {
  //     setLevelList([
  //       { label: `${labels?.Viewer}`, value: 1 },
  //       { label: `${labels?.Editor}`, value: 2 },  
  //       { label: `${labels?.Admin}`, value: 3 },
  //     ]);
  //   } else if (user_type === "jila") {
  //     setLevelList([
  //       { label: `${labels?.Viewer}`, value: 1 },
  //       { label: `${labels?.Admin}`, value: 2 },
  //     ]);
  //   }
  // }, [user_type, labels]);

  console.log("userYupeid",user.user_type_id);
  

  useEffect(() => {
    if (selectedUserType === "kendra" || selectedUserType === "kshetra") {
      setLevelList([
        { label: `${labels?.Viewer}`, value: 1 },
        { label: `${labels?.Admin}`, value: 2 },
      ]);
    } else if (selectedUserType === "prant" || selectedUserType === "vibhag") {
      setLevelList([
        { label: `${labels?.Viewer}`, value: 1 },
        { label: `${labels?.Editor}`, value: 2 },
        { label: `${labels?.Admin}`, value: 3 },
      ]);
    } else if (selectedUserType === "jila") {
      setLevelList([
        { label: `${labels?.Viewer}`, value: 1 },
        { label: `${labels?.Admin}`, value: 2 },
      ]);
    } else {
      setLevelList([]); // Reset if no valid user type is selected
    }
  }, [selectedUserType, labels]);



  useEffect(() => {
    if (user_type === "prant" || user_type === "vibhag") {
      axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then((response) => {
          setVibhagList(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => console.error("Error fetching Vibhag data:", error));
    }
  }, [user_type]);

  useEffect(() => {
    if (user?.user_type === "vibhag") {
      axios.get(`${BASE_URL}/api/v1/prantAndVibhag`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setJilaList(response.data);
          } else if (response.data?.data && Array.isArray(response.data.data)) {
            setJilaList(response.data.data);
          } else {
            console.error("Unexpected API response structure", response.data);
          }
        })
        .catch((error) => console.error("Error fetching Jila data:", error));
    }
  }, [user, token]);
  useEffect(() => {
    if (user_type === "kendra" || user_type === "kshetra" || user_type === "prant" || user_type === "vibhag") {
      axios.get(`${BASE_URL}/api/v1/hierarchy`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then((response) => {


          setHierarchyData(response.data || []);
          console.log("response", response);

        })
        .catch((error) => console.error("Error fetching hierarchy data:", error));
    }
  }, [user_type]);

  useEffect(() => {
    if (selectedVibhag) {
      const selectedVibhagData = vibhagList?.flatMap((vibhag) => vibhag?.vibhags?.filter((v) => v._id === selectedVibhag)) || [];
      setJilaList(selectedVibhagData?.[0]?.jilas || []);
    } else {
      setJilaList([]);
    }
  }, [selectedVibhag, vibhagList]);

  const initialValues = {
    user_name: "",
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    user_type: "",
    user_type_id: selectedVibhag[0]?._id || "",
    level: selectedLevel,
  };

  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(3, "User name must be at least 3 characters")
      .max(20, "User name cannot exceed 20 characters")
      .required("User name is required"),
    full_name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    user_type: Yup.string()
      .required("User type is required"),
    user_type_id: Yup.string()
      .required("User type ID is required"),
    level: Yup.number()
      .required("Level is required")
      .oneOf([1, 2, 3], "Invalid level selected"),
    jila: Yup.string()
      .nullable() // Allow null if condition is not met
      .when("user_type", (user_type, schema) =>
        user_type === "jila" ? schema.required("Jila selection is required") : schema
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      if (values.user_type === "jila" && selectedJila) {
        values.user_type_id = selectedJila;
      } else if (values.user_type === "vibhag" && selectedVibhag) {
        values.user_type_id = selectedVibhag;
      }

      const { jila, ...filteredValues } = values;

      await axios.post(`${BASE_URL}/api/v1/register`, filteredValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Account created successfully!");
      navigate("/dashboard/view-user");
    } catch (error) {
      console.error("Error occurred during user creation:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const translateName = (name, translationMap) => {
    if (language.trim() === "hindi" && translationMap[name]) {
      return translationMap[name];
    }
    return name;
  };


  return (
    <Container fluid className="d-flex justify-content-center align-items-center ">
      <Row className="w-100">
        <Col md={10} lg={8} xl={6} className="mx-auto">
          <Card className="shadow p-4 w-100">
            <h3 className="text-center mb-4">{labels?.CreateUser}</h3>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">{labels?.UserType}</label>
                    <Field as="select" name="user_type" className="form-control"
                      onChange={(e) => {
                        setSelectedUserType(e.target.value);
                        setFieldValue("user_type", e.target.value);
                        setSelectedVibhag("");
                        setSelectedJila("");
                      }}
                    >
                      <option value="">{labels?.SelectUserType}</option>
                      {user_type === "kendra" && (
                        <>
                          <option value="kshetra">{labels?.Kshetra}</option>
                          <option value="prant">{labels?.Prant}</option>
                          <option value="vibhag">{labels?.Vibhag}</option>
                          <option value="jila">{labels?.Jila}</option>
                        </>
                      )}
                      {user_type === "kshetra" && (
                        <>
                          <option value="prant">{labels?.Prant}</option>
                          <option value="vibhag">{labels?.Vibhag}</option>
                          <option value="jila">{labels?.Jila}</option>
                        </>
                      )}
                      {user_type === "prant" && (
                        <>
                          <option value="vibhag">{labels?.Vibhag}</option>
                          <option value="jila">{labels?.Jila}</option>
                        </>
                      )}
                      {user_type === "vibhag" && (
                        <>
                          <option value="jila">{labels?.Jila}</option>
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">{labels?.Level}</label>
                    <BootstrapForm.Select
                      value={selectedLevel}
                      onChange={(e) => {
                        const selectedValue = Number(e.target.value);
                        setSelectedLevel(selectedValue);
                        setFieldValue("level", selectedValue);
                      }}
                    >
                      <option value="">{labels?.SelectLevel}</option>
                      {levelList?.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </BootstrapForm.Select>
                  </div>

                  {user_type === "kendra" && (
                    <>
                      {selectedUserType === "kshetra" && (
                        <div className="mb-3">
                          <label className="form-label">{labels?.SelectKshetra}</label>
                          <BootstrapForm.Select
                            value={selectedKshetra}
                            onChange={(e) => {
                              setSelectedKshetra(e.target.value);
                              setFieldValue("user_type_id", e.target.value);
                            }}
                          >
                            <option value="">{labels?.SelectKshetra}</option>
                            {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                              const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                              return (
                                <option key={kshetra._id} value={kshetra._id}>
                                  {translatedKshetra}
                                </option>
                              )
                            })}
                          </BootstrapForm.Select>
                        </div>
                      )}
                      {selectedUserType === "prant" && (
                        <div className="mb-3">
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>
                          <label className="form-label">{labels?.SelectPrant}</label>
                          <BootstrapForm.Select
                            value={selectedPrant}
                            onChange={(e) => {
                              setSelectedPrant(e.target.value);
                              setFieldValue("user_type_id", e.target.value);
                            }}
                          >
                            <option value="">{labels?.SelectPrant}</option>
                            {hierarchyData?.[0]?.kshetras
                              ?.find(kshetra => kshetra._id === selectedKshetra)
                              ?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                );
                              })}
                          </BootstrapForm.Select>
                        </div>
                      )}
                      {selectedUserType === "vibhag" && (
                        <div className="mb-3">
                          {/* Kshetra Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setSelectedPrant(''); // Reset prant on kshetra change
                                setSelectedVibhag(''); // Reset vibhag on kshetra change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Prant Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectPrant}</label>
                            <BootstrapForm.Select
                              value={selectedPrant}
                              onChange={(e) => {
                                setSelectedPrant(e.target.value);
                                setSelectedVibhag(''); // Reset vibhag on prant change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectPrant}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Vibhag Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectVibhag}</label>
                            <BootstrapForm.Select
                              value={selectedVibhag}
                              onChange={(e) => {
                                setSelectedVibhag(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectVibhag}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags?.map((vibhag) => {
                                const translatedVibhag = translateName(vibhag.vibhag_name, VibhagTranslation);
                                return (
                                  <option key={vibhag._id} value={vibhag._id}>
                                    {translatedVibhag}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>
                        </div>
                      )}
                      {selectedUserType === "jila" && (
                        <div className="mb-3">
                          {/* Kshetra Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setSelectedPrant(''); // Reset prant on kshetra change
                                setSelectedJila(''); // Reset jila on kshetra change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Prant Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectPrant}</label>
                            <BootstrapForm.Select
                              value={selectedPrant}
                              onChange={(e) => {
                                setSelectedPrant(e.target.value);
                                setSelectedJila(''); // Reset jila on prant change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectPrant}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* vibhag condition  */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectVibhag}</label>
                            <BootstrapForm.Select
                              value={selectedVibhag}
                              onChange={(e) => {
                                setSelectedVibhag(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectVibhag}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags?.map((vibhag) => {
                                const translatedVibhag = translateName(vibhag.vibhag_name, VibhagTranslation);
                                return (
                                  <option key={vibhag._id} value={vibhag._id}>
                                    {translatedVibhag}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Jila Selection */}
                          {/* <div className="mb-3">
                            <label className="form-label">{labels?.SelectJila}</label>
                            <BootstrapForm.Select
                              value={selectedJila}
                              onChange={(e) => {
                                setSelectedJila(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectJila}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags.find(v => v._id === selectedVibhag)?.jilas?.map((jila) => {
                                const translatedJila = translateName(jila.jila_name, JilaTranslation);
                                return (
                                  <option key={jila._id} value={jila._id}>
                                    {translatedJila}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div> */}
                        </div>
                      )}
                    </>
                  )}

                  {user_type === "kshetra" && (
                    <>
                     {selectedUserType === "prant" && (
                        <div className="mb-3">
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>
                          <label className="form-label">{labels?.SelectPrant}</label>
                          <BootstrapForm.Select
                            value={selectedPrant}
                            onChange={(e) => {
                              setSelectedPrant(e.target.value);
                              setFieldValue("user_type_id", e.target.value);
                            }}
                          >
                            <option value="">{labels?.SelectPrant}</option>
                            {hierarchyData?.[0]?.kshetras
                              ?.find(kshetra => kshetra._id === selectedKshetra)
                              ?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                );
                              })}
                          </BootstrapForm.Select>
                        </div>
                      )}
                      {selectedUserType === "vibhag" && (
                        <div className="mb-3">
                          {/* Kshetra Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setSelectedPrant(''); // Reset prant on kshetra change
                                setSelectedVibhag(''); // Reset vibhag on kshetra change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Prant Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectPrant}</label>
                            <BootstrapForm.Select
                              value={selectedPrant}
                              onChange={(e) => {
                                setSelectedPrant(e.target.value);
                                setSelectedVibhag(''); // Reset vibhag on prant change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectPrant}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Vibhag Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectVibhag}</label>
                            <BootstrapForm.Select
                              value={selectedVibhag}
                              onChange={(e) => {
                                setSelectedVibhag(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectVibhag}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags?.map((vibhag) => {
                                const translatedVibhag = translateName(vibhag.vibhag_name, VibhagTranslation);
                                return (
                                  <option key={vibhag._id} value={vibhag._id}>
                                    {translatedVibhag}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>
                        </div>
                      )}
                      {selectedUserType === "jila" && (
                        <div className="mb-3">
                          {/* Kshetra Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectKshetra}</label>
                            <BootstrapForm.Select
                              value={selectedKshetra}
                              onChange={(e) => {
                                setSelectedKshetra(e.target.value);
                                setSelectedPrant(''); // Reset prant on kshetra change
                                setSelectedJila(''); // Reset jila on kshetra change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectKshetra}</option>
                              {hierarchyData?.[0]?.kshetras?.map((kshetra) => {
                                const translatedKshetra = translateName(kshetra.kshetra_name, kshetraTranslation);
                                return (
                                  <option key={kshetra._id} value={kshetra._id}>
                                    {translatedKshetra}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Prant Selection */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectPrant}</label>
                            <BootstrapForm.Select
                              value={selectedPrant}
                              onChange={(e) => {
                                setSelectedPrant(e.target.value);
                                setSelectedJila(''); // Reset jila on prant change
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectPrant}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants?.map((prant) => {
                                const translatedPrant = translateName(prant.prant_name, PrantTranslation);
                                return (
                                  <option key={prant._id} value={prant._id}>
                                    {translatedPrant}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* vibhag condition  */}
                          <div className="mb-3">
                            <label className="form-label">{labels?.SelectVibhag}</label>
                            <BootstrapForm.Select
                              value={selectedVibhag}
                              onChange={(e) => {
                                setSelectedVibhag(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectVibhag}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags?.map((vibhag) => {
                                const translatedVibhag = translateName(vibhag.vibhag_name, VibhagTranslation);
                                return (
                                  <option key={vibhag._id} value={vibhag._id}>
                                    {translatedVibhag}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div>

                          {/* Jila Selection */}
                          {/* <div className="mb-3">
                            <label className="form-label">{labels?.SelectJila}</label>
                            <BootstrapForm.Select
                              value={selectedJila}
                              onChange={(e) => {
                                setSelectedJila(e.target.value);
                                setFieldValue("user_type_id", e.target.value);
                              }}
                            >
                              <option value="">{labels?.SelectJila}</option>
                              {hierarchyData?.[0]?.kshetras.find(k => k._id === selectedKshetra)?.prants.find(p => p._id === selectedPrant)?.vibhags.find(v => v._id === selectedVibhag)?.jilas?.map((jila) => {
                                const translatedJila = translateName(jila.jila_name, JilaTranslation);
                                return (
                                  <option key={jila._id} value={jila._id}>
                                    {translatedJila}
                                  </option>
                                )
                              })}
                            </BootstrapForm.Select>
                          </div> */}
                        </div>
                      )}
                    </>
                  )}
                  {/* prant */}

                  {(user.user_type === "prant") && (
                    <div className="mb-3">
                      <label className="form-label">{labels?.SelectVibhag}</label>
                      <BootstrapForm.Select
                        value={selectedVibhag}
                        onChange={(e) => {
                          setSelectedVibhag(e.target.value);
                          setSelectedJila("");
                          setFieldValue("user_type_id", e.target.value);
                        }}
                      >
                        <option value="">{labels?.SelectVibhag}</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags?.map((vibhag) => {
                          const translatedVibhag = translateName(vibhag.vibhag_name, VibhagTranslation);
                          return (
                            <option key={vibhag._id} value={vibhag._id}>
                              {translatedVibhag}
                            </option>
                          )
                        })}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  {user.user_type === "vibhag" && selectedVibhag && (
                    <div className="mb-3">
                      
                      <label className="form-label">{labels?.SelectJila}</label>
                      <BootstrapForm.Select
                        value={selectedJila}
                        onChange={(e) => {
                          setSelectedJila(e.target.value);
                          setFieldValue("jila", e.target.value);
                        }}
                      >
                        <option value="">{labels?.SelectJila}</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags[0]?.jilas?.map((jila) => {
                          const translatedJila = translateName(jila.jila_name, JilaTranslation);
                          return (
                            <option key={jila._id} value={jila._id}>
                              {translatedJila}
                            </option>
                          )
                        })}
                      </BootstrapForm.Select>
                    </div>
                  )}

                  {selectedUserType === "jila" && (
                    <div className="mb-3">
                      <label className="form-label">{labels?.SelectJila}</label>
                      <BootstrapForm.Select
                        value={selectedJila}
                        onChange={(e) => {
                          setSelectedJila(e.target.value);
                          setFieldValue("jila", e.target.value);
                        }}
                      >
                        <option value="">{labels?.SelectJila}</option>
                        {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags[0]?.jilas?.map((jila) => {
                          const translatedJila = translateName(jila.jila_name, JilaTranslation);
                          return (
                            <option key={jila._id} value={jila._id}>
                              {translatedJila}
                            </option>
                          );
                        })}
                      </BootstrapForm.Select>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">{labels?.Username}</label>
                    <Field type="text" name="user_name" className="form-control" placeholder="User Name" />
                    <ErrorMessage name="user_name" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">{labels?.FULLNAME}</label>
                    <Field type="text" name="full_name" className="form-control" placeholder="Full Name" />
                    <ErrorMessage name="full_name" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">{labels?.EMAIL}</label>
                    <Field type="email" name="email" className="form-control" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">{labels?.Phone}</label>
                    <Field type="mobile" name="mobile" className="form-control" placeholder="Phone" />
                    <ErrorMessage name="mobile" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">{labels?.Password}</label>
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="btn create-user custom-button" disabled={loading || isSubmitting}>
                      {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default CreateUser;



