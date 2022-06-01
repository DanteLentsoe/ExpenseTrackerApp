import React, { useState, Dispatch, SetStateAction } from "react";
import { Center, Button, Modal, FormControl, Input } from "native-base";
import { IExpense } from "../../constants/types";
interface IExpenseDetailsModal {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  modalData?: IExpense;
}

const ExpenseCategoryModal = ({
  showModal,
  setShowModal,
}: IExpenseDetailsModal) => {
  return (
    // <Center>
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
    // </Center>
  );
};

export default ExpenseCategoryModal;
