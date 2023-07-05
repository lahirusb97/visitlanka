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

import call from "../../assets/Icons/call.svg";
export default function TaxiCard({ data }) {
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
          <div className="flex justify-center items-end bg-slate-200 py-2">
            <img src={call} className="w-6 mx-2" />

            <h3 className="font-semibold text-textgray">{data["mobile"]}</h3>
          </div>
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
            <div className="flex justify-center items-end bg-slate-200 py-2">
              <img src={call} className="w-6 mx-2" />

              <h3 className="font-semibold text-textgray">{data["mobile"]}</h3>
            </div>
            <h1 className="text-lg font-bold text-gray-700 text-center">
              Travel Arias
            </h1>
            <div className="flex flex-wrap justify-center my-2">
              {data["Travel"].map((e, i) => (
                <h1
                  key={"s" + i}
                  className="font-semibold bg-gray-100 p-2 shadow-md m-2"
                >
                  {e}
                </h1>
              ))}
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
