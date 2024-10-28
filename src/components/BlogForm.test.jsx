import { expect, test, vi } from "vitest";
import BlogForl from "./BlogForm";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("blog form call", async () => {
  const addblog = vi.fn();
  const element = render(<BlogForm addBlog={addblog} />);
  const user = userEvent.setup();
  const titleInput = screen.getByPlaceholderText("title of blog");
  const authorInput = screen.getByPlaceholderText("author of blog");
  const URLInput = screen.getByPlaceholderText("URL of blog");
  const sendButton = screen.getByRole("button");

  await user.type(titleInput, "test blog");
  await user.type(authorInput, "tester");
  await user.type(URLInput, "www.test.com");
  await user.click(sendButton);
  // console.log(addblog.mock.calls);
  expect(addblog.mock.calls).toHaveLength(1);
  expect(addblog.mock.calls[0][0].title).toBe("test blog");
  expect(addblog.mock.calls[0][0].author).toBe("tester");
  expect(addblog.mock.calls[0][0].url).toBe("www.test.com");
});
