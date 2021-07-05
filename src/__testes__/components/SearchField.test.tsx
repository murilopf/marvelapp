/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import SearchField from '../../components/SearchField'

describe('<SearchField />', () => {
  it('Renders correctly', async () => {
    render(<SearchField setFilterValue={jest.fn()} />)

    expect(screen.getByTestId('clear')).toBeTruthy()
    expect(screen.getByTestId('search')).toBeTruthy()
    expect(screen.getByTestId('field')).toBeTruthy()
  })

  describe('Input field', () => {
    it('update on change', () => {
      render(<SearchField setFilterValue={jest.fn()} />)

      const searchInput = screen.getByTestId('field')

      fireEvent.change(searchInput, { target: { value: 'thor' } })
      expect(searchInput.value).toBe('thor')
    })
  })

  describe('Search button', () => {
    it('does not trigger handleSearchComicByName function ', () => {
      const setFilterValue = jest.fn()
      render(<SearchField setFilterValue={setFilterValue} />)

      const btnSearch = screen.getByTestId('search')

      fireEvent.click(btnSearch)
      expect(setFilterValue).not.toHaveBeenCalled()
    })

    it('should trigger handleSearchComicByName function', () => {
      const setFilterValue = jest.fn()
      render(<SearchField setFilterValue={setFilterValue} />)

      const btnSearch = screen.getByTestId('search')
      const searchInput = screen.getByTestId('field')

      fireEvent.change(searchInput, { target: { value: 'thor' } })
      fireEvent.click(btnSearch)
      expect(setFilterValue).toHaveBeenCalled()
    })
  })

  describe('Clear button', () => {
    it('should clear input', () => {
      const setFilterValue = jest.fn()
      render(<SearchField setFilterValue={setFilterValue} />)

      const btnClear = screen.getByTestId('clear')
      const searchInput = screen.getByTestId('field')

      fireEvent.change(searchInput, { target: { value: 'thor' } })
      fireEvent.click(btnClear)
      expect(searchInput.value).toBe('')
    })
  })
})
