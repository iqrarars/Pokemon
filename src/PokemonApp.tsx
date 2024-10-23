import PokemonTable from "./components/PokemonTable";
import Pokemon_logo from "./assets/Pokemon_logo.png";
import styled from "@emotion/styled";

export const LogoImage = styled.img`
  width: 20rem;
  margin: 2rem;
`;

function PokemonApp() {
  return (
    <>
      <LogoImage src={Pokemon_logo} alt="Pokemon logo" />
      <PokemonTable />
    </>
  );
}

export default PokemonApp;
