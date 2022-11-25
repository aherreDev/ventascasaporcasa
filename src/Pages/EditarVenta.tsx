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
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Ticket } from "../types/crud";

const API_URL = "https://drenteria3.000webhostapp.com/api.php";

function EditarVenta() {
  const location = useLocation();
  let userId = location.state.userId;
  let ticket = location.state.ticket as Ticket;
  const navigate = useNavigate();
  const [idCliente, setIdCliente] = useState<number | null>(
    ticket.idcliente || userId
  );
  const [fecha, setFecha] = useState(
    ticket.fecha ? ticket.fecha : new Date().toISOString()
  );
  const toast = useToast();

  console.log(userId);

  async function guardarProducto() {
    const respuesta = await fetch(
      `${API_URL}?comando=editarTicket&id=${ticket.id}&fecha=${fecha}&idcliente=${idCliente}`
    );
    const datos = await respuesta.json();

    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Error while updating Ticket",
        description: "No se pudo guardar la venta.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  const eliminarTicket = async () => {
    const respuesta = await fetch(
      `${API_URL}?comando=eliminarTicket&id=${ticket.id}`
    );
    const datos = await respuesta.json();

    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Error while removing Ticket",
        description: "No se pudo guardar la venta.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
            <Text fontSize="lg">Editar Venta</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={eliminarTicket}
          >
            Eliminar
          </Box>

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={guardarProducto}
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
                  <FormLabel>Seleccione la fecha de la venta</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Fecha de venta"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      type="date"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Seleccione un producto</FormLabel>
                  <InputGroup>
                    <Select placeholder="Select products" disabled>
                      {/* TODO: El team de los productos debe actualizar este code :p */}

                      <option value="">Seleccione un producto</option>
                      <option value="option1">Product 1</option>
                      <option value="option2">Product 2</option>
                      <option value="option3">Product 3</option>
                    </Select>
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

export default EditarVenta;
