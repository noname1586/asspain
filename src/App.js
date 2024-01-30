import {
  ChakraProvider,
  Heading,
  Container,
  Card, 
  CardBody, 
  Input,
  Button,
  Image,
  Spinner,
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

  const server = "https://f511-189-203-97-230.ngrok-free.app"
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState();


  const generate = async (prompt) => {
    updateLoading(true);
    let body = {
      prompt: prompt,
      negative_prompt: "deformed, glitch, low contrast, noisy, extra hands", 
      sampler_name:"string",
      batch_size: 1,
      steps: 50,
      seed: -1,
      cfg_scale: 7,
    }
    const result = await axios.post(`${server}/sdapi/v1/txt2img`, body);
    updateImage(result.data.images[0]);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
    
        <Heading marginBottom={"20px"} textAlign={'center'}>Create your own masterpiece</Heading>

         <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
           <Tab>txt2img</Tab>
           <Tab>img2img</Tab>
          </TabList>
         
          <TabPanels>
           <TabPanel>
           <Card marginBottom={"20px"}>
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
            <Card height={"500px"}   >
              <CardBody style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <p>two!</p>
           </TabPanel>
          </TabPanels>
         </Tabs>
        
        
       
   
        
         
          
         
      

        
      </Container>
    </ChakraProvider>
  );
};

export default App;