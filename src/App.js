import {
  ChakraProvider,
  Heading,
  Container,
  Card, 
  CardBody, 
  Input,
  Box,
  Button,
  Image,
  Divider,
  Spinner,
  SkipNavContent,
  SimpleGrid,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel 
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  axios.defaults.headers.post['ngrok-skip-browser-warning'] = 'true';
  //axios.defaults.headers.post['ngrok-skip-browser-warning'] = 'true';

  const server = "https://f511-189-203-97-230.ngrok-free.app";
  const [image, updateImage] = useState(null);
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState(false);
  const [droppedImage, setDroppedImage] = useState(null);
  const [handleDragOver, setOnDragOver] = useState(null);
  const [handleDrop, setOnDrop] = useState(null);


  const generate = async (prompt) => {
    updateLoading(true);
    let body = {
      prompt: prompt,
      negative_prompt: "deformed, glitch, low contrast, noisy, extra hands", 
      batch_size: 1,
      steps: 50,
      seed: -1,
      cfg_scale: 7,
      style: "",
    }
    
    const result = await axios.post(`${server}/sdapi/v1/txt2img`, body);
    updateImage(result.data.images[0]);
    updateLoading(false);
  };

  const generateimg = async (prompt) => {
    updateLoading(true);
    let body = {
      prompt: prompt,
      negative_prompt: "deformed, glitch, low contrast, noisy, extra hands", 
      batch_size: 1,
      steps: 50,
      seed: -1,
      cfg_scale: 7,
      style: "",
    }
    const handleDragOver = (e) => {
      e.preventDefault();
    };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          const imageDataUrl = readerEvent.target.result;
          setDroppedImage(imageDataUrl);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Please drop a valid image file.');
      }
    }
  };
    const result = await axios.post(`${server}/sdapi/v1/img2img`, body);
    updateImage(result.data.images[0]);
    updateLoading(false);
  };
  return (
    
    <ChakraProvider>
      <    SkipNavContent style={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'center',
              height:'50px',
            }}/>
      <Divider />
      <Container marginBlockStart={"60px"}>
     
        <Heading marginBottom={"20px"} textAlign={'center'}style={{
              display: 'flex',
              justifyContent: 'center',
            }}>Create your own masterpiece.</Heading>

         <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
           <Tab>txt2img</Tab>
           <Tab>img2img</Tab>
          </TabList>
         
          <TabPanels style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
           <TabPanel>
           <Card marginBottom={"10px"}>
          <CardBody>
            <Input
            placeholder='Describe what you´d like to create'
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
            marginInline={"20px"}
            ></Input>
            <Button onClick={(e) => generate(prompt)} colorScheme={"pink"}>
            Generate
            </Button>
          </CardBody>
        </Card>
        
          {loading ? (
            <Card height={"fit-content"} display={"flex"}   >
              <CardBody style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height:'400px',
            }}>
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                alignItems={"stretch"}
                />
          </CardBody>
          </Card>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
           </TabPanel>
           <TabPanel>
             <SimpleGrid columns={2} spacing={10}>
               <Box onDragOver={handleDragOver}
                 onDrop={handleDrop}
                 style={{
                 width: '400px',
                 height: '400px',
                 border: '2px dashed #ccc',
                 borderRadius: '10px',
                 textAlign: 'center',
                 paddingTop: '20px',
                 cursor: 'pointer',
                 }}>

               </Box>
               <Box >
               {loading ? (
            <Card height={"fit-content"} display={"flex"}   >
              <CardBody style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height:'400px',
            }}>
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                alignItems={"stretch"}
                />
          </CardBody>
          </Card>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
               </Box>
               <Box bg='tomato' height='80px'></Box>
               <Box bg='tomato' height='80px'></Box>
               <Box bg='tomato' height='80px'></Box>
             </SimpleGrid>
           </TabPanel>
          </TabPanels>
         </Tabs>
        
        
       
   
        
         
          
         
      

        
      </Container>
    </ChakraProvider>
  );
};

export default App;