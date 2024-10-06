import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const [updatedProduct, setUpdateProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        status: "error",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        status: "success",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toast({
        title: "Error",
        status: "error",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        status: "success",
        description: message,
        duration: 3000,
        isClosable: true,
      });
      console.log("Success:", success);
      console.log("Message:", message);
      console.log("Updated Product:", updatedProduct);
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transform={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"xs"}
        w={"full"}
        objectFit={"cover"} // Ensures the image covers the entire box
        objectPosition={"top"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder={"Product Name"}
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder={"Product Price"}
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder={"Product Image"}
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
