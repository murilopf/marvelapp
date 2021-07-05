import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'

import SearchField from '../../components/SearchField'

describe("<SearchField />", () => {
  // Deve ser possível exibir o componente

  it('should search', async () => {

    const mockOnSubmit = jest.fn()
    const component = render(<SearchField setFilterValue={jest.fn()} setIsLoading={jest.fn()} />);

    console.log("COmponent " + component)

    const field = screen.getByTestId("field");
    const btnFind = screen.getByTestId("find");
    const btnClear = screen.getByTestId("clear");

    await act(async () => {
      fireEvent.change(field, { target: { value: "hulk" } });
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId("find"))
    })

    // expect(mockOnSubmit).toHaveBeenCalled();

  });

})

