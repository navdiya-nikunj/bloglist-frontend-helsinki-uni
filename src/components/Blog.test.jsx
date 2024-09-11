import { expect, test, vi } from 'vitest';
import Blog from './Blog';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
	// console.log(container);

	const element = container.querySelector('.blog');

	expect(element).toHaveTextContent("Hello it's me");
	expect(element).toHaveTextContent('Nik');
	expect(element).not.toHaveTextContent('www.google.com');
	cleanup();
});

test('show details button clicked all details are showing ', async () => {
	const blog = {
		title: "Hello it's me",
		author: 'Nik',
		url: 'www.google.com',
		likes: 45,
	};

	const user = userEvent.setup();
	const mockhandler = vi.fn();
	const mockhandler2 = vi.fn();

	const { container } = render(
		<Blog blog={blog} deleteBlog={mockhandler} likeBlog={mockhandler2} />
	);

	const element = container.querySelector('.blog');
	const button = element.querySelector('.toggleButton');
	await user.click(button);
	expect(element).toHaveTextContent('www.google.com');
	expect(element).toHaveTextContent(45);
});
