import React from "react";
import styled from "@emotion/styled";
import CloseIcon from "../assets/CloseIcon.svg";
import {
  ModalContent,
  ModalContainer,
  CloseButton,
  ModalText,
  ImageWrapper,
  ModalHeader,
} from "../styles/ModalStyles";
import { Pokemon } from "../types";

interface Props {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const PokemonModal: React.FC<Props> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const pokemonAttributes = [
    { label: "HP", value: pokemon.hp },
    { label: "Attack", value: pokemon.attack },
    { label: "Defense", value: pokemon.defense },
    { label: "Weight", value: pokemon.weight },
    { label: "Height", value: pokemon.height },
    { label: "Types", value: pokemon.types.join(", ") },
  ];

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <img src={CloseIcon} alt="Close" width={20} height={20} />
        </CloseButton>
        <ModalHeader>{pokemon.name}</ModalHeader>
        <ImageWrapper>
          <img src={pokemon.picture}></img>
        </ImageWrapper>
        {pokemonAttributes.map((attribute) => (
          <ModalText key={attribute.label}>
            <strong>{attribute.label}:</strong> {attribute.value}
          </ModalText>
        ))}
      </ModalContent>
    </ModalContainer>
  );
};

export default PokemonModal;
