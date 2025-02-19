import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Collapse, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchHierarchy } from "../../redux/slice/hierarchySlice";
import { PropagateLoader } from "react-spinners";
import "./ViewKendraTable.css";

const CollapsibleTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.hierarchy);


  const user = useSelector((state) => state.auth.user);

  const [openKshettra, setOpenKshettra] = useState({});
  const [openPrant, setOpenPrant] = useState({});
  const [openVibhag, setOpenVibhag] = useState({});

  // const [selectedPrantId, setSelectedPrantId] = React.useState(null);

  const [selectedKshettraId, setSelectedKshettraId] = useState(null);
  const [selectedPrantId, setSelectedPrantId] = useState(null);
  const [selectedVibhagId, setSelectedVibhagId] = useState(null);

  // Function to handle row click
  const handlePrantRowClick = (id, index, type) => {
    if (type === "prant") {

      setSelectedPrantId((prantId) => (prantId === id ? null : id));
    } else if (type === "vibhag") {
      setSelectedVibhagId((vibhagId) => (vibhagId === id ? null : id));
    } else if (type === "kshettra") {
      setSelectedKshettraId((kshettraId) => (kshettraId === id ? null : id));
    }
  };

  useEffect(() => {
    dispatch(fetchHierarchy());
  }, [dispatch]);

  const toggleKshettra = (name) =>
    setOpenKshettra((prev) => ({ ...prev, [name]: !prev[name] }));
  const togglePrant = (name) =>
    setOpenPrant((prev) => ({ ...prev, [name]: !prev[name] }));
  const toggleVibhag = (name) =>
    setOpenVibhag((prev) => ({ ...prev, [name]: !prev[name] }));

  const fieldGroups = [
    { title: "महानगर", count: 9 },
    { title: "अन्य नगर", count: 9 },
    { title: "जिला नगर", count: 9 },
    { title: "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या", count: 4 },
    { title: "5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या", count: 2 },
  ];

  const [openFieldGroups, setOpenFieldGroups] = useState(
    Array(fieldGroups.length).fill(true)
  );

  const calculateGroupTotal = (groupIndex, kendra) => {
    const startIndex = fieldGroups
      .slice(0, groupIndex)
      .reduce((sum, group) => sum + group.count, 0);
    const endIndex = startIndex + fieldGroups[groupIndex].count;

    let total = 0;
    for (let i = startIndex; i < endIndex; i++) {
      const fieldName = fieldNames[i];
      total += calculateTotals([kendra], fieldName) || 0;
    }
    return total;
  };

  // console.log("userTypeeeee",user.user_type_id);
 

  // console.log("datatatatta",data[0]?.kshetras[9]?.prants[0]?.vibhags[0]?.jilas[0]._id)
  

  
  

  const fieldNames = [
    "जिला सम महानगर/भाग संख्या",
    "इनमें सेवा बस्ती संख्या",
    "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या",
    "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या",
    "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "जिला सम महानगर/भाग संख्या",
    "इनमें सेवा बस्ती संख्या",
    "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या",
    "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या",
    "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "जिला सम महानगर/भाग संख्या",
    "इनमें सेवा बस्ती संख्या",
    "सेवा कार्य युक्त सेवा बस्ती",
    "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या",
    "सेवा बस्ती पालक शाखा व मिलन संख्या",
    "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या",
    "कुल सेवा कार्यकर्ता",
    "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)",
    "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या",
    "5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या",
    "इनमें व्यवसायी या कृषक शाखायुक्त ग्राम",
    "इनमें सेवा कार्ययुक्त ग्राम",
    "इनमें कुल सेवा कार्य",
    "5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या",
    "इनमें कुल सेवा कार्य",
  ];

  // Helper function to get nested data
  const getNestedData = (jila, fieldName) => {
    if (!jila.reporting_form) return "-";

    const {
      mahanagar,
      jilaKendra,
      anyaNagar,
      villagesOver5000,
      villagesUnder5000,
    } = jila.reporting_form;

    switch (fieldName) {
      case "जिला सम महानगर/भाग संख्या":
        return mahanagar?.zila_sam_mahanagar_bhag_sankhya || "-";
      case "इनमें सेवा बस्ती संख्या":
        return mahanagar?.sewa_basti_sankhya || "-";
      case "सेवा कार्य युक्त सेवा बस्ती":
        return mahanagar?.sewa_kary_yukt_sewa_basti || "-";
      case "व्यवसायी व महाविद्यालय शाखा व मिलन संख्या":
        return (
          mahanagar?.vyavsayee_w_mahawidyalay_shakha_w_milan_sankhya || "-"
        );
      case "सेवा बस्ती पालक शाखा व मिलन संख्या":
        return mahanagar?.sewa_basti_palak_shakha_w_milan_sankhya || "-";
      case "सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या":
        return mahanagar?.sewa_karyakarta_yukt_shakha_w_milan_sankhya || "-";
      case "कुल सेवा कार्यकर्ता":
        return mahanagar?.kul_sewa_karyakarta || "-";
      case "महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)":
        return mahanagar?.mahanagar_mein_kul_sewa_kary || "-";
      case "मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या":
        return (
          mahanagar?.masik_sewa_basti_sampark_karne_wali_shakha_w_milan_sankhya ||
          "-"
        );
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

  const calculateTotals = (data, fieldName) => {
    return data.reduce((total, item) => {
      if (item.jilas) {
        return (
          total +
          item.jilas.reduce((jilaTotal, jila) => {
            const value = getNestedData(jila, fieldName);
            return jilaTotal + (value === "-" ? 0 : Number(value));
          }, 0)
        );
      } else if (item.vibhags) {
        return (
          total +
          item.vibhags.reduce(
            (vibhagTotal, vibhag) =>
              vibhagTotal + calculateTotals([vibhag], fieldName),
            0
          )
        );
      } else if (item.prants) {
        return (
          total +
          item.prants.reduce(
            (prantTotal, prant) =>
              prantTotal + calculateTotals([prant], fieldName),
            0
          )
        );
      } else {
        const value = getNestedData(item, fieldName);
        return total + (value === "-" ? 0 : Number(value));
      }
    }, 0);
  };

  // Calculate grand total for all Kshetras
  const calculateGrandTotal = (fieldName) => {
    return data.reduce((total, kendra) => {
      return (
        total +
        kendra.kshetras.reduce((kshettraTotal, kshettra) => {
          return kshettraTotal + calculateTotals([kshettra], fieldName);
        }, 0)
      );
    }, 0);
  };

  const toggleFieldGroup = (index) => {
    setOpenFieldGroups((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  
  const filteredData = data
  .flatMap(kendra => kendra.kshetras)
  .flatMap(kshettra => kshettra.prants)
  .flatMap(prant => prant.vibhags)
  .flatMap(vibhag => vibhag.jilas)
  .filter(jila => jila._id === user.user_type_id);

  if (loading) return <PropagateLoader className="text-center" />;
  if (error) return <p>Error: {error?.message}</p>;

  return (
    <Container fluid className="mt-3">
      <Table responsive bordered hover size="sm" className="custom-table">
        <thead>
          <tr>
            <th rowSpan="2" className="fixed-header table-main-heading">
              क्षेत्र / प्रांत / विभाग / जिला
            </th>
            {fieldGroups.map((group, index) => (
              <th
                key={index}
                colSpan={group.count}
                className="fixed-header table-main-heading"
                onClick={() => toggleFieldGroup(index)}
                style={{ cursor: "pointer", backgroundColor: "#f0f0f0" }}
              >
                {group.title} {openFieldGroups[index] ? "▲" : "▼"}
              </th>
            ))}
          </tr>
          <tr>
          {fieldNames.map((name, index) => {
              const groupIndex = fieldGroups.findIndex(
                (group, i) =>
                  index >=
                    fieldGroups
                      .slice(0, i)
                      .reduce((sum, g) => sum + g.count, 0) &&
                  index <
                    fieldGroups
                      .slice(0, i + 1)
                      .reduce((sum, g) => sum + g.count, 0)
              );
              return openFieldGroups[groupIndex] ? (
                <th key={index} className="fixed-header">
                  {name} 
                </th>
              ) : (
                <th
                  key={index}
                  className="fixed-header"
                  style={{ visibility: "hidden" }}
                >
                 
                </th>
              );
            })}
          </tr>
        </thead>
        {user.user_type === 'jila' ? (
          <tbody>
    {filteredData.map((jila) => (
      <tr key={jila._id} className="jila-row">
        <td>{jila.jila_name}</td>
        {fieldNames.map((fieldName, index) => (
          <td key={index}>{getNestedData(jila, fieldName)}</td>
        ))}
      </tr>
    ))}
  </tbody>
) : (
        <tbody>
          {data.map((kendra) =>
            kendra.kshetras.map((kshettra, index) => (
              <React.Fragment key={kshettra._id}>
                <tr
                  className="kshettra-row"
                  style={{
                    backgroundColor:
                      selectedKshettraId === kshettra._id
                        ? "#add8e6"
                        : "transparent",
                  }}
                  onClick={() =>
                    handlePrantRowClick(kshettra._id, index, "kshettra")
                  }
                >
                  <td>
                    <Button
                      variant="link"
                      onClick={() => toggleKshettra(kshettra.kshetra_name)}
                    >
                      {kshettra.kshetra_name}
                    </Button>
                  </td>
                  {fieldNames.map((fieldName, index) => (
                    <td key={index}>
                      {calculateTotals([kshettra], fieldName) || "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={fieldNames.length + 1}>
                    <Collapse in={openKshettra[kshettra.kshetra_name]}>
                      <div>
                        <Table bordered size="sm" className="custom-table">
                          <tbody>
                            {kshettra.prants.map((prant, index) => (
                              <React.Fragment key={prant._id}>
                                <tr
                                  className="prant-row"
                                  style={{
                                    backgroundColor:
                                      selectedPrantId === prant._id
                                        ? "#42cef5"
                                        : "transparent",
                                  }}
                                  onClick={() =>
                                    handlePrantRowClick(
                                      prant._id,
                                      index,
                                      "prant"
                                    )
                                  }
                                >
                                  <td>
                                    <Button
                                      variant="link"
                                      onClick={() =>
                                        togglePrant(prant.prant_name)
                                      }
                                    >
                                      {prant.prant_name}
                                    </Button>
                                  </td>
                                  {fieldNames.map((fieldName, index) => (
                                    <td key={index}>
                                      {calculateTotals([prant], fieldName) ||
                                        "-"}
                                    </td>
                                  ))}
                                </tr>
                                <tr>
                                  <td colSpan={fieldNames.length + 1}>
                                    <Collapse in={openPrant[prant.prant_name]}>
                                      <div>
                                        <Table
                                          bordered
                                          size="sm"
                                          className="custom-table"
                                        >
                                          <tbody>
                                            {prant.vibhags.map(
                                              (vibhag, index) => (
                                                <React.Fragment
                                                  key={vibhag._id}
                                                >
                                                  <tr
                                                    className="vibhag-row"
                                                    style={{
                                                      backgroundColor:
                                                        selectedVibhagId ===
                                                        vibhag._id
                                                          ? "#c242f5"
                                                          : "transparent",
                                                    }}
                                                    onClick={() =>
                                                      handlePrantRowClick(
                                                        vibhag._id,
                                                        index,
                                                        "vibhag"
                                                      )
                                                    }
                                                  >
                                                    <td>
                                                      <Button
                                                        variant="link"
                                                        onClick={() =>
                                                          toggleVibhag(
                                                            vibhag.vibhag_name
                                                          )
                                                        }
                                                      >
                                                        {vibhag.vibhag_name}
                                                      </Button>
                                                    </td>
                                                    {fieldNames.map(
                                                      (fieldName, index) => (
                                                        <td key={index}>
                                                          {calculateTotals(
                                                            [vibhag],
                                                            fieldName
                                                          ) || "-"}
                                                        </td>
                                                      )
                                                    )}
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      colSpan={
                                                        fieldNames.length + 1
                                                      }
                                                    >
                                                      <Collapse
                                                        in={
                                                          openVibhag[
                                                            vibhag.vibhag_name
                                                          ]
                                                        }
                                                      >
                                                        <div>
                                                          <Table
                                                            bordered
                                                            size="sm"
                                                            className="custom-table"
                                                          >
                                                            <tbody>
                                                              {vibhag.jilas.map(
                                                                (jila) => (
                                                                  <tr
                                                                    key={
                                                                      jila._id
                                                                    }
                                                                    className="jila-row"
                                                                  >
                                                                    <td>
                                                                      {
                                                                        jila.jila_name
                                                                      }
                                                                    </td>
                                                                    {fieldNames.map(
                                                                      (
                                                                        fieldName,
                                                                        index
                                                                      ) => (
                                                                        <td
                                                                          key={
                                                                            index
                                                                          }
                                                                        >
                                                                          {getNestedData(
                                                                            jila,
                                                                            fieldName
                                                                          )}
                                                                        </td>
                                                                      )
                                                                    )}
                                                                  </tr>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </Table>
                                                        </div>
                                                      </Collapse>
                                                    </td>
                                                  </tr>
                                                </React.Fragment>
                                              )
                                            )}
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
)}

      </Table>
    </Container>
  );
};

export default CollapsibleTable;
