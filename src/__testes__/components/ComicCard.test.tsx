/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import ComicCard from '../../components/ComicCard'

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

describe('<ComicCard />', () => {
  it('should render ComicCard', () => {
    render(<ComicCard comic={comic} />)

    expect(screen.getByTestId('comicCard')).toBeInTheDocument()
  })

  describe('Detail button', () => {
    it('should trigger handleClickOpen', () => {
      render(<ComicCard comic={comic} />)
      const btnSeeMore = screen.getByTestId('seeMore')

      fireEvent.click(btnSeeMore)
      expect(screen.getByTestId('detailComic')).toBeInTheDocument()
    })
  })
})
