import styled from 'styled-components/native';

interface WeightProp {
  weight?: string;
}

export const Text = styled.Text<WeightProp>`
  font-family: ${({weight}) =>
    weight === 'bold' ? 'Poppins-SemiBold' : 'Poppins-Regular'};
  color: black;
`;
