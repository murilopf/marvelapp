/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

describe('Renders <Header />', () => {
  it('should render Header', () => {
    render(<Header />)

    expect(screen.getByTestId('appbar')).toBeInTheDocument()
  })
})
