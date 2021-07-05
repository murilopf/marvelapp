import React from "react";
import { render, screen } from "@testing-library/react"

import Header from '../../components/Header'

describe("Testing Header.tsx", () => {
  // Deve ser possível exibir o componente

  it('should render Header', () => {
    render(<Header />);
    expect(screen.getByText(/Dextra 🤝 Marvel Comics/i)).toBeInTheDocument();
  });

})

