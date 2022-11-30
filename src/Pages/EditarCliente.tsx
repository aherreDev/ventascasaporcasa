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
import { Client } from "../types/crud";

const API_URL = "https://drenteria3.000webhostapp.com/apicliente.php";

function EditarCliente() {
  const location = useLocation();

  let cliente = location.state.cliente as Client;
  const [nombre, setNombre] = useState(cliente.nombre);
  const [direccion, setDireccion] = useState(cliente.direccion);
  const [telefono, setTelefono] = useState(cliente.telefono);
  const [email, setEmail] = useState(cliente.correo);
  const toast = useToast();
  let userId = location.state.userId;
  const navigate = useNavigate();
  console.log(userId);

  async function actualizarCliente() {
    const respuesta = await fetch(
      API_URL +
        "?comando=editarcliente&nombre=" +
        nombre +
        "&direccion=" +
        direccion +
        "&telefono=" +
        telefono +
        "&correo=" +
        email +
        "&idusuario=" +
        userId +
        "&id=" +
        cliente.id
    );
    const datos = await respuesta.json();

    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Cliente",
        description: "No se pudo actualizar el cliente.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function eliminarCliente() {
    const respuesta = await fetch(
      API_URL + "?comando=eliminarusuario&id=" + cliente.id
    );
    const datos = await respuesta.json();
    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Cliente",
        description: "No se pudo eliminar el cliente.",
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
            <Text fontSize="lg">Actualizar Cliente</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={eliminarCliente}
          >
            Eliminar
          </Box>

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={actualizarCliente}
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

export default EditarCliente;
