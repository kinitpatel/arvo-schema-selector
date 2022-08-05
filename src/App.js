import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Section, Container, Form, Heading, Block, Button } from 'react-bulma-components';
import Record from './components/Record';
import MaskedFields from './components/MaskedFields';
import EncryptedFields from './components/EncryptedFields';
import validateArvoSchema from './utils/validateArvoSchema';
import ErrorMessages from './components/ErrorMessages';
import { clearSelectedFields } from './redux/actions';

function App() {
  const [arvoSchemaDefinition, setArvoSchemaDefinition] = useState();
  const [errorMessages, setErrorMessages] = useState([])
  const dispatch = useDispatch();

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      let parsedInputSchema;
      try {
        parsedInputSchema = JSON.parse(e.target.result)
      } catch (err) {
        setErrorMessages(['There was an error parsing the schema file. The schema file must be in valid JSON format.'])
        return;
      }

      try {
        validateArvoSchema(parsedInputSchema);
      } catch(err) {
        setErrorMessages(['Schema validation error:', err.message])
        return;
      }
     
      setErrorMessages([]);
      dispatch(clearSelectedFields())
      setArvoSchemaDefinition(parsedInputSchema);
    }

    reader.onerror = (e) => {
      const error = e.target.error
      console.error(`Error occurred while reading ${file.name}`, error)
    }
    reader.readAsText(file);
    evt.target.value = null; // clear file input field value so if user chooses same file again, handleFileChange will be called again
  };

  if(!arvoSchemaDefinition) {
    return (
      <Container className='is-max-desktop mb-6'>
        <Section>
            <ErrorMessages messages={errorMessages} handleClearMessages={() => setErrorMessages([])} />
            <Heading>1. Select Schema File</Heading>
            <Heading subtitle>Select a local arvo schema file to load</Heading>
            <Form.InputFile onChange={handleFileChange} label="Upload from disk"/>
        </Section>
      </Container>
    )
  }

  return (
    <Container className='is-max-desktop mb-6'>
      <Section>
        <Heading>2. Configure Masking and Encryption Options</Heading>
        <Heading subtitle>Select columns to mask or encrypt</Heading>
        <Record schema={arvoSchemaDefinition} />
      </Section>
      <Section>
        <Heading>Output</Heading>
        <Block>
          <MaskedFields/>
        </Block>
        <Block>
          <EncryptedFields/>
        </Block>
      </Section>
      <Section>
        <Button className="is-pulled-right is-primary" onClick={() => setArvoSchemaDefinition(undefined)}>Go Back</Button>
      </Section>
    </Container>
  );
}

export default App;
