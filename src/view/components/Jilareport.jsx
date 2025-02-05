import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Jilareport.css'

const Jilareport = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h4>Select Nagar Type</h4>
          <Form>
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
        </Col>
      </Row>


      {selectedCategory && (
        <Row className="mt-3">
          <Col>
            <h1>Each Nagariya category{selectedCategory}</h1>
            {(selectedCategory === 'Mahanagar' || selectedCategory === 'Jila Kendra' || selectedCategory === 'Anya Nagar') && (
              <>
                <Form.Group>
                  <Form.Label>जिला सम महानगर/भाग संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>इनमें सेवा बस्ती संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>सेवा कार्य युक्त सेवा बस्ती</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>व्यवसायी व महाविद्यालय शाखा व मिलन संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>सेवा बस्ती पालक शाखा व मिलन संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>सेवा कार्यकर्ता युक्त शाखा व मिलन संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>कुल सेवा कार्यकर्ता</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>महानगर में कुल सेवा कार्य (सेवा संस्थाओं के सेवा कार्य सहित)</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>मासिक सेवा बस्ती संपर्क करने वाली शाखा व मिलन संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
              </>
            )}

           
    

         
        
          </Col>
        </Row>
      )}

      <br />
      <br />
      <br />

<Row className="mt-3">
        <Col>
        {/* <Form.Check
              type="radio"
              label="Villages with Population > 5000"
              name="category"
              value="Villages > 5000"
              onChange={handleCategoryChange}
              // checked={selectedCategory === 'Villages > 5000'}
            />
            <Form.Check
              type="radio"
              label="Villages with Population < 5000"
              name="category"
              value="Villages < 5000"
              onChange={handleCategoryChange}
              // checked={selectedCategory === 'Villages < 5000'}
            /> */}
                    <h1>Villages with Population{`>`} 5000</h1>
                <Form.Group>
                  <Form.Label>5000 या उससे अधिक जनसंख्या के ग्रामों की संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>इनमें व्यवसायी या कृषक शाखायुक्त ग्राम</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>इनमें सेवा कार्ययुक्त ग्राम</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>इनमें कुल सेवा कार्य</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>


                 <h1>Villages with Population{`<`} 5000</h1>
                <Form.Group>
                  <Form.Label>5000 से कम जनसंख्या के सेवा युक्त ग्राम संख्या</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>इनमें कुल सेवा कार्य</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="primary">Submit</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Jilareport;
