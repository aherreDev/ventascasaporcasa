import { useState } from 'react'
import {SimpleGrid, Box,Text, Flex,
Stack,Wrap, WrapItem, Button, Spacer,Image,
FormControl,
InputGroup,
InputLeftElement,
Input,
useToast,Center} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons' 
import { useLocation,useNavigate  } from "react-router-dom";

function Nuevoproducto() {
    const [nombre,setNombre]=useState('')
    const [descripcion,setDescripcion]=useState('')
    const [cantidad,setCantidad]=useState('')
    const [preciodecosto,setPreciodecosto]=useState('')
    const [preciodeventa,setPreciodeventa]=useState('')
    const [urlproducto,setUrlproducto]=useState('')
    const toast = useToast() 
    const location = useLocation(); 
    let userId = location.state.userId;
    const navigate=useNavigate()
    console.log(userId)

    async function guardarProducto(){
      
    const respuesta=await fetch('https://pmoviles1.000webhostapp.com/api/apiv.php?comando=agregarProducto&nombre='+nombre
    +'&descripcion='+descripcion
    +'&cantidad='+cantidad
    +'&preciodecosto='+preciodecosto
    +'&preciodeventa='+preciodeventa
    +'&urlproducto='+urlproducto
    +'&idusuario='+userId)
    const datos=await respuesta.json()
    
    if(datos.estatus==='ok')            
    navigate(-1)
    else
    {
        toast({
            title: 'Producto',
            description: "No se pudo guardar el producto.",
            status: 'warning',
            duration: 4000,
            isClosable: true,
          })
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
        borderRadius='md'
      >
        
        <Flex minW={{ base: "90%", md: "468px" }} 
        bg="teal.200"
        p='2'>
  <Box p='4' bg="teal.400" as='button' onClick={() =>navigate(-1)}
  borderRadius='md'>
    Regresar
  </Box>
  <Box p='4'>
  <Text fontSize='lg'>Agregar Producto</Text>
  </Box>
  <Spacer />
  
  <Box p='4' bg='teal.400'as='button' borderRadius='md'
  onClick={guardarProducto}>
    Guardar
  </Box>
</Flex>
<Box display='flex' mt='2' alignItems='center'>
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
                  <Input type="text" placeholder="nombre del producto" value={nombre}
                 onChange={(e) => setNombre(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>                 
                  <Input type="text" placeholder="describelo" value={descripcion}
                 onChange={(e) => setDescripcion(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>                 
                  <Input type="number" placeholder="cantidad de unidades" value={cantidad}
                 onChange={(e) => setCantidad(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>                 
                  <Input type="number" placeholder="precio de costo" value={preciodecosto}
                 onChange={(e) => setPreciodecosto(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>                 
                  <Input type="number" placeholder="precio de venta" value={preciodeventa}
                 onChange={(e) => setPreciodeventa(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>                 
                  <Input type="text" placeholder="url de imagen del producto" value={urlproducto}
                 onChange={(e) => setUrlproducto(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <Center>  
                <Image src={urlproducto} height="200"
                borderRadius="md"/>
                </Center>                  
            </Stack>        
          
</Box>
</Stack>
</Box>
</Stack>
</Flex>

    )
}


export default Nuevoproducto
