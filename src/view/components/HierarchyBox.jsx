// import React, { useState } from "react";
// import { Card, Button, Collapse, Container } from "react-bootstrap";
// import "./hierarchyBox.css";
// const HierarchyBox = () => {
//   const [openSections, setOpenSections] = useState({
//     allIndia: true,
//     kshetra: true,
//     prant: true,
//     vibhag: true,
//     jila1: true,
//     jila2: true,
//   });

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   return (
//     <Container className="mt-2" style={{ maxWidth: "800px" }}>
//       {/* All India */}
//       <Card
//         className="recievedCard"
//         style={{  color: "black" }}
//       >
//         <Card.Body className="jilsCard-all-india">
//           <Button
//             variant="link"
//             style={{ color: "black" }}
//             onClick={() => toggleSection("allIndia")}
//           >
//             All India
//           </Button>
//         </Card.Body>
//       </Card>

//       {/* Kshetra Level */}
//       <Collapse in={openSections["allIndia"]}>
//         <div
//           style={{
//             borderLeft: "2px solid #000",
//             paddingLeft: "15px",
//             marginLeft: "15px",
//           }}
//         >
//           <Card
//             className="recievedCard mb-2"
//             style={{ backgroundColor: "#80ff80", color: "black" }}
//           >
//             <Card.Body className="jilsCard">
//               <Button
//                 variant="link"
//                 style={{ color: "black", padding: "0" }}
//                 onClick={() => toggleSection("kshetra")}
//               >
//                 Kshetra Level
//               </Button>
//             </Card.Body>
//           </Card>

//           {/* Prant Level */}
//           <Collapse in={openSections["kshetra"]}>
//             <div
//               style={{
//                 borderLeft: "2px solid #000",
//                 paddingLeft: "15px",
//                 marginLeft: "15px",
//               }}
//             >
//               <Card
//                 className="recievedCard mb-2"
//                 style={{ backgroundColor: "#ff4d4d", color: "black" }}
//               >
//                 <Card.Body className="jilsCard">
//                   <Button
//                     variant="link"
//                     style={{ color: "black", padding: "0" }}
//                     onClick={() => toggleSection("prant")}
//                   >
//                     Prant Level
//                   </Button>
//                 </Card.Body>
//               </Card>

//               {/* Vibhag Level */}
//               <Collapse in={openSections["prant"]}>
//                 <div
//                   style={{
//                     borderLeft: "2px solid #000",
//                     paddingLeft: "15px",
//                     marginLeft: "15px",
//                   }}
//                 >
//                   <Card
//                     className="recievedCard mb-2"
//                     style={{ backgroundColor: "#80ff80", color: "black" }}
//                   >
//                     <Card.Body className="jilsCard">
//                       <Button
//                         variant="link"
//                         style={{ color: "black", padding: "0" }}
//                         onClick={() => toggleSection("vibhag")}
//                       >
//                         Vibhag Level
//                       </Button>
//                     </Card.Body>
//                   </Card>

//                   {/* Jila Levels */}
//                   <Collapse in={openSections["vibhag"]}>
//                     <div
//                       style={{
//                         borderLeft: "2px solid #000",
//                         paddingLeft: "15px",
//                         marginLeft: "15px",
//                       }}
//                     >
//                       <Card
//                         className="recievedCard mb-2"
//                         style={{ backgroundColor: "#ff4d4d", color: "black" }}
//                       >
//                         <Card.Body className="jilsCard">
//                           <Button
//                             variant="link"
//                             style={{ color: "black", padding: "0" }}
//                             onClick={() => toggleSection("jila1")}
//                           >
//                             Jila Level 1
//                           </Button>
//                         </Card.Body>
//                       </Card>
//                       <Card
//                         className="recievedCard mb-2"
//                         style={{ backgroundColor: "#80ff80", color: "black" }}
//                       >
//                         <Card.Body className="jilsCard">
//                           <Button
//                             variant="link"
//                             style={{ color: "black", padding: "0" }}
//                             onClick={() => toggleSection("jila1")}
//                           >
//                             Jila 
//                           </Button>
//                         </Card.Body>
//                       </Card>
//                       <Card
//                         className="recievedCard mb-2"
//                         style={{ backgroundColor: "#ff4d4d", color: "black" }}
//                       >
//                         <Card.Body className="jilsCard">
//                           <Button
//                             variant="link"
//                             style={{ color: "black", padding: "0" }}
//                             onClick={() => toggleSection("jila1")}
//                           >
//                             Jila 
//                           </Button>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   </Collapse>
//                 </div>
//               </Collapse>
//             </div>
//           </Collapse>
//         </div>
//       </Collapse>
//     </Container>
//   );
// };

// export default HierarchyBox;





import React, { useState } from "react";
import { Card, Button, Collapse, Container } from "react-bootstrap";
import "./hierarchyBox.css";

const HierarchyBox = () => {
  const [openSections, setOpenSections] = useState({
    allIndia: true,
    kshetra: true,
    prant: true,
    vibhag: true,
    jila1: true,
    jila2: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Container className="mt-2 hierarchy-container">
      {/* All India */}
      <Card className="recievedCard">
        <Card.Body className="jilsCard-all-india">
          <Button
            variant="link"
            className="hierarchy-btn"
            onClick={() => toggleSection("allIndia")}
          >
            All India
          </Button>
        </Card.Body>
      </Card>

      {/* Kshetra Level */}
      <Collapse in={openSections["allIndia"]}>
        <div className="hierarchy-level">
          <Card className="recievedCard level-kshetra">
            <Card.Body>
              <Button
                variant="link"
                className="hierarchy-btn"
                onClick={() => toggleSection("kshetra")}
              >
                Kshetra Level
              </Button>
            </Card.Body>
          </Card>

          {/* Prant Level */}
          <Collapse in={openSections["kshetra"]}>
            <div className="hierarchy-level">
              <Card className="recievedCard level-prant">
                <Card.Body>
                  <Button
                    variant="link"
                    className="hierarchy-btn"
                    onClick={() => toggleSection("prant")}
                  >
                    Prant Level
                  </Button>
                </Card.Body>
              </Card>

              {/* Vibhag Level */}
              <Collapse in={openSections["prant"]}>
                <div className="hierarchy-level">
                  <Card className="recievedCard level-vibhag">
                    <Card.Body>
                      <Button
                        variant="link"
                        className="hierarchy-btn"
                        onClick={() => toggleSection("vibhag")}
                      >
                        Vibhag Level
                      </Button>
                    </Card.Body>
                  </Card>

                  {/* Jila Levels */}
                  <Collapse in={openSections["vibhag"]}>
                    <div className="hierarchy-level">
                      <Card className="recievedCard level-jila">
                        <Card.Body>
                          <Button
                            variant="link"
                            className="hierarchy-btn"
                            onClick={() => toggleSection("jila1")}
                          >
                            Jila Level 1
                          </Button>
                        </Card.Body>
                      </Card>
                      <Card className="recievedCard level-jila">
                        <Card.Body>
                          <Button
                            variant="link"
                            className="hierarchy-btn"
                            onClick={() => toggleSection("jila1")}
                          >
                            Jila
                          </Button>
                        </Card.Body>
                      </Card>
                      <Card className="recievedCard level-jila">
                        <Card.Body>
                          <Button
                            variant="link"
                            className="hierarchy-btn"
                            onClick={() => toggleSection("jila1")}
                          >
                            Jila
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </Collapse>
                </div>
              </Collapse>
            </div>
          </Collapse>
        </div>
      </Collapse>
    </Container>
  );
};

export default HierarchyBox;
