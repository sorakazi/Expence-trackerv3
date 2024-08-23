import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Search, TrPencil, TrTrash } from 'components/svgs';
import { StyledCommonWrapper } from 'styles/Common.styled';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import {
  SideContainer,
  LeftSideContainer,
  RightSideContainer,
  Title,
  Text,
  StyledBackground,
  Container,
  Input,
  Button,
  StyledDatePicker,
  IconWrapper,
  StyledTable,
  StyledTableHead,
  StyledTableName,
  StyledTableBody,
  ActionButtonWrapper,
  EditButton,
  DeleteButton,
  Label,
  Tbody,
} from './TransactionsHistoryStyled';
import { useParams } from 'react-router-dom';
import { fetchTransactionsThunk, removeUserTransactionThunk } from 'redux/transactions/operations';
import { selectDate, selectFilter, selectIsLoading, selectTransactions } from 'redux/transactions/selectors';
import { setFilter, setInputDate } from 'redux/transactions/slice';
import TransactionsTotalAmount from 'shared/TransactionsTotalAmount/TransactionsTotalAmount';
import Modal from 'shared/Modal/Modal';
import TransactionForm from 'shared/TransactionForm/TransactionForm';
import { useModal } from 'shared/hooks/useModal';
import { RotatingLines } from 'react-loader-spinner';

const TransactionsHistoryPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const transactions = useSelector(selectTransactions);
  const date = useSelector(selectDate);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const { transactionsType } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputFilter, setInputFilter] = useState(filter);
  const isLoading = useSelector(selectIsLoading);
  const [processingTransactionId, setProcessingTransactionId] = useState(null);

  const dateFormat = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

  const handleChangeDate = date => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dispatch(setInputDate({ year, month, day }));
    }
  };

  const handleDelete = id => {
    setProcessingTransactionId(id);

    dispatch(removeUserTransactionThunk(id))
      .unwrap()
      .then(() => {
        dispatch(fetchTransactionsThunk({ type: transactionsType, date: dateFormat }))
          .unwrap()
          .then(setProcessingTransactionId(null));
      });
  };

  useEffect(() => {
    dispatch(fetchTransactionsThunk({ type: transactionsType, date: dateFormat }));
  }, [dispatch, transactionsType, date, dateFormat]);

  const handleEdit = ({ _id, category, comment, date, time, sum, type }) => {
    setEditingTransaction({ _id, category, comment, date, time, sum, type });
    openModal();
  };

  const filterChange = e => {
    setInputFilter(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const lowerCaseFilter = filter.toLowerCase().trim();
    return (
      transaction.comment.toLowerCase().includes(lowerCaseFilter) ||
      transaction.category?.categoryName.toLowerCase().includes(lowerCaseFilter) ||
      transaction.date.toLowerCase().includes(lowerCaseFilter) ||
      transaction.time.toLowerCase().includes(lowerCaseFilter) ||
      String(transaction.sum).includes(lowerCaseFilter)
    );
  });

  const renderTableRows = () => {
    return filteredTransactions.map(({ _id, category, comment, date, time, sum, type }) => (
      <tr key={_id}>
        <StyledTableBody>{category?.categoryName}</StyledTableBody>
        <StyledTableBody>{comment}</StyledTableBody>
        <StyledTableBody>{date}</StyledTableBody>
        <StyledTableBody>{time}</StyledTableBody>
        <StyledTableBody>{sum} / UAH</StyledTableBody>
        <StyledTableBody>
          <ActionButtonWrapper>
            <EditButton onClick={() => handleEdit({ _id, category, comment, date, time, sum, type })}>
              <TrPencil style={{ stroke: '#171719' }} width="16" height="16" />
              <span>Edit</span>
            </EditButton>
            {isLoading && processingTransactionId === _id ? (
              <DeleteButton disabled>
                <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="1.5" width="44" visible={true} />
              </DeleteButton>
            ) : (
              <DeleteButton onClick={() => handleDelete(_id)}>
                <TrTrash width="16" height="16" /> <span>Delete</span>
              </DeleteButton>
            )}
          </ActionButtonWrapper>
        </StyledTableBody>
      </tr>
    ));
  };

  return (
    <>
      <StyledCommonWrapper>
        <SideContainer>
          <LeftSideContainer>
            <Title> All {transactionsType === 'incomes' ? 'Income' : 'Expense'}</Title>
            <Text>
              View and manage every transaction seamlessly! Your entire financial landscape, all in one place.
            </Text>
          </LeftSideContainer>
          <RightSideContainer>
            <TransactionsTotalAmount />
          </RightSideContainer>
        </SideContainer>
        <Container>
          <Label>
            <Input type="text" placeholder="Search for anything..." onChange={filterChange} />
            <Button onClick={() => dispatch(setFilter(inputFilter))}>
              <Search />
            </Button>
          </Label>
          <Label>
            <StyledDatePicker
              selected={selectedDate}
              value={date}
              onChange={handleChangeDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
            />
            <IconWrapper>
              <Calendar />
            </IconWrapper>
          </Label>
        </Container>
        <StyledBackground>
          <StyledTable>
            <StyledTableHead>
              <tr>
                <StyledTableName>Category</StyledTableName>
                <StyledTableName>Comment</StyledTableName>
                <StyledTableName>Date</StyledTableName>
                <StyledTableName>Time</StyledTableName>
                <StyledTableName>Sum</StyledTableName>
                <StyledTableName>Actions</StyledTableName>
              </tr>
            </StyledTableHead>
            <Tbody>{renderTableRows()}</Tbody>
          </StyledTable>
        </StyledBackground>
      </StyledCommonWrapper>
      {isOpen ? (
        <Modal closeModal={closeModal}>
          <TransactionForm close={closeModal} editingTransaction={editingTransaction} />
        </Modal>
      ) : null}
    </>
  );
};

export default TransactionsHistoryPage;
