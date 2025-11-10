import { render, screen } from '@testing-library/react';
import RecipeCard from '../app/components/Card';
import { EnhancedRecipeCardProps } from '../app/components/Card';


/// <reference types="@testing-library/jest-dom" />

describe('RecipeCard Component', () => {

  const mockProps: EnhancedRecipeCardProps = {
    id: 123,
    title: 'Spicy Tacos',
    subtitle: 'A delicious and spicy taco recipe.',
    image: 'https://example.com/taco.jpg',
    buttonText: 'Make Tacos',
  };

  it('should render all content correctly in default (vertical) layout', () => {
    render(<RecipeCard {...mockProps} />);

    expect(screen.getByText('Spicy Tacos')).toBeInTheDocument();
    
    expect(screen.getByText('A delicious and spicy taco recipe.')).toBeInTheDocument();

    const image = screen.getByAltText('Spicy Tacos image');
    expect(image).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Make Tacos' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/recipe/123');
  });

  it('should render with fallback button text if buttonText is not provided', () => {
    const { buttonText, ...propsWithoutButton } = mockProps;
    
    // Act
    render(<RecipeCard {...propsWithoutButton} />);

    const link = screen.getByRole('link', { name: 'View Recipe' });
    expect(link).toBeInTheDocument();
  });

  it('should apply horizontal layout styles on wider screens', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    const { container } = render(<RecipeCard {...mockProps} layout="horizontal" />);

    expect(container.firstChild).toHaveClass('flex');
  });
});