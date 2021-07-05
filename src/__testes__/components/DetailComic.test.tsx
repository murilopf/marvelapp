/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DetailComic from '../../components/DetailComic'

const comic = {
  id: 1,
  title: 'Marvel Previews (2017)',
  description: null,
  creators: {
    collectionURI: 'http://gateway.marvel.com/v1/public/comics/82967/creators',
    items: [
      {
        resourceURI: 'http://gateway.marvel.com/v1/public/creators/10021',
        name: 'Jim Nausedas',
        role: 'editor',
      },
    ],
  },
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
    extension: 'jpg',
  },
  pageCount: 35,
}

describe('Renders <DetailComic />', () => {
  it('Render component', async () => {
    const open = true
    const setOpen = jest.fn()

    render(<DetailComic open={open} setOpen={setOpen} comic={comic} />)
    expect(screen.getByTestId('detailComic')).toBeInTheDocument()
  })

  it('should close when trigger back button', async () => {
    const open = true
    const setOpen = jest.fn()

    render(<DetailComic open={open} setOpen={setOpen} comic={comic} />)
    expect(screen.getByTestId('detailComic')).toBeInTheDocument()

    const btnBack = screen.getByTestId('backButton')
    fireEvent.click(btnBack)

    expect(setOpen).toHaveBeenCalled()
  })
})
