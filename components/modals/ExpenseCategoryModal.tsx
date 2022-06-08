import React, { Dispatch, SetStateAction, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, Pressable } from "react-native";
import { styles } from "../../screens/ExpenseAdditionScreen";
import { Button, Modal, FormControl, Input } from "native-base";
import { IExpense } from "../../constants/types";
import theme from "../../utils/theme";
import { Formik } from "formik";
import { AddExpenseSchema } from "../../utils/validation";
import { ExpenseContext } from "../../store/ExenpenseProvider";
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
  const expenseTX = useContext(ExpenseContext);
  return (
    // <Center>
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Pressable
            style={{ marginLeft: 230, marginTop: 10 }}
            onPress={() => {
              setShowModal(false);
              expenseTX.removeExpense(modalPayload);
            }}>
            {/* @ts-ignore */}
            <AntDesign name="delete" size={25} color={"#a71313"} />
          </Pressable>
          <Modal.Header style={{ alignItems: "center" }}>
            {modalPayload && modalPayload.name}
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                name: "",
                expenseCategory: "",
                amount: 0,
                date: "",
                color: "",
                legendFontColor: "",
                legendFontSize: 0,
              }}
              validationSchema={AddExpenseSchema}
              onSubmit={(values: IExpense) => {
                console.log(values);
                // expenseTX.addExpense(values);
                // navigation.goBack();
              }}>
              {({ handleChange, handleBlur, errors, touched }) => (
                <>
                  <FormControl>
                    <FormControl.Label>Expense Title</FormControl.Label>
                    <Input
                      editable={false}
                      value={modalPayload && modalPayload.name}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Expense Category</FormControl.Label>
                    <Input
                      editable={false}
                      value={modalPayload ? modalPayload.expenseCategory : ""}
                    />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>
                      Date of Expense recording{" "}
                    </FormControl.Label>
                    <Input value={modalPayload ? modalPayload.date : "what"} />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Expense Amount</FormControl.Label>
                    <Input
                      editable={false}
                      // @ts-ignore
                      value={modalPayload ? modalPayload.amount : 0}
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
