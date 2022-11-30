import { useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Stack,
  Wrap,
  WrapItem,
  Button,
  Spacer,
  Image,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "https://drenteria3.000webhostapp.com/apicliente.php";

function CrearCliente() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const location = useLocation();
  let userId = location.state.userId;
  const navigate = useNavigate();
  console.log(userId);

  async function guardarCliente() {
    const respuesta = await fetch(
      API_URL +
        "?comando=agregarcliente&nombre=" +
        nombre +
        "&direccion=" +
        direccion +
        "&telefono=" +
        telefono +
        "&correo=" +
        email +
        "&idusuario=" +
        userId
    );
    const datos = await respuesta.json();

    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Cliente",
        description: "No se pudo guardar el cliente.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex
      flexDirection="column"
      // width="200wh"
      //height="200vh"
      backgroundColor="gray.200"
      // justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        p={2}
        backgroundColor="white"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
        borderRadius="md"
      >
        <Flex minW={{ base: "90%", md: "468px" }} bg="teal.200" p="2">
          <Box
            p="4"
            bg="teal.400"
            as="button"
            onClick={() => navigate(-1)}
            borderRadius="md"
          >
            Regresar
          </Box>
          <Box p="4">
            <Text fontSize="lg">Agregar Cliente</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={guardarCliente}
          >
            Guardar
          </Box>
        </Flex>
        <Box display="flex" mt="2" alignItems="center">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Box minW={{ base: "90%", md: "468px" }}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="nombre del producto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Dirección del cliente"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="Telefono de contacto"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Correo electronico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default CrearCliente;
