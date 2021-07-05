import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react"
import MainContainer from '../../components/MainContainer'

describe("Renders <MainContainer />", () => {

  it('should render MainContainer', async () => {

    await waitFor(() => {
      render(<MainContainer />)
    })

    expect(screen.getByTestId('mainContainer')).toBeInTheDocument()
  });

})

