import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DetailsTextInfo from './DetailsTextInfo'
import { VOLUME_MOCK_DATA } from 'src/config/consts';

const VOLUME_MOCK_DATA_EMPTY = {
    id: 'id',
    volumeInfo: {
        title: 'The Modern JavaScript Basics Tutorial',
    },
};

describe('DetailsInfoText', () => {
    it('should correctly renders when props are passed', () => {
        const { volumeInfo: { title, authors, categories, description } } = VOLUME_MOCK_DATA;
        render(<DetailsTextInfo {...VOLUME_MOCK_DATA} />);

        expect(screen.getByText(title))
            .toBeInTheDocument();

        expect(screen.getByText(`by ${authors.join()}`))
            .toBeInTheDocument();

        expect(screen.getByText(categories[0]))
            .toBeInTheDocument();

        expect(screen.getByText(description))
            .toBeInTheDocument();
    });

    it('should render empty div with if no data passed', () => {
        const { volumeInfo: { title } } = VOLUME_MOCK_DATA_EMPTY;
        render(<DetailsTextInfo {...VOLUME_MOCK_DATA_EMPTY} />);

        expect(screen.getByText(title))
            .toBeInTheDocument();

        expect(screen.getByText('No authors'))
            .toBeInTheDocument();

        expect(screen.getByTestId('detailsInfoText-categories'))
            .toHaveTextContent('');

        expect(screen.getByTestId('detailsInfoText-container'))
            .toHaveTextContent('');
    });
});