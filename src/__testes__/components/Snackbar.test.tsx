import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import Snackbar from '../../components/Snackbar'

describe("Renders <Snackbar />", () => {

  it('should render Snackbar', async () => {

    const open = true;
    const resetSnackbar = jest.fn()

    render(<Snackbar
      snackBar={{
        title: "Insira o nome de um personagem para consultas suas comics 🔎",
        severity: "error"
      }}
      open={open}
      resetSnackbar={resetSnackbar}
    />)

    expect(screen.getByTestId('snackbar')).toBeInTheDocument()
  });

})

