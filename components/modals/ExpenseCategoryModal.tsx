import React, { useState, Dispatch, SetStateAction } from "react";
import { Entypo } from "@expo/vector-icons";
import { Text, View, ColorSchemeName, Pressable } from "react-native";
import { styles } from "../../screens/ExpenseAdditionScreen";
import { Center, Button, Modal, FormControl, Input } from "native-base";
import { IExpense } from "../../constants/types";
import theme from "../../utils/theme";
import { Formik } from "formik";
import { AddExpenseSchema } from "../../utils/validation";
interface IExpenseDetailsModal {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  modalPayload: IExpense;
}

const ExpenseCategoryModal = ({
  showModal,
  setShowModal,
  modalPayload,
}: IExpenseDetailsModal) => {
  return (
    // <Center>
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Pressable
            style={{ marginLeft: 230, marginTop: 10 }}
            onPress={() => {
              setShowModal(false);
            }}>
            {/* @ts-ignore */}
            <Entypo name="remove-user" size={25} color={"#a71313"} />
          </Pressable>
          <Modal.Header style={{ alignItems: "center" }}>
            {modalPayload && modalPayload.title}
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: "",
                expenseCategory: "",
                amount: 0,
                date: "",
              }}
              validationSchema={AddExpenseSchema}
              onSubmit={(values: IExpense) => {
                console.log(values);
                // expenseTX.addExpense(values);
                // navigation.goBack();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <>
                  <FormControl>
                    <FormControl.Label>Expense Title</FormControl.Label>
                    <Input
                      value={modalPayload && modalPayload.title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />
                    {errors.title && touched.title && (
                      <Text style={styles.errorText}>{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Expense Category</FormControl.Label>
                    <Input
                      value={modalPayload ? modalPayload.expenseCategory : ""}
                    />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>
                      Date of Expense recording{" "}
                    </FormControl.Label>
                    <Input value={modalPayload ? modalPayload.date : ""} />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Expense Amount</FormControl.Label>
                    <Input
                      value={
                        modalPayload ? (modalPayload.amount as string) : ""
                      }
                      style={{ borderWidth: 0, borderRadius: 100 }}
                      placeholder="Amount Expense "
                      onChangeText={handleChange("amount")}
                      onBlur={handleBlur("amount")}
                      keyboardType="numeric"
                    />
                  </FormControl>
                </>
              )}
            </Formik>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={12}>
              <Button
                variant="outline"
                colorScheme="blueGray"
                width={100}
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                width={100}
                colorScheme="gray"
                onPress={() => {
                  setShowModal(false);
                }}
                color={theme.colors.secondary}>
                Confirm
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
