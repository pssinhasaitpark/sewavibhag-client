import React from "react";
import "./ViewKendraTable.css"; // Import the CSS file for custom styling

const ViewKendraTable = () => {
  return (
    <>
      {/* <div className="container">
        <div className="table-scroll">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>जिला</th>
                <th>जिला सम महानगर/भाग संख्या</th>
                <th>इनमें सेवा बस्ती संख्या</th>
                <th>सेवा कार्य युक्त सेवा बस्ती</th>
                <th>व्यवसायी व महाविद्यालय शाखा व मिलन संख्या</th>
                <th>सेवा बस्ती पालक शाखा व मिलन संख्या</th>
                <th>सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या</th>
                <th>कुल सेवा कार्यकर्ता</th>
                <th>
                  महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)
                </th>
                <th>मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या</th>
                <th>जिलाकेंद्र</th>
                <th>अन्य नगर</th>
                <th>5000 या उससे अधिक जनसंख्या के ग्राम</th>
                <th>5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या</th>
                <th>इनमें व्यवसायी या कृषक शाखायुक्त ग्राम</th>
                <th>इनमें सेवा कार्ययुक्त ग्राम</th>
                <th>इनमें कुल सेवा कार्य</th>
                <th>5000 से कम जनसंख्या के ग्राम</th>
                <th>इनमें सेवा कार्ययुक्त ग्राम</th>
                <th>इनमें कुल सेवा कार्य</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td>Jila</td>
                  <td>50</td>

                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>50</td>
                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>50</td>
                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>84</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="container mt-3">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>जिला</th>
                <th>जिला सम महानगर/भाग संख्या</th>
                <th>इनमें सेवा बस्ती संख्या</th>
                <th>सेवा कार्य युक्त सेवा बस्ती</th>
                <th>व्यवसायी व महाविद्यालय शाखा व मिलन संख्या</th>
                <th>सेवा बस्ती पालक शाखा व मिलन संख्या</th>
                <th>सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या</th>
                <th>कुल सेवा कार्यकर्ता</th>
                <th>महानगर में कुल सेवा कार्य</th>
                <th>मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या</th>
                <th>जिलाकेंद्र</th>
                <th>अन्य नगर</th>
                <th>5000 या उससे अधिक जनसंख्या के ग्राम</th>
                <th>5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या</th>
                <th>इनमें व्यवसायी या कृषक शाखायुक्त ग्राम</th>
                <th>इनमें सेवा कार्ययुक्त ग्राम</th>
                <th>इनमें कुल सेवा कार्य</th>
                <th>5000 से कम जनसंख्या के ग्राम</th>
                <th>इनमें सेवा कार्ययुक्त ग्राम</th>
                <th>इनमें कुल सेवा कार्य</th>
              </tr>
            </thead>
            <tbody>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
              ].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="fixed-col">इन्दौर</td>
                  <td>50</td>
                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>50</td>
                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>50</td>
                  <td>55</td>
                  <td>32</td>
                  <td>42</td>
                  <td>56</td>
                  <td>84</td>
                  <td>84</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewKendraTable;
