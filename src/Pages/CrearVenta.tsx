import { useEffect, useState } from "react";
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
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Productos from "./Productos";
import axios from "axios";
import { Client } from "../types/crud";

const API_URL = "http://localhost:3500/sales";
const PRODUCTS_API_URL = "https://drenteria3.000webhostapp.com/apiproducto.php";
const API_CLIENTE_URL = "https://drenteria3.000webhostapp.com/apicliente.php";

interface WantedProducts {
  productId: string;
  amount: string;
}

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  preciodecosto: number;
  preciodeventa: number;
  urldelproducto: string;
  idusuario: number;
}

function CrearVenta() {
  const location = useLocation();
  let userId = location.state.userId;
  const navigate = useNavigate();
  const [idCliente, setIdCliente] = useState<number | null>(userId);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [wantedProducts, setWantedProducts] = useState<WantedProducts[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fecha, setFecha] = useState(new Date().toISOString());
  const toast = useToast();

  console.log(userId);

  const getProducts = async () => {
    const resultado = await fetch(
      `${PRODUCTS_API_URL}?comando=productos&id=${userId}`
    );
    const datos = await resultado.json();
    setProducts(datos);
  };

  const getClients = async () => {
    const resultado = await fetch(
      `${API_CLIENTE_URL}?comando=clientes&id=${userId}`
    );
    const datos = await resultado.json();
    setClientes(datos);
  };

  const updateWantedProduct = (
    index: number,
    key: "productId" | "amount",
    value: string
  ) => {
    const newWantedProducts = [...wantedProducts];
    const targetProduct = newWantedProducts[index];
    targetProduct[key || "productId"] = value;
    setWantedProducts(newWantedProducts);
  };

  async function guardarProducto() {
    // const respuesta = await fetch(
    //   `${API_URL}?comando=agregarTicket&fecha=${fecha}&idcliente=${idCliente}`
    // );
    // const datos = await respuesta.json();

    const filteredProducts = wantedProducts.filter((p) => p.productId !== "");

    const response = await axios.post(API_URL, {
      fecha,
      idcliente: idCliente,
      idUsusario: userId,
      productosIds: filteredProducts.map((product) => product.productId),
      productosCantidades: filteredProducts.map((product) => product.amount),
      productosPrecios: filteredProducts.map(
        (product) =>
          products.find((p) => `${p.id}` === product.productId)?.preciodeventa
      ),
    });

    const datos = response.data;

    if (datos.estatus === "ok") navigate(-1);
    else {
      toast({
        title: "Error while creating Ticket",
        description: "No se pudo guardar la venta.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getProducts();
    getClients();
  }, []);

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
            <Text fontSize="lg">Agregar Venta</Text>
          </Box>
          <Spacer />

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
                  <FormLabel>Seleccione el cliente</FormLabel>
                  <InputGroup>
                    <Select
                      placeholder="Selecciona un producto"
                      value={idCliente || ""}
                      onChange={(e) => {
                        setIdCliente(parseInt(e.target.value));
                      }}
                    >
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </Box>

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
                maxW="100%"
              >
                <Box>
                  {wantedProducts.map((wantedProduct, index) => (
                    <ProductRow
                      products={products}
                      onChange={(key, value) =>
                        updateWantedProduct(index, key, value)
                      }
                    />
                  ))}
                </Box>

                <Box>
                  <Button
                    onClick={() =>
                      setWantedProducts([
                        ...wantedProducts,
                        { productId: "", amount: "" },
                      ])
                    }
                  >
                    Agregar producto
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

interface ProductRowProps {
  products: Product[];
  onChange: (key: "productId" | "amount", value: any) => void;
}

const ProductRow = ({ products, onChange }: ProductRowProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);

  return (
    <Grid gap={4} templateColumns="repeat(5, 1fr)" my={5} maxW="100%">
      <GridItem colSpan={3}>
        <Select
          placeholder="Selecciona un producto"
          onChange={(e) => {
            onChange("productId", e.target.value);
            setSelectedProduct(e.target.value);
          }}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nombre}
            </option>
          ))}
        </Select>
      </GridItem>

      <GridItem colSpan={2}>
        <NumberInput
          value={quantity}
          onChange={(value) => {
            onChange("amount", value);
            setQuantity(Number(value));
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
    </Grid>
  );
};

export default CrearVenta;
