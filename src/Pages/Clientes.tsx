import { useState, useEffect } from "react";
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
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Client, Ticket } from "../types/crud";

const API_URL = "https://drenteria3.000webhostapp.com/apicliente.php";

const Clientes = () => {
  const [tickets, setTickets] = useState<Client[]>([]);
  const location = useLocation();
  let userId = location.state.userId;
  let tienda = location.state.tienda;
  const navigate = useNavigate();

  const getApiData = async () => {
    const resultado = await fetch(`${API_URL}?comando=clientes&id=${userId}`);
    const datos = await resultado.json();
    setTickets(datos);
  };

  useEffect(() => {
    getApiData();
  }, []);

  function editarCliente(item: Client) {
    navigate("/editarcliente", {
      state: {
        cliente: item,
        userId: userId,
      },
    });
  }

  function agregarCliente() {
    navigate("/crearcliente", {
      state: {
        userId: userId,
      },
    });
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
        <Flex bg="teal.200" minW={{ base: "90%", md: "468px" }} p="2">
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
            <Text fontSize="lg">Clientes</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={agregarCliente}
          >
            Agregar
          </Box>
        </Flex>

        <Box display="flex" mt="2" alignItems="center">
          <SimpleGrid columns={2} spacing={10}>
            {tickets.map((item, i) => (
              <Box
                ml="2"
                fontSize="sm"
                borderColor="teal.200"
                p={2}
                bg="teal.50"
                width={200}
                key={i}
                borderRadius="md"
                alignItems="center"
                as="button"
                onClick={() => editarCliente(item)}
              >
                <Center></Center>
                <Box color="black">
                  <Text fontSize="lg" fontWeight="bold">
                    Cliente id: {item.id}
                  </Text>
                  <Text fontSize="md">Cliente email: {item.correo}</Text>
                  <Text fontSize="sm">Direccion: {item.direccion}</Text>
                  <Text fontSize="sm">Telefono: {item.telefono}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Clientes;
