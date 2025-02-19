import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchHierarchy } from "../redux/slice/hierarchySlice";
import { Button, Spinner, Form as BootstrapForm } from "react-bootstrap";

const CreateUser = () => {
  const dispatch = useDispatch();
  const { data: hierarchyData, loading } = useSelector((state) => state.hierarchy);
  
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedKshetra, setSelectedKshetra] = useState("");
  const [selectedPrant, setSelectedPrant] = useState("");
  const [selectedVibhag, setSelectedVibhag] = useState("");

  useEffect(() => {
    dispatch(fetchHierarchy());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        user_type: "",
        user_name: "",
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        kshetra: "",
        prant: "",
        vibhag: "",
        jila: "",
      }}
      onSubmit={(values) => {
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          {/* User Type Dropdown */}
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <Field
              as="select"
              name="user_type"
              className="form-control"
              onChange={(e) => {
                setSelectedUserType(e.target.value);
                setFieldValue("user_type", e.target.value);
              }}
            >
              <option value="">Select User Type</option>
              <option value="kshetra">Kshetra</option>
              <option value="prant">Prant</option>
              <option value="vibhag">Vibhag</option>
              <option value="jila">Jila</option>
            </Field>
            <ErrorMessage name="user_type" component="div" className="text-danger mt-1" />
          </div>

          {/* Kshetra Dropdown */}
          {(selectedUserType === "kshetra" || selectedUserType === "prant" || selectedUserType === "vibhag" || selectedUserType === "jila") && (
            <div className="mb-3">
              <label className="form-label">Kshetra</label>
              <BootstrapForm.Select
                value={selectedKshetra}
                onChange={(e) => {
                  setSelectedKshetra(e.target.value);
                  setFieldValue("kshetra", e.target.value);
                }}
              >
                <option value="">Select Kshetra</option>
               {hierarchyData?.[0]?.kshetras?.map((kshetra) => (
                
                  <option key={kshetra._id} value={kshetra.kshetra_name}>
                    {kshetra.kshetra_name} dfsdfsdfsfdsf
                  </option>
                ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Prant Dropdown */}
          {(selectedUserType === "prant" || selectedUserType === "vibhag" || selectedUserType === "jila") && (
            <div className="mb-3">
              <label className="form-label">Prant</label>
              <BootstrapForm.Select
                value={selectedPrant}
                onChange={(e) => {
                  setSelectedPrant(e.target.value);
                  setFieldValue("prant", e.target.value);
                }}
              >
                <option value="">Select Prant</option>
                {hierarchyData?.[0]?.kshetras[0]?.prants?.map((prant) => (
                    <option key={prant._id} value={prant.prant_name}>
                      {prant.prant_name}
                    </option>
                  ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Vibhag Dropdown */}
          {(selectedUserType === "vibhag" || selectedUserType === "jila") && (
            <div className="mb-3">
              <label className="form-label">Vibhag</label>
              <BootstrapForm.Select
                value={selectedVibhag}
                onChange={(e) => {
                  setSelectedVibhag(e.target.value);
                  setFieldValue("vibhag", e.target.value);
                }}
              >
                <option value="">Select Vibhag</option>
                {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags?.map((vibhag) => (
                    <option key={vibhag._id} value={vibhag.vibhag_name}>
                      {vibhag.vibhag_name}
                    </option>
                  ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Jila Dropdown */}
          {selectedUserType === "jila" && (
            <div className="mb-3">
              <label className="form-label">Jila</label>
              <BootstrapForm.Select
                name="jila"
                onChange={(e) => setFieldValue("jila", e.target.value)}
              >
                <option value="">Select Jila</option>
                {hierarchyData?.[0]?.kshetras[0]?.prants[0]?.vibhags[0]?.jilas?.map((jila) => (
                    <option key={jila._id} value={jila.jila_name}>
                      {jila.jila_name}
                    </option>
                  ))}
              </BootstrapForm.Select>
            </div>
          )}

          {/* Other Fields */}
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <Field type="text" name="user_name" className="form-control" />
            <ErrorMessage name="user_name" component="div" className="text-danger mt-1" />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <Field type="text" name="full_name" className="form-control" />
            <ErrorMessage name="full_name" component="div" className="text-danger mt-1" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger mt-1" />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <Field type="text" name="mobile" className="form-control" />
            <ErrorMessage name="mobile" component="div" className="text-danger mt-1" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger mt-1" />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
              {loading ? <Spinner animation="border" size="sm" /> : "Create User"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;


