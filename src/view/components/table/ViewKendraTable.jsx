import React, { useEffect, useState } from "react";
import { Table, Button, Collapse, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchHierarchy } from "../../redux/slice/hierarchySlice";
import { PropagateLoader } from "react-spinners";
import "./ViewKendraTable.css";

const CollapsibleTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.hierarchy);

  const [openKshettra, setOpenKshettra] = useState({});
  const [openPrant, setOpenPrant] = useState({});
  const [openVibhag, setOpenVibhag] = useState({});

  useEffect(() => {
    dispatch(fetchHierarchy());
  }, [dispatch]);

  const toggleKshettra = (name) => setOpenKshettra((prev) => ({ ...prev, [name]: !prev[name] }));
  const togglePrant = (name) => setOpenPrant((prev) => ({ ...prev, [name]: !prev[name] }));
  const toggleVibhag = (name) => setOpenVibhag((prev) => ({ ...prev, [name]: !prev[name] }));

  const fieldGroups = [
    { title: "महानगर", count: 9 },
    { title: "अन्य नगर", count: 9 },
    { title: "जिला नगर", count: 9 },
    { title: "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या", count: 4 },
    { title: "5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या", count: 2 },
  ];

  const fieldNames = [
    "जिला सम महानगर/भाग संख्या", "इनमें सेवा बस्ती संख्या", "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या", "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या", "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "जिला सम महानगर/भाग संख्या", "इनमें सेवा बस्ती संख्या", "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या", "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या", "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "जिला सम महानगर/भाग संख्या", "इनमें सेवा बस्ती संख्या", "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या", "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या", "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या",
    "इनमें व्यवसायी या कृषक शाखायुक्त ग्राम", "इनमें सेवा कार्ययुक्त ग्राम", "इनमें कुल सेवा कार्य",
    "5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या",
    "इनमें कुल सेवा कार्य",
  ];

  // Helper function to get nested data
  const getNestedData = (jila, fieldName) => {
    if (!jila.reporting_form) return "-";

    const { mahanagar, jilaKendra, anyaNagar, villagesOver5000, villagesUnder5000 } = jila.reporting_form;

    switch (fieldName) {
      case "जिला सम महानगर/भाग संख्या":
        return mahanagar?.zila_sam_mahanagar_bhag_sankhya || "-";
      case "इनमें सेवा बस्ती संख्या":
        return mahanagar?.sewa_basti_sankhya || "-";
      case "सेवा कार्य युक्त सेवा बस्ती":
        return mahanagar?.sewa_kary_yukt_sewa_basti || "-";
      case "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या":
        return mahanagar?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya || "-";
      case "सेवा बस्ती पालक शाखा व मिलन संख्या":
        return mahanagar?.sewa_basti_palak_shakha_w_milan_sankhya || "-";
      case "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या":
        return mahanagar?.sewa_karyakarta_yukt_shakha_w_milan_sankhya || "-";
      case "कुल सेवा कार्यकर्ता":
        return mahanagar?.kul_sewa_karyakarta || "-";
      case "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)":
        return mahanagar?.mahanagar_mein_kul_sewa_kary || "-";
      case "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या":
        return mahanagar?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya || "-";
      case "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या":
        return villagesOver5000?.total_villages || "-";
      case "इनमें व्यवसायी या कृषक शाखायुक्त ग्राम":
        return villagesOver5000?.business_and_farming_villages || "-";
      case "इनमें सेवा कार्ययुक्त ग्राम":
        return villagesOver5000?.service_work_villages || "-";
      case "इनमें कुल सेवा कार्य":
        return villagesOver5000?.total_service_work || "-";
      case "5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या":
        return villagesUnder5000?.service_work_villages || "-";
      case "इनमें कुल सेवा कार्य":
        return villagesUnder5000?.total_service_work || "-";
      default:
        return "-";
    }
  };

  // Calculate totals for a given level (Jila → Vibhag → Prant → Kshetra)
  const calculateTotals = (data, fieldName) => {
    return data.reduce((total, item) => {
      if (item.jilas) {
        return total + item.jilas.reduce((jilaTotal, jila) => {
          const value = getNestedData(jila, fieldName);
          return jilaTotal + (value === "-" ? 0 : Number(value));
        }, 0);
      } else if (item.vibhags) {
        return total + item.vibhags.reduce((vibhagTotal, vibhag) => vibhagTotal + calculateTotals([vibhag], fieldName), 0);
      } else if (item.prants) {
        return total + item.prants.reduce((prantTotal, prant) => prantTotal + calculateTotals([prant], fieldName), 0);
      } else {
        const value = getNestedData(item, fieldName);
        return total + (value === "-" ? 0 : Number(value));
      }
    }, 0);
  };

  // Calculate grand total for all Kshetras
  const calculateGrandTotal = (fieldName) => {
    return data.reduce((total, kendra) => {
      return total + kendra.kshetras.reduce((kshettraTotal, kshettra) => {
        return kshettraTotal + calculateTotals([kshettra], fieldName);
      }, 0);
    }, 0);
  };

  if (loading) return <PropagateLoader className="text-center" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="mt-3">
      <Table responsive bordered hover size="sm" className="custom-table">
        <thead>
          <tr>
            <th rowSpan="2" className="fixed-header">Kshetra/Prant/Vibhag/Jila</th>
            {fieldGroups.map((group, index) => (
              <th key={index} colSpan={group.count} className="fixed-header">
                {group.title}
              </th>
            ))}
          </tr>
          <tr>
            {fieldNames.map((name, index) => (
              <th key={index} className="fixed-header">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((kendra) =>
            kendra.kshetras.map((kshettra) => (
              <React.Fragment key={kshettra._id}>
                 <tr className="kshettra-row">
                  <td>
                    <Button variant="link" onClick={() => toggleKshettra(kshettra.kshetra_name)}>
                      {kshettra.kshetra_name}
                    </Button>
                  </td>
                  {fieldNames.map((fieldName, index) => (
                    <td key={index}>{calculateTotals([kshettra], fieldName) || "-"}</td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={fieldNames.length + 1}>
                    <Collapse in={openKshettra[kshettra.kshetra_name]}>
                      <div>
                        <Table bordered size="sm" className="custom-table">
                          <tbody>
                            {kshettra.prants.map((prant) => (
                              <React.Fragment key={prant._id}>
                                <tr className="prant-row">
                                  <td>
                                    <Button variant="link" onClick={() => togglePrant(prant.prant_name)}>
                                      {prant.prant_name}
                                    </Button>
                                  </td>
                                  {fieldNames.map((fieldName, index) => (
                                    <td key={index}>{calculateTotals([prant], fieldName) || "-"}</td>
                                  ))}
                                </tr>
                                <tr>
                                  <td colSpan={fieldNames.length + 1}>
                                    <Collapse in={openPrant[prant.prant_name]}>
                                      <div>
                                        <Table bordered size="sm" className="custom-table">
                                          <tbody>
                                            {prant.vibhags.map((vibhag) => (
                                              <React.Fragment key={vibhag._id}>
                                                <tr className="vibhag-row">
                                                  <td>
                                                    <Button variant="link" onClick={() => toggleVibhag(vibhag.vibhag_name)}>
                                                      {vibhag.vibhag_name}
                                                    </Button>
                                                  </td>
                                                  {fieldNames.map((fieldName, index) => (
                                                    <td key={index}>{calculateTotals([vibhag], fieldName) || "-"}</td>
                                                  ))}
                                                </tr>
                                                <tr>
                                                  <td colSpan={fieldNames.length + 1}>
                                                    <Collapse in={openVibhag[vibhag.vibhag_name]}>
                                                      <div>
                                                        <Table bordered size="sm" className="custom-table">
                                                          <tbody>
                                                            {vibhag.jilas.map((jila) => (
                                                              <tr key={jila._id} className="jila-row" >
                                                                <td>{jila.jila_name}</td>
                                                                {fieldNames.map((fieldName, index) => (
                                                                  <td key={index}>
                                                                    {getNestedData(jila, fieldName)}
                                                                  </td>
                                                                ))}
                                                              </tr>
                                                            ))}
                                                          </tbody>
                                                        </Table>
                                                      </div>
                                                    </Collapse>
                                                  </td>
                                                </tr>
                                              </React.Fragment>
                                            ))}
                                          </tbody>
                                        </Table>
                                      </div>
                                    </Collapse>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
          {/* Grand Total Row */}
          <tr>
            <td className="fixed-header">Grand Total</td>
            {fieldNames.map((fieldName, index) => (
              <td key={index}>{calculateGrandTotal(fieldName) || "-"}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default CollapsibleTable;
