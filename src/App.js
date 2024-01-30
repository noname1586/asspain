import {
  ChakraProvider,
  Heading,
  Container,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  //axios.defaults.headers.post['ngrok-skip-browser-warning'] = 'true';

  const server = "https://489c-189-203-97-230.ngrok-free.app"
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState("");
  const [steps, updateSteps] = useState(20);
  const [loading, updateLoading] = useState();


  const generate = async (prompt) => {
    updateLoading(true);
    let body = {
      prompt: prompt,
      steps: steps
    }
    const result = await axios.post(`${server}/sdapi/v1/txt2img`, body);
    updateImage(result.data.images[0]);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading marginBottom={"10px"}>First Stable-Difussion</Heading>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
        
        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Input
              value={steps}
              onChange={(e) => updateSteps(e.target.value)}
              width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"blue"}>
            Generate
          </Button>
        </Wrap>

        
      </Container>
    </ChakraProvider>
  );
};

export default App;