import { expect, test, vi } from 'vitest';
import Blog from './Blog';
import { render, screen } from '@testing-library/react';

test('Blog title and author rendering not the other details', () => {
	const blog = {
		title: "Hello it's me",
		author: 'Nik',
		url: 'www.google.com',
		likes: 45,
	};

	const mockhandler = vi.fn();
	const mockhandler2 = vi.fn();

	const { container } = render(
		<Blog blog={blog} deleteBlog={mockhandler} likeBlog={mockhandler2} />
	);

	const element = container.querySelector('.blog');

	expect(element).toHaveTextContent("Hello it's me");
	expect(element).toHaveTextContent('Nik');
	expect(element).not.toHaveTextContent('www.google.com');
});
