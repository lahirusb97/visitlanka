import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";

export default function LocationCard({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div onClick={onOpen}>
      <div className="p-2 shadow-md w-80 h-96 m-4 capitalize">
        <img className="w-72 h-72 object-cover m-auto" src={data["Img"]} />
        <h1 className="text-center font-semibold text-lg">{data["Name"]}</h1>
        <div className="text-center bg-yellow-200">
          <h3 className="font-semibold text-textgray">
            Province: {data["province"]}
          </h3>
          <h3 className="font-semibold text-textgray">
            District: {data["district"]}
          </h3>
        </div>
      </div>
      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data["Name"]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <img className="max-w-2xl max-h" src={data["Img"]} />

            <p className="text-center capitalize my-2">{data["discription"]}</p>
            <div className="bg-gray-300 w-full capitalize mb-2">
              <p className="text-center w-32 m-auto">{data["address"]}</p>
            </div>
            <div className="flex justify-between mb-2">
              <h3 className="font-bold px-4">District - {data["district"]}</h3>
              <h3 className="font-bold px-4">Province - {data["province"]}</h3>
            </div>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
}
