import Header from './Header';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'src/lib/testUtils';

describe('Header', () => {
    it('should have correct href value and redirect on link click', async () => {
        const { getByRole, container } = renderWithProviders(<Header />, {
            routerType: 'memory',
            initialEntries: ['/id=123'],
            initialIndex: 0,
        });

        expect(container).toMatchSnapshot();
        expect(getByRole('link')).toBeInTheDocument();
        expect(getByRole('link')).toHaveAttribute('href', `/`);

        await userEvent.click(getByRole('link'));
        expect(window.location.pathname).toBe(`/`);
    })

    it('should not have link element', () => {
        const { queryByRole, container } = renderWithProviders(<Header />, {
            routerType: 'memory',
            initialEntries: ['/'],
            initialIndex: 0,
        });
        expect(container).toMatchSnapshot();
        expect(queryByRole('link')).not.toBeInTheDocument();
    })
});