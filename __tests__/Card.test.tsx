import { render, screen } from '@testing-library/react';
import RecipeCard from '../app/components/Card'; // Your component is named RecipeCard in Card.tsx
import { EnhancedRecipeCardProps } from '../app/components/Card'; // Import the correct interface

// This tells TypeScript to include the special Jest DOM matchers like .toBeInTheDocument()
/// <reference types="@testing-library/jest-dom" />

describe('RecipeCard Component', () => {

  // Mock props that match your component's needs
  const mockProps: EnhancedRecipeCardProps = {
    id: 123,
    title: 'Spicy Tacos',
    subtitle: 'A delicious and spicy taco recipe.',
    image: 'https://example.com/taco.jpg',
    buttonText: 'Make Tacos',
  };

  it('should render all content correctly in default (vertical) layout', () => {
    // 1. Arrange & 2. Act
    render(<RecipeCard {...mockProps} />);

    // 3. Assert
    // Check for title
    expect(screen.getByText('Spicy Tacos')).toBeInTheDocument();
    
    // Check for subtitle
    expect(screen.getByText('A delicious and spicy taco recipe.')).toBeInTheDocument();

    // Check for the image by its correct alt text
    const image = screen.getByAltText('Spicy Tacos image');
    expect(image).toBeInTheDocument();

    // Check for the link/button and its href
    const link = screen.getByRole('link', { name: 'Make Tacos' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/recipe/123');
  });

  it('should render with fallback button text if buttonText is not provided', () => {
    // Arrange: Create props without buttonText
    const { buttonText, ...propsWithoutButton } = mockProps;
    
    // Act
    render(<RecipeCard {...propsWithoutButton} />);

    // Assert: Check for the default "View Recipe" text
    const link = screen.getByRole('link', { name: 'View Recipe' });
    expect(link).toBeInTheDocument();
  });

  it('should apply horizontal layout styles on wider screens', () => {
    // Arrange: Mock window.innerWidth to be a desktop size
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    // Act: Render the component with layout='horizontal'
    const { container } = render(<RecipeCard {...mockProps} layout="horizontal" />);

    // Assert: Check if the root article element has the 'flex' class
    // container.firstChild is the <article> element
    expect(container.firstChild).toHaveClass('flex');
  });
});