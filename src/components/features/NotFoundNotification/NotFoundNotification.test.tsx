import NotFoundNotification from "./NotFoundNotification";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test('loads and displays greeting', async () => {
    render(<NotFoundNotification />)

    expect(screen.getByRole('alert'));
})