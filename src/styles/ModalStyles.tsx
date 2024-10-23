import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  position: fixed;
  top: 4rem;
  right: 4rem;
`;

export const ModalContent = styled.div`
  background: #ffde00;
  padding: 1rem;
  border-radius: 8px;
  border: 0.2rem solid #b3a125;
  width: 20rem;
`;

export const ModalHeader = styled.h2`
  color: black;
  margin-left: 2rem;
`;

export const ModalText = styled.p`
  color: black;
  margin-left: 2rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  height: 11rem;
  justify-content: center;
  background-color: lightyellow;
  border-radius: 0.3rem;
  border: 0.1rem solid #b3a125;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  margin-top: 0.5rem;
  right: 1rem;
  cursor: pointer;
  border: none;
  background: #ffde00;
`;
